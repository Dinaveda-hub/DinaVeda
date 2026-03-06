"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  CloudSun, ShieldCheck, Flame, Compass, Moon,
  Sunrise, Sun, Sunset, AlertCircle, CheckCircle2,
  Sparkles, Leaf, Activity
} from "lucide-react";
import { useVedaState } from "@/engine/useVedaState";
import { VikritiEngine } from "@/engine/vikritiEngine";
import { RecommendationEngine } from "@/engine/recommendationEngine";
import { HealthScoreEngine } from "@/engine/healthScoreEngine";
import { PredictionEngine } from "@/engine/predictionEngine";
import { compileDailyProtocols, CompiledProtocolItem } from "@/engine/dailyProtocolCompiler";

export default function Dashboard() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    }
  };

  const { state, isLoaded } = useVedaState();
  const vikritiEngine = new VikritiEngine();
  const vikriti = isLoaded ? vikritiEngine.calculateMetrics(state) : null;
  const recEngine = new RecommendationEngine();
  const healthEngine = new HealthScoreEngine();
  const predictionEngine = new PredictionEngine();

  const ojasBalance = isLoaded && vikriti ? healthEngine.calculateOjasBalance(state, vikriti.drift_index) : null;
  const pressureIndex = isLoaded && vikriti ? healthEngine.calculateImbalancePressure(state, vikriti.drift_index) : null;

  // State history and prediction protocols
  const stateHistory = isLoaded ? predictionEngine.loadStateHistory() : [];
  const predictionProtocolNames = isLoaded ? predictionEngine.getPredictionProtocols(stateHistory) : [];

  // Compile all module outputs into a single structured daily plan
  const dailyPlan = (isLoaded && vikriti)
    ? compileDailyProtocols(recEngine.getRecommendations(state, vikriti), predictionProtocolNames)
    : { morning: [], midday: [], evening: [] };

  const morningRecs: CompiledProtocolItem[] = dailyPlan.morning;
  const middayRecs: CompiledProtocolItem[] = dailyPlan.midday;
  const eveningRecs: CompiledProtocolItem[] = dailyPlan.evening;

  const adjustments = isLoaded && vikriti ? predictionEngine.getAdjustments(state, vikriti) : [];

  // Save snapshot on load (once per session)
  useEffect(() => {
    if (isLoaded) {
      predictionEngine.saveStateSnapshot(state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#F8FAF9] relative overflow-hidden pb-40"
    >
      {/* Background Radiance */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/5 to-transparent pointer-events-none -z-10 -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent pointer-events-none -z-10 -ml-40 -mb-40" />

      <main className="max-w-4xl mx-auto px-6 md:px-10 pt-20 relative z-10 flex flex-col gap-12 font-sans md:pt-32">

        {/* 1. Header */}
        <motion.header variants={itemVariants} className="text-left mb-4">
          <p className="text-[10px] md:text-xs font-black text-forest uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
            Dinaveda <Sparkles className="w-3 h-3 text-gold" />
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-forest tracking-tighter leading-none mb-3">
            Today's guidance
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            Aligned with your Prakriti
          </p>
        </motion.header>

        {/* 2. Seasonal Context */}
        <motion.section variants={itemVariants}>
          <div className="glass p-8 rounded-[2rem] shadow-premium border border-white/60 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-orange-500/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[1.5rem] bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                <CloudSun className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Seasonal Rhythm</h2>
                <h3 className="text-2xl font-black text-forest tracking-tighter leading-none">Vasanta (Spring)</h3>
              </div>
            </div>
            <div className="md:text-right flex-1">
              <p className="text-xs font-bold text-slate-500 w-full md:max-w-xs md:ml-auto leading-relaxed">
                Favor light, easily digestible foods and maintain active movement to clear winter accumulation.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 3. Ojas Balance & Imbalance Pressure */}
        <motion.section variants={itemVariants} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Main Hero Card: Ojas Balance */}
            <div className="bg-white/80 p-8 rounded-[2rem] border border-white shadow-premium flex flex-col justify-between relative overflow-hidden group hover:bg-white transition-colors h-48">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <div>
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" /> Daily Health Score
                </h2>
                <h3 className="text-5xl md:text-6xl font-black text-forest tracking-tighter leading-none">
                  {isLoaded && ojasBalance !== null ? ojasBalance : '--'}
                </h3>
              </div>
              <div>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-1">Ojas Balance</span>
              </div>
            </div>

            {/* Secondary Hero Card: Imbalance Pressure */}
            <div className="bg-white/80 p-8 rounded-[2rem] border border-white shadow-premium flex flex-col justify-between relative overflow-hidden group hover:bg-white transition-colors h-48">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <div>
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-orange-500" /> Physiological Strain
                </h2>
                <h3 className="text-5xl md:text-6xl font-black text-orange-600 tracking-tighter leading-none">
                  {isLoaded && pressureIndex !== null ? pressureIndex : '--'}
                </h3>
              </div>
              <div>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-1">Imbalance Pressure</span>
              </div>
            </div>
          </div>

          {/* Sub Grid: Component Indicators */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/60 p-5 rounded-[1.5rem] border border-white shadow-sm flex flex-col justify-between h-28 group hover:bg-white transition-colors">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-forest transition-colors flex items-center gap-1.5"><Flame className="w-3 h-3" /> Agni</span>
              <span className="text-xl md:text-2xl font-black text-orange-600 tracking-tighter">
                {isLoaded ? (state.agni_strength > 65 ? 'Strong' : state.agni_strength > 40 ? 'Balanced' : 'Weak') : '--'}
              </span>
            </div>
            <div className="bg-white/60 p-5 rounded-[1.5rem] border border-white shadow-sm flex flex-col justify-between h-28 group hover:bg-white transition-colors">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-forest transition-colors flex items-center gap-1.5"><Moon className="w-3 h-3" /> Circadian</span>
              <span className="text-xl md:text-2xl font-black text-blue-600 tracking-tighter">
                {isLoaded ? `${Math.round(state.circadian_alignment)}%` : '--'}
              </span>
            </div>
            <div className="bg-white/60 p-5 rounded-[1.5rem] border border-white shadow-sm flex flex-col justify-between h-28 group hover:bg-white transition-colors">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-forest transition-colors flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> Drift</span>
              <div className="flex items-end gap-1.5">
                <span className="text-xl md:text-2xl font-black text-forest tracking-tighter">
                  {isLoaded && vikriti ? `${Math.round(vikriti.drift_index)}%` : '--'}
                </span>
                {isLoaded && vikriti && <span className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase">({vikriti.dominant_dosha})</span>}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 4. Today's Protocol & 5. Time-Based Guidance */}
        <motion.section variants={itemVariants} className="mt-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-forest/40" /> Today's Protocol
          </h2>

          <div className="space-y-6">
            {/* Morning Block */}
            <div className="glass p-8 rounded-[2.5rem] border border-white/60 shadow-premium">
              <h3 className="text-sm font-black text-forest uppercase tracking-[0.2em] flex items-center gap-3 mb-6">
                <Sunrise className="w-5 h-5 text-orange-400" /> Morning
              </h3>
              <div className="space-y-4">
                {isLoaded && morningRecs.length > 0 ? morningRecs.map(rec => (
                  <div key={rec.name} className="flex gap-4 items-start pb-4 border-b border-forest/5 last:border-0 last:pb-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2.5 shrink-0 opacity-80" />
                    <div>
                      <h4 className="font-black text-forest tracking-tight text-lg mb-1">{rec.title}</h4>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed text-balance">{rec.description}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-xs font-bold text-slate-400 italic">No acute morning protocols active. Continue standard Dinacharya.</p>
                )}
              </div>
            </div>

            {/* Midday Block */}
            <div className="glass p-8 rounded-[2.5rem] border border-white/60 shadow-premium">
              <h3 className="text-sm font-black text-forest uppercase tracking-[0.2em] flex items-center gap-3 mb-6">
                <Sun className="w-5 h-5 text-gold" /> Midday
              </h3>
              <div className="space-y-4">
                {isLoaded && middayRecs.length > 0 ? middayRecs.map(rec => (
                  <div key={rec.name} className="flex gap-4 items-start pb-4 border-b border-forest/5 last:border-0 last:pb-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0 opacity-80" />
                    <div>
                      <h4 className="font-black text-forest tracking-tight text-lg mb-1">{rec.title}</h4>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed text-balance">{rec.description}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-xs font-bold text-slate-400 italic">No acute midday protocols active. Maintain balanced activity and mindful meals.</p>
                )}
              </div>
            </div>

            {/* Evening Block */}
            <div className="glass p-8 rounded-[2.5rem] border border-white/60 shadow-premium">
              <h3 className="text-sm font-black text-forest uppercase tracking-[0.2em] flex items-center gap-3 mb-6">
                <Sunset className="w-5 h-5 text-indigo-400" /> Evening
              </h3>
              <div className="space-y-4">
                {isLoaded && eveningRecs.length > 0 ? eveningRecs.map(rec => (
                  <div key={rec.name} className="flex gap-4 items-start pb-4 border-b border-forest/5 last:border-0 last:pb-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2.5 shrink-0 opacity-80" />
                    <div>
                      <h4 className="font-black text-forest tracking-tight text-lg mb-1">{rec.title}</h4>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed text-balance">{rec.description}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-xs font-bold text-slate-400 italic">Wind down naturally aligned with the sunset.</p>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 6. Dynamic Adjustments */}
        {isLoaded && adjustments.length > 0 && (
          <motion.section variants={itemVariants} className="mt-4">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-orange-400" /> Dynamic Adjustments
            </h2>
            <div className="space-y-4">
              {adjustments.map((adj, idx) => (
                <div key={idx} className="bg-orange-50/80 p-6 md:p-8 rounded-[2rem] border border-orange-100 flex flex-col md:flex-row md:items-center gap-5 shadow-sm">
                  <div className="w-12 h-12 rounded-[1.2rem] bg-orange-100/80 flex items-center justify-center text-orange-600 shrink-0">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-800/60 mb-1">Adjustment Detected</p>
                    <h4 className="text-sm font-black text-orange-900 mb-1">{adj.issue}</h4>
                    <p className="text-sm font-bold text-slate-700 leading-snug">Recommendation: {adj.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 7. Reflection */}
        <motion.section variants={itemVariants} className="mt-10 mb-16 flex justify-center">
          <div className="text-center max-w-md">
            <div className="w-10 h-10 rounded-[1.2rem] bg-forest/5 flex items-center justify-center mx-auto mb-5 text-forest">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-3">Dinaveda Observation</h4>
            <p className="text-xs md:text-sm font-bold text-slate-500 leading-relaxed italic text-balance px-4">
              "{isLoaded ? predictionEngine.getSystemReflection(state) : "Calibrating systemic balance..."}"
            </p>
          </div>
        </motion.section>

      </main>
    </motion.div>
  );
}
