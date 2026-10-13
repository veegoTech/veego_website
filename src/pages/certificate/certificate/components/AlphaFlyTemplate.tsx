import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { CertificateData, CustomAssets } from '../types/certificate';

interface AlphaFlyTemplateProps {
  data: CertificateData;
  customAssets?: CustomAssets;
  containerId?: string;
  isPrintMode?: boolean;
}

/**
 * Official VeeGo Technologies Certificate of Participation Template.
 * High-fidelity landscape A4 format matching the official VeeGo brand design.
 */
export const AlphaFlyTemplate: React.FC<AlphaFlyTemplateProps> = ({
  data,
  customAssets = {},
  containerId = 'certificate-canvas',
  isPrintMode = false,
}) => {
  const studentName = data.studentName || 'Suriya Prakash';
  const courseName = data.courseName || 'Google Sheets for Business Automation';
  const certId = data.id || 'VG-GS-2026-000127';

  // Dynamic font sizing for student name to guarantee flawless visual fit
  const getStudentNameFontSize = (name: string) => {
    const len = name.length;
    if (len > 34) return '28px';
    if (len > 26) return '34px';
    if (len > 18) return '40px';
    return '46px';
  };

  // Format date for "held on 15th September 2026."
  const formatHeldOnDate = (dateVal?: string) => {
    if (!dateVal) return '15th September 2026';
    try {
      const d = new Date(dateVal);
      if (!isNaN(d.getTime())) {
        const day = d.getDate();
        const suffix = (day === 1 || day === 21 || day === 31) ? 'st' :
                       (day === 2 || day === 22) ? 'nd' :
                       (day === 3 || day === 23) ? 'rd' : 'th';
        const month = d.toLocaleString('en-US', { month: 'long' });
        const year = d.getFullYear();
        return `${day}${suffix} ${month} ${year}`;
      }
    } catch {
      // fallback
    }
    return dateVal;
  };

  // Format short date for laurel wreath "15-09-2026"
  const formatShortDate = (dateVal?: string) => {
    if (!dateVal) return '15-09-2026';
    try {
      const d = new Date(dateVal);
      if (!isNaN(d.getTime())) {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      }
    } catch {
      // fallback
    }
    return dateVal;
  };

  const rawDate = data.issueDate || data.endDate || data.generatedDate || '2026-09-15';
  const heldOnDateStr = formatHeldOnDate(rawDate);
  const shortDateStr = formatShortDate(rawDate);

  const verificationUrl =
    data.qrCodeUrl ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}/verify/${certId}`
      : `https://veegotech.com/verify/${certId}`);

  return (
    <div
      id={containerId}
      className={`relative bg-white text-slate-900 mx-auto select-none overflow-hidden ${
        isPrintMode ? '' : 'shadow-2xl'
      }`}
      style={{
        width: '1056px', // Standard A4 Landscape width (297mm @ 90-96 DPI)
        height: '747px',  // Standard A4 Landscape height (210mm @ 90-96 DPI)
        minWidth: '1056px',
        minHeight: '747px',
        maxWidth: '1056px',
        maxHeight: '747px',
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF',
        fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif",
      }}
    >
      {/* 1. High-Resolution Official VeeGo Template Background Image */}
      <img
        src="/veego_certificate_template.png"
        alt="VeeGo Certificate Template"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* 2. DYNAMIC FIELD: Student Name in luxury calligraphy script font */}
      <div
        style={{
          position: 'absolute',
          top: '39.8%',
          left: '21%',
          width: '58%',
          height: '12.2%',
          background: '#ffffff',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <span
          style={{
            fontFamily: "'Great Vibes', 'Alex Brush', cursive",
            fontSize: getStudentNameFontSize(studentName),
            color: '#0f172a',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '0.5px',
            textShadow: '0 1px 1px rgba(0,0,0,0.05)',
            whiteSpace: 'nowrap',
            padding: '0 10px'
          }}
        >
          {studentName}
        </span>
      </div>

      {/* 3. DYNAMIC FIELD: Course Title */}
      <div
        style={{
          position: 'absolute',
          top: '56.4%',
          left: '20%',
          width: '60%',
          height: '5.2%',
          background: '#ffffff',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <span
          style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#0284c7',
            fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif",
            letterSpacing: '-0.3px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%'
          }}
        >
          {courseName}
        </span>
      </div>

      {/* 4. DYNAMIC FIELD: Held On Date */}
      <div
        style={{
          position: 'absolute',
          top: '64.5%',
          left: '24%',
          width: '52%',
          height: '3.6%',
          background: '#ffffff',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <span
          style={{
            fontSize: '14.5px',
            fontWeight: 500,
            color: '#334155',
            fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif"
          }}
        >
          held on {heldOnDateStr}.
        </span>
      </div>

      {/* 5. DYNAMIC FIELD: Date inside Laurel Wreath */}
      <div
        style={{
          position: 'absolute',
          top: '80.0%',
          left: '43.2%',
          width: '13.6%',
          height: '3.2%',
          background: '#ffffff',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <span
          style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#0f172a',
            letterSpacing: '0.6px',
            fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif"
          }}
        >
          {shortDateStr}
        </span>
      </div>

      {/* 6. DYNAMIC FIELD: Live Scannable QR Code and Certificate ID */}
      <div
        style={{
          position: 'absolute',
          top: '73.2%',
          right: '3.8%',
          width: '12%',
          height: '20%',
          background: '#ffffff',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px'
        }}
      >
        <div
          style={{
            background: '#ffffff',
            padding: '3px',
            borderRadius: '4px',
            display: 'inline-flex',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}
        >
          <QRCodeSVG
            value={verificationUrl}
            size={74}
            level="M"
            includeMargin={false}
          />
        </div>
        <div
          style={{
            fontSize: '9px',
            fontWeight: 800,
            color: '#475569',
            letterSpacing: '0.8px',
            marginTop: '2px',
            fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif"
          }}
        >
          CERTIFICATE ID
        </div>
        <div
          style={{
            fontSize: '9.5px',
            fontWeight: 800,
            color: '#0f172a',
            fontFamily: "'Consolas', monospace",
            letterSpacing: '-0.2px'
          }}
        >
          {certId}
        </div>
      </div>

      {/* 7. CUSTOM SIGNATURE OVERLAYS (Optional, if custom assets provided) */}
      {customAssets?.signature && (
        <div
          style={{
            position: 'absolute',
            top: '75.2%',
            left: '19.5%',
            width: '18%',
            height: '8%',
            background: '#ffffff',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={customAssets.signature}
            alt="Instructor Signature"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
      )}

      {customAssets?.founderSignature && (
        <div
          style={{
            position: 'absolute',
            top: '75.2%',
            right: '19.5%',
            width: '18%',
            height: '8%',
            background: '#ffffff',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={customAssets.founderSignature}
            alt="Founder Signature"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
};

// Also export as VeeGoCertificateTemplate for modern imports
export const VeeGoCertificateTemplate = AlphaFlyTemplate;
export default AlphaFlyTemplate;
