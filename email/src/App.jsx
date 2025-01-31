import React,{ useState } from 'react';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import ComposeEmail from './components/ComposeEmail';

const initialEmails = [
  {
    id: 1,
    subject: 'Welcome',
    sender: 'system@example.com',
    content: 'Welcome to the email application!',
    date: new Date().toISOString(),
    read: false
  }
];

export default function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isComposing, setIsComposing] = useState(false);

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    if (!email.read) {
      setEmails(emails.map(e => 
        e.id === email.id ? { ...e, read: true } : e
      ));
    }
  };

  const handleSendEmail = (emailData) => {
    const newEmail = {
      id: Date.now(),
      ...emailData,
      sender: 'you@example.com',
      date: new Date().toISOString(),
      read: true
    };
    setEmails([newEmail, ...emails]);
    setIsComposing(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div className="w-80 border-r bg-white overflow-y-auto">
        <div className="p-4 border-b">
          <button
            onClick={() => setIsComposing(true)}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Compose
          </button>
        </div>
        <EmailList
          emails={emails}
          selectedId={selectedEmail?.id}
          onSelectEmail={handleSelectEmail}
        />
      </div>
      
      <div className="flex-1 bg-white overflow-y-auto">
        {selectedEmail ? (
          <EmailDetail email={selectedEmail} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select an email to read
          </div>
        )}
      </div>

      {isComposing && (
        <ComposeEmail
          onSubmit={handleSendEmail}
          onCancel={() => setIsComposing(false)}
        />
      )}
    </div>
  );
}