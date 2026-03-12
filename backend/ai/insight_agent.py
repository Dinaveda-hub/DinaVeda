"""
insight_agent.py

Insight Agent: Generates causal explanations of WHY the body changed today.
Enhanced with Physiology Memory Layer — injects detected behavioral patterns
into the prompt for deeply personalized insights.
"""


def build_insight_prompt(state: dict, previous_state: dict, logs: list, patterns: list | None = None) -> str:
    """Constructs the prompt for the Insight Agent to explain physiological state changes."""

    # Calculate simple trends from previous to current state
    vata_delta = state.get("vata", 50) - previous_state.get("vata", 50)
    agni_delta = state.get("agni", 50) - previous_state.get("agni", 50)
    ojas_delta = state.get("ojas", 70) - previous_state.get("ojas", 70)
    sleep_val = state.get("sleep", 60)
    stress_val = state.get("stress", 40)

    # Format trend strings
    vata_trend = f"+{vata_delta}" if vata_delta > 0 else str(vata_delta)
    agni_trend = f"+{agni_delta}" if agni_delta > 0 else str(agni_delta)
    ojas_trend = f"+{ojas_delta}" if ojas_delta > 0 else str(ojas_delta)

    # Build pattern context block
    pattern_block = ""
    if patterns and len(patterns) > 0:
        pattern_lines = []
        for p in patterns[:5]:  # Limit to top 5 patterns
            conf = int(p.get("confidence", 0) * 100)
            occ = p.get("occurrences", 0)
            desc = p.get("description", "")
            pattern_lines.append(f"- \"{desc}\" (confidence: {conf}%, seen {occ} times)")
        pattern_block = f"""
Behavioral Memory (detected long-term patterns for this user):
{chr(10).join(pattern_lines)}

Use these patterns to personalize your explanation. If today's state change matches
a known pattern, reference it directly. This makes the insight feel deeply personal.
"""

    prompt = f"""
You are an Ayurvedic physiology interpreter for the Dinaveda health platform.
Explain the most important physiological change today based ONLY on the following data.

Current state:
Vata: {state.get('vata', 50)}
Pitta: {state.get('pitta', 50)}
Kapha: {state.get('kapha', 50)}
Agni: {state.get('agni', 50)}
Sleep: {sleep_val}
Stress: {stress_val}
Ojas: {state.get('ojas', 70)}

Trend:
Vata change: {vata_trend}
Agni change: {agni_trend}
Ojas change: {ojas_trend}
{pattern_block}
Explain the likely cause AND exactly ONE corrective lifestyle adjustment.
Limit response to exactly 3 sentences. Output raw text (no greetings or markdown headings).
"""
    return prompt


def generate_daily_insight(state: dict, previous_state: dict, logs: list, engine, patterns: list | None = None) -> str:
    """
    Insight Agent:
    Takes current physiology, past state, recent logs, and detected patterns
    to generate a causal explanation of WHY the body changed today.
    """
    # Defensive programming for initial/empty states
    if not previous_state:
        previous_state = state  # Assume no change if no previous state exists

    prompt = build_insight_prompt(state, previous_state, logs, patterns)

    result = engine.process_chat_nlu(prompt)
    return result.get("reply", "Your biological indicators remain stable today.")
