import { useState } from 'react';
import ChatList from './components/ChatList';
import ChatInput from './components/ChatInput';

export default function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      user: 'You',
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat Room</h2>
      </div>
      
      <ChatList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}