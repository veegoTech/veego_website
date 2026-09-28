import React from 'react';
import type { FoclenCertificateData } from '../types/foclen';

interface FoclenTemplateProps {
  data: FoclenCertificateData;
  containerId?: string;
  isPrintMode?: boolean;
}

export const FoclenTemplate: React.FC<FoclenTemplateProps> = ({
  data,
  containerId = 'foclen-certificate-canvas',
  isPrintMode = false,
}) => {
  const studentPrefix = data.studentPrefix || 'Mr.';
  const studentFullName = `${studentPrefix} ${data.studentName || 'Student Name'}`;
  const shortStudentName = data.studentName || 'the student';

  return (
    <div
      id={containerId}
      className={`relative bg-white text-slate-900 mx-auto select-none overflow-hidden ${
        isPrintMode ? '' : 'shadow-2xl'
      }`}
      style={{
        width: '794px', // standard A4 width at 96 DPI
        height: '1123px', // standard A4 height at 96 DPI
        minWidth: '794px',
        minHeight: '1123px',
        maxWidth: '794px',
        maxHeight: '1123px',
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF',
        fontFamily: "'Inter', 'Arial', sans-serif",
        padding: '54px 64px 48px 64px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* TOP SECTION: LOGO & DATE */}
      <div>
        {/* Header with Logo and Date */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center">
            <img
              src="/foclen_assets/image1.jpg"
              alt="FOCLEN SOFTWARE - BELIEVE IN PROCESS"
              style={{
                height: '62px',
                objectFit: 'contain',
              }}
            />
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-slate-700 tracking-wide">
              Date: <span className="font-bold text-slate-900">{data.issueDate || '17.03.2025'}</span>
            </span>
            {data.certificateNumber && (
              <div className="text-xs font-mono text-slate-400 mt-0.5">
                Ref: {data.certificateNumber}
              </div>
            )}
          </div>
        </div>

        {/* CERTIFICATE TITLE */}
        <div style={{ width: '100%', textAlign: 'center', marginTop: '16px', marginBottom: '22px' }}>
          <div 
            style={{
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              color: '#0f172a',
              textTransform: 'uppercase',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              fontFamily: "'Outfit', 'Inter', sans-serif",
            }}
          >
            INTERNSHIP COMPLETION CERTIFICATE
          </div>
          <div style={{ width: '100%', height: '2px', backgroundColor: '#f97316', marginTop: '8px' }} />
        </div>

        {/* BODY PARAGRAPHS */}
        <div style={{ width: '100%', fontSize: '14.5px', color: '#1e293b', fontFamily: "'Inter', 'Arial', sans-serif" }}>
          {/* Paragraph 1 */}
          <p style={{ margin: '0 0 20px 0', lineHeight: '1.85', textAlign: 'justify', textJustify: 'inter-word' }}>
            This is to certify that{' '}
            <strong style={{ fontWeight: 700, color: '#020617' }}>
              {studentFullName}
            </strong>
            , has successfully completed an internship program at{' '}
            <strong style={{ fontWeight: 600, color: '#020617' }}>Foclen Software Pvt. Ltd.</strong>, for a
            period of{' '}
            <span style={{ fontWeight: 500, color: '#0f172a' }}>
              {data.periodDescription || 'three months from Dec 2024 to March 2025'}
            </span>
            .
          </p>

          {/* Paragraph 2 */}
          <p style={{ margin: '0 0 20px 0', lineHeight: '1.85', textAlign: 'justify', textJustify: 'inter-word' }}>
            During the internship tenure,{' '}
            <strong style={{ fontWeight: 700, color: '#020617' }}>{shortStudentName}</strong> demonstrated strong
            commitment, excellent technical skills, and a keen ability to learn and adapt to various
            challenges. The individual has worked as a{' '}
            <strong style={{ fontWeight: 700, color: '#020617' }}>
              {data.role || 'full-stack developer'}
            </strong>
            , showcasing proficiency in{' '}
            <span style={{ fontWeight: 500, color: '#0f172a' }}>
              {data.proficiencyDescription || 'both front-end and back-end development'}
            </span>
            . Their contributions include{' '}
            <span style={{ fontWeight: 500, color: '#0f172a' }}>
              {data.contributionsDescription ||
                'building intuitive user interfaces, implementing server-side logic, and managing databases to deliver end-to-end solutions'}
            </span>
            .
          </p>

          {/* Paragraph 3 */}
          <p style={{ margin: '0 0 20px 0', lineHeight: '1.85', textAlign: 'justify', textJustify: 'inter-word' }}>
            They actively contributed to real-time projects, gaining hands-on experience in areas such as
            coding, software development, and problem-solving.
          </p>

          {/* Paragraph 4 */}
          <p style={{ margin: '0', lineHeight: '1.85', textAlign: 'justify', textJustify: 'inter-word' }}>
            We appreciate the dedication and hard work shown by{' '}
            <strong style={{ fontWeight: 700, color: '#020617' }}>{shortStudentName}</strong> and wish them the best
            in their future endeavors.
          </p>
        </div>
      </div>

      {/* BOTTOM SECTION: SIGNATURES & REGISTERED FOOTER */}
      <div>
        {/* Sincerely Notice */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-slate-700 italic">Sincerely,</p>
        </div>

        {/* Dual Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-2 pb-6 border-b border-slate-200">
          {/* Signatory 1 (Project Manager) */}
          <div className="space-y-1">
            <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-2.5 shadow-sm text-xs font-mono text-slate-700 space-y-0.5">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{data.signatory1?.name || 'VEERALAKSHMI V'}</span>
              </div>
              <div className="text-[11px] text-slate-500">
                digitally signed by <span className="font-bold text-slate-700">{data.signatory1?.signedBy || 'Veeralakshmi.V'}</span>
              </div>
              <div className="text-[10.5px] text-slate-400">
                Date : {data.signatory1?.signDate || '15/03/2025 14:52:24'}
              </div>
            </div>
            <div className="pt-1.5">
              <p className="text-[13px] font-black text-slate-900 tracking-wide uppercase">
                {data.signatory1?.name || 'VEERALAKSHMI V'}{' '}
                <span className="font-semibold text-slate-500 text-xs">| {data.signatory1?.designation || 'Project Manager'}</span>
              </p>
            </div>
          </div>

          {/* Signatory 2 (HR Manager) */}
          <div className="space-y-1">
            <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-2.5 shadow-sm text-xs font-mono text-slate-700 space-y-0.5">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{data.signatory2?.name || 'VIVEKANANDAN V'}</span>
              </div>
              <div className="text-[11px] text-slate-500">
                digitally signed by <span className="font-bold text-slate-700">{data.signatory2?.signedBy || 'Vivekanandan.V'}</span>
              </div>
              <div className="text-[10.5px] text-slate-400">
                Date : {data.signatory2?.signDate || '15/03/2025 14:52:24'}
              </div>
            </div>
            <div className="pt-1.5">
              <p className="text-[13px] font-black text-slate-900 tracking-wide uppercase">
                {data.signatory2?.name || 'VIVEKANANDAN V'}{' '}
                <span className="font-semibold text-slate-500 text-xs">| {data.signatory2?.designation || 'HR Manager'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Registered Address Footer */}
        <div className="pt-3 text-center text-xs text-slate-500 leading-relaxed">
          <p className="font-bold text-slate-800 tracking-wide text-[12px] uppercase">
            FocLen Software Private Limited
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            {data.registeredAddress || 'REGISTERED ADDRESS NO- 2/91 SCHOOL STREET, SRIRENGAPURAM, THENI, TAMILNADU 625534, India'}
          </p>
        </div>
      </div>
    </div>
  );
};
