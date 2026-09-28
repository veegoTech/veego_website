window.renderConflictResolutionModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-fuchsia-50 rounded-lg text-fuchsia-600 hidden sm:block"><i data-lucide="scale" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: Conflict Resolution</span>`;
    }

    let progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    let isCompleted = progress.completedLessons && progress.completedLessons.includes(`pro_${day}`);

    let html = `
        <div class="animate-fade-in mx-auto space-y-12 pb-20 bg-slate-50 min-h-screen">
            
            <!-- HEADER -->
            <div class="relative bg-gradient-to-r from-fuchsia-700 to-purple-800 rounded-b-3xl sm:rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden text-white mb-8 mx-auto max-w-6xl mt-4">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8">
                        <div class="w-20 sm:w-24 h-20 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0 shadow-inner">
                            <i data-lucide="scale" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-fuchsia-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">Conflict Resolution</h1>
                            <p class="text-fuchsia-50 text-lg max-w-2xl">Learn how to de-escalate workplace tension, communicate boundaries professionally, and transform team friction into collaborative solutions.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4 space-y-8" id="conflict-sim-container">
                
                <!-- Navigation Tabs -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap gap-2 mb-6">
                    <button onclick="window.switchConflictTab('process')" id="tab-process" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100 shadow-sm">
                        <i data-lucide="list-ordered" class="w-5 h-5"></i> The 9-Step Process
                    </button>
                    <button onclick="window.switchConflictTab('decision')" id="tab-decision" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="git-branch" class="w-5 h-5"></i> De-escalation Simulator
                    </button>
                    <button onclick="window.switchConflictTab('coach')" id="tab-coach" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="bot" class="w-5 h-5"></i> AI Conflict Coach
                    </button>
                </div>

                <!-- Phase 1: 9-Step Process -->
                <div id="view-process" class="conflict-view block animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div class="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><i data-lucide="git-merge"></i></div>
                            The Standard Corporate Resolution Flow
                        </h2>
                        <p class="text-slate-600 mb-8 text-lg">Workplace conflict isn't about winning an argument; it's about solving a business problem. Follow this structure.</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="bg-slate-50 border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-400 transition-colors">
                                <div class="absolute -right-4 -bottom-4 text-slate-200 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="search" class="w-24 h-24"></i></div>
                                <span class="font-bold text-indigo-600 text-2xl block mb-2">01. Identify</span>
                                <p class="text-slate-700 relative z-10 font-medium">Identify the root problem. Is it a missed deadline, unclear requirements, or a personality clash?</p>
                            </div>
                            <div class="bg-slate-50 border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-400 transition-colors">
                                <div class="absolute -right-4 -bottom-4 text-slate-200 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="brain" class="w-24 h-24"></i></div>
                                <span class="font-bold text-indigo-600 text-2xl block mb-2">02. Stay Calm</span>
                                <p class="text-slate-700 relative z-10 font-medium">Take a breath. Do not reply immediately if you are angry. Never send emotional emails.</p>
                            </div>
                            <div class="bg-slate-50 border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-400 transition-colors">
                                <div class="absolute -right-4 -bottom-4 text-slate-200 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="ear" class="w-24 h-24"></i></div>
                                <span class="font-bold text-indigo-600 text-2xl block mb-2">03. Listen</span>
                                <p class="text-slate-700 relative z-10 font-medium">Listen actively to their side without interrupting. Do not formulate your rebuttal while they speak.</p>
                            </div>
                            <div class="bg-slate-50 border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-400 transition-colors">
                                <div class="absolute -right-4 -bottom-4 text-slate-200 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="heart-handshake" class="w-24 h-24"></i></div>
                                <span class="font-bold text-indigo-600 text-2xl block mb-2">04. Understand</span>
                                <p class="text-slate-700 relative z-10 font-medium">Understand their perspective. They are trying to do their job, just like you. Empathize.</p>
                            </div>
                            <div class="bg-slate-50 border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-400 transition-colors">
                                <div class="absolute -right-4 -bottom-4 text-slate-200 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="message-circle-question" class="w-24 h-24"></i></div>
                                <span class="font-bold text-indigo-600 text-2xl block mb-2">05. Ask</span>
                                <p class="text-slate-700 relative z-10 font-medium">Ask clarification questions respectfully. "Can you help me understand why this approach was chosen?"</p>
                            </div>
                            <div class="bg-slate-50 border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-400 transition-colors">
                                <div class="absolute -right-4 -bottom-4 text-slate-200 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="file-text" class="w-24 h-24"></i></div>
                                <span class="font-bold text-indigo-600 text-2xl block mb-2">06. Focus on Facts</span>
                                <p class="text-slate-700 relative z-10 font-medium">Remove emotions. Use facts, logs, requirements docs, and timelines to guide the discussion.</p>
                            </div>
                            <div class="bg-slate-50 border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-400 transition-colors">
                                <div class="absolute -right-4 -bottom-4 text-slate-200 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="lightbulb" class="w-24 h-24"></i></div>
                                <span class="font-bold text-indigo-600 text-2xl block mb-2">07. Solutions</span>
                                <p class="text-slate-700 relative z-10 font-medium">Stop arguing about the past. Shift focus entirely to solving the problem right now.</p>
                            </div>
                            <div class="bg-slate-50 border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-400 transition-colors">
                                <div class="absolute -right-4 -bottom-4 text-slate-200 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="check-square" class="w-24 h-24"></i></div>
                                <span class="font-bold text-indigo-600 text-2xl block mb-2">08. Action Plan</span>
                                <p class="text-slate-700 relative z-10 font-medium">Agree on who does what by when to resolve the issue. Document it in a Jira ticket or email.</p>
                            </div>
                            <div class="bg-slate-50 border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-400 transition-colors">
                                <div class="absolute -right-4 -bottom-4 text-slate-200 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="calendar-check" class="w-24 h-24"></i></div>
                                <span class="font-bold text-indigo-600 text-2xl block mb-2">09. Follow Up</span>
                                <p class="text-slate-700 relative z-10 font-medium">Check in a few days later to ensure the solution worked and the relationship is repaired.</p>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Phase 2: Decision Tree Roleplay -->
                <div id="view-decision" class="conflict-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 flex flex-col h-[600px]">
                        <!-- Chat Header -->
                        <div class="bg-slate-800 p-4 border-b border-slate-700 flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl">QA</div>
                                <div>
                                    <h3 class="text-white font-bold">QA Tester: Mark</h3>
                                    <p class="text-xs text-emerald-400 flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> Online</p>
                                </div>
                            </div>
                            <div class="bg-rose-900/50 text-rose-300 text-xs px-3 py-1 rounded-full border border-rose-500/50 font-bold">
                                Deadline: In 2 Hours
                            </div>
                        </div>

                        <!-- Chat History -->
                        <div class="flex-1 p-6 overflow-y-auto space-y-4" id="conflictHistoryContainer">
                            <div class="flex items-start gap-3 w-3/4">
                                <div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">QA</div>
                                <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                                    <p>I just rejected your latest commit for the login page. It's completely broken on mobile Safari. We deploy in 2 hours. Why wasn't this tested?</p>
                                </div>
                            </div>
                        </div>

                        <!-- Response Options -->
                        <div class="bg-slate-800 p-4 border-t border-slate-700" id="conflictButtonsContainer">
                            <h4 class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Choose Your Response:</h4>
                            <div class="space-y-2" id="conflictButtons">
                                <button onclick="window.submitConflictOption(1, 'defensive')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                                    "I tested it on Chrome and it works fine. Mobile Safari wasn't in the original requirements document."
                                </button>
                                <button onclick="window.submitConflictOption(1, 'aggressive')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                                    "Don't blame me, the designer gave me the wrong CSS. You should be talking to them."
                                </button>
                                <button onclick="window.submitConflictOption(1, 'collaborative')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                                    "I didn't catch that on my end. Can you send me the screenshot and exact iOS version so I can reproduce it immediately?"
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Phase 3: AI Conflict Coach -->
                <div id="view-coach" class="conflict-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
                        
                        <!-- Left: Scenario and Writing Area -->
                        <div class="flex-1 min-w-0 flex flex-col">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                    <i data-lucide="bot" class="w-5 h-5 text-fuchsia-500"></i> AI Conflict Coach
                                </h2>
                                <select id="conflictScenarioSelect" class="bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block p-2 outline-none font-medium w-full sm:w-auto" onchange="window.loadConflictScenario()">
                                    <option value="credit">Scenario 1: Stolen Credit</option>
                                    <option value="missed">Scenario 2: Missed Deadlines</option>
                                    <option value="unrealistic">Scenario 3: Unrealistic Manager</option>
                                </select>
                            </div>
                            
                            <div class="bg-slate-800 rounded-xl p-4 sm:p-5 mb-4 border border-slate-700 relative overflow-hidden">
                                <div class="absolute top-0 left-0 w-1 h-full bg-fuchsia-500"></div>
                                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Conflict Scenario</h3>
                                <p id="conflictScenarioContext" class="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                                    A teammate just presented your code optimization idea as their own in a team meeting. Draft a private message to them addressing this.
                                </p>
                            </div>

                            <!-- Editor -->
                            <div class="flex-1 flex flex-col border border-slate-700 rounded-xl overflow-hidden focus-within:border-fuchsia-500 transition-colors bg-slate-800 shadow-sm min-h-[220px]">
                                <textarea id="conflictDraftBody" class="flex-1 p-3 sm:p-4 outline-none resize-none text-xs sm:text-sm text-slate-200 leading-relaxed font-mono min-h-[140px] bg-transparent" placeholder="Draft your professional message to the teammate..."></textarea>
                                
                                <div class="bg-slate-900 border-t border-slate-700 p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <button onclick="window.evaluateConflictDraft()" class="w-full sm:w-auto bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm">
                                        <i data-lucide="send" class="w-4 h-4"></i> Evaluate Response
                                    </button>
                                    <button onclick="window.clearConflictDraft()" class="w-full sm:w-auto text-slate-400 hover:text-white text-xs sm:text-sm font-medium px-4 py-1.5 transition-colors text-center">Clear</button>
                                </div>
                            </div>
                        </div>

                        <!-- Right: AI Feedback Pane -->
                        <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8 flex flex-col shrink-0">
                            <h2 class="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <i data-lucide="activity" class="w-5 h-5 text-emerald-500"></i> AI Analysis
                            </h2>
                            
                            <div id="aiConflictFeedbackContainer" class="flex-1 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50 min-h-[180px]">
                                <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                                    <i data-lucide="scale" class="w-8 h-8"></i>
                                </div>
                                <p class="text-slate-400 text-xs sm:text-sm font-medium">Type your response to the conflict. The AI will evaluate your use of 'I' statements, tone, and solution-focus.</p>
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
                    <button onclick="window.completeProLesson('${day}')" class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto">
                        Complete Lesson & Claim XP
                    </button>
                `}
            </div>
        </div>
    `;

    mainContent.innerHTML = html;
    window.loadConflictScenario();
    if (window.lucide) window.lucide.createIcons();
};

window.switchConflictTab = (tab) => {
    document.querySelectorAll('.conflict-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    document.querySelectorAll('#tab-process, #tab-decision, #tab-coach').forEach(el => {
        el.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50";
    });
    
    document.getElementById(`view-${tab}`).classList.remove('hidden');
    document.getElementById(`view-${tab}`).classList.add('block');
    
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100 shadow-sm";
};

// Branching Chat Game State
window.submitConflictOption = (step, choiceType) => {
    const historyContainer = document.getElementById('conflictHistoryContainer');
    const buttonsContainer = document.getElementById('conflictButtons');
    
    let userMsg = event.target.innerText;
    
    // Add User Message
    historyContainer.innerHTML += `
        <div class="flex items-start gap-3 w-3/4 ml-auto justify-end">
            <div class="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none border border-blue-700 shadow-sm">
                <p class="text-sm">${userMsg}</p>
            </div>
            <div class="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0"><i data-lucide="user" class="w-4 h-4"></i></div>
        </div>
    `;

    if (choiceType === 'defensive' || choiceType === 'aggressive') {
        // Failure branch (Escalation)
        setTimeout(() => {
            historyContainer.innerHTML += `
                <div class="flex items-start gap-3 w-3/4 mt-4">
                    <div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">QA</div>
                    <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-rose-500">
                        <p class="text-sm text-rose-400 font-bold mb-1">QA Escalates:</p>
                        <p class="text-sm">I'm CC'ing the Project Manager. We can't deploy broken code, and if you aren't going to fix it, I'm blocking the release.</p>
                    </div>
                </div>
            `;
            buttonsContainer.innerHTML = `
                <div class="bg-rose-900/50 p-3 rounded-lg border border-rose-500/50 mb-3">
                    <p class="text-rose-200 text-sm"><b>Conflict Escalated!</b> You became defensive/combative instead of focusing on fixing the immediate problem.</p>
                </div>
                <button onclick="window.resetConflictGame()" class="w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-bold p-3 rounded-lg transition-colors">Try Again</button>
            `;
            historyContainer.scrollTop = historyContainer.scrollHeight;
        }, 800);
    } else if (choiceType === 'collaborative') {
        if (step === 1) {
            // Success step 1, proceed to step 2
            setTimeout(() => {
                historyContainer.innerHTML += `
                    <div class="flex items-start gap-3 w-3/4 mt-4">
                        <div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">QA</div>
                        <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-emerald-500 shadow-lg">
                            <p class="text-sm text-emerald-400 font-bold mb-1">QA Calms Down:</p>
                            <p class="text-sm">Yeah, sending the screenshot now. It looks like a flexbox issue on iOS 16. I know it's tight, can you fix it in 30 mins so I can re-test?</p>
                        </div>
                    </div>
                `;
                buttonsContainer.innerHTML = `
                    <button onclick="window.submitConflictOption(2, 'defensive')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                        "I'll try, but no promises. You guys always test at the last minute."
                    </button>
                    <button onclick="window.submitConflictOption(2, 'collaborative')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                        "Got the screenshot, thanks. I see the issue. I'll push a hotfix in 15 mins and ping you the moment it's deployed to staging."
                    </button>
                `;
                historyContainer.scrollTop = historyContainer.scrollHeight;
                if (window.lucide) window.lucide.createIcons();
            }, 800);
        } else if (step === 2) {
            // Victory
            setTimeout(() => {
                historyContainer.innerHTML += `
                    <div class="flex items-start gap-3 w-3/4 mt-4">
                        <div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">QA</div>
                        <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-emerald-500 shadow-lg">
                            <p class="text-sm text-emerald-400 font-bold mb-1">QA Collaborates:</p>
                            <p class="text-sm">Awesome. I'll stand by and refresh staging as soon as you ping me. Let's get this deployment out!</p>
                        </div>
                    </div>
                `;
                buttonsContainer.innerHTML = `
                    <div class="bg-emerald-900/50 p-4 rounded-lg border border-emerald-500 mb-3 text-center">
                        <i data-lucide="check-circle" class="w-8 h-8 text-emerald-400 mx-auto mb-2"></i>
                        <h4 class="text-emerald-300 font-bold mb-1">Conflict Resolved!</h4>
                        <p class="text-emerald-100 text-sm">You ignored the aggressive tone, focused on the facts (the bug), and proposed a clear action plan. True professionalism!</p>
                    </div>
                    <button onclick="window.resetConflictGame()" class="w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-bold p-3 rounded-lg transition-colors">Play Again</button>
                `;
                historyContainer.scrollTop = historyContainer.scrollHeight;
                if (window.lucide) window.lucide.createIcons();
            }, 800);
        }
    }
    setTimeout(() => { historyContainer.scrollTop = historyContainer.scrollHeight; }, 50);
    if (window.lucide) window.lucide.createIcons();
};

window.resetConflictGame = () => {
    document.getElementById('conflictHistoryContainer').innerHTML = `
        <div class="flex items-start gap-3 w-3/4">
            <div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">QA</div>
            <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                <p>I just rejected your latest commit for the login page. It's completely broken on mobile Safari. We deploy in 2 hours. Why wasn't this tested?</p>
            </div>
        </div>
    `;
    document.getElementById('conflictButtons').innerHTML = `
        <button onclick="window.submitConflictOption(1, 'defensive')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
            "I tested it on Chrome and it works fine. Mobile Safari wasn't in the original requirements document."
        </button>
        <button onclick="window.submitConflictOption(1, 'aggressive')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
            "Don't blame me, the designer gave me the wrong CSS. You should be talking to them."
        </button>
        <button onclick="window.submitConflictOption(1, 'collaborative')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
            "I didn't catch that on my end. Can you send me the screenshot and exact iOS version so I can reproduce it immediately?"
        </button>
    `;
};


// Conflict Coach Logic
window.conflictScenarios = {
    'credit': {
        context: "A teammate just presented your code optimization idea as their own in a team meeting. Draft a private message to them addressing this.",
    },
    'missed': {
        context: "Your teammate has missed their deadline three times this week, blocking your work. Draft a message to discuss it with them.",
    },
    'unrealistic': {
        context: "Your manager just assigned you 4 days worth of work and said 'I need this done by tomorrow morning'. Draft a professional response to push back."
    }
};

window.loadConflictScenario = () => {
    const val = document.getElementById('conflictScenarioSelect').value;
    const scenario = window.conflictScenarios[val];
    document.getElementById('conflictScenarioContext').innerText = scenario.context;
    document.getElementById('conflictDraftBody').value = '';
    
    document.getElementById('aiConflictFeedbackContainer').innerHTML = `
        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
            <i data-lucide="scale" class="w-8 h-8"></i>
        </div>
        <p class="text-slate-400 text-sm font-medium">Type your response to the conflict. The AI will evaluate your use of 'I' statements, tone, and solution-focus.</p>
    `;
    if (window.lucide) window.lucide.createIcons();
};

window.clearConflictDraft = () => {
    document.getElementById('conflictDraftBody').value = '';
};

window.evaluateConflictDraft = () => {
    const body = document.getElementById('conflictDraftBody').value.trim();
    const container = document.getElementById('aiConflictFeedbackContainer');

    if (!body) {
        container.innerHTML = `<p class="text-fuchsia-500 font-bold">Please draft a response first!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-fuchsia-500 mb-4"></div>
        <p class="text-fuchsia-500 font-medium">Analyzing tone and structure...</p>
    `;

    setTimeout(() => {
        let score = 100;
        let feedbackHTML = '';
        const val = document.getElementById('conflictScenarioSelect').value;

        // General aggressive checks
        if (/\b(stole|liar|never|always|stupid|ridiculous|impossible)\b/i.test(body) || body.includes('!')) {
            score -= 30;
            feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Aggressive Tone:</b> Avoid exclamation points and absolute words like 'never', 'always', or 'stole'. This instantly creates a fight.</p></div></div>`;
        }

        // Credit logic
        if (val === 'credit') {
            if (/\b(you took|you stole|my idea)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Accusatory 'You' Statement:</b> Don't say 'You stole my idea'. Instead use 'I' statements: 'I noticed my optimization idea was presented...'</p></div></div>`;
            }
        }

        // Missed logic
        if (val === 'missed') {
            if (/\b(you missed|you are blocking|you didn't)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Accusatory 'You' Statement:</b> Say 'I am blocked because the task isn't ready', rather than 'You are blocking me'. Focus on the work, not the person.</p></div></div>`;
            }
            if (!/\b(help|support|can I|do you need)\b/i.test(body)) {
                score -= 10;
                feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="info" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Missed Opportunity:</b> Offer help. They might be struggling with a bug or personal issue.</p></div></div>`;
            }
        }

        // Unrealistic logic
        if (val === 'unrealistic') {
            if (/\b(no|can't do|won't do)\b/i.test(body) && !/\b(prioritize|drop|push back|instead)\b/i.test(body)) {
                score -= 25;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Unprofessional Refusal:</b> Don't just say 'no'. Say 'I can do X by tomorrow, but Y will need to wait until Monday. Which is higher priority?'</p></div></div>`;
            }
        }

        if (score === 100) {
            feedbackHTML += `<div class="bg-emerald-900/50 border border-emerald-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-200"><b>Excellent!</b> High emotional intelligence. You focused on facts, used 'I' statements, and stayed solution-oriented.</p></div></div>`;
        } else if (score >= 70) {
            feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Good effort.</b> Review the feedback to improve your phrasing.</p></div></div>`;
        }

        container.innerHTML = `
            <div class="w-full flex flex-col items-center bg-slate-900 p-2 rounded-xl shadow-sm mb-4 border border-slate-700">
                <div class="text-3xl font-extrabold text-${score > 70 ? 'emerald' : 'rose'}-500">${score}/100</div>
                <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Resolution Score</div>
            </div>
            <div class="w-full space-y-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                ${feedbackHTML}
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

    }, 1200);
};
