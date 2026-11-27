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
const CHIPS=[[100,'#2a8a3a'],[500,'#7a3ad0'],[1000,'#d0202a'],[5000,'#e08a10'],[10000,'#2a5ae0'],[50000,'#1a1a1a'],[100000,'#d0a010']];
const chipCache={};
function chipSVG(v){if(chipCache[v])return chipCache[v];const c=(CHIPS.find(x=>x[0]===v)||CHIPS[0])[1];const t=short(v);
 return chipCache[v]=`<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="46" fill="#000" opacity=".35"/><circle cx="50" cy="50" r="46" fill="${c}"/>${Array.from({length:8},(_,i)=>`<rect x="45" y="5" width="10" height="16" rx="2" fill="#fff" transform="rotate(${i*45} 50 50)"/>`).join('')}<circle cx="50" cy="50" r="31" fill="${c}" stroke="#fff" stroke-width="3" stroke-dasharray="6 4"/><circle cx="50" cy="50" r="26" fill="#fff"/><text x="50" y="${t.length>2?57:59}" text-anchor="middle" font-family="'Arial Black',sans-serif" font-weight="900" font-size="${t.length>2?18:24}" fill="${c}">${t}</text></svg>`}
const chipFor=a=>{let v=CHIPS[0][0];for(const [x] of CHIPS)if(a>=x)v=x;return v};
/* 아바타 */
const AV=(skin,hair,shirt,style)=>`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#3a1a6a"/><path d="M14 100Q16 72 50 70Q84 72 86 100Z" fill="${shirt}"/><circle cx="50" cy="46" r="24" fill="${skin}"/>${style==='girl'?`<path d="M24 50Q22 18 50 18Q78 18 76 50Q78 70 70 80L66 52Q50 30 34 52L30 80Q22 70 24 50Z" fill="${hair}"/><circle cx="72" cy="30" r="7" fill="#ff7ab8"/>`:style==='cap'?`<path d="M24 40Q26 18 50 18Q74 18 76 40Z" fill="${hair}"/><path d="M24 40H86" stroke="${hair}" stroke-width="6" stroke-linecap="round"/>`:style==='bald'?`<path d="M28 38Q30 26 36 24" stroke="${hair}" stroke-width="4" fill="none"/><path d="M38 58q12 8 24 0" stroke="${hair}" stroke-width="5" fill="none"/>`:`<path d="M26 44Q24 20 50 20Q76 20 74 44Q66 30 50 32Q34 30 26 44Z" fill="${hair}"/>`}<circle cx="41" cy="47" r="3" fill="#1a1020"/><circle cx="59" cy="47" r="3" fill="#1a1020"/><path d="M43 58q7 5 14 0" stroke="#8a2a2a" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="36" cy="55" rx="4" ry="2.5" fill="#ff8aa0" opacity=".5"/><ellipse cx="64" cy="55" rx="4" ry="2.5" fill="#ff8aa0" opacity=".5"/></svg>`;
const AIS=[{name:'강남불주먹',av:AV('#f4c8a0','#2a1a10','#2a5ae0','cap'),bal:1500000,risk:.6,chat:['가즈아!','이번엔 된다','딜러 버스트 기원']},
 {name:'달빛여우',av:AV('#ffe0cc','#c03a6a','#9a3ad0','girl'),bal:900000,risk:.45,chat:['헤헤 운 좋다','앗…','나이스~']},
 {name:'배팅장인',av:AV('#e8b890','#6a6a6a','#1a1a1a','bald'),bal:3200000,risk:.8,chat:['정석대로 간다','흠…','올인각?']},
 {name:'오늘만산다',av:AV('#ffd0b0','#e0a020','#e05a1a','boy'),bal:600000,risk:.35,chat:['제발!!','샤갈!','오예!']}];

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
let DL=null,shoe=[],cutAt=0,ui=null,seats=[],dealer=null,phase='bet',chipSel=1000,lastBet=0,lastPP=0,streak=0,running=false,timerId=null,bjAuto=false;
function newShoe(){shoe=[];for(let d=0;d<6;d++)for(const s of 'scdh')for(const r of RK)shoe.push({r,s});for(let i=shoe.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shoe[i],shoe[j]]=[shoe[j],shoe[i]]}cutAt=Math.floor(shoe.length*.25)}
const draw=()=>{if(shoe.length<10)newShoe();return shoe.pop()};
const SEATX=[13,31,50,69,87],SEATY=[53,59,62,59,53];

/* ================= 화면 ================= */
function build(){
 const L=window.LOVE||{};const her=L.her||'소현';
 const el=document.createElement('div');el.id='bj';el.innerHTML=`
 <svg class="bjfelt" viewBox="0 0 1000 460" preserveAspectRatio="none"><defs><radialGradient id="bjg" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#9a5ae0"/><stop offset=".55" stop-color="#6a2ab0"/><stop offset="1" stop-color="#3a0a6a"/></radialGradient>
 <path id="bjarc1" d="M240 175Q500 40 760 175"/><path id="bjarc2" d="M200 215Q500 70 800 215"/><path id="bjarc3" d="M220 260Q500 120 780 260"/></defs><rect width="1000" height="460" fill="url(#bjg)"/>
 <g fill="#fff" opacity=".22" font-family="Georgia,serif" font-weight="700"><text font-size="22" letter-spacing="3"><textPath href="#bjarc1" startOffset="50%" text-anchor="middle">BLACKJACK PAYS 3 TO 2</textPath></text><text font-size="34" letter-spacing="4"><textPath href="#bjarc2" startOffset="50%" text-anchor="middle">NO INSURANCE</textPath></text><text font-size="20" letter-spacing="3"><textPath href="#bjarc3" startOffset="50%" text-anchor="middle">DEALER MUST STAND ON 17</textPath></text></g>
 <path d="M150 420Q500 330 850 420" stroke="#fff" stroke-opacity=".08" stroke-width="40" fill="none"/></svg>
 <div class="bjtop"><button class="bjback" id="bjback">‹ 로비</button><div class="bjbal"><i>G</i><b id="bjbal">0</b></div><button class="bjib" id="bjsnd">🔊</button></div>
 <div class="bjdisc"><div class="bjdcards"></div></div>
 <div class="bjlim"><span>MIN</span><b>100</b><span>MAX</span><b>10만</b></div>
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
 DL=dealerEl();DL.id='bjty';el.insertBefore(DL,el.querySelector('.bjrack'));
 seats=[0,1,2,3,4].map(i=>({i,me:i===2,ai:i===2?null:AIS[[0,1,-1,2,3][i]],el:$('bjs'+i),hands:[],bet:0,pp:0}));
 $('bjback').onclick=()=>{if(running&&phase!=='bet'){toast('라운드가 끝나면 나갈 수 있어요');return}close()};
 $('bjsnd').onclick=()=>{api().AUDIO.set&&api().AUDIO.set('sfx',!api().AUDIO.st.sfx);$('bjsnd').textContent=api().AUDIO.st.sfx?'🔊':'🔇'};
}
const toast=(t,ms)=>api().toast(t,ms);
function bal(){return api().S.bal}
function setBal(v){api().S.bal=v;api().save();api().renderBal&&api().renderBal();$('bjbal').textContent=fmt(v)}
function stackHTML(a,small){if(!a)return '';const out=[];let r=a;for(let k=CHIPS.length-1;k>=0&&out.length<6;k--){while(r>=CHIPS[k][0]&&out.length<6){out.push(CHIPS[k][0]);r-=CHIPS[k][0]}}
 return out.reverse().map((v,i)=>`<img alt="" src="${A.U(chipSVG(v))}" style="bottom:${i*(small?3:4)}px">`).join('')}
function paintSeat(s){const e=s.el;e.querySelector('.bjbet .bjstack').innerHTML=stackHTML(s.bet);e.querySelector('.bjamt').textContent=s.bet?short(s.bet):'';
 e.querySelector('.bjppc .bjstack').innerHTML=stackHTML(s.pp,1);e.querySelector('.bjppa').textContent=s.pp?'-'+short(s.pp):'';
 e.querySelector('.bjcb').innerHTML='<i class="bjgem"></i>'+short(s.me?bal():s.ai.bal);if(s.me)e.querySelector('.bjstk').innerHTML=streak>=2?`<b>${streak}</b>연승`:'';
 e.classList.toggle('empty',!s.bet)}
const pick2=a=>a[Math.floor(Math.random()*a.length)];
const VO=s=>s.me?'her':'ai'+[0,1,-1,2,3][s.i];
function say(s,t,v){const b=s.el.querySelector('.bjsay');b.textContent=t;b.classList.remove('on');void b.offsetWidth;b.classList.add('on');if(v)try{api().speak(v===1?t:v,VO(s))}catch(e){}}
function cardEl(c,faceDown){const d=document.createElement('div');d.className='bjc';d.innerHTML=`<img alt="" src="${A.U(faceDown?BACK:cardSVG(c.r,c.s))}">`;return d}
async function dealTo(handEl,c,faceDown=false,tilt=0){const d=cardEl(c,faceDown);handEl.appendChild(d);
 const sr=$('bjshoe').getBoundingClientRect(),tr=d.getBoundingClientRect();const dx=sr.left+sr.width*.3-tr.left,dy=sr.top-tr.top;
 api().sfx('flip');
 await d.animate([{transform:`translate(${dx}px,${dy}px) rotate(-35deg) scale(.6)`,opacity:.6},{transform:`rotate(${tilt}deg)`,opacity:1}],{duration:A.T(330,180),easing:'cubic-bezier(.2,.8,.3,1)'}).finished.catch(()=>{});
 return d}
function handBox(s,hi){let hb=s.el.querySelectorAll('.bjhands .bjh')[hi];if(!hb){hb=document.createElement('div');hb.className='bjh';hb.innerHTML='<div class="bjhand"></div><div class="bjtot"></div>';s.el.querySelector('.bjhands').appendChild(hb)}return hb}
function paintTot(box,h,dealerHide){const t=box.querySelector('.bjtot');if(!h.cards.length){t.textContent='';t.className='bjtot';return}
 const {t:v,soft}=total(h.cards);const bj=isBJ(h)&&!dealerHide;
 t.className='bjtot'+(bj?' bj':v>21?' bust':'');t.innerHTML=bj?'<b>21</b><span>BLACKJACK</span>':v>21?`<b>${v}</b><span>BUST</span>`:soft&&v<21?`${v-10}/${v}`:String(v)}
function msg(t,sub=''){const m=$('bjmsg');m.innerHTML=t?`<b>${t}</b>${sub?`<small>${sub}</small>`:''}`:'';m.classList.toggle('on',!!t)}
function result(s,hi,txt,cls){const r=s.el.querySelector('.bjres');const e=document.createElement('div');e.className='bjr '+cls;e.textContent=txt;e.style.left=(hi*52)+'%';r.appendChild(e)}
function chipFly(fromEl,toEl,n=4){const a=fromEl.getBoundingClientRect(),b=toEl.getBoundingClientRect();for(let i=0;i<n;i++){const im=document.createElement('img');im.className='bjfly';im.src=A.U(chipSVG(CHIPS[2+i%3][0]));document.body.appendChild(im);
 im.animate([{transform:`translate(${a.left+a.width/2}px,${a.top+a.height/2}px)`},{transform:`translate(${b.left+b.width/2}px,${b.top+b.height/2}px)`}],{duration:A.T(520,300),delay:i*60,easing:'ease-in-out'}).onfinish=()=>{im.remove();api().sfx('chip',1)}}}

/* ================= 컨트롤 ================= */
function ctlBet(){const me=seats[2];
 $('bjctl').innerHTML=`<div class="bjchips">${CHIPS.map(([v])=>`<button class="bjchip${v===chipSel?' on':''}" data-v="${v}"><img alt="" src="${A.U(chipSVG(v))}"></button>`).join('')}</div>
 <div class="bjbtns"><button class="bjb g" data-a="clear">취소</button><button class="bjb g" data-a="rebet">리벳${lastBet?'<small>'+short(lastBet+lastPP)+'</small>':''}</button><button class="bjb p" data-a="pp">P.P 베팅<small>${me.pp?short(me.pp):'없음'}</small></button><button class="bjb deal" data-a="deal">딜</button></div>`;
 $('bjhint').textContent='칩을 고르고 가운데 내 자리 동그라미를 눌러 베팅 · 오토 '+(bjAuto?'ON':'OFF');
 $('bjctl').onclick=e=>{const c=e.target.closest('.bjchip'),b=e.target.closest('[data-a]');
  if(c){chipSel=+c.dataset.v;api().sfx('click');ctlBet();return}
  if(!b)return;const a=b.dataset.a;
  if(a==='clear'){setBal(bal()+me.bet+me.pp);me.bet=0;me.pp=0;paintSeat(me);ctlBet()}
  if(a==='rebet'&&lastBet){const need=lastBet+lastPP-me.bet-me.pp;if(bal()<need)return toast('코인 부족!');setBal(bal()+me.bet+me.pp-lastBet-lastPP);me.bet=lastBet;me.pp=lastPP;api().sfx('chip',1);paintSeat(me);ctlBet()}
  if(a==='pp'){const add=Math.min(chipSel,10000);if(me.pp+add>20000){setBal(bal()+me.pp);me.pp=0}else{if(bal()<add)return toast('코인 부족!');setBal(bal()-add);me.pp+=add}api().sfx('chip',1);paintSeat(me);ctlBet()}
  if(a==='deal'){if(!me.bet)return toast('먼저 베팅해 주세요!');round()}}}
function addBet(){if(phase!=='bet')return;const me=seats[2];if(me.bet+chipSel>100000)return toast('최대 10만까지!');if(bal()<chipSel)return toast('코인 부족!');setBal(bal()-chipSel);me.bet+=chipSel;api().sfx('chip',1);paintSeat(me);ctlBet()}
function ctlPlay(h,s){const canD=h.cards.length===2&&bal()>=h.bet,canP=h.cards.length===2&&h.cards[0].r===h.cards[1].r&&s.hands.length<2&&bal()>=h.bet;
 $('bjctl').innerHTML=`<div class="bjbtns play"><button class="bjb hit" data-a="H">히트</button><button class="bjb st" data-a="S">스탠드</button><button class="bjb dbl" data-a="D" ${canD?'':'disabled'}>더블</button><button class="bjb spl" data-a="P" ${canP?'':'disabled'}>스플릿</button></div>`;
 const adv=strategy({...h,canSplit:canP},dealer.cards[0]);$('bjhint').textContent=`추천: ${ADV[adv==='D'&&!canD?'H':adv==='P'&&!canP?'H':adv]}`;
 return new Promise(res=>{$('bjctl').onclick=e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;$('bjctl').onclick=null;api().sfx('click');res(b.dataset.a)}})}

/* ================= 라운드 ================= */
async function round(){if(running)return;running=true;phase='deal';clearTimeout(timerId);
 const me=seats[2];lastBet=me.bet;lastPP=me.pp;$('bjctl').innerHTML='';$('bjhint').textContent='';
 /* AI 베팅 */
 for(const s of seats){if(s.me)continue;s.hands=[];s.el.querySelector('.bjhands').innerHTML='';s.el.querySelector('.bjres').innerHTML='';
  if(Math.random()<.12||s.ai.bal<1000){s.bet=0;s.pp=0;paintSeat(s);continue}
  const base=[1000,2000,5000,10000,20000,40000][Math.floor(Math.random()*(2+s.ai.risk*4))];s.bet=Math.min(base,s.ai.bal);s.ai.bal-=s.bet;s.pp=Math.random()<s.ai.risk*.5?Math.min(2000,s.ai.bal):0;s.ai.bal-=s.pp;paintSeat(s);api().sfx('chip',2);await sleep(A.T(150,60))}
 me.hands=[];me.el.querySelector('.bjhands').innerHTML='';me.el.querySelector('.bjres').innerHTML='';
 const act=seats.filter(s=>s.bet);act.forEach(s=>{s.hands=[{cards:[],bet:s.bet,done:false,canSplit:true}];handBox(s,0)});
 DL.say(pick2(['카드 나갑니다~','자, 딜 들어갈게요~','행운을 빌어요~']));dealer={cards:[],hole:null};$('bjdh').innerHTML='';paintTot($('bjdt').parentNode,{cards:[]});
 if(shoe.length<cutAt){msg('셔플 중…');api().sfx('pile');newShoe();await sleep(900);msg('')}
 /* 2장씩 딜 */
 for(let k=0;k<2;k++){for(const s of act){const h=s.hands[0],c=draw();h.cards.push(c);await dealTo(handBox(s,0).querySelector('.bjhand'),c,false,(Math.random()-.5)*4);paintTot(handBox(s,0),h);await sleep(A.T(90,40))}
  const c=draw();dealer.cards.push(c);await dealTo($('bjdh'),c,k===1);await sleep(A.T(90,40))}
 paintTot($('bjdt').parentNode,{cards:[dealer.cards[0]]});
 /* P.P 정산 */
 for(const s of act){if(!s.pp)continue;const r=ppResult(s.hands[0].cards[0],s.hands[0].cards[1]);const ppEl=s.el.querySelector('.bjppc');
  if(r){const w=s.pp*(r[1]+1);if(s.me){setBal(bal()+w);api().sfx('jjr');toast(`${r[0]}! +${fmt(w)}`,1800)}else s.ai.bal+=w;ppEl.classList.add('win');say(s,r[0]+'!')}else{ppEl.classList.add('lose')}
  s.pp=0;paintSeat(s)}
 await sleep(400);seats.forEach(s=>s.el.querySelector('.bjppc').classList.remove('win','lose'));
 /* 딜러 블랙잭 확인 (보험 없음) */
 const dBJ=total(dealer.cards).t===21;
 if(['A','10','J','Q','K'].includes(dealer.cards[0].r)){msg('딜러 블랙잭 확인…');await sleep(A.T(900,400));msg('')}
 if(dBJ){await reveal();msg('딜러 BLACKJACK','');DL.say('아쉽게도 딜러 블랙잭이에요');await sleep(900)}
 else{
  /* 각 자리 플레이 */
  phase='play';
  for(const s of act){for(let hi=0;hi<s.hands.length;hi++){const h=s.hands[hi],box=handBox(s,hi);s.el.classList.add('turn');box.classList.add('turn');
    if(isBJ(h)){if(s.me){DL.say(`블랙잭! 축하해 ${(window.LOVE||{}).her||'소현'}아~`);api().sfx('jp')}say(s,'블랙잭!');s.el.classList.remove('turn');box.classList.remove('turn');await sleep(500);continue}
    while(total(h.cards).t<21){let a;
     if(s.me)a=await ctlPlay(h,s);else{await sleep(A.T(650,280));a=strategy({...h,canSplit:s.hands.length<2},dealer.cards[0]);if(Math.random()<.06)a=a==='S'?'H':'S';if((a==='D'||a==='P')&&s.ai.bal<h.bet)a='H';if(a==='P'&&s.hands.length>=2)a='H';if(a==='D'&&h.cards.length>2)a='H'}
     if(s.me)$('bjctl').innerHTML='';
     if(a==='S'){say(s,'스탠드',s.me?0:(['스탠드!','여기까지요~','스탠드.','스톱스톱!'][[0,1,-1,2,3][s.i]]));break}
     if(a==='H'){if(!s.me)say(s,'히트',['히트!','한 장 더 주세요~','히트.','하나 더!'][[0,1,-1,2,3][s.i]]);const c=draw();h.cards.push(c);await dealTo(box.querySelector('.bjhand'),c);paintTot(box,h);continue}
     if(a==='D'){if(s.me)setBal(bal()-h.bet);else s.ai.bal-=h.bet;h.bet*=2;s.bet=s.hands.reduce((x,y)=>x+y.bet,0);paintSeat(s);api().sfx('chip',3);say(s,'더블!',s.me?0:1);const c=draw();h.cards.push(c);await dealTo(box.querySelector('.bjhand'),c,false,90);paintTot(box,h);break}
     if(a==='P'){if(s.me)setBal(bal()-h.bet);else s.ai.bal-=h.bet;const c2=h.cards.pop();const nh={cards:[c2],bet:h.bet,split:true};h.split=true;s.hands.splice(hi+1,0,nh);s.bet=s.hands.reduce((x,y)=>x+y.bet,0);paintSeat(s);say(s,'스플릿!',s.me?0:1);
      box.querySelector('.bjhand').lastChild.remove();const nb=handBox(s,hi+1);const d=cardEl(c2);nb.querySelector('.bjhand').appendChild(d);
      const c=draw();h.cards.push(c);await dealTo(box.querySelector('.bjhand'),c);paintTot(box,h);const c3=draw();nh.cards.push(c3);await dealTo(nb.querySelector('.bjhand'),c3);paintTot(nb,nh);
      if(h.cards[0].r==='A')break;continue}}
    const tt=total(h.cards).t;if(tt>21){say(s,s.ai&&Math.random()<.4?'샤갈!':'버스트…');api().sfx('lose');if(s.me)DL.say('아이고, 버스트네요')}
    s.el.classList.remove('turn');box.classList.remove('turn');await sleep(A.T(250,100))}}
  $('bjhint').textContent='';
  /* 딜러 */
  phase='dealer';await reveal();
  const live=act.some(s=>s.hands.some(h=>total(h.cards).t<=21&&!isBJ(h)));
  if(live)while(total(dealer.cards).t<17){await sleep(A.T(550,250));const c=draw();dealer.cards.push(c);await dealTo($('bjdh'),c);paintTot($('bjdt').parentNode,dealer)}
  const dt=total(dealer.cards).t;if(dt>21){msg('딜러 BUST!');DL.say('딜러 버스트! 모두 축하드려요~')}
 }
 /* 정산 */
 await sleep(A.T(500,250));const dt=total(dealer.cards).t,dBust=dt>21;let myNet=0,myWin=false;
 for(const s of act){let pay=0;s.hands.forEach((h,hi)=>{const t=total(h.cards).t,bj=isBJ(h);let r,cls,p=0;
   if(t>21){r='BUST';cls='lose'}else if(dBJ&&bj){r='PUSH';cls='push';p=h.bet}else if(dBJ){r='LOSE';cls='lose'}else if(bj){r='BLACKJACK';cls='bj';p=h.bet*2.5}
   else if(dBust||t>dt){r='WIN';cls='win';p=h.bet*2}else if(t===dt){r='PUSH';cls='push';p=h.bet}else{r='LOSE';cls='lose'}
   pay+=p;result(s,hi,r,cls);if(s.me)myNet+=p-h.bet});
  const betEl=s.el.querySelector('.bjbet');
  if(pay>s.bet)chipFly(document.querySelector('.bjrack'),betEl,5);else if(pay<s.bet)chipFly(betEl,document.querySelector('.bjrack'),3);
  if(s.me){if(pay)setBal(bal()+pay);myWin=pay>s.bet}else{s.ai.bal+=pay;if(pay>s.bet&&Math.random()<.5)say(s,s.ai.chat[2]);else if(pay<s.bet&&Math.random()<.4)say(s,s.ai.chat[1])}
  s.bet=0;paintSeat(s)}
 if(seats[2].hands.length){if(myWin){streak++;api().sfx('jjr');DL.say(pick2([`${(window.LOVE||{}).her||'소현'}이가 이겼다! 축하해~`,'와~ 이겼어요! 축하해요~','역시 우리 소현이!']))}else if(myNet<0){streak=0;api().sfx('lose')}
  msg(myNet>0?`+${fmt(myNet)}`:myNet<0?`${fmt(myNet)}`:'PUSH',myNet>0?(streak>=2?`${streak}연승!`:'승리!'):myNet<0?'다음 판에 복수!':'무승부');paintSeat(seats[2])}
 await sleep(A.T(2200,1200));
 /* 정리 */
 const disc=ui.querySelector('.bjdcards');disc.style.height=Math.min(40,(312-shoe.length)/8)+'px';
 ui.querySelectorAll('.bjhand .bjc').forEach(c=>c.animate([{opacity:1},{opacity:0,transform:'translate(-200px,-200px) scale(.5)'}],{duration:350,fill:'forwards'}));
 await sleep(380);ui.querySelectorAll('.bjhands').forEach(e=>e.innerHTML='');ui.querySelectorAll('.bjres').forEach(e=>e.innerHTML='');$('bjdh').innerHTML='';paintTot($('bjdt').parentNode,{cards:[]});msg('');
 phase='bet';running=false;seats.forEach(paintSeat);
 if(lastBet&&bjAuto&&bal()>=lastBet+lastPP){setBal(bal()-lastBet-lastPP);seats[2].bet=lastBet;seats[2].pp=lastPP;paintSeat(seats[2]);ctlBet();timerId=setTimeout(round,1200)}else ctlBet();
}
async function reveal(){const hole=$('bjdh').children[1];if(hole){await hole.animate([{transform:'scaleX(1)'},{transform:'scaleX(0)'}],{duration:150}).finished.catch(()=>{});hole.querySelector('img').src=A.U(cardSVG(dealer.cards[1].r,dealer.cards[1].s));await hole.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:150}).finished.catch(()=>{});api().sfx('flip')}paintTot($('bjdt').parentNode,dealer)}

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
function open(){A=window.TL_API;if(!A)return;if(!ui)build();ui.classList.add('on');document.body.classList.add('bjon');try{A.AUDIO.play('bj')}catch(e){}
 if(!shoe.length)newShoe();setBal(bal());seats.forEach(paintSeat);ctlBet();
 ui.querySelector('#bjs2 .bjbet').onclick=addBet;$('bjsnd').textContent=A.AUDIO.st.sfx?'🔊':'🔇';
 if(!open.once){open.once=1;msg('블랙잭 테이블','칩을 골라 내 자리에 베팅하고 딜!');setTimeout(()=>msg(''),2200)}
 setTimeout(()=>DL.say(`어서 와 ${(window.LOVE||{}).her||'소현'}아~ 베팅해 주세요!`),700);
 try{window.TLApp&&TLApp.orient('landscape')}catch(e){}}
function close(){if(!ui)return;const me=seats[2];if(me.bet||me.pp){setBal(bal()+me.bet+me.pp);me.bet=me.pp=0}clearTimeout(timerId);ui.classList.remove('on');document.body.classList.remove('bjon');try{A.AUDIO.play('lobby')}catch(e){}A.renderBal&&A.renderBal()}
window.CARDKIT={cardSVG,BACK,chipSVG,CHIPS,AV,short,fmt,dealerEl};
window.BJ={open,close,card:`<button class="gcard c-bj" data-ext="bj"><span class="rays"></span><span class="bdg">21</span><span class="hero bjhero"><span>${cardSVG('A','s')}</span><span>${cardSVG('K','h')}</span></span><b class="en" style="font-family:Bungee,sans-serif">BLACKJACK</b><span class="kn">블랙잭 테이블</span><small>AI 4명과 함께 · 3:2 · P.P 사이드벳</small></button>`};
document.addEventListener('DOMContentLoaded',()=>{});
})();
