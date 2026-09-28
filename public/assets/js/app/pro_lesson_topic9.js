window.renderClientCommModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-blue-50 rounded-lg text-blue-600 hidden sm:block"><i data-lucide="handshake" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: Client Communication</span>`;
    }

    let progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    let isCompleted = progress.completedLessons && progress.completedLessons.includes(`pro_${day}`);

    let html = `
        <div class="animate-fade-in mx-auto space-y-12 pb-20 bg-slate-50 min-h-screen">
            
            <!-- HEADER -->
            <div class="relative bg-gradient-to-r from-blue-700 to-indigo-800 rounded-b-3xl sm:rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden text-white mb-8 mx-auto max-w-6xl mt-4">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8">
                        <div class="w-20 sm:w-24 h-20 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0 shadow-inner">
                            <i data-lucide="handshake" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-blue-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">Client Communication</h1>
                            <p class="text-blue-50 text-lg max-w-2xl">Master the art of gathering requirements, providing professional updates, and handling angry clients without losing your cool.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4 space-y-8" id="client-sim-container">
                
                <!-- Navigation Tabs -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap gap-2 mb-6">
                    <button onclick="window.switchClientTab('lifecycle')" id="tab-lifecycle" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-blue-50 text-blue-700 border border-blue-100 shadow-sm">
                        <i data-lucide="git-commit" class="w-5 h-5"></i> The Client Lifecycle
                    </button>
                    <button onclick="window.switchClientTab('roleplay')" id="tab-roleplay" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="message-square" class="w-5 h-5"></i> Requirement Gathering
                    </button>
                    <button onclick="window.switchClientTab('escalation')" id="tab-escalation" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="shield-alert" class="w-5 h-5"></i> Escalation Coach
                    </button>
                </div>

                <!-- Phase 1: Client Lifecycle -->
                <div id="view-lifecycle" class="client-view block animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div class="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><i data-lucide="git-commit"></i></div>
                            The IT Client Communication Lifecycle
                        </h2>
                        <p class="text-slate-600 mb-8 text-lg">Communication changes depending on where you are in the project. Click each phase to learn the professional vocabulary.</p>
                        
                        <div class="space-y-6">
                            <!-- Phase: Introduction -->
                            <div class="border border-slate-200 rounded-xl overflow-hidden">
                                <button class="w-full bg-slate-50 p-4 text-left font-bold text-slate-800 flex justify-between items-center hover:bg-slate-100 transition-colors" onclick="this.nextElementSibling.classList.toggle('hidden')">
                                    <div class="flex items-center gap-3"><span class="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> Project Kickoff & Introductions</div>
                                    <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400"></i>
                                </button>
                                <div class="p-6 bg-white border-t border-slate-200 hidden">
                                    <p class="text-slate-600 mb-4">The first meeting sets the tone. Your goal is to build trust and establish communication channels.</p>
                                    <div class="bg-blue-50 text-blue-900 p-4 rounded-lg font-mono text-sm border-l-4 border-blue-500 space-y-2">
                                        <p>"Good morning, everyone. Thank you for joining us today."</p>
                                        <p>"My name is [Name], and I will be the lead developer on this project."</p>
                                        <p>"We prefer using Slack for daily queries and Email for formal approvals. Does that work for your team?"</p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Phase: Requirements -->
                            <div class="border border-slate-200 rounded-xl overflow-hidden">
                                <button class="w-full bg-slate-50 p-4 text-left font-bold text-slate-800 flex justify-between items-center hover:bg-slate-100 transition-colors" onclick="this.nextElementSibling.classList.toggle('hidden')">
                                    <div class="flex items-center gap-3"><span class="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> Requirement Gathering</div>
                                    <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400"></i>
                                </button>
                                <div class="p-6 bg-white border-t border-slate-200 hidden">
                                    <p class="text-slate-600 mb-4">Clients rarely know exactly what they want technically. You must ask probing, open-ended questions without making them feel stupid.</p>
                                    <div class="bg-blue-50 text-blue-900 p-4 rounded-lg font-mono text-sm border-l-4 border-blue-500 space-y-2">
                                        <p>"Could you please elaborate on what you mean by 'fast'?"</p>
                                        <p>"Just to confirm my understanding, you want the user to log in before seeing the dashboard, correct?"</p>
                                        <p>"What is the primary business goal for this specific feature?"</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Phase: Status Updates -->
                            <div class="border border-slate-200 rounded-xl overflow-hidden">
                                <button class="w-full bg-slate-50 p-4 text-left font-bold text-slate-800 flex justify-between items-center hover:bg-slate-100 transition-colors" onclick="this.nextElementSibling.classList.toggle('hidden')">
                                    <div class="flex items-center gap-3"><span class="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span> Daily/Weekly Status Updates</div>
                                    <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400"></i>
                                </button>
                                <div class="p-6 bg-white border-t border-slate-200 hidden">
                                    <p class="text-slate-600 mb-4">Clients hate silence. Regular, transparent updates keep them calm, even if there are delays.</p>
                                    <div class="bg-blue-50 text-blue-900 p-4 rounded-lg font-mono text-sm border-l-4 border-blue-500 space-y-2">
                                        <p>"Development is progressing as planned. We have completed the UI phase."</p>
                                        <p>"We encountered a minor issue with the API integration, but we expect to resolve it by tomorrow. The overall deadline is not impacted."</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Phase: Demos -->
                            <div class="border border-slate-200 rounded-xl overflow-hidden">
                                <button class="w-full bg-slate-50 p-4 text-left font-bold text-slate-800 flex justify-between items-center hover:bg-slate-100 transition-colors" onclick="this.nextElementSibling.classList.toggle('hidden')">
                                    <div class="flex items-center gap-3"><span class="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span> Demos & UAT (User Acceptance Testing)</div>
                                    <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400"></i>
                                </button>
                                <div class="p-6 bg-white border-t border-slate-200 hidden">
                                    <p class="text-slate-600 mb-4">When showing software to a client, avoid technical jargon. Speak in terms of business value.</p>
                                    <div class="bg-blue-50 text-blue-900 p-4 rounded-lg font-mono text-sm border-l-4 border-blue-500 space-y-2">
                                        <p><span class="text-rose-500 line-through">"We hit the REST endpoint and the JSON payload rendered the DOM."</span></p>
                                        <p class="text-emerald-700 font-bold">"As you can see, when the user clicks this button, their data loads instantly on the screen."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Phase 2: Requirement Gathering Roleplay -->
                <div id="view-roleplay" class="client-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 flex flex-col h-[600px]">
                        <!-- Chat Header -->
                        <div class="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-4">
                            <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">C</div>
                            <div>
                                <h3 class="text-white font-bold">Client: Mr. Anderson</h3>
                                <p class="text-xs text-emerald-400 flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> Online</p>
                            </div>
                        </div>

                        <!-- Chat History -->
                        <div class="flex-1 p-6 overflow-y-auto space-y-4" id="chatHistoryContainer">
                            <div class="flex items-start gap-3 w-3/4">
                                <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">C</div>
                                <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                                    <p>Hi team, we need an e-commerce website built for our shoe company. We want it to be really fast and look amazing.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Response Options -->
                        <div class="bg-slate-800 p-4 border-t border-slate-700" id="chatOptionsContainer">
                            <h4 class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Choose Your Response:</h4>
                            <div class="space-y-2" id="chatButtons">
                                <button onclick="window.submitChatOption(1, false)" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                                    "Sure, we can do that. Will it be React or Angular?"
                                </button>
                                <button onclick="window.submitChatOption(1, true)" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                                    "Great! Could you elaborate on what you mean by 'fast'? Are we talking about page load times, or a fast checkout process?"
                                </button>
                                <button onclick="window.submitChatOption(1, false)" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                                    "Okay, we will start designing it tomorrow."
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Phase 3: Escalation AI Coach -->
                <div id="view-escalation" class="client-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
                        
                        <!-- Left: Scenario and Writing Area -->
                        <div class="flex-1 min-w-0 flex flex-col">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                    <i data-lucide="shield-alert" class="w-5 h-5 text-rose-500"></i> Escalation Coach
                                </h2>
                                <select id="escalationScenarioSelect" class="bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none font-medium w-full sm:w-auto" onchange="window.loadEscalationScenario()">
                                    <option value="delay">Scenario 1: Project Delay</option>
                                    <option value="bug">Scenario 2: Production Bug</option>
                                    <option value="scope">Scenario 3: Scope Creep</option>
                                </select>
                            </div>
                            
                            <div class="bg-slate-800 rounded-xl p-4 sm:p-5 mb-4 border border-slate-700 relative overflow-hidden">
                                <div class="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">High-Stress Scenario</h3>
                                <p id="escalationScenarioContext" class="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                                    You promised the client the new feature would be ready by Friday. It's Thursday evening and your team found a critical bug. It will take 3 more days. Draft an email to the client.
                                </p>
                            </div>

                            <!-- Editor -->
                            <div class="flex-1 flex flex-col border border-slate-700 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors bg-slate-800 shadow-sm min-h-[220px]">
                                <textarea id="escalationDraftBody" class="flex-1 p-3 sm:p-4 outline-none resize-none text-xs sm:text-sm text-slate-200 leading-relaxed font-mono min-h-[140px] bg-transparent" placeholder="Draft your professional response to the client..."></textarea>
                                
                                <div class="bg-slate-900 border-t border-slate-700 p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <button onclick="window.evaluateEscalationDraft()" class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm">
                                        <i data-lucide="send" class="w-4 h-4"></i> Evaluate Response
                                    </button>
                                    <button onclick="window.clearEscalationDraft()" class="w-full sm:w-auto text-slate-400 hover:text-white text-xs sm:text-sm font-medium px-4 py-1.5 transition-colors text-center">Clear</button>
                                </div>
                            </div>
                        </div>

                        <!-- Right: AI Feedback Pane -->
                        <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8 flex flex-col shrink-0">
                            <h2 class="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <i data-lucide="activity" class="w-5 h-5 text-emerald-500"></i> AI Analysis
                            </h2>
                            
                            <div id="aiEscalationFeedbackContainer" class="flex-1 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50 min-h-[180px]">
                                <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                                    <i data-lucide="shield-alert" class="w-8 h-8"></i>
                                </div>
                                <p class="text-slate-400 text-xs sm:text-sm font-medium">Type your response to the angry or confused client. The AI will evaluate your empathy, accountability, and professionalism.</p>
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
    window.loadEscalationScenario();
    if (window.lucide) window.lucide.createIcons();
};

window.switchClientTab = (tab) => {
    document.querySelectorAll('.client-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    document.querySelectorAll('#tab-lifecycle, #tab-roleplay, #tab-escalation').forEach(el => {
        el.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50";
    });
    
    document.getElementById(`view-${tab}`).classList.remove('hidden');
    document.getElementById(`view-${tab}`).classList.add('block');
    
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-blue-50 text-blue-700 border border-blue-100 shadow-sm";
};

// Branching Chat Game State
window.chatState = 1;
window.submitChatOption = (step, isCorrect) => {
    const historyContainer = document.getElementById('chatHistoryContainer');
    const buttonsContainer = document.getElementById('chatButtons');
    
    let userMsg = '';
    if (step === 1) {
        userMsg = isCorrect ? "Great! Could you elaborate on what you mean by 'fast'? Are we talking about page load times, or a fast checkout process?" : (event.target.innerText || "Sure, we can do that.");
    } else if (step === 2) {
        userMsg = isCorrect ? "Understood. For the 'amazing look', do you have any reference websites you admire? Or a brand style guide?" : (event.target.innerText || "Okay, I will tell the designer to make it look good.");
    }
    
    // Add User Message
    historyContainer.innerHTML += `
        <div class="flex items-start gap-3 w-3/4 ml-auto justify-end">
            <div class="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none border border-blue-700 shadow-sm">
                <p class="text-sm">${userMsg}</p>
            </div>
            <div class="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0"><i data-lucide="user" class="w-4 h-4"></i></div>
        </div>
    `;

    if (!isCorrect) {
        // Failure branch
        historyContainer.innerHTML += `
            <div class="flex items-start gap-3 w-3/4 mt-4">
                <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">C</div>
                <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-rose-500">
                    <p class="text-sm text-rose-400 font-bold mb-1">Client Confused:</p>
                    <p class="text-sm">Wait, I don't know technical terms like React. And I haven't told you what I want it to look like yet...</p>
                </div>
            </div>
        `;
        buttonsContainer.innerHTML = `
            <div class="bg-rose-900/50 p-3 rounded-lg border border-rose-500/50 mb-3">
                <p class="text-rose-200 text-sm"><b>Mistake:</b> You made assumptions or used technical jargon instead of asking clarifying questions.</p>
            </div>
            <button onclick="window.resetChatGame()" class="w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-bold p-3 rounded-lg transition-colors">Try Again</button>
        `;
    } else {
        if (step === 1) {
            // Success step 1, proceed to step 2
            setTimeout(() => {
                historyContainer.innerHTML += `
                    <div class="flex items-start gap-3 w-3/4 mt-4">
                        <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">C</div>
                        <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-emerald-500 shadow-lg">
                            <p class="text-sm text-emerald-400 font-bold mb-1">Client responds well:</p>
                            <p class="text-sm">Ah, I mean page load times. Our current site takes 5 seconds to load and we are losing customers. As for the look, I want it to feel premium.</p>
                        </div>
                    </div>
                `;
                buttonsContainer.innerHTML = `
                    <button onclick="window.submitChatOption(2, false)" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                        "Okay, I will tell the designer to make it look premium."
                    </button>
                    <button onclick="window.submitChatOption(2, true)" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                        "Understood. For the 'premium look', do you have any reference websites you admire? Or a brand style guide?"
                    </button>
                    <button onclick="window.submitChatOption(2, false)" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
                        "Got it. We will use a dark mode UI, that usually looks premium."
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
                        <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">C</div>
                        <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-emerald-500 shadow-lg">
                            <p class="text-sm text-emerald-400 font-bold mb-1">Client responds well:</p>
                            <p class="text-sm">Yes! I really like how Nike.com looks. Clean white backgrounds and large images. We don't have a style guide yet.</p>
                        </div>
                    </div>
                `;
                buttonsContainer.innerHTML = `
                    <div class="bg-emerald-900/50 p-4 rounded-lg border border-emerald-500 mb-3 text-center">
                        <i data-lucide="check-circle" class="w-8 h-8 text-emerald-400 mx-auto mb-2"></i>
                        <h4 class="text-emerald-300 font-bold mb-1">Excellent Requirement Gathering!</h4>
                        <p class="text-emerald-100 text-sm">You successfully avoided assumptions, skipped technical jargon, and got specific, actionable requirements from the client.</p>
                    </div>
                    <button onclick="window.resetChatGame()" class="w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-bold p-3 rounded-lg transition-colors">Play Again</button>
                `;
                historyContainer.scrollTop = historyContainer.scrollHeight;
                if (window.lucide) window.lucide.createIcons();
            }, 800);
        }
    }
    setTimeout(() => { historyContainer.scrollTop = historyContainer.scrollHeight; }, 50);
    if (window.lucide) window.lucide.createIcons();
};

window.resetChatGame = () => {
    document.getElementById('chatHistoryContainer').innerHTML = `
        <div class="flex items-start gap-3 w-3/4">
            <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs mt-1 shrink-0">C</div>
            <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                <p>Hi team, we need an e-commerce website built for our shoe company. We want it to be really fast and look amazing.</p>
            </div>
        </div>
    `;
    document.getElementById('chatButtons').innerHTML = `
        <button onclick="window.submitChatOption(1, false)" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
            "Sure, we can do that. Will it be React or Angular?"
        </button>
        <button onclick="window.submitChatOption(1, true)" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
            "Great! Could you elaborate on what you mean by 'fast'? Are we talking about page load times, or a fast checkout process?"
        </button>
        <button onclick="window.submitChatOption(1, false)" class="w-full text-left bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-lg border border-slate-600 transition-colors text-sm">
            "Okay, we will start designing it tomorrow."
        </button>
    `;
};


// Escalation Coach Logic
window.escalationScenarios = {
    'delay': {
        context: "You promised the client a feature by Friday. It's Thursday evening and a critical bug was found. Delivery is delayed by 3 days. Draft an email.",
    },
    'bug': {
        context: "The client is very angry on Slack because the checkout button on the live website is broken. Draft a response to de-escalate the situation.",
    },
    'scope': {
        context: "The client emails asking you to 'just quickly add a chat feature' to the app without paying extra, assuming it's a 5-minute job. Politely decline and explain the process."
    }
};

window.loadEscalationScenario = () => {
    const val = document.getElementById('escalationScenarioSelect').value;
    const scenario = window.escalationScenarios[val];
    document.getElementById('escalationScenarioContext').innerText = scenario.context;
    document.getElementById('escalationDraftBody').value = '';
    
    document.getElementById('aiEscalationFeedbackContainer').innerHTML = `
        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
            <i data-lucide="shield-alert" class="w-8 h-8"></i>
        </div>
        <p class="text-slate-400 text-sm font-medium">Type your response to the angry or confused client. The AI will evaluate your empathy, accountability, and professionalism.</p>
    `;
    if (window.lucide) window.lucide.createIcons();
};

window.clearEscalationDraft = () => {
    document.getElementById('escalationDraftBody').value = '';
};

window.evaluateEscalationDraft = () => {
    const body = document.getElementById('escalationDraftBody').value.trim();
    const container = document.getElementById('aiEscalationFeedbackContainer');

    if (!body) {
        container.innerHTML = `<p class="text-rose-500 font-bold">Please draft a response first!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
        <p class="text-blue-500 font-medium">Analyzing tone and empathy...</p>
    `;

    setTimeout(() => {
        let score = 100;
        let feedbackHTML = '';
        const val = document.getElementById('escalationScenarioSelect').value;

        // General Accountability & Empathy checks
        if (/\b(not my fault|their fault|developer|tester|I didn't do it)\b/i.test(body)) {
            score -= 30;
            feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Blame Shifting:</b> Never blame internal teams (devs, QA) in front of the client. As a company, take collective responsibility.</p></div></div>`;
        }

        // Delay logic
        if (val === 'delay') {
            if (!/\b(apologize|sorry|apologies)\b/i.test(body)) {
                score -= 15;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Missing Empathy:</b> When informing about a delay, start by acknowledging the inconvenience and apologizing.</p></div></div>`;
            }
            if (!/\b(Monday|Tuesday|Wednesday|days|deadline|expect)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>No New Timeline:</b> You informed them of the delay, but didn't provide a concrete updated deadline. Clients need to know when to expect it.</p></div></div>`;
            }
        }

        // Bug logic
        if (val === 'bug') {
            if (/\b(calm down|relax|it's fine)\b/i.test(body)) {
                score -= 40;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Dismissive Language:</b> Never tell an angry client to "calm down". It will make them angrier. Validate their urgency.</p></div></div>`;
            }
            if (!/\b(looking into|investigating|working on|team is)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Lack of Immediate Action:</b> Reassure the client that the team is actively investigating the issue right now.</p></div></div>`;
            }
        }

        // Scope logic
        if (val === 'scope') {
            if (/\b(no|can't do|won't do|pay more|money)\b/i.test(body) && !/\b(estimate|change request|discuss|scope)\b/i.test(body)) {
                score -= 25;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Too Blunt:</b> Don't just say "No". Explain that new features fall outside the current scope and offer to create an estimate/Change Request.</p></div></div>`;
            }
        }

        if (score === 100) {
            feedbackHTML += `<div class="bg-emerald-900/50 border border-emerald-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-200"><b>Excellent!</b> High empathy, strong accountability, and highly professional tone.</p></div></div>`;
        } else if (score >= 70) {
            feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Good effort.</b> Review the feedback to make it perfect.</p></div></div>`;
        }

        container.innerHTML = `
            <div class="w-full flex flex-col items-center bg-slate-900 p-2 rounded-xl shadow-sm mb-4 border border-slate-700">
                <div class="text-3xl font-extrabold text-${score > 70 ? 'emerald' : 'rose'}-500">${score}/100</div>
                <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Professionalism Score</div>
            </div>
            <div class="w-full space-y-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                ${feedbackHTML}
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

    }, 1200);
};
