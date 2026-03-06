"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

import { VedaState } from "@/engine/stateModel";

export type SubscriptionPlan = "free" | "premium";

export function useSubscription() {
    const [plan, setPlan] = useState<SubscriptionPlan>("free");
    const [status, setStatus] = useState<string>("inactive");
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        async function checkSubscription() {
            try {
                const supabase = createBrowserClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );

                const { data: { session } } = await supabase.auth.getSession();

                if (session) {
                    setUserId(session.user.id);
                    const { data: profile } = await supabase
                        .from("profiles")
                        .select("plan, subscription_status")
                        .eq("id", session.user.id)
                        .single();

                    if (profile) {
                        setPlan(profile.plan as SubscriptionPlan || "free");
                        setStatus(profile.subscription_status || "inactive");
                    }
                }
            } catch (error) {
                console.error("Failed to load subscription status:", error);
            } finally {
                setIsLoading(false);
            }
        }

        checkSubscription();
    }, []);

    const isPremium = plan === "premium" && status === "active";

    const getSmartTrigger = (state: VedaState | null) => {
        if (!state) return "Unlock personalized Ayurvedic guidance for your daily balance.";

        // Health Data Driven Triggers
        if (state.vata_state > 65) return "Your Vata imbalance could benefit from personalized routines. Upgrade for tailored guidance.";
        if (state.pitta_state > 65) return "Pitta drift detected. Unlock heat-balancing diets and routines in Premium.";
        if (state.kapha_state > 65) return "Kapha accumulation detected. Unlock stimulating movement protocols.";

        if (state.agni_strength < 40) return "Your Agni is weak. Premium can generate a personalized diet protocol to restore your metabolic fire.";
        if (state.sleep_debt > 30) return "Your sleep rhythm is drifting. Premium can generate a personalized sleep protocol.";

        if (state.stress_load > 60) return "High stress detected. Unlock personalized Manasayur practices for mental clarity.";

        return "Upgrade to Premium for personalized Ayurvedic routines tailored to your body's daily balance.";
    };

    return {
        plan,
        status,
        isPremium,
        isLoading,
        userId,
        getSmartTrigger
    };
}
