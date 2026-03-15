---
description: How to train and update the Prakriti ML model
---

To update the Prakriti prediction model, follow these steps locally:

1. **Prepare Data**:
   Ensure `backend/ml/Prakriti_Tridosha_Dataset.csv` is updated with the latest training data.

2. **Install Dependencies**:
   ```bash
   pip install catboost pandas joblib scikit-learn
   ```

3. **Run Training**:
   Execute the training script from the project root:
   ```bash
   python backend/ml/train_prakriti_model.py
   ```

4. **Verify Output**:
   Check that `backend/ml/prakriti_model.pkl` has been updated (check timestamp).

5. **Test Prediction**:
   Verify the new model works as expected:
   ```bash
   python backend/ml/ml_service.py
   ```

6. **Deploy**:
   Commit and push the updated `.pkl` file to the repository. The production server will load the new model on restart.
