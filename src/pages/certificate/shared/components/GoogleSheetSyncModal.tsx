import React, { useState, useEffect } from 'react';
import {
  fetchGoogleSheetData,
  autoDetectColumnMapping,
  type ParsedSheetData,
  type ColumnMapping,
} from '../services/googleSheetsService';
import { getRandomTwoQualities } from '../../certificate/data/qualityLibrary';
import {
  X,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Link,
  HelpCircle,
  Settings2,
} from 'lucide-react';

interface GoogleSheetSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  moduleType: 'certificate' | 'idcard' | 'foclen';
  onImport: (importedRows: any[]) => void;
}

const DEFAULT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1-B2M4HCEYpjwODULGApsl0YamV-enhyIpJCKPEhFjmI/edit';
const STORAGE_SHEET_URL_KEY = 'veego_cached_google_sheet_url';

export const GoogleSheetSyncModal: React.FC<GoogleSheetSyncModalProps> = ({
  isOpen,
  onClose,
  title,
  moduleType,
  onImport,
}) => {
  const [sheetUrl, setSheetUrl] = useState<string>(DEFAULT_SHEET_URL);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [sheetData, setSheetData] = useState<ParsedSheetData | null>(null);
  const [mapping, setMapping] = useState<ColumnMapping>({});
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [showMappingConfig, setShowMappingConfig] = useState<boolean>(false);
  const [importSuccess, setImportSuccess] = useState<boolean>(false);

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_SHEET_URL_KEY);
    if (cached) {
      setSheetUrl(cached);
    } else {
      setSheetUrl(DEFAULT_SHEET_URL);
    }
  }, []);

  if (!isOpen) return null;

  const handleFetch = async () => {
    if (!sheetUrl.trim()) {
      setErrorMsg('Please enter a Google Sheet URL.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSheetData(null);
    setImportSuccess(false);

    try {
      const data = await fetchGoogleSheetData(sheetUrl);
      if (data.rows.length === 0) {
        throw new Error('Google Sheet fetched successfully, but no data rows were found.');
      }

      setSheetData(data);
      const detected = autoDetectColumnMapping(data.headers);
      setMapping(detected);

      // Select all rows by default
      const allIdx = new Set<number>();
      data.rows.forEach((_, idx) => allIdx.add(idx));
      setSelectedIndices(allIdx);

      // Save valid URL to localStorage
      localStorage.setItem(STORAGE_SHEET_URL_KEY, sheetUrl.trim());
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to fetch Google Sheet data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSelectAll = () => {
    if (!sheetData) return;
    if (selectedIndices.size === sheetData.rows.length) {
      setSelectedIndices(new Set());
    } else {
      const all = new Set<number>();
      sheetData.rows.forEach((_, idx) => all.add(idx));
      setSelectedIndices(all);
    }
  };

  const handleToggleRow = (idx: number) => {
    setSelectedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleExecuteImport = () => {
    if (!sheetData || selectedIndices.size === 0) return;

    const importedRecords: any[] = [];
    sheetData.rows.forEach((row, idx) => {
      if (!selectedIndices.has(idx)) return;

      const studentName = mapping.studentName ? row[mapping.studentName] || '' : '';
      const courseName = mapping.courseName ? row[mapping.courseName] || '' : '';
      const duration = mapping.duration ? row[mapping.duration] || '' : '';
      const issueDate = mapping.issueDate ? row[mapping.issueDate] || '' : '';
      const contact = mapping.studentContact ? row[mapping.studentContact] || '' : '';
      const dob = mapping.dob ? row[mapping.dob] || '' : '';
      const bloodGroup = mapping.bloodGroup ? row[mapping.bloodGroup] || '' : '';
      const address = mapping.address ? row[mapping.address] || '' : '';
      const photoUrl = mapping.photoUrl ? row[mapping.photoUrl] || '' : '';
      const role = mapping.role ? row[mapping.role] || courseName : '';

      if (moduleType === 'certificate') {
        const certId = `AFE-${new Date().getFullYear()}-${String(1000 + idx + 1)}`;
        const defaultDate = new Date().toISOString().split('T')[0];
        const dateStr = issueDate.trim() || defaultDate;
        const qualities = getRandomTwoQualities();

        importedRecords.push({
          id: certId,
          studentName: studentName.trim() || `Student ${idx + 1}`,
          courseName: courseName.trim() || 'Full Stack Development in Python',
          startDate: '2024-09-02',
          endDate: '2024-12-14',
          formattedDuration: duration.trim() || 'Sep 02,2024 - Dec 14,2024',
          issueDate: dateStr,
          generatedDate: dateStr,
          photoUrl: photoUrl.trim() || '/id_card_assets/sample_student_photo.jpg',
          description: `has successfully completed the ${courseName.trim() || 'Full Stack Development in Python'} program, and has also successfully completed a Full Stack Development Internship.`,
          qualities: qualities,
          finalAssessment: [
            'HTML',
            'CSS',
            'JS',
            'Bootstrap',
            'JSON',
            'Git/GitHub',
            'DevOps',
            'React',
            'Python',
            'Django and SQL'
          ],
          finalAssessmentRaw: 'HTML, CSS, JS, Bootstrap, JSON, Git/GitHub, DevOps, React, Python, Django and SQL',
          qrCodeUrl: `https://veego-tech.vercel.app/verify/${certId}`,
          templateId: 'template-1',
          status: 'verified',
        });
      } else if (moduleType === 'idcard') {
        const idCardNum = `AF-ID-${new Date().getFullYear()}-${String(100 + idx + 1)}`;
        importedRecords.push({
          id: idCardNum,
          studentName: studentName.trim() || `Student ${idx + 1}`,
          courseName: courseName.trim() || 'TALLY',
          studentContact: contact.trim() || '7397165195',
          emergencyPhone: contact.trim() || '9384266256',
          parentPhone: contact.trim() || '9384266256',
          emergencyContact: contact.trim() || '9384266256',
          dob: dob.trim() || '2002-03-20',
          bloodGroup: bloodGroup.trim() || 'B+ve',
          address: address.trim() || 'Theni, Tamil Nadu',
          photoUrl: photoUrl.trim() || '/id_card_assets/sample_student_photo.jpg',
          issueDate: issueDate.trim() || new Date().toISOString().split('T')[0],
          validUntil: '2026-12-31',
          qrCodeUrl: `https://veego-tech.vercel.app/verify/${idCardNum}`,
        });
      } else if (moduleType === 'foclen') {
        const foclenId = `FOC-${Date.now().toString().slice(-4)}-${idx + 1}`;
        importedRecords.push({
          id: foclenId,
          certificateNumber: `FOCLEN/INT/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
          issueDate: issueDate.trim() || new Date().toLocaleDateString('en-GB').replace(/\//g, '.'),
          studentName: studentName.trim() || `Student ${idx + 1}`,
          studentPrefix: 'Mr.',
          role: role.trim() || 'full-stack developer',
          periodDescription: duration.trim() || 'three months from Dec 2024 to March 2025',
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
        });
      }
    });

    onImport(importedRecords);
    setImportSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleDownloadSampleCsv = () => {
    const headers = [
      'Student Name',
      'Course Name',
      'Course Duration',
      'Contact Phone',
      'DOB',
      'Blood Group',
      'Address',
      'Issue Date',
      'Photo URL',
    ];
    const sampleRows = [
      'Sri Prakash. S,Full Stack Python,3 Months (320 Hours),7397165195,03/20/2002,B+ve,Theni Tamil Nadu,17.03.2025,/id_card_assets/sample_student_photo.jpg',
      'AARTHI R,Tally Prime with GST,2 Months (180 Hours),9384266256,01/01/2004,AB+ve,Theni Tamil Nadu,18.03.2025,/id_card_assets/sample_student_photo.jpg',
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...sampleRows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'VeeGo_Student_Template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-scale-up">
        
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-orange-50 via-amber-50 to-white">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center shadow-md shrink-0">
              <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">{title}</h2>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded-md shrink-0">
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 hidden xs:block">
                Connect your public Google Sheet to fetch and import records automatically.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
          
          {/* URL Input Bar */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Google Sheet Share Link (Anyone with link can view)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Link className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                  className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              <button
                type="button"
                onClick={handleFetch}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 shrink-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
                    <span>Fetching...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Fetch Data</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-500 pt-1 gap-1.5">
              <div className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>In Google Sheets, click <strong>Share ➔ Anyone with link can view</strong></span>
              </div>
              <button
                type="button"
                onClick={handleDownloadSampleCsv}
                className="text-orange-600 hover:text-orange-700 font-semibold underline underline-offset-2 flex items-center gap-1 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Sample CSV</span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Could not fetch sheet</p>
                <p className="text-[11px] text-red-700 mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Success Notification */}
          {importSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2.5 animate-fade-in font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Successfully imported {selectedIndices.size} student records!</span>
            </div>
          )}

          {/* Fetched Sheet Results */}
          {sheetData && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              
              {/* Row Stats & Column Mapping Toggle */}
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-800">
                    Found <span className="text-orange-600 font-mono font-black">{sheetData.rows.length}</span> Records
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-600 font-medium">
                    <span className="font-mono font-bold text-slate-900">{selectedIndices.size}</span> selected for import
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowMappingConfig((v) => !v)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors shadow-xs"
                  >
                    <Settings2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>{showMappingConfig ? 'Hide Column Mapping' : 'Adjust Column Mapping'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleSelectAll}
                    className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors shadow-xs"
                  >
                    {selectedIndices.size === sheetData.rows.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
              </div>

              {/* Column Mapping Config Panel */}
              {showMappingConfig && (
                <div className="p-4 bg-orange-50/60 border border-orange-200/80 rounded-2xl space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                      Auto-Detected Column Mapping
                    </span>
                    <span className="text-[11px] text-orange-700">Map Google Sheet columns to studio fields</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {/* Student Name Mapping */}
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-700 mb-1">Student Name</label>
                      <select
                        value={mapping.studentName || ''}
                        onChange={(e) => setMapping((m) => ({ ...m, studentName: e.target.value }))}
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-1.5 font-medium"
                      >
                        <option value="">-- Ignore --</option>
                        {sheetData.headers.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Course Name Mapping */}
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-700 mb-1">Course / Domain</label>
                      <select
                        value={mapping.courseName || ''}
                        onChange={(e) => setMapping((m) => ({ ...m, courseName: e.target.value }))}
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-1.5 font-medium"
                      >
                        <option value="">-- Ignore --</option>
                        {sheetData.headers.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Duration Mapping */}
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-700 mb-1">Duration / Period</label>
                      <select
                        value={mapping.duration || ''}
                        onChange={(e) => setMapping((m) => ({ ...m, duration: e.target.value }))}
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-1.5 font-medium"
                      >
                        <option value="">-- Ignore --</option>
                        {sheetData.headers.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Contact Phone Mapping */}
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-700 mb-1">Contact Phone</label>
                      <select
                        value={mapping.studentContact || ''}
                        onChange={(e) => setMapping((m) => ({ ...m, studentContact: e.target.value }))}
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-1.5 font-medium"
                      >
                        <option value="">-- Ignore --</option>
                        {sheetData.headers.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* DOB Mapping */}
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-700 mb-1">DOB</label>
                      <select
                        value={mapping.dob || ''}
                        onChange={(e) => setMapping((m) => ({ ...m, dob: e.target.value }))}
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-1.5 font-medium"
                      >
                        <option value="">-- Ignore --</option>
                        {sheetData.headers.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Blood Group Mapping */}
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-700 mb-1">Blood Group</label>
                      <select
                        value={mapping.bloodGroup || ''}
                        onChange={(e) => setMapping((m) => ({ ...m, bloodGroup: e.target.value }))}
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-1.5 font-medium"
                      >
                        <option value="">-- Ignore --</option>
                        {sheetData.headers.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Address Mapping */}
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-700 mb-1">Address / City</label>
                      <select
                        value={mapping.address || ''}
                        onChange={(e) => setMapping((m) => ({ ...m, address: e.target.value }))}
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-1.5 font-medium"
                      >
                        <option value="">-- Ignore --</option>
                        {sheetData.headers.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Photo URL Mapping */}
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-700 mb-1">Photo URL</label>
                      <select
                        value={mapping.photoUrl || ''}
                        onChange={(e) => setMapping((m) => ({ ...m, photoUrl: e.target.value }))}
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-1.5 font-medium"
                      >
                        <option value="">-- Ignore --</option>
                        {sheetData.headers.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Preview Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-[300px] overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100/80 sticky top-0 z-10 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-3 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIndices.size === sheetData.rows.length && sheetData.rows.length > 0}
                          onChange={handleToggleSelectAll}
                          className="rounded text-orange-600 focus:ring-orange-500"
                        />
                      </th>
                      <th className="p-3">#</th>
                      {sheetData.headers.map((h) => (
                        <th key={h} className="p-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sheetData.rows.map((row, idx) => {
                      const isSelected = selectedIndices.has(idx);
                      return (
                        <tr
                          key={idx}
                          onClick={() => handleToggleRow(idx)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-orange-50/50 hover:bg-orange-50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleRow(idx)}
                              className="rounded text-orange-600 focus:ring-orange-500"
                            />
                          </td>
                          <td className="p-3 font-mono text-slate-400 text-[11px]">{idx + 1}</td>
                          {sheetData.headers.map((h) => (
                            <td key={h} className="p-3 text-slate-700 whitespace-nowrap max-w-[200px] truncate">
                              {row[h] || <span className="text-slate-300 italic">—</span>}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors text-center cursor-pointer shadow-xs"
            style={{ color: '#334155', backgroundColor: '#ffffff', borderColor: '#cbd5e1' }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleExecuteImport}
            disabled={!sheetData || selectedIndices.size === 0 || importSuccess}
            style={
              importSuccess
                ? { backgroundColor: '#10b981', color: '#ffffff', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)' }
                : !sheetData || selectedIndices.size === 0
                ? { backgroundColor: '#f1f5f9', color: '#94a3b8', borderColor: '#cbd5e1' }
                : { backgroundColor: '#ea580c', color: '#ffffff', boxShadow: '0 4px 16px 0 rgba(234, 88, 12, 0.45)' }
            }
            className={`inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
              importSuccess
                ? 'bg-emerald-600 text-white shadow-lg'
                : !sheetData || selectedIndices.size === 0
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 active:from-orange-700 text-white shadow-lg active:scale-95'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 ${!sheetData || selectedIndices.size === 0 ? 'text-slate-400' : 'text-white'}`} />
            <span>
              {importSuccess ? 'Imported Successfully!' : `Import Selected (${selectedIndices.size}) Records`}
            </span>
            {!importSuccess && selectedIndices.size > 0 && (
              <span
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', color: '#ffffff' }}
                className="px-2 py-0.5 rounded-full text-xs font-black"
              >
                {selectedIndices.size}
              </span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
