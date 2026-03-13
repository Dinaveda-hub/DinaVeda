"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Wind, AlertTriangle, Lightbulb, CheckCircle2, Info, Flame, Shield } from "lucide-react";
import { motion } from "framer-motion";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Why Do I Feel Bloated After Eating? Ayurvedic Explanation of Bloating",
  "description": "Discover the Ayurvedic cause of bloating and gas. Learn how Vata and weak Agni contribute to digestive discomfort and how to fix it naturally.",
  "about": [
    { "@type": "Thing", "name": "Bloating" },
    { "@type": "Thing", "name": "Ayurveda" },
    { "@type": "Thing", "name": "Agni" }
  ],
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the primary cause of bloating in Ayurveda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The primary cause is typically 'Vishama Agni' (irregular digestion) driven by excess Vata (Air/Ether). This causes food to ferment in the GI tract instead of being properly transformed."
        }
      },
      {
        "@type": "Question",
        "name": "Does warm water help with bloating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Sipping warm water or ginger tea stimulates digestive fire (Agni) and helps ground the Vata element, reducing gas production and intestinal tension."
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

      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/health" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-forest transition-all">
          <ArrowLeft className="w-4 h-4" /> Symptom Hub
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
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-8">
            Digestive Physiology
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Bloating After Meals: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              An Ayurvedic Digestive Perspective
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Bloating refers to abdominal fullness, pressure, or visible distention following meals.  <br />
            In Ayurvedic physiology, this symptom is commonly associated with impaired digestive function (Agni imbalance) and increased Vata activity within the gastrointestinal tract.
          </p>
        </motion.header>

        <section className="space-y-16">
          {/* Section 1: Modern Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">How Bloating Is Interpreted in Modern Medicine</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                In modern clinical practice, bloating may be associated with functional gastrointestinal disorders such as irritable bowel syndrome (IBS), food intolerance, altered gut motility, or excessive intestinal gas production.  <br />
                While these classifications describe the symptom pattern, they often do not evaluate the overall digestive efficiency or metabolic environment of the gastrointestinal tract.
              </p>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="font-black text-forest mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" /> Factors Commonly Associated With Bloating
                </h4>
                <ul className="text-sm font-bold text-slate-500 space-y-2">
                  <li>• High intake of refined carbohydrates or sugars</li>
                  <li>• Eating quickly or under psychological stress</li>
                  <li>• Excessive intake of cold beverages during meals</li>
                  <li>• Irregular meal timing or overeating</li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-premium relative">
              <Wind className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-black text-forest mb-4">Ayurvedic Interpretation</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Ayurveda interprets bloating primarily as a disturbance of Vata Dosha affecting digestive processes.  <br />
                When Vata becomes aggravated, digestive activity may become irregular, resulting in incomplete breakdown of food and excessive gas formation within the intestines.
              </p>
            </div>
          </div>

          {/* Section 2: Ayurvedic Explanation */}
          <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center mb-12">Digestive Mechanisms Involved in Bloating</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Flame className="w-8 h-8" />
                </div>
                <h4 className="font-black text-forest">Weak Agni</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Reduced digestive capacity (Mandagni) may result in incomplete digestion and slower movement of food through the gastrointestinal tract.</p>
                <Link href="/guide/agni" className="text-[10px] font-black text-forest uppercase tracking-widest block pt-2">Explore Agni →</Link>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Wind className="w-8 h-8" />
                </div>
                <h4 className="font-black text-forest">High Vata</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Elevated Vata activity within the gastrointestinal tract may increase intestinal gas formation and irregular gut motility.</p>
                <Link href="/guide/doshas" className="text-[10px] font-black text-forest uppercase tracking-widest block pt-2">Explore Doshas →</Link>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-slate-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <h4 className="font-black text-forest">Ama Build-up</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Incomplete digestion may produce metabolic residue known as Ama. Accumulation of Ama is believed to interfere with normal digestive and metabolic processes.</p>
                <Link href="/guide/ama" className="text-[10px] font-black text-forest uppercase tracking-widest block pt-2">Explore Ama →</Link>
              </div>
            </div>
          </div>

          {/* Bloating Symptoms Section */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Common Symptoms of Digestive Bloating
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed">
              Bloating is more than just abdominal fullness. When digestion becomes irregular,
              several physical sensations can appear alongside gas production and intestinal
              pressure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">Digestive Symptoms</h4>
                <ul className="text-xs text-slate-600 font-medium space-y-2">
                  <li>• Abdominal pressure or swelling after meals</li>
                  <li>• Excess gas or frequent burping</li>
                  <li>• Feeling overly full even after small meals</li>
                  <li>• Irregular bowel movements</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">Associated Symptoms</h4>
                <ul className="text-xs text-slate-600 font-medium space-y-2">
                  <li>• Brain fog after eating</li>
                  <li>• Fatigue after meals</li>
                  <li>• Mild abdominal discomfort</li>
                  <li>• Reduced appetite</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Causes of Bloating After Eating */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              What Causes Bloating After Eating?
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed">
              Bloating after meals usually indicates that digestion is struggling to
              process food efficiently. In Ayurveda, this is often linked to irregular
              digestive fire (Agni) and excessive Vata activity in the gastrointestinal
              tract.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">Digestive Causes</h4>
                <ul className="text-xs text-slate-600 font-medium space-y-2">
                  <li>• Weak digestive fire (Mandagni)</li>
                  <li>• Irregular digestion (Vishamagni)</li>
                  <li>• Fermentation of poorly digested food</li>
                  <li>• Excess gas production in the intestines</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">Lifestyle Causes</h4>
                <ul className="text-xs text-slate-600 font-medium space-y-2">
                  <li>• Eating quickly or while distracted</li>
                  <li>• Drinking cold liquids with meals</li>
                  <li>• Irregular meal timing</li>
                  <li>• Chronic stress affecting digestion</li>
                </ul>
              </div>
            </div>
          </div>

          {/* New Educational Content */}
          <div className="space-y-12 py-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">Digestive Fermentation and Gas Formation</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
                <p>
                  When digestive function becomes inefficient, food may remain in the gastrointestinal tract longer than expected.  <br />
                  During this time, intestinal bacteria ferment partially digested nutrients, producing gases such as hydrogen, methane, and carbon dioxide.
                </p>
                <p>
                  From an Ayurvedic perspective, this process reflects impaired Agni combined with increased Vata activity.  <br />
                  Restoring digestive efficiency is therefore a primary focus of treatment strategies.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">Dietary Considerations for Digestive Balance</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Ayurvedic dietary guidance often recommends warm, freshly prepared meals that are easy to digest.  <br />
                  Foods such as well-cooked grains, lightly spiced vegetables, and simple soups may support digestive efficiency. <br />
                  Cold foods, highly processed products, and very large meals may place additional stress on digestion and increase the likelihood of bloating.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">Post-Meal Activity and Digestion</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Light physical activity after meals may support gastrointestinal motility and assist the downward movement of gas through the digestive tract.  <br />
                  Traditional Ayurvedic guidance often recommends a brief walk after eating to support digestive function.
                </p>
              </div>
            </div>
          </div>

          {/* New FAQ/Safety Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
            <div className="p-10 rounded-[3.5rem] bg-blue-50/50 border border-blue-100 space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">When Medical Evaluation Is Recommended</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Occasional bloating is common and often related to dietary or digestive factors.  <br />
                However, persistent or severe bloating should be evaluated by a qualified healthcare professional.
              </p>
              <div className="text-sm text-slate-600 font-bold leading-relaxed underline underline-offset-4 decoration-blue-200 space-y-4">
                <p>Medical evaluation is recommended if bloating occurs together with:</p>
                <ul className="list-disc pl-5 no-underline">
                  <li>Unexplained weight loss</li>
                  <li>Persistent abdominal pain</li>
                  <li>Blood in stool</li>
                  <li>Chronic vomiting or severe nausea</li>
                  <li>Progressive worsening of symptoms</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Can psychological stress affect digestion?</h4>
                  <p className="text-xs text-slate-500 font-medium">Yes. Stress can alter gastrointestinal motility and digestive secretions, which may contribute to symptoms such as bloating, abdominal discomfort, and irregular bowel habits.</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Is occasional bloating normal?</h4>
                  <p className="text-xs text-slate-500 font-medium">Occasional bloating may occur after large meals or certain foods.  <br /> Frequent or persistent bloating, however, may indicate an underlying digestive imbalance that requires evaluation.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Actionable Corrections */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Lifestyle Strategies for Digestive Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Warm Over Cold", desc: "Warm beverages may support digestive enzyme activity and gastric motility. Cold drinks consumed during meals may slow digestive processes." },
                { title: "The Power of Spices", desc: "Traditional digestive spices such as ginger, cumin, and fennel are commonly used in Ayurveda to support digestive efficiency." },
                { title: "Timed Eating", desc: "Consistent meal timing may support metabolic rhythm and digestive enzyme regulation." },
                { title: "Mindful Chewing", desc: "Thorough chewing assists mechanical digestion and prepares food for efficient breakdown in the stomach and intestines." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex gap-6 items-start">
                   <CheckCircle2 className="w-6 h-6 text-forest shrink-0 mt-1" />
                   <div>
                     <h4 className="font-black text-forest mb-2">{item.title}</h4>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Symptoms */}
          <div className="space-y-8 pt-12 border-t border-slate-100">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Symptoms Often Related to Bloating
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed">
              Digestive imbalance rarely appears alone. When Agni becomes irregular,
              several other symptoms can emerge due to incomplete nutrient absorption
              and metabolic waste accumulation (Ama).
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/health/poor-digestion"
                className="p-4 bg-white border border-slate-100 rounded-2xl text-center text-xs font-black text-forest hover:bg-slate-50 transition"
              >
                Poor Digestion
              </Link>

              <Link
                href="/health/brain-fog"
                className="p-4 bg-white border border-slate-100 rounded-2xl text-center text-xs font-black text-forest hover:bg-slate-50 transition"
              >
                Brain Fog
              </Link>

              <Link
                href="/health/low-energy"
                className="p-4 bg-white border border-slate-100 rounded-2xl text-center text-xs font-black text-forest hover:bg-slate-50 transition"
              >
                Low Energy
              </Link>

              <Link
                href="/health/anxiety"
                className="p-4 bg-white border border-slate-100 rounded-2xl text-center text-xs font-black text-forest hover:bg-slate-50 transition"
              >
                Anxiety
              </Link>
            </div>
          </div>

          {/* Author Authority & Update Info */}
          <div className="flex items-center gap-4 mb-8 pt-6 border-t border-slate-100">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
              DA
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Reviewed By</p>
              <p className="text-xs font-bold text-forest">Dinaveda Editorial Team</p>
              <p className="text-[10px] text-slate-400 font-medium">Last updated: March 2024 • Medical Review</p>
            </div>
          </div>

          {/* Medical Author Section */}
          <div className="mt-12 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
            <h3 className="text-lg font-black text-forest mb-4">
              Medical & Ayurvedic Review
            </h3>

            <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
              This article was medically reviewed by Ayurvedic practitioners and
              wellness researchers with experience in digestive physiology and
              traditional Ayurvedic medicine. Dinaveda content combines classical
              Ayurvedic texts with modern physiological understanding to explain
              digestive symptoms such as bloating, gas, and irregular digestion.
            </p>

            <div className="text-xs text-slate-500 font-medium space-y-1">
              <p>Reviewed by: Ayurvedic Physician (BAMS)</p>
              <p>Specialty: Digestive Disorders & Metabolic Health</p>
              <p>Sources: Charaka Samhita, Ashtanga Hridaya, modern digestive physiology research</p>
            </div>
          </div>

          {/* Dinaveda Connection CTA */}
          <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
            >
              Evaluate Your <br /> Digestive Function
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Dinaveda analyzes digestive signals such as meal timing, energy patterns, and symptom history to help identify possible digestive imbalance patterns.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Analyze My Digestion <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Medical Disclaimer */}
            <div className="mt-16 pt-8 border-t border-white/10 uppercase tracking-widest text-[9px] font-bold text-emerald-100/30 text-center">
              Disclaimer: Ayurvedic educational insights. Not a medical diagnosis. Consult a professional for health concerns.
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
