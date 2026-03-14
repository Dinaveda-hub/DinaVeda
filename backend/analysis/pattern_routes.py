"""
pattern_routes.py

FastAPI router for the Physiology Memory Layer.
- GET  /api/patterns/{user_id}   — Fetch user's detected patterns
- POST /api/patterns/analyze     — Trigger pattern analysis for a user
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from analysis.pattern_engine import analyze_patterns, get_user_patterns
from billing.subscription_guard import get_user_id

router = APIRouter()


class AnalyzeRequest(BaseModel):
    user_id: str


@router.get("/patterns/{user_id}")
def fetch_patterns(user_id: str, auth_user: str = Depends(get_user_id)):
    """Returns all detected physiological patterns for a user."""
    if user_id != auth_user:
        raise HTTPException(status_code=403, detail="Forbidden")

    try:
        patterns = get_user_patterns(user_id)
        return {
            "patterns": patterns,
            "count": len(patterns),
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Pattern fetch error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch patterns")


@router.post("/patterns/analyze")
def trigger_analysis(payload: AnalyzeRequest, auth_user: str = Depends(get_user_id)):
    """
    Triggers pattern detection for a user.
    Analyzes last 30 days of pulse_logs and upserts detected patterns.
    """
    if payload.user_id != auth_user:
        raise HTTPException(status_code=403, detail="Forbidden")

    try:
        detected = analyze_patterns(payload.user_id)
        return {
            "detected": detected,
            "count": len(detected),
            "message": f"Analyzed patterns. {len(detected)} behavioral correlations found.",
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Pattern analysis error: {e}")
        raise HTTPException(status_code=500, detail="Pattern analysis failed")
