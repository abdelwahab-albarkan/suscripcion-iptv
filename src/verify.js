// Verificación final del sitio generado: node src/verify.js   (código de salida 1 si hay errores)
const fs = require('fs'), path = require('path');
const { C } = require('./build.js');
const root = path.join(__dirname, '..', 'site');
const KW = 'suscripción iptv';
const strip = (s) => String(s || '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const has = (s) => strip(s).toLowerCase().includes(KW);
const errors = {}, warn = {};
const bad = (k, f) => { (errors[k] ||= []).push(f); }, wr = (k, f) => { (warn[k] ||= []).push(f); };

const files = []; (function w(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const f = path.join(d, e.name); e.isDirectory() ? w(f) : e.name.endsWith('.html') && e.name !== '404.html' && files.push(f); }); })(root);
const rel = (f) => path.relative(root, f).split(path.sep).join('/');
const titles = {}, descs = {}, h1s = {}, dens = [];
const urlFor = (r) => `${C.domain}/${r}`;

for (const f of files) {
  const r = rel(f), h = fs.readFileSync(f, 'utf8');
  const title = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const desc = (h.match(/<meta name="?description"? content="([^"]*)"/) || [])[1] || '';
  const canon = (h.match(/<link rel="?canonical"? href="([^"]*)"/) || [])[1] || '';
  const main = (h.match(/<main>([\s\S]*?)<\/main>/) || [])[1] || '';
  const hs = (n) => [...main.matchAll(new RegExp('<' + n + '[^>]*>([\\s\\S]*?)</' + n + '>', 'g'))].map(m => m[1]);
  const H1 = hs('h1'), H2 = hs('h2'), H3 = hs('h3');
  // --- palabra clave
  if (!has(title)) bad('Title sin palabra clave', r);
  if (!has(desc)) bad('Meta description sin palabra clave', r);
  if (H1.length !== 1) bad('Nº de H1 distinto de 1', r); else if (!has(H1[0])) bad('H1 sin palabra clave', r);
  if (H2.some(x => !has(x))) bad('H2 sin palabra clave', r);
  if (H3.some(x => !has(x))) bad('H3 sin palabra clave', r);
  const words = strip(main).toLowerCase().split(' ').filter(Boolean);
  if (!words.slice(0, 120).join(' ').includes(KW)) bad('Palabra clave ausente en las primeras 120 palabras', r);
  const k = (strip(main).toLowerCase().match(/suscripción iptv/g) || []).length, d = k / words.length * 100; dens.push(d);
  if (d < 2 || d > 4) bad('Densidad fuera de 2–4 %', `${r} (${d.toFixed(2)} %)`);
  // --- meta
  if (title.length > 65) wr('Title > 65 caracteres', r); if (desc.length > 160 || desc.length < 70) wr('Description fuera de 70–160', r);
  (titles[title] ||= []).push(r); (descs[desc] ||= []).push(r); (h1s[strip(H1[0])] ||= []).push(r);
  if (canon !== urlFor(r)) bad('Canonical incorrecto', r);
  if (!/<html lang="?es/.test(h)) bad('Falta lang="es"', r);
  if (!/name="?viewport"?/.test(h)) bad('Falta viewport', r);
  if (!/<meta charset/.test(h)) bad('Falta charset', r);
  // --- JSON-LD
  const ld = h.match(/<script type="?application\/ld\+json"?>([\s\S]*?)<\/script>/);
  if (!ld) bad('Falta JSON-LD', r); else { try { JSON.parse(ld[1]); if (/AggregateRating|"Review"/.test(ld[1])) bad('Schema con reseñas/valoración', r); } catch (e) { bad('JSON-LD inválido', r); } }
  // --- enlaces, imágenes, restos
  if (/@\//.test(h)) bad('Marcador @/ sin resolver', r);
  if (/tudominio\.com|34600000000|hola@tudominio/.test(h)) bad('Placeholders sin sustituir', r);
  if (/(?:src|href)="http:\/\//.test(h)) wr('Recurso http:// (contenido mixto)', r);
  for (const m of h.matchAll(/(?:href|src)="([^"#]+)(#[^"]*)?"/g)) { const t = m[1]; if (/^(https?:|mailto:|tel:|data:)/.test(t)) continue; if (!fs.existsSync(path.normalize(path.join(path.dirname(f), t)))) bad('Enlace/recurso roto', `${r} -> ${t}`); }
  for (const m of h.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/g)) for (const part of m[1].split(',')) { const t = part.trim().split(' ')[0]; if (t && !fs.existsSync(path.normalize(path.join(path.dirname(f), t)))) bad('Imagen (srcset) rota', `${r} -> ${t}`); }
  for (const m of h.matchAll(/<img [^>]*>/g)) if (!/ alt="[^"]+"/.test(m[0]) || !/ width=/.test(m[0]) || !/ height=/.test(m[0])) bad('Imagen sin alt/width/height', r);
}
for (const [name, map] of [['Title duplicado', titles], ['Meta description duplicada', descs], ['H1 duplicado', h1s]]) for (const [v, list] of Object.entries(map)) if (list.length > 1) bad(name, `${list.length} páginas: ${list.slice(0, 3).join(', ')}…`);

// --- sitemap
const sm = (n) => fs.existsSync(path.join(root, n)) ? fs.readFileSync(path.join(root, n), 'utf8') : null;
const index = sm('sitemap.xml'); const inSitemap = new Set(); let smFiles = 0;
if (!index) bad('Falta sitemap.xml', '-'); else {
  if (!/<sitemapindex/.test(index)) bad('sitemap.xml no es un índice', '-');
  for (const m of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const n = m[1].replace(C.domain + '/', ''); const x = sm(n); smFiles++;
    if (!m[1].startsWith(C.domain + '/')) bad('Sitemap con dominio distinto', m[1]);
    if (!x) { bad('Sitemap referenciado inexistente', n); continue; }
    if (!/^<\?xml/.test(x) || !/<urlset[^>]*>[\s\S]*<\/urlset>\s*$/.test(x)) bad('Sitemap XML mal formado', n);
    const locs = [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map(a => a[1]); if (locs.length > 50000) bad('Sitemap > 50.000 URLs', n);
    if (/&(?!amp;|lt;|gt;|quot;|apos;)/.test(x)) bad('Sitemap con & sin escapar', n);
    locs.forEach(u => { if (inSitemap.has(u)) bad('URL duplicada en sitemaps', u); inSitemap.add(u); });
  }
  for (const u of inSitemap) { const f = u.replace(C.domain + '/', ''); if (!files.map(rel).includes(f)) bad('URL del sitemap sin archivo', u); }
  for (const f of files.map(rel)) if (!inSitemap.has(urlFor(f))) bad('Página fuera del sitemap', f);
}
const robots = sm('robots.txt') || ''; if (!robots.includes(`Sitemap: ${C.domain}/sitemap.xml`)) bad('robots.txt sin línea Sitemap correcta', '-');
if (/Disallow:\s*\/\s*$/m.test(robots)) bad('robots.txt bloquea todo el sitio', '-');


// --- CSS: toda clase usada en el HTML debe existir en la hoja de estilos final
{
  const cssFile = fs.readdirSync(path.join(root, 'assets')).find(f => /^s\..*\.css$/.test(f));
  const css = cssFile ? fs.readFileSync(path.join(root, 'assets', cssFile), 'utf8') : '';
  const used = new Set(); for (const f of files) for (const m of fs.readFileSync(f, 'utf8').matchAll(/class="([^"]+)"/g)) m[1].split(/\s+/).forEach(c => c && used.add(c));
  const dynamic = new Set(['rv', 'in', 'open', 'on', 'tl', 'hero-t']); // clases dinámicas o solo de enganche (sin estilo)
  const missing = [...used].filter(c => !dynamic.has(c) && !css.includes('.' + c));
  if (missing.length) bad('Clases usadas sin estilo en el CSS final', missing.slice(0, 12).join(', ') + (missing.length > 12 ? '…' : ''));
}

// --- datos legales del titular (LSSI-CE art. 10)
{ try { const L = JSON.parse(fs.readFileSync(path.join(__dirname, 'legal.json'), 'utf8')); const miss = ['titular', 'nif', 'domicilio'].filter(k => !String(L[k] || '').trim()); if (miss.length) wr('Aviso legal sin datos del titular (completa src/legal.json)', miss.join(', ')); } catch (e) { wr('No se pudo leer src/legal.json', '-'); } }

// --- informe
const n = files.length, avg = dens.reduce((a, b) => a + b, 0) / n;
console.log(`\nPáginas analizadas: ${n} · dominio: ${C.domain} · sitemaps: ${smFiles} (${inSitemap.size} URLs)`);
console.log(`Densidad de «suscripción IPTV»: mín ${Math.min(...dens).toFixed(2)} % · media ${avg.toFixed(2)} % · máx ${Math.max(...dens).toFixed(2)} %`);
const E = Object.entries(errors), W = Object.entries(warn);
if (!E.length) console.log('\n✅ SIN ERRORES');
else { console.log('\n❌ ERRORES'); E.forEach(([k, l]) => console.log(`  - ${k}: ${l.length}  (p. ej. ${l.slice(0, 2).join(' | ')})`)); }
if (W.length) { console.log('\n⚠ AVISOS'); W.forEach(([k, l]) => console.log(`  - ${k}: ${l.length}  (p. ej. ${l.slice(0, 2).join(' | ')})`)); }
process.exit(E.length ? 1 : 0);
