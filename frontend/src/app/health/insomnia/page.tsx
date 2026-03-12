"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Moon, Shield, Sparkles, Zap, Activity, AlertCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import TopicHubFooter from "@/components/TopicHubFooter";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ayurvedic Solutions for Insomnia and Sleep Problems",
  "description": "Struggling to sleep? Learn the Ayurvedic perspective on insomnia. Understand how your internal clock and Vata affect sleep quality and how to reset them.",
  "about": [
    { "@type": "Thing", "name": "Insomnia" },
    { "@type": "Thing", "name": "Sleep" },
    { "@type": "Thing", "name": "Ayurveda" }
  ]
};

export default function InsomniaPage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/health" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-all">
          <ArrowLeft className="w-4 h-4" /> Symptom Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">Dinaveda</Link>
        <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1">Assessment</Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest mb-8">
            Rest & Recovery
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Can't Fall or <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-indigo-900">
              Stay Asleep?
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Sleep is when your body clear Ama and restores Ojas. If your internal clock is drifting, your recovery is failing.
          </p>
        </motion.header>

        <section className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Circadian Drift</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Modern light exposure and late-night habits disrupt the <strong>Kapha</strong> window (6PM - 10PM) meant for grounding. By 10PM, the <strong>Pitta</strong> energy rises to clear metabolic waste—if you're awake, it becomes mental energy, making sleep impossible.
              </p>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4">
                <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
                <p className="text-xs text-slate-500 font-medium leading-relaxed">The "Second Wind" you feel at 10:30 PM is actually your body trying to digest toxins. Staying awake during this window creates chronic fatigue.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-premium">
              <Moon className="w-12 h-12 text-slate-700 mb-6" />
              <h3 className="text-xl font-black text-forest mb-4">Vata & The Nervous System</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Interrupted sleep (waking at 3AM) is typically a sign of excess <strong>Vata</strong>. The nervous system is too "light" and "dry" to remain in deep rest. Grounding rituals are required.
              </p>
              <Link href="/guide/dinacharya" className="text-xs font-black text-forest uppercase tracking-widest block pt-4">Learn about Timing →</Link>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center">Ayurvedic Sleep Hygiene</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "The 10PM Rule", icon: AlertCircle, desc: "Be in bed before the Pitta window starts to allow metabolic clearance." },
                { title: "Foot Massage", icon: Sparkles, desc: "Applying oil to the soles of the feet grounds Vata instantly." },
                { title: "Early Dinner", icon: Zap, desc: "Stop eating 3 hours before bed so your energy can focus on sleep, not digestion." },
                { title: "Blue Light Lockout", icon: Shield, desc: "Sensory withdrawal (Pratyahara) is essential for calming the mind." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm">
                   <item.icon className="w-6 h-6 text-slate-600 shrink-0 mt-1" />
                   <div>
                     <h4 className="font-black text-forest mb-2">{item.title}</h4>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 blur-[100px] opacity-10 pointer-events-none -mr-20" />
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
            >
              Master Your <br /> Night Rhythm
            </motion.h3>
            <p className="text-slate-400 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Dinaveda's Somasleep module detects circadian drift and helps you reset your biological midnight.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Fix My Sleep <Activity className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </article>

      <TopicHubFooter />
      <Footer />
    </div>
  );
}
