import os
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock

# Import the FastAPI app instance from main.py
from main import app

# Initialize the TestClient with the app
client = TestClient(app)

@patch("billing.routes.razorpay_client")
@patch.dict(os.environ, {
    "RAZORPAY_PLAN_ID_MONTHLY": "plan_test_monthly",
    "RAZORPAY_KEY_ID": "test_key_id"
})
def test_create_subscription_monthly(mock_client):
    mock_client.subscription.create.return_value = {
        "id": "sub_test_123"
    }

    response = client.post(
        "/api/billing/create-subscription",
        json={"plan": "monthly", "user_id": "user123"}
    )

    assert response.status_code == 200
    assert response.json() == {
        "subscriptionId": "sub_test_123",
        "key": "test_key_id"
    }
    mock_client.subscription.create.assert_called_once_with({
        "plan_id": "plan_test_monthly",
        "total_count": 12,
        "customer_notify": 1,
        "notes": {
            "user_id": "user123"
        }
    })

@patch("billing.routes.razorpay_client")
@patch.dict(os.environ, {
    "RAZORPAY_PLAN_ID_YEARLY": "plan_test_yearly",
    "RAZORPAY_KEY_ID": "test_key_id"
})
def test_create_subscription_yearly(mock_client):
    mock_client.subscription.create.return_value = {
        "id": "sub_test_456"
    }

    response = client.post(
        "/api/billing/create-subscription",
        json={"plan": "yearly", "user_id": "user123"}
    )

    assert response.status_code == 200
    assert response.json() == {
        "subscriptionId": "sub_test_456",
        "key": "test_key_id"
    }
    mock_client.subscription.create.assert_called_once_with({
        "plan_id": "plan_test_yearly",
        "total_count": 1,
        "customer_notify": 1,
        "notes": {
            "user_id": "user123"
        }
    })

@patch("billing.routes.razorpay_client", None)
def test_create_subscription_billing_not_configured():
    response = client.post(
        "/api/billing/create-subscription",
        json={"plan": "monthly", "user_id": "user123"}
    )

    assert response.status_code == 500
    assert response.json() == {"detail": "Billing is not configured."}

@patch("billing.routes.razorpay_client")
@patch.dict(os.environ, {}, clear=True)
def test_create_subscription_missing_plan_id(mock_client):
    response = client.post(
        "/api/billing/create-subscription",
        json={"plan": "monthly", "user_id": "user123"}
    )

    assert response.status_code == 500
    assert response.json() == {"detail": "Plan ID is not configured."}

@patch("billing.routes.razorpay_client")
@patch.dict(os.environ, {
    "RAZORPAY_PLAN_ID_MONTHLY": "plan_test_monthly"
})
def test_create_subscription_api_error(mock_client):
    mock_client.subscription.create.side_effect = Exception("API failure")

    response = client.post(
        "/api/billing/create-subscription",
        json={"plan": "monthly", "user_id": "user123"}
    )

    assert response.status_code == 500
    assert response.json() == {"detail": "Subscription creation failed"}
