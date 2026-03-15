-- Add time-based context features for ML prediction
-- weekday: 0 (Sunday) to 6 (Saturday)

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='weekday') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN weekday INTEGER;
    END IF;

    -- Add logged_at if we want a dedicated column, otherwise we use created_at
    -- We'll use created_at as the source for time, but weekday is better as a pre-computed feature for ML.
END $$;

COMMENT ON COLUMN public.pulse_logs.weekday IS 'Day of the week (0-6) for time-series pattern recognition.';
