export const outcomes=item=>item.outcomes||[item.text];
export const planText=plan=>plan.items.flatMap(outcomes).join('\n');
export const outcomeCount=plan=>plan.items.reduce((n,item)=>n+outcomes(item).length,0);
export const singleScore=item=>item.entryMode==='total';
export const filled=v=>['number','string'].includes(typeof v)&&String(v).trim()!==''&&Number.isFinite(Number(v));
export const scorePlan=(data,cid,sid)=>data['lk3_'+cid+'_desc']?.[sid]?.scorePlan||null;
export const maxes=plan=>plan.items.flatMap(i=>i.max);
export function indicatorResult(plan,record,index,term,annual=false){
 const item=plan.items[index],terms=annual?[1,2]:[term],mx=item.max.reduce((a,b)=>a+b,0)*terms.length;
 let raw=0,complete=true;for(const t of terms)for(let j=0;j<3;j++){if(item.max[j]===0)continue;const v=record?.['t'+t+'slots']?.[index*3+j];if(filled(v))raw+=Number(v);else complete=false;}
 const repair=record?.[annual?'annualRepairs':'t'+term+'repairs']?.[item.id]??'';
 const known=item.passPercent!==null&&item.passPercent!==undefined;
 const passed=complete&&known&&(raw>=mx*item.passPercent/100||(filled(repair)&&Number(repair)>=mx*item.passPercent/100));
 return {raw,max:mx,repair,complete,passed,status:!complete?'ยังไม่ครบ':!known?'ยังไม่ตั้งเกณฑ์':passed?'ผ่าน':'ไม่ผ่าน'};
}
export function validatePlan(plan){
 if(!plan||plan.version!==1||!Array.isArray(plan.items)||!plan.items.length||plan.items.length>100)throw Error('กำหนดงานเก็บคะแนน 1 ถึง 100 งาน');
 const ids=new Set();for(const item of plan.items){if(!item||typeof item.id!=='string'||!/^[a-zA-Z0-9_-]{1,100}$/.test(item.id)||ids.has(item.id))throw Error('รหัสรายการตัวชี้วัดไม่ถูกต้อง');ids.add(item.id);if(item.entryMode!==undefined&&!['total','split'].includes(item.entryMode))throw Error('รูปแบบคะแนนไม่ถูกต้อง');if(item.outcomes!==undefined&&(!Array.isArray(item.outcomes)||!item.outcomes.length||item.outcomes.length>20||item.outcomes.some(v=>typeof v!=='string'||!v.trim()||v.length>4000||/[\r\n<>]/.test(v))||item.text!==item.outcomes.join(' / ')))throw Error('กรอกตัวชี้วัดในงานเดียวกันบรรทัดละ 1 ข้อ ไม่เกิน 20 ข้อ');if(singleScore(item)&&(!Array.isArray(item.max)||item.max[1]!==0||item.max[2]!==0))throw Error('คะแนนรวมงานต้องมีคะแนนเต็มเฉพาะช่องแรก');if(typeof item.text!=='string'||!item.text.trim()||item.text.length>4000||/[\r\n<>]/.test(item.text))throw Error('กรอกตัวชี้วัด / ผลการเรียนรู้ให้ครบ ข้อความรวมต่อหนึ่งงานไม่เกิน 4000 ตัวอักษร');if(!Array.isArray(item.max)||item.max.length!==3||item.max.some(v=>typeof v!=='number'||!Number.isFinite(v)||v<0||v>10000)||item.max.every(v=>v===0))throw Error('กำหนดคะแนนเต็มของงานมากกว่า 0 และไม่เกิน 10000 ต่อช่อง');if(item.passPercent!==null&&(typeof item.passPercent!=='number'||!Number.isFinite(item.passPercent)||item.passPercent<0||item.passPercent>100))throw Error('เกณฑ์ผ่านต้องเป็นร้อยละ 0 ถึง 100 หรือเว้นว่าง');}
 if(plan.fourParts)validateFourParts(plan);
}
export function validatePlanChange(before,after,records){
 const hasScores=records.some(r=>[1,2].some(t=>(r['t'+t+'slots']||[]).some(filled))||['t1repairs','t2repairs','annualRepairs'].some(k=>Object.values(r[k]||{}).some(filled)));
 if(hasScores&&!before&&after)throw Error('วิชานี้มีคะแนนเก็บเดิม ต้องจัดคู่คะแนนกับตัวชี้วัดเดิมก่อนเปิดการเชื่อม ไม่เปลี่ยนคะแนนเดิมอัตโนมัติ');
 if(hasScores&&before&&(!after||before.items.length!==after.items.length||before.items.some((v,i)=>v.id!==after.items[i].id)))throw Error('มีคะแนนแล้ว เพิ่ม ลบ หรือสลับตำแหน่งตัวชี้วัดไม่ได้ แก้ข้อความและคะแนนเต็มได้');
 if(hasScores&&before&&after&&before.items.some((item,i)=>outcomes(item).length!==outcomes(after.items[i]).length||singleScore(item)!==singleScore(after.items[i])))throw Error('มีคะแนนแล้ว เปลี่ยนจำนวนตัวชี้วัดในงานหรือรูปแบบช่องคะแนนไม่ได้');
 if(after)for(const r of records)validateLinkedScores(after,r);
}
export function validateLinkedScores(plan,r){
 const m=maxes(plan);for(const t of [1,2]){const a=r['t'+t+'slots']||[];if(!Array.isArray(a)||a.length>m.length)throw Error('จำนวนช่องคะแนนไม่ตรงกับตัวชี้วัด');for(let i=0;i<a.length;i++)if(a[i]!==''&&a[i]!==null&&a[i]!==undefined&&(!filled(a[i])||Number(a[i])<0||Number(a[i])>m[i]))throw Error('คะแนนตัวชี้วัดต้องอยู่ระหว่าง 0 ถึงคะแนนเต็ม');}
 for(const key of ['t1repairs','t2repairs','annualRepairs']){const values=r[key]||{};if(typeof values!=='object'||Array.isArray(values))throw Error('รูปแบบคะแนนซ่อมเสริมไม่ถูกต้อง');for(const [id,v] of Object.entries(values)){const item=plan.items.find(i=>i.id===id),max=item?.max.reduce((a,b)=>a+b,0)*(key==='annualRepairs'?2:1);if(!item||v!==''&&v!==null&&(!filled(v)||Number(v)<0||Number(v)>max))throw Error('คะแนนซ่อมเสริมไม่ตรงกับตัวชี้วัดหรือเกินคะแนนเต็ม');}}
}

export function validateFourParts(plan){
 const p=plan.fourParts;if(!p||typeof p!=='object'||Array.isArray(p)||Object.keys(p).some(k=>!['before','mid','after','final'].includes(k))||['before','mid','after','final'].some(k=>typeof p[k]!=='number'||!Number.isFinite(p[k])||p[k]<0||p[k]>100))throw Error('กรอกคะแนนเต็มทั้ง 4 ส่วนให้ถูกต้อง');
 if(![20,30].includes(p.final)||Math.abs(p.before+p.mid+p.after+p.final-100)>0.000001)throw Error('ก่อนกลางภาค + กลางภาค + หลังกลางภาค ต้องเท่ากับ 70 หรือ 80 และรวมปลายภาคเป็น 100');
 if(p.before<=0||p.after<=0)throw Error('กำหนดคะแนนก่อนและหลังกลางภาคมากกว่า 0');
 if(plan.items.some(i=>!['before','after'].includes(i.stage)))throw Error('เลือกก่อนหรือหลังกลางภาคให้ครบทุกงาน');
 for(const stage of ['before','after'])if(!plan.items.some(i=>i.stage===stage))throw Error('ต้องมีงานตัวชี้วัดทั้งก่อนและหลังกลางภาค');
}
export function fourPartResult(plan,record,term,mmax=100,fmax=100){
 const p=plan.fourParts,r=record||{},vals=r['t'+term+'slots']||[],o={before:0,mid:0,after:0,fin:0,has:false,ready:true};
 for(const stage of ['before','after']){let raw=0,max=0;plan.items.forEach((item,i)=>{if(item.stage!==stage)return;item.max.forEach((m,j)=>{if(m<=0)return;max+=m;const v=vals[i*3+j];if(filled(v)){raw+=Number(v);o.has=true;}else o.ready=false;});});o[stage]=max?raw/max*p[stage]:0;}
 for(const [part,key,max]of [['mid','mraw',mmax],['fin','fraw',fmax]]){const weight=part==='fin'?p.final:p.mid,v=r['t'+term+key];if(weight<=0)continue;if(filled(v)&&max>0){o[part]=Number(v)/max*weight;o.has=true;}else o.ready=false;}
 for(const k of ['before','mid','after','fin'])o[k]=Math.round(o[k]*100)/100;o.total=o.before+o.mid+o.after+o.fin;return o;
}
