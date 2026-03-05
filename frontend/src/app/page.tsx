"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Activity, History as HistoryIcon, ShieldCheck, CloudSun, Leaf, Flame, Moon, Compass } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useVedaState } from "@/engine/useVedaState";
import { VikritiEngine } from "@/engine/vikritiEngine";

export default function Dashboard() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20
      } as any
    }
  };

  const [userName, setUserName] = useState("Seeker");
  const [streak, setStreak] = useState(0);

  // Local Deterministic Engine
  const { state, isLoaded } = useVedaState();
  const vikritiEngine = new VikritiEngine();
  const vikriti = vikritiEngine.calculateMetrics(state);

  useEffect(() => {
    const initDashboard = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserName(user.user_metadata?.full_name || "Seeker");

        // Fetch user's pulse logs to populate streak only, Ojas is deterministic now.
        const { data: logs, error } = await supabase
          .from('pulse_logs')
          .select('created_at')
          .order('created_at', { ascending: false });

        if (!error && logs && logs.length > 0) {
          setStreak(logs.length); // Dynamic streak (currently counts total logs)
        }
      }
    };
    initDashboard();
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      {/* Soft Elemental Accents - Optimized for Performance */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-air/10 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-water/10 to-transparent pointer-events-none -z-10 -mr-60 -mt-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fire/5 to-transparent pointer-events-none -z-10 -ml-40 -mb-40" />

      <main className="relative z-10 max-w-6xl mx-auto p-6 md:p-14 pb-40 font-sans">
        {/* Supportive Header */}
        <header className="mb-20">
          <motion.p
            variants={itemVariants}
            className="text-forest/60 font-black uppercase tracking-[0.4em] text-[10px] mb-4"
          >
            Namaste, {userName}
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-8xl font-black text-forest tracking-tighter leading-none"
              >
                Dinaveda
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-6 text-slate-500 font-bold text-lg max-w-md leading-relaxed tracking-tight"
              >
                Your daily path to balance, clarity, and enduring vitality.
              </motion.p>
            </div>
            <motion.div variants={itemVariants} className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-air flex items-center justify-center text-blue-400">
                <CloudSun className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-2xl bg-earth flex items-center justify-center text-forest">
                <Leaf className="w-5 h-5" />
              </div>
            </motion.div>
          </div>
        </header>

        {/* Vitality Centerpiece - Now more organic */}
        <section className="mb-24">
          <motion.div
            variants={itemVariants}
            className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center"
          >
            {/* Soft Breathing Animation - Optimized GPU Scaling */}
            <motion.div
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-water/20 to-transparent pointer-events-none"
            />

            <div className="glass shadow-premium w-full h-full rounded-[4rem] flex flex-col items-center justify-center relative overflow-hidden group border-white/40">
              <div className="text-center relative z-10 w-full px-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black text-forest uppercase tracking-[0.4em]">Your Ojas Score</span>
                  {/* BJ Fogg / Hooked Model: The Reward/Streak */}
                  {streak > 0 && (
                    <div className="flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
                      <Activity className="w-3 h-3 text-orange-500" />
                      <span className="text-[10px] font-black text-orange-700 uppercase tracking-widest">{streak} Day Streak</span>
                    </div>
                  )}
                </div>

                <div className="text-[8rem] md:text-[10rem] font-black text-forest leading-none tracking-tighter drop-shadow-sm relative">
                  {isLoaded ? Math.round(state.ojas_score) : '--'}
                  {isLoaded && state.ojas_score > 80 && <span className="absolute top-4 -right-2 text-2xl text-emerald-500 animate-pulse">↑</span>}
                </div>

                {/* Hooked Model: Variable Reward / Investment */}
                <div className="mt-6 flex flex-col items-center gap-4 w-full">
                  <div className="px-5 py-2 glass rounded-full border border-forest/10 flex items-center gap-2">
                    <span className="text-[10px] font-black text-forest/70 uppercase tracking-widest">
                      Harmonizing Flow
                    </span>
                  </div>

                  {/* Investment Progress Bar */}
                  <div className="w-full mt-2">
                    <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1.5 px-2">
                      <span>Level: {
                        streak < 3 ? "Seeker (1)" :
                          streak < 8 ? "Initiate (2)" :
                            streak < 15 ? "Adept (3)" :
                              "Alchemist (4)"
                      }</span>
                      <span className="text-forest">
                        {
                          streak < 3 ? `${3 - streak} Logs to Next Realm` :
                            streak < 8 ? `${8 - streak} Logs to Next Realm` :
                              streak < 15 ? `${15 - streak} Logs to Next Realm` :
                                "Mastered"
                        }
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-forest/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-forest rounded-full relative transition-all duration-1000"
                        style={{
                          width: `${streak < 3 ? (streak / 3) * 100 :
                            streak < 8 ? ((streak - 3) / 5) * 100 :
                              streak < 15 ? ((streak - 8) / 7) * 100 :
                                100
                            }%`
                        }}
                      >
                        <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/40" />
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 font-bold mt-2 italic px-8">
                    "When Agni is stable, life is vibrant."
                  </p>
                </div>
              </div>

              {/* Bottom organic curve */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-earth/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </section>

        {/* Holistic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Seasonal & Prakriti Focus */}
          <div className="lg:col-span-4 space-y-6 md:space-y-10">
            <motion.div variants={itemVariants} className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-premium border border-white/50">
              <h2 className="text-[10px] font-black text-forest uppercase tracking-[0.4em] mb-6 md:mb-8 flex items-center gap-3">
                <CloudSun className="w-4 h-4 text-orange-400" /> Seasonal Rhythm
              </h2>
              <div className="space-y-4">
                <div className="w-full h-20 md:h-24 bg-fire/30 rounded-2xl md:rounded-3xl flex items-center justify-center">
                  <span className="text-orange-700 font-black text-xl md:text-2xl tracking-tighter">Vasanta</span>
                </div>
                <p className="text-[11px] text-slate-500 font-bold tracking-tight">Spring is here. Time to gently clear the Kapha accumulation of winter.</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-forest p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] text-white relative overflow-hidden group hover:scale-[1.02] transition-all duration-700 shadow-xl shadow-forest/20"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10" />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tighter">Your Nature</h3>
                <p className="text-white/60 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-8 md:mb-10">Discover your unique Dosha Blueprint</p>
                <Link
                  href="/veda-ai?tab=quiz"
                  className="inline-flex items-center gap-3 md:gap-4 bg-white text-forest px-6 md:px-10 py-3 md:py-4 rounded-3xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-lg"
                >
                  Assessment Hub <ShieldCheck className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col gap-6">

            {/* Deterministic Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Drift Index */}
              <div className="glass p-6 rounded-3xl border border-white/60 shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
                <Compass className="w-5 h-5 text-forest/50 mb-4" />
                <span className="text-[10px] font-black text-forest uppercase tracking-[0.2em] mb-1">Dosha Drift</span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-forest">{isLoaded ? Math.round(vikriti.drift_index) : '--'}%</span>
                  {isLoaded && <span className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase">({vikriti.dominant_dosha})</span>}
                </div>
              </div>

              {/* Agni Engine */}
              <div className="glass p-6 rounded-3xl border border-white/60 shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
                <Flame className="w-5 h-5 text-orange-400/70 mb-4" />
                <span className="text-[10px] font-black text-forest uppercase tracking-[0.2em] mb-1">Agni Status</span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-orange-600">{isLoaded ? Math.round(state.agni_strength) : '--'}</span>
                  {isLoaded && <span className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase">/ 100</span>}
                </div>
              </div>

              {/* Circadian Sync */}
              <div className="glass p-6 rounded-3xl border border-white/60 shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
                <Moon className="w-5 h-5 text-blue-400/70 mb-4" />
                <span className="text-[10px] font-black text-forest uppercase tracking-[0.2em] mb-1">Circadian Sync</span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-blue-600">{isLoaded ? Math.round(state.circadian_alignment) : '--'}%</span>
                </div>
              </div>
            </div>

            {/* Morning Dialogue Navigation Card */}
            <div className="glass p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] shadow-premium border border-white/60 h-full flex flex-col justify-center items-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] md:rounded-[2.5rem] bg-emerald-50 text-emerald-500 flex items-center justify-center mb-8 md:mb-10 shadow-lg group-hover:scale-110 transition-transform duration-700 relative z-10">
                <HistoryIcon className="w-10 h-10 md:w-12 md:h-12" />
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter mb-4 md:mb-6 relative z-10 text-balance">
                Morning Dialogue
              </h2>

              <p className="text-slate-500 font-bold text-sm md:text-lg max-w-lg mx-auto leading-relaxed mb-8 md:mb-10 relative z-10 text-balance">
                Audit your biological flow. Log your sleep, diet, and routines to calculate your daily Ojas and receive personalized AI guidance.
              </p>

              <Link
                href="/veda-ai?tab=log"
                className="inline-flex items-center gap-4 bg-forest text-white px-8 md:px-12 py-4 md:py-5 rounded-3xl text-[10px] md:text-xs font-black uppercase tracking-widest shadow-xl shadow-forest/20 hover:bg-forest/90 active:scale-[0.98] transition-all relative z-10 text-center"
              >
                Log Daily Pulse <Activity className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>
          </motion.div>

        </div>
      </main>
    </motion.div>
  );
}
