import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  CheckCircle2,
  Send,
  Sparkles,
  GraduationCap,
  Clock,
  Layers,
  Code2,
  Laptop,
  Building2,
  ShieldCheck,
  Zap,
  ArrowRight,
  PhoneCall,
  Mail,
  User,
  Check
} from 'lucide-react';
import { WaveDivider } from '../../components/WaveDivider';

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

const ONLINE_COURSES: OnlineCourse[] = [
  {
    id: 'core-python',
    badge: 'Core Program',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
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
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
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
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
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
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-blue-600 selection:text-white scroll-smooth">
      
      {/* 🚀 1. PAGE HEADER BANNER (PURE WHITE) */}
      <header className="relative pt-12 pb-16 sm:pb-20 bg-white text-slate-900 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 mb-5 shadow-xs"
          >
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="tracking-wider uppercase">VEEGO ACADEMY · APPLIED TECHNICAL TRAINING</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-Space Grotesk text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-slate-950 mb-5 leading-[1.1]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Master Engineering <br className="hidden sm:inline" />
            <span className="text-blue-600 font-extrabold">Online or Offline</span>
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
            className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium"
          >
            <button
              onClick={() => {
                if (onOpenLoginModal) {
                  onOpenLoginModal();
                } else {
                  onNavigate('/contact');
                }
              }}
              className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Laptop className="w-4 h-4" />
              <span>Browse Online Courses</span>
            </button>

            <button
              onClick={scrollToOffline}
              className="px-7 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-sm shadow-2xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Request Offline Training</span>
            </button>
          </motion.div>
        </div>
      </header>

      {/* ✨ WAVE DIVIDER: WHITE TO SOFT SLATE */}
      <WaveDivider fromColor="#ffffff" toColor="#f1f5f9" type="curve-1" />

      {/* 📚 2. SECTION: AVAILABLE ONLINE COURSES (SOFT SLATE #f1f5f9) */}
      <section className="relative py-12 sm:py-16 bg-[#f1f5f9] text-slate-900 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider text-blue-700 font-bold px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-3 inline-flex items-center gap-1.5 shadow-xs">
              <Laptop className="w-3.5 h-3.5 text-blue-600" />
              Live Online LMS Portal
            </span>
            <h2 className="font-Space Grotesk text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Available Online Courses
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
              Structured LMS access with real project source code, interactive quizzes, cloud deployment guides, and 1-on-1 engineer assistance.
            </p>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch max-w-7xl mx-auto">
            {ONLINE_COURSES.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                className="rounded-3xl p-7 bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {course.duration.split('·')[0]}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-Space Grotesk text-xl font-extrabold text-slate-950 tracking-tight mb-2 leading-snug group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {course.title}
                  </h3>

                  <p className="text-xs font-bold text-blue-600 mb-3">
                    {course.subtitle}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5 font-normal line-clamp-3">
                    {course.description}
                  </p>

                  {/* Key Modules Checklist */}
                  <div className="pt-4 border-t border-slate-100 mb-6 space-y-2.5">
                    <div className="text-[10px] uppercase tracking-wider text-slate-700 font-bold mb-2">
                      Core Curriculum Highlights:
                    </div>
                    {course.modules.slice(0, 5).map((m) => (
                      <div key={m} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer / CTA */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                        Full LMS Access
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-slate-950">{course.price}</span>
                        <span className="text-[11px] text-slate-500 font-normal">/ One-time</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-700 font-bold bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
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
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Access Online LMS</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ✨ WAVE DIVIDER: SOFT SLATE TO PURE WHITE */}
      <WaveDivider fromColor="#f1f5f9" toColor="#ffffff" type="curve-2" />

      {/* 🏫 3. SECTION: REQUEST OFFLINE COURSE TRAINING (PURE WHITE) */}
      <section id="offline-training" className="relative py-12 sm:py-16 bg-white text-slate-900 scroll-mt-16 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-wider text-blue-700 font-bold px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 mb-3 inline-flex items-center gap-1.5 shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              In-Person &amp; Offline Batches
            </span>
            <h2 className="font-Space Grotesk text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Request Offline Course Training
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Looking for face-to-face classroom instruction, campus workshops, or corporate offline bootcamps? Tell us your topic and location, and our academic coordinator will arrange a batch.
            </p>
          </div>

          {/* FORM CONTAINER CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 sm:p-12 bg-white border border-slate-200/90 shadow-xl shadow-blue-500/5 relative overflow-hidden text-slate-900"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-blue-50 border border-blue-200 text-center"
              >
                <CheckCircle2 className="w-14 h-14 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-slate-950 mb-2 font-Space Grotesk" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-md cursor-pointer"
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
                        <User className="w-3.5 h-3.5 text-blue-600" /> Full Name <span className="text-rose-500">*</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal">Mandatory</span>
                    </label>
                    <input
                      id="off-name"
                      type="text"
                      required
                      value={offlineName}
                      onChange={(e) => setOfflineName(e.target.value)}
                      placeholder="e.g. Kowsalya Devi"
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="off-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <PhoneCall className="w-3.5 h-3.5 text-blue-600" /> Phone / WhatsApp <span className="text-rose-500">*</span>
                      </span>
                      <span className="text-[10px] text-rose-600 font-bold">Mandatory</span>
                    </label>
                    <input
                      id="off-phone"
                      type="tel"
                      required
                      maxLength={10}
                      value={offlinePhone}
                      onChange={(e) => setOfflinePhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
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
                      <span className="text-[10px] text-slate-500 font-normal">Optional</span>
                    </label>
                    <input
                      id="off-email"
                      type="email"
                      value={offlineEmail}
                      onChange={(e) => setOfflineEmail(e.target.value)}
                      placeholder="name@gmail.com (Optional)"
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="off-profession" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-blue-600" /> Profession / Role <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="off-profession"
                      value={offlineProfession}
                      onChange={(e) => setOfflineProfession(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all cursor-pointer"
                    >
                      <option value="College Student">College Student</option>
                      <option value="Job Seeker">Job Seeker</option>
                      <option value="Working Professional">Working Professional</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Course Needed (Text Input - NOT Dropdown!) */}
                <div>
                  <label htmlFor="off-course" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Course Needed <span className="text-rose-500">*</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-normal">Type custom topic name</span>
                  </label>
                  <input
                    id="off-course"
                    type="text"
                    required
                    value={offlineCourse}
                    onChange={(e) => setOfflineCourse(e.target.value)}
                    placeholder="e.g. Full-Stack Web Development, Data Science with Python, AI Automation, PowerBI..."
                    className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
                  />
                </div>

                {/* Row 4: Purpose to Study This Course */}
                <div>
                  <label htmlFor="off-purpose" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center justify-between">
                    <span>What is your purpose for studying this course?</span>
                    <span className="text-[10px] text-slate-500 font-normal">e.g. Final year project, Job placement, Upskilling</span>
                  </label>
                  <textarea
                    id="off-purpose"
                    rows={3}
                    required
                    value={offlinePurpose}
                    onChange={(e) => setOfflinePurpose(e.target.value)}
                    placeholder="e.g. Need hands-on training and project source code for final year college placement & interview preparation..."
                    className="w-full text-xs sm:text-sm p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Direct response within 4 business hours. No sales spam.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-500/25 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
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

      {/* 🌊 WAVE DIVIDER: WHITE TO DARK FOOTER */}
      <WaveDivider fromColor="#ffffff" toColor="#0f172a" type="footer" />

    </div>
  );
};
