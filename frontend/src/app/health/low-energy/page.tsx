"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Battery, Sparkles, AlertCircle, Coffee, Moon, Shield } from "lucide-react";
import { motion } from "framer-motion";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Why Do I Feel Tired All The Time? Ayurvedic Explanation of Chronic Fatigue",
  "description": "Learn the Ayurvedic perspective on low energy and fatigue. Understand how low Ojas and Ama accumulation drain your vitality and how to restore it.",
  "about": [
    { "@type": "Thing", "name": "Fatigue" },
    { "@type": "Thing", "name": "Ojas" },
    { "@type": "Thing", "name": "Ayurveda" }
  ]
};

export default function LowEnergyPage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/health" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-forest transition-all">
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-8">
            Vitality & Metabolism
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Why Am I Tired <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              All The Time?
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Fatigue is rarely just about sleep. It's often about how your body manages Ojas—the essence of your reserve energy.
          </p>
        </motion.header>

        <section className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Vitality Gap</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Modern fatigue is often driven by "leaking" energy through chronic stress and poor metabolic clearance. Caffeine treats the symptom, but Ayurveda treats the container.
              </p>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="font-black text-forest mb-2 flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-orange-400" /> Caffeine Debt
                </h4>
                <p className="text-xs text-slate-500 font-medium">Artificial stimulation masks the depletion of Ojas, leading to a biological crash that requires longer recovery times.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-premium">
              <Battery className="w-12 h-12 text-orange-500 mb-6" />
              <h3 className="text-xl font-black text-forest mb-4">The Ojas Principle</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                <strong>Ojas</strong> is the ultimate product of perfect digestion. When you feel tired despite "normal" labs, it's often because your energy essence (Ojas) is low or being blocked by metabolic waste (Ama).
              </p>
              <Link href="/guide/ojas" className="text-xs font-black text-forest uppercase tracking-widest block pt-4">Learn about Ojas →</Link>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center mb-12">Two Types of Fatigue</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-8 bg-orange-50/50 rounded-3xl border border-orange-100">
                <h4 className="text-xl font-black text-orange-600 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> Depletion Fatigue
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">You feel empty, dry, and brittle. Common in high-stress Vata types who over-work and under-rest. Ojas is depleted.</p>
                <div className="text-[10px] font-black uppercase text-orange-400 tracking-widest">Cause: Low Ojas</div>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Blockage Fatigue
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">You feel heavy, stiff, and foggy. Common when metabolic waste (Ama) clogs your body's energy channels. Ojas is blocked.</p>
                <div className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Cause: High Ama</div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Restoration Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Abhyanga", icon: Sparkles, desc: "Oil massage calms the nervous system and prevents Ojas leakage." },
                { title: "Sleep Windows", icon: Moon, desc: "Sleeping before 10PM (Kapha time) ensures biological repair." },
                { title: "Digestive rest", icon: AlertCircle, desc: "Stopping meals at 7PM prevents Ama build-up overnight." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center">
                   <item.icon className="w-10 h-10 text-orange-500 mx-auto mb-6" />
                   <h4 className="font-black text-forest mb-2">{item.title}</h4>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
            >
              Check Your <br /> Vitality Core
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Dinaveda tracks your energy history to identify if you are depleted or just blocked.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Analyze My Energy <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
