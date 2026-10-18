import React, { useState } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Building2,
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
    { label: 'Projects', path: '/projects' },
    { label: 'Courses', path: '/courses', badge: '' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleLinkClick = (item: { label: string; path: string }) => {
    setMobileMenuOpen(false);
    onNavigate(item.path);
  };

  const isLinkActive = (item: { label: string; path: string }) => {
    if (item.path === '/') {
      return currentPath === '/' || currentPath === '/home';
    }
    if (item.path === '/courses') {
      return currentPath === '/courses' || currentPath === '/course' || currentPath.startsWith('/courses/') || currentPath.startsWith('/course/');
    }
    return currentPath === item.path || currentPath.startsWith(item.path + '/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center text-left group focus:outline-none cursor-pointer"
            aria-label="VeeGo Home"
          >
            <img
              src={logoImg}
              alt="VeeGo — Understand. Build. Grow."
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02] duration-150"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isLinkActive(item);
              return (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item)}
                  className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${active
                    ? 'border border-slate-900 text-white bg-slate-900'
                    : 'border border-transparent text-slate-600 hover:text-slate-950 hover:bg-slate-100 hover:border-slate-200'
                    }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-[4px] border ${active ? 'bg-slate-800 text-blue-300 border-slate-700' : 'bg-slate-100 text-blue-700 border-blue-200'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons: Login & Tell Us Your Problem */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => onOpenLoginModal?.()}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] border border-slate-300 text-slate-900 bg-white hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-700" />
              <span>Login</span>
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white transition-colors border border-blue-600 flex items-center gap-2 cursor-pointer group whitespace-nowrap"
            >
              <span>Tell Us Your Problem</span>
              <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => onOpenLoginModal?.()}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-[4px] border border-slate-300 text-slate-900 bg-white hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-[4px] border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item)}
                className={`w-full text-left px-3 py-2.5 rounded-[4px] text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer ${isLinkActive(item)
                  ? 'bg-slate-900 text-white border border-slate-900'
                  : 'text-slate-700 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-slate-100 text-blue-700 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-[4px] border border-blue-200">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLoginModal?.();
              }}
              className="w-full py-2.5 px-4 rounded-[4px] border border-slate-300 text-slate-900 bg-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-100"
            >
              <LogIn className="w-4 h-4" />
              <span>Login / Register</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/contact');
              }}
              className="w-full py-2.5 px-4 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border border-blue-600"
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
