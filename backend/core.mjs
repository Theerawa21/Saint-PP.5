import {policy} from './policy.mjs';
import {unpack} from './legacy-model.mjs';
const clone=x=>JSON.parse(JSON.stringify(x));
const fail=(status,message)=>{throw Object.assign(Error(message),{status});};
const pub=u=>({id:u.id,username:u.username,name:u.name,role:u.role,active:!!u.active,department:u.department||'',position:u.position||'teacher'});
export function dispatch(db,request,crypto,now=Date.now()){
 const path=request.path,method=request.method||'GET',b=request.body||{},query=request.query||{};
 if(!['GET','POST'].includes(method))fail(405,'ไม่รองรับวิธีเรียกนี้');
 const audit=(u,action)=>{db.audit.push({at:new Date(now).toISOString(),uid:u?.id||'',action});db.audit=db.audit.slice(-2000);};
 const session=db.sessions[crypto.hash(request.token||'')];
 const u=session&&session.expires>now?db.users.find(x=>x.id===session.uid&&x.active&&session.authHash===x.hash):null;
 if(path==='/api/status')return {setup:false,user:u?pub(u):null};
 if(path==='/api/teacher-search'){
  const q=String(query.q||'').trim();if(q.length<2)return {users:[]};if(q.length>100)fail(400,'ชื่อยาวเกินไป');
  return {users:db.users.filter(x=>x.active&&x.role==='teacher'&&x.name.includes(q)).slice(0,15).map(({name,username})=>({name,username}))};
 }
 if(path==='/api/login'&&method==='POST'){
  const username=String(b.username||'').toLowerCase();if(username.length>100||typeof b.password!=='string'||b.password.length>200)fail(400,'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง');
  const a=Object.hasOwn(db.attempts,username)?db.attempts[username]:null;if(a&&a.until>now&&a.n>=8)fail(429,'กรุณารอ 15 นาทีแล้วลองใหม่');
  const target=db.users.find(x=>x.username===username);
  if(!target?.active||!crypto.verify(b.password,target.salt,target.hash)){
   Object.defineProperty(db.attempts,username,{value:{n:a?.until>now?a.n+1:1,until:now+900000},writable:true,enumerable:true,configurable:true});return {__error:401,error:'ชื่อบัญชีหรือรหัสผ่านไม่ถูกต้อง'};
  }
  delete db.attempts[username];for(const[k,v]of Object.entries(db.sessions))if(v.expires<=now)delete db.sessions[k];
  const token=crypto.random();db.sessions[crypto.hash(token)]={uid:target.id,expires:now+21600000,authHash:target.hash};audit(target,'login');return {user:pub(target),token};
 }
 if(!u)fail(401,'กรุณาเข้าสู่ระบบ');
 const grants=db.grants.filter(g=>g.uid===u.id),data=unpack(db.records),cs=data.lk3_classes||[];
 const ctx={data,grants,validation:data},rules=policy(ctx);
 const admin=()=>{if(u.role!=='admin')fail(403,'เฉพาะแอดมิน');};
 const exists=(cid,sid)=>cs.some(c=>c.id===cid)&&(sid==='*'||(data['lk3_'+cid+'_subjects']||[]).some(s=>s.id===sid));
 const has=(cid,sid)=>u.role==='admin'||grants.some(g=>g.cid===cid&&(g.sid===sid||g.sid==='*'));
 function options(){return cs.map(c=>({id:c.id,name:c.level+'/'+c.room+' ปี '+c.year,level:c.level,room:String(c.room),year:String(c.year),plan:c.curriculumPlan||'',subjects:(data['lk3_'+c.id+'_subjects']||[]).map(s=>({id:s.id,name:s.name,code:s.code||'',vterm:s.vterm||'',hours:s.hours??null}))}));}
 if(path==='/api/logout'&&method==='POST'){delete db.sessions[crypto.hash(request.token)];return {ok:true};}
 if(path==='/api/teaching-options')return {classes:options(),grants};
 if(path==='/api/my-teaching'&&method==='POST'){
  if(u.role!=='teacher'||b.sid==='*'||!exists(b.cid,b.sid))fail(403,'เลือกชั้นและวิชาที่มีในระบบ');
  if(!grants.some(g=>g.cid===b.cid&&g.sid===b.sid))db.grants.push({uid:u.id,cid:b.cid,sid:b.sid});audit(u,'self-assignment '+b.cid+' '+b.sid);return {ok:true};
 }
 if(path==='/api/users'&&method==='GET'){admin();return {users:db.users.map(pub),grants:db.grants};}
 if(path==='/api/users'&&method==='POST'){
  admin();if(!/^[\w@.-]{3,100}$/.test(b.username||'')||typeof b.name!=='string'||!b.name.trim()||b.name.length>200||typeof b.password!=='string'||b.password.length<12||b.password.length>200||!['admin','teacher'].includes(b.role))fail(400,'กรอกชื่อบัญชี ชื่อ และรหัสผ่านอย่างน้อย 12 ตัว');
  rules.validate(b.name);if(db.users.some(x=>x.username===b.username.toLowerCase()))fail(409,'ชื่อบัญชีซ้ำ');const salt=crypto.random();db.users.push({id:crypto.random(),username:b.username.toLowerCase(),name:b.name,role:b.role,salt,hash:crypto.password(b.password,salt),active:1});audit(u,'create-user');return {ok:true};
 }
 if(path==='/api/user'&&method==='POST'){
  admin();const t=db.users.find(x=>x.id===b.id);if(!t)fail(404,'ไม่พบบัญชี');
  if(b.active===false&&(t.id===u.id||t.role==='admin'&&db.users.filter(x=>x.role==='admin'&&x.active).length<=1))fail(400,'ปิดแอดมินคนสุดท้ายหรือบัญชีตนเองไม่ได้');
  if(b.password){if(typeof b.password!=='string'||b.password.length<12||b.password.length>200)fail(400,'รหัสผ่านอย่างน้อย 12 ตัว');t.salt=crypto.random();t.hash=crypto.password(b.password,t.salt);}
  if(typeof b.active==='boolean')t.active=b.active?1:0;for(const[k,v]of Object.entries(db.sessions))if(v.uid===t.id)delete db.sessions[k];audit(u,'update-user');return {ok:true};
 }
 if(path==='/api/grant'&&method==='POST'){
  admin();if(!db.users.some(x=>x.id===b.uid&&x.role==='teacher')||!exists(b.cid,b.sid))fail(400,'ไม่พบครู ห้อง หรือวิชา');
  db.grants=db.grants.filter(g=>!(g.uid===b.uid&&g.cid===b.cid&&g.sid===b.sid));if(!b.remove)db.grants.push({uid:b.uid,cid:b.cid,sid:b.sid});audit(u,'assignment');return {ok:true};
 }
 if(path==='/api/workspace'){
  const records=cs.filter(c=>u.role==='admin'||grants.some(g=>g.cid===c.id)).map(c=>({id:'class:'+c.id,rev:1,value:{name:c.level+'/'+c.room,students:[],subjects:(data['lk3_'+c.id+'_subjects']||[]).filter(s=>has(c.id,s.id)).map(s=>({id:s.id,name:s.name}))}}));return {user:pub(u),records};
 }
 if(path==='/api/audit'){admin();return {events:db.audit.slice(-100).reverse()};}
 if(path==='/api/export'){admin();return {format:'SaintTheresaDrive1',records:db.records,revisions:db.revisions};}
 if(path==='/api/legacy'&&method==='GET'){
  const records={},revisions={};for(const[id,rev]of Object.entries(db.revisions)){if(!rules.access(u,id))continue;revisions[id]=rev;if(!Object.hasOwn(db.records,id))continue;let v=clone(db.records[id]);const [root]=JSON.parse(id);
   if(u.role!=='admin'){
    if(root==='lk3_classes')v=v.filter(c=>grants.some(g=>g.cid===c.id));
    if(root==='lk3_school'){const allowed=['name','nameEn','affil','tambon','amphoe','prov','principal','principalTitleMode','principalTitleCustom','sjSignerMode','pp6SignerMode','schoolType','educationOffice','licensee','manager','registrar','teacherRepresentative','registrationHead','deputyDirector','academicHead','measurementHead','signers','term1Start','term1End','term2Start','term2End','holidays','removedDefaultHolidays'];v=Object.fromEntries(Object.entries(v).filter(([k])=>allowed.includes(k)));}
    const c=cs.find(c=>root==='lk3_'+c.id+'_subjects');if(c)v=v.filter(s=>has(c.id,s.id));
   }records[id]=v;
  }
  return {records,revisions,user:pub(u),grants,staff:u.role==='admin'?db.users.filter(x=>x.active&&x.role==='teacher').map(x=>x.name):[],teacherAssignments:db.grants.filter(g=>u.role==='admin'||g.uid===u.id).flatMap(g=>{const t=db.users.find(x=>x.id===g.uid&&x.active);return t?[{cid:g.cid,sid:g.sid,name:t.name}]:[];})};
 }
 if(path==='/api/legacy'&&method==='POST'){
  if(!Array.isArray(b.operations)||b.operations.length>20000)fail(400,'รายการไม่ถูกต้อง');
  const next=clone(db.records),ids=new Set();
  for(const o of b.operations){if(!o||typeof o.id!=='string'||ids.has(o.id)||!rules.access(u,o.id,true))fail(403,'ไม่มีสิทธิ์บันทึกรายการนี้');ids.add(o.id);if(!Number.isSafeInteger(o.rev)||o.rev!==(db.revisions[o.id]||0))fail(409,'ข้อมูลถูกแก้จากเครื่องอื่น กรุณาสำรองงานแล้วโหลดล่าสุด');if(o.deleted)delete next[o.id];else next[o.id]=o.value;}
  ctx.validation=unpack(next);
  for(const o of b.operations){if(!o.deleted){rules.validate(o.value);rules.validateRecord(o);}else{const p=JSON.parse(o.id);if(p[0].endsWith('_desc')&&p.length===2){const d=data[p[0]]?.[p[1]];if(d?.scorePlan){rules.validateRecord({id:o.id,value:{desc:d.desc||'',indicators:''}});}}}}
  db.records=next;for(const o of b.operations)db.revisions[o.id]=o.rev+1;
  const nd=ctx.validation;db.grants=db.grants.filter(g=>(nd.lk3_classes||[]).some(c=>c.id===g.cid)&&(g.sid==='*'||(nd['lk3_'+g.cid+'_subjects']||[]).some(s=>s.id===g.sid)));
  audit(u,'legacy-write '+b.operations.length);return {revisions:Object.fromEntries(b.operations.map(o=>[o.id,o.rev+1]))};
 }
 if(path==='/api/subject-weight'&&method==='POST'){
  if(!exists(b.cid,b.sid)||!has(b.cid,b.sid))fail(403,'ไม่มีสิทธิ์เปลี่ยนสัดส่วน');if(![70,80].includes(b.wt))fail(400,'เลือก 70:30 หรือ 80:20');
  const id=JSON.stringify(['lk3_'+b.cid+'_subjects']);if(b.rev!==db.revisions[id])fail(409,'รายวิชาถูกแก้ไขแล้ว กรุณาโหลดล่าสุด');
  if(data['lk3_'+b.cid+'_desc']?.[b.sid]?.scorePlan?.fourParts)fail(400,'ปรับในหน้ากำหนดคะแนน 4 ส่วน');
  const subjects=clone(db.records[id]),sj=subjects.find(x=>x.id===b.sid),c=cs.find(c=>c.id===b.cid),mid=Number(sj.wmid??30);
  if((c.scoreMode==='sec'||c.level.startsWith('ม.'))&&(!Number.isFinite(mid)||mid<0||mid>=b.wt))fail(400,'สัดส่วนกลางภาคเดิมไม่รองรับ');
  sj.wt=b.wt;sj.wf=100-b.wt;db.records[id]=subjects;db.revisions[id]++;
  for(const key of Object.keys(db.records)){const p=JSON.parse(key);if(p.length===3&&p[0]==='lk3_'+b.cid+'_roundOv'&&p[2]===b.sid){delete db.records[key];db.revisions[key]=(db.revisions[key]||0)+1;}}
  audit(u,'subject-weight');return {ok:true};
 }
 fail(404,'ไม่พบคำสั่ง');
}
