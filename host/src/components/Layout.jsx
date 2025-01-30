import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900">Micro Frontend App</h1>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}