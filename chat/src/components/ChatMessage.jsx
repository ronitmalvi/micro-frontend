import React from 'react';

export default function ChatMessage({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`
        max-w-xs lg:max-w-md px-4 py-2 rounded-lg 
        ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100'}
      `}>
        <p className="text-sm font-medium">{message.user}</p>
        <p>{message.text}</p>
        <p className="text-xs mt-1 opacity-75">
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}