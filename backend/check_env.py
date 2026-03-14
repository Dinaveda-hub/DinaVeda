import os
from dotenv import load_dotenv

load_dotenv()

print("GEMINI_API_KEY exists:", bool(os.environ.get("GEMINI_API_KEY")))
