"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Wind, Flame, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import TopicHubFooter from "@/components/TopicHubFooter";

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "The Three Doshas Explained: Vata, Pitta, Kapha",
  "description": "Learn about the three Ayurvedic Doshas—Vata, Pitta, and Kapha—and how they govern your physical and mental health.",
  "about": [
    { "@type": "Thing", "name": "Vata" },
    { "@type": "Thing", "name": "Pitta" },
    { "@type": "Thing", "name": "Kapha" }
  ]
};

export default function DoshasPage() {
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
            The Three Doshas Explained: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">Vata, Pitta, Kapha</span>
          </h1>
          <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest border-l-4 border-emerald-500 pl-6 py-2">
            <span>Fundamental Principles</span>
            <span>•</span>
            <span>1200 Words</span>
          </div>
        </header>

        <div className="prose prose-slate prose-headings:text-forest prose-headings:font-black prose-strong:text-forest mt-12 space-y-12 text-lg text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-3xl">What are Doshas?</h2>
            <p>
              In Ayurveda, the three doshas—Vata, Pitta, and Kapha—are biological energies found throughout the human body and mind. They govern all physical and mental processes and provide every living being with a unique blueprint for health and fulfillment.
            </p>
            <p>
              Derived from the Five Great Elements (Mahabhutas), the doshas are dynamic forces. Their balance determines your <strong>Prakriti</strong> (constitution), while their imbalance leads to <strong>Vikriti</strong> (disease).
            </p>
          </section>

          <section className="p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100">
            <div className="flex items-center gap-4 mb-6">
                <Wind className="w-10 h-10 text-indigo-500" />
                <h3 className="text-2xl m-0">Vata: The Force of Movement</h3>
            </div>
            <p className="text-sm font-medium">
                Vata is composed of <strong>Space and Air</strong>. It is the energy that governs biological movement, including breathing, blinking, muscle and tissue movement, and the pulsations of the heart.
            </p>
            <ul className="text-sm mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 uppercase tracking-tight font-black text-indigo-600/60">
                <li className="flex items-center gap-2">💨 Governs Nervous System</li>
                <li className="flex items-center gap-2">💨 Cold & Light Quality</li>
                <li className="flex items-center gap-2">💨 Creative Energy</li>
                <li className="flex items-center gap-2">💨 Located in Colon</li>
            </ul>
          </section>

          <section className="p-8 bg-orange-50/50 rounded-3xl border border-orange-100">
            <div className="flex items-center gap-4 mb-6">
                <Flame className="w-10 h-10 text-orange-500" />
                <h3 className="text-2xl m-0">Pitta: The Force of Transformation</h3>
            </div>
            <p className="text-sm font-medium">
                Pitta is composed of <strong>Fire and Water</strong>. It is the energy that governs metabolism, digestion, and the transformation of energy into consciousness.
            </p>
            <ul className="text-sm mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 uppercase tracking-tight font-black text-orange-600/60">
                <li className="flex items-center gap-2">🔥 Governs Metabolism</li>
                <li className="flex items-center gap-2">🔥 Hot & Sharp Quality</li>
                <li className="flex items-center gap-2">🔥 Intellect & Courage</li>
                <li className="flex items-center gap-2">🔥 Located in Small Intestine</li>
            </ul>
          </section>

          <section className="p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100">
            <div className="flex items-center gap-4 mb-6">
                <Droplets className="w-10 h-10 text-emerald-500" />
                <h3 className="text-2xl m-0">Kapha: The Force of Cohesion</h3>
            </div>
            <p className="text-sm font-medium">
                Kapha is composed of <strong>Earth and Water</strong>. It is the energy that governs physical structure, stability, and the lubrication of the body.
            </p>
            <ul className="text-sm mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 uppercase tracking-tight font-black text-emerald-600/60">
                <li className="flex items-center gap-2">💧 Governs Structure</li>
                <li className="flex items-center gap-2">💧 Heavy & Slow Quality</li>
                <li className="flex items-center gap-2">💧 Endurance & Calm</li>
                <li className="flex items-center gap-2">💧 Located in Chest</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl">Finding Your Balance</h2>
            <p>
              Most people have a primary dosha, or a combination of two. Understanding your dominant energy is the first step toward personalized health. 
              If you feel anxious, Vata might be high. If you feel irritable, Pitta might be surging. If you feel lethargic, Kapha is likely accumulated.
            </p>
          </section>

          <div className="py-12 border-y border-slate-100">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-forest p-10 rounded-[2.5rem] text-white text-center shadow-2xl shadow-forest/20">
                <h4 className="text-3xl font-black mb-4">Discover Your Dominant Doshas</h4>
                <p className="text-emerald-100/80 mb-8 font-medium">Our clinical assessment uses AI to map your current physiological state to your original Prakriti.</p>
                <Link href="/login" className="inline-flex items-center gap-3 bg-white text-forest px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all hover:bg-emerald-50">
                    Get Your Assessment <ArrowRight className="w-5 h-5" />
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
