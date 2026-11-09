const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', 'site'); const kw = 'suscripción iptv';
const txt = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const files = []; (function w(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const f = path.join(d, e.name); e.isDirectory() ? w(f) : e.name.endsWith('.html') && files.push(f); }); })(root);
const rows = [], shingles = {};
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8'); const rel = path.relative(root, f).split(path.sep).join('/'); const type = rel.includes('/') ? rel.split('/')[0] : 'core';
  const main = (h.match(/<main>([\s\S]*?)<\/main>/) || [])[1] || ''; const t = txt(main); const words = t.toLowerCase().split(' ').filter(Boolean);
  const k = (t.toLowerCase().match(new RegExp(kw, 'g')) || []).length; const d = k / words.length * 100;
  const title = (h.match(/<title>(.*?)<\/title>/) || [])[1] || '', desc = (h.match(/name="description" content="(.*?)"/) || [])[1] || '';
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  const hc = (n) => [...main.matchAll(new RegExp(`<${n}[^>]*>([\s\S]*?)</${n}>`, 'g'))].map(m => txt(m[1]));
  rows.push({ rel, type, words: words.length, k, d, T: title.toLowerCase().includes(kw), D: desc.toLowerCase().includes(kw), H1: h1.toLowerCase().includes(kw), h2: hc('h2').filter(x => x.toLowerCase().includes(kw)).length + '/' + hc('h2').length, tl: title.length, dl: desc.length, hub: rel.endsWith('index.html') || rel.startsWith('provincias') || rel.startsWith('comunidades') });
  const sh = new Set(); for (let i = 0; i + 5 <= words.length; i++) sh.add(words.slice(i, i + 5).join(' ')); (shingles[type] ||= []).push([rel, sh]);
}
const by = {}; rows.forEach(r => (by[r.type] ||= []).push(r));
console.log('TIPO'.padEnd(14), 'págs', 'palabras(min/media/max)', 'dens% (min/media/max)', 'fuera2-4%');
let totalOut = 0;
for (const t in by) { const a = by[t], w = a.map(x => x.words), d = a.map(x => x.d); const out = a.filter(x => x.d < 2 || x.d > 4).length; totalOut += out;
  console.log(t.padEnd(14), String(a.length).padStart(4), `${Math.min(...w)}/${Math.round(w.reduce((x, y) => x + y) / w.length)}/${Math.max(...w)}`.padEnd(22), `${Math.min(...d).toFixed(2)}/${(d.reduce((x, y) => x + y) / d.length).toFixed(2)}/${Math.max(...d).toFixed(2)}`.padEnd(22), out); }
console.log('\nTotal páginas:', rows.length, '| fuera de rango 2–4%:', totalOut);
console.log('Sin keyword en title:', rows.filter(r => !r.T).length, '| en desc:', rows.filter(r => !r.D).length, '| en H1:', rows.filter(r => !r.H1).length);
console.log('Title >65 car.:', rows.filter(r => r.tl > 65).length, '| desc >160:', rows.filter(r => r.dl > 160).length);
// similitud (Jaccard de 5-gramas) en 120 pares aleatorios por tipo
console.log('\nSimilitud entre páginas del mismo tipo (Jaccard 5-gramas, 120 pares):');
let seed = 7; const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
for (const t in shingles) { const a = shingles[t]; if (a.length < 5) continue; const js = []; for (let i = 0; i < 120; i++) { const x = a[Math.floor(rnd() * a.length)][1], y = a[Math.floor(rnd() * a.length)][1]; if (x === y) continue; let inter = 0; for (const s of x) if (y.has(s)) inter++; js.push(inter / (x.size + y.size - inter)); }
  console.log(' ', t.padEnd(14), 'media', (js.reduce((p, q) => p + q, 0) / js.length * 100).toFixed(1) + '%', 'máx', (Math.max(...js) * 100).toFixed(1) + '%'); }
fs.writeFileSync(path.join(__dirname, '..', 'qa-report.json'), JSON.stringify(rows.filter(r => r.d < 2 || r.d > 4).map(r => ({ page: r.rel, words: r.words, kw: r.k, density: +r.d.toFixed(2) })), null, 1));
