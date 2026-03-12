"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  CloudSun, ShieldCheck, Flame, Moon, Compass,
  Sunrise, Sun, Sunset, AlertCircle, CheckCircle2,
  Sparkles, Activity, ArrowRight, Leaf,
  CheckCircle, Square, Crown, Lock
} from "lucide-react";
import Image from "next/image";
import DailyAIInsight from "@/components/dashboard/DailyAIInsight";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { computeVikriti } from "@/engine/vikritiEngine";
import { selectProtocols, filterProtocols, Protocol } from "@/engine/protocolSelectionEngine";
import { computeHealthScore } from "@/engine/healthScoreEngine";
import { computeIPI } from "@/engine/imbalancePressureEngine";
import { PredictionEngine } from "@/engine/predictionEngine";
import { CompiledProtocolItem } from "@/engine/protocolCompiler";
import { formatProtocolName } from "@/utils/stringUtils";
import { applyEffects } from "@/engine/stateUpdater";
import { sendNotification } from "@/services/notificationService";
import notificationRulesRaw from "@/data/notificationRules.json";
import protocolsRaw from "@/data/protocols.json";
import FeedbackModal from "@/components/FeedbackModal";
import DoshaPressureMap from "@/components/pressure-map/DoshaPressureMap";
import GoalSelector from "@/components/GoalSelector";
import ProtocolCard from "@/components/modules/ProtocolCard";
import { X } from "lucide-react";

const notificationRules = notificationRulesRaw as Record<string, { time: string, message: string }>;

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

  const { state, updateState, isLoaded, userWeights, userId, subscriptionStatus, healthGoal } = usePhysiologyState();
  const vikriti = isLoaded ? computeVikriti(state) : null;
  const predictionEngine = useMemo(() => new PredictionEngine(), []);

  const ojasBalance = isLoaded && vikriti ? computeHealthScore(state, vikriti.drift_index) : null;
  const pressureIndex = isLoaded && vikriti ? computeIPI(state, vikriti.drift_index) : null;

  // Interaction State for Protocols
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [feedbackQueue, setFeedbackQueue] = useState<CompiledProtocolItem[]>([]);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  // State history and prediction protocols
  const stateHistory = isLoaded ? predictionEngine.loadStateHistory() : [];
  const predictionProtocolNames = isLoaded ? predictionEngine.getPredictionProtocols(stateHistory) : [];

  // Compile all module outputs into a single structured daily plan
  const plan = useMemo(() => isLoaded
    ? filterProtocols(selectProtocols(state, userWeights, healthGoal))
    : { morning: [], midday: [], evening: [] }, [isLoaded, state, userWeights, healthGoal]);

  const mapToCompiled = (protos: Protocol[]): CompiledProtocolItem[] =>
    protos.map(p => ({
      name: p.name,
      title: formatProtocolName(p.name),
      description: p.instructions,
      time_of_day: p.time_of_day,
      duration: p.duration,
      module: p.module,
      category: p.category
    }));

  const morningRecs = useMemo(() => mapToCompiled(plan.morning), [plan.morning]);
  const middayRecs = useMemo(() => mapToCompiled(plan.midday), [plan.midday]);
  const eveningRecs = useMemo(() => mapToCompiled(plan.evening), [plan.evening]);

  const adjustments = isLoaded && vikriti ? predictionEngine.getAdjustments(state, vikriti) : [];

  // Save snapshot on load (once per session)
  useEffect(() => {
    if (isLoaded) {
      predictionEngine.saveStateSnapshot(state); // Enforces 1 snapshot per day internally
    }
  }, [isLoaded, predictionEngine, state]);

  // Load Interaction Progress and check for Midnight Reset
  useEffect(() => {
    const checkReset = () => {
      const lastResetDate = localStorage.getItem("veda_protocol_reset_date");
      const today = new Date().toDateString();

      if (lastResetDate !== today) {
        localStorage.removeItem("veda_checked_items");
        localStorage.removeItem("veda_completed_sections");
        localStorage.setItem("veda_protocol_reset_date", today);
        setCheckedItems([]);
        setCompletedSections([]);
      } else {
        const savedChecked = localStorage.getItem("veda_checked_items");
        const savedCompleted = localStorage.getItem("veda_completed_sections");
        if (savedChecked) setCheckedItems(JSON.parse(savedChecked));
        if (savedCompleted) setCompletedSections(JSON.parse(savedCompleted));
      }
    };

    checkReset();
    window.addEventListener("focus", checkReset);
    return () => window.removeEventListener("focus", checkReset);
  }, []);

  const protocolMap = useMemo(() => {
    const map: Record<string, any> = {};
    (protocolsRaw as any[]).forEach(p => {
      map[p.name] = p;
    });
    return map;
  }, []);

  const handleToggleProtocol = (name: string) => {
    if (checkedItems.includes(name)) {
      const updated = checkedItems.filter((i: string) => i !== name);
      setCheckedItems(updated);
      localStorage.setItem("veda_checked_items", JSON.stringify(updated));
    } else {
      const updated = [...checkedItems, name];
      setCheckedItems(updated);
      localStorage.setItem("veda_checked_items", JSON.stringify(updated));
    }
  };

  const handleCompleteSection = async (section: string, items: CompiledProtocolItem[]) => {
    if (completedSections.includes(section)) return;

    // Filter to only items that were checked
    const checkedInSection = items.filter(i => checkedItems.includes(i.name));

    // Aggregate effects
    const effectsList: any[] = [];
    checkedInSection.forEach(item => {
      const original = protocolMap[item.name];
      if (original?.variables && Object.keys(original.variables).length > 0) {
        effectsList.push(original.variables);
      }
    });

    if (effectsList.length > 0) {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const signalNames = checkedInSection.map(i => i.name);

      const { state: newState, events } = applyEffects(state, effectsList, currentTime, signalNames);
      await updateState(newState);

      // Handle Side Effects (Notifications)
      if (userId && events.length > 0) {
        events.forEach(event => {
          const rule = notificationRules[event];
          if (rule) {
            sendNotification(userId, rule.message).catch(console.error);
          }
        });
      }
    }

    const updated = [...completedSections, section];
    setCompletedSections(updated);
    localStorage.setItem("veda_completed_sections", JSON.stringify(updated));

    // Show feedback modal for checked items
    if (checkedInSection.length > 0) {
      setFeedbackQueue(checkedInSection);
    }
  };

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
              <Image src="/logo.png" alt="Logo" fill className="object-contain" priority sizes="24px" />
            </div>
            <p className="text-[10px] md:text-sm font-black text-forest/60 uppercase tracking-[0.3em] flex items-center gap-2">
              Dinaveda <Sparkles className="w-3.5 h-3.5 text-gold/60" />
            </p>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter leading-none mb-5">
            Today's guidance
          </h1>
          <p className="text-[10px] md:text-sm font-bold text-slate-600 uppercase tracking-widest leading-relaxed">
            Aligned with your Prakriti • <button onClick={() => setIsGoalModalOpen(true)} className="text-forest underline decoration-forest/40 underline-offset-4 cursor-pointer hover:text-emerald-600 transition-colors">{healthGoal.replace(/_/g, ' ').toUpperCase()}</button>
          </p>
        </motion.header>

        {/* Goal Selection Modal */}
        <AnimatePresence>
          {isGoalModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-forest/40 backdrop-blur-sm"
              onClick={() => setIsGoalModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative border border-white/50 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

                <button
                  onClick={() => setIsGoalModalOpen(false)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-forest transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-2xl font-black text-forest tracking-tighter leading-tight mb-2">
                  Refine your path
                </h3>
                <p className="text-sm font-bold text-slate-500 mb-8 uppercase tracking-widest">
                  Personalize your daily protocol priorities.
                </p>

                <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  <GoalSelector onSelect={() => setIsGoalModalOpen(false)} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Seasonal Context */}
        <motion.section variants={itemVariants}>
          <div className="glass p-8 rounded-[2rem] shadow-premium border border-white/60 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-orange-500/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[1.5rem] bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                <CloudSun className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1">Seasonal Rhythm</h2>
                <h3 className="text-2xl font-black text-forest tracking-tighter leading-none">Vasanta (Spring)</h3>
              </div>
            </div>
            <div className="md:text-right flex-1">
              <p className="text-xs font-bold text-slate-600 w-full md:max-w-xs md:ml-auto leading-relaxed">
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
                <h2 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" /> Daily Health Score
                </h2>
                <h3 className="text-5xl md:text-6xl font-black text-forest tracking-tighter leading-none">
                  {isLoaded && ojasBalance !== null ? ojasBalance : '--'}
                </h3>
              </div>
              <div>
                <span className="text-sm font-bold text-slate-600 uppercase tracking-widest block mb-1">Ojas Balance</span>
              </div>
            </div>

            {/* Secondary Hero Card: Imbalance Pressure */}
            <div className="bg-white/80 p-8 rounded-[2rem] border border-white shadow-premium flex flex-col justify-between relative overflow-hidden group hover:bg-white transition-colors h-48">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <div>
                <h2 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-orange-500" /> Physiological Strain
                </h2>
                <h3 className="text-5xl md:text-6xl font-black text-orange-600 tracking-tighter leading-none">
                  {isLoaded && pressureIndex !== null ? pressureIndex : '--'}
                </h3>
              </div>
              <div>
                <span className="text-sm font-bold text-slate-600 uppercase tracking-widest block mb-1">Imbalance Pressure</span>
              </div>
            </div>
          </div>

          {/* Sub Grid: Component Indicators */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <div className="bg-white/60 p-4 md:p-5 rounded-[1.5rem] border border-white shadow-sm flex flex-col justify-between h-28 group hover:bg-white transition-colors">
              <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-forest transition-colors flex items-center gap-1 md:gap-1.5"><Flame className="w-3 h-3" /> Agni</span>
              <span className="text-lg md:text-2xl font-black text-orange-600 tracking-tighter">
                {isLoaded ? (state.agni > 65 ? 'Strong' : state.agni > 40 ? 'Balanced' : 'Weak') : '--'}
              </span>
            </div>
            <div className="bg-white/60 p-4 md:p-5 rounded-[1.5rem] border border-white shadow-sm flex flex-col justify-between h-28 group hover:bg-white transition-colors">
              <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-forest transition-colors flex items-center gap-1 md:gap-1.5"><Moon className="w-3 h-3" /> Circadian</span>
              <span className="text-lg md:text-2xl font-black text-blue-600 tracking-tighter">
                {isLoaded ? `${Math.round(state.circadian)}%` : '--'}
              </span>
            </div>
            <div className="bg-white/60 p-4 md:p-5 rounded-[1.5rem] border border-white shadow-sm flex flex-col justify-between h-28 group hover:bg-white transition-colors">
              <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-forest transition-colors flex items-center gap-1 md:gap-1.5"><AlertCircle className="w-3 h-3" /> Drift</span>
              <div className="flex flex-col md:flex-row md:items-end gap-0 md:gap-1.5">
                <span className="text-lg md:text-2xl font-black text-forest tracking-tighter leading-none">
                  {isLoaded && vikriti ? `${Math.round(vikriti.drift_index)}%` : '--'}
                </span>
                {isLoaded && vikriti && (
                  <span className="text-[9px] md:text-xs font-bold text-slate-500 uppercase leading-none md:mb-1 truncate">
                    ({vikriti.dominant_dosha})
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 3.5 Dosha Pressure Map — Full Physiological Visualization */}
        <motion.section variants={itemVariants}>
          <DoshaPressureMap />
        </motion.section>

        {/* 4. Today's Protocol & 5. Time-Based Guidance */}
        <motion.section variants={itemVariants} className="mt-4">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-forest/40" /> Today's Protocol
          </h2>

          <div className="space-y-6">
            {/* Morning Block */}
            <div className={`glass p-8 rounded-[2.5rem] border transition-all duration-500 ${completedSections.includes('morning') ? 'border-emerald-200 bg-emerald-50/20 opacity-90' : 'border-white/60 shadow-premium'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-forest uppercase tracking-[0.2em] flex items-center gap-3">
                  <Sunrise className="w-5 h-5 text-orange-400" /> Morning
                </h3>
                {completedSections.includes('morning') ? (
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-100/50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle className="w-3.5 h-3.5" /> Completed
                  </div>
                ) : (
                  <button
                    onClick={() => handleCompleteSection('morning', morningRecs)}
                    disabled={morningRecs.length === 0 || morningRecs.filter(r => checkedItems.includes(r.name)).length === 0}
                    className="text-[10px] font-black uppercase tracking-widest bg-forest text-white px-5 py-2 rounded-full shadow-lg shadow-forest/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {isLoaded && morningRecs.length > 0 ? morningRecs.map(rec => {
                  const original = protocolMap[rec.name] || rec;
                  return (
                    <ProtocolCard
                      key={rec.name}
                      protocol={original}
                      isChecked={checkedItems.includes(rec.name)}
                      onToggle={() => handleToggleProtocol(rec.name)}
                      isSectionDone={completedSections.includes('morning')}
                      subscriptionStatus={subscriptionStatus}
                      userId={userId}
                    />
                  );
                }) : (
                  <p className="text-xs font-bold text-slate-600 italic">No acute morning protocols active. Continue standard Dinacharya.</p>
                )}
              </div>
            </div>

            {/* Midday Block */}
            <div className={`glass p-8 rounded-[2.5rem] border transition-all duration-500 ${completedSections.includes('midday') ? 'border-emerald-200 bg-emerald-50/20 opacity-90' : 'border-white/60 shadow-premium'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-forest uppercase tracking-[0.2em] flex items-center gap-3">
                  <Sun className="w-5 h-5 text-gold" /> Midday
                </h3>
                {completedSections.includes('midday') ? (
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-100/50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle className="w-3.5 h-3.5" /> Completed
                  </div>
                ) : (
                  <button
                    onClick={() => handleCompleteSection('midday', middayRecs)}
                    disabled={middayRecs.length === 0 || middayRecs.filter(r => checkedItems.includes(r.name)).length === 0}
                    className="text-[10px] font-black uppercase tracking-widest bg-forest text-white px-5 py-2 rounded-full shadow-lg shadow-forest/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {isLoaded && middayRecs.length > 0 ? middayRecs.map(rec => {
                  const original = protocolMap[rec.name] || rec;
                  return (
                    <ProtocolCard
                      key={rec.name}
                      protocol={original}
                      isChecked={checkedItems.includes(rec.name)}
                      onToggle={() => handleToggleProtocol(rec.name)}
                      isSectionDone={completedSections.includes('midday')}
                      subscriptionStatus={subscriptionStatus}
                      userId={userId}
                    />
                  );
                }) : (
                  <p className="text-xs font-bold text-slate-600 italic">No acute midday protocols active. Maintain balanced activity and mindful meals.</p>
                )}
              </div>
            </div>

            {/* Evening Block */}
            <div className={`glass p-8 rounded-[2.5rem] border transition-all duration-500 ${completedSections.includes('evening') ? 'border-emerald-200 bg-emerald-50/20 opacity-90' : 'border-white/60 shadow-premium'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-forest uppercase tracking-[0.2em] flex items-center gap-3">
                  <Sunset className="w-5 h-5 text-indigo-400" /> Evening
                </h3>
                {completedSections.includes('evening') ? (
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-100/50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle className="w-3.5 h-3.5" /> Completed
                  </div>
                ) : (
                  <button
                    onClick={() => handleCompleteSection('evening', eveningRecs)}
                    disabled={eveningRecs.length === 0 || eveningRecs.filter(r => checkedItems.includes(r.name)).length === 0}
                    className="text-[10px] font-black uppercase tracking-widest bg-forest text-white px-5 py-2 rounded-full shadow-lg shadow-forest/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {isLoaded && eveningRecs.length > 0 ? eveningRecs.map(rec => {
                  const original = protocolMap[rec.name] || rec;
                  return (
                    <ProtocolCard
                      key={rec.name}
                      protocol={original}
                      isChecked={checkedItems.includes(rec.name)}
                      onToggle={() => handleToggleProtocol(rec.name)}
                      isSectionDone={completedSections.includes('evening')}
                      subscriptionStatus={subscriptionStatus}
                      userId={userId}
                    />
                  );
                }) : (
                  <p className="text-xs font-bold text-slate-600 italic">Wind down naturally aligned with the sunset.</p>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 6. Dynamic Adjustments */}
        {isLoaded && adjustments.length > 0 && (
          <motion.section variants={itemVariants} className="mt-4">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
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

        {/* 6.5 Daily AI Insight & Monetization */}
        <motion.section variants={itemVariants} className="mt-8">
            <DailyAIInsight />
        </motion.section>

        {/* 7. Reflection */}
        <motion.section variants={itemVariants} className="mt-10 mb-16 flex justify-center">
          <div className="text-center max-w-md">
            <div className="w-10 h-10 rounded-[1.2rem] bg-forest/5 flex items-center justify-center mx-auto mb-5 text-forest">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-600 mb-3">Dinaveda Observation</h4>
            <p className="text-xs md:text-sm font-bold text-slate-700 leading-relaxed italic text-balance px-4">
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
                  priority
                  sizes="64px"
                  className="object-contain"
                />
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-forest tracking-tighter leading-none mb-6">Initialize Your Neural Hub</h2>
              <p className="text-sm md:text-base font-bold text-slate-600 leading-relaxed mb-10 max-w-xs mx-auto text-balance">
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
                  className="w-full bg-white text-slate-600 border border-slate-100 py-6 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
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
