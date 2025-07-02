import axios from "axios";
import { useState } from "react";

function PredictionForm() {
  const [formData, setFormData] = useState({
    raisedHands: "",
    visitedResources: "",
    discussion: "",
    absences: ""
  });

  const [predictions, setPredictions] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setPredictions(response.data);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <input type="number" name="raisedHands" placeholder="Raised Hands" onChange={handleChange} />
        <input type="number" name="visitedResources" placeholder="Visited Resources" onChange={handleChange} />
        <input type="number" name="discussion" placeholder="Discussion" onChange={handleChange} />
        <input type="number" name="absences" placeholder="Absences" onChange={handleChange} />
        <button type="submit">Predict</button>
      </form>

      {predictions && (
        <div className="mt-4">
          <h2>Predictions:</h2>
          <ul>
            {Object.entries(predictions).map(([model, prediction]) => (
              <li key={model}><strong>{model}:</strong> {prediction}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PredictionForm;
