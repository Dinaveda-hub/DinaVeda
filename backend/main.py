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
    # 1. Calculate the deterministic Ojas score
    ojas_result = engine.calculate_ojas(payload.dict())
    
    # 2. Generate the AI Pathya Plan using Gemini
    pathya_plan = engine.generate_pathya_plan(ojas_result)
    
    # 3. Return the combined response
    return {
        "ojas_score": ojas_result["total_score"],
        "breakdown": ojas_result["breakdown"],
        "ritu_info": ojas_result["ritu_info"],
        "pathya_plan": pathya_plan
    }

@app.post("/chat")
def chat_with_veda(payload: ChatPayload):
    prompt = f"""
    The user's Ayurvedic Constitution (Prakriti) is {payload.prakriti}.
    User message: "{payload.message}"
    
    Reply as "Veda", a supportive Ayurvedic wellness companion.
    Keep your response EXTREMELY concise (Maximum 1 short sentence). Be empathetic and grounded in Ayurveda but do not overwhelm the user with jargon. Do not use markdown. Act naturally.
    """
    try:
        response = engine.generate_with_fallback(prompt)
        return {"reply": response.text.strip()}
    except Exception as e:
        print(f"Chat error: {e}")
        return {"reply": "I'm currently resting my neural core to process the universe's rhythms (Google AI limits reached). Please breathe deeply and share your thoughts with me in a few minutes."}

class ModulePlanPayload(BaseModel):
    module_slug: str
    prakriti: str = "Unknown"
    vikriti: str = "Unknown"
    custom_note: str = ""

@app.post("/module-plan")
def generate_module_plan(payload: ModulePlanPayload):
    ritu_info = engine.get_current_ritu()
    season_name = ritu_info.get("name", "Unknown Season")
    
    plan = engine.generate_module_plan(
        module_slug=payload.module_slug,
        prakriti=payload.prakriti,
        vikriti=payload.vikriti,
        custom_note=payload.custom_note,
        current_season=season_name
    )
    return plan
