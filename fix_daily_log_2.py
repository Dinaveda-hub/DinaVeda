import re

with open('frontend/src/components/DailyLogForm.tsx', 'r') as f:
    content = f.read()

content = content.replace("ojas_score: data.ojas_score,", "ojas_score: data.ojas_score || 0,")
content = content.replace("detailed_analysis: data.ai_response || data.analysis,", "detailed_analysis: data.ai_response || data.analysis || data.message || 'Manual log entry',")

with open('frontend/src/components/DailyLogForm.tsx', 'w') as f:
    f.write(content)
print("Fixed default fallbacks in DailyLogForm.tsx")
