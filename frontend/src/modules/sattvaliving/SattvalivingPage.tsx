"use client";
import React from 'react';
import { Leaf, Activity, CheckCircle2, BrainCircuit, Sparkles } from 'lucide-react';
import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/recommendationEngine';
import { PersonalizationResult } from '@/ai/modulePersonalizationEngine';
import { getBehaviorInsight } from './behaviorLogic';

interface SattvalivingPageProps {
    state: VedaState;
    vikriti: any;
    protocols: Protocol[];
    aiRoutine: PersonalizationResult | null;
    isPremium: boolean;
    isGenerating: boolean;
    onGenerate: () => void;
}

export default function SattvalivingPage({
    state,
    vikriti,
    protocols,
    aiRoutine,
    isPremium,
    isGenerating,
    onGenerate
}: SattvalivingPageProps) {
    const behaviorInsight = getBehaviorInsight(state);

    return (
        <div className="space-y-8">
            <section className="glass rounded-[3rem] p-10 md:p-12 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-forest/5 flex items-center justify-center text-forest">
                        <Leaf className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-1">Dharma Logic</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Lifestyle Harmony</p>
                    </div>
                </div>
                <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed mb-10 border-l-4 border-forest/20 pl-6 text-balance">
                    Sattva is the quality of clarity, harmony, and balance. Daily behavioral rituals cultivate inner purity and prevent disease.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Screen Exposure</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">{Math.round(state.screen_exposure)}%</p>
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Social Health</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">
                            {state.stress_load < 30 ? "Harmonious" : "Aggravated"}
                        </p>
                    </div>
                </div>
            </section>

            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-green-50 flex items-center justify-center text-green-600">
                        <Activity className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-black text-forest uppercase tracking-[0.2em]">Lifestyle Guidance</p>
                </div>
                <div className="bg-green-50/50 p-8 rounded-[2rem] border border-green-100/50">
                    <p className="text-lg font-bold text-green-900 leading-snug italic">"{behaviorInsight}"</p>
                </div>
            </section>

            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">Lifestyle Protocols</h2>
                </div>
                <div className="space-y-4">
                    {protocols.map((p, i) => (
                        <div key={i} className="bg-white/60 p-6 md:p-8 rounded-[2rem] border border-slate-100 hover:bg-white transition-colors">
                            <h4 className="font-black text-xl text-forest tracking-tighter mb-1">{p.name}</h4>
                            <p className="text-[11px] font-bold text-slate-500 max-w-lg">{p.instructions}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
