/**
 * notificationService.ts
 *
 * Interface for OneSignal REST API.
 */

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || "";

/**
 * Sends a notification via YOUR Backend API (Vercel).
 * This keeps your REST API Key secure on the server.
 */
export async function sendNotification(userId: string, message: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const response = await fetch(`${apiUrl}/api/notify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                message
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Notification Error:", error);
            return { success: false, error };
        }

        return { success: true };
    } catch (error) {
        console.error("Notification Service Error:", error);
        return { success: false, error };
    }
}

/**
 * Sets external user ID in OneSignal (Client-side helper).
 */
export function registerUserWithOneSignal(userId: string) {
    if (typeof window !== "undefined" && (window as any).OneSignal) {
        (window as any).OneSignal.push(() => {
            (window as any).OneSignal.setExternalUserId(userId);
        });
    }
}

/**
 * Syncs notification preferences as OneSignal tags.
 */
export function syncNotificationTags(settings: { pulseAudits: boolean, circadianReminders: boolean, routineUpdates: boolean }) {
    if (typeof window !== "undefined" && (window as any).OneSignal) {
        (window as any).OneSignal.push(() => {
            (window as any).OneSignal.sendTags({
                pulse_audits: settings.pulseAudits ? "1" : "0",
                circadian_sync: settings.circadianReminders ? "1" : "0",
                routine_updates: settings.routineUpdates ? "1" : "0",
            });
        });
    }
}
