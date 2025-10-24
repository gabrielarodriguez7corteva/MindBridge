// Simple fallback responses
const responses = {
  anxiety: [
    "I understand you're feeling anxious. Let's try a breathing exercise together.",
    "Would you like to talk about what's making you anxious?"
  ],
  depression: [
    "I'm here to listen. Remember, these feelings are temporary.",
    "Have you tried any activities that usually make you feel better?"
  ]
};

function detectKeywords(input) {
  input = (input || "").toLowerCase();
  if (input.includes("anxious")) return "anxiety";
  if (input.includes("depressed") || input.includes("sad")) return "depression";
  return null;
}

function generateResponse(keyword) {
  if (keyword && responses[keyword]) {
    const options = responses[keyword];
    return options[Math.floor(Math.random() * options.length)];
  }
  return "I'm here for you. Tell me more.";
}

function appendMessage(role, text) {
  const chatWindow = document.getElementById("chatWindow");
  const messageDiv = document.createElement("div");
  
  // Style messages for better readability
  const roleLabel = document.createElement("strong");
  roleLabel.textContent = (role === "user" ? "You: " : "Bot: ");
  
  messageDiv.appendChild(roleLabel);
  messageDiv.appendChild(document.createTextNode(text));
  
  messageDiv.style.margin = "6px 0";
  chatWindow.appendChild(messageDiv);
  
  // Auto-scroll to the latest message
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// FIXED: Function now accepts userMessage as an argument
async function getChatbotResponse(userMessage) {
  try {
    // This fetch call will attempt to contact your local server
    const res = await fetch('http://localhost:8081/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });
    
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Backend error ${res.status}: ${text}`);
    }
    
    const data = await res.json();
    if (!data.reply) throw new Error('No reply in response from backend');
    return data.reply;

  } catch (err) {
    console.error('getChatbotResponse error:', err);
    // Fallback to simple local responses if the server fails
    // This now works correctly because userMessage is passed into the function
    const keyword = detectKeywords(userMessage);
    return generateResponse(keyword);
  }
}

// This block runs after the HTML page content has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('sendButton');
  const inputEl = document.getElementById('chatInput');

  if (!sendBtn || !inputEl) {
    console.error('Critical Error: Missing #sendButton or #chatInput elements in the HTML.');
    return;
  }

  async function handleSend() {
    const userMessage = inputEl.value.trim();
    if (!userMessage) return; // Don't send empty messages

    appendMessage('user', userMessage);
    inputEl.value = ''; // Clear the input field

    // Get the bot's response and append it
    const botReply = await getChatbotResponse(userMessage);
    appendMessage('assistant', botReply);
  }

  // Event listeners for sending the message
  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keydown', (e) => {
    // Send message when Enter key is pressed
    if (e.key === 'Enter') {
      handleSend();
    }
  });
});