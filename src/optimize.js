// Optimización final del /site: purga + minifica CSS/JS, minifica HTML, hash de ficheros y cabeceras de caché.
// Uso: node src/optimize.js
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const root = path.join(__dirname, '..');
const esbuild = require(path.join(root, 'node_modules', 'esbuild'));
const { PurgeCSS } = require(path.join(root, 'node_modules', 'purgecss'));
const { minify } = require(path.join(root, 'node_modules', 'html-minifier-terser'));
const OUT = path.join(root, 'site'), A = path.join(OUT, 'assets');

const htmlFiles = []; (function walk(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) htmlFiles.push(f); }); })(OUT);
// En Windows/OneDrive un fichero puede estar bloqueado un instante: reintentar
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const retry = async (fn) => { for (let i = 0; ; i++) { try { return await fn(); } catch (e) { if (i >= 5) throw e; await sleep(150 * (i + 1)); } } };
const size = (f) => fs.statSync(f).size;
const dirSize = (d) => { let t = 0; (function w(x) { fs.readdirSync(x, { withFileTypes: true }).forEach(e => { const f = path.join(x, e.name); e.isDirectory() ? w(f) : t += size(f); }); })(d); return t; };
const kb = (n) => (n / 1024).toFixed(1) + ' KB';

(async () => {
  const before = { total: dirSize(OUT), html: htmlFiles.reduce((a, f) => a + size(f), 0), css: size(path.join(A, 'style.css')), js: size(path.join(A, 'app.js')) };

  // 1) CSS: purgar lo no usado + minificar
  const css = fs.readFileSync(path.join(A, 'style.css'), 'utf8');
  const purged = await new PurgeCSS().purge({
    content: [...htmlFiles, { raw: '<html data-theme="light"><html data-theme="dark"> rv in open on hot', extension: 'html' }, path.join(A, 'app.js')],
    css: [{ raw: css }], fontFace: true, keyframes: true, variables: true,
    safelist: { standard: ['rv', 'in', 'open', 'on', 'hot', 'g-big', 'prod', 'inline', 'sm'], greedy: [/data-theme/] },
  });
  // (se analizan TODAS las páginas; las clases dinámicas van en safelist)
  let outCss = purged[0].css;
  if (!/data-theme="light"/.test(outCss)) { outCss = css; console.log('! Purga omitida (se perdían selectores de tema)'); }
  const minCss = esbuild.transformSync(outCss, { loader: 'css', minify: true }).code;
  const minJs = esbuild.transformSync(fs.readFileSync(path.join(A, 'app.js'), 'utf8'), { loader: 'js', minify: true, target: 'es2018' }).code;
  const hc = crypto.createHash('md5').update(minCss).digest('hex').slice(0, 8), hj = crypto.createHash('md5').update(minJs).digest('hex').slice(0, 8);
  const cssName = `s.${hc}.css`, jsName = `a.${hj}.js`;
  fs.writeFileSync(path.join(A, cssName), minCss); fs.writeFileSync(path.join(A, jsName), minJs);
  fs.rmSync(path.join(A, 'style.css')); fs.rmSync(path.join(A, 'app.js'));

  // 2) HTML: referencias con hash + minificación
  let htmlAfter = 0;
  const opts = { collapseWhitespace: true, conservativeCollapse: true, removeComments: true, processScripts: ['application/ld+json'], minifyCSS: false, minifyJS: false, decodeEntities: false };
  for (let i = 0; i < htmlFiles.length; i += 40) {
    await Promise.all(htmlFiles.slice(i, i + 40).map(async f => {
      let h = (await retry(() => fs.readFileSync(f, 'utf8'))).replace(/assets\/style\.css/g, `assets/${cssName}`).replace(/assets\/app\.js/g, `assets/${jsName}`);
      h = await minify(h, opts); htmlAfter += Buffer.byteLength(h); await retry(() => fs.writeFileSync(f, h));
    }));
  }

  // 3) Cabeceras de caché (Netlify / Cloudflare Pages)
  if (!fs.existsSync(path.join(__dirname, 'static', '_headers'))) fs.writeFileSync(path.join(OUT, '_headers'), `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n/assets/img/*\n  Cache-Control: public, max-age=2592000\n/assets/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n/assets/*.css\n  Cache-Control: public, max-age=31536000, immutable\n/assets/*.js\n  Cache-Control: public, max-age=31536000, immutable\n/*.html\n  Cache-Control: public, max-age=0, must-revalidate\n`);

  // 4) Ficheros de despliegue: clave IndexNow, CNAME (dominio propio) y .nojekyll (GitHub Pages)
  try {
    const key = (fs.readFileSync(path.join(__dirname, 'indexnow.js'), 'utf8').match(/INDEXNOW_KEY = '([^']+)'/) || [])[1];
    if (key) fs.writeFileSync(path.join(OUT, key + '.txt'), key);
    const host = new URL(require(path.join(__dirname, 'build.js')).C.domain).hostname;
    fs.writeFileSync(path.join(OUT, 'CNAME'), host + '\n'); fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
  } catch (e) { console.log('! No se pudieron escribir los ficheros de despliegue:', e.message); }

  const gz = (f) => require('zlib').gzipSync(fs.readFileSync(f), { level: 9 }).length;
  console.log(`CSS  ${kb(before.css)} -> ${kb(size(path.join(A, cssName)))} (gzip ${kb(gz(path.join(A, cssName)))})`);
  console.log(`JS   ${kb(before.js)} -> ${kb(size(path.join(A, jsName)))} (gzip ${kb(gz(path.join(A, jsName)))})`);
  console.log(`HTML ${(before.html / 1048576).toFixed(1)} MB -> ${(htmlAfter / 1048576).toFixed(1)} MB en ${htmlFiles.length} páginas (media ${kb(htmlAfter / htmlFiles.length)}/página)`);
  console.log(`SITE ${(before.total / 1048576).toFixed(1)} MB -> ${(dirSize(OUT) / 1048576).toFixed(1)} MB`);
})().catch(e => { console.error(e); process.exit(1); });
