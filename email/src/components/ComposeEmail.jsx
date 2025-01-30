import { useState } from 'react';

export default function ComposeEmail({ onSubmit, onCancel }) {
  const [email, setEmail] = useState({
    recipient: '',
    subject: '',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">New Email</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="To"
            value={email.recipient}
            onChange={(e) => setEmail({ ...email, recipient: e.target.value })}
            className="w-full p-2 border rounded"
          />
          
          <input
            type="text"
            placeholder="Subject"
            value={email.subject}
            onChange={(e) => setEmail({ ...email, subject: e.target.value })}
            className="w-full p-2 border rounded"
          />
          
          <textarea
            placeholder="Message"
            value={email.content}
            onChange={(e) => setEmail({ ...email, content: e.target.value })}
            className="w-full p-2 border rounded h-48"
          />
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
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
}