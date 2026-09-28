let proTopic1State = {
    currentSection: 1,
    maxUnlockedSection: 1
};

window.renderProSelfIntroModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const bgGradient = 'from-slate-50 to-slate-100';

    const sections = [
        { id: 1, title: 'Introduction', icon: 'book-open' },
        { id: 2, title: 'Structure', icon: 'layout-list' },
        { id: 3, title: 'Adaptations', icon: 'users' },
        { id: 4, title: 'Effectiveness', icon: 'zap' },
        { id: 5, title: 'Body Language', icon: 'user' },
        { id: 6, title: 'Follow-up Qs', icon: 'help-circle' },
        { id: 7, title: 'Mistakes', icon: 'alert-triangle' },
        { id: 8, title: 'IT Scenarios', icon: 'briefcase' },
        { id: 9, title: 'Activities', icon: 'mouse-pointer-click' },
        { id: 10, title: 'AI Coach', icon: 'mic' },
        { id: 11, title: 'Assessment', icon: 'check-square' }
    ];

    const renderSidebar = () => {
        return `
            <div class="w-full md:w-64 md:min-w-[250px] md:max-w-[270px] shrink-0 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:sticky md:top-6 h-fit z-10 flex flex-col">
                <h3 class="font-bold text-slate-800 mb-2 md:mb-4 px-2 uppercase tracking-wider text-xs hidden md:block">Self-Intro Module</h3>
                <div class="flex overflow-x-auto md:flex-col gap-2 md:gap-0 md:space-y-1 pb-2 md:pb-0 snap-x" style="scrollbar-width: none;">
                    ${sections.map(s => {
                        const isUnlocked = s.id <= proTopic1State.maxUnlockedSection || window.isStaffModeOn;
                        const isActive = s.id === proTopic1State.currentSection;
                        
                        let classes = 'snap-center shrink-0 md:w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-sm transition-all duration-300 ';
                        let icon = s.icon;
                        
                        if (isActive) {
                            classes += 'bg-cyan-50 text-cyan-700 font-bold md:border-l-2 md:border-b-0 border-b-2 border-cyan-500';
                        } else if (isUnlocked) {
                            classes += 'bg-slate-50 md:bg-transparent text-slate-600 hover:bg-slate-100 md:hover:bg-slate-50 hover:text-cyan-600';
                        } else {
                            classes += 'bg-slate-50 md:bg-transparent text-slate-400 opacity-50 cursor-not-allowed';
                            icon = 'lock';
                        }
                        
                        return `
                            <button ${isUnlocked ? `onclick="window.proTopic1Nav(${s.id})"` : ''} class="${classes}">
                                <div class="flex items-center gap-2 whitespace-nowrap">
                                    <i data-lucide="${icon}" class="w-4 h-4 shrink-0"></i>
                                    <span>${s.id}. ${s.title}</span>
                                </div>
                                ${isActive ? '<i data-lucide="chevron-right" class="w-4 h-4 hidden md:block ml-2"></i>' : ''}
                            </button>
                        `;
                    }).join('')}
                </div>
                
                <div class="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-100 px-2">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xs text-slate-500">Progress</span>
                        <span class="text-xs font-bold text-cyan-600">${Math.round((proTopic1State.maxUnlockedSection / 11) * 100)}%</span>
                    </div>
                    <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full bg-cyan-500 rounded-full transition-all duration-500" style="width: ${(proTopic1State.maxUnlockedSection / 11) * 100}%"></div>
                    </div>
                </div>
            </div>
        `;
    };

    const renderSectionContent = () => {
        const s = proTopic1State.currentSection;
        let content = '';
        
        switch(s) {
            case 1:
                content = `
                    <div class="space-y-6 animate-fade-in">
                        <div class="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                            <i data-lucide="user-circle" class="absolute -right-4 -bottom-4 w-40 h-40 opacity-10"></i>
                            <h2 class="text-3xl font-extrabold mb-4 relative z-10">What is a Professional Self-Introduction?</h2>
                            <p class="text-cyan-50 text-lg relative z-10">Your self-introduction is your first impression. It establishes your credibility, highlights your relevance, and builds trust.</p>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 class="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2"><i data-lucide="map-pin" class="text-emerald-500"></i> Where It's Used</h3>
                                <ul class="space-y-3">
                                    <li class="flex items-start gap-2"><i data-lucide="check" class="text-emerald-500 mt-1"></i> <span><strong>HR & Tech Interviews:</strong> The standard "Tell me about yourself".</span></li>
                                    <li class="flex items-start gap-2"><i data-lucide="check" class="text-emerald-500 mt-1"></i> <span><strong>Client Meetings:</strong> Introducing your role in the project.</span></li>
                                    <li class="flex items-start gap-2"><i data-lucide="check" class="text-emerald-500 mt-1"></i> <span><strong>Daily Stand-ups:</strong> Quick intro for cross-functional teams.</span></li>
                                    <li class="flex items-start gap-2"><i data-lucide="check" class="text-emerald-500 mt-1"></i> <span><strong>Networking:</strong> Seminars, conferences, or job fairs.</span></li>
                                </ul>
                            </div>
                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 class="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2"><i data-lucide="star" class="text-amber-500"></i> Why First Impressions Matter</h3>
                                <p class="text-slate-600 mb-4">In the corporate world, people make judgments about your competence and confidence within the first 30 seconds of meeting you.</p>
                                <div class="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                    <strong class="text-amber-800 block mb-1">Corporate Fact:</strong>
                                    <span class="text-amber-700 text-sm">A confident introduction can offset minor gaps in technical knowledge during an interview.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 2:
                content = `
                    <div class="space-y-6 animate-fade-in">
                        <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <h2 class="text-2xl font-bold text-slate-800 mb-2">The 12-Step Introduction Structure</h2>
                            <p class="text-slate-500 mb-8">A complete professional introduction covers these key areas. You don't need all 12 every time, but this is the master blueprint.</p>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${[
                                    {num: 1, title: 'Greeting', ex: 'Good morning, panel.'},
                                    {num: 2, title: 'Name', ex: 'I am Priya Sharma.'},
                                    {num: 3, title: 'Education', ex: 'I recently graduated with a B.Tech in IT.'},
                                    {num: 4, title: 'Current Status', ex: 'I am a fresher seeking developer roles.'},
                                    {num: 5, title: 'General Skills', ex: 'I am a strong problem solver.'},
                                    {num: 6, title: 'Technical Skills', ex: 'My expertise includes Java and React.'},
                                    {num: 7, title: 'Projects', ex: 'I built an e-commerce platform.'},
                                    {num: 8, title: 'Experience', ex: 'I interned at TechCorp for 6 months.'},
                                    {num: 9, title: 'Strengths', ex: 'I adapt quickly to new technologies.'},
                                    {num: 10, title: 'Career Goals', ex: 'I want to become a Full-Stack Architect.'},
                                    {num: 11, title: 'Why this Role', ex: 'I admire your company’s culture.'},
                                    {num: 12, title: 'Closing', ex: 'Thank you for this opportunity.'}
                                ].map(s => `
                                    <div class="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <div class="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 font-bold flex items-center justify-center shrink-0">${s.num}</div>
                                        <div>
                                            <div class="font-bold text-slate-800">${s.title}</div>
                                            <div class="text-sm text-slate-500 italic">"${s.ex}"</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 3:
                content = `
                    <div class="space-y-6 animate-fade-in">
                        <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <h2 class="text-2xl font-bold text-slate-800 mb-6">Adapting to the Audience</h2>
                            <div class="space-y-6">
                                <div class="p-5 border border-indigo-100 bg-indigo-50/30 rounded-xl">
                                    <h3 class="font-bold text-indigo-700 mb-2">1. HR Interview</h3>
                                    <p class="text-sm text-slate-600 mb-3">Focus on personality, culture fit, and soft skills.</p>
                                    <div class="bg-white p-3 rounded border border-indigo-100 text-sm">"I am a team player who loves solving problems. In my last internship, I organized the tech fest..."</div>
                                </div>
                                <div class="p-5 border border-emerald-100 bg-emerald-50/30 rounded-xl">
                                    <h3 class="font-bold text-emerald-700 mb-2">2. Technical Interview</h3>
                                    <p class="text-sm text-slate-600 mb-3">Focus on tech stack, projects, and architecture.</p>
                                    <div class="bg-white p-3 rounded border border-emerald-100 text-sm">"My expertise is in MERN stack. I designed a REST API that handles 10k requests..."</div>
                                </div>
                                <div class="p-5 border border-amber-100 bg-amber-50/30 rounded-xl">
                                    <h3 class="font-bold text-amber-700 mb-2">3. First Day at Office</h3>
                                    <p class="text-sm text-slate-600 mb-3">Focus on your role, excitement, and approachability.</p>
                                    <div class="bg-white p-3 rounded border border-amber-100 text-sm">"Hi everyone, I'm Rahul, joining as a Jr. Dev. I'm really excited to learn from all of you..."</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 4:
                content = `
                    <div class="space-y-6 animate-fade-in">
                        <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <h2 class="text-2xl font-bold text-slate-800 mb-6">Building an Effective Introduction</h2>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div class="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                                    <h3 class="font-bold text-emerald-700 mb-4 flex items-center gap-2"><i data-lucide="thumbs-up"></i> The Right Way</h3>
                                    <ul class="space-y-2 text-sm text-emerald-900">
                                        <li>✔️ Maintain eye contact</li>
                                        <li>✔️ Keep it concise (60-90 seconds)</li>
                                        <li>✔️ Highlight relevant skills only</li>
                                        <li>✔️ Smile naturally</li>
                                        <li>✔️ Show enthusiasm for the role</li>
                                    </ul>
                                </div>
                                <div class="bg-rose-50 rounded-xl p-6 border border-rose-100">
                                    <h3 class="font-bold text-rose-700 mb-4 flex items-center gap-2"><i data-lucide="thumbs-down"></i> The Wrong Way</h3>
                                    <ul class="space-y-2 text-sm text-rose-900">
                                        <li>❌ Recite a memorized paragraph</li>
                                        <li>❌ Mention unrelated hobbies (e.g. eating)</li>
                                        <li>❌ Stare at the ceiling/floor</li>
                                        <li>❌ Speak in a monotone, robotic voice</li>
                                        <li>❌ Exaggerate or lie about achievements</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 5:
                content = `
                    <div class="space-y-6 animate-fade-in">
                        <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <h2 class="text-2xl font-bold text-slate-800 mb-6">Body Language & Voice</h2>
                            
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div class="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                                    <i data-lucide="users" class="w-8 h-8 text-blue-500 mx-auto mb-2"></i>
                                    <div class="font-bold text-slate-700 mb-1">Posture</div>
                                    <div class="text-xs text-slate-500">Sit straight, lean slightly forward to show engagement.</div>
                                </div>
                                <div class="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                                    <i data-lucide="eye" class="w-8 h-8 text-blue-500 mx-auto mb-2"></i>
                                    <div class="font-bold text-slate-700 mb-1">Eye Contact</div>
                                    <div class="text-xs text-slate-500">Look directly at the panel. Don't stare intensely.</div>
                                </div>
                                <div class="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                                    <i data-lucide="hand" class="w-8 h-8 text-blue-500 mx-auto mb-2"></i>
                                    <div class="font-bold text-slate-700 mb-1">Gestures</div>
                                    <div class="text-xs text-slate-500">Use subtle hand gestures to emphasize points. Avoid fidgeting.</div>
                                </div>
                                <div class="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                                    <i data-lucide="mic" class="w-8 h-8 text-blue-500 mx-auto mb-2"></i>
                                    <div class="font-bold text-slate-700 mb-1">Voice Pace</div>
                                    <div class="text-xs text-slate-500">Speak 10% slower than your casual talking speed.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 6:
                content = `
                    <div class="space-y-6 animate-fade-in">
                        <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <h2 class="text-2xl font-bold text-slate-800 mb-6">Common Follow-up Questions</h2>
                            <p class="text-slate-600 mb-6">Your introduction sets the trap. Interviewers will pick things you mentioned to ask follow-up questions.</p>
                            
                            <div class="space-y-4">
                                <div class="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <div class="font-bold text-blue-800 mb-2">Q: "You mentioned working on React. Can you explain your project?"</div>
                                    <div class="text-sm text-blue-600"><strong>Strategy:</strong> Use the STAR method (Situation, Task, Action, Result) to explain the project technically.</div>
                                </div>
                                <div class="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <div class="font-bold text-blue-800 mb-2">Q: "What do you consider your biggest weakness?"</div>
                                    <div class="text-sm text-blue-600"><strong>Strategy:</strong> Name a real but non-fatal weakness, and immediately explain what steps you take to overcome it.</div>
                                </div>
                                <div class="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <div class="font-bold text-blue-800 mb-2">Q: "Why do you want to join our company?"</div>
                                    <div class="text-sm text-blue-600"><strong>Strategy:</strong> Connect your skills/goals to the company's recent news, product, or culture.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 7:
                content = `
                    <div class="space-y-6 animate-fade-in">
                        <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <h2 class="text-2xl font-bold text-slate-800 mb-6">Avoid These Critical Mistakes</h2>
                            
                            <ul class="space-y-4">
                                <li class="flex gap-4 items-start p-4 bg-rose-50 rounded-xl">
                                    <i data-lucide="x-circle" class="text-rose-500 mt-1 shrink-0"></i>
                                    <div>
                                        <div class="font-bold text-rose-800">Memorizing Word-for-Word</div>
                                        <div class="text-sm text-rose-600">If you forget one word, you'll freeze. Memorize the bullet points, not the script.</div>
                                    </div>
                                </li>
                                <li class="flex gap-4 items-start p-4 bg-rose-50 rounded-xl">
                                    <i data-lucide="x-circle" class="text-rose-500 mt-1 shrink-0"></i>
                                    <div>
                                        <div class="font-bold text-rose-800">Criticizing Past Employers / Colleges</div>
                                        <div class="text-sm text-rose-600">Never say "My college didn't teach me well." It shows a negative attitude.</div>
                                    </div>
                                </li>
                                <li class="flex gap-4 items-start p-4 bg-rose-50 rounded-xl">
                                    <i data-lucide="x-circle" class="text-rose-500 mt-1 shrink-0"></i>
                                    <div>
                                        <div class="font-bold text-rose-800">Giving Unnecessary Personal Details</div>
                                        <div class="text-sm text-rose-600">"My father is a farmer and my mother is a homemaker." Unless asked, keep it strictly professional.</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                `;
                break;
            case 8:
                content = `
                    <div class="space-y-6 animate-fade-in">
                        <div class="bg-slate-800 rounded-2xl p-8 shadow-xl text-white">
                            <div class="flex items-center gap-4 mb-6">
                                <div class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center"><i data-lucide="monitor" class="w-6 h-6 text-white"></i></div>
                                <div>
                                    <h2 class="text-2xl font-bold">IT Workplace Scenarios</h2>
                                    <p class="text-slate-400">Interactive Role-play Setup</p>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-slate-700 p-5 rounded-xl border border-slate-600 hover:border-cyan-500 cursor-pointer transition-colors" onclick="alert('In a full environment, this would launch the 3D office simulator.')">
                                    <h3 class="font-bold text-cyan-400 mb-2">Scenario 1: Daily Scrum</h3>
                                    <p class="text-sm text-slate-300">You are the new dev. Introduce yourself to the 6-person agile team in 30 seconds.</p>
                                    <div class="mt-4 inline-block bg-slate-800 text-xs px-3 py-1 rounded-full text-slate-400">Click to Play</div>
                                </div>
                                <div class="bg-slate-700 p-5 rounded-xl border border-slate-600 hover:border-cyan-500 cursor-pointer transition-colors" onclick="alert('In a full environment, this would launch the client call simulator.')">
                                    <h3 class="font-bold text-cyan-400 mb-2">Scenario 2: Client Kick-off</h3>
                                    <p class="text-sm text-slate-300">A US client is on the Zoom call. Introduce your role as the QA Engineer.</p>
                                    <div class="mt-4 inline-block bg-slate-800 text-xs px-3 py-1 rounded-full text-slate-400">Click to Play</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 9:
                content = `
                    <div class="space-y-6 animate-fade-in">
                        <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <h2 class="text-2xl font-bold text-slate-800 mb-2">Interactive Intro Builder</h2>
                            <p class="text-slate-500 mb-6">Select the best options to build a professional HR intro.</p>
                            
                            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-6">
                                <div>
                                    <div class="font-bold text-slate-700 mb-2">1. The Greeting</div>
                                    <select class="w-full p-3 rounded-lg border border-slate-300 outline-none focus:border-cyan-500">
                                        <option>Hey guys what's up!</option>
                                        <option selected>Good morning, panel. I am [Name].</option>
                                        <option>Myself [Name].</option>
                                    </select>
                                </div>
                                <div>
                                    <div class="font-bold text-slate-700 mb-2">2. The Pitch</div>
                                    <select class="w-full p-3 rounded-lg border border-slate-300 outline-none focus:border-cyan-500">
                                        <option selected>I am a recent IT graduate with hands-on experience in ReactJS.</option>
                                        <option>I like computers and coding.</option>
                                        <option>I need a job because I need money.</option>
                                    </select>
                                </div>
                                <div>
                                    <div class="font-bold text-slate-700 mb-2">3. The Closing</div>
                                    <select class="w-full p-3 rounded-lg border border-slate-300 outline-none focus:border-cyan-500">
                                        <option>That's all about me.</option>
                                        <option>So yeah, hire me.</option>
                                        <option selected>I look forward to contributing my skills to your innovative team.</option>
                                    </select>
                                </div>
                                <button onclick="alert('Great job! That is a perfect corporate intro structure.')" class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg shadow w-full transition-colors">
                                    Validate Intro
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 10:
                content = `
                    <div class="space-y-6 animate-fade-in">
                        <div class="bg-gradient-to-b from-indigo-900 to-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-700 text-white">
                            
                            <div class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]"></div>
                            
                            <div class="text-center relative z-10 mb-10">
                                <div class="inline-flex items-center justify-center w-20 h-20 bg-indigo-500/20 rounded-full mb-4 border border-indigo-500/50 relative">
                                    <div class="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping"></div>
                                    <i data-lucide="bot" class="w-10 h-10 text-indigo-400"></i>
                                </div>
                                <h2 class="text-3xl font-extrabold mb-2">AI Interview Coach</h2>
                                <p class="text-indigo-200">Practice your introduction. The AI will evaluate your speech, pacing, and grammar.</p>
                            </div>
                            
                            <!-- Animated Interviewer Avatar -->
                            <div class="flex justify-center mb-8 relative z-10">
                                <div class="w-32 h-32 bg-slate-800 rounded-full border-4 border-slate-700 shadow-xl overflow-hidden flex items-center justify-center relative group">
                                    <i data-lucide="user" class="w-16 h-16 text-slate-500 transition-transform duration-500 group-hover:scale-110"></i>
                                    <div class="absolute bottom-0 w-full h-8 bg-indigo-600 flex items-center justify-center">
                                        <span class="text-[10px] font-bold tracking-widest uppercase">HR Manager</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Voice Recording Simulator -->
                            <div class="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-8 relative z-10 text-center shadow-inner">
                                <div class="mb-6 h-12 flex items-center justify-center gap-1 opacity-50" id="waveformMock">
                                    ${Array(20).fill(0).map(() => `<div class="w-1.5 bg-indigo-400 rounded-full transition-all duration-100" style="height: ${Math.random() * 100}%"></div>`).join('')}
                                </div>
                                
                                <button onclick="window.simulateAiCoachFeedback()" class="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-extrabold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:scale-105 flex items-center gap-3 mx-auto">
                                    <i data-lucide="mic" class="w-6 h-6"></i> Start Recording
                                </button>
                                <p class="text-xs text-slate-400 mt-4">Speak clearly for 60 seconds.</p>
                            </div>
                            
                            <!-- Feedback Area -->
                            <div id="aiFeedbackArea" class="hidden mt-8 bg-slate-800 rounded-2xl border border-indigo-500/30 p-6 relative z-10">
                                <h3 class="font-bold text-indigo-400 text-lg mb-4 flex items-center gap-2"><i data-lucide="activity"></i> AI Analysis Complete</h3>
                                
                                <div class="space-y-4">
                                    <div class="flex justify-between items-center bg-slate-900 p-3 rounded-lg border border-slate-700">
                                        <span class="text-slate-300 text-sm">Overall Confidence Score</span>
                                        <span class="text-emerald-400 font-bold">85%</span>
                                    </div>
                                    <div class="flex justify-between items-center bg-slate-900 p-3 rounded-lg border border-slate-700">
                                        <span class="text-slate-300 text-sm">Speaking Pace</span>
                                        <span class="text-amber-400 font-bold">A bit fast (140 wpm)</span>
                                    </div>
                                    <div class="bg-slate-900 p-4 rounded-lg border border-slate-700">
                                        <span class="text-slate-300 text-sm block mb-2 font-bold">Grammar & Vocabulary Note:</span>
                                        <p class="text-xs text-slate-400">Instead of saying <span class="text-rose-400">"I am knowing React"</span>, try saying <span class="text-emerald-400">"I am proficient in React."</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 11:
                content = `
                    <div class="space-y-6 animate-fade-in">
                        <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
                            <div class="w-24 h-24 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i data-lucide="award" class="w-12 h-12"></i>
                            </div>
                            <h2 class="text-3xl font-extrabold text-slate-800 mb-4">Module Complete!</h2>
                            <p class="text-slate-500 mb-8 max-w-lg mx-auto">You have successfully mastered the Professional Self-Introduction. You are now ready to confidently introduce yourself in any corporate setting.</p>
                            
                            <button onclick="window.completeProTopic1()" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-transform hover:-translate-y-1 flex items-center gap-3 mx-auto">
                                <i data-lucide="check-circle" class="w-5 h-5"></i> Claim +100 XP & Complete
                            </button>
                        </div>
                    </div>
                `;
                break;
        }

        return content;
    };

    let html = `
        <div class="animate-fade-in max-w-7xl mx-auto mt-2 px-2 md:px-6 pb-20 min-h-screen flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            ${renderSidebar()}
            
            <div class="flex-1 min-w-0 w-full">
                ${renderSectionContent()}
                
                <div class="mt-8 flex flex-col sm:flex-row justify-between items-center border-t border-slate-200 pt-6 gap-4">
                    ${proTopic1State.currentSection > 1 ? `
                        <button onclick="window.proTopic1Nav(${proTopic1State.currentSection - 1})" class="w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                            Previous
                        </button>
                    ` : '<div class="hidden sm:block"></div>'}
                    
                    ${proTopic1State.currentSection < 11 ? `
                        <button onclick="window.proTopic1Nav(${proTopic1State.currentSection + 1})" class="w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-white bg-cyan-600 hover:bg-cyan-700 shadow-md transition-colors flex items-center justify-center gap-2">
                            Next Section <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </button>
                    ` : '<div class="hidden sm:block"></div>'}
                </div>
            </div>
        </div>
    `;

    mainContent.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
    
    // Waveform animation simulator
    if (proTopic1State.currentSection === 10) {
        setInterval(() => {
            const waveform = document.getElementById('waveformMock');
            if(waveform && !waveform.classList.contains('recording')) {
                Array.from(waveform.children).forEach(bar => {
                    bar.style.height = (Math.random() * 50 + 20) + '%';
                });
            }
        }, 150);
    }
};

window.proTopic1Nav = (section) => {
    if (section > proTopic1State.maxUnlockedSection && !window.isStaffModeOn) {
        proTopic1State.maxUnlockedSection = section; // Auto-unlock for demo purposes
    }
    proTopic1State.currentSection = section;
    window.renderProSelfIntroModule(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.simulateAiCoachFeedback = () => {
    const btn = document.querySelector('button[onclick="window.simulateAiCoachFeedback()"]');
    if(btn) {
        btn.innerHTML = '<i data-lucide="loader" class="w-6 h-6 animate-spin"></i> Analyzing Voice...';
        btn.classList.replace('bg-emerald-500', 'bg-amber-500');
        
        const waveform = document.getElementById('waveformMock');
        if(waveform) {
            waveform.classList.add('recording');
            waveform.classList.replace('opacity-50', 'opacity-100');
            Array.from(waveform.children).forEach(bar => {
                bar.classList.replace('bg-indigo-400', 'bg-emerald-400');
            });
            
            // Aggressive random heights
            let waveInterval = setInterval(() => {
                Array.from(waveform.children).forEach(bar => {
                    bar.style.height = (Math.random() * 80 + 20) + '%';
                });
            }, 100);
            
            setTimeout(() => {
                clearInterval(waveInterval);
                btn.innerHTML = '<i data-lucide="check" class="w-6 h-6"></i> Retry Recording';
                btn.classList.replace('bg-amber-500', 'bg-indigo-600');
                waveform.classList.replace('opacity-100', 'opacity-30');
                document.getElementById('aiFeedbackArea').classList.remove('hidden');
                if (window.lucide) window.lucide.createIcons();
            }, 3000);
        }
    }
};

window.completeProTopic1 = () => {
    const progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    if (!progress.completedLessons) progress.completedLessons = [];
    if (!progress.pendingValidation) progress.pendingValidation = [];
    
    if (window.isStaffModeOn) {
        if (!progress.completedLessons.includes('pro_1')) {
            window.LocalDB.approveLesson(window.viewingStudentUsername, 'pro', 1);
            alert("Module marked as completed (Staff Override).");
        } else {
            alert("Module already completed!");
        }
    } else {
        if (!progress.completedLessons.includes('pro_1') && !progress.pendingValidation.includes('pro_1')) {
            window.LocalDB.requestLessonValidation(window.viewingStudentUsername, 'pro', 1);
            alert("Validation Requested! Waiting for Staff Approval.");
        } else if (progress.pendingValidation.includes('pro_1')) {
            alert("Module is already pending validation.");
        } else {
            alert("Module already completed!");
        }
    }
    
    window.showView('dashboard');
};
