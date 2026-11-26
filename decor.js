const DECOR=(()=>{
const R=(a,b)=>a+Math.random()*(b-a);
const EF="'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";
const em=(e,x,y,s,cls='')=>`<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle" class="${cls}" style="font-family:${EF}">${e}</text>`;
const stars=(n,h=420,col='#fff')=>Array.from({length:n},()=>`<circle cx="${R(0,400).toFixed(0)}" cy="${R(0,h).toFixed(0)}" r="${R(.6,2).toFixed(1)}" fill="${col}" opacity="${R(.3,.9).toFixed(2)}"/>`).join('');
const W=(inner,defs='')=>`<svg viewBox="0 0 400 900" preserveAspectRatio="xMidYMax slice"><defs>${defs}</defs>${inner}</svg>`;
const lg=(id,a,b,o1=1,o2=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}" stop-opacity="${o1}"/><stop offset="1" stop-color="${b}" stop-opacity="${o2}"/></linearGradient>`;
const bamboo=x=>`<g class="sway2"><rect x="${x}" y="0" width="16" height="900" fill="#3a9a4a"/><rect x="${x+3}" y="0" width="4" height="900" fill="#7ad08a" opacity=".6"/>${[120,260,400,540,680,820].map(y=>`<rect x="${x-2}" y="${y}" width="20" height="6" rx="3" fill="#256a30"/>`).join('')}<path d="M${x+16} 200q30-14 54 4q-30 6-54-4z M${x} 470q-30-14-54 4q30 6 54-4z M${x+16} 610q28-16 50 0q-28 8-50 0z" fill="#4ab85a"/></g>`;
const lantern=(x,y,s=1)=>`<g class="sway" transform="translate(${x} ${y}) scale(${s})"><path d="M0 -60v40" stroke="#5a2a00" stroke-width="2"/><rect x="-14" y="-24" width="28" height="6" rx="2" fill="#ffd34d"/><ellipse cx="0" cy="6" rx="24" ry="28" fill="#e0202a"/><ellipse cx="-6" cy="0" rx="8" ry="18" fill="#ff6a5a" opacity=".6"/><path d="M-24 6h48M-20 -10h40M-20 22h40" stroke="#a00a14" stroke-width="2"/><rect x="-14" y="32" width="28" height="6" rx="2" fill="#ffd34d"/><path d="M0 38v18" stroke="#ffd34d" stroke-width="3"/><circle cx="0" cy="6" r="30" fill="#ff8a3a" opacity=".15"/></g>`;
const leaf=(x,y,r,s,c)=>`<ellipse cx="${x}" cy="${y}" rx="${70*s}" ry="${22*s}" fill="${c}" transform="rotate(${r} ${x} ${y})"/><path d="M${x-60*s*Math.cos(r*Math.PI/180)} ${y-60*s*Math.sin(r*Math.PI/180)}L${x+60*s*Math.cos(r*Math.PI/180)} ${y+60*s*Math.sin(r*Math.PI/180)}" stroke="#0a3a10" stroke-width="2" opacity=".5"/>`;
const cloud=(x,y,s,col='#fff',o=1)=>`<g opacity="${o}" transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="40" ry="18" fill="${col}"/><ellipse cx="-22" cy="-10" rx="22" ry="18" fill="${col}"/><ellipse cx="14" cy="-16" rx="26" ry="22" fill="${col}"/></g>`;
const SC={
 egypt:()=>W(`${stars(70)}<circle cx="320" cy="120" r="90" fill="#fff3c4" opacity=".1"/><circle cx="320" cy="120" r="44" fill="#fff6d6"/><circle cx="306" cy="110" r="8" fill="#e8dcb0"/><circle cx="330" cy="135" r="5" fill="#e8dcb0"/>
  <path d="M-20 760L120 590L260 760z" fill="url(#py)"/><path d="M120 590L260 760H170z" fill="#7a4a12"/><path d="M200 780L320 640L440 780z" fill="url(#py)"/><path d="M320 640L440 780H360z" fill="#6a3e0e"/>
  <path d="M0 760Q120 720 220 750T400 740V900H0z" fill="#8a5418"/><path d="M0 820Q160 780 400 815V900H0z" fill="#4a2a0a"/>${em('🌴',40,770,70)}${em('🌴',372,800,60)}${em('🐪',280,812,40)}`,lg('py','#ffd36a','#b5741f')),
 buffalo:()=>W(`<circle cx="200" cy="700" r="160" fill="#ffb03a" opacity=".25"/><circle cx="200" cy="700" r="100" fill="#ffd36a"/>
  <path d="M0 690h60v-80h70v80h40v-40h50v40h90v-120h60v120h30V900H0z" fill="#7a2a10"/><path d="M0 740h400V900H0z" fill="#5a1a08"/><path d="M0 790Q200 760 400 795V900H0z" fill="#3a1004"/>
  ${em('🌵',50,800,64)}${em('🌵',360,820,52)}${em('🦅',90,180,40,'')}${em('🦅',300,260,30,'')}`),
 lucky:()=>W(`<polygon class="beam" points="40,900 -40,0 120,0" fill="url(#bm)"/><polygon class="beam" points="360,900 280,0 440,0" fill="url(#bm)" style="animation-delay:-3s"/>
  <path d="M0 780h400V900H0z" fill="#3a0010"/><path d="M0 780h400" stroke="#ffd34d" stroke-width="4"/>${Array.from({length:9},(_,i)=>`<circle cx="${20+i*45}" cy="780" r="6" fill="#fff6c0"/>`).join('')}
  ${em('🎲',60,850,48)}${em('🃏',340,860,44)}${em('💎',200,880,30)}${em('🍀',30,120,34)}${em('🍀',370,200,28)}`,lg('bm','#ffffff','#ffffff',.22,0)),
 panda:()=>W(`<path d="M-20 520Q60 400 140 480T300 440T420 500V900H-20z" fill="#d8a0e0" opacity=".55"/><path d="M-20 600Q100 520 200 580T420 560V900H-20z" fill="#b070c8" opacity=".6"/>
  <path d="M0 790Q200 750 400 790V900H0z" fill="#4ab85a"/><path d="M0 830Q200 805 400 835V900H0z" fill="#2a8a3a"/>
  ${bamboo(14)}${bamboo(46)}${bamboo(340)}${bamboo(372)}${lantern(110,70)}${lantern(290,50,.85)}${lantern(200,110,.7)}${em('🌸',90,300,26)}${em('🌸',320,360,22)}`),
 piggy:()=>W(`<circle cx="330" cy="110" r="60" fill="#fff3a0" opacity=".35"/><circle cx="330" cy="110" r="38" fill="#ffe14a"/>
  <g class="drift">${cloud(40,90,1.1)}${cloud(220,170,.8,'#fff',.9)}</g><g class="drift" style="animation-duration:60s;animation-delay:-30s">${cloud(120,240,.9,'#fff',.8)}</g>
  <path d="M-20 700Q100 620 220 690T420 660V900H-20z" fill="#5ac85a"/><path d="M-20 760Q200 720 420 770V900H-20z" fill="#3aa040"/>
  <g transform="translate(290 640)"><rect x="0" y="40" width="90" height="70" fill="#c82a1a"/><path d="M-8 44L45 0L98 44z" fill="#8a1a0a"/><rect x="30" y="66" width="30" height="44" fill="#fff"/><path d="M30 66l30 44M60 66l-30 44" stroke="#c82a1a" stroke-width="4"/></g>
  <path d="M0 800h400" stroke="#fff" stroke-width="5"/>${Array.from({length:11},(_,i)=>`<rect x="${4+i*38}" y="776" width="8" height="40" fill="#fff"/>`).join('')}${em('🌻',40,860,46)}${em('🌻',360,870,40)}${em('🐔',200,880,32)}`),
 dragon:()=>W(`${[[60,160],[320,240],[150,330],[360,420],[40,470]].map(([x,y])=>cloud(x,y,1,'#ffd36a',.35)).join('')}
  ${lantern(60,60)}${lantern(340,60)}
  <g fill="#3a0306"><path d="M-20 760h140l-20-30h-100z"/><path d="M-30 735Q50 700 130 735z"/><rect x="0" y="760" width="110" height="140"/>
  <path d="M260 740h160V900H260z"/><path d="M240 740Q340 690 440 740z"/><path d="M270 700h120l-10-20h-100z"/><path d="M255 682Q330 650 405 682z"/></g>
  <path d="M0 830Q200 800 400 830V900H0z" fill="#1a0204"/>${em('🧧',200,870,34)}`),
 tiger:()=>W(`<circle cx="300" cy="130" r="80" fill="#fff6c0" opacity=".12"/><circle cx="300" cy="130" r="40" fill="#fff8d8"/>${stars(30,300,'#d0ffb0')}
  ${leaf(10,120,30,1.2,'#1f6a2a')}${leaf(390,180,150,1.1,'#2a7a30')}${leaf(-10,420,-20,1.3,'#165a20')}${leaf(410,480,200,1.2,'#1f6a2a')}
  <path d="M0 780Q200 740 400 780V900H0z" fill="#0f3a14"/>${leaf(40,820,-40,1.4,'#2a8a3a')}${leaf(360,830,220,1.4,'#2a8a3a')}${leaf(200,890,0,1.6,'#1f6a2a')}${em('🌺',70,770,34)}${em('🌺',340,760,30)}`),
 ocean:()=>W(`${Array.from({length:6},(_,i)=>`<polygon class="beam" points="${30+i*70},0 ${70+i*70},0 ${i*70-60},900 ${i*70-120},900" fill="#fff" opacity=".05" style="animation-duration:${8+i}s"/>`).join('')}
  <path d="M0 800Q200 770 400 805V900H0z" fill="#e6c88a"/><path d="M0 840Q200 820 400 845V900H0z" fill="#c8a060"/>
  ${[20,60,330,370].map((x,i)=>`<path class="sway2" d="M${x} 830q-14-40 0-80t0-80t0-80" stroke="#2aa860" stroke-width="10" fill="none" stroke-linecap="round" style="animation-delay:-${i}s"/>`).join('')}
  ${em('🪸',120,830,44)}${em('🐚',290,860,30)}${em('⭐',230,880,26)}${em('🐠',80,200,34,'')}${em('🐟',320,300,28)}`)
};
const D={
 egypt:{m:'🐫',pl:['🏺','💰'],pr:['⚱️','🪙'],orn:['🪲','🪲'],fx:['✦','twk',12,'#ffd34d'],
  win:['황금이다!','사막의 보물!','한 번 더!'],big:['파라오의 축복!!','부자 됐다!!'],lose:['모래바람이…','다음엔 꼭!'],idle:['낙타도 돈 좋아해','피라미드 가자!']},
 buffalo:{m:'🦬',pl:['🌵','🪶'],pr:['🔥','🪙'],orn:['🦅','🌵'],fx:['•','rise',14,'#ffb03a'],
  win:['음머어!','달려라!','좋았어!'],big:['천둥이다!!','대평원의 왕!!'],lose:['흠…','한 번 더 달려!'],idle:['우다다다','들소 파워!']},
 lucky:{m:'🐰',pl:['🎩','🍀'],pr:['🎲','💰'],orn:['🍀','💎'],fx:['🪙','fall',8],
  win:['럭키!','777 가자!','찰칭~'],big:['잭팟이다!!','오늘 운 미쳤다!!'],lose:['아깝다~','다음 판 777!'],idle:['토끼발 행운 줄게','한 판 돌려!']},
 panda:{m:'🐼',pl:['🎋','🥟'],pr:['🍵','🍡'],orn:['🏮','🏮'],fx:['🌸','fall',10],
  win:['냠냠 맛있다!','딤섬 한 판 더!','최고야!'],big:['배불러 죽겠다!!','딤섬 파티!!'],lose:['배고파…','대나무나 먹자'],idle:['냠냠','판다 안아줘']},
 piggy:{m:'🐷',pl:['🐔','🌾'],pr:['🐄','🪙'],orn:['🌻','🌻'],fx:['🦋','fly',4],
  win:['꿀꿀!','저금통 채우자!','동전 냠!'],big:['돼지 부자다!!','꿀꿀꿀꿀!!'],lose:['꿀…','괜찮아 또 하면 돼'],idle:['꿀꿀','돼지 저금통 출동!']},
 dragon:{m:'🐉',pl:['🏮','🧧'],pr:['💰','🪙'],orn:['🏮','🏮'],fx:['🧧','fall',6],
  win:['용의 기운!','복 받아라!','불꽃 당첨!'],big:['용이 승천한다!!','대박 복권!!'],lose:['크르릉…','용은 포기 안 해'],idle:['불 뿜어줄까?','복 많이 받아']},
 tiger:{m:'🐯',pl:['🌴','🦜'],pr:['🍌','🪙'],orn:['🌺','🌺'],fx:['•','twk',14,'#d8ff6a'],
  win:['어흥!','정글의 왕!','좋았어!'],big:['황금 호랑이다!!','어흐으응!!'],lose:['크앙…','다시 사냥 간다'],idle:['어흥','정글 탐험 가자']},
 ocean:{m:'🐙',pl:['🐠','🐚'],pr:['💎','🦀'],orn:['🐚','⭐'],fx:['○','rise',16,'#cff6ff'],
  win:['보글보글!','진주 찾았다!','물 좋다!'],big:['바다 보물이다!!','문어발 대박!!'],lose:['뽀글…','다시 잠수!'],idle:['먹물 조심','보글보글']}
};
function fx([ch,mode,n,col]){
 return `<div class="pfx">${Array.from({length:n},(_,i)=>{
  const x=R(0,96).toFixed(1)+'vw',d=(mode==='twk'?R(2,5):mode==='fly'?R(14,24):R(8,16)).toFixed(1)+'s',dl=(-R(0,16)).toFixed(1)+'s';
  const a=mode==='twk'?'twk':mode==='fly'?'flyx':mode;const y=(mode==='twk'?R(4,90):R(10,70)).toFixed(0)+'vh';
  const sz=(ch==='•'||ch==='✦'||ch==='○'?R(8,18):R(16,30)).toFixed(0)+'px';
  return `<span style="--x:${mode==='fly'?'0':x};--d:${d};--dl:${dl};--a:${a};--s:${sz};--y:${y};${col?`color:${col};`:''}${mode==='fly'?`top:0;`:''}">${ch}</span>`}).join('')}</div>`;
}
return {
 svg:id=>SC[id]?SC[id]():'<svg viewBox="0 0 10 10"></svg>',
 fx:id=>{const f=D[id].fx.slice();f[2]=Math.max(3,Math.round(f[2]*.7));return fx(f)},
 get:id=>D[id]
};
})();
