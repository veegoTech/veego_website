import React, { useEffect, useRef } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { spokoProSyllabus } from '../../data/spokoProSyllabus';
import { getAssignmentValidations, isModuleLocked } from '../../utils/htmlCssLocking';

export default function SpokoProTopic({
  topic = 1,
  activeTab = 'interactive_simulator',
  onNavigate,
  session
}) {
  const containerRef = useRef(null);
  const lessonData = spokoProSyllabus[topic] || spokoProSyllabus[1] || {};
  const currentModuleId = `spoko_pro_topic${topic}`;
  const prevTopic = topic > 1 ? topic - 1 : 1;
  const prevModuleId = `spoko_pro_topic${prevTopic}`;

  const validations = getAssignmentValidations();
  const isTopicLocked = topic > 1 && isModuleLocked('spoko_pro', currentModuleId, validations, session);

  useEffect(() => {
    // 1. Sync global state for vanilla modules
    window.currentUser = session;
    window.viewingStudentUsername = session?.name || session?.username || 'student';
    window.isStaffModeOn = session?.role === 'staff' || session?.role === 'admin';
    window.activeTrack = 'pro';
    window.currentLessonDay = Number(topic);
    window.currentLessonLevel = 'pro';

    if (window.LocalDB && typeof window.LocalDB.init === 'function') {
      window.LocalDB.init();
    }

    // 2. Navigation bridge for vanilla modules
    window.showView = (viewName, params = {}) => {
      if (viewName === 'dashboard') {
        if (typeof onNavigate === 'function') onNavigate('dashboard');
      } else if (viewName === 'pro_lesson') {
        const targetDay = params.day || params.id || topic;
        if (typeof onNavigate === 'function') onNavigate(`spoko_pro_topic${targetDay}`, 'interactive_simulator');
      }
    };

    window.renderDashboard = () => {
      if (typeof onNavigate === 'function') onNavigate('dashboard');
    };

    // 3. Render the exact interactive simulator module
    const renderModule = () => {
      try {
        if (typeof window.renderProLesson === 'function') {
          window.renderProLesson(Number(topic));
        } else if (topic === 2 && typeof window.renderResumeBuildingModule === 'function') {
          window.renderResumeBuildingModule(2);
        } else if (topic === 1 && typeof window.renderProSelfIntroModule === 'function') {
          window.renderProSelfIntroModule(1);
        }
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
      } catch (e) {
        console.warn('Pro module render warning:', e);
      }
    };

    const timer = setTimeout(renderModule, 50);
    return () => {
      clearTimeout(timer);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [topic, session, onNavigate]);

  if (isTopicLocked) {
    return (
      <div style={{
        maxWidth: 720,
        margin: '3rem auto',
        padding: '3rem 2rem',
        background: '#ffffff',
        borderRadius: 24,
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        textAlign: 'center'
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: '#ecfdf5',
          border: '2px solid #059669',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <Lock size={32} color="#059669" />
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem 0' }}>
          Topic {topic} is Locked 🔒
        </h2>
        <p style={{ fontSize: '0.98rem', color: '#64748b', maxWidth: 540, margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Complete Topic {prevTopic} and receive staff approval to unlock <strong>Topic {topic}: {lessonData.title}</strong>.
        </p>
        <button
          onClick={() => onNavigate(`spoko_pro_topic${prevTopic}`, 'interactive_simulator')}
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '12px 28px',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          Go to Topic {prevTopic} <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800">
      {/* Live Interactive Simulator Container */}
      <div
        ref={containerRef}
        id="mainContent"
        className="w-full pb-28 max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-center p-16 text-slate-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-3 font-semibold text-sm">Loading Professional Module {topic}...</span>
        </div>
      </div>
    </div>
  );
}
