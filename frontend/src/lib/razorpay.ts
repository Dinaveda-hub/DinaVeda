import Razorpay from "razorpay";

let razorpayInstance: Razorpay | null = null;

export const getRazorpay = () => {
    if (!razorpayInstance) {
        const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET;

        if (!keyId || !keySecret) {
            console.error(`[Razorpay] Initialization failure: ${!keyId ? 'Key ID missing' : ''} ${!keySecret ? 'Secret missing' : ''}`);
        }

        razorpayInstance = new Razorpay({
            key_id: keyId || 'missing_key',
            key_secret: keySecret || 'missing_secret',
        });
    }
    return razorpayInstance;
};
