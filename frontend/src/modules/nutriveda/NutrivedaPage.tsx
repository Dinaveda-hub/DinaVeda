"use client";
import React from 'react';
import { Utensils, Flame, BrainCircuit, Activity, Clock, CheckCircle2, Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/recommendationEngine';
import { PersonalizationResult } from '@/ai/modulePersonalizationEngine';
import { getAgniInsight } from './dietLogic';

interface NutrivedaPageProps {
    state: VedaState;
    vikriti: any;
    protocols: Protocol[];
    aiRoutine: PersonalizationResult | null;
    isPremium: boolean;
    isGenerating: boolean;
    onGenerate: () => void;
}

export default function NutrivedaPage({
    state,
    vikriti,
    protocols,
    aiRoutine,
    isPremium,
    isGenerating,
    onGenerate
}: NutrivedaPageProps) {
    const agniInsight = getAgniInsight(state);

    return (
        <div className="space-y-8">
            {/* Principle Section */}
            <section className="glass rounded-[3rem] p-10 md:p-12 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-forest/5 flex items-center justify-center text-forest">
                        <BrainCircuit className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-1">Ahara Logic</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Food as Medicine</p>
                    </div>
                </div>
                <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed mb-10 border-l-4 border-forest/20 pl-6 text-balance">
                    Ahara is the primary source of biological fuel. When diet is correct, medicine is of no need.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Agni Strength</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">{Math.round(state.agni_strength)}/100</p>
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Metabolic Pulse</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">
                            {state.agni_strength > 75 ? "Teekshna" : state.agni_strength > 50 ? "Sama" : "Manda"}
                        </p>
                    </div>
                </div>
            </section>

            {/* Agni Insight */}
            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-orange-50 flex items-center justify-center text-orange-500">
                        <Flame className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-black text-forest uppercase tracking-[0.2em]">Agni Guidance</p>
                </div>
                <div className="bg-orange-50/50 p-8 rounded-[2rem] border border-orange-100/50">
                    <p className="text-lg font-bold text-orange-900 leading-snug italic">"{agniInsight}"</p>
                </div>
            </section>

            {/* Protocols */}
            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Activity className="w-6 h-6" />
                    </div>
                    <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">Dietary Protocols</h2>
                </div>
                <div className="space-y-4">
                    {protocols.map((p, i) => (
                        <div key={i} className="bg-white/60 p-6 md:p-8 rounded-[2rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-slate-100 hover:bg-white transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center text-forest shrink-0 mt-1">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-black text-xl text-forest tracking-tighter mb-1">{p.name}</h4>
                                    <p className="text-[11px] font-bold text-slate-500 leading-relaxed max-w-lg">{p.instructions}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-slate-50 px-4 py-2 rounded-xl">
                                <Clock className="w-3 h-3" /> {p.time_of_day}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* AI Layer (Optional) */}
            {isPremium && (
                <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-[1.2rem] bg-amber-50 flex items-center justify-center text-amber-500">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">AI Meal Plan</h2>
                    </div>
                    {isGenerating ? (
                        <div className="text-center py-10 animate-pulse text-amber-600 font-bold uppercase tracking-widest text-xs">
                            Personalizing your diet...
                        </div>
                    ) : aiRoutine ? (
                        <div className="bg-white/70 rounded-[2rem] p-8 border border-slate-100 text-sm leading-relaxed whitespace-pre-wrap font-medium text-slate-700">
                            {aiRoutine.content}
                        </div>
                    ) : (
                        <div className="text-center">
                            <button onClick={onGenerate} className="px-8 py-3 rounded-full bg-forest text-white font-black text-[11px] uppercase tracking-[0.2em]">
                                Generate AI Routine
                            </button>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}
