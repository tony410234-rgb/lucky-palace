/* 태율랜드 — 멋있는 캐릭터 4종 (강렬한 반실사풍 일러스트) */
(()=>{
if(typeof CHARS==='undefined')return;
const D='#120604';
const OL=`stroke="${D}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const rg=(id,stops,cx=.5,cy=.4,r=.7)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map((c,i)=>`<stop offset="${(i/(stops.length-1)).toFixed(2)}" stop-color="${c}"/>`).join('')}</radialGradient>`;
const lg=(id,stops,x2=0,y2=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map((c,i)=>`<stop offset="${(i/(stops.length-1)).toFixed(2)}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const GLOW=`<filter id="hglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5"/></filter><filter id="hsoft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.2"/></filter>`;
const S=(defs,body)=>`<svg viewBox="0 -18 200 240"><defs>${GLOW}${defs}</defs><ellipse cx="100" cy="214" rx="78" ry="8" fill="#000" opacity=".45"/>${body}</svg>`;
const rays=(cx,cy,r1,r2,n,fill,op=.55)=>`<path d="${Array.from({length:n},(_,i)=>{const a=i/n*Math.PI*2,b=(i+.5)/n*Math.PI*2,c=(i+1)/n*Math.PI*2;return `M${cx+Math.cos(a)*r1} ${cy+Math.sin(a)*r1}L${cx+Math.cos(b)*r2} ${cy+Math.sin(b)*r2}L${cx+Math.cos(c)*r1} ${cy+Math.sin(c)*r1}`}).join('')}Z" fill="${fill}" opacity="${op}"/>`;
const strands=(pts,col,w=1.8,op=.7)=>`<g stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" opacity="${op}">${pts.map(([x,y,dx,dy])=>`<path d="M${x} ${y}q${dx/2} ${dy*.2} ${dx} ${dy}"/>`).join('')}</g>`;
const mirror=s=>`<g transform="translate(200 0) scale(-1 1)">${s}</g>`;

/* ---------------- 썬더 버팔로: 불꽃 속 성난 들소 ---------------- */
const bHorn=`<path d="M64 76C30 86 -2 66 -4 26C-5 10 4 -6 16 -14C12 10 18 40 38 52C50 58 60 58 70 56Z" fill="url(#bh)" ${OL}/><g stroke="#8a7450" stroke-width="1.6" fill="none" opacity=".8"><path d="M14 40q8 4 12-6"/><path d="M22 54q8 2 10-8"/><path d="M36 64q8 0 8-8"/></g><path d="M12 -6q-8 24 6 46" stroke="#fff" stroke-width="2.5" fill="none" opacity=".6"/>`;
const bEye=`<path d="M70 92Q82 84 95 94Q84 100 70 92Z" fill="#ff8a1a" filter="url(#hglow)"/><path d="M70 92Q82 84 95 94Q84 100 70 92Z" fill="url(#be)" stroke="${D}" stroke-width="2"/><ellipse cx="85" cy="93" rx="3" ry="4" fill="${D}"/><circle cx="83.5" cy="91.5" r="1.3" fill="#fff"/><path d="M66 82L96 92" stroke="${D}" stroke-width="6" stroke-linecap="round"/>`;
const buffalo=S(rg('bf',['#fff6b0','#ffb02a','#ff5a10','#a01a00','rgba(160,26,0,0)'],.5,.45,.55)+rg('bfur',['#c88a50','#7a4220','#2e1206'],.5,.28,.75)+rg('bman',['#8a5228','#3e1c08','#140702'],.5,.25,.8)+rg('bmz',['#c08858','#7a4a24','#3a1a08'],.5,.25,.8)+lg('bh',['#fffbec','#efdcb4','#b09a70','#4a3a22'],1,1)+rg('be',['#fffbd0','#ffc23a','#c04a00'],.4,.4,.7),`
 <circle cx="100" cy="96" r="104" fill="url(#bf)"/>${rays(100,96,70,112,18,'#ff7a1a',.45)}
 <path d="M4 222Q8 150 58 130Q100 116 142 130Q192 150 196 222Z" fill="url(#bman)" ${OL}/>
 ${strands([[30,170,10,22],[44,156,8,24],[60,146,6,26],[150,150,-8,24],[164,162,-10,22],[176,180,-8,20],[80,140,4,22],[120,140,-4,22],[100,150,0,20]],'#9a6a40',2,.7)}
 ${bHorn}${mirror(bHorn)}
 <ellipse cx="52" cy="98" rx="16" ry="8" fill="url(#bfur)" ${OL} transform="rotate(-25 52 98)"/><ellipse cx="148" cy="98" rx="16" ry="8" fill="url(#bfur)" ${OL} transform="rotate(25 148 98)"/>
 <path d="M60 54Q100 32 140 54Q154 92 142 124Q128 152 100 158Q72 152 58 124Q46 92 60 54Z" fill="url(#bfur)" ${OL}/>
 <path d="M50 74Q42 42 68 36Q78 14 100 22Q122 12 134 36Q160 42 150 74Q132 62 100 68Q70 62 50 74Z" fill="url(#bman)" ${OL}/>
 ${strands([[60,58,8,-10],[72,46,8,-12],[86,40,6,-14],[100,36,0,-14],[114,40,-6,-14],[128,46,-8,-12],[140,58,-8,-10],[66,68,10,-6],[134,68,-10,-6]],'#7a4a24',2.2,.8)}
 ${bEye}${mirror(bEye)}
 <path d="M72 112Q100 98 128 112Q136 138 116 150Q100 158 84 150Q64 138 72 112Z" fill="url(#bmz)" ${OL}/>
 <ellipse cx="89" cy="130" rx="6" ry="8" fill="${D}" transform="rotate(-20 89 130)"/><ellipse cx="111" cy="130" rx="6" ry="8" fill="${D}" transform="rotate(20 111 130)"/>
 <path d="M84 110q16-6 32 0" stroke="#e0b088" stroke-width="3" fill="none" opacity=".7"/>
 <path d="M80 152l6 16 6-10 8 16 8-16 6 10 6-16" fill="url(#bman)" ${OL}/>
 <path d="M90 146a10 10 0 0 0 20 0" fill="none" stroke="${D}" stroke-width="7"/><path d="M90 146a10 10 0 0 0 20 0" fill="none" stroke="#ffd34d" stroke-width="4"/>
 <g fill="#ffd34d"><circle cx="24" cy="120" r="2.5"/><circle cx="176" cy="110" r="2"/><circle cx="34" cy="92" r="1.6"/><circle cx="170" cy="140" r="2.6"/><circle cx="16" cy="150" r="1.8"/></g>
 <path d="M140 56Q154 92 142 124" stroke="#ffb050" stroke-width="2.5" fill="none" opacity=".8"/><path d="M60 54Q100 32 140 54" stroke="#ffc870" stroke-width="2" fill="none" opacity=".5"/>`);

/* ---------------- 골든 타이거: 포효하는 호랑이 ---------------- */
const tStripe=`<g fill="${D}"><path d="M34 74l26 6-24 4z"/><path d="M30 94l28 2-26 8z"/><path d="M36 114l24-4-18 12z"/><path d="M62 52l14 14-18-6z"/><path d="M40 150l20-12-10 18z"/></g>`;
const tEye=`<path d="M66 86Q78 76 92 86Q80 94 66 86Z" fill="#c8ff4a" filter="url(#hglow)" opacity=".8"/><path d="M66 86Q78 76 92 86Q80 94 66 86Z" fill="url(#te)" stroke="${D}" stroke-width="2.5"/><ellipse cx="80" cy="85.5" rx="2.2" ry="5" fill="${D}"/><circle cx="78" cy="83" r="1.4" fill="#fff"/><path d="M60 76L92 82" stroke="${D}" stroke-width="5" stroke-linecap="round"/><path d="M64 90q-6 6-4 14" stroke="${D}" stroke-width="3" fill="none"/>`;
const tEar=`<path d="M36 52L30 12L70 34Z" fill="url(#to2)" ${OL}/><path d="M40 44L37 22L60 34Z" fill="#fff4e0"/><path d="M38 38q4 4 2 8" stroke="${D}" stroke-width="3"/>`;
const tRuff=`<path d="M30 110L6 118 24 126 4 140 28 142 14 160 40 154 46 170 60 156Z" fill="url(#tw2)" ${OL}/>`;
const tiger=S(rg('tg',['#fffbe0','#ffe066','#ffb02a','rgba(255,140,0,0)'],.5,.4,.55)+rg('to2',['#ffd080','#ff8a1a','#b84a04'],.5,.3,.75)+rg('tw2',['#ffffff','#fff2e0','#d8c0a0'],.4,.3,.8)+rg('te',['#f8ffb0','#b8f02a','#4a8a0a'],.4,.4,.7)+rg('tm',['#a01a2a','#5a0610','#2a0206'],.5,.3,.8),`
 <circle cx="100" cy="92" r="100" fill="url(#tg)"/>${rays(100,92,72,108,16,'#ffd34d',.5)}
 <path d="M10 222Q14 160 60 144L140 144Q186 160 190 222Z" fill="url(#to2)" ${OL}/><g fill="${D}"><path d="M40 190l26-8-20 14z"/><path d="M160 190l-26-8 20 14z"/><path d="M30 210l22-4-18 12z"/><path d="M170 210l-22-4 18 12z"/></g><path d="M70 150Q100 170 130 150L120 222H80Z" fill="url(#tw2)" ${OL}/>
 ${tEar}${mirror(tEar)}
 <path d="M28 70Q40 30 100 26Q160 30 172 70Q182 112 160 142Q132 170 100 172Q68 170 40 142Q18 112 28 70Z" fill="url(#to2)" ${OL}/>
 ${tRuff}${mirror(tRuff)}${tStripe}${mirror(tStripe)}
 <g fill="${D}"><path d="M100 30l-6 18 6 8 6-8z"/><path d="M84 34l4 16-10-10z"/><path d="M116 34l-4 16 10-10z"/><path d="M92 58l8 10 8-10-8 4z"/></g>
 ${tEye}${mirror(tEye)}
 <path d="M76 102Q100 92 124 102Q132 124 118 132L82 132Q68 124 76 102Z" fill="url(#tw2)" ${OL}/>
 <path d="M88 100h24l-12 12z" fill="#e0607a" stroke="${D}" stroke-width="2.5" stroke-linejoin="round"/><path d="M100 112v8" stroke="${D}" stroke-width="3"/>
 <path d="M74 124Q100 114 126 124Q126 158 100 164Q74 158 74 124Z" fill="url(#tm)" ${OL}/><path d="M88 150q12-8 24 0q-4 10-12 10t-12-10z" fill="#ff7a9a"/>
 <path d="M80 124l5 18 5-16zM120 124l-5 18-5-16zM86 158l4-10 4 9zM114 158l-4-10-4 9z" fill="#fff" stroke="${D}" stroke-width="1.5" stroke-linejoin="round"/>
 <g fill="${D}" opacity=".8"><circle cx="82" cy="114" r="1.6"/><circle cx="76" cy="118" r="1.6"/><circle cx="118" cy="114" r="1.6"/><circle cx="124" cy="118" r="1.6"/></g>
 <path d="M70 116l-40-6M70 122l-38 4M130 116l40-6M130 122l38 4" stroke="#fff" stroke-width="1.6" opacity=".85"/>
 <path d="M172 70Q182 112 160 142" stroke="#ffe080" stroke-width="2.5" fill="none" opacity=".8"/>`);

/* ---------------- 드래곤 포춘: 비취빛 황제 용 ---------------- */
const dWh=`<path d="M64 116Q30 120 18 150Q10 172 30 178Q44 180 40 166" fill="none" stroke="${D}" stroke-width="7" stroke-linecap="round"/><path d="M64 116Q30 120 18 150Q10 172 30 178Q44 180 40 166" fill="none" stroke="url(#dgo)" stroke-width="4" stroke-linecap="round"/>`;
const dAnt=`<path d="M70 42Q58 18 40 4M56 22Q44 22 34 28M62 30Q52 34 46 44" fill="none" stroke="${D}" stroke-width="9" stroke-linecap="round"/><path d="M70 42Q58 18 40 4M56 22Q44 22 34 28M62 30Q52 34 46 44" fill="none" stroke="url(#dgo)" stroke-width="5" stroke-linecap="round"/>`;
const dEye=`<path d="M64 74Q76 64 90 74Q78 82 64 74Z" fill="#ffd34d" filter="url(#hglow)"/><path d="M64 74Q76 64 90 74Q78 82 64 74Z" fill="url(#dey)" stroke="${D}" stroke-width="2.5"/><ellipse cx="78" cy="73.5" rx="2" ry="5" fill="${D}"/><circle cx="76" cy="71" r="1.3" fill="#fff"/><path d="M56 64Q74 52 94 66" fill="url(#dsc)" stroke="${D}" stroke-width="3"/>`;
const scales=(x0,y0,cols,rows,r,col)=>{let s='';for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const x=x0+i*r*2+(j%2)*r,y=y0+j*r*1.3;s+=`<path d="M${x-r} ${y}a${r} ${r} 0 0 0 ${2*r} 0" fill="none" stroke="${col}" stroke-width="1.4"/>`}return s};
const dragon=S(rg('dgl',['#fffbe0','#ffcf4a','#ff6a1a','rgba(200,40,0,0)'],.5,.45,.55)+rg('dsc',['#a8ffcf','#1ac07a','#06603a','#032a18'],.45,.3,.8)+lg('dgo',['#fffbe0','#ffcc33','#a86a08'])+rg('dfl',['#fff2a0','#ff8a1a','#c01a0a'],.5,.6,.8)+rg('dey',['#fffbe0','#ffd34d','#c86a00'],.4,.4,.7)+rg('dpl',['#ffffff','#bff0ff','#3a9ad0'],.35,.3,.8)+rg('dsn',['#d8ffe8','#5ad89a','#0a7a4a'],.5,.25,.8),`
 <circle cx="100" cy="92" r="102" fill="url(#dgl)"/>
 <path d="M150 222Q190 170 160 140Q130 112 170 80" fill="none" stroke="${D}" stroke-width="36" stroke-linecap="round"/><path d="M150 222Q190 170 160 140Q130 112 170 80" fill="none" stroke="url(#dsc)" stroke-width="30" stroke-linecap="round"/><path d="M150 222Q190 170 160 140Q130 112 170 80" fill="none" stroke="#ffd34d" stroke-width="10" stroke-dasharray="6 8" opacity=".85"/>
 <path d="M30 90L6 70L26 66L4 40L32 44L22 14L50 32L58 4L76 28L100 0L124 28L142 4L150 32L178 14L168 44L196 40L174 66L194 70L170 90Z" fill="url(#dfl)" ${OL}/>
 ${dAnt}${mirror(dAnt)}
 <path d="M54 46Q100 24 146 46Q156 74 140 96L60 96Q44 74 54 46Z" fill="url(#dsc)" ${OL}/>
 <g opacity=".55">${scales(70,46,5,3,6,'#062a18')}</g>
 ${dEye}${mirror(dEye)}
 <path d="M62 92Q100 80 138 92Q150 124 132 140Q100 152 68 140Q50 124 62 92Z" fill="url(#dsn)" ${OL}/>
 <path d="M80 100q-8-10 2-14q8 2 4 12zM120 100q8-10-2-14q-8 2-4 12z" fill="url(#dsc)" ${OL}/><ellipse cx="84" cy="104" rx="4" ry="3" fill="${D}"/><ellipse cx="116" cy="104" rx="4" ry="3" fill="${D}"/>
 <path d="M70 130Q100 150 130 130Q126 156 100 160Q74 156 70 130Z" fill="#5a0610" ${OL}/><path d="M76 132l4 12 4-11zM124 132l-4 12-4-11zM90 136l3 7 3-6zM110 136l-3 7-3-6z" fill="#fff" stroke="${D}" stroke-width="1.5"/>
 ${dWh}${mirror(dWh)}
 <path d="M84 160l6 14 4-8 6 14 6-14 4 8 6-14" fill="url(#dgo)" ${OL}/>
 <circle cx="100" cy="196" r="22" fill="#9af0ff" opacity=".45" filter="url(#hglow)"/><circle cx="100" cy="196" r="16" fill="url(#dpl)" ${OL}/><ellipse cx="94" cy="190" rx="5" ry="3" fill="#fff"/>
 <path d="M76 204q-4-14 8-18M124 204q4-14-8-18M82 210l-6 6M118 210l6 6" stroke="url(#dgo)" stroke-width="5" fill="none" stroke-linecap="round"/>
 <path d="M146 46Q156 74 140 96" stroke="#c8ffe0" stroke-width="2.5" fill="none" opacity=".7"/>`);

/* ---------------- 스카라베 골드: 아누비스 ---------------- */
const aEye=`<path d="M70 92Q80 84 92 92Q80 98 70 92Z" fill="#3af0ff" filter="url(#hglow)"/><path d="M70 92Q80 84 92 92Q80 98 70 92Z" fill="url(#aey)" stroke="${D}" stroke-width="2"/><ellipse cx="82" cy="91.5" rx="2.4" ry="3.2" fill="${D}"/><path d="M68 92q-10 2-14 10" stroke="${D}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M66 82L94 88" stroke="#ffd34d" stroke-width="3" stroke-linecap="round"/>`;
const aLap=`<path d="M44 70Q34 130 46 180L76 176Q68 130 76 84Z" fill="url(#ago)" ${OL}/><g stroke="#1a3ac8" stroke-width="6"><path d="M42 96h32"/><path d="M42 116h32"/><path d="M44 136h30"/><path d="M45 156h30"/></g>`;
const anubis=S(rg('asun',['#fffbe0','#ffd34d','#e08a0a','rgba(224,138,10,0)'],.5,.35,.6)+rg('ablk',['#5a5a78','#24243a','#08080e'],.45,.3,.8)+lg('ago',['#fffbe0','#ffcc33','#a86a08'])+rg('aey',['#e8fdff','#3ae0ff','#0a6a9a'],.4,.4,.7),`
 <circle cx="100" cy="74" r="86" fill="url(#asun)"/><circle cx="100" cy="74" r="60" fill="none" stroke="#fff3b0" stroke-width="3" opacity=".7"/>${rays(100,74,62,96,24,'#ffe080',.5)}
 <path d="M24 222Q28 172 66 160L134 160Q172 172 176 222Z" fill="url(#ablk)" ${OL}/>
 <path d="M44 172Q100 214 156 172L150 200Q100 236 50 200Z" fill="url(#ago)" ${OL}/><path d="M50 184Q100 222 150 184" stroke="#1a3ac8" stroke-width="5" fill="none"/><path d="M54 194Q100 230 146 194" stroke="#e0102a" stroke-width="4" fill="none"/>
 ${aLap}${mirror(aLap)}
 <path d="M66 52L56 -6L90 34ZM134 52L144 -6L110 34Z" fill="url(#ablk)" ${OL}/><path d="M68 40L62 6L84 32ZM132 40L138 6L116 32Z" fill="url(#ago)" opacity=".85"/>
 <path d="M64 50Q100 30 136 50Q144 80 128 100L114 150Q100 168 86 150L72 100Q56 80 64 50Z" fill="url(#ablk)" ${OL}/>
 <path d="M56 58Q100 34 144 58L140 70Q100 50 60 70Z" fill="url(#ago)" ${OL}/><path d="M64 60Q100 42 136 60" stroke="#1a3ac8" stroke-width="3" fill="none"/>
 <path d="M100 28q-10 8 0 22q10-14 0-22z" fill="url(#ago)" ${OL}/><circle cx="100" cy="40" r="3.5" fill="#e0102a"/>
 ${aEye}${mirror(aEye)}
 <path d="M92 146q8 8 16 0q-2 8-8 10q-6-2-8-10z" fill="${D}"/><path d="M94 120q6 18 6 26M106 120q-6 18-6 26" stroke="#4a4a6a" stroke-width="2" fill="none" opacity=".8"/>
 <path d="M136 50Q144 80 128 100L114 150" stroke="#9a7aff" stroke-width="2.5" fill="none" opacity=".7"/>`);

Object.assign(CHARS,{buffalo,tiger,dragon,egypt:anubis});
CHARS.__hero={buffalo:1,tiger:1,dragon:1,egypt:1};

/* 귀여운 친구들: 스티커 외곽선으로 화풍 차별화 */
const sticker=(svg)=>svg.replace('<defs>','<defs><filter id="stk" x="-10%" y="-10%" width="120%" height="120%"><feMorphology in="SourceAlpha" operator="dilate" radius="5" result="d"/><feFlood flood-color="#ffffff"/><feComposite in2="d" operator="in" result="w"/><feMorphology in="SourceAlpha" operator="dilate" radius="7" result="d2"/><feFlood flood-color="#2b1a2e" flood-opacity=".55"/><feComposite in2="d2" operator="in" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="w"/><feMergeNode in="SourceGraphic"/></feMerge></filter>').replace(/(<\/defs>)(<ellipse cx="100" cy="213"[^>]*\/>)?([\s\S]*)(<\/svg>)$/,'$1$2<g filter="url(#stk)">$3</g>$4');
CHARS.piggy=sticker(CHARS.piggy);CHARS.lucky=sticker(CHARS.lucky);
})();
