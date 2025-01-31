import React from 'react';

export default function ChatHeader({ activeUsers }) {
  return (
    <div className="p-4 border-b bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chat Room</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {activeUsers} active users
          </span>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}