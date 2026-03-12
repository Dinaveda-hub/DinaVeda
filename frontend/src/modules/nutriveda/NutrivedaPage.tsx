import React from 'react';
import { Utensils, Flame, BrainCircuit, Activity, Clock, CheckCircle2, Zap, ShoppingBasket, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';
import { getAgniInsight } from './dietLogic';
import { formatProtocolName } from '@/utils/stringUtils';
import FoodGuidance from '@/components/modules/FoodGuidance';
import ProtocolCard from '@/components/modules/ProtocolCard';

interface NutrivedaPageProps {
    state: VedaState;
    vikriti: any;
    protocols: Protocol[];
    subscriptionStatus: string;
    userId: string | null;
}


export default function NutrivedaPage({
    state,
    vikriti,
    protocols,
    subscriptionStatus,
    userId
}: NutrivedaPageProps) {
    // Agni Metrics
    const agniStrength = state.agni || 50;
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
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest leading-tight">Food as Medicine</p>
                    </div>
                </div>
                <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed mb-10 border-l-4 border-forest/20 pl-6 text-balance">
                    Ahara is the primary source of biological fuel. When diet is correct, medicine is of no need.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-xs font-black text-slate-600 uppercase tracking-[0.3em]">Agni Strength</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">{Math.round(agniStrength)}/100</p>
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-xs font-black text-slate-600 uppercase tracking-[0.3em]">Metabolic Pulse</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">
                            {agniStrength > 75 ? "Teekshna" : agniStrength > 50 ? "Balanced" : "Manda"}
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
                    <div className="w-12 h-12 rounded-[1.2rem] bg-emerald-50 flex items-center justify-center text-emerald-700">
                        <Activity className="w-6 h-6" />
                    </div>
                    <h2 className="text-sm font-black text-forest uppercase tracking-[0.2em]">Dietary Protocols</h2>
                </div>
                <div className="space-y-6">
                    {protocols.map((p, i) => (
                        <ProtocolCard
                            key={i}
                            protocol={p}
                            subscriptionStatus={subscriptionStatus}
                            userId={userId}
                        >
                            <FoodGuidance recommended={p.recommended_foods} avoid={p.avoid_foods} />
                        </ProtocolCard>
                    ))}
                </div>
            </section>
        </div>
    );
}
