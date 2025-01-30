export default function EmailDetail({ email }) {
    if (!email) return null;
  
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">{email.subject}</h2>
        <div className="mb-4 text-sm text-gray-600">
          <p>From: {email.sender}</p>
          <p>Date: {new Date(email.date).toLocaleString()}</p>
        </div>
        <div className="prose">{email.content}</div>
      </div>
    );
  }