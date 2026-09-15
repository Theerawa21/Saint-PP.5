import {build} from '../../node_modules/esbuild/lib/main.js';
import {readFileSync,writeFileSync,copyFileSync,mkdirSync,readdirSync} from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url)),old=path.resolve(root,'../saint-theresa'),site=path.join(root,'site'),gas=path.join(root,'apps-script');mkdirSync(gas,{recursive:true});
await build({entryPoints:[path.join(root,'backend/gas-entry.mjs')],bundle:true,format:'iife',globalName:'STCloud',platform:'browser',target:'es2020',outfile:path.join(gas,'Code.gs'),legalComments:'inline'});
const gs=path.join(gas,'Code.gs');writeFileSync(gs,readFileSync(gs,'utf8')+'\nfunction doGet(e){return STCloud.page(e)}\nfunction stRpc(r){return STCloud.rpc(r)}\nfunction initializeDatabase_(){return STCloud.initialize()}\nfunction backupToSchoolDrive_(){return STCloud.backup()}\n');
for(const f of ['Bridge.html','appsscript.json'])copyFileSync(path.join(root,'backend',f),path.join(gas,f));
for(const f of readdirSync(path.join(old,'multiuser/public'))){let text=readFileSync(path.join(old,'multiuser/public',f),'utf8');
 if(f.endsWith('.js')||f.endsWith('.mjs'))text=text.replace(/from '\//g,"from './").replace(/fetch\(/g,'window.ST_CLOUD.fetch(').replace(/location.href='\/app#/g,"location.href='./app.html#").replace(/location.href='\/app'/g,"location.href='./app.html'").replace(/location.href='\//g,"location.href='./").replace(/script.src='\/curriculum-2569.js'/g,"script.src='./curriculum-2569.js'");
 if(f==='legacy-bridge.js')text=text.replace('},3000);','},15000);');
 if(f==='index.html')text=text.replace('href="/style.css"','href="./style.css"').replace('<script src="/app.js" defer>', '<script src="./cloud-config.js"></script><script src="./cloud-transport.js"></script><script src="./app.js" defer>');
 writeFileSync(path.join(site,f),text);
}
let html=readFileSync(path.join(old,'index.html'),'utf8').replace('bootApp();','/* managed cloud startup */').replace(/<script src="(?:drive-storage|school-profile|curriculum-2569)\.js"><\/script>/g,'');
const pre=`<script src="./cloud-config.js"></script><script src="./cloud-transport.js"></script><script>window.ST_MEMORY={};window.ST_STORE={getItem:k=>Object.hasOwn(ST_MEMORY,k)?ST_MEMORY[k]:null,setItem:(k,v)=>{ST_MEMORY[k]=String(v)},removeItem:k=>{delete ST_MEMORY[k]},clear:()=>{for(const k of Object.keys(ST_MEMORY))delete ST_MEMORY[k]}};Object.defineProperty(window,'localStorage',{value:new Proxy(ST_STORE,{ownKeys:()=>Object.keys(ST_MEMORY),getOwnPropertyDescriptor:()=>({enumerable:true,configurable:true})})});</script>`;
html=html.replace('<head>','<head>'+pre);const i=html.lastIndexOf('</body>');html=html.slice(0,i)+'<script type="module" src="./legacy-bridge.js"></script>'+html.slice(i);writeFileSync(path.join(site,'app.html'),html);
copyFileSync(path.join(old,'curriculum-2569.js'),path.join(site,'curriculum-2569.js'));
writeFileSync(path.join(site,'.nojekyll'),'');console.log('Built GitHub Pages frontend and Apps Script backend');
