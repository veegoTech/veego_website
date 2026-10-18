import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Search,
  Wrench,
  TrendingUp,
  ArrowRight,
  Send,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import heroTeamImg from '../../assets/hero_team.jpg';
import { ServicesSection } from '../../components/ServicesSection';
import { DifferenceAndEcosystemSection } from '../../components/DifferenceAndEcosystemSection';
import { TwoWaysSection } from '../../components/TwoWaysSection';
import { HowItWorksSection } from '../../components/HowItWorksSection';
import { WhyVeeGoAndCTA } from '../../components/WhyVeeGoAndCTA';
import { Project, SolutionItem } from '../../types';
import { InteractiveProblemItem } from '../../data/businessProblems';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenLiveDemo?: (project: Project) => void;
  onDiscussProblem?: (problem: InteractiveProblemItem) => void;
  onExploreSolution?: (solution: SolutionItem) => void;
}

// Framer Motion Structural Animation Variants
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

const cardHoverReaction = {
  whileHover: { scale: 1.015, y: -2 },
  whileTap: { scale: 0.985 },
  transition: { type: 'spring' as const, stiffness: 450, damping: 28 }
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Consultation form state
  const [userProblem, setUserProblem] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const veegoFramework = [
    {
      id: 'understand',
      icon: (
        <div className="w-10 h-10 rounded-[4px] bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 mb-6">
          <Search className="w-5 h-5 text-blue-400" />
        </div>
      ),
      title: '1. Understand the Problem',
      description:
        'We look past superficial symptoms to understand what your business is ultimately trying to achieve, why previous attempts failed, and what operational success looks like.'
    },
    {
      id: 'engineer',
      icon: (
        <div className="w-10 h-10 rounded-[4px] bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 mb-6">
          <Wrench className="w-5 h-5 text-indigo-400" />
        </div>
      ),
      title: '2. Engineer the Solution',
      description:
        'We design and build clean, reliable software, database architectures, and automated triggers. We build the exact system your workflow requires—no unnecessary bloat.'
    },
    {
      id: 'optimize',
      icon: (
        <div className="w-10 h-10 rounded-[4px] bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 mb-6">
          <TrendingUp className="w-5 h-5 text-sky-400" />
        </div>
      ),
      title: '3. Guide & Optimize',
      description:
        'Software only succeeds when adopted. We personally onboard your team, create practical guides, and continuously optimize system analytics as your operational scale grows.'
    }
  ];

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'solutions' || id === 'projects' || id === 'about') {
      onNavigate(`/${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate(`/${id}`);
    }
  };

  const handleQuickConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProblem.trim()) return;
    setFormSubmitted(true);
  };

  const handleRequestService = (serviceName: string) => {
    setUserProblem(`Inquiry regarding ${serviceName}: We would like to discuss our requirements and deployment roadmap.`);
    scrollToSection('contact');
  };

  const handleSelectChip = (tag: string) => {
    setActiveChip(tag);
    setUserProblem(`Requirement: ${tag}. Please connect with us to discuss architectural scope.`);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-slate-900 selection:text-white">

      {/* ============================================================== */}
      {/* 🚀 1. HERO - SWISS GRID & ASYMMETRICAL BENTO-BOX LAYOUT */}
      {/* ============================================================== */}
      <header
        id="home"
        className="relative bg-white text-slate-900 pt-16 pb-24 sm:pt-24 sm:pb-32 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >

            {/* Bento Cell 1: Main Display & Core Mission (Span 7) */}
            <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-12 rounded-[4px] border border-slate-200 bg-white">
              <div>
                <motion.div variants={itemVariants}>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="tracking-wider uppercase">VEEGO PHILOSOPHY &amp; MISSION</span>
                  </span>
                </motion.div>

                {/* High-Contrast Swiss Typography (Strictly Flat, No Gradients) */}
                <motion.h1
                  variants={itemVariants}
                  className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-black tracking-tight text-slate-950 mb-6 leading-[1.05]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="font-black">Problems Out -</span>{' '}
                  <span className="text-blue-600 font-black">Solution In.</span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mb-10 font-normal"
                >
                  Every business works differently. VeeGo starts by understanding your exact daily workflow and bottlenecks — then engineers software, database architectures, and automated tools tailored to your goals.
                </motion.p>
              </div>

              {/* Action Buttons with 4px Micro-Radius & Spring Motion */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 text-sm font-semibold pt-4">
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                  className="px-7 py-3.5 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors cursor-pointer flex items-center gap-2.5"
                >
                  <span>Discuss Your Operational Problem</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </motion.button>

                <motion.button
                  onClick={() => onNavigate('/courses')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                  className="px-6 py-3.5 rounded-[4px] border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Courses</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </motion.button>
              </motion.div>
            </div>

            {/* Bento Cell 2: Image & System Spec Card (Span 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-[4px] border border-slate-200 bg-slate-50">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-full"
              >
                <div className="rounded-[4px] overflow-hidden border border-slate-200 bg-white p-2">
                  <img
                    src={heroTeamImg}
                    alt="VeeGo Systems Software Engineering Team"
                    className="w-full h-auto rounded-[2px] object-cover"
                  />
                </div>

                {/* Swiss Grid System Spec Strip */}
                <div className="mt-4 bg-white p-4 rounded-[4px] border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[4px] bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      V
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 tracking-tight">
                        VEEGO SYSTEMS CORE
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Understand · Build · Grow
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 border border-slate-200">
                    ACTIVE
                  </span>
                </div>

                {/* Functional Technical Data Points */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-left">
                  <div className="p-3 bg-white rounded-[4px] border border-slate-200">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">SLA Response</span>
                    <span className="text-xs font-bold text-slate-900">&lt; 8 Hours Review</span>
                  </div>
                  <div className="p-3 bg-white rounded-[4px] border border-slate-200">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Architecture</span>
                    <span className="text-xs font-bold text-slate-900">100% Bespoke Code</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 🎨 2. MIDDLE SECTION - BENTO-BOX DARK MATRIX (#0B0F19) */}
      {/* ============================================================== */}
      <section className="py-24 sm:py-32 bg-[#0B0F19] text-white border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.span
              variants={itemVariants}
              className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3 block"
            >
              Our Engineering &amp; Problem-Solving Philosophy
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              We Turn Complex Problems <br className="hidden sm:block" />
              into Scalable Systems
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              We analyze your challenges, engineer custom software solutions, and empower your business to scale effortlessly.
            </motion.p>
          </motion.div>

          {/* Staggered Asymmetrical Bento Grid: Graphic Left + 3 Framework Cards Right */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >

            {/* Bento Graphic Box (Span 4) */}
            <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col justify-between p-6 rounded-[4px] bg-slate-900 border border-slate-800">
              <div className="rounded-[4px] overflow-hidden border border-slate-800 bg-slate-950 p-2">
                <img
                  src="/images/anidio_vr.jpg"
                  alt="VeeGo Creative Engineering VR Character"
                  className="w-full h-auto rounded-[2px] object-cover"
                />
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>SPEC: PRODUCTION OS</span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>
            </motion.div>

            {/* Bento 3 Framework Cards (Span 8) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {veegoFramework.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  {...cardHoverReaction}
                  className="p-8 rounded-[4px] bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between group"
                >
                  <div>
                    {service.icon}
                    <h3
                      className="text-lg font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. CORE SERVICES SECTION (SOLID STARK WHITE SURFACE) */}
      {/* ============================================================== */}
      <div id="services" className="bg-white border-b border-slate-200">
        <ServicesSection
          onNavigate={onNavigate}
          onRequestService={handleRequestService}
        />
      </div>

      {/* ============================================================== */}
      {/* 5. ENGINEERING STANDARD (SOLID STARK LIGHT SLATE SURFACE) */}
      {/* ============================================================== */}
      <div id="connection" className="bg-[#f8fafc] border-b border-slate-200">
        <DifferenceAndEcosystemSection />
      </div>

      {/* ============================================================== */}
      {/* 6. THE TWO MAIN SIDES OF VEEGO (SOLID STARK WHITE SURFACE) */}
      {/* ============================================================== */}
      <div id="pathways" className="bg-white border-b border-slate-200">
        <TwoWaysSection
          onExploreSolutions={() => onNavigate('/courses')}
          onSubmitProblem={() => scrollToSection('contact')}
          onRequestCustomSoftware={() => scrollToSection('contact')}
          onViewProjects={() => onNavigate('/projects')}
        />
      </div>

      {/* ============================================================== */}
      {/* 7. HOW IT WORKS (SOLID STARK LIGHT SLATE SURFACE) */}
      {/* ============================================================== */}
      <div id="how-it-works" className="scroll-mt-16 bg-[#f8fafc] border-b border-slate-200">
        <HowItWorksSection
          onStartDiscovery={() => scrollToSection('contact')}
        />
      </div>

      {/* ============================================================== */}
      {/* ✉️ 9. DIRECT CONSULTATION FORM - ULTRA-MINIMALIST DATA CONTAINER */}
      {/* ============================================================== */}
      <section
        id="contact"
        className="relative py-24 sm:py-32 bg-white scroll-mt-16 overflow-hidden text-slate-900 border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-[4px] p-8 sm:p-12 bg-white border border-slate-200 relative text-slate-900"
          >
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-wider text-slate-700 font-bold px-3 py-1 rounded-[4px] bg-slate-100 border border-slate-200 mb-3 inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Direct Engineering Access
              </span>

              <h2
                className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mt-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                What problem are you trying to <span className="text-blue-600">solve today?</span>
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Describe the manual routine taking too much time, costing money, or causing operational mistakes. Our systems engineers will review your workflow and outline the right technical solution.
              </p>

              {/* Quick suggestion problem tags with layout morphing & 4px micro-radius */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {[
                  'Staff attendance & GPS tracking',
                  'Automated billing & GST invoicing',
                  'Inbound lead follow-up CRM',
                  'Google Sheets auto sync'
                ].map((tag) => {
                  const isSelected = activeChip === tag;
                  return (
                    <motion.button
                      layout
                      key={tag}
                      type="button"
                      onClick={() => handleSelectChip(tag)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                      className={`text-xs px-3 py-1.5 rounded-[4px] border transition-colors cursor-pointer font-medium ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      + {tag}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-[4px] bg-slate-50 border border-slate-200 text-center"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Problem Received — Engineering Review in Progress
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-5 font-normal leading-relaxed">
                  A VeeGo systems engineer will review your problem statement and reach out with a concrete workflow solution within 8 hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setUserProblem('');
                    setActiveChip(null);
                  }}
                  className="px-5 py-2.5 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleQuickConsultSubmit} className="space-y-5">
                <div>
                  <label htmlFor="hp-problem" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center justify-between">
                    <span>Describe Your Operational Bottleneck:</span>
                    <span className="text-[10px] text-slate-500 font-normal">Real-world operational detail is welcomed</span>
                  </label>
                  <textarea
                    id="hp-problem"
                    required
                    rows={4}
                    value={userProblem}
                    onChange={(e) => setUserProblem(e.target.value)}
                    placeholder="e.g. Our field staff record daily visits on WhatsApp and paper sheets. Management has zero real-time visibility..."
                    className="w-full text-xs sm:text-sm p-3.5 rounded-[4px] border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hp-email" className="block text-xs font-bold text-slate-800 mb-1.5">
                      Your Work Email:
                    </label>
                    <input
                      id="hp-email"
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full text-xs sm:text-sm p-3 rounded-[4px] border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="hp-phone" className="block text-xs font-bold text-slate-800 mb-1.5">
                      Phone / WhatsApp (Optional):
                    </label>
                    <input
                      id="hp-phone"
                      type="tel"
                      maxLength={10}
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full text-xs sm:text-sm p-3 rounded-[4px] border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
                    <span>Strict confidentiality. No aggressive sales calls, no spam.</span>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                    className="w-full sm:w-auto px-7 py-3 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Engineering Solution</span>
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. WHY VEEGO PRINCIPLES & FINAL BOTTOM CALL TO ACTION */}
      {/* ============================================================== */}
      <div id="about" className="scroll-mt-16">
        <WhyVeeGoAndCTA
          onSolveBusinessProblem={() => scrollToSection('contact')}
        />
      </div>

    </div>
  );
};
