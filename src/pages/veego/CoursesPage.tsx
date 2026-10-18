import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Clock,
  Laptop,
  Building2,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  Mail,
  User,
  Send,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Code,
  Database,
  BarChart3,
  Receipt,
  Terminal,
  Layers,
  Brain
} from 'lucide-react';

interface CoursesPageProps {
  onNavigate: (path: string) => void;
  onOpenLoginModal?: () => void;
}

interface OnlineCourse {
  id: string;
  badge: string;
  badgeColor: string;
  category: 'all' | 'fullstack' | 'dataanalytics' | 'accounting' | 'aitools' | 'programming' | 'database' | 'ai';
  title: string;
  subtitle: string;
  description: string;
  price?: string;
  duration: string;
  level: string;
  modules: string[];
  accentColor: string;
  iconName?: string;
}

const cardHoverReaction = {
  whileHover: { scale: 1.015, y: -2 },
  whileTap: { scale: 0.985 },
  transition: { type: 'spring' as const, stiffness: 450, damping: 28 }
};

const ONLINE_COURSES: OnlineCourse[] = [
  {
    id: 'python-fullstack',
    badge: 'LMS Master Track',
    badgeColor: 'bg-blue-900/40 text-blue-300 border-blue-700/60',
    category: 'fullstack',
    title: 'Python Full Stack Development',
    subtitle: 'HTML5, CSS3, Bootstrap 5, JavaScript, React, Git, JSON, Python OOPs, Django & SQL',
    description:
      'Master complete end-to-end full stack web development with real-world architecture. Build modern interactive frontends, scalable Python & Django backends, and relational SQL databases.',
    duration: '16 Weeks · Self-Paced + LMS & Capstone',
    level: 'Beginner to Professional',
    modules: [
      'Frontend Foundations: HTML5 Semantic Markup & Modern CSS3 Layouts',
      'Bootstrap 5 Responsive Grid System, Components & Utilities',
      'Modern JavaScript (ES6+), DOM Manipulation, Async/Await & Fetch API',
      'React JS Single Page Apps, Hooks (useState, useEffect) & State Management',
      'Git & GitHub Collaboration, Branching & JSON API Data Exchange',
      'Python Core & OOPs (Classes, Inheritance, Polymorphism & Encapsulation)',
      'Django Web Framework: MVT, ORM, Models, Views, Templates & REST APIs',
      'SQL Relational Modeling, DDL, DML, Joins, Aggregations & Database Capstone'
    ],
    accentColor: 'text-blue-500',
    iconName: 'code'
  },
  {
    id: 'dataanalytics',
    badge: 'LMS Analytics Track',
    badgeColor: 'bg-cyan-900/40 text-cyan-300 border-cyan-700/60',
    category: 'dataanalytics',
    title: 'Data Analytics with Power BI, Python & SQL',
    subtitle: 'Python for Data Analysis, SQL, Power BI, Statistics, NumPy, Pandas, Matplotlib & Seaborn',
    description:
      'Complete data analytics and business intelligence specialization. Extract insights from relational data with SQL, compute statistical models, and build interactive Power BI executive dashboards.',
    duration: '12 Weeks · Self-Paced + LMS & Dashboards',
    level: 'Beginner to Advanced',
    modules: [
      'Python for Data Analysis: Numerical Logic & Data Cleaning Workflows',
      'SQL for Data Analytics: Multi-Table Joins, Aggregations, CTEs & Window Functions',
      'Power BI Business Intelligence: Power Query ETL, DAX & Live Dashboards',
      'Statistics for Data Science: Inferential Testing, Probability & Variance',
      'NumPy: High-Performance N-Dimensional Numerical Array Computing',
      'Pandas: DataFrames, Data Cleaning, Merging & Exploratory Data Analysis',
      'Matplotlib & Seaborn: Custom Statistical Plots & Executive Charts'
    ],
    accentColor: 'text-cyan-400',
    iconName: 'barchart'
  },
  {
    id: 'powerbi',
    badge: 'LMS BI Track',
    badgeColor: 'bg-amber-900/40 text-amber-300 border-amber-700/60',
    category: 'dataanalytics',
    title: 'Power BI Business Intelligence',
    subtitle: 'Interactive Dashboards, Power Query ETL, DAX Formulas & Data Modeling',
    description:
      'Master end-to-end business intelligence with Microsoft Power BI. Transform raw data with Power Query, write calculated DAX measures, build relationship star schemas, and design live executive visual dashboards.',
    duration: '4 Weeks · 10 Modules · Real-world Dashboards',
    level: 'Beginner to Advanced',
    modules: [
      'Power BI Desktop Setup & Ingestion from Excel, SQL & Web APIs',
      'Power Query ETL: Data Cleaning, Type Casts & Pivot Transformations',
      'Star Schema Modeling: Relationships, One-to-Many & Cardinality Rules',
      'DAX Fundamentals: Calculated Columns, Measures & Time Intelligence',
      'Interactive Visualizations: Drill-Downs, Bookmarks, Filters & Tooltips',
      'Real-World Executive KPI Dashboards & Cloud Report Publishing'
    ],
    accentColor: 'text-amber-400',
    iconName: 'barchart'
  },
  {
    id: 'python-da',
    badge: 'LMS Python Analytics',
    badgeColor: 'bg-sky-900/40 text-sky-300 border-sky-700/60',
    category: 'dataanalytics',
    title: 'Python for Data Analysis',
    subtitle: 'Numerical Logic, Data Cleaning, Analytical Scripts & Automation',
    description:
      'Python programming tailored specifically for analytical workflows. Work with array manipulation, clean dirty business records, automate recurring reports, and build foundational data science logic.',
    duration: '4 Weeks · 10 Modules · Data Logic Labs',
    level: 'Beginner to Intermediate',
    modules: [
      'Python Fundamentals for Analysts: Variables, Data Types & Syntax',
      'Analytical Collections: Lists, Tuples, Dictionaries & Sets',
      'Control Flow: Conditional Logic, Loops & List Comprehensions',
      'Modular Code Architecture, Custom Functions & Lambda Expressions',
      'File Ingestion: Parsing Flat CSVs, JSON Structures & Server Logs',
      'Data Cleaning Workflows, Error Handling & Script Automation'
    ],
    accentColor: 'text-sky-400',
    iconName: 'terminal'
  },
  {
    id: 'sql-da',
    badge: 'LMS SQL Analytics',
    badgeColor: 'bg-blue-900/40 text-blue-300 border-blue-700/60',
    category: 'dataanalytics',
    title: 'SQL for Data Analysis',
    subtitle: 'Relational Queries, Multi-Table Joins, CTEs & Window Functions',
    description:
      'Master relational data extraction and analysis with advanced SQL. Write complex multi-table joins, compute running totals and rankings with window functions, and optimize analytical queries for reporting.',
    duration: '3 Weeks · 7 Modules · SQL Analytics',
    level: 'Beginner to Advanced',
    modules: [
      'Relational Schema Concepts, Primary Keys & Foreign Key Constraints',
      'Filtering & Sorting with WHERE, LIKE, IN, BETWEEN & ORDER BY',
      'Multi-Table Joins: INNER, LEFT, RIGHT & Full Outer Joins',
      'Data Aggregations: GROUP BY, HAVING, COUNT, SUM & AVG Calculations',
      'Advanced Window Functions: ROW_NUMBER, RANK, DENSE_RANK & NTILE',
      'Common Table Expressions (CTEs), Subqueries & Capstone Analytics'
    ],
    accentColor: 'text-blue-400',
    iconName: 'database'
  },
  {
    id: 'stats-course',
    badge: 'LMS Stats Track',
    badgeColor: 'bg-purple-900/40 text-purple-300 border-purple-700/60',
    category: 'dataanalytics',
    title: 'Statistics for Data Science',
    subtitle: 'Descriptive, Inferential, Hypothesis Testing, Probability & Variance',
    description:
      'The mathematical backbone of data science and analytics. Understand distributions, Central Limit Theorem, confidence intervals, p-values, hypothesis tests, covariance, and linear algebra.',
    duration: '4 Weeks · 17 Days (6 Modules) · Statistical Labs',
    level: 'All Levels',
    modules: [
      'Descriptive Statistics: Measures of Central Tendency & Dispersion',
      'Probability Theory, Normal Distributions & Central Limit Theorem',
      'Inferential Statistics: Estimation, Confidence Intervals & Standard Errors',
      'Hypothesis Testing: Null/Alt Hypotheses, Z-Tests, T-Tests & P-Values',
      'Covariance & Correlation: Pearson & Spearman Relationships',
      'Linear Algebra & Calculus Foundations for Data Science'
    ],
    accentColor: 'text-purple-400',
    iconName: 'barchart'
  },
  {
    id: 'numpy-course',
    badge: 'LMS NumPy Track',
    badgeColor: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/60',
    category: 'dataanalytics',
    title: 'NumPy for Numerical Computing',
    subtitle: 'N-Dimensional Arrays, Vectorization, Matrix Algebra & Math Operations',
    description:
      'Harness the ultra-fast numerical computing power of NumPy. Work with N-dimensional arrays (ndarrays), apply vectorized broadcasting operations, and perform linear algebra operations with high efficiency.',
    duration: '2 Weeks · 10 Modules · Interactive Playgrounds',
    level: 'Intermediate',
    modules: [
      'NumPy Array Creation: ndarray, zeros, ones, arange & linspace',
      'Array Slicing, Multi-Axis Indexing & Memory Views',
      'Vectorized Math: Element-wise Arithmetic & Universal Functions (ufuncs)',
      'Broadcasting Rules: Dimensional Alignment in Multi-Axis Arrays',
      'Matrix Computations: Dot Products, Transpose, Inverses & Determinants',
      'Statistical Reductions: Mean, Median, Variance & Std along Axes'
    ],
    accentColor: 'text-emerald-400',
    iconName: 'layers'
  },
  {
    id: 'pandas-course',
    badge: 'LMS Pandas Track',
    badgeColor: 'bg-pink-900/40 text-pink-300 border-pink-700/60',
    category: 'dataanalytics',
    title: 'Pandas for Data Manipulation',
    subtitle: 'DataFrames, Series, Data Cleaning, Merging & Exploratory Analysis',
    description:
      'The industry-standard Python library for data munging. Ingest raw CSV and Excel datasets, clean missing records, reshape data with pivot tables, and aggregate complex business metrics.',
    duration: '3 Weeks · 10 Modules · Exploratory Labs',
    level: 'Intermediate',
    modules: [
      'Pandas Data Structures: 1D Series & 2D DataFrames',
      'Data Ingestion: Reading & Writing CSV, Excel, SQL & JSON Files',
      'Data Cleaning: Handling Null Values (dropna, fillna) & Type Casts',
      'Indexing & Slicing: loc, iloc, Boolean Masking & Query Filters',
      'Data Reshaping: GroupBy, Aggregations, Pivot Tables & Melting',
      'Multi-Dataset Merging: concat, merge, join & Time-Series Parsing'
    ],
    accentColor: 'text-pink-400',
    iconName: 'layers'
  },
  {
    id: 'matplotlib-course',
    badge: 'LMS Viz Track',
    badgeColor: 'bg-rose-900/40 text-rose-300 border-rose-700/60',
    category: 'dataanalytics',
    title: 'Matplotlib Data Visualization',
    subtitle: 'Custom Line Plots, Bar Charts, Subplots, Scatter & Publication Styling',
    description:
      'Create publication-ready visual charts and graphs using Python’s Matplotlib library. Master the Figure and Axes hierarchy, build multi-panel charts, format legends, and customize publication graphics.',
    duration: '2 Weeks · 8 Modules · Live Chart Lab',
    level: 'Intermediate',
    modules: [
      'Matplotlib Anatomy: Figure, Axes, Canvas & Artists Hierarchy',
      'Core Plot Types: Line Plots, Bar Charts, Histograms & Scatter',
      'Multi-Plot Layouts: Subplots, Gridspec & Multi-Panel Figures',
      'Visual Styling: Custom Colors, Linestyles, Markers & Alpha Transparency',
      'Annotations: Text Labels, Arrows, Dual-Axes & Custom Ticks',
      'Exporting High-DPI Charts for Reports & Executive Presentations'
    ],
    accentColor: 'text-rose-400',
    iconName: 'barchart'
  },
  {
    id: 'seaborn-course',
    badge: 'LMS Seaborn Track',
    badgeColor: 'bg-teal-900/40 text-teal-300 border-teal-700/60',
    category: 'dataanalytics',
    title: 'Seaborn Statistical Visualization',
    subtitle: 'Heatmaps, Correlation Matrices, Pairplots, Violin Plots & FacetGrids',
    description:
      'Turn complex statistical datasets into beautiful, insightful graphics with Seaborn. Visualize correlation heatmaps, distribution plots, categorical relationships, and pairplots with high-aesthetic themes.',
    duration: '2 Weeks · 8 Modules · Visual Gallery',
    level: 'Intermediate',
    modules: [
      'Seaborn Themes, Aesthetics & Color Palettes (darkgrid, whitegrid, muted)',
      'Distribution Plots: histplot, kdeplot, ecdfplot & rugplot',
      'Categorical Visualizations: boxplot, violinplot, stripplot & countplot',
      'Matrix Plots: Correlation Matrices, Annotated Heatmaps & Clustermaps',
      'Relational & Regression Plots: scatterplot, lineplot, lmplot & regplot',
      'Multi-Plot Grids: PairGrid, FacetGrid & JointGrid for EDA Workflows'
    ],
    accentColor: 'text-teal-400',
    iconName: 'sparkles'
  },
  {
    id: 'tally-prime',
    badge: 'LMS Accounting Track',
    badgeColor: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/60',
    category: 'accounting',
    title: 'Tally Prime & GST Accounting',
    subtitle: 'Computerized Ledger Accounting, Vouchers, Inventory, Taxation & Financial Reporting',
    description:
      'Professional computerized accounting and business compliance with Tally Prime. Master double-entry bookkeeping, ledger vouchers, GST invoices, inventory management, and financial balance sheets.',
    duration: '6 Weeks · Self-Paced + LMS',
    level: 'All Levels',
    modules: [
      'Introduction to Accounting Principles & Golden Rules of Bookkeeping',
      'Company Creation, Chart of Accounts & General Ledger Configuration',
      'Voucher Entry: Payment, Receipt, Contra, Sales & Purchase Journals',
      'Inventory Management: Stock Groups, Categories, Units & Warehouses',
      'Goods & Services Tax (GST): Invoicing, CGST/SGST/IGST & E-Way Bills',
      'Financial Statements: Profit & Loss Account, Trial Balance & Balance Sheet'
    ],
    accentColor: 'text-emerald-400',
    iconName: 'receipt'
  },
  {
    id: 'ai-tools',
    badge: 'Popular · LMS Track',
    badgeColor: 'bg-indigo-900/40 text-indigo-300 border-indigo-700/60',
    category: 'aitools',
    title: 'AI Tools for Students & Professionals',
    subtitle: 'ChatGPT, Gemini, Copilot, Gamma Presentations, Study Notes & Prompt Engineering',
    description:
      'A practical 4-hour, 15-lesson recorded course teaching ChatGPT, Gemini, Copilot, prompt engineering, Cornell study notes, slide presentations, executive emails, and resume tailoring. No coding required.',
    duration: '4 Hours · 15 Lessons · Self-Paced + Certificate',
    level: 'Beginner (No coding)',
    modules: [
      'What Is AI & Popular Assistants (ChatGPT, Gemini, Copilot)',
      'Prompt Engineering & The RCTCF Reusable Prompting Framework',
      'AI for Cornell Study Notes, Academic Research & Exam Preparation',
      'Presentations in Canva/Gamma, Reports & Creative Idea Generation',
      'Professional Emails, Google XYZ Resumes & Daily Workplace Productivity',
      'Privacy, Accuracy, 20-MCQ Final Assessment & Verified Certificate'
    ],
    accentColor: 'text-indigo-400',
    iconName: 'sparkles'
  },
  {
    id: 'core-python',
    badge: 'LMS Core Track',
    badgeColor: 'bg-sky-900/40 text-sky-300 border-sky-700/60',
    category: 'programming',
    title: 'Core Python Programming & OOPs',
    subtitle: 'Variables, Logic Structures, Functions, OOP Principles & File I/O',
    description:
      'Master fundamental Python programming and object-oriented principles. Build scalable backend logic, create clean classes, and solve real computing challenges with integrated AI code labs.',
    duration: '4 Weeks · Self-Paced + LMS',
    level: 'Beginner to Advanced',
    modules: [
      'Python Syntax, Variables, Operators & Arithmetic Expressions',
      'Control Flow, Conditional Branches, Loops & List Comprehensions',
      'Functions, Lambda Expressions, Scope & Modular Code Architecture',
      'Object-Oriented Programming (Classes, Inheritance, Polymorphism)',
      'File Streams, Error Handling, Regular Expressions & Capstone Labs'
    ],
    accentColor: 'text-sky-400',
    iconName: 'terminal'
  },
  {
    id: 'summer-sql',
    badge: 'LMS Database Crash',
    badgeColor: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/60',
    category: 'database',
    title: 'Summer SQL Crash Course',
    subtitle: 'Relational Database Queries, Filters, Aggregations & Table Structures in 7 Days',
    description:
      'Learn database querying from scratch in 7 days. Master SELECT queries, filtering, aggregation, table joins, and relational schema designs with live SQL interactive consoles.',
    duration: '7 Days · Self-Paced + LMS',
    level: 'Beginner',
    modules: [
      'Day 1: Database Architecture & SQL Relational Data Models',
      'Day 2: DDL Commands (CREATE, ALTER, DROP, TRUNCATE)',
      'Day 3: DML & SELECT Filtering (WHERE, ORDER BY, LIMIT)',
      'Day 4: Aggregations & Grouping (COUNT, SUM, AVG, GROUP BY)',
      'Day 5-7: Relational Joins, Constraints & 7-Day Capstone Project'
    ],
    accentColor: 'text-emerald-400',
    iconName: 'database'
  },
  {
    id: 'cognitive-ai',
    badge: 'LMS Advanced AI',
    badgeColor: 'bg-purple-900/40 text-purple-300 border-purple-700/60',
    category: 'ai',
    title: 'Cognitive AI & Agentic Engineering',
    subtitle: 'Prompt Engineering, Vector DBs, RAG Pipelines, CrewAI & Flowise Loops',
    description:
      'Engineers of the future build Cognitive AI systems. Master prompt structuring, vector databases, RAG architecture, Flowise visual bots, and autonomous multi-agent loops.',
    duration: '6 Weeks · Self-Paced + LMS',
    level: 'All Levels',
    modules: [
      'Generative AI Foundations & LLM Tokenization Mechanics',
      'Prompt Engineering Patterns, Few-Shot & Chain-of-Thought',
      'Embeddings, Vector Stores & Supabase pgvector Indexing',
      'RAG Architecture, Document Indexing & Semantic Search Retrieval',
      'Flowise No-Code Agents, LangChain & Autonomous Multi-Agent Loops'
    ],
    accentColor: 'text-purple-400',
    iconName: 'brain'
  },
  {
    id: 'react-course',
    badge: 'LMS Frontend Track',
    badgeColor: 'bg-cyan-900/40 text-cyan-300 border-cyan-700/60',
    category: 'fullstack',
    title: 'React JS & Frontend Engineering',
    subtitle: 'Component Architecture, JSX, State & Props, Hooks, SPA Routing & Production UI',
    description:
      'Build lightning-fast interactive Single Page Applications with React JS. Master hooks, component lifecycles, global state, API consumption, and production builds.',
    duration: '6 Weeks · Self-Paced + LMS & Projects',
    level: 'Intermediate',
    modules: [
      'Modern JavaScript for React: Destructuring, Modules & Map/Filter',
      'React Foundations: JSX, Virtual DOM, Components & Props',
      'State & Interactivity: useState, Controlled Inputs & Event Handling',
      'Side Effects & Network Requests: useEffect, Fetching APIs & Lifecycle',
      'React Router, Production State Patterns & Full SPA Capstone'
    ],
    accentColor: 'text-cyan-400',
    iconName: 'layers'
  },
  {
    id: 'html-css',
    badge: 'LMS Web Design',
    badgeColor: 'bg-rose-900/40 text-rose-300 border-rose-700/60',
    category: 'fullstack',
    title: 'HTML5, CSS3 & Bootstrap UI Framework',
    subtitle: 'Semantic Markup, Modern Flexbox, CSS Grid, Responsive Design & Bootstrap 5',
    description:
      'The absolute foundation of web development. Build gorgeous responsive web interfaces with modern CSS architecture, Flexbox, Grid, animations, and Bootstrap 5 UI framework.',
    duration: '4 Weeks · Self-Paced + LMS',
    level: 'Beginner',
    modules: [
      'Semantic HTML5 Elements, Forms, Tables & Accessibility Standards',
      'CSS3 Selectors, Box Model, Typography & Modern Color Systems',
      'Modern Layouts: Flexbox Alignment & Responsive CSS Grid',
      'CSS Transitions, Keyframe Animations & Mobile Media Queries',
      'Bootstrap 5 Grid System, Navbar, Cards, Modals & UI Components'
    ],
    accentColor: 'text-rose-400',
    iconName: 'code'
  },
  {
    id: 'django-course',
    badge: 'LMS Backend Track',
    badgeColor: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/60',
    category: 'fullstack',
    title: 'Django Web Framework & Backend',
    subtitle: 'MVT Architecture, Django ORM, Models, Views, Templates, Admin & REST APIs',
    description:
      'Master Python\'s most popular full-featured web backend framework. Build robust databases with Django ORM, secure user authentication, URL routing, admin dashboards, and REST APIs.',
    duration: '6 Weeks · Self-Paced + LMS & Backend Projects',
    level: 'Intermediate',
    modules: [
      'Django Architecture: MVT Pattern, Project & App Structure',
      'Django Models & ORM: Database Schemas, Migrations & Queries',
      'URL Routing, Views, Request-Response Lifecycle & Templates',
      'Django Forms, CSRF Protection & ModelForms Validation',
      'User Authentication, Permissions, Admin Panel & REST API Views'
    ],
    accentColor: 'text-emerald-400',
    iconName: 'terminal'
  }
];

export const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate, onOpenLoginModal }) => {
  // Carousel State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);

  // Responsive Items Per Page
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 680) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1120) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredCourses = activeCategory === 'all'
    ? ONLINE_COURSES
    : ONLINE_COURSES.filter(c => {
        if (activeCategory === 'fullstack') return c.category === 'fullstack' || c.category === 'programming';
        if (activeCategory === 'dataanalytics') return c.category === 'dataanalytics';
        if (activeCategory === 'accounting') return c.category === 'accounting';
        if (activeCategory === 'ai') return c.category === 'ai' || c.category === 'aitools';
        return c.category === activeCategory;
      });

  const maxIndex = Math.max(0, filteredCourses.length - itemsPerPage);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory, itemsPerPage]);

  // Autoplay (4.5s)
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  const getCourseIcon = (iconName?: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-5 h-5 text-blue-400" />;
      case 'barchart':
        return <BarChart3 className="w-5 h-5 text-cyan-400" />;
      case 'receipt':
        return <Receipt className="w-5 h-5 text-emerald-400" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 text-sky-400" />;
      case 'database':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'brain':
        return <Brain className="w-5 h-5 text-purple-400" />;
      case 'layers':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      default:
        return <Laptop className="w-5 h-5 text-blue-400" />;
    }
  };

  // Offline Form State
  const [offlineName, setOfflineName] = useState('');
  const [offlinePhone, setOfflinePhone] = useState('');
  const [offlineEmail, setOfflineEmail] = useState('');
  const [offlineProfession, setOfflineProfession] = useState('College Student');
  const [offlineCourse, setOfflineCourse] = useState('');
  const [offlinePurpose, setOfflinePurpose] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleOfflineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offlineName.trim() || !offlinePhone.trim() || !offlineCourse.trim()) return;
    setFormSubmitted(true);
  };

  const scrollToOffline = () => {
    const el = document.getElementById('offline-training');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white">

      {/* 🚀 1. PAGE HEADER BANNER */}
      <header className="relative pt-12 pb-16 sm:pb-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-slate-900 mb-5"
          >
            <span className="tracking-wider uppercase">VEEGO ACADEMY · APPLIED TECHNICAL TRAINING</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 mb-5 leading-[1.1]"
          >
            Master Engineering <br className="hidden sm:inline" />
            <span className="text-blue-600">Online or Offline</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-8"
          >
            Explore our hands-on online LMS courses with live project source code, or request personalized offline classroom batches for your college, company, or group.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider"
          >
            <button
              onClick={() => {
                if (onOpenLoginModal) {
                  onOpenLoginModal();
                } else {
                  onNavigate('/contact');
                }
              }}
              className="px-6 py-3.5 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white transition-colors border border-blue-600 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Laptop className="w-4 h-4" />
              <span>Browse Online Courses</span>
            </button>

            <button
              onClick={scrollToOffline}
              className="px-6 py-3.5 rounded-[4px] bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-slate-700" />
              <span>Request Offline Training</span>
            </button>
          </motion.div>
        </div>
      </header>

      {/* 📚 2. SECTION: AVAILABLE LMS COURSES (CAROUSEL VIEW) */}
      <section className="relative py-16 sm:py-20 bg-[#0B0F19] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header with Carousel Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-400 font-mono font-bold px-3 py-1 rounded-[4px] bg-slate-900 border border-slate-800 mb-3 inline-flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-blue-400" />
                Live Online LMS Portal
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
                Available Online LMS Courses
              </h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed font-normal">
                Curriculum tracks available directly in the VeeGo LMS with project source code, live playgrounds, quizzes, and engineer assistance.
              </p>
            </div>

            {/* Navigation Buttons & Slide Counter */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-[4px] border border-slate-800 hidden sm:inline-block">
                Slide {currentIndex + 1} / {maxIndex + 1} · ({filteredCourses.length} Courses)
              </span>
              <button
                onClick={handlePrev}
                aria-label="Previous Course"
                className="w-10 h-10 rounded-[4px] bg-slate-900 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-slate-300" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Course"
                className="w-10 h-10 rounded-[4px] bg-slate-900 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none text-xs font-mono font-bold uppercase tracking-wider">
            {[
              { id: 'all', label: `All LMS Courses (${ONLINE_COURSES.length})` },
              { id: 'fullstack', label: 'Full Stack & Web' },
              { id: 'dataanalytics', label: 'Data Analytics & AI' },
              { id: 'accounting', label: 'Accounting' },
              { id: 'ai', label: 'AI Tools & Agentic' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-[4px] transition-all whitespace-nowrap cursor-pointer border ${
                  activeCategory === tab.id
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'bg-[#111827] text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 🎡 THE CAROUSEL CONTAINER */}
          <div
            className="relative overflow-hidden py-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
              }}
            >
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  style={{
                    flex: `0 0 ${100 / itemsPerPage}%`,
                    padding: '0 10px'
                  }}
                  className="flex"
                >
                  <motion.div
                    {...cardHoverReaction}
                    className="w-full rounded-[4px] p-6 sm:p-7 bg-[#111827] border border-slate-800 flex flex-col justify-between group hover:border-blue-500/60 transition-all duration-300 shadow-lg"
                  >
                    <div>
                      {/* Top Badges & Icon */}
                      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-[4px] bg-slate-900 border border-slate-800 flex items-center justify-center">
                            {getCourseIcon(course.iconName)}
                          </div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border border-slate-700 bg-slate-900 text-blue-400">
                            {course.badge}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-[4px] border border-slate-800">
                          <Clock className="w-3.5 h-3.5 text-blue-400" />
                          {course.duration.split('·')[0]}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-xl font-bold text-white tracking-tight mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                        {course.title}
                      </h3>

                      <p className="text-xs font-bold text-blue-400 mb-3 line-clamp-1">
                        {course.subtitle}
                      </p>

                      <p className="text-xs text-slate-400 leading-relaxed mb-5 font-normal line-clamp-3">
                        {course.description}
                      </p>

                    </div>

                    {/* Card Footer / CTA */}
                    <div className="pt-4 border-t border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                            Curriculum Access
                          </span>
                          <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            Full LMS Access
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-[4px]">
                          {course.level}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          if (onOpenLoginModal) {
                            onOpenLoginModal();
                          } else {
                            onNavigate('/contact');
                          }
                        }}
                        className="w-full py-3 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-blue-600 shadow-md"
                      >
                        <span>Access Online LMS</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* 🔘 Carousel Dots Indicator */}
          {maxIndex > 0 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 transition-all rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-blue-500'
                      : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 🏫 3. SECTION: REQUEST OFFLINE COURSE TRAINING (SOLID WHITE) */}
      <section id="offline-training" className="relative py-16 sm:py-20 bg-white text-slate-900 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-wider text-slate-900 font-mono font-bold px-3 py-1 rounded-[4px] bg-slate-100 border border-slate-300 mb-3 inline-flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              In-Person &amp; Offline Batches
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Request Offline Course Training
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Looking for face-to-face classroom instruction, campus workshops, or corporate offline bootcamps? Tell us your topic and location, and our academic coordinator will arrange a batch.
            </p>
          </div>

          {/* FORM CONTAINER CARD (SWISS FLAT HAILINE) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[4px] p-8 sm:p-12 bg-white border border-slate-300 relative text-slate-900"
          >
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-[4px] bg-slate-50 border border-slate-300 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-slate-950 mb-2">
                  Offline Course Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 font-medium leading-relaxed">
                  Thank you, <strong className="text-slate-900">{offlineName}</strong>. Our academic training coordinator will review your requested topic (<strong className="text-blue-600">{offlineCourse}</strong>) and contact you at <strong className="text-slate-900">{offlinePhone}</strong> via WhatsApp / Phone within 4 hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setOfflineName('');
                    setOfflinePhone('');
                    setOfflineEmail('');
                    setOfflineCourse('');
                    setOfflinePurpose('');
                  }}
                  className="px-6 py-3 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-blue-600 cursor-pointer"
                >
                  Submit Another Offline Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleOfflineSubmit} className="space-y-5">
                {/* Row 1: Name & Phone Number (Mandatory) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="off-name" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-blue-600" /> Full Name <span className="text-rose-600">*</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-normal">Mandatory</span>
                    </label>
                    <input
                      id="off-name"
                      type="text"
                      required
                      value={offlineName}
                      onChange={(e) => setOfflineName(e.target.value)}
                      placeholder="e.g. Kowsalya Devi"
                      className="w-full text-xs sm:text-sm p-3.5 rounded-[4px] border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="off-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <PhoneCall className="w-3.5 h-3.5 text-blue-600" /> Phone / WhatsApp <span className="text-rose-600">*</span>
                      </span>
                      <span className="text-[10px] font-mono text-rose-600 font-bold">Mandatory</span>
                    </label>
                    <input
                      id="off-phone"
                      type="tel"
                      required
                      maxLength={10}
                      value={offlinePhone}
                      onChange={(e) => setOfflinePhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full text-xs sm:text-sm p-3.5 rounded-[4px] border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Email ID (Optional) & Profession */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="off-email" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-blue-600" /> Email ID
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-normal">Optional</span>
                    </label>
                    <input
                      id="off-email"
                      type="email"
                      value={offlineEmail}
                      onChange={(e) => setOfflineEmail(e.target.value)}
                      placeholder="name@gmail.com (Optional)"
                      className="w-full text-xs sm:text-sm p-3.5 rounded-[4px] border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="off-profession" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-blue-600" /> Profession / Role <span className="text-rose-600">*</span>
                    </label>
                    <select
                      id="off-profession"
                      value={offlineProfession}
                      onChange={(e) => setOfflineProfession(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3.5 rounded-[4px] border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-slate-900 transition-colors cursor-pointer"
                    >
                      <option value="College Student">College Student</option>
                      <option value="Job Seeker">Job Seeker</option>
                      <option value="Working Professional">Working Professional</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Course Needed (Text Input) */}
                <div>
                  <label htmlFor="off-course" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Course Needed <span className="text-rose-600">*</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-normal">Type custom topic name</span>
                  </label>
                  <input
                    id="off-course"
                    type="text"
                    required
                    value={offlineCourse}
                    onChange={(e) => setOfflineCourse(e.target.value)}
                    placeholder="e.g. Full-Stack Web Development, Data Science with Python, AI Automation, PowerBI..."
                    className="w-full text-xs sm:text-sm p-3.5 rounded-[4px] border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>

                {/* Row 4: Purpose to Study This Course */}
                <div>
                  <label htmlFor="off-purpose" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center justify-between">
                    <span>What is your purpose for studying this course?</span>
                    <span className="text-[10px] font-mono text-slate-500 font-normal">e.g. Final year project, Job placement, Upskilling</span>
                  </label>
                  <textarea
                    id="off-purpose"
                    rows={3}
                    required
                    value={offlinePurpose}
                    onChange={(e) => setOfflinePurpose(e.target.value)}
                    placeholder="e.g. Need hands-on training and project source code for final year college placement & interview preparation..."
                    className="w-full text-xs sm:text-sm p-3.5 rounded-[4px] border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct response within 4 business hours. No sales spam.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-blue-600 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Offline Course Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

    </div>
  );
};
