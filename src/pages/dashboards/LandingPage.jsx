import React, { useState, useEffect } from 'react';
import {
  X, Key, ShieldAlert, LogIn, Sparkles, Building2, UserCheck, Lock
} from 'lucide-react';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { BackToTop } from '../../components/BackToTop';
import { LiveDemoModal } from '../../components/LiveDemoModal';

import { HomePage } from '../veego/HomePage';
import { SolutionsPage } from '../veego/SolutionsPage';
import { ProjectsPage } from '../veego/ProjectsPage';
import { HowItWorksPage } from '../veego/HowItWorksPage';
import { AboutPage } from '../veego/AboutPage';
import { ContactPage } from '../veego/ContactPage';
import { BusinessEnquiryPage } from '../veego/BusinessEnquiryPage';
import { AdminPage } from '../veego/AdminPage';
import { ProjectDetailPage } from '../veego/ProjectDetailPage';

import { getProjectById } from '../../data/projects';

function getCleanPath() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    return hash.startsWith('/') ? hash : `/${hash}`;
  }
  const pathname = window.location.pathname;
  return pathname || '/';
}

export default function LandingPage({ onLoginSuccess }) {
  const [currentPath, setCurrentPath] = useState(getCleanPath());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeDemoProject, setActiveDemoProject] = useState(null);

  // Prefilled states for business problem consultation / contact form
  const [enquiryCategory, setEnquiryCategory] = useState('Staff');
  const [enquiryProblemDescription, setEnquiryProblemDescription] = useState('');

  // Login Form States
  const [activeTab, setActiveTab] = useState('student');
  const [accessCode, setAccessCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const path = getCleanPath();
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (path) => {
    const cleanPath = path.replace('/#', '/').replace('#', '/');
    const normalized = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

    window.history.pushState(null, '', normalized);
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Dynamic SEO Page Titles
  useEffect(() => {
    if (currentPath === '/' || currentPath === '/home') {
      document.title = 'VeeGo | Understand. Build. Grow. — We Go Through Your Problem. We Give You the Solution.';
    } else if (currentPath === '/solutions') {
      document.title = 'VeeGo Business Solutions | Understand. Build. Grow.';
    } else if (currentPath === '/projects') {
      document.title = 'Built by VeeGo | Production Systems & Case Studies';
    } else if (currentPath === '/how-it-works') {
      document.title = 'How It Works | Understand • Build • Grow — VeeGo';
    } else if (currentPath === '/about') {
      document.title = 'About VeeGo | The Meaning of VeeGo & Philosophy';
    } else if (currentPath === '/contact') {
      document.title = 'Contact VeeGo Engineers | Direct Problem Consultation';
    } else if (currentPath === '/business-enquiry') {
      document.title = 'What Problem Are You Trying to Solve? | VeeGo Consultation';
    } else if (currentPath === '/admin') {
      document.title = 'VeeGo Admin Dashboard | Maintain Projects & Client Enquiries';
    } else if (currentPath.startsWith('/projects/')) {
      const pId = currentPath.replace('/projects/', '');
      const proj = getProjectById(pId);
      document.title = proj ? `${proj.name} Case Study | Built by VeeGo` : 'Built by VeeGo';
    } else {
      document.title = 'VeeGo | Understand. Build. Grow.';
    }
  }, [currentPath]);

  const getOrCreateDeviceId = () => {
    let id = localStorage.getItem('lms_device_uuid');
    if (!id) {
      id = 'dev-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('lms_device_uuid', id);
    }
    return id;
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!accessCode.trim()) {
      setErrorMsg('Please enter your Access Code.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessCode: accessCode.trim(), deviceId: getOrCreateDeviceId() })
      });
      if (res.ok) {
        const studentData = await res.json();
        onLoginSuccess({
          role: 'student',
          name: studentData.name,
          username: studentData.accessCode,
          enrolledCourse: studentData.enrolledCourse || 'all',
          token: 'mock-student-session-token',
          accessCode: studentData.accessCode,
          studentId: studentData._id || studentData.id
        });
      } else {
        const err = await res.json();
        setErrorMsg(err.error || 'Login failed. Check Access Key.');
      }
    } catch (err) {
      // Fallback demo student login if server offline
      if (accessCode.trim().length > 0) {
        onLoginSuccess({
          role: 'student',
          name: 'Student (' + accessCode.trim() + ')',
          username: accessCode.trim(),
          enrolledCourse: 'all',
          token: 'demo-student-token',
          accessCode: accessCode.trim()
        });
      } else {
        setErrorMsg('Could not reach database server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStaffAdminSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Username and password are required.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: activeTab, username: username.trim(), password: password.trim() })
      });
      if (res.ok) {
        const authData = await res.json();
        onLoginSuccess({
          role: authData.role,
          name: authData.name,
          username: authData.username,
          token: authData.token,
          enrolledCourse: 'all'
        });
      } else {
        const err = await res.json();
        setErrorMsg(err.error || 'Invalid credentials.');
      }
    } catch (err) {
      // Fallback demo staff/admin login if server offline
      if (username.trim() && password.trim()) {
        onLoginSuccess({
          role: activeTab,
          name: activeTab.toUpperCase() + ' User',
          username: username.trim(),
          token: 'demo-staff-token',
          enrolledCourse: 'all'
        });
      } else {
        setErrorMsg('Could not reach database server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (role) => {
    setActiveTab(role);
    setErrorMsg('');
    setAccessCode('');
    setUsername('');
    setPassword('');
  };

  const renderCurrentView = () => {
    // 1. Project Detail View
    if (currentPath.startsWith('/projects/')) {
      const projectId = currentPath.replace('/projects/', '');
      const project = getProjectById(projectId);

      if (project) {
        return (
          <ProjectDetailPage
            project={project}
            onBack={() => navigate('/projects')}
            onOpenLiveDemo={(p) => setActiveDemoProject(p)}
            onDiscussSimilarProblem={(projectName) => {
              setEnquiryCategory(project.category === 'Education Technology' ? 'Education' : 'Staff');
              setEnquiryProblemDescription(`Interested in deploying or tailoring a system like ${projectName} for our company.`);
              navigate('/contact');
            }}
          />
        );
      }
    }

    // 2. Dedicated Solutions Page View
    if (currentPath === '/solutions') {
      return (
        <SolutionsPage
          onNavigate={navigate}
          onExploreSolution={(sol) => {
            setEnquiryCategory(
              sol.id.includes('staff')
                ? 'Staff'
                : sol.id.includes('billing')
                ? 'Billing'
                : sol.id.includes('lead')
                ? 'Sales'
                : sol.id.includes('education')
                ? 'Education'
                : sol.id.includes('ai')
                ? 'AI'
                : 'Automation'
            );
            setEnquiryProblemDescription(`Requesting consultation on: ${sol.title}\nWorkflow challenge: ${sol.problem}`);
            navigate('/contact');
          }}
        />
      );
    }

    // 3. Dedicated Projects Page View
    if (currentPath === '/projects') {
      return (
        <ProjectsPage
          onNavigate={navigate}
          onOpenLiveDemo={(p) => setActiveDemoProject(p)}
        />
      );
    }

    // 4. Dedicated How It Works Page View
    if (currentPath === '/how-it-works') {
      return <HowItWorksPage onNavigate={navigate} />;
    }

    // 5. Dedicated About Page View
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // 6. Dedicated Contact Page View
    if (currentPath === '/contact') {
      return (
        <ContactPage
          initialRequirement={enquiryCategory}
          initialDescription={enquiryProblemDescription}
          onNavigate={navigate}
        />
      );
    }

    // 7. Dedicated Business Consultation Flow
    if (currentPath === '/business-enquiry') {
      return (
        <BusinessEnquiryPage
          initialCategory={enquiryCategory}
          initialProblemDescription={enquiryProblemDescription}
          onNavigate={navigate}
        />
      );
    }

    // 8. Admin Management Dashboard
    if (currentPath === '/admin') {
      return <AdminPage onNavigate={navigate} />;
    }

    // 9. Default: Home Page View
    return (
      <HomePage
        onNavigate={navigate}
        onOpenLiveDemo={(p) => setActiveDemoProject(p)}
        onDiscussProblem={(prob) => {
          setEnquiryCategory(
            prob.id.includes('staff')
              ? 'Staff'
              : prob.id.includes('billing')
              ? 'Billing'
              : prob.id.includes('followup')
              ? 'Sales'
              : prob.id.includes('report')
              ? 'Reports'
              : prob.id.includes('data')
              ? 'Data'
              : prob.id.includes('student')
              ? 'Education'
              : 'Automation'
          );
          setEnquiryProblemDescription(`Problem: ${prob.problem}\nDaily friction: ${prob.symptom}`);
          navigate('/contact');
        }}
        onExploreSolution={(sol) => {
          setEnquiryCategory(
            sol.id.includes('staff')
              ? 'Staff'
              : sol.id.includes('billing')
              ? 'Billing'
              : sol.id.includes('lead')
              ? 'Sales'
              : sol.id.includes('education')
              ? 'Education'
              : sol.id.includes('ai')
              ? 'AI'
              : 'Automation'
          );
          setEnquiryProblemDescription(`Requesting consultation on: ${sol.title}\nWorkflow challenge: ${sol.problem}`);
          navigate('/contact');
        }}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      {/* Clean VeeGo Navbar with LMS Portal Login */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Main SPA Route View */}
      <main className="flex-1">{renderCurrentView()}</main>

      {/* Interactive Live Demo Modal */}
      {activeDemoProject && (
        <LiveDemoModal
          project={activeDemoProject}
          onClose={() => setActiveDemoProject(null)}
          onContactClick={() => {
            const name = activeDemoProject.name;
            setActiveDemoProject(null);
            setEnquiryCategory(activeDemoProject.category === 'Education Technology' ? 'Education' : 'Staff');
            setEnquiryProblemDescription(`We tested the live demo for ${name} and would like to discuss implementation for our business.`);
            navigate('/contact');
          }}
        />
      )}

      {/* Floating Back-To-Top Button */}
      <BackToTop />

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* 🔐 LMS LOGIN MODAL */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative border border-slate-200">
            {/* Close Button */}
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <LogIn className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">LMS Study Portal</h3>
              <p className="text-xs text-slate-500 mt-1">Select role type to authenticate credentials</p>
            </div>

            {/* Role Tab Switches */}
            <div className="grid grid-cols-3 bg-slate-100 p-1 rounded-xl mb-6">
              {['student', 'staff', 'admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => handleTabChange(role)}
                  className={`py-2 text-xs font-bold capitalize rounded-lg transition-all ${
                    activeTab === role
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Student Auth Form */}
            {activeTab === 'student' ? (
              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Access Key Code
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="e.g. STU-1234"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200/60 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Device Security:</strong> Student keys bind dynamically to your first logging browser device.
                  </span>
                </div>

                {errorMsg && (
                  <div className="text-red-600 text-xs font-bold bg-red-50 p-2.5 rounded-xl border border-red-200">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{isLoading ? 'Verifying access key...' : 'Access LMS Portal'}</span>
                </button>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setAccessCode('STU-DEMO');
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Auto-fill Demo Key (STU-DEMO)
                  </button>
                </div>
              </form>
            ) : (
              /* Staff/Admin Auth Form */
              <form onSubmit={handleStaffAdminSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Username ID
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password Key
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="text-red-600 text-xs font-bold bg-red-50 p-2.5 rounded-xl border border-red-200">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{isLoading ? 'Verifying credentials...' : `Authenticate as ${activeTab}`}</span>
                </button>

                <div className="pt-2 border-t border-slate-100 text-center flex flex-col gap-1 items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (activeTab === 'admin') {
                        setUsername('admin');
                        setPassword('admin_portal_2026');
                      } else {
                        setUsername('staff');
                        setPassword('staff_portal_2026');
                      }
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                  >
                    Auto-fill Demo {activeTab.toUpperCase()} Credentials ({activeTab === 'admin' ? 'admin / admin_portal_2026' : 'staff / staff_portal_2026'})
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
