import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Plus, FolderPlus, FilePlus, Save, Trash2, Eye, Code,
  Download, Upload, Check, AlertCircle, ChevronRight, ChevronDown,
  Layers, FileText, ArrowLeft, Bold, Italic,
  List, ListOrdered, Quote, Table, Globe, ChevronLeft,
  Menu, Search, Clock, X, Info, Edit3, Image as ImageIcon
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

  // Layout states
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [collapsedModules, setCollapsedModules] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Editor states
  const [editorTopicTitle, setEditorTopicTitle] = useState('');
  const [editorTopicDuration, setEditorTopicDuration] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [viewMode, setViewMode] = useState('split'); // 'visual' | 'text' | 'split'
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

  // Media Modal states
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaTab, setMediaTab] = useState('upload'); // 'upload' | 'url' | 'presets'
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaAlt, setMediaAlt] = useState('');
  const [mediaPreview, setMediaPreview] = useState('');
  const mediaFileInputRef = useRef(null);

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

  // Keyboard shortcut: Ctrl+S / Cmd+S to save current topic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveCurrentTopic();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCourse, activeModuleId, activeTopicId, editorTopicTitle, editorTopicDuration, editorContent]);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleModuleCollapse = (modId, e) => {
    if (e) e.stopPropagation();
    setCollapsedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const selectTopic = (topic, modId) => {
    setActiveModuleId(modId);
    setActiveTopicId(topic.id);
    setEditorTopicTitle(topic.title || '');
    setEditorTopicDuration(topic.duration || '15 mins');
    setEditorContent(topic.content || '');
    setIsSaved(true);

    // Ensure the parent module is expanded
    setCollapsedModules(prev => ({
      ...prev,
      [modId]: false
    }));
  };

  // Insert markdown syntax at cursor position in textarea (with fallback if visual mode)
  const insertFormatting = (prefix, suffix = '', placeholder = '') => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setEditorContent(prev => prev ? `${prev}\n\n${prefix}${placeholder}${suffix}` : `${prefix}${placeholder}${suffix}`);
      setIsSaved(false);
      return;
    }

    const start = textarea.selectionStart ?? textarea.value.length;
    const end = textarea.selectionEnd ?? textarea.value.length;
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

  const handleMediaFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, SVG, WebP, GIF)', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result;
      setMediaPreview(dataUrl);
      setMediaUrl(dataUrl);
      if (!mediaAlt) {
        setMediaAlt(file.name.replace(/\.[^/.]+$/, ''));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInsertMedia = (customUrl, customAlt) => {
    const finalUrl = customUrl || mediaUrl.trim() || mediaPreview;
    if (!finalUrl) {
      showToast('Please upload an image or provide an image URL', 'error');
      return;
    }
    const finalAlt = customAlt || mediaAlt.trim() || 'Lesson Diagram';
    const md = `\n\n![${finalAlt}](${finalUrl})\n\n`;
    insertFormatting(md);
    setShowMediaModal(false);
    setMediaUrl('');
    setMediaAlt('');
    setMediaPreview('');
    showToast('Media inserted into lesson!');
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
      showToast('Lesson updated successfully!');
    } catch (e) {
      showToast('Failed to save lesson: ' + e.message, 'error');
    }
  };

  // Reset/Cancel current edits
  const handleCancelEdits = () => {
    const curMod = activeCourse?.modules?.find(m => m.id === activeModuleId);
    const curTopic = curMod?.topics?.find(t => t.id === activeTopicId);
    if (curTopic) {
      setEditorTopicTitle(curTopic.title || '');
      setEditorTopicDuration(curTopic.duration || '15 mins');
      setEditorContent(curTopic.content || '');
      setIsSaved(true);
      showToast('Changes reverted to saved state.');
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
              title: 'Lesson 1',
              duration: '15 mins',
              content: `# ${newCourseTitle.trim()}\n\nWelcome to this lesson! Edit this lesson using the rich editor.`
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
    } catch {
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
          title: 'Lesson 1',
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
      content: `# ${newTopicTitle.trim()}\n\nWrite your lesson content here.`
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
    showToast(`Lesson "${newTopic.title}" added!`);
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
    if (!activeCourse || !window.confirm('Delete this module and all its lessons?')) return;
    const updatedModules = activeCourse.modules.filter(m => m.id !== modId);
    const updatedCourse = { ...activeCourse, modules: updatedModules };
    await saveDynamicCourse(updatedCourse);
    setCourses(getDynamicCourses());
    setActiveModuleId(updatedModules[0]?.id || null);
    showToast('Module deleted');
  };

  // Delete Topic
  const handleDeleteTopic = async (topicId) => {
    if (!activeCourse || !activeModuleId || !window.confirm('Delete this lesson?')) return;
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
    showToast('Lesson deleted');
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

  // Filter modules/topics by search query
  const filteredModules = (activeCourse?.modules || []).map(mod => {
    if (!searchQuery.trim()) return { ...mod, isMatch: true };
    const query = searchQuery.toLowerCase();
    const modMatches = mod.title.toLowerCase().includes(query);
    const matchingTopics = (mod.topics || []).filter(t => t.title.toLowerCase().includes(query));
    return {
      ...mod,
      isMatch: modMatches || matchingTopics.length > 0,
      matchingTopicIds: new Set(matchingTopics.map(t => t.id))
    };
  }).filter(mod => mod.isMatch);

  const totalTopicsCount = activeCourse?.modules?.reduce((acc, m) => acc + (m.topics?.length || 0), 0) || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', maxWidth: '100vw', height: '100vh', maxHeight: '100vh', background: '#eef2f6', color: '#1e293b', overflow: 'hidden', boxSizing: 'border-box', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Toast Notification */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '1.25rem',
            right: '1.5rem',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '8px',
            background: notification.type === 'error' ? '#ef4444' : '#10b981',
            color: '#ffffff',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
            fontWeight: 500,
            fontSize: '0.88rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {notification.type === 'error' ? <AlertCircle size={18} /> : <Check size={18} />}
          {notification.msg}
        </div>
      )}

      {/* Light Mode Top Navigation Bar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '58px',
          padding: '0 1.5rem',
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          gap: '1rem',
          zIndex: 30,
          flexShrink: 0,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}
      >
        {/* Left: Back + Sidebar Toggle + Brand Logo + Course Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                color: '#475569',
                borderRadius: '6px',
                padding: '0.4rem 0.75rem',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#475569'; }}
              title="Return to LMS"
            >
              <ArrowLeft size={15} /> Back
            </button>
          )}

          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              background: isSidebarOpen ? '#eff6ff' : '#f8fafc',
              border: isSidebarOpen ? '1px solid #bfdbfe' : '1px solid #cbd5e1',
              color: isSidebarOpen ? '#2563eb' : '#64748b',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
            title={isSidebarOpen ? "Hide Curriculum Sidebar" : "Show Curriculum Sidebar"}
          >
            <Menu size={16} />
          </button>

          {/* Studio Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '0.5rem' }}>
            <div style={{ padding: '6px', background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', borderRadius: '7px', display: 'flex' }}>
              <Layers size={16} color="#fff" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                Course Studio
              </span>
              <span style={{ fontSize: '0.7rem', background: '#e0f2fe', color: '#0284c7', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                Editor
              </span>
            </div>
          </div>

          <div style={{ width: '1px', height: '22px', background: '#e2e8f0', margin: '0 0.25rem' }} />

          {/* Course Selector Dropdown & + New Course */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#f8fafc',
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1'
              }}
            >
              <BookOpen size={14} color="#0284c7" />
              <select
                value={activeCourseId || ''}
                onChange={(e) => setActiveCourseId(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#1e293b',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  maxWidth: '240px'
                }}
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowCourseModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                color: '#2563eb',
                padding: '0.38rem 0.7rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              title="Add New Course"
            >
              <Plus size={14} /> New
            </button>
          </div>
        </div>

        {/* Right: Preview as Student + Import/Export Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
          {onLaunchPreview && activeCourse && (
            <button
              onClick={() => onLaunchPreview(activeCourse.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#10b981',
                border: 'none',
                color: '#ffffff',
                padding: '0.42rem 0.95rem',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(16,185,129,0.25)',
                transition: 'transform 0.15s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
              title="Preview how students view this interactive course"
            >
              <Eye size={15} /> Preview as Student
            </button>
          )}

          <div style={{ width: '1px', height: '22px', background: '#e2e8f0' }} />

          {/* Export JSON */}
          <button
            onClick={exportCoursesToJson}
            title="Export Courses JSON Backup"
            style={{
              padding: '0.4rem 0.55rem',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Download size={15} />
          </button>

          {/* Import JSON */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import Courses Backup"
            style={{
              padding: '0.4rem 0.55rem',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Upload size={15} />
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

      {/* Main Studio Body: Collapsible Left Sidebar + Clean Light Canvas */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
        {/* Left Sidebar: Curriculum Structure */}
        <aside
          style={{
            width: isSidebarOpen ? '320px' : '0px',
            minWidth: isSidebarOpen ? '290px' : '0px',
            maxWidth: isSidebarOpen ? '340px' : '0px',
            background: '#ffffff',
            borderRight: isSidebarOpen ? '1px solid #e2e8f0' : 'none',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isSidebarOpen ? 1 : 0,
            visibility: isSidebarOpen ? 'visible' : 'hidden',
            zIndex: 20
          }}
        >
          {/* Header & Add Module */}
          <div
            style={{
              padding: '0.9rem 1rem 0.75rem',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>
                  Curriculum Structure
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  {activeCourse?.modules?.length || 0} Modules · {totalTopicsCount} Lessons
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  onClick={() => setShowModuleModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#2563eb',
                    borderRadius: '6px',
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  title="Add New Module"
                >
                  <FolderPlus size={13} /> + Module
                </button>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex'
                  }}
                  title="Collapse sidebar"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>

            {/* Quick Search Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '0.35rem 0.6rem'
              }}
            >
              <Search size={13} color="#94a3b8" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons or modules..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#334155',
                  fontSize: '0.8rem'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, display: 'flex' }}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Module & Topic Accordion Tree */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
            {(!activeCourse?.modules || activeCourse.modules.length === 0) ? (
              <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                <p style={{ margin: '0 0 0.5rem' }}>No modules in this course yet.</p>
                <button
                  onClick={() => setShowModuleModal(true)}
                  style={{
                    background: '#0284c7',
                    border: 'none',
                    color: '#fff',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Create First Module
                </button>
              </div>
            ) : filteredModules.length === 0 ? (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#64748b', fontSize: '0.82rem' }}>
                No lessons matching "{searchQuery}"
              </div>
            ) : (
              filteredModules.map((mod, modIdx) => {
                const isModSelected = mod.id === activeModuleId;
                const isCollapsed = !!collapsedModules[mod.id] && !searchQuery;
                const topicCount = mod.topics?.length || 0;

                return (
                  <div
                    key={mod.id}
                    style={{
                      marginBottom: '0.65rem',
                      borderRadius: '8px',
                      background: '#ffffff',
                      border: isModSelected ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
                      boxShadow: isModSelected ? '0 1px 4px rgba(37,99,235,0.08)' : '0 1px 2px rgba(0,0,0,0.02)',
                      overflow: 'hidden',
                      transition: 'border 0.2s, box-shadow 0.2s'
                    }}
                  >
                    {/* Module Title Bar */}
                    <div
                      style={{
                        padding: '0.6rem 0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        background: isModSelected ? '#f8fafc' : '#ffffff',
                        userSelect: 'none'
                      }}
                      onClick={() => {
                        setActiveModuleId(mod.id);
                        toggleModuleCollapse(mod.id);
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: isModSelected ? '#2563eb' : '#94a3b8',
                            transition: 'transform 0.2s'
                          }}
                        >
                          {isCollapsed ? <ChevronRight size={15} /> : <ChevronDown size={15} />}
                        </div>

                        <span
                          style={{
                            fontSize: '0.7rem',
                            background: isModSelected ? '#eff6ff' : '#f1f5f9',
                            border: isModSelected ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
                            color: isModSelected ? '#2563eb' : '#64748b',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            fontWeight: 700
                          }}
                        >
                          M{modIdx + 1}
                        </span>

                        <span
                          style={{
                            fontSize: '0.84rem',
                            fontWeight: isModSelected ? 600 : 500,
                            color: isModSelected ? '#1e40af' : '#334155',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                          title={mod.title}
                        >
                          {mod.title}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }} onClick={(e) => e.stopPropagation()}>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginRight: '3px' }}>
                          {topicCount}
                        </span>

                        <button
                          onClick={() => {
                            setActiveModuleId(mod.id);
                            setShowTopicModal(true);
                          }}
                          title="Add Lesson to Module"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#10b981',
                            cursor: 'pointer',
                            padding: '3px',
                            display: 'flex',
                            borderRadius: '4px'
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
                            color: '#cbd5e1',
                            cursor: 'pointer',
                            padding: '3px',
                            display: 'flex',
                            borderRadius: '4px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Topics (Lessons) Tree */}
                    {!isCollapsed && (
                      <div
                        style={{
                          padding: '0.25rem 0.5rem 0.5rem 0.85rem',
                          borderTop: '1px solid #f1f5f9',
                          position: 'relative'
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            left: '1.35rem',
                            top: 0,
                            bottom: '0.6rem',
                            width: '1px',
                            background: '#e2e8f0'
                          }}
                        />

                        {(!mod.topics || mod.topics.length === 0) ? (
                          <div style={{ padding: '0.4rem 0.5rem', fontSize: '0.74rem', color: '#94a3b8', marginLeft: '0.75rem' }}>
                            No lessons yet.{' '}
                            <span
                              onClick={() => { setActiveModuleId(mod.id); setShowTopicModal(true); }}
                              style={{ color: '#0284c7', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                              + Add Lesson
                            </span>
                          </div>
                        ) : (
                          mod.topics.map((top) => {
                            if (searchQuery && mod.matchingTopicIds && !mod.matchingTopicIds.has(top.id)) {
                              return null;
                            }

                            const isTopActive = top.id === activeTopicId;
                            return (
                              <div
                                key={top.id}
                                onClick={() => selectTopic(top, mod.id)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '0.45rem 0.6rem 0.45rem 0.75rem',
                                  margin: '0.2rem 0 0.2rem 0.5rem',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  background: isTopActive ? '#eff6ff' : '#ffffff',
                                  border: isTopActive ? '1px solid #bfdbfe' : '1px solid transparent',
                                  position: 'relative',
                                  transition: 'all 0.15s'
                                }}
                                onMouseEnter={(e) => {
                                  if (!isTopActive) e.currentTarget.style.background = '#f8fafc';
                                }}
                                onMouseLeave={(e) => {
                                  if (!isTopActive) e.currentTarget.style.background = '#ffffff';
                                }}
                              >
                                {isTopActive && (
                                  <div
                                    style={{
                                      position: 'absolute',
                                      left: '-3px',
                                      top: '5px',
                                      bottom: '5px',
                                      width: '3px',
                                      borderRadius: '2px',
                                      background: '#0284c7'
                                    }}
                                  />
                                )}

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0, flex: 1 }}>
                                  <FileText size={13} color={isTopActive ? '#0284c7' : '#94a3b8'} />
                                  <span
                                    style={{
                                      fontSize: '0.8rem',
                                      fontWeight: isTopActive ? 600 : 400,
                                      color: isTopActive ? '#1e40af' : '#334155',
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
                                  <span
                                    style={{
                                      fontSize: '0.64rem',
                                      color: '#64748b',
                                      background: '#f1f5f9',
                                      padding: '1px 5px',
                                      borderRadius: '4px',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {top.duration || '15m'}
                                  </span>
                                  <button
                                    onClick={() => handleDeleteTopic(top.id)}
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      color: '#cbd5e1',
                                      cursor: 'pointer',
                                      padding: '2px',
                                      display: 'flex'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                                    title="Delete Lesson"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Delete Course footer button */}
          {activeCourse && (
            <div style={{ padding: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
              <button
                onClick={() => handleDeleteCourse(activeCourse.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  borderRadius: '6px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#fee2e2'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#fef2f2'}
              >
                <Trash2 size={13} /> Delete Course
              </button>
            </div>
          )}
        </aside>

        {/* Center Editor Canvas: Full-Height Seamlessly Aligned Workspace */}
        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100%',
            overflow: 'hidden',
            background: '#ffffff'
          }}
        >
          {!activeTopicId ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '2rem',
                background: '#f8fafc'
              }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <FilePlus size={32} color="#0284c7" />
              </div>
              <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.2rem', fontWeight: 700 }}>
                Select or create a Lesson to begin editing
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', maxWidth: '420px', margin: '0 0 1.25rem', textAlign: 'center' }}>
                Pick a lesson from the curriculum sidebar on the left, or add a new module to start building your content.
              </p>
              <button
                onClick={() => setShowModuleModal(true)}
                style={{
                  background: '#0284c7',
                  border: 'none',
                  color: '#fff',
                  padding: '0.55rem 1.2rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                + Add First Module
              </button>
            </div>
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minHeight: 0,
                overflow: 'hidden'
              }}
            >
              {/* Top Meta Strip: Lesson Name, Duration & Save Actions */}
              <div
                style={{
                  padding: '0.65rem 1.5rem',
                  borderBottom: '1px solid #e2e8f0',
                  background: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  flexShrink: 0
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {/* Lesson Name & Duration Input */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '320px' }}>
                    <label style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap' }}>
                      Lesson Name
                    </label>

                    <input
                      type="text"
                      value={editorTopicTitle}
                      onChange={(e) => { setEditorTopicTitle(e.target.value); setIsSaved(false); }}
                      placeholder="Lesson 1"
                      style={{
                        flex: 1,
                        maxWidth: '460px',
                        padding: '0.45rem 0.75rem',
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        color: '#0f172a',
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        outline: 'none',
                        transition: 'border-color 0.15s, box-shadow 0.15s'
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#0284c7'; e.target.style.boxShadow = '0 0 0 3px rgba(2,132,199,0.1)'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                    />

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        padding: '0.35rem 0.55rem'
                      }}
                    >
                      <Clock size={13} color="#64748b" />
                      <input
                        type="text"
                        value={editorTopicDuration}
                        onChange={(e) => { setEditorTopicDuration(e.target.value); setIsSaved(false); }}
                        placeholder="15 mins"
                        style={{
                          width: '65px',
                          background: 'transparent',
                          border: 'none',
                          color: '#334155',
                          fontSize: '0.78rem',
                          outline: 'none',
                          fontWeight: 500
                        }}
                        title="Estimated lesson duration"
                      />
                    </div>
                  </div>

                  {/* Actions & Save Status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {isSaved ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#10b981', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        <Check size={13} /> Saved
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#f59e0b', background: '#fef3c7', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        ● Unsaved
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={handleCancelEdits}
                      style={{
                        padding: '0.42rem 0.85rem',
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        color: '#0284c7',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveCurrentTopic}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.45rem 1.15rem',
                        background: '#0284c7',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(2,132,199,0.25)',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#0369a1'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#0284c7'}
                    >
                      <Save size={14} /> Update Lesson
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#64748b' }}>
                  <Info size={12} color="#94a3b8" />
                  <span>Lesson titles are displayed publicly wherever required.</span>
                </div>
              </div>

              {/* Lesson Content Header: Add Media + Template + [Visual | Text | Split] Tabs */}
              <div
                style={{
                  padding: '0.45rem 1.5rem',
                  background: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  flexShrink: 0
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1e293b' }}>
                    Lesson Content
                  </span>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '2px 7px',
                      border: '1px solid #ef4444',
                      borderRadius: '4px',
                      color: '#0284c7',
                      background: '#f0f9ff',
                      fontSize: '0.74rem',
                      fontWeight: 600
                    }}
                  >
                    <Edit3 size={11} color="#0284c7" /> WP Editor
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowMediaModal(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: '#ffffff',
                      border: '1px solid #0284c7',
                      color: '#0284c7',
                      borderRadius: '5px',
                      padding: '0.32rem 0.65rem',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 1px 2px rgba(2, 132, 199, 0.08)'
                    }}
                    title="Upload or insert image/diagram into lesson"
                  >
                    <ImageIcon size={13} color="#0284c7" /> Add Media
                  </button>

                  <button
                    type="button"
                    onClick={insertTamilEnglishTemplate}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      color: '#15803d',
                      borderRadius: '5px',
                      padding: '0.32rem 0.65rem',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    title="Insert English & தமிழ் dual-explanation template"
                  >
                    <Globe size={12} /> + தமிழ் & English Template
                  </button>
                </div>

                {/* View Mode Tabs (Visual | Text | Split) */}
                <div
                  style={{
                    display: 'flex',
                    background: '#e2e8f0',
                    borderRadius: '6px',
                    padding: '2px',
                    border: '1px solid #cbd5e1'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setViewMode('visual')}
                    style={{
                      padding: '3px 12px',
                      background: viewMode === 'visual' ? '#ffffff' : 'transparent',
                      color: viewMode === 'visual' ? '#0284c7' : '#64748b',
                      border: viewMode === 'visual' ? '1px solid #cbd5e1' : 'none',
                      borderRadius: '4px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: viewMode === 'visual' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    Visual
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('text')}
                    style={{
                      padding: '3px 12px',
                      background: viewMode === 'text' ? '#ffffff' : 'transparent',
                      color: viewMode === 'text' ? '#0284c7' : '#64748b',
                      border: viewMode === 'text' ? '1px solid #cbd5e1' : 'none',
                      borderRadius: '4px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: viewMode === 'text' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    Text
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('split')}
                    style={{
                      padding: '3px 12px',
                      background: viewMode === 'split' ? '#ffffff' : 'transparent',
                      color: viewMode === 'split' ? '#0284c7' : '#64748b',
                      border: viewMode === 'split' ? '1px solid #cbd5e1' : 'none',
                      borderRadius: '4px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: viewMode === 'split' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    Split
                  </button>
                </div>
              </div>

              {/* WP-Style Rich Text Formatting Toolbar */}
              <div
                style={{
                  background: '#ffffff',
                  borderBottom: '1px solid #e2e8f0',
                  padding: '0.38rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  flexWrap: 'wrap',
                  flexShrink: 0
                }}
              >
                <select
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'h1') insertFormatting('# ', '', 'Heading 1');
                    if (val === 'h2') insertFormatting('## ', '', 'Heading 2');
                    if (val === 'h3') insertFormatting('### ', '', 'Heading 3');
                    e.target.value = 'p';
                  }}
                  defaultValue="p"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    padding: '3px 6px',
                    fontSize: '0.75rem',
                    color: '#334155',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="p">Paragraph</option>
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                </select>

                <div style={{ width: '1px', height: '16px', background: '#cbd5e1', margin: '0 3px' }} />

                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**', 'bold text')}
                  style={wpToolbarBtnStyle}
                  title="Bold (Ctrl+B)"
                >
                  <Bold size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*', 'italic text')}
                  style={wpToolbarBtnStyle}
                  title="Italic (Ctrl+I)"
                >
                  <Italic size={13} />
                </button>

                <div style={{ width: '1px', height: '16px', background: '#cbd5e1', margin: '0 3px' }} />

                <button
                  type="button"
                  onClick={() => insertFormatting('- ', '', 'List item')}
                  style={wpToolbarBtnStyle}
                  title="Bullet List"
                >
                  <List size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('1. ', '', 'Numbered item')}
                  style={wpToolbarBtnStyle}
                  title="Numbered List"
                >
                  <ListOrdered size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('> 💡 **Key Takeaway**: ', '', 'Important note or takeaway')}
                  style={wpToolbarBtnStyle}
                  title="Blockquote / Callout"
                >
                  <Quote size={13} />
                </button>
                <button
                  type="button"
                  onClick={insertTableTemplate}
                  style={wpToolbarBtnStyle}
                  title="Insert Table"
                >
                  <Table size={13} />
                </button>

                <div style={{ width: '1px', height: '16px', background: '#cbd5e1', margin: '0 3px' }} />

                <button
                  type="button"
                  onClick={() => insertFormatting('`', '`', 'code')}
                  style={wpToolbarBtnStyle}
                  title="Inline Code"
                >
                  <Code size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('```javascript\n', '\n```', '// Your code here')}
                  style={{ ...wpToolbarBtnStyle, fontFamily: 'monospace' }}
                  title="Code Block"
                >
                  {'{;}'}
                </button>
              </div>

              {/* Full-Height Seamless Split Workspace Canvas */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  minHeight: 0,
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                {/* Textarea Editor Pane */}
                {(viewMode === 'text' || viewMode === 'split') && (
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      minHeight: 0,
                      borderRight: viewMode === 'split' ? '1px solid #e2e8f0' : 'none',
                      background: '#ffffff',
                      overflow: 'hidden'
                    }}
                  >
                    <textarea
                      ref={textareaRef}
                      value={editorContent}
                      onChange={(e) => { setEditorContent(e.target.value); setIsSaved(false); }}
                      placeholder="Write your topic lesson here using Markdown... You can include headings, tables, Tamil translations, and code blocks."
                      style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        padding: '1.25rem 1.5rem',
                        background: '#ffffff',
                        border: 'none',
                        color: '#0f172a',
                        fontSize: '0.92rem',
                        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                        lineHeight: 1.75,
                        resize: 'none',
                        outline: 'none',
                        overflowY: 'auto',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                )}

                {/* Rendered Visual Preview Pane */}
                {(viewMode === 'visual' || viewMode === 'split') && (
                  <div
                    style={{
                      flex: 1,
                      height: '100%',
                      minHeight: 0,
                      padding: '1.5rem 2.25rem',
                      background: '#fafbfc',
                      overflowY: 'auto',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                      <MarkdownRenderer content={editorContent} theme="light" />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Helper Info Strip */}
              <div
                style={{
                  height: '32px',
                  borderTop: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  padding: '0 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                  fontSize: '0.74rem',
                  color: '#64748b'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Info size={12} color="#94a3b8" />
                  <span>The idea of a summary is a short text to prepare students for the activities within the topic or week.</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                  Ctrl+S to save
                </span>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Create New Course (Light Mode) */}
      {showCourseModal && (
        <div style={modalBackdropStyle}>
          <div style={modalBoxStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.18rem', color: '#0f172a', fontWeight: 700 }}>Add New Course</h3>
              <button
                onClick={() => setShowCourseModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
              >
                <X size={18} />
              </button>
            </div>
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

      {/* Modal: Create New Module (Light Mode) */}
      {showModuleModal && (
        <div style={modalBackdropStyle}>
          <div style={modalBoxStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.18rem', color: '#0f172a', fontWeight: 700 }}>Add New Module</h3>
              <button
                onClick={() => setShowModuleModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
              >
                <X size={18} />
              </button>
            </div>
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

      {/* Modal: Create New Topic (Light Mode) */}
      {showTopicModal && (
        <div style={modalBackdropStyle}>
          <div style={modalBoxStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.18rem', color: '#0f172a', fontWeight: 700 }}>Add New Lesson</h3>
              <button
                onClick={() => setShowTopicModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateTopic}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Lesson Name *</label>
                <input
                  type="text"
                  required
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="e.g. Lesson 1: Introduction to APIs"
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
                  Add Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Interactive Add Media & Diagrams */}
      {showMediaModal && (
        <div style={modalBackdropStyle}>
          <div style={{ ...modalBoxStyle, maxWidth: '620px', padding: '1.75rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                  <ImageIcon size={18} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.18rem', color: '#0f172a', fontWeight: 700 }}>
                    Add Media & Diagrams
                  </h3>
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                    Insert images, diagrams, or flowcharts directly into this lesson
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowMediaModal(false);
                  setMediaPreview('');
                  setMediaUrl('');
                  setMediaAlt('');
                }}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Tabs: Upload | URL | Presets */}
            <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { id: 'upload', label: '📁 Upload File', icon: Upload },
                { id: 'url', label: '🔗 Image URL', icon: Globe },
                { id: 'presets', label: '🏛️ Tech Presets', icon: Layers }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMediaTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: mediaTab === tab.id ? 700 : 500,
                    cursor: 'pointer',
                    background: mediaTab === tab.id ? '#0284c7' : '#f1f5f9',
                    color: mediaTab === tab.id ? '#ffffff' : '#475569',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <tab.icon size={14} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB 1: Upload from local disk */}
            {mediaTab === 'upload' && (
              <div>
                <input
                  type="file"
                  ref={mediaFileInputRef}
                  accept="image/*"
                  onChange={handleMediaFileUpload}
                  style={{ display: 'none' }}
                />

                <div
                  onClick={() => mediaFileInputRef.current?.click()}
                  style={{
                    border: '2px dashed #93c5fd',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    background: '#f8fafc',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f0f9ff'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}
                >
                  {mediaPreview ? (
                    <div>
                      <img
                        src={mediaPreview}
                        alt="Preview"
                        style={{ maxHeight: '150px', maxWidth: '100%', borderRadius: '6px', objectFit: 'contain', marginBottom: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                      />
                      <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600 }}>
                        Click to change image
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#e0f2fe', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', marginBottom: '0.5rem' }}>
                        <Upload size={22} />
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                        Click to upload an image from your computer
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                        Supports PNG, JPG, SVG, WebP, GIF (auto-converts to embeddable media)
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>Image Caption / Alt Text</label>
                  <input
                    type="text"
                    value={mediaAlt}
                    onChange={(e) => setMediaAlt(e.target.value)}
                    placeholder="e.g. Figure 1: System Component Architecture"
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowMediaModal(false)}
                    style={cancelBtnStyle}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!mediaPreview}
                    onClick={() => handleInsertMedia()}
                    style={{
                      ...primaryBtnStyle,
                      opacity: mediaPreview ? 1 : 0.5,
                      cursor: mediaPreview ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Insert into Lesson
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Image URL */}
            {mediaTab === 'url' && (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Image URL *</label>
                  <input
                    type="url"
                    value={mediaUrl}
                    onChange={(e) => {
                      setMediaUrl(e.target.value);
                      setMediaPreview(e.target.value);
                    }}
                    placeholder="https://example.com/images/architecture.png"
                    style={inputStyle}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Image Caption / Alt Text</label>
                  <input
                    type="text"
                    value={mediaAlt}
                    onChange={(e) => setMediaAlt(e.target.value)}
                    placeholder="e.g. Relational Database Flowchart"
                    style={inputStyle}
                  />
                </div>

                {mediaPreview && (
                  <div style={{ marginBottom: '1.25rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: 600 }}>Live Image Preview</div>
                    <img
                      src={mediaPreview}
                      alt="Preview"
                      onError={() => {}}
                      style={{ maxHeight: '140px', maxWidth: '100%', borderRadius: '6px', objectFit: 'contain' }}
                    />
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowMediaModal(false)}
                    style={cancelBtnStyle}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!mediaUrl.trim()}
                    onClick={() => handleInsertMedia()}
                    style={{
                      ...primaryBtnStyle,
                      opacity: mediaUrl.trim() ? 1 : 0.5,
                      cursor: mediaUrl.trim() ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Insert into Lesson
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Tech Presets */}
            {mediaTab === 'presets' && (
              <div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.85rem' }}>
                  Select from pre-curated high-resolution technical diagrams for this course:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', maxHeight: '320px', overflowY: 'auto', paddingRight: '4px', marginBottom: '1.25rem' }}>
                  {PRESET_MEDIA.map((preset, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        background: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '8px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#0284c7'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(2, 132, 199, 0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ height: '90px', borderRadius: '6px', overflow: 'hidden', background: '#f1f5f9' }}>
                        <img
                          src={preset.url}
                          alt={preset.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{preset.title}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.4, marginTop: '2px' }}>{preset.desc}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleInsertMedia(preset.url, preset.alt)}
                        style={{
                          width: '100%',
                          border: 'none',
                          background: '#e0f2fe',
                          color: '#0369a1',
                          padding: '0.4rem',
                          borderRadius: '5px',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px'
                        }}
                      >
                        <Check size={12} /> Insert Diagram
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowMediaModal(false)}
                    style={cancelBtnStyle}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Pre-curated Architecture & Technical Diagrams
const PRESET_MEDIA = [
  {
    title: 'Client-Server Architecture',
    alt: 'Client-Server Architecture Diagram',
    desc: 'Frontend browser requests connecting through API gateway to backend servers & DB',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop'
  },
  {
    title: 'Full Stack Web Flow',
    alt: 'Full Stack Web Application Workflow',
    desc: 'UI React layer communicating via RESTful endpoints to Node / Python runtime',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop'
  },
  {
    title: 'Relational Database Schema',
    alt: 'Relational Database Schema Diagram',
    desc: 'Structured tables, primary keys, foreign keys and entity-relationship mapping',
    url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900&auto=format&fit=crop'
  },
  {
    title: 'Cloud & API Integration',
    alt: 'Cloud & API Microservices Diagram',
    desc: 'Microservices architecture with serverless functions and real-time pub/sub',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop'
  }
];

// Light Mode Styles
const wpToolbarBtnStyle = {
  background: '#ffffff',
  border: '1px solid #cbd5e1',
  color: '#475569',
  padding: '4px 7px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const modalBackdropStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(15, 23, 42, 0.45)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '1rem'
};

const modalBoxStyle = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '1.75rem',
  width: '100%',
  maxWidth: '460px',
  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: 600,
  color: '#334155',
  marginBottom: '0.35rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.8rem',
  background: '#ffffff',
  border: '1px solid #cbd5e1',
  borderRadius: '6px',
  color: '#0f172a',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const cancelBtnStyle = {
  padding: '0.5rem 1rem',
  background: '#ffffff',
  border: '1px solid #cbd5e1',
  color: '#475569',
  borderRadius: '6px',
  fontSize: '0.85rem',
  fontWeight: 500,
  cursor: 'pointer'
};

const primaryBtnStyle = {
  padding: '0.5rem 1.25rem',
  background: '#0284c7',
  border: 'none',
  color: '#ffffff',
  borderRadius: '6px',
  fontSize: '0.85rem',
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 2px 6px rgba(2,132,199,0.3)'
};
