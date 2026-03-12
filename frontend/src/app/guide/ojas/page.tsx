"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ojas: The Essence of Vitality and Immunity in Ayurveda",
  "description": "Discover Ojas—the ultimate end-product of perfect digestion and the root of immunity, radiance, and longevity.",
  "about": [
    { "@type": "Thing", "name": "Ojas" },
    { "@type": "Thing", "name": "Immunity" }
  ]
};

export default function OjasPage() {
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
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-forest tracking-tighter mb-8 leading-tight">
            Ojas: The Essence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-forest">Of Pure Vitality</span>
          </h1>
          <div className="inline-flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest border border-slate-100 rounded-full px-8 py-3 mx-auto">
            <span>Biological Wealth</span>
            <span>•</span>
            <span>950 Words</span>
          </div>
        </header>

        <div className="prose prose-slate prose-headings:text-forest prose-headings:font-black prose-strong:text-forest mt-12 space-y-12 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-3xl">What is Ojas?</h2>
            <p>
              In the hierarchy of Ayurvedic physiology, <strong>Ojas</strong> is the ultimate treasure. It is the end-product of perfect digestion and the quintessence of all seven tissues (Dhatus). When Agni is strong and Ama is absent, your body produces Ojas.
            </p>
            <p>
              Ojas is responsible for immunity, physical strength, glowing skin, mental stability, and spiritual radiance. It is the biological equivalent of bliss.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
            <div className="p-6 text-center space-y-4">
                <ShieldCheck className="w-10 h-10 mx-auto text-emerald-500" />
                <h4 className="text-lg font-bold text-forest">Immunity</h4>
                <p className="text-xs text-slate-500">The primary defense against external and internal pathogens.</p>
            </div>
            <div className="p-6 text-center space-y-4">
                <Sparkles className="w-10 h-10 mx-auto text-gold" />
                <h4 className="text-lg font-bold text-forest">Radiance</h4>
                <p className="text-xs text-slate-500">The healthy glow of the skin and clarity in the eyes.</p>
            </div>
            <div className="p-6 text-center space-y-4">
                <Heart className="w-10 h-10 mx-auto text-red-400" />
                <h4 className="text-lg font-bold text-forest">Stability</h4>
                <p className="text-xs text-slate-500">Unshakable mental calm and emotional resilience.</p>
            </div>
          </div>

          <section>
            <h2 className="text-3xl">Protecting Your Ojas</h2>
            <p>
              Ojas can be depleted by stress, overworking, lack of sleep, and violent emotions like anger or fear. Maintaining Ojas requires a lifestyle of moderation, deep rest, and the consumption of "Ojas-building" foods like dates, almonds, and pure ghee.
            </p>
          </section>

          <div className="py-12 border-y border-slate-100">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#f0f9f0] p-10 rounded-[2.5rem] border border-emerald-100 text-center shadow-xl shadow-emerald-100/50">
                <h4 className="text-3xl font-black mb-4 text-forest italic">Is Your Ojas Depleted?</h4>
                <p className="text-slate-600 mb-8 font-medium">Use our Ojas score to track how your lifestyle impacts your core vitality.</p>
                <Link href="/login" className="inline-flex items-center gap-3 bg-forest text-white px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all hover:bg-forest/90">
                    Calculate Your Ojas <ArrowRight className="w-5 h-5" />
                </Link>
            </motion.div>
          </div>
        </div>
      </article>
    </div>
  );
}
