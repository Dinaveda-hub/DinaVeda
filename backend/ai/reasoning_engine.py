def generate_reasoning_context(state: dict) -> dict:
    """
    Converts raw physiological metrics into a structured Ayurvedic interpretation.
    This gives the LLM deterministic clinical grounding.
    """
    context = {
        "primary_imbalance": "Balanced",
        "likely_causes": [],
        "affected_systems": [],
        "severity": "low"
    }

    # 1. Agni (Digestive Fire) Analysis
    agni = state.get('agni', 50)
    if agni < 40:
        context["affected_systems"].append("digestion (manda agni)")
        context["likely_causes"].extend(["heavy meals", "sedentary routine", "kapha excess"])
    elif agni > 75:
        context["affected_systems"].append("digestion (tikshna agni)")
        context["likely_causes"].extend(["spicy food", "high stress", "pitta excess"])

    # 2. Dosha Dominance & Aggravation
    vata = state.get('vata', 50)
    pitta = state.get('pitta', 50)
    kapha = state.get('kapha', 50)
    
    highest_dosha = max(vata, pitta, kapha)
    if highest_dosha > 70:
        if vata == highest_dosha:
            context["primary_imbalance"] = "Vata aggravation"
            context["affected_systems"].append("nervous system")
            context["likely_causes"].append("irregular routine or sleep debt")
        elif pitta == highest_dosha:
            context["primary_imbalance"] = "Pitta aggravation"
            context["affected_systems"].append("metabolism and skin")
            context["likely_causes"].append("excess heat or intensity")
        else:
            context["primary_imbalance"] = "Kapha aggravation"
            context["affected_systems"].append("respiratory and lymphatic")
            context["likely_causes"].append("stagnation or over-nourishment")
            
        context["severity"] = "moderate" if highest_dosha < 85 else "high"

    # 3. Modern Vectors (Sleep & Stress)
    sleep_debt = state.get('sleep_debt', 50)
    if sleep_debt > 60:
        context["likely_causes"].append("significant sleep deprivation")
        if "nervous system" not in context["affected_systems"]:
            context["affected_systems"].append("nervous system")
            
    stress_load = state.get('stress_load', 50)
    if stress_load > 60:
        context["likely_causes"].append("high cognitive or emotional stress")
        
    return context
