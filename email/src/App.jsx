import React, { useState } from 'react';

const initialEmails = [
  {
    id: 1,
    subject: 'Welcome to Email App',
    sender: 'system@email.com',
    content: 'This is your first email in the system.',
    date: '2024-01-29'
  },
  {
    id: 2,
    subject: 'Getting Started Guide',
    sender: 'support@email.com',
    content: 'Here are some tips to get you started...',
    date: '2024-01-29'
  }
];

function App() {
  const [emails] = useState(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Email Application</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
        {/* Email List */}
        <div style={{ borderRight: '1px solid #ccc', padding: '10px' }}>
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              style={{
                padding: '10px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                background: selectedEmail?.id === email.id ? '#f0f0f0' : 'white'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{email.subject}</div>
              <div style={{ fontSize: '0.9em', color: '#666' }}>{email.sender}</div>
              <div style={{ fontSize: '0.8em', color: '#888' }}>{email.date}</div>
            </div>
          ))}
        </div>

        {/* Email Content */}
        <div style={{ padding: '10px' }}>
          {selectedEmail ? (
            <div>
              <h3>{selectedEmail.subject}</h3>
              <div style={{ margin: '10px 0', color: '#666' }}>
                From: {selectedEmail.sender}
                <br />
                Date: {selectedEmail.date}
              </div>
              <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '4px' }}>
                {selectedEmail.content}
              </div>
            </div>
          ) : (
            <div style={{ color: '#666', textAlign: 'center', marginTop: '20px' }}>
              Select an email to view its content
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;