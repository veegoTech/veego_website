import React from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Search,
  Send,
  Wrench,
  FolderGit2,
  Sparkles,
  ChevronRight,
  Code2,
  MessageSquare
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
  const businessSteps = [
    { label: '1. Problem', desc: 'Identify bottlenecks' },
    { label: '2. Understand', desc: 'Audit workflows' },
    { label: '3. Solution', desc: 'Custom tech design' },
    { label: '4. Deploy', desc: 'Zero-friction launch' }
  ];

  const projectSteps = [
    { label: '1. Scope', desc: 'Target requirement' },
    { label: '2. Architecture', desc: 'Full-stack design' },
    { label: '3. Codebase', desc: 'Modular source' },
    { label: '4. Cloud Live', desc: 'Hosting & Viva prep' }
  ];

  const businessSolutionsList = [
    'Staff automation & daily shift reporting',
    'Billing, invoicing & automatic tax calculation',
    'CRM & automated lead follow-up pipelines',
    'Reports, analytics & live KPI dashboards',
    'AI automation & spreadsheet sync engines',
    'Custom bespoke business software'
  ];

  const projectFeaturesList = [
    'Full source code with modular architecture',
    'Live cloud deployment links for viva & testing',
    'Comprehensive technical documentation & diagrams',
    'Database schema, API specs & setup guides',
    '1-on-1 code walkthrough & technical support',
    'Turnkey delivery with report & viva presentation'
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700 font-bold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>HOW WE HELP · THE TWO WINGS OF VEEGO</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900"
            style={{ textWrap: 'balance' }}
          >
            One Platform. Two Clear Services.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether you need custom technology to solve your company&apos;s operational friction, or complete production-ready software systems for your project requirements.
          </p>
        </div>

        {/* The Two Main Sides (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto mb-14">
          {/* SIDE 1: BUSINESS SOLUTIONS */}
          <div className="rounded-3xl p-7 sm:p-9 bg-white border-2 border-blue-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-bl-full pointer-events-none -z-0" />

            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-blue-700 font-bold block">
                        FOR ORGANIZATIONS &amp; BUSINESSES
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                        🏢 Business Automation
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Tagline Quote - Fixed Min Height for Alignment */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-slate-800 text-xs sm:text-sm font-medium mb-6 leading-relaxed min-h-[84px] flex items-center">
                  <span>
                    &ldquo;<strong>Tell us what is slowing your business down.</strong> We audit your workflow, identify friction points, and build the right system.&rdquo;
                  </span>
                </div>

                {/* LifeCycle Pipeline - Clean 4-Col Grid Without Scrollbars */}
                <div className="mb-6">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2.5">
                    The Business Delivery Loop:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {businessSteps.map((step) => (
                      <div key={step.label} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                        <span className="text-[11px] font-bold text-slate-900 block truncate">{step.label}</span>
                        <span className="text-[10px] text-slate-500 block leading-tight mt-0.5 truncate">{step.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solutions List */}
                <div className="pt-4 border-t border-slate-100 mb-8">
                  <div className="text-xs uppercase tracking-wider text-slate-700 font-bold mb-3">
                    Solutions We Build &amp; Deploy:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    {businessSolutionsList.map((sol) => (
                      <li key={sol} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Action Pathways - Symmetric 2-Tier Buttons */}
              <div className="pt-5 border-t border-slate-100 space-y-2.5 mt-auto">
                <button
                  onClick={onSubmitProblem}
                  className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Submit a Business Problem</span>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
          </div>

          {/* SIDE 2: PRODUCTION & COLLEGE SOFTWARE PROJECTS */}
          <div className="rounded-3xl p-7 sm:p-9 bg-white border-2 border-emerald-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-bl-full pointer-events-none -z-0" />

            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-bold block">
                        FOR ENGINEERS &amp; STUDENTS
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                        🚀 Software &amp; College Projects
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Tagline Quote - Fixed Min Height for Alignment */}
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-slate-800 text-xs sm:text-sm font-medium mb-6 leading-relaxed min-h-[84px] flex items-center">
                  <span>
                    &ldquo;<strong>Get production-ready software architecture.</strong> Full documented source code, cloud deployment, system design, and 1-on-1 walkthroughs.&rdquo;
                  </span>
                </div>

                {/* LifeCycle Pipeline - Clean 4-Col Grid Without Scrollbars */}
                <div className="mb-6">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2.5">
                    The Engineering Delivery Loop:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {projectSteps.map((step) => (
                      <div key={step.label} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                        <span className="text-[11px] font-bold text-slate-900 block truncate">{step.label}</span>
                        <span className="text-[10px] text-slate-500 block leading-tight mt-0.5 truncate">{step.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className="pt-4 border-t border-slate-100 mb-8">
                  <div className="text-xs uppercase tracking-wider text-slate-700 font-bold mb-3">
                    What Every Project Package Includes:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    {projectFeaturesList.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Action Pathways - Symmetric 2-Tier Buttons */}
              <div className="pt-5 border-t border-slate-100 space-y-2.5 mt-auto">
                <button
                  onClick={onViewProjects}
                  className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4" />
                    <span>Browse Built Systems &amp; Case Studies</span>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
          </div>
        </div>
      </div>
    </section>
  );
};
