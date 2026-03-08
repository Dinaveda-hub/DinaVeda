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

    // CRITICAL: If this is a navigation request, DON'T intercept it.
    // This allows the browser to handle the middleware redirects natively,
    // avoiding the "ERR_FAILED" or "redirected response was used" errors in PWAs.
    if (event.request.mode === 'navigate') {
        return; // Do NOT call event.respondWith()
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) return response;

            return fetch(event.request).then((networkResponse) => {
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
