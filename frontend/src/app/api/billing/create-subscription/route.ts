import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { getRazorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
    try {
        const { userId, planType } = await req.json();
        const razorpay = getRazorpay();

        // DEBUG: Log which variables the server can actually see (names only)
        const envKeys = Object.keys(process.env).filter(k => k.includes('RAZOR')).join(', ');
        console.log(`[Environment Check] Available Razor-related keys: ${envKeys || 'NONE FOUND'}`);

        const planId = planType === 'yearly'
            ? (process.env.RAZORPAY_PLAN_ID_YEARLY || 'plan_SNzd3k1dHZi1hQ')
            : (process.env.RAZORPAY_PLAN_ID_MONTHLY || 'plan_SNzcno0nk58APl');

        console.log(`[Billing API] PlanType: ${planType} -> Using PlanId: ${planId}`);

        const subscription = await razorpay.subscriptions.create({
            plan_id: planId,
            customer_notify: 1,
            total_count: planType === 'yearly' ? 12 : 60, // 1 year for yearly, 5 years for monthly
            notes: {
                user_id: userId
            }
        });

        const response = NextResponse.json(subscription);

        // CORS Headers
        const origin = req.headers.get("origin") || "";
        const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || "").split(",");
        if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
            response.headers.set("Access-Control-Allow-Origin", origin);
        }

        return response;
    } catch (error: any) {
        console.error("Razorpay Subscription Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function OPTIONS() {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return response;
}
