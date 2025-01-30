import React from "react";

export default function ChatList({ messages }) {
    return (
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwn={message.user === 'You'}
          />
        ))}
      </div>
    );
  }