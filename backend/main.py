import os
from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from wellness_engine import VedaEngine
from ai.supervisor_agent import SupervisorAgent
from supabase import create_client, Client
from dotenv import load_dotenv

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
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = VedaEngine()
supervisor = SupervisorAgent()


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
    signals: list of user-reported signal strings
    """
    signals: list[str] = []


class PersonalizeRequest(BaseModel):
    """
    POST /personalize
    Body: {
      "module": "nutriveda",
      "state": { ...26 variables... },
      "protocols": ["warm_meals", "light_dinner"],
      "season": "spring",
      "health_goal": "improve_digestion",
      "is_premium": true
    }
    """
    module: str
    state: dict
    protocols: list[str]
    season: str = "spring"
    health_goal: str = "general_wellness"
    is_premium: bool = False


# ─────────────────────────────────────────────
# Endpoints
# ─────────────────────────────────────────────

@app.get("/api")
def read_root():
    return {"message": "Welcome to Veda AI API"}


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
        result = engine.process_chat_nlu(payload.message)
        return result
    except Exception as e:
        print(f"Chat error: {e}")
        return {
            "reply": "I'm currently resting my neural core to process the universe's rhythms. Please breathe deeply and share your thoughts in a few minutes.",
            "signals": []
        }


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


@app.post("/api/protocols")
def get_protocols(payload: PhysiologyRequest):
    """
    Deterministic pipeline: signals → physiology state → selected protocols.
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


@app.post("/api/personalize")
async def personalize_module(payload: PersonalizeRequest):
    """
    AI Personalization — Orchestrated by SupervisorAgent.
    Now available to all users.
    """
    # 2. Dispatch to supervisor
    try:
        content = await supervisor.dispatch(
            module=payload.module,
            state=payload.state,
            protocols=payload.protocols,
            season=payload.season,
            health_goal=payload.health_goal
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
