"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Activity, AlertCircle, Wind, Sparkles, Moon, Anchor, Zap } from "lucide-react";
import { motion } from "framer-motion";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ayurvedic Perspective on Anxiety: Causes and Natural Solutions",
  "description": "Understand anxiety through the lens of Vata imbalance. Learn how the air element affects your nervous system and Ayurvedic tips to find your center.",
  "about": [
    { "@type": "Thing", "name": "Anxiety" },
    { "@type": "Thing", "name": "Vata" },
    { "@type": "Thing", "name": "Ayurveda" }
  ]
};

export default function AnxietyPage() {
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-8">
            Nervous System
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Why Do I Feel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
              So Anxious?
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Ayurveda views anxiety as "excess movement" in the nervous system—a Vata disturbance that requires grounding.
          </p>
        </motion.header>

        <section className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Air-Nerve Connection</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Anxiety is a state of "cold and mobile" energy. Your nervous system is reacting to <strong>Vata</strong> aggravation—irregular schedules, cold food, and excessive stimulation that "blows out" your biological pilot light.
              </p>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="font-black text-forest mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-indigo-400" /> Vata Symptoms
                </h4>
                <ul className="text-sm font-bold text-slate-500 space-y-2">
                  <li>• Racing thoughts and over-analysis</li>
                  <li>• Difficulty sitting still or focus shifts</li>
                  <li>• Restless sleep or sudden waking</li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-premium">
              <Wind className="w-12 h-12 text-indigo-500 mb-6" />
              <h3 className="text-xl font-black text-forest mb-4">The Stability Fix</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                To calm anxiety, Ayurveda uses the Law of Opposites. You need <strong>Heat, Weight, and Rhythm</strong>. By grounding the physical body, the mental Vata naturally subsides.
              </p>
              <Link href="/guide/doshas" className="text-xs font-black text-forest uppercase tracking-widest block pt-4">Learn about Vata →</Link>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center">Grounding Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Warm Oil", icon: Sparkles, desc: "Applying oil (Abhyanga) creates a protective 'shield' for the nerves." },
                { title: "Root Foods", icon: Anchor, desc: "Sweet potatoes and grains provide the 'Earth' element to ground the 'Air'." },
                { title: "Pranayama", icon: Zap, desc: "Nadi Shodhana (Alternate Nostril Breath) balances the left and right brain." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 text-center shadow-sm">
                   <item.icon className="w-10 h-10 text-indigo-500 mx-auto mb-6" />
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
              Restore Your <br /> Internal Peace
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Dinaveda maps your Vata load in real-time and alerts you when your rhythm is becoming unstable.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Analyze My Stress <Activity className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
