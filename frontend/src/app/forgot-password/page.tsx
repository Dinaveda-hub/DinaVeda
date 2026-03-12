"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ArrowLeft, Mail, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const supabase = createClient();

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback?next=/profile`,
            });
            if (error) throw error;

            setMessage({ type: 'success', text: 'Reset link sent. Please check your inbox for the sanctuary access link.' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to send reset link.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background relative flex items-center justify-center p-6 font-sans overflow-hidden text-slate-800">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-forest/5 rounded-full -ml-40 -mt-40 blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass shadow-premium rounded-[3rem] p-10 md:p-14 border border-white/60 text-center relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-white text-forest flex items-center justify-center shadow-lg mb-8">
                            <Leaf className="w-8 h-8" />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-forest tracking-tighter mb-4 leading-none lowercase">
                            Reset Access
                        </h1>
                        <p className="text-sm font-bold text-slate-600 mb-10 text-balance uppercase tracking-widest leading-relaxed">
                            Enter your email to receive a secure login link
                        </p>

                        <form onSubmit={handleReset} className="w-full space-y-4 mb-8">
                            <div className="relative">
                                <label htmlFor="email-reset" className="sr-only">Email Address</label>
                                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                <input
                                    id="email-reset"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full bg-white/60 border border-slate-100 focus:border-forest/30 focus:ring-4 focus:ring-forest/5 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 placeholder:text-slate-300 outline-none transition-all duration-300 shadow-sm"
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-forest text-white py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-forest/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 group"
                            >
                                {loading ? (
                                    <>
                                        <Sparkles className="w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Reset Link
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <AnimatePresence>
                            {message && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`mb-6 p-4 rounded-xl text-[10px] font-black uppercase tracking-wider leading-relaxed border w-full ${message.type === 'success'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                        : 'bg-red-50 text-red-700 border-red-100'
                                        }`}
                                >
                                    {message.text}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Link
                            href="/login"
                            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-forest/70 hover:text-forest transition-colors"
                        >
                            <ArrowLeft className="w-3 h-3" /> Back to Sign In
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
