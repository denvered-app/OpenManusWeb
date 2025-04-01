// connected_chatManager.js - Manages chat interface and messages
export class ChatManager {
    constructor(sendMessageCallback) {
        this.chatContainer = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-btn');
        this.sendMessageCallback = sendMessageCallback;
    }

    // Initialize chat manager
    init() {
        // Bind send button click event
        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });
        // Bind input field enter key event
        this.userInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.sendMessage();
            }
        });
        // Auto-adjust textarea height
        this.userInput.addEventListener('input', () => {
            this.adjustTextareaHeight();
        });
    }

    // Send message
    sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;
        // Call callback function to send message
        if (this.sendMessageCallback) {
            this.sendMessageCallback(message);
        }
        // Clear input field
        this.userInput.value = '';
        this.adjustTextareaHeight();
    }

    // Add user message
    addUserMessage(message) {
        const messageElement = this.createMessageElement('user-message', message);
        this.chatContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    // Add AI message
    addAIMessage(message) {
        const messageElement = this.createMessageElement('ai-message', message);
        this.chatContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    // Add system message
    addSystemMessage(message) {
        const messageElement = this.createMessageElement('system-message', message);
        this.chatContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    // Create message element
    createMessageElement(className, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        // Handle Markdown formatting
        const formattedContent = this.formatMessage(content);
        contentDiv.innerHTML = formattedContent;
        messageDiv.appendChild(contentDiv);
        return messageDiv;
    }

    // Format message content (handle simple Markdown)
    formatMessage(content) {
        if (!content) return '';
        // Escape HTML special characters
        let formatted = content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        // Handle code blocks
        formatted = formatted.replace(/\`\`\`([^\`]+)\`\`\`/g, '<pre><code>$1</code></pre>');
        // Handle inline code
        formatted = formatted.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
        // Handle bold
        formatted = formatted.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
        // Handle italic
        formatted = formatted.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
        // Handle line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    }

    // Clear all messages
    clearMessages() {
        this.chatContainer.innerHTML = '';
    }

    // Scroll to bottom
    scrollToBottom() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    // Adjust textarea height
    adjustTextareaHeight() {
        this.userInput.style.height = 'auto';
        this.userInput.style.height = (this.userInput.scrollHeight) + 'px';
    }
}