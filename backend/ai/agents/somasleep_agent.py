"""
backend/ai/agents/somasleep_agent.py

Somasleep Agent — Sleep & Circadian Routine Personalization

Converts selected sleep/circadian protocols into a structured evening wind-down routine.
Uses only: circadian_alignment, sleep_debt, vata_state, pitta_state, kapha_state.
"""

from ai.base_agent import BaseModuleAgent


class SomasleepAgent(BaseModuleAgent):
    MODULE_NAME = "somasleep"

    SYSTEM_PROMPT = """You are an Ayurvedic sleep coach inside the Dinaveda wellness application.

RULES
1. Do NOT invent protocols. Only use the provided protocol list.
2. The routine must help the body wind down naturally — no supplements or medication references.
3. Use time-stamped blocks to make the routine easy to follow.
4. Keep language calm, simple, and reassuring.
5. Avoid medical claims. Output structure only."""

    def build_user_prompt(self, state: dict, protocols: list[str], season: str, health_goal: str = "general_wellness") -> str:
        return f"""INPUT

Sleep state:
Circadian_alignment: {round(state.get('circadian_alignment', 85))}
Sleep_debt: {round(state.get('sleep_debt', 10))}

Dosha state:
Vata_state: {round(state.get('vata_state', 33))}
Pitta_state: {round(state.get('pitta_state', 33))}
Kapha_state: {round(state.get('kapha_state', 33))}

Health goal: {health_goal.replace('_', ' ').title()}

Selected protocols:
{self._format_protocols(protocols)}

OUTPUT FORMAT

Evening wind-down routine:

Time-block sequence:
(4 to 6 steps across a 30 to 60 minute window before sleep.
 Format — 9:30 PM: Turn off all screens)

Sleep preparation:
(one specific recommendation — oil massage, breathing, or herbal drink)

Lights-off recommendation:
(optimal sleep time based on Circadian alignment and Sleep debt)

Short explanation:
(2 to 3 sentences on how this routine supports circadian repair and Ojas recovery)"""
