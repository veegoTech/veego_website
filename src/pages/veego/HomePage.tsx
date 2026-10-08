import React, { useState } from 'react';
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
      <section id="contact" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 sm:p-10 bg-white border border-slate-200 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-wider text-blue-700 font-bold px-2.5 py-1 rounded bg-blue-50 border border-blue-100 mb-3 inline-block">
                Direct Engineering Access
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                What problem are you trying to solve today?
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Describe the daily routine that is taking too much time, costing money, or causing mistakes. We will review your workflow and outline the right technical architecture.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-emerald-900 mb-1">
                  Problem Received — Review in Progress
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto mb-4">
                  A VeeGo systems engineer will review your problem statement and reach out with a concrete workflow solution within 8 hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setUserProblem('');
                  }}
                  className="text-xs font-semibold text-emerald-800 underline underline-offset-2"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickConsultSubmit} className="space-y-4">
                <div>
                  <label htmlFor="hp-problem" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Describe Your Operational Bottleneck:
                  </label>
                  <textarea
                    id="hp-problem"
                    required
                    rows={3}
                    value={userProblem}
                    onChange={(e) => setUserProblem(e.target.value)}
                    placeholder="e.g. My staff work is difficult to track across WhatsApp and paper..."
                    className="w-full text-xs sm:text-sm p-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hp-email" className="block text-xs font-bold text-slate-700 mb-1">
                      Your Work Email:
                    </label>
                    <input
                      id="hp-email"
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="hp-phone" className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / WhatsApp (Optional):
                    </label>
                    <input
                      id="hp-phone"
                      type="tel"
                      maxLength={10}
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Strict confidentiality. No spam, no aggressive sales pitches.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Request Engineering Solution</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
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
