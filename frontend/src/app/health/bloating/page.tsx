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
            Digestive Health
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Why Do I Feel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              Bloated After Eating?
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Chronic bloating isn't just "part of getting older." It's a signal that your biological fire is struggling with the air element.
          </p>
        </motion.header>

        <section className="space-y-16">
          {/* Section 1: Modern Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Modern Perspective</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Modern medicine often labels bloating as IBS or food sensitivity. While accurate, it focuses on the <strong>what</strong>—the reaction to food—rather than the <strong>why</strong>—the state of the digestive environment.
              </p>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="font-black text-forest mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" /> Common Triggers
                </h4>
                <ul className="text-sm font-bold text-slate-500 space-y-2">
                  <li>• Refined sugar and processed flour</li>
                  <li>• High-stress eating (Cortisol spikes)</li>
                  <li>• Excessive cold liquids during meals</li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-premium relative">
              <Wind className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-black text-forest mb-4">The Vata Imbalance</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                In Ayurveda, bloating is almost always a result of <strong>Vata</strong> (the air/ether element) displacing your digestive fire. When Vata is high, digestion becomes irregular—creating gas, distention, and discomfort.
              </p>
            </div>
          </div>

          {/* Section 2: Ayurvedic Explanation */}
          <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center mb-12">The Root Cause: Agni & Vata</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Flame className="w-8 h-8" />
                </div>
                <h4 className="font-black text-forest">Weak Agni</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Your metabolic fire is too low to "cook" the food properly, leading to fermentation.</p>
                <Link href="/guide/agni" className="text-[10px] font-black text-forest uppercase tracking-widest block pt-2">Explore Agni →</Link>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Wind className="w-8 h-8" />
                </div>
                <h4 className="font-black text-forest">High Vata</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Internal "air" creates pressure and wind in the GI tract when not grounded by routine.</p>
                <Link href="/guide/doshas" className="text-[10px] font-black text-forest uppercase tracking-widest block pt-2">Explore Doshas →</Link>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-slate-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <h4 className="font-black text-forest">Ama Build-up</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Undigested residue clogs the channels, preventing the natural flow of energy.</p>
                <Link href="/guide/ama" className="text-[10px] font-black text-forest uppercase tracking-widest block pt-2">Explore Ama →</Link>
              </div>
            </div>
          </div>

          {/* New Educational Content */}
          <div className="space-y-12 py-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">Understanding Digestive Fermentation</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
                <p>
                  In Ayurveda, bloating is the primary sign of <strong>Mandagni</strong> (slow digestion) 
                  or <strong>Vishamagni</strong> (irregular digestion). When your digestive fire is 
                  insufficient to transform the chemistry of your food, it begins to ferment in the 
                  warm, moist environment of the small and large intestines.
                </p>
                <p>
                  This fermentation releases "air" (Vata) into the abdominal cavity, creating pressure, 
                  distention, and discomfort. If left unaddressed, this gas can move into the 
                  bloodstream and eventually affect the nervous system, leading to fatigue and brain fog.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">The Anti-Bloat Diet</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Focus on warm, well-cooked, and lightly spiced foods. Root vegetables, basmati rice, 
                  and kitchari are ideally suited for calming Vata-driven gas. Avoid raw cruciferous 
                  vegetables (kale, broccoli, cauliflower), cold smoothies, and large amounts of 
                  beans unless prepared with plenty of digestive spices like hing (asafoetida) 
                  and cumin.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">Mindful Movement</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Gentle movement after a meal, such as a 100-step stroll, helps catalyze the 
                  downward movement of energy (Apana Vayu), which is essential for healthy 
                  elimination and gas clearance. Additionally, yoga poses like "Apanasana" 
                  (Knees-to-Chest) specifically help evacuate excess abdominal pressure.
                </p>
              </div>
            </div>
          </div>

          {/* New FAQ/Safety Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
            <div className="p-10 rounded-[3.5rem] bg-blue-50/50 border border-blue-100 space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">When to See a Doctor</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Bloating is common, but it can occasionally signal more serious gastrointestinal issues.
              </p>
              <p className="text-sm text-slate-600 font-bold leading-relaxed underline underline-offset-4 decoration-blue-200">
                Please seek medical evaluation if bloating is accompanied by sudden weight loss, 
                persistent severe pain, blood in stool, or if it becomes progressively worse over several weeks.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Common Questions</h3>
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Can stress cause bloating?</h4>
                  <p className="text-xs text-slate-500 font-medium">Absolutely. Stress activates the 'fight-or-flight' response, which pulls blood flow away from the gut, effectively shutting down your digestive fire (Agni).</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Is it normal to be bloated?</h4>
                  <p className="text-xs text-slate-500 font-medium"> Occasional bloating after a very large meal can happen, but frequent bloating is a sign of physiological imbalance that should be addressed.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Actionable Corrections */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Simple Ayurvedic Corrections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Warm Over Cold", desc: "Sip warm water or ginger tea with meals. Cold liquids extinguish your digestive fire (Agni)." },
                { title: "The Power of Spices", desc: "Cumin, Coriander, and Fennel (CCF tea) act as internal 'fans' for your digestive fire." },
                { title: "Timed Eating", desc: "Eat your largest meal during Pitta time (10AM - 2PM) when the sun and your Agni are at peak." },
                { title: "Mindful Chewing", desc: "Digestion begins in the mouth. Vata is calmed by focus; eating while working increases gas." }
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

          {/* Dinaveda Connection CTA */}
          <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
            >
              Discover Your <br /> Digestive Pattern
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Identify if your bloating is Vata-driven or Ama-driven. Get a custom protocol in 2 minutes.
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
