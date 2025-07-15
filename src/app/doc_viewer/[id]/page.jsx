"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import DocumentViewerLayer from '../../../components/DocumentViewerLayer';

const DocumentViewerPage = () => {
  const params = useParams();
  const searchParams = new URLSearchParams(window.location.search);
  
  // Handle both path parameter and query parameter formats
  let documentId = params.id;
  
  // Handle various URL formats and extract the actual document ID
  if (documentId) {
    try {
      // Case 1: URL-encoded format like "id%3D19fbd57f-7e4e-48ed-b71d-8b55dea5c908"
      if (documentId.includes('%3D')) {
        const decodedId = decodeURIComponent(documentId);
        if (decodedId.startsWith('id=')) {
          documentId = decodedId.substring(3); // Remove "id=" prefix
        }
      }
      // Case 2: Direct format like "id=19fbd57f-7e4e-48ed-b71d-8b55dea5c908"
      else if (documentId.startsWith('id=')) {
        documentId = documentId.substring(3); // Remove "id=" prefix
      }
      // Case 3: Partially encoded format like "3D19fbd57f-7e4e-48ed-b71d-8b55dea5c908"
      else if (documentId.startsWith('3D')) {
        documentId = documentId.substring(3); // Remove "3D" prefix
      }
      
      console.log('Extracted document ID:', documentId);
    } catch (error) {
      console.error('Error processing document ID:', error);
    }
  }
  
  // Fallback to query parameter if path parameter is not available
  if (!documentId) {
    documentId = searchParams.get('id');
  }
  
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumentData = async () => {
      if (!documentId) {
        setError({ detail: 'Document ID is required' });
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching document data for ID:', documentId);
        
        const response = await fetch(
          `https://taxcompliancepoc-jhuochimpq-uc.a.run.app/document/signed-url?document_id=${documentId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('API Response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.log('API Error response:', errorData);
          setError(errorData && typeof errorData === 'object' ? errorData : { detail: 'Failed to fetch document' });
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log('Document data received:', data);
        
        setDocumentData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching document:', error);
        setError({ detail: error.message || 'Failed to fetch document' });
        setLoading(false);
      }
    };

    fetchDocumentData();
  }, [documentId]);

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-primary mb-2">Loading Document</h5>
          <p className="text-secondary-light mb-0">Please wait while we fetch your document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Icon icon="solar:close-circle-outline" className="text-danger mb-3" style={{ fontSize: '64px' }} />
          <h4 className="text-danger mb-2">Document Not Found</h4>
          <p className="text-secondary-light mb-3">
            {error.detail || 'Document not found'}
          </p>
          <div className="d-flex justify-content-center gap-2">
            <button 
              className="btn btn-outline-primary d-flex align-items-center gap-1"
              onClick={() => window.location.reload()}
            >
              <Icon icon="solar:refresh-outline" className="me-1" />
              Try Again
            </button>
            <a href="/document-management" className="btn btn-outline-secondary d-flex align-items-center gap-1">
              <Icon icon="solar:home-outline" className="me-1" />
              Go To Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Helper to format expiry time
  function formatExpiryInfo(expiresAt) {
    if (!expiresAt) return 'N/A';
    const expiryDate = new Date(expiresAt);
    const now = new Date();
    const diffMs = expiryDate - now;
    const diffHours = Math.max(0, Math.round(diffMs / (1000 * 60 * 60)));
    return `${expiryDate.toLocaleString()} (${diffHours} hour${diffHours !== 1 ? 's' : ''} left)`;
  }

  return (
    <div className="min-vh-100 bg-light">
      <DocumentViewerLayer documentData={documentData} documentId={documentId} />
    </div>
  );
};

export default DocumentViewerPage; 