-- DROP EVERYTHING ELSE and run ONLY this in your Supabase SQL Editor
-- This skips table creation and only adds columns to the existing profiles table

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS subscription_end TIMESTAMP WITH TIME ZONE;

-- Add check constraint for plan types (safe to run multiple times)
ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS check_plan_type;

ALTER TABLE profiles 
ADD CONSTRAINT check_plan_type 
CHECK (plan IN ('free', 'premium'));

-- Create an index on subscription_id (safe to run multiple times)
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_id ON profiles(subscription_id);
