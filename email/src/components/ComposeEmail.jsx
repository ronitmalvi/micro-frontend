import React, {useState} from "react";

const ComposeEmail = ({ onSend, onClose }) => {
  const [email, setEmail] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend({
      from: 'user@example.com', // Replace with actual user email
      ...email
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">New Message</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <input
              type="email"
              placeholder="To"
              value={email.to}
              onChange={e => setEmail({ ...email, to: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="Subject"
              value={email.subject}
              onChange={e => setEmail({ ...email, subject: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <textarea
              placeholder="Message"
              value={email.body}
              onChange={e => setEmail({ ...email, body: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 min-h-[200px]"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:bg-gray-50 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeEmail;