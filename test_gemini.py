import os
import requests
import json

url = "http://localhost:8000/api/chat"
headers = {"Content-Type": "application/json"}
payload = {
    "message": "Hello",
    "prakriti": "Vata",
    "context": {"agni": 50, "stress": 20, "circadian": 80}
}

try:
    response = requests.post(url, headers=headers, json=payload, timeout=5)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
