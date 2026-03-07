"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Activity, ArrowLeft, Trash2, CheckCircle2, Moon, Utensils, Zap, BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const supabase = createClient();

    async function fetchLogs() {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            const { data, error } = await supabase
                .from("pulse_logs")
                .select("*")
                .eq("user_id", session.user.id)
                .order("created_at", { ascending: false });

            if (data) setLogs(data);
            if (error) console.error("Error fetching logs:", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchLogs();
    }, []);

    const deleteLog = async (id: string) => {
        setDeletingId(id);
        const { error } = await supabase
            .from("pulse_logs")
            .delete()
            .eq("id", id);

        if (!error) {
            setLogs(prev => prev.filter(log => log.id !== id));
        } else {
            console.error("Delete error:", error);
        }
        setDeletingId(null);
    };

    // Group logs by date
    const groupedLogs = logs.reduce((acc: any, log) => {
        const date = new Date(log.created_at).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(log);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-[#F8FAF9] p-6 md:p-12 pb-32">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/5 to-transparent pointer-events-none -z-10 -mr-60 -mt-60" />

            <header className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <div>
                    <Link href="/profile" className="inline-flex items-center gap-2 text-slate-400 font-bold uppercase tracking-[0.2em] text-xs hover:text-forest transition-all mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Profile
                    </Link>
                    <h1 className="text-5xl font-black text-forest tracking-tighter">Biological Logs</h1>
                    <p className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] mt-2">Temporal Health Archive</p>
                </div>
                {logs.length > 0 && (
                    <div className="bg-white/60 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/80 shadow-premium flex items-center gap-6">
                        <div className="text-center">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-0.5">Average Ojas</span>
                            <span className="text-xl font-black text-forest">
                                {Math.round(logs.reduce((a, b) => a + (b.ojas_score || 0), 0) / logs.length)}
                            </span>
                        </div>
                        <div className="w-px h-8 bg-slate-100" />
                        <div className="text-center">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-0.5">Total Logs</span>
                            <span className="text-xl font-black text-slate-700">{logs.length}</span>
                        </div>
                    </div>
                )}
            </header>

            <main className="max-w-4xl mx-auto space-y-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="text-forest opacity-20"
                        >
                            <BrainCircuit className="w-12 h-12" />
                        </motion.div>
                        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Accessing Archives...</p>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="text-center py-32 glass rounded-[3rem] border border-white/40 shadow-premium flex flex-col items-center gap-6">
                        <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200">
                            <Activity className="w-10 h-10" />
                        </div>
                        <div>
                            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">No entries found in your pulse history.</p>
                            <p className="text-xs font-bold text-slate-300 mt-2">Log your daily dialogue to populate this archive.</p>
                        </div>
                        <Link href="/ayuone" className="text-forest font-black uppercase tracking-widest text-xs bg-forest/5 px-6 py-3 rounded-full hover:bg-forest hover:text-white transition-all">
                            Initialize Log
                        </Link>
                    </div>
                ) : (
                    Object.entries(groupedLogs).map(([date, dayLogs]: [string, any]) => (
                        <section key={date} className="space-y-6">
                            <h2 className="text-xs font-black text-forest uppercase tracking-[0.4em] ml-4 flex items-center gap-3">
                                <Calendar className="w-3.5 h-3.5" />
                                {date}
                            </h2>
                            <div className="space-y-4">
                                <AnimatePresence mode="popLayout">
                                    {dayLogs.map((log: any) => (
                                        <motion.div
                                            key={log.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="glass p-6 md:p-8 rounded-[2.5rem] border border-white/40 shadow-premium group relative overflow-hidden"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 rounded-3xl bg-forest/5 flex items-center justify-center text-forest shadow-sm border border-forest/5 group-hover:bg-forest group-hover:text-white transition-all duration-500">
                                                        <Activity className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-black text-forest tracking-tight capitalize">
                                                            {log.mood} Energy • {log.movement.replace("_", " ")}
                                                        </h3>
                                                        <div className="flex items-center gap-4 mt-1.5">
                                                            <span className="flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-widest">
                                                                <Clock className="w-3.5 h-3.5 text-slate-300" />
                                                                {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                                                    <div className="flex items-center gap-8 px-8 py-5 bg-white/40 rounded-[2rem] border border-white/60">
                                                        <div className="text-center">
                                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Ojas</span>
                                                            <span className="text-2xl font-black text-forest">{log.ojas_score || "--"}</span>
                                                        </div>
                                                        <div className="w-px h-10 bg-forest/5" />
                                                        <div className="text-center">
                                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Sleep</span>
                                                            <span className="text-2xl font-black text-slate-700 flex items-baseline gap-0.5">
                                                                {log.sleep_hours}<span className="text-xs text-slate-400">h</span>
                                                            </span>
                                                        </div>
                                                        <div className="w-px h-10 bg-forest/5" />
                                                        <div className="text-center">
                                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Agni</span>
                                                            <span className={`text-2xl font-black capitalize ${log.agni === 'high' ? 'text-amber-600' :
                                                                log.agni === 'low' ? 'text-blue-600' : 'text-emerald-600'
                                                                }`}>{log.agni}</span>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => deleteLog(log.id)}
                                                        disabled={deletingId === log.id}
                                                        className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-300 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Details Expandable */}
                                            {log.detailed_analysis && (
                                                <div className="mt-8 pt-8 border-t border-forest/5">
                                                    <p className="text-xs font-black text-forest uppercase tracking-widest mb-4 opacity-50">Veda Insights</p>
                                                    <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
                                                        "{log.detailed_analysis}"
                                                    </p>
                                                </div>
                                            )}

                                            {log.routines && log.routines.length > 0 && (
                                                <div className={`mt-8 pt-8 border-t border-forest/5 flex flex-wrap gap-3 ${log.detailed_analysis ? 'border-t-0 pt-4' : ''}`}>
                                                    {log.routines.map((r: string) => (
                                                        <span key={r} className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 rounded-full text-xs font-black text-forest uppercase tracking-widest border border-white/60">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            {r.replace("_", " ")}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </section>
                    ))
                )}
            </main>
        </div>
    );
}
