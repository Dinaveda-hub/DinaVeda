"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Activity, LayoutGrid, MessageCircle, User, Settings as SettingsIcon, Heart } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/", icon: Activity },
        { name: "Modules", href: "/modules", icon: LayoutGrid },
        { name: "Veda AI Hub", href: "/veda-ai", icon: MessageCircle },
        { name: "Settings", href: "/settings", icon: SettingsIcon },
    ];

    return (
        <aside className="hidden md:flex flex-col w-80 bg-white border-r border-slate-50 h-screen sticky top-0 shadow-premium z-50">
            <div className="p-10 flex flex-col h-full">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-1 mb-16"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-forest rounded-[1.25rem] flex items-center justify-center shadow-xl shadow-forest/10">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-forest tracking-tighter leading-none">Dinaveda</h1>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-1 block">Aura Systems</span>
                        </div>
                    </div>
                </motion.div>

                <nav className="space-y-4">
                    {navItems.map((item, idx) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/");

                        return (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-5 px-6 py-5 rounded-[1.75rem] transition-all duration-500 group relative overflow-hidden ${isActive
                                        ? "text-white shadow-lg shadow-forest/10"
                                        : "text-slate-400 hover:text-forest hover:bg-forest/5"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active"
                                            className="absolute inset-0 bg-forest z-0"
                                            transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                                        />
                                    )}
                                    <Icon className={`w-5 h-5 z-10 transition-transform duration-500 group-hover:scale-110 ${isActive ? "text-white scale-110" : "group-hover:text-forest"}`} />
                                    <span className={`font-black text-sm z-10 tracking-tight transition-colors ${isActive ? "text-white" : "group-hover:text-forest"}`}>
                                        {item.name}
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                <div className="mt-auto">
                    <div className="glass p-6 rounded-[2rem] border border-forest/10 relative overflow-hidden group hover:border-forest/30 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-forest/5 rounded-full -mr-10 -mt-10 blur-xl group-hover:bg-forest/10 transition-all" />
                        <p className="text-[10px] font-black text-forest uppercase tracking-[0.2em] mb-4">Neural Harmony</p>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-2.5 h-2.5 rounded-full bg-forest animate-ping absolute inset-0 opacity-40"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-forest relative"></div>
                            </div>
                            <span className="text-xs font-black text-forest/70 uppercase tracking-widest">Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
