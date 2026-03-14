import re

with open('backend/main.py', 'r') as f:
    content = f.read()

# Replace incorrect imports added earlier
content = content.replace("from utils.clinical_formatter import validate_clinical_response, format_fallback_response", "from ai.response_validator import validate_clinical_response, format_fallback_response")
content = content.replace("from utils.reasoning_engine import generate_reasoning_context", "from ai.reasoning_engine import generate_reasoning_context")

with open('backend/main.py', 'w') as f:
    f.write(content)
print("Fixed import paths")
