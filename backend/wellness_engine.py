import os
from pathlib import Path
import google.genai as genai
from google.genai import types

import json

class VedaEngine:
    def __init__(self):
        # Load system instructions and signals
        self.base_dir = Path(__file__).parent.parent
        self.instructions_path = self.base_dir / "system_instructions.txt"
        self.signals_path = self.base_dir / "frontend" / "src" / "data" / "signals.json"
        self.protocols_path = self.base_dir / "frontend" / "src" / "data" / "protocols.json"
        
        self.system_instructions = self._load_instructions()
        self.signal_library = self._load_signals()
        self.protocol_library = self._load_protocols()
        
        api_key = os.getenv("GEMINI_API_KEY")
        self.client = genai.Client(api_key=api_key) if api_key else None
        self.fallback_models = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.5-pro']

    def _load_instructions(self) -> str:
        if self.instructions_path.exists():
            with open(self.instructions_path, "r", encoding="utf-8") as f:
                return f.read().strip()
        return "You are the NLU interpreter for Dinaveda Health OS."

    def _load_signals(self) -> dict:
        if self.signals_path.exists():
            with open(self.signals_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return {}

    def _load_protocols(self) -> list:
        if self.protocols_path.exists():
            with open(self.protocols_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return []

    def get_physiology_state(self, signals: list[str]) -> dict:
        """
        Calculates cumulative biological state based on signals.
        Deterministic axis summation.
        """
        state = {
            "vata": 50.0,
            "pitta": 50.0,
            "kapha": 50.0,
            "agni": 50.0,
            "ojas": 50.0
        }
        
        for signal_key in signals:
            signal = self.signal_library.get(signal_key)
            if not signal:
                continue
            
            effects = signal.get("effects", {})
            # Map axes from JSON (e.g., vata_axis) to state keys
            for axis_key, delta in effects.items():
                clean_key = axis_key.replace("_axis", "")
                if clean_key in state:
                    state[clean_key] += delta
        
        # Clamp values
        for k in state:
            state[k] = max(0.0, min(100.0, state[k]))
            
        return state

    def select_protocols(self, state: dict) -> list[str]:
        """
        Deterministically selects candidate protocols based on state.
        Returns a list of protocol names.
        """
        candidates = []
        for protocol in self.protocol_library:
            # Basic deterministic selection logic: 
            # If a protocol corrects a deviated axis by more than X, it's a candidate.
            is_candidate = False
            for axis, delta in protocol.get("variables", {}).items():
                clean_axis = axis.replace("_axis", "")
                current_val = state.get(clean_axis, 50.0)
                
                # If axis is high and protocol reduces it, or vice versa
                if (current_val > 60 and delta < 0) or (current_val < 40 and delta > 0):
                    is_candidate = True
                    break
            
            if is_candidate:
                candidates.append(protocol["name"])
        
        return candidates[:15] # Limit to top 15 candidates for ranking

    def generate_with_fallback(self, prompt: str, system_instr: str | None = None):
        instruction = system_instr if system_instr else self.system_instructions
        config = types.GenerateContentConfig(system_instruction=instruction)

        for model_name in self.fallback_models:
            try:
                response = self.client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=config,
                )
                return response
            except Exception as e:
                if "429" in str(e) or "Resource exhausted" in str(e):
                    continue
                else:
                    raise e
        raise Exception("All models exhausted")

    def process_chat_nlu(self, message: str) -> dict:
        """
        Gemini acts strictly as an NLU classifier mapping synonyms to signal keys.
        Returns extracted signals to the frontend for physiological update.
        """
        # Inject only keys and synonyms to save tokens
        signal_map_for_nlu = {k: v.get("synonyms", []) for k, v in self.signal_library.items()}
        
        prompt = (
            f"You are a strict Natural Language Interpreter for Dinaveda Health OS.\n"
            f"Your task is to convert user input into signal keys.\n\n"
            f"Available signals with synonyms:\n{json.dumps(signal_map_for_nlu, indent=2)}\n\n"
            f"Rules:\n"
            f"1. Only return signal keys from the map above.\n"
            f"2. Do not generate new signals.\n"
            f"3. Respond ONLY with a valid JSON object: {{\"reply\": \"...\", \"signals\": [\"key1\", ... ]}}\n"
            f"4. If no signal matches, return an empty signals list.\n"
            f"5. Provide a warm, 1-sentence Ayurvedic reply.\n\n"
            f"User Message: '{message}'"
        )

        try:
            response = self.generate_with_fallback(prompt)
            text = response.text.strip()
            
            # Resilient JSON extraction
            try:
                data = json.loads(text)
            except json.JSONDecodeError:
                start = text.find('{')
                end = text.rfind('}') + 1
                if start != -1 and end > start:
                    data = json.loads(text[start:end])
                else:
                    raise ValueError("No valid JSON found in response")

            # Validation: ensure signals exist in library
            valid_keys = set(self.signal_library.keys())
            data["signals"] = [s for s in data.get("signals", []) if s in valid_keys]
            return data
            
        except Exception as e:
            print(f"NLU Fail: {e}")
            # Minimal keyword fallback using synonyms
            extracted = []
            msg_lower = message.lower()
            for key, info in self.signal_library.items():
                syns = info.get("synonyms", [])
                if key.replace("_", " ") in msg_lower or any(syn.lower() in msg_lower for syn in syns):
                    extracted.append(key)
            
            return {
                "reply": "I have carefully noted your physiological signals and adjusted your biological pulse accordingly.",
                "signals": extracted
            }
