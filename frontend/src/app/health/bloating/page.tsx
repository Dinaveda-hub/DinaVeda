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
  ]
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
        <Link href="/health" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-all">
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
          </div>
        </section>
      </article>
    </div>
  );
}
