import pytest
from backend.ai.response_validator import validate_clinical_response, format_fallback_response

def test_format_fallback_response_default():
    """Verify output with an empty state dictionary (should use defaults)."""
    state = {}
    response = format_fallback_response(state)
    assert "Agni level of 50" in response
    assert "Vata level of 50" in response
    assert "Observed Signals" in response
    assert "Physiological Interpretation" in response
    assert "Dosha Impact" in response
    assert "Correction" in response

def test_format_fallback_response_custom():
    """Verify output with a populated state dictionary."""
    state = {'agni': 70, 'vata': 30}
    response = format_fallback_response(state)
    assert "Agni level of 70" in response
    assert "Vata level of 30" in response
    assert "Observed Signals" in response
    assert "Physiological Interpretation" in response
    assert "Dosha Impact" in response
    assert "Correction" in response

def test_validate_clinical_response_valid():
    """Verify it returns True for a string containing all four required headers."""
    text = """
    Observed Signals: ...
    Physiological Interpretation: ...
    Dosha Impact: ...
    Correction: ...
    """
    assert validate_clinical_response(text) is True

def test_validate_clinical_response_missing_header():
    """Verify it returns False if one header is missing."""
    text = """
    Observed Signals: ...
    Physiological Interpretation: ...
    Dosha Impact: ...
    # Missing Header Here
    """
    assert validate_clinical_response(text) is False

def test_validate_clinical_response_case_insensitive():
    """Verify it returns True even if headers have different casing."""
    text = """
    observed signals: ...
    PHYSIOLOGICAL INTERPRETATION: ...
    dOsHa iMpAcT: ...
    correction: ...
    """
    assert validate_clinical_response(text) is True
