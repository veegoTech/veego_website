// Student Dashboard — Premium Glassmorphism UI
const currentUser = JSON.parse(sessionStorage.getItem('alphafly_currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
} else {
    // Determine the default student to track if staff
    if ((currentUser.role === 'staff' || currentUser.role === 'admin') && !window.viewingStudentUsername) {
        const students = window.LocalDB.getAllStudents();
        window.viewingStudentUsername = students.length > 0 ? students[0].username : currentUser.username;
    } else if (!window.viewingStudentUsername) {
        window.viewingStudentUsername = currentUser.username;
    }

    // Switch student dynamically
    window.switchStudent = function(username) {
        window.viewingStudentUsername = username;
        window.renderDashboard();
    };

    const userProgress = () => window.LocalDB.getProgress(window.viewingStudentUsername);
    const getTrackProgress = () => {
        const assignments = window.LocalDB.getAssignments(window.viewingStudentUsername);
        const prog = assignments[window.activeTrack] ? assignments[window.activeTrack].progress : null;
        return {
            completedLessons: (prog && prog.completedLessons) ? prog.completedLessons : [],
            xp: (prog && prog.xp) ? prog.xp : 0,
            badges: (prog && prog.badges) ? prog.badges : []
        };
    };
    
    window.LocalDB.updateLoginStreak(currentUser.username);

    const mainContent = document.getElementById('mainContent');

    // Sidebar user info
    const avatarEl = document.getElementById('user-avatar');
    const nameEl = document.getElementById('user-name');
    const roleEl = document.getElementById('user-role-label');
    
    if (avatarEl) avatarEl.src = currentUser.avatar || 'https://via.placeholder.com/150';
    if (nameEl) nameEl.innerText = currentUser.name.split(' ')[0];
    if (roleEl) roleEl.innerText = currentUser.role === 'staff' || currentUser.role === 'admin' ? 'Staff Level 1' : 'Student Level 1';

    // Staff Mode Toggle Logic
    window.isStaffModeOn = false; // Default to Student Mode
    
    // Show toggle ONLY for staff and admin
    const toggleContainer = document.getElementById('staffModeToggleContainer');
    if (toggleContainer) {
        if (currentUser.role === 'staff' || currentUser.role === 'admin') {
            toggleContainer.classList.remove('hidden');
            toggleContainer.classList.add('flex');
            
            // Sync initial UI state (Knob left, grey background)
            const knob = document.getElementById('staffModeToggleKnob');
            const btn = document.getElementById('staffModeToggleBtn');
            const label = document.getElementById('staffModeLabel');
            
            if (knob && btn && label) {
                knob.classList.replace('translate-x-5', 'translate-x-0');
                btn.classList.replace('bg-indigo-500', 'bg-slate-300');
                label.innerText = 'Student Mode';
                label.classList.replace('text-indigo-700', 'text-slate-500');
            }
        } else {
            toggleContainer.classList.remove('flex');
            toggleContainer.classList.add('hidden');
        }
    }

    window.toggleStaffMode = () => {
        // "this toggle access should handle by staff only"
        if (currentUser.role !== 'staff' && currentUser.role !== 'admin') {
            alert('Access Denied: This toggle can only be used by Staff members.');
            return;
        }

        window.isStaffModeOn = !window.isStaffModeOn;
        const knob = document.getElementById('staffModeToggleKnob');
        const btn = document.getElementById('staffModeToggleBtn');
        const label = document.getElementById('staffModeLabel');
        
        if (window.isStaffModeOn) {
            knob.classList.replace('translate-x-0', 'translate-x-5');
            btn.classList.replace('bg-slate-300', 'bg-indigo-500');
            if (label) {
                label.innerText = 'Staff Mode';
                label.classList.replace('text-slate-500', 'text-indigo-700');
            }
        } else {
            knob.classList.replace('translate-x-5', 'translate-x-0');
            btn.classList.replace('bg-indigo-500', 'bg-slate-300');
            if (label) {
                label.innerText = 'Student Mode';
                label.classList.replace('text-indigo-700', 'text-slate-500');
            }
        }

        // Re-render current view
        if (window.currentActiveView) {
            window.showView(window.currentActiveView, window.currentActiveParams);
        }
    };

    // ─────────────────── UI UPDATE HELPERS ───────────────────
    const updateSidebarProgress = () => {
        const globalProgress = userProgress();
        const trackProgress = getTrackProgress();
        const isPro = window.activeTrack === 'pro';
        const totalLessons = isPro ? 16 : 45;
        
        const completedCount = trackProgress.completedLessons ? trackProgress.completedLessons.length : 0;
        const progressPercent = Math.round((completedCount / totalLessons) * 100);

        const pctTxt = document.getElementById('progressPercentTxt');
        const pBar = document.getElementById('progressBar');
        const sDays = document.getElementById('streakDays');
        const cTxt = document.getElementById('completedDaysTxt');
        const tTxt = document.getElementById('totalDaysTxt');
        const sidebarTrackTitle = document.getElementById('sidebarTrackTitle');

        if (pctTxt) pctTxt.innerText = `${progressPercent}%`;
        if (pBar) pBar.style.width = `${progressPercent}%`;
        if (sDays) sDays.innerText = `${globalProgress.streaks ? globalProgress.streaks.daily || 0 : 0} Days`;
        if (cTxt) cTxt.innerText = completedCount;
        if (tTxt) tTxt.innerText = totalLessons;
        if (sidebarTrackTitle) {
            const trackNames = { level1: 'Level 1 SPOKO', level2: 'Level 2 SPOKO', level3: 'Level 3 SPOKO', pro: 'Professional Track' };
            sidebarTrackTitle.innerText = trackNames[window.activeTrack] || 'AlphaFly SPOKO';
        }
    };

    const renderSidebarNav = (currentDay) => {
        const nav = document.getElementById('courseNav');
        if (!nav) return;

        const globalProgress = userProgress();
        const assignments = window.LocalDB.getAssignments(window.viewingStudentUsername);
        const activeCourses = Object.keys(assignments);
        
        if (activeCourses.length === 0) {
            window.activeTrack = null;
        } else if (!window.activeTrack || !activeCourses.includes(window.activeTrack)) {
            window.activeTrack = activeCourses[0];
        }

        const trackProgress = getTrackProgress();
        const maxUnlockedDay = trackProgress.completedLessons.length + 1; 

        let html = `
            <button onclick="showView('dashboard')" class="w-full text-left px-4 py-3 rounded-xl mb-2 flex items-center gap-3 font-medium transition-all duration-300 ${currentDay === 'dashboard' ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-indigo-400 border border-indigo-500/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}">
                <i data-lucide="layout-dashboard" class="w-5 h-5"></i> Dashboard
            </button>
            ${(currentUser.role === 'admin' || currentUser.role === 'staff') ? `
            <button onclick="showView('management')" class="w-full text-left px-4 py-3 rounded-xl mb-4 flex items-center gap-3 font-medium transition-all duration-300 ${currentDay === 'management' ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-indigo-400 border border-indigo-500/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}">
                <i data-lucide="users" class="w-5 h-5"></i> User Management
            </button>
            ` : '<div class="mb-4"></div>'}
            
            <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-4">Learning Tracks</h3>
            <div class="px-3 mb-6">
                ${activeCourses.length === 0 ? `
                    <div class="text-xs text-rose-400 p-2 bg-rose-500/10 rounded-lg text-center font-bold">No Courses Assigned</div>
                ` : `
                    <select onchange="window.switchTrack(this.value)" class="w-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg px-3 py-2 outline-none cursor-pointer focus:border-indigo-500 transition-all shadow-sm appearance-none">
                        ${activeCourses.includes('level1') ? `<option value="level1" ${window.activeTrack === 'level1' ? 'selected' : ''}>Level 1: Foundation (45 Days)</option>` : ''}
                        ${activeCourses.includes('level2') ? `<option value="level2" ${window.activeTrack === 'level2' ? 'selected' : ''}>Level 2: Intermediate</option>` : ''}
                        ${activeCourses.includes('level3') ? `<option value="level3" ${window.activeTrack === 'level3' ? 'selected' : ''}>Level 3: Advanced</option>` : ''}
                        ${activeCourses.includes('pro') ? `<option value="pro" ${window.activeTrack === 'pro' ? 'selected' : ''}>Professional Track</option>` : ''}
                    </select>
                `}
            </div>
            
            <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-4">Modules</h3>
        `;

        if (!window.activeTrack) {
            html += `<p class="text-xs text-slate-500 px-4 text-center">No modules available.</p>`;
        } else if (window.activeTrack === 'pro') {
            for (let i = 1; i <= 16; i++) {
                const lessonData = window.proSyllabus ? window.proSyllabus[i] : null;
                const title = lessonData ? lessonData.title : `Pro Topic ${i}`;
                const isCompleted = trackProgress.completedLessons && trackProgress.completedLessons.includes(`pro_${i}`);
                const isPending = globalProgress.pendingValidation ? globalProgress.pendingValidation.includes(`pro_${i}`) : false;
                const isUnlocked = window.isStaffModeOn || i === 1 || (trackProgress.completedLessons && trackProgress.completedLessons.includes(`pro_${i - 1}`));
                const isCurrentView = currentDay === 'pro_' + i;

                let icon = 'lock';
                let colorClass = 'text-slate-600 opacity-50';
                let borderClass = 'border-transparent';
                let action = isUnlocked ? `showView('pro_lesson', {day: ${i}})` : `alert('Complete the previous lesson first.')`;

                if (isCompleted) {
                    icon = 'check-circle';
                    colorClass = 'text-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-300';
                } else if (isPending) {
                    icon = 'clock';
                    colorClass = 'text-amber-400 hover:bg-amber-400/10 hover:text-amber-300';
                    action = `showView('pro_lesson', {day: ${i}})`;
                } else if (isUnlocked) {
                    icon = 'play-circle';
                    colorClass = 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300';
                }

                if (isCurrentView) {
                    colorClass = 'bg-slate-800 text-white shadow-md';
                    borderClass = 'border-l-2 border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-transparent';
                    icon = 'chevron-right';
                }

                html += `
                    <button onclick="${action}" 
                            class="w-full text-left px-4 py-3 rounded-r-xl rounded-l-sm flex items-center justify-between transition-all duration-300 mb-1 ${colorClass} ${borderClass}">
                        <div class="flex items-center gap-3 truncate">
                            <i data-lucide="${icon}" class="w-4 h-4 shrink-0"></i>
                            <span class="font-medium text-sm truncate">${i}. ${title}</span>
                        </div>
                    </button>
                `;
            }
        } else if (window.activeTrack === 'level2' || window.activeTrack === 'level3') {
            html += `
                <div class="px-4 py-8 text-center opacity-50">
                    <i data-lucide="lock" class="w-8 h-8 mx-auto mb-2 text-slate-400"></i>
                    <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Coming Soon</p>
                </div>
            `;
        } else if (window.activeTrack === 'level1') {
            // Level 1 logic
            for (let i = 1; i <= 45; i++) {
                if (i % 5 === 0) {
                    const isGameView = currentDay === 'custom_game';
                    let gameColorClass = 'text-indigo-400 hover:bg-indigo-400/10 hover:text-indigo-300';
                    let gameBorderClass = 'border-transparent';
                    let gameIcon = 'gamepad-2';
                    if (isGameView) {
                        gameColorClass = 'bg-slate-800 text-white shadow-md';
                        gameBorderClass = 'border-l-2 border-indigo-500 bg-gradient-to-r from-indigo-500/10 to-transparent';
                        gameIcon = 'chevron-right';
                    }
                    
                    html += `
                        <button onclick="showView('custom_game')" 
                                class="w-full text-left px-4 py-3 rounded-r-xl rounded-l-sm flex items-center justify-between transition-all duration-300 mb-1 ${gameColorClass} ${gameBorderClass}">
                            <div class="flex items-center gap-3 truncate">
                                <i data-lucide="${gameIcon}" class="w-4 h-4 shrink-0"></i>
                                <span class="font-medium text-sm truncate">Game World ${i / 5}</span>
                            </div>
                        </button>
                    `;
                }

                const isCompleted = trackProgress.completedLessons && trackProgress.completedLessons.includes(`1_${i}`);
                const isPending = globalProgress.pendingValidation ? globalProgress.pendingValidation.includes(`1_${i}`) : false;
                const isUnlocked = window.isStaffModeOn || i <= (globalProgress.currentDay || 1);  
                const isCurrentView = currentDay === i;

                const lessonData = window.getLesson(1, i);
                const title = lessonData ? lessonData.title : `Day ${i}`;

                let icon = 'lock';
                let colorClass = 'text-slate-600 opacity-50';
                let borderClass = 'border-transparent';
                
                let action = isUnlocked ? `showView('lesson', {level: 1, day: ${i}})` : `alert('Complete the previous lesson first.')`;

                if (isCompleted) {
                    icon = 'check-circle';
                    colorClass = 'text-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-300';
                } else if (isPending) {
                    icon = 'clock';
                    colorClass = 'text-amber-400 hover:bg-amber-400/10 hover:text-amber-300';
                    action = `showView('lesson', {level: 1, day: ${i}})`;
                } else if (isUnlocked) {
                    icon = 'play-circle';
                    colorClass = 'text-indigo-400 hover:bg-indigo-400/10 hover:text-indigo-300';
                }

                if (isCurrentView) {
                    colorClass = 'bg-slate-800 text-white shadow-md';
                    borderClass = 'border-l-2 border-indigo-500 bg-gradient-to-r from-indigo-500/10 to-transparent';
                    icon = 'chevron-right';
                }

                if (i % 5 === 0) {
                    const assessmentIndex = i / 5;
                    action = isUnlocked ? `showView('assessment', {id: 'a${assessmentIndex}'})` : `alert('Complete the previous lesson first.')`;
                    
                    if (icon === 'play-circle' || icon === 'lock') {
                        icon = 'award';
                    }
                }

                html += `
                    <button onclick="${action}" 
                            class="w-full text-left px-4 py-3 rounded-r-xl rounded-l-sm flex items-center justify-between transition-all duration-300 mb-1 ${colorClass} ${borderClass}">
                        <div class="flex items-center gap-3 truncate">
                            <i data-lucide="${icon}" class="w-4 h-4 shrink-0"></i>
                            <span class="font-medium text-sm truncate">Day ${i}: ${title}</span>
                        </div>
                    </button>
                `;
            }
        }

        nav.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    };

    // ─────────────────── DASHBOARD VIEW ───────────────────
    window.renderDashboard = () => {
        try {
            const viewingUser = window.LocalDB.getUserByUsername(window.viewingStudentUsername) || currentUser;
        const globalProgress = userProgress();
        const assignments = window.LocalDB.getAssignments(window.viewingStudentUsername);
        
        // Sync activeTrack with first assignment if none selected
        if (!window.activeTrack && Object.keys(assignments).length > 0) {
            window.activeTrack = Object.keys(assignments)[0];
        }

        const trackProgress = getTrackProgress();
        
        const isPro = window.activeTrack === 'pro';
        const trackTotalLessons = isPro ? 16 : (window.activeTrack === 'level2' || window.activeTrack === 'level3' ? 0 : 45);
        const trackCompletedCount = trackProgress.completedLessons ? trackProgress.completedLessons.length : 0;
        
        // XP Gamification math for this track
        const trackXp = trackProgress.xp || 0;
        const xpLevel = Math.floor(trackXp / 500) + 1;
        const xpInCurrentLevel = trackXp % 500;

        updateSidebarProgress();
        renderSidebarNav('dashboard');

        const titleEl = document.getElementById('headerTitle');
        if (titleEl) titleEl.innerHTML = `<div class="p-2 bg-indigo-50 rounded-lg text-indigo-600 hidden sm:block"><i data-lucide="layout-dashboard" class="w-5 h-5"></i></div> <span class="truncate">Dashboard</span>`;
        if (window.lucide) window.lucide.createIcons();

        // Calculate next lesson based on active track
        const isTrackCompleted = trackTotalLessons > 0 && trackCompletedCount >= trackTotalLessons;
        const nextLessonDay = isTrackCompleted ? trackTotalLessons : trackCompletedCount + 1;
        
        const nextLessonData = isPro ? window.proSyllabus[nextLessonDay] : window.getLesson(1, nextLessonDay);
        const nextLessonTitle = isTrackCompleted ? 'Track Completed!' : (nextLessonData ? nextLessonData.title : `Day ${nextLessonDay} Content`);
        const nextLessonObjective = nextLessonData ? (nextLessonData.objective || 'Keep learning!') : 'Keep learning!';
        
        const trackAction = isTrackCompleted ? `showView('dashboard')` : (isPro ? `showView('pro_lesson', {day: ${nextLessonDay}})` : `showView('lesson', {level: 1, day: ${nextLessonDay}})`);
        const btnText = isTrackCompleted ? 'Review Completed Track' : `Start ${isPro ? 'Topic' : 'Day'} ${nextLessonDay}`;
        
        const bannerSubtitle = isPro ? 'Ready to master your professional communication?' : 'Ready to elevate your English journey today?';
        const badgeText = isPro ? 'Professional Track' : 'Alpha Fly Masterclass';

        const badgesHtml = (trackProgress.badges || []).length > 0
            ? trackProgress.badges.map((b, i) => `
                <div class="bg-gradient-to-r from-amber-100 to-yellow-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-float" style="animation-delay: ${Math.random()}s">
                    <i class="fas fa-award"></i> ${b}
                </div>`).join('')
            : '<p class="text-sm text-slate-400 italic">Complete lessons to earn badges!</p>';

        // BUILD LEARNING PATH HTML
        const allCourses = [
            { id: 'level1', name: 'Level 1 - Foundation English', duration: '45 Days' },
            { id: 'level2', name: 'Level 2 - Intermediate English', duration: 'Coming Soon' },
            { id: 'level3', name: 'Level 3 - Advanced English', duration: 'Coming Soon' },
            { id: 'pro', name: 'Professional Track - IT', duration: '16 Days' }
        ];

        const learningPathHtml = `
            <div class="mb-10 animate-fade-in-up" style="animation-delay: 0.1s">
                <h3 class="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
                    <i class="fas fa-route text-indigo-500"></i> My Learning Path
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${allCourses.map(c => {
                        const isAssigned = !!assignments[c.id];
                        if (isAssigned) {
                            const cProg = typeof assignments[c.id] === 'object' && assignments[c.id].progress ? assignments[c.id].progress : {};
                            const cTotal = c.id === 'pro' ? 16 : (c.id.startsWith('level') && c.id !== 'level1' ? 0 : 45);
                            const cComp = cProg.completedLessons ? cProg.completedLessons.length : 0;
                            const pct = cTotal === 0 ? 0 : Math.round((cComp/cTotal)*100);
                            return `
                                <div onclick="window.switchTrack('${c.id}')" class="bg-white border-2 ${window.activeTrack === c.id ? 'border-indigo-500 shadow-md ring-2 ring-indigo-50' : 'border-indigo-100 hover:border-indigo-300'} rounded-2xl p-5 cursor-pointer transition-all relative overflow-hidden group">
                                    <div class="absolute -right-4 -top-4 text-indigo-50 opacity-50 transition-transform group-hover:scale-110"><i class="fas fa-book text-6xl"></i></div>
                                    <div class="relative z-10">
                                        <div class="flex justify-between items-start mb-4">
                                            <div class="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-lg shadow-inner"><i class="fas ${cTotal > 0 && cComp >= cTotal ? 'fa-check-circle text-emerald-500' : 'fa-unlock'}"></i></div>
                                            <span class="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg border border-indigo-100">${pct}%</span>
                                        </div>
                                        <h4 class="font-extrabold text-slate-800 mb-1">${c.name}</h4>
                                        <p class="text-xs text-slate-500 font-medium mb-4">${c.duration}</p>
                                        <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                            <div class="bg-indigo-500 h-full" style="width: ${pct}%"></div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else {
                            return `
                                <div onclick="alert('Access Restricted. Please contact your trainer to unlock this course.')" class="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 cursor-not-allowed opacity-75 hover:opacity-100 transition-all relative overflow-hidden group">
                                    <div class="absolute -right-4 -top-4 text-slate-200 opacity-50"><i class="fas fa-lock text-6xl"></i></div>
                                    <div class="relative z-10">
                                        <div class="w-10 h-10 bg-slate-200 text-slate-500 rounded-xl flex items-center justify-center text-lg mb-4"><i class="fas fa-lock"></i></div>
                                        <h4 class="font-extrabold text-slate-500 mb-1">${c.name}</h4>
                                        <p class="text-xs text-slate-400 font-medium italic">Locked</p>
                                    </div>
                                </div>
                            `;
                        }
                    }).join('')}
                </div>
            </div>
        `;

        mainContent.innerHTML = window.isStaffModeOn ? `
            <div class="animate-fade-in max-w-4xl mx-auto space-y-8 mt-10">
                <div class="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 text-center relative overflow-hidden">
                    <div class="absolute -right-10 -top-10 text-slate-50 opacity-50"><i class="fas fa-book-reader text-[200px]"></i></div>
                    <div class="relative z-10">
                        <div class="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner border border-indigo-100">
                            <i class="fas fa-chalkboard-teacher"></i>
                        </div>
                        <h2 class="text-3xl font-extrabold text-slate-800 mb-2">Digital Teaching Notebook</h2>
                        <p class="text-slate-500 mb-10 max-w-md mx-auto">Select a student from your class to automatically load their syllabus and synchronize the lesson.</p>
                        
                        <div class="max-w-md mx-auto text-left bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-inner">
                            <label class="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 block flex items-center gap-2">
                                <i class="fas fa-user-graduate"></i> Active Student
                            </label>
                            <select onchange="window.switchStudent(this.value)" class="w-full bg-white border border-slate-200 text-slate-800 font-bold rounded-xl px-4 py-3 outline-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all mb-6 shadow-sm">
                                ${window.LocalDB.getAllStudents().map(s => `
                                    <option value="${s.username}" ${s.username === window.viewingStudentUsername ? 'selected' : ''}>
                                        ${s.name} (Level ${s.level || 1})
                                    </option>
                                `).join('')}
                            </select>

                            <button onclick="${trackAction}" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 hover:-translate-y-1">
                                <i class="fas fa-play"></i> Start Teaching ${isPro ? 'Topic' : 'Day'} ${nextLessonDay}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ` : `
            <div class="animate-fade-in max-w-5xl mx-auto space-y-10 mt-4 pb-12">
                <!-- Premium Welcome Banner -->
                <div class="relative bg-slate-900 rounded-[2.5rem] p-8 sm:p-14 shadow-2xl overflow-hidden group">
                    <!-- Animated Background Elements -->
                    <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-purple-600/40 to-fuchsia-500/40 opacity-80 mix-blend-overlay"></div>
                    <div class="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-float"></div>
                    <div class="absolute -bottom-[50%] -right-[10%] w-[70%] h-[150%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-float" style="animation-delay: 2s;"></div>
                    
                    <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div class="flex-1 text-center md:text-left">
                            <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-extrabold tracking-widest text-indigo-200 uppercase mb-6 backdrop-blur-md shadow-lg">
                                <i class="fas fa-crown text-amber-400"></i> ${badgeText}
                            </div>
                            <h2 class="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 drop-shadow-sm">Hello, ${currentUser.name.split(' ')[0]}!</h2>
                            <p class="text-indigo-200/80 text-lg sm:text-xl font-medium tracking-wide">${bannerSubtitle}</p>
                        </div>
                        <div class="relative z-10 shrink-0 w-full md:w-auto">
                            <button onclick="${trackAction}" class="w-full md:w-auto bg-gradient-to-r from-white to-slate-100 text-indigo-900 font-extrabold py-4 px-6 rounded-[1.5rem] transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 sm:gap-4 text-lg sm:text-xl hover:scale-105 hover:shadow-[0_20px_50px_-10px_rgba(255,255,255,0.5)] group/btn relative overflow-hidden">
                                <span class="relative z-10 flex items-center gap-3">
                                    <i data-lucide="${isTrackCompleted ? 'check-circle' : 'play'}" class="w-7 h-7 text-indigo-600 transition-transform group-hover/btn:scale-110"></i> ${btnText}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Premium Stats Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <!-- Streak Card -->
                    <div class="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 group flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 transform group-hover:rotate-12 transition-transform">
                            <i class="fas fa-fire text-3xl"></i>
                        </div>
                        <p class="font-black text-5xl text-slate-800 mb-2 tracking-tight">${globalProgress.streaks ? globalProgress.streaks.daily || 0 : 0}</p>
                        <p class="text-xs text-slate-500 uppercase font-extrabold tracking-[0.2em]">Day Streak</p>
                    </div>

                    <!-- XP Card -->
                    <div class="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 group flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl -ml-10 -mt-10 transition-transform group-hover:scale-150"></div>
                        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30 transform group-hover:rotate-12 transition-transform">
                            <i class="fas fa-star text-3xl"></i>
                        </div>
                        <p class="font-black text-5xl text-slate-800 mb-2 tracking-tight">${trackXp}</p>
                        <p class="text-xs text-slate-500 uppercase font-extrabold tracking-[0.2em]">Course XP</p>
                    </div>

                    <!-- Progress Card -->
                    <div class="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 group flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div class="absolute bottom-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl -mr-10 -mb-10 transition-transform group-hover:scale-150"></div>
                        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 transform group-hover:rotate-12 transition-transform">
                            <i class="fas fa-check-circle text-3xl"></i>
                        </div>
                        <p class="font-black text-5xl text-slate-800 mb-2 tracking-tight">${trackCompletedCount}<span class="text-2xl text-slate-300 font-bold">/${trackTotalLessons}</span></p>
                        <p class="text-xs text-slate-500 uppercase font-extrabold tracking-[0.2em]">Lessons Done</p>
                    </div>

                    <!-- Today Topic Card -->
                    <div class="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 group flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div class="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl -ml-10 -mb-10 transition-transform group-hover:scale-150"></div>
                        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 transform group-hover:rotate-12 transition-transform">
                            <i class="fas fa-book-open text-3xl"></i>
                        </div>
                        <p class="font-extrabold text-2xl text-slate-800 mb-2 tracking-tight truncate w-full px-2" title="${nextLessonTitle}">${nextLessonTitle}</p>
                        <p class="text-xs text-slate-500 uppercase font-extrabold tracking-[0.2em]">Today's Topic</p>
                    </div>
                </div>

                <!-- Learning Path Area -->
                ${learningPathHtml}

            </div>
        `;

        if (window.lucide) window.lucide.createIcons();
        } catch (error) {
            document.getElementById('mainContent').innerHTML = `
                <div class="p-10 text-red-600 bg-red-50 border-2 border-red-200 rounded-xl m-10">
                    <h2 class="text-2xl font-bold mb-4">Dashboard Error</h2>
                    <p class="font-mono bg-white p-4 rounded shadow text-sm overflow-auto whitespace-pre-wrap">${error.message}\n${error.stack}</p>
                </div>
            `;
            console.error(error);
        }
    };

    // ─────────────────── NAVIGATION HANDLER ───────────────────
    window.showView = (viewName, params = {}) => {
        window.currentActiveView = viewName;
        window.currentActiveParams = params;
        
        if (window.innerWidth < 640) {
            const sidebar = document.getElementById('app-sidebar');
            if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
                window.toggleSidebar();
            }
        }

        if (viewName === 'dashboard') {
            window.renderDashboard();
        } else if (viewName === 'lesson') {
            updateSidebarProgress();
            renderSidebarNav(params.day);
            const titleEl = document.getElementById('headerTitle');
            const lessonData = window.getLesson(params.level, params.day);
            if (titleEl && lessonData) {
                titleEl.innerHTML = `<div class="p-2 bg-indigo-50 rounded-lg text-indigo-600 hidden sm:block"><i data-lucide="book-open" class="w-5 h-5"></i></div> <span class="truncate">Day ${params.day}: ${lessonData.title}</span>`;
            }

            if (typeof window.renderLesson === 'function') {
                window.renderLesson(params.level, params.day, mainContent);
            } else {
                mainContent.innerHTML = '<div class="p-10 text-red-500">Error loading lesson. Please refresh.</div>';
            }
        } else if (viewName === 'game') {
            if (typeof window.renderGame === 'function') {
                window.renderGame(params.level, params.day, mainContent, params.type);
            }
        } else if (viewName === 'quiz') {
            if (typeof window.renderQuiz === 'function') {
                window.renderQuiz(params.level, params.day, mainContent);
            }
        } else if (viewName === 'assessment') {
            const titleEl = document.getElementById('headerTitle');
            if (titleEl) {
                titleEl.innerHTML = `<div class="p-2 bg-amber-50 rounded-lg text-amber-600 hidden sm:block"><i data-lucide="award" class="w-5 h-5"></i></div> <span class="truncate">Weekly Assessment</span>`;
            }
            if (typeof window.renderAssessmentIntro === 'function') {
                window.renderAssessmentIntro(params.id, mainContent);
            } else {
                mainContent.innerHTML = '<div class="p-10 text-red-500">Assessment engine not loaded. Please refresh.</div>';
            }
        } else if (viewName === 'custom_game') {
            updateSidebarProgress();
            renderSidebarNav('custom_game');
            const progress = userProgress();
            const maxDay = progress.completedLessons.filter(l => l.startsWith('1_')).length + 1;
            const titleEl = document.getElementById('headerTitle');
            if (titleEl) {
                titleEl.innerHTML = `<div class="p-2 bg-indigo-50 rounded-lg text-indigo-600 hidden sm:block"><i data-lucide="gamepad-2" class="w-5 h-5"></i></div> <span class="truncate">Game</span>`;
            }
            mainContent.innerHTML = '<iframe src="game_app/index.html?v=' + Date.now() + '&unlockedDay=' + maxDay + '" class="w-full h-[calc(100vh-140px)] min-h-[700px] border-0 rounded-2xl shadow-lg bg-white" style="display: block;"></iframe>';
        } else if (viewName === 'pro_lesson') {
            updateSidebarProgress();
            renderSidebarNav('pro_' + params.day);
            if (typeof window.renderProLesson === 'function') {
                window.renderProLesson(params.day);
            } else {
                mainContent.innerHTML = '<div class="p-10 text-red-500">Pro Lesson engine not loaded. Please refresh.</div>';
            }
        } else if (viewName === 'management') {
            const titleEl = document.getElementById('headerTitle');
            if (titleEl) {
                titleEl.innerHTML = `<div class="p-2 bg-purple-50 rounded-lg text-purple-600 hidden sm:block"><i data-lucide="users" class="w-5 h-5"></i></div> <span class="truncate">User Management</span>`;
            }
            if (typeof window.renderManagement === 'function') {
                window.renderManagement(mainContent);
            } else {
                mainContent.innerHTML = '<div class="p-10 text-red-500">Management script not loaded. Please refresh.</div>';
            }
        }
        if (window.lucide) window.lucide.createIcons();
    };

    window.switchTrack = (track) => {
        window.activeTrack = track;
        renderSidebarNav('dashboard');
    };

    // Initial Render
    window.renderDashboard();
}
