-- Clean up unused columns in pulse_logs
-- These columns are not part of the active 15-question DailyCheckin flow

ALTER TABLE public.pulse_logs 
DROP COLUMN IF EXISTS warm_water,
DROP COLUMN IF EXISTS tongue_scraping,
DROP COLUMN IF EXISTS nasya,
DROP COLUMN IF EXISTS oil_pulling,
DROP COLUMN IF EXISTS abhyanga,
DROP COLUMN IF EXISTS meditation,
DROP COLUMN IF EXISTS pranayam;

-- Optional: Remove other unused legacy columns if they are not used elsewhere
-- ALTER TABLE public.pulse_logs DROP COLUMN IF EXISTS mutra;

COMMENT ON TABLE public.pulse_logs IS 'Longitudinal physiological logs standardized for ML training and pattern recognition.';
