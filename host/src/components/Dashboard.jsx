import React from 'react';
import AppCard from './AppCard';

export default function Dashboard() {
  const apps = [
    { 
      title: 'Chat App', 
      description: 'Real-time conversations seamlessly.',
      route: '/chat'
    },
    { 
      title: 'Email App', 
      description: 'Manage emails efficiently.',
      route: '/email'
    }
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps.map((app, index) => (
          <AppCard 
            key={index} 
            title={app.title} 
            description={app.description}
            route={app.route}
          />
        ))}
      </div>
    </div>
  );
}