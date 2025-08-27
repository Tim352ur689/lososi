const socket = io();

const messageInput = document.querySelector('.message-input');
const messagesContainer = document.querySelector('.messages');
const sendButton = document.querySelector('.send-button');
const usernameInput = document.querySelector('.username-input');
const emailInput = document.querySelector('.email-input');
const avatarSelect = document.querySelector('.avatar-select');
const registerButton = document.querySelector('.register-button');
const chatContainer = document.querySelector('.chat-container');
const registrationContainer = document.querySelector('.registration-container');

registerButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const avatar = avatarSelect.value;

    if (username && email && avatar) {
        const userData = { username, email, avatar };
        socket.emit('register', userData);
        registrationContainer.style.display = 'none';
        chatContainer.style.display = 'flex';
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('sendMessage', message);
        messageInput.value = '';
        addMessageToChat({ username: 'Вы', text: message, avatar: '' }, 'sent'); // Добавляем сообщение только у отправителя
    }
}

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

socket.on('loadMessages', (messages) => {
    messages.forEach((msg) => {
        addMessageToChat(msg, 'received');
    });
});

socket.on('receiveMessage', (msg) => {
    addMessageToChat(msg, 'received');
});

function addMessageToChat(msg, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    
    // Добавляем аватар, если он есть
    if (msg.avatar) {
        const avatarElement = document.createElement('img');
        avatarElement.src = msg.avatar;
        avatarElement.alt = `${msg.username}'s avatar`;
        avatarElement.classList.add('avatar');
        messageElement.appendChild(avatarElement);
    }

    const textElement = document.createElement('span');
    textElement.textContent = `${msg.username}: ${msg.text}`;
    messageElement.appendChild(textElement);
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Прокрутка вниз
}
