import os
from pathlib import Path
from google import genai
from google.genai import types

import json

# ─────────────────────────────────────────────
# Default Physiology State
# Mirrors the frontend VedaState interface
# ─────────────────────────────────────────────

DEFAULT_STATE = {
    "prakriti_vata": 33,
    "prakriti_pitta": 33,
    "prakriti_kapha": 33,

    "vata_state": 33,
    "pitta_state": 33,
    "kapha_state": 33,

    "agni_strength": 70,
    "agni_stability": 70,
    "ama_risk": 10,

    "ojas_score": 80,
    "ojas_recovery": 50,

    "circadian_alignment": 85,
    "sleep_debt": 10,
    "light_exposure": 50,

    "appetite_quality": 70,
    "digestion_comfort": 80,
    "bloating_level": 10,
    "bowel_quality": 75,

    "stress_load": 30,
    "mental_clarity": 70,
    "screen_exposure": 60,

    "movement_level": 50,
    "hydration_status": 60,
    "meal_timing": 80,

    "rutu_season": "Vasanta",
    "climate_quality": 50,
}

# ─────────────────────────────────────────────
# Signal → State Effect Map
# Deterministic: no AI involved
# ─────────────────────────────────────────────

SIGNAL_EFFECTS: dict[str, dict[str, float]] = {
    "poor_sleep": {
        "circadian_alignment": -15,
        "ojas_score": -8,
        "mental_clarity": -10,
        "sleep_debt": +15,
        "vata_state": +8,
    },
    "late_dinner": {
        "agni_strength": -10,
        "ama_risk": +10,
        "sleep_debt": +5,
        "circadian_alignment": -5,
    },
    "bloating": {
        "agni_strength": -12,
        "ama_risk": +15,
        "digestion_comfort": -15,
        "bloating_level": +20,
    },
    "high_stress": {
        "stress_load": +20,
        "ojas_score": -10,
        "vata_state": +12,
        "mental_clarity": -10,
        "agni_stability": -5,
    },
    "skipped_meal": {
        "agni_strength": -8,
        "ojas_score": -5,
        "vata_state": +5,
        "meal_timing": -15,
    },
    "good_hydration": {
        "hydration_status": +15,
        "digestion_comfort": +5,
        "ama_risk": -5,
    },
    "heavy_meal": {
        "agni_strength": -8,
        "ama_risk": +10,
        "kapha_state": +8,
        "bloating_level": +10,
    },
    "morning_exercise": {
        "movement_level": +20,
        "ojas_score": +5,
        "circadian_alignment": +8,
        "stress_load": -10,
    },
    "screen_fatigue": {
        "screen_exposure": +20,
        "circadian_alignment": -10,
        "mental_clarity": -8,
        "stress_load": +5,
    },
    "nature_walk": {
        "stress_load": -12,
        "vata_state": -5,
        "mental_clarity": +10,
        "ojas_score": +5,
    },
}

# ─────────────────────────────────────────────
# Protocol Selection Rules
# Module → variable condition → protocol list
# ─────────────────────────────────────────────

PROTOCOL_RULES = [
    # ── Somasleep ──
    {"condition": ("circadian_alignment", "<", 65), "protocols": ["digital_detox", "padabhyanga", "early_sleep"]},
    {"condition": ("sleep_debt", ">", 30),           "protocols": ["sleep_ritual", "slow_breathing"]},

    # ── Nutriveda ──
    {"condition": ("agni_strength", "<", 55),  "protocols": ["warm_meals", "digestive_spices", "light_dinner"]},
    {"condition": ("ama_risk", ">", 25),        "protocols": ["light_dinner", "warm_water_morning"]},
    {"condition": ("kapha_state", ">", 60),     "protocols": ["light_meals", "digestive_walk"]},

    # ── Ayufit ──
    {"condition": ("movement_level", "<", 40), "protocols": ["grounding_yoga", "digestive_walk"]},
    {"condition": ("vata_state", ">", 55),     "protocols": ["grounding_yoga", "light_movement"]},

    # ── Manasayur ──
    {"condition": ("stress_load", ">", 50),     "protocols": ["slow_breathing", "stress_reset", "evening_meditation"]},
    {"condition": ("mental_clarity", "<", 50),  "protocols": ["alternate_nostril_breathing", "silent_observation"]},

    # ── Sattvaliving ──
    {"condition": ("ojas_score", "<", 65),  "protocols": ["gratitude_practice", "digital_detox", "early_sleep"]},
]


def _clamp(v: float) -> float:
    return max(0.0, min(100.0, v))


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

    # ─────────────────────────────────────────────
    # AI — with fallback cascade
    # ─────────────────────────────────────────────

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

    # ─────────────────────────────────────────────
    # Deterministic: Physiology State Computation
    # ─────────────────────────────────────────────

    def get_physiology_state(self, signals: list[str] | None = None) -> dict:
        """
        Returns the physiology state after applying a list of user signals.
        Completely deterministic — no AI involved.

        The rule engine decides what physiological corrections are needed.
        AI (in the frontend modules) only converts these into personalized routines.
        """
        state = dict(DEFAULT_STATE)

        if signals:
            for signal in signals:
                effects = SIGNAL_EFFECTS.get(signal, {})
                for var, delta in effects.items():
                    if var in state and isinstance(state[var], (int, float)):
                        state[var] = _clamp(state[var] + delta)

        return state

    # ─────────────────────────────────────────────
    # Deterministic: Protocol Selection
    # ─────────────────────────────────────────────

    def select_protocols(self, state: dict) -> list[str]:
        """
        Evaluates threshold rules against the physiology state and returns
        a deduplicated list of selected protocol names.
        Completely deterministic — no AI involved.
        """
        selected: list[str] = []
        seen: set[str] = set()

        for rule in PROTOCOL_RULES:
            var, op, threshold = rule["condition"]
            value = state.get(var)
            if value is None:
                continue

            triggered = False
            if op == "<" and value < threshold:
                triggered = True
            elif op == ">" and value > threshold:
                triggered = True
            elif op == "<=" and value <= threshold:
                triggered = True
            elif op == ">=" and value >= threshold:
                triggered = True

            if triggered:
                for proto in rule["protocols"]:
                    if proto not in seen:
                        selected.append(proto)
                        seen.add(proto)

        return selected

    # ─────────────────────────────────────────────
    # AI: Chat NLU Extraction
    # ─────────────────────────────────────────────

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
