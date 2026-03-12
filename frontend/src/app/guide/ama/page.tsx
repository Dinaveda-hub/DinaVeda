"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldAlert, Sparkles, Droplets } from "lucide-react";
import { motion } from "framer-motion";

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ama in Ayurveda: The Root Cause of Disease",
  "description": "Learn about Ama—the metabolic toxins that accumulate in the body due to poor digestion, and how to detoxify naturally.",
  "about": [
    { "@type": "Thing", "name": "Ama" },
    { "@type": "Thing", "name": "Detox" }
  ]
};

export default function AmaPage() {
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
            Ama: Understanding <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">Metabolic Sludge</span>
          </h1>
          <div className="flex items-center gap-4 text-xs font-black text-slate-600 uppercase tracking-widest border-l-4 border-slate-800 pl-6 py-2">
            <span>Toxic Accumulation</span>
            <span>•</span>
            <span>1000 Words</span>
          </div>
        </header>

        <div className="prose prose-slate prose-headings:text-forest prose-headings:font-black prose-strong:text-forest mt-12 space-y-12 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-3xl">What is Ama?</h2>
            <p>
              In Ayurveda, <strong>Ama</strong> is the term used for undigested food and metabolic waste that accumulates in the body's channels (Srotas). If Agni is the fire, Ama is the smoke and ash that remains when the fire is weak. It is considered the root cause of nearly all chronic illnesses.
            </p>
            <p>
              Ama is sticky, cold, and heavy. It slows down metabolism and blocks the flow of nutrients and vital life force (Prana).
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
            <div className="p-10 rounded-[2.5rem] bg-slate-800 text-white">
                <ShieldAlert className="w-12 h-12 mb-6 text-slate-600" />
                <h3 className="text-xl font-bold mb-4 text-white">Signs of Ama</h3>
                <ul className="text-xs space-y-2 font-bold text-slate-600 uppercase tracking-widest list-none p-0">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-500" /> Coated Tongue</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-500" /> Morning Fatigue</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-500" /> Mental Fog</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-500" /> Heaviness in Gut</li>
                </ul>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-emerald-50 border border-emerald-100">
                <Sparkles className="w-12 h-12 mb-6 text-emerald-500" />
                <h3 className="text-xl font-bold mb-4 text-forest">Clearing the Path</h3>
                <p className="text-sm text-slate-600 font-medium">
                    Ayurveda focuses on "Ama Pachana"—burning away toxins through light diet, fasting, and warming spices.
                </p>
            </div>
          </div>

          <section>
            <h2 className="text-3xl">How Ama Develops</h2>
            <p>
              Ama is not just physical. It can also be emotional. Unprocessed trauma, repressed stress, and sensory overload can create mental Ama, leading to a dull or anxious mind. Physically, it is caused by overeating, eating late at night, or consuming incompatible food combinations.
            </p>
          </section>

          <div className="py-12 border-y border-slate-100">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-forest p-10 rounded-[2.5rem] text-white text-center shadow-2xl">
                <h4 className="text-3xl font-black mb-4">Are you accumulating Ama?</h4>
                <p className="text-emerald-100/70 mb-8 font-medium italic">Our daily signal tracker helps you identify toxic accumulation before it turns into disease.</p>
                <Link href="/login" className="inline-flex items-center gap-3 bg-white text-forest px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all hover:bg-emerald-50 shadow-xl">
                    Check Your Toxic Load <ArrowRight className="w-5 h-5" />
                </Link>
            </motion.div>
          </div>
        </div>
      </article>
    </div>
  );
}
