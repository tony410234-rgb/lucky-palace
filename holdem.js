/* 태율랜드 · 텍사스 홀덤 (AI 4명) */
(()=>{
const $=id=>document.getElementById(id);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let A=null;const api=()=>A||(A=window.TL_API);
const K=()=>window.CARDKIT;
const fmt=n=>Math.round(n).toLocaleString('en-US');
const short=n=>K().short(n);
const RN=v=>v===14?'A':v===13?'K':v===12?'Q':v===11?'J':String(v);
const RS=v=>v===14?'A':v>10?['J','Q','K'][v-11]:String(v);
const cR=c=>c%13+2,cS=c=>(c/13)|0;
const cImg=c=>K().cardSVG(RS(cR(c)),'scdh'[cS(c)]);

/* ================= 족보 판정 ================= */
const NAMES=['하이카드','원페어','투페어','트리플','스트레이트','플러시','풀하우스','포카드','스트레이트 플러시','로열 플러시'];
function sHigh(m){if(m&(1<<14))m|=2;for(let h=14;h>=5;h--){const n=31<<(h-4);if((m&n)===n)return h}return 0}
function ev7(cs){
 const rc=new Array(15).fill(0),sc=[0,0,0,0],sm=[0,0,0,0];let rm=0;
 for(const c of cs){const r=cR(c),s=cS(c);rc[r]++;sc[s]++;sm[s]|=1<<r;rm|=1<<r}
 let fs=-1;for(let s=0;s<4;s++)if(sc[s]>=5)fs=s;
 let k;
 if(fs>=0){const h=sHigh(sm[fs]);if(h)k=[h===14?9:8,h]}
 if(!k){const q=[],t=[],p=[],one=[];for(let r=14;r>=2;r--){if(rc[r]===4)q.push(r);else if(rc[r]===3)t.push(r);else if(rc[r]===2)p.push(r);if(rc[r])one.push(r)}
  const ks=(ex,n)=>one.filter(r=>!ex.includes(r)).slice(0,n);
  if(q.length)k=[7,q[0],...ks([q[0]],1)];
  else if(t.length&&(t.length>1||p.length))k=[6,t[0],Math.max(t[1]||0,p[0]||0)];
  else if(fs>=0){const f=[];for(let r=14;r>=2&&f.length<5;r--)if(sm[fs]&(1<<r))f.push(r);k=[5,...f]}
  else{const h=sHigh(rm);if(h)k=[4,h];
   else if(t.length)k=[3,t[0],...ks([t[0]],2)];
   else if(p.length>1)k=[2,p[0],p[1],...ks([p[0],p[1]],1)];
   else if(p.length)k=[1,p[0],...ks([p[0]],3)];
   else k=[0,...one.slice(0,5)]}}
 let sc2=k[0]===9?8:k[0];for(let i=1;i<6;i++)sc2=sc2*15+(k[i]||0);
 return {sc:sc2,cat:k[0],k,fs};
}
function used(cs,e){const k=e.k,cat=e.cat,out=[];const take=(r,n,suit=-1)=>{for(const c of cs){if(out.length>=5||!n)break;if(out.includes(c))continue;if(cR(c)===r&&(suit<0||cS(c)===suit)){out.push(c);n--}}};
 const seq=h=>{const a=[];for(let i=0;i<5;i++){const r=h-i;a.push(r===1?14:r)}return a};
 if(cat>=8)seq(k[1]).forEach(r=>take(r,1,e.fs));
 else if(cat===7){take(k[1],4);take(k[2],1)}
 else if(cat===6){take(k[1],3);take(k[2],2)}
 else if(cat===5)k.slice(1).forEach(r=>take(r,1,e.fs));
 else if(cat===4)seq(k[1]).forEach(r=>take(r,1));
 else if(cat===3){take(k[1],3);take(k[2],1);take(k[3],1)}
 else if(cat===2){take(k[1],2);take(k[2],2);take(k[3],1)}
 else if(cat===1){take(k[1],2);k.slice(2).forEach(r=>take(r,1))}
 else k.slice(1).forEach(r=>take(r,1));
 return out}
function hname(e){const k=e.k;switch(e.cat){
 case 0:return `${RN(k[1])} 하이카드`;case 1:return `${RN(k[1])} 원페어`;case 2:return `${RN(k[1])}·${RN(k[2])} 투페어`;
 case 3:return `${RN(k[1])} 트리플`;case 4:return `${RN(k[1])} 하이 스트레이트`;case 5:return `${RN(k[1])} 하이 플러시`;
 case 6:return `풀하우스 (${RN(k[1])}·${RN(k[2])})`;case 7:return `${RN(k[1])} 포카드`;case 8:return `${RN(k[1])} 스트레이트 플러시`;default:return '로열 플러시'}}
function preName(h){const [a,b]=h.map(cR).sort((x,y)=>y-x);const s=cS(h[0])===cS(h[1]);
 if(a===b)return `포켓 페어 (${RN(a)}${RN(a)})`;return `${RN(a)}${RN(b)} ${s?'수딧':'오프수트'}`}
function chen(h){const [a,b]=h.map(cR).sort((x,y)=>y-x);const base=v=>v===14?10:v===13?8:v===12?7:v===11?6:v/2;let p=base(a);
 if(a===b)p=Math.max(5,p*2);if(cS(h[0])===cS(h[1]))p+=2;const g=a-b-1;if(a!==b){p-=g<=0?0:g===1?1:g===2?2:g===3?4:5;if(g<=1&&a<12)p+=1}return Math.ceil(p)}
const tier=h=>{const c=chen(h);return c>=11?['프리미엄','t4']:c>=8?['좋은 패','t3']:c>=6?['플레이 가능','t2']:['약한 패','t1']};
function draws(hole,board){if(board.length<3||board.length>=5)return '';const all=[...hole,...board];const e=ev7(all);const out=[];
 if(e.cat<5){const sc=[0,0,0,0];all.forEach(c=>sc[cS(c)]++);const s=sc.findIndex(n=>n===4);if(s>=0&&hole.some(c=>cS(c)===s))out.push('플러시 드로우')}
 if(e.cat<4){let rm=0;all.forEach(c=>rm|=1<<cR(c));let n=0;for(let r=2;r<=14;r++)if(!(rm&(1<<r))&&sHigh(rm|(1<<r)))n++;if(n>=2)out.push('양방 스트레이트 드로우');else if(n===1)out.push('거트샷 드로우')}
 return out.join(' · ')}
function equity(hole,board,nOpp,it=300){if(nOpp<1)return 1;const known=new Set([...hole,...board]);const deck=[];for(let c=0;c<52;c++)if(!known.has(c))deck.push(c);
 let win=0;const need=5-board.length,n=deck.length;
 for(let i=0;i<it;i++){for(let j=0;j<need+nOpp*2;j++){const x=j+Math.floor(Math.random()*(n-j));const t=deck[j];deck[j]=deck[x];deck[x]=t}
  const bd=board.concat(deck.slice(0,need));const me=ev7(hole.concat(bd)).sc;let best=0,tie=1,lose=false;
  for(let o=0;o<nOpp;o++){const s=ev7([deck[need+o*2],deck[need+o*2+1],...bd]).sc;if(s>me){lose=true;break}if(s===me)tie++}
  if(!lose)win+=1/tie}
 return win/it}

/* ================= 데이터 ================= */
const TABLES=[{id:'r',name:'루키 테이블',sb:100,bb:200,buy:20000,col:'#2a8a5a'},{id:'n',name:'일반 테이블',sb:500,bb:1000,buy:100000,col:'#2a5ae0'},{id:'v',name:'VIP 하이롤러',sb:5000,bb:10000,buy:1000000,col:'#c08a10'}];
const AIP=()=>{const AV=K().AV;return [
 {name:'강남불주먹',av:AV('#f4c8a0','#2a1a10','#2a5ae0','cap'),tight:.35,aggr:.75,bluff:.35,chat:{raise:['가즈아!','받아라!'],fold:['에잇'],win:['역시 나야','쉽네~'],allin:['올인 간다!!']}},
 {name:'달빛여우',av:AV('#ffe0c8','#c03a6a','#9a4ae0','girl'),tight:.55,aggr:.5,bluff:.2,chat:{raise:['조금 올릴게요~'],fold:['패스할게요'],win:['후훗♪','감사합니다~'],allin:['다 걸어볼게요!']}},
 {name:'배팅장인',av:AV('#e8c0a0','#3a2a20','#2a2a3a','bald'),tight:.7,aggr:.35,bluff:.08,chat:{raise:['레이즈.'],fold:['폴드.'],win:['계산대로군'],allin:['올인.']}},
 {name:'오늘만산다',av:AV('#ffd8b8','#e0a020','#e0602a','boy'),tight:.2,aggr:.6,bluff:.5,chat:{raise:['오늘만 산다!','콜 해봐~'],fold:['아 쫄았다'],win:['개꿀!!','이게 되네ㅋㅋ'],allin:['인생 한방!!']}}]};
const SEAT=[[50,78],[9,56],[19,24],[81,24],[91,56]],CEN=[50,40];
const toward=(i,f)=>[SEAT[i][0]+(CEN[0]-SEAT[i][0])*f,SEAT[i][1]+(CEN[1]-SEAT[i][1])*f];

let ui=null,P=[],T=TABLES[1],board=[],pot=0,cur=0,minR=0,btn=0,gen=0,inHand=false,meWait=null,handNo=0,stage='';
const ABORT={};
const bal=()=>api().S.bal;
function setBal(v){api().S.bal=v;api().save();api().renderBal&&api().renderBal();$('hebal').textContent=fmt(v)}
function saveStk(){api().S.heStack=P[0]?P[0].stack:0;api().S.heTable=T.id;api().save()}
const sfx=k=>{try{api().sfx(k)}catch(e){}};

/* ================= 화면 ================= */
function css(){if($('hecss'))return;const s=document.createElement('style');s.id='hecss';s.textContent=`
#he{position:fixed;inset:0;z-index:70;display:none;overflow:hidden;container-type:size;font-family:Jua,sans-serif;color:#fff;user-select:none;background:radial-gradient(ellipse at 50% 30%,#2a1450,#0a0418 75%)}
#he.on{display:block}body.heon{overflow:hidden}
.hefelt{position:absolute;left:4%;top:9%;width:92%;height:78%}
.hetop{position:absolute;left:1.2%;top:2%;right:1.2%;display:flex;align-items:center;gap:1.2cqw;z-index:6}
.hetop button{background:#0007;border:0;color:#fff;font:900 clamp(11px,1.7cqw,17px) Jua,sans-serif;padding:.4em .9em;border-radius:12px}
.hebal{display:flex;align-items:center;gap:.4em;background:#0008;padding:.25em .9em .25em .3em;border-radius:20px;border:2px solid #ffd76a;font:900 clamp(12px,1.9cqw,20px) Arial,sans-serif}
.hebal i{width:1.4em;height:1.4em;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff6b0,#e0a010 60%,#8a5a00);color:#6a3a00;font-style:normal;display:grid;place-items:center;font-size:.8em}
.heblind{margin-left:auto;background:#0008;padding:.3em .9em;border-radius:12px;font-size:clamp(10px,1.5cqw,15px);color:#ffe9a0}
.hes{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;z-index:3}
.hes .hebox{display:flex;align-items:center;gap:.5cqw;background:linear-gradient(#2a1a4a,#120826);border:2px solid #8a6ad0;border-radius:3cqw;padding:.3cqw 1.2cqw .3cqw .3cqw;box-shadow:0 .5cqw 1cqw #0009;position:relative;white-space:nowrap}
.hes .hebox img{width:5cqw;height:5cqw;border-radius:50%;border:2px solid #fff6}
.hes .hebox b{display:block;font-size:clamp(9px,1.5cqw,16px)}.hes .hebox span{display:block;font:900 clamp(9px,1.45cqw,15px) Arial,sans-serif;color:#ffd76a}
.hes.turn .hebox{border-color:#ffe04a;box-shadow:0 0 0 .3cqw #ffe04a88,0 0 2cqw #ffd000aa;animation:heturn 1s infinite}
@keyframes heturn{50%{box-shadow:0 0 0 .5cqw #ffe04a55,0 0 3cqw #ffd000}}
.hes.fold{opacity:.45}.hes.win .hebox{border-color:#5aff8a;box-shadow:0 0 3cqw #3aff7a}
.hes.out{opacity:.25}
.hehole{display:flex;height:6cqw;margin-bottom:-1cqw;position:relative;z-index:1}
.hehole .hec{width:4.2cqw;height:5.9cqw;margin:0 -.6cqw}
.hehole .hec:first-child{transform:rotate(-8deg)}.hehole .hec:last-child{transform:rotate(8deg)}
.hes.me .hehole{height:10cqw;margin-bottom:-1.4cqw}.hes.me .hehole .hec{width:7cqw;height:9.8cqw;margin:0 -.3cqw}
.hec{position:relative;border-radius:.6cqw;transition:transform .2s,filter .2s}.hec img{width:100%;height:100%;display:block;filter:drop-shadow(0 .3cqw .4cqw #0008)}
.hec.use{transform:translateY(-.8cqw)!important;filter:drop-shadow(0 0 .8cqw #ffe04a) drop-shadow(0 0 .3cqw #ffe04a)}
.hec.dim{filter:brightness(.55)}
.heact{position:absolute;top:-1cqw;left:50%;transform:translate(-50%,-100%);background:#fff;color:#2a1050;font-size:clamp(9px,1.5cqw,15px);padding:.2em .8em;border-radius:1em;opacity:0;transition:opacity .2s;white-space:nowrap;z-index:5;font-weight:900}
.heact.on{opacity:1}.heact.f{background:#777;color:#fff}.heact.r{background:#ff3a5a;color:#fff}.heact.a{background:linear-gradient(#ffe04a,#ff8a00);color:#4a1a00}.heact.c{background:#3ab0ff;color:#fff}
.hes.me .heact{top:-1cqw}
.hesd{position:absolute;bottom:-1.2cqw;left:50%;transform:translate(-50%,100%);background:#000c;border:1px solid #ffd76a;color:#ffe9a0;font-size:clamp(9px,1.4cqw,14px);padding:.1em .7em;border-radius:.8em;white-space:nowrap;display:none}
.hesd.on{display:block}.hes.win .hesd{background:linear-gradient(#ffe04a,#e08a00);color:#3a1a00;font-weight:900}
.hebet{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:.4cqw;z-index:2;font:900 clamp(9px,1.4cqw,14px) Arial,sans-serif;text-shadow:0 1px 2px #000}
.hebet img{width:3.2cqw;height:3.2cqw}
.hedb{position:absolute;width:2.8cqw;height:2.8cqw;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#ddd 60%,#999);color:#222;font:900 clamp(8px,1.3cqw,13px) Arial;display:grid;place-items:center;transform:translate(-50%,-50%);transition:left .5s,top .5s;box-shadow:0 .3cqw .5cqw #0008;z-index:2}
#heboard{position:absolute;left:50%;top:40%;transform:translate(-50%,-50%);display:flex;gap:.8cqw;z-index:2}
#heboard .slot{width:7.4cqw;height:10.4cqw;border:2px dashed #ffffff30;border-radius:.8cqw;position:relative}
#heboard .hec{position:absolute;inset:0}
#hepot{position:absolute;left:50%;top:22%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:.6cqw;background:#0009;border:2px solid #ffd76a88;padding:.2cqw 1.4cqw .2cqw .3cqw;border-radius:2cqw;font:900 clamp(11px,1.9cqw,20px) Arial,sans-serif;color:#ffe9a0;z-index:2}
#hepot img{width:3.2cqw;height:3.2cqw}
#heinfo{position:absolute;left:1.2%;bottom:2%;width:27%;background:linear-gradient(#2a1a50ee,#120828ee);border:2px solid #9a7aff;border-radius:1.6cqw;padding:.8cqw 1.2cqw;z-index:5;box-shadow:0 .6cqw 1.4cqw #000a}
#heinfo small{display:block;color:#c8b0ff;font-size:clamp(8px,1.2cqw,12px)}
#heinfo b{display:block;font-size:clamp(13px,2.5cqw,26px);line-height:1.15;color:#ffe04a;text-shadow:0 2px 0 #6a3a00}
#heinfo b.big{animation:hebig 1s infinite;color:#fff;text-shadow:0 0 1cqw #ff3aa0,0 2px 0 #a0005a}
@keyframes hebig{50%{transform:scale(1.06)}}
#hedraw{display:block;color:#7aeaff;font-size:clamp(8px,1.25cqw,13px);min-height:1.2em}
.heeq{height:1cqw;background:#0008;border-radius:1cqw;overflow:hidden;margin-top:.4cqw}.heeq i{display:block;height:100%;width:0;background:linear-gradient(90deg,#ff4a6a,#ffd04a,#4aff8a);transition:width .5s}
#heeqt{display:flex;justify-content:space-between;font-style:normal;font-size:clamp(8px,1.25cqw,13px);margin-top:.2cqw;color:#ddd}
.tier{padding:0 .5em;border-radius:.6em;font-size:.95em}.tier.t4{background:#ff3a7a}.tier.t3{background:#e08a10}.tier.t2{background:#3a8ae0}.tier.t1{background:#555}
#hectl{position:absolute;right:1.2%;bottom:2%;display:flex;gap:1cqw;z-index:6}
#hectl button,.herp button{border:0;border-radius:1.4cqw;color:#fff;font:900 clamp(12px,2.1cqw,22px) Jua,sans-serif;min-width:12cqw;height:6.4cqw;box-shadow:0 .5cqw 0 #0008,inset 0 .3cqw 0 #fff5;text-shadow:0 2px 0 #0006}
#hectl button small{display:block;font:900 clamp(9px,1.35cqw,14px) Arial,sans-serif;opacity:.95}
#hectl .f{background:linear-gradient(#8a8a9a,#4a4a5a)}#hectl .c{background:linear-gradient(#3ad06a,#1a8a3a)}#hectl .r{background:linear-gradient(#ff5a7a,#c01a3a)}
#hectl button:disabled{filter:grayscale(1) brightness(.6)}
#hectl.off{display:none}
.herp{position:absolute;right:1.2%;bottom:12%;width:37%;background:linear-gradient(#2a1a50f4,#120828f4);border:2px solid #ff7a9a;border-radius:1.6cqw;padding:1cqw;z-index:7;display:none}
.herp.on{display:block}
.herp .pre{display:flex;gap:.6cqw}.herp .pre button{min-width:0;flex:1;height:4.6cqw;font-size:clamp(10px,1.6cqw,16px);background:linear-gradient(#6a4ad0,#3a1a90)}
.herp .row{display:flex;align-items:center;gap:1cqw;margin-top:1cqw}
.herp input{flex:1;accent-color:#ff5a7a;height:3cqw}
.herp .v{font:900 clamp(12px,2.2cqw,22px) Arial,sans-serif;color:#ffe04a;min-width:10cqw;text-align:right}
.herp .ok{min-width:11cqw!important;height:5cqw!important;background:linear-gradient(#ff5a7a,#c01a3a)}
#hemsg{position:absolute;left:50%;top:40%;transform:translate(-50%,-50%) scale(.8);text-align:center;z-index:8;opacity:0;transition:.25s;pointer-events:none;background:#1a0430dd;padding:.4em 1.6em;border-radius:2cqw;border:2px solid #ffd76a}
#hemsg.on{opacity:1;transform:translate(-50%,-50%) scale(1)}
#hemsg b{display:block;font:900 clamp(16px,3.4cqw,38px) Jua,sans-serif;color:#ffe04a;text-shadow:0 3px 0 #7a3a00}#hemsg small{display:block;font-size:clamp(10px,1.7cqw,18px)}
.hemodal{position:absolute;inset:0;background:#000a;z-index:20;display:none;align-items:center;justify-content:center}
.hemodal.on{display:flex}
.hemodal .in{background:linear-gradient(#2a1a50,#120828);border:3px solid #ffd76a;border-radius:2cqw;padding:2cqw 3cqw;max-height:90%;overflow:auto;min-width:50%;text-align:center}
.hemodal h3{margin:0 0 1.4cqw;font-size:clamp(16px,3cqw,30px);color:#ffe04a}
.hetb{display:flex;gap:1.6cqw;justify-content:center}
.hetb button{border:3px solid #fff4;border-radius:1.6cqw;color:#fff;padding:1.4cqw 2cqw;font:900 clamp(12px,2cqw,20px) Jua,sans-serif;min-width:20cqw;box-shadow:0 .6cqw 0 #0008}
.hetb button small{display:block;font:700 clamp(9px,1.4cqw,14px) Arial,sans-serif;opacity:.9;margin-top:.3em}
.hetb button:disabled{filter:grayscale(1) brightness(.5)}
.herank{display:grid;grid-template-columns:auto 1fr auto 1fr;gap:.8cqw 1.4cqw;text-align:left;align-items:center;font-size:clamp(11px,1.8cqw,18px)}
.herank .cs{display:flex;gap:.2cqw}.herank .cs img{width:2.8cqw}
.herank .me{color:#ffe04a}.herank em{font-style:normal;color:#9a8ac0;font-size:.8em}
.hex{margin-top:1.4cqw;background:#ff5a7a;border:0;color:#fff;font:900 clamp(12px,1.9cqw,19px) Jua,sans-serif;padding:.4em 2em;border-radius:1em}
.hefly{position:fixed;left:0;top:0;width:3cqw;z-index:90;pointer-events:none}
.hedeal{position:fixed;left:0;top:0;z-index:90;pointer-events:none}
.c-he{background:radial-gradient(circle at 50% 30%,#4ad09a,#0a6a4a 50%,#022a1a)}
.hehero{display:flex;justify-content:center;align-items:center}.hehero span{width:34%;display:block;filter:drop-shadow(0 4px 6px #0008)}.hehero span:first-child{transform:rotate(-12deg) translateX(14%)}.hehero span:nth-child(2){transform:rotate(10deg) translateX(-14%)}
`;document.head.appendChild(s)}

function build(){css();const L=window.LOVE||{};const her=L.her||'소현';const AV=K().AV;
 const el=document.createElement('div');el.id='he';el.innerHTML=`
 <svg class="hefelt" viewBox="0 0 1000 500" preserveAspectRatio="none"><defs><radialGradient id="heg" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#1aa070"/><stop offset=".6" stop-color="#0a6a48"/><stop offset="1" stop-color="#043a26"/></radialGradient><linearGradient id="herim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a4a20"/><stop offset=".5" stop-color="#3a1a08"/><stop offset="1" stop-color="#1a0a02"/></linearGradient></defs>
 <rect x="10" y="10" width="980" height="480" rx="240" fill="url(#herim)"/><rect x="18" y="18" width="964" height="464" rx="232" fill="none" stroke="#ffd76a" stroke-width="3" opacity=".7"/>
 <rect x="40" y="40" width="920" height="420" rx="210" fill="url(#heg)"/><rect x="70" y="70" width="860" height="360" rx="180" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="3"/>
 <text x="500" y="330" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="34" fill="#fff" opacity=".13" letter-spacing="6">TAEYUL HOLD'EM</text>
 <text x="500" y="362" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="#fff" opacity=".12" letter-spacing="4">NO LIMIT TEXAS HOLD'EM</text></svg>
 <div class="hetop"><button id="heback">‹ 나가기</button><div class="hebal"><i>G</i><b id="hebal">0</b></div><button id="hesnd">소리</button><button id="herk">족보표</button><span class="heblind" id="heblind"></span></div>
 <div id="hepot"><img alt="" src="${api().U(K().chipSVG(10000))}"><b id="hepv">POT 0</b></div>
 <div id="heboard">${'<div class="slot"></div>'.repeat(5)}</div>
 ${[0,1,2,3,4].map(i=>`<div class="hes ${i?'':'me'}" id="hes${i}" style="left:${SEAT[i][0]}%;top:${SEAT[i][1]}%"><div class="hehole"></div><div class="hebox"><img alt="" src="${api().U(i?AIP()[i-1].av:AV('#ffe4d0','#4a2a1a','#ff6ab0','girl'))}"><div><b>${i?AIP()[i-1].name:her}</b><span class="hestk">0</span></div></div><div class="heact"></div><div class="hesd"></div></div>
 <div class="hebet" id="heb${i}" style="left:${i?toward(i,.4)[0]:63}%;top:${i?toward(i,.4)[1]:64}%"></div>`).join('')}
 <div class="hedb" id="hedb">D</div>
 <div id="heinfo"><small>내 족보</small><b id="herank">-</b><span id="hedraw"></span><div class="heeq"><i id="heeqb"></i></div><em id="heeqt"><span>승률</span><span>-</span></em></div>
 <div id="hectl" class="off"><button class="f" id="hef">폴드</button><button class="c" id="hec">체크</button><button class="r" id="her">레이즈</button></div>
 <div class="herp" id="herp"><div class="pre"><button data-p="min">최소</button><button data-p=".5">½팟</button><button data-p=".75">¾팟</button><button data-p="1">팟</button><button data-p="all">올인</button></div>
  <div class="row"><input type="range" id="herng" min="0" max="100" step="1"><span class="v" id="herv">0</span><button class="ok" id="herok">레이즈!</button></div></div>
 <div id="hemsg"></div>
 <div class="hemodal" id="hemodal"><div class="in" id="hemin"></div></div>`;
 document.body.appendChild(el);ui=el;
 $('heback').onclick=tryClose;
 $('hesnd').onclick=()=>{const Au=api().AUDIO;Au.set&&Au.set('sfx',!Au.st.sfx);$('hesnd').textContent=Au.st.sfx?'소리':'무음'};
 $('herk').onclick=()=>rankModal();
 $('hef').onclick=()=>meAct({t:'fold'});
 $('hec').onclick=()=>{const p=P[0];const tc=cur-p.bet;meAct(tc>0?{t:'call'}:{t:'check'})};
 $('her').onclick=()=>{const rp=$('herp');if(rp.classList.contains('on')){rp.classList.remove('on');return}openRaise()};
 $('herng').oninput=()=>$('herv').textContent=short(rngVal());
 $('herp').querySelector('.pre').onclick=e=>{const b=e.target.closest('button');if(!b)return;const p=P[0],mx=p.stack+p.bet,mn=Math.min(mx,cur+minR);let v;
  if(b.dataset.p==='min')v=mn;else if(b.dataset.p==='all')v=mx;else v=Math.max(mn,Math.min(mx,cur+Math.round((pot+(cur-p.bet))*+b.dataset.p/T.sb)*T.sb));setRng(v)};
 $('herok').onclick=()=>{const v=rngVal();$('herp').classList.remove('on');meAct({t:'raise',to:v})};
}
let rMin=0,rMax=0;
function openRaise(){const p=P[0];rMax=p.stack+p.bet;rMin=Math.min(rMax,cur+minR);$('herp').classList.add('on');setRng(Math.min(rMax,cur+minR*(cur?1:2)||rMin))}
function setRng(v){$('herng').value=rMax===rMin?100:Math.round((v-rMin)/(rMax-rMin)*100);$('herv').textContent=v>=rMax?'올인 '+short(rMax):short(v)}
function rngVal(){const f=+$('herng').value/100;if(f>=1)return rMax;let v=rMin+(rMax-rMin)*f;v=Math.round(v/T.sb)*T.sb;return Math.max(rMin,Math.min(rMax,v))}

/* ---------- 그리기 ---------- */
const sEl=i=>$('hes'+i);
function cardDiv(c,down){const d=document.createElement('div');d.className='hec';d.dataset.c=c;d.innerHTML=`<img alt="" src="${api().U(down?K().BACK:cImg(c))}">`;return d}
function paint(p){const e=sEl(p.i);e.querySelector('.hestk').textContent=p.out?'자리 비움':p.allin&&inHand?'올인!':short(p.stack);
 e.classList.toggle('fold',!!p.folded);e.classList.toggle('out',!!p.out);
 const b=$('heb'+p.i);b.innerHTML=p.bet?`<img alt="" src="${api().U(K().chipSVG(chipFor(p.bet)))}">${short(p.bet)}`:''}
const chipFor=a=>{let v=100;for(const [x] of K().CHIPS)if(a>=x)v=x;return v};
function paintPot(){$('hepv').textContent='POT '+fmt(pot)}
function act(p,txt,cls){const a=sEl(p.i).querySelector('.heact');a.textContent=txt;a.className='heact on '+(cls||'');clearTimeout(a._t);a._t=setTimeout(()=>a.classList.remove('on'),1600)}
function msg(t,sub=''){const m=$('hemsg');m.innerHTML=t?`<b>${t}</b>${sub?`<small>${sub}</small>`:''}`:'';m.classList.toggle('on',!!t)}
function turn(i){P.forEach(p=>sEl(p.i).classList.toggle('turn',p.i===i))}
function rectOf(el){return el.getBoundingClientRect()}
async function flyCard(toEl,c,down,W){const from=rectOf($('hepot')),to=rectOf(toEl);const im=document.createElement('img');im.className='hedeal';im.src=api().U(K().BACK);im.style.width=to.width+'px';im.style.height=to.height+'px';document.body.appendChild(im);
 sfx('flip');await im.animate([{transform:`translate(${from.left+from.width/2-to.width/2}px,${from.top}px) rotate(-30deg) scale(.5)`},{transform:`translate(${to.left}px,${to.top}px) rotate(0) scale(1)`}],{duration:api().T(260,160),easing:'ease-out'}).finished.catch(()=>{});im.remove();await W(0)}
async function flipIn(d,c){const img=d.querySelector('img');await d.animate([{transform:'scaleX(1)'},{transform:'scaleX(0)'}],{duration:110}).finished.catch(()=>{});img.src=api().U(cImg(c));sfx('flip');await d.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:110}).finished.catch(()=>{})}
function chipFly(fromEl,toEl,n=5){const a=rectOf(fromEl),b=rectOf(toEl);for(let i=0;i<n;i++){const im=document.createElement('img');im.className='hefly';im.src=api().U(K().chipSVG(K().CHIPS[2+i%4][0]));document.body.appendChild(im);
 im.animate([{transform:`translate(${a.left+a.width/2}px,${a.top+a.height/2}px)`},{transform:`translate(${b.left+b.width/2}px,${b.top+b.height/2}px)`}],{duration:api().T(480,280),delay:i*55,easing:'ease-in-out'}).onfinish=()=>{im.remove();sfx('clink')}}}
function placeDB(){const [x,y]=toward(btn,.2);const d=$('hedb');d.style.left=(x+(btn===0?7:btn<3?3:-3))+'%';d.style.top=y+'%'}

/* ---------- 내 족보 표시 ---------- */
let eqTok=0;
function myInfo(){const p=P[0];document.querySelectorAll('#he .hec').forEach(e=>e.classList.remove('use','dim'));
 if(!p||!p.hole.length||p.folded){$('herank').textContent=p&&p.folded?'폴드':'-';$('herank').className='';$('hedraw').textContent='';$('heeqb').style.width='0';$('heeqt').lastChild.textContent='-';return}
 if(board.length<3){const [tn,tc]=tier(p.hole);$('herank').textContent=preName(p.hole);$('herank').className='';$('hedraw').innerHTML=`<span class="tier ${tc}">${tn}</span>`}
 else{const all=[...p.hole,...board];const e=ev7(all);$('herank').textContent=e.cat===9?'로열 플러시!!':hname(e);$('herank').className=e.cat>=5?'big':'';$('hedraw').textContent=draws(p.hole,board);
  const u=used(all,e);const lim=e.cat===0?1:e.cat===1?2:e.cat===2?4:e.cat===3?3:5;const set=new Set(u.slice(0,lim));
  document.querySelectorAll('#hes0 .hec,#heboard .hec').forEach(el=>{const c=+el.dataset.c;if(set.has(c))el.classList.add('use')})}
 const live=P.filter(q=>q.inh&&!q.folded).length-1;const tok=++eqTok;
 setTimeout(()=>{if(tok!==eqTok)return;const eq=equity(p.hole,board,live,500);$('heeqb').style.width=(eq*100).toFixed(0)+'%';$('heeqt').lastChild.textContent=(eq*100).toFixed(0)+'%'+(live>0?` (상대 ${live}명)`:'')},30)}

/* ---------- 족보표 ---------- */
function rankModal(){const X=t=>t.split(' ').map(x=>{const r=x.slice(0,-1),su='scdh'.indexOf(x.slice(-1));return su*13+({A:14,K:13,Q:12,J:11}[r]||+r)-2});
 const ex=['As Ks Qs Js 10s','9h 8h 7h 6h 5h','8s 8c 8d 8h Ks','Qs Qd Qh 7c 7s','Ad Jd 8d 5d 3d','10c 9d 8s 7h 6c','7s 7h 7d Kc 2s','Js Jh 4c 4d As','10h 10c Ks 6d 3c','Ac Qd 9s 6h 4c'].map(X);
 const me=P[0]&&P[0].hole.length&&board.length>=3?ev7([...P[0].hole,...board]).cat:-1;
 const desc=['같은 무늬 10·J·Q·K·A','같은 무늬 연속 5장','같은 숫자 4장','트리플 + 원페어','같은 무늬 5장','연속된 숫자 5장','같은 숫자 3장','페어 2개','같은 숫자 2장','아무것도 없을 때 높은 카드'];
 $('hemin').innerHTML=`<h3>홀덤 족보 (높은 순)</h3><div class="herank">${NAMES.slice().reverse().map((n,i)=>{const cat=9-i;return `<span class="cs">${ex[i].map(c=>`<img alt="" src="${api().U(cImg(c))}">`).join('')}</span><span class="${cat===me?'me':''}">${n}${cat===me?' ← 지금 내 패':''}<br><em>${desc[i]}</em></span>`}).join('')}</div><button class="hex" id="hex">닫기</button>`;
 $('hemodal').classList.add('on');$('hex').onclick=()=>$('hemodal').classList.remove('on')}

/* ---------- 바이인 ---------- */
function buyModal(re){return new Promise(res=>{const b=bal();
 $('hemin').innerHTML=`<h3>${re?'칩이 다 떨어졌어요! 다시 바이인':'테이블 선택'}</h3><div class="hetb">${TABLES.map((t,i)=>`<button data-i="${i}" style="background:linear-gradient(${t.col},#1a0a30)" ${b<t.bb*20?'disabled':''}>${t.name}<small>블라인드 ${short(t.sb)}/${short(t.bb)}</small><small>바이인 ${short(Math.min(t.buy,b))}</small></button>`).join('')}</div><button class="hex" id="hex">나가기</button>`;
 $('hemodal').classList.add('on');$('hemin').querySelector('.hetb').onclick=e=>{const x=e.target.closest('button');if(!x||x.disabled)return;$('hemodal').classList.remove('on');res(TABLES[+x.dataset.i])};
 $('hex').onclick=()=>{$('hemodal').classList.remove('on');res(null)}})}

/* ================= 게임 진행 ================= */
const live=()=>P.filter(p=>p.inh&&!p.folded);
const nextIdx=(i,f)=>{for(let k=1;k<=5;k++){const j=(i+k)%5;if(f(P[j]))return j}return i};
function put(p,a){a=Math.min(a,p.stack);p.stack-=a;p.bet+=a;p.total+=a;pot+=a;if(!p.stack)p.allin=true;paint(p);paintPot()}

async function decideAI(p,W){await W(api().T(450+Math.random()*550,220));
 const tc=cur-p.bet,lv=live().length,nOpp=lv-1;const eq=equity(p.hole,board,nOpp,board.length?220:160);const rel=eq*lv+(Math.random()-.5)*.25;
 const po=tc/(pot+tc);const r=Math.random();const raiseTo=f=>{let v=cur+Math.max(minR,Math.round((pot+tc)*f/T.sb)*T.sb);if(!board.length)v=Math.max(v,cur+(cur<=T.bb?T.bb*2:minR));return Math.min(v,p.stack+p.bet)};
 if(tc===0){if(rel>1.55-p.aggr*.3&&r<.6+p.aggr*.3)return {t:'raise',to:raiseTo(.45+Math.random()*.5)};if(rel<.9&&r<p.bluff*.22)return {t:'raise',to:raiseTo(.5)};return {t:'check'}}
 if(eq>.8&&lv<=3&&r<.5)return {t:'raise',to:p.stack+p.bet};
 if(rel>1.9&&r<.35+p.aggr*.45)return {t:'raise',to:raiseTo(.7+Math.random()*.4)};
 const imp=!board.length&&tc<=T.bb*3?.55:board.length<5?.85:1;const need=po*imp-(1-p.tight)*.06;
 if(tc>=p.stack*.6&&rel<1.3&&eq<.5)return r<.04?{t:'call'}:{t:'fold'};
 if(eq>=need)return {t:'call'};
 if(r<p.bluff*.05)return {t:'raise',to:raiseTo(.8)};
 return {t:'fold'}}

function meAct(a){if(!meWait)return;const f=meWait;meWait=null;$('hectl').classList.add('off');$('herp').classList.remove('on');f(a)}
function decideMe(){const p=P[0],tc=cur-p.bet;const c=$('hec');
 c.innerHTML=tc>0?(tc>=p.stack?`올인 콜<small>${short(p.stack)}</small>`:`콜<small>${short(tc)}</small>`):'체크';
 const canR=p.stack>tc&&live().filter(q=>!q.allin).length>1;$('her').disabled=!canR;$('her').innerHTML=cur?'레이즈':'베팅';$('herok').textContent=cur?'레이즈!':'베팅!';
 $('hef').textContent=tc>0?'폴드':'폴드';$('hectl').classList.remove('off');sfx('ding');
 return new Promise(r=>meWait=r)}

function apply(p,a){const tc=cur-p.bet;const ch=p.ai&&p.ai.chat;
 if(a.t==='fold'){p.folded=true;act(p,'폴드','f');if(p.i){const hh=sEl(p.i).querySelector('.hehole');hh.animate([{opacity:1},{opacity:0,transform:'translateY(-2cqw)'}],{duration:300}).onfinish=()=>hh.innerHTML=''}sfx('fail');if(ch&&Math.random()<.3)say(p,pick(ch.fold))}
 else if(a.t==='check'){act(p,'체크');sfx('tick')}
 else if(a.t==='call'){put(p,tc);act(p,p.allin?'올인!':'콜','c');sfx('clink');if(p.allin)allinFx(p)}
 else{let to=Math.min(a.to,p.stack+p.bet);if(to<=cur){put(p,tc);act(p,p.allin?'올인!':'콜','c')}else{const rs=to-cur;if(rs>=minR)minR=rs;const was=cur;cur=to;put(p,to-p.bet);P.forEach(q=>{if(q!==p)q.acted=false});
   if(p.allin){act(p,'올인!','a');allinFx(p)}else{act(p,was?`레이즈 ${short(to)}`:`베팅 ${short(to)}`,'r');if(ch&&Math.random()<.35)say(p,pick(ch.raise))}sfx('clink');setTimeout(()=>sfx('clink'),120)}}
 p.acted=true;paint(p);if(p.i===0)myInfo()}
const pick=a=>a[Math.floor(Math.random()*a.length)];
function say(p,t){act(p,t,'')}
function allinFx(p){try{api().sfx('drum')}catch(e){}if(p.i===0)api().speak('올인!');else if(p.ai)say(p,pick(p.ai.chat.allin))}

async function betRound(first,W){let i=first,g=0;
 while(g++<300){const lv=live();if(lv.length<=1)return;const able=lv.filter(p=>!p.allin);if(!able.length)return;
  if(able.every(p=>p.acted&&p.bet===cur))return;if(able.length===1&&able[0].bet>=cur&&lv.length>1&&(able[0].acted||lv.every(q=>q.allin||q===able[0])))return;
  const p=P[i];if(p.inh&&!p.folded&&!p.allin&&!(p.acted&&p.bet===cur)){turn(p.i);const a=p.i===0?await decideMe():await decideAI(p,W);await W(0);apply(p,a);turn(-1);await W(api().T(280,120))}
  i=(i+1)%5}}

async function collect(W){const any=P.some(p=>p.bet);if(any){P.forEach(p=>{if(p.bet)chipFly($('heb'+p.i),$('hepot'),2)});await W(api().T(450,250))}P.forEach(p=>{p.bet=0;p.acted=false;paint(p)});cur=0;minR=T.bb}

async function dealBoard(n,W){const slots=$('heboard').children;for(let k=0;k<n;k++){const c=deck.pop();board.push(c);const sl=slots[board.length-1];await flyCard(sl,c,true,W);const d=cardDiv(c,true);sl.appendChild(d);await flipIn(d,c);await W(api().T(90,40))}myInfo()}

let deck=[];
async function hand(){const g=gen;const W=async ms=>{if(ms)await sleep(ms);if(g!==gen)throw ABORT};
 inHand=true;handNo++;board=[];pot=0;cur=0;minR=T.bb;
 deck=[];for(let c=0;c<52;c++)deck.push(c);for(let i=51;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}
 [...$('heboard').children].forEach(s=>s.innerHTML='');P.forEach(p=>{p.hole=[];p.folded=false;p.allin=false;p.bet=0;p.total=0;p.acted=false;p.inh=p.stack>0&&!p.out;const e=sEl(p.i);e.classList.remove('win','fold','turn');e.querySelector('.hehole').innerHTML='';e.querySelector('.hesd').className='hesd';paint(p)});
 paintPot();msg('');
 btn=nextIdx(btn,p=>p.inh);placeDB();
 const sb=nextIdx(btn,p=>p.inh),bb=nextIdx(sb,p=>p.inh);
 put(P[sb],T.sb);act(P[sb],'SB '+short(T.sb));put(P[bb],T.bb);act(P[bb],'BB '+short(T.bb));cur=T.bb;sfx('clink');saveStk();
 await W(api().T(400,200));
 for(let r=0;r<2;r++)for(let k=1;k<=5;k++){const p=P[(btn+k)%5];if(!p.inh)continue;const c=deck.pop();p.hole.push(c);const h=sEl(p.i).querySelector('.hehole');const d=cardDiv(c,true);d.style.visibility='hidden';h.appendChild(d);await flyCard(d,c,true,W);d.style.visibility='';if(p.i===0)flipIn(d,c)}
 await W(250);myInfo();
 const st=[[0,'프리플랍'],[3,'플랍'],[1,'턴'],[1,'리버']];
 for(let s=0;s<4;s++){stage=st[s][1];
  if(s){await collect(W);if(live().length<=1)break;await dealBoard(st[s][0],W);await W(api().T(250,100))}
  if(live().filter(p=>!p.allin).length>=2||(s===0)){const first=s===0?nextIdx(bb,p=>p.inh):nextIdx(btn,p=>p.inh&&!p.folded);await betRound(first,W)}
  if(live().length<=1)break}
 await collect(W);
 const lv=live();
 if(lv.length===1){const w=lv[0];await award([{amt:pot,el:[w]}],W,false)}
 else{if(board.length<5){for(const p of lv)if(p.i)await reveal(p);await W(400);await dealBoard(5-board.length,W);await W(400)}
  for(const p of lv)if(p.i)await reveal(p);
  lv.forEach(p=>{const e=ev7([...p.hole,...board]);p.ev=e;const sd=sEl(p.i).querySelector('.hesd');sd.textContent=e.cat===9?'로열 플러시':hname(e);sd.classList.add('on')});
  await W(api().T(700,300));
  await award(pots(),W,true)}
 inHand=false;P.forEach(paint);saveStk();
 P.forEach(p=>{if(p.i&&p.stack<=0){p.stack=Math.round(T.buy*(.6+Math.random()*.9)/T.bb)*T.bb;setTimeout(()=>{act(p,'리바이!','c');paint(p)},1200)}});
 await W(api().T(2600,1400))}

function pots(){const ins=P.filter(p=>p.inh&&p.total>0);const lv=[...new Set(ins.map(p=>p.total))].sort((a,b)=>a-b);let prev=0;const out=[];
 for(const L of lv){let amt=0;for(const p of ins)amt+=Math.min(p.total,L)-Math.min(p.total,prev);const el=live().filter(p=>p.total>=L);if(!el.length&&out.length)out[out.length-1].amt+=amt;else out.push({amt,el:el.length?el:live()});prev=L}
 return out}
async function reveal(p){const h=sEl(p.i).querySelector('.hehole');const ds=h.querySelectorAll('.hec');for(let k=0;k<ds.length;k++){if(ds[k].dataset.up)continue;ds[k].dataset.up=1;await flipIn(ds[k],p.hole[k])}}

async function award(list,W,sd){let meWon=0,best=null;
 for(let k=0;k<list.length;k++){const pt=list[k];if(!pt.amt)continue;let ws=pt.el;
  if(k&&ws.length===1&&P.filter(p=>p.inh&&p.total>=0).filter(p=>p.total>=ws[0].total).length===1){ws[0].stack+=pt.amt;pot-=pt.amt;paintPot();paint(ws[0]);act(ws[0],'베팅 반환 '+short(pt.amt),'c');continue}
  if(sd&&ws.length>1){const top=Math.max(...ws.map(p=>p.ev.sc));ws=ws.filter(p=>p.ev.sc===top)}
  const share=Math.floor(pt.amt/ws.length/1)||0;let rem=pt.amt-share*ws.length;
  ws.forEach(w=>{w.stack+=share+(rem>0?rem:0);rem=0;sEl(w.i).classList.add('win');chipFly($('hepot'),sEl(w.i).querySelector('.hebox'),6);if(w.i===0)meWon+=share;best=w});
  if(sd&&ws[0].ev){const all=[...ws[0].hole,...board];const u=new Set(used(all,ws[0].ev));document.querySelectorAll('#heboard .hec').forEach(el=>{el.classList.toggle('use',u.has(+el.dataset.c));el.classList.toggle('dim',!u.has(+el.dataset.c))});
   ws.forEach(w=>sEl(w.i).querySelectorAll('.hehole .hec').forEach(el=>el.classList.toggle('use',new Set(used([...w.hole,...board],w.ev)).has(+el.dataset.c))))}
  const nm=ws.map(w=>sEl(w.i).querySelector('b').textContent).join(', ');const hn=sd&&ws[0].ev?(ws[0].ev.cat===9?'로열 플러시':hname(ws[0].ev)):'';
  msg(`${nm} 승리!`,(list.length>1?(k?'사이드 팟 ':'메인 팟 '):'')+'+'+fmt(pt.amt)+(hn?' · '+hn:''));pot-=pt.amt;paintPot();
  sfx(ws.some(w=>!w.i)?'chaching':'coin');ws.forEach(paint);await W(api().T(1700,900))}
 pot=0;paintPot();
 if(meWon){const e=P[0].ev;const L=window.LOVE||{};const her=L.her||'소현';
  if(e&&e.cat>=6){api().announce(e.cat===9?'ROYAL FLUSH':e.cat===8?'STRAIGHT FLUSH':e.cat===7?'FOUR OF A KIND':'FULL HOUSE',`+${fmt(meWon)}`,'gold');api().speak(e.cat===9?'로열 플러시!':e.cat===8?'스트레이트 플러시!':e.cat===7?'포카드!':'풀하우스!');try{api().heartRain&&api().heartRain()}catch(x){}}
  else if(meWon>=T.bb*30)api().speak(her+' 승리!');sfx('jjr')}
 else if(best&&best.ai&&Math.random()<.5)say(best,pick(best.ai.chat.win));
 if(!meWon&&P[0].inh&&!P[0].folded)try{api().sfx('lose')}catch(e){}}

async function loop(){const g=gen;try{while(g===gen){
  if(P[0].stack<=0){const t=await buyModal(true);if(g!==gen)return;if(!t){close();return}await seat(t)}
  if(P[0].stack<T.bb)P[0].stack=0;
  await hand()}}catch(e){if(e!==ABORT)console.error(e)}}

async function seat(t,restore=0){T=t;if(restore)P[0].stack=restore;else{const amt=Math.min(t.buy,bal());setBal(bal()-amt);P[0].stack=amt}$('heblind').textContent=`${t.name} · 블라인드 ${short(t.sb)}/${short(t.bb)}`;
 const ai=AIP();for(let i=1;i<5;i++){const p=P[i];p.stack=Math.round(t.buy*(.7+Math.random()*1.3)/t.bb)*t.bb;p.ai=ai[i-1];Object.assign(p,{tight:ai[i-1].tight,aggr:ai[i-1].aggr,bluff:ai[i-1].bluff})}
 P.forEach(paint);saveStk()}

function tryClose(){const p=P[0];if(inHand&&p.inh&&!p.folded){
  if(meWait){if(!tryClose.ok){tryClose.ok=1;api().toast('한 번 더 누르면 폴드하고 나가요');setTimeout(()=>tryClose.ok=0,2000);return}tryClose.ok=0;meAct({t:'fold'})}
  else{api().toast('내 차례에 나갈 수 있어요 (폴드 후 퇴장)');return}}
 close()}

async function open(){A=window.TL_API;if(!A)return;if(!ui)build();ui.classList.add('on');document.body.classList.add('heon');try{A.AUDIO.play('bj')}catch(e){}
 try{window.TLApp&&TLApp.orient('landscape')}catch(e){}
 $('hebal').textContent=fmt(bal());$('hesnd').textContent=A.AUDIO.st.sfx?'소리':'무음';gen++;
 if(!P.length)P=[0,1,2,3,4].map(i=>({i,stack:0,hole:[],ai:null,tight:.5,aggr:.5,bluff:.2}));
 const S=A.S;if(S.heStack>0)await seat(TABLES.find(t=>t.id===S.heTable)||TABLES[1],S.heStack);
 else{P[0].stack=0;P.forEach(paint);const t=await buyModal(false);if(!t){close();return}await seat(t)}
 msg('텍사스 홀덤','내 패와 족보가 왼쪽 아래에 실시간으로 떠요!');setTimeout(()=>msg(''),2200);
 [...$('heboard').children].forEach(s=>s.innerHTML='');myInfo();
 loop()}
function close(){if(!ui)return;gen++;if(meWait){const f=meWait;meWait=null;f({t:'fold'})}inHand=false;
 if(P[0]&&P[0].stack>0){setBal(bal()+P[0].stack);P[0].stack=0}api().S.heStack=0;api().save();
 $('hectl').classList.add('off');$('herp').classList.remove('on');$('hemodal').classList.remove('on');ui.classList.remove('on');document.body.classList.remove('heon');
 try{A.AUDIO.play('lobby')}catch(e){}A.renderBal&&A.renderBal()}

css();
window.HE={open,close,ev7,hname,equity,get card(){const k=K();return `<button class="gcard c-he" data-ext="he"><span class="rays"></span><span class="bdg">NEW</span><span class="hero hehero"><span>${k.cardSVG('A','s')}</span><span>${k.cardSVG('A','h')}</span></span><b class="en" style="font-family:Bungee,sans-serif">HOLD'EM</b><span class="kn">텍사스 홀덤</span><small>AI 4명 · 실시간 족보·승률 표시</small></button>`}};
})();
