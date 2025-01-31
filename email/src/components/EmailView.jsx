import React from "react";
const EmailView = ({ email, onDelete, onClose }) => {
  if (!email) return null;

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{email.subject}</h2>
        <div className="space-x-2">
          <button
            onClick={() => onDelete(email.id)}
            className="px-4 py-2 text-red-500 hover:bg-red-50 rounded"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-500 hover:bg-gray-50 rounded"
          >
            Close
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div>
            <div><strong>From:</strong> {email.from}</div>
            <div><strong>To:</strong> {email.to}</div>
          </div>
          <div>
            {new Date(email.date).toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="text-gray-800 whitespace-pre-wrap">
        {email.body}
      </div>
    </div>
  );
};

export default EmailView;