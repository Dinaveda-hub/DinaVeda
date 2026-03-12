CREATE INDEX IF NOT EXISTS pulse_logs_user_time ON pulse_logs (user_id, created_at DESC);
