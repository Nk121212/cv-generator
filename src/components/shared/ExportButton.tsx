'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { useCVStore } from '@/store/useCVStore';

export default function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const { data } = useCVStore();

  const handleExport = async () => {
    const element = document.getElementById('cv-preview-container');
    if (!element) return;

    setIsExporting(true);

    try {
      // html-to-image is better at handling modern CSS like oklch/lab
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      
      // A4 dimensions in mm: 210 x 297
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`);
    } catch (error) {
      console.error('Export failed:', error);
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
          Exporting...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </>
      )}
    </Button>
  );
}
