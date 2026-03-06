"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft, BrainCircuit, Activity, Moon, Utensils,
    Zap, CloudSun, Leaf, CheckCircle2,
    ListChecks, Clock, ChevronRight, Wind, Flame
} from "lucide-react";
import { motion } from "framer-motion";
import { useVedaState } from "@/engine/useVedaState";
import { VikritiEngine } from "@/engine/vikritiEngine";
import { RecommendationEngine } from "@/engine/recommendationEngine";

const moduleData: Record<string, any> = {
    somasleep: {
        title: "Somasleep",
        subtitle: "Nidra & Sleep Architecture",
        icon: Moon,
        principles: "Nidra is the natural state of restoration. Proper Sleep provides strength, immunity, and cognitive clarity.",
        vedaInsight: "The Charaka Samhita defines Nidra as one of the 'Trayopastambha' (Three Pillars of Life). It is essential for the nourishment of Ojas.",
        stats: [
            { label: "Circadian Sync", getValue: (s: any) => `${Math.round(s.circadian_alignment)}%` },
            { label: "Sleep Quality", getValue: (s: any) => s.circadian_alignment > 80 ? "Restorative" : "Disrupted" }
        ]
    },
    nutriveda: {
        title: "Nutriveda",
        subtitle: "Ahara & Food Medicine",
        icon: Utensils,
        principles: "Ahara is the primary source of biological fuel. When diet is correct, medicine is of no need.",
        vedaInsight: "Ahara dictates the quality of all seven Dhatus (tissues).",
        stats: [
            { label: "Agni Strength", getValue: (s: any) => `${Math.round(s.agni_strength)}/100` },
            { label: "Metabolic State", getValue: (s: any) => s.agni_strength > 75 ? "Teekshna (Sharp)" : s.agni_strength > 50 ? "Sama (Balanced)" : "Manda (Dull)" }
        ]
    },
    dinaveda: {
        title: "Dinaveda",
        subtitle: "Dinacharya & Daily Rituals",
        icon: Activity,
        principles: "Mastery over the self begins with mastery over the day. Daily rhythm establishes the biological clock.",
        vedaInsight: "Dinacharya aligns your individual biological rhythm with the cosmic solar cycle to prevent chronic imbalances.",
        stats: [
            { label: "Ojas Core", getValue: (s: any) => `${Math.round(s.ojas_score)}` },
            { label: "Vitality State", getValue: (s: any) => s.ojas_score > 85 ? "Excellent" : "Stable" }
        ]
    },
    rutuveda: {
        title: "Rutuveda",
        subtitle: "Ritucharya & Seasonality",
        icon: CloudSun,
        principles: "As the universe shifts, so must the inner biological fire. Harmony with seasons prevents disease.",
        vedaInsight: "Each Ritu (season) requires specific shifts in Ahara and Vihara. Kapha accumulates in winter and melts in spring.",
        stats: [
            { label: "Current Ritu", getValue: (s: any) => "Vasanta (Spring)" },
            { label: "Dosha Risk", getValue: (s: any, v: any) => v.dominant_dosha }
        ]
    },
    ayufit: {
        title: "Ayufit",
        subtitle: "Vyayama & Movement",
        icon: Zap,
        principles: "Movement should provide lightness and strength without exhaustion. Exercise to half capacity.",
        vedaInsight: "Vyayama brings 'Laghava' (lightness) to the body. Excessive exercise generates Vata.",
        stats: [
            { label: "Physical Strain", getValue: (s: any) => s.vata_state > 15 ? "High Vata" : "Balanced" },
            { label: "Movement Pulse", getValue: (s: any) => "Stable" }
        ]
    },
    manasayur: {
        title: "Manasayur",
        subtitle: "Sadvritta & Mental Flow",
        icon: BrainCircuit,
        principles: "The mind follows the body, and the body follows the mind. Cognitive clarity is the ultimate Ojas.",
        vedaInsight: "Mental hygiene prevents Pragyaparadha (crimes against wisdom).",
        stats: [
            { label: "Mental Clarity", getValue: (s: any) => s.vata_state < 10 ? "Clear (Sattvic)" : "Active (Rajasic)" },
            { label: "Stress Load", getValue: (s: any) => s.ojas_score < 70 ? "Elevated" : "Low" }
        ]
    }
};

export default function ModuleDetail({ params }: { params: any }) {
    const [slug, setSlug] = useState<string>("");

    // Engine State
    const { state, isLoaded } = useVedaState();

    useEffect(() => {
        params.then((p: any) => {
            setSlug(p.slug);
        });
    }, [params]);

    if (!slug || !isLoaded) return null;

    const mod = moduleData[slug] || moduleData.dinaveda;
    const Icon = mod.icon;

    // Calculate deterministic recommendations
    const vikritiEngine = new VikritiEngine();
    const vikriti = vikritiEngine.calculateMetrics(state);
    const recEngine = new RecommendationEngine();
    const allRecs = recEngine.getRecommendations(state, vikriti);
    const moduleRecs = recEngine.getModuleProtocols(slug, allRecs);

    // Fallback if no specific recommendations trigger for this module
    const displayRecs = moduleRecs.length > 0 ? moduleRecs : [
        {
            name: "Maintain Baseline",
            desc: "Your current signals for this domain are balanced.",
            time: "Daily",
            detail: "Continue your existing routine. No acute interventions required."
        }
    ];

    const getDoshaIcon = (dosha: string) => {
        if (dosha === "Vata") return <Wind className="w-5 h-5 text-air" />;
        if (dosha === "Pitta") return <Flame className="w-5 h-5 text-fire" />;
        return <Leaf className="w-5 h-5 text-earth" />;
    };

    return (
        <div className="bg-[#F8FAF9] min-h-screen font-sans pb-40 relative overflow-x-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest/5 rounded-full -mr-40 -mt-40 blur-[120px]" />
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -ml-40" />

            {/* Header Section */}
            <header className="pt-20 pb-36 px-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <Link href="/modules" className="inline-flex items-center gap-3 mb-12 bg-white/60 hover:bg-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all backdrop-blur-md border border-slate-100 text-slate-500 hover:text-forest group shadow-sm">
                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Dashboard
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="w-20 h-20 bg-white shadow-premium border border-slate-100 rounded-[2rem] flex items-center justify-center mb-8">
                            <Icon className="w-10 h-10 text-forest" />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-forest tracking-tighter mb-4 leading-none">{mod.title}</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">{mod.subtitle}</p>
                    </motion.div>
                </div>
            </header>

            {/* Main Analytical View */}
            <main className="px-6 -mt-24 relative z-20 space-y-8 max-w-4xl mx-auto">

                {/* Section 1: Guiding Intelligence */}
                <section className="glass rounded-[3rem] p-10 md:p-12 shadow-premium border border-white">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-[1.2rem] bg-forest/5 flex items-center justify-center text-forest">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-1">Guiding Principle</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight text-balance">Classical Ayurvedic Logic</p>
                        </div>
                    </div>
                    <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed mb-10 border-l-4 border-forest/20 pl-6 text-balance">
                        {mod.principles}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mod.stats.map((stat: any, i: number) => (
                            <div key={i} className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</p>
                                <p className="text-3xl font-black text-forest tracking-tighter">{stat.getValue(state, vikriti)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2: Engine Status & Dosha Drift */}
                <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-[1.2rem] bg-orange-50 flex items-center justify-center text-orange-500">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-1">State Analysis</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Deterministically computed from your pulse</p>
                        </div>
                    </div>
                    <div className="bg-white/60 rounded-[2rem] p-8 border border-slate-100 flex flex-col md:flex-row items-center gap-8 justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-forest/5 rounded-2xl flex items-center justify-center">
                                {getDoshaIcon(vikriti.dominant_dosha)}
                            </div>
                            <div>
                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Primary Drift</span>
                                <span className="block text-3xl font-black text-forest tracking-tighter">{vikriti.dominant_dosha} Aggravation</span>
                            </div>
                        </div>
                        <div className="h-12 w-px bg-slate-200 hidden md:block" />
                        <div className="flex flex-col items-center md:items-end w-full md:w-auto text-center md:text-right">
                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Drift Severity</span>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-black text-slate-700">{Math.round(vikriti.drift_index)}%</span>
                                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-forest rounded-full transition-all"
                                        style={{ width: `${Math.min(100, vikriti.drift_index)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Recommended Protocols */}
                <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-[1.2rem] bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <ListChecks className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-1">Recommended Protocols</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Static Ruleset execution</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {displayRecs.map((practice: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/60 p-6 md:p-8 rounded-[2rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-slate-100 hover:bg-white transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center text-forest shrink-0 mt-1">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-xl text-forest tracking-tighter mb-1">{practice.name}</h4>
                                        <p className="text-[11px] font-bold text-slate-500 leading-relaxed max-w-lg mb-2">{practice.detail}</p>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 inline-flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full">
                                            Priority Action
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-slate-50 px-4 py-2 rounded-xl shrink-0">
                                    <Clock className="w-3 h-3" /> {practice.time}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}
