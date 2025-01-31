import React, { useState, useEffect } from 'react';
import { X, Send, Paperclip, Inbox, Star, Trash2, Reply, MoreVertical, SendHorizontal, File, PenSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ComposeEmail({ replyTo, onClose, onSend }){
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
        'SERVICE_ID',
        'TEMPLATE_ID',
        {
          to_email: email.to,
          subject: email.subject,
          message: email.content,
        },
        'PUBLIC_KEY'
      );

      onSend({
        id: Date.now(),
        from: 'user@example.com',
        ...email,
        date: new Date().toISOString(),
        read: true
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {replyTo ? 'Reply' : 'New Message'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="email"
            placeholder="To"
            value={email.to}
            onChange={e => setEmail({ ...email, to: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={email.subject}
            onChange={e => setEmail({ ...email, subject: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <textarea
            placeholder="Write your message..."
            value={email.content}
            onChange={e => setEmail({ ...email, content: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-64 resize-none"
            required
          />
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
            </button>
            <div className="space-x-3 flex justify-center">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={sending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
