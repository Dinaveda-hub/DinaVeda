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

        const response = isValid
            ? NextResponse.json({ success: true })
            : NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });

        // CORS Headers
        const origin = req.headers.get("origin") || "";
        const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || "").split(",");
        if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
            response.headers.set("Access-Control-Allow-Origin", origin);
        }

        return response;
    } catch (error: any) {
        console.error("Razorpay Verification Error:", error);
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
