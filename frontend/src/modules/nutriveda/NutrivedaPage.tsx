"use client";
import React, { useState } from 'react';
import { Utensils, Flame, BrainCircuit, Activity, Clock, CheckCircle2, Zap, ShoppingBasket, TrendingUp, Sparkles, Lock } from 'lucide-react';
import { useSubscription } from "@/hooks/useSubscription";
import UpgradeModal from "@/components/billing/UpgradeModal";
import { motion } from 'framer-motion';
import { VedaState } from '@/engine/stateModel';
import { Protocol } from '@/engine/protocolSelectionEngine';
import { PersonalizationResult } from '@/ai/modulePersonalizationEngine';
import { getAgniInsight } from './dietLogic';

interface NutrivedaPageProps {
    state: VedaState;
    vikriti: any;
    protocols: Protocol[];
    aiRoutine: PersonalizationResult | null;
    // isPremium: boolean; // Removed, now from hook
    // isGenerating: boolean; // Removed, now handled internally or by AI section
    // onGenerate: () => void; // Removed, now handled internally or by AI section
}

export default function NutrivedaPage({
    state,
    vikriti,
    protocols,
    aiRoutine,
}: NutrivedaPageProps) {
    const { isPremium, userId, getSmartTrigger } = useSubscription();
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    // Agni Metrics
    const agniStrength = state.agni_strength || 50;

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
                        <p className="text-3xl font-black text-forest tracking-tighter">{Math.round(agniStrength)}/100</p>
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Metabolic Pulse</p>
                        <p className="text-3xl font-black text-forest tracking-tighter">
                            {agniStrength > 75 ? "Teekshna" : agniStrength > 50 ? "Sama" : "Manda"}
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

            {/* Premium AI Insights Section */}
            <section className="glass rounded-[3rem] p-10 shadow-premium border border-white">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-forest/10 rounded-xl text-forest">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-black text-forest tracking-tight">AI Personalized Diet</h3>
                    </div>
                    {!isPremium && (
                        <span className="bg-gold/10 text-gold-dark text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Premium
                        </span>
                    )}
                </div>

                {isPremium ? (
                    <div className="glass p-8 rounded-[2rem] border-white/40 shadow-premium">
                        <p className="text-slate-600 font-medium leading-relaxed mb-6">
                            Based on your current Agni strength ({agniStrength}%) and {state.rutu_season} seasonal multipliers,
                            your personalized diet should focus on warm, light, and easily digestible foods.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/50 p-4 rounded-2xl border border-white/50">
                                <h4 className="text-xs font-black text-forest uppercase tracking-widest mb-2">Recommended Meals</h4>
                                <ul className="text-sm font-bold text-slate-600 space-y-1">
                                    <li>• Moong Dal Kitchari</li>
                                    <li>• Steamed seasonal greens</li>
                                    <li>• Ginger infusion to stoke Agni</li>
                                </ul>
                            </div>
                            <div className="bg-white/50 p-4 rounded-2xl border border-white/50">
                                <h4 className="text-xs font-black text-amber-600 uppercase tracking-widest mb-2">Avoid Today</h4>
                                <ul className="text-sm font-bold text-slate-600 space-y-1">
                                    <li>• Cold beverages</li>
                                    <li>• Heavy dairy products</li>
                                    <li>• Raw salads in the evening</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="glass p-12 rounded-[2rem] border-white/40 shadow-premium text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10" />
                        <div className="relative z-20">
                            <div className="w-12 h-12 bg-forest/5 rounded-full flex items-center justify-center text-forest mx-auto mb-4">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-black text-slate-800 mb-2">Unlock AI Diet Personalization</h4>
                            <p className="text-sm font-bold text-slate-500 mb-6 max-w-xs mx-auto">
                                Get daily meal plans specifically tailored to your real-time Agni and seasonal context.
                            </p>
                            <button
                                onClick={() => setIsUpgradeModalOpen(true)}
                                className="bg-forest text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-forest/20 hover:scale-105 transition-all"
                            >
                                Upgrade to Premium
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {userId && (
                <UpgradeModal
                    isOpen={isUpgradeModalOpen}
                    onClose={() => setIsUpgradeModalOpen(false)}
                    userId={userId}
                    contextualMessage={getSmartTrigger(state)}
                />
            )}
        </div>
    );
}
