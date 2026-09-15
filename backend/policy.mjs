import {calendarError} from './school-config.mjs';
import {validatePlan,validatePlanChange,validateLinkedScores,maxes,planText} from './indicator-model.mjs';
import {eligible,pack,unpack,prefixes} from './legacy-model.mjs';
export function policy(authContext){
 function access(u,id,write=false){let p;try{p=JSON.parse(id);}catch{return false;}if(!Array.isArray(p)||p.length>5||p.some(x=>typeof x!=='string'||['__proto__','prototype','constructor'].includes(x)))return false;const[root,...rest]=p;if(!eligible(root))return false;if(u.role==='admin')return true;
 const {data,grants}=authContext,cs=data.lk3_classes||[];const has=(cid,sid)=>grants.some(g=>g.cid===cid&&(g.sid===sid||g.sid==='*'));
 if(['lk3_school','lk3_schoolLogo','lk3_classes'].includes(root))return !write&&!rest.length;
 const cls=cs.find(c=>root.startsWith('lk3_'+c.id+'_'));
 if(cls){const kind=root.slice(('lk3_'+cls.id+'_').length);if(!grants.some(g=>g.cid===cls.id))return false;
 if(['students','subjects'].includes(kind))return !write&&!rest.length;
 const student=()=> (data['lk3_'+cls.id+'_students']||[]).some(s=>s.id===rest[0]);
 if(['scores','gradeFlag','roundOv'].includes(kind))return rest.length===2&&student()&&has(cls.id,rest[1]);
 if(kind==='desc')return rest.length===1&&(data['lk3_'+cls.id+'_subjects']||[]).some(s=>s.id===rest[0])&&has(cls.id,rest[0]);
 if(kind.startsWith('attendance_'))return rest.length===3&&student()&&has(cls.id,kind.slice(11));
 if(kind==='attendance')return rest.length===3&&student()&&has(cls.id,'*');
 if(kind==='attHours')return rest.length===2&&has(cls.id,'*');
 if(kind.startsWith('attHours_'))return rest.length===2&&has(cls.id,kind.slice(9));
 if(has(cls.id,'*'))return /^(clubs|character(?:_t[12])?|reading(?:_t[12])?|activity(?:_t[12])?|competency(?:_t[12])?|pp6note|desc|indicators(?:_t[12])?|gradeFlag|roundOv)$/.test(kind);
 return false;}
 return cs.some(c=>(data['lk3_'+c.id+'_subjects']||[]).some(s=>has(c.id,s.id)&&prefixes.some(p=>[1,2].some(t=>root===p+s.id+'_t'+t))));
 }
 function validateRecord(op){
 const [root,studentId,subjectId]=JSON.parse(op.id),v=op.value;
 if(root==='lk3_school'){const error=calendarError(v||{});if(error)throw Error(error);}
 if(root.endsWith('_desc')){const p=JSON.parse(op.id);if(p.length!==2||!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).some(k=>!['desc','indicators','scorePlan'].includes(k))||['desc','indicators'].some(k=>v[k]!==undefined&&(typeof v[k]!=='string'||v[k].length>100000)))throw Error('คำอธิบายและตัวชี้วัดต้องเป็นข้อความแยกตามรายวิชา');
 const old=authContext.data[root]?.[studentId]?.scorePlan,plan=v.scorePlan;if(plan){validatePlan(plan);if(v.indicators!==planText(plan))throw Error('ข้อความตัวชี้วัดไม่ตรงกับรายการที่เชื่อมคะแนน');}
 const records=Object.values(authContext.validation[root.replace(/_desc$/,'_scores')]||{}).map(st=>st[studentId]).filter(Boolean);validatePlanChange(old,plan,records);
 }
 if(root.endsWith('_scores')){if(!v||typeof v!=='object'||Array.isArray(v))throw Error('รูปแบบคะแนนไม่ถูกต้อง');
 const cls=(authContext.validation.lk3_classes||[]).find(c=>root==='lk3_'+c.id+'_scores'),sj=(authContext.validation['lk3_'+cls?.id+'_subjects']||[]).find(s=>s.id===subjectId);
 if(!cls||!sj||(authContext.validation['lk3_'+cls.id+'_students']||[]).every(s=>s.id!==studentId))throw Error('ไม่พบนักเรียนหรือวิชา');
 const num=(x,max)=>{if(x===''||x===null||x===undefined)return;if(!['number','string'].includes(typeof x)||!Number.isFinite(Number(x))||Number(x)<0||Number(x)>max)throw Error('คะแนนต้องอยู่ระหว่าง 0 ถึงคะแนนเต็ม');};
 for(const t of [1,2]){const a=v['t'+t+'slots'];if(a!==undefined&&!Array.isArray(a))throw Error('รูปแบบคะแนนย่อยไม่ถูกต้อง');if(a?.length>1000)throw Error('คะแนนย่อยมากเกินไป');const plan=authContext.validation['lk3_'+cls.id+'_desc']?.[subjectId]?.scorePlan;if(plan)validateLinkedScores(plan,v);const max=plan?maxes(plan):authContext.validation['__max_'+subjectId+'_t'+t]||[];for(let i=0;i<(a||[]).length;i++)num(a[i],Number(max[i]??10));num(v['t'+t+'mraw'],Number(authContext.validation['__mmax_'+subjectId+'_t'+t]??100));num(v['t'+t+'fraw'],Number(authContext.validation['__fmax_'+subjectId+'_t'+t]??(cls.scoreMode==='p50'?20:cls.scoreMode==='p100'?50:100)));}
 }
 if(/_attendance(?:_|$)/.test(root)&&!['','/','ป','ล','ข','-','ส'].includes(v))throw Error('สถานะเวลาเรียนไม่ถูกต้อง');
 if(/_attHours(?:_|$)/.test(root)&&!(v===''||(Number.isFinite(Number(v))&&Number(v)>=0&&Number(v)<=24)))throw Error('ชั่วโมงเรียนต้องเป็นตัวเลข 0–24 หรือเว้นว่าง');
 }
 function validate(v,d=0){if(d>30)throw Error('ข้อมูลซ้อนลึกเกินไป');if(v&&typeof v==='object')for(const[k,x]of Object.entries(v)){if(['__proto__','constructor','prototype'].includes(k))throw Error('ฟิลด์ไม่ถูกต้อง');validate(x,d+1);}if(typeof v==='string'&&(/[<>]/.test(v)||v.length>5000000))throw Error('ข้อความหรือขนาดไม่รองรับ');}
return {access,validateRecord,validate};
}
