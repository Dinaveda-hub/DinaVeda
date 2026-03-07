// Minimal Service Worker to satisfy PWA installation criteria
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Basic fetch handler required for PWA installability
    // It MUST call respondWith to be considered active by some browsers
    event.respondWith(
        fetch(event.request).catch(() => {
            // Fallback for offline if needed
            return new Response("Offline");
        })
    );
});
