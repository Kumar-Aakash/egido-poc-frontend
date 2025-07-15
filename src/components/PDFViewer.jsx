import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ fileUrl, onDocumentLoadSuccess, onError }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);

  const onDocumentLoad = useCallback((pdf) => {
    setNumPages(pdf.numPages);
    setLoading(false);
    if (onDocumentLoadSuccess) {
      onDocumentLoadSuccess(pdf);
    }
  }, [onDocumentLoadSuccess]);

  const onDocumentLoadError = useCallback((error) => {
    setLoading(false);
    console.error('PDF loading error:', error);
    if (onError) {
      onError(error);
    }
  }, [onError]);

  const goToPrevPage = () => {
    setPageNumber(page => Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    setPageNumber(page => Math.min(numPages, page + 1));
  };

  const zoomIn = () => {
    setScale(prevScale => Math.min(3.0, prevScale + 0.2));
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(0.5, prevScale - 0.2));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  if (!fileUrl) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="mt-2 text-sm text-gray-500">No PDF file selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-viewer-container">
      {/* PDF Controls */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {pageNumber} of {numPages || '--'}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600"
          >
            Next
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            className="px-2 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            -
          </button>
          <span className="text-sm text-gray-700 min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="px-2 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            +
          </button>
          <button
            onClick={resetZoom}
            className="px-2 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* PDF Document */}
      <div className="pdf-document-container overflow-auto max-h-[80vh] bg-gray-100 p-4">
        {loading && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Loading PDF...</p>
            </div>
          </div>
        )}

        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoad}
          onLoadError={onDocumentLoadError}
          loading=""
          className="flex justify-center"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="shadow-lg"
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
