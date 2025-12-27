require("dotenv").config();
const axios = require("axios");
const readline = require("readline-sync");

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

async function askBot(prompt) {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "openrouter/auto",  // OpenRouter picks a working free model
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        max_tokens: 150
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "Error:",
      error.response?.status,
      error.response?.data || error.message
    );
    return "😕 Something went wrong";
  }
}

async function main() {
  console.log("🤖 Free OpenRouter Chatbot (limited credits)");
  console.log("ENV Loaded:", process.env.OPENROUTER_API_KEY ? "YES" : "NO");

  while (true) {
    const userText = readline.question("> You: ");
    if (userText.toLowerCase() === "exit") break;

    const reply = await askBot(userText);
    console.log("Bot:", reply);
  }
}

main();
