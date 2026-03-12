"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface HealthTrendsProps {
    logs: any[];
}

export default function HealthTrends({ logs }: HealthTrendsProps) {
    if (!logs || logs.length === 0) return null;

    // We want the oldest first for a left-to-right timeline
    const data = logs.slice(0, 14).reverse().map((log: any) => ({
        date: new Date(log.created_at).toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }),
        ojas: log.ojas_score || 0,
        sleep: log.sleep_hours || 0,
    }));

    return (
        <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/40 shadow-premium">
            <header className="mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-forest mb-2">
                    Biological Trends
                </h3>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Last 14 Days</p>
            </header>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
                            dy={10} 
                        />
                        <YAxis hide />
                        <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
                            labelStyle={{ fontWeight: 900, color: '#042f1b', marginBottom: '8px' }}
                            itemStyle={{ fontWeight: 700, fontSize: '14px' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="ojas"
                            name="Ojas"
                            stroke="#2D7A5C"
                            strokeWidth={4}
                            dot={{ fill: '#2D7A5C', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="sleep"
                            name="Sleep (hrs)"
                            stroke="#94A3B8"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 5, fill: '#94A3B8', strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-6 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-forest" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ojas Score</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-400" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sleep Hours</span>
                </div>
            </div>
        </div>
    );
}
