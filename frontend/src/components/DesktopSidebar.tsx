"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, LayoutGrid, MessageCircle, User, Settings as SettingsIcon } from "lucide-react";

export default function DesktopSidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", icon: Activity },
        { name: "Modules", href: "/modules", icon: LayoutGrid },
        { name: "Veda AI Hub", href: "/veda-ai", icon: MessageCircle },
        { name: "Settings", href: "/settings", icon: SettingsIcon },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <Activity className="w-8 h-8 text-[#2D5A43]" />
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dinaveda</h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/");

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                    ? "bg-[#2D5A43] text-white shadow-md shadow-emerald-900/10"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 mt-auto">
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100/50">
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">Status</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-sm font-semibold text-emerald-900">Veda AI Online</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
