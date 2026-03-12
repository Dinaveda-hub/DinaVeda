/**
 * oneSignalService.ts
 *
 * Centralizes all OneSignal initialization and user registration.
 * Prevents duplicate initialization if called multiple times.
 */

const ONESIGNAL_APP_ID =
    process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID ||
    process.env.ONESIGNAL_APP_ID ||
    "";

let initialized = false;

/**
 * Initializes the OneSignal SDK via the global window object (CDN script).
 * Safe to call multiple times — will no-op after first initialization.
 */
export function initializeOneSignal(): void {
    if (typeof window === "undefined" || initialized) return;

    try {
        const OneSignal = (window as any).OneSignal || [];
        OneSignal.push(async () => {
            await (window as any).OneSignal.init({
                appId: ONESIGNAL_APP_ID,
                safari_web_id: "web.onesignal.auto.1ad4c923-47e5-493e-8349-b8f3b81ccfd9",
                notifyButton: { enable: false },
                allowLocalhostAsSecureOrigin: true,
            });

            const hasPermission = await (window as any).OneSignal.Notifications.permission;
            console.log("[OneSignal] Initialized. Push permission:", hasPermission);
        });

        initialized = true;
    } catch (error) {
        console.error("[OneSignal] Initialization failed:", error);
    }
}

/**
 * Links a Supabase user ID to their OneSignal subscription.
 * Should be called once after session is confirmed.
 */
export function registerOneSignalUser(userId: string): void {
    if (typeof window === "undefined") return;

    const OneSignal = (window as any).OneSignal;
    if (!OneSignal) return;

    OneSignal.push(async () => {
        try {
            await OneSignal.login(userId);
            console.log("[OneSignal] User linked:", userId);
        } catch (err) {
            console.error("[OneSignal] User login failed:", err);
        }
    });
}
