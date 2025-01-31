import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';

const ChatApp = React.lazy(() => import('chatApp/App').catch(() => ({
  default: () => <div className="text-red-500 text-center">Chat App Error</div>
})));

const EmailApp = React.lazy(() => import('emailApp/App').catch(() => ({
  default: () => <div className="text-red-500 text-center">Email App Error</div>
})));

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 p-6">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chat" element={<ChatApp />} />
                <Route path="/email" element={<EmailApp />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Layout>
    </BrowserRouter>
  );
}