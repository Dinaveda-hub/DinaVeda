from fastapi.testclient import TestClient
from unittest.mock import patch
from main import app

client = TestClient(app)

@patch("analysis.pattern_routes.analyze_patterns")
def test_patterns_analyze_exception(mock_analyze):
    mock_analyze.side_effect = Exception("analysis failed")

    response = client.post(
        "/api/patterns/analyze",
        json={"user_id": "123"}
    )

    assert response.status_code == 500
    mock_analyze.assert_called_once_with("123")

@patch("analysis.pattern_routes.analyze_patterns")
def test_patterns_analyze_success(mock_analyze):
    mock_analyze.return_value = ["Pattern A", "Pattern B"]

    response = client.post(
        "/api/patterns/analyze",
        json={"user_id": "123"}
    )

    assert response.status_code == 200
    assert response.json()["count"] == 2
    mock_analyze.assert_called_once_with("123")
