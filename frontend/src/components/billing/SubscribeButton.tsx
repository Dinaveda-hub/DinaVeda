"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface SubscribeButtonProps {
    plan: "monthly" | "yearly";
    userId: string;
    onSuccess?: () => void;
    className?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export default function SubscribeButton({ plan, userId, onSuccess, className }: SubscribeButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const startSubscription = async () => {
        if (!userId) {
            console.error("User ID required for subscription");
            return;
        }

        // Razorpay Existence Guard
        if (!(window as any).Razorpay) {
            alert("Payment system is still loading. Please try again in a few seconds.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const res = await fetch(
                `${API_URL}/api/billing/create-subscription`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ plan, user_id: userId })
                }
            );

            if (!res.ok) {
                throw new Error("Failed to create subscription");
            }

            const data = await res.json();

            const options = {
                key: data.key,
                subscription_id: data.subscriptionId,
                name: "Dinaveda Premium",
                description: "Ayurvedic AI Health System",
                theme: { color: "#1B5E43" }, // Forest Green
                handler: function (response: any) {
                    // Payment successful locally, webhook will handle DB
                    console.log("Payment successful", response);
                    if (onSuccess) onSuccess();
                },
                prefill: {
                    // Could prefill email/contact if we had it
                },
                modal: {
                    ondismiss: function () {
                        setIsLoading(false);
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                console.error(response.error.description);
                alert("Payment failed. Please try again.");
                setIsLoading(false);
            });
            rzp.open();

        } catch (error) {
            console.error("Subscription error:", error);
            setIsLoading(false);
            alert("Unable to start subscription process. Please try again.");
        }
    };

    return (
        <button
            onClick={startSubscription}
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 bg-forest text-white px-6 py-3 rounded-full font-black hover:bg-emerald-800 transition-colors disabled:opacity-70 ${className || ''}`}
        >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {plan === "yearly" ? "Subscribe Annually" : "Subscribe Monthly"}
        </button>
    );
}
