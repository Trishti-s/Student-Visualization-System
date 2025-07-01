# Flask app to serve predictions

from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_all_models

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    try:
        features = [
            int(data["raisedHands"]),
            int(data["visitedResources"]),
            int(data["discussion"]),
            int(data["absence"])
        ]
    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400

    predictions = predict_all_models(features)
    return jsonify(predictions)

if __name__ == "__main__":
    app.run(debug=True)
