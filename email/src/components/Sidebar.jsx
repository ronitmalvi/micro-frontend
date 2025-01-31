import React from 'react';
import { Mail, Send, File, Trash } from 'lucide-react';

const Sidebar = ({ currentFolder, setCurrentFolder, onCompose, folders }) => {
  const getIcon = (id) => {
    switch(id) {
      case 'inbox': return <Mail size={20} />;
      case 'sent': return <Send size={20} />;
      case 'drafts': return <File size={20} />;
      case 'trash': return <Trash size={20} />;
      default: return <Mail size={20} />;
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg">
      <button
        onClick={onCompose}
        className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg m-4 hover:bg-blue-600 transition-colors"
      >
        Compose
      </button>
      
      <nav className="mt-4">
        {folders.map(folder => (
          <button
            key={folder.id}
            onClick={() => setCurrentFolder(folder.id)}
            className={`w-full flex items-center justify-between px-4 py-2 ${
              currentFolder === folder.id ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {getIcon(folder.id)}
              <span>{folder.name}</span>
            </div>
            <span className="text-sm text-gray-500">{folder.count}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;