-- Standardize pulse_logs for the 15-question DailyCheckin flow
-- Ensures all actual signals used in the app have dedicated standardized columns

DO $$ 
BEGIN
    -- Rename 'sleep' if it exists (legacy)
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='sleep') THEN
        ALTER TABLE public.pulse_logs RENAME COLUMN "sleep" TO "sleep_quality";
    END IF;

    -- Standardize Core Columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='sleep_quality') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN sleep_quality TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='energy_level') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN energy_level TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='stress_level') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN stress_level TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='screen_time') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN screen_time TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='wake_time') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN wake_time TEXT;
    END IF;

END $$;

COMMENT ON COLUMN public.pulse_logs.sleep_quality IS 'User response to sleep depth/quality question';
COMMENT ON COLUMN public.pulse_logs.energy_level IS 'User response to energy level question';
COMMENT ON COLUMN public.pulse_logs.stress_level IS 'User response to stress/mental state question';
COMMENT ON COLUMN public.pulse_logs.screen_time IS 'User response to screen exposure question';
COMMENT ON COLUMN public.pulse_logs.wake_time IS 'User response to wake timing question';
