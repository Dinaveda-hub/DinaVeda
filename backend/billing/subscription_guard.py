from fastapi import Depends, HTTPException, Header
import os
from supabase import create_client, Client

# Initialize Supabase client
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_KEY")

if supabase_url and supabase_key:
    supabase: Client = create_client(supabase_url, supabase_key)
else:
    supabase = None
    
# In a real app we might use an auth dependency to extract the user_id securely 
# from the header or token. For now, we'll expect x-user-id in the header.
async def get_user_id(x_user_id: str = Header(None)):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return x_user_id

async def require_premium(user_id: str = Depends(get_user_id)):
    """
    Dependency to ensure the user has an active premium subscription.
    """
    if not supabase:
        # Failsafe if db is not configured
        print("Warning: Skipping premium check, db not configured.")
        return user_id
        
    try:
        res = supabase.table("profiles").select("subscription_status").eq("id", user_id).execute()
        
        if len(res.data) == 0:
            raise HTTPException(status_code=403, detail="Premium required")
            
        status = res.data[0].get("subscription_status")
        
        if status != "active":
            raise HTTPException(status_code=403, detail="Premium required")
            
        return user_id
    except HTTPException:
        raise
    except Exception as e:
        print(f"Subscription check error: {e}")
        raise HTTPException(status_code=500, detail="Failed to verify subscription status")
