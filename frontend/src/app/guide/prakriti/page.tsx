"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Fingerprint, Activity, Clock } from "lucide-react";
import { motion } from "framer-motion";

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "What is Prakriti in Ayurveda? Understanding Your Natural Constitution",
  "description": "Discover your Prakriti—the unique genetic blueprint that determines your baseline health, personality, and metabolism.",
  "about": [
    { "@type": "Thing", "name": "Prakriti" },
    { "@type": "Thing", "name": "Ayurveda" }
  ]
};

export default function PrakritiPage() {
  return (
    <div className="bg-white text-slate-800 min-h-screen relative font-sans selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSON_LD) }}
      />
      
      {/* Top Nav */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-slate-50">
        <Link href="/guide" className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-forest transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">Dinaveda</Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-forest tracking-tighter mb-8 leading-tight">
            What is Prakriti? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">Your Genetic Blueprint</span>
          </h1>
          <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest border-l-4 border-gold pl-6 py-2">
            <span>Biological baseline</span>
            <span>•</span>
            <span>1400 Words</span>
          </div>
        </header>

        <div className="prose prose-slate prose-headings:text-forest prose-headings:font-black prose-strong:text-forest mt-12 space-y-12 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-3xl">The Concept of Prakriti</h2>
            <p>
              In Sanskrit, <strong>Prakriti</strong> literally means "nature" or "original creation." In the context of Ayurveda, it refers to your unique genetic and physiological constitution. Just as every person has a unique fingerprint, every individual has a unique Prakriti.
            </p>
            <p>
              Your Prakriti is determined at the moment of conception by the state of your parents' doshas, the environment, and cosmic timing. It remains fixed throughout your life, acting as your permanent baseline for health.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
            <div className="p-8 rounded-[2rem] bg-forest text-white">
                <Fingerprint className="w-12 h-12 mb-6 text-emerald-300" />
                <h3 className="text-xl font-bold mb-4 text-white">Biological Identity</h3>
                <p className="text-sm text-emerald-50 opacity-80 leading-relaxed">
                    Prakriti governs everything from your bone structure and skin type to your reaction to stress and digestive capacity.
                </p>
            </div>
            <div className="p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50">
                <Activity className="w-12 h-12 mb-6 text-forest" />
                <h3 className="text-xl font-bold mb-4">Baseline Health</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                    Knowing your Prakriti allows you to distinguish between your "natural state" and an "imbalance" (Vikriti).
                </p>
            </div>
          </div>

          <section>
            <h2 className="text-3xl">The Seven Types of Prakriti</h2>
            <p>
              While there are three primary doshas, most individuals fall into one of seven constitutional categories:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-bold list-none p-0">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-forest" /> Monodosha: Vata, Pitta, or Kapha</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-forest" /> Dual-Dosha: Vata-Pitta, Pitta-Kapha, etc.</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-forest" /> Tridosha: Vata-Pitta-Kapha (Sama)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl">Why It Matters</h2>
            <p>
              When you follow a generic diet or lifestyle, you are ignoring your Prakriti. A cold salad might be healthy for a Pitta person but can create severe bloating for a Vata-dominant individual. By aligning with your nature, you eliminate resistance in your biology.
            </p>
          </section>

          <div className="py-12 border-y border-slate-100">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-gold p-10 rounded-[2.5rem] text-forest text-center shadow-2xl shadow-gold/20">
                <h4 className="text-3xl font-black mb-4 italic">Discover Your Constitution</h4>
                <p className="text-forest/80 mb-8 font-medium">Stop guessing what's healthy. Use our AI model to determine your original genetic baseline.</p>
                <Link href="/login" className="inline-flex items-center gap-3 bg-forest text-white px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all hover:bg-forest/90">
                    Discover Your Prakriti <ArrowRight className="w-5 h-5" />
                </Link>
            </motion.div>
          </div>
        </div>
      </article>
    </div>
  );
}
