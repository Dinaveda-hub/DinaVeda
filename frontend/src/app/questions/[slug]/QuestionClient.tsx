"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, Compass, Activity, Brain, Sparkles, AlertCircle, 
  ArrowLeft 
} from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

interface QuestionClientProps {
  slug: string;
  symptomKey: string;
  symptom: {
    name: string;
    [key: string]: any;
  };
  questionTitle: string;
}

export default function QuestionClient({ 
  slug, 
  symptomKey, 
  symptom, 
  questionTitle 
}: QuestionClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 h-1 bg-emerald-500 origin-left z-[80]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-50 flex justify-between items-center w-full sticky top-0 z-[70]">
        <div className="flex items-center gap-12 max-w-7xl mx-auto w-full px-6">
          <Link href="/" className="font-bold text-forest text-2xl tracking-tighter flex items-center gap-2 group shrink-0 py-2">
            <div className="w-8 h-8 relative group-hover:scale-110 transition-transform">
              <Image src="/logo.png" alt="Dinaveda" fill sizes="32px" className="object-contain" />
            </div>
            Dinaveda
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/guide" className="text-sm font-bold text-slate-600 hover:text-forest transition-colors py-2">Guide</Link>
            <Link href="/health" className="text-sm font-bold text-slate-600 hover:text-forest transition-colors py-2">Symptom Hub</Link>
          </div>
          <div className="ml-auto">
            <Link 
              href="/login" 
              className="text-sm font-bold text-white bg-forest px-6 py-3 rounded-full uppercase tracking-wider hover:bg-forest/90 transition-all shadow-lg shadow-forest/10"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20 space-y-16 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
          <Link href="/health" className="hover:text-forest transition-colors">Health Hub</Link>
          <ArrowRight className="w-3 h-3" />
          <span className="text-forest/60">Practical Questions</span>
        </nav>

        {/* H1 Question */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-forest tracking-tight leading-[1.1] capitalize text-balance">
            {questionTitle}
          </h1>
          <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl">
            Ayurvedic interpretation and physiological signaling of <span className="text-forest italic">"{questionTitle}"</span>.
          </p>
        </div>

        {/* E-E-A-T Reviewer Block */}
        <div className="flex items-center gap-5 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-fit">
          <div className="w-12 h-12 rounded-full bg-forest/5 border border-forest/10 flex items-center justify-center text-xs font-bold text-forest">
            RK
          </div>
          <div>
            <p className="text-xs font-bold text-forest uppercase tracking-widest mb-0.5">
              Verified by
            </p>
            <p className="text-sm font-bold text-slate-700">
              Dr. Rahul K R, BAMS
            </p>
          </div>
        </div>

        {/* Clinical Perspective */}
        <div className="space-y-6 py-10 border-y border-slate-100">
           <div className="flex items-center gap-3 text-emerald-600 mb-2">
              <Compass className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Clinical Perspective</span>
           </div>
           <p className="text-base md:text-lg text-slate-700 leading-relaxed font-semibold">
              In Ayurvedic clinical practice, questions like this are investigated through the state of digestive fire (Agni) and the accumulation of metabolic residue (Ama).
           </p>
           <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
              Rather than treating the symptom in isolation, we look at the regulatory principles known as Vata, Pitta, and Kapha to understand the systemic origin of the signal.
           </p>
        </div>

        {/* Possible Causes Card */}
        <section className="space-y-8 p-8 md:p-12 bg-white rounded-[3rem] border border-slate-100 shadow-premium relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-forest tracking-tight">
              Possible Contributing Factors
            </h2>
            <ul className="space-y-6">
              {[
                {
                  t: "Metabolic Inefficiency",
                  d: "Irregular digestive fire (Agni) due to inconsistent nutrition habits."
                },
                {
                  t: "Systemic Blockage",
                  d: "Accumulation of metabolic residue (Ama) obstructing physiological channels."
                },
                {
                  t: "Nervous System Strain",
                  d: "Chronic psychological stress affecting Vata (regulatory) balance."
                },
                {
                  t: "Circadian Disruption",
                  d: "Disruption of natural daily cycles (Dinacharya) impacting repair."
                }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2.5 shadow-sm shadow-emerald-400" />
                  <div className="space-y-1">
                    <span className="block font-semibold text-sm uppercase tracking-wider text-forest/80">{item.t}</span>
                    <p className="font-medium text-base text-slate-600 leading-relaxed">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ayurvedic Explanation */}
        <section className="space-y-8 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-forest tracking-tight">
            Ayurvedic Interpretation
          </h2>
          <div className="space-y-6 text-slate-700 leading-relaxed font-medium text-base md:text-lg">
            <p>
              Ayurvedic physiology interprets symptoms as biological signals of systemic imbalance. When digestive fire (Agni) weakens, the body may accumulate metabolic residue (Ama). 
            </p>
            <p>
              This residue often manifests as <span className="text-forest font-bold">{symptom.name.toLowerCase()}</span>, fatigue, or cognitive slowing. Ayurvedic lifestyle protocols are traditionally used to support internal balance and the body's natural regulatory capacity.
            </p>
          </div>
          <div className="p-8 md:p-10 bg-slate-900 rounded-[2.5rem] text-slate-200 text-base md:text-lg leading-relaxed border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-10 blur-3xl rounded-full" />
            <span className="text-emerald-400 font-bold uppercase tracking-widest block mb-4 text-xs">Foundational Logic</span>
            <p className="text-base font-medium">
              Identifying whether your symptoms reflect Vata, Pitta, or Kapha dominance is essential for determining the most appropriate dietary and lifestyle support patterns.
            </p>
          </div>
        </section>

        {/* Medical Safety */}
        <section className="bg-rose-50/50 border border-rose-100 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 opacity-20 blur-3xl rounded-full" />
          <div className="flex items-center gap-4 relative z-10">
             <div className="w-12 h-12 rounded-2xl bg-white border border-rose-100 flex items-center justify-center text-rose-600 shadow-sm">
                <AlertCircle className="w-6 h-6" />
             </div>
             <h3 className="text-xl md:text-2xl font-bold text-forest tracking-tight">
               Clinical Guidelines
             </h3>
          </div>
          <p className="text-base text-slate-700 leading-relaxed font-medium relative z-10">
            Persistent or severe symptoms should always be evaluated by a qualified healthcare professional. Sudden weight loss, severe pain, or unexplained fatigue may indicate underlying medical conditions requiring prompt clinical care.
          </p>
        </section>

        {/* Related Symptom & Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-slate-100">
          {/* Related Symptom Page */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Symptom Authority</h4>
            <Link
              href={`/health/${symptomKey}`}
              className="group block p-8 bg-white border border-slate-100 rounded-[2rem] hover:bg-forest transition-all border-b-8 border-b-forest/10 hover:border-b-forest hover:-translate-y-1 shadow-sm"
            >
              <p className="text-lg font-bold text-forest group-hover:text-white transition-colors mb-2">
                Detailed {symptom.name} Guide
              </p>
              <p className="text-sm text-slate-500 group-hover:text-emerald-100 transition-colors font-medium">View the clinical protocols and traditional remedies.</p>
            </Link>
          </div>

          {/* Root Cause Guides */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Physiology Authority</h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: "Digestive Fire (Agni)", href: "/guide/agni" },
                { name: "Metabolic Residue (Ama)", href: "/guide/ama" },
                { name: "Dosha Principles", href: "/guide/doshas" }
              ].map((guide) => (
                <Link 
                  key={guide.href}
                  href={guide.href} 
                  className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-forest transition-all shadow-sm"
                >
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-forest">{guide.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-forest transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="pt-12">
            <div className="bg-slate-900 text-white p-12 md:p-16 rounded-[3rem] md:rounded-[4rem] text-center space-y-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500 blur-[100px] opacity-10 pointer-events-none -mr-40" />
              <div className="space-y-6">
                 <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight italic uppercase">
                    Uncover Your <br /> Metabolic Pattern
                 </h3>
                 <p className="text-base md:text-lg text-slate-400 font-medium leading-relaxed max-w-md mx-auto">
                    Dinaveda analyzes your unique physiological signals to identify the underlying pattern of imbalance.
                 </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-3 bg-forest text-white px-12 py-6 rounded-full font-bold text-sm md:text-base uppercase tracking-widest shadow-2xl transition-all hover:bg-forest/90 hover:scale-105"
              >
                Start Free Analysis <Activity className="w-5 h-5" />
              </Link>
            </div>
        </section>

        {/* Global Footer / Disclaimer */}
        <footer className="pt-20 pb-8 text-center border-t border-slate-100">
           <Link href="/health" className="inline-flex items-center gap-2 text-forest font-bold uppercase tracking-widest text-xs mb-10 hover:gap-4 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to Health Hub
           </Link>
           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed max-w-xl mx-auto">
              This information serves educational purposes regarding Ayurvedic physiology and does not replace medical advice, diagnosis, or treatment. Always consult with a healthcare professional.
           </p>
        </footer>
      </main>
    </div>
  );
}
