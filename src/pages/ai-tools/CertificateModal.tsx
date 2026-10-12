import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { Download, X, Award, CheckCircle2, Shield, Calendar, Share2, Copy } from 'lucide-react';
import { CertificateRecord } from '../../services/certificateService';

interface CertificateModalProps {
  certificate: CertificateRecord;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const verificationUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/verify-certificate?id=${certificate.id}`
      : `https://veegotech.com/verify-certificate?id=${certificate.id}`;

  const handleDownloadPdf = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      // Convert HTML element to high-res PNG image
      const dataUrl = await toPng(certRef.current, {
        quality: 0.98,
        pixelRatio: 2.5
      });

      // A4 landscape dimensions in mm: 297 x 210
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, 297, 210);
      pdf.save(`VeeGo-Certificate-${certificate.id}.pdf`);
    } catch (err) {
      console.error('Failed to export PDF:', err);
      alert('Unable to generate PDF automatically. You can print this screen via Ctrl+P.');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0B0F19] border border-slate-800 rounded-[4px] max-w-4xl w-full text-white shadow-2xl my-8 overflow-hidden">
        {/* Modal Top Actions */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-bold tracking-tight">Verified VeeGo Credential</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold">
              VERIFIED
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Copy Verify URL'}</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="px-3 py-1.5 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer border border-blue-600 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Exporting PDF...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-[4px] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Rendering Area (Matches A4 297mm x 210mm Aspect Ratio: ~1.414) */}
        <div className="p-4 sm:p-8 bg-slate-950 flex justify-center overflow-x-auto">
          <div
            ref={certRef}
            className="w-[840px] h-[594px] bg-white text-slate-900 p-10 relative flex flex-col justify-between shadow-xl shrink-0 selection:bg-blue-100 font-sans"
            style={{
              border: '12px solid #0B0F19',
              outline: '2px solid #2563eb',
              boxSizing: 'border-box'
            }}
          >
            {/* Top Corner Watermark & Branding Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-[4px] flex items-center justify-center text-white font-black text-2xl tracking-tighter">
                  VG
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight text-slate-900 leading-none">
                    VEEGO TECHNOLOGIES
                  </h2>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-1 font-bold">
                    Academy of AI & Software Engineering
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                  Certificate ID
                </span>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-[2px] border border-blue-200">
                  {certificate.id}
                </span>
              </div>
            </div>

            {/* Certificate Core Statement */}
            <div className="text-center my-auto py-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 font-bold block mb-2">
                Certificate of Practical Competency & Course Completion
              </span>

              <p className="text-xs text-slate-600 italic mb-2">
                This is proudly and officially awarded to
              </p>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-2 underline decoration-blue-600 decoration-2 underline-offset-8">
                {certificate.studentName}
              </h1>

              <p className="text-xs text-slate-700 max-w-xl mx-auto leading-relaxed mt-4 font-medium">
                for successfully completing the intensive, hands-on curriculum, demonstrating responsible AI usage, submitting the evaluated AI Productivity Portfolio, and passing the comprehensive competency assessment for:
              </p>

              <div className="my-3 py-2 px-6 bg-slate-50 border border-slate-200 rounded-[4px] inline-block">
                <span className="text-lg font-black text-blue-900 tracking-tight">
                  {certificate.courseTitle}
                </span>
                <span className="text-[11px] font-mono text-slate-600 block mt-0.5">
                  Duration: {certificate.courseDuration} · 15 Comprehensive Lessons · 100% Completed
                </span>
              </div>
            </div>

            {/* Footer Row with Signatures & QR Code */}
            <div className="border-t-2 border-slate-900 pt-4 flex items-end justify-between">
              {/* Left: Issue Date & Verification Note */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-bold">Issued:</span>
                  <span>{certificate.issueDate}</span>
                </div>
                <div className="text-[9px] font-mono text-slate-500 max-w-[280px] leading-tight">
                  Official VeeGo course completion & assessment certificate. Validate authentic status using the QR code.
                </div>
              </div>

              {/* Center: Official Seal / Badge */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-blue-600 flex flex-col items-center justify-center bg-blue-50 text-blue-800">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-[8px] font-mono font-black uppercase mt-0.5">VERIFIED</span>
                </div>
                <span className="text-[9px] font-mono text-slate-600 font-bold mt-1">
                  Director of Training, VeeGo
                </span>
              </div>

              {/* Right: Live QR Code to Public Verification URL */}
              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-[4px] border border-slate-200">
                <div className="bg-white p-1 rounded-[2px] border border-slate-300">
                  <QRCodeSVG
                    value={verificationUrl}
                    size={64}
                    level="M"
                    includeMargin={false}
                  />
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-mono uppercase font-bold text-slate-700 block">
                    Scan to Verify
                  </span>
                  <span className="text-[8px] font-mono text-slate-500 block">
                    veegotech.com/verify
                  </span>
                  <span className="text-[8px] font-mono text-emerald-600 font-bold block mt-0.5">
                    ● Tamper-Evident ID
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Disclaimer */}
        <div className="p-4 bg-[#0B0F19] border-t border-slate-800 text-center text-xs text-slate-400 font-mono">
          Certificate ID: <span className="text-blue-400 font-bold">{certificate.id}</span> · Tamper-evident record authenticated in VeeGo registry.
        </div>
      </div>
    </div>
  );
};
