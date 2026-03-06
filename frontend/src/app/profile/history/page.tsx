"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { motion } from "framer-motion";
import { Calendar, Clock, Activity, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLogs() {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

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

        fetchLogs();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <header className="max-w-4xl mx-auto flex items-center justify-between mb-12">
                <Link href="/profile" className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-forest transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Profile
                </Link>
                <div className="text-right">
                    <h1 className="text-3xl font-black text-forest tracking-tighter">Biological Logs</h1>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Temporal Health Archive</p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto space-y-4">
                {loading ? (
                    <div className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing Archives...</div>
                ) : logs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 text-slate-400 font-bold uppercase tracking-widest text-xs shadow-sm">
                        No logs found in your pulse history.
                    </div>
                ) : (
                    logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-forest/5 flex items-center justify-center text-forest">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-forest uppercase tracking-widest">
                                        {log.mood} Energy • {log.movement.replace("_", " ")}
                                    </h3>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                            <Calendar className="w-3 h-3" /> {new Date(log.created_at).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                            <Clock className="w-3 h-3" /> {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 px-6 py-4 bg-slate-50 rounded-2xl shrink-0">
                                <div className="text-center">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Ojas</span>
                                    <span className="text-lg font-black text-forest">{log.ojas_score || "--"}</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Sleep</span>
                                    <span className="text-lg font-black text-slate-700">{log.sleep_hours}h</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Agni</span>
                                    <span className="text-lg font-black text-orange-600 capitalize">{log.agni}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </main>
        </div>
    );
}
