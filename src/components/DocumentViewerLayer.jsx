"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

const DocumentViewerLayer = ({ documentData, documentId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const canvasRef = useRef(null);
  const pdfRef = useRef(null);
  const { user } = useUser();
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [actionDone, setActionDone] = useState(false);

  // Load PDF using PDF.js from CDN
  useEffect(() => {
    if (!documentData?.signed_url) return;

    const loadPDF = async () => {
      try {
        setPdfLoaded(false);
        setPdfError(false);

        // Load PDF.js from CDN
        if (typeof window !== 'undefined' && !window.pdfjsLib) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            loadPDFDocument();
          };
          script.onerror = () => {
            console.error('Failed to load PDF.js from CDN');
            setPdfError(true);
          };
          document.head.appendChild(script);
        } else {
          loadPDFDocument();
        }

        async function loadPDFDocument() {
          try {
            let pdfData;
            
            // Use proxy as primary approach to avoid CORS issues
            console.log('Loading PDF via proxy...');
            const proxyUrl = `/api/pdf-proxy?url=${encodeURIComponent(documentData.signed_url)}`;
            console.log('Proxy URL:', proxyUrl);
            
            const proxyResponse = await fetch(proxyUrl, {
              method: 'GET',
              headers: {
                'Accept': 'application/pdf',
              },
            });

            console.log('Proxy response status:', proxyResponse.status);
            console.log('Proxy response headers:', Object.fromEntries(proxyResponse.headers.entries()));

            if (!proxyResponse.ok) {
              const errorText = await proxyResponse.text();
              console.error('Proxy error response:', errorText);
              throw new Error(`Proxy failed: ${proxyResponse.statusText} - ${errorText}`);
            }

            pdfData = await proxyResponse.arrayBuffer();
            console.log('PDF data loaded successfully via proxy, size:', pdfData.byteLength);
            
            // Load PDF from ArrayBuffer
            const loadingTask = window.pdfjsLib.getDocument({ data: pdfData });
            const pdf = await loadingTask.promise;
            pdfRef.current = pdf;
            setTotalPages(pdf.numPages);
            setPdfLoaded(true);

            // Render first page
            await renderPage(1, pdf);
          } catch (error) {
            console.error('Error loading PDF document:', error);
            setPdfError(true);
          }
        }
      } catch (error) {
        console.error('Error in loadPDF:', error);
        setPdfError(true);
      }
    };

    loadPDF();
  }, [documentData?.signed_url]);

  const renderPage = async (pageNum, pdf = pdfRef.current) => {
    if (!pdf || !canvasRef.current || !window.pdfjsLib) return;

    try {
      const page = await pdf.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
      setCurrentPage(pageNum);
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      renderPage(pageNum);
    }
  };

  const changeScale = (newScale) => {
    setScale(newScale);
    renderPage(currentPage);
  };

  const handleDownload = async () => {
    if (!documentData?.signed_url) {
      console.error('No signed URL available for download');
      return;
    }

    setIsLoading(true);
    setDownloadProgress(0);

    try {
      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = documentData.signed_url;
      link.download = documentData.file_name || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      clearInterval(progressInterval);
      setDownloadProgress(100);

      setTimeout(() => {
        setIsLoading(false);
        setDownloadProgress(0);
      }, 1000);

    } catch (error) {
      console.error('Download failed:', error);
      setIsLoading(false);
      setDownloadProgress(0);
    }
  };

  // Approve handler
  const handleApprove = async () => {
    setActionLoading(true);
    setActionError(null);
    setActionSuccess(null);
    try {
      const response = await fetch('https://taxcompliancepoc-jhuochimpq-uc.a.run.app/document/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_id: documentId,
          action: 'approve',
          updated_by: 'system@system.com',
          comment: ''
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.detail || 'Failed to approve document');
      setActionSuccess('Document approved successfully.');
      setActionDone(true);
    } catch (err) {
      setActionError(err.message || 'Error approving document');
    } finally {
      setActionLoading(false);
    }
  };

  // Deny handler
  const handleReject = async () => {
    setActionLoading(true);
    setActionError(null);
    setActionSuccess(null);
    try {
      const response = await fetch('https://taxcompliancepoc-jhuochimpq-uc.a.run.app/document/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_id: documentId,
          action: 'deny',
          updated_by: 'system@system.com',
          comment: rejectReason
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.detail || 'Failed to deny document');
      setActionSuccess('Document denied successfully.');
      setShowRejectModal(false);
      setRejectReason("");
      setActionDone(true);
    } catch (err) {
      setActionError(err.message || 'Error denying document');
      setShowRejectModal(false); // Always close modal on error
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  function formatExpiryInfo(expiryTime) {
    if (!expiryTime) return 'N/A';
    const expiryDate = new Date(expiryTime);
    const now = new Date();
    const diffMs = expiryDate - now;
    const diffHours = Math.max(0, Math.round(diffMs / (1000 * 60 * 60)));
    return `${expiryDate.toLocaleString()} (${diffHours} hour${diffHours !== 1 ? 's' : ''} left)`;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className="card mb-4">
            <div className="card-body p-24">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h4 className="text-primary mb-2">Package Viewer</h4>
                  <p className="text-secondary-light mb-0">
                  Package ID: {documentId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Information */}
          <div className="card mb-4">
            <div className="card-header border-bottom bg-base py-16 px-24">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Package Information</h6>
                <span className="badge bg-success-focus text-success-main px-3 py-1 rounded-pill">
                  <Icon icon="solar:check-circle-outline" className="me-1" />
                  Available
                </span>
              </div>
            </div>
            <div className="card-body p-24">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-1">File Name</label>
                    <p className="text-secondary-light mb-0">
                      {documentData?.file_name || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-1">Package Type</label>
                    <p className="text-secondary-light mb-0">
                      {documentData?.package_type || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-1">Created By</label>
                    <p className="text-secondary-light mb-0">
                      {documentData?.user_email || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-1">Expiry Date</label>
                    <p className="text-secondary-light mb-0">
                      {documentData?.expiry_time ? formatDate(documentData.expiry_time) : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-1">Expires At</label>
                    <p className="text-secondary-light mb-0">
                      {formatExpiryInfo(documentData?.expiry_time)}
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-1">Description</label>
                    <p className="text-secondary-light mb-0">
                      {documentData?.description || 'No description provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PDF Document Viewer */}
          <div className="card mb-4">
            <div className="card-header border-bottom bg-base py-16 px-24">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Package Viewer</h6>
                <div className="d-flex align-items-center gap-2">
                  <Icon icon="solar:document-outline" className="text-secondary" />
                  <span className="text-sm text-secondary-light">PDF Document</span>
                </div>
              </div>
            </div>
            <div className="card-body p-0" style={{ height: '80vh' }}>
              {documentData?.signed_url ? (
                <iframe
                  src={documentData.signed_url}
                  title="PDF Document"
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 'none',
                    borderRadius: '0 0 8px 8px'
                  }}
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100">
                  <div className="text-center">
                    <Icon icon="solar:document-outline" className="text-secondary mb-3" style={{ fontSize: '64px' }} />
                    <h5 className="text-secondary mb-2">Package Not Available</h5>
                    <p className="text-secondary-light mb-0">The Package URL is not available for viewing.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="card mb-4">
            <div className="card-header border-bottom bg-base py-16 px-24">
              <h6 className="text-lg fw-semibold mb-0">Actions</h6>
            </div>
            <div className="card-body p-24">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <button
                  className="btn btn-success px-4 py-2 d-flex align-items-center"
                  onClick={handleApprove}
                  disabled={actionLoading || actionDone}
                >
                  {actionLoading ? (
                    <>
                      <Icon icon="solar:refresh-outline" className="me-2 animate-spin" />
                      Approving...
                    </>
                  ) : (
                    <>
                      <Icon icon="solar:check-circle-outline" className="me-2" />
                      &nbsp;Approve
                    </>
                  )}
                </button>
                <button
                  className="btn btn-danger px-4 py-2 d-flex align-items-center"
                  onClick={() => setShowRejectModal(true)}
                  disabled={actionLoading || actionDone}
                >
                  <Icon icon="solar:close-circle-outline" className="me-2" />
                  &nbsp;Deny
                </button>
              </div>
              {/* Feedback */}
              {actionError && <div className="alert alert-danger mt-3">{actionError}</div>}
              {actionSuccess && <div className="alert alert-success mt-3">{actionSuccess}</div>}
              {/* Reject Modal */}
              {showRejectModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.3)' }}>
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Deny Document</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowRejectModal(false)}></button>
                      </div>
                      <div className="modal-body">
                        <label htmlFor="rejectReason" className="form-label">Reason for denial:</label>
                        <textarea
                          id="rejectReason"
                          className="form-control"
                          rows={3}
                          value={rejectReason}
                          onChange={e => setRejectReason(e.target.value)}
                          placeholder="Please provide a reason for denial"
                        />
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowRejectModal(false)}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleReject} disabled={actionLoading || !rejectReason.trim()}>
                          {actionLoading ? 'Denying...' : 'Deny'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className='card card-body'>
            <div className="text-center mt-4">
              <p className="text-sm text-secondary-light mb-0 d-flex align-items-center justify-content-center">
                <Icon icon="solar:shield-check-outline" className="me-1" />
                This is a secure package viewing portal. All access is logged for audit purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerLayer; 