// Sitemaps por secciones + índice (se ejecuta después de build/pseo/blog).
const fs = require('fs'), path = require('path');
const { C, OUT } = require('./build.js');
const files = [];
(function walk(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const f = path.join(d, e.name); if (e.isDirectory()) { if (e.name !== 'assets') walk(f); } else if (e.name.endsWith('.html') && e.name !== '404.html') files.push(path.relative(OUT, f).split(path.sep).join('/')); }); })(OUT);
const groups = {};
files.sort().forEach(f => { const g = f.includes('/') ? f.split('/')[0] : 'paginas'; (groups[g] ||= []).push(f); });
const urlset = (list) => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${list.map(f => `<url><loc>${C.domain}/${f}</loc><lastmod>${C.date}</lastmod><priority>${f === 'index.html' ? '1.0' : f.endsWith('/index.html') ? '0.8' : f.includes('/') ? '0.5' : '0.8'}</priority></url>`).join('\n')}\n</urlset>`;
// limpiar sitemaps antiguos
fs.readdirSync(OUT).filter(f => /^sitemap.*\.xml$/.test(f)).forEach(f => fs.rmSync(path.join(OUT, f)));
const names = [];
for (const [g, list] of Object.entries(groups)) { const n = `sitemap-${g}.xml`; fs.writeFileSync(path.join(OUT, n), urlset(list)); names.push(n); }
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${names.map(n => `<sitemap><loc>${C.domain}/${n}</loc><lastmod>${C.date}</lastmod></sitemap>`).join('\n')}\n</sitemapindex>`);
console.log('SEO: sitemap índice con', names.length, 'sitemaps y', files.length, 'URLs');
