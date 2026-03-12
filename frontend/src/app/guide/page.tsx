"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Wind, Flame, Droplets, Zap, Shield, Sparkles, Sun, Moon, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const TERMINOLOGY = [
  { term: "Prakriti", definition: "Your unique genetic constitution or 'nature' determined at conception. It represents your permanent baseline of health." },
  { term: "Vikriti", definition: "Your current state of imbalance. Ayurveda aims to move you from your Vikriti back to your original Prakriti." },
  { term: "Mahabhutas", definition: "The 'Five Great Elements'—Space (Akasha), Air (Vayu), Fire (Agni), Water (Jala), and Earth (Prithvi)." },
  { term: "Gunas", definition: "The three fundamental qualities of nature: Sattva (purity/clarity), Rajas (activity/passion), and Tamas (inertia/dullness)." },
  { term: "Dhatus", definition: "The seven layers of tissues in the body, ranging from plasma (Rasa) and blood (Rakta) to reproductive tissue (Shukra)." },
  { term: "Prana", definition: "The vital life force that governs all physical and mental functions. It is the breath of life." },
  { term: "Srotas", definition: "The channels through which nutrients, waste, and energy flow. Blocked Srotas lead to disease." },
  { term: "Agni", definition: "Biological fire. It governs digestion, metabolism, and the transformation of food into energy and consciousness." },
  { term: "Ama", definition: "Undigested food and metabolic waste. Accumulation of Ama is considered the root cause of most imbalances." },
  { term: "Ojas", definition: "The essence of vitality, immunity, and spiritual strength. It is the end product of perfect digestion." },
];

export default function GuidePage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[120px] -mr-40 -mt-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -ml-40 pointer-events-none" />

      {/* Hero Section */}
      <header className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 max-w-7xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span className="block text-xs font-black text-forest/60 uppercase tracking-[0.4em] mb-6">
            The Science of Life
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Mastering Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
              Biological Rhythm
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Ayurveda is not a diet or a trend. It is a 5,000-year-old system of physiology that maps your health to the rhythms of nature. 
          </p>
        </motion.div>
      </header>

      {/* The Core Concept: Prakriti & Vikriti */}
      <section className="py-20 px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
            >
                <h2 className="text-3xl font-black text-forest tracking-tight">Prakriti vs. Vikriti</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                    Most health advice treats everyone as a biological average. Ayurveda recognizes your <strong>Prakriti</strong>—your unique genetic blueprint. 
                </p>
                <p className="text-slate-600 leading-relaxed font-medium">
                    When stress, poor sleep, or seasonal shifts pull you away from this baseline, you enter a state of <strong>Vikriti</strong> (imbalance). Dinaveda uses AI to track these microscopic drifts and bring you back to your center.
                </p>
                <div className="flex items-center gap-4 pt-4">
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-forest leading-none">Baseline</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Prakriti</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-emerald-500 leading-none">Imbalance</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Vikriti</span>
                    </div>
                </div>
            </motion.div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-premium relative overflow-hidden group">
                 <div className="absolute inset-0 bg-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                 <BookOpen className="w-12 h-12 text-forest mb-6" />
                 <h3 className="text-xl font-black text-forest mb-4">The Definition of Health</h3>
                 <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                    "Sama dosha sama agnischa sama dhatu mala kriya..."
                 </p>
                 <p className="text-sm font-medium text-slate-500 leading-relaxed mt-4">
                    Health is a state where Doshas, digestive fire (Agni), tissues (Dhatus), and waste products (Malas) are in balance, accompanied by a happy soul and clear mind.
                 </p>
            </div>
        </div>
      </section>

      {/* The Three Doshas */}
      <section className="py-24 px-6 bg-white border-y border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-xs font-black text-gold uppercase tracking-[0.4em] mb-4">The Three Pillars</h2>
                <h3 className="text-3xl md:text-5xl font-black text-forest tracking-tighter">The Biological Humors (Doshas)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* VATA */}
                <motion.div whileHover={{ y: -8 }} className="p-10 rounded-[2.5rem] border border-slate-100 bg-[#FBFDFD] group">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-8">
                        <Wind className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black text-forest mb-4">Vata</h4>
                    <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-6">Space + Air • The Principle of Movement</p>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                        Governs the nervous system, breathing, and circulation. 
                        <strong> Signs of balance:</strong> Alertness, creativity, flexibility. 
                        <strong> Signs of imbalance:</strong> Anxiety, insomnia, bloating, dry skin.
                    </p>
                    <ul className="space-y-2 text-xs font-bold text-slate-500">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-200" /> Season: Early Winter / Fall</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-200" /> Element: Vayu & Akasha</li>
                    </ul>
                </motion.div>

                {/* PITTA */}
                <motion.div whileHover={{ y: -8 }} className="p-10 rounded-[2.5rem] border border-slate-100 bg-[#FDFBF9] group">
                    <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-8">
                        <Flame className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black text-forest mb-4">Pitta</h4>
                    <p className="text-xs font-black text-orange-500 uppercase tracking-widest mb-6">Fire + Water • The Principle of Transformation</p>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                        Governs digestion, metabolism, and body temperature.
                        <strong> Signs of balance:</strong> Intelligence, strong digestion, leadership.
                        <strong> Signs of imbalance:</strong> Irritability, inflammation, acidity, skin rash.
                    </p>
                    <ul className="space-y-2 text-xs font-bold text-slate-500">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-200" /> Season: Summer</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-200" /> Element: Agni & Jala</li>
                    </ul>
                </motion.div>

                {/* KAPHA */}
                <motion.div whileHover={{ y: -8 }} className="p-10 rounded-[2.5rem] border border-slate-100 bg-[#F9FDFB] group">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-8">
                        <Droplets className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black text-forest mb-4">Kapha</h4>
                    <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-6">Water + Earth • The Principle of Cohesion</p>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                        Governs physical structure, immunity, and lubrication.
                        <strong> Signs of balance:</strong> Strength, calmness, endurance, compassion.
                        <strong> Signs of imbalance:</strong> Lethargy, congestion, weight gain, attachment.
                    </p>
                    <ul className="space-y-2 text-xs font-bold text-slate-500">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-200" /> Season: Spring / Late Winter</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-200" /> Element: Prithvi & Jala</li>
                    </ul>
                </motion.div>
            </div>
        </div>
      </section>

      {/* The Dynamic Trio: Agni, Ama, Ojas */}
      <section className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter text-center mb-16">The Mechanics of Vitality</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-orange-500/20">
                    <Zap className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-forest">Agni</h4>
                <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">The Metabolic Fire</p>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                    Healthy Agni equals longevity. It determines how well you extract nutrients from food and experiences. Weak Agni creates Ama.
                </p>
            </div>

            <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-slate-800/20">
                    <Shield className="w-10 h-10 transform scale-x-[-1]" />
                </div>
                <h4 className="text-2xl font-black text-forest">Ama</h4>
                <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">The Residual Toxins</p>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                    The root cause of dullness and fatigue. Ama is the sludge that blocks your body's intelligent channels (Srotas).
                </p>
            </div>

            <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                    <Sparkles className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-forest">Ojas</h4>
                <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">The Essence of Radiance</p>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                    The ultimate end-product of perfect digestion. Ojas is responsible for immunity, glowing skin, and a stable mind.
                </p>
            </div>
        </div>
      </section>

      {/* Routine & Seasons */}
      <section className="py-24 px-6 bg-forest text-white relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-40" />
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Your Health is <br /> Time-Dependent</h2>
                <div className="space-y-8">
                    <div className="flex gap-4 group">
                        <Sun className="w-8 h-8 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                            <h4 className="text-xl font-bold mb-2">Dinacharya</h4>
                            <p className="text-sm text-emerald-100/70 leading-relaxed">The Daily Routine. Aligning your actions—waking, eating, sleeping—with the sun's cycle to optimize biological repair.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 group">
                        <Moon className="w-8 h-8 text-indigo-300 shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                            <h4 className="text-xl font-bold mb-2">Ritucharya</h4>
                            <p className="text-sm text-emerald-100/70 leading-relaxed">The Seasonal Protocol. Adjusting your habits as environmental elements shift (Vata season, Pitta season, Kapha season).</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/10">
                <h4 className="text-2xl font-black mb-6">Ayurvedic Biological Clock</h4>
                <div className="space-y-6 text-sm font-bold">
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <span className="text-emerald-300 uppercase tracking-widest text-[10px]">6 AM - 10 AM</span>
                        <span>Kapha Window • Stability</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <span className="text-orange-300 uppercase tracking-widest text-[10px]">10 AM - 2 PM</span>
                        <span>Pitta Window • Peak Digestion</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <span className="text-indigo-300 uppercase tracking-widest text-[10px]">2 PM - 6 PM</span>
                        <span>Vata Window • Creativity</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-emerald-300 uppercase tracking-widest text-[10px]">6 PM - 10 PM</span>
                        <span>Kapha Window • Rest</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* SEO Terminology Glossary */}
      <section className="py-24 px-6 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-forest tracking-tight mb-4">Ayurvedic Glossary</h2>
            <p className="text-slate-500 font-medium">Fundamental concepts for a holistic understanding.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {TERMINOLOGY.map((item, idx) => (
                <div key={idx} className="space-y-2 group">
                    <h5 className="font-black text-forest flex items-center gap-2">
                        <Leaf className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item.term}
                    </h5>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {item.definition}
                    </p>
                </div>
            ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center relative z-10 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-forest tracking-tighter mb-8 italic">
                Ready to find your center?
            </h2>
            <p className="text-slate-500 font-bold mb-12 uppercase tracking-[0.2em] text-xs">
                Takes 2 minutes • No cost • Instant insights
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-3 bg-forest text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-forest/20 transition-all hover:bg-forest/90"
                >
                    Determine Your Prakriti <ArrowRight className="w-5 h-5" />
                </Link>
            </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
