import React, { useState, useCallback } from 'react';

const PDFUpload = ({ onFileSelect, onError, maxFileSize = 10 * 1024 * 1024 }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (file) => {
    // Check file type
    if (file.type !== 'application/pdf') {
      return 'Please select a PDF file only.';
    }

    // Check file size
    if (file.size > maxFileSize) {
      return `File size must be less than ${maxFileSize / (1024 * 1024)}MB.`;
    }

    return null;
  };

  const handleFileSelection = useCallback(async (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      if (onError) {
        onError(validationError);
      }
      return;
    }

    setIsUploading(true);
    try {
      // Create file URL for preview
      const fileUrl = URL.createObjectURL(file);
      
      setUploadedFile({
        file,
        url: fileUrl,
        name: file.name,
        size: file.size,
        lastModified: file.lastModified
      });

      if (onFileSelect) {
        onFileSelect(file, fileUrl);
      }
    } catch (error) {
      console.error('File processing error:', error);
      if (onError) {
        onError('Failed to process the selected file.');
      }
    } finally {
      setIsUploading(false);
    }
  }, [onFileSelect, onError, maxFileSize]);

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
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const clearFile = () => {
    if (uploadedFile?.url) {
      URL.revokeObjectURL(uploadedFile.url);
    }
    setUploadedFile(null);
    if (onFileSelect) {
      onFileSelect(null, null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="pdf-upload-container">
      {!uploadedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInputChange}
            className="hidden"
            id="pdf-upload-input"
          />
          
          <div className="flex flex-col items-center">
            <svg
              className="h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isUploading ? 'Processing...' : 'Upload PDF Document'}
            </p>
            
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop your PDF file here, or click to browse
            </p>
            
            <label
              htmlFor="pdf-upload-input"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer transition-colors"
            >
              Choose PDF File
            </label>
            
            <p className="text-xs text-gray-400 mt-2">
              Maximum file size: {maxFileSize / (1024 * 1024)}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-10 w-10 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 100-4 2 2 0 000 4zm8-2a2 2 0 11-4 0 2 2 0 014 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {uploadedFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(uploadedFile.size)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Ready
              </span>
              <button
                onClick={clearFile}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFUpload;
