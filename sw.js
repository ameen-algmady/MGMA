const CACHE_NAME = 'mgma-cache-v1';
const urlsToCache = [
  '/MGMA/',
  '/MGMA/index.html',
  '/MGMA/manifest.json',
  '/MGMA/icons/icon-192x192.png',
  '/MGMA/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});