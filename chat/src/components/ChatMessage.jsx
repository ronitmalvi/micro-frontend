import React from 'react';

export default function ChatMessage({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`
        max-w-xs lg:max-w-md px-4 py-2 rounded-lg 
        ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100'}
      `}>
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${isOwn ? 'text-blue-100' : 'text-gray-600'}`}>
            {message.username}
          </span>
        </div>
        <p className="mt-1">{message.text}</p>
        <div className="flex justify-between items-center mt-2">
          <span className={`text-xs ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
          {isOwn && (
            <span className="text-xs text-blue-100">
              {message.isRead ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}