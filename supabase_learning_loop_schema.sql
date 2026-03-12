-- ==============================================================================
-- Dinaveda Pharmacokinetic Learning Loop Schema
-- ==============================================================================
-- This schema establishes the continuous personalization loop, allowing protocols
-- to physically adapt their vectors to an individual user's biology over time.

-- 1. Protocol Feedback Table
-- Captures raw subjective feedback from the user after completing a protocol.
CREATE TABLE IF NOT EXISTS public.protocol_feedback (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    protocol_name TEXT NOT NULL,
    state_baseline JSONB NOT NULL, -- The 26-variable vector AT the time of taking the protocol
    correlation_target TEXT NOT NULL, -- Which variable did we ask them about? (e.g. 'stress', 'digestion')
    perceived_shift INTEGER NOT NULL, -- -1 (Worse/Negative), 0 (No Change), 1 (Better/Positive)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for Feedback
ALTER TABLE public.protocol_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert their own feedback" ON public.protocol_feedback
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own feedback" ON public.protocol_feedback
    FOR SELECT USING (auth.uid() = user_id);


-- 2. User Protocol Weights Table
-- The operational table that the Vector Engine polls to amplify/dampen impacts.
CREATE TABLE IF NOT EXISTS public.user_protocol_weights (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    protocol_name TEXT NOT NULL,
    effect_multipliers JSONB NOT NULL DEFAULT '{}'::jsonb, -- e.g., {"sleep": 1.15, "vata": 0.85}
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, protocol_name)
);

-- RLS Policies for Weights
ALTER TABLE public.user_protocol_weights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own multipliers" ON public.user_protocol_weights
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own multipliers" ON public.user_protocol_weights
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own multipliers" ON public.user_protocol_weights
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Updated_at Trigger
CREATE OR REPLACE FUNCTION update_protocol_weights_modtime()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_user_protocol_weights_updated_at
BEFORE UPDATE ON public.user_protocol_weights
FOR EACH ROW
EXECUTE FUNCTION update_protocol_weights_modtime();

-- ==============================================================================
-- INSTRUCTIONS: Run this snippet in your Supabase SQL Editor.
-- ==============================================================================
