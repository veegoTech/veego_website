import React, { useState, useEffect } from 'react';
import { CertificateApp } from './certificate/CertificateApp';
import { IDCardApp } from './idcard/IDCardApp';
import { 
  Award,
  CreditCard,
  Building2,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import './certificate.css';

interface CertificateManagerProps {
  session?: any;
  students?: any[];
  initialModule?: 'certificates' | 'idcards';
  onSelectModule?: (mod: 'certificates' | 'idcards') => void;
  onBack?: () => void;
}

export default function CertificateManager({ 
  session, 
  students = [], 
  initialModule = 'certificates',
  onSelectModule,
  onBack 
}: CertificateManagerProps) {
  const [activeModule, setActiveModule] = useState<'certificates' | 'idcards'>(
    initialModule === 'idcards' ? 'idcards' : 'certificates'
  );

  useEffect(() => {
    if (initialModule && initialModule !== activeModule) {
      setActiveModule(initialModule);
    }
  }, [initialModule]);

  const handleModuleChange = (mod: 'certificates' | 'idcards') => {
    setActiveModule(mod);
    if (onSelectModule) {
      onSelectModule(mod);
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen rounded-2xl border border-slate-200 overflow-hidden font-sans flex flex-col">
      
      {/* Top Header / Action Bar */}
      <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between min-h-[4.25rem] py-2 gap-3 flex-wrap md:flex-nowrap">
            
            {/* Left: Back button */}
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200 cursor-pointer"
                  title="Return to LMS Dashboard"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>
              )}
            </div>

            {/* Center: Module Switcher (Certificates vs ID Cards) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto max-w-full order-3 md:order-2 w-full md:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={() => handleModuleChange('certificates')}
                className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex-1 sm:flex-initial cursor-pointer ${
                  activeModule === 'certificates'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${activeModule === 'certificates' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>Certificate</span>
              </button>

              <button
                type="button"
                onClick={() => handleModuleChange('idcards')}
                className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex-1 sm:flex-initial cursor-pointer ${
                  activeModule === 'idcards'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${activeModule === 'idcards' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>Student ID Card</span>
              </button>
            </div>

            {/* Right: Info Badge */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-500 order-2 md:order-3">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>VeeGo Technologies</span>
              {students.length > 0 && (
                <span className="inline-flex items-center gap-1 ml-2 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 text-[11px] font-semibold">
                  <GraduationCap className="w-3 h-3" />
                  {students.length} Enrolled Students
                </span>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {activeModule === 'certificates' && <CertificateApp />}
        {activeModule === 'idcards' && <IDCardApp />}
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-4 mt-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>© {new Date().getFullYear()} VeeGo Technologies. All rights reserved.</p>
          <p className="text-slate-400">Official ISO 9001:2015 Verified Engineering Portal</p>
        </div>
      </footer>

    </div>
  );
}
