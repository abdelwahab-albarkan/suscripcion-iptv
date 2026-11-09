// Generador programático: ejecuta `node src/build.js && node src/pseo.js`
const fs = require('fs'), path = require('path');
const B = require('./build.js');
const { C, K, KC, OUT, card, faq, cta, band, plan, pricing, render } = B;
const D = require('./data.js');
const IM = require('./imgs.js');
const ART = ['a1', 'a2', 'a3', 'a4'].flatMap(f => require(`./articles/${f}.js`));
const BL = (slugs) => (global.__list || ((a) => a.join(', ')))(slugs.map(sl => { const a = ART.find(x => x[0] === sl); return a ? `<a href="@/blog/${sl}-suscripcion-iptv.html">${a[1].length > 72 ? a[1].slice(0, 70).replace(/\s+\S*$/, '') + '…' : a[1]}</a>` : ''; }).filter(Boolean));
const GUIDE_POOL = ['velocidad-internet-necesaria-4k', 'wifi-o-cable-para-iptv', 'por-que-se-corta-la-imagen', 'tdt-vs-iptv-comparativa', 'tv-box-vs-stick-vs-smart-tv', 'plan-3-6-o-12-meses', 'como-detectar-estafas', 'que-es-epg-guia-programacion', 'consumo-datos-por-hora', 'horas-punta-saturacion-red'];
const { slug } = D;
const TARGET_TOTAL = 1000, CORE = 10;

// ---------- utilidades --------------------------------------------------
const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const pick = (arr, seed, salt = '') => arr[hash(seed + salt) % arr.length];
const pickN = (arr, n, seed, salt = '') => { const a = arr.map((x, i) => [hash(seed + salt + i), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]); return a.slice(0, n); };
const L = (href, txt) => `<a href="@/${href}">${txt}</a>`;
const ul = (items) => `<ul class="chk">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
const list = global.__list = (a) => a.length <= 1 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' y ' + a[a.length - 1];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const art = (inner, cls = '') => `<section${cls ? ` class="${cls}"` : ''}><div class="wrap"><article class="prose">${inner}</article></div></section>`;
const secPlans = (n) => `<section class="alt"><div class="wrap"><div class="head"><h2>Planes de ${K}${n ? ' en ' + n : ''}</h2><p>Planes de 3, 6 y 12 meses con 1 a 4 cuentas, sin permanencia. Todos incluyen guía de programación, catálogo bajo demanda y soporte en español.</p></div>${pricing()}</div></section>`;
const legal = `<div class="note">Aviso: la disponibilidad de contenidos depende de los derechos de emisión de cada evento o canal. Este sitio no garantiza canales de pago concretos; comprueba siempre qué emisor tiene los derechos y utiliza el servicio de forma responsable y conforme a la ley.</div>`;
const tips = [
  'Conecta el televisor o el reproductor por cable de red en lugar de wifi siempre que puedas.',
  'Reinicia el router una vez por semana para liberar memoria y renovar la conexión.',
  'Evita descargas grandes y copias de seguridad en la nube mientras ves contenido en directo.',
  'Si usas wifi, prioriza la banda de 5 GHz y acerca el dispositivo al router.',
  'Mantén actualizada la aplicación reproductora y el sistema del dispositivo.',
  'Cierra aplicaciones en segundo plano que consuman ancho de banda.',
  'Comprueba que tu tarifa ofrece al menos 25 Mbps reales de bajada para 4K.',
  'Cambia el servidor DNS del router si notas tiempos de carga largos al abrir canales.',
];
const bands = (h, p, b) => band(h, p, b || cta());
const NAVHUBS = [['ciudades/index.html', 'Ciudades'], ['equipos/index.html', 'Equipos'], ['canales/index.html', 'Canales TDT']];

const pages = [];
const add = (p) => { p.faqs = p.faqs || undefined; if (!p.img) { const f = IM.forPage(p); if (f) p.img = f; } pages.push(p); return p; };
const gen = (p) => { // tamaño de descripción
  if (p.desc.length > 158) p.desc = p.desc.slice(0, 155).replace(/\s+\S*$/, '') + '…';
  if (p.title.length > 62) { const left = p.title.split(' | ')[0]; if (left.length >= 25 && /suscripción iptv/i.test(left)) p.title = left; }
  return add(p);
};

// ---------- índices auxiliares --------------------------------------------
const byProv = {}, byCom = {};
D.CITIES.forEach(c => { (byProv[c.prov] ||= []).push(c); (byCom[c.com] ||= {})[c.prov] ||= []; byCom[c.com][c.prov].push(c); });
const cityByName = Object.fromEntries(D.CITIES.map(c => [c.name, c]));
const teamSlug = (t) => slug(t[0]);
const comSlug = (c) => slug(c), provSlug = (p) => slug(p);
const cityUrl = (c) => `ciudades/suscripcion-iptv-${c.slug}.html`;
const teamUrlA = (t) => `equipos/suscripcion-iptv-${teamSlug(t)}-en-directo.html`;
const teamUrlB = (t) => `equipos/donde-ver-${teamSlug(t)}-suscripcion-iptv.html`;
const chUrl = (c) => `canales/${slug(c[0])}-en-directo-suscripcion-iptv.html`;
const compUrl = (c) => `competiciones/suscripcion-iptv-${slug(c[0])}.html`;
const guideUrl = (dv, ap) => `dispositivos/suscripcion-iptv-${slug(ap[0])}-en-${slug(dv[0])}.html`;
const teamsInProv = (prov) => D.TEAMS.filter(t => cityByName[t[1]] && cityByName[t[1]].prov === prov);
const teamsInCom = (com) => D.TEAMS.filter(t => cityByName[t[1]] && cityByName[t[1]].com === com);

// ======================= 1. CIUDADES ========================================
D.CITIES.forEach((c, idx) => {
  const n = c.name, s = c.slug, seed = s, reg = D.REGTV[c.com], myTeams = D.TEAMS.filter(t => t[1] === n);
  const sameProv = byProv[c.prov].filter(x => x !== c);
  const start = sameProv.length ? idx % sameProv.length : 0;
  const nearby = sameProv.length ? Array.from({ length: Math.min(6, sameProv.length) }, (_, i) => sameProv[(start + i) % sameProv.length]) : [];
  const regTeams = teamsInCom(c.com).filter(t => t[1] !== n);
  const regTeamsPick = pickN(regTeams, 3, seed);
  const h1 = pick([`Suscripción IPTV en ${n}: televisión online premium`, `Tu suscripción IPTV en ${n}: canales, deportes y cine`, `Suscripción IPTV ${n}: planes sin permanencia`], seed, 'h1');
  const intro = [
    `Si vives en ${n} (${c.prov}) y buscas una ${K} estable, estás en el lugar adecuado. Nuestro servicio llega a cualquier hogar de ${c.com} con conexión a internet, sin obras, sin antenas y sin instalar nada más que una aplicación.`,
    `${KC} en ${n}: una forma sencilla de ver televisión en directo, películas y series en cualquier pantalla de casa. Solo necesitas fibra o ADSL decente, un dispositivo compatible y unos minutos para configurar tu ${K}.`,
    `Cada vez más hogares de ${n} y de toda la provincia de ${c.prov} cambian la televisión tradicional por la televisión por internet. Con una ${K} pagas un único plan, sin permanencia, y eliges cómo y dónde ver tus contenidos.`,
    `Contratar una ${K} en ${n} no requiere técnicos ni cableado. Recibes tus datos de acceso en minutos, instalas la aplicación en tu dispositivo y empiezas a disfrutar de canales, deportes y catálogo bajo demanda desde ${c.com}.`,
    `Desde ${n} puedes disfrutar de la misma ${K} que ya usan miles de hogares españoles: canales nacionales, internacionales, deportes en directo y un catálogo que se actualiza cada semana. Todo con soporte en español.`,
  ];
  const incl = pickN([
    `Canales nacionales y de ${c.com} en alta definición`, 'Guía de programación (EPG) actualizada', 'Catálogo bajo demanda de películas y series', 'Compatibilidad con Smart TV, Firestick, Android y iPhone',
    'Calidad HD, Full HD y 4K según canal y conexión', 'Activación en minutos tras confirmar el plan', 'Sin permanencia ni cuotas de alta', 'Soporte técnico por mensajería para vecinos de ' + n,
  ], 6, seed, 'incl');
  const regPara = reg
    ? pick([
      `${c.com} cuenta con televisión autonómica pública propia: ${list(reg)}. Si quieres seguir la actualidad y los programas de tu comunidad, tu ${K} en ${n} te permite acceder a estas emisiones cuando el emisor las ofrece por internet, además de las cadenas nacionales.`,
      `Los vecinos de ${n} suelen valorar poder ver ${list(reg)}, las cadenas autonómicas de ${c.com}, junto con la oferta nacional. Es una de las ventajas de la ${K}: reunir en una sola lista la televisión local, regional y nacional.`,
    ], seed, 'reg')
    : pick([
      `${c.com} no dispone de un canal autonómico público de gran difusión, pero sí de emisoras locales y comarcales de TDT. En tu ${K} en ${n} encontrarás las cadenas nacionales y la mayor parte de la oferta regional que se emite en abierto.`,
      `En ${c.com} la oferta televisiva local es más reducida que en otras comunidades. Por eso muchos hogares de ${n} complementan la TDT con una ${K}, que añade cadenas nacionales, internacionales y un amplio catálogo bajo demanda.`,
    ], seed, 'reg');
  let sport;
  if (myTeams.length) {
    const t = myTeams[0];
    sport = `<h2>${KC} en ${n} para seguir al ${t[0]}</h2><p>${n} vive el fútbol con intensidad y el ${t[0]}, que juega en ${t[2]}, es una de las razones por las que muchos vecinos buscan una ${K} fiable. En días de partido la demanda se dispara, por eso conviene una conexión por cable y un plan con servidores reforzados. Consulta nuestra guía para ${L(teamUrlA(t).replace('@/', ''), 'seguir al ' + t[0])} y la página sobre ${L(teamUrlB(t).replace('@/', ''), 'dónde ver al ' + t[0] + ' por internet')}.</p>${legal}`;
  } else if (regTeamsPick.length) {
    sport = `<h2>Fútbol y deporte cerca de ${n} con tu ${K}</h2><p>Aunque ${n} no cuenta con un club en nuestra lista, ${c.com} tiene equipos muy seguidos como ${list(regTeamsPick.map(t => L(teamUrlA(t), t[0])))}. Con una ${K} puedes organizar tu televisión para no perderte las jornadas importantes, siempre que el emisor tenga los derechos correspondientes.</p>${legal}`;
  } else {
    sport = `<h2>Deporte y entretenimiento en ${n} con tu ${K}</h2><p>Aficionados de ${n} de todos los deportes usan la ${K} para organizar su parrilla: fútbol, baloncesto, tenis, motor o ciclismo. Revisa nuestras guías de ${L('competiciones/index.html', 'competiciones deportivas')} para preparar tu conexión antes de cada evento.</p>${legal}`;
  }
  const connTips = pickN(tips, 4, seed, 'tips');
  const nearHtml = nearby.length ? `<p>También damos servicio en municipios cercanos de ${c.prov}: ${list(nearby.map(x => L(cityUrl(x), x.name)))}.</p>` : '';
  const faqPool = [
    [`¿Hay cobertura de ${K} en ${n}?`, `Sí. Nuestra ${K} funciona en cualquier punto de ${n} con conexión a internet, ya sea fibra, ADSL o 4G/5G con datos suficientes.`],
    [`¿Qué velocidad de internet necesito en ${n}?`, `Para HD basta con unos 15 Mbps estables; para 4K recomendamos 25 Mbps o más. Si tu conexión en ${n} es inferior, puedes bajar la calidad de reproducción en la aplicación.`],
    [`¿Cómo contrato la ${K} en ${n}?`, `Eliges tu plan en la página de precios, confirmas el pago y recibes tus datos por WhatsApp. Funciona en todo ${n}.`],
    [`¿La ${K} tiene permanencia en ${n}?`, `No. Todos los planes son sin permanencia, tanto en ${n} como en el resto de ${c.com}.`],
    [`¿Funciona con mi operador en ${n}?`, `La ${K} funciona con cualquier operador que te dé acceso a internet con una velocidad razonable: Movistar, Orange, Vodafone, MásMóvil, Digi u otros.`],
    [`¿Qué dispositivos puedo usar en ${n}?`, `Smart TV (Samsung, LG, Android TV), Fire TV Stick, Apple TV, móviles, tablets y ordenadores. Consulta nuestras guías de instalación por dispositivo.`],
    [`¿Cómo se activa la ${K} en ${n}?`, `Eliges el plan, confirmas el pago y recibes tus datos por mensajería en pocos minutos. Después solo tienes que introducirlos en la aplicación.`],
    [`¿Hay soporte en español para vecinos de ${n}?`, `Sí, nuestro equipo atiende por WhatsApp y correo electrónico todos los días en horario ampliado.`],
  ];
  const faqs = pickN(faqPool, 4, seed, 'faq');
  const body = `
${art(`<h2>${KC} en ${n}: qué necesitas saber</h2><p>${pick(intro, seed, 'intro')}</p>
<h3>Qué incluye tu ${K} en ${n}</h3>${ul(incl)}
<h2>Televisión de ${c.com} con tu ${K} en ${n}</h2><p>${regPara}</p>`)}
${art(sport, 'alt')}
${art(`<h2>Internet en ${n}: cómo lograr una ${K} estable</h2><p>La calidad de la televisión por internet depende tanto del servicio como de tu red doméstica. Estas recomendaciones funcionan en cualquier vivienda de ${n}:</p>${ul(connTips)}<h3>Qué velocidad necesitas</h3><p>Para ver canales en HD con comodidad bastan unos 15 Mbps; para 4K, 25 Mbps o más. Si en ${n} dispones de fibra óptica, tendrás margen de sobra incluso con varias pantallas encendidas.</p>`)}
${secPlans(n)}
${art(`<h2>${KC} cerca de ${n}</h2>${nearHtml}<p>Guías útiles para tu ${K}: ${BL(pickN(GUIDE_POOL, 3, seed, 'gl'))}.</p><p>Consulta más información de ${L('provincias/suscripcion-iptv-provincia-' + provSlug(c.prov) + '.html', 'la ' + K + ' en la provincia de ' + c.prov)} y de ${L('comunidades/suscripcion-iptv-' + comSlug(c.com) + '.html', 'la ' + K + ' en ' + c.com)}.</p>
<h2>Preguntas frecuentes sobre la ${K} en ${n}</h2>${faqs.map(f => faq(f[0], f[1])).join('')}`)}
${bands(`Empieza hoy tu ${K} en ${n}`, `Elige tu plan y empieza hoy en ${n}.`, cta('Contratar ahora'))}`;
  gen({
    file: cityUrl(c), title: `Suscripción IPTV en ${n} | Planes 4K sin permanencia`,
    desc: `Contrata tu suscripción IPTV en ${n} (${c.prov}): canales, deportes y cine en HD y 4K. Activación inmediata, sin permanencia y soporte en español.`,
    h1, crumb: `${KC} ${n}`, lead: pick([`Televisión por internet para hogares de ${n}, ${c.prov}. Activación rápida y sin permanencia.`, `Todo lo que necesitas para ver canales, deportes y series en ${n} con una ${K}.`], seed, 'lead'), body, faqs,
  });
});

// ======================= 2. EQUIPOS (2 páginas por club) =====================
D.TEAMS.forEach((t, i) => {
  const [name, city, stadium] = t, c = cityByName[city], seed = slug(name);
  const sameCom = teamsInCom(c.com).filter(x => x !== t), rel = pickN(sameCom, 3, seed, 'rel');
  const near = D.CITIES.filter(x => x.prov === c.prov && x !== c).slice(0, 4);
  // A
  const faqsA = [
    [`¿Puedo ver los partidos del ${name} con una ${K}?`, `Depende de los derechos de emisión de cada competición. La ${K} te permite acceder a los canales deportivos incluidos en tu lista; confirma siempre qué emisor transmite cada partido.`],
    [`¿Qué conexión necesito en ${city} para ver al ${name}?`, `Para HD, 15 Mbps estables; para 4K, 25 Mbps o más. En días de partido, lo ideal es conectar el televisor por cable de red.`],
    [`¿Cuánto tarda en activarse antes de la jornada del ${name}?`, `Normalmente unos minutos tras confirmar el plan. Conviene contratar con antelación para estar listo el día del partido.`],
  ];
  gen({
    file: teamUrlA(t), title: `Suscripción IPTV para seguir al ${name} | Guía`,
    desc: `Prepara tu suscripción IPTV para seguir al ${name} desde ${city}: conexión, dispositivos y consejos para días de partido en ${stadium}.`,
    h1: `Suscripción IPTV para seguir al ${name}`, crumb: `${KC} ${name}`, lead: `Guía práctica para preparar tu ${K} y ver los partidos del ${name} sin cortes.`, faqs: faqsA,
    body: `${art(`<h2>${KC} y fútbol: el ${name} en directo</h2>
<p>El ${name}, club de ${city} (${c.prov}) que juega en ${stadium}, mueve cada semana a miles de aficionados que quieren verlo sin complicaciones. Una ${K} bien configurada permite seguir la jornada desde el salón, el móvil o el ordenador, siempre que el partido se emita por canales incluidos en tu lista.</p>
<h3>Por qué los días de partido son especiales para tu ${K}</h3>
<p>Cuando juega el ${name}, miles de usuarios se conectan a la vez. Los proveedores con poca capacidad se saturan justo en el pitido inicial. Por eso usamos servidores reforzados y enlaces de respaldo para los canales deportivos más demandados.</p>
<h2>Cómo preparar tu ${K} antes del partido del ${name}</h2>${ul(pickN(tips, 4, seed, 'a').concat(['Abre la aplicación 20 minutos antes y comprueba que el canal carga con normalidad.']))}
<h3>Tu ${K} el día del partido</h3><p>Con una ${K} puedes cambiar de pantalla sin perder el hilo del partido: empezar en el salón y terminar en el móvil. Conviene probar esa transición antes del encuentro del ${name}.</p><h3>Dispositivos recomendados</h3><p>Un televisor con Android TV, un Fire TV Stick o un Apple TV ofrecen un rendimiento fluido. Consulta nuestras ${L('dispositivos/index.html', 'guías de instalación por dispositivo')} para elegir la aplicación más adecuada.</p>${legal}`)}
${secPlans('')}
${art(`<h2>Más sobre la ${K} cerca de ${city}</h2><p>Esta guía complementa la información sobre ${L(cityUrl(c), 'la ' + K + ' en ' + city)}${near.length ? ' y en municipios próximos como ' + list(near.map(x => L(cityUrl(x), x.name))) : ''}. También puedes leer ${L(teamUrlB(t), 'dónde ver al ' + name + ' por internet')}${rel.length ? ' o consultar otros clubes de ' + c.com + ' como ' + list(rel.map(x => L(teamUrlA(x), x[0]))) : ''}.</p>
<p>Guías relacionadas: ${BL(['preparar-dia-de-partido', 'wifi-o-cable-para-iptv'])}.</p>
<h2>Preguntas sobre la ${K} y el ${name}</h2>${faqsA.map(f => faq(f[0], f[1])).join('')}`, 'alt')}
${bands(`Prepara tu ${K} para la próxima jornada`, `Elige tu plan antes de la próxima jornada del ${name}.`, cta('Contratar ahora'))}`,
  });
  // B
  const steps = pickN([
    `Comprueba en la web oficial de la competición qué emisor tiene los derechos del partido del ${name}.`,
    `Revisa la guía de programación (EPG) de tu aplicación para localizar el canal deportivo correspondiente.`,
    `Haz una prueba de calidad con un canal deportivo antes de la hora del encuentro.`,
    `Prepara una segunda pantalla (móvil o tablet) por si necesitas seguir el partido fuera del salón.`,
    `Activa la mejor calidad que permita tu conexión y desactiva ahorros de datos.`,
  ], 5, seed, 'b');
  gen({
    file: teamUrlB(t), title: `Dónde ver al ${name} con suscripción IPTV`,
    desc: `Cómo ver los partidos del ${name} por internet: requisitos de conexión, dispositivos, calidad y qué comprobar en tu suscripción IPTV desde ${city}.`,
    h1: `Dónde ver al ${name} por internet con una suscripción IPTV`, crumb: `Dónde ver ${name}`, lead: `Qué comprobar para seguir al ${name} en directo con tu ${K}.`,
    body: `${art(`<h2>Cómo ver al ${name} por internet: guía rápida con ${K}</h2>
<p>¿Quieres ver al ${name} desde ${city} o desde cualquier otro lugar? La televisión por internet te permite hacerlo en el móvil, el ordenador o la televisión del salón. La clave está en combinar una ${K} fiable, una buena conexión y un dispositivo adecuado.</p>
<h3>Lista de comprobación antes del partido</h3>${ul(steps)}
<h2>Qué mirar en tu ${K} para los partidos del ${name}</h2>
<p>No todos los servicios rinden igual en horas punta. Valora la estabilidad, la rapidez al cambiar de canal y la atención al cliente. Un buen soporte marca la diferencia cuando algo falla minutos antes de que ruede el balón en ${stadium}.</p>
<h3>Tu ${K} y el retardo en directo</h3><p>La reproducción por internet suele tener unos segundos de retraso respecto a la señal original. Si sigues el partido con redes sociales o notificaciones, puede que te adelanten un gol. Es normal y depende del tipo de emisión.</p>${legal}`)}
${art(`<h2>Más información sobre la ${K}</h2><p>Consulta ${L(teamUrlA(t), 'la guía para seguir al ' + name + ' con una ' + K)}, ${L(cityUrl(c), 'la ' + K + ' en ' + city)} y nuestros ${L('suscripcion-iptv-precios.html'.replace('@/', ''), 'planes y precios')}.</p>`, 'alt')}
${bands(`Elige tu ${K} y sigue al ${name}`, `Sin permanencia y con soporte en español.`)}`,
  });
});

// ======================= 3. CANALES TDT ======================================
D.CHANNELS.forEach((ch, i) => {
  const [name, group, kind] = ch, seed = slug(name);
  const sameKind = D.CHANNELS.filter(x => x !== ch && (x[2] === kind || (group && x[1] === group)));
  const rel = pickN(sameKind, 5, seed, 'rel');
  const moreCh = pickN(D.CHANNELS.filter(x => x !== ch && !rel.includes(x)), 3, seed, 'mc');
  const about = {
    'generalista': `${name} es un canal generalista: combina informativos, programas de entretenimiento, series y retransmisiones especiales.`,
    'cultural y documental': `${name} apuesta por contenidos culturales, documentales y programas de divulgación.`,
    'noticias': `${name} ofrece información de actualidad continua, ideal para seguir noticias a cualquier hora.`,
    'deportes': `${name} se centra en contenidos deportivos: retransmisiones, programas de análisis y magacines.`,
    'infantil': `${name} está dirigido al público infantil, con dibujos animados y programas pensados para los más pequeños.`,
    'juvenil': `${name} se orienta a un público joven con series, programas y entretenimiento.`,
    'series y entretenimiento': `${name} reúne series, películas y programas de entretenimiento.`,
    'entretenimiento': `${name} combina programas de entretenimiento, series y espacios de ocio.`,
    'series': `${name} está especializado en series de ficción nacionales e internacionales.`,
    'series y humor': `${name} mezcla series y programas de humor.`,
    'cine y series': `${name} programa películas y series en su parrilla habitual.`,
    'cine': `${name} programa cine de distintos géneros.`,
    'documentales': `${name} se especializa en documentales y programas de no ficción.`,
    'música': `${name} está dedicado a la música y los videoclips.`,
    'autonómico': `${name} es un canal autonómico de televisión pública con contenidos regionales, informativos locales y programación propia.`,
    'autonómico y noticias': `${name} es un canal autonómico centrado en la información y la actualidad.`,
    'noticias internacionales': `${name} es un canal de noticias internacionales que ofrece cobertura global de la actualidad.`,
  }[kind] || `${name} es un canal de televisión en abierto.`;
  const faqs = [
    [`¿Puedo ver ${name} en directo con una ${K}?`, `Si el emisor ofrece su señal en abierto por internet, tu ${K} te permite acceder a ella desde cualquier dispositivo compatible. La disponibilidad puede variar según el canal.`],
    [`¿Se ve ${name} en HD?`, `Depende del emisor y de tu conexión. Con unos 15 Mbps estables puedes ver la mayoría de canales en alta definición.`],
    [`¿Necesito antena para ver ${name} con la ${K}?`, `No. Solo necesitas conexión a internet y una aplicación reproductora compatible.`],
  ];
  gen({
    file: chUrl(ch), title: `${name} en directo con suscripción IPTV | Guía`,
    desc: `Cómo ver ${name} en directo por internet con una suscripción IPTV: requisitos, dispositivos, calidad de imagen y consejos de conexión.`,
    h1: `Ver ${name} en directo con tu suscripción IPTV`, crumb: name, lead: `Todo lo que necesitas para ver ${name} por internet con tu ${K}.`, faqs,
    body: `${art(`<h2>${name} en directo con tu ${K}</h2><p>${about}${group ? ` Forma parte del grupo ${group}.` : ''} Con una ${K} puedes sintonizarlo desde cualquier dispositivo con internet, sin antena ni decodificador, y combinarlo con el resto de cadenas de tu lista.</p>
<h3>Cómo ver ${name} con tu ${K}</h3>${ul(['Instala una aplicación reproductora compatible en tu dispositivo.', 'Introduce los datos de acceso de tu plan.', `Busca ${name} en la guía de programación o en la categoría correspondiente.`, 'Añádelo a favoritos para acceder en un solo toque.'])}
<h2>Calidad y estabilidad de ${name} en tu ${K}</h2><p>La nitidez depende de la señal original y de tu conexión. Una línea de 15 Mbps suele bastar para HD. Si notas cortes, conecta el dispositivo por cable, reinicia el router o prueba otro canal de la misma categoría.</p>${ul(pickN(tips, 3, seed, 'c'))}${legal}`)}
${secPlans('')}
${art(`<h2>Más canales y guías de ${K}</h2><p>También te pueden interesar: ${list(rel.concat(moreCh).map(x => L(chUrl(x), x[0])))}. Consulta además el ${L('canales/index.html', 'listado de canales de TDT')} y los ${L('suscripcion-iptv-precios.html', 'planes de ' + K)}.</p>
<p>Guías relacionadas: ${BL(['que-es-epg-guia-programacion', 'favoritos-y-categorias-organizar'])}.</p>
<h2>Preguntas sobre ${name} y la ${K}</h2>${faqs.map(f => faq(f[0], f[1])).join('')}`, 'alt')}
${bands(`Disfruta de ${name} con tu ${K}`, 'Elige tu plan y empieza a ver hoy.', cta('Contratar ahora'))}`,
  });
});

// ======================= 4. COMPETICIONES ===================================
D.COMPS.forEach((cp) => {
  const [name, sport, cal] = cp, seed = slug(name), rel = pickN(D.COMPS.filter(x => x !== cp && x[1] === sport), 4, seed, 'r').concat(pickN(D.COMPS.filter(x => x !== cp && x[1] !== sport), 2, seed, 'r2'));
  const faqs = [
    [`¿Puedo ver ${name} con una ${K}?`, `Depende de los derechos de emisión vigentes. Tu ${K} te da acceso a los canales incluidos en tu lista; confirma qué emisor transmite cada evento.`],
    [`¿Qué conexión necesito para ver ${name} en directo?`, `15 Mbps estables para HD y 25 Mbps o más para 4K. En eventos importantes recomendamos cable de red.`],
    [`¿Funciona en el móvil?`, `Sí. Con una aplicación compatible puedes seguir ${name} desde móvil, tablet, ordenador o televisor.`],
  ];
  gen({
    file: compUrl(cp), title: `${name} con suscripción IPTV | Guía de ${sport}`,
    desc: `Prepara tu suscripción IPTV para seguir ${name}: calendario habitual, conexión recomendada, dispositivos y consejos para no perderte nada.`,
    h1: `${name} con tu suscripción IPTV: guía para seguirla`, crumb: name, lead: `Cómo preparar tu ${K} para ${name} y evitar cortes en los momentos clave.`, faqs,
    body: `${art(`<h2>${KC} para seguir ${name}</h2><p>${name} es una competición de ${sport} con ${cal}. Para seguirla por internet conviene preparar la ${K}, la conexión y el dispositivo con antelación: los picos de audiencia son el momento en que fallan los servicios menos robustos.</p>
<h3>Preparación en cinco pasos</h3>${ul(pickN(tips, 4, seed, 'p').concat([`Revisa el calendario de ${name} y los horarios en la guía de programación.`]))}
<h2>Qué esperar de tu ${K} durante ${name}</h2><p>Un servicio bien dimensionado mantiene la imagen estable incluso cuando muchos usuarios se conectan a la vez. Si algo falla, cambia de canal alternativo, espera unos segundos y escríbenos: reforzamos el soporte durante los eventos más importantes.</p>${legal}`)}
${secPlans('')}
${art(`<h2>Otras guías de ${K} relacionadas</h2><p>${list(rel.map(x => L(compUrl(x), x[0])))}. También puedes consultar la ${L('equipos/index.html', 'lista de equipos')} y los ${L('suscripcion-iptv-precios.html', 'precios de la ' + K)}.</p>
<h2>Preguntas sobre ${name} y la ${K}</h2>${faqs.map(f => faq(f[0], f[1])).join('')}`, 'alt')}
${bands(`Tu ${K} lista para ${name}`, 'Elige tu plan y empieza hoy.', cta('Contratar ahora'))}`,
  });
});

// ======================= 5. DISPOSITIVO × APP ===============================
const STEPKIND = {
  televisor: ['Enciende el televisor y conéctalo a internet por cable o wifi.', 'Comprueba que el sistema esté actualizado.'],
  stick: ['Conecta el stick a un puerto HDMI y alimentación estable.', 'Conéctalo a tu red wifi o usa un adaptador Ethernet.'],
  caja: ['Conecta la caja al televisor por HDMI y a la red local.', 'Actualiza el sistema desde los ajustes.'],
  móvil: ['Conecta el móvil al wifi para la primera configuración.', 'Comprueba que tienes espacio de almacenamiento libre.'],
  tablet: ['Conecta la tablet al wifi.', 'Actualiza el sistema y la tienda de aplicaciones.'],
  ordenador: ['Comprueba que tu sistema operativo está actualizado.', 'Cierra programas que consuman mucho ancho de banda.'],
};
const KINDTIP = {
  televisor: 'Si el televisor es antiguo y va lento, un reproductor externo económico mejora mucho la fluidez.',
  stick: 'Los sticks se calientan: colócalo con ventilación y evita ocultarlo detrás del televisor sin espacio.',
  caja: 'Una caja con puerto Ethernet es la opción más estable para 4K: úsalo siempre que puedas.',
  móvil: 'Si cambias entre wifi y datos móviles, cierra y vuelve a abrir la aplicación para evitar cortes.',
  tablet: 'En tablet, activa el modo horizontal y bloquea la rotación para disfrutar de los directos.',
  ordenador: 'En ordenador puedes abrir el reproductor en una ventana secundaria y seguir trabajando.',
};
let guideCount = 0;
D.DEVICES.forEach((dv) => D.APPS.forEach((ap) => {
  if (!ap[1].includes(dv[1])) return;
  guideCount++;
  const seed = slug(dv[0] + ap[0]), [dName, plat, store, kind] = dv, [aName, , mode] = ap;
  const others = D.APPS.filter(a => a !== ap && a[1].includes(plat));
  const rel = pickN(others, 4, seed, 'o');
  const otherDevs = pickN(D.DEVICES.filter(d => d !== dv && ap[1].includes(d[1])), 3, seed, 'od');
  const cfg = mode === 'xtream'
    ? [`Abre ${aName} y elige la opción de acceso con usuario, contraseña y URL del servidor (Xtream Codes).`, 'Introduce los datos que te enviamos al activar tu plan, sin espacios.', 'Pulsa en iniciar sesión y espera a que se descarguen canales, guía y catálogo.']
    : [`Abre ${aName} y busca la opción para añadir una lista (URL M3U o portal).`, 'Pega la dirección de tu lista tal y como la recibiste, sin espacios ni saltos de línea.', 'Guarda y espera a que se cargue la lista y la guía de programación.'];
  const faqs = [
    [`¿Es gratis ${aName} en ${dName}?`, `Muchas aplicaciones tienen versión gratuita y otras ofrecen funciones premium. Revisa las condiciones en ${store} antes de instalar.`],
    [`¿Qué hago si ${aName} no aparece en ${store}?`, `Comprueba que tu ${dName} está actualizado y que la tienda es de tu región. Si sigue sin aparecer, usa una de las aplicaciones alternativas de esta guía.`],
    [`¿La ${K} funciona igual en ${dName} que en otros dispositivos?`, `Sí. Los datos de acceso son los mismos; cambia únicamente la aplicación y la forma de instalarla.`],
  ];
  gen({
    file: guideUrl(dv, ap), title: `${aName} en ${dName}: suscripción IPTV`,
    desc: `Aprende a instalar y configurar ${aName} en ${dName} para usar tu suscripción IPTV: requisitos, pasos y solución de problemas.`,
    h1: `Cómo instalar ${aName} en ${dName} con tu suscripción IPTV`, crumb: `${aName} en ${dName}`, lead: `Guía paso a paso para configurar tu ${K} con ${aName} en ${dName}.`, faqs,
    body: `${art(`<h2>${aName} en ${dName}: configurar tu ${K}</h2><p>${aName} es una de las aplicaciones más usadas para reproducir una ${K} en ${dName}. En esta guía verás cómo instalarla desde ${store}, cómo introducir tus datos de acceso y cómo evitar los problemas más habituales.</p>${aName === 'IPTV Smarters Pro' ? '<figure class="inline">' + IM.img('app-smarters', 'Interfaz de IPTV Smarters Pro con tu ' + K, { sizes: '(max-width:900px) 100vw, 820px' }) + '<figcaption>Pantalla principal de IPTV Smarters Pro: TV en directo, películas y series.</figcaption></figure>' : aName === 'TiviMate' ? '<figure class="inline">' + IM.img('epg-tivimate', 'Guía de programación estilo TiviMate con tu ' + K, { sizes: '(max-width:900px) 100vw, 820px' }) + '<figcaption>Ejemplo de guía de programación (EPG) con canales y horarios.</figcaption></figure>' : ''}
<h3>Requisitos previos</h3>${ul([...STEPKIND[kind], 'Tus datos de acceso (usuario, contraseña y URL) o la dirección de tu lista.', 'Internet de al menos 15 Mbps para HD.'])}
<h2>Instalar ${aName} en ${dName} paso a paso</h2><ol><li>Abre ${store} en tu ${dName}.</li><li>Busca «${aName}» y pulsa instalar.</li><li>Abre la aplicación y acepta los permisos necesarios.</li></ol>
<h3>Configurar tu ${K} en ${aName}</h3><ol>${cfg.map(x => `<li>${x}</li>`).join('')}</ol>
<h2>Consejos para tu ${K} en ${dName}</h2><p>${KINDTIP[kind]}</p>${ul(pickN(tips, 3, seed, 't'))}<h3>Cuando todo funciona: crea tu propia parrilla</h3><p>Una vez cargada tu ${K} en ${aName}, dedica unos minutos a ordenar categorías, ocultar los canales que no ves y marcar tus favoritos. Con ${dName} la navegación es más rápida si limitas la lista a lo que de verdad usas, y tu ${K} se vuelve mucho más cómoda.</p>`)}
${art(`<h2>Problemas frecuentes con ${aName} en ${dName}</h2>${faqs.map(f => faq(f[0], f[1])).join('')}
<h2>Alternativas a ${aName} para tu ${K} en ${dName}</h2>${rel.length ? `<p>Si ${aName} no te convence, prueba ${list(rel.map(a => L(guideUrl(dv, a), a[0])))}.</p>` : '<p>Consulta el resto de guías de dispositivos para ver más opciones.</p>'}${otherDevs.length ? `<p>${aName} también está disponible en ${list(otherDevs.map(d => L(guideUrl(d, ap), d[0])))}.</p>` : ''}
<p>Guías relacionadas: ${BL(pickN(['tv-box-vs-stick-vs-smart-tv', 'mejor-reproductor-app-criterios', 'limpiar-cache-aplicacion-iptv', 'actualizar-firmware-televisor', 'tivimate-vs-smarters-comparativa'], 2, seed, 'dg'))}.</p><p>Más información: ${L('dispositivos/index.html', 'todas las guías de dispositivos')} y ${L('suscripcion-iptv-precios.html', 'planes de ' + K)}.</p>`, 'alt')}
${bands(`Configura tu ${K} hoy`, 'Te ayudamos con la instalación por mensajería.')}`,
  });
}));

// ======================= 6. GUÍAS POR KEYWORD (rellenan hasta el total) ======
const kws = require('./keywords.json');
const bad = /aliexpress|alibaba|prueba|probar|ebay|miravia|worten|dazn|movistar|hbo|netflix|amazon|gr[aá]tis|gratuit|free|m3u|lista|playlist|github|telegram|org|hot|net |ss |smartone|euro|trial|ip smart/i;
const nrm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\b(20\d\d|de|la|el|para|en|con|y|iptv)\b/g, '').split(/\s+/).filter(Boolean).sort().join(' ');
const seenK = new Set(), kwPool = [];
kws.sort((a, b) => b.score - a.score).forEach(r => { if (bad.test(r.keyword)) return; const n = nrm(r.keyword); if (!n || seenK.has(n) || seenK.has('slug:' + slug(r.keyword))) return; seenK.add(n); seenK.add('slug:' + slug(r.keyword)); kwPool.push(r); });
const hubsCount = 6 + new Set(D.CITIES.map(c => c.com)).size + Object.keys(byProv).length;
const needGuides = Math.max(0, TARGET_TOTAL - CORE - pages.length - hubsCount);
const guides = kwPool.slice(0, needGuides);
const gUrl = (r) => `guias/${slug(r.keyword)}-suscripcion-iptv.html`;
const CL = { '1': 'comprar', '2': 'deportes', '3': 'apps', '4': 'listas', '5': 'general' };
guides.forEach((r, i) => {
  const kw = r.keyword, seed = slug(kw), cl = CL[r.cluster[0]] || 'general';
  const rel = pickN(guides.filter(x => x !== r && x.cluster === r.cluster), 5, seed, 'rel').concat(pickN(guides.filter(x => x !== r), 2, seed, 'rg'));
  const intro = {
    comprar: `Si estás buscando «${kw}», probablemente quieres comparar opciones antes de pagar. Una ${K} es una decisión que conviene tomar con información: precio real por mes, estabilidad, número de conexiones y calidad del soporte.`,
    deportes: `Quien busca «${kw}» quiere ver deporte en directo sin cortes. La ${K} puede ser una solución flexible, pero la experiencia depende de la capacidad del servicio en días de máxima audiencia y de tu propia conexión.`,
    apps: `La búsqueda «${kw}» suele venir de usuarios que ya tienen una ${K} y quieren configurarla bien. La aplicación reproductora marca la diferencia en comodidad, rapidez y estabilidad.`,
    listas: `Cuando alguien busca «${kw}», lo importante es entender qué es una lista, cómo se carga en la aplicación y qué diferencia hay entre una lista pública y un servicio con soporte y garantía de calidad.`,
    general: `«${kw}» es una de las búsquedas más habituales de quienes se inician en la televisión por internet. Esta guía resume lo esencial para que entiendas cómo funciona una ${K} y cómo elegirla.`,
  }[cl];
  const body2 = {
    comprar: ['Compara el precio por mes real y no solo la cuota anunciada.', 'Empieza con un plan corto si aún dudas antes de comprometerte con uno largo.', 'Confirma el número de conexiones simultáneas incluidas.', 'Verifica que existe un canal de soporte real y en tu idioma.'],
    deportes: ['Usa cable de red en el dispositivo principal.', 'Haz una prueba de calidad antes de cada evento importante.', 'Ten un canal alternativo preparado por si falla el principal.', 'Revisa quién tiene los derechos de emisión de cada competición.'],
    apps: ['Elige una aplicación compatible con tu dispositivo y mantenla actualizada.', 'Introduce los datos de acceso sin espacios al principio ni al final.', 'Carga la guía EPG y crea una lista de favoritos.', 'Ajusta la calidad de vídeo a tu velocidad de internet.'],
    listas: ['Desconfía de listas públicas sin soporte ni garantías.', 'Comprueba que respetas la normativa y los derechos de autor.', 'Prefiere un servicio con atención al cliente y actualizaciones.', 'Guarda tus datos de acceso en un lugar seguro y no los compartas.'],
    general: ['Entiende qué incluye el servicio antes de pagar.', 'Comprueba la velocidad de tu internet y tus dispositivos.', 'Empieza con un plan corto y evalúa la estabilidad en horas punta.', 'Valora el soporte tanto como el precio.'],
  }[cl];
  const faqs = [
    [`¿Qué significa «${kw}»?`, `Es una búsqueda habitual de usuarios interesados en la televisión por internet y en cómo elegir y configurar una ${K}.`],
    [`¿Necesito conocimientos técnicos para usar una ${K}?`, `No. Basta con instalar una aplicación e introducir tus datos. Te guiamos por mensajería si lo necesitas.`],
    [`¿Cuánto tarda en activarse?`, `Normalmente unos minutos tras confirmar el plan.`],
  ];
  const Kw = cap(kw);
  gen({
    file: gUrl(r), title: `${Kw}: guía con suscripción IPTV en España`,
    desc: `Todo sobre «${kw}»: qué es, cómo elegir y configurar tu suscripción IPTV en España, con consejos prácticos, requisitos y respuestas a dudas frecuentes.`,
    h1: `${Kw}: guía para elegir tu suscripción IPTV`, crumb: Kw, lead: `Todo lo que necesitas saber sobre «${kw}» y cómo elegir tu ${K}.`, faqs,
    body: `${art(`<h2>${Kw} y la ${K}: qué debes saber</h2><p>${intro}</p>
<h3>Criterios para decidir bien con tu ${K}</h3>${ul(body2)}
<h2>Cómo encaja «${kw}» en tu ${K}</h2><p>Una ${K} bien elegida reúne canales en directo, catálogo bajo demanda y aplicaciones para todos tus dispositivos. Si dudas, empieza por un plan corto y evalúa la estabilidad en distintas franjas horarias.</p>${ul(pickN(tips, 3, seed, 'g'))}${legal}`)}
${secPlans('')}
${art(`<h2>Guías relacionadas con la ${K}</h2><p>${rel.length ? list(rel.map(x => L(gUrl(x), cap(x.keyword)))) + '. ' : ''}Consulta también ${L('dispositivos/index.html', 'las guías de instalación por dispositivo')} y ${L('ciudades/index.html', 'la cobertura por ciudades')}.</p>
<h2>Preguntas frecuentes sobre «${kw}»</h2>${faqs.map(f => faq(f[0], f[1])).join('')}`, 'alt')}
${bands(`Elige tu ${K} con criterio`, 'Sin permanencia y con soporte en español.', cta())}`,
  });
});

// ======================= 7. HUBS ============================================
const hubPage = (file, title, h1, lead, inner, crumb, more = '') => gen({ file, title, desc: lead, h1, crumb, lead, body: `${art(inner + more)}${bands(`Contrata tu ${K}`, 'Sin permanencia y con soporte en español.')}` });
// comunidades
Object.keys(byCom).forEach(com => {
  const provs = Object.keys(byCom[com]).sort();
  const reg = D.REGTV[com];
  hubPage(`comunidades/suscripcion-iptv-${comSlug(com)}.html`, `Suscripción IPTV en ${com} | Ciudades y provincias`, `Suscripción IPTV en ${com}`, `${KC} en ${com}: ciudades, provincias y televisión autonómica con cobertura en toda la comunidad.`,
    `<h2>${KC} en ${com}</h2><p>Ofrecemos ${K} en toda ${com}. ${reg ? `La comunidad cuenta con televisión autonómica pública (${list(reg)}), que puedes combinar con la oferta nacional en tu ${K}.` : `Aunque la oferta autonómica es más reducida, tu ${K} reúne canales nacionales, internacionales y un amplio catálogo bajo demanda.`}</p>
${provs.map(p => `<h3>${KC} en ${p}</h3><p>${L('provincias/suscripcion-iptv-provincia-' + provSlug(p) + '.html', 'Ver toda la provincia de ' + p)}: ${list(byCom[com][p].slice(0, 12).map(c => L(cityUrl(c), c.name)))}${byCom[com][p].length > 12 ? '…' : ''}.</p>`).join('')}
<p>Volver al ${L('ciudades/index.html', 'listado de ciudades')} o consultar ${L('suscripcion-iptv-precios.html', 'precios')}.</p>`, com);
});
// provincias
Object.keys(byProv).forEach(p => {
  const cs = byProv[p], tm = teamsInProv(p), com = D.PROV[p];
  hubPage(`provincias/suscripcion-iptv-provincia-${provSlug(p)}.html`, `Suscripción IPTV provincia de ${p} | Municipios`, `Suscripción IPTV en la provincia de ${p}`, `${KC} en ${p} (${com}): municipios con cobertura, equipos y guías de instalación.`,
    `<h2>${KC} en ${p}</h2><p>La provincia de ${p}, en ${com}, cuenta con cobertura de nuestra ${K} en todos sus municipios con conexión a internet. Elige tu localidad para ver información específica.</p>
<h3>Municipios de ${p} con ${K}</h3><p>${list(cs.map(c => L(cityUrl(c), c.name)))}.</p>
${tm.length ? `<h3>Fútbol en ${p}</h3><p>Equipos de la provincia: ${list(tm.map(t => L(teamUrlA(t), t[0])))}.</p>` : ''}
<p>Más información en ${L('comunidades/suscripcion-iptv-' + comSlug(com) + '.html', 'la ' + K + ' en ' + com)}.</p>`, p);
});
// índices principales
const grpCom = {}; D.CITIES.forEach(c => (grpCom[c.com] ||= []).push(c));
hubPage('ciudades/index.html', `Suscripción IPTV por ciudades en España | Cobertura`, `Suscripción IPTV por ciudades de España`, `Listado de ciudades y municipios con ${K}: elige tu localidad y consulta la información específica.`,
  `<h2>${KC} en toda España</h2><p>Estas son las ciudades y municipios para los que hemos preparado información específica sobre la ${K}. Elige el tuyo.</p>${Object.keys(grpCom).sort().map(com => `<h3>${KC} en ${com}</h3><p>${grpCom[com].map(c => L(cityUrl(c), c.name)).join(' · ')}</p>`).join('')}`, 'Ciudades', `<h3>Cómo elegir tu ${K} por ciudad</h3><p>Cada ficha de ${K} por ciudad explica la cobertura, la televisión autonómica y los consejos de conexión de tu zona. Si tu municipio no aparece, la ${K} funciona igualmente en cualquier lugar con internet: consulta los ${L('suscripcion-iptv-precios.html', `planes de ${K}`)} o escríbenos por WhatsApp.</p><p>Cada ${K} incluye los mismos canales, la misma guía y el mismo soporte, esté donde esté tu hogar. Lo único que cambia es la oferta de canales autonómicos, así que elige tu ${K} según la región.</p><p>Tanto si buscas una ${K} para un piso en una gran capital como para una vivienda en un municipio pequeño, tu ${K} se activa igual: eliges plan, recibes tus datos y configuras tu ${K} en la aplicación. Si tienes dudas, nuestro soporte te ayuda a elegir el plan adecuado de ${K}. Recuerda: tu ${K} funciona igual en cualquier ciudad, y activar tu ${K} es cuestión de minutos.</p>`);
hubPage('equipos/index.html', `Suscripción IPTV para seguir a tu equipo | Clubes`, `Suscripción IPTV para seguir a tu equipo`, `Guías de ${K} para seguir a los principales clubes de fútbol de España.`,
  `<h2>${KC} y fútbol: elige tu club</h2><p>Guías para preparar tu ${K} y seguir a tu equipo sin cortes.</p><ul class="chk">${D.TEAMS.map(t => `<li>${L(teamUrlA(t), t[0])} · ${L(teamUrlB(t), 'dónde ver')}</li>`).join('')}</ul>`, 'Equipos', `<h3>Tu ${K} para cada club</h3><p>Cada guía de ${K} por equipo explica cómo preparar la conexión, el dispositivo y el soporte para los días de partido. Es la forma más práctica de organizar tu ${K} antes de la jornada. Recuerda que la disponibilidad de cada partido depende de los derechos de emisión, también con una ${K}.</p>`);
hubPage('canales/index.html', `Canales de TDT con suscripción IPTV | Guías`, `Canales de TDT con tu suscripción IPTV`, `Listado de canales de TDT nacionales, autonómicos e internacionales y cómo verlos con tu ${K}.`,
  `<h2>Canales en abierto con ${K}</h2><p>Consulta cómo ver cada canal desde tu ${K}.</p><p>${D.CHANNELS.map(c => L(chUrl(c), c[0])).join(' · ')}</p>`, 'Canales');
hubPage('competiciones/index.html', `Competiciones deportivas con suscripción IPTV`, `Competiciones deportivas con tu suscripción IPTV`, `Guías para preparar tu ${K} y seguir las principales competiciones deportivas.`,
  `<h2>Deporte con ${K}</h2><p>Elige la competición:</p><ul class="chk">${D.COMPS.map(c => `<li>${L(compUrl(c), c[0])} (${c[1]})</li>`).join('')}</ul>`, 'Competiciones');
hubPage('dispositivos/index.html', `Guías de ${K} por dispositivo y aplicación`, `Instalar tu suscripción IPTV por dispositivo`, `Guías de instalación de ${K} para Smart TV, Fire TV Stick, Apple TV, móviles y ordenadores con las aplicaciones más usadas.`,
  `<h2>Guías por dispositivo</h2>${D.DEVICES.map(dv => `<h3>${KC} en ${dv[0]}</h3><p>${list(D.APPS.filter(a => a[1].includes(dv[1])).map(a => L(guideUrl(dv, a), a[0])))}.</p>`).join('')}`, 'Dispositivos');
hubPage('guias/index.html', `Guías de suscripción IPTV | Todo para elegir bien`, `Guías de suscripción IPTV en España`, `Guías prácticas para elegir, contratar y configurar tu ${K}.`,
  `<h2>Guías de ${K}</h2><ul class="chk">${guides.map(r => `<li>${L(gUrl(r), cap(r.keyword))}</li>`).join('')}</ul>`, 'Guías', `<h3>Cómo usar estas guías de ${K}</h3><p>Cada guía resume un tema concreto de la ${K}: qué es, cómo elegir, cómo configurar y qué errores evitar. Lee primero la guía que más se parezca a tu duda y, si necesitas ayuda personalizada con tu ${K}, escríbenos por mensajería.</p>`);

require('./pseo-extra.js')(pages, { D, K, KC, L, ul, list, pick, pickN, teamUrlA, teamsInCom, teamsInProv, byCom, byProv, provSlug, comSlug, slug, hash, tips, guides });
// ---------- salida --------------------------------------------------------
const fix = (html) => html.replace(/(href|src)="(?!https?:|mailto:|data:|#|@\/|\.\.\/)([^"]+)"/g, '$1="../$2"').replace(/@\//g, '../');
let n = 0;
pages.forEach(p => {
  const html = fix(render(p));
  const f = path.join(OUT, p.file); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); n++;
});
// sitemap completo
const all = []; (function walk(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) all.push(path.relative(OUT, f).replace(/\\/g, '/')); }); })(OUT);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${all.map(f => `<url><loc>${C.domain}/${f}</loc><lastmod>2026-03-01</lastmod><changefreq>weekly</changefreq><priority>${f === 'index.html' ? '1.0' : f.includes('/') ? (f.endsWith('index.html') ? '0.7' : '0.5') : '0.8'}</priority></url>`).join('\n')}\n</urlset>`);
const counts = {}; pages.forEach(p => { const k = p.file.split('/')[0]; counts[k] = (counts[k] || 0) + 1; });
console.log('Páginas programáticas:', n, counts, '| total con núcleo:', all.length, '| guías por keyword:', guides.length);
{ const seen = {}; pages.forEach(p => { (seen[p.file] ||= []).push(p.h1); }); Object.entries(seen).filter(([, v]) => v.length > 1).forEach(([f, v]) => console.log('DUPLICADO', f, v)); }
