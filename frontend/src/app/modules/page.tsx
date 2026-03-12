"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Leaf } from "lucide-react";
import { MODULES } from "@/data/moduleRegistry";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import UpgradeModal from "@/components/billing/UpgradeModal";

const COLOR_MAP = {
    air: { bg: "bg-blue-50", icon: "text-blue-800", hover: "group-hover:bg-blue-100" },
    water: { bg: "bg-teal-50", icon: "text-teal-800", hover: "group-hover:bg-teal-100" },
    earth: { bg: "bg-emerald-50", icon: "text-forest", hover: "group-hover:bg-emerald-100" },
    fire: { bg: "bg-orange-50", icon: "text-orange-900", hover: "group-hover:bg-orange-100" },
    space: { bg: "bg-indigo-50", icon: "text-indigo-800", hover: "group-hover:bg-indigo-100" }
};

export default function ModulesPage() {
    const router = useRouter();
    const { subscriptionStatus, userId } = usePhysiologyState();
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    const handleModuleClick = (moduleId: string) => {
        if (subscriptionStatus === 'active') {
            router.push(`/modules/${moduleId}`);
        } else {
            setIsUpgradeModalOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden p-6 md:p-14 pb-40">
            {/* Background elements - Optimized */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/5 to-transparent pointer-events-none -z-10 -mr-60 -mt-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent pointer-events-none -z-10 -ml-60 -mb-60" />

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-16 md:mb-24 flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                        <div className="w-8 h-0.5 md:w-12 md:h-1 bg-forest/20 rounded-full" />
                        <span className="text-[10px] md:text-sm font-black text-forest/60 uppercase tracking-[0.2em] md:tracking-[0.3em]">Genetic Core</span>
                        <div className="w-8 h-0.5 md:w-12 md:h-1 bg-forest/20 rounded-full" />
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter leading-none mb-5 md:mb-6">Life Principles</h1>
                    <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] max-w-sm px-4">Harmonize the inner mahabhutas</p>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
                    {MODULES.map((mod) => {
                        const styles = COLOR_MAP[mod.color];
                        return (
                            <button
                                onClick={() => handleModuleClick(mod.id)}
                                key={mod.id}
                                className="glass p-6 md:p-8 rounded-[2rem] shadow-premium flex flex-col items-center justify-center text-center transition-all duration-700 hover:shadow-xl hover:shadow-forest/10 hover:-translate-y-2 group relative overflow-hidden active:scale-95 border border-white/60 text-left w-full"
                            >
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${styles.bg} bg-opacity-40`} />

                                <div className="relative z-10 mb-6 flex flex-col items-center">
                                    <span className="text-xs md:text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6 block group-hover:text-forest transition-colors">{mod.element}</span>
                                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[1.8rem] md:rounded-[2.2rem] ${styles.bg} flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-premium border border-white/60`}>
                                        <mod.icon className={`w-10 h-10 md:w-12 md:h-12 ${styles.icon} opacity-90`} />
                                    </div>
                                </div>

                                <h3 className="font-black text-forest text-2xl md:text-4xl tracking-tighter relative z-10 leading-none">{mod.title}</h3>
                                <p className="text-xs md:text-sm text-slate-600 font-bold mt-5 tracking-tight relative z-10 max-w-[200px] leading-relaxed italic">{mod.subtitle}</p>

                                <div className="mt-12 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 relative z-10 w-full justify-center">
                                    <span className="text-xs font-black text-forest uppercase tracking-widest">Enter Sanctum</span>
                                    <Leaf className="w-4 h-4 text-forest animate-pulse" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}
