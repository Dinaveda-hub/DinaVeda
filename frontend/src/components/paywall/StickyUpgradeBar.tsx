"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyUpgradeBar() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past hero (approx 300px)
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex items-center justify-between z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden"
                >
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Premium Access</span>
                        <div className="text-xs font-bold text-slate-600">
                            From <span className="text-forest">₹399/month</span>
                        </div>
                    </div>

                    <Link
                        href="/login?redirect=subscribe"
                        className="bg-forest text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-forest/20 active:scale-95 transition-transform"
                    >
                        Start Premium
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
