// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import OpenAI from "openai";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Generate 5 Questions
// app.post("/generate-questions", async (req, res) => {
//   const { role } = req.body;

//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "system", content: "You are a strict technical interviewer." },
//         {
//           role: "user",
//           content: `Generate 5 interview questions for a ${role}. Return as numbered list.`,
//         },
//       ],
//     });

//     res.json({ questions: completion.choices[0].message.content });
//   } catch (err) {
//     res.json({
//       questions:
//         "1. Explain closures in JavaScript.\n2. What is React reconciliation?\n3. What is event bubbling?\n4. Difference between var, let, const?\n5. What are hooks?",
//     });
//   }
// });

// // Evaluate Answer
// app.post("/evaluate", async (req, res) => {
//   const { question, answer } = req.body;

//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "system", content: "You are scoring interview answers strictly." },
//         {
//           role: "user",
//           content: `
// Question: ${question}
// Answer: ${answer}

// Return:
// Score (0-10)
// Strength
// Improvement
// `,
//         },
//       ],
//     });

//     res.json({ feedback: completion.choices[0].message.content });
//   } catch {
//     res.json({
//       feedback:
//         "Score: 6\nStrength: Good attempt.\nImprovement: Add more technical depth.",
//     });
//   }
// });

// app.listen(5000, () => console.log("Server running on port 5000"));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PORT = 5000;

/*
  In-memory session storage
  (For resume project this is fine.
   For production use Redis or DB)
*/
let quizSession = {
  askedQuestions: [],
  score: 0,
  total: 0,
};

/* -------------------------------
   Generate Unique MCQ Question
-------------------------------- */
app.post("/generate-question", async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate ONE unique multiple choice technical interview question on topic: ${topic}.

Rules:
- Question must NOT repeat previous ones.
- Provide 4 options.
- Mention correct answer clearly.
- Format strictly as JSON:

{
  "question": "",
  "options": ["", "", "", ""],
  "correctAnswer": ""
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;

    const questionData = JSON.parse(responseText);

    // Prevent repetition
    if (quizSession.askedQuestions.includes(questionData.question)) {
      return res.status(400).json({
        message: "Duplicate question generated. Try again.",
      });
    }

    quizSession.askedQuestions.push(questionData.question);
    quizSession.total++;

    res.json(questionData);
  } catch (error) {
    console.error("Error generating question:", error);
    res.status(500).json({ message: "Error generating question" });
  }
});

/* -------------------------------
   Submit Answer
-------------------------------- */
app.post("/submit-answer", (req, res) => {
  const { selectedAnswer, correctAnswer } = req.body;

  if (selectedAnswer === correctAnswer) {
    quizSession.score++;
  }

  res.json({ message: "Answer recorded" });
});

/* -------------------------------
   Get Final Performance Report
-------------------------------- */
app.get("/performance-report", (req, res) => {
  const percentage =
    quizSession.total === 0
      ? 0
      : ((quizSession.score / quizSession.total) * 100).toFixed(2);

  const report = {
    totalQuestions: quizSession.total,
    correctAnswers: quizSession.score,
    percentage: percentage,
    performance:
      percentage >= 80
        ? "Excellent"
        : percentage >= 60
        ? "Good"
        : percentage >= 40
        ? "Average"
        : "Needs Improvement",
  };

  res.json(report);
});

/* -------------------------------
   Reset Quiz
-------------------------------- */
app.post("/reset-quiz", (req, res) => {
  quizSession = {
    askedQuestions: [],
    score: 0,
    total: 0,
  };

  res.json({ message: "Quiz reset successful" });
});

/* -------------------------------
   Start Server
-------------------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
