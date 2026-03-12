"""
pattern_engine.py

Statistical Pattern Detection Engine for the Physiology Memory Layer.
Runs on the last 30 days of pulse_logs and detects recurring behavioral
correlations WITHOUT any AI — pure statistical rules.

7 Pattern Rules:
  1. sleep_agni_correlation     — sleep < 6h → agni drops next day
  2. late_dinner_kapha          — dinner after 8pm → kapha rises
  3. stress_agni_suppression    — anxious mood → agni drops
  4. exercise_ojas_boost        — movement ≠ none → ojas rises
  5. hydration_energy           — hydration ≥ 3 → energy improves
  6. early_wake_circadian       — wake before 6:30 → circadian improves
  7. screen_sleep_disruption    — heavy screen use → sleep drops
"""

import os
from datetime import datetime, timedelta, timezone
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()


def _get_supabase() -> Client:
    url = os.environ.get("SUPABASE_URL", "")
    key = os.environ.get("SUPABASE_KEY", "")
    return create_client(url, key)


# ───────────────────────────────────────────────────────────────
# Pattern Rule Definitions
# ───────────────────────────────────────────────────────────────

class PatternRule:
    """Base class for a statistical pattern rule."""

    def __init__(self, pattern_type: str, description: str):
        self.pattern_type = pattern_type
        self.description = description

    def evaluate(self, logs: list[dict]) -> tuple[float, int]:
        """
        Returns (confidence, occurrences).
        confidence: 0.0–1.0 ratio of matching events.
        occurrences: absolute count of matching events.
        """
        raise NotImplementedError


class SleepAgniCorrelation(PatternRule):
    """sleep_hours < 6 on day N → agni is 'low' or 'variable' on day N+1."""

    def __init__(self):
        super().__init__(
            "sleep_agni_correlation",
            "Agni weakens when sleep drops below 6 hours"
        )

    def evaluate(self, logs: list[dict]) -> tuple[float, int]:
        logs_by_date = _group_by_date(logs)
        dates = sorted(logs_by_date.keys())
        hits, eligible = 0, 0

        for i in range(len(dates) - 1):
            day_logs = logs_by_date[dates[i]]
            next_day_logs = logs_by_date[dates[i + 1]]

            short_sleep = any(
                (l.get("sleep_hours") or 7) < 6 for l in day_logs
            )
            if short_sleep:
                eligible += 1
                agni_weak = any(
                    l.get("agni") in ("low", "variable") for l in next_day_logs
                )
                if agni_weak:
                    hits += 1

        confidence = hits / eligible if eligible > 0 else 0
        return (confidence, hits)


class LateDinnerKapha(PatternRule):
    """dinner_time is NOT 'before_8' → next-day mood sluggish or agni low (Kapha proxy)."""

    def __init__(self):
        super().__init__(
            "late_dinner_kapha",
            "Kapha increases after late dinners (after 8 PM)"
        )

    def evaluate(self, logs: list[dict]) -> tuple[float, int]:
        logs_by_date = _group_by_date(logs)
        dates = sorted(logs_by_date.keys())
        hits, eligible = 0, 0

        for i in range(len(dates) - 1):
            day_logs = logs_by_date[dates[i]]
            next_day_logs = logs_by_date[dates[i + 1]]

            late_dinner = any(
                l.get("dinner_time") not in ("before_8", None) for l in day_logs
            )
            if late_dinner:
                eligible += 1
                kapha_sign = any(
                    l.get("mood") == "sluggish" or l.get("agni") == "low"
                    for l in next_day_logs
                )
                if kapha_sign:
                    hits += 1

        confidence = hits / eligible if eligible > 0 else 0
        return (confidence, hits)


class StressAgniSuppression(PatternRule):
    """mood = 'anxious' → agni is 'low' or 'variable' same day."""

    def __init__(self):
        super().__init__(
            "stress_agni_suppression",
            "Digestive fire weakens during anxious or stressed periods"
        )

    def evaluate(self, logs: list[dict]) -> tuple[float, int]:
        hits, eligible = 0, 0
        for log in logs:
            if log.get("mood") == "anxious":
                eligible += 1
                if log.get("agni") in ("low", "variable"):
                    hits += 1

        confidence = hits / eligible if eligible > 0 else 0
        return (confidence, hits)


class ExerciseOjasBoost(PatternRule):
    """movement ≠ 'none' → ojas_score tends to be higher."""

    def __init__(self):
        super().__init__(
            "exercise_ojas_boost",
            "Regular exercise correlates with higher Ojas vitality"
        )

    def evaluate(self, logs: list[dict]) -> tuple[float, int]:
        active_ojas = []
        inactive_ojas = []

        for log in logs:
            ojas = log.get("ojas_score")
            if ojas is None:
                continue
            if log.get("movement") and log.get("movement") != "none":
                active_ojas.append(ojas)
            else:
                inactive_ojas.append(ojas)

        if not active_ojas or not inactive_ojas:
            return (0, 0)

        avg_active = sum(active_ojas) / len(active_ojas)
        avg_inactive = sum(inactive_ojas) / len(inactive_ojas)

        if avg_active > avg_inactive:
            # Confidence based on magnitude of difference
            diff = min((avg_active - avg_inactive) / 20, 1.0)
            return (diff, len(active_ojas))
        return (0, 0)


class HydrationEnergy(PatternRule):
    """hydration >= 3 → mood tends to be 'calm' or 'clear' (energy proxy)."""

    def __init__(self):
        super().__init__(
            "hydration_energy",
            "Good hydration correlates with improved energy and mood"
        )

    def evaluate(self, logs: list[dict]) -> tuple[float, int]:
        hits, eligible = 0, 0
        for log in logs:
            hydration = log.get("hydration", 0)
            if hydration and hydration >= 3:
                eligible += 1
                if log.get("mood") in ("calm", "clear"):
                    hits += 1

        confidence = hits / eligible if eligible > 0 else 0
        return (confidence, hits)


class EarlyWakeCircadian(PatternRule):
    """wake_time = 'before_630' → sleep quality tends to be higher."""

    def __init__(self):
        super().__init__(
            "early_wake_circadian",
            "Early waking aligns with better circadian rhythm and sleep quality"
        )

    def evaluate(self, logs: list[dict]) -> tuple[float, int]:
        early_sleep = []
        late_sleep = []

        for log in logs:
            sq = log.get("sleep")
            if sq is None:
                continue
            if log.get("wake_time") == "before_630":
                early_sleep.append(sq)
            else:
                late_sleep.append(sq)

        if not early_sleep or not late_sleep:
            return (0, 0)

        avg_early = sum(early_sleep) / len(early_sleep)
        avg_late = sum(late_sleep) / len(late_sleep)

        if avg_early > avg_late:
            diff = min((avg_early - avg_late) / 2, 1.0)  # sleep quality is 1-5
            return (diff, len(early_sleep))
        return (0, 0)


class ScreenSleepDisruption(PatternRule):
    """food_quality heavy/fried or late dinner → sleep_hours tend to drop."""

    def __init__(self):
        super().__init__(
            "screen_sleep_disruption",
            "Heavy evening meals or late eating disrupts sleep duration"
        )

    def evaluate(self, logs: list[dict]) -> tuple[float, int]:
        heavy_sleep = []
        light_sleep = []

        for log in logs:
            sh = log.get("sleep_hours")
            if sh is None:
                continue
            fq = log.get("food_quality", "light")
            dt = log.get("dinner_time", "before_8")

            if fq in ("heavy", "fried") or dt != "before_8":
                heavy_sleep.append(sh)
            else:
                light_sleep.append(sh)

        if not heavy_sleep or not light_sleep:
            return (0, 0)

        avg_heavy = sum(heavy_sleep) / len(heavy_sleep)
        avg_light = sum(light_sleep) / len(light_sleep)

        if avg_light > avg_heavy:
            diff = min((avg_light - avg_heavy) / 2, 1.0)
            return (diff, len(heavy_sleep))
        return (0, 0)


# ───────────────────────────────────────────────────────────────
# Helpers
# ───────────────────────────────────────────────────────────────

def _group_by_date(logs: list[dict]) -> dict[str, list[dict]]:
    """Groups logs by ISO date string (YYYY-MM-DD)."""
    by_date: dict[str, list[dict]] = {}
    for log in logs:
        created = log.get("created_at", "")
        if isinstance(created, str) and len(created) >= 10:
            date_key = created[:10]
        else:
            continue
        by_date.setdefault(date_key, []).append(log)
    return by_date


# All rules instantiated
ALL_RULES: list[PatternRule] = [
    SleepAgniCorrelation(),
    LateDinnerKapha(),
    StressAgniSuppression(),
    ExerciseOjasBoost(),
    HydrationEnergy(),
    EarlyWakeCircadian(),
    ScreenSleepDisruption(),
]

MIN_CONFIDENCE = 0.3  # Only persist patterns above 30% confidence
MIN_OCCURRENCES = 2   # Need at least 2 matching events


# ───────────────────────────────────────────────────────────────
# Main Analysis Function
# ───────────────────────────────────────────────────────────────

def analyze_patterns(user_id: str) -> list[dict]:
    """
    Fetches last 30 days of pulse_logs for a user,
    runs all pattern rules, and upserts results into physiology_patterns.
    Returns the list of detected patterns.
    """
    supabase = _get_supabase()

    # 1. Fetch logs from last 30 days
    cutoff = (datetime.now(timezone.utc) - timedelta(days=30)).isoformat()
    result = supabase.table("pulse_logs") \
        .select("*") \
        .eq("user_id", user_id) \
        .gte("created_at", cutoff) \
        .order("created_at", desc=False) \
        .execute()

    logs = result.data or []

    if len(logs) < 3:
        return []  # Not enough data for meaningful patterns

    # 2. Run all rules
    detected: list[dict] = []
    now_iso = datetime.now(timezone.utc).isoformat()

    for rule in ALL_RULES:
        confidence, occurrences = rule.evaluate(logs)

        if confidence >= MIN_CONFIDENCE and occurrences >= MIN_OCCURRENCES:
            pattern = {
                "user_id": user_id,
                "pattern_type": rule.pattern_type,
                "description": rule.description,
                "confidence": round(confidence, 3),
                "occurrences": occurrences,
                "last_seen": now_iso,
            }
            detected.append(pattern)

    # 3. Upsert into Supabase (ON CONFLICT update)
    if detected:
        supabase.table("physiology_patterns").upsert(
            detected,
            on_conflict="user_id,pattern_type"
        ).execute()

    return detected


def get_user_patterns(user_id: str) -> list[dict]:
    """Fetches all stored patterns for a user."""
    supabase = _get_supabase()
    result = supabase.table("physiology_patterns") \
        .select("*") \
        .eq("user_id", user_id) \
        .order("confidence", desc=True) \
        .execute()
    return result.data or []
