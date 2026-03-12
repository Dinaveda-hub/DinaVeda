"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Wind, Droplets, Activity, Sparkles, ShieldCheck, Target, HeartPulse } from "lucide-react";
import { CALCULATORS } from "@/data/calculators";

export default function ToolsHubPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-[#FAFBFB] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest/5 rounded-full -mr-40 -mt-40 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -ml-40" />

      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">
          Dinaveda
        </Link>
        <div className="flex gap-8 items-center">
            <Link href="/guide" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-colors">Education</Link>
            <Link href="/health" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-colors">Symptoms</Link>
            <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest bg-forest/5 px-6 py-2.5 rounded-full hover:bg-forest hover:text-white transition-all">
              Analysis
            </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest mb-8">
             <Sparkles className="w-3.5 h-3.5 inline-block mr-2" /> Interactive Diagnostics
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Biological <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
              Analysis Tools
            </span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
            "Measure what is measurable, and make measurable what is not so."
          </p>
        </motion.header>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {Object.values(CALCULATORS).map((calc) => (
            <motion.div key={calc.id} variants={item}>
              <Link href={`/tools/${calc.id}`} className="group block h-full">
                <div className="bg-white p-10 md:p-14 rounded-[4rem] border border-slate-100 shadow-premium group-hover:border-forest/20 transition-all group-hover:shadow-2xl relative overflow-hidden h-full flex flex-col">
                  {/* Background Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${calc.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />
                  
                  <div className={`w-16 h-16 rounded-2xl ${calc.color} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                    <calc.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-black text-forest tracking-tight mb-4 group-hover:text-emerald-600 transition-colors">
                    {calc.title}
                  </h2>
                  
                  <p className="text-slate-500 font-medium leading-relaxed mb-10 flex-1">
                    {calc.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-forest transition-colors">
                      Start Assessment
                    </span>
                    <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-forest group-hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {/* Static Coming Soon Card */}
          <motion.div variants={item}>
            <div className="bg-slate-50/50 p-10 md:p-14 rounded-[4rem] border border-slate-100 border-dashed text-center flex flex-col items-center justify-center h-full opacity-60">
               <HeartPulse className="w-10 h-10 text-slate-300 mb-6" />
               <h3 className="text-xl font-black text-slate-400 tracking-tight uppercase">Ojas Vitality Score</h3>
               <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">In Development</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Global CTA */}
        <section className="mt-32">
          <div className="bg-slate-900 p-12 md:p-24 rounded-[4rem] text-white overflow-hidden relative shadow-3xl">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500 blur-[150px] opacity-20 pointer-events-none -mr-40 -mt-40" />
             <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
                <div className="flex-1 space-y-8 text-center md:text-left">
                   <h2 className="text-4xl md:text-6xl font-[1000] tracking-tighter leading-none">
                     Go Beyond <br />
                     <span className="text-emerald-400 underline decoration-emerald-400/20 underline-offset-8">Single Samples.</span>
                   </h2>
                   <p className="text-slate-400 font-medium leading-relaxed max-w-xl text-lg">
                     A single test is just a snapshot. The Dinaveda engine tracks your metabolic pulse 24/7 to predict changes before they manifest as fatigue or illness.
                   </p>
                   <Link 
                     href="/login" 
                     className="inline-flex items-center gap-4 bg-white text-slate-900 px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95"
                   >
                     Full Neural Analysis <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-[4rem] bg-slate-800 border border-white/5 flex items-center justify-center p-12 shrink-0 group">
                   <div className="relative">
                      <Target className="w-24 h-24 text-forest mb-4 opacity-20 group-hover:scale-125 transition-transform duration-700" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <ShieldCheck className="w-16 h-16 text-emerald-400 shadow-2xl" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
