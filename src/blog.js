// Artículos editoriales únicos: node src/build.js && node src/pseo.js && node src/blog.js
const fs = require('fs'), path = require('path');
const B = require('./build.js');
const IM = require('./imgs.js');
const { C, K, KC, OUT, faq, cta, band, render } = B;
const CATS = [['a1', 'Red y rendimiento'], ['a2', 'Uso y configuración'], ['a3', 'Compra, seguridad y legalidad'], ['a4', 'Deporte, dispositivos y aplicaciones']];
const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const pick = (a, s) => a[hash(s) % a.length];
const has = (s) => /suscripción iptv/i.test(s);
const cut = (s, n) => s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, '');

const all = [];
CATS.forEach(([f, name]) => { const p = path.join(__dirname, 'articles', f + '.js'); if (fs.existsSync(p)) require(p).forEach(a => all.push({ cat: name, slug: a[0], h1: a[1], desc: a[2], intro: a[3], secs: a[4], faqs: a[5] })); });
const url = (a) => `blog/${a.slug}-suscripcion-iptv.html`;

const OUTRO = [
  (a) => `Resumiendo: una ${K} funciona mejor cuando cuidas la red, el dispositivo y la aplicación a la vez. Aplica estos consejos de uno en uno y comprueba el resultado antes de pasar al siguiente. Si tu ${K} sigue dando problemas, escríbenos y lo revisamos contigo.`,
  (a) => `Con lo visto, ya puedes decidir con criterio. Recuerda que la mejor ${K} es la que se adapta a tu conexión, a tus dispositivos y a tus hábitos. Prueba, mide y ajusta; y si necesitas ayuda con tu ${K}, nuestro soporte te acompaña.`,
  (a) => `No existe una solución única: cada hogar es distinto. Empieza por lo más sencillo, anota qué cambia y conserva lo que funcione. Una ${K} bien configurada se nota en el día a día, y el soporte te ayuda si algo no va bien.`,
];
const SFX = [' con tu suscripción IPTV', ' en una suscripción IPTV', ' para tu suscripción IPTV'];

const trimTail = (t) => { let x = t.replace(/[,:;\s]+$/, ''), n = 0; while (n++ < 8 && /\s(el|la|los|las|de|del|y|o|por|que|qué|cómo|cuál|cuándo|dónde|es|si|al|no|su|sus|mi|más|entre|sobre|sin|en|un|una|a|con|para|tu|se)$/i.test(x)) x = x.replace(/\s\S+$/, '').replace(/[,:;\s]+$/, ''); return x; };
const pages = all.map((a, i) => {
  const h1 = has(a.h1) ? a.h1 : `${a.h1}: guía de ${K}`;
  let title = has(a.h1) ? a.h1 : `${KC}: ${a.h1}`; if (title.length > 62) { const left = title.split(/[:|]/)[0]; title = has(left) && left.length > 25 ? left : cut(title, 62); if (!has(title) || title.length > 65) title = `${KC}: ${trimTail(cut(a.h1, 40))}`; }
  title = trimTail(title);
  const desc = has(a.desc) ? cut(a.desc, 158) : cut(a.desc, 118) + ` Guía de ${K}.`;
  const secs = a.secs.map(([h2, html], j) => [has(h2) ? h2 : h2 + pick(SFX, a.slug + j), html]);
  const plainLen = (a.intro + a.secs.map(x => x[1]).join('')).replace(/<[^>]+>/g, '').split(/s+/).length; const short = plainLen < 250;
  const rel = [1, 2, 3, 4].map(n => all[(i + n * 7) % all.length]).filter(x => x !== a);
  const faqs = a.faqs;
  const body = `<section><div class="wrap"><article class="prose">
<p><strong>${a.intro}</strong></p>
${secs.map(([h2, html]) => `<h2>${h2}</h2>${html}`).join('\n')}
<h2>Conclusión: tu ${K} bajo control</h2><p>${pick(OUTRO, a.slug)(a)}</p>
<h2>Preguntas frecuentes${short ? '' : ' sobre ' + K}</h2>${faqs.map(f => faq(f[0], f[1])).join('')}
<h3>Más guías relacionadas</h3><ul>${rel.map(r => `<li><a href="@/${url(r)}">${r.h1}</a></li>`).join('')}</ul>
<p><a href="@/blog/index.html">← Todas las guías</a> · <a href="@/suscripcion-iptv-precios.html">Ver planes y precios</a></p>
</article></div></section>
${band(`Contrata tu ${K} hoy`, 'Elige tu plan: activación inmediata y soporte en español.', cta('Ver planes y precios'))}`;
  return { file: url(a), title, desc, h1, crumb: cut(a.h1, 48), lead: a.desc, body, faqs, img: { id: IM.forBlog(a.slug, CATS.findIndex(c => c[1] === a.cat)), alt: h1 } };
});

// hub
const hub = { img: { id: 'theater', alt: `Blog de ${K}: guías y consejos` }, file: 'blog/index.html', title: `Blog de ${K}: guías y consejos`, desc: `Guías prácticas sobre ${K}: red, configuración, seguridad, deporte y dispositivos. ${all.length} artículos con consejos claros.`, h1: `Blog de ${K}: guías y consejos prácticos`, crumb: 'Blog', lead: `Guías para sacar el máximo partido a tu ${K}: red, configuración, compra segura, deporte y dispositivos.`,
  body: `<section><div class="wrap"><article class="prose">${CATS.map(([f, name]) => { const list = all.filter(a => a.cat === name); return list.length ? `<h2>${name}: ${K}</h2><ul>${list.map(a => `<li><a href="@/${url(a)}">${a.h1}</a></li>`).join('')}</ul>` : ''; }).join('')}</article></div></section>${band(`Elige tu ${K}`, 'Sin permanencia y con soporte en español.', cta())}` };
pages.push(hub);

const fix = (html) => html.replace(/(href|src)="(?!https?:|mailto:|data:|#|@\/|\.\.\/)([^"]+)"/g, '$1="../$2"').replace(/@\//g, '../');
pages.forEach(p => { const f = path.join(OUT, p.file); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, fix(render(p))); });

const files = []; (function walk(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) files.push(path.relative(OUT, f).split(path.sep).join('/')); }); })(OUT);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${files.map(f => `<url><loc>${C.domain}/${f}</loc><lastmod>2026-03-01</lastmod><changefreq>weekly</changefreq><priority>${f === 'index.html' ? '1.0' : f.includes('/') ? (f.endsWith('index.html') ? '0.7' : '0.5') : '0.8'}</priority></url>`).join('\n')}\n</urlset>`);
console.log('Artículos:', all.length, '| páginas blog:', pages.length, '| total sitio:', files.length);
