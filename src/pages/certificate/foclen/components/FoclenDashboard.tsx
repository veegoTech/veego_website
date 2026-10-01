import React, { useState } from 'react';
import type { FoclenCertificateData } from '../types/foclen';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  FileCheck,
  Building,
  FileSpreadsheet,
} from 'lucide-react';
import { GoogleSheetSyncModal } from '../../shared/components/GoogleSheetSyncModal';

interface FoclenDashboardProps {
  certificates: FoclenCertificateData[];
  onAddNew: () => void;
  onEdit: (cert: FoclenCertificateData) => void;
  onDelete: (id: string) => void;
  onImportCertificates?: (certs: FoclenCertificateData[]) => void;
}

export const FoclenDashboard: React.FC<FoclenDashboardProps> = ({
  certificates,
  onAddNew,
  onEdit,
  onDelete,
  onImportCertificates,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);

  const filtered = certificates.filter(
    (c) =>
      (c.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.certificateNumber && c.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Hero / Header Card */}
      <div 
        className="text-white rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border border-slate-700/40"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #0A3D91 100%)',
          boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.25), 0 8px 10px -6px rgba(15, 23, 42, 0.2)'
        }}
      >
        {/* Subtle decorative background circles */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-12 w-48 h-48 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-xl space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 border border-blue-400/30 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-blue-200">
            <Building className="w-3.5 h-3.5 text-blue-300" />
            <span>Foclen Software Pvt. Ltd.</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white m-0">
            Internship Certificate Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal m-0 max-w-lg">
            Generate and manage official Foclen Software completion certificates with verified digital signatures and 300 DPI print-ready A4 PDF export.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setIsSheetModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/25 backdrop-blur-md rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Sync Google Sheet</span>
          </button>

          <button
            type="button"
            onClick={onAddNew}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 bg-white text-slate-900 hover:bg-slate-100 active:bg-slate-200 rounded-xl text-xs font-black shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>New Certificate</span>
          </button>
        </div>
      </div>

      {/* Filter and Stats Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by intern name, role, or ref number..."
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
        </div>

        {/* Count */}
        <div className="text-xs font-semibold text-slate-600 flex items-center justify-between sm:justify-end gap-2">
          <span className="bg-orange-100 text-orange-800 border border-orange-200 px-2.5 py-1 rounded-lg font-bold font-mono">
            {filtered.length}
          </span>
          <span>Certificates</span>
        </div>
      </div>

      {/* Cards Table / Grid */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Intern Name</th>
                <th className="py-3.5 px-4">Role & Domain</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Ref Number</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((cert) => (
                <tr key={cert.id} className="hover:bg-orange-50/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        {(cert.studentName || 'S').charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">
                          {cert.studentPrefix} {cert.studentName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    {cert.role}
                  </td>
                  <td className="py-3 px-4 text-slate-500 max-w-[200px] truncate">
                    {cert.periodDescription}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-700 text-xs whitespace-nowrap align-middle">
                    <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-md inline-block whitespace-nowrap">
                      {cert.certificateNumber || cert.id}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-medium whitespace-nowrap align-middle">
                    {cert.issueDate || '—'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onEdit(cert)}
                        className="p-1.5 text-slate-600 hover:text-orange-700 hover:bg-orange-100/60 rounded-lg transition-colors"
                        title="Edit Certificate"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(cert.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <FileCheck className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-sm">No internship certificates found</p>
                    <p className="text-xs text-slate-500">Click "Create New Certificate" to get started.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* GOOGLE SHEETS LIVE SYNC MODAL */}
      <GoogleSheetSyncModal
        isOpen={isSheetModalOpen}
        onClose={() => setIsSheetModalOpen(false)}
        title="Sync Internship Certificates with Google Sheets"
        moduleType="foclen"
        onImport={(importedCerts) => {
          if (onImportCertificates) {
            onImportCertificates(importedCerts);
          }
        }}
      />
    </div>
  );
};
