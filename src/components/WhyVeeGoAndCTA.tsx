import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Wrench, ShieldCheck, RefreshCw, Building2, Sparkles, CheckCircle2, PhoneCall, Code2 } from 'lucide-react';

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
      desc: 'We start with the actual daily bottleneck, not tech buzzwords. Code is only valuable when it eliminates human effort and company cost.',
      icon: <Target className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Practical Stack',
      desc: 'We build with high-performance, maintainable technologies. Fast UIs, clean REST APIs, and resilient data storage engineered for long-term stability.',
      icon: <Wrench className="w-6 h-6 text-indigo-600" />
    },
    {
      title: 'Built for Reality',
      desc: 'Designed around real operational chaos. Our systems handle spotty connections, human typos, multi-device usage, and busy staff environments.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Continuous Support',
      desc: 'We don&apos;t abandon software after launch. We continuously monitor live health, optimize performance, and scale system capacity as your business expands.',
      icon: <RefreshCw className="w-6 h-6 text-purple-600" />
    }
  ];

  return (
    <>
      {/* SECTION: WHY VEEGO */}
      <section className="relative py-20 sm:py-28 bg-white text-slate-900 border-b border-slate-200 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-50/50 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs uppercase tracking-widest text-blue-700 font-bold mb-3 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>CORE ENGINEERING ETHICS</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              Why Organizations Trust VeeGo
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
            >
              We operate on tangible engineering outcomes, transparent pricing, and real human dedication instead of superficial marketing hype.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="p-7 rounded-3xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-xs group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: FINAL BOTTOM CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32 bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white border-t border-slate-800">
        {/* Parallax ambient background particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/20 rounded-full blur-[140px]"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-xs font-mono font-bold text-blue-300 mb-6"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>UNDERSTAND · BUILD · GROW</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6"
            style={{ textWrap: 'balance' }}
          >
            We Go Through Your Problem. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
              We Deliver Your Solution.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-xl mx-auto mb-10 font-normal leading-relaxed"
          >
            Speak directly with our senior software engineers. No aggressive sales reps, no automated bot loops — just straightforward engineering solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onSolveBusinessProblem}
              className="w-full sm:w-auto px-9 py-4 text-sm font-bold rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
            >
              <Building2 className="w-5 h-5" />
              <span>Discuss Your Operational Problem</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Trust Guarantees */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct access to lead software engineers</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Transparent delivery roadmap &amp; source code</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>8-hour guaranteed response time</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

