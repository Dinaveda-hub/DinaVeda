-- Standardize pulse_logs naming for ML stability
-- Rename 'sleep' to 'sleep_quality' and add missing standardized columns

DO $$ 
BEGIN
    -- Rename 'sleep' if it exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='sleep') THEN
        ALTER TABLE public.pulse_logs RENAME COLUMN "sleep" TO "sleep_quality";
    END IF;

    -- Add columns that might be missing or need standardized names
    -- (Some might already exist but we ensure they are available)
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='energy_level') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN energy_level TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='stress_level') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN stress_level TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='food_quality') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN food_quality TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='screen_time') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN screen_time TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='hydration') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN hydration INTEGER;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='mala') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN mala TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='mutra') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN mutra TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='custom_note') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN custom_note TEXT;
    END IF;

END $$;

COMMENT ON COLUMN public.pulse_logs.sleep_quality IS 'Daily sleep depth score (1-5)';
COMMENT ON COLUMN public.pulse_logs.screen_time IS 'Evening screen time intensity (minimal, moderate, excessive)';
