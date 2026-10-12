import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Wrench,
  Search,
  BookOpen,
  TrendingUp,
  Building2,
  GraduationCap,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const frameworkSteps = [
    {
      letter: 'V',
      title: 'Vision',
      phrase: 'Understand the Vision behind the problem',
      description:
        'We look past superficial symptoms to understand what your business is ultimately trying to achieve, why previous attempts failed, and what operational success looks like.',
      icon: <Sparkles className="w-5 h-5 text-blue-600" />,
      color: 'border-slate-300 bg-slate-100 text-slate-900'
    },
    {
      letter: 'E',
      title: 'Explore',
      phrase: 'Explore the real requirement',
      description:
        'We trace actual day-to-day operations, interviewing supervisors and staff to audit real data handoffs, edge cases, and hidden operational bottlenecks.',
      icon: <Search className="w-5 h-5 text-indigo-600" />,
      color: 'border-slate-300 bg-slate-100 text-slate-900'
    },
    {
      letter: 'E',
      title: 'Engineer',
      phrase: 'Engineer the right solution',
      description:
        'We design and build clean, reliable software, database architectures, and automated triggers. We build the exact system your workflow requires—no unnecessary bloat.',
      icon: <Wrench className="w-5 h-5 text-purple-600" />,
      color: 'border-slate-300 bg-slate-100 text-slate-900'
    },
    {
      letter: 'G',
      title: 'Guide',
      phrase: 'Guide the team through implementation',
      description:
        'Software only succeeds when adopted. We personally onboard your team, create practical guides, and ensure smooth operational transition without workflow downtime.',
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
      color: 'border-slate-300 bg-slate-100 text-slate-900'
    },
    {
      letter: 'O',
      title: 'Optimize',
      phrase: 'Optimize and improve continuously',
      description:
        'We review real system analytics, refine query performances, automate additional routine handoffs, and grow the software as your business expands.',
      icon: <TrendingUp className="w-5 h-5 text-pink-600" />,
      color: 'border-slate-300 bg-slate-100 text-slate-900'
    }
  ];

  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 bg-white min-h-screen">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-slate-900 mb-4">
          <span>BRAND PHILOSOPHY &amp; MISSION</span>
        </div>

        {/* Primary Customer-Facing Tagline */}
        <h1
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 mb-4 leading-tight"
          style={{ textWrap: 'balance' }}
        >
          We Go Through Your Problem.{' '}
          <span className="text-blue-600">
            We Give You the Solution.
          </span>
        </h1>

        {/* Core Philosophy Statement */}
        <div className="p-6 sm:p-7 rounded-[4px] bg-slate-50 border border-slate-200 mb-6">
          <div className="text-xs uppercase tracking-widest text-blue-700 font-mono font-bold mb-1">
            The VeeGo Philosophy
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-950 mb-1">
            Understand. Build. Grow.
          </div>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            &ldquo;We understand your problem, Build your System, Grow your Business.&rdquo;
          </p>
        </div>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          Every business works differently. Instead of forcing your business into a standard product, VeeGo starts by understanding your problem, your workflow and your goal — then finds or builds the right technology solution.
        </p>

        {/* Short brand version */}
        <div className="mt-4 flex items-center gap-3 text-xs sm:text-sm font-mono text-slate-500 font-medium">
          <span className="text-blue-700 font-bold">Your Problem.</span>
          <span>Our Journey.</span>
          <span className="text-emerald-700 font-bold">Your Solution.</span>
        </div>
      </motion.div>

      {/* Internal Brand Framework Section: V - E - E - G - O */}
      <section className="mb-14">
        <div className="border-t border-slate-200 pt-10 pb-6">
          <div className="text-xs uppercase tracking-widest text-blue-700 font-mono font-bold mb-2">
            The VeeGo Framework
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mb-2">
            The Meaning of VeeGo
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed mb-6">
            Behind every solution we deliver is a rigorous 5-step engineering framework:
            <span className="text-slate-950 font-bold block mt-1 text-sm font-mono">
              VEEGO = Vision → Explore → Engineer → Guide → Optimize
            </span>
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {frameworkSteps.map((step) => (
              <motion.div
                key={step.letter + step.title}
                variants={itemVariants}
                className="p-5 rounded-[4px] bg-white border border-slate-200 hover:border-slate-300 transition-colors flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
              >
                {/* Letter Token */}
                <div className={`w-11 h-11 rounded-[4px] border ${step.color} flex items-center justify-center text-lg font-mono font-black shrink-0`}>
                  {step.letter}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-950">
                      {step.title}
                    </h3>
                    <span className="text-slate-300 hidden sm:inline">·</span>
                    <span className="text-xs font-semibold text-blue-700">
                      {step.phrase}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Two Main Offerings */}
      <section className="mb-14 border-t border-slate-200 pt-10">
        <div className="text-xs uppercase tracking-widest text-slate-500 font-mono font-bold mb-2">
          Two Unified Tracks
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mb-6">
          How VeeGo Serves Businesses &amp; Learners
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Business Solutions */}
          <div className="p-7 rounded-[4px] bg-white border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-[4px] bg-slate-100 border border-slate-300 text-blue-600 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase tracking-wider text-blue-700 font-mono font-bold mb-1">
                TRACK 01
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-2">
                Business Solutions
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Businesses describe the bottleneck slowing them down. We study the routine, map the workflow, and engineer custom software, automation pipelines, and AI systems tailored to their daily operations.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/solutions')}
              className="text-xs font-bold uppercase tracking-wider text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1.5 pt-3 border-t border-slate-100 self-start cursor-pointer"
            >
              <span>Explore Solutions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. Paid Courses */}
          <div className="p-7 rounded-[4px] bg-white border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-[4px] bg-slate-100 border border-slate-300 text-indigo-600 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase tracking-wider text-indigo-700 font-mono font-bold mb-1">
                TRACK 02
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-2">
                Practical Courses
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                People who want to master real-world technology learn by building complete business systems (Python, React, Django, APIs, AI). No theoretical toy tutorials or superficial quizzes.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/courses')}
              className="text-xs font-bold uppercase tracking-wider text-indigo-700 hover:text-indigo-900 transition-colors flex items-center gap-1.5 pt-3 border-t border-slate-100 self-start cursor-pointer"
            >
              <span>Explore Practical Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Foundational Principles */}
      <section className="p-8 rounded-[4px] bg-slate-50 border border-slate-200 mb-10">
        <div className="text-xs uppercase tracking-widest text-slate-500 font-mono font-bold mb-5">
          VEEGO CORE PRINCIPLES · UNDERSTAND. BUILD. SOLVE.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div>
            <h4 className="font-bold text-slate-950 text-base mb-1">1. Problem First, Always</h4>
            <p className="text-slate-600 leading-relaxed">
              We never pitch tech stacks or buzzwords first. Every project starts by uncovering the friction slowing down real humans.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-950 text-base mb-1">2. Custom-Fitted Architecture</h4>
            <p className="text-slate-600 leading-relaxed">
              Standard SaaS often forces awkward operational compromises. We engineer systems that conform to how your business actually functions.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-950 text-base mb-1">3. Production Discipline</h4>
            <p className="text-slate-600 leading-relaxed">
              Both our enterprise systems and our learning courses are built for production reliability, real edge cases, and long-term stability.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-950 text-base mb-1">4. Measurable Operational Growth</h4>
            <p className="text-slate-600 leading-relaxed">
              Success is measured in hours saved every week, eliminated double-entry, faster billing, and empowered teams.
            </p>
          </div>
        </div>
      </section>

      {/* Action / Contact Card */}
      <div className="p-8 rounded-[4px] bg-white border border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-lg text-slate-950">Have a business problem to solve?</h4>
          <p className="text-xs text-slate-600 mt-0.5">Tell us what is slowing you down and get an architectural assessment.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('/business-enquiry')}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white transition-colors border border-blue-600 cursor-pointer"
          >
            Tell Us Your Problem
          </button>
          <button
            onClick={() => onNavigate('/courses')}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-[4px] border border-slate-300 hover:bg-slate-100 text-slate-900 transition-colors cursor-pointer"
          >
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
};
