import React from 'react';
import { ArrowRight, Target, Wrench, ShieldCheck, RefreshCw, Building2, Search } from 'lucide-react';

interface WhyVeeGoAndCTAProps {
  onSolveBusinessProblem: () => void;
  onExplorePaidCourses?: () => void;
}

export const WhyVeeGoAndCTA: React.FC<WhyVeeGoAndCTAProps> = ({
  onSolveBusinessProblem
}) => {
  const principles = [
    {
      title: 'Problem First',
      desc: 'Start with the business problem, not the technology. Code is only valuable when it eliminates actual human and organizational friction.',
      icon: <Target className="w-5 h-5 text-blue-600" />
    },
    {
      title: 'Practical Technology',
      desc: 'Use technology to create something useful. Avoid adding fragile gimmicks or complex bloat when a clean, fast web system solves the job.',
      icon: <Wrench className="w-5 h-5 text-indigo-600" />
    },
    {
      title: 'Build for Reality',
      desc: 'Design around real workflows. Systems must be resilient to user mistakes, network drops, and messy real-world operational changes.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />
    },
    {
      title: 'Continuous Optimization',
      desc: 'Technology and business processes keep evolving. We continuously adapt architectures to leverage modern APIs, cloud services, and automation.',
      icon: <RefreshCw className="w-5 h-5 text-purple-600" />
    }
  ];

  return (
    <>
      {/* SECTION: WHY VEEGO */}
      <section className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-widest text-blue-700 font-bold mb-2">
              Foundational Principles
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              Why VeeGo
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              We operate on core engineering ethics and clear business outcomes instead of hype.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-blue-300 hover:bg-white hover:shadow-sm transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
                    {p.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: FINAL CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-blue-50/50 text-slate-900 border-t border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 mb-6">
            <span>UNDERSTAND · BUILD · GROW</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-4"
            style={{ textWrap: 'balance' }}
          >
            We Go Through Your Problem. <br className="hidden sm:inline" />
            <span className="text-blue-600">
              We Give You the Solution.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-slate-600 max-w-xl mx-auto mb-10 font-normal leading-relaxed">
            We understand your problem, Build your System, Grow your Business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onSolveBusinessProblem}
              className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>Tell Us Your Problem</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
