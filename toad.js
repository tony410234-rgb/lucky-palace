/* 태율랜드 — 황금 두꺼비 88 (클래식 3릴 + 배수 릴) */
(()=>{
if(typeof GAMES==='undefined')return;
const K0='#2a0606';
const rg=(id,c,cx=.5,cy=.38,r=.72)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${c.map((x,i)=>`<stop offset="${(i/(c.length-1)).toFixed(2)}" stop-color="${x}"/>`).join('')}</radialGradient>`;
const lg=(id,c,x1=0,y1=0,x2=0,y2=1)=>`<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${c.map((x,i)=>`<stop offset="${(i/(c.length-1)).toFixed(2)}" stop-color="${x}"/>`).join('')}</linearGradient>`;
let n=0;const uid=p=>'t'+p+(++n);
const BLK="'Arial Black','Arial Bold',Arial,sans-serif";

/* ============ 심볼 ============ */
const C88={r:['#ffb0a0','#ff3a2a','#c00a0a','#5a0202'],g:['#c8ff9a','#4ae02a','#139a10','#043a04'],b:['#b8dcff','#3a8aff','#1a3ad0','#06104a']};
function e88(k){const c=C88[k],a=uid('a'),h=uid('h');
 const ring=(cx,cy,rx,ry)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${c[3]}" stroke-width="21"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="url(#${a})" stroke-width="16"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${c[0]}" stroke-width="2.5" stroke-dasharray="4 5" opacity=".7"/><path d="M${cx-rx+1} ${cy-3}a${rx} ${ry} 0 0 1 ${rx*.9} ${-ry+2}" fill="none" stroke="#fff" stroke-width="3" opacity=".75" stroke-linecap="round"/>`;
 const eight=x=>ring(x,30,15,13.5)+ring(x,66,19,19);
 const sh=x=>`<ellipse cx="${x}" cy="30" rx="15" ry="13.5" fill="none" stroke="#000" stroke-width="19"/><ellipse cx="${x}" cy="66" rx="19" ry="19" fill="none" stroke="#000" stroke-width="19"/>`;
 return `<svg viewBox="12 4 118 92"><defs>${lg(a,[c[0],c[1],c[2]],0,0,.4,1)}</defs><g opacity=".3" transform="translate(2 4)">${sh(44)}${sh(96)}</g>${eight(44)}${eight(96)}</svg>`}
const BARC={1:['#9aff7a','#18c018','#0a5a0a'],2:['#9ad0ff','#2a7aff','#0a2a8a'],3:['#ff9a8a','#ff2a1a','#8a0404']};
function bar(nb){const c=BARC[nb],a=uid('b');const h=nb===1?32:nb===2?27:23,gap=3,tot=nb*h+(nb-1)*gap;
 let s='';for(let i=0;i<nb;i++){const y=50-tot/2+i*(h+gap);
  s+=`<rect x="10" y="${y+2.5}" width="120" height="${h}" rx="4" fill="#000" opacity=".45"/><rect x="10" y="${y}" width="120" height="${h}" rx="4" fill="#0a0a0a" stroke="${c[1]}" stroke-width="3"/><rect x="14" y="${y+3}" width="112" height="${h-6}" rx="2" fill="none" stroke="${c[2]}" stroke-width="1.5"/>
  <text x="70" y="${y+h*.78}" text-anchor="middle" font-family="${BLK}" font-weight="900" font-size="${h*.8}" letter-spacing="4" fill="url(#${a})" stroke="${c[2]}" stroke-width="1" font-style="italic">BAR</text>`}
 return `<svg viewBox="6 8 128 84"><defs>${lg(a,[c[0],c[1],c[1]])}</defs>${s}</svg>`}
function wild(){const r=uid('w'),g=uid('w'),t=uid('w');return `<svg viewBox="0 0 100 100"><defs>${rg(r,['#ff6a4a','#e01a0a','#8a0202','#3a0000'],.5,.35,.75)}${lg(g,['#fffbe0','#ffd34d','#c88a08','#6a4002'])}${lg(t,['#fffbe0','#ffe04a','#ffa010'])}</defs>
 <ellipse cx="50" cy="55" rx="46" ry="31" fill="#000" opacity=".35"/><ellipse cx="50" cy="51" rx="46" ry="31" fill="url(#${g})"/><ellipse cx="50" cy="51" rx="41" ry="26.5" fill="url(#${r})" stroke="#5a0202" stroke-width="1.5"/>
 <path d="M18 38q32-18 64 0" stroke="#ff9a7a" stroke-width="3" fill="none" opacity=".6"/>
 <g font-family="'Noto Serif KR','Noto Serif CJK KR',serif" font-weight="900" font-size="11" fill="url(#${g})" text-anchor="middle"><text x="50" y="35">百搭</text></g>
 <text x="50" y="66" text-anchor="middle" font-family="${BLK}" font-weight="900" font-size="25" fill="url(#${t})" stroke="#6a0000" stroke-width="5" paint-order="stroke">WILD</text></svg>`}
function jackpot(){const o=uid('j'),g=uid('j'),t=uid('j');return `<svg viewBox="0 0 100 100"><defs>${lg(o,['#ffe08a','#ff9a1a','#d05a04'])}${lg(g,['#fffbe0','#ffd34d','#a86a08'])}${lg(t,['#ff4a3a','#c00a0a','#6a0000'])}</defs>
 <rect x="6" y="20" width="88" height="62" rx="4" fill="#000" opacity=".35" transform="translate(1.5 3)"/><rect x="6" y="20" width="88" height="62" rx="4" fill="url(#${g})"/><rect x="10" y="24" width="80" height="54" rx="2" fill="url(#${o})" stroke="#8a3a02" stroke-width="1.5"/>
 <g fill="none" stroke="#c04a04" stroke-width="1.6" opacity=".7"><path d="M14 28h10v6M86 28h-10v6M14 74h10v-6M86 74h-10v-6"/><path d="M22 34q6 4 0 8M78 34q-6 4 0 8M22 60q6 4 0 8M78 60q-6 4 0 8"/></g>
 <text x="50" y="58" text-anchor="middle" font-family="'Times New Roman',serif" font-weight="900" font-size="16" letter-spacing="-.5" fill="url(#${t})" stroke="#ffe8a0" stroke-width="3.5" paint-order="stroke">JACKPOT</text></svg>`}
const MC={2:['#d8ff9a','#4ae02a','#0a6a0a'],3:['#fff79a','#b8e02a','#3a6a04'],4:['#b8f4ff','#2ab8ff','#0a3a8a'],5:['#b8e0ff','#3a7aff','#0a1a7a'],8:['#ffd0a0','#ff4a1a','#8a0a00'],10:['#f0c0ff','#b04aff','#3a066a'],28:['#ffe0a0','#ff7a1a','#7a1a00'],88:['#fffbd0','#ffd31a','#9a4a00']};
function mult(v){const c=MC[v],a=uid('m'),bg=uid('m'),fr=uid('m'),fs=v>=10?40:50;return `<svg viewBox="0 0 100 100"><defs>${lg(a,[c[0],c[1],c[1]])}${lg(bg,['#fffff4','#fff6d8','#f0dca8'])}${lg(fr,['#fff4b0','#ffc22a','#c07a04','#ffe080'])}</defs>
 <rect x="5" y="5" width="90" height="90" rx="9" fill="url(#${fr})"/><rect x="10" y="10" width="80" height="80" rx="6" fill="url(#${bg})"/><rect x="10" y="10" width="80" height="80" rx="6" fill="none" stroke="#d8b060" stroke-width="1.5"/>
 <text x="50" y="${50+fs*.36}" text-anchor="middle" font-family="${BLK}" font-weight="900" font-style="italic" font-size="${fs}" fill="${c[2]}" transform="translate(2 3)" opacity=".5">${v}x</text>
 <text x="50" y="${50+fs*.36}" text-anchor="middle" font-family="${BLK}" font-weight="900" font-style="italic" font-size="${fs}" fill="url(#${a})" stroke="${c[2]}" stroke-width="3.5" paint-order="stroke">${v}x</text>
 <text x="50" y="${50+fs*.36}" text-anchor="middle" font-family="${BLK}" font-weight="900" font-style="italic" font-size="${fs}" fill="none" stroke="#fff" stroke-width="1" opacity=".55">${v}x</text></svg>`}
const EMPTY='<svg viewBox="0 0 100 100"></svg>';
const wide=(v,sc=1.12)=>v.replace('<svg viewBox="0 0 100 100">','<svg viewBox="-20 0 140 100">').replace(/(<\/defs>)([\s\S]*)(<\/svg>)$/,`$1<g transform="translate(50 50) scale(${sc}) translate(-50 -50)">$2</g>$3`);
const ART={X:EMPTY,J:wide(jackpot(),1.15),W:wide(wild(),1.2),r88:e88('r'),g88:e88('g'),b88:e88('b'),B3:bar(3),B2:bar(2),B1:bar(1)};
const MART={};[2,3,4,5,8,10,28,88].forEach(v=>MART[v]=mult(v));

/* ============ 황금 두꺼비 ============ */
const TOAD=(()=>{const g='tdG',d='tdD',e='tdE',h='tdH';
 const wart=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${g})" stroke="#9a5a04" stroke-width=".8"/><circle cx="${x-r*.3}" cy="${y-r*.3}" r="${r*.35}" fill="#fffbe0" opacity=".8"/>`;
 return `<svg viewBox="0 0 240 140"><defs>${rg(g,['#fffbe0','#ffe04a','#e0a010','#9a5a04'],.45,.3,.75)}${rg(d,['#ffe890','#d89a10','#7a4a02'],.5,.3,.8)}${rg(e,['#ffb0a0','#e0101a','#5a0004'],.4,.35,.7)}${lg(h,['#fff','#fff0'])}</defs>
 <ellipse cx="120" cy="128" rx="104" ry="10" fill="#000" opacity=".25"/>
 <path d="M28 120Q8 100 30 78Q52 70 60 92Z" fill="url(#${d})" stroke="#7a4a02" stroke-width="2"/><path d="M212 120Q232 100 210 78Q188 70 180 92Z" fill="url(#${d})" stroke="#7a4a02" stroke-width="2"/>
 <path d="M22 116q-8 4-6 10q10 2 20-2M218 116q8 4 6 10q-10 2-20-2" fill="url(#${g})" stroke="#7a4a02" stroke-width="2"/>
 <path d="M30 104Q28 46 80 36Q120 26 160 36Q212 46 210 104Q206 128 120 130Q34 128 30 104Z" fill="url(#${g})" stroke="#8a5004" stroke-width="2.5"/>
 ${wart(60,70,5)}${wart(76,56,4)}${wart(180,70,5)}${wart(164,56,4)}${wart(52,92,4)}${wart(188,92,4)}${wart(92,48,3)}${wart(148,48,3)}${wart(120,44,3.5)}${wart(70,104,3.5)}${wart(170,104,3.5)}
 <path d="M62 98Q120 120 178 98Q170 116 120 118Q70 116 62 98Z" fill="url(#${d})" stroke="#8a5004" stroke-width="2"/>
 <path d="M72 96Q120 108 168 96" stroke="#7a4a02" stroke-width="3" fill="none" stroke-linecap="round"/>
 <g><ellipse cx="88" cy="40" rx="19" ry="17" fill="url(#${g})" stroke="#8a5004" stroke-width="2.5"/><ellipse cx="88" cy="42" rx="11" ry="9" fill="url(#${e})" stroke="#3a0000" stroke-width="1.5"/><ellipse cx="88" cy="43" rx="5" ry="6" fill="#200"/><circle cx="85" cy="39" r="2.6" fill="#fff"/><path d="M70 36q18-14 36 0" stroke="#8a5004" stroke-width="4" fill="none" stroke-linecap="round"/></g>
 <g><ellipse cx="152" cy="40" rx="19" ry="17" fill="url(#${g})" stroke="#8a5004" stroke-width="2.5"/><ellipse cx="152" cy="42" rx="11" ry="9" fill="url(#${e})" stroke="#3a0000" stroke-width="1.5"/><ellipse cx="152" cy="43" rx="5" ry="6" fill="#200"/><circle cx="149" cy="39" r="2.6" fill="#fff"/><path d="M134 36q18-14 36 0" stroke="#8a5004" stroke-width="4" fill="none" stroke-linecap="round"/></g>
 <circle cx="112" cy="70" r="2.5" fill="#7a4a02"/><circle cx="128" cy="70" r="2.5" fill="#7a4a02"/>
 <path d="M44 70Q60 40 100 34" stroke="url(#${h})" stroke-width="6" fill="none" opacity=".7" stroke-linecap="round"/>
 <path d="M60 128Q40 124 46 112Q58 108 68 118ZM180 128Q200 124 194 112Q182 108 172 118Z" fill="url(#${d})" stroke="#7a4a02" stroke-width="2"/></svg>`})();
const COIN='<svg viewBox="0 0 100 100"><defs><radialGradient id="tcg" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fffbe0"/><stop offset=".45" stop-color="#ffd34d"/><stop offset=".85" stop-color="#c0800a"/><stop offset="1" stop-color="#6a4002"/></radialGradient></defs><circle cx="50" cy="50" r="44" fill="url(#tcg)" stroke="#7a4a02" stroke-width="4"/><circle cx="50" cy="50" r="33" fill="none" stroke="#a86a08" stroke-width="2.5"/><rect x="38" y="38" width="24" height="24" fill="#7a4a02" stroke="#5a3002" stroke-width="2"/><rect x="41" y="41" width="18" height="18" fill="#3a2002"/><path d="M22 36a30 30 0 0 1 20-16" stroke="#fff" stroke-width="5" fill="none" opacity=".7" stroke-linecap="round"/></svg>';

/* ============ 신전 무대 (1400×505) ============ */
const coinPile=()=>{let s='';const R=(a)=>{let x=Math.sin(a*12.9898)*43758.5453;return x-Math.floor(x)};let k=0;
 for(let row=0;row<5;row++){const y=148-row*13,half=300-row*52;const cnt=Math.round(half/16);
  for(let i=0;i<cnt;i++){k++;const x=700-half+(i+.5)*(2*half/cnt)+(R(k)-.5)*14,yy=y+(R(k+5)-.5)*8,rx=24+R(k+3)*9;
   s+=`<g transform="translate(${x.toFixed(1)} ${yy.toFixed(1)}) rotate(${((R(k+9)-.5)*50).toFixed(1)})"><ellipse rx="${rx}" ry="${rx*.45}" fill="#6a3a02"/><ellipse rx="${rx-2}" ry="${rx*.45-2}" fill="url(#tpC)"/><rect x="-5" y="-3" width="10" height="6" fill="#8a5a04"/><ellipse rx="${rx*.62}" ry="${rx*.26}" fill="none" stroke="#a86a08" stroke-width="1.6"/></g>`}}
 return s};
const tiles=()=>{let s='';for(let i=0;i<46;i++){const x=150+i*24.5;s+=`<path d="M${x} 46L${x+12} 46L${x+12+(x-700)*.22} 140L${x+(x-700)*.22} 140Z" fill="url(#tpT)" stroke="#0a1a5a" stroke-width="1.2"/>`}
 for(let j=0;j<5;j++){const y=56+j*18;s+=`<path d="M${200-j*14} ${y}H${1200+j*14}" stroke="#0a1a5a" stroke-width="2" opacity=".45"/>`}return s};
const STAGE=`<svg viewBox="0 0 1400 505" preserveAspectRatio="none"><defs>
${lg('tpT',['#8ac8ff','#2a6ae0','#0a2a8a'],0,0,1,0)}${lg('tpR',['#ff5a3a','#d0140a','#7a0202'])}${lg('tpR2',['#e0201a','#9a0606','#5a0202'])}${lg('tpG',['#fffbe0','#ffcc33','#a86a08'])}${rg('tpC',['#fffbe0','#ffd34d','#c0800a'],.4,.3,.8)}
${lg('tpP',['#9a0606','#ff3a2a','#c00a0a','#6a0202'],0,0,1,0)}${lg('tpF',['#7a0606','#4a0202'])}</defs>
<path d="M150 46H1250L1300 140H100Z" fill="#0a2a8a"/>${tiles()}
<path d="M140 40H1260" stroke="url(#tpR)" stroke-width="16" stroke-linecap="round"/><path d="M140 34H1260" stroke="#ff8a6a" stroke-width="3" opacity=".7"/>
${coinPile()}
<path d="M40 104Q90 140 220 140H1180Q1310 140 1360 104L1372 118Q1318 162 1180 162H220Q82 162 28 118Z" fill="url(#tpR)" stroke="#5a0202" stroke-width="3"/>
<path d="M40 104Q20 92 30 76Q40 92 58 96Z M1360 104Q1380 92 1370 76Q1360 92 1342 96Z" fill="url(#tpR)" stroke="#5a0202" stroke-width="3"/>
<rect x="190" y="150" width="1020" height="40" fill="url(#tpR2)" stroke="#4a0202" stroke-width="3"/><path d="M190 158H1210" stroke="url(#tpG)" stroke-width="3"/><path d="M190 184H1210" stroke="#ff7a5a" stroke-width="2" opacity=".6"/>
<rect x="150" y="180" width="72" height="325" fill="url(#tpP)" stroke="#4a0202" stroke-width="3"/><rect x="1178" y="180" width="72" height="325" fill="url(#tpP)" stroke="#4a0202" stroke-width="3"/>
<g fill="none" stroke="#ffcc33" stroke-width="2" opacity=".55"><path d="M162 230h48M162 240h48M1190 230h48M1190 240h48"/></g>
<rect x="258" y="176" width="884" height="326" rx="6" fill="url(#tpF)" stroke="#2a0000" stroke-width="4"/><rect x="264" y="182" width="872" height="314" rx="4" fill="none" stroke="#c0300a" stroke-width="3"/>
</svg>`;

/* ============ 배경 (하늘·구름) ============ */
const BG=(()=>{const cl=(x,y,s,c,o)=>`<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}"><path d="M-60 0q-10-34 24-36q6-28 40-22q24-20 52 2q30-6 34 22q28 4 24 34z" fill="${c}"/><path d="M-40-4q20-14 40 0q20-14 40 0" fill="none" stroke="#fff" stroke-width="5" opacity=".5"/></g>`;
 const sw=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-120 40Q-120-40-40-50Q40-60 60 0Q70 40 30 46Q0 50-4 24Q-6 6 14 8" fill="none" stroke="#2ab8a8" stroke-width="22" stroke-linecap="round"/><path d="M-120 40Q-120-40-40-50Q40-60 60 0Q70 40 30 46Q0 50-4 24Q-6 6 14 8" fill="none" stroke="#7af0d8" stroke-width="7" stroke-linecap="round" opacity=".8"/></g>`;
 return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs>${lg('tbS',['#0a2a8a','#1a5ad8','#3a9af0','#2a7ad0'])}${lg('tbC',['#3ad8c0','#0a8a8a'])}</defs><rect width="1600" height="900" fill="url(#tbS)"/>
 <g opacity=".35">${cl(200,200,2.4,'#8ac8ff',1)}${cl(1350,170,2.2,'#8ac8ff',1)}${cl(800,120,1.6,'#9ad0ff',1)}</g>
 <path d="M0 640Q200 560 400 640T800 640T1200 640T1600 640V900H0Z" fill="url(#tbC)" opacity=".9"/>
 ${sw(150,720,1.5)}${sw(1450,700,1.5)}${sw(520,790,1.2)}${sw(1080,800,1.3)}
 <path d="M0 760Q300 700 600 770T1200 770T1600 760V900H0Z" fill="#0a7a7a" opacity=".8"/></svg>`})();

/* ============ 엔진 ============ */
const pick=ws=>{let t=0;for(const w of ws)t+=w[1];let r=Math.random()*t;for(const w of ws){if((r-=w[1])<0)return w[0]}return ws[ws.length-1][0]};
const SYMW=[['J',1.1],['W',1.6],['r88',2],['g88',2.8],['b88',3.6],['B3',4],['B2',5],['B1',6]];
let seed=88;const srnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const spick=ws=>{let t=0;for(const w of ws)t+=w[1];let r=srnd()*t;for(const w of ws){if((r-=w[1])<0)return w[0]}return ws[ws.length-1][0]};
const strip=(len,wts)=>{const cnt={};let tot=0;for(const w of wts)tot+=w[1];const a=[];for(const [k,w] of wts){const n=Math.max(1,Math.round(w/tot*len));for(let i=0;i<n;i++)a.push(k)}
 for(let i=a.length-1;i>0;i--){const j=Math.floor(srnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
 for(let k=0;k<4;k++)for(let i=1;i<a.length;i++)if(a[i]===a[i-1]){const j=Math.floor(srnd()*a.length);[a[i],a[j]]=[a[j],a[i]]}return a};
const REELS=[strip(30,SYMW),strip(30,SYMW),strip(30,SYMW)];const HALF=.47,MHALF=.5;let FSHALF=.2;
const MW=[[2,30],[3,22],[4,15],[5,11],[8,7],[10,4.5],[28,1.6],[88,.45]];
const MWF=[[2,24],[3,22],[4,18],[5,14],[8,10],[10,7],[28,3],[88,1]];

const PAY={r88:100,g88:50,b88:30,B3:25,B2:15,B1:10};
let KM=.44;const JPX=1000;
const S88=['r88','g88','b88'],SBAR=['B1','B2','B3'];
const stopOf=(st,i)=>st[(i+st.length)%st.length];
function mcol(fs){const w=fs?MWF:MW;return [{s:'M',v:pick(w)},{s:'M',v:pick(w)},{s:'M',v:pick(w)}]}
function lineVal(cs){
 if(cs.some(x=>x.s==='X'))return 0;
 if(cs.every(x=>x.s==='J'))return 'JP';
 if(cs.some(x=>x.s==='J'))return 0;
 const nw=cs.filter(x=>x.s!=='W');
 if(!nw.length)return 200;
 const t=nw[0].s;
 if(nw.every(x=>x.s===t))return PAY[t];
 if(nw.every(x=>S88.includes(x.s)))return 8;
 if(nw.every(x=>SBAR.includes(x.s)))return 4;
 return 1.5;
}
const T88={id:'toad',name:'황금 두꺼비 88',en:'GOLDEN TOAD 88',sub:'클래식 3릴 · 배수 릴 최대 88배 · 잭팟',hero:'🐸',badge:'NEW',font:"Bungee,sans-serif",
 cols:4,rows:3,mode:'reels',classic:true,lines:[[1,1,1,1]],ART,MART,TOAD,COIN,STAGE,BG,custom:true,
 boost:false,boostX:1.5,buyX:100,fsN:20,
 draw:x=>x.s==='M'?(x.v?MART[x.v]:EMPTY):ART[x.s],
 fill:(c,fs)=>c===3?{s:'M',v:pick(fs?MWF:MW)}:{s:pick(SYMW)},
 antic:g=>[false,false,false,!!(T88._last&&T88._last.pre>0)],
 fsInit:n=>({left:n}),
 spin(fs,st){
  const g=REELS.map(r=>{const i=Math.floor(Math.random()*r.length);return [stopOf(r,i-1),stopOf(r,i),stopOf(r,i+1)].map(s=>({s}))});
  g.push(mcol(fs));
  const half=[0,1,2].map(()=>Math.random()<(fs?FSHALF:HALF));half.push(fs||T88.boost?false:Math.random()<MHALF);
  const cs=[0,1,2].map(c=>half[c]?{s:'X'}:g[c][1]),m=half[3]?1:g[3][1].v;
  const v=lineVal(cs);const wins=[];let total=0,jackpot=false;
  if(v==='JP'){jackpot=true;total=JPX;wins.push({li:0,amt:total,cells:[[0,1],[1,1],[2,1]]})}
  else if(v>0){total=v*KM*m;wins.push({li:0,amt:total,cells:[[0,1],[1,1],[2,1]].concat(m>1?[[3,1]]:[])})}
  const pre=v&&v!=='JP'?v:0;T88._last={pre};
  return {grid:g,wins,total,fsAward:0,mult:m,jackpot,half,coins:total>0?(m>=8?5:m>1?2.5:1.5):0};
 },
 setK:v=>{KM=v},setFH:v=>{FSHALF=v},
 paytable:{rules:['가운데 줄 1라인 · 오른쪽 배수 릴이 당첨금에 곱해져요 (최대 88배)','빨강 88 x3 = 100배 · 초록 88 x3 = 50배 · 파랑 88 x3 = 30배','아무 88 3개 = 8배 · BAR3 x3 = 25 · BAR2 x3 = 15 · BAR1 x3 = 10 · 아무 BAR = 4 · 아무 심볼 3개 = 1.5','WILD는 잭팟을 뺀 모든 심볼 대체 · WILD x3 = 200배','JACKPOT x3 = 잭팟!','당첨될 때마다 동전이 황금 두꺼비에게 날아가요. 두꺼비 게이지가 100%가 되면 프리게임 20회 (배수 릴이 항상 멈춰요)','부스트: 베팅 1.5배로 배수 릴 빈칸이 사라져요']}
};

/* ============ 화면 장착 · 크기 · 당첨 연출 ============ */
const AR=1400/505;
T88.say=(txt,kind)=>{const st=document.querySelector('#game .stage'),e=document.createElement('div');e.className='tx csay'+(kind==='lose'?' lose':'');e.textContent=txt;e.style.left='58%';e.style.top='2%';st.appendChild(e);setTimeout(()=>e.remove(),1900)};
T88.costMul=()=>T88.boost?T88.boostX:1;
T88.preReels=(o,A)=>{A.reels.forEach((r,c)=>r.classList.toggle('half',!!(o.half&&o.half[c])))};
T88.mount=A=>{
 const st=document.querySelector('#game .stage');
 st.insertAdjacentHTML('afterbegin',`<img class="tx tbg" alt="" src="${A.U(STAGE)}"><div class="tx tglowd"></div><img class="tx ttoad" id="ttoad" alt="" src="${A.U(TOAD)}">
 <div class="tx tjp"><b>JACKPOT</b><span class="num" id="tjpv">0</span></div>
 <div class="tx tmeter" id="tmeter"><i></i><span>0%</span></div>
 <button class="tx tbst" id="tbst"><b>부스트 구매</b><small>한 가지 옵션</small><span class="sw"><em></em></span></button>
 <button class="tx tbuy" id="tbuy"><b>프리게임<br>구입</b><span id="tbuyv">1만</span></button>`);
 A.box.insertAdjacentHTML('beforeend','<i class="tx tarw l"></i><i class="tx tarw r"></i>');
 document.getElementById('tbst').onclick=()=>{if(A.busy||A.free)return;T88.boost=!T88.boost;document.getElementById('tbst').classList.toggle('on',T88.boost);A.sfx('click');A.toast(T88.boost?`부스트 ON · 베팅 x${T88.boostX} · 배수 릴 빈칸 없음`:'부스트 OFF',1400)};
 document.getElementById('tbst').classList.toggle('on',T88.boost);
 document.getElementById('ttoad').onclick=e=>{e.stopPropagation();A.loveTap&&A.loveTap(e.currentTarget)};
 document.getElementById('tbuy').onclick=()=>{if(A.busy||A.free)return;A.buyFS()};
 T88.onBet(A);T88.meter(A);
};
T88.onBet=A=>{const b=A.bet(),v=document.getElementById('tjpv'),p=document.getElementById('tbuyv');if(v)v.textContent=A.fmt(b*JPX);if(p)p.textContent=A.short(b*T88.buyX)};
T88.meter=A=>{const m=document.getElementById('tmeter');if(!m)return;const v=Math.min(100,Math.round(A.S.toadM||0));m.firstElementChild.style.width=v+'%';m.lastElementChild.textContent=`황금 두꺼비 ${v}%`};
T88.size=A=>{
 const gm=document.querySelector('#game .gmain'),ctl=document.querySelector('#game .ctl'),st=document.querySelector('#game .stage');
 const H=gm.clientHeight-(ctl?ctl.offsetHeight:0)-2,W=gm.clientWidth;
 let w=Math.min(W,H*AR),h=w/AR;w=Math.floor(w);h=Math.floor(h);
 st.style.width=w+'px';st.style.height=h+'px';
 const bh=h*.618-10;const c=Math.max(30,Math.floor(bh/2.4));
 A.box.style.gridTemplateColumns='repeat(3,minmax(0,1fr)) minmax(0,.86fr)';
 return c;
};
T88.post=async(o,b,A)=>{
 if(!A.free&&!o.jackpot)A.S.tjp=(A.S.tjp||0);
 if(!(o.total>0))return;
 const reels=A.reels,mc=reels[3]&&reels[3].firstElementChild.children[1];
 let from=reels[1].getBoundingClientRect();
 if(o.mult>1&&mc){mc.classList.add('tglow');A.sfx('tmult');from=mc.getBoundingClientRect();await A.sleep(A.T(380,200))}
 const toad=document.getElementById('ttoad');if(!toad)return;const tr=toad.getBoundingClientRect();
 const tx=tr.left+tr.width*.5,ty=tr.top+tr.height*.55,sx=from.left+from.width/2,sy=from.top+from.height/2;
 const N=Math.min(14,4+Math.round(Math.log2(1+o.total)*2)),src=A.U(COIN),glow=document.querySelector('.tglowd');
 for(let i=0;i<N;i++){const im=document.createElement('img');im.src=src;im.className='tcoin';im.alt='';document.body.appendChild(im);
  const ox=sx+(Math.random()-.5)*40,oy=sy+(Math.random()-.5)*30,mx=(ox+tx)/2+(Math.random()-.5)*120,my=Math.min(oy,ty)-30-Math.random()*60;
  const an=im.animate([{transform:`translate(${ox}px,${oy}px) scale(.4) rotateY(0deg)`,opacity:0},{transform:`translate(${ox}px,${oy-20}px) scale(1.1) rotateY(180deg)`,opacity:1,offset:.15},{transform:`translate(${mx}px,${my}px) scale(1) rotateY(540deg)`,offset:.6},{transform:`translate(${tx}px,${ty}px) scale(.5) rotateY(900deg)`,opacity:.9}],{duration:A.T(760,460)+i*35,delay:i*55,easing:'ease-in'});
  an.onfinish=()=>{im.remove();A.sfx('tcoin');toad.classList.remove('tpulse');void toad.offsetWidth;toad.classList.add('tpulse');if(glow)glow.animate([{opacity:0},{opacity:1,offset:.3},{opacity:0}],{duration:520})}}
 await A.sleep(A.T(760,460)+N*90);
 A.AUDIO.voice&&A.AUDIO.voice('croak');
 if(mc)setTimeout(()=>mc.classList.remove('tglow'),900);
 if(!A.free){A.S.toadM=(A.S.toadM||0)+o.coins;T88.meter(A);
  if(A.S.toadM>=100){A.S.toadM=0;o.fsAward=20;A.save();setTimeout(()=>T88.meter(A),400)}}
};
GAMES.list.unshift(T88);GAMES.byId.toad=T88;
if(typeof CHARS!=='undefined'){CHARS.toad=`<svg viewBox="0 -18 200 240"><g transform="translate(-20 50) scale(1)">${TOAD.replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</g></svg>`;if(CHARS.__hero)CHARS.__hero.toad=1}
if(typeof ICONS!=='undefined')ICONS['🐸']=`<svg x="0" y="0" width="100" height="100" viewBox="0 0 240 140">${TOAD.replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</svg>`;
if(typeof DECOR!=='undefined'){const o={svg:DECOR.svg,pano:DECOR.pano,fx:DECOR.fx,get:DECOR.get};
 DECOR.svg=id=>id==='toad'?BG:o.svg(id);DECOR.pano=id=>id==='toad'?BG:o.pano(id);DECOR.fx=id=>id==='toad'?'':o.fx(id);
 DECOR.get=id=>id==='toad'?{m:'🐸',pl:[],pr:[],orn:['',''],fx:['✦','twk',0,'#fff'],win:['개굴! 돈이 들어온다!','황금 두꺼비가 웃어요'],big:['개굴개굴 대박!!','두꺼비가 부자로 만들어줘요!!'],lose:['개굴…'],idle:['개굴']}:o.get(id);}
})();
