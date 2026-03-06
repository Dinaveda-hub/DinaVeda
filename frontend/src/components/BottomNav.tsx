"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Activity, LayoutGrid, MessageCircle, Dna, User } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", icon: Activity },
        { name: "Modules", href: "/modules", icon: LayoutGrid },
        { name: "AyuOne", href: "/ayuone", icon: MessageCircle },
        { name: "Prakriti", href: "/prakriti", icon: Dna },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-xl md:hidden">
            <nav className="glass shadow-premium rounded-[2.5rem] p-2 flex items-center justify-around border border-white/40">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/");

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center justify-center rounded-2xl p-4 transition-all duration-500 relative group ${isActive ? "bg-forest/10 shadow-inner" : "hover:bg-forest/5"
                                }`}
                        >
                            <div className="flex items-center justify-center relative">
                                <Icon className={`w-6 h-6 transition-all duration-500 ${isActive ? "text-forest scale-110" : "text-slate-400 group-hover:text-forest"}`} />
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-2 w-1 h-1 bg-forest rounded-full"
                                    />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
