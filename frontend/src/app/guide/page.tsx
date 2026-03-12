"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Wind, Flame, Droplets, Zap, Shield, Sparkles, Sun, Moon, Leaf, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const PILLAR_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Ayurveda Guide: Understanding Doshas, Prakriti, and Biological Rhythm",
  "description": "The definitive guide to Ayurvedic physiology. Learn about Vata, Pitta, Kapha, Agni, Ama, and Ojas.",
  "about": [
    { "@type": "Thing", "name": "Ayurveda" },
    { "@type": "Thing", "name": "Doshas" },
    { "@type": "Thing", "name": "Prakriti" }
  ]
};

const TERMINOLOGY = [
  { term: "Prakriti", definition: "Your unique genetic constitution or 'nature' determined at conception.", link: "/guide/prakriti" },
  { term: "Vikriti", definition: "Your current state of imbalance. Ayurveda aims to move you back to your original Prakriti.", link: "/guide" },
  { term: "Mahabhutas", definition: "The 'Five Great Elements'—Space, Air, Fire, Water, and Earth.", link: "/guide" },
  { term: "Gunas", definition: "The three fundamental qualities of nature: Sattva, Rajas, and Tamas.", link: "/guide" },
  { term: "Dhatus", definition: "The seven layers of tissues in the body, ranging from plasma to reproductive tissue.", link: "/guide" },
  { term: "Prana", definition: "The vital life force that governs all physical and mental functions.", link: "/guide" },
  { term: "Srotas", definition: "The channels through which nutrients, waste, and energy flow.", link: "/guide" },
  { term: "Agni", definition: "Biological fire. It governs digestion, metabolism, and transformation.", link: "/guide/agni" },
  { term: "Ama", definition: "Undigested food and metabolic waste. The root cause of most imbalances.", link: "/guide/ama" },
  { term: "Ojas", definition: "The essence of vitality, immunity, and spiritual strength.", link: "/guide/ojas" },
  { term: "Dinacharya", definition: "The science of daily routine aligned with the sun's cycles.", link: "/guide/dinacharya" },
  { term: "Ritucharya", definition: "Seasonal protocols for health and biological stability.", link: "/guide/ritucharya" },
];

const ELEMENTS = [
  { name: "Akasha", en: "Space", icon: Sun, color: "text-indigo-500", desc: "The field of potential." },
  { name: "Vayu", en: "Air", icon: Wind, color: "text-blue-500", desc: "The principle of movement." },
  { name: "Agni", en: "Fire", icon: Flame, color: "text-orange-500", desc: "The principle of transformation." },
  { name: "Jala", en: "Water", icon: Droplets, color: "text-emerald-500", desc: "The principle of cohesion." },
  { name: "Prithvi", en: "Earth", icon: Leaf, color: "text-amber-500", desc: "The principle of structure." },
];

export default function GuidePage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PILLAR_JSON_LD) }}
      />

      {/* Top Navigation - Sticky for Hub feel */}
      <nav className="sticky top-0 z-[70] p-6 bg-white/80 backdrop-blur-md border-b border-slate-50 flex justify-between items-center w-full">
        <div className="flex items-center gap-12 max-w-7xl mx-auto w-full">
          <Link href="/" className="font-black text-forest text-2xl tracking-tighter flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 relative group-hover:scale-110 transition-transform">
              <Image src="/logo.png" alt="Dinaveda" fill sizes="32px" className="object-contain" />
            </div>
            Dinaveda
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/guide/doshas" className="text-sm font-bold text-slate-600 hover:text-forest transition-colors">Doshas</Link>
            <Link href="/guide/prakriti" className="text-sm font-bold text-slate-600 hover:text-forest transition-colors">Prakriti</Link>
            <Link href="/guide/agni" className="text-sm font-bold text-slate-600 hover:text-forest transition-colors">Agni</Link>
          </div>
          <div className="ml-auto">
            <Link 
              href="/login" 
              className="text-xs font-black text-white bg-forest px-6 py-2.5 rounded-full uppercase tracking-widest hover:bg-forest/90 transition-all shadow-lg shadow-forest/10"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <header className="pt-16 pb-16 md:pt-24 md:pb-24 px-6 max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-xs font-black text-forest/90 uppercase tracking-[0.4em] mb-6">
              Ayurveda Knowledge Hub
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
              Understanding <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
                Prakriti, Doshas & Rhythm
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed mb-12">
              Beyond health tracking. Dinaveda maps your biology using 
              <Link href="/guide/doshas" className="text-forest underline decoration-emerald-200 underline-offset-4 hover:decoration-forest mx-1">Doshas</Link>, 
              <Link href="/guide/agni" className="text-forest underline decoration-emerald-200 underline-offset-4 hover:decoration-forest mx-1">Agni</Link>, and 
              <Link href="/guide/prakriti" className="text-forest underline decoration-emerald-200 underline-offset-4 hover:decoration-forest mx-1">Prakriti</Link>.
            </p>
          </motion.div>
        </header>

        {/* Five Elements Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
              {ELEMENTS.map((el, i) => (
                  <motion.div 
                      key={el.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm text-center group hover:shadow-xl hover:shadow-slate-200/50 transition-all"
                  >
                      <div className={`w-12 h-12 rounded-2xl bg-slate-50 ${el.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-2xl`}>
                          <el.icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-black text-forest tracking-tighter mb-1">{el.name}</h4>
                      <span className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] mb-3 block">{el.en}</span>
                      <p className="text-[10px] font-medium text-slate-500 leading-tight">{el.desc}</p>
                  </motion.div>
              ))}
          </div>
        </section>

        {/* Prakriti vs. Vikriti */}
        <section className="py-20 px-6 max-w-6xl mx-auto relative z-10 border-b border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="space-y-6"
              >
                  <h2 className="text-3xl font-black text-forest tracking-tight">Prakriti vs. Vikriti</h2>
                  <p className="text-slate-600 leading-relaxed font-medium">
                      Most health advice treats everyone as a biological average. Ayurveda recognizes your 
                      <Link href="/guide/prakriti" className="text-forest underline ml-1">Prakriti</Link>—your unique genetic blueprint. 
                  </p>
                  <p className="text-slate-600 leading-relaxed font-medium">
                      When stress or lifestyle shifts pull you away from this baseline, you enter <strong>Vikriti</strong> (imbalance). 
                      <Link href="/login" className="text-forest underline ml-1 font-bold">Restore your balance →</Link>
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                      <div className="flex flex-col">
                          <span className="text-2xl font-black text-forest leading-none">Baseline</span>
                          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-1">Prakriti</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-300" />
                      <div className="flex flex-col">
                          <span className="text-2xl font-black text-emerald-500 leading-none">Imbalance</span>
                          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-1">Vikriti</span>
                      </div>
                  </div>
              </motion.div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-premium group">
                   <BookOpen className="w-12 h-12 text-forest mb-6" />
                   <h3 className="text-xl font-black text-forest mb-4 uppercase tracking-tighter">The Definition of Health</h3>
                   <p className="text-sm font-medium text-slate-500 leading-relaxed">
                      Health is a state where <strong>Doshas</strong>, digestive fire (<Link href="/guide/agni" className="underline">Agni</Link>), tissues, and waste are in balance, accompanied by a happy soul and clear mind.
                   </p>
              </div>
          </div>
        </section>

        {/* The Three Doshas */}
        <section className="py-32 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-[1000] text-forest tracking-tighter text-center mb-20 uppercase">The Three Doshas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                      { title: "Vata", icon: Wind, color: "text-indigo-500", bg: "bg-indigo-50", elements: "Space + Air", role: "Movement", desc: "Governs the nervous system and creativity. Imbalance feels like anxiety." },
                      { title: "Pitta", icon: Flame, color: "text-orange-500", bg: "bg-orange-50", elements: "Fire + Water", role: "Metabolism", desc: "Governs digestion and intellect. Imbalance feels like irritability." },
                      { title: "Kapha", icon: Droplets, color: "text-emerald-500", bg: "bg-emerald-50", elements: "Water + Earth", role: "Structure", desc: "Governs immunity and calmness. Imbalance feels like lethargy." },
                  ].map((dosha) => (
                    <Link key={dosha.title} href="/guide/doshas">
                      <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          whileHover={{ y: -10 }} 
                          className="p-12 rounded-[3.5rem] border border-slate-100 bg-white group shadow-sm hover:shadow-2xl transition-all h-full"
                      >
                          <div className={`w-16 h-16 rounded-2xl ${dosha.bg} ${dosha.color} flex items-center justify-center mb-8`}>
                              <dosha.icon className="w-8 h-8" />
                          </div>
                          <h4 className="text-3xl font-black text-forest mb-2 flex items-center gap-2">
                             {dosha.title} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h4>
                          <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] mb-6">{dosha.elements} • {dosha.role}</p>
                          <p className="text-slate-600 font-medium leading-relaxed">{dosha.desc}</p>
                      </motion.div>
                    </Link>
                  ))}
              </div>
          </div>
        </section>

        {/* Vitality Hub Section */}
        <section className="py-32 px-6 bg-[#1a1a1a] text-white overflow-hidden relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-center mb-24">The Mechanics of Vitality</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {[
                    { icon: <Zap className="w-10 h-10" />, name: "Agni", sub: "Fire", link: "/guide/agni", color: "text-orange-400", desc: "Metabolic fire. Weak Agni creates Ama." },
                    { icon: <Shield className="w-10 h-10" />, name: "Ama", sub: "Toxins", link: "/guide/ama", color: "text-slate-600", desc: "Sludge that blocks intelligent channels." },
                    { icon: <Sparkles className="w-10 h-10" />, name: "Ojas", sub: "Radiance", link: "/guide/ojas", color: "text-emerald-400", desc: "The ultimate essence of pure immunity." }
                ].map((mech) => (
                    <Link key={mech.name} href={mech.link} className="group">
                        <div className="space-y-6 text-center">
                            <div className="w-24 h-24 bg-white/5 border border-white/10 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl group-hover:border-white/30 transition-all">
                                <span className={mech.color}>{mech.icon}</span>
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors uppercase tracking-tight">{mech.name}</h4>
                                <p className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-4">{mech.sub}</p>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">{mech.desc}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Routine & Cycles */}
        <section className="py-24 px-6 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                  <h2 className="text-3xl md:text-6xl font-black text-forest tracking-tighter">Sync Your Life <br />With Nature</h2>
                  <div className="space-y-8">
                      <Link href="/guide/dinacharya" className="flex gap-6 group items-start p-6 rounded-3xl hover:bg-emerald-50/50 transition-all">
                          <Sun className="w-8 h-8 text-gold shrink-0" />
                          <div>
                              <h4 className="text-xl font-bold text-forest">Dinacharya</h4>
                              <p className="text-sm text-slate-500">The Daily Routine. Biological repair via circadian alignment.</p>
                          </div>
                      </Link>
                      <Link href="/guide/ritucharya" className="flex gap-6 group items-start p-6 rounded-3xl hover:bg-emerald-50/50 transition-all">
                          <Moon className="w-8 h-8 text-indigo-400 shrink-0" />
                          <div>
                              <h4 className="text-xl font-bold text-forest">Ritucharya</h4>
                              <p className="text-sm text-slate-500">The Seasonal Protocol. Adaptation during environmental shifts.</p>
                          </div>
                      </Link>
                  </div>
              </div>
              <div className="bg-forest p-10 md:p-14 rounded-[4rem] text-white shadow-3xl shadow-forest/20">
                  <h4 className="text-2xl font-black mb-8 italic uppercase tracking-tighter">Biological Rhythms</h4>
                  <div className="space-y-6 text-sm font-bold">
                      {[
                          { time: "6A-10A", label: "Kapha • Stability", color: "text-emerald-300" },
                          { time: "10A-2P", label: "Pitta • Digestion", color: "text-orange-300" },
                          { time: "2P-6P", label: "Vata • Creative", color: "text-indigo-300" }
                      ].map((slot, i) => (
                          <div key={i} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0 last:pb-0">
                              <span className={`${slot.color} uppercase tracking-widest text-xs`}>{slot.time}</span>
                              <span className="font-black text-base">{slot.label}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
        </section>

        {/* Semantic Glossary */}
        <section className="py-32 px-6 max-w-5xl mx-auto relative z-10 bg-white rounded-[4rem] border border-slate-100 mb-24">
          <div className="text-center mb-16 px-6">
              <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter mb-4 italic">Core Concepts</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Ayurvedic Encyclopedia</p>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12 px-8">
              {TERMINOLOGY.map((item, idx) => (
                  <div key={idx} className="group border-b border-slate-50 pb-6 last:border-0">
                      <dt className="font-black text-forest flex items-center gap-2 text-lg mb-2">
                        <Link href={item.link} className="hover:text-emerald-500 transition-colors flex items-center gap-2">
                           {item.term} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                      </dt>
                      <dd className="text-sm text-slate-500 leading-relaxed font-medium">
                          {item.definition}
                      </dd>
                  </div>
              ))}
          </dl>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto overflow-hidden bg-forest p-16 md:p-24 rounded-[4rem] text-white shadow-3xl shadow-forest/20">
            <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter mb-8 italic uppercase">
              Map Your Physiology
            </h2>
            <p className="text-emerald-100 opacity-80 font-bold mb-12 uppercase tracking-widest text-sm max-w-md mx-auto">
              Convert these concepts into a clinical biological plan.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-3 bg-white text-forest px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all"
                >
                    Get Assessment <ArrowRight className="w-5 h-5" />
                </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
