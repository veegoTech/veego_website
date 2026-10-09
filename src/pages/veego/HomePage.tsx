import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Search,
  Wrench,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Rocket,
  X,
  Send,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building2,
  Layers,
  Star,
  Cpu,
  Clock,
  Bot,
  Globe,
  Workflow
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

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.4]);
  const vrY = useTransform(scrollYProgress, [0.1, 0.5], [60, -40]);
  const vrRotate = useTransform(scrollYProgress, [0.1, 0.5], [-3, 3]);
  const bgOrb1Y = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const bgOrb2Y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contactY = useTransform(scrollYProgress, [0.65, 0.95], [40, -20]);
  const contactOrbY = useTransform(scrollYProgress, [0.5, 1], [-70, 70]);

  // Consultation form state
  const [userProblem, setUserProblem] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const stats = [
    { value: '50+', label: 'Custom Systems Built' },
    { value: '100%', label: 'Direct Engineer Access' },
    { value: '99.9%', label: 'Operational Uptime' },
    { value: '24/7', label: 'Automated Workflows' }
  ];

  const veegoFramework = [
    {
      id: 'understand',
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-lg mb-6 group-hover:scale-110 transition-transform">
          <Search className="w-7 h-7 text-purple-300" />
        </div>
      ),
      title: '1. Understand the Problem',
      description:
        'We look past superficial symptoms to understand what your business is ultimately trying to achieve, why previous attempts failed, and what operational success looks like.'
    },
    {
      id: 'engineer',
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-lg mb-6 group-hover:scale-110 transition-transform">
          <Wrench className="w-7 h-7 text-indigo-300" />
        </div>
      ),
      title: '2. Engineer the Solution',
      description:
        'We design and build clean, reliable software, database architectures, and automated triggers. We build the exact system your workflow requires—no unnecessary bloat.'
    },
    {
      id: 'optimize',
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300 shadow-lg mb-6 group-hover:scale-110 transition-transform">
          <TrendingUp className="w-7 h-7 text-pink-300" />
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
    <div className="min-h-screen bg-[#0d041a] font-sans text-slate-100 overflow-x-hidden selection:bg-purple-600 selection:text-white scroll-smooth">

      {/* 🚀 1. HERO BANNER - ANIDIO COSMIC PARALLAX PATTERN */}
      <header id="home" className="relative bg-gradient-to-b from-[#0e0422] via-[#1a0736] to-[#120529] text-white pt-10 pb-24 overflow-hidden">
        {/* Parallax Floating Glowing Orbs & Star Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{ y: bgOrb1Y }}
            className="absolute top-[-10%] right-[10%] w-[550px] h-[550px] rounded-full bg-purple-600/25 blur-[130px]"
          />
          <motion.div
            style={{ y: bgOrb2Y }}
            className="absolute bottom-[0%] left-[5%] w-[450px] h-[450px] rounded-full bg-pink-500/20 blur-[110px]"
          />

          {/* Animated Particle Stars */}
          {[...Array(28)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                top: `${(i * 17) % 90}%`,
                left: `${(i * 23) % 95}%`,
                width: `${(i % 3) + 2}px`,
                height: `${(i % 3) + 2}px`,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="pt-8 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Hero Text with Parallax Scale */}
            <motion.div style={{ opacity: heroOpacity }} className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs font-semibold text-purple-200 mb-5 shadow-lg"
              >

                <span>VEEGO PHILOSOPHY &amp; MISSION</span>
              </motion.div>

              {/* High Contrast Stylish Display Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-Space Grotesk text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-white mb-5 leading-[1.08]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="text-white block sm:inline font-extrabold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Problems Out -
                </span>{' '}
                <span className="text-purple-300 font-extrabold block sm:inline" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Solution In.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-xl text-purple-100/90 max-w-xl leading-relaxed mb-8 font-normal"
              >
                Every business works differently. VeeGo starts by understanding your exact daily workflow and bottlenecks — then engineers software, database architectures, and automated tools tailored to your goals.
              </motion.p>

              {/* Breadcrumb & Action CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 text-sm font-medium text-purple-200"
              >
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm transition-all shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
                >
                  <span>Discuss Your Operational Problem</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => onNavigate('/courses')}
                  className="px-6 py-3.5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Courses</span>
                  <ChevronRight className="w-4 h-4 text-purple-300" />
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
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 backdrop-blur-xs p-2.5">
                  <img
                    src={heroTeamImg}
                    alt="VeeGo Systems Software Engineering Team"
                    className="w-full h-auto rounded-2xl object-cover shadow-lg hover:scale-102 transition-transform duration-500"
                  />

                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-5 left-5 right-5 bg-[#180833]/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black">
                        V
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white tracking-tight">
                          VEEGO SYSTEMS CORE
                        </div>
                        <div className="text-[10px] text-purple-200/80">
                          Understand · Build · Grow
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* 🌊 REDESIGNED DUAL-LAYER SVG WAVE DIVIDER */}
        <div className="absolute bottom-0 -left-1 -right-1 w-[calc(100%+8px)] overflow-hidden leading-none z-20 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#120529] fill-current"
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
      </header>

      {/* 🎨 2. MIDDLE SECTION - STORYTELLING & SYSTEMS EXPERTS (ANIDIO PATTERN WITH PARALLAX) */}
      <section className="py-24 pb-32 bg-[#120529] text-white relative z-20 overflow-hidden">
        {/* Animated Particle Stars Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
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

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm font-bold tracking-wider text-purple-300 uppercase mb-3 block"
            >
              Our Engineering &amp; Problem-Solving Philosophy
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4 font-display"
            >
              We Turn Complex Problems <br className="hidden sm:block" />
              into Scalable Systems
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-purple-200/80 max-w-2xl mx-auto leading-relaxed"
            >
              We analyze your challenges, engineer custom software solutions, and empower your business to scale effortlessly.
            </motion.p>
          </div>

          {/* Content Layout: 3D VR Character Parallax Left + 3 Feature Cards Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Column: 3D VR Levitating Character Parallax Graphic */}
            <div className="lg:col-span-4 flex justify-center">
              <motion.div
                style={{ y: vrY, rotate: vrRotate }}
                className="relative w-full max-w-sm"
              >
                {/* Soft purple ambient glow */}
                <div className="absolute inset-0 bg-purple-600/25 rounded-full blur-2xl transform scale-95" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md p-2">
                  <img
                    src="/images/anidio_vr.jpg"
                    alt="VeeGo Creative Engineering VR Character"
                    className="w-full h-auto rounded-2xl object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column: 3 VeeGo Framework Glassmorphism Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {veegoFramework.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-400/40 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {service.icon}
                    <h3 className="text-xl font-extrabold text-white mb-3 group-hover:text-purple-300 transition-colors font-display">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

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

      {/* 3. CORE SERVICES SECTION (REAL ENGINEERING · HAND-CRAFTED SYSTEMS) */}
      <div id="services">
        <ServicesSection
          onNavigate={onNavigate}
          onRequestService={handleRequestService}
        />
      </div>

      {/* 5. ENGINEERING STANDARD: TECHNOLOGY IS ONLY USEFUL WHEN IT SOLVES SOMETHING */}
      <div id="connection">
        <DifferenceAndEcosystemSection />
      </div>

      {/* 6. THE TWO MAIN SIDES OF VEEGO (BUSINESS SOLUTIONS & PRODUCTION SOFTWARE PROJECTS) */}
      <div id="pathways">
        <TwoWaysSection
          onExploreSolutions={() => onNavigate('/courses')}
          onSubmitProblem={() => scrollToSection('contact')}
          onRequestCustomSoftware={() => scrollToSection('contact')}
          onViewProjects={() => onNavigate('/projects')}
        />
      </div>

      {/* 7. HOW IT WORKS (UNDERSTAND · BUILD · GROW) */}
      <div id="how-it-works" className="scroll-mt-16">
        <HowItWorksSection
          onStartDiscovery={() => scrollToSection('contact')}
        />
      </div>

      {/* ✉️ 9. DIRECT CONSULTATION FORM - "WHAT IS YOUR BUSINESS PROBLEM?" */}
      <section id="contact" className="relative py-20 sm:py-32 bg-[#16082e] scroll-mt-16 overflow-hidden text-white">

        {/* Ambient background parallax orbs & star particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            style={{ y: contactOrbY }}
            className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-[130px]"
          />
          <motion.div
            style={{ y: contactOrbY }}
            className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-pink-500/20 rounded-full blur-[110px]"
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
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            style={{ y: contactY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 sm:p-12 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden text-white"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />

            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-wider text-purple-300 font-bold px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 mb-3 inline-flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-300" />
                Direct Engineering Access
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                What problem are you trying to <span className="text-purple-300 font-extrabold">solve today?</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-purple-200/80 leading-relaxed font-normal">
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
                    className="text-[11px] px-3 py-1 rounded-full bg-white/10 hover:bg-purple-500/30 hover:text-white border border-white/10 hover:border-purple-400/40 font-medium text-purple-200 transition-all cursor-pointer"
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
                className="p-8 rounded-2xl bg-purple-500/20 border border-purple-400/40 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-purple-300 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Problem Received — Engineering Review in Progress
                </h3>
                <p className="text-xs sm:text-sm text-purple-200 max-w-md mx-auto mb-5 font-medium leading-relaxed">
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
                  <label htmlFor="hp-problem" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5 flex items-center justify-between">
                    <span>Describe Your Operational Bottleneck:</span>
                    <span className="text-[10px] text-purple-300/70 font-normal">Real-world operational detail is welcomed</span>
                  </label>
                  <textarea
                    id="hp-problem"
                    required
                    rows={4}
                    value={userProblem}
                    onChange={(e) => setUserProblem(e.target.value)}
                    placeholder="e.g. Our field staff record daily visits on WhatsApp and paper sheets. Management has zero real-time visibility..."
                    className="w-full text-xs sm:text-sm p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:bg-white/10 transition-all shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hp-email" className="block text-xs font-bold text-purple-200 mb-1.5">
                      Your Work Email:
                    </label>
                    <input
                      id="hp-email"
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:bg-white/10 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="hp-phone" className="block text-xs font-bold text-purple-200 mb-1.5">
                      Phone / WhatsApp (Optional):
                    </label>
                    <input
                      id="hp-phone"
                      type="tel"
                      maxLength={10}
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:bg-white/10 shadow-2xs"
                    />
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-purple-200/70 font-medium">
                    <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Strict confidentiality. No aggressive sales calls, no spam.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Request Engineering Solution</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* 🌊 SVG WAVE DIVIDER AT BOTTOM OF CONTACT SECTION */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#1e0a3c] fill-current preserve-3d scale-x-[-1]"
          >
            <path d="M0,32 C280,90 560,90 840,40 C1120,-10 1280,50 1440,65 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* 10. WHY VEEGO PRINCIPLES & FINAL BOTTOM CALL TO ACTION */}
      <div id="about" className="scroll-mt-16">
        <WhyVeeGoAndCTA
          onSolveBusinessProblem={() => scrollToSection('contact')}
        />
      </div>

    </div>
  );
};
