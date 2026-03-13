"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Activity, AlertCircle, Wind, Sparkles, Moon, Anchor, Zap } from "lucide-react";
import { motion } from "framer-motion";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ayurvedic Perspective on Anxiety: Causes and Natural Solutions",
  "description": "Understand anxiety through the lens of Vata imbalance. Learn how the air element affects your nervous system and Ayurvedic tips to find your center.",
  "about": [
    { "@type": "Thing", "name": "Anxiety" },
    { "@type": "Thing", "name": "Vata" },
    { "@type": "Thing", "name": "Ayurveda" }
  ],
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Ayurveda view anxiety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ayurveda views anxiety as a Vata disturbance—essentially too much 'air' and 'movement' in the nervous system. Treatment focuses on grounding, warmth, and steady routine."
        }
      },
      {
        "@type": "Question",
        "name": "Can diet help with anxiety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Grounding foods like root vegetables, warm stews, and healthy fats help stabilize the nervous system, whereas cold, dry, or caffeinated foods can worsen Vata-type anxiety."
        }
      }
    ]
  }
};

export default function AnxietyPage() {
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-8">
            Nervous System
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Why Do I Feel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
              So Anxious?
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Ayurveda views anxiety as "excess movement" in the nervous system—a Vata disturbance that requires grounding, warmth, and biological stability.
          </p>
        </motion.header>

        <section className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Air-Nerve Connection</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Anxiety is a state of "cold and mobile" energy. Your nervous system is reacting to <strong>Vata</strong> aggravation—irregular schedules, cold food, and excessive stimulation that "blows out" your biological pilot light.
              </p>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="font-black text-forest mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-indigo-400" /> Vata Symptoms
                </h4>
                <ul className="text-sm font-bold text-slate-500 space-y-2">
                  <li>• Racing thoughts and over-analysis</li>
                  <li>• Difficulty sitting still or focus shifts</li>
                  <li>• Restless sleep or sudden waking</li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-premium">
              <Wind className="w-12 h-12 text-indigo-500 mb-6" />
              <h3 className="text-xl font-black text-forest mb-4">The Stability Fix</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                To calm anxiety, Ayurveda uses the Law of Opposites. You need <strong>Heat, Weight, and Rhythm</strong>. By grounding the physical body, the mental Vata naturally subsides.
              </p>
              <Link href="/guide/doshas" className="text-xs font-black text-forest uppercase tracking-widest block pt-4">Learn about Vata →</Link>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center">Grounding Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Warm Oil", icon: Sparkles, desc: "Applying oil (Abhyanga) creates a protective 'shield' for the nerves." },
                { title: "Root Foods", icon: Anchor, desc: "Sweet potatoes and grains provide the 'Earth' element to ground the 'Air'." },
                { title: "Pranayama", icon: Zap, desc: "Nadi Shodhana (Alternate Nostril Breath) balances the left and right brain." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 text-center shadow-sm">
                   <item.icon className="w-10 h-10 text-indigo-500 mx-auto mb-6" />
                   <h4 className="font-black text-forest mb-2">{item.title}</h4>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* New Educational Content */}
          <div className="space-y-12 py-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Root Cause: Vata Aggravation</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
                <p>
                  In the Ayurvedic system, the mind and the body are inseparable. Anxiety is often 
                  the result of <strong>Vata</strong> (Air and Ether) moving too quickly through 
                  the nervous tissue (Majja Dhatu). When this happens, the mind becomes like a 
                  leaf in a storm—disconnected from its roots.
                </p>
                <p>
                  Modern triggers like constant digital notifications, irregular sleep, and 
                  high-pressure environments "fan the flames" of Vata, leading to the physical 
                  experience of anxiety, even when there is no immediate external threat.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">Diet for a Calm Mind</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  To stabilize a racing mind, you must eat foods that provide weight and warmth. 
                  Favor root vegetables, warm milk with nutmeg, and healthy fats like ghee. 
                  Limit dry crackers, raw salads, and stimulants like caffeine which further 
                  destabilize the nervous system.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">The Power of Routine</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Vata is the only dosha that is completely independent of the regular cycle 
                  of nature if left unchecked. Establishing a "Dinacharya" (daily routine) 
                  acts as a biological anchor, signaling to your brain that it is safe to 
                  downregulate the stress response.
                </p>
              </div>
            </div>
          </div>

          {/* New FAQ/Safety Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
            <div className="p-10 rounded-[3.5rem] bg-indigo-50/50 border border-indigo-100 space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Safety & Care</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Ayurvedic support for anxiety is designed to strengthen your underlying 
                resilience. However, it is not a replacement for clinical psychiatric care.
              </p>
              <p className="text-sm text-slate-600 font-bold leading-relaxed underline underline-offset-4 decoration-indigo-200">
                Seek professional help if you experience panic attacks, severe depression, 
                or if anxiety interferes with your basic ability to function.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Common Questions</h3>
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Can oil massage really help?</h4>
                  <p className="text-xs text-slate-500 font-medium">Yes. The skin is the seat of the nervous system. Warm oil application (Abhyanga) sends a direct signal of safety and 'weight' to the brain.</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">How quickly does it work?</h4>
                  <p className="text-xs text-slate-500 font-medium">Dietary grounding can show results in 48-72 hours, while nervous system stabilization takes consistent practice over 3-4 weeks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Author Authority & Update Info */}
          <div className="flex items-center gap-4 mb-8 pt-6 border-t border-slate-100">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
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
              Restore Your <br /> Internal Peace
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Dinaveda maps your Vata load in real-time and alerts you when your rhythm is becoming unstable.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Analyze My Stress <Activity className="w-5 h-5" />
            </Link>

            {/* Medical Disclaimer */}
            <div className="mt-16 pt-8 border-t border-white/10 uppercase tracking-widest text-[9px] font-bold text-emerald-100/30">
              Disclaimer: Not a substitute for medical advice. consult a professional for psychiatric concerns.
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
