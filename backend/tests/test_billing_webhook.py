import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
import os
import hmac

from backend.main import app

client = TestClient(app)

@patch.dict(os.environ, {"RAZORPAY_WEBHOOK_SECRET": "test_secret"})
def test_razorpay_webhook_missing_signature():
    response = client.post("/api/billing/webhook", json={"event": "some.event"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Missing signature"}

@patch.dict(os.environ, {"RAZORPAY_WEBHOOK_SECRET": "test_secret"})
@patch("hmac.compare_digest")
def test_razorpay_webhook_invalid_signature(mock_compare_digest):
    mock_compare_digest.return_value = False

    response = client.post(
        "/api/billing/webhook",
        json={"event": "some.event"},
        headers={"x-razorpay-signature": "invalid_signature"}
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid signature"}

@patch.dict(os.environ, {"RAZORPAY_WEBHOOK_SECRET": "test_secret"})
@patch("hmac.compare_digest")
def test_razorpay_webhook_invalid_json_payload(mock_compare_digest):
    mock_compare_digest.return_value = True

    invalid_payload = b"not_a_json_payload"

    response = client.post(
        "/api/billing/webhook",
        content=invalid_payload,
        headers={"x-razorpay-signature": "valid_signature"}
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid payload"}

@patch.dict(os.environ, {"RAZORPAY_WEBHOOK_SECRET": "test_secret"})
@patch("hmac.compare_digest")
def test_razorpay_webhook_valid_signature_happy_path(mock_compare_digest):
    mock_compare_digest.return_value = True

    response = client.post(
        "/api/billing/webhook",
        json={"event": "some.event"},
        headers={"x-razorpay-signature": "valid_signature"}
    )
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
