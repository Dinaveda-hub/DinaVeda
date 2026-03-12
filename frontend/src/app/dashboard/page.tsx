"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  CloudSun, ShieldCheck, Flame, Moon, Compass,
  Sunrise, Sun, Sunset, AlertCircle, CheckCircle2,
  Sparkles, Activity, ArrowRight, Leaf,
  CheckCircle, Square, Crown, Lock, Zap, BrainCircuit, X
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
import GoalSelector from "@/components/GoalSelector";
import ProtocolCard from "@/components/modules/ProtocolCard";
import SeasonalPulseCard from "@/components/dashboard/SeasonalPulseCard";
import PhysiologyMap from "@/components/pressure-map/PhysiologyMap";
import SystemMessage from "@/components/pressure-map/SystemMessage";
import DoshaTriangle from "@/components/pressure-map/DoshaTriangle";
import { logProtocolCompletion } from "@/services/protocolCompletionService";
import { useProtocolLearning } from "@/hooks/useProtocolLearning";
import { useUpgrade } from "@/contexts/UpgradeContext";
import SoftUpgradeCard from "@/components/paywall/SoftUpgradeCard";

const notificationRules = notificationRulesRaw as Record<string, { time: string, message: string }>;

interface BodySystemBarProps {
    label: string;
    value: number;
    icon: React.ReactNode;
}

function BodySystemBar({ label, value, icon }: BodySystemBarProps) {
    const percentage = Math.min(100, Math.max(0, value));
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
                </div>
                <span className="text-[10px] font-black text-slate-600">{Math.round(value)}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={`h-full ${value > 70 ? 'bg-emerald-500' : value > 40 ? 'bg-gold' : 'bg-orange-500'}`} 
                />
            </div>
        </div>
    );
}

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

  // Adaptive Learning Loop
  useProtocolLearning(isLoaded, userId, state);

  const ojasBalance = isLoaded && vikriti ? computeHealthScore(state, vikriti.drift_index) : null;
  const pressureIndex = isLoaded && vikriti ? computeIPI(state, vikriti.drift_index) : null;

  // Interaction State for Protocols
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
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
      category: p.category,
      is_premium: p.is_premium,
      variables: p.variables
    }));

  const morningRecs = useMemo(() => mapToCompiled(plan.morning), [plan.morning]);
  const middayRecs = useMemo(() => mapToCompiled(plan.midday), [plan.midday]);
  const eveningRecs = useMemo(() => mapToCompiled(plan.evening), [plan.evening]);

  const adjustments = isLoaded && vikriti ? predictionEngine.getAdjustments(state, vikriti) : [];

  // Sync history and save snapshot on load
  useEffect(() => {
    async function initSync() {
      if (isLoaded) {
        await predictionEngine.syncFromSupabase();
        predictionEngine.saveStateSnapshot(state).catch(console.error);
      }
    }
    initSync();
  }, [isLoaded, predictionEngine, state]);

  // Load Interaction Progress and check for Midnight Reset
  useEffect(() => {
    const checkReset = () => {
      const lastResetDate = localStorage.getItem("veda_protocol_reset_date");
      const today = new Date().toDateString();

      if (lastResetDate !== today) {
        localStorage.removeItem("veda_checked_items");
        localStorage.setItem("veda_protocol_reset_date", today);
        setCheckedItems([]);
      } else {
        const savedChecked = localStorage.getItem("veda_checked_items");
        if (savedChecked) setCheckedItems(JSON.parse(savedChecked));
      }
    };

    checkReset();
    window.addEventListener("focus", checkReset);
    return () => window.removeEventListener("focus", checkReset);
  }, []);

  const handleToggleProtocol = async (name: string, effects?: any) => {
    if (checkedItems.includes(name)) return; // Prevent unchecking for simplicity in transactional delta

    const updated = [...checkedItems, name];
    setCheckedItems(updated);
    localStorage.setItem("veda_checked_items", JSON.stringify(updated));

    if (effects && Object.keys(effects).length > 0) {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const { state: newState, events } = applyEffects(state, [effects], currentTime, [name]);
      await updateState(newState);

      // Log completions for the Learning Engine
      logProtocolCompletion(name, state, newState).catch(console.error);

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
  };

  const isAnyPremiumProtocol = [...morningRecs, ...middayRecs, ...eveningRecs].some(r => r.is_premium);

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

      <main className="max-w-4xl mx-auto px-6 md:px-10 pt-20 relative z-10 flex flex-col gap-10 font-sans md:pt-32">

        {/* 1. Header */}
        <motion.header variants={itemVariants} className="text-left mb-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative w-6 h-6">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" priority sizes="24px" />
            </div>
            <p className="text-[10px] md:text-sm font-black text-forest/60 uppercase tracking-[0.3em] flex items-center gap-2">
              Dinaveda Neural Hub <Sparkles className="w-3.5 h-3.5 text-gold/60" />
            </p>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter leading-none">
            Physiology Central
          </h1>
        </motion.header>

        {/* 2. Seasonal Pulse Card (Top) */}
        <motion.section variants={itemVariants}>
            <SeasonalPulseCard />
        </motion.section>

        {/* 3. Physiology Map & System Message */}
        <motion.section variants={itemVariants} className="flex flex-col gap-6">
            <div className="glass p-6 md:p-10 rounded-[3rem] border border-white/60 shadow-premium flex flex-col items-center">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">Physiology Map</h3>
                <PhysiologyMap state={state} />
                
                {/* 4. System Message (Formerly PressureExplanation) */}
                <SystemMessage 
                    vata={state.vata} 
                    pitta={state.pitta} 
                    kapha={state.kapha} 
                    sleep={state.sleep} 
                    stress={state.stress} 
                />

                {/* 5. Dosha Balance Triangle */}
                <div className="mt-12 w-full flex flex-col items-center border-t border-slate-100 pt-12">
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">Subtle Balance</h3>
                     <DoshaTriangle vata={state.vata} pitta={state.pitta} kapha={state.kapha} />
                </div>
            </div>
        </motion.section>

        {/* 6. Body System Metrics */}
        <motion.section variants={itemVariants}>
             <div className="glass p-6 md:p-8 rounded-[2.5rem] border border-white/60 shadow-sm grid grid-cols-2 md:grid-cols-3 gap-6">
                <BodySystemBar label="Agni" value={state.agni} icon={<Flame className="w-3 h-3 text-orange-500" />} />
                <BodySystemBar label="Sleep" value={state.sleep} icon={<Moon className="w-3 h-3 text-blue-500" />} />
                <BodySystemBar label="Stress" value={state.stress} icon={<Zap className="w-3 h-3 text-red-400" />} />
                <BodySystemBar label="Circadian" value={state.circadian} icon={<Moon className="w-3 h-3 text-indigo-500" />} />
                <BodySystemBar label="Energy" value={state.energy} icon={<Zap className="w-3 h-3 text-emerald-500" />} />
                <BodySystemBar label="Clarity" value={state.mental_clarity} icon={<BrainCircuit className="w-3 h-3 text-violet-500" />} />
             </div>
        </motion.section>

        {/* 7. Protocol Plan */}
        <motion.section variants={itemVariants}>
            <div className="mb-6 flex items-center justify-between px-2">
                <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-forest/40" /> Corrective Protocol Plan
                </h2>
                <button onClick={() => setIsGoalModalOpen(true)} className="text-[10px] font-black text-forest/60 uppercase tracking-widest bg-forest/5 px-4 py-2 rounded-full border border-forest/10 hover:bg-forest/10 transition-colors">
                    Goal: {healthGoal.replace(/_/g, ' ')}
                </button>
            </div>

            <div className="flex flex-col gap-6">
                {/* Morning */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-4">Morning</h3>
                    {morningRecs.length > 0 ? morningRecs.map(rec => (
                        <ProtocolCard 
                            key={rec.name}
                            protocol={rec as any}
                            isChecked={checkedItems.includes(rec.name)}
                            onToggle={() => handleToggleProtocol(rec.name, rec.variables)}
                            subscriptionStatus={subscriptionStatus}
                            userId={userId}
                        />
                    )) : (
                        <p className="text-xs font-bold text-slate-400 px-4">No specific morning protocols today.</p>
                    )}
                </div>

                {/* Midday */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-4">Midday</h3>
                    {middayRecs.length > 0 ? middayRecs.map(rec => (
                        <ProtocolCard 
                            key={rec.name}
                            protocol={rec as any}
                            isChecked={checkedItems.includes(rec.name)}
                            onToggle={() => handleToggleProtocol(rec.name, rec.variables)}
                            subscriptionStatus={subscriptionStatus}
                            userId={userId}
                        />
                    )) : (
                        <p className="text-xs font-bold text-slate-400 px-4">No specific midday protocols today.</p>
                    )}
                </div>

                {/* Evening */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-4">Evening</h3>
                    {eveningRecs.length > 0 ? eveningRecs.map(rec => (
                        <ProtocolCard 
                            key={rec.name}
                            protocol={rec as any}
                            isChecked={checkedItems.includes(rec.name)}
                            onToggle={() => handleToggleProtocol(rec.name, rec.variables)}
                            subscriptionStatus={subscriptionStatus}
                            userId={userId}
                        />
                    )) : (
                        <p className="text-xs font-bold text-slate-400 px-4">No specific evening protocols today.</p>
                    )}
                </div>

                {/* Single Premium Explanation Gate */}
                {subscriptionStatus !== "active" && isAnyPremiumProtocol && (
                    <motion.div 
                        whileHover={{ y: -2 }}
                        className="mt-8 bg-gradient-to-br from-forest to-emerald-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group cursor-pointer"
                        onClick={() => setIsUpgradeModalOpen(true)}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl -mr-10 -mt-10" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 font-sans">
                            <div>
                                <h4 className="text-xl font-black tracking-tight mb-2">Unlock Why These Protocols Selected.</h4>
                                <p className="text-sm text-emerald-100 font-medium max-w-sm">
                                    Your personal plan is generated by analyzing 21 real-time physiological signals. Learn the "Why" behind every ritual.
                                </p>
                            </div>
                            <button className="bg-gold text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-black/20 group-hover:scale-105 transition-transform">
                                Upgrade Plan
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.section>

        {/* AI Insight Card (Bottom) */}
        <motion.section variants={itemVariants}>
            <DailyAIInsight />
        </motion.section>

        {/* Reflection */}
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
              <button onClick={() => setIsGoalModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-forest transition-colors z-10">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-black text-forest tracking-tighter leading-tight mb-2">Refine your path</h3>
              <p className="text-sm font-bold text-slate-500 mb-8 uppercase tracking-widest">Personalize your daily protocol priorities.</p>
              <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <GoalSelector onSelect={() => setIsGoalModalOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
             <div className="relative z-10">
              <div className="relative w-20 h-20 mx-auto mb-10">
                <Image src="/logo.png" alt="Dinaveda Logo" fill priority sizes="64px" className="object-contain" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-forest tracking-tighter leading-none mb-6">Initialize Your Neural Hub</h2>
              <p className="text-sm md:text-base font-bold text-slate-600 leading-relaxed mb-10 max-w-xs mx-auto text-balance">
                To generate your personalized health scores and daily protocols, we first need to map your biological constitution.
              </p>
              <div className="space-y-4">
                <Link href="/ayuone" className="w-full bg-forest text-white py-6 rounded-[1.8rem] font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-xl shadow-forest/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                  Start Assessment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
