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
const tile=(g,inner,sw=4.5)=>`<svg viewBox="0 0 100 100"><rect x="4" y="4" width="92" height="92" rx="14" fill="url(#${g})" stroke="url(#gG)" stroke-width="${sw}"/><rect x="10" y="9" width="80" height="32" rx="10" fill="#fff" opacity=".14"/><g filter="url(#ds)">${inner}</g></svg>`;
const emo=(e,s=60,y=72,x=50)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${s}" style="font-family:${EF}">${e}</text>`;
const etile=(g,e,s,y)=>tile(g,emo(e,s,y));
const royal=(L,g,font='Cinzel,serif',wt=900)=>`<svg viewBox="0 0 100 100"><text x="50" y="${L.length>1?76:82}" text-anchor="middle" font-family="${font}" font-weight="${wt}" font-size="${L.length>1?58:78}" fill="url(#${g})" stroke="#1a0530" stroke-width="3.5" paint-order="stroke" filter="url(#ds)">${L}</text></svg>`;
const label=(t,y=86,fs=22,font='Cinzel,serif',fill='url(#gG)')=>`<text x="50" y="${y}" text-anchor="middle" font-family="${font}" font-weight="900" font-size="${fs}" fill="${fill}" stroke="#2a0008" stroke-width="3.5" paint-order="stroke">${t}</text>`;
const badge=(svg,t,col='#ff2a44')=>svg.replace(/<\/svg>$/,`<g><circle cx="77" cy="77" r="19" fill="${col}" stroke="#fff" stroke-width="3"/><text x="77" y="84" text-anchor="middle" font-family="Lilita One,sans-serif" font-size="19" fill="#fff">${t}</text></g></svg>`);
const coinSVG=(lab,jp,font='Black Han Sans,sans-serif')=>{const col=jp==='MAJOR'?'#b04bff':jp==='MINOR'?'#2f7dff':jp==='MINI'?'#22c24f':jp==='GRAND'?'#ff2a44':null;
 const fz=jp?(jp.length>4?17:19):lab.length>5?17:lab.length>4?20:24;
 return `<svg viewBox="0 0 100 100"><g filter="url(#ds)"><circle cx="50" cy="50" r="44" fill="url(#cG)" stroke="#6e3f03" stroke-width="3"/><circle cx="50" cy="50" r="35" fill="${col||'#b36d06'}" opacity="${col?.95:.35}" stroke="#fff3b0" stroke-width="2.5"/><path d="M22 34a32 32 0 0 1 30-18" stroke="#fff" stroke-width="5" fill="none" opacity=".55" stroke-linecap="round"/><text x="50" y="${50+fz*.36}" text-anchor="middle" font-family="${jp?'Cinzel,serif':font}" font-weight="900" font-size="${fz}" fill="#fff" stroke="#3a1500" stroke-width="3" paint-order="stroke">${lab}</text></g></svg>`};

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
 return {id:'egypt',name:'스카라베 골드',en:'SCARAB GOLD',sub:'20라인 · 홀드앤스핀 · 4단 잭팟',hero:'🪲',badge:'JACKPOT',font:'Cinzel,serif',
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
 let D=10.5;
 const SCAT={3:[2,8],4:[10,15],5:[50,20]};
 const HI=['buf','eag','wolf','cou','elk'];
 const cell=(c,fs)=>{const s=wsel(fs?{...WT,W:[0,6,6,6,0]}:WT,c);if(s==='W'&&fs)return {s,m:pick([[2,2],[3,1.4],[5,.5]])};return {s}};
 const F="Rye,serif";
 const ART={T:royal('10','lO',F,400),J:royal('J','lB',F,400),Q:royal('Q','lGr',F,400),K:royal('K','lR',F,400),A:royal('A','lP',F,400),
  elk:etile('tGr','🦌',60,72),cou:etile('tY','🐆',62,72),wolf:etile('tB','🐺',62,72),eag:etile('tSky','🦅',62,72),buf:tile('tO',emo('🦬',70,76),6),
  W:tile('tR','<circle cx="50" cy="40" r="22" fill="#ffb02a"/><path d="M8 66l22-20 14 12 18-22 30 30v10H8z" fill="#5a1a0a"/>'+label('WILD',86,26,F)),
  S:tile('tK','<circle cx="50" cy="44" r="30" fill="url(#cG)" stroke="#6e3f03" stroke-width="3"/>'+emo('🦬',36,57)+label('BONUS',90,19,F))};
 return {id:'buffalo',name:'썬더 버팔로',en:'THUNDER BUFFALO',sub:'243 WAYS · 스택 심볼 · 배수 와일드',hero:'🦬',badge:'HOT',font:F,
  cols:5,rows:3,mode:'reels',ART,
  draw:x=>x.s==='W'&&x.m>1?badge(ART.W,'x'+x.m):ART[x.s],
  fill:(c,fs)=>cell(c,fs),
  antic:g=>{const a=[];let s=0;for(let c=0;c<5;c++){a.push(c>=2&&s>=2);s+=g[c].filter(x=>x.s==='S').length}return a},
  fsInit:n=>({left:n}),
  spin(fs){
   const g=gen(5,3,c=>cell(c,fs));
   for(let c=0;c<5;c++)if(Math.random()<(fs?.22:.11)){const s=pick(HI.map((h,i)=>[h,[1,1.3,1.6,2,2.4][i]]));g[c]=[{s},{s},{s}]}
   const wins=[];
   for(const s of Object.keys(PAY)){
    let n=0,ways=1;const cells=[];
    for(let c=0;c<5;c++){let k=0;g[c].forEach((x,r)=>{if(x.s===s){k+=1;cells.push([c,r])}else if(x.s==='W'){k+=x.m||1;cells.push([c,r])}});if(!k)break;ways*=k;n++}
    if(n>=3&&PAY[s][n]){const keep=cells.filter(([c])=>c<n);wins.push({s,n,ways,amt:PAY[s][n]*ways/D,cells:keep})}
   }
   let total=wins.reduce((a,w)=>a+w.amt,0),fsAward=0;
   const sc=count(g,'S');
   if(sc>=3){const [m,f]=SCAT[Math.min(sc,5)];total+=m;fsAward=fs?5:f;wins.push({cells:cellsOf(g,'S'),amt:m,scat:true})}
   return {grid:g,wins,total,fsAward};
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
 const bar=n=>`<svg viewBox="0 0 100 100"><g filter="url(#ds)">${Array.from({length:n},(_,i)=>{const h=n===1?34:n===2?26:21,gap=4,tot=n*h+(n-1)*gap,y=50-tot/2+i*(h+gap);return `<rect x="10" y="${y}" width="80" height="${h}" rx="6" fill="#111" stroke="url(#gG)" stroke-width="3"/><text x="50" y="${y+h*.78}" text-anchor="middle" font-family="${F}" font-size="${h*.8}" fill="#fff">BAR</text>`}).join('')}</g></svg>`;
 const seven=g=>`<svg viewBox="0 0 100 100"><text x="50" y="88" text-anchor="middle" font-family="${F}" font-size="96" fill="url(#${g})" stroke="url(#gG)" stroke-width="5" paint-order="stroke" filter="url(#ds)">7</text></svg>`;
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
 const ball=(g,e,s=64,ring='')=>`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="url(#${g})" ${ring||'stroke="#fff6" stroke-width="3"'}/><ellipse cx="38" cy="28" rx="18" ry="9" fill="#fff" opacity=".25"/><g filter="url(#ds)">${emo(e,s,50+s*.36)}</g></svg>`;
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

return {list:[EG,BF,LK,PD,PG],byId:{egypt:EG,buffalo:BF,lucky:LK,panda:PD,piggy:PG},coinSVG,short,emo,EF};
})();
if(typeof module!=='undefined')module.exports=GAMES;
