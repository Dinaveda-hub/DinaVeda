"use client";

import { plans } from "@/services/billing/plans";
import PlanCard from "./PlanCard";
import { usePhysiologyState } from "@/hooks/usePhysiologyState";
import SubscriptionStatus from "./SubscriptionStatus";

interface PricingSectionProps {
    onSuccess?: () => void;
}

export default function PricingSection({ onSuccess }: PricingSectionProps) {
    const { userId, subscriptionStatus } = usePhysiologyState();

    return (
        <div className="w-full">
            {subscriptionStatus === "active" ? (
                <div className="mb-8">
                    <SubscriptionStatus />
                </div>
            ) : null}

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
