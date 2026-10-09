import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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

  // Scroll Parallax Hooks
  const { scrollYProgress } = useScroll();
  const bgOrbY = useTransform(scrollYProgress, [0.2, 0.7], [-60, 60]);

  return (
    <section className="relative py-20 sm:py-32 bg-[#120529] text-white overflow-hidden">

      {/* Background Parallax & Light Orbs + Star Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          style={{ y: bgOrbY }}
          animate={{
            x: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: bgOrbY }}
          animate={{
            x: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-pink-500/20 rounded-full blur-[110px]"
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

        {/* Floating tech background icons */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 left-8 text-purple-400/30 hidden lg:block"
        >
          <Layers className="w-16 h-16" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 text-indigo-400/30 hidden lg:block"
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
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-purple-300 font-bold px-3.5 py-1.5 bg-purple-500/20 border border-purple-400/30 rounded-full mb-4 shadow-xs"
          >
            <Cpu className="w-3.5 h-3.5 text-purple-300" />
            <span>Engineering Standard</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-Space Grotesk text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Technology is only useful when it <span className="text-purple-300 font-extrabold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>solves real operational problems.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-purple-200/80 leading-relaxed font-normal"
          >
            We reject syntax memorization and template tutorials. We build software in reverse: starting with the commercial workflow breakdown, architecting the solution, writing production code, and deploying to live cloud infrastructure.
          </motion.p>

          {/* Interactive view toggle */}
          <div className="mt-8 inline-flex p-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-sm">
            <button
              onClick={() => setActiveComparison('both')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeComparison === 'both'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-purple-200 hover:text-white'
                }`}
            >
              Side-by-Side Comparison
            </button>
            <button
              onClick={() => setActiveComparison('outdated')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeComparison === 'outdated'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-purple-200 hover:text-white'
                }`}
            >
              The Outdated Model
            </button>
            <button
              onClick={() => setActiveComparison('veego')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeComparison === 'veego'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-purple-200 hover:text-white'
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
                className={`p-8 sm:p-9 rounded-3xl bg-white/5 backdrop-blur-md border ${
                  activeComparison === 'outdated' ? 'border-rose-400/80 ring-2 ring-rose-500/20' : 'border-white/10'
                } shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between text-white`}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-bold">
                    <span className="text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                      Conventional Approach
                    </span>
                    <span className="text-rose-300 bg-rose-500/20 px-2.5 py-1 rounded-md border border-rose-400/30 font-medium">
                      High Friction &amp; Disconnected
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-6 flex items-center justify-between font-Space Grotesk">
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
                        <div className="p-3.5 rounded-xl bg-white/5 text-purple-100 border border-white/10 flex items-start justify-between gap-3 group hover:border-white/20 transition-colors">
                          <div>
                            <div className="font-semibold text-white flex items-center gap-2">
                              <span className="text-purple-300/70 font-mono text-[11px]">{step.num}.</span>
                              {step.title}
                            </div>
                            <div className="text-[11px] text-purple-200/70 mt-0.5">{step.desc}</div>
                          </div>
                          <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        </div>
                        {idx < 3 && (
                          <div className="flex justify-center text-purple-300/40">
                            <ArrowDown className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-xs text-rose-200/90 leading-relaxed bg-rose-500/10 p-3.5 rounded-xl border border-rose-400/20">
                  <span className="font-bold text-rose-300">Outcome:</span> Theoretical knowledge with zero ability to architect or deploy a real business application.
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
                className={`p-8 rounded-3xl bg-white/5 backdrop-blur-md border ${
                  activeComparison === 'veego' ? 'border-purple-400 ring-2 ring-purple-500/30' : 'border-purple-400/30 hover:border-purple-400/60'
                } shadow-xl shadow-purple-600/10 flex flex-col justify-between relative overflow-hidden text-white`}
              >
                {/* Glowing subtle top bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />

                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-bold">
                    <span className="text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      THE VEEGO STANDARD
                    </span>
                    <span className="text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-md border border-emerald-400/30 font-medium flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                      Production-Ready
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-6 flex items-center justify-between font-Space Grotesk">
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
                              ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                              : idx === 4
                                ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                                : 'bg-purple-500/10 text-purple-100 border border-purple-400/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-bold flex items-center gap-2">
                                <span className={hoveredStep === idx ? 'text-purple-200' : 'text-purple-300 font-mono text-[11px]'}>
                                  {step.num}.
                                </span>
                                {step.title}
                              </div>
                              <div className={`text-[11px] mt-0.5 ${hoveredStep === idx ? 'text-purple-100' : 'text-purple-200/80'}`}>
                                {step.desc}
                              </div>
                            </div>
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                              hoveredStep === idx ? 'text-white' : idx === 4 ? 'text-emerald-400' : 'text-purple-400'
                            }`} />
                          </div>
                        </motion.div>
                        {idx < 4 && (
                          <div className="flex justify-center text-purple-400/50">
                            <ArrowDown className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-xs text-purple-200 font-medium leading-relaxed bg-purple-500/15 p-3.5 rounded-xl border border-purple-400/20">
                  <span className="font-bold text-purple-300">Outcome:</span> Genuine engineering mastery. Real deployed software live on the internet solving tangible everyday needs.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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

