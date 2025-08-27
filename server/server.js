const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = {};
let messages = [];

// Функция для генерации уникального идентификатора
function generateUniqueId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

app.use(express.static('../client'));

io.on('connection', (socket) => {
    console.log('New user connected');

    // Обработка регистрации пользователя
    socket.on('register', (userData) => {
        const { username, email, avatar } = userData;
        const uniqueId = generateUniqueId();
        users[socket.id] = { username, email, avatar, uniqueId };
        socket.emit('registered', { username, uniqueId });
    });

    // Отправка всех сообщений при подключении
    socket.emit('loadMessages', messages);

    // Обработка новых сообщений
    socket.on('sendMessage', (message) => {
        const user = users[socket.id];
        const msg = { username: user.username, text: message, avatar: user.avatar };
        messages.push(msg);
        // Отправляем сообщение всем, кроме отправителя
        socket.broadcast.emit('receiveMessage', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        delete users[socket.id]; // Удаляем пользователя при отключении
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
