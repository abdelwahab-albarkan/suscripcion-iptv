// Genera site/404.html (rutas absolutas, noindex). Vercel/Netlify/Cloudflare lo sirven con estado 404.
const fs = require('fs'), path = require('path');
const { C, K, KC, OUT, render, band, cta } = require('./build.js');
const link = (f, t) => `<a href="@/${f}">${t}</a>`;
const p = {
  file: '404.html', title: `Página no encontrada | ${KC}`, desc: `La página que buscas no existe en ${C.brand}. Descubre nuestra suscripción IPTV, precios, guías y cobertura por ciudades.`,
  h1: `Página no encontrada: vuelve a tu ${K}`, crumb: 'Página no encontrada', lead: `No hemos encontrado esa dirección. Estos enlaces te llevan a lo más útil de nuestra ${K}.`,
  body: `<section><div class="wrap"><article class="prose"><h2>Qué puedes hacer ahora con tu ${K}</h2>
<ul><li>${link('index.html', 'Ir a la página de inicio')}</li><li>${link('suscripcion-iptv-precios.html', 'Ver precios y planes')}</li><li>${link('blog/index.html', 'Leer las guías del blog')}</li><li>${link('ciudades/index.html', 'Buscar tu ciudad')}</li><li>${link('dispositivos/index.html', 'Guías de instalación por dispositivo')}</li><li>${link('contacto-suscripcion-iptv.html', 'Contactar con soporte')}</li></ul></article></div></section>${band(`Tu ${K}, a un clic`, 'Activación inmediata y soporte en español.', cta('Ver planes y precios'))}`,
};
let html = render(p).replace(/@\//g, '/');
html = html.replace(/(href|src)="(?!https?:|mailto:|tel:|data:|#|\/)([^"]+)"/g, '$1="/$2"');
html = html.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex,follow">');
fs.writeFileSync(path.join(OUT, '404.html'), html);
console.log('404.html generado (noindex, rutas absolutas)');
