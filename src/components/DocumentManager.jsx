import React, { useState, useCallback } from 'react';
import PDFUpload from './PDFUpload';
import PDFViewer from './PDFViewer';

const DocumentManager = () => {
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Handle file selection from upload component
  const handleFileSelect = useCallback((file, fileUrl) => {
    if (file && fileUrl) {
      const documentData = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        uploadDate: new Date().toISOString(),
        url: fileUrl,
        file: file
      };
      
      setSelectedPDF(documentData);
      setPdfUrl(fileUrl);
      setDocuments(prev => [...prev, documentData]);
      setError(null);
    } else {
      setSelectedPDF(null);
      setPdfUrl(null);
    }
  }, []);

  // Handle upload errors
  const handleUploadError = useCallback((errorMessage) => {
    setError(errorMessage);
    setSelectedPDF(null);
    setPdfUrl(null);
  }, []);

  // Open viewer with selected document
  const openViewer = (document) => {
    setSelectedPDF(document);
    setPdfUrl(document.url);
    setIsViewerOpen(true);
  };

  // Close viewer
  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  // Remove document from list
  const removeDocument = (documentId) => {
    setDocuments(prev => {
      const updated = prev.filter(doc => doc.id !== documentId);
      const removedDoc = prev.find(doc => doc.id === documentId);
      
      // Clean up object URL to prevent memory leaks
      if (removedDoc?.url) {
        URL.revokeObjectURL(removedDoc.url);
      }
      
      // If the removed document was selected, clear selection
      if (selectedPDF?.id === documentId) {
        setSelectedPDF(null);
        setPdfUrl(null);
        setIsViewerOpen(false);
      }
      
      return updated;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="document-manager">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Document Manager</h2>
        <p className="text-gray-600">Upload and manage your PDF documents</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Upload New Document</h3>
        <PDFUpload
          onFileSelect={handleFileSelect}
          onError={handleUploadError}
          maxFileSize={10 * 1024 * 1024} // 10MB
        />
      </div>

      {/* Documents List */}
      {documents.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Uploaded Documents ({documents.length})
          </h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {documents.map((doc, index) => (
              <div
                key={doc.id}
                className={`p-4 flex items-center justify-between ${
                  index !== documents.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 100-4 2 2 0 000 4zm8-2a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {doc.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(doc.size)} • Uploaded {formatDate(doc.uploadDate)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openViewer(doc)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {isViewerOpen && selectedPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedPDF.name}
              </h3>
              <button
                onClick={closeViewer}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4" style={{ height: '70vh' }}>
              <PDFViewer 
                url={pdfUrl} 
                width="100%" 
                height="100%" 
              />
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Next Steps</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Upload PDF documents for review and processing</p>
          <p>• View documents using the integrated PDF viewer</p>
          <p>• Share documents with clients for e-signature</p>
          <p>• Track document status and completion</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;
