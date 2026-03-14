import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from main import app
from billing.subscription_guard import get_user_id

client = TestClient(app)

@patch("analysis.pattern_routes.get_user_patterns")
def test_patterns_authorized(mock_get_patterns):
    # Test 1 - Authorized Access
    app.dependency_overrides[get_user_id] = lambda: "user_a"
    mock_get_patterns.return_value = ["pattern1", "pattern2"]

    response = client.get("/api/patterns/user_a")

    assert response.status_code == 200
    assert response.json()["count"] == 2
    assert response.json()["patterns"] == ["pattern1", "pattern2"]


def test_patterns_forbidden():
    # Test 2 - Unauthorized Access
    app.dependency_overrides[get_user_id] = lambda: "user_a"

    response = client.get("/api/patterns/user_b")

    assert response.status_code == 403
    assert response.json()["detail"] == "Forbidden"


@patch("analysis.pattern_routes.analyze_patterns")
def test_analyze_patterns_authorized(mock_analyze):
    # Test 3 - POST Authorized Access
    app.dependency_overrides[get_user_id] = lambda: "user_a"
    mock_analyze.return_value = ["pattern1", "pattern2"]

    response = client.post("/api/patterns/analyze", json={"user_id": "user_a"})

    assert response.status_code == 200
    assert response.json()["count"] == 2
    assert response.json()["detected"] == ["pattern1", "pattern2"]


def test_analyze_patterns_forbidden():
    # Test 4 - POST Unauthorized Access
    app.dependency_overrides[get_user_id] = lambda: "user_a"

    response = client.post("/api/patterns/analyze", json={"user_id": "user_b"})

    assert response.status_code == 403
    assert response.json()["detail"] == "Forbidden"
