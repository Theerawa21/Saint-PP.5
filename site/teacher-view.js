export function installTeacherView(context){
 const assessments=new Set(['clubs','character','reading','activity','competency','pp6note','indicators']);
 const basic=new Set(['dashboard','students','subjects','attendance','scores','pp5','desc']);
 const original=window.renderPage;
 const classWide=()=>context.grants().some(g=>g.cid===CID&&g.sid==='*');
 const allowed=p=>context.user().role==='admin'||basic.has(p)||(assessments.has(p)&&classWide());
 const escape=escHtml;
 const css=document.createElement('style');css.textContent='[data-team-denied="true"]{display:none!important}.teacher-task{padding:18px;margin:12px 0;border:1px solid var(--border,#ccc);border-radius:12px;background:var(--surface,#fff)}.teacher-task button{margin:5px;padding:8px;border-radius:6px}.teacher-rights{line-height:1.8;padding:14px;background:var(--surface2,#eef3f5);border-radius:10px}';document.head.append(css);
 function menus(){if(context.user().role==='admin')return;document.querySelectorAll('[data-p=desc] .ni-label').forEach(el=>el.textContent='กรอกตัวชี้วัด');document.querySelectorAll('[data-p]').forEach(el=>{const p=el.dataset.p;el.dataset.teamDenied=String(p==='__assess'?!classWide():p==='__more'?false:!allowed(p));});document.querySelectorAll('[onclick]').forEach(el=>{const action=el.getAttribute('onclick')||'',match=action.match(/(?:nav|navMore)\(['"]([^'"]+)/);if(match&&!allowed(match[1]))el.dataset.teamDenied='true';});}
 function dashboard(){const cs=ld('lk3_classes',[]),grants=context.grants();document.getElementById('content').innerHTML='<button id="choose-teaching">เลือกชั้นและวิชาที่สอน</button><h2>งานที่ได้รับมอบหมายของฉัน</h2><p>'+escape(context.user().name)+'</p><div class="teacher-rights">ดูรายชื่อนักเรียนและวิชาที่ได้รับมอบหมาย · เช็กชื่อและกรอกคะแนน · กรอกตัวชี้วัดรายวิชา · พิมพ์ ปพ.5 ของตน<br>รายชื่อนักเรียนและข้อมูลรายวิชาแก้ไขโดยแอดมิน งานประเมินรวมและความเห็นครูเปิดเฉพาะห้องที่ได้รับมอบหมายทุกวิชา</div>'+(!cs.length?'<div class="teacher-task">ยังไม่มีรายการสอน กดเลือกชั้นและวิชาที่สอนเพื่อเริ่มใช้งาน</div>':cs.map((c,i)=>{const subjects=ld('lk3_'+c.id+'_subjects',[]),whole=grants.some(g=>g.cid===c.id&&g.sid==='*');return '<section class="teacher-task"><h3>'+escape(c.level+'/'+c.room+' ปี '+c.year)+'</h3><p>'+subjects.map(s=>escape((s.code||'')+' '+s.name)).join(' · ')+'</p><p>'+(whole?'มีสิทธิ์งานประเมินและความคิดเห็นระดับห้อง':'มีสิทธิ์เฉพาะวิชาที่ระบุ')+'</p><button data-task-class="'+i+'" data-task-page="attendance">เช็กชื่อ</button><button data-task-class="'+i+'" data-task-page="scores">กรอกคะแนน</button><button data-task-class="'+i+'" data-task-page="desc">กรอกตัวชี้วัด</button><button data-task-class="'+i+'" data-task-page="pp5">พิมพ์ ปพ.5</button></section>';}).join(''));document.getElementById('choose-teaching').onclick=chooseTeaching;document.querySelectorAll('[data-task-class]').forEach(b=>b.onclick=()=>{CID=cs[Number(b.dataset.taskClass)].id;sv('lk3_lastClass',CID);updateSb();nav(b.dataset.taskPage);});}
 let pickerOpening=false;
 const pickerStyles=document.createElement('style');pickerStyles.textContent=`
 #choose-teaching{border:0;background:#24644f;color:#fff;padding:11px 18px;border-radius:10px;font:600 15px var(--font,Tahoma,sans-serif);cursor:pointer;margin-bottom:18px;min-height:44px}
 #teaching-dialog{position:fixed;inset:0;margin:auto!important;width:min(690px,calc(100vw - 32px));max-width:none;max-height:calc(100dvh - 32px);padding:0;border:1px solid #dbe5df;border-radius:20px;background:#fff;color:#223a31;font:15px/1.6 var(--font,Tahoma,sans-serif);box-shadow:0 24px 90px #12291f40;overflow:auto;color-scheme:light}
 #teaching-dialog::backdrop{background:rgba(20,38,32,.48);backdrop-filter:blur(3px)}
 #teaching-dialog *{box-sizing:border-box}
 #teaching-dialog .tp-head{padding:24px 26px 18px;border-bottom:1px solid #edf0ee;display:flex;align-items:flex-start;gap:16px}
 #teaching-dialog h2{font:700 23px/1.4 var(--font,Tahoma,sans-serif);color:#1c4937;margin:0 0 6px}
 #teaching-dialog .tp-help{color:#61736b;font-size:14px;margin:0}
 #teaching-dialog .tp-x{margin-left:auto;flex:none;width:36px;height:36px;border:0;border-radius:50%;background:#f1f5f2;color:#426453;font:24px/1 sans-serif;cursor:pointer}
 #teaching-dialog .tp-body{padding:20px 26px}
 #teaching-dialog .tp-section-title{font-weight:700;margin:0 0 12px;display:flex;align-items:center;gap:8px}
 #teaching-dialog .tp-step{width:24px;height:24px;border-radius:50%;background:#e8f2ec;color:#24644f;display:inline-grid;place-items:center;font-size:13px}
 #teaching-dialog .tp-fields{display:grid;grid-template-columns:1fr 1fr;gap:14px}
 #teaching-dialog .tp-label{display:flex;flex-direction:column;gap:6px;color:#42574b;font-size:14px;font-weight:600}
 #teaching-dialog select,#teaching-dialog input[type=search]{width:100%;height:46px;padding:8px 12px;border:1px solid #cbd8cf;border-radius:9px;background:#fff;color:#263e31;font:16px var(--font,Tahoma,sans-serif);outline:none}
 #teaching-dialog :is(button,input,select):focus-visible{outline:3px solid #8cbda5;outline-offset:2px}
 #teaching-dialog select:disabled,#teaching-dialog input:disabled{background:#f5f7f5;color:#88948d}
 #teaching-dialog .tp-plan{font-size:13px;color:#697970;min-height:18px;margin:8px 0 16px}
 #teaching-dialog .tp-subject-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}
 #teaching-dialog .tp-subject-heading .tp-section-title{margin:0}
 #teaching-dialog #teaching-term{height:38px;width:148px;font-size:14px}
 #teaching-dialog #teaching-search{padding-left:13px}
 #teaching-dialog .tp-count{font-size:12px;color:#728078;margin:8px 0}
 #teaching-dialog .tp-list{max-height:230px;min-height:108px;overflow-y:auto;overscroll-behavior:contain;display:grid;gap:8px;align-content:start;padding:3px 3px 3px 0}
 #teaching-dialog .tp-option{display:flex;align-items:center;gap:12px;border:1px solid #e0e7e2;border-radius:10px;padding:12px 14px;cursor:pointer;background:#fff}
 #teaching-dialog .tp-option:hover{border-color:#7da68d;background:#f6faf7}
 #teaching-dialog .tp-option:has(input:checked){background:#edf7f0;border-color:#438563;box-shadow:inset 0 0 0 1px #438563}
 #teaching-dialog .tp-option:has(input:disabled){cursor:default;background:#f6f7f6;color:#839087}
 #teaching-dialog input[type=radio]{width:18px;height:18px;margin:0;accent-color:#24644f;flex:none}
 #teaching-dialog .tp-name{font-size:15px;font-weight:600;display:block}
 #teaching-dialog .tp-code{font-size:12px;color:#728078;display:block}
 #teaching-dialog .tp-badge{margin-left:auto;white-space:nowrap;font-size:11px;color:#486757;background:#eef3ef;border-radius:6px;padding:3px 7px}
 #teaching-dialog .tp-empty{padding:22px 15px;text-align:center;color:#78887e;background:#f6f8f6;border:1px dashed #d8e2da;border-radius:10px;font-size:14px}
 #teaching-dialog .tp-footer{padding:16px 26px;background:#f6f9f6;border-top:1px solid #e3eae5;position:sticky;bottom:0;display:flex;flex-wrap:wrap;align-items:center;gap:12px}
 #teaching-dialog .tp-summary{flex:1;min-width:150px;font-size:13px;color:#5f7567}
 #teaching-dialog .tp-actions{display:flex;gap:8px}
 #teaching-dialog .tp-actions button{min-height:44px;padding:9px 16px;border-radius:9px;font:600 15px var(--font,Tahoma,sans-serif);cursor:pointer}
 #teaching-dialog #teaching-close{border:1px solid #cedcd2;background:white;color:#476653}
 #teaching-dialog #teaching-add{border:1px solid #24644f;background:#24644f;color:white;min-width:145px}
 #teaching-dialog #teaching-add:disabled{background:#dae5dd;border-color:#dae5dd;color:#819889;cursor:not-allowed}
 #teaching-dialog #teaching-message{width:100%;font-size:13px;color:#276c46;margin:0}
 #teaching-dialog #teaching-message:empty{display:none}
 #teaching-dialog #teaching-message[data-error=true]{color:#a13d31}
 @media(max-width:520px){#teaching-dialog{width:calc(100vw - 20px);max-height:calc(100dvh - 20px);border-radius:16px}#teaching-dialog .tp-head{padding:18px 18px 14px}#teaching-dialog h2{font-size:20px}#teaching-dialog .tp-body{padding:16px 18px}#teaching-dialog .tp-fields{gap:10px}#teaching-dialog .tp-list{max-height:210px}#teaching-dialog .tp-footer{padding:13px 18px;gap:8px}#teaching-dialog .tp-summary{flex-basis:100%}#teaching-dialog .tp-actions{width:100%}#teaching-dialog #teaching-add{flex:1}#teaching-dialog .tp-option{padding:10px;gap:9px}#teaching-dialog .tp-name{font-size:14px}}
 `;document.head.append(pickerStyles);
 async function chooseTeaching(){
 if(pickerOpening||document.getElementById('teaching-dialog'))return;pickerOpening=true;
 try{await context.prepareSelection();const r=await window.ST_CLOUD.fetch('/api/teaching-options');const data=await r.json();if(!r.ok)throw Error(data.error);
 const dialog=document.createElement('dialog');dialog.id='teaching-dialog';dialog.setAttribute('aria-labelledby','teaching-title');dialog.setAttribute('aria-describedby','teaching-help');
 dialog.innerHTML=`<div class="tp-head"><div><h2 id="teaching-title">เลือกชั้นและวิชาที่สอน</h2><p id="teaching-help" class="tp-help">เลือกห้อง แล้วค้นหาวิชาที่คุณสอน เพิ่มได้ทีละวิชา</p></div><button type="button" class="tp-x" aria-label="ปิดหน้าต่าง">×</button></div>
 <div class="tp-body"><p class="tp-section-title"><span class="tp-step">1</span> เลือกชั้นเรียน</p><div class="tp-fields"><label class="tp-label">ระดับชั้น<select id="teaching-level" autofocus></select></label><label class="tp-label">ห้อง<select id="teaching-class" disabled></select></label></div><p id="teaching-plan" class="tp-plan"></p>
 <div class="tp-subject-heading"><p id="teaching-subject-title" class="tp-section-title"><span class="tp-step">2</span> เลือกวิชา</p><select id="teaching-term" aria-label="ภาคเรียน" hidden><option value="all">ทุกภาคเรียน</option value="1">ภาคเรียนที่ 1</option><option value="2">ภาคเรียนที่ 2</option></select></div>
 <input id="teaching-search" type="search" placeholder="ค้นหาชื่อวิชา หรือรหัสวิชา" aria-label="ค้นหาวิชา" disabled autocomplete="off"><p id="teaching-count" class="tp-count" aria-live="polite"></p><div id="teaching-subjects" class="tp-list" role="radiogroup" aria-labelledby="teaching-subject-title"></div></div>
 <div class="tp-footer"><div id="teaching-summary" class="tp-summary">ยังไม่ได้เลือกวิชา</div><div class="tp-actions"><button type="button" id="teaching-close">เสร็จแล้ว</button><button type="button" id="teaching-add" disabled>เพิ่มวิชาที่สอน</button></div><p id="teaching-message" role="status" aria-live="polite"></p></div>`;
 document.body.append(dialog);const $=id=>dialog.querySelector('#'+id),level=$('teaching-level'),cl=$('teaching-class'),term=$('teaching-term'),search=$('teaching-search'),list=$('teaching-subjects'),msg=$('teaching-message'),add=$('teaching-add');let selected='',saving=false;
 const group=c=>JSON.stringify([c.year,c.level]),rank=c=>(c.level.startsWith('ป.')?0:c.level.startsWith('ม.')?10:20)+Number(c.level.replace(/\D/g,''));
 const classes=[...data.classes].sort((a,b)=>String(b.year).localeCompare(String(a.year))||rank(a)-rank(b)||String(a.room).localeCompare(String(b.room),'th',{numeric:true}));
 const groups=[...new Map(classes.map(c=>[group(c),c])).entries()],years=new Set(classes.map(c=>c.year));level.add(new Option('เลือกระดับชั้น',''));for(const [k,c]of groups)level.add(new Option(c.level+(years.size>1?' · '+c.year:''),k));
 const current=()=>classes.find(c=>c.id===cl.value),assigned=sid=>data.grants.some(g=>g.cid===cl.value&&(g.sid===sid||g.sid==='*'));
 function summary(){const c=current(),s=c?.subjects.find(s=>s.id===selected);add.disabled=saving||!s||assigned(s.id);$('teaching-summary').textContent=s?c.level+'/'+c.room+' · '+(s.code||s.name):'ยังไม่ได้เลือกวิชา';}
 function subjects(){const c=current(),q=search.value.trim().toLocaleLowerCase('th');const all=(c?.subjects||[]).filter(s=>term.value==='all'||!s.vterm||String(s.vterm)===term.value);const rows=all.filter(s=>((s.code||'')+' '+s.name).toLocaleLowerCase('th').includes(q));if(!rows.some(s=>s.id===selected)||assigned(selected))selected='';list.replaceChildren();$('teaching-count').textContent=c?`${rows.length} วิชา${q?'ที่ค้นพบ':''} · เลือกได้ 1 วิชาต่อครั้ง`:'';
 if(!rows.length){const empty=document.createElement('div');empty.className='tp-empty';empty.textContent=!c?'เลือกระดับชั้นและห้อง เพื่อดูรายวิชา':!c.subjects.length?'ห้องนี้ยังไม่มีรายวิชา กรุณาแจ้งแอดมิน':q?'ไม่พบวิชาที่ค้นหา ลองใช้ชื่อหรือรหัสอื่น':'ไม่มีรายวิชาในภาคเรียนนี้';list.append(empty);}
 for(const s of rows){const done=assigned(s.id),label=document.createElement('label');label.className='tp-option';const input=document.createElement('input');input.type='radio';input.name='teaching-subject';input.value=s.id;input.checked=s.id===selected;input.disabled=done||saving;const info=document.createElement('span'),name=document.createElement('span'),code=document.createElement('span'),badge=document.createElement('span');name.className='tp-name';name.textContent=s.name;code.className='tp-code';code.textContent=s.code||'ไม่ระบุรหัสวิชา';info.append(name,code);badge.className='tp-badge';badge.textContent=done?'เพิ่มแล้ว':s.vterm?'ภาค '+s.vterm:'รายปี';label.append(input,info,badge);input.onchange=()=>{selected=s.id;msg.textContent='';summary();};list.append(label);}
 summary();}
 function changeClass(){selected='';search.value='';term.value='all';msg.textContent='';const c=current();search.disabled=!c;term.hidden=!c?.level.startsWith('ม.');$('teaching-plan').textContent=c?[c.year?'ปีการศึกษา '+c.year:'',c.plan&&c.plan!=='ทั่วไป'?c.plan:''].filter(Boolean).join(' · '):' ';subjects();}
 function changeLevel(){cl.replaceChildren(new Option('เลือกห้อง',''));const choices=classes.filter(c=>group(c)===level.value);for(const c of choices)cl.add(new Option('ห้อง '+c.room,c.id));cl.disabled=!choices.length;changeClass();}
 level.onchange=changeLevel;cl.onchange=changeClass;search.oninput=subjects;term.onchange=()=>{selected='';subjects();};changeLevel();
 const initial=classes.find(c=>c.id===CID);if(initial){level.value=group(initial);changeLevel();cl.value=initial.id;changeClass();}
 add.onclick=async()=>{if(saving||!selected)return;const cid=cl.value,sid=selected,s=current().subjects.find(s=>s.id===sid);saving=true;for(const el of dialog.querySelectorAll('select,input,button'))el.disabled=true;add.textContent='กำลังเพิ่ม…';msg.textContent='';msg.dataset.error='false';try{await context.prepareSelection();const response=await window.ST_CLOUD.fetch('/api/my-teaching',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({cid,sid})});const result=await response.json();if(!response.ok)throw Error(result.error);data.grants.push({cid,sid});selected='';await context.reload();msg.textContent='เพิ่ม '+s.name+' แล้ว เลือกวิชาถัดไปได้เลย';}catch(e){msg.dataset.error='true';msg.textContent=e.message;}finally{saving=false;for(const el of dialog.querySelectorAll('select,input,button'))el.disabled=false;cl.disabled=!level.value;search.disabled=!current();add.textContent='เพิ่มวิชาที่สอน';subjects();}};
 const close=()=>{if(!saving)dialog.close();};$('teaching-close').onclick=close;dialog.querySelector('.tp-x').onclick=close;dialog.addEventListener('cancel',e=>{if(saving)e.preventDefault();});dialog.addEventListener('close',()=>{dialog.remove();document.getElementById('choose-teaching')?.focus();});dialog.showModal();
 }catch(e){toast(e.message,'err');}finally{pickerOpening=false;}
 }

 const indicatorStyles=document.createElement('style');indicatorStyles.textContent=`
 .teacher-indicators{max-width:860px;margin:0 auto;color:var(--text)}
 .teacher-indicators h2{font-size:23px;margin:0 0 6px;line-height:1.5}
 .teacher-indicators .ti-intro{color:var(--text2);line-height:1.8;margin:0 0 18px}
 .teacher-indicators .ti-card{background:var(--surface,#fff);border:1px solid var(--border,#d7e2db);border-radius:14px;padding:22px;margin:14px 0}
 .teacher-indicators label{display:block;font-size:15px;font-weight:700;margin:0 0 8px}
 .teacher-indicators .ti-context{color:var(--accent,#24644f);font-size:13px;margin:0 0 10px}
 .teacher-indicators select,.teacher-indicators textarea{width:100%;box-sizing:border-box;font:16px/1.8 var(--font,Tahoma,sans-serif);border:1px solid var(--border2,#b9cebf);border-radius:9px;background:var(--surface,#fff);color:var(--text);padding:10px 12px}
 .teacher-indicators textarea{resize:vertical;min-height:120px}
 .teacher-indicators :is(select,textarea,button):focus-visible{outline:3px solid #8cbda5;outline-offset:2px}
 .teacher-indicators .ti-hint{font-size:13px;color:var(--text2);line-height:1.7;margin:0 0 10px}
 .teacher-indicators .ti-count{font-size:13px;color:var(--accent,#24644f);margin:7px 0 0}
 .teacher-indicators .ti-footer{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:18px}
 .teacher-indicators .ti-footer button{min-height:44px;padding:10px 20px;background:#24644f;border:0;color:#fff;border-radius:9px;font:600 15px var(--font,Tahoma,sans-serif);cursor:pointer}
 .teacher-indicators .ti-footer button:disabled{opacity:.6;cursor:wait}
 .teacher-indicators #teacher-indicator-status{font-size:13px;color:var(--text2);line-height:1.7}
 @media(max-width:520px){.teacher-indicators .ti-card{padding:16px}.teacher-indicators h2{font-size:21px}.teacher-indicators .ti-footer button{width:100%}}
 `;document.head.append(indicatorStyles);
 let indicatorSubject='';
 function teacherIndicators(){
 const sjs=getSjs(),cls=ld('lk3_classes',[]).find(c=>c.id===CID);
 document.getElementById('pgTitle').textContent='กรอกตัวชี้วัด';
 if(!cls||!sjs.length){document.getElementById('content').innerHTML='<div class="teacher-task">เลือกชั้นและวิชาที่สอนจากหน้าหลักก่อนกรอกตัวชี้วัด</div>';return;}
 if(!sjs.some(s=>s.id===indicatorSubject))indicatorSubject=sjs[0].id;
 document.getElementById('content').innerHTML=`<section class="teacher-indicators"><h2>ตัวชี้วัด / ผลการเรียนรู้</h2><p class="ti-intro">กรอกตัวชี้วัด / ผลการเรียนรู้ แล้วกำหนดงานเก็บคะแนนและคะแนนเต็ม จากนั้นกรอกคะแนนนักเรียนในหน้าบันทึกคะแนน รวม 2–3 ข้อเพื่อเก็บคะแนนร่วมกันได้<br>บันทึกอัตโนมัติ โดยดูผลการบันทึกได้ที่แถบด้านบน</p><div class="ti-card"><p class="ti-context">${escape(cls.level+'/'+cls.room+' · ปีการศึกษา '+cls.year)} · ${cls.level.startsWith('ม.')?'รายภาคเรียน':'รายปี'}</p><label for="teacher-indicator-subject">รายวิชาที่สอน</label><select id="teacher-indicator-subject"></select></div><div class="ti-card"><label for="teacher-indicator-text">ตัวชี้วัด / ผลการเรียนรู้</label><p class="ti-hint" id="teacher-indicator-help">พิมพ์หรือวางข้อความได้เลย บรรทัดละ 1 ข้อ ใส่รหัสตัวชี้วัดหน้าข้อความได้</p><textarea id="teacher-indicator-text" rows="7" aria-describedby="teacher-indicator-help teacher-indicator-count" placeholder="เช่น รหัสตัวชี้วัด — สิ่งที่ต้องการให้ผู้เรียนทำได้"></textarea><p class="ti-count" id="teacher-indicator-count" aria-live="polite"></p></div><div class="ti-card"><label for="teacher-description-text">คำอธิบายรายวิชา <span style="font-weight:400">(ถ้ามี)</span></label><textarea id="teacher-description-text" rows="4" placeholder="ศึกษา... เพื่อให้ผู้เรียน..."></textarea><div class="ti-footer"><button id="teacher-indicator-save" type="button">บันทึกตัวชี้วัด</button><span id="teacher-indicator-status" role="status">แก้ไขได้เฉพาะวิชาที่คุณสอน แอดมินตรวจสอบได้ทั้งหมด</span></div></div></section>`;
 window.scrollTo(0,0);
 const select=document.getElementById('teacher-indicator-subject'),ind=document.getElementById('teacher-indicator-text'),desc=document.getElementById('teacher-description-text'),count=document.getElementById('teacher-indicator-count'),status=document.getElementById('teacher-indicator-status'),save=document.getElementById('teacher-indicator-save');
 for(const sj of sjs)select.add(new Option([sj.code,sj.name].filter(Boolean).join(' — ')+(cls.level.startsWith('ม.')&&sj.vterm?' · ภาคเรียนที่ '+sj.vterm:''),sj.id));select.value=indicatorSubject;
 const updateCount=()=>{count.textContent=ind.value.split('\n').filter(x=>x.trim()).length+' ข้อ · บรรทัดว่างไม่นับเป็นตัวชี้วัด';};
 const populate=()=>{indicatorSubject=select.value;const data=getDescData()[indicatorSubject]||{};ind.value=data.indicators||'';desc.value=data.desc||'';updateCount();status.textContent='แก้ไขได้เฉพาะวิชาที่คุณสอน แอดมินตรวจสอบได้ทั้งหมด';};
 select.onchange=populate;populate();
 const change=(field,value)=>{onDescChange(indicatorSubject,field,value);updateCount();status.textContent='ระบบจะบันทึกอัตโนมัติ · ดูสถานะล่าสุดที่แถบด้านบน';};
 ind.oninput=()=>change('indicators',ind.value);desc.oninput=()=>change('desc',desc.value);
 save.onclick=async()=>{save.disabled=true;save.textContent='กำลังบันทึก…';try{await context.saveChanges();status.textContent='บันทึกตัวชี้วัดส่วนกลางแล้ว';}catch(e){status.textContent=e.message;}finally{save.disabled=false;save.textContent='บันทึกตัวชี้วัด';}};
 }
 function readOnly(page){const isStudents=page==='students',rows=isStudents?getSts():getSjs();document.getElementById('content').innerHTML='<h2>'+(isStudents?'รายชื่อนักเรียน':'รายวิชาที่ได้รับมอบหมาย')+'</h2><p>ดูข้อมูลได้ · หากต้องแก้ไข กรุณาแจ้งแอดมิน</p><div style="overflow:auto"><table class="tbl"><thead><tr><th>'+(isStudents?'เลขที่':'รหัสวิชา')+'</th><th>ชื่อ</th>'+(isStudents?'':'<th>ภาคเรียน</th><th>ชั่วโมง</th>')+'</tr></thead><tbody>'+rows.map((r,i)=>'<tr><td>'+escape(isStudents?r.no||i+1:r.code||'')+'</td><td>'+escape(isStudents?r.name||[r.prefix,r.fname,r.lname].filter(Boolean).join(' '):r.name)+'</td>'+(isStudents?'':'<td>'+escape(r.vterm||'ทั้งปี')+'</td><td>'+escape(r.hours??'')+'</td>')+'</tr>').join('')+'</tbody></table></div>';}
 window.renderPage=function(){if(context.user().role==='admin'){original();return;}if(!allowed(PAGE))PAGE='dashboard';document.getElementById('pgTitle').textContent=pageTitle(PAGE);if(PAGE==='pp5'&&!isSecMode()&&!classWide())bkPriMode='subject';if(PAGE==='dashboard')dashboard();else if(PAGE==='desc')teacherIndicators();else if(['students','subjects'].includes(PAGE))readOnly(PAGE);else original();menus();};
 const more=window.toggleMoreMenu;if(more)window.toggleMoreMenu=function(){more();menus();};
 window.canEditSubject=sj=>context.user().role==='admin'||!!sj&&context.grants().some(g=>g.cid===CID&&(g.sid==='*'||g.sid===sj.id));
 const backup=window.doBackup;window.doBackup=function(){if(context.user().role==='admin')return backup();toast('ครูสำรองได้เฉพาะงานค้างของตนผ่านแถบระบบ ไม่สามารถสำรองทั้งโรงเรียน','inf');};
 menus();
}
