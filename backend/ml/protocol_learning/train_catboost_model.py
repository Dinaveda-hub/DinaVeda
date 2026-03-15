import pandas as pd
import numpy as np
import joblib
from pathlib import Path
from catboost import CatBoostRegressor
from sklearn.model_selection import train_test_split
import sys

# Add parent directory to path to import features
sys.path.append(str(Path(__file__).parent.parent.parent))
from ml.protocol_learning.features import FEATURE_COLS, TARGET_VARIABLE

def train_catboost_model():
    """
    Trains a CatBoostRegressor to predict effect_score based on user state and protocol application.
    Automatically handles categorical features.
    """
    # Load dataset
    dataset_path = Path(__file__).parent / "training_dataset.csv"
    if not dataset_path.exists():
        print(f"Error: {dataset_path} not found. Extract data first.")
        return

    df = pd.read_sql_query if False else pd.read_csv(dataset_path) # Supporting both extraction methods
    
    if df.empty:
        print("No data in training_dataset.csv. Exiting.")
        return

    # Filter columns to only those defined in features.py
    X = df[FEATURE_COLS]
    y = df[TARGET_VARIABLE]

    # Detect categorical features
    # CatBoost is excellent at this - it just needs the indices or names
    categorical_features = X.select_dtypes(include=['object', 'bool', 'category']).columns.tolist()
    print(f"Detected categorical features: {categorical_features}")

    # Split into train/test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize and train CatBoostRegressor
    model = CatBoostRegressor(
        iterations=500,
        learning_rate=0.1,
        depth=6,
        loss_function='RMSE',
        verbose=100,
        random_seed=42
    )

    print("Training CatBoost Protocol Ranking Model...")
    model.fit(
        X_train, y_train,
        cat_features=categorical_features,
        eval_set=(X_test, y_test),
        early_stopping_rounds=50
    )

    # Evaluate
    print(f"Model trained. Best score: {model.get_best_score()}")

    # Save model using joblib as requested
    model_path = Path(__file__).parent / "protocol_model.pkl"
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_catboost_model()
