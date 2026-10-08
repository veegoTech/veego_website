import React from 'react';
import {
  ArrowDown,
  Check,
  X,
  Sparkles
} from 'lucide-react';

interface DifferenceAndEcosystemSectionProps {
  onTellBusinessProblem?: () => void;
  onExploreCourses?: () => void;
}

export const DifferenceAndEcosystemSection: React.FC<DifferenceAndEcosystemSectionProps> = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-blue-700 font-bold mb-2">
            Engineering Standard
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900"
            style={{ textWrap: 'balance' }}
          >
            Technology is only useful when it solves something.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            We reject the factory model of syntax memorization. We teach engineering in reverse: starting with the commercial breakdown, moving to code, and concluding with a live deployed system.
          </p>
        </div>

        {/* Side by Side Comparison: Traditional Learning vs VeeGo Learning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Traditional Learning (Left) */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-100 text-xs text-slate-500 font-semibold">
                <span className="text-slate-500">OUTDATED MODEL</span>
                <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                  Disconnected
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Traditional Learning
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 text-slate-600 border border-slate-200 flex items-center justify-between font-medium">
                  <span>01. Learn theoretical syntax</span>
                  <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                </div>
                <div className="flex justify-center text-slate-400">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-lg bg-slate-50 text-slate-600 border border-slate-200 flex items-center justify-between font-medium">
                  <span>02. Build generic dummy todo app</span>
                  <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                </div>
                <div className="flex justify-center text-slate-400">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-lg bg-slate-50 text-slate-600 border border-slate-200 flex items-center justify-between font-medium">
                  <span>03. Take multiple-choice quiz</span>
                  <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                </div>
                <div className="flex justify-center text-slate-400">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-lg bg-slate-50 text-slate-600 border border-slate-200 flex items-center justify-between font-medium">
                  <span>04. Paper Certificate (No real app built)</span>
                  <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
              Result: Theoretical syntax knowledge with zero ability to architect an end-to-end business application.
            </div>
          </div>

          {/* VeeGo Learning (Right) */}
          <div className="p-7 rounded-2xl bg-white border-2 border-blue-600 shadow-md shadow-blue-500/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-blue-100 text-xs text-blue-700 font-semibold">
                <span className="font-bold">THE VEEGO STANDARD</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  Production-Ready
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span>VeeGo Learning</span>
                <Sparkles className="w-4 h-4 text-blue-600" />
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-lg bg-blue-50/70 text-blue-900 border border-blue-200 flex items-center justify-between">
                  <span className="font-semibold">01. Understand the business problem</span>
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <div className="flex justify-center text-blue-500">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-lg bg-blue-50/70 text-blue-900 border border-blue-200 flex items-center justify-between">
                  <span className="font-semibold">02. Learn the required technology stack</span>
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <div className="flex justify-center text-blue-500">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-lg bg-blue-50/70 text-blue-900 border border-blue-200 flex items-center justify-between">
                  <span className="font-semibold">03. Build the full-stack solution</span>
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <div className="flex justify-center text-blue-500">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-lg bg-blue-50/70 text-blue-900 border border-blue-200 flex items-center justify-between">
                  <span className="font-semibold">04. Deploy to live cloud infrastructure</span>
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <div className="flex justify-center text-blue-500">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center justify-between font-bold">
                  <span>05. Master ongoing operational use</span>
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-100 text-xs text-blue-700 font-medium leading-relaxed">
              Result: Genuine engineering capability. You can show working products to clients and employers.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
