// frontend/scripts/chatbot.js

document.addEventListener('DOMContentLoaded', () => {
    // This ensures the script runs after the entire HTML page is loaded.

    const chatWindow = document.getElementById('chatWindow');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const typingIndicator = document.getElementById('typingIndicator');

    // --- Function to add a message to the chat window ---
    // This function builds the HTML for a new message and adds it to the chat.
    function addMessageToChatWindow(text, sender) {
        // Create the main container div for the message
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`); // Adds classes: "message" and "user-message" or "bot-message"

        // Create the paragraph element that will hold the text
        const textElement = document.createElement('p');
        textElement.textContent = text;

        // Put the paragraph inside the message container
        messageElement.appendChild(textElement);

        // Add the completed message to the chat window
        chatWindow.appendChild(messageElement);

        // Automatically scroll to the newest message
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }


    // --- Function to handle sending a message ---
    async function handleSendMessage() {
        const userMessage = chatInput.value.trim();

        // Don't send empty messages
        if (userMessage === '') {
            return;
        }

        // 1. Add the user's message to the chat window immediately
        addMessageToChatWindow(userMessage, 'user');

        // 2. Clear the input box and show the typing indicator
        chatInput.value = '';
        typingIndicator.style.display = 'block';

        try {
            // 3. Call your backend to get the AI's response
            const response = await fetch('http://localhost:8081/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const botReply = data.reply;
            
            // 4. THIS IS THE PART YOU ASKED FOR: Add the bot's reply
            addMessageToChatWindow(botReply, 'bot');

        } catch (error) {
            console.error('Error getting bot response:', error);
            addMessageToChatWindow('Sorry, I seem to be having trouble connecting. Please try again later.', 'bot');
        } finally {
            // 5. Hide the typing indicator, no matter what happens
            typingIndicator.style.display = 'none';
        }
    }


    // --- Event Listeners ---
    // Handle clicks on the send button
    sendButton.addEventListener('click', handleSendMessage);

    // Also handle pressing "Enter" in the input field
    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });

});