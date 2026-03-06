import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { getRazorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
    try {
        const { userId, planType } = await req.json();
        const razorpay = getRazorpay();

        // Use different Plan IDs based on the user's selection
        const planId = planType === 'yearly'
            ? process.env.RAZORPAY_PLAN_ID_YEARLY
            : process.env.RAZORPAY_PLAN_ID_MONTHLY;

        if (!planId) {
            return NextResponse.json(
                { error: `Missing Razorpay Plan ID for ${planType} plan. Please check your Vercel environment variables.` },
                { status: 400 }
            );
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: planId,
            customer_notify: 1,
            total_count: planType === 'yearly' ? 10 : 120, // 10 years of coverage
            notes: {
                user_id: userId
            }
        });

        return NextResponse.json(subscription);
    } catch (error: any) {
        console.error("Razorpay Subscription Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
