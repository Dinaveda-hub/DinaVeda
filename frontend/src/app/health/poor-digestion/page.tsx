"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Thermometer, Flame, AlertCircle, Sparkles, CheckCircle2, Shield, Activity } from "lucide-react";
import { motion } from "framer-motion";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ayurvedic Perspective on Poor Digestion: Causes and Fixes",
  "description": "Struggling with slow or irregular digestion? Learn how Agni (digestive fire) affects your health and discover Ayurvedic tips to optimize your metabolism.",
  "about": [
    { "@type": "Thing", "name": "Digestion" },
    { "@type": "Thing", "name": "Agni" },
    { "@type": "Thing", "name": "Ayurveda" }
  ]
};

export default function PoorDigestionPage() {
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-8">
            Metabolic Foundation
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Struggling With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              Poor Digestion?
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            In Ayurveda, you aren't what you eat—you are what you digest. If your Agni is flickering, your health is at risk.
          </p>
        </motion.header>

        <section className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Engine of Life</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Digestion is more than breaking down food; it's the process of turning the outside world into <strong>YOU</strong>. When this process is compromised, it creates a cascade of fatigue, skin issues, and mental cloudiness.
              </p>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4">
                <AlertCircle className="w-5 h-5 text-orange-400 shrink-0" />
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Poor digestion is the "Mother of all Diseases" in Ayurvedic texts. It's where 90% of imbalances begin.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-premium">
              <Flame className="w-12 h-12 text-orange-500 mb-6" />
              <h3 className="text-xl font-black text-forest mb-4">The Agni Principle</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                <strong>Agni</strong> is your biological fire. It must be steady—not too high (creates acidity) and not too low (creates heaviness). Most people suffer from "irregular" fire caused by inconsistent habits.
              </p>
              <Link href="/guide/agni" className="text-xs font-black text-forest uppercase tracking-widest block pt-4">Explore Agni →</Link>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center">Optimization Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Ginger Ignition", icon: Sparkles, desc: "A thin slice of ginger with salt 15 mins before meals primes your Agni." },
                { title: "Liquid Hierarchy", icon: Shield, desc: "Avoid drinking iced water with food. Sip small amounts of room-temp water." },
                { title: "Posture Matters", icon: Activity, desc: "Sit tall while eating. Compression of the gut limits enzymatic flow." },
                { title: "The 70% Rule", icon: CheckCircle2, desc: "Leave 1/4 of your stomach empty to allow the 'churning' of digestion." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm">
                   <item.icon className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                   <div>
                     <h4 className="font-black text-forest mb-2">{item.title}</h4>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                   </div>
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
              Analyze Your <br /> Metabolic State
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Dinaveda's engine calculates your Agni strength based on appetite, tongue, and energy patterns.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Start My Analysis <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
