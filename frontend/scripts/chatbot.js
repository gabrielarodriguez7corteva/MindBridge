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
  input = input.toLowerCase();
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

function getResponse() {
  const input = document.getElementById("userInput").value;
  const keyword = detectKeywords(input);
  const reply = generateResponse(keyword);
  document.getElementById("response").innerText = reply;
}
