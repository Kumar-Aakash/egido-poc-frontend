"use client";
import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

const DocumentSignLayer = ({ documentId }) => {
  const handleSign = () => {
    // Simulate signing the document
    alert(`Document ${documentId} signed successfully.`);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-body p-24">
        <h6 className="text-md text-primary-light mb-16">Document Signing</h6>
        <p className="text-secondary-light mb-3">
          Please ensure you have reviewed the document before signing.
        </p>
        <button
          className="btn btn-success"
          onClick={handleSign}
        >
          <Icon icon="solar:pen-upload-outline" className="me-1" />
          Sign Document
        </button>
      </div>
    </div>
  );
};

export default DocumentSignLayer;
