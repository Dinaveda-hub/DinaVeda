import { useState } from "react";
import { motion } from "framer-motion";
import { User, BrainCircuit, ShieldCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { PrakritiEngine } from "@/engine/prakritiEngine";
import prakritiQuizData from "@/data/prakriti_questions.json";
import { useRouter } from "next/navigation";

interface Option {
    label: string;
    signal: string;
    dosha_effect: { vata: number; pitta: number; kapha: number };
}

interface Question {
    question_id: string;
    question: string;
    domain?: string;
    options: Option[];
}

const quizFlow = prakritiQuizData as Question[];

// Move engine outside to avoid recreation and keep it singleton-like
const engine = new PrakritiEngine();

interface PrakritiOnboardingProps {
    onComplete: (metrics: any) => void;
}

export default function PrakritiOnboarding({ onComplete }: PrakritiOnboardingProps) {
    const router = useRouter();
    
    // Quiz State
    const [isIdentified, setIsIdentified] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: '', age: '', gender: '' });
    const [currentStep, setCurrentStep] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, Option>>({});
    const [constitution, setConstitution] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const calculateResult = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const answersArray = Object.values(selectedAnswers) as Option[];
        const finalScores = answersArray.reduce((acc: { vata: number; pitta: number; kapha: number }, opt: Option) => {
            acc.vata += opt.dosha_effect.vata;
            acc.pitta += opt.dosha_effect.pitta;
            acc.kapha += opt.dosha_effect.kapha;
            return acc;
        }, { vata: 0, pitta: 0, kapha: 0 });

        const metrics = engine.calculateConstitution([finalScores]);

        // ML Prediction Integration
        let mlProbabilities = null;
        try {
            // Map questionnaire answers to CatBoost features
            // Note: In a real app, these mappings should be robust. 
            // Here we provide a best-effort mapping to the CSV columns.
            const answers: Record<string, string> = {
                "Body Size": selectedAnswers[0]?.label.includes("Thin") ? "Slim" : selectedAnswers[0]?.label.includes("Moderate") ? "Medium" : "Large",
                "Body Weight": selectedAnswers[1]?.label,
                "Height": "Average", // Defaulting missing features
                "Bone Structure": selectedAnswers[0]?.label.includes("Thin") ? "Small" : "Medium",
                "Complexion": "Fair",
                "General feel of skin": selectedAnswers[2]?.label,
                "Texture of Skin": selectedAnswers[2]?.label.includes("Oily") ? "Oily" : "Dry",
                "Hair Color": "Black",
                "Appearance of Hair": selectedAnswers[3]?.label,
                "Shape of face": "Oval",
                "Eyes": selectedAnswers[4]?.label,
                "Eyelashes": "Moderate",
                "Blinking of Eyes": "Moderate",
                "Cheeks": "Normal",
                "Nose": "Average",
                "Teeth and gums": "Healthy",
                "Lips": "Soft",
                "Nails": "Healthy",
                "Appetite": selectedAnswers[6]?.label,
                "Liking tastes": "Sweet",
                "Metabolism Type": selectedAnswers[7]?.label.includes("Strong") ? "fast" : "moderate",
                "Climate Preference": selectedAnswers[5]?.label.includes("Cold") ? "warm" : "cool",
                "Stress Levels": selectedAnswers[13]?.label.includes("Anxiety") ? "high" : "moderate",
                "Sleep Patterns": selectedAnswers[8]?.label,
                "Dietary Habits": "vegetarian",
                "Physical Activity Level": selectedAnswers[14]?.label,
                "Water Intake": "moderate",
                "Digestion Quality": selectedAnswers[7]?.label,
                "Skin Sensitivity": selectedAnswers[2]?.label.includes("sensitive") ? "sensitive" : "normal"
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/prakriti`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ features: answers })
            });
            
            if (response.ok) {
                const data = await response.json();
                mlProbabilities = data.probabilities;
                console.log("ML Prediction Results:", mlProbabilities);
            }
        } catch (error) {
            console.error("ML Prediction failed:", error);
        }

        // Overwrite deterministic metrics with ML results if available
        let finalVata = metrics.prakriti_vata;
        let finalPitta = metrics.prakriti_pitta;
        let finalKapha = metrics.prakriti_kapha;

        if (mlProbabilities) {
            let v = 0, p = 0, k = 0;
            // Distribute probabilities (handling combination types)
            Object.entries(mlProbabilities).forEach(([type, prob]: [string, any]) => {
                const t = type.toLowerCase();
                const pVal = parseFloat(prob);
                
                if (t === 'vata') v += pVal;
                else if (t === 'pitta') p += pVal;
                else if (t === 'kapha') k += pVal;
                else if (t === 'vata+pitta') { v += pVal / 2; p += pVal / 2; }
                else if (t === 'vata+kapha') { v += pVal / 2; k += pVal / 2; }
                else if (t === 'pitta+kapha') { p += pVal / 2; k += pVal / 2; }
                else if (t === 'tridoshic') { v += pVal / 3; p += pVal / 3; k += pVal / 3; }
            });

            // Normalize and convert to 0-100 scale
            const mlTotal = v + p + k || 1;
            finalVata = Math.round((v / mlTotal) * 100);
            finalPitta = Math.round((p / mlTotal) * 100);
            finalKapha = Math.round((k / mlTotal) * 100);

            // Correct rounding errors to ensure 100%
            const diff = 100 - (finalVata + finalPitta + finalKapha);
            if (diff !== 0) {
                const max = Math.max(finalVata, finalPitta, finalKapha);
                if (max === finalVata) finalVata += diff;
                else if (max === finalPitta) finalPitta += diff;
                else finalKapha += diff;
            }
        }

        const finalResult = {
            title: "Core Profile (Prakriti)",
            type: metrics.constitution_string,
            prakriti_vata: finalVata,
            prakriti_pitta: finalPitta,
            prakriti_kapha: finalKapha,
            ml_probabilities: mlProbabilities,
            confidence: metrics.confidence,
            is_extreme: metrics.is_extreme,
            insights: [
                `Your ${metrics.constitution_string} nature suggests a specific thermodynamic baseline.`,
                metrics.confidence > 25 
                    ? `With a dominance index of ${metrics.confidence}, your constitution is highly distinct.`
                    : `Your constitution shows signs of significant balance between multiple forces.`
            ],
            timestamp: new Date().toISOString()
        };

        setConstitution(finalResult);

        // Sync to Supabase Profiles as the single source of truth
        const syncPrakriti = async () => {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user;
            
            if (user) {
                await supabase.from('profiles').upsert({
                    id: user.id,
                    prakriti_result: finalResult,
                    is_onboarded: true,
                    updated_at: new Date().toISOString()
                });
            }
        };
        
        // Critical fix: Await the sync before proceeding
        try {
            await syncPrakriti();
        } catch (error) {
            console.error("Failed to sync Prakriti profile:", error);
        }
        
        // Pass result back up to the Hub to commit to global state
        onComplete({
            ...metrics,
            prakriti_vata: finalVata,
            prakriti_pitta: finalPitta,
            prakriti_kapha: finalKapha
        });

        // Optional Analytics Tracking
        try {
            // (typeof window !== 'undefined' && (window as any).analytics) && (window as any).analytics.track("prakriti_assessment_completed", { constitution: metrics.constitution_string });
        } catch (e) {}

        // Redirection After Completion
        setTimeout(() => {
            router.push("/dashboard");
        }, 3000);
    };

    const handleOptionSelect = (option: Option) => {
        setSelectedAnswers((prev: Record<number, Option>) => ({ ...prev, [currentStep]: option }));
    };

    const handleBack = () => {
        if (currentStep > 0 && !isSubmitting) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStep((prev: number) => prev - 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    const handleNext = async () => {
        if (isSubmitting) return;

        const isLastStep = currentStep === quizFlow.length - 1;
        if (isLastStep) {
            await calculateResult();
            setCurrentStep((prev: number) => prev + 1);
        } else if (selectedAnswers[currentStep]) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStep((prev: number) => prev + 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    const getProgressReassurance = () => {
        if (currentStep === Math.floor(quizFlow.length / 2)) return "Halfway there. Great progress!";
        if (currentStep === quizFlow.length - 3) return "Almost done! ~30 seconds remaining.";
        if (currentStep < 3) return "~2 minutes remaining.";
        return null;
    };

    return (
        <div className="w-full max-w-xl space-y-8 py-8 overflow-y-auto custom-scrollbar">
            {!constitution && currentStep < quizFlow.length && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/40 shadow-premium w-full text-center relative overflow-hidden"
                >
                    {!isIdentified ? (
                        <div className="space-y-6 max-w-sm mx-auto">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-forest/5 rounded-[1.5rem] flex items-center justify-center text-forest mx-auto mb-6 shadow-sm">
                                    <User className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-forest tracking-tighter mb-2">Initialize Profile</h3>
                                <p className="text-xs font-bold text-slate-500">Provide basic details to map your constitution. You only do this once.</p>
                            </div>
                            <div className="space-y-4">
                                <input type="text" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} className="w-full bg-white font-bold text-slate-700 px-6 py-4 rounded-xl border border-slate-100 focus:outline-none focus:border-forest/30 shadow-sm" placeholder="Your Name" />
                                <input type="number" value={userInfo.age} onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })} className="w-full bg-white font-bold text-slate-700 px-6 py-4 rounded-xl border border-slate-100 focus:outline-none focus:border-forest/30 shadow-sm" placeholder="Age" />
                                <select value={userInfo.gender} onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} className="w-full bg-white font-bold text-slate-700 px-6 py-4 rounded-xl border border-slate-100 focus:outline-none focus:border-forest/30 shadow-sm cursor-pointer appearance-none">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <button disabled={!userInfo.name || !userInfo.age || !userInfo.gender} onClick={() => setIsIdentified(true)} className="w-full mt-6 bg-forest text-white py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-forest/20 active:scale-95 disabled:opacity-50 transition-all">
                                Begin Assessment
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-forest/5">
                                <motion.div
                                    className="h-full bg-forest"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentStep + 1) / quizFlow.length) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            <div className="mb-8 relative">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest/5 text-forest mb-4">
                                    <BrainCircuit className="w-6 h-6" />
                                </div>
                                <h4 className="text-[10px] md:text-xs font-black text-slate-600 uppercase tracking-[0.3em] mb-3">
                                    {quizFlow[currentStep].domain ? `${quizFlow[currentStep].domain} • ` : ''} Question {currentStep + 1} of {quizFlow.length}
                                </h4>
                                <h2 className="text-xl md:text-3xl font-black text-forest tracking-tighter text-balance">
                                    {quizFlow[currentStep].question}
                                </h2>
                                
                                {getProgressReassurance() && (
                                    <p className="text-[10px] font-bold text-emerald-700/70 uppercase tracking-widest mt-4 animate-pulse">
                                        {getProgressReassurance()}
                                    </p>
                                )}
                            </div>

                            <div className={`grid grid-cols-1 gap-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                                {quizFlow[currentStep].options.map((opt, idx) => {
                                    const isSelected = selectedAnswers[currentStep]?.label === opt.label;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(opt)}
                                            disabled={isSubmitting}
                                            className={`w-full font-bold py-4 px-6 rounded-2xl border transition-all duration-300 shadow-sm text-center active:scale-[0.98] group flex items-center justify-center gap-3 ${isSelected
                                                ? 'bg-forest text-white border-forest'
                                                : 'bg-white hover:bg-forest/5 text-slate-600 border-slate-100'}`}
                                        >
                                            <span className="text-sm leading-snug">{opt.label}</span>
                                            {isSelected && <ShieldCheck className="w-4 h-4" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between mt-8 gap-4">
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 0 || isSubmitting}
                                    className="flex-1 bg-slate-50 text-slate-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-slate-100"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={!selectedAnswers[currentStep] || isSubmitting}
                                    className="flex-1 bg-forest text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-50 transition-all shadow-lg shadow-forest/10 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">Processing...</span>
                                    ) : (
                                        currentStep === quizFlow.length - 1 ? 'Complete' : 'Next'
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </motion.div>
            )}

            {constitution && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/60 shadow-premium space-y-8"
                >
                    <div className="text-center flex flex-col items-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-forest text-white flex items-center justify-center mb-6 shadow-xl shadow-forest/20">
                            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <span className="text-xs font-black text-slate-600 uppercase tracking-[0.3em] mb-2">{constitution.title}</span>
                        <h3 className="text-4xl md:text-5xl font-black text-forest tracking-tighter">{constitution.type}</h3>
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10">
                            <span className="text-[10px] font-black text-forest/90 uppercase tracking-widest">Confidence Index</span>
                            <span className="text-[10px] font-black text-forest">{constitution.confidence}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 py-8 border-y border-forest/5">
                        <div className="text-center bg-white/40 p-6 rounded-2xl border border-white/80 transition-all hover:border-forest/20 shadow-sm">
                            <div className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Vata</div>
                            <div className="text-3xl font-black text-forest">{constitution.prakriti_vata}%</div>
                        </div>
                        <div className="text-center bg-white/40 p-6 rounded-2xl border border-white/80 transition-all hover:border-forest/20 shadow-sm">
                            <div className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Pitta</div>
                            <div className="text-3xl font-black text-forest">{constitution.prakriti_pitta}%</div>
                        </div>
                        <div className="text-center bg-white/40 p-6 rounded-2xl border border-white/80 transition-all hover:border-forest/20 shadow-sm">
                            <div className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Kapha</div>
                            <div className="text-3xl font-black text-forest">{constitution.prakriti_kapha}%</div>
                        </div>
                    </div>

                    <button disabled className="block w-full text-center py-6 bg-forest/10 text-forest rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-none transition-all animate-pulse border border-forest/20">
                        Preparing your dashboard...
                    </button>
                </motion.div>
            )}
        </div>
    );
}
