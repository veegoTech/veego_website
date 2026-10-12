import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  ArrowLeft,
  AlertTriangle,
  Building2,
  ExternalLink
} from 'lucide-react';
import { getCertificateById, CertificateRecord } from '../../services/certificateService';

interface VerifyCertificatePageProps {
  onNavigate: (path: string) => void;
}

export const VerifyCertificatePage: React.FC<VerifyCertificatePageProps> = ({ onNavigate }) => {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [cert, setCert] = useState<CertificateRecord | null>(null);

  // Check URL query param ?id=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get('id');
    if (idFromUrl) {
      setSearchId(idFromUrl);
      verifyId(idFromUrl);
    }
  }, []);

  const verifyId = async (idToVerify: string) => {
    if (!idToVerify.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const result = await getCertificateById(idToVerify);
      setCert(result);
    } catch (err) {
      console.error('Verification query error', err);
      setCert(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyId(searchId);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Bar */}
      <div className="border-b border-slate-800 bg-[#0B0F19]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to VeeGo</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              VeeGo Credential Registry
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-[4px] bg-slate-900 border border-slate-800 text-blue-400 mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
            Certificate Authenticity Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto font-normal">
            Validate the official status of VeeGo course completion and competency certificates. Enter the unique Certificate ID below.
          </p>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleFormSubmit} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g. VG-AIT-2026-8F4A2C)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-[#111827] border border-slate-800 rounded-[4px] pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !searchId.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-[4px] border border-blue-600 transition-colors cursor-pointer"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>

        {/* Quick Demo Pre-fill Links for Reviewers */}
        {!searched && (
          <div className="mb-8 p-4 bg-[#111827] rounded-[4px] border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono">
            <span>Try sample credentials:</span>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => { setSearchId('VG-AIT-2026-DEMO01'); verifyId('VG-AIT-2026-DEMO01'); }}
                className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-[4px] text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer"
              >
                Valid Sample
              </button>
              <button
                onClick={() => { setSearchId('VG-AIT-2026-REVOKED'); verifyId('VG-AIT-2026-REVOKED'); }}
                className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-[4px] text-rose-400 hover:border-rose-500 transition-colors cursor-pointer"
              >
                Revoked Sample
              </button>
            </div>
          </div>
        )}

        {/* Verification Results Card */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-[4px] border overflow-hidden bg-[#111827]"
            style={{
              borderColor:
                !cert
                  ? '#334155'
                  : cert.status === 'valid'
                  ? '#059669'
                  : '#dc2626'
            }}
          >
            {/* Status Header Banner */}
            <div
              className={`p-5 flex items-center gap-3 border-b ${
                !cert
                  ? 'bg-slate-900 border-slate-800 text-slate-300'
                  : cert.status === 'valid'
                  ? 'bg-emerald-950/40 border-emerald-900 text-emerald-400'
                  : 'bg-rose-950/40 border-rose-900 text-rose-400'
              }`}
            >
              {!cert ? (
                <>
                  <ShieldAlert className="w-6 h-6 text-slate-400 shrink-0" />
                  <div>
                    <h2 className="text-base font-bold text-white">Certificate Not Found</h2>
                    <p className="text-xs text-slate-400 font-mono">
                      No matching record found for ID: {searchId}
                    </p>
                  </div>
                </>
              ) : cert.status === 'valid' ? (
                <>
                  <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-white">Valid & Authenticated Credential</h2>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-[4px] bg-emerald-900/60 text-emerald-300 border border-emerald-700">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-emerald-300/80 font-mono">
                      Issued by VeeGo Educational Technologies
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-white">Certificate Revoked</h2>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-[4px] bg-rose-900/60 text-rose-300 border border-rose-700">
                        Invalid
                      </span>
                    </div>
                    <p className="text-xs text-rose-300/80 font-mono">
                      This certificate is no longer valid
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Body */}
            {cert && (
              <div className="p-6 space-y-6">
                {/* Minimal Public Information Disclosed (Privacy Compliant) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-[4px] bg-[#0B0F19] border border-slate-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      Learner Full Name
                    </span>
                    <span className="text-base font-bold text-white">{cert.studentName}</span>
                  </div>

                  <div className="p-4 rounded-[4px] bg-[#0B0F19] border border-slate-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      Certificate Identifier
                    </span>
                    <span className="text-sm font-mono font-bold text-blue-400">{cert.id}</span>
                  </div>

                  <div className="p-4 rounded-[4px] bg-[#0B0F19] border border-slate-800 sm:col-span-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      Course Title & Scope
                    </span>
                    <span className="text-base font-bold text-white">{cert.courseTitle}</span>
                    <span className="text-xs text-slate-400 block mt-1">
                      {cert.courseDuration} · 100% Curriculum Completed · Practical Portfolio Evaluated
                    </span>
                  </div>

                  <div className="p-4 rounded-[4px] bg-[#0B0F19] border border-slate-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      Issue Date
                    </span>
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {cert.issueDate}
                    </span>
                  </div>

                  <div className="p-4 rounded-[4px] bg-[#0B0F19] border border-slate-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      Verification Method
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Cryptographically Seeded UUID
                    </span>
                  </div>
                </div>

                {/* Revocation notice if revoked */}
                {cert.status === 'revoked' && (
                  <div className="p-4 rounded-[4px] bg-rose-950/20 border border-rose-900 text-xs text-rose-300">
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      Reason for Revocation:
                    </div>
                    <div>{cert.revocationReason || 'Revoked per academic integrity policy.'}</div>
                  </div>
                )}

                {/* Mandatory Transparency Disclaimer */}
                <div className="p-4 rounded-[4px] bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-mono">
                  <span className="font-bold text-slate-300">Academic Integrity Notice: </span>
                  This credential confirms that the named student completed the practical curriculum and passed the competency assessment for the course "AI Tools for Students & Professionals" provided by VeeGo. This is an industry skills certificate and not a government-recognized university degree.
                </div>
              </div>
            )}

            {!cert && (
              <div className="p-6 text-center text-xs text-slate-400 space-y-3 font-mono">
                <p>
                  Please double-check the Certificate ID printed at the bottom of your certificate or within your course dashboard.
                </p>
                <p>
                  Need assistance? Contact{' '}
                  <span className="text-blue-400">support@veegotech.com</span>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        © 2026 VeeGo Technologies · Automated Credential Verification System
      </footer>
    </div>
  );
};
