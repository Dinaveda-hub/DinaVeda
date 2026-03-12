"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Thermometer, Droplets, Zap, Clock, AlertTriangle, CheckCircle2, Bookmark, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { PROTOCOLS } from "@/data/health-content";
import Footer from "@/components/Footer";
import TopicHubFooter from "@/components/TopicHubFooter";
import { notFound } from "next/navigation";

export default function ProtocolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const protocol = PROTOCOLS[slug];

  if (!protocol) {
    notFound();
  }

  const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": protocol.name,
    "description": protocol.mechanism,
    "about": [
      { "@type": "Thing", "name": "Ayurvedic Protocol" },
      { "@type": "Thing", "name": "Natural Reset" }
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

      <main className="max-w-4xl mx-auto px-6 py-20">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-8">
            Clinical Protocol
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            {protocol.name}
          </h1>
          <div className="flex items-center justify-center gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
             <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {protocol.duration}</div>
             <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
             <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Medically Safe</div>
          </div>
        </motion.header>

        <section className="space-y-20">
          {/* indications & mechanism */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <Bookmark className="absolute top-8 right-8 w-6 h-6 text-slate-100" />
                <h3 className="text-xl font-black text-forest mb-6">Target Indications</h3>
                <ul className="space-y-4">
                  {protocol.indications.map(ind => (
                    <li key={ind} className="flex gap-3 items-center text-sm font-bold text-slate-500">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {ind}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="flex flex-col justify-center space-y-6">
                <h3 className="text-2xl font-black text-forest">The Mechanism</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {protocol.mechanism}
                </p>
             </div>
          </div>

          {/* Steps */}
          <div className="space-y-12">
            <h2 className="text-3xl font-black text-forest text-center tracking-tight">The Step-by-Step Reset</h2>
            <div className="grid grid-cols-1 gap-6">
              {protocol.steps.map((step, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[3rem] border border-slate-100 flex gap-8 items-start hover:shadow-xl hover:shadow-slate-200/50 transition-all border-l-4 border-l-forest">
                  <span className="text-3xl font-black text-forest/10 mt-1">{idx + 1}</span>
                  <div>
                    <h4 className="text-xl font-black text-forest mb-3">{step.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contraindications */}
          <div className="bg-orange-50/50 p-10 rounded-[3rem] border border-orange-100">
            <div className="flex gap-4 items-center mb-6">
               <AlertTriangle className="w-6 h-6 text-orange-500" />
               <h3 className="text-xl font-black text-orange-700">Contraindications</h3>
            </div>
            <p className="text-sm text-orange-700/70 font-bold mb-6">Do not follow this protocol if you are experiencing:</p>
            <div className="flex flex-wrap gap-3">
              {protocol.contraindications.map(c => (
                <span key={c} className="px-4 py-2 bg-white rounded-full text-xs font-black text-orange-600 border border-orange-100 shadow-sm">{c}</span>
              ))}
            </div>
          </div>

          {/* Dynamic Routine Selection */}
          <div className="bg-forest p-12 md:p-16 rounded-[4rem] text-white text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-20" />
             <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-8">Clinical Precision</h3>
             <p className="text-emerald-100/70 font-bold mb-12 uppercase tracking-widest text-xs max-w-md mx-auto">
               This is a general protocol. Dinaveda assembles a real-time protocol based on your specific Vata/Pitta/Kapha ratio.
             </p>
             <Link 
               href="/login" 
               className="inline-flex items-center gap-3 bg-white text-forest px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
             >
               Get My Custom Version <ArrowRight className="w-5 h-5" />
             </Link>
          </div>
        </section>
      </main>

      <TopicHubFooter />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(PROTOCOLS).map((slug) => ({
    slug,
  }));
}
