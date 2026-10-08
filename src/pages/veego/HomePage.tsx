import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../../components/Hero';
import { ServicesSection } from '../../components/ServicesSection';
import { DifferenceAndEcosystemSection } from '../../components/DifferenceAndEcosystemSection';
import { TwoWaysSection } from '../../components/TwoWaysSection';
import { HowItWorksSection } from '../../components/HowItWorksSection';
import { InteractiveProblemWorkbench } from '../../components/InteractiveProblemWorkbench';
import { WhyVeeGoAndCTA } from '../../components/WhyVeeGoAndCTA';
import { Project, SolutionItem } from '../../types';
import { InteractiveProblemItem } from '../../data/businessProblems';
import {
  Send,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenLiveDemo: (project: Project) => void;
  onDiscussProblem: (problem: InteractiveProblemItem) => void;
  onExploreSolution: (solution: SolutionItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate
}) => {
  // Inline consultation form state
  const [userProblem, setUserProblem] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleQuickConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProblem.trim()) return;
    setFormSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'solutions' || id === 'projects' || id === 'about') {
      onNavigate(`/${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate(`/${id}`);
    }
  };

  const handleRequestService = (serviceName: string) => {
    setUserProblem(`Inquiry regarding ${serviceName}: We would like to discuss our requirements and deployment roadmap.`);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white text-slate-900 scroll-smooth">
      {/* 1. HERO SECTION */}
      <div id="home">
        <Hero
          onSolveProblem={() => scrollToSection('contact')}
          onExploreSolutions={() => onNavigate('/solutions')}
        />
      </div>

      {/* 2. SERVICES SECTION - CORE SERVICES (BUSINESS AUTOMATION, COLLEGE PROJECTS, WEB SERVICES) */}
      <ServicesSection
        onNavigate={onNavigate}
        onRequestService={handleRequestService}
      />

      {/* 3. ENGINEERING STANDARD: TECHNOLOGY IS ONLY USEFUL WHEN IT SOLVES SOMETHING */}
      <div id="connection">
        <DifferenceAndEcosystemSection />
      </div>

      {/* 4. THE TWO MAIN SIDES OF VEEGO (BUSINESS SOLUTIONS & PRODUCTION SOFTWARE PROJECTS) */}
      <div id="pathways">
        <TwoWaysSection
          onExploreSolutions={() => onNavigate('/solutions')}
          onSubmitProblem={() => scrollToSection('contact')}
          onRequestCustomSoftware={() => scrollToSection('contact')}
          onViewProjects={() => onNavigate('/projects')}
        />
      </div>

      {/* 5. HOW IT WORKS (UNDERSTAND · BUILD · GROW) */}
      <div id="how-it-works" className="scroll-mt-16">
        <HowItWorksSection
          onStartDiscovery={() => scrollToSection('contact')}
        />
      </div>

      {/* 6. INTERACTIVE WORKBENCH: PROBLEMS IN → SOLUTIONS OUT */}
      <div id="interactive-engine" className="scroll-mt-16">
        <InteractiveProblemWorkbench
          onSolveProblem={(probText) => {
            setUserProblem(probText);
            scrollToSection('contact');
          }}
          onExploreSolutions={() => onNavigate('/solutions')}
        />
      </div>

      {/* 7. DIRECT CONSULTATION FORM - "WHAT IS YOUR BUSINESS PROBLEM?" */}
      <section id="contact" className="relative py-20 sm:py-28 bg-slate-50 border-b border-slate-200 scroll-mt-16 overflow-hidden">
        {/* Parallax lighting orb */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-300/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 sm:p-12 bg-white border-2 border-slate-200/80 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />

            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-wider text-blue-700 font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 mb-3 inline-flex items-center gap-1.5 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Direct Engineering Access
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                What problem are you trying to solve today?
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Describe the manual routine taking too much time, costing money, or causing operational mistakes. Our systems engineers will review your workflow and outline the right technical solution.
              </p>

              {/* Quick suggestion problem tags */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {[
                  'Staff attendance & GPS tracking',
                  'Automated billing & GST invoicing',
                  'Inbound lead follow-up CRM',
                  'Google Sheets auto sync'
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setUserProblem(`Requirement: ${tag}. Please connect with us to discuss architectural scope.`)}
                    className="text-[11px] px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 hover:border-blue-300 font-medium text-slate-600 transition-all cursor-pointer"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-emerald-950 mb-2">
                  Problem Received — Engineering Review in Progress
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto mb-5 font-medium leading-relaxed">
                  A VeeGo systems engineer will review your problem statement and reach out with a concrete workflow solution within 8 hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setUserProblem('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow-2xs"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleQuickConsultSubmit} className="space-y-5">
                <div>
                  <label htmlFor="hp-problem" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>Describe Your Operational Bottleneck:</span>
                    <span className="text-[10px] text-slate-600 font-normal">Real-world operational detail is welcomed</span>
                  </label>
                  <textarea
                    id="hp-problem"
                    required
                    rows={4}
                    value={userProblem}
                    onChange={(e) => setUserProblem(e.target.value)}
                    placeholder="e.g. Our field staff record daily visits on WhatsApp and paper sheets. Management has zero real-time visibility..."
                    className="w-full text-xs sm:text-sm p-4 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hp-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Work Email:
                    </label>
                    <input
                      id="hp-email"
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="hp-phone" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Phone / WhatsApp (Optional):
                    </label>
                    <input
                      id="hp-phone"
                      type="tel"
                      maxLength={10}
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs"
                    />
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Strict confidentiality. No aggressive sales calls, no spam.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Request Engineering Solution</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* 8. WHY VEEGO PRINCIPLES & FINAL BOTTOM CALL TO ACTION */}
      <div id="about" className="scroll-mt-16">
        <WhyVeeGoAndCTA
          onSolveBusinessProblem={() => scrollToSection('contact')}
        />
      </div>
    </div>
  );
};
