import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const AIAnalysis = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const analyzeHandler = async () => {
    try {
      const res = await API.post("/ai/analyze", {
        title: input,
        description: input,
        category: input
      });

      setResult(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="analysis-container">
        <h2>AI Complaint Analyzer</h2>

        <textarea
          placeholder="Enter complaint text..."
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={analyzeHandler}>Analyze</button>

        {result && (
          <div className="result-card">
            <p><strong>Priority:</strong> {result.priority}</p>
            <p><strong>Department:</strong> {result.department}</p>
            <p><strong>Summary:</strong> {result.summary}</p>
            <p><strong>Response:</strong> {result.autoResponse}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AIAnalysis;