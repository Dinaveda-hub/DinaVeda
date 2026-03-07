"use client";

import { useEffect } from "react";

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || process.env.ONESIGNAL_APP_ID || "";

export default function OneSignalInitializer() {
    useEffect(() => {
        const initOneSignal = async () => {
            try {
                const OneSignal = (window as any).OneSignal || [];
                OneSignal.push(async () => {
                    console.log("OneSignal: Initializing with ID:", ONESIGNAL_APP_ID);
                    await (window as any).OneSignal.init({
                        appId: ONESIGNAL_APP_ID,
                        safari_web_id: "web.onesignal.auto.1ad4c923-47e5-493e-8349-b8f3b81ccfd9",
                        notifyButton: {
                            enable: true,
                        },
                        allowLocalhostAsSecureOrigin: true,
                    });
                    console.log("OneSignal: Initialization complete.");

                    // Check registration status
                    const isPushEnabled = await (window as any).OneSignal.Notifications.permission;
                    console.log("OneSignal: Notification permission status:", isPushEnabled);
                });
            } catch (error) {
                console.error("OneSignal: Initialization failed:", error);
            }
        };

        if (typeof window !== "undefined") {
            initOneSignal();
        }
    }, []);

    return null;
}
