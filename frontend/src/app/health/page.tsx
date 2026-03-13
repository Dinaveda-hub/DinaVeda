"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Shield, Sparkles, AlertCircle, Compass, Activity, Thermometer, Brain, Wind } from "lucide-react";
import { motion } from "framer-motion";

const SYMPTOMS = [
  { 
    name: "Bloating", 
    slug: "bloating", 
    icon: Wind, 
    color: "text-blue-500", 
    desc: "Abdominal distention or gas following meals may indicate impaired digestive function. In Ayurvedic physiology, bloating is commonly associated with irregular digestion (Vishama Agni) and increased Vata activity within the gastrointestinal tract.",
    pattern: "Vata imbalance and irregular digestive function"
  },
  { 
    name: "Low Energy", 
    slug: "low-energy", 
    icon: Zap, 
    color: "text-orange-500", 
    desc: "Persistent fatigue may arise from inefficient metabolic processes, insufficient nutrient assimilation, or accumulation of metabolic residue (Ama). Ayurveda evaluates fatigue by assessing digestive strength and tissue nourishment.",
    pattern: "Reduced metabolic vitality or Ama accumulation"
  },
  { 
    name: "Poor Digestion", 
    slug: "poor-digestion", 
    icon: Thermometer, 
    color: "text-emerald-500", 
    desc: "Symptoms such as heaviness after meals, acid reflux, irregular bowel movements, or reduced appetite may indicate impaired digestive fire (Agni). Digestive imbalance is considered a primary contributor to many chronic health complaints in Ayurveda.",
    pattern: "Impaired digestive function (Agni dysfunction)"
  },
  { 
    name: "Brain Fog", 
    slug: "brain-fog", 
    icon: Brain, 
    color: "text-indigo-500", 
    desc: "Cognitive sluggishness, reduced concentration, and mental fatigue may occur when metabolic residue (Ama) affects neurological function. Digestive imbalance and Kapha accumulation are commonly implicated.",
    pattern: "Kapha accumulation and Ama influence"
  },
  { 
    name: "Anxiety", 
    slug: "anxiety", 
    icon: Activity, 
    color: "text-indigo-600", 
    desc: "Restlessness, excessive worry, or heightened nervous system activity may reflect Vata imbalance affecting neurological regulation and stress response mechanisms.",
    pattern: "Vata imbalance affecting the nervous system"
  },
  { 
    name: "Insomnia", 
    slug: "insomnia", 
    icon: Shield, 
    color: "text-slate-600", 
    desc: "Difficulty initiating or maintaining sleep may occur when circadian rhythm regulation and nervous system stability are disrupted. Ayurveda frequently associates insomnia with aggravated Vata activity.",
    pattern: "Vata disturbance and circadian disruption"
  },
  { 
    name: "Weight Gain", 
    slug: "weight-gain", 
    icon: Sparkles, 
    color: "text-amber-700", 
    desc: "Unintended weight gain can occur when metabolic rate slows and digestion becomes inefficient. In Ayurvedic physiology this pattern is commonly associated with Kapha predominance and reduced digestive fire.",
    pattern: "Kapha predominance with reduced metabolic activity"
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
  ],
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why do symptoms like bloating or fatigue keep returning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recurring symptoms often indicate an underlying imbalance in digestion, metabolism, or nervous system regulation. Ayurveda treats the root cause (dosha imbalance) rather than just masking the signal."
        }
      },
      {
        "@type": "Question",
        "name": "How does Ayurveda identify the cause of symptoms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ayurveda evaluates patterns related to the three doshas: Vata (air/ether), Pitta (fire/water), and Kapha (earth/water), alongside the strength of your digestive fire (Agni)."
        }
      },
      {
        "@type": "Question",
        "name": "Can symptoms be caused by multiple doshas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. While one dosha is often dominant, many conditions arise from combined imbalances. A personalized analysis is required to determine the specific interaction of elements in your body."
        }
      }
    ]
  }
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
            <Link href="/guide" className="text-sm font-bold text-slate-600 hover:text-forest transition-colors">Guide</Link>
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
        <header className="pt-14 md:pt-20 pb-10 md:pb-16 px-6 max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-xs font-black text-forest/90 uppercase tracking-[0.4em] mb-6">
              Ayurvedic Symptom Reference
            </span>
            <h1 className="text-3xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
              Understanding Health Symptoms <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
                Through Ayurvedic Physiology
              </span>
            </h1>
            <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
              Many common symptoms such as fatigue, digestive discomfort, anxiety, and cognitive slowing are early indicators of physiological imbalance.  
              Ayurveda interprets these symptoms by evaluating digestive function (Agni), metabolic residue (Ama), and the balance of the three regulatory systems known as Doshas: Vata, Pitta, and Kapha.
            </p>
          </motion.div>
        </header>

        {/* Symptoms Grid */}
        <section className="py-14 md:py-20 px-6 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SYMPTOMS.map((symptom, i) => (
              <Link key={symptom.slug} href={`/health/${symptom.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-slate-50 ${symptom.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <symptom.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-black text-forest mb-2 flex items-center gap-2">
                      {symptom.name} <ArrowRight className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-all" />
                    </h2>
                    <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] mb-6">{symptom.pattern}</p>
                    <p className="text-slate-600 font-medium leading-relaxed">{symptom.desc}</p>
                    
                    {/* Programmatic Shortcuts */}
                    <div className="mt-8 pt-6 border-t border-slate-50 flex flex-wrap gap-2">
                      <Link href={`/health/${symptom.slug}-vata`} className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-forest transition-colors">Vata</Link>
                      <Link href={`/health/${symptom.slug}-pitta`} className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-forest transition-colors">Pitta</Link>
                      <Link href={`/health/${symptom.slug}-kapha`} className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-forest transition-colors">Kapha</Link>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Logic Section */}
        <section className="py-20 md:py-32 px-6 bg-forest text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 blur-[120px] opacity-10 pointer-events-none -mr-40" />
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-2xl md:text-5xl font-black tracking-tighter">Why Symptoms Often Recur</h2>
              <p className="text-emerald-100/70 text-lg leading-relaxed">
                Many conventional health approaches focus primarily on suppressing symptoms.  
                Ayurvedic medicine instead examines the underlying physiological imbalance that produces those symptoms.  
                Key factors include digestive function (Agni), metabolic residue (Ama), and the balance between Vata, Pitta, and Kapha.
              </p>
              <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
                <Link href="/guide/agni" className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
                  Learn about Agni <Compass className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 space-y-8">
              <div className="flex gap-6 items-start">
                <AlertCircle className="w-8 h-8 text-orange-400 shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-2">The Signal Trap</h4>
                  <p className="text-sm text-slate-300">When digestive function remains impaired over time, metabolic residue (Ama) may accumulate within physiological channels (Srotas). This accumulation is believed to contribute to chronic symptoms and systemic imbalance.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <Sparkles className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-2">The Dynamic Recovery</h4>
                  <p className="text-sm text-slate-300">Early recognition of physiological signals allows targeted dietary and lifestyle adjustments that support digestion, metabolic efficiency, and neurological balance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillar Content Section */}
        <section className="max-w-4xl mx-auto py-20 md:py-32 px-6 space-y-16">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tight">
              Physiological Interpretation of Symptoms in Ayurveda
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed font-medium text-base md:text-lg">
              <p>
                Ayurvedic medicine views symptoms as indicators of underlying physiological imbalance rather than isolated disease entities.  
              </p>
              <p>
                Many early health disturbances arise from impaired digestive capacity (Agni), accumulation of metabolic residue (Ama), or dysregulation of the three Doshas.  
              </p>
              <p>
                By identifying these patterns early, dietary modifications, lifestyle adjustments, and herbal interventions can be used to restore physiological equilibrium.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Digestive Function (Agni) in Ayurvedic Physiology</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Digestive efficiency is central to Ayurvedic health theory.  
                When digestion functions efficiently, nutrients are properly absorbed and tissues are nourished.  
                When digestion weakens, incomplete metabolism produces Ama, which may obstruct physiological channels and contribute to fatigue, cognitive slowing, digestive discomfort, and metabolic imbalance.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Physiological Regulation and Symptom Signaling</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Symptoms are physiological signals indicating that regulatory systems require adjustment.  
                Understanding these signals enables earlier intervention and may prevent progression into more complex health conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Medical Authority / E-E-A-T Section */}
        <section className="max-w-4xl mx-auto py-20 px-6 border-t border-slate-100">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-forest tracking-tight">
              Our Medical & Ayurvedic Review Process
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed">
              Dinaveda symptom insights are created using classical Ayurvedic
              physiology and reviewed by practitioners trained in traditional
              Ayurvedic medicine. Each article integrates knowledge from
              foundational Ayurvedic texts with modern understanding of digestion,
              metabolism, and nervous system regulation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white border border-slate-100 rounded-3xl">
                <h4 className="font-black text-forest mb-2 text-sm">
                  Ayurvedic Foundations
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Concepts such as Agni, Ama, and Dosha imbalance are derived from
                  classical Ayurvedic texts including the Charaka Samhita and
                  Ashtanga Hridaya.
                </p>
              </div>

              <div className="p-6 bg-white border border-slate-100 rounded-3xl">
                <h4 className="font-black text-forest mb-2 text-sm">
                  Medical Review
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Symptom explanations are reviewed by Ayurvedic practitioners
                  trained in digestive health and metabolic disorders to ensure
                  educational accuracy.
                </p>
              </div>

              <div className="p-6 bg-white border border-slate-100 rounded-3xl">
                <h4 className="font-black text-forest mb-2 text-sm">
                  Educational Purpose
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Dinaveda provides educational insights into Ayurvedic physiology
                  and lifestyle practices. It does not provide medical diagnosis or
                  treatment recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-slate-50 py-20 md:py-32 px-6 text-balance">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-5xl font-black text-forest tracking-tight">Frequently Asked Questions</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Ayurvedic Health Insights</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  q: "Why do symptoms like bloating or fatigue keep returning?",
                  a: "Recurring symptoms often indicate an underlying imbalance in digestion, metabolism, or nervous system regulation. Ayurveda treats the root cause rather than just masking the signal."
                },
                {
                  q: "How does Ayurveda identify the cause of symptoms?",
                  a: "Ayurveda evaluates patterns related to the three doshas: Vata (air/ether), Pitta (fire/water), and Kapha (earth/water), alongside the strength of your Agni."
                },
                {
                  q: "Can symptoms be caused by multiple doshas?",
                  a: "Yes. While one dosha is often dominant, many conditions arise from combined imbalances, requiring personalized analysis."
                },
                {
                  q: "How long does it take to see results?",
                  a: "While symptoms can begin to shift in 3-7 days of correct protocol, structural balance typically takes one full metabolic cycle (approximately 30 days)."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                  <h4 className="text-lg font-black text-forest leading-tight">{faq.q}</h4>
                  <p className="text-slate-600 font-medium leading-relaxed text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto overflow-hidden bg-white p-12 md:p-24 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-premium">
            <h2 className="text-3xl md:text-5xl font-[1000] tracking-tighter text-forest mb-8 italic uppercase text-balance">
              Assess Your Physiological Pattern
            </h2>
            <p className="text-slate-500 font-bold mb-12 uppercase tracking-widest text-sm max-w-md mx-auto">
              Dinaveda analyzes multiple physiological indicators related to digestion, energy metabolism, sleep quality, and nervous system balance to identify potential patterns of imbalance.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-3 bg-forest text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-forest/20 transition-all hover:bg-forest/90"
                >
                    Start Analysis <Activity className="w-5 h-5 ml-1" />
                </Link>
            </motion.div>

            {/* Medical Disclaimer */}
            <div className="mt-20 pt-8 border-t border-slate-50">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
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
