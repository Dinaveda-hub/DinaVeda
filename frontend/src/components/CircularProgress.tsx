"use client";

interface CircularProgressProps {
    value: number; // Current value
    max: number;   // Max possible value
    label: string; // Domain name (e.g., Nidra, Ahara)
    color?: string; // Stroke color (e.g., text-emerald-500)
}

export default function CircularProgress({ value, max, label, color = "text-[#2D7A5C]" }: CircularProgressProps) {
    const radius = 40;
    const stroke = 6;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / max) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-1">
            <div className="relative flex items-center justify-center">
                {/* Background Circle */}
                <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
                    <circle
                        stroke="#F1F5F9"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    {/* Progress Circle */}
                    <circle
                        className={`transition-all duration-1000 ease-out ${color}`}
                        stroke="currentColor"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + " " + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-[13px] font-black text-slate-800 tracking-tight">{value}</span>
                </div>
            </div>
            <span className="mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        </div>
    );
}
