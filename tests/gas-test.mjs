import vm from 'node:vm';import fs from 'node:fs';import assert from 'node:assert/strict';import {createHash,randomBytes,randomUUID} from 'node:crypto';
import {fixture} from './core-test.mjs';import {seal,open} from '../backend/crypto.mjs';
const key=randomBytes(32).toString('hex'),db=fixture(),map=new Map([['ST_DATABASE_KEY',key],['ST_SITE_ORIGIN','https://theerawa21.github.io'],['ST_DATABASE_FILE','db-file']]),cache=new Map();let content=JSON.stringify(seal(db,key,randomBytes(32).toString('hex'),s=>new TextEncoder().encode(s))),locked=false,writes=0;
const context={console,Uint8Array,Uint32Array,Int32Array,DataView,ArrayBuffer,TextEncoder,TextDecoder,Date,Math,JSON,Set,Map,Object,Number,String,Error,Promise,RegExp,Array,
 PropertiesService:{getScriptProperties:()=>({getProperty:k=>map.get(k)||null,setProperty:(k,v)=>map.set(k,v)})},
 LockService:{getScriptLock:()=>({tryLock:()=>{if(locked)return false;locked=true;return true},releaseLock:()=>locked=false})},
 CacheService:{getScriptCache:()=>({get:k=>cache.get(k)||null,put:(k,v)=>cache.set(k,v),remove:k=>cache.delete(k)})},
 Utilities:{DigestAlgorithm:{SHA_256:'sha256'},Charset:{UTF_8:'utf8'},getUuid:randomUUID,computeDigest:(_,s)=>[...createHash('sha256').update(s).digest()].map(v=>v>127?v-256:v),newBlob:data=>{const b=typeof data==='string'?Buffer.from(data):Buffer.from(data.map(v=>(v+256)%256));return {getBytes:()=>[...b].map(v=>v>127?v-256:v),getDataAsString:()=>b.toString('utf8')}}},
 DriveApp:{getFileById:id=>{assert.equal(id,'db-file');return {getBlob:()=>({getDataAsString:()=>content}),setContent:s=>{content=s;writes++}}}}
};vm.createContext(context);vm.runInContext(fs.readFileSync(new URL('../apps-script/Code.gs',import.meta.url),'utf8'),context);
function rpc(path,body,token){return context.stRpc({origin:'https://theerawa21.github.io',path,method:body?'POST':'GET',body,token});}
assert.equal(rpc('/api/legacy').status,401);assert.equal(context.stRpc({origin:'https://evil.example',path:'/api/status'}).status,400);
const login=rpc('/api/login',{username:'teacher',password:'Synthetic-test-password'});assert.equal(login.status,200,JSON.stringify(login));const token=login.body.token;assert.equal(writes,0);
const view=rpc('/api/legacy',null,token);assert.equal(view.status,200);assert(!JSON.stringify(view).includes('Hidden'));const id='["lk3_c1_scores","s1","math"]',op={id,rev:0,value:{t1slots:[5,'','',10],t1mraw:80,t1fraw:90}};
assert.equal(rpc('/api/legacy',{operations:[op]},token).status,200);assert.equal(writes,1);assert.equal(rpc('/api/legacy',{operations:[op]},token).status,409);assert.equal(writes,1);
const decoded=open(JSON.parse(content),key,b=>new TextDecoder().decode(b));assert.equal(decoded.records[id].t1mraw,80);assert.equal(decoded.generation,1);assert.equal(Object.keys(decoded.sessions).length,0);assert.equal(Object.keys(decoded.attempts).length,0);
locked=true;assert.equal(rpc('/api/legacy',null,token).status,503);locked=false;assert.equal(rpc('/api/logout',{},token).status,200);assert.equal(rpc('/api/legacy',null,token).status,401);
assert.equal(typeof context.initializeDatabase,'undefined');assert.equal(typeof context.backupToSchoolDrive,'undefined');
console.log('PASS bundled Apps Script executes, locked encrypted writes, persisted reload, wrong origin, conflicts, logout and private setup functions');
