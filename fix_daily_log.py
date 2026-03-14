import re

with open('frontend/src/components/DailyLogForm.tsx', 'r') as f:
    content = f.read()

# Make it gracefully handle missing properties like `ojas_score` from `data`
# since the backend just returns:
# {"status": "success", "message": "Logs received. Frontend local engine handles calculation."}

replacement = """                    user_id: session.user.id,
                    ojas_score: data.ojas_score || 0,
                    sleep_hours: form.sleepHours,
                    sleep: form.sleepQuality,
                    mood: form.mood,
                    agni: form.agniStatus,
                    ama: form.amaStatus,
                    movement: form.movement,
                    routines: form.routines,
                    detailed_analysis: data.ai_response || data.analysis || data.message || "Manual log entry.",
                    mala: form.bowelStatus,
                    mutra: form.micturitionStatus,
                    hydration: form.hydration,
                    custom_note: form.customNote,"""

content = re.sub(
    r'                    user_id: session.user.id,\n                    ojas_score: data.ojas_score,\n                    sleep_hours: form.sleepHours,\n                    sleep: form.sleepQuality,\n                    mood: form.mood,\n                    agni: form.agniStatus,\n                    ama: form.amaStatus,\n                    movement: form.movement,\n                    routines: form.routines,\n                    detailed_analysis: data.ai_response \|\| data.analysis,\n                    mala: form.bowelStatus,\n                    mutra: form.micturitionStatus,\n                    hydration: form.hydration,\n                    custom_note: form.customNote,',
    replacement,
    content,
    flags=re.MULTILINE
)

with open('frontend/src/components/DailyLogForm.tsx', 'w') as f:
    f.write(content)
