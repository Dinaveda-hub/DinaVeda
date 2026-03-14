from fastapi.testclient import TestClient
from unittest.mock import patch
from main import app

client = TestClient(app)

@patch("analysis.pattern_routes.get_user_patterns")
def test_fetch_patterns_success(mock_get_user_patterns):
    # Mocking a successful return of patterns
    mock_get_user_patterns.return_value = [
        {"type": "sleep_deprivation", "score": 0.8}
    ]

    response = client.get("/api/patterns/123")

    assert response.status_code == 200
    data = response.json()
    assert "patterns" in data
    assert data["patterns"] == [{"type": "sleep_deprivation", "score": 0.8}]
    assert data["count"] == 1

    mock_get_user_patterns.assert_called_once_with("123")

@patch("analysis.pattern_routes.get_user_patterns")
def test_fetch_patterns_empty(mock_get_user_patterns):
    # Mocking an empty return of patterns
    mock_get_user_patterns.return_value = []

    response = client.get("/api/patterns/123")

    assert response.status_code == 200
    data = response.json()
    assert "patterns" in data
    assert data["patterns"] == []
    assert data["count"] == 0

    mock_get_user_patterns.assert_called_once_with("123")

@patch("analysis.pattern_routes.get_user_patterns")
def test_fetch_patterns_exception(mock_get_user_patterns):
    # Mocking an exception
    mock_get_user_patterns.side_effect = Exception("Database error")

    response = client.get("/api/patterns/123")

    assert response.status_code == 500
    assert response.json() == {"detail": "Failed to fetch patterns"}

    mock_get_user_patterns.assert_called_once_with("123")

@patch("analysis.pattern_routes.analyze_patterns")
def test_trigger_analysis_success(mock_analyze_patterns):
    # Mocking successful analysis
    mock_analyze_patterns.return_value = ["sleep_deprivation", "high_stress"]

    payload = {"user_id": "123"}
    response = client.post("/api/patterns/analyze", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert "detected" in data
    assert data["detected"] == ["sleep_deprivation", "high_stress"]
    assert data["count"] == 2
    assert "message" in data

    mock_analyze_patterns.assert_called_once_with("123")

def test_trigger_analysis_invalid_input():
    # Sending missing user_id
    payload = {}
    response = client.post("/api/patterns/analyze", json=payload)

    # FastAPI returns 422 Unprocessable Entity for missing required fields
    assert response.status_code == 422
    data = response.json()
    assert "detail" in data

@patch("analysis.pattern_routes.analyze_patterns")
def test_trigger_analysis_exception(mock_analyze_patterns):
    # Mocking an exception during analysis
    mock_analyze_patterns.side_effect = Exception("Analysis failed internally")

    payload = {"user_id": "123"}
    response = client.post("/api/patterns/analyze", json=payload)

    assert response.status_code == 500
    assert response.json() == {"detail": "Pattern analysis failed"}

    mock_analyze_patterns.assert_called_once_with("123")
