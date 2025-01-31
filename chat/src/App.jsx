import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { format, isToday, isYesterday } from 'date-fns';
import { 
  MessageCircle, 
  Send, 
  UserCircle2, 
  Users, 
  Circle 
} from 'lucide-react';

const SOCKET_URL = 'http://localhost:3001';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [usernameModalOpen, setUsernameModalOpen] = useState(true);
  const [tempUsername, setTempUsername] = useState('');
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Socket initialization
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      if (username) {
        socket.emit('user_join', { username });
      }
    });

    socket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('user_join', ({ username: joinedUsername }) => {
      setMessages(prev => [...prev, {
        type: 'system',
        content: `${joinedUsername} joined the chat`,
        timestamp: new Date()
      }]);
    });

    socket.on('user_left', ({ username: leftUsername }) => {
      setMessages(prev => [...prev, {
        type: 'system',
        content: `${leftUsername} left the chat`,
        timestamp: new Date()
      }]);
    });

    socket.on('online_users', (users) => {
      setOnlineUsers(users);
    });

    socket.on('typing_start', ({ username: typingUsername }) => {
      setTypingUsers(prev => new Set([...prev, typingUsername]));
    });

    socket.on('typing_end', ({ username: typingUsername }) => {
      setTypingUsers(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(typingUsername);
        return newSet;
      });
    });

    return () => {
      ['connect', 'message', 'user_join', 'user_left', 'online_users', 'typing_start', 'typing_end']
        .forEach(event => socket.off(event));
    };
  }, [socket, username]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Typing indicator logic
  const handleTyping = () => {
    if (!socket) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socket.emit('typing_start', { username });

    typingTimeoutRef.current = setTimeout(() => {
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
    socket.emit('typing_end', { username });
  };

  // Set username
  const handleUsernameSubmit = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername.trim());
      socket.emit('user_join', { username: tempUsername.trim() });
      setUsernameModalOpen(false);
    }
  };

  // Format date for messages
  const formatMessageTime = (timestamp) => {
    const messageDate = new Date(timestamp);
    if (isToday(messageDate)) {
      return format(messageDate, 'HH:mm');
    } else if (isYesterday(messageDate)) {
      return `Yesterday, ${format(messageDate, 'HH:mm')}`;
    }
    return format(messageDate, 'dd MMM, HH:mm');
  };

  return (
    <div className="relative h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Username Modal */}
      {usernameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Username</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleUsernameSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Join Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Container */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-72 bg-black shadow-xl border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 bg-blue-600 text-white flex items-center space-x-4">
            <MessageCircle size={32} />
            <h1 className="text-2xl font-bold">ProChat</h1>
          </div>
          
          {/* Online Users */}
          <div className="p-4 border-b">
            <div className="flex items-center text-gray-600 mb-3">
              <Users className="mr-2" />
              <span className="font-semibold">
                Online Users ({onlineUsers.length})
              </span>
            </div>
            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {onlineUsers.map(user => (
                <div 
                  key={user} 
                  className="flex items-center space-x-2 py-1"
                >
                  <Circle className="text-green-500 fill-current" size={10} />
                  <span className="text-sm truncate max-w-[200px]">{user}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <UserCircle2 size={40} className="text-blue-600" />
              <div>
                <h2 className="font-bold text-lg">{username}</h2>
                <p className="text-sm text-gray-500">Active now</p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'system' 
                    ? 'justify-center'
                    : message.username === username 
                      ? 'justify-end' 
                      : 'justify-start'
                }`}
              >
                {message.type === 'system' ? (
                  <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm">
                    {message.content}
                  </div>
                ) : (
                  <div 
                    className={`
                      max-w-[70%] rounded-2xl p-4 shadow-md 
                      ${message.username === username 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-800'}
                    `}
                  >
                    {message.username !== username && (
                      <div className="font-semibold text-sm mb-1">
                        {message.username}
                      </div>
                    )}
                    <div>{message.content}</div>
                    <div 
                      className={`
                        text-xs mt-2 
                        ${message.username === username 
                          ? 'text-blue-200' 
                          : 'text-gray-500'}
                      `}
                    >
                      {formatMessageTime(message.timestamp)}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Typing Indicator */}
          {typingUsers.size > 0 && (
            <div className="px-6 py-2 text-sm text-gray-500">
              {Array.from(typingUsers).join(', ')} 
              {typingUsers.size === 1 ? ' is' : ' are'} typing...
            </div>
          )}

          {/* Message Input */}
          <form 
            onSubmit={sendMessage} 
            className="bg-white p-6 border-t border-gray-200"
          >
            <div className="flex space-x-4">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleTyping}
                placeholder="Type your message..."
                className="
                  flex-1 
                  rounded-full 
                  border 
                  border-gray-300 
                  px-4 
                  py-3 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500
                  transition-all
                  duration-300
                "
              />
              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="
                  bg-blue-600 
                  text-white 
                  rounded-full 
                  p-3 
                  hover:bg-blue-700 
                  transition-colors
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  flex 
                  items-center 
                  justify-center
                "
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;