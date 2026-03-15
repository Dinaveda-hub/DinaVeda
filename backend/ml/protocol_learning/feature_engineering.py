"""
Feature Engineering for Veda Protocol Learning
Calculates the 'effect_score' by comparing physiological states before and after an intervention.
"""

def calculate_effect_score(before_state: dict, after_state: dict) -> int:
    """
    Calculates the effectiveness score of an intervention.
    
    Formula:
    effect_score = Δsleep_quality_score + Δagni_score + Δenergy_score - Δstress_score
    
    Positive Δ (increase) is good for Sleep, Agni, and Energy.
    Positive Δ (increase) is bad for Stress (hence the subtraction).
    """
    
    # Delta calculations (After - Before)
    d_sleep = after_state.get('sleep_quality_score', 0) - before_state.get('sleep_quality_score', 0)
    d_agni = after_state.get('agni_score', 0) - before_state.get('agni_score', 0)
    d_energy = after_state.get('energy_score', 0) - before_state.get('energy_score', 0)
    d_stress = after_state.get('stress_score', 0) - before_state.get('stress_score', 0)
    
    # Final effect score calculation
    # Improves: Sleep, Agni, Energy (High score is better)
    # Reduces: Stress (Low score is better, so increase in stress is negative)
    effect_score = d_sleep + d_agni + d_energy - d_stress
    
    return effect_score

if __name__ == "__main__":
    # Test Case from USER
    before = {
        'sleep_quality_score': 1,
        'agni_score': 0,
        'stress_score': 3,
        'energy_score': 0 # Assuming 0 for the example
    }
    
    after = {
        'sleep_quality_score': 3,
        'agni_score': 2,
        'stress_score': 1,
        'energy_score': 1 # Assuming +1 for the example
    }
    
    # Note: User example result was +6
    # (3-1) + (2-0) + (after_energy - 0) - (1-3)
    # 2 + 2 + d_energy - (-2)
    # 2 + 2 + d_energy + 2 = 6 + d_energy
    
    score = calculate_effect_score(before, after)
    print(f"Before: {before}")
    print(f"After:  {after}")
    print(f"Calculated Effect Score: {score}")
