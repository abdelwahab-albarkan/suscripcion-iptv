# Plan SEO · Suscripción IPTV

Qué está hecho en el código y qué falta hacer fuera del código (backlinks, contenido real).
Reconstruir todo: `npm run build:all` (o `node src/build-all.js`).

## 1. Estructura del sitio (hecho)
- **Silos por tema**: `/ciudades/`, `/equipos/`, `/canales/`, `/competiciones/`, `/dispositivos/`, `/guias/`, `/blog/` + páginas núcleo en la raíz.
- **Jerarquía geográfica real**: Inicio › Ciudades › Comunidad › Provincia › Ciudad (17 comunidades, 50 provincias, 499 ciudades).
- **Migas de pan visibles** en las 1.100 páginas, con el mismo recorrido en el schema `BreadcrumbList`.
- **Profundidad de clic**: todas las páginas a ≤ 3 clics desde la home (1 en nivel 0, 21 en nivel 1, 1.011 en nivel 2, 67 en nivel 3). 0 páginas huérfanas.
- **Sitemaps**: `sitemap.xml` es un índice con 10 sitemaps (uno por sección) y `lastmod`.
- URLs limpias con la palabra clave: `/ciudades/suscripcion-iptv-sevilla.html`, `/blog/…-suscripcion-iptv.html`.
- Auditoría: `node src/linkaudit.js`.

## 2. Enlaces internos (hecho)
- Cada ciudad enlaza a: ciudades cercanas (misma provincia), provincia, comunidad, club local, 3 guías del blog.
- Cada guía de dispositivo enlaza a: apps alternativas, la misma app en otros dispositivos, 2 guías del blog.
- Equipos → guías de partido y red; canales → EPG y favoritos; blog → 4 guías relacionadas + hub.
- Home → sección «Guías» (6 artículos), grid de dispositivos, footer con todos los hubs.
- Media: **27 enlaces internos salientes por página**; mediana de entrantes: 9. Solo 14 páginas con < 3 entrantes.
- Regla a mantener: al publicar una página nueva, enlázala desde **su hub** y desde **2–3 páginas relacionadas**.

## 3. Schema (hecho)
Un único `@graph` JSON-LD por página:
| Tipo de página | Nodos |
|---|---|
| Todas | Organization (con `contactPoint`: WhatsApp + email), WebSite, WebPage, BreadcrumbList |
| Home / Precios | Product + AggregateOffer (USD, 12 ofertas en Precios) |
| Ciudades | Service con `areaServed` (ciudad › provincia) |
| Blog / Guías / Dispositivos | Article (autor = organización, fechas, imagen) |
| Páginas con FAQ visible | FAQPage (se genera leyendo el FAQ que ve el usuario) |
| Hubs / Comunidades / Provincias | CollectionPage + ItemList |

**Importante**: se eliminaron `aggregateRating` y las 2 reseñas (Carlos M., Laura G.) que había en el schema: eran inventadas y el marcado de reseñas falsas puede provocar una **acción manual de Google**. También se corrigió `priceCurrency` (era EUR y los precios visibles son USD).
Cuando tengas **reseñas reales** (de clientes que existen y pueden verificarse), añádelas con su fecha y fuente.
Valida muestras en <https://validator.schema.org> y en la «Prueba de resultados enriquecidos» de Google.

## 4. Backlinks (pendiente: se hace fuera del código)
Los backlinks no se pueden «programar»; hay que ganarlos. Plan realista y seguro:

**Activos que atraen enlaces (ya existen o son fáciles de crear)**
1. Glosario de televisión por internet (`/blog/glosario-iptv-…`) y guías de red (velocidad, wifi, DNS): material de referencia.
2. Páginas de cobertura por ciudad y guías de instalación por dispositivo (útiles para foros y tutoriales).
3. Siguientes activos recomendados: **calculadora de ancho de banda** (nº de pantallas × calidad), **PDF «Checklist antes de contratar»** y un **informe propio** con datos (p. ej. «velocidad que necesitas por tipo de hogar»).

**Dónde conseguir enlaces**
- Artículos de invitado en blogs de tecnología, Smart TV, Android TV/Fire TV y hogar digital (en español).
- Respuestas útiles (con tu guía como fuente) en foros y comunidades de Smart TV y fibra, siempre sin spam.
- Directorios y listados de calidad del sector; perfiles de marca (YouTube, X, Facebook, LinkedIn) y luego añadir `sameAs` al schema de Organization.
- Relaciones públicas digitales: notas con datos propios o explicaciones sobre legalidad y uso responsable.
- Colaboraciones con creadores de tutoriales de dispositivos.

**Reglas**
- Ritmo: 5–15 enlaces de calidad al mes. Nada de PBN, paquetes de enlaces comprados, comentarios masivos ni intercambios masivos.
- Reparto de anclas: ~40 % marca/URL, ~25 % parciales («suscripción IPTV en España»), ~15 % genéricas, ≤ 10 % exacta («suscripción IPTV»), resto cola larga.
- Enlaza hacia **guías útiles y la home**, no solo hacia Precios.
- Seguimiento: Google Search Console (Enlaces) cada semana; desautoriza solo enlaces claramente tóxicos.
- Nicho sensible: Google trata con dureza los sitios de IPTV ilegal. Mantén el aviso legal, evita prometer canales de pago concretos y usa solo fuentes de enlaces de reputación.

## 5. Contenido (parcialmente hecho)
- Hecho: 1.100 páginas, palabra clave en title/H1/H2/H3, densidad 2–4 %, 100 artículos únicos (similitud entre ellos 8 %), autoría y fecha visibles en blog y guías.
- Pendiente de mayor impacto:
  1. **Ampliar los 100 artículos de ~320 a 700–900 palabras** con ejemplos y capturas reales.
  2. **Páginas legales propias**: Aviso legal, Privacidad, Cookies, «Sobre nosotros» (hoy el aviso legal está dentro de Contacto). Aportan confianza (E-E-A-T) y son obligatorias.
  3. **Reseñas reales** (formulario + moderación) y página «Casos / testimonios» con clientes verificables.
  4. Revisar a mano las páginas de ciudades más importantes (Madrid, Barcelona, Valencia, Sevilla, Zaragoza…) y añadirles datos locales reales.
  5. Calendario: 2–4 artículos nuevos al mes; actualiza `C.date` en `src/build.js` solo cuando cambies realmente el contenido.
- Publica por oleadas (50–100 páginas/semana) y vigila la indexación en Search Console antes de añadir más.

## 6. Rendimiento (hecho)
Ver el resumen en el informe final: fuentes propias, CSS purgado y minificado, JS minificado, imagen LCP precargada, cabeceras de caché (`site/_headers` para Netlify/Cloudflare Pages).
