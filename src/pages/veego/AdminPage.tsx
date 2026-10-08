import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Database,
  CheckSquare,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  Search,
  Bell,
  ShieldCheck,
  Users,
  FolderGit2,
  ExternalLink,
  MessageSquare,
  Phone,
  Mail,
  Download,
  RotateCcw
} from 'lucide-react';
import { Project, CustomerInquiry } from '../../types';
import {
  Customer,
  CustomerQuery,
  CustomerFeedback,
  CustomerTier
} from '../../types/database';
import {
  getStoredProjects,
  saveStoredProjects,
  getStoredInquiries,
  saveStoredInquiries,
  resetToFactoryDefaults
} from '../../services/adminStorage';
import {
  getCustomers,
  getCustomerQueries,
  getCustomerFeedbacks,
  exportDatabaseToExcel,
  exportDatabaseToJSON,
  resetDatabaseToDefaults,
  updateCustomer,
  deleteCustomer,
  updateQueryStatus,
  toggleFeedbackPublic,
  deleteFeedback
} from '../../services/db';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

type AdminNavSection =
  | 'overview'
  | 'projects'
  | 'inquiries'
  | 'database';

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<AdminNavSection>('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);

  // Unified Database States
  const [dbTab, setDbTab] = useState<'customers' | 'queries' | 'feedback'>('customers');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [dbQueries, setDbQueries] = useState<CustomerQuery[]>([]);
  const [dbFeedbacks, setDbFeedbacks] = useState<CustomerFeedback[]>([]);
  const [customerSearch, setCustomerSearch] = useState('');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProjects(getStoredProjects());
    setInquiries(getStoredInquiries());
    setCustomers(getCustomers());
    setDbQueries(getCustomerQueries());
    setDbFeedbacks(getCustomerFeedbacks());
  };

  // Inquiries status updater
  const handleUpdateInquiryStatus = (id: string, status: CustomerInquiry['status']) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status } : inq
    );
    setInquiries(updated);
    saveStoredInquiries(updated);
    updateQueryStatus(id, status as any);
    setDbQueries(getCustomerQueries());
    showToast(`Status updated to "${status}".`);
  };

  const handleUpdateInquiryNotes = (id: string, notes: string) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, adminNotes: notes } : inq
    );
    setInquiries(updated);
    saveStoredInquiries(updated);
    updateQueryStatus(id, (updated.find(q => q.id === id)?.status as any) || 'New', notes);
    setDbQueries(getCustomerQueries());
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('Delete this inquiry record?')) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      saveStoredInquiries(updated);
      showToast('Record deleted.');
    }
  };

  // Database Handlers
  const handleUpdateCustomerTier = (id: string, tier: CustomerTier) => {
    updateCustomer(id, { tier });
    setCustomers(getCustomers());
    showToast(`Customer tier updated to ${tier}.`);
  };

  const handleDeleteCustomerRecord = (id: string) => {
    if (confirm('Delete this customer from database?')) {
      deleteCustomer(id);
      setCustomers(getCustomers());
      showToast('Customer deleted.');
    }
  };

  const handleToggleFeedbackVisibility = (id: string) => {
    toggleFeedbackPublic(id);
    setDbFeedbacks(getCustomerFeedbacks());
    showToast('Feedback visibility toggled.');
  };

  const handleDeleteFeedbackRecord = (id: string) => {
    if (confirm('Delete this feedback?')) {
      deleteFeedback(id);
      setDbFeedbacks(getCustomerFeedbacks());
      showToast('Feedback removed.');
    }
  };

  const handleExportDBExcel = () => {
    exportDatabaseToExcel();
    showToast('Database exported to Excel file (.xlsx)!');
  };

  const handleExportDBJSON = () => {
    const json = exportDatabaseToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VeeGo_DB_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('JSON Database backup downloaded!');
  };

  const handleResetDefaults = () => {
    if (confirm('Reset all projects, leads, and database to factory defaults?')) {
      resetToFactoryDefaults();
      resetDatabaseToDefaults();
      loadData();
      showToast('System reset to original factory data.');
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.problemDescription.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesStatus =
      inquiryStatusFilter === 'All' || inq.status === inquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
      (c.organization && c.organization.toLowerCase().includes(customerSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-800">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP BAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  VeeGo Control Center
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 tracking-wider uppercase">
                  ADMINISTRATOR
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                BUSINESS AUTOMATION &amp; SOFTWARE SYSTEMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Reset data to initial state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Factory</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER WITH SIDEBAR & CONTENT */}
      <div className="max-w-7xl mx-auto flex min-h-[calc(100vh-64px)]">
        {/* LEFT ADMIN NAVIGATION SIDEBAR */}
        <aside className="w-64 bg-white border-r border-slate-200 p-4 shrink-0 flex flex-col justify-between hidden md:flex">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveSection('overview')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-3 ${
                activeSection === 'overview'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveSection('projects')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-3 ${
                activeSection === 'projects'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Production Projects</span>
            </button>

            <button
              onClick={() => setActiveSection('inquiries')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-3 ${
                activeSection === 'inquiries'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Client Inquiries ({inquiries.filter(i => i.status === 'New').length})</span>
            </button>

            <button
              onClick={() => setActiveSection('database')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-3 ${
                activeSection === 'database'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customer DB &amp; Feedback</span>
            </button>
          </nav>

          {/* Bottom Live Website Link */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate('/')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>View Main Website</span>
            </button>
          </div>
        </aside>

        {/* MAIN ADMIN WORKSPACE */}
        <main className="flex-1 p-5 sm:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Context Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {activeSection === 'overview' && 'System Overview & Metrics'}
                  {activeSection === 'projects' && 'Production Systems & Case Studies'}
                  {activeSection === 'inquiries' && 'Client Problem Statements & Inquiries'}
                  {activeSection === 'database' && 'Customer Directory & Feedback Logs'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Managing custom software deployments, client problem inquiries, and production architecture.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-blue-600" />
                  <span>{inquiries.filter((i) => i.status === 'New').length} New Inquiries</span>
                </div>
              </div>
            </div>

            {/* SECTION: OVERVIEW */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Total Production Projects
                    </div>
                    <div className="text-3xl font-black text-slate-900">
                      {projects.length}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Live systems &amp; blueprints</div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Total Inquiries Logged
                    </div>
                    <div className="text-3xl font-black text-blue-600">
                      {inquiries.length}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {inquiries.filter(i => i.status === 'New').length} awaiting response
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Registered Customers
                    </div>
                    <div className="text-3xl font-black text-emerald-600">
                      {customers.length}
                    </div>
                    <div className="text-xs text-emerald-600 mt-1">Active client records</div>
                  </div>
                </div>

                {/* Recent Inquiries Preview */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
                  <h3 className="text-base font-bold text-slate-900 mb-4">
                    Recent Client Problem Inquiries
                  </h3>
                  <div className="space-y-3">
                    {inquiries.slice(0, 5).map((inq) => (
                      <div key={inq.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-slate-900">
                            {inq.name} ({inq.organization || 'Individual'})
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                            {inq.problemDescription}
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                          inq.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: PROJECTS */}
            {activeSection === 'projects' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {proj.category}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {proj.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          {proj.name}
                        </h3>
                        <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                          {proj.shortDescription}
                        </p>
                      </div>
                      <button
                        onClick={() => onNavigate(`/projects/${proj.id}`)}
                        className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>View Project Case Study</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION: INQUIRIES */}
            {activeSection === 'inquiries' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search name, email, or problem..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-semibold">Status:</span>
                    {['All', 'New', 'In Review', 'Contacted', 'Closed'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setInquiryStatusFilter(st)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          inquiryStatusFilter === st
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredInquiries.map((inq) => (
                    <div key={inq.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <div className="font-bold text-base text-slate-900">
                            {inq.name}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {inq.email}</span>
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {inq.phone}</span>
                            {inq.organization && <span>· {inq.organization}</span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                          >
                            <option value="New">New</option>
                            <option value="In Review">In Review</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                            title="Delete inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 leading-relaxed">
                        <strong className="text-slate-900 font-semibold block mb-1">Problem Statement:</strong>
                        {inq.problemDescription}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Admin Notes:</label>
                        <input
                          type="text"
                          defaultValue={inq.adminNotes || ''}
                          onBlur={(e) => handleUpdateInquiryNotes(inq.id, e.target.value)}
                          placeholder="Add engineering notes, call status, or next steps..."
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:border-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION: DATABASE & TOOLS */}
            {activeSection === 'database' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDbTab('customers')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold ${
                        dbTab === 'customers' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Customers ({customers.length})
                    </button>
                    <button
                      onClick={() => setDbTab('feedback')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold ${
                        dbTab === 'feedback' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Feedback ({dbFeedbacks.length})
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportDBExcel}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-700 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Excel</span>
                    </button>
                    <button
                      onClick={handleExportDBJSON}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>Export JSON</span>
                    </button>
                  </div>
                </div>

                {dbTab === 'customers' && (
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                        <tr>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Contact</th>
                          <th className="p-4">Organization</th>
                          <th className="p-4">Tier</th>
                          <th className="p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredCustomers.map((cust) => (
                          <tr key={cust.id} className="hover:bg-slate-50/50">
                            <td className="p-4 font-bold text-slate-900">{cust.name}</td>
                            <td className="p-4 text-slate-600">{cust.email}<br />{cust.phone}</td>
                            <td className="p-4 text-slate-600">{cust.organization || '—'}</td>
                            <td className="p-4 font-semibold text-blue-700">{cust.tier}</td>
                            <td className="p-4">
                              <button
                                onClick={() => handleDeleteCustomerRecord(cust.id)}
                                className="text-slate-400 hover:text-red-600 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {dbTab === 'feedback' && (
                  <div className="space-y-4">
                    {dbFeedbacks.map((fb) => (
                      <div key={fb.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start justify-between gap-4">
                        <div>
                          <div className="font-bold text-sm text-slate-900">{fb.name} ({fb.email})</div>
                          <div className="text-xs text-amber-500 font-bold my-1">{"★".repeat(fb.rating)}</div>
                          <p className="text-xs text-slate-600 leading-relaxed">&ldquo;{fb.comment}&rdquo;</p>
                        </div>
                        <button
                          onClick={() => handleDeleteFeedbackRecord(fb.id)}
                          className="text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
