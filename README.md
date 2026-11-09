# Suscripción IPTV 8K · sitio estático (1.100 páginas)

Sitio estático en español generado con Node.js. La salida lista para publicar está en **`site/`**.

## Comandos
```bash
npm install          # instala las herramientas de build (esbuild, purgecss, html-minifier-terser, sharp)
npm run build        # genera TODO el sitio en /site (build + pseo + blog + sitemaps + optimización)
npm run verify       # verificación SEO/técnica de las 1.100 páginas (falla si hay errores)
npm run audit        # informe de densidad de palabra clave
npm run indexnow     # avisa a Bing/Yandex de las URLs (requiere el sitio ya publicado)
npm start            # servidor local: http://localhost:3018
```
`node src/build.js` también construye todo el sitio (delega en `build-all.js`).

## Estructura
| Ruta | Contenido |
|---|---|
| `src/build.js` | Plantilla, páginas núcleo, precios (`C.plans`), contacto (`C.wa`, `C.email`), dominio (`C.domain`) |
| `src/pseo.js` + `src/data.js` | Ciudades, equipos, canales, dispositivos, guías (datos reales) |
| `src/blog.js` + `src/articles/` | 100 artículos únicos |
| `src/schema.js`, `src/structure.js` | JSON-LD y migas de pan |
| `src/seo.js` | Sitemap índice + sitemaps por sección |
| `src/optimize.js` | Minificación, hash de ficheros, `_headers`, `CNAME`, clave IndexNow |
| `src/images.js` | Optimiza `images/` a WebP (`npm run build -- --images` o `node src/build-all.js --images`) |
| `images/` | Imágenes originales (solo se usan para regenerar los WebP) |
| `SEO-PLAN.md` | Plan de estructura, enlaces, schema, backlinks y contenido |

## Publicar
- **Netlify / Cloudflare Pages / Vercel**: comando de build `npm install && npm run build`, directorio de salida `site`.
- **GitHub Pages**: Settings → Pages → Source: *GitHub Actions* y ejecutar manualmente el workflow *Deploy to GitHub Pages* (`.github/workflows/deploy-pages.yml`).
- El archivo `site/CNAME` apunta al dominio configurado en `C.domain`.

## Antes de publicar
1. `npm run build && npm run verify` → debe terminar con «SIN ERRORES».
2. Revisa `C` en `src/build.js` (dominio, WhatsApp, email, marca, precios, fecha `C.date`).
3. Después de publicar: envía `https://TU-DOMINIO/sitemap.xml` en Google Search Console y Bing Webmaster Tools, y ejecuta `npm run indexnow`.
