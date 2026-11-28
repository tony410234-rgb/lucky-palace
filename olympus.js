/* 태율랜드 — 신규 게임: 올림푸스 여신 (6×5 텀블 · 배수 오브 · 슈퍼 프리게임) */
(()=>{
if(typeof GAMES==='undefined')return;
const K='#2a0f18';
const O=`stroke="${K}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;
const rg=(id,c,cx=.5,cy=.38,r=.72)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${c.map((x,i)=>`<stop offset="${(i/(c.length-1)).toFixed(2)}" stop-color="${x}"/>`).join('')}</radialGradient>`;
const lg=(id,c,x1=0,y1=0,x2=0,y2=1)=>`<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${c.map((x,i)=>`<stop offset="${(i/(c.length-1)).toFixed(2)}" stop-color="${x}"/>`).join('')}</linearGradient>`;
const mir=s=>`<g transform="translate(200 0) scale(-1 1)">${s}</g>`;
const GOLD=['#fffbe0','#ffd34d','#c88a08','#7a4a02'];

/* ================= 여신 캐릭터 ================= */
const feather=(x,y,a,l,w)=>`<path d="M0 0Q${w} ${-l*.45} 0 ${-l}Q${-w} ${-l*.45} 0 0Z" transform="translate(${x} ${y}) rotate(${a})" fill="url(#oWg)" stroke="#9a5a08" stroke-width="1.4"/>`;
const wing=()=>{let s='';const F=[[-70,96,26],[-56,104,26],[-42,108,26],[-28,104,24],[-14,96,22],[0,84,20],[14,70,18],[28,56,16],[42,44,14]];
 F.forEach(([a,l,w],i)=>{s+=feather(78,104-i*1.5,a-8,l,w)});
 [[-60,62,16],[-40,66,16],[-20,60,14],[0,50,12],[20,40,10]].forEach(([a,l,w])=>{s+=feather(76,98,a,l,w)});return s};
const goddess=`<svg viewBox="0 -18 200 240"><defs>
${lg('oWg',['#fffbe0','#ffcf5a','#e8901a'],0,1,0,0)}${lg('oGd',GOLD)}${lg('oGd2',['#fff6c0','#ffc22a','#a86a08'],0,0,1,1)}
${rg('oSk',['#fff4ec','#ffd8c8','#e8a894'],.45,.35,.75)}${lg('oHr',['#c03a5a','#8a1a3a','#4a0820'])}${lg('oDr',['#ffffff','#f0eaff','#c8bce8'])}
${rg('oEy',['#e8fff8','#3ad0c0','#0a6a7a','#043038'],.45,.35,.7)}${lg('oPl',['#ff6a5a','#d01a2a','#6a040a'])}${rg('oSh',['#fff6c0','#ffc22a','#b8740a','#5a3002'],.4,.35,.75)}
${rg('oAu',['#fff8d0','#ffe07a','rgba(255,200,80,0)'],.5,.45,.6)}</defs>
<ellipse cx="100" cy="214" rx="70" ry="7" fill="#000" opacity=".35"/>
<circle cx="100" cy="80" r="110" fill="url(#oAu)" opacity=".7"/>
${wing()}${mir(wing())}
<path d="M62 60Q54 120 60 176Q80 186 100 180Q120 186 140 176Q146 120 138 60Z" fill="url(#oHr)" ${O}/>
<path d="M72 150Q66 180 74 206L126 206Q134 180 128 150Z" fill="url(#oDr)" ${O}/>
<path d="M74 168Q100 176 126 168M72 186Q100 196 128 186" stroke="#c8bce8" stroke-width="1.6" fill="none"/>
<path d="M66 150Q100 162 134 150L132 166Q100 178 68 166Z" fill="url(#oGd)" ${O}/>
<path d="M74 166l4 16 6-14 6 18 6-18 4 16 4-16 6 18 6-18 6 14 4-16" fill="url(#oGd2)" ${O}/>
<rect x="80" y="202" width="14" height="12" rx="4" fill="url(#oGd)" ${O}/><rect x="106" y="202" width="14" height="12" rx="4" fill="url(#oGd)" ${O}/>
<path d="M92 96h16v14H92z" fill="url(#oSk)" ${O}/>
<path d="M70 110Q100 100 130 110Q136 132 130 152Q100 162 70 152Q64 132 70 110Z" fill="url(#oGd)" ${O}/>
<path d="M84 116Q92 130 100 132Q108 130 116 116" stroke="#9a5a08" stroke-width="2" fill="none"/><path d="M78 140Q100 148 122 140" stroke="#9a5a08" stroke-width="2" fill="none"/>
<circle cx="100" cy="124" r="5" fill="#e0203a" stroke="#fff3b0" stroke-width="2"/>
<path d="M56 108Q62 98 76 102L80 120Q66 124 56 118Z" fill="url(#oGd2)" ${O}/><path d="M144 108Q138 98 124 102L120 120Q134 124 144 118Z" fill="url(#oGd2)" ${O}/>
<path d="M60 118Q50 140 54 160" stroke="url(#oSk)" stroke-width="11" stroke-linecap="round" fill="none"/><path d="M60 118Q50 140 54 160" stroke="${K}" stroke-width="13.5" stroke-linecap="round" fill="none" opacity=".0"/>
<path d="M44 -10L44 212" stroke="#8a5a2a" stroke-width="5" stroke-linecap="round"/><path d="M44 -10L44 212" stroke="#c89a5a" stroke-width="2" stroke-linecap="round"/>
<path d="M44 -18L36 4L44 0L52 4Z" fill="url(#oGd2)" ${O}/><circle cx="44" cy="8" r="4" fill="#3ad0c0" stroke="#fff3b0" stroke-width="1.5"/>
<rect x="44" y="154" width="14" height="10" rx="5" fill="url(#oSk)" ${O} transform="translate(-6 0)"/>
<circle cx="156" cy="152" r="34" fill="url(#oSh)" ${O}/><circle cx="156" cy="152" r="26" fill="none" stroke="#9a5a08" stroke-width="2"/><circle cx="156" cy="152" r="10" fill="url(#oGd2)" stroke="#9a5a08" stroke-width="2"/>
<g stroke="#9a5a08" stroke-width="1.6" fill="none">${Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2;return `<path d="M${156+Math.cos(a)*12} ${152+Math.sin(a)*12}L${156+Math.cos(a)*24} ${152+Math.sin(a)*24}"/>`}).join('')}</g>
<path d="M130 122q8 2 12 14" stroke="url(#oSk)" stroke-width="10" stroke-linecap="round" fill="none"/>
<path d="M76 50Q74 92 100 102Q126 92 124 50Q124 24 100 24Q76 24 76 50Z" fill="url(#oSk)" ${O}/>
<path d="M74 44Q70 80 66 104Q76 96 80 70Z" fill="url(#oHr)" ${O}/><path d="M126 44Q130 80 134 104Q124 96 120 70Z" fill="url(#oHr)" ${O}/>
<path d="M76 46Q80 58 90 54Q94 62 100 52Q106 62 110 54Q120 58 124 46Q118 36 100 36Q82 36 76 46Z" fill="url(#oHr)" ${O}/>
<g><path d="M82 66q7-6 14 0" stroke="${K}" stroke-width="2.6" fill="none" stroke-linecap="round"/><ellipse cx="89" cy="71" rx="5.4" ry="7" fill="url(#oEy)" stroke="${K}" stroke-width="1.4"/><ellipse cx="89" cy="72" rx="2.6" ry="3.6" fill="#03222a"/><circle cx="87.2" cy="68.8" r="1.9" fill="#fff"/><circle cx="91" cy="75" r=".9" fill="#fff"/><path d="M81 64l-3-2M83 63l-2-3" stroke="${K}" stroke-width="1.4" stroke-linecap="round"/><path d="M83 58q6-3 12-1" stroke="#6a1a2a" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>
<g transform="translate(200 0) scale(-1 1)"><path d="M82 66q7-6 14 0" stroke="${K}" stroke-width="2.6" fill="none" stroke-linecap="round"/><ellipse cx="89" cy="71" rx="5.4" ry="7" fill="url(#oEy)" stroke="${K}" stroke-width="1.4"/><ellipse cx="89" cy="72" rx="2.6" ry="3.6" fill="#03222a"/><circle cx="91" cy="68.8" r="1.9" fill="#fff"/><circle cx="87.6" cy="75" r=".9" fill="#fff"/><path d="M81 64l-3-2M83 63l-2-3" stroke="${K}" stroke-width="1.4" stroke-linecap="round"/><path d="M83 58q6-3 12-1" stroke="#6a1a2a" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>
<ellipse cx="84" cy="82" rx="5" ry="2.6" fill="#ff7a9a" opacity=".45"/><ellipse cx="116" cy="82" rx="5" ry="2.6" fill="#ff7a9a" opacity=".45"/>
<path d="M99 78q1 3 2.5 3" stroke="#c8806a" stroke-width="1.4" fill="none" stroke-linecap="round"/>
<path d="M94 87q6 4 12 0q-3 4-6 4t-6-4z" fill="#e0506a" stroke="#8a2034" stroke-width="1"/>
<path d="M72 46Q72 16 100 12Q128 16 128 46Q120 34 100 32Q80 34 72 46Z" fill="url(#oGd)" ${O}/>
<path d="M76 42Q100 30 124 42L124 48Q100 38 76 48Z" fill="url(#oGd2)" ${O}/><circle cx="100" cy="38" r="3.5" fill="#3ad0c0" stroke="#fff3b0" stroke-width="1.5"/>
<path d="M86 16Q92 -14 128 -12Q112 -6 118 6Q104 2 100 14Z" fill="url(#oPl)" ${O}/>
<path d="M74 38Q56 30 50 16Q62 22 66 18Q64 28 76 30Z" fill="url(#oWg)" stroke="#9a5a08" stroke-width="1.6"/><path d="M126 38Q144 30 150 16Q138 22 134 18Q136 28 124 30Z" fill="url(#oWg)" stroke="#9a5a08" stroke-width="1.6"/>
<path d="M80 20Q92 14 104 16" stroke="#fff" stroke-width="2.5" fill="none" opacity=".6" stroke-linecap="round"/>
</svg>`;
if(typeof CHARS!=='undefined'){CHARS.olympus=goddess;if(CHARS.__hero)CHARS.__hero.olympus=1}
if(typeof ICONS!=='undefined'){const inner=goddess.slice(goddess.indexOf('>')+1,goddess.lastIndexOf('</svg>'));ICONS['👸']=`<svg x="0" y="0" width="100" height="100" viewBox="18 -16 164 150">${inner}</svg>`}

/* ================= 심볼 ================= */
let n=0;const uid=p=>p+(++n);
const gem=(shape,c)=>{const a=uid('g'),b=uid('g');const P={
 dia:'M50 10L86 50L50 90L14 50Z',tri:'M50 10L88 82L12 82Z',inv:'M12 18L88 18L50 90Z',hex:'M30 14L70 14L90 50L70 86L30 86L10 50Z',pen:'M50 10L90 40L74 88L26 88L10 40Z'}[shape];
 const in_={dia:'M50 26L70 50L50 74L30 50Z',tri:'M50 34L68 70L32 70Z',inv:'M32 30L68 30L50 66Z',hex:'M38 30L62 30L72 50L62 70L38 70L28 50Z',pen:'M50 28L72 44L64 70L36 70L28 44Z'}[shape];
 return `<svg viewBox="0 0 100 100"><defs>${lg(a,['#fffbe0','#ffcc33','#8a5004'],0,0,1,1)}${rg(b,c,.4,.3,.8)}</defs><ellipse cx="50" cy="95" rx="26" ry="3.5" fill="#000" opacity=".35"/><g filter="url(#ds)"><path d="${P}" fill="url(#${a})" stroke="#5a3002" stroke-width="2" stroke-linejoin="round" transform="translate(50 50) scale(1.06) translate(-50 -50)"/><path d="${P}" fill="url(#${b})" stroke="#fff8" stroke-width="1.5" stroke-linejoin="round" transform="translate(50 50) scale(.92) translate(-50 -50)"/><path d="${in_}" fill="#fff" opacity=".28"/><path d="${in_}" fill="none" stroke="#fff" stroke-width="1.5" opacity=".6"/><path d="M30 30l8-8" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/></g></svg>`};
const medal=(bg,inner)=>{const a=uid('m'),b=uid('m');return `<svg viewBox="0 0 100 100"><defs>${lg(a,['#fffbe0','#ffd34d','#a86a08','#ffe58a','#5a3002'],0,0,1,1)}${rg(b,bg,.5,.35,.7)}</defs><ellipse cx="50" cy="96" rx="30" ry="3.5" fill="#000" opacity=".4"/><circle cx="50" cy="51" r="45" fill="#000" opacity=".4"/><circle cx="50" cy="49" r="45" fill="url(#${a})"/><circle cx="50" cy="49" r="39" fill="url(#${b})" stroke="#2a0a04" stroke-width="2"/><circle cx="50" cy="49" r="39" fill="url(#vig)"/><g filter="url(#ds)">${inner}</g><path d="M22 30a33 33 0 0 1 40-16" stroke="#fff" stroke-width="4" fill="none" opacity=".45" stroke-linecap="round"/></svg>`};
const GD=(id)=>lg(id,['#fffbe0','#ffcc33','#b8740a','#6a4002']);
const scroll=()=>{const g=uid('s');return `<defs>${GD(g)}</defs><path d="M24 34Q50 26 76 34L72 70Q50 62 28 70Z" fill="#f4e4b0" ${O}/><g stroke="#b89a5a" stroke-width="1.6"><path d="M34 42h32M34 50h30M34 58h26"/></g><rect x="16" y="26" width="12" height="50" rx="6" fill="url(#${g})" ${O} transform="rotate(-10 22 51)"/><rect x="72" y="26" width="12" height="50" rx="6" fill="url(#${g})" ${O} transform="rotate(-10 78 51)"/><path d="M40 70q4 10 10 12M60 68q2 8-2 14" stroke="#d01a2a" stroke-width="3" fill="none"/>`};
const vase=()=>{const g=uid('v');return `<defs>${GD(g)}</defs><path d="M30 24Q50 16 70 24Q62 30 64 40Q80 52 72 72Q64 84 50 84Q36 84 28 72Q20 52 36 40Q38 30 30 24Z" fill="url(#${g})" ${O}/><path d="M30 54Q50 62 70 54" stroke="#7a4a02" stroke-width="2" fill="none"/><path d="M34 62Q50 70 66 62" stroke="#7a4a02" stroke-width="2" fill="none"/><path d="M36 40q-12-2-12 12M64 40q12-2 12 12" stroke="url(#${g})" stroke-width="5" fill="none"/><path d="M44 20q2-10 6-14q4 4 6 14" fill="#e07aff" opacity=".9"/><ellipse cx="40" cy="50" rx="4" ry="9" fill="#fff" opacity=".5"/>`};
const helm=()=>{const g=uid('h'),r=uid('h');return `<defs>${GD(g)}${lg(r,['#ff6a5a','#d01a2a','#6a040a'])}</defs><path d="M30 18Q48 2 70 10Q58 14 60 24Q46 18 34 28Z" fill="url(#${r})" ${O}/><path d="M24 56Q24 24 50 22Q76 24 76 56L70 78L58 74L58 54Q50 50 42 54L42 74L30 78Z" fill="url(#${g})" ${O}/><path d="M24 44Q8 36 4 22Q16 30 20 26Q18 36 26 40Z" fill="#fff3c0" stroke="#9a5a08" stroke-width="1.5"/><path d="M76 44Q92 36 96 22Q84 30 80 26Q82 36 74 40Z" fill="#fff3c0" stroke="#9a5a08" stroke-width="1.5"/><path d="M34 32q16-8 30 0" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>`};
const crown=()=>{const g=uid('c');return `<defs>${GD(g)}</defs><path d="M16 70L12 30L32 48L50 18L68 48L88 30L84 70Z" fill="url(#${g})" ${O}/><rect x="14" y="68" width="72" height="14" rx="4" fill="url(#${g})" ${O}/><circle cx="50" cy="52" r="7" fill="#e0203a" stroke="#fff3b0" stroke-width="2"/><circle cx="30" cy="60" r="4.5" fill="#3ad0c0" stroke="#fff3b0" stroke-width="1.5"/><circle cx="70" cy="60" r="4.5" fill="#3ad0c0" stroke="#fff3b0" stroke-width="1.5"/><circle cx="12" cy="28" r="4" fill="#fff3b0"/><circle cx="50" cy="16" r="4" fill="#fff3b0"/><circle cx="88" cy="28" r="4" fill="#fff3b0"/>`};
const scatterArt=(()=>{const g=uid('z'),b=uid('z');return `<svg viewBox="0 0 100 100"><defs>${GD(g)}${rg(b,['#fff6c0','#7ad8ff','#2a5ad0','#0a1a5a'],.5,.4,.7)}</defs><ellipse cx="50" cy="96" rx="30" ry="3.5" fill="#000" opacity=".4"/>
 <path d="M50 2L60 14L76 8L78 24L94 28L86 42L96 54L82 62L84 78L68 76L58 92L50 82L42 92L32 76L16 78L18 62L4 54L14 42L6 28L22 24L24 8L40 14Z" fill="url(#${g})" stroke="#5a3002" stroke-width="2" stroke-linejoin="round"/>
 <circle cx="50" cy="48" r="28" fill="url(#${b})" stroke="#5a3002" stroke-width="2"/><path d="M56 26L40 52L50 52L44 72L62 44L52 44Z" fill="#fffbe0" stroke="#c88a08" stroke-width="2" stroke-linejoin="round"/>
 <rect x="8" y="76" width="84" height="18" rx="5" fill="#2a0a5a" stroke="url(#${g})" stroke-width="2"/><text x="50" y="90" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="13" fill="url(#${g})" stroke="#10002a" stroke-width="2.5" paint-order="stroke">SCATTER</text></svg>`})();
const ORBC={2:['#c8ffd0','#2ad05a','#064a1a'],5:['#c8f0ff','#2a8aff','#06205a'],10:['#f0d0ff','#b04bff','#2a0660'],25:['#ffe0c0','#ff7a1a','#5a1a00'],100:['#fff0a0','#ff2a44','#5a0010']};
const orbCol=m=>m>=100?ORBC[100]:m>=25?ORBC[25]:m>=10?ORBC[10]:m>=5?ORBC[5]:ORBC[2];
const orb=m=>{const a=uid('b'),c=orbCol(m),fz=m>=100?26:m>=10?32:36;return `<svg viewBox="0 0 100 100"><defs>${rg(a,['#ffffff',...c],.4,.32,.75)}</defs><circle cx="50" cy="50" r="46" fill="${c[1]}" opacity=".35"/><g filter="url(#ds)"><circle cx="50" cy="50" r="38" fill="url(#${a})" stroke="#fff" stroke-width="3"/><path d="M30 30a26 26 0 0 1 22-10" stroke="#fff" stroke-width="5" fill="none" opacity=".8" stroke-linecap="round"/><path d="M50 8L54 20L50 16L46 20Z M50 92L54 80L50 84L46 80Z M8 50L20 54L16 50L20 46Z M92 50L80 54L84 50L80 46Z" fill="#fff" opacity=".9"/><text x="50" y="${50+fz*.36}" text-anchor="middle" font-family="'Arial Black',Arial,sans-serif" font-weight="900" font-size="${fz}" fill="#fff" stroke="${c[2]}" stroke-width="4" paint-order="stroke">${m}x</text></g></svg>`};
const ART={cro:medal(['#ff9a8a','#d0202a','#4a0208'],crown()),hel:medal(['#9ad0ff','#2a5ad0','#081a5a'],helm()),vas:medal(['#e0a8ff','#7a2ad0','#26064a'],vase()),scr:medal(['#a8f0a0','#2a9a4a','#063a18'],scroll()),
 rub:gem('pen',['#ffd0c0','#ff3a2a','#8a0404']),top:gem('hex',['#fffbd0','#ffd31a','#a87004']),ame:gem('inv',['#ffd0ff','#d03aff','#5a066a']),eme:gem('tri',['#d0ffd8','#2ad05a','#06601a']),sap:gem('dia',['#d8f4ff','#2aa0ff','#063a8a']),
 S:scatterArt,B:orb(2)};
const orbCache={};

/* ================= 엔진 ================= */
const pick=ws=>{let t=0;for(const w of ws)t+=w[1];let r=Math.random()*t;for(const w of ws){if((r-=w[1])<0)return w[0]}return ws[ws.length-1][0]};
const WT={cro:2.2,hel:3,vas:4,scr:5,rub:7,top:8,ame:9,eme:10,sap:11,S:1.12};
const WTL=Object.entries(WT);
const PAY={cro:[10,25,50],hel:[2.5,10,25],vas:[2,5,15],scr:[1.5,2,12],rub:[1,1.5,10],top:[.8,1.2,8],ame:[.5,1,5],eme:[.4,.9,4],sap:[.25,.75,2]};
let KM=.8,PB=.0055,PF=.024,PS=.05;
const ORBS=[[2,30],[3,22],[4,16],[5,12],[6,9],[8,7],[10,5],[12,3.2],[15,2.6],[20,2],[25,1.4],[50,.6],[100,.25],[250,.06],[500,.02]];
const cell=(fs,st)=>{const p=fs?(st&&st.sup?PS:PF):PB;if(Math.random()<p)return {s:'B',m:pick(ORBS)};return {s:pick(WTL)}};
const cellsOf=(g,s)=>{const o=[];g.forEach((col,c)=>col.forEach((x,r)=>{if(x.s===s)o.push([c,r])}));return o};
const evalG=g=>{const cnt={};g.forEach((col,c)=>col.forEach((x,r)=>{if(PAY[x.s])(cnt[x.s]=cnt[x.s]||[]).push([c,r])}));
 const w=[];for(const s in cnt){const n=cnt[s].length;if(n>=8){const t=n>=12?2:n>=10?1:0;w.push({s,n,amt:PAY[s][t]*KM,cells:cnt[s]})}}return w};
const F="Cinzel,serif";
const LB=(t,y,fs)=>`<text x="50" y="${y}" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="${fs}" fill="#fff" stroke="#2a0a40" stroke-width="3.5" paint-order="stroke">${t}</text>`;
const OL={id:'olympus',name:'올림푸스 여신',en:'OLYMPUS',sub:'6×5 텀블 · 배수 오브 · 슈퍼 프리게임',hero:'👸',badge:'NEW',font:F,
 cols:6,rows:5,mode:'tumble',ART,multName:"여신의 배수",superBuy:true,buyX:80,superX:150,
 draw:x=>x.s==='B'?(orbCache[x.m]||(orbCache[x.m]=orb(x.m))):ART[x.s],
 fill:(c,fs,st)=>cell(fs,st),
 fsInit:(n,sup)=>({left:n,mult:0,sup:!!sup}),
 spin(fs,st){
  let g=Array.from({length:6},()=>Array.from({length:5},()=>cell(fs,st)));
  const steps=[];
  for(let guard=0;guard<40;guard++){
   const wins=evalG(g);steps.push({grid:g.map(c=>c.slice()),wins,win:wins.reduce((a,w)=>a+w.amt,0)});
   if(!wins.length)break;
   const rm=new Set(wins.flatMap(w=>w.cells.map(([c,r])=>c*10+r)));
   g=g.map((col,c)=>{const keep=col.filter((x,r)=>!rm.has(c*10+r));return [...Array.from({length:5-keep.length},()=>cell(fs,st)),...keep]});
  }
  const base=steps.reduce((a,s)=>a+s.win,0);let total=base,fsAward=0,bm=0;
  const sc=cellsOf(g,'S').length,bombs=cellsOf(g,'B').map(([c,r])=>[c,r,g[c][r].m]);
  if(bombs.length&&base>0){const sum=bombs.reduce((a,b)=>a+b[2],0);
   if(fs&&st){st.mult+=sum;bm=st.mult}else bm=sum;total=base*bm}
  let scWin=0;
  if(!fs&&sc>=4){scWin=sc>=6?100:sc===5?5:3;fsAward=15}
  if(fs&&sc>=3)fsAward=5;
  total+=scWin;
  return {grid:g,steps,base,bombs,bm,scWin,total,fsAward,scCells:cellsOf(g,'S')};
 },
 setK:v=>{KM=v},setP:(b,f,s)=>{PB=b;PF=f;PS=s},
 paytable:{tumble:PAY,order:['cro','hel','vas','scr','rub','top','ame','eme','sap'],rules:['같은 심볼 8개 이상이면 위치 상관없이 당첨 (8-9 / 10-11 / 12+)','당첨 심볼은 터지고 위에서 새로 떨어짐 → 연쇄 당첨','여신의 배수 오브(x2~x500): 당첨된 스핀에 오브 숫자를 더해서 곱하기','⚡ 스캐터 4/5/6개 → x3/x5/x100 + 프리게임 15회','프리게임 중 배수 오브는 계속 누적! 슈퍼 프리게임은 오브가 2배 자주 나와요']}
};
GAMES.list.unshift(OL);GAMES.byId.olympus=OL;
})();
