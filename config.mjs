import {getConfig,storageAvailable} from '../lib/storage.mjs';
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store, max-age=0');res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='GET')return res.status(405).json({error:'Método não permitido.'});
  try { const cfg=await getConfig();return res.status(200).json({config:cfg,storageConfigured:storageAvailable()}); }
  catch{return res.status(503).json({error:'Falha ao carregar cadastros. Atualize a página.'});}
}
