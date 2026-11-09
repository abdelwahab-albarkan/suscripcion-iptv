const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..', 'site');
const kw = 'suscripción iptv';
const cnt = (s) => (s.toLowerCase().match(new RegExp(kw, 'g')) || []).length;
const txt = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
let bad = 0;
console.log('página'.padEnd(46), 'palabras', 'kw', 'dens%', ' T  D  H1 H2 H3');
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.html'))) {
  const h = fs.readFileSync(path.join(dir, f), 'utf8');
  const main = (h.match(/<main>([\s\S]*?)<\/main>/) || [])[1] || '';
  const t = txt(main), words = t.split(' ').filter(Boolean).length, k = cnt(t);
  const d = (k / words * 100);
  const tag = (n) => [...main.matchAll(new RegExp(`<${n}[^>]*>([\\s\\S]*?)</${n}>`, 'g'))].map(m => txt(m[1]));
  const h2 = tag('h2'), h3 = tag('h3');
  const T = cnt((h.match(/<title>(.*?)<\/title>/) || [])[1] || ''), D = cnt((h.match(/name="description" content="(.*?)"/) || [])[1] || '');
  const H1 = cnt(tag('h1').join(' ')), H2 = h2.filter(x => cnt(x)).length + '/' + h2.length, H3 = h3.filter(x => cnt(x)).length + '/' + h3.length;
  const ok = d >= 2 && d <= 4; if (!ok) bad++;
  console.log(f.padEnd(46), String(words).padStart(7), String(k).padStart(3), d.toFixed(2).padStart(5), ok ? '✓' : '✗', T, D, H1, H2, H3);
}
console.log(bad ? `${bad} páginas fuera de rango` : 'Todas las páginas entre 2% y 4%');
