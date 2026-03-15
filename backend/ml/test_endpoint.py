import sys
import os
from fastapi.testclient import TestClient

# Add backend to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app

client = TestClient(app)

def test_prakriti_endpoint():
    print("Testing /api/prakriti endpoint...")
    test_payload = {
        "features": {
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
    }
    
    response = client.post("/api/prakriti", json=test_payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.json()}")

if __name__ == "__main__":
    try:
        test_prakriti_endpoint()
    except Exception as e:
        print(f"Test failed: {e}")
