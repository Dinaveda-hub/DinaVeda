"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Brain, AlertCircle, Sparkles, Zap, Shield, Info, Activity, Moon } from "lucide-react";
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
      "name": "Brain Fog",
      "item": "https://www.dinaveda.com/health/brain-fog"
    }
  ]
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Brain Fog: Ayurvedic Causes and Natural Support",
  "description": "Understand the root causes of brain fog through Ayurvedic physiology. Explore the impact of Ama, Kapha imbalance, and gut-brain connection on mental clarity.",
  "lastReviewed": "2026-03-13",
  "reviewedBy": REVIEWER_JSON_LD,
  "breadcrumb": BREADCRUMB_JSON_LD,
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What causes brain fog in Ayurveda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ayurveda attributes brain fog to 'Ama' (metabolic residue) clogging the 'Srotas' (channels) of the mind and nervous system. This is often driven by sluggish digestion or a Kapha imbalance."
        }
      },
      {
        "@type": "Question",
        "name": "Can tongue scraping help with brain fog?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Tongue scraping stimulates the brain-gut connection and helps remove oral Ama, reflecting the toxic load in the digestive tract that contributes to mental cloudiness."
        }
      },
      {
        "@type": "Question",
        "name": "Is brain fog related to digestion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Ayurveda views the mind and gut as deeply linked. If food isn't properly transformed into energy, it becomes 'Ama,' which can 'fog' the mental channels."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to clear brain fog?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With consistent changes to diet and routine, many notice a significant return of mental clarity within 2-4 weeks as the body clears accumulated Ama."
        }
      },
      {
        "@type": "Question",
        "name": "What can I drink to clear my mind?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sipping warm ginger or cumin-coriander-fennel (CCF) tea throughout the day helps stoke digestive fire and clear the channels of the mind."
        }
      }
    ]
  }
};

export default function BrainFogPage() {
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
            Why Do I Have Brain Fog? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
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
              Brain fog refers to a pattern of cognitive sluggishness that affects focus, memory, and mental processing speed. In Ayurvedic physiology, these symptoms are often interpreted as disturbances in the "gut-brain axis," where impaired <Link href="/guide/agni" className="text-forest underline">digestive fire (Agni)</Link> leads to mental cloudiness.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              When your metabolic fire is weak, the body produces <Link href="/guide/ama" className="text-forest underline">metabolic residue (Ama)</Link>—a sticky, toxic byproduct. In the mind, this Ama acts like a dense fog, clogging the channels of perception (Srotas) and slowing down the neurological transmission of information. Clearing this fog requires addressing the root of the problem: your internal metabolism and <Link href="/guide/kapha" className="text-forest underline">Kapha balance</Link>.
            </p>
          </div>
        </motion.header>

        <section className="space-y-24">
          {/* 4. Clinical Observation Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Clinical Signs of Mental Cloudiness</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-indigo-50/50 rounded-[3rem] border border-indigo-100">
                <p className="text-slate-500 leading-relaxed font-medium">
              When Agni is weak, food remains undigested and turns into <Link href="/guide/ama" className="text-forest underline">Ama (toxins)</Link>. These toxins travel through the circulatory system and eventually settle in the delicate tissues of the brain, creating a "fog" that obscures mental clarity. Regaining focus requires clearing these blockages and stabilizing your <Link href="/guide/doshas" className="text-forest underline">dosha balance</Link>.
            </p>
                <ul className="space-y-3 text-sm font-bold text-slate-600">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Difficulty finding the right words in conversation</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Feeling "heavy-headed" or physically slow</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Frequent "spacing out" or loss of focus</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Waking up feeling unrefreshed, regardless of sleep</li>
                </ul>
              </div>
              <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
                <p>
                  These signs are classically associated with "Kapha aggravation" in the nervous system (Majja Dhatu).
                </p>
                <p>
                  The "heavy" and "sticky" qualities of Kapha, when combined with undigested Ama, create a literal dampness in the mental channels, obstructing "Tarpaka Kapha"—the fluid that moistens and protects the brain.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Common Causes Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Common Causes of Brain Fog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Metabolic Loads", items: ["Impaired gut-brain axis", "High sugar/processed intake", "Late-night dinner habits"] },
                { title: "Sensory Drains", items: ["Excessive digital stimulation", "Inadequate deep sleep", "Multitasking & chronic worry"] },
                { title: "Physiological Blocks", items: ["Ama accumulation", "Sedentary lifestyle (low prana)", "Enviromental toxins"] }
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 blur-[120px] opacity-20 pointer-events-none -mr-40" />
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">Ayurvedic Interpretation</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed max-w-2xl text-lg">
              <p>
                Ayurveda describes the mind as "Manas," which is deeply influenced by the quality of the physical body. Brain fog is primarily a state of <strong>Tamas</strong>—a quality of darkness, heaviness, and inertia—overtaking the mind.
              </p>
              <p>
                This occurs when the <strong>Srotas</strong> (mental channels) are blocked by <strong>Ama</strong>. When digestion is poor, the "Prana" (life force) cannot flow freely to the brain. Instead, the brain is nourished by "dull" nutrients, leading to cognitive fatigue. Restoring clarity involves "Dipana" (stoking the fire) and "Pachana" (digesting the toxins).
              </p>
              <p className="text-sm border-l-2 border-indigo-500 pl-6 text-slate-400">
                "When the pathways of the mind are clouded by stagnation, the intellect (Buddhi) loses its ability to discriminate." — *Ashtanga Hridaya*
              </p>
            </div>
          </div>

          {/* 7. Lifestyle Corrections */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Lifestyle Practices for Mental Clarity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Morning Tongue Scraping", desc: "Removing oral Ama first thing in the morning stimulates the whole digestive tract and sends a 'wake up' signal to the brain." },
                { title: "Digital Fasting", desc: "Avoid screens for at least 1 hour before bed and 1 hour after waking to reduce over-stimulation of the mental channels." },
                { title: "Nasal Drops (Nasya)", desc: "Applying 2 drops of Brahmi or sesame oil to the nostrils clears the pathways to the head, reducing heaviness and improving focus." },
                { title: "Vigorous Movement", desc: "A 20-minute daily walk or yoga session increases 'Prana' (oxygen and energy) flow to the brain, burning through Kapha sluggishness." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm">
                   <Zap className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
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
                  <Sparkles className="w-5 h-5" /> Clarity-Supporting Foods
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Fresh Ghee (A2)", why: "The premier substance for nourishing 'Majja' (nervous system) without creating fog" },
                    { food: "Bitter Greens", why: "Rocket, kale, and dandelion clear Ama from the blood and reduce Kapha heaviness" },
                    { food: "Warm Spiced Water", why: "Small sips of ginger or CCF tea keep the mental channels open and clear" },
                    { food: "Walnuts & Pumpkin Seeds", why: "Provide the essential fats needed for neurological repair" }
                  ].map((item, i) => (
                    <li key={i} className="space-y-1">
                      <p className="text-sm font-bold text-forest">{item.food}</p>
                      <p className="text-xs text-slate-500">{item.why}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-black text-indigo-600 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> Foods That Induce "Fog"
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Excessive Dairy/Cheese", why: "Highly Kapha-aggravating and creates physical and mental heaviness" },
                    { food: "Fried/Oily Foods", why: "Directly contributes to Ama accumulation in the digestive tract" },
                    { food: "Refined White Sugar", why: "Causes rapid fluctuations in 'Sadhaka Pitta', leading to mental crashes" },
                    { food: "Dull/Canned Foods", why: "Lacks 'Prana' and increases the Tamas (inert) quality of the mind" }
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
          <div className="p-12 rounded-[4rem] bg-indigo-50/50 border border-indigo-100 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-forest tracking-tight">When to Consult a Healthcare Professional</h3>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl">
              While brain fog is often a result of lifestyle and metabolic factors, it can also be a symptom of underlying medical conditions. If you experience significant or sudden cognitive decline, professional medical evaluation is essential.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Sudden or severe memory loss",
                "Difficulty performing everyday tasks",
                "Severe or frequent headaches",
                "Unexplained mood changes or depression",
                "Confusion or disorientation",
                "Vision changes or persistent dizziness"
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
                { q: "What causes brain fog in Ayurveda?", a: "It is primarily linked to 'Ama' (metabolic sludge) blocking the mental channels and 'Kapha' aggravation creating heaviness." },
                { q: "Can tongue scraping help with brain fog?", a: "Yes. Scraping the tongue stimulates the gut-brain connection and helps clear the first stage of Ama buildup." },
                { q: "Is brain fog related to digestion?", a: "Absolutely. Ayurveda teaches that the mind is nourished by the finest byproduct of digestion. If digestion is weak, the mind lacks clarity." },
                { q: "How long does it take to clear brain fog?", a: "Consistency is vital. Clearing accumulated toxins usually takes 2-4 weeks of consistent diet and routine adjustments." },
                { q: "Can sleep influence cognitive clarity?", a: "Yes. Sleep is when the brain clears mental waste. Sleeping before 10PM supports the natural 'cleaning' cycle of the body." }
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
                  <Link href="/health/anxiety" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Crossover</p>
                      <p className="text-sm font-black text-forest group-hover:text-indigo-600">Anxiety</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/health/low-energy" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Crossover</p>
                      <p className="text-sm font-black text-forest group-hover:text-orange-600">Low Energy</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-black text-forest tracking-tight">Ayurvedic Mechanisms</h2>
                <div className="grid grid-cols-1 gap-4">
                  <Link href="/guide/ama" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Root Cause</p>
                      <p className="text-sm font-black text-forest group-hover:text-red-600">Metabolic Residue (Ama)</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-red-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/guide/doshas" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Biological Theory</p>
                      <p className="text-sm font-black text-forest group-hover:text-teal-600">The Three Doshas</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/guide/agni" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Root Cause</p>
                      <p className="text-sm font-black text-forest group-hover:text-orange-600">Digestive fire (Agni)</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-600 transition-transform group-hover:translate-x-1" />
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
              <Link href="/health/brain-fog-vata" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Vata-type brain fog
              </Link>
              <Link href="/health/brain-fog-pitta" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Pitta-type brain fog
              </Link>
              <Link href="/health/brain-fog-kapha" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Kapha-type brain fog
              </Link>
            </div>
          </div>

          {/* 12. Disclaimer & 13. CTA */}
          <div className="space-y-12">
            <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
              <motion.h3 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
              >
                Analyze Your <br /> Cognitive Health Patterns
              </motion.h3>
              <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
                Discover the specific metabolic and Kapha blocks behind your mental fog with a personalized clinical assessment.
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
