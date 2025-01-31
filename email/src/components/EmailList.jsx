import React from "react"; 

const EmailList = ({ emails, selectedEmail, onSelectEmail, onMarkAsRead }) => {
  return (
    <div className="w-1/3 border-r overflow-y-auto">
      {emails.map(email => (
        <div
          key={email.id}
          onClick={() => {
            onSelectEmail(email.id);
            onMarkAsRead(email.id);
          }}
          className={`p-4 border-b cursor-pointer ${
            selectedEmail === email.id ? 'bg-blue-50' : 'hover:bg-gray-50'
          } ${!email.read ? 'font-semibold' : ''}`}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm font-medium">{email.from}</span>
            <span className="text-xs text-gray-500">
              {new Date(email.date).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
          <div className="text-sm font-medium mb-1">{email.subject}</div>
          <div className="text-sm text-gray-600 truncate">{email.body}</div>
        </div>
      ))}
    </div>
  );
};

export default EmailList;