import os
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv
import sys
from pathlib import Path

# Add parent directory to path to import features
sys.path.append(str(Path(__file__).parent.parent.parent))
from ml.protocol_learning.features import FEATURE_COLS, TARGET_VARIABLE

load_dotenv()

def extract_data():
    """
    Extracts pulse_logs data from Supabase for ML training.
    Filters for logs that have both a recommended_protocol and an effect_score.
    """
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_KEY")
    
    if not supabase_url or not supabase_key:
        print("Error: Supabase environment variables missing.")
        return None

    supabase: Client = create_client(supabase_url, supabase_key)
    
    # Fetch logs where an intervention occurred and feedback was recorded
    response = supabase.table('pulse_logs').select("*").not_.is_('recommended_protocol', 'null').not_.is_('effect_score', 'null').execute()
    
    if not response.data:
        print("No training data found (logs with protocols + effect scores).")
        return pd.DataFrame()

    df = pd.DataFrame(response.data)
    
    # Select only relevant columns defined in features.py + target
    available_cols = [col for col in FEATURE_COLS + [TARGET_VARIABLE] if col in df.columns]
    df = df[available_cols]
    
    # Drop rows with missing values in critical features
    df = df.dropna()
    
    print(f"Extracted {len(df)} training samples.")
    return df

if __name__ == "__main__":
    df = extract_data()
    if not df.empty:
        # Save locally for verification (optional)
        output_path = Path(__file__).parent / "training_data.csv"
        df.to_csv(output_path, index=False)
        print(f"Data saved to {output_path}")
