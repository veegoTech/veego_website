import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Sparkles, Terminal, CheckCircle2, Layers, Cpu } from 'lucide-react';

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
    solutionTitle: 'StaffTrack: Automated Mobile & Web Operations System',
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
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
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
    <section className="relative py-20 sm:py-28 bg-slate-50 border-b border-slate-200 overflow-hidden text-slate-900">
      {/* Background Parallax Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 mb-3 shadow-xs"
          >
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>INTERACTIVE ENGINE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900"
            style={{ textWrap: 'balance' }}
          >
            Problems In → Solutions Out
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Test how VeeGo engineers analyze real operational friction points and design custom production software systems.
          </motion.p>
        </div>

        {/* INTERACTIVE WORKBENCH CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white border-2 border-slate-200 shadow-xl overflow-hidden"
        >
          {/* Workbench Header Bar */}
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                VeeGo Interactive Architecture Workbench
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Select a bottleneck or type your custom requirement below
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left Column: Problem Input */}
            <div className="lg:col-span-5 p-6 bg-slate-50/70 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold">
                      01
                    </span>
                    <span>Select Real Business Bottlenecks:</span>
                  </span>
                </div>

                <div className="space-y-2.5 mb-5">
                  {PRESET_PROBLEMS.map((item, idx) => {
                    const isSelected = selectedProblemIndex === idx && !customProblem;
                    return (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          setSelectedProblemIndex(idx);
                          setCustomProblem('');
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all relative overflow-hidden ${
                          isSelected
                            ? 'bg-white border-blue-600 shadow-md text-slate-900 font-semibold ring-2 ring-blue-500/20'
                            : 'bg-white/90 border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-600" />
                        )}
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className={`font-bold ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                            {item.tag}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                            </span>
                          )}
                        </div>
                        <p className="line-clamp-2 leading-relaxed text-slate-600 font-normal">
                          {item.problem}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Custom Problem Input */}
                <div className="pt-4 border-t border-slate-200">
                  <label htmlFor="workbench-custom-problem" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Or Describe Your Operational Bottleneck:
                  </label>
                  <input
                    id="workbench-custom-problem"
                    type="text"
                    value={customProblem}
                    onChange={(e) => setCustomProblem(e.target.value)}
                    placeholder="e.g. Our sales team loses track of whatsapp leads..."
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs"
                  />
                </div>
              </div>

              <div className="pt-4 mt-4 text-[11px] text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Engineered by real humans, not automated template generators.</span>
              </div>
            </div>

            {/* Right Column: VeeGo Solution Output */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-white flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={customProblem ? 'custom' : selectedProblemIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                        02
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        VeeGo System Architecture:
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                      {currentPair.timeframe}
                    </span>
                  </div>

                  {/* Solution Title */}
                  <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                    {customProblem.trim() ? 'Tailored Custom Web System' : currentPair.solutionTitle}
                  </h3>

                  {/* Operational Friction */}
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 mb-4 text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-amber-800 font-bold block mb-1">
                      Target Friction Point:
                    </span>
                    <p className="text-amber-950 leading-relaxed font-medium">
                      {customProblem.trim() ? customProblem : currentPair.symptom}
                    </p>
                  </div>

                  {/* System Deliverable */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 mb-5 text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-blue-800 font-bold block mb-1">
                      What VeeGo Engineers &amp; Deploys:
                    </span>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {customProblem.trim()
                        ? 'VeeGo will map out your exact data flow, eliminate redundant manual handoffs, and engineer a custom full-stack web system with real-time updates and notifications tailored specifically for your daily team operations.'
                        : currentPair.systemDeliverable}
                    </p>
                  </div>

                  {/* Tech & Impact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1 font-bold">
                        Measured Business Impact
                      </span>
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                        <span>{currentPair.impactMetric}</span>
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1 font-bold">
                        Architecture Stack
                      </span>
                      <span className="text-[11px] text-slate-800 font-bold block truncate">
                        {currentPair.techStack}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Button */}
              <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-600 text-center sm:text-left font-medium">
                  Have a similar challenge in your organization?
                </span>
                <button
                  onClick={handleConsultThisProblem}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-600/20 hover:scale-[1.02] flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Build This System for Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

