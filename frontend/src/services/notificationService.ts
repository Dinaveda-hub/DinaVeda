/**
 * notificationService.ts
 *
 * Interface for OneSignal REST API.
 */

import { getApiUrl } from "@/utils/api";

export { getApiUrl };


import notificationRulesRaw from "@/data/notificationRules.json";

const notificationRules = notificationRulesRaw as Record<string, { time: string, message: string }>;

/**
 * Sends a single notification via YOUR Backend API (Vercel).
 * This keeps your REST API Key secure on the server.
 */
export async function sendNotification(userId: string, message: string) {
    try {
        const apiUrl = getApiUrl();
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
 * Batch processes an array of signal events and triggers notifications.
 * This centralizes the lookup against notificationRules.json.
 */
export async function triggerNotifications(events: string[], userId: string) {
    if (!events || events.length === 0 || !userId) return;

    for (const event of events) {
        const rule = notificationRules[event];
        if (rule) {
            try {
                await sendNotification(userId, rule.message);
            } catch (err) {
                console.error(`Failed to trigger notification for event: ${event}`, err);
            }
        }
    }
}

/**
 * Sets external user ID in OneSignal (Client-side helper).
 * Note: OneSignal V16 uses 'login' instead of 'setExternalUserId'
 */
export function registerUserWithOneSignal(userId: string) {
    if (typeof window !== "undefined") {
        const OneSignal = (window as any).OneSignal;
        if (OneSignal) {
            OneSignal.push(async () => {
                try {
                    console.log("OneSignal: Attempting login for user:", userId);
                    // In V16, login should only be called after init
                    // We wrap it in push to ensure it runs in order
                    await OneSignal.login(userId);
                    console.log("OneSignal: Login successful");
                } catch (err) {
                    console.error("OneSignal: Login failed:", err);
                }
            });
        }
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
