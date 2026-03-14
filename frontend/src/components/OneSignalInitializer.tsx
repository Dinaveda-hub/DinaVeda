"use client";

import { useEffect } from "react";

export default function OneSignalInitializer({ appId, safariWebId }: { appId?: string; safariWebId?: string }) {
  useEffect(() => {
    console.log("OneSignalInitializer: Mounted. App ID:", appId);
    if (!appId) {
      console.warn("OneSignalInitializer: Missing appId from server");
      return;
    }

    const init = async () => {
      try {
        const existingOneSignal = (window as any).OneSignal;
        console.log("OneSignalInitializer: window.OneSignal status on mount:", {
          exists: !!existingOneSignal,
          isArray: Array.isArray(existingOneSignal),
          isObject: typeof existingOneSignal === 'object' && !Array.isArray(existingOneSignal),
          queueLength: Array.isArray(existingOneSignal) ? existingOneSignal.length : 'N/A'
        });

        // Ensure OneSignal is initialized as an array if not already present
        const OneSignal = existingOneSignal || [];
        (window as any).OneSignal = OneSignal;
        
        console.log("OneSignalInitializer: Pushing init call to queue");
        
        OneSignal.push(async () => {
          console.log("OneSignal: Queue item executing...");
          
          if ((window as any).__onesignalInitialized) {
            console.log("OneSignal: Already initialized (skipped)");
            return;
          }
          
          console.log("OneSignal: Initializing with SDK");
          
          const initOptions: any = {
            appId: appId,
            notifyButton: { enable: true },
            allowLocalhostAsSecureOrigin: process.env.NODE_ENV === "development",
            serviceWorkerPath: "/sw.js",
            serviceWorkerParam: { scope: "/" }
          };

          if (safariWebId) {
             initOptions.safari_web_id = safariWebId;
          }
          
          console.log("OneSignal: Calling init with options", { ...initOptions, appId: '***' });
          
          await (window as any).OneSignal.init(initOptions);
          
          (window as any).__onesignalInitialized = true;
          const permission = await (window as any).OneSignal.Notifications.permission;
          console.log("OneSignal permission:", permission);
        });

      } catch (err) {
        console.error("OneSignal init failed:", err);
      }
    };

    init();
  }, [appId, safariWebId]);

  return null;
}
