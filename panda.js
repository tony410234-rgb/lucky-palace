/* 태율랜드 — 판다 포춘 (세로 · 5×4 25라인 · 항아리 3개 · 포춘 리스핀) */
(()=>{
if(typeof GAMES==='undefined')return;
const rg=(id,c,cx=.5,cy=.38,r=.72)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${c.map((x,i)=>`<stop offset="${(i/(c.length-1)).toFixed(2)}" stop-color="${x}"/>`).join('')}</radialGradient>`;
const lg=(id,c,x1=0,y1=0,x2=0,y2=1)=>`<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${c.map((x,i)=>`<stop offset="${(i/(c.length-1)).toFixed(2)}" stop-color="${x}"/>`).join('')}</linearGradient>`;
let n=0;const uid=p=>'p'+p+(++n);
const K='#140812',O=`stroke="${K}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`;
const GOLD=['#fffbe0','#ffd34d','#c88a08','#6a4002'];
const mir=(s,w=100)=>`<g transform="translate(${w} 0) scale(-1 1)">${s}</g>`;
const BLK="'Arial Black',Arial,sans-serif";

/* ================= 판다 황제 ================= */
const EMPEROR=(()=>{const f='peF',b='peB',r='peR',g='peG',h='peH',e='peE';
 const beads=x=>`<path d="M${x} 46V74" stroke="#2a1a02" stroke-width="1.2"/>${[50,56,62,68,74].map(y=>`<circle cx="${x}" cy="${y}" r="2.2" fill="${y%12?'#e0203a':'#ffd34d'}"/>`).join('')}`;
 return `<svg viewBox="0 0 400 300"><defs>${rg(f,['#ffffff','#f4f4f8','#c8c8d8'],.45,.35,.75)}${rg(b,['#4a4a5a','#1a1a24','#08080e'],.4,.3,.8)}${lg(r,['#ffe08a','#e0a020','#8a5004'])}${lg(g,GOLD)}${rg(h,['#6a3aa0','#3a1a6a','#1a0a3a'],.5,.3,.8)}${rg(e,['#5a3a1a','#1a0a02'],.4,.4,.7)}</defs>
 <ellipse cx="200" cy="292" rx="150" ry="10" fill="#000" opacity=".25"/>
 <path d="M70 300Q70 210 130 190Q200 172 270 190Q330 210 330 300Z" fill="url(#${h})" ${O}/>
 <path d="M120 300Q130 220 200 210Q270 220 280 300Z" fill="url(#${r})" ${O}/>
 <g fill="none" stroke="#a86a08" stroke-width="3" opacity=".7"><path d="M150 240q20 14 50 0q30 14 50 0M140 270q30 16 60 0q30 16 60 0"/></g>
 <path d="M160 214Q200 236 240 214L236 228Q200 248 164 228Z" fill="url(#${g})" ${O}/><circle cx="200" cy="232" r="7" fill="#e0203a" stroke="#fff3b0" stroke-width="2"/>
 <path d="M84 230Q60 200 74 168Q88 150 104 164Q108 196 116 214Z" fill="url(#${b})" ${O}/>
 <g transform="translate(320 120) rotate(14)"><path d="M-30 90Q-34 40-14 20Q10 0 26 16Q38 36 26 90Z" fill="url(#${h})" ${O}/><ellipse cx="6" cy="6" rx="26" ry="24" fill="url(#${b})" ${O}/><ellipse cx="6" cy="10" rx="13" ry="11" fill="#3a2a3a"/>${[-12,0,12,22].map((x,i)=>`<ellipse cx="${x-2}" cy="${-12+(i%2?-3:0)}" rx="5.5" ry="6" fill="#3a2a3a"/>`).join('')}</g>
 <ellipse cx="200" cy="128" rx="92" ry="78" fill="url(#${f})" ${O}/>
 <circle cx="122" cy="62" r="26" fill="url(#${b})" ${O}/><circle cx="278" cy="62" r="26" fill="url(#${b})" ${O}/>
 <ellipse cx="164" cy="122" rx="24" ry="30" fill="url(#${b})" transform="rotate(-25 164 122)"/><ellipse cx="236" cy="122" rx="24" ry="30" fill="url(#${b})" transform="rotate(25 236 122)"/>
 <ellipse cx="166" cy="122" rx="11" ry="12" fill="#fff"/><circle cx="168" cy="123" r="8" fill="url(#${e})"/><circle cx="165" cy="119" r="3" fill="#fff"/>
 <ellipse cx="234" cy="122" rx="11" ry="12" fill="#fff"/><circle cx="232" cy="123" r="8" fill="url(#${e})"/><circle cx="229" cy="119" r="3" fill="#fff"/>
 <path d="M152 100q12-8 24-2M224 98q12-6 24 2" stroke="${K}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
 <ellipse cx="200" cy="158" rx="15" ry="10" fill="#1a1a24"/><ellipse cx="196" cy="155" rx="5" ry="2.5" fill="#fff" opacity=".6"/>
 <path d="M176 172Q200 196 224 172Q214 188 200 188Q186 188 176 172Z" fill="#c0303a" ${O}/><path d="M188 182q12 6 24 0" fill="#ff7a8a"/>
 <ellipse cx="146" cy="160" rx="12" ry="7" fill="#ff9ab0" opacity=".5"/><ellipse cx="254" cy="160" rx="12" ry="7" fill="#ff9ab0" opacity=".5"/>
 <rect x="138" y="34" width="124" height="26" rx="4" fill="url(#${g})" ${O}/><path d="M146 40h108M146 54h108" stroke="#a86a08" stroke-width="2"/>
 <rect x="118" y="20" width="164" height="14" rx="3" fill="#1a1a24" ${O}/><path d="M118 27h164" stroke="#ffd34d" stroke-width="2"/>
 ${[126,138,150,162,174,186,198,210,222,234,246,258,270].map(x=>beads(x).replace(/46V74/,'34V60').replace(/cy="(\d+)"/g,(m,y)=>`cy="${y-12}"`)).join('')}
 <circle cx="200" cy="47" r="7" fill="#e0203a" stroke="#fff3b0" stroke-width="2"/></svg>`})();

/* ================= 항아리 ================= */
const POTC={L:['#ffa8ff','#e02ab8','#6a065a','LONGEVITY','4 RESPINS'],U:['#ff9a8a','#e0141a','#6a0206','UPGRADE',''],P:['#a8d8ff','#2a7ae0','#06205a','PROSPERITY','8X5 REELS']};
function pot(k,lit=0){const c=POTC[k],b=uid('b'),g=uid('g'),t=uid('t'),gl=uid('l');let coins='';
 const rows=lit?5:3;for(let r=0;r<rows;r++){const cnt=10-r*2;for(let i=0;i<cnt;i++){const x=140-(cnt-1)*12+i*24+(r%2)*6,y=58-r*9;coins+=`<ellipse cx="${x}" cy="${y}" rx="14" ry="6.5" fill="#8a5004"/><ellipse cx="${x}" cy="${y-1.5}" rx="13.5" ry="6" fill="#ffd34d"/><ellipse cx="${x-2}" cy="${y-3}" rx="6.5" ry="2" fill="#fff6c0" opacity=".85"/>`}}
 return `<svg viewBox="0 0 280 200"><defs>${rg(b,[c[0],c[1],c[2]],.4,.3,.85)}${lg(g,GOLD)}${lg(t,['#fffbe0','#ffffff','#ffe8a0'])}${rg(gl,['#fff8c0','#ffd34d00'],.5,.4,.6)}</defs>
 ${lit?`<ellipse cx="140" cy="60" rx="150" ry="70" fill="url(#${gl})"/>`:''}
 <ellipse cx="140" cy="192" rx="100" ry="8" fill="#000" opacity=".3"/>
 <path d="M28 60Q4 110 40 160Q80 196 140 196Q200 196 240 160Q276 110 252 60Z" fill="url(#${b})" ${O}/>
 <ellipse cx="140" cy="60" rx="114" ry="22" fill="#3a1a02" ${O}/>${coins}
 <path d="M20 56Q140 34 260 56L256 70Q140 50 24 70Z" fill="url(#${g})" ${O}/>
 <path d="M40 96Q46 150 96 176" stroke="#fff" stroke-width="7" fill="none" opacity=".35" stroke-linecap="round"/>
 <text x="140" y="${c[4]?118:128}" text-anchor="middle" font-family="${BLK}" font-weight="900" font-size="${k==='P'?27:30}" fill="url(#${t})" stroke="#2a0614" stroke-width="5" paint-order="stroke">${c[3]}</text>
 ${c[4]?`<rect x="${k==='L'?68:78}" y="128" width="${k==='L'?144:124}" height="28" rx="6" fill="#fff" stroke="${c[2]}" stroke-width="3"/><text x="140" y="148" text-anchor="middle" font-family="${BLK}" font-weight="900" font-size="18" fill="${c[2]}">${k==='L'?'④ RESPINS':c[4]}</text>`:`<circle cx="140" cy="152" r="16" fill="#fff" stroke="#c0101a" stroke-width="2.5"/><text x="140" y="156" text-anchor="middle" font-family="${BLK}" font-size="8" font-weight="900" fill="#c0101a">UPGRADE</text>`}</svg>`}
/* ================= 심볼 ================= */
const hexTile=(bg,inner)=>{const a=uid('h');return `<svg viewBox="0 0 100 100"><defs>${rg(a,bg,.5,.4,.75)}</defs><path d="M28 8H72L94 30V70L72 92H28L6 70V30Z" fill="#000" opacity=".4" transform="translate(1 3)"/><path d="M28 8H72L94 30V70L72 92H28L6 70V30Z" fill="url(#${a})" stroke="#ffd34d" stroke-width="3"/><path d="M30 13H70L89 32V68L70 87H30L11 68V32Z" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>${inner}</svg>`};
const redDragon=()=>{const g=uid('r');const horn=`<path d="M34 36Q20 20 14 6Q26 14 38 28Z" fill="#ffd34d" ${O}/>`;return `<defs>${rg(g,['#ffb060','#e0301a','#7a0606'],.5,.35,.8)}</defs>${horn}${mir(horn)}
 <path d="M50 24Q74 24 80 44Q84 60 72 74L58 84H42L28 74Q16 60 20 44Q26 24 50 24Z" fill="url(#${g})" ${O}/>
 <path d="M22 48L8 44L18 56L6 62L22 64Z" fill="#ffb020" ${O}/>${mir('<path d="M22 48L8 44L18 56L6 62L22 64Z" fill="#ffb020" '+O+'/>')}
 <path d="M36 62Q50 56 64 62L60 80Q50 86 40 80Z" fill="#ffd8a0" ${O}/><path d="M40 72q10 6 20 0" stroke="${K}" stroke-width="2" fill="#5a0006"/><path d="M42 72l2 4 2-3M58 72l-2 4-2-3" fill="#fff"/>
 <g><path d="M30 46q6-6 12 0q-6 4-12 0z" fill="#ffe04a" stroke="${K}" stroke-width="1.5"/><circle cx="37" cy="46" r="2" fill="${K}"/><path d="M28 40l16 2" stroke="${K}" stroke-width="3" stroke-linecap="round"/></g>${mir('<g><path d="M30 46q6-6 12 0q-6 4-12 0z" fill="#ffe04a" stroke="'+K+'" stroke-width="1.5"/><circle cx="37" cy="46" r="2" fill="'+K+'"/><path d="M28 40l16 2" stroke="'+K+'" stroke-width="3" stroke-linecap="round"/></g>')}`};
const purpleBeast=()=>{const g=uid('u');return `<defs>${rg(g,['#e0a8ff','#9a3ae0','#3a0a6a'],.5,.35,.8)}</defs>
 <path d="M14 60Q10 36 30 28Q50 18 72 26Q90 34 88 54Q86 74 66 80L34 80Q16 76 14 60Z" fill="url(#${g})" ${O}/>
 <path d="M24 30L18 14L34 24ZM76 30L82 14L66 24Z" fill="#c87aff" ${O}/>
 <path d="M30 60Q50 50 70 60Q66 76 50 78Q34 76 30 60Z" fill="#f0d8ff" ${O}/><path d="M38 66q12 6 24 0" stroke="${K}" stroke-width="2" fill="#5a0a3a"/>
 <circle cx="36" cy="44" r="6" fill="#ffe04a" stroke="${K}" stroke-width="1.6"/><circle cx="36" cy="44" r="2.4" fill="${K}"/><circle cx="64" cy="44" r="6" fill="#ffe04a" stroke="${K}" stroke-width="1.6"/><circle cx="64" cy="44" r="2.4" fill="${K}"/>
 <g fill="#ffd34d"><circle cx="50" cy="30" r="3"/><circle cx="42" cy="32" r="2"/><circle cx="58" cy="32" r="2"/></g>`};
const koi=()=>{const g=uid('k');return `<defs>${lg(g,['#c8f0ff','#3aa0ff','#0a3a9a'],0,0,1,1)}</defs>
 <path d="M14 52Q30 26 60 30Q80 32 86 50Q80 68 60 70Q30 74 14 52Z" fill="url(#${g})" ${O}/>
 <path d="M84 50L98 34L96 50L98 66Z" fill="#3a8aff" ${O}/><path d="M40 30Q48 16 62 24" fill="#6ac0ff" ${O}/><path d="M44 68Q50 82 60 72" fill="#6ac0ff" ${O}/>
 <g stroke="#0a3a9a" stroke-width="1.3" fill="none" opacity=".6"><path d="M36 40q6 6 0 12M46 38q6 8 0 16M56 38q6 8 0 16M66 40q6 6 0 12"/></g>
 <circle cx="26" cy="46" r="4" fill="#fff" stroke="${K}" stroke-width="1.5"/><circle cx="26" cy="46" r="1.8" fill="${K}"/><path d="M16 56q4 2 8 0" stroke="${K}" stroke-width="2" fill="none"/>`};
const turtle=()=>{const g=uid('t'),s=uid('t');return `<defs>${rg(g,['#b8ff9a','#3ac04a','#0a5a1a'],.5,.35,.8)}${rg(s,['#e8ffd8','#8ad06a','#3a7a2a'],.5,.4,.8)}</defs>
 <ellipse cx="22" cy="70" rx="10" ry="7" fill="url(#${s})" ${O}/><ellipse cx="78" cy="70" rx="10" ry="7" fill="url(#${s})" ${O}/><ellipse cx="24" cy="38" rx="9" ry="6" fill="url(#${s})" ${O}/><ellipse cx="76" cy="38" rx="9" ry="6" fill="url(#${s})" ${O}/>
 <path d="M86 52Q98 46 96 56Q94 64 84 60Z" fill="url(#${s})" ${O}/><circle cx="92" cy="54" r="1.6" fill="${K}"/>
 <ellipse cx="50" cy="54" rx="36" ry="26" fill="url(#${g})" ${O}/>
 <g fill="none" stroke="#0a4a1a" stroke-width="2"><path d="M40 40L60 40L68 54L60 68L40 68L32 54Z"/><path d="M40 40L30 34M60 40L70 34M68 54H84M60 68L68 76M40 68L32 76M32 54H16"/></g>
 <path d="M30 40q10-10 30-8" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>`};
const lotus=()=>{const g=uid('o');const pet=(a)=>`<path d="M50 72Q38 50 50 22Q62 50 50 72Z" fill="url(#${g})" ${O} transform="rotate(${a} 50 72)"/>`;return `<defs>${lg(g,['#ffe0ff','#d07aff','#7a2ab0'])}</defs>${pet(-60)}${pet(60)}${pet(-30)}${pet(30)}${pet(0)}<ellipse cx="50" cy="76" rx="24" ry="6" fill="#3ac04a" ${O}/>`};
const peach=()=>{const g=uid('e');return `<defs>${rg(g,['#fff0e0','#ffb0a0','#ff5a7a','#c0204a'],.4,.35,.75)}</defs>
 <path d="M50 30Q78 24 82 52Q84 80 50 86Q16 80 18 52Q22 24 50 30Z" fill="url(#${g})" ${O}/><path d="M50 32Q46 56 52 84" stroke="#c0204a" stroke-width="2" fill="none" opacity=".6"/>
 <path d="M50 30Q44 14 30 14Q36 26 50 30Z" fill="#3ac04a" ${O}/><path d="M52 30Q62 12 76 18Q66 28 52 30Z" fill="#2a9a3a" ${O}/><ellipse cx="34" cy="46" rx="6" ry="9" fill="#fff" opacity=".5"/>`};
const pandaWild=()=>{const f=uid('w'),b=uid('w'),bg=uid('w'),g=uid('w');return `<svg viewBox="0 0 100 100"><defs>${rg(f,['#ffffff','#eeeef4','#b8b8c8'],.45,.35,.75)}${rg(b,['#4a4a5a','#14141c'],.4,.3,.8)}${rg(bg,['#fff6c0','#ffc22a','#c07a04'],.5,.4,.8)}${lg(g,GOLD)}</defs>
 <rect x="3" y="3" width="94" height="94" rx="6" fill="url(#${bg})" stroke="#7a4a02" stroke-width="2"/>
 <circle cx="26" cy="24" r="11" fill="url(#${b})" ${O}/><circle cx="74" cy="24" r="11" fill="url(#${b})" ${O}/>
 <ellipse cx="50" cy="44" rx="32" ry="28" fill="url(#${f})" ${O}/>
 <ellipse cx="38" cy="42" rx="8" ry="10" fill="url(#${b})" transform="rotate(-20 38 42)"/><ellipse cx="62" cy="42" rx="8" ry="10" fill="url(#${b})" transform="rotate(20 62 42)"/>
 <circle cx="39" cy="42" r="3.5" fill="#fff"/><circle cx="61" cy="42" r="3.5" fill="#fff"/><circle cx="39.5" cy="42.5" r="2" fill="#000"/><circle cx="60.5" cy="42.5" r="2" fill="#000"/>
 <ellipse cx="50" cy="54" rx="5" ry="3.5" fill="#14141c"/><path d="M44 58q6 6 12 0" stroke="${K}" stroke-width="2" fill="#c0303a"/>
 <rect x="8" y="72" width="84" height="22" rx="5" fill="#c0101a" stroke="url(#${g})" stroke-width="3"/>
 <text x="50" y="90" text-anchor="middle" font-family="${BLK}" font-weight="900" font-size="18" fill="url(#${g})" stroke="#5a0006" stroke-width="3" paint-order="stroke">WILD</text></svg>`};
const ROY=['#7af0e0','#14b8a8','#064a44'];
function royal(t){const a=uid('y');const fs=t.length>1?52:62;return `<svg viewBox="0 0 100 100"><defs>${lg(a,ROY)}</defs><text x="50" y="${52+fs*.36}" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="${fs}" fill="#000" opacity=".45" transform="translate(2 3)">${t}</text><text x="50" y="${52+fs*.36}" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="${fs}" fill="url(#${a})" stroke="#ffd34d" stroke-width="2.5" paint-order="stroke">${t}</text></svg>`}
/* 코인 (값 표시) */
const RIM={G:['#fff3a0','#ffc22a','#a86a08'],L:['#ffb0ff','#e02ab8','#6a065a'],U:['#ff9a8a','#e0141a','#6a0206'],P:['#a8e0ff','#2a8aff','#06205a']};
const coinCache={};
function coinArt(label,rim='G',hot=0){const key=label+rim+hot;if(coinCache[key])return coinCache[key];const a=uid('c'),r=uid('c'),R=RIM[rim];
 const fs=label.length>4?20:label.length>3?24:label.length>2?28:32;
 return coinCache[key]=`<svg viewBox="0 0 100 100"><defs>${rg(a,['#fffbe0','#ffe04a','#ffb80a','#c07a04'],.42,.35,.7)}${lg(r,R,0,0,1,1)}</defs>${hot?'<rect x="1" y="1" width="98" height="98" fill="#2ad04a"/>':''}<circle cx="50" cy="53" r="42" fill="#000" opacity=".35"/><circle cx="50" cy="50" r="42" fill="url(#${r})"/><circle cx="50" cy="50" r="34" fill="url(#${a})" stroke="#a86a08" stroke-width="1.5"/><path d="M24 36a30 30 0 0 1 22-14" stroke="#fff" stroke-width="5" fill="none" opacity=".7" stroke-linecap="round"/>
 <text x="50" y="${50+fs*.36}" text-anchor="middle" font-family="${BLK}" font-weight="900" font-size="${fs}" fill="#fff" stroke="#8a4a02" stroke-width="5" paint-order="stroke">${label}</text></svg>`}
const UPG=(()=>{const a=uid('u');return `<svg viewBox="0 0 100 100"><defs>${rg(a,['#ffffff','#ffd0c0','#ff3a2a','#a00008'],.45,.4,.7)}</defs><circle cx="50" cy="50" r="46" fill="#ff6a3a" opacity=".35"/><circle cx="50" cy="50" r="40" fill="url(#${a})" stroke="#fff" stroke-width="3"/><text x="50" y="57" text-anchor="middle" font-family="${BLK}" font-weight="900" font-size="17" fill="#fff" stroke="#8a0006" stroke-width="4" paint-order="stroke">UPGRADE</text></svg>`})();
const ART={W:pandaWild(),R:hexTile(['#ffb060','#c0300a','#4a0402'],redDragon()),V:hexTile(['#d0a0ff','#7a2ad0','#26064a'],purpleBeast()),F:hexTile(['#a8d8ff','#2a6ae0','#081a5a'],koi()),T:hexTile(['#b8ffa0','#2a9a3a','#063a14'],turtle()),
 Lo:lotus().replace(/^/,'<svg viewBox="0 0 100 100">')+'</svg>',Pe:'<svg viewBox="0 0 100 100">'+peach()+'</svg>',A:royal('A'),K:royal('K'),Q:royal('Q'),J:royal('J'),X:royal('10')};
const POTS={L:pot('L'),U:pot('U'),P:pot('P'),L1:pot('L',1),U1:pot('U',1),P1:pot('P',1)};

/* ================= 배경 ================= */
const BG=(()=>{const R=a=>{let x=Math.sin(a*12.9898)*43758.5453;return x-Math.floor(x)};let bam='';
 for(let i=0;i<18;i++){const x=R(i)*1080,w=18+R(i+1)*22,o=.35+R(i+2)*.5;bam+=`<g opacity="${o}"><rect x="${x}" y="0" width="${w}" height="1500" fill="#5ac04a"/>${Array.from({length:9},(_,k)=>`<rect x="${x-2}" y="${k*170+R(i+k)*40}" width="${w+4}" height="6" fill="#2a7a2a"/>`).join('')}<path d="M${x+w} ${300+R(i+5)*600}q40-20 70 4q-40 6-70-4z" fill="#3a9a3a"/></g>`}
 let grass='';for(let i=0;i<140;i++){const x=R(i+50)*1080,h=60+R(i+60)*120;grass+=`<path d="M${x} 1900Q${x+R(i+70)*30-15} ${1900-h/2} ${x+R(i+80)*40-20} ${1900-h}Q${x+8} ${1900-h/2} ${x+14} 1900Z" fill="${['#2a9a2a','#3ab83a','#1a7a1a'][i%3]}"/>`}
 return `<svg viewBox="0 0 1080 1900" preserveAspectRatio="xMidYMid slice"><defs>${lg('pbS',['#3a8af0','#8ac8ff','#d8f0ff','#c8ffb0'])}${lg('pbG',['#5ad04a','#2a9a2a','#0a5a0a'])}</defs><rect width="1080" height="1900" fill="url(#pbS)"/>
 <g fill="#fff" opacity=".9"><ellipse cx="160" cy="140" rx="160" ry="50"/><ellipse cx="300" cy="120" rx="100" ry="40"/><ellipse cx="880" cy="100" rx="170" ry="50"/><ellipse cx="760" cy="130" rx="90" ry="34"/></g>${bam}
 <path d="M0 1250Q270 1180 540 1240T1080 1230V1900H0Z" fill="url(#pbG)"/>${grass}</svg>`})();
const RBG=`<svg viewBox="0 0 1080 1900" preserveAspectRatio="xMidYMid slice"><defs>${lg('prS',['#ff3a1a','#ff8a2a','#ffd84a','#ff9a2a','#e0400a'])}${rg('prG',['#fffbd0','#ffe07a00'],.5,.22,.5)}</defs><rect width="1080" height="1900" fill="url(#prS)"/><rect width="1080" height="1900" fill="url(#prG)"/><g fill="#c0300a" opacity=".25">${Array.from({length:12},(_,i)=>`<rect x="0" y="${1100+i*70}" width="1080" height="4"/>`).join('')}</g></svg>`;

/* ================= 엔진 ================= */
const pick=ws=>{let t=0;for(const w of ws)t+=w[1];let r=Math.random()*t;for(const w of ws){if((r-=w[1])<0)return w[0]}return ws[ws.length-1][0]};
const WT=[['R',3],['V',3.4],['F',3.8],['T',4.2],['Lo',5.5],['Pe',5.8],['A',7.5],['K',7.8],['Q',8.4],['J',8.8],['X',9.2]];
const PAY={W:[25,100,400],R:[20,60,250],V:[15,50,150],F:[12,40,120],T:[10,30,100],Lo:[6,20,60],Pe:[6,20,60],A:[4,10,40],K:[4,10,40],Q:[3,8,25],J:[3,8,25],X:[2,6,20]};
const LINES=[[1,1,1,1,1],[2,2,2,2,2],[0,0,0,0,0],[3,3,3,3,3],[0,1,2,1,0],[3,2,1,2,3],[1,2,3,2,1],[2,1,0,1,2],[0,0,1,2,2],[3,3,2,1,1],[1,0,0,0,1],[2,3,3,3,2],[1,1,0,1,1],[2,2,3,2,2],[0,1,1,1,0],[3,2,2,2,3],[1,2,2,2,1],[2,1,1,1,2],[0,1,0,1,0],[3,2,3,2,3],[1,0,1,0,1],[2,3,2,3,2],[0,0,0,1,2],[3,3,3,2,1],[1,2,1,2,1]];
const CV=[[.5,30],[1,26],[1.5,14],[2,12],[2.5,7],[3,6],[5,3.4],[10,1],['MINI',1.4],['MINOR',.4]];
let KM=3.1,PC=.088,PS=.0042;
const JPX={MINI:10,MINOR:30,MAJOR:100,MEGA:250,GRAND:1000};
function cell(fs,boost){const r=Math.random(),pc=PC*(boost===1?1.32:1),ps=PS*(boost===2?3:1);
 if(r<ps){const k=['L','U','P'][Math.floor(Math.random()*3)];return {s:'C',v:pick(CV.slice(0,6)),rim:k}}
 if(r<ps+pc)return {s:'C',v:pick(CV),rim:'G'};return {s:pick(WT)}}
function col(c,boost){const cc=Array.from({length:4},()=>cell(0,boost));if(c>0&&Math.random()<.11){const len=2+Math.floor(Math.random()*3),st=Math.floor(Math.random()*(5-len));for(let i=st;i<st+len&&i<4;i++)if(cc[i].s!=='C')cc[i]={s:'W'}}return cc}
function evalLines(g){const wins=[];LINES.forEach((L,li)=>{const cs=L.map((r,c)=>g[c][r]);let s=null;for(const x of cs){if(x.s!=='W'&&x.s!=='C'){s=x.s;break}}
 if(cs[0].s==='C')return;if(!s)s='W';let k=0;for(const x of cs){if(x.s===s||x.s==='W')k++;else break}
 let wk=0;for(const x of cs){if(x.s==='W')wk++;else break}let amt=k>=3?PAY[s][k-3]:0,kk=k;if(wk>=3&&PAY.W[wk-3]>amt){amt=PAY.W[wk-3];kk=wk}
 if(amt>0)wins.push({li,amt:amt*KM/25,cells:L.slice(0,kk).map((r,c)=>[c,r])})});return wins}

/* ---------- 포춘 리스핀 (순수 시뮬레이션) ---------- */
const RP={coin:.032,up:.02,jp:[['MINI',3],['MINOR',1],['MAJOR',.25],['MEGA',.06]]};
const valOf=v=>typeof v==='number'?v:JPX[v];
function respin(init,feats,rnd=Math.random){
 const rows=feats.P?8:4,open0=4;let open=open0;const unlockAt=[9,12,15,18];
 const g=Array.from({length:5},()=>Array(rows).fill(null));
 /* 초기 코인: 아래 4줄(행 index rows-4..rows-1)에 배치 */
 init.forEach(x=>{g[x.c][rows-4+x.r]={v:x.v}});
 let left=feats.L?4:3;const max=left;let ucount=0;const steps=[];
 const filled=()=>{let k=0;for(let c=0;c<5;c++)for(let r=rows-open;r<rows;r++)if(g[c][r])k++;return k};
 const coinVal=()=>{const r=rnd();if(r<.012)return pick(RP.jp);return pick(CV.slice(0,8))};
 let guard=0;
 while(left>0&&guard++<80){left--;const land=[],ups=[],unl=[];
  for(let c=0;c<5;c++)for(let r=rows-open;r<rows;r++){if(g[c][r])continue;const x=rnd();
   if(feats.U&&x<RP.up){g[c][r]={v:pick(CV.slice(0,4)),up:1};land.push({c,r,v:g[c][r].v,up:1})}
   else if(x<RP.up*(feats.U?1:0)+RP.coin){g[c][r]={v:coinVal()};land.push({c,r,v:g[c][r].v})}}
  /* 업그레이드: 기존 코인 1~3개 값 증가 */
  for(const L of land.filter(x=>x.up)){ucount++;const pool=[];for(let c=0;c<5;c++)for(let r=0;r<rows;r++){const x=g[c][r];if(x&&typeof x.v==='number'&&!(c===L.c&&r===L.r))pool.push([c,r])}
   const k=Math.min(pool.length,1+Math.floor(rnd()*3));for(let i=0;i<k;i++){const j=Math.floor(rnd()*pool.length);const [c,r]=pool.splice(j,1)[0];const add=pick([[.5,30],[1,30],[1.5,15],[2,12],[3,8],[5,4],[10,1]]);g[c][r].v+=add;ups.push({from:[L.c,L.r],to:[c,r],v:g[c][r].v,add})}}
  if(land.length)left=max;
  if(feats.P)while(open<8&&filled()+ucount*5>=unlockAt[open-4]){open++;unl.push(rows-open)}
  steps.push({land,ups,unl,left,open,snap:g.map(cc=>cc.map(x=>x?{...x}:null))});
  if(filled()>=5*open&&open===rows)break;
 }
 let total=0;const jps=[];for(let c=0;c<5;c++)for(let r=0;r<rows;r++){const x=g[c][r];if(!x)continue;if(typeof x.v==='string')jps.push(x.v);total+=valOf(x.v)}
 const full=filled()>=5*rows;if(full){total+=JPX.GRAND;jps.push('GRAND')}
 return {rows,steps,total,jps,full,final:g}}

const PF={id:'panda',name:'판다 포춘',en:'PANDA FORTUNE',sub:'세로 게임 · 항아리 3개 · 포춘 리스핀 · 5개 잭팟',hero:'🐼',badge:'NEW',font:"Bungee,sans-serif",
 cols:5,rows:4,mode:'reels',lines:LINES,ART,custom:true,portrait:true,jp:true,boost:0,
 draw:x=>x.s==='C'?coinArt(typeof x.v==='string'?x.v:fmtShort(x.v*(PF._bet||100)),x.rim||'G'):ART[x.s],
 fill:(c,fs)=>cell(fs,0),
 antic:()=>[false,false,false,false,false],
 fsInit:n=>({left:n}),
 spin(fs){const g=Array.from({length:5},(_,c)=>col(c,PF.boost));const wins=evalLines(g);const total=wins.reduce((a,w)=>a+w.amt,0);
  const coins=[];g.forEach((cc,c)=>cc.forEach((x,r)=>{if(x.s==='C')coins.push({c,r,v:x.v,rim:x.rim})}));
  const specials=coins.filter(x=>x.rim!=='G').map(x=>x.rim);
  return {grid:g,wins,total,fsAward:0,coins,specials,trig:coins.length>=6}},
 setK:v=>{KM=v},setP:(c,s)=>{PC=c;PS=s},respin,RP,JPX,
 paytable:{rules:['5×4 · 25라인 · 판다 WILD','코인 6개 이상 → 포춘 리스핀! 코인은 고정, 새 코인이 나오면 남은 횟수 초기화','분홍·빨강·파랑 테두리 코인이 나오면 위 항아리에 들어가 다음 리스핀 기능이 켜져요','LONGEVITY(분홍): 리스핀 4회 · UPGRADE(빨강): 업그레이드 코인이 다른 코인 값을 올려줘요 · PROSPERITY(파랑): 릴이 8×5로 커지고 코인이 모일수록 줄이 열려요','칸을 전부 채우면 GRAND 잭팟!','스페셜 리스핀 구매: 싱글 50배 · 더블 100배 · 트리플 200배 / 부스트: x1.5(코인↑) · x2(스페셜 코인 3배)']}
};
const fmtShort=v=>v>=10000?(v/1000)+'K':v>=1000?(v%1000?(v/1000).toFixed(1):v/1000)+'K':String(Math.round(v));
PF.fmtShort=fmtShort;PF.coinArt=coinArt;PF.UPG=UPG;PF.POTS=POTS;PF.EMPEROR=EMPEROR;PF.BG=BG;PF.RBG=RBG;

/* ================= 화면 · 연출 ================= */
const AR=.56;
const PT={L:'LONGEVITY',U:'UPGRADE',P:'PROSPERITY'};
const potState=A=>A.S.ppots||(A.S.ppots={L:0,U:0,P:0});
PF.forceFS=()=>{PF.forceTrig=['L','U','P'].sort(()=>Math.random()-.5).slice(0,1+Math.floor(Math.random()*3))};
PF.costMul=()=>PF.boost===1?1.5:PF.boost===2?1.25:1;
PF.mount=A=>{
 const st=document.querySelector('#game .stage');
 const plq=(t,cls,pos)=>`<div class="tx pplq ${cls}" style="${pos}"><b>${t}</b><span class="num" data-t="${t}">0</span></div>`;
 st.insertAdjacentHTML('afterbegin',`<img class="tx pbg" alt="" src="${A.U(BG)}">
 <div class="tx pgr"><i></i><b>GRAND</b><span class="num" data-t="GRAND">0</span><i></i></div>
 ${plq('MEGA','me','left:3%;top:7.4%')}${plq('MAJOR','ma','left:52%;top:7.4%')}${plq('MINOR','mi','left:3%;top:11.2%')}${plq('MINI','mn','left:52%;top:11.2%')}
 <img class="tx pemp" id="pemp" alt="" src="${A.U(EMPEROR)}">
 <button class="tx pbtn pbst" id="pbst"><b>부스트<br>구매</b><small id="pbstt">2가지 옵션</small><em>➜</em></button>
 <button class="tx pbtn pbuy" id="pbuy"><b>스페셜<br>리스핀<br>구매</b></button>
 <div class="tx ppots"><img id="ppL" class="pp L" alt=""><img id="ppU" class="pp U" alt=""><img id="ppP" class="pp P" alt=""></div>
 <div class="tx pframe"></div>`);
 document.getElementById('pbst').onclick=()=>{if(A.busy||A.free)return;PF.boost=(PF.boost+1)%3;A.sfx('click');PF.paintBoost();A.toast(['부스트 OFF','부스트 1: 베팅 x1.5 · 코인이 더 자주!','부스트 2: 베팅 x1.25 · 스페셜 코인 3배!'][PF.boost],1500)};
 document.getElementById('pemp').onclick=e=>{e.stopPropagation();A.loveTap&&A.loveTap(e.currentTarget)};
 document.getElementById('pbuy').onclick=()=>{if(A.busy||A.free)return;PF.buyMenu(A)};
 PF.paintBoost();PF.onBet(A);PF.paintPots(A);
 try{window.TLApp&&TLApp.orient('portrait')}catch(e){}
};
PF.say=(t,kind)=>{const st=document.querySelector('#game .stage'),e=document.createElement('div');e.className='tx csay'+(kind==='lose'?' lose':'');e.textContent=t;e.style.left='58%';e.style.top='12%';st.appendChild(e);setTimeout(()=>e.remove(),1900)};
PF.unmount=()=>{try{window.TLApp&&TLApp.orient('landscape')}catch(e){}};
PF.paintBoost=()=>{const b=document.getElementById('pbst');if(!b)return;b.classList.toggle('on',PF.boost>0);document.getElementById('pbstt').textContent=['2가지 옵션','x1.5 코인↑','x1.25 스페셜↑'][PF.boost]};
PF.paintPots=A=>{const p=potState(A);for(const k of ['L','U','P']){const el=document.getElementById('pp'+k);if(!el)continue;el.src=A.U(POTS[k+(p[k]?'1':'')]);el.classList.toggle('lit',!!p[k])}};
PF.onBet=A=>{const b=A.bet();PF._bet=b;document.querySelectorAll('#game .num[data-t]').forEach(e=>{const t=e.dataset.t;e.textContent=A.fmt(t==='MEGA'?b*JPX.MEGA:A.jpVal(t,b))})};
PF.size=A=>{
 const gm=document.querySelector('#game .gmain'),ctl=document.querySelector('#game .ctl'),st=document.querySelector('#game .stage');
 const H=gm.clientHeight-(ctl?ctl.offsetHeight:0)-2,W=gm.clientWidth;
 let w=Math.floor(Math.min(W,H*AR)),h=Math.floor(w/AR);st.style.width=w+'px';st.style.height=h+'px';
 A.box.style.gridTemplateColumns='repeat(5,minmax(0,1fr))';
 return Math.max(20,Math.floor((h*.434-6)/4));
};
/* 스페셜 리스핀 구매 */
PF.buyMenu=async A=>{const b=A.bet(),P=[17,43,80];
 const v=await new Promise(res=>{const pop=document.getElementById('pop');
  pop.innerHTML=`<div class="card pbuyc"><button class="px" data-v="0">✕</button><h3>스페셜 리스핀 구매</h3><p>업그레이드된 리스핀으로 제공됩니다.</p>
  <button class="pbo g" data-v="1"><img alt="" src="${A.U(POTS.L1)}"><span>싱글 스페셜 리스핀</span><b>${A.short(b*P[0])}</b></button>
  <button class="pbo r" data-v="2"><img alt="" src="${A.U(POTS.U1)}"><img alt="" src="${A.U(POTS.P1)}"><span>더블 스페셜 리스핀</span><b>${A.short(b*P[1])}</b></button>
  <button class="pbo p" data-v="3"><img alt="" src="${A.U(POTS.L1)}"><img alt="" src="${A.U(POTS.U1)}"><img alt="" src="${A.U(POTS.P1)}"><span>트리플 스페셜 리스핀</span><b>${A.short(b*P[2])}</b></button></div>`;
  pop.classList.add('on');pop.onclick=e=>{const x=e.target.closest('[data-v]');if(x){pop.onclick=null;pop.classList.remove('on');res(+x.dataset.v)}}});
 if(!v)return;const cost=b*P[v-1];const nm=['싱글','더블','트리플'][v-1];
 const ok=await new Promise(res=>{const pop=document.getElementById('pop');
  pop.innerHTML=`<div class="card pconf"><img class="pch" alt="" src="${A.U(EMPEROR)}"><h3>${nm} 스페셜 리스핀 구매</h3><p>업그레이드 된 리스핀<br>${v}종이 제공됩니다.</p><div class="pcp">${['L','U','P'].slice(0,3).map(k=>`<img alt="" src="${A.U(POTS[k+'1'])}">`).join('')}</div><div class="pprice">🪙 ${A.short(cost)}</div><div class="yn"><button class="n" data-v="0">✕</button><button class="y" data-v="1">✓</button></div></div>`;
  pop.classList.add('on');pop.onclick=e=>{const x=e.target.closest('[data-v]');if(x){pop.onclick=null;pop.classList.remove('on');res(+x.dataset.v)}}});
 if(!ok)return;if(A.S.bal<cost){A.toast('코인 부족!');return}
 const ks=['L','U','P'].sort(()=>Math.random()-.5).slice(0,v);PF.forceTrig=ks;A.buySpin(cost);
};
/* 엔진 보정: 구매 시 코인 3개 보장 */
const _spin=PF.spin;PF.spin=fs=>{const o=_spin(fs);if(PF.forceTrig){const ks=PF.forceTrig;PF.forceTrig=null;
  let k=o.coins.length;const free=[];o.grid.forEach((cc,c)=>cc.forEach((x,r)=>{if(x.s!=='C')free.push([c,r])}));free.sort(()=>Math.random()-.5);
  while(k<3&&free.length){const [c,r]=free.pop();o.grid[c][r]={s:'C',v:pick(CV.slice(0,5)),rim:'G'};k++}
  o.coins=[];o.grid.forEach((cc,c)=>cc.forEach((x,r)=>{if(x.s==='C')o.coins.push({c,r,v:x.v,rim:x.rim})}));
  o.wins=evalLines(o.grid);o.total=o.wins.reduce((a,w)=>a+w.amt,0);o.trig=true;o.bought=ks}
 return o};
/* 코인 비행 */
async function flyTo(A,fromEl,toEl,n,src,sfx='tcoin'){const tr=toEl.getBoundingClientRect(),tx=tr.left+tr.width/2,ty=tr.top+tr.height*.4;
 for(let i=0;i<n;i++){const fr=fromEl.getBoundingClientRect(),sx=fr.left+fr.width/2,sy=fr.top+fr.height/2;const im=document.createElement('img');im.src=src;im.className='tcoin';im.alt='';document.body.appendChild(im);
  const an=im.animate([{transform:`translate(${sx}px,${sy}px) scale(.6)`,opacity:0},{transform:`translate(${sx}px,${sy-12}px) scale(1.2)`,opacity:1,offset:.15},{transform:`translate(${(sx+tx)/2+(Math.random()-.5)*80}px,${Math.min(sy,ty)-40}px) scale(1)`,offset:.6},{transform:`translate(${tx}px,${ty}px) scale(.6)`,opacity:.9}],{duration:A.T(650,400),delay:i*70,easing:'ease-in'});
  an.onfinish=()=>{im.remove();A.sfx(sfx);toEl.classList.remove('bump');void toEl.offsetWidth;toEl.classList.add('bump')}}
 await A.sleep(A.T(650,400)+n*80)}
PF.post=async(o,b,A)=>{
 const p=potState(A);const strips=A.reels.map(r=>r.firstElementChild);
 /* 스페셜 코인 → 항아리 */
 for(const x of o.coins.filter(x=>x.rim!=='G')){const cell=strips[x.c]&&strips[x.c].children[x.r];const potEl=document.getElementById('pp'+x.rim);if(!cell||!potEl)continue;
  cell.classList.add('vland');A.sfx('tmult');await A.sleep(220);await flyTo(A,cell,potEl,5,A.U(coinArt('',x.rim)));cell.classList.remove('vland');p[x.rim]=1;PF.paintPots(A);A.sfx('ding')}
 if(o.bought)for(const k of o.bought){p[k]=1;PF.paintPots(A)}
 A.save();
 if(!o.trig)return;
 /* 트리거 연출 */
 {const cnt=document.createElement('div');cnt.className='pcnt';document.querySelector('#game .stage').appendChild(cnt);let i=0;
  const sorted=o.coins.slice().sort((p,q)=>p.c-q.c||p.r-q.r);
  for(const x of sorted){const cell=strips[x.c]&&strips[x.c].children[x.r];if(cell)cell.classList.add('vland');i++;
   try{A.AUDIO.tone(523*Math.pow(1.0595,i*2),.14,0,'triangle',.07);A.AUDIO.tone(1046*Math.pow(1.0595,i*2),.1,.03,'sine',.04)}catch(e){}
   cnt.innerHTML=`<span class="t3 pop"><span class="ex">${i} COINS</span><span class="fr">${i} COINS</span></span>`;cnt.classList.remove('bump');void cnt.offsetWidth;cnt.classList.add('bump');await A.sleep(A.T(230,120))}
  A.sfx('boom');A.flash();A.shake();A.announce&&A.announce('BONUS GAME!','포춘 리스핀');A.speak&&A.speak('와~ 보너스 게임이에요!');A.praise&&A.praise();await A.sleep(1400);cnt.remove()}
 const feats={L:!!p.L,U:!!p.U,P:!!p.P},nf=feats.L+feats.U+feats.P;
 const emp=document.getElementById('pemp');if(emp){emp.classList.add('cheer')}
 /* 항아리 터짐 */
 document.querySelectorAll('.ppots .pp.lit').forEach(e=>e.classList.add('boom'));if(nf){A.sfx('rumble');A.shake();await A.sleep(1100)}
 await PF.sign(A,feats,nf);
 document.querySelectorAll('.ppots .pp').forEach(e=>e.classList.remove('boom'));if(emp)emp.classList.remove('cheer');
 /* 금화 샤워 전환 */
 A.showerOn&&A.showerOn(true);A.sfx('pile');await A.sleep(1300);A.showerOn&&A.showerOn(false);
 const r=respin(o.coins.map(x=>({c:x.c,r:x.r,v:x.v})),feats);
 const total=await PF.play(A,r,b,feats);
 p.L=p.U=p.P=0;PF.paintPots(A);A.save();
 o.cash=(o.cash||0)+total;
};
PF.sign=(A,f,nf)=>new Promise(res=>{const pop=document.getElementById('pop');const title=nf>=3?'SUPER<br>SPECIAL':nf>0?'SPECIAL':'FORTUNE';
 const pots=['L','U','P'].filter(k=>f[k]);
 pop.innerHTML=`<div class="psign"><div class="pst">${title.split('<br>').map(t=>`<span class="t3 pop"><span class="ex">${t}</span><span class="fr">${t}</span></span>`).join('<br>')}</div>
  <div class="psp"><div class="pspt">FORTUNE RESPIN</div><div class="psg">${(pots.length?pots:['L','U','P']).map(k=>`<img class="${f[k]?'on':'off'}" alt="" src="${A.U(POTS[k+'1'])}">`).join('')}</div>
  <p>${pots.length?pots.map(k=>({L:'LONGEVITY: 리스핀 4회',U:'UPGRADE: 업그레이드 코인 등장',P:'PROSPERITY: 8×5 릴로 확장'})[k]).join('<br>'):'코인을 모아 잭팟을 노려요!'}</p><button class="go pstart">START</button></div></div>`;
 pop.classList.add('on');A.sfx('sign');pop.onclick=e=>{if(e.target.closest('.go')){pop.onclick=null;pop.classList.remove('on');A.sfx('start');res()}};
 if(A.auto)setTimeout(()=>{if(pop.onclick){pop.onclick=null;pop.classList.remove('on');res()}},2600)});
/* 리스핀 보드 재생 */
PF.play=async(A,r,b,feats)=>{
 const st=document.querySelector('#game .stage'),rows=r.rows,T=A.T,tone=(f,d,dl=0,t='sine',v=.06)=>{try{A.AUDIO.tone(f,d,dl,t,v)}catch(e){}};
 const lbl=v=>typeof v==='string'?v:fmtShort(v*b);
 const dim=['A','K','Q','J','X','Lo','T','F','V','R','Pe'];const dimSrc=dim.map(k=>A.U(ART[k]));const rd=()=>dimSrc[Math.floor(Math.random()*dimSrc.length)];
 const jv=t=>t==='MEGA'?b*JPX.MEGA:A.jpVal(t,b);
 const ov=document.createElement('div');ov.className='tx pfr';ov.innerHTML=`<img class="prbg" alt="" src="${A.U(RBG)}"><div class="prays"></div>
  <div class="prow">${Array.from({length:5},(_,i)=>`<img alt="" src="${A.U(EMPEROR)}" style="--i:${i}">`).join('')}</div>
  <div class="pgr r" data-t="GRAND"><i></i><b>GRAND</b><span class="num">${A.fmt(jv('GRAND'))}</span><b>GRAND</b><i></i></div>
  <div class="pplq me r" data-t="MEGA" style="left:3%;top:11.4%"><b>MEGA</b><span class="num">${A.fmt(jv('MEGA'))}</span></div><div class="pplq ma r" data-t="MAJOR" style="left:51.5%;top:11.4%"><b>MAJOR</b><span class="num">${A.fmt(jv('MAJOR'))}</span></div>
  <div class="pplq mi r" data-t="MINOR" style="left:3%;top:14.6%"><b>MINOR</b><span class="num">${A.fmt(jv('MINOR'))}</span></div><div class="pplq mn r" data-t="MINI" style="left:51.5%;top:14.6%"><b>MINI</b><span class="num">${A.fmt(jv('MINI'))}</span></div>
  <div class="prgrid r${rows}"><div class="pcol L"></div><div class="pcol R"></div><div class="pcells"></div><div class="plock"></div></div>
  <div class="pleft"><i>${feats.L?4:3}</i><span>SPINS REMAINING</span></div>
  <div class="pfeat">${['L','U','P'].filter(k=>feats[k]).map(k=>`<img alt="" src="${A.U(POTS[k+'1'])}">`).join('')}</div>
  <div class="ptitle"><span class="t3 pop"><span class="ex">FORTUNE RESPIN</span><span class="fr">FORTUNE RESPIN</span></span></div>`;
 st.appendChild(ov);const gmEl=document.querySelector('#game .gmain');gmEl.style.background=`url(${A.U(RBG)}) center/cover`;
 const cells=ov.querySelector('.pcells'),C=[],grid=ov.querySelector('.prgrid'),prow=ov.querySelector('.prow'),badge=ov.querySelector('.pleft'),bn=badge.querySelector('i'),bt=badge.querySelector('span');
 for(let rr=0;rr<rows;rr++)for(let c=0;c<5;c++){const d=document.createElement('div');d.className='pc';d.innerHTML=`<img class="d" alt="" src="${rd()}">`;d.style.gridArea=`${rr+1}/${c+1}`;cells.appendChild(d);(C[c]=C[c]||[])[rr]=d}
 const isOn=(c,rr)=>C[c][rr].classList.contains('on');
 const put=(c,rr,v,up,anim)=>{const d=C[c][rr];d.classList.add('on');d.classList.remove('spin','ant');d.innerHTML=`<img class="cn${anim?' drop':''}" alt="" src="${A.U(up?UPG:coinArt(lbl(v)))}">${anim?'<i class="ring"></i><i class="spark"></i>':''}`;if(anim)setTimeout(()=>{d.querySelectorAll('.ring,.spark').forEach(e=>e.remove())},900)};
 const flashJP=t=>{const p=ov.querySelector(`[data-t="${t}"]`);if(p){p.classList.remove('jhit');void p.offsetWidth;p.classList.add('jhit')}};
 const hop=()=>{prow.classList.remove('hop');void prow.offsetWidth;prow.classList.add('hop')};
 const banner=(txt,cls='')=>{const e=document.createElement('div');e.className='pban '+cls;e.innerHTML=`<span class="t3 pop"><span class="ex">${txt}</span><span class="fr">${txt}</span></span>`;ov.appendChild(e);setTimeout(()=>e.remove(),1500)};
 /* 잠긴 줄 */
 const lock=ov.querySelector('.plock');let open=4;
 const paintLock=(filled)=>{if(rows<8){lock.style.display='none';return}const n=8-open;lock.style.height=`calc(${n}/8*100% + ${n?0:0}px)`;lock.style.display=n?'':'none';
  const th=[9,12,15,18];lock.innerHTML=`<div class="plh">EACH <img alt="" src="${A.U(UPG)}"> BEHAVES AS 5 <img alt="" src="${A.U(coinArt(''))}"> FOR THE PURPOSES OF UNLOCKING ROWS</div>`+Array.from({length:n},(_,i)=>{const need=Math.max(0,th[open-4+(n-1-i)]-filled);return `<div class="plr"><img alt="" src="${A.U(UPG)}"> OR <b>${need}</b> MORE <img alt="" src="${A.U(coinArt(''))}"> TO UNLOCK</div>`}).join('')};
 /* 초기 코인: 하나씩 떨어지며 등장 */
 const first=r.steps[0]?r.steps[0].snap:r.final;const firstLand=new Set((r.steps[0]?r.steps[0].land:[]).map(x=>x.c*10+x.r));const upT=new Map();(r.steps[0]?r.steps[0].ups:[]).forEach(u=>upT.set(u.to[0]*10+u.to[1],1));
 A.AUDIO.play&&A.AUDIO.play('pandaR');
 ov.classList.add('intro');A.speak&&A.speak('포춘 리스핀, 시작해요~');await A.sleep(T(1300,700));ov.classList.remove('intro');
 let combo=0;const init=[];for(let c=0;c<5;c++)for(let rr=0;rr<rows;rr++){const x=first[c][rr];if(x&&!firstLand.has(c*10+rr))init.push([c,rr,x.v])}
 const step0=r.steps[0];
 for(const [c,rr,v] of init){let vv=v;if(step0&&typeof v==='number')for(const u of step0.ups)if(u.to[0]===c&&u.to[1]===rr)vv-=u.add;put(c,rr,vv,0,1);tone(660+combo*60,.12,0,'triangle',.05);combo++;await A.sleep(T(170,90))}
 /* 업그레이드 대상이 첫 스텝에 있으면 표시 값은 업그레이드 전으로 되돌림 */
 let filled=ov.querySelectorAll('.pc.on').length;paintLock(filled);
 const setLeft=(n,reset)=>{bn.textContent=n;badge.classList.toggle('last',n===1);bt.textContent=n===1?'LAST SPIN!':n===0?'SPIN REMAINING':'SPINS REMAINING';if(reset){badge.classList.remove('reset');void badge.offsetWidth;badge.classList.add('reset');tone(880,.1);tone(1320,.18,.08)}};
 await A.sleep(T(600,300));
 let prevLeft=feats.L?4:3;
 for(const s of r.steps){
  const lastSpin=prevLeft===1,empt=[];for(let c=0;c<5;c++)for(let rr=0;rr<rows;rr++)if(!isOn(c,rr))empt.push([c,rr]);
  const lockedRows=8-open;
  setLeft(prevLeft-1>=0?prevLeft-1:0);
  /* 스핀 시작: 빈칸이 위아래로 돌아감 */
  for(const [c,rr] of empt){if(rows===8&&rr<lockedRows)continue;const d=C[c][rr];d.classList.add('spin');d.innerHTML=`<div class="pstrip"><img alt="" src="${rd()}"><img alt="" src="${rd()}"><img alt="" src="${rd()}"><img alt="" src="${rd()}"></div>`}
  A.sfx('start');const emptyLeft=empt.length-(rows===8?lockedRows*5:0);
  if(lastSpin||emptyLeft<=3){ov.classList.add('tense');for(let k=0;k<3;k++){tone(55,.14,k*.42,'sine',.25);tone(55,.12,k*.42+.16,'sine',.18)}}
  await A.sleep(T(lastSpin?650:420,220));
  combo=0;
  for(let c=0;c<5;c++){
   const colLand=s.land.filter(L=>L.c===c);
   if(lastSpin&&c>=3){for(const [cc,rr] of empt)if(cc===c&&C[cc][rr].classList.contains('spin'))C[cc][rr].classList.add('ant');await A.sleep(T(520,200))}
   for(const [cc,rr] of empt){if(cc!==c)continue;const d=C[cc][rr];if(!d.classList.contains('spin'))continue;const L=colLand.find(x=>x.r===rr);
    if(L){put(cc,rr,L.v,L.up,1);hop();A.flash();
     if(L.up){A.sfx('boom');banner('UPGRADE!','up')}else if(typeof L.v==='string'){A.sfx('jp');flashJP(L.v);banner(L.v+'!','jp')}else{tone(784*Math.pow(1.0595,combo*2),.16,0,'triangle',.07);tone(1568*Math.pow(1.0595,combo*2),.12,.04,'sine',.04);A.sfx('coin')}
     combo++}
    else{d.classList.remove('spin','ant');d.innerHTML=`<img class="d stop" alt="" src="${rd()}">`}}
   A.sfx('stop');await A.sleep(T(lastSpin?160:110,60));
  }
  ov.classList.remove('tense');
  /* 업그레이드: 불덩이 → 대상 코인 값 롤업 */
  for(const u of s.ups){const fe=C[u.from[0]][u.from[1]],te=C[u.to[0]][u.to[1]];fe.classList.add('upgo');await flyTo(A,fe,te,3,A.U(UPG),'boom');
   te.classList.add('upd');const img=te.querySelector('img');const from=s.snap[u.to[0]][u.to[1]].v;A.shake();
   put(u.to[0],u.to[1],u.v,0,1);te.classList.add('upd');tone(523,.1);tone(659,.1,.08);tone(784,.1,.16);tone(1047,.25,.24,'triangle',.08);
   const tag=document.createElement('b');tag.className='uptag';tag.textContent='+'+lbl(u.v);te.appendChild(tag);await A.sleep(T(700,350));te.classList.remove('upd');fe.classList.remove('upgo')}
  for(const L of s.land.filter(x=>x.up)){put(L.c,L.r,s.snap[L.c][L.r].v,0,1);tone(988,.12)}
  /* 줄 열림 */
  if(s.unl.length){open=s.open;lock.classList.add('shatter');A.sfx('lvl');A.flash();A.shake();banner('ROW UNLOCKED!','row');await A.sleep(T(700,350));lock.classList.remove('shatter')}
  filled=ov.querySelectorAll('.pc.on').length;paintLock(filled);
  const reset=s.land.length>0&&s.left>prevLeft-1;setLeft(s.left,reset);prevLeft=s.left;
  /* GRAND 근접 */
  const remain=5*open-filled;ov.querySelector('.prgrid').classList.toggle('near',remain>0&&remain<=3&&open===rows);
  if(remain>0&&remain<=3&&open===rows){const e=ov.querySelector('.pnear')||Object.assign(document.createElement('div'),{className:'pnear'});e.textContent=`GRAND까지 ${remain}칸!`;ov.appendChild(e)}
  await A.sleep(T(450,220));
 }
 ov.querySelector('.pnear')?.remove();grid.classList.remove('near');
 A.AUDIO.play&&A.AUDIO.play('panda');
 /* 집계: 코인이 하나씩 날아가 합산 */
 badge.style.display='none';
 let tot=0;const box=document.createElement('div');box.className='ptot';box.innerHTML=`<small>TOTAL WIN</small><b>0</b>`;ov.appendChild(box);const btot=box.querySelector('b');
 await A.sleep(T(500,250));let k=0;
 for(let rr=rows-1;rr>=0;rr--)for(let c=0;c<5;c++){const x=r.final[c][rr];if(!x)continue;const d=C[c][rr];d.classList.add('col');
  const add=typeof x.v==='string'?jv(x.v):x.v*b;
  if(typeof x.v==='string'){flashJP(x.v);banner(x.v+' JACKPOT!','jp');A.sfx('jp');await A.sleep(T(900,400))}
  flyTo(A,d,box,1,A.U(coinArt('')),'clink');tot+=add;
  const t0=tot-add;const steps=6;for(let q=1;q<=steps;q++){setTimeout(()=>{btot.textContent=A.fmt(Math.round(t0+add*q/steps))},q*25)}
  box.classList.remove('bump');void box.offsetWidth;box.classList.add('bump');tone(523*Math.pow(1.0595,Math.min(k,24)),.1,0,'triangle',.05);k++;
  await A.sleep(T(150,60))}
 await A.sleep(400);btot.textContent=A.fmt(tot);
 if(r.full){A.sfx('jp');A.flash();A.shake();flashJP('GRAND');banner('GRAND JACKPOT!!','jp grand');tot+=A.jpVal('GRAND',b);await A.sleep(1800);btot.textContent=A.fmt(tot)}
 box.classList.add('final');tone(1047,.2);tone(1319,.2,.1);tone(1568,.4,.2,'triangle',.08);
 await A.sleep(T(1600,900));ov.classList.add('out');await A.sleep(400);ov.remove();gmEl.style.background='';return tot};

GAMES.list=GAMES.list.filter(g=>g.id!=='panda');GAMES.list.unshift(PF);GAMES.byId.panda=PF;
window.PANDA_F=PF;
if(typeof CHARS!=='undefined'){CHARS.panda=`<svg viewBox="0 -18 200 240"><g transform="translate(-12 46) scale(.56)">${EMPEROR.replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</g></svg>`}
if(typeof DECOR!=='undefined'){const o={svg:DECOR.svg,pano:DECOR.pano,fx:DECOR.fx,get:DECOR.get};DECOR.svg=id=>id==='panda'?BG:o.svg(id);DECOR.pano=id=>id==='panda'?BG:o.pano(id);DECOR.fx=id=>id==='panda'?'':o.fx(id);DECOR.get=id=>id==='panda'?{m:'🐼',pl:[],pr:[],orn:['',''],fx:['✦','twk',0,'#fff'],win:['황제의 축복!','복이 들어온다!'],big:['판다 황제 만세!!','항아리가 넘친다!!'],lose:['다음엔 꼭!'],idle:['코인 6개를 모아봐!']}:o.get(id)}
})();
