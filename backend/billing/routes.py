from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel
import os
import hmac
import hashlib
import json

from billing.razorpay_client import razorpay_client
from supabase import create_client, Client

# Initialize Supabase client
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

if supabase_url and supabase_key:
    supabase: Client = create_client(supabase_url, supabase_key)
else:
    supabase = None

router = APIRouter()

class CreateSubscriptionRequest(BaseModel):
    plan: str
    user_id: str

@router.post("/create-subscription")
async def create_subscription(payload: CreateSubscriptionRequest):
    if not razorpay_client:
        raise HTTPException(status_code=500, detail="Billing is not configured.")
        
    plan_id = (
        os.getenv("RAZORPAY_PLAN_ID_YEARLY")
        if payload.plan == "yearly"
        else os.getenv("RAZORPAY_PLAN_ID_MONTHLY")
    )
    
    if not plan_id:
        raise HTTPException(status_code=500, detail="Plan ID is not configured.")

    try:
        # Create subscription
        subscription = razorpay_client.subscription.create({
            "plan_id": plan_id,
            "total_count": 1 if payload.plan == "yearly" else 12,
            "customer_notify": 1,
            "notes": {
                "user_id": payload.user_id
            }
        })

        return {
            "subscriptionId": subscription["id"],
            "key": os.getenv("RAZORPAY_KEY_ID")
        }
    except Exception as e:
        print(f"Subscription creation error: {e}")
        raise HTTPException(status_code=500, detail="Subscription creation failed")

@router.post("/webhook")
async def razorpay_webhook(request: Request):
    """
    Razorpay Webhook to handle subscription.activated and subscription.cancelled 
    """
    webhook_secret = os.getenv("RAZORPAY_WEBHOOK_SECRET")
    if not webhook_secret:
        raise HTTPException(status_code=500, detail="Webhook secret not configured")

    signature = request.headers.get("x-razorpay-signature")
    if not signature:
        raise HTTPException(status_code=400, detail="Missing signature")

    # Get raw body for verification
    body = await request.body()
    
    # Verify signature
    expected_signature = hmac.new(
        bytes(webhook_secret, "utf-8"),
        msg=body,
        digestmod=hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(expected_signature, signature):
        raise HTTPException(status_code=400, detail="Invalid signature")

    
    try:
        event = json.loads(body.decode("utf-8"))
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid payload")

    if not supabase:
        print("Warning: Supabase client not initialized, skipping db update.")
        return {"status": "ok"}
        
    event_type = event.get("event")
    
    if event_type == "subscription.activated" or event_type == "subscription.charged":
        # Extract details
        subscription_entity = event["payload"]["subscription"]["entity"]
        sub_id = subscription_entity["id"]
        
        # Extract user_id from notes if available, or we might need another way to link
        # Actually notes are available in the entity
        user_id = subscription_entity.get("notes", {}).get("user_id")
        
        # If user_id is in notes, we can update the profiles table
        if user_id:
            try:
                # Update profile
                res = supabase.table("profiles").update({
                    "subscription_status": "active",
                    "subscription_id": sub_id,
                    "plan_type": "yearly" if subscription_entity.get("plan_id") == os.getenv("RAZORPAY_PLAN_ID_YEARLY") else "monthly"
                }).eq("id", user_id).execute()
                print(f"Updated subscription for {user_id} to active")
            except Exception as e:
                print(f"Error updating profile for {user_id}: {e}")
                
    elif event_type in ["subscription.cancelled", "subscription.halted"]:
        subscription_entity = event["payload"]["subscription"]["entity"]
        sub_id = subscription_entity["id"]
        
        try:
             # Find user by subscription_id and deactivate
             res = supabase.table("profiles").update({
                 "subscription_status": "cancelled"
             }).eq("subscription_id", sub_id).execute()
             print(f"Cancelled subscription {sub_id}")
        except Exception as e:
             print(f"Error cancelling subscription {sub_id}: {e}")

    return {"status": "ok"}


@router.get("/subscription-status")
async def get_subscription_status(user_id: str):
    if not supabase:
        raise HTTPException(status_code=500, detail="Database unconfigured")
        
    try:
        res = supabase.table("profiles").select("subscription_status, plan_type").eq("id", user_id).execute()
        
        if len(res.data) > 0:
            profile = res.data[0]
            return {
                "status": profile.get("subscription_status", "inactive"),
                "plan": profile.get("plan_type", None)
            }
        return {"status": "inactive", "plan": None}
    except Exception as e:
        print(f"Error fetching status: {e}")
        return {"status": "inactive", "plan": None}
