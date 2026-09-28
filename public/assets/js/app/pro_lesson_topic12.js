window.renderTimeManagementModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-emerald-50 rounded-lg text-emerald-600 hidden sm:block"><i data-lucide="clock" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: Time Management</span>`;
    }

    let progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    let isCompleted = progress.completedLessons && progress.completedLessons.includes(`pro_${day}`);

    let html = `
        <div class="animate-fade-in mx-auto space-y-12 pb-20 bg-slate-50 min-h-screen">
            
            <!-- HEADER -->
            <div class="relative bg-gradient-to-r from-emerald-700 to-teal-800 rounded-b-3xl sm:rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden text-white mb-8 mx-auto max-w-6xl mt-4">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8">
                        <div class="w-20 sm:w-24 h-20 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0 shadow-inner">
                            <i data-lucide="clock" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-emerald-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">Time Management</h1>
                            <p class="text-emerald-50 text-lg max-w-2xl">Learn how to prioritize tasks, avoid burnout, and manage a heavy workload using proven corporate productivity techniques.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4 space-y-8" id="time-sim-container">
                
                <!-- Navigation Tabs -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap gap-2 mb-6">
                    <button onclick="window.switchTimeTab('toolkit')" id="tab-toolkit" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                        <i data-lucide="wrench" class="w-5 h-5"></i> Productivity Toolkit
                    </button>
                    <button onclick="window.switchTimeTab('matrix')" id="tab-matrix" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="grid-3x3" class="w-5 h-5"></i> Eisenhower Matrix
                    </button>
                    <button onclick="window.switchTimeTab('coach')" id="tab-coach" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="bot" class="w-5 h-5"></i> AI Productivity Coach
                    </button>
                </div>

                <!-- Phase 1: Toolkit -->
                <div id="view-toolkit" class="time-view block animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div class="p-2 bg-teal-100 text-teal-600 rounded-lg"><i data-lucide="zap"></i></div>
                            The Developer's Productivity Toolkit
                        </h2>
                        <p class="text-slate-600 mb-8 text-lg">In software engineering, you will always have more work than time. You must learn how to protect your focus.</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Technique 1 -->
                            <div class="border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-emerald-400 transition-colors bg-white shadow-sm">
                                <div class="absolute -right-4 -bottom-4 text-slate-100 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="timer" class="w-24 h-24"></i></div>
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="w-10 h-10 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center"><i data-lucide="timer"></i></div>
                                    <h3 class="font-bold text-slate-800 text-xl">Pomodoro Technique</h3>
                                </div>
                                <p class="text-slate-600 relative z-10 mb-4">Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a 15-minute break.</p>
                                <div class="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm text-slate-700 relative z-10">
                                    <b>Best For:</b> Boring or repetitive tasks (like writing documentation or testing). It creates a sense of urgency.
                                </div>
                            </div>

                            <!-- Technique 2 -->
                            <div class="border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-emerald-400 transition-colors bg-white shadow-sm">
                                <div class="absolute -right-4 -bottom-4 text-slate-100 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="calendar" class="w-24 h-24"></i></div>
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><i data-lucide="calendar"></i></div>
                                    <h3 class="font-bold text-slate-800 text-xl">Time Blocking</h3>
                                </div>
                                <p class="text-slate-600 relative z-10 mb-4">Scheduling specific chunks of time on your calendar for specific types of work, treating them like meetings.</p>
                                <div class="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm text-slate-700 relative z-10">
                                    <b>Best For:</b> Deep work (like coding a new feature). E.g., blocking 9am-11am as "Do Not Disturb - Coding".
                                </div>
                            </div>

                            <!-- Technique 3 -->
                            <div class="border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-emerald-400 transition-colors bg-white shadow-sm">
                                <div class="absolute -right-4 -bottom-4 text-slate-100 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="bug" class="w-24 h-24"></i></div>
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center"><i data-lucide="bug"></i></div>
                                    <h3 class="font-bold text-slate-800 text-xl">Eat the Frog</h3>
                                </div>
                                <p class="text-slate-600 relative z-10 mb-4">Do your most difficult, intimidating, or important task first thing in the morning.</p>
                                <div class="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm text-slate-700 relative z-10">
                                    <b>Best For:</b> Tasks you are procrastinating on (like debugging a horrible legacy codebase). Get it out of the way.
                                </div>
                            </div>

                            <!-- Technique 4 -->
                            <div class="border border-slate-200 p-6 rounded-xl relative overflow-hidden group hover:border-emerald-400 transition-colors bg-white shadow-sm">
                                <div class="absolute -right-4 -bottom-4 text-slate-100 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="pie-chart" class="w-24 h-24"></i></div>
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center"><i data-lucide="pie-chart"></i></div>
                                    <h3 class="font-bold text-slate-800 text-xl">The 80/20 Rule (Pareto)</h3>
                                </div>
                                <p class="text-slate-600 relative z-10 mb-4">80% of your results come from 20% of your effort. Identify which tasks actually move the project forward.</p>
                                <div class="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm text-slate-700 relative z-10">
                                    <b>Best For:</b> Overwhelming workloads. Don't spend 4 hours perfecting a button color when the login system is broken.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Phase 2: Matrix Game -->
                <div id="view-matrix" class="time-view hidden animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <div class="mb-6 flex justify-between items-start">
                            <div>
                                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                                    <div class="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><i data-lucide="grid-3x3"></i></div>
                                    The Eisenhower Matrix
                                </h2>
                                <p class="text-slate-600 mt-2">Click a task below, then click the correct quadrant in the matrix to place it.</p>
                            </div>
                            <button onclick="window.resetMatrixGame()" class="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 text-sm font-bold">
                                <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Reset
                            </button>
                        </div>

                        <!-- Unsorted Tasks -->
                        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8">
                            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Incoming Tasks</h3>
                            <div class="flex flex-wrap gap-3" id="matrixTasksContainer">
                                <!-- Tasks generated by JS -->
                            </div>
                        </div>

                        <!-- The Matrix -->
                        <div class="grid grid-cols-2 gap-4 h-[400px]">
                            <!-- Urgent & Important -->
                            <div class="matrix-quadrant border-2 border-rose-200 bg-rose-50 rounded-xl p-4 flex flex-col relative cursor-pointer hover:bg-rose-100 transition-colors" onclick="window.placeTaskInQuadrant('q1')">
                                <h4 class="font-bold text-rose-700 text-center border-b border-rose-200 pb-2 mb-2">DO FIRST<br><span class="text-xs font-normal text-rose-500 uppercase tracking-widest">Urgent & Important</span></h4>
                                <div id="quadrant-q1" class="flex-1 flex flex-col gap-2 overflow-y-auto"></div>
                            </div>
                            <!-- Not Urgent & Important -->
                            <div class="matrix-quadrant border-2 border-blue-200 bg-blue-50 rounded-xl p-4 flex flex-col relative cursor-pointer hover:bg-blue-100 transition-colors" onclick="window.placeTaskInQuadrant('q2')">
                                <h4 class="font-bold text-blue-700 text-center border-b border-blue-200 pb-2 mb-2">SCHEDULE<br><span class="text-xs font-normal text-blue-500 uppercase tracking-widest">Not Urgent, Important</span></h4>
                                <div id="quadrant-q2" class="flex-1 flex flex-col gap-2 overflow-y-auto"></div>
                            </div>
                            <!-- Urgent & Not Important -->
                            <div class="matrix-quadrant border-2 border-amber-200 bg-amber-50 rounded-xl p-4 flex flex-col relative cursor-pointer hover:bg-amber-100 transition-colors" onclick="window.placeTaskInQuadrant('q3')">
                                <h4 class="font-bold text-amber-700 text-center border-b border-amber-200 pb-2 mb-2">DELEGATE<br><span class="text-xs font-normal text-amber-500 uppercase tracking-widest">Urgent, Not Important</span></h4>
                                <div id="quadrant-q3" class="flex-1 flex flex-col gap-2 overflow-y-auto"></div>
                            </div>
                            <!-- Not Urgent & Not Important -->
                            <div class="matrix-quadrant border-2 border-slate-200 bg-slate-50 rounded-xl p-4 flex flex-col relative cursor-pointer hover:bg-slate-100 transition-colors" onclick="window.placeTaskInQuadrant('q4')">
                                <h4 class="font-bold text-slate-500 text-center border-b border-slate-200 pb-2 mb-2">DELETE<br><span class="text-xs font-normal text-slate-400 uppercase tracking-widest">Not Urgent, Not Important</span></h4>
                                <div id="quadrant-q4" class="flex-1 flex flex-col gap-2 overflow-y-auto"></div>
                            </div>
                        </div>

                        <!-- Feedback -->
                        <div id="matrixFeedback" class="mt-6 p-4 rounded-xl hidden text-center font-bold"></div>

                    </div>
                </div>

                <!-- Phase 3: AI Productivity Coach -->
                <div id="view-coach" class="time-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
                        
                        <!-- Left: Scenario and Writing Area -->
                        <div class="flex-1 min-w-0 flex flex-col">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                    <i data-lucide="bot" class="w-5 h-5 text-emerald-500"></i> AI Productivity Coach
                                </h2>
                                <select id="timeScenarioSelect" class="bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2 outline-none font-medium w-full sm:w-auto" onchange="window.loadTimeScenario()">
                                    <option value="overload">Scenario 1: Overloaded Schedule</option>
                                    <option value="boundaries">Scenario 2: Setting Boundaries</option>
                                    <option value="delay">Scenario 3: Communicating a Delay</option>
                                </select>
                            </div>
                            
                            <div class="bg-slate-800 rounded-xl p-4 sm:p-5 mb-4 border border-slate-700 relative overflow-hidden">
                                <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Productivity Scenario</h3>
                                <p id="timeScenarioContext" class="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                                    You woke up to 3 critical production bugs, 1 minor feature request, and 2 non-urgent meetings. Draft a message to your team/manager explaining your plan for the day.
                                </p>
                            </div>

                            <!-- Editor -->
                            <div class="flex-1 flex flex-col border border-slate-700 rounded-xl overflow-hidden focus-within:border-emerald-500 transition-colors bg-slate-800 shadow-sm min-h-[220px]">
                                <textarea id="timeDraftBody" class="flex-1 p-3 sm:p-4 outline-none resize-none text-xs sm:text-sm text-slate-200 leading-relaxed font-mono min-h-[140px] bg-transparent" placeholder="Draft your professional message..."></textarea>
                                
                                <div class="bg-slate-900 border-t border-slate-700 p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <button onclick="window.evaluateTimeDraft()" class="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm">
                                        <i data-lucide="send" class="w-4 h-4"></i> Evaluate Plan
                                    </button>
                                    <button onclick="window.clearTimeDraft()" class="w-full sm:w-auto text-slate-400 hover:text-white text-xs sm:text-sm font-medium px-4 py-1.5 transition-colors text-center">Clear</button>
                                </div>
                            </div>
                        </div>

                        <!-- Right: AI Feedback Pane -->
                        <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8 flex flex-col shrink-0">
                            <h2 class="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <i data-lucide="activity" class="w-5 h-5 text-emerald-500"></i> AI Analysis
                            </h2>
                            
                            <div id="aiTimeFeedbackContainer" class="flex-1 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50 min-h-[180px]">
                                <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                                    <i data-lucide="clock" class="w-8 h-8"></i>
                                </div>
                                <p class="text-slate-400 text-xs sm:text-sm font-medium">Type your plan or response. The AI will evaluate your prioritization, boundary-setting, and professionalism.</p>
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
    window.loadTimeScenario();
    window.resetMatrixGame();
    if (window.lucide) window.lucide.createIcons();
};

window.switchTimeTab = (tab) => {
    document.querySelectorAll('.time-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    document.querySelectorAll('#tab-toolkit, #tab-matrix, #tab-coach').forEach(el => {
        el.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50";
    });
    
    document.getElementById(`view-${tab}`).classList.remove('hidden');
    document.getElementById(`view-${tab}`).classList.add('block');
    
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm";
};


// Eisenhower Matrix Logic
window.matrixTasks = [
    { id: 't1', text: "Fix Production Server Crash", correctQ: 'q1', explanation: "Urgent & Important. DO FIRST." },
    { id: 't2', text: "Plan next week's architecture", correctQ: 'q2', explanation: "Important but Not Urgent. SCHEDULE." },
    { id: 't3', text: "Reply to 'hello' email from HR", correctQ: 'q3', explanation: "Urgent (someone is waiting) but Not Important. DELEGATE/DELAY." },
    { id: 't4', text: "Read tech news on Twitter", correctQ: 'q4', explanation: "Not Urgent & Not Important. DELETE." }
];

window.selectedMatrixTask = null;

window.resetMatrixGame = () => {
    window.selectedMatrixTask = null;
    document.getElementById('quadrant-q1').innerHTML = '';
    document.getElementById('quadrant-q2').innerHTML = '';
    document.getElementById('quadrant-q3').innerHTML = '';
    document.getElementById('quadrant-q4').innerHTML = '';
    
    const container = document.getElementById('matrixTasksContainer');
    container.innerHTML = '';
    
    window.matrixTasks.forEach(task => {
        container.innerHTML += `
            <div id="${task.id}" class="matrix-task-item bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 shadow-sm cursor-pointer hover:border-indigo-500 hover:text-indigo-600 transition-colors" onclick="window.selectMatrixTask('${task.id}')">
                ${task.text}
            </div>
        `;
    });
    
    const feedback = document.getElementById('matrixFeedback');
    feedback.classList.add('hidden');
    feedback.className = "mt-6 p-4 rounded-xl hidden text-center font-bold";
};

window.selectMatrixTask = (taskId) => {
    // Deselect all
    document.querySelectorAll('.matrix-task-item').forEach(el => {
        el.classList.remove('ring-2', 'ring-indigo-500', 'border-indigo-500', 'bg-indigo-50', 'text-indigo-700');
    });
    
    // Select this
    window.selectedMatrixTask = taskId;
    const el = document.getElementById(taskId);
    if(el) {
        el.classList.add('ring-2', 'ring-indigo-500', 'border-indigo-500', 'bg-indigo-50', 'text-indigo-700');
    }
};

window.placeTaskInQuadrant = (quadrantId) => {
    if (!window.selectedMatrixTask) return;
    
    const taskId = window.selectedMatrixTask;
    const taskObj = window.matrixTasks.find(t => t.id === taskId);
    
    const feedback = document.getElementById('matrixFeedback');
    feedback.classList.remove('hidden');
    
    if (taskObj.correctQ === quadrantId) {
        // Success
        const taskEl = document.getElementById(taskId);
        taskEl.classList.remove('ring-2', 'ring-indigo-500', 'border-indigo-500', 'bg-indigo-50', 'text-indigo-700');
        taskEl.classList.add('bg-white', 'text-slate-600');
        
        // Remove from container
        document.getElementById('matrixTasksContainer').removeChild(taskEl);
        
        // Add to quadrant
        document.getElementById(`quadrant-${quadrantId}`).appendChild(taskEl);
        
        feedback.className = "mt-6 p-4 rounded-xl text-center font-bold bg-emerald-100 text-emerald-700 border border-emerald-300";
        feedback.innerHTML = `Correct! "${taskObj.text}" is ${taskObj.explanation}`;
        
        // Check win
        if (document.getElementById('matrixTasksContainer').children.length === 0) {
            feedback.innerHTML = `<i data-lucide="check-circle" class="w-6 h-6 inline-block mb-1"></i><br>Excellent Job! You successfully prioritized all tasks.`;
            if (window.lucide) window.lucide.createIcons();
        }
        
    } else {
        // Fail
        feedback.className = "mt-6 p-4 rounded-xl text-center font-bold bg-rose-100 text-rose-700 border border-rose-300 animate-shake";
        feedback.innerHTML = `Incorrect. "${taskObj.text}" does not belong there. Think about Urgent vs Important.`;
        setTimeout(() => feedback.classList.remove('animate-shake'), 500);
    }
    
    window.selectedMatrixTask = null;
    document.querySelectorAll('.matrix-task-item').forEach(el => {
        el.classList.remove('ring-2', 'ring-indigo-500', 'border-indigo-500', 'bg-indigo-50', 'text-indigo-700');
    });
};


// Coach Logic
window.timeScenarios = {
    'overload': {
        context: "You woke up to 3 critical production bugs, 1 minor feature request, and 2 non-urgent meetings. Draft a message to your team/manager explaining your plan for the day.",
    },
    'boundaries': {
        context: "You are constantly interrupted on Slack while trying to code a complex feature. You need 3 hours of uninterrupted focus. Draft a message to your team establishing this boundary.",
    },
    'delay': {
        context: "You realized you spent too much time on a low-priority task (80/20 rule fail), and now you will miss a deadline for an important feature. Draft a message communicating this delay."
    }
};

window.loadTimeScenario = () => {
    const val = document.getElementById('timeScenarioSelect').value;
    const scenario = window.timeScenarios[val];
    document.getElementById('timeScenarioContext').innerText = scenario.context;
    document.getElementById('timeDraftBody').value = '';
    
    document.getElementById('aiTimeFeedbackContainer').innerHTML = `
        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
            <i data-lucide="clock" class="w-8 h-8"></i>
        </div>
        <p class="text-slate-400 text-sm font-medium">Type your plan or response. The AI will evaluate your prioritization, boundary-setting, and professionalism.</p>
    `;
    if (window.lucide) window.lucide.createIcons();
};

window.clearTimeDraft = () => {
    document.getElementById('timeDraftBody').value = '';
};

window.evaluateTimeDraft = () => {
    const body = document.getElementById('timeDraftBody').value.trim();
    const container = document.getElementById('aiTimeFeedbackContainer');

    if (!body) {
        container.innerHTML = `<p class="text-emerald-500 font-bold">Please draft a response first!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mb-4"></div>
        <p class="text-emerald-500 font-medium">Analyzing productivity tactics...</p>
    `;

    setTimeout(() => {
        let score = 100;
        let feedbackHTML = '';
        const val = document.getElementById('timeScenarioSelect').value;

        // Overload logic
        if (val === 'overload') {
            if (!/\b(prioritiz|focusing on|first|bugs|critical)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Poor Prioritization:</b> You must explicitly state that you are prioritizing the critical bugs over everything else today (Eat the Frog).</p></div></div>`;
            }
            if (!/\b(skip|decline|miss|reschedule|meetings)\b/i.test(body) && !/\b(delay|push|feature)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>No Boundaries Set:</b> To fix 3 bugs, you probably need to skip the non-urgent meetings or push the feature. State what you are NOT doing.</p></div></div>`;
            }
        }

        // Boundaries logic
        if (val === 'boundaries') {
            if (/\b(don't bother me|leave me alone|stop messaging)\b/i.test(body)) {
                score -= 30;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Unprofessional Tone:</b> You can't tell your team to 'leave you alone'. Use professional terms like 'focus time', 'heads down', or 'do not disturb'.</p></div></div>`;
            }
            if (!/\b(hours|until|time|pm|am)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>No Timeframe Given:</b> When time-blocking, you must tell the team *when* you will be back online or available.</p></div></div>`;
            }
            if (!/\b(urgent|emergency|call me)\b/i.test(body)) {
                score -= 10;
                feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="info" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Missing Protocol:</b> Always provide an escalation path (e.g., 'Call my cell if there is a production emergency').</p></div></div>`;
            }
        }

        // Delay logic
        if (val === 'delay') {
            if (!/\b(apologize|sorry|my mistake)\b/i.test(body)) {
                score -= 15;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Missing Accountability:</b> When you mismanage your time, take ownership and apologize.</p></div></div>`;
            }
            if (!/\b(tomorrow|expected|update|timeline)\b/i.test(body)) {
                score -= 20;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>No New Timeline:</b> You informed them of the delay, but didn't provide a concrete updated deadline.</p></div></div>`;
            }
        }

        if (score === 100) {
            feedbackHTML += `<div class="bg-emerald-900/50 border border-emerald-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-200"><b>Excellent Time Management!</b> You communicated your priorities clearly, established boundaries, and maintained professionalism.</p></div></div>`;
        } else if (score >= 70) {
            feedbackHTML += `<div class="bg-blue-900/50 border border-blue-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i><p class="text-sm text-blue-200"><b>Good effort.</b> Review the feedback to sharpen your productivity communication.</p></div></div>`;
        }

        container.innerHTML = `
            <div class="w-full flex flex-col items-center bg-slate-900 p-2 rounded-xl shadow-sm mb-4 border border-slate-700">
                <div class="text-3xl font-extrabold text-${score > 70 ? 'emerald' : 'rose'}-500">${score}/100</div>
                <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Productivity Score</div>
            </div>
            <div class="w-full space-y-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                ${feedbackHTML}
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

    }, 1200);
};
