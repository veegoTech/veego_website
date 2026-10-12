import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Plus, FolderPlus, FilePlus, Save, Trash2, Edit3, Eye, Code,
  Download, Upload, Check, AlertCircle, Sparkles, ChevronRight, ChevronDown,
  Layers, FileText, ArrowLeft, RefreshCw, Layout, Bold, Italic, Heading,
  List, ListOrdered, Quote, Table, HelpCircle, Globe
} from 'lucide-react';
import {
  getDynamicCourses,
  saveDynamicCourse,
  deleteDynamicCourse,
  exportCoursesToJson,
  importCoursesFromJson
} from '../../services/courseManager';
import MarkdownRenderer from './MarkdownRenderer';

export default function CourseBuilderStudio({ onBack, onLaunchPreview }) {
  const [courses, setCourses] = useState(() => getDynamicCourses());
  const [activeCourseId, setActiveCourseId] = useState(() => courses[0]?.id || null);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [activeTopicId, setActiveTopicId] = useState(null);

  // Editor states
  const [editorTopicTitle, setEditorTopicTitle] = useState('');
  const [editorTopicDuration, setEditorTopicDuration] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'edit' | 'preview'
  const [isSaved, setIsSaved] = useState(true);
  const [notification, setNotification] = useState(null);

  // Modal states for creating new items
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Programming');
  const [newCourseDesc, setNewCourseDesc] = useState('');

  const [showModuleModal, setShowModuleModal] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDesc, setNewModuleDesc] = useState('');

  const [showTopicModal, setShowTopicModal] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDuration, setNewTopicDuration] = useState('15 mins');

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0] || null;

  // Sync active course if courses change
  useEffect(() => {
    if (!activeCourse && courses.length > 0) {
      setActiveCourseId(courses[0].id);
    }
  }, [courses, activeCourse]);

  // Set default active module & topic
  useEffect(() => {
    if (activeCourse && activeCourse.modules && activeCourse.modules.length > 0) {
      if (!activeModuleId || !activeCourse.modules.some(m => m.id === activeModuleId)) {
        const firstMod = activeCourse.modules[0];
        setActiveModuleId(firstMod.id);
        if (firstMod.topics && firstMod.topics.length > 0) {
          selectTopic(firstMod.topics[0], firstMod.id);
        } else {
          setActiveTopicId(null);
          setEditorContent('');
          setEditorTopicTitle('');
        }
      }
    } else {
      setActiveModuleId(null);
      setActiveTopicId(null);
      setEditorContent('');
    }
  }, [activeCourseId]);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const selectTopic = (topic, modId) => {
    setActiveModuleId(modId);
    setActiveTopicId(topic.id);
    setEditorTopicTitle(topic.title || '');
    setEditorTopicDuration(topic.duration || '15 mins');
    setEditorContent(topic.content || '');
    setIsSaved(true);
  };

  // Insert markdown syntax at cursor position in textarea
  const insertFormatting = (prefix, suffix = '', placeholder = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;
    const selectedText = currentVal.substring(start, end) || placeholder;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newVal = currentVal.substring(0, start) + replacement + currentVal.substring(end);

    setEditorContent(newVal);
    setIsSaved(false);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  const insertTamilEnglishTemplate = () => {
    const template = `\n### 📖 Concept Explanation: English & தமிழ்\n\n| English Concept | தமிழ் விளக்கம் (Tamil Translation) | Meaning / உதாரணம் |\n|---|---|---|\n| **Key Term 1** | கருத்து 1 | விளக்கம் |\n| **Key Term 2** | கருத்து 2 | விளக்கம் |\n\n> 💡 **தமிழ் வழிகாட்டல்**: இந்த தலைப்பில் உள்ள முக்கிய கருத்துக்களை எளிமையாக புரிந்துகொள்ளுங்கள்.\n`;
    insertFormatting(template);
  };

  const insertTableTemplate = () => {
    const tableStr = `\n| Header 1 | Header 2 | Header 3 |\n|---|---|---|\n| Row 1 Col 1 | Row 1 Col 2 | Row 1 Col 3 |\n| Row 2 Col 1 | Row 2 Col 2 | Row 2 Col 3 |\n`;
    insertFormatting(tableStr);
  };

  // Save current active topic content into course state and storage
  const handleSaveCurrentTopic = async () => {
    if (!activeCourse || !activeModuleId || !activeTopicId) return;

    const updatedModules = activeCourse.modules.map(mod => {
      if (mod.id !== activeModuleId) return mod;
      return {
        ...mod,
        topics: mod.topics.map(top => {
          if (top.id !== activeTopicId) return top;
          return {
            ...top,
            title: editorTopicTitle.trim() || top.title,
            duration: editorTopicDuration.trim() || top.duration,
            content: editorContent
          };
        })
      };
    });

    const updatedCourse = {
      ...activeCourse,
      modules: updatedModules,
      updatedAt: new Date().toISOString()
    };

    try {
      await saveDynamicCourse(updatedCourse);
      setCourses(getDynamicCourses());
      setIsSaved(true);
      showToast('Topic saved and updated in LMS successfully!');
    } catch (e) {
      showToast('Failed to save topic: ' + e.message, 'error');
    }
  };

  // Create New Course
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const newId = `course_${Date.now()}`;
    const newCourseObj = {
      id: newId,
      title: newCourseTitle.trim(),
      category: newCourseCategory.trim(),
      badge: 'Dynamic Course',
      desc: newCourseDesc.trim() || 'Custom structured curriculum managed via LMS Studio.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      modules: [
        {
          id: `mod_${Date.now()}_1`,
          title: 'Module 1: Introduction & Overview',
          desc: 'Foundational concepts and curriculum overview',
          topics: [
            {
              id: `top_${Date.now()}_1`,
              title: 'Topic 1: Getting Started',
              duration: '15 mins',
              content: `# ${newCourseTitle.trim()}\n\nWelcome to this course! Edit this topic using the LMS builder.`
            }
          ]
        }
      ]
    };

    try {
      await saveDynamicCourse(newCourseObj);
      const all = getDynamicCourses();
      setCourses(all);
      setActiveCourseId(newId);
      setShowCourseModal(false);
      setNewCourseTitle('');
      setNewCourseDesc('');
      showToast(`Course "${newCourseObj.title}" created!`);
    } catch (err) {
      showToast('Error creating course', 'error');
    }
  };

  // Create New Module in active course
  const handleCreateModule = async (e) => {
    e.preventDefault();
    if (!activeCourse || !newModuleTitle.trim()) return;

    const newModId = `mod_${Date.now()}`;
    const newMod = {
      id: newModId,
      title: newModuleTitle.trim(),
      desc: newModuleDesc.trim() || 'Sub-course curriculum module',
      topics: [
        {
          id: `top_${Date.now()}_1`,
          title: 'Topic 1: Introduction',
          duration: '15 mins',
          content: `# ${newModuleTitle.trim()}\n\nStart writing lesson content here.`
        }
      ]
    };

    const updatedCourse = {
      ...activeCourse,
      modules: [...(activeCourse.modules || []), newMod]
    };

    await saveDynamicCourse(updatedCourse);
    setCourses(getDynamicCourses());
    setActiveModuleId(newModId);
    selectTopic(newMod.topics[0], newModId);
    setShowModuleModal(false);
    setNewModuleTitle('');
    setNewModuleDesc('');
    showToast(`Module "${newMod.title}" added!`);
  };

  // Create New Topic in active module
  const handleCreateTopic = async (e) => {
    e.preventDefault();
    if (!activeCourse || !activeModuleId || !newTopicTitle.trim()) return;

    const newTopicId = `top_${Date.now()}`;
    const newTopic = {
      id: newTopicId,
      title: newTopicTitle.trim(),
      duration: newTopicDuration.trim() || '15 mins',
      content: `# ${newTopicTitle.trim()}\n\nWrite your interactive topic content here using Markdown.`
    };

    const updatedModules = activeCourse.modules.map(m => {
      if (m.id !== activeModuleId) return m;
      return {
        ...m,
        topics: [...(m.topics || []), newTopic]
      };
    });

    const updatedCourse = {
      ...activeCourse,
      modules: updatedModules
    };

    await saveDynamicCourse(updatedCourse);
    setCourses(getDynamicCourses());
    selectTopic(newTopic, activeModuleId);
    setShowTopicModal(false);
    setNewTopicTitle('');
    setNewTopicDuration('15 mins');
    showToast(`Topic "${newTopic.title}" added!`);
  };

  // Delete Course
  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course and all its modules?')) return;
    await deleteDynamicCourse(courseId);
    const updated = getDynamicCourses();
    setCourses(updated);
    setActiveCourseId(updated[0]?.id || null);
    showToast('Course deleted');
  };

  // Delete Module
  const handleDeleteModule = async (modId) => {
    if (!activeCourse || !window.confirm('Delete this module and all its topics?')) return;
    const updatedModules = activeCourse.modules.filter(m => m.id !== modId);
    const updatedCourse = { ...activeCourse, modules: updatedModules };
    await saveDynamicCourse(updatedCourse);
    setCourses(getDynamicCourses());
    setActiveModuleId(updatedModules[0]?.id || null);
    showToast('Module deleted');
  };

  // Delete Topic
  const handleDeleteTopic = async (topicId) => {
    if (!activeCourse || !activeModuleId || !window.confirm('Delete this topic?')) return;
    const updatedModules = activeCourse.modules.map(m => {
      if (m.id !== activeModuleId) return m;
      return {
        ...m,
        topics: m.topics.filter(t => t.id !== topicId)
      };
    });
    const updatedCourse = { ...activeCourse, modules: updatedModules };
    await saveDynamicCourse(updatedCourse);
    setCourses(getDynamicCourses());
    const curMod = updatedModules.find(m => m.id === activeModuleId);
    if (curMod && curMod.topics.length > 0) {
      selectTopic(curMod.topics[0], activeModuleId);
    } else {
      setActiveTopicId(null);
      setEditorContent('');
    }
    showToast('Topic deleted');
  };

  // Handle Import JSON
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importCoursesFromJson(event.target?.result);
      if (res.success) {
        setCourses(getDynamicCourses());
        showToast(`Imported ${res.count} courses successfully!`);
      } else {
        showToast('Import failed: ' + res.error, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#090d16', color: '#f8fafc', overflow: 'hidden' }}>
      {/* Toast Notification */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '2rem',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '8px',
            background: notification.type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(16, 185, 129, 0.95)',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            fontWeight: 500,
            fontSize: '0.9rem',
            backdropFilter: 'blur(8px)'
          }}
        >
          {notification.type === 'error' ? <AlertCircle size={18} /> : <Check size={18} />}
          {notification.msg}
        </div>
      )}

      {/* Top Navigation Bar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 1.5rem',
          background: 'rgba(15, 23, 42, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(12px)',
          gap: '1rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onBack && (
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
                fontSize: '0.85rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ padding: '6px', background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)', borderRadius: '8px' }}>
              <Layers size={18} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>
                Pure LMS Course Studio
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Course &gt; Sub-course (Module) &gt; Topic &gt; Rich Content Editor
              </span>
            </div>
          </div>
        </div>

        {/* Course Switcher & Global Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Course Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(30, 41, 59, 0.7)', padding: '0.3rem 0.6rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <BookOpen size={15} color="#60a5fa" />
            <select
              value={activeCourseId || ''}
              onChange={(e) => setActiveCourseId(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
                maxWidth: '220px'
              }}
            >
              {courses.map(c => (
                <option key={c.id} value={c.id} style={{ background: '#1e293b', color: '#fff' }}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* New Course Button */}
          <button
            onClick={() => setShowCourseModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              border: 'none',
              color: '#fff',
              padding: '0.5rem 0.9rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37,99,235,0.35)'
            }}
          >
            <Plus size={16} /> New Course
          </button>

          {/* Preview as Student */}
          {onLaunchPreview && activeCourse && (
            <button
              onClick={() => onLaunchPreview(activeCourse.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#34d399',
                padding: '0.5rem 0.9rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Eye size={16} /> Preview as Student
            </button>
          )}

          {/* Export JSON */}
          <button
            onClick={exportCoursesToJson}
            title="Export Courses Backup"
            style={{
              padding: '0.5rem',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <Download size={16} />
          </button>

          {/* Import JSON */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import Courses Backup"
            style={{
              padding: '0.5rem',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <Upload size={16} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            accept=".json"
            style={{ display: 'none' }}
          />
        </div>
      </header>

      {/* Main Studio Body: 2 Columns (Left Tree, Right Editor) */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {/* Left Hierarchy Panel: Modules & Topics Tree */}
        <aside
          style={{
            width: '320px',
            minWidth: '280px',
            background: 'rgba(15, 23, 42, 0.95)',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Module Header & Add Module */}
          <div
            style={{
              padding: '1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#f1f5f9' }}>
                Curriculum Structure
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {activeCourse?.modules?.length || 0} Modules · {activeCourse?.modules?.reduce((acc, m) => acc + (m.topics?.length || 0), 0) || 0} Topics
              </span>
            </div>

            <button
              onClick={() => setShowModuleModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#818cf8',
                borderRadius: '6px',
                padding: '0.35rem 0.65rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <FolderPlus size={14} /> + Module
            </button>
          </div>

          {/* Module & Topic Accordion Tree */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
            {(!activeCourse?.modules || activeCourse.modules.length === 0) ? (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                <p>No modules in this course yet.</p>
                <button
                  onClick={() => setShowModuleModal(true)}
                  style={{
                    marginTop: '0.5rem',
                    background: '#3b82f6',
                    border: 'none',
                    color: '#fff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Create First Module
                </button>
              </div>
            ) : (
              activeCourse.modules.map((mod, modIdx) => {
                const isModSelected = mod.id === activeModuleId;
                return (
                  <div
                    key={mod.id}
                    style={{
                      marginBottom: '0.75rem',
                      borderRadius: '8px',
                      background: isModSelected ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.02)',
                      border: isModSelected ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Module Title Bar */}
                    <div
                      style={{
                        padding: '0.65rem 0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        background: isModSelected ? 'rgba(99, 102, 241, 0.08)' : 'transparent'
                      }}
                      onClick={() => setActiveModuleId(mod.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0, flex: 1 }}>
                        <span style={{ fontSize: '0.7rem', background: '#3b82f6', color: '#fff', padding: '2px 5px', borderRadius: '4px', fontWeight: 700 }}>
                          M{modIdx + 1}
                        </span>
                        <span
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: isModSelected ? '#60a5fa' : '#cbd5e1',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                          title={mod.title}
                        >
                          {mod.title}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setActiveModuleId(mod.id);
                            setShowTopicModal(true);
                          }}
                          title="Add Topic to this Module"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#34d399',
                            cursor: 'pointer',
                            padding: '3px'
                          }}
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteModule(mod.id)}
                          title="Delete Module"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '3px'
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Topics inside this module */}
                    <div style={{ padding: '0.3rem 0.5rem 0.6rem 0.5rem' }}>
                      {(!mod.topics || mod.topics.length === 0) ? (
                        <div style={{ padding: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
                          No topics yet.{' '}
                          <span
                            onClick={() => { setActiveModuleId(mod.id); setShowTopicModal(true); }}
                            style={{ color: '#60a5fa', cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            + Add Topic
                          </span>
                        </div>
                      ) : (
                        mod.topics.map((top, topIdx) => {
                          const isTopActive = top.id === activeTopicId;
                          return (
                            <div
                              key={top.id}
                              onClick={() => selectTopic(top, mod.id)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.45rem 0.6rem',
                                margin: '0.2rem 0',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                background: isTopActive ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.25) 100%)' : 'rgba(255, 255, 255, 0.02)',
                                border: isTopActive ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid transparent',
                                transition: 'all 0.15s'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0, flex: 1 }}>
                                <FileText size={13} color={isTopActive ? '#60a5fa' : '#94a3b8'} />
                                <span
                                  style={{
                                    fontSize: '0.8rem',
                                    fontWeight: isTopActive ? 600 : 400,
                                    color: isTopActive ? '#ffffff' : '#cbd5e1',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  }}
                                  title={top.title}
                                >
                                  {top.title}
                                </span>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }} onClick={(e) => e.stopPropagation()}>
                                <span style={{ fontSize: '0.65rem', color: '#64748b', background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '3px' }}>
                                  {top.duration || '15m'}
                                </span>
                                <button
                                  onClick={() => handleDeleteTopic(top.id)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#94a3b8',
                                    cursor: 'pointer',
                                    padding: '2px'
                                  }}
                                  title="Delete Topic"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Delete Course footer button */}
          {activeCourse && (
            <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                onClick={() => handleDeleteCourse(activeCourse.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={13} /> Delete Entire Course
              </button>
            </div>
          )}
        </aside>

        {/* Right Editor & Live Preview Panel */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
          {!activeTopicId ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#64748b' }}>
              <FilePlus size={48} style={{ opacity: 0.4, marginBottom: '1rem' }} />
              <h3 style={{ margin: 0, color: '#94a3b8' }}>Select or create a Topic to begin editing</h3>
              <p style={{ fontSize: '0.85rem' }}>Use the left sidebar to add a Module and Topics.</p>
            </div>
          ) : (
            <>
              {/* Topic Meta Header (Title & Duration Input) */}
              <div
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '300px' }}>
                  <input
                    type="text"
                    value={editorTopicTitle}
                    onChange={(e) => { setEditorTopicTitle(e.target.value); setIsSaved(false); }}
                    placeholder="Topic Title (e.g., Topic 1: Client-Server Architecture)"
                    style={{
                      flex: 1,
                      background: 'rgba(30, 41, 59, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontSize: '1rem',
                      fontWeight: 600,
                      padding: '0.45rem 0.75rem',
                      borderRadius: '6px',
                      outline: 'none'
                    }}
                  />

                  <input
                    type="text"
                    value={editorTopicDuration}
                    onChange={(e) => { setEditorTopicDuration(e.target.value); setIsSaved(false); }}
                    placeholder="Duration (15 mins)"
                    style={{
                      width: '120px',
                      background: 'rgba(30, 41, 59, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#cbd5e1',
                      fontSize: '0.85rem',
                      padding: '0.45rem 0.6rem',
                      borderRadius: '6px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* View Mode Toggle & Save Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '6px', padding: '2px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <button
                      onClick={() => setViewMode('split')}
                      style={{
                        padding: '4px 10px',
                        background: viewMode === 'split' ? '#3b82f6' : 'transparent',
                        color: viewMode === 'split' ? '#fff' : '#94a3b8',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Split View
                    </button>
                    <button
                      onClick={() => setViewMode('edit')}
                      style={{
                        padding: '4px 10px',
                        background: viewMode === 'edit' ? '#3b82f6' : 'transparent',
                        color: viewMode === 'edit' ? '#fff' : '#94a3b8',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Editor Only
                    </button>
                    <button
                      onClick={() => setViewMode('preview')}
                      style={{
                        padding: '4px 10px',
                        background: viewMode === 'preview' ? '#3b82f6' : 'transparent',
                        color: viewMode === 'preview' ? '#fff' : '#94a3b8',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Live Preview
                    </button>
                  </div>

                  <button
                    onClick={handleSaveCurrentTopic}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: isSaved ? 'rgba(16, 185, 129, 0.2)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: isSaved ? '1px solid rgba(16, 185, 129, 0.4)' : 'none',
                      color: '#ffffff',
                      padding: '0.45rem 1rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: isSaved ? 'none' : '0 2px 10px rgba(16,185,129,0.3)'
                    }}
                  >
                    <Save size={15} />
                    {isSaved ? 'Saved' : 'Save Changes'}
                  </button>
                </div>
              </div>

              {/* Rich Markdown Formatting Toolbar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.45rem 1.5rem',
                  background: 'rgba(20, 27, 45, 0.9)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  flexWrap: 'wrap'
                }}
              >
                <button
                  type="button"
                  onClick={() => insertFormatting('# ', '', 'Heading 1')}
                  style={toolbarBtnStyle}
                  title="Heading 1"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('## ', '', 'Heading 2')}
                  style={toolbarBtnStyle}
                  title="Heading 2"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('### ', '', 'Heading 3')}
                  style={toolbarBtnStyle}
                  title="Heading 3"
                >
                  H3
                </button>

                <div style={separatorStyle} />

                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**', 'bold text')}
                  style={toolbarBtnStyle}
                  title="Bold"
                >
                  <Bold size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*', 'italic text')}
                  style={toolbarBtnStyle}
                  title="Italic"
                >
                  <Italic size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('`', '`', 'code')}
                  style={toolbarBtnStyle}
                  title="Inline Code"
                >
                  <Code size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('```javascript\n', '\n```', '// Your code here')}
                  style={toolbarBtnStyle}
                  title="Code Block"
                >
                  {'```'}
                </button>

                <div style={separatorStyle} />

                <button
                  type="button"
                  onClick={() => insertFormatting('- ', '', 'List item')}
                  style={toolbarBtnStyle}
                  title="Bullet List"
                >
                  <List size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('1. ', '', 'Numbered item')}
                  style={toolbarBtnStyle}
                  title="Numbered List"
                >
                  <ListOrdered size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('> 💡 **Key Takeaway**: ', '', 'Important note or tip')}
                  style={toolbarBtnStyle}
                  title="Callout Box"
                >
                  <Quote size={14} />
                </button>
                <button
                  type="button"
                  onClick={insertTableTemplate}
                  style={toolbarBtnStyle}
                  title="Insert Markdown Table"
                >
                  <Table size={14} />
                </button>

                <div style={separatorStyle} />

                {/* Tamil & English side-by-side template button */}
                <button
                  type="button"
                  onClick={insertTamilEnglishTemplate}
                  style={{
                    ...toolbarBtnStyle,
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: '#818cf8',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    fontWeight: 600
                  }}
                  title="Insert English & Tamil dual-explanation template"
                >
                  <Globe size={13} style={{ marginRight: '3px' }} />
                  + தமிழ் & English Template
                </button>
              </div>

              {/* Editor / Live Preview Panes */}
              <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
                {/* Editor Textarea */}
                {(viewMode === 'split' || viewMode === 'edit') && (
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      borderRight: viewMode === 'split' ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                      background: '#0d131f'
                    }}
                  >
                    <textarea
                      ref={textareaRef}
                      value={editorContent}
                      onChange={(e) => { setEditorContent(e.target.value); setIsSaved(false); }}
                      placeholder="Write your topic lesson here using Markdown... You can include headings, tables, Tamil translations, and code blocks."
                      style={{
                        flex: 1,
                        padding: '1.25rem',
                        background: 'transparent',
                        border: 'none',
                        color: '#f8fafc',
                        fontSize: '0.95rem',
                        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                        lineHeight: 1.7,
                        resize: 'none',
                        outline: 'none',
                        overflowY: 'auto'
                      }}
                    />
                  </div>
                )}

                {/* Rendered Markdown Preview */}
                {(viewMode === 'split' || viewMode === 'preview') && (
                  <div
                    style={{
                      flex: 1,
                      padding: '1.5rem 2rem',
                      background: '#090d16',
                      overflowY: 'auto'
                    }}
                  >
                    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                      <MarkdownRenderer content={editorContent} />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Modal: Create New Course */}
      {showCourseModal && (
        <div style={modalBackdropStyle}>
          <div style={modalBoxStyle}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.2rem', color: '#fff' }}>Add New Course</h3>
            <form onSubmit={handleCreateCourse}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Course Title *</label>
                <input
                  type="text"
                  required
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Master Full Stack Next.js & Supabase"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Category</label>
                <input
                  type="text"
                  value={newCourseCategory}
                  onChange={(e) => setNewCourseCategory(e.target.value)}
                  placeholder="e.g. Web Development, AI, Cloud"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  rows={3}
                  value={newCourseDesc}
                  onChange={(e) => setNewCourseDesc(e.target.value)}
                  placeholder="Brief summary of what students will master..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  style={cancelBtnStyle}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={primaryBtnStyle}
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create New Module */}
      {showModuleModal && (
        <div style={modalBackdropStyle}>
          <div style={modalBoxStyle}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.2rem', color: '#fff' }}>Add New Module / Sub-Course</h3>
            <form onSubmit={handleCreateModule}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Module Title *</label>
                <input
                  type="text"
                  required
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  placeholder="e.g. Module 2: State Management & Redux Toolkit"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Module Summary / Objective</label>
                <textarea
                  rows={2}
                  value={newModuleDesc}
                  onChange={(e) => setNewModuleDesc(e.target.value)}
                  placeholder="Core goals covered in this module..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowModuleModal(false)}
                  style={cancelBtnStyle}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={primaryBtnStyle}
                >
                  Add Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create New Topic */}
      {showTopicModal && (
        <div style={modalBackdropStyle}>
          <div style={modalBoxStyle}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.2rem', color: '#fff' }}>Add New Topic</h3>
            <form onSubmit={handleCreateTopic}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Topic Title *</label>
                <input
                  type="text"
                  required
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="e.g. Topic 1: Understanding Asynchronous JavaScript"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Estimated Duration</label>
                <input
                  type="text"
                  value={newTopicDuration}
                  onChange={(e) => setNewTopicDuration(e.target.value)}
                  placeholder="e.g. 20 mins"
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowTopicModal(false)}
                  style={cancelBtnStyle}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={primaryBtnStyle}
                >
                  Add Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline Styles
const toolbarBtnStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  color: '#cbd5e1',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '3px'
};

const separatorStyle = {
  width: '1px',
  height: '16px',
  background: 'rgba(255, 255, 255, 0.1)',
  margin: '0 4px'
};

const modalBackdropStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.75)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '1rem'
};

const modalBoxStyle = {
  background: '#131b2e',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '12px',
  padding: '1.75rem',
  width: '100%',
  maxWidth: '480px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 600,
  color: '#94a3b8',
  marginBottom: '0.35rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.8rem',
  background: 'rgba(15, 23, 42, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const cancelBtnStyle = {
  padding: '0.5rem 1rem',
  background: 'rgba(255, 255, 255, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#cbd5e1',
  borderRadius: '6px',
  fontSize: '0.85rem',
  cursor: 'pointer'
};

const primaryBtnStyle = {
  padding: '0.5rem 1.25rem',
  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  border: 'none',
  color: '#ffffff',
  borderRadius: '6px',
  fontSize: '0.85rem',
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 2px 10px rgba(37,99,235,0.35)'
};
