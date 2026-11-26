const AUDIO=(()=>{
let ac=null,bgmG,sfxG,comp,noiseBuf;
const st={bgm:true,sfx:true};
function init(){
 if(ac){if(ac.state==='suspended')ac.resume().catch(()=>{});return ac}
 try{ac=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return null}
 comp=ac.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=4;
 const m=ac.createGain();m.gain.value=.9;comp.connect(m).connect(ac.destination);
 bgmG=ac.createGain();bgmG.gain.value=st.bgm?.3:0;bgmG.connect(comp);
 sfxG=ac.createGain();sfxG.gain.value=st.sfx?1:0;sfxG.connect(comp);
 noiseBuf=ac.createBuffer(1,ac.sampleRate*.6,ac.sampleRate);const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 return ac;
}
const mf=m=>440*2**((m-69)/12);
function osc(dest,{f,f2,t,d,type='square',v=.1,a=.005,cut=0,q=1}){
 const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+d);
 let n=o;if(cut){const fl=ac.createBiquadFilter();fl.type='lowpass';fl.frequency.value=cut;fl.Q.value=q;o.connect(fl);n=fl}
 n.connect(g).connect(dest);o.start(t);o.stop(t+d+.05);
}
function noise(dest,{t,d,v=.1,type='highpass',f=6000,q=1}){
 const s=ac.createBufferSource();s.buffer=noiseBuf;const fl=ac.createBiquadFilter();fl.type=type;fl.frequency.value=f;fl.Q.value=q;
 const g=ac.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl).connect(g).connect(dest);s.start(t);s.stop(t+d+.02);
}
/* ---------- SFX ---------- */
function clinkAt(t,base,v=.05){[1,2.76,5.4,8.93].forEach((p,k)=>osc(sfxG,{f:base*p,t,d:.04+.2/(k+1),type:'sine',v:v/(k+1),a:.001}));noise(sfxG,{t,d:.015,v:v*.8,type:'highpass',f:7000})}
function tone(f,d,dl=0,type='square',v=.05,f2){if(!st.sfx||!init())return;try{osc(sfxG,{f,f2,t:ac.currentTime+dl,d,type,v:v*1.5,a:.003})}catch(e){}}
function nz(d,dl=0,v=.1,f=3000,type='bandpass'){if(!st.sfx||!init())return;try{noise(sfxG,{t:ac.currentTime+dl,d,v,type,f})}catch(e){}}
const sfx={
 click:()=>tone(700,.04,0,'square',.03),
 start:()=>{tone(220,.15,0,'sawtooth',.05,440);nz(.12,0,.06,2500)},
 stop:i=>{tone(140,.09,0,'triangle',.16,70);nz(.05,0,.05,1500)},
 scat:()=>{tone(880,.2,0,'sine',.1);tone(1320,.25,.08,'sine',.08);tone(1760,.3,.16,'sine',.06)},
 coin:()=>{tone(1568,.12,0,'square',.05);tone(2093,.2,.06,'square',.04)},
 antic:()=>{for(let i=0;i<14;i++)tone(400+i*45,.07,i*.08,'sawtooth',.025)},
 small:()=>[784,988,1175].forEach((f,i)=>tone(f,.14,i*.07,'square',.05)),
 tick:p=>tone(1200+p*900,.03,0,'square',.022),
 fan:()=>{[523,659,784,1047,784,1047,1319,1568].forEach((f,i)=>tone(f,.22,i*.11,'square',.055));[262,330,392,523].forEach((f,i)=>tone(f,.4,i*.22,'triangle',.08))},
 jp:()=>{for(let i=0;i<16;i++)tone(i%2?1047:1319,.1,i*.09,'square',.06)},
 lvl:()=>[523,784,1047,1568].forEach((f,i)=>tone(f,.18,i*.09,'triangle',.08)),
 pop:i=>{tone(500+i*60,.08,0,'sine',.1,1200+i*80);nz(.06,0,.05,4000,'highpass')},
 drop:()=>{tone(300,.06,0,'triangle',.08,160)},
 boom:()=>{tone(120,.5,0,'sine',.25,40);nz(.4,0,.2,800,'lowpass')},
 wtick:()=>{tone(1800,.02,0,'square',.03);nz(.02,0,.04,5000,'highpass')},
 oink:()=>{tone(320,.12,0,'sawtooth',.06,220);tone(300,.14,.14,'sawtooth',.06,200)},
 clink:(n=1,spread=.25,v=.05)=>{if(!st.sfx||!init())return;try{const t=ac.currentTime;for(let i=0;i<n;i++)clinkAt(t+Math.random()*spread,1700+Math.random()*2200,v)}catch(e){}},
 chaching:()=>{if(!st.sfx||!init())return;try{const t=ac.currentTime;noise(sfxG,{t,d:.09,v:.18,type:'bandpass',f:2400});clinkAt(t+.03,2600,.09);clinkAt(t+.1,3500,.08);osc(sfxG,{f:2093,t:t+.14,d:.7,type:'triangle',v:.09});osc(sfxG,{f:2637,t:t+.14,d:.7,type:'triangle',v:.07});osc(sfxG,{f:3136,t:t+.2,d:.6,type:'sine',v:.05});for(let i=0;i<8;i++)clinkAt(t+.2+Math.random()*.5,1800+Math.random()*2000,.04)}catch(e){}},
 pile:()=>{if(!st.sfx||!init())return;try{const t=ac.currentTime;for(let i=0;i<30;i++)clinkAt(t+i*.035+Math.random()*.03,1500+Math.random()*2600,.045*(1-i/40))}catch(e){}},
 drum:(d=.7)=>{for(let i=0;i<Math.round(d/.045);i++)nz(.04,i*.045,.05+i*.004,900,'bandpass')},
 lose:()=>{tone(392,.18,0,'triangle',.08);tone(330,.18,.18,'triangle',.08);tone(262,.4,.36,'triangle',.08,200)},
 flip:()=>nz(.08,0,.12,2500,'bandpass'),
 reveal:i=>{tone(660+i*70,.12,0,'triangle',.08);tone(990+i*90,.2,.06,'sine',.06)},
 moo:()=>tone(160,.5,0,'sawtooth',.04,120)
};
/* ---------- BGM ---------- */
const MAJ=[0,2,4,5,7,9,11];
const TH={
 lobby:{bpm:96,root:50,scale:MAJ,chords:[[0,4,7,11],[-3,0,4,7],[2,5,9,12],[-5,-1,2,5]],swing:.2,
  lead:{wave:'triangle',rh:'x..x..x.x...x.x.',v:.08,oct:12},bass:{wave:'triangle',pat:'x...x...x...x...',mode:'walk',v:.2},pad:{wave:'sine',v:.04},
  dr:{k:'x.......x.......',s:'....x.......x...',h:'x.x.x.x.x.x.x.x.',hv:.02}},
 egypt:{bpm:104,root:50,scale:[0,1,4,5,7,8,10],chords:[[0,4,7],[1,5,8],[0,4,7],[-2,1,5]],
  lead:{wave:'sawtooth',rh:'x.xx..x.x.xx.x..',v:.05,cut:2400,oct:12},bass:{wave:'triangle',pat:'x..x..x.x..x..x.',mode:'root',v:.22},pad:{wave:'sawtooth',v:.018,cut:800},
  dr:{k:'x..x....x..x....',s:'....x.......x..x',t:'......x.......x.',h:'..x...x...x...x.',hv:.03}},
 buffalo:{bpm:120,root:52,scale:[0,3,5,7,10],chords:[[0,3,7],[-2,2,5],[-4,0,3],[-2,2,5]],
  lead:{wave:'square',rh:'x...x.x.x...xx..',v:.045,cut:2600,oct:12},bass:{wave:'sawtooth',pat:'x.x.x.x.x.x.x.x.',mode:'root',v:.13,cut:500},
  dr:{k:'x...x...x...x...',t:'..x..x.x..x..xx.',s:'....x.......x...',h:'x.xxx.xxx.xxx.xx',hv:.018}},
 lucky:{bpm:148,root:48,scale:MAJ,chords:[[0,4,7],[-3,0,4],[5,9,12],[7,11,14]],swing:.22,
  lead:{wave:'square',rh:'x.xxx.x.x.x.xxx.',v:.045,cut:4200,oct:12},bass:{wave:'triangle',pat:'x.x.x.x.x.x.x.x.',mode:'walk',v:.2},
  dr:{k:'x.......x.......',s:'....x.......x...',h:'x.x.x.x.x.x.x.x.',hv:.028}},
 panda:{bpm:112,root:55,scale:[0,2,4,7,9],chords:[[0,4,7],[-3,0,4],[-7,-3,0],[-5,-1,2]],arp:true,
  lead:{wave:'sine',rh:'x.x.xx.x..x.x.x.',v:.11,oct:24},bass:{wave:'sine',pat:'x.....x.x.......',mode:'root',v:.26},pad:{wave:'triangle',v:.025},
  dr:{k:'x.....x...x.....',s:'....x.......x...',h:'..x...x...x...x.',hv:.02,wb:'x..x..x...x.x...'}},
 dragon:{bpm:100,root:50,scale:[0,2,4,7,9],chords:[[0,4,7],[-3,0,4],[2,7,9],[-5,0,4]],
  lead:{wave:'triangle',rh:'x..xx.x.x..x.xx.',v:.09,oct:24},bass:{wave:'triangle',pat:'x.......x...x...',mode:'root',v:.24},pad:{wave:'sawtooth',v:.015,cut:700},
  dr:{k:'x.......x.x.....',t:'....x..x....x.xx',s:'',h:'..x...x...x...x.',hv:.02,wb:'x...x...x...x.x.'}},
 tiger:{bpm:116,root:45,scale:[0,2,3,5,7,8,10],chords:[[0,3,7],[-4,0,3],[-2,2,5],[-5,-2,2]],
  lead:{wave:'sawtooth',rh:'x..x..x...x.x...',v:.045,cut:1800,oct:12},bass:{wave:'sawtooth',pat:'x..x..x.x..x..x.',mode:'root',v:.14,cut:450},pad:{wave:'triangle',v:.025},
  dr:{k:'x..x..x...x..x..',t:'..x...x..x...xx.',s:'....x.......x...',h:'x.x.x.x.x.x.x.x.',hv:.015}},
 ocean:{bpm:92,root:52,scale:[0,2,4,7,9,11],chords:[[0,4,7,11],[-3,0,4,7],[5,9,12,16],[7,11,14,17]],arp:true,
  lead:{wave:'sine',rh:'x...x.x...x...x.',v:.1,oct:24},bass:{wave:'sine',pat:'x.......x.....x.',mode:'root',v:.26},pad:{wave:'sine',v:.05},
  dr:{k:'x.........x.....',s:'',h:'....x.......x...',hv:.015}},
 piggy:{bpm:130,root:53,scale:MAJ,chords:[[0,4,7],[5,9,12],[7,11,14],[0,4,7]],
  lead:{wave:'square',rh:'x.x.xxx.x.x.x...',v:.045,cut:3600,oct:12},bass:{wave:'triangle',pat:'x...x...x...x...',mode:'oompah',v:.22},
  dr:{k:'x...x...x...x...',h:'',hv:0,wb:'..x...x...x...x.'}}
};
function rng(seed){let a=seed;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function build(th,name){
 const R=rng([...name].reduce((a,c)=>a*31+c.charCodeAt(0),7));
 const sc=th.scale,deg=i=>{const o=Math.floor(i/sc.length);return sc[((i%sc.length)+sc.length)%sc.length]+12*o};
 const bars=8,mel=[];let cur=sc.length*1+2;
 for(let b=0;b<bars;b++){
  const ch=th.chords[b%4].map(x=>((x%12)+12)%12);
  const rh=[...th.lead.rh].map(c=>b>=4&&R()<.2?(c==='x'?'.':'x'):c);
  const notes=[];
  rh.forEach((c,i)=>{if(c!=='x')return;
   if(i%4===0){let best=cur,bd=99;for(let k=cur-4;k<=cur+4;k++){if(ch.includes(((deg(k)%12)+12)%12)&&Math.abs(k-cur)<bd){bd=Math.abs(k-cur);best=k}}cur=best}
   else{cur+=[-2,-1,-1,1,1,2][Math.floor(R()*6)]}
   cur=Math.max(sc.length-2,Math.min(sc.length*2+3,cur));
   notes.push([i,deg(cur)]);
  });
  notes.forEach((n,k)=>{const nx=notes[k+1]?notes[k+1][0]:16;n.push(Math.min(4,nx-n[0]))});
  if(b%4===3&&notes.length){const l=notes[notes.length-1];l[2]=Math.max(l[2],3)}
  mel.push(notes);
 }
 return {th,bars,mel};
}
let cur=null,song=null,step=0,nextT=0,timer=0,intense=false;
function drum(type,t,v=1){
 if(type==='k')osc(bgmG,{f:150,f2:42,t,d:.2,type:'sine',v:.5*v,a:.002});
 else if(type==='s'){noise(bgmG,{t,d:.14,v:.16*v,type:'bandpass',f:1800,q:.8});osc(bgmG,{f:200,t,d:.07,type:'triangle',v:.1*v})}
 else if(type==='t')osc(bgmG,{f:220,f2:95,t,d:.25,type:'sine',v:.32*v,a:.003});
 else if(type==='h')noise(bgmG,{t,d:.04,v:v,type:'highpass',f:8000});
 else if(type==='wb')osc(bgmG,{f:1000,t,d:.05,type:'sine',v:.12*v,a:.001});
}
function playStep(sIdx,t,sp){
 const th=song.th,b=Math.floor(sIdx/16),i=sIdx%16,root=th.root+(intense?2:0);
 const chord=th.chords[b%4],dr=th.dr;
 if(dr.k&&dr.k[i]==='x'||intense&&i%4===0)drum('k',t);
 if(dr.s&&dr.s[i]==='x')drum('s',t);
 if(dr.t&&dr.t[i]==='x')drum('t',t);
 if(dr.wb&&dr.wb[i]==='x')drum('wb',t);
 if((dr.h&&dr.h[i]==='x'&&dr.hv)||(intense&&i%2===1))drum('h',t,dr.hv||.025);
 const B=th.bass;
 if(B.mode==='oompah'){
  if(i%8===0)osc(bgmG,{f:mf(root-12+chord[0]),t,d:sp*3,type:B.wave,v:B.v});
  if(i%8===4)osc(bgmG,{f:mf(root-12+chord[2]-12),t,d:sp*3,type:B.wave,v:B.v});
  if(i%4===2)chord.forEach(n=>osc(bgmG,{f:mf(root+n),t,d:sp*1.2,type:'square',v:.025,cut:2000}));
 }else if(B.pat[i]==='x'){
  let n=chord[0];
  if(B.mode==='walk'){const nx=th.chords[(b+1)%4][0];const k=Math.floor(i/4);n=[chord[0],chord[1],chord[2],nx-1][k]}
  osc(bgmG,{f:mf(root-12+n),t,d:sp*(B.mode==='walk'?3.6:1.8),type:B.wave,v:B.v,cut:B.cut||0});
 }
 if(th.pad&&i===0)chord.forEach(n=>osc(bgmG,{f:mf(root+n),t,d:sp*16,type:th.pad.wave,v:th.pad.v,a:sp*4,cut:th.pad.cut||0}));
 if(th.arp&&i%2===0){const n=chord[(i/2)%chord.length];osc(bgmG,{f:mf(root+24+n),t,d:sp*1.5,type:'triangle',v:.03})}
 const L=th.lead;
 for(const n of song.mel[b])if(n[0]===i)osc(bgmG,{f:mf(root+L.oct+n[1]),t,d:sp*n[2]*.95,type:L.wave,v:L.v,a:.01,cut:L.cut||0});
}
function sched(){
 if(!ac||!song||ac.state!=='running')return;
 const th=song.th,sp=60/(th.bpm*(intense?1.12:1))/4;
 if(nextT<ac.currentTime)nextT=ac.currentTime+.03;
 while(nextT<ac.currentTime+.15){
  if(st.bgm)try{playStep(step,nextT,sp)}catch(e){}
  const sw=th.swing?(step%2===0?th.swing:-th.swing):0;
  nextT+=sp*(1+sw);step=(step+1)%(16*song.bars);
 }
}
function play(name){if(cur===name&&timer)return;stop();cur=name;song=build(TH[name],name);intense=false;init();step=0;nextT=ac?ac.currentTime+.1:0;timer=setInterval(sched,25)}
function stop(){clearInterval(timer);timer=0}
function setIntense(v){intense=v}
function set(k,v){st[k]=v;if(!ac)return;if(k==='bgm')bgmG.gain.setTargetAtTime(v?.3:0,ac.currentTime,.05);if(k==='sfx')sfxG.gain.value=v?1:0}
function duck(on){if(ac&&st.bgm)bgmG.gain.setTargetAtTime(on?.12:.3,ac.currentTime,.1)}
document.addEventListener('visibilitychange',()=>{if(!ac)return;if(document.hidden)ac.suspend().catch(()=>{});else ac.resume().catch(()=>{})});
['pointerdown','keydown'].forEach(ev=>document.addEventListener(ev,()=>init(),{passive:true}));
return {init,sfx,tone,play,stop,setIntense,set,st,duck};
})();
