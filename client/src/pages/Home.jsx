import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Crack Your Tech Interview with AI 🚀
      </h1>

      <p style={{ color: "#94a3b8", marginBottom: "40px" }}>
        Practice real MCQ-based technical interviews powered by AI.
        Track performance. Improve daily.
      </p>

      <button className="btn" onClick={() => navigate("/quiz")}>
        Start Interview
      </button>
    </div>
  );
}

export default Home;