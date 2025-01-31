import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, MessageCircleIcon, MailIcon } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { icon: HomeIcon, label: 'Dashboard', path: '/' },
    { icon: MessageCircleIcon, label: 'Chat', path: '/chat' },
    { icon: MailIcon, label: 'Email', path: '/email' }
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Navigation</h2>
      <nav className="space-y-2">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link 
            key={path} 
            to={path} 
            className={`flex items-center px-4 py-3 rounded-lg transition ${
              location.pathname === path 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-700 hover:bg-blue-50'
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}