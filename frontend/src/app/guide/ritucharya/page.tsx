"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CloudRain, Snowflake, Sun } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import TopicHubFooter from "@/components/TopicHubFooter";

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ritucharya: The Ayurvedic Seasonal Protocol for Year-Round Health",
  "description": "Master Ritucharya—the science of adjusting your diet and lifestyle as the seasons change to prevent illness and maintain balance.",
  "about": [
    { "@type": "Thing", "name": "Ritucharya" },
    { "@type": "Thing", "name": "Seasonal Health" }
  ]
};

export default function RitucharyaPage() {
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
            Ritucharya: Living <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-600">With the Seasons</span>
          </h1>
          <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest border-l-4 border-emerald-500 pl-6 py-2">
            <span>Environmental Harmony</span>
            <span>•</span>
            <span>1200 Words</span>
          </div>
        </header>

        <div className="prose prose-slate prose-headings:text-forest prose-headings:font-black prose-strong:text-forest mt-12 space-y-12 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-3xl">What is Ritucharya?</h2>
            <p>
              In Ayurveda, <strong>Ritucharya</strong> consists of two words: 'Ritu' (season) and 'Charya' (protocol). It is the wisdom of adjusting our habits to maintain biological homeostasis as the environment fluctuates. Most illnesses—like allergies in spring or respiratory issues in winter—are simply failures to adapt to the changing seasons.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16 text-center">
            <div className="p-8 rounded-[2rem] bg-indigo-50 border border-indigo-100">
               <Snowflake className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
               <h4 className="text-lg font-bold text-forest mb-2">Winter</h4>
               <p className="text-xs text-slate-500">Vata accumulates. Focus on warm, heavy, oily foods and deep rest.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100">
               <CloudRain className="w-10 h-10 mx-auto text-emerald-500 mb-4" />
               <h4 className="text-lg font-bold text-forest mb-2">Spring</h4>
               <p className="text-xs text-slate-500">Kapha liquefies. Focus on light, dry, pungent foods and detoxification.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-orange-50 border border-orange-100">
               <Sun className="w-10 h-10 mx-auto text-orange-500 mb-4" />
               <h4 className="text-lg font-bold text-forest mb-2">Summer</h4>
               <p className="text-xs text-slate-500">Pitta surges. Focus on cool, hydrating foods and avoiding heat exhaustion.</p>
            </div>
          </div>

          <section>
            <h2 className="text-3xl">The Transition Period (Ritu Sandhi)</h2>
            <p>
              The most critical time is the 14-day window between seasons, known as <strong>Ritu Sandhi</strong>. This is when the previous season's habits must be gradually discarded and the new season's protocols adopted. Fluctuations in Agni are common during this phase, making it the most vulnerable time for the immune system.
            </p>
          </section>

          <div className="py-12 border-y border-slate-100">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-forest p-10 rounded-[2.5rem] text-white text-center shadow-2xl shadow-forest/20">
                <h4 className="text-3xl font-black mb-4">Adaptive Protocols</h4>
                <p className="text-emerald-100/70 mb-8 font-medium">Dinaveda automatically adjusts your wellness protocol as the local seasons shift.</p>
                <Link href="/login" className="inline-flex items-center gap-3 bg-white text-forest px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all hover:bg-emerald-50">
                    Get Your Seasonal Plan <ArrowRight className="w-5 h-5" />
                </Link>
            </motion.div>
          </div>
        </div>
      </article>

      <TopicHubFooter />
      <Footer />
    </div>
  );
}
