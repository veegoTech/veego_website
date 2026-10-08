import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Calendar, Plus, RefreshCw, Award, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface LiveDemoModalProps {
  project: Project | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({ project, onClose, onContactClick }) => {
  if (!project) return null;

  // StaffTrack interactive demo state
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Arun Kumar', role: 'Operations Lead', status: 'Present', time: '09:02 AM', task: 'Inventory audit verification', completed: true },
    { id: 2, name: 'Priya Sharma', role: 'Billing Specialist', status: 'Present', time: '09:14 AM', task: 'Tax invoice reconciliation', completed: false },
    { id: 3, name: 'Vikram Singh', role: 'Field Executive', status: 'On Field', time: '09:30 AM', task: 'Client site dispatch visit', completed: false },
    { id: 4, name: 'Ananya Roy', role: 'Support Analyst', status: 'Present', time: '08:55 AM', task: 'Client onboarding tickets', completed: true },
  ]);
  const [newStaffTask, setNewStaffTask] = useState('');

  // Billing Software interactive demo state
  const [billingItems, setBillingItems] = useState([
    { id: 1, desc: 'Enterprise Workflow Automation Module', qty: 1, rate: 12000 },
    { id: 2, desc: 'Staff Database Setup & Indexing', qty: 1, rate: 8500 },
  ]);
  const [taxRate, setTaxRate] = useState(18); // 18% GST/Tax
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  // Alpha Fly LMS interactive demo state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);

  const subtotal = billingItems.reduce((acc, curr) => acc + curr.qty * curr.rate, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                Interactive Preview — {project.name}
              </h3>
              <p className="text-xs text-slate-500">
                Functional prototype sandbox · Real logic simulation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
            aria-label="Close interactive preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {project.demoType === 'stafftrack' && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 text-xs sm:text-sm text-slate-700">
                <span className="font-semibold text-blue-700">StaffTrack Operations Sandbox:</span> Test how managers assign tasks, verify check-in logs, and capture real-time team deliverables without phone calls or paper sheets.
              </div>

              {/* Staff Tracker Top Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Active Staff</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">4 / 4</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Tasks Completed</div>
                  <div className="text-xl font-bold text-emerald-600 mt-1">
                    {staffList.filter((s) => s.completed).length} / {staffList.length}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">On-Time Rate</div>
                  <div className="text-xl font-bold text-blue-600 mt-1">98.5%</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Reporting Status</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 text-sm">Automated</div>
                </div>
              </div>

              {/* Staff Task Board */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">
                  Live Team Tasks &amp; Attendance Check-ins
                </h4>
                <div className="space-y-2">
                  {staffList.map((staff) => (
                    <div
                      key={staff.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 transition-colors gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setStaffList((prev) =>
                              prev.map((s) => (s.id === staff.id ? { ...s, completed: !s.completed } : s))
                            );
                          }}
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${staff.completed
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-slate-300 text-transparent hover:border-blue-500'
                            }`}
                          title="Toggle completion"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-slate-900">{staff.name}</span>
                            <span className="text-xs text-slate-500">· {staff.role}</span>
                          </div>
                          <p className={`text-xs mt-0.5 ${staff.completed ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                            {staff.task}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center text-xs">
                        <span className="text-slate-500 flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5" /> {staff.time}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${staff.status === 'Present' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                          {staff.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Quick Task Form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Assign new operational priority..."
                  value={newStaffTask}
                  onChange={(e) => setNewStaffTask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newStaffTask.trim()) {
                      setStaffList((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          name: 'Rajesh Nair',
                          role: 'Field Associate',
                          status: 'Present',
                          time: 'Just now',
                          task: newStaffTask.trim(),
                          completed: false
                        }
                      ]);
                      setNewStaffTask('');
                    }
                  }}
                  className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                />
                <button
                  onClick={() => {
                    if (newStaffTask.trim()) {
                      setStaffList((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          name: 'Rajesh Nair',
                          role: 'Field Associate',
                          status: 'Present',
                          time: 'Just now',
                          task: newStaffTask.trim(),
                          completed: false
                        }
                      ]);
                      setNewStaffTask('');
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                  Add Task
                </button>
              </div>
            </div>
          )}

          {project.demoType === 'billing' && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 text-xs sm:text-sm text-slate-700">
                <span className="font-semibold text-blue-700">Billing &amp; Operations Sandbox:</span> Test fast line-item invoice calculations, automatic tax computation, and instant receipt generation.
              </div>

              {/* Items Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-600 grid grid-cols-12 gap-2">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2 text-right">Qty</div>
                  <div className="col-span-2 text-right">Rate (₹)</div>
                  <div className="col-span-2 text-right">Total (₹)</div>
                </div>

                <div className="divide-y divide-slate-100">
                  {billingItems.map((item) => (
                    <div key={item.id} className="px-4 py-3 text-xs sm:text-sm grid grid-cols-12 gap-2 items-center text-slate-800">
                      <div className="col-span-6 font-medium">{item.desc}</div>
                      <div className="col-span-2 text-right font-medium">{item.qty}</div>
                      <div className="col-span-2 text-right font-medium">{item.rate.toLocaleString()}</div>
                      <div className="col-span-2 text-right font-semibold text-slate-900">
                        {(item.qty * item.rate).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add item button */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setBillingItems((prev) => [
                      ...prev,
                      { id: Date.now(), desc: 'Custom API Webhook Listener Configuration', qty: 1, rate: 4500 }
                    ]);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Standard Service Item
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-medium">Tax Rate:</span>
                  <select
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="px-2 py-1 rounded border border-slate-300 bg-white text-xs text-slate-800"
                  >
                    <option value={0}>0%</option>
                    <option value={5}>5%</option>
                    <option value={12}>12%</option>
                    <option value={18}>18% GST</option>
                  </select>
                </div>
              </div>

              {/* Totals Calculation */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 max-w-sm ml-auto text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax ({taxRate}%)</span>
                  <span className="font-medium">₹{taxAmount.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-base">
                  <span>Grand Total</span>
                  <span className="text-blue-600">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setInvoiceGenerated(true)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-xs"
                >
                  Generate Invoice PDF
                </button>
              </div>

              {invoiceGenerated && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs sm:text-sm text-emerald-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>
                      Invoice <strong>#VG-2026-084</strong> generated successfully. Print layout ready.
                    </span>
                  </div>
                  <button
                    onClick={() => setInvoiceGenerated(false)}
                    className="text-xs text-emerald-700 underline font-semibold"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          )}

          {project.demoType === 'alphafly' && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 text-xs sm:text-sm text-slate-700">
                <span className="font-semibold text-blue-700">Alpha Fly LMS Sandbox:</span> Experience interactive curriculum progression, automated assessment scoring, and instant milestone verification.
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5 text-slate-700">
                  <span>Module 3: Relational Schema Design &amp; Django Models</span>
                  <span className="font-bold text-blue-600">{moduleCompleted ? '100% Completed' : '75% Progress'}</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                    style={{ width: moduleCompleted ? '100%' : '75%' }}
                  />
                </div>
              </div>

              {/* Sample Quiz */}
              <div className="p-5 border border-slate-200 rounded-xl bg-slate-50">
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
                  Practical Checkpoint Assessment
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-4">
                  Which database constraint ensures that an employee's daily attendance entry cannot have duplicate timestamp check-ins on the same calendar date?
                </h4>

                <div className="space-y-2.5">
                  {[
                    'Foreign Key Reference on Company ID',
                    'UniqueConstraint on [employee_id, date]',
                    'Default Indexing on Timestamp Field',
                    'Null=True constraint on status field'
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedQuizAnswer(idx)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-3 rounded-lg text-xs sm:text-sm border transition-all ${selectedQuizAnswer === idx
                          ? quizSubmitted && idx === 1
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium'
                            : quizSubmitted && idx !== 1
                              ? 'border-red-400 bg-red-50 text-red-900'
                              : 'border-blue-600 bg-blue-50 text-blue-900 font-medium'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-white'
                        }`}
                    >
                      <span className="mr-2 text-slate-500 font-bold">{String.fromCharCode(65 + idx)}.</span>
                      {option}
                    </button>
                  ))}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={() => {
                      if (selectedQuizAnswer !== null) {
                        setQuizSubmitted(true);
                        if (selectedQuizAnswer === 1) {
                          setModuleCompleted(true);
                        }
                      }
                    }}
                    disabled={selectedQuizAnswer === null}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-xs"
                  >
                    Submit Assessment
                  </button>
                ) : (
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Correct Answer! Milestone verified.
                    </span>
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setSelectedQuizAnswer(null);
                        setModuleCompleted(false);
                      }}
                      className="text-xs text-slate-600 underline font-medium"
                    >
                      Retry Question
                    </button>
                  </div>
                )}
              </div>

              {moduleCompleted && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
                  <Award className="w-6 h-6 text-blue-600 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      Badge Unlocked: Backend Data Integrity
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Verified completion recorded in Alpha Fly LMS gradebook ledger.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            Need a tailored version of this system for your company?
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              Discuss Implementation <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
