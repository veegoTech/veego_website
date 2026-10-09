import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Cpu
} from 'lucide-react';
import heroTeamImg from '../../assets/hero_team.jpg';

interface AnidioLandingPageProps {
  onNavigate?: (path: string) => void;
}

export const AnidioLandingPage: React.FC<AnidioLandingPageProps> = ({ onNavigate }) => {
  const [activeNav, setActiveNav] = useState('About Us');
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // Problem Consultation form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [problemCategory, setProblemCategory] = useState('Staff & Attendance');
  const [problemDetails, setProblemDetails] = useState('');

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Projects', path: '/projects' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Contact', path: '/contact' }
  ];

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

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSubmitted(true);
    setTimeout(() => {
      setConsultSubmitted(false);
      setIsConsultModalOpen(false);
      setClientName('');
      setClientEmail('');
      setProblemDetails('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0f051d] font-sans text-slate-100 overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* 🚀 TOP HERO BANNER (DEEP PURPLE COSMIC DARK THEME) */}
      <header className="relative bg-gradient-to-br from-[#16072b] via-[#2a0b52] to-[#3e0f6e] text-white pt-6 pb-28 overflow-hidden">
        {/* Subtle Background Glowing Elements & Particle Stars */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
          <div className="absolute bottom-[0%] left-[5%] w-[400px] h-[400px] rounded-full bg-pink-500/15 blur-[100px]" />

          {/* Animated Stars */}
          {[...Array(24)].map((_, i) => (
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
          {/* HERO BANNER CONTENT */}
          <div className="pt-14 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-purple-200 mb-4"
              >

                <span>VEEGO PHILOSOPHY &amp; MISSION</span>
              </motion.div>

              {/* High-Contrast Solid Typography (No Text Gradient) */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight"
              >
                We Go Through Your Problem.{' '}
                <span className="text-purple-200 block sm:inline">
                  We Give You the Solution.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-lg text-purple-100 max-w-xl leading-relaxed mb-6 font-normal"
              >
                Every business works differently. VeeGo starts by understanding your exact daily workflow and bottlenecks — then engineers software, database architectures, and automated tools tailored to your goals.
              </motion.p>

              {/* Breadcrumb & Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 text-sm font-medium text-purple-200"
              >
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl">
                  <span
                    onClick={() => onNavigate && onNavigate('/')}
                    className="hover:text-white cursor-pointer transition-colors text-xs font-semibold"
                  >
                    Home
                  </span>
                  <span className="text-purple-300">→</span>
                  <span className="text-white font-bold text-xs">About Us</span>
                </div>

                <button
                  onClick={() => setIsConsultModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <span>Request Engineering Consultation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

            {/* Right Hero Graphic - 3D Astronaut Riding Rocket */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
                transition={{
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="relative max-w-md w-full"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 backdrop-blur-xs p-2">
                  <img
                    src={heroTeamImg}
                    alt="VeeGo Systems Software Engineering Team"
                    className="w-full h-auto rounded-2xl object-cover shadow-lg"
                  />
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

      {/* 🎨 MIDDLE SECTION - DARK THEME BACKGROUND */}
      <section className="py-20 bg-[#16082e] text-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4"
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

          {/* Content Layout: 3D VR Character Left + 3 Feature Cards Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: 3D VR Levitating Character Graphic */}
            <div className="lg:col-span-4 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full max-w-sm"
              >
                {/* Soft purple glow backdrop circle */}
                <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-2xl transform scale-90" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md p-2">
                  <img
                    src="/images/anidio_vr.jpg"
                    alt="VeeGo Creative Engineering VR Character"
                    className="w-full h-auto rounded-2xl object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column: 3 Dark Glassmorphism Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {veegoFramework.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-400/40 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {service.icon}
                    <h3 className="text-xl font-extrabold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ✉️ CONSULTATION MODAL FOR VEEGO PROBLEMS */}
      <AnimatePresence>
        {isConsultModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#180933] text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-purple-500/30 overflow-hidden"
            >
              <button
                onClick={() => setIsConsultModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 text-purple-300 flex items-center justify-center mb-3">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">Discuss Your Operational Bottleneck</h3>
                <p className="text-xs text-purple-200/80 mt-1">Tell VeeGo engineers what manual routine is slowing down your business.</p>
              </div>

              {consultSubmitted ? (
                <div className="py-8 text-center bg-purple-500/20 rounded-2xl border border-purple-400/40">
                  <CheckCircle2 className="w-12 h-12 text-purple-300 mx-auto mb-3 animate-bounce" />
                  <h4 className="text-lg font-bold text-white mb-1">Problem Statement Received!</h4>
                  <p className="text-xs text-purple-200">A VeeGo systems engineer will review your workflow and contact you within 8 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-1">
                      Your Name / Business Name
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Alex Rivera (Operations Head)"
                      className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-1">
                      Work Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-1">
                      Primary Operational Category
                    </label>
                    <select
                      value={problemCategory}
                      onChange={(e) => setProblemCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-[#1f0b42] text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    >
                      <option value="Staff & Attendance">Staff Management &amp; GPS Attendance</option>
                      <option value="Billing & Invoicing">Automated Billing &amp; GST Invoicing</option>
                      <option value="Sales & Leads">Lead Management &amp; CRM</option>
                      <option value="Custom Software">Custom Software / Database Architecture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-1">
                      Describe Your Operational Bottleneck
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={problemDetails}
                      onChange={(e) => setProblemDetails(e.target.value)}
                      placeholder="Describe the manual work, data delay, or paper process you want to solve..."
                      className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Technical Solution</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
