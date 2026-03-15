-- Add seasonal context feature for ML prediction
-- Ayurveda principle: Ritucharya (seasonal regimen)

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pulse_logs' AND column_name='season') THEN
        ALTER TABLE public.pulse_logs ADD COLUMN season TEXT;
    END IF;
END $$;

COMMENT ON COLUMN public.pulse_logs.season IS 'Ayurvedic season based on the date of entry (e.g., Grishma, Varsha, Sharad).';
