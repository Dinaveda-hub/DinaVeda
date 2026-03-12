"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Compass, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { SYMPTOMS, DOSHAS, COMBINATIONS } from "@/data";

interface HealthClientProps {
  slug: string;
}

export default function HealthClient({ slug }: HealthClientProps) {
  const combo = COMBINATIONS[slug];
  if (!combo) { return null; }
  const [symptomKey, doshaKey] = slug.split("-");
  const symptom = SYMPTOMS[symptomKey];
  const dosha = DOSHAS[doshaKey];

  const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": combo.title,
    "description": combo.intro,
    "about": [
      { "@type": "Thing", "name": symptom?.name || "Health" },
      { "@type": "Thing", "name": dosha?.name || "Ayurveda" }
    ]
  };

  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/health" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-all">
          <ArrowLeft className="w-4 h-4" /> Symptom Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">
          Dinaveda
        </Link>
        <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1">
          Assessment
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="flex justify-center gap-2 mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
              {symptom?.name}
            </span>
            <span className="inline-block px-4 py-1.5 rounded-full bg-forest/5 text-forest text-[10px] font-black uppercase tracking-widest">
              {dosha?.name} Type
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            {combo.title.split(":")[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
              {combo.title.split(":")[1] || ""}
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            {combo.intro}
          </p>
        </motion.header>

        <section className="space-y-20">
          {/* Section 1: Perspectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-forest tracking-tight">The Modern View</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                {symptom?.modernDesc}
              </p>
              <div className="p-8 bg-white rounded-[3rem] border border-slate-100 shadow-premium relative">
                <h3 className="text-xl font-black text-forest mb-4">The Ayurvedic Pattern</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {symptom?.ayuDesc}
                </p>
              </div>
            </div>
            <div className={`p-10 rounded-[4rem] bg-white border border-slate-100 shadow-sm space-y-6`}>
              <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center ${symptom?.color}`}>
                {symptom && <symptom.icon className="w-8 h-8" />}
              </div>
              <h3 className="text-2xl font-black text-forest">The Role of {dosha?.name}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                {combo.whyItHappens}
              </p>
              <div className="pt-4 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>{dosha?.elements}</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span>{dosha?.role}</span>
              </div>
            </div>
          </div>

          {/* Section: The Root Cause Bridge */}
          {symptom?.relatedCause && (
            <div className="bg-slate-900 rounded-[3.5rem] p-10 md:p-14 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 blur-[120px] opacity-20 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">The Mechanical Source</span>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                    {symptom.name} is a branch. <br />
                    The root is <span className="text-emerald-400 underline underline-offset-8 decoration-emerald-400/30">biological instability.</span>
                  </h3>
                  <p className="text-slate-400 font-medium leading-relaxed max-w-xl">
                    While {symptom.name} manifestations are bothersome, the underlying mechanism is often related to biological patterns like {symptom.relatedCause === 'weak-agni' ? 'weakened digestion' : symptom.relatedCause === 'ama-accumulation' ? 'stored metabolic waste' : 'nervous system aggravation'}.
                  </p>
                  <Link 
                    href={`/cause/${symptom.relatedCause}`}
                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all hover:scale-105"
                  >
                    Investigate Root Cause <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center p-8 shrink-0 shadow-2xl">
                   <div className="text-center space-y-2">
                      <Layers className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                      <span className="block text-[10px] font-black uppercase text-slate-500 tracking-widest leading-tight">Current Focus</span>
                      <span className="block text-sm font-black text-white">{symptom.name}</span>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Signs */}
          <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
            <h2 className="text-3xl font-black text-forest tracking-tight text-center mb-12">Is this your pattern?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {combo.signs.map((sign, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-forest/5 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-forest" />
                  </div>
                  <p className="text-slate-600 font-bold">{sign}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Protocol */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-forest tracking-tight">Recommended Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {combo.protocol.map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                      <Sparkles className="w-6 h-6 text-forest" />
                   </div>
                   <h4 className="font-black text-forest mb-2">{item.title}</h4>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Knowledge Links */}
          <div className="py-12 border-y border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <Compass className="w-6 h-6 text-forest" />
              <span className="text-sm font-black text-forest uppercase tracking-widest">Connect to Wisdom</span>
            </div>
            <div className="flex gap-8">
              <Link href="/guide/agni" className="text-xs font-bold text-slate-400 hover:text-forest transition-colors underline underline-offset-4">Agni Biology</Link>
              <Link href="/guide/ama" className="text-xs font-bold text-slate-400 hover:text-forest transition-colors underline underline-offset-4">Waste Clearance</Link>
              <Link href="/guide/doshas" className="text-xs font-bold text-slate-400 hover:text-forest transition-colors underline underline-offset-4">Understanding Doshas</Link>
            </div>
          </div>

          {/* Dinaveda CTA */}
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
              {dosha?.name}-type {symptom?.name} is just one layer. Let Dinaveda map your entire physiological state.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Start Analysis <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
