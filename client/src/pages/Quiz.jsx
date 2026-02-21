import { useState } from "react";

function Quiz() {
  const [question, setQuestion] = useState(null);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Quiz Page</h2>
      <p>Question will appear here</p>
    </div>
  );
}

export default Quiz;