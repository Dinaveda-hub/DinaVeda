def _analyze_agni(state: dict) -> dict:
    agni = state.get('agni', 50)
    result = {
        "agni_state": "balanced",
        "agni_score": agni,
        "agni_signals": [],
        "agni_affected_systems": []
    }

    if agni < 40:
        result["agni_state"] = "manda agni"
        result["agni_affected_systems"].append("digestion (manda agni)")
        result["agni_signals"].extend(["heavy meals", "sedentary routine", "kapha excess"])
    elif agni > 75:
        result["agni_state"] = "tikshna agni"
        result["agni_affected_systems"].append("digestion (tikshna agni)")
        result["agni_signals"].extend(["spicy food", "high stress", "pitta excess"])

    return result

def _analyze_dosha(state: dict) -> dict:
    vata = state.get('vata', 50)
    pitta = state.get('pitta', 50)
    kapha = state.get('kapha', 50)
    
    highest_dosha = max(vata, pitta, kapha)
    if highest_dosha == vata:
        dominant = "Vata"
    elif highest_dosha == pitta:
        dominant = "Pitta"
    else:
        dominant = "Kapha"

    result = {
        "dominant_dosha": dominant,
        "aggravated_dosha": None,
        "dosha_severity": "low",
        "dosha_signals": [],
        "dosha_affected_systems": []
    }

    if highest_dosha > 70:
        result["aggravated_dosha"] = dominant
        result["dosha_severity"] = "moderate" if highest_dosha < 85 else "high"

        if dominant == "Vata":
            result["dosha_affected_systems"].append("nervous system")
            result["dosha_signals"].append("irregular routine or sleep debt")
        elif dominant == "Pitta":
            result["dosha_affected_systems"].append("metabolism and skin")
            result["dosha_signals"].append("excess heat or intensity")
        else:
            result["dosha_affected_systems"].append("respiratory and lymphatic")
            result["dosha_signals"].append("stagnation or over-nourishment")

    return result

def _analyze_modern_vectors(state: dict) -> dict:
    sleep_debt = state.get('sleep_debt', 50)
    stress_load = state.get('stress_load', 50)

    result = {
        "sleep_debt": sleep_debt,
        "stress_load": stress_load,
        "modern_risk_score": max(sleep_debt, stress_load),
        "modern_risk_signals": [],
        "modern_affected_systems": []
    }

    if sleep_debt > 60:
        result["modern_risk_signals"].append("significant sleep deprivation")
        result["modern_affected_systems"].append("nervous system")
            
    if stress_load > 60:
        result["modern_risk_signals"].append("high cognitive or emotional stress")
        
    return result

def generate_reasoning_context(state: dict) -> dict:
    """
    Converts raw physiological metrics into a structured Ayurvedic interpretation.
    This gives the LLM deterministic clinical grounding.
    """
    agni_data = _analyze_agni(state)
    dosha_data = _analyze_dosha(state)
    modern_data = _analyze_modern_vectors(state)

    context = {
        # Core structured components for internal logic and testing
        **agni_data,
        **dosha_data,
        **modern_data,

        # Legacy mappings for external callers expecting these specific keys
        "primary_imbalance": f"{dosha_data['aggravated_dosha']} aggravation" if dosha_data['aggravated_dosha'] else "Balanced",
        "likely_causes": agni_data['agni_signals'] + dosha_data['dosha_signals'] + modern_data['modern_risk_signals'],
        "affected_systems": list(dict.fromkeys(agni_data['agni_affected_systems'] + dosha_data['dosha_affected_systems'] + modern_data['modern_affected_systems'])),
        "severity": dosha_data['dosha_severity']
    }

    return context
