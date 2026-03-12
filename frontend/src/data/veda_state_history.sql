-- State History Table for Physiological Trends
-- Enables cross-device persistence for Prediction Engine

CREATE TABLE IF NOT EXISTS public.veda_state_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    snapshot_date DATE NOT NULL,
    state_json JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),

    -- Ensure only one snapshot per user per day is persisted
    UNIQUE(user_id, snapshot_date)
);

-- Enable RLS
ALTER TABLE public.veda_state_history ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own history
CREATE POLICY "Users can view own state history" 
ON public.veda_state_history FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Users can only insert/upsert their own history
CREATE POLICY "Users can manage own state history" 
ON public.veda_state_history FOR ALL 
USING (auth.uid() = user_id);

-- Index for performance on range queries (the last 7 days)
CREATE INDEX IF NOT EXISTS idx_veda_history_user_date ON public.veda_state_history(user_id, snapshot_date DESC);
