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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm md:hidden">
            <nav className="glass shadow-premium rounded-[2.5rem] p-3 flex items-center justify-between border border-white/40">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/");

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center justify-center rounded-full p-4 transition-all duration-500 relative group ${isActive ? "bg-forest/80 shadow-2xl shadow-forest/40 grow mx-1" : "hover:bg-forest/5 flex-1"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Icon className={`w-5 h-5 transition-all duration-500 ${isActive ? "text-white scale-110" : "text-slate-600 group-hover:text-forest"}`} />
                                {isActive && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        className="text-sm font-black text-white uppercase tracking-widest whitespace-nowrap overflow-hidden pr-2"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
