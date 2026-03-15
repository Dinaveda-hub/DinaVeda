from typing import List, Dict

# Thresholds and specific suggestions for risk events
RISK_CONFIG = {
    "vata_spike": {
        "threshold": 0.65,
        "message": "Vata spike risk detected.",
        "suggestion": "Suggested protocol: Abhyanga tonight.",
        "icon": "wind"
    },
    "agni_collapse": {
        "threshold": 0.60,
        "message": "Metabolic fire (Agni) weakness predicted.",
        "suggestion": "Suggested protocol: Ginger tea before next meal.",
        "icon": "flame"
    },
    "sleep_disruption": {
        "threshold": 0.55,
        "message": "Sleep instability likely tonight.",
        "suggestion": "Suggested protocol: Digital detox 1 hour before bed.",
        "icon": "moon"
    }
}

def generate_risk_alerts(probabilities: Dict[str, float]) -> List[Dict]:
    """
    Evaluates probabilities against thresholds and generates actionable alerts.
    
    Args:
        probabilities (dict): Probabilities from predict_risk service.
        
    Returns:
        list: List of active alert dictionaries.
    """
    alerts = []
    
    for risk_key, prob in probabilities.items():
        config = RISK_CONFIG.get(risk_key)
        if not config:
            continue
            
        if prob >= config["threshold"]:
            alerts.append({
                "type": risk_key,
                "probability": prob,
                "message": config["message"],
                "suggestion": config["suggestion"],
                "severity": "high" if prob > 0.8 else "moderate",
                "icon": config["icon"]
            })
            
    # Sort alerts by probability (most urgent first)
    alerts.sort(key=lambda x: x["probability"], reverse=True)
    
    return alerts
