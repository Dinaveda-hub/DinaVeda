"use client";

import Link from "next/link";
import { PROTOCOL_GUIDES, PROTOCOL_MAP } from "@/data";
import { formatProtocolName } from "@/utils/stringUtils";
import { ChevronRight, ShieldCheck, Sparkles, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function ProtocolLandingPage() {
  const manualProtocols = Object.entries(PROTOCOL_GUIDES);
  const rawProtocols = Object.entries(PROTOCOL_MAP).slice(0, 12); // Sample of clinical protocols

  return (
    <div className="bg-[#F8FAF9] min-h-screen font-sans pb-40 relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest/5 rounded-full -mr-40 -mt-40 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full -ml-40 -mb-40 blur-[100px]" />

      <main className="max-w-6xl mx-auto px-6 pt-24 relative z-10">
        <header className="mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-forest/90 mb-3">
            Therapeutic Sanctum
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-forest tracking-tighter mb-6">
            Clinical Protocols
          </h1>
          <p className="text-lg text-slate-500 font-semibold max-w-2xl leading-relaxed">
            Personalized corrective interventions derived from classical Ayurvedic texts and optimized for modern physiology.
          </p>
        </header>

        {/* Manual Guides Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-black text-forest tracking-tight uppercase tracking-widest text-xs">Curated Foundations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manualProtocols.map(([slug, p]: [string, any]) => (
              <Link key={slug} href={`/protocol/${slug}`}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group h-full flex flex-col"
                >
                  <h3 className="text-2xl font-black text-forest mb-4 tracking-tight group-hover:text-emerald-700 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mb-8 flex-1 leading-relaxed">
                    {p.mechanism}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                      {p.duration}
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-forest transition-all" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Clinical Library Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-black text-forest tracking-tight uppercase tracking-widest text-xs">Veda-Core Dataset</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rawProtocols.map(([slug, p]: [string, any]) => (
              <Link key={slug} href={`/protocol/${slug}`}>
                <div className="bg-white/60 hover:bg-white p-5 rounded-2xl border border-slate-100 text-left transition-all hover:shadow-md hover:border-forest/20 group">
                  <h4 className="text-sm font-black text-forest mb-1 group-hover:text-emerald-700 transition-colors truncate">
                    {formatProtocolName(p.name)}
                  </h4>
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter text-slate-600">
                    <ShieldCheck className="w-3 h-3" />
                    {p.time_of_day} • {p.duration || '5-10 min'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
             <p className="text-xs font-bold text-slate-600 italic">
               + {Object.keys(PROTOCOL_MAP).length - 12} additional clinical signatures indexed in the engine.
             </p>
          </div>
        </section>
      </main>
    </div>
  );
}
