import React from 'react';

export default function EmailList({ emails, onEmailSelect, currentFolder }) {
  if (!emails.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        No emails in {currentFolder}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      {emails.map(email => (
        <div
          key={email.id}
          onClick={() => onEmailSelect(email)}
          className={`p-4 border-b cursor-pointer hover:bg-gray-50
            ${!email.read ? 'font-semibold bg-blue-50' : ''}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {currentFolder === 'sent' ? `To: ${email.to}` : `From: ${email.from}`}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(email.date).toLocaleString()}
            </span>
          </div>
          <div className="text-base mt-1">{email.subject}</div>
          <div className="text-sm text-gray-600 truncate mt-1">
            {email.content}
          </div>
        </div>
      ))}
    </div>
  );
}