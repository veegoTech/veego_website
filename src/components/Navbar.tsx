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
    { label: 'Courses', path: '/courses', badge: '₹499' },
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
    return currentPath === item.path || currentPath.startsWith(item.path + '/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center text-left group focus:outline-none"
            aria-label="VeeGo Home"
          >
            <img
              src={logoImg}
              alt="VeeGo — Understand. Build. Grow."
              className="h-9 sm:h-10.5 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((item) => {
              const active = isLinkActive(item);
              return (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${active
                    ? 'border border-slate-900 text-blue-600 font-bold bg-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-purple-100/80 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-purple-200/60">
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
              className="px-4 py-2 text-xs sm:text-sm font-bold rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-5 py-2 text-xs sm:text-sm font-bold rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
            >
              <span className="text-white">Tell Us Your Problem</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => onOpenLoginModal?.()}
              className="px-3 py-1.5 text-xs font-bold rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center gap-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
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
                onClick={() => handleLinkClick(item)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${isLinkActive(item)
                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                  : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLoginModal?.();
              }}
              className="w-full py-2.5 px-4 rounded-full border border-blue-600 text-blue-600 font-bold text-xs flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Login / Register</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/contact');
              }}
              className="w-full py-2.5 px-4 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
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
