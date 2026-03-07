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
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) return response;

            return fetch(event.request).then((networkResponse) => {
                // Check if we received a redirected response
                if (networkResponse.redirected && event.request.redirect !== 'follow') {
                    // We can't cache redirected responses directly if the request didn't allow it
                    // Just return the network response and don't cache
                    return networkResponse;
                }

                // If valid, clone and cache (optional, but keep it simple for now)
                return networkResponse;
            }).catch((err) => {
                if (event.request.mode === 'navigate') {
                    return caches.match('/');
                }
                return new Response('Network error occurred', { status: 408 });
            });
        })
    );
});
