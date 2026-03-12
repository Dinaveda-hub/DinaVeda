"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Activity, LayoutGrid, MessageCircle, User, Dna, Heart, Crown } from "lucide-react";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import SubscriptionStatus from "./billing/SubscriptionStatus";

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", icon: Activity },
        { name: "Modules", href: "/modules", icon: LayoutGrid },
        { name: "AyuOne", href: "/ayuone", icon: MessageCircle },
        { name: "Prakriti", href: "/prakriti", icon: Dna },
        { name: "Profile", href: "/profile", icon: User },
        { name: "Pricing", href: "/pricing", icon: Crown },
    ];

    return (
        <aside className="hidden md:flex flex-col w-80 bg-white/80 backdrop-blur-xl border-r border-slate-100 h-screen sticky top-0 shadow-premium z-50">
            <div className="p-10 flex flex-col h-full">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-1 mb-16"
                >
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-14 h-14 transition-transform duration-500 group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="Dinaveda Logo"
                                fill
                                className="object-contain"
                                priority
                                sizes="56px"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-black text-forest tracking-tighter leading-none">Dinaveda</h1>
                            <span className="text-[10px] font-black text-forest/40 uppercase tracking-[0.3em] pl-0.5">Veda Engine</span>
                        </div>
                    </Link>
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
                                        : "text-slate-600 hover:text-forest hover:bg-forest/5"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active"
                                            className="absolute inset-0 bg-forest z-0"
                                            transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                                        />
                                    )}
                                    <Icon className={`w-5 h-5 z-10 transition-transform duration-500 group-hover:scale-110 ${isActive ? "text-white scale-110" : "text-forest"}`} />
                                    <span className={`font-black text-sm z-10 tracking-tight transition-colors ${isActive ? "text-white" : "text-slate-600 group-hover:text-forest"}`}>
                                        {item.name}
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                <div className="mt-auto pointer-events-auto">
                    <SubscriptionStatus />
                </div>
            </div>
        </aside>
    );
}
