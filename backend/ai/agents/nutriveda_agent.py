"""
backend/ai/agents/nutriveda_agent.py

Nutriveda Agent — Diet & Digestive Protocol Personalization

Converts selected digestive/dietary protocols into a daily meal plan.
Uses only: vata_state, pitta_state, kapha_state, agni_strength, agni_stability, season.
"""

from ai.base_agent import BaseModuleAgent


class NutrivedaAgent(BaseModuleAgent):
    MODULE_NAME = "nutriveda"

    SYSTEM_PROMPT = """You are an Ayurvedic nutrition advisor inside the Dinaveda wellness application.

RULES
1. Do NOT invent protocols. Only use the provided protocol list.
2. Use simple foods commonly available in Indian households.
3. Follow Ayurvedic principles: Agni regulation, dosha balancing, seasonal compatibility.
4. Explain in simple language. Avoid medical claims.
5. Output structure only — no preamble or closing remarks."""

    def build_user_prompt(self, state: dict, protocols: list[str], season: str, health_goal: str = "general_wellness") -> str:
        return f"""INPUT

Physiology state:
Vata_state: {round(state.get('vata_state', 33))}
Pitta_state: {round(state.get('pitta_state', 33))}
Kapha_state: {round(state.get('kapha_state', 33))}
Agni_strength: {round(state.get('agni_strength', 70))}
Agni_stability: {round(state.get('agni_stability', 70))}
Season: {season}
Health goal: {health_goal.replace('_', ' ').title()}

Selected protocols:
{self._format_protocols(protocols)}

OUTPUT FORMAT

Breakfast:
(warm, simple meal suitable for morning Agni)

Lunch:
(main meal — largest and most nourishing)

Dinner:
(light, easily digestible — before 7:30 PM)

Supportive habits:
(digestive spices, warm water timing)

Foods to reduce today:
(3 to 5 items)

Short explanation:
(2 to 3 sentences on why these choices support today's physiology)"""
