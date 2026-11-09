const http = require('http');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const cliPort = args.find(a => /^\d+$/.test(a));
const PORT = parseInt(process.env.PORT || cliPort || '3018', 10);
const HOST = process.env.HOST || '0.0.0.0';
const STATIC_DIR = path.join(__dirname, 'site');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // Security check: prevent directory traversal
    let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    if (safePath.startsWith(path.sep) || safePath.startsWith('/')) {
      safePath = safePath.slice(1);
    }

    let filePath = path.join(STATIC_DIR, safePath);

    fs.stat(filePath, (err, stats) => {
      if (!err && stats.isDirectory()) {
        const indexPath = path.join(filePath, 'index.html');
        if (fs.existsSync(indexPath)) {
          serveFile(indexPath, res);
          return;
        }
      }

      if (!err && stats.isFile()) {
        serveFile(filePath, res);
        return;
      }

      // If file not found directly, try appending .html if no extension
      if (!path.extname(filePath)) {
        const htmlPath = filePath + '.html';
        if (fs.existsSync(htmlPath)) {
          serveFile(htmlPath, res);
          return;
        }
      }

      // 404 Not Found
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 Not Found</h1><p>The requested file was not found.</p>');
    });
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`\n🚀 Server running at: http://localhost:${PORT}/`);
  console.log(`📁 Serving directory: ${STATIC_DIR}`);
  console.log(`Press Ctrl+C to stop.\n`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
