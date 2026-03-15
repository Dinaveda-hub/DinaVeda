-- Convert pulse_logs routine tracking to binary boolean features
-- This optimizes the dataset for ML by avoiding array parsing

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='warm_water') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN warm_water BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='tongue_scraping') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN tongue_scraping BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='nasya') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN nasya BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='oil_pulling') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN oil_pulling BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='abhyanga') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN abhyanga BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='meditation') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN meditation BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='pranayama') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN pranayama BOOLEAN DEFAULT FALSE;
    END IF;

END $$;

COMMENT ON COLUMN public.pulse_logs.warm_water IS 'Routine: Drinking warm water in the morning';
COMMENT ON COLUMN public.pulse_logs.tongue_scraping IS 'Routine: Daily tongue scraping';
COMMENT ON COLUMN public.pulse_logs.nasya IS 'Routine: Nasal oil administration';
COMMENT ON COLUMN public.pulse_logs.oil_pulling IS 'Routine: Oil pulling/swishing';
COMMENT ON COLUMN public.pulse_logs.abhyanga IS 'Routine: Ayurvedic oil massage';
COMMENT ON COLUMN public.pulse_logs.meditation IS 'Routine: Daily meditation session';
COMMENT ON COLUMN public.pulse_logs.pranayama IS 'Routine: Breathwork/Pranayama';
