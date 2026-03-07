// Minimal Service Worker to satisfy PWA installation criteria
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Basic fetch handler required for PWA installability
    // Can be expanded later for offline support
});
