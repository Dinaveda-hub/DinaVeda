"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Info, Activity, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { CAUSES, PROTOCOL_GUIDES } from "@/data";
import { notFound } from "next/navigation";

interface CauseClientProps {
  slug: string;
}

export default function CauseClient({ slug }: CauseClientProps) {
  const cause = CAUSES[slug];
  if (!cause) { return null; }
  const protocol = PROTOCOL_GUIDES[cause.recommendedProtocol];

  const JSON_LD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "name": cause.name,
        "description": cause.mechanism,
        "about": [
          { "@type": "Thing", "name": "Ayurvedic Pathophysiology" },
          { "@type": "Thing", "name": "Health Mechanisms" }
        ]
      },
      {
        "@type": "MedicalCondition",
        "name": cause.name,
        "description": cause.mechanism,
        "associatedAnatomy": { "@type": "AnatomicStructure", "name": "Systemic" },
        "possibleTreatment": {
          "@type": "MedicalCode",
          "name": protocol?.name || "Ayurvedic Protocol"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Dinaveda", "item": "https://dinaveda.com" },
          { "@type": "ListItem", "position": 2, "name": "Health", "item": "https://dinaveda.com/health" },
          { "@type": "ListItem", "position": 3, "name": cause.name }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#FAFBFB] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/health" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-forest transition-all">
          <ArrowLeft className="w-4 h-4" /> Symptom Hub
        </Link>
        <Link href="/" className="font-black text-forest text-xl tracking-tighter">
          Dinaveda
        </Link>
        <Link href="/login" className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1">
          Assessment
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest mb-8">
            Biological Mechanism
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Understanding <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
              {cause.name}
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto italic">
            "{cause.ayuView}"
          </p>
        </motion.header>

        <section className="space-y-20">
          {/* Mechanism Card */}
          <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-slate-100 shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-20 -mt-20 z-0" />
            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-slate-50 ${cause.color} flex items-center justify-center mb-8`}>
                <cause.icon className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-forest mb-6">The Biological Loop</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
                {cause.mechanism}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-600 mb-4">Associated Symptoms</h4>
                  <div className="flex flex-wrap gap-2">
                    {cause.symptoms.map(s => (
                      <span key={s} className="px-3 py-1 bg-slate-50 rounded-full text-xs font-bold text-slate-500">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-600 mb-4">Ayurvedic Layer</h4>
                  <div className="flex items-center gap-2 text-forest font-black">
                     <BookOpen className="w-4 h-4" />
                     <span>Clinical Pathophysiology</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bridge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-forest">Why Awareness Matters</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Most medical interventions treat the branch, not the root. By identifying {cause.id as string === 'weak-agni' ? 'Agni' : 'the mechanism'} as the source, we can apply specific corrections that clear multiple symptoms simultaneously.
              </p>
              <div className="p-6 bg-forest/5 rounded-3xl border border-forest/5 flex gap-4">
                <Info className="w-5 h-5 text-forest shrink-0 mt-1" />
                <p className="text-xs text-forest/70 font-bold leading-relaxed">
                  In the Dinaveda engine, this mechanism is tracked via 20+ biological markers to detect early shifts before they become structural problems.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-800 p-10 rounded-[3.5rem] text-white space-y-8 shadow-2xl">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Recommended Reset</h4>
                  <h3 className="text-2xl font-black">{protocol?.name}</h3>
                </div>
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">
                {protocol?.mechanism}
              </p>
              <Link 
                href={`/protocol/${cause.recommendedProtocol}`}
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all"
              >
                Start Protocol <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Dinaveda CTA */}
          <section className="py-24 text-center">
            <div className="max-w-4xl mx-auto overflow-hidden bg-white p-16 md:p-24 rounded-[4rem] border border-slate-100 shadow-premium">
              <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter text-forest mb-8 italic uppercase text-balance">
                Map Your Internal Mechanisms
              </h2>
              <p className="text-slate-500 font-bold mb-12 uppercase tracking-widest text-sm max-w-md mx-auto">
                Our Physiology Engine detects {cause.name} in 2 minutes.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                      href="/login"
                      className="inline-flex items-center gap-3 bg-forest text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-forest/20 transition-all hover:bg-forest/90"
                  >
                      Identify My Cause <Activity className="w-5 h-5 ml-1" />
                  </Link>
              </motion.div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
