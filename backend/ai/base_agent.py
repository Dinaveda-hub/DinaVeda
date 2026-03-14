"""
backend/ai/base_agent.py

BaseModuleAgent — shared abstract base for all 5 Dinaveda module agents.

Each module agent:
  - Defines its own SYSTEM_PROMPT (role + rules)
  - Implements build_user_prompt() using only its relevant state fields
  - Inherits run() which calls Gemini with fallback and returns plain text

Architecture rule:
  Protocols are passed READ-ONLY. Agents format them into routines only.
  Agents NEVER add, remove, or change protocol names.
"""

from __future__ import annotations
import os

# Gemini model fallback — fastest first
GEMINI_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"]
GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models"

class BaseModuleAgent:
    """
    Abstract base class for Dinaveda module AI agents.

    Subclasses must define:
        MODULE_NAME  (str)       — e.g. 'nutriveda'
        SYSTEM_PROMPT (str)      — role + rules block sent as Gemini system_instruction
        build_user_prompt()      — builds INPUT + OUTPUT FORMAT from state + protocols
    """

    MODULE_NAME: str = "base"
    SYSTEM_PROMPT: str = "You are an Ayurvedic wellness coach."

    # ─────────────────────────────────────────────
    # Protocol formatting helper
    # ─────────────────────────────────────────────

    def _format_protocols(self, protocols: list[str]) -> str:
        return "\n".join(f"• {p.replace('_', ' ')}" for p in protocols)

    # ─────────────────────────────────────────────
    # User prompt construction (override in subclass)
    # ─────────────────────────────────────────────

    def build_user_prompt(
        self,
        state: dict,
        protocols: list[str],
        season: str,
        health_goal: str = "general_wellness",
    ) -> str:
        """
        Builds the interpolated INPUT + OUTPUT FORMAT block.
        Subclasses override this to use only their relevant state fields.
        """
        return (
            f"Selected protocols:\n{self._format_protocols(protocols)}\n\n"
            f"Season: {season}\n"
            f"Health goal: {health_goal.replace('_', ' ').title()}\n\n"
            "Generate a personalized routine based on the above protocols."
        )

    # ─────────────────────────────────────────────
    # Deterministic fallback — when AI quota exhausted
    # ─────────────────────────────────────────────

    def _fallback_routine(self, protocols: list[str]) -> str:
        lines = [
            f"Today's {self.MODULE_NAME.title()} Protocol",
            "",
            "Based on your physiology state, focus on:",
        ]
        for p in protocols:
            lines.append(f"  • {p.replace('_', ' ').title()}")
        lines += [
            "",
            "Follow these protocols consistently for best results.",
            "Personalised AI routine will be available when service recovers.",
        ]
        return "\n".join(lines)

    # ─────────────────────────────────────────────
    # Gemini call with model fallback
    # ─────────────────────────────────────────────

    async def _call_gemini(self, user_prompt: str) -> str | None:
        import httpx

        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return None

        body = {
            "contents": [{"parts": [{"text": user_prompt}]}],
            "system_instruction": {"parts": [{"text": self.SYSTEM_PROMPT}]},
            "generationConfig": {
                "temperature": 0.4,
                "maxOutputTokens": 900,
            },
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            for model in GEMINI_MODELS:
                try:
                    resp = await client.post(
                        f"{GEMINI_BASE}/{model}:generateContent?key={api_key}",
                        json=body,
                    )
                    if resp.status_code in (429, 500, 502, 503):
                        continue  # Try next model
                    if resp.status_code == 200:
                        data = resp.json()
                        return data["candidates"][0]["content"]["parts"][0]["text"]
                except Exception as e:
                    print(f"[{self.MODULE_NAME}] Model {model} error: {e}")
                    continue

        return None

    # ─────────────────────────────────────────────
    # Main entry point
    # ─────────────────────────────────────────────

    async def run(
        self,
        state: dict,
        protocols: list[str],
        season: str,
        health_goal: str = "general_wellness",
    ) -> str:
        """
        Generates a personalized routine from the provided protocols.
        Falls back to a deterministic summary if AI is unavailable.
        """
        user_prompt = self.build_user_prompt(state, protocols, season, health_goal)
        result = await self._call_gemini(user_prompt)
        if result:
            return result.strip()
        return self._fallback_routine(protocols)
