import {createHmac,timingSafeEqual,createHash,randomBytes,scrypt as scryptCallback} from 'node:crypto';
import {promisify} from 'node:util';
import {command} from './storage.mjs';

const COOKIE='inhaus_admin';
const CREDENTIAL_KEY='inhaus:report:admin:credential:v1';
const scrypt=promisify(scryptCallback);

function safeEqual(a,b){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y);}
export function authAvailable(){return !!(process.env.ADMIN_PASSWORD&&process.env.SESSION_SECRET?.length>=32);}
async function savedCredential(){
  const raw=await command(['GET',CREDENTIAL_KEY]);
  if(!raw)return null;
  const data=JSON.parse(raw);
  if(!data||data.algorithm!=='scrypt'||!data.salt||!data.hash||!data.version)throw new Error('Credencial administrativa inválida no servidor.');
  return data;
}
async function verify(candidate,credential){
  const key=await scrypt(String(candidate),Buffer.from(credential.salt,'hex'),64);
  return safeEqual(key,Buffer.from(credential.hash,'hex'));
}
export async function matchesPassword(candidate){
  if(!authAvailable())return false;
  const credential=await savedCredential();
  if(credential)return verify(candidate,credential);
  const digest=s=>createHash('sha256').update(s).digest();
  return timingSafeEqual(digest(String(candidate)),digest(process.env.ADMIN_PASSWORD));
}
async function credentialVersion(){return (await savedCredential())?.version||'env-initial';}
export async function newSession(){
  const now=Math.floor(Date.now()/1000);
  const body=Buffer.from(JSON.stringify({iat:now,exp:now+8*3600,nonce:randomBytes(8).toString('hex'),version:await credentialVersion()})).toString('base64url');
  const signature=createHmac('sha256',process.env.SESSION_SECRET).update(body).digest('base64url');
  return `${body}.${signature}`;
}
export async function validSession(req){
  if(!authAvailable())return false;
  const cookie=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(COOKIE+'='));
  if(!cookie)return false;
  const parts=cookie.slice(COOKIE.length+1).split('.');if(parts.length!==2)return false;
  const expected=createHmac('sha256',process.env.SESSION_SECRET).update(parts[0]).digest('base64url');
  if(!safeEqual(expected,parts[1]))return false;
  try{
    const p=JSON.parse(Buffer.from(parts[0],'base64url').toString('utf8'));
    return Number.isInteger(p.exp)&&p.exp>Date.now()/1000&&Number.isInteger(p.iat)&&p.iat<=Date.now()/1000&&p.version===await credentialVersion();
  }catch{return false;}
}
export async function changePassword(currentPassword,newPassword){
  if(!await matchesPassword(currentPassword)){
    const err=new Error('Senha atual incorreta.');err.status=401;throw err;
  }
  const p=String(newPassword??'');
  if(p.length<12||p.length>128||/\p{C}/u.test(p)){
    const err=new Error('A nova senha deve ter de 12 a 128 caracteres, sem caracteres de controle.');err.status=400;throw err;
  }
  if(p===String(currentPassword)){
    const err=new Error('A nova senha deve ser diferente da atual.');err.status=400;throw err;
  }
  const salt=randomBytes(16);
  const hash=await scrypt(p,salt,64);
  const data={algorithm:'scrypt',salt:salt.toString('hex'),hash:hash.toString('hex'),version:randomBytes(24).toString('hex'),changedAt:new Date().toISOString()};
  if(await command(['SET',CREDENTIAL_KEY,JSON.stringify(data)])!=='OK')throw new Error('Não foi possível gravar a nova senha.');
  return true;
}
export function setCookie(res,token){res.setHeader('Set-Cookie',`${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`);}
export function clearCookie(res){res.setHeader('Set-Cookie',`${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);}
export function originOkay(req){const origin=req.headers.origin;if(!origin)return false;try{const u=new URL(origin);const host=req.headers['x-forwarded-host']||req.headers.host;return u.host===host&&u.protocol==='https:';}catch{return false;}}
