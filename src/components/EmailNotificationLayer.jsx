"use client";
import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const EmailNotificationLayer = () => {
  const [emailData, setEmailData] = useState({
    clientName: '',
    clientEmail: '',
    packageName: '',
    message: '',
    template: 'package_ready'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [sentEmails, setSentEmails] = useState([
    {
      id: 1,
      clientName: 'John Doe',
      clientEmail: 'john.doe@example.com',
      packageName: 'Tax Returns 2024',
      template: 'package_ready',
      sentAt: '2024-07-09T10:30:00Z',
      status: 'delivered'
    },
    {
      id: 2,
      clientName: 'Jane Smith',
      clientEmail: 'jane.smith@example.com',
      packageName: 'Accounting Records Q2',
      template: 'reminder',
      sentAt: '2024-07-08T14:20:00Z',
      status: 'opened'
    }
  ]);

  const emailTemplates = [
    { value: 'package_ready', label: 'Package Ready for Review', icon: 'solar:document-text-outline' },
    { value: 'reminder', label: 'Review Reminder', icon: 'solar:bell-outline' },
    { value: 'signed', label: 'Package Signed Confirmation', icon: 'solar:check-circle-outline' },
    { value: 'rejected', label: 'Package Rejected Notification', icon: 'solar:close-circle-outline' },
    { value: 'expired', label: 'Package Expired Notice', icon: 'solar:clock-circle-outline' }
  ];

  const handleInputChange = (field, value) => {
    setEmailData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendEmail = async () => {
    if (!emailData.clientName || !emailData.clientEmail || !emailData.packageName) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newEmail = {
        id: Date.now(),
        ...emailData,
        sentAt: new Date().toISOString(),
        status: 'sent'
      };
      
      setSentEmails(prev => [newEmail, ...prev]);
      setEmailData({
        clientName: '',
        clientEmail: '',
        packageName: '',
        message: '',
        template: 'package_ready'
      });
      
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      sent: { class: 'bg-primary-focus text-primary-main', text: 'Sent', icon: 'solar:send-outline' },
      delivered: { class: 'bg-success-focus text-success-main', text: 'Delivered', icon: 'solar:check-circle-outline' },
      opened: { class: 'bg-info-focus text-info-main', text: 'Opened', icon: 'solar:eye-outline' },
      failed: { class: 'bg-danger-focus text-danger-main', text: 'Failed', icon: 'solar:close-circle-outline' }
    };
    
    const config = statusConfig[status] || statusConfig.sent;
    return (
      <span className={`badge ${config.class} px-3 py-1 rounded-pill fw-medium`}>
        <Icon icon={config.icon} className="me-1" />
        {config.text}
      </span>
    );
  };

  const getTemplateIcon = (template) => {
    const templateConfig = emailTemplates.find(t => t.value === template);
    return templateConfig ? templateConfig.icon : 'solar:mail-outline';
  };

  return (
    <div className="row gy-4">
      {/* Email Compose Section */}
      <div className="col-xxl-5 col-lg-6">
        <div className="card h-100">
          <div className="card-header border-bottom bg-base py-16 px-24">
            <h6 className="text-lg fw-semibold mb-0">Send Email Notification</h6>
          </div>
          <div className="card-body p-24">
            <form onSubmit={(e) => { e.preventDefault(); handleSendEmail(); }}>
              <div className="mb-20">
                <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                  Client Name <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  className="form-control radius-8"
                  placeholder="Enter client name"
                  value={emailData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  required
                />
              </div>

              <div className="mb-20">
                <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                  Client Email <span className="text-danger-600">*</span>
                </label>
                <input
                  type="email"
                  className="form-control radius-8"
                  placeholder="Enter client email"
                  value={emailData.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  required
                />
              </div>

              <div className="mb-20">
                <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                  Package Name <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  className="form-control radius-8"
                  placeholder="Enter package name"
                  value={emailData.packageName}
                  onChange={(e) => handleInputChange('packageName', e.target.value)}
                  required
                />
              </div>

              <div className="mb-20">
                <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                  Email Template <span className="text-danger-600">*</span>
                </label>
                <select
                  className="form-control radius-8 form-select"
                  value={emailData.template}
                  onChange={(e) => handleInputChange('template', e.target.value)}
                >
                  {emailTemplates.map(template => (
                    <option key={template.value} value={template.value}>
                      {template.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-20">
                <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                  Custom Message
                </label>
                <textarea
                  className="form-control radius-8"
                  placeholder="Enter custom message (optional)"
                  rows="4"
                  value={emailData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                />
              </div>

              <div className="d-flex align-items-center gap-3">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Icon icon="solar:send-outline" className="me-2" />
                      Send Email
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 py-2"
                  onClick={() => setEmailData({
                    clientName: '',
                    clientEmail: '',
                    packageName: '',
                    message: '',
                    template: 'package_ready'
                  })}
                >
                  <Icon icon="solar:refresh-outline" className="me-2" />
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Email History Section */}
      <div className="col-xxl-7 col-lg-6">
        <div className="card h-100">
          <div className="card-header border-bottom bg-base py-16 px-24">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="text-lg fw-semibold mb-0">Email History</h6>
              <div className="d-flex align-items-center gap-2">
                <span className="text-sm text-secondary-light">Total: {sentEmails.length}</span>
              </div>
            </div>
          </div>
          <div className="card-body p-24">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="h6 text-gray-300">Client</th>
                    <th className="h6 text-gray-300">Package</th>
                    <th className="h6 text-gray-300">Template</th>
                    <th className="h6 text-gray-300">Sent</th>
                    <th className="h6 text-gray-300">Status</th>
                    <th className="h6 text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sentEmails.map((email) => (
                    <tr key={email.id}>
                      <td>
                        <div>
                          <span className="text-md mb-0 fw-normal text-secondary-light">{email.clientName}</span>
                          <br />
                          <span className="text-sm text-secondary-light">{email.clientEmail}</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-md mb-0 fw-normal text-secondary-light">{email.packageName}</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Icon icon={getTemplateIcon(email.template)} className="text-primary" />
                          <span className="text-sm text-secondary-light">
                            {emailTemplates.find(t => t.value === email.template)?.label}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {new Date(email.sentAt).toLocaleString()}
                        </span>
                      </td>
                      <td>
                        {getStatusBadge(email.status)}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button className="btn btn-sm btn-outline-primary px-3 py-1">
                            <Icon icon="solar:eye-outline" className="me-1" />
                            View
                          </button>
                          <button className="btn btn-sm btn-outline-secondary px-3 py-1">
                            <Icon icon="solar:refresh-outline" className="me-1" />
                            Resend
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {sentEmails.length === 0 && (
              <div className="text-center py-5">
                <Icon icon="solar:mail-outline" className="text-secondary mb-3" style={{ fontSize: '48px' }} />
                <p className="text-secondary-light mb-0">No emails sent yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailNotificationLayer;
