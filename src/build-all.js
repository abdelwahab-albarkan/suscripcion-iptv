// Construye TODO el sitio: node src/build-all.js   (--images regenera los WebP desde /images)
const { execFileSync } = require('child_process'), path = require('path'), fs = require('fs');
const run = (f, label) => { console.log('\n🚀', label); execFileSync(process.execPath, [path.join(__dirname, f)], { stdio: 'inherit' }); };
if (process.argv.includes('--images') || !fs.existsSync(path.join(__dirname, 'img-manifest.json'))) run('images.js', '[0] Optimizando imágenes (WebP)…');
run('build.js', '[1/5] Páginas núcleo…');
run('pseo.js', '[2/5] Páginas programáticas (ciudades, equipos, canales, dispositivos, guías)…');
run('blog.js', '[3/5] Blog…');
run('notfound.js', '[3b] Página 404…');
run('seo.js', '[4/5] Sitemaps por sección + índice…');
run('optimize.js', '[5/5] Optimización (CSS/JS/HTML, hash de ficheros)…');
console.log('\n🎉 Sitio completo listo en /site (1.100 páginas). Ejecuta «npm run verify» antes de publicar.');
