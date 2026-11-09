// Auditoría de enlaces internos: profundidad de clic desde la home y enlaces entrantes por página.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', 'site');
const pages = {}; (function w(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const f = path.join(d, e.name); if (e.isDirectory()) { if (e.name !== 'assets') w(f); } else if (e.name.endsWith('.html')) pages[path.relative(root, f).split(path.sep).join('/')] = fs.readFileSync(f, 'utf8'); }); })(root);
const out = {}, inb = {}; for (const [f, h] of Object.entries(pages)) { out[f] = new Set(); for (const m of h.matchAll(/<a [^>]*href="?([^"\s>#]+)/g)) { const t = m[1]; if (/^(https?:|mailto:|tel:)/.test(t)) continue; const r = path.posix.normalize(path.posix.join(path.posix.dirname(f), t)); if (pages[r] && r !== f) { out[f].add(r); inb[r] = (inb[r] || 0) + 1; } } }
const depth = { 'index.html': 0 }, q = ['index.html']; while (q.length) { const c = q.shift(); for (const n of out[c]) if (!(n in depth)) { depth[n] = depth[c] + 1; q.push(n); } }
const dist = {}; Object.values(depth).forEach(d => dist[d] = (dist[d] || 0) + 1);
const unreachable = Object.keys(pages).filter(p => !(p in depth));
const counts = Object.keys(pages).map(p => inb[p] || 0).sort((a, b) => a - b);
const byType = {}; for (const p of Object.keys(pages)) { const t = p.includes('/') ? p.split('/')[0] : 'core'; (byType[t] ||= []).push(inb[p] || 0); }
console.log('Páginas:', Object.keys(pages).length, '| alcanzables desde home:', Object.keys(depth).length, '| inalcanzables:', unreachable.length);
console.log('Profundidad de clic (nº de páginas por nivel):', JSON.stringify(dist));
console.log('Enlaces entrantes por página -> mín', counts[0], '| mediana', counts[Math.floor(counts.length / 2)], '| máx', counts[counts.length - 1]);
console.log('Enlaces salientes internos medios:', (Object.values(out).reduce((a, s) => a + s.size, 0) / Object.keys(pages).length).toFixed(1));
for (const [t, a] of Object.entries(byType)) { a.sort((x, y) => x - y); console.log(' ', t.padEnd(14), 'págs', String(a.length).padStart(3), '| entrantes mín', String(a[0]).padStart(3), 'mediana', String(a[Math.floor(a.length / 2)]).padStart(3)); }
console.log('Páginas con <3 enlaces entrantes:', Object.keys(pages).filter(p => (inb[p] || 0) < 3).length);
