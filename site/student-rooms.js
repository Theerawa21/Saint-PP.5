export function installStudentRooms(){
 const style=document.createElement('style');style.textContent=`
 #student-rooms{padding:20px;margin:0 0 20px;border:1px solid var(--border,#dce3de);border-radius:14px;background:var(--surface,#fff)}
 #student-rooms .sr-heading{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:16px}
 #student-rooms h2{margin:0;font-size:20px;color:var(--text,#234737)}
 #student-rooms .sr-filters{display:flex;gap:12px;flex-wrap:wrap}
 #student-rooms label{display:flex;flex-direction:column;gap:5px;font-size:13px;color:var(--text2,#53665c)}
 #student-rooms select{min-width:140px;min-height:42px;border:1px solid var(--border,#ccd9d0);border-radius:8px;background:var(--surface,#fff);color:var(--text,#234737);padding:8px 12px;font:inherit;font-size:15px}
 #student-rooms .sr-rooms{display:flex;flex-wrap:wrap;gap:10px}
 #student-rooms .sr-room{display:flex;align-items:center;justify-content:space-between;gap:18px;min-width:145px;min-height:54px;padding:12px 16px;border:1px solid var(--border,#ccd9d0);border-radius:10px;background:var(--surface2,#f5f7f4);color:var(--text,#234737);font:inherit;cursor:pointer;text-align:left}
 #student-rooms .sr-room[aria-pressed=true]{background:#2c6a51;color:#fff;border-color:#2c6a51;box-shadow:0 0 0 2px #2c6a5120}
 #student-rooms .sr-room small{font-size:12px;white-space:nowrap}
 #student-rooms :is(button,select):focus-visible{outline:3px solid #70ad93;outline-offset:3px}
 #student-rooms .sr-summary{margin:16px 0 0;padding-top:14px;border-top:1px solid var(--border,#dce3de);color:var(--text2,#53665c);line-height:1.7}
 @media(max-width:600px){#student-rooms{padding:16px}#student-rooms .sr-heading,#student-rooms .sr-filters{width:100%}#student-rooms label{flex:1;min-width:0}#student-rooms select{width:100%;min-width:0}#student-rooms .sr-room{min-width:0;flex:1 1 calc(50% - 10px);gap:8px}}
 @media print{#student-rooms .sr-filters,#student-rooms .sr-rooms{display:none}#student-rooms{padding:0;border:0}}
 `;document.head.append(style);
 const compare=(a,b)=>String(a).localeCompare(String(b),'th',{numeric:true});
 const levelRank=v=>/^[ปม]\.\d+$/.test(v)?(v.startsWith('ป.')?0:10)+Number(v.split('.')[1]):100;
 function decorate(){
  if(PAGE!=='students')return;
  const content=document.getElementById('content');if(!content)return;
  document.getElementById('student-rooms')?.remove();
  // The server supplies only classes this account may access.
  const classes=ld('lk3_classes',[]),current=classes.find(c=>c.id===CID);
  const years=[...new Set(classes.map(c=>String(c.year||'')))].sort((a,b)=>compare(b,a));
  const year=String(current?.year??years[0]??'');
  const inYear=classes.filter(c=>String(c.year||'')===year);
  const levels=[...new Set(inYear.map(c=>c.level))].sort((a,b)=>levelRank(a)-levelRank(b)||compare(a,b));
  const level=current?.level||levels[0]||'';
  const rooms=inYear.filter(c=>c.level===level).sort((a,b)=>compare(a.room,b.room));
  const count=c=>(ld('lk3_'+c.id+'_students',[])||[]).length;
  const section=document.createElement('section');section.id='student-rooms';section.setAttribute('aria-label','เลือกรายชื่อนักเรียนแยกห้อง');
  section.innerHTML='<div class="sr-heading"><h2>รายชื่อนักเรียนแยกห้อง</h2><div class="sr-filters"><label>ปีการศึกษา<select id="student-room-year"'+(!years.length?' disabled':'')+'>'+years.map(y=>'<option value="'+escHtml(y)+'"'+(y===year?' selected':'')+'>'+escHtml(y||'ไม่ระบุปี')+'</option>').join('')+'</select></label><label>ระดับชั้น<select id="student-room-level"'+(!levels.length?' disabled':'')+'>'+levels.map(l=>'<option value="'+escHtml(l)+'"'+(l===level?' selected':'')+'>'+escHtml(l)+'</option>').join('')+'</select></label></div></div><div class="sr-rooms" role="group" aria-label="เลือกห้อง">'+rooms.map((c,i)=>'<button type="button" class="sr-room" data-room-index="'+i+'" aria-pressed="'+(c.id===CID)+'"><strong>'+escHtml(c.level+'/'+c.room)+'</strong><small>'+count(c)+' คน</small></button>').join('')+'</div><p class="sr-summary" role="status">'+(current?'กำลังแสดง <strong>'+escHtml(current.level+'/'+current.room)+'</strong> · ปีการศึกษา '+escHtml(current.year||'—')+' · นักเรียน '+count(current)+' คน'+(!count(current)?' — ยังไม่มีรายชื่อนักเรียนในห้องนี้':''):classes.length?'เลือกห้องด้านบนเพื่อดูรายชื่อนักเรียนเฉพาะห้อง':'ยังไม่มีห้องเรียนที่เข้าถึงได้')+'</p>';
  content.prepend(section);
  const choose=c=>{if(c&&classes.some(x=>x.id===c.id)){sv('lk3_currentYear',String(c.year||''));onClsChange(c.id);}};
  section.querySelector('#student-room-year').onchange=e=>{const candidates=classes.filter(c=>String(c.year||'')===e.target.value);choose(candidates.find(c=>c.level===level)||candidates[0]);};
  section.querySelector('#student-room-level').onchange=e=>choose(inYear.filter(c=>c.level===e.target.value).sort((a,b)=>compare(a.room,b.room))[0]);
  section.querySelectorAll('[data-room-index]').forEach(b=>b.onclick=()=>choose(rooms[Number(b.dataset.roomIndex)]));
 }
 const originalStudents=window.renderStudents;window.renderStudents=function(){originalStudents();decorate();};
 const originalPage=window.renderPage;window.renderPage=function(){originalPage();decorate();};
}

