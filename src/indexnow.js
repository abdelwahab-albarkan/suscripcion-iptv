const fs = require('fs');
const path = require('path');

// CONFIGURATION
const DOMAIN = process.env.SITE_URL ? new URL(process.env.SITE_URL).hostname : 'suscripcioniptv8k.com';
const SITE_URL = `https://${DOMAIN}`;
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_KEY = 'suscripcioniptv8k2026key';
const LOCAL_SITEMAP = path.join(__dirname, '..', 'site', 'sitemap.xml');
const LOCAL_KEY_FILE = path.join(__dirname, '..', 'site', `${INDEXNOW_KEY}.txt`);

/**
 * Ensures the IndexNow verification key file exists in the public directory
 */
function ensureKeyFile() {
  try {
    const dir = path.dirname(LOCAL_KEY_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_KEY_FILE, INDEXNOW_KEY, 'utf8');
    console.log(`🔑 Verification key file verified: ${INDEXNOW_KEY}.txt`);
  } catch (err) {
    console.warn(`⚠️ Could not write local key file: ${err.message}`);
  }
}

/**
 * Extracts URLs from sitemap XML content
 */
function parseSitemapXml(xml) {
  const matches = [...xml.matchAll(/<loc>\s*(https?:\/\/[^\s<]+)\s*<\/loc>/gi)];
  return [...new Set(matches.map(m => m[1]))];
}

/**
 * Gets URLs from local sitemap file or fetches from remote
 */
async function getSitemapUrls() {
  // 1. Try local sitemap first (faster and works before DNS propagation)
  if (fs.existsSync(LOCAL_SITEMAP)) {
    console.log(`📁 Reading URLs from local sitemap: ${LOCAL_SITEMAP}`);
    const xml = fs.readFileSync(LOCAL_SITEMAP, 'utf8');
    let urls = [];
    if (/<sitemapindex/i.test(xml)) {
      // sitemap índice: leer cada sitemap hijo desde /site
      for (const child of parseSitemapXml(xml)) {
        const f = path.join(path.dirname(LOCAL_SITEMAP), path.basename(child));
        if (fs.existsSync(f)) urls.push(...parseSitemapXml(fs.readFileSync(f, 'utf8')));
      }
      urls = [...new Set(urls)];
    } else urls = parseSitemapXml(xml);
    if (urls.length > 0) return urls;
  }

  // 2. Fetch from remote sitemap
  console.log(`📡 Fetching remote sitemap from: ${SITEMAP_URL}`);
  try {
    const res = await fetch(SITEMAP_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FastIndexer/2026; +https://www.bing.com)',
        'Accept': 'application/xml, text/xml, */*'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const urls = parseSitemapXml(xml);
    if (!urls.length) throw new Error('No <loc> entries found in sitemap');
    return urls;
  } catch (error) {
    throw new Error(`Failed to load sitemap: ${error.message}`);
  }
}

/**
 * Submits URLs to IndexNow endpoints (Bing, Yandex, IndexNow.org)
 */
async function submitToIndexNow(urls) {
  const batchSize = 1000;
  const engines = [
    'https://api.indexnow.org/IndexNow',
    'https://www.bing.com/IndexNow',
    'https://yandex.com/indexnow'
  ];

  console.log(`\n🚀 Starting IndexNow submission for ${urls.length} URLs (Host: ${DOMAIN})...`);

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1} (${batch.length} URLs)...`);

    for (const engine of engines) {
      try {
        const payload = {
          host: DOMAIN,
          key: INDEXNOW_KEY,
          keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
          urlList: batch
        };

        const res = await fetch(engine, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(15000)
        });

        if (res.ok || res.status === 200 || res.status === 202) {
          console.log(`  ✅ [${res.status}] Success: Submitted to ${engine}`);
        } else {
          console.log(`  ⚠️ [${res.status}] ${engine} response: ${res.statusText}`);
        }
      } catch (err) {
        console.error(`  ❌ Error submitting to ${engine}: ${err.message}`);
      }
    }
  }
}

// MAIN EXECUTION
(async () => {
  try {
    console.log('⚡ Starting Fast Indexing Protocol (IndexNow)...');
    ensureKeyFile();

    let urls = [];
    const specificUrls = process.argv.slice(2).filter(arg => arg.startsWith('http'));

    if (specificUrls.length > 0) {
      console.log(`🎯 ${specificUrls.length} specific URL(s) provided.`);
      urls = specificUrls;
    } else {
      urls = await getSitemapUrls();
      console.log(`🔍 Found ${urls.length} URLs to index.`);
    }

    if (urls.length > 0) {
      await submitToIndexNow(urls);
    } else {
      console.log('⚠️ No URLs found to submit.');
    }

    console.log('\n✨ All Done! Search engines (Bing, Yandex, Seznam) notified via IndexNow protocol.');
  } catch (error) {
    console.error('\n🔥 Fatal Error:', error.message);
    process.exit(1);
  }
})();

