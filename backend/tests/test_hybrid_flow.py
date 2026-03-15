import sys
from pathlib import Path

# Add backend to path
backend_dir = Path(__file__).parent.parent
sys.path.append(str(backend_dir))

# Mocking dependencies for main.py if needed, or avoiding imports that trigger them
import sys
from unittest.mock import MagicMock

# Create mock modules to satisfy imports in wellness_engine or main
sys.modules['supabase'] = MagicMock()
sys.modules['google'] = MagicMock()
sys.modules['google.genai'] = MagicMock()
sys.modules['google.genai.types'] = MagicMock()

try:
    from wellness_engine import VedaEngine
except ImportError:
    # If it fails, try relative import if possible, but path append should work
    from backend.wellness_engine import VedaEngine
# We don't import from main to avoid triggering cascading imports of fastapi/supabase
# but we can simulate the request payload

def test_hybrid_flow():
    engine = VedaEngine()
    
    # Test signals
    test_signals = ["high_stress", "poor_sleep"]
    
    print(f"Testing with signals: {test_signals}")
    
    # 1. Get Physiology State
    state = engine.get_physiology_state(test_signals)
    print(f"Calculated State: {state}")
    
    # 2. Select Candidates
    candidates = engine.select_protocols(state)
    print(f"Deterministic Candidates: {candidates}")
    
    # 3. Simulate API call logic (ML Ranking)
    from ml.protocol_learning.predict_protocol_effect import rank_protocols
    
    ml_state = {
        'prakriti_vata': 0.7,
        'prakriti_pitta': 0.2,
        'prakriti_kapha': 0.1,
        'stress_score': 3, # High stress
        'agni_score': 1,
        'sleep_quality_score': 1,
        'wake_time_score': 1,
        'ama_score': 1,
        'mala_score': 1,
        'energy_score': 1,
        'mood_score': 1,
        'meal_timing_score': 1,
        'digestion_score': 1,
        'physical_activity_score': 1,
        'hydration_score': 1,
        'screen_score': 1,
        'wind_down_score': 1,
        'evening_mood_score': 1
    }
    
    if not candidates:
        print("No candidates found by deterministic engine. Testing with fallback list.")
        candidates = ["abhyanga", "pranayama", "warm_bath"]
        
    ranked = rank_protocols(ml_state, candidates)
    
    print("\n--- ML Ranked Protocols ---")
    for proto, score in ranked:
        print(f"{proto:20} | Score: {score:.4f}")

if __name__ == "__main__":
    test_hybrid_flow()
