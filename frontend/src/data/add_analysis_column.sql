-- Run this in your Supabase SQL Editor to enable history depth
ALTER TABLE public.pulse_logs 
ADD COLUMN IF NOT EXISTS detailed_analysis TEXT;
