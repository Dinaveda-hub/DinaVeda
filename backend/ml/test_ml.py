import os
import sys

# Add the parent directory of 'ml' to the path so we can import 'ml'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ml.predict_prakriti import get_prediction, predictor

def test_ml_module():
    print("Testing ML Module for Prakriti Prediction...")
    
    # Test cases: [Build, Skin, Sleep, Appetite]
    test_cases = [
        ([0, 0, 0, 0], "Vata"),
        ([1, 1, 1, 1], "Pitta"),
        ([2, 2, 2, 2], "Kapha")
    ]
    
    for features, expected_hint in test_cases:
        prediction = get_prediction(features)
        probs = predictor.predict_with_probabilities(features)
        print(f"Features: {features}")
        print(f"Prediction: {prediction} (Expected hint: {expected_hint})")
        print(f"Probabilities: {probs}")
        print("-" * 20)

if __name__ == "__main__":
    test_ml_module()
