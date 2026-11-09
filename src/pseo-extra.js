// Capa de variación editorial: se inyecta antes del bloque final de cada página.
module.exports = function (pages, ctx) {
  const { D, K, KC, L, ul, list, pick, pickN, teamUrlA, teamsInCom, teamsInProv, byCom, byProv, provSlug, comSlug, slug, hash } = ctx;
  const M = '<section><div class="wrap"><div class="band">';
  const ins = (p, html) => { const i = p.body.lastIndexOf(M); p.body = i < 0 ? p.body + html : p.body.slice(0, i) + html + p.body.slice(i); };
  const sec = (inner, cls = '') => `<section${cls ? ` class="${cls}"` : ''}><div class="wrap"><article class="prose">${inner}</article></div></section>`;

  // ---- provincias ----
  const comProvs = {}; Object.keys(D.PROV).forEach(p => (comProvs[D.PROV[p]] ||= []).push(p));
  pages.filter(p => p.file.startsWith('provincias/')).forEach(p => {
    const prov = Object.keys(byProv).find(x => p.file.endsWith(`provincia-${provSlug(x)}.html`)); if (!prov) return;
    const com = D.PROV[prov], cs = byProv[prov], sib = comProvs[com].filter(x => x !== prov && byProv[x]), reg = D.REGTV[com], tm = teamsInProv(prov);
    const v = hash(prov) % 3;
    const t1 = [
      `En ${prov} conviven núcleos urbanos grandes y municipios pequeños, y la calidad de la conexión puede variar de unos a otros. Por eso recomendamos comprobar la velocidad real de tu línea antes de elegir la calidad de reproducción de tu ${K}.`,
      `La televisión por internet ha ganado terreno en ${prov} gracias al despliegue de la fibra óptica. Si tu municipio aún no la tiene, una buena conexión ADSL o 4G puede bastar para ver canales en definición estándar o HD.`,
      `Elegir una ${K} en ${prov} es sencillo: eliges el plan que mejor se adapte a tu hogar, lo activas en minutos y empiezas a ver.`,
    ][v];
    ins(p, sec(`<h2>Televisión por internet en ${prov}</h2><p>${t1}</p>
<h3>Qué comprobar antes de contratar en ${prov}</h3>${ul([`Velocidad real de tu conexión en ${prov}, medida a distintas horas.`, 'Dispositivos disponibles en casa: Smart TV, Fire TV Stick, Android TV o Apple TV.', 'Número de pantallas que usarás a la vez.', reg ? `Interés en las cadenas autonómicas de ${com}: ${list(reg)}.` : `Oferta local de ${com} en TDT y canales nacionales.`])}
<p>Esta provincia pertenece a ${com}${sib.length ? ', junto a ' + list(sib.slice(0, 6).map(x => L('provincias/suscripcion-iptv-provincia-' + provSlug(x) + '.html', x))) : ''}. Dispones de información detallada de ${cs.length} ${cs.length === 1 ? 'municipio' : 'municipios'} de ${prov}${tm.length ? ' y de los clubes ' + list(tm.map(t => L(teamUrlA(t), t[0]))) : ''}.</p><p>Elige tu plan de ${K} en ${prov} y empieza a ver hoy mismo.</p>`));
  });

  // ---- comunidades ----
  pages.filter(p => p.file.startsWith('comunidades/')).forEach(p => {
    const com = Object.keys(comProvs).find(x => p.file.endsWith(`suscripcion-iptv-${comSlug(x)}.html`)); if (!com) return;
    const tms = teamsInCom(com), reg = D.REGTV[com], n = Object.values(byCom[com] || {}).reduce((a, b) => a + b.length, 0);
    ins(p, sec(`<h2>Cómo es ver televisión por internet en ${com}</h2>
<p>${com} reúne ${comProvs[com].length} ${comProvs[com].length === 1 ? 'provincia' : 'provincias'} y, en nuestra cobertura, ${n} municipios con información específica. La experiencia depende sobre todo de la calidad de tu conexión doméstica, así que conviene empezar por un plan corto y medir la estabilidad en tu casa.</p>
<h3>Canales y contenidos en ${com}</h3><p>${reg ? `Además de las cadenas nacionales, en ${com} podrás seguir ${list(reg)}, la televisión autonómica pública, siempre que el emisor ofrezca su señal por internet.` : `La televisión autonómica es más limitada en ${com}, así que este tipo de servicio aporta variedad adicional con canales nacionales e internacionales y catálogo bajo demanda.`}</p>
${tms.length ? `<h3>Deporte en ${com}</h3><p>Clubes con guía específica en esta comunidad: ${list(tms.map(t => L(teamUrlA(t), t[0])))}.</p>` : ''}
<h3>Consejos rápidos</h3>${ul(pickN(ctx.tips, 3, com, 'cm'))}
<p>Antes de decidir, conviene medir la velocidad real de tu conexión a distintas horas del día, revisar qué dispositivos tienes en casa y calcular cuántas pantallas vais a usar a la vez. Con esos tres datos resulta mucho más fácil elegir la calidad de reproducción adecuada y evitar sorpresas durante los eventos de más audiencia. Si tienes dudas, escríbenos y te ayudamos a elegir el plan adecuado.</p>`));
  });

  // ---- canales: contenido por tipo ----
  const CHX = {
    noticias: [`Los canales de noticias son los más sensibles a la latencia: la señal por internet puede llegar con unos segundos de retraso respecto a la TDT. Si quieres seguir una rueda de prensa o una última hora, conviene usar conexión por cable.`, `Para canales informativos, la prioridad es la estabilidad antes que la resolución. Una conexión de 8–10 Mbps suele bastar, y puedes reservar el ancho de banda restante para otros dispositivos de casa.`],
    deportes: [`En los canales deportivos el pico de audiencia coincide con los directos. Prepara la aplicación unos minutos antes y evita descargas en segundo plano durante la retransmisión.`, `Los contenidos deportivos suelen emitirse a más fotogramas por segundo y consumen más datos. Si notas saltos, baja un escalón la calidad en la aplicación y comprueba el cable de red.`],
    infantil: [`Los canales infantiles conviene tenerlos en una lista de favoritos o en un perfil aparte, para que los pequeños accedan sin navegar por el resto del catálogo.`, `Si vas a usar la televisión por internet con niños, activa el control parental de la aplicación y limita el acceso a categorías que no sean adecuadas para su edad.`],
    autonómico: [`Los canales autonómicos tienen programación propia, informativos regionales y emisiones en lenguas cooficiales. Son una de las razones por las que muchos hogares mantienen la televisión local junto a la oferta nacional.`, `La señal de los canales autonómicos puede cambiar de enlace con cierta frecuencia. Si un canal deja de cargar, actualiza la lista desde la aplicación o avísanos para revisarlo.`],
    cine: [`En canales de cine y series, la calidad de imagen y el sonido son lo más importante. Con un buen televisor y 25 Mbps de conexión notarás la diferencia en las emisiones en alta definición.`, `Los canales de cine suelen programar películas por franjas horarias. Consulta la guía EPG de tu aplicación para localizar el título y la hora de emisión.`],
    general: [`Los canales generalistas concentran la mayor audiencia en horas punta, como el prime time. Es el momento en que más se agradece una conexión estable y un dispositivo con buen rendimiento.`, `Un canal generalista combina informativos, entretenimiento y ficción en una misma parrilla. Marcarlo como favorito te ahorra tiempo cada vez que enciendes la televisión.`],
  };
  const chKind = (k) => /noticias/.test(k) ? 'noticias' : /deportes/.test(k) ? 'deportes' : /infantil/.test(k) ? 'infantil' : /autonómico/.test(k) ? 'autonómico' : /cine|series/.test(k) ? 'cine' : 'general';
  D.CHANNELS.forEach(ch => {
    const p = pages.find(x => x.file === `canales/${slug(ch[0])}-en-directo-suscripcion-iptv.html`); if (!p) return;
    const k = chKind(ch[2]); ins(p, sec(`<h2>Consejos específicos para ${ch[0]}</h2><p>${pick(CHX[k], ch[0], 'x')}</p><p>${pick(CHX[k], ch[0] + 'b', 'y')}</p>`));
  });

  // ---- competiciones por deporte ----
  const CPX = {
    'fútbol': [`En fútbol, las franjas de máxima demanda coinciden con las horas de partido: es cuando más se agradece un servicio con servidores reforzados y enlaces de respaldo.`, `Los partidos de fútbol suelen empezar a la misma hora en varios canales, lo que provoca picos de conexión. Entra con antelación y deja la aplicación abierta.`],
    'fútbol femenino': [`El fútbol femenino gana audiencia cada temporada. Revisa con antelación el emisor y el horario de cada jornada, ya que pueden variar de un partido a otro.`],
    'baloncesto': [`En baloncesto, los partidos son rápidos y con muchos cambios de plano, así que una conexión estable evita saltos en los momentos decisivos. Los horarios cambian mucho entre competiciones europeas y la NBA.`],
    'motor': [`En el motor, la acción se reparte en varias sesiones: entrenamientos libres, clasificación y carrera. Programa recordatorios y deja la aplicación lista antes de la salida.`],
    'tenis': [`El tenis tiene horarios muy variables porque la duración de los partidos es impredecible. Ten a mano una segunda pantalla y revisa el orden de juego en la guía de programación.`],
    'ciclismo': [`En ciclismo las etapas pueden durar varias horas y en algunos tramos la cobertura es más inestable por la montaña o la meteorología. Usa una conexión sin cortes y deja margen de batería si ves desde el móvil.`],
  };
  D.COMPS.forEach(cp => { const p = pages.find(x => x.file === `competiciones/suscripcion-iptv-${slug(cp[0])}.html`); if (!p) return; ins(p, sec(`<h2>Particularidades de ${cp[0]}</h2><p>${pick(CPX[cp[1]], cp[0], 'q')}</p>`)); });

  // ---- guías por clúster ----
  const GX = {
    comprar: [`Antes de pagar, apunta qué necesitas realmente: número de pantallas, calidad deseada y presupuesto máximo. Con esas tres variables, el abanico se reduce rápido y evitas pagar por funciones que no usarás.`, `Un error habitual es contratar el plan más largo sin haber probado el servicio. Empieza con un plan corto y pasa al anual cuando estés seguro de que cumple.`, `Fíjate en la transparencia del proveedor: precios claros, condiciones por escrito y un canal de contacto real. Si algo falla después de pagar, ese contacto marca la diferencia.`],
    deportes: [`Los eventos deportivos concentran el mayor número de conexiones. Haz una prueba de calidad un día de partido, no un martes por la mañana, para comprobar el rendimiento real.`, `Si sigues varias competiciones, organiza tu lista de favoritos por deporte. Ahorrarás tiempo y evitarás perder minutos buscando el canal.`, `La calidad de imagen en deporte exige más ancho de banda. Reserva la conexión para la televisión durante el evento y deja las descargas para otro momento.`],
    apps: [`Cada aplicación gestiona la guía de programación y la lista de canales de forma distinta. Si una no te convence, prueba otra: tus datos de acceso son los mismos.`, `Mantén la aplicación actualizada. Muchos problemas de carga se resuelven con la última versión desde la tienda de aplicaciones de tu dispositivo.`, `Si usas varios dispositivos, instala la misma aplicación en todos para que tu lista de favoritos y tu experiencia sean coherentes.`],
    listas: [`No todas las listas son iguales: hay diferencias importantes en estabilidad, actualización y soporte. Prefiere servicios que respondan cuando algo falla.`, `Una lista es solo el índice de canales; lo que marca la calidad es la infraestructura que hay detrás. Empieza con un plan corto y valora la estabilidad en horas punta.`, `Revisa siempre la procedencia de los contenidos y respeta la normativa de propiedad intelectual. Un servicio fiable informa con claridad de lo que ofrece.`],
    general: [`Si estás empezando, lo más práctico es probar el servicio con calma durante un día completo, a distintas horas, y apuntar cualquier incidencia.`, `La televisión por internet no necesita instalaciones: solo una conexión estable y una aplicación. La curva de aprendizaje es corta incluso para quien nunca ha usado una.`, `Compara por funciones y soporte, no solo por precio. A medio plazo, un servicio estable y bien atendido sale más barato que uno económico y problemático.`],
  };
  const CLS = { '1': 'comprar', '2': 'deportes', '3': 'apps', '4': 'listas', '5': 'general' };
  pages.filter(p => p.file.startsWith('guias/') && !p.file.endsWith('index.html')).forEach(p => {
    const kwRow = ctx.guides.find(r => p.file === `guias/${slug(r.keyword)}-suscripcion-iptv.html`); if (!kwRow) return; const cl = CLS[kwRow.cluster[0]] || 'general';
    const two = pickN(GX[cl], 2, kwRow.keyword, 'gx');
    ins(p, sec(`<h2>Consejos prácticos sobre «${kwRow.keyword}» y tu ${K}</h2>${two.map(x => `<p>${x}</p>`).join('')}`));
  });
};
