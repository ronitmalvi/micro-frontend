import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import ComposeEmail from './components/ComposeEmail';

// Mock data - replace with API calls in production
const mockEmails = [
  {
    id: 1,
    from: 'john@example.com',
    to: 'user@example.com',
    subject: 'Weekly Report',
    body: 'Here is the weekly report you requested...',
    date: '2025-01-30T10:00:00',
    read: true,
    folder: 'inbox'
  },
  {
    id: 2,
    from: 'user@example.com',
    to: 'sarah@example.com',
    subject: 'Meeting Tomorrow',
    body: 'Looking forward to our meeting tomorrow...',
    date: '2025-01-30T09:30:00',
    read: true,
    folder: 'sent'
  },
  // Add more mock emails as needed
];

const App = () => {
  const [emails, setEmails] = useState(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [showCompose, setShowCompose] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter emails based on current folder and search query
  const filteredEmails = emails
    .filter(email => email.folder === currentFolder)
    .filter(email => 
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleCompose = () => {
    setShowCompose(true);
    setSelectedEmail(null);
  };

  const handleSendEmail = (newEmail) => {
    const emailToSend = {
      id: emails.length + 1,
      ...newEmail,
      date: new Date().toISOString(),
      read: true,
      folder: 'sent'
    };
    setEmails([...emails, emailToSend]);
    setShowCompose(false);
  };

  const handleDeleteEmail = (emailId) => {
    setEmails(emails.map(email => 
      email.id === emailId 
        ? { ...email, folder: 'trash' }
        : email
    ));
    setSelectedEmail(null);
  };

  const markAsRead = (emailId) => {
    setEmails(emails.map(email =>
      email.id === emailId
        ? { ...email, read: true }
        : email
    ));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        currentFolder={currentFolder}
        setCurrentFolder={setCurrentFolder}
        onCompose={handleCompose}
        folders={[
          { id: 'inbox', name: 'Inbox', count: emails.filter(e => e.folder === 'inbox').length },
          { id: 'sent', name: 'Sent', count: emails.filter(e => e.folder === 'sent').length },
          { id: 'drafts', name: 'Drafts', count: emails.filter(e => e.folder === 'drafts').length },
          { id: 'trash', name: 'Trash', count: emails.filter(e => e.folder === 'trash').length }
        ]}
      />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 shadow">
          <input
            type="text"
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          <EmailList
            emails={filteredEmails}
            selectedEmail={selectedEmail}
            onSelectEmail={setSelectedEmail}
            onMarkAsRead={markAsRead}
          />
          
          {selectedEmail && (
            <EmailView
              email={emails.find(e => e.id === selectedEmail)}
              onDelete={handleDeleteEmail}
              onClose={() => setSelectedEmail(null)}
            />
          )}
          
          {showCompose && (
            <ComposeEmail
              onSend={handleSendEmail}
              onClose={() => setShowCompose(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;