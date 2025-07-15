"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from 'next/link';
// import { useAuth } from '../context/AuthContext';
import { useUser } from '@auth0/nextjs-auth0/client';


const DocumentUploadLayer = () => {
  const auth = useUser();
  const user = auth || auth?.user || null;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    user_email: '',
    package_type: '',
    description: '',
    expiry_time_in_hours: 24
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [toast, setToast] = useState({ show: false, type: '', message: '', title: '' });
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Auto-populate user data from Auth0
  useEffect(() => {
    if (user) {
      console.log('Auth user data:', user);
    }
  }, [user]);

  const showToast = (type, title, message) => {
    setToast({ show: true, type, title, message });
    setTimeout(() => setToast({ show: false, type: '', title: '', message: '' }), 5000);
  };

  const clearFieldError = (fieldName) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const setFieldError = (fieldName, message) => {
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: message
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
  };

  const handleFileSelection = (files) => {
    if (!files || files.length === 0) {
      return;
    }

    // Since API only accepts one file, we'll only take the first file
    const file = files[0];
    const errors = [];

    // Validate file type
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      errors.push(`"${file.name}" is not a PDF file.`);
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      errors.push(`"${file.name}" is too large (max 10MB).`);
    }

    if (errors.length > 0) {
      setFieldError('file', errors.join(' '));
      showToast('error', 'File Selection Error', errors.join(' '));
      return;
    }

    // Replace any existing file with the new one
    const newFile = {
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type
    };

    setSelectedFiles([newFile]); // Only keep one file
    clearFieldError('file');
    showToast('success', 'File Selected', `PDF file "${file.name}" selected successfully.`);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    handleFileSelection(files);
  };

  const removeFile = (fileId) => {
    setSelectedFiles([]); // Clear selected files
    clearFieldError('file');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getValidationErrors = () => {
    const errors = [];

    if (selectedFiles.length === 0) {
      errors.push('Please select a PDF file to upload.');
    }

    if (!formData.user_email.trim()) {
      errors.push('Please enter the recipient email address.');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.user_email)) {
        errors.push('Please enter a valid email address.');
      }
    }

    if (!formData.package_type.trim()) {
      errors.push('Please enter a package type.');
    }

    if (!formData.description.trim()) {
      errors.push('Please enter a description for the package.');
    }

    if (!formData.expiry_time_in_hours || formData.expiry_time_in_hours < 1) {
      errors.push('Please enter a valid expiry time (minimum 1 hour).');
    } else if (formData.expiry_time_in_hours > 168) {
      errors.push('Expiry time cannot exceed 168 hours (1 week).');
    }

    return errors;
  };

  const validateForm = () => {
    const errors = getValidationErrors();

    if (!user) {
      showToast('error', 'Authentication Error', 'User authentication required. Please log in again.');
      return false;
    }

    if (errors.length > 0) {
      setFieldError('form', errors.join(' • '));
      showToast('error', 'Form Validation Error', errors.join(' • '));
      return false;
    }

    setFieldErrors({});
    return true;
  };

  const handleUpload = async () => {
    console.log('Upload button clicked');
    
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      console.log('Creating FormData...');
      
      // Create FormData for file upload
      const uploadFormData = new FormData();
      
      // API expects a single 'file' field, so we'll send the first file
      if (selectedFiles.length > 0) {
        uploadFormData.append('file', selectedFiles[0].file);
      }
      
      uploadFormData.append('user_name', user?.name || user?.email || user?.user?.nickname || 'Unknown User');
      uploadFormData.append('user_email', formData.user_email);
      uploadFormData.append('package_type', formData.package_type);
      uploadFormData.append('created_by', user?.id || user?.email || user?.user?.email || 'Unknown User');
      uploadFormData.append('expiry_time_in_min', (formData.expiry_time_in_hours * 60).toString());

      console.log('FormData created:', {
        user_name: user.name || user.email || 'Unknown User',
        user_email: formData.user_email,
        package_type: formData.package_type,
        created_by: user.id || user.email || 'Unknown User',
        expiry_time_in_min: (formData.expiry_time_in_hours * 60).toString(),
        file: selectedFiles[0]?.name || 'No file'
      });

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      console.log('Making API call to:', 'https://taxcompliancepoc-jhuochimpq-uc.a.run.app/api/upload-document');
      
      // Make API call
      const response = await fetch('https://taxcompliancepoc-jhuochimpq-uc.a.run.app/api/upload-document', {
        method: 'POST',
        body: uploadFormData,
      });

      console.log('API Response status:', response.status);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log('API Error response:', errorData);
        throw new Error(errorData.detail?.[0]?.msg || errorData.message || `Upload failed with status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Upload successful:', result);
      
      showToast('success', 'Upload Successful', `PDF file uploaded successfully! Please check your email for further details.`);
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSelectedFiles([]);
        setFormData({ user_email: '', package_type: '', description: '', expiry_time_in_hours: 24 });
        setFieldErrors({});
        setIsUploading(false);
        setUploadProgress(0);
        setShowSuccess(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 5000); // Show success message for 5 seconds

    } catch (error) {
      console.error('Upload failed:', error);
      showToast('error', 'Upload Failed', `File upload failed: ${error.message}`);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <>
      {/* Enhanced Toast Notification */}
      {toast.show && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className={`toast show ${toast.type === 'error' ? 'bg-danger' : 'bg-success'} text-white`} role="alert">
            <div className="toast-header">
              <Icon 
                icon={toast.type === 'error' ? "solar:close-circle-outline" : "solar:check-circle-outline"} 
                className="me-2" 
              />
              <strong className="me-auto">{toast.title}</strong>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={() => setToast({ show: false, type: '', title: '', message: '' })}
              ></button>
            </div>
            <div className="toast-body">
              {toast.message}
              {toast.type === 'error' && toast.title === 'Authentication Error' && (
                <div className="mt-2">
                  <Link href="/login" className="btn btn-sm btn-outline-light">
                    <Icon icon="solar:login-outline" className="me-1" />
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card h-100 radius-8 border-0 shadow-sm">
            <div className="card-header border-bottom bg-base py-16 px-24">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0 text-primary">
                  <Icon icon="solar:upload-outline" className="me-2" />
                  &nbsp;Upload Package
                </h6>
              </div>
            </div>
            
            <div className="card-body p-24">
              {/* Success Message */}
              {showSuccess && (
                <div className="alert alert-success mb-4">
                  <div className="d-flex align-items-start">
                    <Icon icon="solar:check-circle-outline" className="me-3 mt-1" style={{ fontSize: '24px' }} />
                    <div>
                      <h5 className="alert-heading mb-2">Document Uploaded Successfully!</h5>
                      <p className="mb-2">
                        Your PDF document has been uploaded and processed successfully. 
                        The recipient will receive an email with access to the document.
                      </p>
                      <div className="d-flex align-items-center gap-3 mt-3">
                        <div className="d-flex align-items-center gap-2">
                          <Icon icon="solar:envelope-outline" className="text-success" />
                          <span className="text-sm fw-medium">Check your email for further details</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Icon icon="solar:clock-circle-outline" className="text-success" />
                          <span className="text-sm fw-medium">Expires in {formData.expiry_time_in_hours} hours</span>
                        </div>
                      </div>
                      <div className="mt-3 d-flex align-items-center flex-row gap-3">
                        <button 
                          className="btn btn-outline-success btn-sm me-2 mr-4"
                          onClick={() => setShowSuccess(false)}
                        >
                          Upload Another Document
                        </button>
                        <Link href="/document-management" className="btn btn-outline-secondary btn-sm d-flex align-items-center">
                          <Icon icon="solar:arrow-left-outline" className="me-1" style={{ fontSize: '20px' }} />
                          &nbsp;Back to Dashboard
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Validation Error Display */}
              {fieldErrors.form && (
                <div className="alert alert-danger mb-4">
                  <div className="d-flex align-items-start">
                    <Icon icon="solar:close-circle-outline" className="me-2 mt-1" />
                    <div>
                      <strong>Please fix the following errors:</strong>
                      <ul className="mb-0 mt-2">
                        {fieldErrors.form.split(' • ').map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Fields - Hidden when success is shown */}
              {!showSuccess && (
                <>
                  {/* Recipient Email */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-primary-light text-sm mb-2">
                          Recipient Email <span className="text-danger">*</span>
                        </label>
                        <input 
                          type="email" 
                          className={`form-control radius-8 ${fieldErrors.user_email ? 'border-danger' : ''}`}
                          placeholder="Enter recipient email address"
                          value={formData.user_email}
                          onChange={(e) => {
                            setFormData({...formData, user_email: e.target.value});
                            clearFieldError('user_email');
                            clearFieldError('form');
                          }}
                          disabled={isUploading}
                        />
                        {fieldErrors.user_email && (
                          <div className="text-danger text-sm mt-1 d-flex align-items-center">
                            <Icon icon="solar:close-circle-outline" className="me-1" />
                            {fieldErrors.user_email}
                          </div>
                        )}
                        <small className="text-secondary-light">Enter the email address of the person you want to share this package with</small>
                      </div>
                    </div>
                  </div>

                  {/* Package Type and Expiry Time */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-primary-light text-sm mb-2">
                          Package Type <span className="text-danger">*</span>
                          <Icon 
                            icon="solar:info-circle-outline" 
                            className="ms-1 text-secondary" 
                            title="Enter a descriptive name for this document package (e.g., Tax Return 2024, W2 Forms, etc.)"
                          />
                        </label>
                        <input 
                          type="text" 
                          className={`form-control radius-8 ${fieldErrors.package_type ? 'border-danger' : ''}`}
                          placeholder="e.g., Tax Return 2024, W2 Forms, etc."
                          value={formData.package_type}
                          onChange={(e) => {
                            setFormData({...formData, package_type: e.target.value});
                            clearFieldError('package_type');
                            clearFieldError('form');
                          }}
                          disabled={isUploading}
                        />
                        {fieldErrors.package_type && (
                          <div className="text-danger text-sm mt-1 d-flex align-items-center">
                            <Icon icon="solar:close-circle-outline" className="me-1" />
                            {fieldErrors.package_type}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-primary-light text-sm mb-2">
                          Expiry Time (hours) <span className="text-danger">*</span>
                          <Icon 
                            icon="solar:info-circle-outline" 
                            className="ms-1 text-secondary" 
                            title="How long should this package be available for the recipient?"
                          />
                        </label>
                        <input 
                          type="number" 
                          className={`form-control radius-8 ${fieldErrors.expiry_time_in_hours ? 'border-danger' : ''}`}
                          placeholder="24"
                          min="1"
                          max="168"
                          value={formData.expiry_time_in_hours}
                          onChange={(e) => {
                            setFormData({...formData, expiry_time_in_hours: parseInt(e.target.value) || 0});
                            clearFieldError('expiry_time_in_hours');
                            clearFieldError('form');
                          }}
                          disabled={isUploading}
                        />
                        {fieldErrors.expiry_time_in_hours && (
                          <div className="text-danger text-sm mt-1 d-flex align-items-center">
                            <Icon icon="solar:close-circle-outline" className="me-1" />
                            {fieldErrors.expiry_time_in_hours}
                          </div>
                        )}
                        <small className="text-secondary-light">Minimum: 1 hour, Maximum: 1 week (168 hours)</small>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-primary-light text-sm mb-2">
                          Description <span className="text-danger">*</span>
                        </label>
                        <textarea 
                          className={`form-control radius-8 ${fieldErrors.description ? 'border-danger' : ''}`}
                          placeholder="Enter description for this document package"
                          rows="3"
                          value={formData.description}
                          onChange={(e) => {
                            setFormData({...formData, description: e.target.value});
                            clearFieldError('description');
                            clearFieldError('form');
                          }}
                          disabled={isUploading}
                        />
                        {fieldErrors.description && (
                          <div className="text-danger text-sm mt-1 d-flex align-items-center">
                            <Icon icon="solar:close-circle-outline" className="me-1" />
                            {fieldErrors.description}
                          </div>
                        )}
                        <small className="text-secondary-light">Provide a brief description of what this package contains</small>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced File Upload Area */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-2">
                      PDF Document <span className="text-danger">*</span>
                    </label>
                    
                    {selectedFiles.length === 0 ? (
                      <div 
                        className={` d-flex align-items-center justify-content-center flex-columnborder-2 border-dashed rounded-8 p-4 text-center cursor-pointer transition-all ${
                          isDragOver 
                            ? 'border-primary bg-primary-50' 
                            : 'border-primary-300 hover-bg-primary-50'
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        style={{ 
                          minHeight: '120px', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center',
                          backgroundColor: isDragOver ? '#f8f9fa' : '#f8f9fa'
                        }}
                      >
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          className="d-none" 
                          accept=".pdf,application/pdf"
                          multiple
                          onChange={handleFileChange}
                          disabled={isUploading}
                        />
                        <Icon 
                          icon={isDragOver ? "solar:file-text-bold" : "solar:file-text-outline"} 
                          className="text-primary mb-2" 
                          style={{ fontSize: '32px' }} 
                        />
                        <h6 className="text-primary mb-1">
                          {isDragOver ? 'Drop PDF file here' : 'Click to upload PDF document'}
                        </h6>
                        <p className="text-secondary-light mb-1">
                          {isDragOver ? 'Release to upload' : 'or drag and drop PDF file here'}
                        </p>
                        <div className="d-flex align-items-center justify-content-center gap-2 text-sm text-secondary-light">
                          <Icon icon="solar:hand-outline" className="text-sm" />
                          <span>Maximum 10MB per file</span>
                        </div>
                      </div>
                    ) : (
                      <div className="border rounded-8 p-3 bg-light">
                        <div className="max-h-60 overflow-y-auto">
                          {selectedFiles.map((fileObj) => (
                            <div key={fileObj.id} className="d-flex align-items-center justify-content-between p-2 border-bottom bg-white rounded mb-1">
                              <div className="d-flex align-items-center flex-grow-1">
                                <Icon icon="solar:file-text-bold" className="text-primary me-2" style={{ fontSize: '20px' }} />&nbsp;
                                <div className="flex-grow-1">
                                  <h6 className="text-sm fw-medium mb-0">&nbsp;{fileObj.name}</h6>
                                  <p className="text-xs text-secondary-light mb-0">&nbsp;{formatFileSize(fileObj.size)}</p>
                                </div>
                              </div>
                              <button 
                                className="btn btn-sm text-danger px-2 py-1"
                                onClick={() => removeFile(fileObj.id)}
                                disabled={isUploading}
                                title="Remove file"
                              >
                                <Icon icon="solar:trash-bin-minimalistic-outline" style={{ fontSize: '20px' }} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {fieldErrors.file && (
                      <div className="text-danger text-sm mt-2 d-flex align-items-center">
                        <Icon icon="solar:close-circle-outline" className="me-1" />
                        {fieldErrors.file}
                      </div>
                    )}
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="mb-4">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="text-sm fw-medium">
                          <Icon icon="solar:refresh-outline" className="me-2 animate-spin" />
                          Uploading PDF Document...
                        </span>
                        <span className="text-sm text-secondary-light">{uploadProgress}%</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="d-flex align-items-center gap-3 pt-3 border-top">
                    <button 
                      className="btn btn-primary pe-4 d-flex align-items-center"
                      onClick={handleUpload}
                      disabled={isUploading || selectedFiles.length === 0}
                    >
                      {isUploading ? (
                        <>
                          <Icon icon="solar:refresh-outline" className="me-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Icon icon="solar:upload-outline" className="me-2" />
                          &nbsp;Upload Package&nbsp;
                        </>
                      )}
                    </button>
                    <Link href="/document-management" className="btn btn-outline-secondary pe-4 d-flex align-items-center">
                      <Icon icon="solar:arrow-left-outline" className="me-2" />
                      &nbsp;Back to Dashboard&nbsp;
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentUploadLayer;

