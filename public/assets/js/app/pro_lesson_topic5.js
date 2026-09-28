window.renderEmailWritingModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-blue-50 rounded-lg text-blue-600 hidden sm:block"><i data-lucide="edit-3" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: Professional Email Writing</span>`;
    }

    let progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    let isCompleted = progress.completedLessons && progress.completedLessons.includes(`pro_${day}`);

    let html = `
        <div class="animate-fade-in mx-auto space-y-12 pb-20 bg-slate-50 min-h-screen">
            
            <!-- HEADER -->
            <div class="relative bg-gradient-to-r from-blue-800 to-slate-900 rounded-b-3xl sm:rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden text-white mb-8 mx-auto max-w-6xl mt-4">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8">
                        <div class="w-20 sm:w-24 h-20 sm:h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shrink-0 shadow-inner">
                            <i data-lucide="edit-3" class="w-12 h-12 text-blue-300"></i>
                        </div>
                        <div>
                            <div class="text-blue-300 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">Professional Email Writing</h1>
                            <p class="text-slate-300 text-lg max-w-2xl">Master the structure of corporate emails and use the AI Coach Simulator below to practice writing emails for real-world IT scenarios.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4 space-y-8" id="email-writing-container">
                
                <!-- Email Structure Breakdown -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                        <div class="p-2 bg-blue-100 text-blue-600 rounded-lg"><i data-lucide="layers"></i></div>
                        Anatomy of a Professional Email
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="space-y-4">
                            <div class="p-4 border-l-4 border-amber-400 bg-amber-50 rounded-r-lg group hover:bg-amber-100 transition-colors cursor-pointer">
                                <h3 class="font-bold text-slate-800 flex justify-between">1. Subject Line <i data-lucide="chevron-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"></i></h3>
                                <p class="text-sm text-slate-600 mt-1">Clear, specific, and searchable. Never leave it blank.</p>
                            </div>
                            <div class="p-4 border-l-4 border-emerald-400 bg-emerald-50 rounded-r-lg group hover:bg-emerald-100 transition-colors cursor-pointer">
                                <h3 class="font-bold text-slate-800 flex justify-between">2. Professional Greeting <i data-lucide="chevron-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"></i></h3>
                                <p class="text-sm text-slate-600 mt-1">"Dear [Name]," or "Hi Team,". Avoid informal greetings like "Hey".</p>
                            </div>
                            <div class="p-4 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg group hover:bg-blue-100 transition-colors cursor-pointer">
                                <h3 class="font-bold text-slate-800 flex justify-between">3. Opening & Body <i data-lucide="chevron-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"></i></h3>
                                <p class="text-sm text-slate-600 mt-1">State the purpose immediately. Keep paragraphs short and use bullet points.</p>
                            </div>
                            <div class="p-4 border-l-4 border-purple-400 bg-purple-50 rounded-r-lg group hover:bg-purple-100 transition-colors cursor-pointer">
                                <h3 class="font-bold text-slate-800 flex justify-between">4. Call to Action (CTA) <i data-lucide="chevron-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"></i></h3>
                                <p class="text-sm text-slate-600 mt-1">What do you want them to do? Be clear about deadlines.</p>
                            </div>
                            <div class="p-4 border-l-4 border-slate-400 bg-slate-50 rounded-r-lg group hover:bg-slate-100 transition-colors cursor-pointer">
                                <h3 class="font-bold text-slate-800 flex justify-between">5. Closing & Signature <i data-lucide="chevron-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"></i></h3>
                                <p class="text-sm text-slate-600 mt-1">"Best regards," followed by your name, role, and contact info.</p>
                            </div>
                        </div>

                        <!-- Example Rendering -->
                        <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono text-sm leading-relaxed shadow-inner">
                            <div class="mb-4 pb-2 border-b border-slate-200 text-slate-800">
                                <span class="text-slate-400 font-sans font-medium w-16 inline-block">Subject:</span> 
                                <span class="bg-amber-100 text-amber-800 px-1 rounded">Leave Request - Oct 12 - Rahul Sharma</span>
                            </div>
                            <div class="bg-emerald-100 text-emerald-800 px-1 rounded inline-block mb-4">Dear Mr. Smith,</div><br>
                            <span class="bg-blue-100 text-blue-800 px-1 rounded">Please grant me sick leave for Oct 12 as I am unwell.</span> 
                            I have handed over my pending tasks to Priya.<br><br>
                            <span class="bg-purple-100 text-purple-800 px-1 rounded">Please review and approve my leave request by EOD.</span><br><br>
                            <div class="bg-slate-200 text-slate-800 px-1 rounded inline-block mt-4">
                                Best regards,<br>
                                Rahul Sharma<br>
                                Junior Developer
                            </div>
                        </div>
                    </div>
                </div>

                <!-- AI Simulator Setup -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8 min-h-[500px]">
                    
                    <!-- Left: Scenario and Writing Area -->
                    <div class="flex-1 min-w-0 flex flex-col">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <h2 class="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2 whitespace-nowrap">
                                <i data-lucide="edit" class="w-5 h-5 text-blue-600"></i> Draft your Email
                            </h2>
                            <select id="scenarioSelect" class="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none font-medium w-full sm:w-auto" onchange="window.loadScenario()">
                                <option value="leave">Scenario 1: Sick Leave Request</option>
                                <option value="status">Scenario 2: Weekly Status Update</option>
                                <option value="client">Scenario 3: Replying to angry client</option>
                            </select>
                        </div>
                        
                        <div class="bg-slate-50 rounded-xl p-4 sm:p-5 mb-4 border border-slate-200 relative overflow-hidden">
                            <div class="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Scenario Context</h3>
                            <p id="scenarioContext" class="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                                You woke up with a high fever. Write an email to your manager (Sarah) asking for 1 day of sick leave today.
                            </p>
                        </div>

                        <!-- Editor -->
                        <div class="flex-1 flex flex-col border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all bg-white shadow-sm min-h-[300px]">
                            <div class="flex border-b border-slate-200 p-2.5 sm:p-3 bg-slate-50 items-center">
                                <span class="text-slate-400 font-medium text-xs sm:text-sm w-16">To:</span>
                                <input type="text" id="draftTo" class="flex-1 outline-none text-xs sm:text-sm text-slate-800 bg-transparent" placeholder="manager@company.com" value="sarah@company.com">
                            </div>
                            <div class="flex border-b border-slate-200 p-2.5 sm:p-3 bg-slate-50 items-center">
                                <span class="text-slate-400 font-medium text-xs sm:text-sm w-16">Subject:</span>
                                <input type="text" id="draftSubject" class="flex-1 outline-none text-xs sm:text-sm font-medium text-slate-800 bg-transparent" placeholder="Enter subject line...">
                            </div>
                            <textarea id="draftBody" class="flex-1 p-3 sm:p-4 outline-none resize-none text-xs sm:text-sm text-slate-700 leading-relaxed font-mono min-h-[160px]" placeholder="Dear Sarah..."></textarea>
                            
                            <div class="bg-slate-50 border-t border-slate-200 p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                                <button onclick="window.evaluateDraft()" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm">
                                    <i data-lucide="bot" class="w-4 h-4"></i> Evaluate with AI Coach
                                </button>
                                <button onclick="window.clearDraft()" class="w-full sm:w-auto text-slate-500 hover:text-slate-800 text-xs sm:text-sm font-medium px-4 py-1.5 text-center">Clear</button>
                            </div>
                        </div>
                    </div>

                    <!-- Right: AI Feedback Pane -->
                    <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-8 flex flex-col shrink-0">
                        <h2 class="text-lg sm:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <i data-lucide="sparkles" class="w-5 h-5 text-amber-500"></i> AI Feedback
                        </h2>
                        
                        <div id="aiFeedbackContainer" class="flex-1 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 min-h-[200px]">
                            <div class="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                <i data-lucide="bot" class="w-8 h-8"></i>
                            </div>
                            <p class="text-slate-500 text-xs sm:text-sm font-medium">Write your email and click "Evaluate" to receive professional feedback on your tone, structure, and grammar.</p>
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
    window.loadScenario();
    if (window.lucide) window.lucide.createIcons();
};

window.scenarios = {
    'leave': {
        context: "You woke up with a high fever. Write an email to your manager (Sarah) asking for 1 day of sick leave today.",
        to: "sarah@company.com"
    },
    'status': {
        context: "It is Friday 5 PM. Write a brief Weekly Status update to the team outlining that you completed the Login Page UI and will start on the Dashboard next week.",
        to: "team@company.com"
    },
    'client': {
        context: "A client emailed you angry that a feature is delayed. Reply professionally, apologizing for the delay and assuring them it will be delivered by Tuesday.",
        to: "client@external.com"
    }
};

window.loadScenario = () => {
    const val = document.getElementById('scenarioSelect').value;
    const scenario = window.scenarios[val];
    document.getElementById('scenarioContext').innerText = scenario.context;
    document.getElementById('draftTo').value = scenario.to;
    document.getElementById('draftSubject').value = '';
    document.getElementById('draftBody').value = '';
    
    // Reset feedback
    document.getElementById('aiFeedbackContainer').innerHTML = `
        <div class="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <i data-lucide="bot" class="w-8 h-8"></i>
        </div>
        <p class="text-slate-500 text-sm font-medium">Write your email and click "Evaluate" to receive professional feedback on your tone, structure, and grammar.</p>
    `;
    if (window.lucide) window.lucide.createIcons();
};

window.clearDraft = () => {
    document.getElementById('draftSubject').value = '';
    document.getElementById('draftBody').value = '';
};

// Mock AI Evaluation Logic using Regex/Keywords
window.evaluateDraft = () => {
    const subject = document.getElementById('draftSubject').value.trim();
    const body = document.getElementById('draftBody').value.trim();
    const container = document.getElementById('aiFeedbackContainer');

    if (!subject && !body) {
        container.innerHTML = `<p class="text-rose-500 font-bold">Please write an email first before evaluating!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
        <p class="text-blue-600 font-medium">Analyzing tone and structure...</p>
    `;

    setTimeout(() => {
        let score = 100;
        let feedbackHTML = '';

        // Check Subject
        if (!subject) {
            score -= 30;
            feedbackHTML += `<div class="bg-rose-50 border border-rose-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-500 mt-0.5 shrink-0"></i><p class="text-sm text-rose-700"><b>Missing Subject:</b> Never send an email without a subject line.</p></div></div>`;
        } else if (subject.length < 5) {
            score -= 10;
            feedbackHTML += `<div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-500 mt-0.5 shrink-0"></i><p class="text-sm text-amber-700"><b>Vague Subject:</b> Make your subject more descriptive so it is easy to search.</p></div></div>`;
        } else {
            feedbackHTML += `<div class="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-700"><b>Good Subject Line!</b></p></div></div>`;
        }

        // Check Body length
        if (body.length < 15) {
            score -= 40;
            feedbackHTML += `<div class="bg-rose-50 border border-rose-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-500 mt-0.5 shrink-0"></i><p class="text-sm text-rose-700"><b>Too short:</b> Your email body lacks necessary context and structure.</p></div></div>`;
        } else {
            // Check Greeting
            const hasGreeting = /^(hi|hello|dear)\b/i.test(body);
            if (!hasGreeting) {
                score -= 15;
                feedbackHTML += `<div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-500 mt-0.5 shrink-0"></i><p class="text-sm text-amber-700"><b>Missing Greeting:</b> Start with a professional greeting (e.g., 'Dear Sarah,' or 'Hi Team,').</p></div></div>`;
            }

            // Check formatting/tone (hey, bro, guys)
            if (/\b(hey|bro|guys|whats up|u)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-rose-50 border border-rose-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-500 mt-0.5 shrink-0"></i><p class="text-sm text-rose-700"><b>Informal Language:</b> Avoid using slang or overly casual words ('hey', 'u') in professional emails.</p></div></div>`;
            }

            // Check Closing
            const hasClosing = /(regards|sincerely|thanks|thank you)/i.test(body);
            if (!hasClosing) {
                score -= 10;
                feedbackHTML += `<div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-500 mt-0.5 shrink-0"></i><p class="text-sm text-amber-700"><b>Missing Closing:</b> Always end your email politely (e.g., 'Best regards,').</p></div></div>`;
            }
        }

        if (score === 100) {
            feedbackHTML += `<div class="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-700"><b>Perfect!</b> Structure, tone, and formatting look highly professional.</p></div></div>`;
        }

        container.innerHTML = `
            <div class="w-full flex flex-col items-center bg-white p-2 rounded-xl shadow-sm mb-4 border border-slate-100">
                <div class="text-3xl font-extrabold text-${score > 70 ? 'emerald' : 'rose'}-600">${score}/100</div>
                <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Professionalism Score</div>
            </div>
            <div class="w-full space-y-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                ${feedbackHTML}
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

    }, 1200); // Simulate network delay
};
