"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sun, Moon, Clock, Utensils, Droplet, Activity, Sparkles, BookOpen, Calendar, Repeat } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTINES } from "@/data/health-content";
import Footer from "@/components/Footer";
import TopicHubFooter from "@/components/TopicHubFooter";
import { notFound } from "next/navigation";

export default function RoutinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const routine = ROUTINES[slug];

  if (!routine) {
    notFound();
  }

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

      {/* Navigation */}
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
            Life Rhythm • {routine.category}
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            {routine.name}
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto italic">
            "Your routine is your destiny. Every biological event has its ideal window."
          </p>
        </motion.header>

        <section className="space-y-16">
          {/* Main Visual Routine */}
          <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-premium relative">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-12 text-center flex items-center justify-center gap-4">
               <Repeat className="w-4 h-4" /> The 24-Hour Cycle
            </h3>
            
            <div className="space-y-12">
              {routine.blocks.map((block, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-8 items-start md:items-center group">
                  <div className="w-full md:w-48 text-left md:text-right shrink-0">
                    <span className="text-xs font-black text-slate-400 tracking-widest">{block.time}</span>
                  </div>
                  <div className="hidden md:block w-3 h-3 rounded-full bg-slate-100 group-hover:bg-forest transition-colors shrink-0" />
                  <div className="flex-1 flex gap-6 items-center p-8 rounded-[2.5rem] bg-slate-50 border border-slate-50 group-hover:bg-white group-hover:border-slate-100 group-hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-forest shadow-sm group-hover:scale-110 transition-transform">
                      <block.icon className="w-6 h-6" />
                    </div>
                    <div>
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
              <h3 className="text-2xl font-black text-forest">The Power of Consistency</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Ayurveda teaches that the body operates on circadian rhythms (Dinacharya). When you align your eating, sleeping, and movement with the external cycle of the sun, biological repair happens automatically.
              </p>
              <div className="flex gap-4">
                 <Link href="/guide/dinacharya" className="text-xs font-black text-forest uppercase tracking-widest underline decoration-emerald-200 underline-offset-8 decoration-2 hover:decoration-forest transition-all">Read Guide →</Link>
                 <Link href="/guide/ritucharya" className="text-xs font-black text-forest uppercase tracking-widest underline decoration-emerald-200 underline-offset-8 decoration-2 hover:decoration-forest transition-all">Seasonal Wisdom →</Link>
              </div>
            </div>
            <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 space-y-6">
               <Calendar className="w-10 h-10 text-emerald-600" />
               <h4 className="text-xl font-black text-emerald-900">Adaptive Flow</h4>
               <p className="text-sm text-emerald-800/60 font-medium leading-relaxed">
                 Traditional routines are fixed, but your Dinaveda app adjusts these windows based on your real-time fatigue levels and metabolic data.
               </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center shadow-3xl shadow-forest/20">
             <motion.h3 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="text-3xl md:text-5xl font-black mb-8"
             >
               Build Your <br /> Perfect Rhythm
             </motion.h3>
             <Link 
               href="/login" 
               className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
             >
               Personalize My Routine <ArrowRight className="w-5 h-5" />
             </Link>
          </div>
        </section>
      </main>

      <TopicHubFooter />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(ROUTINES).map((slug) => ({
    slug,
  }));
}
