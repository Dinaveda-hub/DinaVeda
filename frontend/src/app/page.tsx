"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  CloudSun, ShieldCheck, Flame, Compass, Moon,
  Sunrise, Sun, Sunset, AlertCircle, CheckCircle2,
  Sparkles, Leaf, Activity, User, ArrowRight, BrainCircuit
} from "lucide-react";
import Image from "next/image";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { computeVikriti } from "@/engine/vikritiEngine";
import { selectProtocols, filterProtocols, Protocol } from "@/engine/protocolSelectionEngine";
import { computeHealthScore } from "@/engine/healthScoreEngine";
import { computeIPI } from "@/engine/imbalancePressureEngine";
import { PredictionEngine } from "@/engine/predictionEngine";
import { CompiledProtocolItem } from "@/engine/protocolCompiler";
import { humanizeProtocolName } from "@/utils/stringUtils";

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

  const { state, isLoaded } = usePhysiologyState();
  const vikriti = isLoaded ? computeVikriti(state) : null;
  const predictionEngine = new PredictionEngine();

  const ojasBalance = isLoaded && vikriti ? computeHealthScore(state, vikriti.drift_index) : null;
  const pressureIndex = isLoaded && vikriti ? computeIPI(state, vikriti.drift_index) : null;

  // Health Goal state
  const [healthGoal, setHealthGoal] = useState<string>("general_wellness");

  useEffect(() => {
    const saved = localStorage.getItem("veda_health_goal");
    if (saved) setHealthGoal(saved);

    const handleGoalChange = () => {
      const updated = localStorage.getItem("veda_health_goal");
      if (updated) setHealthGoal(updated);
    };

    window.addEventListener("veda_goal_changed", handleGoalChange);
    return () => window.removeEventListener("veda_goal_changed", handleGoalChange);
  }, []);

  // State history and prediction protocols
  const stateHistory = isLoaded ? predictionEngine.loadStateHistory() : [];
  const predictionProtocolNames = isLoaded ? predictionEngine.getPredictionProtocols(stateHistory) : [];

  // Compile all module outputs into a single structured daily plan
  const plan = isLoaded
    ? filterProtocols(selectProtocols(state))
    : { morning: [], midday: [], evening: [] };

  const mapToCompiled = (protos: Protocol[]): CompiledProtocolItem[] =>
    protos.map(p => ({
      name: p.name,
      title: humanizeProtocolName(p.name),
      description: p.instructions,
      time_of_day: p.time_of_day,
      duration: p.duration,
      module: p.module,
      category: p.category
    }));

  const morningRecs = mapToCompiled(plan.morning);
  const middayRecs = mapToCompiled(plan.midday);
  const eveningRecs = mapToCompiled(plan.evening);

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
        <motion.header variants={itemVariants} className="text-left mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative w-6 h-6">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <p className="text-[10px] md:text-sm font-black text-forest/60 uppercase tracking-[0.3em] flex items-center gap-2">
              Dinaveda <Sparkles className="w-3.5 h-3.5 text-gold/60" />
            </p>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter leading-none mb-5">
            Today's guidance
          </h1>
          <p className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
            Aligned with your Prakriti • <span className="text-forest/60 underline decoration-forest/20 underline-offset-4">{healthGoal.replace(/_/g, ' ').toUpperCase()}</span>
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
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Seasonal Rhythm</h2>
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
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-forest transition-colors flex items-center gap-1.5"><Flame className="w-3 h-3" /> Agni</span>
              <span className="text-xl md:text-2xl font-black text-orange-600 tracking-tighter">
                {isLoaded ? (state.agni_strength > 65 ? 'Strong' : state.agni_strength > 40 ? 'Balanced' : 'Weak') : '--'}
              </span>
            </div>
            <div className="bg-white/60 p-5 rounded-[1.5rem] border border-white shadow-sm flex flex-col justify-between h-28 group hover:bg-white transition-colors">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-forest transition-colors flex items-center gap-1.5"><Moon className="w-3 h-3" /> Circadian</span>
              <span className="text-xl md:text-2xl font-black text-blue-600 tracking-tighter">
                {isLoaded ? `${Math.round(state.circadian_alignment)}%` : '--'}
              </span>
            </div>
            <div className="bg-white/60 p-5 rounded-[1.5rem] border border-white shadow-sm flex flex-col justify-between h-28 group hover:bg-white transition-colors">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-forest transition-colors flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> Drift</span>
              <div className="flex items-end gap-1.5">
                <span className="text-xl md:text-2xl font-black text-forest tracking-tighter">
                  {isLoaded && vikriti ? `${Math.round(vikriti.drift_index)}%` : '--'}
                </span>
                {isLoaded && vikriti && <span className="text-xs font-bold text-slate-400 mb-1.5 uppercase">({vikriti.dominant_dosha})</span>}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 4. Today's Protocol & 5. Time-Based Guidance */}
        <motion.section variants={itemVariants} className="mt-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
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
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-orange-400" /> Dynamic Adjustments
            </h2>
            <div className="space-y-4">
              {adjustments.map((adj, idx) => (
                <div key={idx} className="bg-orange-50/80 p-6 md:p-8 rounded-[2rem] border border-orange-100 flex flex-col md:flex-row md:items-center gap-5 shadow-sm">
                  <div className="w-12 h-12 rounded-[1.2rem] bg-orange-100/80 flex items-center justify-center text-orange-600 shrink-0">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-orange-800/60 mb-1">Adjustment Detected</p>
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
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-3">Dinaveda Observation</h4>
            <p className="text-xs md:text-sm font-bold text-slate-500 leading-relaxed italic text-balance px-4">
              "{isLoaded ? (state.is_onboarded ? predictionEngine.getSystemReflection(state) : "Awaiting biological initialization...") : "Calibrating systemic balance..."}"
            </p>
          </div>
        </motion.section>

      </main>

      {/* Onboarding Overlay / Gate */}
      {!state.is_onboarded && isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-xl flex items-center justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="glass max-w-lg w-full p-10 md:p-16 rounded-[3rem] border border-white shadow-premium text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="relative w-20 h-20 mx-auto mb-10 transition-transform duration-500 hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Dinaveda Logo"
                  fill
                  className="object-contain"
                />
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-forest tracking-tighter leading-none mb-6">Initialize Your Neural Hub</h2>
              <p className="text-sm md:text-base font-bold text-slate-500 leading-relaxed mb-10 max-w-xs mx-auto text-balance">
                To generate your personalized health scores and daily protocols, we first need to map your biological constitution.
              </p>

              <div className="space-y-4">
                <Link
                  href="/ayuone"
                  className="w-full bg-forest text-white py-6 rounded-[1.8rem] font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-xl shadow-forest/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  Start Assessment <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="w-full bg-white text-slate-400 border border-slate-100 py-6 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Learn How it Works
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
