"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Scale, AlertCircle, Flame, Droplets, Zap, Shield, Activity } from "lucide-react";
import { motion } from "framer-motion";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ayurvedic Perspective on Weight Gain: Causes and Metabolic Reset",
  "description": "Struggling with stubborn weight? Learn the Ayurvedic perspective on weight gain. Understand how Kapha and weak Agni contribute to metabolic slows and how to reset naturally.",
  "about": [
    { "@type": "Thing", "name": "Weight Gain" },
    { "@type": "Thing", "name": "Kapha" },
    { "@type": "Thing", "name": "Ayurveda" }
  ],
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is it harder for some people to lose weight according to Ayurveda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each person has a unique metabolic constitution. Those with a 'Kapha' dominance naturally have a slower metabolism ('Manda Agni') and more robust storage capacity. Weight management for these types requires stoking the internal fire rather than just reducing calories."
        }
      },
      {
        "@type": "Question",
        "name": "Can spices actually help with weight loss?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Pungent spices like black pepper, ginger, and chili help 'liquify' the heavy Earth and Water elements (Kapha) and increase the rate of fat metabolism by stimulating 'Agni'."
        }
      }
    ]
  }
};

export default function WeightGainPage() {
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest mb-8">
            Metabolic Balance
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Stubborn <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              Weight Gain?
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Ayurveda views weight as a balance of stability vs. transformation. If you're accumulating, your internal fire is being smothered.
          </p>
        </motion.header>

        <section className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Earth & Water Window</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Weight gain is typically an increase in the <strong>Kapha</strong> dosha—the elements of Earth and Water. When these elements dominate without the "wind" of movement or the "fire" of transformation, the body enters a storage-only state.
              </p>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Counting calories ignores <strong>Metabolic Intelligence</strong>. 100 calories of cold food suppresses fire more than 200 calories of warm, spiced food.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-premium">
              <Scale className="w-12 h-12 text-amber-500 mb-6" />
              <h3 className="text-xl font-black text-forest mb-4">The Agni Mismatch</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Stubborn weight is often just <strong>Manda Agni</strong> (slow fire). Your body isn't burning fuel effectively, so it converts everything to <strong>Meda Dhatu</strong> (fat tissue) to protect itself from cold and stress.
              </p>
              <Link href="/guide/doshas" className="text-xs font-black text-forest uppercase tracking-widest block pt-4">Learn about Kapha →</Link>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center">The Reset Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Bitter & Pungent", icon: Zap, desc: "Incorporate spices like ginger and black pepper to 'stoke' the fire." },
                { title: "Dry Warmth", icon: Flame, desc: "Avoid damp, cold environments. Sauna and dry movement help liquify fat." },
                { title: "The 12-Hour Gap", icon: Shield, desc: "Allowing a full 12-hour fast overnight ensures Ama (toxins) are cleared." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 text-center shadow-sm">
                   <item.icon className="w-10 h-10 text-amber-500 mx-auto mb-6" />
                   <h4 className="font-black text-forest mb-2">{item.title}</h4>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* New Educational Content */}
          <div className="space-y-12 py-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Physiology of Accumulation (Meda Dhatu)</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
                <p>
                  In the Ayurvedic biological map, fat is known as <strong>Meda Dhatu</strong>. 
                  Healthy fat provides insulation, protection, and endurance. However, when 
                  your metabolic fire (Agni) is weak, the nourishment from your food is 
                  converted into poor-quality Meda Dhatu that accumulates excessively, 
                  especially in the abdominal and limb regions.
                </p>
                <p>
                  This weight is often "sticky"—held in place by <strong>Ama</strong> (unprocessed 
                  waste). To lose weight effectively and permanently, you must not only 
                  reduce intake but also "scrape" (Lekhana) the toxins and sluggishness 
                  from the tissues.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">Waking Up the Fire</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  For persistent weight gain, the focus must be on introducing "Hot" 
                  and "Dry" qualities. Morning movement is critical because it 
                  liquidizes the stagnant Kapha element after the night's rest. 
                  Consuming bitter greens at the start of meals acts as a 
                  physiological signal to the liver to begin the 'burning' 
                  cycle rather than the 'storage' cycle.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">The Water Principle</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Contrary to modern advice, excessive cold water can actually 
                  increase weight gain in Kapha-dominant individuals by 
                  extinguishing the metabolic fire. Sipping warm water or 
                  herb tea throughout the day helps mobilize lymph and 
                  prevents the "water retention" that contributes to a 
                  feeling of overall heaviness.
                </p>
              </div>
            </div>
          </div>

          {/* New FAQ/Safety Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
            <div className="p-10 rounded-[3.5rem] bg-amber-50/50 border border-amber-100 space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Metabolic Guidance</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Ayurvedic weight management focuses on biological rhythm. 
                Sudden or extreme changes in weight can be signs of more 
                complex medical conditions.
              </p>
              <p className="text-sm text-slate-600 font-bold leading-relaxed underline underline-offset-4 decoration-amber-200">
                You should consult a healthcare professional for sudden 
                unexplained weight gain, signs of edema (swelling) in the 
                lower limbs, or if you suspect hormonal imbalances like 
                PCOS or Thyroid dysfunction.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Common Questions</h3>
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Can oil massage help lose weight?</h4>
                  <p className="text-xs text-slate-500 font-medium">Yes, but only if using specialized 'dry' powders (Udvartana) or light oils. This stimulates lymphatic drainage and breaks down stagnant Kapha underneath the skin.</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Should I skip breakfast?</h4>
                  <p className="text-xs text-slate-500 font-medium">For Kapha-dominant weight gain, skipping a heavy breakfast and waiting until your fire is truly peaked (around 11 AM) is often very beneficial.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Author Authority & Update Info */}
          <div className="flex items-center gap-4 mb-8 pt-6 border-t border-slate-100">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-xs">
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
              Reset Your <br /> Metabolism
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Dinaveda determines if your weight gain is hormonal, emotional, or metabolic through your daily rhythm data.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Start My Reset <Activity className="w-5 h-5" />
            </Link>

            {/* Medical Disclaimer */}
            <div className="mt-16 pt-8 border-t border-white/10 uppercase tracking-widest text-[9px] font-bold text-emerald-100/30 text-center">
              Disclaimer: Ayurvedic educational insights. Not a medical weight loss program. Consult a doctor for hormonal or metabolic disorders.
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
