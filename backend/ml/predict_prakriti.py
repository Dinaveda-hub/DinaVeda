import joblib
import os
import numpy as np
import pandas as pd

class PrakritiPredictor:
    def __init__(self, model_path=None):
        if model_path is None:
            model_path = os.path.join(os.path.dirname(__file__), 'prakriti_model.pkl')
        
        self.model_path = model_path
        self.model = None
        self._load_model()

    def _load_model(self):
        if os.path.exists(self.model_path):
            try:
                # Loading model saved with joblib
                self.model = joblib.load(self.model_path)
                print(f"Model loaded successfully from {self.model_path}")
            except Exception as e:
                print(f"Error loading model: {e}")
        else:
            print(f"Warning: Model file not found at {self.model_path}. Please run training script first.")

    def predict(self, input_data):
        """
        Predict Prakriti based on input data.
        :param input_data: dictionary or list of feature values
        :return: Predicted Prakriti string
        """
        if self.model is None:
            raise RuntimeError("Prakriti model not loaded")
        
        # If input is a dictionary, convert to DataFrame for CatBoost
        if isinstance(input_data, dict):
            df = pd.DataFrame([input_data])
            # Ensure feature order matches training
            if hasattr(self.model, 'feature_names_'):
                df = df[self.model.feature_names_]
            prediction = self.model.predict(df)
        elif isinstance(input_data, list):
            prediction = self.model.predict([input_data])
        else:
            raise ValueError("Invalid Input Format: Expected dict or list")
        
        # prediction is usually a 2D array [[class]]
        if hasattr(prediction, 'flatten'):
            return prediction.flatten()[0]
        return str(prediction[0])

    def predict_with_probabilities(self, input_data):
        """
        Predict Prakriti and return probabilities for each type.
        """
        if self.model is None:
            raise RuntimeError("Prakriti model not loaded")
        
        if isinstance(input_data, dict):
            df = pd.DataFrame([input_data])
            # Ensure feature order matches training
            if hasattr(self.model, 'feature_names_'):
                df = df[self.model.feature_names_]
            probabilities = self.model.predict_proba(df)[0]
        elif isinstance(input_data, list):
            probabilities = self.model.predict_proba([input_data])[0]
        else:
            raise ValueError("Invalid Input Format: Expected dict or list")
            
        classes = self.model.classes_
        
        # Normalize probabilities to ensure they sum to exactly 1.0
        total_prob = sum(probabilities)
        if total_prob > 0:
            probabilities = [p / total_prob for p in probabilities]
            
        result = {}
        for cls, prob in zip(classes, probabilities):
            result[str(cls)] = float(prob)
            
        return result

# Singleton instance
predictor = PrakritiPredictor()

def get_prediction(input_data):
    return predictor.predict(input_data)

if __name__ == "__main__":
    # Example prediction (using values from the CSV)
    test_input = {
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
    print(f"Prediction result: {get_prediction(test_input)}")
