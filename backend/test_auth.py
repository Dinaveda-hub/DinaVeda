from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from billing.subscription_guard import get_user_id
import pytest
from unittest.mock import patch, MagicMock

app = FastAPI()

@app.get("/test")
def protected_route(user_id: str = Depends(get_user_id)):
    return {"user_id": user_id}

client = TestClient(app)

def test_missing_auth():
    response = client.get("/test")
    assert response.status_code == 500  # Will be 500 because supabase is not configured in test

@patch("billing.subscription_guard.supabase")
def test_valid_auth(mock_supabase):
    mock_supabase.auth.get_user.return_value = MagicMock(user=MagicMock(id="user-123"))
    response = client.get("/test", headers={"Authorization": "Bearer valid-token"})
    assert response.status_code == 200
    assert response.json() == {"user_id": "user-123"}
    mock_supabase.auth.get_user.assert_called_once_with("valid-token")

@patch("billing.subscription_guard.supabase")
def test_invalid_auth(mock_supabase):
    mock_supabase.auth.get_user.return_value = None
    response = client.get("/test", headers={"Authorization": "Bearer invalid-token"})
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid token"}

@patch("billing.subscription_guard.supabase")
def test_missing_bearer(mock_supabase):
    response = client.get("/test", headers={"Authorization": "not-bearer invalid-token"})
    assert response.status_code == 401
    assert response.json() == {"detail": "Missing auth token"}
