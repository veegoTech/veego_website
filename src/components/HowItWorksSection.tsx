import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Wrench, TrendingUp, ArrowRight, Sparkles, CheckCircle2, Cpu } from 'lucide-react';

interface HowItWorksSectionProps {
  onStartDiscovery?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartDiscovery }) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

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
      icon: <Compass className="w-5 h-5 text-indigo-600" />
    },
    {
      num: '03',
      title: 'Engineer & Deploy',
      desc: 'We build the production web app or integration, test every real edge case with your team, and train staff with zero operational disruption.',
      deliverable: 'Production Software & Staff Training',
      icon: <Wrench className="w-5 h-5 text-emerald-600" />
    },
    {
      num: '04',
      title: 'Optimize & Scale',
      desc: 'As your business volume grows, we continuously monitor performance, eliminate new bottlenecks, and expand system capabilities.',
      deliverable: 'Ongoing Optimization & Scalability',
      icon: <TrendingUp className="w-5 h-5 text-purple-600" />
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 mb-4"
          >

            <span className="tracking-wider uppercase">THE VEEGO PROCESS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-tight"
            style={{ textWrap: 'balance', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Understand. Build. <span className="text-blue-600 font-black">Grow.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
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
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              onHoverStart={() => setHoveredStep(idx)}
              onHoverEnd={() => setHoveredStep(null)}
              className={`p-7 rounded-[4px] bg-white border transition-colors duration-150 flex flex-col justify-between cursor-pointer ${hoveredStep === idx
                  ? 'border-slate-950'
                  : 'border-slate-200 hover:border-slate-400'
                }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-[4px] bg-slate-100 border border-slate-300 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-300 px-2.5 py-0.5 rounded-[4px]">
                    STAGE {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-950 mb-3 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 text-xs">
                <div className="flex items-center gap-1.5 text-blue-700 font-bold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Key Deliverable:</span>
                </div>
                <span className="text-slate-800 font-medium">{step.deliverable}</span>
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
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-blue-600 cursor-pointer"
            >
              <span>Start Discovery Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
