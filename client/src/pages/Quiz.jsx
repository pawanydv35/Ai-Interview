import { useState } from "react";

function Quiz() {
  const [question, setQuestion] = useState(null);

  const fetchQuestion = async () => {
    const res = await fetch("http://localhost:5000/generate-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: "JavaScript" }),
    });

    const data = await res.json();
    setQuestion(data);
  };

  return (
    <div className="container">
      <h1>Technical Interview</h1>

      <button className="btn" onClick={fetchQuestion}>
        Generate Question
      </button>

      {question && (
        <div className="card">
          <h3>{question.question}</h3>

          <div style={{ marginTop: "20px" }}>
            {question.options.map((opt, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <button className="btn" style={{ width: "100%" }}>
                  {opt}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;