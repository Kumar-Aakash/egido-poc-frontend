"use client";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const pdfUrl = '/assets/pdf/dummy.pdf';
const defaultLayoutPluginInstance = defaultLayoutPlugin();

export default function PDFViewerOnly() {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
    </Worker>
  );
} 