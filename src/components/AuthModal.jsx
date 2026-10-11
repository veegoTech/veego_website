import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  User,
  Phone,
  Calendar,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  AlertCircle,
  ArrowRight,
  Shield,
  Building2,
  GraduationCap,
  RefreshCw,
  Rocket
} from 'lucide-react';
import { syncStudentToSupabaseClient } from '../services/supabase';

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
    const idx = students.findIndex(s => s.phone === student.phone || s.username === student.phone || s.id === student.id);
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

export const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  // Active view: 'login' | 'register' | 'otp'
  const [activeTab, setActiveTab] = useState('login');

  // Login Form States (Unified: Phone Number / Student ID + DOB)
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Registration Form States
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regDob, setRegDob] = useState('');
  const [regCourse, setRegCourse] = useState('all');

  // OTP Verification States
  const [otpPhone, setOtpPhone] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpHint, setOtpHint] = useState('');
  const [otpSuccessMsg, setOtpSuccessMsg] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  const otpInputRefs = useRef([]);

  // Auto decrement resend timer
  useEffect(() => {
    let interval = null;
    if (activeTab === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTab, resendTimer]);

  const getOrCreateDeviceId = () => {
    let id = localStorage.getItem('lms_device_uuid');
    if (!id) {
      id = 'dev-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('lms_device_uuid', id);
    }
    return id;
  };

  // Submit Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const userTrim = loginUsername.trim();
    const passTrim = loginPassword.trim();

    if (!userTrim || !passTrim) {
      setErrorMsg('Please enter both Phone Number / Student ID and Date of Birth (Password).');
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
        onClose();
        return;
      } else {
        setErrorMsg('Invalid Administrator password. Please recheck your credentials.');
        setIsLoading(false);
        return;
      }
    }

    // 2. STAFF INSTRUCTOR AUTHENTICATION
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
        onClose();
        return;
      } else {
        setErrorMsg('Invalid Staff Instructor credentials.');
        setIsLoading(false);
        return;
      }
    }

    // 3. STUDENT AUTHENTICATION (Phone Number / Student ID + Date of Birth)
    const cleanPhone = userTrim.replace(/\D/g, '') || userTrim;

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
        onClose();
        return;
      } else {
        const err = await res.json();
        if (err.requireOtp) {
          setErrorMsg('Account pending verification! Redirecting to OTP screen...');
          setOtpPhone(cleanPhone || userTrim);
          setOtpHint(err.otpCode || '123456');
          setOtpDigits(['', '', '', '', '', '']);
          setTimeout(() => setActiveTab('otp'), 1000);
          setIsLoading(false);
          return;
        }
        if (res.status === 401) {
          setErrorMsg(err.error || 'Incorrect Date of Birth! Please enter your registered DOB (YYYY-MM-DD).');
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Local fallback
    }

    // Local check fallback
    const registeredList = getLocalRegisteredStudents();
    const matchedStudent = registeredList.find(s =>
      s.phone === cleanPhone || s.phone === userTrim ||
      s.username === cleanPhone || s.username === userTrim ||
      s.id === userTrim || s.id === `stu_${cleanPhone}` ||
      s.accessCode === cleanPhone || s.accessCode === userTrim
    );

    if (!matchedStudent) {
      setErrorMsg(`No student record found for "${userTrim}". Please click Register to create your account!`);
      setIsLoading(false);
      return;
    }

    if (matchedStudent.dob && matchedStudent.dob !== passTrim && matchedStudent.password !== passTrim) {
      setErrorMsg('Incorrect Password (DOB)! Please enter your registered Date of Birth (YYYY-MM-DD).');
      setIsLoading(false);
      return;
    }

    if (matchedStudent.isVerified === false) {
      setErrorMsg('Account pending verification! Redirecting to OTP screen...');
      setOtpPhone(cleanPhone || userTrim);
      setOtpHint(matchedStudent.otpCode || '123456');
      setOtpDigits(['', '', '', '', '', '']);
      setTimeout(() => setActiveTab('otp'), 1000);
      setIsLoading(false);
      return;
    }

    try {
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...matchedStudent, isVerified: true })
      });
    } catch (err) {
      console.warn('Backend sync notice:', err);
    }

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
    onClose();
  };

  // Submit Registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

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
      console.warn('Supabase sync notice:', err);
    }

    try {
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      });
    } catch (err) {
      console.warn('Backend server notice:', err);
    }

    saveLocalRegisteredStudent(newStudent);

    setOtpPhone(cleanPhone);
    setOtpHint(generatedOtp);
    setOtpDigits(['', '', '', '', '', '']);
    setIsLoading(false);
    setResendTimer(30);
    setActiveTab('otp');
  };

  // Handle OTP digit changes
  const handleOtpDigitChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, '').slice(-1);
    const nextDigits = [...otpDigits];
    nextDigits[index] = cleanVal;
    setOtpDigits(nextDigits);

    if (cleanVal && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasteData) {
      const nextDigits = ['', '', '', '', '', ''];
      for (let i = 0; i < pasteData.length; i++) {
        nextDigits[i] = pasteData[i];
      }
      setOtpDigits(nextDigits);
      const focusIndex = Math.min(pasteData.length, 5);
      otpInputRefs.current[focusIndex]?.focus();
    }
  };

  const handleFillDemoOtp = () => {
    const code = otpHint || '123456';
    const nextDigits = code.split('').slice(0, 6);
    setOtpDigits(nextDigits);
  };

  // Submit OTP Verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setOtpSuccessMsg('');

    const otpCombined = otpDigits.join('');
    if (otpCombined.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the OTP verification code.');
      return;
    }

    setIsLoading(true);
    let verifiedStudent = null;

    try {
      const res = await fetch('/api/students/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: otpPhone, otp: otpCombined })
      });

      if (res.ok) {
        const data = await res.json();
        verifiedStudent = data.student;
      }
    } catch (err) {
      console.warn('Backend verify-otp notice:', err);
    }

    const localList = getLocalRegisteredStudents();
    const localIdx = localList.findIndex(s => s.phone === otpPhone);

    if (localIdx !== -1) {
      const target = localList[localIdx];
      if (otpCombined === target.otpCode || otpCombined === '123456' || otpCombined === otpHint) {
        target.isVerified = true;
        saveLocalRegisteredStudent(target);
        verifiedStudent = target;
      }
    }

    if (!verifiedStudent || (otpCombined !== verifiedStudent.otpCode && otpCombined !== '123456' && otpCombined !== otpHint)) {
      setErrorMsg('Invalid verification code! Please enter the correct code.');
      setIsLoading(false);
      return;
    }

    setOtpSuccessMsg('Phone verified successfully! Signing you in...');
    setIsLoading(false);

    setTimeout(() => {
      onLoginSuccess({
        role: 'student',
        name: verifiedStudent.name,
        username: verifiedStudent.username || otpPhone,
        enrolledCourse: verifiedStudent.enrolledCourse || 'all',
        token: 'authenticated-student-token',
        accessCode: verifiedStudent.accessCode || otpPhone,
        studentId: verifiedStudent.id
      });
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl my-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden shadow-indigo-950/60 flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 transition-all cursor-pointer shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================= LEFT COLUMN: AUTHENTICATION FORM ================= */}
        <div className="md:w-7/12 bg-slate-900 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800/80">
          <div>
            {/* BRAND HEADER */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-indigo-500/30">
                V
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white font-space">VeeGo</span>
                <span className="text-[10px] font-bold px-2 py-0.5 ml-2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  LMS Portal
                </span>
              </div>
            </div>

            {/* TAB SELECTOR */}
            {activeTab !== 'otp' && (
              <div className="flex items-center p-1 bg-slate-800/80 rounded-xl border border-slate-700/60 mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMsg('');
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === 'login'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setErrorMsg('');
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === 'register'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}

            {/* ERROR BANNER */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {/* ---------------- 1. LOGIN VIEW ---------------- */}
            {activeTab === 'login' && (
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white font-space">Access Your Account</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sign in with your phone number / student ID and date of birth.
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* USERNAME (PHONE NUMBER / STU-ID) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number or Student ID
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        placeholder="10-digit mobile or student ID"
                        required
                        className="w-full pl-10 pr-4 py-2.5 auth-input rounded-xl text-sm placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* PASSWORD (DATE OF BIRTH) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        Date of Birth (Password)
                      </label>
                      <span className="text-[11px] text-indigo-400 font-medium">YYYY-MM-DD</span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="YYYY-MM-DD"
                        required
                        className="w-full pl-10 pr-11 py-2.5 auth-input rounded-xl text-sm placeholder-slate-400 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('register');
                        setErrorMsg('');
                      }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                    >
                      Don&apos;t have an account? <span className="underline font-bold">Register</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ---------------- 2. REGISTER VIEW ---------------- */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-white font-space">Create Student Account</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Register with your phone number and date of birth for instant access.
                  </p>
                </div>

                {/* FULL NAME */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Kowsalya Devi"
                      required
                      className="w-full pl-10 pr-4 py-2 auth-input rounded-xl text-sm placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* 10-DIGIT MOBILE NUMBER */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-300">
                      10-Digit Mobile Number *
                    </label>
                    <span className="text-[10px] text-indigo-400 font-medium">Always Your Username</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="9876543210"
                      maxLength={10}
                      required
                      className="w-full pl-10 pr-4 py-2 auth-input rounded-xl text-sm placeholder-slate-400 font-mono"
                    />
                  </div>
                </div>

                {/* DATE OF BIRTH */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-300">
                      Date of Birth *
                    </label>
                    <span className="text-[10px] text-purple-400 font-medium">Always Your Password</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      value={regDob}
                      onChange={(e) => setRegDob(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2 auth-input rounded-xl text-sm placeholder-slate-400 [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* COURSE TRACK */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Enrolled Track / Curriculum
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <select
                      value={regCourse}
                      onChange={(e) => setRegCourse(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 auth-input rounded-xl text-sm cursor-pointer"
                    >

                      <option value="python_course">Core Python & OOPs</option>
                      <option value="summer_sql">Summer SQL & Analytics</option>
                      <option value="generative_ai_course">Generative AI & Prompt Engineering</option>
                      <option value="agentic_ai">Agentic AI Development</option>
                    </select>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing Registration...</span>
                    </div>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Proceed to OTP Verification</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>

                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('login');
                      setErrorMsg('');
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer"
                  >
                    Already registered? <span className="underline font-bold">Sign in here →</span>
                  </button>
                </div>
              </form>
            )}

            {/* ---------------- 3. OTP VERIFICATION VIEW ---------------- */}
            {activeTab === 'otp' && (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="text-center mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mx-auto mb-2 text-indigo-400 shadow-lg shadow-indigo-500/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-space">
                    Verify Your Mobile Number
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    We sent a 6-digit confirmation code to{' '}
                    <span className="font-bold text-indigo-300">+91 {otpPhone}</span>
                  </p>
                </div>

                {/* TEST OTP HELPER BADGE */}
                {otpHint && (
                  <div className="bg-indigo-950/60 border border-indigo-800/60 rounded-xl p-2.5 flex items-center justify-between text-xs text-indigo-200">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Test Code: <strong className="font-mono text-white tracking-widest">{otpHint}</strong></span>
                    </div>
                    <button
                      type="button"
                      onClick={handleFillDemoOtp}
                      className="px-2 py-0.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] cursor-pointer transition-colors"
                    >
                      Fill Code
                    </button>
                  </div>
                )}

                {/* 6 SEGMENTED INPUT BOXES */}
                <div className="flex justify-center items-center gap-2 sm:gap-2.5 my-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={idx === 0 ? handleOtpPaste : undefined}
                      className="w-10 sm:w-12 h-12 sm:h-14 text-center text-xl sm:text-2xl font-extrabold font-mono rounded-xl auth-input shadow-inner"
                    />
                  ))}
                </div>

                {otpSuccessMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center gap-2 text-xs text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{otpSuccessMsg}</span>
                  </div>
                )}

                {/* VERIFY BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Validating Code...</span>
                    </div>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm & Complete Sign In</span>
                    </>
                  )}
                </button>

                {/* RESEND & BACK OPTIONS */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('register');
                      setErrorMsg('');
                    }}
                    className="hover:text-white font-semibold transition-colors cursor-pointer"
                  >
                    ← Edit Mobile Number
                  </button>

                  <button
                    type="button"
                    disabled={resendTimer > 0}
                    onClick={() => {
                      setResendTimer(30);
                      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                      setOtpHint(newCode);
                    }}
                    className={`font-semibold transition-colors ${resendTimer > 0 ? 'text-slate-600 cursor-not-allowed' : 'text-indigo-400 hover:text-indigo-300 cursor-pointer'
                      }`}
                  >
                    {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* FOOTER SECURITY BADGE */}
        </div>

        {/* ================= RIGHT COLUMN: SERVICES VEEGO PROVIDES (CLEAN & STREAMLINED) ================= */}
        <div className="lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-[11px] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>VeeGo Ecosystem</span>
            </div>

            <h3 className="text-xl font-extrabold text-white font-space leading-tight mb-1">
              What VeeGo Delivers
            </h3>
            <p className="text-slate-400 text-xs mb-5">
              Empowering businesses, college graduates, and engineering talent.
            </p>

            {/* THREE SLEEK SERVICE ITEMS */}
            <div className="space-y-3">
              {/* 1. For Business People */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/40 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                        For Business People
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-0.5">
                      Business Automation & Web Development
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Custom ERP/CRM systems, automated workflow pipelines & bespoke web applications.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. For College Students */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/40 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        For College Students
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-0.5">
                      College Projects & Practical Implementations
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Academic mini/final-year projects with production source code, documentation & viva prep.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. For Upskilling */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-purple-500/40 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                        For Upskilling
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-0.5">
                      Online, Offline & Self-Study Courses
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Hands-on cohorts in Python, SQL, Generative AI & Agentic AI with mentor reviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Cohort Enrolling
              </span>
              <span>Understand • Build • Grow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
