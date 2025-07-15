import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

const DocumentArchiveLayer = ({ documentId }) => {
  const handleArchive = () => {
    // Simulate archiving the document
    alert(`Document ${documentId} archived successfully.`);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-body p-24">
        <h6 className="text-md text-primary-light mb-16">Archive Document</h6>
        <p className="text-secondary-light mb-3">
          Once archived, the document will be stored immutably for compliance.
        </p>
        <button
          className="btn btn-neutral"
          onClick={handleArchive}
        >
          <Icon icon="solar:archive-2-outline" className="me-1" />
          Archive Document
        </button>
      </div>
    </div>
  );
};

export default DocumentArchiveLayer;
