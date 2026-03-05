import os
from pathlib import Path
from google import genai
from google.genai import types

import json
from datetime import datetime, date, timedelta

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

    def get_current_ritu(self) -> dict:
        """Determines the current Ayurvedic season based on the real-world current month."""
        now = datetime.now()
        month = now.month
        day = now.day
        
        # Simplified monthly mapping for clarity (March focus)
        # Vasanta (Spring): March - April
        # Grishma (Summer): May - June
        # Varsha (Monsoon): July - August
        # Sharad (Autumn): September - October
        # Hemanta (Early Winter): November - December
        # Shishira (Late Winter): January - February

        is_sandhi = (day <= 7) or (day >= 24) # Ritu Sandhi at start/end of month transition

        if month in [1, 2]:
            name = "Shishira (Late Winter)"
            next_name = "Vasanta (Spring)" if month == 2 else "Shishira"
        elif month in [3, 4]:
            name = "Vasanta (Spring)"
            next_name = "Grishma (Summer)" if month == 4 else "Vasanta"
        elif month in [5, 6]:
            name = "Grishma (Summer)"
            next_name = "Varsha (Monsoon)" if month == 6 else "Grishma"
        elif month in [7, 8]:
            name = "Varsha (Monsoon)"
            next_name = "Sharad (Autumn)" if month == 8 else "Varsha"
        elif month in [9, 10]:
            name = "Sharad (Autumn)"
            next_name = "Hemanta (Early Winter)" if month == 10 else "Sharad"
        else: # 11, 12
            name = "Hemanta (Early Winter)"
            next_name = "Shishira (Late Winter)" if month == 12 else "Hemanta"

        return {
            "name": name,
            "is_transition": is_sandhi,
            "transition_to": next_name if is_sandhi else None
        }

    def calculate_ojas(self, data: dict) -> dict:
        """
        Calculates the Ojas score based on the 5 domains.
        Returns the total score (clamped 0-100) and the breakdown.
        """
        # Nidra (30pts): Duration (up to 20) + Quality (scale 1-5 x 2)
        nidra_duration = data.get('sleep_hours', 0)
        nidra_dur_score = min(20, (nidra_duration / 8.0) * 20) if nidra_duration > 0 else 0
        nidra_qual = data.get('sleep_quality', 3) # Assume 1-5
        nidra_qual_score = nidra_qual * 2
        nidra_score = nidra_dur_score + nidra_qual_score

        # Ahara (25pts): +5 for lunch < 2PM, dinner < 8PM, light dinner, no fried, no late snack
        ahara_score = 0
        if data.get('lunch_before_2', False): ahara_score += 5
        if data.get('dinner_before_8', False): ahara_score += 5
        if data.get('light_dinner', False): ahara_score += 5
        if data.get('no_fried_food', False): ahara_score += 5
        if data.get('no_late_snack', False): ahara_score += 5

        # Dinacharya (20pts): +5 Wake < 6:30, +3 Tongue scraping, +3 Warm water, +5 Abhyanga, +4 Morning movement
        dina_score = 0
        if data.get('wake_before_630', False): dina_score += 5
        if data.get('tongue_scraping', False): dina_score += 3
        if data.get('warm_water', False): dina_score += 3
        if data.get('abhyanga', False): dina_score += 5
        if data.get('morning_movement', False): dina_score += 4

        # Vyayama (15pts): 20+ min (+15), 10-20 min (+8), else 0
        vyayama_min = data.get('vyayama_minutes', 0)
        vyayama_score = 15 if vyayama_min >= 20 else (8 if vyayama_min >= 10 else 0)

        # Manas (10pts): Calm/Clear +10, Neutral +7, Sluggish +5, Irritated +4, Anxious +3
        mood = data.get('mood', 'neutral').lower()
        mood_scores = {
            'calm': 10, 'clear': 10, 'neutral': 7,
            'sluggish': 5, 'irritated': 4, 'anxious': 3
        }
        manas_score = mood_scores.get(mood, 0)

        # Apply Seasonal Adjustments (Ritucharya)
        ritu_data = self.get_current_ritu()
        current_ritu = ritu_data["name"]
        
        if "Vasanta" in current_ritu:
            # Spring (Kapha Detox): Bonus for early wake and exercise. Penalize day sleep/heavy food.
            if data.get('wake_before_630', False): dina_score += 5
            if vyayama_min >= 20: vyayama_score += 5
            if data.get('sleep_hours', 0) > 8: nidra_score -= 5 # Day sleeping/oversleeping penalty
            if not data.get('light_dinner', False): ahara_score -= 5
        elif "Grishma" in current_ritu:
            # Summer: Penalize vigorous exercise, bonus for sweet/light cooling (approximated)
            if vyayama_min >= 30: vyayama_score -= 5
        elif "Hemanta" in current_ritu or "Shishira" in current_ritu:
            # Winter: Max strength. Generous metabolism, bonus for exercise and good sleep.
            if vyayama_min >= 20: vyayama_score += 5
            if nidra_duration >= 7: nidra_score += 5

        # Sum and clamp between 0 and 100
        total = nidra_score + ahara_score + dina_score + vyayama_score + manas_score
        total_clamped = max(0, min(100, int(total)))

        return {
            'total_score': total_clamped,
            'breakdown': {
                'Nidra': int(nidra_score),
                'Ahara': int(ahara_score),
                'Dinacharya': int(dina_score),
                'Vyayama': int(vyayama_score),
                'Manas': int(manas_score)
            },
            'biomarkers': {
                'agni': data.get('agni', 'balanced'),
                'ama': data.get('ama', 'none'),
                'mala': data.get('mala', 'clear'),
                'mutra': data.get('mutra', 'normal'),
                'hydration': data.get('hydration', 2)
            },
            'user_constitution': {
                'prakriti': data.get('prakriti', 'Unknown'),
                'vikriti': data.get('vikriti', 'Unknown')
            },
            'custom_note': data.get('custom_note', ''),
            'ritu_info': ritu_data
        }

    def generate_pathya_plan(self, ojas_data: dict) -> dict:
        """
        Uses Gemini to generate the Pathya plan based on the calculated Ojas score.
        """
        score = ojas_data['total_score']
        breakdown = ojas_data['breakdown']
        ritu_info = ojas_data['ritu_info']
        bio = ojas_data['biomarkers']
        constitution = ojas_data.get('user_constitution', {'prakriti': 'Unknown', 'vikriti': 'Unknown'})
        custom_note = ojas_data.get('custom_note', '')
        
        transition_note = f" Note: We are in Ritu Sandhi, a 14-day transition period towards {ritu_info['transition_to']}. Immunity may be lower, advise gentle merging of seasonal habits." if ritu_info['is_transition'] else ""
        custom_note_text = f"\n        Additional User Context/Note: '{custom_note}'" if custom_note else ""
        
        prompt = f"""
        Current Context: {ritu_info['name']} season.{transition_note}
        User Constitution:
        - Prakriti (Baseline): {constitution['prakriti']}
        - Vikriti (Current Imbalance): {constitution['vikriti']}
        
        User Statistics (Ojas Score: {score}/100):
        - Somasleep (Nidra/Sleep): {breakdown['Nidra']}/30
        - Nutriveda (Ahara/Agni): {breakdown['Ahara']}/25
        - Dinaveda (Dinacharya/Daily): {breakdown['Dinacharya']}/20
        - Ayufit (Vyayama/Movement): {breakdown['Vyayama']}/15
        - Manasayur (Manas/Sadvritta): {breakdown['Manas']}/10
        
        Advanced Biomarkers:
        - Appetite [Agni]: {bio['agni']}
        - Tongue Coating [Ama]: {bio['ama']}
        - Bowel Movements [Mala]: {bio['mala']}
        - Urination [Mutra]: {bio['mutra']}
        - Hydration: {bio['hydration']} units{custom_note_text}
        
        Analyze this data across the Veda Module Map. 
        Focus on:
        - Nutriveda: Detect potential Viruddha Ahara and Agni/Ama/Mala status, considering {constitution['prakriti']} & {constitution['vikriti']}.
        - Somasleep: Link sleep hygiene to circadian rhythm.
        - Manasayur: Address Dharaniya Vega if mood is impacted.
        - Rutuveda: Correlate findings with {ritu_info['name']} seasonal pulse.
        - Sattvaliving: Suggest how a more ethical/sustainable conduct (Achara Rasayana) can stabilize the scores.
        
        Provide the response STRICTLY as a JSON object with the following keys:
        - "observation": A clinical wellness summary acknowledged by the current Ritu.
        - "principle": A reference to Brihat Trayi that grounds the advice.
        - "pathya_plan": An object with "morning", "midday", and "evening" keys. Each value should be a concise markdown-formatted bulleted list.
        Do not use code blocks like ```json. Return only the raw JSON.
        """
        try:
            response = self.generate_with_fallback(prompt)
            # Remove markdown if the model wraps it in ```json ... ```
            text_response = response.text.replace('```json', '').replace('```', '').strip()
            return json.loads(text_response)
        except Exception as e:
            return {"error": f"Error generating Pathya Plan: {e}"}

    def generate_module_plan(self, module_slug: str, prakriti: str, vikriti: str, current_season: str, custom_note: str = "") -> dict:
        """
        Dynamically generates personalized content for a specific module.
        When custom_note is provided, ALL content is focused on that specific goal.
        """
        if custom_note:
            system_instr = (
                f"You are an Ayurvedic wellness advisor. "
                f"The user's SOLE GOAL is: '{custom_note}'. "
                f"All your advice must help them achieve this exact goal using Ayurvedic principles. "
                f"Context: Prakriti={prakriti}, Vikriti={vikriti}, Season={current_season}, Module={module_slug}. "
                f"NEVER give generic wellness advice. Every sentence must relate directly to '{custom_note}'."
            )
            prompt = (
                f"Respond ONLY with a valid JSON object. No explanation, no markdown, just raw JSON.\n\n"
                f"The JSON must have exactly these two keys:\n"
                f"1. personalized_insight: an array of exactly 3 strings. Each string must be EXACTLY 1 SHORT SENTENCE (max 15 words) about how to achieve '{custom_note}'.\n"
                f"2. dynamic_practices: an array of exactly 3 objects. Each object must have: "
                f"name (short 2-3 word name), "
                f"desc (exactly 4 words describing it), "
                f"time (best time of day), "
                f"detail (EXACTLY 1 SHORT SENTENCE: what to do and why it helps). KEEP IT VERY PUNCHY.\n\n"
                f"Example format (fill in real content, not this example text):\n"
                f'{{"personalized_insight": ["Short punchy sentence one.", "Short punchy sentence two.", "Short punchy sentence three."], '
                f'"dynamic_practices": [{{"name": "Real name", "desc": "four word desc", "time": "Morning", "detail": "One short punchy sentence explaining the action."}}]}}'
            )
        else:
            system_instr = self.system_instructions
            prompt = (
                f"Respond ONLY with a valid JSON object. No explanation, no markdown, just raw JSON.\n\n"
                f"Generate an EXTREMELY CONCISE personalized wellness plan for the {module_slug} module. "
                f"User: Prakriti={prakriti}, Vikriti={vikriti}, Season={current_season}.\n\n"
                f"The JSON must have exactly these two keys:\n"
                f"1. personalized_insight: array of exactly 3 strings. Each string must be EXACTLY 1 SHORT SENTENCE (max 15 words).\n"
                f"2. dynamic_practices: array of exactly 3 objects, each with: "
                f"name (2-3 words), desc (4 words), time, detail (EXACTLY 1 SHORT SENTENCE).\n\n"
                f"Example format:\n"
                f'{{"personalized_insight": ["Short punchy insight.", "Another punchy insight.", "Final short insight."], '
                f'"dynamic_practices": [{{"name": "Practice Name", "desc": "four word desc", "time": "7:00 AM", "detail": "One short sentence describing the action."}}]}}'
            )
        
        try:
            print(f"[MODULE PLAN] slug={module_slug}, goal='{custom_note}'")
            response = self.generate_with_fallback(prompt, system_instr=system_instr)
            text_response = response.text.replace('```json', '').replace('```', '').strip()
            # Strip any leading/trailing text outside JSON braces
            start = text_response.find('{')
            end = text_response.rfind('}') + 1
            if start != -1 and end > start:
                text_response = text_response[start:end]
            print(f"[MODULE PLAN] Parsed response length: {len(text_response)}")
            return json.loads(text_response)
        except Exception as e:
            print(f"[MODULE PLAN] AI failed: {e}")
            if custom_note:
                print("[MODULE PLAN] Using keyword-based fallback for goal.")
                return self._get_goal_based_fallback(custom_note, prakriti, vikriti)
            return {"error": f"Error generating module plan: {e}"}

    def _get_goal_based_fallback(self, goal: str, prakriti: str, vikriti: str) -> dict:
        """
        Returns goal-specific insights and practices based on keyword matching.
        Used as a graceful fallback when the AI API is unavailable or quota-exhausted.
        """
        goal_lower = goal.lower()
        
        # --- Bloating / Digestion ---
        if any(k in goal_lower for k in ["bloat", "gas", "digest", "stomach", "indigestion", "acidity"]):
            return {
                "personalized_insight": [
                    f"Your goal to '{goal}' is best addressed by strengthening Agni (digestive fire). As a {prakriti} constitution, your digestion may be irregular — regularity in meal timing is key.",
                    f"Vata-aggravated digestion creates gas and bloating. Avoid cold water, raw vegetables, and legumes without proper soaking and spicing with cumin, coriander, and fennel.",
                    f"Sip warm ginger-fennel tea after every meal. This calms Vata in the colon and directly reduces gas formation, addressing your core goal."
                ],
                "dynamic_practices": [
                    {"name": "Fennel Seed Sip", "desc": "Gas-clearing digestive tea", "time": "After Meals", "detail": "Steep 1 tsp fennel seeds + 1/2 tsp cumin in hot water for 10 minutes. Sip slowly after lunch and dinner — fennel directly expels trapped Vata gas from the colon."},
                    {"name": "Triphala at Night", "desc": "Colon-cleansing herbal formula", "time": "9:00 PM", "detail": "Take 1/2 tsp Triphala powder with warm water before sleep. This gently cleanses the intestines and regulates bowel movements, eliminating bloating at its root."},
                    {"name": "Agni Mudra", "desc": "Fire-boosting hand gesture", "time": "Before Meals", "detail": "Fold ring finger to palm and press thumb on it for 10 minutes before eating. This stimulates digestive Agni and ensures food is properly broken down before it ferments."}
                ]
            }
        
        # --- Sleep ---
        elif any(k in goal_lower for k in ["sleep", "insomnia", "rest", "nidra", "tired", "fatigue", "stress"]):
            return {
                "personalized_insight": [
                    f"Your goal of '{goal}' requires calming Vata and Pitta through consistent Dinacharya (daily routine). Irregular schedules are the #1 Ayurvedic cause of poor sleep in {prakriti} constitutions.",
                    f"Abhyanga (self-oil massage) with warm sesame oil before bed directly counters Vata's restlessness, grounding the nervous system and preparing the mind for deep Nidra.",
                    f"Avoid screens and stimulating conversations after 8 PM. Kapha time (6–10 PM) is Nidra-auspicious — aligning with it dramatically improves sleep quality."
                ],
                "dynamic_practices": [
                    {"name": "Brahmi Milk Ritual", "desc": "Calming nighttime brain tonic", "time": "9:00 PM", "detail": "Warm 1 cup milk with a pinch of Brahmi powder and nutmeg. Drink 30 minutes before sleep — Brahmi calms the Sadhaka Pitta subdosha responsible for mental restlessness."},
                    {"name": "Padabhyanga", "desc": "Foot oil massage practice", "time": "Before Bed", "detail": "Massage warm sesame or coconut oil onto the soles of the feet for 5 minutes. This activates marma points that directly sedate the nervous system and induce Nidra."},
                    {"name": "Bhramari Pranayama", "desc": "Humming bee breath technique", "time": "8:30 PM", "detail": "Close ears with thumbs, hum like a bee on the exhale for 5–10 rounds. The vibration activates the vagus nerve, lowering cortisol and preparing the brain for restorative sleep."}
                ]
            }
        
        # --- Weight / Fat Loss ---
        elif any(k in goal_lower for k in ["weight", "fat", "slim", "lean", "reduce weight", "lose weight"]):
            return {
                "personalized_insight": [
                    f"Your goal of '{goal}' Ayurvedically means reducing excess Kapha and Ama (toxins). Your {prakriti} constitution requires stimulating Agni without aggravating {vikriti}.",
                    f"In the current season, the body is primed for Ama detoxification. Eat your largest meal at midday when Pitta (solar energy) is strongest for maximum fat metabolism.",
                    f"Kapha-pacifying foods — bitter greens, light grains, pungent spices — must replace heavy, oily, sweet foods that feed Kapha accumulation."
                ],
                "dynamic_practices": [
                    {"name": "Triphala Morning Flush", "desc": "Ama-clearing morning detox", "time": "6:00 AM", "detail": "Drink 1/2 tsp Triphala in warm water on an empty stomach. It flushes accumulated Ama from the intestines and kickstarts fat metabolism by clearing digestive channels."},
                    {"name": "Lunch-Heavy Eating", "desc": "Metabolic meal timing practice", "time": "12:00 PM", "detail": "Make lunch your largest meal of the day when Samana Vayu and Pachaka Pitta are at peak. Skipping dinner or having a light soup ensures no overnight Kapha accumulation."},
                    {"name": "Kapalabhati Pranayama", "desc": "Rapid diaphragm breath pump", "time": "6:30 AM", "detail": "Do 3 rounds of 30 rapid exhales (bellows breath) in the morning. Kapalabhati directly stimulates Agni, burns Ama, and activates the abdominal organs for fat release."}
                ]
            }
        
        # --- Muscle / Strength ---
        elif any(k in goal_lower for k in ["muscle", "strength", "build", "gain weight", "protein", "workout"]):
            return {
                "personalized_insight": [
                    f"Ayurvedic muscle-building (Mamsa Dhatu Pusti) for your {prakriti} constitution requires grounding Vata first — Vata is catabolic and will prevent muscle retention if aggravated.",
                    f"Your {vikriti} imbalance means Pitta's heat can break down muscle tissue. Counter this with mildly cooling, high-protein foods: Urad dal, milk, ghee, and soaked almonds.",
                    f"Training timing matters: exercise during Kapha time (6–10 AM) when the body naturally builds and strengthens tissues for maximum anabolic benefit."
                ],
                "dynamic_practices": [
                    {"name": "Ashwagandha Milk", "desc": "Anabolic adaptogen tonic", "time": "Before Bed", "detail": "Mix 1 tsp Ashwagandha in warm milk with ghee and honey after sunset. Ashwagandha is Ayurveda's premier Balya (strengthening) herb — it raises testosterone and supports Mamsa Dhatu growth during sleep."},
                    {"name": "Urad Dal Breakfast", "desc": "Heavy protein morning meal", "time": "8:00 AM", "detail": "Eat a warm bowl of spiced black lentil (Urad dal) soup or idli at breakfast. Urad dal is classified as Mamsala (muscle-building) in Charaka Samhita, providing heavy, nourishing fuel for strength training."},
                    {"name": "Morning Vyayama", "desc": "Kapha-time strength training", "time": "7:00 AM", "detail": "Train during Kapha hours (before 10 AM) when tissues are heaviest and most stable. Kapha-dominant time supports anabolic processes — post-workout Ojas rebuilds fastest during this window."}
                ]
            }
        
        # --- Mental Clarity / Focus ---
        elif any(k in goal_lower for k in ["focus", "mental", "clarity", "brain", "memory", "concentration"]):
            return {
                "personalized_insight": [
                    f"Mental clarity in Ayurveda depends on Sadhaka Pitta (mental fire) and Prana Vata flow. Your {prakriti} constitution needs both stability and lightness for peak cognitive function.",
                    f"Ama (mental toxins) accumulate from poor sleep, irregular eating, and digital overstimulation. Cleansing Ama through diet and breathwork will dramatically improve focus.",
                    f"Medhya Rasayanas — brain tonics like Brahmi, Shankhapushpi, and Shatavari — directly nourish neurons and improve neurotransmitter synthesis for your specific goal."
                ],
                "dynamic_practices": [
                    {"name": "Brahmi Oil Nasya", "desc": "Nasal brain-pathway opener", "time": "Morning", "detail": "Place 2 drops of Brahmi-infused oil in each nostril after showering. Nasya (nasal therapy) is the direct pathway to nourish Prana Vata in the brain, improving focus within 2 weeks."},
                    {"name": "Nadi Shodhana", "desc": "Alternate nostril breath balance", "time": "6:00 AM", "detail": "Practice 10 minutes of alternate nostril breathing before work. This balances left (Ida/creative) and right (Pingala/analytical) brain hemispheres, creating the mental clarity you're seeking."},
                    {"name": "Shankhapushpi Tonic", "desc": "Memory-enhancing herbal drink", "time": "10:00 AM", "detail": "Take 1 tsp Shankhapushpi syrup or powder in water mid-morning. Classical Ayurvedic texts classify Shankhapushpi as the premier Medhya Rasayana for memory enhancement and sustained attention."}
                ]
            }
        
        # --- Generic goal fallback ---
        else:
            return {
                "personalized_insight": [
                    f"Your goal '{goal}' can be supported through daily Dinacharya aligned with your {prakriti} constitution. Consistency in routine is the most powerful Ayurvedic tool.",
                    f"With a {vikriti} imbalance, addressing your foundational health through Ahara (diet), Nidra (sleep), and Vyayama (movement) will create the stability needed to achieve your goal.",
                    f"Begin with small, sustainable changes aligned to your circadian rhythm. Ayurveda teaches that sustainable transformation happens through gradual Sattvic living."
                ],
                "dynamic_practices": [
                    {"name": "Morning Ritual Reset", "desc": "Goal-aligned daily start", "time": "6:30 AM", "detail": "Begin the day with warm water, tongue scraping, and 5 minutes of deep breathing before any screen time. This sets a Sattvic tone for the entire day and builds the mental resolve needed to achieve your goal."},
                    {"name": "Seasonal Eating", "desc": "Ritu-based food choices", "time": "All Meals", "detail": f"Eat foods that align with the current season and your {prakriti} constitution — primarily warm, cooked, easily digestible meals. Seasonal eating builds Ojas (vital essence), the foundational energy behind all achievement including '{goal}'."},
                    {"name": "Evening Abhyanga", "desc": "Grounding self-oil massage", "time": "7:00 PM", "detail": "Massage warm sesame (for Vata) or coconut (for Pitta) oil onto your body for 10 minutes before showering. This daily practice builds resilience and recovery capacity needed to pursue any sustained goal."}
                ]
            }

