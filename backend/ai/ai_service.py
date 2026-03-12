import os

# Get the absolute path to the prompts directory
PROMPTS_DIR = os.path.join(os.path.dirname(__file__), "prompts")


def load_prompt(module_name: str) -> str:
    """Loads the specific prompt template for the given module from the filesystem."""
    file_path = os.path.join(PROMPTS_DIR, f"{module_name}_prompt.txt")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Prompt template for module '{module_name}' not found.")
    
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()

def generate_module_plan(module: str, state: dict, protocols: list, engine) -> str:
    """
    Supervisor routing:
    Selects the right prompt, formats it with state and protocols, 
    and returns the AI generated routine.
    """
    prompt_template = load_prompt(module)
    
    # Extract needed state variables, falling back to safe defaults
    vata = state.get("vata", 50)
    pitta = state.get("pitta", 50)
    kapha = state.get("kapha", 50)
    movement = state.get("movement", 50)
    stress_load = state.get("stress_load", 50)
    mental_clarity = state.get("mental_clarity", 50)
    agni = state.get("agni", 50)
    season = state.get("season", "unknown")
    circadian = state.get("circadian", 50)
    sleep = state.get("sleep", 50)
    ojas = state.get("ojas", 50)
    
    # Format the protocol list cleanly
    protocol_text = "\n".join([f"- {p}" for p in protocols])
    
    # Format prompt natively mapping variables injected into the templates
    try:
        formatted_prompt = prompt_template.format(
            vata=vata,
            pitta=pitta,
            kapha=kapha,
            movement=movement,
            stress_load=stress_load,
            mental_clarity=mental_clarity,
            agni=agni,
            season=season,
            circadian=circadian,
            sleep=sleep,
            ojas=ojas,
            protocol_list=protocol_text
        )
    except KeyError as e:
        print(f"Warning: Prompt formatting missed a key {e} in {module}")
        # Simplistic fallback format if keys mismatched (very unlikely given explicit definitions)
        formatted_prompt = prompt_template + f"\n\nContext:\nState: {state}\nProtocols: {protocol_text}"
        
    result = engine.process_chat_nlu(formatted_prompt)
    return result.get("reply", "The engine is resting. Please try again later.")
