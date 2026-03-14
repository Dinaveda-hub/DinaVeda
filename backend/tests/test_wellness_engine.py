import pytest
from unittest.mock import patch, MagicMock
from wellness_engine import VedaEngine

class MockResponse:
    def __init__(self, text):
        self.text = text

@patch.object(VedaEngine, "generate_with_fallback")
def test_nlu_json_fallback_parsing(mock_llm):
    """Test resilient JSON extraction when LLM returns extra text around valid JSON"""
    engine = VedaEngine()
    engine.signal_library = {"sleep_deprivation": {"synonyms": ["slept poorly"]}}

    # Mock the LLM response object
    mock_response = MockResponse("""
    Here is the result:
    ```json
    {"reply": "test", "signals": ["sleep_deprivation"]}
    ```
    The first `json.loads(text)` will fail.
    """)
    mock_llm.return_value = mock_response

    result = engine.process_chat_nlu("I slept poorly")

    assert "sleep_deprivation" in result.get("signals", [])
    assert result.get("reply") == "test"

@patch.object(VedaEngine, "generate_with_fallback")
def test_nlu_json_parse_failure_returns_fallback(mock_llm):
    """Test when LLM returns no valid JSON braces, it triggers minimal fallback path."""
    engine = VedaEngine()
    engine.signal_library = {"sleep_deprivation": {"synonyms": ["slept poorly"]}}

    # Mock the LLM response object
    mock_response = MockResponse("I think the user slept poorly yesterday. No JSON here.")
    mock_llm.return_value = mock_response

    result = engine.process_chat_nlu("I slept poorly")

    # Assert the returned fallback structure
    assert isinstance(result, dict)
    assert "signals" in result
    # Fallback should use synonym matching for "slept poorly"
    assert "sleep_deprivation" in result["signals"]
    assert result["reply"] == "I have carefully noted your physiological signals and adjusted your biological pulse accordingly."
