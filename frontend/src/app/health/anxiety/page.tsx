"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Activity, AlertCircle, Wind, Sparkles, Moon, Anchor, Zap, Shield } from "lucide-react";
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
      "name": "Anxiety",
      "item": "https://www.dinaveda.com/health/anxiety"
    }
  ]
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Anxiety: Ayurvedic Explanation & Causes | Dinaveda",
  "description": "Understand anxiety through the lens of Vata imbalance. Learn how the air element affects your nervous system and Ayurvedic tips to find your center.",
  "lastReviewed": "2026-03-13",
  "reviewedBy": REVIEWER_JSON_LD,
  "breadcrumb": BREADCRUMB_JSON_LD,
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Ayurveda view anxiety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ayurveda views anxiety primarily as a Vata disturbance—an excess of 'air' and 'movement' in the nervous system. Treatment focuses on grounding, warmth, and steady routine."
        }
      },
      {
        "@type": "Question",
        "name": "Can diet help with racing thoughts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Grounding foods like root vegetables, warm stews, and healthy fats help stabilize the nervous system, whereas cold or caffeinated foods can worsen agitation."
        }
      },
      {
        "@type": "Question",
        "name": "Is anxiety related to digestion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. The gut-brain axis is central to Ayurveda. If digestion is irregular (Vishama Agni), it creates internal instability that directly manifests as mental restlessness."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to feel more grounded?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While simple practices like oil massage can provide immediate relief, resetting the nervous system's baseline usually requires 3-6 weeks of consistent routine."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best exercise for anxiety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gentle, grounding movements like Hatha Yoga or slow walking in nature are best. Avoid high-intensity exercise which can further aggravate Vata energy."
        }
      }
    ]
  }
};

export default function AnxietyPage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-indigo-500/20 selection:text-indigo-600">
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
        <Link href="/health" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-all">
          <ArrowLeft className="w-3 h-3" /> Back to Symptom Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">Dinaveda</Link>
        <Link href="/login" className="text-xs font-black text-indigo-600 uppercase tracking-widest border-b-2 border-indigo-600/20 hover:border-indigo-600 transition-all pb-1">Assessment</Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          {/* 1. Title (H1) */}
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Anxious & Restless? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
              Ayurvedic Explanation and Solutions
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
              Anxiety is the physiological experience of a "nervous system in overdrive." In Ayurvedic medicine, this state is commonly interpreted as an aggravation of Vata—the biological principle of air, space, and movement—affecting the <Link href="/guide/agni" className="text-forest underline">gut-brain axis</Link>.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              When Vata becomes excessive, the mind begins to move faster than the body's ability to anchor it. This creates racing thoughts, physical restlessness, and a persistent sense of unease. Ayurveda approaches anxiety by identifying the specific <Link href="/guide/ojas" className="text-forest underline">vitality (Ojas)</Link> leak and using grounding therapies to restore <Link href="/guide/doshas" className="text-forest underline">dosha balance</Link> and neurological stability.
            </p>
          </div>
        </motion.header>

        <section className="space-y-24">
          {/* 4. Clinical Observation Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Clinical Signs of Nervous System Imbalance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-indigo-50/50 rounded-[3rem] border border-indigo-100">
                <p className="text-slate-600 leading-relaxed font-medium mb-4">
                  In a clinical setting, anxiety is rarely just a "mood." We look for these associated physiological signals to determine the depth of the Vata aggravation:
                </p>
                <ul className="space-y-3 text-sm font-bold text-slate-600">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Dry skin and cold extremities (hands/feet)</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Pronounced "racing thoughts" before sleep</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Irregular appetite and variable digestion</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Heightened sensitivity to noise and light</li>
                </ul>
              </div>
              <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
                <p>
                  These signs indicate that "Prana Vayu"— the subtle energy that governs inhalation and sensory processing—has become erratic.
                </p>
                <p>
                  Clinically, this often leads to "Majja Dhatu" (nervous tissue) depletion. When the nervous system lacks the protective "insulation" of healthy lipids and grounding routine, it becomes like an exposed wire, reactive to every external spark.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Common Causes Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Common Causes of Anxiety Activation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Metabolic Ties", items: ["Irregular meal timing", "Excessive caffeine/stimulants", "Variable digestive fire (Agni)"] },
                { title: "Lifestyle Drains", items: ["Excessive multitasking", "Late-night digital exposure", "Frequent travel/movement"] },
                { title: "Environmental Drains", items: ["Cold/Windy climates", "Lack of daily routine", "Sensory overload (Noise)"] }
              ].map((group, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h4 className="font-black text-indigo-500 mb-4 text-sm uppercase tracking-widest">{group.title}</h4>
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 blur-[120px] opacity-20 pointer-events-none -mr-40" />
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">Ayurvedic Interpretation</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed max-w-2xl text-lg">
              <p>
                Ayurveda defines anxiety primarily as <strong>Chitta Udvega</strong>—a state of mental agitation. The mind is compared to a lake; in health, it is calm and reflects reality clearly. In anxiety, the wind of <strong>Vata</strong> creates constant ripples, distorting perception.
              </p>
              <p>
                This imbalance is often driven by "dryness" in the nervous system. When we lack the grounding element of <strong>Kapha</strong> (stability/lubrication), our thoughts lose their anchor. Restoring mental health requires <strong>Snehana</strong> (oiling/nourishment) and <strong>Dharana</strong> (stability).
              </p>
              <p className="text-sm border-l-2 border-indigo-500 pl-6 text-slate-400 italic">
                "Just as a lamp in a windless place does not flicker, the mind must be made steady through discipline and routine." — *Bhagavad Gita (Principles of Yoga)*
              </p>
            </div>
          </div>

          {/* 7. Lifestyle Corrections */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Lifestyle Rhythms for Grounding</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Warm Oil Massage (Abhyanga)", desc: "Applying warm sesame oil to the body before bathing is the single most powerful way to ground the nervous system and calm Vata." },
                { title: "Timed Routine (Dinacharya)", desc: "Eating and sleeping at the exact same time every day provides a 'metabolic safety signal' to the brain, reducing the fear response." },
                { title: "Alternate Nostril Breathing", desc: "Nadi Shodhana breathing balances the left and right hemispheres of the brain, instantly slowing down the heart rate." },
                { title: "Weighted Awareness", desc: "Using a weighted blanket or simply sitting with feet flat on the floor helps the subconcious mind feel 'held' and secure." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm transition-all hover:bg-slate-50">
                   <Anchor className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
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
                  <Sparkles className="w-5 h-5" /> Grounding & Stabilizing Foods
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Root Vegetables", why: "Carrots, sweet potatoes, and beets provide the 'earth' element to stabilize the mind" },
                    { food: "Healthy Fats (Ghee/Avocado)", why: "Lipids are the insulation for our nerves; they prevent the Vata energy from 'sparking'" },
                    { food: "Warm, Moist Meals", why: "Soups, stews, and porridges counter the dry, light qualities of anxiety" },
                    { food: "Sweet Fruits", why: "Naturally sweet tastes (like dates or bananas) are building and calming to the heart" }
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
                  <AlertCircle className="w-5 h-5" /> Foods That Increase Agitation
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Caffeine & Energy Drinks", why: "Directly aggravates the 'wind' element, causing jitters and racing thoughts" },
                    { food: "Cold/Raw Salads", why: "The dry, cold nature of raw greens increases Vata in the digestive tract and mind" },
                    { food: "Dry Crackers & Popcorn", why: "Lacks moisture (Snehana), further 'drying out' the nervous system" },
                    { food: "Excessive White Sugar", why: "Causes blood sugar instability that mimics the physiological signs of a panic attack" }
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
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-forest tracking-tight">When to Consult a Healthcare Professional</h3>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl">
              While Ayurvedic lifestyle practices are highly effective for managing stress, clinical anxiety and panic disorders require professional medical oversight and should never be ignored.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Panic attacks that impact daily function",
                "Thoughts of self-harm or deep hopelessness",
                "Severe insomnia lasting more than 4-5 days",
                "Sudden, unexplained heart palpitations",
                "Difficulty leaving the house or social withdrawal",
                "Anxiety accompanied by severe chest pain"
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
                { q: "How does Ayurveda view anxiety?", a: "It is seen as a Vata disturbance—essentially too much 'air' and 'movement' in the nervous system that needs to be grounded." },
                { q: "Can diet help with racing thoughts?", a: "Yes. Warm, heavy, and oily foods (like root veggies and ghee) act as a biological anchor for a racing mind." },
                { q: "Is anxiety related to digestion?", a: "Strongly. The gut is the 'home' of Vata. If digestion is irregular, it creates a variable environment that fuels mental instability." },
                { q: "How long until I feel more grounded?", a: "Consistency is key. Simple grounding cycles can bring relief in 2-3 weeks as the nervous system's 'baseline' resets." },
                { q: "What is the best exercise for anxiety?", a: "Slow, grounding movements like Hatha Yoga or walking in nature are ideal. Avoid high-intensity cardio when anxiety is peaking." }
              ].map((faq, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-black text-forest leading-tight">{faq.q}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 11. Related Topics & Clusters */}
          <div className="space-y-12 pt-12 border-t border-slate-100">
            <h2 className="text-3xl font-black text-forest tracking-tight">Related Symptoms</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/health/insomnia" className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col hover:bg-slate-50 transition group shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <Moon className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Crossover</p>
                <h4 className="text-lg font-black text-forest group-hover:text-indigo-600 transition-colors">Insomnia</h4>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">Difficulties with sleep onset or quality often occur alongside anxiety.</p>
              </Link>
              <Link href="/health/brain-fog" className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col hover:bg-slate-50 transition group shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 mb-4 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Crossover</p>
                <h4 className="text-lg font-black text-forest group-hover:text-purple-600 transition-colors">Brain Fog</h4>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">Mental clarity is often compromised when the nervous system is in overdrive.</p>
              </Link>
              <Link href="/health/poor-digestion" className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col hover:bg-slate-50 transition group shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <Activity className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Crossover</p>
                <h4 className="text-lg font-black text-forest group-hover:text-emerald-600 transition-colors">Poor Digestion</h4>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">The gut-brain axis means mental stress directly impacts digestive fire.</p>
              </Link>
            </div>
          </div>

          {/* Deep Knowledge Links (Harmonized) */}
          <div className="py-12 border-y border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-forest/5 rounded-2xl flex items-center justify-center text-forest">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-black text-forest uppercase tracking-widest">Connect to Wisdom</span>
                <span className="text-xs text-slate-400 font-medium">Root Cause Guides & Biological Foundations</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/guide/ojas" className="group flex items-center gap-2 text-xs font-black text-slate-600 hover:text-indigo-600 transition-all">
                <div className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-indigo-600" />
                Building Ojas
              </Link>
              <Link href="/guide/dinacharya" className="group flex items-center gap-2 text-xs font-black text-slate-600 hover:text-amber-600 transition-all">
                <div className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-amber-600" />
                Daily Rhythms
              </Link>
              <Link href="/guide/doshas" className="group flex items-center gap-2 text-xs font-black text-slate-600 hover:text-teal-600 transition-all">
                <div className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-teal-600" />
                The Three Doshas
              </Link>
              <Link href="/guide/agni" className="group flex items-center gap-2 text-xs font-black text-slate-600 hover:text-orange-600 transition-all">
                <div className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-orange-600" />
                Agni Biology
              </Link>
            </div>
          </div>

          {/* Dosha Variations */}
          <div className="space-y-8 pt-12 border-t border-slate-100">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Dosha Variations
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/health/anxiety-vata" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Vata-type anxiety
              </Link>
              <Link href="/health/anxiety-pitta" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Pitta-type anxiety
              </Link>
              <Link href="/health/anxiety-kapha" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Kapha-type anxiety
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
                Analyze Your Stress <br /> and Nervous System
              </motion.h3>
              <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
                Discover the specific Vata and metabolic signals behind your restlessness with a personalized clinical assessment.
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
