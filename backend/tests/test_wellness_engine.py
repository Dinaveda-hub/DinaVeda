from unittest.mock import patch, MagicMock
from backend.wellness_engine import VedaEngine

def setup_engine():
    engine = VedaEngine()
    engine.signal_library = {
        "bloating": {"synonyms": ["gas", "bloated"]},
        "sleep_deprivation": {"synonyms": ["slept late", "no sleep"]},
    }
    return engine

@patch.object(VedaEngine, "generate_with_fallback")
def test_nlu_happy_path(mock_llm):
    engine = setup_engine()

    mock_response = MagicMock()
    mock_response.text = '{"signals": ["bloating"]}'
    mock_llm.return_value = mock_response

    result = engine.process_chat_nlu("I feel bloated")
    assert result["signals"] == ["bloating"]

@patch.object(VedaEngine, "generate_with_fallback")
def test_nlu_json_recovery(mock_llm):
    engine = setup_engine()

    mock_response = MagicMock()
    mock_response.text = """
    ```json
    {"signals": ["sleep_deprivation"]}
    ```
    """
    mock_llm.return_value = mock_response

    result = engine.process_chat_nlu("I slept late")
    assert result["signals"] == ["sleep_deprivation"]

@patch.object(VedaEngine, "generate_with_fallback")
def test_nlu_fallback(mock_llm):
    engine = setup_engine()
    mock_llm.side_effect = Exception("LLM error")

    result = engine.process_chat_nlu("I slept late")
    assert "sleep_deprivation" in result["signals"]

@patch.object(VedaEngine, "generate_with_fallback")
def test_nlu_empty_output(mock_llm):
    engine = setup_engine()

    mock_response = MagicMock()
    mock_response.text = ""
    mock_llm.return_value = mock_response

    result = engine.process_chat_nlu("I slept late")
    assert "sleep_deprivation" in result["signals"]
