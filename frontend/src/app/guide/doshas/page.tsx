"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Wind, Flame, Droplets, Info, CheckCircle2, Shield, Activity, Sparkles, Zap, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const REVIEWER_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dr. Rahul K R",
  "jobTitle": "Ayurvedic Physician",
  "affiliation": {
    "@type": "Organization",
    "name": "Dinaveda"
  }
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Guide",
      "item": "https://www.dinaveda.com/guide"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Doshas",
      "item": "https://www.dinaveda.com/guide/doshas"
    }
  ]
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "The Three Doshas: Vata, Pitta, Kapha Explained",
  "description": "A comprehensive guide to the Three Doshas—Vata, Pitta, and Kapha—the biological energies that govern all physical and mental functions in Ayurvedic physiology.",
  "lastReviewed": "2026-03-13",
  "reviewedBy": REVIEWER_JSON_LD,
  "breadcrumb": BREADCRUMB_JSON_LD,
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the three Doshas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The three Doshas are Vata (Space/Air), Pitta (Fire/Water), and Kapha (Water/Earth). They are the biological forces that govern movement, transformation, and structure respectively."
        }
      },
      {
        "@type": "Question",
        "name": "How do I know my Dosha type?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your Dosha type (Prakriti) is determined by your physical traits, mental tendencies, and physiological responses. Dinaveda uses clinical assessments to identify both your birth constitution and current imbalances."
        }
      },
      {
        "@type": "Question",
        "name": "Can my Dosha change over time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your birth constitution (Prakriti) remains constant, but your current state of balance (Vikriti) changes due to age, season, diet, and lifestyle stressors."
        }
      }
    ]
  }
};

export default function DoshasPage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(REVIEWER_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      
      {/* Top Nav */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/guide" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-forest transition-all">
          <ArrowLeft className="w-3 h-3" /> Back to Knowledge Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">Dinaveda</Link>
        <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1">
          Assessment
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            The Doshas: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
              Biological Intelligence
            </span>
          </h1>

          {/* Medical Reviewer Block */}
          <div className="flex items-center gap-4 mt-6">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
              DR
            </div>
            <div>
              <p className="text-xs font-bold text-forest">
                Reviewed by Dr. Rahul K R, BAMS
              </p>
              <p className="text-[10px] text-slate-400">
                Ayurvedic Physician • Last updated March 2026
              </p>
            </div>
          </div>

          <div className="mt-12 h-px bg-slate-100" />

          {/* Intro Section */}
          <div className="mt-12 space-y-6">
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              In Ayurveda, the <strong>Three Doshas</strong>—Vata, Pitta, and Kapha—are the biological energies that translate the elements of the universe into the functions of the human body. They are the software that governs your hardware.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              Every person is a unique combination of these three forces. Understanding your dominant energy is not just a personality test; it is a clinical framework for identifying how your <Link href="/guide/agni" className="text-forest underline">Agni</Link> functions, where <Link href="/guide/ama" className="text-forest underline">Ama</Link> might settle, and how to maintain your <Link href="/guide/ojas" className="text-forest underline">Ojas</Link>.
            </p>
          </div>
        </motion.header>

        <section className="space-y-24">
          {/* Key Principle Box */}
          <div className="p-10 md:p-16 bg-white rounded-[4rem] border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 blur-[100px] opacity-50 pointer-events-none -mr-20" />
             <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-20 h-20 rounded-3xl bg-forest/5 flex items-center justify-center shrink-0">
                  <Activity className="w-10 h-10 text-forest" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-forest tracking-tight uppercase">The Law of Balance</h2>
                  <p className="text-slate-600 font-medium leading-relaxed italic">
                    "Dosha imbalance is the root of all physical and mental suffering. To know the Doshas is to know the language of Nature within you."
                  </p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">— Charaka Samhita</p>
                </div>
             </div>
          </div>

          {/* Vata Section */}
          <div className="space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Wind className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter">Vata: Movement</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-slate-500 font-medium leading-relaxed">
                  Composed of <strong>Space and Air</strong>, Vata is the energy of biological movement. It governs the nervous system, the pulsation of the heart, breathing, and all communication between cells.
                </p>
                <div className="p-8 bg-indigo-50/50 rounded-3xl space-y-4">
                   <h4 className="font-black text-indigo-900 text-sm uppercase tracking-widest">At-Risk Symptoms</h4>
                   <div className="flex flex-wrap gap-2">
                     {["Anxiety", "Insomnia", "Bloating", "Dryness"].map((s, i) => (
                       <span key={i} className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-indigo-500 border border-indigo-100">{s}</span>
                     ))}
                   </div>
                </div>
              </div>
              <div className="space-y-4">
                 {[
                   { title: "Qualities", desc: "Light, Cold, Dry, Rough, Mobile, Subtle." },
                   { title: "Mental State", desc: "Creative, Quick, Imaginative when balanced; Anxious when high." },
                   { title: "Physical Seat", desc: "Primary seat in the Colon and the Nervous System." }
                 ].map((item, i) => (
                   <div key={i} className="pb-4 border-b border-slate-100 last:border-0">
                     <p className="text-[10px] font-black uppercase text-indigo-400 mb-1">{item.title}</p>
                     <p className="text-sm text-slate-600 font-medium">{item.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Pitta Section */}
          <div className="space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                <Flame className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter">Pitta: Transformation</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-slate-500 font-medium leading-relaxed">
                  Composed of <strong>Fire and Water</strong>, Pitta governs metabolism, digestion, and the transformation of energy into consciousness. It is the intelligence that 'digests' both food and life experiences.
                </p>
                <div className="p-8 bg-orange-50/50 rounded-3xl space-y-4">
                   <h4 className="font-black text-orange-900 text-sm uppercase tracking-widest">At-Risk Symptoms</h4>
                   <div className="flex flex-wrap gap-2">
                     {["Inflammation", "Irritability", "Acidity", "Heat"].map((s, i) => (
                       <span key={i} className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-orange-500 border border-orange-100">{s}</span>
                     ))}
                   </div>
                </div>
              </div>
              <div className="space-y-4">
                 {[
                   { title: "Qualities", desc: "Hot, Sharp, Liquid, Spreading, Slightly Oily." },
                   { title: "Mental State", desc: "Intellectual, Courageous, Sharp; Irritable or Judgmental when high." },
                   { title: "Physical Seat", desc: "Primary seat in the Small Intestine and the Blood." }
                 ].map((item, i) => (
                   <div key={i} className="pb-4 border-b border-slate-100 last:border-0">
                     <p className="text-[10px] font-black uppercase text-orange-400 mb-1">{item.title}</p>
                     <p className="text-sm text-slate-600 font-medium">{item.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Kapha Section */}
          <div className="space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <Droplets className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter">Kapha: Structure</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-slate-500 font-medium leading-relaxed">
                  Composed of <strong>Water and Earth</strong>, Kapha provides the physical structure, stability, and lubrication of the body. It is the energy of cohesion and endurance.
                </p>
                <div className="p-8 bg-emerald-50/50 rounded-3xl space-y-4">
                   <h4 className="font-black text-emerald-900 text-sm uppercase tracking-widest">At-Risk Symptoms</h4>
                   <div className="flex flex-wrap gap-2">
                     {["Weight Gain", "Lethargy", "Congestion", "Attachment"].map((s, i) => (
                       <span key={i} className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-emerald-500 border border-emerald-100">{s}</span>
                     ))}
                   </div>
                </div>
              </div>
              <div className="space-y-4">
                 {[
                   { title: "Qualities", desc: "Heavy, Slow, Cold, Oily, Liquid, Smooth, Dense." },
                   { title: "Mental State", desc: "Calm, Loving, Patient, Stable; Greedy or Lethargic when high." },
                   { title: "Physical Seat", desc: "Primary seat in the Chest and the Lungs." }
                 ].map((item, i) => (
                   <div key={i} className="pb-4 border-b border-slate-100 last:border-0">
                     <p className="text-[10px] font-black uppercase text-emerald-400 mb-1">{item.title}</p>
                     <p className="text-sm text-slate-600 font-medium">{item.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Prakriti vs Vikriti Section */}
          <div className="bg-slate-900 p-12 md:p-20 rounded-[4rem] text-white relative overflow-hidden">
             <div className="max-w-3xl space-y-12 relative z-10">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Prakriti vs. Vikriti</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                  <div className="space-y-4">
                    <h4 className="text-xl font-black text-emerald-400 uppercase tracking-tight">Prakriti: Your Baseline</h4>
                    <p className="text-slate-400 font-medium leading-relaxed">
                      Your unique biological blueprint established at conception. It never changes and represents your state of perfect health.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-black text-orange-400 uppercase tracking-tight">Vikriti: Current Imbalance</h4>
                    <p className="text-slate-400 font-medium leading-relaxed">
                      Your current state of Doshas as influenced by lifestyle, diet, and environment. Reclaiming health is the process of returning from Vikriti to Prakriti.
                    </p>
                  </div>
                </div>
             </div>
          </div>

          {/* Diagnostic Markers Section */}
          <div className="space-y-12">
             <div className="max-w-2xl space-y-6">
                <h2 className="text-3xl font-black text-forest tracking-tight">How Dinaveda Tracks Your Doshas</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                   We use clinical biomarkers and daily signal analysis to map your current state (Vikriti) and provide personalized lifestyle protocols.
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Activity, title: "Metabolic Pulse", desc: "Analyzing digestive speed and regularity to determine Agni/Pitta status." },
                  { icon: Zap, title: "Neural Signals", desc: "Tracking sleep efficiency and mental clarity markers for Vata analysis." },
                  { icon: Shield, title: "Tissue Stability", desc: "Monitoring weight fluctuations and structural integrity for Kapha tracking." }
                ].map((marker, i) => (
                  <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <marker.icon className="w-6 h-6 text-forest" />
                    <h5 className="font-black text-forest">{marker.title}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{marker.desc}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* Connected Concepts Section */}
          <div className="space-y-12 border-t border-slate-100 pt-12">
            <h2 className="text-2xl font-black text-forest tracking-tight">Connected Physiological Concepts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/guide/agni" className="p-8 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition group flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Fundamental Driver</p>
                  <p className="text-xl font-black text-forest">Agni: Digestive Fire</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-forest transition-all" />
              </Link>
              <Link href="/guide/dinacharya" className="p-8 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition group flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Natural Rhythm</p>
                  <p className="text-xl font-black text-forest">Dinacharya: Daily Routine</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-forest transition-all" />
              </Link>
            </div>
          </div>

          {/* Assessment CTA */}
          <div className="space-y-12">
            <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
              <motion.h3 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
              >
                Find Your True Blueprint
              </motion.h3>
              <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
                Discover your Prakriti and map your current Vikriti through our clinical assessment tool.
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all"
              >
                Start Your Map <ArrowRight className="w-5 h-5" />
              </Link>
              
              <div className="mt-16 pt-8 border-t border-white/10 text-[10px] font-medium text-emerald-100/30 text-center uppercase tracking-[0.2em] leading-relaxed max-w-2xl mx-auto">
                Educational Disclaimer: This content provides educational insights into Ayurvedic physiology. It does not replace professional medical diagnosis or treatment. Always consult a healthcare professional for medical concerns.
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
