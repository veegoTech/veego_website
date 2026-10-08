import React from 'react';
import {
  Zap,
  FolderGit2,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Bot,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface ServicesSectionProps {
  onNavigate: (path: string) => void;
  onRequestService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigate,
  onRequestService
}) => {
  const services = [
    {
      id: 'business-automation',
      badge: 'Operational Efficiency',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      accentColor: 'blue',
      icon: Bot,
      title: 'Business Automation & Workflows',
      tagline: 'Eliminate manual bottlenecks & save daily work hours',
      description:
        'We design and deploy custom automated workflows that connect your daily spreadsheets, WhatsApp alerts, staff reporting, and billing into seamless zero-touch systems.',
      priceTag: 'Custom Workflow Audit',
      priceSubtext: 'Tailored for small & medium businesses',
      features: [
        'Staff shift tracking & automated attendance reports',
        'Auto invoicing, billing & payment reminder pipelines',
        'WhatsApp & email transactional notifications',
        'Google Sheets & database two-way synchronization',
        'Custom CRM & lead management automation'
      ],
      primaryCta: 'Explore Automation Solutions',
      primaryAction: () => onNavigate('/solutions'),
      secondaryCta: 'Request Custom Automation',
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
      badge: 'Software Architecture',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      accentColor: 'emerald',
      icon: FolderGit2,
      title: 'Production & College Projects',
      tagline: 'End-to-end engineered software with full documentation & live demo',
      description:
        'Complete engineering systems built with real-world architectures. Includes full documented source code, system design diagrams, cloud deployment links, and walkthrough support.',
      priceTag: 'Starting from ₹2,000',
      priceSubtext: 'Full source code, report & live hosting',
      popular: true,
      features: [
        'Complete frontend, backend & database source code',
        'Live cloud deployment link for presentation & testing',
        'System architecture diagrams & documentation',
        'Project report, PPT & technical synopsis materials',
        '1-on-1 code walkthrough & architecture explanation'
      ],
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
      badge: 'Full-Stack Engineering',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      accentColor: 'purple',
      icon: Globe,
      title: 'Web Applications & Portals',
      tagline: 'Modern business websites & complex custom web apps',
      description:
        'From high-converting business platforms to robust SaaS web applications, client portals, and administrative dashboards engineered for reliability, security, and scale.',
      priceTag: 'Tailored Architecture',
      priceSubtext: 'Fast delivery & responsive UI/UX',
      features: [
        'Modern Responsive Websites & Interactive Web Portals',
        'Custom Web Applications with Auth & Role Controls',
        'Interactive Admin Dashboards & Live KPI Tracking',
        'Database Design, REST APIs & Cloud Infrastructure',
        'SEO Optimization, Blazing Performance & Security'
      ],
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

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-200 text-slate-900 scroll-mt-16 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>OUR CORE SERVICES · WHAT WE DELIVER</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900"
            style={{ textWrap: 'balance' }}
          >
            Engineering Solutions for Every Goal
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether you need to automate company workflows, build an outstanding production project, or develop a custom web application tailored to your operational needs.
          </p>
        </div>

        {/* 3 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc) => {
            const IconComponent = svc.icon;
            const isEmerald = svc.accentColor === 'emerald';
            const isPurple = svc.accentColor === 'purple';

            let borderClasses = 'border-slate-200 hover:border-blue-300';
            let iconBgClasses = 'bg-blue-600 text-white';
            let priceBgClasses = 'bg-blue-50 text-blue-800 border-blue-200';
            let btnClasses = 'bg-blue-600 hover:bg-blue-700 text-white';
            let checkIconColor = 'text-blue-600';

            if (isEmerald) {
              borderClasses = 'border-emerald-200 hover:border-emerald-400';
              iconBgClasses = 'bg-emerald-600 text-white';
              priceBgClasses = 'bg-emerald-50 text-emerald-900 border-emerald-200';
              btnClasses = 'bg-emerald-600 hover:bg-emerald-700 text-white';
              checkIconColor = 'text-emerald-600';
            } else if (isPurple) {
              borderClasses = 'border-purple-200 hover:border-purple-400';
              iconBgClasses = 'bg-purple-600 text-white';
              priceBgClasses = 'bg-purple-50 text-purple-900 border-purple-200';
              btnClasses = 'bg-purple-600 hover:bg-purple-700 text-white';
              checkIconColor = 'text-purple-600';
            }

            return (
              <div
                key={svc.id}
                className={`rounded-3xl p-7 sm:p-8 bg-white border-2 ${borderClasses} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group`}
              >
                {/* Popular Pill if applicable */}
                {svc.popular && (
                  <div className="absolute -top-3.5 right-6 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Popular</span>
                  </div>
                )}

                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-2xl ${iconBgClasses} flex items-center justify-center shadow-sm shrink-0 transition-transform group-hover:scale-105 duration-200`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${svc.badgeColor} uppercase tracking-wider inline-block mb-1`}>
                          {svc.badge}
                        </span>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                          {svc.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Price Banner */}
                  <div className={`p-3 rounded-2xl ${priceBgClasses} border flex items-center justify-between mb-5`}>
                    <div>
                      <div className="text-sm font-black tracking-tight">
                        {svc.priceTag}
                      </div>
                      <div className="text-[11px] opacity-80 font-medium">
                        {svc.priceSubtext}
                      </div>
                    </div>
                    <div className="p-1.5 rounded-xl bg-white/80 shadow-2xs">
                      <ShieldCheck className="w-4 h-4 opacity-90" />
                    </div>
                  </div>

                  {/* Tagline & Description */}
                  <p className="text-xs font-bold text-slate-800 mb-2">
                    {svc.tagline}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                    {svc.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="pt-4 border-t border-slate-100 mb-8">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-3">
                      What&apos;s Included:
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {svc.features.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${checkIconColor} shrink-0 mt-0.5`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Action Buttons */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={svc.primaryAction}
                    className={`w-full py-3 px-4 rounded-xl ${btnClasses} font-semibold text-xs transition-all shadow-xs flex items-center justify-between group/btn`}
                  >
                    <span>{svc.primaryCta}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <button
                    onClick={svc.secondaryAction}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{svc.secondaryCta}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Strip */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                Need a tailored combination or custom consultation?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                We assess your exact technical or business requirements and provide a fixed-scope roadmap with rapid turnaround.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/contact')}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap shadow-xs flex items-center justify-center gap-2"
          >
            <span>Talk to Engineers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
