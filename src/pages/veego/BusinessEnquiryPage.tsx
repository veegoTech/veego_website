import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { BusinessEnquiryData } from '../../types';
import { addCustomerInquiry } from '../../services/adminStorage';

interface BusinessEnquiryPageProps {
  initialCategory?: string;
  initialProblemDescription?: string;
  onNavigate: (path: string) => void;
}

export const BusinessEnquiryPage: React.FC<BusinessEnquiryPageProps> = ({
  initialCategory,
  initialProblemDescription,
  onNavigate
}) => {
  const [formData, setFormData] = useState<BusinessEnquiryData>({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    businessType: '',
    problemCategory: initialCategory || 'Staff',
    describeProblem: initialProblemDescription || '',
    currentProcess: '',
    whatToImprove: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({ ...prev, problemCategory: initialCategory }));
    }
    if (initialProblemDescription) {
      setFormData((prev) => ({ ...prev, describeProblem: initialProblemDescription }));
    }
  }, [initialCategory, initialProblemDescription]);

  const categories = [
    'Staff',
    'Sales',
    'Customers',
    'Billing',
    'Reports',
    'Data',
    'Education',
    'Communication',
    'Automation',
    'AI',
    'Other'
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.businessName.trim()) errs.businessName = 'Please enter your business or organization name.';
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phone = 'Please provide a contact phone number.';
    } else if (cleanPhone.length !== 10) {
      errs.phone = 'Phone number must be exactly 10 digits.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.describeProblem.trim()) {
      errs.describeProblem = 'Please describe the problem you are trying to solve.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addCustomerInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: formData.businessName,
      inquiryType: 'Business Problem',
      category: formData.problemCategory,
      problemDescription: `Problem: ${formData.describeProblem}${formData.currentProcess ? `\nCurrent Process: ${formData.currentProcess}` : ''}${formData.whatToImprove ? `\nDesired Improvement: ${formData.whatToImprove}` : ''}`
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      businessName: '',
      phone: '',
      email: '',
      businessType: '',
      problemCategory: 'Staff',
      describeProblem: '',
      currentProcess: '',
      whatToImprove: ''
    });
    setErrors({});
  };

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700 font-bold mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>UNDERSTAND · BUILD · GROW</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-2"
          style={{ textWrap: 'balance' }}
        >
          Tell Us Your Problem.
        </h1>
        <p className="text-base text-slate-700 font-semibold leading-relaxed mb-1">
          &ldquo;We Go Through Your Problem. We Give You the Solution.&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Every business works differently. Instead of forcing your business into a standard product, VeeGo starts by understanding your problem, workflow and goal — then builds the right technology solution.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-sm text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            Problem Statement Received
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto mb-8 leading-relaxed">
            Thank you, <strong>{formData.name}</strong> from <strong>{formData.businessName}</strong>. We have logged your {formData.problemCategory} operational challenge. Our engineering team will review your workflow requirements and reach out via <strong>{formData.email}</strong> or <strong>{formData.phone}</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
            >
              Submit Another Problem
            </button>
            <button
              onClick={() => onNavigate('/projects')}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs"
            >
              Explore Systems Built by VeeGo
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-9 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business & Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-600 mb-1 font-bold">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Chandra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-600 mb-1 font-bold">
                  Business / Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Distribution Ltd."
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors ${
                    errors.businessName ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.businessName && <p className="text-[11px] text-red-600 mt-1">{errors.businessName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-600 mb-1 font-bold">
                  Contact Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-600 mb-1 font-bold">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="ramesh@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Problem Category Tabs */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-600 mb-2 font-bold">
                Where is the bottleneck occurring?
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isSelected = formData.problemCategory === cat;
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setFormData({ ...formData, problemCategory: cat })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Describe the Problem */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-600 mb-1 font-bold">
                Describe the problem you are trying to solve <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="What is taking too long? What data is messy? Where are mistakes happening in daily operations?"
                value={formData.describeProblem}
                onChange={(e) => setFormData({ ...formData, describeProblem: e.target.value })}
                className={`w-full p-3 rounded-lg text-xs sm:text-sm border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors ${
                  errors.describeProblem ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.describeProblem && (
                <p className="text-[11px] text-red-600 mt-1">{errors.describeProblem}</p>
              )}
            </div>

            {/* Current Process vs Goal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-600 mb-1 font-bold">
                  How do you currently handle this? (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. WhatsApp groups, paper register, multiple Excel sheets..."
                  value={formData.currentProcess}
                  onChange={(e) => setFormData({ ...formData, currentProcess: e.target.value })}
                  className="w-full p-3 rounded-lg text-xs border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-600 mb-1 font-bold">
                  What would ideal success look like? (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Save 2 hours every day, automatic reminders, zero billing mistakes..."
                  value={formData.whatToImprove}
                  onChange={(e) => setFormData({ ...formData, whatToImprove: e.target.value })}
                  className="w-full p-3 rounded-lg text-xs border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Strict privacy. Direct engineer review within 8 hours.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>Request Solution Blueprint</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
