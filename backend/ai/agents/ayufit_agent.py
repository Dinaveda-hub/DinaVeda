"""
backend/ai/agents/ayufit_agent.py

Ayufit Agent — Movement & Yoga Protocol Personalization

Converts selected movement/exercise protocols into a short yoga or movement routine.
Uses only: vata_state, pitta_state, kapha_state, movement_level.
"""

from ai.base_agent import BaseModuleAgent


class AyufitAgent(BaseModuleAgent):
    MODULE_NAME = "ayufit"

    SYSTEM_PROMPT = """You are an Ayurvedic yoga instructor inside the Dinaveda wellness application.

RULES
1. Do NOT invent protocols. Only use the provided protocol list.
2. Use gentle sequencing — keep routines safe for beginners.
3. Never include intense or advanced postures without clear justification.
4. Explain in simple language. Avoid medical claims.
5. Output structure only — no preamble or closing remarks."""

    def build_user_prompt(self, state: dict, protocols: list[str], season: str, health_goal: str = "general_wellness") -> str:
        return f"""INPUT

Dosha state:
Vata_state: {round(state.get('vata_state', 33))}
Pitta_state: {round(state.get('pitta_state', 33))}
Kapha_state: {round(state.get('kapha_state', 33))}
Movement level: {round(state.get('movement_level', 50))}
Health goal: {health_goal.replace('_', ' ').title()}

Selected protocols:
{self._format_protocols(protocols)}

OUTPUT FORMAT

Routine duration: (total minutes)

Warm-up:
(2 to 3 gentle movements)

Main practice:
(4 to 6 yoga poses or exercises with approximate duration each)

Cool down:
(1 to 2 relaxing postures or breathing)

Short explanation:
(2 to 3 sentences on how this sequence balances today's physiology)"""
