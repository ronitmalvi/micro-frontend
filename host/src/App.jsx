import React,{ Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const ChatApp = React.lazy(() => import('chatApp/App'));
const EmailApp = React.lazy(() => import('emailApp/App'));

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            <Suspense fallback={
              <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chat" element={<ChatApp />} />
                <Route path="/email" element={<EmailApp />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </Layout>
    </BrowserRouter>
  );
}