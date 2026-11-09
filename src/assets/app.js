document.addEventListener('DOMContentLoaded',function(){
  var b=document.querySelector('.burger'),u=document.querySelector('nav ul');
  if(b&&u){b.addEventListener('click',function(){u.classList.toggle('open');b.setAttribute('aria-expanded',u.classList.contains('open'))});}

  // ---- Modo blanco / modo negro ----
  var root=document.documentElement,tg=document.querySelector('.theme-toggle');
  function cur(){return root.getAttribute('data-theme')==='light'?'light':'dark';}
  function paint(){
    if(!tg)return;var light=cur()==='light';
    tg.querySelector('.ti').textContent=light?'☾':'☀';
    tg.querySelector('.tl').textContent=light?'Modo negro':'Modo blanco';
    tg.setAttribute('aria-pressed',light?'true':'false');
    var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',light?'#ffffff':'#0a0a0a');
  }
  if(tg){
    paint();
    tg.addEventListener('click',function(){
      var next=cur()==='light'?'dark':'light';
      root.setAttribute('data-theme',next);
      try{localStorage.setItem('theme',next);}catch(e){}
      paint();
    });
  }

  // ---- Aparición suave al hacer scroll (sin JS la página se ve igual) ----
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window&&!reduce){
    var els=document.querySelectorAll('.card,.step,.plan,.band,details,.tbl,.tv,.head,.strip');
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i%4)*60+'ms';io.observe(el);});
  }

  // ---- Brillo que sigue al ratón en tarjetas ----
  document.addEventListener('pointermove',function(e){
    var t=e.target.closest&&e.target.closest('.card,.plan');
    if(t){var r=t.getBoundingClientRect();t.style.setProperty('--mx',(e.clientX-r.left)+'px');t.style.setProperty('--my',(e.clientY-r.top)+'px');}
  },{passive:true});

  // Formularios: abren WhatsApp con el mensaje
  document.querySelectorAll('form[data-wa]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var d=new FormData(f),t=[];
      d.forEach(function(v,k){if(v)t.push(k+': '+v)});
      var msg=encodeURIComponent((f.getAttribute('data-subject')||'Consulta')+'\n'+t.join('\n'));
      window.open('https://wa.me/'+f.getAttribute('data-wa')+'?text='+msg,'_blank','noopener');
    });
  });
});
