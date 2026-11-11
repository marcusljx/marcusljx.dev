import React from 'react';
import { Download } from 'lucide-react';

export const DownloadPdfButton: React.FC = () => {
  return (
    <a
      href="/marcus_low_cv.pdf"
      download="Marcus_Low_CV.pdf"
      className="download-pdf-btn"
      title="Download CV as PDF"
      aria-label="Download CV as PDF"
    >
      <Download size={16} />
      <span className="download-pdf-text">Download PDF</span>
    </a>
  );
};

export default DownloadPdfButton;
