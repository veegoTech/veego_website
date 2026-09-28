window.renderLeadershipModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-amber-50 rounded-lg text-amber-600 hidden sm:block"><i data-lucide="crown" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: Leadership & Ownership</span>`;
    }

    let progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    let isCompleted = progress.completedLessons && progress.completedLessons.includes(`pro_${day}`);

    let html = `
        <div class="animate-fade-in mx-auto space-y-12 pb-20 bg-slate-50 min-h-screen">
            
            <!-- HEADER -->
            <div class="relative bg-gradient-to-r from-amber-600 to-orange-700 rounded-b-3xl sm:rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden text-white mb-8 mx-auto max-w-6xl mt-4">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8">
                        <div class="w-20 sm:w-24 h-20 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0 shadow-inner">
                            <i data-lucide="crown" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-amber-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">Leadership & Ownership</h1>
                            <p class="text-amber-50 text-lg max-w-2xl">Leadership isn't a title, it's an action. Learn to take extreme ownership of your code, your mistakes, and your team's success.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4 space-y-8" id="leadership-sim-container">
                
                <!-- Navigation Tabs -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap gap-2 mb-6">
                    <button onclick="window.switchLeaderTab('mindset')" id="tab-mindset" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-amber-50 text-amber-700 border border-amber-100 shadow-sm">
                        <i data-lucide="user-check" class="w-5 h-5"></i> The Ownership Mindset
                    </button>
                    <button onclick="window.switchLeaderTab('tree')" id="tab-tree" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="git-branch" class="w-5 h-5"></i> Decision Matrix
                    </button>
                    <button onclick="window.switchLeaderTab('coach')" id="tab-coach" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="bot" class="w-5 h-5"></i> AI Leadership Coach
                    </button>
                </div>

                <!-- Phase 1: Mindset -->
                <div id="view-mindset" class="leader-view block animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div class="p-2 bg-rose-100 text-rose-600 rounded-lg"><i data-lucide="shield-alert"></i></div>
                            Reactive vs Proactive Ownership
                        </h2>
                        <p class="text-slate-600 mb-8 text-lg">In software engineering, you will inevitably face broken builds, missed deadlines, and confused clients. A junior developer blames the system. A leader takes ownership.</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            <!-- Scenario 1 -->
                            <div class="flex flex-col gap-4">
                                <h3 class="font-bold text-slate-700 uppercase tracking-widest text-sm border-b border-slate-200 pb-2">The Broken Build</h3>
                                <div class="bg-slate-50 border border-slate-200 rounded-xl p-5 relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow" onclick="this.querySelector('.hidden-content').classList.toggle('hidden'); this.querySelector('.chevron').classList.toggle('rotate-180')">
                                    <div class="absolute left-0 top-0 w-1 h-full bg-rose-400"></div>
                                    <div class="flex items-center justify-between text-rose-700 font-bold mb-2">
                                        <div class="flex items-center gap-2"><i data-lucide="frown" class="w-5 h-5"></i> The Reactive Employee</div>
                                        <i data-lucide="chevron-down" class="w-4 h-4 chevron transition-transform"></i>
                                    </div>
                                    <div class="hidden-content hidden mt-4 pt-4 border-t border-rose-200/50">
                                        <p class="text-slate-700 italic">"It worked on my machine. QA must have messed up the test environment. Not my problem."</p>
                                    </div>
                                </div>
                                <div class="bg-slate-50 border border-slate-200 rounded-xl p-5 relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow" onclick="this.querySelector('.hidden-content').classList.toggle('hidden'); this.querySelector('.chevron').classList.toggle('rotate-180')">
                                    <div class="absolute left-0 top-0 w-1 h-full bg-emerald-400"></div>
                                    <div class="flex items-center justify-between text-emerald-700 font-bold mb-2">
                                        <div class="flex items-center gap-2"><i data-lucide="shield-check" class="w-5 h-5"></i> The Owner</div>
                                        <i data-lucide="chevron-down" class="w-4 h-4 chevron transition-transform"></i>
                                    </div>
                                    <div class="hidden-content hidden mt-4 pt-4 border-t border-emerald-200/50">
                                        <p class="text-slate-700 italic">"Let me pull the logs from the test environment and see why it failed. I'll help QA find the root cause."</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Scenario 2 -->
                            <div class="flex flex-col gap-4">
                                <h3 class="font-bold text-slate-700 uppercase tracking-widest text-sm border-b border-slate-200 pb-2">The Vague Requirements</h3>
                                <div class="bg-slate-50 border border-slate-200 rounded-xl p-5 relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow" onclick="this.querySelector('.hidden-content').classList.toggle('hidden'); this.querySelector('.chevron').classList.toggle('rotate-180')">
                                    <div class="absolute left-0 top-0 w-1 h-full bg-rose-400"></div>
                                    <div class="flex items-center justify-between text-rose-700 font-bold mb-2">
                                        <div class="flex items-center gap-2"><i data-lucide="frown" class="w-5 h-5"></i> The Reactive Employee</div>
                                        <i data-lucide="chevron-down" class="w-4 h-4 chevron transition-transform"></i>
                                    </div>
                                    <div class="hidden-content hidden mt-4 pt-4 border-t border-rose-200/50">
                                        <p class="text-slate-700 italic">"The Product Manager didn't write the Jira ticket properly, so I just built whatever I thought it meant."</p>
                                    </div>
                                </div>
                                <div class="bg-slate-50 border border-slate-200 rounded-xl p-5 relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow" onclick="this.querySelector('.hidden-content').classList.toggle('hidden'); this.querySelector('.chevron').classList.toggle('rotate-180')">
                                    <div class="absolute left-0 top-0 w-1 h-full bg-emerald-400"></div>
                                    <div class="flex items-center justify-between text-emerald-700 font-bold mb-2">
                                        <div class="flex items-center gap-2"><i data-lucide="shield-check" class="w-5 h-5"></i> The Owner</div>
                                        <i data-lucide="chevron-down" class="w-4 h-4 chevron transition-transform"></i>
                                    </div>
                                    <div class="hidden-content hidden mt-4 pt-4 border-t border-emerald-200/50">
                                        <p class="text-slate-700 italic">"This ticket is vague. Before I write any code, I'm going to set up a 10-minute sync with the PM to clarify exactly what the client wants."</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Phase 2: Decision Tree -->
                <div id="view-tree" class="leader-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 p-8 flex flex-col items-center min-h-[500px]">
                        
                        <div class="mb-8 text-center w-full max-w-2xl">
                            <div class="inline-flex items-center justify-center p-3 bg-amber-900/50 text-amber-400 rounded-full mb-4 border border-amber-500/30">
                                <i data-lucide="alert-triangle" class="w-8 h-8"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-white mb-2" id="dtTitle">Project Crisis: The Missing Dev</h2>
                        </div>

                        <div id="dtNodeContainer" class="w-full max-w-2xl bg-slate-800 p-6 rounded-xl border border-slate-700 animate-fade-in">
                            <p class="text-lg text-slate-300 font-medium mb-6 leading-relaxed" id="dtContext">
                                It's 48 hours before a major client demo. Your lead frontend developer, Sarah, suddenly calls in sick with a severe flu. Half the UI is incomplete. What is your immediate leadership action?
                            </p>
                            <div class="space-y-4" id="dtOptions">
                                <button onclick="window.dtSelect(0)" class="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4 border border-slate-600 hover:border-amber-400">
                                    <div class="w-6 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0 font-bold text-xs text-amber-400 mt-0.5">A</div>
                                    <div>Message the client immediately and tell them Sarah is sick and the demo is canceled.</div>
                                </button>
                                <button onclick="window.dtSelect(1)" class="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4 border border-slate-600 hover:border-amber-400">
                                    <div class="w-6 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0 font-bold text-xs text-amber-400 mt-0.5">B</div>
                                    <div>Panic, complain to the team that Sarah always does this, and try to write all the UI code yourself by staying up for 48 hours.</div>
                                </button>
                                <button onclick="window.dtSelect(2)" class="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4 border border-slate-600 hover:border-amber-400">
                                    <div class="w-6 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0 font-bold text-xs text-amber-400 mt-0.5">C</div>
                                    <div>Call an emergency 15-min sync with the remaining team. Identify the critical 'must-have' UI features for the demo, and reassign those tasks.</div>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Phase 3: AI Leadership Coach -->
                <div id="view-coach" class="leader-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
                        
                        <!-- Left: Scenario and Writing Area -->
                        <div class="flex-1 min-w-0 flex flex-col">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                    <i data-lucide="bot" class="w-5 h-5 text-amber-500"></i> AI Leadership Coach
                                </h2>
                                <select id="leaderScenarioSelect" class="bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2 outline-none font-medium w-full sm:w-auto" onchange="window.loadLeaderScenario()">
                                    <option value="manager">Scenario 1: Taking Ownership (Manager Update)</option>
                                    <option value="teammate">Scenario 2: Team Empathy (Junior Dev Support)</option>
                                </select>
                            </div>
                            
                            <div class="bg-slate-800 rounded-xl p-4 sm:p-5 mb-4 border border-slate-700 relative overflow-hidden">
                                <div class="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Leadership Challenge</h3>
                                <p id="leaderScenarioContext" class="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                                    You completely underestimated a backend task. It's Friday, the code is due, and it's not finished. Draft a Slack message to your Manager explaining the situation.
                                </p>
                            </div>

                            <!-- Editor -->
                            <div class="flex-1 flex flex-col border border-slate-700 rounded-xl overflow-hidden focus-within:border-amber-500 transition-colors bg-slate-800 shadow-sm min-h-[220px]">
                                <textarea id="leaderDraftBody" class="flex-1 p-3 sm:p-4 outline-none resize-none text-xs sm:text-sm text-slate-200 leading-relaxed font-mono min-h-[140px] bg-transparent" placeholder="Draft your professional message..."></textarea>
                                
                                <div class="bg-slate-900 border-t border-slate-700 p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <button onclick="window.evaluateLeaderDraft()" class="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm">
                                        <i data-lucide="shield" class="w-4 h-4"></i> Evaluate Leadership
                                    </button>
                                    <button onclick="window.clearLeaderDraft()" class="w-full sm:w-auto text-slate-400 hover:text-white text-xs sm:text-sm font-medium px-4 py-1.5 transition-colors text-center">Clear</button>
                                </div>
                            </div>
                        </div>

                        <!-- Right: AI Feedback Pane -->
                        <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8 flex flex-col shrink-0">
                            <h2 class="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <i data-lucide="activity" class="w-5 h-5 text-amber-500"></i> AI Analysis
                            </h2>
                            
                            <div id="aiLeaderFeedbackContainer" class="flex-1 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50 min-h-[180px]">
                                <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                                    <i data-lucide="crown" class="w-8 h-8"></i>
                                </div>
                                <p class="text-slate-400 text-xs sm:text-sm font-medium">Draft your message. The AI will evaluate it for accountability, solution-orientation, and professional empathy.</p>
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
                        <button onclick="window.renderDashboard()" class="bg-slate-800 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-lg hover:bg-slate-700 transition-transform hover:-translate-y-1 w-full sm:w-auto">
                            Back to Dashboard
                        </button>
                    `}
                ` : `
                    <button onclick="window.completeProLesson('${day}')" class="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto">
                        Complete Lesson & Claim XP
                    </button>
                `}
            </div>
        </div>
    `;

    mainContent.innerHTML = html;
    window.loadLeaderScenario();
    if (window.lucide) window.lucide.createIcons();
};

window.switchLeaderTab = (tab) => {
    document.querySelectorAll('.leader-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    document.querySelectorAll('#tab-mindset, #tab-tree, #tab-coach').forEach(el => {
        el.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50";
    });
    
    document.getElementById(`view-${tab}`).classList.remove('hidden');
    document.getElementById(`view-${tab}`).classList.add('block');
    
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-amber-50 text-amber-700 border border-amber-100 shadow-sm";
};

// Phase 2: Decision Tree Logic
window.dtState = 0; // 0 = start, 1 = success step 1
window.dtSelect = (choice) => {
    const container = document.getElementById('dtNodeContainer');
    
    if (window.dtState === 0) {
        if (choice === 2) {
            // Correct choice C
            window.dtState = 1;
            container.innerHTML = `
                <div class="p-4 bg-emerald-900/30 border border-emerald-500/30 rounded-lg mb-6 flex items-start gap-3 animate-fade-in">
                    <i data-lucide="check-circle" class="text-emerald-400 mt-1 shrink-0"></i>
                    <div>
                        <strong class="text-emerald-300 block mb-1">Excellent Leadership.</strong>
                        <span class="text-emerald-100 text-sm">You didn't panic, and you didn't give up. You triaged the problem. The team agrees to build only the core login flow and the main dashboard for the demo. But now, another issue: The client emails asking for an update. What do you do?</span>
                    </div>
                </div>
                <div class="space-y-4" id="dtOptions">
                    <button onclick="window.dtSelect(0)" class="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4 border border-slate-600 hover:border-amber-400">
                        <div class="w-6 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0 font-bold text-xs text-amber-400 mt-0.5">A</div>
                        <div>Ignore the email until the demo is ready so they don't get worried.</div>
                    </button>
                    <button onclick="window.dtSelect(1)" class="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4 border border-slate-600 hover:border-amber-400">
                        <div class="w-6 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0 font-bold text-xs text-amber-400 mt-0.5">B</div>
                        <div>Reply politely: "We had a team emergency, but we are focusing on the core login and dashboard features for tomorrow's demo to ensure quality."</div>
                    </button>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
        } else {
            // Wrong choice A or B
            container.innerHTML = `
                <div class="p-6 bg-rose-900/30 border border-rose-500/30 rounded-xl text-center animate-fade-in flex flex-col items-center">
                    <i data-lucide="x-circle" class="w-16 h-16 text-rose-500 mb-4"></i>
                    <h3 class="text-xl font-bold text-white mb-2">Leadership Failure</h3>
                    <p class="text-slate-300 mb-6 max-w-md">${choice === 0 ? "Canceling immediately shows a lack of resilience. Clients expect you to manage risks." : "Panicking and playing the hero leads to burnout and broken code. Leaders delegate and prioritize."}</p>
                    <button onclick="window.dtReset()" class="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors">Try Again</button>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
        }
    } else if (window.dtState === 1) {
        if (choice === 1) {
            // Correct choice B
            container.innerHTML = `
                <div class="p-8 bg-emerald-900/30 border border-emerald-500/30 rounded-xl text-center animate-fade-in flex flex-col items-center">
                    <i data-lucide="award" class="w-16 h-16 text-emerald-500 mb-4"></i>
                    <h3 class="text-2xl font-bold text-white mb-2">Crisis Averted!</h3>
                    <p class="text-emerald-100 mb-6 max-w-md">You demonstrated extreme ownership. You protected your sick teammate, motivated the remaining developers, and managed client expectations professionally.</p>
                    <button onclick="window.dtReset()" class="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors">Restart Scenario</button>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
        } else {
            // Wrong choice A
            container.innerHTML = `
                <div class="p-6 bg-rose-900/30 border border-rose-500/30 rounded-xl text-center animate-fade-in flex flex-col items-center">
                    <i data-lucide="eye-off" class="w-16 h-16 text-rose-500 mb-4"></i>
                    <h3 class="text-xl font-bold text-white mb-2">Transparency Failure</h3>
                    <p class="text-slate-300 mb-6 max-w-md">Ignoring a client email destroys trust. Leaders over-communicate during a crisis to manage expectations.</p>
                    <button onclick="window.dtReset()" class="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors">Try Again</button>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
        }
    }
};

window.dtReset = () => {
    window.dtState = 0;
    document.getElementById('dtNodeContainer').innerHTML = `
        <p class="text-lg text-slate-300 font-medium mb-6 leading-relaxed" id="dtContext">
            It's 48 hours before a major client demo. Your lead frontend developer, Sarah, suddenly calls in sick with a severe flu. Half the UI is incomplete. What is your immediate leadership action?
        </p>
        <div class="space-y-4" id="dtOptions">
            <button onclick="window.dtSelect(0)" class="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4 border border-slate-600 hover:border-amber-400">
                <div class="w-6 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0 font-bold text-xs text-amber-400 mt-0.5">A</div>
                <div>Message the client immediately and tell them Sarah is sick and the demo is canceled.</div>
            </button>
            <button onclick="window.dtSelect(1)" class="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4 border border-slate-600 hover:border-amber-400">
                <div class="w-6 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0 font-bold text-xs text-amber-400 mt-0.5">B</div>
                <div>Panic, complain to the team that Sarah always does this, and try to write all the UI code yourself by staying up for 48 hours.</div>
            </button>
            <button onclick="window.dtSelect(2)" class="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4 border border-slate-600 hover:border-amber-400">
                <div class="w-6 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0 font-bold text-xs text-amber-400 mt-0.5">C</div>
                <div>Call an emergency 15-min sync with the remaining team. Identify the critical 'must-have' UI features for the demo, and reassign those tasks.</div>
            </button>
        </div>
    `;
};


// Phase 3: Coach Logic
window.leaderScenarios = {
    'manager': {
        context: "You completely underestimated a backend task. It's Friday, the code is due, and it's not finished. Draft a Slack message to your Manager explaining the situation.",
    },
    'teammate': {
        context: "A junior developer on your team keeps pushing code that breaks the build because they don't run tests locally. Draft a private message to them.",
    }
};

window.loadLeaderScenario = () => {
    const val = document.getElementById('leaderScenarioSelect').value;
    const scenario = window.leaderScenarios[val];
    document.getElementById('leaderScenarioContext').innerText = scenario.context;
    document.getElementById('leaderDraftBody').value = '';
    
    document.getElementById('aiLeaderFeedbackContainer').innerHTML = `
        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
            <i data-lucide="crown" class="w-8 h-8"></i>
        </div>
        <p class="text-slate-400 text-sm font-medium">Draft your message. The AI will evaluate it for accountability, solution-orientation, and professional empathy.</p>
    `;
    if (window.lucide) window.lucide.createIcons();
};

window.clearLeaderDraft = () => {
    document.getElementById('leaderDraftBody').value = '';
};

window.evaluateLeaderDraft = () => {
    const body = document.getElementById('leaderDraftBody').value.trim();
    const container = document.getElementById('aiLeaderFeedbackContainer');

    if (!body) {
        container.innerHTML = `<p class="text-amber-500 font-bold">Please draft a message first!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500 mb-4"></div>
        <p class="text-amber-500 font-medium">Analyzing leadership tone...</p>
    `;

    setTimeout(() => {
        let score = 100;
        let feedbackHTML = '';
        const val = document.getElementById('leaderScenarioSelect').value;

        if (val === 'manager') {
            if (/\b(not my fault|too hard|was complex|didn't know|someone else)\b/i.test(body)) {
                score -= 40;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Deflecting Blame:</b> Never make excuses. Say 'I underestimated the complexity' instead of 'The task was too hard'.</p></div></div>`;
            }
            if (!/\b(plan|solution|update|by monday|will finish|next steps)\b/i.test(body)) {
                score -= 30;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Missing Solution:</b> A leader doesn't just deliver bad news; they deliver bad news *with a plan*. Tell them when it will be done.</p></div></div>`;
            }
            if (!/\b(sorry|apologize|my mistake|take ownership)\b/i.test(body) && score > 60) {
                 score -= 10;
                 feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="info" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Professional Tip:</b> A simple 'Apologies for the delay' goes a long way in showing accountability.</p></div></div>`;
            }
        }

        if (val === 'teammate') {
            if (/\b(stop|always|stupid|breaking|annoying|terrible)\b/i.test(body)) {
                score -= 50;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="shield-alert" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Aggressive Tone:</b> Do not use aggressive or absolutist words ('always'). This creates a toxic culture.</p></div></div>`;
            }
            if (!/\b(help|show you|pair|call|walk through|sync)\b/i.test(body)) {
                 score -= 30;
                 feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Missing Support:</b> A leader doesn't just point out flaws; they offer help. Suggest a quick pair-programming session to show them how to run tests.</p></div></div>`;
            }
        }

        if (score === 100) {
            feedbackHTML += `<div class="bg-emerald-900/50 border border-emerald-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-200"><b>Excellent Leadership!</b> You took ownership, remained professional, and focused on solutions.</p></div></div>`;
        } else if (score >= 70) {
            feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Good effort.</b> Review the feedback to refine your leadership communication.</p></div></div>`;
        }

        container.innerHTML = `
            <div class="w-full flex flex-col items-center bg-slate-900 p-2 rounded-xl shadow-sm mb-4 border border-slate-700">
                <div class="text-3xl font-extrabold text-${score > 70 ? 'emerald' : 'rose'}-500">${score}/100</div>
                <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Leadership Score</div>
            </div>
            <div class="w-full space-y-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                ${feedbackHTML}
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

    }, 1200);
};
