import React from 'react';

export default function EmailDetail({ email, onReply, onDelete }) {
  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select an email to read
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{email.subject}</h2>
        <div className="space-x-2">
          <button
            onClick={() => onReply(email)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reply
          </button>
          <button
            onClick={() => onDelete(email.id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mb-4 text-sm">
        <div><strong>From:</strong> {email.from}</div>
        <div><strong>To:</strong> {email.to}</div>
        <div><strong>Date:</strong> {new Date(email.date).toLocaleString()}</div>
      </div>

      <div className="prose max-w-none">
        {email.content.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}