"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Battery, Sparkles, AlertCircle, Coffee, Moon, Shield, Flame } from "lucide-react";
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
      "name": "Health Hub",
      "item": "https://www.dinaveda.com/health"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Low Energy",
      "item": "https://www.dinaveda.com/health/low-energy"
    }
  ]
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Low Energy: Ayurvedic Perspective on Fatigue & Metabolism",
  "description": "Understand persistent fatigue through Ayurvedic physiology. Learn how weak digestion and metabolic toxins affect your daily energy and vitality.",
  "lastReviewed": "2026-03-13",
  "reviewedBy": REVIEWER_JSON_LD,
  "breadcrumb": BREADCRUMB_JSON_LD,
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While initial shifts in clarity can happen in 1-2 weeks, rebuilding deep vitality (Ojas) usually requires 4-12 weeks of consistent nourishment and routine."
        }
      },
      {
        "@type": "Question",
        "name": "Can stress cause physical exhaustion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Chronic stress aggravates Vata dosha, which acts like a leak in your biological battery, rapidly depleting your physical and mental reserves."
        }
      },
      {
        "@type": "Question",
        "name": "What are the best foods for low energy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nourishing 'Brimhana' foods like dates, almonds, ghee, and freshly cooked whole grains are excellent for rebuilding vital essence when your Agni is strong enough to process them."
        }
      }
    ]
  }
};

export default function LowEnergyPage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
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

      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/health" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-forest transition-all">
          <ArrowLeft className="w-3 h-3" /> Back to Symptom Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">Dinaveda</Link>
        <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1">Assessment</Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          {/* 1. Title (H1) */}
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Why Am I Tired All The Time? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Ayurvedic Explanation and Causes
            </span>
          </h1>

          {/* 2. Medical Reviewer Block */}
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

          {/* 3. Introduction */}
          <div className="mt-12 space-y-6">
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              Persistent fatigue often arises from multiple physiological factors including sleep disruption, metabolic imbalance, and systemic inflammation. In Ayurvedic physiology, this is frequently interpreted as a depletion of <Link href="/guide/ojas" className="text-forest underline">vital essence (Ojas)</Link> or a blockage of energy channels by <Link href="/guide/ama" className="text-forest underline">metabolic residue (Ama)</Link>.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              Struggling with persistent tiredness is often a signal that your body is dealing with "Ama"—<Link href="/guide/ama" className="text-forest underline">unprocessed metabolic waste</Link> that clogs the channels of circulation and stops energy from reaching your cells. To reclaim your vitality, we must look beyond stimulants and focus on restoring <Link href="/guide/doshas" className="text-forest underline">dosha balance</Link> and deep cellular nourishment.
            </p>
          </div>
        </motion.header>

        <section className="space-y-24">
          {/* 4. Clinical Observation Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Clinical Patterns Associated With Fatigue</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-orange-50/50 rounded-[3rem] border border-orange-100">
                <p className="text-slate-600 leading-relaxed font-medium mb-4">
                  In clinical practice, patients suffering from low energy rarely present with fatigue alone. We look for these associated signals to determine the root cause of the vitality leak:
                </p>
                <ul className="space-y-3 text-sm font-bold text-slate-600">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Heaviess in the body upon waking</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Coated tongue in the morning</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Afternoon "energy crashes"</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Muscle stiffness or joint discomfort</li>
                </ul>
              </div>
              <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
                <p>
                  These patterns help us differentiate between "Depletion Fatigue" (Low Ojas) and "Blockage Fatigue" (High Ama).
                </p>
                <p>
                  Depletion feels brittle and anxious, often linked to Vata aggravation. Blockage feels heavy and stagnant, often linked to Kapha and Ama accumulation. Understanding this distinction is vital for accurate restoration strategies.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Common Causes Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Common Causes of Low Energy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Metabolic Factors", items: ["Weak Agni (digestive fire)", "Ama (metabolic toxins)", "Nutritional malabsorption"] },
                { title: "Lifestyle Drains", items: ["Irregular sleep cycles", "Late-night blue light exposure", "Over-exercising or sedentary life"] },
                { title: "Biological Drains", items: ["Chronic stress (Vata leak)", "Incomplete recovery from illness", "Dehydration or cold intake"] }
              ].map((group, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h4 className="font-black text-forest mb-4 text-sm uppercase tracking-widest">{group.title}</h4>
                  <ul className="space-y-2">
                    {group.items.map((item, j) => (
                      <li key={j} className="text-xs text-slate-500 font-medium flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-slate-300" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Ayurvedic Explanation */}
          <div className="bg-slate-900 p-12 md:p-16 rounded-[4rem] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 blur-[120px] opacity-20 pointer-events-none -mr-40" />
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">Ayurvedic Interpretation</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed max-w-2xl text-lg">
              <p>
                Ayurveda views vitality as the presence of <strong>Ojas</strong>—the ultimate refined essence of all seven bodily tissues (Dhatus). Ojas is the biological substrate of immunity, resilience, and strength.
              </p>
              <p>
                When your <strong>Agni</strong> (metabolic fire) is weak or irregular, the sequential transformation of food into tissue is interrupted. This creates <strong>Ama</strong>, a cold, sticky substance that clogs the micro-channels (Srotas), preventing energy from reaching your cells. Chronic fatigue is thus either a lack of fuel (Low Ojas) or a blockage of the fuel lines (High Ama).
              </p>
              <p className="text-sm border-l-2 border-orange-500 pl-6 text-slate-400">
                "Ojas is the seat of life; when it is diminished, the person recovers with difficulty and feels weak even without physical exertion." — *Charaka Samhita*
              </p>
            </div>
          </div>

          {/* 7. Lifestyle Corrections */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Lifestyle Practices That May Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "The 10PM Rule", desc: "Sleeping before 10PM aligns with the natural Kapha cycle, supporting the body's deep tissue repair and Ojas production." },
                { title: "Oil Massage (Abhyanga)", desc: "Warm sesame oil massage grounds the nervous system and prevents the 'leakage' of vital energy through stress." },
                { title: "Nasal Drops (Nasya)", desc: "Applying 2 drops of medicated oil to the nostrils clears the pathways to the brain, reducing mental fatigue." },
                { title: "Sun Exposure", desc: "10-15 minutes of morning sun synchronizes your circadian rhythm and supports metabolic Agni." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm">
                   <Moon className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                   <div>
                     <h4 className="font-black text-forest mb-2">{item.title}</h4>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Diet Considerations */}
          <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <h2 className="text-3xl font-black text-forest tracking-tight mb-12 text-center">Dietary Considerations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-black text-emerald-600 flex items-center gap-2">
                  <Battery className="w-5 h-5" /> Ojas Building Foods
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Dates & Almonds", why: "High energetic density and easy to transform into Ojas" },
                    { food: "A2 Ghee", why: "The premier substance for stoking Agni without causing heat" },
                    { food: "Warm spiced milk", why: "Cardamom and nutmeg make milk a powerful vitality tonic" },
                    { food: "Whole cooked grains", why: "Provides stable, long-burning fuel for the tissues" }
                  ].map((item, i) => (
                    <li key={i} className="space-y-1">
                      <p className="text-sm font-bold text-forest">{item.food}</p>
                      <p className="text-xs text-slate-500">{item.why}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-black text-orange-600 flex items-center gap-2">
                  <Coffee className="w-5 h-5" /> Energy-Draining Foods
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Excess caffeine", why: "Artificial stimulation that 'borrows' energy from your future" },
                    { food: "Cold/Ice drinks", why: "Immediately shuts down the metabolic fire needed for energy" },
                    { food: "Highly processed sugar", why: "Causes insulin spikes followed by profound cellular fatigue" },
                    { food: "Leftover/microwaved food", why: "Lacks 'Prana' (life force) and contributes to Ama build-up" }
                  ].map((item, i) => (
                    <li key={i} className="space-y-1">
                      <p className="text-sm font-bold text-forest">{item.food}</p>
                      <p className="text-xs text-slate-500">{item.why}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 9. When to Seek Medical Advice */}
          <div className="p-12 rounded-[4rem] bg-orange-50/50 border border-orange-100 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-forest tracking-tight">When to Consult a Healthcare Professional</h3>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl">
              While fatigue is often a result of lifestyle choices, it can also be a symptom of underlying medical conditions. Persistent exhaustion that does not improve with rest should always be evaluated clinically.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Sudden, profound onset of weakness",
                "Unexplained weight loss or gain",
                "Persistent night sweats or low-grade fever",
                "Shortness of breath with minimal exertion",
                "Profound changes in mood or cognitive function",
                "Severe muscle or joint pain"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" /> {item}
                </div>
              ))}
            </div>
          </div>

          {/* 10. FAQ Section */}
          <div className="space-y-12">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: "What causes persistent fatigue?", a: "It typically involves 'Ojas' depletion where the body's vital reserve is low, or 'Ama' accumulation where toxins block energy flow." },
                { q: "Is fatigue related to digestion?", a: "Yes. Ayurveda teaches that energy (Prana) is extracted during digestion. If Agni is weak, the body lacks fuel even with high-calorie intake." },
                { q: "How long does it take to restore energy levels?", a: "Consistency is key. Realigning sleep and diet can show clarity in 2 weeks, while deep vitality takes 1-3 months to rebuild." },
                { q: "Can stress cause physical exhaustion?", a: "Yes, chronic stress keeps the Vata dosha in a state of 'hyper-movement', which rapidly burns through your physiological fuel." },
                { q: "Does caffeine help with Ayurvedic fatigue?", a: "Caffeine provides temporary stimulation but often further depletes the Ojas reserve, leading to a deeper 'crash' later." }
              ].map((faq, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-black text-forest leading-tight">{faq.q}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 11. Related Topics */}
          <div className="space-y-12 pt-12 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-forest tracking-tight">Related symptoms</h2>
                <div className="grid grid-cols-1 gap-4">
                  <Link href="/health/weight-gain" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Crossover</p>
                      <p className="text-sm font-black text-forest group-hover:text-amber-600">Weight Gain</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/health/brain-fog" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Crossover</p>
                      <p className="text-sm font-black text-forest group-hover:text-purple-600">Brain Fog</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-black text-forest tracking-tight">Ayurvedic Mechanisms</h2>
                <div className="grid grid-cols-1 gap-4">
                  <Link href="/guide/agni" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Root Cause</p>
                      <p className="text-sm font-black text-forest group-hover:text-orange-600">Digestive fire (Agni)</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/guide/ama" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Root Cause</p>
                      <p className="text-sm font-black text-forest group-hover:text-red-600">Metabolic Residue (Ama)</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-red-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/guide/ojas" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Vital Essence</p>
                      <p className="text-sm font-black text-forest group-hover:text-indigo-600">Building Ojas</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Dosha Variations */}
          <div className="space-y-8 pt-12 border-t border-slate-100">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Dosha Variations
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/health/low-energy-vata" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Vata-type fatigue
              </Link>
              <Link href="/health/low-energy-pitta" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Pitta-type fatigue
              </Link>
              <Link href="/health/low-energy-kapha" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Kapha-type fatigue
              </Link>
            </div>
          </div>

          {/* 12. Disclaimer & 13. CTA */}
          <div className="space-y-12">
            <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
              <motion.h3 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
              >
                Analyze Your <br /> Physiological Pattern
              </motion.h3>
              <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
                Discover the specific metabolic and energetic blocks behind your fatigue with a personalized assessment.
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Start Assessment <ArrowRight className="w-5 h-5" />
              </Link>

              <div className="mt-16 pt-8 border-t border-white/10 text-[10px] font-medium text-emerald-100/30 text-center uppercase tracking-[0.2em] leading-relaxed max-w-2xl mx-auto">
                Educational Disclaimer: This content provides educational insights into Ayurvedic physiology and lifestyle practices. It does not replace professional medical diagnosis or treatment. Always consult a healthcare professional for medical concerns.
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
