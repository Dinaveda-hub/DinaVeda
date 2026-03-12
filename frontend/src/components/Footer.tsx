"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative z-[60] pt-20 pb-12 bg-gradient-to-b from-white to-[#F6F8F7] border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-16 mb-16 divide-y divide-slate-100 lg:divide-y-0">
                    <div className="lg:col-span-2 space-y-6 pb-12 lg:pb-0">
                        <Link href="/" aria-label="Go to Dinaveda homepage" className="flex items-center gap-3 mb-4 group">
                            <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-110">
                                <Image
                                    src="/logo.png"
                                    alt="Dinaveda Logo"
                                    fill
                                    sizes="48px"
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-black text-3xl text-forest tracking-tighter">Dinaveda</span>
                        </Link>
                        <p className="text-slate-600 max-w-sm font-medium leading-relaxed text-sm">
                            Ancient wisdom meets modern intelligence. Build your rhythm and restore balance.
                        </p>
                        <p className="text-xs font-medium text-slate-400 max-w-md leading-relaxed">
                            Dinaveda provides lifestyle guidance based on Ayurvedic principles. It does not diagnose or treat medical conditions.
                        </p>
                    </div>

                    <div className="pt-12 lg:pt-0">
                        <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-400 mb-8">Product</h4>
                        <ul className="space-y-4 text-sm font-semibold text-slate-600">
                            <li><Link href="/#how-it-works" className="hover:text-forest transition-colors">How it works</Link></li>
                            <li><Link href="/#features" className="hover:text-forest transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-forest transition-colors">Pricing</Link></li>
                            <li><Link href="/login" className="hover:text-forest transition-colors">Sign In</Link></li>
                        </ul>
                    </div>

                    <div className="pt-12 lg:pt-0">
                        <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-400 mb-8">Resources</h4>
                        <ul className="space-y-4 text-sm font-semibold text-slate-600">
                            <li><Link href="/faq" className="hover:text-forest transition-colors">FAQ</Link></li>
                            <li><Link href="/about" className="hover:text-forest transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-forest transition-colors">Contact</Link></li>
                            <li><Link href="/guide" className="hover:text-forest transition-colors">Ayurveda Guide</Link></li>
                        </ul>
                    </div>

                    <div className="pt-12 lg:pt-0">
                        <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-400 mb-8">Legal</h4>
                        <ul className="space-y-4 text-sm font-semibold text-slate-600">
                            <li><Link href="/privacy" className="hover:text-forest transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-forest transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-slate-200/60">
                    <Link 
                        href="/login" 
                        className="group flex items-center gap-2 text-sm font-semibold text-forest hover:underline transition-all"
                    >
                        Start your Ayurvedic health profile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="text-slate-400 text-[11px] font-medium tracking-wide">
                        © {new Date().getFullYear()} Dinaveda • Optimized for Balance
                    </div>
                </div>
            </div>
        </footer>
    );
}
