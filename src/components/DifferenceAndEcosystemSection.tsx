import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  X,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  Cpu
} from 'lucide-react';

interface DifferenceAndEcosystemSectionProps {
  onTellBusinessProblem?: () => void;
  onExploreCourses?: () => void;
}

export const DifferenceAndEcosystemSection: React.FC<DifferenceAndEcosystemSectionProps> = () => {
  const [activeComparison, setActiveComparison] = useState<'both' | 'outdated' | 'veego'>('both');
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="relative py-16 sm:py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-900 font-bold px-3 py-1 bg-slate-100 border border-slate-300 rounded-[4px] mb-4"
          >
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>Engineering Standard</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-tight"
          >
            Technology is only useful when it <span className="text-blue-600">solves real operational problems.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
          >
            We reject syntax memorization and template tutorials. We build software in reverse: starting with the commercial workflow breakdown, architecting the solution, writing production code, and deploying to live cloud infrastructure.
          </motion.p>

          {/* Interactive view toggle */}
          <div className="mt-8 inline-flex p-1 bg-slate-100 border border-slate-300 rounded-[4px]">
            <button
              onClick={() => setActiveComparison('both')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeComparison === 'both'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Side-by-Side Comparison
            </button>
            <button
              onClick={() => setActiveComparison('outdated')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeComparison === 'outdated'
                  ? 'bg-rose-700 text-white'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              The Outdated Model
            </button>
            <button
              onClick={() => setActiveComparison('veego')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeComparison === 'veego'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              The VeeGo Standard
            </button>
          </div>
        </div>

        {/* Side by Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
          {/* Traditional Outdated Model (Left) */}
          <AnimatePresence mode="wait">
            {(activeComparison === 'both' || activeComparison === 'outdated') && (
              <motion.div
                key="outdated"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`p-7 sm:p-8 rounded-[4px] bg-slate-50 border ${
                  activeComparison === 'outdated' ? 'border-rose-500' : 'border-slate-300'
                } flex flex-col justify-between text-slate-900`}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 text-xs font-bold">
                    <span className="text-rose-700 font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      Conventional Approach
                    </span>
                    <span className="text-rose-700 bg-white px-2 py-0.5 rounded-[4px] border border-rose-200 font-mono text-[10px]">
                      High Friction &amp; Disconnected
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-950 mb-6">
                    Outdated Model
                  </h3>

                  <div className="space-y-3 text-xs">
                    {[
                      { num: '01', title: 'Memorize theoretical syntax rules', desc: 'No context on why code is written this way' },
                      { num: '02', title: 'Build generic dummy to-do app', desc: 'Copy-pasting code with zero commercial utility' },
                      { num: '03', title: 'Take multiple-choice syntax quiz', desc: 'Tests recall, not actual problem-solving' },
                      { num: '04', title: 'Paper certificate (No deployed app)', desc: 'Zero proof of real capability to show employers' },
                    ].map((step, idx) => (
                      <React.Fragment key={idx}>
                        <div className="p-3.5 rounded-[4px] bg-white text-slate-800 border border-slate-200 flex items-start justify-between gap-3">
                          <div>
                            <div className="font-bold text-slate-950 flex items-center gap-2">
                              <span className="text-rose-600 font-mono text-[11px]">{step.num}.</span>
                              {step.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{step.desc}</div>
                          </div>
                          <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        </div>
                        {idx < 3 && (
                          <div className="flex justify-center text-slate-400">
                            <ArrowDown className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-rose-800 leading-relaxed bg-white p-3.5 rounded-[4px] border border-slate-200">
                  <span className="font-bold text-rose-900 font-mono">Outcome:</span> Theoretical knowledge with zero ability to architect or deploy a real business application.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* VeeGo Engineering Standard (Right) */}
          <AnimatePresence mode="wait">
            {(activeComparison === 'both' || activeComparison === 'veego') && (
              <motion.div
                key="veego"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className={`p-7 sm:p-8 rounded-[4px] bg-white border ${
                  activeComparison === 'veego' ? 'border-slate-950' : 'border-slate-300'
                } flex flex-col justify-between relative text-slate-900`}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 text-xs font-bold">
                    <span className="text-blue-700 font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      THE VEEGO STANDARD
                    </span>
                    <span className="text-emerald-700 bg-slate-50 px-2 py-0.5 rounded-[4px] border border-slate-300 font-mono text-[10px] flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                      Production-Ready
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-950 mb-6">
                    VeeGo Applied Method
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    {[
                      { num: '01', title: 'Break down the business problem', desc: 'Identify bottlenecks, costs, & manual friction points' },
                      { num: '02', title: 'Architect the stack & schema', desc: 'Pick the right database, backend APIs, & front-end UX' },
                      { num: '03', title: 'Build full-stack solution', desc: 'Write clean, maintainable modular code' },
                      { num: '04', title: 'Deploy to cloud infrastructure', desc: 'Set up live domains, HTTPS, database backups' },
                      { num: '05', title: 'Master ongoing operations', desc: 'Track real metrics, analytics & continuous updates' },
                    ].map((step, idx) => (
                      <React.Fragment key={idx}>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          onHoverStart={() => setHoveredStep(idx)}
                          onHoverEnd={() => setHoveredStep(null)}
                          className={`p-3.5 rounded-[4px] transition-colors cursor-pointer ${
                            hoveredStep === idx
                              ? 'bg-slate-900 text-white border border-slate-900'
                              : 'bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-bold flex items-center gap-2">
                                <span className={hoveredStep === idx ? 'text-blue-300' : 'text-blue-600 font-mono text-[11px]'}>
                                  {step.num}.
                                </span>
                                {step.title}
                              </div>
                              <div className={`text-[11px] mt-0.5 ${hoveredStep === idx ? 'text-slate-300' : 'text-slate-600'}`}>
                                {step.desc}
                              </div>
                            </div>
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                              hoveredStep === idx ? 'text-white' : 'text-blue-600'
                            }`} />
                          </div>
                        </motion.div>
                        {idx < 4 && (
                          <div className="flex justify-center text-slate-400">
                            <ArrowDown className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-800 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-[4px] border border-slate-200">
                  <span className="font-bold text-slate-950 font-mono">Outcome:</span> Genuine engineering mastery. Real deployed software live on the internet solving tangible everyday needs.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
