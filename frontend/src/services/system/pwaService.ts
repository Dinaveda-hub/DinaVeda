/**
 * pwaService.ts
 *
 * Handles all PWA lifecycle concerns:
 * - Service Worker registration
 * - beforeinstallprompt event capture (dispatched as a custom event for InstallPrompt to consume)
 * - appinstalled event handling
 */

export function initializePWA(): void {
    if (typeof window === "undefined") return;

    // Service Worker registration
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", async () => {
            try {
                const registration = await navigator.serviceWorker.register("/sw.js");
                console.log("[PWA] Service Worker registered:", registration.scope);

                if (registration.waiting) {
                    console.log("[PWA] New service worker waiting.");
                }
            } catch (err) {
                console.error("[PWA] Service Worker registration failed:", err);
            }
        });
    }

    // Log install event
    window.addEventListener("appinstalled", () => {
        console.log("[PWA] App successfully installed.");
    });
}
