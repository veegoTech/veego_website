import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Zap,
  FolderGit2,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Bot,
  ShieldCheck,
  ChevronRight,
  Cpu,
  Layers,
  Code2,
  Workflow,
  Clock,
  Sparkle
} from 'lucide-react';

interface ServicesSectionProps {
  onNavigate: (path: string) => void;
  onRequestService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigate,
  onRequestService
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'automation' | 'projects' | 'web'>('all');

  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll();
  const bgOrbY = useTransform(scrollYProgress, [0.1, 0.6], [-60, 60]);

  const services = [
    {
      id: 'business-automation',
      category: 'automation',
      badge: 'Operational Efficiency',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
      accentColor: 'blue',
      glowColor: 'rgba(37, 99, 235, 0.15)',
      gradient: 'from-blue-600 via-indigo-600 to-blue-700',
      icon: Bot,
      title: 'Business Automation & Workflows',
      tagline: 'Eliminate manual friction & reclaim operational hours',
      description:
        'Zero-touch automated workflows connecting your spreadsheets, WhatsApp notifications, staff attendance, and billing automatically.',
      priceTag: 'Custom Audit',
      features: [
        'Staff shift tracking & automated attendance',
        'Auto invoicing, billing & WhatsApp notifications',
        'Google Sheets & database 2-way sync'
      ],
      impactStat: '3.5 Hours Saved Daily',
      primaryCta: 'Explore Applied Courses',
      primaryAction: () => onNavigate('/courses'),
    },
    {
      id: 'college-projects',
      category: 'projects',
      badge: 'Software Architecture',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      accentColor: 'emerald',
      glowColor: 'rgba(16, 185, 129, 0.15)',
      gradient: 'from-emerald-600 via-teal-600 to-emerald-700',
      icon: FolderGit2,
      title: 'Production & Software Projects',
      tagline: 'End-to-end engineered software with live cloud hosting',
      description:
        'Complete engineering systems built with clean code, system architecture diagrams, live cloud links, and 1-on-1 walkthroughs.',
      priceTag: 'Starting ₹2,000',
      popular: true,
      features: [
        'Complete frontend, backend & database source code',
        'Live cloud deployment link & system diagrams',
        '1-on-1 code walkthrough & viva coaching'
      ],
      impactStat: '100% Production Ready',
      primaryCta: 'Browse Built Projects',
      primaryAction: () => onNavigate('/projects'),
    },
    {
      id: 'web-services',
      category: 'web',
      badge: 'Full-Stack Engineering',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/80',
      accentColor: 'purple',
      glowColor: 'rgba(147, 51, 234, 0.15)',
      gradient: 'from-purple-600 via-indigo-600 to-purple-700',
      icon: Globe,
      title: 'Web Applications & Portals',
      tagline: 'Modern business platforms & custom SaaS web applications',
      description:
        'Modern business websites, multi-tenant SaaS web applications, customer portals, and admin dashboards engineered for performance.',
      priceTag: 'Tailored Architecture',
      features: [
        'Responsive websites & interactive customer portals',
        'Custom SaaS web apps & admin dashboards',
        'Database design, REST APIs & cloud infrastructure'
      ],
      impactStat: '99.9% Uptime Guarantee',
      primaryCta: 'Discuss Web Project',
      primaryAction: () => {
        if (onRequestService) {
          onRequestService('Web Services (Website / Web App)');
        } else {
          onNavigate('/contact');
        }
      },
    }
  ];

  const filteredServices = activeTab === 'all' ? services : services.filter(s => s.category === activeTab);

  return (
    <section id="services" className="py-24 pb-32 bg-[#0e0422] text-white scroll-mt-16 relative overflow-hidden">

      {/* 🔮 PARALLAX FLOATING BACKGROUND OBJECTS, STAR PARTICLES & GLOW ORBS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          style={{ y: bgOrbY }}
          className="absolute top-12 right-10 w-[480px] h-[480px] bg-gradient-to-br from-purple-600/25 via-pink-500/15 to-indigo-500/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: bgOrbY }}
          className="absolute bottom-16 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/25 via-purple-600/15 to-pink-500/20 rounded-full blur-3xl"
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs font-bold text-purple-300 mb-4 shadow-xs">

            <span className="tracking-wider uppercase">REAL ENGINEERING · HAND-CRAFTED SYSTEMS</span>
          </div>

          <h2
            className="font-space text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Engineering Solutions Built by Humans, <br className="hidden sm:inline" />
            <span className="text-purple-300 font-extrabold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>for Real Operations</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-purple-200/80 leading-relaxed font-normal">
            No cookie-cutter templates or aggressive sales pitches. We analyze your actual daily workflows, write clean production code, and deliver systems that solve your exact friction points.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {[
              { id: 'all', label: 'All Solutions' },
              { id: 'automation', label: '⚡ Business Automation' },
              { id: 'projects', label: '🎓 Software Projects' },
              { id: 'web', label: '🌐 Web Applications' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105 border border-blue-400/40'
                    : 'bg-white/5 text-purple-200 border border-white/10 hover:border-blue-400/30 hover:bg-white/10'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 3 Services Cards with Motion & Parallax Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence mode="wait">
            {filteredServices.map((svc, idx) => {
              const IconComponent = svc.icon;

              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-3xl p-7 bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-400/40 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden text-white"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 text-purple-300 flex items-center justify-center shadow-md shrink-0 transition-transform group-hover:scale-110 duration-300">
                        <IconComponent className="w-6 h-6 text-purple-300" />
                      </div>

                      <div className="flex items-center gap-2">
                        {svc.popular && (
                          <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Popular</span>
                          </span>
                        )}
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 uppercase tracking-wider">
                          {svc.badge}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-purple-300 transition-colors min-h-[56px] flex items-center"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {svc.title}
                    </h3>

                    {/* Impact Stat Badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-200 bg-white/10 px-2.5 py-1 rounded-md mb-3 border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-purple-300" />
                      <span>{svc.impactStat}</span>
                    </div>

                    <p
                      className="text-xs sm:text-sm text-purple-200/90 leading-relaxed mb-5 font-normal min-h-[52px] flex items-center"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {svc.description}
                    </p>

                    {/* Features List */}
                    <div className="pt-3.5 border-t border-white/10 mb-5 space-y-2.5">
                      <div className="text-[11px] uppercase tracking-wider text-purple-300/80 font-bold mb-2 flex items-center justify-between">
                        <span>Deliverables</span>
                        <span className="text-purple-300 font-semibold">{svc.priceTag}</span>
                      </div>
                      {svc.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-purple-100 font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Single Clean CTA Action */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={svc.primaryAction}
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-between group/btn cursor-pointer"
                    >
                      <span>{svc.primaryCta}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 🤝 Human Guarantee Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="inline-block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1">
                Direct Human Commitment
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                No Sales Representatives. You Speak Directly With Building Engineers.
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/80 mt-1 max-w-2xl leading-relaxed">
                We believe in transparent engineering. From initial problem consultation to post-deployment support, you work directly with the developers writing your system code.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/contact')}
            className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer shrink-0 hover:scale-105"
          >
            <span>Consult With Engineers</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </motion.div>
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
    </section>
  );
};
