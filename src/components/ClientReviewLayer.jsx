"use client";
import React, { useState, useRef } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

const ClientReviewLayer = ({ token }) => {
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [documentData, setDocumentData] = useState({
    clientName: "John Doe",
    packageName: "Tax Returns 2024",
    documentCount: 3,
    expiryDate: "2024-08-15",
    createdAt: "2024-07-09"
  });

  const canvasRef = useRef(null);
  const pdfUrl = '/assets/pdf/dummy.pdf';

  // Signature pad handlers
  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSignatureSave = () => {
    if (canvasRef.current) {
      const signatureDataUrl = canvasRef.current.toDataURL();
      setSignatureData(signatureDataUrl);
      setShowSignaturePad(false);
    }
  };

  const handleSignatureClear = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSignatureCancel = () => {
    setShowSignaturePad(false);
    handleSignatureClear();
  };

  const handleApprove = () => {
    if (!signatureData) {
      setShowSignaturePad(true);
      return;
    }
    
    setIsApproved(true);
    setIsRejected(false);
    setShowSignaturePad(false);
    console.log('Document approved and signed with signature');
  };

  const handleReject = () => {
    setIsRejected(true);
    setIsApproved(false);
    setShowSignaturePad(false);
    console.log('Document rejected');
  };

  // Initialize canvas when signature pad is shown
  React.useEffect(() => {
    if (showSignaturePad && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [showSignaturePad]);

  return (
    <div className="min-vh-100 bg-light">
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
                      Package ID: {token}
                    </p>
                  </div>
                  <div className="text-end">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Icon icon="solar:calendar-outline" className="text-secondary" />
                      <span className="text-sm text-secondary-light">
                        Expires: {documentData.expiryDate}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Icon icon="solar:document-outline" className="text-secondary" />
                      <span className="text-sm text-secondary-light">
                        {documentData.documentCount} documents
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Information */}
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
                      <label className="form-label fw-semibold text-primary-light text-sm mb-1">Bundle Name</label>
                      <p className="text-secondary-light mb-0">{documentData.packageName}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold text-primary-light text-sm mb-1">Created Date</label>
                      <p className="text-secondary-light mb-0">{new Date(documentData.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold text-primary-light text-sm mb-1">Expiry Date</label>
                      <p className="text-secondary-light mb-0">{documentData.expiryDate}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold text-primary-light text-sm mb-1">Created By</label>
                      <p className="text-secondary-light mb-0">{documentData.clientName}</p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label fw-semibold text-primary-light text-sm mb-1">Bundle Description</label>
                      <p className="text-secondary-light mb-0">This bundle is to be reviewed for Tax return purposes for FY 2024-2025</p>
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
                <iframe
                  src={pdfUrl}
                  title="PDF Document"
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 'none',
                    borderRadius: '0 0 8px 8px'
                  }}
                />
              </div>
            </div>

            {/* Action Buttons (if needed, can be added here) */}

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
    </div>
  );
};

export default ClientReviewLayer;
