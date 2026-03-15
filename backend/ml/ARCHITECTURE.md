# Prakriti ML Architecture

This module provides Ayurvedic Prakriti (Vata, Pitta, Kapha) prediction using the CatBoost machine learning framework.

## System Workflow

1. **User Onboarding**: User answers a questionnaire in the frontend.
2. **Prakriti ML Model**: Answers are sent to `POST /api/prakriti`, which returns probabilities.
3. **Initialize State**: The resulting Prakriti scores initialize the user's physiological baseline.
4. **Deterministic Engine**: Combines baseline with real-time logs/signals.
5. **Protocol Engine**: Recommends Ayurvedic protocols based on the refined state.
6. **Simulation**: Projects the impact of protocols on the user's health.

## Deployment Rule

> [!IMPORTANT]
> **Training should never run in production.**

### Workflow:
1. **Local Training**: Run `python backend/ml/train_prakriti_model.py` with the dataset CSV.
2. **Export**: The script generates/overwrites `backend/ml/prakriti_model.pkl`.
3. **Deploy**: Only the `.pkl` file and prediction scripts (`predict_prakriti.py`, `ml_service.py`) are used by the production FastAPI server.

## Files
- `train_prakriti_model.py`: Local training script.
- `predict_prakriti.py`: Low-level prediction utility.
- `ml_service.py`: High-level service layer used by `main.py`.
- `prakriti_model.pkl`: Serialized model file.
- `Prakriti_Tridosha_Dataset.csv`: Training dataset (not needed in production).

## Performance Expectations

- **Baseline Accuracy**: The model typically achieves **~75-85%** accuracy on the Tridosha dataset.
- **Strategic Evolution**: While this model provides the initial Prakriti "snapshot," the system's true intelligence matures through the **daily log learning loop**, which refines the physiological state based on actual behavioral outcomes.
