import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface InteractiveProblemWorkbenchProps {
  onSolveProblem?: (problemText: string, category: string) => void;
  onExploreSolutions?: () => void;
}

const PRESET_PROBLEMS = [
  {
    id: 'staff',
    tag: 'Staff & Field Operations',
    problem: 'Staff daily tasks, attendance, and field visits are scattered across WhatsApp chats and paper sheets.',
    symptom: 'Management lacks visibility on daily team progress, check-in timestamps, and operational accountability.',
    solutionTitle: 'StaffTrack: Automated Mobile/Web Operations System',
    systemDeliverable: 'Custom lightweight portal with GPS check-ins, automated daily task pipelines, instant manager dashboard, and zero WhatsApp confusion.',
    techStack: 'React + Node.js/Python + PostgreSQL + Real-Time Webhooks',
    impactMetric: 'Eliminates 3+ hours daily manual follow-ups',
    timeframe: 'Deployed in 14 days'
  },
  {
    id: 'billing',
    tag: 'Billing & Cash Flow',
    problem: 'Manual invoice generation in Excel causes delayed billing, missing tax calculations, and forgotten payment follow-ups.',
    symptom: 'Cash flow bottlenecks, client dispute rates, and hours spent recalculating invoices every month-end.',
    solutionTitle: 'Billing Software: Automated Invoicing & Ledger Engine',
    systemDeliverable: 'Dedicated one-click invoicing web app with automated PDF generation, automatic GST computation, and scheduled WhatsApp payment alerts.',
    techStack: 'Full-Stack React + Python Backend + Fast Ledger Engine',
    impactMetric: 'Accelerates payment collection speed by 40%',
    timeframe: 'Deployed in 10 days'
  },
  {
    id: 'crm',
    tag: 'Inbound Inquiries & CRM',
    problem: 'Inbound sales inquiries from website, calls, and referrals get stored in individual notebooks and spreadsheets.',
    symptom: 'Hot leads go cold due to zero automated follow-up scheduling and forgotten prospect histories.',
    solutionTitle: 'PipelineFlow: Instant Lead Routing & Follow-up CRM',
    systemDeliverable: 'Automated inquiry capture engine that routes leads to available team members, sends instant WhatsApp acknowledgments, and schedules auto-reminders.',
    techStack: 'Next.js / Vite + Automated API Integrations + Database Model',
    impactMetric: 'Increases inquiry conversion rate by 2.4x',
    timeframe: 'Deployed in 12 days'
  },
  {
    id: 'inventory',
    tag: 'Spreadsheet Bottlenecks',
    problem: 'Staff manually copy-pastes data between vendor invoices, inventory spreadsheets, and client orders every morning.',
    symptom: 'High human error rate, stock count mismatches, and staff spending half their workday on robotic data entry.',
    solutionTitle: 'End-to-End Workflow Sync Automation',
    systemDeliverable: 'Lightweight background sync engine that ingests spreadsheets, validates formats, updates the central database, and flags anomalies.',
    techStack: 'Python Data Engine + Webhooks + Automated Error Audits',
    impactMetric: 'Cuts manual entry time from 4 hours daily to 60 seconds',
    timeframe: 'Deployed in 10 days'
  }
];

export const InteractiveProblemWorkbench: React.FC<InteractiveProblemWorkbenchProps> = ({
  onSolveProblem,
  onExploreSolutions
}) => {
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(3);
  const [customProblem, setCustomProblem] = useState('');

  const currentPair = PRESET_PROBLEMS[selectedProblemIndex];

  const handleConsultThisProblem = () => {
    const textToSend = customProblem.trim() ? customProblem.trim() : currentPair.problem;
    const cat = customProblem.trim() ? 'Custom Operational Problem' : currentPair.tag;
    if (onSolveProblem) {
      onSolveProblem(textToSend, cat);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs uppercase tracking-widest text-blue-700 font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Core Engine</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900"
            style={{ textWrap: 'balance' }}
          >
            Problems In → Solutions Out
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Test how VeeGo analyzes real operational bottlenecks and architects dedicated production systems.
          </p>
        </div>

        {/* INTERACTIVE WORKBENCH */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-lg overflow-hidden">
          {/* Workbench Header */}
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Interactive Core Engine: Problems In → Solutions Out
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Click a business friction or type your own to inspect the technical solution
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left Column: Problem Input (Select or Type) */}
            <div className="lg:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold">
                    01
                  </span>
                  <span>Problems We Regularly Solve:</span>
                </div>

                <div className="space-y-2 mb-4">
                  {PRESET_PROBLEMS.map((item, idx) => {
                    const isSelected = selectedProblemIndex === idx && !customProblem;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedProblemIndex(idx);
                          setCustomProblem('');
                        }}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${isSelected
                            ? 'bg-white border-blue-600 shadow-sm text-slate-900 font-semibold ring-1 ring-blue-600'
                            : 'bg-white/80 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                          }`}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-slate-600'}`}>
                            {item.tag}
                          </span>
                          {isSelected && <span className="text-[10px] text-blue-600 font-bold">Selected</span>}
                        </div>
                        <p className="line-clamp-2 leading-relaxed text-slate-700">
                          {item.problem}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Problem Input Box */}
                <div className="pt-3 border-t border-slate-200">
                  <label htmlFor="workbench-custom-problem" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Or Type Your Business Friction:
                  </label>
                  <div className="relative">
                    <input
                      id="workbench-custom-problem"
                      type="text"
                      value={customProblem}
                      onChange={(e) => setCustomProblem(e.target.value)}
                      placeholder="e.g. My staff work is difficult to track across WhatsApp..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>We engineer systems for actual human workflows, not theoretical models.</span>
              </div>
            </div>

            {/* Right Column: VeeGo Solution Architecture Output */}
            <div className="lg:col-span-7 p-6 sm:p-7 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold">
                      02
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      How VeeGo Solves This:
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full font-semibold">
                    {currentPair.timeframe}
                  </span>
                </div>

                {/* Solution Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  {customProblem.trim() ? 'Tailored Architecture Blueprint' : currentPair.solutionTitle}
                </h3>

                {/* The Real Operational Friction Being Fixed */}
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 mb-4 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-amber-800 font-bold block mb-1">
                    The Daily Friction:
                  </span>
                  <p className="text-amber-900 leading-relaxed font-medium">
                    {customProblem.trim() ? customProblem : currentPair.symptom}
                  </p>
                </div>

                {/* The VeeGo System Deliverable */}
                <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 mb-4 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-blue-800 font-bold block mb-1">
                    What VeeGo Builds &amp; Deploys:
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {customProblem.trim()
                      ? 'VeeGo will map out your exact data flow, eliminate redundant handoffs, and engineer a custom web system with real-time updates and notifications tailored specifically for your staff.'
                      : currentPair.systemDeliverable}
                  </p>
                </div>

                {/* Technology & Measured Impact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-0.5 font-semibold">
                      Expected Business Impact
                    </span>
                    <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                      <Zap className="w-3.5 h-3.5 text-blue-600" />
                      <span>{currentPair.impactMetric}</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-0.5 font-semibold">
                      Clean Stack Architecture
                    </span>
                    <span className="text-[11px] text-slate-700 font-semibold block truncate">
                      {currentPair.techStack}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action for This Problem */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500 text-center sm:text-left">
                  Discuss this exact architecture with our lead engineer:
                </span>
                <button
                  onClick={handleConsultThisProblem}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <span>Build This Solution for Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
