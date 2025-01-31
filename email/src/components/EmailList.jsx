import React, { useState, useEffect } from 'react';
import { X, Send, Paperclip, Inbox, Star, Trash2, Reply, MoreVertical, SendHorizontal, File, PenSquare } from 'lucide-react';


export default function EmailList({ emails, currentFolder, onSelect }){
  if (!emails.length) {
    return (
      <div className="w-96 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📭</div>
          <p>No emails in {currentFolder}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 overflow-y-auto divide-y divide-gray-200">
      {emails.map(email => (
        <div
          key={email.id}
          onClick={() => onSelect(email)}
          className={`
            p-4 cursor-pointer
            ${!email.read ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'}
          `}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              {email.from[0].toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between items-baseline">
                <span className={`text-sm ${!email.read ? 'font-semibold' : ''}`}>
                  {email.from}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(email.date).toLocaleString()}
                </span>
              </div>
              <h3 className={`text-sm mt-1 ${!email.read ? 'font-semibold' : ''}`}>
                {email.subject}
              </h3>
              <p className="text-sm text-gray-600 truncate mt-1">
                {email.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};