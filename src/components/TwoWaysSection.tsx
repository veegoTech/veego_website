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
    <section className="relative py-12 sm:py-16 bg-white text-slate-900 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700 font-bold mb-4 shadow-xs"
          >

            <span className="tracking-wider uppercase">THE TWO PILLARS OF VEEGO</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-Space Grotesk text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Built for Businesses. <span className="text-blue-600 font-extrabold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Engineered for Students.</span>
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
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl p-7 sm:p-9 bg-white border border-slate-200/90 hover:border-blue-400 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/15 transition-all flex flex-col justify-between relative overflow-hidden group text-slate-900"
          >
            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0 group-hover:rotate-3 transition-transform">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-blue-700 font-bold block">
                        FOR ORGANIZATIONS &amp; BUSINESSES
                      </span>
                      <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight font-Space Grotesk" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Business Automation &amp; Applications
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    <Zap className="w-3 h-3 text-blue-600" /> ROI Focused
                  </span>
                </div>

                {/* Human Quote */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs sm:text-sm font-medium mb-6 leading-relaxed min-h-[84px] flex items-center shadow-2xs">
                  <span>
                    &ldquo;<strong>Tell us what is slowing your business down.</strong> Our engineers audit your manual daily routine, identify friction points, and deliver custom applications &amp; automated systems that run your business seamlessly.&rdquo;
                  </span>
                </div>

                {/* Interactive LifeCycle Pipeline */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-500 font-bold mb-2.5">
                    <span>The Business Delivery Loop:</span>
                    <span className="text-[11px] text-blue-600 font-semibold">Hover steps to inspect</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {businessSteps.map((step, idx) => (
                      <motion.div
                        key={step.label}
                        onHoverStart={() => setActiveBusinessStep(idx)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer text-center ${activeBusinessStep === idx
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300'
                          }`}
                      >
                        <span className="text-[11px] font-bold block truncate">{step.label}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-2 text-[11px] p-2.5 bg-blue-50/60 rounded-lg text-slate-700 border border-blue-100 font-medium flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{businessSteps[activeBusinessStep].desc}</span>
                  </div>
                </div>

                {/* Solutions List */}
                <div className="pt-4 border-t border-slate-100 mb-8">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                    Applications &amp; Automation We Build:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {businessSolutionsList.map((sol) => (
                      <li key={sol} className="flex items-start gap-2.5 group/item">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Action Pathways */}
              <div className="pt-5 border-t border-slate-100 space-y-2.5 mt-auto">
                <button
                  onClick={onSubmitProblem}
                  className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-between group/btn cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Submit Your Operational Bottleneck</span>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={onExploreSolutions}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Search className="w-3.5 h-3.5 text-blue-600" />
                    <span>Explore Solutions</span>
                  </button>
                  <button
                    onClick={onRequestCustomSoftware}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
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
            transition={{ delay: 0.1, duration: 0.3 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl p-7 sm:p-9 bg-white border border-slate-200/90 hover:border-indigo-400 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-indigo-500/15 transition-all flex flex-col justify-between relative overflow-hidden group text-slate-900"
          >
            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shrink-0 group-hover:-rotate-3 transition-transform">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-indigo-700 font-bold block">
                        FOR ENGINEERS &amp; STUDENTS
                      </span>
                      <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight font-Space Grotesk" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Projects &amp; Technical Training
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                    <Code2 className="w-3 h-3 text-indigo-600" /> Hands-on Learning
                  </span>
                </div>

                {/* Human Quote */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs sm:text-sm font-medium mb-6 leading-relaxed min-h-[84px] flex items-center shadow-2xs">
                  <span>
                    &ldquo;<strong>Get production-ready software projects accompanied by 1-on-1 technical training.</strong> Full modular source code, live cloud links, detailed architecture docs, and hands-on viva &amp; code walkthroughs with senior engineers.&rdquo;
                  </span>
                </div>

                {/* Interactive LifeCycle Pipeline */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-500 font-bold mb-2.5">
                    <span>The Engineering &amp; Training Loop:</span>
                    <span className="text-[11px] text-indigo-600 font-semibold">Hover steps to inspect</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {projectSteps.map((step, idx) => (
                      <motion.div
                        key={step.label}
                        onHoverStart={() => setActiveProjectStep(idx)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer text-center ${activeProjectStep === idx
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300'
                          }`}
                      >
                        <span className="text-[11px] font-bold block truncate">{step.label}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-2 text-[11px] p-2.5 bg-indigo-50/60 rounded-lg text-slate-700 border border-indigo-100 font-medium flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{projectSteps[activeProjectStep].desc}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="pt-4 border-t border-slate-100 mb-8">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                    What Every Project &amp; Training Package Includes:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {projectFeaturesList.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 group/item">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Action Pathways */}
              <div className="pt-5 border-t border-slate-100 space-y-2.5 mt-auto">
                <button
                  onClick={onViewProjects}
                  className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-between group/btn cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4" />
                    <span>Browse Built Systems &amp; Live Demos</span>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={onViewProjects}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>View Architectures</span>
                  </button>
                  <button
                    onClick={onRequestCustomSoftware}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
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
