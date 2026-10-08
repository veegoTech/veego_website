import React from 'react';
import {
  PhoneCall,
  Mail,
  Clock,
  ArrowUp
} from 'lucide-react';
import logoImg from '../assets/logo2.png';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-900 text-slate-400 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Tagline */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
            <div>
              <button
                onClick={() => onNavigate('/')}
                className="inline-block mb-3 focus:outline-none group text-left"
                aria-label="VeeGo Home"
              >
                <img
                  src={logoImg}
                  alt="VeeGo — Understand. Build. Grow."
                  className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
                />
              </button>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-4">
                We understand your operational bottleneck, engineer custom software to solve it, and deploy reliable production systems for your business.
              </p>

              {/* Tagline Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/60 text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-6">
                <span>Understand</span>
                <span className="text-blue-600">·</span>
                <span>Build</span>
                <span className="text-blue-600">·</span>
                <span>Grow</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2.5">
                Connect With Us
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="#linkedin"
                  onClick={(e) => e.preventDefault()}
                  aria-label="VeeGo LinkedIn"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white border border-slate-700 hover:border-blue-600 flex items-center justify-center transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                </a>
                <a
                  href="#instagram"
                  onClick={(e) => e.preventDefault()}
                  aria-label="VeeGo Instagram"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-400 hover:text-white border border-slate-700 hover:border-pink-600 flex items-center justify-center transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a
                  href="#youtube"
                  onClick={(e) => e.preventDefault()}
                  aria-label="VeeGo YouTube"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white border border-slate-700 hover:border-red-600 flex items-center justify-center transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a
                  href="#github"
                  onClick={(e) => e.preventDefault()}
                  aria-label="VeeGo GitHub"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 flex items-center justify-center transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Business Solutions */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-bold mb-4">
              Business Solutions
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: 'Staff Management Automation', path: '/solutions' },
                { name: 'Billing & Multi-Branch Ledger', path: '/solutions' },
                { name: 'Sales Pipeline & WhatsApp CRM', path: '/solutions' },
                { name: 'Excel & Spreadsheet Auto-Sync', path: '/solutions' },
                { name: 'Tailored AI & Document Processing', path: '/solutions' }
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => onNavigate(item.path)}
                    className="text-slate-400 hover:text-blue-400 transition-colors text-left block w-full hover:translate-x-0.5 duration-150"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Live Case Studies & Systems */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-bold mb-4">
              Systems Built by VeeGo
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: 'StaffTrack Field OS', path: '/projects' },
                { name: 'InvoiceMaster Billing Hub', path: '/projects' },
                { name: 'AlphaFly EdTech Engine', path: '/projects' },
                { name: 'Spreadsheet AutoReconciler', path: '/projects' },
                { name: 'Custom ERP Solutions', path: '/projects' }
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => onNavigate(item.path)}
                    className="text-slate-400 hover:text-blue-400 transition-colors text-left block w-full hover:translate-x-0.5 duration-150"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Navigation & Company */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-bold mb-4">
              Company Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Solutions', path: '/solutions' },
                { name: 'Built by VeeGo', path: '/projects' },
                { name: 'How It Works', path: '/how-it-works' },
                { name: 'Contact Engineering', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => onNavigate(item.path)}
                    className="text-slate-400 hover:text-blue-400 transition-colors text-left block w-full hover:translate-x-0.5 duration-150"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Highlights Cards */}
        <div className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-800">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-900/50 border border-blue-700/50 text-blue-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                Direct Engineering Hotline
              </span>
              <a href="tel:+916369612602" className="text-xs font-bold text-slate-200 hover:text-blue-400 transition-colors">
                +91 63696 12602
              </a>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-900/50 border border-emerald-700/50 text-emerald-400 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                Problem Statement Inquiries
              </span>
              <a href="mailto:veego.support@gmail.com" className="text-xs font-bold text-slate-200 hover:text-emerald-400 transition-colors">
                veego.support@gmail.com
              </a>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-900/50 border border-amber-700/50 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                Consultation Response
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Within 8 Business Hours</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>&copy; {new Date().getFullYear()} <span className="text-slate-300 font-semibold">VeeGo Technologies</span>. All rights reserved.</span>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => onNavigate('/admin')}
              className="text-slate-500 hover:text-indigo-400 transition-colors font-medium"
            >
              Admin Portal
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 text-[11px] bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 text-slate-300">
              <span className="font-medium">Your Problem</span>
              <span className="text-blue-400">→</span>
              <span className="font-medium">Our Blueprint</span>
              <span className="text-blue-400">→</span>
              <span className="font-bold text-blue-400">Your Solution</span>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
