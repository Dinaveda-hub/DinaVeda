import joblib
import pandas as pd
from pathlib import Path
import sys

# Add parent directory to path to import features
sys.path.append(str(Path(__file__).parent.parent.parent))
from ml.risk_prediction.feature_engineering import compute_risk_features
from ml.risk_prediction.risk_alerts import generate_risk_alerts

# Global cache for the models
_RISK_MODELS = None

def load_risk_models():
    """Loads and caches the multi-target risk prediction models."""
    global _RISK_MODELS
    if _RISK_MODELS is not None:
        return _RISK_MODELS
        
    model_path = Path(__file__).parent / "risk_model.pkl"
    if not model_path.exists():
        print(f"Warning: Risk model file not found at {model_path}")
        return None
    
    try:
        _RISK_MODELS = joblib.load(model_path)
        return _RISK_MODELS
    except Exception as e:
        print(f"Error loading risk models: {e}")
        return None

def predict_risk(last_7_days_logs: list):
    """
    Predicts health risks based on the last 7 days of logs.
    
    Args:
        last_7_days_logs (list): List of pulse_log dictionaries.
        
    Returns:
        dict: Probabilities for vata_spike, agni_collapse, and sleep_disruption.
    """
    models = load_risk_models()
    if not models:
        return {
            "vata_spike": 0.0,
            "agni_collapse": 0.0,
            "sleep_disruption": 0.0
        }

    # 1. Convert logs to DataFrame and compute features
    df = pd.DataFrame(last_7_days_logs)
    
    # We need to sort by date to ensure rolling calculations work if logs are out of order
    df['created_at'] = pd.to_datetime(df['created_at'])
    df = df.sort_values('created_at')
    
    # 2. Extract features using the standardized engineering module
    df_features = compute_risk_features(df)
    
    # We only care about the prediction for the LATEST day (reflection of current state based on history)
    latest_record = df_features.iloc[-1:]
    
    # 3. Categorical normalization (CatBoost expects strings)
    cat_features = ['weekday', 'season']
    for col in cat_features:
        if col in latest_record.columns:
            latest_record[col] = latest_record[col].astype(str)
    
    # 4. Predict probabilities for each target
    probs = {}
    for label, model in models.items():
        # model.predict_proba returns [[prob_0, prob_1]]
        # We want the probability of the event occurring (class 1)
        prob = model.predict_proba(latest_record)[0][1]
        probs[label] = round(float(prob), 3)
        
    # 5. Generate alerts based on thresholds
    alerts = generate_risk_alerts(probs)
        
    return {
        "probabilities": probs,
        "alerts": alerts
    }

if __name__ == "__main__":
    # Example usage for testing
    dummy_logs = [
        {"user_id": "u1", "created_at": "2024-03-01", "sleep_quality_score": 3, "stress_score": 1, "agni_score": 3, "hydration_score": 3},
        {"user_id": "u1", "created_at": "2024-03-02", "sleep_quality_score": 2, "stress_score": 1, "agni_score": 2, "hydration_score": 2},
        {"user_id": "u1", "created_at": "2024-03-03", "sleep_quality_score": 2, "stress_score": 2, "agni_score": 2, "hydration_score": 2},
        {"user_id": "u1", "created_at": "2024-03-04", "sleep_quality_score": 1, "stress_score": 2, "agni_score": 2, "hydration_score": 2},
        {"user_id": "u1", "created_at": "2024-03-05", "sleep_quality_score": 1, "stress_score": 3, "agni_score": 1, "hydration_score": 1},
        {"user_id": "u1", "created_at": "2024-03-06", "sleep_quality_score": 1, "stress_score": 3, "agni_score": 1, "hydration_score": 1},
        {"user_id": "u1", "created_at": "2024-03-07", "sleep_quality_score": 0, "stress_score": 3, "agni_score": 0, "hydration_score": 1},
    ]
    
    print("Testing Risk Prediction Service with deteriorating user stats...")
    risks = predict_risk(dummy_logs)
    print(f"Predicted Risks: {risks}")
