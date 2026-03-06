import React from 'react';
import { Zap, Activity, BrainCircuit, Clock, CheckCircle2, Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';
import { getMovementInsight } from './movementLogic';
import { humanizeProtocolName } from '@/utils/stringUtils';

interface AyufitPageProps {
    state: VedaState;
    vikriti: any;
    protocols: Protocol[];
}


export default function AyufitPage({
    state,
    vikriti,
    protocols,
}: AyufitPageProps) {
    const movementInsight = getMovementInsight(state);

    return (
        <div className="space-y-8">
            <section className="glass rounded-[3rem] p-10 md:p-12 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-forest/5 flex items-center justify-center text-forest">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-1">Vyayama Logic</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">Movement for Vitality</p>
                    </div>
                </div>
                <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed mb-10 border-l-4 border-forest/20 pl-6 text-balance">
                    Movement should provide lightness and strength without exhaustion. Exercise to half capacity (Ardhashakti).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Dosha Tension</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">
                            {state.vata_state > 50 ? "High Vata" : state.kapha_state > 50 ? "High Kapha" : "Balanced"}
                        </p>
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Movement Pulse</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">{Math.round(state.movement_level)}%</p>
                    </div>
                </div>
            </section>

            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-blue-50 flex items-center justify-center text-blue-500">
                        <Zap className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-black text-forest uppercase tracking-[0.2em]">Activity Guidance</p>
                </div>
                <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100/50">
                    <p className="text-lg font-bold text-blue-900 leading-snug italic">"{movementInsight}"</p>
                </div>
            </section>

            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">Active Protocols</h2>
                </div>
                <div className="space-y-4">
                    {protocols.map((p, i) => (
                        <div key={i} className="bg-white/60 p-6 md:p-8 rounded-[2rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-slate-100 hover:bg-white transition-colors">
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="w-5 h-5 text-forest mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-black text-xl text-forest tracking-tighter mb-1">{humanizeProtocolName(p.name)}</h4>
                                    <p className="text-xs font-bold text-slate-500 leading-relaxed max-w-lg">{p.instructions}</p>
                                </div>
                            </div>
                            <div className="text-xs font-black text-slate-400">{p.time_of_day}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
