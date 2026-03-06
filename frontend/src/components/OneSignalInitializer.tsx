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
