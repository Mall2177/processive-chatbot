// References to DOM elements
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Event listener for the Send button
sendButton.addEventListener('click', () => {
    sendMessage();
});

// Allow sending message on Enter key press
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Function to send user message
function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    displayMessage(message, 'user');
    userInput.value = '';

    // Display 'Typing...' indicator
    displayMessage('Typing...', 'bot', true);

    // Send the message to the server (to be implemented)
    fetch('https://your-backend-server.com/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        // Remove 'Typing...' indicator
        removeTypingIndicator();
        displayMessage(data.reply, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
        removeTypingIndicator();
        displayMessage('Sorry, there was an error. Please try again later.', 'bot');
    });
}

// Function to display messages
function displayMessage(message, sender, isTyping = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    if (isTyping) {
        messageElement.classList.add('typing');
    }
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Function to remove 'Typing...' indicator
function removeTypingIndicator() {
    const typingElements = document.getElementsByClassName('typing');
    while (typingElements.length > 0) {
        typingElements[0].parentNode.removeChild(typingElements[0]);
    }
}