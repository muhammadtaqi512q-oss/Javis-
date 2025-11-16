// server.js
import express from "express";
import fetch from "node-fetch"; // or built-in fetch in Node 18+

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// ⚠️ Put your real API key here
const API_KEY = "AIzaSyC1v0qpnQ67wdZ-F1JiAMZ2d-HH4HFF-WU";

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: "You are a helpful and friendly assistant." }] }
      })
    });

    const data = await response.json();
    res.json({ text: data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend HTML
app.use(express.static("public")); // put HTML in public/index.html

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

