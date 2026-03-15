import os
import sys
from typing import Dict, Any

# Ensure the parent directory is in the path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from predict_prakriti import predictor
except ImportError:
    # Fallback if running as a standalone script
    from .predict_prakriti import predictor

def predict_prakriti(features: Dict[str, Any]) -> Dict[str, float]:
    """
    Predict Ayurvedic Prakriti (Vata, Pitta, Kapha) based on user answers.
    
    Args:
        features (Dict[str, Any]): A dictionary of questionnaire answers.
                                   Keys should match the dataset feature names.
    
    Returns:
        Dict[str, float]: A dictionary containing the probability distribution 
                          for Vata, Pitta, and Kapha.
    """
    # ensure model is loaded
    if predictor.model is None:
        predictor._load_model()
        
    return predictor.predict_with_probabilities(features)

if __name__ == "__main__":
    # Sample Test
    test_answers = {
        "Body Size": "Slim",
        "Body Weight": "Moderate - no difficulties in gaining or losing weight",
        "Height": "Short",
        "Bone Structure": "Light, Small bones, prominent joints",
        "Complexion": "Fair-skin sunburns easily",
        "General feel of skin": "Dry and thin, cool to touch, rough",
        "Texture of Skin": "Oily",
        "Hair Color": "Black/Brown,dull",
        "Appearance of Hair": "Dry, black, knotted, brittle",
        "Shape of face": "Long, angular, thin",
        "Eyes": "Small, active, darting, dark eyes",
        "Eyelashes": "Moderate eyelashes",
        "Blinking of Eyes": "Moderate Blinking",
        "Cheeks": "Smooth, Flat",
        "Nose": "Rounded, Large open nostrils",
        "Teeth and gums": "Medium-sized teeth, Reddish gums",
        "Lips": "Lips are soft, medium-sized",
        "Nails": "Sharp, Flexible, Pink, Lustrous",
        "Appetite": "Slow but steady",
        "Liking tastes": "Sweet / Sour / Salty",
        "Metabolism Type": "fast",
        "Climate Preference": "warm",
        "Stress Levels": "moderate",
        "Sleep Patterns": "short",
        "Dietary Habits": "omnivorous",
        "Physical Activity Level": "moderate",
        "Water Intake": "moderate",
        "Digestion Quality": "moderate",
        "Skin Sensitivity": "normal"
    }
    
    print("Testing ML Service...")
    result = predict_prakriti(test_answers)
    print(f"Probability Distribution: {result}")
