import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

        const supabase = createClient(
            supabaseUrl,
            supabaseKey
        );
        const body = await req.text();
        const signature = req.headers.get("x-razorpay-signature");

        if (!signature) {
            return NextResponse.json({ error: "No signature" }, { status: 400 });
        }

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(body)
            .digest("hex");

        if (expectedSignature !== signature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        const event = JSON.parse(body);
        const { payload } = event;
        const subscription = payload.subscription.entity;
        const userId = subscription.notes?.user_id;

        if (!userId) {
            console.error("No user_id in subscription notes");
            return NextResponse.json({ success: true }); // Acknowledge anyway
        }

        switch (event.event) {
            case "subscription.activated":
            case "subscription.charged":
                await supabase
                    .from("profiles")
                    .update({
                        plan: "premium",
                        subscription_status: "active",
                        subscription_id: subscription.id,
                        subscription_end: new Date(subscription.current_end * 1000).toISOString(),
                    })
                    .eq("id", userId);
                break;

            case "subscription.cancelled":
            case "subscription.expired":
                await supabase
                    .from("profiles")
                    .update({
                        plan: "free",
                        subscription_status: "inactive",
                    })
                    .eq("id", userId);
                break;

            default:
                console.log("Unhandled Razorpay event:", event.event);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Razorpay Webhook Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
