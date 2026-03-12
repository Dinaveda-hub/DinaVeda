"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Clock, AlertTriangle, Bookmark, Heart, Info, Sparkles, Activity, Repeat, Zap, Utensils, Wind as WindIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTINES, RAW_PROTOCOLS } from "@/data";

interface RoutineClientProps {
  slug: string;
}

export default function RoutineClient({ slug }: RoutineClientProps) {
  let routine = ROUTINES[slug] as any;
  let isClinical = false;

  if (!routine && slug.endsWith("-clinical")) {
    const timeOfDay = slug.split("-")[0];
    const filteredProtocols = RAW_PROTOCOLS.filter(p => p.time_of_day === timeOfDay).slice(0, 8);
    
    if (filteredProtocols.length > 0) {
      isClinical = true;
      routine = {
        id: slug,
        name: `${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} Clinical Routine`,
        category: "daily",
        blocks: filteredProtocols.map((p: any, idx: number) => {
          const baseHours: Record<string, number> = { morning: 6, midday: 12, evening: 18 };
          const hour = (baseHours[timeOfDay] || 8) + Math.floor(idx * 0.5);
          const minutes = idx % 2 === 0 ? "00" : "30";
          
          return {
            time: `${hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`,
            activity: p.name.split('_').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
            description: p.instructions,
            icon: p.category.includes('digestive') ? Utensils : p.category.includes('vata') ? WindIcon : p.category.includes('kapha') ? Zap : Activity
          };
        })
      };
    }
  }

  if (!routine) { return null; }

  const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": routine.name,
    "description": `Ayurvedic ${routine.category} routine for biological balance.`,
    "about": [
      { "@type": "Thing", "name": "Ayurveda Routine" },
      { "@type": "Thing", "name": "Dinacharya" }
    ]
  };

  return (
    <div className="bg-[#FAFBFB] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/health" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-all">
          <ArrowLeft className="w-4 h-4" /> Symptom Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">
          Dinaveda
        </Link>
        <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1">
          Assessment
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest mb-8">
            {isClinical ? 'Veda-Core Clinical' : 'Life Rhythm'} • {routine.category}
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            {routine.name}
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto italic">
            "{isClinical ? 'Precision biological timing derived from clinical datasets.' : 'Your routine is your destiny. Every biological event has its ideal window.'}"
          </p>
        </motion.header>

        <section className="space-y-16">
          <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-premium relative">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-12 text-center flex items-center justify-center gap-4">
               <Repeat className="w-4 h-4" /> The 24-Hour Cycle
            </h3>
            
            <div className="space-y-12">
              {routine.blocks.map((block: any, idx: number) => (
                <div key={idx} className="flex flex-col md:flex-row gap-8 items-start md:items-center group">
                  <div className="w-full md:w-48 text-left md:text-right shrink-0">
                    <span className="text-xs font-black text-slate-400 tracking-widest">{block.time}</span>
                  </div>
                  <div className="hidden md:block w-3 h-3 rounded-full bg-slate-100 group-hover:bg-forest transition-colors shrink-0" />
                  <div className="flex-1 flex gap-6 items-center p-8 rounded-[2.5rem] bg-slate-50 border border-slate-50 group-hover:bg-white group-hover:border-slate-100 group-hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-forest shadow-sm group-hover:scale-110 transition-transform">
                      <block.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-black text-forest mb-1">{block.activity}</h4>
                      <p className="text-sm text-slate-500 font-medium">{block.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute top-32 left-[12.1rem] bottom-32 w-px bg-slate-100 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest">The "Time Drift" Cost</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Most health sites give you a fixed schedule. But your biology isn't fixed. On a high-Vata day, your routine needs more warmth; on a high-Kapha day, it needs more fire. Following a static routine at the wrong time creates "Circadian Drift"—a state where your hormones are trying to accelerate while your digestion is trying to brake.
              </p>
              <div className="flex gap-4">
                 <Link href="/guide/dinacharya" className="text-xs font-black text-forest uppercase tracking-widest underline decoration-emerald-200 underline-offset-8 decoration-2 hover:decoration-forest transition-all">Read Guide →</Link>
                 <Link href="/how-it-works" className="text-xs font-black text-forest uppercase tracking-widest underline decoration-emerald-200 underline-offset-8 decoration-2 hover:decoration-forest transition-all">How Drift is Measured →</Link>
              </div>
            </div>
            <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 space-y-6">
               <Activity className="w-10 h-10 text-emerald-600" />
               <h4 className="text-xl font-black text-emerald-900">Measure Your Window</h4>
               <p className="text-sm text-emerald-800/60 font-medium leading-relaxed">
                 {isClinical 
                  ? "This clinical sequence represents a biological ideal. The Dinaveda Circadian Tracker identifies exactly when your specific windows open and close today, preventing metabolic friction."
                  : "Traditional routines are fixed, but your Dinaveda app adjusts these windows based on your real-time fatigue levels and detected solar drag."
                 }
               </p>
            </div>
          </div>

          <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center shadow-3xl shadow-forest/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
             <motion.h3 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="text-3xl md:text-5xl font-black mb-8 italic"
             >
               Activate Your <br /> Metabolic Pulse
             </motion.h3>
             <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-sm mx-auto leading-loose">
               Stop following general advice. Get a routine that breathes with you.
             </p>
             <Link 
               href="/login" 
               className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
             >
               Start Personalization <ArrowRight className="w-5 h-5" />
             </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
