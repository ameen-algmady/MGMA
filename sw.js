const CACHE_NAME = 'mgma-final-v3'; // ← غيّر هذا الاسم مع كل تحديث
const urlsToCache = [
  '/MGMA/',
  '/MGMA/index.html',
  '/MGMA/styles.css',
  
  '/MGMA/school-logo.png',
  '/MGMA/school-image.jpg',
  '/MGMA/director.jpg',
  '/MGMA/riyad.jpg',
  '/MGMA/manifest.json',
  '/MGMA/icons/icon-192x192.png',
  '/MGMA/icons/icon-512x512.png'
];

// تثبيت الملفات وتخزينها في الكاش
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // يجبر التحديث الفوري
});

// تفعيل الـ Service Worker وحذف الكاش القديم
self.addEventListener('activate', event => {
  console.log('✅ Service Worker: Activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('🧹 Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim(); // يجعل التحديث يعمل فورًا
});

// التعامل مع الطلبات
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return new Response('⚠️ لا يوجد اتصال بالإنترنت');
    })
  );
});
