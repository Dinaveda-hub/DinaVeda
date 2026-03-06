"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || "16f1bbd1-94a9-4eec-842c-b2bf3004ae22";

export default function OneSignalInitializer() {
    useEffect(() => {
        const initOneSignal = async () => {
            try {
                await OneSignal.init({
                    appId: ONESIGNAL_APP_ID,
                    allowLocalhostAsSecureOrigin: true, // For development
                });
            } catch (error) {
                console.error("OneSignal initialization failed:", error);
            }
        };

        initOneSignal();
    }, []);

    return null;
}
