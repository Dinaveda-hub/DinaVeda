"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import PricingSection from "./PricingSection";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    onSuccess: () => void;
}

export default function UpgradeModal({ isOpen, onClose, userId, onSuccess }: UpgradeModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-forest/40 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-4xl w-full shadow-2xl relative border border-white/50 overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-forest/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-slate-400 hover:text-forest transition-colors z-10 bg-white/50 p-2 rounded-full backdrop-blur-sm"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-amber-50 text-amber-500 flex items-center justify-center mb-6 shadow-sm">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-forest tracking-tighter leading-tight mb-3">
                                Unlock Dinaveda Premium
                            </h3>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed max-w-md mx-auto">
                                Transform your health with AI-driven Ayurvedic coaching and advanced biological analytics.
                            </p>
                        </div>

                        <PricingSection onSuccess={onSuccess} />
                        
                        <div className="text-center mt-8">
                             <p className="text-center text-xs text-slate-400 font-medium pb-4">
                                Fast, secure checkout via Razorpay. Cancel anytime.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
