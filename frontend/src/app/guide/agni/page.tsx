"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Flame, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Agni in Ayurveda: The Science of Digestion and Metabolism",
  "description": "Learn about Agni—the biological fire that governs digestion, transformation, and longevity in the human body.",
  "about": [
    { "@type": "Thing", "name": "Agni" },
    { "@type": "Thing", "name": "Metabolism" }
  ]
};

export default function AgniPage() {
  return (
    <div className="bg-white text-slate-800 min-h-screen relative font-sans selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSON_LD) }}
      />
      
      {/* Top Nav */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-slate-50">
        <Link href="/guide" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-forest transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">Dinaveda</Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-forest tracking-tighter mb-8 leading-tight">
            Agni: The Fire <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Of Transformation</span>
          </h1>
          <div className="flex items-center gap-4 text-xs font-black text-slate-600 uppercase tracking-widest border-l-4 border-orange-500 pl-6 py-2">
            <span>Metabolic Intelligence</span>
            <span>•</span>
            <span>1100 Words</span>
          </div>
        </header>

        <div className="prose prose-slate prose-headings:text-forest prose-headings:font-black prose-strong:text-forest mt-12 space-y-12 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-3xl">What is Agni?</h2>
            <p>
              In Ayurveda, <strong>Agni</strong> is the biological fire that governs digestion, metabolism, and the transformation of matter into energy. It is the gatekeeper of health. Without a strong Agni, even the healthiest food cannot be properly absorbed, leading to the accumulation of toxins (Ama).
            </p>
            <p>
              Agni is not just about the stomach. It exists in every cell, governing the transformation of sense perceptions into thoughts and emotions.
            </p>
          </section>

          <div className="p-8 bg-orange-50 rounded-3xl border border-orange-100 flex gap-6 items-start">
            <Zap className="w-12 h-12 text-orange-500 shrink-0 mt-1" />
            <div>
                <h4 className="text-xl font-bold mb-2 text-forest">The Core Principle</h4>
                <p className="text-sm text-slate-600 font-medium">
                    "A man is as old as his Agni." Ayurveda teaches that longevity and immunity are directly proportional to the strength of your metabolic fire.
                </p>
            </div>
          </div>

          <section>
            <h2 className="text-3xl">The Four States of Agni</h2>
            <p>
              How your body processes food depends on the stability of your fire:
            </p>
            <ul className="space-y-4 list-none p-0">
                <li className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">1</span>
                    <div>
                        <strong className="block text-emerald-700 uppercase tracking-widest text-xs mb-1">Sama Agni</strong>
                        <p className="text-sm">Balanced metabolism. Food is digested perfectly, leading to energy and clarity.</p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs">2</span>
                    <div>
                        <strong className="block text-indigo-600 uppercase tracking-widest text-xs mb-1">Vishama Agni</strong>
                        <p className="text-sm">Irregular metabolism. Common in Vata types. Leads to gas, bloating, and constipation.</p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs">3</span>
                    <div>
                        <strong className="block text-red-600 uppercase tracking-widest text-xs mb-1">Tikshna Agni</strong>
                        <p className="text-sm">Hyper-metabolism. Common in Pitta types. Leads to acidity, burning sensations, and hunger.</p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 font-bold text-xs">4</span>
                    <div>
                        <strong className="block text-slate-600 uppercase tracking-widest text-xs mb-1">Manda Agni</strong>
                        <p className="text-sm">Hypo-metabolism. Common in Kapha types. Leads to heaviness, lethargy, and weight gain.</p>
                    </div>
                </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl">How to Strengthen Agni</h2>
            <p>
                Strengthening Agni isn't about eating more; it's about eating in alignment with your fire. Drinking warm water, eating when hungry, and favoring spices like ginger and cumin can rekindle a weak fire.
            </p>
          </section>

          <div className="py-12 border-y border-slate-100">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#1a1a1a] p-10 rounded-[2.5rem] text-white text-center shadow-2xl">
                <h4 className="text-3xl font-black mb-4">Track Your Metabolic State</h4>
                <p className="text-slate-600 mb-8 font-medium">Dinaveda monitors your digestive signals daily to provide a real-time Agni score.</p>
                <Link href="/login" className="inline-flex items-center gap-3 bg-orange-500 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all hover:bg-orange-600 shadow-xl shadow-orange-500/20">
                    See Your Agni Score <ArrowRight className="w-5 h-5" />
                </Link>
            </motion.div>
          </div>
        </div>
      </article>
    </div>
  );
}
