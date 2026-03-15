import pandas as pd
import numpy as np
import joblib
from pathlib import Path
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

import sys
# Add parent directory to path to import features and extraction logic
sys.path.append(str(Path(__file__).parent.parent.parent))
from ml.protocol_learning.features import FEATURE_COLS, TARGET_VARIABLE, INTERVENTION_FEATURE
from ml.protocol_learning.extract_training_data import extract_data

def train_model():
    """
    Trains a model to predict effect_score based on user state and protocol.
    """
    df = extract_data()
    
    if df.empty:
        print("No data available for training. Exiting.")
        return

    # Split features and target
    X = df[FEATURE_COLS]
    y = df[TARGET_VARIABLE]

    # Preprocessing: Handle categorical 'recommended_protocol'
    # Use OneHotEncoder for the intervention name
    categorical_features = [INTERVENTION_FEATURE]
    
    # We create a column transformer to apply OneHotEncoding to the protocol name
    # Other features (scores and prakriti) are numeric and don't need transformation
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ],
        remainder='passthrough'
    )

    # Create a pipeline with preprocessing and model
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
    ])

    # Split into train/test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train
    print("Training Protocol Ranking Model...")
    model.fit(X_train, y_train)

    # Evaluate
    score = model.score(X_test, y_test)
    print(f"Model trained with R^2 score: {score:.4f}")

    # Save model
    model_path = Path(__file__).parent / "protocol_model.pkl"
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_model()
