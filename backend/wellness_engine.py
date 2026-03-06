import os
from pathlib import Path
from google import genai
from google.genai import types

import json

class VedaEngine:
    def __init__(self):
        # Load system instructions to ground the engine's logic
        self.instructions_path = Path(__file__).parent.parent / "system_instructions.txt"
        self.system_instructions = self._load_instructions()
        # Securely load API key from environment variables
        api_key = os.getenv("GEMINI_API_KEY")
        self.client = genai.Client(api_key=api_key) if api_key else None
        self.fallback_models = [
            'gemini-2.5-flash',
            'gemini-2.5-flash-lite',
            'gemini-2.5-pro'
        ]

    def generate_with_fallback(self, prompt: str, system_instr: str | None = None):
        """Attempts to generate content, cascading through fallback models if rate limited."""
        last_error = None
        instruction = system_instr if system_instr else self.system_instructions
        config = types.GenerateContentConfig(system_instruction=instruction)
        
        for model_name in self.fallback_models:
            try:
                print(f"Attempting to generate with {model_name}...")
                response = self.client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=config,
                )
                return response
            except Exception as e:
                print(f"Model {model_name} encountered an error: {e}")
                last_error = e
                if "429" in str(e) or "Resource exhausted" in str(e) or "quota" in str(e).lower():
                    continue  # Fallback to next model
                else:
                    raise e
        
        raise last_error

    def _load_instructions(self) -> str:
        if self.instructions_path.exists():
            with open(self.instructions_path, "r", encoding="utf-8") as f:
                return f.read().strip()
        else:
            return "Warning: system_instructions.txt not found."

    def process_chat_nlu(self, message: str) -> dict:
        """
        Uses AI strictly as a Natural Language Understanding interpreter.
        Extracts relevant physiological signals from the user's message
        and provides a short, empathetic conversational reply.
        """
        prompt = (
            f"You are the NLU interpreter for Dinaveda, an Ayurvedic Health OS.\n"
            f"Your job is to read the user's message, extract any matching physiological 'signals', and provide a 1-sentence empathetic reply.\n\n"
            f"Available signals to extract (ONLY use these exact strings if present in the message):\n"
            f"- 'poor_sleep' (if they mention sleeping badly, insomnia, waking up tired)\n"
            f"- 'late_dinner' (if they mention eating late)\n"
            f"- 'bloating' (if they mention gas, bloating, stomach discomfort)\n"
            f"- 'high_stress' (if they mention anxiety, stress, being overwhelmed)\n"
            f"- 'skipped_meal' (if they mention fasting or missing a meal)\n"
            f"- 'good_hydration' (if they mention drinking a lot of water)\n"
            f"- 'heavy_meal' (if they mention eating a lot, feeling stuffed, heavy food)\n"
            f"- 'morning_exercise' (if they mention working out, yoga, running in AM)\n"
            f"- 'screen_fatigue' (if they mention staring at computers, eye strain, headache)\n"
            f"- 'nature_walk' (if they mention walking outside, being in nature)\n\n"
            f"User Message: '{message}'\n\n"
            f"Respond ONLY with a valid JSON object in this exact format. No markdown, no explanations.\n"
            f'{{\n'
            f'  "reply": "A concise, 1-sentence empathetic response validating their statement.",\n'
            f'  "signals": ["list", "of", "extracted", "signals"]\n'
            f'}}\n'
        )
        
        try:
            response = self.generate_with_fallback(prompt)
            text_response = response.text.replace('```json', '').replace('```', '').strip()
            
            # Clean up potential leading/trailing non-json text
            start = text_response.find('{')
            end = text_response.rfind('}') + 1
            if start != -1 and end > start:
                text_response = text_response[start:end]
                
            return json.loads(text_response)
        except Exception as e:
            print(f"[NLU Engine] AI failed: {e}")
            
            # --- DETERMINISTIC KEYWORD FALLBACK ---
            # If the AI quota is exhausted, we use safe local matching to guarantee the UI updates.
            msg_lower = message.lower()
            extracted = []
            
            if any(k in msg_lower for k in ["sleep", "slept poorly", "insomnia", "tired", "rest"]):
                extracted.append("poor_sleep")
            if any(k in msg_lower for k in ["bloat", "gas", "stomach", "indigestion"]):
                extracted.append("bloating")
            if any(k in msg_lower for k in ["stress", "anxious", "overwhelmed", "panic"]):
                extracted.append("high_stress")
            if any(k in msg_lower for k in ["late", "dinner", "ate late"]):
                extracted.append("late_dinner")
            if any(k in msg_lower for k in ["fast", "skip", "missed meal"]):
                extracted.append("skipped_meal")
            if any(k in msg_lower for k in ["water", "hydrate", "drink"]):
                extracted.append("good_hydration")
            if any(k in msg_lower for k in ["heavy", "stuffed", "ate a lot"]):
                extracted.append("heavy_meal")
            if any(k in msg_lower for k in ["workout", "exercise", "run", "yoga"]):
                extracted.append("morning_exercise")
            if any(k in msg_lower for k in ["screen", "computer", "eye", "headache"]):
                extracted.append("screen_fatigue")
            if any(k in msg_lower for k in ["walk", "nature", "outside"]):
                extracted.append("nature_walk")

            return {
                "reply": "I'm currently resting my neural core, but I have noted your symptoms and adjusted your biological pulse locally.",
                "signals": extracted
            }
