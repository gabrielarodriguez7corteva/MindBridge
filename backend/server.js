//require('dotenv').config();

const express = require('express');
const admin = require('firebase-admin');
const { HfInference } = require('@huggingface/inference');
const cors = require('cors'); // <--- THIS IS THE LINE YOU NEED TO ADD/FIX

const app = express();
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
app.use(cors());
app.use(express.json());

const serviceAccount = require('./config/mindbridge-546bc-firebase-adminsdk-fbsvc-deaab58c95.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mindbridge-546bc-default-rtdb.firebaseio.com"
});

const db = admin.database();

// Test route


// app.get('/test-firebase', (req, res) => {
//   res.send('Firebase test route is working!');
// });

app.post('/api/chat', async (req, res) => {
  try {
    // Get the user's message from the request body
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // Call the Hugging Face API
    const response = await hf.textGeneration({
      model: 'microsoft/DialoGPT-medium',
      inputs: message,
      parameters: { max_new_tokens: 100 }
    });

    // Send the generated text back to the frontend
    res.json({ reply: response.generated_text });

  } catch (error) {
    console.error('Error calling Hugging Face API:', error);
    res.status(500).json({ error: 'Failed to generate a response.' });
  }
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// Export the app for testing purposes
module.exports = app;
// Export the database for use in other modules
module.exports.db = db;
// Export the admin instance for use in other modules
module.exports.admin = admin; 



