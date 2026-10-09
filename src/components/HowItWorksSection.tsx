import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Compass, Wrench, TrendingUp, ArrowRight, Sparkles, CheckCircle2, Cpu } from 'lucide-react';

interface HowItWorksSectionProps {
  onStartDiscovery?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartDiscovery }) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Scroll Parallax Hooks
  const { scrollYProgress } = useScroll();
  const bgOrbY = useTransform(scrollYProgress, [0.3, 0.8], [-60, 60]);

  const steps = [
    {
      num: '01',
      title: 'Understand the Problem',
      desc: 'We sit with your team to shadow the actual daily routine: where time is lost, which files are handled manually, and where communication breaks down.',
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
    <section className="relative py-20 pb-32 sm:py-32 sm:pb-36 bg-[#120529] text-white overflow-hidden">

      {/* Parallax background orb + star particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          style={{ y: bgOrbY }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/25 via-indigo-600/20 to-pink-500/20 rounded-full blur-[130px]"
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
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs text-purple-300 font-bold mb-4 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="tracking-wider uppercase">THE VEEGO PROCESS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Understand. Build. <span className="text-purple-300 font-extrabold">Grow.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-purple-200/80 leading-relaxed font-normal"
          >
            We don&apos;t sell ready-made generic software. We study your exact workflow friction and deliver software tailored to how your team operates.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              onHoverStart={() => setHoveredStep(idx)}
              onHoverEnd={() => setHoveredStep(null)}
              className={`p-7 rounded-3xl bg-white/5 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between relative group cursor-pointer ${
                hoveredStep === idx
                  ? 'border-purple-400/60 bg-white/10 shadow-2xl -translate-y-2'
                  : 'border-white/10 shadow-md hover:border-purple-400/40'
              }`}
            >
              {/* Step indicator pill */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    hoveredStep === idx
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 rotate-6 scale-110'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/20 border border-purple-400/30 px-3 py-1 rounded-full">
                    STAGE {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              <div className={`pt-4 border-t transition-colors text-xs ${
                hoveredStep === idx ? 'border-purple-400/30 bg-purple-500/10 -mx-6 -mb-6 p-4 rounded-b-3xl' : 'border-white/10'
              }`}>
                <div className="flex items-center gap-1.5 text-purple-300 font-bold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Key Deliverable:</span>
                </div>
                <span className="text-purple-100 font-medium">{step.deliverable}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {onStartDiscovery && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={onStartDiscovery}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>Schedule an Operational Problem Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* 🌊 REDESIGNED DUAL-LAYER SVG WAVE DIVIDER */}
      <div className="absolute bottom-0 -left-1 -right-1 w-[calc(100%+8px)] overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#0e0422] fill-current scale-x-[-1]"
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
  );
};

