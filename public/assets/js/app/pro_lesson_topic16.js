window.renderTeamworkModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-teal-50 rounded-lg text-teal-600 hidden sm:block"><i data-lucide="users" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: Team Management</span>`;
    }

    let progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    let isCompleted = progress.completedLessons && progress.completedLessons.includes(`pro_${day}`);

    let html = `
        <div class="animate-fade-in mx-auto space-y-12 pb-20 bg-slate-50 min-h-screen">
            
            <!-- HEADER -->
            <div class="relative bg-gradient-to-r from-teal-600 to-emerald-700 rounded-b-3xl sm:rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden text-white mb-8 mx-auto max-w-6xl mt-4">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8">
                        <div class="w-20 sm:w-24 h-20 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0 shadow-inner">
                            <i data-lucide="users" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-teal-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">Team Management</h1>
                            <p class="text-teal-50 text-lg max-w-2xl">Learn how to communicate, collaborate, and take accountability within a high-performing software development team.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4 space-y-8" id="teamwork-sim-container">
                
                <!-- Navigation Tabs -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap gap-2 mb-6">
                    <button onclick="window.switchTeamTab('roles')" id="tab-roles" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-teal-50 text-teal-700 border border-teal-100 shadow-sm">
                        <i data-lucide="network" class="w-5 h-5"></i> Who Does What?
                    </button>
                    <button onclick="window.switchTeamTab('collab')" id="tab-collab" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="git-merge" class="w-5 h-5"></i> Collaboration Hub
                    </button>
                    <button onclick="window.switchTeamTab('coach')" id="tab-coach" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="bot" class="w-5 h-5"></i> AI Teamwork Coach
                    </button>
                </div>

                <!-- Phase 1: Roles Mapping -->
                <div id="view-roles" class="team-view block animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[500px]">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                                    <div class="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><i data-lucide="users-2"></i></div>
                                    The IT Project Team
                                </h2>
                                <p class="text-slate-600 mt-2">Select a Role on the left, then select its matching Responsibility on the right.</p>
                            </div>
                            <div class="bg-slate-100 px-4 py-2 rounded-xl text-slate-700 font-bold border border-slate-200 shadow-inner flex items-center gap-2">
                                Score: <span id="twScore" class="text-teal-600">0/4</span>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative" id="twMatchGrid">
                            
                            <!-- Roles (Left) -->
                            <div class="space-y-3" id="twRoles">
                                <button onclick="window.twSelectRole('scrum', this)" class="tw-role-btn w-full p-4 bg-white border-2 border-slate-200 rounded-xl text-left font-bold text-slate-700 hover:border-teal-400 transition-colors flex items-center justify-between group">
                                    <div class="flex items-center gap-3"><i data-lucide="calendar-clock" class="text-slate-400 group-hover:text-teal-500"></i> Scrum Master</div>
                                </button>
                                <button onclick="window.twSelectRole('devops', this)" class="tw-role-btn w-full p-4 bg-white border-2 border-slate-200 rounded-xl text-left font-bold text-slate-700 hover:border-teal-400 transition-colors flex items-center justify-between group">
                                    <div class="flex items-center gap-3"><i data-lucide="server" class="text-slate-400 group-hover:text-teal-500"></i> DevOps Engineer</div>
                                </button>
                                <button onclick="window.twSelectRole('qa', this)" class="tw-role-btn w-full p-4 bg-white border-2 border-slate-200 rounded-xl text-left font-bold text-slate-700 hover:border-teal-400 transition-colors flex items-center justify-between group">
                                    <div class="flex items-center gap-3"><i data-lucide="bug" class="text-slate-400 group-hover:text-teal-500"></i> QA / Test Engineer</div>
                                </button>
                                <button onclick="window.twSelectRole('ba', this)" class="tw-role-btn w-full p-4 bg-white border-2 border-slate-200 rounded-xl text-left font-bold text-slate-700 hover:border-teal-400 transition-colors flex items-center justify-between group">
                                    <div class="flex items-center gap-3"><i data-lucide="file-text" class="text-slate-400 group-hover:text-teal-500"></i> Business Analyst</div>
                                </button>
                            </div>

                            <!-- Responsibilities (Right) -->
                            <div class="space-y-3" id="twResp">
                                <button onclick="window.twSelectResp('ba', this)" class="tw-resp-btn w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-left text-sm text-slate-600 hover:border-teal-400 transition-colors relative overflow-hidden">
                                    <span class="relative z-10">Gathers requirements from the client and translates them into technical documentation for the developers.</span>
                                </button>
                                <button onclick="window.twSelectResp('qa', this)" class="tw-resp-btn w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-left text-sm text-slate-600 hover:border-teal-400 transition-colors relative overflow-hidden">
                                    <span class="relative z-10">Finds bugs, writes automated test scripts, and ensures the code meets quality standards before release.</span>
                                </button>
                                <button onclick="window.twSelectResp('scrum', this)" class="tw-resp-btn w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-left text-sm text-slate-600 hover:border-teal-400 transition-colors relative overflow-hidden">
                                    <span class="relative z-10">Facilitates daily meetings, removes blockers for the developers, and ensures Agile processes are followed.</span>
                                </button>
                                <button onclick="window.twSelectResp('devops', this)" class="tw-resp-btn w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-left text-sm text-slate-600 hover:border-teal-400 transition-colors relative overflow-hidden">
                                    <span class="relative z-10">Manages cloud infrastructure, creates CI/CD pipelines, and ensures smooth automated deployments.</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Phase 2: Collaboration Scenarios -->
                <div id="view-collab" class="team-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 p-8 flex flex-col items-center justify-center min-h-[500px]">
                        
                        <div id="collabContent" class="w-full max-w-2xl">
                            <div class="mb-8">
                                <div class="inline-flex items-center justify-center p-3 bg-indigo-900/50 text-indigo-400 rounded-full mb-4 border border-indigo-500/30">
                                    <i data-lucide="users" class="w-8 h-8"></i>
                                </div>
                                <h2 class="text-2xl font-bold text-white mb-2">The Collaboration Dilemma</h2>
                                <p class="text-slate-400" id="collabScenarioText">You've been assigned a complex API integration. You've been stuck on a confusing error message for 4 hours. You are making zero progress. What is the best team behavior?</p>
                            </div>

                            <div class="space-y-4" id="collabOptions">
                                <button onclick="window.collabSelect('isolate')" class="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-rose-500 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4">
                                    <div class="w-6 h-6 rounded bg-slate-900 flex items-center justify-center shrink-0 font-bold text-xs text-rose-400 mt-0.5">A</div>
                                    <div>Keep struggling in isolation. You don't want to look incompetent to the senior developers by asking for help.</div>
                                </button>
                                <button onclick="window.collabSelect('complain')" class="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-rose-500 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4">
                                    <div class="w-6 h-6 rounded bg-slate-900 flex items-center justify-center shrink-0 font-bold text-xs text-rose-400 mt-0.5">B</div>
                                    <div>Post in the general Slack channel complaining that the API documentation is terrible and it's impossible to fix.</div>
                                </button>
                                <button onclick="window.collabSelect('pair')" class="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4">
                                    <div class="w-6 h-6 rounded bg-slate-900 flex items-center justify-center shrink-0 font-bold text-xs text-emerald-400 mt-0.5">C</div>
                                    <div>Summarize what you've tried so far, post it in the team channel, and ask if a senior developer has 15 minutes for a pair-programming session.</div>
                                </button>
                            </div>
                        </div>

                        <div id="collabFeedback" class="hidden w-full max-w-2xl mt-4">
                            <!-- Injected by JS -->
                        </div>

                    </div>
                </div>

                <!-- Phase 3: AI Teamwork Coach -->
                <div id="view-coach" class="team-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
                        
                        <!-- Left: Scenario and Writing Area -->
                        <div class="flex-1 min-w-0 flex flex-col">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                    <i data-lucide="bot" class="w-5 h-5 text-teal-500"></i> AI Teamwork Coach
                                </h2>
                                <select id="teamScenarioSelect" class="bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2 outline-none font-medium w-full sm:w-auto" onchange="window.loadTeamScenario()">
                                    <option value="review">Scenario 1: The Constructive Code Review</option>
                                    <option value="standup">Scenario 2: The Daily Stand-up Blocker</option>
                                </select>
                            </div>
                            
                            <div class="bg-slate-800 rounded-xl p-4 sm:p-5 mb-4 border border-slate-700 relative overflow-hidden">
                                <div class="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Collaboration Challenge</h3>
                                <p id="teamScenarioContext" class="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                                    A teammate submitted a Pull Request (PR) containing code that is very messy and missing unit tests. Draft a code review comment that is constructive and helpful, not toxic.
                                </p>
                            </div>

                            <!-- Editor -->
                            <div class="flex-1 flex flex-col border border-slate-700 rounded-xl overflow-hidden focus-within:border-teal-500 transition-colors bg-slate-800 shadow-sm min-h-[220px]">
                                <textarea id="teamDraftBody" class="flex-1 p-3 sm:p-4 outline-none resize-none text-xs sm:text-sm text-slate-200 leading-relaxed font-mono min-h-[140px] bg-transparent" placeholder="Draft your professional response..."></textarea>
                                
                                <div class="bg-slate-900 border-t border-slate-700 p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <button onclick="window.evaluateTeamDraft()" class="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm">
                                        <i data-lucide="message-circle" class="w-4 h-4"></i> Evaluate Tone
                                    </button>
                                    <button onclick="window.clearTeamDraft()" class="w-full sm:w-auto text-slate-400 hover:text-white text-xs sm:text-sm font-medium px-4 py-1.5 transition-colors text-center">Clear</button>
                                </div>
                            </div>
                        </div>

                        <!-- Right: AI Feedback Pane -->
                        <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8 flex flex-col shrink-0">
                            <h2 class="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <i data-lucide="activity" class="w-5 h-5 text-teal-500"></i> AI Analysis
                            </h2>
                            
                            <div id="aiTeamFeedbackContainer" class="flex-1 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50 min-h-[180px]">
                                <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                                    <i data-lucide="git-merge" class="w-8 h-8"></i>
                                </div>
                                <p class="text-slate-400 text-xs sm:text-sm font-medium">Draft your response. The AI will evaluate it for constructive tone, clarity, and professionalism.</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <!-- Completion Section -->
            <div class="mt-8 text-center space-y-4 flex flex-col items-center pb-20">
                ${isCompleted ? `
                    <div class="text-emerald-600 font-bold flex items-center gap-2 text-lg">
                        <i data-lucide="check-circle" class="w-6 h-6"></i> Lesson Completed!
                    </div>
                    ${window.proSyllabus[parseInt(day) + 1] ? `
                        <button onclick="window.showView('pro_lesson', {day: ${parseInt(day) + 1}})" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto flex justify-center items-center gap-2">
                            Next Lesson <i data-lucide="arrow-right" class="w-5 h-5"></i>
                        </button>
                    ` : `
                        <button onclick="window.showView('dashboard')" class="bg-slate-800 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-lg hover:bg-slate-700 transition-transform hover:-translate-y-1 w-full sm:w-auto">
                            Back to Dashboard
                        </button>
                    `}
                ` : `
                    <button onclick="window.completeProLesson('${day}')" class="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto">
                        Complete Lesson & Claim XP
                    </button>
                `}
            </div>
        </div>
    `;

    mainContent.innerHTML = html;
    window.loadTeamScenario();
    if (window.lucide) window.lucide.createIcons();
};

window.switchTeamTab = (tab) => {
    document.querySelectorAll('.team-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    document.querySelectorAll('#tab-roles, #tab-collab, #tab-coach').forEach(el => {
        el.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50";
    });
    
    document.getElementById(`view-${tab}`).classList.remove('hidden');
    document.getElementById(`view-${tab}`).classList.add('block');
    
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-teal-50 text-teal-700 border border-teal-100 shadow-sm";
};

// Phase 1: Matching Game
window.twSelectedRole = null;
window.twMatches = 0;

window.twSelectRole = (role, el) => {
    document.querySelectorAll('.tw-role-btn').forEach(b => b.classList.remove('ring-4', 'ring-teal-400', 'border-teal-400'));
    el.classList.add('ring-4', 'ring-teal-400', 'border-teal-400');
    window.twSelectedRole = role;
};

window.twSelectResp = (resp, el) => {
    if (!window.twSelectedRole) return;
    
    if (window.twSelectedRole === resp) {
        // Match!
        el.classList.remove('border-slate-200', 'bg-slate-50', 'text-slate-600');
        el.classList.add('bg-emerald-50', 'border-emerald-400', 'text-emerald-700', 'opacity-50', 'pointer-events-none');
        
        const roleBtn = document.querySelector(`.tw-role-btn[onclick="window.twSelectRole('${resp}', this)"]`);
        roleBtn.classList.remove('ring-4', 'ring-teal-400', 'border-teal-400', 'border-slate-200');
        roleBtn.classList.add('bg-emerald-50', 'border-emerald-400', 'text-emerald-700', 'opacity-50', 'pointer-events-none');
        
        window.twSelectedRole = null;
        window.twMatches++;
        document.getElementById('twScore').innerText = `${window.twMatches}/4`;
        
        if (window.twMatches === 4) {
            setTimeout(() => {
                document.getElementById('twScore').innerHTML = `<i data-lucide="check-circle" class="w-5 h-5 inline-block"></i> Perfect!`;
                if(window.lucide) window.lucide.createIcons();
            }, 500);
        }
    } else {
        // Mismatch visual
        el.classList.add('animate-shake', 'bg-rose-50', 'border-rose-400');
        setTimeout(() => {
            el.classList.remove('animate-shake', 'bg-rose-50', 'border-rose-400');
        }, 500);
    }
};

// Phase 2: Collaboration Game
window.collabSelect = (choice) => {
    const feedback = document.getElementById('collabFeedback');
    document.getElementById('collabOptions').classList.add('hidden');
    feedback.classList.remove('hidden');
    
    if (choice === 'isolate') {
        feedback.innerHTML = `
            <div class="bg-rose-900/20 border border-rose-500/50 p-6 rounded-2xl flex flex-col items-center text-center">
                <i data-lucide="user-minus" class="w-16 h-16 text-rose-500 mb-4"></i>
                <h3 class="text-xl font-bold text-white mb-2">Isolation Fails Teams</h3>
                <p class="text-slate-300 mb-6 max-w-md">Spending 4 hours stuck on an issue hurts project velocity. Asking for help is not a sign of weakness; it's a sign of a professional who values team goals over ego.</p>
                <button onclick="window.resetCollab()" class="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors">Try Again</button>
            </div>
        `;
    } else if (choice === 'complain') {
        feedback.innerHTML = `
            <div class="bg-rose-900/20 border border-rose-500/50 p-6 rounded-2xl flex flex-col items-center text-center">
                <i data-lucide="frown" class="w-16 h-16 text-rose-500 mb-4"></i>
                <h3 class="text-xl font-bold text-white mb-2">Toxic Communication</h3>
                <p class="text-slate-300 mb-6 max-w-md">Complaining loudly lowers team morale and doesn't solve the problem. Professional teams focus on constructive solutions, not venting.</p>
                <button onclick="window.resetCollab()" class="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors">Try Again</button>
            </div>
        `;
    } else {
        feedback.innerHTML = `
            <div class="bg-emerald-900/20 border border-emerald-500/50 p-6 rounded-2xl flex flex-col items-center text-center">
                <i data-lucide="users" class="w-16 h-16 text-emerald-500 mb-4"></i>
                <h3 class="text-xl font-bold text-white mb-2">Excellent Collaboration</h3>
                <p class="text-slate-300 mb-6 max-w-md">Providing context and asking for a short pair-programming session is the most efficient way to get unblocked. This builds team trust and knowledge sharing.</p>
                <button onclick="window.resetCollab()" class="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors">Reset Scenario</button>
            </div>
        `;
    }
    if (window.lucide) window.lucide.createIcons();
};

window.resetCollab = () => {
    document.getElementById('collabOptions').classList.remove('hidden');
    document.getElementById('collabFeedback').classList.add('hidden');
};

// Phase 3: Coach Logic
window.teamScenarios = {
    'review': {
        context: "A teammate submitted a Pull Request (PR) containing code that is very messy and missing unit tests. Draft a code review comment that is constructive and helpful, not toxic.",
    },
    'standup': {
        context: "It's the Daily Stand-up meeting. You cannot finish your feature because the Backend team hasn't deployed the new database schema yet. Draft your professional status update for the Scrum Master.",
    }
};

window.loadTeamScenario = () => {
    const val = document.getElementById('teamScenarioSelect').value;
    const scenario = window.teamScenarios[val];
    document.getElementById('teamScenarioContext').innerText = scenario.context;
    document.getElementById('teamDraftBody').value = '';
    
    document.getElementById('aiTeamFeedbackContainer').innerHTML = `
        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
            <i data-lucide="git-merge" class="w-8 h-8"></i>
        </div>
        <p class="text-slate-400 text-sm font-medium">Draft your response. The AI will evaluate it for constructive tone, clarity, and professionalism.</p>
    `;
    if (window.lucide) window.lucide.createIcons();
};

window.clearTeamDraft = () => {
    document.getElementById('teamDraftBody').value = '';
};

window.evaluateTeamDraft = () => {
    const body = document.getElementById('teamDraftBody').value.trim();
    const container = document.getElementById('aiTeamFeedbackContainer');

    if (!body) {
        container.innerHTML = `<p class="text-teal-500 font-bold">Please draft a message first!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500 mb-4"></div>
        <p class="text-teal-500 font-medium">Analyzing team communication...</p>
    `;

    setTimeout(() => {
        let score = 100;
        let feedbackHTML = '';
        const val = document.getElementById('teamScenarioSelect').value;

        if (val === 'review') {
            if (/\b(terrible|messy|horrible|lazy|stupid|bad)\b/i.test(body)) {
                score -= 40;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="shield-alert" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Destructive Tone:</b> Never attack the person or use insulting adjectives. Critique the code objectively.</p></div></div>`;
            }
            if (!/\b(suggest|test|unit test|refactor|could we|how about)\b/i.test(body)) {
                score -= 30;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Lacking Constructive Solutions:</b> Don't just say 'this is wrong'. Suggest adding unit tests or point them to a specific design pattern.</p></div></div>`;
            }
        }

        if (val === 'standup') {
            if (/\b(fault|blame|they didn't|slow)\b/i.test(body)) {
                score -= 40;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Blaming Teammates:</b> Throwing another team under the bus creates a toxic environment. State the blocker neutrally.</p></div></div>`;
            }
            if (!/\b(blocked|blocker|waiting|dependent|schema)\b/i.test(body)) {
                 score -= 30;
                 feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Unclear Status:</b> You must use clear Agile terminology (e.g., 'I am blocked by...') so the Scrum Master knows to intervene.</p></div></div>`;
            }
            if (!/\b(help|reach out|sync|contact)\b/i.test(body) && score > 60) {
                 score -= 10;
                 feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="info" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Pro Tip:</b> A great team member proactively says: 'I will sync with the Backend lead after standup to get an ETA'.</p></div></div>`;
            }
        }

        if (score === 100) {
            feedbackHTML += `<div class="bg-emerald-900/50 border border-emerald-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-200"><b>Excellent Teamwork!</b> Your communication is professional, clear, and focused on solutions.</p></div></div>`;
        } else if (score >= 70) {
            feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Good effort.</b> Review the feedback to refine your team communication skills.</p></div></div>`;
        }

        container.innerHTML = `
            <div class="w-full flex flex-col items-center bg-slate-900 p-2 rounded-xl shadow-sm mb-4 border border-slate-700">
                <div class="text-3xl font-extrabold text-${score > 70 ? 'emerald' : 'rose'}-500">${score}/100</div>
                <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Teamwork Score</div>
            </div>
            <div class="w-full space-y-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                ${feedbackHTML}
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

    }, 1200);
};
