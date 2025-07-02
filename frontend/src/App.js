import React, { useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import "./App.css"; // Optional, for additional styling if you want

function App() {
  const [inputs, setInputs] = useState({
    raisedHands: "",
    visitedResources: "",
    discussion: "",
    absences: "",
  });

  const [predictions, setPredictions] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  try {
    const formattedInputs = {
      raisedHands: parseInt(inputs.raisedHands),
      visitedResources: parseInt(inputs.visitedResources),
      discussion: parseInt(inputs.discussion),
      absences: parseInt(inputs.absences)
    };

    const res = await axios.post("http://localhost:5000/predict", formattedInputs);
    setPredictions(res.data);
  } catch (error) {
    console.error(error);
    alert("Prediction failed. Please check server and input values.");
  }
};

  // Convert predictions ("H", "M", "L") to numerical values for chart
  const chartData = predictions
  ? Object.entries(predictions).map(([name, label]) => {
      let value = 0;
      if (label === "H") value = 1;
      else if (label === "M") value = 0.5;
      else if (label === "L") value = 0;
      return { name, value };
    })
  : [];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎯 AI Predictor</h1>

      <div style={styles.form}>
        {["raisedHands", "visitedResources", "discussion", "absences"].map((field) => (
          <div key={field} style={styles.inputGroup}>
            <label style={styles.label}>{field}</label>
            <input
              type="number"
              name={field}
              value={inputs[field]}
              onChange={handleChange}
              style={styles.input}
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}
        <button style={styles.button} onClick={handleSubmit}>
          Predict
        </button>
      </div>

      {predictions && (
        <>
          <div style={styles.results}>
            <h2>📊 Prediction Results</h2>
            <ul>
              {Object.entries(predictions).map(([model, value]) => (
                <li key={model}>
                  <strong>{model}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ width: "100%", height: 300, marginTop: "2rem" }}>   <ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis domain={[0, 1]} ticks={[0, 0.5, 1]} />
    <Tooltip />
    <Bar dataKey="value" fill="#8884d8" barSize={40} label={{ position: 'top' }} />
  </BarChart>
</ResponsiveContainer>


          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#00BFA6",
    marginBottom: "1.5rem",
  },
  form: {
    display: "grid",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.3rem",
    fontWeight: "600",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#00BFA6",
    color: "white",
    padding: "0.6rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "1rem",
  },
  results: {
    marginTop: "2rem",
  },
};

export default App;
