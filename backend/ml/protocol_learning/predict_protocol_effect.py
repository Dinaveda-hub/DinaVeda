import joblib
import pandas as pd
from pathlib import Path
import sys

# Add parent directory to path to import features
sys.path.append(str(Path(__file__).parent.parent.parent))
from ml.protocol_learning.features import PRAKRITI_FEATURES, STATE_FEATURES, INTERVENTION_FEATURE, PROTOCOL_FOLLOWED_FEATURE

# Global variable for model caching
_MODEL = None

def load_model():
    """Loads and caches the trained CatBoost protocol effect model."""
    global _MODEL
    if _MODEL is not None:
        return _MODEL
        
    model_path = Path(__file__).parent / "protocol_model.pkl"
    if not model_path.exists():
        print(f"Warning: Model file not found at {model_path}")
        return None
    
    try:
        _MODEL = joblib.load(model_path)
        return _MODEL
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

def rank_protocols(state_features: dict, candidate_protocols: list):
    """
    Ranks a list of candidate protocols for a given user state.
    
    Args:
        state_features (dict): Dictionary containing Scores and Prakriti (e.g. 'stress_score', 'prakriti_vata').
        candidate_protocols (list): List of protocol names to evaluate.
        
    Returns:
        list: Tuples of (protocol_name, predicted_effect_score) sorted descending by effectiveness.
    """
    model = load_model()
    if not model:
        # Fallback: return protocols with 0 score if model is missing
        return [(p, 0.0) for p in candidate_protocols]

    prediction_data = []
    for protocol in candidate_protocols:
        row = state_features.copy()
        row[INTERVENTION_FEATURE] = protocol
        row[PROTOCOL_FOLLOWED_FEATURE] = True # Rank by potential if followed
        prediction_data.append(row)
    
    # Convert to DataFrame for batch prediction
    df_pred = pd.DataFrame(prediction_data)
    
    # Batch predict effect scores for all candidates
    predictions = model.predict(df_pred)
    
    # Combine and sort by score (descending)
    results = list(zip(candidate_protocols, predictions))
    results.sort(key=lambda x: x[1], reverse=True)
    
    return results

if __name__ == "__main__":
    # Example usage for testing
    dummy_state = {
        'prakriti_vata': 0.7,
        'prakriti_pitta': 0.2,
        'prakriti_kapha': 0.1,
        'sleep_quality_score': 1,
        'wake_time_score': 1,
        'ama_score': 1,
        'mala_score': 1,
        'agni_score': 1,
        'energy_score': 1,
        'mood_score': 1,
        'meal_timing_score': 1,
        'digestion_score': 1,
        'physical_activity_score': 1,
        'hydration_score': 1,
        'screen_score': 1,
        'stress_score': 3,
        'wind_down_score': 1,
        'evening_mood_score': 1
    }
    
    protocols = ['Abhyanga', 'Pranayama', 'Warm Water', 'Early Sleep']
    
    print("Ranking protocols for high-stress Vata state...")
    ranked = rank_protocols(dummy_state, protocols)
    for protocol, score in ranked:
        print(f"Protocol: {protocol:15} | Predicted Effect Score: {score:.2f}")
