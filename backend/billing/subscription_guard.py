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

async def get_user_id(authorization: str = Header(None)):
    if not supabase:
        raise HTTPException(status_code=500, detail="Authentication service not configured")

    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing auth token")

    token = authorization.split(" ", 1)[1]
    
    try:
        user_response = supabase.auth.get_user(token)
        if not user_response or not user_response.user:
            raise HTTPException(status_code=401, detail="Invalid token")

        return user_response.user.id
    except Exception as e:
        print(f"Auth error: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")

async def require_premium(user_id: str = Depends(get_user_id)):
    """
    Dependency to ensure the user has an active premium subscription.
    """
    if not supabase:
        raise HTTPException(status_code=500, detail="Database unconfigured")
        
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
