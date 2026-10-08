import React, { useState } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Building2,
  Sparkles,
  LogIn
} from 'lucide-react';
import logoImg from '../assets/logo.png';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenLoginModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenLoginModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Built by VeeGo', path: '/projects' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const isLinkActive = (item: { label: string; path: string }) => {
    if (item.path === '/') {
      return currentPath === '/' || currentPath === '/home';
    }
    return currentPath === item.path || currentPath.startsWith(item.path + '/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Tagline */}
          <button
            onClick={() => handleLinkClick('/')}
            className="flex items-center text-left group focus:outline-none"
            aria-label="VeeGo Home"
          >
            <img
              src={logoImg}
              alt="VeeGo — Understand. Build. Grow."
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-102 duration-200"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((item) => {
              const active = isLinkActive(item);
              return (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item.path)}
                  className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'text-blue-600 font-bold bg-blue-50/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenLoginModal && (
              <button
                onClick={onOpenLoginModal}
                className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-400" />
                <span>LMS Login</span>
              </button>
            )}
            <button
              onClick={() => handleLinkClick('/contact')}
              style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)', color: '#ffffff' }}
              className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl hover:opacity-95 text-white transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span style={{ color: '#ffffff' }}>Tell Us Your Problem</span>
              <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center md:hidden gap-2">
            {onOpenLoginModal && (
              <button
                onClick={onOpenLoginModal}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white flex items-center gap-1"
              >
                <LogIn className="w-3 h-3 text-blue-400" />
                <span>Login</span>
              </button>
            )}
            <button
              onClick={() => handleLinkClick('/contact')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
            >
              Solve Problem
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.path)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  isLinkActive(item)
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {onOpenLoginModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLoginModal();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <LogIn className="w-4 h-4 text-blue-400" />
                <span>LMS Portal Login</span>
              </button>
            )}
            <button
              onClick={() => handleLinkClick('/contact')}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Building2 className="w-4 h-4" />
              <span>Tell Us Your Problem</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

