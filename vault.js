/* 태율랜드 — 머니 볼트 (5×4 · 50라인 · 금고 3개: 초록=프리게임 · 보라=배수 · 빨강=잭팟) */
(()=>{
if(typeof GAMES==='undefined')return;
const rg=(id,c,cx=.5,cy=.38,r=.72)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${c.map((x,i)=>`<stop offset="${(i/(c.length-1)).toFixed(2)}" stop-color="${x}"/>`).join('')}</radialGradient>`;
const lg=(id,c,x1=0,y1=0,x2=0,y2=1)=>`<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${c.map((x,i)=>`<stop offset="${(i/(c.length-1)).toFixed(2)}" stop-color="${x}"/>`).join('')}</linearGradient>`;
let n=0;const uid=p=>'v'+p+(++n);
const K='#120818',O=`stroke="${K}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;
const GOLD=['#fffbe0','#ffd34d','#c88a08','#6a4002'];

/* ---------- 타일 틀 ---------- */
const tileBox=(bg,inner,frame=null)=>{const a=uid('t'),f=uid('t');return `<svg viewBox="0 0 170 100"><defs>${rg(a,bg,.5,.4,.8)}${lg(f,frame||['#ffffff55','#ffffff11'])}</defs><rect x="3" y="4" width="166" height="94" rx="8" fill="#000" opacity=".45"/><rect x="2" y="2" width="166" height="94" rx="8" fill="url(#${a})" stroke="${bg[bg.length-1]}" stroke-width="2.5"/><rect x="5" y="5" width="160" height="88" rx="6" fill="none" stroke="url(#${f})" stroke-width="2.5"/><g transform="translate(85 49) scale(1.12) translate(-50 -50)">${inner}</g><path d="M10 10q60-7 150 0" stroke="#fff" stroke-width="2" opacity=".25" fill="none"/></svg>`};

/* ---------- 고급 심볼 ---------- */
const yacht=()=>{const h=uid('y'),w=uid('y');return `<defs>${lg(h,['#ffffff','#e8f0ff','#a8b8d8'])}${lg(w,['#ffffff','#bfe4ff','#ffffff00'],0,0,1,0)}</defs>
 <path d="M4 70Q30 62 50 68Q70 74 96 66L96 80Q60 88 4 80Z" fill="url(#${w})" opacity=".9"/>
 <path d="M10 62L88 56Q84 68 70 72L22 74Q12 70 10 62Z" fill="url(#${h})" ${O}/><path d="M14 66L84 61" stroke="#1a4ad0" stroke-width="3"/>
 <path d="M26 58L34 44L66 42L78 56Z" fill="url(#${h})" ${O}/><path d="M38 47L62 46L66 52L36 54Z" fill="#1a2a5a"/><path d="M44 40L50 34L60 34L62 41Z" fill="url(#${h})" ${O}/>
 <path d="M4 74q20-6 40 2t50-2" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/><circle cx="12" cy="70" r="5" fill="#fff" opacity=".7"/><circle cx="6" cy="64" r="3" fill="#fff" opacity=".6"/>`};
const jet=()=>{const b=uid('j'),r=uid('j');return `<defs>${lg(b,['#ffffff','#f0f0f4','#a8a8b8'])}${lg(r,['#ff6a5a','#d0141a','#6a0006'])}</defs>
 <path d="M8 58Q12 48 30 46L82 40Q96 40 94 48Q92 54 80 56L28 64Q12 66 8 58Z" fill="url(#${b})" ${O}/>
 <path d="M80 42L92 22L98 24L92 46Z" fill="url(#${r})" ${O}/><path d="M42 56L60 78L70 78L62 54Z" fill="url(#${r})" ${O}/><path d="M48 46L58 36L66 36L62 44Z" fill="url(#${b})" ${O}/>
 <path d="M12 56L84 46" stroke="#d0141a" stroke-width="3"/><g fill="#1a2a5a"><circle cx="40" cy="51" r="2.2"/><circle cx="48" cy="50" r="2.2"/><circle cx="56" cy="49" r="2.2"/><circle cx="64" cy="48" r="2.2"/></g><path d="M14 52q4-4 10-5" stroke="#1a2a5a" stroke-width="3" stroke-linecap="round"/>`};
const heli=()=>{const p=uid('h');return `<defs>${lg(p,['#e0a8ff','#9a3ae0','#4a0a7a'])}</defs>
 <path d="M14 30H86" stroke="#2a0a3a" stroke-width="4" stroke-linecap="round"/><path d="M50 30V40" stroke="#2a0a3a" stroke-width="4"/>
 <path d="M24 56Q24 40 46 40Q66 40 70 54L94 50L94 56L70 62Q60 72 40 72Q24 70 24 56Z" fill="url(#${p})" ${O}/>
 <path d="M30 52Q32 44 44 44L46 56Z" fill="#cfe8ff" ${O}/><path d="M30 78H70M38 72V78M60 72V78" stroke="#2a0a3a" stroke-width="3.5" stroke-linecap="round"/>
 <path d="M92 44V60" stroke="#2a0a3a" stroke-width="3"/><path d="M36 46q4-4 8-3" stroke="#fff" stroke-width="2.5" opacity=".7"/>`};
const car=()=>{const g=uid('c');return `<defs>${lg(g,['#a8ffb0','#2ab84a','#06501a'])}</defs>
 <path d="M8 66Q8 54 20 52L30 38Q34 34 46 34H62Q70 34 74 42L80 52Q94 54 94 64L94 70H8Z" fill="url(#${g})" ${O}/>
 <path d="M34 40Q36 38 46 38H52V52H28Z" fill="#cfe8ff" ${O}/><path d="M56 38H62Q68 38 70 44L74 52H56Z" fill="#cfe8ff" ${O}/>
 <circle cx="26" cy="72" r="10" fill="#1a1a1a" ${O}/><circle cx="26" cy="72" r="4.5" fill="#c8c8d0"/><circle cx="76" cy="72" r="10" fill="#1a1a1a" ${O}/><circle cx="76" cy="72" r="4.5" fill="#c8c8d0"/>
 <path d="M10 60h8M84 60h8" stroke="#ffe88a" stroke-width="4" stroke-linecap="round"/><path d="M22 54q10-4 20-2" stroke="#fff" stroke-width="2.5" opacity=".6" fill="none"/>`};
const diamond=()=>{const a=uid('d'),b=uid('d');return `<defs>${lg(a,['#ffffff','#e0f0ff','#9ac8ff'],0,0,1,1)}${lg(b,['#b8e0ff','#6a9aff','#e8d8ff'],1,0,0,1)}</defs>
 <path d="M24 32L38 20H62L76 32L50 84Z" fill="url(#${a})" stroke="#4a6ab0" stroke-width="2" stroke-linejoin="round"/>
 <path d="M24 32H76M38 20L44 32L50 20L56 32L62 20M44 32L50 84L56 32" stroke="#6a8ad0" stroke-width="1.5" fill="none"/>
 <path d="M24 32L44 32L50 84Z" fill="url(#${b})" opacity=".55"/><path d="M62 20L76 32H56Z" fill="#fff" opacity=".8"/>
 <path d="M80 18l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#fff"/><path d="M18 56l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff" opacity=".9"/>`};
/* ---------- 미스터 머니 (WILD) ---------- */
const money=()=>{const s=uid('m'),f=uid('m'),h=uid('m');return `<defs>${rg(s,['#fff0e4','#ffcfb0','#e8a080'],.45,.4,.7)}${lg(f,['#c8c8d4','#8a8a9a','#5a5a6a'])}${rg(h,['#ffffff','#eceaf4','#b8b4c8'],.4,.3,.8)}</defs>
 <path d="M10 96Q14 76 50 74Q86 76 90 96Z" fill="url(#${f})" ${O}/><path d="M38 76L50 92L62 76Z" fill="#fff" ${O}/><path d="M46 80L50 86L54 80L50 76Z" fill="#c0101a"/>
 <ellipse cx="50" cy="48" rx="25" ry="28" fill="url(#${s})" ${O}/>
 <path d="M26 40Q16 44 18 56Q20 66 30 64Q24 54 28 44Z" fill="url(#${h})" ${O}/><path d="M74 40Q84 44 82 56Q80 66 70 64Q76 54 72 44Z" fill="url(#${h})" ${O}/>
 <path d="M34 24Q50 14 66 24" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>
 <path d="M33 38Q40 31 47 37" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M53 37Q60 31 67 38" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
 <path d="M33 38Q40 31 47 37M53 37Q60 31 67 38" stroke="#9a9aa8" stroke-width="1" fill="none"/>
 <path d="M36 46q5-4 9 0" stroke="${K}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M55 46q5-4 9 0" stroke="${K}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
 <ellipse cx="34" cy="56" rx="6" ry="4" fill="#ff7a8a" opacity=".55"/><ellipse cx="66" cy="56" rx="6" ry="4" fill="#ff7a8a" opacity=".55"/>
 <ellipse cx="50" cy="56" rx="7.5" ry="6.5" fill="#ff8a7a" ${O}/><ellipse cx="47" cy="54" rx="2.5" ry="1.8" fill="#fff" opacity=".7"/>
 <path d="M50 62Q42 60 34 64Q24 70 18 62Q20 74 34 72Q44 70 50 66Q56 70 66 72Q80 74 82 62Q76 70 66 64Q58 60 50 62Z" fill="url(#${h})" ${O}/>
 <path d="M44 72q6 3 12 0" stroke="#8a2a2a" stroke-width="2" fill="none" stroke-linecap="round"/>`};
/* ---------- 금고 문 (심볼·상단 공통) ---------- */
const VC={g:['#8aff9a','#18b03a','#06501a','#022a0a'],p:['#e8a8ff','#9a2ae0','#4a0a7a','#22043a'],r:['#ff9a8a','#e0141a','#7a0408','#3a0002']};
const wheel=(cx,cy,r,gid)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="url(#${gid})" stroke-width="${r*.22}"/>${Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return `<path d="M${cx+Math.cos(a)*r*.25} ${cy+Math.sin(a)*r*.25}L${cx+Math.cos(a)*r*1.18} ${cy+Math.sin(a)*r*1.18}" stroke="url(#${gid})" stroke-width="${r*.16}" stroke-linecap="round"/><circle cx="${cx+Math.cos(a)*r*1.22}" cy="${cy+Math.sin(a)*r*1.22}" r="${r*.13}" fill="url(#${gid})"/>`}).join('')}<circle cx="${cx}" cy="${cy}" r="${r*.32}" fill="url(#${gid})" stroke="#6a4002" stroke-width="1"/>`;
const coinPile=(x,y,w,rows)=>{let s='';for(let r=0;r<rows;r++){const cnt=Math.max(1,Math.round(w/9)-r);for(let i=0;i<cnt;i++){const cx=x+(i+.5+r*.5)*9,cy=y-r*6;s+=`<ellipse cx="${cx}" cy="${cy}" rx="5.5" ry="2.6" fill="#8a5004"/><ellipse cx="${cx}" cy="${cy-1}" rx="5.2" ry="2.3" fill="#ffd34d"/>`}}return s};
function vaultDoor(col,open=1){const d=uid('v'),g=uid('v'),fr=uid('v'),c=VC[col];
 const sx=open?0.55:1;
 return {defs:`${rg(d,c,.45,.4,.75)}${lg(g,GOLD,0,0,1,1)}${lg(fr,['#fff6c0','#ffcc33','#c07a04','#ffe080','#a86a08'],0,0,1,1)}`,d,g,fr,sx}}
function vaultSym(col){const v=vaultDoor(col);return `<svg viewBox="0 0 170 100"><defs>${v.defs}</defs><rect x="3" y="4" width="166" height="94" rx="8" fill="#000" opacity=".45"/>
 <rect x="2" y="2" width="166" height="94" rx="8" fill="url(#${v.fr})" stroke="#6a4002" stroke-width="2"/><rect x="12" y="10" width="146" height="78" rx="5" fill="#6a3a02" opacity=".5"/>
 <circle cx="98" cy="49" r="36" fill="#a86a08"/><circle cx="98" cy="49" r="31" fill="#1a0a02"/>${coinPile(72,78,56,4)}
 <g transform="translate(62 49) scale(.55 1)"><ellipse cx="0" cy="0" rx="40" ry="38" fill="url(#${v.d})" stroke="#2a1a02" stroke-width="3"/><ellipse cx="0" cy="0" rx="34" ry="32" fill="none" stroke="url(#${v.g})" stroke-width="3"/>${wheel(0,0,14,v.g)}</g>
 <path d="M14 12q60-7 140 0" stroke="#fff" stroke-width="2.5" opacity=".5" fill="none"/></svg>`}
/* 상단 금고 (가로 150×140) — 문 + 동전더미(레이어 분리) */
function vaultTop(col){const v=vaultDoor(col);return `<svg viewBox="0 0 150 140"><defs>${v.defs}${rg('vin'+col,['#3a1a02','#140600'],.5,.5,.6)}</defs>
 <rect x="4" y="8" width="142" height="130" rx="10" fill="#000" opacity=".4"/><rect x="2" y="4" width="146" height="130" rx="10" fill="url(#${v.fr})" stroke="#6a4002" stroke-width="3"/>
 <rect x="12" y="14" width="126" height="110" rx="6" fill="#6a3a02" opacity=".45"/><circle cx="88" cy="69" r="50" fill="#a86a08"/><circle cx="88" cy="69" r="44" fill="url(#vin${col})"/></svg>`}
function vaultDoorTop(col){const v=vaultDoor(col);return `<svg viewBox="0 0 150 140"><defs>${v.defs}</defs><g transform="translate(42 69) scale(.55 1)"><ellipse cx="0" cy="0" rx="58" ry="58" fill="#2a1a02"/><ellipse cx="0" cy="-2" rx="56" ry="56" fill="url(#${v.d})" stroke="#2a1a02" stroke-width="4"/><ellipse cx="0" cy="-2" rx="48" ry="48" fill="none" stroke="url(#${v.g})" stroke-width="5"/>${wheel(0,-2,20,v.g)}<path d="M-40-36a54 54 0 0 1 40-18" stroke="#fff" stroke-width="5" opacity=".5" fill="none" stroke-linecap="round"/></g></svg>`}
const PILE=(()=>{let o='';const R=a=>{let x=Math.sin(a*12.9898)*43758.5453;return x-Math.floor(x)};let k=0;for(let r=0;r<6;r++){const y=56-r*8,half=48-r*7;for(let x=50-half;x<=50+half;x+=12){k++;const cx=x+(R(k)-.5)*4,cy=y+(R(k+3)-.5)*3;o+=`<ellipse cx="${cx}" cy="${cy}" rx="9" ry="4.2" fill="#6a3a02"/><ellipse cx="${cx}" cy="${cy-1}" rx="8.6" ry="3.8" fill="#ffd34d"/><ellipse cx="${cx-1}" cy="${cy-1.6}" rx="5" ry="1.6" fill="#fff3b0" opacity=".7"/>`}}return `<svg viewBox="0 0 100 60">${o}</svg>`})();
/* ---------- 로열 ---------- */
const ROY={A:['#ff9aff','#e01ab0','#5a0640'],K:['#ffe08a','#ff9a1a','#7a3a00'],Q:['#fff08a','#ffc21a','#7a5000'],J:['#9ad0ff','#2a6aff','#06206a'],T:['#ff9a8a','#e0201a','#5a0004'],N:['#a8ff8a','#2ac02a','#064a06']};
function royal(k){const c=ROY[k],a=uid('r');const t=k==='T'?'10':k==='N'?'9':k;const fs=t.length>1?44:54;
 const deco=k==='K'?`<path d="M38 20L42 28L50 18L58 28L62 20L60 32H40Z" fill="#ffd34d" stroke="#7a4a02" stroke-width="1.5"/>`:k==='Q'?`<path d="M66 64q6-6 10 0q4-6 10 0q0 8-10 14q-10-6-10-14z" fill="#ff2a4a" stroke="#6a0010" stroke-width="1.5"/>`:k==='A'?`<path d="M44 76L50 70L56 76L50 82Z" fill="#3ad0ff" stroke="#06306a" stroke-width="1.5"/>`:'';
 return `<svg viewBox="0 0 100 100"><defs>${lg(a,[c[0],c[1],c[1]])}</defs><text x="50" y="${52+fs*.36}" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-weight="900" font-size="${fs}" fill="#000" opacity=".4" transform="translate(2 3)">${t}</text><text x="50" y="${52+fs*.36}" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-weight="900" font-size="${fs}" fill="url(#${a})" stroke="${c[2]}" stroke-width="3" paint-order="stroke">${t}</text>${deco}</svg>`}
const ART={
 Y:tileBox(['#4a8aff','#1a3ab0','#0a1450'],yacht()),Jt:tileBox(['#ff6a6a','#b0141a','#4a0206'],jet()),H:tileBox(['#c87aff','#6a1ab0','#26064a'],heli()),Cr:tileBox(['#6aff8a','#1a8a3a','#06301a'],car()),D:tileBox(['#ffa8ff','#c03ad0','#4a0a5a'],diamond()),
 W:tileBox(['#ff5a4a','#c00a0a','#5a0004'],money(),['#ffe08a','#c08a10']),
 A:royal('A'),K:royal('K'),Q:royal('Q'),J:royal('J'),T:royal('T'),N:royal('N'),
 Vg:vaultSym('g'),Vp:vaultSym('p'),Vr:vaultSym('r')};

/* ---------- 무대 (1400×505) ---------- */
const STAGE=(()=>{const bulbs=y=>Array.from({length:22},(_,i)=>`<circle cx="${300+i*38}" cy="${y}" r="4" fill="#fff6c0"/><circle cx="${300+i*38}" cy="${y}" r="7" fill="#ffd34d" opacity=".35"/>`).join('');
 return `<svg viewBox="0 0 1400 505" preserveAspectRatio="none"><defs>${lg('vsF',['#fff3b0','#ffc22a','#c07a04','#ffe080','#a86a08'])}${lg('vsP',['#a86a08','#ffe080','#ffc22a','#fff3b0','#ffc22a','#c07a04'],0,0,1,0)}${lg('vsR',['#0a1440','#141e5a','#0a1440'])}</defs>
 <rect x="262" y="150" width="876" height="355" fill="url(#vsR)"/>
 <rect x="250" y="140" width="900" height="22" rx="4" fill="url(#vsF)" stroke="#6a4002" stroke-width="2"/>${bulbs(151)}
 <rect x="258" y="156" width="52" height="349" fill="url(#vsP)" stroke="#6a4002" stroke-width="2"/><rect x="1090" y="156" width="52" height="349" fill="url(#vsP)" stroke="#6a4002" stroke-width="2"/>
 <g fill="#6a4002" opacity=".5"><rect x="266" y="166" width="36" height="8" rx="2"/><rect x="1098" y="166" width="36" height="8" rx="2"/></g>
 ${[['#1a3ab0',284],['#1a3ab0',1116]].map(([c,x])=>`<g transform="translate(${x} 330)"><path d="M-18-30L0-40L18-30V30L0 40L-18 30Z" fill="${c}" stroke="#ffe080" stroke-width="3"/><text y="9" text-anchor="middle" font-family="'Arial Black',sans-serif" font-weight="900" font-size="22" fill="#fff" transform="rotate(90)">50</text></g>`).join('')}
 </svg>`})();
/* ---------- 배경: 라스베이거스 야경 ---------- */
const BG=(()=>{const R=a=>{let x=Math.sin(a*12.9898)*43758.5453;return x-Math.floor(x)};
 let city='';for(let i=0;i<40;i++){const x=i*42+R(i)*20,w=30+R(i+1)*40,h=120+R(i+2)*260,c=['#3a0a5a','#5a1a7a','#2a0a4a','#6a1a6a'][i%4];city+=`<rect x="${x}" y="${900-h-80}" width="${w}" height="${h}" fill="${c}"/>`;for(let k=0;k<h/14;k++)for(let j=0;j<w/10;j++)if(R(i*97+k*7+j)>.55)city+=`<rect x="${x+3+j*10}" y="${900-h-74+k*14}" width="5" height="6" fill="${R(k+j)>.5?'#ffd8ff':'#ffb84a'}" opacity=".85"/>`}
 let bok='';for(let i=0;i<70;i++)bok+=`<circle cx="${R(i+300)*1600}" cy="${400+R(i+400)*450}" r="${4+R(i+500)*16}" fill="${['#ff6ad5','#ffb84a','#ff4a8a','#c86aff','#fff0a0'][i%5]}" opacity="${.25+R(i+600)*.4}"/>`;
 const eiffel=`<g transform="translate(150 820)"><path d="M-70 0L-14-420H14L70 0H40L8-330H-8L-40 0Z" fill="#ffb84a" opacity=".85"/><path d="M-50-140H50M-34-250H34" stroke="#ffd88a" stroke-width="8"/><path d="M-6-420L0-470L6-420Z" fill="#fff0c0"/><path d="M-70 0L-14-420H14L70 0" fill="none" stroke="#fff0c0" stroke-width="3" opacity=".7"/></g>`;
 return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs>${lg('vbS',['#1a0430','#4a0a6a','#a01a8a','#ff5aa0'])}${rg('vbG',['#ff8ad0','#ff3aa000'],.5,.9,.6)}</defs><rect width="1600" height="900" fill="url(#vbS)"/><rect width="1600" height="900" fill="url(#vbG)" opacity=".6"/>${city}${eiffel}${bok}<rect y="820" width="1600" height="80" fill="#2a0630"/></svg>`})();

/* ---------- 엔진 ---------- */
const pick=ws=>{let t=0;for(const w of ws)t+=w[1];let r=Math.random()*t;for(const w of ws){if((r-=w[1])<0)return w[0]}return ws[ws.length-1][0]};
const HI=['Y','Jt','H','Cr','D'];
const WT=[['Y',3],['Jt',3.4],['H',3.8],['Cr',4.2],['D',4.6],['A',7],['K',7.4],['Q',8],['J',8.4],['T',9],['N',9.4],['W',1.5]];
const VP={g:.0045,p:.006,r:.0042};
const PAY={W:[25,100,500],Y:[20,60,200],Jt:[15,50,150],H:[12,40,120],Cr:[10,30,100],D:[8,25,80],A:[5,15,50],K:[5,15,50],Q:[4,10,30],J:[4,10,30],T:[3,8,25],N:[3,8,25]};
const LINES=(()=>{const L=[[0,0,0,0,0],[1,1,1,1,1],[2,2,2,2,2],[3,3,3,3,3]];let sd=50;const rnd=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};
 const seen=new Set(L.map(x=>x.join()));const pats=[[0,1,2,1,0],[3,2,1,2,3],[1,2,3,2,1],[2,1,0,1,2],[0,0,1,2,3],[3,3,2,1,0],[1,0,0,0,1],[2,3,3,3,2],[0,1,1,1,0],[3,2,2,2,3],[1,1,0,1,1],[2,2,3,2,2]];
 for(const p of pats){L.push(p);seen.add(p.join())}
 while(L.length<50){let r=Math.floor(rnd()*4);const p=[r];for(let i=1;i<5;i++){r=Math.max(0,Math.min(3,r+[-1,0,1][Math.floor(rnd()*3)]));p.push(r)}if(!seen.has(p.join())){seen.add(p.join());L.push(p)}}return L})();
let KM=5.6;
function cell(fs){const r=Math.random();let a=0;for(const c of ['g','p','r']){a+=VP[c]*(fs&&c==='g'?.5:1);if(r<a)return {s:'V'+c}}return {s:pick(WT)}}
function col(fs){const c=Array.from({length:4},()=>cell(fs));
 if(Math.random()<.16){const s=HI[Math.floor(Math.random()*HI.length)],len=2+Math.floor(Math.random()*3),st=Math.floor(Math.random()*(5-len));for(let i=st;i<st+len&&i<4;i++)if(c[i].s[0]!=='V')c[i]={s}}return c}
function evalLines(g){const wins=[];LINES.forEach((L,li)=>{const cs=L.map((r,c)=>g[c][r]);let s=null;for(const x of cs){if(x.s!=='W'&&x.s[0]!=='V'){s=x.s;break}}
  if(cs[0].s[0]==='V')return;if(!s)s='W';let k=0;for(const x of cs){if(x.s===s||x.s==='W')k++;else break}
  let wk=0;for(const x of cs){if(x.s==='W')wk++;else break}
  let amt=k>=3?PAY[s][k-3]:0,ws=s,kk=k;if(wk>=3&&PAY.W[wk-3]>amt){amt=PAY.W[wk-3];ws='W';kk=wk}
  if(amt>0)wins.push({li,amt:amt*KM/50,cells:L.slice(0,kk).map((r,c)=>[c,r]),s:ws})});return wins}
const MV={id:'vault',name:'머니 볼트',en:'MONEY VAULTS',sub:'50라인 · 금고 3개 랜덤 폭발 · 프리게임·배수·잭팟',hero:'🏦',fsN:10,badge:'NEW',font:"Bungee,sans-serif",
 cols:5,rows:4,mode:'reels',lines:LINES,ART,STAGE,BG,custom:true,jp:true,
 draw:x=>ART[x.s],
 fill:(c,fs)=>cell(fs),
 antic:()=>[false,false,false,false,false],
 fsInit:n=>({left:n}),
 spin(fs){const g=Array.from({length:5},()=>col(fs));const wins=evalLines(g);if(fs)wins.forEach(w=>w.amt*=2);const total=wins.reduce((a,w)=>a+w.amt,0);
  const vl={g:[],p:[],r:[]};g.forEach((cc,c)=>cc.forEach((x,r)=>{if(x.s[0]==='V')vl[x.s[1]].push([c,r])}));
  return {grid:g,wins,total,fsAward:0,vl}},
 setK:v=>{KM=v},
 paytable:{rules:['50라인 · 왼쪽부터 같은 심볼 3·4·5개','미스터 머니(WILD)는 모든 심볼 대체 · WILD 5개 = 라인베팅 500배','요트 x5 = 200 · 제트기 150 · 헬기 120 · 클래식카 100 · 다이아 80','금고 심볼이 나오면 위 금고에 동전이 쌓여요. 쌓일수록 터질 확률이 올라가요','🟢 초록 금고 → 프리게임 10회 (모든 당첨 x2)','🟣 보라 금고 → 배수 보너스 (베팅 x3~x88)','🔴 빨강 금고 → 잭팟 픽 (MINI~GRAND)','금고 여러 개가 한 번에 터질 수도 있어요!']}
};

/* ---------- 금고 상태 · 폭발 확률 ---------- */
const BRATE={g:[.016,.13],p:[.014,.10],r:[.005,.04]};MV.BRATE=BRATE;
MV.burstCheck=(st,vl,rnd=Math.random)=>{const out=[];for(const c of ['g','p','r']){const k=vl[c].length;if(!k)continue;st[c]=Math.min(1,(st[c]||0)+.1*k);const p=BRATE[c][0]+BRATE[c][1]*st[c];if(rnd()<p){out.push(c);st[c]=0}}return out};
MV.forceFS=()=>{MV.forceBurst='g'};
MV.PMULT=[[3,24],[5,22],[8,16],[10,12],[15,9],[20,7],[30,5],[50,3],[88,1.2]];

/* ---------- 화면 장착 ---------- */
const AR=1400/505;
MV.mount=A=>{
 const st=document.querySelector('#game .stage');
 const plq=(t,cls,pos)=>`<div class="tx vplq ${cls}" style="${pos}"><b>${[...t].map(ch=>`<i>${ch}</i>`).join('')}</b><span class="num" data-t="${t}">0</span></div>`;
 const vt=(c,l)=>`<div class="tx vtop" id="vt${c}" style="left:${l}%"><img class="vbase" alt="" src="${A.U(vaultTop(c))}"><div class="vpile"><img alt="" src="${A.U(PILE)}"></div><img class="vdoor" alt="" src="${A.U(vaultDoorTop(c))}"><div class="vglow"></div></div>`;
 st.insertAdjacentHTML('afterbegin',`<img class="tx tbg" alt="" src="${A.U(STAGE)}">
 ${plq('GRAND','g','left:19.2%;top:3%')}${plq('MINOR','mi','left:19.2%;top:17%')}${plq('MAJOR','ma','left:66.9%;top:3%')}${plq('MINI','mn','left:66.9%;top:17%')}
 ${vt('p',33.5)}${vt('r',44.6)}${vt('g',55.7)}`);
 MV.onBet(A);MV.paint(A);
};
MV.onBet=A=>{const b=A.bet();document.querySelectorAll('.vplq .num').forEach(e=>e.textContent=A.fmt(A.jpVal(e.dataset.t,b)))};
MV.paint=A=>{const s=A.S.vaults||(A.S.vaults={g:0,p:0,r:0});for(const c of ['g','p','r']){const el=document.getElementById('vt'+c);if(!el)continue;el.querySelector('.vpile').style.transform=`scaleY(${.45+.55*(s[c]||0)})`;el.classList.toggle('hot',(s[c]||0)>=.6)}};
MV.size=A=>{
 const gm=document.querySelector('#game .gmain'),ctl=document.querySelector('#game .ctl'),st=document.querySelector('#game .stage');
 const H=gm.clientHeight-(ctl?ctl.offsetHeight:0)-2,W=gm.clientWidth;
 let w=Math.floor(Math.min(W,H*AR)),h=Math.floor(w/AR);st.style.width=w+'px';st.style.height=h+'px';
 A.box.style.gridTemplateColumns='repeat(5,minmax(0,1fr))';
 return Math.max(24,Math.floor((h*.66-8)/4));
};
async function fly(A,from,to,n,src){const tr=to.getBoundingClientRect(),tx=tr.left+tr.width*.55,ty=tr.top+tr.height*.55;
 for(let i=0;i<n;i++){const fr=from.getBoundingClientRect(),sx=fr.left+fr.width/2,sy=fr.top+fr.height/2;const im=document.createElement('img');im.src=src;im.className='tcoin';im.alt='';document.body.appendChild(im);
  const mx=(sx+tx)/2+(Math.random()-.5)*80,my=Math.min(sy,ty)-20-Math.random()*50;
  const an=im.animate([{transform:`translate(${sx}px,${sy}px) scale(.5)`,opacity:0},{transform:`translate(${sx}px,${sy-14}px) scale(1.15) rotateY(180deg)`,opacity:1,offset:.15},{transform:`translate(${mx}px,${my}px) scale(1) rotateY(540deg)`,offset:.6},{transform:`translate(${tx}px,${ty}px) scale(.55) rotateY(900deg)`,opacity:.9}],{duration:A.T(700,420)+i*30,delay:i*60,easing:'ease-in'});
  an.onfinish=()=>{im.remove();A.sfx('tcoin');to.classList.remove('bump');void to.offsetWidth;to.classList.add('bump')}}
 await A.sleep(A.T(700,420)+n*90)}
const COIN='<svg viewBox="0 0 100 100"><defs><radialGradient id="vcg" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fffbe0"/><stop offset=".45" stop-color="#ffd34d"/><stop offset=".85" stop-color="#c0800a"/><stop offset="1" stop-color="#6a4002"/></radialGradient></defs><circle cx="50" cy="50" r="44" fill="url(#vcg)" stroke="#7a4a02" stroke-width="4"/><text x="50" y="66" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="46" fill="#7a4503">$</text><path d="M22 36a30 30 0 0 1 20-16" stroke="#fff" stroke-width="5" fill="none" opacity=".7" stroke-linecap="round"/></svg>';
MV.post=async(o,b,A)=>{
 const s=A.S.vaults||(A.S.vaults={g:0,p:0,r:0});
 const any=o.vl.g.length+o.vl.p.length+o.vl.r.length;const fb=MV.forceBurst;MV.forceBurst=null;if(!any&&!fb)return;
 const src=A.U(COIN),strips=A.reels.map(r=>r.firstElementChild);
 for(const c of ['g','p','r'])for(const [cc,rr] of o.vl[c]){const cell=strips[cc]&&strips[cc].children[rr];if(!cell)continue;cell.classList.add('vland');A.sfx('tmult');
  await A.sleep(A.T(260,140));await fly(A,cell,document.getElementById('vt'+c),5,src);cell.classList.remove('vland')}
 const burst=MV.burstCheck(s,o.vl);if(fb&&!burst.includes(fb)){burst.push(fb);s[fb]=0}MV.paint(A);A.save();
 if(!burst.length)return;
 /* 폭발 연출 */
 burst.forEach(c=>document.getElementById('vt'+c).classList.add('boom'));A.sfx('boom');A.flash();A.shake();A.burst(burst.length*40);
 A.AUDIO.voice&&A.AUDIO.voice('roar');A.speak&&A.speak(burst.length>1?'더블 금고 폭발!':'금고 폭발!');A.announce&&A.announce('VAULT BONUS!',burst.length===3?'트리플 금고 폭발!!':burst.length===2?'더블 금고 폭발!!':'금고 폭발!');
 await A.sleep(1300);
 burst.forEach(c=>document.getElementById('vt'+c).classList.remove('boom'));MV.paint(A);
 for(const c of burst){
  if(c==='p'){const m=pick(MV.PMULT);await A.cinematic(0,{big:'x'+m,line:'PURPLE VAULT MULTIPLIER',sub:`보라 금고 폭발! 베팅 x${m} = <b>${A.fmt(b*m)}</b>`,btn:'받기'});o.cash=(o.cash||0)+b*m}
  if(c==='r'){const t=pick([['MINI',60],['MINOR',28],['MAJOR',10],['GRAND',2]]);o.pick={tier:t,emoji:'🏦',title:'RED VAULT JACKPOT!'}}
  if(c==='g'){if(A.free)o.fsAward=(o.fsAward||0)+5;else o.fsAward=10}
 }
};
GAMES.list.unshift(MV);GAMES.byId.vault=MV;
if(typeof CHARS!=='undefined'){CHARS.vault=`<svg viewBox="0 -18 200 240"><g transform="translate(10 0) scale(1.8)">${money().replace(/<defs>/,'<defs>')}</g></svg>`;}
if(typeof ICONS!=='undefined')ICONS['🏦']=`<svg x="0" y="0" width="100" height="100" viewBox="0 0 100 100">${vaultSym('r').replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</svg>`;
if(typeof DECOR!=='undefined'){const o={svg:DECOR.svg,pano:DECOR.pano,fx:DECOR.fx,get:DECOR.get};
 DECOR.svg=id=>id==='vault'?BG:o.svg(id);DECOR.pano=id=>id==='vault'?BG:o.pano(id);DECOR.fx=id=>id==='vault'?'':o.fx(id);
 DECOR.get=id=>id==='vault'?{m:'🏦',pl:[],pr:[],orn:['',''],fx:['✦','twk',0,'#fff'],win:['돈 냄새가 난다!','부자 되는 중!'],big:['금고가 터진다!!','오늘 부자야!!'],lose:['다음 판!'],idle:['금고를 채워봐요']}:o.get(id);}
})();
