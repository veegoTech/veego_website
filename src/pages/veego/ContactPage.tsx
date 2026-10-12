import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  Briefcase,
  Layers,
  HelpCircle,
  Mail,
  Phone,
  Building,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { addCustomerInquiry } from '../../services/adminStorage';

interface ContactPageProps {
  initialRequirement?: string;
  initialDescription?: string;
  onNavigate: (path: string) => void;
}

type RequirementType =
  | 'I have a business problem'
  | 'I need custom software'
  | 'General inquiry / partnership';

export const ContactPage: React.FC<ContactPageProps> = ({
  initialRequirement,
  initialDescription,
  onNavigate
}) => {
  const [requirementType, setRequirementType] = useState<RequirementType>('I have a business problem');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialRequirement) {
      if (initialRequirement.includes('Custom')) {
        setRequirementType('I need custom software');
      } else {
        setRequirementType('I have a business problem');
      }
    }
    if (initialDescription) {
      setProblemDescription(initialDescription);
    }
  }, [initialRequirement, initialDescription]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email address.';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phone = 'Please provide a contact phone number.';
    } else if (cleanPhone.length !== 10) {
      errs.phone = 'Phone number must be exactly 10 digits.';
    }
    if (!problemDescription.trim()) {
      errs.problemDescription = 'Please describe your business problem or requirement.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const inqType =
      requirementType === 'I need custom software'
        ? 'Custom Software'
        : requirementType === 'General inquiry / partnership'
          ? 'General Inquiry'
          : 'Business Problem';

    addCustomerInquiry({
      name,
      email,
      phone,
      organization: organization.trim() || 'Independent / Individual',
      inquiryType: inqType,
      category: initialRequirement || 'General',
      problemDescription
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setOrganization('');
    setProblemDescription('');
    setErrors({});
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-slate-100 border border-slate-300 text-slate-900 text-xs font-mono uppercase tracking-wider mb-4 font-bold">

          <span>DIRECT ACCESS TO VEEGO ENGINEERS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 mb-3">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-slate-800 font-bold mb-2">
          We Go Through Your Problem. We Give You the Solution.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Tell us about the bottleneck in your business or software requirements. We respond with practical engineering analysis, not sales pressure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Direct Contact Information Cards */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-[4px] bg-white border border-slate-200 space-y-6">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <span>Reach Us Directly</span>
            </h2>

            <div className="space-y-3">
              {/* Phone */}
              <div className="flex items-start gap-3 p-3.5 rounded-[4px] bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-[4px] bg-slate-100 border border-slate-300 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Direct Line &amp; WhatsApp
                  </div>
                  <a
                    href="tel:+916369612602"
                    className="text-sm font-bold text-slate-950 hover:text-blue-600 transition-colors"
                  >
                    +91 63696 12602
                  </a>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Mon–Sun, 9:00 AM – 7:30 PM IST
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-3.5 rounded-[4px] bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-[4px] bg-slate-100 border border-slate-300 flex items-center justify-center text-emerald-600 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Support &amp; Inquiries
                  </div>
                  <a
                    href="mailto:veego.support@gmail.com"
                    className="text-sm font-bold text-slate-950 hover:text-blue-600 transition-colors"
                  >
                    veego.support@gmail.com
                  </a>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Business Software Support
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="flex items-start gap-3 p-3.5 rounded-[4px] bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-[4px] bg-slate-100 border border-slate-300 flex items-center justify-center text-indigo-600 shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Engineering Hub
                  </div>
                  <div className="text-sm font-bold text-slate-950">
                    VeeGo Technologies
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Theni, Tamil Nadu, India
                  </div>
                </div>
              </div>

              {/* Response SLA */}
              <div className="flex items-start gap-3 p-3.5 rounded-[4px] bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-[4px] bg-slate-100 border border-slate-300 flex items-center justify-center text-amber-600 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Response Guarantee
                  </div>
                  <div className="text-sm font-bold text-slate-950">
                    Within 8 Business Hours
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Every ticket is reviewed by a practicing software engineer.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links inside Contact sidebar */}
            <div className="pt-4 border-t border-slate-200 space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-500 font-bold mb-2 tracking-wider">
                Need Immediate Answers?
              </div>
              <button
                onClick={() => onNavigate('/solutions')}
                className="w-full text-left text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-950 p-2 rounded-[4px] hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Explore Ready Solutions</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </button>
              <button
                onClick={() => onNavigate('/how-it-works')}
                className="w-full text-left text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-950 p-2 rounded-[4px] hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>How VeeGo Solves Problems</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Consultation & Contact Form */}
        <div className="lg:col-span-8">
          {submitted ? (
            <div className="p-8 sm:p-12 rounded-[4px] bg-white border border-slate-300 text-center">
              <div className="w-14 h-14 rounded-[4px] bg-slate-100 border border-slate-300 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mb-3">
                Message Received
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
                Thank you, <strong>{name}</strong>. Your enquiry regarding <em>&quot;{requirementType}&quot;</em> has been logged. An engineer from our solution architecture team will review your workflow details and contact you at <strong>{email}</strong> or <strong>{phone}</strong> within 4 business hours.
              </p>

              <div className="p-4 rounded-[4px] bg-slate-50 border border-slate-200 max-w-md mx-auto mb-8 text-left text-xs text-slate-700 space-y-1 font-mono">
                <div className="text-blue-700 font-bold uppercase text-[10px] tracking-wider">
                  Consultation Reference ID: #{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <div>Contact: {email} · {phone}</div>
                <div>Requirement: {requirementType}</div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-[4px] border border-slate-300 hover:bg-slate-100 text-slate-900 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
                <button
                  onClick={() => onNavigate('/solutions')}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-1.5 border border-blue-600 cursor-pointer"
                >
                  <span>Explore VeeGo Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-300 rounded-[4px] p-6 sm:p-9">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Requirement Category Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-3 font-bold">
                    What is this enquiry regarding?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        type: 'I have a business problem' as RequirementType,
                        label: 'Business Problem',
                        desc: 'Workflow bottleneck & automation',
                        icon: <Briefcase className="w-4 h-4" />
                      },
                      {
                        type: 'I need custom software' as RequirementType,
                        label: 'Custom Software',
                        desc: 'Custom web app or database engine',
                        icon: <Layers className="w-4 h-4" />
                      },
                      {
                        type: 'General inquiry / partnership' as RequirementType,
                        label: 'General Inquiry',
                        desc: 'Questions, advisory or collaboration',
                        icon: <HelpCircle className="w-4 h-4" />
                      }
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.type}
                        onClick={() => setRequirementType(item.type)}
                        className={`text-left p-3.5 rounded-[4px] border transition-colors flex items-start gap-3 cursor-pointer ${requirementType === item.type
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-300 hover:border-slate-400 bg-white text-slate-700'
                          }`}
                      >
                        <div
                          className={`mt-0.5 p-1.5 rounded-[2px] ${requirementType === item.type
                            ? 'bg-slate-800 text-blue-300'
                            : 'bg-slate-100 text-slate-700'
                            }`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className={`font-bold text-xs uppercase tracking-wider ${requirementType === item.type ? 'text-white' : 'text-slate-950'}`}>
                            {item.label}
                          </div>
                          <div className={`text-[11px] mt-0.5 leading-snug ${requirementType === item.type ? 'text-slate-300' : 'text-slate-500'}`}>
                            {item.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
                      Your Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[4px] text-xs sm:text-sm border bg-white text-slate-900 focus:outline-none focus:border-slate-950 transition-colors ${errors.name ? 'border-rose-500' : 'border-slate-300'
                        }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-600 mt-1 font-mono">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[4px] text-xs sm:text-sm border bg-white text-slate-900 focus:outline-none focus:border-slate-950 transition-colors ${errors.email ? 'border-rose-500' : 'border-slate-300'
                        }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-600 mt-1 font-mono">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
                      Phone Number (Call / WhatsApp) <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className={`w-full px-3.5 py-2.5 rounded-[4px] text-xs sm:text-sm border bg-white text-slate-900 focus:outline-none focus:border-slate-950 transition-colors ${errors.phone ? 'border-rose-500' : 'border-slate-300'
                        }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-600 mt-1 font-mono">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
                      Business or Organization Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Logistics, or Independent"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-[4px] text-xs sm:text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-slate-950"
                    />
                  </div>
                </div>

                {/* Detailed Description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                      Describe What&apos;s Happening <span className="text-rose-600">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">
                      No tech jargon needed
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Tell us what manual work is eating your time, what process is breaking, or what you want to achieve..."
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-[4px] text-xs sm:text-sm border bg-white text-slate-900 focus:outline-none focus:border-slate-950 transition-colors ${errors.problemDescription ? 'border-rose-500' : 'border-slate-300'
                      }`}
                  />
                  {errors.problemDescription && (
                    <p className="text-[11px] text-rose-600 mt-1 font-mono">{errors.problemDescription}</p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Confidential review. Direct engineer response within 8 hours.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-2 border border-blue-600 cursor-pointer"
                  >
                    <span>Submit to VeeGo Engineers</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
