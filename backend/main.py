import os
import sys
from pathlib import Path
from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv

# Ensure the backend directory is in the path for Vercel
sys.path.append(str(Path(__file__).parent))

from wellness_engine import VedaEngine
from ai.ai_service import generate_module_plan
from ai.insight_agent import generate_daily_insight
from billing.routes import router as billing_router
from billing.subscription_guard import require_premium
from analysis.pattern_routes import router as pattern_router
from analysis.pattern_engine import get_user_patterns
from ml.ml_service import predict_prakriti
from fastapi import Depends

load_dotenv()

app = FastAPI(title="Veda AI API")

# Initialize Supabase client
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

if supabase_url and supabase_key:
    supabase: Client = create_client(supabase_url, supabase_key)
else:
    supabase = None
    print("Warning: Supabase environment variables are missing!")

# Setup CORS for the Next.js frontend
origins_str = os.getenv("CORS_ALLOWED_ORIGINS", "")
origins = [o.strip() for o in origins_str.split(",")] if origins_str else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = VedaEngine()

app.include_router(billing_router, prefix="/api/billing", tags=["billing"])
app.include_router(pattern_router, prefix="/api", tags=["patterns"])


# ─────────────────────────────────────────────
# Request / Response Models
# ─────────────────────────────────────────────

class DailyLogPayload(BaseModel):
    # Morning
    sleep_quality: str = "Deep and refreshing"
    sleep_quality_score: Optional[int] = None
    sleep_hours: float = 7.5
    wake_time: str = "Around sunrise"
    wake_time_score: Optional[int] = None
    ama: str = "Clean pink"
    ama_score: Optional[int] = None
    mala: str = "Regular and comfortable"
    mala_score: Optional[int] = None
    agni: str = "Normal hunger"
    agni_score: Optional[int] = None
    energy_level: str = "Moderate energy"
    energy_score: Optional[int] = None
    mood: str = "Normal"
    mood_score: Optional[int] = None

    # Evening
    meal_timing: str = "Regular timing"
    meal_timing_score: Optional[int] = None
    digestion_quality: str = "Light and comfortable"
    digestion_score: Optional[int] = None
    physical_activity: str = "Moderately active"
    physical_activity_score: Optional[int] = None
    hydration: str = "Well hydrated"
    hydration_score: Optional[int] = None
    screen_time: str = "Moderate"
    screen_score: Optional[int] = None
    stress_level: str = "Normal day"
    stress_score: Optional[int] = None
    wind_down_routine: str = "Relaxing routine"
    wind_down_score: Optional[int] = None
    evening_mood: str = "Neutral/Steady"
    evening_mood_score: Optional[int] = None
    
    # Context & Baseline
    user_id: str
    logged_at: str = ""
    weekday: int = 0
    season: str = ""
    
    # Prakriti
    prakriti_vata: float = 0.0
    prakriti_pitta: float = 0.0
    prakriti_kapha: float = 0.0

    # Protocol Feedback Mapping
    recommended_protocol: Optional[str] = None
    protocol_followed: Optional[bool] = None
    effect_score: Optional[int] = None
    
    # Logic-critical binary signals
    tongue_scraping: bool = True
    warm_water: bool = True
    abhyanga: bool = False
    nasya: bool = False
    oil_pulling: bool = False
    meditation: bool = False
    pranayama: bool = False
    
    # Constitution
    prakriti: str = "Unknown"
    prakriti_vata: float = 0.0
    prakriti_pitta: float = 0.0
    prakriti_kapha: float = 0.0
    
    user_id: str
    items: list[str] = []
    custom_note: str = ""
    logged_at: str = ""
    weekday: int = 0
    season: str = ""

class ProtocolExplanationRequest(BaseModel):
    protocol: str
    state: dict
    
class HealthInsightRequest(BaseModel):
    state: dict
    
class PhysiologyRequest(BaseModel):
    """
    POST /state or POST /protocols
    signals: list of user-reported signal strings
    """
    signals: list[str] = []


class PersonalizeRequest(BaseModel):
    module: str
    state: dict
    protocols: list[str]
    season: str = "spring"
    health_goal: str = "general_wellness"
    is_premium: bool = False


class ChatPayload(BaseModel):
    message: str
    context: dict = {} # User's current physiological state
    prakriti: str = "Unknown"


class NotifyRequest(BaseModel):
    userId: str
    message: str

class PrakritiRequest(BaseModel):
    features: dict


# ─────────────────────────────────────────────
# Endpoints
# ─────────────────────────────────────────────

@app.get("/")
@app.get("/api")
def read_root():
    return {"message": "Welcome to Veda AI API", "status": "online"}


@app.post("/api/analyze")
def analyze_log(payload: DailyLogPayload):
    # This endpoint is kept alive so the frontend doesn't throw 404s.
    # The frontend calculates Ojas locally via its own rule engine.
    return {
        "status": "success",
        "message": "Logs received. Frontend local engine handles calculation."
    }


@app.post("/api/chat")
def chat_with_veda(payload: ChatPayload):
    try:
        # 1. Provide structured reasoning context for better grounding
        user_state_context = payload.context or {}
        reasoning = generate_reasoning_context(user_state_context)
        
        system_injection = f"""
You are an Ayurvedic health reasoning system, functioning as a deterministic clinical guide.
Never output vague pleasantries. Base answers strictly on these physiological metrics:
- Agni: {user_state_context.get('agni', 'Unknown')}
- Vata: {user_state_context.get('vata', 'Unknown')}
- Pitta: {user_state_context.get('pitta', 'Unknown')}
- Kapha: {user_state_context.get('kapha', 'Unknown')}

The analytical engine observes this primary imbalance: {reasoning.get("primary_imbalance")}
Likely causing vectors: {", ".join(reasoning.get("likely_causes", ["Unknown"]))}.

You MUST structure your response with these exact markdown headings, providing ONE sentence per section:
Observed Signals
Physiological Interpretation
Dosha Impact
Correction

Avoid diagnosing disease. Answer the user query: "{payload.message}"
"""
        
        # 2. Call existing LLM through engine
        result = engine.process_chat_nlu(system_injection)
        
        # 3. Validate structural safety
        if not validate_clinical_response(result.get("reply", "")):
             result["reply"] = format_fallback_response(user_state_context)
             
        return result
    except Exception as e:
        print(f"Chat error: {e}")
        return {
            "reply": format_fallback_response(payload.context or {}),
            "signals": []
        }

@app.post("/ai/protocol-explanation")
def get_protocol_explanation(payload: ProtocolExplanationRequest, user_id: str = Depends(require_premium)):
    """Premium-tier feature: Clinically explains why a recommended protocol was selected."""
    reasoning = generate_reasoning_context(payload.state)
    
    prompt = f"""
You are the Dinaveda Ayurvedic clinical reasoning system.
Explain why the protocol "{payload.protocol.replace('_', ' ')}" is recommended for a user with:
- Primary Imbalance: {reasoning.get("primary_imbalance")}
- Agni Level: {payload.state.get('agni', 'Unknown')}
- Likely systemic causes: {", ".join(reasoning.get("likely_causes", []))}

Explain in simple language. Focus on cause -> effect -> correction. Limit response to exactly 4 sentences.
Do NOT use markdown headers, just return exactly four clean, clinical sentences.
"""
    result = engine.process_chat_nlu(prompt)
    return {"explanation_text": result.get("reply", "")}

@app.post("/ai/health-insight")
def get_daily_insight(payload: HealthInsightRequest, user_id: str = Depends(require_premium)):
    """Premium-tier feature: Scans biological state to determine highest priority systemic risk."""
    reasoning = generate_reasoning_context(payload.state)
    
    # Fetch user's detected behavioral patterns for personalized insight
    user_patterns = []
    try:
        user_patterns = get_user_patterns(user_id)
    except Exception:
        pass  # Graceful degradation — insights work without patterns
    
    insight_text = generate_daily_insight(
        state=payload.state,
        previous_state={},
        logs=[],
        engine=engine,
        patterns=user_patterns
    )
    
    return {"insight": insight_text}


@app.get("/api/state")
def get_default_state():
    """
    Returns the default physiology state (no signals applied).
    Purely deterministic.
    """
    state = engine.get_physiology_state(signals=[])
    return {
        "state": state,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "engine": "deterministic",
    }


from ml.protocol_learning.predict_protocol_effect import rank_protocols

@app.post("/api/protocols")
def get_protocols(payload: PhysiologyRequest):
    """
    Hybrid pipeline: 
    1. Deterministic signals → physiology state → candidates.
    2. ML Protocol Ranking → final ranked list.
    """
    state = engine.get_physiology_state(signals=payload.signals)
    candidate_protocols = engine.select_protocols(state)
    
    # Map state to ML features expected by rank_protocols
    # Default 0-3 scores for ML if not provided in request (fallback to 1 for neutral)
    ml_state = {
        'prakriti_vata': 0.33, # Default placeholders if not in session
        'prakriti_pitta': 0.33,
        'prakriti_kapha': 0.34,
        'stress_score': 2 if state['vata'] > 60 else 1,
        'agni_score': 1 if state['agni'] < 40 else 2,
        'sleep_quality_score': 1 if state['ojas'] < 40 else 2,
        # ... other scores mapped from state axes
    }
    
    # Enrich with scores from payload if available (assuming front-end might send them later)
    # For now, we use the derived biological state to drive ML ranking
    
    ranked_results = rank_protocols(ml_state, candidate_protocols)
    # Extract just the protocol names for the response
    final_protocols = [r[0] for r in ranked_results]

    return {
        "state": state,
        "protocols": final_protocols,
        "protocol_count": len(final_protocols),
        "engine": "hybrid_ml"
    }


@app.post("/api/personalize")
async def personalize_module(payload: PersonalizeRequest, user_id: str = Depends(require_premium)):
    """
    AI Personalization — Orchestrated by the Prompt Router supervisor.
    """
    try:
        content = generate_module_plan(
            module=payload.module,
            state=payload.state,
            protocols=payload.protocols,
            engine=engine
        )
        return {
            "content": content,
            "module": payload.module,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Personalization error: {e}")
        raise HTTPException(status_code=502, detail="AI personalization failed.")


@app.post("/api/notify")
async def send_notification_endpoint(payload: NotifyRequest):
    """
    Relay notification request to OneSignal.
    """
    import httpx
    onesignal_app_id = os.environ.get("ONESIGNAL_APP_ID")
    onesignal_key = os.environ.get("ONESIGNAL_REST_API_KEY")

    if not onesignal_key or not onesignal_app_id:
        print("Missing OneSignal credentials")
        raise HTTPException(status_code=500, detail="OneSignal configuration missing")

    url = "https://onesignal.com/api/v1/notifications"
    headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": f"Basic {onesignal_key}"
    }
    body = {
        "app_id": onesignal_app_id,
        "include_external_user_ids": [payload.userId],
        "contents": {"en": payload.message}
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, json=body, headers=headers)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            print(f"OneSignal error: {e.response.text}")
            raise HTTPException(status_code=e.response.status_code, detail="Notification relay failed")
        except Exception as e:
            print(f"Notification relay error: {e}")
            raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/prakriti")
async def get_prakriti_prediction(payload: PrakritiRequest):
    """
    ML-powered Prakriti prediction endpoint.
    Takes questionnaire answers and returns probability distribution.
    """
    try:
        probabilities = predict_prakriti(payload.features)
        return {
            "probabilities": probabilities
        }
    except Exception as e:
        print(f"Prakriti prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
