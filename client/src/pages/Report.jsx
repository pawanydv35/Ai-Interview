import { useEffect, useState } from "react";

function Report() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/performance-report")
      .then(res => res.json())
      .then(data => setReport(data));
  }, []);

  if (!report) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div className="container">
      <h1>Performance Report 📊</h1>

      <div className="card">
        <p>Total Questions: {report.totalQuestions}</p>
        <p>Correct Answers: {report.correctAnswers}</p>
        <p>Score: {report.percentage}%</p>
        <p>Performance: {report.performance}</p>
      </div>
    </div>
  );
}

export default Report;