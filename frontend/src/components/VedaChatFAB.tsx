"use client";

import { Sparkles, X, Send, Leaf, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VedaChatFAB() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "ai", text: "Namaste! How can I guide your wellness today?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Hydrate initial message with prakriti if available
        const result = localStorage.getItem("prakriti_result");
        if (result) {
            const data = JSON.parse(result);
            setMessages([
                { role: "ai", text: `Namaste! I see your biological rhythm aligns with ${data.type}. How can I guide your wellness today?` }
            ]);
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMessage = input;
        setMessages(prev => [...prev, { role: "user", text: userMessage }]);
        setInput("");
        setIsTyping(true);

        const storedResult = localStorage.getItem("prakriti_result");
        const prakriti = storedResult ? JSON.parse(storedResult).type : "Unknown";

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001'}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, prakriti }),
            });
            if (!res.ok) {
                throw new Error("Backend not fully reloaded yet.");
            }
            const data = await res.json();
            if (data.reply) {
                setMessages(prev => [...prev, { role: "ai", text: data.reply }]);
            } else {
                throw new Error("Empty reply");
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "ai", text: "I'm currently unable to access the neural core. Please make sure your Python API is running on port 8001." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-24 right-4 z-50 pointer-events-none">
            <div className="relative pointer-events-auto">
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`bg-forest hover:bg-emerald-800 text-white rounded-[2rem] p-4 shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 flex items-center justify-center group ${isOpen ? "rotate-90 bg-slate-800 hover:bg-slate-900" : ""}`}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse group-hover:animate-none" />}
                </button>

                {/* Chat Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] max-w-[360px] bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden flex flex-col mb-4 origin-bottom-right"
                        >
                            {/* Header */}
                            <div className="bg-white/50 p-6 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center shadow-inner border border-forest/5">
                                        <Leaf className="w-6 h-6 text-forest" />
                                    </div>
                                    <div>
                                        <span className="font-black text-base text-forest tracking-tight block">Veda Intelligence</span>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Conscious</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="h-[350px] overflow-y-auto p-5 space-y-5 bg-white/40 custom-scrollbar">
                                <AnimatePresence initial={false}>
                                    {messages.map((msg, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex gap-3 ${msg.role === "user" ? "justify-end flex-row-reverse" : "justify-start"}`}
                                        >
                                            {/* Avatar */}
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === "user" ? "bg-slate-100 text-slate-400" : "bg-forest/10"}`}>
                                                {msg.role === "ai" ? <Leaf className="w-4 h-4 text-forest" /> : <User className="w-4 h-4" />}
                                            </div>

                                            {/* Bubble */}
                                            <div className={`max-w-[75%] p-4 text-sm font-bold leading-relaxed break-words whitespace-pre-wrap shadow-sm ${msg.role === "user"
                                                ? "bg-slate-800 text-white rounded-[1.5rem] rounded-tr-sm"
                                                : "bg-white text-slate-700 rounded-[1.5rem] border border-slate-100 rounded-tl-sm"
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-3 justify-start"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center shrink-0 shadow-sm">
                                                <Leaf className="w-4 h-4 text-forest" />
                                            </div>
                                            <div className="bg-white p-4 rounded-[1.5rem] rounded-tl-sm border border-slate-100 shadow-sm flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 bg-forest/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="w-1.5 h-1.5 bg-forest/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-1.5 h-1.5 bg-forest/40 rounded-full animate-bounce"></div>
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </AnimatePresence>
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-white/80 border-t border-slate-100 flex gap-3 items-center backdrop-blur-md">
                                <div className="flex-1 bg-white rounded-full border border-slate-200 shadow-inner flex items-center px-5 py-2 focus-within:border-forest/50 focus-within:ring-2 ring-forest/10 transition-all">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        placeholder="Ask Veda..."
                                        className="flex-1 bg-transparent text-sm outline-none font-bold text-slate-700 placeholder:text-slate-400"
                                    />
                                </div>
                                <button
                                    onClick={handleSend}
                                    className="bg-forest text-white p-3.5 rounded-full active:scale-90 transition-all hover:bg-emerald-800 disabled:opacity-50 disabled:hover:scale-100 shadow-sm"
                                    disabled={!input.trim()}
                                >
                                    <Send className="w-5 h-5 ml-0.5" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
