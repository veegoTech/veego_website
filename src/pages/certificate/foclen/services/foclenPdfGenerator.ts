import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import type { FoclenCertificateData } from '../types/foclen';

/**
 * Generates and downloads a high-resolution, print-ready A4 PDF for Foclen Internship Certificate.
 */
export async function downloadFoclenCertificatePDF(
  elementId: string,
  data: FoclenCertificateData,
  onProgress?: (status: string) => void
): Promise<void> {
  const sourceElement = document.getElementById(elementId);
  if (!sourceElement) {
    throw new Error(`Element with id "${elementId}" not found for PDF generation.`);
  }

  // Create an offscreen wrapper with exact fixed 794x1123 unscaled dimensions
  const offscreenContainer = document.createElement('div');
  offscreenContainer.style.position = 'fixed';
  offscreenContainer.style.left = '-99999px';
  offscreenContainer.style.top = '0';
  offscreenContainer.style.width = '794px';
  offscreenContainer.style.height = '1123px';
  offscreenContainer.style.minWidth = '794px';
  offscreenContainer.style.maxWidth = '794px';
  offscreenContainer.style.minHeight = '1123px';
  offscreenContainer.style.maxHeight = '1123px';
  offscreenContainer.style.overflow = 'hidden';
  offscreenContainer.style.transform = 'none';
  offscreenContainer.style.zIndex = '-9999';
  offscreenContainer.style.backgroundColor = '#ffffff';

  // Clone source DOM without zoom scale transforms
  const clone = sourceElement.cloneNode(true) as HTMLElement;
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.boxShadow = 'none';
  clone.style.width = '794px';
  clone.style.height = '1123px';
  clone.style.minWidth = '794px';
  clone.style.maxWidth = '794px';
  clone.style.minHeight = '1123px';
  clone.style.maxHeight = '1123px';

  offscreenContainer.appendChild(clone);
  document.body.appendChild(offscreenContainer);

  try {
    if (onProgress) onProgress('Rendering high-resolution certificate (300 DPI)...');
    await document.fonts.ready;
    await new Promise((r) => setTimeout(r, 120));

    const imgData = await toPng(clone, {
      pixelRatio: 3,
      quality: 1.0,
      backgroundColor: '#ffffff',
      cacheBust: true,
      width: 794,
      height: 1123,
    });

    if (onProgress) onProgress('Building PDF document...');

    // A4 Portrait: 210mm x 297mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210;
    const pdfHeight = 297;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    const sanitizedStudentName = (data.studentName || 'Intern')
      .trim()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '_');
    const sanitizedCertId = (data.certificateNumber || data.id || 'CERT').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Foclen_Internship_${sanitizedStudentName}_${sanitizedCertId}.pdf`;

    if (onProgress) onProgress('Downloading PDF...');
    pdf.save(filename);
  } catch (error) {
    console.error('Failed to generate Foclen PDF:', error);
    throw error;
  } finally {
    if (document.body.contains(offscreenContainer)) {
      document.body.removeChild(offscreenContainer);
    }
  }
}

export function printFoclenCertificate(): void {
  window.print();
}
