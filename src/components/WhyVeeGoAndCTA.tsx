import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Wrench, ShieldCheck, RefreshCw, Building2, Sparkles, CheckCircle2, Code2 } from 'lucide-react';
import { WaveDivider } from './WaveDivider';

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
      icon: <Target className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Practical Stack',
      desc: 'We build with high-performance, maintainable technologies. Fast UIs, clean REST APIs, and resilient data storage engineered for long-term stability.',
      icon: <Wrench className="w-6 h-6 text-indigo-600" />,
      bg: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      title: 'Built for Reality',
      desc: 'Designed around real operational chaos. Our systems handle spotty connections, human typos, multi-device usage, and busy staff environments.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      title: 'Continuous Support',
      desc: 'We don&apos;t abandon software after launch. We continuously monitor live health, optimize performance, and scale system capacity as your business expands.',
      icon: <RefreshCw className="w-6 h-6 text-sky-600" />,
      bg: 'bg-sky-50 text-sky-600 border-sky-200'
    }
  ];

  return (
    <>
      {/* SECTION: WHY VEEGO */}
      <section className="relative py-12 sm:py-16 bg-[#f8fafc] text-slate-900 overflow-hidden border-b border-slate-200/60">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs uppercase tracking-widest text-blue-700 font-bold mb-3 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>CORE ENGINEERING ETHICS</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Why Organizations <span className="text-blue-600 font-extrabold">Trust VeeGo</span>
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
                className="p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-13 h-13 rounded-2xl ${p.bg} border flex items-center justify-center mb-6 shadow-xs group-hover:scale-110 transition-all duration-300`}>
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors font-display">
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

      {/* ✨ ARCHITECTURAL SECTION DIVIDER */}
      <WaveDivider />

      {/* SECTION: FINAL BOTTOM CTA */}
      <section className="relative overflow-hidden py-12 sm:py-16 pb-20 sm:pb-24 bg-white text-slate-900">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pb-8 sm:pb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-700 mb-6"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            <span>UNDERSTAND · BUILD · GROW</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 mb-6 leading-tight"
            style={{ textWrap: 'balance' }}
          >
            We Go Through Your Problem. <br className="hidden sm:inline" />
            <span className="text-blue-600 font-black">
              We Deliver Your Solution.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-slate-600 max-w-xl mx-auto mb-10 font-normal leading-relaxed"
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
              className="w-full sm:w-auto px-9 py-4 text-sm font-bold rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/25 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Building2 className="w-5 h-5" />
              <span>Discuss Your Operational Problem</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Trust Guarantees */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Direct access to lead software engineers</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Transparent delivery roadmap &amp; source code</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>8-hour guaranteed response time</span>
            </div>
          </div>
        </div>

        {/* 🌊 WAVE DESIGN DIVIDER TRANSITIONING INTO SLATE-900 FOOTER */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider
            variant="layered"
            fillColor="#0f172a"
            secondaryColor="rgba(30, 41, 59, 0.55)"
            heightClass="h-12 sm:h-16 lg:h-20"
          />
        </div>
      </section>
    </>
  );
};
