import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCourse } from '../../context/CourseContext';
import { useLiveDb } from '../../context/LiveDbContext';

export const ProLessonViewer = () => {
  const { currentUser, isStaffModeOn } = useAuth();
  const { activeDay, navigateTo, refreshProgress } = useCourse();
  const { liveDb } = useLiveDb();
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Sync global state for original vanilla modules
    window.currentUser = currentUser;
    window.viewingStudentUsername = currentUser?.username;
    window.isStaffModeOn = Boolean(isStaffModeOn);
    window.activeTrack = 'pro';
    window.currentLessonDay = Number(activeDay);
    window.currentLessonLevel = 'pro';

    // 2. Navigation bridge for original JS modules
    window.showView = (viewName, params = {}) => {
      if (viewName === 'dashboard') {
        navigateTo('dashboard');
      } else if (viewName === 'pro_lesson') {
        const targetDay = params.day || params.id || activeDay;
        navigateTo('pro_lesson', { track: 'pro', day: Number(targetDay) });
      } else if (viewName === 'lesson') {
        const track = params.level === 2 ? 'level2' : 'level1';
        navigateTo('lesson', { track, day: Number(params.day || 1) });
      } else if (viewName === 'assessment') {
        navigateTo('assessment', { id: params.id });
      } else if (viewName === 'game' || viewName === 'custom_game') {
        navigateTo('game', { gameId: params.id || params.gameId });
      } else if (viewName === 'management') {
        navigateTo('management');
      } else if (viewName === 'database') {
        navigateTo('database');
      }
    };

    window.renderDashboard = () => {
      navigateTo('dashboard');
    };

    // 3. Connect LocalDB calls to reactive liveDb updates
    if (window.LocalDB) {
      const origSaveProgress = window.LocalDB.saveProgress;
      const origApproveLesson = window.LocalDB.approveLesson;
      const origRequestLessonValidation = window.LocalDB.requestLessonValidation;

      window.LocalDB.saveProgress = function(username, progress) {
        const res = origSaveProgress ? origSaveProgress.call(window.LocalDB, username, progress) : null;
        if (liveDb?.saveProgress) {
          liveDb.saveProgress(username, progress);
        }
        if (typeof refreshProgress === 'function') {
          refreshProgress();
        }
        return res;
      };

      window.LocalDB.approveLesson = function(username, level, day) {
        const res = origApproveLesson ? origApproveLesson.call(window.LocalDB, username, level, day) : null;
        if (liveDb?.approveLesson) {
          liveDb.approveLesson(username, level, day);
        }
        if (typeof refreshProgress === 'function') {
          refreshProgress();
        }
        return res;
      };

      window.LocalDB.requestLessonValidation = function(username, level, day) {
        const res = origRequestLessonValidation ? origRequestLessonValidation.call(window.LocalDB, username, level, day) : null;
        if (liveDb?.requestLessonValidation) {
          liveDb.requestLessonValidation(username, level, day);
        }
        if (typeof refreshProgress === 'function') {
          refreshProgress();
        }
        return res;
      };
    }

    // 4. Render the exact original module
    const dayNum = Number(activeDay) || 1;
    if (typeof window.renderProLesson === 'function') {
      window.renderProLesson(dayNum);
    } else {
      console.warn('window.renderProLesson is not yet ready');
    }

    // 5. Initialize Lucide icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    return () => {
      // Cleanup any active speech synthesis or intervals on unmount/topic change
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeDay, isStaffModeOn, currentUser, navigateTo, liveDb, refreshProgress]);

  return (
    <div className="flex-1 w-full bg-slate-50 min-h-screen text-slate-800">
      {/* Dynamic Content Container matching original id="mainContent" */}
      <div 
        ref={containerRef}
        id="mainContent" 
        className="flex-1 overflow-y-auto custom-scrollbar p-2 sm:p-4 md:p-6 pb-32 max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-center p-12 text-slate-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-3 font-semibold text-sm">Loading Professional Module {activeDay}...</span>
        </div>
      </div>
    </div>
  );
};

export default ProLessonViewer;
