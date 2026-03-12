import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import dailyCheckinData from "@/data/daily_checkin.json";

interface CheckinOption {
    answer: string;
    signal: string;
    effects: Partial<Record<string, number>>;
}

interface CheckinQuestion {
    id: string;
    question: string;
    time: string;
    options: CheckinOption[];
}

interface DailyCheckinProps {
    type: "morning" | "evening";
    onClose: () => void;
    onComplete: (answers: Record<string, CheckinOption>) => void;
}

export default function DailyCheckin({ type, onClose, onComplete }: DailyCheckinProps) {
    const activeQuestions = dailyCheckinData[type] as CheckinQuestion[];
    
    const [checkinStep, setCheckinStep] = useState(0);
    const [checkinAnswers, setCheckinAnswers] = useState<Record<string, CheckinOption>>({});
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleCheckinOption = (option: CheckinOption) => {
        const questionId = activeQuestions[checkinStep].id;
        setCheckinAnswers((prev) => ({ ...prev, [questionId]: option }));
    };

    const handleCheckinBack = () => {
        if (checkinStep > 0) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCheckinStep((prev) => prev - 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    const handleCheckinNext = () => {
        const isLastStep = checkinStep === activeQuestions.length - 1;
        const currentQuestionId = activeQuestions[checkinStep].id;

        if (isLastStep) {
            onComplete(checkinAnswers);
        } else if (checkinAnswers[currentQuestionId]) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCheckinStep((prev) => prev + 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    return (
        <div className="flex-1 flex flex-col p-4 md:p-12 items-center justify-center overflow-y-auto w-full custom-scrollbar relative">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 hover:text-slate-700 hover:bg-slate-50 transition-all font-bold shadow-sm z-10"
            >
                ✕
            </button>

            <div className="absolute top-6 left-6 h-1.5 bg-forest/5 w-[calc(100%-80px)] rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-forest"
                    initial={{ width: 0 }}
                    animate={{ width: `${(checkinStep / activeQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
            
            <div className="mt-8 absolute top-8 left-6 text-xs font-black text-slate-600 uppercase tracking-[0.3em]">
                Question {checkinStep + 1} of {activeQuestions.length}
            </div>

            <motion.div
                key={checkinStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg text-center mt-12"
            >
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter text-balance mb-8">
                    {activeQuestions[checkinStep].question}
                </h2>

                <div className={`grid grid-cols-1 gap-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    {activeQuestions[checkinStep].options.map((opt, idx) => {
                        const isSelected = checkinAnswers[activeQuestions[checkinStep].id]?.answer === opt.answer;
                        return (
                            <button
                                key={idx}
                                onClick={() => handleCheckinOption(opt as unknown as CheckinOption)}
                                className={`w-full text-left p-6 rounded-[1.5rem] border-2 transition-all group flex flex-col relative ${isSelected
                                    ? "border-forest bg-forest/5 text-forest shadow-md"
                                    : "border-slate-100 bg-white text-slate-700 hover:border-forest hover:bg-forest/5 hover:text-forest"
                                    }`}
                            >
                                <span className="text-sm md:text-base leading-snug">{opt.answer}</span>
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-4 right-4 text-forest"
                                    >
                                        <ShieldCheck className="w-5 h-5 fill-forest/10" />
                                    </motion.div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Navigation Buttons for Check-in */}
                <div className="flex items-center gap-4 mt-10">
                    <button
                        onClick={handleCheckinBack}
                        disabled={checkinStep === 0}
                        className={`flex-1 flex items-center justify-center gap-2 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.1em] text-[10px] transition-all border-2 ${checkinStep === 0
                            ? "border-slate-100 text-slate-300 cursor-not-allowed"
                            : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                    >
                        Back
                    </button>
                    <button
                        onClick={handleCheckinNext}
                        disabled={!checkinAnswers[activeQuestions[checkinStep].id]}
                        className={`flex-1 flex items-center justify-center gap-2 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.1em] text-[10px] transition-all shadow-lg ${!checkinAnswers[activeQuestions[checkinStep].id]
                            ? "bg-slate-100 text-slate-600 cursor-not-allowed shadow-none"
                            : "bg-forest text-white shadow-forest/20 hover:bg-emerald-800"
                            }`}
                    >
                        {checkinStep === activeQuestions.length - 1 ? "Complete" : "Next"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
