"use client";

import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function SubscriptionStatus() {
    const { subscriptionStatus } = usePhysiologyState();

    if (subscriptionStatus === "active") {
        return (
            <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-emerald-800">Status</p>
                        <h4 className="text-lg font-black text-forest">Premium Active</h4>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-slate-500">Thank you for supporting</p>
                    <p className="text-xs font-bold text-slate-500">Dinaveda's mission.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-orange-50/80 border border-orange-200 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                    <p className="text-xs font-black uppercase tracking-widest text-orange-800">Status</p>
                    <h4 className="text-lg font-black text-orange-900">Free Plan</h4>
                </div>
            </div>
        </div>
    );
}
