import React, { useState } from "react";
import axios from "axios";

function App() {
  const [role, setRole] = useState("Frontend Developer");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [scores, setScores] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    const res = await axios.post("http://localhost:5000/generate-questions", { role });
    const list = res.data.questions.split("\n").filter(q => q.trim() !== "");
    setQuestions(list);
    setCurrent(0);
    setScores([]);
  };

  const submitAnswer = async () => {
    setLoading(true);

    const res = await axios.post("http://localhost:5000/evaluate", {
      question: questions[current],
      answer,
    });

    const match = res.data.feedback.match(/Score.*?(\d+)/);
    const score = match ? parseInt(match[1]) : 5;

    setScores([...scores, score]);
    setFeedback(res.data.feedback);
    setAnswer("");
    setLoading(false);

    setTimeout(() => {
      setFeedback("");
      setCurrent(current + 1);
    }, 2000);
  };

  const progress = (current / 5) * 100;
  const average =
    scores.length > 0
      ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6">AI Interview Simulator</h1>

      {questions.length === 0 && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96">
          <select
            className="w-full p-2 rounded bg-gray-700"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Machine Learning Engineer</option>
            <option>DSA</option>
          </select>

          <button
            onClick={startInterview}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
          >
            Start Interview
          </button>
        </div>
      )}

      {questions.length > 0 && current < 5 && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl">
          <div className="w-full bg-gray-700 h-2 rounded mb-4">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h3 className="text-xl mb-4">{questions[current]}</h3>

          <textarea
            className="w-full p-3 rounded bg-gray-700"
            rows="5"
            placeholder="Type your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button
            onClick={submitAnswer}
            disabled={loading}
            className="mt-4 bg-green-600 hover:bg-green-700 p-2 rounded w-full"
          >
            {loading ? "Evaluating..." : "Submit"}
          </button>

          {feedback && (
            <pre className="mt-4 bg-gray-900 p-3 rounded">{feedback}</pre>
          )}
        </div>
      )}

      {current === 5 && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96 text-center">
          <h2 className="text-2xl mb-4">Interview Complete</h2>
          <p className="text-xl">Average Score: {average}/10</p>

          {average >= 8 && <p className="text-green-400 mt-2">Excellent 🚀</p>}
          {average >= 5 && average < 8 && (
            <p className="text-yellow-400 mt-2">Good 💡</p>
          )}
          {average < 5 && <p className="text-red-400 mt-2">Needs Practice 🔥</p>}

          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 p-2 rounded w-full"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default App;