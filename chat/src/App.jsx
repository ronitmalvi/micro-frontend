import React, { useState, useEffect } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatList from './components/ChatList';
import ChatInput from './components/ChatInput';

// Simulate a username for now - in a real app, this would come from authentication
const username = `User_${Math.floor(Math.random() * 1000)}`;

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeUsers, setActiveUsers] = useState(1);

  // Simulate initial messages
  useEffect(() => {
    const initialMessage = {
      id: 1,
      username: 'System',
      text: `Welcome to the chat room, ${username}!`,
      timestamp: new Date().toISOString(),
      isRead: true
    };
    setMessages([initialMessage]);
  }, []);

  // Simulate other users joining/leaving
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => Math.max(1, prev + (Math.random() > 0.5 ? 1 : -1)));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      username,
      text,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Simulate message being read after 2 seconds
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, isRead: true } : msg
        )
      );
    }, 2000);

    // Simulate response after 1-3 seconds
    if (Math.random() > 0.5) {
      const delay = 1000 + Math.random() * 2000;
      setTimeout(() => {
        const response = {
          id: Date.now(),
          username: 'ChatBot',
          text: `Thanks for your message: "${text.substring(0, 20)}${text.length > 20 ? '...' : ''}"`,
          timestamp: new Date().toISOString(),
          isRead: true
        };
        setMessages(prev => [...prev, response]);
      }, delay);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white shadow-lg rounded-lg">
      <ChatHeader activeUsers={activeUsers} />
      
      <ChatList 
        messages={messages}
        username={username}
      />
      
      <div className="px-4 py-2">
        {isTyping && (
          <span className="text-sm text-gray-500">Someone is typing...</span>
        )}
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
        setIsTyping={setIsTyping}
      />
    </div>
  );
}