import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, id: Date.now() }]);
      setNewMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Chat Application</h2>
      
      <div style={{ 
        border: '1px solid #ccc', 
        borderRadius: '4px',
        height: '300px',
        overflowY: 'auto',
        marginBottom: '20px',
        padding: '10px'
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            background: '#f0f0f0',
            padding: '8px',
            borderRadius: '4px',
            marginBottom: '8px'
          }}>
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          style={{ 
            flex: 1,
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button 
          onClick={handleSend}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            background: '#007bff',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;