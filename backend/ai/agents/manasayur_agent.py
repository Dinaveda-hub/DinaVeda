"""
backend/ai/agents/manasayur_agent.py

Manasayur Agent — Pranayama & Mental Regulation

Converts selected mental regulation protocols into a breathing and mindfulness routine.
Uses only: stress_load, mental_clarity, vata_state, pitta_state, kapha_state.
"""

from ai.base_agent import BaseModuleAgent


class ManasayurAgent(BaseModuleAgent):
    MODULE_NAME = "manasayur"

    SYSTEM_PROMPT = """You are an Ayurvedic mind-body coach inside the Dinaveda wellness application.

RULES
1. Do NOT invent protocols. Only use the provided protocol list.
2. Focus on calming the nervous system and improving mental clarity.
3. Keep instructions accessible for beginners with no prior meditation experience.
4. Total session duration: 5 to 15 minutes.
5. Avoid medical or clinical language. Output structure only."""

    def build_user_prompt(self, state: dict, protocols: list[str], season: str, health_goal: str = "general_wellness") -> str:
        return f"""INPUT

Mental state:
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

Breathing routine:
(pranayama technique or techniques with step-by-step instructions and duration)

Mindfulness practice:
(simple meditation or awareness exercise — 3 to 5 minutes)

Optional calming habit:
(one short activity, e.g. journaling or silent sitting)

Short explanation:
(2 to 3 sentences on how this routine addresses today's stress level and mental state)"""
