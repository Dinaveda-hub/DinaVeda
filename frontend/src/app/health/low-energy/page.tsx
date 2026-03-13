"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Battery, Sparkles, AlertCircle, Coffee, Moon, Shield } from "lucide-react";
import { motion } from "framer-motion";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Why Do I Feel Tired All The Time? Ayurvedic Explanation of Chronic Fatigue",
  "description": "Learn the Ayurvedic perspective on low energy and fatigue. Understand how low Ojas and Ama accumulation drain your vitality and how to restore it.",
  "about": [
    { "@type": "Thing", "name": "Fatigue" },
    { "@type": "Thing", "name": "Ojas" },
    { "@type": "Thing", "name": "Ayurveda" }
  ],
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Ayurveda define chronic fatigue?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ayurveda views fatigue either as an exhaustion of vital energy ('Low Ojas') or as a blockage of energy channels by toxins ('High Ama'). Identifying which type you have is the first step to recovery."
        }
      },
      {
        "@type": "Question",
        "name": "Can certain foods boost my energy in Ayurveda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. If you are depleted, 'Ojas-building' foods like dates, almonds, ghee, and sweet potatoes are recommended. If you are blocked, 'Agni-kindling' spices like ginger and black pepper are more effective."
        }
      }
    ]
  }
};

export default function LowEnergyPage() {
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-8">
            Vitality & Metabolism
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Why Am I Tired <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              All The Time?
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Fatigue is rarely just about sleep. It's often about how your body manages Ojas—the essence of your reserve energy.
          </p>
        </motion.header>

        <section className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Vitality Gap</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Modern fatigue is often driven by "leaking" energy through chronic stress and poor metabolic clearance. Caffeine treats the symptom, but Ayurveda treats the container.
              </p>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="font-black text-forest mb-2 flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-orange-400" /> Caffeine Debt
                </h4>
                <p className="text-xs text-slate-500 font-medium">Artificial stimulation masks the depletion of Ojas, leading to a biological crash that requires longer recovery times.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-premium">
              <Battery className="w-12 h-12 text-orange-500 mb-6" />
              <h3 className="text-xl font-black text-forest mb-4">The Ojas Principle</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                <strong>Ojas</strong> is the ultimate product of perfect digestion. When you feel tired despite "normal" labs, it's often because your energy essence (Ojas) is low or being blocked by metabolic waste (Ama).
              </p>
              <Link href="/guide/ojas" className="text-xs font-black text-forest uppercase tracking-widest block pt-4">Learn about Ojas →</Link>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center mb-12">Two Types of Fatigue</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-8 bg-orange-50/50 rounded-3xl border border-orange-100">
                <h4 className="text-xl font-black text-orange-600 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> Depletion Fatigue
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">You feel empty, dry, and brittle. Common in high-stress Vata types who over-work and under-rest. Ojas is depleted.</p>
                <div className="text-[10px] font-black uppercase text-orange-400 tracking-widest">Cause: Low Ojas</div>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Blockage Fatigue
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">You feel heavy, stiff, and foggy. Common when metabolic waste (Ama) clogs your body's energy channels. Ojas is blocked.</p>
                <div className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Cause: High Ama</div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Restoration Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Abhyanga", icon: Sparkles, desc: "Oil massage calms the nervous system and prevents Ojas leakage." },
                { title: "Sleep Windows", icon: Moon, desc: "Sleeping before 10PM (Kapha time) ensures biological repair." },
                { title: "Digestive rest", icon: AlertCircle, desc: "Stopping meals at 7PM prevents Ama build-up overnight." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center">
                   <item.icon className="w-10 h-10 text-orange-500 mx-auto mb-6" />
                   <h4 className="font-black text-forest mb-2">{item.title}</h4>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* New Educational Content */}
          <div className="space-y-12 py-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">Understanding Your Energy Reserve (Ojas)</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
                <p>
                  In Ayurvedic physiology, <strong>Ojas</strong> is the superfine essence of all 
                  bodily tissues and the direct result of perfect digestion. It is your 
                  biological "bank account" of energy. When Ojas is high, you feel resilient, 
                  patient, and vital. When it is low, even minor stressors can lead to 
                  overwhelming fatigue.
                </p>
                <p>
                  Modern life often "leaks" Ojas through excessive sensory stimulation, 
                  multitasking, and irregular eating. To regain energy, we must move from 
                  stimulation (caffeine) to nourishment (rebuilding the reserve).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">Rebuilding Vitality</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  To rebuild a depleted system, favor "Brimhana" or nourishing therapies. 
                  Foods like dates, almonds, cow's ghee, and warm milk with cardamom 
                  directly support the production of Ojas. These should be eaten in 
                  a calm environment to ensure the "Agni" (digestive fire) can 
                  properly transform them into vital essence.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">Clearing Energy Blockages</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  If your fatigue feels heavy and dull, you may have plenty of energy 
                  that is simply being blocked by <strong>Ama</strong> (metabolic toxins). 
                  In this case, nourishment will make you feel worse. You need 
                  "Shodhana" or clearing therapies—warm ginger water, bitter 
                  greens, and vigorous movement to "burn through" the fog.
                </p>
              </div>
            </div>
          </div>

          {/* New FAQ/Safety Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
            <div className="p-10 rounded-[3.5rem] bg-orange-50/50 border border-orange-100 space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">When Fatigue is Serious</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Ayurveda provides a roadmap for rebuilding natural vitality, but chronic 
                exhaustion can be a sign of underlying clinical conditions.
              </p>
              <p className="text-sm text-slate-600 font-bold leading-relaxed underline underline-offset-4 decoration-orange-200">
                Consult a medical professional if you experience sudden, unexplained 
                weight loss, night sweats, extreme muscle weakness, or if your 
                fatigue persists despite 2-3 weeks of rest and routine.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Common Questions</h3>
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Why am I tired after eating?</h4>
                  <p className="text-xs text-slate-500 font-medium">This is a primary sign of 'Manda Agni' (slow fire). Your body is diverting all its energy into trying to digest a meal that may be too heavy or cold for your system.</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Can exercise help low energy?</h4>
                  <p className="text-xs text-slate-500 font-medium">If your fatigue is 'blocked' (Kapha-based), vigorous exercise is a cure. If it is 'depleted' (Vata-based), heavy exercise can lead to further exhaustion.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Author Authority & Update Info */}
          <div className="flex items-center gap-4 mb-8 pt-6 border-t border-slate-100">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 font-bold text-xs">
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
              Check Your <br /> Vitality Core
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Dinaveda tracks your energy history to identify if you are depleted or just blocked.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Analyze My Energy <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Medical Disclaimer */}
            <div className="mt-16 pt-8 border-t border-white/10 uppercase tracking-widest text-[9px] font-bold text-emerald-100/30 text-center">
              Disclaimer: Ayurvedic educational insights. Not a medical diagnosis. Consult a professional for chronic fatigue or thyroid concerns.
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
