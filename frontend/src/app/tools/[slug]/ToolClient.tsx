"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RefreshCw, Sparkles, ShieldCheck, Info, CheckCircle2, Layout, Zap, Flame, Wind } from "lucide-react";
import { CALCULATORS, CalculatorId } from "@/data/calculators";
import RhythmClock from "@/components/RhythmClock";
import { computeCalculatorResult } from "@/engine/calculatorEngine";
import { bridgeCalculatorToState } from "@/engine/calculatorBridge";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";

interface ToolClientProps {
  slug: string;
}

const COLOR_MAP = {
  air: "bg-blue-600",
  fire: "bg-orange-600",
  water: "bg-teal-600",
  earth: "bg-emerald-600",
  space: "bg-indigo-600"
};

export default function ToolClient({ slug }: ToolClientProps) {
  const config = CALCULATORS[slug as CalculatorId];
  const { state, updateState, isLoaded } = usePhysiologyState();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const totalSteps = config.questions.length;
  const progress = ((currentStep) / totalSteps) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinishing(true);
      setTimeout(() => {
        setIsFinishing(false);
        setShowResult(true);
      }, 1500);
    }
  };

  const { score, result, dominantDosha } = useMemo(() => {
    if (!showResult || answers.length < totalSteps) return { score: null, result: null, dominantDosha: null };
    return computeCalculatorResult(config, answers);
  }, [showResult, answers, config, totalSteps]);

  // Sync with Physiology Engine
  useEffect(() => {
    if (showResult && score && isLoaded) {
      const updates = bridgeCalculatorToState(state, config.id, { score, result: result!, dominantDosha: dominantDosha! });
      if (Object.keys(updates).length > 0) {
        updateState({ ...state, ...updates });
      }
    }
  }, [showResult, score, isLoaded, config.id]);

  const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": config.title,
    "description": config.description,
    "hasPart": config.questions.map(q => ({
      "@type": "Question",
      "name": q.text,
      "suggestedAnswer": q.options.map(o => ({
        "@type": "Answer",
        "text": o.label
      }))
    }))
  };

  if (showResult && result && score) {
    const isRhythm = slug === 'daily-rhythm-analyzer';
    const isDosha = slug === 'dosha-quiz';
    const themeColor = COLOR_MAP[config.color];
    
    return (
      <div className="bg-[#FAFBFB] text-slate-800 min-h-screen relative font-sans">
        <nav className="p-6 border-b border-slate-50 sticky top-0 bg-white/80 backdrop-blur-md z-[70]">
           <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link href="/tools" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-forest transition-all">
                <ArrowLeft className="w-4 h-4" /> All Tools
              </Link>
              <span className="font-black text-forest text-xl tracking-tighter italic">Dinaveda Tools</span>
              <div className="w-20" />
           </div>
        </nav>

        <main className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[4rem] border border-slate-100 shadow-premium overflow-hidden"
          >
            <div className={`p-12 md:p-20 ${themeColor} text-white`}>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                    Analysis Result
                  </span>
                  <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 leading-tight">
                    {isDosha ? `${dominantDosha} Type` : result.title}
                  </h1>
                  <p className="text-xl text-white/80 font-medium max-w-xl">
                    {result.explanation}
                  </p>
                </div>
                {isRhythm && (
                  <div className="w-64 md:w-80 shrink-0">
                    {(() => {
                      // Map array indices to the hours used for the clock
                      const sleepIdx = answers[0] ?? 1;
                      const wakeIdx = answers[1] ?? 1;
                      const mealIdx = answers[3] ?? 0;

                      const sleepH = [21.5, 22.5, 23.5][sleepIdx];
                      const wakeH = [5, 7, 9][wakeIdx];
                      const mealH = [12, 16, 20][mealIdx];

                      return <RhythmClock sleepHour={sleepH} wakeHour={wakeH} mealHour={mealH} />;
                    })()}
                  </div>
                )}
              </div>
            </div>

            <div className="p-12 md:p-20 space-y-16">
               {isRhythm && (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { name: "Sleep Rhythm", score: score.sleep, icon: Wind },
                      { name: "Digestive Rhythm", score: score.digestion, icon: Flame },
                      { name: "Energy Rhythm", score: score.energy, icon: Zap }
                    ].map((sys) => (
                      <div key={sys.name} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center">
                         <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                            <sys.icon className="w-6 h-6 text-forest" />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{sys.name}</span>
                         <span className="text-4xl font-black text-forest">{Math.round(sys.score || 0)}</span>
                      </div>
                    ))}
                 </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-forest flex items-center gap-3">
                      <Layout className="w-5 h-5 text-emerald-500" />
                      Ayurvedic Insight
                    </h3>
                    <p className="text-slate-600 font-medium leading-relaxed italic pr-6 group">
                      "{result.ayuPerspective}"
                    </p>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-forest flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      Clinical Recommendations
                    </h3>
                    <ul className="space-y-4">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="flex gap-4 text-sm font-bold text-slate-500 items-start">
                          <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] shrink-0">{i+1}</span>
                          {rec}
                        </li>
                      ))}
                      {result.recommendedProtocol && (
                        <li className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 mt-6 group">
                          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">Recommended System Protocol</p>
                          <Link href={`/protocol/${result.recommendedProtocol}`} className="flex items-center justify-between group-hover:underline">
                            <span className="text-sm font-black text-forest">{result.recommendedProtocol.replace(/-/g, ' ').toUpperCase()}</span>
                            <ArrowRight className="w-4 h-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
               </div>

               {/* Lead Gen CTA */}
               <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 blur-[150px] opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                  <Sparkles className="w-12 h-12 text-emerald-400 mx-auto mb-8" />
                  <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-none italic italic">Identity is Time.</h3>
                  <p className="text-slate-400 font-medium mb-12 max-w-lg mx-auto text-base leading-relaxed">
                    This analysis is a static baseline. The Dinaveda health OS measures your specific pulse, sleep depth, and digestive fire in real-time to generate a protocol that breathes with you.
                  </p>
                  <Link 
                    href="/login" 
                    className="inline-flex items-center gap-4 bg-emerald-500 text-slate-900 px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl transition-all hover:bg-white hover:scale-105 active:scale-95"
                  >
                    Activate Your Health OS <ArrowRight className="w-5 h-5" />
                  </Link>
               </div>

               <button 
                 onClick={() => {
                   setCurrentStep(0);
                   setShowResult(false);
                   setAnswers([]);
                 }}
                 className="w-full py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:text-forest transition-all"
               >
                 <RefreshCw className="w-4 h-4" /> Recalculate Your Rhythm
               </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  const currentQuestion = config.questions[currentStep];

  return (
    <div className="bg-[#FAFBFB] text-slate-800 min-h-screen relative font-sans overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-forest/[0.03] rounded-full -mr-40 -mt-40 blur-[150px]" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-[120px] -ml-40" />
      </div>

      <nav className="p-6 border-b border-white sticky top-0 bg-white/40 backdrop-blur-md z-[70]">
         <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-black uppercase tracking-widest">
            <Link href="/tools" className="flex items-center gap-2 text-slate-400 hover:text-forest transition-all">
              <ArrowLeft className="w-4 h-4" /> Exit Test
            </Link>
            <div className="flex items-center gap-4 text-slate-300">
               <span>Step {currentStep + 1} of {totalSteps}</span>
               <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${progress}%` }} className="h-full bg-forest" />
               </div>
            </div>
         </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-24 md:py-32 min-h-[60vh] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {isFinishing ? (
            <motion.div 
               key="finishing"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center space-y-8"
            >
               <div className="w-20 h-20 rounded-3xl bg-forest/5 flex items-center justify-center mx-auto mb-12">
                  <RefreshCw className="w-10 h-10 text-forest animate-spin" />
               </div>
               <h2 className="text-3xl md:text-5xl font-black text-forest tracking-tighter italic">Compiling Biological <br /> Data Points...</h2>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Synthesizing Clinical Heuristics</p>
            </motion.div>
          ) : (
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-forest/40">Step {currentStep + 1} Question</span>
                <h1 className="text-3xl md:text-5xl font-black text-forest tracking-tighter leading-tight text-balance">
                  {currentQuestion.text}
                </h1>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className="p-8 rounded-[2.5rem] bg-white border-2 border-slate-50 text-left hover:border-forest hover:bg-forest hover:text-white transition-all duration-300 group shadow-sm hover:shadow-xl"
                  >
                    <div className="flex justify-between items-center ring-0">
                       <span className="text-base md:text-xl font-bold">{option.label}</span>
                       <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white/20 transition-all">
                          <CheckCircle2 className="w-5 h-5" />
                       </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <div className="max-w-2xl mx-auto px-6 pb-24 text-center">
         <div className="flex items-center justify-center gap-8 opacity-40">
           <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
             <ShieldCheck className="w-3 h-3" /> Anonymous Test
           </div>
           <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
             <Info className="w-3 h-3" /> External Reference Only
           </div>
         </div>
      </div>

      </div>
  );
}
