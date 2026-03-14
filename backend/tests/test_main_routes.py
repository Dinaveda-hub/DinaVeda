from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "message": "Welcome to Veda AI API",
        "status": "online"
    }

def test_api_root_endpoint():
    response = client.get("/api")
    assert response.status_code == 200
    assert response.json() == {
        "message": "Welcome to Veda AI API",
        "status": "online"
    }

def test_root_post_not_allowed():
    response = client.post("/")
    assert response.status_code == 405
