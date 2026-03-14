"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, AlertCircle, Sparkles, CheckCircle2, Activity, Compass, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { SYMPTOMS, DOSHAS } from "@/data";

interface SymptomClientProps {
  slug: string;
}

export default function SymptomClient({ slug }: SymptomClientProps) {
  const symptom = SYMPTOMS[slug];
  if (!symptom) return null;

  // Find related symptoms in the same cluster
  const relatedInCluster = Object.values(SYMPTOMS)
    .filter(s => s.cluster === symptom.cluster && s.id !== slug)
    .slice(0, 3);

  const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": `${symptom.name}: Ayurvedic Explanation & Causes | Dinaveda`,
    "description": symptom.summary,
    "lastReviewed": "2026-03-14",
    "reviewedBy": {
      "@type": "Person",
      "name": "Dr. Rahul K R",
      "jobTitle": "Ayurvedic Physician"
    }
  };

  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/health" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-forest transition-all">
          <ArrowLeft className="w-3 h-3" /> Back to Symptom Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">Dinaveda</Link>
        <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1">Assessment</Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-forest/5 text-forest text-[9px] font-black uppercase tracking-widest">
              Clinical Overview
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest">
              {symptom.cluster}
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            {symptom.name} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
              Ayurvedic Explanation
            </span>
          </h1>

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

          <div className="mt-12 space-y-6">
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              {symptom.name} is interpreted in Ayurveda as a physiological signal of internal imbalance. {symptom.summary}
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              {symptom.modernDesc} {symptom.ayuDesc}
            </p>
          </div>
        </motion.header>

        <section className="space-y-24">
          {/* Clinical Observation Section */}
          {symptom.signs && (
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-forest tracking-tight">Clinical Observations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-emerald-50/50 rounded-[3rem] border border-emerald-100">
                  <p className="text-slate-600 leading-relaxed font-medium mb-4">
                    Clinically, {symptom.name} rarely presents in isolation. We look for these associated signs to determine the depth of the physiological drift:
                  </p>
                  <ul className="space-y-3 text-sm font-bold text-slate-600">
                    {symptom.signs.map((sign, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {sign}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
                  <p>
                    These signs provide a roadmap to the underlying metabolic and regulatory state. In Ayurveda, we treat the pattern, not just the symptom.
                  </p>
                  <p>
                    Persistent imbalance in these areas can lead to the accumulation of Ama (metabolic residue) and further disruption of the body's natural rhythms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Interpretations Block */}
          <div className="bg-slate-900 p-12 md:p-16 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 blur-[120px] opacity-20 pointer-events-none -mr-40" />
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">Ayurvedic Insight</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed max-w-2xl text-lg">
              <p>
                Classical Ayurvedic physiology views <strong>{symptom.name}</strong> as a functional disturbance of the regulatory systems. Whether it stems from a lack of digestive fire (Agni) or an excess of a specific Dosha, the focus is on returning to your natural baseline (Prakriti).
              </p>
              <p>
                By identifying the qualities (Gunas) present in your current state, we can introduce the opposite qualities through diet and lifestyle to restore equilibrium.
              </p>
            </div>
          </div>

          {/* Lifestyle Tips */}
          {symptom.lifestyleTips && (
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-forest tracking-tight">Lifestyle Rhythms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {symptom.lifestyleTips.map((tip, i) => (
                  <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex gap-6 items-start shadow-sm hover:bg-slate-50 transition-all">
                    <Activity className="w-6 h-6 text-forest shrink-0 mt-1" />
                    <div>
                      <h4 className="font-black text-forest mb-2">{tip.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dietary Considerations */}
          {(symptom.dietarySupports || symptom.dietaryAvoids) && (
            <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <h2 className="text-3xl font-black text-forest tracking-tight mb-12 text-center">Dietary Considerations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {symptom.dietarySupports && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-emerald-600 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" /> Supportive Elements
                    </h3>
                    <ul className="space-y-4">
                      {symptom.dietarySupports.map((item, i) => (
                        <li key={i} className="space-y-1">
                          <p className="text-sm font-bold text-forest">{item.food}</p>
                          <p className="text-xs text-slate-500">{item.why}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {symptom.dietaryAvoids && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-orange-600 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" /> Aggravating Elements
                    </h3>
                    <ul className="space-y-4">
                      {symptom.dietaryAvoids.map((item, i) => (
                        <li key={i} className="space-y-1">
                          <p className="text-sm font-bold text-forest">{item.food}</p>
                          <p className="text-xs text-slate-500">{item.why}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Medical Disclaimer */}
          <div className="p-12 rounded-[4rem] bg-forest/5 border border-forest/10 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-forest shadow-sm">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-forest tracking-tight">Clinical Guidance</h3>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl">
              Ayurvedic educational insights are designed to support wellness. However, severe or persistent symptoms require professional medical oversight. Consult a healthcare provider if you experience sudden weight changes, severe pain, or any chronic digestive disruption.
            </p>
          </div>

          {/* Cluster Variations */}
          <div className="space-y-12">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center">Therapeutic Variations</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.keys(DOSHAS).map((dKey) => (
                <Link 
                  key={dKey}
                  href={`/health/${slug}-${dKey}`}
                  className="px-8 py-4 rounded-3xl bg-white border border-slate-100 text-sm font-black text-slate-600 hover:border-forest hover:text-forest transition-all shadow-sm"
                >
                  {symptom.name} ({DOSHAS[dKey as keyof typeof DOSHAS].name} Type)
                </Link>
              ))}
            </div>
          </div>

          {/* Related Symptoms */}
          <div className="space-y-12 pt-12 border-t border-slate-100">
            <h2 className="text-3xl font-black text-forest tracking-tight">Related Indicators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedInCluster.map((s) => (
                <Link key={s.id} href={`/health/${s.id}`} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col hover:bg-slate-50 transition group shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest mb-4 group-hover:bg-forest group-hover:text-white transition-all">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-black text-forest group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{s.name}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">{s.summary}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
            >
              Analyze Your <br /> Metabolic Code
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Identify your unique physiological pattern and receive a personalized Ayurvedic protocol.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Start Assessment <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
