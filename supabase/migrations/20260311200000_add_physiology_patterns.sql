-- Physiology Memory Layer: Pattern Detection Storage
-- Stores detected behavioral patterns per user from pulse_logs analysis.

CREATE TABLE IF NOT EXISTS physiology_patterns (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    pattern_type TEXT NOT NULL,
    description  TEXT NOT NULL,
    confidence   REAL NOT NULL DEFAULT 0,
    occurrences  INT NOT NULL DEFAULT 1,
    last_seen    TIMESTAMPTZ DEFAULT now(),
    created_at   TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, pattern_type)
);

CREATE INDEX IF NOT EXISTS idx_patterns_user ON physiology_patterns(user_id);

-- RLS Policies
ALTER TABLE physiology_patterns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own patterns"
    ON physiology_patterns FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage patterns"
    ON physiology_patterns FOR ALL
    USING (true)
    WITH CHECK (true);
