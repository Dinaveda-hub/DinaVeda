-- Final Consolidation of pulse_logs schema
-- This aligns the DB strictly with the 15-question DailyCheckin flow

-- 1. Drop truly legacy/unused columns
ALTER TABLE public.pulse_logs 
DROP COLUMN IF EXISTS mutra,
DROP COLUMN IF EXISTS lunch_time,
DROP COLUMN IF EXISTS dinner_time,
DROP COLUMN IF EXISTS lunch_before_2,
DROP COLUMN IF EXISTS dinner_before_8,
DROP COLUMN IF EXISTS light_dinner,
DROP COLUMN IF EXISTS no_fried_food,
DROP COLUMN IF EXISTS no_late_snack,
DROP COLUMN IF EXISTS wake_before_630,
DROP COLUMN IF EXISTS food_quality;

-- 2. Ensure all 15 question signals have dedicated columns
-- Morning: sleep_quality, sleep_hours, wake_time, ama (tongue_coating), mala (bowel_movement), agni (appetite), energy_level, mood (mental_state)
-- Evening: meal_timing, digestion_quality, physical_activity, hydration, screen_time (screen_exposure), stress_level (stress), wind_down_routine (evening_wind_down), evening_mood

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='sleep_hours') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN sleep_hours FLOAT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='meal_timing') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN meal_timing TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='digestion_quality') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN digestion_quality TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='physical_activity') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN physical_activity TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='wind_down_routine') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN wind_down_routine TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='evening_mood') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN evening_mood TEXT;
    END IF;

    -- Numeric Score Columns for ML
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='sleep_quality_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN sleep_quality_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='wake_time_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN wake_time_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='ama_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN ama_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='mala_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN mala_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='agni_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN agni_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='energy_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN energy_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='mood_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN mood_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='meal_timing_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN meal_timing_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='digestion_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN digestion_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='physical_activity_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN physical_activity_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='hydration_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN hydration_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='screen_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN screen_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='stress_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN stress_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='wind_down_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN wind_down_score INT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='evening_mood_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN evening_mood_score INT;
    END IF;

    -- Protocol Feedback Columns for ML
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='recommended_protocol') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN recommended_protocol TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='protocol_followed') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN protocol_followed BOOLEAN DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='effect_score') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN effect_score INT;
    END IF;

    -- Prakriti Baseline Columns for ML
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='prakriti_vata') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN prakriti_vata FLOAT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='prakriti_pitta') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN prakriti_pitta FLOAT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='prakriti_kapha') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN prakriti_kapha FLOAT;
    END IF;
END $$;

COMMENT ON TABLE public.pulse_logs IS 'Ayurvedic health logs strictly mapped to the 15-question DailyCheckin flow.';
