window.renderNegotiationModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-rose-50 rounded-lg text-rose-600 hidden sm:block"><i data-lucide="handshake" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: Negotiation & Persuasion</span>`;
    }

    let progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    let isCompleted = progress.completedLessons && progress.completedLessons.includes(`pro_${day}`);

    let html = `
        <div class="animate-fade-in mx-auto space-y-12 pb-20 bg-slate-50 min-h-screen">
            
            <!-- HEADER -->
            <div class="relative bg-gradient-to-r from-rose-700 to-orange-800 rounded-b-3xl sm:rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden text-white mb-8 mx-auto max-w-6xl mt-4">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8">
                        <div class="w-20 sm:w-24 h-20 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0 shadow-inner">
                            <i data-lucide="target" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-rose-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">Negotiation & Persuasion</h1>
                            <p class="text-rose-50 text-lg max-w-2xl">Learn how to confidently negotiate deadlines, push back on scope creep, and achieve Win-Win outcomes using facts and alternatives.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4 space-y-8" id="negotiation-sim-container">
                
                <!-- Navigation Tabs -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap gap-2 mb-6">
                    <button onclick="window.switchNegotiationTab('framework')" id="tab-framework" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-rose-50 text-rose-700 border border-rose-100 shadow-sm">
                        <i data-lucide="layout-template" class="w-5 h-5"></i> The Win-Win Framework
                    </button>
                    <button onclick="window.switchNegotiationTab('roleplay')" id="tab-roleplay" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="git-branch" class="w-5 h-5"></i> Negotiation Roleplay
                    </button>
                    <button onclick="window.switchNegotiationTab('coach')" id="tab-coach" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="bot" class="w-5 h-5"></i> AI Persuasion Coach
                    </button>
                </div>

                <!-- Phase 1: Framework -->
                <div id="view-framework" class="negotiation-view block animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div class="p-2 bg-orange-100 text-orange-600 rounded-lg"><i data-lucide="bar-chart-3"></i></div>
                            The Pillars of Corporate Persuasion
                        </h2>
                        <p class="text-slate-600 mb-8 text-lg">In the IT industry, you cannot negotiate using emotions or demands. You must use facts, logic, and compromises.</p>
                        
                        <div class="space-y-6">
                            <div class="flex flex-col md:flex-row gap-6">
                                <div class="flex-1 bg-gradient-to-br from-rose-50 to-orange-50 p-6 rounded-xl border border-rose-100 shadow-sm">
                                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-600 mb-4 shadow-sm">
                                        <i data-lucide="file-search"></i>
                                    </div>
                                    <h3 class="font-bold text-slate-800 text-xl mb-2">1. Logic & Facts</h3>
                                    <p class="text-slate-600">Never say "I can't do this, it's too hard." Say "This feature requires rewriting the database schema, which adds 3 days of development time."</p>
                                </div>
                                <div class="flex-1 bg-gradient-to-br from-rose-50 to-orange-50 p-6 rounded-xl border border-rose-100 shadow-sm">
                                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-600 mb-4 shadow-sm">
                                        <i data-lucide="split"></i>
                                    </div>
                                    <h3 class="font-bold text-slate-800 text-xl mb-2">2. Provide Alternatives</h3>
                                    <p class="text-slate-600">Never just say "No." Always offer a trade-off. "I cannot build the chat feature by Friday, but I can deliver the email notifications by Friday."</p>
                                </div>
                                <div class="flex-1 bg-gradient-to-br from-rose-50 to-orange-50 p-6 rounded-xl border border-rose-100 shadow-sm">
                                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-600 mb-4 shadow-sm">
                                        <i data-lucide="users"></i>
                                    </div>
                                    <h3 class="font-bold text-slate-800 text-xl mb-2">3. The Win-Win Goal</h3>
                                    <p class="text-slate-600">Understand the other person's goal. Your manager doesn't want you to work 80 hours a week; they just want the client to be happy. Solve for that goal.</p>
                                </div>
                            </div>
                            
                            <div class="bg-slate-50 border border-slate-200 rounded-xl p-6 mt-8">
                                <h3 class="font-bold text-slate-800 mb-4">The 10-Step Negotiation Process:</h3>
                                <div class="flex flex-wrap gap-2">
                                    <span class="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm font-medium text-slate-700 shadow-sm">1. Identify</span>
                                    <span class="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm font-medium text-slate-700 shadow-sm">2. Prepare Facts</span>
                                    <span class="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm font-medium text-slate-700 shadow-sm">3. Understand</span>
                                    <span class="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm font-medium text-slate-700 shadow-sm">4. Explain</span>
                                    <span class="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm font-medium text-slate-700 shadow-sm">5. Listen</span>
                                    <span class="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm font-medium text-slate-700 shadow-sm">6. Explore Solutions</span>
                                    <span class="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm font-medium text-slate-700 shadow-sm">7. Negotiate</span>
                                    <span class="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm font-medium text-slate-700 shadow-sm">8. Agree</span>
                                    <span class="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm font-medium text-slate-700 shadow-sm">9. Document</span>
                                    <span class="px-3 py-1 bg-white border border-slate-300 rounded-full text-sm font-medium text-slate-700 shadow-sm">10. Follow Up</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Phase 2: Roleplay -->
                <div id="view-roleplay" class="negotiation-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 flex flex-col h-[600px]">
                        <!-- Chat Header -->
                        <div class="bg-slate-800 p-4 border-b border-slate-700 flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl">PM</div>
                                <div>
                                    <h3 class="text-white font-bold">Project Manager: Sarah</h3>
                                    <p class="text-xs text-emerald-400 flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> Online</p>
                                </div>
                            </div>
                            <div class="bg-orange-900/50 text-orange-300 text-xs px-3 py-1 rounded-full border border-orange-500/50 font-bold">
                                Objective: Negotiate Deadline
                            </div>
                        </div>

                        <!-- Chat History -->
                        <div class="flex-1 p-6 overflow-y-auto space-y-4" id="negHistoryContainer">
                            <div class="flex items-start gap-3 w-3/4">
                                <div class="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">PM</div>
                                <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                                    <p>Hey, the client just asked if we can include the new Payment Gateway integration in Friday's release. I told them we would try. Can you get it done?</p>
                                </div>
                            </div>
                        </div>

                        <!-- Response Options -->
                        <div class="bg-slate-800 p-4 border-t border-slate-700" id="negButtonsContainer">
                            <h4 class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Choose Your Response:</h4>
                            <div class="space-y-2" id="negButtons">
                                <button onclick="window.submitNegOption(1, 'weak')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                                    "I guess so, but I'll probably have to work all night and weekend to finish it."
                                </button>
                                <button onclick="window.submitNegOption(1, 'aggressive')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                                    "No way. You shouldn't have promised that to the client without asking me first. It's impossible."
                                </button>
                                <button onclick="window.submitNegOption(1, 'negotiate')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                                    "The Payment Gateway requires 3 days of development and 1 day of testing. If we add it to Friday's release, we will have to drop another feature. Which one should we deprioritize?"
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Phase 3: AI Persuasion Coach -->
                <div id="view-coach" class="negotiation-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
                        
                        <!-- Left: Scenario and Writing Area -->
                        <div class="flex-1 min-w-0 flex flex-col">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                    <i data-lucide="bot" class="w-5 h-5 text-orange-500"></i> AI Persuasion Coach
                                </h2>
                                <select id="negScenarioSelect" class="bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 outline-none font-medium w-full sm:w-auto" onchange="window.loadNegScenario()">
                                    <option value="extension">Scenario 1: Requesting an Extension</option>
                                    <option value="scope">Scenario 2: Pushing Back on Scope Creep</option>
                                    <option value="workload">Scenario 3: Discussing Overload</option>
                                </select>
                            </div>
                            
                            <div class="bg-slate-800 rounded-xl p-4 sm:p-5 mb-4 border border-slate-700 relative overflow-hidden">
                                <div class="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Negotiation Scenario</h3>
                                <p id="negScenarioContext" class="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                                    You discovered massive technical debt in the legacy code. You need 2 extra weeks to safely complete the migration. Draft an email to your manager asking for an extension.
                                </p>
                            </div>

                            <!-- Editor -->
                            <div class="flex-1 flex flex-col border border-slate-700 rounded-xl overflow-hidden focus-within:border-orange-500 transition-colors bg-slate-800 shadow-sm min-h-[220px]">
                                <textarea id="negDraftBody" class="flex-1 p-3 sm:p-4 outline-none resize-none text-xs sm:text-sm text-slate-200 leading-relaxed font-mono min-h-[140px] bg-transparent" placeholder="Draft your professional negotiation email..."></textarea>
                                
                                <div class="bg-slate-900 border-t border-slate-700 p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <button onclick="window.evaluateNegDraft()" class="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm">
                                        <i data-lucide="send" class="w-4 h-4"></i> Evaluate Persuasion
                                    </button>
                                    <button onclick="window.clearNegDraft()" class="w-full sm:w-auto text-slate-400 hover:text-white text-xs sm:text-sm font-medium px-4 py-1.5 transition-colors text-center">Clear</button>
                                </div>
                            </div>
                        </div>

                        <!-- Right: AI Feedback Pane -->
                        <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8 flex flex-col shrink-0">
                            <h2 class="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <i data-lucide="activity" class="w-5 h-5 text-emerald-500"></i> AI Analysis
                            </h2>
                            
                            <div id="aiNegFeedbackContainer" class="flex-1 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50 min-h-[180px]">
                                <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                                    <i data-lucide="target" class="w-8 h-8"></i>
                                </div>
                                <p class="text-slate-400 text-xs sm:text-sm font-medium">Type your negotiation response. The AI will evaluate your use of facts, alternatives, and professional tone.</p>
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
    window.loadNegScenario();
    if (window.lucide) window.lucide.createIcons();
};

window.switchNegotiationTab = (tab) => {
    document.querySelectorAll('.negotiation-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    document.querySelectorAll('#tab-framework, #tab-roleplay, #tab-coach').forEach(el => {
        el.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50";
    });
    
    document.getElementById(`view-${tab}`).classList.remove('hidden');
    document.getElementById(`view-${tab}`).classList.add('block');
    
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-rose-50 text-rose-700 border border-rose-100 shadow-sm";
};

// Branching Chat Game State
window.submitNegOption = (step, choiceType) => {
    const historyContainer = document.getElementById('negHistoryContainer');
    const buttonsContainer = document.getElementById('negButtons');
    
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

    if (choiceType === 'weak') {
        setTimeout(() => {
            historyContainer.innerHTML += `
                <div class="flex items-start gap-3 w-3/4 mt-4">
                    <div class="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">PM</div>
                    <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-rose-500">
                        <p class="text-sm text-rose-400 font-bold mb-1">PM Accepts Weakness:</p>
                        <p class="text-sm">Great, I'll tell the client it will be ready. Thanks for stepping up!</p>
                    </div>
                </div>
            `;
            buttonsContainer.innerHTML = `
                <div class="bg-rose-900/50 p-3 rounded-lg border border-rose-500/50 mb-3">
                    <p class="text-rose-200 text-sm"><b>Negotiation Failed!</b> You accepted impossible scope creep without pushing back. You will burn out and the code will suffer.</p>
                </div>
                <button onclick="window.resetNegGame()" class="w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-bold p-3 rounded-lg transition-colors">Try Again</button>
            `;
            historyContainer.scrollTop = historyContainer.scrollHeight;
        }, 800);
    } else if (choiceType === 'aggressive') {
        setTimeout(() => {
            historyContainer.innerHTML += `
                <div class="flex items-start gap-3 w-3/4 mt-4">
                    <div class="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">PM</div>
                    <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-rose-500">
                        <p class="text-sm text-rose-400 font-bold mb-1">PM Gets Defensive:</p>
                        <p class="text-sm">Excuse me? It's my job to manage the client. If you can't handle the workload, I'll find someone who can.</p>
                    </div>
                </div>
            `;
            buttonsContainer.innerHTML = `
                <div class="bg-rose-900/50 p-3 rounded-lg border border-rose-500/50 mb-3">
                    <p class="text-rose-200 text-sm"><b>Negotiation Failed!</b> You attacked the PM and ruined the relationship. Always separate the person from the problem.</p>
                </div>
                <button onclick="window.resetNegGame()" class="w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-bold p-3 rounded-lg transition-colors">Try Again</button>
            `;
            historyContainer.scrollTop = historyContainer.scrollHeight;
        }, 800);
    } else if (choiceType === 'negotiate') {
        if (step === 1) {
            setTimeout(() => {
                historyContainer.innerHTML += `
                    <div class="flex items-start gap-3 w-3/4 mt-4">
                        <div class="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">PM</div>
                        <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-emerald-500 shadow-lg">
                            <p class="text-sm text-emerald-400 font-bold mb-1">PM Considers Options:</p>
                            <p class="text-sm">Ah, I didn't realize it took 3 days. We can't drop the login update, but the profile picture feature isn't urgent. If we drop that, can you guarantee the gateway for Friday?</p>
                        </div>
                    </div>
                `;
                buttonsContainer.innerHTML = `
                    <button onclick="window.submitNegOption(2, 'weak')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                        "Maybe, but only if nobody talks to me for the next 3 days."
                    </button>
                    <button onclick="window.submitNegOption(2, 'negotiate')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                        "Yes. If we drop the profile picture feature from this sprint, I can dedicate my full time to the payment gateway and have it ready for QA by Thursday afternoon."
                    </button>
                `;
                historyContainer.scrollTop = historyContainer.scrollHeight;
                if (window.lucide) window.lucide.createIcons();
            }, 800);
        } else if (step === 2) {
            setTimeout(() => {
                historyContainer.innerHTML += `
                    <div class="flex items-start gap-3 w-3/4 mt-4">
                        <div class="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">PM</div>
                        <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-emerald-500 shadow-lg">
                            <p class="text-sm text-emerald-400 font-bold mb-1">PM Agrees (Win-Win):</p>
                            <p class="text-sm">Perfect. That's a great compromise. I'll update the client and move the profile ticket to the backlog.</p>
                        </div>
                    </div>
                `;
                buttonsContainer.innerHTML = `
                    <div class="bg-emerald-900/50 p-4 rounded-lg border border-emerald-500 mb-3 text-center">
                        <i data-lucide="check-circle" class="w-8 h-8 text-emerald-400 mx-auto mb-2"></i>
                        <h4 class="text-emerald-300 font-bold mb-1">Win-Win Achieved!</h4>
                        <p class="text-emerald-100 text-sm">You used facts (development time) and offered an alternative (swapping features). You protected your workload while keeping the PM happy.</p>
                    </div>
                    <button onclick="window.resetNegGame()" class="w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-bold p-3 rounded-lg transition-colors">Play Again</button>
                `;
                historyContainer.scrollTop = historyContainer.scrollHeight;
                if (window.lucide) window.lucide.createIcons();
            }, 800);
        }
    }
    setTimeout(() => { historyContainer.scrollTop = historyContainer.scrollHeight; }, 50);
    if (window.lucide) window.lucide.createIcons();
};

window.resetNegGame = () => {
    document.getElementById('negHistoryContainer').innerHTML = `
        <div class="flex items-start gap-3 w-3/4">
            <div class="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">PM</div>
            <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                <p>Hey, the client just asked if we can include the new Payment Gateway integration in Friday's release. I told them we would try. Can you get it done?</p>
            </div>
        </div>
    `;
    document.getElementById('negButtons').innerHTML = `
        <button onclick="window.submitNegOption(1, 'weak')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
            "I guess so, but I'll probably have to work all night and weekend to finish it."
        </button>
        <button onclick="window.submitNegOption(1, 'aggressive')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
            "No way. You shouldn't have promised that to the client without asking me first. It's impossible."
        </button>
        <button onclick="window.submitNegOption(1, 'negotiate')" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
            "The Payment Gateway requires 3 days of development and 1 day of testing. If we add it to Friday's release, we will have to drop another feature. Which one should we deprioritize?"
        </button>
    `;
};


// Coach Logic
window.negScenarios = {
    'extension': {
        context: "You discovered massive technical debt in the legacy code. You need 2 extra weeks to safely complete the migration. Draft an email to your manager asking for an extension.",
    },
    'scope': {
        context: "The client asked you to 'quickly' build an admin dashboard during a meeting. It will take a month. Push back politely but firmly.",
    },
    'workload': {
        context: "Your team lead assigned you 3 high-priority critical bugs to fix by tomorrow. You can only physically fix 1. Draft a message negotiating priorities."
    }
};

window.loadNegScenario = () => {
    const val = document.getElementById('negScenarioSelect').value;
    const scenario = window.negScenarios[val];
    document.getElementById('negScenarioContext').innerText = scenario.context;
    document.getElementById('negDraftBody').value = '';
    
    document.getElementById('aiNegFeedbackContainer').innerHTML = `
        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
            <i data-lucide="target" class="w-8 h-8"></i>
        </div>
        <p class="text-slate-400 text-sm font-medium">Type your negotiation response. The AI will evaluate your use of facts, alternatives, and professional tone.</p>
    `;
    if (window.lucide) window.lucide.createIcons();
};

window.clearNegDraft = () => {
    document.getElementById('negDraftBody').value = '';
};

window.evaluateNegDraft = () => {
    const body = document.getElementById('negDraftBody').value.trim();
    const container = document.getElementById('aiNegFeedbackContainer');

    if (!body) {
        container.innerHTML = `<p class="text-orange-500 font-bold">Please draft a response first!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mb-4"></div>
        <p class="text-orange-500 font-medium">Analyzing negotiation tactics...</p>
    `;

    setTimeout(() => {
        let score = 100;
        let feedbackHTML = '';
        const val = document.getElementById('negScenarioSelect').value;

        // Common weak/aggressive words
        if (/\b(I guess|maybe|sorry but|impossible|I can't|won't)\b/i.test(body)) {
            score -= 20;
            feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Weak/Negative Language:</b> Avoid saying 'impossible' or 'I guess'. Speak confidently about what IS possible.</p></div></div>`;
        }

        // Must offer alternative
        if (!/\b(instead|alternative|prioritize|drop|trade-off|if we|we could|estimate|phase)\b/i.test(body)) {
            score -= 30;
            feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>No Alternative Offered:</b> The golden rule of negotiation is offering a trade-off. Never just say 'no'. Offer an alternative (e.g. 'we can do X if we drop Y').</p></div></div>`;
        }

        // Extension logic
        if (val === 'extension') {
            if (!/\b(technical debt|legacy|risk|quality|bugs|crash|safe)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Missing Facts/Logic:</b> You must justify the extension with facts (e.g. reducing risk, ensuring quality, technical debt). Don't just say 'it takes longer'.</p></div></div>`;
            }
        }

        // Scope logic
        if (val === 'scope') {
            if (/\b(not my job|don't want to|no)\b/i.test(body) && !/\b(estimate|backlog|phase 2|future)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Poor Boundary Setting:</b> Tell the client you can add it to the backlog or provide an estimate for Phase 2, rather than a flat refusal.</p></div></div>`;
            }
        }

        // Workload logic
        if (val === 'workload') {
            if (!/\b(priority|which one|most important)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Missing Prioritization:</b> You must ask the Team Lead which of the 3 bugs is the absolute highest priority.</p></div></div>`;
            }
        }

        if (score === 100) {
            feedbackHTML += `<div class="bg-emerald-900/50 border border-emerald-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-200"><b>Excellent Negotiation!</b> You stated the facts calmly, avoided weak language, and offered a logical alternative/compromise.</p></div></div>`;
        } else if (score >= 70) {
            feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Good effort.</b> Review the feedback to sharpen your persuasion skills.</p></div></div>`;
        }

        container.innerHTML = `
            <div class="w-full flex flex-col items-center bg-slate-900 p-2 rounded-xl shadow-sm mb-4 border border-slate-700">
                <div class="text-3xl font-extrabold text-${score > 70 ? 'emerald' : 'rose'}-500">${score}/100</div>
                <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Persuasion Score</div>
            </div>
            <div class="w-full space-y-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                ${feedbackHTML}
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

    }, 1200);
};
