window.renderSmartWorkModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-indigo-50 rounded-lg text-indigo-600 hidden sm:block"><i data-lucide="cpu" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: Hard Work vs Smart Work</span>`;
    }

    let progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    let isCompleted = progress.completedLessons && progress.completedLessons.includes(`pro_${day}`);

    let html = `
        <div class="animate-fade-in mx-auto space-y-12 pb-20 bg-slate-50 min-h-screen">
            
            <!-- HEADER -->
            <div class="relative bg-gradient-to-r from-indigo-700 to-violet-800 rounded-b-3xl sm:rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden text-white mb-8 mx-auto max-w-6xl mt-4">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8">
                        <div class="w-20 sm:w-24 h-20 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0 shadow-inner">
                            <i data-lucide="cpu" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-indigo-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">Hard Work vs Smart Work</h1>
                            <p class="text-indigo-50 text-lg max-w-2xl">Learn how to multiply your productivity using automation, AI, and strategic planning instead of relying purely on manual effort.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4 space-y-8" id="smartwork-sim-container">
                
                <!-- Navigation Tabs -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap gap-2 mb-6">
                    <button onclick="window.switchSmartTab('matrix')" id="tab-matrix" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">
                        <i data-lucide="split-square-horizontal" class="w-5 h-5"></i> Strategy Matrix
                    </button>
                    <button onclick="window.switchSmartTab('game')" id="tab-game" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="gamepad-2" class="w-5 h-5"></i> The Efficiency Game
                    </button>
                    <button onclick="window.switchSmartTab('coach')" id="tab-coach" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="bot" class="w-5 h-5"></i> AI Efficiency Coach
                    </button>
                </div>

                <!-- Phase 1: Matrix -->
                <div id="view-matrix" class="smart-view block animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div class="p-2 bg-violet-100 text-violet-600 rounded-lg"><i data-lucide="compare-changes"></i></div>
                            The Shift from Manual to Automated
                        </h2>
                        <p class="text-slate-600 mb-8 text-lg">In IT, working long hours manually typing code or testing features leads to burnout. Smart workers leverage tools to do the heavy lifting.</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            <!-- Scenario 1 -->
                            <div class="flex flex-col gap-4">
                                <h3 class="font-bold text-slate-700 uppercase tracking-widest text-sm border-b border-slate-200 pb-2">Scenario: Quality Assurance</h3>
                                <div class="bg-rose-50 border border-rose-200 rounded-xl p-5 relative overflow-hidden">
                                    <div class="absolute right-0 top-0 w-2 h-full bg-rose-400"></div>
                                    <div class="flex items-center gap-2 mb-2 text-rose-700 font-bold">
                                        <i data-lucide="x-circle" class="w-5 h-5"></i> Hard Work (Manual)
                                    </div>
                                    <p class="text-slate-700 text-sm">Testing every single login form manually by typing different passwords for 3 hours every time a new version is released.</p>
                                </div>
                                <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 relative overflow-hidden">
                                    <div class="absolute right-0 top-0 w-2 h-full bg-emerald-400"></div>
                                    <div class="flex items-center gap-2 mb-2 text-emerald-700 font-bold">
                                        <i data-lucide="check-circle-2" class="w-5 h-5"></i> Smart Work (Automated)
                                    </div>
                                    <p class="text-slate-700 text-sm">Writing an automated test script (e.g. Cypress or Selenium) that runs thousands of login tests in 5 seconds.</p>
                                </div>
                            </div>

                            <!-- Scenario 2 -->
                            <div class="flex flex-col gap-4">
                                <h3 class="font-bold text-slate-700 uppercase tracking-widest text-sm border-b border-slate-200 pb-2">Scenario: Documentation</h3>
                                <div class="bg-rose-50 border border-rose-200 rounded-xl p-5 relative overflow-hidden">
                                    <div class="absolute right-0 top-0 w-2 h-full bg-rose-400"></div>
                                    <div class="flex items-center gap-2 mb-2 text-rose-700 font-bold">
                                        <i data-lucide="x-circle" class="w-5 h-5"></i> Hard Work (Manual)
                                    </div>
                                    <p class="text-slate-700 text-sm">Typing out a 20-page technical manual from scratch explaining what your code does.</p>
                                </div>
                                <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 relative overflow-hidden">
                                    <div class="absolute right-0 top-0 w-2 h-full bg-emerald-400"></div>
                                    <div class="flex items-center gap-2 mb-2 text-emerald-700 font-bold">
                                        <i data-lucide="check-circle-2" class="w-5 h-5"></i> Smart Work (Automated)
                                    </div>
                                    <p class="text-slate-700 text-sm">Feeding your clean, well-commented code into an AI tool (like GitHub Copilot or ChatGPT) to generate the first draft of the documentation in seconds, then reviewing it.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Phase 2: Game -->
                <div id="view-game" class="smart-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 p-8 text-center flex flex-col items-center justify-center min-h-[500px]">
                        
                        <div id="gameContent" class="w-full max-w-2xl">
                            <div class="mb-8">
                                <div class="inline-flex items-center justify-center p-3 bg-violet-900/50 text-violet-400 rounded-full mb-4 border border-violet-500/30">
                                    <i data-lucide="alert-circle" class="w-8 h-8"></i>
                                </div>
                                <h2 class="text-2xl font-bold text-white mb-2">Workflow Inefficiency Detected</h2>
                                <p class="text-slate-400" id="gameScenarioText">Every Monday morning, your manager asks you to pull user data from 3 different SQL databases, combine them in Excel, format the charts, and email the PDF report. It takes you 4 hours of manual copy/pasting.</p>
                            </div>

                            <div class="space-y-4" id="gameOptions">
                                <button onclick="window.selectGameOption('hard')" class="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4 group">
                                    <div class="w-8 h-8 rounded-full bg-rose-900/50 text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><i data-lucide="frown" class="w-4 h-4"></i></div>
                                    <div>
                                        <h4 class="font-bold text-white mb-1">The Hard Way</h4>
                                        <p class="text-sm text-slate-400">Wake up 4 hours early every Monday to get it done before the morning meeting so you look like a hard worker.</p>
                                    </div>
                                </button>
                                
                                <button onclick="window.selectGameOption('smart')" class="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500 text-slate-200 p-4 rounded-xl transition-all text-left flex items-start gap-4 group">
                                    <div class="w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><i data-lucide="zap" class="w-4 h-4"></i></div>
                                    <div>
                                        <h4 class="font-bold text-white mb-1">The Smart Way</h4>
                                        <p class="text-sm text-slate-400">Spend 8 hours ONCE writing a Python script that connects to the databases, builds the charts, and emails the PDF automatically every Monday.</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div id="gameFeedback" class="hidden w-full max-w-2xl mt-4">
                            <!-- Injected by JS -->
                        </div>

                    </div>
                </div>

                <!-- Phase 3: AI Efficiency Coach -->
                <div id="view-coach" class="smart-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
                        
                        <!-- Left: Scenario and Writing Area -->
                        <div class="flex-1 min-w-0 flex flex-col">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                    <i data-lucide="bot" class="w-5 h-5 text-indigo-500"></i> AI Efficiency Coach
                                </h2>
                                <select id="smartScenarioSelect" class="bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none font-medium w-full sm:w-auto" onchange="window.loadSmartScenario()">
                                    <option value="code">Scenario 1: The Spaghetti Code</option>
                                    <option value="env">Scenario 2: The New Interns</option>
                                </select>
                            </div>
                            
                            <div class="bg-slate-800 rounded-xl p-4 sm:p-5 mb-4 border border-slate-700 relative overflow-hidden">
                                <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Inefficiency Scenario</h3>
                                <p id="smartScenarioContext" class="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                                    A junior developer asks you to review 500 lines of messy, undocumented code they wrote. Reading it manually will take hours. Draft your response explaining how you will approach this efficiently.
                                </p>
                            </div>

                            <!-- Editor -->
                            <div class="flex-1 flex flex-col border border-slate-700 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-colors bg-slate-800 shadow-sm min-h-[220px]">
                                <textarea id="smartDraftBody" class="flex-1 p-3 sm:p-4 outline-none resize-none text-xs sm:text-sm text-slate-200 leading-relaxed font-mono min-h-[140px] bg-transparent" placeholder="Draft your smart-work solution..."></textarea>
                                
                                <div class="bg-slate-900 border-t border-slate-700 p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <button onclick="window.evaluateSmartDraft()" class="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm">
                                        <i data-lucide="cpu" class="w-4 h-4"></i> Evaluate Efficiency
                                    </button>
                                    <button onclick="window.clearSmartDraft()" class="w-full sm:w-auto text-slate-400 hover:text-white text-xs sm:text-sm font-medium px-4 py-1.5 transition-colors text-center">Clear</button>
                                </div>
                            </div>
                        </div>

                        <!-- Right: AI Feedback Pane -->
                        <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8 flex flex-col shrink-0">
                            <h2 class="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <i data-lucide="activity" class="w-5 h-5 text-indigo-500"></i> AI Analysis
                            </h2>
                            
                            <div id="aiSmartFeedbackContainer" class="flex-1 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50 min-h-[180px]">
                                <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                                    <i data-lucide="zap" class="w-8 h-8"></i>
                                </div>
                                <p class="text-slate-400 text-xs sm:text-sm font-medium">Type your proposed solution. The AI will evaluate whether you chose the hard manual path or the smart automated path.</p>
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
                    <button onclick="window.completeProLesson('${day}')" class="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto">
                        Complete Lesson & Claim XP
                    </button>
                `}
            </div>
        </div>
    `;

    mainContent.innerHTML = html;
    window.loadSmartScenario();
    if (window.lucide) window.lucide.createIcons();
};

window.switchSmartTab = (tab) => {
    document.querySelectorAll('.smart-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    document.querySelectorAll('#tab-matrix, #tab-game, #tab-coach').forEach(el => {
        el.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50";
    });
    
    document.getElementById(`view-${tab}`).classList.remove('hidden');
    document.getElementById(`view-${tab}`).classList.add('block');
    
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm";
};

// Efficiency Game Logic
window.selectGameOption = (choice) => {
    const feedback = document.getElementById('gameFeedback');
    document.getElementById('gameOptions').classList.add('hidden');
    feedback.classList.remove('hidden');
    
    if (choice === 'hard') {
        feedback.innerHTML = `
            <div class="bg-rose-900/20 border border-rose-500/50 p-6 rounded-2xl flex flex-col items-center">
                <i data-lucide="x-circle" class="w-16 h-16 text-rose-500 mb-4"></i>
                <h3 class="text-xl font-bold text-white mb-2">Burnout Detected!</h3>
                <p class="text-slate-300 mb-6">Waking up 4 hours early every week means you lose 208 hours a year to manual labor. This is the definition of inefficient "Hard Work".</p>
                <button onclick="window.resetGameOption()" class="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors">Try Again</button>
            </div>
        `;
    } else {
        feedback.innerHTML = `
            <div class="bg-emerald-900/20 border border-emerald-500/50 p-6 rounded-2xl flex flex-col items-center">
                <i data-lucide="check-circle" class="w-16 h-16 text-emerald-500 mb-4"></i>
                <h3 class="text-xl font-bold text-white mb-2">Smart Work Mastered!</h3>
                <p class="text-slate-300 mb-6">Spending 8 hours upfront to build a script saves you 200 hours a year. It's a short-term investment for long-term automation.</p>
                <button onclick="window.resetGameOption()" class="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors">Reset Scenario</button>
            </div>
        `;
    }
    if (window.lucide) window.lucide.createIcons();
};

window.resetGameOption = () => {
    document.getElementById('gameOptions').classList.remove('hidden');
    document.getElementById('gameFeedback').classList.add('hidden');
};

// Coach Logic
window.smartScenarios = {
    'code': {
        context: "A junior developer asks you to review 500 lines of messy, undocumented code they wrote. Reading it manually will take hours. Draft your response explaining how you will approach this efficiently.",
    },
    'env': {
        context: "You need to set up the exact same complex local development environment (Node, Postgres, Redis, env variables) for 5 new interns starting today. Draft your approach.",
    }
};

window.loadSmartScenario = () => {
    const val = document.getElementById('smartScenarioSelect').value;
    const scenario = window.smartScenarios[val];
    document.getElementById('smartScenarioContext').innerText = scenario.context;
    document.getElementById('smartDraftBody').value = '';
    
    document.getElementById('aiSmartFeedbackContainer').innerHTML = `
        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
            <i data-lucide="zap" class="w-8 h-8"></i>
        </div>
        <p class="text-slate-400 text-sm font-medium">Type your proposed solution. The AI will evaluate whether you chose the hard manual path or the smart automated path.</p>
    `;
    if (window.lucide) window.lucide.createIcons();
};

window.clearSmartDraft = () => {
    document.getElementById('smartDraftBody').value = '';
};

window.evaluateSmartDraft = () => {
    const body = document.getElementById('smartDraftBody').value.trim();
    const container = document.getElementById('aiSmartFeedbackContainer');

    if (!body) {
        container.innerHTML = `<p class="text-indigo-500 font-bold">Please draft a response first!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mb-4"></div>
        <p class="text-indigo-500 font-medium">Analyzing efficiency tactics...</p>
    `;

    setTimeout(() => {
        let score = 100;
        let feedbackHTML = '';
        const val = document.getElementById('smartScenarioSelect').value;

        // Code Review Logic
        if (val === 'code') {
            if (/\b(read|go through|line by line|look at it)\b/i.test(body) && !/\b(ai|chatgpt|copilot|linter|sonar)\b/i.test(body)) {
                score -= 30;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Hard Work Detected:</b> Manually reading 500 lines of messy code is inefficient. You should run it through an AI tool (ChatGPT/Copilot) or a linter first to find obvious bugs and generate documentation.</p></div></div>`;
            }
            if (!/\b(comments|document|explain|refactor)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Missing Accountability:</b> A Smart Worker pushes back and asks the junior dev to add comments and run a linter *before* the senior review.</p></div></div>`;
            }
        }

        // Intern Env Logic
        if (val === 'env') {
            if (/\b(install|one by one|help them|sit with|show them)\b/i.test(body) && !/\b(script|docker|readme|document|automate)\b/i.test(body)) {
                score -= 40;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Extreme Inefficiency:</b> Sitting with 5 interns to manually install Postgres is a huge waste of senior dev time. You must automate this.</p></div></div>`;
            }
            if (!/\b(docker|container|compose|script|bash|automation)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Tooling Opportunity Missed:</b> The smartest solution is writing a 'docker-compose.yml' file or a bash setup script so environments spin up in 1 click.</p></div></div>`;
            }
        }

        if (score === 100) {
            feedbackHTML += `<div class="bg-emerald-900/50 border border-emerald-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-200"><b>Excellent Smart Work!</b> You correctly identified that automation and tooling should replace manual brute-force effort.</p></div></div>`;
        } else if (score >= 70) {
            feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Good effort.</b> Review the feedback to sharpen your automation mindset.</p></div></div>`;
        }

        container.innerHTML = `
            <div class="w-full flex flex-col items-center bg-slate-900 p-2 rounded-xl shadow-sm mb-4 border border-slate-700">
                <div class="text-3xl font-extrabold text-${score > 70 ? 'emerald' : 'rose'}-500">${score}/100</div>
                <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Efficiency Score</div>
            </div>
            <div class="w-full space-y-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                ${feedbackHTML}
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

    }, 1200);
};
