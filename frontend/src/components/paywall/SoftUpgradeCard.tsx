"use client";

import { useUpgrade } from "@/contexts/UpgradeContext";
import { Sparkles, ArrowRight } from "lucide-react";

interface SoftUpgradeCardProps {
    trigger: string;
    text: string;
}

export default function SoftUpgradeCard({ trigger, text }: SoftUpgradeCardProps) {
    const { openUpgrade } = useUpgrade();

    return (
        <div className="bg-forest/5 border border-forest/10 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-forest/5 rounded-full blur-xl -mr-8 -mt-8" />
            
            <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-forest/10 flex items-center justify-center text-forest shrink-0">
                    <Sparkles className="w-5 h-5" />
                </div>
                
                <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">
                        {text}
                    </p>
                    
                    <button
                        onClick={() => openUpgrade(trigger)}
                        className="inline-flex items-center gap-2 bg-forest text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-forest/10 hover:scale-105 active:scale-95 transition-all"
                    >
                        Upgrade to Premium <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}
