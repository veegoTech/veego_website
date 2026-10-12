import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Search,
  Wrench,
  TrendingUp,
  ArrowRight,
  Send,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import heroTeamImg from '../../assets/hero_team.jpg';
import { WaveDivider } from '../../components/WaveDivider';
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

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.6]);
  const vrY = useTransform(scrollYProgress, [0.1, 0.5], [40, -30]);
  const vrRotate = useTransform(scrollYProgress, [0.1, 0.5], [-2, 2]);
  const contactY = useTransform(scrollYProgress, [0.65, 0.95], [30, -15]);

  // Consultation form state
  const [userProblem, setUserProblem] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const veegoFramework = [
    {
      id: 'understand',
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs mb-6 group-hover:scale-110 transition-transform">
          <Search className="w-7 h-7 text-blue-600" />
        </div>
      ),
      title: '1. Understand the Problem',
      description:
        'We look past superficial symptoms to understand what your business is ultimately trying to achieve, why previous attempts failed, and what operational success looks like.'
    },
    {
      id: 'engineer',
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-xs mb-6 group-hover:scale-110 transition-transform">
          <Wrench className="w-7 h-7 text-indigo-600" />
        </div>
      ),
      title: '2. Engineer the Solution',
      description:
        'We design and build clean, reliable software, database architectures, and automated triggers. We build the exact system your workflow requires—no unnecessary bloat.'
    },
    {
      id: 'optimize',
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs mb-6 group-hover:scale-110 transition-transform">
          <TrendingUp className="w-7 h-7 text-sky-600" />
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

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-blue-600 selection:text-white scroll-smooth">

      {/* 🚀 1. HERO BANNER - PURE WHITE WITH PARALLAX */}
      <header id="home" className="relative bg-white text-slate-900 pt-10 pb-16 sm:pb-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="pt-8 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Hero Text with Parallax Scale */}
            <motion.div style={{ opacity: heroOpacity }} className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-5 shadow-xs"
              >

                <span>VEEGO PHILOSOPHY &amp; MISSION</span>
              </motion.div>

              {/* High Contrast Stylish Display Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-Space Grotesk text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-slate-950 mb-5 leading-[1.08]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="text-slate-950 block sm:inline font-extrabold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Problems Out -
                </span>{' '}
                <span className="text-blue-600 font-extrabold block sm:inline" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Solution In.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-xl text-slate-600 max-w-xl leading-relaxed mb-8 font-normal"
              >
                Every business works differently. VeeGo starts by understanding your exact daily workflow and bottlenecks — then engineers software, database architectures, and automated tools tailored to your goals.
              </motion.p>

              {/* Breadcrumb & Action CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 text-sm font-medium"
              >
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm transition-all shadow-xl shadow-blue-500/25 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
                >
                  <span>Discuss Your Operational Problem</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => onNavigate('/courses')}
                  className="px-6 py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <span>Explore Courses</span>
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right Hero Parallax Graphic Card */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <motion.div
                style={{ y: heroY }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative max-w-md w-full"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-200/90 bg-white p-2.5">
                  <img
                    src={heroTeamImg}
                    alt="VeeGo Systems Software Engineering Team"
                    className="w-full h-auto rounded-2xl object-cover shadow-sm hover:scale-102 transition-transform duration-500"
                  />

                  {/* Floating Overlay Badge in Clean Pure White */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/90 flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                        V
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 tracking-tight">
                          VEEGO SYSTEMS CORE
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Understand · Build · Grow
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

      </header>

      {/* ✨ ARCHITECTURAL SECTION DIVIDER */}
      <WaveDivider fromColor="#ffffff" toColor="#f1f5f9" type="curve-1" />

      {/* 🎨 2. MIDDLE SECTION - STORYTELLING & SYSTEMS EXPERTS (LIGHT SLATE SURFACE) */}
      <section className="py-12 sm:py-16 bg-[#f1f5f9] text-slate-900 relative z-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase mb-3 block"
            >
              Our Engineering &amp; Problem-Solving Philosophy
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-4 font-display"
            >
              We Turn Complex Problems <br className="hidden sm:block" />
              into Scalable Systems
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              We analyze your challenges, engineer custom software solutions, and empower your business to scale effortlessly.
            </motion.p>
          </div>

          {/* Content Layout: 3D VR Character Parallax Left + 3 Feature Cards Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Column: 3D VR Graphic */}
            <div className="lg:col-span-4 flex justify-center">
              <motion.div
                style={{ y: vrY, rotate: vrRotate }}
                className="relative w-full max-w-sm"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-200/90 bg-white p-2">
                  <img
                    src="/images/anidio_vr.jpg"
                    alt="VeeGo Creative Engineering VR Character"
                    className="w-full h-auto rounded-2xl object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column: 3 VeeGo Framework Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {veegoFramework.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {service.icon}
                    <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors font-display">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </section>

      {/* ✨ ARCHITECTURAL SECTION DIVIDER */}
      <WaveDivider fromColor="#f1f5f9" toColor="#ffffff" type="curve-2" />

      {/* 3. CORE SERVICES SECTION (REAL ENGINEERING · HAND-CRAFTED SYSTEMS) */}
      <div id="services">
        <ServicesSection
          onNavigate={onNavigate}
          onRequestService={handleRequestService}
        />
      </div>

      {/* ✨ ARCHITECTURAL SECTION DIVIDER */}
      <WaveDivider fromColor="#ffffff" toColor="#f1f5f9" type="curve-1" />

      {/* 5. ENGINEERING STANDARD: TECHNOLOGY IS ONLY USEFUL WHEN IT SOLVES SOMETHING */}
      <div id="connection">
        <DifferenceAndEcosystemSection />
      </div>

      {/* ✨ ARCHITECTURAL SECTION DIVIDER */}
      <WaveDivider fromColor="#f1f5f9" toColor="#ffffff" type="curve-2" />

      {/* 6. THE TWO MAIN SIDES OF VEEGO (BUSINESS SOLUTIONS & PRODUCTION SOFTWARE PROJECTS) */}
      <div id="pathways">
        <TwoWaysSection
          onExploreSolutions={() => onNavigate('/courses')}
          onSubmitProblem={() => scrollToSection('contact')}
          onRequestCustomSoftware={() => scrollToSection('contact')}
          onViewProjects={() => onNavigate('/projects')}
        />
      </div>

      {/* ✨ ARCHITECTURAL SECTION DIVIDER */}
      <WaveDivider fromColor="#ffffff" toColor="#f1f5f9" type="curve-1" />

      {/* 7. HOW IT WORKS (UNDERSTAND · BUILD · GROW) */}
      <div id="how-it-works" className="scroll-mt-16">
        <HowItWorksSection
          onStartDiscovery={() => scrollToSection('contact')}
        />
      </div>

      {/* ✨ ARCHITECTURAL SECTION DIVIDER */}
      <WaveDivider fromColor="#f1f5f9" toColor="#ffffff" type="curve-2" />

      {/* ✉️ 9. DIRECT CONSULTATION FORM - "WHAT IS YOUR BUSINESS PROBLEM?" */}
      <section id="contact" className="relative py-12 sm:py-16 bg-white scroll-mt-16 overflow-hidden text-slate-900">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            style={{ y: contactY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 sm:p-12 bg-white border border-slate-200/90 shadow-2xl shadow-blue-500/10 relative overflow-hidden text-slate-900"
          >
            {/* Top Blue Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />

            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-wider text-blue-700 font-bold px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 mb-3 inline-flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Direct Engineering Access
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                What problem are you trying to <span className="text-blue-600 font-extrabold">solve today?</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Describe the manual routine taking too much time, costing money, or causing operational mistakes. Our systems engineers will review your workflow and outline the right technical solution.
              </p>

              {/* Quick suggestion problem tags */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {[
                  'Staff attendance & GPS tracking',
                  'Automated billing & GST invoicing',
                  'Inbound lead follow-up CRM',
                  'Google Sheets auto sync'
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setUserProblem(`Requirement: ${tag}. Please connect with us to discuss architectural scope.`)}
                    className="text-[11px] px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-medium transition-all cursor-pointer"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-blue-50 border border-blue-200 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Problem Received — Engineering Review in Progress
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-5 font-medium leading-relaxed">
                  A VeeGo systems engineer will review your problem statement and reach out with a concrete workflow solution within 8 hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setUserProblem('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-xs"
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
                    className="w-full text-xs sm:text-sm p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all shadow-2xs"
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
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white shadow-2xs"
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
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white shadow-2xs"
                    />
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Strict confidentiality. No aggressive sales calls, no spam.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Request Engineering Solution</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

      </section>

      {/* ✨ ARCHITECTURAL SECTION DIVIDER */}
      <WaveDivider fromColor="#ffffff" toColor="#f1f5f9" type="curve-1" />

      {/* 10. WHY VEEGO PRINCIPLES & FINAL BOTTOM CALL TO ACTION */}
      <div id="about" className="scroll-mt-16">
        <WhyVeeGoAndCTA
          onSolveBusinessProblem={() => scrollToSection('contact')}
        />
      </div>

    </div>
  );
};
