from unittest.mock import patch
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

# Helper for testing responses without network calls
MOCK_NLU_RESPONSE = {
    "reply": "Observed Signals\nMocked signal\nPhysiological Interpretation\nMocked interp\nDosha Impact\nMocked impact\nCorrection\nMocked correction",
    "signals": []
}

MOCK_NLU_INVALID_RESPONSE = {
    "reply": "I don't have enough structure to be clinical.",
    "signals": []
}

@patch('backend.main.engine.process_chat_nlu')
def test_chat_with_empty_context(mock_process):
    mock_process.return_value = MOCK_NLU_RESPONSE.copy()
    response = client.post(
        "/api/chat",
        json={
            "message": "Hello",
            "context": {}
        }
    )
    assert response.status_code == 200
    assert "Mocked signal" in response.json()["reply"]

@patch('backend.main.engine.process_chat_nlu')
def test_chat_with_none_context(mock_process):
    mock_process.return_value = MOCK_NLU_RESPONSE.copy()
    response = client.post(
        "/api/chat",
        json={
            "message": "Hello",
            "context": None
        }
    )
    assert response.status_code == 200
    assert "Mocked signal" in response.json()["reply"]

@patch('backend.main.engine.process_chat_nlu')
def test_chat_without_context(mock_process):
    mock_process.return_value = MOCK_NLU_RESPONSE.copy()
    response = client.post(
        "/api/chat",
        json={
            "message": "Hello"
        }
    )
    assert response.status_code == 200
    assert "Mocked signal" in response.json()["reply"]

@patch('backend.main.engine.process_chat_nlu')
def test_chat_fallback_on_invalid_structure(mock_process):
    mock_process.return_value = MOCK_NLU_INVALID_RESPONSE.copy()
    response = client.post(
        "/api/chat",
        json={
            "message": "Hello",
            "context": {"agni": 60, "vata": 80}
        }
    )
    assert response.status_code == 200
    reply = response.json()["reply"]
    # Fallback should kick in and provide the proper structural headings and text
    assert "The system detects a current Agni level of 60" in reply
    assert "Observed Signals" in reply

@patch('backend.main.engine.process_chat_nlu')
def test_chat_exception_handling(mock_process):
    # Simulate an unexpected exception in engine processing
    mock_process.side_effect = Exception("Simulated Failure")
    response = client.post(
        "/api/chat",
        json={
            "message": "Hello",
            "context": {"agni": 60, "vata": 80}
        }
    )
    assert response.status_code == 200
    reply = response.json()["reply"]
    # Exception handler in main.py should catch and fallback
    assert "The system detects a current Agni level of 60" in reply
    assert "Observed Signals" in reply
