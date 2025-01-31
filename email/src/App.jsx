import React, { useState, useEffect } from 'react';
import EmailSidebar from './components/EmailSidebar';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import ComposeEmail from './components/ComposeEmail';


const initialEmails = [
];

export default function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [composing, setComposing] = useState(false);
  const [replyToEmail, setReplyToEmail] = useState(null);

  const handleFolderChange = (folder) => {
    setCurrentFolder(folder);
    setSelectedEmail(null);
    if (folder === 'compose') {
      setComposing(true);
    }
  };

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    if (!email.read) {
      setEmails(emails.map(e => 
        e.id === email.id ? { ...e, read: true } : e
      ));
    }
  };

  const handleComposeDone = (newEmail) => {
    if (newEmail) {
      setEmails([
        { ...newEmail, folder: 'sent' },
        ...emails
      ]);
    }
    setComposing(false);
    setReplyToEmail(null);
  };

  const handleReply = (email) => {
    setReplyToEmail(email);
    setComposing(true);
  };

  const handleDelete = (emailId) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, folder: 'trash' } : email
    ));
    setSelectedEmail(null);
  };

  const filteredEmails = emails.filter(email => email.folder === currentFolder);
  const unreadCount = emails.filter(email => !email.read && email.folder === 'inbox').length;

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-white shadow-lg rounded-lg overflow-hidden">
      <EmailSidebar
        currentFolder={currentFolder}
        onFolderChange={handleFolderChange}
        unreadCount={unreadCount}
      />
      
      <div className="flex-1 flex">
        <EmailList
          emails={filteredEmails}
          onEmailSelect={handleEmailSelect}
          currentFolder={currentFolder}
        />
        
        <div className="flex-1 border-l">
          <EmailDetail
            email={selectedEmail}
            onReply={handleReply}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {composing && (
        <ComposeEmail
          onClose={handleComposeDone}
          replyTo={replyToEmail}
        />
      )}
    </div>
  );
}