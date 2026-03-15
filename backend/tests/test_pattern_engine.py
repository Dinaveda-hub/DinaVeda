from backend.analysis.pattern_engine import SleepAgniCorrelation

# pattern_engine expects logs with:
# created_at: str date (e.g., "YYYY-MM-DD")
# sleep_hours: float
# agni: categorical string ("low", "variable", etc.)

def test_sleep_agni_hit():
    """Test 1 — Basic Correlation Hit: Sleep < 6, next day agni is 'low' or 'variable'"""
    rule = SleepAgniCorrelation()

    logs = [
        {"created_at": "2026-01-01T08:00:00Z", "sleep_hours": 5, "agni": "normal"},
        {"created_at": "2026-01-02T08:00:00Z", "sleep_hours": 7, "agni": "low"},
    ]

    confidence, occurrences = rule.evaluate(logs)

    assert occurrences == 1
    assert confidence == 1.0


def test_sleep_agni_no_hit():
    """Test 2 — No Correlation: Sleep < 6, but next day agni is not weak"""
    rule = SleepAgniCorrelation()

    logs = [
        {"created_at": "2026-01-01T08:00:00Z", "sleep_hours": 5, "agni": "normal"},
        {"created_at": "2026-01-02T08:00:00Z", "sleep_hours": 7, "agni": "normal"},
    ]

    confidence, occurrences = rule.evaluate(logs)

    assert occurrences == 0
    assert confidence == 0.0


def test_sleep_agni_not_eligible():
    """Test 3 — Sleep Not Eligible: Sleep >= 6, so it's not considered eligible"""
    rule = SleepAgniCorrelation()

    logs = [
        {"created_at": "2026-01-01T08:00:00Z", "sleep_hours": 7, "agni": "normal"},
        {"created_at": "2026-01-02T08:00:00Z", "sleep_hours": 8, "agni": "low"},
    ]

    confidence, occurrences = rule.evaluate(logs)

    assert occurrences == 0
    assert confidence == 0.0


def test_sleep_agni_multiple_days():
    """Test 4 — Multiple Days: Mixed outcomes to verify confidence calculation"""
    rule = SleepAgniCorrelation()

    logs = [
        # Pair 1: Sleep=5 -> next day agni="low" (Hit)
        {"created_at": "2026-01-01T08:00:00Z", "sleep_hours": 5, "agni": "normal"},
        {"created_at": "2026-01-02T08:00:00Z", "sleep_hours": 7, "agni": "low"},

        # Pair 2: Sleep=4 -> next day agni="normal" (No Hit)
        {"created_at": "2026-01-03T08:00:00Z", "sleep_hours": 4, "agni": "normal"},
        {"created_at": "2026-01-04T08:00:00Z", "sleep_hours": 8, "agni": "normal"},

        # Pair 3: Sleep=5.5 -> next day agni="variable" (Hit)
        {"created_at": "2026-01-05T08:00:00Z", "sleep_hours": 5.5, "agni": "normal"},
        {"created_at": "2026-01-06T08:00:00Z", "sleep_hours": 7, "agni": "variable"},
    ]

    # Total eligible pairs: 3. Hits: 2.
    confidence, occurrences = rule.evaluate(logs)

    assert occurrences == 2
    assert confidence == 2 / 3


def test_sleep_agni_empty_logs():
    """Test 5 — Empty Logs: Empty list or single log entry"""
    rule = SleepAgniCorrelation()

    # Empty list
    confidence, occurrences = rule.evaluate([])
    assert occurrences == 0
    assert confidence == 0.0

    # Single entry
    logs = [{"created_at": "2026-01-01T08:00:00Z", "sleep_hours": 5, "agni": "low"}]
    confidence, occurrences = rule.evaluate(logs)
    assert occurrences == 0
    assert confidence == 0.0


def test_sleep_agni_edge_cases():
    """Extra test for edge cases like missing fields and non-consecutive dates"""
    rule = SleepAgniCorrelation()

    logs = [
        # Missing sleep_hours, defaults to 7 (not eligible)
        {"created_at": "2026-01-01T08:00:00Z", "agni": "normal"},
        {"created_at": "2026-01-02T08:00:00Z", "sleep_hours": 7, "agni": "low"},

        # Missing agni on the next day, shouldn't hit
        {"created_at": "2026-01-03T08:00:00Z", "sleep_hours": 5, "agni": "normal"},
        {"created_at": "2026-01-04T08:00:00Z", "sleep_hours": 7},

        # Non-consecutive dates still evaluated if they are adjacent in the list of grouped dates
        {"created_at": "2026-01-06T08:00:00Z", "sleep_hours": 4, "agni": "normal"},
        {"created_at": "2026-01-08T08:00:00Z", "sleep_hours": 8, "agni": "low"},
    ]

    # 2026-01-01 -> 2026-01-02: Sleep defaults to 7 (not short sleep). Eligible=0.
    # 2026-01-02 -> 2026-01-03: Sleep is 7 (not short). Eligible=0.
    # 2026-01-03 -> 2026-01-04: Sleep is 5. Next day agni is missing (so not low/variable). Eligible=1, Hits=0.
    # 2026-01-04 -> 2026-01-06: Sleep is 7. Eligible=0.
    # 2026-01-06 -> 2026-01-08: Sleep is 4. Next date in list is 2026-01-08, agni is low. Eligible=1, Hits=1.
    # Total eligible: 2. Total hits: 1.

    confidence, occurrences = rule.evaluate(logs)

    assert occurrences == 1
    assert confidence == 0.5
