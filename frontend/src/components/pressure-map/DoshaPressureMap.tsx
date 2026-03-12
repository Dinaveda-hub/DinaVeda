"use client";

import { Flame, Moon, Zap, BrainCircuit, Heart } from "lucide-react";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import DoshaTriangle from "./DoshaTriangle";
import PhysiologyRadar from "./PhysiologyRadar";
import BodySystemBar from "./BodySystemBar";
import PressureExplanation from "./PressureExplanation";

/**
 * DoshaPressureMap — Full physiological visualization cockpit.
 *
 * Layout:
 *   Dosha Triangle (balance vis)
 *   Physiology Radar (multi-system spider)
 *   Body System Bars (individual metrics)
 *   Pressure Explanation (Ayurvedic interpretation)
 */
export default function DoshaPressureMap() {
    const { state, isLoaded } = usePhysiologyState();

    if (!isLoaded) return null;

    const radarAxes = [
        { label: "Agni", value: state.agni, color: "#F97316" },
        { label: "Circadian", value: state.circadian, color: "#3B82F6" },
        { label: "Stress", value: 100 - state.stress, color: "#8B5CF6" }, // Invert: higher = better
        { label: "Energy", value: state.energy, color: "#10B981" },
        { label: "Ojas", value: state.ojas, color: "#D97706" },
    ];

    return (
        <section className="w-full glass p-6 md:p-10 rounded-[2.5rem] border border-white/60 shadow-premium">

            {/* Header */}
            <h2 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <Heart className="w-4 h-4 text-forest/40" /> Dosha Pressure Map
            </h2>

            {/* Two-column layout: Triangle + Radar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                {/* Dosha Triangle */}
                <div className="flex flex-col items-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Dosha Balance</p>
                    <DoshaTriangle
                        vata={state.vata}
                        pitta={state.pitta}
                        kapha={state.kapha}
                    />
                </div>

                {/* Physiology Radar */}
                <div className="flex flex-col items-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">System Vitality</p>
                    <PhysiologyRadar axes={radarAxes} />
                </div>
            </div>

            {/* Body System Bars */}
            <div className="space-y-5">
                <BodySystemBar label="Agni" value={state.agni} icon={<Flame className="w-3 h-3 text-orange-500" />} />
                <BodySystemBar label="Sleep" value={state.sleep} icon={<Moon className="w-3 h-3 text-blue-500" />} />
                <BodySystemBar label="Stress" value={state.stress} icon={<Zap className="w-3 h-3 text-red-400" />} />
                <BodySystemBar label="Circadian" value={state.circadian} icon={<Moon className="w-3 h-3 text-indigo-500" />} />
                <BodySystemBar label="Energy" value={state.energy} icon={<Zap className="w-3 h-3 text-emerald-500" />} />
                <BodySystemBar label="Clarity" value={state.mental_clarity} icon={<BrainCircuit className="w-3 h-3 text-violet-500" />} />
            </div>

            {/* Interpretation */}
            <PressureExplanation
                vata={state.vata}
                pitta={state.pitta}
                kapha={state.kapha}
                sleep={state.sleep}
                stress={state.stress}
            />
        </section>
    );
}
