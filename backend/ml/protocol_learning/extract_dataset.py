import os
import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()

def extract_training_dataset():
    """
    Extracts protocol training data from Supabase pulse_logs using SQLAlchemy.
    Produces a CSV file optimized for ML training.
    """
    # Prefer DATABASE_URL for SQLAlchemy if available, otherwise construct from components
    db_url = os.environ.get("DATABASE_URL")
    
    if not db_url:
        print("Error: DATABASE_URL environment variable is missing.")
        print("Ensure you have your Supabase connection string in your .env file.")
        return

    try:
        # Create SQLAlchemy engine
        engine = create_engine(db_url)
        
        # Define features and target as requested
        columns = [
            'prakriti_vata',
            'prakriti_pitta',
            'prakriti_kapha',
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
            'evening_mood_score',
            'recommended_protocol', # Added to distinguish between interventions in the dataset
            'effect_score'           # Target
        ]
        
        # Construct the SQL query
        # Filtering for rows that have intervention feedback (effect_score is not null)
        cols_str = ", ".join(columns)
        query = f"SELECT {cols_str} FROM public.pulse_logs WHERE effect_score IS NOT NULL"
        
        print(f"Executing query on pulse_logs...")
        df = pd.read_sql(query, engine)
        
        if df.empty:
            print("No training data found (logs with effect_score recorded).")
            return

        # Export to CSV
        output_path = Path(__file__).parent / "training_dataset.csv"
        df.to_csv(output_path, index=False)
        
        print(f"Successfully extracted {len(df)} rows.")
        print(f"Dataset saved to: {output_path}")
        
    except Exception as e:
        print(f"An error occurred during extraction: {e}")

if __name__ == "__main__":
    extract_training_dataset()
