import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const EmailNotification = () => {
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    // Simulate sending email notification
    alert(`Email sent to: ${email}\nMessage: ${message}`);
  };

  return (
    <div className="card">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-lg fw-semibold mb-0">Email Notification</h6>
      </div>
      <div className="card-body p-24">
        <label htmlFor="email" className="form-label fw-semibold text-primary-light text-sm mb-8">
          Email Address
        </label>
        <input
          type="email"
          className="form-control radius-8"
          id="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="message" className="form-label fw-semibold text-primary-light text-sm mb-8 mt-3">
          Message
        </label>
        <textarea
          className="form-control radius-8"
          id="message"
          placeholder="Your message..."
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-primary" onClick={handleSend}>
            <Icon icon="solar:send-outline" className="me-1" />
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailNotification;

