from ai.reasoning_engine import _analyze_agni, _analyze_dosha, _analyze_modern_vectors, generate_reasoning_context

def test_analyze_agni():
    # Test low agni
    res1 = _analyze_agni({"agni": 30})
    assert res1["agni_state"] == "manda agni"
    assert res1["agni_score"] == 30
    assert "heavy meals" in res1["agni_signals"]

    # Test high agni
    res2 = _analyze_agni({"agni": 80})
    assert res2["agni_state"] == "tikshna agni"
    assert res2["agni_score"] == 80
    assert "spicy food" in res2["agni_signals"]

    # Test balanced agni
    res3 = _analyze_agni({"agni": 50})
    assert res3["agni_state"] == "balanced"
    assert res3["agni_score"] == 50
    assert not res3["agni_signals"]

def test_analyze_dosha():
    # Test vata aggravation
    res1 = _analyze_dosha({"vata": 80, "pitta": 50, "kapha": 50})
    assert res1["dominant_dosha"] == "Vata"
    assert res1["aggravated_dosha"] == "Vata"
    assert res1["dosha_severity"] == "moderate"
    assert "nervous system" in res1["dosha_affected_systems"]

    # Test pitta aggravation (high)
    res2 = _analyze_dosha({"vata": 50, "pitta": 90, "kapha": 50})
    assert res2["dominant_dosha"] == "Pitta"
    assert res2["aggravated_dosha"] == "Pitta"
    assert res2["dosha_severity"] == "high"
    assert "metabolism and skin" in res2["dosha_affected_systems"]

    # Test kapha aggravation
    res3 = _analyze_dosha({"vata": 50, "pitta": 50, "kapha": 75})
    assert res3["dominant_dosha"] == "Kapha"
    assert res3["aggravated_dosha"] == "Kapha"
    assert res3["dosha_severity"] == "moderate"
    assert "respiratory and lymphatic" in res3["dosha_affected_systems"]

    # Test balanced dosha
    res4 = _analyze_dosha({"vata": 50, "pitta": 50, "kapha": 50})
    assert res4["dominant_dosha"] == "Vata" # fallback
    assert res4["aggravated_dosha"] is None
    assert res4["dosha_severity"] == "low"

def test_analyze_modern_vectors():
    # Test high sleep debt
    res1 = _analyze_modern_vectors({"sleep_debt": 70, "stress_load": 50})
    assert res1["sleep_debt"] == 70
    assert res1["stress_load"] == 50
    assert "significant sleep deprivation" in res1["modern_risk_signals"]
    assert "nervous system" in res1["modern_affected_systems"]

    # Test high stress load
    res2 = _analyze_modern_vectors({"sleep_debt": 50, "stress_load": 70})
    assert res2["sleep_debt"] == 50
    assert res2["stress_load"] == 70
    assert "high cognitive or emotional stress" in res2["modern_risk_signals"]

    # Test low risks
    res3 = _analyze_modern_vectors({"sleep_debt": 50, "stress_load": 50})
    assert res3["sleep_debt"] == 50
    assert res3["stress_load"] == 50
    assert not res3["modern_risk_signals"]

def test_generate_reasoning_context_legacy_compatibility():
    # Tests that generate_reasoning_context still produces expected structure for external APIs
    # like main.py
    state = {"agni": 30, "vata": 80, "sleep_debt": 70}
    ctx = generate_reasoning_context(state)

    # Needs to at least contain these keys
    assert "primary_imbalance" in ctx
    assert "likely_causes" in ctx
    assert "affected_systems" in ctx
    assert "severity" in ctx
