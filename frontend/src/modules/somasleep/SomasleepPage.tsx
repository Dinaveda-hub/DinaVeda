"use client";
import React from 'react';
import { Moon, Sunrise, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/recommendationEngine';
import { PersonalizationResult } from '@/ai/modulePersonalizationEngine';
import { getSleepInsight } from './sleepLogic';

interface SomasleepPageProps {
    state: VedaState;
    vikriti: any;
    protocols: Protocol[];
    aiRoutine: PersonalizationResult | null;
    isPremium: boolean;
    isGenerating: boolean;
    onGenerate: () => void;
}

export default function SomasleepPage({
    state,
    vikriti,
    protocols,
    aiRoutine,
    isPremium,
    isGenerating,
    onGenerate
}: SomasleepPageProps) {
    const sleepInsight = getSleepInsight(state);

    return (
        <div className="space-y-8">
            <section className="glass rounded-[3rem] p-10 md:p-12 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-indigo-50 flex items-center justify-center text-indigo-500">
                        <Moon className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-1">Nidra Logic</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Biological Rest</p>
                    </div>
                </div>
                <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed mb-10 border-l-4 border-indigo-300 pl-6 text-balance">
                    Nidra is the natural state of restoration. Proper sleep provides strength, immunity, and cognitive clarity.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Circadian Sync</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">{Math.round(state.circadian_alignment)}%</p>
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Sleep Debt</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">{Math.round(state.sleep_debt)}%</p>
                    </div>
                </div>
            </section>

            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-indigo-50 flex items-center justify-center text-indigo-500">
                        <Sunrise className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-black text-forest uppercase tracking-[0.2em]">Sleep Guidance</p>
                </div>
                <div className="bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100/50">
                    <p className="text-lg font-bold text-indigo-900 leading-snug italic">"{sleepInsight}"</p>
                </div>
            </section>

            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">Circadian Protocols</h2>
                </div>
                <div className="space-y-4">
                    {protocols.map((p, i) => (
                        <div key={i} className="bg-white/60 p-6 md:p-8 rounded-[2rem] border border-slate-100 group hover:bg-white transition-colors">
                            <h4 className="font-black text-xl text-forest tracking-tighter mb-1">{p.name}</h4>
                            <p className="text-[11px] font-bold text-slate-500 max-w-lg mb-2">{p.instructions}</p>
                            <div className="text-[9px] font-black uppercase text-slate-400 italic">{p.time_of_day} focus</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
