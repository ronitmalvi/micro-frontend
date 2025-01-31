import React, { useState, useEffect } from 'react';
import ComposeEmail from './components/ComposeEmail';
import EmailDetail from './components/EmailDetail';
import EmailList from './components/EmailList';
import EmailSidebar from './components/EmailSidebar';

const App = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [isComposing, setIsComposing] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const handleCompose = () => {
    setIsComposing(true);
    setReplyTo(null);
  };

  const handleReply = (email) => {
    setIsComposing(true);
    setReplyTo(email);
  };

  const handleEmailSent = (newEmail) => {
    setEmails([newEmail, ...emails]);
    setIsComposing(false);
  };

  const handleDeleteEmail = (emailId) => {
    setEmails(emails.filter((email) => email.id !== emailId));
    setSelectedEmail(null);
  };

  const unreadCount = emails.filter(email => !email.read && currentFolder === 'inbox').length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex h-[calc(100vh-2rem)]">
            <EmailSidebar 
              currentFolder={currentFolder}
              unreadCount={unreadCount}
              onCompose={handleCompose}
              onFolderChange={setCurrentFolder}
            />
            <EmailList 
              emails={emails}
              currentFolder={currentFolder}
              onSelect={setSelectedEmail}
            />
            <EmailDetail 
              email={selectedEmail}
              onReply={handleReply}
              onDelete={handleDeleteEmail}
            />
          </div>
        </div>
      </div>
      {isComposing && (
        <ComposeEmail
          replyTo={replyTo}
          onClose={() => setIsComposing(false)}
          onSend={handleEmailSent}
        />
      )}
    </div>
  );
};
export default App;