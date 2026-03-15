import pandas as pd
import numpy as np
from catboost import CatBoostClassifier
from sklearn.model_selection import train_test_split
import joblib
import os

def train_catboost_model():
    # File paths
    base_dir = os.path.dirname(__file__)
    csv_path = os.path.join(base_dir, 'Prakriti_Tridosha_Dataset.csv')
    model_path = os.path.join(base_dir, 'prakriti_model.pkl')
    
    if not os.path.exists(csv_path):
        print(f"Error: Dataset not found at {csv_path}")
        return

    print(f"Loading dataset from {csv_path}...")
    df = pd.read_csv(csv_path)
    
    # Strip whitespace from all string columns and values
    df.columns = df.columns.str.strip()
    for col in df.columns:
        if df[col].dtype == 'object' or hasattr(df[col], 'str'):
            df[col] = df[col].astype(str).str.strip()

    # Define target and features
    target_col = 'Dosha'
    if target_col not in df.columns:
        # Try to find a similar column name if 'Dosha' isn't exact
        cols = [c for c in df.columns if 'dosha' in c.lower()]
        if cols:
            target_col = cols[0]
        else:
            print(f"Error: Target column '{target_col}' not found in dataset. Columns are: {list(df.columns)}")
            return

    X = df.drop(target_col, axis=1)
    y = df[target_col]
    
    # Identify categorical columns - better detection
    categorical_features_indices = []
    for i, col in enumerate(X.columns):
        dtype_name = X[col].dtype.name
        if dtype_name in ['object', 'string', 'category', 'str']:
            categorical_features_indices.append(i)
    
    print(f"Categorical features detected at indices: {categorical_features_indices}")
    print(f"Feature columns: {list(X.columns)}")
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training CatBoost model...")
    model = CatBoostClassifier(
        iterations=500,
        learning_rate=0.1,
        depth=6,
        loss_function='MultiClass',
        verbose=100,
        random_seed=42
    )
    
    model.fit(
        X_train, y_train,
        cat_features=categorical_features_indices,
        eval_set=(X_test, y_test),
        early_stopping_rounds=50
    )
    
    # Evaluate
    accuracy = model.score(X_test, y_test)
    print(f"\nModel Accuracy on Test Set: {accuracy:.4f}")
    
    # Save the model using joblib as requested
    print(f"Saving model to {model_path} using joblib...")
    joblib.dump(model, model_path)
    
    print("Training pipeline complete.")

if __name__ == "__main__":
    train_catboost_model()
