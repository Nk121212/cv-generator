'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { useCVStore } from '@/store/useCVStore';

// A4 at 96 dpi
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1122;

/**
 * Sanitize the user's full name into a valid filename.
 */
function buildFilename(fullName: string): string {
  const slug = fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    || 'my';
  return `${slug}-cv.pdf`;
}

/**
 * Trigger a file download that works across desktop and mobile.
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener noreferrer';

  if (typeof anchor.download === 'undefined') {
    anchor.target = '_blank';
  }

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export default function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const { data } = useCVStore();

  const handleExport = async () => {
    const source = document.getElementById('cv-preview-container');
    if (!source) return;

    setIsExporting(true);

    // Store original styles to restore later
    const originalTransform = source.style.transform;
    const originalWidth = source.style.width;
    const originalHeight = source.style.height;

    try {
      // 1. Ensure fonts are loaded
      await document.fonts.ready;

      // 2. Temporarily set to natural size for capture
      // Using the LIVE element is much more reliable than cloning for fonts/styles
      source.style.transform = 'none';
      source.style.width = `${A4_WIDTH_PX}px`;
      source.style.height = `${A4_HEIGHT_PX}px`;

      // 3. Capture using html-to-image
      // This library uses SVG foreignObject, which handles Tailwind 4's oklch/lab natively
      const dataUrl = await toPng(source, {
        quality: 1,
        pixelRatio: 2,           // High resolution
        backgroundColor: '#ffffff',
        width: A4_WIDTH_PX,
        height: A4_HEIGHT_PX,
        cacheBust: true,         // Avoid image caching issues
        // Ensure the capture includes all styles
        style: {
          transform: 'none',
          margin: '0',
          padding: '0',
        }
      });

      // 4. Build A4 PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();   // 210 mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // 5. Output as blob and download (mobile-safe)
      const blob = pdf.output('blob');
      const filename = buildFilename(data.personalInfo.fullName);
      downloadBlob(blob, filename);
    } catch (error) {
      console.error('[ExportButton] PDF export failed:', error);
      alert('Gagal mendownload PDF. Silakan coba lagi.');
    } finally {
      // 6. Restore original styles
      source.style.transform = originalTransform;
      source.style.width = originalWidth;
      source.style.height = originalHeight;
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span className="hidden sm:inline">Exporting...</span>
          <span className="sm:hidden">...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Download PDF</span>
        </>
      )}
    </Button>
  );
}
