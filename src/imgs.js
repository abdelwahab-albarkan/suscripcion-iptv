// Helpers de imágenes (leen src/img-manifest.json generado por src/images.js)
const fs = require('fs'), path = require('path');
const MF = path.join(__dirname, 'img-manifest.json');
const M = fs.existsSync(MF) ? JSON.parse(fs.readFileSync(MF, 'utf8')) : {};
const K = 'suscripción IPTV';
const esc = (s) => String(s).replace(/<[^>]+>/g, '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const pick = (arr, seed) => arr[hash(seed) % arr.length];
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Rutas con marcador "@/" (build.js / pseo.js lo convierten en relativa según la profundidad)
function img(id, alt, o = {}) {
  const m = M[id]; if (!m) return '';
  const ws = Object.keys(m.f).map(Number).sort((a, b) => a - b);
  const big = m.f[ws[ws.length - 1]];
  const srcset = ws.length > 1 ? ` srcset="${ws.map(w => `@/assets/img/${m.f[w]} ${w}w`).join(', ')}" sizes="${o.sizes || '(max-width:900px) 100vw, 560px'}"` : '';
  return `<img src="@/assets/img/${big}"${srcset} width="${m.w}" height="${m.h}" alt="${esc(alt)}"${o.eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${o.cls ? ` class="${o.cls}"` : ''}>`;
}

// <link rel="preload"> de la imagen principal (mejora el LCP)
function preload(id, sizes) {
  const m = M[id]; if (!m) return '';
  const ws = Object.keys(m.f).map(Number).sort((a, b) => a - b), big = m.f[ws[ws.length - 1]];
  return `<link rel="preload" as="image" href="@/assets/img/${big}"${ws.length > 1 ? ` imagesrcset="${ws.map(w => `@/assets/img/${m.f[w]} ${w}w`).join(', ')}" imagesizes="${sizes}"` : ''} fetchpriority="high">`;
}

// ---- dispositivos -> producto
const DEVICE_IMG = {
  'samsung-smart-tv': 'p-samsung', 'lg-smart-tv': 'p-lg', 'android-tv': 'p-androidtv', 'google-tv': 'chromecast', 'amazon-fire-tv-stick': 'p-firestick',
  'xiaomi-tv-stick': 'p-xiaomi', 'nvidia-shield-tv': 'p-shield', 'sony-bravia': 'p-sony', 'tcl-tv': 'p-tcl', 'philips-tv': 'epg-light',
  'apple-tv': 'p-appletv', 'iphone': 'p-iphone', 'ipad': 'p-ipad', 'movil-android': 'p-androidphones', 'tablet-android': 'p-firetablet',
  'windows-pc': 'p-windows', 'mac': 'p-mac',
};
const POOLS = {
  city: ['room-warm', 'theater', 'family', 'blue-room', 'smarters-ui', 'oled-sports', 'epg-light', 'google-dash'],
  hub: ['room-warm', 'theater', 'family', 'blue-room'],
  sports: ['oled-sports', 'epg-light', 'smarters-ui', 'epg-tivimate'],
  epg: ['epg-tivimate', 'epg-light', 'smarters-ui', 'remote-hand'],
  buy: ['devices-collection', 'theater', 'room-warm', 'remote-hand'],
  tech: ['devices-collection', 'chromecast', 'remote-hand', 'google-dash'],
  net: ['router', 'ethernet', 'blue-room'],
  secure: ['shield1', 'shield2', 'vpn'],
  setup: ['green-android', 'green-fire', 'green-samsung', 'laptop'],
};
const CORE = {
  'suscripcion-iptv-precios.html': ['theater', 'remote'], 'suscripcion-iptv-canales.html': ['epg-tivimate'], 'suscripcion-iptv-futbol.html': ['oled-sports'],
  'suscripcion-iptv-dispositivos.html': ['devices-collection'], 'como-contratar-suscripcion-iptv.html': ['chromecast'],
  'mejor-suscripcion-iptv-guia.html': ['room-warm'], 'preguntas-frecuentes-suscripcion-iptv.html': ['shield2'], 'contacto-suscripcion-iptv.html': ['family'],
};
const text = (s) => String(s || '').replace(/<[^>]+>/g, '');

function forBlog(slugName, catIdx) {
  const s = slugName;
  let pool;
  if (/senior|mayores/.test(s)) pool = ['family'];
  else if (/wifi|router|dns|ping|qos|repetid|5ghz|cable|fibra|velocidad|datos|buffering|latencia|punta|firmware|hdmi|red-|ancho|bitrate|pantallas-a-la-vez|reiniciar/.test(s)) pool = POOLS.net;
  else if (/estafa|pago|privacidad|contrasena|phishing|vpn|legal|derechos|bares|garantia|factura|renovacion|proveedor|permisos|apk|seguro|soporte/.test(s)) pool = POOLS.secure;
  else if (/partido|deporte|champions|f1|ciclismo|tenis|baloncesto|calendario|segunda-pantalla|bar-en-casa/.test(s)) pool = POOLS.sports;
  else if (/epg|favoritos|catch-up|subtitulos|perfiles|control-parental|categorias/.test(s)) pool = POOLS.epg;
  else if (/tv-|box|stick|chromecast|android|tivimate|vlc|kodi|mando|voz|airplay|reproductor|firestick|televisor|ordenador|nas-/.test(s)) pool = POOLS.tech;
  else if (/precio|plan-|cuanto|comparar|ahorrar|contrato|tdt|cable-vs|plataformas|prueba|opiniones|checklist|glosario/.test(s)) pool = POOLS.buy;
  else pool = [POOLS.hub, POOLS.setup, POOLS.tech, POOLS.epg][catIdx % 4];
  return pick(pool, s);
}

// Devuelve {id, alt, cls} para una página (o null)
function forPage(p) {
  const f = p.file, h1 = text(p.h1);
  if (CORE[f]) return { id: CORE[f][0] === 'theater' ? 'theater' : CORE[f][0], alt: h1 };
  const dir = f.split('/')[0];
  if (dir === 'dispositivos' && !f.endsWith('index.html')) {
    const m = f.match(/-en-([a-z0-9-]+)\.html$/); const dv = m && DEVICE_IMG[m[1]];
    if (dv) return { id: dv, alt: h1, cls: M[dv] && M[dv].kind === 'product' ? 'prod' : '' };
  }
  if (dir === 'dispositivos') return { id: 'devices-collection', alt: h1 };
  if (dir === 'ciudades') return { id: pick(POOLS.city, f), alt: h1 };
  if (dir === 'equipos' || dir === 'competiciones') return { id: pick(POOLS.sports, f), alt: h1 };
  if (dir === 'canales') return { id: pick(POOLS.epg, f), alt: h1 };
  if (dir === 'comunidades' || dir === 'provincias') return { id: pick(POOLS.hub, f), alt: h1 };
  if (dir === 'guias') {
    const s = f;
    const pool = /futbol|deporte|liga|partido/.test(s) ? POOLS.sports : /app|player|smarters|tivimate|stream|xtream|extreme|pro/.test(s) ? POOLS.epg : /comprar|subscri|premium|prueba|precio|profesional/.test(s) ? POOLS.buy : POOLS.hub;
    return { id: pick(pool, s), alt: h1 };
  }
  return null;
}

// ---- bloques reutilizables
const PAY = [['pay-visa', 'Visa'], ['pay-mastercard', 'Mastercard'], ['pay-paypal', 'PayPal'], ['pay-applepay', 'Apple Pay'], ['pay-googlepay', 'Google Pay'], ['pay-bitcoin', 'Bitcoin']];
const payStrip = (label = 'Métodos de pago') => `<div class="pay" aria-label="${label}"><span class="pay-l">${label}</span>${PAY.map(([id, n]) => `<span class="pay-i">${img(id, n, { sizes: '96px' })}</span>`).join('')}</div>`;

const DEV_GRID = [['p-samsung', 'Samsung Smart TV'], ['p-lg', 'LG Smart TV'], ['p-androidtv', 'Android TV'], ['p-firestick', 'Fire TV Stick'], ['p-appletv', 'Apple TV'], ['p-xiaomi', 'Xiaomi TV Stick'], ['p-shield', 'Nvidia Shield'], ['p-iphone', 'iPhone y iPad'], ['p-windows', 'Windows PC'], ['p-mac', 'Mac']];
const devGrid = () => `<div class="dev-grid">${DEV_GRID.map(([id, n]) => `<a class="dev" href="@/dispositivos/index.html"><span class="dev-i">${img(id, n + ' compatible con ' + K, { sizes: '(max-width:560px) 40vw, 200px' })}</span><b>${n}</b></a>`).join('')}</div>`;

const GALLERY = [['epg-tivimate', 'Guía de programación (EPG)', 'Parrilla clara con canales, horarios y categorías.'], ['oled-sports', 'Deportes en directo', 'Interfaz pensada para seguir tus competiciones.'], ['smarters-ui', 'Cine, series y canales', 'Todo el contenido en una pantalla.'], ['remote-hand', 'Control total', 'Navega con el mando de tu televisor.']];
const gallery = () => `<div class="gal">${GALLERY.map(([id, t, d], i) => `<figure class="g${i === 0 ? ' g-big' : ''}">${img(id, t + ' en tu ' + K, { sizes: i === 0 ? '(max-width:900px) 100vw, 660px' : '(max-width:900px) 100vw, 330px' })}<figcaption><b>${t}</b><span>${d}</span></figcaption></figure>`).join('')}</div>`;

module.exports = { img, preload, forPage, forBlog, payStrip, devGrid, gallery, M, esc };
