// Optimiza las imágenes de /images a WebP en src/assets/img (build.js las copia a /site/assets/img).
// Uso: node src/images.js
const fs = require('fs'), path = require('path');
const sharp = require(path.join(__dirname, '..', 'node_modules', 'sharp'));
const SRC = path.join(__dirname, '..', 'images');
const OUT = path.join(__dirname, 'assets', 'img');

// Fotografías / escenas (sin logos de terceros ni texto de otras marcas)
const PHOTOS = {
  'room-warm': 'lucid-origin_Luxury_Canadian_smart_home',
  'theater': 'lucid-origin_Luxury_home_theater',
  'family': 'home-hero.jpg',
  'oled-sports': 'gpt-image-2_A_premium_LG_OLED',
  'smarters-ui': 'gpt-image-2_Luxury_home_entertainment',
  'epg-light': 'ChatGPT Image 7 août 2026, 02_46_37.png',
  'epg-tivimate': 'gpt-image-2_Modern_IPTV_application',
  'remote-hand': 'gpt-image-2_A_hand_using_an_LG_Magic_Remote',
  'chromecast': 'gpt-image-2_Close-up_of_Chromecast',
  'devices-collection': 'lucid-origin_Collection_of_premium_streaming_devices',
  'ethernet': 'lucid-origin_LG_Smart_TV_connected_through_a_high-speed_Ethernet',
  'router': 'lucid-origin_Modern_Wi-Fi_router',
  'shield1': 'lucid-origin_Futuristic_cybersecurity_shield',
  'shield2': 'lucid-origin_Modern_Smart_TV_connected_to_a_secure',
  'vpn': 'lucid-origin_Modern_streaming_setup_with_encrypted_VPN',
  'blue-room': 'lucid-origin_Ultra-realistic_Google_TV_streaming_setup',
  'google-dash': 'iptv-google-tv-dashboard.jpg',
  'green-android': 'iptv-android-tv-setup.jpg',
  'green-fire': 'iptv-fire-tv-stick.jpg',
  'green-samsung': 'iptv-samsung-tv-setup.jpg',
  'laptop': 'iptv-windows-pc.jpg',
  'app-smarters': 'app-smarters.jpg',
};
// Productos (PNG con transparencia)
const PRODUCTS = {
  'p-samsung': 'samsungsmarttv.png', 'p-lg': 'LG TV (webOS).png', 'p-androidtv': 'Android TV.png', 'p-firestick': 'firestick.png',
  'p-xiaomi': 'device-xiaomi.png', 'p-shield': 'nvidiashield.png', 'p-sony': 'Sony TV (Google TV).png', 'p-tcl': 'TCL TV.png',
  'p-appletv': 'appletv.png', 'p-iphone': 'iphone17.png', 'p-ipad': 'iPad.png', 'p-androidphones': 'androidphones.png',
  'p-firetablet': 'Fire Tablet.png', 'p-windows': 'windowspc.png', 'p-mac': 'macos.png', 'p-roku': 'roku.png', 'p-mag': 'mag.png',
};
// Métodos de pago
const PAY = { 'pay-visa': 'payments/visa.webp', 'pay-mastercard': 'payments/mastercard.webp', 'pay-paypal': 'payments/paypal.png', 'pay-applepay': 'payments/apple-pay.webp', 'pay-googlepay': 'payments/google-pay.png', 'pay-bitcoin': 'payments/bitcoin.jpg' };

const find = (p) => { if (fs.existsSync(path.join(SRC, p))) return path.join(SRC, p); const f = fs.readdirSync(SRC).find(x => x.startsWith(p)); if (!f) throw new Error('No encuentro ' + p); return path.join(SRC, f); };

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
  const manifest = {}; let bytes = 0;
  const save = async (id, pipeline, w) => { const name = `${id}-${w}.webp`; const info = await pipeline.toFile(path.join(OUT, name)); bytes += info.size; return { name, info }; };

  for (const [id, p] of Object.entries(PHOTOS)) {
    const file = find(p), m = await sharp(file).metadata(); const f = {}; let big;
    for (const w of [720, 1280]) { const tw = Math.min(w, m.width); const r = await save(id, sharp(file).resize(tw).webp({ quality: 68, effort: 6 }), tw); f[tw] = r.name; big = r.info; }
    const px = await sharp(file).resize(1, 1, { fit: 'fill' }).removeAlpha().raw().toBuffer(); // dominant color
    const bg = '#' + [...px.subarray(0, 3)].map(v => v.toString(16).padStart(2, '0')).join('');
    manifest[id] = { w: big.width, h: big.height, f, kind: 'photo', bg };
  }
  for (const [id, p] of Object.entries(PRODUCTS)) {
    const file = find(p); const f = {}; let big;
    for (const w of [420, 760]) {
      const trimmed = await sharp(file).trim({ threshold: 8 }).toBuffer();
      const r = await save(id, sharp(trimmed).resize({ width: w, height: Math.round(w * 0.75), fit: 'inside', withoutEnlargement: true }).webp({ quality: 84, alphaQuality: 90, effort: 5 }), w); f[w] = r.name; big = r.info;
    }
    manifest[id] = { w: big.width, h: big.height, f, kind: 'product' };
  }
  for (const [id, p] of Object.entries(PAY)) {
    const file = find(p); const r = await save(id, sharp(file).trim({ threshold: 6 }).resize({ height: 72, withoutEnlargement: true }).webp({ quality: 90 }), 72);
    manifest[id] = { w: r.info.width, h: r.info.height, f: { 72: r.name }, kind: 'pay' };
  }
  fs.writeFileSync(path.join(__dirname, 'img-manifest.json'), JSON.stringify(manifest, null, 1));
  console.log('Imágenes optimizadas:', Object.keys(manifest).length, 'ids ·', (bytes / 1024 / 1024).toFixed(1), 'MB en', OUT);
})().catch(e => { console.error(e); process.exit(1); });
