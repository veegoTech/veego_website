import React, { useState } from 'react';
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
  Send
} from 'lucide-react';

interface CoursesPageProps {
  onNavigate: (path: string) => void;
  onOpenLoginModal?: () => void;
}

interface OnlineCourse {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  level: string;
  modules: string[];
  accentColor: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

const cardHoverReaction = {
  whileHover: { scale: 1.015, y: -2 },
  whileTap: { scale: 0.985 },
  transition: { type: 'spring' as const, stiffness: 450, damping: 28 }
};

const ONLINE_COURSES: OnlineCourse[] = [
  {
    id: 'core-python',
    badge: 'Core Program',
    badgeColor: 'bg-slate-100 text-blue-700 border-slate-300',
    title: 'Core Python with OOPs',
    subtitle: 'Variables, Logic Structures, Functions, OOP Principles & File I/O',
    description:
      'Master fundamental Python programming and object-oriented principles. Build scalable backend logic, create clean classes, and solve real computing challenges.',
    price: '₹499',
    duration: '4 Weeks · Self-Paced + LMS',
    level: 'Beginner to Advanced',
    modules: [
      'Python Syntax, Variables & Operator Logic',
      'Control Flow, Loops & Data Structures',
      'Functions, Modules & Exception Handling',
      'Object-Oriented Programming (Classes, Inheritance, Polymorphism)',
      'File Streams, Regular Expressions & Mini Projects'
    ],
    accentColor: 'text-blue-600'
  },
  {
    id: 'summer-sql',
    badge: 'Summer Crash',
    badgeColor: 'bg-slate-100 text-emerald-700 border-slate-300',
    title: 'Summer SQL Crash Course',
    subtitle: 'Relational Database Queries, Filters, Aggregations & Table Structures',
    description:
      'Learn database querying from scratch in 7 days. Master SELECT queries, filtering, aggregation, table joins, and relational schema designs.',
    price: '₹499',
    duration: '7 Days · Self-Paced + LMS',
    level: 'Beginner',
    modules: [
      'Database Architecture & SQL Relational Models',
      'DDL Commands: CREATE, ALTER, DROP',
      'DML & SELECT Filtering: WHERE, ORDER BY, LIMIT',
      'Aggregations & Grouping: GROUP BY, HAVING',
      'Relational Joins, Primary/Foreign Keys & 7-Day Capstone'
    ],
    accentColor: 'text-emerald-600'
  },
  {
    id: 'cognitive-ai',
    badge: 'Advanced AI',
    badgeColor: 'bg-slate-100 text-indigo-700 border-slate-300',
    title: 'Cognitive AI Development & Agentic Engineering',
    subtitle: 'Prompt Engineering, Fine-Tuning, Flowise, CrewAI & Multi-Agent Loops',
    description:
      'Engineers of the future build Cognitive AI systems. Master prompt engineering, vector databases, RAG architecture, Flowise visual bots, and autonomous multi-agent loops.',
    price: '₹499',
    duration: '6 Weeks · Self-Paced + LMS',
    level: 'All Levels',
    modules: [
      'Generative AI Foundations & LLM Tokenization',
      'Prompt Engineering Patterns, Few-Shot & Chain-of-Thought',
      'Embeddings, Vector Stores & Supabase pgvector',
      'RAG Architecture, Document Indexing & Semantic Search',
      'Flowise No-Code Agents, LangChain & Multi-Agent Systems'
    ],
    accentColor: 'text-indigo-600'
  }
];

export const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate, onOpenLoginModal }) => {
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

      {/* 🚀 1. PAGE HEADER BANNER (SOLID WHITE, SWISS GRID) */}
      <header className="relative pt-12 pb-16 sm:pb-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-slate-900 mb-5"
          >
            {/* <GraduationCap className="w-3.5 h-3.5 text-blue-600" /> */}
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
              className="px-6 py-3.5 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white transition-colors border border-blue-600 flex items-center gap-2 cursor-pointer"
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

      {/* 📚 2. SECTION: AVAILABLE ONLINE COURSES (SOLID DARK #0B0F19, BENTO GRID) */}
      <section className="relative py-16 sm:py-20 bg-[#0B0F19] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider text-blue-400 font-mono font-bold px-3 py-1 rounded-[4px] bg-slate-900 border border-slate-800 mb-3 inline-flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-blue-400" />
              Live Online LMS Portal
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
              Available Online Courses
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed font-normal">
              Structured LMS access with real project source code, interactive quizzes, cloud deployment guides, and 1-on-1 engineer assistance.
            </p>
          </div>

          {/* 3 Cards Bento Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-7xl mx-auto"
          >
            {ONLINE_COURSES.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                {...cardHoverReaction}
                className="rounded-[4px] p-7 bg-[#111827] border border-slate-800 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-[4px] border border-slate-700 bg-slate-900 text-blue-400">
                      {course.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-[4px] border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {course.duration.split('·')[0]}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs font-bold text-blue-400 mb-3">
                    {course.subtitle}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed mb-5 font-normal line-clamp-3">
                    {course.description}
                  </p>

                  {/* Key Modules Checklist */}
                  <div className="pt-4 border-t border-slate-800 mb-6 space-y-2.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                      Core Curriculum Highlights:
                    </div>
                    {course.modules.slice(0, 5).map((m) => (
                      <div key={m} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer / CTA */}
                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                        Full LMS Access
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-white">{course.price}</span>
                        <span className="text-[11px] text-slate-400 font-normal">/ One-time</span>
                      </div>
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
                    className="w-full py-3 rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-blue-600"
                  >
                    <span>Access Online LMS</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

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
