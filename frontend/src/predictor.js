import React, { useState } from "react";
import axios from "axios";

function Predictor() {
  const [form, setForm] = useState({
    raisedHands: "",
    visitedResources: "",
    discussion: "",
    absences: "",
  });

  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/predict", form);
      setPredictions(res.data);
    } catch (err) {
      setError("Error: " + err.response?.data?.error || "Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          🧠 Student Performance Predictor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["raisedHands", "visitedResources", "discussion", "absences"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="number"
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            🚀 Predict Performance
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

        {predictions && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-green-700">✅ Predictions:</h3>
            <ul className="space-y-1 text-sm text-gray-800">
              {Object.entries(predictions).map(([model, result]) => (
                <li key={model}>
                  <strong>{model}:</strong> {result}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Predictor;
