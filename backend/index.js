import express from "express";
import cors from "cors";

import { groq } from "./groq.js";
import { db } from "./db.js";
import { buildPrompt } from "./utils/promptBuilder.js";

const app = express();
app.use(cors());
app.use(express.json());

const bannedKeywords = [
  "injury",
  "fracture",
  "pain",
  "diabetes",
  "disease",
  "medicine",
  "supplement",
];

app.post("/chat", async (req, res) => {
  const { message, personality, daysUsingApp, lifestyle } = req.body;

  // ---- SAFETY CHECK ----
  const lower = message.toLowerCase();
  if (bannedKeywords.some((word) => lower.includes(word))) {
    return res.json({
      reply:
        "I can’t help with medical, injury-related, or medication advice. Please consult a certified healthcare professional.",
    });
  }

  // ---- BUILD PROMPT ----
  const prompt = buildPrompt({
    personality,
    daysUsingApp,
    lifestyle,
    userMessage: message,
  });

  try {
    // ---- GROQ AI CALL ----
    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    // ---- SAVE TO DB ----
    await db.run(
      "INSERT INTO chats (role, message) VALUES (?, ?)",
      ["user", message]
    );
    await db.run(
      "INSERT INTO chats (role, message) VALUES (?, ?)",
      ["assistant", reply]
    );

    res.json({ reply });
  } catch (err) {
    console.error("Groq error:", err);
    res.status(500).json({
      reply: "Something went wrong while generating the response.",
    });
  }
});

// ---- CHAT HISTORY ROUTE (BONUS FEATURE) ----
app.get("/history", async (req, res) => {
    try {
      const rows = await db.all(
        "SELECT role, message, created_at FROM chats ORDER BY created_at DESC LIMIT 10"
      );
  
      // reverse so UI shows oldest → newest
      res.json(rows.reverse());
    } catch (err) {
      console.error("History fetch error:", err);
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });  

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
