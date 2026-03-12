import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BrainCircuit, Lock } from "lucide-react";
import Link from "next/link";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { getApiUrl } from "@/services/notificationService";
import { useUpgrade } from "@/contexts/UpgradeContext";

export default function DailyAIInsight() {
    const { state, subscriptionStatus, isLoaded, userId } = usePhysiologyState();
    const isPremium = subscriptionStatus === "active";
    
    const [insight, setInsight] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { openUpgrade } = useUpgrade();

    useEffect(() => {
        // Only fetch automatically if they are premium
        if (isLoaded && isPremium && !insight) {
            fetchInsight();
        }
    }, [isLoaded, isPremium]);

    const fetchInsight = async () => {
        setIsLoading(true);
        try {
            const apiUrl = getApiUrl();
            const res = await fetch(`${apiUrl}/ai/health-insight`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "x-user-id": userId || "guest"
                },
                body: JSON.stringify({ state })
            });
            if (res.ok) {
                const data = await res.json();
                setInsight(data.insight);
            }
        } catch (error) {
            console.error("Insight fetching error", error);
            setInsight("Veda Intelligence is temporarily unavailable. Rest and try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isLoaded) return null;

    if (!isPremium) {
        return (
            <>
                <div onClick={() => openUpgrade("advanced_insights")} className="glass p-6 md:p-8 rounded-[2rem] border border-forest/10 shadow-sm relative overflow-hidden group hover:shadow-premium hover:border-forest/30 transition-all flex flex-col items-center gap-4 cursor-pointer mb-8 w-full max-w-2xl mx-auto">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none group-hover:bg-gold/20 transition-all -mt-10 -mr-10" />
                    <div className="w-14 h-14 rounded-[1.5rem] bg-amber-50 text-amber-500 border border-amber-100 flex items-center justify-center shrink-0 shadow-sm relative z-10">
                        <Lock className="w-7 h-7" />
                    </div>
                    <div className="text-center relative z-10">
                        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-amber-600 mb-2 flex items-center justify-center gap-2">
                           Deep Biological Scanning Locked
                        </p>
                        <h4 className="text-xl md:text-2xl font-black text-forest tracking-tight">
                            Personalized Physiological AI Insight
                        </h4>
                    </div>
                    <div className="mt-2 bg-forest text-white py-3 px-6 rounded-full font-black text-xs uppercase tracking-widest text-center shadow-md group-hover:scale-105 transition-transform z-10">
                        Upgrade
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="glass p-6 md:p-8 rounded-[2rem] border border-emerald-100 shadow-sm relative overflow-hidden flex flex-col gap-4 mb-8 w-full max-w-2xl mx-auto group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-all -mt-10 -mr-10" />
            
            <div className="flex items-center gap-4 border-b border-emerald-50 pb-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <BrainCircuit className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-emerald-800">AyuOne Insight</h3>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" /> Live Analysis
                    </p>
                </div>
            </div>
            
            <div className="relative z-10 pt-2">
                {isLoading ? (
                    <div className="flex items-center justify-center py-6 gap-3">
                        <BrainCircuit className="w-6 h-6 animate-pulse text-emerald-300" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Scanning physiological markers...</span>
                    </div>
                ) : (
                    <p className="text-base md:text-lg font-bold text-forest leading-relaxed text-balance">
                        {insight}
                    </p>
                )}
            </div>
        </div>
    );
}
