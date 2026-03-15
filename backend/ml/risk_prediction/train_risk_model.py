import pandas as pd
from catboost import CatBoostClassifier
import joblib
from pathlib import Path

def train_risk_model():
    # 1. Load Dataset
    data_path = Path(__file__).parent / "training_dataset_risk.csv"
    if not data_path.exists():
        print(f"Error: Dataset {data_path} not found. Run extract_risk_data.py first.")
        return

    df = pd.read_csv(data_path)
    
    # 2. Define Features and Targets
    features = [
        'rolling_sleep', 
        'rolling_stress', 
        'rolling_agni', 
        'hydration_avg', 
        'weekday', 
        'season'
    ]
    
    targets = {
        'vata_spike': 'vata_spike_event',
        'agni_collapse': 'agni_collapse_event',
        'sleep_disruption': 'sleep_disruption_event'
    }
    
    # 3. Detect Categorical Features
    cat_features = ['weekday', 'season']
    for col in cat_features:
        df[col] = df[col].astype(str)

    X = df[features]
    
    models = {}

    for label, target_col in targets.items():
        if target_col not in df.columns:
            print(f"Skipping {label}: Target {target_col} not found.")
            continue
            
        print(f"\n--- Training Risk Model for: {label} ---")
        y = df[target_col]

        model = CatBoostClassifier(
            iterations=500,
            learning_rate=0.1,
            depth=6,
            loss_function='Logloss',
            verbose=0, # Keep it quiet during loop
            random_seed=42
        )

        model.fit(X, y, cat_features=cat_features)
        models[label] = model
        print(f"Trained {label} model.")

    # 4. Save Models as a dictionary
    model_path = Path(__file__).parent / "risk_model.pkl"
    joblib.dump(models, model_path)
    
    print(f"\nSuccess! Multi-target risk model saved to {model_path}")
    
    # Feature importance analysis
    importances = model.get_feature_importance()
    print("\nFeature Importances:")
    for feature, importance in zip(features, importances):
        print(f" {feature:15}: {importance:.2f}%")

if __name__ == "__main__":
    train_risk_model()
