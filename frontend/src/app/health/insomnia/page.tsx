"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Moon, Shield, Sparkles, Zap, Activity, AlertCircle, Clock, Coffee } from "lucide-react";
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
      "name": "Insomnia",
      "item": "https://www.dinaveda.com/health/insomnia"
    }
  ]
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Insomnia: Ayurvedic Perspective on Sleep Imbalance",
  "description": "Struggling to sleep? Learn the Ayurvedic perspective on insomnia. Understand how your internal clock, Vata dosha, and lifestyle affect sleep quality.",
  "lastReviewed": "2026-03-13",
  "reviewedBy": REVIEWER_JSON_LD,
  "breadcrumb": BREADCRUMB_JSON_LD,
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why do I wake up at 3 AM according to Ayurveda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Waking between 2 AM and 6 AM is typically a Vata-type disturbance. The nervous system becomes too 'light' or overactive, often due to stress or late-night heavy meals."
        }
      },
      {
        "@type": "Question",
        "name": "How does early dinner help with sleep?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eating early allows your Agni (digestive fire) to complete its work before you sleep. If you digest while sleeping, energy is diverted from cellular repair, leading to restless sleep."
        }
      },
      {
        "@type": "Question",
        "name": "Is insomnia always a sign of disease?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not necessarily. Many sleep disturbances occur temporarily due to lifestyle factors such as irregular routines, high screen exposure, or environmental stress."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to improve sleep quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By following a consistent evening routine (Dinacharya), many individuals notice improved sleep depth and easier initiation within 2-4 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "What can I drink before bed for better sleep?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Warm milk with a pinch of nutmeg and cardamom is a traditional Ayurvedic 'nidra' tonic that helps ground the nervous system."
        }
      }
    ]
  }
};

export default function InsomniaPage() {
  return (
    <div className="bg-[#1a1a1a] text-slate-300 min-h-screen relative font-sans overflow-x-hidden selection:bg-indigo-500/20 selection:text-indigo-200">
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
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-[#1a1a1a]/80 backdrop-blur-md z-[70] border-b border-white/5">
        <Link href="/health" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-all">
          <ArrowLeft className="w-3 h-3" /> Back to Symptom Hub
        </Link>
        <Link href="/" className="font-black text-white text-xl tracking-tighter">Dinaveda</Link>
        <Link href="/login" className="text-xs font-black text-indigo-400 uppercase tracking-widest border-b-2 border-indigo-400/20 hover:border-indigo-400 transition-all pb-1">Assessment</Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          {/* 1. Title (H1) */}
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.05]">
            Struggling to Sleep? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Ayurvedic Solutions for Insomnia
            </span>
          </h1>

          {/* 2. Medical Reviewer Block */}
          <div className="flex items-center gap-4 mt-6">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
              DR
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                Reviewed by Dr. Rahul K R, BAMS
              </p>
              <p className="text-[10px] text-slate-500">
                Ayurvedic Physician • Last updated March 2026
              </p>
            </div>
          </div>

          <div className="mt-12 h-px bg-white/5" />

          {/* 3. Introduction */}
          <div className="mt-12 space-y-6 text-slate-400">
            <p className="text-xl font-medium leading-relaxed">
              Sleep (Nidra) is one of the three pillars of life in Ayurveda, alongside food and energy management. Insomnia is not just a nighttime problem; it is a 24-hour physiological imbalance often rooted in an overactive nervous system and a depletion of <Link href="/guide/ojas" className="text-indigo-400 underline">vital essence (Ojas)</Link>.
            </p>
            <p className="leading-relaxed font-medium">
              In Ayurvedic physiology, difficulty sleeping is primarily associated with an aggravation of <strong>Vata Dosha</strong>—the principle of movement and air. When Vata is high, the mind becomes too "light" to anchor into deep rest. Restoring your <Link href="/guide/doshas" className="text-indigo-400 underline">dosha balance</Link> requires grounding this mobile energy through specific evening rhythms and dietary stabilization.
            </p>
          </div>
        </motion.header>

        <section className="space-y-24">
          {/* 4. Clinical Observation Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-white tracking-tight">Clinical Patterns of Sleep Disturbance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-indigo-500/5 rounded-[3rem] border border-indigo-500/10">
                <p className="text-slate-400 leading-relaxed font-medium mb-4">
                  In clinical practice, we categorize insomnia into specific patterns that reveal the root cause of the wakefulness:
                </p>
                <ul className="space-y-3 text-sm font-bold text-slate-300">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Difficulty falling asleep (Mind overactivity)</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Waking between 2 AM and 5 AM (Vata spike)</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Fragmented sleep with intense dreaming (Pitta heat)</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Waking up feeling heavy and unrefreshed (Kapha Ama)</li>
                </ul>
              </div>
              <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
                <p>
                  Initiation insomnia is often linked to "Prana Vata"—the energy governing the mind. When we overstimulate this energy with screens and late-night work, the biological "anchor" cannot set.
                </p>
                <p>
                  Maintenance insomnia (3 AM waking) is frequently a sign of liver-metabolic heat or an empty digestive tract, where the body's internal fire spikes and triggers an adrenaline-like arousal.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Common Causes Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-white tracking-tight">Common Causes of Sleep Dysfunction</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Metabolic Ties", items: ["Late-night heavy meals", "Dehydration", "Weak Agni creating toxins"] },
                { title: "Lifestyle Drains", items: ["Irregular sleep window", "Blue light exposure", "Over-consumption of dry food"] },
                { title: "Mental Loads", items: ["Sensory overload", "Unresolved emotional heat", "Suppression of natural rest"] }
              ].map((group, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 shadow-sm">
                  <h4 className="font-black text-indigo-400 mb-4 text-sm uppercase tracking-widest">{group.title}</h4>
                  <ul className="space-y-2">
                    {group.items.map((item, j) => (
                      <li key={j} className="text-xs text-slate-400 font-medium flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-slate-700" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Ayurvedic Explanation */}
          <div className="bg-slate-800 p-12 md:p-16 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 blur-[120px] opacity-20 pointer-events-none -mr-40" />
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">Ayurvedic Interpretation</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed max-w-2xl text-lg">
              <p>
                Ayurveda defines sleep as <strong>Nidra</strong>—a state where the mind (Manas) disconnects from the sensory organs (Indriyas). When the heart and mind are over-stimulated, this disconnection cannot happen.
              </p>
              <p>
                Sleep is governed by <strong>Tarpaka Kapha</strong>—the lubricating fluid of the brain. When <strong>Vata</strong> (wind/movement) is too high, it dries up this protective fluid, making the nervous system brittle and reactive. Insomnia is therefore a state of physiological "dryness" and "lightness" that needs to be countered with "oiliness" and "weight."
              </p>
              <p className="text-sm border-l-2 border-indigo-500 pl-6 text-slate-400 italic">
                "Sleep is the mother of the world; it provides nourishment, strength, and virility to all living beings." — *Charaka Samhita*
              </p>
            </div>
          </div>

          {/* 7. Lifestyle Corrections */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-white tracking-tight">Lifestyle Rhythms for Deep Rest</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "The 10PM Anchor", desc: "Going to bed during the Kapha time (6PM-10PM) allows the heavy, grounding energy of nature to pull you into sleep." },
                { title: "Oil Foot Massage (Padabhyanga)", desc: "Massaging warm sesame oil or ghee onto the soles of the feet directly grounds the 'downward' energy, calming the mind." },
                { title: "Trataka (Candle Gazing)", desc: "Softly gazing at a flame for 5 minutes before bed helps stabilize the eyes and quiets the visual processing centers of the brain." },
                { title: "Magnesium/Warm Bath", desc: "A warm bath before bed shifts the body from the sympathetic (fight-or-flight) to the parasympathetic (rest-digest) state." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 flex gap-6 items-start shadow-sm transition-hover hover:bg-white/10">
                   <Clock className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                   <div>
                     <h4 className="font-black text-white mb-2">{item.title}</h4>
                     <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Diet Considerations */}
          <div className="bg-[#222] p-12 rounded-[4rem] border border-white/5 shadow-sm relative overflow-hidden">
            <h2 className="text-3xl font-black text-white tracking-tight mb-12 text-center">Dietary Considerations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-black text-indigo-400 flex items-center gap-2">
                  <Moon className="w-5 h-5" /> Sleep-Supporting Foods
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Warm spiced milk", why: "Nutmeg and cardamom in milk act as natural mild sedatives" },
                    { food: "Cooked Oats or Rice", why: "Grains provide serotonin precursors and ground the Vata energy" },
                    { food: "Almonds & Walnuts", why: "High in magnesium and healthy fats for nervous system stability" },
                    { food: "Clarified Butter (Ghee)", why: "Nourishes Tarpaka Kapha and calms the mental pathways" }
                  ].map((item, i) => (
                    <li key={i} className="space-y-1">
                      <p className="text-sm font-bold text-white">{item.food}</p>
                      <p className="text-xs text-slate-500">{item.why}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-black text-orange-400 flex items-center gap-2">
                  <Coffee className="w-5 h-5" /> Sleep-Disrupting Foods
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Caffeine after 12 PM", why: "Blocks adenosine receptors and aggravates Vata for up to 12 hours" },
                    { food: "Dry/Crunchy Snacks", why: "Foods like crackers and popcorn increase the 'air' element, making the mind light" },
                    { food: "Large Salads for Dinner", why: "Raw food is difficult to digest at night, leading to metabolic arousal" },
                    { food: "Alcohol", why: "Causes mid-night blood sugar drops and 'rebound' wakefulness at 3 AM" }
                  ].map((item, i) => (
                    <li key={i} className="space-y-1">
                      <p className="text-sm font-bold text-white">{item.food}</p>
                      <p className="text-xs text-slate-500">{item.why}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 9. When to Seek Medical Advice */}
          <div className="p-12 rounded-[4rem] bg-indigo-500/5 border border-indigo-500/10 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 shadow-sm border border-white/5">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">When to Consult a Healthcare Professional</h3>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-2xl">
              While sleep optimization is often possible through rhythm and diet, persistent insomnia can indicate complex medical conditions that require clinical assessment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Persistent insomnia lasting > 3 weeks",
                "Severe daytime sleepiness that impacts safety",
                "Loud snoring or gasping during sleep",
                "Periodic leg movements or restlessness",
                "Severe anxiety or panic preventing sleep",
                "Sleep disturbances following new medication"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> {item}
                </div>
              ))}
            </div>
          </div>

          {/* 10. FAQ Section */}
          <div className="space-y-12">
            <h2 className="text-3xl font-black text-white tracking-tight text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: "Why do I wake up at 3 AM?", q_ayur: "Vata Waking", a: "This is the time when Vata naturally rises. If your day was stressful or dinner was late, this energy spikes and wakes the mind." },
                { q: "How does early dinner help?", q_ayur: "Agni Alignment", a: "Sleeping while digesting is like running a car in a garage. It creates metabolic heat 'Ama' that keeps the brain semi-alert." },
                { q: "Is insomnia always a sign of disease?", q_ayur: "Pattern vs Pathology", a: "Usually, it is a sign of rhythm drift—your internal clock has lost its anchor. True pathology is rare compared to lifestyle drift." },
                { q: "How long to see improvement?", q_ayur: "The 28-Day Cycle", a: "While a bath helps tonight, resetting the deep biological rhythm usually takes 2-4 weeks of consistent 10PM bedtimes." },
                { q: "Can I catch up on weekends?", q_ayur: "Rhythm Debt", a: "Ayurveda says No. Consistency (Nitya) is the medicine. Catch-up sleep further dysregulates your Agni and Doshas." }
              ].map((faq, i) => (
                <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-black text-white leading-tight pr-4">{faq.q}</h4>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 shrink-0 mt-1">{faq.q_ayur}</span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 11. Related Topics */}
          <div className="space-y-12 pt-12 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-white tracking-tight">Related symptoms</h2>
                <div className="grid grid-cols-1 gap-4">
                  <Link href="/health/anxiety" className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Crossover</p>
                      <p className="text-sm font-black text-white group-hover:text-purple-400">Anxiety</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/health/brain-fog" className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Crossover</p>
                      <p className="text-sm font-black text-white group-hover:text-indigo-400">Brain Fog</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-black text-white tracking-tight">Ayurvedic Mechanisms</h2>
                <div className="grid grid-cols-1 gap-4">
                  <Link href="/guide/doshas" className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Biological Theory</p>
                      <p className="text-sm font-black text-white group-hover:text-teal-400">The Three Doshas</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/guide/dinacharya" className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Circadian Rhythm</p>
                      <p className="text-sm font-black text-white group-hover:text-amber-400">Daily Routine</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/guide/ojas" className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Vital Essence</p>
                      <p className="text-sm font-black text-white group-hover:text-indigo-400">Building Ojas</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Dosha Variations */}
          <div className="space-y-8 pt-12 border-t border-white/5">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Dosha Variations
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/health/insomnia-vata" className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold text-slate-400 hover:border-indigo-400 hover:text-indigo-400 transition-all">
                Vata-type insomnia
              </Link>
              <Link href="/health/insomnia-pitta" className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold text-slate-400 hover:border-indigo-400 hover:text-indigo-400 transition-all">
                Pitta-type insomnia
              </Link>
              <Link href="/health/insomnia-kapha" className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold text-slate-400 hover:border-indigo-400 hover:text-indigo-400 transition-all">
                Kapha-type insomnia
              </Link>
            </div>
          </div>

          {/* 12. Disclaimer & 13. CTA */}
          <div className="space-y-12">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden border border-white/5 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
              <motion.h3 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
              >
                Reset Your <br /> Biological Midnight
              </motion.h3>
              <p className="text-indigo-200/50 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
                Discover if your insomnia is driven by Vata drift, Pitta heat, or metabolic arousal with your Dinaveda assessment.
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Get Sleep Analysis <ArrowRight className="w-5 h-5" />
              </Link>

              <div className="mt-16 pt-8 border-t border-white/10 text-[10px] font-medium text-slate-500 text-center uppercase tracking-[0.2em] leading-relaxed max-w-2xl mx-auto">
                Educational Disclaimer: This content provides educational insights into Ayurvedic physiology and lifestyle practices. It does not replace professional medical diagnosis or treatment. Always consult a healthcare professional for medical concerns.
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
