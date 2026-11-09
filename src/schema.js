// JSON-LD (schema.org) en un único @graph por página.
// Importante: NO se genera AggregateRating ni Review hasta que existan opiniones reales y verificables.
const ST = require('./structure.js');
const strip = (s) => String(s || '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

function faqsFromBody(body) {
  const out = []; const re = /<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g; let m;
  while ((m = re.exec(body))) out.push([strip(m[1]), strip(m[2])]);
  return out;
}
function listFromBody(body, domain, max = 40) {
  const seen = new Set(), items = []; const re = /<a href="@\/([^"#]+\.html)">([\s\S]*?)<\/a>/g; let m;
  while ((m = re.exec(body)) && items.length < max) { if (seen.has(m[1])) continue; seen.add(m[1]); items.push({ '@type': 'ListItem', position: items.length + 1, name: strip(m[2]), url: `${domain}/${m[1]}` }); }
  return items;
}

module.exports = function schema(p, C, IM) {
  const D = C.domain, url = `${D}/${p.file}`, dir = p.file.includes('/') ? p.file.split('/')[0] : '';
  const isIndexHub = p.file.endsWith('/index.html'), isArticle = (dir === 'blog' || dir === 'guias' || dir === 'dispositivos') && !isIndexHub;
  const imgFile = p.img && IM.M[p.img.id] ? (() => { const m = IM.M[p.img.id]; const ws = Object.keys(m.f).map(Number).sort((a, b) => a - b); return `${D}/assets/img/${m.f[ws[ws.length - 1]]}`; })() : null;
  const orgId = `${D}/#org`, webId = `${D}/#web`;
  const org = { '@type': 'Organization', '@id': orgId, name: C.brand, url: D, email: C.email, logo: { '@type': 'ImageObject', url: `${D}/assets/img/devices-collection-720.webp` }, contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', email: C.email, telephone: '+' + C.wa, availableLanguage: ['es'] }] };
  const web = { '@type': 'WebSite', '@id': webId, url: D + '/', name: C.brand, inLanguage: 'es-ES', publisher: { '@id': orgId } };
  const trail = ST.trail(p);
  const bc = { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: trail.map(([name, f], i) => ({ '@type': 'ListItem', position: i + 1, name, item: f === 'index.html' ? D + '/' : `${D}/${f}` })) };

  const pageType = p.file === 'contacto-suscripcion-iptv.html' ? ['WebPage', 'ContactPage'] : isIndexHub || dir === 'comunidades' || dir === 'provincias' ? 'CollectionPage' : 'WebPage';
  const page = { '@type': pageType, '@id': `${url}#page`, url, name: strip(p.title), description: strip(p.desc), inLanguage: 'es-ES', isPartOf: { '@id': webId }, breadcrumb: { '@id': bc['@id'] } };
  if (imgFile) page.primaryImageOfPage = { '@type': 'ImageObject', url: imgFile };
  const g = [org, web, page, bc];

  if (isArticle) g.push({ '@type': 'Article', '@id': `${url}#article`, mainEntityOfPage: { '@id': `${url}#page` }, headline: strip(p.h1).slice(0, 110), description: strip(p.desc), inLanguage: 'es-ES', ...(imgFile ? { image: [imgFile] } : {}), datePublished: C.date, dateModified: C.date, author: { '@type': 'Organization', name: C.brand, url: D }, publisher: { '@id': orgId } });

  if (dir === 'ciudades' && !isIndexHub) {
    const t = trail, city = t[t.length - 1][0], prov = t[t.length - 2] ? t[t.length - 2][0] : '';
    g.push({ '@type': 'Service', '@id': `${url}#service`, name: strip(p.h1), serviceType: 'Televisión por internet (IPTV)', areaServed: { '@type': 'City', name: city, ...(prov ? { containedInPlace: { '@type': 'AdministrativeArea', name: prov } } : {}) }, provider: { '@id': orgId }, offers: aggregate(C, url) });
  }
  if (p.file === 'index.html' || p.file === 'suscripcion-iptv-precios.html') {
    g.push({ '@type': 'Product', '@id': `${url}#product`, name: 'Suscripción IPTV', description: strip(p.desc), brand: { '@type': 'Brand', name: C.brand }, ...(imgFile ? { image: [imgFile] } : {}), offers: aggregate(C, url, p.file !== 'index.html') });
  }
  const faqs = faqsFromBody(p.body || '');
  if (faqs.length) g.push({ '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  if (isIndexHub || dir === 'comunidades' || dir === 'provincias') {
    const items = listFromBody(p.body || '', D); if (items.length > 2) g.push({ '@type': 'ItemList', '@id': `${url}#list`, itemListElement: items });
  }
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': g })}</script>`;
};

function aggregate(C, url, detailed) {
  const all = C.plans.flatMap(pl => pl.rows.map((v, j) => ({ pl, v, j })));
  const prices = all.map(x => x.v);
  const o = { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: Math.min(...prices).toFixed(2), highPrice: Math.max(...prices).toFixed(2), offerCount: all.length, availability: 'https://schema.org/InStock', url };
  if (detailed) o.offers = all.map(({ pl, v, j }) => ({ '@type': 'Offer', name: `${pl.name} - ${j + 1} ${j ? 'cuentas' : 'cuenta'}`, price: v.toFixed(2), priceCurrency: 'USD', availability: 'https://schema.org/InStock', url }));
  return o;
}
