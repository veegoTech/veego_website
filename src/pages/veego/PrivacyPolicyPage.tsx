import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Server,
  Globe,
  Bell,
  Mail,
  MapPin,
  Phone,
  ArrowLeft,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  const lastUpdated = 'October 13, 2026';

  const sections = [
    {
      id: 'introduction',
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      title: '1. Introduction & Overview',
      content: (
        <>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3">
            At <strong className="text-slate-900">VeeGo Technologies</strong> (&ldquo;VeeGo&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we take your privacy seriously. This Privacy Policy details how we collect, use, store, process, and protect your personal information when you visit our website (<a href="https://www.veegotech.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-0.5">veegotech.com <ExternalLink className="w-3 h-3 inline" /></a>), use our Learning Management System (LMS) portal, interact with our custom business software applications, or submit consultation inquiries.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            By accessing or using our websites, software products, and learning academy, you acknowledge that you have read, understood, and agree to the data collection and usage practices described in this policy.
          </p>
        </>
      )
    },
    {
      id: 'information-we-collect',
      icon: <Eye className="w-5 h-5 text-indigo-600" />,
      title: '2. Information We Collect',
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We collect information only to the extent necessary to provide reliable software engineering solutions, deliver online/offline educational curriculum, and verify earned credentials:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-[4px] bg-slate-50 border border-slate-200">
              <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-blue-700 mb-2">
                A. Personal Information You Provide
              </h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Full Name &amp; Contact Details (Email address, phone number)</li>
                <li>Educational / College / Employment background for course enrollment</li>
                <li>Business problem statements and project requirements</li>
                <li>LMS account login credentials (encrypted authentication)</li>
                <li>Billing and transaction receipts (processed securely via gateways)</li>
              </ul>
            </div>
            <div className="p-4 rounded-[4px] bg-slate-50 border border-slate-200">
              <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-slate-800 mb-2">
                B. Learning &amp; Technical Analytics
              </h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Course progress, quiz assessments, coding lab submissions</li>
                <li>Issued certificate IDs, completion dates, and credential records</li>
                <li>Device information, browser type, and operating system</li>
                <li>IP address and general geographical connection telemetry</li>
                <li>Session activity logs to protect platform integrity</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'how-we-use',
      icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
      title: '3. How We Use Your Information',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We process your information strictly for legitimate business and educational purposes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-[4px]">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Service Delivery</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operating our LMS classroom, tracking lesson progress, assessing module projects, and delivering software consultation.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-[4px]">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certificate Registry</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Publishing verifiable certificate records so employers and academic institutions can authenticate student credentials.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-[4px]">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Support &amp; Updates</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Communicating class schedules, resolving technical support tickets, answering project inquiries, and sending course alerts.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-protection',
      icon: <Lock className="w-5 h-5 text-amber-600" />,
      title: '4. Data Protection, Security & Confidentiality',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We implement industry-standard technical, operational, and organizational security measures to protect your personal and business data:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span><strong>Encryption &amp; Cloud Security:</strong> Data in transit is secured using Transport Layer Security (TLS 1.3 / HTTPS). Sensitive database tables are encrypted at rest with managed PostgreSQL/Supabase access controls.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span><strong>Strict Non-Disclosure for Client Software:</strong> Business data, internal staff logs, workflow files, and proprietary formulas shared during engineering consultations are treated as strictly confidential and never shared with third parties.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span><strong>Role-Based Access Control (RBAC):</strong> Access to student records and client submissions is restricted solely to authorized VeeGo instructors and engineering personnel.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'third-parties',
      icon: <Server className="w-5 h-5 text-purple-600" />,
      title: '5. Third-Party Integrations & Service Providers',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We do not sell, rent, or trade your personal information. We only share data with vetted third-party infrastructure providers necessary to power our application:
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-slate-600">
            <p>
              • <strong>Database &amp; Authentication:</strong> Supabase (PostgreSQL with Row Level Security).<br />
              • <strong>Payment Gateways:</strong> Secure PCI-DSS compliant Indian payment gateways (UPI, Razorpay, Net Banking). VeeGo never stores your raw credit/debit card numbers or UPI PINs.<br />
              • <strong>Hosting &amp; CDN:</strong> High-reliability cloud servers delivering fast, low-latency web assets.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'cookies',
      icon: <Globe className="w-5 h-5 text-cyan-600" />,
      title: '6. Cookies & Local Storage',
      content: (
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          We use essential cookies and browser LocalStorage solely to maintain your active login session, remember your UI preferences (such as dark/light themes and editor state), and track your course progress. You can disable cookies via your browser settings, though doing so may prevent you from staying logged into the student LMS portal.
        </p>
      )
    },
    {
      id: 'user-rights',
      icon: <FileText className="w-5 h-5 text-rose-600" />,
      title: '7. Your Rights & Data Choices',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            As a student, client, or site visitor, you have rights regarding your personal information under applicable Indian data protection guidelines:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
            <div className="p-3 rounded-[4px] bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Right to Access &amp; Portability</strong>
              You may request a copy of the personal details, course progress, and invoices associated with your account.
            </div>
            <div className="p-3 rounded-[4px] bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Right to Rectification</strong>
              You can correct inaccurate details (such as your name for certificate issuance) by contacting our administration desk.
            </div>
            <div className="p-3 rounded-[4px] bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Right to Account Deletion</strong>
              You can request deletion of your account and personal history, subject to legal, tax, and credential verification compliance obligations.
            </div>
            <div className="p-3 rounded-[4px] bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Right to Withdraw Consent</strong>
              You can opt out of promotional communications at any time while retaining transactional course alerts.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'updates',
      icon: <Bell className="w-5 h-5 text-orange-600" />,
      title: '8. Updates to this Policy',
      content: (
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          We may update this Privacy Policy periodically to reflect enhancements in our technologies, software features, or regulatory compliance requirements. When changes are published, we will update the &ldquo;Last Updated&rdquo; date at the top of this page. We encourage you to review this policy periodically.
        </p>
      )
    },
    {
      id: 'contact',
      icon: <Mail className="w-5 h-5 text-blue-600" />,
      title: '9. Contact Us & Grievance Redressal',
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            If you have questions, concerns, or requests regarding this Privacy Policy or how your personal information is handled, please contact our Data &amp; Grievance Desk:
          </p>
          <div className="p-5 rounded-[4px] bg-slate-50 border border-slate-200 space-y-2.5 text-xs sm:text-sm text-slate-700">
            <div className="font-bold text-slate-900 text-sm">VeeGo Technologies / VeeGo Computer Education</div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>No 10, 1st Floor, K S Complex, Subban Street, Theni — 625531, Tamil Nadu, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <a href="mailto:veego.support@gmail.com" className="text-blue-600 hover:underline">veego.support@gmail.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>+91 63696 12602 / +91 8015 8016 89</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 bg-white min-h-screen">
      {/* Top Breadcrumb & Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Legal Tabs Switcher */}
        <div className="inline-flex p-1 bg-slate-100 rounded-[4px] border border-slate-200 text-xs font-medium">
          <button
            className="px-3 py-1.5 rounded-[3px] bg-white text-blue-700 font-bold shadow-xs cursor-default"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigate('/terms-and-conditions')}
            className="px-3 py-1.5 rounded-[3px] text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Terms &amp; Conditions
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-700 mb-4">
          <Lock className="w-3.5 h-3.5" />
          <span>LEGAL &amp; COMPLIANCE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          How VeeGo Technologies protects your personal information, client problem data, and student educational records.
        </p>

        <div className="mt-4 flex items-center gap-3 text-xs font-mono text-slate-500">
          <span>Effective Date: <strong>{lastUpdated}</strong></span>
          <span>·</span>
          <span>Version 2.4</span>
        </div>
      </motion.div>

      {/* Main Content Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-7 rounded-[4px] bg-white border border-slate-200 hover:border-slate-300 transition-colors shadow-xs"
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-[4px] bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                {section.icon}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-950">
                {section.title}
              </h2>
            </div>
            <div>{section.content}</div>
          </motion.section>
        ))}
      </div>

      {/* Bottom Cross-link Banner */}
      <div className="mt-12 p-6 rounded-[4px] bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white mb-1">
            Need to review our Terms &amp; Conditions?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Read our platform usage rules, course enrollment conditions, and liability policies.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/terms-and-conditions')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-[4px] transition-colors cursor-pointer shrink-0"
        >
          View Terms &amp; Conditions →
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
