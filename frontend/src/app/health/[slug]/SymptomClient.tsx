"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, AlertCircle, Sparkles, CheckCircle2, Activity, Compass, Layers, Flame, Thermometer, ShieldAlert } from "lucide-react";
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
    "author": {
      "@type": "Person",
      "name": "Dr. Rahul K R",
      "jobTitle": "Ayurvedic Physician"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dinaveda"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Is ${symptom.name.toLowerCase()} always a sign of disease?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Not necessarily. In Ayurveda, temporary ${symptom.name.toLowerCase()} often occurs due to lifestyle factors such as irregular eating habits, high stress, or seasonal shifts.`
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to see improvements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Improvements depend on the underlying cause and the consistency of adjustments. Subtle shifts often begin within 3-7 days, with structural metabolic balance taking approximately 30 days."
          }
        }
      ]
    }
  };

  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

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
            {symptom.name}
          </h1>

          {/* 1. Author Expertise Block */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-8 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
            <div className="w-14 h-14 rounded-full bg-forest/5 flex items-center justify-center text-xs font-black text-forest border border-forest/10">
              RK
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medically reviewed by</p>
              <h4 className="text-lg font-black text-forest leading-none">Dr. Rahul K R, BAMS</h4>
              <p className="text-xs font-bold text-emerald-600 italic">Ayurvedic Physician</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6 md:border-l border-slate-100">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Last medical review</p>
               <p className="text-xs font-bold text-forest">March 2026</p>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              {symptom.name} is interpreted in Ayurveda as a physiological signal of internal imbalance. {symptom.summary}
            </p>
          </div>
        </motion.header>

        <section className="space-y-32">
          {/* 2. Clinical Observation (Experience Signal) */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Clinical Perspective</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-8 bg-emerald-50/50 rounded-[3rem] border border-emerald-100 relative">
                <Compass className="absolute top-8 right-8 w-8 h-8 text-emerald-200" />
                <p className="text-slate-700 leading-relaxed font-medium mb-6">
                  In Ayurvedic clinical practice, patients presenting with <strong>{symptom.name.toLowerCase()}</strong> often report associated patterns such as irregular digestion, poor sleep quality, chronic stress, or dietary imbalance.
                </p>
                <div className="space-y-4">
                  <p className="text-xs font-black text-forest uppercase tracking-widest">Key clinical signs:</p>
                  <ul className="space-y-3 text-sm font-bold text-slate-600">
                    {symptom.signs?.map((sign, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {sign}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <p className="text-slate-500 leading-relaxed font-medium">
                  Addressing these underlying patterns through targeted lifestyle and dietary adjustments may improve symptoms over time by restoring the body's natural regulatory capacity.
                </p>
                <div className="p-6 bg-white border border-slate-100 rounded-3xl">
                   <p className="text-xs font-bold text-slate-500 italic leading-relaxed">
                     "We evaluate the whole metabolic context. {symptom.name} is rarely an isolated event, but a signal of communication between systems."
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Physiological Explanation (Agni/Ama/Dosha) */}
          <div className="bg-slate-900 p-12 md:p-20 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 blur-[120px] opacity-20 pointer-events-none -mr-40" />
            <div className="max-w-3xl space-y-8">
              <h2 className="text-4xl font-black mb-8 tracking-tight italic">Physiological Explanation</h2>
              <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-medium">
                <p>
                  In Ayurvedic physiology, symptoms are interpreted as indicators of imbalance in digestive function (Agni), metabolic residue (Ama), or the regulatory systems known as Doshas (Vata, Pitta, Kapha).
                </p>
                <p>
                  For <strong>{symptom.name}</strong>, {symptom.ayuDesc} Understanding these patterns helps identify possible contributing factors and guides appropriate adjustments.
                </p>
                <div className="pt-8 border-t border-white/10">
                   <p className="text-sm text-emerald-400 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Layers className="w-4 h-4" /> Structural Hierarchy
                   </p>
                   <p className="text-sm text-slate-400 leading-relaxed">
                     By identifying the qualities (Gunas) present in your current state, we can introduce opposite qualities to restore equilibrium and metabolic flow in the channels (Srotas).
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Common Causes Section */}
          <div className="space-y-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black text-forest tracking-tight mb-4">Common Causes</h2>
              <p className="text-slate-500 font-medium">Consistent indicators usually stem from one or more of these contributing factors:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {symptom.causes?.map((group, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-black text-forest mb-6 text-xs uppercase tracking-widest leading-none border-b border-slate-50 pb-4">{group.title}</h4>
                  <ul className="space-y-4">
                    {group.items.map((item, j) => (
                      <li key={j} className="text-sm text-slate-500 font-bold flex items-start gap-3">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )) || (
                [
                  { title: "Metabolic factors", items: ["Impaired digestion", "Metabolic residue", "Irregular Agni"] },
                  { title: "Lifestyle factors", items: ["Irregular routine", "High stress", "Poor sleep"] },
                  { title: "Dietary factors", items: ["Incompatible foods", "Late night meals", "Processed diet"] }
                ].map((group, i) => (
                  <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm opacity-60">
                    <h4 className="font-black text-forest mb-6 text-xs uppercase tracking-widest leading-none border-b border-slate-50 pb-4">{group.title}</h4>
                    <ul className="space-y-4">
                      {group.items.map((item, j) => (
                        <li key={j} className="text-sm text-slate-500 font-bold flex items-start gap-3">
                          <Sparkles className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" /> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 5. Lifestyle & Diet Strategies */}
          <div className="space-y-12">
             <h2 className="text-3xl font-black text-forest tracking-tight">Therapeutic Strategies</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Lifestyle */}
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-forest flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-2xl w-fit">
                    <Compass className="w-5 h-5 text-emerald-600" /> Lifestyle Corrections
                  </h3>
                  <div className="space-y-4">
                    {symptom.lifestyleTips?.map((tip, i) => (
                      <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="font-black text-forest mb-2 text-sm">{tip.title}</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{tip.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diet */}
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-forest flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-2xl w-fit">
                    <Flame className="w-5 h-5 text-orange-600" /> Dietary Adjustments
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-8 bg-emerald-50/30 rounded-[2.5rem] border border-emerald-100/50">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Supportive Foods</p>
                      <ul className="space-y-4">
                        {symptom.dietarySupports?.map((item, i) => (
                          <li key={i} className="space-y-1">
                            <p className="text-sm font-black text-forest leading-none">{item.food}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{item.why}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8 bg-orange-50/30 rounded-[2.5rem] border border-orange-100/50">
                      <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-4">Foods to Avoid</p>
                      <ul className="space-y-4">
                        {symptom.dietaryAvoids?.map((item, i) => (
                          <li key={i} className="space-y-1">
                            <p className="text-sm font-black text-forest leading-none">{item.food}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{item.why}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* 6. Safety Section (When to see a doctor) */}
          <div className="p-12 md:p-16 rounded-[4rem] bg-rose-50/50 border border-rose-100 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-600 shadow-sm border border-rose-100">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-forest tracking-tight leading-tight">
                When to Consult a <br className="md:hidden" /> Healthcare Professional
              </h3>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl text-lg">
              Although mild symptoms may occur occasionally, medical evaluation is recommended if the condition occurs with:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {(symptom.redFlags || [
                "Persistent or worsening symptoms", 
                "Unexplained weight loss", 
                "Severe pain", 
                "Neurological symptoms", 
                "Duration longer than several weeks"
              ]).map((flag, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-bold text-slate-600 p-4 bg-white/50 rounded-2xl">
                  <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" /> {flag}
                </div>
              ))}
            </div>
          </div>

          {/* 7. FAQ Section */}
          <div className="space-y-12">
            <h2 className="text-3xl font-black text-forest tracking-tight">Common Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  q: `Is ${symptom.name.toLowerCase()} always a sign of disease?`,
                  a: `Not necessarily. In Ayurveda, temporary ${symptom.name.toLowerCase()} often occurs due to lifestyle factors such as irregular eating habits, high stress, or seasonal shifts.`
                },
                {
                  q: "How long does it take to see improvements?",
                  a: "Improvements depend on the underlying cause and the consistency of adjustments. Subtle shifts often begin within 3-7 days, with structural metabolic balance taking approximately 30 days."
                }
              ].map((faq, i) => (
                <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-4">
                  <h4 className="text-lg font-black text-forest leading-tight">{faq.q}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Classical Ayurvedic References */}
          <div className="pt-12 border-t border-slate-100">
            <h2 className="text-2xl font-black text-forest tracking-tight mb-8">Classical Ayurvedic References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-slate-400" />
                 </div>
                 <div>
                    <h5 className="font-black text-forest text-sm">Charaka Samhita</h5>
                    <p className="text-xs text-slate-500 font-medium italic">Sutra Sthana – Description of Agni and metabolic function</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-slate-400" />
                 </div>
                 <div>
                    <h5 className="font-black text-forest text-sm">Ashtanga Hridaya</h5>
                    <p className="text-xs text-slate-500 font-medium italic">Sutra Sthana – Regulation of sleep, digestion, and vitality</p>
                 </div>
              </div>
            </div>
          </div>

          {/* 9. Internal Linking Clusters (Related Topics) */}
          <div className="space-y-12 pt-12 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-forest tracking-tight">Topical Authority</h2>
                <div className="grid grid-cols-1 gap-4">
                  {relatedInCluster.map((rel) => (
                    <Link key={rel.id} href={`/health/${rel.id}`} className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group shadow-sm">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Related Symptom</p>
                        <p className="text-sm font-black text-forest group-hover:text-emerald-600">{rel.name}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                  <div className="p-8 bg-forest rounded-[2.5rem] text-white">
                     <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-2 italic">Medical Review Context</p>
                     <p className="text-sm font-medium leading-relaxed opacity-80">This analysis uses classical Ayurvedic physiology clusters to identify underlying patterns rather than treating symptoms as isolated events.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-black text-forest tracking-tight">Foundational Concepts</h2>
                <div className="grid grid-cols-1 gap-4">
                  <Link href="/guide/agni" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group shadow-sm">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-1">Guide</p>
                      <p className="text-sm font-black text-forest group-hover:text-orange-600">Digestive Fire (Agni)</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/guide/ama" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group shadow-sm">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-1">Guide</p>
                      <p className="text-sm font-black text-forest group-hover:text-rose-600">Metabolic Residue (Ama)</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-rose-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/guide/doshas" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group shadow-sm">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1">Guide</p>
                      <p className="text-sm font-black text-forest group-hover:text-indigo-600">Understanding Doshas</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/guide/ojas" className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition group shadow-sm">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Guide</p>
                      <p className="text-sm font-black text-forest group-hover:text-emerald-600">Ojas & Immunity</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Dosha Variations */}
          <div className="space-y-8 pt-12 border-t border-slate-100">
            <h2 className="text-2xl md:text-3xl font-black text-forest tracking-tight">
              Constitutional Variations
            </h2>
            <div className="flex flex-wrap gap-4">
              {Object.keys(DOSHAS).map((dKey) => (
                <Link 
                  key={dKey}
                  href={`/health/${slug}-${dKey}`}
                  className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-forest hover:text-forest transition-all"
                >
                  {DOSHAS[dKey as keyof typeof DOSHAS].name}-type {symptom.name.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-forest p-12 md:p-20 rounded-[4rem] text-white text-center relative overflow-hidden shadow-premium">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl md:text-5xl font-black tracking-tighter mb-8"
            >
              Identify Your <br /> Metabolic State
            </motion.h3>
            <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
              Identify your unique physiological pattern and receive a personalized Ayurvedic assessment.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Start Assessment <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Medical Disclaimer Section */}
            <div className="mt-20 pt-8 border-t border-white/10 text-[10px] font-bold text-emerald-100/30 text-center uppercase tracking-[0.2em] leading-relaxed max-w-2xl mx-auto">
              Medical Disclaimer: This article provides educational information based on Ayurvedic medical principles. It is not intended to replace professional medical diagnosis or treatment. Always consult a qualified healthcare professional for medical concerns.
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
