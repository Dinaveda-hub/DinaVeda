import React from 'react';
import { BrainCircuit, Wind, CheckCircle2, Clock, Sparkles, Lock } from 'lucide-react';
import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';
import { getMindInsight } from './mindLogic';

interface ManasayurPageProps {
    state: VedaState;
    vikriti: any;
    protocols: Protocol[];
}

const humanizeSlug = (slug: string) => {
    return slug
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default function ManasayurPage({
    state,
    vikriti,
    protocols,
}: ManasayurPageProps) {
    const mindInsight = getMindInsight(state);

    return (
        <div className="space-y-8">
            <section className="glass rounded-[3rem] p-10 md:p-12 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-indigo-50 flex items-center justify-center text-indigo-500">
                        <BrainCircuit className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-1">Manas Logic</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Mind-Body Flow</p>
                    </div>
                </div>
                <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed mb-10 border-l-4 border-indigo-200 pl-6 text-balance">
                    The mind follows the body, and the body follows the mind. Cognitive clarity (Sattva) is the ultimate Ojas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Mental Clarity</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">{Math.round(state.mental_clarity)}%</p>
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Stress Load</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">{Math.round(state.stress_load)}%</p>
                    </div>
                </div>
            </section>

            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-indigo-50 flex items-center justify-center text-indigo-500">
                        <Wind className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-black text-forest uppercase tracking-[0.2em]">Mind Guidance</p>
                </div>
                <div className="bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100/50">
                    <p className="text-lg font-bold text-indigo-900 leading-snug italic">"{mindInsight}"</p>
                </div>
            </section>

            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">Pranamaya Protocols</h2>
                </div>
                <div className="space-y-4">
                    {protocols.map((p, i) => (
                        <div key={i} className="bg-white/60 p-6 md:p-8 rounded-[2rem] border border-slate-100 flex justify-between items-center group hover:bg-white transition-colors">
                            <div>
                                <h4 className="font-black text-xl text-forest tracking-tighter mb-1">{humanizeSlug(p.name)}</h4>
                                <p className="text-[11px] font-bold text-slate-500 max-w-lg">{p.instructions}</p>
                            </div>
                            <Clock className="w-4 h-4 text-slate-300" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
