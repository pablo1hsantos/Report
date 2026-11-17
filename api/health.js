import {authAvailable} from '../lib/auth.mjs';
import {storageAvailable} from '../lib/storage.mjs';
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store, max-age=0');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='GET')return res.status(405).json({error:'Método não permitido.'});
  return res.status(200).json({
    api:'online',
    adminConfigured:authAvailable(),
    databaseConfigured:storageAvailable(),
    ready:authAvailable()&&storageAvailable()
  });
}
