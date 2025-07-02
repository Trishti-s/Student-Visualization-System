import React from "react";

const ResultDisplay = ({ results }) => {
  if (!results) return null;
  return (
    <div className="p-4 mt-6 text-left">
      <h3>Prediction Results:</h3>
      <ul>
        {Object.entries(results).map(([model, result]) => (
          <li key={model}><strong>{model}:</strong> {result}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResultDisplay;
