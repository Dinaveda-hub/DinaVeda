import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Info, Zap, Utensils, Moon, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import PricingSection from "./PricingSection";
import { useUpgrade } from "@/contexts/UpgradeContext";

const CONTEXT_MESSAGES: Record<string, { title: string; desc: string; icon: any; color: string }> = {
    diet: {
        title: "Personalized Diet Engine",
        desc: "Your Agni (digestive fire) requires specific corrective foods today. Unlock your custom meal plan.",
        icon: Utensils,
        color: "text-orange-500 bg-orange-50"
    },
    yoga: {
        title: "Adaptive Yoga Protocols",
        desc: "Your Vata levels are shifting. Unlock a neural-stabilizing yoga routine tailored to your current pressure.",
        icon: Zap,
        color: "text-emerald-500 bg-emerald-50"
    },
    sleep: {
        title: "Circadian Restoration",
        desc: "Your sleep rhythm shows drift. Unlock the advanced protocols to restore your natural sleep-wake hierarchy.",
        icon: Moon,
        color: "text-indigo-500 bg-indigo-50"
    },
    coach_limit: {
        title: "Unlimited AI Coaching",
        desc: "You've reached your daily limit. Upgrade for 24/7 unlimited access to your personal Ayurvedic guide.",
        icon: MessageSquare,
        color: "text-blue-500 bg-blue-50"
    },
    advanced_insights: {
        title: "Predictive Health Forensics",
        desc: "Unlock deeper physiology patterns and 24-hour predictive health trends.",
        icon: Sparkles,
        color: "text-amber-500 bg-amber-50"
    },
    default: {
        title: "Unlock Dinaveda Premium",
        desc: "Transform your health with AI-driven Ayurvedic coaching and advanced biological analytics.",
        icon: Sparkles,
        color: "text-amber-500 bg-amber-50"
    }
};

interface UpgradeModalProps {
    userId?: string;
    onSuccess?: () => void;
}

export default function UpgradeModal({ userId = "", onSuccess = () => {} }: UpgradeModalProps) {
    const { state, closeUpgrade } = useUpgrade();
    const [canClose, setCanClose] = useState(false);

    const isOpen = state.isOpen;
    const trigger = state.trigger || "default";
    const content = CONTEXT_MESSAGES[trigger] || CONTEXT_MESSAGES.default;
    const Icon = content.icon;

    useEffect(() => {
        if (isOpen) {
            setCanClose(false);
            const timer = setTimeout(() => {
                setCanClose(true);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-forest/40 backdrop-blur-sm"
                    onClick={closeUpgrade}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{ transform: "translateZ(0)" }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-4xl w-full shadow-2xl relative border border-white/50 overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-forest/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

                        <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
                            {!canClose && (
                                <motion.span 
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/80 px-3 py-1.5 rounded-full border border-slate-100 hidden md:inline-block"
                                >
                                    Review your personalized guidance
                                </motion.span>
                            )}
                            <button
                                onClick={canClose ? closeUpgrade : undefined}
                                className={`p-2 rounded-full backdrop-blur-sm transition-all shadow-sm ${canClose ? "text-slate-500 hover:text-forest bg-white/50" : "text-slate-200 bg-slate-50 cursor-default"}`}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex flex-col items-center text-center mb-10">
                            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm ${content.color}`}>
                                <Icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-forest tracking-tighter leading-tight mb-3">
                                {content.title}
                            </h3>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed max-w-md mx-auto">
                                {content.desc}
                            </p>
                        </div>

                        <PricingSection userId={userId} onSuccess={onSuccess} />
                        
                        <div className="text-center mt-8">
                             <p className="text-center text-xs text-slate-400 font-medium pb-4">
                                Fast, secure checkout via Razorpay. Cancel anytime.
                            </p>
                            <button 
                                onClick={closeUpgrade}
                                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-colors"
                            >
                                Continue with free version
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
