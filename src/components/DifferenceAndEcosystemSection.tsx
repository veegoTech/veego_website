import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  Check,
  X,
  Sparkles,
  Layers,
  Terminal,
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
    <section className="relative py-20 sm:py-32 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-100/80 via-slate-50 to-white text-slate-900 border-b border-slate-200/80 overflow-hidden">
      {/* Background Parallax & Light Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-dot-pattern opacity-30">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 left-1/4 w-[450px] h-[450px] bg-gradient-to-br from-blue-400/15 via-indigo-400/10 to-purple-400/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-400/15 via-teal-400/10 to-blue-400/15 rounded-full blur-3xl"
        />

        {/* Floating tech background icons */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 left-8 text-blue-300/60 hidden lg:block"
        >
          <Layers className="w-16 h-16" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 text-emerald-300/60 hidden lg:block"
        >
          <Terminal className="w-16 h-16" />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-blue-700 font-bold px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-full mb-4 shadow-xs"
          >
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>Engineering Standard</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Technology is only useful when it <span className="text-gradient-blue">solves real operational problems.</span>
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
          <div className="mt-8 inline-flex p-1 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-sm">
            <button
              onClick={() => setActiveComparison('both')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeComparison === 'both'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side-by-Side Comparison
            </button>
            <button
              onClick={() => setActiveComparison('outdated')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeComparison === 'outdated'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              The Outdated Model
            </button>
            <button
              onClick={() => setActiveComparison('veego')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeComparison === 'veego'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              The VeeGo Standard
            </button>
          </div>
        </div>

        {/* Side by Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Traditional Outdated Model (Left) */}
          <AnimatePresence mode="wait">
            {(activeComparison === 'both' || activeComparison === 'outdated') && (
              <motion.div
                key="outdated"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`p-8 sm:p-9 rounded-3xl glass-card border-2 ${
                  activeComparison === 'outdated' ? 'border-rose-400 ring-4 ring-rose-100' : 'border-slate-200/90'
                } shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 text-xs font-bold">
                    <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-500" />
                      Conventional Approach
                    </span>
                    <span className="text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200/60 font-medium">
                      High Friction & Disconnected
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center justify-between">
                    <span>Outdated Model</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    {[
                      { num: '01', title: 'Memorize theoretical syntax rules', desc: 'No context on why code is written this way' },
                      { num: '02', title: 'Build generic dummy to-do app', desc: 'Copy-pasting code with zero commercial utility' },
                      { num: '03', title: 'Take multiple-choice syntax quiz', desc: 'Tests recall, not actual problem-solving' },
                      { num: '04', title: 'Paper certificate (No deployed app)', desc: 'Zero proof of real capability to show employers' },
                    ].map((step, idx) => (
                      <React.Fragment key={idx}>
                        <div className="p-3.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/80 flex items-start justify-between gap-3 group hover:border-slate-300 transition-colors">
                          <div>
                            <div className="font-semibold text-slate-800 flex items-center gap-2">
                              <span className="text-slate-400 font-mono text-[11px]">{step.num}.</span>
                              {step.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{step.desc}</div>
                          </div>
                          <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        </div>
                        {idx < 3 && (
                          <div className="flex justify-center text-slate-300">
                            <ArrowDown className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed bg-rose-50/50 p-3.5 rounded-xl border border-rose-100/50">
                  <span className="font-bold text-rose-900">Outcome:</span> Theoretical knowledge with zero ability to architect or deploy a real business application.
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
                className={`p-8 rounded-3xl bg-white border-2 border-blue-600 shadow-xl shadow-blue-600/10 flex flex-col justify-between relative overflow-hidden ${
                  activeComparison === 'veego' ? 'ring-4 ring-blue-100' : ''
                }`}
              >
                {/* Glowing subtle top bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-blue-100 text-xs font-bold">
                    <span className="text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      THE VEEGO STANDARD
                    </span>
                    <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-medium flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                      Production-Ready
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center justify-between">
                    <span>VeeGo Applied Method</span>
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
                          whileHover={{ scale: 1.02, x: 2 }}
                          onHoverStart={() => setHoveredStep(idx)}
                          onHoverEnd={() => setHoveredStep(null)}
                          className={`p-3.5 rounded-xl transition-all cursor-pointer ${
                            hoveredStep === idx
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : idx === 4
                              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                              : 'bg-blue-50/70 text-blue-950 border border-blue-200/80'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-bold flex items-center gap-2">
                                <span className={hoveredStep === idx ? 'text-blue-200' : 'text-blue-600 font-mono text-[11px]'}>
                                  {step.num}.
                                </span>
                                {step.title}
                              </div>
                              <div className={`text-[11px] mt-0.5 ${hoveredStep === idx ? 'text-blue-100' : 'text-slate-600'}`}>
                                {step.desc}
                              </div>
                            </div>
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                              hoveredStep === idx ? 'text-white' : idx === 4 ? 'text-emerald-600' : 'text-blue-600'
                            }`} />
                          </div>
                        </motion.div>
                        {idx < 4 && (
                          <div className="flex justify-center text-blue-400">
                            <ArrowDown className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-blue-100 text-xs text-blue-900 font-medium leading-relaxed bg-blue-50/60 p-3.5 rounded-xl border border-blue-100">
                  <span className="font-bold text-blue-800">Outcome:</span> Genuine engineering mastery. Real deployed software live on the internet solving tangible everyday needs.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

