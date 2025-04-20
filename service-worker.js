self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('smart-farm-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/dashboard.html',
        '/style.css',
        '/app.js',
        '/manifest.json',
        '/assets/icon-192x192.png',
        '/assets/icon-512x512.png',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['smart-farm-cache'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
