import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Search,
  Send,
  Wrench,
  FolderGit2,
  Code2,
  MessageSquare,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface TwoWaysSectionProps {
  onExploreSolutions: () => void;
  onSubmitProblem: () => void;
  onRequestCustomSoftware: () => void;
  onViewProjects: () => void;
}

export const TwoWaysSection: React.FC<TwoWaysSectionProps> = ({
  onExploreSolutions,
  onSubmitProblem,
  onRequestCustomSoftware,
  onViewProjects
}) => {
  const [activeBusinessStep, setActiveBusinessStep] = useState<number>(0);
  const [activeProjectStep, setActiveProjectStep] = useState<number>(0);

  const businessSteps = [
    { label: '1. Problem', desc: 'Identify daily bottlenecks & cost friction' },
    { label: '2. Audit', desc: 'Map out manual human workflows' },
    { label: '3. Build', desc: 'Custom tech stack & API integration' },
    { label: '4. Deploy', desc: 'Zero-downtime staff onboarding' }
  ];

  const projectSteps = [
    { label: '1. Scope', desc: 'Gather precise project deliverables' },
    { label: '2. Architecture', desc: 'Clean database schema & UI layout' },
    { label: '3. Codebase', desc: 'Modular source with detailed inline notes' },
    { label: '4. Cloud Live', desc: 'Live hosting link + 1-on-1 walkthrough' }
  ];

  const businessSolutionsList = [
    'Custom business web applications & enterprise portals',
    'Staff operations, attendance & shift tracking apps',
    'Automated billing, GST invoicing & ledger management',
    'Customer lead follow-up CRM & WhatsApp automation',
    'Live executive dashboards & automated report generation',
    'Excel & Google Sheets automated sync engines'
  ];

  const projectFeaturesList = [
    'Production-ready software & college final year projects',
    '1-on-1 live code walkthroughs & technical training',
    'Complete clean source code with zero hidden dependencies',
    'Live cloud URL hosted on Vercel / Render / Supabase',
    'Detailed architecture diagrams, DDL schemas & SRS documentation',
    'Turnkey project delivery with full concept & code coaching'
  ];

  return (
    <section className="relative py-16 sm:py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-slate-900 mb-4"
          >
            <span className="tracking-wider uppercase">THE TWO PILLARS OF VEEGO</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-tight"
          >
            Built for Businesses. <span className="text-blue-600">Engineered for Students.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
          >
            Whether you need business automation &amp; custom applications for your company, or projects &amp; technical training for engineering success.
          </motion.p>
        </div>

        {/* The Two Main Sides (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto mb-14">
          {/* SIDE 1: BUSINESS AUTOMATION & APPLICATIONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="rounded-[4px] p-7 sm:p-9 bg-white border border-slate-300 hover:border-slate-900 transition-colors flex flex-col justify-between text-slate-900"
          >
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[4px] bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-bold block">
                        FOR ORGANIZATIONS &amp; BUSINESSES
                      </span>
                      <h3 className="text-2xl font-black text-slate-950 tracking-tight">
                        Business Automation &amp; Applications
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-[4px] border border-slate-300">
                    <Zap className="w-3 h-3 text-blue-600" /> ROI Focused
                  </span>
                </div>

                {/* Human Quote */}
                <div className="p-4 rounded-[4px] bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium mb-6 leading-relaxed min-h-[84px] flex items-center">
                  <span>
                    &ldquo;<strong>Tell us what is slowing your business down.</strong> Our engineers audit your manual daily routine, identify friction points, and deliver custom applications &amp; automated systems that run your business seamlessly.&rdquo;
                  </span>
                </div>

                {/* Interactive LifeCycle Pipeline */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2.5">
                    <span>The Business Delivery Loop:</span>
                    <span className="text-[10px] text-blue-600 font-bold">Hover to inspect</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {businessSteps.map((step, idx) => (
                      <div
                        key={step.label}
                        onMouseEnter={() => setActiveBusinessStep(idx)}
                        className={`p-2.5 rounded-[4px] border transition-colors cursor-pointer text-center ${activeBusinessStep === idx
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        <span className="text-[11px] font-bold block truncate">{step.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs p-2.5 bg-slate-50 rounded-[4px] text-slate-700 border border-slate-200 font-medium flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{businessSteps[activeBusinessStep].desc}</span>
                  </div>
                </div>

                {/* Solutions List */}
                <div className="pt-4 border-t border-slate-200 mb-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                    Applications &amp; Automation We Build:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {businessSolutionsList.map((sol) => (
                      <li key={sol} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Action Pathways */}
              <div className="pt-5 border-t border-slate-200 space-y-2.5 mt-auto">
                <button
                  onClick={onSubmitProblem}
                  className="w-full py-3 px-5 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer border border-blue-600 group"
                >
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Submit Your Operational Bottleneck</span>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={onExploreSolutions}
                    className="py-2.5 px-3 rounded-[4px] border border-slate-300 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-blue-600" />
                    <span>Explore Solutions</span>
                  </button>
                  <button
                    onClick={onRequestCustomSoftware}
                    className="py-2.5 px-3 rounded-[4px] border border-slate-300 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Wrench className="w-3.5 h-3.5 text-blue-600" />
                    <span>Request Custom App</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SIDE 2: PROJECTS & TECHNICAL TRAINING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.2 }}
            whileHover={{ y: -3 }}
            className="rounded-[4px] p-7 sm:p-9 bg-white border border-slate-300 hover:border-slate-900 transition-colors flex flex-col justify-between text-slate-900"
          >
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[4px] bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-700 font-bold block">
                        FOR ENGINEERS &amp; STUDENTS
                      </span>
                      <h3 className="text-2xl font-black text-slate-950 tracking-tight">
                        Projects &amp; Technical Training
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-[4px] border border-slate-300">
                    <Code2 className="w-3 h-3 text-indigo-600" /> Hands-on Learning
                  </span>
                </div>

                {/* Human Quote */}
                <div className="p-4 rounded-[4px] bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium mb-6 leading-relaxed min-h-[84px] flex items-center">
                  <span>
                    &ldquo;<strong>Get production-ready software projects accompanied by 1-on-1 technical training.</strong> Full modular source code, live cloud links, detailed architecture docs, and hands-on viva &amp; code walkthroughs with senior engineers.&rdquo;
                  </span>
                </div>

                {/* Interactive LifeCycle Pipeline */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2.5">
                    <span>The Engineering &amp; Training Loop:</span>
                    <span className="text-[10px] text-indigo-600 font-bold">Hover to inspect</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {projectSteps.map((step, idx) => (
                      <div
                        key={step.label}
                        onMouseEnter={() => setActiveProjectStep(idx)}
                        className={`p-2.5 rounded-[4px] border transition-colors cursor-pointer text-center ${activeProjectStep === idx
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        <span className="text-[11px] font-bold block truncate">{step.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs p-2.5 bg-slate-50 rounded-[4px] text-slate-700 border border-slate-200 font-medium flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{projectSteps[activeProjectStep].desc}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="pt-4 border-t border-slate-200 mb-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                    What Every Project &amp; Training Package Includes:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {projectFeaturesList.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Action Pathways */}
              <div className="pt-5 border-t border-slate-200 space-y-2.5 mt-auto">
                <button
                  onClick={onViewProjects}
                  className="w-full py-3 px-5 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer border border-blue-600 group"
                >
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4" />
                    <span>Browse Built Systems &amp; Live Demos</span>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={onViewProjects}
                    className="py-2.5 px-3 rounded-[4px] border border-slate-300 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>View Architectures</span>
                  </button>
                  <button
                    onClick={onRequestCustomSoftware}
                    className="py-2.5 px-3 rounded-[4px] border border-slate-300 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Request Custom Project</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
