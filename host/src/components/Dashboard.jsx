import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Welcome to Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium">Chat App</h3>
          <p className="text-gray-600">Real-time chat application</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium">Email App</h3>
          <p className="text-gray-600">Email management system</p>
        </div>
      </div>
    </div>
  );
}