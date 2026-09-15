import {dispatch} from './core.mjs';
import {makeCrypto,seal,open} from './crypto.mjs';
// syncScrypt only: its scheduler reference is never called in synchronous mode.
if(typeof globalThis.setImmediate==='undefined')globalThis.setImmediate=()=>{throw Error('Async crypto is not supported')};
const props=()=>PropertiesService.getScriptProperties();
const encode=s=>Uint8Array.from(Utilities.newBlob(s).getBytes(),b=>(b+256)%256);
const decode=a=>Utilities.newBlob(Array.from(a,b=>b>127?b-256:b)).getDataAsString('UTF-8');
const hex=a=>Array.from(a,b=>((b+256)%256).toString(16).padStart(2,'0')).join('');
const hash=s=>hex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,String(s),Utilities.Charset.UTF_8));
const random=()=>hash(Utilities.getUuid()+Utilities.getUuid()+Date.now());
const crypto=makeCrypto({encode,hash,random});
function settings(){const p=props(),key=p.getProperty('ST_DATABASE_KEY'),origin=p.getProperty('ST_SITE_ORIGIN');if(!key||!/^[a-f0-9]{64}$/.test(key)||!origin||!/^https:\/\/[^/]+$/.test(origin))throw Error('ตั้งค่าระบบไม่ครบ');return {p,key,origin};}
export function page(e){
 const {origin}=settings(),nonce=String(e?.parameter?.channel||'');if(!/^[a-f0-9]{48}$/.test(nonce))return HtmlService.createHtmlOutput('Saint Theresa API: open the school website.');
 const t=HtmlService.createTemplateFromFile('Bridge');t.origin=origin;t.channel=nonce;
 return t.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
export function rpc(request){
 const lock=LockService.getScriptLock();if(!lock.tryLock(15000))return {status:503,body:{error:'มีผู้บันทึกพร้อมกัน กรุณาลองใหม่'}};
 try{
  const {p,key,origin}=settings();if(!request||request.origin!==origin||typeof request.path!=='string'||!request.path.startsWith('/api/')||JSON.stringify(request).length>12000000)return {status:400,body:{error:'คำขอไม่ถูกต้อง'}};
  const fileId=p.getProperty('ST_DATABASE_FILE');if(!fileId)return {status:503,body:{error:'กำลังเตรียมฐานข้อมูล'}};
  const file=DriveApp.getFileById(fileId),db=open(JSON.parse(file.getBlob().getDataAsString()),key,decode);
  const cache=CacheService.getScriptCache(),tokenKey=hash(request.token||''),savedSession=cache.get('st-session-'+tokenKey);
  db.sessions={};if(savedSession)db.sessions[tokenKey]=JSON.parse(savedSession);
  const username=String(request.body?.username||'').toLowerCase(),attemptKey='st-attempt-'+hash(username),attempt=cache.get(attemptKey);db.attempts={};if(attempt)db.attempts[username]=JSON.parse(attempt);
  let result;try{result=dispatch(db,request,crypto);}catch(e){if(!e.status)e.status=400;throw e;}
  if(request.path==='/api/login'){
   if(db.attempts[username])cache.put(attemptKey,JSON.stringify(db.attempts[username]),900);else cache.remove(attemptKey);
   if(result.token){const k=hash(result.token);cache.put('st-session-'+k,JSON.stringify(db.sessions[k]),21600);}
  }else if(request.path==='/api/logout')cache.remove('st-session-'+tokenKey);
  const write=request.method==='POST'&&!['/api/login','/api/logout'].includes(request.path);
  if(write&&!result.__error){db.sessions={};db.attempts={};db.generation=(db.generation||0)+1;file.setContent(JSON.stringify(seal(db,key,random(),encode)));}
  if(result.__error)return {status:result.__error,body:{error:result.error}};
  return {status:200,body:result};
 }catch(e){return {status:e.status||500,body:{error:e.status?e.message:'ติดต่อฐานข้อมูลไม่สำเร็จ กรุณาลองใหม่หรือติดต่อผู้ดูแล'}};}finally{lock.releaseLock();}
}
export function initialize(){
 const {p,key}=settings();if(p.getProperty('ST_DATABASE_FILE'))throw Error('Database already initialized');
 const incoming=p.getProperty('ST_IMPORT_FILE');if(!incoming)throw Error('Set ST_IMPORT_FILE to the encrypted migration file');
 const source=DriveApp.getFileById(incoming),raw=source.getBlob().getDataAsString(),db=open(JSON.parse(raw),key,decode);
 if(db.format!=='SaintTheresaDriveDB1'||!db.users?.some(u=>u.role==='admin'&&u.active)||!db.records||!db.revisions)throw Error('Invalid migration');
 const folder=DriveApp.createFolder('Saint Theresa — ฐานข้อมูลส่วนตัว');folder.setSharing(DriveApp.Access.PRIVATE,DriveApp.Permission.NONE);
 const file=folder.createFile('database.encrypted.json',raw,MimeType.PLAIN_TEXT);file.setSharing(DriveApp.Access.PRIVATE,DriveApp.Permission.NONE);
 p.setProperties({ST_DATABASE_FILE:file.getId(),ST_PRIVATE_FOLDER:folder.getId(),ST_BACKUP_FOLDER:'1khpXrVLvw3ERl22OUwzApbnL27uAKdVs'});p.deleteProperty('ST_IMPORT_FILE');
 return {ok:true,users:db.users.length};
}
export function backup(){
 const {p,key}=settings(),lock=LockService.getScriptLock();lock.waitLock(15000);try{
  const file=DriveApp.getFileById(p.getProperty('ST_DATABASE_FILE')),db=open(JSON.parse(file.getBlob().getDataAsString()),key,decode);
  const envelope=JSON.stringify(seal(db,key,random(),encode)),folder=DriveApp.getFolderById(p.getProperty('ST_BACKUP_FOLDER'));
  const out=folder.createFile('Saint-Theresa-cloud-'+Utilities.formatDate(new Date(),'Asia/Bangkok','yyyyMMdd-HHmmss')+'.encrypted.json',envelope,MimeType.PLAIN_TEXT);return {ok:true,id:out.getId()};
 }finally{lock.releaseLock();}
}
