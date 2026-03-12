"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import Image from "next/image";
import dynamic from 'next/dynamic';

import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { createClient } from "@/utils/supabase/client";

// Import local sub-components
import PrakritiOnboarding from "@/components/ayuone/PrakritiOnboarding";
import DailyCheckin from "@/components/ayuone/DailyCheckin";
import RitualCards from "@/components/ayuone/RitualCards";

// Lazy-load the heavy Chat Component
const AyuOneChat = dynamic(() => import('@/components/ayuone/AyuOneChat'), {
    ssr: false,
    loading: () => <div className="p-4 text-center text-xs font-bold text-slate-600">Loading Neural Core...</div>
});

export default function AyuOneHub() {
    const { state, updateState, isLoaded } = usePhysiologyState();
    
    // Shared State & Mounting
    const [mounted, setMounted] = useState(false);
    const [isPrakritiSet, setIsPrakritiSet] = useState<boolean>(false);
    
    // Orchestration State
    const [activeCheckinType, setActiveCheckinType] = useState<"morning" | "evening" | null>(null);
    const [completedLogs, setCompletedLogs] = useState<string[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Sync with global state
    useEffect(() => {
        if (isLoaded) {
            setIsPrakritiSet(state.is_onboarded);
        }
    }, [isLoaded, state.is_onboarded]);

    // Robust Initialization for Interaction Logs
    useEffect(() => {
        const loadLogs = async () => {
            const today = new Date().toISOString().split('T')[0];
            const storedLogs = JSON.parse(localStorage.getItem("completed_logs") || "{}");

            // 1. Initial local load for instant UI
            const localCompleted = Object.entries(storedLogs)
                .filter(([_, val]) => val === today)
                .map(([key]) => key);
            setCompletedLogs(localCompleted);

            // 2. Midnight Reset Check
            const lastResetDate = localStorage.getItem("ayuone_log_reset_date");
            if (lastResetDate !== today) {
                localStorage.removeItem("completed_logs");
                localStorage.setItem("ayuone_log_reset_date", today);
                setCompletedLogs([]);
                setMounted(true);
                return;
            }

            // 3. Database Sync
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const todayStart = new Date();
                todayStart.setHours(0, 0, 0, 0);

                const { data: todayLogs } = await supabase
                    .from('pulse_logs')
                    .select('detailed_analysis')
                    .eq('user_id', user.id)
                    .gte('created_at', todayStart.toISOString());

                if (todayLogs) {
                    const dbCompleted: string[] = [];
                    todayLogs.forEach((log: any) => {
                        const analysis = (log.detailed_analysis || "").toLowerCase();
                        if (analysis.includes("morning check-in") && !localCompleted.includes("morning")) dbCompleted.push("morning");
                        if (analysis.includes("evening check-in") && !localCompleted.includes("evening")) dbCompleted.push("evening");
                    });

                    if (dbCompleted.length > 0) {
                        setCompletedLogs((prev: string[]) => Array.from(new Set([...prev, ...dbCompleted])));
                        
                        // Sync back to local storage
                        const updatedLogs = { ...storedLogs };
                        dbCompleted.forEach(type => updatedLogs[type] = today);
                        localStorage.setItem("completed_logs", JSON.stringify(updatedLogs));
                    }
                }
            }
            setMounted(true);
        };
        
        loadLogs();
        
        // Listen for tab focus to check midnight resets silently
        window.addEventListener("focus", loadLogs);
        return () => window.removeEventListener("focus", loadLogs);
    }, []);

    const handleOnboardingComplete = (metrics: any) => {
        setIsPrakritiSet(true);
        updateState({
            ...state,
            prakriti_vata: metrics.prakriti_vata,
            prakriti_pitta: metrics.prakriti_pitta,
            prakriti_kapha: metrics.prakriti_kapha,
            vata: metrics.prakriti_vata,
            pitta: metrics.prakriti_pitta,
            kapha: metrics.prakriti_kapha,
            is_onboarded: true
        });
    };

    const handleCheckinComplete = async (answers: any) => {
        if (!activeCheckinType) return;
        
        const typeLabel = activeCheckinType === "morning" ? "Morning" : "Evening";
        
        // Calculate total effects from all answers
        const answersArray = Object.values(answers) as any[];
        const effectsList = answersArray.map((opt: any) => opt.effects);
        const signalNames = answersArray.map((opt: any) => opt.signal);
        
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        // Lazy load state updater dependencies so initial render is faster
        const { applyEffects } = await import('@/engine/stateUpdater');
        const { state: nextState, events } = applyEffects(state, effectsList, currentTime, signalNames);
        updateState(nextState);

        // Defer side effects (Notifications)
        if (state.is_onboarded && events.length > 0) {
            const { triggerNotifications } = await import('@/services/notificationService');
            
            // Re-fetch user silently for notification
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                triggerNotifications(events, user.id);
            }
        }

        // Sync with Supabase asynchronously to not block UI
        const syncLog = async () => {
            try {
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();

                if (user) {
                    const logData: any = {
                        user_id: user.id,
                        ojas_score: nextState.ojas || 70,
                        sleep: answers.sleep_quality?.answer,
                        wake_time: answers.wake_time?.answer,
                        ama: answers.tongue_coating?.answer,
                        mala: answers.bowel_movement?.answer,
                        agni: answers.appetite_level?.answer || answers.digestion?.answer,
                        mood: answers.mental_state?.answer || answers.stress?.answer,
                        movement: answers.physical_activity?.answer,
                        routines: answers.meal_timing?.answer || answers.evening_wind_down?.answer,
                        hydration: answers.hydration?.answer ? (answers.hydration.answer.includes("Well") ? 3 : 2) : 2,
                        detailed_analysis: `AyuOne ${typeLabel} Check-in completed. Energy: ${answers.energy_level?.answer || 'N/A'}.`
                    };

                    await supabase.from('pulse_logs').insert(logData);
                }
            } catch (err) {
                console.error("AyuOne Persistence Error:", err);
            }
        };
        syncLog();

        // Persist local cache immediately
        const today = new Date().toISOString().split('T')[0];
        const storedLogs = JSON.parse(localStorage.getItem("completed_logs") || "{}");
        storedLogs[activeCheckinType] = today;
        localStorage.setItem("completed_logs", JSON.stringify(storedLogs));
        
        setCompletedLogs(prev => Array.from(new Set([...prev, activeCheckinType])));
        setActiveCheckinType(null);
    };

    if (!mounted || !isLoaded) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background text-forest/40">
                <BrainCircuit className="w-8 h-8 animate-pulse" />
            </div>
        );
    }

    return (
        <div className="flex-1 w-full flex flex-col bg-background relative overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest/10 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none" />

            {/* Header */}
            <header className="px-6 pt-12 pb-6 md:px-12 md:pt-24 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 z-20 shrink-0">
                <div className="relative">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                        <div className="relative w-6 h-6">
                            <Image src="/logo.png" alt="Logo" fill className="object-contain" sizes="24px" />
                        </div>
                        <span className="text-[10px] md:text-sm font-black text-forest/90 uppercase tracking-[0.3em]">AyuOne Neural Interface</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-forest tracking-tighter drop-shadow-sm leading-none">
                        {!isPrakritiSet ? "Protocol" : "Dialogue"}
                    </h1>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center overflow-hidden w-full relative">
                {!isPrakritiSet ? (
                     <PrakritiOnboarding onComplete={handleOnboardingComplete} />
                ) : (
                    <div className="w-full max-w-5xl flex flex-col glass rounded-[2rem] md:rounded-[3rem] shadow-premium border border-white/80 flex-1 overflow-hidden h-full">

                        {activeCheckinType ? (
                            <DailyCheckin 
                                type={activeCheckinType} 
                                onClose={() => setActiveCheckinType(null)} 
                                onComplete={handleCheckinComplete} 
                            />
                        ) : (
                            <>
                                {/* Fixed App Area */}
                                <div className="flex-1 w-full max-w-5xl flex flex-col relative pb-20">
                                    <RitualCards completedLogs={completedLogs} onSelectRitual={setActiveCheckinType} />

                                    {/* Floating Chat Bubble Toggle */}
                                    <div className="fixed bottom-32 right-6 z-[60] md:right-12">
                                        <motion.button
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setIsChatOpen(true)}
                                            className="w-16 h-16 md:w-20 md:h-20 bg-forest text-white rounded-full flex items-center justify-center shadow-2xl shadow-forest/30 border-4 border-white relative overflow-hidden group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-forest opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <BrainCircuit className="w-8 h-8 relative z-10" />
                                            <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-forest animate-pulse" />
                                        </motion.button>
                                    </div>

                                    {/* Floating Chat Overlay */}
                                    {isChatOpen && <AyuOneChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
