"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Flame, Zap, Shield, Sparkles, Activity, AlertCircle, CheckCircle2, Info, Wind, Droplets } from "lucide-react";
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
      "name": "Agni",
      "item": "https://www.dinaveda.com/guide/agni"
    }
  ]
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Agni: Digestive Fire in Ayurvedic Physiology",
  "description": "An in-depth guide to Agni—the biological fire responsible for digestion, metabolism, and cellular transformation in Ayurveda.",
  "lastReviewed": "2026-03-13",
  "reviewedBy": REVIEWER_JSON_LD,
  "breadcrumb": BREADCRUMB_JSON_LD,
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Agni in Ayurveda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Agni is the biological fire that governs digestion, metabolism, and the transformation of food into energy and tissue. It is the gatekeeper of health, longevity, and immunity."
        }
      },
      {
        "@type": "Question",
        "name": "What are the types of Agni?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ayurveda identifies 13 types of Agni: Jatharagni (digestive fire), 5 Bhutagnis (elemental metabolism), and 7 Dhatvagnis (tissue-level metabolism)."
        }
      },
      {
        "@type": "Question",
        "name": "How can I tell if my Agni is weak?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Signs of weak Agni (Manda Agni) include bloating, heaviness after meals, brain fog, irregular appetite, and a thick coating on the tongue."
        }
      },
      {
        "@type": "Question",
        "name": "Can stress affect digestion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Stress aggravates Vata, which leads to Vishama Agni (irregular digestion), causing fluctuating appetite and erratic nutrient absorption."
        }
      }
    ]
  }
};

export default function AgniPage() {
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
            Agni: The Biological <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Fire of Transformation
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
              In Ayurvedic physiology, <strong>Agni</strong> is the central mechanism of life. It is the biological principle responsible for digestion, metabolism, environmental adaptation, and the transformation of external matter into internal vitality.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              Without the presiding intelligence of Agni, the body is unable to derive 'Prana' (life-force) from nourishment. Instead of building vitality, food that is improperly processed by a weak Agni becomes <Link href="/guide/ama" className="text-forest underline">Ama</Link>—a toxic metabolic residue that clogs physiological channels and serves as the root cause of most chronic symptoms.
            </p>
          </div>
        </motion.header>

        <section className="space-y-24">
          {/* Key Principle Box */}
          <div className="p-10 md:p-16 bg-orange-50/50 rounded-[4rem] border border-orange-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 blur-[100px] opacity-20 pointer-events-none -mr-20" />
             <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-orange-500/10 flex items-center justify-center shrink-0">
                  <Flame className="w-10 h-10 text-orange-500" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-forest tracking-tight uppercase">The Law of Agni</h2>
                  <p className="text-slate-600 font-medium leading-relaxed italic">
                    "A person's health, longevity, and immunity are directly proportional to the stability of their Agni. When Agni is extinguished, life ceases. When it is balanced, one lives a long, healthy life. When it is disturbed, disease begins."
                  </p>
                  <p className="text-xs font-black text-orange-600 uppercase tracking-widest">— Charaka Samhita</p>
                </div>
             </div>
          </div>

          {/* Physiological Role Section */}
          <div className="space-y-12">
            <h2 className="text-3xl font-black text-forest tracking-tight">The Hierarchy of Agni</h2>
            <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
              Ayurveda identifies 13 distinct types of Agni that operate at different levels of the human biological system. Understanding this hierarchy reveals how digestion in the stomach influences the very health of our DNA and tissues.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Jatharagni", sub: "Central Fire", desc: "The primary digestive fire in the stomach and small intestine. It governs the initial breakdown of food and is the root of all other Agnis." },
                { title: "Bhutagni", sub: "Elemental Fire", desc: "Five fires that process the elemental components (Space, Air, Fire, Water, Earth) to match the body's elemental needs." },
                { title: "Dhatvagni", sub: "Tissue Fire", desc: "Seven fires that govern the transformation of nutrients into the body's seven layers of tissue (Dhatus)." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-black text-forest text-lg">{item.title}</h4>
                  <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest">{item.sub}</p>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Four States Section */}
          <div className="bg-slate-900 p-12 md:p-20 rounded-[4rem] text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 blur-[150px] opacity-10 pointer-events-none -ml-40" />
            <div className="max-w-3xl space-y-8 relative z-10">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter">The Four Clinical States of Agni</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Ayurveda diagnoses your metabolic health by observing which of these four patterns your body is currently following.
              </p>
              
              <div className="space-y-12 mt-16">
                {[
                  { name: "Sama Agni", state: "Balanced", icon: CheckCircle2, color: "text-emerald-400", desc: "Perfect metabolism. No bloating, consistent hunger, and high energy. Leads to the formation of Ojas (immunity).", sympt: ["Consistent digestion", "Clear tongue", "Abundant energy"] },
                  { name: "Vishama Agni", state: "Irregular (Vata)", icon: Wind, color: "text-blue-400", desc: "Erratic metabolism. Common in high-stress lifestyles. Food is digested unevenly, leading to fluctuating energy.", sympt: ["Bloating", "Constipation", "Anxiety"] },
                  { name: "Tikshna Agni", state: "Sharp (Pitta)", icon: Flame, color: "text-orange-400", desc: "Hyper-metabolism. Digestion is too fast, 'burning' nutrients before absorption and creating acidity.", sympt: ["Acidity", "Irritability", "Inflammation"] },
                  { name: "Manda Agni", state: "Slow (Kapha)", icon: Droplets, color: "text-indigo-400", desc: "Sluggish metabolism. Digestion is heavy and slow, leading to the accumulation of Ama and weight gain.", sympt: ["Heaviness", "Lethargy", "Weight Gain"] }
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
                      <p className="text-slate-400 font-medium leading-relaxed">{state.desc}</p>
                      <div className="flex flex-wrap gap-3">
                        {state.sympt.map((s, j) => (
                          <span key={j} className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agni & Symptoms Section */}
          <div className="space-y-12">
             <div className="max-w-2xl space-y-6">
                <h2 className="text-3xl font-black text-forest tracking-tight">Signs of Impaired Agni</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  When Agni weakens, the body produces 'Ama'—bio-toxins that obstruct the intelligence of our cells. These are the early warning signs that your metabolic fire needs attention.
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Digestive Signs", items: [{name: "Bloating", slug: "bloating"}, {name: "Poor Digestion", slug: "poor-digestion"}, {name: "Weight Gain", slug: "weight-gain"}] },
                  { title: "Metabolic & Mental", items: [{name: "Fatigue", slug: "low-energy"}, {name: "Brain Fog", slug: "brain-fog"}, {name: "Insomnia", slug: "insomnia"}] }
                ].map((group, i) => (
                  <div key={i} className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                    <h4 className="font-black text-forest uppercase tracking-widest text-xs">{group.title}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {group.items.map((item, j) => (
                        <Link key={j} href={`/health/${item.slug}`} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-forest hover:text-white transition-all">
                          <span className="text-sm font-black tracking-tight">{item.name}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Lifestyle Support Section */}
          <div className="space-y-12">
            <h2 className="text-3xl font-black text-forest tracking-tight">Rekindling Your Agni</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                 <p className="text-slate-500 font-medium leading-relaxed">
                   In Ayurveda, treatment begins with 'Deepana' (kindling the fire) and 'Pachana' (digesting the toxins). These daily habits are formulated to restore metabolic intelligence.
                 </p>
                 <div className="space-y-4">
                    {[
                      { title: "Consistent Meal Rhythms", desc: "Eating at the same sunrise/sunset intervals trains the master biological clock to secrete digestive enzymes predictably." },
                      { title: "The Warmth Rule", desc: "Warm, cooked foods act as 'pre-digested' matter, reducing the metabolic load on an already weak fire." },
                      { title: "Wait for True Hunger", desc: "Eating before previous food is digested creates Ama. Wait for a 'clear' appetite—the sign that Agni is ready again." }
                    ].map((habit, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                        <div>
                          <h5 className="font-black text-forest mb-1">{habit.title}</h5>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed">{habit.desc}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="bg-emerald-900 rounded-[4rem] p-12 text-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mb-20" />
                <h4 className="text-2xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Therapeutic Spices <br /> for Agni Support</h4>
                <div className="space-y-6">
                  {[
                    { name: "Ginger (Shunti)", role: "The Universal Medicine", desc: "Increases digestive fire without aggravating Pitta fire." },
                    { name: "Cumin (Jeeraka)", role: "The Digestant", desc: "Stimulates pancreatic enzymes and clears gas." },
                    { name: "Black Pepper", role: "The Bio-cleaner", desc: "Scrapes 'Ama' from the cellular channels (Srotas)." }
                  ].map((spice, i) => (
                    <div key={i} className="pb-6 border-b border-white/10 last:border-0 last:pb-0">
                      <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1">{spice.role}</p>
                      <p className="text-lg font-black tracking-tight">{spice.name}</p>
                      <p className="text-xs text-emerald-100/60 mt-1">{spice.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Concepts */}
          <div className="space-y-12 border-t border-slate-100 pt-12">
            <h2 className="text-2xl font-black text-forest tracking-tight">Connected Physiological Concepts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/guide/ama" className="p-8 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition group flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Fundamental Cause</p>
                  <p className="text-xl font-black text-forest">Ama: Metabolic Waste</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-forest transition-all group-hover:translate-x-2" />
              </Link>
              <Link href="/guide/ojas" className="p-8 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition group flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Fundamental Vitality</p>
                  <p className="text-xl font-black text-forest">Ojas: Pure Immunity</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-forest transition-all group-hover:translate-x-2" />
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
                Track Your Agni Score
              </motion.h3>
              <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
                Dinaveda's engine monitors 14 daily digestive signals to calculate your real-time metabolic fire status.
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                View Assessment <ArrowRight className="w-5 h-5" />
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
