import os
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent.parent))
from ml.risk_prediction.feature_engineering import compute_risk_features, generate_targets

load_dotenv()

def get_supabase() -> Client:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_KEY")
    return create_client(url, key)

def main():
    print("Connecting to Supabase...")
    supabase = get_supabase()
    
    print("Fetching pulse_logs...")
    # Fetch relevant columns for risk prediction
    result = supabase.table("pulse_logs").select(
        "user_id, created_at, sleep_quality_score, stress_score, agni_score, hydration_score"
    ).execute()
    
    data = result.data
    if not data:
        print("No data found in pulse_logs.")
        return
    
    print(f"Propagating {len(data)} records to feature engineering...")
    df = pd.DataFrame(data)
    
    # Apply feature engineering
    df = compute_risk_features(df)
    df = generate_targets(df)
    
    # Drop rows with NaN (from rolling/diff) for clean training
    df_clean = df.dropna(subset=['rolling_sleep', 'rolling_stress', 'rolling_agni', 'hydration_avg'])
    
    output_path = Path(__file__).parent / "training_dataset_risk.csv"
    df_clean.to_csv(output_path, index=False)
    
    print(f"Success! Risk training dataset saved to {output_path}")
    print("\nFeature Preview:")
    print(df_clean[['rolling_sleep', 'rolling_stress', 'rolling_agni', 'hydration_avg', 'weekday', 'season']].head())

if __name__ == "__main__":
    main()
