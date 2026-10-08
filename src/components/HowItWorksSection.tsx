import React from 'react';
import { Search, Compass, Wrench, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

interface HowItWorksSectionProps {
  onStartDiscovery?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartDiscovery }) => {
  const steps = [
    {
      num: '01',
      title: 'Understand the Problem',
      desc: 'We start by sitting with your team to shadow the actual daily routine: where time is lost, which files are handled manually, and where communication breaks down.',
      deliverable: 'Friction Audit & Workflow Map',
      icon: <Search className="w-5 h-5 text-blue-600" />
    },
    {
      num: '02',
      title: 'Design Lean Architecture',
      desc: 'We architect a targeted software or automation solution without unnecessary SaaS bloat. Clean database models, fast UI, and resilient automated triggers.',
      deliverable: 'System Architecture Blueprint',
      icon: <Compass className="w-5 h-5 text-blue-600" />
    },
    {
      num: '03',
      title: 'Engineer & Deploy',
      desc: 'We build the production web app or integration, test every real edge case with your team, and train staff with zero operational disruption.',
      deliverable: 'Production Software & Staff Training',
      icon: <Wrench className="w-5 h-5 text-blue-600" />
    },
    {
      num: '04',
      title: 'Optimize & Scale',
      desc: 'As your business volume grows, we continuously monitor performance, eliminate new bottlenecks, and expand system capabilities.',
      deliverable: 'Ongoing Optimization & Scalability',
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700 font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE VEEGO PROCESS</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900"
            style={{ textWrap: 'balance' }}
          >
            Understand. Build. Grow.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We don&apos;t sell ready-made software off a shelf. We go through your actual bottleneck and deliver the exact solution your operations require.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                    STAGE {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3.5 border-t border-slate-100 text-xs">
                <span className="text-blue-700 font-bold block mb-1">Deliverable:</span>
                <span className="text-slate-700 font-medium">{step.deliverable}</span>
              </div>
            </div>
          ))}
        </div>

        {onStartDiscovery && (
          <div className="text-center">
            <button
              onClick={onStartDiscovery}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 hover:shadow-lg transition-all"
            >
              <span>Schedule an Operational Problem Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
