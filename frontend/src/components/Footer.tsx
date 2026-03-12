"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative z-[60] pt-24 pb-12 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-16 mb-12">
                    <div className="lg:col-span-2 space-y-8">
                        <Link href="/" aria-label="Dinaveda home" className="flex items-center gap-3 mb-4 group">
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
                        <p className="text-slate-600 max-w-sm font-bold leading-relaxed text-sm uppercase tracking-wide">
                            Ancient wisdom meeting modern intelligence. Build your rhythm, find your balance.
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 max-w-md leading-loose">
                            Dinaveda provides lifestyle and wellness guidance based on Ayurvedic principles. 
                            It is not intended to diagnose or treat medical conditions.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-600 mb-8">Product</h4>
                        <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
                            <li><Link href="/how-it-works" className="hover:text-forest transition-colors">How it works</Link></li>
                            <li><Link href="/#features" className="hover:text-forest transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-forest transition-colors">Pricing</Link></li>
                            <li><Link href="/login" className="hover:text-forest transition-colors">Sign In</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-600 mb-8">Resources</h4>
                        <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
                            <li><Link href="/faq" className="hover:text-forest transition-colors">FAQ</Link></li>
                            <li><Link href="/about" className="hover:text-forest transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-forest transition-colors">Contact</Link></li>
                            <li className="opacity-40 cursor-not-allowed">Ayurveda Guide</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-600 mb-8">Legal</h4>
                        <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
                            <li><Link href="/privacy" className="hover:text-forest transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-forest transition-colors">Terms of Service</Link></li>
                            <li className="opacity-40 cursor-not-allowed">Medical Disclaimer</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-slate-50">
                    <Link 
                        href="/login" 
                        className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-forest hover:opacity-70 transition-all"
                    >
                        Start your Ayurvedic health profile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">
                        © {new Date().getFullYear()} Dinaveda • Optimized for Balance
                    </div>
                </div>
            </div>
        </footer>
    );
}
