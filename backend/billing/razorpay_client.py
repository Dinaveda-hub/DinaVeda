import razorpay
import os

# Initialize Razorpay Client
razorpay_client = None

if os.getenv("RAZORPAY_KEY_ID") and os.getenv("RAZORPAY_KEY_SECRET"):
    razorpay_client = razorpay.Client(
        auth=(os.getenv("RAZORPAY_KEY_ID"), os.getenv("RAZORPAY_KEY_SECRET"))
    )
else:
    print("Warning: Razorpay credentials missing. Billing features will be disabled.")
