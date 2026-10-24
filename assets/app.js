
(function(){
var d=document.documentElement,bs=document.querySelectorAll('.themes button[data-t]');
function setT(t){if(t)d.setAttribute('data-theme',t);else d.removeAttribute('data-theme');bs.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.t===(t||''))});try{localStorage.setItem('nd-theme',t||'')}catch(e){}}
var s='';try{s=localStorage.getItem('nd-theme')||''}catch(e){}setT(s);bs.forEach(function(x){x.onclick=function(){setT(x.dataset.t)}});
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
  var l=document.createElement('a');l.href=a.getAttribute('href');l.textContent='查看完整解释 →';pop.appendChild(b);pop.appendChild(p);pop.appendChild(l);pop.hidden=false})}
// 术语表筛选
var gf=document.getElementById('g-filter');
if(gf){var items=[].slice.call(document.querySelectorAll('.g-item')),none=document.getElementById('g-none');
 gf.oninput=function(){var q=gf.value.trim(),n=0;items.forEach(function(it){var ok=!q||it.getAttribute('data-s').indexOf(q)>=0||it.textContent.indexOf(q)>=0;it.hidden=!ok;if(ok)n++});
  document.querySelectorAll('.glossary h2').forEach(function(h){h.hidden=!!q});none.hidden=n>0}}
// 全文搜索
var sq=document.getElementById('s-q');
if(sq&&window.ND_INDEX){var res=document.getElementById('s-res'),stat=document.getElementById('s-stat');
 function escH(t){return t.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
 function run(q){q=q.trim();res.innerHTML='';if(!q){stat.textContent='';return}
  var ws=q.split(/\s+/).filter(Boolean),out=[];
  window.ND_INDEX.forEach(function(r){var hay=r.t+' '+r.x,ok=ws.every(function(w){return hay.indexOf(w)>=0});if(!ok)return;
   var score=0;ws.forEach(function(w){if(r.t.indexOf(w)>=0)score+=50;var i=-1,c=0;while((i=r.x.indexOf(w,i+1))>=0&&c<50)c++;score+=c});out.push([score,r])});
  out.sort(function(a,b){return b[0]-a[0]});
  stat.textContent=out.length?('找到 '+out.length+' 处'+(out.length>80?'，显示前 80 条':'')):'没有找到。换个说法试试，或用更短的词。';
  out.slice(0,80).forEach(function(o){var r=o[1],i=r.x.indexOf(ws[0]),st=Math.max(0,i-40),sn=(st>0?'…':'')+r.x.slice(st,st+130)+'…',h=escH(sn);
   ws.forEach(function(w){h=h.split(escH(w)).join('<mark>'+escH(w)+'</mark>')});
   var li=document.createElement('li');li.innerHTML='<a href="'+r.u+'">'+escH(r.t)+'</a><small>'+escH(r.p)+'</small><p>'+h+'</p>';res.appendChild(li)})}
 var m=location.search.match(/[?&]q=([^&]*)/);if(m){sq.value=decodeURIComponent(m[1].replace(/\+/g,' '));run(sq.value)}
 document.getElementById('s-form').onsubmit=function(e){e.preventDefault();run(sq.value);try{history.replaceState(null,'','?q='+encodeURIComponent(sq.value))}catch(err){}};}
})();
