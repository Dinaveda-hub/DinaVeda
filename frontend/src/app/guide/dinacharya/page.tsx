"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sun, Coffee, Moon } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import TopicHubFooter from "@/components/TopicHubFooter";

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Dinacharya: The Ayurvedic Daily Routine for Peak Health",
  "description": "Master Dinacharya—the science of daily habits aligned with the sun's cycle to optimize biological repair and energy.",
  "about": [
    { "@type": "Thing", "name": "Dinacharya" },
    { "@type": "Thing", "name": "Daily Routine" }
  ]
};

export default function DinacharyaPage() {
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
            Dinacharya: Mastering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-orange-400">The Daily Cycle</span>
          </h1>
          <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest border-l-4 border-gold pl-6 py-2">
            <span>Biological Rhythms</span>
            <span>•</span>
            <span>1300 Words</span>
          </div>
        </header>

        <div className="prose prose-slate prose-headings:text-forest prose-headings:font-black prose-strong:text-forest mt-12 space-y-12 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-3xl">What is Dinacharya?</h2>
            <p>
              In Ayurveda, <strong>Dinacharya</strong> is the practice of aligning your daily routine with the cycles of nature. Modern science calls this circadian medicine, but Ayurveda has practiced it for millennia. By syncing your actions with the sun's position, you minimize biological resistance and maximize health.
            </p>
          </section>

          <div className="space-y-6 my-16">
            <div className="flex gap-6 p-8 rounded-3xl bg-emerald-50 border border-emerald-100 items-start">
               <Sun className="w-10 h-10 text-emerald-500 shrink-0" />
               <div>
                  <h4 className="text-lg font-bold text-forest uppercase tracking-widest mb-2">Morning Protocol</h4>
                  <p className="text-sm text-slate-500">Waking before sunrise (Brahma Muhurta) to capture the pure Sattvic energy that clears the mind.</p>
               </div>
            </div>
            <div className="flex gap-6 p-8 rounded-3xl bg-orange-50 border border-orange-100 items-start">
               <Coffee className="w-10 h-10 text-orange-500 shrink-0" />
               <div>
                  <h4 className="text-lg font-bold text-forest uppercase tracking-widest mb-2">Midday Focus</h4>
                  <p className="text-sm text-slate-500">The sun is at its peak, and so is your digestive fire (Agni). This is the time for your largest meal.</p>
               </div>
            </div>
            <div className="flex gap-6 p-8 rounded-3xl bg-indigo-50 border border-indigo-100 items-start">
               <Moon className="w-10 h-10 text-indigo-500 shrink-0" />
               <div>
                  <h4 className="text-lg font-bold text-forest uppercase tracking-widest mb-2">Evening Rest</h4>
                  <p className="text-sm text-slate-500">Slowing down at sunset to prepare for deep biological repair window (10 PM - 2 AM).</p>
               </div>
            </div>
          </div>

          <section>
            <h2 className="text-3xl">The Logic of Timing</h2>
            <p>
              Ayurveda divides the 24-hour day into 4-hour segments governed by the doshas. 6–10 is Kapha time (stability), 10–2 is Pitta time (transformation), and 2–6 is Vata time (movement). By understanding these windows, you can plan your work, meals, and sleep for maximum efficiency.
            </p>
          </section>

          <div className="py-12 border-y border-slate-100">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-forest p-10 rounded-[2.5rem] text-white text-center shadow-2xl">
                <h4 className="text-3xl font-black mb-4">Are You Out of Sync?</h4>
                <p className="text-emerald-100/70 mb-8 font-medium italic">Our real-time circadian tracker shows you exactly where your habits are clashing with your biology.</p>
                <Link href="/login" className="inline-flex items-center gap-3 bg-white text-forest px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all hover:bg-emerald-50">
                    Sync Your Rhythm <ArrowRight className="w-5 h-5" />
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
