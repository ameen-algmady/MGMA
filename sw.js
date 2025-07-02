const CACHE_NAME = 'mgma-final-v2';
const urlsToCache = [
  '/MGMA/',
  '/MGMA/index.html',
  '/MGMA/styles.css',
  '/MGMA/favicon.ico',
  '/MGMA/school-logo.png',
  '/MGMA/school-image.jpg',
  '/MGMA/director.jpg',
  '/MGMA/riyad.jpg',
  '/MGMA/manifest.json',
  '/MGMA/icons/icon-192x192.png',
  '/MGMA/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.all(
          urlsToCache.map(url => {
            return fetch(url)
              .then(response => {
                if (response.ok) return cache.put(url, response);
              })
              .catch(err => console.log('Failed to cache:', url, err));
          })
        );
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
