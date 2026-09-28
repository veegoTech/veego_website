window.renderAIToolsModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-blue-50 rounded-lg text-blue-600 hidden sm:block"><i data-lucide="sparkles" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: AI Tools</span>`;
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
                            <i data-lucide="sparkles" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-blue-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">AI Tools for IT Professionals</h1>
                            <p class="text-blue-50 text-lg max-w-2xl">Master the AI tools used by top tech companies for coding, design, documentation, and project management.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4 space-y-8" id="ai-sim-container">
                
                <!-- Navigation Tabs -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap gap-2 mb-6">
                    <button onclick="window.switchAITab('toolkit')" id="tab-toolkit" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-blue-50 text-blue-700 border border-blue-100 shadow-sm">
                        <i data-lucide="layers" class="w-5 h-5"></i> AI Career Toolkit
                    </button>
                    <button onclick="window.switchAITab('workflow')" id="tab-workflow" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="git-merge" class="w-5 h-5"></i> AI Workflow Builder
                    </button>
                    <button onclick="window.switchAITab('coach')" id="tab-coach" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="bot" class="w-5 h-5"></i> Prompt Engineering Coach
                    </button>
                </div>

                <!-- Phase 1: Toolkit -->
                <div id="view-toolkit" class="ai-view block animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                                    <div class="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><i data-lucide="grid"></i></div>
                                    The Corporate AI Library
                                </h2>
                                <p class="text-slate-600 mt-2">Filter tools based on the task you need to complete.</p>
                            </div>
                            
                            <!-- Filters -->
                            <div class="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                                <button onclick="window.filterAITools('all')" class="ai-filter-btn active px-4 py-2 rounded-full text-sm font-bold bg-slate-800 text-white transition-colors whitespace-nowrap">All</button>
                                <button onclick="window.filterAITools('coding')" class="ai-filter-btn px-4 py-2 rounded-full text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors whitespace-nowrap">Coding</button>
                                <button onclick="window.filterAITools('writing')" class="ai-filter-btn px-4 py-2 rounded-full text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors whitespace-nowrap">Writing</button>
                                <button onclick="window.filterAITools('meetings')" class="ai-filter-btn px-4 py-2 rounded-full text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors whitespace-nowrap">Meetings</button>
                            </div>
                        </div>

                        <!-- Tool Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="aiToolGrid">
                            <!-- Injected by JS -->
                        </div>

                    </div>
                </div>

                <!-- Phase 2: Workflow Builder -->
                <div id="view-workflow" class="ai-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 p-8 flex flex-col md:flex-row gap-8 min-h-[500px]">
                        
                        <!-- Left: Available Tools -->
                        <div class="w-full md:w-1/3 flex flex-col">
                            <h3 class="text-white font-bold mb-4 flex items-center gap-2"><i data-lucide="box" class="text-emerald-400"></i> Available AI Tools</h3>
                            <p class="text-sm text-slate-400 mb-4">Click tools in the correct order to build the optimal workflow.</p>
                            
                            <div class="space-y-3" id="wfAvailableTools">
                                <button onclick="window.wfSelectTool('Gamma', 'presentation')" class="wf-tool-btn w-full text-left bg-slate-800 hover:bg-slate-700 text-slate-200 p-3 rounded-lg border border-slate-700 transition-colors text-sm font-medium flex items-center gap-3">
                                    <div class="w-8 h-8 rounded bg-purple-900/50 flex items-center justify-center text-purple-400"><i data-lucide="presentation"></i></div> Gamma (Presentations)
                                </button>
                                <button onclick="window.wfSelectTool('Perplexity', 'research')" class="wf-tool-btn w-full text-left bg-slate-800 hover:bg-slate-700 text-slate-200 p-3 rounded-lg border border-slate-700 transition-colors text-sm font-medium flex items-center gap-3">
                                    <div class="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center text-blue-400"><i data-lucide="search"></i></div> Perplexity (Research)
                                </button>
                                <button onclick="window.wfSelectTool('ChatGPT', 'writing')" class="wf-tool-btn w-full text-left bg-slate-800 hover:bg-slate-700 text-slate-200 p-3 rounded-lg border border-slate-700 transition-colors text-sm font-medium flex items-center gap-3">
                                    <div class="w-8 h-8 rounded bg-emerald-900/50 flex items-center justify-center text-emerald-400"><i data-lucide="message-square"></i></div> ChatGPT (Writing Drafts)
                                </button>
                                <button onclick="window.wfSelectTool('Grammarly', 'checking')" class="wf-tool-btn w-full text-left bg-slate-800 hover:bg-slate-700 text-slate-200 p-3 rounded-lg border border-slate-700 transition-colors text-sm font-medium flex items-center gap-3">
                                    <div class="w-8 h-8 rounded bg-rose-900/50 flex items-center justify-center text-rose-400"><i data-lucide="check-square"></i></div> Grammarly (Proofreading)
                                </button>
                            </div>
                        </div>

                        <!-- Right: The Workflow -->
                        <div class="flex-1 flex flex-col border-t border-slate-700 md:border-t-0 md:border-l md:pl-8 pt-6 md:pt-0">
                            <div class="bg-indigo-900/30 border border-indigo-500/30 p-4 rounded-xl mb-6">
                                <h3 class="text-indigo-300 font-bold text-sm uppercase tracking-wider mb-1">Project Scenario</h3>
                                <p class="text-indigo-100 text-sm">Your manager wants a highly professional presentation explaining the new 'Microservices Architecture' to the marketing team by tomorrow. Build the AI workflow to get this done fast.</p>
                            </div>

                            <div class="flex-1 bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-start gap-4 min-h-[300px]" id="wfSequenceContainer">
                                <p class="text-slate-500 text-sm font-bold uppercase mt-10" id="wfPlaceholder">Workflow Sequence Empty</p>
                                <!-- Sequence blocks injected here -->
                            </div>

                            <div class="mt-6 flex justify-between items-center">
                                <button onclick="window.wfReset()" class="text-slate-400 hover:text-white transition-colors text-sm font-bold px-4">Reset</button>
                                <button onclick="window.wfEvaluate()" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">Evaluate Workflow</button>
                            </div>
                            
                            <div id="wfFeedback" class="mt-4 hidden p-4 rounded-xl text-center text-sm font-bold"></div>
                        </div>

                    </div>
                </div>

                <!-- Phase 3: AI Prompt Coach -->
                <div id="view-coach" class="ai-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
                        
                        <!-- Left: Scenario and Writing Area -->
                        <div class="flex-1 min-w-0 flex flex-col">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                    <i data-lucide="bot" class="w-5 h-5 text-blue-500"></i> Prompt Engineering Coach
                                </h2>
                                <select id="promptScenarioSelect" class="bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none font-medium w-full sm:w-auto" onchange="window.loadPromptScenario()">
                                    <option value="coding">Scenario 1: The Vague Coding Prompt</option>
                                    <option value="privacy">Scenario 2: Data Privacy & Ethics</option>
                                </select>
                            </div>
                            
                            <div class="bg-slate-800 rounded-xl p-4 sm:p-5 mb-4 border border-slate-700 relative overflow-hidden">
                                <div class="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Scenario Context</h3>
                                <p id="promptScenarioContext" class="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                                    You typed: "write code for a login page" into ChatGPT. The output was generic HTML you can't use. Rewrite this prompt to be professional. (Include: Persona, Framework, Output format).
                                </p>
                            </div>

                            <!-- Editor -->
                            <div class="flex-1 flex flex-col border border-slate-700 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors bg-slate-800 shadow-sm min-h-[220px]">
                                <textarea id="promptDraftBody" class="flex-1 p-3 sm:p-4 outline-none resize-none text-xs sm:text-sm text-slate-200 leading-relaxed font-mono min-h-[140px] bg-transparent" placeholder="Draft your engineered prompt..."></textarea>
                                
                                <div class="bg-slate-900 border-t border-slate-700 p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <button onclick="window.evaluatePromptDraft()" class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm">
                                        <i data-lucide="terminal" class="w-4 h-4"></i> Evaluate Prompt
                                    </button>
                                    <button onclick="window.clearPromptDraft()" class="w-full sm:w-auto text-slate-400 hover:text-white text-xs sm:text-sm font-medium px-4 py-1.5 transition-colors text-center">Clear</button>
                                </div>
                            </div>
                        </div>

                        <!-- Right: AI Feedback Pane -->
                        <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8 flex flex-col shrink-0">
                            <h2 class="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <i data-lucide="activity" class="w-5 h-5 text-blue-500"></i> AI Analysis
                            </h2>
                            
                            <div id="aiPromptFeedbackContainer" class="flex-1 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50 min-h-[180px]">
                                <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                                    <i data-lucide="code" class="w-8 h-8"></i>
                                </div>
                                <p class="text-slate-400 text-xs sm:text-sm font-medium">Type your prompt. The AI will evaluate your use of context, constraints, formatting, and data privacy.</p>
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
                    <button onclick="window.completeProLesson('${day}')" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto">
                        Complete Lesson & Claim XP
                    </button>
                `}
            </div>
        </div>
    `;

    mainContent.innerHTML = html;
    window.renderAIToolsGrid('all');
    window.loadPromptScenario();
    if (window.lucide) window.lucide.createIcons();
};

window.switchAITab = (tab) => {
    document.querySelectorAll('.ai-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    document.querySelectorAll('#tab-toolkit, #tab-workflow, #tab-coach').forEach(el => {
        el.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50";
    });
    
    document.getElementById(`view-${tab}`).classList.remove('hidden');
    document.getElementById(`view-${tab}`).classList.add('block');
    
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-blue-50 text-blue-700 border border-blue-100 shadow-sm";
};


// Phase 1: Tool Grid Logic
const aiToolsData = [
    { name: "ChatGPT", cat: "writing", icon: "message-square", desc: "The ultimate general-purpose AI. Used for drafting emails, brainstorming, and writing first drafts of documentation.", use: "Write highly detailed prompts establishing context and role." },
    { name: "GitHub Copilot", cat: "coding", icon: "code", desc: "AI pair programmer that lives in your IDE. Suggests code completions and entire functions as you type.", use: "Write a descriptive comment (e.g., // function to parse JSON) and let it autocomplete." },
    { name: "Cursor AI", cat: "coding", icon: "terminal", desc: "An AI-first code editor (forked from VS Code) that can read your entire codebase and refactor across multiple files.", use: "Use 'Cmd+K' to generate code and 'Cmd+L' to chat with your codebase." },
    { name: "Grammarly", cat: "writing", icon: "check-square", desc: "Ensures your corporate communications are professional, grammatically correct, and use the right tone.", use: "Install the browser extension to check Jira tickets and Outlook emails automatically." },
    { name: "Otter.ai", cat: "meetings", icon: "mic", desc: "Records and transcribes meetings automatically, generating action items and summaries.", use: "Invite the Otter bot to your Zoom/Teams meetings so you don't have to take manual notes." },
    { name: "Gamma", cat: "writing", icon: "presentation", desc: "Generates beautiful, professional presentations and documents from a single text prompt.", use: "Provide a detailed outline, and let Gamma build the slides and layout." }
];

window.filterAITools = (cat) => {
    document.querySelectorAll('.ai-filter-btn').forEach(btn => {
        btn.className = "ai-filter-btn px-4 py-2 rounded-full text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors whitespace-nowrap";
    });
    event.target.className = "ai-filter-btn active px-4 py-2 rounded-full text-sm font-bold bg-slate-800 text-white transition-colors whitespace-nowrap";
    window.renderAIToolsGrid(cat);
};

window.renderAIToolsGrid = (cat) => {
    const grid = document.getElementById('aiToolGrid');
    grid.innerHTML = '';
    
    const filtered = cat === 'all' ? aiToolsData : aiToolsData.filter(t => t.cat === cat);
    
    filtered.forEach(tool => {
        grid.innerHTML += `
            <div class="border border-slate-200 p-6 rounded-xl hover:border-blue-400 transition-colors bg-white shadow-sm flex flex-col h-full group">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors"><i data-lucide="${tool.icon}"></i></div>
                    <h3 class="font-bold text-slate-800 text-lg">${tool.name}</h3>
                </div>
                <p class="text-slate-600 text-sm mb-4 flex-1">${tool.desc}</p>
                <div class="bg-blue-50/50 p-3 rounded-lg border border-blue-100 text-xs text-slate-700">
                    <strong class="text-blue-700 block mb-1">How to use:</strong>
                    ${tool.use}
                </div>
            </div>
        `;
    });
    if (window.lucide) window.lucide.createIcons();
};

// Phase 2: Workflow Builder Logic
window.wfSequence = [];

window.wfSelectTool = (toolName, role) => {
    if (window.wfSequence.length >= 4) return;
    
    // Check if already added
    if (window.wfSequence.some(t => t.name === toolName)) return;
    
    window.wfSequence.push({name: toolName, role: role});
    window.wfRenderSequence();
};

window.wfRenderSequence = () => {
    const container = document.getElementById('wfSequenceContainer');
    document.getElementById('wfPlaceholder').style.display = window.wfSequence.length > 0 ? 'none' : 'block';
    
    // Clear existing blocks
    const existing = container.querySelectorAll('.wf-block');
    existing.forEach(e => e.remove());
    
    window.wfSequence.forEach((tool, index) => {
        const block = document.createElement('div');
        block.className = "wf-block w-full max-w-sm bg-slate-700 border border-slate-600 p-3 rounded-lg flex items-center justify-between text-white animate-fade-in";
        block.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">${index + 1}</div>
                <span class="font-medium">${tool.name}</span>
            </div>
        `;
        container.appendChild(block);
        
        // Add arrow if not last
        if (index < window.wfSequence.length - 1 && index === window.wfSequence.length - 2) {
            const arrow = document.createElement('div');
            arrow.className = "wf-block text-slate-500 animate-fade-in";
            arrow.innerHTML = `<i data-lucide="arrow-down" class="w-5 h-5"></i>`;
            container.appendChild(arrow);
        }
    });
    if (window.lucide) window.lucide.createIcons();
};

window.wfReset = () => {
    window.wfSequence = [];
    window.wfRenderSequence();
    const fb = document.getElementById('wfFeedback');
    fb.classList.add('hidden');
};

window.wfEvaluate = () => {
    const fb = document.getElementById('wfFeedback');
    fb.classList.remove('hidden');
    
    if (window.wfSequence.length < 4) {
        fb.className = "mt-4 p-4 rounded-xl text-center text-sm font-bold bg-amber-900/30 text-amber-400 border border-amber-500/30";
        fb.innerHTML = "You need to select all 4 tools to complete the workflow.";
        return;
    }
    
    const correctOrder = ['research', 'writing', 'checking', 'presentation'];
    const userOrder = window.wfSequence.map(t => t.role);
    
    let isCorrect = true;
    for (let i = 0; i < 4; i++) {
        if (userOrder[i] !== correctOrder[i]) isCorrect = false;
    }
    
    if (isCorrect) {
        fb.className = "mt-4 p-4 rounded-xl text-center text-sm font-bold bg-emerald-900/30 text-emerald-400 border border-emerald-500/30";
        fb.innerHTML = "<i data-lucide='check-circle' class='w-5 h-5 inline-block mb-1'></i><br>Perfect! You researched first, drafted the content, checked grammar, and finally built the presentation layout.";
    } else {
        fb.className = "mt-4 p-4 rounded-xl text-center text-sm font-bold bg-rose-900/30 text-rose-400 border border-rose-500/30";
        fb.innerHTML = "Incorrect order. Think logically: you must Research -> Draft -> Proofread -> Design Presentation.";
    }
    if (window.lucide) window.lucide.createIcons();
};

// Phase 3: Prompt Coach
window.promptScenarios = {
    'coding': {
        context: "You typed: 'write code for a login page' into ChatGPT. The output was generic HTML you can't use. Rewrite this prompt to be professional. (Include: Persona, Framework, Output format).",
    },
    'privacy': {
        context: "You need ChatGPT to write a polite email to a frustrated customer. The customer's name is 'John Smith' and their credit card ending in '1234' was double-charged on 'Order #999'. Rewrite your prompt so it gets the email drafted WITHOUT leaking private PII (Personally Identifiable Information).",
    }
};

window.loadPromptScenario = () => {
    const val = document.getElementById('promptScenarioSelect').value;
    const scenario = window.promptScenarios[val];
    document.getElementById('promptScenarioContext').innerText = scenario.context;
    document.getElementById('promptDraftBody').value = '';
    
    document.getElementById('aiPromptFeedbackContainer').innerHTML = `
        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
            <i data-lucide="code" class="w-8 h-8"></i>
        </div>
        <p class="text-slate-400 text-sm font-medium">Type your prompt. The AI will evaluate your use of context, constraints, formatting, and data privacy.</p>
    `;
    if (window.lucide) window.lucide.createIcons();
};

window.clearPromptDraft = () => {
    document.getElementById('promptDraftBody').value = '';
};

window.evaluatePromptDraft = () => {
    const body = document.getElementById('promptDraftBody').value.trim();
    const container = document.getElementById('aiPromptFeedbackContainer');

    if (!body) {
        container.innerHTML = `<p class="text-blue-500 font-bold">Please draft a prompt first!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
        <p class="text-blue-500 font-medium">Analyzing prompt structure...</p>
    `;

    setTimeout(() => {
        let score = 100;
        let feedbackHTML = '';
        const val = document.getElementById('promptScenarioSelect').value;

        if (val === 'coding') {
            if (!/\b(act as|expert|developer|engineer|persona)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Missing Persona:</b> Always tell the AI who it is. (e.g., 'Act as a Senior React Developer').</p></div></div>`;
            }
            if (!/\b(react|angular|vue|tailwind|bootstrap|css|html)\b/i.test(body)) {
                score -= 30;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Missing Tech Stack:</b> You didn't specify which language or framework to use.</p></div></div>`;
            }
            if (!/\b(format|code block|markdown|comments)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Missing Constraints:</b> Specify the output format (e.g., 'Provide only the code block with comments').</p></div></div>`;
            }
        }

        if (val === 'privacy') {
            if (/\b(john|smith|1234|999)\b/i.test(body)) {
                score -= 50;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="shield-alert" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>SECURITY BREACH:</b> You included real PII (Name, CC number, or Order #). Use placeholders like [Customer Name] instead!</p></div></div>`;
            }
            if (!/\b(placeholder|bracket|\[name\]|\[customer\])\b/i.test(body) && score === 100) {
                 score -= 10;
                 feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="info" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Tip:</b> Tell the AI to use brackets for missing info (e.g., 'Use [Customer Name] where appropriate').</p></div></div>`;
            }
        }

        if (score === 100) {
            feedbackHTML += `<div class="bg-emerald-900/50 border border-emerald-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-200"><b>Excellent Prompt Engineering!</b> You provided clear instructions while maintaining professional standards.</p></div></div>`;
        } else if (score >= 70) {
            feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Good effort.</b> Review the feedback to write even better prompts.</p></div></div>`;
        }

        container.innerHTML = `
            <div class="w-full flex flex-col items-center bg-slate-900 p-2 rounded-xl shadow-sm mb-4 border border-slate-700">
                <div class="text-3xl font-extrabold text-${score > 70 ? 'emerald' : 'rose'}-500">${score}/100</div>
                <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Prompt Score</div>
            </div>
            <div class="w-full space-y-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                ${feedbackHTML}
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

    }, 1200);
};
