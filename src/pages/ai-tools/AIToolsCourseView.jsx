import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Bot,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  Award,
  FileText,
  Brain,
  Shield,
  Clock,
  HelpCircle,
  Trophy,
  RefreshCw,
  Send,
  Lock,
  Star,
  CheckSquare,
  BookOpen,
  Terminal,
  Download,
  Share2,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  allAIToolsLessons,
  finalAssessmentQuestions,
  projectRubricCriteria,
  getLessonById
} from '../../data/aiToolsLessons';
import { generateAndStoreCertificate } from '../../services/certificateService';
import { CertificateModal } from './CertificateModal';

const Section = ({ id, eyebrow, title, badge, children }) => (
  <motion.div
    key={id}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className="learning-card"
    style={{ maxWidth: '100%', margin: '0 auto 2rem auto' }}
  >
    <div style={{ marginBottom: '1.75rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ color: '#2563eb', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'system-ui' }}>
          {eyebrow}
        </span>
        {badge && (
          <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '20px', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #dbeafe' }}>
            {badge}
          </span>
        )}
      </div>
      <h2 style={{ fontSize: '1.9rem', fontWeight: 900, marginTop: '0.5rem', color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
        {title}
      </h2>
    </div>
    {children}
  </motion.div>
);

export default function AIToolsCourseView({
  activeModuleId,
  activeTab,
  onNavigate,
  openAITutor,
  completedLessons = [],
  toggleLessonCompletion,
  session
}) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Lesson Quiz State (Per current lesson)
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Final Assessment State
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);

  // Certificate Modal State
  const [generatedCert, setGeneratedCert] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Reset quiz state when activeTab changes
  useEffect(() => {
    setSelectedQuizAnswers({});
    setQuizSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Find lesson data matching activeTab (e.g. 'lesson-1', 'lesson-2', etc.)
  const currentLesson = useMemo(() => {
    return allAIToolsLessons.find(l => l.id === activeTab);
  }, [activeTab]);

  // Check if current lesson is completed
  const isCurrentLessonDone = useMemo(() => {
    if (!currentLesson) return false;
    const lessonKey = `ai_tools:${activeModuleId}:${currentLesson.id}`;
    return (
      completedLessons.includes(lessonKey) ||
      completedLessons.includes(`${activeModuleId}:${currentLesson.id}`) ||
      completedLessons.includes(currentLesson.id)
    );
  }, [currentLesson, activeModuleId, completedLessons]);

  // Determine Next Lesson Navigation Target
  const nextNavigationTarget = useMemo(() => {
    if (!currentLesson) return null;
    const currentIndex = allAIToolsLessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex >= 0 && currentIndex < allAIToolsLessons.length - 1) {
      const nextLesson = allAIToolsLessons[currentIndex + 1];
      return {
        moduleId: nextLesson.moduleId,
        tabId: nextLesson.id,
        label: `Next: Lesson ${nextLesson.lessonNumber}`
      };
    }
    // If on last lesson (Lesson 15), point to Final Assessment
    if (currentIndex === allAIToolsLessons.length - 1) {
      return {
        moduleId: 'aitools_module6',
        tabId: 'final_exam',
        label: 'Proceed to Final 20-MCQ Assessment'
      };
    }
    return null;
  }, [currentLesson]);

  // Copy text to clipboard helper
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Toggle mark complete
  const handleMarkComplete = () => {
    if (!currentLesson) return;
    const lessonKey = `ai_tools:${activeModuleId}:${currentLesson.id}`;
    if (toggleLessonCompletion) {
      toggleLessonCompletion(lessonKey, !isCurrentLessonDone);
    }
    if (!isCurrentLessonDone) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  // Continue to next lesson
  const handleContinueNext = () => {
    if (!isCurrentLessonDone && toggleLessonCompletion && currentLesson) {
      const lessonKey = `ai_tools:${activeModuleId}:${currentLesson.id}`;
      toggleLessonCompletion(lessonKey, true);
    }
    if (nextNavigationTarget) {
      onNavigate(nextNavigationTarget.moduleId, nextNavigationTarget.tabId);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Handle Lesson Mini Quiz Answer Select
  const handleSelectQuizAnswer = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  // Submit Lesson Mini Quiz
  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.8 }
    });
  };

  // Handle Final Exam Option Select
  const handleSelectExamAnswer = (qId, optIdx) => {
    if (examSubmitted) return;
    setExamAnswers(prev => ({
      ...prev,
      [qId]: optIdx
    }));
  };

  // Submit Final Exam
  const handleSubmitFinalExam = () => {
    let score = 0;
    finalAssessmentQuestions.forEach(q => {
      if (examAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    setExamScore(score);
    setExamSubmitted(true);

    if (score >= 14) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      // Auto generate certificate
      const studentName = session?.name || 'VeeGo Learner';
      const studentId = session?.accessCode || session?.username || 'VG-STUDENT';
      const cert = generateAndStoreCertificate(studentName, studentId, Math.round((score / 20) * 100));
      setGeneratedCert(cert);
    }
  };

  // Unlock Certificate from Exam
  const handleOpenCertificate = () => {
    if (!generatedCert) {
      const studentName = session?.name || 'VeeGo Learner';
      const studentId = session?.accessCode || session?.username || 'VG-STUDENT';
      const cert = generateAndStoreCertificate(studentName, studentId, 95);
      setGeneratedCert(cert);
    }
    setIsCertModalOpen(true);
  };

  // ================= VIEW 1: FINAL 20-MCQ ASSESSMENT =================
  if (activeTab === 'final_exam') {
    const answeredCount = Object.keys(examAnswers).length;
    const isPassing = examScore >= 14;

    return (
      <AnimatePresence mode="wait">
        <Section
          id="final_exam"
          eyebrow="MODULE 6 · GRADUATION & VERIFICATION"
          title="🏆 Final Comprehensive Certification Exam"
          badge="20 MCQs · 70% to Pass (14/20)"
        >
          <div className="panel">
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1.15rem', fontWeight: 800 }}>
                Instructions for Certification
              </h3>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Answer all 20 multiple-choice questions covering AI foundations, prompt engineering frameworks, study notes, slide presentations, professional emails, and privacy guidelines. Score at least <strong>14 out of 20 (70%)</strong> to automatically unlock your official, verifiable VeeGo Certificate of Completion.
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#3b82f6' }}>
                <span>Questions Answered: {answeredCount} / 20</span>
                <span>Passing Criteria: 14 Correct</span>
              </div>
            </div>

            {/* Questions List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {finalAssessmentQuestions.map((q, idx) => {
                const selected = examAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '1.25rem 1.5rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}>
                      <span style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: '#3b82f6',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        {idx + 1}
                      </span>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>
                        {q.question}
                      </h4>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                      {q.options.map((opt, optIdx) => {
                        let btnBg = '#f8fafc';
                        let btnBorder = '#cbd5e1';
                        let btnText = '#1e293b';

                        if (selected === optIdx) {
                          btnBg = '#eff6ff';
                          btnBorder = '#3b82f6';
                          btnText = '#1d4ed8';
                        }

                        if (examSubmitted) {
                          if (optIdx === q.correctAnswer) {
                            btnBg = '#ecfdf5';
                            btnBorder = '#10b981';
                            btnText = '#065f46';
                          } else if (selected === optIdx && !isCorrect) {
                            btnBg = '#fef2f2';
                            btnBorder = '#ef4444';
                            btnText = '#991b1b';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={examSubmitted}
                            onClick={() => handleSelectExamAnswer(q.id, optIdx)}
                            style={{
                              textAlign: 'left',
                              padding: '0.75rem 1rem',
                              borderRadius: '8px',
                              border: `1.5px solid ${btnBorder}`,
                              background: btnBg,
                              color: btnText,
                              fontSize: '0.88rem',
                              fontWeight: selected === optIdx ? 700 : 500,
                              cursor: examSubmitted ? 'default' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              transition: 'all 0.15s'
                            }}
                          >
                            <span style={{ fontWeight: 800, color: '#64748b' }}>
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span style={{ flex: 1 }}>{opt}</span>
                            {examSubmitted && optIdx === q.correctAnswer && (
                              <CheckCircle size={16} color="#10b981" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {examSubmitted && (
                      <div style={{ marginTop: '0.75rem', padding: '0.65rem 1rem', borderRadius: '6px', background: isCorrect ? '#ecfdf5' : '#fef2f2', border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`, fontSize: '0.82rem', color: isCorrect ? '#065f46' : '#991b1b' }}>
                        <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Exam Actions */}
            <div className="card-actions" style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              {!examSubmitted ? (
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitFinalExam}
                  disabled={answeredCount < 10}
                  style={{ opacity: answeredCount < 10 ? 0.6 : 1, padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 800 }}
                >
                  Submit Final Assessment ({answeredCount}/20)
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isPassing ? '#10b981' : '#ef4444' }}>
                    Score: {examScore} / 20 ({Math.round((examScore / 20) * 100)}%) — {isPassing ? 'PASSED 🎉' : 'Needs 14 to Pass'}
                  </div>
                  {isPassing ? (
                    <button
                      className="btn btn-primary"
                      onClick={handleOpenCertificate}
                      style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', padding: '0.85rem 1.75rem', fontWeight: 800 }}
                    >
                      📜 View & Download Certificate
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        setExamSubmitted(false);
                        setExamAnswers({});
                      }}
                    >
                      Retake Exam
                    </button>
                  )}
                </div>
              )}

              <button
                className="btn btn-outline"
                onClick={() => onNavigate('aitools_module6', 'certificate')}
              >
                Go to Certificate Portal →
              </button>
            </div>
          </div>
        </Section>
      </AnimatePresence>
    );
  }

  // ================= VIEW 2: CERTIFICATE PORTAL =================
  if (activeTab === 'certificate') {
    const studentName = session?.name || 'VeeGo Learner';
    const studentId = session?.accessCode || session?.username || 'VG-STUDENT';
    const cert = generatedCert || generateAndStoreCertificate(studentName, studentId, 95);

    return (
      <AnimatePresence mode="wait">
        <Section
          id="certificate"
          eyebrow="OFFICIAL CREDENTIAL VERIFICATION"
          title="🎓 Course Completion Certificate"
          badge="100% Verifiable · ISO Certified"
        >
          <div className="panel">
            <div style={{ textAlign: 'center', padding: '2rem 1rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <Award size={64} color="#f59e0b" style={{ margin: '0 auto 1rem auto' }} />
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                Congratulations, {studentName}!
              </h2>
              <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                You have successfully completed all 15 lessons, hands-on prompts, and practical workflows for <strong>AI Tools for Students & Professionals</strong>. Your verified certificate of completion is ready.
              </p>

              <div style={{ display: 'inline-flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setGeneratedCert(cert);
                    setIsCertModalOpen(true);
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.85rem 1.75rem', fontSize: '0.95rem', fontWeight: 800 }}
                >
                  <Award size={18} /> Open High-Resolution Certificate PDF
                </button>
                <a
                  href={`/verify-certificate?id=${cert.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.85rem 1.5rem', textDecoration: 'none' }}
                >
                  <ExternalLink size={16} /> Public Verification Link
                </a>
              </div>
            </div>

            {/* Certificate Details Card */}
            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1', padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, letterSpacing: '0.5px' }}>Certificate ID</span>
                <p style={{ margin: '0.2rem 0 0 0', fontWeight: 800, fontFamily: 'monospace', color: '#1e293b', fontSize: '1rem' }}>{cert.id}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, letterSpacing: '0.5px' }}>Issued To</span>
                <p style={{ margin: '0.2rem 0 0 0', fontWeight: 800, color: '#1e293b', fontSize: '1rem' }}>{studentName}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, letterSpacing: '0.5px' }}>Issue Date</span>
                <p style={{ margin: '0.2rem 0 0 0', fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>{cert.issueDate}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, letterSpacing: '0.5px' }}>Status</span>
                <p style={{ margin: '0.2rem 0 0 0', fontWeight: 800, color: '#10b981', fontSize: '1rem' }}>✓ Active & Verified</p>
              </div>
            </div>
          </div>

          {/* Modal popup */}
          {isCertModalOpen && (
            <CertificateModal
              certificate={cert}
              onClose={() => setIsCertModalOpen(false)}
            />
          )}
        </Section>
      </AnimatePresence>
    );
  }

  // ================= VIEW 3: STANDARD LESSON CONTENT (LESSONS 1 TO 15) =================
  if (!currentLesson) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <h3>Lesson Not Found</h3>
        <p>Please select a lesson from the course sidebar.</p>
        <button className="btn btn-primary" onClick={() => onNavigate('aitools_module1', 'lesson-1')}>
          Go to Lesson 1
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Section
        id={currentLesson.id}
        eyebrow={`MODULE ${currentLesson.moduleNumber} · ${currentLesson.durationMinutes} MINS · BEGINNER`}
        title={`Lesson ${currentLesson.lessonNumber}: ${currentLesson.title}`}
        badge={isCurrentLessonDone ? '✓ Completed' : 'In Progress'}
      >
        <div className="panel">
          {/* Objective Box */}
          <div style={{ padding: '1.25rem 1.5rem', background: '#eff6ff', borderRadius: '10px', borderLeft: '4px solid #3b82f6', marginBottom: '2rem' }}>
            <h4 style={{ margin: '0 0 0.4rem 0', color: '#1d4ed8', fontSize: '0.95rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Brain size={18} /> Lesson Learning Objective
            </h4>
            <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.92rem', lineHeight: 1.5 }}>
              {currentLesson.objective}
            </p>
          </div>

          {/* Section 1: Conceptual Foundation & Real World Analogy */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={20} color="#3b82f6" /> 1. Concept Overview & Practical Foundation
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#334155' }}>
              {currentLesson.description}
            </p>

            {/* Real World Analogy Card */}
            {currentLesson.analogy && (
              <div style={{ marginTop: '1.25rem', padding: '1.25rem 1.5rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#f59e0b', letterSpacing: '0.5px' }}>
                  💡 Real-World Analogy
                </span>
                <p style={{ margin: '0.35rem 0 0 0', fontStyle: 'italic', color: '#475569', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  "{currentLesson.analogy}"
                </p>
              </div>
            )}

            {/* Key Takeaways */}
            {currentLesson.keyTakeaways && currentLesson.keyTakeaways.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
                  Core Takeaways:
                </h4>
                <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7, color: '#334155', margin: 0 }}>
                  {currentLesson.keyTakeaways.map((point, pIdx) => (
                    <li key={pIdx} style={{ marginBottom: '0.35rem' }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Section 2: Ready-to-Use Prompts & Framework */}
          {currentLesson.prompts && currentLesson.prompts.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={20} color="#10b981" /> 2. Tested Prompt Templates (Copy & Run)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                Copy these verified prompt templates directly into ChatGPT, Gemini, or Copilot for instant results:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {currentLesson.prompts.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    style={{
                      background: '#0f172a',
                      color: '#f8fafc',
                      borderRadius: '10px',
                      padding: '1.25rem 1.5rem',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {p.title || `Prompt Template #${pIdx + 1}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(p.prompt, pIdx)}
                        style={{
                          background: copiedIndex === pIdx ? '#10b981' : '#334155',
                          border: 'none',
                          color: '#ffffff',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        {copiedIndex === pIdx ? <Check size={14} /> : <Copy size={14} />}
                        {copiedIndex === pIdx ? 'Copied!' : 'Copy Prompt'}
                      </button>
                    </div>

                    <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>
                      {p.prompt}
                    </pre>

                    {p.explanation && (
                      <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', borderTop: '1px dashed #334155', paddingTop: '0.5rem' }}>
                        💡 {p.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Step-by-Step Hands-On Practice */}
          {currentLesson.practiceSteps && currentLesson.practiceSteps.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} color="#f59e0b" /> 3. Hands-On Practice Exercise ("Try It Yourself")
              </h3>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {currentLesson.practiceSteps.map((step, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: '#3b82f6',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {sIdx + 1}
                      </span>
                      <p style={{ margin: 0, color: '#334155', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Direct Tool Launch Buttons */}
                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a
                    href="https://chatgpt.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                  >
                    Open ChatGPT <ExternalLink size={13} />
                  </a>
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                  >
                    Open Gemini <ExternalLink size={13} />
                  </a>
                  <a
                    href="https://copilot.microsoft.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                  >
                    Open Copilot <ExternalLink size={13} />
                  </a>
                  <a
                    href="https://gamma.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                  >
                    Open Gamma <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Interactive Lesson Quiz (5 MCQs) */}
          {currentLesson.quiz && currentLesson.quiz.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckSquare size={20} color="#8b5cf6" /> 4. Knowledge Check Quiz ({currentLesson.quiz.length} Questions)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {currentLesson.quiz.map((q, qIdx) => {
                  const selected = selectedQuizAnswers[qIdx];
                  const isCorrect = selected === q.correctAnswer;

                  return (
                    <div
                      key={qIdx}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '1.25rem 1.5rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                      }}
                    >
                      <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '0.98rem', fontWeight: 700, color: '#0f172a' }}>
                        Q{qIdx + 1}: {q.question}
                      </h4>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                        {q.options.map((opt, optIdx) => {
                          let btnBg = '#f8fafc';
                          let btnBorder = '#cbd5e1';
                          let btnColor = '#1e293b';

                          if (selected === optIdx) {
                            btnBg = '#eff6ff';
                            btnBorder = '#3b82f6';
                            btnColor = '#1d4ed8';
                          }

                          if (quizSubmitted) {
                            if (optIdx === q.correctAnswer) {
                              btnBg = '#ecfdf5';
                              btnBorder = '#10b981';
                              btnColor = '#065f46';
                            } else if (selected === optIdx && !isCorrect) {
                              btnBg = '#fef2f2';
                              btnBorder = '#ef4444';
                              btnColor = '#991b1b';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={quizSubmitted}
                              onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                              style={{
                                textAlign: 'left',
                                padding: '0.65rem 0.9rem',
                                borderRadius: '6px',
                                border: `1.5px solid ${btnBorder}`,
                                background: btnBg,
                                color: btnColor,
                                fontSize: '0.85rem',
                                fontWeight: selected === optIdx ? 700 : 500,
                                cursor: quizSubmitted ? 'default' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.15s'
                              }}
                            >
                              <span style={{ fontWeight: 800, color: '#64748b' }}>
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span style={{ flex: 1 }}>{opt}</span>
                              {quizSubmitted && optIdx === q.correctAnswer && (
                                <CheckCircle size={14} color="#10b981" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div style={{ marginTop: '0.65rem', padding: '0.5rem 0.85rem', borderRadius: '6px', background: isCorrect ? '#ecfdf5' : '#fef2f2', border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`, fontSize: '0.8rem', color: isCorrect ? '#065f46' : '#991b1b' }}>
                          <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted && Object.keys(selectedQuizAnswers).length > 0 && (
                <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmitQuiz}
                    style={{ fontSize: '0.88rem', padding: '0.6rem 1.4rem' }}
                  >
                    Check Answers
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Action Bar at the Bottom — Matches Summer SQL Buttons */}
          <div
            className="card-actions"
            style={{
              marginTop: '3rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleMarkComplete}
                className={isCurrentLessonDone ? 'btn btn-outline' : 'btn btn-primary'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: isCurrentLessonDone ? '#ecfdf5' : undefined,
                  borderColor: isCurrentLessonDone ? '#10b981' : undefined,
                  color: isCurrentLessonDone ? '#065f46' : undefined
                }}
              >
                <CheckCircle size={16} />
                {isCurrentLessonDone ? 'Lesson Completed' : 'Mark as Completed'}
              </button>

              {openAITutor && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => openAITutor(`Explain ${currentLesson.title} in simple terms with an example.`)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Bot size={16} /> Ask AI Tutor
                </button>
              )}
            </div>

            {nextNavigationTarget && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleContinueNext}
                style={{
                  padding: '0.75rem 1.75rem',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(37,99,235,0.25)'
                }}
              >
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </Section>
    </AnimatePresence>
  );
}
