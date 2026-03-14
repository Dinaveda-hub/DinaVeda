"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, Zap, Shield, Sparkles, AlertCircle, 
  Compass, Activity, Thermometer, Brain, Wind, Lock, Flame, 
  UtensilsCrossed, ZapOff, Moon, Hourglass, Target, Eye, 
  Clock, Droplets, ThermometerSnowflake, UserMinus, ShieldAlert
} from "lucide-react";
import { motion } from "framer-motion";

const SYMPTOMS = [
  // Digestive
  { 
    name: "Bloating", 
    slug: "bloating", 
    icon: Wind, 
    color: "text-blue-500", 
    desc: "Abdominal distention or gas following meals. Associated with irregular digestive fire (Vishama Agni).",
    pattern: "Vata imbalance & Vishama Agni"
  },
  { 
    name: "Poor Digestion", 
    slug: "poor-digestion", 
    icon: Thermometer, 
    color: "text-emerald-500", 
    desc: "Heaviness, acid reflux, or reduced appetite indicating impaired metabolic capacity (Agni).",
    pattern: "Agni Dysfunction"
  },
  { 
    name: "Constipation", 
    slug: "constipation", 
    icon: Lock, 
    color: "text-blue-600", 
    desc: "Dryness and downward energy blockage (Apana Vayu) halting natural waste movement.",
    pattern: "Vata Dryness"
  },
  { 
    name: "Acidity", 
    slug: "acidity", 
    icon: Flame, 
    color: "text-rose-500", 
    desc: "Excessive metabolic heat overflowing from the gut, involving liquid and hot Pitta qualities.",
    pattern: "Pitta Heat"
  },
  { 
    name: "Excess Gas", 
    slug: "gas", 
    icon: Wind, 
    color: "text-blue-400", 
    desc: "Accumulation of air and fermentation products due to a flickering digestive flame.",
    pattern: "Vishama Agni"
  },
  { 
    name: "Nausea", 
    slug: "nausea", 
    icon: AlertCircle, 
    color: "text-emerald-600", 
    desc: "Reverse movement of energy due to heavy metabolic stagnation and high Ama.",
    pattern: "Ama Stagnation"
  },
  { 
    name: "Loss of Appetite", 
    slug: "loss-of-appetite", 
    icon: UtensilsCrossed, 
    color: "text-orange-600", 
    desc: "Diminished digestive desire indicating a coating (Ama) on the sensing channels.",
    pattern: "Manda Agni"
  },

  // Energy & Metabolism
  { 
    name: "Fatigue", 
    slug: "fatigue", 
    icon: ZapOff, 
    color: "text-slate-500", 
    desc: "Deep-seated depletion of vital essence (Ojas) or deep blockage of channels by Ama.",
    pattern: "Ojas Depletion / Ama"
  },
  { 
    name: "Post-Meal Fatigue", 
    slug: "post-meal-fatigue", 
    icon: Moon, 
    color: "text-amber-600", 
    desc: "Lethargy following eating signifies that Agni is too weak to process the incoming load.",
    pattern: "Low Digestive Fire"
  },
  { 
    name: "Slow Metabolism", 
    slug: "slow-metabolism", 
    icon: Hourglass, 
    color: "text-emerald-700", 
    desc: "Sluggish transformation of food into energy; a Kapha-heavy state of cellular conversion.",
    pattern: "Manda Agni / Kapha"
  },
  { 
    name: "Weight Gain", 
    slug: "weight-gain", 
    icon: Sparkles, 
    color: "text-amber-700", 
    desc: "Metabolic stagnation and accumulation of the earth element (Kapha).",
    pattern: "Kapha Predominance"
  },

  // Mental & Sleep
  { 
    name: "Anxiety", 
    slug: "anxiety", 
    icon: Activity, 
    color: "text-indigo-600", 
    desc: "Excess Vata (air/ether) moving through the nervous tissue (Majja Dhatu).",
    pattern: "Vata Aggravation"
  },
  { 
    name: "Stress", 
    slug: "stress", 
    icon: Brain, 
    color: "text-indigo-500", 
    desc: "Sudden strain that depletes Ojas and forces Vata to move erraticly in the mind.",
    pattern: "Prana Vata Drift"
  },
  { 
    name: "Brain Fog", 
    slug: "brain-fog", 
    icon: Brain, 
    color: "text-indigo-800", 
    desc: "Mental Ama—heavy, sticky residue blocking the subtle channels of the mind.",
    pattern: "Kapha-Ama Influence"
  },
  { 
    name: "Poor Concentration", 
    slug: "poor-concentration", 
    icon: Target, 
    color: "text-indigo-700", 
    desc: "Unstable focus occurring when the clarity (Sattva) of the mind is clouded.",
    pattern: "Rajas/Ama Clouding"
  },
  { 
    name: "Insomnia", 
    slug: "insomnia", 
    icon: Shield, 
    color: "text-slate-600", 
    desc: "Vata-Pitta drift where the nervous system is too mobile to enter Kapha-rest.",
    pattern: "Vata-Pitta Drift"
  },
  { 
    name: "Night Waking", 
    slug: "night-waking", 
    icon: Eye, 
    color: "text-slate-700", 
    desc: "Interrupted sleep cycles, often specific to Vata (2-6 AM) or Pitta (10 PM-2 AM) peaks.",
    pattern: "Circadian Dosha Peak"
  },
  { 
    name: "Restless Sleep", 
    slug: "restless-sleep", 
    icon: Clock, 
    color: "text-slate-800", 
    desc: "Fragmented sleep indicating that the quality of stability (Tamoguna) is insufficient.",
    pattern: "Vata Moving Quality"
  },

  // Skin & Fluid
  { 
    name: "Hair Loss", 
    slug: "hair-loss", 
    icon: UserMinus, 
    color: "text-rose-600", 
    desc: "Excess Pitta heat 'burning' the follicles or Bhrajaka Pitta imbalance.",
    pattern: "Pitta Heat"
  },
  { 
    name: "Dry Skin", 
    slug: "dry-skin", 
    icon: Droplets, 
    color: "text-blue-500", 
    desc: "Lack of lubrication (Snehana) and excess of the dry quality of Vata.",
    pattern: "Vata Dryness"
  },
  { 
    name: "Acne", 
    slug: "acne", 
    icon: ShieldAlert, 
    color: "text-rose-500", 
    desc: "Eruption of Pitta-heated blood (Rakta) and Ama in the skin pores.",
    pattern: "Pitta-Rakta Heat"
  },
  { 
    name: "Water Retention", 
    slug: "water-retention", 
    icon: Droplets, 
    color: "text-emerald-500", 
    desc: "Kapha-related accumulation of heavy water and earth elements in tissues.",
    pattern: "Kapha Stagnation"
  },
  { 
    name: "Cold Hands & Feet", 
    slug: "cold-hands-feet", 
    icon: ThermometerSnowflake, 
    color: "text-blue-400", 
    desc: "Reduced circulation indicating Agni is too weak to push warmth to periphery.",
    pattern: "Weak Agni / Vata"
  }
];

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
    "itemListElement": SYMPTOMS.map((s, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": s.name,
      "url": `https://dinaveda.com/health/${s.slug}`
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
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HEALTH_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
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

            {/* Top Review Block */}
            <div className="flex flex-col items-center gap-4 mt-8 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center text-[10px] font-black text-forest">
                  RK
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-forest uppercase tracking-widest leading-none">
                    Medically Reviewed by
                  </p>
                  <p className="text-xs font-bold text-slate-600">
                    Dr. Rahul K R, BAMS * Ayurvedic Physician
                  </p>
                </div>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Last Medical Review: March 2026
              </p>
            </div>

            <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed mb-6">
              In Ayurvedic clinical practice, physiological signals—often called symptoms—are interpreted as indicators of imbalance in
              digestive function (Agni), metabolic residue (Ama), or regulatory systems.
            </p>
          </motion.div>
        </header>

        {/* Symptoms Grid */}
        <section className="py-14 md:py-20 px-6 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SYMPTOMS.map((symptom, i) => (
              <motion.div
                key={symptom.slug}
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
                
                <div className="flex-1 space-y-4">
                  <div className="space-y-1">
                    <Link href={`/health/${symptom.slug}`} className="block group/title">
                      <h2 className="text-2xl md:text-3xl font-black text-forest flex items-center gap-2 group-hover/title:text-emerald-600 transition-colors">
                        {symptom.name} <ArrowRight className="w-5 h-5 opacity-20 group-hover/title:opacity-100 transition-all" />
                      </h2>
                    </Link>
                    <Link href={`/health/${symptom.slug}`} className="text-[10px] font-black uppercase text-emerald-600 tracking-widest hover:underline">
                      View Clinical Overview
                    </Link>
                  </div>

                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{symptom.pattern}</p>
                  <p className="text-slate-600 font-medium leading-relaxed text-sm">{symptom.desc}</p>
                </div>

                {/* Programmatic Shortcuts */}
                <div className="mt-8 pt-6 border-t border-slate-50">
                  <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Therapeutic Variations</span>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/health/${symptom.slug}-vata`} className="px-4 py-1.5 rounded-full bg-slate-50 text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-forest hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-100">Vata Type</Link>
                    <Link href={`/health/${symptom.slug}-pitta`} className="px-4 py-1.5 rounded-full bg-slate-50 text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-forest hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-100">Pitta Type</Link>
                    <Link href={`/health/${symptom.slug}-kapha`} className="px-4 py-1.5 rounded-full bg-slate-50 text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-forest hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-100">Kapha Type</Link>
                  </div>
                </div>
              </motion.div>
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

        {/* Early Warning Signs Section - Experience Signal */}
        <section className="max-w-4xl mx-auto py-20 px-6 space-y-12 bg-white rounded-[4rem] border border-slate-100 mb-20 shadow-premium">
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-black text-forest tracking-tight">
              Clinical Perspective: Early Warning Signs
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl text-lg">
              In Ayurvedic clinical practice, patients presenting with chronic indicators often report associated patterns such as irregular digestion, 
              poor sleep quality, or fluctuating energy levels. These are not isolated events but signals of systemic communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-50/50 rounded-[3rem] border border-slate-100">
              <h4 className="font-black text-forest mb-6 text-xs uppercase tracking-widest leading-none">Metabolic Indicators</h4>
              <ul className="space-y-4 text-xs font-bold text-slate-500">
                <li className="flex items-center gap-2 italic mb-2 text-slate-400">Possible contributing factors:</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Irregular meal timing</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Impaired digestive function (Agni)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Metabolic residue accumulation (Ama)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> High intake of processed foods</li>
              </ul>
            </div>
            <div className="p-8 bg-slate-50/50 rounded-[3rem] border border-slate-100">
              <h4 className="font-black text-forest mb-6 text-xs uppercase tracking-widest leading-none">Nervous System Indicators</h4>
              <ul className="space-y-4 text-xs font-bold text-slate-500">
                <li className="flex items-center gap-2 italic mb-2 text-slate-400">Associated triggers:</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Chronic psychological stress</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Insufficient or fragmented sleep</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Excessive sensory stimulation</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Information overload</li>
              </ul>
            </div>
          </div>
        </section>

          <p className="text-slate-600 font-medium leading-relaxed">
            Early symptoms such as fatigue, digestive discomfort,
            brain fog, irregular sleep patterns, and unexplained
            weight changes may indicate an underlying physiological
            imbalance.
          </p>

          <p className="text-slate-600 font-medium leading-relaxed">
            In Ayurvedic physiology these signals often arise when
            digestion (Agni) becomes inefficient or when metabolic
            residue (Ama) begins to accumulate within physiological
            channels.
          </p>


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

            {/* Doctor Reviewer Section */}
            <div className="flex items-center gap-4 mt-16">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold">
                DR
              </div>

              <div>
                <p className="text-xs font-bold text-forest">
                  Reviewed by Dr. Rahul K R, BAMS
                </p>

                <p className="text-[10px] text-slate-400">
                  Ayurvedic Physician
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
              Identify Your Ayurvedic Health Pattern
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
