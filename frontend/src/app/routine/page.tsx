"use client";

import Link from "next/link";
import { ROUTINES } from "@/data";
import { Clock, Repeat, ArrowRight, Sun, Moon, CloudSun } from "lucide-react";
import { motion } from "framer-motion";

export default function RoutineLandingPage() {
  const manualRoutines = Object.entries(ROUTINES);
  const clinicalRoutines = [
    { slug: "morning-clinical", name: "Sattva Morning (Clinical)", icon: CloudSun, time: "Brahmamuhurta" },
    { slug: "midday-clinical", name: "Solar Peak (Clinical)", icon: Sun, time: "12:00 PM - 2:00 PM" },
    { slug: "evening-clinical", name: "Lunar Descent (Clinical)", icon: Moon, time: "6:00 PM - 8:00 PM" }
  ];

  return (
    <div className="bg-[#F8FAF9] min-h-screen font-sans pb-40 relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-forest/5 rounded-full -ml-40 -mt-40 blur-[120px]" />
      
      <main className="max-w-6xl mx-auto px-6 pt-24 relative z-10">
        <header className="mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-forest/90 mb-3">
            Life Architecture
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-forest tracking-tighter mb-6">
            Daily Routines
          </h1>
          <p className="text-lg text-slate-500 font-semibold max-w-2xl leading-relaxed">
            Dinacharya is the anchor of wellness. Align your actions with the sun to minimize biological friction and maximize vitality.
          </p>
        </header>

        {/* Veda-Core Clinical Routines */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Repeat className="w-5 h-5 text-forest" />
            <h2 className="text-xs font-black text-forest uppercase tracking-[0.3em]">Core Biological Sequence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clinicalRoutines.map((r) => (
              <Link key={r.slug} href={`/routine/${r.slug}`}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-forest/5 transition-colors" />
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-white group-hover:shadow-md transition-all relative z-10">
                    <r.icon className="w-7 h-7 text-forest" />
                  </div>
                  <h3 className="text-xl font-black text-forest mb-2 relative z-10">{r.name}</h3>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-widest relative z-10 mb-8">{r.time}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-forest uppercase tracking-widest group-hover:translate-x-1 transition-transform relative z-10">
                    View Sequence <ArrowRight className="w-3 h-3" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Curated Lifecycle Routines */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-5 h-5 text-gold" />
            <h2 className="text-xs font-black text-forest uppercase tracking-[0.3em]">Specialized Lifecycles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {manualRoutines.map(([slug, r]: [string, any]) => (
              <Link key={slug} href={`/routine/${slug}`}>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="bg-white/60 hover:bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">
                      {r.category} Sequence
                    </span>
                    <h3 className="text-2xl font-black text-forest tracking-tight group-hover:text-emerald-700 transition-colors">
                      {r.name}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-forest group-hover:bg-forest group-hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
