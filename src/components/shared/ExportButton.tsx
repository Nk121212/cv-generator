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
 * "Kahfi Setiawan" → "kahfi-setiawan-cv.pdf"
 */
function buildFilename(fullName: string): string {
  const slug = fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')   // strip special chars
    .replace(/\s+/g, '-')            // spaces → hyphens
    .replace(/-+/g, '-')             // collapse multiple hyphens
    || 'my';
  return `${slug}-cv.pdf`;
}

/**
 * Trigger a file download that works on:
 *  - Desktop Chrome / Firefox / Edge (anchor download attribute)
 *  - Android Chrome (same anchor approach)
 *  - iOS Safari (open in new tab — iOS blocks programmatic blob download)
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener noreferrer';

  // iOS Safari fallback — if download attribute is unsupported, open in new tab
  // so the user can use the share sheet to save
  if (typeof anchor.download === 'undefined') {
    anchor.target = '_blank';
  }

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  // Revoke the object URL after the browser has had time to start the download
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export default function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const { data } = useCVStore();

  const handleExport = async () => {
    const source = document.getElementById('cv-preview-container');
    if (!source) return;

    setIsExporting(true);

    try {
      /*
       * Root cause fix: the live element has `transform: scale(X)` applied,
       * which causes html-to-image to capture a low-res, already-scaled image.
       *
       * Solution: clone the element off-screen at its natural 794×1122px
       * size with no transform, capture it, then remove the clone.
       */
      const clone = source.cloneNode(true) as HTMLElement;

      // Position completely off-screen — not display:none (that breaks rendering)
      Object.assign(clone.style, {
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        transform: 'none',
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        overflow: 'hidden',
        zIndex: '-1',
      });

      document.body.appendChild(clone);

      let dataUrl: string;
      try {
        dataUrl = await toPng(clone, {
          quality: 1,
          pixelRatio: 2,           // retina-quality image in the PDF
          backgroundColor: '#ffffff',
          width: A4_WIDTH_PX,
          height: A4_HEIGHT_PX,
          // Prevent cross-origin image tainting
          skipAutoScale: true,
        });
      } finally {
        // Always clean up the clone, even if capture fails
        document.body.removeChild(clone);
      }

      // Build A4 PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();   // 210 mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

      /*
       * Root cause fix: pdf.save() uses an implicit <a> click which is blocked
       * by Safari iOS and some Android WebViews. Instead, get the raw blob
       * and trigger our own anchor click with an explicit `.pdf` extension.
       */
      const blob = pdf.output('blob');
      const filename = buildFilename(data.personalInfo.fullName);
      downloadBlob(blob, filename);
    } catch (error) {
      console.error('[ExportButton] PDF export failed:', error);
      alert('Gagal mendownload PDF. Silakan coba lagi.');
    } finally {
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
