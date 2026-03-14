import pytest
from ai.insight_agent import _calculate_trend

def test_calculate_trend():
    # Test positive trend
    assert _calculate_trend(60, 50, 50) == "+10"

    # Test negative trend
    assert _calculate_trend(40, 50, 50) == "-10"

    # Test zero trend
    assert _calculate_trend(50, 50, 50) == "0"

    # Test fallback to default when current is None
    assert _calculate_trend(None, 50, 50) == "0" # 50 - 50

    # Test fallback to default when previous is None
    assert _calculate_trend(60, None, 50) == "+10" # 60 - 50

    # Test fallback to default when both are None
    assert _calculate_trend(None, None, 70) == "0" # 70 - 70
