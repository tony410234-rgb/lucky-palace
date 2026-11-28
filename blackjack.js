/* 태율랜드 — 블랙잭 테이블 (소현 + AI 4명) */
(()=>{
const $=id=>document.getElementById(id);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let A=null;const api=()=>A||(A=window.TL_API);
const fmt=n=>Math.round(n).toLocaleString('en-US');
const short=n=>n>=10000?(n%10000?(n/10000).toFixed(1).replace(/\.0$/,''):n/10000)+'만':n>=1000?(n%1000?(n/1000).toFixed(1).replace(/\.0$/,''):n/1000)+'천':String(n);

/* ================= 카드 그림 ================= */
const SU={s:['♠','#141420'],c:['♣','#141420'],h:['♥','#d81a2a'],d:['♦','#d81a2a']};
const RK=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const PIPS={1:[[50,50]],2:[[50,22],[50,78]],3:[[50,22],[50,50],[50,78]],4:[[32,22],[68,22],[32,78],[68,78]],5:[[32,22],[68,22],[50,50],[32,78],[68,78]],6:[[32,22],[68,22],[32,50],[68,50],[32,78],[68,78]],7:[[32,22],[68,22],[50,36],[32,50],[68,50],[32,78],[68,78]],8:[[32,22],[68,22],[50,36],[32,50],[68,50],[50,64],[32,78],[68,78]],9:[[32,20],[68,20],[32,40],[68,40],[50,50],[32,60],[68,60],[32,80],[68,80]],10:[[32,20],[68,20],[50,31],[32,42],[68,42],[32,58],[68,58],[50,69],[32,80],[68,80]]};
const cardCache={};
function cardSVG(r,s){const k=r+s;if(cardCache[k])return cardCache[k];const [sym,col]=SU[s];const n=RK.indexOf(r)+1;
 let mid='';
 if(n<=10){const P=PIPS[n];mid=P.map(([x,y])=>`<text x="${30+x*.72}" y="${18+y*1.02}" text-anchor="middle" dominant-baseline="central" font-size="${n===1?46:17}" fill="${col}" ${y>55&&n>1?`transform="rotate(180 ${30+x*.72} ${18+y*1.02})"`:''}>${sym}</text>`).join('')}
 else{const fc={J:'#2a6ae0',Q:'#c0202a',K:'#d09a10'}[r];mid=`<rect x="28" y="20" width="66" height="102" rx="4" fill="#fff8e8" stroke="${col}" stroke-width="1.5"/>
  <rect x="31" y="23" width="60" height="96" rx="3" fill="none" stroke="#e0c070" stroke-width="1"/>
  <g transform="translate(61 64)"><path d="M-14-30L-10-40L-4-32L0-42L4-32L10-40L14-30Z" fill="#ffcc33" stroke="#7a4a02" stroke-width="1"/><circle cy="-16" r="11" fill="#ffd8b8" stroke="#5a3010" stroke-width="1"/><circle cx="-4" cy="-17" r="1.3"/><circle cx="4" cy="-17" r="1.3"/><path d="M-3-11q3 2 6 0" stroke="#a03030" fill="none"/><path d="M-20 26Q-20 0 0-4Q20 0 20 26Z" fill="${fc}" stroke="#2a1a10" stroke-width="1"/><path d="M-12 4L0 20L12 4" stroke="#ffcc33" stroke-width="2.5" fill="none"/><text y="-28" text-anchor="middle" font-size="9" font-weight="900" fill="#7a4a02">${r}</text></g>
  <text x="38" y="38" font-size="14" fill="${col}">${sym}</text><text x="84" y="112" font-size="14" fill="${col}" text-anchor="middle">${sym}</text>`}
 return cardCache[k]=`<svg viewBox="0 0 100 140"><rect x="1" y="1" width="98" height="138" rx="8" fill="#fff" stroke="#bbb" stroke-width="1.5"/>
 <text x="15" y="30" text-anchor="middle" font-family="'Arial Narrow',Arial,sans-serif" font-weight="700" font-size="${r==='10'?24:30}" fill="${col}" letter-spacing="-2">${r}</text><text x="15" y="54" text-anchor="middle" font-size="22" fill="${col}">${sym}</text>${mid}</svg>`}
const BACK=`<svg viewBox="0 0 100 140"><defs><pattern id="bjck" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#6a5ad0"/><rect width="4" height="4" fill="#8a7af0"/><rect x="4" y="4" width="4" height="4" fill="#8a7af0"/></pattern></defs><rect x="1" y="1" width="98" height="138" rx="8" fill="#fff" stroke="#bbb" stroke-width="1.5"/><rect x="8" y="8" width="84" height="124" rx="4" fill="url(#bjck)" stroke="#4a3ab0" stroke-width="2"/></svg>`;
/* 칩 */
const CHIPS=[[100,'#2a8a3a'],[500,'#7a3ad0'],[1000,'#d0202a'],[5000,'#e08a10'],[10000,'#2a5ae0'],[50000,'#1a1a1a'],[100000,'#d0a010'],[500000,'#e0357e'],[1000000,'#6a2ad0']];
const BJCH=[10000,50000,100000,500000,1000000],BMIN=10000,BMAX=1000000,PPMAX=100000;
const dblOK=h=>{const t=total(h.cards);return h.cards.length===2&&t.t>=9&&t.t<=11};
const HN=s=>s.me?myName():s.nm;
const chipCache={};
function chipSVG(v){if(chipCache[v])return chipCache[v];const c=(CHIPS.find(x=>x[0]===v)||CHIPS[0])[1];const t=short(v);
 return chipCache[v]=`<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="46" fill="#000" opacity=".35"/><circle cx="50" cy="50" r="46" fill="${c}"/>${Array.from({length:8},(_,i)=>`<rect x="45" y="5" width="10" height="16" rx="2" fill="#fff" transform="rotate(${i*45} 50 50)"/>`).join('')}<circle cx="50" cy="50" r="31" fill="${c}" stroke="#fff" stroke-width="3" stroke-dasharray="6 4"/><circle cx="50" cy="50" r="26" fill="#fff"/><text x="50" y="${t.length>2?57:59}" text-anchor="middle" font-family="'Arial Black',sans-serif" font-weight="900" font-size="${t.length>2?18:24}" fill="${c}">${t}</text></svg>`}
const chipFor=a=>{let v=CHIPS[0][0];for(const [x] of CHIPS)if(a>=x)v=x;return v};
/* 아바타 */
/* ===== AI 캐릭터 (직접 그린 오리지널 일러스트) ===== */
const ANI={
 frog:`<svg viewBox="0 0 100 100"><defs><radialGradient id="anF1" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#e2d6ff"/><stop offset="1" stop-color="#a890e0"/></radialGradient></defs><circle cx="50" cy="50" r="48" fill="#bfe8c8"/><path d="M8 100Q10 70 50 68Q90 70 92 100Z" fill="url(#anF1)"/><path d="M28 100Q30 80 50 79Q70 80 72 100Z" fill="#fff"/><ellipse cx="50" cy="56" rx="34" ry="24" fill="url(#anF1)"/><path d="M22 60Q50 86 78 60Q72 76 50 78Q28 76 22 60Z" fill="#fff"/><circle cx="32" cy="34" r="14" fill="url(#anF1)"/><circle cx="68" cy="34" r="14" fill="url(#anF1)"/><circle cx="32" cy="34" r="10" fill="#fff"/><circle cx="68" cy="34" r="10" fill="#fff"/><circle cx="34" cy="35" r="5.5" fill="#24183a"/><circle cx="66" cy="35" r="5.5" fill="#24183a"/><circle cx="36" cy="33" r="2" fill="#fff"/><circle cx="68" cy="33" r="2" fill="#fff"/><path d="M26 22Q32 17 38 21M62 21Q68 17 74 22" stroke="#5a3a8a" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="46" cy="50" r="1.3" fill="#5a3a8a"/><circle cx="54" cy="50" r="1.3" fill="#5a3a8a"/><path d="M30 58Q50 72 70 58" stroke="#5a3a8a" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="24" cy="56" rx="5" ry="3" fill="#ff9ab8" opacity=".55"/><ellipse cx="76" cy="56" rx="5" ry="3" fill="#ff9ab8" opacity=".55"/></svg>`,
 dolphin:`<svg viewBox="0 0 100 100"><defs><linearGradient id="anD1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8e4ff"/><stop offset="1" stop-color="#5ab8ee"/></linearGradient></defs><circle cx="50" cy="50" r="48" fill="#ffd6e6"/><path d="M47 14Q56 4 64 6Q58 12 58 22Z" fill="#5ab8ee"/><path d="M14 100Q12 60 26 40Q36 20 52 20Q74 20 82 44Q90 64 86 100Z" fill="url(#anD1)"/><path d="M28 100Q26 70 38 60Q50 56 62 60Q74 70 72 100Z" fill="#fff"/><path d="M38 60Q50 52 62 60Q62 70 50 72Q38 70 38 60Z" fill="#fff"/><ellipse cx="50" cy="62" rx="12" ry="7" fill="#eef9ff" stroke="#7ac8f0" stroke-width="1.6"/><path d="M42 63Q50 68 58 63" stroke="#4a8ab8" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="51" cy="27" r="1.6" fill="#3a8ac0"/><ellipse cx="37" cy="46" rx="5.5" ry="6.5" fill="#1a2a4a"/><ellipse cx="63" cy="46" rx="5.5" ry="6.5" fill="#1a2a4a"/><circle cx="39" cy="44" r="2" fill="#fff"/><circle cx="65" cy="44" r="2" fill="#fff"/><path d="M31 41l-4-3M32 39l-3-4M69 41l4-3M68 39l3-4" stroke="#1a2a4a" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="29" cy="55" rx="5" ry="3" fill="#ff8ab0" opacity=".6"/><ellipse cx="71" cy="55" rx="5" ry="3" fill="#ff8ab0" opacity=".6"/><path d="M16 78Q6 82 8 92Q16 86 22 84Z" fill="#5ab8ee"/><path d="M84 78Q94 82 92 92Q84 86 78 84Z" fill="#5ab8ee"/></svg>`,
 penguin:`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#cfe6ff"/><path d="M12 100Q10 50 50 18Q90 50 88 100Z" fill="#2a3a6a"/><path d="M24 100Q22 64 50 62Q78 64 76 100Z" fill="#fff"/><path d="M50 30Q30 30 28 50Q28 64 50 66Q72 64 72 50Q70 30 50 30Z" fill="#fff"/><path d="M50 30Q44 40 50 44Q56 40 50 30Z" fill="#2a3a6a"/><ellipse cx="40" cy="48" rx="4.5" ry="5.5" fill="#1a1a2a"/><ellipse cx="60" cy="48" rx="4.5" ry="5.5" fill="#1a1a2a"/><circle cx="41.5" cy="46.5" r="1.6" fill="#fff"/><circle cx="61.5" cy="46.5" r="1.6" fill="#fff"/><path d="M42 56L50 54L58 56L50 63Z" fill="#ffa020" stroke="#c06a00" stroke-width="1.2" stroke-linejoin="round"/><ellipse cx="32" cy="57" rx="4" ry="2.5" fill="#ff9ab0" opacity=".5"/><ellipse cx="68" cy="57" rx="4" ry="2.5" fill="#ff9ab0" opacity=".5"/><path d="M26 70Q50 80 74 70L76 78Q50 88 24 78Z" fill="#e03a4a"/><path d="M62 76L68 96L76 92L70 76Z" fill="#c02a3a"/><path d="M28 72v6M34 74v6M40 75v6" stroke="#fff" stroke-width="1.5" opacity=".6"/></svg>`,
 sheep:`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#ffe7b8"/><g fill="#fff" stroke="#efe6dc" stroke-width="1.5"><circle cx="30" cy="26" r="11"/><circle cx="44" cy="20" r="11"/><circle cx="58" cy="20" r="11"/><circle cx="71" cy="27" r="11"/><circle cx="24" cy="40" r="10"/><circle cx="77" cy="40" r="10"/><circle cx="20" cy="88" r="16"/><circle cx="40" cy="92" r="16"/><circle cx="60" cy="92" r="16"/><circle cx="80" cy="88" r="16"/></g><path d="M14 46Q6 46 6 52Q12 56 22 52Z" fill="#f6d2c0"/><path d="M86 46Q94 46 94 52Q88 56 78 52Z" fill="#f6d2c0"/><ellipse cx="50" cy="52" rx="26" ry="24" fill="#fbe2d2"/><g fill="#fff" stroke="#efe6dc" stroke-width="1.2"><circle cx="38" cy="32" r="8"/><circle cx="50" cy="29" r="8.5"/><circle cx="62" cy="32" r="8"/></g><path d="M36 50Q40 46 44 50M56 50Q60 46 64 50" stroke="#5a3a2a" stroke-width="2.6" fill="none" stroke-linecap="round"/><ellipse cx="34" cy="58" rx="5" ry="3" fill="#ff8aa8" opacity=".6"/><ellipse cx="66" cy="58" rx="5" ry="3" fill="#ff8aa8" opacity=".6"/><path d="M46 60Q50 64 54 60" stroke="#a05a5a" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="68" cy="26" r="4" fill="#ffb0c8"/><circle cx="68" cy="26" r="1.6" fill="#ffe46a"/></svg>`};
const tagL=(t,s)=>{const m=String(t).match(/^(.*?)([!?.~…]*)$/);return m[1].trim()+' '+s+(m[2]||'!')};
const AV=(skin,hair,shirt,style)=>`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#3a1a6a"/><path d="M14 100Q16 72 50 70Q84 72 86 100Z" fill="${shirt}"/><circle cx="50" cy="46" r="24" fill="${skin}"/>${style==='girl'?`<path d="M24 50Q22 18 50 18Q78 18 76 50Q78 70 70 80L66 52Q50 30 34 52L30 80Q22 70 24 50Z" fill="${hair}"/><circle cx="72" cy="30" r="7" fill="#ff7ab8"/>`:style==='cap'?`<path d="M24 40Q26 18 50 18Q74 18 76 40Z" fill="${hair}"/><path d="M24 40H86" stroke="${hair}" stroke-width="6" stroke-linecap="round"/>`:style==='bald'?`<path d="M28 38Q30 26 36 24" stroke="${hair}" stroke-width="4" fill="none"/><path d="M38 58q12 8 24 0" stroke="${hair}" stroke-width="5" fill="none"/>`:`<path d="M26 44Q24 20 50 20Q76 20 74 44Q66 30 50 32Q34 30 26 44Z" fill="${hair}"/>`}<circle cx="41" cy="47" r="3" fill="#1a1020"/><circle cx="59" cy="47" r="3" fill="#1a1020"/><path d="M43 58q7 5 14 0" stroke="#8a2a2a" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="36" cy="55" rx="4" ry="2.5" fill="#ff8aa0" opacity=".5"/><ellipse cx="64" cy="55" rx="4" ry="2.5" fill="#ff8aa0" opacity=".5"/></svg>`;
const AIS=[{name:'개굴이',tag:'개굴',av:ANI.frog,bal:15000000,bal0:15000000,risk:.6,chat:['가즈아!','이번엔 된다','역시 나야!']},
 {name:'삐죽이',tag:'삐죽',av:ANI.dolphin,bal:9000000,bal0:9000000,risk:.45,chat:['헤헤 운 좋다','앗…','이겼다~']},
 {name:'펭돌이',tag:'펭돌',av:ANI.penguin,bal:32000000,bal0:32000000,risk:.8,chat:['정석대로 간다','흠…','계산대로야.']},
 {name:'몽실이',tag:'몽실',av:ANI.sheep,bal:6000000,bal0:6000000,risk:.35,chat:['제발~','샤갈!','오예~']}];

/* ================= 규칙 ================= */
const val=c=>c.r==='A'?11:['J','Q','K','10'].includes(c.r)?10:+c.r;
function total(cards){let t=0,a=0;for(const c of cards){t+=val(c);if(c.r==='A')a++}while(t>21&&a){t-=10;a--}return {t,soft:a>0&&t<=21}}
const isBJ=h=>h.cards.length===2&&total(h.cards).t===21&&!h.split;
function strategy(h,up){const {t,soft}=total(h.cards),d=val(up)===11?11:val(up),c=h.cards;const can2=c.length===2;
 if(can2&&h.canSplit&&c[0].r===c[1].r||can2&&h.canSplit&&val(c[0])===10&&val(c[1])===10&&false){const r=val(c[0]);
  if(r===11||r===8)return 'P';if([2,3,7].includes(r)&&d<=7)return 'P';if(r===6&&d<=6)return 'P';if(r===9&&d<=9&&d!==7)return 'P';if(r===4&&(d===5||d===6))return 'P'}
 if(soft){if(t>=19)return 'S';if(t===18)return d<=6&&d>=3&&can2?'D':d<=8?'S':'H';if(t>=15&&d>=4&&d<=6&&can2)return 'D';if(t>=13&&d>=5&&d<=6&&can2)return 'D';return 'H'}
 if(t>=17)return 'S';if(t>=13)return d<=6?'S':'H';if(t===12)return d>=4&&d<=6?'S':'H';if(t===11)return can2&&d<=10?'D':'H';if(t===10)return can2&&d<=9?'D':'H';if(t===9)return can2&&d>=3&&d<=6?'D':'H';return 'H'}
const ADV={H:'히트',S:'스탠드',D:'더블',P:'스플릿'};
function ppResult(a,b){if(a.r!==b.r)return null;if(a.s===b.s)return ['PERFECT PAIR',25];const red=x=>x.s==='h'||x.s==='d';if(red(a)===red(b))return ['COLOR PAIR',12];return ['MIXED PAIR',6]}

/* ================= 상태 ================= */
let MP=null,DL=null,shoe=[],cutAt=0,ui=null,seats=[],dealer=null,phase='bet',chipSel=10000,lastBet=0,lastPP=0,streak=0,running=false,timerId=null,bjAuto=false;
function newShoe(){shoe=[];for(let d=0;d<6;d++)for(const s of 'scdh')for(const r of RK)shoe.push({r,s});for(let i=shoe.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shoe[i],shoe[j]]=[shoe[j],shoe[i]]}cutAt=Math.floor(shoe.length*.25)}
const draw=()=>{if(shoe.length<10)newShoe();return shoe.pop()};
const SEATX=[13,31,50,69,87],SEATY=[53,59,62,59,53];

/* ================= 화면 ================= */
function build(){
 const L=window.LOVE||{};const her=L.her||'소현';
 const el=document.createElement('div');el.id='bj';el.innerHTML=`
 <svg class="bjfelt" viewBox="0 0 1000 460" preserveAspectRatio="none"><defs><radialGradient id="bjg" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#9a5ae0"/><stop offset=".55" stop-color="#6a2ab0"/><stop offset="1" stop-color="#3a0a6a"/></radialGradient>
 <path id="bjarc1" d="M240 175Q500 40 760 175"/><path id="bjarc2" d="M200 215Q500 70 800 215"/><path id="bjarc3" d="M220 260Q500 120 780 260"/></defs><rect width="1000" height="460" fill="url(#bjg)"/>
 <g fill="#fff" opacity=".22" font-family="Georgia,serif" font-weight="700"><text font-size="22" letter-spacing="3"><textPath href="#bjarc1" startOffset="50%" text-anchor="middle">BLACKJACK PAYS 6 TO 5</textPath></text><text font-size="34" letter-spacing="4"><textPath href="#bjarc2" startOffset="50%" text-anchor="middle">NO INSURANCE</textPath></text><text font-size="20" letter-spacing="3"><textPath href="#bjarc3" startOffset="50%" text-anchor="middle">DEALER HITS SOFT 17</textPath></text></g>
 <path d="M150 420Q500 330 850 420" stroke="#fff" stroke-opacity=".08" stroke-width="40" fill="none"/></svg>
 <div class="bjtop"><button class="bjback" id="bjback">‹ 로비</button><div class="bjbal"><i>G</i><b id="bjbal">0</b></div><button class="bjib" id="bjsnd">🔊</button><button class="bjib" id="bjheart" style="display:none;background:linear-gradient(#ff8ac0,#e0357e);border-color:#fff;color:#fff">♥</button><span class="bjroom" id="bjroom"></span></div><div class="bjmodal" id="bjmodal"><div class="in" id="bjmin"></div></div>
 <div class="bjdisc"><div class="bjdcards"></div></div>
 <div class="bjlim"><span>MIN</span><b>1만</b><span>MAX</span><b>100만</b></div>
 <div class="bjrack">${Array.from({length:14},(_,i)=>`<i style="background:${['#d0a010','#e08a10','#d0202a'][i%3]}"></i>`).join('')}</div>
 <div class="bjshoe" id="bjshoe"><div class="bjsc"></div></div>
 <div class="bjpp"><b>★ P.P PAYS ★</b><div><span>Perfect Pair</span><span>x 25</span></div><div><span>Color Pair</span><span>x 12</span></div><div><span>Mixed Pair</span><span>x 6</span></div></div>
 <div class="bjdealer"><div class="bjhand" id="bjdh"></div><div class="bjtot" id="bjdt"></div></div>
 ${[0,1,2,3,4].map(i=>`<div class="bjseat ${i===2?'me':''}" id="bjs${i}" style="left:${SEATX[i]}%;top:${SEATY[i]}%">
  <div class="bjhands"></div><div class="bjres"></div>
  <div class="bjbet"><div class="bjstack"></div><b class="bjamt"></b></div><div class="bjppc"><span>P.P</span><div class="bjstack s"></div><b class="bjppa"></b></div>
  <div class="bjwho"><img alt="" src="${A.U(i===2?AV('#ffe4d0','#4a2a1a','#ff6ab0','girl'):AIS[[0,1,-1,2,3][i]].av)}"><div><b>${i===2?her:AIS[[0,1,-1,2,3][i]].name}</b><span class="bjcb"></span></div><em class="bjstk"></em></div>
  <div class="bjsay"></div></div>`).join('')}
 <div class="bjmsg" id="bjmsg"></div>
 <div class="bjctl" id="bjctl"></div>
 <div class="bjhint" id="bjhint"></div>`;
 document.body.appendChild(el);ui=el;
 DL=dealerEl();DL.id='bjty';el.insertBefore(DL,el.querySelector('.bjrack'));{const o=DL.say;DL.say=(t,v=true)=>{o(t,v);evt({t:'dl',txt:t})}}
 $('bjheart').onclick=sendHeart;
 seats=[0,1,2,3,4].map(i=>({i,me:i===2,ai:i===2?null:AIS[[0,1,-1,2,3][i]],el:$('bjs'+i),hands:[],bet:0,pp:0}));
 $('bjback').onclick=()=>{if((running||(MP&&MP.role==='guest'&&MP.inRound))&&phase!=='bet'){toast('라운드가 끝나면 나갈 수 있어요');return}close()};
 $('bjsnd').onclick=()=>{api().AUDIO.set&&api().AUDIO.set('sfx',!api().AUDIO.st.sfx);$('bjsnd').textContent=api().AUDIO.st.sfx?'🔊':'🔇'};
}
const toast=(t,ms)=>api().toast(t,ms);
function bal(){return api().S.bal}
function setBal(v){api().S.bal=v;api().save();api().renderBal&&api().renderBal();$('bjbal').textContent=fmt(v)}
function stackHTML(a,small){if(!a)return '';const out=[];let r=a;for(let k=CHIPS.length-1;k>=0&&out.length<6;k--){while(r>=CHIPS[k][0]&&out.length<6){out.push(CHIPS[k][0]);r-=CHIPS[k][0]}}
 return out.reverse().map((v,i)=>`<img alt="" src="${A.U(chipSVG(v))}" style="bottom:${i*(small?3:4)}px">`).join('')}
function paintSeat(s){const e=s.el;e.querySelector('.bjbet .bjstack').innerHTML=stackHTML(s.bet);e.querySelector('.bjamt').textContent=s.bet?short(s.bet):'';
 e.querySelector('.bjppc .bjstack').innerHTML=stackHTML(s.pp,1);e.querySelector('.bjppa').textContent=s.pp?'-'+short(s.pp):'';
 e.querySelector('.bjcb').innerHTML='<i class="bjgem"></i>'+short(s.me?bal():s.remote?(s.rbal||0):s.ai.bal);evt({t:'seat',s:s.i,bet:s.bet,pp:s.pp,b:s.me?bal():s.remote?(s.rbal||0):s.ai.bal});if(s.me)e.querySelector('.bjstk').innerHTML=streak>=2?`<b>${streak}</b>연승`:'';
 e.classList.toggle('empty',!s.bet)}
const pick2=a=>a[Math.floor(Math.random()*a.length)];
const VO=s=>s.me?myVo():s.remote?(s.vo||'her'):'ai'+[0,1,-1,2,3][s.i];
function say(s,t,v){if(s.ai){t=tagL(t,s.ai.tag);if(v&&v!==1)v=tagL(v,s.ai.tag)}const b=s.el.querySelector('.bjsay');b.textContent=t;b.classList.remove('on');void b.offsetWidth;b.classList.add('on');evt({t:'say',s:s.i,txt:t,v:v?(v===1?t:v):'',vo:VO(s)});if(v)try{api().speak(v===1?t:v,VO(s))}catch(e){}}
function cardEl(c,faceDown){const d=document.createElement('div');d.className='bjc';d.innerHTML=`<img alt="" src="${A.U(faceDown?BACK:cardSVG(c.r,c.s))}">`;return d}
async function dealTo(handEl,c,faceDown=false,tilt=0){if(MP&&MP.role==='host'){const se=handEl.closest('.bjseat');const s=se?+se.id.slice(3):-1;const hi=se?[...se.querySelectorAll('.bjhands .bjh')].indexOf(handEl.closest('.bjh')):0;evt({t:'card',s,hi,c:faceDown?null:c,down:faceDown,tilt})}
 const d=cardEl(c,faceDown);handEl.appendChild(d);
 const sr=$('bjshoe').getBoundingClientRect(),tr=d.getBoundingClientRect();const dx=sr.left+sr.width*.3-tr.left,dy=sr.top-tr.top;
 api().sfx('flip');
 await d.animate([{transform:`translate(${dx}px,${dy}px) rotate(-35deg) scale(.6)`,opacity:.6},{transform:`rotate(${tilt}deg)`,opacity:1}],{duration:A.T(330,180),easing:'cubic-bezier(.2,.8,.3,1)'}).finished.catch(()=>{});
 return d}
function handBox(s,hi){let hb=s.el.querySelectorAll('.bjhands .bjh')[hi];if(!hb){hb=document.createElement('div');hb.className='bjh';hb.innerHTML='<div class="bjhand"></div><div class="bjtot"></div>';s.el.querySelector('.bjhands').appendChild(hb)}return hb}
function paintTot(box,h,dealerHide){const t=box.querySelector('.bjtot');if(!h.cards.length){t.textContent='';t.className='bjtot';return}
 const {t:v,soft}=total(h.cards);const bj=isBJ(h)&&!dealerHide;
 t.className='bjtot'+(bj?' bj':v>21?' bust':'');t.innerHTML=bj?'<b>21</b><span>BLACKJACK</span>':v>21?`<b>${v}</b><span>BUST</span>`:soft&&v<21?`${v-10}/${v}`:String(v)}
function msg(t,sub=''){const m=$('bjmsg');m.innerHTML=t?`<b>${t}</b>${sub?`<small>${sub}</small>`:''}`:'';m.classList.toggle('on',!!t)}
function result(s,hi,txt,cls){evt({t:'res',s:s.i,hi,txt,cls});const r=s.el.querySelector('.bjres');const e=document.createElement('div');e.className='bjr '+cls;e.textContent=txt;e.style.left=(hi*52)+'%';r.appendChild(e)}
function chipFly(fromEl,toEl,n=4){const a=fromEl.getBoundingClientRect(),b=toEl.getBoundingClientRect();for(let i=0;i<n;i++){const im=document.createElement('img');im.className='bjfly';im.src=A.U(chipSVG(CHIPS[2+i%3][0]));document.body.appendChild(im);
 im.animate([{transform:`translate(${a.left+a.width/2}px,${a.top+a.height/2}px)`},{transform:`translate(${b.left+b.width/2}px,${b.top+b.height/2}px)`}],{duration:A.T(520,300),delay:i*60,easing:'ease-in-out'}).onfinish=()=>{im.remove();api().sfx('chip',1)}}}

/* ================= 컨트롤 ================= */
function ctlBet(){const me=seats[2];
 $('bjctl').innerHTML=`<div class="bjchips">${BJCH.map(v=>`<button class="bjchip${v===chipSel?' on':''}" data-v="${v}"><img alt="" src="${A.U(chipSVG(v))}"></button>`).join('')}</div>
 <div class="bjbtns"><button class="bjb g" data-a="clear">취소</button><button class="bjb g" data-a="rebet">리벳${lastBet?'<small>'+short(lastBet+lastPP)+'</small>':''}</button><button class="bjb p" data-a="pp">P.P 베팅<small>${me.pp?short(me.pp):'없음'}</small></button><button class="bjb deal" data-a="deal">${MP&&MP.role==='guest'?(MP.ready?'준비 완료✓':'준비'):'딜'}</button></div>`;
 $('bjhint').textContent=MP?(MP.role==='host'?`칩을 골라 내 자리에 베팅 · ${MP.other?MP.other.name:'상대'}: ${MP.gone?'나감':(seats[3].bet?short(seats[3].bet)+' 베팅':'베팅 중')}${MP.m.gb&&MP.m.gb.ready&&MP.m.gb.for===MP.rn+1?' · 준비✓':''}`:`칩을 골라 베팅하고 준비 · 딜은 ${MP.other?MP.other.name:'방장'}이가 해요`):'칩을 고르고 가운데 내 자리 동그라미를 눌러 베팅 · 오토 '+(bjAuto?'ON':'OFF');
 $('bjctl').onclick=e=>{const c=e.target.closest('.bjchip'),b=e.target.closest('[data-a]');
  if(c){chipSel=+c.dataset.v;api().sfx('click');ctlBet();return}
  if(!b)return;const a=b.dataset.a;
  if(a==='clear'){setBal(bal()+me.bet+me.pp);me.bet=0;me.pp=0;paintSeat(me);ctlBet();gbSend()}
  if(a==='rebet'&&lastBet){const need=lastBet+lastPP-me.bet-me.pp;if(bal()<need)return toast('코인 부족!');setBal(bal()+me.bet+me.pp-lastBet-lastPP);me.bet=lastBet;me.pp=lastPP;api().sfx('chip',1);paintSeat(me);ctlBet();gbSend()}
  if(a==='pp'){const add=Math.min(chipSel,50000);if(me.pp+add>PPMAX){setBal(bal()+me.pp);me.pp=0}else{if(bal()<add)return toast('코인 부족!');setBal(bal()-add);me.pp+=add}api().sfx('chip',1);paintSeat(me);ctlBet();gbSend()}
  if(a==='deal'){if(MP&&MP.role==='guest'){if(!me.bet)return toast('먼저 베팅해 주세요!');MP.ready=!MP.ready;gbSend();ctlBet();return}if(!me.bet&&!(MP&&seats[3].bet))return toast('먼저 베팅해 주세요!');round()}}}
function addBet(){if(phase!=='bet'||(MP&&MP.role==='guest'&&(MP.inRound||MP.ready)))return;const me=seats[2];if(me.bet+chipSel>BMAX)return toast('최대 100만까지!');if(bal()<chipSel)return toast('코인 부족!');setBal(bal()-chipSel);me.bet+=chipSel;api().sfx('chip',1);paintSeat(me);ctlBet();gbSend()}
function ctlPlay(h,s){const canD=dblOK(h)&&bal()>=h.bet,canP=h.cards.length===2&&h.cards[0].r===h.cards[1].r&&s.hands.length<2&&bal()>=h.bet;
 $('bjctl').innerHTML=`<div class="bjbtns play"><button class="bjb hit" data-a="H">히트</button><button class="bjb st" data-a="S">스탠드</button><button class="bjb dbl" data-a="D" ${canD?'':'disabled'}>더블</button><button class="bjb spl" data-a="P" ${canP?'':'disabled'}>스플릿</button></div>`;
 const adv=strategy({...h,canSplit:canP},dealer.cards[0]);$('bjhint').textContent=`추천: ${ADV[adv==='D'&&!canD?'H':adv==='P'&&!canP?'H':adv]}`;
 return new Promise(res=>{$('bjctl').onclick=e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;$('bjctl').onclick=null;api().sfx('click');res(b.dataset.a)}})}

/* ================= 라운드 ================= */
async function round(){if(running)return;running=true;phase='deal';clearTimeout(timerId);
 const me=seats[2];lastBet=me.bet;lastPP=me.pp;if(me.bet+me.pp)STATS.bet('bj',me.bet+me.pp);$('bjctl').innerHTML='';$('bjhint').textContent='';if(MP)evt({t:'clr',rn:++MP.rn});
 /* AI 베팅 */
 for(const s of seats){if(s.me)continue;s.hands=[];if(s.remote){s.el.querySelector('.bjhands').innerHTML='';s.el.querySelector('.bjres').innerHTML='';const g=MP.m.gb||{};if(MP.gone||g.for!==MP.rn){s.bet=0;s.pp=0}else{s.bet=g.bet||0;s.pp=g.pp||0}paintSeat(s);continue}s.el.querySelector('.bjhands').innerHTML='';s.el.querySelector('.bjres').innerHTML='';
  if(s.ai.bal<BMIN)s.ai.bal=s.ai.bal0||3000000;if(Math.random()<.12){s.bet=0;s.pp=0;paintSeat(s);continue}
  const base=[10000,20000,50000,100000,200000,300000][Math.floor(Math.random()*(2+s.ai.risk*4))];s.bet=Math.min(base,s.ai.bal);s.ai.bal-=s.bet;s.pp=Math.random()<s.ai.risk*.5?Math.min(20000,s.ai.bal):0;s.ai.bal-=s.pp;paintSeat(s);api().sfx('chip',2);await sleep(A.T(150,60))}
 me.hands=[];me.el.querySelector('.bjhands').innerHTML='';me.el.querySelector('.bjres').innerHTML='';
 const act=seats.filter(s=>s.bet);act.forEach(s=>{s.hands=[{cards:[],bet:s.bet,done:false,canSplit:true}];handBox(s,0)});
 DL.say(pick2(['카드 나갑니다~','자, 딜 들어갈게요~','행운을 빌어요~']));dealer={cards:[],hole:null};$('bjdh').innerHTML='';paintTot($('bjdt').parentNode,{cards:[]});
 if(shoe.length<cutAt){msgB('셔플 중…');api().sfx('pile');newShoe();await sleep(900);msg('')}
 /* 2장씩 딜 */
 for(let k=0;k<2;k++){for(const s of act){const h=s.hands[0],c=draw();h.cards.push(c);await dealTo(handBox(s,0).querySelector('.bjhand'),c,false,(Math.random()-.5)*4);paintTot(handBox(s,0),h);await sleep(A.T(90,40))}
  const c=draw();dealer.cards.push(c);await dealTo($('bjdh'),c,k===1);await sleep(A.T(90,40))}
 paintTot($('bjdt').parentNode,{cards:[dealer.cards[0]]});
 /* P.P 정산 */
 for(const s of act){if(!s.pp)continue;const r=ppResult(s.hands[0].cards[0],s.hands[0].cards[1]);const ppEl=s.el.querySelector('.bjppc');
  if(r){const w=s.pp*(r[1]+1);if(s.me){setBal(bal()+w);STATS.win('bj',w);api().sfx('jjr');toast(`${r[0]}! +${fmt(w)}`,1800)}else if(s.remote)evt({t:'gpay',amt:w,why:r[0]});else s.ai.bal+=w;ppEl.classList.add('win');say(s,r[0]+'!')}else{ppEl.classList.add('lose')}evt({t:'pp',s:s.i,win:!!r});
  s.pp=0;paintSeat(s)}
 await sleep(400);seats.forEach(s=>s.el.querySelector('.bjppc').classList.remove('win','lose'));
 /* 딜러 블랙잭 확인 (보험 없음) */
 const dBJ=total(dealer.cards).t===21;
 if(['A','10','J','Q','K'].includes(dealer.cards[0].r)){msgB('딜러 블랙잭 확인…');await sleep(A.T(900,400));msg('')}
 if(dBJ){await reveal();msgB('딜러 BLACKJACK','');DL.say('아쉽게도 딜러 블랙잭이에요');await sleep(900)}
 else{
  /* 각 자리 플레이 */
  phase='play';
  for(const s of act){for(let hi=0;hi<s.hands.length;hi++){const h=s.hands[hi],box=handBox(s,hi);s.el.classList.add('turn');box.classList.add('turn');evt({t:'turn',s:s.i,hi,on:1});
    if(isBJ(h)){if(s.me)STATS.ev('bjbj');if(s.me||s.remote){DL.say(`블랙잭! 축하해 ${s.me?myName():s.nm}아~`);if(s.me)api().sfx('jp')}say(s,'블랙잭!');s.el.classList.remove('turn');box.classList.remove('turn');evt({t:'turn',s:s.i,hi,on:0});await sleep(500);continue}
    while(total(h.cards).t<21){let a;
     if(s.me)a=await ctlPlay(h,s);else if(s.remote)a=await remoteDecide(s,h,hi);else{await sleep(A.T(650,280));a=strategy({...h,canSplit:s.hands.length<2},dealer.cards[0]);if(Math.random()<.06)a=a==='S'?'H':'S';if((a==='D'||a==='P')&&s.ai.bal<h.bet)a='H';if(a==='P'&&s.hands.length>=2)a='H';if(a==='D'&&!dblOK(h))a='H'}
     if(s.me)$('bjctl').innerHTML='';if(s.remote)$('bjhint').textContent='';
     if(a==='S'){say(s,'스탠드',s.me||s.remote?`스탠드 ${HN(s)}!`:(['스탠드!','여기까지~','스탠드.','그만 받을래~'][[0,1,-1,2,3][s.i]]));break}
     if(a==='H'){if(s.me||s.remote)say(s,'히트',`한 장 더 ${HN(s)}~`);else say(s,'히트',['히트!','한 장 더~','히트.','하나 더 줘~'][[0,1,-1,2,3][s.i]]);const c=draw();h.cards.push(c);await dealTo(box.querySelector('.bjhand'),c);paintTot(box,h);continue}
     if(a==='D'){if(s.me){setBal(bal()-h.bet);STATS.bet('bj',h.bet)}else if(!s.remote)s.ai.bal-=h.bet;h.bet*=2;s.bet=s.hands.reduce((x,y)=>x+y.bet,0);paintSeat(s);api().sfx('chip',3);say(s,'더블!',s.me||s.remote?`더블 ${HN(s)}!`:1);const c=draw();h.cards.push(c);await dealTo(box.querySelector('.bjhand'),c,false,90);paintTot(box,h);break}
     if(a==='P'){if(s.me){setBal(bal()-h.bet);STATS.bet('bj',h.bet)}else if(!s.remote)s.ai.bal-=h.bet;evt({t:'split',s:s.i,hi});const c2=h.cards.pop();const nh={cards:[c2],bet:h.bet,split:true};h.split=true;s.hands.splice(hi+1,0,nh);s.bet=s.hands.reduce((x,y)=>x+y.bet,0);paintSeat(s);say(s,'스플릿!',s.me||s.remote?`스플릿 ${HN(s)}!`:1);
      box.querySelector('.bjhand').lastChild.remove();const nb=handBox(s,hi+1);const d=cardEl(c2);nb.querySelector('.bjhand').appendChild(d);
      const c=draw();h.cards.push(c);await dealTo(box.querySelector('.bjhand'),c);paintTot(box,h);const c3=draw();nh.cards.push(c3);await dealTo(nb.querySelector('.bjhand'),c3);paintTot(nb,nh);
      if(h.cards[0].r==='A')break;continue}}
    const tt=total(h.cards).t;if(tt>21){say(s,s.ai&&Math.random()<.4?'샤갈!':'버스트…');api().sfx('lose');if(s.me||s.remote)DL.say('아이고, 버스트네요')}
    s.el.classList.remove('turn');box.classList.remove('turn');evt({t:'turn',s:s.i,hi,on:0});await sleep(A.T(250,100))}}
  $('bjhint').textContent='';
  /* 딜러 */
  phase='dealer';await reveal();
  const live=act.some(s=>s.hands.some(h=>total(h.cards).t<=21&&!isBJ(h)));
  if(live)while((x=>x.t<17||(x.t===17&&x.soft))(total(dealer.cards))){await sleep(A.T(550,250));const c=draw();dealer.cards.push(c);await dealTo($('bjdh'),c);paintTot($('bjdt').parentNode,dealer)}
  const dt=total(dealer.cards).t;if(dt>21){msgB('딜러 BUST!');DL.say('딜러 버스트! 모두 축하드려요~')}
 }
 /* 정산 */
 await sleep(A.T(500,250));const dt=total(dealer.cards).t,dBust=dt>21;let myNet=0,myWin=false;
 for(const s of act){let pay=0;s.hands.forEach((h,hi)=>{const t=total(h.cards).t,bj=isBJ(h);let r,cls,p=0;
   if(t>21){r='BUST';cls='lose'}else if(dBJ&&bj){r='PUSH';cls='push';p=h.bet}else if(dBJ){r='LOSE';cls='lose'}else if(bj){r='BLACKJACK';cls='bj';p=h.bet*2.2}
   else if(dBust||t>dt){r='WIN';cls='win';p=h.bet*2}else if(t===dt){r='PUSH';cls='push';p=h.bet}else{r='LOSE';cls='lose'}
   pay+=p;result(s,hi,r,cls);if(s.me)myNet+=p-h.bet});
  const betEl=s.el.querySelector('.bjbet');
  if(pay>s.bet)chipFly(document.querySelector('.bjrack'),betEl,5);else if(pay<s.bet)chipFly(betEl,document.querySelector('.bjrack'),3);evt({t:'fly',s:s.i,d:pay>s.bet?1:pay<s.bet?-1:0});
  if(s.me){if(pay){setBal(bal()+pay);STATS.win('bj',pay)}myWin=pay>s.bet}else if(s.remote){if(pay)evt({t:'gpay',amt:pay});evt({t:'gres',net:pay-s.bet});if(pay>s.bet)DL.say(`${s.nm}이가 이겼다! 축하해~`)}else{s.ai.bal+=pay;if(pay>s.bet&&Math.random()<.5)say(s,s.ai.chat[2]);else if(pay<s.bet&&Math.random()<.4)say(s,s.ai.chat[1])}
  s.bet=0;paintSeat(s)}
 if(seats[2].hands.length){if(myWin){streak++;STATS.ev('bjwin');STATS.ev('bjstreak',streak);api().sfx('jjr');DL.say(pick2([`${myName()}이가 이겼다! 축하해~`,'와~ 이겼어요! 축하해요~',`역시 우리 ${myName()}이!`]))}else if(myNet<0){streak=0;api().sfx('lose')}
  msg(myNet>0?`+${fmt(myNet)}`:myNet<0?`${fmt(myNet)}`:'PUSH',myNet>0?(streak>=2?`${streak}연승!`:'승리!'):myNet<0?'다음 판에 복수!':'무승부');paintSeat(seats[2])}
 await sleep(A.T(2200,1200));
 /* 정리 */
 const disc=ui.querySelector('.bjdcards');disc.style.height=Math.min(40,(312-shoe.length)/8)+'px';
 ui.querySelectorAll('.bjhand .bjc').forEach(c=>c.animate([{opacity:1},{opacity:0,transform:'translate(-200px,-200px) scale(.5)'}],{duration:350,fill:'forwards'}));
 evt({t:'end'});await sleep(380);ui.querySelectorAll('.bjhands').forEach(e=>e.innerHTML='');ui.querySelectorAll('.bjres').forEach(e=>e.innerHTML='');$('bjdh').innerHTML='';paintTot($('bjdt').parentNode,{cards:[]});msg('');
 phase='bet';running=false;seats.forEach(paintSeat);
 if(lastBet&&bjAuto&&!MP&&bal()>=lastBet+lastPP){setBal(bal()-lastBet-lastPP);seats[2].bet=lastBet;seats[2].pp=lastPP;paintSeat(seats[2]);ctlBet();timerId=setTimeout(round,1200)}else ctlBet();
}
async function reveal(){if(MP&&MP.role==='host'&&dealer.cards[1])evt({t:'reveal',c:dealer.cards[1]});const hole=$('bjdh').children[1];if(hole){await hole.animate([{transform:'scaleX(1)'},{transform:'scaleX(0)'}],{duration:150}).finished.catch(()=>{});hole.querySelector('img').src=A.U(cardSVG(dealer.cards[1].r,dealer.cards[1].s));await hole.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:150}).finished.catch(()=>{});api().sfx('flip')}paintTot($('bjdt').parentNode,dealer)}

/* ================= 딜러 태율 (직접 그린 일러스트) ================= */
const TAEYUL=`<svg viewBox="0 0 200 220" class="tysvg"><defs><linearGradient id="tydSk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe6d4"/><stop offset="1" stop-color="#f2c2a0"/></linearGradient><linearGradient id="tydHr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2830"/><stop offset="1" stop-color="#110a10"/></linearGradient><linearGradient id="tydVs" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a2e4e"/><stop offset="1" stop-color="#0e0a18"/></linearGradient></defs>
<path d="M18 222Q20 162 70 148L100 160L130 148Q180 162 182 222Z" fill="#fbfbff"/>
<path d="M18 222Q20 164 66 150L93 206L98 222Z" fill="url(#tydVs)"/><path d="M182 222Q180 164 134 150L107 206L102 222Z" fill="url(#tydVs)"/>
<path d="M66 150L93 206M134 150L107 206" stroke="#d8b060" stroke-width="2.5" fill="none"/>
<circle cx="100" cy="190" r="3" fill="#d8b060"/><circle cx="100" cy="206" r="3" fill="#d8b060"/>
<rect x="128" y="182" width="36" height="13" rx="3" fill="#ecc464" stroke="#8a6a10"/><text x="146" y="191.5" font-size="8" text-anchor="middle" font-family="Arial" font-weight="900" fill="#3a2a00">TAEYUL</text>
<path d="M84 124h32v28q-16 10-32 0z" fill="#eab894"/>
<path d="M76 148L100 160L88 174Z" fill="#fff" stroke="#d8d8e8" stroke-width="1.5"/><path d="M124 148L100 160L112 174Z" fill="#fff" stroke="#d8d8e8" stroke-width="1.5"/>
<path d="M100 161L82 151V171ZM100 161L118 151V171Z" fill="#e0203e"/><circle cx="100" cy="161" r="4.5" fill="#a00a26"/>
<ellipse cx="61" cy="96" rx="8" ry="11" fill="#f0c09e"/><ellipse cx="139" cy="96" rx="8" ry="11" fill="#f0c09e"/>
<path d="M62 82Q62 40 100 40Q138 40 138 82Q138 118 100 136Q62 118 62 82Z" fill="url(#tydSk)"/>
<path d="M57 90Q50 30 100 22Q152 26 143 90Q140 64 130 56Q114 68 86 60Q70 66 62 90Z" fill="url(#tydHr)"/>
<path d="M68 66Q86 42 132 50Q114 58 102 74Q98 60 86 66Q78 62 68 66Z" fill="#1a1016"/>
<path d="M86 34Q110 26 128 38" stroke="#7a6070" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/>
<path d="M73 81Q83 75 93 80" stroke="#2a1a18" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M107 80Q117 75 127 81" stroke="#2a1a18" stroke-width="4" stroke-linecap="round" fill="none"/>
<g class="tyeye"><ellipse cx="84" cy="93" rx="6" ry="7.2" fill="#2a1a22"/><ellipse cx="116" cy="93" rx="6" ry="7.2" fill="#2a1a22"/><circle cx="86.2" cy="90" r="2.2" fill="#fff"/><circle cx="118.2" cy="90" r="2.2" fill="#fff"/></g>
<path d="M100 97Q104 106 98 109" stroke="#d49a78" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<ellipse cx="75" cy="107" rx="7" ry="3.5" fill="#ff98a0" opacity=".45"/><ellipse cx="125" cy="107" rx="7" ry="3.5" fill="#ff98a0" opacity=".45"/>
<path class="tymo" d="M87 115Q100 129 113 115Q100 120 87 115Z" fill="#fff" stroke="#a8404a" stroke-width="2.6" stroke-linejoin="round"/></svg>`;
const DCSS=`.tydl{position:absolute;left:50%;transform:translateX(-50%);z-index:1;pointer-events:none}
.tydl .tysvg{width:100%;height:100%;display:block;filter:drop-shadow(0 .6cqw .8cqw #0009);animation:tybob 3.2s ease-in-out infinite;transform-origin:50% 100%}
.tydl .tyeye{transform-box:fill-box;transform-origin:center;animation:tyblink 4.4s infinite}
.tydl.talk .tymo{transform-box:fill-box;transform-origin:center top;animation:tytalk .18s infinite alternate}
@keyframes tybob{50%{transform:translateY(-1.5%) rotate(-1deg)}}@keyframes tyblink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.08)}}@keyframes tytalk{to{transform:scaleY(1.5)}}
.tyname{position:absolute;left:50%;bottom:-.2cqw;transform:translateX(-50%);background:linear-gradient(#ffe48a,#d8a020);color:#3a2000;font:900 clamp(8px,1.15cqw,12px) Jua,sans-serif;padding:.05em .7em;border-radius:1em;white-space:nowrap;box-shadow:0 2px 4px #0008}
.tysay{position:absolute;left:96%;top:12%;background:#fff;color:#3a1050;border-radius:1.2cqw 1.2cqw 1.2cqw .2cqw;padding:.25em .8em;font:900 clamp(10px,1.6cqw,16px) Jua,sans-serif;white-space:nowrap;opacity:0;transition:opacity .2s;box-shadow:0 .4cqw .8cqw #0008}
.tysay.on{opacity:1}`;
function dealerEl(){if(!document.getElementById('tydcss')){const s=document.createElement('style');s.id='tydcss';s.textContent=DCSS;document.head.appendChild(s)}
 const d=document.createElement('div');d.className='tydl';dealerEl.n=(dealerEl.n||0)+1;d.innerHTML=TAEYUL.replace(/tyd(Sk|Hr|Vs)/g,'tyd'+dealerEl.n+'$1')+'<b class="tyname">딜러 태율</b><div class="tysay"></div>';
 d.say=(t,voice=true)=>{const b=d.querySelector('.tysay');b.textContent=t;b.classList.add('on');d.classList.add('talk');clearTimeout(d._t);clearTimeout(d._m);d._m=setTimeout(()=>d.classList.remove('talk'),Math.min(2200,300+t.length*120));d._t=setTimeout(()=>b.classList.remove('on'),2400);if(voice)try{api().speak(t,'dealer')}catch(e){}};
 return d}

/* ================= 열기 / 닫기 ================= */
function open(){A=window.TL_API;if(!A)return;if(!ui)build();if(!open.mp)MP=null;mpUI();solo();ui.classList.add('on');document.body.classList.add('bjon');try{A.AUDIO.play('bj')}catch(e){}
 if(!shoe.length)newShoe();setBal(bal());seats.forEach(paintSeat);ctlBet();
 ui.querySelector('#bjs2 .bjbet').onclick=addBet;$('bjsnd').textContent=A.AUDIO.st.sfx?'🔊':'🔇';
 if(!open.once){open.once=1;msg('블랙잭 테이블','칩을 골라 내 자리에 베팅하고 딜!');setTimeout(()=>msg(''),2200)}
 if(!MP)setTimeout(()=>DL.say(`어서 와 ${(window.LOVE||{}).her||'소현'}아~ 베팅해 주세요!`),700);
 try{window.TLApp&&TLApp.orient('landscape')}catch(e){}}
function close(){if(!ui)return;const me=seats[2];if(MP&&MP.role==='guest'&&MP.inRound&&MP.locked){setBal(bal()+MP.locked);MP.locked=0}if(me.bet||me.pp){if(!(MP&&MP.role==='guest'&&MP.inRound))setBal(bal()+me.bet+me.pp);me.bet=me.pp=0}mpEnd();running=false;phase='bet';$('bjmodal').classList.remove('on');clearTimeout(timerId);ui.classList.remove('on');document.body.classList.remove('bjon');try{A.AUDIO.play('lobby')}catch(e){}A.renderBal&&A.renderBal()}

/* ================= 같이하기 (2인 온라인 블랙잭) ================= */
const NM=()=>window.NET;
const who=n=>n==='태율'?{name:'태율',av:'ty',vo:'dealer'}:{name:n||'소현',av:'her',vo:'her'};
const avOf=k=>k==='ty'?AV('#ffe0cc','#1a1016','#2a2238','boy'):AV('#ffe4d0','#4a2a1a','#ff6ab0','girl');
const myName=()=>MP?MP.me.name:((window.LOVE||{}).her||'소현');
const myVo=()=>MP?MP.me.vo:'her';
const RP=()=>'rooms/'+MP.code;
const GVb=s=>!MP||MP.role!=='guest'?s:s===2?3:s===3?2:s;
function evt(o){if(!MP||MP.role!=='host')return;NM().req('PUT',RP()+'/ev/'+(++MP.evN),o).catch(()=>{})}
function msgB(t,s=''){msg(t,s);evt({t:'msg',m:t,s})}
function gbSend(){if(!MP||MP.role!=='guest')return;const me=seats[2];NM().req('PUT',RP()+'/gb',{for:MP.rn+1,bet:me.bet,pp:me.pp,ready:!!MP.ready,bal:bal()}).catch(()=>{})}
async function remoteDecide(s,h,hi){$('bjhint').textContent=`${s.nm} 차례… 기다리는 중`;const n=++MP.needN;evt({t:'need',hi,n,bet:h.bet,nh:s.hands.length});const t0=Date.now();
 while(true){await sleep(150);const ga=MP&&MP.m.ga;if(ga&&ga.n===n)return ga.a;if(!MP||MP.gone||Date.now()-t0>45000)return 'S'}}
function setSeat(i,name,av){const e=$('bjs'+i);e.querySelector('.bjwho b').textContent=name;e.querySelector('.bjwho img').src=A.U(av)}
function solo(){const her=(window.LOVE||{}).her||'소현';seats.forEach(s=>{s.remote=false;s.ai=s.i===2?null:AIS[[0,1,-1,2,3][s.i]];setSeat(s.i,s.i===2?her:s.ai.name,s.i===2?avOf('her'):s.ai.av)})}
function mpUI(){$('bjheart').style.display=MP?'':'none';$('bjroom').textContent=MP?`방 ${MP.code} · ${MP.me.name}♥${MP.other?MP.other.name:'?'}`:''}
function bjModal(h){$('bjmin').innerHTML=h;$('bjmodal').classList.add('on')}
function mpEnd(){if(!MP)return;const m=MP;MP=null;open.mp=0;NM().stop();
 if(m.role==='host')NM().req('DELETE','rooms/'+m.code).catch(()=>{});else NM().req('PUT','rooms/'+m.code+'/guest/left',true).catch(()=>{});mpUI()}
function sendHeart(){if(!MP)return;STATS.ev('heart');NM().req('PUT',RP()+'/heart',{n:Date.now(),from:MP.me.name}).catch(()=>{});try{api().heartRain(8)}catch(e){}toast('♥ 보냈어요!',900)}
let lastHeart=0;
function onHeart(hh){if(!hh||hh.n===lastHeart)return;const first=!lastHeart;lastHeart=hh.n;if(first&&Date.now()-hh.n>8000)return;if(hh.from===MP.me.name)return;
 try{api().heartRain(24)}catch(e){}msg(`♥ ${hh.from}이가 사랑한대요 ♥`);setTimeout(()=>{if($('bjmsg').textContent.startsWith('♥'))msg('')},2200);try{api().speak(`${hh.from}이가 사랑한대요~`,'ann')}catch(e){}}

/* 방장 */
async function hostMP(me){const code=String(1000+Math.floor(Math.random()*9000));
 MP={role:'host',code,me:who(me),other:null,evN:0,needN:0,rn:0,m:{},gone:false};open.mp=1;open();setSeat(2,myName(),avOf(MP.me.av));mpUI();
 try{await NM().req('PUT',RP(),{host:{name:me,g:'bj',at:Date.now()}})}catch(e){bjModal(`<h3>연결 실패</h3><p>인터넷 연결을 확인해 주세요.</p><button class="hex" id="bjx">닫기</button>`);$('bjx').onclick=()=>close();return}
 bjModal(`<h3>방 코드</h3><div class="bjcode">${code}</div><p>상대 폰에서 <b>같이하기 → 방 들어가기</b>로 이 코드를 넣으면 시작해요</p><button class="hex" id="bjx">취소</button>`);$('bjx').onclick=()=>close();
 NM().listen(RP(),(path,m,gone)=>{if(!MP)return;MP.m=m;if(m.heart)onHeart(m.heart);
  if(m.guest&&m.guest.left&&MP.other&&!MP.gone){MP.gone=true;msg(`${MP.other.name}이가 나갔어요`);setTimeout(()=>msg(''),2000);const g=seats[3];if(phase==='bet'){g.bet=g.pp=0;paintSeat(g)}ctlBetIf()}
  if(m.guest&&!m.guest.left&&!MP.other){MP.other=who(m.guest.name);$('bjmodal').classList.remove('on');const g=seats[3];g.remote=true;g.ai=null;g.nm=MP.other.name;g.vo=MP.other.vo;setSeat(3,g.nm,avOf(MP.other.av));setSeat(2,myName(),avOf(MP.me.av));mpUI();
   STATS.ev('mp');msg('같이하기 시작!',`${MP.other.name} 입장 · 둘 다 베팅하면 딜!`);setTimeout(()=>msg(''),2200);DL.say(`${MP.me.name}, ${MP.other.name} 어서 와~ 같이 해볼까?`);evt({t:'hello',host:MP.me.name,hav:MP.me.av})}
  if(m.gb&&MP.other&&!MP.gone){const g=seats[3];g.rbal=m.gb.bal||0;if(phase==='bet'&&!running){if(m.gb.for===MP.rn+1){g.bet=m.gb.bet||0;g.pp=m.gb.pp||0}paintSeat(g);ctlBetIf()}}});}
function ctlBetIf(){if(phase==='bet'&&!running)ctlBet()}

/* 손님 */
async function joinMP(me,code,room){MP={role:'guest',code,me:who(me),other:who(room.host.name),evN:0,rn:0,m:{},inRound:false,ready:false,locked:0,q:Promise.resolve(),gm:null};open.mp=1;open();
 const g=seats[3];g.remote=true;g.ai=null;g.nm=MP.other.name;setSeat(3,g.nm,avOf(MP.other.av));setSeat(2,myName(),avOf(MP.me.av));mpUI();ctlBet();
 await NM().req('PUT',RP()+'/guest',{name:me,at:Date.now()});gbSend();
 STATS.ev('mp');msg('입장 완료!',`베팅하고 준비를 누르면 ${MP.other.name}이가 딜해요`);setTimeout(()=>msg(''),2500);
 NM().listen(RP(),(path,m,gone)=>{if(!MP||MP.role!=='guest')return;MP.m=m;
  if(gone||(path==='/'&&!m.host)){msg('방이 닫혔어요','');setTimeout(()=>close(),1500);return}
  if(m.heart)onHeart(m.heart);
  const ev=m.ev||{};const mx=Math.max(0,...Object.keys(ev).map(Number).filter(n=>n>0));
  for(let k=0;k<800;k++){if(ev[MP.evN+1]){MP.gapT=0;const e=ev[++MP.evN];MP.q=MP.q.then(()=>gEv(e)).catch(x=>console.error(x));continue}
   if(mx>MP.evN){if(!MP.gapT)MP.gapT=Date.now();if(Date.now()-MP.gapT>1500){MP.evN++;MP.gapT=0;continue}}break}})}
async function gEv(e){if(!MP)return;const v=GVb(e.s);const s=seats[v];
 switch(e.t){
 case 'hello':break;
 case 'clr':MP.rn=e.rn;MP.inRound=true;MP.ready=false;phase='deal';MP.locked=seats[2].bet+seats[2].pp;if(MP.locked)STATS.bet('bj',MP.locked);lastBet=seats[2].bet;lastPP=seats[2].pp;$('bjctl').innerHTML='';$('bjhint').textContent='';
  MP.gm={h:{0:[],1:[],2:[],3:[],4:[]},d:[]};seats.forEach(x=>{x.el.querySelector('.bjhands').innerHTML='';x.el.querySelector('.bjres').innerHTML='';x.hands=[]});dealer={cards:[]};$('bjdh').innerHTML='';paintTot($('bjdt').parentNode,{cards:[]});break;
 case 'seat':if(v===2){if(!MP.inRound)return;s.bet=e.bet;s.pp=e.pp;paintSeat(s);return}s.bet=e.bet;s.pp=e.pp;if(s.remote)s.rbal=e.b;else if(s.ai)s.ai.bal=e.b;paintSeat(s);break;
 case 'card':{if(e.s===-1){const c=e.c||{r:'A',s:'s'};MP.gm.d.push(e.c);await dealTo($('bjdh'),c,!!e.down,0);paintTot($('bjdt').parentNode,{cards:MP.gm.d.filter(Boolean)});return}
  const hs=MP.gm.h[v];if(!hs[e.hi])hs[e.hi]={cards:[]};hs[e.hi].cards.push(e.c);s.hands=hs;const box=handBox(s,e.hi);await dealTo(box.querySelector('.bjhand'),e.c,false,e.tilt||0);paintTot(box,hs[e.hi]);break}
 case 'split':{const hs=MP.gm.h[v];const h=hs[e.hi];const c2=h.cards.pop();h.split=true;hs.splice(e.hi+1,0,{cards:[c2],split:true});const box=handBox(s,e.hi);box.querySelector('.bjhand').lastChild&&box.querySelector('.bjhand').lastChild.remove();const nb=handBox(s,e.hi+1);nb.querySelector('.bjhand').appendChild(cardEl(c2));break}
 case 'reveal':{MP.gm.d[1]=e.c;dealer={cards:MP.gm.d.slice()};const hole=$('bjdh').children[1];if(hole){await hole.animate([{transform:'scaleX(1)'},{transform:'scaleX(0)'}],{duration:150}).finished.catch(()=>{});hole.querySelector('img').src=A.U(cardSVG(e.c.r,e.c.s));await hole.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:150}).finished.catch(()=>{});api().sfx('flip')}paintTot($('bjdt').parentNode,{cards:MP.gm.d.filter(Boolean)});break}
 case 'turn':{const box=handBox(s,e.hi);s.el.classList.toggle('turn',!!e.on);box.classList.toggle('turn',!!e.on);break}
 case 'say':{const b2=s.el.querySelector('.bjsay');b2.textContent=e.txt;b2.classList.remove('on');void b2.offsetWidth;b2.classList.add('on');if(e.v)try{api().speak(e.v,e.vo)}catch(x){}break}
 case 'res':result(s,e.hi,e.txt,e.cls);if(v===2&&e.txt==='BLACKJACK')STATS.ev('bjbj');break;
 case 'pp':{const p=s.el.querySelector('.bjppc');p.classList.add(e.win?'win':'lose');setTimeout(()=>p.classList.remove('win','lose'),500);if(v===2&&!e.win){s.pp=0;paintSeat(s)}break}
 case 'fly':{const be=s.el.querySelector('.bjbet');if(e.d>0)chipFly(document.querySelector('.bjrack'),be,5);else if(e.d<0)chipFly(be,document.querySelector('.bjrack'),3);break}
 case 'gpay':setBal(bal()+e.amt);STATS.win('bj',e.amt);if(e.why){api().sfx('jjr');toast(`${e.why}! +${fmt(e.amt)}`,1800)}break;
 case 'gres':{const n=e.net;if(n>0){streak++;STATS.ev('bjwin');STATS.ev('bjstreak',streak);api().sfx('jjr')}else if(n<0){streak=0;api().sfx('lose')}msg(n>0?`+${fmt(n)}`:n<0?fmt(n):'PUSH',n>0?(streak>=2?`${streak}연승!`:'승리!'):n<0?'다음 판에 복수!':'무승부');MP.locked=0;break}
 case 'msg':msg(e.m,e.s);if(e.m)setTimeout(()=>{if($('bjmsg').textContent.startsWith(e.m))msg('')},1600);break;
 case 'dl':DL.say(e.txt);break;
 case 'need':{const hs=MP.gm.h[2];const h=Object.assign({},hs[e.hi],{bet:e.bet});const fake={hands:{length:e.nh}};dealer={cards:[MP.gm.d[0]]};
  const a=await ctlPlay(h,fake);$('bjctl').innerHTML='';if(a==='D'||a==='P'){setBal(bal()-e.bet);STATS.bet('bj',e.bet)}NM().req('PUT',RP()+'/ga',{n:e.n,a}).catch(()=>{});break}
 case 'end':{MP.inRound=false;MP.locked=0;const disc=ui.querySelector('.bjdcards');ui.querySelectorAll('.bjhand .bjc').forEach(c=>c.animate([{opacity:1},{opacity:0,transform:'translate(-200px,-200px) scale(.5)'}],{duration:350,fill:'forwards'}));
  await sleep(380);ui.querySelectorAll('.bjhands').forEach(x=>x.innerHTML='');ui.querySelectorAll('.bjres').forEach(x=>x.innerHTML='');$('bjdh').innerHTML='';paintTot($('bjdt').parentNode,{cards:[]});
  setTimeout(()=>{if(MP&&!MP.inRound)msg('')},1500);phase='bet';const me=seats[2];me.bet=0;me.pp=0;seats.forEach(x=>{if(x.i!==2)x.bet=x.pp=0});seats.forEach(paintSeat);ctlBet();gbSend();break}
 }}
window.CARDKIT={cardSVG,BACK,chipSVG,CHIPS,AV,short,fmt,dealerEl,ANI,tagL};
window.BJ={open,close,hostMP,joinMP,card:`<button class="gcard c-bj" data-ext="bj"><span class="rays"></span><span class="bdg">21</span><span class="hero bjhero"><span>${cardSVG('A','s')}</span><span>${cardSVG('K','h')}</span></span><b class="en" style="font-family:Bungee,sans-serif">BLACKJACK</b><span class="kn">블랙잭 테이블</span><small>AI 4명과 함께 · 3:2 · P.P 사이드벳</small></button>`};
document.addEventListener('DOMContentLoaded',()=>{});
})();
