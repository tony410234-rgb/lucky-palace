{
const $=id=>document.getElementById(id);
const $$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const fmt=n=>Math.round(n).toLocaleString('en-US');
const short=GAMES.short,coinSVG=GAMES.coinSVG,sfx=AUDIO.sfx;
const BETS=[100,200,500,1000,2000,5000,10000,20000,50000,100000];
const HER=(window.LOVE&&LOVE.her)||'소현';
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;

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
function renderJP(){const b=fs?fs.bet:bet();if(G&&G.jp)$$('.plq').forEach(p=>p.querySelector('.num').textContent=fmt(jpVal(p.dataset.t,b)));const mx=Math.max(0,...GAMES.list.filter(g=>g.jp).map(g=>pool(g.id).GRAND));$('tick').textContent=fmt(JPSEED.GRAND*1e4+mx)}
function renderBtns(){$('auto').classList.toggle('on',auto);$('turbo').classList.toggle('on',S.turbo);$$('.bgmB').forEach(e=>e.classList.toggle('off',!S.bgm));$$('.sfxB').forEach(e=>{e.classList.toggle('off',!S.sfx);e.textContent=S.sfx?'🔊':'🔇'});$('spin').classList.toggle('auto',auto)}
function setWin(v,l='WIN'){$('win').textContent=fmt(v);$('winlbl').textContent=l}
function countWin(from,to,d){return new Promise(res=>{const t0=performance.now();let lc=0;const st=t=>{const k=Math.min(1,(t-t0)/d);if(t-lc>70){lc=t;sfx.clink(1,0,.03)}$('win').textContent=fmt(from+(to-from)*k);if(k<1)requestAnimationFrame(st);else res()};requestAnimationFrame(st)})}
const CHARGE_MS=180000,CHARGE_AMT=50000;
function renderCharge(){const left=S.chargeAt-Date.now(),ready=left<=0||S.bal<BETS[0];$('charge').disabled=!ready;$('chargeT').textContent=ready?'+'+short(CHARGE_AMT):`${Math.floor(left/60000)}:${String(Math.floor(left/1000)%60).padStart(2,'0')}`}
setInterval(()=>{renderCharge();if(!busy){GAMES.list.filter(g=>g.jp).forEach(g=>{const p=pool(g.id);for(const t in p)p[t]+=1e3*({GRAND:.06,MAJOR:.03,MINOR:.01,MINI:.005})[t]});renderJP()}},1000);

const pop=$('pop');
function popup(html,{autoMs=0,cls=''}={}){
 return new Promise(res=>{
  pop.innerHTML=`<div class="card ${cls}">${html}</div>`;pop.classList.add('on');
  let done=false;const close=()=>{if(done)return;done=true;pop.classList.remove('on');pop.onclick=null;res()};
  pop.onclick=e=>{if(!e.target.closest('.card')||e.target.closest('.go'))close()};
  if(autoMs)setTimeout(close,autoMs);
 });
}
function toast(t,ms=1400){const el=$('toast');el.textContent=t;el.classList.remove('on');el.offsetHeight;el.classList.add('on');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),ms)}
const TIERS=[[10,'BIG WIN'],[25,'MEGA WIN'],[50,'SUPER WIN'],[100,'EPIC WIN'],[300,'LEGENDARY']];
function bigWin(amount,b){
 return new Promise(res=>{
  const tiers=TIERS.filter(t=>amount/b>=t[0]);
  const d=(1600+tiers.length*1500)*(S.turbo?.6:1);
  pop.innerHTML=`<div class="card bw"><h3 id="bwT">${tiers[0][1]}</h3><div class="num" id="bwN">0</div><p style="font-size:18px;color:#ffd0ea">${['소현이 대박! 💕','역시 소현이 💖','소현 부자 됐다 🥰','오늘의 승자 소현 👑'][Math.floor(Math.random()*4)].replace(/소현/g,HER)}</p><p>화면을 누르면 건너뛰기</p></div>`;pop.classList.add('on');
  shower(true);sfx.fan();sfx.pile();flash();shake();buzz([60,40,60,40,200]);AUDIO.duck(true);const ci=setInterval(()=>sfx.clink(2,.08,.03),85);
  let skip=false,ti=0,t0=performance.now(),last=0,fin=false,closed=false;
  const close=()=>{if(closed)return;closed=true;clearInterval(ci);pop.classList.remove('on');pop.onclick=null;shower(false);AUDIO.duck(false);sfx.chaching();flyCoins(40,[innerWidth/2,innerHeight*.45]);res()};
  pop.onclick=()=>{if(fin)close();else skip=true};
  const step=t=>{
   const k=skip?1:Math.min(1,(t-t0)/d);const v=k<1?amount*k*k*(3-2*k):amount;
   $('bwN').textContent=fmt(v);
   while(ti+1<tiers.length&&v>=tiers[ti+1][0]*b){ti++;const h=$('bwT');h.textContent=tiers[ti][1];h.classList.remove('up');h.offsetHeight;h.classList.add('up');sfx.fan();sfx.pile();flash();shake();buzz(120);burst(80)}
   if(t-last>70){last=t;sfx.tick(k)}
   if(k<1)requestAnimationFrame(step);else{fin=true;setTimeout(close,S.turbo?1200:2200)}
  };requestAnimationFrame(step);
 });
}
/* coin fx */
const cv=$('fx'),cx=cv.getContext('2d');let parts=[],raf=0,showerOn=false;
const fit=()=>{const r=devicePixelRatio||1;cv.width=innerWidth*r;cv.height=innerHeight*r;cx.setTransform(r,0,0,r,0,0)};fit();addEventListener('resize',fit);
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
 for(let i=0;i<n;i++){const d=document.createElement('div');d.className='fc';d.innerHTML=COINM;const sx=x+(Math.random()-.5)*90,sy=y+(Math.random()-.5)*60;d.style.transform=`translate(${sx}px,${sy}px) scale(0)`;document.body.appendChild(d);
  const mx=(sx+tx)/2+(Math.random()-.5)*180,my=Math.min(sy,ty)-40-Math.random()*140;
  const a=d.animate([{transform:`translate(${sx}px,${sy}px) scale(.2)`},{transform:`translate(${sx+(Math.random()-.5)*70}px,${sy-36}px) scale(1.25)`,offset:.18},{transform:`translate(${mx}px,${my}px) scale(1)`,offset:.6},{transform:`translate(${tx}px,${ty}px) scale(.55)`}],{duration:780+Math.random()*260,delay:i*40,easing:'ease-in',fill:'forwards'});
  a.onfinish=()=>{d.remove();sfx.clink(1,0,.04);pill.classList.remove('bump');void pill.offsetWidth;pill.classList.add('bump')}}
}
function celebrate(win,b,pt=winPoint()){const x=win/b;floatText('+'+fmt(win),pt);sfx.chaching();flyCoins(Math.min(40,Math.round(5+x*2)),pt);const st=document.querySelector('.stage');st.classList.remove('win');void st.offsetWidth;st.classList.add('win');setTimeout(()=>st.classList.remove('win'),2000);if(x>=3){burst(20);flash()}buzz(x>=3?[30,30,60]:30)}
const wpick=ws=>{let t=0;for(const w of ws)t+=w[1];let r=Math.random()*t;for(const w of ws){if((r-=w[1])<0)return w[0]}return ws[0][0]};
function loop(){if(!raf)raf=requestAnimationFrame(frame)}
function frame(){
 cx.clearRect(0,0,innerWidth,innerHeight);
 if(showerOn)for(let i=0;i<3;i++)addCoin(Math.random()*innerWidth,-20,(Math.random()-.5)*2,Math.random()*3+2);
 parts=parts.filter(p=>p.y<innerHeight+40&&p.life<400);
 for(const p of parts){p.life++;p.vy+=.32;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;const w=Math.abs(Math.cos(p.a))*p.s+1;
  const g=cx.createRadialGradient(p.x-w*.3,p.y-p.s*.3,1,p.x,p.y,p.s);g.addColorStop(0,'#fffbe0');g.addColorStop(.4,'#ffd34d');g.addColorStop(1,'#a8620a');
  cx.fillStyle=g;cx.beginPath();cx.ellipse(p.x,p.y,w,p.s,0,0,7);cx.fill();cx.strokeStyle='#6e3f03';cx.lineWidth=1.2;cx.stroke()}
 raf=(parts.length||showerOn)?requestAnimationFrame(frame):0;
}

/* ---------- lobby ---------- */
$('cards').innerHTML=GAMES.list.map(g=>`<button class="gcard c-${g.id}" data-id="${g.id}"><span class="rays"></span><span class="bdg">${g.badge}</span><span class="hero">${g.hero}</span><b class="en" style="font-family:${g.font}">${g.en}</b><span class="kn">${g.name}</span><small>${g.sub}</small></button>`).join('');
$('cards').onclick=e=>{const c=e.target.closest('.gcard');if(c){sfx.click();openGame(c.dataset.id)}};
function showScreen(id){$$('.screen').forEach(s=>s.classList.toggle('on',s.id===id));scrollTo(0,0)}

/* ---------- game screen ---------- */
const box=$('box');let reels=[],strips=[],tcols=[],tEls=[],C=70;
function openGame(id){
 G=GAMES.byId[id];document.body.dataset.g=id;
 $('gtt').textContent=G.en;$('ge1').textContent=$('ge2').textContent=G.hero;
 document.body.classList.toggle('jpon',!!G.jp);document.body.dataset.rows=G.rows;
 const dc=DECOR.get(id);$('scene').innerHTML=DECOR.scene(id);$('mascE').textContent=dc.m;$('propL').innerHTML=dc.pl.map(e=>`<span>${e}</span>`).join('');$('propR').innerHTML=dc.pr.map(e=>`<span>${e}</span>`).join('');$('ornL').textContent=dc.orn[0];$('ornR').textContent=dc.orn[1];
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
 showScreen('game');size();drawStatic();renderBet();setWin(0);
 AUDIO.play(id);
}
$('back').onclick=()=>{if(busy||fs){toast('진행 중이에요',900);return}auto=false;renderBtns();sfx.click();document.body.dataset.g='lobby';document.body.classList.remove('jpon');$('scene').innerHTML='';showScreen('lobby');AUDIO.play('lobby')};
function size(){
 if(!G)return;const w=(G.mode==='tumble'?tcols[0]:reels[0])?.clientWidth||60;
 const maxH=Math.max(200,innerHeight*.47);
 C=Math.round(Math.min(w*(G.classic?.95:1.02),maxH/G.rows));
 document.documentElement.style.setProperty('--c',C+'px');
}
const cellHTML=(x,b=bet())=>`<div class="cell">${G.draw(x,b)}</div>`;
function drawStatic(){
 if(G.mode==='tumble'){tEls=tcols.map((col,c)=>{col.innerHTML='';return cur[c].map((x,r)=>mkTc(col,x,r*C))});return}
 strips.forEach((s,c)=>{s.style.transition='none';s.style.transform='translateY(0)';s.innerHTML=cur[c].map(x=>cellHTML(x,x.b)).join('')});
}
function mkTc(col,x,y){const d=document.createElement('div');d.className='tc';d.innerHTML=G.draw(x,x.b||bet());d.style.transform=`translateY(${y}px)`;col.appendChild(d);return d}
const ro=new ResizeObserver(()=>{if(!G||document.body.dataset.g==='lobby')return;const old=C;size();if(!busy&&!reelsMoving)drawStatic();else if(old!==C&&G.mode==='tumble'){}});ro.observe(box);
function renderBet(){$('bet').textContent=short(fs?fs.bet:bet());renderJP()}

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
 rs.forEach((st,i)=>{if(!st||st.done)return;clearTimeout(st.t);clearTimeout(st.blur);
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
 const hsEl=$('hs'),bar=$('hsbar');
 AUDIO.setIntense(true);
 await popup(`<h3>HOLD &amp; SPIN</h3><p>코인 ${hs.init.filter(Boolean).length}개 고정! 리스핀 3회, 새 코인이 나오면 3회로 초기화.<br>${hs.init.length}칸을 모두 채우면 <b style="color:#ff5252">GRAND JACKPOT</b></p><button class="go">시작!</button>`,{autoMs:auto?2500:0});
 const board=hs.init.slice();
 const lab=x=>G.draw(x,b),N=board.length;
 hsEl.innerHTML=board.map(x=>`<div class="hc">${x?lab(x):''}</div>`).join('');hsEl.classList.add('on');
 let sp=3;const upd=()=>{bar.innerHTML=`남은 스핀 ${'●'.repeat(sp)}${'○'.repeat(3-sp)} · ${board.filter(Boolean).length}/${N}`};upd();await sleep(600);
 for(const add of hs.steps){
  sp--;upd();
  [...hsEl.children].forEach((el,i)=>{if(!board[i])el.classList.add('roll')});
  for(let i=0;i<8;i++)AUDIO.tone(300+Math.random()*400,.05,i*.08,'square',.02);
  await sleep(T(900,500));
  [...hsEl.children].forEach(el=>el.classList.remove('roll'));
  for(const [i,x] of add){board[i]=x;const el=hsEl.children[i];el.innerHTML=lab(x);el.classList.add('new');sfx.coin();buzz(40);await sleep(T(320,150))}
  if(add.length){sp=3;toast(add.length>1?`+${add.length} 코인!`:'+1 코인!',900)}
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
 const p=document.querySelector(`.plq[data-t="${t}"]`);p&&p.classList.add('hitjp');sfx.jp();buzz([100,50,100,50,300]);burst(t==='GRAND'?200:t==='MAJOR'?120:60);
 await popup(`<h3>${t} JACKPOT!</h3><div class="num big">${fmt(v)}</div><button class="go">받기</button>`,{autoMs:auto?2600:0});
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
async function wheelUI(w,b){
 AUDIO.setIntense(true);
 await popup(`<h3>BONUS WHEEL!</h3><p>벨 3개! 휠을 돌려 최대 500배</p><button class="go">돌리기</button>`,{autoMs:auto?1800:0});
 await spinWheel('BONUS WHEEL',G.WHEEL,w.i);
 const v=w.v*b;$('wres').innerHTML=`<b style="font-size:28px;color:#ffd34d">${w.v>=500?'MEGA ':''}${w.v}배 = ${fmt(v)}</b>`;sfx.jp();burst(60);
 await sleep(1600);pop.classList.remove('on');
 if(!fs)AUDIO.setIntense(false);
 return v;
}

async function jpWheelUI(w,b){
 AUDIO.setIntense(true);sfx.jp();flash();shake();
 await popup(`<h3>JACKPOT WHEEL!</h3><div class="big" style="font-family:${GAMES.EF}">🐯</div><p>잭팟 확정! 어떤 잭팟일까?</p><button class="go">돌리기</button>`,{autoMs:auto?1800:0});
 const segs=G.SEG.map(t=>[t,1,GAMES.JCOL[t]]);
 await spinWheel('JACKPOT WHEEL',segs,w.i,t=>t);
 const v=jpVal(w.tier,b);pool()[w.tier]=0;$('wres').innerHTML=`<b style="font-size:28px;color:#ffd34d">${w.tier}!</b>`;
 await sleep(1200);pop.classList.remove('on');
 await jackpot(w.tier,v);
 if(!fs)AUDIO.setIntense(false);
 return v;
}
/* ---------- main spin ---------- */
async function spin(){
 if(reelsMoving){if(G.mode!=='tumble')slam();return}
 if(busy||!G)return;
 AUDIO.init();hideDbl();
 const free=!!fs,b=free?fs.bet:bet();
 if(!free){
  if(S.bal<b){auto=false;renderBtns();toast('코인 부족!');buzz(80);$('charge').animate&&showScreenHint();return}
  S.bal-=b;renderBal(false);
  if(G.jp){const p=pool();for(const t in p)p[t]+=b*({GRAND:.004,MAJOR:.003,MINOR:.002,MINI:.001})[t]}
  S.xp+=b;
 }else{fs.left--;fs.n++;banner()}
 busy=true;reelsMoving=true;clearWins();setWin(free?fs.total:0,free?'FREE SPIN WIN':'WIN');
 $('spin').classList.add('stop');$('spin').firstChild.textContent='STOP';
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
  if(free&&o.bm>0){
   o.bombs.forEach(([c,r])=>tEls[c][r].classList.add('hit'));box.classList.add('dim');sfx.boom();buzz([80,40,160]);
   toast(`폭죽 x${o.bm}!`,1400);burst(40);await sleep(900);
   const nw=o.base*o.bm*b;await countWin(fs.total+acc,fs.total+nw,T(900,400));win=nw;
  }
  if(o.scWin){win+=o.scWin*b;showWinsT([{cells:o.scCells}])}
  cur=o.grid;
 }else{
  await spinReels(o.grid,free);
  cur=o.grid;reelsMoving=false;spinBtnIdle();
  win=o.total*b;
  showWins(o.wins);
 }
 if(win>0){
  if(free)fs.total+=win;else S.bal+=win;
  if(win>=b*10){await sleep(400);await bigWin(win,b)}
  else if(G.mode!=='tumble'){celebrate(win,b);await countWin(free?fs.total-win:0,free?fs.total:win,T(700,350))}
  if(!free)renderBal(true);
  setWin(free?fs.total:win,free?'FREE SPIN WIN':'WIN');
 }
 // features
 if(win>=b*10)mascot('big');else if(win>0)mascot('win');else if(Math.random()<.18)mascot('lose');
 let fx=0;
 if(o.hs){await sleep(500);fx=await holdSpinUI(o.hs,b)}
 if(o.collect){const add=await collectUI(o.collect,b);fx+=add;}
 if(o.wheel){await sleep(500);fx+=await wheelUI(o.wheel,b)}
 if(o.jpw){await sleep(500);mascot('big');fx+=await jpWheelUI(o.jpw,b)}
 if(o.pick){await sleep(500);mascot('big');fx+=await pickBonus(b,{tier:o.pick.tier,emoji:'🦪',jp:true,title:'PEARL JACKPOT!'})}
 if(!free&&(Math.random()<1/400||window.__mystery)){window.__mystery=0;await sleep(400);fx+=await pickBonus(b)}
 if(fx>0){
  if(fx>=b*10)await bigWin(fx,b);else celebrate(fx,b);
  if(free)fs.total+=fx;else{S.bal+=fx;renderBal(true)}
  setWin(free?fs.total:fx,free?'FREE SPIN WIN':'BONUS WIN');
 }
 if(o.lvlUp&&free){sfx.lvl();burst(50);await popup(`<h3>LEVEL UP!</h3><p>돼지 ${fs.st.pigs}마리 수집!</p><div class="big num">x${o.lvlUp}</div><p>코인 배수 x${o.lvlUp} · 프리스핀 +10회</p><button class="go">계속</button>`,{autoMs:auto?2200:0})}
 if(o.fsAward){
  await sleep(500);mascot('big');
  if(free){fs.left+=o.fsAward;sfx.scat();toast(`+${o.fsAward} FREE SPINS!`,1600);banner();await sleep(1200)}
  else{
   sfx.jp();burst(60);
   const extra={egypt:'모든 당첨금 3배!',buffalo:'와일드에 x2·x3·x5 배수!',panda:'배수 폭죽 등장!',piggy:'돼지 4마리마다 코인 배수 업!'}[G.id]||'';
   await popup(`<h3>FREE SPINS</h3><div class="num big">${o.fsAward}회</div><p>${extra}</p><button class="go">시작!</button>`,{autoMs:auto?2600:0});
   fs={left:o.fsAward,total:0,bet:b,n:0,st:G.fsInit(o.fsAward)};document.body.classList.add('fs');AUDIO.setIntense(true);banner();
  }
 }
 // level
 while(S.xp>=need()){S.xp-=need();S.lvl++;const bonus=10000*S.lvl;S.bal+=bonus;sfx.lvl();renderBal(true);await popup(`<h3>LEVEL UP!</h3><p>${HER}님 레벨 ${S.lvl} 달성 💕</p><div class="num" style="font-size:32px;color:#fff">+${fmt(bonus)}</div><button class="go">받기</button>`,{autoMs:auto?1800:0})}
 renderLvl();
 if(fs&&fs.left<=0&&free){
  await sleep(600);const t=fs.total,fb=fs.bet;fs=null;document.body.classList.remove('fs');AUDIO.setIntense(false);
  if(t>=fb*10)await bigWin(t,fb);
  else await popup(`<h3>프리스핀 종료</h3><div class="num" style="font-size:36px;color:#fff">${fmt(t)}</div><button class="go">받기</button>`,{autoMs:auto?2000:0});
  S.bal+=t;renderBal(true);setWin(t,'FREE SPINS TOTAL');renderBet();
 }
 save();renderJP();renderCharge();
 busy=false;
 if(!free&&!fs&&!auto&&win+fx>0&&!o.fsAward&&win+fx<b*500)offerDbl(win+fx);
 if(fs||auto){await sleep(fs?T(700,350):(win>0?T(900,500):T(350,150)));if(!busy&&(fs||auto)&&document.body.dataset.g!=='lobby')spin()}
}
function showWinsT(wins){box.classList.add('dim');wins.forEach(w=>w.cells.forEach(([c,r])=>tEls[c][r]?.classList.add('hit')))}
function spinBtnIdle(){$('spin').classList.remove('stop');$('spin').firstChild.textContent='SPIN'}
function banner(){if(!fs)return;const ex=G.id==='egypt'?' · x3':G.id==='piggy'?` · 코인 x${fs.st.lvl} · 🐷${fs.st.pigs}`:'';$('banner').textContent=`FREE SPINS ${fs.n} / ${fs.n+fs.left}${ex}`}
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
const PICKE={egypt:'🏺',buffalo:'💰',lucky:'🎁',panda:'🥠',piggy:'🥚',dragon:'🧧',tiger:'🥥',ocean:'🐚'};
const PT=[['MINI',10,60],['MINOR',30,28],['MAJOR',100,10.5],['GRAND',1000,1.5]];
async function pickBonus(b,opt={}){const PE=opt.emoji||PICKE[G.id];
 AUDIO.setIntense(true);sfx.jp();flash();shake();burst(40);
 await popup(`<h3>${opt.title||'MYSTERY BONUS!'}</h3><div class="big" style="font-family:${GAMES.EF}">${PE}</div><p>12개 중 같은 잭팟 3개를 먼저 모으면 당첨!<br>${opt.jp?'잭팟 확정! MINI~GRAND':'MINI 10배 · MINOR 30배 · MAJOR 100배 · GRAND 1000배'}</p><button class="go">시작!</button>`,{autoMs:auto?2200:0});
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
  const open=btn=>{if(lock||btn.classList.contains('op'))return;const t=seq[k++];cnt[t]++;btn.classList.add('op');btn.dataset.t=t;btn.innerHTML=coinSVG(PT[t][0],PT[t][0]);sfx.reveal(cnt[t]);buzz(25);$('ptier').innerHTML=tiers();
   if(cnt[t]===2&&t===tg){toast('하나만 더!',700)}
   if(k===seq.length){lock=true;clearInterval(at);res()}};
  grid.onclick=e=>{const x=e.target.closest('button');if(x)open(x)};
  if(auto)at=setInterval(()=>{const c=[...grid.children].filter(x=>!x.classList.contains('op'));if(c.length)open(c[Math.floor(Math.random()*c.length)])},650);
 });
 grid.onclick=null;
 const rest=[];PT.forEach((t,i)=>{for(let j=cnt[i];j<3;j++)rest.push(i)});
 [...grid.children].forEach(x=>{if(!x.classList.contains('op')){const t=rest.pop();x.innerHTML=coinSVG(PT[t][0],PT[t][0]);x.classList.add('dim')}else if(+x.dataset.t===tg)x.classList.add('win');else x.classList.add('dim')});
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
let mbT=0;
const LOVEL={win:[`${HER}이 최고!`,`역시 ${HER}!`],big:[`${HER} 부자 됐다!!`,`${HER}이 잭팟 여신!!`],lose:[`${HER}아 힘내!`],idle:[`${HER}이 안녕!`,`${HER} 사랑해 💕`,'주인장이 보고 싶대']};
function mascot(kind){const m=$('masc'),dc=DECOR.get(G.id),L=[...(dc[kind]||dc.idle),...(LOVEL[kind]||[])];m.classList.remove('jump','dance','sad');void m.offsetWidth;m.classList.add(kind==='big'?'dance':kind==='lose'?'sad':'jump');
 const b=$('bub');b.textContent=L[Math.floor(Math.random()*L.length)];b.classList.add('on');clearTimeout(mbT);mbT=setTimeout(()=>b.classList.remove('on'),kind==='big'?2800:1700);
 setTimeout(()=>m.classList.remove('jump','dance','sad'),kind==='big'?2800:1300)}
$('masc').onclick=()=>{mascot('idle');if(G.id==='piggy')sfx.oink();else sfx.reveal(Math.floor(Math.random()*4))};
/* ---------- admin ---------- */
const FORCE={fs:['프리스핀',o=>o.fsAward>0],big:['빅윈',o=>o.total>=15&&!o.fsAward],hs:['홀드앤스핀',o=>!!o.hs],grand:['GRAND 잭팟',o=>o.hs&&o.hs.full],wheel:['보너스 휠',o=>!!o.wheel],mega:['휠 MEGA 500배',o=>o.wheel&&o.wheel.v>=500],collect:['돼지 수집',o=>o.collect&&o.collect.amt>=5],jpw:['잭팟 휠',o=>!!o.jpw],jgrand:['휠 GRAND',o=>o.jpw&&o.jpw.tier==='GRAND'],pick:['진주 잭팟',o=>!!o.pick],pgrand:['진주 GRAND',o=>o.pick&&o.pick.tier==='GRAND'],mystery:['미스터리 보너스',null]};
const GF={egypt:['fs','hs','grand','big'],buffalo:['fs','big'],lucky:['wheel','mega','big'],panda:['fs','big'],piggy:['fs','collect','big'],dragon:['fs','hs','grand','big'],tiger:['fs','jpw','jgrand','big'],ocean:['fs','pick','pgrand','big']};
let force=null;
const featured=o=>o.fsAward||o.hs||o.wheel||o.jpw||o.pick||(o.collect&&o.collect.amt>=3)||o.total>=10;
function rollOutcome(){
 if(force&&FORCE[force][1]){const k=force,f=FORCE[k][1];force=null;if(k!=='grand')for(let i=0;i<60000;i++){const o=G.spin(false);if(f(o))return o}
  if(k==='grand'){for(let i=0;i<60000;i++){const o=G.spin(false);if(o.hs){const add=[];o.hs.board.forEach((x,j)=>{if(!x){o.hs.board[j]={s:'C',v:1};add.push([j,o.hs.board[j]])}});const st=o.hs.steps;if(st.length&&!st[st.length-1].length)st[st.length-1]=add;else st.push(add);o.hs.full=true;return o}}}}
 const L=S.luck||1;let o=G.spin(false);
 if(L>1){const extra=Math.round((L-1)*1.0);for(let i=0;i<extra&&!featured(o);i++)if(Math.random()<Math.min(1,L-1-i))o=G.spin(false)}
 else if(L<1&&(featured(o)||o.total>0)&&Math.random()<1-L)o=G.spin(false);
 return o;
}
function admin(){
 const g=document.body.dataset.g,inGame=g!=='lobby'&&G;
 const fb=inGame?[...GF[G.id],'mystery'].map(k=>`<button class="sm" data-f="${k}" style="min-height:40px">${FORCE[k][0]}</button>`).join(''):'<p>게임에 들어간 뒤 열면 다음 스핀 강제를 쓸 수 있어요</p>';
 pop.innerHTML=`<div class="card" style="text-align:left"><h3 style="text-align:center">관리자 모드</h3>
 <p><b>코인</b> 현재 ${fmt(S.bal)}</p><div style="display:flex;gap:6px"><input id="adC" inputmode="numeric" placeholder="금액" style="flex:1;font-size:16px;border-radius:10px;border:0;padding:10px"><button class="sm" data-a="set">설정</button></div>
 <div class="btns" style="margin-top:6px"><button class="sm" data-a="p1">+100만</button><button class="sm" data-a="p10">+1000만</button><button class="sm" data-a="zero">0으로</button></div>
 <p style="margin-top:12px"><b>행운 배율</b> <span id="adLv">x${S.luck||1}</span> — 보너스·빅윈 나오는 빈도</p><input id="adL" type="range" min="0.5" max="5" step="0.5" value="${S.luck||1}" style="width:100%">
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
$('gtitle').addEventListener('click',secret);
/* ---------- controls ---------- */
const sp=$('spin');let holdT=0,held=false;
sp.addEventListener('pointerdown',()=>{held=false;holdT=setTimeout(()=>{held=true;if(!auto){auto=true;renderBtns();toast('AUTO SPIN',900);if(!busy)spin()}},650)});
['pointerup','pointerleave','pointercancel'].forEach(ev=>sp.addEventListener(ev,()=>clearTimeout(holdT)));
sp.addEventListener('click',()=>{if(held){held=false;return}if(auto&&!reelsMoving){auto=false;renderBtns();toast('AUTO 정지',800);return}spin()});
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
 if(pt.pay){const u=pt.unit;rows=pt.order.map(k=>`<div>${G.ART[k]}<span>${[5,4,3].filter(n=>pt.pay[k][n]).map(n=>`${n} - ${short(pt.pay[k][n]*b/u)}`).join('<br>')}</span></div>`).join('')}
 if(pt.tumble){rows=pt.order.map(k=>`<div>${G.ART[k]}<span>12+ ${short(pt.tumble[k][2]*b)}<br>10-11 ${short(pt.tumble[k][1]*b)}<br>8-9 ${short(pt.tumble[k][0]*b)}</span></div>`).join('')}
 if(pt.classicPay){const cp=pt.classicPay,k=.34/5;rows=[['r7','r7'],['b7','b7'],['b3','b3'],['b2','b2'],['b1','b1'],['ch','ch']].map(([a,s])=>`<div>${G.ART[a]}<span>x3 - ${short(cp[s]*b*k)}</span></div>`).join('')+`<div>${G.ART.b1}<span>아무 BAR x3<br>${short(cp.ab*b*k)}</span></div><div>${G.draw({s:'W',m:5})}<span>WILD x3<br>${short(cp.W*b*k)} × 배수</span></div>`}
 popup(`<h3>${G.name}</h3><p>현재 베팅 ${short(b)} 기준${pt.ways?' · 243 WAYS (웨이당)':''}</p><div class="ptable">${rows}</div><ul class="rules">${pt.rules.map(r=>`<li>${r}</li>`).join('')}</ul><button class="go">닫기</button>`)};
addEventListener('keydown',e=>{if(e.code==='Space'&&document.body.dataset.g!=='lobby'){e.preventDefault();if(pop.classList.contains('on'))pop.querySelector('.go')?.click();else spin()}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){auto=false;renderBtns()}});
addEventListener('resize',()=>{if(G&&!busy){size();drawStatic()}});

renderBal(false);renderLvl();renderBtns();renderCharge();renderJP();renderLW();
/* ---------- 태율랜드 ---------- */
function heartRain(n=40){const d=document.createElement('div');d.className='hrain';d.innerHTML=Array.from({length:n},()=>`<span style="left:${Math.random()*96}vw;font-size:${16+Math.random()*26}px;animation-duration:${3+Math.random()*4}s;animation-delay:${Math.random()*2.5}s">${['❤️','💕','💖','🥰','💗'][Math.floor(Math.random()*5)]}</span>`).join('');document.body.appendChild(d);setTimeout(()=>d.remove(),9000)}
function loveCard(){const L=window.LOVE||{};const notes=L.notes&&L.notes.length?L.notes:['사랑해 💕'];const day=Math.floor((Date.now()+9*3600e3)/864e5);$('note').textContent=notes[day%notes.length];
 if(L.since){const d=Math.floor((Date.now()-new Date(L.since+'T00:00:00+09:00'))/864e5)+1;$('dday').textContent=d>0?`우리 D+${d}`:''}
 if(L.her)$('vip').textContent=`VIP ${L.her}님 전용 카지노`}
loveCard();
(async()=>{const L=window.LOVE||{};heartRain(46);
 await popup(`<div class="hb">💝</div><h3>${(L.welcome||'웰컴 자기야 오늘도 사랑해🥰')}</h3><div class="sig">- ${L.owner||'태율랜드 주인장'} -</div><button class="go">나도 사랑해 💕</button>`,{cls:'wel'});
 AUDIO.init();[784,988,1175,1568].forEach((f,i)=>AUDIO.tone(f,.3,i*.12,'sine',.08));heartRain(24);})();
AUDIO.play('lobby');
}
