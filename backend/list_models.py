import os
import google.generativeai as genai

os.environ["GOOGLE_API_KEY"] = "AIzaSyB1iVBo3K1TP1cdoSh54e985es_6rcrEi0"
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

print("Available models that support generateContent:")
for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"  {model.name}")
