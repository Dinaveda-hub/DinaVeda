"""
backend/ai/supervisor_agent.py

SupervisorAgent — Orchestrates module AI agents.

Responsibilities:
  1. Receive physiology state + selected protocols from the rule engine.
  2. Route to the correct module agent.
  3. Return the structured routine text.

Architecture rule:
  The supervisor NEVER modifies protocols or physiology logic.
  It only dispatches to agents and returns their output.
  AI is called EXACTLY ONCE per request.
"""

from __future__ import annotations
from ai.agents.nutriveda_agent import NutrivedaAgent
from ai.agents.ayufit_agent import AyufitAgent
from ai.agents.manasayur_agent import ManasayurAgent
from ai.agents.somasleep_agent import SomasleepAgent
from ai.agents.sattvaliving_agent import SattvalivingAgent
from ai.base_agent import BaseModuleAgent


# Allowed AI module slugs — any others will be rejected
ALLOWED_MODULES = {"nutriveda", "ayufit", "manasayur", "somasleep", "sattvaliving"}


class SupervisorAgent:
    """
    Stateless dispatcher. Instantiated once at app startup.

    Usage:
        supervisor = SupervisorAgent()
        routine = await supervisor.dispatch(
            module="nutriveda",
            state={...},
            protocols=["warm_meals", "light_dinner"],
            season="spring",
            health_goal="improve_digestion"
        )
    """

    def __init__(self) -> None:
        self._agent_map: dict[str, BaseModuleAgent] = {
            "nutriveda":    NutrivedaAgent(),
            "ayufit":       AyufitAgent(),
            "manasayur":    ManasayurAgent(),
            "somasleep":    SomasleepAgent(),
            "sattvaliving": SattvalivingAgent(),
        }

    @property
    def allowed_modules(self) -> set[str]:
        return ALLOWED_MODULES

    async def dispatch(
        self,
        module: str,
        state: dict,
        protocols: list[str],
        season: str = "spring",
        health_goal: str = "general_wellness",
    ) -> str:
        """
        Routes the request to the correct module agent.

        Raises:
            ValueError: if module is not in the allowed list.
        """
        if module not in self._agent_map:
            raise ValueError(
                f"Unknown module '{module}'. Allowed: {sorted(ALLOWED_MODULES)}"
            )

        agent = self._agent_map[module]
        return await agent.run(
            state=state,
            protocols=protocols,
            season=season,
            health_goal=health_goal,
        )
