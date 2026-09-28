import React, { useState } from 'react';
import type { FoclenCertificateData } from '../types/foclen';
import { FoclenTemplate } from './FoclenTemplate';
import { downloadFoclenCertificatePDF, printFoclenCertificate } from '../services/foclenPdfGenerator';
import {
  Download,
  Printer,
  Save,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  User,
  Briefcase,
  Layers,
} from 'lucide-react';

interface FoclenEditorProps {
  initialData?: FoclenCertificateData;
  onSave: (data: FoclenCertificateData) => void;
  onCancel: () => void;
}

export const FoclenEditor: React.FC<FoclenEditorProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FoclenCertificateData>(() => {
    if (initialData) return initialData;
    return {
      id: `FOC-${Date.now().toString().slice(-4)}`,
      certificateNumber: `FOCLEN/INT/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      issueDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '.'),
      studentName: 'Sri Prakash. S',
      studentPrefix: 'Mr.',
      role: 'full-stack developer',
      periodDescription: 'three months from Dec 2024 to March 2025',
      proficiencyDescription: 'both front-end and back-end development',
      contributionsDescription: 'building intuitive user interfaces, implementing server-side logic, and managing databases to deliver end-to-end solutions',
      signatory1: {
        name: 'VEERALAKSHMI V',
        designation: 'Project Manager',
        signedBy: 'Veeralakshmi.V',
        signDate: `${new Date().toLocaleDateString('en-GB')} 14:52:24`,
      },
      signatory2: {
        name: 'VIVEKANANDAN V',
        designation: 'HR Manager',
        signedBy: 'Vivekanandan.V',
        signDate: `${new Date().toLocaleDateString('en-GB')} 14:52:24`,
      },
      registeredAddress: 'NO- 2/91 SCHOOL STREET, SRIRENGAPURAM, THENI, TAMILNADU 625534, India',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  const [zoomLevel, setZoomLevel] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return Number(Math.max(0.38, (window.innerWidth - 32) / 794).toFixed(2));
    }
    return 0.72;
  });
  const [viewMode, setViewMode] = useState<'form' | 'preview'>('form');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportStatus, setExportStatus] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleFieldChange = (field: keyof FoclenCertificateData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleSignatoryChange = (
    signatoryKey: 'signatory1' | 'signatory2',
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [signatoryKey]: {
        ...prev[signatoryKey],
        [field]: value,
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setExportStatus('Rendering 300 DPI high-resolution PDF...');
    try {
      await downloadFoclenCertificatePDF('foclen-live-preview', formData, (status) => {
        setExportStatus(status);
      });
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF. Please try again or use the print button.');
    } finally {
      setIsExporting(false);
      setExportStatus('');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Action Header */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sticky top-2 z-30">
        <div className="flex items-center justify-between md:justify-start gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-95 shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold bg-orange-100 text-orange-800 border border-orange-200 px-2 py-0.5 rounded-md shrink-0">
                  {formData.certificateNumber || formData.id}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[140px] sm:max-w-none">
                  {formData.studentName || 'Student Name'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Foclen Software Pvt. Ltd. Internship Certificate Studio</p>
            </div>
          </div>

          {/* Mobile View Toggle */}
          <div className="flex lg:hidden items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('form')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'form' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Form
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'preview' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 justify-end">
          <button
            type="button"
            onClick={() => printFoclenCertificate()}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-95 shrink-0"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="hidden xs:inline">Print</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 active:from-orange-700 active:to-amber-700 rounded-xl transition-all shadow-md active:scale-95 flex-1 sm:flex-initial"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exporting...' : 'Download PDF'}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 active:bg-black rounded-xl transition-all shadow-md active:scale-95 flex-1 sm:flex-initial"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Certificate saved successfully!</span>
        </div>
      )}

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form Controls (5 cols) */}
        <div className={`${viewMode === 'form' ? 'block' : 'hidden lg:block'} lg:col-span-5 space-y-5`}>
          
          {/* Section 1: Intern Details */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-4 h-4 text-orange-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Intern Details</h2>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-1">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Prefix</label>
                <select
                  value={formData.studentPrefix}
                  onChange={(e) => handleFieldChange('studentPrefix', e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </div>
              <div className="col-span-3">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Student / Intern Name</label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => handleFieldChange('studentName', e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  placeholder="e.g. Sri Prakash. S"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Issue Date</label>
                <input
                  type="text"
                  value={formData.issueDate}
                  onChange={(e) => handleFieldChange('issueDate', e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  placeholder="e.g. 17.03.2025"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Reference Number</label>
                <input
                  type="text"
                  value={formData.certificateNumber}
                  onChange={(e) => handleFieldChange('certificateNumber', e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-mono"
                  placeholder="FOCLEN/INT/2025/089"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Internship Scope & Role */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Briefcase className="w-4 h-4 text-orange-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Role & Scope</h2>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Internship Role / Domain</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => handleFieldChange('role', e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                placeholder="e.g. full-stack developer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Period / Duration Text</label>
              <input
                type="text"
                value={formData.periodDescription}
                onChange={(e) => handleFieldChange('periodDescription', e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                placeholder="e.g. three months from Dec 2024 to March 2025"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Technical Proficiency Highlights</label>
              <textarea
                rows={2}
                value={formData.proficiencyDescription}
                onChange={(e) => handleFieldChange('proficiencyDescription', e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                placeholder="e.g. both front-end and back-end development"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Key Contributions & Responsibilities</label>
              <textarea
                rows={3}
                value={formData.contributionsDescription}
                onChange={(e) => handleFieldChange('contributionsDescription', e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                placeholder="e.g. building intuitive user interfaces, implementing server-side logic, and managing databases..."
              />
            </div>
          </div>

          {/* Section 3: Digital Signatures & Footer */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Layers className="w-4 h-4 text-orange-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Digital Signatures</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Signatory 1 */}
              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-orange-700 uppercase">Left Signatory (PM)</span>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500">Name</label>
                  <input
                    type="text"
                    value={formData.signatory1.name}
                    onChange={(e) => handleSignatoryChange('signatory1', 'name', e.target.value)}
                    className="w-full text-xs font-bold bg-white border border-slate-200 rounded-lg px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500">Designation</label>
                  <input
                    type="text"
                    value={formData.signatory1.designation}
                    onChange={(e) => handleSignatoryChange('signatory1', 'designation', e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500">Digital Sign Date</label>
                  <input
                    type="text"
                    value={formData.signatory1.signDate}
                    onChange={(e) => handleSignatoryChange('signatory1', 'signDate', e.target.value)}
                    className="w-full text-xs font-mono bg-white border border-slate-200 rounded-lg px-2 py-1"
                  />
                </div>
              </div>

              {/* Signatory 2 */}
              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-orange-700 uppercase">Right Signatory (HR)</span>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500">Name</label>
                  <input
                    type="text"
                    value={formData.signatory2.name}
                    onChange={(e) => handleSignatoryChange('signatory2', 'name', e.target.value)}
                    className="w-full text-xs font-bold bg-white border border-slate-200 rounded-lg px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500">Designation</label>
                  <input
                    type="text"
                    value={formData.signatory2.designation}
                    onChange={(e) => handleSignatoryChange('signatory2', 'designation', e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500">Digital Sign Date</label>
                  <input
                    type="text"
                    value={formData.signatory2.signDate}
                    onChange={(e) => handleSignatoryChange('signatory2', 'signDate', e.target.value)}
                    className="w-full text-xs font-mono bg-white border border-slate-200 rounded-lg px-2 py-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Company Registered Address</label>
              <textarea
                rows={2}
                value={formData.registeredAddress}
                onChange={(e) => handleFieldChange('registeredAddress', e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
              />
            </div>
          </div>

        </div>

        {/* Right Live Preview Viewport (7 cols) */}
        <div className={`${viewMode === 'preview' ? 'block' : 'hidden lg:block'} lg:col-span-7 sticky top-24`}>
          <div className="bg-slate-100/90 border border-slate-300/80 rounded-3xl p-3 sm:p-5 shadow-sm flex flex-col items-center">
            
            {/* Viewport Action Header */}
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-200 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Live Print Preview (A4 300 DPI)
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.35, Number((z - 0.08).toFixed(2))))}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-600"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono font-bold text-slate-700 px-2 min-w-[38px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(1.2, Number((z + 0.08).toFixed(2))))}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-600"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(0.72)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-600 ml-1 border-l border-slate-200"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Canvas Scaled Wrapper */}
            <div className="w-full overflow-auto flex items-center justify-center p-2">
              <div
                style={{
                  width: `${794 * zoomLevel}px`,
                  height: `${1123 * zoomLevel}px`,
                  minWidth: `${794 * zoomLevel}px`,
                  minHeight: `${1123 * zoomLevel}px`,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '794px',
                    height: '1123px',
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top left',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                >
                  <FoclenTemplate
                    data={formData}
                    containerId="foclen-live-preview"
                  />
                </div>
              </div>
            </div>

            {/* Export Status */}
            {isExporting && (
              <div className="w-full mt-3 p-2 bg-orange-600/10 border border-orange-300 rounded-xl text-xs text-orange-800 text-center font-bold animate-pulse">
                {exportStatus || 'Generating high-definition A4 PDF...'}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
