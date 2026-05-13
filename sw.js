/* ═══════════════════════════════════════════
   RUNFUERZA — sw.js
   Service Worker: permite usar la app offline
   ═══════════════════════════════════════════ */

const CACHE_NAME = 'runfuerza-v2';

const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/data/ejercicios.js',
  '/data/recetas.js',
  '/manifest.json',
];

/* Instalar: cachea todos los assets */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

/* Activar: limpia caches viejos */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* Fetch: sirve desde cache, si falla va a la red */
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
