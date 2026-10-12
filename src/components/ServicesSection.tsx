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
    <section id="services" className="py-16 sm:py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-slate-900 mb-4">
            <span className="tracking-wider uppercase">REAL ENGINEERING · HAND-CRAFTED SYSTEMS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-tight">
            Engineering Solutions Built by Humans, <br className="hidden sm:inline" />
            <span className="text-blue-600">for Real Operations</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            No cookie-cutter templates or aggressive sales pitches. We analyze your actual daily workflows, write clean production code, and deliver systems that solve your exact friction points.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Solutions' },
              { id: 'automation', label: 'Business Automation' },
              { id: 'projects', label: 'Software Projects' },
              { id: 'web', label: 'Web Applications' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeTab === tab.id
                    ? 'bg-slate-900 text-white border border-slate-900'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 3 Services Cards in Pure White with Clean Hairline Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="wait">
            {filteredServices.map((svc, idx) => {
              const IconComponent = svc.icon;

              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="rounded-[4px] p-7 bg-white border border-slate-200 hover:border-slate-900 transition-colors flex flex-col justify-between"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-10 h-10 rounded-[4px] bg-slate-100 border border-slate-300 text-slate-900 flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>

                      <div className="flex items-center gap-2">
                        {svc.popular && (
                          <span className="bg-slate-900 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span>Popular</span>
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] border border-slate-300 bg-slate-100 text-slate-800 uppercase tracking-wider">
                          {svc.badge}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-950 tracking-tight mb-2 group-hover:text-blue-600 transition-colors min-h-[56px] flex items-center">
                      {svc.title}
                    </h3>

                    {/* Impact Stat Badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-700 bg-slate-50 px-2.5 py-1 rounded-[4px] mb-3 border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{svc.impactStat}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal min-h-[52px] flex items-center">
                      {svc.description}
                    </p>

                    {/* Features List */}
                    <div className="pt-4 border-t border-slate-200 mb-6 space-y-2.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center justify-between">
                        <span>Deliverables</span>
                        <span className="text-blue-700 font-bold">{svc.priceTag}</span>
                      </div>
                      {svc.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 border-t border-slate-200">
                    <button
                      onClick={svc.primaryAction}
                      className="w-full py-3 px-4 rounded-[4px] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white border border-blue-600"
                    >
                      <span>{svc.primaryCta}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Banner: Direct Engineering Access */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 sm:p-8 rounded-[4px] bg-slate-50 border border-slate-300 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-11 h-11 rounded-[4px] bg-slate-900 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-0.5">
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
            className="w-full md:w-auto px-6 py-3 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer shrink-0 border border-blue-600"
          >
            <span>Consult With Engineers</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
