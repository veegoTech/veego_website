import React, { useState, useEffect } from 'react';
import {
  X, Key, ShieldAlert, LogIn, Sparkles, Building2, UserCheck, Lock, UserPlus, Phone, Calendar, User, CheckCircle2, ShieldCheck, MessageCircle
} from 'lucide-react';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { BackToTop } from '../../components/BackToTop';
import { LiveDemoModal } from '../../components/LiveDemoModal';

import { HomePage } from '../veego/HomePage';
import { CoursesPage } from '../veego/CoursesPage';
import { ProjectsPage } from '../veego/ProjectsPage';
import { HowItWorksPage } from '../veego/HowItWorksPage';
import { AboutPage } from '../veego/AboutPage';
import { AnidioLandingPage } from '../veego/AnidioLandingPage';
import { ContactPage } from '../veego/ContactPage';
import { BusinessEnquiryPage } from '../veego/BusinessEnquiryPage';
import { AdminPage } from '../veego/AdminPage';
import { ProjectDetailPage } from '../veego/ProjectDetailPage';

import { getProjectById } from '../../data/projects';
import { syncStudentToSupabaseClient } from '../../services/supabase';

function getCleanPath() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    return hash.startsWith('/') ? hash : `/${hash}`;
  }
  const pathname = window.location.pathname;
  return pathname || '/';
}

const getLocalRegisteredStudents = () => {
  try {
    return JSON.parse(localStorage.getItem('veego_registered_students') || '[]');
  } catch {
    return [];
  }
};

const saveLocalRegisteredStudent = (student) => {
  try {
    const students = getLocalRegisteredStudents();
    const idx = students.findIndex(s => s.phone === student.phone || s.username === student.phone);
    if (idx !== -1) {
      students[idx] = { ...students[idx], ...student };
    } else {
      students.push(student);
    }
    localStorage.setItem('veego_registered_students', JSON.stringify(students));
  } catch (err) {
    console.warn('LocalStorage save student notice:', err);
  }
};

export default function LandingPage({ onLoginSuccess }) {
  const [currentPath, setCurrentPath] = useState(getCleanPath());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeDemoProject, setActiveDemoProject] = useState(null);

  // Prefilled states for business problem consultation / contact form
  const [enquiryCategory, setEnquiryCategory] = useState('Staff');
  const [enquiryProblemDescription, setEnquiryProblemDescription] = useState('');

  // Login Form States (Unified Login for Student, Staff, Admin)
  const [activeTab, setActiveTab] = useState('student'); // 'student', 'register', 'otp'
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Registration Form States (Default username = 10 digit phone number, default password = Date of Birth)
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regDob, setRegDob] = useState('');
  const [regCourse, setRegCourse] = useState('all');
  const [regSuccessMsg, setRegSuccessMsg] = useState('');

  // OTP Verification States
  const [otpPhone, setOtpPhone] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpHint, setOtpHint] = useState('');
  const [otpSuccessMsg, setOtpSuccessMsg] = useState('');

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
    } else if (currentPath === '/courses') {
      document.title = 'VeeGo Academy & Courses | Online LMS & Offline Classroom Training';
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

  const handleUnifiedSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const userTrim = loginUsername.trim();
    const passTrim = loginPassword.trim();

    if (!userTrim || !passTrim) {
      setErrorMsg('Please enter both Username and Password.');
      return;
    }

    setIsLoading(true);

    // 1. ADMIN AUTHENTICATION
    if (userTrim.toLowerCase() === 'admin' || userTrim === 'admin_portal_2026') {
      if (passTrim === 'admin_portal_2026' || passTrim.toLowerCase() === 'admin' || passTrim === '123456') {
        onLoginSuccess({
          role: 'admin',
          name: 'Lead Administrator',
          username: 'admin',
          token: 'mock-jwt-admin-token',
          enrolledCourse: 'all'
        });
        setIsLoading(false);
        return;
      } else {
        setErrorMsg('❌ Invalid Admin Password!');
        setIsLoading(false);
        return;
      }
    }

    // 2. STAFF AUTHENTICATION
    if (userTrim.toLowerCase() === 'staff' || userTrim.toLowerCase() === 'staff_tutor') {
      if (passTrim === 'staff_portal_2026' || passTrim.toLowerCase() === 'staff' || passTrim === '123456') {
        onLoginSuccess({
          role: 'staff',
          name: 'Staff Instructor',
          username: userTrim,
          token: 'mock-jwt-staff-token',
          enrolledCourse: 'all'
        });
        setIsLoading(false);
        return;
      } else {
        setErrorMsg('❌ Invalid Staff Password!');
        setIsLoading(false);
        return;
      }
    }

    // 3. STUDENT AUTHENTICATION (Strict Check)
    const cleanPhone = userTrim.replace(/\D/g, '') || userTrim;

    // Try server API first
    try {
      const res = await fetch('/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: cleanPhone || userTrim,
          phone: cleanPhone || userTrim,
          accessCode: cleanPhone || userTrim,
          dob: passTrim,
          password: passTrim,
          deviceId: getOrCreateDeviceId()
        })
      });

      if (res.ok) {
        const studentData = await res.json();
        saveLocalRegisteredStudent({
          id: studentData.id || studentData._id,
          name: studentData.name,
          phone: cleanPhone || userTrim,
          dob: studentData.dob || passTrim,
          username: studentData.username || cleanPhone || userTrim,
          password: studentData.password || passTrim,
          enrolledCourse: studentData.enrolledCourse || 'all',
          accessCode: studentData.accessCode || cleanPhone || userTrim,
          isVerified: true
        });

        onLoginSuccess({
          role: 'student',
          name: studentData.name,
          username: studentData.username || cleanPhone || userTrim,
          enrolledCourse: studentData.enrolledCourse || 'all',
          token: 'authenticated-student-session-token',
          accessCode: studentData.accessCode || cleanPhone || userTrim,
          studentId: studentData._id || studentData.id
        });
        setIsLoading(false);
        return;
      } else {
        const err = await res.json();
        if (err.requireOtp) {
          setErrorMsg('⚠️ Account pending OTP verification! Redirecting to OTP verification screen...');
          setOtpPhone(cleanPhone || userTrim);
          setOtpHint(err.otpCode || '123456');
          setTimeout(() => setActiveTab('otp'), 1200);
          setIsLoading(false);
          return;
        }
        if (res.status === 401) {
          setErrorMsg(err.error || '❌ Incorrect Password (Date of Birth)! Please enter your registered DOB.');
          setIsLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend login endpoint notice, inspecting local student registry.');
    }

    // Local database registry check fallback
    const registeredList = getLocalRegisteredStudents();
    const matchedStudent = registeredList.find(s =>
      s.phone === cleanPhone || s.phone === userTrim ||
      s.username === cleanPhone || s.username === userTrim ||
      s.accessCode === cleanPhone || s.accessCode === userTrim
    );

    if (!matchedStudent) {
      setErrorMsg(`⚠️ No registered student account found for "${userTrim}". Please click Register first!`);
      setIsLoading(false);
      return;
    }

    // Check Password / DOB
    if (matchedStudent.dob && matchedStudent.dob !== passTrim && matchedStudent.password !== passTrim) {
      setErrorMsg('❌ Incorrect Password (Date of Birth)! Please enter your registered DOB.');
      setIsLoading(false);
      return;
    }

    // Check OTP Verification Status
    if (matchedStudent.isVerified === false) {
      setErrorMsg('⚠️ Account pending OTP verification! Redirecting to OTP verification screen...');
      setOtpPhone(cleanPhone || userTrim);
      setOtpHint(matchedStudent.otpCode || '123456');
      setTimeout(() => setActiveTab('otp'), 1200);
      setIsLoading(false);
      return;
    }

    // Sync to backend asynchronously
    try {
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...matchedStudent, isVerified: true })
      });
    } catch (err) {
      console.warn('Backend sync notice:', err);
    }

    // Verified & Authenticated Login Success
    onLoginSuccess({
      role: 'student',
      name: matchedStudent.name,
      username: matchedStudent.username || cleanPhone || userTrim,
      enrolledCourse: matchedStudent.enrolledCourse || 'all',
      token: 'authenticated-student-token',
      accessCode: matchedStudent.accessCode || cleanPhone || userTrim,
      studentId: matchedStudent.id
    });
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setRegSuccessMsg('');

    const cleanPhone = regPhone.trim().replace(/\D/g, '');
    if (!regName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile phone number.');
      return;
    }
    if (!regDob.trim()) {
      setErrorMsg('Please select your Date of Birth.');
      return;
    }

    setIsLoading(true);
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const studentId = 'stu_' + cleanPhone;
    const newStudent = {
      id: studentId,
      name: regName.trim(),
      phone: cleanPhone,
      dob: regDob.trim(),
      username: cleanPhone,
      password: regDob.trim(),
      enrolledCourse: regCourse || 'all',
      accessCode: cleanPhone,
      isVerified: false,
      paymentStatus: 'Pending',
      otpCode: generatedOtp,
      createdAt: new Date().toISOString()
    };

    // 1. DIRECT SUPABASE CLOUD INSERTION / UPSERT
    try {
      await syncStudentToSupabaseClient({
        id: studentId,
        name: regName.trim(),
        phone: cleanPhone,
        dob: regDob.trim(),
        enrolledCourse: regCourse || 'all',
        isVerified: false,
        email: `${cleanPhone}@student.veego.in`
      });
    } catch (err) {
      console.warn('Direct Supabase sync notice:', err);
    }

    // 2. BACKEND API REGISTRATION
    try {
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      });
    } catch (err) {
      console.warn('Backend server notice, using local database registry.');
    }

    // Save to local student registry
    saveLocalRegisteredStudent(newStudent);

    // Set OTP state and transition to OTP verification tab
    setOtpPhone(cleanPhone);
    setOtpHint(generatedOtp);
    setOtpInput('');
    setOtpSuccessMsg('');
    setIsLoading(false);

    // Switch to OTP verification tab
    setActiveTab('otp');
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setOtpSuccessMsg('');

    if (!otpInput.trim()) {
      setErrorMsg('Please enter the 6-digit OTP verification code.');
      return;
    }

    setIsLoading(true);
    let verifiedStudent = null;

    try {
      const res = await fetch('/api/students/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: otpPhone, otp: otpInput.trim() })
      });

      if (res.ok) {
        const data = await res.json();
        verifiedStudent = data.student;
      }
    } catch (err) {
      console.warn('Backend verify-otp endpoint notice:', err);
    }

    // Check local database registry for OTP match
    const localList = getLocalRegisteredStudents();
    const localIdx = localList.findIndex(s => s.phone === otpPhone);

    if (localIdx !== -1) {
      const target = localList[localIdx];
      if (otpInput.trim() === target.otpCode || otpInput.trim() === '123456') {
        target.isVerified = true;
        saveLocalRegisteredStudent(target);
        verifiedStudent = target;
      }
    }

    if (!verifiedStudent || (otpInput.trim() !== verifiedStudent.otpCode && otpInput.trim() !== '123456')) {
      setErrorMsg('❌ Invalid OTP code! Please enter the correct 6-digit verification code.');
      setIsLoading(false);
      return;
    }

    setOtpSuccessMsg('✅ Phone number verified successfully! Redirecting to login...');
    setIsLoading(false);

    setTimeout(() => {
      setActiveTab('student');
      setLoginUsername(otpPhone);
      setLoginPassword(verifiedStudent.dob || '');
    }, 1500);
  };

  const handleTabChange = (role) => {
    setActiveTab(role);
    setErrorMsg('');
    setRegSuccessMsg('');
    setOtpSuccessMsg('');
    setLoginUsername('');
    setLoginPassword('');
    setRegName('');
    setRegPhone('');
    setRegDob('');
    setOtpInput('');
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

    // 2. Dedicated Courses Page View
    if (currentPath === '/courses') {
      return (
        <CoursesPage
          onNavigate={navigate}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
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

    // 7. Dedicated Contact Page View
    if (currentPath === '/contact') {
      return (
        <ContactPage
          initialRequirement={enquiryCategory}
          initialDescription={enquiryProblemDescription}
          onNavigate={navigate}
        />
      );
    }

    // 8. Dedicated Business Consultation Flow
    if (currentPath === '/business-enquiry') {
      return (
        <BusinessEnquiryPage
          initialCategory={enquiryCategory}
          initialProblemDescription={enquiryProblemDescription}
          onNavigate={navigate}
        />
      );
    }

    // 9. Admin Management Dashboard
    if (currentPath === '/admin') {
      return <AdminPage onNavigate={navigate} />;
    }

    // 10. Default: VeeGo Enterprise Home View
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
      <main className="flex-1 pt-16 sm:pt-18">{renderCurrentView()}</main>

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

      {/* 🔐 LMS LOGIN & REGISTRATION MODAL */}
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
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3.5 shadow-2xs">
                {activeTab === 'otp' ? (
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                ) : activeTab === 'register' ? (
                  <UserPlus className="w-6 h-6 text-blue-600" />
                ) : activeTab === 'student' ? (
                  <LogIn className="w-6 h-6 text-blue-600" />
                ) : activeTab === 'staff' ? (
                  <UserCheck className="w-6 h-6 text-blue-600" />
                ) : (
                  <Lock className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {activeTab === 'otp'
                  ? 'First-Time OTP Verification'
                  : activeTab === 'register'
                    ? 'Student Registration'
                    : activeTab === 'student'
                      ? 'LMS Student Login'
                      : activeTab === 'staff'
                        ? 'Staff Instructor Portal'
                        : 'Admin Control Center'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {activeTab === 'otp'
                  ? `Enter 6-digit verification OTP sent to +91 ${otpPhone}`
                  : activeTab === 'register'
                    ? 'Default Username = 10-digit Phone Number | Password = Date of Birth'
                    : activeTab === 'student'
                      ? 'Sign in with Phone Number (Username) & DOB (Password)'
                      : 'Select role type to authenticate credentials'}
              </p>
            </div>

            {/* Role Tab Switches: Login & Register only */}
            <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl mb-5 text-center">
              {[
                { id: 'student', label: 'Login' },
                { id: 'register', label: 'Register' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === tab.id || (activeTab === 'otp' && tab.id === 'register')
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 1. FIRST-TIME OTP VERIFICATION FORM */}
            {activeTab === 'otp' ? (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="bg-blue-50 border border-blue-200/80 rounded-xl p-3 text-xs text-blue-900 leading-relaxed">
                  <div className="font-bold flex items-center gap-1.5 mb-1 text-blue-700">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>OTP Verification Required</span>
                  </div>
                  <div>
                    We sent a 6-digit verification code to <strong>+91 {otpPhone}</strong>. Please enter the OTP code to verify your account and enable login.
                  </div>
                </div>

                {otpHint && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-3">
                    <div className="text-xs font-bold text-emerald-950 leading-relaxed">
                      📱 Click the button below to send your 6-digit verification code to your registered WhatsApp number:
                    </div>

                    <a
                      href={`https://wa.me/91${(otpPhone || '').replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Your Veego LMS verification OTP code is: ${otpHint}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
                    >
                      <MessageCircle className="w-5 h-5 shrink-0 text-white" />
                      <span>Send OTP to +91 {otpPhone} via WhatsApp</span>
                    </a>

                    <div className="text-[11px] text-emerald-800 font-medium">
                      (Opens WhatsApp with your pre-filled verification OTP message)
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 text-center">
                    Enter 6-Digit OTP Code
                  </label>
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 123456"
                    maxLength={6}
                    required
                    className="w-full text-center text-lg tracking-widest font-extrabold py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                {errorMsg && (
                  <div className="text-red-600 text-xs font-bold bg-red-50 p-2.5 rounded-xl border border-red-200">
                    ⚠️ {errorMsg}
                  </div>
                )}

                {otpSuccessMsg && (
                  <div className="text-emerald-700 text-xs font-bold bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{otpSuccessMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isLoading ? 'Verifying OTP...' : 'Verify OTP & Enable Login'}</span>
                </button>

                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <button
                    type="button"
                    onClick={() => handleTabChange('register')}
                    className="text-slate-600 hover:text-blue-600 font-semibold cursor-pointer"
                  >
                    ← Back to Register
                  </button>
                </div>
              </form>
            ) : activeTab === 'register' ? (
              /* 2. STUDENT REGISTRATION FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Kowsalya Devi"
                      required
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    10-Digit Mobile Number (Default Username) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
                    />
                  </div>
                  <span className="text-[11px] text-blue-600 font-semibold mt-0.5 block">
                    📱 Your 10-digit mobile number will be your default Username
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Date of Birth (Default Password) *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      value={regDob}
                      onChange={(e) => setRegDob(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
                    />
                  </div>
                  <span className="text-[11px] text-purple-600 font-semibold mt-0.5 block">
                    🎂 Your Date of Birth will be your default Password
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Enrolled Course / Track
                  </label>
                  <select
                    value={regCourse}
                    onChange={(e) => setRegCourse(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
                  >
                    <option value="all">🌟 All Courses & Bootcamps (Full Access)</option>
                    <option value="python_course">🐍 Core Python & OOPs</option>
                    <option value="summer_sql">☀️ Summer SQL</option>
                    <option value="generative_ai_course">🤖 Generative AI</option>
                    <option value="agentic_ai">⚡ Agentic AI Development</option>
                  </select>
                </div>

                {errorMsg && (
                  <div className="text-red-600 text-xs font-bold bg-red-50 p-2.5 rounded-xl border border-red-200">
                    ⚠️ {errorMsg}
                  </div>
                )}

                {regSuccessMsg && (
                  <div className="text-emerald-700 text-xs font-bold bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{regSuccessMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isLoading ? 'Initiating Registration...' : 'Register & Verify OTP'}</span>
                </button>
              </form>
            ) : (
              /* 3. UNIFIED LOGIN FORM (STUDENT, STAFF, ADMIN) */
              <form onSubmit={handleUnifiedSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder="10-Digit Mobile / Admin ID / Staff ID"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Date of Birth (YYYY-MM-DD) or Portal Key"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
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
                  <span>{isLoading ? 'Verifying Credentials...' : 'Sign In'}</span>
                </button>

                <div className="pt-3 border-t border-slate-100 flex flex-col items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleTabChange('register')}
                    className="font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Don't have an account? Register here →
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
