"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const TOPICS = [
  // Concepts
  { name: "Ayurveda Guide", slug: "index", category: "guide" },
  { name: "Doshas", slug: "doshas", category: "guide" },
  { name: "Prakriti", slug: "prakriti", category: "guide" },
  { name: "Agni", slug: "agni", category: "guide" },
  { name: "Ama", slug: "ama", category: "guide" },
  { name: "Ojas", slug: "ojas", category: "guide" },

  // Symptoms
  { name: "Bloating", slug: "bloating", category: "health" },
  { name: "Fatigue", slug: "low-energy", category: "health" },
  { name: "Brain Fog", slug: "brain-fog", category: "health" },
  { name: "Anxiety", slug: "anxiety", category: "health" },
  { name: "Insomnia", slug: "insomnia", category: "health" },

  // Tools
  { name: "Dosha Quiz", slug: "dosha-quiz", category: "tool" },
  { name: "Agni Strength Test", slug: "agni-test", category: "tool" },
  { name: "Ama Checker", slug: "ama-checker", category: "tool" },
  { name: "Daily Rhythm Analyzer", slug: "daily-rhythm-analyzer", category: "tool" },

  // Mechanisms
  { name: "Weak Agni", slug: "weak-agni", category: "cause" },
  { name: "Ama Flush", slug: "ama-accumulation", category: "cause" },
  { name: "Vata Drift", slug: "vata-aggravation", category: "cause" },

  // Routines
  { name: "Morning Clinical", slug: "morning-clinical", category: "routine" },
  { name: "Evening Clinical", slug: "evening-clinical", category: "routine" },
  { name: "Digestion Reset", slug: "digestion-reset", category: "protocol" },
  { name: "Nervous Grounding", slug: "vata-calming", category: "protocol" },
];

export default function TopicHubFooter() {
  return (
    <footer className="bg-white border-t border-slate-100 py-24 px-6 overflow-hidden relative z-[60]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          
          {/* Guide Cluster */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-forest">Education</h4>
            <div className="flex flex-col gap-3">
              {TOPICS.filter(t => t.category === "guide").map(topic => (
                <Link key={topic.slug} href={`/guide/${topic.slug === 'index' ? '' : topic.slug}`} className="text-xs font-bold text-slate-400 hover:text-forest transition-colors">
                  {topic.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Tools Cluster */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-forest">Diagnostic Tools</h4>
            <div className="flex flex-col gap-3">
              {TOPICS.filter(t => t.category === "tool").map(topic => (
                <Link key={topic.slug} href={`/tools/${topic.slug}`} className="text-xs font-bold text-slate-900 hover:text-forest transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {topic.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Symptoms Cluster */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-forest">Symptom Hub</h4>
            <div className="flex flex-col gap-3">
              {TOPICS.filter(t => t.category === "health").map(topic => (
                <Link key={topic.slug} href={`/health/${topic.slug}`} className="text-xs font-bold text-slate-400 hover:text-forest transition-colors">
                  {topic.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mechanisms Cluster */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-forest">Biology</h4>
            <div className="flex flex-col gap-3">
              {TOPICS.filter(t => t.category === "cause").map(topic => (
                <Link key={topic.slug} href={`/cause/${topic.slug}`} className="text-xs font-bold text-slate-400 hover:text-forest transition-colors">
                  {topic.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Solutions Cluster */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-forest">Interventions</h4>
            <div className="flex flex-col gap-3">
              {TOPICS.filter(t => ["protocol", "routine"].includes(t.category)).map(topic => (
                <Link key={topic.slug} href={`/${topic.category}/${topic.slug}`} className="text-xs font-bold text-slate-400 hover:text-forest transition-colors">
                  {topic.name}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Dynamic SEO Tags */}
        <div className="mt-20 pt-12 border-t border-slate-50 flex flex-wrap gap-2 justify-center">
           {["vata", "pitta", "kapha"].map(dosha => (
             <Link key={dosha} href={`/guide/doshas`} className="px-4 py-1.5 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 hover:bg-forest hover:text-white transition-all uppercase tracking-widest">
                {dosha} constitution
             </Link>
           ))}
        </div>
      </div>
    </footer>
  );
}
