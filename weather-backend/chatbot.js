// Simple chatbot functionality without AI
class WeatherChatbot {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        // DOM elements
        this.toggleBtn = document.getElementById('chatbot-toggle');
        this.chatWindow = document.getElementById('chat-window');
        this.closeBtn = document.getElementById('chat-close');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('chat-send');
        this.messagesContainer = document.getElementById('chat-messages');
        this.typingIndicator = document.getElementById('typing-indicator');

        // Event listeners
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatWindow.style.display = 'block';
            this.chatInput.focus();
        } else {
            this.closeChat();
        }
    }

    closeChat() {
        this.isOpen = false;
        this.chatWindow.style.display = 'none';
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Add user message to UI
        this.addMessage(message, 'user');

        // Clear input
        this.chatInput.value = '';

        // Show typing indicator
        this.showTyping();

        // Generate simple response
        setTimeout(() => {
            this.generateSimpleResponse(message);
        }, 1000);
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;

        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    showTyping() {
        this.typingIndicator.style.display = 'block';
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }

    generateSimpleResponse(userMessage) {
        // Hide typing indicator
        this.hideTyping();

        // Simple responses based on keywords
        const message = userMessage.toLowerCase();
        let response = "I'm here to help with weather information!";

        if (message.includes('weather') || message.includes('rain') || message.includes('sunny')) {
            response = "I can help you check the current weather conditions. Try searching for a city in the search bar above!";
        } else if (message.includes('forecast')) {
            response = "Check out our forecast page for detailed weather predictions!";
        } else if (message.includes('temperature') || message.includes('temp')) {
            response = "The temperature information is displayed in the cards on the main page.";
        } else if (message.includes('hello') || message.includes('hi')) {
            response = "Hello! Welcome to the Weather App. How can I help you today?";
        } else if (message.includes('bye') || message.includes('goodbye')) {
            response = "Goodbye! Have a great day!";
        }

        // Add response to chat
        this.addMessage(response, 'bot');
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherChatbot();
});
