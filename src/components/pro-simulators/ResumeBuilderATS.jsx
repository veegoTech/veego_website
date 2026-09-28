import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { 
  FileText, Play, Clock, Sparkles, CheckCircle2, 
  Send, Download, Printer, Plus, Trash2, Zap, ArrowRight, RotateCcw 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ResumeBuilderATS = ({ topicData, day }) => {
  const { requestValidation, isLessonCompleted, isLessonPending } = useCourse();
  const [isBuilding, setIsBuilding] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // 0: summary, 1: edu, 2: exp, 3: proj, 4: skills

  const [formData, setFormData] = useState({
    name: 'Ananya Krishnan',
    title: 'Full Stack Developer',
    phone: '+91 98765 43210',
    email: 'ananya.k@gmail.com',
    city: 'Chennai',
    state: 'Tamil Nadu',
    linkedin: 'linkedin.com/in/ananya',
    github: 'github.com/ananya-dev',
    summary: 'Passionate Full Stack Developer with experience in building scalable web applications. Adept at leveraging modern frameworks like React and Node.js to deliver high-performance solutions.',
    education: [
      { degree: 'B.Tech Computer Science in CSE', college: 'PSG College of Technology, Anna University', year: '2025', cgpa: '8.7' }
    ],
    experience: [
      { company: 'Zoho Corporation', role: 'Software Developer Intern', duration: 'May 2024 - Jul 2024', bullets: 'Automated QA testing scripts using Python, decreasing manual testing cycle duration by 45%.' }
    ],
    projects: [
      { title: 'E-Commerce Microservices', tech: 'React, Node.js, MongoDB', link: 'github.com/ananya-dev/ecommerce', duration: 'Jan 2024 - Mar 2024', desc: 'Developed a high-throughput backend using Node.js and MongoDB. Reduced API response latency by 35% across 1,000+ daily active users.' }
    ],
    skills: {
      programming: 'Python, JavaScript, Java, C++',
      web: 'React, HTML, CSS, Node.js',
      backend: 'Django',
      databases: 'SQL, MongoDB',
      tools: 'Git, GitHub, VS Code'
    },
    certifications: [
      { name: 'AWS Cloud Practitioner', issuer: 'AWS', year: '2024' }
    ]
  });

  const isCompleted = isLessonCompleted('pro', day);
  const isPending = isLessonPending('pro', day);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* ─────────────────── LEFT COLUMN: BUILDER CARD OR WIZARD ─────────────────── */}
      <div className="lg:col-span-6 space-y-6">
        
        {!isBuilding ? (
          /* Initial Hero Card from Screenshot */
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Resume Builder
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm mx-auto">
                Let's build your professional ATS-friendly resume step by step.
              </p>
            </div>

            {/* Estimated Time Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-100/80 text-slate-600 px-4 py-2 rounded-full text-xs font-semibold">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Estimated Time: 15-20 Minutes</span>
            </div>

            {/* Start Building Button */}
            <div>
              <button
                onClick={() => setIsBuilding(true)}
                className="py-3.5 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 inline-flex items-center gap-2.5 transition-all transform hover:scale-105"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Building</span>
              </button>
            </div>

            {/* Validation State */}
            <div className="pt-4 border-t border-slate-100">
              {isCompleted ? (
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" /> ATS Resume Module Approved
                </div>
              ) : isPending ? (
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-4 py-2 rounded-xl">
                  <Sparkles className="w-4 h-4 animate-spin" /> Pending Staff Review
                </div>
              ) : (
                <button
                  onClick={() => requestValidation('pro', day)}
                  className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Request Staff Validation
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Step-by-Step Interactive Editor */
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-800">ATS Resume Customizer</h3>
                <p className="text-xs text-slate-400">Live edits update the resume sheet on the right.</p>
              </div>
              <button
                onClick={() => setIsBuilding(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Close Editor
              </button>
            </div>

            {/* Wizard Navigation */}
            <div className="flex gap-1 overflow-x-auto pb-1 text-xs font-semibold">
              {['Summary', 'Education', 'Experience', 'Projects', 'Skills'].map((step, idx) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(idx)}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    activeStep === idx 
                      ? 'bg-blue-600 text-white font-bold' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}. {step}
                </button>
              ))}
            </div>

            {/* Step 0: Summary */}
            {activeStep === 0 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Professional Summary</label>
                <textarea
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500 resize-none font-sans"
                />
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    summary: 'Highly driven Full Stack Software Engineer with deep expertise in React, TypeScript, scalable Node.js microservices, and cloud architectures. Proven history of optimizing web performance by 35% and delivering resilient customer-facing platforms.'
                  })}
                  className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline"
                >
                  <Zap className="w-3.5 h-3.5" /> Apply AI Optimized Summary
                </button>
              </div>
            )}

            {/* Step 1: Education */}
            {activeStep === 1 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">College / University</label>
                <input
                  type="text"
                  value={formData.education[0]?.college || ''}
                  onChange={(e) => {
                    const nextEdu = [...formData.education];
                    nextEdu[0].college = e.target.value;
                    setFormData({ ...formData, education: nextEdu });
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500"
                />
                <label className="text-xs font-bold text-slate-700 block">Degree & CGPA</label>
                <input
                  type="text"
                  value={formData.education[0]?.degree || ''}
                  onChange={(e) => {
                    const nextEdu = [...formData.education];
                    nextEdu[0].degree = e.target.value;
                    setFormData({ ...formData, education: nextEdu });
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Step 2: Experience */}
            {activeStep === 2 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Company & Role</label>
                <input
                  type="text"
                  value={formData.experience[0]?.company || ''}
                  onChange={(e) => {
                    const nextExp = [...formData.experience];
                    nextExp[0].company = e.target.value;
                    setFormData({ ...formData, experience: nextExp });
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500"
                />
                <label className="text-xs font-bold text-slate-700 block">Action-Oriented Responsibilities</label>
                <textarea
                  rows={3}
                  value={formData.experience[0]?.bullets || ''}
                  onChange={(e) => {
                    const nextExp = [...formData.experience];
                    nextExp[0].bullets = e.target.value;
                    setFormData({ ...formData, experience: nextExp });
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500 resize-none font-sans"
                />
              </div>
            )}

            {/* Step 3: Projects */}
            {activeStep === 3 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Project Title & Tech Stack</label>
                <input
                  type="text"
                  value={formData.projects[0]?.title || ''}
                  onChange={(e) => {
                    const nextP = [...formData.projects];
                    nextP[0].title = e.target.value;
                    setFormData({ ...formData, projects: nextP });
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500"
                />
                <label className="text-xs font-bold text-slate-700 block">Impact & Outcome</label>
                <textarea
                  rows={3}
                  value={formData.projects[0]?.desc || ''}
                  onChange={(e) => {
                    const nextP = [...formData.projects];
                    nextP[0].desc = e.target.value;
                    setFormData({ ...formData, projects: nextP });
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500 resize-none font-sans"
                />
              </div>
            )}

            {/* Step 4: Skills */}
            {activeStep === 4 && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Programming Languages</label>
                  <input
                    type="text"
                    value={formData.skills.programming}
                    onChange={(e) => setFormData({ ...formData, skills: { ...formData.skills, programming: e.target.value } })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Web Technologies</label>
                  <input
                    type="text"
                    value={formData.skills.web}
                    onChange={(e) => setFormData({ ...formData, skills: { ...formData.skills, web: e.target.value } })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                  requestValidation('pro', day);
                }}
                className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
              >
                Submit & Request Validation
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ─────────────────── RIGHT COLUMN: LIVE ATS RESUME PAPER ─────────────────── */}
      <div className="lg:col-span-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-10 font-serif text-slate-900 leading-normal space-y-6 text-xs sm:text-[13px] select-text">
          
          {/* Header Name & Contact */}
          <div className="text-center pb-4 border-b border-slate-300 space-y-1">
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-slate-900 font-sans">
              {formData.name}
            </h1>
            <p className="text-xs text-slate-600 font-sans">
              {formData.phone} | {formData.email} | {formData.city}, {formData.state} | {formData.linkedin}
            </p>
          </div>

          {/* PROFESSIONAL SUMMARY */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">
              {formData.summary}
            </p>
          </div>

          {/* EDUCATION */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
              EDUCATION
            </h2>
            {formData.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <div>
                  <p className="font-bold text-slate-900">{edu.college}</p>
                  <p className="italic text-slate-700">{edu.degree}</p>
                </div>
                <div className="text-right shrink-0 ml-4 font-bold text-slate-800">
                  <p>{edu.year}</p>
                  <p className="font-normal italic">CGPA: {edu.cgpa}</p>
                </div>
              </div>
            ))}
          </div>

          {/* EXPERIENCE */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
              EXPERIENCE
            </h2>
            {formData.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="font-bold text-slate-900">{exp.company}</p>
                    <p className="italic text-slate-700">{exp.role}</p>
                  </div>
                  <p className="font-bold text-slate-800 text-xs shrink-0">{exp.duration}</p>
                </div>
                <ul className="list-disc list-inside text-slate-700 pl-1">
                  <li>{exp.bullets}</li>
                </ul>
              </div>
            ))}
          </div>

          {/* PROJECTS */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
              PROJECTS
            </h2>
            {formData.projects.map((proj, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-slate-900">{proj.title}</p>
                  <p className="font-bold text-slate-800 text-xs shrink-0">{proj.duration}</p>
                </div>
                <p className="italic text-slate-600 text-[11px]">{proj.tech} | {proj.link}</p>
                <ul className="list-disc list-inside text-slate-700 pl-1 space-y-0.5">
                  <li>{proj.desc}</li>
                </ul>
              </div>
            ))}
          </div>

          {/* TECHNICAL SKILLS */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
              TECHNICAL SKILLS
            </h2>
            <div className="text-slate-700 space-y-1 text-xs">
              <p><strong className="text-slate-900">Programming:</strong> {formData.skills.programming}</p>
              <p><strong className="text-slate-900">Web:</strong> {formData.skills.web}</p>
              <p><strong className="text-slate-900">Backend:</strong> {formData.skills.backend}</p>
              <p><strong className="text-slate-900">Databases:</strong> {formData.skills.databases}</p>
              <p><strong className="text-slate-900">Tools:</strong> {formData.skills.tools}</p>
            </div>
          </div>

          {/* CERTIFICATIONS */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
              CERTIFICATIONS
            </h2>
            {formData.certifications.map((c, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <p><strong className="text-slate-900">{c.name}</strong> - {c.issuer}</p>
                <p className="font-bold text-slate-800">{c.year}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};
export default ResumeBuilderATS;
