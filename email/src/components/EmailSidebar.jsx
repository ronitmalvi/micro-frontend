import React, { useState, useEffect } from 'react';
import { X, Send, Paperclip, Inbox, Star, Trash2, Reply, MoreVertical, SendHorizontal, File, PenSquare } from 'lucide-react';

export default function EmailSidebar({ currentFolder, unreadCount, onCompose, onFolderChange }){
  const folders = [
    { id: 'inbox', name: 'Inbox', icon: Inbox },
    { id: 'sent', name: 'Sent', icon: SendHorizontal },
    { id: 'drafts', name: 'Drafts', icon: File },
    { id: 'trash', name: 'Trash', icon: Trash2 }
  ];

  return (
    <div className="w-64 border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <button
          onClick={onCompose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 flex items-center gap-2 transition-colors"
        >
          <PenSquare className="w-5 h-5" />
          <span>Compose</span>
        </button>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {folders.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onFolderChange(id)}
            className={`
              w-full px-4 py-3 rounded-lg flex items-center justify-between
              ${currentFolder === id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}
            `}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </div>
            {id === 'inbox' && unreadCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};