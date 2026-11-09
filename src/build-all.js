const { execFileSync } = require('child_process');
const path = require('path');

console.log('🚀 [1/3] Building core site pages...');
execFileSync(process.execPath, [path.join(__dirname, 'build.js')], { stdio: 'inherit' });

console.log('🚀 [2/3] Generating programmatic SEO pages (cities, teams, channels, devices, guides)...');
execFileSync(process.execPath, [path.join(__dirname, 'pseo.js')], { stdio: 'inherit' });

console.log('🚀 [3/3] Generating blog articles & full sitemap...');
execFileSync(process.execPath, [path.join(__dirname, 'blog.js')], { stdio: 'inherit' });

console.log('🎉 Full site generation complete! All 1100 pages and sitemap are ready.');
