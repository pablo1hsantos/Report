export const DEFAULT_CONFIG = {
  revision: 'inicial',
  reportTitle: 'IN-HAUS | REPORT OPERACIONAL',
  shifts: ['1º turno','2º turno','3º turno','Administrativo'],
  units: [
    {name:'toneladas', decimals:true},
    {name:'produtos', decimals:false}
  ],
  crs: [
    {code:'27299',name:'Whirlpool Rio Claro',unit:'produtos',vehiclesOnly:false,itemsEnabled:false},
    {code:'64399',name:'Arcelor HUB',unit:'toneladas',vehiclesOnly:false,itemsEnabled:true},
    {code:'65496',name:'Arcelor Trefila',unit:'toneladas',vehiclesOnly:false,itemsEnabled:false},
    {code:'66003',name:'Arcelor Transporte',unit:'toneladas',vehiclesOnly:false,itemsEnabled:false,fleetAvailabilityEnabled:true},
    {code:'66655',name:'Arcelor Belgo',unit:'toneladas',vehiclesOnly:false,itemsEnabled:false},
    {code:'74590',name:'Arcelor CDB AE',unit:'toneladas',vehiclesOnly:false,itemsEnabled:true},
    {code:'77850',name:'Arcelor CDB III',unit:'toneladas',vehiclesOnly:false,itemsEnabled:true},
    {code:'85080',name:'Arcelor Inspeções IRC',unit:'',vehiclesOnly:true,itemsEnabled:false},
    {code:'85082',name:'Arcelor Inspeções PIR',unit:'',vehiclesOnly:true,itemsEnabled:false},
    {code:'97478',name:'Whirlpool Jundiai',unit:'produtos',vehiclesOnly:false,itemsEnabled:false},
    {code:'97487',name:'Arcelor Peação',unit:'',vehiclesOnly:true,itemsEnabled:false}
  ],
  supervisors: [
    {name:'LINCOLN LIMA DA CUNHA',defaultShift:'',crs:['97478']},
    {name:'ADRIANO BEZERRA DE SOUZA',defaultShift:'',crs:['66655']},
    {name:'ALLAN DA TRINDADE ALVES',defaultShift:'',crs:['66655']},
    {name:'RAFAEL RODRIGUES ZARATINI',defaultShift:'',crs:['85080','85082']},
    {name:'DIEGO FLORIN DA SILVA',defaultShift:'',crs:['27299']},
    {name:'ALEXANDRE FERNANDO BARBOSA',defaultShift:'Administrativo',crs:['64399','74590','77850','97487']},
    {name:'SANDRO ALEXANDRE DA SILVA',defaultShift:'',crs:['66003','65496']},
    {name:'ALEF AUGUSTO FRANCA',defaultShift:'3º turno',crs:['64399','74590','77850','97487']},
    {name:'GABRIELLE PAES JANUARIO DA SILVA',defaultShift:'',crs:['97478']}
  ]
};
export function validateConfig(cfg) {
  if (!cfg || typeof cfg !== 'object' || Array.isArray(cfg)) throw new Error('Formato inválido.');
  const safe = {reportTitle: String(cfg.reportTitle||'').trim(),shifts:[],units:[],crs:[],supervisors:[]};
  if (!safe.reportTitle || safe.reportTitle.length > 85 || /[\r\n*]/.test(safe.reportTitle)) throw new Error('Título deve ter de 1 a 85 caracteres.');
  if (!Array.isArray(cfg.shifts) || cfg.shifts.length < 1 || cfg.shifts.length > 25) throw new Error('Cadastre entre 1 e 25 turnos.');
  const names = new Set();
  for (const s of cfg.shifts) { const shift=String(s||'').trim(); if(!shift||shift.length>40||names.has(shift.toLowerCase())) throw new Error('Turno vazio, duplicado ou muito longo.'); safe.shifts.push(shift); names.add(shift.toLowerCase()); }
  if (!Array.isArray(cfg.units) || cfg.units.length < 1 || cfg.units.length > 30) throw new Error('Cadastre entre 1 e 30 unidades.');
  const units=new Set();
  for(const u of cfg.units) {const name=String(u?.name||'').trim();if(!name||name.length>40||units.has(name.toLowerCase()))throw new Error('Unidade vazia, duplicada ou muito longa.');safe.units.push({name,decimals:!!u.decimals});units.add(name.toLowerCase());}
  if(!Array.isArray(cfg.crs)||cfg.crs.length>300)throw new Error('Limite de 300 CRs.');
  const codes=new Set();
  for(const c of cfg.crs){const code=String(c?.code||'').trim(),name=String(c?.name||'').trim();if(!/^[A-Za-z0-9-]{2,25}$/.test(code)||codes.has(code)||!name||name.length>110)throw new Error('CR inválido, sem descrição ou duplicado.');const vehiclesOnly=!!c.vehiclesOnly,unit=vehiclesOnly?'':String(c.unit||'').trim();if(!vehiclesOnly&&!units.has(unit.toLowerCase()))throw new Error(`Unidade inválida no CR ${code}.`);safe.crs.push({code,name,unit,vehiclesOnly,itemsEnabled:!vehiclesOnly&&!!c.itemsEnabled,fleetAvailabilityEnabled:c.fleetAvailabilityEnabled===undefined?code==='66003':!!c.fleetAvailabilityEnabled});codes.add(code);}
  if(!Array.isArray(cfg.supervisors)||cfg.supervisors.length>250)throw new Error('Limite de 250 supervisores.');
  const supervisors=new Set();
  for(const s of cfg.supervisors){const name=String(s?.name||'').trim().toUpperCase(),defaultShift=String(s?.defaultShift||'').trim();if(!name||name.length>110||supervisors.has(name))throw new Error('Supervisor sem nome, muito longo ou duplicado.');if(defaultShift&&!names.has(defaultShift.toLowerCase()))throw new Error(`Turno inválido para ${name}.`);if(!Array.isArray(s.crs)||s.crs.length>300)throw new Error('Vínculos de CR inválidos.');const linked=[...new Set(s.crs.map(String))];if(linked.some(code=>!codes.has(code)))throw new Error(`CR inexistente no vínculo de ${name}.`);supervisors.add(name);safe.supervisors.push({name,defaultShift,crs:linked});}
  return safe;
}
