
(function(){
var d=document.documentElement,LG=(d.lang||'zh').slice(0,2),LX=LG==='zh'?'':'-l',Z=LG==='zh';
var TX={zh:{aa:'阅读设置',reset:'恢复默认',bg:'背景',font:'字体',size:'字号',lh:'行距',measure:'版心宽度',smaller:'缩小字号',bigger:'放大字号',col:'栏',
 more:'查看完整解释 →',found:function(n){return '找到 '+n+' 处'+(n>80?'，显示前 80 条':'')},none:'没有找到。换个说法试试，或用更短的词。'},
en:{aa:'Reading settings',reset:'Reset',bg:'Background',font:'Font',size:'Text size',lh:'Line spacing',measure:'Column width',smaller:'Smaller text',bigger:'Larger text',col:'',
 more:'Glossary entry →',found:function(n){return n+' result'+(n>1?'s':'')+(n>80?', showing the first 80':'')},none:'Nothing found. Try other words, or shorter ones.'},
fr:{aa:'Réglages de lecture',reset:'Par défaut',bg:'Fond',font:'Police',size:'Taille du texte',lh:'Interligne',measure:'Largeur de colonne',smaller:'Texte plus petit',bigger:'Texte plus grand',col:'',
 more:'Voir au glossaire →',found:function(n){return n+' résultat'+(n>1?'s':'')+(n>80?', 80 premiers affichés':'')},none:'Aucun résultat. Essayez d’autres mots, ou des mots plus courts.'}}[LG]||null;
if(!TX)TX={};
// 阅读设置（背景 / 字体 / 字号 / 行距 / 版心宽度），与 lex.qiaomu.ai 的设置相同
(function(){var btn=document.getElementById('aa-btn');if(!btn)return;
var ls={set:function(k,v){try{localStorage.setItem(k===('nd-theme')?k:k+LX,v)}catch(e){}}};
var css=function(k){return getComputedStyle(d).getPropertyValue(k).trim()};
var SIZE={min:15,max:22,def:18},LH=Z?[['1.75','紧凑'],['2','适中'],['2.25','宽松']]:[['1.55','compact'],['1.75','normal'],['2','loose']],
MEASURE=Z?[['600','窄'],['680','标准'],['760','宽']]:LG==='fr'?[['600','Étroite'],['680','Normale'],['760','Large']]:[['600','Narrow'],['680','Normal'],['760','Wide']],LHDEF=Z?'2':'1.75';
var FONTS=!Z?[['sys',LG==='fr'?'Système':'System','',''],['sans','Inter','Inter','"Inter"'],['serif','Source Serif','Source Serif 4','"Source Serif 4"'],['garamond','Garamond','EB Garamond','"EB Garamond"']]:[['sys','系统默认','苹方 / 雅黑',''],['sans','思源黑体','Noto Sans SC','"Noto Sans SC"'],['serif','思源宋体','Noto Serif SC','"Noto Serif SC"'],['song','京華老宋','KingHwa OldSong','"KingHwa_OldSong"'],['kai','霞鹜文楷','LXGW WenKai','"LXGW WenKai Screen"'],['wei','站酷小薇','ZCOOL XiaoWei','"ZCOOL XiaoWei"']];
var THEMES=[['light',Z?'浅色':LG==='fr'?'Clair':'Light','#ffffff','#111111'],['sepia',Z?'护眼':'Sépia','#f5eddc','#2f2618'],['dark',Z?'深色':LG==='fr'?'Sombre':'Dark','#141414','#ebebe8']];
if(LG==='en')THEMES[1][1]='Sepia';
var st={size:parseInt(css('--read-size'),10)||SIZE.def,lh:css('--read-lh')||LHDEF,measure:String(parseInt(css('--measure'),10)||680),font:d.getAttribute('data-font')||'sys'};
var pop=document.createElement('div');pop.className='aa-pop';pop.hidden=true;pop.setAttribute('role','dialog');pop.setAttribute('aria-label',TX.aa);
var icons=['M5 8h14M5 12h14M5 16h14','M5 7h14M5 12h14M5 17h14','M5 5.5h14M5 12h14M5 18.5h14'];
pop.innerHTML='<div class="pop-head"><span>'+TX.aa+'</span><button type="button" data-reset>'+TX.reset+'</button></div>'
+'<div class="swatches" data-k="theme" role="group" aria-label="'+TX.bg+'">'+THEMES.map(function(x){return '<button type="button" data-v="'+x[0]+'" style="background:'+x[2]+';color:'+x[3]+'">'+x[1]+'</button>'}).join('')+'</div>'
+'<div class="font-list" data-k="font" role="group" aria-label="'+TX.font+'">'+FONTS.map(function(x){return '<button type="button" data-v="'+x[0]+'" title="'+x[2]+'"'+(x[3]?" style='font-family:"+x[3]+",serif'":'')+'>'+x[1]+'</button>'}).join('')+'</div>'
+'<div class="pop-pair"><div class="seg" data-k="size" role="group" aria-label="'+TX.size+'"><button type="button" data-v="-1" aria-label="'+TX.smaller+'">A−</button><span class="sz"></span><button type="button" data-v="1" aria-label="'+TX.bigger+'">A+</button></div>'
+'<div class="seg" data-k="lh" role="group" aria-label="'+TX.lh+'">'+LH.map(function(x,i){return '<button type="button" data-v="'+x[0]+'" title="'+TX.lh+(Z?'：':': ')+x[1]+'" aria-label="'+TX.lh+' '+x[1]+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+icons[i]+'"/></svg></button>'}).join('')+'</div></div>'
+'<div class="seg seg-measure" data-k="measure" role="group" aria-label="'+TX.measure+'">'+MEASURE.map(function(x){return '<button type="button" data-v="'+x[0]+'">'+x[1]+TX.col+'</button>'}).join('')+'</div>';
(btn.closest('.top-in')||document.body).appendChild(pop);
if(window.matchMedia('(max-width: 760px)').matches)pop.querySelector('[data-k="measure"]').hidden=true;
var $$=function(q){return [].slice.call(pop.querySelectorAll(q))};
function curTheme(){var t=d.getAttribute('data-theme');if(t)return t;return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
function press(k,v){$$('[data-k="'+k+'"] button[data-v]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.v===String(v)))})}
function sync(){press('theme',curTheme());press('font',st.font);press('lh',st.lh);press('measure',st.measure);pop.querySelector('.sz').textContent=st.size;
 var sb=$$('[data-k="size"] button');sb[0].disabled=st.size<=SIZE.min;sb[1].disabled=st.size>=SIZE.max}
function apply(){d.style.setProperty('--read-size',st.size+'px');d.style.setProperty('--read-lh',st.lh);d.style.setProperty('--measure',st.measure+'px');
 if(st.font==='sys')d.removeAttribute('data-font');else{d.setAttribute('data-font',st.font);if(window.__ndLoadFont)window.__ndLoadFont(st.font)}
 ls.set('nd-size',String(st.size));ls.set('nd-lh',st.lh);ls.set('nd-measure',st.measure);ls.set('nd-font',st.font)}
sync();
pop.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
 var anchor=[].slice.call(document.querySelectorAll('.zh-article h2,.zh-article p')).find(function(el){return el.getBoundingClientRect().top>60}),before=anchor?anchor.getBoundingClientRect().top:0;
 if(b.hasAttribute('data-reset')){st.size=SIZE.def;st.lh=LHDEF;st.measure='680';st.font='serif'}
 else{var k=b.parentNode.dataset.k,v=b.dataset.v;
  if(k==='theme'){d.setAttribute('data-theme',v);ls.set('nd-theme',v)}
  else if(k==='font')st.font=v;else if(k==='size')st.size=Math.min(SIZE.max,Math.max(SIZE.min,st.size+Number(v)));
  else if(k==='lh')st.lh=v;else if(k==='measure')st.measure=v}
 apply();if(anchor)window.scrollBy(0,anchor.getBoundingClientRect().top-before);sync()});
function close(){pop.hidden=true;btn.setAttribute('aria-expanded','false')}
btn.addEventListener('click',function(e){e.stopPropagation();var open=pop.hidden;pop.hidden=!open;btn.setAttribute('aria-expanded',String(open));
 if(open){sync();FONTS.forEach(function(x){if(window.__ndLoadFont)window.__ndLoadFont(x[0])})}});
document.addEventListener('click',function(e){if(!pop.hidden&&!e.target.closest('.aa-pop'))close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
})();
var yt=document.getElementById('yw-toggle');if(yt)yt.onclick=function(){var o=yt.getAttribute('aria-pressed')!=='true';yt.setAttribute('aria-pressed',o);document.querySelectorAll('details.yw').forEach(function(x){x.open=o})};
var tb=document.getElementById('toc-btn'),toc=document.getElementById('toc');
if(tb&&toc){tb.onclick=function(){var o=!toc.classList.contains('open');toc.classList.toggle('open',o);document.body.classList.toggle('toc-lock',o);tb.setAttribute('aria-expanded',o)};
 toc.addEventListener('click',function(e){if(e.target.tagName==='A'&&toc.classList.contains('open')){toc.classList.remove('open');document.body.classList.remove('toc-lock');tb.setAttribute('aria-expanded',false)}});
 var cur=toc.querySelector('a.cur');if(cur&&cur.scrollIntoView){setTimeout(function(){var r=cur.getBoundingClientRect(),tr=toc.getBoundingClientRect();if(r.top>tr.bottom-40)toc.scrollTop+=r.top-tr.top-120},50)}}
// 本章小节滚动高亮
var links=[].slice.call(document.querySelectorAll('.toc a[href^="#"]')),map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&map[e.target.id]){links.forEach(function(a){a.classList.remove('on')});map[e.target.id].classList.add('on');var dt=map[e.target.id].closest('details');if(dt)dt.open=true}})},{rootMargin:'-70px 0px -70% 0px'});
 Object.keys(map).forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el)})}
// 触屏：第一次点术语显示简释，第二次才跳转
var pop=document.getElementById('term-pop');
if(pop&&window.matchMedia&&window.matchMedia('(hover: none)').matches){var last=null;
 document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a.term');
  if(!a){if(!pop.hidden&&!e.target.closest('.term-pop')){pop.hidden=true;last=null}return}
  if(last===a){pop.hidden=true;last=null;return}
  e.preventDefault();last=a;pop.innerHTML='';var b=document.createElement('b');b.textContent=a.textContent;var p=document.createElement('div');p.textContent=a.getAttribute('data-tip');
  var l=document.createElement('a');l.href=a.getAttribute('href');l.textContent=TX.more;pop.appendChild(b);pop.appendChild(p);pop.appendChild(l);pop.hidden=false})}
// 术语表筛选
var gf=document.getElementById('g-filter');
if(gf){var items=[].slice.call(document.querySelectorAll('.g-item')),none=document.getElementById('g-none');
 gf.oninput=function(){var q=gf.value.trim().toLowerCase(),n=0;items.forEach(function(it){var ok=!q||it.getAttribute('data-s').toLowerCase().indexOf(q)>=0||it.textContent.toLowerCase().indexOf(q)>=0;it.hidden=!ok;if(ok)n++});
  document.querySelectorAll('.glossary h2').forEach(function(h){h.hidden=!!q});none.hidden=n>0}}
// 全文搜索
var sq=document.getElementById('s-q');
if(sq&&window.ND_INDEX){var res=document.getElementById('s-res'),stat=document.getElementById('s-stat');
 function escH(t){return t.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
 function run(q){q=q.trim();res.innerHTML='';if(!q){stat.textContent='';return}
  var ws=q.toLowerCase().split(/\s+/).filter(Boolean),out=[];
  window.ND_INDEX.forEach(function(r){var lt=r.t.toLowerCase(),lx=r.lx||(r.lx=r.x.toLowerCase()),hay=lt+' '+lx,ok=ws.every(function(w){return hay.indexOf(w)>=0});if(!ok)return;
   var score=0;ws.forEach(function(w){if(lt.indexOf(w)>=0)score+=50;var i=-1,c=0;while((i=lx.indexOf(w,i+1))>=0&&c<50)c++;score+=c});out.push([score,r])});
  out.sort(function(a,b){return b[0]-a[0]});
  stat.textContent=out.length?TX.found(out.length):TX.none;
  out.slice(0,80).forEach(function(o){var r=o[1],i=r.lx.indexOf(ws[0]),st=Math.max(0,i-(Z?40:80)),sn=(st>0?'…':'')+r.x.slice(st,st+(Z?130:240))+'…',h=escH(sn);
   ws.forEach(function(w){var re=new RegExp(escH(w).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');h=h.replace(re,function(m){return '<mark>'+m+'</mark>'})});
   var li=document.createElement('li');li.innerHTML='<a href="'+r.u+'">'+escH(r.t)+'</a><small>'+escH(r.p)+'</small><p>'+h+'</p>';res.appendChild(li)})}
 var m=location.search.match(/[?&]q=([^&]*)/);if(m){sq.value=decodeURIComponent(m[1].replace(/\+/g,' '));run(sq.value)}
 document.getElementById('s-form').onsubmit=function(e){e.preventDefault();run(sq.value);try{history.replaceState(null,'','?q='+encodeURIComponent(sq.value))}catch(err){}};}
})();
