"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { initializePWA } from "@/services/system/pwaService";
import OneSignalInitializer from "@/components/OneSignalInitializer";
import GlobalRegistration from "@/components/GlobalRegistration";
import NotificationMonitor from "@/components/NotificationMonitor";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * SystemController
 *
 * Single system lifecycle orchestrator mounted once in RootLayout.
 * Consolidates:
 *   - Service Worker initialization (pwaService)
 *   - OneSignal initialization (oneSignalService)
 *   - User registration with OneSignal (Supabase session)
 *   - Notification monitoring (physiological thresholds)
 *   - PWA install prompt (PwaInstallBanner)
 */
export default function SystemController() {
    const { state, isLoaded, userId } = usePhysiologyState();

    // ── PWA Install Prompt ────────────────────────────────
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showInstallBanner, setShowInstallBanner] = useState(false);

    // ─────────────────────────────────────────────────────
    // System Initialization (runs once)
    // ─────────────────────────────────────────────────────
    useEffect(() => {
        // 1. PWA: Service Worker
        initializePWA();

        // 2. PWA: Install prompt
        if (localStorage.getItem("pwa-install-dismissed") !== "true") {
            const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
                e.preventDefault();
                setDeferredPrompt(e);
                setShowInstallBanner(true);
            };

            const handleAppInstalled = () => {
                setTimeout(() => setShowInstallBanner(false), 0);
                setDeferredPrompt(null);
            };

            window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as any);
            window.addEventListener("appinstalled", handleAppInstalled);

            if (window.matchMedia("(display-mode: standalone)").matches) {
                setTimeout(() => setShowInstallBanner(false), 0);
            }

            return () => {
                window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt as any);
                window.removeEventListener("appinstalled", handleAppInstalled);
            };
        }
    }, []);

    // ─────────────────────────────────────────────────────
    // PWA Install Handlers
    // ─────────────────────────────────────────────────────
    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log("[PWA] Install prompt outcome:", outcome);
        setDeferredPrompt(null);
        setTimeout(() => setShowInstallBanner(false), 0);
    };

    const handleDismiss = () => {
        localStorage.setItem("pwa-install-dismissed", "true");
        setTimeout(() => setShowInstallBanner(false), 0);
    };

    // ─────────────────────────────────────────────────────
    // Render: Global Background Tasks + Install Prompt
    // ─────────────────────────────────────────────────────
    return (
        <>
            {/* Background Tasks (wrapped by PhysiologyProvider via SystemController) */}
            <OneSignalInitializer />
            <GlobalRegistration />
            <NotificationMonitor />

            <AnimatePresence>
                {showInstallBanner && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-24 left-4 right-4 z-[100] md:bottom-10 md:left-auto md:right-10 md:w-96"
                    >
                        <div className="glass p-4 rounded-[2rem] border border-forest/20 shadow-premium flex items-center justify-between gap-4 bg-white/90 backdrop-blur-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
                                    <Download className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-forest leading-none mb-1">Install Dinaveda</h3>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Track physiology offline</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleInstallClick}
                                    className="bg-forest text-white px-5 py-2.5 rounded-full text-xs font-black shadow-lg shadow-forest/20 active:scale-95 transition-all"
                                >
                                    Install
                                </button>
                                <button
                                    onClick={handleDismiss}
                                    aria-label="Dismiss install banner"
                                    className="p-2 text-slate-600 hover:text-forest transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
