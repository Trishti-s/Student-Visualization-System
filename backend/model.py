# Description: Loads saved models and predicts student performance

import joblib
import numpy as np
model_dt = joblib.load("backend/decision_tree_model.pkl")
model_rf = joblib.load("backend/random_forest_model.pkl")
model_perceptron = joblib.load("backend/perceptron_model.pkl")
model_logistic = joblib.load("backend/logistic_model.pkl")
model_mlp = joblib.load("backend/mlp_model.pkl")

label_map = {
    0: "H",  # High
    1: "M",  # Medium
    2: "L"   # Low
}

def predict_all_models(features):
    input_array = np.array(features).reshape(1, -1)

    pred_dt = label_map.get(model_dt.predict(input_array)[0])
    pred_rf = label_map.get(model_rf.predict(input_array)[0])
    pred_perceptron = label_map.get(model_perceptron.predict(input_array)[0])
    pred_logistic = label_map.get(model_logistic.predict(input_array)[0])
    pred_mlp = label_map.get(model_mlp.predict(input_array)[0])

    return {
        "Decision Tree": pred_dt,
        "Random Forest": pred_rf,
        "Perceptron": pred_perceptron,
        "Logistic Regression": pred_logistic,
        "MLP Classifier": pred_mlp
    }
