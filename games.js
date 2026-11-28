const GAMES=(()=>{
const pick=ws=>{let t=0;for(const w of ws)t+=w[1];let r=Math.random()*t;for(const w of ws){if((r-=w[1])<0)return w[0]}return ws[ws.length-1][0]};
const wsel=(wt,c)=>pick(Object.keys(wt).map(k=>[k,Array.isArray(wt[k])?wt[k][c]:wt[k]]).filter(x=>x[1]>0));
const P=(a,b,c,d=0)=>[0,0,d,a,b,c];
const scale=(pt,k)=>{const o={};for(const s in pt)o[s]=pt[s].map(v=>Math.round(v*k*100)/100);return o};
const gen=(cols,rows,f)=>Array.from({length:cols},(_,c)=>Array.from({length:rows},()=>f(c)));
const count=(g,s)=>g.flat().filter(x=>x.s===s).length;
const cellsOf=(g,s)=>{const o=[];g.forEach((col,c)=>col.forEach((x,r)=>{if(x.s===s)o.push([c,r])}));return o};
const short=n=>{n=Math.round(n);if(n>=1e8){const v=n/1e8;return (v>=10?Math.round(v):+v.toFixed(1))+'억'}if(n>=1e4){const v=n/1e4;return (v>=100?Math.round(v).toLocaleString():+v.toFixed(1))+'만'}return n.toLocaleString()};
const L20=[[1,1,1,1,1],[0,0,0,0,0],[2,2,2,2,2],[0,1,2,1,0],[2,1,0,1,2],[0,0,1,2,2],[2,2,1,0,0],[1,0,0,0,1],[1,2,2,2,1],[1,0,1,2,1],
 [1,2,1,0,1],[0,1,1,1,0],[2,1,1,1,2],[0,1,0,1,0],[2,1,2,1,2],[1,1,0,1,1],[1,1,2,1,1],[0,0,2,0,0],[2,2,0,2,2],[0,2,2,2,0]];
const L5=[[1,1,1],[0,0,0],[2,2,2],[0,1,2],[2,1,0]];

function linesEval(g,lines,pay,stop){
 const out=[];
 lines.forEach((L,li)=>{
  const cs=L.map((r,c)=>g[c][r]);
  let t=null,n=0,m=1;
  for(const x of cs){if(stop.includes(x.s))break;if(x.s==='W'){n++;m*=x.m||1;continue}if(t===null){t=x.s;n++;continue}if(x.s===t){n++;continue}break}
  let wn=0,wm=1;for(const x of cs){if(x.s==='W'){wn++;wm*=x.m||1}else break}
  let best=0,bs=null,bn=0;
  if(t&&pay[t]&&pay[t][n]){best=pay[t][n]*m;bs=t;bn=n}
  if(pay.W&&pay.W[wn]&&pay.W[wn]*wm>best){best=pay.W[wn]*wm;bs='W';bn=wn}
  if(best>0)out.push({li,s:bs,n:bn,amt:best,cells:L.slice(0,bn).map((r,c)=>[c,r])});
 });
 return out;
}

/* ---------- art ---------- */
const EF="'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";
const SERIF="Georgia,'Noto Serif','Times New Roman',serif",SANS="'Arial Black','Noto Sans KR','Noto Sans CJK KR',Arial,sans-serif";
const DARK={lR:'#4a000c',lB:'#06164a',lGr:'#06300f',lP:'#22064a',lO:'#4a1e00'};
const tile=(g,inner,sw=0)=>`<svg viewBox="0 0 100 100"><rect x="3" y="5" width="94" height="94" rx="16" fill="#000" opacity=".5"/><rect x="2" y="1" width="96" height="95" rx="16" fill="url(#gF)"/><rect x="5.5" y="4.5" width="89" height="88" rx="13" fill="url(#gF2)"/><rect x="8" y="7" width="84" height="83" rx="11" fill="url(#${g})"/><rect x="8" y="7" width="84" height="83" rx="11" fill="url(#vig)"/><path d="M19 9h62a9 9 0 0 1 9 9v13q-40 12-80 0V18a9 9 0 0 1 9-9z" fill="url(#gls)"/><g filter="url(#ds)">${inner}</g>${sw>5?'<rect x="3.5" y="2.5" width="93" height="92" rx="15" fill="none" stroke="#fff" stroke-width="2" opacity=".75"/>':''}</svg>`;
const emo=(e,s=60,y=72,x=50)=>{const I=typeof ICONS!=='undefined'&&ICONS[e];if(I){const w=s*1.08,cy=y-s*.36;return `<g transform="translate(${(x-w/2).toFixed(1)} ${(cy-w/2).toFixed(1)}) scale(${(w/100).toFixed(3)})">${I}</g>`}return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${s}" style="font-family:${EF}">${e}</text>`};
const etile=(g,e,s,y)=>tile(g,emo(e,s,y));
const royal=(L,g,font)=>{const f=font&&/Lilita|Bungee/.test(font)?SANS:SERIF,big=L.length>1,y=big?73:79,fs=big?54:74;
 const t=(dy,fill,ex='')=>`<text x="50" y="${y+dy}" text-anchor="middle" font-family="${f}" font-weight="900" font-size="${fs}" fill="${fill}" ${ex}>${L}</text>`;
 return `<svg viewBox="0 0 100 100"><g filter="url(#ds2)">${t(6,'#0a0010')}${t(4,DARK[g]||'#220030')}${t(2,DARK[g]||'#220030')}${t(0,`url(#${g})`,'stroke="#fff3c0" stroke-width="1.6"')}${t(0,'url(#hiG)')}</g><path d="M78 14l4 6-4 6-4-6z" fill="#fff" opacity=".9"/></svg>`};
const label=(t,y=86,fs=22,font,fill='url(#gG)')=>`<text x="50" y="${y}" text-anchor="middle" font-family="${font&&/Cinzel|Rye/.test(font)?SERIF:SANS}" font-weight="900" font-size="${fs}" fill="${fill}" stroke="#2a0008" stroke-width="3.5" paint-order="stroke">${t}</text>`;
const badge=(svg,t,col='#ff2a44')=>svg.replace(/<\/svg>$/,`<g><circle cx="77" cy="77" r="19" fill="${col}" stroke="#fff" stroke-width="3"/><text x="77" y="84" text-anchor="middle" font-family="${SANS}" font-weight="900" font-size="18" fill="#fff">${t}</text></g></svg>`);
const coinSVG=(lab,jp,font,grad='cG')=>{const col=jp==='MAJOR'?'#b04bff':jp==='MINOR'?'#2f7dff':jp==='MINI'?'#22c24f':jp==='GRAND'?'#ff2a44':null;
 const fz=jp?(jp.length>4?16:18):lab.length>5?16:lab.length>4?19:23;
 return `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="94" rx="34" ry="5" fill="#000" opacity=".4"/><g filter="url(#ds)"><circle cx="50" cy="52" r="44" fill="#6e3f03"/><circle cx="50" cy="49" r="44" fill="url(#${grad})"/><circle cx="50" cy="49" r="36" fill="${col||'#9a5a04'}" opacity="${col?.95:.35}"/><circle cx="50" cy="49" r="36" fill="none" stroke="#fff3b0" stroke-width="3"/><circle cx="50" cy="49" r="40.5" fill="none" stroke="#6e3f03" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M20 34a33 33 0 0 1 32-20" stroke="#fff" stroke-width="6" fill="none" opacity=".6" stroke-linecap="round"/><text x="50" y="${49+fz*.36}" text-anchor="middle" font-family="${jp?SERIF:SANS}" font-weight="900" font-size="${fz}" fill="#fff" stroke="#3a1500" stroke-width="3.5" paint-order="stroke">${lab}</text></g></svg>`};
const DEFS=`<linearGradient id="gG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8c8"/><stop offset=".4" stop-color="#ffd34d"/><stop offset=".75" stop-color="#c8840f"/><stop offset="1" stop-color="#6e3f03"/></linearGradient>
<linearGradient id="gF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbe0"/><stop offset=".25" stop-color="#ffd34d"/><stop offset=".5" stop-color="#a86a08"/><stop offset=".72" stop-color="#ffe58a"/><stop offset="1" stop-color="#6e3f03"/></linearGradient>
<linearGradient id="gF2" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="#b8770c"/><stop offset="1" stop-color="#5a3002"/></linearGradient>
<radialGradient id="vig" cx=".5" cy=".42" r=".7"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient>
<linearGradient id="gls" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="hiG" x1="0" y1="0" x2="0" y2="1"><stop offset=".15" stop-color="#fff" stop-opacity=".75"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
${[['tR','#ff6a7a','#d0102a','#5a0610'],['tB','#6ab4ff','#1a5ad0','#081a5a'],['tGr','#6af09a','#1a9a4a','#063a18'],['tP','#c890ff','#7a2ad0','#26064a'],['tT','#5af0e0','#0aa098','#033a36'],['tN','#ffb060','#a02a6a','#1a0638'],['tO','#ffc880','#e06a10','#5a2200'],['tY','#fff090','#e0a810','#6a4600'],['tBr','#e0aa72','#8a5424','#3a1e08'],['tPk','#ffc0e4','#e0509a','#6a0a40'],['tSky','#b0e8ff','#3a9ae0','#0a3a7a'],['tK','#7a7a90','#2a2a3a','#05050a']].map(([i,a,b,c])=>`<linearGradient id="${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`).join('')}
${[['lR','#ffd0d0','#ff2a44','#a0001a'],['lB','#d8eeff','#3a8aff','#0a2a9a'],['lGr','#d8ffdc','#2ad05a','#0a6a24'],['lP','#f4d8ff','#b04bff','#4a0b9a'],['lO','#fff4c0','#ffa21f','#a04000']].map(([i,a,b,c])=>`<linearGradient id="${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`).join('')}
<radialGradient id="cG" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#fffbe0"/><stop offset=".35" stop-color="#ffd34d"/><stop offset=".8" stop-color="#c07a08"/><stop offset="1" stop-color="#7a4503"/></radialGradient>
<radialGradient id="fG" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#fff6c0"/><stop offset=".35" stop-color="#ff9a1f"/><stop offset=".8" stop-color="#d0201a"/><stop offset="1" stop-color="#6a0606"/></radialGradient>
<filter id="ds" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="3" stdDeviation="2" flood-color="#000" flood-opacity=".65"/></filter>
<filter id="ds2" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000" flood-opacity=".7"/></filter>`;
/* =============== 1. EGYPT =============== */
const EG=(()=>{
 const WT={T:13,J:13,Q:12,K:11,A:10,ank:7,eye:6,cat:5,scb:4,msk:3,W:[0,3,3,3,3],S:2.6,C:12};
 const PAY=scale({T:P(5,12,40),J:P(5,12,40),Q:P(6,15,50),K:P(8,20,75),A:P(10,25,100),ank:P(15,40,150),eye:P(20,60,200),cat:P(25,80,300),scb:P(30,120,500),msk:P(40,200,1000,2),W:P(40,200,1000,2)},3.4);
 const COINS=[[0.5,30],[1,26],[2,18],[3,10],[5,7],[8,4],['MINI',3],['MINOR',1.2],['MAJOR',0.25]];
 const JP={MINI:10,MINOR:30,MAJOR:100,GRAND:1000};
 const SCAT={3:[2,8],4:[10,12],5:[50,20]};
 const coin=()=>{const v=pick(COINS);return typeof v==='string'?{s:'C',jp:v}:{s:'C',v}};
 const cell=c=>{const s=wsel(WT,c);return s==='C'?coin():{s}};
 const ART={
  T:royal('10','lO'),J:royal('J','lB'),Q:royal('Q','lGr'),K:royal('K','lR'),A:royal('A','lP'),
  ank:tile('tB','<g fill="none" stroke="url(#gG)" stroke-width="10" stroke-linecap="round"><ellipse cx="50" cy="31" rx="13" ry="16"/><path d="M50 48v38M27 52h46"/></g><circle cx="50" cy="52" r="6" fill="#ff3355" stroke="#fff6" stroke-width="2"/>'),
  eye:tile('tT','<path d="M14 48Q50 18 86 48Q50 72 14 48z" fill="#fff" stroke="#16122b" stroke-width="5"/><circle cx="50" cy="47" r="13" fill="#1b4fd6"/><circle cx="50" cy="47" r="6.5" fill="#0a0a1a"/><circle cx="46" cy="43" r="3" fill="#fff"/><path d="M42 63l-7 24M58 63q7 15 20 10" stroke="url(#gG)" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M18 32Q50 12 82 30" stroke="url(#gG)" stroke-width="6" fill="none" stroke-linecap="round"/>'),
  cat:tile('tP','<path d="M36 90c-5-18-1-34 9-45l-5-20 11 11h8l11-11-5 20c10 11 14 27 9 45z" fill="#120c1e" stroke="url(#gG)" stroke-width="3"/><path d="M40 60h28" stroke="url(#gG)" stroke-width="6"/><circle cx="54" cy="66" r="4" fill="#3ee8d8"/><path d="M47 40l5 2M62 40l-5 2" stroke="#ffd34d" stroke-width="3.5" stroke-linecap="round"/>'),
  scb:tile('tGr','<circle cx="50" cy="17" r="9" fill="#ff5a2a" stroke="#ffd34d" stroke-width="2"/><path d="M28 50L9 38M28 62L8 66M30 75L14 88M72 50L91 38M72 62L92 66M70 75L86 88" stroke="url(#gG)" stroke-width="5" stroke-linecap="round"/><ellipse cx="50" cy="60" rx="23" ry="27" fill="url(#gG)"/><path d="M50 36v50" stroke="#6e3f03" stroke-width="3"/><circle cx="50" cy="32" r="10" fill="#0f6a32" stroke="url(#gG)" stroke-width="3"/>'),
  msk:tile('tR','<path d="M50 9C28 9 18 25 16 45L10 91h26l4-30h20l4 30h26l-6-46C82 25 72 9 50 9z" fill="url(#gG)"/><path d="M19 52h14M67 52h14M16 66h17M67 66h17M13 80h19M68 80h19" stroke="#1d3fbf" stroke-width="5"/><path d="M36 32h28v24q0 16-14 18q-14-2-14-18z" fill="#e7a83a" stroke="#6e3f03" stroke-width="2"/><path d="M39 44h8M53 44h8" stroke="#111" stroke-width="4" stroke-linecap="round"/><rect x="46" y="72" width="8" height="16" rx="3" fill="#1d3fbf" stroke="url(#gG)" stroke-width="2"/>'),
  W:tile('tR','<path d="M36 36C24 28 13 30 5 37c10 1 20 5 31 8M64 36c12-8 23-6 31 1-10 1-20 5-31 8" fill="url(#gG)" stroke="#6e3f03" stroke-width="1.5"/><circle cx="50" cy="36" r="15" fill="#ff4a2a" stroke="url(#gG)" stroke-width="4"/>'+label('WILD',83,27)),
  S:tile('tN','<path d="M50 12L88 70H12z" fill="url(#gG)"/><path d="M50 12L60 70H88z" fill="#9a5a08"/><circle cx="50" cy="11" r="6" fill="#fff"/>'+label('SCATTER',90,16,'Cinzel,serif','#fff'))
 };
 function holdSpin(g){
  const board=Array(15).fill(null);g.forEach((col,c)=>col.forEach((x,r)=>{if(x.s==='C')board[c*3+r]=x}));
  const init=board.slice(),steps=[];let sp=3;
  while(sp>0&&board.some(x=>!x)){sp--;const add=[];for(let i=0;i<15;i++)if(!board[i]&&Math.random()<0.08){board[i]=coin();add.push([i,board[i]])}steps.push(add);if(add.length)sp=3}
  const full=board.every(Boolean);
  return {init,steps,board,full,seedVal:board.filter(Boolean).reduce((a,x)=>a+(x.jp?JP[x.jp]:x.v),0)+(full?JP.GRAND:0)};
 }
 return {jp:true,id:'egypt',name:'스카라베 골드',en:'SCARAB GOLD',sub:'20라인 · 홀드앤스핀 · 4단 잭팟',hero:'🪲',badge:'JACKPOT',font:'Cinzel,serif',
  cols:5,rows:3,mode:'reels',lines:L20,ART,JP,
  draw:(x,b)=>x.s==='C'?coinSVG(x.jp||short(x.v*b),x.jp):ART[x.s],
  fill:c=>cell(c),
  antic:g=>{const a=[];let s=0,k=0;for(let c=0;c<5;c++){a.push(c>=2&&(s>=2||k>=4));s+=g[c].filter(x=>x.s==='S').length;k+=g[c].filter(x=>x.s==='C').length}return a},
  fsInit:n=>({left:n,mult:3}),
  spin(fs){
   const g=gen(5,3,cell);
   const wins=linesEval(g,L20,PAY,['S','C']).map(w=>({...w,amt:w.amt/20}));
   let total=wins.reduce((a,w)=>a+w.amt,0),fsAward=0;
   const sc=count(g,'S');
   if(sc>=3){const [m,f]=SCAT[Math.min(sc,5)];total+=m;fsAward=fs?5:f;wins.push({cells:cellsOf(g,'S'),amt:m,scat:true})}
   if(fs)total*=3;
   const hs=count(g,'C')>=6?holdSpin(g):null;
   return {grid:g,wins,total,fsAward,hs,simExtra:hs?hs.seedVal:0};
  },
  paytable:{order:['msk','scb','cat','eye','ank','A','K','Q','J','T'],pay:PAY,unit:20,
   rules:['WILD: 2~5번 릴, 모든 심볼 대체','SCATTER 3/4/5개 → x2/x10/x50 + 프리스핀 8/12/20회 (당첨 3배)','코인 6개 이상 → HOLD & SPIN, 15칸 채우면 GRAND']}
 };
})();

/* =============== 2. BUFFALO (243 ways) =============== */
const BF=(()=>{
 const WT={T:14,J:14,Q:13,K:12,A:11,elk:7,cou:6,wolf:5,eag:4,buf:4.5,W:[0,2.5,2.5,2.5,0],S:2.4};
 const PAY=scale({T:P(5,10,25),J:P(5,10,25),Q:P(5,15,30),K:P(5,15,30),A:P(10,20,40),elk:P(15,30,75),cou:P(20,40,100),wolf:P(25,50,150),eag:P(30,75,200),buf:P(40,100,300)},1);
 let D=11.5;
 const SCAT={3:[2,8],4:[10,15],5:[50,20]};
 const HI=['buf','eag','wolf','cou','elk'];
 const cell=(c,fs,st)=>{let s=wsel(fs?{...WT,W:[0,6,6,6,0]}:WT,c);if(s==='W'&&fs)return {s,m:pick([[2,2],[3,1.4],[5,.5]])};if(fs&&st&&st.upg.includes(s))s='buf';if(s==='buf'&&fs&&Math.random()<.55)return {s,gold:true};return {s}};
 const UPO=['eag','wolf','cou','elk'];
 const F="Rye,serif";
 const ART={T:royal('10','lO',F,400),J:royal('J','lB',F,400),Q:royal('Q','lGr',F,400),K:royal('K','lR',F,400),A:royal('A','lP',F,400),
  elk:etile('tGr','🦌',60,72),cou:etile('tY','🐆',62,72),wolf:etile('tB','🐺',62,72),eag:etile('tSky','🦅',62,72),buf:tile('tO',emo('🦬',70,76),6),bufG:tile('tY',emo('🦬',72,77),8),
  W:tile('tR','<circle cx="50" cy="40" r="22" fill="#ffb02a"/><path d="M8 66l22-20 14 12 18-22 30 30v10H8z" fill="#5a1a0a"/>'+label('WILD',86,26,F)),
  S:tile('tK','<circle cx="50" cy="44" r="30" fill="url(#cG)" stroke="#6e3f03" stroke-width="3"/>'+emo('🦬',36,57)+label('BONUS',90,19,F))};
 return {id:'buffalo',name:'썬더 버팔로',en:'THUNDER BUFFALO',sub:'243 WAYS · 스택 심볼 · 배수 와일드',hero:'🦬',badge:'HOT',font:F,
  cols:5,rows:3,mode:'reels',ART,
  draw:x=>x.s==='W'&&x.m>1?badge(ART.W,'x'+x.m):x.gold?ART.bufG:ART[x.s],
  fill:(c,fs)=>cell(c,fs),
  antic:g=>{const a=[];let s=0;for(let c=0;c<5;c++){a.push(c>=2&&s>=2);s+=g[c].filter(x=>x.s==='S').length}return a},
  fsInit:n=>({left:n,golds:0,upg:[]}),
  spin(fs,st){
   const g=gen(5,3,c=>cell(c,fs,st));
   for(let c=0;c<5;c++)if(Math.random()<(fs?.22:.11)){let s=pick(HI.map((h,i)=>[h,[1,1.3,1.6,2,2.4][i]]));if(fs&&st&&st.upg.includes(s))s='buf';g[c]=[0,1,2].map(()=>s==='buf'&&fs&&Math.random()<.55?{s,gold:true}:{s})}
   let upgrade=null;if(fs&&st){const gd=g.flat().filter(x=>x.gold).length;st.golds+=gd;while(st.golds>=4&&st.upg.length<4){st.golds-=4;const u=UPO[st.upg.length];st.upg.push(u);(upgrade=upgrade||[]).push(u)}}
   const wins=[];
   for(const s of Object.keys(PAY)){
    let n=0,ways=1;const cells=[];
    for(let c=0;c<5;c++){let k=0;g[c].forEach((x,r)=>{if(x.s===s){k+=1;cells.push([c,r])}else if(x.s==='W'){k+=x.m||1;cells.push([c,r])}});if(!k)break;ways*=k;n++}
    if(n>=3&&PAY[s][n]){const keep=cells.filter(([c])=>c<n);wins.push({s,n,ways,amt:PAY[s][n]*ways/D,cells:keep})}
   }
   let total=wins.reduce((a,w)=>a+w.amt,0),fsAward=0;
   const sc=count(g,'S');
   if(sc>=3){const [m,f]=SCAT[Math.min(sc,5)];total+=m;fsAward=fs?5:f;wins.push({cells:cellsOf(g,'S'),amt:m,scat:true})}
   return {grid:g,wins,total,fsAward,upgrade,golds:g.flat().filter(x=>x.gold).length};
  },
  setD:v=>{D=v},
  paytable:{order:['buf','eag','wolf','cou','elk','A','K','Q','J','T'],pay:PAY,get unit(){return D},ways:true,
   rules:['243 WAYS: 이웃한 릴에 같은 심볼이면 위치 상관없이 당첨','WILD: 2~4번 릴, 프리스핀 중엔 x2·x3·x5 배수 와일드','BONUS 3/4/5개 → 프리스핀 8/15/20회','릴 전체가 같은 동물로 쌓이는 스택 등장']}
 };
})();

/* =============== 3. LUCKY 7 (classic 3x3 + wheel) =============== */
const LK=(()=>{
 const WT={X:13,ch:9,b1:8,b2:6,b3:4.5,b7:2.6,r7:1.8,bell:3.2,W2:1.6,W5:.55};
 const PAY={ch:10,ab:4,b1:10,b2:20,b3:40,b7:80,r7:160,W:400};
 let K=.34;
 const WHEEL=[[10,14],[25,8],[15,12],[50,5],[10,14],[30,7],[100,2.5],[15,12],[20,10],[500,.4],[20,10],[40,6]];
 const BARS=['b1','b2','b3'];
 const cell=()=>{const s=wsel(WT,0);return s==='W2'?{s:'W',m:2}:s==='W5'?{s:'W',m:5}:{s}};
 const F="Bungee,sans-serif";
 const bar=n=>`<svg viewBox="0 0 100 100"><g filter="url(#ds)">${Array.from({length:n},(_,i)=>{const h=n===1?34:n===2?26:21,gap=4,tot=n*h+(n-1)*gap,y=50-tot/2+i*(h+gap);return `<rect x="10" y="${y+2}" width="80" height="${h}" rx="6" fill="#000" opacity=".6"/><rect x="10" y="${y}" width="80" height="${h}" rx="6" fill="url(#tK)" stroke="url(#gF)" stroke-width="3"/><rect x="13" y="${y+2}" width="74" height="${h*.4}" rx="4" fill="url(#gls)"/><text x="50" y="${y+h*.76}" text-anchor="middle" font-family="${SANS}" font-weight="900" font-size="${h*.72}" fill="#fff">BAR</text>`}).join('')}</g></svg>`;
 const seven=g=>`<svg viewBox="0 0 100 100"><g filter="url(#ds2)"><text x="50" y="93" text-anchor="middle" font-family="${SANS}" font-weight="900" font-size="96" fill="#3a1a00">7</text><text x="50" y="88" text-anchor="middle" font-family="${SANS}" font-weight="900" font-size="96" fill="url(#${g})" stroke="url(#gG)" stroke-width="5" paint-order="stroke">7</text><text x="50" y="88" text-anchor="middle" font-family="${SANS}" font-weight="900" font-size="96" fill="url(#hiG)">7</text></g></svg>`;
 const ART={X:'<svg viewBox="0 0 100 100"></svg>',ch:`<svg viewBox="0 0 100 100"><g filter="url(#ds)">${emo('🍒',72,78)}</g></svg>`,
  b1:bar(1),b2:bar(2),b3:bar(3),b7:seven('lB'),r7:seven('lR'),
  bell:`<svg viewBox="0 0 100 100"><g filter="url(#ds)">${emo('🔔',64,70)}${label('BONUS',94,17,F,'#fff')}</g></svg>`,
  W:tile('tP',label('WILD',48,25,F,'#fff'))};
 const lineVal=cs=>{
  const nw=cs.filter(x=>x.s!=='W');const m=cs.reduce((a,x)=>a*(x.s==='W'?x.m:1),1);
  if(cs.some(x=>x.s==='X'||x.s==='bell'))return 0;
  if(!nw.length)return PAY.W*m/ (m>=25?5:1);
  const t=nw[0].s;
  if(nw.every(x=>x.s===t))return PAY[t]*m;
  if(nw.every(x=>BARS.includes(x.s)))return PAY.ab*m;
  return 0;
 };
 return {id:'lucky',name:'럭키 세븐',en:'LUCKY 777',sub:'클래식 3릴 · x2·x5 와일드 · 보너스 휠',hero:'🎰',badge:'CLASSIC',font:F,
  cols:3,rows:3,mode:'reels',classic:true,lines:L5,ART,WHEEL,
  draw:x=>x.s==='W'?ART.W.replace(/<\/svg>$/,label('x'+x.m,90,34,F)+'</svg>'):ART[x.s],
  fill:()=>cell(),
  antic:g=>[false,false,g[0].some(x=>x.s==='bell')&&g[1].some(x=>x.s==='bell')],
  fsInit:n=>({left:n}),
  spin(){
   const g=gen(3,3,cell);
   const wins=[];
   L5.forEach((L,li)=>{const cs=L.map((r,c)=>g[c][r]);const v=lineVal(cs)*K;if(v>0)wins.push({li,amt:v/5,cells:L.map((r,c)=>[c,r])})});
   let total=wins.reduce((a,w)=>a+w.amt,0);
   let wheel=null;
   if(g.every(col=>col.some(x=>x.s==='bell'))){const i=pick(WHEEL.map((w,i)=>[i,w[1]]));wheel={i,v:WHEEL[i][0]};wins.push({cells:cellsOf(g,'bell'),amt:0,scat:true})}
   return {grid:g,wins,total,fsAward:0,wheel,simExtra:wheel?wheel.v:0};
  },
  setK:v=>{K=v},
  paytable:{classicPay:PAY,rules:['5라인 · 같은 심볼 3개','아무 BAR 3개 = x'+PAY.ab+' 라인베팅','WILD x2·x5: 대체 + 배수 곱하기 (x5 x5 x5 = 잭팟급)','릴 3개 모두에 BONUS 벨 → 보너스 휠 (최대 500배)']}
 };
})();

/* =============== 4. PANDA (6x5 tumble, scatter pays) =============== */
const PD=(()=>{
 const WT={pan:2.6,lan:4,dum:5,dan:6,tea:7,bam:8,pea:9,oni:10,S:1.05};
 const PAY={pan:[10,25,50],lan:[2.5,10,25],dum:[2,5,15],dan:[1.5,2,12],tea:[1,1.5,10],bam:[.8,1.2,8],pea:[.5,1,5],oni:[.25,.75,2]};
 let K=1;
 const BOMBS=[[2,30],[3,22],[4,16],[5,12],[6,8],[8,6],[10,5],[12,3],[15,2.5],[20,2],[25,1.2],[50,.5],[100,.15]];
 const cell=fs=>{if(fs&&Math.random()<.035)return {s:'B',m:pick(BOMBS)};return {s:wsel(WT,0)}};
 const ball=(g,e,s=64,ring='')=>`<svg viewBox="0 0 100 100"><ellipse cx="50" cy="95" rx="32" ry="4" fill="#000" opacity=".35"/><circle cx="50" cy="51" r="45" fill="#000" opacity=".3"/><circle cx="50" cy="48" r="45" fill="url(#gF)" ${ring?'':'opacity=".0"'}/><circle cx="50" cy="48" r="${ring?40:44}" fill="url(#${g})" stroke="#fff8" stroke-width="2.5"/><circle cx="50" cy="48" r="${ring?40:44}" fill="url(#vig)"/><ellipse cx="38" cy="26" rx="20" ry="10" fill="url(#gls)"/><g filter="url(#ds)">${emo(e,s,48+s*.36)}</g></svg>`;
 const F="Lilita One,sans-serif";
 const ART={pan:ball('tK','🐼',66,'stroke="url(#gG)" stroke-width="6"'),lan:ball('tR','🏮'),dum:ball('tY','🥟'),dan:ball('tPk','🍡'),tea:ball('tGr','🍵'),bam:ball('tT','🎋'),pea:ball('tO','🍑'),oni:ball('tSky','🍙'),
  S:`<svg viewBox="0 0 100 100"><g filter="url(#ds)">${emo('🧧',70,72)}${label('FREE',94,20,F,'#ffd34d')}</g></svg>`,
  B:`<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="40" fill="url(#tR)" stroke="url(#gG)" stroke-width="5"/><path d="M62 16l8-10M66 18l12-4" stroke="#ffd34d" stroke-width="4" stroke-linecap="round"/></svg>`};
 const evalG=g=>{const cnt={};g.forEach((col,c)=>col.forEach((x,r)=>{if(PAY[x.s]){(cnt[x.s]=cnt[x.s]||[]).push([c,r])}}));
  const w=[];for(const s in cnt){const n=cnt[s].length;if(n>=8){const t=n>=12?2:n>=10?1:0;w.push({s,n,amt:PAY[s][t]*K,cells:cnt[s]})}}return w};
 return {id:'panda',name:'판다 딤섬',en:'PANDA DIM SUM',sub:'6×5 텀블 · 8개 이상 어디든 · 배수 폭죽',hero:'🐼',badge:'NEW',font:F,
  cols:6,rows:5,mode:'tumble',ART,
  draw:x=>x.s==='B'?ART.B.replace(/<\/svg>$/,label('x'+x.m,64,x.m>=10?30:36,F,'#fff')+'</svg>'):ART[x.s],
  fill:(c,fs)=>cell(fs),
  fsInit:n=>({left:n}),
  spin(fs){
   let g=gen(6,5,()=>cell(fs));
   const steps=[];
   for(let guard=0;guard<40;guard++){
    const wins=evalG(g);steps.push({grid:g.map(c=>c.slice()),wins,win:wins.reduce((a,w)=>a+w.amt,0)});
    if(!wins.length)break;
    const rm=new Set(wins.flatMap(w=>w.cells.map(([c,r])=>c*10+r)));
    g=g.map((col,c)=>{const keep=col.filter((x,r)=>!rm.has(c*10+r));return [...Array.from({length:5-keep.length},()=>cell(fs)),...keep]});
   }
   let base=steps.reduce((a,s)=>a+s.win,0),total=base,fsAward=0;
   const sc=count(g,'S'),bombs=fs?cellsOf(g,'B').map(([c,r])=>[c,r,g[c][r].m]):[];
   let bm=0;if(fs&&bombs.length&&base>0){bm=bombs.reduce((a,b)=>a+b[2],0);total=base*bm}
   let scWin=0;
   if(!fs&&sc>=4){scWin=sc>=6?100:sc===5?5:3;fsAward=10}
   if(fs&&sc>=3)fsAward=5;
   total+=scWin;
   return {grid:g,steps,base,bombs,bm,scWin,total,fsAward,scCells:cellsOf(g,'S')};
  },
  setK:v=>{K=v},
  paytable:{tumble:PAY,order:['pan','lan','dum','dan','tea','bam','pea','oni'],rules:['같은 심볼 8개 이상이면 위치 상관없이 당첨 (8-9 / 10-11 / 12+)','당첨 심볼은 터지고 위에서 새로 떨어짐 → 연쇄 당첨','🧧 4/5/6개 → x3/x5/x100 + 프리스핀 10회','프리스핀 중 배수 폭죽(x2~x100) 등장, 연쇄 끝나면 합산해서 곱하기']}
 };
})();

/* =============== 5. PIGGY FARM (lines + collect) =============== */
const PG=(()=>{
 const WT={T:13,J:13,Q:12,K:11,A:10,hor:7,roo:6,she:5,cow:4,W:[0,3,3,3,3],S:[2.8,2.8,2.8,2.8,0],C:[6,6,6,6,0],P:[0,0,0,0,7]};
 const PAY=scale({T:P(5,12,40),J:P(5,12,40),Q:P(6,15,50),K:P(8,20,75),A:P(10,25,100),hor:P(15,40,150),roo:P(20,60,200),she:P(25,80,300),cow:P(40,150,600),W:P(50,250,1000)},1);
 let K=2.6;
 const COINS=[[0.5,30],[1,26],[2,18],[3,10],[5,7],[10,3],[25,.8],[50,.2]];
 const SCAT={3:10,4:15};
 const cell=(c,fs)=>{const w=fs?{...WT,C:[9,9,9,9,0],P:[0,0,0,0,11]}:WT;const s=wsel(w,c);return s==='C'?{s,v:pick(COINS)}:{s}};
 const F="Lilita One,sans-serif";
 const ART={T:royal('10','lO',F,400),J:royal('J','lB',F,400),Q:royal('Q','lGr',F,400),K:royal('K','lR',F,400),A:royal('A','lP',F,400),
  hor:etile('tBr','🐴',62,72),roo:etile('tO','🐓',62,72),she:etile('tSky','🐑',62,72),cow:etile('tGr','🐄',64,72),
  W:tile('tR',emo('🌾',40,50)+label('WILD',86,26,F)),S:tile('tY',emo('🌻',52,62)+label('FREE',91,20,F,'#fff')),
  P:tile('tPk',emo('🐷',66,70)+label('COLLECT',93,15,F,'#fff'),6)};
 return {id:'piggy',name:'피기 팜',en:'PIGGY FARM',sub:'20라인 · 돼지가 코인 싹쓸이 · 레벨업 프리스핀',hero:'🐷',badge:'HOT',font:F,
  cols:5,rows:3,mode:'reels',lines:L20,ART,
  draw:(x,b)=>x.s==='C'?coinSVG(short(x.v*b),null):ART[x.s],
  fill:(c,fs)=>cell(c,fs),
  antic:g=>{const a=[];let s=0;for(let c=0;c<5;c++){a.push((c>=2&&c<4&&s>=2)||(c===4&&g.slice(0,4).flat().filter(x=>x.s==='C').length>=3));s+=g[c].filter(x=>x.s==='S').length}return a},
  fsInit:n=>({left:n,pigs:0,lvl:1}),
  spin(fs,st){
   const g=gen(5,3,c=>cell(c,fs));
   const wins=linesEval(g,L20,PAY,['S','C','P']).map(w=>({...w,amt:w.amt*K/20/3}));
   let total=wins.reduce((a,w)=>a+w.amt,0),fsAward=0;
   const sc=count(g,'S');
   if(sc>=3){fsAward=fs?10:SCAT[Math.min(sc,4)];total+=sc>=4?10:2;wins.push({cells:cellsOf(g,'S'),amt:0,scat:true})}
   const pigs=cellsOf(g,'P'),coins=[];g.forEach((col,c)=>col.forEach((x,r)=>{if(x.s==='C')coins.push([c,r,x.v])}));
   let collect=null;
   if(pigs.length&&coins.length){const mult=fs?st.lvl:1;const amt=coins.reduce((a,x)=>a+x[2],0)*pigs.length*mult;collect={pigs,coins,mult,amt};total+=amt}
   let lvlUp=0;
   if(fs&&pigs.length){const before=Math.floor(st.pigs/4);st.pigs+=pigs.length;const after=Math.floor(st.pigs/4);if(after>before&&st.lvl<10){const nl=[1,2,3,10][Math.min(3,after)];lvlUp=nl;st.lvl=nl;fsAward+=10}}
   return {grid:g,wins,total,fsAward,collect,lvlUp};
  },
  setK:v=>{K=v},
  paytable:{order:['cow','she','roo','hor','A','K','Q','J','T'],pay:PAY,get unit(){return 20*3/K},
   rules:['🐷 돼지(5번 릴)가 나오면 화면의 모든 코인 값을 수집','해바라기 3/4개 → 프리스핀 10/15회','프리스핀 중 돼지 4마리 모을 때마다 +10회, 코인 배수 x2 → x3 → x10']}
 };
})();

const L30=[...L20,[1,0,1,0,1],[1,2,1,2,1],[0,0,1,0,0],[2,2,1,2,2],[0,1,2,2,2],[2,1,0,0,0],[0,2,0,2,0],[2,0,2,0,2],[1,0,2,0,1],[1,2,0,2,1]];
const L40=[[0,0,0,0,0],[1,1,1,1,1],[2,2,2,2,2],[3,3,3,3,3],[0,1,2,1,0],[1,2,3,2,1],[3,2,1,2,3],[2,1,0,1,2],
 [0,1,0,1,0],[1,0,1,0,1],[1,2,1,2,1],[2,1,2,1,2],[2,3,2,3,2],[3,2,3,2,3],[0,0,1,0,0],[1,1,0,1,1],[1,1,2,1,1],[2,2,1,2,2],[2,2,3,2,2],[3,3,2,3,3],
 [0,1,1,1,0],[1,0,0,0,1],[1,2,2,2,1],[2,1,1,1,2],[2,3,3,3,2],[3,2,2,2,3],[0,1,2,3,3],[3,2,1,0,0],[0,0,1,2,3],[3,3,2,1,0],
 [0,1,2,2,2],[3,2,1,1,1],[1,2,3,3,3],[2,1,0,0,0],[0,2,0,2,0],[3,1,3,1,3],[1,3,1,3,1],[2,0,2,0,2],[1,0,1,2,1],[2,3,2,1,2]];
const JPS={MINI:10,MINOR:30,MAJOR:100,GRAND:1000};
const JPW=[['MINI',58],['MINOR',29],['MAJOR',11],['GRAND',2]];
const JCOL={MINI:'#22c24f',MINOR:'#2f7dff',MAJOR:'#b04bff',GRAND:'#ff2a44'};
function makeHS(n,coinFn,q){return g=>{
 const rows=g[0].length,board=Array(n).fill(null);g.forEach((col,c)=>col.forEach((x,r)=>{if(x.s==='C')board[c*rows+r]=x}));
 const init=board.slice(),steps=[];let sp=3;
 while(sp>0&&board.some(x=>!x)){sp--;const add=[];for(let i=0;i<n;i++)if(!board[i]&&Math.random()<q){board[i]=coinFn();add.push([i,board[i]])}steps.push(add);if(add.length)sp=3}
 const full=board.every(Boolean);
 return {init,steps,board,full,seedVal:board.filter(Boolean).reduce((a,x)=>a+(x.jp?JPS[x.jp]:x.v),0)+(full?JPS.GRAND:0)};
}}
const anticBy=(keys,th)=>g=>{const a=[];let k=0;for(let c=0;c<g.length;c++){a.push(c>=2&&k>=th);k+=g[c].filter(x=>keys.includes(x.s)).length}return a};

/* =============== 6. DRAGON (5x4, 40 lines, fireball hold&spin) =============== */
const DR=(()=>{
 const WT={T:13,J:13,Q:12,K:11,A:10,koi:7,tur:6,pea:5,drg:3.5,W:[0,3,3,3,3],S:1.6,C:7.5};
 let PM=4;
 const BASE={T:P(5,10,30),J:P(5,10,30),Q:P(5,12,40),K:P(8,15,50),A:P(8,20,60),koi:P(10,30,100),tur:P(15,40,150),pea:P(20,60,200),drg:P(30,100,500,2),W:P(30,100,500,2)};
 let PAY=scale(BASE,PM);
 const COINS=[[0.5,30],[1,26],[2,18],[3,10],[5,7],[8,4],['MINI',3],['MINOR',1.2],['MAJOR',0.25]];
 const coin=()=>{const v=pick(COINS);return typeof v==='string'?{s:'C',jp:v}:{s:'C',v}};
 const cell=(c,fs)=>{const s=wsel(fs?{...WT,W:[0,5,5,5,5]}:WT,c);return s==='C'?coin():{s}};
 const hs=makeHS(20,coin,.065);
 const SCAT={3:[2,8],4:[10,12],5:[50,20]};
 const F="Lilita One,sans-serif";
 const ART={T:royal('10','lO',F,400),J:royal('J','lB',F,400),Q:royal('Q','lGr',F,400),K:royal('K','lR',F,400),A:royal('A','lP',F,400),
  koi:etile('tSky','🐟',60,72),tur:etile('tGr','🐢',60,72),pea:etile('tO','🦚',62,72),drg:tile('tR',emo('🐉',70,76),6),
  W:tile('tR',emo('🔥',46,54)+label('WILD',88,26,F)),S:tile('tY',emo('🏯',52,62)+label('FREE',91,20,F,'#fff'))};
 return {id:'dragon',name:'드래곤 포춘',en:'DRAGON FORTUNE',sub:'40라인 · 5×4 · 파이어볼 홀드앤스핀 · 4단 잭팟',hero:'🐉',badge:'NEW JACKPOT',font:F,jp:true,
  cols:5,rows:4,mode:'reels',lines:L40,ART,
  draw:(x,b)=>x.s==='C'?coinSVG(x.jp||short(x.v*b),x.jp,undefined,'fG'):ART[x.s],
  coinDraw:(x,b)=>coinSVG(x.jp||short(x.v*b),x.jp,undefined,'fG'),
  fill:(c,fs)=>cell(c,fs),antic:anticBy(['S','C'],2),
  fsInit:n=>({left:n}),
  spin(fs){
   const g=gen(5,4,c=>cell(c,fs));
   const wins=linesEval(g,L40,PAY,['S','C']).map(w=>({...w,amt:w.amt/40}));
   let total=wins.reduce((a,w)=>a+w.amt,0),fsAward=0;const sc=count(g,'S');
   if(sc>=3){const [m,f]=SCAT[Math.min(sc,5)];total+=m;fsAward=fs?5:f;wins.push({cells:cellsOf(g,'S'),amt:m,scat:true})}
   if(fs)total*=2;
   const h=count(g,'C')>=6?hs(g):null;
   return {grid:g,wins,total,fsAward,hs:h,simExtra:h?h.seedVal:0};
  },
  setPM:v=>{PM=v;PAY=scale(BASE,v)},
  paytable:{order:['drg','pea','tur','koi','A','K','Q','J','T'],get pay(){return PAY},unit:40,
   rules:['40라인 · 5×4 릴','파이어볼 6개 이상 → HOLD & SPIN (20칸), 20칸 다 채우면 GRAND','🏯 3/4/5개 → 프리스핀 8/12/20회, 와일드 증가 + 당첨 2배']}
 };
})();

/* =============== 7. TIGER (5x3, 30 lines, jackpot wheel) =============== */
const TG=(()=>{
 const WT={T:13,J:13,Q:12,K:11,A:10,par:7,gor:6,ele:5,tig:3.5,W:[0,3,3,3,3],S:2.4,JP:[5,0,5,0,5]};
 let PM=3;
 const BASE={T:P(5,10,30),J:P(5,10,30),Q:P(5,12,40),K:P(8,15,50),A:P(8,20,60),par:P(10,30,100),gor:P(15,40,150),ele:P(20,60,200),tig:P(30,100,500,2),W:P(30,100,500,2)};
 let PAY=scale(BASE,PM);
 const SCAT={3:10,4:15,5:20};
 const cell=(c,fs)=>{const w=fs?{...WT,tig:7}:WT;return {s:wsel(w,c)}};
 const F="Rye,serif";
 const ART={T:royal('10','lO',F,400),J:royal('J','lB',F,400),Q:royal('Q','lGr',F,400),K:royal('K','lR',F,400),A:royal('A','lP',F,400),
  par:etile('tR','🦜',60,72),gor:etile('tK','🦍',60,72),ele:etile('tSky','🐘',62,72),tig:tile('tO',emo('🐯',70,76),6),
  W:tile('tGr',emo('🌴',44,54)+label('WILD',88,26,F)),S:tile('tN',emo('🌕',48,56)+label('FREE',90,20,F,'#fff')),
  JP:`<svg viewBox="0 0 100 100"><g filter="url(#ds)"><circle cx="50" cy="50" r="45" fill="url(#cG)" stroke="#6e3f03" stroke-width="3"/><circle cx="50" cy="50" r="36" fill="#a3091f" stroke="#fff3b0" stroke-width="3"/>${emo('🐯',40,58)}${label('JACKPOT',86,13,'Cinzel,serif','#fff')}</g></svg>`};
 const SEG=['MINI','MINOR','MINI','MAJOR','MINI','MINOR','GRAND','MINI','MINOR','MINI','MAJOR','MINOR'];
 return {id:'tiger',name:'골든 타이거',en:'GOLDEN TIGER',sub:'30라인 · 잭팟 휠 · 프리스핀 호랑이 2배',hero:'🐯',badge:'NEW JACKPOT',font:F,jp:true,
  cols:5,rows:3,mode:'reels',lines:L30,ART,SEG,
  draw:x=>ART[x.s],fill:(c,fs)=>cell(c,fs),
  antic:g=>[false,false,g[0].some(x=>x.s==='JP'),false,g[0].some(x=>x.s==='JP')&&g[2].some(x=>x.s==='JP')].map((v,c)=>v||anticBy(['S'],2)(g)[c]),
  fsInit:n=>({left:n}),
  spin(fs){
   const g=gen(5,3,c=>cell(c,fs));
   const wins=linesEval(g,L30,PAY,['S','JP']).map(w=>({...w,amt:w.amt/30}));
   let total=wins.reduce((a,w)=>a+w.amt,0),fsAward=0;const sc=count(g,'S');
   if(sc>=3){total+=sc>=5?20:sc===4?5:2;fsAward=fs?5:SCAT[Math.min(sc,5)];wins.push({cells:cellsOf(g,'S'),amt:0,scat:true})}
   if(fs)total*=2;
   let jpw=null;
   if([0,2,4].every(c=>g[c].some(x=>x.s==='JP'))){const tier=pick(JPW);const idx=SEG.map((t,i)=>[t,i]).filter(x=>x[0]===tier);jpw={tier,i:idx[Math.floor(Math.random()*idx.length)][1]};wins.push({cells:cellsOf(g,'JP'),amt:0,scat:true})}
   return {grid:g,wins,total,fsAward,jpw,simExtra:jpw?JPS[jpw.tier]:0};
  },
  setPM:v=>{PM=v;PAY=scale(BASE,v)},
  paytable:{order:['tig','ele','gor','par','A','K','Q','J','T'],get pay(){return PAY},unit:30,
   rules:['30라인','🐯 JACKPOT 코인이 1·3·5번 릴에 모두 → 잭팟 휠 (MINI~GRAND 확정)','🌕 3/4/5개 → 프리스핀 10/15/20회, 호랑이 2배 많이 + 당첨 2배']}
 };
})();

/* =============== 8. OCEAN (5x4, 40 lines, pearl jackpot pick) =============== */
const OC=(()=>{
 const WT={T:13,J:13,Q:12,K:11,A:10,cra:7,fis:6,dol:5,wha:3.5,W:[0,3,3,3,3],S:1.6,P:1.5};
 let PM=2.6;
 const BASE={T:P(5,10,30),J:P(5,10,30),Q:P(5,12,40),K:P(8,15,50),A:P(8,20,60),cra:P(10,30,100),fis:P(15,40,150),dol:P(20,60,200),wha:P(30,100,500,2),W:P(30,100,500,2)};
 let PAY=scale(BASE,PM);
 const SCAT={3:[2,8],4:[10,12],5:[50,20]};
 const cell=(c,fs)=>{const s=wsel(fs?{...WT,W:[0,5,5,5,5]}:WT,c);return {s}};
 const F="Lilita One,sans-serif";
 const ART={T:royal('10','lO',F,400),J:royal('J','lB',F,400),Q:royal('Q','lGr',F,400),K:royal('K','lR',F,400),A:royal('A','lP',F,400),
  cra:etile('tR','🦀',60,72),fis:etile('tY','🐠',62,72),dol:etile('tSky','🐬',62,72),wha:tile('tB',emo('🐋',68,74),6),
  W:tile('tT',emo('🔱',46,54)+label('WILD',88,26,F)),S:tile('tN',emo('🪸',50,60)+label('FREE',91,20,F,'#fff')),
  P:`<svg viewBox="0 0 100 100"><g filter="url(#ds)"><circle cx="50" cy="50" r="45" fill="url(#tPk)" stroke="url(#gG)" stroke-width="4"/>${emo('🦪',54,66)}${label('PEARL',91,15,F,'#fff')}</g></svg>`};
 return {id:'ocean',name:'딥씨 트레저',en:'DEEP SEA TREASURE',sub:'40라인 · 5×4 · 진주 3개 → 잭팟 픽 · 프리스핀 3배',hero:'🐙',badge:'NEW JACKPOT',font:F,jp:true,
  cols:5,rows:4,mode:'reels',lines:L40,ART,
  draw:x=>ART[x.s],fill:(c,fs)=>cell(c,fs),antic:anticBy(['S','P'],2),
  fsInit:n=>({left:n}),
  spin(fs){
   const g=gen(5,4,c=>cell(c,fs));
   const wins=linesEval(g,L40,PAY,['S','P']).map(w=>({...w,amt:w.amt/40}));
   let total=wins.reduce((a,w)=>a+w.amt,0),fsAward=0;const sc=count(g,'S');
   if(sc>=3){const [m,f]=SCAT[Math.min(sc,5)];total+=m;fsAward=fs?5:f;wins.push({cells:cellsOf(g,'S'),amt:m,scat:true})}
   if(fs)total*=3;
   let pick=null;
   if(count(g,'P')>=3){pick={tier:pick_(JPW)};wins.push({cells:cellsOf(g,'P'),amt:0,scat:true})}
   return {grid:g,wins,total,fsAward,pick,simExtra:pick?JPS[pick.tier]:0};
  },
  setPM:v=>{PM=v;PAY=scale(BASE,v)},
  paytable:{order:['wha','dol','fis','cra','A','K','Q','J','T'],get pay(){return PAY},unit:40,
   rules:['40라인 · 5×4 릴','🦪 진주 3개 이상 어디든 → 진주 잭팟 픽 (MINI~GRAND 확정)','🪸 3/4/5개 → 프리스핀 8/12/20회, 와일드 증가 + 당첨 3배']}
 };
})();
const pick_=pick;

/* =============== 9. SWEET LOVE (핑크 · 데이트 코스 프리게임) =============== */
const LVG=(()=>{
 const WT={T:13,J:13,Q:12,K:11,A:10,cake:7,rose:6,ring:5,bear:3.5,W:[0,3,3,3,3],S:2.4};
 let PM=2.55;
 const BASE={T:P(5,10,30),J:P(5,10,30),Q:P(5,12,40),K:P(8,15,50),A:P(8,20,60),cake:P(10,30,100),rose:P(15,40,150),ring:P(20,60,200),bear:P(30,100,500,2),W:P(30,100,500,2)};
 let PAY=scale(BASE,PM);
 const SCAT={3:10,4:12,5:15};
 const COURSE=[['카페 데이트',1],['영화관',2],['놀이공원',3],['야경 산책',5],['고백 타임',10]];
 const cell=(c,fs)=>{const w=fs?{...WT,W:[0,4.5,4.5,4.5,4.5],bear:4.5}:WT;return {s:wsel(w,c)}};
 const F="Lilita One,sans-serif";
 const ART={T:royal('10','lP',F,400),J:royal('J','lB',F,400),Q:royal('Q','lR',F,400),K:royal('K','lP',F,400),A:royal('A','lR',F,400),
  cake:etile('tSky','🍰',62,72),rose:etile('tR','🌹',62,74),ring:etile('tP','💍',62,72),bear:tile('tPk',emo('🧸',70,76),6),
  W:tile('tPk',emo('💖',50,56)+label('WILD',88,26,F)),S:tile('tN',emo('💌',50,58)+label('FREE',91,20,F,'#fff'))};
 return {id:'love',name:'스위트 러브',en:'SWEET LOVE',sub:'20라인 · 💌 3개 → 데이트 코스 프리게임 · 최대 x10',hero:'🧸',badge:'NEW ♥',font:F,
  cols:5,rows:3,mode:'reels',lines:L20,ART,COURSE,
  draw:x=>ART[x.s],fill:(c,fs)=>cell(c,fs),antic:anticBy(['S'],2),
  fsInit:n=>({step:0,mult:1}),
  spin(fs,st){
   const g=gen(5,3,c=>cell(c,fs));
   const wins=linesEval(g,L20,PAY,['S']).map(w=>({...w,amt:w.amt/20}));
   let total=wins.reduce((a,w)=>a+w.amt,0),fsAward=0,course=null;const sc=count(g,'S');
   if(sc>=3){total+=sc>=5?20:sc===4?5:2;fsAward=fs?5:SCAT[Math.min(sc,5)];wins.push({cells:cellsOf(g,'S'),amt:0,scat:true})}
   if(fs&&st){if(count(g,'W')>0&&st.step<COURSE.length-1){st.step++;course=COURSE[st.step]}st.mult=COURSE[st.step][1];total*=st.mult}
   return {grid:g,wins,total,fsAward,course};
  },
  post:async(o,b,A)=>{if(o.course){A.announce(o.course[0]+'!',`데이트 코스 x${o.course[1]}`,'small');A.speak&&A.speak(o.course[1]>=10?'고백 타임! 열 배야!':`${o.course[0]}! ${o.course[1]}배!`,'dealer');await A.sleep(700)}},
  setPM:v=>{PM=v;PAY=scale(BASE,v)},
  paytable:{order:['bear','ring','rose','cake','A','K','Q','J','T'],get pay(){return PAY},unit:20,
   rules:['20라인','💖 WILD는 💌을 뺀 모든 심볼 대신','💌 3/4/5개 → 프리게임 10/12/15회','프리게임은 데이트 코스! 하트가 나올 때마다 다음 코스로 이동해요','카페 x1 → 영화관 x2 → 놀이공원 x3 → 야경 x5 → 고백 타임 x10']}
 };
})();

return {DEFS,list:[LVG,DR,EG,TG,OC,BF,LK,PD,PG],byId:{love:LVG,egypt:EG,buffalo:BF,lucky:LK,panda:PD,piggy:PG,dragon:DR,tiger:TG,ocean:OC},JPS,JPW,JCOL,coinSVG,short,emo,EF};
})();
if(typeof module!=='undefined')module.exports=GAMES;
if(typeof CHARS!=='undefined'&&typeof ICONS!=='undefined')CHARS.love=`<svg viewBox="0 0 120 130"><path d="M86 104Q96 70 92 34" stroke="#c0508a" stroke-width="1.8" fill="none"/><g transform="translate(68 0) scale(.46)">${ICONS['💖']}</g><g transform="translate(4 26)">${ICONS['🧸']}</g><g transform="translate(78 50) rotate(-15)"><path d="M0 0l-12-7v14zM0 0l12-7v14z" fill="#ff4f99" stroke="#2b1a2e" stroke-width="2" stroke-linejoin="round"/><circle r="4" fill="#ff8ac0" stroke="#2b1a2e" stroke-width="2"/></g></svg>`;
