import React from 'react';

export default function EmailSidebar({ currentFolder, onFolderChange, unreadCount }) {
  const folders = [
    { id: 'inbox', name: 'Inbox', icon: '📥' },
    { id: 'sent', name: 'Sent', icon: '📤' },
    { id: 'drafts', name: 'Drafts', icon: '📝' },
    { id: 'trash', name: 'Trash', icon: '🗑️' }
  ];

  return (
    <div className="w-64 border-r bg-gray-50 p-4">
      <button
        onClick={() => onFolderChange('compose')}
        className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 mb-4 hover:bg-blue-600"
      >
        Compose
      </button>
      
      <div className="space-y-2">
        {folders.map(folder => (
          <button
            key={folder.id}
            onClick={() => onFolderChange(folder.id)}
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between
              ${currentFolder === folder.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <span className="flex items-center">
              {folder.icon} <span className="ml-2">{folder.name}</span>
            </span>
            {folder.id === 'inbox' && unreadCount > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}