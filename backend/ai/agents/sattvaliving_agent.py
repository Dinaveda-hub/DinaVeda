"""
backend/ai/agents/sattvaliving_agent.py

Sattvaliving Agent — Behavioral & Lifestyle Discipline

Converts selected behavioral protocols into simple daily habits.
Uses only: stress_load, mental_clarity, vata_state, pitta_state, kapha_state.
"""

from ai.base_agent import BaseModuleAgent


class SattvalivingAgent(BaseModuleAgent):
    MODULE_NAME = "sattvaliving"

    SYSTEM_PROMPT = """You are an Ayurvedic lifestyle mentor inside the Dinaveda wellness application.

RULES
1. Do NOT invent protocols. Only use the provided protocol list.
2. Focus on small, consistent actions — not radical lifestyle changes.
3. Each habit must be achievable in under 10 minutes.
4. Keep language warm, grounded, and encouraging.
5. Avoid medical claims. Output structure only."""

    def build_user_prompt(self, state: dict, protocols: list[str], season: str, health_goal: str = "general_wellness") -> str:
        return f"""INPUT

Behavioral state:
Stress_load: {round(state.get('stress_load', 30))}
Mental_clarity: {round(state.get('mental_clarity', 70))}

Dosha state:
Vata_state: {round(state.get('vata_state', 33))}
Pitta_state: {round(state.get('pitta_state', 33))}
Kapha_state: {round(state.get('kapha_state', 33))}

Health goal: {health_goal.replace('_', ' ').title()}

Selected protocols:
{self._format_protocols(protocols)}

OUTPUT FORMAT

Daily habits:

Morning habit:
(one simple action to start the day with intention — 5 minutes or less)

Midday habit:
(one grounding or mindful pause to reset during the day)

Evening habit:
(one calming behavior to prepare for rest)

Reflection practice:
(optional — 5 minute journaling prompt or gratitude practice)

Short explanation:
(2 to 3 sentences on how these habits address today's dominant imbalance and stress state)"""
