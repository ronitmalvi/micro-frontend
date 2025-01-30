import React,{ Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Import remote modules
const ChatApp = React.lazy(() => import('chatApp/App'));
const EmailApp = React.lazy(() => import('emailApp/App'));

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: 0 }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/chat">Chat</Link></li>
            <li><Link to="/email">Email</Link></li>
          </ul>
        </nav>
        
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<div>Welcome to the Host App!</div>} />
            <Route path="/chat" element={<ChatApp />} />
            <Route path="/email" element={<EmailApp />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;