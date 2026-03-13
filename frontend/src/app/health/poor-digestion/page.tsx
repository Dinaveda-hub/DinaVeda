"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Thermometer, Flame, AlertCircle, Sparkles, CheckCircle2, Shield, Activity, Leaf } from "lucide-react";
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
      "name": "Poor Digestion",
      "item": "https://www.dinaveda.com/health/poor-digestion"
    }
  ]
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Poor Digestion: Ayurvedic Guide to Gut Health & Agni",
  "description": "Improve your digestive strength through Ayurvedic principles. Understand the role of Agni and Ama in maintaining optimal gut health and nutrient absorption.",
  "lastReviewed": "2026-03-13",
  "reviewedBy": REVIEWER_JSON_LD,
  "breadcrumb": BREADCRUMB_JSON_LD,
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the common signs of weak digestion in Ayurveda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common signs include heaviness after meals, a coating on the tongue, irregular appetite, and general lethargy. In Ayurveda, this indicates Manda Agni (slow digestion) or the presence of Ama."
        }
      },
      {
        "@type": "Question",
        "name": "How is Ayurvedic digestion different from modern views?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While modern medicine focuses on enzymes and gut bacteria, Ayurveda emphasizes 'Agni' (the bio-fire) and the transformation of food into 'Prana' (life force), considering the timing and state of mind while eating."
        }
      },
      {
        "@type": "Question",
        "name": "Is it okay to eat late at night?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ayurveda strongly advises against late-night eating. The digestive fire is naturally at its lowest after sunset, meaning late meals are more likely to turn into Ama (toxins) than nutrients."
        }
      },
      {
        "@type": "Question",
        "name": "What is Ama and how does it affect the body?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ama is undigested metabolic residue that becomes sticky and toxic. It clogs the channels (Srotas), leading to various symptoms like brain fog, joint pain, and chronic fatigue."
        }
      },
      {
        "@type": "Question",
        "name": "Can I improve my digestion without herbs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Lifestyle changes like thorough chewing, consistent meal times, and drinking warm water are often more foundational than herbs for correcting long-term digestive imbalances."
        }
      }
    ]
  }
};

export default function PoorDigestionPage() {
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
            Poor Digestion: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              Ayurvedic Explanation and Fixes
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
              Digestive health is the engine of human physiology. In Ayurvedic medicine, this capacity is known as <Link href="/guide/agni" className="text-forest underline">digestive fire (Agni)</Link>. When Agni is compromised, the body fails to transform food into vital nutrients, leading to a cascade of systemic imbalances and the accumulation of <Link href="/guide/ama" className="text-forest underline">metabolic residue (Ama)</Link>.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              Struggling with digestion often manifests as chronic heaviness, irregular appetite, or discomfort after eating. These are not just isolated gut issues; they are signals that your <Link href="/guide/doshas" className="text-forest underline">dosha balance</Link> and metabolic transformation process are flickering. Restoring your digestive fire is the first and most critical step in Ayurvedic healing.
            </p>
          </div>
        </motion.header>

        <section className="space-y-24">
          {/* 4. Clinical Observation Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Clinical Signs of Impaired Digestion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-emerald-50/50 rounded-[3rem] border border-emerald-100">
                <p className="text-slate-600 leading-relaxed font-medium mb-4">
                  In a clinical setting, we evaluate the strength of Agni through several key daily observations. These signs indicate how well your system is processing both food and physiological waste:
                </p>
                <ul className="space-y-3 text-sm font-bold text-slate-600">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Heaviness in the stomach after even light meals</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Lack of genuine hunger at breakfast or lunch</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Coated tongue or unpleasant breath in the morning</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Post-meal lethargy or brain fog</li>
                </ul>
              </div>
              <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
                <p>
                  These signs suggest "Manda Agni" (sluggish fire) or "Vishama Agni" (erratic fire). Sluggish fire leads to accumulation, while erratic fire leads to gas and instability.
                </p>
                <p>
                  Clinically, if these are ignored, they lead to the formation of Ama—a sticky metabolic toxin that eventually travels to deeper tissues, potentially causing chronic inflammation.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Common Causes Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Common Causes of Digestive Imbalance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Dietary Habits", items: ["Eating before the previous meal is digested", "Excessive cold/iced drinks", "Over-consumption of raw foods"] },
                { title: "Environmental Drains", items: ["Chronic stress (High cortisol)", "Irregular work/sleep schedules", "Lack of movement"] },
                { title: "Metabolic Loads", items: ["Late-night heavy meals", "Incompatible food pairings", "Suppression of natural urges"] }
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 blur-[120px] opacity-20 pointer-events-none -mr-40" />
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">Ayurvedic Interpretation</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed max-w-2xl text-lg">
              <p>
                Ayurveda defines health as the state where <strong>Agni</strong>—the biological fire—is perfectly balanced. This fire is responsible for secretion of enzymes, breakdown of nutrients, and the separation of "Sarah" (essence) from "Kitta" (waste).
              </p>
              <p>
                When Agni is weak, food undergoes fermentation or putrefaction rather than transformation. This creates <strong>Ama</strong>, which Ayurveda considers the root of 90% of diseases. Restoring digestion isn't just about the stomach; it's about optimizing the entire body's ability to process life.
              </p>
              <p className="text-sm border-l-2 border-emerald-500 pl-6 text-slate-400">
                "One whose Agni is balanced, whose Doshas are in equilibrium, and whose waste elimination is regular... such a person is healthy." — *Sushruta Samhita*
              </p>
            </div>
          </div>

          {/* 7. Lifestyle Corrections */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Lifestyle Practices for Digestive Power</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Timed Eating", desc: "Eating at consistent times (8AM, 1PM, 7PM) trains your Agni to secrete acids predictably." },
                { title: "Mindful Chewing", desc: "Digestion begins in the mouth. Chewing each bite 20-30 times reduces the mechanical load on your Agni." },
                { title: "Post-Meal Movement", desc: "A 10-minute walk (shatapada) after lunch assists the gravitational and peristaltic movement of food." },
                { title: "Emotional Awareness", desc: "Avoid eating while angry or distracted. Emotional stress shuts down the parasympathetic nervous system." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm">
                   <Activity className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
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
                  <Flame className="w-5 h-5" /> Fire-Stoking Foods
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Warm Water with Ginger", why: "Acts as 'Dipana'—directly kindling the digestive fire" },
                    { food: "Buttermilk (Takra)", why: "Ayurveda describes buttermilk as 'nectar' for weak digestion" },
                    { food: "Cumin, Fennel & Coriander", why: "A trio of spices that balance gas while supporting enzymes" },
                    { food: "Lightly steamed vegetables", why: "Easier for a flickering fire to break down than raw fiber" }
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
                  <AlertCircle className="w-5 h-5" /> Fire-Damping Foods
                </h3>
                <ul className="space-y-4">
                  {[
                    { food: "Iced Drinks during meals", why: "Like pouring water on a lit flame, it stops digestion instantly" },
                    { food: "Large portions of Red Meat", why: "Extremely heavy (Guru) and takes 6-8 hours to process" },
                    { food: "Processed Flour & White Sugar", why: "Causes sticky Ama buildup in the micro-channels" },
                    { food: "Fermented/Aged Foods (Excessive)", why: "Can aggravate the heating element, leading to acidity" }
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
          <div className="p-12 rounded-[4rem] bg-emerald-50/50 border border-emerald-100 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-forest tracking-tight">When to Consult a Healthcare Professional</h3>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl">
              While general digestive optimization is a cornerstone of health, certain red-flag symptoms require prompt clinical evaluation and should not be managed through lifestyle alone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Persistent or severe abdominal pain",
                "Unexplained or sudden weight loss",
                "Difficulty or pain while swallowing",
                "Visible blood in the stool",
                "Persistent vomiting or fever",
                "Jaundice (yellowing of eyes or skin)"
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
                { q: "Why is digestion so important in Ayurveda?", a: "Digestion (Agni) is seen as the foundation of all health. If you can't digest well, even the best food becomes toxic." },
                { q: "What are signs of weak digestion?", a: "The main signs are feeling heavy after meals, lack of appetite, coating on the tongue, and irregular bowel habits." },
                { q: "How long does it take to improve?", a: "Consistency is key. You can feel shifts in energy in 2 weeks, but rebuilding your metabolic fire usually takes 1-2 months." },
                { q: "Does stress affect my digestion?", a: "Yes. Stress activates the 'fight-or-flight' mode, which diverts energy away from your gut, effectively putting your Agni on hold." },
                { q: "Can I drink water with my meals?", a: "Ayurveda recommends only small sips of warm water. Avoid cold water, as it immediately dampens your digestive fire." }
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
                  <Link href="/health/bloating" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Crossover</p>
                      <p className="text-sm font-black text-forest group-hover:text-blue-600">Bloating</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
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
              <Link href="/health/poor-digestion-vata" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Vata-type digestion
              </Link>
              <Link href="/health/poor-digestion-pitta" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Pitta-type digestion
              </Link>
              <Link href="/health/poor-digestion-kapha" className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all">
                Kapha-type digestion
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
                Analyze Your <br /> Metabolic State
              </motion.h3>
              <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
                Identify your specific Agni type and discover the roots of your digestive struggle with a personalized clinical assessment.
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
