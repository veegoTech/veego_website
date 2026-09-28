window.renderMeetingEtiquetteModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-amber-50 rounded-lg text-amber-600 hidden sm:block"><i data-lucide="users" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: Meeting Etiquette</span>`;
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
                            <i data-lucide="presentation" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-amber-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">Corporate Meeting Etiquette</h1>
                            <p class="text-amber-50 text-lg max-w-2xl">Master the art of professional communication before, during, and after IT meetings. Use the Meeting Timeline below to explore best practices.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4 space-y-8" id="meeting-sim-container">
                
                <!-- Timeline Navigation -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6 relative overflow-hidden">
                    <div class="absolute top-1/2 left-8 right-8 h-1 bg-slate-100 -translate-y-1/2 z-0 hidden md:block"></div>
                    <div class="flex flex-col md:flex-row justify-between gap-4 relative z-10">
                        <button onclick="window.switchMeetingPhase('before')" id="phase-before" class="flex-1 py-4 px-6 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
                            <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-2"><i data-lucide="clipboard-list" class="w-5 h-5"></i></div>
                            1. Before Meeting
                        </button>
                        <button onclick="window.switchMeetingPhase('during')" id="phase-during" class="flex-1 py-4 px-6 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all bg-white text-slate-500 border border-transparent hover:bg-slate-50">
                            <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2"><i data-lucide="video" class="w-5 h-5"></i></div>
                            2. During Meeting
                        </button>
                        <button onclick="window.switchMeetingPhase('after')" id="phase-after" class="flex-1 py-4 px-6 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all bg-white text-slate-500 border border-transparent hover:bg-slate-50">
                            <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2"><i data-lucide="mail-check" class="w-5 h-5"></i></div>
                            3. After Meeting
                        </button>
                    </div>
                </div>

                <!-- Phase 1: Before -->
                <div id="view-before" class="meeting-phase block animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div class="p-2 bg-amber-100 text-amber-600 rounded-lg"><i data-lucide="check-square"></i></div>
                            The Preparation Checklist
                        </h2>
                        <p class="text-slate-600 mb-8 text-lg">Click on the items you should complete before joining a professional IT meeting.</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="prep-checklist">
                            <div class="flex items-start gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors" onclick="this.classList.toggle('bg-emerald-50'); this.classList.toggle('border-emerald-200'); this.querySelector('.check-icon').classList.toggle('text-emerald-500');">
                                <div class="w-6 h-6 rounded border-2 border-slate-300 flex items-center justify-center shrink-0 mt-0.5 bg-white"><i data-lucide="check" class="w-4 h-4 text-transparent check-icon transition-colors"></i></div>
                                <div>
                                    <h4 class="font-bold text-slate-800">Read the Agenda</h4>
                                    <p class="text-sm text-slate-500 mt-1">Know exactly what the meeting is about and prepare any required data beforehand.</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors" onclick="this.classList.toggle('bg-emerald-50'); this.classList.toggle('border-emerald-200'); this.querySelector('.check-icon').classList.toggle('text-emerald-500');">
                                <div class="w-6 h-6 rounded border-2 border-slate-300 flex items-center justify-center shrink-0 mt-0.5 bg-white"><i data-lucide="check" class="w-4 h-4 text-transparent check-icon transition-colors"></i></div>
                                <div>
                                    <h4 class="font-bold text-slate-800">Test Audio/Video</h4>
                                    <p class="text-sm text-slate-500 mt-1">Don't spend the first 5 minutes of the meeting saying "Can you hear me now?".</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors" onclick="this.classList.toggle('bg-emerald-50'); this.classList.toggle('border-emerald-200'); this.querySelector('.check-icon').classList.toggle('text-emerald-500');">
                                <div class="w-6 h-6 rounded border-2 border-slate-300 flex items-center justify-center shrink-0 mt-0.5 bg-white"><i data-lucide="check" class="w-4 h-4 text-transparent check-icon transition-colors"></i></div>
                                <div>
                                    <h4 class="font-bold text-slate-800">Dress Professionally</h4>
                                    <p class="text-sm text-slate-500 mt-1">Even when working from home, wear appropriate attire for video calls, especially with clients.</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors" onclick="this.classList.toggle('bg-emerald-50'); this.classList.toggle('border-emerald-200'); this.querySelector('.check-icon').classList.toggle('text-emerald-500');">
                                <div class="w-6 h-6 rounded border-2 border-slate-300 flex items-center justify-center shrink-0 mt-0.5 bg-white"><i data-lucide="check" class="w-4 h-4 text-transparent check-icon transition-colors"></i></div>
                                <div>
                                    <h4 class="font-bold text-slate-800">Find a Quiet Place</h4>
                                    <p class="text-sm text-slate-500 mt-1">Background noise (dogs barking, traffic) is highly unprofessional. Use headphones.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Phase 2: During -->
                <div id="view-during" class="meeting-phase hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl overflow-hidden p-6 relative min-h-[500px] border border-slate-800">
                        <div class="text-center text-white mb-8">
                            <h2 class="text-2xl font-bold flex items-center justify-center gap-2">
                                <i data-lucide="users" class="text-blue-400"></i> Active Meeting Simulation
                            </h2>
                            <p class="text-slate-400 mt-2">Click on the participants below to learn about their roles and etiquette rules.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <!-- Organizer -->
                            <div onclick="window.showMeetingInfo('organizer')" class="bg-slate-800 border-2 border-slate-700 hover:border-blue-500 rounded-xl p-6 text-center cursor-pointer transition-colors group">
                                <div class="w-20 h-20 bg-blue-900 text-blue-200 rounded-full mx-auto flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform"><i data-lucide="star"></i></div>
                                <h3 class="text-white font-bold text-lg">Meeting Organizer</h3>
                                <p class="text-slate-400 text-sm mt-1">Project Manager</p>
                            </div>
                            
                            <!-- Presenter -->
                            <div onclick="window.showMeetingInfo('presenter')" class="bg-slate-800 border-2 border-slate-700 hover:border-emerald-500 rounded-xl p-6 text-center cursor-pointer transition-colors group">
                                <div class="w-20 h-20 bg-emerald-900 text-emerald-200 rounded-full mx-auto flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform"><i data-lucide="monitor-play"></i></div>
                                <h3 class="text-white font-bold text-lg">The Presenter</h3>
                                <p class="text-slate-400 text-sm mt-1">Tech Lead</p>
                            </div>

                            <!-- Note Taker -->
                            <div onclick="window.showMeetingInfo('notetaker')" class="bg-slate-800 border-2 border-slate-700 hover:border-amber-500 rounded-xl p-6 text-center cursor-pointer transition-colors group">
                                <div class="w-20 h-20 bg-amber-900 text-amber-200 rounded-full mx-auto flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform"><i data-lucide="edit-3"></i></div>
                                <h3 class="text-white font-bold text-lg">Note Taker (You)</h3>
                                <p class="text-slate-400 text-sm mt-1">Junior Developer</p>
                            </div>
                        </div>

                        <div class="mt-12 bg-slate-800 rounded-xl p-6 border border-slate-700 text-white max-w-4xl mx-auto">
                            <h4 class="font-bold mb-4 text-amber-400 uppercase tracking-widest text-xs">Crucial Etiquette Rules</h4>
                            <ul class="space-y-3 text-sm text-slate-300">
                                <li class="flex items-start gap-2"><i data-lucide="alert-circle" class="w-5 h-5 text-rose-400 shrink-0"></i> <b>Never interrupt.</b> Use the "Raise Hand" feature or wait for a pause to speak.</li>
                                <li class="flex items-start gap-2"><i data-lucide="alert-circle" class="w-5 h-5 text-rose-400 shrink-0"></i> <b>Mute your mic.</b> If you are not actively speaking, your microphone must be muted.</li>
                                <li class="flex items-start gap-2"><i data-lucide="alert-circle" class="w-5 h-5 text-rose-400 shrink-0"></i> <b>Stay on topic.</b> Do not hijack the meeting to talk about unrelated issues. Take them offline.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Phase 3: After -->
                <div id="view-after" class="meeting-phase hidden animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div class="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><i data-lucide="file-text"></i></div>
                            Minutes of Meeting (MoM)
                        </h2>
                        <p class="text-slate-600 mb-8 text-lg">The meeting doesn't end when the call disconnects. Writing and sending a professional MoM is critical.</p>
                        
                        <div class="bg-slate-50 border border-slate-200 rounded-xl p-6 font-mono text-sm shadow-inner">
                            <div class="border-b border-slate-300 pb-4 mb-4">
                                <div><b class="text-slate-500 w-24 inline-block">Subject:</b> MoM - Frontend Architecture Review</div>
                                <div><b class="text-slate-500 w-24 inline-block">Date:</b> Oct 12, 2024</div>
                                <div><b class="text-slate-500 w-24 inline-block">Attendees:</b> Sarah, David, Priya, Rahul</div>
                            </div>
                            
                            <h4 class="font-bold text-slate-800 text-base mb-2">Key Discussions:</h4>
                            <ul class="list-disc pl-6 mb-6 text-slate-700 space-y-1">
                                <li>Reviewed the new authentication flow design.</li>
                                <li>Agreed to switch from Redux to Context API for the user module.</li>
                                <li>Identified a potential security risk in the token storage mechanism.</li>
                            </ul>

                            <h4 class="font-bold text-slate-800 text-base mb-2">Action Items (Deadlines):</h4>
                            <div class="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
                                <div class="flex items-center gap-2"><span class="bg-rose-100 text-rose-700 px-2 rounded font-bold text-xs">Rahul</span> Research secure token storage options by EOD Wednesday.</div>
                                <div class="flex items-center gap-2"><span class="bg-blue-100 text-blue-700 px-2 rounded font-bold text-xs">Priya</span> Refactor user module to use Context API by Friday.</div>
                                <div class="flex items-center gap-2"><span class="bg-emerald-100 text-emerald-700 px-2 rounded font-bold text-xs">Sarah</span> Schedule follow-up sync with backend team.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- AI Speech Coach Simulator -->
                <div class="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-4 sm:p-6 lg:p-8 mt-12 flex flex-col lg:flex-row gap-6 lg:gap-8">
                    
                    <!-- Left: Scenario and Writing Area -->
                    <div class="flex-1 min-w-0 flex flex-col">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                <i data-lucide="mic" class="w-5 h-5 text-amber-500"></i> AI Speech Coach
                            </h2>
                            <select id="speechScenarioSelect" class="bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2 outline-none font-medium w-full sm:w-auto" onchange="window.loadSpeechScenario()">
                                <option value="disagree">Scenario 1: Disagreeing</option>
                                <option value="clarify">Scenario 2: Asking for Clarification</option>
                                <option value="standup">Scenario 3: Daily Standup Update</option>
                            </select>
                        </div>
                        
                        <div class="bg-slate-800 rounded-xl p-4 sm:p-5 mb-4 border border-slate-700 relative overflow-hidden">
                            <div class="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Scenario Context</h3>
                            <p id="speechScenarioContext" class="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                                A senior developer suggests using a complex database structure. You think a simpler one is better and faster. How do you politely disagree and present your idea?
                            </p>
                        </div>

                        <!-- Editor -->
                        <div class="flex-1 flex flex-col border border-slate-700 rounded-xl overflow-hidden focus-within:border-amber-500 transition-colors bg-slate-800 shadow-sm min-h-[220px]">
                            <textarea id="speechDraftBody" class="flex-1 p-3 sm:p-4 outline-none resize-none text-xs sm:text-sm text-slate-200 leading-relaxed font-mono min-h-[140px] bg-transparent" placeholder="Type exactly what you would SAY in the meeting..."></textarea>
                            
                            <div class="bg-slate-900 border-t border-slate-700 p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                                <button onclick="window.evaluateSpeechDraft()" class="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm">
                                    <i data-lucide="play" class="w-4 h-4"></i> Evaluate Speech
                                </button>
                                <button onclick="window.clearSpeechDraft()" class="w-full sm:w-auto text-slate-400 hover:text-white text-xs sm:text-sm font-medium px-4 py-1.5 transition-colors text-center">Clear</button>
                            </div>
                        </div>
                    </div>

                    <!-- Right: AI Feedback Pane -->
                    <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8 flex flex-col shrink-0">
                        <h2 class="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <i data-lucide="activity" class="w-5 h-5 text-emerald-500"></i> AI Analysis
                        </h2>
                        
                        <div id="aiSpeechFeedbackContainer" class="flex-1 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50 min-h-[180px]">
                            <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                                <i data-lucide="mic" class="w-8 h-8"></i>
                            </div>
                            <p class="text-slate-400 text-xs sm:text-sm font-medium">Type your spoken response and click "Evaluate" to receive feedback on your professional tone, clarity, and meeting etiquette.</p>
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

            <!-- Global Tooltip Modal for Meeting Roles -->
            <div id="meetingInfoModal" class="fixed inset-0 z-50 hidden bg-slate-900/60 backdrop-blur-sm flex items-center justify-center opacity-0 transition-opacity duration-300">
                <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform scale-95 transition-transform duration-300" id="meetingInfoContent">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600" id="meetingModalIcon">
                            <i data-lucide="info"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-slate-800" id="meetingModalTitle">Title</h3>
                    </div>
                    <p class="text-slate-600 text-lg leading-relaxed mb-6" id="meetingModalText">Description</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Responsibility</h4>
                        <p class="text-sm font-medium text-slate-700" id="meetingModalUsage">Usage detail</p>
                    </div>
                    <button onclick="window.closeMeetingInfo()" class="w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition-colors">Understood</button>
                </div>
            </div>

        </div>
    `;

    mainContent.innerHTML = html;
    window.loadSpeechScenario();
    if (window.lucide) window.lucide.createIcons();
};

window.switchMeetingPhase = (phase) => {
    // Hide all
    document.querySelectorAll('.meeting-phase').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    // Reset buttons
    document.querySelectorAll('#phase-before, #phase-during, #phase-after').forEach(el => {
        el.className = "flex-1 py-4 px-6 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all bg-white text-slate-500 border border-transparent hover:bg-slate-50 relative z-10";
        el.querySelector('div').className = "w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2 transition-colors";
    });
    
    // Show active
    document.getElementById(`view-${phase}`).classList.remove('hidden');
    document.getElementById(`view-${phase}`).classList.add('block');
    
    // Style active button
    const activeBtn = document.getElementById(`phase-${phase}`);
    activeBtn.className = "flex-1 py-4 px-6 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all bg-amber-50 text-amber-700 border border-amber-200 shadow-sm relative z-10";
    activeBtn.querySelector('div').className = "w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-2 transition-colors";
};

// Global features mapping for Meeting Roles
window.meetingRoles = {
    'organizer': { title: 'Meeting Organizer', icon: 'star', text: 'The person who scheduled and leads the meeting. They set the agenda and keep discussions on track.', usage: 'Respect their authority to cut discussions short if the meeting goes off-topic. They manage the clock.' },
    'presenter': { title: 'The Presenter', icon: 'monitor-play', text: 'The person currently sharing their screen or presenting data to the team.', usage: 'Do not interrupt them mid-sentence. Wait for them to pause and ask "Are there any questions?" before speaking.' },
    'notetaker': { title: 'Note Taker', icon: 'edit-3', text: 'Assigned to write down key decisions and action items (Minutes of Meeting).', usage: 'If you are a junior developer, offering to take notes is a great way to show initiative and pay attention to high-level architecture.' }
};

window.showMeetingInfo = (key) => {
    const data = window.meetingRoles[key];
    if (!data) return;
    
    document.getElementById('meetingModalTitle').innerText = data.title;
    document.getElementById('meetingModalText').innerText = data.text;
    document.getElementById('meetingModalUsage').innerText = data.usage;
    document.getElementById('meetingModalIcon').innerHTML = `<i data-lucide="${data.icon}"></i>`;
    if (window.lucide) window.lucide.createIcons();
    
    const modal = document.getElementById('meetingInfoModal');
    const content = document.getElementById('meetingInfoContent');
    modal.classList.remove('hidden');
    
    // Trigger reflow
    void modal.offsetWidth;
    
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');
};

window.closeMeetingInfo = () => {
    const modal = document.getElementById('meetingInfoModal');
    const content = document.getElementById('meetingInfoContent');
    
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
};

window.speechScenarios = {
    'disagree': {
        context: "A senior developer suggests using a complex database structure. You think a simpler one is better and faster. How do you politely disagree and present your idea?",
    },
    'clarify': {
        context: "The client just gave a 5-minute explanation of a new feature, but you completely lost track and don't understand it. How do you politely ask for clarification?",
    },
    'standup': {
        context: "It's your turn in the Daily Standup (What did you do yesterday, what are you doing today, any blockers?). Give your update."
    }
};

window.loadSpeechScenario = () => {
    const val = document.getElementById('speechScenarioSelect').value;
    const scenario = window.speechScenarios[val];
    document.getElementById('speechScenarioContext').innerText = scenario.context;
    document.getElementById('speechDraftBody').value = '';
    
    // Reset feedback
    document.getElementById('aiSpeechFeedbackContainer').innerHTML = `
        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
            <i data-lucide="mic" class="w-8 h-8"></i>
        </div>
        <p class="text-slate-400 text-sm font-medium">Type your spoken response and click "Evaluate" to receive feedback on your professional tone, clarity, and meeting etiquette.</p>
    `;
    if (window.lucide) window.lucide.createIcons();
};

window.clearSpeechDraft = () => {
    document.getElementById('speechDraftBody').value = '';
};

// Mock AI Evaluation Logic for Speech
window.evaluateSpeechDraft = () => {
    const body = document.getElementById('speechDraftBody').value.trim();
    const container = document.getElementById('aiSpeechFeedbackContainer');

    if (!body) {
        container.innerHTML = `<p class="text-rose-500 font-bold">Please type what you would say first!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500 mb-4"></div>
        <p class="text-amber-500 font-medium">Analyzing speech etiquette...</p>
    `;

    setTimeout(() => {
        let score = 100;
        let feedbackHTML = '';
        const val = document.getElementById('speechScenarioSelect').value;

        if (body.length < 20) {
            score -= 30;
            feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Too Short:</b> Provide a complete sentence. Saying just a few words can seem dismissive.</p></div></div>`;
        }

        // Disagree logic
        if (val === 'disagree') {
            if (/\b(wrong|stupid|bad|no|disagree)\b/i.test(body)) {
                score -= 30;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Abrasive Language:</b> Avoid saying "you're wrong" or "I disagree". Instead say, "I see your point, but what if we considered..."</p></div></div>`;
            } else if (!/\b(understand|see|point|think|suggest|maybe|what if)\b/i.test(body)) {
                score -= 10;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Acknowledge First:</b> Always validate the other person's idea before presenting your alternative.</p></div></div>`;
            }
        }

        // Clarify logic
        if (val === 'clarify') {
            if (/\b(huh|what|didn't get|lost|repeat)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Too Blunt:</b> Instead of saying "I lost you", say "Could you elaborate on..." or "Just to clarify, did you mean..."</p></div></div>`;
            }
        }

        // Standup logic
        if (val === 'standup') {
            if (!/\b(yesterday|today|blocker|blocking|no blockers)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Missing Format:</b> A standard standup update must cover: Yesterday's work, Today's plan, and any Blockers.</p></div></div>`;
            }
        }

        // General slang check
        if (/\b(hey|bro|guys|whats up|u|omg|idk|dunno)\b/i.test(body)) {
            score -= 15;
            feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Unprofessional Slang:</b> Avoid casual filler words when speaking in official meetings.</p></div></div>`;
        }

        if (score === 100) {
            feedbackHTML += `<div class="bg-emerald-900/50 border border-emerald-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-200"><b>Excellent!</b> Professional, polite, and clear communication.</p></div></div>`;
        }

        container.innerHTML = `
            <div class="w-full flex flex-col items-center bg-slate-900 p-2 rounded-xl shadow-sm mb-4 border border-slate-700">
                <div class="text-3xl font-extrabold text-${score > 70 ? 'emerald' : 'rose'}-500">${score}/100</div>
                <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Etiquette Score</div>
            </div>
            <div class="w-full space-y-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                ${feedbackHTML}
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

    }, 1200);
};
