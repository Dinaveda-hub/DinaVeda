import React from 'react';
import { Zap, Activity, BrainCircuit, Clock, CheckCircle2, Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';
import { getMovementInsight } from './movementLogic';
import { formatProtocolName } from '@/utils/stringUtils';
import ProtocolCard from '@/components/modules/ProtocolCard';

interface AyufitPageProps {
    state: VedaState;
    vikriti: any;
    protocols: Protocol[];
    subscriptionStatus: string;
    userId: string | null;
}


export default function AyufitPage({
    state,
    vikriti,
    protocols,
    subscriptionStatus,
    userId
}: AyufitPageProps) {
    const movementInsight = getMovementInsight(state);

    return (
        <div className="space-y-8">
            {/* Principle Section */}
            <section className="glass rounded-[3rem] p-6 md:p-12 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-orange-50 flex items-center justify-center text-orange-600">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em] mb-1">Vyayama Logic</h2>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest leading-tight">Flow & Vitality</p>
                    </div>
                </div>
                <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed mb-10 border-l-4 border-forest/20 pl-6 text-balance">
                    Movement should provide lightness and strength without exhaustion. Exercise to half capacity to preserve Ojas.
                </p>
            </section>

            {/* Movement Insight */}
            <section className="glass rounded-[3rem] p-6 md:p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-emerald-50 flex items-center justify-center text-emerald-700">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-forest uppercase tracking-[0.2em]">AI Movement Insight</p>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Neural Recommendation</p>
                    </div>
                </div>
                <div className="bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100/50">
                    <p className="text-lg font-bold text-emerald-900 leading-snug italic">"{movementInsight}"</p>
                </div>
            </section>

            {/* Protocols */}
            <section className="glass rounded-[3rem] p-6 md:p-10 shadow-premium border border-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-[1.2rem] bg-slate-50 flex items-center justify-center text-slate-600">
                        <Activity className="w-6 h-6" />
                    </div>
                    <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">Active Protocols</h2>
                </div>
                <div className="space-y-6">
                    {protocols?.length > 0 ? (
                        protocols.map((p) => (
                            <ProtocolCard
                                key={p.name}
                                protocol={p}
                                subscriptionStatus={subscriptionStatus}
                                userId={userId}
                            />
                        ))
                    ) : (
                        <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-dashed border-slate-200 text-center">
                            <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">No movement protocols recommended today.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
