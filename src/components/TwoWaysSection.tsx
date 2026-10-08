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
  Sparkles,
  Code2,
  MessageSquare,
  ShieldCheck,
  Zap,
  Globe,
  Database
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
    'Staff operations, attendance & shift tracking',
    'Automated billing, GST invoicing & ledger management',
    'Customer lead follow-up pipelines & WhatsApp updates',
    'Live executive dashboards & automated report generation',
    'Excel & Google Sheets automated sync engines',
    'Bespoke enterprise software tailored to your workflow'
  ];

  const projectFeaturesList = [
    'Complete clean source code with zero hidden dependencies',
    'Live cloud URL hosted on Vercel / Render / Supabase',
    'Detailed architecture diagrams & SRS document package',
    'Full database DDL schemas & REST API documentation',
    'Direct 1-on-1 engineer code walkthrough & viva coaching',
    'Turnkey delivery ready for immediate evaluation'
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100/70 via-slate-50 to-white border-b border-slate-200/80 text-slate-900 overflow-hidden">
      {/* Ambient background parallax orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-dot-pattern opacity-30">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-indigo-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-tr from-emerald-400/15 to-teal-400/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-12 right-12 text-slate-300/50 hidden lg:block"
        >
          <Globe className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-16 left-12 text-slate-300/50 hidden lg:block"
        >
          <Database className="w-16 h-16" />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs text-blue-700 font-bold mb-4 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="tracking-wider uppercase">THE TWO PILLARS OF VEEGO</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Built for Businesses. <span className="text-gradient-blue">Engineered for Developers.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
          >
            Whether you need custom technology to streamline daily business operations or complete production-ready software systems built to exact technical specifications.
          </motion.p>
        </div>

        {/* The Two Main Sides (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto mb-14">
          {/* SIDE 1: BUSINESS SOLUTIONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl p-7 sm:p-9 glass-card border-2 border-blue-200/90 hover:border-blue-500/60 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-blue-100/70 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0 group-hover:rotate-3 transition-transform">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-blue-700 font-bold block">
                        FOR ORGANIZATIONS &amp; BUSINESSES
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                        Business Automation
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <Zap className="w-3 h-3 text-emerald-600" /> ROI Focused
                  </span>
                </div>

                {/* Human Quote */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-slate-800 text-xs sm:text-sm font-medium mb-6 leading-relaxed min-h-[84px] flex items-center shadow-2xs">
                  <span>
                    &ldquo;<strong>Tell us what is slowing your business down.</strong> Our engineers audit your manual daily routine, identify friction points, and deliver software that runs your business automatically.&rdquo;
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
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer text-center ${
                          activeBusinessStep === idx
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-slate-50 border-slate-200/80 text-slate-800 hover:border-blue-300'
                        }`}
                      >
                        <span className="text-[11px] font-bold block truncate">{step.label}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-2 text-[11px] p-2.5 bg-slate-100/80 rounded-lg text-slate-600 border border-slate-200/60 font-medium flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{businessSteps[activeBusinessStep].desc}</span>
                  </div>
                </div>

                {/* Solutions List */}
                <div className="pt-4 border-t border-slate-100 mb-8">
                  <div className="text-xs uppercase tracking-wider text-slate-700 font-bold mb-3">
                    Solutions We Build &amp; Deploy:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
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
                  className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/20 flex items-center justify-between group/btn"
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
                    className="py-2.5 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Search className="w-3.5 h-3.5 text-blue-600" />
                    <span>Explore Solutions</span>
                  </button>
                  <button
                    onClick={onRequestCustomSoftware}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Wrench className="w-3.5 h-3.5 text-blue-600" />
                    <span>Request Custom Tech</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SIDE 2: PRODUCTION & COLLEGE SOFTWARE PROJECTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl p-7 sm:p-9 bg-white border-2 border-emerald-200/90 shadow-md hover:shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-emerald-100/70 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0 group-hover:-rotate-3 transition-transform">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-bold block">
                        FOR ENGINEERS &amp; STUDENTS
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                        Software &amp; College Projects
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    <Code2 className="w-3 h-3 text-blue-600" /> Turnkey Ready
                  </span>
                </div>

                {/* Human Quote */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-slate-800 text-xs sm:text-sm font-medium mb-6 leading-relaxed min-h-[84px] flex items-center shadow-2xs">
                  <span>
                    &ldquo;<strong>Get production-ready software architecture.</strong> Full modular source code, live cloud links, detailed architecture docs, and 1-on-1 code walkthroughs with senior engineers.&rdquo;
                  </span>
                </div>

                {/* Interactive LifeCycle Pipeline */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-500 font-bold mb-2.5">
                    <span>The Engineering Delivery Loop:</span>
                    <span className="text-[11px] text-emerald-600 font-semibold">Hover steps to inspect</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {projectSteps.map((step, idx) => (
                      <motion.div
                        key={step.label}
                        onHoverStart={() => setActiveProjectStep(idx)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer text-center ${
                          activeProjectStep === idx
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-slate-50 border-slate-200/80 text-slate-800 hover:border-emerald-300'
                        }`}
                      >
                        <span className="text-[11px] font-bold block truncate">{step.label}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-2 text-[11px] p-2.5 bg-slate-100/80 rounded-lg text-slate-600 border border-slate-200/60 font-medium flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{projectSteps[activeProjectStep].desc}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="pt-4 border-t border-slate-100 mb-8">
                  <div className="text-xs uppercase tracking-wider text-slate-700 font-bold mb-3">
                    What Every Project Package Includes:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    {projectFeaturesList.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 group/item">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
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
                  className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-between group/btn"
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
                    className="py-2.5 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>View Architectures</span>
                  </button>
                  <button
                    onClick={onRequestCustomSoftware}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
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

