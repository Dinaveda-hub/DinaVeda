"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sun, Coffee, Moon, CheckCircle2, Info, Activity, Shield, Sparkles, Zap, Clock, Bird, Sunrise } from "lucide-react";
import { motion } from "framer-motion";

const REVIEWER_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dr. Rahul K R",
  "jobTitle": "Ayurvedic Physician",
  "affiliation": {
    "@type": "Organization",
    "name": "Dinaveda"
  }
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Guide",
      "item": "https://www.dinaveda.com/guide"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Dinacharya",
      "item": "https://www.dinaveda.com/guide/dinacharya"
    }
  ]
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Dinacharya: The Ayurvedic Science of Daily Routine",
  "description": "Master Dinacharya—the practice of aligning life with natural circadian rhythms to optimize metabolism, mental clarity, and long-term vitality.",
  "lastReviewed": "2026-03-13",
  "reviewedBy": REVIEWER_JSON_LD,
  "breadcrumb": BREADCRUMB_JSON_LD,
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Dinacharya?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dinacharya is the Ayurvedic practice of a daily routine aligned with the natural rhythms of the sun. It is designed to maintain biological balance and prevent the accumulation of Ama."
        }
      },
      {
        "@type": "Question",
        "name": "What time is Brahma Muhurta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Brahma Muhurta is roughly 1 hour and 36 minutes before sunrise. Waking during this time is considered ideal for mental clarity and spiritual practice."
        }
      },
      {
        "@type": "Question",
        "name": "Why is the midday meal the most important?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Midday is when the sun is at its peak, and our internal Agni (digestive fire) is also at its strongest capacity to process food."
        }
      }
    ]
  }
};

export default function DinacharyaPage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(REVIEWER_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      
      {/* Top Nav */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/guide" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-forest transition-all">
          <ArrowLeft className="w-3 h-3" /> Back to Knowledge Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">Dinaveda</Link>
        <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1">
          Assessment
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Dinacharya: Mastering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-orange-400">
              The Daily Cycle
            </span>
          </h1>

          {/* Medical Reviewer Block */}
          <div className="flex items-center gap-4 mt-6">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
              DR
            </div>
            <div>
              <p className="text-xs font-bold text-forest">
                Reviewed by Dr. Rahul K R, BAMS
              </p>
              <p className="text-[10px] text-slate-400">
                Ayurvedic Physician • Last updated March 2026
              </p>
            </div>
          </div>

          <div className="mt-12 h-px bg-slate-100" />

          {/* Intro Section */}
          <div className="mt-12 space-y-6">
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              In Ayurveda, <strong>Dinacharya</strong> is the science of daily habits. It is the understanding that our biology is not static, but a dynamic rhythm that must be synchronized with the sun and moon to maintain health.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              Modern science calls this circadian rhythm medicine. Ayurveda calls it the key to longevity. By aligning your movement, nutrition, and rest with the Dosha cycles of the day, you prevent the accumulation of <Link href="/guide/ama" className="text-forest underline">Ama</Link> and protect your <Link href="/guide/ojas" className="text-forest underline">Ojas</Link>.
            </p>
          </div>
        </motion.header>

        <section className="space-y-24">
          {/* Key Principle Box */}
          <div className="p-10 md:p-16 bg-white rounded-[4rem] border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] opacity-50 pointer-events-none -mr-20" />
             <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-20 h-20 rounded-3xl bg-gold/5 flex items-center justify-center shrink-0">
                  <Clock className="w-10 h-10 text-gold" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-forest tracking-tight uppercase">Biological Synchronization</h2>
                  <p className="text-slate-600 font-medium leading-relaxed italic">
                    "A daily routine is our strongest medicine. It anchors the nervous system and allows the body to shift from survival mode to thriving mode."
                  </p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">— Ashtanga Hridaya</p>
                </div>
             </div>
          </div>

          {/* The Dosha Cycles Section */}
          <div className="space-y-12">
            <h2 className="text-3xl font-black text-forest tracking-tight">The 24-Hour Dosha Clock</h2>
            <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
              Ayurveda divides the day into six 4-hour windows. Each window is dominated by a specific energy that influences your physical and mental capacity.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { time: "6 AM – 10 AM", dosha: "Kapha", desc: "Energy of stability and structure. Ideal for physical movement and grounding the system for the day." },
                { time: "10 AM – 2 PM", dosha: "Pitta", desc: "Energy of transformation. Peak Agni (Digestive Fire). This is when the largest meal must be consumed." },
                { time: "2 PM – 6 PM", dosha: "Vata", desc: "Energy of movement and communication. High mental activity, creativity, and spiritual perception." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-black text-forest text-lg">{item.time}</h4>
                  <p className="text-[10px] font-black uppercase text-gold tracking-widest">{item.dosha} Phase</p>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
            
            {/* Night Cycles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60">
              {[
                { time: "6 PM – 10 PM", dosha: "Kapha", desc: "Winding down. Digestion slows. Ideal for light activity and preparation for deep rest." },
                { time: "10 PM – 2 AM", dosha: "Pitta", desc: "Internal transformation. The liver and tissues focus on biological repair and Ama clearing." },
                { time: "2 AM – 6 AM", dosha: "Vata", desc: "The Subtle Window. High spiritual energy. The best time for meditation and thin sleep." }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200/50 space-y-4">
                  <h4 className="font-black text-forest text-lg">{item.time}</h4>
                  <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{item.dosha} Phase</p>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Essential Rituals Section */}
          <div className="bg-gold/5 p-12 md:p-20 rounded-[4rem] border border-gold/10 relative overflow-hidden">
            <div className="max-w-3xl space-y-8 relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter">Essential Daily Rituals</h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                These foundational habits are designed to clear toxins and awaken biological intelligence every morning.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                {[
                  { name: "Brahma Muhurta", icon: Sunrise, desc: "Waking before sunrise captures the clarity of Vata and prepares the mind for deep focus." },
                  { name: "Jihwa Prakshalana", icon: CheckCircle2, desc: "Tongue scraping removes the Ama that has surfaced in the mouth during the night." },
                  { name: "Abhyanga", icon: Sparkles, desc: "Self-oil massage calms the nervous system and strengthens the skin's barrier (Ojas)." },
                  { name: "Gandusha", icon: Shield, desc: "Oil pulling clears the sensory channels and supports oral and systemic health." }
                ].map((ritual, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <ritual.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-black text-forest">{ritual.name}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{ritual.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connected Symptoms Section */}
          <div className="space-y-12">
             <div className="max-w-2xl space-y-6">
                <h2 className="text-3xl font-black text-forest tracking-tight">Symptoms of Rhythm Mismatch</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                   When your daily routine clashing with natural cycles, these symptoms often manifest as early warnings of biological stress.
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Metabolic Mismatch", items: [{name: "Bloating", slug: "bloating"}, {name: "Weight Gain", slug: "weight-gain"}] },
                  { title: "Neural Mismatch", items: [{name: "Insomnia", slug: "insomnia"}, {name: "Anxiety", slug: "anxiety"}] }
                ].map((group, i) => (
                  <div key={i} className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm space-y-6 transition-all hover:border-gold/20">
                    <h4 className="font-black text-gold uppercase tracking-widest text-[10px]">{group.title}</h4>
                    <div className="space-y-3">
                      {group.items.map((item, j) => (
                        <Link key={j} href={`/health/${item.slug}`} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-forest hover:text-white transition-all">
                          <span className="text-sm font-black tracking-tight">{item.name}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Closing Section */}
          <div className="space-y-12 border-t border-slate-100 pt-12">
            <h2 className="text-2xl font-black text-forest tracking-tight">The Foundation of Health</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/guide/agni" className="p-8 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition group flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Internal Engine</p>
                  <p className="text-xl font-black text-forest">Agni: Digestive Fire</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-forest transition-all" />
              </Link>
              <Link href="/guide/doshas" className="p-8 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition group flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Biological Blueprint</p>
                  <p className="text-xl font-black text-forest">Doshas: Energetic Balance</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-forest transition-all" />
              </Link>
            </div>
          </div>

          {/* Final CTA */}
          <div className="space-y-12">
            <div className="bg-slate-900 p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold blur-[100px] opacity-10 pointer-events-none -mr-20" />
              <motion.h3 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
              >
                Sync Your Biology
              </motion.h3>
              <p className="text-slate-400 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
                Dinaveda's real-time circadian tracker shows you exactly how to adjust your habits for peak metabolic performance.
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-3 bg-gold text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Sync Your Rhythm <ArrowRight className="w-5 h-5" />
              </Link>
              
              <div className="mt-16 pt-8 border-t border-white/10 text-[10px] font-medium text-slate-500 text-center uppercase tracking-[0.2em] leading-relaxed max-w-2xl mx-auto">
                Educational Disclaimer: This content provides educational insights into Ayurvedic physiology. It does not replace professional medical diagnosis or treatment. Always consult a healthcare professional for medical concerns.
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
