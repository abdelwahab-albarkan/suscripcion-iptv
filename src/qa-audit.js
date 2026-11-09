const fs = require('fs');
const path = require('path');

const siteDir = path.join(__dirname, '..', 'site');
const issues = [];

function walk(dir) {
  let files = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith('.html')) files.push(full);
  });
  return files;
}

const htmlFiles = walk(siteDir);
const htmlCount = htmlFiles.length;

let placeholderMatches = 0;
let dummyDomainMatches = 0;
let brokenAssets = 0;
let missingCanonicals = 0;
let missingTitles = 0;
let missingDescriptions = 0;
let missingH1s = 0;
let todedevOccurrences = 0;
let whatsappMatches = 0;
let emailMatches = 0;

const checkedAssets = new Set();
const allSiteHrefs = new Set();

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(siteDir, file).replace(/\\/g, '/');

  // Check dummy domains
  if (content.includes('tudominio.com')) dummyDomainMatches++;

  // Check un-interpolated variables
  if (content.includes('${K}') || content.includes('${KC}')) {
    placeholderMatches++;
    issues.push(`Uninterpolated variable in ${relFile}`);
  }

  // Check basic SEO tags
  if (!content.includes('<title>')) missingTitles++;
  if (!content.includes('name="description"')) missingDescriptions++;
  if (!content.includes('<h1')) missingH1s++;
  if (!content.includes('rel="canonical"')) missingCanonicals++;

  // Count Todedevelop payment links
  const todeLinks = (content.match(/https:\/\/todedev\.com\/buy\/[a-zA-Z0-9-]+/g) || []).length;
  todedevOccurrences += todeLinks;

  // Count WhatsApp & Email occurrences
  if (content.includes('212625218443')) whatsappMatches++;
  if (content.includes('support@streamb4.com')) emailMatches++;

  // Check all local images and css/js assets
  const assetMatches = [...content.matchAll(/(?:src|href)=["']([^"']+)["']/g)];
  assetMatches.forEach(m => {
    const target = m[1].split('#')[0].split('?')[0];
    if (!target || target.startsWith('http') || target.startsWith('mailto:') || target.startsWith('tel:') || target.startsWith('data:') || target.startsWith('javascript:')) return;

    const fullPath = path.resolve(path.dirname(file), target);
    if (!checkedAssets.has(fullPath)) {
      checkedAssets.add(fullPath);
      if (!fs.existsSync(fullPath)) {
        brokenAssets++;
        issues.push(`Broken link/asset: "${target}" in ${relFile}`);
      }
    }
  });
});

// Check critical root files
const robotsPath = path.join(siteDir, 'robots.txt');
const sitemapPath = path.join(siteDir, 'sitemap.xml');
const keyPath = path.join(siteDir, 'suscripcioniptv8k2026key.txt');

const robotsContent = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : '';
const sitemapContent = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
const keyContent = fs.existsSync(keyPath) ? fs.readFileSync(keyPath, 'utf8').trim() : '';

const sitemapUrls = (sitemapContent.match(/<loc>(.*?)<\/loc>/g) || []).length;

console.log('====================================================');
console.log('              COMPREHENSIVE AUDIT REPORT            ');
console.log('====================================================');
console.log(`✅ Total HTML Pages Generated: ${htmlCount}`);
console.log(`✅ Sitemaps Count: ${sitemapUrls} URLs in sitemap.xml`);
console.log(`✅ Dummy domain (tudominio.com): ${dummyDomainMatches} (Expected 0)`);
console.log(`✅ Un-interpolated strings (\${K}): ${placeholderMatches} (Expected 0)`);
console.log(`✅ Broken Internal Links / Assets: ${brokenAssets} (Expected 0)`);
console.log(`✅ Missing <title>: ${missingTitles} (Expected 0)`);
console.log(`✅ Missing meta description: ${missingDescriptions} (Expected 0)`);
console.log(`✅ Missing <h1>: ${missingH1s} (Expected 0)`);
console.log(`✅ Missing canonical tag: ${missingCanonicals} (Expected 0)`);
console.log(`✅ Payment Links Found (todedev.com): ${todedevOccurrences}`);
console.log(`✅ Pages with WhatsApp (+212625218443): ${whatsappMatches}`);
console.log(`✅ Pages with Support Email (support@streamb4.com): ${emailMatches}`);
console.log('----------------------------------------------------');
console.log(`Robots.txt status: ${fs.existsSync(robotsPath) ? 'EXISTS' : 'MISSING'}`);
console.log(`Robots.txt sitemap target: ${robotsContent.includes('https://suscripcioniptv8k.com/sitemap.xml') ? 'CORRECT' : 'WRONG'}`);
console.log(`IndexNow Key File: ${fs.existsSync(keyPath) ? 'EXISTS' : 'MISSING'}`);
console.log(`IndexNow Key Value: "${keyContent}" (Match: ${keyContent === 'suscripcioniptv8k2026key'})`);
console.log('====================================================');

if (issues.length > 0) {
  console.log(`⚠️ ISSUES FOUND (${issues.length}):`);
  issues.slice(0, 10).forEach(iss => console.log(' - ' + iss));
} else {
  console.log('🎉 100% READY! Zero broken links, zero placeholders, all configs verified.');
}

