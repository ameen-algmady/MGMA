const CACHE_NAME = 'mgma-v4';
const urlsToCache = [
  '/MGMA/',
  '/MGMA/index.html',
  '/MGMA/styles.css',
  '/MGMA/school-logo.png',
  '/MGMA/school-image.jpg',
  '/MGMA/ãÏíÑ-ÇáãÌãÚ.jpg',
  '/MGMA/ÑíÇÖ-ÇáÌæÏÉ.jpg',
  '/MGMA/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});