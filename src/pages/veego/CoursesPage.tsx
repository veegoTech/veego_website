import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
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
  MapPin
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
  gradient: string;
  glowColor: string;
}

const ONLINE_COURSES: OnlineCourse[] = [
  {
    id: 'core-python',
    badge: 'Core Program',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
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
    gradient: 'from-sky-600 via-blue-600 to-sky-700',
    glowColor: 'rgba(14, 165, 233, 0.2)'
  },
  {
    id: 'summer-sql',
    badge: 'Summer Crash',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
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
    gradient: 'from-emerald-600 via-teal-600 to-emerald-700',
    glowColor: 'rgba(16, 185, 129, 0.2)'
  },
  {
    id: 'cognitive-ai',
    badge: 'Advanced AI',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-400/40',
    title: 'Cognitive AI Development & Agentic Engineering',
    subtitle: 'Prompt Engineering, Fine-Tuning, Flowise, CrewAI & Multi-Agent Loops',
    description:
      'Engineers of the future build Cognitive AI systems. Master prompt engineering, vector databases, RAG architecture, Flowise visual bots, and autonomous multi-agent loops.',
    price: '₹499',
    duration: '6 Weeks · Self-Paced + LMS',
    level: 'All Levels',
    modules: [
      'Generative AI Foundations & LLM Tokenization',
      'Prompt Engineering, System Messages & API Integrations',
      'Flowise Visual Agent Designer & Vector Databases',
      'LangChain & CrewAI Multi-Agent Workflows',
      'Autonomous Cognitive AI Capstone Project'
    ],
    gradient: 'from-pink-600 via-purple-600 to-pink-700',
    glowColor: 'rgba(236, 72, 153, 0.2)'
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

  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll();
  const bgOrb1Y = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const bgOrb2Y = useTransform(scrollYProgress, [0.3, 0.9], [-60, 60]);

  const handleOfflineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offlineName.trim() || !offlinePhone.trim() || !offlineCourse.trim()) return;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#16082e] font-sans text-slate-100 overflow-x-hidden selection:bg-purple-600 selection:text-white scroll-smooth">
      
      {/* 🚀 PAGE HEADER BANNER */}
      <header className="relative py-20 pb-28 bg-gradient-to-b from-[#1a0735] via-[#280a4e] to-[#1e093c] text-white overflow-hidden">
        {/* Parallax Floating Glowing Orbs & Star Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{ y: bgOrb1Y }}
            className="absolute top-[-10%] right-[10%] w-[550px] h-[550px] rounded-full bg-purple-600/25 blur-[130px]"
          />
          <motion.div
            style={{ y: bgOrb1Y }}
            className="absolute bottom-[0%] left-[5%] w-[450px] h-[450px] rounded-full bg-pink-500/20 blur-[110px]"
          />

          {/* Animated Particle Stars */}
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                top: `${(i * 17) % 90}%`,
                left: `${(i * 23) % 95}%`,
                width: `${(i % 3) + 2}px`,
                height: `${(i % 3) + 2}px`,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs font-semibold text-purple-200 mb-5 shadow-lg"
          >
            <GraduationCap className="w-4 h-4 text-purple-300" />
            <span>VEEGO ACADEMY · APPLIED TECHNICAL TRAINING</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-Space Grotesk text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Master Engineering <br className="hidden sm:inline" />
            <span className="text-purple-300 font-extrabold">Online or Offline</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-purple-100/90 max-w-2xl mx-auto leading-relaxed font-normal mb-8"
          >
            Explore our hands-on online LMS courses with live project source code, or request personalized offline classroom batches for your college, company, or group.
          </motion.p>
        </div>

        {/* 🌊 SVG WAVE DIVIDER AT BOTTOM OF HEADER */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#1a0937] fill-current preserve-3d"
          >
            <path d="M0,32 C280,90 560,90 840,40 C1120,-10 1280,50 1440,65 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </header>

      {/* 📚 SECTION 1: AVAILABLE ONLINE COURSES (3 CARDS AT ONCE) */}
      <section className="relative py-20 pb-32 bg-[#1a0937] text-white overflow-hidden">
        {/* Star Particles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                top: `${(i * 19) % 85 + 8}%`,
                left: `${(i * 27) % 92 + 4}%`,
                width: `${(i % 3) + 2}px`,
                height: `${(i % 3) + 2}px`,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.25, 0.8] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-purple-300 font-bold px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 mb-3 inline-flex items-center gap-1.5 shadow-xs">
              <Laptop className="w-3.5 h-3.5 text-purple-300" />
              Live Online LMS Portal
            </span>
            <h2 className="font-Space Grotesk text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Available Online Courses
            </h2>
            <p className="text-sm sm:text-base text-purple-200/80 max-w-xl mx-auto leading-relaxed">
              Structured LMS access with real project source code, interactive quizzes, cloud deployment guides, and 1-on-1 engineer assistance.
            </p>
          </div>

          {/* 3 CARDS AT ONCE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
            {ONLINE_COURSES.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="rounded-3xl p-7 bg-white/5 backdrop-blur-md border border-white/15 shadow-2xl relative overflow-hidden text-white flex flex-col justify-between hover:border-purple-400/50 transition-all duration-300 hover:-translate-y-2 group"
              >
                {/* Ambient background card glow */}
                <div
                  className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500"
                  style={{ backgroundColor: course.glowColor }}
                />

                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                    <span className="text-xs font-semibold text-purple-200/80 flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-purple-300" />
                      {course.duration.split('·')[0]}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-Space Grotesk text-2xl font-extrabold text-white tracking-tight mb-2 leading-snug group-hover:text-purple-200 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs font-semibold text-purple-300 mb-3">
                    {course.subtitle}
                  </p>

                  <p className="text-xs text-purple-200/80 leading-relaxed mb-5 font-normal line-clamp-3">
                    {course.description}
                  </p>

                  {/* Key Modules Checklist */}
                  <div className="pt-4 border-t border-white/10 mb-6 space-y-2.5">
                    <div className="text-[10px] uppercase tracking-wider text-purple-300 font-bold mb-2">
                      Core Curriculum Highlights:
                    </div>
                    {course.modules.slice(0, 5).map((m) => (
                      <div key={m} className="flex items-start gap-2 text-xs text-purple-100 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer / CTA */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-purple-300/70 font-bold block">
                        Full LMS Access
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-extrabold text-white">{course.price}</span>
                        <span className="text-[11px] text-purple-200/70 font-normal">/ One-time</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-purple-300 font-bold bg-purple-500/20 border border-purple-400/30 px-2.5 py-1 rounded-md">
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
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer group-hover:bg-blue-500"
                  >
                    <span>Access Online LMS</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* 🌊 SVG WAVE DIVIDER AT BOTTOM OF CAROUSEL SECTION */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#16082e] fill-current preserve-3d scale-x-[-1]"
          >
            <path d="M0,32 C280,90 560,90 840,40 C1120,-10 1280,50 1440,65 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* 🏫 SECTION 2: REQUEST FOR OFFLINE COURSE (FORM) */}
      <section className="relative py-20 pb-32 bg-[#16082e] text-white overflow-hidden">
        {/* Background Parallax Orbs & Star Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            style={{ y: bgOrb2Y }}
            className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-[130px]"
          />
          <motion.div
            style={{ y: bgOrb2Y }}
            className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-pink-500/20 rounded-full blur-[110px]"
          />

          {/* Animated Particle Stars */}
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                top: `${(i * 19) % 85 + 8}%`,
                left: `${(i * 27) % 92 + 4}%`,
                width: `${(i % 3) + 2}px`,
                height: `${(i % 3) + 2}px`,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.25, 0.8] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider text-purple-300 font-bold px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 mb-3 inline-flex items-center gap-1.5 shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-purple-300" />
              In-Person &amp; Offline Batches
            </span>
            <h2 className="font-Space Grotesk text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Request Offline Course Training
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-purple-200/80 leading-relaxed font-normal">
              Looking for face-to-face classroom instruction, campus workshops, or corporate offline bootcamps? Tell us your topic and location, and our academic coordinator will arrange a batch.
            </p>
          </div>

          {/* FORM CONTAINER CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 sm:p-12 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden text-white"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-purple-500/20 border border-purple-400/40 text-center"
              >
                <CheckCircle2 className="w-14 h-14 text-purple-300 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2 font-Space Grotesk">
                  Offline Course Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-purple-200 max-w-md mx-auto mb-6 font-medium leading-relaxed">
                  Thank you, <strong className="text-white">{offlineName}</strong>. Our academic training coordinator will review your requested topic (<strong className="text-purple-300">{offlineCourse}</strong>) and contact you at <strong className="text-white">{offlinePhone}</strong> via WhatsApp / Phone within 4 hours.
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
              <form onSubmit={handleOfflineSubmit} className="space-y-6">
                {/* Row 1: Name & Phone Number (Mandatory) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="off-name" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-purple-300" /> Full Name <span className="text-rose-400">*</span>
                      </span>
                      <span className="text-[10px] text-purple-300/70 font-normal">Mandatory</span>
                    </label>
                    <input
                      id="off-name"
                      type="text"
                      required
                      value={offlineName}
                      onChange={(e) => setOfflineName(e.target.value)}
                      placeholder="e.g. Kowsalya Devi"
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="off-phone" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <PhoneCall className="w-3.5 h-3.5 text-purple-300" /> Phone / WhatsApp Number <span className="text-rose-400">*</span>
                      </span>
                      <span className="text-[10px] text-rose-300 font-bold">Mandatory</span>
                    </label>
                    <input
                      id="off-phone"
                      type="tel"
                      required
                      maxLength={10}
                      value={offlinePhone}
                      onChange={(e) => setOfflinePhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 shadow-2xs"
                    />
                  </div>
                </div>

                {/* Row 2: Email ID (Optional) & Profession */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="off-email" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-purple-300" /> Email ID
                      </span>
                      <span className="text-[10px] text-purple-300/60 font-normal">Optional</span>
                    </label>
                    <input
                      id="off-email"
                      type="email"
                      value={offlineEmail}
                      onChange={(e) => setOfflineEmail(e.target.value)}
                      placeholder="name@gmail.com (Optional)"
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="off-profession" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-purple-300" /> Profession / Current Role <span className="text-rose-400">*</span>
                    </label>
                    <select
                      id="off-profession"
                      value={offlineProfession}
                      onChange={(e) => setOfflineProfession(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-white/20 bg-[#1f093a] text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 shadow-2xs"
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
                  <label htmlFor="off-course" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-purple-300" /> Course Needed <span className="text-rose-400">*</span>
                    </span>
                    <span className="text-[10px] text-purple-300/70 font-normal">Type custom course or topic name</span>
                  </label>
                  <input
                    id="off-course"
                    type="text"
                    required
                    value={offlineCourse}
                    onChange={(e) => setOfflineCourse(e.target.value)}
                    placeholder="e.g. Full-Stack Web Development, Data Science with Python, AI Automation, PowerBI..."
                    className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 shadow-2xs"
                  />
                </div>

                {/* Row 4: Purpose to Study This Course */}
                <div>
                  <label htmlFor="off-purpose" className="block text-xs font-bold uppercase tracking-wider text-purple-200 mb-1.5 flex items-center justify-between">
                    <span>What is your purpose for studying this course?</span>
                    <span className="text-[10px] text-purple-300/70 font-normal">e.g. Final year project, Job placement, Upskilling</span>
                  </label>
                  <textarea
                    id="off-purpose"
                    rows={3}
                    required
                    value={offlinePurpose}
                    onChange={(e) => setOfflinePurpose(e.target.value)}
                    placeholder="e.g. Need hands-on training and project source code for final year college placement & interview preparation..."
                    className="w-full text-xs sm:text-sm p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 shadow-2xs"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-purple-200/70 font-medium">
                    <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Direct response within 4 business hours. No sales spam.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
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
