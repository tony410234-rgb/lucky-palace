/* 태율랜드 · 같이하기 네트워크 (Firebase Realtime Database REST + 실시간 스트림) */
(()=>{
const DB_URL='https://taetylland-default-rtdb.asia-southeast1.firebasedatabase.app';   // ← Firebase Realtime Database 주소
const mock=/[?&]mock=1/.test(location.search);   // 테스트용(같은 브라우저 탭끼리)
const base=()=>DB_URL.replace(/\/+$/,'');
const ks=p=>String(p).split('/').filter(Boolean);
function setAt(o,path,v){const k=ks(path);if(!k.length)return v;let x=o;for(let i=0;i<k.length-1;i++){if(typeof x[k[i]]!=='object'||x[k[i]]===null)x[k[i]]={};x=x[k[i]]}if(v===null||v===undefined)delete x[k[k.length-1]];else x[k[k.length-1]]=v;return o}
function getAt(o,path){let x=o;for(const k of ks(path)){if(x==null)return null;x=x[k]}return x===undefined?null:x}
let bc=null;const mdb=()=>{try{return JSON.parse(localStorage.tlmock||'{}')}catch(e){return {}}};
async function req(method,path,val){
 if(mock){const db=mdb();if(method==='GET')return getAt(db,path);
  if(method==='PATCH'){for(const k in val)setAt(db,path+'/'+k,val[k])}else setAt(db,path,method==='DELETE'?null:val);
  localStorage.tlmock=JSON.stringify(db);(bc||(bc=new BroadcastChannel('tlmock'))).postMessage({method,path,val});return method==='DELETE'?null:val}
 const r=await fetch(base()+'/'+path+'.json',{method,body:val===undefined?undefined:JSON.stringify(val),cache:'no-store'});
 if(!r.ok)throw new Error('net '+r.status);return r.json()}
let es=null,lch=null;
function listen(path,cb){stop();let m={};
 if(mock){m=getAt(mdb(),path)||{};setTimeout(()=>cb('/',m,!getAt(mdb(),path)),0);
  lch=new BroadcastChannel('tlmock');lch.onmessage=e=>{const d=e.data;if(!d.path.startsWith(path))return;const rel=d.path.slice(path.length)||'/';
   if(rel==='/'){m=d.method==='DELETE'?{}:(d.val||{});cb('/',m,d.method==='DELETE');return}
   if(d.method==='PATCH'){for(const k in d.val)setAt(m,rel+'/'+k,d.val[k])}else setAt(m,rel,d.method==='DELETE'?null:d.val);cb(rel,m,false)};return}
 es=new EventSource(base()+'/'+path+'.json');
 es.addEventListener('put',e=>{const d=JSON.parse(e.data);if(d.path==='/'){m=d.data||{};cb('/',m,d.data===null)}else{setAt(m,d.path,d.data);cb(d.path,m,false)}});
 es.addEventListener('patch',e=>{const d=JSON.parse(e.data);for(const k in d.data)setAt(m,d.path+'/'+k,d.data[k]);cb(d.path,m,false)});
 es.addEventListener('cancel',()=>cb('#err',m,false));es.onerror=()=>cb('#err',m,false)}
function stop(){if(es){es.close();es=null}if(lch){lch.close();lch=null}}
window.NET={ok:()=>mock||!!DB_URL,req,listen,stop,mock};
})();
