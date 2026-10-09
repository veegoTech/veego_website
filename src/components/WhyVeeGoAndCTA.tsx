import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Target, Wrench, ShieldCheck, RefreshCw, Building2, Sparkles, CheckCircle2, PhoneCall, Code2 } from 'lucide-react';

interface WhyVeeGoAndCTAProps {
  onSolveBusinessProblem: () => void;
  onExplorePaidCourses?: () => void;
}

export const WhyVeeGoAndCTA: React.FC<WhyVeeGoAndCTAProps> = ({
  onSolveBusinessProblem
}) => {
  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll();
  const bgOrbY = useTransform(scrollYProgress, [0.6, 1], [-60, 60]);

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
      <section className="relative py-20 pb-32 sm:py-32 sm:pb-36 bg-[#120529] text-white overflow-hidden">
        {/* Parallax background orbs + star particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            style={{ y: bgOrbY }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/25 rounded-full blur-[130px]"
          />

          {/* Animated Particle Stars */}
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                top: `${(i * 19) % 85 + 8}%`,
                left: `${(i * 27) % 92 + 4}%`,
                width: `${(i % 3) + 2}px`,
                height: `${(i % 3) + 2}px`,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.25, 0.8] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs uppercase tracking-widest text-purple-300 font-bold mb-3 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>CORE ENGINEERING ETHICS</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Why Organizations <span className="text-purple-300 font-extrabold">Trust VeeGo</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-purple-200/80 leading-relaxed font-normal"
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
                whileHover={{ y: -8 }}
                className="p-7 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-400/40 hover:bg-white/10 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:bg-purple-600 text-purple-300 group-hover:text-white transition-all duration-300">
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors font-display">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 🌊 REDESIGNED DUAL-LAYER SVG WAVE DIVIDER */}
        <div className="absolute bottom-0 -left-1 -right-1 w-[calc(100%+8px)] overflow-hidden leading-none z-20 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#0e0422] fill-current"
          >
            {/* Layer 1: Soft Translucent Depth Wave */}
            <path
              opacity="0.25"
              d="M0,50 C320,110 640,15 960,85 C1280,140 1380,30 1440,50 L1440,120 L0,120 Z"
            />
            {/* Layer 2: Main Solid Curve Wave */}
            <path d="M0,32 C280,90 560,90 840,40 C1120,-10 1280,50 1440,65 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* SECTION: FINAL BOTTOM CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32 bg-[#0e0422] text-white border-t border-white/10">

        {/* Parallax ambient background glows & star particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-purple-600/30 rounded-full blur-[130px]"
          />

          {/* Animated Particle Stars */}
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                top: `${(i * 19) % 85 + 8}%`,
                left: `${(i * 27) % 92 + 4}%`,
                width: `${(i % 3) + 2}px`,
                height: `${(i % 3) + 2}px`,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.25, 0.8] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs font-mono font-bold text-purple-300 mb-6"
          >
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            <span>UNDERSTAND · BUILD · GROW</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight"
            style={{ textWrap: 'balance' }}
          >
            We Go Through Your Problem. <br className="hidden sm:inline" />
            <span className="text-purple-300 font-black">
              We Deliver Your Solution.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-purple-200/80 max-w-xl mx-auto mb-10 font-normal leading-relaxed"
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
              className="w-full sm:w-auto px-9 py-4 text-sm font-bold rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Building2 className="w-5 h-5" />
              <span>Discuss Your Operational Problem</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Trust Guarantees */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-semibold text-purple-200">
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

