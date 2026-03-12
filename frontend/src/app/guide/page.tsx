"use client";

import Image from "next/image";
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
  { term: "Tejas", definition: "The subtle essence of Agni. It governs intelligence, discernment, and the radiance of the body." },
  { term: "Tanmatras", definition: "The five subtle elements or sensory potentials: Sound, Touch, Sight, Taste, and Smell." },
  { term: "Shad Ritu", definition: "The six seasons of the Ayurvedic calendar: Shishira, Vasanta, Grishma, Varsha, Sharad, and Hemanta." },
  { term: "Malas", definition: "The waste products of the body (urine, feces, sweat). Efficient elimination of Malas is vital for health." },
  { term: "Abhyanga", definition: "The practice of self-oil massage. A fundamental protocol for calming Vata and lubricating the tissues." },
  { term: "Sadhana", definition: "Disciplined practice. In Ayurveda, this refers to the daily spiritual and physical habits that sustain health." },
  { term: "Pathya", definition: "That which is suitable for the channels. It refers to the correct diet and lifestyle protocols for your state." },
];

export default function GuidePage() {
  return (
    <div className="bg-[#F8FAF9] text-slate-800 min-h-screen relative font-sans overflow-x-hidden selection:bg-forest/20 selection:text-forest">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[120px] -mr-40 -mt-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -ml-40 pointer-events-none" />

      {/* Top Navigation */}
      <nav className="relative z-[70] p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="font-black text-forest text-2xl tracking-tighter flex items-center gap-2 group">
          <div className="w-8 h-8 relative group-hover:scale-110 transition-transform">
            <Image src="/logo.png" alt="Dinaveda" fill sizes="32px" className="object-contain" />
          </div>
          Dinaveda
        </Link>
        <Link 
          href="/login" 
          className="text-xs font-black text-forest uppercase tracking-widest border-b-2 border-forest/20 hover:border-forest transition-all pb-1"
        >
          Start Assessment
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="pt-16 pb-16 md:pt-24 md:pb-24 px-6 max-w-7xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <span className="block text-xs font-black text-forest/60 uppercase tracking-[0.4em] mb-6">
            Complete Education
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter mb-8 leading-[1.05]">
            Ayurveda Guide: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-emerald-500">
              Doshas, Prakriti & Rhythm
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed mb-12">
            An ancient perspective on modern biology. Learn how space, air, fire, water, and earth shape your unique constitutional health and daily vitality.
          </p>
        </motion.div>
      </header>

      {/* NEW: The Five Elements (Mahabhutas) Diagram Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 overflow-hidden">
        <div className="text-center mb-16">
            <h2 className="text-xs font-black text-forest/40 uppercase tracking-[0.4em] mb-4">Foundation</h2>
            <h3 className="text-3xl md:text-5xl font-black text-forest tracking-tighter">The Five Great Elements</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
            {[
                { name: "Akasha", en: "Space", icon: <Sun className="w-6 h-6" />, color: "bg-indigo-50 text-indigo-500", desc: "The field of potential. Emptiness." },
                { name: "Vayu", en: "Air", icon: <Wind className="w-6 h-6" />, color: "bg-blue-50 text-blue-500", desc: "The principle of movement and flow." },
                { name: "Agni", en: "Fire", icon: <Flame className="w-6 h-6" />, color: "bg-orange-50 text-orange-500", desc: "The principle of transformation." },
                { name: "Jala", en: "Water", icon: <Droplets className="w-6 h-6" />, color: "bg-emerald-50 text-emerald-500", desc: "The principle of cohesion & fluid." },
                { name: "Prithvi", en: "Earth", icon: <Leaf className="w-6 h-6" />, color: "bg-amber-50 text-amber-500", desc: "The principle of structure & density." },
            ].map((el, i) => (
                <motion.div 
                    key={el.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm text-center group hover:shadow-xl hover:shadow-slate-200/50 transition-all"
                >
                    <div className={`w-12 h-12 rounded-2xl ${el.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        {el.icon}
                    </div>
                    <h4 className="text-sm font-black text-forest tracking-tighter mb-1">{el.name}</h4>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 block">{el.en}</span>
                    <p className="text-[10px] font-medium text-slate-500 leading-tight">{el.desc}</p>
                </motion.div>
            ))}
        </div>
      </section>

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
                    When stress, poor sleep, or seasonal shifts pull you away from this baseline, you enter a state of <strong>Vikriti</strong> (imbalance). 
                    <Link href="/login" className="text-forest underline ml-1 font-bold">Discover your Prakriti with Dinaveda →</Link>
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
      <section className="py-24 px-6 bg-white border-y border-slate-100 relative z-10 text-center md:text-left">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-xs font-black text-gold uppercase tracking-[0.4em] mb-4">The Three Pillars</h2>
                <h3 className="text-3xl md:text-5xl font-black text-forest tracking-tighter">The Biological Humors (Doshas)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* VATA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }} 
                    className="p-10 rounded-[2.5rem] border border-slate-100 bg-[#FBFDFD] group"
                >
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-8 mx-auto md:mx-0">
                        <Wind className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black text-forest mb-4">Vata</h4>
                    <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-6 tracking-widest">Space + Air • Movement</p>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                        Governs the nervous system, breathing, and circulation. 
                        <strong> Signs of balance:</strong> Alertness, creativity, flexibility. 
                        <strong> Signs of imbalance:</strong> Anxiety, insomnia, bloating, dry skin.
                    </p>
                    <ul className="space-y-2 text-xs font-bold text-slate-500">
                        <li className="flex items-center gap-2 justify-center md:justify-start"><div className="w-1.5 h-1.5 rounded-full bg-indigo-200" /> Season: Early Winter / Fall</li>
                        <li className="flex items-center gap-2 justify-center md:justify-start"><div className="w-1.5 h-1.5 rounded-full bg-indigo-200" /> Element: Vayu & Akasha</li>
                    </ul>
                </motion.div>

                {/* PITTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -8 }} 
                    className="p-10 rounded-[2.5rem] border border-slate-100 bg-[#FDFBF9] group"
                >
                    <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-8 mx-auto md:mx-0">
                        <Flame className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black text-forest mb-4">Pitta</h4>
                    <p className="text-xs font-black text-orange-500 uppercase tracking-widest mb-6 tracking-widest">Fire + Water • Transformation</p>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                        Governs digestion, metabolism, and body temperature.
                        <strong> Signs of balance:</strong> Intelligence, strong digestion, leadership.
                        <strong> Signs of imbalance:</strong> Irritability, inflammation, acidity, skin rash.
                    </p>
                    <ul className="space-y-2 text-xs font-bold text-slate-500">
                        <li className="flex items-center gap-2 justify-center md:justify-start"><div className="w-1.5 h-1.5 rounded-full bg-orange-200" /> Season: Summer</li>
                        <li className="flex items-center gap-2 justify-center md:justify-start"><div className="w-1.5 h-1.5 rounded-full bg-orange-200" /> Element: Agni & Jala</li>
                    </ul>
                </motion.div>

                {/* KAPHA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -8 }} 
                    className="p-10 rounded-[2.5rem] border border-slate-100 bg-[#F9FDFB] group sm:col-span-2 lg:col-span-1"
                >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-8 mx-auto md:mx-0">
                        <Droplets className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black text-forest mb-4">Kapha</h4>
                    <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-6 tracking-widest">Water + Earth • Cohesion</p>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                        Governs physical structure, immunity, and lubrication.
                        <strong> Signs of balance:</strong> Strength, calmness, endurance, compassion.
                        <strong> Signs of imbalance:</strong> Lethargy, congestion, weight gain, attachment.
                    </p>
                    <ul className="space-y-2 text-xs font-bold text-slate-500">
                        <li className="flex items-center gap-2 justify-center md:justify-start"><div className="w-1.5 h-1.5 rounded-full bg-emerald-200" /> Season: Spring / Late Winter</li>
                        <li className="flex items-center gap-2 justify-center md:justify-start"><div className="w-1.5 h-1.5 rounded-full bg-emerald-200" /> Element: Prithvi & Jala</li>
                    </ul>
                </motion.div>
            </div>
        </div>
      </section>

      {/* The Dynamic Trio: Agni, Ama, Ojas */}
      <section className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter text-center mb-16">The Mechanics of Vitality</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { icon: <Zap className="w-10 h-10" />, name: "Agni", sub: "Metabolic Fire", color: "bg-orange-500", desc: "Healthy Agni equals longevity. It determines how well you extract nutrients from food and experiences. Weak Agni creates Ama." },
                { icon: <Shield className="w-10 h-10 transform scale-x-[-1]" />, name: "Ama", sub: "Residual Toxins", color: "bg-slate-800", desc: "The root cause of dullness and fatigue. Ama is the sludge that blocks your body's intelligent channels (Srotas)." },
                { icon: <Sparkles className="w-10 h-10" />, name: "Ojas", sub: "Essence of Radiance", color: "bg-emerald-500", desc: "The ultimate end-product of perfect digestion. Ojas is responsible for immunity, glowing skin, and a stable mind." }
            ].map((mech, i) => (
                <motion.div 
                    key={mech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-6 text-center"
                >
                    <div className={`w-20 h-20 ${mech.color} text-white rounded-full flex items-center justify-center mx-auto shadow-xl`}>
                        {mech.icon}
                    </div>
                    <h4 className="text-2xl font-black text-forest">{mech.name}</h4>
                    <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">{mech.sub}</p>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">
                        {mech.desc}
                    </p>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Routine & Seasons */}
      <section className="py-24 px-6 bg-forest text-white relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 blur-[100px] opacity-10 pointer-events-none -mr-40" />
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Your Health is <br /> Time-Dependent</h2>
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-4 group items-center md:items-start">
                        <Sun className="w-8 h-8 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                            <h4 className="text-xl font-bold mb-2">Dinacharya</h4>
                            <p className="text-sm text-emerald-100/70 leading-relaxed">The Daily Routine. Aligning your actions—waking, eating, sleeping—with the sun's cycle to optimize biological repair.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 group items-center md:items-start">
                        <Moon className="w-8 h-8 text-indigo-300 shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                            <h4 className="text-xl font-bold mb-2">Ritucharya</h4>
                            <p className="text-sm text-emerald-100/70 leading-relaxed">The Seasonal Protocol. Adjusting your habits as environmental elements shift (Vata season, Pitta season, Kapha season).</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/10">
                <h4 className="text-2xl font-black mb-6 text-center md:text-left">Ayurvedic Biological Clock</h4>
                <div className="space-y-6 text-sm font-bold">
                    {[
                        { time: "6 AM - 10 AM", label: "Kapha Window • Stability", color: "text-emerald-300" },
                        { time: "10 AM - 2 PM", label: "Pitta Window • Peak Digestion", color: "text-orange-300" },
                        { time: "2 PM - 6 PM", label: "Vata Window • Creativity", color: "text-indigo-300" },
                        { time: "6 PM - 10 PM", label: "Kapha Window • Rest", color: "text-emerald-300" }
                    ].map((slot, i) => (
                        <div key={i} className="flex flex-col md:flex-row justify-between items-center gap-2 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                            <span className={`${slot.color} uppercase tracking-[0.2em] text-[10px]`}>{slot.time}</span>
                            <span>{slot.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* SEO Terminology Glossary: Refactored with semantic <dl> */}
      <section className="py-24 px-6 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-forest tracking-tight mb-4">Ayurvedic Glossary</h2>
            <p className="text-slate-500 font-medium italic">Key terminology used within the platform.</p>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {TERMINOLOGY.map((item, idx) => (
                <div key={idx} className="space-y-2 group">
                    <dt className="font-black text-forest flex items-center gap-2 text-base">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                        {item.term}
                    </dt>
                    <dd className="text-sm text-slate-500 leading-relaxed font-medium">
                        {item.definition}
                    </dd>
                </div>
            ))}
        </dl>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center relative z-10 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto overflow-hidden">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black text-forest tracking-tighter mb-8 italic"
            >
                Ready to find your center?
            </motion.h2>
            <p className="text-slate-500 font-bold mb-12 uppercase tracking-[0.2em] text-xs">
                Takes 2 minutes • No cost • Instant insights
            </p>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
            >
                <Link
                    href="/login"
                    className="inline-flex items-center gap-3 bg-forest text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-forest/20 transition-all hover:bg-forest/90"
                >
                    Discover Your Ayurvedic Constitution <ArrowRight className="w-5 h-5" />
                </Link>
            </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
