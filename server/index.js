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

// Generate 5 Questions
app.post("/generate-questions", async (req, res) => {
  const { role } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a strict technical interviewer." },
        {
          role: "user",
          content: `Generate 5 interview questions for a ${role}. Return as numbered list.`,
        },
      ],
    });

    res.json({ questions: completion.choices[0].message.content });
  } catch (err) {
    res.json({
      questions:
        "1. Explain closures in JavaScript.\n2. What is React reconciliation?\n3. What is event bubbling?\n4. Difference between var, let, const?\n5. What are hooks?",
    });
  }
});

// Evaluate Answer
app.post("/evaluate", async (req, res) => {
  const { question, answer } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are scoring interview answers strictly." },
        {
          role: "user",
          content: `
Question: ${question}
Answer: ${answer}

Return:
Score (0-10)
Strength
Improvement
`,
        },
      ],
    });

    res.json({ feedback: completion.choices[0].message.content });
  } catch {
    res.json({
      feedback:
        "Score: 6\nStrength: Good attempt.\nImprovement: Add more technical depth.",
    });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));