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

@app.get("/")
def read_root():
    return {"message": "Welcome to Veda AI API"}

@app.post("/analyze")
def analyze_log(payload: DailyLogPayload):
    # This endpoint is kept alive temporarily so frontend doesn't throw 404s,
    # but the frontend no longer uses the response. It calculates Ojas locally.
    return {
        "status": "success",
        "message": "Logs received. Frontend local engine handles calculation."
    }

@app.post("/chat")
def chat_with_veda(payload: ChatPayload):
    try:
        # Route directly to the NLU extractor that strictly returns {"reply": str, "signals": []}
        result = engine.process_chat_nlu(payload.message)
        return result
    except Exception as e:
        print(f"Chat error: {e}")
        return {"reply": "I'm currently resting my neural core to process the universe's rhythms (Google AI limits reached). Please breathe deeply and share your thoughts with me in a few minutes."}

# Module Plan Enpoints REMOVED
# Module recommendations are now entirely deterministic and run locally using RecommendationEngine in the frontend.
