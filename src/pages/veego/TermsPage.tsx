import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  ShieldCheck,
  Scale,
  Award,
  CreditCard,
  AlertTriangle,
  Ban,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  ArrowLeft,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  const lastUpdated = 'October 13, 2026';

  const sections = [
    {
      id: 'acceptance',
      icon: <Scale className="w-5 h-5 text-blue-600" />,
      title: '1. Acceptance of Terms',
      content: (
        <>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3">
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;Student&rdquo;, &ldquo;Client&rdquo;, or &ldquo;You&rdquo;) and <strong className="text-slate-900">VeeGo Technologies / VeeGo Computer Education</strong> (&ldquo;VeeGo&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), governing your access to and use of our website (<a href="https://www.veegotech.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-0.5">veegotech.com <ExternalLink className="w-3 h-3 inline" /></a>), our online and offline Learning Management System (LMS), and our custom software engineering consultation services.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            By creating an account, enrolling in a course, submitting a business inquiry, or accessing any part of our platform, you explicitly agree to comply with and be bound by these Terms and our Privacy Policy.
          </p>
        </>
      )
    },
    {
      id: 'services',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
      title: '2. Scope of Services',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            VeeGo Technologies operates across two core operational pillars:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-[4px] bg-slate-50 border border-slate-200">
              <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-blue-700 mb-2">
                A. Custom Software Engineering
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Consulting, architecture design, database engineering, and custom software development tailored to business operational bottlenecks (including StaffTrack, GST Invoicing, AlphaFly LMS, and automated workflows).
              </p>
            </div>
            <div className="p-4 rounded-[4px] bg-slate-50 border border-slate-200">
              <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-slate-800 mb-2">
                B. VeeGo Academy &amp; LMS Training
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hands-on practical training courses in Applied Python, SQL, Cognitive AI &amp; Agentic Engineering, Full-Stack Development, and AI Tools for Professionals with interactive lessons and verifiable digital certifications.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'account-security',
      icon: <FileText className="w-5 h-5 text-emerald-600" />,
      title: '3. User Account & Security',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            When registering for an account on the VeeGo LMS or client portal:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>You agree to provide accurate, current, and complete registration information (including legal student/organization names).</li>
            <li>You are solely responsible for maintaining the confidentiality of your login credentials and password.</li>
            <li>Account sharing across multiple individuals is strictly prohibited and may lead to automatic suspension without refund.</li>
            <li>You must notify VeeGo immediately at <a href="mailto:veego.support@gmail.com" className="text-blue-600 hover:underline">veego.support@gmail.com</a> if you suspect any unauthorized access to your account.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      icon: <Award className="w-5 h-5 text-purple-600" />,
      title: '4. Intellectual Property Rights',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            All courseware, lesson texts, video tutorials, code challenge setups, exercises, branding, logos, graphics, and underlying software code are the proprietary intellectual property of VeeGo Technologies and are protected under Indian and international copyright laws.
          </p>
          <div className="p-3.5 rounded-[4px] bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong>Limited Personal License:</strong> Enrolled students are granted a non-exclusive, non-transferable, revocable personal license to view course materials for educational purposes. You may not record, re-distribute, re-sell, publicly broadcast, or reverse-engineer any portion of our courseware or platform architecture without prior written consent.
          </div>
        </div>
      )
    },
    {
      id: 'course-certifications',
      icon: <Award className="w-5 h-5 text-amber-600" />,
      title: '5. Course Access, Assessments & Certification',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            To uphold the credibility and academic rigor of VeeGo Academy credentials:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
            <div className="p-3.5 rounded-[4px] bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-1 text-slate-900 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Eligibility Requirements</span>
              </div>
              Certificates are awarded only upon satisfactory completion of all curriculum modules and scoring at least the minimum threshold (e.g. 70% on the 20-MCQ assessment or capstone review).
            </div>
            <div className="p-3.5 rounded-[4px] bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-1 text-slate-900 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Registry Verification</span>
              </div>
              Every issued certificate bears a unique Certificate ID and QR code verifiable on our public registry portal at <span className="font-mono text-slate-800">/verify-certificate</span>.
            </div>
          </div>
          <p className="text-xs text-slate-500 italic mt-2">
            VeeGo reserves the right to revoke or void any certificate found to have been obtained through fraudulent means, cheating, proxy attendance, or plagiarism.
          </p>
        </div>
      )
    },
    {
      id: 'payments-refunds',
      icon: <CreditCard className="w-5 h-5 text-emerald-600" />,
      title: '6. Payments, Billing & Refund Policy',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            All course and software consultation fees are quoted in Indian Rupees (INR) and are inclusive/exclusive of applicable Goods &amp; Services Tax (GST) as specified during checkout:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li><strong>Digital Self-Paced Courses:</strong> Due to immediate digital unlock of course materials, source code, and lesson access upon payment, fees for digital-only modules (such as the AI Tools certification track) are generally non-refundable once content has been accessed.</li>
            <li><strong>Classroom &amp; Live Batches:</strong> Cancellations made at least 3 business days prior to batch commencement may be eligible for a refund (less nominal administrative processing charges) or transfer to an upcoming cohort.</li>
            <li><strong>Custom Software Engineering Contracts:</strong> Software development projects operate on staged milestone agreements outlined in individual Master Services Agreements (MSAs). Milestone payments for approved phases are non-refundable.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'prohibited-conduct',
      icon: <Ban className="w-5 h-5 text-rose-600" />,
      title: '7. Prohibited Conduct',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            When interacting with the VeeGo website and LMS services, you agree not to:
          </p>
          <div className="p-4 rounded-[4px] bg-rose-50/70 border border-rose-200 text-xs sm:text-sm text-rose-950 space-y-1.5">
            <p>• Probe, scan, or test the vulnerability of our systems or bypass security filters.</p>
            <p>• Scrape, crawl, or harvest student records, emails, or platform content using automated bots.</p>
            <p>• Upload malicious code, trojans, viruses, or disruptive scripts to live coding sandboxes.</p>
            <p>• Impersonate any instructor, student, or staff member of VeeGo Technologies.</p>
            <p>• Engage in abusive, harassing, or defamatory conduct towards instructors or peers.</p>
          </div>
        </div>
      )
    },
    {
      id: 'disclaimer-liability',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      title: '8. Disclaimers & Limitation of Liability',
      content: (
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            While we strive for 100% operational excellence and up-to-date curricula:
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            • <strong>Educational Outcomes:</strong> Our courses provide practical, industry-aligned engineering training. However, VeeGo does not guarantee specific job placement, salary benchmarks, or academic grades, as individual career outcomes depend heavily on personal effort, market conditions, and interview performance.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            • <strong>Limitation of Liability:</strong> To the maximum extent permitted by applicable law, VeeGo Technologies shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from the use or inability to use our platform or software services.
          </p>
        </div>
      )
    },
    {
      id: 'governing-law',
      icon: <Scale className="w-5 h-5 text-slate-700" />,
      title: '9. Governing Law & Jurisdiction',
      content: (
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          These Terms and any dispute arising from your use of VeeGo services shall be governed by and construed in accordance with the laws of the Republic of India. Any legal proceedings or dispute claims shall be subject to the exclusive jurisdiction of the competent courts in <strong className="text-slate-900">Theni, Tamil Nadu, India</strong>.
        </p>
      )
    },
    {
      id: 'contact',
      icon: <HelpCircle className="w-5 h-5 text-blue-600" />,
      title: '10. Contact & Clarifications',
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            For questions concerning these Terms, payment queries, or enterprise agreements, reach out to us directly:
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
            onClick={() => onNavigate('/privacy-policy')}
            className="px-3 py-1.5 rounded-[3px] text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            className="px-3 py-1.5 rounded-[3px] bg-white text-blue-700 font-bold shadow-xs cursor-default"
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
          <FileText className="w-3.5 h-3.5" />
          <span>LEGAL AGREEMENT &amp; PLATFORM POLICY</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-3">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Rules, student code of conduct, intellectual property rights, and commercial policies governing VeeGo Technologies and VeeGo Academy.
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
            Looking for our Privacy Policy?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Learn how we safeguard your personal data, credentials, and company workflow information.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/privacy-policy')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-[4px] transition-colors cursor-pointer shrink-0"
        >
          View Privacy Policy →
        </button>
      </div>
    </div>
  );
};

export default TermsPage;
