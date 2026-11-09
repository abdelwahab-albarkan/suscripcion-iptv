// Generador del sitio. Ejecuta: node src/build.js  (salida en /site)
const fs = require('fs'), path = require('path');
const C = {
  brand: 'Suscripción IPTV 8K', domain: process.env.SITE_URL || 'https://suscripcioniptv8k.com', wa: '212625218443',
  email: 'support@streamb4.com', date: '2026-11-08', year: new Date().getFullYear(),
  // Precios en USD: [cuentas 1,2,3,4] por duración con links directos
  plans: [
    {
      m: 3,
      name: '3 meses',
      rows: [39.99, 59.99, 79.99, 99.99],
      links: [
        'https://todedev.com/buy/3-months-1-account',
        'https://todedev.com/buy/3-months-2-accounts',
        'https://todedev.com/buy/3-months-3-accounts',
        'https://todedev.com/buy/3-months-4-accounts'
      ]
    },
    {
      m: 6,
      name: '6 meses',
      rows: [56.99, 84.99, 109.99, 134.99],
      links: [
        'https://todedev.com/buy/6-months-1-account',
        'https://todedev.com/buy/6-months-2-accounts',
        'https://todedev.com/buy/6-months-3-accounts',
        'https://todedev.com/buy/6-months-4-accounts'
      ]
    },
    {
      m: 12,
      name: '12 meses',
      rows: [79.99, 119.99, 149.99, 179.99],
      links: [
        'https://todedev.com/buy/12-months-1-account',
        'https://todedev.com/buy/12-months-2-accounts',
        'https://todedev.com/buy/12-months-3-accounts',
        'https://todedev.com/buy/12-months-4-accounts'
      ]
    },
  ],
};
const usd = (n) => '$' + n.toFixed(2);
C.low = usd(C.plans[0].rows[0]);
const K = 'suscripción IPTV', KC = 'Suscripción IPTV';
const OUT = path.join(__dirname, '..', 'site');
const IM = require('./imgs.js');
const ST = require('./structure.js');
const ART = ['a1', 'a2', 'a3', 'a4'].flatMap(f => require(`./articles/${f}.js`));

const NAV = [
  ['index.html', 'Inicio'],
  ['suscripcion-iptv-precios.html', 'Precios'],
  ['suscripcion-iptv-canales.html', 'Canales'],
  ['suscripcion-iptv-futbol.html', 'Fútbol'],
  ['suscripcion-iptv-dispositivos.html', 'Dispositivos'],
  ['preguntas-frecuentes-suscripcion-iptv.html', 'FAQ'],
];

const ICONS = {"⚡":"<path d=\"M13 2L4 14h7l-1 8 9-12h-7z\"/>","📺":"<rect x=\"2\" y=\"4\" width=\"20\" height=\"13\" rx=\"2\"/><path d=\"M8 21h8M12 17v4\"/>","🖥":"<rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"M8 21h8M12 17v4\"/>","⚽":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7l4 3-1.5 5h-5L8 10zM12 3v4M4 9l4 1M20 9l-4 1M7 19l2-4M17 19l-2-4\"/>","🎬":"<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4\"/>","📱":"<rect x=\"7\" y=\"2\" width=\"10\" height=\"20\" rx=\"2.5\"/><path d=\"M11 18h2\"/>","💬":"<path d=\"M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.2A8 8 0 1121 12z\"/>","🇪🇸":"<path d=\"M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/>","📚":"<path d=\"M4 5a2 2 0 012-2h13v15H6a2 2 0 00-2 2z\"/><path d=\"M4 20a2 2 0 002 2h13v-4\"/>","📖":"<path d=\"M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14\"/>","🧒":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M8 14s1.5 2 4 2 4-2 4-2M9 9.5h.01M15 9.5h.01\"/>","🌍":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18\"/>","📶":"<path d=\"M2 9a15 15 0 0120 0M5 12.5a10 10 0 0114 0M8.5 16a5 5 0 017 0\"/><circle cx=\"12\" cy=\"19\" r=\"1\"/>","🚀":"<path d=\"M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5M14 4c3-1 6-1 6-1s0 3-1 6l-6 6-5-5z\"/><circle cx=\"15\" cy=\"9\" r=\"1.5\"/>","🔄":"<path d=\"M20 11a8 8 0 00-14-4L4 9M4 5v4h4M4 13a8 8 0 0014 4l2-2M20 19v-4h-4\"/>","🔥":"<path d=\"M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z\"/>","🤖":"<rect x=\"6\" y=\"6\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4\"/>","🍎":"<rect x=\"5\" y=\"3\" width=\"14\" height=\"18\" rx=\"3\"/><path d=\"M10 18h4\"/>","💻":"<rect x=\"4\" y=\"5\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 20h20\"/>","✅":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M8 12l3 3 5-6\"/>","💰":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M14.5 9.5c-.6-.8-1.5-1-2.5-1-1.4 0-2.5.7-2.5 1.8 0 2.4 5 1.2 5 3.7 0 1.1-1.1 1.8-2.5 1.8-1 0-2-.3-2.6-1.1M12 6.5v1.5M12 16v1.5\"/>","🧪":"<path d=\"M9 3h6M10 3v6L4.5 19a2 2 0 001.8 3h11.4a2 2 0 001.8-3L14 9V3\"/>"};
const svgIcon = (e) => { const k = String(e).replace(/\uFE0F/g, ''); return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k] || '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>'}</svg>`; };
const icon = (e) => `<div class="ico" aria-hidden="true">${svgIcon(e)}</div>`;
const card = (e, t, p) => `<div class="card">${icon(e)}<h3>${t}</h3><p>${p}</p></div>`;
const faq = (q, a) => `<details><summary>${q}</summary><p>${a}</p></details>`;
const cta = (t = 'Ver planes y precios', href = 'suscripcion-iptv-precios.html') => `<a class="btn p" href="${href}">${t} →</a>`;
const band = (h, p, btn) => `<section><div class="wrap"><div class="band"><h2>${h}</h2><p>${p}</p><div class="cta" style="justify-content:center;margin-top:20px">${btn}</div></div></div></section>`;
const waLink = (txt) => `https://wa.me/${C.wa}?text=${encodeURIComponent(txt)}`;
// Tarjetas de precios: 3 duraciones × 1-4 cuentas
const pricing = () => `<div class="price3">${C.plans.map((p, i) => {
  const hot = i === 2, base = C.plans[0].rows[0] * (p.m / 3);
  const save = i === 0 ? '' : `Ahorra hasta un ${Math.round((1 - p.rows[0] / base) * 100)} %`;
  return `<div class="plan${hot ? ' hot' : ''}">${hot ? '<span class="tag">MEJOR PRECIO</span>' : ''}<h3>${p.name}</h3>
<div class="amt"><small>desde</small> ${usd(p.rows[0])}</div><p class="per">${usd(p.rows[0] / p.m)} / mes con 1 cuenta${save ? ' · ' + save : ''}</p>
<ul class="acc">${p.rows.map((v, j) => `<li><span class="n">${j + 1} ${j ? 'cuentas' : 'cuenta'}</span><span class="v">${usd(v)}</span><a class="btn ${hot ? 'p' : 'g'} mini" href="${p.links[j]}" target="_blank" rel="noopener noreferrer">Contratar</a></li>`).join('')}</ul></div>`;
}).join('')}</div><p class="fine">Cada cuenta incluye 1 conexión simultánea, canales HD y 4K, guía EPG, catálogo VOD y soporte en español. Precios en USD, sin permanencia.</p>${IM.payStrip('Métodos de pago')}`;
const plan = (name, price, per, items, hot, tag) => `<div class="plan${hot ? ' hot' : ''}">${hot ? `<span class="tag">${tag}</span>` : ''}<h3>${name}</h3><div class="amt">${price} €<small> ${per}</small></div><ul class="chk">${items.map(i => `<li>${i}</li>`).join('')}</ul><a class="btn ${hot ? 'p' : 'g'}" href="https://wa.me/${C.wa}?text=${encodeURIComponent('Hola, quiero contratar la ' + K + ' ' + name)}">Contratar ahora</a></div>`;

// ---------------------------------------------------------------- PAGES
const pages = [];

// 1 ─ HOME
pages.push({
  file: 'index.html',
  title: `Suscripción IPTV España 2026 | Planes Premium 4K desde ${C.low}`,
  desc: `Contrata tu suscripción IPTV premium en España: miles de canales, fútbol y series en 4K. Activación inmediata y sin permanencia. Elige tu suscripción IPTV.`,
  h1: `Suscripción IPTV premium en España: todo tu entretenimiento en un solo plan`,
  hero: `<section class="hero"><div class="orb o1"></div><div class="orb o2"></div><div class="wrap grid"><div>
<span class="badge"><span class="dot"></span>Servicio de suscripción IPTV con soporte en español</span>
<h1>${'Suscripción IPTV premium en España: <span class="grad">todo tu entretenimiento</span> en un solo plan'}</h1>
<p class="lead">Tu ${K} con canales nacionales e internacionales, deportes, cine y series en calidad HD, Full HD y 4K. Activación en minutos, sin permanencia y con atención personal por WhatsApp.</p>
<div class="cta">${cta('Elegir mi suscripción IPTV')}<a class="btn g" href="suscripcion-iptv-precios.html">Ver precios</a></div>
<div class="trust"><div><b>+18.000</b>canales y VOD</div><div><b>4K</b>Ultra HD</div><div><b>24/7</b>soporte técnico</div></div>
</div><div class="hero-photo"><div class="hp-frame">${IM.img('room-warm', `Salón con un televisor que muestra una ${K} con canales y películas`, { eager: true, sizes: '(max-width:900px) 100vw, 600px' })}<div class="hp-ov"></div><span class="hp-live">● EN DIRECTO</span><span class="hp-q">4K</span></div>
<div class="float f1">${svgIcon('⚡')}Activación inmediata</div><div class="float f2">${svgIcon('📺')}HD · Full HD · 4K</div><div class="float f3">${svgIcon('💬')}Soporte en español</div>
</div></div></section>`,
  body: `
<div class="strip"><div class="wrap"><span>${svgIcon('✅')}Activación inmediata</span><span>${svgIcon('✅')}Sin permanencia</span><span>${svgIcon('✅')}Soporte en español</span><span>${svgIcon('✅')}Pago seguro</span><span>${svgIcon('✅')}HD y 4K</span></div></div>
<section><div class="wrap"><div class="head"><span class="eyebrow">Por qué elegirnos</span><h2>Por qué elegir nuestra ${K}</h2><p>Una buena ${K} no se mide solo por el número de canales: importan la estabilidad, la rapidez de activación y el soporte cuando algo falla. Estos son los pilares de nuestro servicio.</p></div>
<div class="cards">
${card('⚡', `Activación inmediata de tu ${K}`, `Recibes tus datos de acceso en minutos tras contratar. Tu ${K} funciona desde el primer momento.`)}
${card('📺', 'Calidad HD, Full HD y 4K', `Servidores con alta capacidad para que tu ${K} reproduzca sin cortes ni buffering en horas punta.`)}
${card('⚽', 'Deportes en directo', `Liga, competiciones europeas, tenis, motor y más: la ${K} ideal para los amantes del deporte.`)}
${card('🎬', 'Cine y series bajo demanda', `Un catálogo VOD que se actualiza cada semana dentro de cada ${K}.`)}
${card('📱', 'Compatible con todo', `Smart TV, Android TV, Firestick, móvil, tablet y PC: usa tu ${K} en todos tus dispositivos.`)}
${card('💬', 'Soporte en español', `Resolvemos dudas de instalación y configuración de tu ${K} por WhatsApp y email.`)}
</div></div></section>

<section><div class="wrap"><div class="head"><span class="eyebrow">Compatibilidad</span><h2>Tu ${K} en todos tus dispositivos</h2><p>Instala tu ${K} en el televisor, el stick, el móvil o el ordenador. Elige tu dispositivo y sigue la guía paso a paso.</p></div>${IM.devGrid()}<p style="text-align:center;margin-top:28px"><a href="dispositivos/index.html">Ver todas las guías de instalación →</a></p></div></section>
<section class="alt"><div class="wrap"><div class="head"><span class="eyebrow">Así se ve</span><h2>Así se ve tu ${K} en pantalla</h2><p>Una interfaz limpia para encontrar canales, deportes y películas en segundos.</p></div>${IM.gallery()}</div></section>
<section class="alt"><div class="wrap"><div class="head"><span class="eyebrow">Precios</span><h2>Planes de ${K} sin permanencia</h2><p>Compara nuestras opciones de ${K} y elige la que mejor se adapta a ti. Todos los planes incluyen la misma calidad de servicio.</p></div>
${pricing()}
</div></section>

<section><div class="wrap split"><div><h2>Una ${K} pensada para toda la familia</h2>
<p>Con nuestra ${K} puedes ver televisión en directo, recuperar programas y disfrutar de películas y series cuando quieras. Es la forma moderna de ver la tele por internet, sin antenas ni cables complicados.</p>
<ul class="chk"><li>Guía de programación (EPG) integrada en tu ${K}</li><li>Canales infantiles, documentales, noticias y música</li><li>Varias conexiones para usar la ${K} en distintas pantallas</li><li>Sin permanencia ni letra pequeña</li></ul>
${cta('Ver todos los planes')}</div>
<div class="card"><h3>Qué incluye tu ${K}</h3><div class="scroll"><table class="tbl"><tr><th>Característica</th><th>Incluido</th></tr><tr><td>Canales en directo</td><td>+18.000</td></tr><tr><td>Calidad</td><td>HD / Full HD / 4K</td></tr><tr><td>Guía EPG</td><td>Sí</td></tr><tr><td>Catálogo VOD</td><td>Películas y series</td></tr><tr><td>Dispositivos</td><td>Smart TV, móvil, PC, Firestick</td></tr><tr><td>Soporte</td><td>WhatsApp y email</td></tr></table></div></div></div></section>

<section class="alt"><div class="wrap"><div class="head"><span class="eyebrow">Empezar es fácil</span><h2>Cómo contratar tu ${K} en 3 pasos</h2></div>
<div class="steps">
<div class="step"><h3>1. Elige tu plan</h3><p>Selecciona la ${K} de 3, 6 o 12 meses y el número de cuentas que necesitas.</p></div>
<div class="step"><h3>2. Recibe tus datos</h3><p>Te enviamos el usuario y la configuración de tu ${K} en minutos.</p></div>
<div class="step"><h3>3. Disfruta</h3><p>Instala la aplicación en tu dispositivo y empieza a ver tu ${K}.</p></div>
</div><p style="text-align:center;margin-top:30px">¿Dudas? Consulta la <a href="como-contratar-suscripcion-iptv.html">guía completa para contratar tu ${K}</a>.</p></div></section>

<section class="alt"><div class="wrap"><div class="head"><span class="eyebrow">Guías</span><h2>Guías para sacar partido a tu ${K}</h2><p>Consejos prácticos de red, configuración y seguridad escritos por nuestro equipo.</p></div><div class="gcards">${['por-que-se-corta-la-imagen', 'velocidad-internet-necesaria-4k', 'tdt-vs-iptv-comparativa', 'plan-3-6-o-12-meses', 'como-detectar-estafas', 'tv-box-vs-stick-vs-smart-tv'].map(sl => { const a = ART.find(x => x[0] === sl); return a ? `<a class="gcard" href="blog/${sl}-suscripcion-iptv.html"><b>${a[1]}</b><span>${a[2]}</span></a>` : ''; }).join('')}</div><p style="text-align:center;margin-top:26px"><a href="blog/index.html">Ver todas las guías →</a></p></div></section>
<section><div class="wrap" style="max-width:860px"><div class="head"><span class="eyebrow">Resolvemos tus dudas</span><h2>Preguntas frecuentes sobre la ${K}</h2></div>
${faq(`¿Qué es una ${K}?`, `Una ${K} es un servicio que te permite ver canales de televisión, películas y series a través de internet, sin antena ni decodificador tradicional.`)}
${faq(`¿Qué necesito para usar una ${K}?`, `Solo una conexión a internet estable (a partir de 15 Mbps para HD) y un dispositivo compatible con la aplicación de tu ${K}.`)}
${faq(`¿Cómo contrato la ${K}?`, `Eliges tu plan en la <a href="suscripcion-iptv-precios.html">página de precios</a> y nos escribes por WhatsApp. Recibes tus datos de acceso en minutos.`)}
${faq(`¿Hay permanencia en la ${K}?`, `No. Todos los planes de ${K} funcionan sin permanencia y puedes renovar solo cuando quieras.`)}
<p style="text-align:center;margin-top:20px"><a href="preguntas-frecuentes-suscripcion-iptv.html">Ver todas las preguntas sobre ${K} →</a></p></div></section>
${band(`Empieza hoy con tu ${K}`, `Activación inmediata, soporte en español y sin permanencia. Elige tu ${K} y estrena tu televisión por internet.`, cta('Contratar mi suscripción IPTV') )}`
});

// 2 ─ PRECIOS
pages.push({
  file: 'suscripcion-iptv-precios.html',
  title: `Suscripción IPTV Precios 2026 | Desde ${C.low} / 3 meses`,
  desc: `Precios de la suscripción IPTV: planes de 3, 6 y 12 meses con 1 a 4 cuentas, sin permanencia. Elige tu suscripción IPTV con soporte y activación inmediata.`,
  h1: `Precios de la suscripción IPTV: planes claros y sin permanencia`,
  crumb: 'Precios',
  lead: `Consulta los precios de nuestra ${K} y elige el plan que mejor se adapta a tu uso. Sin cuotas ocultas, sin permanencia y con activación inmediata.`,
  body: `
<section><div class="wrap">${pricing()}</div></section>
<section class="alt"><div class="wrap"><div class="head"><h2>Comparativa de planes de ${K}</h2><p>Esta tabla resume los precios de cada ${K} según la duración y el número de cuentas.</p></div>
<div class="scroll"><table class="tbl"><tr><th>Plan de ${K}</th><th>1 cuenta</th><th>2 cuentas</th><th>3 cuentas</th><th>4 cuentas</th></tr>
${C.plans.map(p => `<tr><td><strong>${p.name}</strong></td>${p.rows.map((v, j) => `<td><a href="${p.links[j]}" target="_blank" rel="noopener noreferrer" style="color:var(--or);font-weight:600;text-decoration:none">${usd(v)} →</a></td>`).join('')}</tr>`).join('\n')}</table></div></div></section>
<section><div class="wrap split"><div><h2>¿Qué determina el precio de una ${K}?</h2>
<p>El precio de una ${K} depende de la duración, del número de conexiones simultáneas y de la calidad del servicio. Una ${K} demasiado barata suele esconder servidores saturados y cortes constantes.</p>
<h3>Cómo elegir la ${K} adecuada</h3>
<ul class="chk"><li>Si vives solo y quieres empezar, la ${K} de 3 meses con una cuenta suele bastar.</li><li>Para dos pantallas, la ${K} de 6 meses con dos cuentas ofrece buena relación calidad-precio.</li><li>Para familias, la ${K} de 12 meses con tres o cuatro cuentas es la opción más rentable.</li></ul></div>
<div class="card"><h3>Todas las opciones de ${K} incluyen</h3><ul class="chk"><li>Activación inmediata</li><li>Guía de programación EPG</li><li>Canales HD y 4K</li><li>Catálogo de películas y series</li><li>Instalación guiada paso a paso</li></ul></div></div></section>
<section class="alt"><div class="wrap" style="max-width:860px"><div class="head"><h2>Dudas sobre el precio de la ${K}</h2></div>
${faq(`¿Cuánto cuesta una ${K}?`, `Nuestra ${K} cuesta desde ${C.low} por 3 meses (1 cuenta). Los planes de 6 y 12 meses reducen mucho el precio por mes.`)}
${faq(`¿Qué métodos de pago acepto para la ${K}?`, `Te indicamos las opciones de pago disponibles al contratar tu ${K} por WhatsApp o email.`)}
${faq(`¿Puedo cambiar de plan de ${K}?`, `Sí, al renovar puedes pasar a otra ${K} con más duración o más cuentas.`)}</div></section>
${band(`Elige tu ${K} ahora`, `Si todavía dudas, escríbenos por WhatsApp y te ayudamos a elegir el plan.`, cta('Contratar ahora'))}`
});

// 3 ─ CANALES
pages.push({
  file: 'suscripcion-iptv-canales.html',
  title: `Suscripción IPTV con +18.000 Canales HD y 4K | España 2026`,
  desc: `Descubre todos los canales de nuestra suscripción IPTV: nacionales, deportes, cine, series, infantiles y 4K. Suscripción IPTV con EPG y VOD incluidos.`,
  h1: `Suscripción IPTV con más de 18.000 canales y VOD`,
  crumb: 'Canales',
  lead: `Explora el contenido de nuestra ${K}: televisión nacional e internacional, deportes, cine, series, documentales y canales infantiles.`,
  body: `
<section><div class="wrap"><div class="head"><h2>Categorías de canales en tu ${K}</h2><p>Cada ${K} incluye acceso a todas las categorías, sin paquetes adicionales ni recargos por canal.</p></div>
<div class="cards">
${card('🇪🇸', `Canales de España en la ${K}`, `Cadenas nacionales, autonómicas y locales dentro de tu ${K}, con guía de programación actualizada.`)}
${card('⚽', `Deportes en la ${K}`, `Fútbol, baloncesto, tenis, motor y deportes de combate en directo con tu ${K}.`)}
${card('🎬', `Cine y estrenos en la ${K}`, `Canales de cine y un catálogo VOD que crece cada semana en cada ${K}.`)}
${card('📚', `Series y documentales en la ${K}`, `Series completas, documentales y programas de entretenimiento dentro de la ${K}.`)}
${card('🧒', `Infantil en la ${K}`, `Dibujos animados y programas educativos seleccionados para los más pequeños en tu ${K}.`)}
${card('🌍', `Canales internacionales en la ${K}`, `Contenido en inglés, francés, alemán, italiano y más idiomas con una sola ${K}.`)}
</div></div></section>
<section class="alt"><div class="wrap split"><div><h2>Calidad de imagen en la ${K}</h2>
<p>Una ${K} de calidad ofrece diferentes resoluciones según el canal y tu conexión. Nuestros servidores están optimizados para que la ${K} mantenga la imagen estable.</p>
<ul class="chk"><li>SD y HD para conexiones básicas</li><li>Full HD para la mayoría de canales de la ${K}</li><li>4K en canales y contenidos compatibles</li><li>Compresión eficiente para que la ${K} funcione con 15–25 Mbps</li></ul></div>
<div class="card"><h3>Funciones de tu ${K}</h3><ul class="chk"><li>Guía de programación EPG</li><li>Catch-up en canales compatibles</li><li>Favoritos y categorías personalizables</li><li>Búsqueda rápida de canales y películas</li></ul></div></div></section>
<section><div class="wrap" style="max-width:860px"><div class="head"><h2>Preguntas sobre los canales de la ${K}</h2></div>
${faq(`¿Cuántos canales incluye la ${K}?`, `Más de 18.000 entre canales en directo y contenido bajo demanda, disponibles en todos los planes de ${K}.`)}
${faq(`¿La ${K} incluye guía de programación?`, `Sí, la ${K} incluye EPG para consultar la parrilla de cada canal.`)}
${faq(`¿Puedo ver la ${K} en 4K?`, `Sí, siempre que el canal emita en 4K y tu conexión y televisor sean compatibles con la ${K}.`)}</div></section>
${band(`Descubre toda la ${K}`, `Elige un plan de ${K} y accede a todos los canales desde hoy.`, cta())}`
});

// 4 ─ FÚTBOL
pages.push({
  file: 'suscripcion-iptv-futbol.html',
  title: `Suscripción IPTV Fútbol España | Liga y Europa en Directo`,
  desc: `Suscripción IPTV para ver fútbol en directo en España: Liga, competiciones europeas y más. Contrata tu suscripción IPTV fútbol con calidad HD y 4K.`,
  h1: `Suscripción IPTV fútbol: todos los partidos en directo`,
  crumb: 'Fútbol',
  lead: `Con nuestra ${K} de fútbol sigues cada jornada en directo, con calidad HD y 4K y sin cortes en los momentos clave.`,
  body: `
<section><div class="wrap split"><div><h2>La mejor ${K} para ver fútbol</h2>
<p>Una ${K} orientada al deporte debe ofrecer estabilidad en los días de partido, cuando miles de usuarios se conectan a la vez. Nuestra ${K} de fútbol usa servidores con capacidad ampliada para evitar el temido buffering.</p>
<ul class="chk"><li>Fútbol nacional e internacional en tu ${K}</li><li>Resúmenes y programas deportivos</li><li>Calidad HD, Full HD y 4K cuando está disponible</li><li>Funciona en Smart TV, móvil y tablet con la misma ${K}</li></ul>${cta('Contratar ${K}'.replace('${K}', K))}</div>
<div class="card"><h3>Deportes incluidos en la ${K}</h3><ul class="chk"><li>Fútbol: ligas y copas</li><li>Baloncesto y balonmano</li><li>Tenis y golf</li><li>Fórmula 1 y MotoGP</li><li>Boxeo y artes marciales</li></ul></div></div></section>
<section class="alt"><div class="wrap"><div class="head"><h2>Consejos para ver fútbol con tu ${K}</h2></div>
<div class="cards">
${card('📶', `Usa cable en tu ${K}`, `Conecta tu televisor por cable de red para que la ${K} rinda al máximo en los partidos importantes.`)}
${card('🚀', `Velocidad mínima para la ${K}`, `Recomendamos al menos 25 Mbps libres para disfrutar de la ${K} en Full HD o 4K.`)}
${card('🔄', `Reinicia antes del partido`, `Reiniciar la aplicación de tu ${K} antes del evento evita problemas de caché.`)}
</div></div></section>
<section><div class="wrap" style="max-width:860px"><div class="head"><h2>Preguntas sobre la ${K} de fútbol</h2></div>
${faq(`¿Puedo ver fútbol en directo con la ${K}?`, `Sí, la ${K} incluye canales deportivos con emisión en directo.`)}
${faq(`¿La ${K} funciona en días de partido grande?`, `Nuestra ${K} usa servidores reforzados para soportar picos de audiencia.`)}
${faq(`¿Qué dispositivos sirven para la ${K} de fútbol?`, `Smart TV, Android TV, Firestick, móviles, tablets y ordenadores compatibles con tu ${K}.`)}</div></section>
${band(`Tu ${K} de fútbol te espera`, `Elige tu plan y empieza a ver hoy mismo.`, cta('Contratar ahora'))}`
});

// 5 ─ DISPOSITIVOS
pages.push({
  file: 'suscripcion-iptv-dispositivos.html',
  title: `Suscripción IPTV en Smart TV, Firestick y Móvil | Guía`,
  desc: `Cómo usar tu suscripción IPTV en Smart TV, Android TV, Firestick, móvil y PC. Guía de instalación de la suscripción IPTV con apps compatibles.`,
  h1: `Suscripción IPTV en Smart TV, Firestick, móvil y PC`,
  crumb: 'Dispositivos',
  lead: `Tu ${K} funciona en casi cualquier pantalla. Aquí tienes la lista de dispositivos compatibles y cómo configurarla.`,
  body: `
<section><div class="wrap"><div class="head"><h2>Dispositivos compatibles con la ${K}</h2></div>
<div class="cards">
${card('📺', `${KC} en Smart TV`, `Instala una aplicación compatible desde la tienda de tu televisor Samsung, LG o Android TV y configura tu ${K}.`)}
${card('🔥', `${KC} en Firestick`, `Descarga la aplicación en tu Fire TV Stick e introduce los datos de tu ${K} en pocos minutos.`)}
${card('🤖', `${KC} en Android y TV Box`, `Cualquier dispositivo Android admite la ${K} mediante aplicaciones gratuitas de reproducción.`)}
${card('🍎', `${KC} en iPhone, iPad y Apple TV`, `Usa un reproductor compatible de la App Store para ver tu ${K} en el ecosistema Apple.`)}
${card('💻', `${KC} en PC y Mac`, `Reproduce tu ${K} desde el ordenador con un reproductor multimedia compatible.`)}
${card('📱', `${KC} en el móvil`, `Lleva tu ${K} contigo y mira tus canales favoritos desde cualquier lugar con conexión.`)}
</div></div></section>
<section class="alt"><div class="wrap"><div class="head"><h2>Instalar tu ${K} paso a paso</h2></div>
<div class="steps">
<div class="step"><h3>Descarga una app</h3><p>Elige un reproductor compatible con listas y códigos Xtream para tu ${K}.</p></div>
<div class="step"><h3>Introduce tus datos</h3><p>Copia el usuario, la contraseña y la URL de tu ${K} que te enviamos.</p></div>
<div class="step"><h3>Carga la guía EPG</h3><p>Espera unos segundos a que se cargue la lista y la guía de tu ${K}.</p></div>
</div></div></section>
<section><div class="wrap split"><div><h2>Requisitos técnicos de la ${K}</h2>
<ul class="chk"><li>Conexión a internet de 15 Mbps o más para la ${K} en HD</li><li>25 Mbps o más para la ${K} en 4K</li><li>Router en buen estado, mejor por cable en la ${K} principal</li><li>Dispositivo con aplicación reproductora actualizada</li></ul>
<p>Si algo falla, nuestro equipo te ayuda a configurar la ${K} por WhatsApp.</p></div>
<div class="card"><h3>Problemas frecuentes de la ${K}</h3>
${faq('La imagen se corta', `Prueba con cable de red, reinicia el router y cierra otras descargas mientras ves la ${K}.`)}
${faq('No carga la lista', `Revisa que has copiado correctamente los datos de la ${K}, sin espacios.`)}</div></div></section>
${band(`Configura tu ${K} hoy`, `Te acompañamos en la instalación de tu ${K} en cualquier dispositivo.`, cta('Contratar ahora'))}`
});

// 7 ─ CÓMO CONTRATAR
pages.push({
  file: 'como-contratar-suscripcion-iptv.html',
  title: `Cómo Contratar una Suscripción IPTV: Guía Paso a Paso 2026`,
  desc: `Guía para contratar una suscripción IPTV paso a paso: qué mirar, cómo pagar, cómo activar y qué errores evitar al elegir tu suscripción IPTV.`,
  h1: `Cómo contratar una suscripción IPTV paso a paso`,
  crumb: 'Cómo contratar',
  lead: `Todo lo que debes revisar antes de contratar una ${K} y cómo activarla correctamente.`,
  article: true,
  body: `
<section><div class="wrap"><article class="prose">
<div class="toc"><strong>En esta guía de ${K}</strong><ol><li><a href="#antes">Qué revisar antes de contratar</a></li><li><a href="#pasos">Pasos para activar tu ${K}</a></li><li><a href="#errores">Errores al elegir una ${K}</a></li></ol></div>
<h2 id="antes">Qué revisar antes de contratar una ${K}</h2>
<p>Contratar una ${K} es sencillo, pero conviene comparar. Antes de pagar, comprueba estos puntos esenciales de cualquier ${K}.</p>
<h3>Condiciones previas de la ${K}</h3>
<p>Antes de pagar, pregunta cómo funciona la activación, qué incluye cada plan y cómo contactar con soporte.</p>
<h3>Soporte y atención de la ${K}</h3>
<p>Verifica que existe un canal de contacto real y que responden en español. Una ${K} sin soporte pierde valor rápido.</p>
<h3>Condiciones de la ${K}</h3>
<ul><li>Duración y renovación de la ${K}</li><li>Número de conexiones simultáneas</li><li>Calidad máxima disponible</li><li>Política de cambios y ayuda técnica</li></ul>
<h2 id="pasos">Pasos para activar tu ${K}</h2>
<ol><li><strong>Elige el plan:</strong> de 3, 6 o 12 meses, con 1 a 4 cuentas, de ${K}.</li><li><strong>Contacta con nosotros:</strong> por WhatsApp o email para formalizar tu ${K}.</li><li><strong>Realiza el pago:</strong> con el método indicado.</li><li><strong>Recibe los datos:</strong> usuario, contraseña y URL de la ${K}.</li><li><strong>Instala la aplicación:</strong> sigue la <a href="suscripcion-iptv-dispositivos.html">guía de dispositivos de la ${K}</a>.</li></ol>
<div class="note">Consejo: guarda tus datos de acceso de la ${K} en un lugar seguro y no los compartas.</div>
<h2 id="errores">Errores habituales al elegir una ${K}</h2>
<ul><li>Elegir la ${K} solo por ser la más barata.</li><li>Contratar el plan más largo sin comprobar antes que tu conexión cumple los requisitos.</li><li>Ignorar los requisitos de internet para la ${K} en 4K.</li><li>Contratar una ${K} sin canal de soporte.</li></ul>
<h3>Cómo evitar problemas con tu ${K}</h3>
<p>Revisa las condiciones, prueba la ${K} en horas punta y empieza con un plan corto si dudas.</p>
<p>¿Listo? Consulta nuestros <a href="suscripcion-iptv-precios.html">precios de ${K}</a> o escríbenos por <a href="contacto-suscripcion-iptv.html">WhatsApp o email</a>.</p>
</article></div></section>${band(`Contrata tu ${K} con garantías`, `Soporte en español y activación inmediata.`, cta())}`
});

// 8 ─ GUÍA / BLOG
pages.push({
  file: 'mejor-suscripcion-iptv-guia.html',
  title: `Mejor Suscripción IPTV España: Cómo Elegir en 2026 (Guía)`,
  desc: `Guía para elegir la mejor suscripción IPTV en España: qué es, ventajas, criterios de calidad, comparativa y consejos. Encuentra tu suscripción IPTV ideal.`,
  h1: `La mejor suscripción IPTV en España: guía para elegir bien`,
  crumb: 'Guía',
  lead: `Qué es una ${K}, cómo funciona y qué criterios debes aplicar para elegir la mejor.`,
  article: true,
  body: `
<section><div class="wrap"><article class="prose">
<div class="toc"><strong>Contenido de la guía de ${K}</strong><ol><li><a href="#que">Qué es una ${K}</a></li><li><a href="#ventajas">Ventajas</a></li><li><a href="#criterios">Cómo elegir la mejor ${K}</a></li></ol></div>
<h2 id="que">¿Qué es una ${K}?</h2>
<p>Una ${K} es un servicio de televisión por internet que transmite canales y contenidos bajo demanda mediante una aplicación. A diferencia de la televisión por cable, la ${K} se ve en cualquier dispositivo con conexión.</p>
<h3>Cómo funciona una ${K}</h3>
<p>El proveedor de ${K} entrega un usuario y una dirección de servidor. Tú los introduces en una aplicación reproductora y se carga la lista de canales y la guía de programación.</p>
<h2 id="ventajas">Ventajas de contratar una ${K}</h2>
<ul><li><strong>Flexibilidad:</strong> la ${K} se ve en televisor, móvil, tablet y PC.</li><li><strong>Catálogo amplio:</strong> miles de canales y VOD en una sola ${K}.</li><li><strong>Sin instalaciones:</strong> no necesitas antena ni parabólica para la ${K}.</li><li><strong>Precio contenido:</strong> una ${K} suele costar menos que varias plataformas.</li></ul>
<h2 id="criterios">Cómo elegir la mejor ${K}</h2>
<h3>Estabilidad de la ${K}</h3>
<p>La clave de una buena ${K} es que funcione igual en horas punta. Pregunta por la estabilidad en horas punta y la experiencia de otros usuarios en eventos importantes.</p>
<h3>Calidad de imagen de la ${K}</h3>
<p>Comprueba que la ${K} ofrece HD, Full HD y 4K reales en los canales que más ves.</p>
<h3>Soporte de la ${K}</h3>
<p>Prioriza la ${K} con atención en español y respuesta rápida.</p>
<h3>Precio de la ${K}</h3>
<p>Compara el coste mensual real de cada ${K}. Consulta nuestra <a href="suscripcion-iptv-precios.html">tabla de precios de ${K}</a>.</p>
<div class="note">Importante: asegúrate de que el servicio y sus contenidos cumplen la normativa vigente y los derechos de autor antes de contratar cualquier ${K}.</div>
<h2>Conclusión: elige tu ${K} con criterio</h2>
<p>La mejor ${K} es la que se adapta a tu conexión, tus dispositivos y tus hábitos. Compara y decide.</p>
</article></div></section>${band(`Elige tu ${K}`, `Activación inmediata y soporte en español.`, cta('Contratar ahora'))}`
});

// 9 ─ FAQ
const faqs = [
  [`¿Qué es una ${K}?`, `Una ${K} es un servicio para ver televisión, películas y series por internet mediante una aplicación, sin antena.`],
  [`¿Cuánto cuesta la ${K}?`, `Nuestra ${K} parte de ${C.low} por 3 meses (1 cuenta), con planes de 6 y 12 meses más económicos por mes.`],
  [`¿Hay permanencia?`, `No, ninguno de nuestros planes tiene permanencia ni penalización por cancelar.`],
  [`¿Cuántos dispositivos puedo usar a la vez?`, `Depende del plan: de 1 a 3 conexiones simultáneas.`],
  [`¿Qué velocidad de internet necesito?`, `Al menos 15 Mbps para HD y 25 Mbps para 4K.`],
  [`¿Cuánto tarda en activarse?`, `Normalmente unos minutos tras confirmar el pago.`],
  [`¿Cómo contrato la ${K}?`, `Elige tu plan en la página de precios y escríbenos por WhatsApp; recibirás tus datos en minutos.`],
  [`¿Funciona en Smart TV?`, `Sí, mediante una aplicación compatible instalada en el televisor.`],
  [`¿Y en Firestick o Android TV?`, `También: es compatible con Fire TV y Android TV.`],
  [`¿Incluye fútbol la ${K}?`, `La ${K} incluye canales deportivos. Más detalles en la <a href="suscripcion-iptv-futbol.html">página de ${K} de fútbol</a>.`],
  [`¿Qué hago si va lenta la imagen?`, `Usa cable de red, reinicia el router y escríbenos para revisar tu caso.`],
  [`¿Cómo contacto con soporte de la ${K}?`, `Por WhatsApp o email desde la <a href="contacto-suscripcion-iptv.html">página de contacto de ${K}</a>.`],
];
pages.push({
  file: 'preguntas-frecuentes-suscripcion-iptv.html',
  title: `Preguntas Frecuentes sobre la Suscripción IPTV | Guía y FAQ 2026`,
  desc: `Respuestas a las dudas más comunes sobre la suscripción IPTV: precio, dispositivos, requisitos y soporte. Resuelve tus dudas sobre la suscripción IPTV.`,
  h1: `Preguntas frecuentes sobre la suscripción IPTV`,
  crumb: 'FAQ',
  lead: `Resolvemos las dudas más habituales sobre cómo funciona y qué incluye una ${K}.`,
  faqs,
  body: `
<section><div class="wrap" style="max-width:860px"><div class="head"><h2>Todo sobre la ${K}</h2></div>
${faqs.map(f => faq(f[0], f[1])).join('')}</div></section>
<section class="alt"><div class="wrap"><div class="head"><h2>Más ayuda con tu ${K}</h2></div>
<div class="cards">
${card('💰', `Precios de la ${K}`, `Consulta los <a href="suscripcion-iptv-precios.html">planes de ${K}</a> y elige el tuyo.`)}
${card('📶', `Requisitos de la ${K}`, `Consulta la <a href="suscripcion-iptv-dispositivos.html">guía de dispositivos de ${K}</a>.`)}
${card('📖', `Guía de la ${K}`, `Lee la <a href="mejor-suscripcion-iptv-guia.html">guía para elegir ${K}</a>.`)}
</div></div></section>${band(`¿Más dudas sobre la ${K}?`, `Escríbenos y te respondemos en español.`, cta('Contactar', 'contacto-suscripcion-iptv.html'))}`
});

// 10 ─ CONTACTO + LEGAL
pages.push({
  file: 'contacto-suscripcion-iptv.html',
  title: `Contacto y Soporte Suscripción IPTV | Atención por WhatsApp`,
  desc: `Contacta con nuestro equipo para contratar o resolver dudas de tu suscripción IPTV. Soporte por WhatsApp y email para tu suscripción IPTV.`,
  h1: `Contacto y soporte de la suscripción IPTV`,
  crumb: 'Contacto',
  lead: `Habla con nuestro equipo para contratar tu ${K} o resolver cualquier incidencia.`,
  body: `
<section><div class="wrap split"><div><h2>Atención personalizada para tu ${K}</h2>
<p>Estamos disponibles todos los días para ayudarte a contratar, instalar y mantener tu ${K}.</p>
<ul class="chk"><li>WhatsApp: <a href="https://wa.me/${C.wa}">+${C.wa}</a></li><li>Email: <a href="mailto:${C.email}">${C.email}</a></li><li>Horario de soporte de la ${K}: 9:00 – 23:00</li></ul></div>
<div class="card"><form data-wa="${C.wa}" data-subject="Consulta sobre ${K}">
<div><label for="n">Nombre</label><input id="n" name="Nombre" required></div>
<div><label for="t">Tema</label><select id="t" name="Tema"><option>Contratar ${K}</option><option>Soporte técnico</option><option>Renovación</option><option>Otro</option></select></div>
<div><label for="m">Mensaje</label><textarea id="m" name="Mensaje" rows="4" required></textarea></div>
<button class="btn p" type="submit">Enviar por WhatsApp</button></form></div></div></section>
<section class="alt" id="legal"><div class="wrap"><article class="prose">
<h2>Aviso legal y privacidad de la ${K}</h2>
<p>Consulta el <a href="aviso-legal-suscripcion-iptv.html">aviso legal</a>, la <a href="politica-de-privacidad-suscripcion-iptv.html">política de privacidad</a> y las <a href="condiciones-contratacion-suscripcion-iptv.html">condiciones de contratación</a>. Los datos que nos envíes se usan únicamente para atender tu consulta y gestionar tu contratación. Atendemos las solicitudes lo antes posible y conservamos tus mensajes solo durante el tiempo necesario para resolverlas.</p>
<h3>Uso responsable de la ${K}</h3>
<p>El usuario es responsable de utilizar el servicio conforme a la legislación vigente y a los derechos de propiedad intelectual de los contenidos, así como de custodiar sus datos de acceso.</p>
<h3>Cookies</h3>
<p>Este sitio no utiliza cookies de seguimiento. Más información en la <a href="politica-de-cookies-suscripcion-iptv.html">política de cookies</a>.</p>
</article></div></section>${band(`Tu ${K}, a un mensaje`, `Escríbenos y activamos tu ${K} hoy.`, `<a class="btn p" href="https://wa.me/${C.wa}">Abrir WhatsApp →</a>`)}`
});

// ---------------------------------------------------------------- LAYOUT
const header = (cur) => `<div class="top"><svg class="mi" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/></svg>Activación inmediata de tu ${K} · <a href="suscripcion-iptv-precios.html">Ver planes</a></div>
<header class="site"><div class="wrap nav"><a class="logo" href="index.html" aria-label="${C.brand} - ${K}"><i>▶</i>${C.brand}</a>
<nav aria-label="Principal"><button class="burger" aria-label="Abrir menú" aria-expanded="false">☰</button><ul>
${NAV.map(([f, t]) => `<li><a class="l${f === cur ? ' on' : ''}" href="${f}">${t}</a></li>`).join('')}
<li><button class="theme-toggle" type="button" aria-label="Cambiar entre modo oscuro y modo claro" title="Modo claro / oscuro"><span class="ti" aria-hidden="true">☀</span><span class="tl">Modo blanco</span></button></li>
<li><a class="btn p" style="padding:10px 18px" href="contacto-suscripcion-iptv.html">Contacto</a></li></ul></nav></div></header>`;

const footer = () => `<footer class="site"><div class="wrap"><div class="fg">
<div><a class="logo" href="index.html"><i>▶</i>${C.brand}</a><p style="margin-top:14px">Tu ${K} en España con canales HD y 4K, deportes y VOD. Soporte en español y sin permanencia.</p></div>
<div><h4>${KC}</h4><ul><li><a href="suscripcion-iptv-precios.html">Precios</a></li><li><a href="suscripcion-iptv-canales.html">Canales</a></li><li><a href="suscripcion-iptv-futbol.html">Fútbol</a></li></ul></div>
<div><h4>Ayuda</h4><ul><li><a href="como-contratar-suscripcion-iptv.html">Cómo contratar</a></li><li><a href="suscripcion-iptv-dispositivos.html">Dispositivos</a></li><li><a href="preguntas-frecuentes-suscripcion-iptv.html">FAQ</a></li><li><a href="mejor-suscripcion-iptv-guia.html">Guía</a></li></ul></div>
<div><h4>Contacto</h4><ul><li><a href="contacto-suscripcion-iptv.html">Soporte</a></li><li><a href="aviso-legal-suscripcion-iptv.html">Aviso legal</a></li><li><a href="politica-de-privacidad-suscripcion-iptv.html">Privacidad</a></li><li><a href="politica-de-cookies-suscripcion-iptv.html">Cookies</a></li><li><a href="condiciones-contratacion-suscripcion-iptv.html">Condiciones</a></li><li><a href="ciudades/index.html">Por ciudades</a></li><li><a href="equipos/index.html">Equipos</a></li><li><a href="canales/index.html">Canales TDT</a></li><li><a href="dispositivos/index.html">Dispositivos</a></li><li><a href="competiciones/index.html">Deportes</a></li><li><a href="guias/index.html">Guías</a></li><li><a href="blog/index.html">Blog</a></li><li><a href="https://wa.me/${C.wa}">WhatsApp</a></li></ul></div>
</div><div class="foot-pay">${IM.payStrip('Pago seguro')}</div><div class="copy"><span>© ${C.year} ${C.brand}. Todos los derechos reservados.</span><span>${KC} en España</span></div></div></footer>
<a class="wa" href="https://wa.me/${C.wa}" aria-label="WhatsApp ${K}"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.2A8 8 0 1121 12z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.8c-.8-.4-1.5-1.1-1.9-1.9l.8-.8-1-2z" fill="#fff" stroke="none"/></svg></a>`;

function schema(p) { return require('./schema.js')(p, C, IM); }

// ---- Heading Optimization con LSI y Entidades Semánticas ---------------------
const KW_SFX = [
  ' con tu suscripción IPTV',
  ' en tu suscripción IPTV',
  ' para tu suscripción IPTV',
  ' de tu suscripción IPTV en España',
  ' con tu suscripción IPTV 4K',
  ' para tu suscripción IPTV en Smart TV'
];
function kwHeadings(html, seed) {
  let i = 0;
  return html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/g, (m, tag, attrs, inner) => {
    const t = inner.replace(/<[^>]+>/g, '');
    if (/suscripción iptv/i.test(t)) return m;
    i++;
    if (/\?\s*$/.test(t.trim())) return `<${tag}${attrs}>Suscripción IPTV: ${inner}</${tag}>`;
    return `<${tag}${attrs}>${inner.replace(/\s*$/, '')}${KW_SFX[(seed.length + i) % KW_SFX.length]}</${tag}>`;
  });
}
const EXTRA = require('./extra.js');
// ---- Ajuste automático de densidad (objetivo ≤ 3,3 %) -----------------------
const plain = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const kcount = (s) => (s.toLowerCase().match(/suscripción iptv/g) || []).length;
const SUBS = [
  [/\b(De|de) la suscripción IPTV\b/, '$1l servicio'], [/\b(A|a) la suscripción IPTV\b/, '$1l servicio'],
  [/\b(la|La) suscripción IPTV\b/, (m, a) => (a === 'La' ? 'El servicio' : 'el servicio')],
  [/\b(tu|Tu) suscripción IPTV\b/, '$1 plan'], [/\b(nuestra|Nuestra) suscripción IPTV\b/, (m, a) => (a === 'Nuestra' ? 'Nuestro servicio' : 'nuestro servicio')],
  [/\b(una|Una) suscripción IPTV\b/, (m, a) => (a === 'Una' ? 'Un servicio' : 'un servicio')],
  [/\b(cada|esta|Cada|Esta) suscripción IPTV\b/, (m, a) => ({ cada: 'cada plan', Cada: 'Cada plan', esta: 'este servicio', Esta: 'Este servicio' }[a])],
  [/\bsuscripción IPTV\b/, 'servicio'],
];
function tune(page) {
  let body = page.body;
  const target = 3.3;
  const dens = () => kcount(plain(body)) / plain(body).split(' ').length * 100;
  if (dens() <= target) return body;
  // bloques <p> y <li> candidatos (se salta el primer 25 % del documento para conservar menciones tempranas)
  const blocks = [...body.matchAll(/<(p|li|td)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)].filter(m => m.index > body.length * 0.25 && kcount(m[2]) && !/<a /.test(m[2]));
  for (let b = blocks.length - 1; b >= 0 && dens() > target; b--) {
    const m = blocks[b], orig = m[0];
    let txt = m[2], changed = false;
    // sustituye solo la segunda mención y siguientes de cada bloque (deja una por bloque como mínimo)
    let seen = 0;
    for (const [re, rep] of SUBS) {
      const g = new RegExp(re.source, 'g');
      txt = txt.replace(g, (...a) => { seen++; if (seen === 1) return a[0]; changed = true; return typeof rep === 'function' ? rep(...a) : a[0].replace(re, rep); });
    }
    if (changed) body = body.replace(orig, orig.replace(m[2], txt));
  }
  // segunda pasada: si sigue alto, sustituir también la mención única en bloques alternos
  const blocks2 = [...body.matchAll(/<(p|li|td)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)].filter(m => m.index > body.length * 0.25 && kcount(m[2]) && !/<a /.test(m[2]));
  for (let b = blocks2.length - 1; b >= 0 && dens() > target; b -= 1) {
    const m = blocks2[b]; let txt = m[2];
    for (const [re, rep] of SUBS) { if (re.test(txt)) { txt = txt.replace(re, (...a) => typeof rep === 'function' ? rep(...a) : a[0].replace(re, rep)); break; } }
    body = body.replace(m[0], m[0].replace(m[2], txt));
  }
  // tercera pasada: bloques con enlaces; solo se toca el texto fuera de las etiquetas
  if (dens() > target) {
    const blocks3 = [...body.matchAll(/<(p|li|td)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)].filter(m => m.index > body.length * 0.12 && kcount(m[2].replace(/<[^>]+>/g, '')));
    for (let b = blocks3.length - 1; b >= 0 && dens() > target; b--) {
      const m = blocks3[b]; let done = false;
      const txt = m[2].split(/(<[^>]+>)/).map(seg => {
        if (done || seg.startsWith('<') || !kcount(seg)) return seg;
        for (const [re, rep] of SUBS) { if (re.test(seg)) { done = true; return seg.replace(re, (...a) => typeof rep === 'function' ? rep(...a) : a[0].replace(re, rep)); } }
        return seg;
      }).join('');
      if (done) body = body.replace(m[0], m[0].replace(m[2], txt));
    }
  }
  return body;
}
function render(p) {
  const mark = '<section><div class="wrap"><div class="band">';
  const i = p.body.lastIndexOf(mark);
  if (EXTRA[p.file]) p.body = i < 0 ? p.body + EXTRA[p.file] : p.body.slice(0, i) + EXTRA[p.file] + p.body.slice(i);
  p.body = kwHeadings(p.body, p.file);
  p.body = tune(p);
  const MES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const dd = C.date.split('-'); const dir0 = p.file.split('/')[0];
  const meta = (['blog', 'guias'].includes(dir0) && !p.file.endsWith('index.html')) ? `<p class="meta">Por el equipo de ${C.brand} · Actualizado el ${+dd[2]} de ${MES[+dd[1] - 1]} de ${dd[0]}</p>` : '';
  const fig = p.img ? `<figure class="hero-fig${p.img.cls ? ' ' + p.img.cls : ''}">${IM.img(p.img.id, p.img.alt, { eager: true, sizes: '(max-width:900px) 100vw, 520px' })}</figure>` : '';
  const hero = p.hero || `<section class="hero sm"><div class="wrap${p.img ? ' hero-grid' : ''}"><div class="hero-t">${ST.crumbsHtml(p)}<h1>${p.h1}</h1><p class="lead" style="max-width:760px;margin-top:16px">${p.lead}</p>${meta}</div>${fig}</div></section>`;
  const url = C.domain + '/' + p.file;
  const ogImg = `${C.domain}/assets/img/devices-collection-1280.webp`;
  const preImg = p.img ? IM.preload(p.img.id, '(max-width:900px) 100vw, 520px') : (p.file === 'index.html' ? IM.preload('room-warm', '(max-width:900px) 100vw, 600px') : '');
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<link rel="canonical" href="${url}"><link rel="alternate" hreflang="es-ES" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<meta property="og:type" content="website"><meta property="og:locale" content="es_ES"><meta property="og:title" content="${p.title}"><meta property="og:description" content="${p.desc}"><meta property="og:url" content="${url}"><meta property="og:site_name" content="${C.brand}">
<meta property="og:image" content="${ogImg}"><meta property="og:image:width" content="1280"><meta property="og:image:height" content="720"><meta property="og:image:alt" content="${p.title}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${p.title}"><meta name="twitter:description" content="${p.desc}"><meta name="twitter:image" content="${ogImg}">
<meta name="theme-color" content="#0a0a0a">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23ff7a00'/%3E%3Cpath d='M24 18l22 14-22 14z' fill='%23111111'/%3E%3C/svg%3E">
<link rel="preload" href="assets/fonts/poppins-800.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="assets/fonts/poppins-700.woff2" as="font" type="font/woff2" crossorigin>${preImg}
<script>try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>
<link rel="stylesheet" href="assets/style.css">
${schema(p)}
</head><body>
${header(p.file)}
<main>
${hero}
${p.body}
</main>
${footer()}
<script src="assets/app.js" defer></script>
</body></html>`;
}

require('./legal.js')({ C, K, KC }).forEach(p => pages.push(p)); // aviso legal, privacidad, cookies, condiciones
pages.forEach(p => { if (!p.hero && !p.img) { const f = IM.forPage(p); if (f) p.img = f; } });
module.exports = { C, K, KC, OUT, card, faq, cta, band, plan, pricing, usd, render, tune, plain, kcount, icon };
if (require.main !== module) return;
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
fs.cpSync(path.join(__dirname, 'assets'), path.join(OUT, 'assets'), { recursive: true });
if (fs.existsSync(path.join(__dirname, 'static'))) fs.cpSync(path.join(__dirname, 'static'), OUT, { recursive: true }); // .htaccess, _headers, _redirects
pages.forEach(p => fs.writeFileSync(path.join(OUT, p.file), render(p).replace(/@\//g, '')));
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `<url><loc>${C.domain}/${p.file}</loc><lastmod>${C.date}</lastmod><changefreq>weekly</changefreq><priority>${p.file === 'index.html' ? '1.0' : '0.8'}</priority></url>`).join('\n')}\n</urlset>`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nUser-agent: Googlebot\nAllow: /\n\nUser-agent: Bingbot\nAllow: /\n\nSitemap: ${C.domain}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, 'suscripcioniptv8k2026key.txt'), 'suscripcioniptv8k2026key');
console.log('Generadas', pages.length, 'páginas en', OUT);
