// Servidor estático local con gzip (para medir): node src/serve.js [puerto]
const http = require('http'), fs = require('fs'), path = require('path'), zlib = require('zlib');
const root = path.resolve(__dirname, '..', 'site'), port = +process.argv[2] || 4190;
const T = { '.html': 'text/html;charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };
http.createServer((q, r) => {
  let u = decodeURIComponent(q.url.split('?')[0]); if (u.endsWith('/')) u += 'index.html'; const fp = path.join(root, u);
  if (!fp.startsWith(root)) { r.writeHead(403); return r.end(); }
  fs.readFile(fp, (e, d) => {
    if (e) { r.writeHead(404); return r.end('404'); }
    const ext = path.extname(fp), h = { 'Content-Type': T[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public,max-age=31536000,immutable' };
    if (/\.(html|css|js|xml|txt|json)$/.test(ext) && /gzip/.test(q.headers['accept-encoding'] || '')) { h['Content-Encoding'] = 'gzip'; r.writeHead(200, h); return r.end(zlib.gzipSync(d, { level: 9 })); }
    r.writeHead(200, h); r.end(d);
  });
}).listen(port, () => console.log('serving', root, 'on', port));
