"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Clock, AlertTriangle, Bookmark, Heart, Info, Sparkles, Activity } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import TopicHubFooter from "@/components/TopicHubFooter";

interface ProtocolClientProps {
  name: string;
  mechanism: string;
  duration: string;
  indications: string[];
  contraindications: string[];
  raw: any;
  bundle: any;
}

export default function ProtocolClient({ name, mechanism, duration, indications, contraindications, raw, bundle }: ProtocolClientProps) {
  const JSON_LD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "name": name,
        "description": mechanism,
        "about": [
          { "@type": "Thing", "name": "Ayurvedic Treatment" },
          { "@type": "Thing", "name": "Natural Medicine" }
        ]
      },
      {
        "@type": "MedicalTreatment",
        "name": name,
        "description": mechanism,
        "outcome": "Biological Marker Correction",
        "howItWorks": "Nervous and digestive system regulation via specific Ayurvedic interventions"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Dinaveda", "item": "https://dinaveda.com" },
          { "@type": "ListItem", "position": 2, "name": "Health", "item": "https://dinaveda.com/health" },
          { "@type": "ListItem", "position": 3, "name": name }
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

      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-[70] border-b border-slate-50">
        <Link href="/health" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-all">
          <ArrowLeft className="w-4 h-4" /> Health Hub
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
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-8">
            {raw ? 'Clinical Protocol' : 'Health Reset Bundle'}
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            {name}
          </h1>
          <div className="flex items-center justify-center gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
             <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {duration}</div>
             <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
             <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> {raw ? raw.module : 'Verified'}</div>
          </div>
        </motion.header>

        <section className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="col-span-1 md:col-span-2 space-y-8">
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16" />
                   <h3 className="text-lg font-black text-forest mb-4 flex items-center gap-2">
                     <Bookmark className="w-5 h-5 text-emerald-500" />
                     Clinical Instruction
                   </h3>
                   <p className="text-slate-600 font-medium leading-relaxed italic pr-4">
                     "{mechanism}"
                   </p>
                   <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Static Baseline</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span>{raw ? raw.module : 'Verified'}</span>
                   </div>
                </div>

                {/* Metabolic Teasing Section */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                   <h3 className="text-lg font-black text-forest mb-6 flex items-center gap-2">
                     <Activity className="w-5 h-5 text-orange-500" />
                     Metabolic Pulse Impact
                   </h3>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                         <span className="block text-[10px] font-black text-slate-400 uppercase mb-2">Agni Ignite</span>
                         <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-400 opacity-30 w-[60%]" />
                         </div>
                         <span className="mt-2 block text-[10px] font-bold text-slate-500 italic">Locked in Personalizer</span>
                      </div>
                      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                         <span className="block text-[10px] font-black text-slate-400 uppercase mb-2">Ama Scraping</span>
                         <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-400 opacity-30 w-[40%]" />
                         </div>
                         <span className="mt-2 block text-[10px] font-bold text-slate-500 italic">Calculated per State</span>
                      </div>
                   </div>

                   <p className="mt-6 text-xs text-slate-500 font-medium leading-relaxed">
                      The specific biological delta of {name} fluctuates based on your current imbalance levels. Tracking these signals in real-time prevents 'biological burnout' from static routine application.
                   </p>
                </div>

                <div className="bg-emerald-50/50 p-8 rounded-[3rem] border border-emerald-100/50">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4">Precision Warning</h4>
                   <p className="text-xs text-emerald-800/70 font-bold leading-relaxed">
                     This is a generalized clinical baseline. To ensure biological safety, the Dinaveda engine must calibrate the intensity and timing of this action based on your detected circadian drift and metabolic momentum.
                   </p>
                </div>
             </div>

             <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 flex flex-col justify-between">
                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Target Indicators</h4>
                   <div className="flex flex-wrap gap-2">
                     {indications.map((ind: string) => (
                       <span key={ind} className="px-3 py-1.5 bg-white rounded-xl text-[10px] font-black text-slate-500 uppercase border border-slate-200 shadow-sm">
                         {ind}
                       </span>
                     ))}
                   </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-200">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-white">
                         <Heart className="w-5 h-5" />
                      </div>
                      <div>
                         <span className="block text-[10px] font-black text-slate-400 uppercase tracking-tighter">Clinical Standard</span>
                         <span className="block text-xs font-bold text-forest uppercase">Veda-Core 2.0</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {bundle ? (
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-forest tracking-tight">Structured Phase Flow</h2>
              <div className="grid grid-cols-1 gap-4">
                {bundle.steps.map((step: any, idx: number) => (
                  <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex gap-6 items-start hover:shadow-lg transition-all border-l-4 border-l-forest">
                    <span className="text-2xl font-black text-forest/10 mt-1">{idx + 1}</span>
                    <div>
                      <h4 className="text-lg font-black text-forest mb-2">{step.title}</h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-[4rem] border border-slate-100 text-center space-y-8 shadow-premium overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16" />
              <Sparkles className="w-12 h-12 text-forest/20 mx-auto" />
              <h2 className="text-2xl font-black text-forest text-balance">Static Baselines are Limited</h2>
              <p className="text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">
                While {name} is a validated clinical protocol, applying it without considering your real-time physiology can lead to biological resistance. Static protocols are merely maps; dynamic tracking is the territory.
              </p>
              <div className="flex justify-center gap-2">
                 {raw?.tags?.slice(0, 3).map((tag: string) => (
                   <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">#{tag}</span>
                 ))}
              </div>
            </div>
          )}

          {contraindications.length > 0 && (
            <div className="bg-orange-50/50 p-10 rounded-[3rem] border border-orange-100">
              <div className="flex gap-4 items-center mb-6">
                 <AlertTriangle className="w-6 h-6 text-orange-500" />
                 <h3 className="text-xl font-black text-orange-700">Safety Precautions</h3>
              </div>
              <p className="text-sm text-orange-700/70 font-bold mb-6">Strict adherence to safety filters is required. Professional assessment is mandatory if you have:</p>
              <div className="flex flex-wrap gap-3">
                {contraindications.map((c: string) => (
                  <span key={c} className="px-4 py-2 bg-white rounded-full text-xs font-black text-orange-600 border border-orange-100 shadow-sm">{c.replace('_', ' ')}</span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden shadow-3xl shadow-forest/20">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
             <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 italic">Activate Your <br /> Metabolic Pulse</h3>
             <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-sm mx-auto leading-loose">
               Stop following general advice. Get a health OS that tracks 40+ biological signals in real-time.
             </p>
             <Link 
               href="/login" 
               className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
             >
               Start Tracking <ArrowRight className="w-5 h-5" />
             </Link>
          </div>

        </section>
      </main>

      <TopicHubFooter />
      <Footer />
    </div>
  );
}
