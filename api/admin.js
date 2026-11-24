import {authAvailable,matchesPassword,newSession,validSession,setCookie,clearCookie,originOkay,changePassword} from '../lib/auth.mjs';
import {command,getConfig,saveConfig,storageAvailable} from '../lib/storage.mjs';
function fail(res,status,message){return res.status(status).json({error:message});}
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store, max-age=0');res.setHeader('X-Content-Type-Options','nosniff');
  if(!['GET','POST'].includes(req.method))return fail(res,405,'Método não permitido.');
  if(!authAvailable()||!storageAvailable())return fail(res,503,'Configure ADMIN_PASSWORD, SESSION_SECRET e Upstash Redis nas variáveis da Vercel.');
  if(req.method==='GET')return res.status(200).json({authenticated:await validSession(req)});
  if(!originOkay(req))return fail(res,403,'Origem inválida.');
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return fail(res,415,'Envie JSON.');
  const size=Number(req.headers['content-length']||0);if(size>160000)return fail(res,413,'Conteúdo muito grande.');
  try {
    const body=typeof req.body==='object'?req.body:JSON.parse(req.body||'{}');
    if(body.action==='login'){
      // Limite de tentativas por endereço de origem (15 minutos), inclusive quando a senha estiver incorreta.
      const ip=String(req.headers['x-vercel-forwarded-for']||req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
      const key='inhaus:auth:attempts:'+ (await import('node:crypto')).createHash('sha256').update(ip).digest('hex');
      const count=await command(['INCR',key]);if(count===1)await command(['EXPIRE',key,900]);
      if(count>10)return fail(res,429,'Muitas tentativas. Tente novamente mais tarde.');
      if(!await matchesPassword(body.password))return fail(res,401,'Senha incorreta.');
      await command(['DEL',key]);
      setCookie(res,await newSession());return res.status(200).json({ok:true});
    }
    if(body.action==='logout'){clearCookie(res);return res.status(200).json({ok:true});}
    if(!await validSession(req))return fail(res,401,'Sessão expirada. Entre novamente.');
    if(body.action==='changePassword'){
      const ip=String(req.headers['x-vercel-forwarded-for']||req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
      const key='inhaus:auth:password-change:'+ (await import('node:crypto')).createHash('sha256').update(ip).digest('hex');
      const count=await command(['INCR',key]);if(count===1)await command(['EXPIRE',key,900]);
      if(count>5)return fail(res,429,'Muitas tentativas de troca de senha. Tente novamente em 15 minutos.');
      await changePassword(body.currentPassword,body.newPassword);
      await command(['DEL',key]);
      setCookie(res,await newSession());
      return res.status(200).json({ok:true,message:'Senha atualizada. As sessões anteriores foram encerradas.'});
    }
    if(body.action==='load'){return res.status(200).json({config:await getConfig()});}
    if(body.action==='save'){
      const config=await saveConfig(body.config,body.revision);
      return res.status(200).json({config});
    }
    return fail(res,400,'Ação desconhecida.');
  }catch(err){
    const status=err.status||(/inválido|duplicad|limite|inexistente|vazi|descrição|muito longo|entre 1|Unidade|Turno/i.test(err.message)?400:503);
    return fail(res,status,status===503?'Não foi possível acessar o servidor.':err.message);
  }
}
