import React, { useState, useEffect } from 'react';
import { X, Send, Paperclip, Inbox, Star, Trash2, Reply, MoreVertical, SendHorizontal, File, PenSquare } from 'lucide-react';

export default function EmailDetail({ email, onReply, onDelete }){
  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <div className="text-6xl mb-4">📨</div>
          <p className="text-lg">Select an email to read</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {email.subject}
          </h1>
          <div className="flex items-center gap-2">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Star"
            >
              <Star className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => onReply(email)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Reply"
            >
              <Reply className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => onDelete(email.id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Delete"
            >
              <Trash2 className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="More options"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {email.from[0].toUpperCase()}
            </div>
            <div>
              <div className="font-medium text-gray-900">{email.from}</div>
              <div className="text-sm text-gray-500">to {email.to}</div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(email.date).toLocaleString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>

      <div className="p-6 overflow-auto flex-1">
        <div className="max-w-3xl mx-auto">
          {email.content.split('\n').map((paragraph, i) => (
            paragraph.startsWith('>') ? (
              <blockquote 
                key={i} 
                className="pl-4 border-l-4 border-gray-200 text-gray-600 my-4"
              >
                {paragraph.substring(1)}
              </blockquote>
            ) : (
              <p 
                key={i} 
                className="text-gray-800 leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            )
          ))}
        </div>
      </div>

      <div className="p-4 border-t bg-white mt-auto">
        <button
          onClick={() => onReply(email)}
          className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Reply className="w-4 h-4" />
          Reply
        </button>
      </div>
    </div>
  );
};