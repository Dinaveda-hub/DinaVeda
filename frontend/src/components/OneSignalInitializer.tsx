"use client";

import { useEffect } from "react";

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || "16f1bbd1-94a9-4eec-842c-b2bf3004ae22";

export default function OneSignalInitializer() {
    useEffect(() => {
        const initOneSignal = async () => {
            try {
                const OneSignal = (window as any).OneSignal || [];
                OneSignal.push(async () => {
                    await (window as any).OneSignal.init({
                        appId: ONESIGNAL_APP_ID,
                        safari_web_id: "web.onesignal.auto.1ad4c923-47e5-493e-8349-b8f3b81ccfd9",
                        notifyButton: {
                            enable: true,
                        },
                        allowLocalhostAsSecureOrigin: true,
                    });
                });
            } catch (error) {
                console.error("OneSignal initialization failed:", error);
            }
        };

        if (typeof window !== "undefined") {
            initOneSignal();
        }
    }, []);

    return null;
}
