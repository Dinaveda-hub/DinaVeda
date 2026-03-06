import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const {
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature
        } = await req.json();

        const body = razorpay_payment_id + "|" + razorpay_subscription_id;

        const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET;
        const expectedSignature = crypto
            .createHmac("sha256", keySecret!)
            .update(body)
            .digest("hex");

        const isValid = expectedSignature === razorpay_signature;

        if (isValid) {
            // Logic to update user plan in Supabase should go here or be handled by webhook
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Razorpay Verification Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
