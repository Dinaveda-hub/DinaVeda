from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from wellness_engine import VedaEngine

app = FastAPI(title="Veda AI API")

# Setup CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = VedaEngine()


# ─────────────────────────────────────────────
# Request / Response Models
# ─────────────────────────────────────────────

class DailyLogPayload(BaseModel):
    sleep_hours: float
    sleep_quality: int  # 1-5
    lunch_before_2: bool
    dinner_before_8: bool
    light_dinner: bool
    no_fried_food: bool
    no_late_snack: bool
    wake_before_630: bool
    tongue_scraping: bool
    warm_water: bool
    abhyanga: bool
    morning_movement: bool
    vyayama_minutes: int
    mood: str

    # Advanced Bio-Markers
    agni: str = "balanced"
    ama: str = "none"
    mala: str = "clear"
    mutra: str = "normal"
    hydration: int = 2

    # Constitution
    prakriti: str = "Unknown"
    vikriti: str = "Unknown"

    # Custom User Input
    custom_note: str = ""


class ChatPayload(BaseModel):
    message: str
    prakriti: str = "Unknown"


class PhysiologyRequest(BaseModel):
    """
    POST /state or POST /protocols

    Engine pipeline:
    User signals → Deterministic state computation → Protocol selection → AI personalization (premium)

    signals: list of user-reported signal strings (e.g. 'poor_sleep', 'high_stress')
    """
    signals: list[str] = []


# ─────────────────────────────────────────────
# Endpoints
# ─────────────────────────────────────────────

@app.get("/")
def read_root():
    return {"message": "Welcome to Veda AI API"}


@app.post("/analyze")
def analyze_log(payload: DailyLogPayload):
    # This endpoint is kept alive so the frontend doesn't throw 404s.
    # The frontend calculates Ojas locally via its own rule engine.
    return {
        "status": "success",
        "message": "Logs received. Frontend local engine handles calculation."
    }


@app.post("/chat")
def chat_with_veda(payload: ChatPayload):
    try:
        result = engine.process_chat_nlu(payload.message)
        return result
    except Exception as e:
        print(f"Chat error: {e}")
        return {
            "reply": "I'm currently resting my neural core to process the universe's rhythms. Please breathe deeply and share your thoughts in a few minutes.",
            "signals": []
        }


@app.get("/state")
def get_default_state():
    """
    Returns the default physiology state (no signals applied).

    Architecture note:
    This is a pure deterministic endpoint. AI is NOT involved.
    The engine determines the state; the AI personalization layer (in the frontend
    premium modules) only converts selected protocols into structured routines.
    """
    state = engine.get_physiology_state(signals=[])
    return {
        "state": state,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "engine": "deterministic",
    }


@app.post("/protocols")
def get_protocols(payload: PhysiologyRequest):
    """
    Deterministic pipeline: signals → physiology state → selected protocols.

    1. Applies user signals to compute updated physiology state.
    2. Evaluates threshold rules to select protocols.
    3. Returns both the computed state and the selected protocol names.

    AI is NOT involved here. This is the rule engine output.
    The AI personalization layer (premium frontend) converts these protocols
    into human-readable routines when the user opens a module.
    """
    state = engine.get_physiology_state(signals=payload.signals)
    selected_protocols = engine.select_protocols(state)

    return {
        "state": state,
        "protocols": selected_protocols,
        "protocol_count": len(selected_protocols),
        "signals_applied": payload.signals,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "engine": "deterministic",
    }
