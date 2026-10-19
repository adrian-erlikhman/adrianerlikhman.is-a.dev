/* adrianerlikhman.is-a.dev: every page's scripts. Each block checks its elements exist, so a page
   without an overlay or section just skips it. Bump ?v= on each page's <script> when this changes. */
/* land at the top on a plain load (never a restored scroll position), but honor a
   #section link from another page: skip the intro and go straight to the section */
const HASH_TARGET=(()=>{try{return location.hash.length>1&&document.getElementById(decodeURIComponent(location.hash.slice(1)));}catch(e){return null;}})();
if('scrollRestoration' in history) history.scrollRestoration='manual';
const landOnTarget=()=>HASH_TARGET.scrollIntoView({behavior:'instant',block:'start'});
if(HASH_TARGET){ addEventListener('load',landOnTarget); }
else { window.scrollTo(0,0); addEventListener('load',()=>window.scrollTo(0,0)); }
/* custom crosshair cursor + magnetic buttons removed — normal pointer, far calmer */
/* background connector lines + traveling pulse */
(function(){
  const svg=document.querySelector('.bg-lines'); if(!svg) return;
  function build(){
    const w=innerWidth,h=innerHeight;svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
    const stroke=getComputedStyle(document.documentElement).getPropertyValue('--line').trim();
    const acc=getComputedStyle(document.documentElement).getPropertyValue('--acc').trim();
    svg.innerHTML='';
    [[0.12,0,0.12,1],[0.88,0,0.72,1],[0,0.68,1,0.5]].forEach(p=>{const l=document.createElementNS('http://www.w3.org/2000/svg','line');
      l.setAttribute('x1',p[0]*w);l.setAttribute('y1',p[1]*h);l.setAttribute('x2',p[2]*w);l.setAttribute('y2',p[3]*h);
      l.setAttribute('stroke',stroke);l.setAttribute('stroke-width','1');svg.appendChild(l);});
  }
  build();addEventListener('resize',build);window.__rebuildLines=build;
})();
/* hero intro */
function playHero(){document.querySelectorAll('.hero h1 .ln').forEach((l,i)=>setTimeout(()=>l.classList.add('go'),140+i*140));}
addEventListener('load',playHero);setTimeout(playHero,900);
/* reveal + meters + counters. A block shows as soon as its top is on screen (not once 16% of it is:
   a 4,000px block on a phone stayed blank for a whole screen), and counters run only with motion on. */
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;
const io=new IntersectionObserver(es=>{es.forEach(en=>{if(!en.isIntersecting)return;
  en.target.classList.add('in');
  en.target.querySelectorAll('.meter i').forEach(b=>b.style.width=b.dataset.w+'%');
  if(!REDUCED) en.target.querySelectorAll('[data-count]').forEach(c=>{const t=+c.dataset.count,t0=performance.now();
    (function s(n){const p=Math.min((n-t0)/1300,1);c.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(s)})(t0);});
  io.unobserve(en.target);});},{threshold:0,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
/* progress bar */
const tb=document.getElementById('topbar');
if(tb) addEventListener('scroll',()=>{const h=document.documentElement;tb.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100+'%';},{passive:true});
/* year */
{const yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();}
/* footer piste: an épée pool bout to 5 against a grey opponent. Each click plays one action by either fencer:
   lunge to the chest, wrist, mask or foot, flèche, parry-riposte, stop-hit, beat-lunge, or a double (no right
   of way in épée, so both score, except at 4-4, where it's annulled). Both fencers are one jointed skeleton
   (the opponent mirrored at x=130), posed by keyframes. Score and lamps change at the moment of the hit.
   The bout and the W-L record live in localStorage when they can. */
(function(){
  const P=document.getElementById('piste'),go=document.getElementById('pstGo'),say=document.getElementById('pstSay');
  if(!P||!go) return;
  const $=id=>document.getElementById(id),aEl=$('pstA'),bEl=$('pstB'),wEl=$('pstW'),lEl=$('pstL');
  const svg=P.querySelector('.pst-svg'),W=130;
  const fig=k=>{const g=P.querySelector('.pst-'+k);return{g,bd:g.querySelector('.pst-bd'),hd:g.querySelector('.pst-hd'),bl:g.querySelector('.pst-blade'),sp:g.querySelector('.pst-spark'),mx:k==='op'};};
  const ME=fig('me'),OP=fig('op');
  /* a pose is 13 joints facing right, ground at y=38, then opacity:
     head neck hip backKnee backFoot frontKnee frontFoot shoulder elbow hand tip rearElbow rearHand */
  const J={head:0,neck:1,hip:2,bk:3,bf:4,fk:5,ff:6,sh:7,se:8,hand:9,tip:10,oe:11,oh:12};
  const mk=(s,o=1)=>s.trim().split(/[\s,]+/).map(Number).concat(o);
  const ov=(p,c)=>{const q=p.slice();for(const k in c){if(k==='o')q[26]=c.o;else{q[J[k]*2]=c[k][0];q[J[k]*2+1]=c[k][1];}}return q;};
  const T=(p,dx,dy=0)=>p.map((v,i)=>i===26?v:i%2?v+dy:v+dx);
  const G=mk('30,8 30,12 28,24 22,31 20,38 35,30 36,38 30,15 37,18 42,16 67,11 24,11 22,6');
  const EXT=ov(G,{head:[31,8],se:[40,15],hand:[48,14],tip:[76,12]});            // arm first, then the legs
  const EXTL=ov(G,{head:[31,9],se:[39,19],hand:[46,21],tip:[72,31]});           // arm first, aimed low
  const LUNGE=mk('57,12 56,16 50,26 41,32 33,38 62,29 64,38 56,18 63,17 69,16 99,15 46,23 40,26');
  const WRIST=mk('47,11 46,15 41,25 33,32 26,38 51,30 53,38 46,17 52,17 58,17 86,16 37,21 32,22');
  const MASK=ov(LUNGE,{se:[62,16],hand:[68,14],tip:[96,9]});
  const FOOT=mk('58,15 56,19 49,27 40,33 32,38 62,30 64,38 56,21 61,24 66,26 92,37 46,25 40,28');
  const REC=mk('27,9 28,13 27,24 22,31 20,38 35,30 36,38 28,16 34,19 39,18 64,15 22,12 20,7');
  const REC_ARM=ov(G,{se:[33,20],hand:[37,21],tip:[61,24]});
  const REC_FOOT=ov(REC,{fk:[32,31],ff:[29,35]});
  const REC_HEAD=ov(REC,{head:[25,8]});
  // flèche: extend, fall forward off the front leg, back leg crosses, hit in the air, run past, reset
  const F1=mk('36,9 35,13 30,24 23,31 21,38 37,30 38,38 35,16 42,15 49,14 77,13 28,14 24,12');
  const F2=mk('54,12 51,15 44,24 52,28 51,35 41,31 38,38 51,17 58,16 64,15 92,14 45,21 40,23');
  const F3=mk('63,13 60,17 52,26 61,31 64,37 46,31 40,35 60,19 65,17 71,16 99,15 54,23 49,22');
  const F4=mk('82,11 81,15 78,26 84,31 88,38 72,31 67,36 81,17 86,21 89,24 115,33 76,20 72,23');
  const F5=ov(T(F4,18),{o:0}),G0=ov(G,{o:0});
  // parry-riposte: their lunge falls short, the blade is taken and lifted, the riposte lands while they're still down
  const LS=T(LUNGE,-6),DEFL=ov(LS,{tip:[89,2]});
  const PARRY=ov(G,{se:[37,17],hand:[44,17],tip:[66,5]});
  const RIP=mk('33,8 33,12 30,24 23,31 21,38 37,30 38,38 33,15 42,16 51,17 80,18 26,12 23,8');
  // stop-hit: they step in with a bent arm, the point meets their hand
  const ADV=T(G,9),ADV_R=ov(ADV,{se:[42,20],hand:[46,21],tip:[70,24]});
  const STOP=ov(G,{head:[31,8],se:[40,15],hand:[51,16],tip:[78,16]});
  // beat: knock their blade down, then lunge
  const BEAT=ov(G,{se:[37,17],hand:[43,16],tip:[66,17]}),BEATEN=ov(G,{tip:[65,22]});
  const DBL=T(LUNGE,-13);
  /* each action: s = scorer's track, o = the other's, [time 0-1, pose]; hit = when the point lands */
  const lunge=(x,pre,rec)=>({dur:950,hit:.42,s:[[0,G],[.18,pre],[.42,x],[.74,x],[1,G]],o:[[0,G],[.42,G],[.52,rec],[.76,rec],[1,G]]});
  const A={
    chest:lunge(LUNGE,EXT,REC),
    mask:lunge(MASK,EXT,REC_HEAD),
    foot:lunge(FOOT,EXTL,REC_FOOT),
    wrist:{dur:850,hit:.36,s:[[0,G],[.14,EXT],[.36,WRIST],[.7,WRIST],[1,G]],o:[[0,G],[.36,G],[.46,REC_ARM],[.74,REC_ARM],[1,G]]},
    fleche:{dur:1400,hit:.36,s:[[0,G],[.12,F1],[.25,F2],[.36,F3],[.52,F4],[.66,F5],[.67,G0],[.9,G],[1,G]],o:[[0,G],[.36,G],[.46,REC],[.72,REC],[1,G]]},
    parry:{dur:1250,hit:.54,s:[[0,G],[.3,G],[.4,PARRY],[.54,RIP],[.8,RIP],[1,G]],o:[[0,G],[.14,EXT],[.32,LS],[.4,DEFL],[.8,DEFL],[1,G]]},
    stop:{dur:1000,hit:.42,s:[[0,G],[.3,G],[.42,STOP],[.74,STOP],[1,G]],o:[[0,G],[.32,ADV],[.42,ADV],[.52,ADV_R],[.78,ADV_R],[1,G]]},
    beat:{dur:1100,hit:.46,s:[[0,G],[.12,BEAT],[.22,EXT],[.46,LUNGE],[.76,LUNGE],[1,G]],o:[[0,G],[.12,G],[.18,BEATEN],[.46,BEATEN],[.56,REC],[.78,REC],[1,G]]},
    double:{dur:950,hit:.42,s:[[0,G],[.18,EXT],[.42,DBL],[.74,DBL],[1,G]],o:[[0,G],[.18,EXT],[.42,DBL],[.74,DBL],[1,G]]}
  };
  const SAY={
    chest:[['touché! lunge to the chest','straight lunge. clean'],['their lunge, to your chest','they lunged. you were late']],
    mask:[['right on the mask','to the mask. bold'],['they hit your mask','to the mask. rude']],
    foot:[['toe touch!','foot touch. never saw it coming'],['they took your foot','toe touch. watch the foot']],
    wrist:[['straight to the wrist','wrist touch. surgical'],['they took your wrist','hit on the wrist']],
    fleche:[['flèche! ran right past','flèche. all gas'],['their flèche. ran you over','flèche. too fast']],
    parry:[['parry, riposte','parried it. riposte home'],['you got parried. riposte','they parried and riposted']],
    stop:[['stop-hit to the arm','counter-attack. clean'],['stop-hit on your prep','caught on your prep']],
    beat:[['beat, then lunge','beat the blade, then in'],['they beat your blade','beat-attack. got you']]
  };
  const KINDS=['chest','mask','foot','foot','wrist','fleche','fleche','parry','stop','beat'];
  const ease=x=>x*x*(3-2*x);
  const at=(tr,t)=>{let i=1;while(i<tr.length-1&&tr[i][0]<t)i++;const[t0,a]=tr[i-1],[t1,b]=tr[i];
    const u=t1>t0?ease(Math.min(Math.max((t-t0)/(t1-t0),0),1)):1;return a.map((v,k)=>v+(b[k]-v)*u);};
  const draw=(F,p)=>{
    const X=k=>(F.mx?W-p[J[k]*2]:p[J[k]*2]).toFixed(1),Y=k=>p[J[k]*2+1].toFixed(1),pt=k=>X(k)+' '+Y(k);
    F.bd.setAttribute('d',`M${pt('neck')} ${pt('hip')}M${pt('hip')} ${pt('bk')} ${pt('bf')}M${pt('hip')} ${pt('fk')} ${pt('ff')}M${pt('sh')} ${pt('se')} ${pt('hand')}M${pt('sh')} ${pt('oe')} ${pt('oh')}`);
    F.hd.setAttribute('cx',X('head'));F.hd.setAttribute('cy',Y('head'));
    F.bl.setAttribute('d',`M${pt('hand')} ${pt('tip')}`);
    F.g.style.opacity=p[26];
  };
  const spark=(F,p,age)=>{
    if(age<0||age>320){F.sp.style.opacity=0;return;}
    const k=age/320;F.sp.setAttribute('cx',F.mx?W-p[20]:p[20]);F.sp.setAttribute('cy',p[21]);
    F.sp.setAttribute('r',(1.5+k*3).toFixed(2));F.sp.style.opacity=(1-k).toFixed(2);
  };
  draw(ME,G);draw(OP,G);
  P.hidden=false;
  let s={a:0,b:0,w:0,l:0}; try{Object.assign(s,JSON.parse(localStorage.getItem('ae_bout'))||{});}catch(e){}
  const TO=5,save=()=>{try{localStorage.setItem('ae_bout',JSON.stringify(s));}catch(e){}};
  const show=()=>{aEl.textContent=s.a;bEl.textContent=s.b;wEl.textContent=s.w;lEl.textContent=s.l;};
  show();
  const pick=(arr,k)=>{let i;do{i=Math.floor(Math.random()*arr.length);}while(arr.length>1&&i===pick[k]);pick[k]=i;return arr[i];};
  let busy=false,lampT,done=s.a>=TO||s.b>=TO;
  /* score the touch and light the lamps at the moment the point lands */
  const land=(kind,side)=>{
    let line;
    if(side==='dbl'&&s.a===TO-1&&s.b===TO-1) line='double at 4-4. annulled, fence on';
    else if(side==='dbl'){s.a++;s.b++;line='double touch. both lights';}
    else if(side==='me'){s.a++;line=pick(SAY[kind][0],'m');}
    else{s.b++;line=pick(SAY[kind][1],'t');}
    if(s.a>=TO||s.b>=TO){
      done=true;
      if(s.a>s.b){s.w++;line=`V${s.a}-${s.b}. bout won`;}
      else{s.l++;line=`D${s.a}-${s.b}. bout lost. click for another`;}
    }
    save();show();say.textContent=line;
    P.classList.remove('me','op'); say.classList.remove('pop'); void P.offsetWidth;
    if(side!=='op') P.classList.add('me'); if(side!=='me') P.classList.add('op'); say.classList.add('pop');
    clearTimeout(lampT); lampT=setTimeout(()=>P.classList.remove('me','op'),side==='dbl'?800:650);
  };
  const play=(kind,side)=>{
    const r=Math.random();
    side=side||(r<.55?'me':r<.87?'op':'dbl');
    kind=side==='dbl'?'double':kind||pick(KINDS,'k');
    const act=A[kind],sc=side==='op'?OP:ME,ot=sc===ME?OP:ME;
    svg.appendChild(sc.g);                                             // the scorer is drawn on top
    const trS=act.s,trO=act.o,both=side==='dbl';
    if(REDUCED){draw(sc,at(trS,act.hit));draw(ot,at(trO,act.hit));land(kind,side);
      setTimeout(()=>{draw(ME,G);draw(OP,G);},700);return;}
    // timers own the score and the end, so a throttled tab can't stall the bout; frames only draw
    busy=true;const t0=performance.now(),hitMs=act.hit*act.dur;let over=false;
    setTimeout(()=>land(kind,side),hitMs);
    setTimeout(()=>{over=true;busy=false;draw(ME,G);draw(OP,G);ME.sp.style.opacity=OP.sp.style.opacity=0;},act.dur);
    (function step(now){
      if(over) return;
      const ms=now-t0,t=Math.min(ms/act.dur,1),pS=at(trS,t),pO=at(trO,t);
      draw(sc,pS);draw(ot,pO);spark(sc,pS,ms-hitMs);spark(ot,pO,both?ms-hitMs:-1);
      requestAnimationFrame(step);
    })(t0);
  };
  go.addEventListener('click',()=>{
    if(busy) return;
    if(done){s.a=s.b=0;done=false;save();show();P.classList.remove('me','op');say.textContent='new bout. en garde';return;}
    play();
  });
})();
{const top=document.getElementById('ftTop'); if(top) top.addEventListener('click',()=>scrollTo({top:0,behavior:REDUCED?'auto':'smooth'}));}

/* ================= TICKER TAPE ================= */
(function(){
  const items=[['PYTHON','▲'],['PYTORCH','▲'],['TENSORFLOW','▲'],['SCIKIT-LEARN','▲'],
    ['PANDAS','▲'],['NUMPY','▲'],['FINBERT','▲'],['LSTM','▲'],['HMM','▲'],['NLP','▲'],
    ['SQL','▲'],['A-RATED ÉPÉE','▲']];
  const track=document.getElementById('tickTrack');
  if(track){const h=items.map(([a,b])=>`<span><b>${a}</b><i>${b}</i></span>`).join('');track.innerHTML=h+h;}
})();

/* ================= HERO TYPEWRITER ================= */
(function(){
  const el=document.getElementById('roleTyp'); if(!el) return;
  const items=[
    "a co-first-author nlp paper accepted at ieee bigdata 2026",
    "a software and ml internship at firstness, working directly under the founder",
    "a vc internship working with early-stage b2b and saas companies",
    "an ai summit for 500+ la students, with google deepmind and microsoft on stage",
    "a student panel on ai at the national consortium of stem schools",
    "an ai/ml course now piloting across lausd"
  ];
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){ el.textContent=items[0]; return; }
  let i=0, ch=0, deleting=false;
  function tick(){
    const w=items[i];
    if(!deleting){
      ch++; el.textContent=w.slice(0,ch);
      if(ch>=w.length){ deleting=true; return setTimeout(tick,2100); }
    } else {
      ch--; el.textContent=w.slice(0,ch);
      if(ch<=0){ deleting=false; i=(i+1)%items.length; return setTimeout(tick,360); }
    }
    setTimeout(tick, deleting? 22 : 42 + Math.random()*40);
  }
  setTimeout(tick, 700);
})();

/* ================= OFF THE LAPTOP — a topo card that opens the photo viewer ================= */
(function(){
  const box=document.getElementById('offclock'); if(!box) return;
  const card=box.querySelector('.oc-card'), panel=document.getElementById('ocPanel'); if(!card||!panel) return;
  const svg=box.querySelector('.oc-topo'), lbl=box.querySelector('.oc-lbl');
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  box.classList.add('oc-ready'); panel.inert=true;
  /* nine contour rings around the peak, wobbled by three sines; they drift slowly, faster on hover */
  if(svg){
    const NS='http://www.w3.org/2000/svg', pk=svg.querySelector('.pk');
    const rings=[...Array(9)].map((_,k)=>{ const p=document.createElementNS(NS,'path'); p.setAttribute('class','c'+(k%3===2?' idx':'')); svg.insertBefore(p,pk); return p; });
    const nz=(a,k,t)=>Math.sin(a*3+k*.7+t)*.10+Math.sin(a*5-k*.4-t*.7)*.06+Math.sin(a*2+k*1.3+t*.4)*.08;
    const draw=t=>rings.forEach((p,k)=>{ const R=14+k*17; let d='';
      for(let i=0;i<=72;i++){ const a=i/72*Math.PI*2, r=R*(1+nz(a,k,t)); d+=(i?'L':'M')+(170+Math.cos(a)*r*1.35).toFixed(1)+','+(92+Math.sin(a)*r).toFixed(1); }
      p.setAttribute('d',d+'Z'); });
    let t=0, speed=.004, vis=false, raf=0;
    const loop=()=>{ t+=speed; draw(t); raf=vis?requestAnimationFrame(loop):0; };
    draw(t);
    if(!RM){
      new IntersectionObserver(e=>{ vis=e[0].isIntersecting; if(vis&&!raf) raf=requestAnimationFrame(loop); }).observe(svg);
      card.addEventListener('mouseenter',()=>speed=.014); card.addEventListener('mouseleave',()=>speed=.004);
    }
  }
  const toggle=()=>{ const o=!panel.classList.contains('open');
    panel.classList.toggle('open',o); panel.inert=!o; card.setAttribute('aria-expanded',o?'true':'false'); if(lbl) lbl.textContent=o?'close':'have a look'; };
  card.addEventListener('click',toggle);
  card.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); } });
  /* the viewer: one big frame, a numbered list, and arrows (buttons or keys) */
  const v=document.getElementById('lifeViewer'); if(!v) return;
  const imgs=[...v.querySelectorAll('.v-main img')], bs=[...v.querySelectorAll('.v-list button')], cap=v.querySelector('.vc');
  let vi=0;
  const show=i=>{ vi=(i+imgs.length)%imgs.length;
    imgs.forEach((im,k)=>im.classList.toggle('on',k===vi)); bs.forEach((b,k)=>b.setAttribute('aria-current',k===vi?'true':'false'));
    if(cap) cap.textContent=String(vi+1).padStart(2,'0')+' / '+String(imgs.length).padStart(2,'0')+' · '+bs[vi].dataset.c; };
  bs.forEach((b,k)=>b.addEventListener('click',()=>show(k)));
  const vp=v.querySelector('.vp'), vn=v.querySelector('.vn');
  if(vp) vp.addEventListener('click',()=>show(vi-1));
  if(vn) vn.addEventListener('click',()=>show(vi+1));
  v.addEventListener('keydown',e=>{ if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ e.preventDefault(); show(vi+(e.key==='ArrowRight'?1:-1)); } });
})();

/* ================= INTRO / BOOT SEQUENCE ================= */
(function(){
  const intro=document.getElementById('intro'); if(!intro) return;
  let done=false, siteDown=false;
  const showOffline=()=>{const off=document.getElementById('offline'); if(off) off.hidden=false; intro.style.display='none';};
  const finish=(instant)=>{
    if(done) return; done=true;
    if(siteDown){ showOffline(); return; }   // maintenance mode: keep locked, show offline screen
    try{sessionStorage.setItem('introSeen','1');}catch(e){}
    document.body.classList.remove('intro-lock');
    HASH_TARGET?landOnTarget():window.scrollTo(0,0);
    if(instant){intro.style.display='none';return;}
    intro.classList.add('done');
    setTimeout(()=>intro.style.display='none',820);
    document.querySelectorAll('.hero h1 .ln').forEach(l=>l.classList.remove('go'));
    setTimeout(()=>document.querySelectorAll('.hero h1 .ln').forEach((l,i)=>setTimeout(()=>l.classList.add('go'),i*140)),120);
  };
  /* on/off switch: read status.json; if live:false, show the maintenance screen */
  fetch('/status.json?t='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():null).then(d=>{
    if(d&&d.live===false){siteDown=true; if(done){showOffline();} else setTimeout(()=>finish(),900);}
  }).catch(()=>{});
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){finish(true);return;} /* plays on every load */
  if(HASH_TARGET){finish(true);return;}   /* arrived by a #section link: no intro */

  const cvs=document.getElementById('introCanvas'),ctx=cvs.getContext('2d');
  let W,H,DPR;
  const resize=()=>{DPR=Math.min(devicePixelRatio||1,2);W=cvs.width=innerWidth*DPR;H=cvs.height=innerHeight*DPR;};
  resize();addEventListener('resize',resize);
  const css=getComputedStyle(document.documentElement);
  const hexA=(h,a)=>{h=(h||'').trim().replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;};
  const ACChex=css.getPropertyValue('--acc').trim()||'#1f3a5f';
  const INKhex=css.getPropertyValue('--ink').trim()||'#1a1c22';
  const DIMhex=css.getPropertyValue('--dim').trim()||'#5d6470';
  const ACC=ACChex, RED='#e5484d';

  const isTouch=matchMedia('(pointer:coarse)').matches;
  let mx=-1,my=-1,ready=false;
  if(!isTouch) addEventListener('mousemove',e=>{mx=e.clientX*DPR;my=e.clientY*DPR;});

  // interactive equity chart — candlesticks + close line + hover crosshair (no rain, no boot log)
  const DOWN='#9aa3b2';                 // cool gray for down-moves
  const N=60; let price=100; const candles=[];
  for(let i=0;i<N;i++){const o=price;price=Math.max(30,price+(Math.random()-0.44)*3.8);const c=price;
    candles.push({o,c,hi:Math.max(o,c)+Math.random()*1.8,lo:Math.min(o,c)-Math.random()*1.8});}
  const pmin=Math.min(...candles.map(k=>k.lo)),pmax=Math.max(...candles.map(k=>k.hi));

  const start=performance.now(),DUR=1500; let raf;
  const bar=document.getElementById('introBar'),st=document.getElementById('introStatus');
  const geo=()=>{const bx0=W*0.5-Math.min(W*0.44,560*DPR),bx1=W*0.5+Math.min(W*0.44,560*DPR),by0=H*0.6,by1=H*0.88;return {bx0,bx1,by0,by1,cw:(bx1-bx0)/N};};

  function draw(now){
    if(done) return;
    const t=now-start, p=Math.min(t/DUR,1), e=1-Math.pow(1-p,3);
    ctx.clearRect(0,0,W,H);
    const {bx0,bx1,by0,by1,cw}=geo();
    const yOf=v=>by1-((v-pmin)/(pmax-pmin))*(by1-by0);
    const shown=Math.max(1,Math.floor(e*N));
    // BARRIER: clip the tape to its own band so it can never draw over the text above
    const barrier=by0-6*DPR;
    ctx.save();
    ctx.beginPath();ctx.rect(0,barrier,W,H-barrier);ctx.clip();
    // candlesticks
    ctx.lineWidth=1*DPR;
    for(let i=0;i<shown;i++){
      const k=candles[i],cx=bx0+cw*i+cw/2,up=k.c>=k.o;
      ctx.strokeStyle=up?hexA(ACChex,.55):hexA(DOWN,.6);
      ctx.fillStyle=up?hexA(ACChex,.14):hexA(DOWN,.14);
      ctx.beginPath();ctx.moveTo(cx,yOf(k.hi));ctx.lineTo(cx,yOf(k.lo));ctx.stroke();
      const bw=Math.max(2*DPR,cw*0.5),yo=yOf(k.o),yc=yOf(k.c),bh=Math.max(1.5*DPR,Math.abs(yc-yo));
      ctx.fillRect(cx-bw/2,Math.min(yo,yc),bw,bh);ctx.strokeRect(cx-bw/2,Math.min(yo,yc),bw,bh);
    }
    // close line
    if(shown>1){
      ctx.beginPath();
      for(let i=0;i<shown;i++){const cx=bx0+cw*i+cw/2,y=yOf(candles[i].c);i?ctx.lineTo(cx,y):ctx.moveTo(cx,y);}
      ctx.strokeStyle=ACC;ctx.lineWidth=1.8*DPR;ctx.stroke();
      const fx=bx0+cw*(shown-1)+cw/2,fy=yOf(candles[shown-1].c);
      ctx.fillStyle=ACC;ctx.beginPath();ctx.arc(fx,fy,3*DPR,0,7);ctx.fill();
    }
    // interactive crosshair — active once the chart is fully drawn
    if(p>=1 && !isTouch && mx>=bx0-30*DPR && mx<=bx1+30*DPR && my>=by0-30*DPR && my<=by1+30*DPR){
      const priceAt=pmin+((by1-my)/(by1-by0))*(pmax-pmin);
      let idx=Math.round((mx-bx0-cw/2)/cw); idx=Math.max(0,Math.min(N-1,idx));
      const scx=bx0+cw*idx+cw/2, k=candles[idx];
      ctx.setLineDash([4*DPR,4*DPR]); ctx.lineWidth=1*DPR; ctx.strokeStyle=hexA(INKhex,.4);
      ctx.beginPath();ctx.moveTo(scx,by0-14*DPR);ctx.lineTo(scx,by1+14*DPR);ctx.stroke();
      ctx.beginPath();ctx.moveTo(bx0,my);ctx.lineTo(bx1,my);ctx.stroke();
      ctx.setLineDash([]);
      ctx.font=(11*DPR)+'px "IBM Plex Mono",monospace';
      const tag=priceAt.toFixed(2), tw=ctx.measureText(tag).width+16*DPR;
      ctx.fillStyle=ACC;ctx.fillRect(bx1,my-9*DPR,tw,18*DPR);
      ctx.fillStyle='#fff';ctx.fillText(tag,bx1+8*DPR,my+4*DPR);
      ctx.fillStyle=ACC;ctx.beginPath();ctx.arc(scx,yOf(k.c),4*DPR,0,7);ctx.fill();
      const chg=((k.c-k.o)/k.o*100), upC=chg>=0;
      const rows=['#'+String(idx+1).padStart(2,'0'),'O '+k.o.toFixed(2),'H '+k.hi.toFixed(2),'L '+k.lo.toFixed(2),'C '+k.c.toFixed(2),(upC?'+':'')+chg.toFixed(2)+'%'];
      const bw2=96*DPR,bh2=rows.length*15*DPR+12*DPR;
      let bxp=scx+12*DPR; if(bxp+bw2>bx1) bxp=scx-12*DPR-bw2;
      ctx.fillStyle=hexA(INKhex,.93);ctx.fillRect(bxp,by0,bw2,bh2);
      ctx.strokeStyle=hexA(ACChex,.5);ctx.lineWidth=1*DPR;ctx.strokeRect(bxp,by0,bw2,bh2);
      rows.forEach((ln,i)=>{ctx.fillStyle=i===0?ACC:(i===5?(upC?ACC:DOWN):'#eef1f5');ctx.fillText(ln,bxp+9*DPR,by0+18*DPR+i*15*DPR);});
    }
    ctx.restore();
    // subtle rust rule marking the top of the tape region (the barrier)
    ctx.strokeStyle=hexA(ACChex,.22);ctx.lineWidth=1*DPR;
    ctx.beginPath();ctx.moveTo(bx0,by0);ctx.lineTo(bx1,by0);ctx.stroke();
    if(bar) bar.style.width=(p*100)+'%';
    if(!done) raf=requestAnimationFrame(draw);
  }
  raf=requestAnimationFrame(draw);

  setTimeout(()=>{ready=true;
    if(st&&!done)st.textContent=isTouch?'tap anywhere to come in':'scrub the chart, then click anywhere to come in';},DUR+160);

  document.getElementById('skip').addEventListener('click',()=>finish(false));
  intro.addEventListener('click',()=>{if(ready)finish(false);});
  addEventListener('keydown',e=>{if(e.key==='Enter'||e.key==='Escape')finish(false);});
  setTimeout(()=>finish(false),3600); // failsafe — auto-enters if left alone
  /* crawlers and anything that never clicks must reach the content fast */
})();

/* ================= PAGE MOTION ================= */
/* section rail (wide screens): one tick per numbered section, built from the section labels */
(function(){
  const secs=[...document.querySelectorAll('main section[id]')].filter(s=>s.querySelector('.idx'));
  if(secs.length<3||!document.querySelector('.hero')) return;
  const rail=document.createElement('nav'); rail.className='rail'; rail.setAttribute('aria-label','Sections');
  rail.innerHTML=secs.map(s=>{const n=(s.querySelector('.idx').textContent.match(/\d+/)||[''])[0];
    const h=s.querySelector('h2'); const t=h?h.textContent.trim():'Contact';
    return `<a href="#${s.id}"><span class="rl">${t}</span><span class="rn">${n}</span><i></i></a>`;}).join('');
  document.body.appendChild(rail);
  const show=()=>rail.classList.toggle('on',scrollY>innerHeight*.55);
  addEventListener('scroll',show,{passive:true}); show();
})();
/* scroll-spy: light the section in view in the nav, the phone strip and the rail */
(function(){
  const links=[...document.querySelectorAll('.hud .navset a[href^="#"], .secnav a, .rail a')];
  const strip=document.querySelector('.secnav');
  const spy=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting) return;
    links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id));
    const a=strip&&strip.querySelector(`a[href="#${e.target.id}"]`);
    if(a&&strip.offsetParent) strip.scrollTo({left:a.offsetLeft-strip.clientWidth/2+a.offsetWidth/2,behavior:'smooth'});
  }),{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('section[id]').forEach(s=>spy.observe(s));
})();

/* fencing reel: a six-second muted loop, fetched when it comes near and playing only while on screen */
(function(){
  const v=document.querySelector('.reel video'); if(!v) return;
  if(REDUCED||(navigator.connection&&navigator.connection.saveData)) return;   /* the poster stays */
  let loaded=false;
  new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){ if(!loaded){ v.src=v.dataset.src; loaded=true; } const p=v.play(); if(p&&p.catch) p.catch(()=>{}); }
    else if(loaded) v.pause();
  }),{rootMargin:'200px 0px'}).observe(v);
})();

/* Hivemind film: plays muted while on screen (never under reduced motion or Save-Data); "watch with sound" and the
   chapters restart it with sound and controls; the chapter list follows the playhead. */
(function(){
  const box=document.getElementById('hmFilm'); if(!box) return;
  const v=box.querySelector('video'),btn=document.getElementById('hmPlay'),chs=[...document.querySelectorAll('#hmCh button')];
  let loaded=false,sound=false;
  const load=()=>{ if(!loaded){ v.src=v.dataset.src; loaded=true; } };
  const play=()=>{ const p=v.play(); if(p&&p.catch) p.catch(()=>{}); };
  const withSound=t=>{ load(); sound=true; box.classList.add('sound'); v.muted=false; v.loop=false; v.controls=true;
    const go=()=>{ v.currentTime=t; play(); };
    if(v.readyState>=1) go(); else v.addEventListener('loadedmetadata',go,{once:true}); };
  btn.addEventListener('click',()=>withSound(0));
  chs.forEach(b=>b.addEventListener('click',()=>withSound(+b.dataset.t)));
  v.addEventListener('timeupdate',()=>{ let k=0; chs.forEach((b,i)=>{ if(v.currentTime>=+b.dataset.t-.05) k=i; });
    chs.forEach((b,i)=>b.classList.toggle('on',i===k)); });
  if(REDUCED||(navigator.connection&&navigator.connection.saveData)) return;   /* the poster stays until a click */
  new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){ load(); if(!sound||!v.ended) play(); }
    else if(loaded) v.pause();
  }),{rootMargin:'200px 0px'}).observe(v);
})();

/* MONTE TAP (18 Oct): the tap-to-pay demo on the Monte card. The visitor moves every step; nothing is timed (Adrian, 18 Oct).
   The numbers are the Monte engine's own tap() for Jordan, one of its synthetic people (Freedom Unlimited, Amex Gold, and an
   Apple Card carrying $2,800), with his 18 October purchases counted against the caps; baked on 18 Oct from
   michae6345-crypto/monte. Re-bake rather than editing them by hand. */
(function(){
  const root=document.getElementById('mtTap'); if(!root) return;
  const NAME={amex_gold:'Amex Gold',chase_freedom_unlimited:'Freedom Unlimited',apple_card:'Apple Card'};
  const WALLET=['chase_freedom_unlimited','amex_gold','apple_card'],BLOCKED={apple_card:'$2,800 balance'},HISTORY=18;
  const STORES=[
    {m:'Trader Joe’s',c:'groceries',a:64.20,mcc:'5411',r:[['amex_gold',2.57,'4×'],['apple_card',1.28,'2×'],['chase_freedom_unlimited',0.96,'1.5×']]},
    {m:'Sweetgreen',c:'dining',a:16.50,mcc:'5812',r:[['amex_gold',0.66,'4×'],['chase_freedom_unlimited',0.49,'3×'],['apple_card',0.33,'2×']]},
    {m:'Uber',c:'rideshare',a:22.40,mcc:'4121',r:[['apple_card',0.67,'3×'],['chase_freedom_unlimited',0.34,'1.5×'],['amex_gold',0.22,'1×']]},
    {m:'Mobil',c:'gas',a:52.00,mcc:'5541',r:[['apple_card',1.56,'3×'],['chase_freedom_unlimited',0.78,'1.5×'],['amex_gold',0.52,'1×']]}
  ];
  const STEPS=[['reader sends the store code','r'],['opens your wallet','l'],['counts this month’s caps','r'],['ranks every card','l'],['pays with the winner','r']];
  const $=s=>root.querySelector(s);
  const dev=$('.mt-dev'),reader=$('.mt-reader'),leds=[...root.querySelectorAll('.mt-leds i')],rm=$('.mt-rm'),ra=$('.mt-ra'),rt=$('.mt-rt');
  const mc=$('.mt-mc'),cimg=$('.mt-card img'),pill=$('.mt-pill'),ico=$('.mt-ico'),stt=$('.mt-stt'),peek=$('.mt-peek');
  const L=$('.mt-l'),R=$('.mt-r'),storesEl=$('.mt-stores'),go=document.getElementById('mtGo'),bk=document.getElementById('mtBack');
  const bars=[...root.querySelectorAll('.mt-bar button')];
  const img=id=>'/img/monte/'+id+'.webp';
  const usd=n=>'$'+n.toFixed(2);
  const ARR='<svg class="mt-arr" viewBox="0 0 48 36" aria-hidden="true"><path d="M2 17c9-7 22 8 40 2"/><path d="M36 13l7 6-8 4"/></svg>';
  const HOLD='<svg viewBox="0 0 48 48" aria-hidden="true"><g class="mt-hold"><rect x="15" y="20" width="18" height="26" rx="4"/><path d="M17 13a10 10 0 0 1 14 0"/><path d="M12 8a17 17 0 0 1 24 0"/></g></svg>';
  const CHECK='<svg class="mt-chk" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="23"/><path d="M15 27l7.5 7.5L38 19"/></svg>';
  let si=0,phase=-1,tick=0,timer=0,shown='';

  storesEl.innerHTML=STORES.map((s,k)=>'<button type="button" data-i="'+k+'">'+s.m+'</button>').join('');
  const S=()=>STORES[si];
  const pickOf=s=>s.r.find(x=>!BLOCKED[x[0]]);

  function body(k){
    const s=S(),p=pickOf(s),max=s.r[0][1];
    if(k===0) return '<span><span class="mt-chip k">'+s.mcc+'</span> → <span class="mt-chip">'+s.c+'</span><span class="mt-chip">'+usd(s.a)+'</span></span>';
    if(k===1) return '<span class="mt-cards">'+WALLET.map(id=>'<span class="'+(BLOCKED[id]?'off':'ok')+'"><img src="'+img(id)+'" alt="'+NAME[id]+'">'+(BLOCKED[id]?'✕ balance':'✓')+'</span>').join('')+'</span>';
    if(k===2) return '<span class="mt-big">'+HISTORY+'</span><span>purchases this month, replayed</span>';
    if(k===3) return '<span class="mt-rank">'+s.r.map((x,i)=>{const cls=x[0]===p[0]?'win':BLOCKED[x[0]]?'blk':'';
      const nm=BLOCKED[x[0]]?'<s>'+NAME[x[0]]+'</s>':NAME[x[0]];
      return '<div class="'+cls+'"><span>'+nm+'</span><b>'+usd(x[1])+'</b><em><i style="--w:'+Math.round(x[1]/max*100)+'%;animation-delay:'+(.2+i*.3)+'s"></i></em></div>';}).join('')+'</span>';
    const skipped=BLOCKED[s.r[0][0]]?'<span>skipped '+NAME[s.r[0][0]]+': '+BLOCKED[s.r[0][0]]+'</span>':'';
    return '<span class="mt-big mt-gain">+'+usd(p[1])+'</span><span>'+NAME[p[0]]+' · '+p[2]+'</span>'+skipped;
  }
  function notes(){
    const html={l:'',r:''};
    STEPS.forEach(([t,side],k)=>{
      if(phase<k&&!(phase>=5)) return;
      const open=k===phase||(phase>=5&&k===4);
      html[side]+=open
        ?'<div class="mt-n"><div class="mt-nt"><div class="mt-nh"><small>0'+(k+1)+'</small>'+t+'</div><div class="mt-nv">'+body(k)+'</div></div>'+ARR+'</div>'
        :'<button type="button" class="mt-done" data-k="'+k+'"><b>✓</b>'+t+'</button>';
    });
    if(phase<0) html.r='<div class="mt-n"><div class="mt-nt"><div class="mt-nh">tap to pay, step by step</div><div class="mt-nv"><span>Jordan at '+S().m+', '+usd(S().a)+'</span></div></div>'+ARR+'</div>';
    const key=si+':'+phase;
    if(key!==shown){ L.innerHTML=html.l; R.innerHTML=html.r; shown=key; }
  }
  function phone(){
    const s=S(),p=pickOf(s),settled=phase>=4;
    const top=settled?p[0]:(phase>=1&&phase<=3?WALLET[tick%WALLET.length]:'monte');
    const cur=mc.hidden?cimg.dataset.id:'monte';
    if(top!==cur){
      const el=top==='monte'?mc:cimg;
      mc.hidden=top!=='monte'; cimg.hidden=top==='monte';
      if(top!=='monte'){ cimg.src=img(top); cimg.dataset.id=top; }
      el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip');
    }
    pill.hidden=!settled; if(settled) pill.textContent='+'+usd(p[1])+' rewards';
    const st=phase>=5?'done':phase>=0?'busy':'hold';
    if(ico.dataset.st!==st){ ico.dataset.st=st; ico.innerHTML=st==='done'?CHECK:st==='busy'?'<span class="mt-spin"></span>':HOLD; }
    stt.textContent=phase>=5?'Done':phase===4?NAME[p[0]]:phase>=0?'Choosing a card':'Hold Near Reader';
    const rest=WALLET.filter(id=>!(settled&&id===p[0]));
    peek.innerHTML=rest.map(id=>'<img src="'+img(id)+'" alt="">').join('');
  }
  function render(){
    const s=S(),tapped=phase>=0,paid=phase>=5;
    [...storesEl.children].forEach((b,k)=>b.classList.toggle('on',k===si));
    reader.classList.toggle('on',tapped&&!paid); reader.classList.toggle('ok',paid);
    const lit=paid?4:tapped?Math.min(4,phase+1):0; leds.forEach((l,k)=>l.classList.toggle('on',k<lit));
    rm.textContent=s.m; ra.textContent=paid?'Approved':usd(s.a); rt.textContent=paid?usd(s.a):tapped?'Processing… hold card':'Tap, insert or swipe';
    dev.classList.toggle('tapped',tapped&&!paid); dev.classList.toggle('paid',paid); dev.classList.toggle('busy',phase>=0&&phase<=3);
    root.classList.toggle('mt-idle',phase<0);
    go.querySelector('span').textContent=phase<0?'Tap to pay':paid?'Tap again':phase===4?'Pay →':'Next →';
    bk.disabled=phase<=0;
    bars.forEach((b,k)=>{ b.classList.toggle('done',paid||phase>k); b.classList.toggle('now',phase===k); });
    phone(); notes();
    clearInterval(timer);
    if(phase>=1&&phase<=3&&!REDUCED) timer=setInterval(()=>{ tick++; phone(); },700);
  }
  function beep(){
    try{ const C=window.AudioContext||window.webkitAudioContext,ctx=new C();
      [0,.14].forEach(at=>{ const o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime+at;
        o.frequency.value=1760; g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.06,t+.01); g.gain.exponentialRampToValueAtTime(.0001,t+.11);
        o.connect(g).connect(ctx.destination); o.start(t); o.stop(t+.12); });
      setTimeout(()=>ctx.close(),600); }catch(e){}
  }
  const set=k=>{ const was=phase; phase=k; render(); if(phase>=5&&was<5) beep(); };
  go.addEventListener('click',()=>set(phase<0||phase>=5?0:phase+1));
  bk.addEventListener('click',()=>{ if(phase>0) set(phase-1); });
  bars.forEach(b=>b.addEventListener('click',()=>set(+b.dataset.k)));
  storesEl.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; si=+b.dataset.i; set(-1); });
  [L,R].forEach(n=>n.addEventListener('click',e=>{ const b=e.target.closest('.mt-done'); if(b) set(+b.dataset.k); }));
  root.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'){ e.preventDefault(); set(phase<0||phase>=5?0:phase+1); }
    else if(e.key==='ArrowLeft'&&phase>0){ e.preventDefault(); set(phase-1); }
  });
  render();
})();

/* Monte's tabs: the tap demo or the launch film. The film loads only when its tab opens, plays muted from the start, and
   "watch with sound" or a chapter restarts it with sound and controls. */
(function(){
  const tabs=[document.getElementById('mtTabTap'),document.getElementById('mtTabFilm')]; if(!tabs[0]||!tabs[1]) return;
  const views=[document.getElementById('mtTap'),document.getElementById('mtFilmBox')];
  const box=document.getElementById('mtFilm'),v=box.querySelector('video'),btn=document.getElementById('mtPlay'),chs=[...document.querySelectorAll('#mtCh button')];
  let loaded=false;
  const load=()=>{ if(!loaded){ v.src=v.dataset.src; loaded=true; } };
  const play=()=>{ const p=v.play(); if(p&&p.catch) p.catch(()=>{}); };
  const withSound=t=>{ load(); box.classList.add('sound'); v.muted=false; v.controls=true;
    const go=()=>{ v.currentTime=t; play(); };
    if(v.readyState>=1) go(); else v.addEventListener('loadedmetadata',go,{once:true}); };
  const pick=k=>{
    tabs.forEach((t,i)=>{ t.setAttribute('aria-selected',i===k); t.tabIndex=i===k?0:-1; views[i].hidden=i!==k; });
    if(k===1){ load(); if(!REDUCED&&!(navigator.connection&&navigator.connection.saveData)&&v.muted) play(); } else if(loaded) v.pause();
  };
  tabs.forEach((t,i)=>{ t.addEventListener('click',()=>pick(i));
    t.addEventListener('keydown',e=>{ if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ e.preventDefault(); const k=1-i; pick(k); tabs[k].focus(); } }); });
  btn.addEventListener('click',()=>withSound(0));
  chs.forEach(b=>b.addEventListener('click',()=>withSound(+b.dataset.t)));
  v.addEventListener('timeupdate',()=>{ let k=0; chs.forEach((b,i)=>{ if(v.currentTime>=+b.dataset.t-.05) k=i; });
    chs.forEach((b,i)=>b.classList.toggle('on',i===k)); });
})();

/* WORK CANVAS (18 Oct): Selected work as tiles on a node canvas. Each tile opens its full card in a panel under its row (one
   at a time); the wires between the tiles' ports are redrawn whenever the canvas changes size. Links to #case-… or
   #lemma-track elsewhere on the page open the right card first. */
(function(){
  const cv=document.getElementById('wkCanvas'); if(!cv) return;
  const svg=cv.querySelector('.wk-wires'),nodes=[...cv.querySelectorAll('.wk-node')],xs=[...cv.querySelectorAll('.wk-x')];
  const NS='http://www.w3.org/2000/svg';
  cv.classList.add('armed'); xs.forEach(x=>{ x.hidden=true; });
  let open=null,state=0,raf=0;
  const cols=()=>getComputedStyle(cv).gridTemplateColumns.split(' ').filter(Boolean).length;
  const place=(x,k)=>{ const i=nodes.findIndex(n=>n.dataset.k===k),c=cols(),end=Math.min(nodes.length-1,Math.floor(i/c)*c+c-1); nodes[end].after(x); };
  function show(k,scrollTo){
    open=k;
    xs.forEach(x=>{ x.hidden=x.dataset.k!==k; });
    nodes.forEach(n=>n.querySelector('.wk-tile').setAttribute('aria-expanded',n.dataset.k===k));
    if(k){ const x=document.getElementById('x-'+k); place(x,k); x.classList.remove('in'); void x.offsetWidth; x.classList.add('in');
      if(scrollTo) (scrollTo===true?x:scrollTo).scrollIntoView({behavior:REDUCED?'auto':'smooth',block:'start'}); }
    draw();
  }
  nodes.forEach(n=>n.querySelector('.wk-tile').addEventListener('click',()=>show(open===n.dataset.k?null:n.dataset.k,open===n.dataset.k?false:true)));
  xs.forEach(x=>x.querySelector('.wk-xc').addEventListener('click',()=>{ const k=x.dataset.k; show(null);
    const t=cv.querySelector('.wk-node[data-k="'+k+'"] .wk-tile'); t.focus({preventScroll:true}); t.scrollIntoView({block:'center',behavior:REDUCED?'auto':'smooth'}); }));
  /* re-place the open panel when the column count changes */
  let lastC=cols();
  /* links into a card, from Achievements or a #hash */
  const keyOf=id=>{ if(!id) return null; const el=document.getElementById(id); const x=el&&el.closest('.wk-x'); return x?x.dataset.k:null; };
  document.addEventListener('click',e=>{ const a=e.target.closest('a[href^="#"]'); if(!a) return; const id=a.getAttribute('href').slice(1),k=keyOf(id);
    if(!k) return; if(open===k&&a.closest('.wk-x')) return; e.preventDefault(); show(k,document.getElementById(id)); history.replaceState(null,'','#'+id); });

  /* wires: rounded orthogonal connectors, like the films' node canvas */
  const round=(pts,r)=>{ let d='M'+pts[0][0]+' '+pts[0][1];
    for(let i=1;i<pts.length-1;i++){ const [x0,y0]=pts[i-1],[x1,y1]=pts[i],[x2,y2]=pts[i+1];
      const d1=Math.hypot(x1-x0,y1-y0)||1,d2=Math.hypot(x2-x1,y2-y1)||1,rr=Math.min(r,d1/2,d2/2);
      d+=' L'+(x1+(x0-x1)/d1*rr)+' '+(y1+(y0-y1)/d1*rr)+' Q'+x1+' '+y1+' '+(x1+(x2-x1)/d2*rr)+' '+(y1+(y2-y1)/d2*rr); }
    const L=pts[pts.length-1]; return d+' L'+L[0]+' '+L[1]; };
  function draw(){
    raf=0;
    const c=cols(); if(c!==lastC){ lastC=c; if(open) place(document.getElementById('x-'+open),open); }
    const R=cv.getBoundingClientRect(); if(!R.width) return;
    svg.setAttribute('viewBox','0 0 '+R.width+' '+R.height);
    cv.querySelectorAll('.wk-port.on').forEach(p=>p.classList.remove('on'));
    const X=v=>v-R.left,Y=v=>v-R.top,paths=[];
    for(let i=0;i<nodes.length-1;i++){
      const a=nodes[i].querySelector('.wk-tile'),b=nodes[i+1].querySelector('.wk-tile'),A=a.getBoundingClientRect(),B=b.getBoundingClientRect();
      const na=nodes[i].getBoundingClientRect(),nb=nodes[i+1].getBoundingClientRect();
      const ya=Y(A.top+A.height/2),yb=Y(B.top+B.height/2);
      let pts,pa,pb;
      if(c>1&&i%c!==c-1){ pts=[[X(A.right),ya],[X(B.left),yb]]; pa='pr'; pb='pl'; }
      else if(c>1){ /* end of a row to the start of the next: out through the right gutter, across the gap, in from the left */
        const gx1=X(A.right)+Math.min(24,(R.right-A.right)/2),gx2=X(B.left)-Math.min(24,(B.left-R.left)/2);
        let gy=Y((na.bottom+nb.top)/2);
        const ox=open&&nodes[i].nextElementSibling&&nodes[i].nextElementSibling.classList.contains('wk-x')?nodes[i].nextElementSibling.getBoundingClientRect():null;
        if(ox) gy=Y(ox.bottom+(nb.top-ox.bottom)/2);
        pts=[[X(A.right),ya],[gx1,ya],[gx1,gy],[gx2,gy],[gx2,yb],[X(B.left),yb]]; pa='pr'; pb='pl';
      } else { /* one column: down the left gutter */
        const gx=X(A.left)-Math.min(16,(A.left-R.left)/2);
        pts=[[X(A.left),ya],[gx,ya],[gx,yb],[X(B.left),yb]]; pa='pl'; pb='pl';
      }
      a.querySelector('.wk-port.'+pa).classList.add('on'); b.querySelector('.wk-port.'+pb).classList.add('on');
      paths.push(round(pts,c>1?16:9));
    }
    svg.textContent='';
    paths.forEach((d,i)=>{
      const p=document.createElementNS(NS,'path'); p.setAttribute('d',d); svg.appendChild(p);
      const len=p.getTotalLength();
      if(state===0&&!REDUCED){ p.style.strokeDasharray=len; p.style.strokeDashoffset=len; }
      if(state===2&&!REDUCED){
        const dot=document.createElementNS(NS,'circle'); dot.setAttribute('r','3');
        const m=document.createElementNS(NS,'animateMotion'); m.setAttribute('dur',Math.max(2.4,len/110).toFixed(2)+'s'); m.setAttribute('repeatCount','indefinite');
        m.setAttribute('begin',(i*.7).toFixed(1)+'s'); m.setAttribute('path',d); dot.appendChild(m); svg.appendChild(dot);
      }
    });
  }
  const later=()=>{ if(!raf) raf=requestAnimationFrame(draw); };
  if('ResizeObserver' in window) new ResizeObserver(later).observe(cv); else addEventListener('resize',later);
  const hk=keyOf(location.hash.slice(1)); if(hk) show(hk,false); else draw();
  /* first sight: the wires draw themselves in, then the pulses start */
  new IntersectionObserver((es,io)=>es.forEach(e=>{ if(!e.isIntersecting) return; io.disconnect(); state=1;
    const ps=[...svg.querySelectorAll('path')];
    ps.forEach((p,i)=>{ p.style.transition='stroke-dashoffset 1.1s cubic-bezier(.65,0,.35,1) '+(.25+i*.18)+'s'; requestAnimationFrame(()=>{ p.style.strokeDashoffset='0'; }); });
    setTimeout(()=>{ state=2; draw(); },REDUCED?0:1500+ps.length*180);
  }),{threshold:.15}).observe(cv);
})();

/* timeline: spine fills + nodes ignite as you scroll through Experience */
(function(){
  const tl=document.querySelector('.timeline'); if(!tl) return;
  tl.classList.add('armed');
  const fill=document.createElement('div'); fill.className='tl-fill'; tl.appendChild(fill);
  const items=[...tl.querySelectorAll('.tl')];
  let tick=false;
  const upd=()=>{ tick=false;
    const r=tl.getBoundingClientRect(), mid=innerHeight*0.5;
    let prog=(mid-r.top)/r.height; prog=Math.max(0,Math.min(1,prog));
    fill.style.height=(prog*Math.max(0,r.height-8))+'px';
    items.forEach(it=>{ if(it.getBoundingClientRect().top<mid) it.classList.add('lit'); });
  };
  const onScroll=()=>{ if(!tick){tick=true;requestAnimationFrame(upd);} };
  addEventListener('scroll',onScroll,{passive:true}); addEventListener('resize',onScroll); upd();
})();

/* 3D card tilt removed — calm editorial hover only */

/* blueprint grid is now static (cursor-flashlight removed) — calmer */

/* hero live sparkline */
(function(){
  const c=document.getElementById('spark'); if(!c) return;
  const x=c.getContext('2d'), val=document.getElementById('sparkVal');
  const css=getComputedStyle(document.documentElement), acc=css.getPropertyValue('--acc').trim()||'#1450e6';
  const hexA=(h,a)=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(s=>s+s).join('');const n=parseInt(h,16);return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;};
  const W=c.width,H=c.height,DPR=2; let v=100,base=100; const data=[]; const CAP=48;
  for(let i=0;i<CAP;i++){v=Math.max(60,v+(Math.random()-.48)*3.4);data.push(v);}
  function draw(){
    x.clearRect(0,0,W,H);
    const lo=Math.min(...data),hi=Math.max(...data),pad=4*DPR,rng=(hi-lo)||1;
    const px=i=>pad+(W-2*pad)*(i/(CAP-1)), py=vv=>H-pad-((vv-lo)/rng)*(H-2*pad);
    // area fill
    x.beginPath();x.moveTo(px(0),H);
    data.forEach((vv,i)=>x.lineTo(px(i),py(vv)));
    x.lineTo(px(CAP-1),H);x.closePath();
    const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,hexA(acc,.28));g.addColorStop(1,hexA(acc,0));x.fillStyle=g;x.fill();
    // line
    x.beginPath();data.forEach((vv,i)=>i?x.lineTo(px(i),py(vv)):x.moveTo(px(i),py(vv)));
    x.strokeStyle=acc;x.lineWidth=1.6*DPR;x.stroke();
    // head dot
    x.fillStyle=acc;x.beginPath();x.arc(px(CAP-1),py(data[CAP-1]),2.6*DPR,0,7);x.fill();
  }
  draw();
  setInterval(()=>{
    v=Math.max(60,data[data.length-1]+(Math.random()-.45)*2.4);data.push(v);if(data.length>CAP)data.shift();
    const pc=(v-base)/base*100; if(val){val.textContent=(pc>=0?'+':'')+pc.toFixed(2)+'%';val.style.color=pc>=0?acc:'#e5484d';}
    draw();
  },3800);
})();

/* ================= EXPERIENCE — internship files: tabs switch the open file, and it stays open until the visitor picks
   another (arrows, Home and End too). Without JS all four files show. ================= */
(function(){
  const b=document.getElementById('xpFiles'); if(!b) return;
  const tabs=[...b.querySelectorAll('.xf-tab')], panels=[...b.querySelectorAll('.xf-p')];
  b.classList.add('js');
  let cur=0;
  function set(i,focus){
    cur=(i+tabs.length)%tabs.length;
    tabs.forEach((t,j)=>{t.setAttribute('aria-selected',j===cur?'true':'false');t.tabIndex=j===cur?0:-1;});
    panels.forEach((p,j)=>{p.hidden=j!==cur;p.classList.remove('in');});
    void panels[cur].offsetWidth; panels[cur].classList.add('in');
    const pr=tabs[cur].querySelector('.xf-prog'); if(pr){pr.style.animation='none';void pr.offsetWidth;pr.style.animation='';}
    if(focus) tabs[cur].focus();
  }
  const takeOver=()=>b.classList.remove('auto');
  tabs.forEach((t,j)=>{
    t.addEventListener('click',()=>{takeOver();set(j);});
    t.addEventListener('keydown',e=>{
      const k={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];
      if(k){e.preventDefault();takeOver();set(cur+k,true);}
      else if(e.key==='Home'){e.preventDefault();takeOver();set(0,true);}
      else if(e.key==='End'){e.preventDefault();takeOver();set(tabs.length-1,true);}
    });
    const pr=t.querySelector('.xf-prog'); if(pr) pr.addEventListener('animationend',()=>{ if(b.classList.contains('auto')) set(cur+1); });
  });
  set(0);
  /* no auto-advance (Adrian, 15 Oct: "not timed... they can stay on the tab for as long as they want") */
})();

/* ================= RÉSUMÉ PICKER (short / long) ================= */
(function(){
  const menu=document.getElementById('cvMenu'); if(!menu) return;
  const items=[...menu.querySelectorAll('a')];
  let trigger=null;
  const place=t=>{
    const r=t.getBoundingClientRect(), w=menu.offsetWidth, h=menu.offsetHeight;
    menu.style.left=Math.min(Math.max(16,r.right-w),innerWidth-w-16)+'px';
    const below=r.bottom+10;
    menu.style.top=(below+h>innerHeight-12?Math.max(12,r.top-h-10):below)+'px';  // flip above when there's no room below
  };
  const open=t=>{
    if(trigger&&trigger!==t) trigger.setAttribute('aria-expanded','false');
    trigger=t; menu.hidden=false; place(t);
    t.setAttribute('aria-expanded','true'); items[0].focus({preventScroll:true});
  };
  const close=refocus=>{
    if(menu.hidden) return;
    menu.hidden=true;
    if(trigger){trigger.setAttribute('aria-expanded','false'); if(refocus) trigger.focus({preventScroll:true});}
    trigger=null;
  };
  document.querySelectorAll('[data-cv-menu]').forEach(t=>{
    t.setAttribute('aria-haspopup','menu'); t.setAttribute('aria-expanded','false'); t.setAttribute('aria-controls','cvMenu');
    t.addEventListener('click',e=>{
      if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey) return;  // modified clicks still open the one-pager
      e.preventDefault();
      (!menu.hidden&&trigger===t)?close(true):open(t);
    });
  });
  items.forEach(a=>a.addEventListener('click',()=>close(false)));
  menu.addEventListener('keydown',e=>{
    const i=items.indexOf(document.activeElement);
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();items[(i+(e.key==='ArrowDown'?1:items.length-1))%items.length].focus();}
    else if(e.key==='Home'||e.key==='End'){e.preventDefault();items[e.key==='Home'?0:items.length-1].focus();}
    else if(e.key==='Escape'){e.preventDefault();close(true);}
  });
  menu.addEventListener('focusout',e=>{if(!menu.contains(e.relatedTarget)&&e.relatedTarget!==trigger) close(false);});
  document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!e.target.closest('[data-cv-menu]')) close(false);});
  addEventListener('keydown',e=>{if(e.key==='Escape') close(true);});
  addEventListener('resize',()=>close(false));
  addEventListener('scroll',()=>{  // follow the link while it's on screen, close once it's gone
    if(menu.hidden||!trigger) return;
    const r=trigger.getBoundingClientRect();
    (r.bottom<0||r.top>innerHeight)?close(false):place(trigger);
  },{passive:true});
})();

/* ================= COMMAND PALETTE (⌘K / /) ================= */
(function(){
  const overlay=document.getElementById('cmdk'),input=document.getElementById('cmdkInput'),list=document.getElementById('cmdkList');
  if(!overlay) return;
  const go=h=>{close();const el=document.querySelector(h);if(el)el.scrollIntoView({behavior:'smooth'});else location.href='/'+h;};
  const ext=u=>{close();window.open(u,'_blank');};
  const cv=k=>document.querySelector(`#cvMenu [data-cv="${k}"]`).getAttribute('href');
  const fold=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();  // "resume" finds "Résumé"
  const toast=m=>{const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);
    requestAnimationFrame(()=>t.classList.add('show'));setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),400);},2800);};
  const cmds=[
    {ic:'▸',label:'About',k:'jump',run:()=>go('#about')},
    {ic:'▸',label:'Experience',k:'jump',run:()=>go('#experience')},
    {ic:'▸',label:'Research / Papers',k:'jump',run:()=>go('#papers')},
    {ic:'▸',label:'Selected work',k:'jump',run:()=>go('#work')},
    {ic:'▸',label:'Fencing',k:'jump',run:()=>go('#fencing')},
    {ic:'▸',label:'Achievements',k:'jump',run:()=>go('#record')},
    {ic:'▸',label:'Contact',k:'jump',run:()=>go('#contact')},
    {ic:'✉',label:'Email Adrian',k:'link',run:()=>{close();location.href='mailto:erlikhman.adrian@gmail.com';}},
    {ic:'↗',label:'Open GitHub',k:'link',run:()=>ext('https://github.com/adrian-erlikhman')},
    {ic:'in',label:'Open LinkedIn',k:'link',run:()=>ext('https://www.linkedin.com/in/adrian-erlikhman-78a262414')},
    {ic:'↓',label:'Résumé: short, 1 page',k:'file',run:()=>ext(cv('short'))},
    {ic:'↓',label:'Résumé: long, 3 pages',k:'file',run:()=>ext(cv('long'))},
    {ic:'</>',label:'Repo: LSTM Equity Forecaster',k:'repo',run:()=>ext('https://github.com/adrian-erlikhman/lstm-equity-forecaster')},
    {ic:'</>',label:'Repo: FinBERT Sentiment Analyzer',k:'repo',run:()=>ext('https://github.com/adrian-erlikhman/finbert-sentiment-analyzer')},
    {ic:'</>',label:'Repo: Fraud Detection System',k:'repo',run:()=>ext('https://github.com/adrian-erlikhman/fraud-detection-system')},
    {ic:'¶',label:'Paper: Curated to Win (ARRSI, AACL-IJCNLP 2026)',k:'pdf',run:()=>ext('/papers/curated-to-win-arrsi2026.pdf?v=2026-10-12')},
    {ic:'¶',label:'Paper: Portfolio Optimization vs 1/N',k:'pdf',run:()=>ext('/papers/portfolio-optimization-vs-equal-weight.pdf?v=2026-10-02')},
    {ic:'¶',label:'Paper: Legatum Robustness Audit',k:'pdf',run:()=>ext('/papers/legatum-robustness-audit.pdf?v=2026-09-13')},
    {ic:'$',label:'whoami',k:'sys',run:()=>toast('adrian erlikhman — senior @ LACES, Los Angeles · ML, quant, data')},
    {ic:'$',label:'uptime',k:'sys',run:()=>toast('rising senior since 2023 · caffeinated · shipping')},
  ];
  let filtered=cmds,sel=0;
  const render=()=>{ list.innerHTML = filtered.length
    ? filtered.map((c,i)=>`<li data-i="${i}" class="${i===sel?'sel':''}"><span class="ic">${c.ic}</span>${c.label}<span class="k">${c.k}</span></li>`).join('')
    : '<li class="none">no matches</li>'; };
  const openP=()=>{overlay.hidden=false;input.value='';filtered=cmds;sel=0;render();setTimeout(()=>input.focus(),20);};
  function close(){overlay.hidden=true;}
  input.addEventListener('input',()=>{const terms=fold(input.value).split(/\s+/).filter(Boolean);
    filtered=cmds.filter(c=>{const hay=fold(c.label)+' '+c.k;return terms.every(t=>hay.includes(t));});sel=0;render();});
  input.addEventListener('keydown',e=>{
    if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(filtered.length-1,sel+1);render();}
    else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(0,sel-1);render();}
    else if(e.key==='Enter'){e.preventDefault();if(filtered[sel])filtered[sel].run();}
    else if(e.key==='Escape'){close();}
  });
  list.addEventListener('click',e=>{const li=e.target.closest('li[data-i]');if(li&&filtered[+li.dataset.i])filtered[+li.dataset.i].run();});
  list.addEventListener('mousemove',e=>{const li=e.target.closest('li[data-i]');if(li){sel=+li.dataset.i;[...list.children].forEach((n,i)=>n.classList.toggle('sel',i===sel));}});
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  const kbtn=document.getElementById('kbtn'); if(kbtn) kbtn.addEventListener('click',openP);
  addEventListener('keydown',e=>{
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();overlay.hidden?openP():close();}
    else if(e.key==='/'&&overlay.hidden&&!/^(input|textarea)$/i.test(document.activeElement.tagName)){e.preventDefault();openP();}
  });
})();

/* ================= NAME SCRAMBLE — plays once, never on re-hover ================= */
(function(){
  const h1=document.querySelector('.hero h1'); if(!h1) return;
  const spans=[...h1.querySelectorAll('.ln span')]; if(!spans.length) return;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches) return;   // leave the name static
  const SC='ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&/0123456789';
  let played=false;
  function play(){
    if(played) return; played=true;
    const targets=spans.map(s=>s.textContent); let f=0; const frames=13;
    const iv=setInterval(()=>{ f++;
      spans.forEach((s,si)=>{const t=targets[si],rev=Math.floor((f/frames)*t.length);
        s.textContent=[...t].map((ch,i)=>ch===' '?' ':(i<rev?ch:SC[(Math.random()*SC.length)|0])).join('');});
      if(f>=frames){clearInterval(iv);spans.forEach((s,si)=>s.textContent=targets[si]);}
    },38);
  }
  // fire exactly once, right after the intro unlocks the page (mobile + desktop); no hover listener
  if(!document.body.classList.contains('intro-lock')){ setTimeout(play,360); return; }
  const wait=setInterval(()=>{ if(!document.body.classList.contains('intro-lock')){ clearInterval(wait); setTimeout(play,600); } },120);
})();

/* ================= TOP-LEFT NAME — scrambles once on load, then up to 3 on hover ================= */
(function(){
  const mark=document.getElementById('aeMark'); if(!mark) return;
  const nm=mark.querySelector('.nm'); if(!nm) return;
  const TARGET=nm.textContent, SC='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const FRAMES=15, STEP=42, MAX_HOVERS=3;
  let busy=false, hovers=0, loadPlayed=false;
  function scramble(){
    if(busy) return; busy=true;
    let f=0;
    const iv=setInterval(()=>{ f++;
      const rev=Math.floor((f/FRAMES)*TARGET.length);
      nm.textContent=[...TARGET].map((ch,i)=>ch===' '?' ':(i<rev?ch:SC[(Math.random()*SC.length)|0])).join('');
      if(f>=FRAMES){ clearInterval(iv); nm.textContent=TARGET; busy=false; }
    },STEP);
  }
  // click / tap the mark → smooth scroll to top
  mark.addEventListener('click',e=>{ if(mark.getAttribute('href')!=='#') return; e.preventDefault(); scrollTo({top:0,behavior:'smooth'}); });
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){ nm.textContent=TARGET; return; }  // stay static
  // lightly interactive: at most 3 hover-triggered scrambles, then it settles for good
  mark.addEventListener('mouseenter',()=>{ if(hovers>=MAX_HOVERS||busy) return; hovers++; scramble(); });
  // one scramble when the site loads (after the intro unlocks the page)
  function loadPlay(){ if(loadPlayed) return; loadPlayed=true; scramble(); }
  if(!document.body.classList.contains('intro-lock')){ setTimeout(loadPlay,420); return; }
  const wait=setInterval(()=>{ if(!document.body.classList.contains('intro-lock')){ clearInterval(wait); setTimeout(loadPlay,700); } },120);
})();

/* ================= CODE PREVIEW ================= */
(function(){
  const cv=document.getElementById('codeview'); if(!cv) return;
  const meta={
    lstm:{file:'forecast.py',repo:'https://github.com/adrian-erlikhman/lstm-equity-forecaster',desc:'Rolling windows + stacked LSTM vs. baseline',
      problem:'Most "LSTM predicts the market" demos never check whether the net beats a trivial model.',
      approach:'Stacked LSTM on rolling windows, benchmarked against linear regression on every run.',
      result:'Scored on directional accuracy vs. the baseline — no cherry-picked error metric.'},
    finbert:{file:'sentiment.py',repo:'https://github.com/adrian-erlikhman/finbert-sentiment-analyzer',desc:'FinBERT with an offline lexicon fallback',
      problem:'Turn a stream of financial headlines into a daily signal you can line up against price.',
      approach:'FinBERT tags each headline; aggregate a daily score. Lexicon fallback if the model is unavailable.',
      result:'Whole pipeline runs end-to-end in one command — model or no model, online or off.'},
    fraud:{file:'fraud_detection.py',repo:'https://github.com/adrian-erlikhman/fraud-detection-system',desc:'Imbalance-aware models + F-beta threshold',
      problem:'At 1% fraud, a model that predicts "never fraud" is 99% accurate and completely useless.',
      approach:'Imbalance-aware Random Forest vs. Gradient Boosting, scored on PR-AUC, then an F-beta threshold optimizer.',
      result:'Random Forest won — PR-AUC 0.36 vs 0.28 — with a recall-weighted (F2) operating threshold.'},
  };
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const KW=/\b(def|class|return|if|elif|else|for|while|in|import|from|as|with|not|and|or|is|None|True|False|lambda|try|except|finally|raise|print|int|range)\b/;
  function hl(code){
    const rx=/(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\n]*"|'[^'\n]*')|(\b\d+\.?\d*\b)|([A-Za-z_]\w*)/g;
    return esc(code).replace(rx,(m,c,str,num,word)=>{
      if(c) return '<span class="c">'+c+'</span>';
      if(str) return '<span class="s">'+str+'</span>';
      if(num) return '<span class="n">'+num+'</span>';
      if(word&&KW.test(word)) return '<span class="k">'+word+'</span>';
      return m;
    });
  }
  const open=id=>{const m=meta[id],src=document.getElementById('code-'+id);if(!m)return;
    document.getElementById('cvFile').textContent=m.file;
    document.getElementById('cvCase').innerHTML=
      '<div class="cs-row"><span class="cs-k">Problem</span><span class="cs-v">'+m.problem+'</span></div>'+
      '<div class="cs-row"><span class="cs-k">Approach</span><span class="cs-v">'+m.approach+'</span></div>'+
      '<div class="cs-row cs-res"><span class="cs-k">Result</span><span class="cs-v">'+m.result+'</span></div>';
    document.getElementById('cvCode').innerHTML=hl((src?src.textContent:'').replace(/^\n+|\s+$/g,''));
    document.getElementById('cvDesc').textContent=m.desc;
    document.getElementById('cvRepo').href=m.repo;
    cv.hidden=false;};
  const close=()=>{cv.hidden=true;};
  document.querySelectorAll('.proj .prev').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();open(b.dataset.code);}));
  document.getElementById('cvClose').addEventListener('click',close);
  cv.addEventListener('click',e=>{if(e.target===cv)close();});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!cv.hidden)close();});
})();

/* ================= RESEARCH SHELF — click a front page to open its panel; arrows, Home and End move along the shelf ================= */
(function(){
  const sh=document.querySelector('.rshelf'), box=document.querySelector('.rpanels'); if(!sh||!box) return;
  const tabs=[...sh.querySelectorAll('.rs-b')], panels=tabs.map(t=>document.getElementById(t.getAttribute('aria-controls')));
  sh.classList.add('js'); box.classList.add('js');
  function pick(i,focus){
    tabs.forEach((t,j)=>{const on=j===i; t.setAttribute('aria-selected',on); t.tabIndex=on?0:-1; panels[j].classList.toggle('on',on); panels[j].hidden=!on;});
    if(focus) tabs[i].focus({preventScroll:true});
    if(sh.scrollWidth>sh.clientWidth) sh.scrollTo({left:Math.max(0,tabs[i].offsetLeft-sh.offsetLeft-22),behavior:'smooth'});
  }
  tabs.forEach((t,i)=>{
    t.addEventListener('click',()=>pick(i));
    t.addEventListener('keydown',e=>{
      const n=tabs.length, j={ArrowRight:(i+1)%n,ArrowLeft:(i-1+n)%n,Home:0,End:n-1}[e.key];
      if(j!==undefined){e.preventDefault(); pick(j,true);}
    });
  });
  pick(0);
})();

/* ================= MATH RESEARCH NOTES ================= */
(function(){
  const nv=document.getElementById('notes'); if(!nv) return;
  const esc=x=>x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const SESS=[
  {n:1,topic:'Induction',part:'I',title:'Strong induction, and why the base case has to reach',
   concept:`<p>The lazy version of induction hides a trap. Check n=1, assume n, prove n+1, and you can "prove" all horses are the same color. It dies at n=2, where the two subsets of horses never overlap, so the step never touches the base. Strong induction fixes the reach: assume the claim for every k below n, not only n−1.</p>`,
   probs:[
    {q:`Every integer <code class="m">n ≥ 2</code> is a product of primes.`,
     w:[`If n is prime it is its own product. Done.`,`Otherwise n = a·b with 1 < a, b < n.`,`Both are below n, so by strong induction each is a product of primes.`,`Concatenate the two lists. ∎`]},
    {q:`Every postage amount <code class="m">≥ 12</code>¢ is payable with 4¢ and 5¢ stamps.`,
     w:[`Bases:  12 = 4+4+4,  13 = 4+4+5,  14 = 4+5+5,  15 = 5+5+5.`,`Step: for n ≥ 16, the amount n−4 ≥ 12 is already payable; add one 4¢ stamp.`,`I needed all four bases. First try had only 12, and 16 had nothing to stand on.`]}
   ],aside:`The reach is the whole thing. If the step leans on n−4, you owe four base cases, not one.`},

  {n:2,topic:'Induction',part:'II',title:'Invariants and monovariants',
   concept:`<p>Some "you can never get from A to B" claims are not about n at all. They are about a quantity the moves never change (an invariant) or only push one way (a monovariant). Find the conserved thing and the impossibility falls out.</p>`,
   probs:[
    {q:`An 8×8 board with two opposite corners removed cannot be tiled by dominoes.`,
     w:[`Color it like a checkerboard. Every domino covers one black and one white square.`,`Opposite corners share a color, so we deleted two of the same color: 30 vs 32.`,`A tiling needs equal counts. 30 ≠ 32, so none exists. ∎`]},
    {q:`Write 1..n on a board. Erase two numbers a,b and write |a−b|. The parity of the last number is forced.`,
     w:[`a+b and |a−b| have the same parity, so each move preserves the parity of the total sum.`,`So the final number ≡ 1+2+···+n (mod 2), whatever choices you make.`]}
   ],aside:`Kirill's rule of thumb: stare at the move and ask what it fixes mod 2, or mod anything.`},

  {n:3,topic:'Number theory',part:'I',title:'gcd, the Euclidean algorithm, and Bézout',
   concept:`<p>Euclid's algorithm is one line on repeat: gcd(a,b) = gcd(b, a mod b) until the remainder is 0. Bézout says that same gcd is always an integer combination ax+by. Most of elementary number theory is one of these two in a costume.</p>`,
   probs:[
    {q:`Compute <code class="m">gcd(1071, 462)</code> and write it as a combination.`,
     w:[`1071 = 2·462 + 147`,`462 = 3·147 + 21`,`147 = 7·21 + 0   →  gcd = 21`,`Back-substitute:  21 = 462 − 3·147 = 462 − 3(1071 − 2·462) = 7·462 − 3·1071.`]},
    {q:`Consecutive Fibonacci numbers are coprime.`,
     w:[`gcd(F_{n+1}, F_n) = gcd(F_n, F_{n+1} − F_n) = gcd(F_n, F_{n−1}).`,`Descend to gcd(F_2, F_1) = gcd(1,1) = 1. ∎`]}
   ],aside:`A modular inverse of a mod m is just the x in ax + my = 1. Bézout hands it over whenever gcd(a,m)=1.`},

  {n:4,topic:'Number theory',part:'II',title:'Modular arithmetic, Fermat, Euler',
   concept:`<p>Congruence mod m is an equivalence you can add and multiply. Fermat: a^(p−1) ≡ 1 (mod p) when p does not divide a. Euler generalizes to a^φ(n) ≡ 1 when gcd(a,n)=1. In practice you never need the full exponent; reduce it mod the order.</p>`,
   probs:[
    {q:`Last two digits of <code class="m">7^2025</code>.`,
     w:[`Work mod 100.  7² = 49,  7⁴ = 2401 ≡ 1.  So the order of 7 is 4.`,`2025 ≡ 1 (mod 4), so 7^2025 ≡ 7^1 = 7.`,`Last two digits: 07.`]},
    {q:`Show <code class="m">7 ∣ 3^(2n+1) + 2^(n+2)</code> for all n ≥ 0.`,
     w:[`Mod 7:  3^(2n+1) = 3·9^n ≡ 3·2^n   (since 9 ≡ 2).`,`2^(n+2) = 4·2^n.`,`Sum ≡ (3+4)·2^n = 7·2^n ≡ 0. ∎`]}
   ],aside:`φ(100) = 40, but the order of 7 is only 4. Orders divide φ, sometimes far smaller. Check the order first.`},

  {n:5,topic:'Number theory',part:'III',title:'Orders and primitive roots',
   concept:`<p>The order ord_n(a) is the least k > 0 with a^k ≡ 1, and it always divides φ(n). A primitive root mod n is an element whose order is the full φ(n), a generator of the units. They exist only for n = 1, 2, 4, p^k, and 2p^k.</p>`,
   probs:[
    {q:`Show 3 is a primitive root mod 7.`,
     w:[`Powers of 3 mod 7:  3, 2, 6, 4, 5, 1.`,`They hit all of 1..6 before repeating, so the order is 6 = φ(7). ∎`]},
    {q:`<code class="m">x² ≡ −1 (mod p)</code> is solvable iff p ≡ 1 (mod 4).`,
     w:[`A solution is exactly an element of order 4 in the units mod p.`,`The units are cyclic of order p−1, which has an order-4 element iff 4 ∣ p−1.`,`So solvable ⇔ p ≡ 1 (mod 4). ∎`]}
   ],aside:`This is the door to "every prime ≡ 1 (mod 4) is a sum of two squares." Parked it for later.`},

  {n:6,topic:'Combinatorics',part:'I',title:'Bijections and double counting',
   concept:`<p>Two moves. Count one set two different ways and set the answers equal, or biject your set onto one you already understand. You rarely compute anything; you describe the same object twice and read off an identity.</p>`,
   probs:[
    {q:`<code class="m">Σₖ C(n,k) = 2ⁿ</code>.`,
     w:[`Left: sum over k of the k-element subsets.`,`Right: each element is independently in or out.`,`Both count all subsets of an n-set. ∎`]},
    {q:`Vandermonde:  <code class="m">Σₖ C(m,k)·C(n,r−k) = C(m+n, r)</code>.`,
     w:[`Choose r people from m men and n women.`,`Right side counts it directly; left side splits by k = how many are men.`,`Same count. ∎`]}
   ],aside:`The handshake lemma, Σ deg = 2·E, is the same trick: count edge-endpoints two ways.`},

  {n:7,topic:'Combinatorics',part:'II',title:'Pigeonhole, the non-obvious kind',
   concept:`<p>Trivial to state, and the entire game is choosing the holes. Pick the pigeonholes well and it is one line; pick them badly and the problem looks impossible.</p>`,
   probs:[
    {q:`Any n+1 numbers from <code class="m">{1,…,2n}</code> include two where one divides the other.`,
     w:[`Write each number as 2^a · (odd part).`,`There are only n odd numbers in range, so n possible odd parts.`,`n+1 numbers, n holes → two share an odd part → the smaller divides the larger. ∎`]},
    {q:`Among any 5 points in a unit square, two are within <code class="m">√2⁄2</code>.`,
     w:[`Cut the square into four ½×½ squares.`,`Five points, four cells → two share a cell.`,`That cell's diagonal is √2⁄2. ∎`]}
   ],aside:`The "odd part" holes cost me an hour. Once you see the right holes it is nothing.`},

  {n:8,topic:'Combinatorics',part:'III',title:'Generating functions',
   concept:`<p>Hang a sequence on the coefficients of a power series, then do algebra on the series. Recurrences turn into equations you can actually solve, and identities drop out of manipulations you already know.</p>`,
   probs:[
    {q:`Fibonacci generating function.`,
     w:[`Let F(x) = Σ F_n x^n. The recurrence gives F(x) = x / (1 − x − x²).`,`Partial fractions over the roots lands on Binet's closed form with φ and ψ.`]},
    {q:`Catalan numbers.`,
     w:[`Splitting at the first return gives C(x) = 1 + x·C(x)².`,`Solve the quadratic in C(x):  C(x) = (1 − √(1−4x)) / (2x).`,`Expanding gives C_n = (1/(n+1))·C(2n, n).`]}
   ],aside:`Solving a recurrence with the literal quadratic formula was the moment this clicked. Felt illegal.`},

  {n:9,topic:'Combinatorics',part:'IV',title:'The probabilistic method',
   concept:`<p>To prove an object exists, build a random one and show it works with positive probability. If the expected number of bad events is below 1, some outcome has none. No construction needed.</p>`,
   probs:[
    {q:`Every graph has a bipartite subgraph with at least <code class="m">E⁄2</code> edges.`,
     w:[`Two-color the vertices at random, each side by a fair coin.`,`An edge is cut (endpoints differ) with probability ½.`,`Expected cut edges = E/2, so some coloring cuts at least E/2. ∎`]},
    {q:`Ramsey lower bound  <code class="m">R(k,k) > 2^(k⁄2)</code>.`,
     w:[`Color the edges of K_n at random.`,`Expected monochromatic K_k = C(n,k)·2^(1 − C(k,2)).`,`At n = 2^(k/2) this is < 1, so a coloring with no mono K_k exists. ∎`]}
   ],aside:`Nonconstructive, which bugged me: it proves the thing is there without handing it to you.`},

  {n:10,topic:'Game theory',part:'I',title:'Nim and the XOR rule',
   concept:`<p>Impartial games (same moves for both, last move wins) split into P-positions, where the player about to move loses, and N-positions. All of Nim is one number: XOR the pile sizes. It is a P-position exactly when that XOR is 0.</p>`,
   probs:[
    {q:`Prove the Nim XOR rule.`,
     w:[`If the XOR is 0: any move changes one pile, so it cannot keep the XOR at 0.`,`If the XOR is s ≠ 0: take the top set bit of s; some pile has it; reduce that pile to (pile XOR s), which is smaller and makes the new XOR 0.`,`So from XOR ≠ 0 you can always hand back a 0. ∎`]},
    {q:`Piles (3, 4, 5): who wins, and give a move.`,
     w:[`3 XOR 4 XOR 5 = 2 ≠ 0, so the mover wins.`,`Target: change some pile p to p XOR 2.  3 → 1  (take 2 off the 3-pile).`,`Check: 1 XOR 4 XOR 5 = 0. ∎`]}
   ],aside:`Spent the whole session just believing the XOR claim. Then the proof is four lines.`},

  {n:11,topic:'Game theory',part:'II',title:'Sprague–Grundy',
   concept:`<p>Every impartial position equals a single Nim pile. Its size is the Grundy value g = mex (minimum excluded non-negative integer) of the Grundy values you can move to. A sum of independent games has Grundy value equal to the XOR of the parts.</p>`,
   probs:[
    {q:`Subtraction game, remove <code class="m">{1,2,3}</code> tokens.`,
     w:[`g(0) = 0, and g(n) = mex{ g(n−1), g(n−2), g(n−3) }.`,`This gives g(n) = n mod 4. Losing positions are the multiples of 4.`]},
    {q:`Two such piles, sizes 5 and 6.`,
     w:[`g(5) = 5 mod 4 = 1,  g(6) = 6 mod 4 = 2.`,`XOR = 1 XOR 2 = 3 ≠ 0 → first player wins. ∎`]}
   ],aside:`mex is the only new idea. g means "this position IS a Nim pile of size g," which is why sums XOR.`},

  {n:12,topic:'Game theory',part:'III',title:'Strategy stealing and pairing',
   concept:`<p>Two ways to name a winner without naming a move. Strategy stealing: if moving second could win, the first player could have stolen that plan by playing anywhere first, a contradiction, so the first player wins. Pairing: the second player pre-pairs the board and always replies in the partner cell.</p>`,
   probs:[
    {q:`Chomp: the first player wins (poison square in the corner).`,
     w:[`Suppose the second player had a winning reply to the top-right bite.`,`Then the first player bites the top-right square first and adopts that reply.`,`So a second-player win is impossible; the first player wins. Existence only, no explicit move. ∎`]},
    {q:`Pairing to force a draw.`,
     w:[`If the cells split into pairs, the second player answers every move in its partner cell.`,`This blocks any line that needs both cells of a pair, forcing at least a draw.`]}
   ],aside:`Strategy stealing feels almost unfair. It proves who wins while telling you nothing about how.`},

  {n:13,topic:'Graph theory',part:'',title:'Coloring and the Mantel bound',
   concept:`<p>Two anchors. Chromatic number χ, bounded by a greedy argument, and extremal edge counts, bounded by forbidding a subgraph. Both show up constantly once problems move onto graphs.</p>`,
   probs:[
    {q:`Greedy coloring gives <code class="m">χ ≤ Δ+1</code>.`,
     w:[`Color vertices in any order. Each has at most Δ already-colored neighbors.`,`So among Δ+1 colors one is always free. ∎`]},
    {q:`Mantel: a triangle-free graph on n vertices has at most <code class="m">⌊n²⁄4⌋</code> edges.`,
     w:[`If uv is an edge, u and v share no neighbor, so deg(u) + deg(v) ≤ n.`,`Sum that over all edges and push it through Cauchy-Schwarz on the degrees.`,`Equality is the balanced complete bipartite graph. ∎`]}
   ],aside:`"The endpoints of an edge have degree sum ≤ n" is the entire proof of Mantel. Very clean.`},

  {n:14,topic:'Inequalities',part:'',title:'AM-GM and Cauchy-Schwarz',
   concept:`<p>Three tools do most of the work: AM-GM, Cauchy-Schwarz, and rearrangement. The skill is pattern-matching which one a problem is secretly asking for.</p>`,
   probs:[
    {q:`AM-GM for all n by forward-backward induction.`,
     w:[`Prove it for powers of 2 by repeatedly doubling the two-variable case.`,`Then step down from n to n−1: set the missing term equal to the mean of the rest.`,`Induction running both directions. Callback to session 1: it does not have to go n → n+1.`]},
    {q:`Cauchy-Schwarz, Engel form  <code class="m">Σ aᵢ²⁄bᵢ ≥ (Σaᵢ)² ⁄ Σbᵢ</code>.`,
     w:[`Set a_i = 1 to get Σ 1/x_i ≥ n² / Σ x_i, which is AM-HM.`,`Same inequality, two disguises.`]}
   ],aside:`Forward-backward induction was the surprise of the week. Induction does not have to march upward.`},

  {n:15,topic:'Polynomials',part:'',title:'Vieta and symmetric functions',
   concept:`<p>The coefficients of a polynomial are the symmetric functions of its roots. That dictionary, Vieta, turns "prove something about the roots" into arithmetic on coefficients, with no root-finding.</p>`,
   probs:[
    {q:`Rational root theorem: a root <code class="m">p⁄q</code> in lowest terms of an integer polynomial has p ∣ a₀ and q ∣ aₙ.`,
     w:[`Plug in p/q and clear denominators by q^n.`,`Every term but a_0·q^n carries a factor p, so p ∣ a_0·q^n; gcd(p,q)=1 forces p ∣ a_0.`,`The symmetric argument on the other end gives q ∣ a_n. ∎`]},
    {q:`For <code class="m">x³ − 6x² + 11x − 6</code>, find Σr².`,
     w:[`Vieta: Σr = 6, Σ r_i r_j = 11.`,`Σr² = (Σr)² − 2·Σ r_i r_j = 36 − 22 = 14.`,`(Roots are 1, 2, 3, and 1+4+9 = 14 checks.)`]}
   ],aside:`Newton's identities push this further, turning the symmetric sums into power sums Σ r^k. Used them to get Σ r³.`},

  {n:16,topic:'Recurrences',part:'',title:'Characteristic equations, and the bridge to algorithms',
   concept:`<p>Linear recurrences solve by their characteristic equation, the same move as constant-coefficient differential equations. This is where the math meets computer science: divide-and-conquer running times are recurrences too.</p>`,
   probs:[
    {q:`Solve <code class="m">aₙ = 3aₙ₋₁ − 2aₙ₋₂</code>.`,
     w:[`Characteristic:  x² − 3x + 2 = (x−1)(x−2) = 0.`,`So a_n = A·1^n + B·2^n; fix A, B from two starting values.`]},
    {q:`Binary strings of length n with no "11".`,
     w:[`Let a_n be the count. Last bit 0 → any valid string of length n−1.`,`Last bit 1 → the bit before is 0 → any valid string of length n−2.`,`So a_n = a_{n−1} + a_{n−2}. Fibonacci again (session 8).`]}
   ],aside:`The no-"11" strings landing on Fibonacci was the best "wait, same recurrence" moment of the run.`},

  {n:17,topic:'Algorithms',part:'',title:'Invariants again, now for correctness and termination',
   concept:`<p>The invariant idea from session 2 is exactly how you prove an algorithm is right and that it stops. A loop invariant is a statement the loop keeps true; a monovariant is a quantity that strictly decreases and is bounded below, which forces termination.</p>`,
   probs:[
    {q:`Euclid's algorithm is correct and terminates.`,
     w:[`Invariant: gcd(a, b) = gcd(b, a mod b), so the gcd never changes.`,`Monovariant: the second entry strictly decreases and stays ≥ 0, so it must reach 0.`,`At 0 the first entry is the gcd. ∎`]},
    {q:`Water-jug puzzle: jugs of size a and b measure exactly the multiples of <code class="m">gcd(a,b)</code>.`,
     w:[`Every pour changes the stored total by ±a or ±b.`,`So the amount stays a multiple of gcd(a,b), and Bézout shows every such multiple is reachable.`,`Session 3 wearing a different hat.`]}
   ],aside:`Everything looped back. Invariants in number theory, in games, and in algorithms are one idea in different clothes. Good place to pause.`}
  ];
  /* [EDIT] set these to your real session dates */
  const DATES=['Sep 13, 2025','Sep 20, 2025','Sep 27, 2025','Oct 4, 2025','Oct 11, 2025','Oct 18, 2025','Oct 25, 2025','Nov 1, 2025','Nov 8, 2025','Nov 15, 2025','Nov 22, 2025','Dec 6, 2025','Dec 13, 2025','Jan 3, 2026','Jan 10, 2026','Jan 17, 2026','Jan 24, 2026'];
  const NEXT=[
   `redo the stamps with 3¢ and 7¢ and find the largest amount you can't make (K called it Frobenius).`,
   `do the 15-puzzle parity on my own before next week.`,
   `prove gcd(a,b)·lcm(a,b) = ab, and the identity gcd(Fₘ, Fₙ) = F₍gcd(m,n)₎.`,
   `find the order of 2 mod 101. K hinted it divides 100.`,
   `read up on quadratic residues. K wants to do sum-of-two-squares next time.`,
   `prove the hockey-stick identity two different ways.`,
   `Erdős–Szekeres: any sequence of length n²+1 has a monotone subsequence of length n+1. K says it's pigeonhole.`,
   `use generating functions to count the partitions of 6, then check by listing them.`,
   `find a tournament with many Hamiltonian paths (K called it Szele's theorem).`,
   `work out misère Nim. K warned the rule only flips near the very end.`,
   `compute Grundy values for a 1×n strip (Dawson's chess).`,
   `prove Hex can never end in a draw.`,
   `Turán's theorem in general, for K_r-free graphs. Mantel is just the r = 3 case.`,
   `prove the power-mean inequality. K says it swallows AM-GM-HM.`,
   `Newton's identities: use them to get Σr³ for today's cubic.`,
   `solve the Tower of Hanoi recurrence and the derangement one, Dₙ = (n−1)(Dₙ₋₁ + Dₙ₋₂).`,
   `wrap-up. K said to pick one thread to go deep on next term. leaning toward sum-of-two-squares.`
  ];
  const index=document.getElementById('nvIndex'), content=document.getElementById('nvContent');
  document.getElementById('nvCount').textContent=SESS.length+' sessions';
  index.innerHTML=SESS.map((s,i)=>`<button class="nv-item" data-i="${i}"><span class="n">${String(s.n).padStart(2,'0')}</span>${s.topic}${s.part?' '+s.part:''}</button>`).join('');
  function show(i){
    const s=SESS[i];
    content.innerHTML=
      `<div class="nv-topic">${s.topic}${s.part?' · part '+s.part:''}</div>`+
      `<div class="nv-h">${s.title}</div>`+
      `<div class="nv-meta"><span class="rec"></span>Zoom with Kirill · ${DATES[i]||''}</div>`+
      `<div class="nv-lbl">Concept</div>${s.concept}`+
      `<div class="nv-lbl">Problems I worked</div>`+
      s.probs.map(p=>`<div class="nv-prob"><div class="q">${p.q}</div><div class="nv-work">${p.w.map(esc).join('\n')}</div></div>`).join('')+
      (s.aside?`<div class="nv-aside">${s.aside}</div>`:'')+
      (NEXT[i]?`<div class="nv-next"><span>→ next</span>${NEXT[i]}</div>`:'');
    [...index.children].forEach((b,j)=>b.classList.toggle('on',j===i));
    content.scrollTop=0;
  }
  index.addEventListener('click',e=>{const b=e.target.closest('.nv-item');if(b)show(+b.dataset.i);});
  const open=()=>{nv.hidden=false;show(0);};
  const close=()=>{nv.hidden=true;};
  const ob=document.getElementById('openNotes'); if(ob) ob.addEventListener('click',open);
  document.getElementById('nvClose').addEventListener('click',close);
  nv.addEventListener('click',e=>{if(e.target===nv)close();});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!nv.hidden)close();});
})();

/* ================= INTERACTIVE TERMINAL ================= */
(function(){
  const body=document.getElementById('termBody'), inp=document.getElementById('termIn');
  if(!body||!inp) return;
  const print=(html,cls)=>{const d=document.createElement('div');d.className='term-line'+(cls?' '+cls:'');d.innerHTML=html;body.appendChild(d);body.scrollTop=body.scrollHeight;};
  const echo=cmd=>print('<span class="tp">adrian@os:~$</span>'+cmd.replace(/</g,'&lt;'));
  const go=sel=>{const el=document.querySelector(sel); if(el)el.scrollIntoView({behavior:'smooth'});};
  const REPOS={lstm:'lstm-equity-forecaster',finbert:'finbert-sentiment-analyzer',fraud:'fraud-detection-system'};
  const PAPERS={langllm:'/papers/langllm-poster-urtc2026.pdf',curated:'/papers/curated-to-win-arrsi2026.pdf?v=2026-10-12',portfolio:'/papers/portfolio-optimization-vs-equal-weight.pdf?v=2026-10-02',robustness:'/papers/legatum-robustness-audit.pdf?v=2026-09-13'};
  const SEC={about:'#about',experience:'#experience',record:'#record',research:'#papers',projects:'#work',fencing:'#fencing',contact:'#contact'};
  const CMDS={
    help:()=>print("nav: <b>ls</b> · <b>open &lt;project&gt;</b> · <b>read &lt;paper&gt;</b> · <b>goto &lt;section&gt;</b> · <b>resume short|long</b> · <b>email</b><br>info: <b>whoami</b> · <b>stack</b> · <b>fencing</b> · <b>fortune</b> · <b>clear</b>",'dim'),
    whoami:()=>print("Adrian Erlikhman — 17, Los Angeles. Senior @ LACES. ML research, quant, and data."),
    ls:()=>print("projects: <b>lstm</b> · <b>finbert</b> · <b>fraud</b>   papers: <b>curated</b> · <b>portfolio</b> · <b>robustness</b><br>→ e.g. <b>open lstm</b>  or  <b>read portfolio</b>",'dim'),
    open:a=>{const k=(a||'').toLowerCase(); if(REPOS[k]){print("opening github.com/adrian-erlikhman/"+REPOS[k]+" …");window.open('https://github.com/adrian-erlikhman/'+REPOS[k],'_blank');}else print("no project '"+k+"' — try: lstm · finbert · fraud",'dim');},
    read:a=>{const k=(a||'').toLowerCase(); if(PAPERS[k]){print("opening "+PAPERS[k]+" …");window.open(PAPERS[k],'_blank');}else if(k==='complm'||k==='compllm'){print("CompLLM is a preprint, arXiv forthcoming — jumping to Research.");go('#papers');}else print("no paper '"+k+"' — try: langllm · curated · portfolio · robustness",'dim');},
    goto:a=>{const k=(a||'').toLowerCase(); if(SEC[k]){print("→ "+k);go(SEC[k]);}else print("no section '"+k+"' — try: "+Object.keys(SEC).join(' · '),'dim');},
    cd:a=>CMDS.goto(a),
    projects:()=>{print("→ opened Projects. (type <b>ls</b> to list, <b>open &lt;name&gt;</b> for a repo)");go('#work');},
    research:()=>{print("→ opened Research. (type <b>read &lt;name&gt;</b> to open a PDF)");go('#papers');},
    stack:()=>print("Python · PyTorch · TensorFlow · scikit-learn · FinBERT · Pandas · NumPy · SQL · Java · JavaScript"),
    fencing:()=>{print("Épée, A-rated · Team USA · Top 8 Cadet (U17) Pan-Ams. → opened Fencing.");go('#fencing');},
    contact:()=>print('email → <a href="mailto:erlikhman.adrian@gmail.com">erlikhman.adrian@gmail.com</a> · <a href="https://github.com/adrian-erlikhman" target="_blank">github</a>'),
    email:()=>{print("opening mail …");location.href='mailto:erlikhman.adrian@gmail.com';},
    resume:a=>{const k=(a||'').toLowerCase(), opt=(k==='short'||k==='long')&&document.querySelector(`#cvMenu [data-cv="${k}"]`);
      if(opt){print("opening the "+k+" résumé …");window.open(opt.getAttribute('href'),'_blank');}
      else{const l=v=>{const o=document.querySelector(`#cvMenu [data-cv="${v}"]`);return `<a href="${o.getAttribute('href')}" target="_blank">resume ${v}</a> (${o.querySelector('.cvm-p').textContent})`;};
        print("two versions: "+l('short')+" · "+l('long'),'dim');}},
    fortune:()=>print("\"estimating expected returns is the hard part.\" — the portfolio paper, basically",'dim'),
    sudo:()=>print("nice try. you don't have root on adrian.os :)",'dim'),
    clear:()=>{body.innerHTML='';},
  };
  print("welcome to <b>adrian.os</b>. type <b>help</b> — or <b>ls</b> to explore.",'dim');
  inp.addEventListener('keydown',e=>{
    if(e.key!=='Enter') return;
    const raw=inp.value.trim(); inp.value=''; if(!raw) return;
    echo(' '+raw);
    const parts=raw.split(/\s+/), cmd=parts[0].toLowerCase(), arg=parts.slice(1).join(' ');
    (CMDS[cmd] || (()=>print("command not found: "+cmd.replace(/</g,'&lt;')+" — try <b>help</b>",'dim')))(arg);
  });
  // focus only when the user clicks into it (don't hijack scroll/load)
  document.getElementById('term').addEventListener('click',()=>inp.focus());
})();

/* animated glitch favicon removed — clean static pixel favicon (favicon.svg) */

/* ================= LIVE GITHUB PROOF ================= */
(function(){
  const cards=[...document.querySelectorAll('.proj')]; if(!cards.length) return;
  const rel=iso=>{const d=(Date.now()-new Date(iso).getTime())/86400000;
    if(d<1)return 'today'; if(d<2)return 'yesterday'; if(d<30)return Math.floor(d)+'d ago';
    if(d<365)return Math.floor(d/30)+'mo ago'; return Math.floor(d/365)+'y ago';};
  fetch('https://api.github.com/users/adrian-erlikhman/repos?per_page=100&sort=updated')
    .then(r=>r.ok?r.json():Promise.reject(r.status))
    .then(repos=>{
      const map={}; repos.forEach(r=>map[r.name.toLowerCase()]=r);
      cards.forEach(card=>{
        const link=card.querySelector("a[href*='github.com/adrian-erlikhman/']"); if(!link) return;
        const name=link.getAttribute('href').split('/').pop().toLowerCase();
        const r=map[name]; if(!r||!r.language) return;
        const el=document.createElement('div'); el.className='repo-stat';
        el.innerHTML='<span><span class="dot"></span>'+r.language+'</span><span>public repo</span>';
        const actions=card.querySelector('.proj-actions');
        actions ? card.insertBefore(el,actions) : card.appendChild(el);
      });
    }).catch(()=>{});   // fail silently (offline / rate-limited) — cards still work
})();

/* ================= KONAMI EASTER EGG ================= */
(function(){
  const seq=['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
  let i=0;
  addEventListener('keydown',e=>{
    const k=e.key.toLowerCase();
    i = (k===seq[i]) ? i+1 : (k===seq[0] ? 1 : 0);
    if(i===seq.length){ i=0; boom(); }
  });
  function boom(){
    const g=document.createElement('div'); g.className='kglitch'; document.body.appendChild(g);
    setTimeout(()=>g.remove(),950);
    const t=document.createElement('div'); t.className='toast';
    t.innerHTML='▲▲▼▼◄►◄► B A — <b>cheat accepted.</b> you clearly know your way around a keyboard. now hire me → erlikhman.adrian@gmail.com';
    document.body.appendChild(t); requestAnimationFrame(()=>t.classList.add('show'));
    setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),400);},4500);
    const body=document.getElementById('termBody');
    if(body){const d=document.createElement('div');d.className='term-line';d.innerHTML='<span class="tp">adrian@os:~$</span> <b>root access granted.</b> jk — but seriously, let’s talk.';body.appendChild(d);body.scrollTop=body.scrollHeight;}
  }
})();

/* ================= HERO STORY — four lines that swipe past on their own; dots jump, hover pauses ================= */
(function(){
  const story=document.getElementById('heroStory'); if(!story) return;
  const lines=[...story.querySelectorAll('.sl')];
  const dots=[...document.querySelectorAll('.story-dots button')];
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;   /* the lines stay stacked */
  document.documentElement.classList.add('js-story');
  const EVERY=3200;
  let cur=-1,timer=null,held=false;
  function set(i){
    const prev=cur; cur=(i+lines.length)%lines.length;
    /* the outgoing line always leaves to the left and the next enters from the right, wrap included */
    lines.forEach((l,j)=>{ l.classList.toggle('on',j===cur); l.classList.toggle('past',j===prev&&j!==cur); l.setAttribute('aria-hidden',j===cur?'false':'true'); });
    dots.forEach((d,j)=>d.setAttribute('aria-current',j===cur?'true':'false'));
  }
  function run(){ clearInterval(timer); timer=setInterval(()=>{ if(!held&&!document.hidden) set(cur+1); },EVERY); }
  set(0); run();
  dots.forEach((d,j)=>d.addEventListener('click',()=>{ set(j); run(); }));
  [story,...dots].forEach(el=>{
    el.addEventListener('mouseenter',()=>{held=true;});
    el.addEventListener('mouseleave',()=>{held=false;});
  });
  story.addEventListener('focusin',()=>{held=true;});
  story.addEventListener('focusout',()=>{held=false;});
})();

// ACHIEVEMENTS WALL: pick a tile, its panel shows; it steps on its own while on screen until touched
(function(){
  const w=document.getElementById('awWall'),d=document.getElementById('awPanel');
  if(!w||!d) return;
  const bs=[...w.querySelectorAll('.aw-t')],its=[...d.querySelectorAll('.aw-it')],N=bs.length,DUR=6000;
  if(!N||its.length!==N) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* phones: the detail opens inside the wall, under the row of the tile that was picked, and nothing auto-advances
     (a panel that hops between rows on its own would shove the page around) */
  const narrow=matchMedia('(max-width: 700px)'), home=d.parentNode;
  let cur=0,timer=null,stopped=reduce||narrow.matches,onScreen=false;
  d.classList.add('js-aw');
  function place(){
    if(narrow.matches){ const g=bs[cur].dataset.g; const row=bs.filter(b=>b.dataset.g===g); const last=row[row.length-1]||bs[cur];
      if(last.nextElementSibling!==d) last.after(d); }
    else if(d.parentNode!==home) home.appendChild(d);
  }
  narrow.addEventListener('change',()=>{ if(narrow.matches) stop(); place(); });
  function arm(){ clearTimeout(timer); if(stopped||!onScreen) return;
    const b=bs[cur].querySelector('.aw-bar'); b.style.animation='none'; void b.offsetWidth; b.style.animation='';
    timer=setTimeout(()=>show(cur+1),DUR); }
  function show(i,focus){ cur=(i+N)%N; place();
    bs.forEach((b,j)=>{ b.setAttribute('aria-selected',j===cur?'true':'false'); b.tabIndex=j===cur?0:-1; });
    its.forEach((x,j)=>{ x.hidden=j!==cur; if(j===cur){ const y=x.querySelector('.aw-body'); y.classList.remove('swap'); void y.offsetWidth; y.classList.add('swap'); } });
    if(focus) bs[cur].focus();
    arm(); }
  function stop(){ stopped=true; clearTimeout(timer); w.classList.remove('auto'); }
  bs.forEach((b,j)=>{
    b.addEventListener('click',()=>{ stop(); show(j);
      // phones: the panel sits under the wall, so bring it up if it is mostly off screen
      const r=d.getBoundingClientRect(); if(innerWidth<900&&r.top>innerHeight-220) d.scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest'}); });
    b.addEventListener('mouseenter',()=>{ if(matchMedia('(hover:hover)').matches){ stop(); show(j); } });
  });
  w.addEventListener('keydown',e=>{ const cols=getComputedStyle(w).gridTemplateColumns.split(' ').length;
    const m={ArrowRight:1,ArrowLeft:-1,ArrowDown:cols,ArrowUp:-cols}[e.key];
    if(m){ e.preventDefault(); stop(); show(cur+m,true); }
    else if(e.key==='Home'){ e.preventDefault(); stop(); show(0,true); }
    else if(e.key==='End'){ e.preventDefault(); stop(); show(N-1,true); } });
  d.querySelector('.aw-nav').addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; stop(); show(cur+(+b.dataset.d)); });
  if(!reduce){ w.classList.add('auto'); w.style.setProperty('--aw-dur',DUR+'ms'); }
  show(0);
  new IntersectionObserver(es=>es.forEach(en=>{ onScreen=en.isIntersecting; if(onScreen) arm(); else clearTimeout(timer); }),{threshold:.3}).observe(w);
})();

// ASK ADRIAN: click a question, its file's lines appear one by one (the first answers itself)
(function(){
  const box=document.getElementById('askBox');
  if(!box) return;
  const qs=[...box.querySelectorAll('.ask-q')],ps=[...box.querySelectorAll('.ask-p')],area=box.querySelector('.ask-as');
  if(!qs.length||qs.length!==ps.length) return;
  box.classList.add('js-ask');
  ps.forEach(p=>p.querySelectorAll('.ask-code .l').forEach((l,n)=>l.style.setProperty('--n',n)));
  // hold the tallest answer's height so the hero doesn't jump as answers change
  function hold(){ area.style.minHeight=''; let h=0;
    ps.forEach(p=>{ const was=p.hidden; p.hidden=false; h=Math.max(h,p.offsetHeight); p.hidden=was; });
    area.style.minHeight=(h+30)+'px'; }
  let cur=-1;
  function show(i,focus){
    if(i===cur) return; cur=i;
    qs.forEach((q,j)=>{ q.setAttribute('aria-selected',j===i?'true':'false'); q.tabIndex=j===i?0:-1; });
    ps.forEach((p,j)=>{ p.hidden=j!==i; });
    if(focus) qs[i].focus();
  }
  qs.forEach((q,i)=>q.addEventListener('click',()=>show(i)));
  box.querySelector('.ask-qs').addEventListener('keydown',e=>{
    const k={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];
    if(k){ e.preventDefault(); show((cur+k+qs.length)%qs.length,true); } });
  hold(); addEventListener('resize',hold);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(hold);
  show(0);
})();
