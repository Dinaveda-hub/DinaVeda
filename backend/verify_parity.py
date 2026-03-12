# type: ignore (wellness_engine might not be fully configured in the local python root workspace config, or DEFAULT_STATE might have been migrated to frontend)
from wellness_engine import VedaEngine, DEFAULT_STATE

def test_backend_parity():
    engine = VedaEngine()
    
    # 1. Test Conflict Resolution
    # poor_sleep (severity 'minor' usually) vs deep_sleep (severity 'major')
    # Actual check: let's see what's in signals.json
    print("--- 1. Testing Conflict Resolution ---")
    signals = ["poor_sleep", "deep_sleep"]
    state = engine.get_physiology_state(signals=signals)
    # Check if sleep_quality increased (deep_sleep only) or fluctuated (both)
    # poor_sleep: sleep_quality -5, deep_sleep: sleep_quality +12
    # With conflict, only deep_sleep should apply.
    print(f"Signals: {signals}")
    print(f"Resulting sleep: {state['sleep']}")
    print(f"Resulting ojas: {state['ojas']}")

    # 2. Testing TOD Displacement
    print("\n--- 2. Testing TOD Displacement ---")
    # abhyanga: Recommended 'morning' (7:00). 
    # If performed at 12:00 (5h delta).
    signals = ["abhyanga"]
    state_exact = engine.get_physiology_state(signals=signals, performed_at="07:00")
    state_late = engine.get_physiology_state(signals=signals, performed_at="12:00")
    
    print(f"Abhyanga (07:00) Vata: {state_exact['vata']}")
    print(f"Abhyanga (12:00) Vata: {state_late['vata']}")
    print(f"Abhyanga (12:00) Circadian: {state_late['circadian']}")

    # 3. Testing Scoring
    print("\n--- 3. Testing Scoring ---")
    # Using 20 as drift_index for testing health_score and ipi
    health_score = engine.compute_health_score(state_exact, drift_index=20)
    ipi = engine.compute_ipi(state_exact, drift_index=20)
    print(f"Health Score: {health_score}")
    print(f"IPI: {ipi}")

    # 4. Multi-Layer Batch Test (Recommended by User)
    print("\n--- 4. Multi-Layer Batch Test ---")
    signals = ["poor_sleep", "late_dinner", "morning_exercise"]
    # Testing at 08:30 (Morning Exercise is 06:30, Poor Sleep is anytime, Late Dinner is usually nighttime)
    # late_dinner (minor), poor_sleep (major)
    state_batch = engine.get_physiology_state(signals=signals, performed_at="08:30")
    
    print(f"Signals: {signals}")
    print(f"Vata: {state_batch['vata']}")
    print(f"Agni: {state_batch['agni']}")
    print(f"Ojas: {state_batch['ojas']}")
    print(f"Circadian: {state_batch['circadian']}")
    
    # 5. Protocol Selection Test
    print("\n--- 5. Protocol Selection Test ---")
    # Low Agni (30) + Bloating (50) should trigger ginger_before_meal, warm_water, digestive_walk, etc.
    state_digestive = {**DEFAULT_STATE, "agni": 30, "bloating": 50}
    protocols = engine.select_protocols(state_digestive)
    print(f"State: Agni 30, Bloating 50")
    print(f"Triggered Protocols: {protocols}")

if __name__ == "__main__":
    test_backend_parity()
