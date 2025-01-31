import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatList({ messages, username }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          isOwn={message.username === username}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}