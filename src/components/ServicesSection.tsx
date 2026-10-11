import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Bot,
  ShieldCheck,
  Clock
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

  const services = [
    {
      id: 'business-automation',
      category: 'automation',
      badge: 'Operational Efficiency',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Bot,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
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
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: FolderGit2,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
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
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: Globe,
      iconBg: 'bg-sky-50 text-sky-600 border-sky-200',
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
    <section id="services" className="py-12 sm:py-16 bg-white text-slate-900 scroll-mt-16 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 mb-4 shadow-xs">

            <span className="tracking-wider uppercase">REAL ENGINEERING · HAND-CRAFTED SYSTEMS</span>
          </div>

          <h2
            className="font-space text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Engineering Solutions Built by Humans, <br className="hidden sm:inline" />
            <span className="text-blue-600 font-extrabold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>for Real Operations</span>
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
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105 border border-blue-500'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 shadow-2xs'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 3 Services Cards in Pure White with Blue Accents */}
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
                  whileHover={{ y: -6 }}
                  className="group relative rounded-3xl p-8 bg-white border border-slate-200/90 hover:border-blue-400 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className={`w-13 h-13 rounded-2xl ${svc.iconBg} border flex items-center justify-center shadow-xs shrink-0 transition-transform group-hover:scale-110 duration-300`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-2">
                        {svc.popular && (
                          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Popular</span>
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${svc.badgeColor}`}>
                          {svc.badge}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors min-h-[56px] flex items-center"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {svc.title}
                    </h3>

                    {/* Impact Stat Badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-3 border border-blue-200">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{svc.impactStat}</span>
                    </div>

                    <p
                      className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal min-h-[52px] flex items-center"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {svc.description}
                    </p>

                    {/* Features List */}
                    <div className="pt-4 border-t border-slate-100 mb-6 space-y-2.5">
                      <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center justify-between">
                        <span>Deliverables</span>
                        <span className="text-blue-700 font-semibold">{svc.priceTag}</span>
                      </div>
                      {svc.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-slate-700 font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={svc.primaryAction}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 group-hover:shadow-lg group-hover:shadow-blue-500/30"
                    >
                      <span>{svc.primaryCta}</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Banner: Direct Engineering Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-sky-50/50 to-white border border-blue-200/90 shadow-xl shadow-blue-500/5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-0.5">
                Transparent Engineering Model
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                No Sales Representatives. You Speak Directly With Building Engineers.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                We believe in transparent engineering. From initial problem consultation to post-deployment support, you work directly with the developers writing your system code.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/contact')}
            className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/25 whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer shrink-0 hover:scale-105"
          >
            <span>Consult With Engineers</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
