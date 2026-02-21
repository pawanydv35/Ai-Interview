import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Master Technical Interviews with AI</h1>
      <p>Practice real-time MCQ interviews and track your performance.</p>
      <button onClick={() => navigate("/quiz")}>
        Start Interview
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px"
  }
};

export default Home;