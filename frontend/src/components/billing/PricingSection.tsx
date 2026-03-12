"use client";

import { plans } from "@/services/billing/plans";
import PlanCard from "./PlanCard";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import SubscriptionStatus from "./SubscriptionStatus";

interface PricingSectionProps {
    userId?: string;
    onSuccess?: () => void;
}

export default function PricingSection({ userId: propUserId, onSuccess }: PricingSectionProps) {
    const { userId: hookUserId, subscriptionStatus } = usePhysiologyState();
    const userId = propUserId || hookUserId;

    return (
        <div className="w-full">
            {subscriptionStatus === "active" ? (
                <div className="mb-8">
                    <SubscriptionStatus />
                </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        userId={userId || ''}
                        onSuccess={onSuccess}
                    />
                ))}
            </div>
        </div>
    );
}
