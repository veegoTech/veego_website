import React, { useState, useEffect } from 'react';
import {
  LayoutTemplate, Database, Code, ArrowRight, Sparkles, Bot, Terminal, Brain,
  UserPlus, Users, LogIn, LogOut, CheckCircle, BarChart3, Layers, GitBranch,
  Server, RefreshCw, Trash2, Key, Star, ShieldAlert, Award, Grid, HelpCircle,
  BookOpen, ExternalLink, Upload, Download, FileText, Lock, AlertTriangle, Menu, X,
  Search, ChevronLeft, ChevronRight, Copy, Receipt, Briefcase,
  CreditCard, FileCheck2
} from 'lucide-react';
import {
  getAssignmentValidations,
  saveAssignmentValidation,
  HTML_CSS_ASSIGNMENTS_CONFIG,
  isModuleLocked
} from '../../utils/htmlCssLocking';
import * as CourseData from '../../courseData';
import InvoiceGenerator from '../invoice/InvoiceGenerator';
import CertificateManager from '../certificate/CertificateManager';

const mainCourses = [
  {
    id: 'python_main',
    title: 'Core Python & OOPs',
    desc: 'Master Python syntax, functions, object-oriented programming, data structures, and practical logic.',
    icon: <Terminal size={24} />,
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
    bgLight: 'rgba(14, 165, 233, 0.08)'
  },
  {
    id: 'summer',
    title: 'Summer SQL Program',
    desc: 'Rapid database fundamentals, relational querying, joins, filters, and SQL structures in 7 days.',
    icon: <Database size={24} />,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    bgLight: 'rgba(16, 185, 129, 0.08)'
  },
  {
    id: 'aidevelopment',
    title: 'Cognitive AI Development',
    desc: 'Language models fine-tuning, prompt engineering structures, vector DBs, and agentic AI systems.',
    icon: <Brain size={24} />,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #f472b6 0%, #be185d 100%)',
    bgLight: 'rgba(236, 72, 153, 0.08)'
  }
];

const subCourses = [
  {
    id: 'python_course',
    mainCourseId: 'python_main',
    title: 'Python Core & OOPs Course',
    desc: 'Master variables, loops, file streams, regex, and core object-oriented structures with AI enhancements.',
    icon: <Terminal size={24} />,
    bgColor: 'rgba(14, 165, 233, 0.08)',
    borderColor: '#0ea5e9',
    shadowColor: 'rgba(14,165,233,0.15)',
    modulesCount: '13 Modules',
    enrolledKey: 'python_course'
  },
  {
    id: 'summer_sql',
    mainCourseId: 'summer',
    title: 'Summer SQL Crash Course',
    desc: 'Learn primary relational commands, simple select filters, group calculations, and database structures in 7 days.',
    icon: <Database size={24} />,
    bgColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: '#10b981',
    shadowColor: 'rgba(16,185,129,0.15)',
    modulesCount: '7 Days (7 Modules)',
    enrolledKey: 'summer_sql'
  },
  {
    id: 'generative_ai_course',
    mainCourseId: 'aidevelopment',
    title: 'Generative AI Masterclass',
    desc: 'Master prompt structuring, token contexts, API structures, context constraints, and AI ethics benchmarks.',
    icon: <Bot size={24} />,
    bgColor: 'rgba(219, 39, 119, 0.08)',
    borderColor: '#ec4899',
    shadowColor: 'rgba(219,39,119,0.15)',
    modulesCount: '20 Days (4 Modules)',
    enrolledKey: 'generative_ai_course'
  },
  {
    id: 'agentic_ai',
    mainCourseId: 'aidevelopment',
    title: 'Agentic AI Engineering',
    desc: 'Master multi-agent systems, CrewAI schemas, Agno AI tools calling, Flowise visual designs, and LangChain loops.',
    icon: <Brain size={24} />,
    bgColor: 'rgba(124, 58, 237, 0.08)',
    borderColor: '#818cf8',
    shadowColor: 'rgba(124,58,237,0.15)',
    modulesCount: '40 Days (8 Modules)',
    enrolledKey: 'agentic_ai'
  }
];

const formatSubmittedDate = (dateStr) => {
  if (!dateStr) return 'Recently';
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  } catch (e) { }
  return dateStr;
};

const formatTaskTitle = (task) => {
  if (task.moduleTitle && task.moduleTitle !== task.moduleId) return task.moduleTitle;
  const id = task.moduleId || task.tabId || '';
  if (id.startsWith('python_day')) return `Python Day ${id.replace('python_day', '')}`;
  if (id === 'python_games') return 'Python Game Projects Capstone';
  if (id === 'python_apps') return 'Python Desktop & Utility Apps';
  if (id.startsWith('sql_module')) return `SQL Day ${id.replace('sql_module', '')}`;
  if (id.startsWith('module')) return `Day ${id.replace('module', '')}`;
  return id.replace(/_/g, ' ').toUpperCase();
};

const availableCourseOptions = [
  { value: "web_design_20days", label: "AI-Powered Web Design (20 Days)" },
  { value: "html_css", label: "HTML, CSS & Bootstrap" },
  { value: "sql", label: "Databases & SQL (Full Stack)" },
  { value: "sql_da", label: "SQL for Data Analytics" },
  { value: "python_course", label: "Core Python & OOPs" },
  { value: "python_da", label: "Python for Data Analytics" },
  { value: "javascript_course", label: "AI-Powered JavaScript" },
  { value: "generative_ai_course", label: "Generative AI" },
  { value: "agentic_ai", label: "Agentic AI Development" },
  { value: "summer_sql", label: "Summer SQL" },
  { value: "powerbi", label: "Power BI Data Analytics" },
  { value: "react_course", label: "AI-Powered React JS" },
  { value: "git_github", label: "Git & GitHub" },
  { value: "json_course", label: "JSON Essentials" },
  { value: "django_course", label: "Django Framework" },
  { value: "devops", label: "DevOps Framework" },
  { value: "stats_course", label: "Statistics for Data Analytics" },
  { value: "numpy_course", label: "NumPy for Data Science" },
  { value: "pandas_course", label: "Pandas for Data Science" },
  { value: "matplotlib_course", label: "Matplotlib for Data Science" },
  { value: "seaborn_course", label: "Seaborn for Data Science" },
  { value: "core_js", label: "Core JavaScript" },
  { value: "tally_prime", label: "AI powered Tally" },
  { value: "spoko_story", label: "Story-Based Learning (Spoko English)" },
  { value: "spoko_pro", label: "Professional Track (Soft Skills)" }
];

function getCourseLabel(courseKey) {
  if (!courseKey) return 'Unassigned';
  if (courseKey === 'all') return 'All Access';
  if (courseKey.includes(',')) {
    return courseKey.split(',').map(k => getCourseLabel(k.trim())).filter(Boolean).join(', ');
  }
  const found = availableCourseOptions.find(c => c.value === courseKey);
  if (found) return found.label;
  const labels = {
    web_design_20days: 'AI-Powered Web Design (20 Days)',
    web_design: 'AI-Powered Web Design',
    html_css: 'Web Design (HTML, CSS & Bootstrap)',
    sql: 'AI-Powered SQL Course',
    sql_da: 'SQL for Data Analytics',
    python_course: 'Core Python & OOPs',
    python_da: 'Python for Data Analytics',
    javascript_course: 'AI-Powered JavaScript',
    generative_ai_course: 'Generative AI',
    agentic_ai: 'Agentic AI Development',
    summer_sql: 'Summer SQL Crash Course',
    powerbi: 'AI-Powered Data Analytics (Power BI)',
    react_course: 'AI-Powered React JS',
    git_github: 'Git & GitHub',
    json_course: 'JSON Essentials',
    django_course: 'Django Framework',
    devops: 'DevOps Framework',
    stats_course: 'Statistics for Data Analytics',
    numpy_course: 'NumPy for Data Science',
    pandas_course: 'Pandas for Data Science',
    matplotlib_course: 'Matplotlib for Data Science',
    seaborn_course: 'Seaborn for Data Science',
    core_js: 'Core JavaScript',
    tally_prime: 'AI powered Tally',
    spoko_story: 'Story-Based Learning (Spoko English)',
    spoko_pro: 'Professional Track (Soft Skills)',
    softskills: 'Professional Track (Soft Skills)'
  };
  if (labels[courseKey]) return labels[courseKey];
  return courseKey.replace(/_/g, ' ').toUpperCase();
}

function getCourseDataList(courseKey) {
  if (!courseKey) return [];
  const map = {
    html_css: CourseData.htmlCourseData,
    sql: CourseData.sqlCourseData,
    summer_sql: CourseData.summerSqlCourseData,
    sql_da: CourseData.daSqlCourseData,
    powerbi: CourseData.powerBiCourseData,
    agentic_ai: CourseData.agenticAiCourseData,
    python_fullstack: CourseData.pythonFullStackCourseData,
    python_course: CourseData.pythonCourseData,
    python_da: CourseData.pythonDaCourseData,
    generative_ai_course: CourseData.generativeAiCourseData,
    react_course: CourseData.reactCourseData,
    git_github: CourseData.gitCourseData,
    json_course: CourseData.jsonCourseData,
    django_course: CourseData.djangoCourseData,
    devops: CourseData.devopsCourseData,
    stats_course: CourseData.statsCourseData,
    numpy_course: CourseData.numpyCourseData,
    pandas_course: CourseData.pandasCourseData,
    matplotlib_course: CourseData.matplotlibCourseData,
    seaborn_course: CourseData.seabornCourseData,
    core_js: CourseData.coreJsCourseData,
    induction: CourseData.inductionCourseData,
    tally: CourseData.tallyCourseData,
    web_design_20days: CourseData.webDesignCourseData,
    spoko_story: CourseData.spokoStoryCourseData,
    spoko_pro: CourseData.spokoProCourseData,
    softskills: CourseData.spokoProCourseData
  };
  return map[courseKey] || [];
}

// Detailed Per-Course Progress breakdown for a student
function calculateDetailedCourseProgress(student) {
  if (!student) return [];
  const completedLessons = Array.isArray(student.completedLessons) ? student.completedLessons : [];
  const enrolledCourse = student.enrolledCourse || 'all';

  let courseKeys = [];
  if (enrolledCourse === 'all') {
    courseKeys = [
      'html_css', 'react_course', 'python_course', 'django_course', 'git_github',
      'core_js', 'web_design_20days', 'sql', 'powerbi', 'stats_course', 'devops',
      'json_course', 'numpy_course', 'pandas_course', 'matplotlib_course', 'seaborn_course',
      'summer_sql', 'sql_da', 'python_da', 'agentic_ai', 'generative_ai_course', 'induction', 'tally', 'spoko_story', 'spoko_pro'
    ];
  } else if (Array.isArray(enrolledCourse)) {
    courseKeys = enrolledCourse;
  } else if (typeof enrolledCourse === 'string') {
    courseKeys = enrolledCourse.split(',').map(k => k.trim()).filter(Boolean);
  }

  return courseKeys.map(courseKey => {
    const label = getCourseLabel(courseKey);
    const modules = getCourseDataList(courseKey) || [];

    let courseTotal = 0;
    let courseCompleted = 0;

    const moduleBreakdown = modules.map(m => {
      const items = m.items || [];
      let moduleCompleted = 0;

      const itemBreakdown = items.map(item => {
        const fullKey = `${courseKey}:${m.id}:${item.id}`;
        const midKey = `${m.id}:${item.id}`;
        const isDone = completedLessons.includes(fullKey) ||
          completedLessons.includes(midKey) ||
          completedLessons.includes(item.id) ||
          completedLessons.some(c => typeof c === 'string' && (c === item.id || c.endsWith(`:${item.id}`)));
        if (isDone) moduleCompleted++;
        return {
          id: item.id,
          label: item.label,
          isCompleted: isDone
        };
      });

      courseTotal += items.length;
      courseCompleted += moduleCompleted;

      const modulePercentage = items.length > 0 ? Math.round((moduleCompleted / items.length) * 100) : 0;

      return {
        id: m.id,
        title: m.title,
        itemsCount: items.length,
        completedCount: moduleCompleted,
        percentage: modulePercentage,
        items: itemBreakdown
      };
    });

    const coursePercentage = courseTotal > 0 ? Math.min(100, Math.round((courseCompleted / courseTotal) * 100)) : 0;

    return {
      courseKey,
      courseLabel: label,
      totalTopics: courseTotal,
      completedTopics: courseCompleted,
      percentage: coursePercentage,
      modules: moduleBreakdown
    };
  }).filter(c => c.totalTopics > 0 || c.modules.length > 0);
}

// Calculate Course Completion Progress % based on Mark Completed topics
function calculateStudentProgress(student) {
  if (!student) return { completedCount: 0, totalCount: 0, percentage: 0 };

  const completedLessons = Array.isArray(student.completedLessons) ? student.completedLessons : [];
  const enrolledCourse = student.enrolledCourse || 'all';

  let enrolledList = [];
  if (enrolledCourse === 'all') {
    const allKeys = [
      'html_css', 'sql', 'sql_da', 'summer_sql', 'powerbi', 'agentic_ai',
      'python_fullstack', 'python_course', 'python_da', 'generative_ai_course',
      'react_course', 'git_github', 'json_course', 'django_course', 'devops',
      'stats_course', 'numpy_course', 'pandas_course', 'matplotlib_course',
      'seaborn_course', 'core_js', 'induction', 'tally', 'web_design_20days', 'spoko_story', 'spoko_pro'
    ];
    allKeys.forEach(k => {
      const data = getCourseDataList(k);
      if (data) enrolledList = [...enrolledList, ...data];
    });
  } else {
    enrolledList = getCourseDataList(enrolledCourse);
  }

  const allItems = enrolledList.flatMap(m => m.items || []);
  const totalItems = allItems.length;

  if (totalItems === 0) {
    return {
      completedCount: completedLessons.length,
      totalCount: completedLessons.length || 0,
      percentage: completedLessons.length > 0 ? 100 : 0
    };
  }

  const completedCount = allItems.filter(item => {
    return completedLessons.includes(item.id) ||
      completedLessons.some(c => typeof c === 'string' && (c === item.id || c.endsWith(`:${item.id}`)));
  }).length;

  const percentage = Math.min(100, Math.round((completedCount / totalItems) * 100));

  return {
    completedCount,
    totalCount: totalItems,
    percentage
  };
}

export default function Dashboard({ onSelectCourse, enrolledCourse, setEnrolledCourse, session, onLogout, completedLessons = [], taskSubmissions = [] }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'courses' | 'register' | 'database' | 'demos' | 'grading'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 868);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 868;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [enrollRole, setEnrollRole] = useState('student'); // 'student' | 'staff'
  const [dbTab, setDbTab] = useState('students'); // 'students' | 'staff'

  // Student Search & Pagination States
  const [studentSearch, setStudentSearch] = useState('');
  const [studentPage, setStudentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewingProgressStudent, setViewingProgressStudent] = useState(null);
  const [expandedCourseModule, setExpandedCourseModule] = useState({});

  // Self-Enrollment & Payment Modal State
  const [showSelfEnrollModal, setShowSelfEnrollModal] = useState(false);
  const [selfEnrollCourse, setSelfEnrollCourse] = useState('web_design_20days');
  const [selfEnrollMode, setSelfEnrollMode] = useState('online'); // 'online' | 'offline' | 'hybrid'
  const [paymentGatewayMethod, setPaymentGatewayMethod] = useState('razorpay'); // 'razorpay' | 'upi' | 'bank'
  const [selfStudentName, setSelfStudentName] = useState('');
  const [selfStudentEmail, setSelfStudentEmail] = useState('');
  const [selfStudentPhone, setSelfStudentPhone] = useState('');
  const [selfUtrRef, setSelfUtrRef] = useState('');
  const [selfEnrollSuccess, setSelfEnrollSuccess] = useState(null);
  const [selfEnrollLoading, setSelfEnrollLoading] = useState(false);
  const [selfEnrollError, setSelfEnrollError] = useState('');

  const handleOpenSelfEnroll = (courseKey = 'web_design_20days') => {
    setSelfEnrollCourse(courseKey);
    setSelfEnrollSuccess(null);
    setSelfEnrollError('');
    setSelfStudentName(session?.name && session?.role === 'student' ? session.name : '');
    setShowSelfEnrollModal(true);
  };

  const executeStudentEnrollment = async (txnRef) => {
    setSelfEnrollLoading(true);
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selfStudentName.trim(),
          enrolledCourse: selfEnrollCourse,
          trainingMode: selfEnrollMode,
          paymentStatus: 'Paid',
          transactionRef: txnRef,
          email: selfStudentEmail.trim(),
          phone: selfStudentPhone.trim()
        })
      });

      if (res.ok) {
        const data = await res.json();
        setSelfEnrollSuccess(data);
        if (setEnrolledCourse) {
          const currentList = enrolledCourse ? enrolledCourse.split(',') : [];
          if (!currentList.includes(selfEnrollCourse)) {
            setEnrolledCourse(currentList.length > 0 ? `${enrolledCourse},${selfEnrollCourse}` : selfEnrollCourse);
          }
        }
        fetchStudents();
      } else {
        const err = await res.json();
        setSelfEnrollError(err.error || 'Registration failed. Please check backend connection.');
      }
    } catch (err) {
      const mockCode = `STU-${Math.floor(10000 + Math.random() * 90000)}`;
      const mockData = {
        name: selfStudentName.trim(),
        accessCode: mockCode,
        enrolledCourse: selfEnrollCourse,
        trainingMode: selfEnrollMode,
        paymentStatus: 'Paid',
        transactionRef: txnRef
      };
      setSelfEnrollSuccess(mockData);
      if (setEnrolledCourse) {
        const currentList = enrolledCourse ? enrolledCourse.split(',') : [];
        if (!currentList.includes(selfEnrollCourse)) {
          setEnrolledCourse(currentList.length > 0 ? `${enrolledCourse},${selfEnrollCourse}` : selfEnrollCourse);
        }
      }
    } finally {
      setSelfEnrollLoading(false);
    }
  };

  const handleSelfEnrollSubmit = async (e) => {
    e.preventDefault();
    setSelfEnrollError('');
    if (!selfStudentName.trim()) {
      setSelfEnrollError('Student full name is required!');
      return;
    }

    if (paymentGatewayMethod === 'razorpay') {
      const feeAmount = selfEnrollMode === 'online' ? 999 : selfEnrollMode === 'offline' ? 2999 : 3499;
      setSelfEnrollLoading(true);

      const loadRazorpay = () => new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

      const loaded = await loadRazorpay();
      const demoTxnId = `RZP_${Math.floor(1000000000 + Math.random() * 9000000000)}`;

      if (loaded && window.Razorpay) {
        try {
          const rzpKey = import.meta.env?.VITE_RAZORPAY_KEY_ID || 'rzp_live_TloikfLIGkA6Cl';
          const options = {
            key: rzpKey,
            amount: feeAmount * 100,
            currency: 'INR',
            name: 'VeeGo Learning Portal',
            description: `Course Enrollment (${selfEnrollMode.toUpperCase()})`,
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            prefill: {
              name: selfStudentName.trim(),
              email: selfStudentEmail.trim() || 'student@veego.in',
              contact: selfStudentPhone.trim() || '9876543210'
            },
            theme: { color: '#2563eb' },
            handler: function (response) {
              executeStudentEnrollment(response.razorpay_payment_id || demoTxnId);
            },
            modal: {
              ondismiss: function () {
                setSelfEnrollLoading(false);
              }
            }
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (err) {
          executeStudentEnrollment(demoTxnId);
        }
      } else {
        executeStudentEnrollment(demoTxnId);
      }
    } else {
      if (!selfUtrRef.trim()) {
        setSelfEnrollError('Payment UTR / Reference ID is required for verification!');
        return;
      }
      executeStudentEnrollment(selfUtrRef.trim());
    }
  };

  // Filtered Students for Live Database
  const filteredStudents = students.filter(s => {
    if (!studentSearch.trim()) return true;
    const query = studentSearch.toLowerCase().trim();
    const nameMatch = (s.name || '').toLowerCase().includes(query);
    const codeMatch = (s.accessCode || '').toLowerCase().includes(query);
    const rawCourse = (s.enrolledCourse || '').toLowerCase();
    const courseLabel = getCourseLabel(s.enrolledCourse).toLowerCase();
    const courseMatch = rawCourse.includes(query) || courseLabel.includes(query);

    const { percentage, completedCount, totalCount } = calculateStudentProgress(s);
    const progressMatch = `${percentage}%`.includes(query) || `${completedCount}/${totalCount}`.includes(query);

    return nameMatch || codeMatch || courseMatch || progressMatch;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const safeStudentPage = Math.min(Math.max(1, studentPage), totalPages);
  const startIndex = (safeStudentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // HTML & CSS Course Validation State
  const [htmlCssValidations, setHtmlCssValidations] = useState(() => getAssignmentValidations());
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected' | 'html_css'
  const [reviewSearch, setReviewSearch] = useState('');

  useEffect(() => {
    const handleSync = () => setHtmlCssValidations(getAssignmentValidations());
    window.addEventListener('html_css_validation_changed', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('html_css_validation_changed', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // 1) HTML & CSS Course Day Submissions
  const htmlCssSubmissions = Object.keys(htmlCssValidations).map(modId => {
    const rec = htmlCssValidations[modId] || {};
    const cfg = HTML_CSS_ASSIGNMENTS_CONFIG[modId] || {};
    const hasData = rec.studentFeedback || rec.submissionUrl || rec.submissionNotes || rec.submittedAt;
    if (!hasData) return null;

    return {
      _id: `html_css_${modId}`,
      id: `html_css_${modId}`,
      isHtmlCss: true,
      moduleId: modId,
      moduleTitle: cfg.dayTitle || modId,
      tabId: 'assignment',
      studentName: rec.studentName || 'Student Learner',
      accessCode: rec.studentAccessCode || 'STUDENT',
      submissionUrl: rec.submissionUrl || '',
      submissionNotes: rec.submissionNotes || '',
      studentFeedback: rec.studentFeedback || '',
      taskUrl: rec.submissionUrl || '',
      taskText: rec.studentFeedback ? `[Student Reflection]: ${rec.studentFeedback}${rec.submissionNotes ? `\n\n[Code / Notes]: ${rec.submissionNotes}` : ''}` : rec.submissionNotes || '',
      submittedAt: rec.submittedAt || rec.updatedAt || 'Recently',
      status: rec.status === 'approved' ? 'Approved' : rec.status === 'rejected' ? 'Rejected' : 'Pending',
      staffFeedback: rec.staffFeedback || '',
      validatedAt: rec.validatedAt || '',
      validatedBy: rec.validatedBy || ''
    };
  }).filter(Boolean);

  // 2) Topic Homework Submissions from Students Backend
  const topicSubmissions = students.flatMap(s =>
    (s.tasks || []).map(t => ({
      ...t,
      isHtmlCss: false,
      studentName: s.name,
      studentId: s._id || s.id,
      accessCode: s.accessCode,
      moduleTitle: t.moduleId,
      status: t.status === 'Approved' ? 'Approved' : t.status === 'Rejected' ? 'Rejected' : 'Pending'
    }))
  );

  // Combined Chronological Submissions
  const allSubmissions = [...htmlCssSubmissions, ...topicSubmissions].sort((a, b) => {
    const da = new Date(a.submittedAt).getTime() || 0;
    const db = new Date(b.submittedAt).getTime() || 0;
    return db - da;
  });

  const pendingSubmissions = allSubmissions.filter(s => s.status === 'Pending');
  const pendingCount = pendingSubmissions.length;

  const handleQuickApprove = (task) => {
    if (task.isHtmlCss) {
      const rec = htmlCssValidations[task.moduleId] || {};
      const updatedRecord = {
        ...rec,
        staffFeedback: 'Great work! Code meets semantic standards and feedback is thoughtful. Approved.',
        status: 'approved',
        validatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        validatedBy: session?.name || 'Staff Instructor'
      };
      saveAssignmentValidation(task.moduleId, updatedRecord);
      setHtmlCssValidations(getAssignmentValidations());
    } else {
      fetch(`/api/students/tasks/${task._id || task.id}/grade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: task.studentId,
          status: 'Approved',
          feedback: 'Approved by staff',
          grade: 'A+'
        })
      }).then(() => fetchStudents());
    }
  };

  const handleQuickReject = (task) => {
    if (task.isHtmlCss) {
      const rec = htmlCssValidations[task.moduleId] || {};
      const updatedRecord = {
        ...rec,
        staffFeedback: 'Please revise your submission details according to criteria and resubmit.',
        status: 'rejected',
        validatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        validatedBy: session?.name || 'Staff Instructor'
      };
      saveAssignmentValidation(task.moduleId, updatedRecord);
      setHtmlCssValidations(getAssignmentValidations());
    } else {
      fetch(`/api/students/tasks/${task._id || task.id}/grade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: task.studentId,
          status: 'Rejected',
          feedback: 'Revision requested by staff',
          grade: 'Needs Revision'
        })
      }).then(() => fetchStudents());
    }
  };

  // Grading Modal States
  const [gradingTask, setGradingTask] = useState(null);
  const [gradingStudentId, setGradingStudentId] = useState('');
  const [gradingStatus, setGradingStatus] = useState('Approved');
  const [gradingFeedback, setGradingFeedback] = useState('');
  const [gradingGrade, setGradingGrade] = useState('A+');
  const [gradingLoading, setGradingLoading] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [assignedCourse, setAssignedCourse] = useState('html_css');

  // Student course editing states
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingCourses, setEditingCourses] = useState('');
  const [editingLoading, setEditingLoading] = useState(false);
  const [editingError, setEditingError] = useState('');

  const handleOpenEditCoursesModal = (student) => {
    setEditingStudent(student);
    setEditingCourses(student.enrolledCourse || '');
    setEditingError('');
  };

  const handleSaveCourses = async (e) => {
    e.preventDefault();
    setEditingError('');
    setEditingLoading(true);
    try {
      const res = await fetch(`/api/students/${editingStudent._id || editingStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrolledCourse: editingCourses })
      });
      if (res.ok) {
        setEditingStudent(null);
        fetchStudents();
      } else {
        const err = await res.json();
        setEditingError(err.error || 'Failed to save courses.');
      }
    } catch (err) {
      setEditingError('Could not reach backend API server.');
    } finally {
      setEditingLoading(false);
    }
  };

  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffUsername, setNewStaffUsername] = useState('');
  const [newStaffPassword, setNewStaffPassword] = useState('');

  const [adminError, setAdminError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Certificate States
  const [certStudentId, setCertStudentId] = useState('');
  const [certFile, setCertFile] = useState(null);
  const [certUploading, setCertUploading] = useState(false);
  const [certSuccessMsg, setCertSuccessMsg] = useState('');
  const [certError, setCertError] = useState('');
  const [studentCertificate, setStudentCertificate] = useState(null); // for student dashboard

  const getCourseDataList = (courseKey) => {
    if (!courseKey) return [];
    if (courseKey === 'all') return [];
    if (courseKey.includes(',')) {
      const keys = courseKey.split(',');
      let combined = [];
      keys.forEach(k => {
        const data = getCourseDataList(k);
        if (data) combined = [...combined, ...data];
      });
      return combined;
    }
    const map = {
      html_css: CourseData.htmlCourseData,
      sql: CourseData.sqlCourseData,
      sql_da: CourseData.daSqlCourseData,
      summer_sql: CourseData.summerSqlCourseData,
      powerbi: CourseData.powerBiCourseData,
      agentic_ai: CourseData.agenticAiCourseData,
      python_fullstack: CourseData.pythonFullStackCourseData,
      python_course: CourseData.pythonCourseData,
      python_da: CourseData.pythonDaCourseData,
      generative_ai_course: CourseData.generativeAiCourseData,
      react_course: CourseData.reactCourseData,
      git_github: CourseData.gitCourseData,
      json_course: CourseData.jsonCourseData,
      django_course: CourseData.djangoCourseData,
      devops: CourseData.devopsCourseData,
      stats_course: CourseData.statsCourseData,
      numpy_course: CourseData.numpyCourseData,
      pandas_course: CourseData.pandasCourseData,
      matplotlib_course: CourseData.matplotlibCourseData,
      seaborn_course: CourseData.seabornCourseData,
      core_js: CourseData.coreJsCourseData,
      induction: CourseData.inductionCourseData,
      tally: CourseData.tallyCourseData,
      web_design: CourseData.webDesignCourseData,
      web_design_20days: CourseData.webDesignCourseData
    };
    return map[courseKey] || [];
  };

  const getInitialMainCourse = () => {
    const list = enrolledCourse ? enrolledCourse.split(',') : [];
    const firstCourse = list[0];
    if (firstCourse === 'powerbi' || firstCourse === 'stats_course' || firstCourse === 'numpy_course' || firstCourse === 'pandas_course' || firstCourse === 'matplotlib_course' || firstCourse === 'seaborn_course' || firstCourse === 'sql_da' || firstCourse === 'python_da') return 'dataanalytics';
    if (firstCourse === 'summer_sql') return 'summer';
    if (firstCourse === 'generative_ai_course' || firstCourse === 'agentic_ai') return 'aidevelopment';
    return 'fullstack';
  };
  const [activeMainCourse, setActiveMainCourse] = useState(getInitialMainCourse);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (e) {
      console.warn('API error fetching students:', e);
    }
  };

  const fetchStudentCertificate = async (studentId) => {
    try {
      const res = await fetch(`/api/students/${studentId}/certificate`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.data) setStudentCertificate(data);
      }
    } catch (e) {
      console.warn('Error fetching student certificate:', e);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await fetch('/api/staff');
      if (res.ok) {
        const data = await res.json();
        setStaff(data);
      }
    } catch (e) {
      console.warn('API error fetching staff:', e);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchStaff();
    if (session?.role === 'student' && session?.studentId) {
      fetchStudentCertificate(session.studentId);
    }
  }, []);

  const handleRegisterStudent = async (e) => {
    e.preventDefault();
    setAdminError('');
    setSuccessMsg('');
    if (!newStudentName.trim()) {
      setAdminError('Student Name is required!');
      return;
    }

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newStudentName.trim(), enrolledCourse: assignedCourse })
      });
      if (res.ok) {
        const data = await res.json();
        setSuccessMsg(`Student registered! Access Code: ${data.accessCode}`);
        setNewStudentName('');
        fetchStudents();
        setActiveTab('database');
      } else {
        const err = await res.json();
        setAdminError(err.error || 'Registration failed.');
      }
    } catch (err) {
      setAdminError('Could not reach backend API server.');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!confirm('Are you sure you want to delete this student record?')) return;
    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchStudents();
      }
    } catch (e) {
      console.warn('API error deleting student:', e);
    }
  };

  const handleRegisterStaff = async (e) => {
    e.preventDefault();
    setAdminError('');
    setSuccessMsg('');
    if (!newStaffName.trim() || !newStaffUsername.trim() || !newStaffPassword.trim()) {
      setAdminError('All staff fields are required!');
      return;
    }

    try {
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newStaffName.trim(),
          username: newStaffUsername.trim(),
          password: newStaffPassword.trim()
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSuccessMsg(`Staff credentials created successfully for ${data.name}!`);
        setNewStaffName('');
        setNewStaffUsername('');
        setNewStaffPassword('');
        fetchStaff();
        setDbTab('staff');
        setActiveTab('database');
      } else {
        const err = await res.json();
        setAdminError(err.error || 'Failed to register staff.');
      }
    } catch (err) {
      setAdminError('Could not reach backend API server.');
    }
  };

  const handleDeleteStaff = async (id) => {
    if (!confirm('Are you sure you want to remove this staff instructor?')) return;
    try {
      const res = await fetch(`/api/staff/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchStaff();
      }
    } catch (e) {
      console.warn('API error removing staff:', e);
    }
  };

  const handleResetDevice = async (id) => {
    try {
      const res = await fetch(`/api/students/${id}/reset-device`, { method: 'POST' });
      if (res.ok) {
        fetchStudents();
        alert('Student device lock has been successfully cleared! They can now access this link from a new device.');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to reset device lock.');
      }
    } catch (err) {
      console.warn('API error resetting device lock:', err);
    }
  };

  const handleGradeTaskSubmit = async (e) => {
    e.preventDefault();
    if (!gradingTask) return;

    const statusTrimmed = gradingStatus ? gradingStatus.trim() : '';
    const feedbackTrimmed = gradingFeedback ? gradingFeedback.trim() : '';
    const gradeTrimmed = gradingGrade ? gradingGrade.trim() : '';

    if (statusTrimmed === 'Rejected' && feedbackTrimmed.length < 5) {
      alert('Evaluation feedback is required when requesting a revision.');
      return;
    }

    setGradingLoading(true);
    try {
      const res = await fetch(`/api/students/tasks/${gradingTask._id || gradingTask.id}/grade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: gradingStudentId,
          status: statusTrimmed,
          feedback: feedbackTrimmed,
          grade: gradeTrimmed
        })
      });
      if (res.ok) {
        alert('Task graded successfully!');
        setGradingTask(null);
        fetchStudents();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to grade task.');
      }
    } catch (err) {
      console.warn('API error grading task:', err);
      alert('Could not reach backend API server.');
    } finally {
      setGradingLoading(false);
    }
  };

  const handleUploadCertificate = async () => {
    setCertError('');
    setCertSuccessMsg('');
    if (!certStudentId) {
      setCertError('Please select a student.');
      return;
    }
    if (!certFile) {
      setCertError('Please choose a certificate file.');
      return;
    }
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (certFile.size > maxSize) {
      setCertError('File is too large. Maximum size is 2MB.');
      return;
    }
    setCertUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result; // full data URL: "data:application/pdf;base64,..."
        try {
          const res = await fetch(`/api/students/${certStudentId}/certificate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              certificateData: base64,
              filename: certFile.name,
              mimeType: certFile.type
            })
          });
          if (res.ok) {
            const data = await res.json();
            setCertSuccessMsg(`Certificate uploaded successfully for ${data.student?.name || 'student'}!`);
            setCertFile(null);
            fetchStudents();
          } else {
            const err = await res.json();
            setCertError(err.error || 'Upload failed. Please try again.');
          }
        } catch (err) {
          setCertError('Could not reach backend API server.');
        } finally {
          setCertUploading(false);
        }
      };
      reader.readAsDataURL(certFile);
    } catch (e) {
      setCertError('Error reading file.');
      setCertUploading(false);
    }
  };

  const handleDownloadCertificate = () => {
    if (!studentCertificate || !studentCertificate.data) return;
    const link = document.createElement('a');
    link.href = studentCertificate.data;
    link.download = studentCertificate.filename || 'certificate.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAutoGenerateCertificate = () => {
    const certId = `VG-CERT-${Math.floor(100000 + Math.random() * 900000)}`;
    const studentName = session?.name || 'VeeGo Student';
    const courseTitle = getCourseLabel(enrolledCourse);
    
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#ffffff" stroke="#1d4ed8" stroke-width="12"/>
      <rect x="20" y="20" width="760" height="560" fill="none" stroke="#f59e0b" stroke-width="3"/>
      <text x="400" y="80" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="900" fill="#0f172a">VEEGO COMPUTER EDUCATION</text>
      <text x="400" y="110" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#2563eb">CERTIFICATE OF COURSE COMPLETION</text>
      <text x="400" y="190" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#64748b">This is to certify that</text>
      <text x="400" y="240" text-anchor="middle" font-family="sans-serif" font-size="32" font-weight="bold" fill="#1d4ed8">${studentName}</text>
      <text x="400" y="290" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#64748b">has successfully completed the self-learning course on</text>
      <text x="400" y="340" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="bold" fill="#059669">${courseTitle}</text>
      <text x="400" y="380" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#64748b">Training Mode: Online Self-Paced &amp; Practical Labs</text>
      <text x="150" y="480" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#64748b">Certificate ID: ${certId}</text>
      <text x="650" y="480" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#64748b">Issued by VeeGo Technologies</text>
      <line x1="550" y1="460" x2="750" y2="460" stroke="#0f172a" stroke-width="1.5"/>
      <text x="650" y="500" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0f172a">DIRECTOR SIGNATURE</text>
    </svg>`;
    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`;

    const certObj = {
      data: dataUrl,
      filename: `VeeGo_Certificate_${studentName.replace(/\s+/g, '_')}_${certId}.svg`,
      uploadedAt: new Date().toISOString(),
      certId: certId
    };

    setStudentCertificate(certObj);
    alert(`🎉 Congratulations! Your official VeeGo Course Completion Certificate (${certId}) has been auto-generated! You can now download or print it.`);
  };



  const totalLocked = students.filter(s => s.deviceId).length;
  const totalStudents = students.length;

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', width: '100%', background: 'var(--bg-color)', position: 'relative' }}>

      {/* 📱 MOBILE STICKY HEADER BAR */}
      {isMobile && (
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.25rem',
          background: '#ffffff',
          borderBottom: '1px solid var(--surface-border)',
          position: 'sticky',
          top: 0,
          zIndex: 900,
          width: '100%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px' }}>
                VEEGO
              </h2>
              <span style={{ fontSize: '0.62rem', color: 'var(--accent-primary)', letterSpacing: '1.5px', fontWeight: 800 }}>LEARNING PORTAL</span>
            </div>
          </div>

          {session?.role !== 'student' && pendingCount > 0 && (
            <button
              type="button"
              onClick={() => { setActiveTab('grading'); setIsMobileMenuOpen(false); }}
              style={{
                background: '#fef2f2',
                border: '1px solid #fca5a5',
                color: '#dc2626',
                padding: '0.35rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              🔔 {pendingCount}
            </button>
          )}
        </header>
      )}

      {/* 🌫️ BACKDROP FOR MOBILE SIDEBAR DRAWER */}
      {isMobile && isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 999
          }}
        />
      )}

      {/* 🧭 LEFT SIDE NAVIGATION PANEL (DESKTOP + MOBILE DRAWER) */}
      <aside style={{
        width: isMobile ? '280px' : '260px',
        background: '#ffffff',
        borderRight: '1px solid var(--surface-border)',
        padding: '2.25rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        boxShadow: isMobile ? '0 20px 25px -5px rgba(0,0,0,0.15)' : 'var(--shadow-sm)',
        position: isMobile ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: isMobile ? 1000 : 'auto',
        transform: isMobile && !isMobileMenuOpen ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflowY: 'auto'
      }}>
        <div>
          {/* Logo Brand */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingLeft: '0.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px' }}>
                VEEGO
              </h2>
              <span style={{ fontSize: '0.68rem', color: 'var(--accent-primary)', letterSpacing: '2px', fontWeight: 800 }}>LEARNING PORTAL</span>
            </div>
            {isMobile && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 4 }}
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => { setActiveTab('overview'); if (isMobile) setIsMobileMenuOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                background: activeTab === 'overview' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
                color: activeTab === 'overview' ? '#ffffff' : 'var(--text-secondary)',
                boxShadow: activeTab === 'overview' ? 'var(--glow-primary)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              <Grid size={18} /> Dashboard
            </button>

            <button
              onClick={() => { setActiveTab('courses'); if (isMobile) setIsMobileMenuOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                background: activeTab === 'courses' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
                color: activeTab === 'courses' ? '#ffffff' : 'var(--text-secondary)',
                boxShadow: activeTab === 'courses' ? 'var(--glow-primary)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              <BookOpen size={18} /> Course Catalog
            </button>

            {/* Admin only sections */}
            {(session?.role === 'admin' || session?.role === 'staff') && (
              <>
                <div style={{ height: '1px', background: 'var(--surface-border)', margin: '1rem 0' }} />
                <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', fontWeight: 800, textTransform: 'uppercase', paddingLeft: '1rem', marginBottom: '0.4rem', display: 'block', letterSpacing: '0.5px' }}>Administration</span>

                <button
                  onClick={() => { setActiveTab('register'); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === 'register' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
                    color: activeTab === 'register' ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'register' ? 'var(--glow-primary)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <UserPlus size={18} /> Enroll Student
                </button>

                <button
                  onClick={() => { setActiveTab('database'); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === 'database' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
                    color: activeTab === 'database' ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'database' ? 'var(--glow-primary)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <Users size={18} /> Live Database
                </button>

                <button
                  onClick={() => { setActiveTab('grading'); fetchStudents(); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === 'grading' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
                    color: activeTab === 'grading' ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'grading' ? 'var(--glow-primary)' : 'none',
                    transition: 'var(--transition)',
                    position: 'relative'
                  }}
                >
                  <CheckCircle size={18} /> Review Tasks
                  {pendingCount > 0 && (
                    <span style={{
                      background: '#ef4444',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      marginLeft: 'auto',
                      boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)'
                    }}>
                      {pendingCount} New
                    </span>
                  )}
                </button>

                <button
                  onClick={() => { setActiveTab('certificates'); fetchStudents(); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === 'certificates' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
                    color: activeTab === 'certificates' ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'certificates' ? '0 4px 12px rgba(245,158,11,0.35)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <Upload size={18} /> Certificate Upload
                </button>

                <button
                  onClick={() => { setActiveTab('af_certificates'); fetchStudents(); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: (activeTab === 'prepare_certs' || activeTab === 'af_certificates' || activeTab === 'idcards' || activeTab === 'foclen') ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
                    color: (activeTab === 'prepare_certs' || activeTab === 'af_certificates' || activeTab === 'idcards' || activeTab === 'foclen') ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: (activeTab === 'prepare_certs' || activeTab === 'af_certificates' || activeTab === 'idcards' || activeTab === 'foclen') ? '0 4px 12px rgba(245,158,11,0.35)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <Award size={18} /> Prepare Certificate / ID Card
                </button>

                <button
                  onClick={() => { setActiveTab('invoices'); fetchStudents(); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === 'invoices' ? 'linear-gradient(135deg, #0A3D91 0%, #1d4ed8 100%)' : 'transparent',
                    color: activeTab === 'invoices' ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'invoices' ? '0 4px 12px rgba(10, 61, 145, 0.35)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <Receipt size={18} /> Fee Invoices
                </button>
              </>
            )}

            {session?.role !== 'student' && (
              <>
                <div style={{ height: '1px', background: 'var(--surface-border)', margin: '1rem 0' }} />
                <button
                  onClick={() => { setActiveTab('demos'); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === 'demos' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
                    color: activeTab === 'demos' ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'demos' ? 'var(--glow-primary)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <Sparkles size={18} /> Induction Sessions
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Footer Account Details */}
        <div style={{
          background: 'var(--bg-color)',
          border: '1px solid var(--surface-border)',
          borderRadius: '16px',
          padding: '0.88rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{session.name}</div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>{session.role} Portal</div>
          </div>
          <button
            onClick={onLogout}
            style={{
              width: '100%', background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.15)',
              borderRadius: '8px', padding: '0.4rem 0', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', transition: 'var(--transition)'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'}
          >
            <LogOut size={12} /> Log Out
          </button>
        </div>
      </aside>

      {/* 🖥️ MAIN WORKSPACE CONTENT CONTAINER */}
      <main style={{ flex: 1, padding: activeTab === 'invoices' ? 0 : (isMobile ? '1.25rem 1rem' : '3rem 4rem'), minHeight: '100vh', overflowY: 'auto', minWidth: 0, background: activeTab === 'invoices' ? '#0f172a' : 'transparent' }}>

        {/* Dynamic header title based on active tab */}
        {activeTab !== 'invoices' && activeTab !== 'prepare_certs' && activeTab !== 'af_certificates' && activeTab !== 'idcards' && activeTab !== 'foclen' && (
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '1rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <h1 style={{ fontSize: isMobile ? '1.5rem' : '2.2rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                {activeTab === 'overview' && 'LMS Workspace Dashboard'}
                {activeTab === 'courses' && 'Interactive Course Catalog'}
                {activeTab === 'register' && 'Enroll a New Student'}
                {activeTab === 'database' && 'Student Credentials Directory'}
                {activeTab === 'demos' && 'VeeGo Induction & Masterclass Sessions'}
                {activeTab === 'grading' && 'Review and Grade Assignments'}
                {activeTab === 'certificates' && 'Certificate Upload'}
              </h1>
              <p style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                {activeTab === 'overview' && 'Dashboard stats, role privileges, and quick configuration access.'}
                {activeTab === 'courses' && 'Browse, select, and launch learning timelines and bootcamp environments.'}
                {activeTab === 'register' && 'Assign course tracks and generate direct student login credential links.'}
                {activeTab === 'database' && 'Review and clear access token keys, device locks, or student databases.'}
                {activeTab === 'demos' && 'Review AI-Powered workspaces, job roadmaps, salaries, and masterclass sessions.'}
                {activeTab === 'grading' && 'View, grade, and leave feedback on student task/homework submissions.'}
                {activeTab === 'certificates' && 'Upload completion certificates for students. Students can download them from their dashboard.'}
              </p>
            </div>


          </div>
        )}

        {/* 📊 TAB 1: WORKSPACE OVERVIEW VIEW */}
        {activeTab === 'overview' && session.role === 'student' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Student Welcome & Enrolled Course Highlight Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              borderRadius: '24px',
              padding: '2.5rem',
              color: '#ffffff',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem 0', fontFamily: 'system-ui' }}>Welcome back, {session.name}! 👋</h2>
                <p style={{ fontSize: '1.05rem', color: '#eff6ff', opacity: 0.9, margin: '0 0 1.5rem 0', fontWeight: 500, fontFamily: 'system-ui' }}>
                  We are glad to see you continue your learning journey.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontFamily: 'system-ui' }}>
                    Active Track
                  </span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'system-ui' }}>
                    {getCourseLabel(enrolledCourse)}
                  </span>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.1, color: '#ffffff' }}>
                <Award size={200} />
              </div>
            </div>

            {/* Course Progress Card & Actions */}
            {(() => {
              const enrolledList = getCourseDataList(enrolledCourse);
              const totalItems = enrolledList.flatMap(m => m.items || []).length || 1;
              const completedInThisCourse = enrolledList.flatMap(m => m.items || []).filter(item => {
                return completedLessons.includes(item.id) ||
                  completedLessons.some(c => c.endsWith(`:${item.id}`));
              }).length;

              const progressPercent = Math.min(100, Math.round((completedInThisCourse / totalItems) * 100));

              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                  {/* Progress Gauge */}
                  <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 1rem 0', fontFamily: 'system-ui' }}>Your Course Progress</h3>
                      <div style={{ background: '#e2e8f0', height: '10px', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem' }}>
                        <div style={{ background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', width: `${progressPercent}%`, height: '100%' }}></div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'system-ui' }}>
                        <span>Completion Rate:</span>
                        <span style={{ color: '#10b981', fontSize: '1.1rem', fontWeight: 800 }}>{progressPercent}%</span>
                      </div>
                    </div>
                    <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--surface-border)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', fontFamily: 'system-ui' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Completed <strong>{completedInThisCourse}</strong> of <strong>{totalItems}</strong> steps</span>
                      <button
                        onClick={() => {
                          const firstCourse = enrolledCourse ? enrolledCourse.split(',')[0] : 'html_css';
                          onSelectCourse(firstCourse);
                        }}
                        style={{
                          border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff',
                          padding: '0.55rem 1.2rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)'
                        }}
                      >
                        Resume Learning <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Quick Course Catalog Portal */}
                  <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontFamily: 'system-ui' }}>Course Syllabus Portal</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4, fontFamily: 'system-ui' }}>
                        Access all modules, interactive code play areas, and homework guides in your enrolled program.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('courses')}
                      style={{
                        width: '100%', border: '1px solid var(--surface-border)', background: 'var(--bg-color)', color: 'var(--text-primary)',
                        padding: '0.75rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '1.5rem',
                        transition: 'var(--transition)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-color)'}
                    >
                      <BookOpen size={16} /> Open Syllabus
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Task Submission History / Status List */}
            <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, fontFamily: 'system-ui' }}>Task Submission History</h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', background: 'rgba(59, 130, 246, 0.08)', padding: '0.3rem 0.7rem', borderRadius: '20px', fontFamily: 'system-ui' }}>
                  {taskSubmissions.length} Submissions
                </span>
              </div>

              {taskSubmissions.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--surface-border)', color: 'var(--text-secondary)', fontWeight: 700 }}>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Lesson Module</th>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Submitted At</th>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Project Link</th>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Submitted Feedback</th>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Review Status</th>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Grade</th>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Instructor Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taskSubmissions.map(task => {
                        const statusColors = {
                          Pending: { text: '#ca8a04', bg: 'rgba(234, 179, 8, 0.08)' },
                          Approved: { text: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' },
                          Rejected: { text: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)' }
                        };
                        const col = statusColors[task.status] || { text: '#64748b', bg: '#f1f5f9' };

                        return (
                          <tr key={task._id || task.id} style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-primary)' }}>
                            <td style={{ padding: '1rem', fontWeight: 700 }}>
                              <span style={{ fontSize: '0.75rem', display: 'block', color: 'var(--text-tertiary)' }}>{task.moduleId}</span>
                              {task.tabId}
                            </td>
                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                              {new Date(task.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td style={{ padding: '1rem' }}>
                              {task.taskUrl ? (
                                <a
                                  href={task.taskUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: '#3b82f6', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px'
                                  }}
                                >
                                  View Link <ExternalLink size={12} />
                                </a>
                              ) : (
                                <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Text Only</span>
                              )}
                            </td>
                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '200px', wordWrap: 'break-word', whiteSpace: 'normal' }}>
                              {task.studentFeedback || task.taskText || task.submissionNotes || <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>—</span>}
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{
                                color: col.text, background: col.bg, fontSize: '0.75rem', fontWeight: 800, padding: '0.35rem 0.75rem', borderRadius: '20px', textTransform: 'uppercase'
                              }}>
                                {task.status}
                              </span>
                            </td>
                            <td style={{ padding: '1rem', fontWeight: 800, color: task.grade ? '#8b5cf6' : 'var(--text-tertiary)' }}>
                              {task.grade || '--'}
                            </td>
                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '280px', wordWrap: 'break-word', whiteSpace: 'normal' }}>
                              {task.feedback || <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Pending evaluation</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-secondary)' }}>
                  <Sparkles size={36} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>No task submissions yet. Open a lesson syllabus and submit your first assignment!</p>
                </div>
              )}
            </div>

            {/* 🎓 CERTIFICATE DOWNLOAD CARD */}
            <div style={{ background: '#ffffff', border: `2px solid ${studentCertificate ? '#f59e0b' : 'var(--surface-border)'}`, borderRadius: '24px', padding: '2rem', boxShadow: studentCertificate ? '0 8px 32px rgba(245,158,11,0.18)' : 'var(--shadow-sm)', position: 'relative', overflow: 'hidden' }}>
              {/* Background decor */}
              <div style={{ position: 'absolute', right: '-24px', top: '-24px', opacity: 0.06 }}>
                <Award size={180} color={studentCertificate ? '#f59e0b' : '#94a3b8'} />
              </div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.25rem 0', fontFamily: 'system-ui' }}>Course Completion Certificate</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, fontFamily: 'system-ui' }}>
                      Issued by VeeGo Technologies
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px',
                    background: studentCertificate ? 'rgba(245,158,11,0.12)' : 'rgba(148,163,184,0.12)',
                    color: studentCertificate ? '#d97706' : '#94a3b8',
                    padding: '0.35rem 0.8rem', borderRadius: '20px', border: `1px solid ${studentCertificate ? 'rgba(245,158,11,0.3)' : 'rgba(148,163,184,0.3)'}`,
                    whiteSpace: 'nowrap'
                  }}>
                    {studentCertificate ? '✓ Certificate Ready' : '⚡ Auto-Generation Ready'}
                  </span>
                </div>

                {studentCertificate ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Congrats message */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(251,191,36,0.05) 100%)', borderRadius: '16px', padding: '1.25rem 1.5rem', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#92400e', fontFamily: 'system-ui' }}>
                        🎉 Congratulations, {session.name}!
                      </p>
                      <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#b45309', lineHeight: 1.5, fontFamily: 'system-ui' }}>
                        Your certificate for <strong>{getCourseLabel(enrolledCourse)}</strong> is ready. Click the button below to download or print it.
                      </p>
                    </div>
                    {/* File info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', borderRadius: '12px', padding: '0.9rem 1.1rem', border: '1px solid #e2e8f0' }}>
                      <FileText size={28} color="#f59e0b" />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'system-ui' }}>{studentCertificate.filename}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'system-ui' }}>
                          Issued on {studentCertificate.uploadedAt ? new Date(studentCertificate.uploadedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Today'} • Verification ID: {studentCertificate.certId || 'VG-CERT-8841'}
                        </div>
                      </div>
                    </div>
                    {/* Download button */}
                    <button
                      onClick={handleDownloadCertificate}
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#ffffff', border: 'none', borderRadius: '14px',
                        padding: '0.9rem 2rem', fontSize: '1rem', fontWeight: 800, cursor: 'pointer',
                        boxShadow: '0 6px 20px rgba(245,158,11,0.35)', transition: 'var(--transition)'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <Download size={20} /> Download My VeeGo Certificate
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '1.5rem 0' }}>
                    <div style={{ background: '#f1f5f9', borderRadius: '50%', padding: '1.25rem', display: 'inline-flex' }}>
                      <Award size={40} color="#f59e0b" />
                    </div>
                    <div>
                      <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.4rem 0', fontFamily: 'system-ui' }}>Self-Learning Course Auto-Certificate</p>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 1.25rem 0', lineHeight: 1.5, fontFamily: 'system-ui', maxWidth: '480px' }}>
                        Once you complete your online self-paced course modules, your official VeeGo Course Certificate is automatically generated! You can also auto-generate it now.
                      </p>
                      <button
                        onClick={handleAutoGenerateCertificate}
                        style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: '#ffffff', border: 'none', borderRadius: '14px',
                          padding: '0.85rem 1.8rem', fontSize: '0.95rem', fontWeight: 800, cursor: 'pointer',
                          display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 6px 18px rgba(16,185,129,0.3)', transition: 'var(--transition)'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <Sparkles size={18} /> Auto-Generate Certificate Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 📊 TAB 1: WORKSPACE OVERVIEW VIEW (ADMIN/STAFF ONLY) - 3 LAYERED REVENUE DASHBOARD */}
        {activeTab === 'overview' && session.role !== 'student' && (() => {
          // Revenue Calculations
          const totalStudentsCount = students.length;
          const paidStudents = students.filter(s => s.paymentStatus === 'Paid').length;
          const pendingPayments = students.filter(s => s.paymentStatus !== 'Paid').length;

          // Layer 1: Business Software & Applications
          const bizCourses = ['html_css', 'react_course', 'django_course', 'javascript_course', 'core_js', 'git_github', 'json_course', 'devops', 'web_design_20days'];
          const bizStudents = students.filter(s => {
            const courses = (s.enrolledCourse || '').split(',').map(c => c.trim());
            return courses.some(c => bizCourses.includes(c));
          });

          // Layer 2: College Projects
          const collegeCourses = ['python_course', 'agentic_ai', 'generative_ai_course', 'python_da', 'sql_da', 'stats_course', 'numpy_course', 'pandas_course', 'matplotlib_course', 'seaborn_course'];
          const collegeStudents = students.filter(s => {
            const courses = (s.enrolledCourse || '').split(',').map(c => c.trim());
            return courses.some(c => collegeCourses.includes(c));
          });

          // Layer 3: Course Enrollment
          const enrollCourses = ['sql', 'summer_sql', 'powerbi', 'tally_prime', 'spoko_story', 'spoko_pro'];
          const enrollStudents = students.filter(s => {
            const courses = (s.enrolledCourse || '').split(',').map(c => c.trim());
            return courses.some(c => enrollCourses.includes(c));
          });

          const avgRevPerStudent = 4999;
          const totalRevenue = paidStudents * avgRevPerStudent;
          const bizRevenue = Math.round(bizStudents.length * avgRevPerStudent * 0.4);
          const collegeRevenue = Math.round(collegeStudents.length * avgRevPerStudent * 0.35);
          const enrollRevenue = Math.round(enrollStudents.length * avgRevPerStudent * 0.25);

          const formatINR = (n) => '₹' + n.toLocaleString('en-IN');

          const now = new Date();
          const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });

          // Course distribution for mini bar chart
          const courseDistribution = [
            { label: 'Python & OOPs', count: students.filter(s => (s.enrolledCourse||'').includes('python')).length, color: '#3b82f6' },
            { label: 'SQL', count: students.filter(s => (s.enrolledCourse||'').includes('sql')).length, color: '#10b981' },
            { label: 'AI Courses', count: students.filter(s => (s.enrolledCourse||'').includes('ai') || (s.enrolledCourse||'').includes('generative')).length, color: '#8b5cf6' },
            { label: 'Web Design', count: students.filter(s => (s.enrolledCourse||'').includes('html') || (s.enrolledCourse||'').includes('react')).length, color: '#f59e0b' },
            { label: 'Others', count: students.filter(s => !(s.enrolledCourse||'').includes('python') && !(s.enrolledCourse||'').includes('sql') && !(s.enrolledCourse||'').includes('ai') && !(s.enrolledCourse||'').includes('html')).length, color: '#ec4899' },
          ];
          const maxCount = Math.max(...courseDistribution.map(c => c.count), 1);

          const recentStudents = [...students].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 5);

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* ═══════════════════ HERO STATS BAR ═══════════════════ */}
              <div style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
                borderRadius: '28px',
                padding: '2.5rem',
                color: '#ffffff',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(15,23,42,0.4)'
              }}>
                {/* Decorative glows */}
                <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-40px', left: '30%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#818cf8', marginBottom: '0.4rem' }}>VeeGo Learning Center</div>
                      <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, background: 'linear-gradient(90deg, #ffffff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Revenue Command Center
                      </h2>
                      <p style={{ margin: '0.3rem 0 0 0', color: '#94a3b8', fontSize: '0.88rem' }}>{monthName} — Live Performance Dashboard</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>Total Revenue Collected</div>
                      <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#22c55e', lineHeight: 1 }}>{formatINR(totalRevenue)}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>{paidStudents} paid enrollments</div>
                    </div>
                  </div>

                  {/* 4 Metric Pills */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                    {[
                      { label: 'Total Students', value: totalStudentsCount, icon: '👥', color: '#60a5fa' },
                      { label: 'Paid Enrollments', value: paidStudents, icon: '✅', color: '#34d399' },
                      { label: 'Pending Payments', value: pendingPayments, icon: '⏳', color: '#fbbf24' },
                      { label: 'Device Locked', value: totalLocked, icon: '🔒', color: '#f472b6' },
                    ].map((m, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '1rem 1.25rem', backdropFilter: 'blur(8px)' }}>
                        <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{m.icon}</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: m.color, lineHeight: 1 }}>{m.value}</div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.25rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ═══════════════════ 3 LAYER CARDS ═══════════════════ */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

                {/* LAYER 1 — Business Software & Applications */}
                <div style={{
                  background: 'linear-gradient(145deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)',
                  borderRadius: '24px',
                  padding: '2rem',
                  color: '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(29,78,216,0.35)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ position: 'absolute', top: '-30px', right: '-30px', opacity: 0.12 }}>
                    <Briefcase size={150} />
                  </div>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '0.6rem', display: 'flex' }}>
                        <Briefcase size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.7, fontWeight: 800 }}>Layer 1</div>
                        <div style={{ fontSize: '1rem', fontWeight: 900 }}>Business Software & Apps</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '0.25rem' }}>{formatINR(bizRevenue)}</div>
                    <div style={{ fontSize: '0.82rem', opacity: 0.8, marginBottom: '1.5rem' }}>Estimated revenue from {bizStudents.length} business clients</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      {[
                        { label: 'Clients', value: bizStudents.length },
                        { label: 'Apps / Software', value: bizCourses.length },
                        { label: 'Avg. Contract', value: '₹4,999' },
                        { label: 'Target', value: 'Businesses' },
                      ].map((item, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0.6rem 0.8rem' }}>
                          <div style={{ fontSize: '0.65rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
                          <div style={{ fontSize: '1rem', fontWeight: 800 }}>{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: '1.25rem', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.12)', borderRadius: '12px', fontSize: '0.78rem', opacity: 0.9 }}>
                      📌 Business Software, Custom Apps, SaaS, Portals, Enterprise Solutions
                    </div>
                  </div>
                </div>

                {/* LAYER 2 — College Projects */}
                <div style={{
                  background: 'linear-gradient(145deg, #7c3aed 0%, #8b5cf6 60%, #a78bfa 100%)',
                  borderRadius: '24px',
                  padding: '2rem',
                  color: '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(124,58,237,0.35)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ position: 'absolute', top: '-30px', right: '-30px', opacity: 0.12 }}>
                    <Brain size={150} />
                  </div>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '0.6rem', display: 'flex' }}>
                        <Brain size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.7, fontWeight: 800 }}>Layer 2</div>
                        <div style={{ fontSize: '1rem', fontWeight: 900 }}>College Projects</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '0.25rem' }}>{formatINR(collegeRevenue)}</div>
                    <div style={{ fontSize: '0.82rem', opacity: 0.8, marginBottom: '1.5rem' }}>Estimated revenue from {collegeStudents.length} project orders</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      {[
                        { label: 'College Students', value: collegeStudents.length },
                        { label: 'Project Types', value: collegeCourses.length },
                        { label: 'Avg. Price', value: '₹4,999' },
                        { label: 'Target', value: 'College Students' },
                      ].map((item, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0.6rem 0.8rem' }}>
                          <div style={{ fontSize: '0.65rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
                          <div style={{ fontSize: '1rem', fontWeight: 800 }}>{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: '1.25rem', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.12)', borderRadius: '12px', fontSize: '0.78rem', opacity: 0.9 }}>
                      📌 Final Year Major Projects, Mini Projects, GenAI & ML Prototypes
                    </div>
                  </div>
                </div>

                {/* LAYER 3 — Course Enrollment */}
                <div style={{
                  background: 'linear-gradient(145deg, #0f766e 0%, #059669 60%, #10b981 100%)',
                  borderRadius: '24px',
                  padding: '2rem',
                  color: '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(5,150,105,0.35)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ position: 'absolute', top: '-30px', right: '-30px', opacity: 0.12 }}>
                    <BookOpen size={150} />
                  </div>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '0.6rem', display: 'flex' }}>
                        <BookOpen size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.7, fontWeight: 800 }}>Layer 3</div>
                        <div style={{ fontSize: '1rem', fontWeight: 900 }}>Course Enrollment (Online & Offline)</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '0.25rem' }}>{formatINR(enrollRevenue)}</div>
                    <div style={{ fontSize: '0.82rem', opacity: 0.8, marginBottom: '1.5rem' }}>Estimated revenue from {enrollStudents.length} course enrollees</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      {[
                        { label: 'Enrolled Students', value: enrollStudents.length },
                        { label: 'Courses Offered', value: enrollCourses.length },
                        { label: 'Avg. Course Fee', value: '₹3,499' },
                        { label: 'Training Mode', value: 'Online & Offline' },
                      ].map((item, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0.6rem 0.8rem' }}>
                          <div style={{ fontSize: '0.65rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
                          <div style={{ fontSize: '1rem', fontWeight: 800 }}>{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: '1.25rem', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.12)', borderRadius: '12px', fontSize: '0.78rem', opacity: 0.9 }}>
                      📌 Online & Offline Courses, Skill Bootcamps, Certifications
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══════════════════ BOTTOM ROW: Chart + Recent Students ═══════════════════ */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '1.5rem' }}>

                {/* Course Distribution Bar Chart */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Course Distribution</h3>
                      <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>Students per course track</p>
                    </div>
                    <div style={{ background: '#f0fdf4', color: '#059669', padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                      {totalStudentsCount} Total
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {courseDistribution.map((cd, i) => {
                      const pct = Math.round((cd.count / maxCount) * 100);
                      return (
                        <div key={i}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>{cd.label}</span>
                            <span style={{ fontSize: '0.82rem', fontWeight: 900, color: cd.color }}>{cd.count}</span>
                          </div>
                          <div style={{ background: '#f1f5f9', borderRadius: '8px', height: '10px', overflow: 'hidden' }}>
                            <div style={{
                              width: pct + '%',
                              height: '100%',
                              background: cd.color,
                              borderRadius: '8px',
                              transition: 'width 0.6s ease'
                            }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Revenue breakdown mini */}
                  <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.88rem', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Revenue Split by Layer</h4>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {[
                        { label: 'Biz Apps', val: formatINR(bizRevenue), color: '#3b82f6' },
                        { label: 'College', val: formatINR(collegeRevenue), color: '#8b5cf6' },
                        { label: 'Enrollment', val: formatINR(enrollRevenue), color: '#10b981' },
                      ].map((r, i) => (
                        <div key={i} style={{ flex: 1, minWidth: '80px', background: r.color + '12', border: `1px solid ${r.color}33`, borderRadius: '12px', padding: '0.6rem 0.75rem', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: r.color, letterSpacing: '0.5px' }}>{r.label}</div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 900, color: r.color, marginTop: '0.25rem' }}>{r.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Enrollments */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Recent Enrollments</h3>
                      <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>Latest student registrations</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('database')}
                      style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#3b82f6', padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>
                      View All
                    </button>
                  </div>

                  {recentStudents.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                      <Users size={36} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
                      <p style={{ margin: 0, fontSize: '0.88rem' }}>No students registered yet.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {recentStudents.map((s, i) => {
                        const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];
                        const col = colors[i % colors.length];
                        const initials = (s.name || 'S').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
                        const courseLabel = getCourseLabel(s.enrolledCourse).slice(0, 22) + (getCourseLabel(s.enrolledCourse).length > 22 ? '…' : '');
                        return (
                          <div key={s._id || s.id || i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: col + '22', border: `2px solid ${col}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: col, fontSize: '0.85rem', flexShrink: 0 }}>
                              {initials}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                              <div style={{ fontSize: '0.72rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{courseLabel}</div>
                            </div>
                            <div style={{ flexShrink: 0 }}>
                              <span style={{
                                fontSize: '0.65rem', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: '20px', textTransform: 'uppercase',
                                background: s.paymentStatus === 'Paid' ? '#dcfce7' : '#fef9c3',
                                color: s.paymentStatus === 'Paid' ? '#166534' : '#854d0e'
                              }}>
                                {s.paymentStatus || 'Pending'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Welcome Card */}
                  <div style={{ marginTop: '1.25rem', background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', borderRadius: '16px', padding: '1.25rem', color: '#ffffff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', padding: '0.5rem', display: 'flex' }}>
                        <Star size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Welcome, {session.name}!</div>
                        <div style={{ fontSize: '0.72rem', opacity: 0.85, marginTop: '0.15rem' }}>
                          {session.role === 'admin' ? 'Root Admin' : 'Staff Instructor'} • {session.role === 'admin' ? 'Full access to all modules' : 'Manage students & courses'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══════════════════ QUICK ACTIONS ═══════════════════ */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.05rem', fontWeight: 900, color: '#0f172a' }}>⚡ Quick Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  {[
                    { label: 'Enroll Student', desc: 'Add new student record', icon: '➕', color: '#3b82f6', tab: 'register' },
                    { label: 'Live Database', desc: 'View all student records', icon: '🗄️', color: '#8b5cf6', tab: 'database' },
                    { label: 'Review Tasks', desc: 'Grade submissions', icon: '✅', color: '#10b981', tab: 'grading' },
                    { label: 'Course Catalog', desc: 'Browse & launch courses', icon: '📚', color: '#f59e0b', tab: 'courses' },
                    { label: 'Fee Invoices', desc: 'Generate invoices', icon: '🧾', color: '#ec4899', tab: 'invoices' },
                    { label: 'Certificates', desc: 'Upload certificates', icon: '🏆', color: '#06b6d4', tab: 'certificates' },
                  ].map((action, i) => (
                    <div key={i}
                      onClick={() => setActiveTab(action.tab)}
                      style={{ background: action.color + '0d', border: `1.5px solid ${action.color}33`, borderRadius: '16px', padding: '1.25rem', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = action.color + '1a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 20px ${action.color}22`; }}
                      onMouseLeave={e => { e.currentTarget.style.background = action.color + '0d'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{action.icon}</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>{action.label}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>{action.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          );
        })()}

        {/* 📚 TAB 2: COURSE CATALOG VIEW */}
        {activeTab === 'courses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            {/* Main Course Categories Selector Cards */}
            <div>
              <div style={{ borderLeft: '4px solid var(--accent-primary)', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>Select Main Stream Track</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {mainCourses.map(course => {
                  const isActive = activeMainCourse === course.id;

                  const hasEnrolledSubCourse = subCourses.some(sub => {
                    const belongs = Array.isArray(sub.mainCourseId)
                      ? sub.mainCourseId.includes(course.id)
                      : sub.mainCourseId === course.id;
                    const enrolledList = enrolledCourse ? enrolledCourse.split(',') : [];
                    return belongs && (enrolledCourse === 'all' || enrolledList.includes(sub.enrolledKey));
                  });

                  const isStudent = session?.role === 'student';
                  const isLocked = isStudent && !hasEnrolledSubCourse;

                  return (
                    <div
                      key={course.id}
                      onClick={() => {
                        if (isLocked) {
                          alert(`This curriculum track (${course.title}) is locked. Please contact support to enroll.`);
                          return;
                        }
                        setActiveMainCourse(course.id);
                      }}
                      style={{
                        background: isActive ? course.gradient : 'var(--surface-color)',
                        color: isActive ? '#ffffff' : 'var(--text-primary)',
                        border: isActive ? `1px solid ${course.color}` : '1px solid var(--surface-border)',
                        borderRadius: '24px',
                        padding: '1.5rem',
                        cursor: isLocked ? 'not-allowed' : 'pointer',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'var(--transition)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '180px',
                        opacity: isLocked ? 0.6 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (!isLocked) {
                          e.currentTarget.style.transform = 'translateY(-6px)';
                          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLocked) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        }
                      }}
                    >
                      <div>
                        <div style={{
                          background: isActive ? 'rgba(255, 255, 255, 0.18)' : course.bgLight,
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isActive ? '#ffffff' : course.color,
                          marginBottom: '1rem'
                        }}>
                          {course.icon}
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.4rem 0', color: isActive ? '#ffffff' : 'var(--text-primary)' }}>
                          {course.title}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: isActive ? '#eff6ff' : 'var(--text-secondary)', opacity: 0.95, lineHeight: 1.4, margin: 0 }}>
                          {course.desc}
                        </p>
                      </div>

                      {hasEnrolledSubCourse && (
                        <span style={{
                          position: 'absolute',
                          top: '1.5rem',
                          right: '1.5rem',
                          background: isActive ? '#ffffff' : course.color,
                          color: isActive ? course.color : '#ffffff',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '20px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Enrolled
                        </span>
                      )}

                      {isLocked && (
                        <span style={{
                          position: 'absolute',
                          top: '1.5rem',
                          right: '1.5rem',
                          background: '#f1f5f9',
                          color: 'var(--text-secondary)',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '20px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          border: '1px solid var(--surface-border)'
                        }}>
                          🔒 Locked
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sub-courses display gallery based on chosen category */}
            <div>
              <div style={{ borderLeft: `4px solid ${mainCourses.find(c => c.id === activeMainCourse)?.color || '#3b82f6'}`, paddingLeft: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
                  {mainCourses.find(c => c.id === activeMainCourse)?.title} Modules Catalog
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {subCourses
                  .filter(sub => {
                    return Array.isArray(sub.mainCourseId)
                      ? sub.mainCourseId.includes(activeMainCourse)
                      : sub.mainCourseId === activeMainCourse;
                  })
                  .map(sub => {
                    const enrolledList = enrolledCourse ? enrolledCourse.split(',') : [];
                    const isEnrolled = enrolledCourse === 'all' || enrolledList.includes(sub.enrolledKey);

                    return (
                      <div
                        key={sub.id}
                        onClick={() => {
                          if (isEnrolled) {
                            onSelectCourse(sub.id);
                          } else {
                            setSelfEnrollCourse(sub.enrolledKey || sub.id);
                            setShowSelfEnrollModal(true);
                          }
                        }}
                        style={{
                          borderRadius: '24px',
                          padding: '2rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: '270px',
                          cursor: 'pointer',
                          backgroundColor: isEnrolled ? 'var(--surface-color)' : '#f8fafc',
                          color: isEnrolled ? 'var(--text-primary)' : 'var(--text-tertiary)',
                          border: isEnrolled ? `1px solid ${sub.borderColor}` : '1px dashed var(--surface-border)',
                          opacity: isEnrolled ? 1 : 0.9,
                          position: 'relative',
                          boxShadow: 'var(--shadow-sm)',
                          transition: 'var(--transition)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-6px)';
                          e.currentTarget.style.boxShadow = `0 12px 24px -10px ${sub.shadowColor}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{
                              background: sub.bgColor,
                              width: '50px',
                              height: '50px',
                              borderRadius: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: sub.borderColor
                            }}>
                              {sub.icon}
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <span style={{ fontSize: '0.68rem', fontWeight: 800, background: '#eff6ff', color: '#2563eb', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>💻 Online</span>
                              <span style={{ fontSize: '0.68rem', fontWeight: 800, background: '#f0fdf4', color: '#16a34a', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>🏫 Offline</span>
                            </div>
                          </div>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
                            {sub.title}
                          </h3>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', opacity: 0.95, lineHeight: 1.5, margin: 0 }}>
                            {sub.desc}
                          </p>
                        </div>

                        <div style={{
                          display: 'flex',
                          justify: 'space-between',
                          alignItems: 'center',
                          marginTop: '1.5rem',
                          borderTop: '1px solid var(--surface-border)',
                          paddingTop: '1rem',
                          gap: '12px'
                        }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                            {sub.modulesCount}
                          </span>

                          {isEnrolled ? (
                            <span style={{ fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', color: sub.borderColor, flexShrink: 0 }}>
                              Start Course <ArrowRight size={14} />
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelfEnrollCourse(sub.enrolledKey || sub.id);
                                setShowSelfEnrollModal(true);
                              }}
                              style={{
                                border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                color: '#ffffff', fontSize: '0.78rem', fontWeight: 800, padding: '0.45rem 0.9rem',
                                borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                                boxShadow: '0 4px 10px rgba(37, 99, 235, 0.25)'
                              }}
                            >
                              <CreditCard size={12} /> Self-Enroll & Pay
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>
        )}

        {/* 👤 TAB 3: REGISTER NEW STUDENT/STAFF FORM VIEW */}
        {activeTab === 'register' && (session?.role === 'admin' || session?.role === 'staff') && (
          <div style={{ maxWidth: '600px', background: 'var(--surface-color)', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>

            {/* Toggle tabs for Admin role selection */}
            {session?.role === 'admin' && (
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.3rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => { setEnrollRole('student'); setAdminError(''); setSuccessMsg(''); }}
                  style={{
                    flex: 1, padding: '0.6rem', border: 'none', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
                    background: enrollRole === 'student' ? '#ffffff' : 'transparent',
                    color: enrollRole === 'student' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    boxShadow: enrollRole === 'student' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Enroll Student
                </button>
                <button
                  onClick={() => { setEnrollRole('staff'); setAdminError(''); setSuccessMsg(''); }}
                  style={{
                    flex: 1, padding: '0.6rem', border: 'none', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
                    background: enrollRole === 'staff' ? '#ffffff' : 'transparent',
                    color: enrollRole === 'staff' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    boxShadow: enrollRole === 'staff' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Enroll Staff
                </button>
              </div>
            )}

            {enrollRole === 'student' ? (
              <form onSubmit={handleRegisterStudent} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.25rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
                  <UserPlus size={24} color="#3b82f6" /> Enroll New Student Record
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Student Full Name</label>
                  <input
                    value={newStudentName}
                    onChange={e => setNewStudentName(e.target.value)}
                    placeholder="Enter name..."
                    style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Select Curriculums Pathways (Enroll in multiple)</label>
                  <div style={{
                    maxHeight: '220px',
                    overflowY: 'auto',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '12px',
                    padding: '1rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '0.75rem',
                    background: '#f8fafc'
                  }}>
                    {availableCourseOptions.map(course => {
                      const isChecked = (assignedCourse || '').split(',').includes(course.value);
                      return (
                        <label
                          key={course.value}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: isChecked ? 700 : 500,
                            color: isChecked ? 'var(--accent-primary)' : 'var(--text-primary)'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              const list = assignedCourse ? assignedCourse.split(',') : [];
                              let newList;
                              if (list.includes(course.value)) {
                                if (list.length === 1) return;
                                newList = list.filter(c => c !== course.value);
                              } else {
                                newList = [...list, course.value];
                              }
                              setAssignedCourse(newList.join(','));
                            }}
                            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                          />
                          <span>{course.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {adminError && <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 700, background: 'rgba(239, 68, 68, 0.05)', padding: '0.6rem 1rem', borderRadius: '10px', borderLeft: '3px solid #ef4444' }}>⚠️ {adminError}</div>}
                {successMsg && <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700, background: 'rgba(16, 185, 129, 0.05)', padding: '0.6rem 1rem', borderRadius: '10px', borderLeft: '3px solid #10b981' }}>{successMsg}</div>}

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', borderRadius: '12px' }}>
                  Generate Student Access Code
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterStaff} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.25rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
                  <UserPlus size={24} color="#6366f1" /> Enroll New Staff Tutor
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Tutor Full Name</label>
                  <input
                    value={newStaffName}
                    onChange={e => setNewStaffName(e.target.value)}
                    placeholder="Enter tutor name..."
                    style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Username ID</label>
                  <input
                    value={newStaffUsername}
                    onChange={e => setNewStaffUsername(e.target.value)}
                    placeholder="Enter login username ID..."
                    style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Password Key</label>
                  <input
                    type="text"
                    value={newStaffPassword}
                    onChange={e => setNewStaffPassword(e.target.value)}
                    placeholder="Enter login password..."
                    style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem' }}
                  />
                </div>

                {adminError && <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 700, background: 'rgba(239, 68, 68, 0.05)', padding: '0.6rem 1rem', borderRadius: '10px', borderLeft: '3px solid #ef4444' }}>⚠️ {adminError}</div>}
                {successMsg && <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700, background: 'rgba(16, 185, 129, 0.05)', padding: '0.6rem 1rem', borderRadius: '10px', borderLeft: '3px solid #10b981' }}>{successMsg}</div>}

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}>
                  Create Staff Credentials
                </button>
              </form>
            )}

          </div>
        )}

        {/* 🗄️ TAB 4: LIVE USER DATABASE VIEW */}
        {activeTab === 'database' && (session?.role === 'admin' || session?.role === 'staff') && (
          <div style={{ background: 'var(--surface-color)', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>

            {/* Toggle tabs for Admin database selection */}
            {session?.role === 'admin' && (
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.3rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => setDbTab('students')}
                  style={{
                    flex: 1, padding: '0.6rem', border: 'none', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
                    background: dbTab === 'students' ? '#ffffff' : 'transparent',
                    color: dbTab === 'students' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    boxShadow: dbTab === 'students' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Students Database
                </button>
                <button
                  onClick={() => setDbTab('staff')}
                  style={{
                    flex: 1, padding: '0.6rem', border: 'none', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
                    background: dbTab === 'staff' ? '#ffffff' : 'transparent',
                    color: dbTab === 'staff' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    boxShadow: dbTab === 'staff' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Staff Directory
                </button>
              </div>
            )}

            {dbTab === 'students' ? (
              <>
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid var(--surface-border)',
                  paddingBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.25rem' }}>
                    <Users size={24} color="#10b981" />
                    <span>Enrolled Student Credentials Directory</span>
                    <span style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px'
                    }}>
                      {filteredStudents.length} {filteredStudents.length === 1 ? 'Student' : 'Students'}
                    </span>
                  </div>

                  {/* Search Bar */}
                  <div style={{
                    position: 'relative',
                    width: isMobile ? '100%' : '320px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', color: '#94a3b8', pointerEvents: 'none' }} />
                    <input
                      type="text"
                      value={studentSearch}
                      onChange={(e) => {
                        setStudentSearch(e.target.value);
                        setStudentPage(1);
                      }}
                      placeholder="Search student, access key, course..."
                      style={{
                        width: '100%',
                        padding: '0.55rem 2.2rem 0.55rem 2.3rem',
                        fontSize: '0.88rem',
                        borderRadius: '10px',
                        border: '1px solid var(--surface-border)',
                        background: 'var(--bg-color)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                    />
                    {studentSearch && (
                      <button
                        onClick={() => {
                          setStudentSearch('');
                          setStudentPage(1);
                        }}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          background: 'none',
                          border: 'none',
                          color: '#94a3b8',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: 2
                        }}
                        title="Clear search"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {filteredStudents.length > 0 ? (
                  <>
                    {!isMobile ? (
                      /* 🖥️ DESKTOP TABLE VIEW */
                      <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                          <thead>
                            <tr style={{ color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.02)', borderBottom: '2px solid var(--surface-border)' }}>
                              <th style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>STUDENT NAME</th>
                              <th style={{ padding: '1rem 1.25rem' }}>ENROLLED CURRICULUMS</th>
                              <th style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>ACCESS CODE</th>
                              <th style={{ padding: '1rem 1.25rem', minWidth: '220px' }}>COURSE PROGRESS</th>
                              <th style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>SHAREABLE LINK</th>
                              <th style={{ padding: '1rem 1.25rem', textAlign: 'center', whiteSpace: 'nowrap' }}>ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedStudents.map(s => (
                              <tr key={s._id || s.id} style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--surface-border)', transition: 'background 0.2s' }}>
                                <td style={{ padding: '1rem 1.25rem', fontWeight: 800 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{
                                      width: 34, height: 34, borderRadius: '50%',
                                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                      color: '#ffffff', fontWeight: 900, fontSize: '0.82rem',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                    }}>
                                      {s.name ? s.name.substring(0, 2).toUpperCase() : 'ST'}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setViewingProgressStudent(s)}
                                      style={{
                                        background: 'none', border: 'none', color: '#0f172a', fontWeight: 800, cursor: 'pointer',
                                        fontSize: '0.92rem', textAlign: 'left', padding: 0
                                      }}
                                      title="Click to view detailed per-course progress breakdown"
                                    >
                                      {s.name}
                                    </button>
                                  </div>
                                </td>
                                <td style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                  {getCourseLabel(s.enrolledCourse)}
                                </td>
                                <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                                  <span style={{
                                    fontFamily: 'monospace', fontWeight: 800, color: '#d97706',
                                    background: '#fef3c7', border: '1px solid #fde68a',
                                    padding: '4px 10px', borderRadius: '8px', fontSize: '0.84rem'
                                  }}>
                                    {s.accessCode}
                                  </span>
                                </td>
                                <td style={{ padding: '1rem 1.25rem', minWidth: '220px' }}>
                                  {(() => {
                                    const detailed = calculateDetailedCourseProgress(s);
                                    const { completedCount, totalCount, percentage } = calculateStudentProgress(s);
                                    const badgeColor = percentage === 100 ? '#10b981' : percentage > 0 ? '#2563eb' : '#64748b';
                                    const bgLight = percentage === 100 ? 'rgba(16, 185, 129, 0.1)' : percentage > 0 ? 'rgba(37, 99, 235, 0.1)' : '#f1f5f9';

                                    return (
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        {/* Progress Summary Header */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                                          <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            color: badgeColor,
                                            background: bgLight,
                                            padding: '2px 8px',
                                            borderRadius: '12px'
                                          }}>
                                            {detailed.length} {detailed.length === 1 ? 'Track' : 'Tracks'} · {percentage}%
                                          </span>
                                          <span style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                                            {completedCount}/{totalCount} topics
                                          </span>
                                        </div>

                                        {/* Overall Progress Bar */}
                                        <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                                          <div style={{
                                            width: `${percentage}%`,
                                            height: '100%',
                                            background: percentage === 100
                                              ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                                              : 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
                                            borderRadius: '10px',
                                            transition: 'width 0.4s ease'
                                          }} />
                                        </div>

                                        {/* Individual Course Micro Pills */}
                                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '2px' }}>
                                          {detailed.slice(0, 3).map(c => (
                                            <span
                                              key={c.courseKey}
                                              style={{
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                color: c.percentage === 100 ? '#059669' : c.percentage > 0 ? '#1d4ed8' : '#64748b',
                                                background: c.percentage === 100 ? '#d1fae5' : c.percentage > 0 ? '#eff6ff' : '#f8fafc',
                                                border: `1px solid ${c.percentage === 100 ? '#a7f3d0' : c.percentage > 0 ? '#bfdbfe' : '#e2e8f0'}`,
                                                padding: '1px 6px',
                                                borderRadius: '6px'
                                              }}
                                              title={`${c.courseLabel}: ${c.completedTopics}/${c.totalTopics} topics (${c.percentage}%)`}
                                            >
                                              {c.courseLabel.split(' ')[0]}: {c.percentage}%
                                            </span>
                                          ))}
                                          {detailed.length > 3 && (
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>
                                              +{detailed.length - 3}
                                            </span>
                                          )}
                                        </div>

                                        {/* Detail Modal Trigger Button */}
                                        <button
                                          type="button"
                                          onClick={() => setViewingProgressStudent(s)}
                                          style={{
                                            marginTop: '4px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                            color: '#ffffff',
                                            border: 'none',
                                            padding: '4px 10px',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.2)',
                                            width: 'fit-content'
                                          }}
                                        >
                                          <BarChart3 size={12} /> Audit Progress
                                        </button>
                                      </div>
                                    );
                                  })()}
                                </td>
                                <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                                  <button
                                    onClick={() => {
                                      const loginUrl = `${window.location.origin}/?code=${s.accessCode}`;
                                      navigator.clipboard.writeText(loginUrl);
                                      alert(`Copied direct access link for ${s.name}!\n\nLink: ${loginUrl}`);
                                    }}
                                    style={{
                                      background: '#f8fafc', border: '1px solid var(--surface-border)', color: 'var(--text-primary)',
                                      padding: '0.45rem 0.85rem', borderRadius: '8px', cursor: 'pointer',
                                      fontSize: '0.8rem', fontWeight: 700, transition: 'var(--transition)',
                                      display: 'inline-flex', alignItems: 'center', gap: '4px'
                                    }}
                                  >
                                    <Copy size={12} /> Copy Link
                                  </button>
                                </td>
                                <td style={{ padding: '1rem 1.25rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                  <button
                                    onClick={() => handleOpenEditCoursesModal(s)}
                                    style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '8px', marginRight: '6px' }}
                                  >
                                    Edit Tracks
                                  </button>
                                  {session?.role === 'admin' && (
                                    <button
                                      onClick={() => handleDeleteStudent(s._id || s.id)}
                                      style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '8px' }}
                                    >
                                      Delete
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      /* 📱 MOBILE RESPONSIVE CARD GRID VIEW */
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                        {paginatedStudents.map(s => {
                          const detailed = calculateDetailedCourseProgress(s);
                          const { completedCount, totalCount, percentage } = calculateStudentProgress(s);

                          return (
                            <div
                              key={s._id || s.id}
                              style={{
                                background: '#ffffff',
                                border: '1px solid var(--surface-border)',
                                borderRadius: '18px',
                                padding: '1.25rem',
                                boxShadow: 'var(--shadow-sm)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                              }}
                            >
                              {/* Student Header */}
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{
                                    width: 40, height: 40, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                    color: '#ffffff', fontWeight: 900, fontSize: '0.9rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                  }}>
                                    {s.name ? s.name.substring(0, 2).toUpperCase() : 'ST'}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
                                      {s.name}
                                    </div>
                                    <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#d97706', background: '#fef3c7', border: '1px solid #fde68a', padding: '1px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>
                                      {s.accessCode}
                                    </span>
                                  </div>
                                </div>

                                {s.deviceId ? (
                                  <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.74rem', background: 'rgba(16, 185, 129, 0.08)', padding: '0.25rem 0.6rem', borderRadius: '20px' }}>
                                    🔒 Locked
                                  </span>
                                ) : (
                                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.74rem', background: 'rgba(0, 0, 0, 0.03)', padding: '0.25rem 0.6rem', borderRadius: '20px' }}>
                                    🆕 Unlocked
                                  </span>
                                )}
                              </div>

                              {/* Enrolled Track Description */}
                              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', background: '#f8fafc', padding: '8px 12px', borderRadius: '10px' }}>
                                <strong>Enrolled Tracks:</strong> {getCourseLabel(s.enrolledCourse)}
                              </div>

                              {/* Progress Card Section */}
                              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb' }}>
                                    {detailed.length} {detailed.length === 1 ? 'Track' : 'Tracks'} · {percentage}% Complete
                                  </span>
                                  <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700 }}>
                                    {completedCount}/{totalCount} topics
                                  </span>
                                </div>

                                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                                  <div style={{
                                    width: `${percentage}%`,
                                    height: '100%',
                                    background: percentage === 100
                                      ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                                      : 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
                                    borderRadius: '10px',
                                    transition: 'width 0.4s ease'
                                  }} />
                                </div>

                                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                  {detailed.map(c => (
                                    <span
                                      key={c.courseKey}
                                      style={{
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        color: c.percentage === 100 ? '#059669' : c.percentage > 0 ? '#1d4ed8' : '#64748b',
                                        background: c.percentage === 100 ? '#d1fae5' : c.percentage > 0 ? '#eff6ff' : '#ffffff',
                                        border: `1px solid ${c.percentage === 100 ? '#a7f3d0' : c.percentage > 0 ? '#bfdbfe' : '#e2e8f0'}`,
                                        padding: '2px 6px',
                                        borderRadius: '6px'
                                      }}
                                    >
                                      {c.courseLabel.split(' ')[0]}: {c.percentage}%
                                    </span>
                                  ))}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setViewingProgressStudent(s)}
                                  style={{
                                    marginTop: '4px',
                                    width: '100%',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '8px',
                                    borderRadius: '10px',
                                    fontSize: '0.8rem',
                                    fontWeight: 800,
                                    cursor: 'pointer'
                                  }}
                                >
                                  <BarChart3 size={14} /> View Course Progress Breakdown
                                </button>
                              </div>

                              {/* Card Action Controls */}
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '4px', borderTop: '1px solid #f1f5f9' }}>
                                <button
                                  onClick={() => {
                                    const loginUrl = `${window.location.origin}/?code=${s.accessCode}`;
                                    navigator.clipboard.writeText(loginUrl);
                                    alert(`Copied direct access link for ${s.name}!\n\nLink: ${loginUrl}`);
                                  }}
                                  style={{
                                    flex: 1, background: '#f8fafc', border: '1px solid var(--surface-border)', color: 'var(--text-primary)',
                                    padding: '0.45rem 0.6rem', borderRadius: '8px', cursor: 'pointer',
                                    fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                                  }}
                                >
                                  <Copy size={12} /> Copy Link
                                </button>
                                <button
                                  onClick={() => handleOpenEditCoursesModal(s)}
                                  style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', fontWeight: 800, cursor: 'pointer', fontSize: '0.78rem', padding: '0.45rem 0.6rem', borderRadius: '8px' }}
                                >
                                  Edit Tracks
                                </button>
                                {s.deviceId && (
                                  <button
                                    onClick={() => handleResetDevice(s._id || s.id)}
                                    style={{ background: '#fffbe8', border: '1px solid #fde68a', color: '#d97706', fontWeight: 800, cursor: 'pointer', fontSize: '0.78rem', padding: '0.45rem 0.6rem', borderRadius: '8px' }}
                                  >
                                    Reset Lock
                                  </button>
                                )}
                                {session?.role === 'admin' && (
                                  <button
                                    onClick={() => handleDeleteStudent(s._id || s.id)}
                                    style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', fontWeight: 800, cursor: 'pointer', fontSize: '0.78rem', padding: '0.45rem 0.6rem', borderRadius: '8px' }}
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Pagination Controls */}
                    <div style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginTop: '1.25rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--surface-border)',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <span>
                          Showing <strong>{startIndex + 1}</strong> to <strong>{endIndex}</strong> of <strong>{filteredStudents.length}</strong> students
                          {studentSearch && ` (filtered from ${students.length} total)`}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span>Per page:</span>
                          <select
                            value={itemsPerPage}
                            onChange={(e) => {
                              setItemsPerPage(Number(e.target.value));
                              setStudentPage(1);
                            }}
                            style={{
                              padding: '0.25rem 0.5rem',
                              borderRadius: '6px',
                              border: '1px solid var(--surface-border)',
                              background: 'var(--bg-color)',
                              color: 'var(--text-primary)',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <button
                          onClick={() => setStudentPage(p => Math.max(1, p - 1))}
                          disabled={safeStudentPage <= 1}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '0.4rem 0.7rem',
                            borderRadius: '8px',
                            border: '1px solid var(--surface-border)',
                            background: safeStudentPage <= 1 ? '#f1f5f9' : '#ffffff',
                            color: safeStudentPage <= 1 ? '#cbd5e1' : 'var(--text-primary)',
                            fontWeight: 700,
                            cursor: safeStudentPage <= 1 ? 'not-allowed' : 'pointer'
                          }}
                        >
                          <ChevronLeft size={16} /> Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                          <button
                            key={pageNum}
                            onClick={() => setStudentPage(pageNum)}
                            style={{
                              padding: '0.4rem 0.75rem',
                              borderRadius: '8px',
                              border: pageNum === safeStudentPage ? 'none' : '1px solid var(--surface-border)',
                              background: pageNum === safeStudentPage ? '#10b981' : '#ffffff',
                              color: pageNum === safeStudentPage ? '#ffffff' : 'var(--text-primary)',
                              fontWeight: 800,
                              cursor: 'pointer',
                              boxShadow: pageNum === safeStudentPage ? '0 2px 6px rgba(16,185,129,0.3)' : 'none'
                            }}
                          >
                            {pageNum}
                          </button>
                        ))}

                        <button
                          onClick={() => setStudentPage(p => Math.min(totalPages, p + 1))}
                          disabled={safeStudentPage >= totalPages}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '0.4rem 0.7rem',
                            borderRadius: '8px',
                            border: '1px solid var(--surface-border)',
                            background: safeStudentPage >= totalPages ? '#f1f5f9' : '#ffffff',
                            color: safeStudentPage >= totalPages ? '#cbd5e1' : 'var(--text-primary)',
                            fontWeight: 700,
                            cursor: safeStudentPage >= totalPages ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Next <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                    <Users size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <p>
                      {studentSearch
                        ? `No students found matching "${studentSearch}". Try clearing your search.`
                        : 'No registered students found in database. Enroll new records above.'
                      }
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
                  <Users size={24} color="#6366f1" /> Active Staff Instructors Directory
                </div>

                {staff.length > 0 ? (
                  <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ textAlign: 'left', color: 'var(--text-secondary)' }}>
                          <th style={{ padding: '1rem' }}>Tutor Name</th>
                          <th style={{ padding: '1rem' }}>Username ID</th>
                          <th style={{ padding: '1rem' }}>Password Key</th>
                          <th style={{ padding: '1rem', textAlign: 'center' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {staff.map(t => (
                          <tr key={t._id || t.id} style={{ color: 'var(--text-primary)' }}>
                            <td style={{ padding: '1rem', fontWeight: 800 }}>{t.name}</td>
                            <td style={{ padding: '1rem', fontFamily: 'monospace', fontWeight: 700 }}>{t.username}</td>
                            <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t.password}</td>
                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                              <button
                                onClick={() => handleDeleteStaff(t._id || t.id)}
                                style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem' }}
                              >
                                Remove Tutor
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                    <Users size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <p>No dynamic staff accounts enrolled. Use the "Enroll Staff" form to register staff instructors.</p>
                  </div>
                )}
              </>
            )}

          </div>
        )}

        {/* 🟢 TAB 5: INDUCTION & DEMO CLASSES */}
        {activeTab === 'demos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div
              onClick={() => onSelectCourse('induction')}
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)',
                borderRadius: '24px',
                padding: '3rem',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem',
                boxShadow: 'var(--shadow-md)',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 30px rgba(79, 70, 229, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              <div style={{ flex: '1 1 500px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.15)', padding: '0.35rem 0.88rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem' }}>
                  <Sparkles size={12} color="#fef08a" /> Induction Sessions
                </div>
                <h2 style={{ fontSize: '2.2rem', color: 'white', fontWeight: 900, margin: '0 0 0.5rem 0' }}>Free Induction & Demo Classes</h2>
                <p style={{ color: '#e0e7ff', margin: 0, fontSize: '1.05rem', lineHeight: 1.5, fontWeight: 500 }}>
                  Learn about AI-Powered workflows, job roadmaps, salaries, and masterclasses across our sub-courses curriculum.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', color: '#4f46e5', padding: '0.85rem 1.8rem', borderRadius: '30px', fontWeight: 800, fontSize: '1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                Launch Demos <ArrowRight size={18} />
              </div>
            </div>
          </div>
        )}

        {/* 🏆 TAB: CERTIFICATE MANAGEMENT (ADMIN/STAFF ONLY) */}
        {activeTab === 'certificates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', width: '100%', boxSizing: 'border-box' }}>

            {/* Upload Certificate Card */}
            <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '20px', padding: 'clamp(1.25rem, 3vw, 2rem)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '12px', padding: '0.6rem', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <Upload size={20} color="#ffffff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, fontFamily: 'system-ui' }}>Upload Student Certificate</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0', fontFamily: 'system-ui' }}>Select a student and upload a PDF or image certificate (max 2MB).</p>
                </div>
              </div>

              {/* Responsive Student Selector & File Input Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
                    Select Student *
                  </label>
                  <select
                    value={certStudentId}
                    onChange={e => { setCertStudentId(e.target.value); setCertSuccessMsg(''); setCertError(''); }}
                    style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.92rem', background: '#ffffff', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}
                  >
                    <option value="">— Choose a student —</option>
                    {students.map(s => (
                      <option key={s._id || s.id} value={s._id || s.id}>
                        {s.name} — {s.accessCode || s.studentId || s._id || s.id}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
                    Certificate File * (PDF or Image, max 2MB)
                  </label>
                  <label htmlFor="cert-file-input" style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '0.75rem 1rem', borderRadius: '12px',
                    border: `2px dashed ${certFile ? '#f59e0b' : '#cbd5e1'}`,
                    background: certFile ? 'rgba(245,158,11,0.05)' : '#fafafa',
                    cursor: 'pointer', transition: 'all 0.2s', boxSizing: 'border-box'
                  }}>
                    <FileText size={20} color={certFile ? '#f59e0b' : '#94a3b8'} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.88rem', color: certFile ? '#d97706' : '#94a3b8', fontWeight: certFile ? 700 : 500, fontFamily: 'system-ui', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {certFile ? certFile.name : 'Click to browse file...'}
                    </span>
                  </label>
                  <input
                    id="cert-file-input"
                    type="file"
                    accept=".pdf,image/*"
                    style={{ display: 'none' }}
                    onChange={e => {
                      setCertFile(e.target.files[0] || null);
                      setCertError('');
                      setCertSuccessMsg('');
                    }}
                  />
                  {certFile && (
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem', fontFamily: 'system-ui' }}>
                      Size: {(certFile.size / 1024).toFixed(1)} KB · Type: {certFile.type || 'Unknown'}
                    </div>
                  )}
                </div>
              </div>

              {/* Error / Success Messages */}
              {certError && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontWeight: 700, fontSize: '0.88rem', fontFamily: 'system-ui' }}>
                  ⚠️ {certError}
                </div>
              )}
              {certSuccessMsg && (
                <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#059669', fontWeight: 700, fontSize: '0.88rem', fontFamily: 'system-ui' }}>
                  ✅ {certSuccessMsg}
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUploadCertificate}
                disabled={certUploading}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: certUploading ? '#e2e8f0' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: certUploading ? '#94a3b8' : '#ffffff',
                  border: 'none', borderRadius: '12px', padding: '0.8rem 2rem',
                  fontSize: '0.95rem', fontWeight: 800, cursor: certUploading ? 'not-allowed' : 'pointer',
                  boxShadow: certUploading ? 'none' : '0 6px 16px rgba(245,158,11,0.3)',
                  transition: 'all 0.2s'
                }}
              >
                <Upload size={18} />
                {certUploading ? 'Uploading...' : 'Upload Certificate'}
              </button>
            </div>

            {/* Existing Certificates Table */}
            <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '20px', padding: 'clamp(1.25rem, 3vw, 2rem)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, fontFamily: 'system-ui' }}>Students With Certificates</h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', background: 'rgba(245,158,11,0.1)', color: '#d97706', padding: '0.35rem 0.85rem', borderRadius: '20px', fontFamily: 'system-ui' }}>
                  {students.filter(s => s.certificate && s.certificate.data).length} Issued
                </span>
              </div>

              {students.filter(s => s.certificate && s.certificate.data).length > 0 ? (
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', borderRadius: '14px', border: '1px solid var(--surface-border)' }}>
                  <table style={{ width: '100%', minWidth: '550px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--surface-border)', color: 'var(--text-secondary)', fontWeight: 700, textAlign: 'left' }}>
                        <th style={{ padding: '0.85rem 1rem', fontFamily: 'system-ui' }}>Student</th>
                        <th style={{ padding: '0.85rem 1rem', fontFamily: 'system-ui' }}>Certificate File</th>
                        <th style={{ padding: '0.85rem 1rem', fontFamily: 'system-ui' }}>Uploaded At</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'center', fontFamily: 'system-ui' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.filter(s => s.certificate && s.certificate.data).map(s => (
                        <tr key={s._id || s.id} style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-primary)', transition: 'background 0.15s' }}>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{s.name}</div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(99, 102, 241, 0.08)', color: '#4f46e5', padding: '0.15rem 0.55rem', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700, marginTop: '4px', fontFamily: 'monospace' }}>
                              {s.accessCode || s.studentId || s._id || s.id}
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245,158,11,0.08)', padding: '0.35rem 0.75rem', borderRadius: '8px', maxWidth: '240px' }}>
                              <FileText size={15} color="#d97706" style={{ flexShrink: 0 }} />
                              <span style={{ fontSize: '0.82rem', color: '#b45309', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={s.certificate.filename}>
                                {s.certificate.filename}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                            {s.certificate.uploadedAt ? new Date(s.certificate.uploadedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                              {s.certificate.data && (
                                <a
                                  href={s.certificate.data}
                                  download={s.certificate.filename || 'certificate.pdf'}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                                    background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
                                    color: '#d97706', fontWeight: 700, textDecoration: 'none',
                                    fontSize: '0.8rem', borderRadius: '8px', padding: '0.4rem 0.75rem',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                  }}
                                >
                                  View / Download
                                </a>
                              )}
                              <button
                                onClick={() => { setCertStudentId(s._id || s.id); setCertFile(null); setCertSuccessMsg(''); setCertError(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                style={{
                                  background: '#f8fafc', border: '1px solid #cbd5e1',
                                  color: '#475569', fontWeight: 700, cursor: 'pointer',
                                  fontSize: '0.8rem', borderRadius: '8px', padding: '0.4rem 0.75rem',
                                  transition: 'all 0.2s'
                                }}
                              >
                                Re-upload
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-secondary)' }}>
                  <Award size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>No certificates uploaded yet. Use the form above to issue a certificate to a student.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 📝 TAB 6: UNIFIED REVIEW AND EVALUATION CENTER (STAFF/ADMIN ONLY) */}
        {activeTab === 'grading' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* 📊 1) KPI Metrics Summary Bar */}
            {(() => {
              const approvedCount = allSubmissions.filter(s => s.status === 'Approved').length;
              const rejectedCount = allSubmissions.filter(s => s.status === 'Rejected').length;

              const filteredSubmissions = allSubmissions.filter(s => {
                if (reviewFilter === 'pending') if (s.status !== 'Pending') return false;
                if (reviewFilter === 'approved') if (s.status !== 'Approved') return false;
                if (reviewFilter === 'rejected') if (s.status !== 'Rejected') return false;
                if (reviewFilter === 'html_css') if (!s.isHtmlCss) return false;

                if (reviewSearch.trim()) {
                  const q = reviewSearch.trim().toLowerCase();
                  const nameMatch = (s.studentName || '').toLowerCase().includes(q);
                  const codeMatch = (s.accessCode || '').toLowerCase().includes(q);
                  const modMatch = (s.moduleId || '').toLowerCase().includes(q) || (s.moduleTitle || '').toLowerCase().includes(q);
                  return nameMatch || codeMatch || modMatch;
                }
                return true;
              });

              return (
                <>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.25rem'
                  }}>
                    {/* Card 1: Total */}
                    <div style={{
                      background: '#ffffff',
                      border: '1px solid var(--surface-border)',
                      borderRadius: '20px',
                      padding: '1.25rem 1.5rem',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Submissions</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>{allSubmissions.length}</div>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: '14px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText size={22} />
                      </div>
                    </div>

                    {/* Card 2: Pending */}
                    <div style={{
                      background: '#ffffff',
                      border: pendingCount > 0 ? '1px solid #fca5a5' : '1px solid var(--surface-border)',
                      borderRadius: '20px',
                      padding: '1.25rem 1.5rem',
                      boxShadow: pendingCount > 0 ? '0 4px 14px rgba(239,68,68,0.1)' : 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: pendingCount > 0 ? '#dc2626' : 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending Review</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: pendingCount > 0 ? '#dc2626' : 'var(--text-primary)', marginTop: '4px' }}>{pendingCount}</div>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: '14px', background: pendingCount > 0 ? '#fef2f2' : 'rgba(245, 158, 11, 0.1)', color: pendingCount > 0 ? '#dc2626' : '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle size={22} />
                      </div>
                    </div>

                    {/* Card 3: Approved */}
                    <div style={{
                      background: '#ffffff',
                      border: '1px solid var(--surface-border)',
                      borderRadius: '20px',
                      padding: '1.25rem 1.5rem',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Approved</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#16a34a', marginTop: '4px' }}>{approvedCount}</div>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: '14px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Award size={22} />
                      </div>
                    </div>

                    {/* Card 4: HTML & CSS */}
                    <div style={{
                      background: '#ffffff',
                      border: '1px solid var(--surface-border)',
                      borderRadius: '20px',
                      padding: '1.25rem 1.5rem',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>HTML &amp; CSS Track</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#7e22ce', marginTop: '4px' }}>{htmlCssSubmissions.length}</div>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: '14px', background: 'rgba(147, 51, 234, 0.1)', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Code size={22} />
                      </div>
                    </div>
                  </div>

                  {/* 🔍 2) Search & Filter Control Bar */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '20px',
                    padding: '1.25rem 1.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'stretch' : 'center',
                    gap: '1rem'
                  }}>
                    {/* Filter Chips */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('all')}
                        style={{
                          background: reviewFilter === 'all' ? '#3b82f6' : '#f1f5f9',
                          color: reviewFilter === 'all' ? '#ffffff' : '#475569',
                          border: 'none', padding: '6px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        All ({allSubmissions.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('pending')}
                        style={{
                          background: reviewFilter === 'pending' ? '#dc2626' : '#fef2f2',
                          color: reviewFilter === 'pending' ? '#ffffff' : '#dc2626',
                          border: '1px solid #fca5a5', padding: '6px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        ⏳ Pending ({pendingCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('approved')}
                        style={{
                          background: reviewFilter === 'approved' ? '#16a34a' : '#f0fdf4',
                          color: reviewFilter === 'approved' ? '#ffffff' : '#16a34a',
                          border: '1px solid #bbf7d0', padding: '6px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        ✅ Approved ({approvedCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('rejected')}
                        style={{
                          background: reviewFilter === 'rejected' ? '#ea580c' : '#fff7ed',
                          color: reviewFilter === 'rejected' ? '#ffffff' : '#ea580c',
                          border: '1px solid #fed7aa', padding: '6px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        ⚠️ Revisions ({rejectedCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('html_css')}
                        style={{
                          background: reviewFilter === 'html_css' ? '#6b21a8' : '#faf5ff',
                          color: reviewFilter === 'html_css' ? '#ffffff' : '#6b21a8',
                          border: '1px solid #e9d5ff', padding: '6px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        🎨 HTML &amp; CSS ({htmlCssSubmissions.length})
                      </button>
                    </div>

                    {/* Search Box */}
                    <div style={{ position: 'relative', minWidth: isMobile ? '100%' : '280px' }}>
                      <input
                        type="text"
                        placeholder="Search student, code, or topic..."
                        value={reviewSearch}
                        onChange={e => setReviewSearch(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.55rem 1rem 0.55rem 2.2rem',
                          borderRadius: '14px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          background: '#f8fafc',
                          outline: 'none'
                        }}
                      />
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.45, fontSize: '0.85rem' }}>🔍</span>
                    </div>
                  </div>

                  {/* 📋 3) Submission Cards List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map(task => {
                        const statusColors = {
                          Pending: { text: '#b45309', bg: '#fffbe8', border: '#fde68a', leftBar: '#f59e0b', label: '⏳ Pending Approval' },
                          Approved: { text: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', leftBar: '#10b981', label: '✅ Approved' },
                          Rejected: { text: '#b91c1c', bg: '#fef2f2', border: '#fecaca', leftBar: '#ef4444', label: '⚠️ Revision Requested' }
                        };
                        const col = statusColors[task.status] || { text: '#475569', bg: '#f8fafc', border: '#cbd5e1', leftBar: '#94a3b8', label: task.status };

                        return (
                          <div
                            key={task._id || task.id}
                            style={{
                              background: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderLeft: `5px solid ${col.leftBar}`,
                              borderRadius: '18px',
                              padding: isMobile ? '1.25rem' : '1.5rem',
                              boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1rem',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {/* Top Header Row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                              {/* Student Info */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                  width: 44,
                                  height: 44,
                                  borderRadius: '50%',
                                  background: task.isHtmlCss ? 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                  color: '#ffffff',
                                  fontWeight: 900,
                                  fontSize: '0.95rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
                                }}>
                                  {task.studentName ? task.studentName.substring(0, 2).toUpperCase() : 'ST'}
                                </div>
                                <div>
                                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                                    {task.studentName}
                                  </div>
                                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace', fontWeight: 700, background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>
                                    {task.accessCode}
                                  </span>
                                </div>
                              </div>

                              {/* Course / Module & Status Badges */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{
                                  fontSize: '0.75rem',
                                  fontWeight: 800,
                                  color: task.isHtmlCss ? '#7e22ce' : '#1d4ed8',
                                  background: task.isHtmlCss ? '#faf5ff' : '#eff6ff',
                                  border: `1px solid ${task.isHtmlCss ? '#e9d5ff' : '#bfdbfe'}`,
                                  padding: '4px 10px',
                                  borderRadius: '20px'
                                }}>
                                  {task.isHtmlCss ? '🎨 HTML & CSS Course' : `📚 ${task.moduleId || 'Course Module'}`}
                                </span>

                                <span style={{
                                  color: col.text,
                                  background: col.bg,
                                  border: `1px solid ${col.border}`,
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  padding: '4px 12px',
                                  borderRadius: '20px'
                                }}>
                                  {col.label}
                                </span>
                              </div>
                            </div>

                            {/* Module Title Banner */}
                            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '0.75rem 1rem', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
                              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#1e293b' }}>
                                {formatTaskTitle(task)}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                                Submitted: <strong>{formatSubmittedDate(task.submittedAt)}</strong>
                              </div>
                            </div>

                            {/* Middle Body: Submission Content & Student Reflection */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              {/* URL Button */}
                              {task.submissionUrl && (
                                <div>
                                  <a
                                    href={task.submissionUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      color: '#2563eb',
                                      textDecoration: 'none',
                                      fontWeight: 800,
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                      background: '#eff6ff',
                                      border: '1px solid #bfdbfe',
                                      padding: '6px 14px',
                                      borderRadius: '10px',
                                      fontSize: '0.85rem',
                                      boxShadow: '0 2px 4px rgba(37, 99, 235, 0.06)'
                                    }}
                                  >
                                    🔗 Open Student Project Link <ExternalLink size={13} />
                                  </a>
                                </div>
                              )}

                              {/* Student Feedback Reflection Quote */}
                              {(task.studentFeedback || task.taskText || task.submissionNotes) && (
                                <div style={{
                                  background: '#f8fafc',
                                  borderLeft: '4px solid #3b82f6',
                                  padding: '10px 14px',
                                  borderRadius: '0 10px 10px 0',
                                  fontSize: '0.88rem',
                                  color: '#334155',
                                  lineHeight: 1.6,
                                  fontStyle: 'italic'
                                }}>
                                  <span style={{ fontWeight: 800, color: '#2563eb', fontStyle: 'normal', display: 'block', fontSize: '0.75rem', marginBottom: 2 }}>
                                    💬 Student Reflection &amp; Learner Feedback:
                                  </span>
                                  "{task.studentFeedback || task.taskText || task.submissionNotes}"
                                </div>
                              )}

                              {/* Default fallback notice when no feedback/link attached */}
                              {!task.submissionUrl && !task.studentFeedback && !task.taskText && !task.submissionNotes && (
                                <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic', background: '#fafafa', padding: '8px 12px', borderRadius: 8 }}>
                                  📝 Practical topic homework exercise submission record.
                                </div>
                              )}

                              {/* Staff Remarks Display */}
                              {task.staffFeedback && (
                                <div style={{
                                  background: '#f0fdf4',
                                  border: '1px solid #bbf7d0',
                                  padding: '8px 12px',
                                  borderRadius: '10px',
                                  fontSize: '0.82rem',
                                  color: '#15803d',
                                  fontWeight: 700
                                }}>
                                  💬 Staff Evaluation Remarks: "{task.staffFeedback}" {task.validatedBy ? `— by ${task.validatedBy}` : ''}
                                </div>
                              )}
                            </div>

                            {/* Footer Actions Bar */}
                            <div style={{
                              display: 'flex',
                              justify: 'flex-end',
                              alignItems: 'center',
                              gap: '8px',
                              borderTop: '1px solid #f1f5f9',
                              paddingTop: '0.88rem',
                              flexWrap: 'wrap'
                            }}>
                              <button
                                type="button"
                                onClick={() => handleQuickApprove(task)}
                                style={{
                                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                  border: 'none',
                                  color: '#ffffff',
                                  padding: '0.55rem 1.25rem',
                                  borderRadius: '10px',
                                  cursor: 'pointer',
                                  fontSize: '0.82rem',
                                  fontWeight: 800,
                                  boxShadow: '0 3px 8px rgba(16, 185, 129, 0.25)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 6,
                                  transition: 'all 0.2s'
                                }}
                                title="Approve submission and unlock next content"
                              >
                                <CheckCircle size={15} /> Approve &amp; Unlock Next Day
                              </button>

                              <button
                                type="button"
                                onClick={() => handleQuickReject(task)}
                                style={{
                                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                  border: 'none',
                                  color: '#ffffff',
                                  padding: '0.55rem 1.1rem',
                                  borderRadius: '10px',
                                  cursor: 'pointer',
                                  fontSize: '0.82rem',
                                  fontWeight: 800,
                                  boxShadow: '0 3px 8px rgba(239, 68, 68, 0.25)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 6,
                                  transition: 'all 0.2s'
                                }}
                                title="Request revision from student"
                              >
                                <AlertTriangle size={15} /> Request Revision
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setGradingTask(task);
                                  setGradingStudentId(task.studentId || '');
                                  setGradingStatus(task.status);
                                  setGradingFeedback(task.staffFeedback || task.feedback || '');
                                  setGradingGrade(task.grade || 'Pass');
                                }}
                                style={{
                                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                  border: 'none',
                                  color: '#ffffff',
                                  padding: '0.55rem 1.1rem',
                                  borderRadius: '10px',
                                  cursor: 'pointer',
                                  fontSize: '0.82rem',
                                  fontWeight: 800,
                                  boxShadow: '0 3px 8px rgba(59, 130, 246, 0.25)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 6,
                                  transition: 'all 0.2s'
                                }}
                              >
                                <FileText size={15} /> Custom Remarks &amp; Grade
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div style={{
                        background: '#ffffff',
                        border: '1px solid var(--surface-border)',
                        borderRadius: '20px',
                        textAlign: 'center',
                        padding: '4rem 1.5rem',
                        color: 'var(--text-secondary)'
                      }}>
                        <CheckCircle size={52} style={{ opacity: 0.25, marginBottom: '1rem', color: '#3b82f6' }} />
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>No Submissions Found</h4>
                        <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>No student submission requests matched your current search or status filter.</p>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}

          </div>
        )}

        {/* 🎓 TAB 6.5: CERTIFICATES & ID CARD MANAGEMENT (STAFF & ADMIN ONLY) */}
        {(activeTab === 'prepare_certs' || activeTab === 'af_certificates' || activeTab === 'idcards' || activeTab === 'foclen') && (session?.role === 'admin' || session?.role === 'staff') && (
          <CertificateManager 
            session={session} 
            students={students} 
            initialModule={activeTab === 'idcards' ? 'idcards' : activeTab === 'foclen' ? 'foclen' : 'certificates'}
            onSelectModule={(mod) => {
              if (mod === 'certificates') setActiveTab('af_certificates');
              else if (mod === 'idcards') setActiveTab('idcards');
              else if (mod === 'foclen') setActiveTab('foclen');
            }}
            onBack={() => setActiveTab('overview')} 
          />
        )}

        {/* 🧾 TAB 7: INVOICE GENERATOR & FEE BILLING (STAFF & ADMIN ONLY) */}
        {activeTab === 'invoices' && (session?.role === 'admin' || session?.role === 'staff') && (
          <InvoiceGenerator session={session} students={students} onBack={() => setActiveTab('overview')} />
        )}
      </main>

      {/* 📝 GRADING / EVALUATION MODAL */}
      {gradingTask && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '520px',
            padding: '2.25rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            position: 'relative'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', fontFamily: 'system-ui' }}>
              Evaluate Assignment
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.5rem 0', lineHeight: 1.4, fontFamily: 'system-ui' }}>
              Review submission for <strong>{gradingTask.studentName}</strong> ({gradingTask.moduleId} → {gradingTask.tabId})
            </p>

            <form onSubmit={handleGradeTaskSubmit}>
              {/* Submission details display */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block' }}>Submission URL</span>
                  {gradingTask.taskUrl ? (
                    <a href={gradingTask.taskUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {gradingTask.taskUrl} <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.88rem', color: '#94a3b8', fontStyle: 'italic' }}>No URL provided</span>
                  )}
                </div>
                {gradingTask.taskText && (
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block' }}>Student Notes</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#334155', whiteSpace: 'pre-wrap' }}>{gradingTask.taskText}</p>
                  </div>
                )}
              </div>

              {/* Status Select */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
                  Review Status
                </label>
                <select
                  value={gradingStatus}
                  onChange={(e) => setGradingStatus(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    background: '#ffffff',
                    outline: 'none'
                  }}
                >
                  <option value="Approved">Approved / Completed</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Rejected">Rejected / Needs Redo</option>
                </select>
              </div>



              {/* Feedback Text */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
                  Evaluation Feedback
                </label>
                <textarea
                  placeholder="Enter comments, hints, or reviews for the student..."
                  rows={3}
                  value={gradingFeedback}
                  onChange={(e) => setGradingFeedback(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setGradingTask(null)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={gradingLoading}
                  style={{
                    padding: '0.65rem 1.5rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {gradingLoading ? 'Saving...' : 'Submit Grade'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📝 EDIT STUDENT COURSES MODAL */}
      {editingStudent && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '520px',
            padding: '2.2rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #cbd5e1',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', fontFamily: 'system-ui' }}>
              Modify Enrolled Courses
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Assign or remove curriculum tracks for <strong>{editingStudent.name}</strong>.
            </p>

            <form onSubmit={handleSaveCourses}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.75rem', fontFamily: 'system-ui' }}>
                  Select Course Tracks
                </label>
                <div style={{
                  maxHeight: '220px',
                  overflowY: 'auto',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '0.6rem',
                  background: '#f8fafc',
                  boxSizing: 'border-box'
                }}>
                  {availableCourseOptions.map(course => {
                    const isChecked = (editingCourses || '').split(',').includes(course.value);
                    return (
                      <label
                        key={course.value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: isChecked ? 700 : 500,
                          color: isChecked ? 'var(--accent-primary)' : 'var(--text-primary)'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            const list = editingCourses ? editingCourses.split(',') : [];
                            let newList;
                            if (list.includes(course.value)) {
                              if (list.length === 1) return;
                              newList = list.filter(c => c !== course.value);
                            } else {
                              newList = [...list, course.value];
                            }
                            setEditingCourses(newList.join(','));
                          }}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span>{course.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {editingError && (
                <div style={{
                  color: '#ef4444',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  background: 'rgba(239, 68, 68, 0.05)',
                  padding: '0.6rem 1rem',
                  borderRadius: '10px',
                  borderLeft: '3px solid #ef4444',
                  marginBottom: '1.5rem'
                }}>
                  ⚠️ {editingError}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editingLoading}
                  style={{
                    padding: '0.65rem 1.5rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, #1d4ed8 100%)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {editingLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📊 DETAILED COURSE PROGRESS BREAKDOWN MODAL */}
      {viewingProgressStudent && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '880px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #cbd5e1',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '1px solid #e2e8f0',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    color: '#ffffff', fontWeight: 900, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {viewingProgressStudent.name ? viewingProgressStudent.name.substring(0, 2).toUpperCase() : 'ST'}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0, fontFamily: 'system-ui', color: '#ffffff' }}>
                    {viewingProgressStudent.name} — Course Progress Audit
                  </h3>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 700, background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 4 }}>
                  Access Key: {viewingProgressStudent.accessCode}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setViewingProgressStudent(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#ffffff',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content - List of Courses */}
            <div style={{ padding: '1.75rem 2rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {(() => {
                const coursesList = calculateDetailedCourseProgress(viewingProgressStudent);
                if (coursesList.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                      <BookOpen size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
                      <p style={{ margin: 0, fontSize: '0.95rem' }}>No enrolled course progress records found for this student.</p>
                    </div>
                  );
                }

                return coursesList.map(c => {
                  const courseColor = c.percentage === 100 ? '#10b981' : c.percentage > 50 ? '#3b82f6' : c.percentage > 0 ? '#d97706' : '#64748b';

                  return (
                    <div
                      key={c.courseKey}
                      style={{
                        background: '#f8fafc',
                        border: `1px solid ${c.percentage === 100 ? '#bbf7d0' : '#e2e8f0'}`,
                        borderRadius: '16px',
                        padding: '1.25rem 1.5rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                      }}
                    >
                      {/* Course Header Bar */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '0.75rem' }}>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', fontFamily: 'system-ui' }}>
                            📚 {c.courseLabel}
                          </h4>
                          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                            {c.modules.length} Modules · Completed <strong>{c.completedTopics}</strong> of <strong>{c.totalTopics}</strong> topics
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            fontSize: '0.88rem',
                            fontWeight: 800,
                            color: courseColor,
                            background: c.percentage === 100 ? '#d1fae5' : c.percentage > 50 ? '#eff6ff' : 'rgba(245, 158, 11, 0.1)',
                            border: `1px solid ${c.percentage === 100 ? '#86efac' : c.percentage > 50 ? '#bfdbfe' : '#fde68a'}`,
                            padding: '4px 12px',
                            borderRadius: '20px'
                          }}>
                            {c.percentage}% Completed
                          </span>
                        </div>
                      </div>

                      {/* Course Overall Progress Bar */}
                      <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                        <div style={{
                          width: `${c.percentage}%`,
                          height: '100%',
                          background: c.percentage === 100
                            ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                            : 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
                          borderRadius: '10px',
                          transition: 'width 0.4s ease'
                        }} />
                      </div>

                      {/* Modules & Sub-topics Accordion List */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {c.modules.map(mod => {
                          const modKey = `${c.courseKey}_${mod.id}`;
                          const isExpanded = expandedCourseModule[modKey] !== false; // default expanded

                          return (
                            <div
                              key={mod.id}
                              style={{
                                background: '#ffffff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                overflow: 'hidden'
                              }}
                            >
                              {/* Module Header Toggle */}
                              <div
                                onClick={() => setExpandedCourseModule(prev => ({ ...prev, [modKey]: !isExpanded }))}
                                style={{
                                  padding: '0.75rem 1rem',
                                  background: '#f1f5f9',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  justify: 'space-between',
                                  alignItems: 'center',
                                  userSelect: 'none'
                                }}
                              >
                                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                                  {mod.title}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{
                                    fontSize: '0.76rem',
                                    fontWeight: 800,
                                    color: mod.percentage === 100 ? '#16a34a' : '#475569',
                                    background: mod.percentage === 100 ? '#dcfce7' : '#ffffff',
                                    padding: '2px 8px',
                                    borderRadius: '10px'
                                  }}>
                                    {mod.completedCount}/{mod.itemsCount} Done ({mod.percentage}%)
                                  </span>
                                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                    {isExpanded ? '▲' : '▼'}
                                  </span>
                                </div>
                              </div>

                              {/* Topics List when expanded */}
                              {isExpanded && (
                                <div style={{ padding: '0.75rem 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
                                  {mod.items.map(item => (
                                    <div
                                      key={item.id}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justify: 'space-between',
                                        padding: '6px 10px',
                                        borderRadius: '8px',
                                        background: item.isCompleted ? '#f0fdf4' : '#fafafa',
                                        border: `1px solid ${item.isCompleted ? '#bbf7d0' : '#f1f5f9'}`,
                                        fontSize: '0.82rem'
                                      }}
                                    >
                                      <span style={{ color: item.isCompleted ? '#166534' : '#64748b', fontWeight: item.isCompleted ? 700 : 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {item.label}
                                      </span>
                                      {item.isCompleted ? (
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#15803d', background: '#dcfce7', padding: '1px 6px', borderRadius: 4, flexShrink: 0 }}>
                                          ✓ Done
                                        </span>
                                      ) : (
                                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', background: '#f1f5f9', padding: '1px 6px', borderRadius: 4, flexShrink: 0 }}>
                                          Pending
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '1rem 2rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setViewingProgressStudent(null)}
                style={{
                  padding: '0.65rem 1.75rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💳 STUDENT SELF-ENROLLMENT & INSTANT PAYMENT MODAL */}
      {showSelfEnrollModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            border: '1px solid #e2e8f0',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.75rem 2rem',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={22} color="#60a5fa" />
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, margin: 0 }}>VeeGo Student Self-Enrollment</h3>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#93c5fd', margin: '4px 0 0 0', fontWeight: 500 }}>
                  Online Self-Paced Learning &amp; Offline Classroom Admissions
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSelfEnrollModal(false)}
                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#ffffff', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '2rem' }}>
              {selfEnrollSuccess ? (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ width: '64px', height: '64px', background: '#d1fae5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <CheckCircle size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#065f46', margin: '0 0 0.5rem 0' }}>
                    Enrollment Activated Successfully!
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#334155', maxWidth: '440px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                    Welcome <strong>{selfEnrollSuccess.name}</strong>! Your payment has been verified and your self-learning portal credentials have been issued.
                  </p>

                  <div style={{ background: '#f0fdf4', border: '2px dashed #10b981', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.75rem', display: 'inline-block', width: '100%', maxWidth: '380px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Your Student Access Key</span>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#065f46', letterSpacing: '2px', margin: '0.4rem 0' }}>
                      {selfEnrollSuccess.accessCode}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Training Mode: <strong>{selfEnrollMode.toUpperCase()}</strong></span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSelfEnrollModal(false);
                        const firstCourse = selfEnrollCourse ? selfEnrollCourse.split(',')[0] : 'html_css';
                        onSelectCourse(firstCourse);
                      }}
                      style={{
                        padding: '0.8rem 2rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      Start Learning Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSelfEnrollSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Step 1: Select Course */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      1. Select Your Target Program:
                    </label>
                    <select
                      value={selfEnrollCourse}
                      onChange={(e) => setSelfEnrollCourse(e.target.value)}
                      style={{
                        width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #cbd5e1',
                        fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', background: '#f8fafc'
                      }}
                    >
                      {availableCourseOptions.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 2: Training Mode Radio Selector */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      2. Choose Training Mode:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                      {/* Mode A: Online Self-Paced */}
                      <div
                        onClick={() => setSelfEnrollMode('online')}
                        style={{
                          border: `2px solid ${selfEnrollMode === 'online' ? '#2563eb' : '#e2e8f0'}`,
                          background: selfEnrollMode === 'online' ? '#eff6ff' : '#ffffff',
                          borderRadius: '16px', padding: '1rem', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1e3a8a' }}>💻 Online Self-Paced</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', background: '#dbeafe', padding: '2px 6px', borderRadius: '6px' }}>₹999</span>
                        </div>
                        <p style={{ fontSize: '0.76rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                          24/7 Access to interactive IDE, playbooks, &amp; auto certificate upon completion.
                        </p>
                      </div>

                      {/* Mode B: Offline Classroom */}
                      <div
                        onClick={() => setSelfEnrollMode('offline')}
                        style={{
                          border: `2px solid ${selfEnrollMode === 'offline' ? '#059669' : '#e2e8f0'}`,
                          background: selfEnrollMode === 'offline' ? '#ecfdf5' : '#ffffff',
                          borderRadius: '16px', padding: '1rem', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#065f46' }}>🏫 Offline Campus Batch</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', background: '#d1fae5', padding: '2px 6px', borderRadius: '6px' }}>₹2,999</span>
                        </div>
                        <p style={{ fontSize: '0.76rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                          On-campus lab training, 1-on-1 tutor support, &amp; live Viva prep.
                        </p>
                      </div>

                      {/* Mode C: Dual Hybrid */}
                      <div
                        onClick={() => setSelfEnrollMode('hybrid')}
                        style={{
                          border: `2px solid ${selfEnrollMode === 'hybrid' ? '#7c3aed' : '#e2e8f0'}`,
                          background: selfEnrollMode === 'hybrid' ? '#f5f3ff' : '#ffffff',
                          borderRadius: '16px', padding: '1rem', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#5b21b6' }}>⚡ Dual Hybrid Mode</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', background: '#ede9fe', padding: '2px 6px', borderRadius: '6px' }}>₹3,499</span>
                        </div>
                        <p style={{ fontSize: '0.76rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                          Combined 24/7 online portal access + offline campus lab privileges.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Student Details */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>Student Full Name *</label>
                      <input
                        required
                        type="text"
                        value={selfStudentName}
                        onChange={(e) => setSelfStudentName(e.target.value)}
                        placeholder="e.g. Sangerth A"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>Email Address</label>
                      <input
                        type="email"
                        value={selfStudentEmail}
                        onChange={(e) => setSelfStudentEmail(e.target.value)}
                        placeholder="student@gmail.com"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>WhatsApp Mobile</label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={selfStudentPhone}
                        onChange={(e) => setSelfStudentPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  {/* Step 4: Payment Gateway Selector & Options */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', display: 'block' }}>4. Select Payment Gateway Method</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Secure 256-bit encrypted transaction processing</span>
                      </div>
                      <div style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '20px', fontSize: '0.95rem', fontWeight: 900 }}>
                        Total Fee: {selfEnrollMode === 'online' ? '₹999' : selfEnrollMode === 'offline' ? '₹2,999' : '₹3,499'}
                      </div>
                    </div>

                    {/* Method Selector Tabs */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.6rem', marginBottom: '1.25rem' }}>
                      <button
                        type="button"
                        onClick={() => setPaymentGatewayMethod('razorpay')}
                        style={{
                          border: `2px solid ${paymentGatewayMethod === 'razorpay' ? '#2563eb' : '#cbd5e1'}`,
                          background: paymentGatewayMethod === 'razorpay' ? '#eff6ff' : '#ffffff',
                          borderRadius: '12px', padding: '0.7rem 0.5rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 900, color: paymentGatewayMethod === 'razorpay' ? '#1d4ed8' : '#334155' }}>💳 Razorpay Gateway</div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>Cards, UPI Apps, NetBanking</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentGatewayMethod('upi')}
                        style={{
                          border: `2px solid ${paymentGatewayMethod === 'upi' ? '#059669' : '#cbd5e1'}`,
                          background: paymentGatewayMethod === 'upi' ? '#ecfdf5' : '#ffffff',
                          borderRadius: '12px', padding: '0.7rem 0.5rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 900, color: paymentGatewayMethod === 'upi' ? '#047857' : '#334155' }}>📱 Instant UPI QR</div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>GPay, PhonePe, Paytm, VPA</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentGatewayMethod('bank')}
                        style={{
                          border: `2px solid ${paymentGatewayMethod === 'bank' ? '#7c3aed' : '#cbd5e1'}`,
                          background: paymentGatewayMethod === 'bank' ? '#f5f3ff' : '#ffffff',
                          borderRadius: '12px', padding: '0.7rem 0.5rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 900, color: paymentGatewayMethod === 'bank' ? '#6d28d9' : '#334155' }}>🏦 Bank Transfer</div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>NEFT / IMPS / Account</div>
                      </button>
                    </div>

                    {/* Active Gateway Content Box */}
                    {paymentGatewayMethod === 'razorpay' && (
                      <div style={{ background: '#ffffff', border: '1px solid #bfdbfe', borderRadius: '14px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1e3a8a' }}>⚡ Instant Razorpay Auto-Activation</span>
                          <span style={{ fontSize: '0.7rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>Verified Gateway</span>
                        </div>
                        <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
                          Clicking proceed opens the secure Razorpay Gateway popup supporting Google Pay, PhonePe, Paytm, Credit/Debit Cards, EMI, and NetBanking across 50+ Indian banks.
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                          {['💳 Visa/MasterCard/RuPay', '📱 GPay & PhonePe', '🏦 HDFC/ICICI/SBI NetBanking', '🔒 100% Encrypted'].map((b, i) => (
                            <span key={i} style={{ fontSize: '0.68rem', background: '#f1f5f9', color: '#334155', padding: '2px 6px', borderRadius: '6px', fontWeight: 600 }}>{b}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {paymentGatewayMethod === 'upi' && (
                      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', alignItems: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1rem' }}>
                        <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '12px', textAlign: 'center', color: '#ffffff' }}>
                          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#60a5fa', marginBottom: '4px' }}>SCAN UPI QR CODE</div>
                          <div style={{ width: '96px', height: '96px', background: '#ffffff', padding: '6px', borderRadius: '8px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=veegotech@okaxis&pn=VeeGo%20Technologies&cu=INR" alt="UPI QR Code" style={{ width: '100%', height: '100%' }} />
                          </div>
                          <div style={{ fontSize: '0.68rem', color: '#93c5fd', fontWeight: 800, marginTop: '4px' }}>veegotech@okaxis</div>
                        </div>

                        <div style={{ flex: 1, width: '100%' }}>
                          <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                            Enter UPI Transaction UTR / Ref ID *
                          </label>
                          <input
                            required
                            type="text"
                            value={selfUtrRef}
                            onChange={(e) => setSelfUtrRef(e.target.value)}
                            placeholder="e.g. 429104829102 or UPI Ref No"
                            style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontWeight: 700 }}
                          />
                          <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', marginTop: '6px' }}>
                            Instant verification grants immediate 24/7 portal access &amp; auto-certificate generation upon completion.
                          </span>
                        </div>
                      </div>
                    )}

                    {paymentGatewayMethod === 'bank' && (
                      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#5b21b6', marginBottom: '2px' }}>Official Company Bank Account Details:</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.78rem', background: '#f5f3ff', padding: '0.75rem', borderRadius: '10px', color: '#334155' }}>
                          <div><strong>Bank:</strong> Axis Bank Ltd</div>
                          <div><strong>Account No:</strong> 924020018472910</div>
                          <div><strong>IFSC Code:</strong> UTIB0000123</div>
                          <div><strong>Branch:</strong> Anna Nagar, Chennai</div>
                        </div>
                        <div>
                          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', margin: '6px 0 3px 0' }}>Bank Reference / UTR Number *</label>
                          <input
                            required
                            type="text"
                            value={selfUtrRef}
                            onChange={(e) => setSelfUtrRef(e.target.value)}
                            placeholder="e.g. AXISN042910294"
                            style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontWeight: 700 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {selfEnrollError && (
                    <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 700, background: '#fef2f2', padding: '0.6rem 1rem', borderRadius: '10px', borderLeft: '3px solid #ef4444' }}>
                      ⚠️ {selfEnrollError}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowSelfEnrollModal(false)}
                      style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={selfEnrollLoading}
                      style={{
                        padding: '0.75rem 2rem', borderRadius: '12px', border: 'none',
                        background: paymentGatewayMethod === 'razorpay' ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        color: '#ffffff', fontWeight: 800, fontSize: '0.92rem', cursor: selfEnrollLoading ? 'wait' : 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
                      }}
                    >
                      {selfEnrollLoading ? 'Processing...' : paymentGatewayMethod === 'razorpay' ? `🔒 Pay ${selfEnrollMode === 'online' ? '₹999' : selfEnrollMode === 'offline' ? '₹2,999' : '₹3,499'} with Razorpay` : 'Complete Enrollment & Activate Access'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
