"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaInstallBanner() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Prevent showing if already dismissed in this browser
        if (typeof window !== "undefined" && localStorage.getItem("pwa-install-dismissed") === "true") {
            return;
        }

        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        const handleAppInstalled = () => {
            setIsVisible(false);
            setDeferredPrompt(null);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as any);
        window.addEventListener("appinstalled", handleAppInstalled);

        // Check if app is already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsVisible(false);
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt as any);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        await deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    const handleDismiss = () => {
        localStorage.setItem("pwa-install-dismissed", "true");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
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
                                className="p-2 text-slate-600 hover:text-forest transition-colors"
                                aria-label="Dismiss install banner"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
