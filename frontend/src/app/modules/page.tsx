"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Leaf } from "lucide-react";
import { MODULES } from "@/data/moduleRegistry";

const COLOR_MAP = {
    air: { bg: "bg-blue-50", icon: "text-blue-700" },
    water: { bg: "bg-teal-50", icon: "text-teal-700" },
    earth: { bg: "bg-emerald-50", icon: "text-emerald-700" },
    fire: { bg: "bg-orange-50", icon: "text-orange-700" },
    space: { bg: "bg-indigo-50", icon: "text-indigo-700" }
};

export default function ModulesPage() {
    const router = useRouter();

    const handleModuleClick = useCallback((moduleId: string) => {
        router.push(`/modules/${moduleId}`);
    }, [router]);

    return (
        <div className="min-h-screen bg-background relative overflow-hidden px-6 md:px-12 py-14 pb-40">
            {/* Background elements - Optimized for performance */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/5 to-transparent pointer-events-none -z-10 -mr-40 -mt-40 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent pointer-events-none -z-10 -ml-40 -mb-40 blur-3xl" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="text-center mb-16">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-forest/90 mb-3">
                        Life Architecture
                    </p>
                    <h1 className="text-4xl md:text-6xl font-black text-forest tracking-tight">
                        Ayurvedic Modules
                    </h1>
                    <p className="text-sm text-slate-500 font-semibold mt-3">
                        Seven domains of physiological balance
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MODULES.map((mod) => {
                        const styles = COLOR_MAP[mod.color as keyof typeof COLOR_MAP] ?? COLOR_MAP.earth;
                        return (
                            <button
                                onClick={() => handleModuleClick(mod.id)}
                                key={mod.id}
                                aria-label={`Open ${mod.title} module`}
                                className="group bg-white rounded-[2rem] border border-slate-100 p-8 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 shadow-sm relative overflow-hidden"
                            >
                                {/* Soft interaction layer */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.bg} bg-opacity-30`} />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-2xl ${styles.bg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                                        <mod.icon className={`w-8 h-8 ${styles.icon}`} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-black text-forest mb-2 tracking-tight">
                                        {mod.title}
                                    </h3>
                                    <p className="text-sm font-semibold text-slate-500 mb-6 leading-relaxed italic">
                                        {mod.subtitle}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center gap-2 text-[10px] font-black text-forest uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                        Enter Sanctum
                                        <Leaf className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
