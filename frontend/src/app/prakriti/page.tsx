"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CloudSun, Wind, Flame, Droplets, Target, Compass } from "lucide-react";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { computeVikriti } from "@/engine/vikritiEngine";
import { getCurrentRitu } from "@/data/moduleRegistry";

// ─────────────────────────────────────────────────────────
// Drift Severity Tiers (Fix #6)
// ─────────────────────────────────────────────────────────

function driftSeverity(index: number): { label: string; color: string } {
    if (index < 10) return { label: "Stable", color: "text-emerald-600" };
    if (index < 20) return { label: "Mild Drift", color: "text-amber-600" };
    if (index < 35) return { label: "Moderate Drift", color: "text-orange-600" };
    return { label: "Severe Drift", color: "text-red-600" };
}

// ─────────────────────────────────────────────────────────
// Dosha Descriptions (Fix #10)
// ─────────────────────────────────────────────────────────

const DOSHA_DESCRIPTIONS: Record<string, string> = {
    Vata: "Movement & nervous system",
    Pitta: "Metabolism & heat regulation",
    Kapha: "Structure & lubrication",
};

export default function PrakritiPage() {
    const { state, isLoaded } = usePhysiologyState();

    // Fix #2: Memoize Vikriti computation to prevent re-instantiation every render
    const vikriti = useMemo(() => {
        if (!isLoaded) return null;
        return computeVikriti(state);
    }, [state, isLoaded]);

    // Fix #5: Dynamic season from engine
    const ritu = getCurrentRitu();

    // Fix #3: Read Prakriti from global physiology state (single source of truth)
    // instead of localStorage, which can desync across devices.
    const prakriti = useMemo(() => {
        if (!isLoaded || !state.is_onboarded) return null;
        return {
            type: `${state.prakriti_vata > state.prakriti_pitta && state.prakriti_vata > state.prakriti_kapha ? "Vata"
                : state.prakriti_pitta > state.prakriti_kapha ? "Pitta" : "Kapha"}-Dominant`,
            prakriti_vata: state.prakriti_vata,
            prakriti_pitta: state.prakriti_pitta,
            prakriti_kapha: state.prakriti_kapha,
        };
    }, [state, isLoaded]);

    // Also try to use the stored type string if available (from onboarding)
    const prakritiTypeLabel = useMemo(() => {
        if (typeof window === "undefined") return prakriti?.type || "";
        try {
            const stored = localStorage.getItem("prakriti_result");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed?.type) return parsed.type;
            }
        } catch { /* noop */ }
        return prakriti?.type || "";
    }, [prakriti]);

    const getDoshaIcon = (dosha: string) => {
        if (dosha === "Vata") return <Wind className="w-5 h-5 text-air" />;
        if (dosha === "Pitta") return <Flame className="w-5 h-5 text-fire" />;
        return <Droplets className="w-5 h-5 text-water" />;
    };

    const getDoshaColorClass = (dosha: string) => {
        if (dosha === "Vata") return "bg-air text-forest shadow-premium border border-white/20";
        if (dosha === "Pitta") return "bg-fire text-white shadow-premium border border-white/20";
        return "bg-earth text-forest shadow-premium border border-white/20";
    };

    // Fix #1: Use prakriti_vata/pitta/kapha directly (matches stored structure)
    const getPrakritiBars = () => {
        if (!prakriti) return null;
        const total = prakriti.prakriti_vata + prakriti.prakriti_pitta + prakriti.prakriti_kapha || 1;
        return [
            { id: "Vata", value: prakriti.prakriti_vata, pct: (prakriti.prakriti_vata / total) * 100, color: "bg-air" },
            { id: "Pitta", value: prakriti.prakriti_pitta, pct: (prakriti.prakriti_pitta / total) * 100, color: "bg-fire" },
            { id: "Kapha", value: prakriti.prakriti_kapha, pct: (prakriti.prakriti_kapha / total) * 100, color: "bg-water" }
        ];
    };

    // Fix #4: Remove artificial 100 floor from max — normalize purely against actual values
    const getVikritiBars = () => {
        if (!isLoaded) return [];
        const max = Math.max(state.vata, state.pitta, state.kapha) || 1;
        return [
            { id: "Vata", value: state.vata, pct: (state.vata / max) * 100, color: "bg-air" },
            { id: "Pitta", value: state.pitta, pct: (state.pitta / max) * 100, color: "bg-fire" },
            { id: "Kapha", value: state.kapha, pct: (state.kapha / max) * 100, color: "bg-water" }
        ];
    };

    const driftIndex = vikriti?.drift_index || 0;
    const severity = driftSeverity(driftIndex);

    return (
        <div className="flex flex-col min-h-screen bg-background relative overflow-hidden pb-40">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/10 to-transparent pointer-events-none -z-10 -mr-60 -mt-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent pointer-events-none -z-10 -ml-60 -mb-60" />

            {/* Header */}
            <header className="p-8 md:px-14 md:pt-24 pb-12 md:pb-16">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <ShieldCheck className="w-6 h-6 text-forest/40" />
                    <span className="text-[10px] md:text-sm font-black text-forest/60 uppercase tracking-[0.3em]">Genetic Intelligence</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter leading-none">Prakriti Core</h1>
            </header>

            <main className="px-6 md:px-14 flex flex-col gap-10 max-w-6xl w-full mx-auto justify-center">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Prakriti (Constitution) */}
                    <section className="glass p-8 md:p-12 rounded-[3rem] shadow-premium border border-white/60 relative overflow-hidden group hover:border-forest/20 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h2 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                            <Target className="w-4 h-4 text-forest/40" /> Biological Anchor
                        </h2>

                        {prakriti ? (
                            <>
                                <h3 className="text-3xl md:text-5xl font-black text-forest tracking-tighter mb-4">{prakritiTypeLabel}</h3>
                                <p className="text-sm md:text-base font-bold text-slate-500 max-w-md leading-relaxed mb-10">
                                    Your primal constitution is the permanent physiological frame determined at conception. It represents your absolute state of balance.
                                </p>

                                <div className="space-y-8">
                                    {getPrakritiBars()?.map((bar) => (
                                        <div key={bar.id}>
                                            <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                                                <span className="flex items-center gap-2">
                                                    {bar.id} Essence
                                                    <span className="text-[9px] font-bold text-slate-400 normal-case tracking-normal">{DOSHA_DESCRIPTIONS[bar.id]}</span>
                                                </span>
                                                <span className="text-forest">{bar.value}</span>
                                            </div>
                                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${bar.pct}%` }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                    className={`h-full ${bar.color} rounded-full shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center py-10 opacity-60">
                                <ShieldCheck className="w-12 h-12 text-slate-300 mb-4" />
                                <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-xs">
                                    Your constitution has not been mapped yet. Visit AyuOne to initialize your profile.
                                </p>
                            </div>
                        )}
                    </section>

                    {/* Vikriti (Current Imbalance) */}
                    <section className="glass p-8 md:p-12 rounded-[3rem] shadow-premium border border-white/60 relative overflow-hidden group hover:border-orange-500/20 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h2 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                            <Compass className="w-4 h-4 text-orange-400/60" /> Dynamic Recalibration
                        </h2>

                        {vikriti && isLoaded ? (
                            <>
                                <div className="flex items-center gap-5 mb-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getDoshaColorClass(vikriti.dominant_dosha)} shadow-sm`}>
                                        {getDoshaIcon(vikriti.dominant_dosha)}
                                    </div>
                                    <div>
                                        <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400 block mb-1">Dominant Flux</span>
                                        <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">{vikriti.dominant_dosha}</h3>
                                    </div>
                                </div>
                                <p className="text-sm md:text-base font-bold text-slate-500 max-w-md leading-relaxed mb-10">
                                    Vikriti tracks your daily biological fluctuations. It reveals where the environment or lifestyle is pulling you away from center.
                                </p>

                                <div className="space-y-8">
                                    {getVikritiBars()?.map((bar) => (
                                        <div key={bar.id}>
                                            <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                                                <span>{bar.id} Activity</span>
                                                <span className={bar.id === vikriti.dominant_dosha ? 'text-orange-600 font-extrabold' : 'text-slate-900'}>{Math.round(bar.value)}</span>
                                            </div>
                                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${bar.pct}%` }}
                                                    transition={{ duration: 1, delay: 0.4 }}
                                                    className={`h-full ${bar.color} ${bar.id === vikriti.dominant_dosha ? 'opacity-100' : 'opacity-40'} rounded-full`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full opacity-50">
                                <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-forest animate-spin" />
                            </div>
                        )}
                    </section>
                </div>

                {/* Engine Insight - Trend Synthesis */}
                <section className="bg-white/60 p-10 md:p-12 rounded-[3rem] shadow-premium border border-white/80 w-full mt-4">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-[1.5rem] bg-forest text-white flex items-center justify-center shadow-xl shadow-forest/20">
                            <CloudSun className="w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-forest uppercase tracking-[0.2em] mb-1">Dosha Trend Analysis</h2>
                            <p className="text-xs font-bold text-forest/40 uppercase tracking-widest leading-tight">Environmental Impact</p>
                        </div>
                    </div>
                    {isLoaded && prakriti ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Correlation</h4>
                                <p className="text-sm font-bold text-slate-600 leading-relaxed text-balance">
                                    Your core constitution is <strong className="text-forest">{prakritiTypeLabel}</strong>.
                                    Currently, your <strong className="text-orange-600">{vikriti?.dominant_dosha}</strong> is accumulating.
                                    Since it is <strong className="text-forest">{ritu.name}</strong>,
                                    the environmental backdrop carries <strong>{ritu.doshaRisk}</strong> risk.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Drift Severity</h4>
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-5xl font-black text-forest">{Math.round(driftIndex)}%</span>
                                    <span className={`text-sm font-black uppercase tracking-widest ${severity.color}`}>{severity.label}</span>
                                </div>
                                <p className="text-xs font-bold text-slate-500 leading-relaxed">
                                    {driftIndex >= 35
                                        ? "Critical deviation detected. Immediate protocol adjustments recommended — focus on the Pathya Plan in the Dashboard."
                                        : driftIndex >= 20
                                            ? "Notable drift. Focus on the Pathya Plan recommended in the Dashboard to stabilize."
                                            : driftIndex >= 10
                                                ? "Minor fluctuation. Continue your current rituals to prevent escalation."
                                                : "Your drift is minimal. You are largely aligned with your natural constitution."}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm font-bold text-slate-400 py-4">Insufficient data to calculate trends.</p>
                    )}
                </section>
            </main>
        </div>
    );
}
