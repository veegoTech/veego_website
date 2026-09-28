window.renderPresentationModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-rose-50 rounded-lg text-rose-600 hidden sm:block"><i data-lucide="projector" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: Presentation Skills</span>`;
    }

    let progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    let isCompleted = progress.completedLessons && progress.completedLessons.includes(`pro_${day}`);

    let html = `
        <div class="animate-fade-in mx-auto space-y-12 pb-20 bg-slate-50 min-h-screen">
            
            <!-- HEADER -->
            <div class="relative bg-gradient-to-r from-rose-600 to-pink-700 rounded-b-3xl sm:rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden text-white mb-8 mx-auto max-w-6xl mt-4">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8">
                        <div class="w-20 sm:w-24 h-20 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0 shadow-inner">
                            <i data-lucide="projector" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-rose-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">Presentation Skills & Design</h1>
                            <p class="text-rose-50 text-lg max-w-2xl">Learn how to plan, design, and deliver impactful corporate presentations while leveraging AI tools for maximum productivity.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4 space-y-8" id="pres-sim-container">
                
                <!-- Navigation Tabs (No sticky to avoid overlaps) -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap gap-2 mb-6">
                    <button onclick="window.switchPresTab('design')" id="tab-design" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-rose-50 text-rose-700 border border-rose-100 shadow-sm">
                        <i data-lucide="layout" class="w-5 h-5"></i> Slide Design
                    </button>
                    <button onclick="window.switchPresTab('plan')" id="tab-plan" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="git-merge" class="w-5 h-5"></i> Structure & Planning
                    </button>
                    <button onclick="window.switchPresTab('coach')" id="tab-coach" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="bot" class="w-5 h-5"></i> AI Presentation Coach
                    </button>
                </div>

                <!-- Phase 1: Slide Design -->
                <div id="view-design" class="pres-view block animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl overflow-hidden p-6 relative border border-slate-800 text-white">
                        <div class="text-center mb-8">
                            <h2 class="text-2xl font-bold flex items-center justify-center gap-2">
                                <i data-lucide="layout-template" class="text-rose-400"></i> Corporate Slide Makeover
                            </h2>
                            <p class="text-slate-400 mt-2">See how professional design principles transform a terrible slide into an impactful one.</p>
                        </div>

                        <!-- Interactive Slide Simulator -->
                        <div class="max-w-4xl mx-auto">
                            <!-- Toggle Button -->
                            <div class="flex justify-center mb-6">
                                <button id="slideToggleBtn" onclick="window.toggleSlideDesign()" class="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1 flex items-center gap-2">
                                    <i data-lucide="wand-2" class="w-5 h-5"></i> Fix Design Using AI
                                </button>
                            </div>

                            <!-- The Slide Container -->
                            <div class="relative w-full aspect-video bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-700 mx-auto border-4 border-slate-700">
                                
                                <!-- BAD SLIDE -->
                                <div id="badSlide" class="absolute inset-0 bg-yellow-100 p-8 flex flex-col transition-opacity duration-500 opacity-100">
                                    <h1 class="text-red-600 font-serif text-3xl underline mb-4 text-center">Q3 SALES REPORT AND ANALYSIS OF OUR COMPANY METRICS FOR THE QUARTER ENDING SEPTEMBER!!!</h1>
                                    <div class="flex-1 overflow-hidden">
                                        <p class="text-black text-[10px] font-sans leading-tight">
                                            In this quarter we have seen a lot of growth but also some challenges that we need to address immediately. The sales team has been working very hard to close deals but the marketing leads have been low quality which resulted in a 15% drop in conversions compared to Q2. However, enterprise sales grew by 40% which saved the overall revenue numbers. We need to hire 5 more marketing executives next month to fix the lead pipeline. Also, customer churn is at 5% which is higher than our 3% target. We think the new UI update caused confusion.
                                        </p>
                                        <p class="text-green-800 text-[10px] font-comic-sans mt-2">
                                            - Total Revenue: $2.4M (Up 10%)
                                            - New Customers: 450 (Down 5%)
                                            - Churn: 5% (Target 3%)
                                            - Enterprise Deals: 12 (Up 40%)
                                        </p>
                                        <div class="mt-4 flex justify-center">
                                            <div class="w-32 h-32 bg-blue-300 rounded-full border-4 border-purple-500 flex items-center justify-center text-xs font-bold text-center">Random<br>Chart<br>Image</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- GOOD SLIDE -->
                                <div id="goodSlide" class="absolute inset-0 bg-slate-50 p-10 flex flex-col transition-opacity duration-500 opacity-0 pointer-events-none">
                                    <div class="flex justify-between items-start mb-8">
                                        <div>
                                            <h1 class="text-slate-800 font-sans font-extrabold text-3xl tracking-tight">Q3 Sales Performance</h1>
                                            <p class="text-slate-500 mt-1">Enterprise growth offsets marketing pipeline challenges.</p>
                                        </div>
                                        <div class="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                                            <i data-lucide="trending-up" class="text-rose-600 w-6 h-6"></i>
                                        </div>
                                    </div>
                                    
                                    <div class="grid grid-cols-4 gap-4 mb-8">
                                        <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm border-l-4 border-l-emerald-500">
                                            <div class="text-slate-400 text-xs font-bold uppercase mb-1">Total Revenue</div>
                                            <div class="text-2xl font-bold text-slate-800">$2.4M <span class="text-emerald-500 text-sm font-normal">↑ 10%</span></div>
                                        </div>
                                        <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm border-l-4 border-l-rose-500">
                                            <div class="text-slate-400 text-xs font-bold uppercase mb-1">New Customers</div>
                                            <div class="text-2xl font-bold text-slate-800">450 <span class="text-rose-500 text-sm font-normal">↓ 5%</span></div>
                                        </div>
                                        <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm border-l-4 border-l-amber-500">
                                            <div class="text-slate-400 text-xs font-bold uppercase mb-1">Churn Rate</div>
                                            <div class="text-2xl font-bold text-slate-800">5% <span class="text-amber-500 text-sm font-normal">(Target 3%)</span></div>
                                        </div>
                                        <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm border-l-4 border-l-emerald-500">
                                            <div class="text-slate-400 text-xs font-bold uppercase mb-1">Enterprise Deals</div>
                                            <div class="text-2xl font-bold text-slate-800">12 <span class="text-emerald-500 text-sm font-normal">↑ 40%</span></div>
                                        </div>
                                    </div>

                                    <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex-1">
                                        <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2"><i data-lucide="alert-circle" class="w-5 h-5 text-amber-500"></i> Action Items</h3>
                                        <ul class="space-y-3 text-slate-600 text-sm">
                                            <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-500"></i> Hire 5 new marketing executives to rebuild lead pipeline.</li>
                                            <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-500"></i> Investigate UI update impact on customer churn.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Learning Points -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                    <h4 class="font-bold text-rose-400 flex items-center gap-2 mb-2"><i data-lucide="type" class="w-4 h-4"></i> Less is More</h4>
                                    <p class="text-sm text-slate-400">Never write paragraphs. Use bullet points and speak to explain the details.</p>
                                </div>
                                <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                    <h4 class="font-bold text-rose-400 flex items-center gap-2 mb-2"><i data-lucide="layout" class="w-4 h-4"></i> Visual Hierarchy</h4>
                                    <p class="text-sm text-slate-400">Use size, weight, and color to guide the eye to the most important numbers first.</p>
                                </div>
                                <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                    <h4 class="font-bold text-rose-400 flex items-center gap-2 mb-2"><i data-lucide="image" class="w-4 h-4"></i> Consistent Contrast</h4>
                                    <p class="text-sm text-slate-400">Avoid neon colors or messy backgrounds. Stick to clean, corporate palettes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Phase 2: Structure & Planning -->
                <div id="view-plan" class="pres-view hidden animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div class="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><i data-lucide="git-merge"></i></div>
                            The 11-Step Presentation Outline
                        </h2>
                        <p class="text-slate-600 mb-8 text-lg">Every professional corporate presentation follows a logical flow to keep the audience engaged.</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl"><span class="font-bold text-indigo-600 mr-2">01</span> Title Slide</div>
                            <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl"><span class="font-bold text-indigo-600 mr-2">02</span> Agenda</div>
                            <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl"><span class="font-bold text-indigo-600 mr-2">03</span> Introduction</div>
                            <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl"><span class="font-bold text-indigo-600 mr-2">04</span> Problem Statement</div>
                            <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl"><span class="font-bold text-indigo-600 mr-2">05</span> Main Content</div>
                            <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl"><span class="font-bold text-indigo-600 mr-2">06</span> Case Studies</div>
                            <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl"><span class="font-bold text-indigo-600 mr-2">07</span> Data & Charts</div>
                            <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl"><span class="font-bold text-indigo-600 mr-2">08</span> Solution</div>
                            <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl"><span class="font-bold text-indigo-600 mr-2">09</span> Summary</div>
                            <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl"><span class="font-bold text-indigo-600 mr-2">10</span> Q & A</div>
                            <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl"><span class="font-bold text-indigo-600 mr-2">11</span> Thank You</div>
                        </div>

                        <hr class="my-10 border-slate-200">

                        <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div class="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><i data-lucide="bot"></i></div>
                            Modern AI Presentation Workflow
                        </h2>
                        <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-6 relative">
                            <div class="absolute -top-3 -right-3 bg-rose-500 text-white font-bold text-xs py-1 px-3 rounded-full shadow-lg animate-pulse">CRITICAL RULE</div>
                            <p class="text-emerald-800 font-medium mb-4">AI tools like ChatGPT, Copilot, Gamma.ai or Beautiful.ai can cut presentation creation time in half. But you must follow this workflow to ensure accuracy:</p>
                            
                            <ol class="list-decimal pl-5 space-y-3 text-slate-700">
                                <li><b>Outline Generation:</b> Ask AI to structure your topics.</li>
                                <li><b>Content Generation:</b> Ask AI to summarize long reports into bullet points.</li>
                                <li><b>Image Generation:</b> Use AI to generate icons or placeholder graphics.</li>
                                <li class="text-rose-600 font-bold bg-rose-100/50 p-2 rounded inline-block w-full">4. HUMAN REVIEW: You MUST fact-check every single bullet point before presenting. AI hallucinates data.</li>
                                <li><b>Rehearsal:</b> Practice delivering the presentation without reading the slides.</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <!-- Phase 3: AI Speech/Content Coach -->
                <div id="view-coach" class="pres-view hidden animate-fade-in">
                    <div class="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
                        
                        <!-- Left: Scenario and Writing Area -->
                        <div class="flex-1 min-w-0 flex flex-col">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                    <i data-lucide="pen-tool" class="w-5 h-5 text-rose-500"></i> AI Content Coach
                                </h2>
                                <select id="presScenarioSelect" class="bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block p-2 outline-none font-medium w-full sm:w-auto" onchange="window.loadPresScenario()">
                                    <option value="status">Scenario 1: Project Status Slide</option>
                                    <option value="demo">Scenario 2: Technical Demo Slide</option>
                                </select>
                            </div>
                            
                            <div class="bg-slate-800 rounded-xl p-4 sm:p-5 mb-4 border border-slate-700 relative overflow-hidden">
                                <div class="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Slide Context</h3>
                                <p id="presScenarioContext" class="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                                    Create a slide summarizing the current status of the "Payment Gateway API" project.
                                </p>
                            </div>

                            <!-- Editor -->
                            <div class="flex-1 flex flex-col border border-slate-700 rounded-xl overflow-hidden focus-within:border-rose-500 transition-colors bg-slate-800 shadow-sm min-h-[240px]">
                                <input type="text" id="presSlideTitle" class="w-full bg-slate-900 border-b border-slate-700 p-3 text-white font-bold outline-none text-xs sm:text-sm" placeholder="Enter Slide Title...">
                                <textarea id="presDraftBody" class="flex-1 p-3 sm:p-4 outline-none resize-none text-xs sm:text-sm text-slate-200 leading-relaxed font-mono min-h-[160px] bg-transparent" placeholder="Type your slide bullet points here..."></textarea>
                                
                                <div class="bg-slate-900 border-t border-slate-700 p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <button onclick="window.evaluatePresDraft()" class="w-full sm:w-auto bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm">
                                        <i data-lucide="search" class="w-4 h-4"></i> Evaluate Slide
                                    </button>
                                    <button onclick="window.clearPresDraft()" class="w-full sm:w-auto text-slate-400 hover:text-white text-xs sm:text-sm font-medium px-4 py-1.5 transition-colors text-center">Clear</button>
                                </div>
                            </div>
                        </div>

                        <!-- Right: AI Feedback Pane -->
                        <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8 flex flex-col shrink-0">
                            <h2 class="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <i data-lucide="activity" class="w-5 h-5 text-emerald-500"></i> AI Analysis
                            </h2>
                            
                            <div id="aiPresFeedbackContainer" class="flex-1 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50 min-h-[180px]">
                                <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                                    <i data-lucide="projector" class="w-8 h-8"></i>
                                </div>
                                <p class="text-slate-400 text-xs sm:text-sm font-medium">Type your slide content and click "Evaluate" to receive feedback on text density, clarity, and design readiness.</p>
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
    window.loadPresScenario();
    if (window.lucide) window.lucide.createIcons();
};

window.switchPresTab = (tab) => {
    // Hide all
    document.querySelectorAll('.pres-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    // Reset buttons
    document.querySelectorAll('#tab-design, #tab-plan, #tab-coach').forEach(el => {
        el.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50";
    });

    // Show active
    document.getElementById(`view-${tab}`).classList.remove('hidden');
    document.getElementById(`view-${tab}`).classList.add('block');

    // Style active button
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-rose-50 text-rose-700 border border-rose-100 shadow-sm";
};

// Toggle Slide Design Logic
window.isGoodSlideVisible = false;
window.toggleSlideDesign = () => {
    window.isGoodSlideVisible = !window.isGoodSlideVisible;
    const bad = document.getElementById('badSlide');
    const good = document.getElementById('goodSlide');
    const btn = document.getElementById('slideToggleBtn');

    if (window.isGoodSlideVisible) {
        bad.classList.remove('opacity-100');
        bad.classList.add('opacity-0', 'pointer-events-none');
        good.classList.remove('opacity-0', 'pointer-events-none');
        good.classList.add('opacity-100');
        btn.innerHTML = `<i data-lucide="rotate-ccw" class="w-5 h-5"></i> View Bad Design`;
        btn.className = "bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1 flex items-center gap-2";
    } else {
        good.classList.remove('opacity-100');
        good.classList.add('opacity-0', 'pointer-events-none');
        bad.classList.remove('opacity-0', 'pointer-events-none');
        bad.classList.add('opacity-100');
        btn.innerHTML = `<i data-lucide="wand-2" class="w-5 h-5"></i> Fix Design Using AI`;
        btn.className = "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1 flex items-center gap-2";
    }
    if (window.lucide) window.lucide.createIcons();
};

window.presScenarios = {
    'status': {
        context: "Create a slide summarizing the current status of the 'Payment Gateway API' project.",
    },
    'demo': {
        context: "Create a slide to introduce a technical demo of the new Authentication Flow.",
    }
};

window.loadPresScenario = () => {
    const val = document.getElementById('presScenarioSelect').value;
    const scenario = window.presScenarios[val];
    document.getElementById('presScenarioContext').innerText = scenario.context;
    document.getElementById('presSlideTitle').value = '';
    document.getElementById('presDraftBody').value = '';

    // Reset feedback
    document.getElementById('aiPresFeedbackContainer').innerHTML = `
        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
            <i data-lucide="projector" class="w-8 h-8"></i>
        </div>
        <p class="text-slate-400 text-sm font-medium">Type your slide content and click "Evaluate" to receive feedback on text density, clarity, and design readiness.</p>
    `;
    if (window.lucide) window.lucide.createIcons();
};

window.clearPresDraft = () => {
    document.getElementById('presSlideTitle').value = '';
    document.getElementById('presDraftBody').value = '';
};

// Mock AI Evaluation Logic for Presentation Content
window.evaluatePresDraft = () => {
    const title = document.getElementById('presSlideTitle').value.trim();
    const body = document.getElementById('presDraftBody').value.trim();
    const container = document.getElementById('aiPresFeedbackContainer');

    if (!title && !body) {
        container.innerHTML = `<p class="text-rose-500 font-bold">Please draft a slide first!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-500 mb-4"></div>
        <p class="text-rose-500 font-medium">Analyzing slide design & content...</p>
    `;

    setTimeout(() => {
        let score = 100;
        let feedbackHTML = '';

        if (!title) {
            score -= 20;
            feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Missing Title:</b> Every slide needs a clear, concise title indicating what it is about.</p></div></div>`;
        }

        if (!body) {
            score -= 30;
            feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Empty Body:</b> Provide some bullet points for the slide content.</p></div></div>`;
        } else {
            // Check text density
            const sentences = body.split(/[.!?]+/).length - 1;
            const words = body.split(/\s+/).length;

            if (words > 40) {
                score -= 30;
                feedbackHTML += `<div class="bg-rose-900/50 border border-rose-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-400 mt-0.5 shrink-0"></i><p class="text-sm text-rose-200"><b>Too Much Text:</b> This slide contains ${words} words. No one will read it. Condense it into 3-4 short bullet points and speak the rest.</p></div></div>`;
            } else if (sentences > 3 && !body.includes('-') && !body.includes('*')) {
                score -= 20;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>Formatting:</b> Avoid writing paragraphs. Use bullet points (using hyphens or asterisks) for readability.</p></div></div>`;
            }

            // Check for ALL CAPS
            if (title && title === title.toUpperCase() && title.length > 5) {
                score -= 10;
                feedbackHTML += `<div class="bg-amber-900/50 border border-amber-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i><p class="text-sm text-amber-200"><b>ALL CAPS Title:</b> Avoid using all caps for slide titles. It feels aggressive and is harder to read.</p></div></div>`;
            }
        }

        if (score === 100) {
            feedbackHTML += `<div class="bg-emerald-900/50 border border-emerald-500/30 rounded-lg p-3 text-left w-full mb-3"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-200"><b>Excellent!</b> Clear, concise, and perfectly suited for a visual presentation slide.</p></div></div>`;
        }

        container.innerHTML = `
            <div class="w-full flex flex-col items-center bg-slate-900 p-2 rounded-xl shadow-sm mb-4 border border-slate-700">
                <div class="text-3xl font-extrabold text-${score > 70 ? 'emerald' : 'rose'}-500">${score}/100</div>
                <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Design Score</div>
            </div>
            <div class="w-full space-y-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                ${feedbackHTML}
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

    }, 1200);
};
