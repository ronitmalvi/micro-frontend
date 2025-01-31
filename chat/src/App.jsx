// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { format } from 'date-fns';

const SOCKET_URL = 'http://localhost:3001';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Socket initialization
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Generate random username if not set
    if (!username) {
      setUsername(`User${Math.floor(Math.random() * 10000)}`);
    }

    return () => newSocket.close();
  }, []);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      socket.emit('user_join', { username });
    });

    socket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('user_join', ({ username }) => {
      setMessages(prev => [...prev, {
        type: 'system',
        content: `${username} joined the chat`,
        timestamp: new Date()
      }]);
    });

    socket.on('user_left', ({ username }) => {
      setMessages(prev => [...prev, {
        type: 'system',
        content: `${username} left the chat`,
        timestamp: new Date()
      }]);
    });

    socket.on('online_users', (users) => {
      setOnlineUsers(users);
    });

    socket.on('typing_start', ({ username }) => {
      setTypingUsers(prev => new Set([...prev, username]));
    });

    socket.on('typing_end', ({ username }) => {
      setTypingUsers(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(username);
        return newSet;
      });
    });

    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('user_join');
      socket.off('user_left');
      socket.off('online_users');
      socket.off('typing_start');
      socket.off('typing_end');
    };
  }, [socket, username]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle typing indicator
  const handleTyping = () => {
    if (!socket) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing_start', { username });
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('typing_end', { username });
    }, 1000);
  };

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !socket) return;

    const message = {
      content: messageInput,
      username,
      timestamp: new Date(),
      type: 'user'
    };

    socket.emit('message', message);
    setMessageInput('');
    setIsTyping(false);
    socket.emit('typing_end', { username });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Chat Room</h1>
          <div className="text-sm text-gray-600">
            Online Users: {onlineUsers.length}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.type === 'system'
                ? 'text-center text-gray-500 text-sm'
                : message.username === username
                ? 'flex justify-end'
                : 'flex justify-start'
            }`}
          >
            {message.type !== 'system' && (
              <div
                className={`max-w-[70%] break-words rounded-lg p-3 ${
                  message.username === username
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                <div className="text-sm font-semibold mb-1">
                  {message.username}
                </div>
                <div>{message.content}</div>
                <div className="text-xs mt-1 opacity-75">
                  {format(new Date(message.timestamp), 'HH:mm')}
                </div>
              </div>
            )}
            {message.type === 'system' && (
              <div className="bg-gray-100 px-4 py-2 rounded-full">
                {message.content}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {typingUsers.size > 0 && (
        <div className="px-4 py-2 text-sm text-gray-500">
          {Array.from(typingUsers).join(', ')} 
          {typingUsers.size === 1 ? ' is' : ' are'} typing...
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={sendMessage} className="bg-white p-4 shadow-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleTyping}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;