const CACHE_NAME = 'dinaveda-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/manifest.json',
    '/favicon.png',
    '/logo.png',
    '/icon-192.png',
    '/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Use individual add for each to be resilient
            return Promise.allSettled(
                ASSETS_TO_CACHE.map(url => cache.add(url))
            );
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch((err) => {
                // If it's a navigation, try the offline fallback
                if (event.request.mode === 'navigate') {
                    return caches.match('/');
                }
                // For other requests (like images/API), return a basic response or let it fail naturally
                return new Response('Network error occurred', { status: 408 });
            });
        })
    );
});
