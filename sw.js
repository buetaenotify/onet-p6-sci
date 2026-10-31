// Service worker เล็ก ๆ: เก็บหน้าเปิดแอปและไอคอนไว้ เพื่อให้ติดตั้งเป็นแอปได้และเปิดเร็ว
const CACHE = 'onet-p6-sci-v1';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;            // ตัวเว็บแอป Google ไม่ผ่าน cache
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
