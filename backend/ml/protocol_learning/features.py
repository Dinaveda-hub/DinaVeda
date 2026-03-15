# Standardized Features for Protocol Learning ML

# 1. Baseline Features (Prakriti)
PRAKRITI_FEATURES = [
    'prakriti_vata',
    'prakriti_pitta',
    'prakriti_kapha'
]

# 2. State Features (Daily Check-in Scores)
# Standardized 0-3 integers for direct ML training
STATE_FEATURES = [
    'sleep_quality_score',
    'wake_time_score',
    'ama_score',
    'mala_score',
    'agni_score',
    'energy_score',
    'mood_score',
    'meal_timing_score',
    'digestion_score',
    'physical_activity_score',
    'hydration_score',
    'screen_score',
    'stress_score',
    'wind_down_score',
    'evening_mood_score'
]

# 3. Target Variable
TARGET_VARIABLE = 'effect_score'

# 4. Intervention Categorical
INTERVENTION_FEATURE = 'recommended_protocol'
PROTOCOL_FOLLOWED_FEATURE = 'protocol_followed'

# Combine for model input
FEATURE_COLS = PRAKRITI_FEATURES + STATE_FEATURES + [INTERVENTION_FEATURE, PROTOCOL_FOLLOWED_FEATURE]
