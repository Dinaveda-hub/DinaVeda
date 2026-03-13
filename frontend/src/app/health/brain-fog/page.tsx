"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Brain, AlertCircle, Sparkles, Zap, Shield, Info, Activity } from "lucide-react";
import { motion } from "framer-motion";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Why Do I Have Brain Fog? Ayurvedic Explanation of Mental Cloudiness",
  "description": "Understand the Ayurvedic root cause of brain fog and mental cloudiness. Learn how Kapha and Ama affect cognitive clarity and how to clear your mind.",
  "about": [
    { "@type": "Thing", "name": "Brain Fog" },
    { "@type": "Thing", "name": "Kapha" },
    { "@type": "Thing", "name": "Ama" }
  ],
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What causes brain fog in Ayurveda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ayurveda attributes brain fog to 'Ama' (metabolic sludge) clogging the 'Srotas' (channels) of the mind. This is often driven by sluggish digestion or a Kapha imbalance."
        }
      },
      {
        "@type": "Question",
        "name": "Can tongue scraping help with brain fog?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Tongue scraping stimulates the brain-gut connection and helps remove oral Ama, which is a reflection of the toxic load in the digestive tract that contributes to mental cloudiness."
        }
      }
    ]
  }
};

export default function BrainFogPage() {
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
            Cognitive Clarity
          </span>
            <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
              Brain Fog Causes <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                Ayurvedic Explanation & Remedies
              </span>
            </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Brain fog isn't a medical condition; it's a symptom of metabolic "sludge" affecting your mental channels.
          </p>
        </motion.header>

        <section className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Mental Murk</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                When you feel cloudy, slow, or unable to focus, it's often because the heavy, stable quality of **Kapha** has become stagnant, or your body hasn't cleared the residue of yesterday’s digestion.
              </p>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4">
                <Info className="w-5 h-5 text-indigo-400 shrink-0" />
                <p className="text-xs text-slate-500 font-medium leading-relaxed">In Ayurveda, the mind and gut are physically connected via the <strong>Srotas</strong> (channels). Gut fog eventually becomes brain fog.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-premium">
              <Brain className="w-12 h-12 text-indigo-500 mb-6" />
              <h3 className="text-xl font-black text-forest mb-4">The Ama Accumulation</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                <strong>Ama</strong> (metabolic toxins) is sticky and heavy. When it accumulates in the nervous system, it acts like digital lag—slowing down processing speed and clouding clarity.
              </p>
              <Link href="/guide/ama" className="text-xs font-black text-forest uppercase tracking-widest block pt-4">Learn about Ama →</Link>
            </div>
          </div>

          {/* Brain Fog Symptoms */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Common Symptoms of Brain Fog
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed">
              Brain fog is not a disease but a pattern of cognitive sluggishness that
              affects focus, memory, and mental processing speed. In Ayurveda, these
              symptoms are often linked to Kapha heaviness and the accumulation of Ama
              within the channels of the head.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">Cognitive Symptoms</h4>
                <ul className="text-xs text-slate-600 font-medium space-y-2">
                  <li>• Difficulty concentrating</li>
                  <li>• Slow thinking or delayed processing</li>
                  <li>• Forgetfulness or memory lapses</li>
                  <li>• Trouble finding the right words</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">Associated Symptoms</h4>
                <ul className="text-xs text-slate-600 font-medium space-y-2">
                  <li>• Fatigue or low mental energy</li>
                  <li>• Head heaviness</li>
                  <li>• Reduced motivation</li>
                  <li>• Feeling mentally “cloudy”</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center">Clearing the Fog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Nasal Cleansing", icon: Shield, desc: "Nasya (herb-infused oil) clears the channels of the head directly." },
                { title: "Movement", icon: Activity, desc: "Vigorous morning movement 'liquifies' the heavy Kapha stagnation." },
                { title: "Sattva Diet", icon: Sparkles, desc: "Light, fresh, and slightly spiced foods prevent new Ama from forming." },
                { title: "Digital Fasting", icon: Zap, desc: "Reducing sensory input prevents overloading your Agni (mental fire)." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm">
                   <item.icon className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                   <div>
                     <h4 className="font-black text-forest mb-2">{item.title}</h4>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Causes of Brain Fog */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              What Causes Brain Fog?
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed">
              Brain fog often develops when the body’s metabolic processes slow down
              or become inefficient. In Ayurveda, this typically occurs when Ama
              accumulates and Kapha becomes excessive, creating heaviness within the
              channels of the head and nervous system.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">Digestive Causes</h4>
                <ul className="text-xs text-slate-600 font-medium space-y-2">
                  <li>• Weak digestion producing metabolic residue (Ama)</li>
                  <li>• Heavy or difficult-to-digest foods</li>
                  <li>• Poor gut health affecting nutrient absorption</li>
                  <li>• Irregular meal timing</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">Lifestyle Causes</h4>
                <ul className="text-xs text-slate-600 font-medium space-y-2">
                  <li>• Poor sleep quality</li>
                  <li>• Excessive screen exposure</li>
                  <li>• Sedentary lifestyle</li>
                  <li>• Chronic stress or mental overload</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Clear Brain Fog Naturally */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              How to Clear Brain Fog Naturally
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed">
              Restoring mental clarity requires reducing Ama while stimulating the
              body's natural metabolic intelligence. Ayurveda approaches brain fog
              by improving digestion, circulation, and nervous system balance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">
                  Improve Digestion
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Support Agni with warm foods, digestive spices, and consistent meal timing.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">
                  Increase Circulation
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Daily movement stimulates blood flow to the brain and helps clear metabolic waste.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">
                  Support Mental Rest
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Prioritize sleep and reduce sensory overload to allow the nervous system to reset.
                </p>
              </div>
            </div>
          </div>

          {/* New Educational Content */}
          <div className="space-y-12 py-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Gut-Brain Connection (Prana Vaha Srotas)</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
                <p>
                  In the Ayurvedic tradition, the mind is not an isolated processor; it is the 
                  endpoint of your metabolic health. The <strong>Prana Vaha Srotas</strong> (the 
                  channels that carry vital force) connect the breath, the heart, and the brain. 
                  When your digestion is sluggish, it creates <strong>Ama</strong>—a sticky, 
                  unrefined byproduct—that clogs these subtle channels.
                </p>
                <p>
                  Think of brain fog as "metabolic static." When the channels of the head are 
                  clear, Prana (life force) moves freely, allowing for sharp focus and quick 
                  recall. When they are obstructed by Ama, every thought requires more effort, 
                  leading to the sensation of mental cloudiness.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">Diet for Mental Sharpness</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  To clear mental sludge, favor "Sattvic" foods—light, fresh, and easily 
                  digested. Bitter greens, fresh ginger tea, and mung bean soups help 
                  scrape Ama from the tissues. Avoid heavy dairy, cold sweets, and large 
                  amounts of wheat, all of which increase the heavy Kapha element that 
                  contributes to cognitive dullness.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-forest tracking-tight">Stimulating the "Mental Fire"</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Just as you have Agni in your gut, you have <strong>Sadhaka Pitta</strong> in 
                  your heart and mind, which helps you "digest" information and emotions. 
                  To keep this fire bright, avoid multitasking and excessive screen time, 
                  which scatter mental energy and create "informational Ama" that leads to fog.
                </p>
              </div>
            </div>
          </div>

          {/* New FAQ/Safety Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
            <div className="p-10 rounded-[3.5rem] bg-indigo-50/50 border border-indigo-100 space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">When Focus Fails</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Occasional forgetfulness is natural, but chronic, debilitating brain fog 
                should be monitored closely.
              </p>
              <p className="text-sm text-slate-600 font-bold leading-relaxed underline underline-offset-4 decoration-indigo-200">
                Seek professional medical advice if brain fog is accompanied by sudden memory 
                loss, difficulty speaking, severe dizziness, or if it follows a head injury.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest tracking-tight">Common Questions</h3>
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Can caffeine clear brain fog?</h4>
                  <p className="text-xs text-slate-500 font-medium">Temporarily, yes. But excessive caffeine can 'burn out' Sadhaka Pitta, eventually leading to deeper fatigue and a more persistent return of the fog.</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-black text-forest mb-2">Does sleep affect Ama?</h4>
                  <p className="text-xs text-slate-500 font-medium">Crucially. Deep sleep is when the body activates its natural 'cleansing' mechanisms to remove metabolic residue from the brain tissue.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Symptoms */}
          <div className="space-y-8 pt-12 border-t border-slate-100">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Symptoms Often Linked to Brain Fog
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed">
              Cognitive cloudiness rarely appears alone. When metabolic waste (Ama)
              accumulates or digestion becomes sluggish, several other symptoms can
              develop alongside brain fog.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/health/poor-digestion"
                className="p-4 bg-white border border-slate-100 rounded-2xl text-center text-xs font-black text-forest hover:bg-slate-50 transition"
              >
                Poor Digestion
              </Link>

              <Link
                href="/health/low-energy"
                className="p-4 bg-white border border-slate-100 rounded-2xl text-center text-xs font-black text-forest hover:bg-slate-50 transition"
              >
                Low Energy
              </Link>

              <Link
                href="/health/anxiety"
                className="p-4 bg-white border border-slate-100 rounded-2xl text-center text-xs font-black text-forest hover:bg-slate-50 transition"
              >
                Anxiety
              </Link>

              <Link
                href="/health/insomnia"
                className="p-4 bg-white border border-slate-100 rounded-2xl text-center text-xs font-black text-forest hover:bg-slate-50 transition"
              >
                Insomnia
              </Link>
            </div>
          </div>

          {/* Improving Mental Clarity */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              How to Improve Mental Clarity Naturally
            </h2>

            <p className="text-slate-600 font-medium leading-relaxed">
              Restoring mental clarity involves supporting digestion, improving sleep
              quality, and reducing metabolic waste accumulation. In Ayurveda,
              maintaining strong digestion and balanced daily routines allows the
              nervous system to function with greater efficiency and focus.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">
                  Support Digestive Health
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Strong digestion reduces Ama formation and ensures nutrients reach
                  brain tissue effectively.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">
                  Optimize Sleep
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Deep sleep allows the brain to clear metabolic waste and restore
                  cognitive performance.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-forest mb-2 text-sm">
                  Reduce Sensory Overload
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Limiting constant stimulation helps the nervous system regain
                  stability and improve mental processing speed.
                </p>
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

          {/* Medical Review Information */}
          <div className="mt-12 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
            <h3 className="text-lg font-black text-forest mb-4">
              Medical & Ayurvedic Review
            </h3>

            <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
              This article was reviewed by Ayurvedic practitioners and wellness
              researchers with experience in digestive physiology and cognitive health.
              Dinaveda content combines classical Ayurvedic texts with modern
              understanding of metabolism, nervous system regulation, and lifestyle
              medicine.
            </p>

            <div className="text-xs text-slate-500 font-medium space-y-1">
              <p>Reviewed by: Ayurvedic Physician (BAMS)</p>
              <p>Specialty: Digestive Health & Cognitive Wellness</p>
              <p>Sources referenced: Charaka Samhita, Ashtanga Hridaya, modern gut-brain research</p>
            </div>
          </div>

          <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
            >
              Master Your <br /> Clarity
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Dinaveda tracks your cognitive energy and Ama risk to provide daily mental clearance rituals.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Analyze My Focus <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Medical Disclaimer */}
            <div className="mt-16 pt-8 border-t border-white/10 uppercase tracking-widest text-[9px] font-bold text-emerald-100/30 text-center">
              Disclaimer: Ayurvedic educational insights. Not a medical diagnosis. Consult a professional for cognitive health concerns.
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
