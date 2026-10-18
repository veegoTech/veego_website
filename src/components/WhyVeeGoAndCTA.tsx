import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Target, Wrench, ShieldCheck, RefreshCw, Building2, Sparkles, CheckCircle2, Code2 } from 'lucide-react';

interface WhyVeeGoAndCTAProps {
  onSolveBusinessProblem: () => void;
  onExplorePaidCourses?: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

export const WhyVeeGoAndCTA: React.FC<WhyVeeGoAndCTAProps> = ({
  onSolveBusinessProblem
}) => {
  const principles = [
    {
      title: 'Problem First',
      desc: 'We start with the actual daily bottleneck, not tech buzzwords. Code is only valuable when it eliminates human effort and company cost.',
      icon: <Target className="w-5 h-5 text-blue-400" />,
      bg: 'bg-slate-800 text-blue-400 border-slate-700'
    },
    {
      title: 'Practical Stack',
      desc: 'We build with high-performance, maintainable technologies. Fast UIs, clean REST APIs, and resilient data storage engineered for long-term stability.',
      icon: <Wrench className="w-5 h-5 text-indigo-400" />,
      bg: 'bg-slate-800 text-indigo-400 border-slate-700'
    },
    {
      title: 'Built for Reality',
      desc: 'Designed around real operational chaos. Our systems handle spotty connections, human typos, multi-device usage, and busy staff environments.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      bg: 'bg-slate-800 text-emerald-400 border-slate-700'
    },
    {
      title: 'Continuous Support',
      desc: 'We don&apos;t abandon software after launch. We continuously monitor live health, optimize performance, and scale system capacity as your business expands.',
      icon: <RefreshCw className="w-5 h-5 text-sky-400" />,
      bg: 'bg-slate-800 text-sky-400 border-slate-700'
    }
  ];

  return (
    <>
      {/* SECTION: WHY VEEGO - ULTRA-MINIMALIST SOLID STARK DARK SURFACE (#0B0F19) */}
      <section className="relative py-24 sm:py-32 bg-[#0B0F19] text-white overflow-hidden border-t border-slate-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-slate-900 border border-slate-800 text-xs uppercase tracking-widest text-blue-400 font-bold mb-4"
            >

              <span>CORE ENGINEERING ETHICS</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4"
              style={{ textWrap: 'balance', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Why Organizations <span className="text-blue-400 font-black">Trust VeeGo</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal"
            >
              We operate on tangible engineering outcomes, transparent pricing, and real human dedication instead of superficial marketing hype.
            </motion.p>
          </motion.div>

          {/* Staggered Grid with Micro-Scale Hover Reactions & 4px Radius */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {principles.map((p) => (
              <motion.div
                key={p.title}
                variants={itemVariants}
                whileHover={{ scale: 1.015, y: -2 }}
                transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                className="p-8 rounded-[4px] bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-10 h-10 rounded-[4px] ${p.bg} border flex items-center justify-center mb-6`}>
                    {p.icon}
                  </div>
                  <h3
                    className="text-lg font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION: FINAL BOTTOM CTA - SOLID STARK WHITE SURFACE WITH HAIRLINE BORDERS */}
      <section className="relative overflow-hidden py-24 sm:py-32 bg-white text-slate-900 border-t border-slate-200">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700 mb-6"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            <span>UNDERSTAND · BUILD · GROW</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 mb-6 leading-tight"
            style={{ textWrap: 'balance', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            We Go Through Your Problem. <br className="hidden sm:inline" />
            <span className="text-blue-600 font-black">
              We Give You the Solution.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.4 }}
            className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-10 font-normal leading-relaxed"
          >
            Speak directly with our senior software engineers. No aggressive sales reps, no automated bot loops — just straightforward engineering solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={onSolveBusinessProblem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>Discuss Your Operational Problem</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Trust Guarantees - 4px Hairline Grid */}
          <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm font-semibold text-slate-600">
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
      </section>
    </>
  );
};
