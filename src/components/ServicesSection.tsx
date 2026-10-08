import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

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
      tagline: 'Eliminate manual friction & reclaim lost operational hours',
      description:
        'We visit your workplace, map your daily bottlenecks, and build custom zero-touch automated workflows that connect your spreadsheets, WhatsApp notifications, staff attendance, and billing automatically.',
      priceTag: 'Custom Workflow Audit',
      priceSubtext: 'Built for growing small & medium businesses',
      features: [
        'Staff shift tracking & automated attendance reports',
        'Auto invoicing, billing & payment reminder pipelines',
        'WhatsApp & email transactional notifications',
        'Google Sheets & database two-way synchronization',
        'Custom CRM & lead management automation'
      ],
      impactStat: '3.5 Hours Saved Daily',
      primaryCta: 'Explore Automation Solutions',
      primaryAction: () => onNavigate('/solutions'),
      secondaryCta: 'Request Workflow Audit',
      secondaryAction: () => {
        if (onRequestService) {
          onRequestService('Business Automation');
        } else {
          onNavigate('/contact');
        }
      }
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
      title: 'Production & College Projects',
      tagline: 'End-to-end engineered software with full documentation & live hosting',
      description:
        'Complete engineering systems built with production-grade architecture. Includes fully documented clean source code, system design diagrams, live cloud deployment links, and 1-on-1 code walkthroughs.',
      priceTag: 'Starting from ₹2,000',
      priceSubtext: 'Full source code, project report & live hosting',
      popular: true,
      features: [
        'Complete frontend, backend & database source code',
        'Live cloud deployment link for presentation & testing',
        'System architecture diagrams & documentation',
        'Project report, PPT & technical synopsis materials',
        '1-on-1 code walkthrough & architecture explanation'
      ],
      impactStat: '100% Production Ready',
      primaryCta: 'Browse Built Projects',
      primaryAction: () => onNavigate('/projects'),
      secondaryCta: 'Discuss Custom Project',
      secondaryAction: () => {
        if (onRequestService) {
          onRequestService('College & Custom Software Projects');
        } else {
          onNavigate('/contact');
        }
      }
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
      tagline: 'High-converting business platforms & custom SaaS web applications',
      description:
        'From high-converting modern business websites to complex multi-tenant SaaS web applications, customer portals, and administrative dashboards engineered for high performance, security, and scale.',
      priceTag: 'Tailored Architecture',
      priceSubtext: 'Fast delivery & responsive UI/UX',
      features: [
        'Modern Responsive Websites & Interactive Web Portals',
        'Custom Web Applications with Auth & Role Controls',
        'Interactive Admin Dashboards & Live KPI Tracking',
        'Database Design, REST APIs & Cloud Infrastructure',
        'SEO Optimization, Blazing Performance & Security'
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
      secondaryCta: 'View Live Case Studies',
      secondaryAction: () => onNavigate('/projects')
    }
  ];

  const filteredServices = activeTab === 'all' ? services : services.filter(s => s.category === activeTab);

  return (
    <section id="services" className="py-20 sm:py-32 bg-stylish-mesh bg-stylish-grid border-b border-slate-200/80 text-slate-900 scroll-mt-16 relative overflow-hidden">
      {/* 🔮 PARALLAX FLOATING BACKGROUND OBJECTS & GLOW ORBS */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 8, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 right-10 w-[450px] h-[450px] bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-purple-500/15 rounded-full blur-3xl pointer-events-none -z-0"
      />
      <motion.div
        animate={{
          y: [0, 35, 0],
          rotate: [0, -10, 0],
          scale: [1, 1.12, 1]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-16 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-blue-500/15 rounded-full blur-3xl pointer-events-none -z-0"
      />

      {/* Floating Animated Technical Icons in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0 opacity-20 bg-dot-pattern">
        <motion.div
          animate={{ y: [0, -40, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 left-[8%] text-blue-500"
        >
          <Cpu className="w-14 h-14" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 35, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-48 right-[10%] text-indigo-500"
        >
          <Workflow className="w-16 h-16" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-32 left-[15%] text-emerald-500"
        >
          <Code2 className="w-12 h-12" />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header with Human Touch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 text-xs font-bold text-blue-700 mb-4 shadow-xs">
            <Sparkle className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
            <span className="tracking-wider uppercase">REAL ENGINEERING · HAND-CRAFTED SYSTEMS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Engineering Solutions Built by Humans, <br className="hidden sm:inline" />
            <span className="text-blue-600 font-extrabold">for Real Operations</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
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
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105 border border-slate-800'
                    : 'bg-white/90 text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
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
              const isExpanded = expandedCard === svc.id;

              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-3xl p-7 sm:p-8 glass-card border-2 border-slate-200/90 hover:border-blue-500/60 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Card Glow Effect */}
                  <div
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: svc.glowColor }}
                  />

                  {/* Popular Badge */}
                  {svc.popular && (
                    <div className="absolute top-4 right-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5 animate-pulse">
                      <Sparkles className="w-3 h-3" />
                      <span>Popular</span>
                    </div>
                  )}

                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center shadow-md shrink-0 transition-transform group-hover:scale-110 duration-300">
                        <IconComponent className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${svc.badgeColor} uppercase tracking-wider`}>
                        {svc.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                      {svc.title}
                    </h3>

                    {/* Impact Stat Badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-md mb-4 border border-slate-200/60">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{svc.impactStat}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {svc.description}
                    </p>

                    {/* Features List */}
                    <div className="pt-4 border-t border-slate-100 mb-6 space-y-2.5">
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center justify-between">
                        <span>Core Deliverables</span>
                        <span className="text-blue-600 font-semibold">{svc.priceTag}</span>
                      </div>
                      {svc.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 border-t border-slate-100 space-y-2">
                    <button
                      onClick={svc.primaryAction}
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-between group/btn cursor-pointer"
                    >
                      <span>{svc.primaryCta}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>

                    <button
                      onClick={svc.secondaryAction}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{svc.secondaryCta}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
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
          className="mt-16 rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-block text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-1">
                Direct Human Commitment
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                No Sales Representatives. You Speak Directly With Building Engineers.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                We believe in transparent engineering. From initial problem consultation to post-deployment support, you work directly with the developers writing your system code.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/contact')}
            className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-blue-50 font-bold text-sm transition-all shadow-lg whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Consult With Engineers</span>
            <ArrowRight className="w-4 h-4 text-slate-900" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
