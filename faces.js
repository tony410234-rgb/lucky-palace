/* 태율랜드 — 얼굴 메달 심볼 (버팔로·드래곤) */
const FACES=(()=>{
const K='#1a0804';
const O=`stroke="${K}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;
let n=0;const uid=p=>p+(++n);
const rg=(id,c,cx=.5,cy=.38,r=.72)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${c.map((x,i)=>`<stop offset="${(i/(c.length-1)).toFixed(2)}" stop-color="${x}"/>`).join('')}</radialGradient>`;
const lg=(id,c,x2=0,y2=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${c.map((x,i)=>`<stop offset="${(i/(c.length-1)).toFixed(2)}" stop-color="${x}"/>`).join('')}</linearGradient>`;
const mir=s=>`<g transform="translate(100 0) scale(-1 1)">${s}</g>`;
/* 메달 프레임 */
const RING={gold:['#fffbe0','#ffd34d','#a86a08','#ffe58a','#5a3002'],orange:['#ffe0a0','#ff8a1a','#a03a04','#ffb060','#4a1402']};
function med(bg,face,ring='gold',size=1){const a=uid('m'),b=uid('m');
 return `<svg viewBox="0 0 100 100"><defs>${lg(a,RING[ring],1,1)}${rg(b,bg,.5,.35,.7)}</defs><ellipse cx="50" cy="96" rx="30" ry="3.5" fill="#000" opacity=".4"/><circle cx="50" cy="51" r="45" fill="#000" opacity=".45"/><circle cx="50" cy="49" r="45" fill="url(#${a})"/><circle cx="50" cy="49" r="40" fill="${K}"/><circle cx="50" cy="49" r="38.5" fill="url(#${b})"/><circle cx="50" cy="49" r="38.5" fill="url(#vig)"/><g transform="translate(50 50) scale(${size}) translate(-50 -50)">${face}</g><path d="M22 30a33 33 0 0 1 40-16" stroke="#fff" stroke-width="4" fill="none" opacity=".45" stroke-linecap="round"/></svg>`}
const eyeA=(x,y,col,rot=12)=>`<g transform="rotate(${rot} ${x} ${y})"><path d="M${x-7} ${y}q7-6 14 0q-7 4-14 0z" fill="${col}" stroke="${K}" stroke-width="1.6"/><circle cx="${x+1}" cy="${y-.4}" r="1.8" fill="${K}"/><circle cx="${x+.2}" cy="${y-1.4}" r=".7" fill="#fff"/></g><path d="M${x-9} ${y-6}l16 ${rot>0?4:-4}" stroke="${K}" stroke-width="3" stroke-linecap="round"/>`;

/* ---------- 버팔로 얼굴 (정면, 불꽃 갈기) ---------- */
function buffaloFace(gold){const m=uid('b'),f=uid('b'),h=uid('b'),z=uid('b');
 const C=gold?{m:['#fffbd0','#ffd34d','#c88a08','#6a4002'],f:['#ffe890','#e0a020','#8a5004'],z:['#a8781a','#5a3a06','#2a1802'],eye:'#fff'}:{m:['#ffd27a','#ff8a1a','#c0400a','#5a1402'],f:['#ffb860','#d8641a','#6a2406'],z:['#7a5aa0','#3a2a5a','#140a24'],eye:'#ffd34d'};
 const horn=`<path d="M30 34C18 34 8 26 8 12C14 20 22 24 32 24Z" fill="url(#${h})" ${O}/>`;
 const tuft=`<path d="M18 40L6 36L14 46L4 50L16 54L10 62L22 60Z" fill="url(#${m})" ${O}/>`;
 return `<defs>${rg(m,C.m,.5,.3,.8)}${rg(f,C.f,.5,.3,.8)}${lg(h,['#fffbec','#e8d8b0','#8a7650'],1,1)}${rg(z,C.z,.5,.3,.8)}</defs>
 ${horn}${mir(horn)}${tuft}${mir(tuft)}
 <path d="M50 8L58 18L66 10L68 22L78 18L74 30L84 32L76 40L70 66L60 80L50 84L40 80L30 66L24 40L16 32L26 30L22 18L32 22L34 10L42 18Z" fill="url(#${m})" ${O}/>
 <g stroke="#7a2a04" stroke-width="1.5" fill="none" opacity=".6"><path d="M40 20q4 8 0 14M60 20q-4 8 0 14M50 14v12M32 36q4 6 2 12M68 36q-4 6-2 12"/></g>
 <path d="M32 38Q50 30 68 38Q72 56 64 70L36 70Q28 56 32 38Z" fill="url(#${f})" ${O}/>
 <path d="M40 34q10-6 20 0q-2 8-10 8t-10-8z" fill="url(#${m})" ${O}/>
 ${eyeA(40,48,C.eye,14)}${mir(eyeA(40,48,C.eye,14))}
 <path d="M36 60Q50 54 64 60Q68 74 60 80Q50 84 40 80Q32 74 36 60Z" fill="url(#${z})" ${O}/>
 <ellipse cx="44" cy="70" rx="3.2" ry="4.2" fill="${K}" transform="rotate(-18 44 70)"/><ellipse cx="56" cy="70" rx="3.2" ry="4.2" fill="${K}" transform="rotate(18 56 70)"/>
 <path d="M40 62q10-4 20 0" stroke="#fff" stroke-width="1.6" fill="none" opacity=".45"/>
 <path d="M42 84l4 8 4-5 4 5 4-8" fill="url(#${m})" ${O}/>`}

/* ---------- 독수리 ---------- */
const eagle=()=>{const w=uid('e'),bk=uid('e');return `<defs>${rg(w,['#ffffff','#e8e8f4','#9a9ab8'],.4,.3,.8)}${lg(bk,['#fff0a0','#ffc22a','#c87a08'])}</defs>
 <path d="M22 86Q20 60 30 46Q26 30 40 20Q56 12 70 22Q80 30 76 46Q84 58 80 86Z" fill="#5a3a1a" ${O}/>
 <path d="M28 70Q30 46 38 30Q50 18 66 24Q76 30 74 44Q72 52 64 56L50 60L36 76Z" fill="url(#${w})" ${O}/>
 <g stroke="#8a8aa8" stroke-width="1.3" fill="none"><path d="M34 60l6-4M32 66l6-3M38 50l5-4"/></g>
 <path d="M62 40Q80 38 86 48Q84 60 74 62Q72 54 64 52Z" fill="url(#${bk})" ${O}/><path d="M84 50q2 8-6 12" fill="none" stroke="${K}" stroke-width="2"/>
 <path d="M50 38q8-5 14 0q-6 4-14 0z" fill="#ffc22a" stroke="${K}" stroke-width="1.6"/><circle cx="58" cy="38" r="2" fill="${K}"/><circle cx="57.3" cy="37.2" r=".7" fill="#fff"/><path d="M46 32l20 2" stroke="${K}" stroke-width="3" stroke-linecap="round"/>`};
/* ---------- 늑대 ---------- */
const wolf=()=>{const g=uid('w'),l=uid('w');const ear=`<path d="M26 40L22 10L42 28Z" fill="url(#${g})" ${O}/><path d="M28 34L26 18L37 28Z" fill="#3a3a4a"/>`;
 return `<defs>${rg(g,['#b8bccc','#6a6e84','#2a2c3a'],.5,.3,.8)}${rg(l,['#ffffff','#d8dce8','#9aa0b4'],.5,.3,.8)}</defs>
 ${ear}${mir(ear)}
 <path d="M50 22Q74 22 80 44Q82 60 72 70L60 88L40 88L28 70Q18 60 20 44Q26 22 50 22Z" fill="url(#${g})" ${O}/>
 <path d="M24 56L12 62L26 66L18 74L32 72Z" fill="url(#${g})" ${O}/>${mir('<path d="M24 56L12 62L26 66L18 74L32 72Z" fill="#6a6e84" '+O+'/>')}
 <path d="M38 52Q50 46 62 52L60 80Q50 90 40 80Z" fill="url(#${l})" ${O}/>
 <path d="M42 70h16l-8 8z" fill="${K}"/><path d="M44 82q6 4 12 0" stroke="${K}" stroke-width="2" fill="none"/>
 ${eyeA(38,48,'#ffd34d',14)}${mir(eyeA(38,48,'#ffd34d',14))}`};
/* ---------- 퓨마 ---------- */
const cougar=()=>{const g=uid('c'),l=uid('c');const ear=`<path d="M26 34Q22 16 36 20L40 30Z" fill="url(#${g})" ${O}/><path d="M28 30Q27 22 34 24L36 29Z" fill="#a0603a"/>`;
 return `<defs>${rg(g,['#f4d4a0','#d8a060','#8a5428'],.5,.3,.8)}${rg(l,['#ffffff','#f4e8d8','#c8b098'],.5,.3,.8)}</defs>
 ${ear}${mir(ear)}
 <path d="M50 22Q76 22 78 48Q78 66 66 78Q58 86 50 86Q42 86 34 78Q22 66 22 48Q24 22 50 22Z" fill="url(#${g})" ${O}/>
 <path d="M50 30v14M44 32l2 10M56 32l-2 10" stroke="#a0683a" stroke-width="1.8" stroke-linecap="round"/>
 <path d="M36 60Q50 52 64 60Q66 76 50 84Q34 76 36 60Z" fill="url(#${l})" ${O}/>
 <path d="M44 60h12l-6 6z" fill="#c0606a" stroke="${K}" stroke-width="1.5" stroke-linejoin="round"/><path d="M50 66v4M44 72q6 4 12 0" stroke="${K}" stroke-width="1.8" fill="none"/>
 <path d="M34 52q2 10 10 10" stroke="#8a5428" stroke-width="2" fill="none"/>${mir('<path d="M34 52q2 10 10 10" stroke="#8a5428" stroke-width="2" fill="none"/>')}
 <g transform="translate(0 -2)">${eyeA(38,48,'#a8e04a',10)}${mir(eyeA(38,48,'#a8e04a',10))}</g>`};
/* ---------- 여우 ---------- */
const fox=()=>{const g=uid('f'),l=uid('f');const ear=`<path d="M24 46L18 12L44 30Z" fill="url(#${g})" ${O}/><path d="M26 38L23 20L38 30Z" fill="#3a1a0a"/>`;
 return `<defs>${rg(g,['#ffc070','#f07a1a','#a03a04'],.5,.3,.8)}${rg(l,['#ffffff','#fff0e0','#d8c0a8'],.5,.3,.8)}</defs>
 ${ear}${mir(ear)}
 <path d="M50 26Q76 26 82 50L66 76Q58 88 50 88Q42 88 34 76L18 50Q24 26 50 26Z" fill="url(#${g})" ${O}/>
 <path d="M18 50Q32 50 40 62L50 88L34 76Z" fill="url(#${l})" ${O}/>${mir(`<path d="M18 50Q32 50 40 62L50 88L34 76Z" fill="url(#${l})" ${O}/>`)}
 <ellipse cx="50" cy="82" rx="5" ry="3.5" fill="${K}"/>
 <path d="M42 70q8 6 16 0" stroke="${K}" stroke-width="1.6" fill="none"/>
 ${eyeA(38,50,'#ffd34d',10)}${mir(eyeA(38,50,'#ffd34d',10))}`};

/* ---------- 드래곤 게임 ---------- */
const lantern=()=>{const r=uid('l'),gd=uid('l');return `<defs>${rg(r,['#ffd0a0','#ff3a2a','#a0060a','#4a0204'],.45,.35,.8)}${lg(gd,['#fffbe0','#ffcc33','#a86a08'])}</defs>
 <path d="M50 8v8" stroke="${K}" stroke-width="3"/><rect x="36" y="14" width="28" height="8" rx="3" fill="url(#${gd})" ${O}/>
 <path d="M30 22Q16 50 30 78L70 78Q84 50 70 22Z" fill="url(#${r})" ${O}/>
 <g stroke="#ffcc33" stroke-width="1.6" fill="none" opacity=".85"><path d="M40 22Q32 50 40 78M60 22Q68 50 60 78M50 22v56"/></g>
 <rect x="34" y="78" width="32" height="8" rx="3" fill="url(#${gd})" ${O}/>
 <g stroke="#ffcc33" stroke-width="2"><path d="M42 86v8M47 86v10M53 86v10M58 86v8"/></g>
 <ellipse cx="38" cy="38" rx="6" ry="12" fill="#fff" opacity=".35"/>
 <text x="50" y="58" text-anchor="middle" font-family="serif" font-weight="900" font-size="20" fill="#ffe08a" stroke="${K}" stroke-width="1" paint-order="stroke">夜</text>`};
const ccoin=()=>{const g=uid('o'),d=uid('o');return `<defs>${rg(g,['#fffbe0','#ffd34d','#b8770c','#5a3002'],.4,.3,.8)}${rg(d,['#3a6a6a','#1a3a3a','#0a1a1a'],.5,.4,.7)}</defs>
 <circle cx="50" cy="52" r="36" fill="url(#${g})" ${O}/><circle cx="50" cy="52" r="29" fill="none" stroke="#8a5004" stroke-width="2"/>
 <rect x="39" y="41" width="22" height="22" fill="url(#${d})" ${O} transform="rotate(8 50 52)"/>
 <g font-family="serif" font-weight="900" font-size="13" fill="#7a4004" text-anchor="middle"><text x="50" y="35">通</text><text x="50" y="79">寶</text><text x="30" y="57">元</text><text x="70" y="57">豐</text></g>
 <path d="M24 38a28 28 0 0 1 20-16" stroke="#fff" stroke-width="3.5" fill="none" opacity=".6" stroke-linecap="round"/>`};
const cracker=()=>{const g=uid('k'),gd=uid('k');return `<defs>${lg(g,['#8ae0a0','#1a9a4a','#063a18'],1,0)}${lg(gd,['#fffbe0','#ffcc33','#a86a08'])}</defs>
 <g transform="rotate(-30 50 54)"><rect x="22" y="40" width="56" height="28" rx="6" fill="url(#${g})" ${O}/><rect x="22" y="40" width="10" height="28" rx="4" fill="url(#${gd})" ${O}/><rect x="68" y="40" width="10" height="28" rx="4" fill="url(#${gd})" ${O}/>
 <text x="50" y="60" text-anchor="middle" font-family="serif" font-weight="900" font-size="16" fill="#ffe08a" stroke="${K}" stroke-width="1" paint-order="stroke">爆</text><path d="M78 54q8 0 10-6" stroke="${K}" stroke-width="2.5" fill="none"/></g>
 <g transform="translate(26 74)"><path d="M0-14l3 9 10-3-7 8 8 6-10 0-2 10-3-10-10 2 7-8-7-7 10 2z" fill="#fff6a0" stroke="#ff7a1a" stroke-width="1.5"/></g>`};
const gdragon=()=>{const g=uid('d'),s=uid('d');const horn=`<path d="M34 32Q24 14 12 8Q18 20 26 30Q16 24 8 24Q20 32 30 38Z" fill="url(#${g})" ${O}/>`;
 const wh=`<path d="M30 66Q12 70 8 86Q16 76 30 74" fill="none" stroke="#ffcc33" stroke-width="3" stroke-linecap="round"/>`;
 return `<defs>${rg(g,['#fffbe0','#ffd34d','#c88a08','#5a3002'],.45,.3,.8)}${rg(s,['#ffe8a0','#e0a020','#8a5004'],.5,.3,.8)}</defs>
 ${horn}${mir(horn)}${wh}${mir(wh)}
 <path d="M50 20Q74 22 76 44Q78 58 70 66L62 84Q50 92 38 84L30 66Q22 58 24 44Q26 22 50 20Z" fill="url(#${g})" ${O}/>
 <path d="M28 42L14 46L26 52L16 60L30 58Z" fill="#e05a1a" ${O}/>${mir(`<path d="M28 42L14 46L26 52L16 60L30 58Z" fill="#e05a1a" ${O}/>`)}
 <g stroke="#8a5004" stroke-width="1.3" fill="none" opacity=".7"><path d="M42 28q8 4 16 0M40 34q10 5 20 0"/></g>
 <path d="M36 62Q50 56 64 62Q66 78 50 84Q34 78 36 62Z" fill="url(#${s})" ${O}/>
 <ellipse cx="44" cy="66" rx="2.6" ry="2" fill="${K}"/><ellipse cx="56" cy="66" rx="2.6" ry="2" fill="${K}"/>
 <path d="M40 76q10 6 20 0" stroke="${K}" stroke-width="2" fill="#7a0a10"/><path d="M42 76l2 4 2-3M58 76l-2 4-2-3" fill="#fff" stroke="${K}" stroke-width="1"/>
 ${eyeA(38,48,'#ff3a2a',14)}${mir(eyeA(38,48,'#ff3a2a',14))}`};
function fuWild(F){const r=uid('u'),gd=uid('u');return `<svg viewBox="0 0 100 100"><defs>${lg(r,['#c02a1a','#7a0a0a','#3a0204'])}${lg(gd,['#fffbe0','#ffcc33','#c88a08','#6a4002'])}</defs>
 <rect x="3" y="5" width="94" height="94" rx="6" fill="#000" opacity=".5"/><rect x="2" y="1" width="96" height="95" rx="6" fill="url(#gF)"/><rect x="7" y="6" width="86" height="85" rx="4" fill="url(#${r})"/>
 <g stroke="#ffcc33" stroke-width="1.2" fill="none" opacity=".4"><path d="M12 12h76v74H12zM16 16h68v66H16z"/></g>
 <g fill="#ffcc33" opacity=".7"><path d="M12 12l8 0-8 8zM88 12l-8 0 8 8zM12 86l8 0-8-8zM88 86l-8 0 8-8z"/></g>
 <text x="50" y="62" text-anchor="middle" font-family="'Noto Serif KR','Noto Serif CJK KR',serif" font-weight="900" font-size="56" fill="#5a0606" opacity=".7">福</text>
 <text x="50" y="59" text-anchor="middle" font-family="'Noto Serif KR','Noto Serif CJK KR',serif" font-weight="900" font-size="56" fill="url(#${gd})" stroke="#5a2a02" stroke-width="1.2">福</text>
 <rect x="10" y="70" width="80" height="20" rx="3" fill="#3a0204" stroke="url(#${gd})" stroke-width="2"/>
 <text x="50" y="86" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="17" fill="url(#${gd})" stroke="#2a0002" stroke-width="2.5" paint-order="stroke">WILD</text></svg>`}
function yinyang(){const p=uid('y'),gd=uid('y');return `<svg viewBox="0 0 100 100"><defs>${rg(p,['#9a5ad0','#4a1a8a','#1a0838'],.5,.4,.7)}${lg(gd,['#fffbe0','#ffcc33','#a86a08'])}</defs>
 <rect x="3" y="5" width="94" height="94" rx="8" fill="#000" opacity=".5"/><rect x="2" y="1" width="96" height="95" rx="8" fill="url(#${gd})"/><rect x="6" y="5" width="88" height="87" rx="6" fill="url(#${p})"/>
 <g stroke="#c89aff" stroke-width="1" fill="none" opacity=".35"><path d="M10 20q20 10 40 0t40 0M10 34q20 10 40 0t40 0"/></g>
 <g transform="translate(50 42)"><circle r="27" fill="#000" opacity=".4" transform="translate(0 2)"/><circle r="27" fill="#fff" stroke="url(#${gd})" stroke-width="3"/><path d="M0-27a27 27 0 0 1 0 54a13.5 13.5 0 0 1 0-27a13.5 13.5 0 0 0 0-27z" fill="#14081e"/><circle cy="-13.5" r="4.5" fill="#14081e"/><circle cy="13.5" r="4.5" fill="#fff"/><ellipse cx="-12" cy="-14" rx="7" ry="4" fill="#fff" opacity=".5"/></g>
 <path d="M4 74h92l-6 18H10z" fill="#3a0a6a" stroke="url(#${gd})" stroke-width="2"/><text x="50" y="88" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="14" fill="url(#${gd})" stroke="#1a0030" stroke-width="2.5" paint-order="stroke">SCATTER</text></svg>`}

/* 시네마틱 러너용 큰 얼굴 */
const runner=f=>`<svg viewBox="0 0 100 100">${f}</svg>`;

/* ---------- 적용 ---------- */
if(typeof GAMES!=='undefined'){
 const BF=GAMES.byId.buffalo,DR=GAMES.byId.dragon;
 if(BF){Object.assign(BF.ART,{buf:med(['#ffb050','#c0400a','#3a0a02'],buffaloFace(false),'orange',1.12),bufG:med(['#fff6c0','#ffc22a','#7a4a02'],buffaloFace(true),'gold',1.12),
  eag:med(['#d0a0ff','#7a2ad0','#26064a'],eagle()),wolf:med(['#a0d0ff','#2a6ad0','#081a5a'],wolf()),cou:med(['#fff0a0','#e0b020','#6a4600'],cougar()),elk:med(['#a8f0a0','#2aa04a','#063a18'],fox())});}
 if(DR){Object.assign(DR.ART,{koi:med(['#ffe0a0','#c08a2a','#3a2004'],lantern(),'gold',.95),tur:med(['#a0e0d0','#2a7a6a','#06302a'],ccoin(),'gold',.95),pea:med(['#ffe0a0','#c06a1a','#3a1404'],cracker(),'gold',.95),
  drg:med(['#ff8a5a','#c0200a','#3a0204'],gdragon(),'gold',1.08),W:fuWild(),S:yinyang()});}
}
return {buffalo:runner(buffaloFace(false)),dragon:runner(gdragon()),buffaloG:runner(buffaloFace(true))};
})();
