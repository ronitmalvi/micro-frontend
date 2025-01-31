import React from 'react';
import { Link } from 'react-router-dom';

export default function AppCard({ title, description, route }) {
  return (
    <Link 
      to={route} 
      className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}