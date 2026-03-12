import SubscribeButton from "./SubscribeButton";
import { Check } from "lucide-react";
import { Plan } from "@/services/billing/plans";

interface PlanCardProps {
    plan: Plan;
    userId: string;
    onSuccess?: () => void;
}

export default function PlanCard({ plan, userId, onSuccess }: PlanCardProps) {
    return (
        <div className={`p-8 rounded-[2rem] border relative flex flex-col items-start text-left h-full ${plan.highlight ? "border-forest bg-forest/5 shadow-xl shadow-forest/10" : "border-slate-200 bg-white shadow-sm"}`}>
            {plan.highlight && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-forest text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Most Popular
                </div>
            )}

            <h3 className="text-2xl font-black mb-2 text-forest tracking-tighter">{plan.name}</h3>

            <div className="text-4xl font-black mb-1 flex items-baseline gap-1 text-slate-800">
                ₹{plan.price} <span className="text-sm font-bold text-slate-600">/{plan.interval}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 mb-2 tracking-wide">
                Billed {plan.interval === "year" ? "yearly" : "monthly"}
            </p>

            {plan.id === "yearly" && (
                <div className="text-xs text-emerald-700 font-bold mb-6">
                    Save ₹1789 with yearly plan
                </div>
            )}
            {plan.id === "monthly" && <div className="mb-8" />}

            <ul className="space-y-4 mb-10 flex-1 w-full">
                {plan.features.map((f: string) => (
                    <li key={f} className="text-sm text-slate-600 font-medium flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-emerald-700" />
                        </div>
                        {f}
                    </li>
                ))}
            </ul>

            <SubscribeButton
                plan={plan.id}
                userId={userId}
                onSuccess={onSuccess}
                className="w-full justify-center py-4"
            />
        </div>
    );
}
