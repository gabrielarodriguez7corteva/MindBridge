// 1. Load environment variables from the .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { HfInference } = require('@huggingface/inference');

// --- INITIALIZATION ---

// Initialize the Express app and middleware
const app = express();
app.use(cors()); // Allow requests from other origins (like your frontend)
app.use(express.json()); // Allow the server to read JSON from request bodies

// Check for the Hugging Face token
if (!process.env.HUGGINGFACE_API_KEY) {
  throw new Error("HF_TOKEN is not defined in the .env file. The application cannot start.");
}

// Initialize the Hugging Face Inference client with your token
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// --- API ENDPOINT ---

app.post('/api/chat', async (req, res) => {
  try {
    // 2. Get the user's message from the request body
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required in the request body.' });
    }

    // 3. Choose a model and prepare the API call
    // We are using a popular conversational model from Microsoft.
    const model = 'facebook/blenderbot-400M-distill';

    // Call the Hugging Face API for a conversational task
    // This is the NEW code using textGeneration
const generationResult = await hf.textGeneration({
  model: model,
  inputs: message, // Just pass the user's message directly as the input
  parameters: {
    return_full_text: false, // Ensures you only get the AI's reply
    max_new_tokens: 100,     // Sets a limit on the reply length
  }
});

const botReply = generationResult.generated_text.trim();

    if (!botReply) {
      return res.status(500).json({ error: 'The model did not generate a reply.' });
    }

    // 5. Send the reply back to the frontend
    res.json({ reply: botReply });

  } catch (error) {
    console.error('Error calling Hugging Face API:', error.message);

    // Provide specific feedback for common issues
    if (error.message.includes('401')) {
      return res.status(401).json({ error: 'Authentication failed. Please check your HF_TOKEN.' });
    }
    if (error.message.includes('503')) {
        return res.status(503).json({ error: 'The model is currently loading or unavailable. Please try again shortly.' });
    }

    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

// --- START THE SERVER ---

const PORT = process.env.PORT || 8081; // Use port 8081 to match your frontend code
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});