import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-white shadow-lg">
      <nav className="mt-5 px-2">
        <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
          Dashboard
        </Link>
        <Link to="/chat" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
          Chat
        </Link>
        <Link to="/email" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
          Email
        </Link>
      </nav>
    </div>
  );
}