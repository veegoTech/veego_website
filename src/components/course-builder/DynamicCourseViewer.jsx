import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, CheckCircle2, Circle, ChevronRight, ChevronDown, Clock,
  BookOpen, Sparkles, Award, Edit3, Share2, Layers, Check, ArrowRight
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
      <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
        <h2>Course not found</h2>
        <button
          onClick={onBack}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Return to Dashboard
        </button>
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

  const isCurrentCompleted = currentTopic && completedTopicIds.includes(currentTopic.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#090d16', color: '#f8fafc', overflow: 'hidden' }}>
      {/* Top Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 1.5rem',
          background: 'rgba(15, 23, 42, 0.9)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(12px)',
          gap: '1rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
              borderRadius: '6px',
              padding: '0.45rem 0.85rem',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            <ArrowLeft size={16} /> All Courses
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.7rem', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                {course.category || 'LMS Track'}
              </span>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                {course.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Progress & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Progress bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '180px' }}>
            <div style={{ flex: 1, height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
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
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
              {progressPercent}%
            </span>
          </div>

          {/* Edit in Course Studio (if Admin / Staff) */}
          {(session?.role === 'admin' || session?.role === 'staff' || !session?.role) && onOpenStudio && (
            <button
              onClick={() => onOpenStudio(course.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#818cf8',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Edit3 size={14} /> Edit Course
            </button>
          )}
        </div>
      </header>

      {/* Main LMS Viewer Layout: Sidebar (Curriculum) + Content Area */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {/* Left Curriculum Sidebar */}
        <aside
          style={{
            width: '320px',
            minWidth: '280px',
            background: 'rgba(15, 23, 42, 0.95)',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}
        >
          <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: '#f1f5f9' }}>
              Course Syllabus
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {completedCount} of {totalTopicsCount} topics completed
            </span>
          </div>

          <div style={{ flex: 1, padding: '0.75rem' }}>
            {(course.modules || []).map((mod, modIdx) => (
              <div key={mod.id} style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#60a5fa',
                    marginBottom: '0.4rem',
                    padding: '0 0.4rem'
                  }}
                >
                  {mod.title}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  {(mod.topics || []).map(top => {
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
                          gap: '0.5rem',
                          padding: '0.5rem 0.65rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          background: isSelected ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)' : 'transparent',
                          border: isSelected ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                          transition: 'all 0.15s'
                        }}
                      >
                        <button
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
                        >
                          {isDone ? (
                            <CheckCircle2 size={16} color="#10b981" />
                          ) : (
                            <Circle size={16} color="#64748b" />
                          )}
                        </button>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: '0.82rem',
                              fontWeight: isSelected ? 600 : 400,
                              color: isSelected ? '#ffffff' : isDone ? '#94a3b8' : '#cbd5e1',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {top.title}
                          </div>
                        </div>

                        {top.duration && (
                          <span style={{ fontSize: '0.68rem', color: '#64748b' }}>
                            {top.duration}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Lesson Content Area */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
          {currentTopic ? (
            <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto', padding: '2rem 2.5rem' }}>
              {/* Lesson Top Meta */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 600, textTransform: 'uppercase' }}>
                    {currentTopic.moduleTitle}
                  </span>
                  <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.2rem 0 0', color: '#ffffff' }}>
                    {currentTopic.title}
                  </h1>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {currentTopic.duration && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                      <Clock size={14} /> {currentTopic.duration}
                    </span>
                  )}

                  <button
                    onClick={() => toggleTopicCompleted(currentTopic.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      border: isCurrentCompleted ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)',
                      background: isCurrentCompleted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      color: isCurrentCompleted ? '#34d399' : '#e2e8f0',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {isCurrentCompleted ? <Check size={15} /> : <Circle size={15} />}
                    {isCurrentCompleted ? 'Completed' : 'Mark as Complete'}
                  </button>
                </div>
              </div>

              {/* Formatted Markdown Content */}
              <div style={{ minHeight: '300px' }}>
                <MarkdownRenderer content={currentTopic.content} />
              </div>

              {/* Bottom Topic Navigation (Previous / Next) */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '3rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  gap: '1rem'
                }}
              >
                {prevTopic ? (
                  <button
                    onClick={() => {
                      setActiveModuleId(prevTopic.moduleId);
                      setActiveTopicId(prevTopic.id);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.2rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#cbd5e1',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    <ArrowLeft size={16} /> Previous: {prevTopic.title}
                  </button>
                ) : <div />}

                {nextTopic && (
                  <button
                    onClick={() => {
                      // Automatically mark current as completed when proceeding
                      if (!isCurrentCompleted) {
                        toggleTopicCompleted(currentTopic.id);
                      }
                      setActiveModuleId(nextTopic.moduleId);
                      setActiveTopicId(nextTopic.id);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.25rem',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      border: 'none',
                      color: '#ffffff',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      boxShadow: '0 2px 10px rgba(37, 99, 235, 0.35)'
                    }}
                  >
                    Next: {nextTopic.title} <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
              <h3>Select a topic from the left sidebar to start learning.</h3>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
