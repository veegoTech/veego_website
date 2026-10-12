import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, CheckCircle2, Circle, ChevronRight, ChevronDown, Clock,
  Edit3, ArrowRight, CheckCircle
} from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import { getDynamicCourseById } from '../../services/courseManager';

export default function DynamicCourseViewer({
  courseId,
  session,
  onBack,
  onOpenStudio
}) {
  const [course, setCourse] = useState(() => getDynamicCourseById(courseId));
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [completedTopicIds, setCompletedTopicIds] = useState(() => {
    try {
      const raw = localStorage.getItem(`veego_progress_${courseId}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Reload course data if courseId changes or if courses get updated
  useEffect(() => {
    const loaded = getDynamicCourseById(courseId);
    setCourse(loaded);
    if (loaded && loaded.modules && loaded.modules.length > 0) {
      const firstMod = loaded.modules[0];
      setActiveModuleId(firstMod.id);
      setExpandedModules({ [firstMod.id]: true });
      if (firstMod.topics && firstMod.topics.length > 0) {
        setActiveTopicId(firstMod.topics[0].id);
      }
    }
  }, [courseId]);

  useEffect(() => {
    const handleUpdate = () => {
      const updated = getDynamicCourseById(courseId);
      if (updated) setCourse(updated);
    };
    window.addEventListener('veego_courses_updated', handleUpdate);
    return () => window.removeEventListener('veego_courses_updated', handleUpdate);
  }, [courseId]);

  if (!course) {
    return (
      <div style={{ display: 'flex', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color, #f8fafc)' }}>
        <div className="learning-card" style={{ maxWidth: '480px', textAlign: 'center', padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '0 0 0.75rem' }}>Course Not Found</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>This course could not be loaded or has been deleted.</p>
          <button
            className="btn btn-primary"
            onClick={onBack}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Calculate flatten list of all topics for navigation and progress
  const allTopics = [];
  (course.modules || []).forEach(m => {
    (m.topics || []).forEach(t => {
      allTopics.push({ ...t, moduleId: m.id, moduleTitle: m.title });
    });
  });

  const totalTopicsCount = allTopics.length;
  const completedCount = completedTopicIds.length;
  const progressPercent = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;

  // Active topic object
  const currentTopic = allTopics.find(t => t.id === activeTopicId) || allTopics[0] || null;
  const currentTopicIndex = allTopics.findIndex(t => t.id === activeTopicId);
  const prevTopic = currentTopicIndex > 0 ? allTopics[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex >= 0 && currentTopicIndex < allTopics.length - 1 ? allTopics[currentTopicIndex + 1] : null;

  const toggleTopicCompleted = (topicId) => {
    let nextList;
    if (completedTopicIds.includes(topicId)) {
      nextList = completedTopicIds.filter(id => id !== topicId);
    } else {
      nextList = [...completedTopicIds, topicId];
    }
    setCompletedTopicIds(nextList);
    try {
      localStorage.setItem(`veego_progress_${courseId}`, JSON.stringify(nextList));
    } catch (e) {
      console.warn('Could not save progress to localStorage', e);
    }
  };

  const toggleModuleAccordion = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const isCurrentCompleted = currentTopic && completedTopicIds.includes(currentTopic.id);

  return (
    <div style={{ display: 'flex', width: '100vw', maxWidth: '100vw', height: '100vh', maxHeight: '100vh', overflow: 'hidden', boxSizing: 'border-box', background: 'var(--bg-color, #f8fafc)' }}>
      {/* Left Sidebar — Matches Summer SQL & LMS Sidebar Styling */}
      <aside
        style={{
          width: '320px',
          minWidth: '290px',
          maxWidth: '340px',
          height: '100vh',
          background: '#0f172a',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 20,
          flexShrink: 0
        }}
      >
        {/* Sidebar Header: Back Button + Course Title + Progress */}
        <div style={{ padding: '1.25rem 1.25rem 1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              borderRadius: '6px',
              padding: '0.4rem 0.8rem',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginBottom: '1rem',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          >
            <ArrowLeft size={15} /> All Courses
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.68rem', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '2px 7px', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {course.category || 'Course Track'}
            </span>
          </div>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.85rem', color: '#ffffff', letterSpacing: '-0.01em', lineHeight: 1.35 }}>
            {course.title}
          </h2>

          {/* Progress Card */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '8px', padding: '0.75rem 0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem', fontSize: '0.76rem' }}>
              <span style={{ color: '#94a3b8' }}>Course Progress</span>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>{progressPercent}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #3b82f6 0%, #10b981 100%)',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.4rem' }}>
              {completedCount} of {totalTopicsCount} topics completed
            </div>
          </div>
        </div>

        {/* Course Syllabus / Modules Accordion */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.85rem' }}>
          {(course.modules || []).map((mod, modIdx) => {
            const isExpanded = expandedModules[mod.id] !== false; // expanded by default
            const modTopics = mod.topics || [];
            const modCompletedCount = modTopics.filter(t => completedTopicIds.includes(t.id)).length;

            return (
              <div key={mod.id} style={{ marginBottom: '0.85rem' }}>
                {/* Module Header Bar */}
                <div
                  onClick={() => toggleModuleAccordion(mod.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.6rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    color: '#94a3b8',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0, flex: 1 }}>
                    <span style={{ display: 'flex', color: '#64748b' }}>
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: '#60a5fa',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      title={mod.title}
                    >
                      {mod.title}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.68rem', color: '#64748b', marginLeft: '0.5rem' }}>
                    {modCompletedCount}/{modTopics.length}
                  </span>
                </div>

                {/* Topics in this Module */}
                {isExpanded && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.25rem', paddingLeft: '0.35rem' }}>
                    {modTopics.map((top) => {
                      const isSelected = top.id === activeTopicId;
                      const isDone = completedTopicIds.includes(top.id);

                      return (
                        <div
                          key={top.id}
                          onClick={() => {
                            setActiveModuleId(mod.id);
                            setActiveTopicId(top.id);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.55rem',
                            padding: '0.5rem 0.65rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            background: isSelected
                              ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                              : 'transparent',
                            color: isSelected ? '#ffffff' : isDone ? '#94a3b8' : '#cbd5e1',
                            boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.35)' : 'none',
                            transition: 'all 0.15s'
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          {/* Completion Tick / Radio Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTopicCompleted(top.id);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: 0,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            title={isDone ? "Mark as Incomplete" : "Mark as Completed"}
                          >
                            {isDone ? (
                              <CheckCircle2 size={16} color={isSelected ? '#ffffff' : '#10b981'} />
                            ) : (
                              <Circle size={16} color={isSelected ? 'rgba(255,255,255,0.7)' : '#64748b'} />
                            )}
                          </button>

                          {/* Topic Title */}
                          <span
                            style={{
                              flex: 1,
                              fontSize: '0.82rem',
                              fontWeight: isSelected ? 600 : 400,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                            title={top.title}
                          >
                            {top.title}
                          </span>

                          {/* Duration Tag */}
                          {top.duration && (
                            <span
                              style={{
                                fontSize: '0.65rem',
                                color: isSelected ? 'rgba(255,255,255,0.8)' : '#64748b',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {top.duration}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer: Edit Course Studio Link (for admins/staff) */}
        {(session?.role === 'admin' || session?.role === 'staff' || !session?.role) && onOpenStudio && (
          <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <button
              onClick={() => onOpenStudio(course.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.45rem',
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#a5b4fc',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Edit3 size={13} /> Edit Course Studio
            </button>
          </div>
        )}
      </aside>

      {/* Main Student Lesson View Area — Matches Summer SQL & SQLDay1.jsx */}
      <main
        className="main-content"
        style={{
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-color, #f8fafc)',
          width: '100%',
          padding: '2.5rem 3rem'
        }}
      >
        {currentTopic ? (
          <div style={{ maxWidth: '980px', margin: '0 auto', width: '100%' }}>
            {/* The Learning Card: Standard Summer SQL Card Container */}
            <div
              className="learning-card"
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '2.5rem',
                boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                position: 'relative'
              }}
            >
              {/* Header / Eyebrow & Title */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span
                  style={{
                    color: 'var(--accent-secondary, #2563eb)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {currentTopic.moduleTitle}
                </span>

                <h1
                  style={{
                    fontSize: '2.1rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    marginTop: '0.45rem',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3
                  }}
                >
                  {currentTopic.title}
                </h1>

                {/* Lesson Meta Strip: Duration & Completion status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                  {currentTopic.duration && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.82rem',
                        color: '#64748b',
                        background: '#f1f5f9',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontWeight: 500
                      }}
                    >
                      <Clock size={14} color="#64748b" /> {currentTopic.duration}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleTopicCompleted(currentTopic.id)}
                    className={isCurrentCompleted ? 'btn btn-outline' : 'btn btn-primary'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 1rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      borderRadius: '6px',
                      background: isCurrentCompleted ? '#ecfdf5' : undefined,
                      borderColor: isCurrentCompleted ? '#10b981' : undefined,
                      color: isCurrentCompleted ? '#065f46' : undefined
                    }}
                  >
                    {isCurrentCompleted ? (
                      <>
                        <CheckCircle2 size={16} color="#10b981" /> Lesson Completed (+10 XP)
                      </>
                    ) : (
                      <>
                        <Circle size={15} /> Mark as Complete
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div style={{ height: '1px', background: '#e2e8f0', margin: '1.75rem 0' }} />

              {/* Rendered Lesson Content */}
              <div style={{ minHeight: '300px' }}>
                <MarkdownRenderer content={currentTopic.content} theme="light" />
              </div>

              {/* Bottom Action Bar — Matches Summer SQL Action Bar */}
              <div
                className="card-actions"
                style={{
                  marginTop: '3.5rem',
                  paddingTop: '1.75rem',
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                {prevTopic ? (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setActiveModuleId(prevTopic.moduleId);
                      setActiveTopicId(prevTopic.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.25rem',
                      fontSize: '0.88rem'
                    }}
                  >
                    <ArrowLeft size={16} /> Previous: {prevTopic.title}
                  </button>
                ) : <div />}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => toggleTopicCompleted(currentTopic.id)}
                    className={isCurrentCompleted ? 'btn btn-outline' : 'btn btn-primary'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.6rem 1.25rem',
                      fontSize: '0.88rem'
                    }}
                  >
                    <CheckCircle size={16} />
                    {isCurrentCompleted ? 'Completed' : 'Mark as Completed (+10 XP)'}
                  </button>

                  {nextTopic && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        if (!isCurrentCompleted) {
                          toggleTopicCompleted(currentTopic.id);
                        }
                        setActiveModuleId(nextTopic.moduleId);
                        setActiveTopicId(nextTopic.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1.4rem',
                        fontSize: '0.88rem',
                        fontWeight: 600
                      }}
                    >
                      Next Lesson <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
            <h3>Select a topic from the left sidebar to start learning.</h3>
          </div>
        )}
      </main>
    </div>
  );
}
