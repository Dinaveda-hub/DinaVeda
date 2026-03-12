"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Shield, Sparkles, AlertCircle, Compass, Activity, Thermometer, Brain, Wind } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const SYMPTOMS = [
  { 
    name: "Bloating", 
    slug: "bloating", 
    icon: Wind, 
    color: "text-blue-500", 
    desc: "Why do you feel tight and gaseous after eating? Map the root cause.",
    pattern: "Vata + Agni Imbalance"
  },
  { 
    name: "Low Energy", 
    slug: "low-energy", 
    icon: Zap, 
    color: "text-orange-500", 
    desc: "Chronic fatigue vs. sporadic energy crashes. Identify the sludge.",
    pattern: "Ojas Depletion / Ama"
  },
  { 
    name: "Poor Digestion", 
    slug: "poor-digestion", 
    icon: Thermometer, 
    color: "text-emerald-500", 
    desc: "Heaviness, acidity, or irregular bowel movements clarified.",
    pattern: "Agni Dysfunction"
  },
  { 
    name: "Brain Fog", 
    slug: "brain-fog", 
    icon: Brain, 
    color: "text-indigo-500", 
    desc: "Mental cloudiness and lack of focus translated into biology.",
    pattern: "Kapha + High Ama"
  },
  { 
    name: "Anxiety", 
    slug: "anxiety", 
    icon: Activity, 
    color: "text-indigo-600", 
    desc: "Nervous energy and restlessness mapped to your nervous system.",
    pattern: "Vata Aggravation"
  },
  { 
    name: "Insomnia", 
    slug: "insomnia", 
    icon: Shield, 
    color: "text-slate-600", 
    desc: "Difficulty falling or staying asleep. Reset your biological clock.",
    pattern: "Vata / Circadian Drift"
  },
  { 
    name: "Weight Gain", 
    slug: "weight-gain", 
    icon: Sparkles, 
    color: "text-amber-600", 
    desc: "Stubborn weight and metabolic slows explained through elements.",
    pattern: "Kapha / Low Agni"
  }
];

const HEALTH_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Health Symptom Hub: An Ayurvedic Perspective",
  "description": "Understand your symptoms through the lens of Ayurvedic physiology. Bloating, fatigue, brain fog, and more explained.",
  "about": [
    { "@type": "Thing", "name": "Health Symptoms" },
    { "@type": "Thing", "name": "Ayurveda" },
    { "@type": "Thing", "name": "Digestion" }
  ]
};

export default function HealthHubPage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HEALTH_JSON_LD) }}
      />

      {/* Top Navigation */}
      <nav className="p-6 bg-white border-b border-slate-50 flex justify-between items-center w-full sticky top-0 z-[70] backdrop-blur-md">
        <div className="flex items-center gap-12 max-w-7xl mx-auto w-full">
          <Link href="/" className="font-black text-forest text-2xl tracking-tighter flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 relative group-hover:scale-110 transition-transform">
              <Image src="/logo.png" alt="Dinaveda" fill sizes="32px" className="object-contain" />
            </div>
            Dinaveda
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/guide" className="text-sm font-bold text-slate-400 hover:text-forest transition-colors">Guide</Link>
            <Link href="/health" className="text-sm font-black text-forest">Symptom Hub</Link>
          </div>
          <div className="ml-auto">
            <Link 
              href="/login" 
              className="text-xs font-black text-white bg-forest px-6 py-2.5 rounded-full uppercase tracking-widest hover:bg-forest/90 transition-all shadow-lg shadow-forest/10"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <header className="pt-20 pb-16 px-6 max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-xs font-black text-forest/60 uppercase tracking-[0.4em] mb-6">
              Symptom Hub
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
              Translate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
                Body's Signals
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
              Modern symptoms are often ancient signals of physiological imbalance. 
              Identify the patterns behind your discomfort.
            </p>
          </motion.div>
        </header>

        {/* Symptoms Grid */}
        <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SYMPTOMS.map((symptom, i) => (
              <Link key={symptom.slug} href={`/health/${symptom.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="p-10 rounded-[3.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-slate-50 ${symptom.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <symptom.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-black text-forest mb-2 flex items-center gap-2">
                      {symptom.name} <ArrowRight className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-all" />
                    </h2>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-6">{symptom.pattern}</p>
                    <p className="text-slate-600 font-medium leading-relaxed">{symptom.desc}</p>
                    
                    {/* Programmatic Shortcuts */}
                    <div className="mt-8 pt-6 border-t border-slate-50 flex flex-wrap gap-2">
                      <Link href={`/health/${symptom.slug}-vata`} className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-colors">Vata</Link>
                      <Link href={`/health/${symptom.slug}-pitta`} className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-colors">Pitta</Link>
                      <Link href={`/health/${symptom.slug}-kapha`} className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-colors">Kapha</Link>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Logic Section */}
        <section className="py-32 px-6 bg-forest text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 blur-[120px] opacity-10 pointer-events-none -mr-40" />
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Why Symptoms Persist</h2>
              <p className="text-emerald-100/70 text-lg leading-relaxed">
                Most health protocols target the <strong>symptom</strong> (Vikriti). 
                Dinaveda targets the <strong>source code</strong> (Prakriti and Agni). 
                When you understand the elemental cause, the symptom naturally clears.
              </p>
              <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
                <Link href="/guide" className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
                  Learn about Agni <Compass className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[4rem] border border-white/10 space-y-8">
              <div className="flex gap-6 items-start">
                <AlertCircle className="w-8 h-8 text-orange-400 shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-2">The Signal Trap</h4>
                  <p className="text-sm text-slate-300">Ignoring symptoms like bloating or fatigue leads to chronic accumulation (Ama), which eventually manifest as disease.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <Sparkles className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-2">The Dynamic Recovery</h4>
                  <p className="text-sm text-slate-300">By adjusting daily protocol based on raw signals, you restore biological balance before it becomes structural debt.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto overflow-hidden bg-white p-16 md:p-24 rounded-[4rem] border border-slate-100 shadow-premium">
            <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter text-forest mb-8 italic uppercase">
              Identify Your Pattern
            </h2>
            <p className="text-slate-500 font-bold mb-12 uppercase tracking-widest text-sm max-w-md mx-auto">
              Our Physiology Engine analyzes 20+ signals to detect the root cause of your symptoms.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-3 bg-forest text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-forest/20 transition-all hover:bg-forest/90"
                >
                    Start Analysis <Activity className="w-5 h-5 ml-1" />
                </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
