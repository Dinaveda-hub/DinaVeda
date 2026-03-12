-- This migration adds the required fields for the Razorpay premium architecture to the profiles table.
-- It avoids creating a separate subscriptions table and keeps the user state centralized as requested.

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS plan_type TEXT,
ADD COLUMN IF NOT EXISTS subscription_expiry TIMESTAMP WITH TIME ZONE;

-- Create an index on subscription_id to speed up webhook lookups
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_id ON public.profiles(subscription_id);
