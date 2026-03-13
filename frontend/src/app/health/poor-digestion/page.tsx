"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Thermometer, Flame, AlertCircle, Sparkles, CheckCircle2, Shield, Activity } from "lucide-react";
import { motion } from "framer-motion";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ayurvedic Perspective on Poor Digestion: Causes and Fixes",
  "description": "Struggling with slow or irregular digestion? Learn how Agni (digestive fire) affects your health and discover Ayurvedic tips to optimize your metabolism.",
  "about": [
    { "@type": "Thing", "name": "Digestion" },
    { "@type": "Thing", "name": "Agni" },
    { "@type": "Thing", "name": "Ayurveda" }
  ],
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is digestion so important in Ayurveda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Ayurveda, digestion ('Agni') is the foundation of all health. It determines how well you absorb nutrients and how effectively your body clears metabolic waste. Poor Agni is considered the root cause of most physiological imbalances."
        }
      },
      {
        "@type": "Question",
        "name": "How can I improve my digestion naturally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Improving digestion involves stoking your 'Agni' through habits like eating at consistent times, choosing warm/cooked foods over raw/cold ones, and using warming spices like ginger, cumin, and fennel."
        }
      }
    ]
  }
};

export default function PoorDigestionPage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/health" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-forest transition-all">
          <ArrowLeft className="w-4 h-4" /> Symptom Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">Dinaveda</Link>
        <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1">Assessment</Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-8">
            Metabolic Foundation
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Struggling With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              Poor Digestion?
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            In Ayurveda, you aren't what you eat—you are what you digest. If your Agni is flickering, your health is at risk.
          </p>
        </motion.header>

        <section className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Engine of Life</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Digestion is more than breaking down food; it's the process of turning the outside world into <strong>YOU</strong>. When this process is compromised, it creates a cascade of fatigue, skin issues, and mental cloudiness.
              </p>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4">
                <AlertCircle className="w-5 h-5 text-orange-400 shrink-0" />
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Poor digestion is the "Mother of all Diseases" in Ayurvedic texts. It's where 90% of imbalances begin.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-premium">
              <Flame className="w-12 h-12 text-orange-500 mb-6" />
              <h3 className="text-xl font-black text-forest mb-4">The Agni Principle</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                <strong>Agni</strong> is your biological fire. It must be steady—not too high (creates acidity) and not too low (creates heaviness). Most people suffer from "irregular" fire caused by inconsistent habits.
              </p>
              <Link href="/guide/agni" className="text-xs font-black text-forest uppercase tracking-widest block pt-4">Explore Agni →</Link>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center">Optimization Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Ginger Ignition", icon: Sparkles, desc: "A thin slice of ginger with salt 15 mins before meals primes your Agni." },
                { title: "Liquid Hierarchy", icon: Shield, desc: "Avoid drinking iced water with food. Sip small amounts of room-temp water." },
                { title: "Posture Matters", icon: Activity, desc: "Sit tall while eating. Compression of the gut limits enzymatic flow." },
                { title: "The 70% Rule", icon: CheckCircle2, desc: "Leave 1/4 of your stomach empty to allow the 'churning' of digestion." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm">
                   <item.icon className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                   <div>
                     <h4 className="font-black text-forest mb-2">{item.title}</h4>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Educational Content */}
          <div className="space-y-12 py-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Four Types of Agni (Digestive Fire)</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
                <p>
                  To fix poor digestion, you must first identify the state of your 
                  biological fire. Ayurveda describes four specific states of 
                  <strong>Agni</strong>:
                </p>
                <ul className="space-y-4 pt-2">
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <p><strong>Sama Agni (Ideal):</strong> Strong, steady fire that digests meals efficiently without symptoms.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <p><strong>Vishama Agni (Irregular):</strong> Flickering fire, common in Vata types. Causes bloating, gas, and unpredictable appetite.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                    <p><strong>Tikshna Agni (Hyperactive):</strong> Too hot, common in Pitta types. Causes acidity, heartburn, and urgent hunger.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <p><strong>Manda Agni (Sluggish):</strong> Too slow, common in Kapha types. Causes heaviness, mucus, and a lack of appetite.</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">Food as Transformation</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Digestion is the most energy-intensive process in the body. When you 
                  eat, you are performing a biological sacrifice—transforming external 
                  matter into your own tissue. If your Agni is weak, this transformation 
                  is incomplete, resulting in <strong>Ama</strong> (unrefined toxins) 
                  that eventually manifests as disease in other parts of the body.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">The Power of "Dipana"</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  In Ayurveda, "Dipana" refers to the action of stoking the fire. 
                  Simple tools like drinking warm water, using spices like black pepper 
                  and cumin, and eating in a state of emotional peace are all 
                  powerful Dipana therapies that restore your natural metabolic 
                  strength.
                </p>
              </div>
            </div>
          </div>

          {/* New FAQ/Safety Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
            <div className="p-10 rounded-[3.5rem] bg-emerald-50/50 border border-emerald-100 space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Metabolic Safety</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Ayurvedic digestive care is designed for long-term metabolic stability. 
                However, internal symptoms can mirror serious structural issues.
              </p>
              <p className="text-sm text-slate-600 font-bold leading-relaxed underline underline-offset-4 decoration-emerald-200">
                You should consult a healthcare professional for persistent abdominal 
                pain, chronic constipation or diarrhea, unintended weight loss, or 
                difficulty swallowing.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Common Questions</h3>
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Can I fix my digestion if it's been bad for years?</h4>
                  <p className="text-xs text-slate-500 font-medium">Yes. Agni is dynamic. By slowly retraining your biology with consistent habits and 'Agni-kindling' herbs, you can restore efficiency even after years of imbalance.</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Is raw food better for digestion?</h4>
                  <p className="text-xs text-slate-500 font-medium">In Ayurveda, no. Raw food is 'cold' and requires significant fire to transform. For those with poor digestion, cooked food is much easier on the system.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Author Authority & Update Info */}
          <div className="flex items-center gap-4 mb-8 pt-6 border-t border-slate-100">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xs">
              DA
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Reviewed By</p>
              <p className="text-xs font-bold text-forest">Dinaveda Editorial Team</p>
              <p className="text-[10px] text-slate-400 font-medium">Last updated: March 2024 • Medical Review</p>
            </div>
          </div>

          <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
            >
              Analyze Your <br /> Metabolic State
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Dinaveda's engine calculates your Agni strength based on appetite, tongue, and energy patterns.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Start My Analysis <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Medical Disclaimer */}
            <div className="mt-16 pt-8 border-t border-white/10 uppercase tracking-widest text-[9px] font-bold text-emerald-100/30 text-center">
              Disclaimer: Ayurvedic educational insights. Not a medical diagnosis. Consult a professional for severe GI issues.
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
