-- Add Prakriti probability columns to pulse_logs for ML training
ALTER TABLE public.pulse_logs 
ADD COLUMN IF NOT EXISTS prakriti_vata NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS prakriti_pitta NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS prakriti_kapha NUMERIC DEFAULT 0;

COMMENT ON COLUMN public.pulse_logs.prakriti_vata IS 'ML-predicted Vata probability (0-1 scale)';
COMMENT ON COLUMN public.pulse_logs.prakriti_pitta IS 'ML-predicted Pitta probability (0-1 scale)';
COMMENT ON COLUMN public.pulse_logs.prakriti_kapha IS 'ML-predicted Kapha probability (0-1 scale)';
