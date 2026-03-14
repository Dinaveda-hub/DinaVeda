import re

with open('backend/main.py', 'r') as f:
    content = f.read()

# Add missing imports that might be causing /api/chat to fail
missing_imports = """
from utils.clinical_formatter import validate_clinical_response, format_fallback_response
from utils.reasoning_engine import generate_reasoning_context
"""

if "generate_reasoning_context" not in content[:1000]:
    content = content.replace("from wellness_engine import VedaEngine", missing_imports.strip() + "\nfrom wellness_engine import VedaEngine")
    with open('backend/main.py', 'w') as f:
        f.write(content)
    print("Added missing imports to backend/main.py")
else:
    print("Imports already present")
