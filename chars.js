/* 태율랜드 캐릭터 일러스트 (직접 그린 SVG) */
const CHARS=(()=>{
const O='stroke="#2b1a2e" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"';
const rg=(id,a,b,c,cx=.36,cy=.28)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r=".8"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient>`;
const lg=(id,a,b,c)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
const COMMON=`${lg('gold','#fff6c0','#ffc22a','#a86a08')}${rg('coin','#fffbe0','#ffd34d','#a8620a')}<linearGradient id="eyeT" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#7a5aff" stop-opacity=".55"/></linearGradient>`;
const eye=(x,y,s=1,col='#1b1024')=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="10" ry="12.5" fill="${col}"/><ellipse rx="10" ry="12.5" fill="url(#eyeT)"/><ellipse cx="-3.5" cy="-5" rx="4.2" ry="5" fill="#fff"/><circle cx="3.6" cy="4.6" r="2.2" fill="#fff" opacity=".9"/></g>`;
const blush=(x,y,r=9)=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.6}" fill="#ff5a90" opacity=".45"/>`;
const shine=(x,y,rx,ry,rot=-25,o=.5)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity="${o}" transform="rotate(${rot} ${x} ${y})"/>`;
const shadow=`<ellipse cx="100" cy="213" rx="66" ry="7" fill="#000" opacity=".32"/>`;
const S=(defs,body)=>`<svg viewBox="0 -18 200 240"><defs>${COMMON}${defs}</defs>${shadow}${body}</svg>`;
const coinG=(x,y,r)=>`<circle cx="${x}" cy="${y+2}" r="${r}" fill="#7a4503"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#coin)" ${O}/><circle cx="${x}" cy="${y}" r="${r*.72}" fill="none" stroke="#fff3b0" stroke-width="2.5"/><text x="${x}" y="${y+r*.38}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="${r*1.05}" fill="#a0560a">$</text>${shine(x-r*.35,y-r*.4,r*.35,r*.18)}`;

const panda=S(rg('pw','#ffffff','#f1eef6','#bdb6cc')+rg('pk','#55506a','#26222f','#0d0b12')+lg('ing','#fffbe0','#ffcc33','#b8740a'),`
 <ellipse cx="70" cy="201" rx="21" ry="14" fill="url(#pk)" ${O}/><ellipse cx="130" cy="201" rx="21" ry="14" fill="url(#pk)" ${O}/>
 <ellipse cx="66" cy="203" rx="9" ry="6" fill="#4a4458"/><ellipse cx="134" cy="203" rx="9" ry="6" fill="#4a4458"/>
 <ellipse cx="100" cy="166" rx="52" ry="44" fill="url(#pw)" ${O}/>
 <path d="M64 156q36-18 72 0l-9 25q-27 10-54 0z" fill="url(#ing)" ${O}/><ellipse cx="100" cy="151" rx="19" ry="12" fill="url(#ing)" ${O}/>${shine(92,146,8,4,-10,.7)}<path d="M74 164q26 8 52 0" stroke="#fff6c0" stroke-width="3" fill="none" opacity=".8"/>
 <ellipse cx="58" cy="160" rx="16" ry="24" fill="url(#pk)" ${O} transform="rotate(35 58 160)"/><ellipse cx="142" cy="160" rx="16" ry="24" fill="url(#pk)" ${O} transform="rotate(-35 142 160)"/>
 <circle cx="48" cy="38" r="23" fill="url(#pk)" ${O}/><circle cx="152" cy="38" r="23" fill="url(#pk)" ${O}/><circle cx="50" cy="40" r="11" fill="#6a6480"/><circle cx="150" cy="40" r="11" fill="#6a6480"/>
 <ellipse cx="100" cy="86" rx="66" ry="57" fill="url(#pw)" ${O}/>
 <ellipse cx="73" cy="91" rx="18" ry="23" fill="url(#pk)" transform="rotate(-28 73 91)"/><ellipse cx="127" cy="91" rx="18" ry="23" fill="url(#pk)" transform="rotate(28 127 91)"/>
 <circle cx="75" cy="90" r="11.5" fill="#fff"/><circle cx="125" cy="90" r="11.5" fill="#fff"/>${eye(76,91,.82)}${eye(124,91,.82)}
 <ellipse cx="100" cy="109" rx="9" ry="6" fill="#1a1420"/>${shine(97,107,3,1.6,0,.8)}
 <path d="M90 117q10 10 10 0q0 10 10 0" fill="none" stroke="#1a1420" stroke-width="3" stroke-linecap="round"/>
 ${blush(58,114)}${blush(142,114)}${shine(70,52,24,10,-20,.6)}`);

const pig=S(rg('ppk','#ffe8f1','#ff9fc6','#d9558f')+rg('psn','#ffc8de','#ff7eb3','#c8407e'),`
 <path d="M150 170q26-6 22 12q-4 12-14 4" fill="none" stroke="#d9558f" stroke-width="6" stroke-linecap="round"/>
 <ellipse cx="72" cy="202" rx="17" ry="13" fill="url(#ppk)" ${O}/><ellipse cx="128" cy="202" rx="17" ry="13" fill="url(#ppk)" ${O}/><path d="M60 208h24M116 208h24" stroke="#7a1a40" stroke-width="4"/>
 <ellipse cx="100" cy="170" rx="54" ry="42" fill="url(#ppk)" ${O}/>
 ${coinG(100,166,25)}
 <ellipse cx="66" cy="168" rx="13" ry="18" fill="url(#ppk)" ${O} transform="rotate(30 66 168)"/><ellipse cx="134" cy="168" rx="13" ry="18" fill="url(#ppk)" ${O} transform="rotate(-30 134 168)"/>
 <path d="M52 58L42 14L88 34z" fill="url(#ppk)" ${O}/><path d="M148 58L158 14L112 34z" fill="url(#ppk)" ${O}/><path d="M56 48L50 24L76 36z" fill="#d9558f"/><path d="M144 48L150 24L124 36z" fill="#d9558f"/>
 <ellipse cx="100" cy="90" rx="64" ry="57" fill="url(#ppk)" ${O}/>
 ${eye(74,80)}${eye(126,80)}
 <ellipse cx="100" cy="110" rx="25" ry="17" fill="url(#psn)" ${O}/><ellipse cx="91" cy="110" rx="4.5" ry="7" fill="#7a1a40"/><ellipse cx="109" cy="110" rx="4.5" ry="7" fill="#7a1a40"/>${shine(92,101,8,3,-10,.6)}
 <path d="M90 132q10 8 20 0" fill="none" stroke="#7a1a40" stroke-width="3" stroke-linecap="round"/>
 ${blush(56,104,10)}${blush(144,104,10)}${shine(72,54,22,9,-25,.55)}`);

const dragon=S(rg('dg','#c8ffa8','#3cc85c','#0a6a2c')+rg('dsn','#e8ffd0','#9ae87a','#3a9a4a')+rg('dbl','#fffbe0','#ffe08a','#d0982a')+rg('dpr','#ffffff','#ff5a6a','#a0001a')+rg('dmn','#ffd080','#ff5a2a','#a00a0a'),`
 <path d="M138 186q54 4 48-42q-4-28-28-20" fill="none" stroke="#2b1a2e" stroke-width="25" stroke-linecap="round"/><path d="M138 186q54 4 48-42q-4-28-28-20" fill="none" stroke="url(#dg)" stroke-width="18" stroke-linecap="round"/>
 <path d="M158 124q-14-14 0-30q2 12 12 10q-2 14-12 20z" fill="url(#dmn)" ${O}/>
 <ellipse cx="72" cy="202" rx="18" ry="13" fill="url(#dg)" ${O}/><ellipse cx="128" cy="202" rx="18" ry="13" fill="url(#dg)" ${O}/><path d="M62 210v4M70 211v4M78 210v4M122 210v4M130 211v4M138 210v4" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
 <ellipse cx="100" cy="168" rx="48" ry="42" fill="url(#dg)" ${O}/><ellipse cx="100" cy="174" rx="29" ry="31" fill="url(#dbl)" ${O}/><path d="M76 162h48M74 176h52M78 190h44" stroke="#c8902a" stroke-width="2.5"/>
 <circle cx="100" cy="156" r="28" fill="#ff5a6a" opacity=".25"/><circle cx="100" cy="156" r="18" fill="url(#dpr)" ${O}/>${shine(94,150,6,4,-20,.8)}
 <ellipse cx="66" cy="158" rx="12" ry="20" fill="url(#dg)" ${O} transform="rotate(35 66 158)"/><ellipse cx="134" cy="158" rx="12" ry="20" fill="url(#dg)" ${O} transform="rotate(-35 134 158)"/>
 <path d="M46 78l-20-6 14-10-14-18 22 2-4-22 20 12 6-22 14 18 16-20 16 20 14-18 6 22 20-12-4 22 22-2-14 18 14 10-20 6z" fill="url(#dmn)" ${O}/>
 <path d="M76 42q-6-22-20-30M68 26l-14 2M140 26l14 2M124 42q6-22 20-30" stroke="#2b1a2e" stroke-width="11" stroke-linecap="round" fill="none"/><path d="M76 42q-6-22-20-30M68 26l-14 2M140 26l14 2M124 42q6-22 20-30" stroke="url(#gold)" stroke-width="6" stroke-linecap="round" fill="none"/>
 <ellipse cx="100" cy="82" rx="58" ry="49" fill="url(#dg)" ${O}/>
 <path d="M70 60q8-8 16-2M114 58q8-6 16 2" stroke="#0a4a1a" stroke-width="4" fill="none" stroke-linecap="round"/>
 ${eye(78,76,1,'#3a1a00')}${eye(122,76,1,'#3a1a00')}
 <ellipse cx="100" cy="106" rx="35" ry="21" fill="url(#dsn)" ${O}/><ellipse cx="88" cy="101" rx="4" ry="3" fill="#0a4a1a"/><ellipse cx="112" cy="101" rx="4" ry="3" fill="#0a4a1a"/>
 <path d="M84 114q16 12 32 0" fill="none" stroke="#0a4a1a" stroke-width="3.5" stroke-linecap="round"/>
 <path d="M70 108q-24 4-34 20q-6 12 6 12M130 108q24 4 34 20q6 12-6 12" fill="none" stroke="#ffd34d" stroke-width="3.5" stroke-linecap="round"/>
 ${blush(60,98)}${blush(140,98)}${shine(74,52,22,9,-20,.5)}`);

const tiger=S(rg('to','#ffd894','#ff9a2a','#c4560a')+rg('tw','#ffffff','#fff4e4','#e6ccaa'),`
 <path d="M144 186q40 10 40-24q0-16-12-20" fill="none" stroke="#2b1a2e" stroke-width="18" stroke-linecap="round"/><path d="M144 186q40 10 40-24q0-16-12-20" fill="none" stroke="url(#to)" stroke-width="11" stroke-linecap="round"/><path d="M176 176l8 4M182 160l8 0M178 146l6-4" stroke="#2b1a2e" stroke-width="4" stroke-linecap="round"/>
 <ellipse cx="72" cy="202" rx="19" ry="13" fill="url(#tw)" ${O}/><ellipse cx="128" cy="202" rx="19" ry="13" fill="url(#tw)" ${O}/>
 <ellipse cx="100" cy="168" rx="50" ry="42" fill="url(#to)" ${O}/><ellipse cx="100" cy="176" rx="28" ry="29" fill="url(#tw)"/>
 <path d="M54 156l14 4M52 172l16 2M146 156l-14 4M148 172l-16 2" stroke="#2b1a2e" stroke-width="5" stroke-linecap="round"/>
 <ellipse cx="64" cy="162" rx="13" ry="20" fill="url(#to)" ${O} transform="rotate(25 64 162)"/><ellipse cx="136" cy="162" rx="13" ry="20" fill="url(#to)" ${O} transform="rotate(-25 136 162)"/><ellipse cx="72" cy="178" rx="10" ry="8" fill="url(#tw)" ${O}/><ellipse cx="128" cy="178" rx="10" ry="8" fill="url(#tw)" ${O}/>
 <circle cx="48" cy="44" r="21" fill="url(#to)" ${O}/><circle cx="152" cy="44" r="21" fill="url(#to)" ${O}/><circle cx="49" cy="46" r="11" fill="#fff0e0"/><circle cx="151" cy="46" r="11" fill="#fff0e0"/>
 <ellipse cx="100" cy="90" rx="66" ry="55" fill="url(#to)" ${O}/>
 <path d="M90 42q10 8 20 0M86 54q14 9 28 0M93 66q7 5 14 0" stroke="#2b1a2e" stroke-width="4.5" fill="none" stroke-linecap="round"/>
 <path d="M36 82l16 4M34 98l18 0M164 82l-16 4M166 98l-18 0" stroke="#2b1a2e" stroke-width="5" stroke-linecap="round"/>
 ${eye(74,84,1,'#4a2800')}${eye(126,84,1,'#4a2800')}
 <ellipse cx="86" cy="110" rx="17" ry="13" fill="url(#tw)"/><ellipse cx="114" cy="110" rx="17" ry="13" fill="url(#tw)"/><ellipse cx="100" cy="122" rx="12" ry="7" fill="url(#tw)"/>
 <path d="M92 100h16l-8 9z" fill="#ff6a8a" stroke="#2b1a2e" stroke-width="2.5" stroke-linejoin="round"/><path d="M100 109v5M100 114q-7 6-12 1M100 114q7 6 12 1" fill="none" stroke="#2b1a2e" stroke-width="3" stroke-linecap="round"/>
 <circle cx="80" cy="112" r="1.6" fill="#7a4a20"/><circle cx="86" cy="116" r="1.6" fill="#7a4a20"/><circle cx="120" cy="112" r="1.6" fill="#7a4a20"/><circle cx="114" cy="116" r="1.6" fill="#7a4a20"/>
 <path d="M72 36l6-26 14 14 8-20 8 20 14-14 6 26z" fill="url(#gold)" ${O}/><circle cx="100" cy="28" r="5" fill="#ff2a4a" stroke="#fff" stroke-width="1.5"/><circle cx="82" cy="30" r="3.5" fill="#2a8aff"/><circle cx="118" cy="30" r="3.5" fill="#2ad06a"/>
 ${blush(56,106)}${blush(144,106)}${shine(70,58,20,8,-25,.5)}`);

const octo=S(rg('op','#ffd0f6','#c870e6','#6e1e9a')+rg('opl','#fff','#e8f4ff','#a0c8e8'),`
 ${[[56,'M70 150q-30 20-36 44q-4 14 10 12'],[78,'M84 158q-14 26-6 44q6 10 14 2'],[100,'M100 160q0 28 0 44'],[122,'M116 158q14 26 6 44q-6 10-14 2'],[144,'M130 150q30 20 36 44q4 14-10 12']].map(([x,d])=>`<path d="${d}" fill="none" stroke="#2b1a2e" stroke-width="25" stroke-linecap="round"/><path d="${d}" fill="none" stroke="url(#op)" stroke-width="18" stroke-linecap="round"/>`).join('')}
 <g fill="#ffe0fa" opacity=".9"><circle cx="42" cy="196" r="3"/><circle cx="46" cy="184" r="3"/><circle cx="82" cy="196" r="3"/><circle cx="80" cy="184" r="3"/><circle cx="100" cy="190" r="3"/><circle cx="100" cy="178" r="3"/><circle cx="118" cy="196" r="3"/><circle cx="120" cy="184" r="3"/><circle cx="158" cy="196" r="3"/><circle cx="154" cy="184" r="3"/></g>
 <circle cx="164" cy="140" r="16" fill="url(#opl)" ${O}/>${shine(159,134,5,3,-20,.9)}<circle cx="164" cy="140" r="24" fill="#fff" opacity=".18"/>
 <path d="M140 146q18-4 22-18" fill="none" stroke="#2b1a2e" stroke-width="16" stroke-linecap="round"/><path d="M140 146q18-4 22-18" fill="none" stroke="url(#op)" stroke-width="10" stroke-linecap="round"/>
 <ellipse cx="100" cy="94" rx="70" ry="68" fill="url(#op)" ${O}/>
 <circle cx="62" cy="58" r="8" fill="#a04ac8" opacity=".5"/><circle cx="140" cy="62" r="6" fill="#a04ac8" opacity=".5"/><circle cx="126" cy="40" r="4.5" fill="#a04ac8" opacity=".5"/>
 ${eye(76,100,1.15)}${eye(124,100,1.15)}
 <path d="M88 124q12 14 24 0z" fill="#7a1a4a" stroke="#2b1a2e" stroke-width="3" stroke-linejoin="round"/><path d="M94 130q6 3 12 0" fill="#ff7aa8"/>
 ${blush(56,120,11)}${blush(144,120,11)}
 <g transform="rotate(14 120 28)"><ellipse cx="120" cy="36" rx="30" ry="8" fill="#1a2a6a" ${O}/><path d="M98 34q0-24 22-24t22 24z" fill="#24388a" ${O}/><rect x="98" y="26" width="44" height="6" fill="#fff"/><path d="M120 14v12M114 20h12" stroke="url(#gold)" stroke-width="3" stroke-linecap="round"/></g>
 ${shine(66,58,24,11,-30,.55)}`);

const cat=S(rg('ck','#6a6a88','#2a2a3e','#0c0c16')+lg('nm1','#fff3b0','#ffc22a','#b8740a')+rg('ce','#f4ff9a','#b8e82a','#4a8a0a'),`
 <path d="M140 196q40 2 38-30q-2-18-14-20" fill="none" stroke="#2b1a2e" stroke-width="16" stroke-linecap="round"/><path d="M140 196q40 2 38-30q-2-18-14-20" fill="none" stroke="url(#ck)" stroke-width="10" stroke-linecap="round"/><path d="M172 172l10 4M170 160l10 2" stroke="url(#gold)" stroke-width="5" stroke-linecap="round"/>
 <ellipse cx="100" cy="170" rx="44" ry="42" fill="url(#ck)" ${O}/><ellipse cx="82" cy="205" rx="15" ry="10" fill="url(#ck)" ${O}/><ellipse cx="118" cy="205" rx="15" ry="10" fill="url(#ck)" ${O}/>
 <path d="M58 140q42 34 84 0l-6 20q-36 26-72 0z" fill="url(#nm1)" ${O}/><path d="M62 150q38 28 76 0" stroke="#1a4ac8" stroke-width="4" fill="none"/><g fill="#ff3a5a"><circle cx="80" cy="160" r="3"/><circle cx="100" cy="165" r="3.5"/><circle cx="120" cy="160" r="3"/></g>
 <path d="M54 62L44 14L86 40z" fill="url(#ck)" ${O}/><path d="M146 62L156 14L114 40z" fill="url(#ck)" ${O}/><path d="M58 50L52 26L76 40z" fill="#ff9ac0"/><path d="M142 50L148 26L124 40z" fill="#ff9ac0"/>
 <path d="M44 74q-6 50 10 74l20-4q-14-30-10-66zM156 74q6 50-10 74l-20-4q14-30 10-66z" fill="url(#nm1)" ${O}/><path d="M48 92l16 0M48 108l18 0M50 124l18 0M152 92l-16 0M152 108l-18 0M150 124l-18 0" stroke="#1a4ac8" stroke-width="5"/>
 <ellipse cx="100" cy="88" rx="56" ry="50" fill="url(#ck)" ${O}/>
 <path d="M50 62q50-30 100 0l-4 12q-46-22-92 0z" fill="url(#nm1)" ${O}/><path d="M58 64q42-20 84 0" stroke="#1a4ac8" stroke-width="4" fill="none"/>
 <path d="M100 36q-8 6 0 18q8-12 0-18z" fill="url(#gold)" ${O}/><circle cx="100" cy="46" r="3" fill="#ff2a4a"/>
 <g transform="translate(76 90)"><ellipse rx="12" ry="13" fill="url(#ce)" stroke="#111" stroke-width="2.5"/><ellipse rx="3.5" ry="10" fill="#111"/><ellipse cx="-4" cy="-5" rx="3.5" ry="4" fill="#fff"/><path d="M-12 0q-6-4-14 2" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>
 <g transform="translate(124 90)"><ellipse rx="12" ry="13" fill="url(#ce)" stroke="#111" stroke-width="2.5"/><ellipse rx="3.5" ry="10" fill="#111"/><ellipse cx="-4" cy="-5" rx="3.5" ry="4" fill="#fff"/><path d="M12 0q6-4 14 2" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>
 <path d="M95 108h10l-5 6z" fill="#ff8ab0"/><path d="M100 114q-5 6-10 2M100 114q5 6 10 2" fill="none" stroke="#c8c8e0" stroke-width="2.5" stroke-linecap="round"/>
 <path d="M66 112l-24-4M66 118l-22 4M134 112l24-4M134 118l22 4" stroke="#e8e8ff" stroke-width="2" stroke-linecap="round" opacity=".8"/>
 ${blush(66,112,8)}${blush(134,112,8)}${shine(74,64,16,6,-20,.35)}`);

const buffalo=S(rg('bb','#d49a6a','#8a4a24','#3e1c08')+lg('bh','#fffbec','#ecdcb8','#9a8460')+rg('bsn','#f4d0a8','#d8a070','#9a6034')+rg('bhr','#6a3a18','#3a1a08','#1a0a02'),`
 <ellipse cx="72" cy="202" rx="18" ry="13" fill="url(#bb)" ${O}/><ellipse cx="128" cy="202" rx="18" ry="13" fill="url(#bb)" ${O}/><path d="M62 208h20M118 208h20" stroke="#1a0a02" stroke-width="5"/>
 <ellipse cx="100" cy="168" rx="52" ry="42" fill="url(#bb)" ${O}/>
 <path d="M58 138q42 26 84 0l-42 46z" fill="#e0202a" ${O}/><g fill="#fff"><circle cx="86" cy="152" r="3"/><circle cx="110" cy="150" r="3"/><circle cx="100" cy="166" r="3"/><circle cx="96" cy="142" r="2.5"/></g>
 <ellipse cx="62" cy="166" rx="13" ry="20" fill="url(#bb)" ${O} transform="rotate(25 62 166)"/><ellipse cx="138" cy="166" rx="13" ry="20" fill="url(#bb)" ${O} transform="rotate(-25 138 166)"/>
 <path d="M52 66q-34 0-40-36q16 18 40 16z" fill="url(#bh)" ${O}/><path d="M148 66q34 0 40-36q-16 18-40 16z" fill="url(#bh)" ${O}/>
 <ellipse cx="40" cy="98" rx="16" ry="9" fill="url(#bb)" ${O} transform="rotate(-20 40 98)"/><ellipse cx="160" cy="98" rx="16" ry="9" fill="url(#bb)" ${O} transform="rotate(20 160 98)"/>
 <ellipse cx="100" cy="92" rx="58" ry="52" fill="url(#bb)" ${O}/>
 <g fill="url(#bhr)" ${O}><circle cx="78" cy="46" r="16"/><circle cx="100" cy="38" r="18"/><circle cx="122" cy="46" r="16"/><circle cx="90" cy="54" r="14"/><circle cx="112" cy="54" r="14"/></g>
 <path d="M66 70q8-6 18 0M116 70q10-6 18 0" stroke="#1a0a02" stroke-width="4" fill="none" stroke-linecap="round"/>
 ${eye(76,86)}${eye(124,86)}
 <ellipse cx="100" cy="120" rx="34" ry="22" fill="url(#bsn)" ${O}/><ellipse cx="88" cy="118" rx="5.5" ry="7" fill="#3a1a08"/><ellipse cx="112" cy="118" rx="5.5" ry="7" fill="#3a1a08"/>
 <path d="M92 140a8 8 0 0 0 16 0" fill="none" stroke="#2b1a2e" stroke-width="7" stroke-linecap="round"/><path d="M92 140a8 8 0 0 0 16 0" fill="none" stroke="url(#gold)" stroke-width="4" stroke-linecap="round"/><path d="M88 128q12 6 24 0" fill="none" stroke="#5a2a10" stroke-width="3" stroke-linecap="round"/>
 ${blush(58,108)}${blush(142,108)}${shine(74,62,18,7,-20,.35)}`);

const bunny=S(rg('rw','#ffffff','#f3efff','#bdb4dc')+rg('rp','#ffd0e0','#ff9ac0','#e0608a')+rg('clv','#b8ffa0','#3ac85a','#0a7a2a'),`
 <ellipse cx="72" cy="203" rx="22" ry="12" fill="url(#rw)" ${O}/><ellipse cx="128" cy="203" rx="22" ry="12" fill="url(#rw)" ${O}/><ellipse cx="66" cy="205" rx="8" ry="4" fill="url(#rp)"/><ellipse cx="134" cy="205" rx="8" ry="4" fill="url(#rp)"/>
 <ellipse cx="100" cy="172" rx="44" ry="38" fill="url(#rw)" ${O}/>
 <path d="M100 146l-24-12v24zM100 146l24-12v24z" fill="#e0102a" ${O}/><circle cx="100" cy="146" r="7" fill="#ff3a4a" ${O}/>
 <g transform="translate(100 176)"><path d="M0 4q-2 16 4 22" stroke="#0a6a2a" stroke-width="4" fill="none" stroke-linecap="round"/>${[0,90,180,270].map(r=>`<path transform="rotate(${r})" d="M0 0c-4-10-18-10-16 0c-10-2-10 12 0 16z" fill="url(#clv)" stroke="#2b1a2e" stroke-width="2.5" stroke-linejoin="round"/>`).join('')}<circle r="3.5" fill="#ffd34d"/></g>
 <ellipse cx="68" cy="176" rx="12" ry="17" fill="url(#rw)" ${O} transform="rotate(35 68 176)"/><ellipse cx="132" cy="176" rx="12" ry="17" fill="url(#rw)" ${O} transform="rotate(-35 132 176)"/>
 <ellipse cx="72" cy="38" rx="17" ry="46" fill="url(#rw)" ${O} transform="rotate(-14 72 38)"/><ellipse cx="128" cy="38" rx="17" ry="46" fill="url(#rw)" ${O} transform="rotate(14 128 38)"/>
 <ellipse cx="72" cy="40" rx="8" ry="32" fill="url(#rp)" transform="rotate(-14 72 40)"/><ellipse cx="128" cy="40" rx="8" ry="32" fill="url(#rp)" transform="rotate(14 128 40)"/>
 <ellipse cx="100" cy="102" rx="58" ry="48" fill="url(#rw)" ${O}/>
 <g transform="rotate(-12 100 56)"><ellipse cx="100" cy="64" rx="34" ry="8" fill="#1a1a24" ${O}/><path d="M80 62v-34h40v34z" fill="#24242e" ${O}/><rect x="80" y="50" width="40" height="8" fill="#e0102a"/>${shine(90,40,4,10,0,.3)}</g>
 ${eye(78,100)}${eye(122,100)}
 <path d="M94 116h12l-6 6z" fill="#ff7aa8" stroke="#2b1a2e" stroke-width="2" stroke-linejoin="round"/><path d="M100 122q-6 8-12 2M100 122q6 8 12 2" fill="none" stroke="#2b1a2e" stroke-width="3" stroke-linecap="round"/><rect x="96" y="124" width="8" height="7" rx="2" fill="#fff" stroke="#2b1a2e" stroke-width="2"/>
 ${blush(64,116,10)}${blush(136,116,10)}${shine(76,74,20,8,-20,.55)}`);

return {panda,piggy:pig,dragon,tiger,ocean:octo,egypt:cat,buffalo,lucky:bunny};
})();
