"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative z-[60] pt-24 pb-12 bg-white border-t border-slate-100">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-12">
                <div className="md:col-span-2 space-y-8">
                    <Link href="/" className="flex items-center gap-3 mb-4 group">
                        <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-110">
                            <Image
                                src="/logo.png"
                                alt="Dinaveda Logo"
                                fill
                                priority
                                sizes="48px"
                                className="object-contain"
                            />
                        </div>
                        <span className="font-black text-3xl text-forest tracking-tighter">Dinaveda</span>
                    </Link>
                    <p className="text-slate-600 max-w-sm font-bold leading-relaxed text-sm uppercase tracking-wide">
                        Ancient wisdom meeting modern intelligence. Build your rhythm, find your balance.
                    </p>
                </div>

                <div>
                    <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-600 mb-8">Product</h4>
                    <ul className="space-y-4 text-sm font-bold text-slate-600">
                        <li>
                            <Link href="/how-it-works" className="hover:text-forest transition-colors">
                                How it works
                            </Link>
                        </li>
                        <li>
                            <Link href="/welcome#health-profile" className="hover:text-forest transition-colors">
                                Start Assessment
                            </Link>
                        </li>
                        <li>
                            <Link href="/login" className="hover:text-forest transition-colors">
                                Sign In
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-600 mb-8">Company</h4>
                    <ul className="space-y-4 text-sm font-bold text-slate-600">
                        <li><Link href="/about" className="hover:text-forest transition-colors">About Us</Link></li>
                        <li><Link href="/privacy" className="hover:text-forest transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-forest transition-colors">Terms of Service</Link></li>
                        <li><Link href="/contact" className="hover:text-forest transition-colors">Contact Support</Link></li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] pt-8 mx-6 border-t border-slate-50">
                © {new Date().getFullYear()} Dinaveda • Optimized for Balance
            </div>
        </footer>
    );
}
