import pytest
from ai.response_validator import validate_clinical_response, format_fallback_response

@pytest.mark.parametrize(
    "text,expected",
    [
        # 1. Happy Path
        (
            """
            Observed Signals
            Agni level is stable.

            Physiological Interpretation
            Digestion is regular.

            Dosha Impact
            Vata is balanced.

            Correction
            Continue current routine.
            """,
            True
        ),
        # 2. Missing Section ("Correction" missing)
        (
            """
            Observed Signals
            Agni level is stable.

            Physiological Interpretation
            Digestion is regular.

            Dosha Impact
            Vata is balanced.
            """,
            False
        ),
        # 3. Case Insensitivity
        (
            """
            observed signals
            Agni level is stable.

            physiological interpretation
            Digestion is regular.

            dosha impact
            Vata is balanced.

            correction
            Continue current routine.
            """,
            True
        ),
        # 4. Extra Text/Markdown
        (
            """
            Here is your daily report:

            ### Observed Signals
            Agni level is stable.

            ### Physiological Interpretation
            Digestion is regular.

            ### Dosha Impact
            Vata is balanced.

            ### Correction
            Continue current routine.

            Have a great day!
            """,
            True
        ),
        # 5. Out of Order
        (
            """
            Dosha Impact
            Vata is balanced.

            Correction
            Continue current routine.

            Observed Signals
            Agni level is stable.

            Physiological Interpretation
            Digestion is regular.
            """,
            True
        ),
        # 6. Completely Invalid Response
        (
            """
            Hello, you might feel tired today.
            Drink water and rest well.
            """,
            False
        )
    ]
)
def test_validate_clinical_response(text, expected):
    assert validate_clinical_response(text) == expected


def test_fallback_response_valid():
    """Ensure the fallback response always produces a valid structure."""
    state = {'agni': 60, 'vata': 40}
    fallback = format_fallback_response(state)
    assert validate_clinical_response(fallback) is True
