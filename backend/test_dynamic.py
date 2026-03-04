import requests
import json

def test_module_plan(goal):
    url = "http://127.0.0.1:8001/module-plan"
    payload = {
        "module_slug": "nutriveda",
        "prakriti": "Vata",
        "vikriti": "Pitta",
        "custom_note": goal
    }
    print(f"\n--- Testing with Goal: {goal} ---")
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        data = response.json()
        print("Insight:", data.get('personalized_insight'))
        print("First Practice:", data.get('dynamic_practices', [{}])[0].get('name'))
    else:
        print(f"Error: {response.status_code}, {response.text}")

if __name__ == "__main__":
    test_module_plan("") # Default
    test_module_plan("I want to gain muscle mass") # Custom 1
    test_module_plan("I want to reduce bloating and gas") # Custom 2
