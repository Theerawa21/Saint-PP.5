import scrypt from '../vendor/scrypt-js/scrypt.js';
import {gcm} from '../vendor/noble-ciphers/esm/aes.js';
const hex=a=>Array.from(a,x=>x.toString(16).padStart(2,'0')).join('');
const bytes=s=>{if(typeof s!=='string'||s.length%2||!/^[a-f0-9]+$/i.test(s))throw Error('Invalid hexadecimal value');return Uint8Array.from(s.match(/../g),x=>parseInt(x,16));};
export function makeCrypto(io){
 const password=(p,s)=>hex(scrypt.syncScrypt(io.encode(p),io.encode(s),16384,8,1,64));
 return {hash:io.hash,random:io.random,password,verify:(p,s,h)=>{const candidate=password(p,s);if(candidate.length!==h.length)return false;let diff=0;for(let i=0;i<h.length;i++)diff|=h.charCodeAt(i)^candidate.charCodeAt(i);return diff===0;}};
}
export function seal(value,key,nonce,encode){const iv=bytes(nonce).slice(0,12);return {format:'SaintTheresaEncrypted1',iv:hex(iv),ciphertext:hex(gcm(bytes(key),iv).encrypt(encode(JSON.stringify(value))))};}
export function open(envelope,key,decode){if(envelope?.format!=='SaintTheresaEncrypted1'||envelope.iv.length!==24)throw Error('Invalid encrypted database');return JSON.parse(decode(gcm(bytes(key),bytes(envelope.iv)).decrypt(bytes(envelope.ciphertext))));}
