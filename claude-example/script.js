/* ---------- утиліти ---------- */
function rng(seed){let a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function shuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const $=s=>document.querySelector(s);
const svgURI=s=>'url("data:image/svg+xml,'+encodeURIComponent(s)+'")';

/* ---------- смаки (розрізи тортів) ---------- */
const CREAM='#f6efe3';
const FLAVORS=[
 {n:'Чорниця',a:'#1b2a6b',b:'#9a96e6',c:'#2a2f7a'},
 {n:'Red velvet',a:'#7a0f1c',b:'#f2dede',c:'#b0142b'},
 {n:'Виноград-убе',a:'#6a3fa3',b:'#c1abe8',c:'#4a2a6a'},
 {n:'Блакитний орео',a:'#1d1a22',b:'#7ab0ea',c:'#3a3946'},
 {n:'Тірамісу',a:'#d9a766',b:'#f0e0c4',c:'#5a3320'},
 {n:'Полуниця',a:'#f3d7bd',b:'#f4a7b6',c:'#d6283f'},
 {n:'Лимон',a:'#f1d867',b:'#fbeb92',c:'#e0b92b'},
 {n:'Матча',a:'#7f9f5a',b:'#c5d9a0',c:'#4d6b30'},
 {n:'Карамель',a:'#c68642',b:'#e8b878',c:'#8c5524'},
 {n:'Шоколад',a:'#3a1f16',b:'#7a4633',c:'#24120c'},
 {n:'Фісташка',a:'#b4c878',b:'#8fae52',c:'#5f7d2d'},
 {n:'Малина',a:'#e8c3c8',b:'#e0456a',c:'#9c1236'}
];

function wave(y,amp,ph){
  let d='M0 133 L0 '+(y+Math.sin(ph)*amp).toFixed(1);
  for(let x=4;x<=100;x+=4){d+=' L'+x+' '+(y+Math.sin(x/100*Math.PI*3+ph)*amp).toFixed(1);}
  return d+' L100 133 Z';
}
const cakeCache={};
function cakeSVG(k){
  if(cakeCache[k])return cakeCache[k];
  const f=FLAVORS[k],r=rng(k*977+13);
  const H=[28,10,30,10,30,8,17],cols=[f.a,CREAM,f.b,CREAM,f.a,CREAM,f.a];
  let y=0,out='';
  H.forEach((h,i)=>{
    if(i===0)out+=`<rect width="100" height="133" fill="${cols[0]}"/>`;
    else out+=`<path d="${wave(y,i%2?1.6:2.6,r()*6)}" fill="${cols[i]}"/>`;
    if(cols[i]===f.a){
      for(let n=0;n<46;n++){
        out+=`<circle cx="${(r()*100).toFixed(1)}" cy="${(y+4+r()*(h-4)).toFixed(1)}" r="${(.4+r()*.8).toFixed(1)}" fill="${r()<.5?'#000':'#fff'}" opacity=".16"/>`;
      }
    }else if(cols[i]===f.b){
      for(let n=0;n<7;n++){
        const cx=8+n*13+r()*5,cy=y+h*.5+(r()-.5)*8,rr=3+r()*1.6;
        out+=`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rr.toFixed(1)}" fill="${f.c}"/><circle cx="${(cx-rr*.35).toFixed(1)}" cy="${(cy-rr*.4).toFixed(1)}" r="${(rr*.3).toFixed(1)}" fill="#fff" opacity=".5"/>`;
      }
    }else{
      out+=`<path d="M0 ${y+h-2} L100 ${y+h-2}" stroke="#d8cdb8" stroke-width="1.2" opacity=".5"/>`;
    }
    y+=h;
  });
  const s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 133" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="v${k}" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></radialGradient></defs>${out}<rect width="100" height="133" fill="url(#v${k})"/></svg>`;
  return cakeCache[k]=s;
}

/* ---------- порцелянові спини ---------- */
const BLUE='#1e3f9c',BLUE2='#2b4fb0',PORC='#eef3fb';
function flower(cx,cy,r,rot){
  let s='';
  for(let i=0;i<5;i++){
    const t=`rotate(${rot+i*72} ${cx} ${cy})`;
    s+=`<ellipse cx="${cx}" cy="${cy-r*.55}" rx="${r*.34}" ry="${r*.5}" transform="${t}" fill="${PORC}" stroke="${BLUE}" stroke-width="${(r*.05).toFixed(2)}"/>`;
    s+=`<ellipse cx="${cx}" cy="${cy-r*.32}" rx="${r*.14}" ry="${r*.2}" transform="${t}" fill="${BLUE2}" opacity=".4"/>`;
    s+=`<path d="M${cx} ${cy-r*.25} L${cx} ${cy-r*.95}" stroke="#5b7fd0" stroke-width="${(r*.03).toFixed(2)}" transform="${t}"/>`;
  }
  s+=`<circle cx="${cx}" cy="${cy}" r="${r*.14}" fill="${BLUE}"/>`;
  for(let i=0;i<8;i++){const a=i*Math.PI/4;s+=`<circle cx="${(cx+Math.cos(a)*r*.26).toFixed(1)}" cy="${(cy+Math.sin(a)*r*.26).toFixed(1)}" r="${(r*.04).toFixed(2)}" fill="${BLUE}"/>`;}
  return s;
}
function leaf(x,y,len,rot){
  return `<g transform="rotate(${rot} ${x} ${y})"><ellipse cx="${x}" cy="${y-len/2}" rx="${len*.22}" ry="${len/2}" fill="${BLUE2}" opacity=".85"/><path d="M${x} ${y} L${x} ${y-len}" stroke="#fff" stroke-width="${(len*.03).toFixed(2)}" opacity=".6"/></g>`;
}
function crack(r,w,h,sw){
  let x=r()*w;const pts=[[x,0]],n=6+Math.floor(r()*3);
  for(let i=1;i<=n;i++){x+=(r()-.5)*w*.38;x=Math.max(0,Math.min(w,x));pts.push([x,h*i/n]);}
  const d='M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L');
  const m=pts[Math.floor(n/2)];let bx=m[0],by=m[1],bd=`M${bx.toFixed(1)} ${by.toFixed(1)}`;const dir=r()<.5?-1:1;
  for(let i=0;i<3;i++){bx+=dir*(w*.05+r()*w*.09);by+=(r()-.3)*h*.09;bd+=` L${bx.toFixed(1)} ${by.toFixed(1)}`;}
  return `<path d="${d}" fill="none" stroke="#a57a1c" stroke-width="${sw*1.8}" stroke-linejoin="round" opacity=".55"/><path d="${d}" fill="none" stroke="#d9aa3c" stroke-width="${sw*1.2}" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#f6dc8a" stroke-width="${sw*.35}" stroke-linejoin="round"/><path d="${bd}" fill="none" stroke="#d9aa3c" stroke-width="${sw*.9}" stroke-linejoin="round"/>`;
}
function backSVG(i){
  const r=rng(i*131+7);
  let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbfdff"/><stop offset="1" stop-color="#d9e4f4"/></linearGradient></defs><rect width="120" height="160" fill="url(#bg)"/>`;
  s+=`<rect x="6" y="6" width="108" height="148" rx="6" fill="none" stroke="${BLUE}" stroke-width="1.2" opacity=".8"/><rect x="10" y="10" width="100" height="140" rx="4" fill="none" stroke="${BLUE}" stroke-width=".5" opacity=".6"/>`;
  s+=leaf(60,112,34,-35)+leaf(60,112,34,40)+leaf(60,118,26,-95);
  s+=flower(60,78,34,r()*72);
  s+=flower(22,26,11,r()*72)+flower(98,134,11,r()*72)+flower(98,24,7,r()*72)+flower(22,138,7,r()*72);
  if(r()<.8)s+=crack(r,120,160,1.3);
  return s+'</svg>';
}
const PIC=(function(){
  const r=rng(2024);
  let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><radialGradient id="g" cx=".4" cy=".35" r=".9"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfdcf0"/></radialGradient></defs><rect width="400" height="400" fill="url(#g)"/>`;
  s+=`<path d="M-10 410 C80 300 120 260 210 210 S330 90 420 -10" fill="none" stroke="${BLUE}" stroke-width="7"/><path d="M-10 330 C60 280 100 290 150 250" fill="none" stroke="${BLUE}" stroke-width="4"/><path d="M250 420 C260 340 330 320 410 250" fill="none" stroke="${BLUE}" stroke-width="4"/>`;
  [[70,300,50,-40],[140,250,40,30],[300,120,46,-70],[330,300,44,60],[90,120,40,-20],[210,70,36,50],[250,330,38,10]].forEach(l=>{s+=leaf(l[0],l[1],l[2]*1.2,l[3]);});
  s+=flower(200,205,92,12);
  s+=flower(78,90,44,30)+flower(320,95,46,5)+flower(318,312,48,40)+flower(70,320,40,18)+flower(205,48,28,0)+flower(210,360,30,22)+flower(360,205,24,10)+flower(40,205,22,50);
  s+=crack(r,400,400,3.2)+crack(r,400,400,2.6)+crack(r,400,400,2.2);
  return s+'</svg>';
})();
const PIC_URI=svgURI(PIC);

/* ---------- фон: розбите скло ---------- */
(function(){
  const r=rng(77),g=$('#glass');let out='';
  [[300,210],[760,560]].forEach(p=>{
    const N=16;
    for(let i=0;i<N;i++){
      let a=i*2*Math.PI/N+(r()-.5)*.35,x=p[0],y=p[1],d=`M${x} ${y}`;
      for(let s=0;s<9;s++){a+=(r()-.5)*.22;const L=60+r()*110;x+=Math.cos(a)*L;y+=Math.sin(a)*L;d+=` L${x.toFixed(0)} ${y.toFixed(0)}`;}
      out+=`<path d="${d}" fill="none" stroke="#9fc2ff" stroke-width="${(.4+r()*.9).toFixed(1)}" opacity="${(.12+r()*.2).toFixed(2)}"/>`;
    }
    [55,120,205,310,440].forEach(R=>{
      let d='';
      for(let i=0;i<N;i++){
        const a=i*2*Math.PI/N+(r()-.5)*.15,rr=R*(.85+r()*.3);
        d+=(i?' L':'M')+(p[0]+Math.cos(a)*rr).toFixed(0)+' '+(p[1]+Math.sin(a)*rr).toFixed(0);
      }
      out+=`<path d="${d} Z" fill="none" stroke="#9fc2ff" stroke-width=".7" opacity=".16"/>`;
    });
  });
  g.innerHTML=out;
})();

/* ---------- стан ---------- */
const store={
  get(){try{return JSON.parse(localStorage.getItem('porcelain-cakes')||'[]');}catch(e){return [];}},
  set(v){try{localStorage.setItem('porcelain-cakes',JSON.stringify(v));}catch(e){}}
};
let collection=new Set(store.get());
let backMode='pattern'; // 'pattern' | 'picture'
const S={level:1,score:0,levelStart:0,moves:0,limit:null,matched:0,streak:0,lock:true,open:[],flavors:[],deck:[],won:[]};

const RANKS=[[12,'Шеф-кондитер'],[8,'Майстер'],[4,'Кондитер'],[0,'Учень']];
const rank=()=>RANKS.find(x=>collection.size>=x[0])[1];

function hud(){
  $('#hLevel').textContent=S.level;
  $('#hScore').textContent=S.score;
  $('#hMoves').textContent=S.limit?`${S.moves}/${S.limit}`:S.moves;
  $('#hMovesLabel').textContent=S.limit?'Ходи (ліміт)':'Ходи';
  $('#hRank').textContent=rank();
}
function shelf(){
  $('#slots').innerHTML=FLAVORS.map((f,k)=>`<div class="slot ${collection.has(k)?'have':'locked'}" title="${collection.has(k)?f.n:'Ще не відкрито'}">${cakeSVG(k)}</div>`).join('');
  $('#shelfCount').textContent=`${collection.size} з ${FLAVORS.length} смаків`;
}
function applyBacks(){
  document.querySelectorAll('.card .back').forEach((el,i)=>{
    if(backMode==='picture'){
      el.style.backgroundImage=PIC_URI;
      el.style.backgroundSize='400% 300%';
      el.style.backgroundPosition=`${(i%4)/3*100}% ${Math.floor(i/4)/2*100}%`;
    }else{
      el.style.backgroundImage=svgURI(backSVG(i));
      el.style.backgroundSize='100% 100%';
      el.style.backgroundPosition='0 0';
    }
  });
  $('#bBacks').textContent='Картки: '+(backMode==='picture'?'одна картина':'візерунок');
}

/* ---------- рівень ---------- */
function pickFlavors(level){
  if(level===1)return [0,1,2,3,4,5];
  if(level===2)return [6,7,8,9,10,11];
  return shuffle([...Array(12).keys()]).slice(0,6);
}
function startLevel(){
  S.flavors=pickFlavors(S.level);
  S.deck=shuffle([...S.flavors,...S.flavors]);
  S.moves=0;S.matched=0;S.streak=0;S.open=[];S.won=[];S.lock=true;
  S.levelStart=S.score;
  S.limit=S.level===1?null:Math.max(8,18-S.level*3);
  const board=$('#board');
  board.innerHTML=S.deck.map((k,i)=>`<button class="card" data-i="${i}" aria-label="Закрита картка ${i+1}"><div class="inner"><div class="face back"></div><div class="face front">${cakeSVG(k)}<div class="tag">${FLAVORS[k].n}</div></div></div></button>`).join('');
  applyBacks();hud();
  const cards=[...board.children];
  const peek=S.level===1?1700:S.level===2?1100:700;
  setTimeout(()=>cards.forEach(c=>c.classList.add('flipped')),250);
  setTimeout(()=>{cards.forEach(c=>c.classList.remove('flipped'));S.lock=false;},250+peek+300);
}
$('#board').addEventListener('click',e=>{
  const c=e.target.closest('.card');if(!c||S.lock)return;
  if(c.classList.contains('flipped')||c.classList.contains('matched'))return;
  flip(c);
});
function flip(c){
  c.classList.add('flipped');
  c.setAttribute('aria-label',FLAVORS[S.deck[+c.dataset.i]].n);
  S.open.push(c);
  if(S.open.length<2)return;
  S.moves++;S.lock=true;
  const [a,b]=S.open,ka=S.deck[+a.dataset.i],kb=S.deck[+b.dataset.i];
  if(ka===kb){
    S.streak++;S.score+=100+(S.streak-1)*25;S.matched++;
    a.classList.add('matched');b.classList.add('matched');
    S.won.push(ka);
    if(!collection.has(ka)){collection.add(ka);store.set([...collection]);shelf();}
    S.open=[];hud();
    if(S.matched===6)setTimeout(win,750);else S.lock=false;
  }else{
    S.streak=0;S.score=Math.max(0,S.score-10);hud();
    setTimeout(()=>{
      a.classList.remove('flipped');b.classList.remove('flipped');
      a.setAttribute('aria-label','Закрита картка');b.setAttribute('aria-label','Закрита картка');
      S.open=[];
      if(S.limit&&S.moves>=S.limit)lose();else S.lock=false;
    },850);
  }
}
function chips(list){return list.map(k=>`<span>${FLAVORS[k].n}</span>`).join('');}
function modal(title,text,chipHtml,btn,fn){
  $('#mTitle').textContent=title;$('#mText').textContent=text;$('#mChips').innerHTML=chipHtml;
  const b=$('#mBtn');b.textContent=btn;b.onclick=()=>{$('#overlay').classList.remove('show');fn();};
  $('#overlay').classList.add('show');b.focus();
}
function win(){
  const bonus=S.limit?(S.limit-S.moves)*20:Math.max(0,16-S.moves)*15;
  S.score+=bonus;hud();
  modal(`Рівень ${S.level} пройдено`,`Ходів: ${S.moves}. Бонус за швидкість: +${bonus}. Усього балів: ${S.score}.`,chips(S.won),'Наступний рівень',()=>{S.level++;startLevel();});
}
function lose(){
  S.score=S.levelStart;hud();
  modal('Ходи закінчились',`На цьому рівні можна зробити ${S.limit} ходів. Бали за рівень не зараховано — спробуй ще раз.`,chips(S.won),'Спробувати ще',startLevel);
}
$('#bRestart').onclick=()=>{S.score=S.levelStart;startLevel();};
$('#bBacks').onclick=()=>{backMode=backMode==='pattern'?'picture':'pattern';applyBacks();};

shelf();startLevel();
