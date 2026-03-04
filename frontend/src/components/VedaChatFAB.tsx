"use client";

import { Sparkles, X, Send } from "lucide-react";
import { useState, useEffect } from "react";

export default function VedaChatFAB() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "ai", text: "Namaste! How can I guide your wellness today?" }
    ]);
    const [input, setInput] = useState("");

    const [isTyping, setIsTyping] = useState(false);

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
                    className={`bg-[#2D7A5C] hover:bg-emerald-800 text-white rounded-full p-4 shadow-2xl transition-all duration-300 active:scale-95 flex items-center justify-center group ${isOpen ? "rotate-90" : ""}`}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse group-hover:animate-none" />}
                </button>

                {/* Chat Overlay */}
                {isOpen && (
                    <div className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] max-w-[340px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden flex flex-col mb-4 origin-bottom-right animate-in fade-in zoom-in duration-300">
                        {/* Header */}
                        <div className="bg-white p-5 border-b border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#E3F2ED] rounded-2xl flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-[#2D7A5C]" />
                                </div>
                                <div>
                                    <span className="font-black text-sm text-slate-800 tracking-tight block">Veda Intelligence</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-[10px] font-black text-emerald-600 uppercase">Live Pulse</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-5 space-y-4 bg-[#F8F9F8]">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm font-bold leading-relaxed ${msg.role === "user"
                                        ? "bg-white text-slate-800 border border-slate-100 rounded-br-none shadow-sm"
                                        : "bg-[#E3F2ED] text-[#2D7A5C] rounded-bl-none shadow-none"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-slate-50 flex gap-2">
                            <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-100 flex items-center px-4 py-1 focus-within:border-[#2D7A5C] transition-colors">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Message Veda..."
                                    className="flex-1 bg-transparent text-sm outline-none font-bold placeholder:text-slate-400"
                                />
                            </div>
                            <button
                                onClick={handleSend}
                                className="bg-[#2D7A5C] text-white p-3 rounded-2xl active:scale-90 transition-all hover:bg-emerald-800 disabled:opacity-50"
                                disabled={!input.trim()}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
