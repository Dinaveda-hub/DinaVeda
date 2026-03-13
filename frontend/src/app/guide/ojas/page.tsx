"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Heart, Zap, CheckCircle2, Info, Moon, Sun, Activity, Shield } from "lucide-react";
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
      "name": "Ojas",
      "item": "https://www.dinaveda.com/guide/ojas"
    }
  ]
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ojas: The Essence of Vitality & Immunity in Ayurveda",
  "description": "A comprehensive guide to Ojas—the biological essence that governs immunity, vitality, and spiritual strength in Ayurvedic physiology.",
  "lastReviewed": "2026-03-13",
  "reviewedBy": REVIEWER_JSON_LD,
  "breadcrumb": BREADCRUMB_JSON_LD,
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Ojas in Ayurveda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ojas is the ultimate biological essence produced by perfect digestion (Agni). it governs immunity (Vyadhikshamatva), strength, and mental radiance."
        }
      },
      {
        "@type": "Question",
        "name": "How is Ojas different from immunity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While immunity is a physiological function, Ojas is the physical substance and energy that powers that function. It is high-quality biological wealth."
        }
      },
      {
        "@type": "Question",
        "name": "What depletes Ojas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ojas is depleted by chronic stress, overworking, lack of sleep, poor digestion (lack of Agni), and trauma."
        }
      },
      {
        "@type": "Question",
        "name": "How can I build Ojas naturally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ojas is built through deep rest, meditation, and specifically 'Ojasya' foods such as dates, almonds, honey, and pure ghee, provided they are well-digested."
        }
      }
    ]
  }
};

export default function OjasPage() {
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
            Ojas: The Radiant <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-forest">
              Essence of Vitality
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
              In Ayurvedic clinical science, <strong>Ojas</strong> is the biological superpower. It is the ultimate refined product of a healthy metabolism, acting as the foundation for immunity, physical endurance, and mental resilience.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              While modern medicine focuses on antibodies and cells, Ayurveda views Ojas as the high-quality energy that powers the entire immune system (Vyadhikshamatva). It is the 'glow' of health that indicates a body in perfect harmony with its environment and its own <Link href="/guide/agni" className="text-forest underline">Agni</Link>.
            </p>
          </div>
        </motion.header>

        <section className="space-y-24">
          {/* Key Principle Box */}
          <div className="p-10 md:p-16 bg-emerald-50 rounded-[4rem] border border-emerald-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 blur-[100px] opacity-20 pointer-events-none -mr-20" />
             <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-emerald-500/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-10 h-10 text-emerald-500" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-forest tracking-tight uppercase">Biological Radiance</h2>
                  <p className="text-slate-600 font-medium leading-relaxed italic">
                    "Ojas is the final essence of all seven tissues. It resides in the heart and permeates the entire body, governing stability, longevity, and the capacity to resist disease."
                  </p>
                  <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">— Sushruta Samhita</p>
                </div>
             </div>
          </div>

          {/* Formation & Role Section */}
          <div className="space-y-12">
            <h2 className="text-3xl font-black text-forest tracking-tight">The 30-Day Alchemical Process</h2>
            <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
              Ayurveda teaches that Ojas is not created instantly. It is the result of a 30-day transformation cycle where food is converted through seven layers of tissue—from plasma to the reproductive essence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "The End Product", sub: "Quintessence", desc: "Ojas is the 'honey' produced by the body after perfectly extracting nutrients from all seven levels of biological tissue." },
                { title: "Vyadhikshamatva", sub: "Immunity", desc: "The clinical capacity to resist both the onset of disease and the progression of existing imbalances." },
                { title: "Bala", sub: "Strength", desc: "Physical strength, mental unshakability, and the capacity to handle high-stress environments without burnout." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-black text-forest text-lg">{item.title}</h4>
                  <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">{item.sub}</p>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Signs of Ojas Section */}
          <div className="bg-emerald-950 p-12 md:p-20 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 blur-[150px] opacity-10 pointer-events-none -ml-40" />
            <div className="max-w-3xl space-y-8 relative z-10">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Clinical Markers of Abundant Ojas</h2>
              <p className="text-emerald-100/60 text-lg leading-relaxed font-medium">
                Abundant Ojas manifests as a specific biological and psychological output. It is the gold standard of Ayurvedic health.
              </p>
              
              <div className="space-y-12 mt-16">
                {[
                  { name: "Para Ojas", state: "Vital Core", icon: Heart, color: "text-red-400", desc: "The superior Ojas located in the heart. It is the seat of biological life and spiritual consciousness.", sympt: ["Mental Bliss", "Clarity", "Fearlessness"] },
                  { name: "Apara Ojas", state: "Systemic", icon: ShieldCheck, color: "text-emerald-400", desc: "The mobile Ojas that circulates through the entire body, powering the immune response and physical stamina.", sympt: ["Glow", "Endurance", "Stable Digestion"] }
                ].map((state, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-8 items-start group">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 ${state.color} group-hover:scale-110 transition-transform`}>
                      <state.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-4">
                        <h4 className="text-2xl font-black tracking-tight">{state.name}</h4>
                        <span className={`px-3 py-1 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-widest ${state.color}`}>{state.state}</span>
                      </div>
                      <p className="text-emerald-50/50 font-medium leading-relaxed">{state.desc}</p>
                      <div className="flex flex-wrap gap-3">
                        {state.sympt.map((s, j) => (
                          <span key={j} className="text-[10px] font-black uppercase tracking-widest text-emerald-200/40 bg-white/5 px-3 py-1 rounded-full border border-white/10">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ojas Depletion Section */}
          <div className="space-y-12">
             <div className="max-w-2xl space-y-6">
                <h2 className="text-3xl font-black text-forest tracking-tight">The Depletion of Ojas</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                   When Ojas is low, the body becomes vulnerable to both environmental pathogens and internal imbalances. Identifying these signs early can prevent chronic illness.
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Physical Signs of Low Ojas", items: [{name: "Fatigue", slug: "low-energy"}, {name: "Weight Loss/Gain", slug: "weight-gain"}, {name: "Poor Digestion", slug: "poor-digestion"}] },
                  { title: "Mental Signs of Low Ojas", items: [{name: "Anxiety", slug: "anxiety"}, {name: "Brain Fog", slug: "brain-fog"}, {name: "Insomnia", slug: "insomnia"}] }
                ].map((group, i) => (
                  <div key={i} className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                    <h4 className="font-black text-forest uppercase tracking-widest text-[10px]">{group.title}</h4>
                    <div className="space-y-3">
                      {group.items.map((item, j) => (
                        <Link key={j} href={`/health/${item.slug}`} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-forest hover:text-white transition-all">
                          <span className="text-sm font-black tracking-tight">{item.name}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Building Ojas Section */}
          <div className="space-y-12">
            <h2 className="text-3xl font-black text-forest tracking-tight">The Ojas-Building Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                 <p className="text-slate-500 font-medium leading-relaxed">
                   Building Ojas requires a dual strategy: reducing the stressors that 'leak' energy and increasing the 'Ojasya' (Ojas-promoting) substances.
                 </p>
                 <div className="space-y-4">
                    {[
                      { title: "Sattvic Nutrition", desc: "Consuming alkaline, whole, and 'high-vibration' foods that build the highest quality plasma (Rasa Dhatu)." },
                      { title: "Deep Circadian Rest", desc: "Sleeping during the Pitta cycle (10 PM - 2 AM) is critical for biological repair and Ojas synthesis." },
                      { title: "Rasayanas", desc: "Specific herbs and compounds formulated to accelerate tissue rejuvenation and immune strength." }
                    ].map((habit, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <div>
                          <h5 className="font-black text-forest mb-1">{habit.title}</h5>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed">{habit.desc}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-[4rem] p-12 text-slate-800 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-forest" />
                <h4 className="text-2xl font-black mb-8 italic tracking-tighter uppercase leading-tight text-forest">Ojas-Building <br /> Superfoods</h4>
                <div className="space-y-6">
                  {[
                    { name: "Dates & Almonds", role: "Biological Fuel", desc: "Concentrated sources of high-quality fats and carbohydrates for tissue repair." },
                    { name: "Pure Ghee", role: "The Carrier", desc: "Enhances nutrient absorption (Agni) and directly builds Ojas essence." },
                    { name: "Raw Honey", role: "The Energizer", desc: "Provides immediate cellular fuel and clear biological message." }
                  ].map((food, i) => (
                    <div key={i} className="pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                      <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-1">{food.role}</p>
                      <p className="text-lg font-black tracking-tight text-forest">{food.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{food.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Connected Concepts */}
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
              <Link href="/guide/doshas" className="p-8 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition group flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Biological Rhythm</p>
                  <p className="text-xl font-black text-forest">Doshas: Energetic Balance</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-forest transition-all" />
              </Link>
            </div>
          </div>

          {/* Final CTA */}
          <div className="space-y-12">
            <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
              <motion.h3 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
              >
                Protect Your Core Vitality
              </motion.h3>
              <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
                Dinaveda's biometric tracking identifies when your core immunity (Ojas) is being depleted by lifestyle stressors.
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all"
              >
                View Your Vitality Score <ArrowRight className="w-5 h-5" />
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
