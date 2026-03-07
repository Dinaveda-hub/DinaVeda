const CACHE_NAME = 'dinaveda-v1';
const ASSETS_TO_CACHE = [
    '/welcome',
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
                // If the response is redirected and we can't follow it, just return it
                // and hope the browser handles it. 
                // Alternatively, we can return a synthetic response or just not intercept navigations.
                return networkResponse;
            }).catch((err) => {
                // Fallback for failed navigations
                if (event.request.mode === 'navigate') {
                    return caches.match('/welcome') || caches.match('/');
                }
                return new Response('Network error occurred', { status: 408 });
            });
        })
    );
});
