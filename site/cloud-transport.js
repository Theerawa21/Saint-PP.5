(()=>{
const nativeFetch=window.fetch.bind(window),sessionKey='st-cloud-session',endpoint=window.ST_CLOUD_CONFIG?.endpoint||'';
let peer,peerOrigin,iframe,readyPromise;const pending=new Map(),channel=Array.from(crypto.getRandomValues(new Uint8Array(24)),v=>v.toString(16).padStart(2,'0')).join('');
function ready(){if(readyPromise)return readyPromise;readyPromise=new Promise((resolve,reject)=>{
 if(!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint)){reject(Error('ระบบออนไลน์กำลังเตรียมการเชื่อม Google Drive กรุณาใช้เว็บเดิมก่อน'));return;}
 const timer=setTimeout(()=>reject(Error('เชื่อม Google ไม่สำเร็จ กรุณาตรวจการเผยแพร่ Apps Script')),30000);
 window.addEventListener('message',e=>{const d=e.data;if(!d||d.channel!==channel)return;
  if(d.type==='st-ready'&&(/^https:\/\/[a-z0-9-]+\.script\.googleusercontent\.com$/.test(e.origin)||/^https:\/\/[a-z0-9-]+-script\.googleusercontent\.com$/.test(e.origin))&&!peer){peer=e.source;peerOrigin=e.origin;clearTimeout(timer);resolve();}
  else if(d.type==='st-result'&&e.source===peer&&e.origin===peerOrigin&&pending.has(d.id)){const p=pending.get(d.id);pending.delete(d.id);clearTimeout(p.timer);p.resolve(d.result);}
 });
 iframe=document.createElement('iframe');iframe.hidden=true;iframe.title='การเชื่อมฐานข้อมูลโรงเรียน';iframe.src=endpoint+'?channel='+channel;document.body.append(iframe);
 });return readyPromise;}
async function request(path,options={}){
 await ready();const url=new URL(path,location.href),id=crypto.randomUUID(),body=options.body?JSON.parse(options.body):undefined;
 const response=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pending.delete(id);reject(Error('ยังไม่ได้รับผลบันทึก กรุณาเก็บงานค้างแล้วตรวจข้อมูลล่าสุดก่อนลองใหม่'));},60000);pending.set(id,{resolve,timer});peer.postMessage({type:'st-rpc',channel,id,request:{path:url.pathname,query:Object.fromEntries(url.searchParams),method:options.method||'GET',body,token:sessionStorage.getItem(sessionKey)||''}},peerOrigin);});
 if(response.body?.token)sessionStorage.setItem(sessionKey,response.body.token);if(url.pathname==='/api/logout'&&response.status===200)sessionStorage.removeItem(sessionKey);
 return new Response(JSON.stringify(response.body),{status:response.status,headers:{'Content-Type':'application/json'}});
}
window.ST_CLOUD={fetch:(path,options)=>String(path).startsWith('/api/')?request(path,options):nativeFetch(path,options)};
})();