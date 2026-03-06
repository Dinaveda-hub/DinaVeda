"use client";

import { useState } from "react";
import { Moon, Utensils, Zap, Sun, BrainCircuit, Droplets, Sparkles, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

interface DailyLogFormProps {
    onResult: (data: any) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export default function DailyLogForm({ onResult, isLoading, setIsLoading }: DailyLogFormProps) {
    const [form, setForm] = useState({
        sleepHours: 7.5,
        sleepQuality: 4,
        foodQuality: "light",
        lunchTime: "before_2",
        dinnerTime: "before_8",
        movement: "exercise",
        mood: "calm",
        wakeTime: "before_630",
        routines: ["warm_water", "tongue_scraping"],
        agniStatus: "balanced", // New: Hunger level
        amaStatus: "none", // New: Tongue coating
        bowelStatus: "clear", // New: Mala
        micturitionStatus: "normal", // New: Mutra
        hydration: 2, // New: Liters/glasses
        eveningScreens: "minimal", // New: Screen time
        customNote: "" // New: Custom user input
    });

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
            sleep_quality: Number(form.sleepQuality),
            lunch_before_2: form.lunchTime === "before_2",
            dinner_before_8: form.dinnerTime === "before_8",
            light_dinner: form.foodQuality === "light",
            no_fried_food: form.foodQuality !== "fried",
            no_late_snack: form.foodQuality !== "late",
            wake_before_630: form.wakeTime === "before_630",
            tongue_scraping: form.routines.includes("tongue_scraping"),
            warm_water: form.routines.includes("warm_water"),
            abhyanga: form.routines.includes("abhyanga"),
            morning_movement: form.movement === "exercise" || form.movement === "yoga",
            vyayama_minutes: form.movement === "exercise" ? 30 : (form.movement === "yoga" ? 20 : (form.movement === "walk" ? 15 : 0)),
            mood: form.mood,
            // Additional parameters passed for future-proofing API
            agni: form.agniStatus,
            ama: form.amaStatus,
            mala: form.bowelStatus,
            mutra: form.micturitionStatus,
            hydration: form.hydration,
            custom_note: form.customNote,
            prakriti: localStorage.getItem("prakriti_result") ? JSON.parse(localStorage.getItem("prakriti_result")!).type : "Unknown",
            vikriti: localStorage.getItem("vikriti_result") ? JSON.parse(localStorage.getItem("vikriti_result")!).type : "Unknown"
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001'}/analyze`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            // Sync with Supabase Database
            const supabase = createClient();
            const { data: authData } = await supabase.auth.getUser();

            if (authData.user) {
                const { error: dbError } = await supabase.from('pulse_logs').insert({
                    user_id: authData.user.id,
                    ojas_score: data.ojas_score,
                    sleep_hours: form.sleepHours,
                    sleep_quality: form.sleepQuality,
                    mood: form.mood,
                    agni: form.agniStatus,
                    ama: form.amaStatus,
                    movement: form.movement,
                    routines: form.routines,
                    detailed_analysis: data.ai_response || data.analysis // Save the AI's wisdom
                });
                if (dbError) console.error("Database Sync Error:", dbError);
            }

            onResult(data);
        } catch (err) {
            console.error(err);
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
                    className={`px-4 py-3 rounded-xl md:rounded-2xl text-xs md:text-xs font-black uppercase tracking-widest transition-all border ${value === opt.value
                        ? 'bg-forest text-white border-forest shadow-lg shadow-forest/10 scale-[1.02]'
                        : 'bg-white text-slate-500 border-slate-100 hover:border-forest/20'
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );

    return (
        <div className="space-y-10 md:space-y-16">
            <header className="mb-6 md:mb-10">
                <h3 className="text-forest font-black uppercase tracking-[0.4em] text-sm md:text-md mb-3 md:mb-4">Temporal Health Audit</h3>
                <p className="text-slate-600 text-sm md:text-base font-bold leading-relaxed">Honest dialogue with your inner nature facilitates biological accuracy.</p>
            </header>

            <form onSubmit={analyzeLog} className="space-y-8 md:space-y-12">

                {/* Agni & Ahara (The Fire) */}
                <section className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl md:rounded-[1.8rem] bg-fire/10 flex items-center justify-center text-fire shadow-sm border border-fire/10">
                            <Utensils className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div>
                            <h4 className="text-sm md:text-lg font-black text-forest uppercase tracking-widest leading-none mb-1.5">Metabolic Fire & Nourishment</h4>
                            <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest">Digestion & Elimination</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Appetite [Agni]</label>
                            <SegmentedControl
                                name="agniStatus"
                                value={form.agniStatus}
                                options={[
                                    { label: "Vibrant", value: "high" },
                                    { label: "Balanced", value: "balanced" },
                                    { label: "Low", value: "low" },
                                    { label: "Variable", value: "variable" }
                                ]}
                            />
                            <p className="text-xs text-slate-400 italic font-bold flex items-center gap-2">
                                <Info className="w-3 h-3 text-orange-400" /> Morning hunger indicates a clean, efficient Agni.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Tongue Coating [Ama]</label>
                            <SegmentedControl
                                name="amaStatus"
                                value={form.amaStatus}
                                options={[
                                    { label: "Nirama (Clear)", value: "none" },
                                    { label: "Sama (Thin White)", value: "minimal" },
                                    { label: "Sama (Thick Yellow)", value: "high_ama" }
                                ]}
                            />
                            <p className="text-xs text-slate-400 italic font-bold flex items-center gap-2">
                                <AlertCircle className="w-3 h-3 text-red-300" /> Coating reflects undigested waste (Ama) in the gut.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Bowel Movements [Mala]</label>
                            <SegmentedControl
                                name="bowelStatus"
                                value={form.bowelStatus}
                                options={[
                                    { label: "Clear & Regular", value: "clear" },
                                    { label: "Constipated", value: "constipated" },
                                    { label: "Loose", value: "loose" }
                                ]}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Micturition / Urination [Mutra]</label>
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

                        <div className="space-y-3">
                            <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Dinner Quality</label>
                            <SegmentedControl
                                name="foodQuality"
                                value={form.foodQuality}
                                options={[
                                    { label: "Light", value: "light" },
                                    { label: "Heavy", value: "heavy" },
                                    { label: "Oily", value: "fried" },
                                ]}
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <Zap className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div>
                            <h4 className="text-xs md:text-sm font-black text-forest uppercase tracking-widest">Exercise & Movement</h4>
                            <p className="text-xs md:text-xs font-bold text-slate-300 uppercase tracking-widest">Movement Dynamics</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Morning Flow [Dinacharya]</label>
                        <SegmentedControl
                            name="movement"
                            value={form.movement}
                            options={[
                                { label: "Vigorous", value: "exercise" },
                                { label: "Yoga/Stretch", value: "yoga" },
                                { label: "Light Walk", value: "walk" },
                                { label: "None", value: "none" }
                            ]}
                        />
                        <p className="text-xs text-slate-400 italic font-bold flex items-center gap-2">
                            <Info className="w-3 h-3 text-orange-400" /> Vyayama to half-capacity creates lightness (Laghava) without depleting Ojas.
                        </p>
                    </div>
                </section>

                <section className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-water/10 flex items-center justify-center text-water">
                            <Moon className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div>
                            <h4 className="text-xs md:text-sm font-black text-forest uppercase tracking-widest">Sleep Sanctuary</h4>
                            <p className="text-xs md:text-xs font-bold text-slate-300 uppercase tracking-widest">The Architecture of Sleep</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50">Duration</label>
                                <span className="text-xs font-black text-forest tabular-nums">{form.sleepHours}h</span>
                            </div>
                            <input
                                type="range" name="sleepHours" min="4" max="10" step="0.5"
                                value={form.sleepHours}
                                onChange={(e) => setForm({ ...form, sleepHours: Number(e.target.value) })}
                                className="w-full h-1 bg-slate-100 rounded-full appearance-none cursor-pointer accent-forest transition-all"
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50">Depth Quality</label>
                                <span className="text-xs font-black text-forest tabular-nums">{form.sleepQuality}/5</span>
                            </div>
                            <input
                                type="range" name="sleepQuality" min="1" max="5" step="1"
                                value={form.sleepQuality}
                                onChange={(e) => setForm({ ...form, sleepQuality: Number(e.target.value) })}
                                className="w-full h-1 bg-slate-100 rounded-full appearance-none cursor-pointer accent-forest transition-all"
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-air/10 flex items-center justify-center text-blue-500">
                            <BrainCircuit className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div>
                            <h4 className="text-xs md:text-sm font-black text-forest uppercase tracking-widest">Mind & Energy</h4>
                            <p className="text-xs md:text-sm font-bold text-slate-300 uppercase tracking-widest">Mental Flow & Energy</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Predominant Mood</label>
                            <SegmentedControl
                                name="mood"
                                value={form.mood}
                                options={[
                                    { label: "Calm", value: "calm" },
                                    { label: "Focused", value: "clear" },
                                    { label: "Heavy", value: "sluggish" },
                                    { label: "Anxious", value: "anxious" }
                                ]}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black text-forest uppercase tracking-widest opacity-50 block">Hydration Flow [Jala]</label>
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
                                <span className="text-xs font-black text-slate-400">Liters / Standard Glasses</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-earth/10 flex items-center justify-center text-forest">
                            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div>
                            <h4 className="text-xs md:text-sm font-black text-forest uppercase tracking-widest">Routine Anchors</h4>
                            <p className="text-xs md:text-sm font-bold text-slate-300 uppercase tracking-widest">Biological Rhythms</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {["warm_water", "tongue_scraping", "abhyanga", "meditation"].map((habit) => (
                            <button
                                key={habit}
                                type="button"
                                onClick={() => handleToggleRoutine(habit)}
                                className={`p-3 md:p-4 rounded-xl md:rounded-[1.5rem] flex items-center justify-between transition-all border ${form.routines.includes(habit)
                                    ? 'bg-forest/5 border-forest text-forest'
                                    : 'bg-white border-slate-100 text-slate-400'
                                    }`}
                            >
                                <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em]">{habit.replace("_", " ")}</span>
                                {form.routines.includes(habit) ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-forest" /> : <div className="w-4 h-4 rounded-full border border-slate-200" />}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Additional Insight */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
                            <Info className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-forest uppercase tracking-widest">Additional Nuance</h4>
                            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Anything else Veda should know?</p>
                        </div>
                    </div>
                    <textarea
                        value={form.customNote}
                        onChange={(e) => setForm({ ...form, customNote: e.target.value })}
                        placeholder="I felt a bit bloated after eating too quickly today..."
                        className="w-full bg-white font-bold text-sm text-slate-700 p-6 rounded-[2rem] border border-slate-100 focus:outline-none focus:border-forest/30 shadow-sm min-h-[120px] resize-y"
                    />
                </section>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-forest hover:bg-forest/90 text-white font-black py-6 rounded-[2rem] transition-all shadow-2xl shadow-forest/20 active:scale-[0.98] disabled:opacity-50 text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3"
                >
                    {isLoading ? (
                        <>
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                <Sparkles className="w-5 h-5" />
                            </motion.div>
                            Calibrating Hub...
                        </>
                    ) : (
                        <>Archive Dialogue <CheckCircle2 className="w-4 h-4" /></>
                    )}
                </button>
            </form>
        </div >
    );
}
