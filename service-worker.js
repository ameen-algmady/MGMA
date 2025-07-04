const CACHE_NAME = 'mgma-v2';

const urlsToCache = [
  '/MGMA/', // هذا هو جذر التطبيق داخل GitHub Pages
  '/MGMA/index.html',
  '/MGMA/styles.css',
  '/MGMA/school-logo.png',
  '/MGMA/school-image.jpg',
  '/MGMA/manifest.json',
  '/MGMA/icons/icon-192x192.png',
  '/MGMA/icons/icon-512x512.png'
];

self.addEventListener('install', function (event) {
  console.log('🛠️ Service Worker: تم التثبيت');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('فشل التخزين في الكاش:', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  console.log('✅ Service Worker: تم التفعيل');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('🧹 حذف الكاش القديم:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => new Response('⚠️ لا يوجد اتصال بالإنترنت'))
  );
});

self.addEventListener('notificationclick', function (event) {
  console.log('🔔 تم النقر على الإشعار');
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url.includes('/MGMA/') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/MGMA/');
      }
    })
  );
});
