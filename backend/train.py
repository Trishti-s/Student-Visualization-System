# This file trains all models and saves them

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import Perceptron, LogisticRegression
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import classification_report
import joblib
import os

# Load dataset
data = pd.read_csv("backend/AI-Data.csv")

# Drop unused columns
data = data.drop(["gender", "StageID", "GradeID", "NationalITy", "PlaceofBirth", "SectionID", "Topic",
                  "Semester", "Relation", "ParentschoolSatisfaction", "ParentAnsweringSurvey", 
                  "AnnouncementsView"], axis=1)

# Encode categorical columns
from sklearn.preprocessing import LabelEncoder
for column in data.columns:
    if data[column].dtype == object:
        le = LabelEncoder()
        data[column] = le.fit_transform(data[column])

# Features and labels
X = data.drop("Class", axis=1)
y = data["Class"]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Initialize models
modelD = DecisionTreeClassifier()
modelR = RandomForestClassifier()
modelP = Perceptron()
modelL = LogisticRegression()
modelN = MLPClassifier(activation="logistic", max_iter=500)

# Fit models
modelD.fit(X_train, y_train)
modelR.fit(X_train, y_train)
modelP.fit(X_train, y_train)
modelL.fit(X_train, y_train)
modelN.fit(X_train, y_train)

# Optional: print accuracy reports
print("Decision Tree:\n", classification_report(y_test, modelD.predict(X_test)))
print("Random Forest:\n", classification_report(y_test, modelR.predict(X_test)))
print("Perceptron:\n", classification_report(y_test, modelP.predict(X_test)))
print("Logistic Regression:\n", classification_report(y_test, modelL.predict(X_test)))
print("MLP Neural Network:\n", classification_report(y_test, modelN.predict(X_test)))

# Save models
os.makedirs("backend", exist_ok=True)
joblib.dump(modelD, "backend/decision_tree_model.pkl")
joblib.dump(modelR, "backend/random_forest_model.pkl")
joblib.dump(modelP, "backend/perceptron_model.pkl")
joblib.dump(modelL, "backend/logistic_model.pkl")
joblib.dump(modelN, "backend/mlp_model.pkl")

print("All models trained and saved successfully.")
