// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5000", "http://localhost:5001"],
    methods: ["GET", "POST"]
  }
});

const onlineUsers = new Set();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('user_join', ({ username }) => {
    socket.username = username;
    onlineUsers.add(username);
    io.emit('user_join', { username });
    io.emit('online_users', Array.from(onlineUsers));
  });

  // Handle messages
  socket.on('message', (message) => {
    io.emit('message', {
      ...message,
      id: Date.now() + Math.random(),
      timestamp: new Date()
    });
  });

  // Handle typing indicators
  socket.on('typing_start', ({ username }) => {
    socket.broadcast.emit('typing_start', { username });
  });

  socket.on('typing_end', ({ username }) => {
    socket.broadcast.emit('typing_end', { username });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (socket.username) {
      onlineUsers.delete(socket.username);
      io.emit('user_left', { username: socket.username });
      io.emit('online_users', Array.from(onlineUsers));
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});