"use client";

import { useState, useEffect } from "react";
import { 
    Moon, Utensils, Zap, BrainCircuit, Droplets, 
    Sparkles, AlertCircle, Info, CheckCircle2, 
    ArrowRight, ArrowLeft, HeartPulse, Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { getApiUrl } from "@/utils/api";

interface DailyLogFormProps {
    onResult: (data: any) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export default function DailyLogForm({ onResult, isLoading, setIsLoading }: DailyLogFormProps) {
    const [step, setStep] = useState(1);
    const [prakritiData, setPrakritiData] = useState<any>(null);
    const [form, setForm] = useState({
        sleepHours: 7.5,
        sleepQuality: 4,
        energyLevel: "moderate",
        stressLevel: "moderate",
        mood: "calm",
        
        agniStatus: "balanced",
        amaStatus: "none",
        bowelStatus: "clear",
        micturitionStatus: "normal",
        
        movement: "exercise",
        routines: ["warm_water", "tongue_scraping"],
        
        foodQuality: "light",
        lunchTime: "before_2",
        dinnerTime: "before_8",
        hydration: 2,
        eveningScreens: "minimal",
        customNote: ""
    });

    // Fetch Profile Data on Mount (Source of Truth)
    useEffect(() => {
        async function fetchProfile() {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const { data } = await supabase
                    .from("profiles")
                    .select("prakriti_result, vikriti_result")
                    .single();
                if (data) setPrakritiData(data);
            }
        }
        fetchProfile();
    }, []);

    const handleSelect = (name: string, value: any) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleRoutine = (habit: string) => {
        setForm(prev => {
            const routines = prev.routines.includes(habit)
                ? prev.routines.filter(r => r !== habit)
                : [...prev.routines, habit];
            return { ...prev, routines };
        });
    };

    const analyzeLog = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            sleep_hours: Number(form.sleepHours),
            sleep: Number(form.sleepQuality),
            energy_level: form.energyLevel,
            stress_level: form.stressLevel,
            mood: form.mood,
            
            agni: form.agniStatus,
            ama: form.amaStatus,
            mala: form.bowelStatus,
            mutra: form.micturitionStatus,
            
            movement_type: form.movement,
            warm_water: form.routines.includes("warm_water"),
            tongue_scraping: form.routines.includes("tongue_scraping"),
            nasya: form.routines.includes("nasya"),
            oil_pulling: form.routines.includes("oil_pulling"),
            meditation: form.routines.includes("meditation"),
            pranayama: form.routines.includes("pranayama"),
            abhyanga: form.routines.includes("abhyanga"),
            
            lunch_before_2: form.lunchTime === "before_2",
            dinner_before_8: form.dinnerTime === "before_8",
            food_quality: form.foodQuality,
            hydration: form.hydration,
            evening_screens: form.eveningScreens,
            custom_note: form.customNote,
            
            prakriti: prakritiData?.prakriti_result?.type || "Unknown",
            vikriti: prakritiData?.vikriti_result?.type || "Unknown"
        };

        try {
            const apiUrl = getApiUrl();
            const res = await fetch(`${apiUrl}/api/analyze`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            
            if (!res.ok) throw new Error("Analysis failed");
            const data = await res.json();

            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                const { error: dbError } = await supabase.from('pulse_logs').insert({
                    user_id: session.user.id,
                    ojas_score: data.ojas_score || 0,
                    sleep_hours: form.sleepHours,
                    sleep: form.sleepQuality,
                    mood: form.mood,
                    agni: form.agniStatus,
                    ama: form.amaStatus,
                    movement: form.movement,
                    routines: form.routines,
                    detailed_analysis: data.ai_response || data.analysis || data.message || "Manual log entry.",
                    mala: form.bowelStatus,
                    mutra: form.micturitionStatus,
                    hydration: form.hydration,
                    custom_note: form.customNote,
                    food_quality: form.foodQuality,
                    energy_level: form.energyLevel,
                    stress_level: form.stressLevel
                });

                if (dbError) {
                    alert("Sync Error: " + dbError.message);
                } else {
                    onResult(data);
                }
            }
        } catch (err) {
            console.error(err);
            alert("Protocol generation failed. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const SegmentedControl = ({ name, options, value }: { name: string, options: { label: string, value: string }[], value: string }) => (
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(name, opt.value)}
                    className={`px-4 py-3 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border ${value === opt.value
                        ? 'bg-forest text-white border-forest shadow-lg shadow-forest/10 scale-[1.02]'
                        : 'bg-white text-slate-500 border-slate-100 hover:border-forest/20'
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    return (
        <div className="space-y-8">
            <header className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-forest font-black uppercase tracking-[0.4em] text-xs mb-2">Health Audit Step {step}/4</h3>
                    <div className="flex gap-1.5">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step >= i ? "w-8 bg-forest" : "w-2 bg-slate-100"}`} />
                        ))}
                    </div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                    {step === 1 ? "Bio-Rhythms" : step === 2 ? "Digestion" : step === 3 ? "Habits" : "Integration"}
                </div>
            </header>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="min-h-[400px]"
                >
                    {step === 1 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-water/10 flex items-center justify-center text-water shadow-sm border border-water/10">
                                    <Moon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-forest uppercase tracking-widest leading-none mb-1.5">Vigor & Rest</h4>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Biological Recharge</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50">Sleep Duration</label>
                                        <span className={`text-xs font-black tabular-nums ${form.sleepHours < 6 ? "text-red-400" : form.sleepHours > 8.5 ? "text-orange-400" : "text-emerald-500"}`}>{form.sleepHours}h</span>
                                    </div>
                                    <input
                                        type="range" min="4" max="10" step="0.5"
                                        value={form.sleepHours}
                                        onChange={(e) => handleSelect("sleepHours", Number(e.target.value))}
                                        className="w-full h-1 bg-slate-100 rounded-full appearance-none cursor-pointer accent-forest"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50">Sleep Depth</label>
                                        <span className="text-xs font-black text-forest tabular-nums">{form.sleepQuality}/5</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="5" step="1"
                                        value={form.sleepQuality}
                                        onChange={(e) => handleSelect("sleepQuality", Number(e.target.value))}
                                        className="w-full h-1 bg-slate-100 rounded-full appearance-none cursor-pointer accent-forest"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Energy Level</label>
                                    <SegmentedControl
                                        name="energyLevel"
                                        value={form.energyLevel}
                                        options={[
                                            { label: "Radiant", value: "high" },
                                            { label: "Solid", value: "moderate" },
                                            { label: "Depleted", value: "low" }
                                        ]}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Mental Stress</label>
                                    <SegmentedControl
                                        name="stressLevel"
                                        value={form.stressLevel}
                                        options={[
                                            { label: "Low", value: "low" },
                                            { label: "Moderate", value: "moderate" },
                                            { label: "High", value: "high" }
                                        ]}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Dominant Mood</label>
                                    <SegmentedControl
                                        name="mood"
                                        value={form.mood}
                                        options={[
                                            { label: "Calm", value: "calm" },
                                            { label: "Focused", value: "clear" },
                                            { label: "Sluggish", value: "sluggish" },
                                            { label: "Anxious", value: "anxious" }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-fire/10 flex items-center justify-center text-fire shadow-sm border border-fire/10">
                                    <Utensils className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-forest uppercase tracking-widest leading-none mb-1.5">Metabolic Center</h4>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Agni & Elimination</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Hunger Intensity (Agni)</label>
                                    <SegmentedControl
                                        name="agniStatus"
                                        value={form.agniStatus}
                                        options={[
                                            { label: "Sharp", value: "high" },
                                            { label: "Balanced", value: "balanced" },
                                            { label: "Weak", value: "low" },
                                            { label: "Erratic", value: "variable" }
                                        ]}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Tongue Coating (Ama)</label>
                                    <SegmentedControl
                                        name="amaStatus"
                                        value={form.amaStatus}
                                        options={[
                                            { label: "Clear", value: "none" },
                                            { label: "Thin White", value: "minimal" },
                                            { label: "Thick/Yellow", value: "high_ama" }
                                        ]}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Elimination (Mala)</label>
                                    <SegmentedControl
                                        name="bowelStatus"
                                        value={form.bowelStatus}
                                        options={[
                                            { label: "Regular", value: "clear" },
                                            { label: "Constipated", value: "constipated" },
                                            { label: "Loose", value: "loose" }
                                        ]}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Urination (Mutra)</label>
                                    <SegmentedControl
                                        name="micturitionStatus"
                                        value={form.micturitionStatus}
                                        options={[
                                            { label: "Clear", value: "normal" },
                                            { label: "Dark/Low", value: "dark" },
                                            { label: "Frequent", value: "frequent" }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 shadow-sm border border-orange-500/10">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-forest uppercase tracking-widest leading-none mb-1.5">Action & Habits</h4>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Movement & Dinacharya</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Physical Movement</label>
                                    <SegmentedControl
                                        name="movement"
                                        value={form.movement}
                                        options={[
                                            { label: "Vigorous", value: "exercise" },
                                            { label: "Yoga/Stretch", value: "yoga" },
                                            { label: "Walking", value: "walk" },
                                            { label: "None", value: "none" }
                                        ]}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        "warm_water", "tongue_scraping", "nasya", 
                                        "oil_pulling", "abhyanga", "meditation", "pranayama"
                                    ].map((habit) => (
                                        <button
                                            key={habit}
                                            type="button"
                                            onClick={() => handleToggleRoutine(habit)}
                                            className={`p-3 rounded-xl flex items-center justify-between transition-all border ${form.routines.includes(habit)
                                                ? 'bg-forest/5 border-forest text-forest'
                                                : 'bg-white border-slate-100 text-slate-600'
                                                }`}
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-widest">{habit.replace("_", " ")}</span>
                                            {form.routines.includes(habit) ? <CheckCircle2 className="w-4 h-4 text-forest" /> : <div className="w-4 h-4 rounded-full border border-slate-200" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 shadow-sm">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-forest uppercase tracking-widest leading-none mb-1.5">Contextual Flow</h4>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Nourishment & Awareness</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Dinner Composition</label>
                                    <SegmentedControl
                                        name="foodQuality"
                                        value={form.foodQuality}
                                        options={[
                                            { label: "Light", value: "light" },
                                            { label: "Heavy/Rich", value: "heavy" },
                                            { label: "Oily/Fried", value: "fried" },
                                        ]}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Hydration (Total Intake)</label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4].map(n => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    onClick={() => handleSelect('hydration', n)}
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${form.hydration >= n ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-blue-50 text-blue-200'
                                                        }`}
                                                >
                                                    <Droplets className="w-4 h-4" />
                                                </button>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                            {form.hydration === 1 ? "< 1L" : form.hydration === 2 ? "1-2L" : form.hydration === 3 ? "2-3L" : "3L+"}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Evening Screen Time</label>
                                    <SegmentedControl
                                        name="eveningScreens"
                                        value={form.eveningScreens}
                                        options={[
                                            { label: "Minimal", value: "minimal" },
                                            { label: "Moderate", value: "moderate" },
                                            { label: "Excessive", value: "excessive" }
                                        ]}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Additional Nuance</label>
                                    <textarea
                                        value={form.customNote}
                                        onChange={(e) => handleSelect("customNote", e.target.value)}
                                        placeholder="Any other sensations or events Veda should know?"
                                        className="w-full bg-slate-50 font-bold text-xs text-slate-700 p-4 rounded-2xl border border-slate-100 focus:outline-none focus:border-forest/20 min-h-[80px]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 pt-4">
                {step > 1 && (
                    <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 text-slate-600 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                )}
                {step < 4 ? (
                    <button
                        type="button"
                        onClick={nextStep}
                        className="flex-[2] bg-forest text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-lg shadow-forest/10 hover:opacity-90 transition-all"
                    >
                        Continue <ArrowRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={analyzeLog}
                        disabled={isLoading}
                        className="flex-[2] bg-forest text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-lg shadow-forest/10 hover:opacity-90 transition-all disabled:opacity-50"
                    >
                        {isLoading ? "Analyzing..." : "Analyze My Day"} <HeartPulse className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
