import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ComposeEmail({ onClose, replyTo = null }) {
  const [email, setEmail] = useState({
    to: replyTo?.from || '',
    subject: replyTo ? `Re: ${replyTo.subject}` : '',
    content: replyTo ? `\n\nOn ${new Date(replyTo.date).toLocaleString()}, ${replyTo.from} wrote:\n> ${replyTo.content}` : ''
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.send(
        'service_l7hdu0h',
        'template_aosmxqr',
        {
          to_email: email.to,
          subject: email.subject,
          message: email.content,
        },
        'HMFLUKS7uM4oOsdpF'
      );

      onClose({
        id: Date.now(),
        from: 'you@example.com',
        ...email,
        date: new Date().toISOString(),
        read: true
      });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {replyTo ? 'Reply to Email' : 'New Email'}
          </h2>
          <button
            onClick={() => onClose()}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <input
              type="email"
              placeholder="To"
              value={email.to}
              onChange={e => setEmail({ ...email, to: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Subject"
              value={email.subject}
              onChange={e => setEmail({ ...email, subject: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Write your message..."
              value={email.content}
              onChange={e => setEmail({ ...email, content: e.target.value })}
              className="w-full p-2 border rounded h-64 resize-none focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}