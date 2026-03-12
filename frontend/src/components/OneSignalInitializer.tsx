"use client";

import { useEffect } from "react";

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;

export default function OneSignalInitializer() {
  useEffect(() => {
    if (!ONESIGNAL_APP_ID) return;

    const init = async () => {
      try {
        const OneSignal = (window as any).OneSignal;

        if (!OneSignal) return;

        if ((window as any).__onesignalInitialized) return;
        (window as any).__onesignalInitialized = true;

        console.log("OneSignal: Initializing");

        await OneSignal.init({
          appId: ONESIGNAL_APP_ID,
          notifyButton: { enable: true },
          allowLocalhostAsSecureOrigin: process.env.NODE_ENV === "development"
        });

        const permission = OneSignal.Notifications.permission;

        console.log("OneSignal permission:", permission);

      } catch (err) {
        console.error("OneSignal init failed:", err);
      }
    };

    init();
  }, []);

  return null;
}
