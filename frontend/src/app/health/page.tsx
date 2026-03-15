"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, Zap, Shield, Sparkles, AlertCircle, 
  Compass, Activity, Thermometer, Brain, Wind, Lock, Flame, 
  UtensilsCrossed, ZapOff, Moon, Hourglass, Target, Eye, 
  Clock, Droplets, ThermometerSnowflake, UserMinus, ShieldAlert
} from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SYMPTOMS } from "@/data/symptoms";

const SYMPTOMS_LIST = Object.values(SYMPTOMS);

const HEALTH_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ayurvedic Symptom Hub",
  "description": "Understand common health symptoms through Ayurvedic physiology including bloating, fatigue, anxiety, brain fog, and insomnia.",
  "about": [
    { "@type": "MedicalCondition", "name": "Bloating" },
    { "@type": "MedicalCondition", "name": "Fatigue" },
    { "@type": "MedicalCondition", "name": "Brain Fog" },
    { "@type": "MedicalCondition", "name": "Insomnia" },
    { "@type": "MedicalCondition", "name": "Anxiety" }
  ],
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": SYMPTOMS_LIST.map((s, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": s.name,
      "url": `https://dinaveda.com/health/${s.id}`
    }))
  }
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Health Hub",
      "item": "https://dinaveda.com/health"
    }
  ]
};

export default function HealthHubPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 h-1 bg-emerald-500 origin-left z-[80]"
        style={{ scaleX }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HEALTH_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />

      {/* Top Navigation */}
      <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-50 flex justify-between items-center w-full sticky top-0 z-[70]">
        <div className="flex items-center gap-12 max-w-7xl mx-auto w-full px-6">
          <Link href="/" className="font-black text-forest text-2xl tracking-tighter flex items-center gap-2 group shrink-0 py-2">
            <div className="w-8 h-8 relative group-hover:scale-110 transition-transform">
              <Image src="/logo.png" alt="Dinaveda" fill sizes="32px" className="object-contain" />
            </div>
            Dinaveda
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/guide" className="text-sm font-bold text-slate-600 hover:text-forest transition-colors py-2">Guide</Link>
            <Link href="/health" className="text-sm font-black text-forest py-2 border-b-2 border-forest/20">Symptom Hub</Link>
          </div>
          <div className="ml-auto">
            <Link 
              href="/login" 
              className="text-sm font-bold text-white bg-forest px-6 py-3 rounded-full uppercase tracking-widest hover:bg-forest/90 transition-all shadow-lg shadow-forest/10"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <header className="pt-12 md:pt-20 pb-8 md:pb-12 px-6 max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest mb-8">
              Clinical Reference
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-forest tracking-tight mb-8 leading-[1.1]">
              Understanding Health Symptoms <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
                Through Ayurvedic Physiology
              </span>
            </h1>

            {/* Top Review Block */}
            <div className="flex flex-col items-center gap-4 mt-8 mb-12">
              <div className="flex items-center gap-4 p-4 bg-white border border-slate-50 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-forest/5 border border-forest/10 flex items-center justify-center text-xs font-bold text-forest">
                  RK
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-forest uppercase tracking-wider leading-none mb-1">
                    Medically Reviewed by
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    Dr. Rahul K R, BAMS
                  </p>
                </div>
                <div className="h-8 w-px bg-slate-100 mx-2" />
                <div className="text-left hidden md:block text-xs">
                   <p className="text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">
                    Last Verified
                  </p>
                  <p className="text-slate-500 font-bold uppercase tracking-widest">
                    March 2026
                  </p>
                </div>
              </div>
            </div>

            <p className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto font-medium leading-relaxed mb-6">
              In Ayurvedic clinical practice, physiological signals—often called symptoms—are interpreted as indicators of imbalance in
              digestive function (Agni), metabolic residue (Ama), or regulatory systems.
            </p>
          </motion.div>
        </header>

        {/* Symptoms Grid */}
        <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {SYMPTOMS_LIST.map((symptom, i) => (
              <motion.div
                key={symptom.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl rounded-full" />
                
                <div className={`w-16 h-16 rounded-2xl bg-slate-100 ${symptom.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10`}>
                  <symptom.icon className="w-8 h-8" />
                </div>
                
                <div className="flex-1 space-y-6 relative z-10">
                  <div className="space-y-2">
                    <Link href={`/health/${symptom.id}`} className="block group/title">
                      <h2 className="text-xl md:text-2xl font-bold text-forest flex items-center gap-2 group-hover/title:text-emerald-600 transition-colors">
                        {symptom.name} <ArrowRight className="w-5 h-5 opacity-20 group-hover/title:opacity-100 transition-all -translate-x-2 group-hover/title:translate-x-0" />
                      </h2>
                    </Link>
                    <Link href={`/health/${symptom.id}`} className="inline-block text-xs font-bold uppercase text-emerald-600 tracking-wider hover:underline py-1">
                      Clinical Overview
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <p className="inline-block px-3 py-1 bg-slate-50 rounded-lg text-xs font-bold uppercase text-slate-500 tracking-wider">{symptom.pattern}</p>
                    <p className="text-slate-700 font-medium leading-relaxed text-base">{symptom.summary}</p>
                  </div>
                </div>

                {/* Programmatic Shortcuts */}
                <div className="mt-10 pt-8 border-t border-slate-50 relative z-10">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Therapeutic Variations</span>
                  <div className="flex flex-wrap gap-2">
                    {["Vata", "Pitta", "Kapha"].map((dosha) => (
                      <Link 
                        key={dosha}
                        href={`/health/${symptom.id}-${dosha.toLowerCase()}`} 
                        className="px-4 py-2.5 rounded-xl bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-white hover:bg-forest transition-all border border-slate-100 shadow-sm"
                      >
                        {dosha}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Logic Section */}
        <section className="py-20 md:py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 blur-[120px] opacity-10 pointer-events-none -mr-40" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-10">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">Why Symptoms <br />Often Recur</h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium">
                Many conventional health approaches focus primarily on suppressing symptoms.  
                Ayurvedic medicine instead examines the underlying physiological imbalance that produces those signals.  
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <Link href="/guide/agni" className="inline-flex items-center gap-3 bg-forest text-white px-10 py-5 rounded-full font-bold text-sm md:text-base uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-forest/20">
                  Explore Agni Biology <Compass className="w-5 h-5" />
                </Link>
                <Link href="/guide/ama" className="text-sm font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors py-2">
                  Waste Clearance Protocols
                </Link>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[3rem] md:rounded-[4.5rem] border border-white/10 space-y-10 relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center shrink-0 border border-orange-500/30">
                  <AlertCircle className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold mb-3">The Signal Trap</h4>
                  <p className="text-base text-slate-300 leading-relaxed">When digestive function remains impaired, metabolic residue (Ama) accumulates within physiological channels, contributing to chronic symptoms.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold mb-3">Dynamic Recovery</h4>
                  <p className="text-base text-slate-300 leading-relaxed">Early recognition of physiological signals allows targeted dietary and lifestyle adjustments that support metabolic efficiency.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillar Content Section */}
        <section className="max-w-3xl mx-auto py-20 md:py-32 px-6 space-y-24">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-forest tracking-tight">
              Physiological Interpretation
            </h2>
            <div className="space-y-6 text-slate-700 leading-relaxed font-medium text-base md:text-lg">
              <p>
                Ayurvedic medicine views symptoms as indicators of underlying physiological imbalance rather than isolated disease entities.  
              </p>
              <p>
                Many early health disturbances arise from impaired digestive capacity (Agni), accumulation of metabolic residue (Ama), or dysregulation of the three Doshas.  
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-forest tracking-tight">Digestive Function (Agni)</h3>
              <p className="text-slate-700 leading-relaxed font-medium text-base">
                Digestive efficiency is central to Ayurvedic health theory.  
                When digestion functions efficiently, nutrients are properly absorbed and tissues are nourished.  
                When digestion weakens, incomplete metabolism produces Ama, which may obstruct physiological channels.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-forest tracking-tight">Physiological Regulation</h3>
              <p className="text-slate-700 leading-relaxed font-medium text-base">
                Symptoms are physiological signals indicating that regulatory systems require adjustment.  
                Understanding these signals enables earlier intervention and may prevent progression into more complex health conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Early Warning Signs Section - Experience Signal */}
        <section className="max-w-3xl mx-auto py-20 px-6 space-y-12 bg-white rounded-[3rem] md:rounded-[4.5rem] border border-slate-100 mb-20 shadow-premium relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 opacity-50 blur-3xl rounded-full" />
          <div className="space-y-6 text-center md:text-left relative z-10">
            <h3 className="text-xl md:text-2xl font-semibold text-forest tracking-tight">
              Early Warning Signs
            </h3>
            <p className="text-slate-700 font-medium leading-relaxed max-w-2xl text-base md:text-lg">
              In Ayurvedic clinical practice, physiological signals are rarely isolated events. They are part of a systemic communication pattern.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="p-8 md:p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm transition hover:shadow-md">
              <h4 className="font-semibold text-forest mb-8 text-sm uppercase tracking-wider border-b border-slate-200/50 pb-3">Metabolic Indicators</h4>
              <ul className="space-y-5 text-base font-medium text-slate-700">
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" /> Irregular meal timing</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" /> Impaired Agni (Metabolism)</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" /> Ama accumulation</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" /> High processed food intake</li>
              </ul>
            </div>
            <div className="p-8 md:p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm transition hover:shadow-md">
              <h4 className="font-semibold text-forest mb-8 text-sm uppercase tracking-wider border-b border-slate-200/50 pb-3">Nervous System Triggers</h4>
              <ul className="space-y-5 text-base font-medium text-slate-700">
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" /> Chronic psychological stress</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" /> Insufficient sleep quality</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" /> Excessive sensory stimulation</li>
                <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" /> Information overload</li>
              </ul>
            </div>
          </div>
        </section>


        {/* Medical Authority / E-E-A-T Section */}
        <section className="max-w-3xl mx-auto py-20 md:py-32 px-6 border-t border-slate-100">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-forest tracking-tight">
                Medical & Ayurvedic Review
              </h2>
              <p className="text-slate-700 font-medium leading-relaxed text-base md:text-lg">
                Dinaveda symptom insights are created using classical Ayurvedic
                physiology and reviewed by practitioners trained in tradition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  t: "Ayurvedic Foundations",
                  d: "Concepts are derived from classical texts including the Charaka Samhita and Ashtanga Hridaya."
                },
                {
                  t: "Clinical Verification",
                  d: "Reviewed by Ayurvedic practitioners trained in digestive health and metabolic disorders."
                },
                {
                  t: "Educational Purpose",
                  d: "Provides educational insights into physiology and lifestyle. Does not provide medical diagnosis."
                }
              ].map((item) => (
                <div key={item.t} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-forest mb-4 text-base uppercase tracking-wider border-b border-slate-50 pb-2">
                    {item.t}
                  </h4>
                  <p className="text-base text-slate-600 font-medium leading-relaxed">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>

            {/* Doctor Reviewer Section */}
            <div className="flex items-center gap-6 mt-16 p-6 bg-slate-50 rounded-2xl border border-slate-100 max-w-fit">
              <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center text-xs font-bold text-forest border border-forest/20">
                RK
              </div>
              <div>
                <p className="text-sm font-bold text-forest uppercase tracking-widest mb-0.5">
                  Dr. Rahul K R, BAMS
                </p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Ayurvedic Physician
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-slate-50 py-20 md:py-32 px-6">
          <div className="max-w-3xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-forest tracking-tight">Frequently Asked Questions</h2>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Ayurvedic Health Insights</p>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  q: "Why do symptoms like bloating or fatigue keep returning?",
                  a: "Recurring symptoms often indicate an underlying imbalance in digestion, metabolism, or nervous system regulation. Ayurveda treats the root cause—such as weak Agni or Ama accumulation—rather than just masking the signal."
                },
                {
                  q: "How does Ayurveda identify the cause of symptoms?",
                  a: "Ayurveda evaluates patterns related to the three doshas: Vata (air/ether), Pitta (fire/water), and Kapha (earth/water), alongside the strength of your Agni (metabolic fire) and the presence of Ama (toxins)."
                },
                {
                  q: "Can symptoms be caused by multiple doshas?",
                  a: "Yes. While one dosha is often dominant, many conditions arise from combined imbalances (e.g., Vata-Pitta acidity), requiring a personalized approach to restore equilibrium."
                },
                {
                  q: "How long does it take to see results?",
                  a: "While symptoms can begin to shift in 3-7 days of correct protocol, structural balance typically takes one full metabolic cycle (approximately 30 days) to stabilize."
                }
              ].map((faq, i) => (
                <details key={i} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 open:shadow-md">
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer list-none">
                    <h4 className="text-base md:text-lg font-semibold text-forest pr-8 leading-tight">
                      {faq.q}
                    </h4>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-open:rotate-180 transition-transform shrink-0">
                      <ArrowRight className="w-4 h-4 text-forest rotate-90" />
                    </div>
                  </summary>
                  <div className="px-6 md:px-8 pb-8">
                    <p className="text-slate-700 font-medium leading-relaxed text-base border-t border-slate-50 pt-6">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto overflow-hidden bg-white p-12 md:p-24 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-premium">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-forest mb-8 italic uppercase text-balance">
              Identify Your Ayurvedic Health Pattern
            </h2>
            <p className="text-slate-500 font-medium mb-12 uppercase tracking-wider text-base max-w-md mx-auto leading-relaxed">
              Dinaveda analyzes multiple physiological indicators related to digestion, energy metabolism, sleep quality, and nervous system balance to identify potential patterns of imbalance.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-3 bg-forest text-white px-12 py-6 rounded-full font-bold text-sm md:text-base uppercase tracking-widest shadow-2xl shadow-forest/20 transition-all hover:bg-forest/90"
                >
                    Start Analysis <Activity className="w-5 h-5 ml-1" />
                </Link>
            </motion.div>

            {/* Medical Disclaimer */}
            <div className="mt-20 pt-8 border-t border-slate-50">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
                Dinaveda provides Ayurvedic educational insights. Our engine does not provide medical diagnosis or treatment. 
                Always consult a qualified healthcare professional for medical concerns.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
