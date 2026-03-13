"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Wind, AlertTriangle, Lightbulb, CheckCircle2, Info, Flame, Shield } from "lucide-react";
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
      "name": "Bloating",
      "item": "https://www.dinaveda.com/health/bloating"
    }
  ]
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Bloating After Eating: Ayurvedic Causes & Digestion Guide",
  "description": "Understand bloating after meals through Ayurvedic physiology. Learn how digestion (Agni) and metabolic residue (Ama) contribute to abdominal discomfort.",
  "lastReviewed": "2026-03-13",
  "reviewedBy": REVIEWER_JSON_LD,
  "breadcrumb": BREADCRUMB_JSON_LD,
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What causes bloating in Ayurveda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Ayurveda, bloating (Adhmana) is primarily caused by an imbalance in Vata dosha, which governs movement. When the digestive fire (Agni) is irregular, it leads to the accumulation of Ama (metabolic toxins) and gas."
        }
      },
      {
        "@type": "Question",
        "name": "Is salt causing my bloating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Excessive salt intake can lead to water retention. In Ayurveda, this is often linked to a Pitta-Kapha imbalance affecting the body's fluid regulation."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take for Ayurvedic treatment to work for bloating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While immediate relief can often be felt within 24-48 hours, resetting the underlying metabolic function (Agni) typically takes 2-4 weeks of consistent practice."
        }
      },
      {
        "@type": "Question",
        "name": "Can I drink water while eating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ayurveda recommends sipping small amounts of warm water during meals to aid digestion, rather than large quantities of cold water which can 'drown' the digestive fire."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best tea for bloating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cumin-Coriander-Fennel (CCF) tea is the gold standard for soothing the digestive tract and clearing gas without being overly heating."
        }
      }
    ]
  }
};

export default function BloatingPage() {
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
        <Link href="/" className="font-black text-forest text-xl tracking-tighter flex items-center gap-2">
          Dinaveda
        </Link>
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
          {/* 1. Title (H1) */}
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Bloating After Meals: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
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
              Bloating refers to abdominal distention or pressure that commonly appears after meals. In Ayurvedic physiology, this symptom frequently reflects irregular <Link href="/guide/agni" className="text-forest underline">digestive fire (Agni)</Link> and an imbalance of the Vata dosha within the gastrointestinal tract.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              While occasional gas is a normal byproduct of digestion, persistent bloating indicates that the metabolic transformation of food is incomplete. Instead of being converted into vital energy, food remains in the digestive tract, undergoing fermentation and creating <Link href="/guide/ama" className="text-forest underline">metabolic residue (Ama)</Link> which traps gas and increases internal pressure.
            </p>
          </div>
        </motion.header>

        <section className="space-y-24">
          {/* 4. Clinical Observation Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Clinical Patterns Associated With Bloating</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-blue-50/50 rounded-[3rem] border border-blue-100">
                <p className="text-slate-600 leading-relaxed font-medium mb-4">
                  Individuals experiencing persistent bloating often report additional clinical signs that point to a broader systemic imbalance. These associated patterns are critical for identifying the underlying physiological state.
                </p>
                <ul className="space-y-3 text-sm font-bold text-slate-600">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Irregular appetite</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Fatigue immediately after meals</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Brain fog or cognitive slowing</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Fluctuating bowel movements</li>
                </ul>
              </div>
              <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
                <p>
                  In a clinical setting, these signs suggest "Vishama Agni"—a state where the digestive fire is erratic. Like a flickering wind-blown flame, it sometimes burns too hot and sometimes too low, leading to inconsistent digestion.
                </p>
                <p>
                  This erratic heat fails to break down heavy proteins and complex carbohydrates efficiently, leading to the production of "Ama" (undigested metabolic residue).
                </p>
              </div>
            </div>
          </div>

          {/* 5. Common Causes Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Common Causes of Bloating</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Dietary Factors", items: ["Excess cold/raw foods", "Carbonated beverages", "Incompatible food combos"] },
                { title: "Eating Habits", items: ["Irregular meal timing", "Eating too quickly", "Excessive water with meals"] },
                { title: "Physiological Triggers", items: ["Weak Agni (digestive fire)", "Ama accumulation", "Chronic stress/anxiety"] }
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 blur-[120px] opacity-20 pointer-events-none -mr-40" />
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">Ayurvedic Interpretation</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed max-w-2xl text-lg">
              <p>
                In Ayurvedic physiology, bloating (Adhmana) is primarily associated with aggravated Vata dosha affecting the digestive channels (Srotas). Vata, composed of Air and Ether elements, governs movement. When it becomes excessive in the colon and small intestine, it causes dryness and erratic movement.
              </p>
              <p>
                When your internal "Fire" (Agni) becomes unstable, the breakdown of "Prana" (life force) from food is interrupted. This creates Ama—a sticky, toxic byproduct that clogs the Srotas. The combination of stuck Ama and excessive Vata leads to the classic sensation of "stuck" gas and abdominal distention.
              </p>
              <p className="text-sm border-l-2 border-blue-500 pl-6 text-slate-400">
                "When the Vata is trapped by the accumulation of Ama, it moves in reverse (Anuloma to Pratiloma), causing upward pressure and distention." — *Ashtanga Hridaya*
              </p>
            </div>
          </div>

          {/* 7. Lifestyle Corrections */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Lifestyle Practices That May Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Consistent Meal Timing", desc: "Eating at the same time every day trains your Agni to secrete digestive enzymes predictably." },
                { title: "Avoid Eating Under Stress", desc: "Eating while anxious activates the sympathetic nervous system, which shuts down blood flow to the gut." },
                { title: "Brief Post-Meal Walk", desc: "A 10-15 minute gentle walk (Shatapada) assists the mechanical movement of food and gas." },
                { title: "Maintain Regular Sleep", desc: "Sleep is when the gut repairs itself. Irregular sleep patterns directly aggravate Vata." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm">
                   <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
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
                  <Flame className="w-5 h-5" /> Supports Digestion
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Warm cooked meals", why: "Lowers the metabolic energy needed for breakdown" },
                    { food: "Ginger & Cumin", why: "Acts as 'Dipana' (appetizer) and 'Pachana' (digestant)" },
                    { food: "Ghee or healthy oils", why: "Lubricates the GI tract to prevent Vata dryness" },
                    { food: "Sipped warm water", why: "Keeps Agni active throughout the day" }
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
                  <Wind className="w-5 h-5" /> May Link to Bloating
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Excessive cold/raw foods", why: "Dampens digestive fire and increases Vata coldness" },
                    { food: "Carbonated drinks", why: "Introduces artificial gas into the system" },
                    { food: "Heavy late-night meals", why: "Digestion is naturally weaker after sunset" },
                    { food: "Cabbage, kale, broccoli (raw)", why: "Highly vata-aggravating unless well-cooked with spices" }
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
          <div className="p-12 rounded-[4rem] bg-blue-50/50 border border-blue-100 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-forest tracking-tight">When to Consult a Healthcare Professional</h3>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl">
              While dietary bloating is often manageable through lifestyle adjustments, certain signs indicate the need for a professional medical evaluation. Persistent abdominal pain, unexplained weight loss, vomiting, or blood in stool should always be evaluated by a qualified healthcare professional.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Persistent or worsening abdominal pain",
                "Unexplained weight loss",
                "Fever or vomiting",
                "Noticeable changes in bowel habits lasting weeks",
                "Blood in stool",
                "Difficulty swallowing"
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
                { q: "What causes bloating after eating?", a: "In Ayurveda, it is usually linked to 'Vishama Agni' (erratic digestion) where the Vata dosha disturbs the digestive process, causing gas to form from partially digested food." },
                { q: "Is bloating related to digestion?", a: "Yes, bloating is a primary signal of digestive inefficiency. It occurs when the breakdown of food is replaced by fermentation." },
                { q: "How long does digestive imbalance take to correct?", a: "Minor imbalances often improve within 2 weeks of consistent routine changes, while deep-seated patterns may take 4-8 weeks to resolve." },
                { q: "Can stress cause bloating?", a: "Yes. Stress increases Vata (Air), which causes the intestinal muscles to tighten or move irregularly, trapping gas in the system." },
                { q: "Can drinking water with meals cause bloating?", a: "Excessive cold water with meals can 'drown' the digestive fire. Ayurveda recommends small sips of warm water to support digestion instead." }
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
                  <Link href="/health/weight-gain" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Crossover</p>
                      <p className="text-sm font-black text-forest group-hover:text-amber-600">Weight Gain</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
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
              <Link href="/health/bloating-vata" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Vata-type bloating
              </Link>
              <Link href="/health/bloating-pitta" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Pitta-type bloating
              </Link>
              <Link href="/health/bloating-kapha" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Kapha-type bloating
              </Link>
            </div>
          </div>

          {/* 12. Disclaimer & 13. CTA */}
          <div className="space-y-12">
            <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
              <motion.h3 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
              >
                Analyze Your <br /> Physiological Pattern
              </motion.h3>
              <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
                Identify the underlying Ayurvedic patterns behind your symptoms with a personalized clinical assessment.
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
