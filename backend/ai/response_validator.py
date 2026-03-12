import re

def validate_clinical_response(text: str) -> bool:
    """
    Validates that the AI response contains the required structural headings
    to maintain a consistent, clinical, and trustworthy UX.
    """
    required_sections = [
        r"Observed Signals",
        r"Physiological Interpretation",
        r"Dosha Impact",
        r"Correction"
    ]
    
    for section in required_sections:
        if not re.search(section, text, re.IGNORECASE):
            return False
            
    return True
    
def format_fallback_response(state: dict) -> str:
    """Provides a safe, deterministic fallback if the LLM output fails validation."""
    return f"""
Observed Signals
The system detects a current Agni level of {state.get('agni', 50)} and Vata level of {state.get('vata', 50)}.

Physiological Interpretation
These metrics suggest a need for grounding and metabolic stabilization.

Dosha Impact
When Vata fluctuates, it can lead to irregular digestion and mild systemic instability.

Correction
Focus on consistent meal timing, warm cooked foods, and prioritizing early sleep to restore balance.
"""
