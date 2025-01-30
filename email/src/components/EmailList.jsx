export default function EmailList({ emails, selectedId, onSelectEmail }) {
    return (
      <div className="divide-y">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => onSelectEmail(email)}
            className={`
              p-4 cursor-pointer hover:bg-gray-50
              ${selectedId === email.id ? 'bg-blue-50' : ''}
              ${!email.read ? 'font-semibold' : ''}
            `}
          >
            <p className="text-sm">{email.sender}</p>
            <p className="text-sm font-medium truncate">{email.subject}</p>
            <p className="text-xs text-gray-500">
              {new Date(email.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    );
  }