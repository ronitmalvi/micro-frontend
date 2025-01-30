const ChatMessage = ({ message, isOwn }) => {
    return (
      <div className={`message ${isOwn ? 'own' : 'other'}`}
        style={{
          display: 'flex',
          justifyContent: isOwn ? 'flex-end' : 'flex-start',
          marginBottom: '10px'
        }}>
        <div style={{
          backgroundColor: isOwn ? '#007bff' : '#e9ecef',
          color: isOwn ? 'white' : 'black',
          padding: '8px 12px',
          borderRadius: '12px',
          maxWidth: '70%'
        }}>
          {message.content}
          <div style={{
            fontSize: '0.7rem',
            marginTop: '4px',
            color: isOwn ? '#e9ecef' : '#666'
          }}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  };