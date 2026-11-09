// Estructura del sitio: jerarquía de migas de pan (breadcrumbs) y utilidades
const D = require('./data.js');
const { slug } = D;
const HUB = { ciudades: 'Ciudades', equipos: 'Equipos', canales: 'Canales TDT', competiciones: 'Competiciones', dispositivos: 'Dispositivos', guias: 'Guías', blog: 'Blog' };
const cityBySlug = Object.fromEntries(D.CITIES.map(c => [c.slug, c]));
const comFile = (com) => `comunidades/suscripcion-iptv-${slug(com)}.html`;
const provFile = (prov) => `provincias/suscripcion-iptv-provincia-${slug(prov)}.html`;
const provBySlug = Object.fromEntries(Object.keys(D.PROV).map(p => [slug(p), p]));
const comBySlug = Object.fromEntries([...new Set(Object.values(D.PROV))].map(c => [slug(c), c]));
const strip = (s) => String(s || '').replace(/<[^>]+>/g, '');

// [[nombre, archivo], ...] desde Inicio hasta la propia página
function trail(p) {
  const f = p.file, t = [['Inicio', 'index.html']];
  if (f === 'index.html') return t;
  if (!f.includes('/')) { t.push([strip(p.crumb || p.h1), f]); return t; }
  const dir = f.split('/')[0];
  if (f.endsWith('/index.html')) { t.push([HUB[dir] || dir, f]); return t; }
  if (dir === 'ciudades') {
    const c = cityBySlug[f.replace(/^ciudades\/suscripcion-iptv-/, '').replace(/\.html$/, '')];
    t.push(['Ciudades', 'ciudades/index.html']);
    if (c) t.push([c.com, comFile(c.com)], [c.prov, provFile(c.prov)], [c.name, f]); else t.push([strip(p.crumb), f]);
    return t;
  }
  if (dir === 'provincias') {
    const prov = provBySlug[f.replace(/^provincias\/suscripcion-iptv-provincia-/, '').replace(/\.html$/, '')];
    t.push(['Ciudades', 'ciudades/index.html']);
    if (prov) t.push([D.PROV[prov], comFile(D.PROV[prov])], [prov, f]); else t.push([strip(p.crumb), f]);
    return t;
  }
  if (dir === 'comunidades') {
    const com = comBySlug[f.replace(/^comunidades\/suscripcion-iptv-/, '').replace(/\.html$/, '')];
    t.push(['Ciudades', 'ciudades/index.html'], [com || strip(p.crumb), f]); return t;
  }
  t.push([HUB[dir] || dir, `${dir}/index.html`], [strip(p.crumb || p.h1), f]);
  return t;
}

// HTML visible de migas de pan (enlaces con marcador "@/")
function crumbsHtml(p) {
  const t = trail(p);
  return `<nav class="crumbs" aria-label="Ruta de navegación">${t.map(([n, f], i) => i === t.length - 1 ? `<span aria-current="page">${n}</span>` : `<a href="@/${f}">${n}</a>`).join(' <i>/</i> ')}</nav>`;
}

module.exports = { trail, crumbsHtml, HUB, cityBySlug, strip };
