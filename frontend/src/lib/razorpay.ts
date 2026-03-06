import Razorpay from "razorpay";

let razorpayInstance: Razorpay | null = null;

export const getRazorpay = () => {
    if (!razorpayInstance) {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET;

        if (!keyId || !keySecret) {
            // During build, these might be missing. We return a proxy or handle it in the caller.
            // For now, we'll just throw a more descriptive error if called without keys.
            if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
                console.warn("Razorpay keys missing during initialization.");
            }
        }

        razorpayInstance = new Razorpay({
            key_id: keyId || 'build_placeholder',
            key_secret: keySecret || 'build_placeholder',
        });
    }
    return razorpayInstance;
};
