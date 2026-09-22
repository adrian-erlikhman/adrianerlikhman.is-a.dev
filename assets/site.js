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
/* reveal + meters + counters */
const io=new IntersectionObserver(es=>{es.forEach(en=>{if(!en.isIntersecting)return;
  en.target.classList.add('in');
  en.target.querySelectorAll('.meter i').forEach(b=>b.style.width=b.dataset.w+'%');
  en.target.querySelectorAll('[data-count]').forEach(c=>{const t=+c.dataset.count,t0=performance.now();
    (function s(n){const p=Math.min((n-t0)/1200,1);c.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(s)})(t0);});
  io.unobserve(en.target);});},{threshold:.16});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
/* progress bar */
const tb=document.getElementById('topbar');
if(tb) addEventListener('scroll',()=>{const h=document.documentElement;tb.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100+'%';},{passive:true});
/* year */
{const yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();}

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
    "a first-author nlp paper submitted to neurips 2026 (judge workshop)",
    "a software and ml internship at firstness, working directly under the founder",
    "a vc internship working with early-stage b2b and saas companies",
    "an ai summit for 200+ la students, with google deepmind and microsoft on stage",
    "a student panel on ai at the national consortium of stem schools",
    "a hidden-markov portfolio optimizer for turbulent markets",
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

/* ================= INTERACTIVE LIFE DECK ================= */
(function(){
  const deck=document.getElementById('lifedeck'); if(!deck) return;
  const cards=[...deck.querySelectorAll('.lcard')];
  const n=cards.length, mid=(n-1)/2;
  let GAP=88, ROT=7, YOFF=12;
  /* size the fan to the deck's real width so no card can spill past the viewport (mobile) */
  function calc(){
    const dw=deck.clientWidth||360;
    const cw=(cards[0]?cards[0].getBoundingClientRect().width:200)||200;
    const fit=mid>0?((dw/2)-(cw/2)-8)/mid:88;
    GAP=Math.max(22,Math.min(88,fit));
    ROT=GAP<58?4.5:7; YOFF=GAP<58?8:12;
  }
  const base=i=>({x:(i-mid)*GAP, y:Math.abs(i-mid)*YOFF, r:(i-mid)*ROT});
  function layout(px){
    cards.forEach((c,i)=>{
      if(c.classList.contains('focus')) return;
      const b=base(i), tilt=(px||0)*11;
      c.style.transform=`translateX(${b.x}px) translateY(${b.y}px) rotate(${b.r}deg) rotateY(${tilt}deg)`;
      c.style.zIndex=10+(n-Math.abs(i-mid));
    });
  }
  calc(); layout(0);
  addEventListener('resize',()=>{calc();layout(0);});
  deck.addEventListener('mousemove',e=>{const r=deck.getBoundingClientRect();layout(((e.clientX-r.left)/r.width-0.5)*2);});
  deck.addEventListener('mouseleave',()=>layout(0));
  cards.forEach((c,i)=>{
    c.addEventListener('mouseenter',()=>{ if(c.classList.contains('focus'))return;
      const b=base(i); c.style.transform=`translateX(${b.x}px) translateY(-20px) rotate(0deg) scale(1.06)`; c.style.zIndex=50; });
    c.addEventListener('click',()=>{
      const was=c.classList.contains('focus');
      cards.forEach(x=>x.classList.remove('focus'));
      if(!was){ c.classList.add('focus'); c.style.transform='translateX(0) translateY(-8px) rotate(0deg) scale(1.32)'; c.style.zIndex=60; }
      else layout(0);
    });
  });
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
  const ACChex=css.getPropertyValue('--acc').trim()||'#c1543a';
  const INKhex=css.getPropertyValue('--ink').trim()||'#1a1c22';
  const DIMhex=css.getPropertyValue('--dim').trim()||'#5d6470';
  const ACC=ACChex, RED='#e5484d';

  const isTouch=matchMedia('(pointer:coarse)').matches;
  let mx=-1,my=-1,ready=false;
  if(!isTouch) addEventListener('mousemove',e=>{mx=e.clientX*DPR;my=e.clientY*DPR;});

  // interactive equity chart — candlesticks + close line + hover crosshair (no rain, no boot log)
  const DOWN='#a49e8c';                 // warm gray for down-moves (no red clash with rust)
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
      rows.forEach((ln,i)=>{ctx.fillStyle=i===0?ACC:(i===5?(upC?ACC:DOWN):'#efece3');ctx.fillText(ln,bxp+9*DPR,by0+18*DPR+i*15*DPR);});
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
/* scroll-spy: light the nav link for the section in view */
(function(){
  const links=[...document.querySelectorAll('.hud .navset a[href^="#"]')];
  const map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
  const spy=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){links.forEach(l=>l.classList.remove('active'));const a=map.get(e.target.id);if(a)a.classList.add('active');}
  }),{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('section[id]').forEach(s=>spy.observe(s));
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
    {ic:'▸',label:'Fencing',k:'jump',run:()=>go('#fencing')},
    {ic:'▸',label:'Achievements',k:'jump',run:()=>go('#record')},
    {ic:'▸',label:'Selected work',k:'jump',run:()=>go('#work')},
    {ic:'▸',label:'Contact',k:'jump',run:()=>go('#contact')},
    {ic:'▸',label:'All projects, experiments & achievements',k:'page',run:()=>{close();location.href='/work/';}},
    {ic:'▸',label:'Demos: which model wrote this?',k:'page',run:()=>{close();location.href='/demos/';}},
    {ic:'✉',label:'Email Adrian',k:'link',run:()=>{close();location.href='mailto:erlikhman.adrian@gmail.com';}},
    {ic:'↗',label:'Open GitHub',k:'link',run:()=>ext('https://github.com/adrian-erlikhman')},
    {ic:'in',label:'Open LinkedIn',k:'link',run:()=>ext('https://www.linkedin.com/in/adrian-erlikhman-55489620b')},
    {ic:'↓',label:'Résumé: short, 1 page',k:'file',run:()=>ext(cv('short'))},
    {ic:'↓',label:'Résumé: long, 3 pages',k:'file',run:()=>ext(cv('long'))},
    {ic:'</>',label:'Repo: Regime-Aware Portfolio Optimizer',k:'repo',run:()=>ext('https://github.com/adrian-erlikhman/regime-aware-portfolio-optimizer')},
    {ic:'</>',label:'Repo: LSTM Equity Forecaster',k:'repo',run:()=>ext('https://github.com/adrian-erlikhman/lstm-equity-forecaster')},
    {ic:'</>',label:'Repo: FinBERT Sentiment Analyzer',k:'repo',run:()=>ext('https://github.com/adrian-erlikhman/finbert-sentiment-analyzer')},
    {ic:'</>',label:'Repo: Fraud Detection System',k:'repo',run:()=>ext('https://github.com/adrian-erlikhman/fraud-detection-system')},
    {ic:'</>',label:'Repo: Earshot (NLP patents)',k:'repo',run:()=>ext('https://github.com/adrian-erlikhman/earshot')},
    {ic:'¶',label:'Paper: Portfolio Optimization vs 1/N',k:'pdf',run:()=>ext('/papers/portfolio-optimization-vs-equal-weight.pdf')},
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
    regime:{file:'regime_optimizer.py',repo:'https://github.com/adrian-erlikhman/regime-aware-portfolio-optimizer',desc:'HMM regime detection → conditional allocation',
      problem:'A static 60/40 portfolio is blind to whether the market is calm or turbulent.',
      approach:'Fit a 2-state Gaussian HMM to returns, then de-risk hard in the high-volatility regime.',
      result:'+4.0% return at roughly half the volatility — Sharpe 0.49 vs −0.05 for static 60/40.'},
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

/* ================= COMPLLM STYLOMETRY DEMO ================= */
(function(){
  const sv=document.getElementById('stylo'); if(!sv) return;
  const MODELS=[{n:'Human',s:[17,.67,1.3,0]},{n:'GPT',s:[22,.55,2.2,4]},{n:'Claude',s:[19,.62,1.6,2]},{n:'Gemini',s:[15,.50,1.2,3]},{n:'Grok',s:[13,.58,.9,1]},{n:'DeepSeek',s:[24,.52,2.0,6]}];
  const AIV=['delve','tapestry','testament','underscore','underscores','showcase','showcases','intricate','pivotal','vibrant','realm','foster','fosters','landscape','nuanced','crucial','leverage','robust','seamless','holistic','myriad','evolving'];
  function analyze(t){
    t=(t||'').trim();
    const sents=t.split(/[.!?]+/).filter(s=>s.trim().length>0);
    const words=(t.toLowerCase().match(/[a-z']+/g)||[]);
    const nW=Math.max(1,words.length), nS=Math.max(1,sents.length);
    const avg=nW/nS, ttr=new Set(words).size/nW;
    const comma=(t.match(/,/g)||[]).length/nS;
    const ai=words.filter(w=>AIV.indexOf(w)>-1).length/nW*1000;
    const syll=words.reduce((a,w)=>a+Math.max(1,(w.match(/[aeiouy]+/g)||[]).length),0);
    const flesch=Math.max(0,Math.min(120,206.835-1.015*avg-84.6*(syll/nW)));
    return {nW,avg,ttr,comma,ai,flesch};
  }
  function classify(f){
    const sc=[3.4,.12,1.0,3.0], out=MODELS.map(m=>{
      const d=Math.sqrt(Math.pow((f.avg-m.s[0])/sc[0],2)+Math.pow((f.ttr-m.s[1])/sc[1],2)+Math.pow((f.comma-m.s[2])/sc[2],2)+Math.pow((f.ai-m.s[3])/sc[3],2));
      return {n:m.n,d};
    });
    const ex=out.map(o=>Math.exp(-o.d*1.1)), sum=ex.reduce((a,b)=>a+b,0);
    out.forEach((o,i)=>o.p=ex[i]/sum*100);
    return out.sort((a,b)=>b.p-a.p);
  }
  function render(){
    const f=analyze(document.getElementById('svTa').value), r=classify(f);
    document.getElementById('svM').textContent=r[0].n;
    document.getElementById('svConf').textContent=Math.round(r[0].p)+'% similarity share';
    document.getElementById('svBars').innerHTML=r.map(o=>'<div class="sv-row"><span class="nm">'+o.n+'</span><div class="sv-track"><div class="sv-fill" style="width:'+Math.round(o.p)+'%"></div></div><span class="pc">'+Math.round(o.p)+'%</span></div>').join('');
    const feats=[['avg sentence',f.avg.toFixed(1)+' wds'],['lexical diversity',Math.round(f.ttr*100)+'%'],['commas / sentence',f.comma.toFixed(1)],['ai-vocabulary',f.ai.toFixed(1)+'/1k'],['readability',Math.round(f.flesch)]];
    document.getElementById('svFeats').innerHTML=feats.map(x=>'<div class="sv-chip"><div class="k">'+x[0]+'</div><div class="v">'+x[1]+'</div></div>').join('');
  }
  const open=()=>{sv.hidden=false;render();};
  if(!sv.hidden) render();   /* inline on /demos/, so draw it straight away */
  const close=()=>{sv.hidden=true;};
  const btn=document.getElementById('openStylo'); if(btn) btn.addEventListener('click',open);
  document.getElementById('svClose').addEventListener('click',close);
  sv.addEventListener('click',e=>{if(e.target===sv)close();});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!sv.hidden)close();});
  const ta=document.getElementById('svTa'); if(ta) ta.addEventListener('input',render);
  document.getElementById('svRun').addEventListener('click',render);
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
  const REPOS={regime:'regime-aware-portfolio-optimizer',lstm:'lstm-equity-forecaster',finbert:'finbert-sentiment-analyzer',fraud:'fraud-detection-system'};
  const PAPERS={langllm:'/papers/langllm-poster-urtc2026.pdf',portfolio:'/papers/portfolio-optimization-vs-equal-weight.pdf',robustness:'/papers/legatum-robustness-audit.pdf?v=2026-09-13',earshot:'https://github.com/adrian-erlikhman/earshot'};
  const SEC={about:'#about',experience:'#experience',record:'#record',research:'#papers',projects:'#work',fencing:'#fencing',contact:'#contact'};
  const CMDS={
    help:()=>print("nav: <b>ls</b> · <b>open &lt;project&gt;</b> · <b>read &lt;paper&gt;</b> · <b>goto &lt;section&gt;</b> · <b>demo</b> · <b>resume short|long</b> · <b>email</b><br>info: <b>whoami</b> · <b>stack</b> · <b>fencing</b> · <b>fortune</b> · <b>clear</b>",'dim'),
    demo:()=>{print("opening the demos — guess the model, and the stylometry toy …");location.href='/demos/';},
    whoami:()=>print("Adrian Erlikhman — 17, Los Angeles. Senior @ LACES. ML research, quant, and data."),
    ls:()=>print("projects: <b>regime</b> · <b>lstm</b> · <b>finbert</b> · <b>fraud</b>   papers: <b>earshot</b> · <b>portfolio</b> · <b>robustness</b><br>→ e.g. <b>open regime</b>  or  <b>read portfolio</b>",'dim'),
    open:a=>{const k=(a||'').toLowerCase(); if(REPOS[k]){print("opening github.com/adrian-erlikhman/"+REPOS[k]+" …");window.open('https://github.com/adrian-erlikhman/'+REPOS[k],'_blank');}else print("no project '"+k+"' — try: regime · lstm · finbert · fraud",'dim');},
    read:a=>{const k=(a||'').toLowerCase(); if(PAPERS[k]){print("opening "+PAPERS[k]+" …");window.open(PAPERS[k],'_blank');}else if(k==='complm'||k==='compllm'){print("CompLLM is under review at NeurIPS 2026 (JUDGe) — jumping to Research.");go('#papers');}else print("no paper '"+k+"' — try: langllm · earshot · portfolio · robustness",'dim');},
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

/* ================= GUESS THE MODEL — real LangLLM essays (assets/guess-samples.json) ================= */
(function(){
  const box=document.getElementById('guess'); if(!box) return;
  const $=id=>document.getElementById(id);
  const NAMES={gpt:'GPT-5.5',claude:'Claude Opus 4.7',gemini:'Gemini 3.5 Flash',grok:'Grok 4.3',deepseek:'DeepSeek V4 Pro'};
  const ORDER=['gpt','claude','gemini','grok','deepseek'];
  const SHORT={gpt:'GPT',claude:'Claude',gemini:'Gemini',grok:'Grok',deepseek:'DeepSeek'};
  let data=null, i=0, n=0, you=0, clf=0, jud=0, judN=0, answered=false;
  const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  /* just enough markdown to show the essays the way the models wrote them */
  const md=t=>esc(t).split(/\n{2,}/).map(b=>b.split('\n').map(line=>{
    let l=line.trim(); if(!l||/^[-*_]{3,}$/.test(l)) return '';
    const h=/^#{1,6}\s+/.test(l); l=l.replace(/^#{1,6}\s+/,'').replace(/^[-*]\s+/,'• ');
    l=l.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/(^|[^*\w])\*(?!\s)([^*]+?)\*(?!\*)/g,'$1<i>$2</i>');
    return h?'<p class="g-h">'+l+'</p>':'<p>'+l+'</p>';
  }).join('')).join('');
  const score=()=>{ $('gYou').textContent=you+'/'+n; $('gClf').textContent=clf+'/'+n; $('gJud').textContent=jud+'/'+judN; };
  function show(k){
    const s=data.samples[k]; answered=false;
    $('gCount').textContent='essay '+(k+1)+' of '+data.samples.length;
    $('gTopic').textContent='prompt: '+s.topic.toLowerCase()+' ('+s.stance+')';
    const t=$('gText'); t.innerHTML=md(s.text); t.scrollTop=0;
    $('gChoices').innerHTML=ORDER.map(m=>'<button type="button" data-m="'+m+'">'+NAMES[m]+'</button>').join('');
    $('gReveal').hidden=true; $('gReveal').innerHTML='';
  }
  function guess(m){
    if(answered) return; answered=true;
    const s=data.samples[i], a=s.author, right=m===a;
    n++; if(right) you++; if(s.classifier_correct) clf++;
    const js=ORDER.map(j=>[j,s.judges[j]]);
    const hits=js.filter(([,g])=>g===a).length; jud+=hits; judN+=js.length; score();
    $('gChoices').querySelectorAll('button').forEach(b=>{
      b.disabled=true;
      if(b.dataset.m===a) b.classList.add('is-true');
      else if(b.dataset.m===m) b.classList.add('is-wrong');
    });
    const last=i===data.samples.length-1;
    $('gReveal').innerHTML=
      '<p class="g-line"><b>'+NAMES[a]+'</b> wrote it. '+(right?'You got it.':'You said '+NAMES[m]+'.')+'</p>'+
      '<p class="g-line"><span class="g-k">my classifier</span>'+(s.classifier_correct?'<span class="ok">named '+NAMES[a]+' ✓</span>':'<span class="no">picked another model ✗</span>')+
      '<span class="g-why"> · 21 interpretable features, never trained on this prompt</span></p>'+
      '<p class="g-line"><span class="g-k">the models, asked who wrote it</span><span class="g-judges">'+
      js.map(([j,g])=>'<span class="'+(g===a?'ok':'no')+'">'+SHORT[j]+' said '+(g?SHORT[g]:'nothing usable')+(g===a?' ✓':' ✗')+'</span>').join('')+'</span></p>'+
      (last
        ? '<p class="g-line g-end">That was all ten. You got '+you+' of '+n+'; the classifier '+clf+' of '+n+'; the models '+jud+' of '+judN+'. Across all '+data.english.essays+' English essays the classifier is right '+Math.round(data.english.classifier_accuracy*100)+'% of the time and the models '+Math.round(data.english.judge_accuracy*100)+'%, where guessing gets 20%.</p><button type="button" class="g-next" data-act="again">play again</button>'
        : '<button type="button" class="g-next" data-act="next">next essay →</button>');
    $('gReveal').hidden=false;
    const nx=$('gReveal').querySelector('.g-next'); if(nx) nx.focus({preventScroll:true});
  }
  box.addEventListener('click',e=>{
    const b=e.target.closest('button'); if(!b||!data) return;
    if(b.dataset.m) guess(b.dataset.m);
    else if(b.dataset.act==='next'){ i++; show(i); }
    else if(b.dataset.act==='again'){ i=0; n=you=clf=jud=judN=0; score(); show(0); }
  });
  function load(){
    fetch('/assets/guess-samples.json?v=2026-09-22').then(r=>r.ok?r.json():Promise.reject(r.status)).then(d=>{
      data=d; show(0); score();
      $('gFoot').innerHTML='Ten of the '+d.english.essays+' English essays, two per model, drawn at random. Across all of them the classifier names the right model '+Math.round(d.english.classifier_accuracy*100)+'% of the time; the five models, asked the same question, '+Math.round(d.english.judge_accuracy*100)+'% (chance is 20%). Data and code: <a href="https://github.com/adrian-erlikhman/LangLLM" target="_blank" rel="noopener">LangLLM on GitHub ↗</a>';
    }).catch(()=>{ $('gText').innerHTML='<p>The essays didn’t load. They’re in the LangLLM repo on GitHub.</p>'; });
  }
  /* fetch the essays only when the section comes near */
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>{ if(es.some(e=>e.isIntersecting)){ io.disconnect(); load(); } },{rootMargin:'600px 0px'});
    io.observe(box);
  } else load();
})();

/* ================= LEDGER WALKTHROUGH — synthetic test records (assets/ledger-walkthrough.json) ================= */
(function(){
  const box=document.getElementById('ledgerWalk'); if(!box) return;
  const $=id=>document.getElementById(id);
  const CATS=[['dairy','Dairy'],['grains','Grains'],['protein','Protein'],['produce','Produce']];
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  let data=null;
  function render(k){
    const r=data.records[k];
    $('lwTabs').querySelectorAll('button').forEach((b,i)=>{b.setAttribute('aria-selected',i===k?'true':'false');b.tabIndex=i===k?0:-1;});
    const img=$('lwImg'); img.src=r.image; img.alt='Synthetic wholesale order record: '+r.title+'.';
    $('lwCap').textContent='synthetic record · '+r.vendor+' · '+r.invoiceNo+' · '+r.date+' · '+r.notes;
    $('lwLines').innerHTML=r.lines.map(l=>{
      const pk=[l.pack,l.qty&&('× '+l.qty)].filter(Boolean).join(' ');
      return l.counted
        ? '<li class="ok"><span class="lw-t">'+esc(l.text)+'</span><span class="lw-p">'+esc(pk)+'</span><span class="lw-d">'+l.units+' units · '+esc(l.variety)+' · '+l.category+(l.perishable?' · perishable':'')+'</span></li>'
        : '<li class="held"><span class="lw-t">'+esc(l.text)+'</span><span class="lw-p">'+esc(pk)+'</span><span class="lw-d">held back: '+esc(l.reason.replace(/\.$/,''))+'</span></li>';
    }).join('');
    const short=[], fixes=[];
    $('lwCats').innerHTML=CATS.map(([c,name])=>{
      const v=r.categories[c], q=v.qualifying, ok=q>=7, under=v.varieties.filter(x=>x.units<3).length;
      if(!ok){ short.push(name.toLowerCase()); fixes.push(name+': '+(7-q)+' more '+(7-q===1?'variety':'varieties')+', each with at least 3 units'); }
      let seg=''; for(let i=0;i<7;i++) seg+='<i class="'+(i<q?'on':'')+'"></i>';
      return '<div class="lw-cat '+(ok?'pass':'fail')+'"><b>'+name+'</b><span class="lw-seg" aria-hidden="true">'+seg+'</span>'+
        '<span class="lw-num">'+q+' of 7 varieties · '+v.units+' units'+(under?' · '+under+' under 3 units, so not counted':'')+'</span>'+
        '<span class="lw-per">'+(v.expected.perishable?'perishable ✓':'no perishable')+'</span></div>';
    }).join('');
    const per=r.perishableCategories;
    if(per<3) fixes.push('A perishable variety in '+(3-per)+' more '+(3-per===1?'category':'categories'));
    const W=['no','one','two','three','four'], cap=x=>x[0].toUpperCase()+x.slice(1);
    let say;
    if(r.overall==='pass') say='<b class="pass">Passes.</b> All four categories reach seven varieties, with a perishable in '+(per===4?'every one':W[per]+' of them')+'.';
    else{
      const parts=[];
      if(short.length===4) parts.push('Every category is short of seven varieties');
      else if(short.length){ const nm=short.map(cap); parts.push((nm.length===1?nm[0]+' is':nm.slice(0,-1).join(', ')+' and '+nm[nm.length-1]+' are')+' short of seven varieties'); }
      if(per<3) parts.push((parts.length?'only ':'Only ')+W[per]+' of the four categories '+(per===1?'has':'have')+' a perishable');
      say='<b class="fail">Fails.</b> '+parts.join(', and ')+'.';
    }
    $('lwVerdict').innerHTML=say;
    $('lwFix').innerHTML=fixes.map(f=>'<li>'+esc(f)+'</li>').join('');
    $('lwFixWrap').hidden=!fixes.length;
  }
  function load(){
    fetch('/assets/ledger-walkthrough.json?v=2026-09-22').then(r=>r.ok?r.json():Promise.reject(r.status)).then(d=>{
      data=d;
      $('lwTabs').innerHTML=d.records.map((r,i)=>'<button type="button" role="tab" data-k="'+i+'">'+esc(r.label)+'</button>').join('');
      render(0);
    }).catch(()=>{ $('lwLines').innerHTML='<li>The records didn’t load. They’re in Ledger’s repo under eval/fixtures.</li>'; });
  }
  box.addEventListener('click',e=>{ const b=e.target.closest('[data-k]'); if(b&&data) render(+b.dataset.k); });
  box.addEventListener('keydown',e=>{
    const b=e.target.closest('[role=tab]'); if(!b||!data) return;
    const n=data.records.length, k=+b.dataset.k;
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ e.preventDefault(); const j=(k+(e.key==='ArrowRight'?1:n-1))%n; render(j); $('lwTabs').children[j].focus(); }
  });
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>{ if(es.some(e=>e.isIntersecting)){ io.disconnect(); load(); } },{rootMargin:'600px 0px'});
    io.observe(box);
  } else load();
})();

/* ================= AIML-LI MINI-LAB — Unit 1's ethics lab on its own output (assets/aiml-minilab.json) ================= */
(function(){
  const box=document.getElementById('aiLab'); if(!box) return;
  const $=id=>document.getElementById(id);
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const pct=x=>(x*100).toFixed(1)+'%';
  const num=n=>n.toLocaleString('en-US');
  /* each note hangs off the first line that contains its fragment */
  const ANN=[
    {find:'new_positive_weight = ',t:'The one number students change. The model, the split and the seed all stay exactly as they were.'},
    {find:'weights=[1 - new_positive_weight',t:'It decides how many of the 400 applicants actually win. At one in twenty, that is twenty winners in the whole pool.'},
    {find:'stratify=y_shifted',t:'Train and test keep the same share of winners, so nothing below is an unlucky split.'},
    {find:'print(f"Shifted accuracy',t:'The cell prints accuracy, and nothing else. That is the trap the lesson sets: a student who stops reading here sees a number that only goes up.'}
  ];
  let data=null,k=0;

  function code(run){
    const lines=data.code.map(l=>l.replace('{W}',String(run.weight)));
    const hit={};
    ANN.forEach((a,i)=>{ const j=lines.findIndex(l=>l.indexOf(a.find)>=0); if(j>=0&&hit[j]===undefined) hit[j]=i; });
    $('labCode').innerHTML=lines.map((l,j)=>{
      const i=hit[j], c=l.indexOf('  #');
      const body=c>=0?esc(l.slice(0,c))+'<span class="cm">'+esc(l.slice(c))+'</span>':esc(l);
      return '<span class="cl'+(j===0?' edit':'')+'" data-a="'+(i===undefined?'':i)+'">'+(body||' ')+(i===undefined?'':'<i class="am">'+(i+1)+'</i>')+'</span>';
    }).join('');
    $('labAnn').innerHTML=ANN.map((a,i)=>'<li data-a="'+i+'"><b>'+(i+1)+'</b><span>'+esc(a.t)+'</span></li>').join('');
  }

  function chart(sel){
    const R=data.runs, W=560,H=208, L=44,Rr=86,T=16,B=34;
    const x=i=>L+i*((W-L-Rr)/(R.length-1)), y=v=>T+(1-(v-0.6)/0.4)*(H-T-B);
    let g='';
    for(let v=60;v<=100;v+=10){ g+='<line class="gl" x1="'+L+'" y1="'+y(v/100)+'" x2="'+(W-Rr)+'" y2="'+y(v/100)+'"/>'+
      '<text class="tk" x="'+(L-8)+'" y="'+(y(v/100)+3)+'" text-anchor="end">'+v+'%</text>'; }
    g+='<line class="sel" x1="'+x(sel)+'" y1="'+T+'" x2="'+x(sel)+'" y2="'+(H-B)+'"/>';
    const path=key=>R.map((r,i)=>(i?'L':'M')+x(i)+' '+y(r.pooled[key])).join(' ');
    g+='<path class="ln-acc" d="'+path('accuracy')+'"/><path class="ln-rec" d="'+path('recall')+'"/>';
    R.forEach((r,i)=>{
      g+='<circle class="pt-acc" cx="'+x(i)+'" cy="'+y(r.pooled.accuracy)+'" r="'+(i===sel?4:2.5)+'"/>'+
         '<circle class="pt-rec" cx="'+x(i)+'" cy="'+y(r.pooled.recall)+'" r="'+(i===sel?4:2.5)+'"/>'+
         '<text class="tk" x="'+x(i)+'" y="'+(H-14)+'" text-anchor="middle">'+esc(r.label)+'</text>';
    });
    const last=R.length-1;
    g+='<text class="lb" x="'+(x(last)+9)+'" y="'+(y(R[last].pooled.accuracy)+3)+'" fill="var(--ink)">accuracy</text>'+
       '<text class="lb" x="'+(x(last)+9)+'" y="'+(y(R[last].pooled.recall)+3)+'" fill="var(--acc)">winners found</text>';
    $('labChart').innerHTML='<title id="labChartT">Accuracy rises as the winners get rarer, while the share of winners the model finds falls</title>'+g;
  }

  function render(i){
    k=i; const r=data.runs[i], p=r.pooled, l=r.lesson, base=data.runs[0].pooled;
    $('labTabs').querySelectorAll('button').forEach((b,j)=>{b.setAttribute('aria-selected',j===i?'true':'false');b.tabIndex=j===i?0:-1;});
    code(r);
    $('labPrint').innerHTML='&gt;&gt;&gt; Shifted accuracy: <b>'+l.accuracy.toFixed(3)+'</b>'+
      '<span class="lab-pn">What the class sees: one draw of 400 applicants, on the notebook\u2019s own seed. That draw '+
      (l.missed?'missed '+l.missed+' of its '+l.winners+' winners':'missed none of its '+l.winners+' winners')+'.</span>';
    $('labMetrics').innerHTML=
      '<div class="lab-m"><span class="lab-mk">what the cell prints</span><span class="lab-mv">'+pct(p.accuracy)+'</span><span class="lab-ms">accuracy</span></div>'+
      '<div class="lab-m rec"><span class="lab-mk">what it doesn&rsquo;t</span><span class="lab-mv">'+pct(p.recall)+'</span><span class="lab-ms">of real winners found</span></div>'+
      '<div class="lab-m miss"><span class="lab-mk">who that is</span><span class="lab-mv">'+num(p.missed)+'</span><span class="lab-ms">passed over, of '+num(p.winners)+' who should have won</span></div>';
    chart(i);
    $('labVerdict').innerHTML=i===0
      ? 'Balanced, to start: accuracy <b>'+pct(p.accuracy)+'</b>, and the model finds <b>'+pct(p.recall)+'</b> of the winners.'
      : 'Accuracy is <b>'+pct(p.accuracy)+'</b>, '+(p.accuracy>base.accuracy?'higher than':'no worse than')+' the balanced run. It now finds <b>'+pct(p.recall)+'</b> of the winners, and passes over <b>'+num(p.missed)+' of '+num(p.winners)+'</b> students who should have won.';
  }

  function load(){
    fetch('/assets/aiml-minilab.json?v=2026-09-22').then(r=>r.ok?r.json():Promise.reject(r.status)).then(d=>{
      data=d;
      $('labTabs').innerHTML=d.runs.map((r,i)=>'<button type="button" role="tab" data-k="'+i+'" title="'+esc(r.blurb)+'">'+esc(r.label)+'</button>').join('');
      const fill=(id,arr)=>{$(id).innerHTML=arr.map(t=>'<li>'+esc(t)+'</li>').join('');};
      fill('labPredict',d.lesson.predict); fill('labEthics',d.lesson.ethics); fill('labSummary',d.lesson.summary);
      render(0);
    }).catch(()=>{ $('labPrint').textContent='The lesson data didn\u2019t load.'; });
  }
  box.addEventListener('click',e=>{ const b=e.target.closest('[data-k]'); if(b&&data) render(+b.dataset.k); });
  box.addEventListener('keydown',e=>{
    const b=e.target.closest('[role=tab]'); if(!b||!data) return;
    const n=data.runs.length, i=+b.dataset.k;
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ e.preventDefault(); const j=(i+(e.key==='ArrowRight'?1:n-1))%n; render(j); $('labTabs').children[j].focus(); }
  });
  /* hovering a note lights its line */
  box.addEventListener('mouseover',e=>{ const li=e.target.closest('.lab-ann li'); if(!li) return;
    const cl=box.querySelector('.lab-pre .cl[data-a="'+li.dataset.a+'"]'); if(cl) cl.classList.add('lit'); });
  box.addEventListener('mouseout',e=>{ const li=e.target.closest('.lab-ann li'); if(!li) return;
    box.querySelectorAll('.lab-pre .cl.lit').forEach(c=>c.classList.remove('lit')); });
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>{ if(es.some(e=>e.isIntersecting)){ io.disconnect(); load(); } },{rootMargin:'600px 0px'});
    io.observe(box);
  } else load();
})();
