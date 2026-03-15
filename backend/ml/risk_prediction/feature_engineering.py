import pandas as pd
import numpy as np

def compute_risk_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Computes rolling features and deltas for health risk prediction.
    Expects a DataFrame sorted by 'created_at' for each user.
    """
    # Ensure datetime for sorting/grouping
    df['created_at'] = pd.to_datetime(df['created_at'])
    df = df.sort_values(['user_id', 'created_at'])
    
    # 1. Rolling 7-day Averages
    signals_to_roll = {
        'sleep_quality_score': 'rolling_sleep',
        'stress_score': 'rolling_stress',
        'agni_score': 'rolling_agni',
        'hydration_score': 'hydration_avg'
    }
    
    for score_col, feature_name in signals_to_roll.items():
        if score_col in df.columns:
            # Group by user_id to avoid cross-user pollution
            df[feature_name] = df.groupby('user_id')[score_col].transform(
                lambda x: x.rolling(window=7, min_periods=1).mean()
            )
    
    # 2. Daily Deltas (Current Day - Previous Day)
    for score_col in signals_to_roll.keys():
        if score_col in df.columns:
            delta_name = f"delta_{score_col.replace('_score', '')}"
            df[delta_name] = df.groupby('user_id')[score_col].transform(
                lambda x: x.diff()
            )
            
    # 3. Add Contextual Features
    # Weekday (0-6)
    df['weekday'] = df['created_at'].dt.day_name()
    
    # Season (approximate based on month)
    def month_to_season(month):
        if month in [3, 4, 5]: return 'Spring'
        if month in [6, 7, 8]: return 'Summer'
        if month in [9, 10, 11]: return 'Autumn'
        return 'Winter'
    
    df['season'] = df['created_at'].dt.month.map(month_to_season)
    
    return df

def generate_targets(df: pd.DataFrame) -> pd.DataFrame:
    """
    Generates target labels for training (Imbalance events).
    Example: vata_spike_probability is high if vata_axis > 80.
    """
    # For now, let's treat extreme scores as events
    # Vata Spike: High stress + Low sleep
    if 'stress_score' in df.columns and 'sleep_quality_score' in df.columns:
        df['vata_spike_event'] = ((df['stress_score'] >= 3) & (df['sleep_quality_score'] <= 1)).astype(int)
    
    # Agni Collapse: Low agni score
    if 'agni_score' in df.columns:
        df['agni_collapse_event'] = (df['agni_score'] <= 1).astype(int)
    
    # Sleep Disruption: Low sleep quality score
    if 'sleep_quality_score' in df.columns:
        df['sleep_disruption_event'] = (df['sleep_quality_score'] <= 1).astype(int)
        
    return df
