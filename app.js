{
const $=id=>document.getElementById(id);
const $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const fmt=n=>Math.round(n).toLocaleString('en-US');
const short=GAMES.short,coinSVG=GAMES.coinSVG,sfx=AUDIO.sfx;
const BETS=[100,200,500,1000,2000,5000,10000,20000,50000,100000];
const HER=(window.LOVE&&LOVE.her)||'소현';
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const UC=new Map();
function U(svg){let u=UC.get(svg);if(!u){const s=svg.replace(/^<svg /,'<svg xmlns="http://www.w3.org/2000/svg" ').replace(/^(<svg[^>]*>)/,`$1<defs>${GAMES.DEFS}${typeof ICDEFS!=='undefined'?ICDEFS:''}</defs>`);u=URL.createObjectURL(new Blob([s],{type:'image/svg+xml'}));UC.set(svg,u)}return u}
const IMG=svg=>`<img src="${U(svg)}" alt="" draggable="false" decoding="async">`;
/* 이모지 → 일러스트 자동 교체 */
const EKEYS=typeof ICONS!=='undefined'?Object.keys(ICONS).sort((x,y)=>y.length-x.length):[];
const ERE=EKEYS.length?new RegExp(EKEYS.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'gu'):null;
const IURL=k=>U(`<svg viewBox="0 0 100 100">${ICONS[k]}</svg>`);
function eify(root){if(!ERE||!root)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const list=[];
 while(w.nextNode()){const t=w.currentNode;ERE.lastIndex=0;if(ERE.test(t.nodeValue)){const p=t.parentNode;if(p&&!(p.closest&&p.closest('svg,script,style,textarea,option,button.ib')))list.push(t)}}
 for(const t of list){const s=t.nodeValue,f=document.createDocumentFragment();let last=0;ERE.lastIndex=0;let m;
  while((m=ERE.exec(s))){f.append(s.slice(last,m.index));const im=document.createElement('img');im.className='ei';im.alt='';im.src=IURL(m[0]);f.append(im);last=m.index+m[0].length}
  f.append(s.slice(last));t.replaceWith(f)}}
new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes){if(n.nodeType===1){if(n.tagName==='IMG'||n.tagName==='CANVAS'||!n.textContent)continue;eify(n)}else if(n.nodeType===3&&n.parentNode)eify(n.parentNode)}}).observe(document.documentElement,{childList:true,subtree:true});
setTimeout(()=>eify(document.body),0);

/* ---------- state ---------- */
const fresh=()=>({unit:2,bal:300000,bi:3,lvl:1,xp:0,pools:{},chargeAt:0,bgm:true,sfx:true,turbo:false});
let S=fresh();
try{const s=JSON.parse(localStorage.getItem('lucky-palace'));if(s&&typeof s.bal==='number')S=Object.assign(fresh(),s)}catch(e){}
if(S.unit!==2){const pin=S.pin,lvl=S.lvl,bgm=S.bgm,sfxo=S.sfx;S=fresh();Object.assign(S,{pin,lvl:lvl||1,bgm:bgm!==false,sfx:sfxo!==false})}
if(!S.pools)S.pools={};
const save=()=>{try{localStorage.setItem('lucky-palace',JSON.stringify(S))}catch(e){}};
AUDIO.set('bgm',S.bgm);AUDIO.set('sfx',S.sfx);
const bet=()=>BETS[S.bi];
let G=null,fs=null,busy=false,auto=false,reelsMoving=false,cur=null;
const JPSEED={MINI:10,MINOR:30,MAJOR:100,GRAND:1000};
const pool=(id=G&&G.id)=>S.pools[id]||(S.pools[id]={GRAND:0,MAJOR:0,MINOR:0,MINI:0});
const jpVal=(t,b)=>JPSEED[t]*b+pool()[t];
const T=(a,b)=>S.turbo?b:a;
const buzz=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};

/* ---------- common UI ---------- */
let shownBal=S.bal,balAnim=0;
function renderBal(anim){
 cancelAnimationFrame(balAnim);
 const put=v=>$$('.balv').forEach(e=>e.textContent=fmt(v));
 if(!anim){shownBal=S.bal;put(S.bal);return}
 const from=shownBal,to=S.bal,t0=performance.now();
 const step=t=>{const k=Math.min(1,(t-t0)/700);shownBal=from+(to-from)*(1-(1-k)**3);put(shownBal);if(k<1)balAnim=requestAnimationFrame(step)};balAnim=requestAnimationFrame(step);
}
const need=()=>Math.round(2e4*S.lvl**1.35);
function renderLvl(){$$('.lvT').forEach(e=>e.textContent='LV '+S.lvl);$$('.xpI').forEach(e=>e.style.width=Math.min(100,S.xp/need()*100)+'%')}
function renderJP(){if(G&&G.onBet&&typeof API!=='undefined')G.onBet(API);const b=fs?fs.bet:bet();if(G&&G.jp)$$('.plq').forEach(p=>p.querySelector('.num').textContent=fmt(jpVal(p.dataset.t,b)));const mx=Math.max(0,...GAMES.list.filter(g=>g.jp).map(g=>pool(g.id).GRAND));$('tick').textContent=fmt(JPSEED.GRAND*1e4+mx);$$('.cjpv').forEach(e=>e.textContent=fmt(JPSEED.GRAND*1e4+pool(e.dataset.g).GRAND))}
function renderBtns(){$('auto').classList.toggle('on',auto);$('turbo').classList.toggle('on',S.turbo);$$('.bgmB').forEach(e=>e.classList.toggle('off',!S.bgm));$$('.sfxB').forEach(e=>{e.classList.toggle('off',!S.sfx);e.textContent=S.sfx?'🔊':'🔇'});$('spin').classList.toggle('auto',auto)}
function setWin(v,l='WIN'){$('win').textContent=fmt(v);$('winlbl').textContent=l}
function countWin(from,to,d){return new Promise(res=>{const t0=performance.now();let lc=0;const st=t=>{const k=Math.min(1,(t-t0)/d);if(t-lc>70){lc=t;sfx.clink(1,0,.03)}$('win').textContent=fmt(from+(to-from)*k);if(k<1)requestAnimationFrame(st);else res()};requestAnimationFrame(st)})}
const CHARGE_MS=180000,CHARGE_AMT=50000;
function renderCharge(){const left=S.chargeAt-Date.now(),ready=left<=0||S.bal<BETS[0];$('charge').disabled=!ready;$('chargeT').textContent=ready?'+'+short(CHARGE_AMT):`${Math.floor(left/60000)}:${String(Math.floor(left/1000)%60).padStart(2,'0')}`}
setInterval(()=>{renderCharge();if(!busy){GAMES.list.filter(g=>g.jp).forEach(g=>{const p=pool(g.id);for(const t in p)p[t]+=1e3*({GRAND:.06,MAJOR:.03,MINOR:.01,MINI:.005})[t]});renderJP()}},1000);

const pop=$('pop');
function popup(html,{autoMs=0,cls='',onShow=null}={}){
 return new Promise(res=>{
  pop.innerHTML=`<div class="card ${cls}">${html}</div>`;pop.classList.add('on');if(onShow)try{onShow()}catch(e){}
  let done=false;const close=()=>{if(done)return;done=true;pop.classList.remove('on');pop.onclick=null;res()};
  pop.onclick=e=>{if(!e.target.closest('.card')||e.target.closest('.go'))close()};
  if(autoMs)setTimeout(close,autoMs);
 });
}
function toast(t,ms=1400){const el=$('toast');el.textContent=t;el.classList.remove('on');el.offsetHeight;el.classList.add('on');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),ms)}
const TIERS=[[10,'BIG WIN'],[25,'MEGA WIN'],[50,'SUPER WIN'],[100,'EPIC WIN'],[300,'LEGENDARY']];
const T1=(t,c='')=>`<span class="t3 pop ${c}"><span class="ex">${t}</span><span class="fr">${t}</span></span>`;
const T3=t=>{const w=t.split(' ');return w.map(x=>`<span class="t3 pop"><span class="ex">${x}</span><span class="fr">${x}</span></span>`).join('')};
const TCLS={'BIG WIN':'tier-big','MEGA WIN':'tier-mega','SUPER WIN':'tier-super','EPIC WIN':'tier-epic','LEGENDARY':'tier-legend'};
function boom(n=1){if(RM)return;const cx0=innerWidth/2,cy0=innerHeight*.42;
 for(let k=0;k<n;k++){const rg=document.createElement('div');rg.className='ring';rg.style.left=cx0+'px';rg.style.top=cy0+'px';document.body.appendChild(rg);rg.animate([{transform:'scale(.2)',opacity:1},{transform:'scale(22)',opacity:0}],{duration:900,delay:k*150,easing:'ease-out'}).onfinish=()=>rg.remove()}
 for(let i=0;i<22;i++){const s=document.createElement('div');s.className='star';document.body.appendChild(s);const ang=Math.random()*6.28,R=120+Math.random()*Math.max(innerWidth,innerHeight)*.5;
  s.animate([{transform:`translate(${cx0}px,${cy0}px) scale(.2) rotate(0)`,opacity:1},{transform:`translate(${cx0+Math.cos(ang)*R}px,${cy0+Math.sin(ang)*R}px) scale(${1+Math.random()*1.5}) rotate(${Math.random()*360}deg)`,opacity:0}],{duration:800+Math.random()*600,easing:'cubic-bezier(.1,.7,.3,1)'}).onfinish=()=>s.remove()}
 burst(90)}
/* ---------- 아나운서 (음성 + 큰 글자) ---------- */
/* 음성: 캐릭터별 목소리(성별·톤·속도) — 앱(v4.1 APK)에서는 고품질 한국어 음성 자동 선택 */
const VOX={ann:{g:'f',v:0,p:1.04,r:1.27},dealer:{g:'m',v:0,p:.97,r:1.27},her:{g:'f',v:1,p:1.12,r:1.3},ai0:{g:'m',v:1,p:.92,r:1.32},ai1:{g:'f',v:2,p:1.22,r:1.3},ai2:{g:'m',v:2,p:.8,r:1.2},ai3:{g:'f',v:2,p:1.08,r:1.25}};
let WV=null;function webVoices(){if(WV&&WV.length)return WV;try{WV=speechSynthesis.getVoices().filter(v=>/^ko/i.test(v.lang))}catch(e){WV=[]}return WV}
try{speechSynthesis.onvoiceschanged=()=>{WV=null}}catch(e){}
function cleanTTS(t){return String(t).replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu,' ').replace(/~+(?=\s*\S)/g,', ').replace(/~+/g,'').replace(/[.…]{2,}/g,', ').replace(/[♪♥❤★☆♡·•]/g,' ').replace(/[ㅋㅎ]{2,}/g,'').replace(/!{2,}/g,'!').replace(/,\s*([!?.])/g,'$1').replace(/\s+/g,' ').replace(/,$/,'').trim().replace(/[,\s]+$/,'')}
let lastSay=null;
function speak(t,who='ann'){try{if(!AUDIO.st.sfx||!t)return;lastSay={t,w:who,at:Date.now()};t=cleanTTS(t);if(!t)return;const o=VOX[who]||VOX.ann;
 if(window.TLApp){if(TLApp.say){TLApp.say(t,o.g,o.v,o.p,o.r);return}if(TLApp.speak){TLApp.speak(t);return}}
 if(!window.speechSynthesis)return;const u=new SpeechSynthesisUtterance(t);u.lang='ko-KR';
 const vs=webVoices();if(vs.length){const male=v=>/male|남|injoon|jun|minho|hyunsu|bong/i.test(v.name)&&!/female|여/i.test(v.name);const pool=vs.filter(v=>o.g==='m'?male(v):!male(v));const list=(pool.length?pool:vs).slice().sort((x,y)=>(/natural|online|neural|google/i.test(y.name)?1:0)-(/natural|online|neural|google/i.test(x.name)?1:0));u.voice=list[o.v%list.length]||list[0];
  if(o.g==='m'&&!pool.length)u.pitch=Math.max(.5,o.p-.25)}
 u.rate=o.r;if(!u.pitch||u.pitch===1)u.pitch=o.p;u.volume=1;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function announce(t,sub='',cls=''){const e=document.createElement('div');e.className='ann '+cls;e.innerHTML=`<span class="t3 pop"><span class="ex">${t}</span><span class="fr">${t}</span></span>${sub?`<small>${sub}</small>`:''}`;document.body.appendChild(e);setTimeout(()=>e.remove(),cls.includes('small')?1300:2000)}
function bigWin(amount,b){
 return new Promise(res=>{
  const tiers=TIERS.filter(t=>amount/b>=t[0]);speak({0:'와~ 빅윈이에요!',1:'대박, 메가윈!',2:'우와~ 슈퍼 메가윈이에요!',3:'세상에, 에픽윈이에요!'}[tiers.length-1]||'와~ 빅윈이에요!');if(tiers.length>=2)praise(1800);
  const d=(1600+tiers.length*1500)*(S.turbo?.6:1);
  pop.innerHTML=`<div class="card bw ${TCLS[tiers[0][1]]}" id="bwC"><div id="bwT">${T3(tiers[0][1])}</div><div class="bwn"><span class="t3" id="bwNt"><span class="ex" id="bwN1">0</span><span class="fr" id="bwN">0</span></span></div><p style="font-size:18px;color:#ffd0ea;margin-top:10px">${['소현이 대박! 💕','역시 소현이 💖','소현 부자 됐다 🥰','오늘의 승자 소현 👑'][Math.floor(Math.random()*4)].replace(/소현/g,HER)}</p><p>화면을 누르면 건너뛰기</p></div>`;pop.classList.add('on');
  setTimeout(()=>$$('#bwT .t3').forEach(e=>e.classList.add('wob')),560);
  shower(true);sfx.fan();sfx.pile();flash();shake();boom(2);buzz([60,40,60,40,200]);AUDIO.duck(true);const ci=setInterval(()=>sfx.clink(2,.08,.03),85);
  let skip=false,ti=0,t0=performance.now(),last=0,fin=false,closed=false;
  const close=()=>{if(closed)return;closed=true;clearInterval(ci);pop.classList.remove('on');pop.onclick=null;shower(false);AUDIO.duck(false);sfx.chaching();flyCoins(40,[innerWidth/2,innerHeight*.45]);res()};
  pop.onclick=()=>{if(fin)close();else skip=true};
  const step=t=>{
   const k=skip?1:Math.min(1,(t-t0)/d);const v=k<1?amount*k*k*(3-2*k):amount;
   const tx=fmt(v);$('bwN').textContent=tx;$('bwN1').textContent=tx;
   while(ti+1<tiers.length&&v>=tiers[ti+1][0]*b){ti++;const nm=tiers[ti][1];$('bwC').className=`card bw ${TCLS[nm]}`;$('bwT').innerHTML=T3(nm);setTimeout(()=>$$('#bwT .t3').forEach(e=>e.classList.add('wob')),560);sfx.fan();sfx.pile();flash();shake();boom(1);buzz(120)}
   if(t-last>70){last=t;sfx.tick(k)}
   if(k<1)requestAnimationFrame(step);else{fin=true;boom(1);setTimeout(close,S.turbo?1200:2200)}
  };requestAnimationFrame(step);
 });
}
/* coin fx */
const cv=$('fx'),cx=cv.getContext('2d');let parts=[],raf=0,showerOn=false;
const fit=()=>{const r=devicePixelRatio||1;cv.width=innerWidth*r;cv.height=innerHeight*r;cx.setTransform(r,0,0,r,0,0)};fit();addEventListener('resize',fit);
const CSPR=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');const rg=g.createRadialGradient(24,20,2,32,32,32);rg.addColorStop(0,'#fffbe0');rg.addColorStop(.4,'#ffd34d');rg.addColorStop(.85,'#b8700a');rg.addColorStop(1,'#6e3f03');g.fillStyle=rg;g.beginPath();g.arc(32,32,31,0,7);g.fill();g.strokeStyle='#fff3b0';g.lineWidth=3;g.beginPath();g.arc(32,32,22,0,7);g.stroke();g.font='900 30px Arial';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#a0560a';g.fillText('$',33,34);g.fillStyle='#fff3b0';g.fillText('$',32,32);return c})();
function addCoin(x,y,vx,vy){parts.push({x,y,vx,vy,s:7+Math.random()*9,a:Math.random()*6,va:.1+Math.random()*.25,life:0})}
function burst(n){if(RM)return;for(let i=0;i<n;i++)addCoin(innerWidth/2,innerHeight*.45,(Math.random()-.5)*18,-Math.random()*16-4);loop()}
function shower(on){showerOn=on&&!RM;loop()}
function flash(){if(!RM)$('flash').animate([{opacity:0},{opacity:.85,offset:.12},{opacity:0}],{duration:650})}
function shake(){if(RM)return;const g=document.querySelector('.screen.on');g.classList.remove('shake');void g.offsetWidth;g.classList.add('shake')}
function winPoint(){const hits=box.querySelectorAll('.hit');if(hits.length){let x=0,y=0;hits.forEach(h=>{const r=h.getBoundingClientRect();x+=r.left+r.width/2;y+=r.top+r.height/2});return [x/hits.length,y/hits.length]}const r=box.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]}
function floatText(t,[x,y]){const d=document.createElement('div');d.className='flt';d.textContent=t;d.style.left=x+'px';d.style.top=y+'px';document.body.appendChild(d);const a=d.animate([{opacity:0,transform:'translate(-50%,-30%) scale(.5)'},{opacity:1,transform:'translate(-50%,-80%) scale(1.15)',offset:.25},{opacity:1,transform:'translate(-50%,-140%) scale(1)',offset:.75},{opacity:0,transform:'translate(-50%,-200%) scale(.9)'}],{duration:1500,easing:'ease-out'});a.onfinish=()=>d.remove()}
const COINM='<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="url(#cG)" stroke="#6e3f03" stroke-width="5"/><circle cx="50" cy="50" r="30" fill="none" stroke="#fff3b0" stroke-width="4" opacity=".7"/><path d="M24 36a30 30 0 0 1 26-18" stroke="#fff" stroke-width="7" fill="none" opacity=".6" stroke-linecap="round"/></svg>';
function flyCoins(n,[x,y]){
 const pill=document.querySelector('.screen.on .pill');if(!pill||RM){sfx.clink(n,.5);return}
 const r=pill.getBoundingClientRect(),tx=r.left+22,ty=r.top+r.height/2;
 for(let i=0;i<n;i++){const d=document.createElement('div');d.className='fc';d.innerHTML=IMG(COINM);const sx=x+(Math.random()-.5)*90,sy=y+(Math.random()-.5)*60;d.style.transform=`translate(${sx}px,${sy}px) scale(0)`;document.body.appendChild(d);
  const mx=(sx+tx)/2+(Math.random()-.5)*180,my=Math.min(sy,ty)-40-Math.random()*140;
  const a=d.animate([{transform:`translate(${sx}px,${sy}px) scale(.2)`},{transform:`translate(${sx+(Math.random()-.5)*70}px,${sy-36}px) scale(1.25)`,offset:.18},{transform:`translate(${mx}px,${my}px) scale(1)`,offset:.6},{transform:`translate(${tx}px,${ty}px) scale(.55)`}],{duration:780+Math.random()*260,delay:i*40,easing:'ease-in',fill:'forwards'});
  a.onfinish=()=>{d.remove();sfx.clink(1,0,.04);pill.classList.remove('bump');void pill.offsetWidth;pill.classList.add('bump')}}
}
function celebrate(win,b,pt=winPoint()){const x=win/b;floatText('+'+fmt(win),pt);sfx.jjr(x>=4);flyCoins(Math.min(40,Math.round(5+x*2)),pt);const st=document.querySelector('.stage');st.classList.remove('win');void st.offsetWidth;st.classList.add('win');setTimeout(()=>st.classList.remove('win'),2000);if(x>=3){burst(20);flash()}buzz(x>=3?[30,30,60]:30)}
const wpick=ws=>{let t=0;for(const w of ws)t+=w[1];let r=Math.random()*t;for(const w of ws){if((r-=w[1])<0)return w[0]}return ws[0][0]};
function loop(){if(!raf)raf=requestAnimationFrame(frame)}
function frame(){
 cx.clearRect(0,0,innerWidth,innerHeight);
 if(showerOn)for(let i=0;i<3;i++)addCoin(Math.random()*innerWidth,-20,(Math.random()-.5)*2,Math.random()*3+2);
 parts=parts.filter(p=>p.y<innerHeight+40&&p.life<400);if(parts.length>260)parts.splice(0,parts.length-260);
 for(const p of parts){p.life++;p.vy+=.32;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;const w=Math.abs(Math.cos(p.a))*p.s+1;
  cx.drawImage(CSPR,p.x-w,p.y-p.s,w*2,p.s*2)}
 raf=(parts.length||showerOn)?requestAnimationFrame(frame):0;
}

/* ---------- lobby ---------- */
const ART_SLOT=`<svg viewBox="0 0 120 120"><defs><linearGradient id="msg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a6a"/><stop offset="1" stop-color="#a0102a"/></linearGradient><linearGradient id="msg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c0"/><stop offset="1" stop-color="#e0a020"/></linearGradient></defs><rect x="18" y="22" width="74" height="86" rx="10" fill="url(#msg1)" stroke="#ffd76a" stroke-width="4"/><path d="M26 22Q55 0 84 22Z" fill="url(#msg2)" stroke="#a06a00" stroke-width="2"/><text x="55" y="19" text-anchor="middle" font-family="Bungee,sans-serif" font-size="9" fill="#a0102a">JACKPOT</text><rect x="26" y="40" width="58" height="32" rx="5" fill="#fff" stroke="#6a0010" stroke-width="3"/><g font-family="Bungee,Arial Black,sans-serif" font-size="20" text-anchor="middle" fill="#e0102a"><text x="36" y="64">7</text><text x="55" y="64">7</text><text x="74" y="64">7</text></g><path d="M45 42V70M65 42V70" stroke="#ccc" stroke-width="1.5"/><rect x="30" y="80" width="50" height="10" rx="4" fill="#4a0010"/><circle cx="42" cy="85" r="3" fill="#ffd76a"/><circle cx="55" cy="85" r="3" fill="#4aff8a"/><circle cx="68" cy="85" r="3" fill="#4ab0ff"/><path d="M92 50h8V30" stroke="#bbb" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="100" cy="26" r="7" fill="#ff2a44" stroke="#7a0012" stroke-width="2"/><circle cx="98" cy="24" r="2" fill="#fff9"/></svg>`;
const ART_CARD=`<svg viewBox="0 0 120 120"><g transform="rotate(-18 60 90)"><rect x="30" y="22" width="40" height="58" rx="5" fill="#fff" stroke="#999" stroke-width="2"/><text x="36" y="38" font-family="Georgia" font-weight="700" font-size="13" fill="#141420">A</text><text x="50" y="62" text-anchor="middle" font-size="22" fill="#141420">♠</text></g><g transform="rotate(14 60 90)"><rect x="48" y="20" width="40" height="58" rx="5" fill="#fff" stroke="#999" stroke-width="2"/><text x="54" y="36" font-family="Georgia" font-weight="700" font-size="13" fill="#d81a2a">K</text><text x="68" y="60" text-anchor="middle" font-size="22" fill="#d81a2a">♥</text></g><g><ellipse cx="34" cy="100" rx="18" ry="6" fill="#0006"/><g fill="#d0202a" stroke="#fff" stroke-width="2"><ellipse cx="34" cy="96" rx="16" ry="5.5"/><ellipse cx="34" cy="91" rx="16" ry="5.5"/></g><g fill="#2a5ae0" stroke="#fff" stroke-width="2"><ellipse cx="34" cy="86" rx="16" ry="5.5"/></g></g><g><g fill="#1a1a1a" stroke="#ffd76a" stroke-width="2"><ellipse cx="88" cy="100" rx="16" ry="5.5"/><ellipse cx="88" cy="95" rx="16" ry="5.5"/></g></g></svg>`;
let LV='menu';
function slotCards(){return GAMES.list.map(g=>`<button class="gcard c-${g.id}" data-id="${g.id}"><span class="rays"></span>${g.jp?`<span class="cjp">JACKPOT<b class="cjpv" data-g="${g.id}">0</b></span>`:''}<span class="bdg">${g.badge}</span><span class="hero">${IMG(CHARS[g.id])}</span><b class="en" style="font-family:${g.font}">${g.en}</b><span class="kn">${g.name}</span><small>${g.sub}</small></button>`).join('')}
function renderLobby(){const c=$('cards');c.className='cards v-'+LV;
 if(LV==='menu')c.innerHTML=`<button class="mcard m-slot" data-v="slot"><span class="rays"></span><span class="mart">${ART_SLOT}</span><b>슬롯게임</b><small>${GAMES.list.length}가지 슬롯 · 잭팟 · 프리게임</small></button><button class="mcard m-card" data-v="card"><span class="rays"></span><span class="mart">${ART_CARD}</span><b>카드게임</b><small>블랙잭 · 텍사스 홀덤</small><span class="mnew">NEW</span></button>`;
 else c.innerHTML=`<div class="lvbar"><button class="lvback" data-v="menu">‹ 메뉴</button><b>${LV==='slot'?'슬롯게임':'카드게임'}</b></div>`+(LV==='slot'?slotCards():(window.BJ?BJ.card:'')+(window.HE?HE.card:''));
 try{$$('.cjpv').forEach(e=>e.textContent=fmt(JPSEED.GRAND*1e4+pool(e.dataset.g).GRAND))}catch(e){}}
renderLobby();
$('cards').onclick=e=>{const v=e.target.closest('[data-v]');if(v){sfx.click();LV=v.dataset.v;renderLobby();return}
 const c=e.target.closest('.gcard');if(c){sfx.click();if(c.dataset.ext==='bj'){window.BJ&&BJ.open();return}if(c.dataset.ext==='he'){window.HE&&HE.open();return}openGame(c.dataset.id)}};
function showScreen(id){$$('.screen').forEach(s=>s.classList.toggle('on',s.id===id));document.body.classList.toggle('lob',id==='lobby');scrollTo(0,0)}
document.body.classList.add('lob');

/* ---------- game screen ---------- */
const box=$('box');let reels=[],strips=[],tcols=[],tEls=[],C=70;
function openGame(id){
 if(busy||fs)return;
 if(G&&G.unmount)G.unmount();document.querySelectorAll('.tx').forEach(e=>e.remove());
 {const stg=document.querySelector('#game .stage');stg.style.width='';stg.style.height='';box.style.gridTemplateColumns=''}
 G=GAMES.byId[id];document.body.dataset.g=id;document.body.classList.toggle('wj',!!G.custom);document.body.classList.toggle('pt',!!G.portrait);
 $('gtt').textContent=G.en;$('mtitle').innerHTML=G.en;$('ge1').textContent=$('ge2').textContent=G.hero;
 document.body.classList.toggle('jpon',!!G.jp);document.body.classList.toggle('nobuy',id==='lucky');
 $('spin').querySelector('.spi').textContent={olympus:'⚡',egypt:'🪲',buffalo:'🦬',lucky:'7 7 7',panda:'🐼',piggy:'🐷',dragon:'🐉',tiger:'🐾',ocean:'🫧'}[id]||'';
 const pk=['panda','piggy','lucky'].includes(id)?'pot':'pile';$('ped').src=U(PED(pk));document.querySelector('.mzone').dataset.ped=pk;$('jp').dataset.hero=G.hero;const LN=G.lines?G.lines.length:G.mode==='tumble'?'∞':243;$$('.pil b').forEach(e=>e.textContent=LN);$('clines').textContent=G.lines?`${G.lines.length} LINES · FEATURE`:G.mode==='tumble'?'SCATTER PAYS · TUMBLE':'243 WAYS · FEATURE';document.body.dataset.rows=G.rows;
 const dc=DECOR.get(id);$('scene').innerHTML=`<img class="scimg" src="${U(DECOR.svg(id))}" alt="">`+DECOR.fx(id);$('mascE').innerHTML=IMG(CHARS[id]);$('crest').src=U(CHARS[id]);$('propL').innerHTML=dc.pl.map(e=>`<span>${e}</span>`).join('');$('propR').innerHTML=dc.pr.map(e=>`<span>${e}</span>`).join('');$('ornL').textContent=dc.orn[0];$('ornR').textContent=dc.orn[1];
 document.documentElement.style.setProperty('--rows',G.rows);
 box.style.gridTemplateColumns=`repeat(${G.cols},minmax(0,1fr))`;
 if(G.mode==='tumble'){
  box.innerHTML=Array.from({length:G.cols},()=>'<div class="tcol"></div>').join('');
  tcols=[...box.children];reels=[];strips=[];
 }else{
  box.innerHTML=Array.from({length:G.cols},()=>'<div class="reel"><div class="strip"></div></div>').join('')+'<svg id="lines"></svg>'+(['egypt','dragon'].includes(id)?'<div id="hs"></div><div class="hsbar" id="hsbar"></div>':'');
  reels=[...box.querySelectorAll('.reel')];strips=reels.map(r=>r.firstElementChild);tcols=[];
 }
 cur=Array.from({length:G.cols},(_,c)=>Array.from({length:G.rows},()=>G.fill(c,false)));
 showScreen('game');if(G.mount)G.mount(API);size();drawStatic();renderBet();setWin(0);
 AUDIO.play(id);
}
$('back').onclick=()=>{if(busy||fs){toast('진행 중이에요',900);return}if(G&&G.unmount)G.unmount();document.querySelectorAll('.tx').forEach(e=>e.remove());document.body.classList.remove('pt');auto=false;renderBtns();sfx.click();document.body.dataset.g='lobby';document.body.classList.remove('jpon','wj');$('scene').innerHTML='';showScreen('lobby');AUDIO.play('lobby')};
const LAND=()=>matchMedia('(orientation:landscape) and (max-height:600px)').matches;
function size(){
 if(G&&G.size){const v=G.size(API);if(v){C=v;document.documentElement.style.setProperty('--c',C+'px')}return}
 if(!G)return;
 if(LAND()){
  const gm=document.querySelector('.gmain');const cols=getComputedStyle(gm).gridTemplateColumns.split(' ').map(parseFloat);const mid=cols[1]||gm.clientWidth*.6;
  const aw=mid-56-10-(G.cols-1)*4,ah=gm.clientHeight-32-10-8;
  C=Math.max(40,Math.floor(Math.min(aw/G.cols,ah/G.rows)));
  box.style.gridTemplateColumns=`repeat(${G.cols},${C}px)`;
 }else{
  box.style.gridTemplateColumns=`repeat(${G.cols},minmax(0,1fr))`;
  const w=(G.mode==='tumble'?tcols[0]:reels[0])?.clientWidth||60;
  const maxH=Math.max(200,innerHeight*.47);
  C=Math.round(Math.min(w*(G.classic?.95:1.02),maxH/G.rows));
 }
 document.documentElement.style.setProperty('--c',C+'px');
}
const cellHTML=(x,b=bet())=>`<div class="cell">${IMG(G.draw(x,b))}</div>`;
function drawStatic(){
 if(G.mode==='tumble'){tEls=tcols.map((col,c)=>{col.innerHTML='';return cur[c].map((x,r)=>mkTc(col,x,r*C))});return}
 strips.forEach((s,c)=>{s.style.transition='none';s.style.transform='translateY(0)';s.innerHTML=cur[c].map(x=>cellHTML(x,x.b)).join('')});
}
function mkTc(col,x,y){const d=document.createElement('div');d.className='tc';d.innerHTML=IMG(G.draw(x,x.b||bet()));d.style.transform=`translateY(${y}px)`;col.appendChild(d);return d}
const ro=new ResizeObserver(()=>{if(!G||document.body.dataset.g==='lobby')return;const old=C;size();if(!busy&&!reelsMoving)drawStatic();else if(old!==C&&G.mode==='tumble'){}});ro.observe(box);
function renderBet(){$('bet').textContent=short(fs?fs.bet:bet());renderJP();if(G&&G.onBet)G.onBet(API)}

/* reels */
let rs=[];
function runReel(c,final,dur,fsMode){
 return new Promise(res=>{
  const n=Math.max(10,Math.round(dur/42));
  const items=[...cur[c],...Array.from({length:n},()=>G.fill(c,fsMode)),...final];
  const s=strips[c];
  s.style.transition='none';s.style.transform='translateY(0)';s.innerHTML=items.map(x=>cellHTML(x,x.b)).join('');
  s.offsetHeight;reels[c].classList.add('spin');
  const target=-(items.length-G.rows)*C;
  s.style.transition=`transform ${dur}ms cubic-bezier(.32,.12,.22,1.04)`;s.style.transform=`translateY(${target}px)`;
  const st={c,final,done:false,res,target};
  st.blur=setTimeout(()=>reels[c].classList.remove('spin'),Math.max(0,dur-220));
  st.t=setTimeout(()=>endReel(st),dur+30);rs[c]=st;
 });
}
function endReel(st){
 if(st.done)return;st.done=true;clearTimeout(st.t);clearTimeout(st.blur);
 const c=st.c,s=strips[c];reels[c].classList.remove('spin','antic');
 s.style.transition='none';s.style.transform='translateY(0)';s.innerHTML=st.final.map(x=>cellHTML(x,x.b)).join('');
 sfx.stop(c);
 const sp=['S','C','W','P','bell'];
 st.final.forEach((x,r)=>{if(sp.includes(x.s))s.children[r].classList.add('land')});
 if(st.final.some(x=>x.s==='S'||x.s==='bell'))sfx.scat();else if(st.final.some(x=>x.s==='C'))sfx.coin();else if(st.final.some(x=>x.s==='P'))sfx.oink();
 st.res();
}
function slam(){
 rs.forEach((st,i)=>{if(!st||st.done||!strips[st.c])return;clearTimeout(st.t);clearTimeout(st.blur);
  const s=strips[st.c];let y=0;try{const tf=getComputedStyle(s).transform;if(tf&&tf!=='none')y=new DOMMatrix(tf).m42}catch(e){}
  s.style.transition='none';s.style.transform=`translateY(${y}px)`;s.offsetHeight;reels[st.c].classList.remove('spin','antic');
  s.style.transition='transform 140ms ease-out';s.style.transform=`translateY(${st.target}px)`;st.t=setTimeout(()=>endReel(st),150+i*40);
 });
}
async function spinReels(g,fsMode){
 const antic=G.antic(g);
 const base=T(780,380),stepT=T(G.classic?320:230,110);let extra=0;
 const durs=antic.map((a,c)=>{if(a)extra+=T(1250,700);return base+stepT*c+extra});
 rs=[];const ps=durs.map((d,c)=>runReel(c,g[c],d,fsMode));
 ps.forEach((p,c)=>p.then(()=>{const nx=c+1;if(nx<G.cols&&antic[nx]&&rs[nx]&&!rs[nx].done){reels[nx].classList.add('antic');sfx.antic()}}));
 await Promise.all(ps);
}
/* tumble */
async function tumbleIn(g){
 tEls.flat().forEach(el=>{el.style.transition=`transform ${T(260,160)}ms ease-in`;el.style.transform=`translateY(${(G.rows+1)*C}px)`});
 await sleep(T(240,150));
 tEls=tcols.map(col=>{col.innerHTML='';return []});
 const prom=[];
 for(let c=0;c<G.cols;c++){
  g[c].forEach((x,r)=>{const el=mkTc(tcols[c],x,-(G.rows-r+1)*C-C*.5);tEls[c][r]=el});
  tcols[c].offsetHeight;
  g[c].forEach((x,r)=>{const el=tEls[c][r];el.style.transition=`transform ${T(380,240)}ms cubic-bezier(.3,1.25,.55,1) ${(G.rows-r)*25}ms`;el.style.transform=`translateY(${r*C}px)`});
  setTimeout(()=>sfx.drop(),T(300,180));
  if(g[c].some(x=>x.s==='S'))setTimeout(()=>sfx.scat(),T(350,200));
  await sleep(T(90,45));
 }
 await sleep(T(420,260));
}
async function tumbleCascade(prev,wins,next){
 const rm=new Set(wins.flatMap(w=>w.cells.map(([c,r])=>c*10+r)));
 rm.forEach(k=>{const el=tEls[Math.floor(k/10)][k%10];el.classList.add('hit')});
 await sleep(T(550,300));
 let i=0;rm.forEach(k=>{const el=tEls[Math.floor(k/10)][k%10];el.classList.add('pop');el.style.transform+=' scale(1.4)'});sfx.pop(i++);
 await sleep(T(300,180));
 for(let c=0;c<G.cols;c++){
  const keep=tEls[c].filter((el,r)=>!rm.has(c*10+r));
  tEls[c].forEach((el,r)=>{if(rm.has(c*10+r))el.remove()});
  const k=G.rows-keep.length;const nu=[];
  for(let r=0;r<k;r++)nu.push(mkTc(tcols[c],next[c][r],-(k-r)*C-C*.3));
  tcols[c].offsetHeight;
  tEls[c]=[...nu,...keep];
  tEls[c].forEach((el,r)=>{el.style.transition=`transform ${T(380,230)}ms cubic-bezier(.3,1.25,.55,1)`;el.style.transform=`translateY(${r*C}px)`});
 }
 sfx.drop();
 await sleep(T(450,260));
}

/* win display */
const LCOL=['#ffd34d','#ff4d6a','#4fd4ff','#7dff7a','#ff9a1f','#d07bff','#fff','#3ee8d8','#ff6ad5','#b8ff3a'];
function cellEl(c,r){return G.mode==='tumble'?tEls[c][r]:strips[c].children[r]}
function showWins(wins){
 clearWins();if(!wins.length)return;
 const svg=$('lines');
 if(svg&&G.lines){const W=svg.clientWidth,H=svg.clientHeight,cw=W/G.cols,ch=H/G.rows;
  svg.innerHTML=wins.filter(w=>w.li!=null).map(w=>{const L=G.lines[w.li];const pts=L.map((r,c)=>`${c*cw+cw/2},${r*ch+ch/2}`).join(' ');const col=LCOL[w.li%LCOL.length];return `<polyline points="${pts}" fill="none" stroke="#000" stroke-width="9" stroke-linejoin="round" stroke-linecap="round" opacity=".5"/><polyline points="${pts}" fill="none" stroke="${col}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`}).join('');
  setTimeout(()=>{if(svg)svg.innerHTML=''},2200)}
 box.classList.add('dim');
 wins.forEach(w=>w.cells.forEach(([c,r])=>cellEl(c,r)?.classList.add('hit')));
}
function clearWins(){const s=$('lines');if(s)s.innerHTML='';box.classList.remove('dim');box.querySelectorAll('.hit,.col').forEach(e=>e.classList.remove('hit','col'))}

/* ---------- features ---------- */
async function holdSpinUI(hs,b){
 const hsEl=$('hs'),bar=$('hsbar');speak('홀드 앤 스핀, 시작할게요~');praise();
 AUDIO.setIntense(true);
 await cinematic(0,{big:'HOLD',line:'&amp; SPIN BONUS',sub:`코인 ${hs.init.filter(Boolean).length}개 고정! 리스핀 3회 · 새 코인이 나오면 3회로 초기화<br>${hs.init.length}칸을 모두 채우면 <b style="color:#ff5252">GRAND JACKPOT</b>`});
 const board=hs.init.slice();
 const lab=x=>IMG(G.draw(x,b)),N=board.length;
 hsEl.innerHTML=board.map(x=>`<div class="hc">${x?lab(x):''}</div>`).join('');hsEl.classList.add('on');
 let sp=3;const upd=()=>{bar.innerHTML=`남은 스핀 ${'●'.repeat(sp)}${'○'.repeat(3-sp)} · ${board.filter(Boolean).length}/${N}`};upd();await sleep(600);
 for(const add of hs.steps){
  sp--;upd();const empt=board.filter(x=>!x).length;bar.classList.toggle('last',sp===0);hsEl.classList.toggle('near',empt<=3);
  if(sp===0||empt<=3){for(let k=0;k<3;k++){AUDIO.tone(55,.14,k*.42,'sine',.25);AUDIO.tone(55,.12,k*.42+.16,'sine',.18)}if(sp===0)announce('LAST SPIN!','','small');if(empt<=3)announce(`GRAND까지 ${empt}칸!`,'','small')}
  [...hsEl.children].forEach((el,i)=>{if(!board[i])el.classList.add('roll')});
  for(let i=0;i<8;i++)AUDIO.tone(300+Math.random()*400,.05,i*.08,'square',.02);
  await sleep(T(900,500));
  [...hsEl.children].forEach(el=>el.classList.remove('roll'));
  let cmb=0;for(const [i,x] of add){board[i]=x;const el=hsEl.children[i];el.innerHTML=lab(x)+'<i class="ring"></i>';el.classList.add('new');AUDIO.tone(784*Math.pow(1.0595,cmb*2),.16,0,'triangle',.07);AUDIO.tone(1568*Math.pow(1.0595,cmb*2),.1,.04,'sine',.04);sfx.coin();buzz(40);flash();cmb++;if(x.jp){announce(x.jp+'!','','small')}await sleep(T(320,150))}
  if(add.length){sp=3;announce(add.length>1?`+${add.length} COINS!`:'+1 COIN!','스핀 3회로 초기화','small')}
  upd();await sleep(T(650,350));
 }
 bar.textContent='수집 중…';let total=0;
 for(let i=0;i<N;i++){const x=board[i];if(!x)continue;hsEl.children[i].classList.add('col');
  let v;if(x.jp){v=jpVal(x.jp,b);pool()[x.jp]=0;await jackpot(x.jp,v)}else{v=x.v*b;sfx.tick(i/N)}
  total+=v;setWin(total,'HOLD & SPIN');await sleep(T(180,90))}
 if(hs.full){const v=jpVal('GRAND',b);pool().GRAND=0;await jackpot('GRAND',v);total+=v;setWin(total,'HOLD & SPIN')}
 await sleep(400);hsEl.classList.remove('on');hsEl.innerHTML='';
 if(!fs)AUDIO.setIntense(false);
 return total;
}
async function jackpot(t,v){
 speak('축하해요~ '+({GRAND:'그랜드',MAJOR:'메이저',MINOR:'마이너',MINI:'미니',MEGA:'메가'})[t]+' 잭팟이에요!');praise(1900);
 const p=document.querySelector(`.plq[data-t="${t}"]`);p&&p.classList.add('hitjp');sfx.jp();buzz([100,50,100,50,300]);boom(t==='GRAND'?3:2);flash();shake();if(t==='GRAND'||t==='MAJOR')shower(true);
 await popup(`<div class="bl"></div><div>${T3(t)}</div><div>${T3('JACKPOT').replace(/t3 pop/,'t3 t3s pop')}</div><div class="num big" style="margin-top:8px">${fmt(v)}</div><button class="go">받기</button>`,{autoMs:auto?2600:0,cls:'jpc t-'+t});
 shower(false);
 p&&p.classList.remove('hitjp');
}
async function collectUI(col,b){
 await sleep(300);
 col.pigs.forEach(([c,r])=>cellEl(c,r).classList.add('col'));sfx.oink();toast('🐷 COLLECT!',1000);
 await sleep(T(700,350));
 let sum=0;
 for(const [c,r,v] of col.coins){const el=cellEl(c,r);el.classList.add('col');sum+=v*b*col.pigs.length;setWin(sum,'COLLECT');sfx.coin();await sleep(T(220,100))}
 if(col.mult>1){toast('x'+col.mult+'!',1100);sfx.lvl();await sleep(600);await countWin(sum,col.amt*b,500)}
 await sleep(300);
 return col.amt*b;
}
async function spinWheel(title,segs,i,labf){
 pop.innerHTML=`<div class="card"><h3>${title}</h3><div class="wheelwrap"><div class="ptr"></div>${wheelSVG(segs,labf)}</div><p id="wres">행운을 빌어요…</p></div>`;pop.classList.add('on');pop.onclick=null;
 const wh=$('wh'),n=segs.length,R=360*6+(360-(i*360/n+180/n));
 await sleep(120);wh.style.transform=`rotate(${R}deg)`;sfx.drum(.5);
 let lastSeg=0;const t0=performance.now();
 await new Promise(res=>{const st=t=>{let a=0;try{const m=new DOMMatrix(getComputedStyle(wh).transform);a=Math.atan2(m.b,m.a)*180/Math.PI}catch(e){}
  const seg=Math.floor(((a%360)+360)%360/(360/n));if(seg!==lastSeg){lastSeg=seg;sfx.wtick()}
  if(t-t0<5300)requestAnimationFrame(st);else res()};requestAnimationFrame(st)});
}
function wheelSVG(segs,labf=v=>v>=500?'MEGA':v+'x'){
 const n=segs.length,R=48,cols=['#ff2a44','#ffd34d','#2f7dff','#22c24f','#b04bff','#ff9a1f'];
 return `<svg viewBox="-50 -50 100 100"><circle r="50" fill="url(#gG)"/><g id="wh">${segs.map((s,i)=>{const a0=(i*360/n-90)*Math.PI/180,a1=((i+1)*360/n-90)*Math.PI/180,am=((i+.5)*360/n-90);
  const p=`M0 0L${R*Math.cos(a0)} ${R*Math.sin(a0)}A${R} ${R} 0 0 1 ${R*Math.cos(a1)} ${R*Math.sin(a1)}z`;
  const lab=labf(s[0]),top=s[0]===Math.max(...segs.map(q=>q[0]));
  return `<path d="${p}" fill="${s[2]||(top?'#111':cols[i%cols.length])}" stroke="#fff" stroke-width=".6"/><text transform="rotate(${am+90}) translate(0 -33)" text-anchor="middle" font-family="Bungee,sans-serif" font-size="${lab.length>4?6.5:8}" fill="#fff" stroke="#000" stroke-width="1.2" paint-order="stroke">${lab}</text>`}).join('')}</g><circle r="9" fill="url(#cG)" stroke="#6e3f03" stroke-width="1.5"/></svg>`;
}
async function wheelUI(w,b){return await wheelUp(b,'벨 3개! 휠 업그레이드 보너스')}

async function jpWheelUI(w,b){
 AUDIO.setIntense(true);sfx.jp();flash();shake();
 await cinematic(0,{big:'WHEEL',line:'JACKPOT GUARANTEED',sub:'잭팟 확정! 어떤 잭팟일까?',btn:'SPIN'});
 const segs=G.SEG.map(t=>[t,1,GAMES.JCOL[t]]);
 await spinWheel('JACKPOT WHEEL',segs,w.i,t=>t);
 const v=jpVal(w.tier,b);pool()[w.tier]=0;$('wres').innerHTML=`<b style="font-size:28px;color:#ffd34d">${w.tier}!</b>`;
 await sleep(1200);pop.classList.remove('on');
 await jackpot(w.tier,v);
 if(!fs)AUDIO.setIntense(false);
 return v;
}
/* ---------- free game cinematic ---------- */
const TOPS={vault:'W',toad:'r88',olympus:'cro',buffalo:'buf',dragon:'drg',tiger:'tig',ocean:'wha',egypt:'msk',panda:'W',piggy:'P',lucky:'r7'};
const CMODE={vault:'run',toad:'rise',olympus:'fly',dragon:'fly',ocean:'rise'};
const CDUST={vault:'🪙',toad:'🪙',olympus:'✨',buffalo:'💨',tiger:'🐾',piggy:'🪙',panda:'🌸',egypt:'✨',dragon:'🔥',ocean:'🫧',lucky:'🍀'};
let buying=false,superNext=false;
async function cinematic(n,o={}){
 const id=G.id,stage=document.querySelector('.stage');
 {const isFS=!o.big||/FREE/.test(o.line||'');announce(isFS?'FREE GAMES!':'BONUS GAME!',isFS?'프리 게임':'보너스 게임');speak(isFS?'축하해요~ 프리게임이에요!':'와~ 보너스 게임이에요!');praise()}
 AUDIO.setIntense(true);AUDIO.duck(true);sfx.whoosh();
 if(RM){await fsSign(n,o);AUDIO.duck(false);return}
 const up=stage.animate([{transform:'translateY(0)'},{transform:'translateY(-150vh)'}],{duration:650,easing:'cubic-bezier(.5,0,.8,.4)',fill:'forwards'});
 await sleep(480);
 const cv=document.createElement('div');cv.className='cine';
 cv.innerHTML=`<img class="cbg" src="${U(DECOR.pano(id))}" alt=""><div class="cglow"></div>`;
 document.body.appendChild(cv);cv.animate([{opacity:0},{opacity:1}],{duration:350,fill:'forwards'});
 await sleep(350);
 const W=innerWidth,H=innerHeight,N=innerWidth*innerHeight>600000?9:7,img=o.heart?U(`<svg viewBox="0 0 100 100">${ICONS['💖']||ICONS['💌']}</svg>`):U(typeof FACES!=='undefined'&&FACES[id]?FACES[id]:CHARS[id]),mode=o.heart?'rise':CMODE[id]||'run',sz=Math.min(W,H)*.6,hy=H*.6;
 sfx.rumble(2.8);
 const shk=setInterval(()=>{shake();buzz(25)},380);
 for(let i=0;i<N;i++){
  const d=document.createElement('img');d.src=img;d.className='runner';d.style.width=sz+'px';d.style.marginLeft=(-sz/2)+'px';d.style.marginTop=(-sz)+'px';cv.appendChild(d);
  const lane=(i%5-2)*1.1+(Math.random()-.5)*.7,ph=Math.random()*6,fr=[];
  for(let k=0;k<=14;k++){const t=k/14;let x,y,sc,r=0,op=1;
   if(mode==='fly'){sc=.05+t*t*2.6;x=W/2+Math.sin(t*6+ph)*W*.18*(1+t*2)+lane*W*.04*t*4;y=H*.35+Math.cos(t*5+ph)*H*.06+t*t*H*.8;r=Math.sin(t*6+ph)*18}
   else if(mode==='rise'){sc=.4+t*1.5;x=W/2+lane*W*.13+Math.sin(t*8+ph)*30;y=H*1.25-t*H*1.5;r=Math.sin(t*7+ph)*10}
   else{sc=.06+t*t*3.2;x=W/2+lane*W*.05*(1+t*8);y=hy+t*t*H*.95-Math.abs(Math.sin(t*22+ph))*sz*.12*sc;r=Math.sin(t*22+ph)*5}
   if(t>.85)op=1-(t-.85)/.15;
   fr.push({transform:`translate(${x}px,${y}px) scale(${sc}) rotate(${r}deg)`,opacity:op})}
  d.animate(fr,{duration:2000,delay:i*210,easing:'linear',fill:'both'});
 }
 const dk=o.heart?'💕':CDUST[id],dsrc=ICONS[dk]?IURL(dk):null,dt=setInterval(()=>{for(let j=0;j<2;j++){const s=document.createElement(dsrc?'img':'span');s.className='sp';if(dsrc){s.src=dsrc;s.alt='';const z=30+Math.random()*40;s.style.width=s.style.height=z+'px'}else s.textContent=dk;s.style.fontSize=(30+Math.random()*40)+'px';cv.appendChild(s);const x=W*(.2+Math.random()*.6),y=H*(.6+Math.random()*.35);
  s.animate([{transform:`translate(${x}px,${y}px) scale(.3)`,opacity:.9},{transform:`translate(${x+(Math.random()-.5)*200}px,${y-80-Math.random()*120}px) scale(1.6)`,opacity:0}],{duration:900,easing:'ease-out'}).onfinish=()=>s.remove()}},140);
 await sleep(2000+N*210-300);
 clearInterval(shk);clearInterval(dt);flash();sfx.boom();
 clearWins();const saved=cur;cur=Array.from({length:G.cols},()=>Array.from({length:G.rows},()=>({s:TOPS[id]})));drawStatic();
 cv.animate([{opacity:1},{opacity:0}],{duration:400,fill:'forwards'}).onfinish=()=>cv.remove();
 up.cancel();stage.animate([{transform:'translateY(-150vh)'},{transform:'translateY(14px)',offset:.78},{transform:'translateY(0)'}],{duration:700,easing:'ease-out'});
 await sleep(720);shake();buzz(80);
 const cols=G.mode==='tumble'?tcols:reels;
 for(let c=0;c<cols.length;c++){cols[c].querySelectorAll('.cell,.tc').forEach(e=>e.classList.add('gold'));sfx.ding(c);await sleep(170)}
 burst(60);await sleep(450);
 await fsSign(n,o);
 cur=saved;drawStatic();AUDIO.duck(false);
}
async function fsSign(n,o={}){
 sfx.sign();boom(1);
 const big=o.big||String(n),ln=o.line||'FREE GAMES WON';
 await popup(`<div class="dia${big.length>3?' wide':''}"><div>${T3(big)}<span class="t3 t3s"><span class="ex">${ln}</span><span class="fr">${ln}</span></span></div></div>${o.sub?`<p class="csub">${o.sub}</p>`:''}<button class="go start">${o.btn||'START'}</button>`,{cls:'fsign',autoMs:auto?2600:0});
}
async function buffalonize(u){
 AUDIO.sfx.sign();flash();shake();
 const ic=k=>`<img src="${U(`<svg viewBox="0 0 100 100">${ICONS[k]}</svg>`)}" alt="">`;
 const from={eag:'🦅',wolf:'🐺',cou:'🐆',elk:'🦌'}[u];
 await popup(`<div>${T1('ANIMALS GOT','t3s')}</div><div>${T1('BUFFALONIZED','t3s')}</div><div class="upg"><img src="${U(G.ART[u])}" alt=""><span class="arr">MOVE LIKE</span><img src="${U(G.ART.buf)}" alt=""></div><p>이번 프리게임 동안 이 동물은 전부 버팔로로 나와요!</p><button class="go">좋아!</button>`,{cls:'bw tier-epic',autoMs:auto?2600:0});
}
async function buyFS(){
 if(busy||fs||!G||G.id==='lucky')return;
 const b=bet(),sup=!!G.superBuy,c1=b*(G.buyX||60),c2=b*(G.superX||150);
 const body=sup?`<h3>프리게임 구입</h3><div class="yn2"><button class="opt" data-v="1">프리게임<b>🪙 ${short(c1)}</b></button><button class="opt sup" data-v="2">슈퍼 프리게임<br><small>배수 오브 2배</small><b>🪙 ${short(c2)}</b></button></div><div class="yn"><button class="n" data-v="0">✕</button></div>`
  :`<h3>프리게임 구입</h3><div class="price">🪙 ${short(c1)}</div><p style="color:#ffe9c0">현재 베팅 ${short(b)}의 ${G.buyX||60}배 · 바로 프리게임 시작!</p><div class="yn"><button class="n" data-v="0">✕</button><button class="y" data-v="1">✓</button></div>`;
 const v=await new Promise(res=>{pop.innerHTML=`<div class="card wood">${body}</div>`;pop.classList.add('on');
  pop.onclick=e=>{const x=e.target.closest('[data-v]');if(x){pop.onclick=null;pop.classList.remove('on');res(+x.dataset.v)}else if(!e.target.closest('.card')){pop.onclick=null;pop.classList.remove('on');res(0)}}});
 if(!v)return;
 const cost=v===2?c2:c1;
 if(S.bal<cost){toast('코인 부족!');return}
 S.bal-=cost;renderBal(true);S.xp+=cost;buying=true;superNext=v===2;force='fs';sfx.chaching();save();spin();
}
/* ---------- main spin ---------- */
let lastAct=0;
/* 프리게임 멈춤 방지: 프리게임 중 아무 진행 없이 6초 지나면 자동으로 다음 스핀 */
setInterval(()=>{if(fs&&!busy&&!reelsMoving&&G&&!pop.classList.contains('on')&&!document.hidden&&document.body.dataset.g!=='lobby'&&Date.now()-lastAct>6000){lastAct=Date.now();spin()}},2000);
async function spin(){
 if(reelsMoving){if(G.mode!=='tumble')slam();return}
 if(busy||!G)return;
 lastAct=Date.now();
 AUDIO.init();hideDbl();
 const free=!!fs,b=free?fs.bet:bet();
 if(!free&&buying){buying=false}
 else if(!free){
  const cost=Math.round(b*(G.costMul?G.costMul():1));
  if(S.bal<cost){auto=false;renderBtns();toast('코인 부족!');buzz(80);$('charge').animate&&showScreenHint();return}
  S.bal-=cost;renderBal(false);
  if(G.jp){const p=pool();for(const t in p)p[t]+=b*({GRAND:.004,MAJOR:.003,MINOR:.002,MINI:.001})[t]}
  S.xp+=b;
 }else{fs.left--;fs.n++;banner();announce(`FREE SPIN ${fs.n}`,`남은 ${fs.left}회`,'small')}
 busy=true;reelsMoving=true;clearWins();setWin(free?fs.total:0,free?'FREE SPIN WIN':'WIN');
 $('spin').classList.add('stop');$('spin').querySelector('.spt').textContent='STOP';if(G.id==='lucky'){const lv=$('lever');lv.classList.add('pull');setTimeout(()=>lv.classList.remove('pull'),450)}
 sfx.start();buzz(15);renderJP();
 const o=free?G.spin(true,fs.st):rollOutcome();
 o.grid.forEach(col=>col.forEach(x=>x.b=b));
 let win=0;
 if(G.mode==='tumble'){
  o.steps.forEach(s=>s.grid.forEach(col=>col.forEach(x=>x.b=b)));
  await tumbleIn(o.steps[0].grid);
  reelsMoving=false;spinBtnIdle();
  let acc=0;
  for(let i=0;i<o.steps.length;i++){
   const s=o.steps[i];if(!s.wins.length)break;
   const add=s.win*b;
   showWinsT(s.wins);if(add<b*10)celebrate(add,b);else{sfx.chaching();flash()}
   await countWin((free?fs.total:0)+acc,(free?fs.total:0)+acc+add,T(500,250));acc+=add;
   if(i>0)toast(`연쇄 x${i+1}!`,700);
   await tumbleCascade(s.grid,s.wins,o.steps[i+1].grid);
  }
  win=acc;
  if(o.bm>0){const off=free?fs.total:0;
   o.bombs.forEach(([c,r])=>tEls[c][r].classList.add('hit'));box.classList.add('dim');sfx.boom();if(G.id==='olympus'){AUDIO.voice('zap');flash()}buzz([80,40,160]);
   toast(`${G.multName||'폭죽'} x${o.bm}!`,1400);burst(40);await sleep(900);
   const nw=o.base*o.bm*b;await countWin(off+acc,off+nw,T(900,400));win=nw;
  }
  if(o.scWin){win+=o.scWin*b;showWinsT([{cells:o.scCells}])}
  cur=o.grid;
 }else{
  if(G.preReels)G.preReels(o,API);
  await spinReels(o.grid,free);
  cur=o.grid;reelsMoving=false;spinBtnIdle();
  win=o.total*b;
  showWins(o.wins);
  if(G.post)await G.post(o,b,API);
 }
 if(win>0){
  if(free)fs.total+=win;else S.bal+=win;
  if(win>=b*10){await sleep(400);await bigWin(win,b)}
  else if(G.mode!=='tumble'){celebrate(win,b);await countWin(free?fs.total-win:0,free?fs.total:win,T(700,350))}
  if(!free)renderBal(true);
  setWin(free?fs.total:win,free?'FREE SPIN WIN':'WIN');
 }
 // features
 if(win>=b*10)mascot('big');else if(win>0)mascot('win');else{loseN++;if(loseN%3===0)mascot('lose',true);else if(Math.random()<.06)mascot('lose')}
 let fx=0;
 if(o.hs){await sleep(500);fx=await holdSpinUI(o.hs,b)}
 if(o.collect){const add=await collectUI(o.collect,b);fx+=add;}
 if(o.wheel){await sleep(500);fx+=await wheelUI(o.wheel,b)}
 if(o.jpw){await sleep(500);mascot('big');fx+=await jpWheelUI(o.jpw,b)}
 if(o.pick){await sleep(500);mascot('big');fx+=await pickBonus(b,{tier:o.pick.tier,emoji:o.pick.emoji||'🦪',jp:true,title:o.pick.title||'PEARL JACKPOT!'})}
 if(o.cash){fx+=o.cash}
 if(!free&&o.bonus){await sleep(500);mascot('big');fx+=o.bonus==='ladder'?await ladderBonus(b):o.bonus==='mini'?await miniSlot(b):await wheelUp(b)}
 if(!free&&o.heart){await sleep(400);fx+=await heartBonus(b)}
 if(!free&&(Math.random()<1/400||window.__mystery)){window.__mystery=0;await sleep(400);fx+=await pickBonus(b)}
 if(fx>0){
  if(fx>=b*10)await bigWin(fx,b);else celebrate(fx,b);
  if(free)fs.total+=fx;else{S.bal+=fx;renderBal(true)}
  setWin(free?fs.total:fx,free?'FREE SPIN WIN':'BONUS WIN');
 }
 if(o.upgrade&&free){for(const u of o.upgrade){await buffalonize(u)}banner()}
 if(o.lvlUp&&free){sfx.lvl();burst(50);await popup(`<h3>LEVEL UP!</h3><p>돼지 ${fs.st.pigs}마리 수집!</p><div class="big num">x${o.lvlUp}</div><p>코인 배수 x${o.lvlUp} · 프리스핀 +10회</p><button class="go">계속</button>`,{autoMs:auto?2200:0})}
 if(o.fsAward){
  await sleep(500);mascot('big');
  if(free){fs.left+=o.fsAward;sfx.scat();announce(`+${o.fsAward} FREE GAMES!`,'추가 프리 게임');speak('프리게임이 더 생겼어요!');praise(1500);banner();await sleep(1500)}
  else{
   await cinematic(o.fsAward,superNext?{line:'SUPER FREE GAMES'}:{});
   fs={left:o.fsAward,total:0,bet:b,n:0,st:G.fsInit(o.fsAward,superNext)};superNext=false;document.body.classList.add('fs');AUDIO.setIntense(true);banner();
  }
 }
 // level
 while(S.xp>=need()){S.xp-=need();S.lvl++;const bonus=10000*S.lvl;S.bal+=bonus;sfx.lvl();renderBal(true);await popup(`<h3>LEVEL UP!</h3><p>${HER}님 레벨 ${S.lvl} 달성 💕</p><div class="num" style="font-size:32px;color:#fff">+${fmt(bonus)}</div><button class="go">받기</button>`,{autoMs:auto?1800:0})}
 renderLvl();
 if(fs&&fs.left<=0&&free){
  await sleep(600);const t=fs.total,fb=fs.bet,fn=fs.n;fs=null;document.body.classList.remove('fs');AUDIO.setIntense(false);
  speak('프리게임 끝! 수고했어요~');shower(true);sfx.pile();
  await popup(`<div class="fsend"><div>${T3('FREE\u00A0GAMES')}</div><div>${T3('COMPLETE').replace(/t3 pop/,'t3 t3s pop')}</div><p>${fn}번의 프리 스핀으로 모은 금액</p><div class="num big fsn" id="fsn">0</div><button class="go">받기</button></div>`,{autoMs:auto?3200:0,cls:'fsendc',onShow:()=>{const el=$('fsn'),t0=performance.now();const st=k=>{const p=Math.min(1,(k-t0)/1400);el.textContent=fmt(t*p*p*(3-2*p));if(p<1)requestAnimationFrame(st)};requestAnimationFrame(st)}});
  shower(false);
  if(t>=fb*10)await bigWin(t,fb);
  S.bal+=t;renderBal(true);setWin(t,'FREE SPINS TOTAL');renderBet();
 }
 save();renderJP();renderCharge();
 busy=false;lastAct=Date.now();
 if(!free&&!fs&&!auto&&win+fx>0&&!o.fsAward&&win+fx<b*500)offerDbl(win+fx);
 if(fs||auto){await sleep(fs?T(700,350):(win>0?T(900,500):T(350,150)));if(!busy&&(fs||auto)&&document.body.dataset.g!=='lobby')spin()}
}
function showWinsT(wins){box.classList.add('dim');wins.forEach(w=>w.cells.forEach(([c,r])=>tEls[c][r]?.classList.add('hit')))}
function spinBtnIdle(){$('spin').classList.remove('stop');$('spin').querySelector('.spt').textContent='SPIN'}
function banner(){if(!fs)return;const ex=G.id==='egypt'?' · x3':G.id==='piggy'?` · 코인 x${fs.st.lvl} · 🐷${fs.st.pigs}`:G.id==='olympus'?` · 누적 x${fs.st.mult}${fs.st.sup?' · SUPER':''}`:G.id==='buffalo'?` · 황금🦬 ${fs.st.golds}/4${fs.st.upg.length?` · 변신 ${fs.st.upg.length}`:''}`:'';$('banner').textContent=`FREE SPINS ${fs.n} / ${fs.n+fs.left}${ex}`}
function showScreenHint(){if(S.bal<BETS[0])toast('로비에서 무료충전!',1500)}

/* ---------- double up ---------- */
let dblAmt=0,dblT=0;
function offerDbl(a){dblAmt=a;$('dbl').textContent=`더블업 ${short(a*2)}?`;$('dbl').classList.add('on');clearTimeout(dblT);dblT=setTimeout(hideDbl,8000)}
function hideDbl(){$('dbl').classList.remove('on');dblAmt=0;clearTimeout(dblT)}
$('dbl').onclick=e=>{e.stopPropagation();if(busy||!dblAmt)return;const a=dblAmt;hideDbl();sfx.click();gamble(a)};
async function gamble(amount){
 busy=true;S.bal-=amount;renderBal(false);let cur=amount,round=0;const hist=[];
 AUDIO.setIntense(true);
 const SU=[['♥','#e0102a','1'],['♦','#e0102a','1'],['♣','#111','0'],['♠','#111','0']];
 for(;;){
  const ch=await new Promise(res=>{
   pop.innerHTML=`<div class="card"><h3>더블업${round?` ${round}연승`:''}</h3><p>카드 색을 맞히면 두 배! (최대 5연승)</p><div class="gtable">${hist.map(x=>`<span style="color:${x[1]}">${x[0]}</span>`).join('')}</div><div class="flipc" id="fcd"><div class="in"><div class="ba">?</div><div class="fa" id="ffd"></div></div></div><div class="num" style="font-size:clamp(20px,6vw,26px);color:#fff">${fmt(cur)} → <span style="color:#ffd34d">${fmt(cur*2)}</span></div><div class="gbtns"><button class="red" data-c="1">빨강 ♥♦</button><button class="blk" data-c="0">검정 ♣♠</button><button class="take" data-c="t">그만하고 ${fmt(cur)} 받기</button></div></div>`;
   pop.classList.add('on');pop.onclick=e=>{const x=e.target.closest('[data-c]');if(x)res(x.dataset.c)};
  });
  pop.onclick=null;if(ch==='t')break;
  pop.querySelectorAll('.gbtns button').forEach(x=>x.disabled=true);
  sfx.drum(.8);await sleep(800);
  const su=SU[Math.floor(Math.random()*4)];const ff=$('ffd');ff.textContent=su[0];ff.style.color=su[1];$('fcd').classList.add('f');sfx.flip();hist.push(su);
  await sleep(560);
  if(su[2]===ch){cur*=2;round++;sfx.chaching();burst(30);flash();toast('x2 성공!',800);await sleep(1000);if(round>=5){toast('5연승!',1000);await sleep(700);break}}
  else{cur=0;sfx.lose();buzz(200);shake();toast('꽝…',1100);await sleep(1400);break}
 }
 pop.classList.remove('on');AUDIO.setIntense(false);
 if(cur>0){S.bal+=cur;setWin(cur,'더블업 성공');celebrate(cur,amount,[innerWidth/2,innerHeight*.4])}else setWin(0,'더블업 실패');
 renderBal(true);save();busy=false;
}
/* ---------- mystery pick ---------- */
const PICKE={vault:'🏦',toad:'🪙',olympus:'🏺',egypt:'🏺',buffalo:'💰',lucky:'🎁',panda:'🥠',piggy:'🥚',dragon:'🧧',tiger:'🥥',ocean:'🐚'};
const PT=[['MINI',10,60],['MINOR',30,28],['MAJOR',100,10.5],['GRAND',1000,1.5]];
async function pickBonus(b,opt={}){const PE=opt.emoji||PICKE[G.id];
 AUDIO.setIntense(true);sfx.jp();flash();shake();burst(40);
 await cinematic(0,{big:'PICK',line:opt.jp?'JACKPOT PICK BONUS':'MYSTERY PICK BONUS',sub:`<b>${opt.title||'미스터리 보너스'}</b><br>12개 중 같은 잭팟 3개를 먼저 모으면 당첨!<br>${opt.jp?'잭팟 확정! MINI~GRAND':'MINI 10배 · MINOR 30배 · MAJOR 100배 · GRAND 1000배'}`});
 const tg=opt.tier?PT.findIndex(t=>t[0]===opt.tier):wpick(PT.map((t,i)=>[i,t[2]]));
 const seq=[tg,tg];PT.forEach((t,i)=>{if(i!==tg){const k=Math.floor(Math.random()*3);for(let j=0;j<k;j++)seq.push(i)}});
 for(let i=seq.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[seq[i],seq[j]]=[seq[j],seq[i]]}seq.push(tg);
 const cnt=[0,0,0,0];let k=0;
 const tiers=()=>PT.map((t,i)=>`<div style="color:${['#57e07a','#4fb3ff','#d07bff','#ff5252'][i]}">${t[0]}<b>${'●'.repeat(cnt[i])}${'○'.repeat(3-cnt[i])}</b></div>`).join('');
 pop.innerHTML=`<div class="card"><h3>상자를 골라요!</h3><div class="ptiers" id="ptier">${tiers()}</div><div class="pgrid" id="pgrid">${Array.from({length:12},(_,i)=>`<button data-i="${i}">${PE}</button>`).join('')}</div><p id="pmsg">남은 기회 무제한 · 3개 모이면 끝</p></div>`;
 pop.classList.add('on');pop.onclick=null;
 const grid=$('pgrid');
 await new Promise(res=>{
  let lock=false,at=0;
  const open=btn=>{if(lock||btn.classList.contains('op'))return;const t=seq[k++];cnt[t]++;btn.classList.add('op');btn.dataset.t=t;btn.innerHTML=IMG(coinSVG(PT[t][0],PT[t][0]));sfx.reveal(cnt[t]);buzz(25);$('ptier').innerHTML=tiers();
   if(cnt[t]===2&&t===tg){toast('하나만 더!',700)}
   if(k===seq.length){lock=true;clearInterval(at);res()}};
  grid.onclick=e=>{const x=e.target.closest('button');if(x)open(x)};
  if(auto)at=setInterval(()=>{const c=[...grid.children].filter(x=>!x.classList.contains('op'));if(c.length)open(c[Math.floor(Math.random()*c.length)])},650);
 });
 grid.onclick=null;
 const rest=[];PT.forEach((t,i)=>{for(let j=cnt[i];j<3;j++)rest.push(i)});
 [...grid.children].forEach(x=>{if(!x.classList.contains('op')){const t=rest.pop();x.innerHTML=IMG(coinSVG(PT[t][0],PT[t][0]));x.classList.add('dim')}else if(+x.dataset.t===tg)x.classList.add('win');else x.classList.add('dim')});
 const v=opt.jp?jpVal(PT[tg][0],b):PT[tg][1]*b;if(opt.jp)pool()[PT[tg][0]]=0;$('pmsg').innerHTML=`<b style="font-size:24px;color:#ffd34d">${PT[tg][0]} ${fmt(v)}</b>`;
 sfx.jp();burst(tg>=2?150:60);flash();
 await sleep(2200);pop.classList.remove('on');
 if(!fs)AUDIO.setIntense(false);
 return v;
}
/* ---------- daily wheel ---------- */
const DW=[[1e4,20],[3e4,15],[2e4,18],[1e5,8],[5e4,13],[1e6,.6],[2e4,18],[2e5,5],[3e4,15],[5e5,1.5],[5e4,13],[1e5,8]];
const WCOOL=4*3600e3;
function renderLW(){const left=(S.wheelAt||0)-Date.now();$('lwheel').disabled=left>0;$('lwT').textContent=left>0?`다음 무료까지 ${Math.floor(left/3600e3)}:${String(Math.floor(left/60e3)%60).padStart(2,'0')}:${String(Math.floor(left/1e3)%60).padStart(2,'0')}`:'지금 무료! · 최대 100만'}
setInterval(renderLW,1000);
$('lwheel').onclick=async()=>{if($('lwheel').disabled||busy)return;busy=true;AUDIO.init();S.wheelAt=Date.now()+WCOOL;save();renderLW();
 const i=wpick(DW.map((d,i)=>[i,d[1]]));await spinWheel('행운의 휠',DW,i,v=>short(v));
 const v=DW[i][0];$('wres').innerHTML=`<b style="font-size:28px;color:#ffd34d">+${fmt(v)}</b>`;sfx.chaching();burst(80);flash();
 await sleep(1500);pop.classList.remove('on');S.bal+=v;
 if(v>=2e5)await bigWin(v,v/30);else{floatText('+'+fmt(v),[innerWidth/2,innerHeight*.5]);flyCoins(30,[innerWidth/2,innerHeight*.5])}
 renderBal(true);save();busy=false};
/* ---------- mascot ---------- */
function PED(kind){
 const coins=Array.from({length:18},(_,i)=>{const x=60+((i*53)%180),y=kind==='pot'?60-((i*7)%26):96-Math.floor(i/6)*16+((i*11)%6);return `<ellipse cx="${x}" cy="${y+4}" rx="18" ry="7" fill="#7a4503"/><ellipse cx="${x}" cy="${y}" rx="18" ry="7" fill="url(#cG)" stroke="#6e3f03" stroke-width="1.5"/><ellipse cx="${x-4}" cy="${y-2}" rx="7" ry="2" fill="#fff" opacity=".6"/>`}).join('');
 if(kind==='pot')return `<svg viewBox="0 0 300 170"><ellipse cx="150" cy="160" rx="120" ry="10" fill="#000" opacity=".45"/><path d="M40 70h220c0 60-30 92-110 92S40 130 40 70z" fill="url(#tR)"/><path d="M40 70h220c0 60-30 92-110 92S40 130 40 70z" fill="url(#vig)"/><rect x="34" y="66" width="232" height="16" rx="8" fill="url(#gF)"/><path d="M60 110q90 20 180 0" stroke="url(#gF)" stroke-width="8" fill="none"/><circle cx="150" cy="126" r="16" fill="url(#cG)" stroke="#6e3f03" stroke-width="2"/>${coins}<ellipse cx="150" cy="40" rx="70" ry="14" fill="#fff6c0" opacity=".25"/></svg>`;
 return `<svg viewBox="0 0 300 130"><ellipse cx="150" cy="120" rx="130" ry="10" fill="#000" opacity=".45"/>${coins}</svg>`}
let mbT=0;
const PRAISE=[`역시 ${HER}이 대단해~`,`우와, ${HER}이 최고야!`,`${HER}이 손은 진짜 금손이다!`,`역시 내 여자친구!`,`오늘 ${HER}이 운 대박인데?`,`${HER}아 멋지다~`,`우리 ${HER}이 천재 아니야?`,`역시 ${HER}이! 사랑해~`];
function praise(){const p=PRAISE[Math.floor(Math.random()*PRAISE.length)];if(lastSay&&Date.now()-lastSay.at<1500)speak(lastSay.t+' '+p,lastSay.w);else speak(p,'dealer')}
const LOVETAP=[`${HER} 사랑해!`,`${HER}아 오늘도 사랑해~`,`세상에서 ${HER}이가 제일 예뻐`,`${HER}이 보고 싶다…`,`${HER}이 웃는 게 제일 좋아`,`${HER}아 오늘 하루도 수고했어`,`${HER}이는 내 잭팟이야`,`${HER}이 옆에 있으면 행복해`,`${HER}아 밥은 먹었어?`,`우리 ${HER}이 최고야!`,`${HER}이 손잡고 싶다`,`${HER}아 평생 같이 있자`,`${HER}이 생각만 해도 웃음 나`,`힘든 일 있으면 나한테 말해줘`,`${HER}이는 세상에서 제일 소중해`,`${HER}아 꼭 안아줄게`,`오늘도 ${HER}이 덕분에 행복해`,`${HER}이 귀여워 죽겠어`,`${HER}아 내 마음 다 가져가`,`${HER}이랑 데이트하고 싶다`,`${HER}아 많이 많이 사랑해`,`${HER}이 없으면 안 돼`,`오늘 ${HER}이 더 예쁘다`,`${HER}아 고마워, 늘 곁에 있어줘서`];
const LOVEL={win:[`${HER}이 최고!`,`역시 ${HER}!`],big:[`${HER} 부자 됐다!!`,`${HER}이 잭팟 여신!!`],lose:[`${HER}아 힘내!`],idle:[`${HER}이 안녕!`,`${HER} 사랑해 💕`,'주인장이 보고 싶대']};
let loseN=0;
function mascot(kind,shagF){const m=$('masc'),dc=DECOR.get(G.id),L=[...(dc[kind]||dc.idle),...(LOVEL[kind]||[])];m.classList.remove('jump','dance','sad','spin3d','big');void m.offsetWidth;m.classList.add(kind==='big'?'dance':kind==='lose'?'sad':'jump');
 if(kind==='big'||kind==='win'){m.classList.add('spin3d');if(kind==='big')m.classList.add('big');sigFX(kind==='big'?2:1)}
 const shag=kind==='lose'&&!!shagF;const Lx=L.filter(x=>x!=='샤갈!');const talk=shag||kind==='big'||kind==='idle'||(kind==='win'&&Math.random()<.2)||(kind==='lose'&&Math.random()<.5);const b=$('bub');if(talk){const txt=shag?'샤갈!':Lx[Math.floor(Math.random()*Lx.length)]||'';b.textContent=txt;b.classList.add('on');if(G.say)G.say(txt,kind);if(shag)speak('샤갈!')}clearTimeout(mbT);mbT=setTimeout(()=>b.classList.remove('on'),kind==='big'?2800:1700);
 setTimeout(()=>m.classList.remove('jump','dance','sad','spin3d','big'),kind==='big'?2800:1300)}
$('masc').onclick=()=>{if(Math.random()<.75){const m=$('masc'),b=$('bub'),t=LOVETAP[Math.floor(Math.random()*LOVETAP.length)];m.classList.remove('jump');void m.offsetWidth;m.classList.add('jump');b.textContent=t+' 💕';b.classList.add('on');clearTimeout(mbT);mbT=setTimeout(()=>b.classList.remove('on'),2400);setTimeout(()=>m.classList.remove('jump'),1300);speak(t,'dealer');heartRain(12)}else{mascot('idle');const m=$('masc');m.classList.add('spin3d');setTimeout(()=>m.classList.remove('spin3d'),1100);AUDIO.voice(SIG[G.id].v)}};
const SIG={vault:{e:['🪙','✨','🪙','✨'],m:'jump',v:'roar'},toad:{e:['🪙','✨','🪙','✨'],m:'jump',v:'croak'},olympus:{e:['⚡','✨','💎','✨'],m:'burst',v:'aria'},egypt:{e:['🪲','✨','🪙','✨'],m:'swirl',v:'growl'},buffalo:{e:['💨','🪶','🪙','💨'],m:'quake',v:'moo'},lucky:{e:['🍀','7️⃣','💎','🎲','🪙'],m:'burst',v:'squeak'},
 panda:{e:['🥟','🍡','🌸','🥟'],m:'throw',v:'boing'},piggy:{e:['🪙','🪙','💰','🪙'],m:'fountain',v:'oink'},dragon:{e:['🔥','🔥','🧧','✨'],m:'breath',v:'roar'},
 tiger:{e:['🐾','✨','🍌','🐾'],m:'roar',v:'growl'},ocean:{e:['🫧','💎','🐚','🫧'],m:'bubbles',v:'bloop'}};
function sigFX(level){
 if(RM||!G)return;const cfg=SIG[G.id];const r=$('mascE').getBoundingClientRect();const ox=r.left+r.width/2,oy=r.top+r.height/2;
 const br=box.getBoundingClientRect(),bx=br.left+br.width/2,by=br.top+br.height/2;
 const pill=document.querySelector('.screen.on .pill');const pr=pill?pill.getBoundingClientRect():{left:0,top:0,width:0,height:0};const px=pr.left+30,py=pr.top+pr.height/2;
 AUDIO.voice(cfg.v);
 if(cfg.m==='quake'||cfg.m==='roar'||level>1){shake();const rg=document.createElement('div');rg.className='ring';rg.style.left=ox+'px';rg.style.top=oy+'px';document.body.appendChild(rg);rg.animate([{transform:'scale(.3)',opacity:1},{transform:`scale(${level>1?14:8})`,opacity:0}],{duration:700,easing:'ease-out'}).onfinish=()=>rg.remove()}
 const n=level>1?30:12;
 for(let i=0;i<n;i++){
  const d=document.createElement('span');d.className='sp';d.textContent=cfg.e[i%cfg.e.length];d.style.fontSize=(level>1?26:20)+Math.random()*18+'px';document.body.appendChild(d);
  const a=Math.random()*Math.PI*2,R=120+Math.random()*(level>1?260:140);let k;
  const rot=`rotateY(${(Math.random()<.5?-1:1)*720}deg) rotateZ(${Math.random()*360}deg)`;
  if(cfg.m==='throw'||cfg.m==='fountain'){const tx=cfg.m==='throw'?px:ox+(Math.random()-.5)*260,ty=cfg.m==='throw'?py:oy+200;const mx=(ox+tx)/2+(Math.random()-.5)*120,my=Math.min(oy,ty)-120-Math.random()*160;
   k=[{transform:`translate3d(${ox}px,${oy}px,0) scale(.3)`},{transform:`translate3d(${mx}px,${my}px,0) scale(1.3) rotateY(360deg)`,offset:.45},{transform:`translate3d(${tx}px,${ty}px,0) scale(.6) rotateY(720deg)`,opacity:cfg.m==='throw'?1:0}]}
  else if(cfg.m==='breath'){const ang=Math.atan2(by-oy,bx-ox)+(Math.random()-.5)*.5,D=Math.hypot(bx-ox,by-oy)*(.6+Math.random()*.6);
   k=[{transform:`translate3d(${ox}px,${oy-20}px,0) scale(.4)`},{transform:`translate3d(${ox+Math.cos(ang)*D}px,${oy+Math.sin(ang)*D}px,0) scale(${1.6+Math.random()}) ${rot}`,opacity:0}]}
  else if(cfg.m==='bubbles'){const x=ox+(Math.random()-.5)*200;k=[{transform:`translate3d(${ox}px,${oy}px,0) scale(.3)`},{transform:`translate3d(${x+20}px,${oy-180}px,0) scale(1)`,offset:.5},{transform:`translate3d(${x-20}px,${oy-420-Math.random()*200}px,0) scale(1.3)`,opacity:0}]}
  else if(cfg.m==='swirl'){const a2=a+Math.PI;k=[{transform:`translate3d(${ox}px,${oy}px,0) scale(.3)`},{transform:`translate3d(${ox+Math.cos(a)*R*.6}px,${oy+Math.sin(a)*R*.4-80}px,0) scale(1.2) rotateY(360deg)`,offset:.5},{transform:`translate3d(${ox+Math.cos(a2)*R}px,${oy-200-Math.random()*200}px,0) scale(.8) rotateY(720deg)`,opacity:0}]}
  else{k=[{transform:`translate3d(${ox}px,${oy}px,0) scale(.3)`},{transform:`translate3d(${ox+Math.cos(a)*R}px,${oy+Math.sin(a)*R}px,0) scale(1.3) ${rot}`,opacity:0}]}
  const an=d.animate(k,{duration:900+Math.random()*700,delay:i*(level>1?35:50),easing:'cubic-bezier(.2,.7,.4,1)',fill:'both'});an.onfinish=()=>{d.remove();if(cfg.m==='throw')sfx.clink(1,0,.035)};
 }
 if(level>1)giant();
}
function giant(){if(RM||!G)return;const d=document.createElement('div');d.className='giant';d.innerHTML=IMG(CHARS[G.id]);document.body.appendChild(d);
 d.animate([{transform:'scale(0) rotateY(0)',opacity:0},{transform:'scale(1.15) rotateY(540deg)',opacity:1,offset:.35},{transform:'scale(1) rotateY(720deg)',opacity:1,offset:.7},{transform:'scale(.2) translateY(60vh) rotateY(900deg)',opacity:0}],{duration:1900,easing:'cubic-bezier(.3,1.2,.5,1)'}).onfinish=()=>d.remove()}
/* ---------- bonus games ---------- */
const LADT={egypt:{t:'피라미드 오르기',top:'👑',st:'🧱',tok:'🐫'},ocean:{t:'보물 지도',top:'💰',st:'🏝️',tok:'🐙'},tiger:{t:'정글 사다리',top:'🏆',st:'🌿',tok:'🐯'}};
async function ladderBonus(b){
 const T=LADT[G.id]||LADT.egypt,M=[2,4,6,10,15,25,40,70,120,250],P=[.9,.85,.8,.75,.7,.62,.55,.5,.45,.4];
 AUDIO.setIntense(true);sfx.jp();flash();
 await cinematic(0,{big:'CLIMB',line:'LADDER BONUS',sub:`<b>${T.t}</b><br>한 칸씩 올라갈수록 상금이 커져요. 실패하면 상금 절반!<br>꼭대기 ${M[9]}배 · 언제든 멈추고 받을 수 있어요`,btn:'GO'});
 let lv=-1,prize=0,state='go';
 const cell=i=>{const c=i<lv?'done':i===lv?(state==='fail'?'fail':'done cur'):'';return `<div class="${c}"><em>${i===lv?(state==='fail'?'💥':T.tok):i===9?T.top:T.st}</em>x${M[i]}<small>${short(M[i]*b)}</small></div>`};
 const order=[9,8,7,6,5,0,1,2,3,4];
 const render=msg=>{pop.innerHTML=`<div class="card bcard"><h3>${T.t}</h3><div class="lad">${order.map(cell).join('')}</div><div class="prize">${fmt(prize)}</div><p id="lmsg">${msg||''}</p>${state==='go'?`<div class="gbtns"><button class="red" data-c="up">⬆ 올라가기 (${Math.round(P[lv+1]*100)}%)</button><button class="take" data-c="take" style="grid-column:auto">받고 끝내기</button></div>`:''}</div>`;pop.classList.add('on')};
 render(`다음 칸: x${M[0]}`);
 for(;;){
  let ch;if(auto){await sleep(800);ch=(lv<3)?'up':'take'}else ch=await new Promise(res=>{pop.onclick=e=>{const x=e.target.closest('[data-c]');if(x)res(x.dataset.c)}});
  pop.onclick=null;if(ch==='take'&&lv>=0)break;
  pop.querySelectorAll('.gbtns button').forEach(x=>x.disabled=true);sfx.drum(.6);await sleep(650);
  if(Math.random()<P[lv+1]){lv++;prize=M[lv]*b;AUDIO.sfx.step(lv);buzz(30);if(lv>=9){state='top';render('꼭대기 도착!! 🎉');sfx.jp();burst(120);flash();await sleep(1800);break}render(`성공! 다음 칸 x${M[lv+1]}`);if(lv>=4)burst(20)}
  else{state='fail';prize=lv<0?b:Math.floor(prize/2);AUDIO.sfx.fail();shake();buzz(200);render(`앗! 미끄러졌어요… 상금 절반 ${fmt(prize)}`);await sleep(1800);break}
 }
 pop.classList.remove('on');if(!fs)AUDIO.setIntense(false);return prize;
}
const WTIERS=[{n:'브론즈 휠',c:['#cd7f32','#8a4a1a','#e0a060'],s:[5,8,10,'UP',15,20,5,10,'UP',25,8,15]},{n:'실버 휠',c:['#c0c8d8','#6a7a9a','#e8eef8'],s:[20,30,'UP',50,25,40,'UP',75,30,60,'UP',100]},{n:'골드 휠',c:['#ffd34d','#c8840f','#fff3b0'],s:[100,150,200,300,500,'GRAND',100,250,150,200,300,120]}];
async function wheelUp(b,sub){
 AUDIO.setIntense(true);sfx.jp();flash();
 await cinematic(0,{big:'WHEEL',line:'UPGRADE BONUS',sub:`${sub||'보너스 휠!'}<br>UP이 나오면 더 큰 휠로 업그레이드 — 골드 휠 최대 GRAND`,btn:'SPIN'});
 let v=0;
 for(let t=0;t<3;t++){
  const W=WTIERS[t],i=Math.floor(Math.random()*W.s.length),r=W.s[i];
  const segs=W.s.map((x,k)=>[x,1,x==='UP'?'#ff2a8a':x==='GRAND'?'#111':W.c[k%3]]);
  await spinWheel(`${W.n}${t?' ⬆':''}`,segs,i,x=>x==='UP'?'⬆UP':x==='GRAND'?'GRAND':x+'x');
  if(r==='UP'){$('wres').innerHTML='<b style="font-size:28px;color:#ff8ad0">⬆ 휠 업그레이드!</b>';sfx.fan();flash();burst(40);await sleep(1500);continue}
  if(r==='GRAND'){v=G.jp?jpVal('GRAND',b):1000*b;if(G.jp)pool().GRAND=0;$('wres').innerHTML='<b style="font-size:30px;color:#ff5252">GRAND!!!</b>';await sleep(1200);pop.classList.remove('on');await jackpot('GRAND',v)}
  else{v=r*b;$('wres').innerHTML=`<b style="font-size:28px;color:#ffd34d">${r}배 = ${fmt(v)}</b>`;sfx.jp();burst(60);await sleep(1600)}
  break;
 }
 pop.classList.remove('on');if(!fs)AUDIO.setIntense(false);return v;
}
const MS=['🍒','🔔','💎','7️⃣','👑'],MSW=[5,4,3,2,1],MP3=[10,20,40,80,200],MP2=[1,2,3,5,10];
async function miniSlot(b){
 const T=G.id==='piggy'?'꿀꿀 미니 슬롯':'딤섬 미니 슬롯';
 AUDIO.setIntense(true);sfx.jp();flash();
 await cinematic(7,{line:'MINI SLOT SPINS',sub:`<b>${T}</b><br>슬롯 속 슬롯! 무료 7회 · 같은 그림 3개면 최대 200배`});
 let total=0,left=7;
 const msp=()=>MS[wpick(MSW.map((w,i)=>[i,w]))];
 pop.innerHTML=`<div class="card bcard"><h3>${T}</h3><div class="mslot">${[0,1,2].map(i=>`<div class="mreel"><div class="ms" id="ms${i}"><span>${msp()}</span></div></div>`).join('')}</div><div class="prize" id="mtot">0</div><p id="mleft">남은 스핀 ${left}</p><div class="mpay">${MS.map((s,i)=>`<span>${s}${s}${s} ${MP3[i]}배</span>`).join('')}<span>아무거나 2개 1~10배</span></div></div>`;pop.classList.add('on');pop.onclick=null;
 const H=()=>$('ms0').parentElement.clientHeight;
 while(left>0){
  left--;$('mleft').textContent=`남은 스핀 ${left}`;await sleep(350);
  const res=[0,1,2].map(()=>wpick(MSW.map((w,i)=>[i,w])));
  sfx.start();
  await Promise.all(res.map((r,i)=>new Promise(ok=>{const el=$('ms'+i),h=H(),n=14+i*6;el.style.transition='none';el.style.transform='translateY(0)';el.innerHTML=`<span>${el.lastElementChild?el.lastElementChild.textContent:msp()}</span>`+Array.from({length:n},()=>`<span>${msp()}</span>`).join('')+`<span>${MS[r]}</span>`;el.offsetHeight;el.style.transition=`transform ${T_(700,350)+i*T_(350,150)}ms cubic-bezier(.3,.1,.2,1.06)`;el.style.transform=`translateY(${-(n+1)*h}px)`;setTimeout(()=>{sfx.stop(i);ok()},T_(700,350)+i*T_(350,150))})));
  let pay=0;if(res[0]===res[1]&&res[1]===res[2])pay=MP3[res[0]];else{const c={};res.forEach(r=>c[r]=(c[r]||0)+1);for(const k in c)if(c[k]===2)pay=MP2[k]}
  if(pay){const v=pay*b;total+=v;$('mtot').textContent=fmt(total);toast(`+${short(v)}`,800);if(pay>=10){sfx.fan();burst(50);flash()}else sfx.chaching();buzz(40)}
  await sleep(T_(700,350));
 }
 $('mleft').innerHTML=`<b style="font-size:22px;color:#ffd34d">총 ${fmt(total)}</b>`;await sleep(1500);
 pop.classList.remove('on');if(!fs)AUDIO.setIntense(false);return total;
}
const T_=(a,b)=>S.turbo?b:a;
async function heartBonus(b){
 const L=window.LOVE||{};const notes=L.notes&&L.notes.length?L.notes:['사랑해 💕'];
 await cinematic(0,{big:'LOVE',line:'HEART BONUS',sub:`${L.her||'소현'}만을 위한 하트 보너스 💕`,heart:1});
 AUDIO.sfx.heart();heartRain(50);
 for(let i=0;i<3;i++){const d=document.createElement('div');d.className='giant';d.textContent='💖';d.style.fontSize='min(30vw,30vh)';d.style.left=(30+i*20)+'%';document.body.appendChild(d);d.animate([{transform:'translateY(-80vh) scale(.5) rotateY(0)'},{transform:'translateY(0) scale(1.1) rotateY(360deg)',offset:.6},{transform:'translateY(0) scale(1) rotateY(720deg)',opacity:1,offset:.85},{transform:'scale(0)',opacity:0}],{duration:1800,delay:i*200,easing:'cubic-bezier(.3,1.3,.5,1)'}).onfinish=()=>d.remove()}
 await sleep(1700);
 const mult=[10,15,20,30,50,77][wpick([[0,30],[1,25],[2,20],[3,13],[4,8],[5,4]])],v=mult*b;
 await popup(`<div class="hb" style="font-size:56px;font-family:${GAMES.EF}">💖💖💖</div><h3>${L.her||'소현'} 하트 보너스!</h3><div class="note">"${notes[Math.floor(Math.random()*notes.length)]}"</div><div class="prize">+${fmt(v)}</div><div class="sig" style="color:#fff">- ${L.owner||'태율랜드 주인장'} -</div><button class="go">고마워 자기야 💕</button>`,{cls:'hcard',autoMs:auto?3000:0});
 return v;
}
/* ---------- admin ---------- */
const FORCE={fs:['프리스핀',o=>o.fsAward>0],big:['빅윈',o=>o.total>=15&&!o.fsAward],hs:['홀드앤스핀',o=>!!o.hs],grand:['GRAND 잭팟',o=>o.hs&&o.hs.full],wheel:['보너스 휠',o=>!!o.wheel],mega:['휠 MEGA 500배',o=>o.wheel&&o.wheel.v>=500],collect:['돼지 수집',o=>o.collect&&o.collect.amt>=5],jpw:['잭팟 휠',o=>!!o.jpw],jgrand:['휠 GRAND',o=>o.jpw&&o.jpw.tier==='GRAND'],pick:['진주 잭팟',o=>!!o.pick],pgrand:['진주 GRAND',o=>o.pick&&o.pick.tier==='GRAND'],mystery:['미스터리 보너스',null],bonus:['보너스 게임',null],heart:['소현 하트 💖',null]};
const GF={vault:['fs','big'],toad:['fs','big'],olympus:['fs','big'],egypt:['fs','hs','grand','big'],buffalo:['fs','big'],lucky:['wheel','mega','big'],panda:['fs','big'],piggy:['fs','collect','big'],dragon:['fs','hs','grand','big'],tiger:['fs','jpw','jgrand','big'],ocean:['fs','pick','pgrand','big']};
let force=null;
const featured=o=>o.fsAward||o.hs||o.wheel||o.jpw||o.pick||(o.collect&&o.collect.amt>=3)||o.total>=10;
const BM={vault:'wheelup',toad:'wheelup',olympus:'wheelup',egypt:'ladder',ocean:'ladder',tiger:'ladder',buffalo:'wheelup',dragon:'wheelup',panda:'mini',piggy:'mini'};
function rollOutcome(){const o=rollBase();const L=Math.min(5,Math.max(1,S.luck||1));
 if(BM[G.id]&&!o.bonus&&Math.random()<L/300)o.bonus=BM[G.id];
 if(!o.heart&&Math.random()<L/500)o.heart=true;
 return o}
function rollBase(){
 if(G.custom&&force==='fs'){force=null;if(G.forceFS){G.forceFS();return G.spin(false)}const o=G.spin(false);o.fsAward=G.fsN||10;return o}
 if(force==='bonus'||force==='heart'){const k=force;force=null;const o=G.spin(false);if(k==='bonus')o.bonus=BM[G.id]||'wheelup';else o.heart=true;return o}
 if(force&&FORCE[force][1]){const k=force,f=FORCE[k][1];force=null;if(k!=='grand')for(let i=0;i<60000;i++){const o=G.spin(false);if(f(o))return o}
  if(k==='grand'){for(let i=0;i<60000;i++){const o=G.spin(false);if(o.hs){const add=[];o.hs.board.forEach((x,j)=>{if(!x){o.hs.board[j]={s:'C',v:1};add.push([j,o.hs.board[j]])}});const st=o.hs.steps;if(st.length&&!st[st.length-1].length)st[st.length-1]=add;else st.push(add);o.hs.full=true;return o}}}}
 const L=S.luck||1;let o=G.spin(false);
 if(L>1){const extra=Math.round((L-1)*1.0);for(let i=0;i<extra&&!featured(o);i++)if(Math.random()<Math.min(1,L-1-i))o=G.spin(false)}
 else if(L<1&&(featured(o)||o.total>0)&&Math.random()<1-L)o=G.spin(false);
 return o;
}
function admin(){
 const g=document.body.dataset.g,inGame=g!=='lobby'&&G;
 const fb=inGame?[...GF[G.id],'mystery',...(BM[G.id]?['bonus']:[]),'heart'].map(k=>`<button class="sm" data-f="${k}" style="min-height:40px">${k==='bonus'?({ladder:'사다리 보너스',wheelup:'업그레이드 휠',mini:'미니 슬롯'})[BM[G.id]]:FORCE[k][0]}</button>`).join(''):'<p>게임에 들어간 뒤 열면 다음 스핀 강제를 쓸 수 있어요</p>';
 pop.innerHTML=`<div class="card" style="text-align:left"><h3 style="text-align:center">관리자 모드</h3>
 <p><b>코인</b> 현재 ${fmt(S.bal)}</p><div style="display:flex;gap:6px"><input id="adC" inputmode="numeric" placeholder="금액" style="flex:1;font-size:16px;border-radius:10px;border:0;padding:10px"><button class="sm" data-a="set">설정</button></div>
 <div class="btns" style="margin-top:6px"><button class="sm" data-a="p1">+100만</button><button class="sm" data-a="p10">+1000만</button><button class="sm" data-a="zero">0으로</button></div>
 <p style="margin-top:12px"><b>행운 배율</b> <span id="adLv">x${S.luck||1}</span> — 보너스·빅윈 나오는 빈도</p><input id="adL" type="range" min="0.5" max="20" step="0.5" value="${S.luck||1}" style="width:100%">
 <p style="margin-top:12px"><b>다음 스핀 강제</b>${force?` (예약: ${FORCE[force][0]})`:''}</p><div class="btns" style="grid-template-columns:repeat(2,minmax(0,1fr))">${fb}</div>
 <p style="margin-top:12px"><b>기타</b></p><div class="btns" style="grid-template-columns:repeat(2,minmax(0,1fr))"><button class="sm" data-a="cool">충전·휠 쿨타임 초기화</button><button class="sm" data-a="lvl">레벨 +1</button><button class="sm" data-a="pin">PIN 변경</button><button class="sm" data-a="reset" style="background:#a3091f">전체 초기화</button></div>
 <button class="go" style="display:block;margin:14px auto 0">닫기</button></div>`;
 pop.classList.add('on');
 let resetArm=0;
 pop.onclick=e=>{
  if(e.target.closest('.go')||!e.target.closest('.card')){pop.classList.remove('on');pop.onclick=null;return}
  const f=e.target.closest('[data-f]'),a=e.target.closest('[data-a]');
  if(f){const k=f.dataset.f;if(k==='mystery')window.__mystery=1;else force=k;sfx.lvl();toast(FORCE[k][0]+' 예약!',1000);pop.classList.remove('on');pop.onclick=null;return}
  if(!a)return;const t=a.dataset.a;
  if(t==='set'){const v=parseInt(($('adC').value||'').replace(/[^0-9]/g,''));if(v>=0){S.bal=v}}
  if(t==='p1')S.bal+=1e6;if(t==='p10')S.bal+=1e7;if(t==='zero')S.bal=0;
  if(t==='cool'){S.chargeAt=0;S.wheelAt=0;renderCharge();renderLW()}
  if(t==='lvl'){S.lvl++;renderLvl()}
  if(t==='pin'){const v=($('adC').value||'').trim();if(/^\d{4,8}$/.test(v)){S.pin=v;toast('PIN 변경: '+v,1400)}else toast('금액 칸에 숫자 4~8자리 입력 후 누르세요',1800);save();return}
  if(t==='reset'){if(!resetArm){resetArm=1;a.textContent='한 번 더 누르면 초기화';return}const pin=S.pin;S=fresh();S.pin=pin;save();location.reload();return}
  sfx.click();renderBal(true);save();admin();
 };
 pop.querySelector('#adL').oninput=e=>{S.luck=+e.target.value;$('adLv').textContent='x'+S.luck;save()};
}
function askPin(){
 pop.innerHTML=`<div class="card"><h3>관리자</h3><p>PIN 입력</p><input id="pinI" type="password" inputmode="numeric" style="font-size:22px;text-align:center;width:60%;border-radius:10px;border:0;padding:10px;letter-spacing:6px"><br><button class="go">확인</button></div>`;
 pop.classList.add('on');setTimeout(()=>$('pinI')?.focus(),50);
 const ok=()=>{if($('pinI').value===(S.pin||'7777')){sfx.lvl();admin()}else{sfx.lose();pop.classList.remove('on');pop.onclick=null}};
 pop.onclick=e=>{if(e.target.closest('.go'))ok();else if(!e.target.closest('.card')){pop.classList.remove('on');pop.onclick=null}};
 $('pinI').onkeydown=e=>{if(e.key==='Enter')ok()};
}
let tapN=0,tapT=0;
const secret=()=>{if(busy)return;tapN=(Date.now()-tapT<600)?tapN+1:1;tapT=Date.now();if(tapN>=5){tapN=0;askPin()}};
document.querySelector('.logo').addEventListener('click',secret);
$('gtitle').addEventListener('click',secret);$('mtitle').addEventListener('click',secret);
document.addEventListener('click',e=>{if(e.target.closest('#game .pgr:not(.r),#game .tjp,#game .vplq'))secret()});
/* ---------- controls ---------- */
const sp=$('spin');let holdT=0,held=false;
sp.addEventListener('pointerdown',()=>{held=false;holdT=setTimeout(()=>{held=true;if(!auto){auto=true;renderBtns();toast('AUTO SPIN',900);if(!busy)spin()}},650)});
['pointerup','pointerleave','pointercancel'].forEach(ev=>sp.addEventListener(ev,()=>clearTimeout(holdT)));
sp.addEventListener('click',()=>{if(held){held=false;return}if(auto&&!reelsMoving){auto=false;renderBtns();toast('AUTO 정지',800);return}spin()});
$('lever').onclick=()=>spin();
$('buy').onclick=()=>{sfx.click();buyFS()};
$('auto').onclick=()=>{auto=!auto;renderBtns();sfx.click();if(auto&&!busy)spin()};
$('turbo').onclick=()=>{S.turbo=!S.turbo;renderBtns();sfx.click();save()};
$$('.bgmB').forEach(b=>b.onclick=()=>{S.bgm=!S.bgm;AUDIO.init();AUDIO.set('bgm',S.bgm);renderBtns();save()});
$$('.sfxB').forEach(b=>b.onclick=()=>{S.sfx=!S.sfx;AUDIO.set('sfx',S.sfx);renderBtns();save();sfx.click()});
const chBet=d=>{if(busy||fs)return;S.bi=Math.max(0,Math.min(BETS.length-1,S.bi+d));sfx.click();renderBet();drawStatic();save()};
$('bm').onclick=()=>chBet(-1);$('bp').onclick=()=>chBet(1);
$('max').onclick=()=>{if(busy||fs)return;let i=BETS.length-1;while(i>0&&BETS[i]>S.bal)i--;S.bi=i;sfx.click();renderBet();drawStatic();save();toast('MAX BET '+short(bet()),900)};
$('lvlBtn').onclick=()=>{sfx.click();toast(`다음 레벨까지 ${short(need()-S.xp)}`,1200)};
$('charge').onclick=()=>{if($('charge').disabled)return;S.bal+=CHARGE_AMT;S.chargeAt=Date.now()+CHARGE_MS;sfx.lvl();burst(50);renderBal(true);renderCharge();save();toast('+'+short(CHARGE_AMT)+' 충전!')};
$('info').onclick=()=>{if(busy)return;const b=bet(),pt=G.paytable;let rows='';
 if(pt.pay){const u=pt.unit;rows=pt.order.map(k=>`<div>${IMG(G.ART[k])}<span>${[5,4,3].filter(n=>pt.pay[k][n]).map(n=>`${n} - ${short(pt.pay[k][n]*b/u)}`).join('<br>')}</span></div>`).join('')}
 if(pt.tumble){rows=pt.order.map(k=>`<div>${IMG(G.ART[k])}<span>12+ ${short(pt.tumble[k][2]*b)}<br>10-11 ${short(pt.tumble[k][1]*b)}<br>8-9 ${short(pt.tumble[k][0]*b)}</span></div>`).join('')}
 if(pt.classicPay){const cp=pt.classicPay,k=.34/5;rows=[['r7','r7'],['b7','b7'],['b3','b3'],['b2','b2'],['b1','b1'],['ch','ch']].map(([a,s])=>`<div>${IMG(G.ART[a])}<span>x3 - ${short(cp[s]*b*k)}</span></div>`).join('')+`<div>${IMG(G.ART.b1)}<span>아무 BAR x3<br>${short(cp.ab*b*k)}</span></div><div>${IMG(G.draw({s:'W',m:5}))}<span>WILD x3<br>${short(cp.W*b*k)} × 배수</span></div>`}
 popup(`<h3>${G.name}</h3><p>현재 베팅 ${short(b)} 기준${pt.ways?' · 243 WAYS (웨이당)':''}</p><div class="ptable">${rows}</div><ul class="rules">${pt.rules.map(r=>`<li>${r}</li>`).join('')}</ul><button class="go">닫기</button>`)};
addEventListener('keydown',e=>{if(e.code==='Space'&&document.body.dataset.g!=='lobby'){e.preventDefault();if(pop.classList.contains('on'))pop.querySelector('.go')?.click();else spin()}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){auto=false;renderBtns()}});
addEventListener('resize',()=>{if(G&&!busy&&document.body.dataset.g!=='lobby'){size();drawStatic()}});

renderBal(false);renderLvl();renderBtns();renderCharge();renderJP();renderLW();

/* ---------- 커스텀 게임용 API ---------- */
const API={praise,U,IMG,AUDIO,sleep,T,speak,announce,popup,cinematic,jpVal,pool,shake,heartRain,showerOn:on=>shower(on),get auto(){return auto},buySpin:cost=>{S.bal-=cost;renderBal(true);S.xp+=cost;buying=true;sfx.chaching();save();spin()},get S(){return S},save,toast,flash,burst,fmt,short,bet,buyFS,box,banner,renderBal,
 get C(){return C},get free(){return !!fs},get fs(){return fs},get busy(){return busy},get reels(){return reels},spin:()=>spin(),sfx:(k,...a)=>AUDIO.sfx[k]&&AUDIO.sfx[k](...a),LAND};
window.TL_API=API;
/* ---------- 주인장 리모컨 (원격 선물·설정) ---------- */
const RAPI='https://api.github.com/repos/tony410234-rgb/lucky-palace/contents/remote.json';
let rBusy=false;
async function remoteFetch(){
 try{const r=await fetch(RAPI+'?t='+Date.now(),{cache:'no-store',headers:{Accept:'application/vnd.github.raw+json'}});if(r.ok)return await r.json()}catch(e){}
 try{const r=await fetch('remote.json?t='+Date.now(),{cache:'no-store'});if(r.ok)return await r.json()}catch(e){}
 return null}
async function remoteCheck(){
 if(rBusy||document.hidden)return;
 if(busy||fs||pop.classList.contains('on')){clearTimeout(remoteCheck.t);remoteCheck.t=setTimeout(remoteCheck,5000);return}
 rBusy=true;
 try{
  const d=await remoteFetch();if(!d||!Array.isArray(d.items))return;
  S.rseen=S.rseen||[];
  if(!S.rinit){S.rinit=1;/* 처음 설치 시: 예전 설정·예약은 건너뛰고 선물·메시지만 받기 */d.items.forEach(it=>{if(it.t!=='coins'&&it.t!=='msg')S.rseen.push(it.id)});save()}
  for(const it of d.items){
   if(!it||!it.id||S.rseen.includes(it.id))continue;
   if(busy||fs||pop.classList.contains('on')){remoteCheck.t=setTimeout(remoteCheck,5000);break}
   S.rseen.push(it.id);if(S.rseen.length>300)S.rseen=S.rseen.slice(-300);save();
   await remoteApply(it);
  }
 }finally{rBusy=false}
}
async function remoteApply(it){
 const L=window.LOVE||{},own=L.owner||'태율랜드 주인장';
 const esc=t=>String(t||'').replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'})[c]);
 if(it.t==='coins'){const a=Math.max(0,Math.min(1e9,+it.amt||0));if(!a)return;
  sfx.jp();flash();heartRain(30);
  await popup(`<div class="hb">🎁</div><h3>주인장의 선물이 도착했어요!</h3>${it.msg?`<div class="note">"${esc(it.msg)}"</div>`:''}<div class="prize">+${fmt(a)}</div><div class="sig" style="color:#fff">- ${own} -</div><button class="go">고마워 자기야 💕</button>`,{cls:'hcard'});
  S.bal+=a;save();renderBal(true);try{shower(true);sfx.pile();setTimeout(()=>shower(false),2600)}catch(e){}
 }else if(it.t==='msg'){AUDIO.sfx.heart();heartRain(36);
  await popup(`<div class="hb">💌</div><h3>주인장의 편지</h3><div class="note">"${esc(it.msg)}"</div><div class="sig" style="color:#fff">- ${own} -</div><button class="go">나도 사랑해 💕</button>`,{cls:'hcard'});
 }else if(it.t==='luck'){S.luck=Math.max(.5,Math.min(20,+it.val||1));save();
 }else if(it.t==='setbal'){S.bal=Math.max(0,Math.min(1e12,+it.val||0));save();renderBal(true);
  if(it.msg)await popup(`<div class="hb">💰</div><h3>잔액이 새로 설정됐어요</h3><div class="note">"${esc(it.msg)}"</div><div class="prize">${fmt(S.bal)}</div><button class="go">확인</button>`,{cls:'hcard'});
 }else if(it.t==='force'){if(it.val==='respin'){const P=GAMES.byId.panda;if(P)P.forceTrig=['L','U','P']}else if(it.val==='vault'){const V=GAMES.byId.vault;if(V)V.forceBurst=['g','p','r'][Math.floor(Math.random()*3)]}else if(FORCE[it.val])force=it.val;
 }
}
setTimeout(remoteCheck,4000);setInterval(remoteCheck,90000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(remoteCheck,1200)});
/* ---------- 태율랜드 ---------- */
function heartRain(n=40){n=Math.min(n,innerWidth*innerHeight>600000?40:26);const d=document.createElement('div');d.className='hrain';const HK=['❤️','💕','💖','🥰','💗'];d.innerHTML=Array.from({length:n},()=>{const k=HK[Math.floor(Math.random()*5)],z=16+Math.random()*26;return `<span style="left:${Math.random()*96}vw;font-size:${z}px;animation-duration:${3+Math.random()*4}s;animation-delay:${Math.random()*2.5}s">${ICONS[k]?`<img class="ei" alt="" src="${IURL(k)}">`:k}</span>`}).join('');document.body.appendChild(d);setTimeout(()=>d.remove(),9000)}
function loveCard(){const L=window.LOVE||{};const notes=L.notes&&L.notes.length?L.notes:['사랑해 💕'];const day=Math.floor((Date.now()+9*3600e3)/864e5);$('note').textContent=notes[day%notes.length];
 if(L.since){const d=Math.floor((Date.now()-new Date(L.since+'T00:00:00+09:00'))/864e5)+1;$('dday').textContent=d>0?`우리 D+${d}`:''}
 if(L.her)$('vip').textContent=`VIP ${L.her}님 전용 카지노`}
loveCard();
(()=>{const v=document.createElement('div');v.id='ver';v.textContent='v4.3'+(location.protocol==='file:'?' · 오프라인':'');v.style.cssText='position:fixed;left:6px;bottom:4px;font:11px sans-serif;color:#fff8;z-index:5;pointer-events:none';document.body.appendChild(v);const f=()=>v.style.display=document.body.dataset.g==='lobby'?'':'none';new MutationObserver(f).observe(document.body,{attributes:true,attributeFilter:['data-g']});f()})();
(async()=>{const L=window.LOVE||{};heartRain(46);
 await popup(`<div class="hb">💝</div><h3>${(L.welcome||'웰컴 자기야 오늘도 사랑해🥰')}</h3><div class="sig">- ${L.owner||'태율랜드 주인장'} -</div><button class="go">나도 사랑해 💕</button>`,{cls:'wel'});
 AUDIO.init();[784,988,1175,1568].forEach((f,i)=>AUDIO.tone(f,.3,i*.12,'sine',.08));heartRain(24);})();
AUDIO.play('lobby');
}
