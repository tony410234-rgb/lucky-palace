/* 태율랜드 · 통계 / 업적·칭호 / 배경음악 고르기 */
(()=>{
const $=id=>document.getElementById(id);
const A=()=>window.TL_API;
const S=()=>A()&&A().S;
const fmt=n=>Math.round(n).toLocaleString('en-US');
const short=n=>{n=Math.round(n);const s=n<0?'-':'';n=Math.abs(n);if(n>=1e8){const v=n/1e8;return s+(v>=10?Math.round(v):+v.toFixed(1))+'억'}if(n>=1e4){const v=n/1e4;return s+(v>=100?Math.round(v).toLocaleString():+v.toFixed(1))+'만'}return s+n.toLocaleString()};
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const HER=()=>(window.LOVE||{}).her||'소현';
function st(){const s=S();if(!s)return null;if(!s.st)s.st={};const t=s.st;
 t.sp=t.sp||0;t.bet=t.bet||0;t.win=t.win||0;t.g=t.g||{};t.day=t.day||{};t.best=t.best||{amt:0,g:'',x:0};t.c=t.c||{};t.ach=t.ach||{};t.title=t.title||'';t.time=t.time||{};return t}
const gs=id=>{const t=st();return t.g[id]||(t.g[id]={n:0,bet:0,win:0,big:0})};
const dy=()=>{const t=st();const k=today();return t.day[k]||(t.day[k]={bet:0,win:0})};
const save=()=>{try{A().save()}catch(e){}};
const NAME=id=>({bj:'블랙잭',he:'텍사스 홀덤',tour:'홀덤 토너먼트'})[id]||((typeof GAMES!=='undefined'&&GAMES.list.find(g=>g.id===id))||{}).name||id;

/* ---------- 기록 ---------- */
const STATS={
 bet(g,a){if(!a||!st())return;const x=gs(g),t=st();x.bet+=a;t.bet+=a;dy().bet+=a;save()},
 win(g,a){if(!a||!st())return;const x=gs(g),t=st();x.win+=a;t.win+=a;dy().win+=a;save();chk()},
 spin(g){if(!st())return;gs(g).n++;st().sp++;const p=st().c;p.played=p.played||{};p.played[g]=1;chk()},
 spinEnd(g,amt,b){if(!st()||!amt)return;const x=gs(g),t=st();if(amt>x.big)x.big=amt;if(amt>t.best.amt)t.best={amt,g,x:b?Math.round(amt/b):0};
  const r=b?amt/b:0;const c=t.c;c.maxx=Math.max(c.maxx||0,r);if(r>=10)c.big=(c.big||0)+1;save();chk()},
 ev(k,v){const t=st();if(!t)return;const c=t.c;
  if(k==='jp'){c.jp=(c.jp||0)+1;if(v==='GRAND')c.grand=(c.grand||0)+1}
  else if(k==='fs'){c.fs=(c.fs||0)+1;if(v==='love')c.lovefs=(c.lovefs||0)+1}
  else if(k==='bjstreak'){c.bjstreak=Math.max(c.bjstreak||0,v)}
  else if(k==='hewin'){c.hewin=(c.hewin||0)+1;c.hebest=Math.max(c.hebest==null?-1:c.hebest,v==null?-1:v)}
  else c[k]=(c[k]||0)+1;
  save();chk()},
 tick(){const t=st();if(!t||document.visibilityState!=='visible')return;let g=null;const b=document.body;
  if(b.classList.contains('bjon'))g='bj';else if(b.classList.contains('heon'))g=window.HE&&HE.isTour&&HE.isTour()?'tour':'he';else if($('game')&&$('game').classList.contains('on'))g=A().gid;
  if(g){t.time[g]=(t.time[g]||0)+15;save()}chk()}};
window.STATS=STATS;
setInterval(()=>STATS.tick(),15000);

/* ---------- 업적 ---------- */
const C=()=>st().c;
const ACH=[
 ['spin1','첫 스핀','슬롯을 처음 돌려요','슬롯 입문자','🎰',()=>st().sp,1,5000],
 ['spin100','스핀 100회','슬롯 100번 돌리기','꾸준한 '+HER(),'🎰',()=>st().sp,100,30000],
 ['spin1000','스핀 1,000회','슬롯 1,000번 돌리기','슬롯 장인','🏆',()=>st().sp,1000,300000],
 ['big1','첫 빅윈','한 번에 베팅의 10배 이상','빅윈 체험','✨',()=>C().big||0,1,20000],
 ['x50','메가윈','한 번에 베팅의 50배 이상','메가윈 여왕','💎',()=>C().maxx||0,50,100000],
 ['x100','금손 인증','한 번에 베팅의 100배 이상','금손 '+HER(),'👑',()=>C().maxx||0,100,300000],
 ['fs1','첫 프리게임','프리게임 들어가기','프리게임 러버','🎁',()=>C().fs||0,1,20000],
 ['fs20','프리게임 20번','프리게임 20번 들어가기','프리게임 마스터','🎁',()=>C().fs||0,20,200000],
 ['jp1','첫 잭팟','잭팟 당첨 (MINI 이상)','잭팟 헌터','💰',()=>C().jp||0,1,50000],
 ['grand','그랜드 잭팟','GRAND 잭팟 당첨','그랜드 퀸','👑',()=>C().grand||0,1,1000000],
 ['tour','카지노 투어','슬롯 8가지 이상 플레이','카지노 투어러','🎡',()=>Object.keys(C().played||{}).length,8,100000],
 ['m1','백만장자','잔액 100만 달성','백만장자','🪙',()=>S().bal,1e6,50000],
 ['m10','천만장자','잔액 1,000만 달성','천만장자','💰',()=>S().bal,1e7,300000],
 ['m100','억만장자','잔액 1억 달성','억만장자','💎',()=>S().bal,1e8,2000000],
 ['lv10','레벨 10','레벨 10 달성','베테랑','⭐',()=>S().lvl||1,10,200000],
 ['bj1','블랙잭 첫 승','블랙잭에서 이기기','블랙잭 데뷔','🃏',()=>C().bjwin||0,1,20000],
 ['bj21','21의 여신','블랙잭(21) 10번 받기','21의 여신','🃏',()=>C().bjbj||0,10,200000],
 ['bjs5','5연승','블랙잭 5연승','연승 행진','🔥',()=>C().bjstreak||0,5,150000],
 ['he1','포커 데뷔','홀덤에서 팟 이기기','포커 데뷔','🎲',()=>C().hewin||0,1,20000],
 ['heFH','풀하우스 메이커','홀덤에서 풀하우스 이상으로 이기기','풀하우스 메이커','🃏',()=>C().hebest>=6?1:0,1,150000],
 ['heRF','로열 플러시','홀덤에서 로열 플러시로 이기기','로열 퀸','👑',()=>C().hebest>=9?1:0,1,3000000],
 ['tw1','토너먼트 우승','홀덤 토너먼트 1등','토너먼트 챔피언','🏆',()=>C().tourwin||0,1,300000],
 ['mp1','단짝 플레이','같이하기로 한 판 하기','단짝 플레이어','💕',()=>C().mp||0,1,50000],
 ['ht10','사랑꾼','같이하기에서 하트 10번 보내기','사랑꾼','💖',()=>C().heart||0,10,100000],
 ['tap50','애정 표현','캐릭터 50번 쓰다듬기','애정 표현 장인','🥰',()=>C().tap||0,50,50000],
 ['love1','데이트 완주','스위트 러브 프리게임 들어가기','데이트 코스 완주','💌',()=>C().lovefs||0,1,100000]];
const TIER=r=>r>=1e6?['#ffe68a','#e0a010','#8a5a00']:r>=1e5?['#ffd0ea','#ff5fa2','#a0205a']:r>=3e4?['#eef2ff','#a8b4d0','#5a6480']:['#ffd8b0','#d08a4a','#7a4a1a'];
function badge(a,on,size=64){const [c1,c2,c3]=on?TIER(a[7]):['#ddd','#aaa','#777'];const I=typeof ICONS!=='undefined'&&ICONS[a[4]];
 return `<svg viewBox="0 0 100 110" width="${size}" height="${size*1.1}"><defs><radialGradient id="bg${a[0]}${on?1:0}" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="${c1}"/><stop offset=".6" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></radialGradient></defs>
 <path d="M30 70L20 106L36 98L44 108L50 74Z" fill="${on?'#ff5fa2':'#bbb'}"/><path d="M70 70L80 106L64 98L56 108L50 74Z" fill="${on?'#c78bff':'#999'}"/>
 <circle cx="50" cy="46" r="40" fill="url(#bg${a[0]}${on?1:0})" stroke="#fff" stroke-width="4"/><circle cx="50" cy="46" r="31" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2" stroke-dasharray="4 4"/>
 ${on&&I?`<g transform="translate(24 20) scale(.52)">${I}</g>`:`<text x="50" y="60" text-anchor="middle" font-size="38" font-weight="900" fill="#fff" font-family="Arial">?</text>`}</svg>`}
let queue=[],showing=false;
function chk(){const t=st();if(!t)return;for(const a of ACH){if(t.ach[a[0]])continue;let v=0;try{v=a[5]()}catch(e){}if(v>=a[6]){t.ach[a[0]]=Date.now();try{A().S.bal+=a[7];A().renderBal&&A().renderBal(true)}catch(e){}queue.push(a)}}
 if(queue.length){save();if(!showing)nextPop()}}
function nextPop(){const a=queue.shift();if(!a){showing=false;return}showing=true;
 let d=$('achpop');if(!d){d=document.createElement('div');d.id='achpop';document.body.appendChild(d)}
 d.innerHTML=`${badge(a,true,56)}<div><small>업적 달성!</small><b>${a[1]}</b><em>칭호 「${a[3]}」 · +${short(a[7])}</em></div>`;d.className='on';
 try{A().AUDIO.sfx.lvl()}catch(e){}try{A().speak(`업적 달성! ${a[1]}`,'ann')}catch(e){}
 d.onclick=()=>{d.className='';setTimeout(()=>{showing=false;openAch()},300)};
 setTimeout(()=>{d.className='';setTimeout(nextPop,500)},3200)}

/* ---------- 공통 오버레이 ---------- */
function ov(html){let o=$('stov');if(!o){o=document.createElement('div');o.id='stov';document.body.appendChild(o);o.onclick=e=>{if(e.target===o||e.target.closest('.stx'))o.classList.remove('on')}}
 o.innerHTML=`<div class="stin">${html}<button class="stx">닫기</button></div>`;o.classList.add('on');try{A().AUDIO.sfx.click()}catch(e){}return o}

function openAch(){const t=st();if(!t)return;const n=ACH.filter(a=>t.ach[a[0]]).length;
 const o=ov(`<h3>업적 · 칭호</h3><p class="stsub">${n} / ${ACH.length} 달성 · 달성한 배지를 누르면 칭호로 쓸 수 있어요</p>
 <div class="achg">${ACH.map(a=>{const on=!!t.ach[a[0]];let v=0;try{v=a[5]()}catch(e){}const pr=Math.min(1,v/a[6]);
  return `<button class="achi ${on?'on':''} ${t.title===a[3]?'cur':''}" data-t="${on?a[3]:''}">${badge(a,on,54)}<b>${a[1]}</b><small>${a[2]}</small>${on?`<em>「${a[3]}」</em>`:`<i><s style="width:${(pr*100).toFixed(0)}%"></s></i><em class="lk">보상 +${short(a[7])}</em>`}</button>`}).join('')}</div>
 <button class="stbtn" id="achoff">칭호 안 쓰기</button>`);
 o.querySelector('.achg').onclick=e=>{const b=e.target.closest('.achi');if(!b||!b.dataset.t)return;t.title=b.dataset.t;save();setTitle();openAch();try{A().toast(`칭호 「${t.title}」 장착!`,1200)}catch(x){}};
 $('achoff').onclick=()=>{t.title='';save();setTitle();openAch()}}
function setTitle(){const t=st();const v=$('vip');if(!v||!t)return;v.innerHTML=t.title?`<span class="ttl">「${t.title}」</span> ${HER()}님 전용 카지노`:`VIP ${HER()}님 전용 카지노`}

/* ---------- 통계 화면 ---------- */
function openStats(){const t=st();if(!t)return;const net=t.win-t.bet,rtp=t.bet?t.win/t.bet*100:0;
 const days=[];for(let i=6;i>=0;i--){const d=new Date(Date.now()-i*864e5);const k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');const x=t.day[k]||{bet:0,win:0};days.push([`${d.getMonth()+1}/${d.getDate()}`,x.win-x.bet])}
 const mx=Math.max(1,...days.map(d=>Math.abs(d[1])));const W=320,H=150,bw=30,gap=(W-7*bw)/8;
 const chart=`<svg viewBox="0 0 ${W} ${H+26}" class="stch"><line x1="0" y1="${H/2}" x2="${W}" y2="${H/2}" stroke="#d8b0c8" stroke-dasharray="4 4"/>${days.map((d,i)=>{const x=gap+i*(bw+gap),h=Math.abs(d[1])/mx*(H/2-14),up=d[1]>=0;
  return `<rect x="${x}" y="${up?H/2-h:H/2}" width="${bw}" height="${Math.max(h,1)}" rx="6" fill="${up?'url(#stp)':'url(#stl)'}"/>${d[1]?`<text x="${x+bw/2}" y="${up?H/2-h-4:H/2+h+12}" text-anchor="middle" font-size="10" font-weight="700" fill="${up?'#e0357e':'#7a5ad0'}">${short(d[1])}</text>`:''}<text x="${x+bw/2}" y="${H+18}" text-anchor="middle" font-size="11" fill="#a0607e">${d[0]}</text>`}).join('')}
  <defs><linearGradient id="stp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9ccb"/><stop offset="1" stop-color="#ff5fa2"/></linearGradient><linearGradient id="stl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8b0ff"/><stop offset="1" stop-color="#9a7ae8"/></linearGradient></defs></svg>`;
 const rows=Object.entries(t.g).filter(([k,x])=>x.bet||x.win).sort((a,b)=>b[1].bet-a[1].bet);const gm=Math.max(1,...rows.map(([k,x])=>Math.abs(x.win-x.bet)));
 const tm=Object.values(t.time).reduce((a,b)=>a+b,0);const hh=Math.floor(tm/3600),mm=Math.floor(tm%3600/60);
 ov(`<h3>내 통계</h3>
 <div class="stsum"><div><small>총 스핀</small><b>${fmt(t.sp)}</b></div><div><small>총 손익</small><b class="${net>=0?'p':'m'}">${net>=0?'+':''}${short(net)}</b></div><div><small>환수율</small><b>${rtp.toFixed(1)}%</b></div><div><small>플레이 시간</small><b>${hh?hh+'시간 ':''}${mm}분</b></div></div>
 <h4>최근 7일 손익</h4>${chart}
 <h4>최고 기록</h4><div class="stbest"><div><small>가장 큰 당첨</small><b>${t.best.amt?short(t.best.amt):'-'}</b><em>${t.best.amt?NAME(t.best.g)+(t.best.x?` · ${t.best.x}배`:''):''}</em></div><div><small>잭팟</small><b>${t.c.jp||0}번</b><em>그랜드 ${t.c.grand||0}번</em></div><div><small>프리게임</small><b>${t.c.fs||0}번</b><em>빅윈 ${t.c.big||0}번</em></div><div><small>카드게임</small><b>${(t.c.bjwin||0)+(t.c.hewin||0)}승</b><em>블랙잭 ${t.c.bjbj||0}번 · 우승 ${t.c.tourwin||0}</em></div></div>
 <h4>게임별</h4><div class="strows">${rows.length?rows.map(([k,x])=>{const n=x.win-x.bet,w=Math.abs(n)/gm*100;return `<div class="str"><b>${NAME(k)}</b><span class="bar"><i class="${n>=0?'p':'m'}" style="width:${w.toFixed(0)}%"></i></span><em class="${n>=0?'p':'m'}">${n>=0?'+':''}${short(n)}</em><small>${x.n?fmt(x.n)+'판 · ':''}환수 ${x.bet?(x.win/x.bet*100).toFixed(0):0}% · 최대 ${short(x.big||0)}</small></div>`}).join(''):'<p class="stsub">아직 기록이 없어요. 게임을 해보세요!</p>'}</div>
 <button class="stbtn" id="streset">통계 초기화</button>`);
 $('streset').onclick=()=>{if(!confirm('통계를 처음부터 다시 셀까요? (업적·칭호는 그대로)'))return;const a=t.ach,ti=t.title,c=t.c;S().st={ach:a,title:ti,c:{played:c.played}};save();openStats()}}

/* ---------- 배경음악 고르기 ---------- */
const BGMS=[['lobby','기본 카지노','반짝반짝 메인 음악'],['love','스위트 러브','핑크 슬롯의 달달한 음악'],['bj','재즈 라운지','블랙잭 테이블 재즈'],['panda','판다 축제','신나는 동양풍'],['olympus','올림푸스','웅장한 신전'],['toad','황금 두꺼비','흥겨운 복 음악'],['vault','머니 볼트','경쾌한 금고 음악']];
function openBgm(){const s=S();const cur=s.lobbyBgm||'lobby';
 const o=ov(`<h3>메인 배경음악</h3><p class="stsub">메인 화면에서 나오는 음악을 골라요 · 누르면 미리 들어볼 수 있어요</p><div class="bgml">${BGMS.map(b=>`<button class="bgmi ${b[0]===cur?'on':''}" data-b="${b[0]}"><i></i><b>${b[1]}</b><small>${b[2]}</small></button>`).join('')}</div>`);
 o.querySelector('.bgml').onclick=e=>{const b=e.target.closest('.bgmi');if(!b)return;s.lobbyBgm=b.dataset.b;save();const Au=A().AUDIO;Au.setLobby&&Au.setLobby(s.lobbyBgm);if(!Au.st.bgm){Au.set&&Au.set('bgm',true)}Au.play('lobby',true);o.querySelectorAll('.bgmi').forEach(x=>x.classList.toggle('on',x===b))}}

/* ---------- 메인 버튼 + 스타일 ---------- */
const ICO={ach:`<svg viewBox="0 0 40 40"><path d="M13 24L9 38l6-3 3 4 3-13z" fill="#ff7ab8"/><path d="M27 24l4 14-6-3-3 4-3-13z" fill="#b48aff"/><circle cx="20" cy="16" r="12" fill="#ffd34d" stroke="#fff" stroke-width="2.5"/><path d="M20 9l2.2 4.5 5 .7-3.6 3.5.8 5-4.4-2.3-4.4 2.3.8-5-3.6-3.5 5-.7z" fill="#fff"/></svg>`,
 st:`<svg viewBox="0 0 40 40"><rect x="5" y="22" width="7" height="12" rx="2" fill="#b48aff"/><rect x="16.5" y="14" width="7" height="20" rx="2" fill="#ff7ab8"/><rect x="28" y="7" width="7" height="27" rx="2" fill="#ff4f99"/><path d="M5 18L17 10l7 4 11-9" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 bgm:`<svg viewBox="0 0 40 40"><path d="M15 29V9l18-4v20" stroke="#ff4f99" stroke-width="3.5" fill="none" stroke-linejoin="round"/><ellipse cx="11" cy="29" rx="6" ry="5" fill="#ff7ab8"/><ellipse cx="29" cy="25" rx="6" ry="5" fill="#b48aff"/></svg>`};
function css(){const s=document.createElement('style');s.textContent=`
.lbtns{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.lbtns button{display:flex;align-items:center;justify-content:center;gap:6px;min-height:46px;border-radius:14px;background:linear-gradient(#fff,#fff0f7);border:2px solid #ffb3d1;color:#d4357a;font:400 15px 'Black Han Sans',sans-serif;box-shadow:0 4px 0 #f6b3cf}
.lbtns svg{width:24px;height:24px}
#lobby .lbtns{grid-column:1}
#vip .ttl{color:#ff4f99;font-weight:700}
#stov{position:fixed;inset:0;z-index:60;background:#3a1030aa;display:none;align-items:center;justify-content:center;padding:12px;font-family:Jua,'Black Han Sans',sans-serif}
#stov.on{display:flex}
.stin{width:min(560px,100%);max-height:92vh;overflow:auto;background:linear-gradient(170deg,#fff5fa,#f6efff);border:3px solid #fff;border-radius:22px;box-shadow:0 10px 40px #c0508a66;padding:16px 14px;color:#8a2a5a;text-align:center;animation:zin .3s ease-out}
.stin h3{margin:0 0 4px;font-size:24px;color:#e0357e}.stin h4{margin:14px 0 6px;text-align:left;color:#c0508a;font-size:15px}
.stsub{margin:0 0 10px;font-size:12px;color:#b07090}
.stx,.stbtn{margin-top:12px;border:0;border-radius:999px;padding:10px 28px;font:400 16px Jua,sans-serif;color:#fff;background:linear-gradient(#ff9ccb,#ff5fa2);box-shadow:0 3px 0 #d8447f}
.stbtn{background:linear-gradient(#c8b0ff,#9a7ae8);box-shadow:0 3px 0 #6a4ac0;margin-right:6px;font-size:13px;padding:7px 18px}
.achg{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:8px}
.achi{background:#fff;border:2px solid #f3d0e2;border-radius:16px;padding:8px 6px;display:flex;flex-direction:column;align-items:center;gap:2px;color:#8a5a78;font-family:Jua,sans-serif}
.achi b{font-size:13px;color:#7a4a6a}.achi small{font-size:10px;opacity:.8;line-height:1.2}.achi em{font-style:normal;font-size:11px;color:#e0357e}.achi em.lk{color:#a08aa0}
.achi.on{border-color:#ff9ccb;box-shadow:0 3px 10px #ff9ccb44}.achi.cur{outline:3px solid #ff4f99;background:#fff0f7}
.achi:not(.on){opacity:.75}.achi i{display:block;width:80%;height:6px;background:#eee;border-radius:6px;overflow:hidden;margin-top:3px}.achi i s{display:block;height:100%;background:linear-gradient(90deg,#ff9ccb,#c79bff)}
#achpop{position:fixed;left:50%;top:-120px;transform:translateX(-50%);z-index:200;display:flex;align-items:center;gap:10px;background:linear-gradient(#fff,#fff0f7);border:3px solid #ff9ccb;border-radius:20px;padding:6px 18px 6px 8px;box-shadow:0 8px 24px #c0508a66;transition:top .4s cubic-bezier(.3,1.4,.5,1);font-family:Jua,sans-serif;max-width:94vw}
#achpop.on{top:12px}#achpop small{display:block;color:#ff5fa2;font-size:12px}#achpop b{display:block;color:#7a2a5a;font-size:18px}#achpop em{font-style:normal;color:#9a6ad0;font-size:12px}
.stsum{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.stsum div,.stbest div{background:#fff;border-radius:14px;padding:8px 4px;border:2px solid #f6d6e6}
.stsum small,.stbest small{display:block;font-size:11px;color:#b07090}.stsum b,.stbest b{display:block;font-size:17px;color:#7a2a5a}.stbest em{display:block;font-style:normal;font-size:10px;color:#a08aa0}
.stbest{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}
b.p,em.p{color:#e0357e!important}b.m,em.m{color:#7a5ad0!important}
.stch{width:100%;background:#fff;border-radius:14px;border:2px solid #f6d6e6}
.strows{display:flex;flex-direction:column;gap:6px}.str{display:grid;grid-template-columns:96px 1fr 64px;align-items:center;gap:6px;background:#fff;border-radius:12px;padding:6px 8px;text-align:left;border:2px solid #f6d6e6}
.str b{font-size:13px;color:#7a2a5a}.str em{font-style:normal;font-size:13px;text-align:right}.str small{grid-column:1/-1;font-size:10px;color:#a08aa0}
.str .bar{height:10px;background:#f6eef4;border-radius:8px;overflow:hidden}.str .bar i{display:block;height:100%;border-radius:8px}.str .bar i.p{background:linear-gradient(90deg,#ffb3d6,#ff5fa2)}.str .bar i.m{background:linear-gradient(90deg,#d8c8ff,#9a7ae8)}
.bgml{display:flex;flex-direction:column;gap:6px}.bgmi{display:grid;grid-template-columns:24px 1fr;grid-template-rows:auto auto;column-gap:8px;text-align:left;background:#fff;border:2px solid #f3d0e2;border-radius:14px;padding:8px 12px;font-family:Jua,sans-serif;color:#7a2a5a}
.bgmi i{grid-row:1/3;align-self:center;width:20px;height:20px;border-radius:50%;border:3px solid #ffb3d1}.bgmi.on i{background:radial-gradient(#ff4f99 45%,#fff 50%)}.bgmi.on{border-color:#ff5fa2;background:#fff0f7}
.bgmi b{font-size:15px}.bgmi small{font-size:11px;color:#a08aa0}
@media (orientation:landscape){#lobby .foot{display:none}#lobby .lbtns button{min-height:34px;font-size:13px}#lobby .lbtns svg{width:18px;height:18px}}
@media (orientation:landscape) and (max-height:600px){.stin{max-height:96vh;padding:10px}.stsum b{font-size:15px}}`;document.head.appendChild(s)}
function init(){css();const lw=$('lwheel');if(lw&&!$('lbtns')){const d=document.createElement('div');d.className='lbtns';d.id='lbtns';
 d.innerHTML=`<button id="bAch">${ICO.ach}업적</button><button id="bSt">${ICO.st}통계</button><button id="bBgm">${ICO.bgm}음악</button>`;lw.after(d);
 $('bAch').onclick=openAch;$('bSt').onclick=openStats;$('bBgm').onclick=openBgm}
 setTimeout(()=>{setTitle();const s=S();if(s&&s.lobbyBgm){const Au=A().AUDIO;Au.setLobby&&Au.setLobby(s.lobbyBgm)}chk()},300)}
STATS.openAch=openAch;STATS.openStats=openStats;STATS.openBgm=openBgm;STATS.setTitle=setTitle;STATS.ACH=ACH;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else setTimeout(init,0);
})();
