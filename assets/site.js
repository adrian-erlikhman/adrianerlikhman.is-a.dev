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
   lunge to the chest, wrist, mask or foot, flèche, parry-riposte, stop-hit, beat-lunge, balestra-lunge, feint-disengage, remise, or a double (no right
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
  // balestra: a hop forward, land, and lunge off it
  const HOP=ov(T(G,5,-7),{bf:[27,33],ff:[42,33]}),LAND=T(G,7);
  // feint-disengage: threaten high, they parry the air, the point drops under to the wrist
  const FEINT=ov(G,{se:[38,14],hand:[45,12],tip:[71,5]});
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
    balestra:{dur:1100,hit:.6,s:[[0,G],[.18,HOP],[.32,LAND],[.44,EXT],[.6,LUNGE],[.82,LUNGE],[1,G]],o:[[0,G],[.36,G],[.6,G],[.7,REC],[.86,REC],[1,G]]},
    feint:{dur:1200,hit:.58,s:[[0,G],[.2,FEINT],[.4,FEINT],[.58,WRIST],[.82,WRIST],[1,G]],o:[[0,G],[.24,G],[.38,PARRY],[.58,PARRY],[.68,REC_ARM],[.84,REC_ARM],[1,G]]},
    remise:{dur:1300,hit:.62,s:[[0,G],[.14,EXT],[.32,LS],[.42,DEFL],[.62,LUNGE],[.84,LUNGE],[1,G]],o:[[0,G],[.3,G],[.42,PARRY],[.62,PARRY],[.72,REC],[.86,REC],[1,G]]},
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
    balestra:[['balestra, lunge!','jumped in and lunged'],['their balestra got you','hop, lunge. too quick']],
    feint:[['feint high, hit the wrist','feint, disengage. fooled them'],['they feinted. you bit','feint, disengage. got you']],
    remise:[['remise! stayed down and hit','parried, but the remise lands'],['their remise got you','they stayed in. remise']],
    beat:[['beat, then lunge','beat the blade, then in'],['they beat your blade','beat-attack. got you']]
  };
  const KINDS=['chest','mask','foot','foot','wrist','fleche','fleche','parry','stop','beat','balestra','feint','remise'];
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

  /* SWARM (19 Oct): particles orbit, lock into the name (the cursor pushes them), then burst open onto the page */
  const cvs=document.getElementById('introCanvas'),ctx=cvs.getContext('2d');
  let W,H,DPR;
  const resize=()=>{DPR=Math.min(devicePixelRatio||1,2);W=cvs.width=innerWidth*DPR;H=cvs.height=innerHeight*DPR;};
  resize();
  const css=getComputedStyle(document.documentElement);
  const ACC=css.getPropertyValue('--acc').trim()||'#1f3a5f', BG=css.getPropertyValue('--bg').trim()||'#fbfaf7', LB='#9db8e0';
  const NAME='adrian erlikhman', CY=.46;
  let mx=-9e3,my=-9e3;
  addEventListener('pointermove',e=>{mx=e.clientX*DPR;my=e.clientY*DPR;});
  const ease=p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2, eo=p=>1-Math.pow(1-p,3), cl=x=>Math.max(0,Math.min(1,x)), rnd=(a,b)=>a+Math.random()*(b-a);
  let P=[],start=0,burst=0,raf;
  function targets(){
    const o=document.createElement('canvas');o.width=W;o.height=H;const c=o.getContext('2d');
    let fs=Math.min(W*.11,170*DPR);c.font=`700 ${fs}px "LM Roman",serif`;
    while(c.measureText(NAME).width>W*.86){fs*=.95;c.font=`700 ${fs}px "LM Roman",serif`;}
    c.textAlign='center';c.textBaseline='middle';c.fillText(NAME,W/2,H*CY);
    const d=c.getImageData(0,0,W,H).data,step=Math.round((W<900*DPR?2.4:2.6)*DPR),pts=[];
    for(let y=0;y<H;y+=step)for(let x=0;x<W;x+=step)if(d[(y*W+x)*4+3]>128)pts.push([x,y]);
    return pts;
  }
  function build(){
    P=targets().map(([tx,ty])=>({tx,ty,a:rnd(0,Math.PI*2),r:rnd(.15,.75)*Math.max(W,H)*.5,x:0,y:0,vx:0,vy:0,
      d:rnd(0,.5),c:Math.random()<.12?LB:ACC,s:rnd(1.3,2.3)*DPR}));
    start=performance.now();raf=requestAnimationFrame(draw);
  }
  function open(){ // the burst: the page shows through a growing hole while the swarm flies out
    if(burst||done) return; burst=performance.now();
    for(const p of P){const dx=p.x-W/2,dy=p.y-H*CY,m=Math.hypot(dx,dy)+1;p.vx=dx/m*rnd(4,14)*DPR;p.vy=dy/m*rnd(4,14)*DPR;}
    intro.style.background='transparent';
    finishAfterBurst();
  }
  function draw(now){
    const t=(now-start)/1000;
    ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
    const lock=cl((t-.5)/1.3);
    for(const p of P){
      if(!burst){
        const k=ease(cl(lock*1.4-p.d*.8)),ang=p.a+t*(1.6-k)*(1.2+300/p.r);
        const ox=W/2+Math.cos(ang)*p.r*(1-k*.2),oy=H/2+Math.sin(ang)*p.r*.55;
        let x=ox+(p.tx-ox)*k,y=oy+(p.ty-oy)*k;
        const dx=x-mx,dy=y-my,dd=dx*dx+dy*dy,R=90*DPR;
        if(dd<R*R&&k>.9){const q=Math.sqrt(dd)+1,f=(1-q/R)*28*DPR;x+=dx/q*f;y+=dy/q*f;}
        p.x+=(x-p.x)*(t<.05?1:.35);p.y+=(y-p.y)*(t<.05?1:.35);
      }else{p.vx*=1.04;p.vy*=1.04;p.x+=p.vx;p.y+=p.vy;}
      ctx.fillStyle=p.c;ctx.fillRect(p.x,p.y,p.s,p.s);
    }
    if(burst){const r=eo(cl((now-burst)/900))*Math.hypot(W,H)*.6;
      ctx.save();ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(W/2,H*CY,r,0,7);ctx.fill();ctx.restore();
      if(now-burst>1000){intro.style.display='none';return;}}
    if(t>3.1&&!burst) open();
    raf=requestAnimationFrame(draw);
  }
  function finishAfterBurst(){ // like finish(), but the canvas does the exit instead of the clip-path wipe
    done=true;
    try{sessionStorage.setItem('introSeen','1');}catch(e){}
    if(siteDown){showOffline();return;}
    document.body.classList.remove('intro-lock');window.scrollTo(0,0);
    intro.style.pointerEvents='none';
    document.querySelectorAll('.hero h1 .ln').forEach(l=>l.classList.remove('go'));
    setTimeout(()=>document.querySelectorAll('.hero h1 .ln').forEach((l,i)=>setTimeout(()=>l.classList.add('go'),i*140)),320);
  }
  (document.fonts&&document.fonts.load?document.fonts.load(`700 40px "LM Roman"`).catch(()=>{}):Promise.resolve()).then(()=>{if(!done)build();});

  document.getElementById('skip').addEventListener('click',e=>{e.stopPropagation();open();});
  intro.addEventListener('click',()=>{if(performance.now()-start>1500)open();});
  addEventListener('keydown',e=>{if(e.key==='Enter'||e.key==='Escape')open();});
  setTimeout(()=>{if(!P.length)finish(false);},2500); // fonts never loaded: fall back to the plain wipe
  setTimeout(()=>{if(!done)open();},4200);          // failsafe
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
  const v=document.querySelector('.reel video,.cg-reel video'); if(!v) return;
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
    schedule();
  }
  function beep(){
    try{ const C=window.AudioContext||window.webkitAudioContext,ctx=new C();
      [0,.14].forEach(at=>{ const o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime+at;
        o.frequency.value=1760; g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.06,t+.01); g.gain.exponentialRampToValueAtTime(.0001,t+.11);
        o.connect(g).connect(ctx.destination); o.start(t); o.stop(t+.12); });
      setTimeout(()=>ctx.close(),600); }catch(e){}
  }
  /* auto-play (18 Oct, Adrian: "i want it to go through automatically with the timer"): each step holds STEP ms, its
     timer filling on the step bar; a paid tap rests, then the next store plays. It runs only while the demo is on screen;
     a manual step restarts the timer, and the pause button stops it. The beep only sounds on a tap the visitor made. */
  const STEP=3200,IDLE=1400,REST=4200;
  let auto=!REDUCED,onScreen=false,at=0;
  const ab=document.createElement('button'); ab.type='button'; ab.className='mt-bk mt-auto'; bk.after(ab);
  function schedule(){
    clearTimeout(at); bars.forEach(b=>b.classList.remove('run'));
    ab.textContent=auto?'❚❚':'▶'; ab.setAttribute('aria-label',auto?'Pause':'Play'); ab.classList.toggle('on',auto);
    if(!auto||!onScreen) return;
    const d=phase<0?IDLE:phase>=5?REST:STEP;
    if(phase>=0&&phase<5){ const b=bars[phase]; b.style.setProperty('--d',d+'ms'); void b.offsetWidth; b.classList.add('run'); }
    at=setTimeout(()=>{ if(phase>=5){ si=(si+1)%STORES.length; set(-1); } else set(phase<0?0:phase+1); },d);
  }
  ab.addEventListener('click',()=>{ auto=!auto; schedule(); });
  const set=(k,manual)=>{ const was=phase; phase=k; render(); if(manual&&phase>=5&&was<5) beep(); };
  go.addEventListener('click',()=>set(phase<0||phase>=5?0:phase+1,true));
  bk.addEventListener('click',()=>{ if(phase>0) set(phase-1,true); });
  bars.forEach(b=>b.addEventListener('click',()=>set(+b.dataset.k,true)));
  storesEl.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; si=+b.dataset.i; set(-1,true); });
  [L,R].forEach(n=>n.addEventListener('click',e=>{ const b=e.target.closest('.mt-done'); if(b) set(+b.dataset.k,true); }));
  root.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'){ e.preventDefault(); set(phase<0||phase>=5?0:phase+1,true); }
    else if(e.key==='ArrowLeft'&&phase>0){ e.preventDefault(); set(phase-1,true); }
  });
  new IntersectionObserver(es=>es.forEach(e=>{ onScreen=e.isIntersecting; schedule(); }),{threshold:.35}).observe(root);
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

/* WORK CANVAS (18 Oct, second take): six staggered tiles joined down the middle by connector wires; a tile opens its full
   card in a popup that closes with Esc, the Close button or a click outside. Links to #case-… or #lemma-track elsewhere
   on the page open the right popup. Without JS the cards sit in the page under the tiles. */
(function(){
  const cv=document.getElementById('wkCanvas'); if(!cv) return;
  const svg=cv.querySelector('.wk-wires'),nodes=[...cv.querySelectorAll('.wk-node')],xs=[...cv.querySelectorAll('.wk-x')];
  const NS='http://www.w3.org/2000/svg';
  /* the popup */
  const modal=document.createElement('div');
  modal.className='wk-modal'; modal.hidden=true; modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true');
  modal.innerHTML='<button type="button" class="wk-mclose"><span aria-hidden="true">&times;</span>Close<kbd aria-hidden="true">esc</kbd></button><div class="wk-mbox"></div>';
  const box=modal.querySelector('.wk-mbox'),closeBtn=modal.querySelector('.wk-mclose');
  xs.forEach(x=>{ x.hidden=true; box.appendChild(x); });
  document.body.appendChild(modal);
  cv.classList.add('armed');
  const tileOf=k=>cv.querySelector('.wk-node[data-k="'+k+'"] .wk-tile');
  const nameOf=k=>cv.querySelector('.wk-node[data-k="'+k+'"] .wk-pill b').textContent;
  const keyOf=id=>{ if(!id) return null; const el=document.getElementById(id),x=el&&el.closest('.wk-x'); return x?x.dataset.k:null; };
  let open=null,back=null,hideT=0;
  function show(k,target){
    clearTimeout(hideT); open=k;
    xs.forEach(x=>{ x.hidden=x.dataset.k!==k; });
    const x=document.getElementById('x-'+k); x.classList.remove('in'); void x.offsetWidth; x.classList.add('in');
    modal.setAttribute('aria-label',nameOf(k)); modal.hidden=false; modal.scrollTop=0;
    document.documentElement.classList.add('wk-lock');
    requestAnimationFrame(()=>modal.classList.add('on'));
    closeBtn.focus({preventScroll:true});
    if(target&&target!==x&&!target.classList.contains('wk')) setTimeout(()=>target.scrollIntoView({block:'start'}),60);
  }
  function close(){
    if(!open) return; open=null;
    modal.classList.remove('on'); document.documentElement.classList.remove('wk-lock');
    modal.querySelectorAll('video').forEach(v=>v.pause());
    hideT=setTimeout(()=>{ modal.hidden=true; xs.forEach(x=>{ x.hidden=true; }); },260);
    if(back) back.focus({preventScroll:true});
    if(keyOf(location.hash.slice(1))) history.replaceState(null,'',location.pathname+location.search);
  }
  nodes.forEach(n=>{ const t=n.querySelector('.wk-tile'); t.addEventListener('click',()=>{ back=t; show(n.dataset.k); }); });
  closeBtn.addEventListener('click',close);
  modal.addEventListener('mousedown',e=>{ if(e.target===modal) close(); });
  /* the red traffic light on every window bar in the popup closes it, like a Mac window */
  modal.querySelectorAll('.wk-dots i:first-child').forEach(d=>d.classList.add('wk-red'));
  modal.addEventListener('click',e=>{ if(e.target.closest('.wk-red')) close(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&open){ e.stopPropagation(); close(); } },true);
  modal.addEventListener('keydown',e=>{ if(e.key!=='Tab') return;
    const f=[...modal.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el=>el.offsetParent!==null||el===closeBtn);
    if(!f.length) return; const first=f[0],last=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); } });
  document.addEventListener('click',e=>{ const a=e.target.closest('a[href^="#"]'); if(!a) return; const id=a.getAttribute('href').slice(1),k=keyOf(id); if(!k) return;
    e.preventDefault(); const t=document.getElementById(id);
    if(open===k){ t.scrollIntoView({block:'start',behavior:REDUCED?'auto':'smooth'}); return; }
    back=tileOf(k); show(k,t); });

  /* wires. 24 Oct (Adrian picked 2b of _mock/wk-it.html, the hub): on wide screens every wire runs out from the page
     mark in the middle to one build, and hovering a build lights its wire and names it in the hub. On one-column
     screens the wires run down the left rail between consecutive builds, as before */
  const round=(pts,r)=>{ let d='M'+pts[0][0]+' '+pts[0][1];
    for(let i=1;i<pts.length-1;i++){ const [x0,y0]=pts[i-1],[x1,y1]=pts[i],[x2,y2]=pts[i+1];
      const d1=Math.hypot(x1-x0,y1-y0)||1,d2=Math.hypot(x2-x1,y2-y1)||1,rr=Math.min(r,d1/2,d2/2);
      d+=' L'+(x1+(x0-x1)/d1*rr)+' '+(y1+(y0-y1)/d1*rr)+' Q'+x1+' '+y1+' '+(x1+(x2-x1)/d2*rr)+' '+(y1+(y2-y1)/d2*rr); }
    const L=pts[pts.length-1]; return d+' L'+L[0]+' '+L[1]; };
  const wide=matchMedia('(min-width:901px)'),hub=cv.querySelector('.wk-hub'),hl=cv.querySelector('.wk-hl'),hl0=hl?hl.textContent:'';
  let state=0,raf=0,paths=[],ports=[],pulsed=false,mode='';
  const want=()=>wide.matches&&hub?'hub':'rail';
  function build(){
    mode=want(); svg.textContent=''; paths=[]; ports=[]; pulsed=false;
    const n=mode==='hub'?nodes.length:nodes.length-1;
    for(let i=0;i<n;i++){
      const p=document.createElementNS(NS,'path'); p.id='wkw'+i; svg.appendChild(p); paths.push(p);
      ports.push([0,1].map(()=>{ const o=document.createElementNS(NS,'circle'); o.setAttribute('class','port'); o.setAttribute('r','5.5'); return o; }));
    }
    ports.flat().forEach(o=>svg.appendChild(o));
  }
  function pulses(){
    if(pulsed||REDUCED) return; pulsed=true;
    paths.forEach((p,i)=>{
      const dot=document.createElementNS(NS,'circle'),m=document.createElementNS(NS,'animateMotion'),mp=document.createElementNS(NS,'mpath');
      dot.setAttribute('class','pulse'); dot.setAttribute('r','3');
      m.setAttribute('dur',Math.max(2.2,p.getTotalLength()/110).toFixed(2)+'s'); m.setAttribute('repeatCount','indefinite'); m.setAttribute('begin',(i*.5).toFixed(1)+'s');
      mp.setAttribute('href','#'+p.id); m.appendChild(mp); dot.appendChild(m); svg.insertBefore(dot,ports[0][0]);
    });
  }
  function draw(){
    raf=0;
    if(want()!==mode){ build(); if(state===2) pulses(); }
    const R=cv.getBoundingClientRect(); if(!R.width) return;
    svg.setAttribute('viewBox','0 0 '+R.width+' '+R.height);
    const rel=r=>({left:r.left-R.left,right:r.right-R.left,top:r.top-R.top,height:r.height,width:r.width});
    const T=nodes.map(n=>rel(n.querySelector('.wk-tile').getBoundingClientRect()));
    const set=(i,pts,d)=>{ const p=paths[i]; p.setAttribute('d',d);
      if(state===0&&!REDUCED){ const len=p.getTotalLength(); p.style.strokeDasharray=len; p.style.strokeDashoffset=len; }
      pts.forEach(([x,y],j)=>{ ports[i][j].setAttribute('cx',x); ports[i][j].setAttribute('cy',y); }); };
    if(mode==='hub'){
      const H=rel(hub.getBoundingClientRect()),cx=H.left+H.width/2,cy=H.top+H.height/2,rad=H.width/2+12;
      T.forEach((t,i)=>{
        const left=t.left+t.width/2<cx,ex=left?t.right:t.left,ey=t.top+t.height/2;
        const a=Math.atan2((ey-cy)*.6,ex-cx),hx=cx+Math.cos(a)*rad,hy=cy+Math.sin(a)*rad,mx=(hx+ex)/2;
        set(i,[[hx,hy],[ex,ey]],'M'+hx+' '+hy+' C'+mx+' '+hy+' '+mx+' '+ey+' '+ex+' '+ey);
      });
    } else {
      for(let i=0;i<paths.length;i++){ const A=T[i],B=T[i+1],ya=A.top+A.height*.64,yb=B.top+B.height*.36,gx=A.left-Math.min(15,A.left/2);
        const pts=[[A.left,ya],[gx,ya],[gx,yb],[B.left,yb]]; set(i,[pts[0],pts[3]],round(pts,9)); }
    }
  }
  const later=()=>{ if(!raf) raf=requestAnimationFrame(draw); };
  build();
  if('ResizeObserver' in window) new ResizeObserver(later).observe(cv); else addEventListener('resize',later);
  wide.addEventListener('change',later);
  draw();
  new IntersectionObserver((es,io)=>es.forEach(e=>{ if(!e.isIntersecting) return; io.disconnect(); state=1;
    paths.forEach((p,i)=>{ p.style.transition='stroke-dashoffset .9s cubic-bezier(.65,0,.35,1) '+(.25+i*.12)+'s'; requestAnimationFrame(()=>{ p.style.strokeDashoffset='0'; }); });
    setTimeout(()=>{ state=2; paths.forEach(p=>{ p.style.transition=''; p.style.strokeDasharray=''; p.style.strokeDashoffset=''; }); pulses(); draw(); },REDUCED?0:1300+paths.length*120);
  }),{threshold:0}).observe(cv);

  /* hover: the build's wire and ports light up, the hub names it, and the other builds step back */
  const hot=(i,on)=>{
    cv.classList.toggle('focus',on); nodes[i].classList.toggle('hot',on);
    const ws=mode==='hub'?[i]:[i-1,i];
    ws.forEach(w=>{ if(w<0||w>=paths.length) return; paths[w].classList.toggle('hot',on); ports[w].forEach(o=>o.classList.toggle('hot',on)); });
    if(hl&&mode==='hub') hl.textContent=on?String(i+1).padStart(2,'0')+' · '+nameOf(nodes[i].dataset.k):hl0;
  };
  nodes.forEach((n,i)=>{
    n.addEventListener('pointerenter',e=>{ if(e.pointerType==='mouse'&&wide.matches) hot(i,true); });
    n.addEventListener('pointerleave',()=>hot(i,false));
  });
  const hk=keyOf(location.hash.slice(1)); if(hk){ back=tileOf(hk); show(hk,document.getElementById(location.hash.slice(1))); }
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
  menu.addEventListener('focusout',e=>{if(e.relatedTarget&&!menu.contains(e.relatedTarget)&&e.relatedTarget!==trigger) close(false);});  // Safari doesn't focus clicked links (relatedTarget null): closing here ate the click on Macs; outside clicks close via the document listener
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
  const go=h=>{close();if(window.cgOpen&&window.cgOpen(h))return;const el=document.querySelector(h);if(el)el.scrollIntoView({behavior:'smooth'});else location.href='/'+h;};
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
    {ic:'↓',label:'Résumé: short, 2 pages',k:'file',run:()=>ext(cv('short'))},
    {ic:'↓',label:'Résumé: long, 4 pages',k:'file',run:()=>ext(cv('long'))},
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
  const nm=mark.querySelector('.nm.blk'); if(!nm) return;
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
  const PAPERS={langllm:'/papers/langllm-bigdata2026.pdf?v=2026-10-21',curated:'/papers/curated-to-win-arrsi2026.pdf?v=2026-10-12',portfolio:'/papers/portfolio-optimization-vs-equal-weight.pdf?v=2026-10-02',robustness:'/papers/legatum-robustness-audit.pdf?v=2026-09-13'};
  const SEC={about:'#about',experience:'#experience',record:'#record',research:'#papers',projects:'#work',fencing:'#fencing',contact:'#contact'};
  const CMDS={
    help:()=>print("nav: <b>ls</b> · <b>open &lt;project&gt;</b> · <b>read &lt;paper&gt;</b> · <b>goto &lt;section&gt;</b> · <b>resume short|long</b> · <b>email</b><br>info: <b>whoami</b> · <b>stack</b> · <b>fencing</b> · <b>fortune</b> · <b>clear</b>",'dim'),
    whoami:()=>print("Adrian Erlikhman — 17, Los Angeles. Senior @ LACES. ML research, quant, and data."),
    ls:()=>print("projects: <b>lstm</b> · <b>finbert</b> · <b>fraud</b>   papers: <b>langllm</b> · <b>curated</b> · <b>portfolio</b> · <b>robustness</b><br>→ e.g. <b>open lstm</b>  or  <b>read portfolio</b>",'dim'),
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
  // hold the tallest answer's height so the questions don't jump as answers change; on one-column screens the box
  // just fits its answer (23 Oct: held, it left a tall empty box under the short ones)
  const narrow=matchMedia('(max-width:820px)');
  function hold(){ area.style.minHeight=''; if(narrow.matches) return; let h=0;
    ps.forEach(p=>{ const was=p.hidden; p.hidden=false; h=Math.max(h,p.offsetHeight); p.hidden=was; });
    area.style.minHeight=(h+parseFloat(getComputedStyle(area).paddingBottom))+'px'; }
  let cur=-1;
  function show(i,focus){
    if(i===cur) return; cur=i;
    if(area.hidden){ area.hidden=false; hold(); }
    qs.forEach((q,j)=>{ q.setAttribute('aria-selected',j===i?'true':'false'); q.tabIndex=j===i?0:-1; });
    ps.forEach((p,j)=>{ p.hidden=j!==i; });
    if(focus) qs[i].focus();
  }
  qs.forEach((q,i)=>q.addEventListener('click',()=>show(i)));
  box.querySelector('.ask-qs').addEventListener('keydown',e=>{
    const k={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];
    if(k){ e.preventDefault(); show((cur+k+qs.length)%qs.length,true); } });
  // closed until the visitor powers it on; then a short boot log, then the questions
  const boot=document.createElement('div'); boot.className='ask-boot';
  // 20 Oct (Adrian's pick, A of _mock/ask-boot2.html): the command types itself, then the Enter key glows and waits
  boot.innerHTML='<div class="ask-cmd"><span class="ask-ps">~/</span><span class="ask-typed" aria-hidden="true"></span><button type="button" class="ask-pwr ask-enter" aria-label="Run ask-adrian">&#8629; enter</button></div><div class="ask-crt" aria-hidden="true"><span class="ask-scan"></span><b>~/ ae</b><span class="ask-bar2"><i></i></span></div>';
  box.insertBefore(boot,box.querySelector('.ask-qs'));
  box.classList.add('ask-off');
  const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  // CRT power-on: a line of light opens into the screen, the mark flickers in, a bar fills, then the questions
  function on(){
    boot.classList.add('booting');
    setTimeout(()=>{ box.classList.remove('ask-off'); boot.remove(); ps.forEach(p=>p.hidden=true); area.hidden=true; qs.forEach((q,j)=>{ q.setAttribute('aria-selected','false'); q.tabIndex=j?-1:0; }); qs[0].focus({preventScroll:true}); box.classList.add('ask-in'); },still?0:1150);
  }
  // links to a tab elsewhere on the page (a paper, an internship, an award) open that tab and scroll to it
  box.addEventListener('click',e=>{
    const a=e.target.closest('a.ask-lk'); if(!a) return;
    const el=document.getElementById(a.getAttribute('href').slice(1));
    if(!el||el.getAttribute('role')!=='tab') return;
    e.preventDefault(); el.click();
    (el.closest('section')||el).scrollIntoView({behavior:still?'auto':'smooth',block:'start'});
  });
  boot.querySelector('.ask-pwr').addEventListener('click',on,{once:true});
  { const typed=boot.querySelector('.ask-typed'),key=boot.querySelector('.ask-enter'),CMD='ask-adrian';
    const done=()=>{ typed.textContent=CMD; key.classList.add('glow'); };
    if(still||!('IntersectionObserver' in window)) done();
    else { const io=new IntersectionObserver(es=>{ if(!es.some(e=>e.isIntersecting)) return; io.disconnect();
        let i=0; const iv=setInterval(()=>{ typed.textContent=CMD.slice(0,++i); if(i>=CMD.length){ clearInterval(iv); key.classList.add('glow'); } },90);
      },{threshold:.5}); io.observe(boot); } }
  addEventListener('resize',()=>{ if(!area.hidden&&!box.classList.contains('ask-off')) hold(); });
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{ if(!area.hidden&&!box.classList.contains('ask-off')) hold(); });
})();

/* ================= BIG VIEW: a build opens in a canvas beside the chat =================
   30 Oct, Adrian picked A of three takes (_mock/bv.html?take=a|b|c; B put it in the thread, C was a tidier popup): the
   project opens in a panel on the right, as ChatGPT's canvas does, and the chat stays on the left with the clicked card
   outlined. The panel speaks the chat's Geist: name and an Open button on top, the live site or film large, then the
   result, one precise sentence, How it works and His part. Under 1000px it covers the screen. Papers open here too,
   from Research's list (also his pick of three, later that day) or a typed question. Every fact is from the paper or
   the old case cards (d7a3a82, 6cf89dc); keep them in step with both, and with Research's rows in index.html. */
const BIG=(function(){
  const dv=document.getElementById('dv'); if(!dv) return null;
  const $=id=>document.getElementById(id);
  const host=u=>u.replace(/^https?:\/\//,'').replace(/\/$/,'');
  /* a browser window whose address bar is the live site */
  const W=(site,inner)=>`<div class="bw"><div class="bw-bar"><span class="bw-d"><i></i><i></i><i></i></span><a class="bw-url" href="${site}" target="_blank" rel="noopener"><span>${host(site)}</span><em>↗</em></a></div><div class="bw-scr">${inner}</div></div>`;
  const V=(src,poster)=>`<video controls playsinline preload="metadata" poster="${poster}" src="${src}"></video>`;
  const I=(src,alt)=>`<img src="${src}" alt="${alt}">`;
  const L=(href,label,solid)=>`<a class="btn${solid?' solid':''}" href="${href}" target="_blank" rel="noopener">${label}${/^https?:/.test(href)||/\.pdf/.test(href)?' <span aria-hidden="true">↗</span>':''}</a>`;
  /* LEDGER: the SNAP check prints up out of a receipt printer (Adrian picked the receipt of three takes, 29 Oct). The order is
     test record 18 from Ledger's suite (eval/fixtures in michae6345-crypto/visionhack; exported for the old walkthrough, last
     in 6abd0ac^): a weekly order, with each line's category and units the eval's hand labels, which the shipped pipeline
     matches on all 319 test lines and 24 records. It shows the rule engine, not the vision model. Re-export, don't edit. */
  const LG=(function(){
    const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const T=[['WHL MLK GALLON','DAIRY',8],['TILLAMOOK MED CHEDDAR BLOCK 8 OZ','DAIRY',12],['DANNON PLAIN LOWFAT YOGURT 32 OZ','DAIRY',12],['DAISY SOUR CREAM 16 OZ','DAIRY',12],
      ['MISSION FLR TORT SOFT TACO 10 CT','GRAINS',24],['MISSION CORN TORT 30 CT','GRAINS',12],['MAHATMA X-LONG GRAIN WHITE RICE 2 LB','GRAINS',12],['BARILLA SPAGHETTI 16 OZ','GRAINS',20],
      ['QUAKER OLD FASHION OATS 18 OZ','GRAINS',12],['MASECA INST CORN MASA 4.4 LB','GRAINS',10],['BIMBO SOFT WHITE BREAD 20 OZ','GRAINS',16],['STARKIST CHUNK LT TUNA WTR 5 OZ','PROTEIN',48],
      ['GRADE A LARGE EGGS 12 CT','PROTEIN',30],['BAR-S CLASSIC BOLOGNA 12 OZ','PROTEIN',16],['SKIPPY CREAMY PEANUT BUTTER 16.3 OZ','PROTEIN',12],['BANANAS PETITE','PRODUCE',150],
      ['RUSSET POTATO 5 LB BAG','PRODUCE',20],['COOKING ONION','PRODUCE',16],['LETTUCE HEAD 24 CT CELLO WRAP','PRODUCE',24],['LIMES PERSIAN','PRODUCE',200],
      ['DEL MONTE WHL KERNEL CORN 15.25 OZ','PRODUCE',24],['CARROTS 2 LB BAG','PRODUCE',12],['COCA COLA 12 OZ CAN'],['LAYS CLASSIC CHIPS 1 OZ']];
    const C=[['DAIRY',4,44],['GRAINS',7,106],['PROTEIN',4,106],['PRODUCE',7,446]];
    let tm=[];
    const lines=()=>{
      const L=['<div class="hd"><img src="/img/logos/ledger.svg" alt="">LEDGER</div>','<div class="c">SNAP STOCKING CHECK</div>','<div class="c">CORNER STOP MARKET</div>','<div class="c">ORDER VWF-885502 · 09/18/26</div>','<div class="ds"></div>'];
      T.forEach(([t,c,u])=>L.push(c?`<div class="row"><span>${t}</span><span class="w7">${c}</span><span class="n">${u}</span></div>`:`<div class="row x"><span>${t}</span><span>NOT A STAPLE</span></div>`));
      L.push('<div class="ds"></div>','<div class="c dim">NEED 7 VARIETIES + 21 UNITS EACH</div>','<div class="ds"></div>');
      C.forEach(([c,v,u])=>{const ok=v>=7&&u>=21;L.push(`<div class="row"><span>${c}</span><span>${v}/7</span><span class="w4">${u}</span><span class="w8 ${ok?'ok':'no'}">${ok?'OK':'SHORT '+(7-v)}</span></div>`);});
      L.push('<div class="row"><span>PERISHABLES</span><span>4 OF 4</span><span class="w8 ok">OK</span></div>','<div class="dd"></div>','<div class="big no">NOT MET</div>',
        `<div class="c no">${C.filter(x=>x[1]<7||x[2]<21).length} CATEGORIES SHORT</div>`,'<div class="bar"></div>');
      return L; };
    const html=()=>'<div class="lg-feed"><div class="rcp" id="lgRc" aria-label="Ledger’s SNAP stocking check on test record 18"></div></div>'
      +'<div class="lg-pr"><span>Test record 18 · a weekly order</span><i aria-hidden="true"></i><button class="lg-again" type="button">Print again</button></div>';
    function stop(){ tm.forEach(clearTimeout); tm=[]; }
    function run(){ stop(); const el=document.getElementById('lgRc'); if(!el) return; const L=lines();
      if(RM){ el.innerHTML=L.map(h=>`<div class="ln">${h}</div>`).join(''); return; }
      el.innerHTML=''; L.forEach((h,i)=>tm.push(setTimeout(()=>el.insertAdjacentHTML('beforeend',`<div class="ln">${h}</div>`),300+i*85))); }
    return {html,run,stop};
  })();
  const D={
    hivemind:{lg:'/img/logos/hivemind.svg',n:'Hivemind',k:'Hackathon build · October 2026',
      a:['Won Lemma’s agent-monitoring track','SEPHacks 2026 at USC, LA Tech Week'],
      t:'Shared memory for a team’s AI coding agents. One engineer corrects an agent once; after a lead approves it, every agent on the team follows the rule, in Claude Code, Cursor, Codex and three other tools.',
      h:'Hooks hand each agent the team’s locked rules for the file it is about to edit, and <code>hivemind watch</code> flags a broken rule as it happens. In the eval, agents passed 36 of 36 runs with Hivemind, 14 of 36 without it and 15 of 36 with a placebo memory. Next.js, Supabase, Claude Haiku, MCP.',
      p:['His part','Designed and built the website, the web app and the terminal app’s interface, and made the launch film, overnight with Michael Tarekegn, who built the engine, hooks and eval.'],
      site:'https://hivemind-q17i.onrender.com/',m:V('/video/hivemind-ad.mp4?v=2026-10-17','/img/cases/hivemind-ad.webp?v=2026-10-17'),
      l:[['https://hivemind-q17i.onrender.com/','Open Hivemind',1],['https://hivemind-q17i.onrender.com/app','Try the app'],['https://devpost.com/software/hivemind-v7rwgx','Devpost'],['https://youtu.be/wmBzH3som4A','Film']]},
    monte:{lg:'/img/logos/monte.svg',n:'Monte',k:'Hackathon build · October 2026',
      a:['1st place, Finance track','ACM TrojanHacks 2026 at USC, LA Tech Week'],
      t:'Pays with the card that earns the most at each store, never one carrying a balance, and shows what each card really costs once fees and interest come out.',
      h:'At the register it reads the store’s merchant category and checks this month’s caps against the published terms of 29 cards; a Monte Carlo simulation weighs a year of rewards against fees and interest. Next.js, TypeScript, Plaid; 36 tests.',
      p:['His part','The interface, the tap-to-pay demo, the brand and the launch film; Michael Tarekegn built the backend, the Monte Carlo engine and the tests. It won the day after Hivemind did.'],
      site:'https://ace-eta-beryl.vercel.app/',m:V('/video/monte-film.mp4?v=2026-10-18','/img/cases/monte-home.webp'),
      l:[['https://ace-eta-beryl.vercel.app/','Open Monte',1],['https://ace-eta-beryl.vercel.app/#tap-demo','Tap-to-pay demo'],['https://devpost.com/software/monte-calygj','Devpost'],['https://github.com/michae6345-crypto/monte','Code']]},
    citadel:{lg:'/img/logos/citadel.webp',n:'dunderscore',k:'Competition · Citadel High School Terminal',
      a:['Finalist, top 8 of 45 teams','Citadel High School Terminal, from 1,000+ applicants'],
      t:'A Python bot for Terminal, Citadel’s tower-defense game where no one plays live: every move is code.',
      h:'Each turn the bot spends one resource on walls, turrets and supports and another on scouts, demolishers and interceptors that it sends at the other bot’s defenses. In this round-41 replay it is the teal side.',
      p:['His part','One of three who wrote it. Between rounds they studied match replays and rewrote the strategy, and the bot reached the finals.'],
      site:'https://terminal.c1games.com/',m:'<img src="/img/terminal/viewer.webp?v=2026-10-29" alt="Terminal’s replay viewer at round 41, dunderscore in teal" style="object-fit:contain;background:#1c1b21">',
      l:[['https://terminal.c1games.com/','About Terminal',1]]},
    safejew:{lg:'/img/logos/safejew.webp',n:'SafeJew',k:'Co-founder · 2024 to now',
      a:['1,394 incidents mapped','funded by a JFEDLA Teen Innovation Grant'],
      t:'A live map of antisemitic incidents across Greater Los Angeles and 33 U.S. college campuses, each tied to its source, distributed through the Jewish Federation of Los Angeles’ Community Security Initiative.',
      h:'He wrote a dependency-free LA gazetteer that finds the most specific place a news story names and geocodes it, so a daily GitHub Action adds new incidents with no one in the loop. 800 incidents across LA and 594 on campuses, from ADL records and cited news reports. Next.js, TypeScript, Supabase.',
      p:['His part','Co-founded it, wrote the gazetteer and rebuilt the platform as V2 for a pitch to Hillel International.'],
      site:'https://safejew.org/map',m:I('/img/cases/safejew-incident.webp','SafeJew’s incident map'),
      l:[['https://safejew.org/map','Open the map',1],['https://github.com/RE17-IWD/safejew','Code']]},
    aimlli:{lg:'/img/logos/aimlli-mark.webp',n:'AIML-LI',k:'Co-founder & lead · 2023 to now',
      a:['Working with LAUSD toward a district-wide course','LA Student AI Summit for 500+ students, 6 Feb 2027'],
      t:'A free, open-source AI course any LA public-school teacher can run on the Chromebooks a class already has: twelve weeks, six units, real Python, aligned to state standards.',
      h:'Colab notebooks from how models learn to neural networks, language and bias, with instructor guides, assessments and a capstone students ship. Taught in LACES AP Computer Science; LAUSD’s Ed Tech & Innovation office is taking it to the district’s Chief Academic and Chief Information Officers.',
      p:['His part','Co-founded it with Michael Tarekegn, co-wrote the course and is organizing the summit, with keynotes from Google DeepMind, Microsoft, Google and Snap. aiEDU invited him to speak at NCSS 2026 and onto its podcast.'],
      site:'https://aiml-initiative.org',m:I('/img/cases/aimlli-home.webp','aiml-initiative.org'),
      l:[['https://aiml-initiative.org','Open aiml-initiative.org',1]]},
    ledger:{lg:'/img/logos/ledger.svg',n:'Ledger',k:'Hackathon build · September 2026',
      a:['1st place, Council District 9 Champion, Under 18','VISION HACK: South LA, Hacker Fund × City of LA Vision Lab'],
      t:'Keeps a South LA corner store compliant: the 18 programs it answers to, across three levels of government, on one renewal calendar, worst first, in English and Spanish.',
      h:'A two-pass vision pipeline reads a photo of a wholesale order and a rule engine scores it against SNAP’s stocking rule; on 24 hand-labeled test records the rule engine matched every verdict, with no false passes. Built in twelve hours.',
      p:['His part','Led the build across the vision pipeline, rule engine and frontend, and wrote the two-pass vision pipeline, the dashboard and renewal calendar, and the static fallback.'],
      site:'https://visionhack-nu.vercel.app/',rc:1,
      l:[['https://visionhack-nu.vercel.app/','Open the demo',1],['https://github.com/michae6345-crypto/visionhack','Code']]},
    saferoutes:{lg:'/img/logos/walkhome.svg',n:'Safe Routes to School',k:'Competition build · August 2026 · with Michael Tarekegn',
      a:['3rd place internationally','Young Coders’ Sphere, Code for Transportation'],
      t:'Walking and bus directions for LA students that route around where street robberies happen, to all 668 LAUSD schools.',
      h:'Scores 431,599 street blocks by hour from 85,634 LAPD incidents, then runs A* in the browser over the streets and LA Metro’s 5,395 stops, offline, in English and Spanish. One trip to LACES cuts modeled exposure by 80%.',
      p:['Why','From 2020 to 2024, 1,838 LA children aged 10 to 18 were robbed on the street, 56% of them on the school commute. His friends are in that number.'],
      site:'https://safe-routes-la.github.io/',m:I('/img/cases/saferoutes-walk.webp','Safe Routes’ worked example'),
      l:[['https://safe-routes-la.github.io/','Try it',1],['https://www.youngcoderssphere.org/post/code-for-transportation-3rd-place','Write-up'],['https://github.com/safe-routes-la/safe-routes-la.github.io','Code']]},
    langllm:{paper:1,lg:'/img/logos/ieee.webp',n:'Interpretable Multilingual Attribution of Frontier LLMs',k:'Paper · IEEE BigData 2026 · Phoenix, 17 Dec',
      a:['Best Paper Finalist','one of 12, from 130 accepted papers'],
      t:'Can you still tell which AI model wrote an essay once it leaves English? Yes: an interpretable classifier names the model 59–72% of the time in all seven languages, while the models themselves manage 20–25%.',
      h:'21 features from Universal Dependencies parses, on 840 essays from five frontier models. They transfer between languages better than character n-grams (49% against 41%).',
      p:['Authors','Adrian Erlikhman, Michael Tarekegn, Philo Juang · co-first author'],
      pg:'/img/papers/r01-langllm.webp',href:'/papers/langllm-bigdata2026.pdf?v=2026-10-21',
      l:[['/papers/langllm-bigdata2026.pdf?v=2026-10-21','Read the paper',1],['https://github.com/adrian-erlikhman/LangLLM','Code + data']]},
    curated:{paper:1,n:'Curated to Win: Certifying Reward-Model and Judge Selection Against Evaluation-Set Curation',k:'Paper · ARRSI @ AACL-IJCNLP 2026 · Hengqin, 10 Nov',
      a:['Accepted, sole author','ARRSI Workshop, AACL-IJCNLP 2026'],
      t:'How few test items does it take to change which reward model wins? RewardBench’s leader survives the removal of any 11 of its 2,985 items; removing the right 12 makes the runner-up the winner.',
      h:'A curation certificate, solved as linear programs over 118 RewardBench and 188 RewardBench 2 models; on RewardBench 2 the leader survives any 42 items.',
      p:['Author','Adrian Erlikhman, sole author'],
      pg:'/img/papers/r02-curated-to-win.webp',href:'/papers/curated-to-win-arrsi2026.pdf?v=2026-10-12',
      l:[['/papers/curated-to-win-arrsi2026.pdf?v=2026-10-12','Read the paper',1],['https://github.com/adrian-erlikhman/curated-to-win','Code + data']]},
    compllm:{paper:1,n:'Whose Line Is It Anyway? Auditing Self- and Other-Recognition in LLM Judges',k:'Paper · preprint',
      a:['Preprint','arXiv forthcoming'],
      t:'Do LLM judges really recognize their own writing? The usual test flags 15 of 37 cases; 8 survive a false-alarm control, and none beats the judge’s strongest single peer.',
      h:'Nine judges, 1,270 texts and 19,000+ judgments, plus two controls: how often a judge names itself on text it didn’t write, and how often its peers name it.',
      p:['Authors','Adrian Erlikhman, Michael Tarekegn, Philo Juang · co-first author'],
      pg:'/img/papers/r03-compllm.webp',href:'https://github.com/adrian-erlikhman/self-recognition-peer-baseline',
      l:[['https://github.com/adrian-erlikhman/self-recognition-peer-baseline','Code + data',1]]},
    portfolio:{paper:1,lg:'/img/logos/ojss.webp',n:'Does Portfolio Optimization Beat Splitting Evenly?',k:'Paper · Oxford Journal of Student Scholarship',
      a:['Accepted with revisions','Oxford Journal of Student Scholarship'],
      t:'Does textbook portfolio optimization beat splitting your money evenly? No: the even split won 74% of 250 simulations, with a Sharpe ratio of 0.70 against Markowitz’s 0.51.',
      h:'250 simulations of a factor model calibrated to real market data. Given the true means the optimizer nearly wins, so estimating expected returns is the whole problem.',
      p:['Authors','Adrian Erlikhman, Ryan Erlikhman · co-first author'],
      pg:'/img/papers/r04-portfolio.webp',href:'/papers/portfolio-optimization-vs-equal-weight.pdf?v=2026-10-02',
      l:[['/papers/portfolio-optimization-vs-equal-weight.pdf?v=2026-10-02','Read the paper',1]]},
    legatum:{paper:1,n:'How Robust Are the Legatum Prosperity Index Rankings? A Monte Carlo and Sensitivity Analysis of Weighting, Normalization, and Aggregation',k:'Paper · Journal of High School Science',
      a:['Accepted with revisions','Journal of High School Science'],
      t:'How much do global prosperity rankings depend on arbitrary choices? The ranking holds as a whole (median rank correlation 0.99), but a mid-table country’s 90% rank interval spans a median of 36 places.',
      h:'Every published score for 167 countries reproduced exactly, then 10,000 draws under three weight priors and a 131,072-run Sobol’ design. New result: rank leverage, c²(1 − ρ²).',
      p:['Authors','Adrian Erlikhman, Ryan Erlikhman · co-first author'],
      pg:'/img/papers/r05-legatum.webp',href:'/papers/legatum-robustness-audit.pdf?v=2026-09-13',
      l:[['/papers/legatum-robustness-audit.pdf?v=2026-09-13','Read the paper',1]]}
  };
  const cg=document.querySelector('.cg'), full=matchMedia('(max-width:1000px)');
  const X='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15"/></svg>';
  let back=null,onClose=null,src=null;
  function open(key,from,closed){
    const d=D[key]; if(!d) return false;
    const media=d.paper?`<a class="cv-pg" href="${d.href}" target="_blank" rel="noopener"><img src="${d.pg}" alt="First page of the paper"></a>`:d.rc?LG.html():W(d.site,d.m);
    const go=d.l[0];
    dv.querySelectorAll('video').forEach(v=>v.pause()); LG.stop();
    dv.innerHTML=`<header class="cv-top">${d.lg?`<span class="cv-lg"><img src="${d.lg}" alt=""></span>`:''}<div class="cv-id"><b>${d.paper?d.n.split(':')[0]:d.n}</b><span>${d.k}</span></div>`
      +`${go?L(go[0],go[1],1):''}<button class="cv-x" type="button" data-close aria-label="Close">${X}</button></header>`
      +`<div class="cv-body"><div class="cv-md${d.paper?' pp':''}${d.rc?' lgr':''}">${media}</div><div class="cv-tx">`
      +`${d.paper?`<p class="cv-ti">${d.n}</p>`:''}<p class="cv-win"><b>${d.a[0]}</b> · ${d.a[1]}</p><h2 class="cv-t" id="dvT">${d.t}</h2>`
      +`<dl class="cv-dl"><dt>${d.paper?'How':'How it works'}</dt><dd>${d.h}</dd><dt>${d.p[0]}</dt><dd>${d.p[1]}</dd></dl>`
      +`<div class="cv-ln">${d.l.map((x,i)=>L(x[0],x[1],!i).replace('class="btn',`class="${i?'':'cv-go '}btn`)).join('')}</div></div></div>`;
    if(d.rc){ LG.run(); dv.querySelector('.lg-again').addEventListener('click',LG.run); }
    if(src) src.classList.remove('cv-src');
    src=from&&from.closest?(from.closest('.wg>a,.rl-r')||(from.closest('.tm')&&from.closest('.tm').querySelector('.tm-v'))):null;
    if(src) src.classList.add('cv-src');
    if(dv.hidden) back=from||document.activeElement;
    onClose=closed||null;
    dv.hidden=false; cg&&cg.classList.add('cv-on'); document.body.classList.add('cv-open');
    dv.querySelector('.cv-body').scrollTop=0;
    if(src) requestAnimationFrame(()=>src.scrollIntoView({block:'nearest'}));
    dv.querySelector('.cv-x').focus({preventScroll:true});
    return true;
  }
  /* quiet: the visitor moved to another conversation, so focus stays where they are */
  function close(quiet){ if(dv.hidden) return; dv.querySelectorAll('video').forEach(v=>v.pause()); LG.stop();
    dv.hidden=true; dv.innerHTML=''; cg&&cg.classList.remove('cv-on'); document.body.classList.remove('cv-open');
    if(src){ src.classList.remove('cv-src'); src=null; }
    if(quiet!==true&&back&&back.focus) back.focus({preventScroll:true}); if(onClose) onClose(); }
  dv.addEventListener('click',e=>{ if(e.target.closest('[data-close]')) close(); });
  addEventListener('keydown',e=>{ if(dv.hidden) return;
    if(e.key==='Escape'){ e.preventDefault(); close(); }
    else if(e.key==='Tab'&&full.matches){ const f=[...dv.querySelectorAll('a[href],button,video[controls]')].filter(x=>x.offsetParent!==null); if(!f.length) return;
      const a=f[0],z=f[f.length-1]; if(e.shiftKey&&document.activeElement===a){ e.preventDefault(); z.focus(); } else if(!e.shiftKey&&document.activeElement===z){ e.preventDefault(); a.focus(); } } });
  /* Selected work and Research: a click opens the big view; ctrl/cmd-click still follows the link */
  document.querySelectorAll('[data-dv]').forEach(c=>c.addEventListener('click',e=>{
    if(e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0) return;
    if(open(c.dataset.dv,c)) e.preventDefault(); }));
  return {open,close,D};
})();

/* ================= CHAT SITE (29 Oct): the whole homepage is one chat app (Adrian: "have every section be a part of the
   chatgpt"). Each section is a conversation (article.cg-conv in index.html, the section's own markup inside). Opening one the
   first time plays it: "Thinking", the answer's opening line streams in word by word, then its blocks build in one after
   another (lists and grids item by item). Opened again, it shows at once. After the intro, "Who is Adrian?" types itself
   into the composer and plays; it stops for good if the visitor does anything first. The chat speaks about Adrian in the
   third person (his ask, 29 Oct). A typed question gets a written answer from KB below, or opens a whole conversation.
   #links into a conversation (#papers, #case-hivemind, #rs-t2, …) open it and scroll to that spot. ================= */
(function(){
  const root=document.getElementById('top'); if(!root||!root.classList.contains('cg')) return;
  root.classList.add('cg-js'); root.classList.remove('chatting');
  const $=id=>document.getElementById(id);
  const col=$('cgCol'),thread=$('cgThread'),inp=$('cgIn'),send=$('cgSend'),form=$('cgForm');
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const convs={}; col.querySelectorAll('.cg-conv').forEach(c=>convs[c.dataset.conv]=c);
  const Q={}; Object.entries(convs).forEach(([k,c])=>Q[k]=c.querySelector('.cg-u div').textContent);
  const P=k=>`<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">${k}</svg>`;
  const IC={copy:'<path d="M7 7V4.5A1.5 1.5 0 0 1 8.5 3h7A1.5 1.5 0 0 1 17 4.5v7a1.5 1.5 0 0 1-1.5 1.5H13"/><rect x="3" y="7" width="10" height="10" rx="1.5"/>',
    ok:'<path d="M4 10.5l4 4 8-9"/>',up:'<path d="M6 9l3-6a2 2 0 0 1 2 2v3h4.5a1.5 1.5 0 0 1 1.5 1.7l-1 5.5A1.5 1.5 0 0 1 14.5 16.5H6zM6 9H3.5v7.5H6"/>',
    down:'<path d="M14 11l-3 6a2 2 0 0 1-2-2v-3H4.5A1.5 1.5 0 0 1 3 10.3l1-5.5A1.5 1.5 0 0 1 5.5 3.5H14zM14 11h2.5V3.5H14"/>',
    again:'<path d="M16 10a6 6 0 1 1-1.8-4.3M16 3.5v3.5h-3.5"/>',search:'<circle cx="9" cy="9" r="5.5"/><path d="M13 13l4 4"/>'};
  const acts=()=>`<div class="cg-acts2"><button class="cg-ib" type="button" data-act="copy" aria-label="Copy">${P(IC.copy)}</button><button class="cg-ib" type="button" data-act="up" aria-label="Good answer">${P(IC.up)}</button><button class="cg-ib" type="button" data-act="down" aria-label="Bad answer">${P(IC.down)}</button><button class="cg-ib" type="button" data-act="again" aria-label="Answer again">${P(IC.again)}</button></div>`;
  Object.values(convs).forEach(c=>c.insertAdjacentHTML('beforeend',acts()));
  const chipHTML=k=>{ const b=root.querySelector(`#cgChips [data-conv="${k}"]`); return b?b.outerHTML:''; };
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  let cur=null,run=0,busy=false,auto=true,typing=false,played=new Set();

  /* ---- showing and playing a conversation ---- */
  function mark(k){ root.querySelectorAll('.cg-list [data-conv]').forEach(b=>b.classList.toggle('on',b.dataset.conv===k)); }
  function select(k){ root.classList.add('chatting'); Object.entries(convs).forEach(([n,c])=>c.classList.toggle('on',n===k)); cur=k; mark(k); }
  async function streamSay(el,html,my){
    if(RM){ el.innerHTML=html; return; }
    const parts=html.match(/<[^>]+>|[^<\s]+|\s+/g)||[]; let out='';
    for(const p of parts){ if(my!==run){ el.innerHTML=html; return; } out+=p; if(!p.startsWith('<')&&p.trim()){ el.innerHTML=out+'<span class="cg-cur"></span>'; await sleep(18); } }
    el.innerHTML=html;
  }
  const GRIDS='.xl,.pl,.wg,.hon,.rs,.bt,.rk,.lg,.ph,.cc-b,.cg-imgs,.cg-ul,.cg-tb tbody,.cg-media,.cg-vids,.rl';
  function stagger(el){ const gs=el.matches(GRIDS)?[el]:[...el.querySelectorAll(GRIDS)];
    gs.forEach(g=>[...g.children].forEach((ch,i)=>{ ch.style.animationDelay=(i*.07)+'s'; ch.classList.add('cg-pop-in'); })); }
  async function play(k){
    const my=++run; busy=true; const c=convs[k], a=c.querySelector('.cg-a'), row=c.querySelector('.cg-acts2');
    const blocks=[...a.children];
    if(RM||played.has(k)){ blocks.forEach(b=>b.classList.remove('cg-wait')); row.classList.remove('cg-wait'); busy=false; return; }
    played.add(k);
    const says=[...a.querySelectorAll('.cg-say')].map(e=>[e,e.innerHTML]); says.forEach(([e])=>e.innerHTML='');
    blocks.forEach(b=>b.classList.add('cg-wait')); row.classList.add('cg-wait');
    a.insertAdjacentHTML('afterbegin','<span class="cg-think">Thinking</span>');
    await sleep(800); const th=a.querySelector('.cg-think'); if(th) th.remove();
    for(const b of blocks){
      if(my!==run) break;
      b.classList.remove('cg-wait');
      const inner=says.filter(([e])=>b===e||b.contains(e));
      if(inner.length){ stagger(b); for(const [e,h] of inner) await streamSay(e,h,my); }
      else { stagger(b); await sleep(b.matches('.cg-follow')?0:260); }
    }
    says.forEach(([e,h])=>{ if(!e.innerHTML) e.innerHTML=h; });
    blocks.forEach(b=>b.classList.remove('cg-wait')); row.classList.remove('cg-wait');
    if(my===run) busy=false;
  }
  async function open(k,{to,instant}={}){
    if(!convs[k]) return false;
    if(busy){ run++; busy=false; Object.values(convs).forEach(c=>{ c.querySelectorAll('.cg-wait').forEach(e=>e.classList.remove('cg-wait')); c.querySelectorAll('.cg-think').forEach(e=>e.remove()); }); }
    closeSide(); select(k);
    if(instant) played.add(k);
    thread.scrollTop=0;
    const p=play(k);
    if(to){ const el=document.getElementById(to); if(el&&el!==convs[k]) requestAnimationFrame(()=>el.scrollIntoView({block:'start'})); }
    return p;
  }

  /* ---- typed questions (29 Oct, Adrian: "make it so that you can type literally anything and it will answer"; he chose
     written answers over a live AI). KB is ~90 answers, all from llms.txt and the page, in the third person. A question is
     scored against every entry's patterns (weight 3 for a specific fact, 2 for a whole topic, which opens its conversation)
     and the best entry over 2 answers; ties go to the earlier entry, so the specific ones come first. Anything else gets
     an honest "I don't have that one" with the topics and his email. Keep these in step with the sections and llms.txt. ---- */
  const IMG={hivemind:'/img/cases/hivemind-ad.webp',monte:'/img/cases/monte-home.webp',safejew:'/img/cases/safejew-incident.webp',aimlli:'/img/cases/aimlli-home.webp',
    saferoutes:'/img/cases/saferoutes-walk.webp',citadel:'/img/terminal/board.webp?v=2026-10-29',
    langllm:'/img/papers/r01-langllm.webp',curated:'/img/papers/r02-curated-to-win.webp',compllm:'/img/papers/r03-compllm.webp',portfolio:'/img/papers/r04-portfolio.webp',legatum:'/img/papers/r05-legatum.webp'};
  const S=(id,t)=>`<a href="#${id}">${t}</a>`, X=(u,t)=>`<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
  const MAIL='<a href="mailto:erlikhman.adrian@gmail.com">erlikhman.adrian@gmail.com</a>';
  const ul=items=>`<ul class="cg-ul">${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
  const say=(...ps)=>ps.map(p=>`<p class="cg-say">${p}</p>`).join('');
  const PICS={climb:['/life-climb.jpg','Adrian Erlikhman rock climbing','Rock climbing'],backpack:['/life-backpack.jpg','Adrian Erlikhman backpacking at an alpine lake','Backpacking at an alpine lake'],
    cycle:['/life-cycle.jpg','Adrian Erlikhman road cycling','Road cycling'],hike:['/life-hike.jpg','Adrian Erlikhman hiking a foggy ridge','Hiking a foggy ridge'],
    lunge:['/fencing-1.jpg','Adrian Erlikhman fencing épée for Team USA at the Cadet Pan-American Championships in Bogotá','Team USA, Cadet Pan-American Championships, Bogotá'],
    podium:['/fencing-2.jpg','Adrian Erlikhman on the podium with a USA Fencing medal','USA Fencing podium'],
    yc:['/img/ycs/yc-sign.jpg','Adrian Erlikhman with two other attendees under the Y Combinator sign at Startup School 2026','Y Combinator Startup School 2026']};
  const pics=(...ks)=>`<div class="cg-imgs row">${ks.map(k=>`<button type="button" data-cap="${PICS[k][2]}"><img src="${PICS[k][0]}" alt="${PICS[k][1]}" loading="lazy"></button>`).join('')}</div>`;
  const K=(re,w=3)=>[re,w];
  const KB=[
    /* projects and papers by name: a short answer and a card that opens the big view */
    {k:[K(/hivemind|shared memory|coding agents?|lemma|sephacks/)],dv:'hivemind',f:['work'],a:say(`<b>Hivemind</b> won Lemma’s Agent Behaviour Monitoring track at SEPHacks 2026 (USC SEP × LA Tech Week), built with Michael Tarekegn.`,`It is shared memory for a team’s AI coding agents: an engineer’s correction becomes a lesson, a team lead approves it, and every agent on the team loads it at its next session. In their eval, Claude Code passed 36 of 36 runs with Hivemind and 14 of 36 without.`,`Adrian designed and built the website, the web app and the terminal app’s design, and made the launch film.`)},
    {k:[K(/\bmonte\b|credit cards?|tap to pay|apple pay|trojanhacks?/)],dv:'monte',f:['work'],a:say(`<b>Monte</b> took 1st place in the Finance track at ACM TrojanHacks 2026, built with Michael Tarekegn.`,`It picks the credit card that pays most for each purchase, from the store’s merchant code and 29 cards’ published terms, and never picks a card carrying a balance. Over a year it weighs each card’s rewards against its fees and interest.`,`Adrian built the interface, the tap-to-pay demo and the brand, and made the launch film.`)},
    {k:[K(/safe ?jew|antisemit|incident map/)],dv:'safejew',f:['work'],a:say(`<b>SafeJew</b>, which Adrian co-founded, is a live map of antisemitic incidents across Greater Los Angeles, each with its source: 800 across LA and 594 on 33 university campuses, updated daily. It is funded by a JFEDLA Teen Innovation Grant.`,`He built the LA gazetteer that turns a place named in a news story into coordinates, so a daily job adds new incidents on its own.`)},
    {k:[K(/aiml|ai literacy|literacy|ai course|summit|chromebook/)],dv:'aimlli',f:['work'],a:say(`<b>AIML-LI</b>, the AI & Machine Learning Literacy Initiative, is a free AI-literacy course for LA public schools that Adrian co-founded and has led since 2023: six units of Python notebooks that run on school Chromebooks, from foundations to neural networks.`,`It also puts on a free AI summit and hackathon for 500+ LA public-school students.`)},
    {k:[K(/ledger|corner stores?|\bsnap\b|vision ?hack/)],dv:'ledger',f:['work'],a:say(`<b>Ledger</b> took 1st place at VISION HACK: South LA (Council District 9 Champion, Under 18) in September 2026. It tracks a corner store’s license renewals and checks its stock against SNAP’s stocking rule.`,`Adrian led the build across the vision pipeline, rule engine and frontend, and wrote the two-pass vision pipeline, the dashboard and renewal calendar, and the static fallback.`)},
    {k:[K(/safe ?routes|walkhome|robb|walk(ing)? (home|to school)|code for transportation/)],dv:'saferoutes',f:['work'],a:say(`<b>Safe Routes to School</b> placed 3rd internationally at Young Coders’ Sphere’s Code for Transportation, built with Michael Tarekegn.`,`It gives LA students walking directions routed around street robbery: 431,599 blocks scored by hour from 85,634 LAPD incidents, routed in the browser, offline, in English and Spanish.`)},
    {k:[K(/citadel|terminal|dunderscore|tower.?defen|correlation one/)],dv:'citadel',f:['work','record'],a:say(`<b>dunderscore</b> is the Python bot Adrian’s team of three wrote for Citadel High School Terminal, a tower-defense game where every move is code.`,`They were finalists: top 8 of 45 teams, from 1,000+ applicants. They rewrote its strategy between rounds from match replays.`)},
    {k:[K(/ednatlas|decode the ocean|environmental dna|\bedna\b|ocean|lovable/)],f:['work'],a:say(`<b>eDNAtlas</b> won 1st place at Decode the Ocean (Lovable × United Nations): a live map that scores coastal sites from environmental DNA, built from 16.5M DNA sequences. ${X('/eDNAtlas/','Open eDNAtlas')}`)},
    {k:[K(/why wrong|misconception|wrong answers/)],f:['experience'],a:say(`<b>${X('https://adrian-erlikhman.github.io/why-wrong/','Why Wrong')}</b> reads a whole class’s wrong answers and names the misconception behind each one: 0.87 F1 on planted misconceptions, with students grouped by shared mistake.`,`Adrian built it in his ${S('xp-kiddom','Kiddom')} ML mentorship and is designing its classroom evaluation with an LAUSD teacher.`)},
    {k:[K(/games unlimited|linkedin games|puzzles?|crossword|wordle|sudoku/)],f:['about'],a:say(`Adrian likes puzzles enough to have built ${X('/linkedin-games-unlimited/','Games Unlimited')}: unlimited practice versions of the LinkedIn daily puzzle games.`)},
    {k:[K(/ieee|bigdata|big data|multilingual|attribution|which (ai|model|llm) wrote|langllm|best paper|stylometr|seven languages/)],dv:'langllm',f:['research'],a:say(`<b>Interpretable Multilingual Attribution of Frontier LLMs</b> is accepted at the IEEE BigData 2026 High School Symposium (Phoenix, 17 Dec) and is a <b>Best Paper Finalist</b>: one of 12 papers, top 16 of 130 accepted.`,`A classifier built on 21 interpretable features names which of five frontier models wrote an essay 59–72% of the time in all seven languages, against 20% chance; the models themselves do little better than chance. Adrian is co-first author, with Michael Tarekegn and Philo Juang.`)},
    {k:[K(/curated|reward.?models?|rewardbench|leaderboard|sole.?author|aacl|arrsi|benchmark/)],dv:'curated',f:['research'],a:say(`<b>Curated to Win</b> is Adrian’s sole-author paper, accepted at the ARRSI workshop at AACL-IJCNLP 2026.`,`It certifies when picking a reward model or AI judge by its score on a test set can be trusted: RewardBench’s leader survives the removal of any 11 of its 2,985 questions, but removing 12 particular ones makes the runner-up the winner.`)},
    {k:[K(/whose line|self.?recogni|own writing|llm judges?|ai judges?|\bjudges?\b|preprint|arxiv/)],dv:'compllm',f:['research'],a:say(`<b>Whose Line Is It Anyway? Auditing Self- and Other-Recognition in LLM Judges</b> asks whether AI judges recognize their own writing.`,`Across nine judges and 1,270 texts, the usual test flags 15 of 37 cases; with two controls added, none beats the judge’s strongest single peer. It is a preprint, arXiv forthcoming; Adrian is co-first author, with Michael Tarekegn and Philo Juang.`)},
    {k:[K(/portfolio optim|markowitz|1\/n|ojss|oxford|splitting (money )?evenly|equal.?weight|sharpe/)],dv:'portfolio',f:['research'],a:say(`<b>Does Portfolio Optimization Beat Splitting Evenly?</b> is accepted with revisions at the Oxford Journal of Student Scholarship.`,`Splitting money evenly beat the Markowitz-optimal portfolio in 74% of 250 market simulations. Adrian is co-first author with his brother, Ryan Erlikhman.`)},
    {k:[K(/legatum|prosperity|jhss|countries|monte carlo|sensitivity/)],dv:'legatum',f:['research'],a:say(`<b>How Robust Are the Legatum Prosperity Index Rankings?</b> is accepted with revisions at the Journal of High School Science.`,`It rebuilds the index’s ranking of 167 countries exactly, then stress-tests it with 30,000 alternative weightings and a 131,072-run sensitivity analysis. Adrian is co-first author with Ryan Erlikhman.`)},

    /* internships */
    {k:[K(/firstness|research engine|hypothes/)],f:['experience'],a:say(`At ${S('xp-firstness','<b>Firstness</b>')}, an AI research engine that turns a scientist’s question into hypotheses cited to the literature, Adrian is a Software Engineering & ML Intern (2026 to now).`,`He works one-on-one with the founder, a UC Berkeley- and UCSF-affiliated neuroscientist, connecting the platform to the tools scientists already use for literature, data and analysis, and turning the founder’s research into product demos.`)},
    {k:[K(/kiddom|flora|k.?12|edtech|education company/)],f:['experience'],a:say(`At ${S('xp-kiddom','<b>Kiddom</b>')}, Adrian is in a Machine Learning Internship & Mentorship (2026 to now) with Kiddom’s Director of Data Science.`,`He built ${X('https://adrian-erlikhman.github.io/why-wrong/','Why Wrong')}, which names the misconception behind each wrong answer on a class’s answer sheets, and is designing its classroom evaluation with an LAUSD teacher.`)},
    {k:[K(/fjor|\$15m|15 ?million|yc (batch|startups)|134|investment memo|diligen/)],f:['experience'],a:say(`At ${S('xp-fjor','<b>Fjor Venture Capital</b>')}, a $15M early-stage fund, Adrian was an Investment & Software Engineering Intern (2024 to 2026).`,`He built the classifier and scoring models that ranked all 134 startups in Y Combinator’s Summer 2025 batch and led the screen, diligenced 20+ AI startups, wrote 10+ investment memos for partner-level decisions, and built the fund’s internal deal-flow software.`)},
    {k:[K(/alliance|socal|investor.?match|matching engine|deep.?tech/)],f:['experience'],a:say(`At ${S('xp-alliance','<b>Alliance for SoCal Innovation</b>')}, Adrian was a Venture & Data Strategy Intern (2024 to 2026).`,`He built a Python/SQL engine that matches startups to investors across 10,000 contacts at 250+ VC firms, angel groups and accelerators, cutting a founder’s search from days to under a minute. He also led outreach to 80+ founders and mapped Southern California’s deep-tech startups.`)},
    {k:[K(/venture|\bvc\b|invest|startups?(?! school)|entrepreneur/)],f:['experience','work'],a:say(`On the venture side: at ${S('xp-fjor','Fjor')} he built the models that ranked all 134 startups in YC’s Summer 2025 batch and wrote 10+ investment memos, and at ${S('xp-alliance','Alliance for SoCal Innovation')} he built the engine that matches startups to investors.`,`He went through Y Combinator’s Startup School 2026, and he co-founded ${S('case-safejew','SafeJew')} and ${S('case-aimlli','AIML-LI')}.`)},
    {k:[K(/financ|quant|stocks?|trading|sifma|stock market|econ/)],f:['research','experience'],a:say(`Finance runs through a lot of his work:`)+ul([`${S('rs-t4','<b>A journal paper</b>')} showing that splitting money evenly beat the Markowitz-optimal portfolio in 74% of 250 simulations`,`${S('case-monte','<b>Monte</b>')}, 1st place in TrojanHacks’ Finance track`,`${S('xp-fjor','<b>Fjor</b>')}, where he built the models that screened YC’s Summer 2025 batch`,`<b>Top 5% statewide</b> in the SIFMA Stock Market Game, entered solo against teams`])},

    /* school and numbers */
    {k:[K(/\bgpa\b|\bgrades\b|grade point|unweighted|\bweighted\b|transcript/)],f:['record'],a:say(`Adrian has a <b>4.0 unweighted GPA</b> (5.2 weighted) at the Los Angeles Center for Enriched Studies.`)},
    {k:[K(/\bsat\b|\bact\b|test scores?|standardi[sz]ed/)],f:['record'],a:say(`He scored <b>1520 on the SAT</b>, with a 770 in Math.`)},
    {k:[K(/national merit|\bpsat\b|nmsqt|merit (scholar|semi)/)],f:['record'],a:say(`He is a <b>National Merit Semifinalist</b> (2027 program): about 16,000 of 1.3 million+ entrants.`)},
    {k:[K(/\baps?\b|advanced placement|ap scholar/),K(/math class|math course|classes|courses|coursework|dual enroll|college (class|course)|linear algebra|calculus|community college/,3)],f:['record'],a:say(`<b>17 AP courses</b>: 11 taken so far, every exam a 4 or 5, and 6 more this year. He is a 2× AP Scholar with Distinction.`,`He also takes college classes through LACCD dual enrollment: Linear Algebra (MATH 270, L.A. Southwest College) and Programming in Python (CS 119), with Python Programming for Data Science and Machine Learning (CS 121) next.`)},
    {k:[K(/what grade|which grade|\bsenior\b|class of|graduat|what year/)],f:['about'],a:say(`He is a high-school senior, class of 2027.`)},
    {k:[K(/how old|\bage\b|birthday|born/)],f:['about'],a:say(`The site doesn’t list his age. He is a high-school senior, class of 2027.`)},
    {k:[K(/\bschool\b|laces|enriched studies|magnet|go to school/)],f:['about'],a:say(`He is a senior at the <b>Los Angeles Center for Enriched Studies (LACES)</b>, an LAUSD magnet school in Los Angeles, class of 2027.`)},
    {k:[K(/\blives?\b|hometown|where.*\bfrom\b|based (in|out)|located|which city|what city|\bstate\b/)],f:['about'],a:say(`Los Angeles, California.`)},

    /* who he is, off the laptop */
    {k:[K(/hobb|for fun|free time|spare time|outside (of )?(school|work|coding|class)|off the laptop|what does he (like|enjoy)|\benjoy|weekends?|outdoors|hik(e|ing)|climb|cycl|bike|swim|backpack|camping/)],f:['fencing','about'],a:say(`Off the laptop he fences épée for Team USA, and he likes eating, puzzles, the outdoors and naps.`,`The outdoors means rock climbing, backpacking, hiking, road cycling and swimming in alpine lakes.`)+pics('climb','backpack','cycle','hike')},
    {k:[K(/\bfood\b|\beat\b|eating|favou?rite (meal|dish|restaurant|snack)|cook/)],f:['about'],a:say(`Eating is on his own list of hobbies, right after fencing. The site doesn’t name a favorite food; that one you’d have to ask him: ${MAIL}`)},
    {k:[K(/\bnaps?\b|napping|sleep/)],f:['about'],a:say(`Yes, naps are on his own list of hobbies, next to eating, puzzles and the outdoors.`)},
    {k:[K(/brother|sibling|ryan|family/)],f:['research'],a:say(`His brother, Ryan Erlikhman, is his co-author on two papers: ${S('rs-t4','the portfolio paper')} (Oxford Journal of Student Scholarship) and ${S('rs-t5','the Legatum robustness audit')} (Journal of High School Science).`)},
    {k:[K(/jewish|\bjsu\b|judaism|religio/)],f:['record'],a:say(`He is president of the <b>Jewish Student Union</b> at LACES (50+ members, two years) and co-founded ${S('case-safejew','SafeJew')}, a live map of antisemitic incidents across Greater Los Angeles.`)},
    {k:[K(/interest|passion|care about|what is he into|fields?|major|study in college|want to (study|do|be)|career|future|goals?|dream/)],f:['research','work'],a:say(`His fields are machine learning and NLP, AI evaluation, data science, quantitative finance, startups and AI in education.`,`In his own words, he builds software for problems he cares about, for people who need it, and wants to keep doing that through college and his professional life.`)},
    {k:[K(/college|universit|appl(y|ying|ication)|admission|\bmit\b|recruit|harvard|stanford|ivy/)],f:['fencing'],a:say(`He is in <b>active recruitment with MIT</b> for fencing. The site doesn’t list where else he is applying.`)},
    {k:[K(/why (should|admit|hire|him)|impressive|special|stand ?out|highlights?|summary|summari[sz]e|tl.?dr|in short|sum (him|it) up|accomplish|proud|best (thing|work)|resume summary|in a nutshell/)],f:['research','work','fencing'],a:say(`In short:`)+ul([`<b>Four accepted papers</b>, one a Best Paper Finalist at IEEE BigData and one sole-authored, at an AACL-IJCNLP workshop`,`<b>Team USA épée</b>: 6th at the Cadet Pan-American Championships, and a peak of No. 17 nationally as a Cadet`,`<b>Four internships</b> in machine learning, software and venture capital`,`<b>Four hackathon wins</b>: TrojanHacks, SEPHacks, VISION HACK and Decode the Ocean`,`<b>National Merit Semifinalist</b>, with a 4.0 unweighted GPA and a 1520 SAT`])},
    {k:[K(/right now|currently|these days|working on|up to|upcoming|coming up|this (fall|month|winter)/)],f:['experience','research'],a:say(`Right now he is interning at ${S('xp-firstness','Firstness')} and in ${S('xp-kiddom','Kiddom’s')} ML mentorship.`,`Coming up: ${S('rs-t2','Curated to Win')}’s workshop (ARRSI at AACL-IJCNLP, 10 Nov), aiEDU’s student panel at NCSS in San Diego (2 Dec), and IEEE BigData in Phoenix (17 Dec), where ${S('rs-t1','his multilingual attribution paper')} is a Best Paper Finalist.`)},

    /* research in general */
    {k:[K(/how many (papers|publications)|publications?|published|peer.?review|list (of )?(his )?papers/)],f:['research'],a:say(`Five papers: four accepted and one preprint.`)+ul([`${S('rs-t1','<b>Interpretable Multilingual Attribution of Frontier LLMs</b>')}: IEEE BigData 2026 High School Symposium, Best Paper Finalist`,`${S('rs-t2','<b>Curated to Win</b>')}: ARRSI workshop at AACL-IJCNLP 2026, sole author`,`${S('rs-t3','<b>Whose Line Is It Anyway?</b>')}: preprint, arXiv forthcoming`,`${S('rs-t4','<b>Does Portfolio Optimization Beat Splitting Evenly?</b>')}: accepted with revisions, Oxford Journal of Student Scholarship`,`${S('rs-t5','<b>How Robust Are the Legatum Prosperity Index Rankings?</b>')}: accepted with revisions, Journal of High School Science`])},
    {k:[K(/journals?/)],f:['research'],a:say(`Two journal papers, both accepted with revisions and both with his brother Ryan: ${S('rs-t4','the portfolio paper')} at the Oxford Journal of Student Scholarship and ${S('rs-t5','the Legatum robustness audit')} at the Journal of High School Science.`)},
    {k:[K(/co.?authors?|collaborat|michael|tarekegn|philo|juang|who (does|did) he work with|teammates?/)],f:['research','work'],a:ul([`<b>Michael Tarekegn</b>: co-author on both LLM papers, and his teammate on Hivemind, Monte and Safe Routes`,`<b>Philo Juang</b>: co-author on both LLM papers`,`<b>Ryan Erlikhman</b>, his brother: co-author on the two journal papers`])+say(`${S('rs-t2','Curated to Win')} is his alone.`)},
    {k:[K(/mentor|advis|supervis|professor|\bphd\b/)],f:['research'],a:say(`His two LLM papers are co-authored with Philo Juang. At ${S('xp-kiddom','Kiddom')} he is mentored by the Director of Data Science, and his advanced mathematics research is with a PhD mentor.`)},
    {k:[K(/\bmath|number theory|combinator|game theory|induction|olympiad/)],f:['research'],a:say(`Alongside the ML work, he is doing advanced mathematics research with a PhD mentor: induction, number theory, combinatorics and game theory.`)},
    {k:[K(/languages? (does|do|can) he speak|speak (any )?(other |foreign )?languages|spanish|russian|hebrew|bilingual|fluent/,4)],f:['about'],a:say(`The site doesn’t list the languages he speaks. Ask him directly: ${MAIL}`)},
    {k:[K(/conferences?|present|\btalks?\b|speak(er|ing)?|panel|podcast|phoenix|san diego|hengqin|china|ncss|aiedu/)],f:['research','record'],a:say(`He will present at the IEEE BigData 2026 High School Symposium in Phoenix (17 Dec), where ${S('rs-t1','his multilingual attribution paper')} is a Best Paper Finalist, and speak on aiEDU’s student panel on AI at NCSS 2026, the National Consortium of STEM Schools, in San Diego (2 Dec).`,`${S('rs-t2','Curated to Win')} is accepted at the ARRSI workshop at AACL-IJCNLP 2026 (Hengqin, China, 10 Nov), and aiEDU has invited him onto its podcast, hosted by its CEO, Alex Kotran.`)},

    /* skills */
    {k:[K(/programming|coding|tech ?stack|\bstack\b|python|javascript|typescript|react|next\.?js|\bsql\b|skills|code in|frameworks?|what tools/)],f:['work'],a:ul([`<b>Python</b> for ML and data: his papers, the Citadel bot, Alliance’s investor-matching engine and AIML-LI’s notebooks`,`<b>TypeScript and JavaScript</b>, with Next.js and Supabase, for the web: Hivemind, Monte and SafeJew`,`<b>SQL</b> for data work, as in the investor-matching engine`])},
    {k:[K(/hackathons?|\bhacks?\b|\bwon\b|\bwins?\b|winning|first place|1st place|placed/)],f:['work'],a:say(`Four wins and a 3rd:`)+ul([`<b>1st, Finance track</b>, ACM TrojanHacks 2026: ${S('case-monte','Monte')}`,`<b>Won Lemma’s agent track</b>, SEPHacks 2026: ${S('case-hivemind','Hivemind')}`,`<b>1st, Council District 9 Champion, Under 18</b>, VISION HACK: South LA: ${S('case-ledger','Ledger')}`,`<b>1st</b>, Decode the Ocean (Lovable × United Nations): eDNAtlas`,`<b>3rd internationally</b>, Code for Transportation: ${S('case-saferoutes','Safe Routes')}`])},
    {k:[K(/\bgrants?\b|funded|funding|jfedla|federation/)],f:['work'],a:say(`${S('case-safejew','SafeJew')} is funded by a <b>Teen Innovation Grant</b> from the Jewish Federation of Greater Los Angeles (JFEDLA).`)},

    /* fencing */
    {k:[K(/what is (an )?[ée]p[ée]e|what'?s (an )?[ée]p[ée]e|weapons?|\bfoil\b|sabre|saber/,4)],f:['fencing'],a:say(`Épée is one of fencing’s three weapons. The whole body is target, touches land with the point, and there is no right-of-way, so both fencers can score at once.`)},
    {k:[K(/\branks?\b|ranked|ranking|number one|\bno\.? ?\d|how good|national(ly)?|standing/)],f:['fencing'],a:say(`Nationally he is <b>No. 49 in U.S. Junior (U20)</b> and <b>No. 78 in U.S. Senior</b> épée, with a peak of <b>No. 17 as a Cadet (U17)</b>. He is No. 1 in Region 4. ${X('https://fencingtracker.com/p/100253463/Adrian-Erlikhman','Full record')}`)},
    {k:[K(/rating|\ba26\b|a.?rated/)],f:['fencing'],a:say(`<b>A26</b>: an A, the highest USA Fencing rating, earned in 2026.`)},
    {k:[K(/team usa|pan.?am|bogot|represent|international|\busa\b|what team/)],f:['fencing'],a:say(`He fenced for <b>Team USA</b> at the Cadet Pan-American Championships in Bogotá and placed 6th.`)+pics('lunge','podium')},
    {k:[K(/\bclub\b|coach|\btrain(s|ing)?\b|practice|fencing center/)],f:['fencing'],a:say(`He trains at LA International Fencing Center.`)},
    {k:[K(/results?|medals?|tournaments?|nationals|\bnac\b|north american cup|podium|best finish/)],f:['fencing'],a:say(`His best results:`)+ul([`<b>6th</b>, Cadet Pan-American Championships, for Team USA (Bogotá)`,`<b>Top 8</b>, Super Junior & Cadet Circuit`,`<b>Top 16</b>, Cadet, October North American Cup`,`<b>Top 32</b>, Div I, National Championships`,`<b>4× Junior Regional Champion</b>`])},
    {k:[K(/all.?american|all.?academic/)],f:['fencing','record'],a:say(`He is a <b>3× All-American</b> and a <b>3× All-Academic</b>, both First Team, from USA Fencing. All-Academic takes a national result and a 3.85+ GPA.`)},
    {k:[K(/\bvideos?\b|\bwatch\b|\bbouts?\b|footage|\bclips?\b/)],go:'fencing',to:'bouts'},

    /* honors */
    {k:[K(/y ?combinator|\byc\b|startup school/,4)],f:['record'],a:say(`He was admitted to <b>Y Combinator’s Startup School 2026</b>, which takes under 5% of applicants.`)+pics('yc')},
    {k:[K(/stemsters|volunteer|elementary|community service|tutor/)],f:['record'],a:say(`He co-founded and is president of <b>STEMsters</b> at LACES: 30+ volunteers in four elementary schools.`)},
    {k:[K(/\bleader(ship)?s?\b|president|\blead(s|ing)?\b|co.?found|founded/)],f:['record','work'],a:ul([`<b>President</b>, Jewish Student Union at LACES (50+ members, two years)`,`<b>Co-founder and president</b>, STEMsters (30+ volunteers in four elementary schools)`,`<b>Co-founder and lead</b>, ${S('case-aimlli','AIML-LI')}, since 2023`,`<b>Co-founder</b>, ${S('case-safejew','SafeJew')}`])},

    /* reaching him */
    {k:[K(/phone|call him|text him|\bcell\b/)],f:['contact'],a:say(`Email is the way to reach him: ${MAIL}. He usually answers the same day.`)},
    {k:[K(/linkedin/)],f:['contact'],a:say(`${X('https://www.linkedin.com/in/adrian-erlikhman-78a262414','linkedin.com/in/adrian-erlikhman-78a262414')}`)},
    {k:[K(/github|\brepos?\b|repositor|open.?source|source code|\bcode\b/)],f:['contact'],a:say(`His code is on GitHub: ${X('https://github.com/adrian-erlikhman','github.com/adrian-erlikhman')}. The public repos include the code and data for ${X('https://github.com/adrian-erlikhman/LangLLM','his multilingual attribution paper')}, ${X('https://github.com/adrian-erlikhman/curated-to-win','Curated to Win')} and ${X('https://github.com/adrian-erlikhman/self-recognition-peer-baseline','Whose Line Is It Anyway?')}.`)},
    {k:[K(/r[eé]sum[eé]|\bcv\b/)],f:['contact'],a:say(`Here is his résumé: <a href="resume.pdf" target="_blank" data-cv-menu>open it</a> (one page, or three).`)},
    {k:[K(/instagram|twitter|tiktok|social media|socials/)],f:['contact'],a:say(`He is on ${X('https://www.linkedin.com/in/adrian-erlikhman-78a262414','LinkedIn')} and ${X('https://github.com/adrian-erlikhman','GitHub')}; those are the ones on the site.`)},
    {k:[K(/e-?mail|contact|reach|get in touch|message him|talk to him|hire|hiring/)],go:'contact'},

    /* whole topics: these open their conversation */
    {k:[K(/intern|experience|\bjobs?\b|worked|employ|work history/,2)],go:'experience'},
    {k:[K(/research|papers?|study|studies|scien/,2)],go:'research'},
    {k:[K(/built|\bbuild|projects?|\bapps?\b|products?|\bmade\b|creat|software/,2)],go:'work'},
    {k:[K(/fenc|[ée]p[ée]e|sports?|athlet/,2)],go:'fencing'},
    {k:[K(/honou?rs?|awards?|achiev|recogni|prizes?|accolade/,2)],go:'record'},
    {k:[K(/\bwho\b|about (him|adrian)|tell me about|introduc|background|\bbio\b|what does (he|adrian) do|^adrian\??$|^him\??$/,2)],go:'about'},

    /* the chat itself */
    {k:[K(/are you (an? )?(ai|bot|robot|real|human|chat ?gpt|gpt|claude|llm|person)|is this (an? )?(ai|chat ?gpt|gpt|real|bot)|who am i (talking|speaking)|chat ?bot|chat ?gpt/,4)],f:['about'],a:say(`There is no AI model here. This is Adrian’s site, laid out like a chat, and every answer is written ahead of time from his record, so it can’t make anything up.`)},
    {k:[K(/this (site|website|page)|the (site|website)|how was this (made|built)/)],f:['about'],a:say(`It is Adrian’s own site: plain HTML, CSS and JavaScript on GitHub Pages, laid out like a chat. Every answer is written ahead of time from his record.`)},
    {k:[K(/^(hi|hello|hey|yo|sup|hiya|howdy|good (morning|afternoon|evening))\b/)],f:['about','research','work'],a:say(`Hi! Ask anything about Adrian: his research, what he has built, his internships, his fencing or his honors.`)},
    {k:[K(/how are you|how'?s it going|what'?s up/)],f:['about'],a:say(`Doing well, thanks. Ask anything about Adrian.`)},
    {k:[K(/thanks?|thx|appreciate|\bcool\b|\bnice\b|awesome|\bgreat\b|\bwow\b/,2)],f:['contact'],a:say(`Glad that helped. Anything else about Adrian?`)},
    {k:[K(/\bhelp\b|what can (i|you)|what do you know|options|\bmenu\b/)],help:1}
  ];
  const norm=t=>t.toLowerCase().replace(/[’‘`]/g,"'").replace(/\s+/g,' ').trim();
  function best(t){ let top=null,s=0; for(const e of KB){ let v=0; for(const [re,w] of e.k) if(re.test(t)) v+=w; if(v>s){ s=v; top=e; } } return s>=2?top:null; }
  const chips=ks=>`<div class="cg-follow">${ks.map(chipHTML).join('')}</div>`;
  const card=k=>{ const d=BIG&&BIG.D&&BIG.D[k]; if(!d) return '';
    return `<div class="cg-cards"><a class="cg-card${IMG[k]?'':' noimg'}" href="#" data-cgdv="${k}">${IMG[k]?`<img src="${IMG[k]}" alt="" loading="lazy">`:''}<div class="t"><b>${d.n.split(':')[0]}</b><span>${d.a[0]}</span></div></a></div>`; };
  const helpHTML=()=>say(`I can tell you about Adrian’s research, what he has built, his internships, his fencing and his honors, and most smaller things too: his GPA, his school, his rankings, how to reach him. Try one of these:`)+chips(Object.keys(convs));
  const missHTML=()=>say(`I don’t have an answer for that one. I only know about Adrian: his research, what he has built, his internships, his fencing and his honors.`,`If it’s about him and I missed it, ask him directly: ${MAIL}.`)+chips(['about','research','work','fencing']);
  /* a typed answer goes under the open conversation, as a follow-up; from the empty screen it starts a fresh thread ("ask") */
  function askConv(){ if(!convs.ask){ col.insertAdjacentHTML('beforeend','<article class="cg-conv" data-conv="ask" id="c-ask"></article>'); convs.ask=col.lastElementChild; } return 'ask'; }
  async function reply(text,html){
    if(busy){ run++; busy=false; }
    const my=++run; busy=true;
    if(!cur) select(askConv());
    const c=convs[cur];
    c.insertAdjacentHTML('beforeend',`<div class="cg-u"><div></div></div><div class="cg-a cg-extra"></div>`);
    const kids=c.children,u=kids[kids.length-2].firstElementChild,a=kids[kids.length-1]; u.textContent=text;
    thread.scrollTop=u.parentElement.offsetTop-12;
    a.innerHTML='<span class="cg-think">Thinking</span>'; await sleep(RM?100:800);
    const tmp=document.createElement('div'); tmp.innerHTML=html;     // a newer question cuts the animation, never the answer
    a.innerHTML=''; for(const el of [...tmp.children]){ a.appendChild(el); if(my!==run) continue;
      if(el.matches('.cg-say')){ const h=el.innerHTML; await streamSay(el,h,my); } else { stagger(el); await sleep(220); } }
    a.insertAdjacentHTML('afterend',acts()); if(my===run) busy=false;
  }
  function answer(t){ const e=best(norm(t));
    if(!e) return reply(t,missHTML());
    if(e.go) return open(e.go,e.to?{to:e.to,instant:true}:{});
    if(e.help) return reply(t,helpHTML());
    return reply(t,e.a+(e.dv?card(e.dv):'')+(e.f?chips(e.f):'')); }

  /* ---- the visitor ---- */
  const stopAuto=()=>{ auto=false; if(typing){ typing=false; inp.value=''; send.classList.add('cg-off'); } };
  root.addEventListener('click',e=>{
    const q=e.target.closest('[data-conv]'); if(q){ e.preventDefault(); stopAuto(); if(BIG&&q.dataset.conv!==cur) BIG.close(true); open(q.dataset.conv); return; }
    const c=e.target.closest('[data-cgdv]'); if(c&&BIG){ e.preventDefault(); stopAuto(); BIG.open(c.dataset.cgdv,c); return; }
    const act=e.target.closest('[data-act]'); if(act){ stopAuto(); const row=act.parentElement,box=row.previousElementSibling;
      if(act.dataset.act==='copy'){ const done=()=>{ act.innerHTML=P(IC.ok); setTimeout(()=>act.innerHTML=P(IC.copy),1500); };
        try{ navigator.clipboard.writeText(box.innerText).then(done,done); }catch(_){ done(); } }
      else if(act.dataset.act==='again'){ const conv=act.closest('.cg-conv'); if(conv&&conv.dataset.conv!=='ask'&&row===conv.querySelector('.cg-acts2')){ played.delete(conv.dataset.conv); open(conv.dataset.conv); } }
      else { act.classList.toggle('on'); row.querySelector(`[data-act="${act.dataset.act==='up'?'down':'up'}"]`).classList.remove('on'); }
      return; }
  });
  /* photos in an answer (About, the outdoors, Team USA) open large on a click, as ChatGPT's image results do */
  const lb=document.createElement('div'); lb.className='cg-lb'; lb.hidden=true;
  lb.innerHTML=`<button class="cg-ib cg-lbx" type="button" aria-label="Close">${P('<path d="M5 5l10 10M15 5L5 15"/>')}</button><img alt=""><video controls playsinline hidden></video><p></p>`;
  document.body.appendChild(lb); const lbImg=lb.querySelector('img'),lbVid=lb.querySelector('video');
  const lbClose=()=>{ if(lb.hidden) return; lb.hidden=true; lbVid.pause(); lbVid.removeAttribute('src'); lbVid.load(); if(lb._from) lb._from.focus(); };
  lb.addEventListener('click',e=>{ if(e.target!==lbVid) lbClose(); });
  /* the bouts' video cards play here too, with sound and controls */
  root.addEventListener('click',e=>{ const b=e.target.closest('.cg-imgs button,.cg-media button,[data-video]'); if(!b) return;
    if(b.matches('a')&&(e.metaKey||e.ctrlKey||e.shiftKey)) return;
    e.preventDefault(); stopAuto(); const vid=b.matches('[data-video]');
    lbImg.hidden=vid; lbVid.hidden=!vid;
    if(vid){ lbVid.src=b.getAttribute('href'); lbVid.poster=b.querySelector('img').src; const p=lbVid.play(); if(p&&p.catch) p.catch(()=>{}); }
    else { const im=b.querySelector('img'); lbImg.src=im.currentSrc||im.src; lbImg.alt=im.alt; }
    lb.querySelector('p').textContent=b.dataset.cap||'';
    lb._from=b; lb.hidden=false; lb.querySelector('.cg-lbx').focus(); });
  /* the paper reader: a link to one of the site's PDFs opens the whole paper over the page, in the browser's own PDF viewer
     (zoom, search, download). Where the browser can't show a PDF inline (most phones), or on ctrl/cmd-click, the link
     opens the PDF in a new tab as before. */
  const rd=document.createElement('div'); rd.className='cg-rd'; rd.hidden=true;
  rd.innerHTML=`<div class="cg-rd-p" role="dialog" aria-modal="true" aria-label="Paper"><div class="cg-rd-b"><b></b><a class="cg-rd-o" target="_blank" rel="noopener">Open in a new tab ↗</a><button class="cg-ib cg-rd-x" type="button" aria-label="Close">${P('<path d="M5 5l10 10M15 5L5 15"/>')}</button></div><iframe title="Paper"></iframe></div>`;
  document.body.appendChild(rd); const rdF=rd.querySelector('iframe');
  const inlinePDF=navigator.pdfViewerEnabled!==false&&matchMedia('(min-width:760px)').matches;
  const rdClose=()=>{ if(rd.hidden) return; rd.hidden=true; rdF.removeAttribute('src'); if(rd._from) rd._from.focus({preventScroll:true}); };
  rd.addEventListener('click',e=>{ if(e.target===rd||e.target.closest('.cg-rd-x')) rdClose(); });
  addEventListener('keydown',e=>{ if(e.key==='Escape'&&!rd.hidden){ e.stopImmediatePropagation(); rdClose(); } },true);
  document.addEventListener('click',e=>{ const a=e.target.closest('a[href^="/papers/"][href*=".pdf"]'); if(!a||!inlinePDF||a.hasAttribute('data-dv')) return;
    if(e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0) return;
    e.preventDefault(); e.stopPropagation(); stopAuto();
    const card=a.closest('.cv'), t=card&&card.querySelector('.cv-ti,.cv-id b');
    rd.querySelector('b').textContent=t?t.textContent:'Paper';
    rd.querySelector('.cg-rd-o').href=a.getAttribute('href');
    rdF.src=a.getAttribute('href')+'#view=FitH'; rd._from=a; rd.hidden=false; rd.querySelector('.cg-rd-x').focus(); },true);
  /* #links anywhere (the About paragraph, the big view, the palette) open the conversation that holds the target */
  function convOf(id){ const el=document.getElementById(id); const c=el&&el.closest('.cg-conv'); return c?c.dataset.conv:null; }
  window.cgOpen=h=>{ const id=(h||'').replace(/^#/,''); const k=convOf(id); if(!k) return false; stopAuto(); if(BIG) BIG.close(true); open(k,{to:id,instant:true}); return true; };
  document.addEventListener('click',e=>{ const a=e.target.closest('a[href^="#"]'); if(!a||a.closest('#cgPop')) return;
    const id=decodeURIComponent(a.getAttribute('href').slice(1)); if(!id||id==='top') return; const k=convOf(id); if(!k) return;
    e.preventDefault(); stopAuto(); if(BIG) BIG.close(true); open(k,{to:id,instant:true}); history.replaceState(null,'','#'+id); });
  root.addEventListener('pointerdown',e=>{ if(!e.target.closest('.cg-thread')||e.target.closest('a,button,video')) stopAuto(); });
  inp.addEventListener('focus',stopAuto);
  inp.addEventListener('input',()=>send.classList.toggle('cg-off',!inp.value.trim()));
  form.addEventListener('submit',e=>{ e.preventDefault(); const t=inp.value.trim(); if(!t) return; stopAuto(); inp.value=''; send.classList.add('cg-off'); answer(t); });
  $('cgNew').addEventListener('click',()=>{ stopAuto(); if(BIG) BIG.close(true); run++; busy=false; if(convs.ask) convs.ask.innerHTML=''; root.classList.remove('chatting'); Object.values(convs).forEach(c=>c.classList.remove('on')); cur=null; mark(''); closeSide(); inp.focus(); });
  $('cgSearch').addEventListener('click',()=>{ stopAuto(); closeSide(); inp.focus(); });
  $('cgPlus').addEventListener('click',()=>{ stopAuto(); reply('What can I ask?',helpHTML()); });
  const model=$('cgModel'),pop=$('cgPop');
  const popOpen=o=>{ pop.hidden=!o; model.setAttribute('aria-expanded',o?'true':'false'); };
  model.addEventListener('click',e=>{ e.stopPropagation(); popOpen(pop.hidden); });
  pop.addEventListener('click',()=>popOpen(false));
  document.addEventListener('click',e=>{ if(!pop.hidden&&!e.target.closest('.cg-mw')) popOpen(false); });
  addEventListener('keydown',e=>{ if(e.key==='Escape'){ popOpen(false); closeSide(); lbClose(); } });
  function closeSide(){ root.classList.remove('side-open'); }
  $('cgMenu').addEventListener('click',()=>root.classList.add('side-open'));
  $('cgClose').addEventListener('click',closeSide);
  $('cgScrim').addEventListener('click',closeSide);

  /* ---- landing: a #link opens its conversation at once; otherwise "Who are you?" types itself in and plays ---- */
  const hid=decodeURIComponent(location.hash.slice(1)), hk=hid&&convOf(hid);
  if(hk){ auto=false; open(hk,{to:hid,instant:true}); }
  async function demo(){
    await sleep(700); if(!auto) return;
    typing=true; inp.value=''; send.classList.remove('cg-off');
    for(const ch of Q.about){ if(!auto) return; inp.value+=ch; await sleep(RM?0:40); }
    await sleep(RM?0:380); if(!auto) return; typing=false; auto=false;
    inp.value=''; send.classList.add('cg-off'); open('about');
  }
  if(!hk){ if(!document.body.classList.contains('intro-lock')) demo();
    else{ const w=setInterval(()=>{ if(!document.body.classList.contains('intro-lock')){ clearInterval(w); demo(); } },150); } }
})();

/* ================= NAV: the section in view is underlined ================= */
(function(){
  const links=[...document.querySelectorAll('.nav nav a[href^="#"]')]; if(!links.length) return;
  const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id));}),{rootMargin:'-45% 0px -50% 0px'});
  links.forEach(l=>{const s=document.querySelector(l.getAttribute('href'));if(s)spy.observe(s);});
})();
