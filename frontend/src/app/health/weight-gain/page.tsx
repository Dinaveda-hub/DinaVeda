"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Scale, AlertCircle, Flame, Droplets, Zap, Shield, Activity, Coffee } from "lucide-react";
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
      "name": "Weight Gain",
      "item": "https://www.dinaveda.com/health/weight-gain"
    }
  ]
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ayurvedic Perspective on Weight Gain: Metabolic Reset Guide",
  "description": "Struggling with stubborn weight? Learn the Ayurvedic perspective on weight gain. Understand how Kapha, weak Agni, and metabolic toxins affect weight.",
  "lastReviewed": "2026-03-13",
  "reviewedBy": REVIEWER_JSON_LD,
  "breadcrumb": BREADCRUMB_JSON_LD,
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is it harder for some people to lose weight in Ayurveda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each person has a unique metabolic constitution. Those with a 'Kapha' dominance naturally have a slower metabolism ('Manda Agni'). Success requires stoking the internal fire rather than just reducing calories."
        }
      },
      {
        "@type": "Question",
        "name": "Can poor digestion cause weight gain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Inefficient digestion leads to 'Ama' (metabolic residue). This residue impairs the thyroid and tissue metabolism, causing the body to move into 'storage mode' even with low-calorie intake."
        }
      },
      {
        "@type": "Question",
        "name": "Is weight gain always a sign of disease?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not necessarily. Many cases of weight gain are due to 'rhythm drift'—where the biological clock is out of sync with natural cycles, leading to hormonal storage signals."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to reset metabolism?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A metabolic shift usually takes one full cellular cycle—roughly 40 days—of consistent dietary and lifestyle alignment to see permanent changes."
        }
      },
      {
        "@type": "Question",
        "name": "What can I drink to speed up my metabolism?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sipping warm ginger and lemon water first thing in the morning and throughout the day helps 'scrape' (Lekhana) accumulated toxins from the cells."
        }
      }
    ]
  }
};

export default function WeightGainPage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-800">
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
        <Link href="/health" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-amber-600 transition-all">
          <ArrowLeft className="w-3 h-3" /> Back to Symptom Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">Dinaveda</Link>
        <Link href="/login" className="text-xs font-black text-amber-600 uppercase tracking-widest border-b-2 border-amber-600/20 hover:border-amber-600 transition-all pb-1">Assessment</Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          {/* 1. Title (H1) */}
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Stubborn Weight Gain? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              Ayurvedic Metabolic Reset
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
              In Ayurvedic physiology, weight gain is viewed as more than just a caloric surplus. It is primarily an accumulation of Kapha (the principle of earth and water) and a slowing of the <Link href="/guide/agni" className="text-forest underline">metabolic fire (Agni)</Link>.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              When Agni is weak, the body cannot effectively transform food into energy. Instead, it converts nutrients into "Meda Dhatu" (fat tissue) and <Link href="/guide/ama" className="text-forest underline">metabolic residue (Ama)</Link>. This sticky mixture clogs the channels of the body, making weight loss difficult despite <Link href="/guide/doshas" className="text-forest underline">dosha balance</Link> and traditional dieting. Restoring balance requires "scraping" these toxins and reigniting the internal fire.
            </p>
          </div>
        </motion.header>

        <section className="space-y-24">
          {/* 4. Clinical Observation Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Clinical Signs of Metabolic Sluggishness</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-amber-50/50 rounded-[3rem] border border-amber-100">
                <p className="text-slate-600 leading-relaxed font-medium mb-4">
                  In a clinical setting, weight gain is often accompanied by these associated physiological signals of high "Ama" and "Kapha":
                </p>
                <ul className="space-y-3 text-sm font-bold text-slate-600">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Waking up with a white coating on the tongue</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Persistent morning heaviness/brain fog</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Water retention and swelling in extremities</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Chronic sweet cravings and low motivation</li>
                </ul>
              </div>
              <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
                <p>
                  These signs indicate "Manda Agni"—an internal fire that is smoldering rather than burning.
                </p>
                <p>
                  Clinically, this leads to the proliferation of "Meda Dhatu" (fat tissue). When the secondary digestive fires in the tissues are slow, the body loses its ability to discriminate between "vital reserve" and "unnecessary accumulation," leading to stubborn weight in the belly and thighs.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Common Causes Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Common Causes of Weight Accumulation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Metabolic Loads", items: ["Late-night heavy dinner", "Iced/Cold water consumption", "Weak digestive fire (Agni)"] },
                { title: "Lifestyle Drains", items: ["Sedentary morning habits", "Sleeping during the day", "Lack of variety in movement"] },
                { title: "Dietary Blocks", items: ["Excessive dairy/refined sugar", "Heavy, processed 'dead' foods", "Incompatible food combos"] }
              ].map((group, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h4 className="font-black text-amber-600 mb-4 text-sm uppercase tracking-widest">{group.title}</h4>
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
          <div className="bg-slate-900 p-12 md:p-16 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 blur-[120px] opacity-20 pointer-events-none -mr-40" />
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">Ayurvedic Interpretation</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed max-w-2xl text-lg">
              <p>
                Ayurveda classifies excess weight primarily as a disorder of <strong>Lekhana</strong>—the need for scraping. The body's fat tissue (Meda Dhatu) has become so dense and moist that it blocks the flow of <strong>Prana</strong> (energy) to other tissues.
              </p>
              <p>
                This occurs when the earth and water elements (Kapha) dominate the fire element (Agni). To reset, we must introduce the "Sharp" and "Dry" qualities. Through a process called <strong>Karshana</strong> (thinning/lightening), we use bitter tastes and heating spices to liquify the fat and move it out of the system.
              </p>
              <p className="text-sm border-l-2 border-amber-500 pl-6 text-slate-400 italic">
                "In those with excessive fat, the digestive fire becomes strong yet the nutrients only reach the fat tissue, leaving others hungry." — *Charaka Samhita*
              </p>
            </div>
          </div>

          {/* 7. Lifestyle Corrections */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Lifestyle Practices for Vitality</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Morning Movement", desc: "Exercising between 6 AM and 10 AM (Kapha time) breaks the stagnation of the night and activates the metabolic fire for the whole day." },
                { title: "Dry Brushing (Garshana)", desc: "Using silk gloves or a natural brush on the skin stimulates the lymphatic system and helps physically 'break up' stagnant Kapha." },
                { title: "Sipping Warm Water", desc: "Drinking warm, plain water every hour acts as an internal 'flush,' keeping the channels open and preventing Ama buildup." },
                { title: "Early Light Dinner", desc: "Finishing a light, warm dinner by 7 PM ensures the body is in 'burn mode' rather than 'store mode' during sleep." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm transition-all hover:bg-amber-50/30">
                   <Zap className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
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
                <h3 className="text-xl font-black text-amber-600 flex items-center gap-2">
                  <Flame className="w-5 h-5" /> Fire-Stoking Foods
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Bitter Greens (Rocket/Kale)", why: "The bitter taste is the premier medicine for clearing fat and drying out excess moisture" },
                    { food: "Heating Spices (Ginger/Pepper)", why: "Acts as a catalyst for Agni, ensuring nutrients are burned for energy" },
                    { food: "Legumes (Lentils/Moong)", why: "Astringent and drying qualities that help 'scrape' the channels and provide stable protein" },
                    { food: "Warm Honey (in warm water)", why: "Ayurveda considers honey a 'scraper' that helps carry medicine deep into the fat tissue" }
                  ].map((item, i) => (
                    <li key={i} className="space-y-1">
                      <p className="text-sm font-bold text-forest">{item.food}</p>
                      <p className="text-xs text-slate-500">{item.why}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-black text-blue-600 flex items-center gap-2">
                  <Droplets className="w-5 h-5" /> Energy-Damping Foods
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Iced Cold Beverages", why: "Instantly kills the digestive fire and causes fat to 'congeal' in the system" },
                    { food: "Heavy Dairy (Cheese/Cream)", why: "Highly Earth/Water dominant; adds directly to the Kapha load in the body" },
                    { food: "Refined White Flour/Sugar", why: "Creates immediate 'Ama' (sticky toxins) that block the metabolic pathways" },
                    { food: "Large Late-Night Meals", why: "The body cannot process food at night, leading to guaranteed weight storage" }
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
          <div className="p-12 rounded-[4rem] bg-amber-50/50 border border-amber-100 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm border border-slate-100">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-forest tracking-tight">When to Consult a Healthcare Professional</h3>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl">
              While metabolic reset is often possible through lifestyle, sudden or unexplained weight changes can indicate underlying hormonal or clinical conditions that require medical diagnosis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Sudden, rapid weight gain without lifestyle change",
                "Significant fatigue accompanied by cold intolerance",
                "Noticeable swelling in the neck (Thyroid related)",
                "Persistent thirst or frequent urination",
                "Extreme difficulty losing weight despite strict effort",
                "Weight gain following new medical prescriptions"
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
                { q: "Why is it harder for some to lose weight?", a: "Constitution (Kapha dominance) naturally has a slower 'fire'. Success comes from stoking the fire, not just cutting calories." },
                { q: "Can poor digestion cause weight gain?", a: "Yes. Undigested food becomes 'Ama' (sludge). This gumming up of the system prevents fat from being burned effectively." },
                { q: "Is weight gain always a sign of disease?", a: "No. Usually, it's 'Rhythm Drift'—your biological clock is out of sync with the sun and your unique constitution." },
                { q: "How long to reset metabolism?", a: "One cellular cycle (roughly 40 days) of consistent alignment is needed to shift the deep tissue quality." },
                { q: "What is the best drink for metabolism?", a: "Warm honey and lemon water specifically 'scrapes' and thins the metabolic fluids for easier removal." }
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
                  <Link href="/health/poor-digestion" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Crossover</p>
                      <p className="text-sm font-black text-forest group-hover:text-emerald-600">Poor Digestion</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/health/bloating" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Crossover</p>
                      <p className="text-sm font-black text-forest group-hover:text-blue-600">Bloating</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
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
                  <Link href="/guide/doshas" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Biological Theory</p>
                      <p className="text-sm font-black text-forest group-hover:text-teal-600">The Three Doshas</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-transform group-hover:translate-x-1" />
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
              <Link href="/health/weight-gain-vata" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Vata-type weight
              </Link>
              <Link href="/health/weight-gain-pitta" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Pitta-type weight
              </Link>
              <Link href="/health/weight-gain-kapha" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Kapha-type weight
              </Link>
            </div>
          </div>

          {/* 12. Disclaimer & 13. CTA */}
          <div className="space-y-12">
            <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
              <motion.h3 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
              >
                Reset Your <br /> Metabolic Rhythm
              </motion.h3>
              <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
                Discover the specific Kapha and Agni signals behind your stubborn weight with a personalized clinical assessment.
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
