import React from 'react';
import { HowItWorksSection } from '../../components/HowItWorksSection';
import { Search, Compass, Wrench, TrendingUp, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 bg-white min-h-screen">
      {/* 4-Step Framework */}
      <HowItWorksSection onStartDiscovery={() => onNavigate('/business-enquiry')} />

      {/* Deep-dive Phase Details */}
      <div className="mt-12 max-w-4xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="text-xs uppercase tracking-widest text-blue-700 font-mono font-bold mb-1">
            Methodology Deep Dive
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            We understand your problem, Build your System, Grow your Business
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            How we protect your time, avoid off-the-shelf software compromises, and guarantee operational fit at every stage.
          </p>
        </div>

        {/* 01: Understand */}
        <div className="p-6 sm:p-7 rounded-[4px] bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono font-bold text-blue-700 px-2.5 py-0.5 rounded-[4px] bg-white border border-slate-300">
              PHASE 01 · UNDERSTAND
            </span>
            <h3 className="text-lg font-bold text-slate-950">Understand the Problem &amp; Workflow</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            You don&apos;t need a formal technical specification. You simply explain what is slowing down your team: manual reconciliations, staff scheduling chaos, uncollected invoices, or lost communication. We observe how data really moves across your staff.
          </p>
          <div className="text-xs font-mono text-slate-500 font-medium">
            Outcome: Deep operational friction audit and clear vision of measurable business success.
          </div>
        </div>

        {/* 02: Explore */}
        <div className="p-6 sm:p-7 rounded-[4px] bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono font-bold text-slate-800 px-2.5 py-0.5 rounded-[4px] bg-white border border-slate-300">
              PHASE 02 · EXPLORE
            </span>
            <h3 className="text-lg font-bold text-slate-950">Explore Requirements &amp; Architecture</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            We map database structures, user roles (managers, employees, clients), and automated triggers. We evaluate the cleanest tech stack (Python, React, PostgreSQL, AI integrations) to ensure high speed and zero bloat.
          </p>
          <div className="text-xs font-mono text-slate-500 font-medium">
            Outcome: Clean technical blueprint, database schema, and delivery milestone schedule.
          </div>
        </div>

        {/* 03: Engineer */}
        <div className="p-6 sm:p-7 rounded-[4px] bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono font-bold text-indigo-700 px-2.5 py-0.5 rounded-[4px] bg-white border border-slate-300">
              PHASE 03 · ENGINEER
            </span>
            <h3 className="text-lg font-bold text-slate-950">Engineer and Test with Live Data</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            We build the core system iteratively, presenting working prototypes to your team early. You test the interfaces with your actual daily records, allowing us to polish usability and eliminate quirks before launch.
          </p>
          <div className="text-xs font-mono text-slate-500 font-medium">
            Outcome: Production software tested and verified against your real operational edge cases.
          </div>
        </div>

        {/* 04: Deploy & Scale */}
        <div className="p-6 sm:p-7 rounded-[4px] bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono font-bold text-emerald-800 px-2.5 py-0.5 rounded-[4px] bg-white border border-slate-300">
              PHASE 04 · GROW
            </span>
            <h3 className="text-lg font-bold text-slate-950">Deploy, Train &amp; Support</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            We support your staff through onboarding, provide video walkthroughs, and monitor server capacity. As your transaction volume grows, we add custom automations and analytics.
          </p>
          <div className="text-xs font-mono text-slate-500 font-medium">
            Outcome: Seamless adoption, immediate time savings, and long-term peace of mind.
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="pt-8 text-center">
          <button
            onClick={() => onNavigate('/business-enquiry')}
            className="px-8 py-3.5 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 border border-blue-600 cursor-pointer"
          >
            <span>Start with a Free Workflow Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
