import {randomUUID} from 'node:crypto';
import { DEFAULT_CONFIG, validateConfig } from './defaults.mjs';
const KEY='inhaus:report:settings:v1';
export function storageAvailable(){return !!(process.env.UPSTASH_REDIS_REST_URL&&process.env.UPSTASH_REDIS_REST_TOKEN);}
export async function command(parts){
  if(!storageAvailable())throw new Error('Armazenamento não configurado.');
  const url=process.env.UPSTASH_REDIS_REST_URL;
  const res=await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify(parts),signal:AbortSignal.timeout(8000)});
  if(!res.ok)throw new Error(`Armazenamento indisponível (${res.status}).`);
  const data=await res.json();if(data.error)throw new Error('Comando de armazenamento inválido.');return data.result;
}
export async function getConfig(){
  if(!storageAvailable())return structuredClone(DEFAULT_CONFIG);
  const raw=await command(['GET',KEY]);
  if(raw===null)return structuredClone(DEFAULT_CONFIG);
  const parsed=JSON.parse(raw);
  const safe=validateConfig(parsed);
  return {...safe,revision:String(parsed.revision||'inicial')};
}
export async function saveConfig(cfg,revision){
  if(!storageAvailable())throw new Error('Armazenamento não configurado.');
  const current=await getConfig();
  if(String(revision)!==current.revision){const error=new Error('Outro administrador alterou os dados. Recarregue antes de salvar.');error.status=409;throw error;}
  const validated=validateConfig(cfg);
  const next={...validated,revision:randomUUID(),updatedAt:new Date().toISOString()};
  const result=await command(['SET',KEY,JSON.stringify(next)]);
  if(result!=='OK')throw new Error('Não foi possível salvar.');
  return next;
}
