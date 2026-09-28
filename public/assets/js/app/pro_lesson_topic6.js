window.renderCommunicationModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-indigo-50 rounded-lg text-indigo-600 hidden sm:block"><i data-lucide="message-square" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: Team Communication</span>`;
    }

    let progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    let isCompleted = progress.completedLessons && progress.completedLessons.includes(`pro_${day}`);

    let html = `
        <div class="animate-fade-in mx-auto space-y-12 pb-20 bg-slate-50 min-h-screen">
            
            <!-- HEADER -->
            <div class="relative bg-gradient-to-r from-indigo-700 to-purple-800 rounded-b-3xl sm:rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden text-white mb-8 mx-auto max-w-6xl mt-4">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8">
                        <div class="w-20 sm:w-24 h-20 sm:h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shrink-0 shadow-inner">
                            <i data-lucide="messages-square" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-indigo-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">Workplace Communication</h1>
                            <p class="text-indigo-50 text-lg max-w-2xl">Learn how to communicate effectively using Microsoft Teams, Slack, and Google Meet in a professional IT environment.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4 space-y-8" id="comm-sim-container">
                
                <!-- Navigation Tabs -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap gap-2 mb-6">
                    <button onclick="window.switchCommTab('teams')" id="tab-teams" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">
                        <i data-lucide="message-circle" class="w-5 h-5"></i> Microsoft Teams
                    </button>
                    <button onclick="window.switchCommTab('slack')" id="tab-slack" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="hash" class="w-5 h-5"></i> Slack
                    </button>
                    <button onclick="window.switchCommTab('meet')" id="tab-meet" class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50">
                        <i data-lucide="video" class="w-5 h-5"></i> Google Meet
                    </button>
                </div>

                <!-- Simulator Views -->
                <div id="view-teams" class="comm-view block animate-fade-in">
                    <!-- Teams UI goes here -->
                </div>

                <div id="view-slack" class="comm-view hidden animate-fade-in">
                    <!-- Slack UI goes here -->
                </div>

                <div id="view-meet" class="comm-view hidden animate-fade-in">
                    <!-- Meet UI goes here -->
                </div>

                <!-- AI Chat Coach Simulator Setup -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 lg:p-8 mt-8 sm:mt-12 flex flex-col lg:flex-row gap-6 lg:gap-8">
                    
                    <!-- Left: Scenario and Writing Area -->
                    <div class="flex-1 min-w-0 flex flex-col">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <h2 class="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2 whitespace-nowrap">
                                <i data-lucide="bot" class="w-5 h-5 text-indigo-600"></i> AI Chat Coach
                            </h2>
                            <select id="chatScenarioSelect" class="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none font-medium w-full sm:w-auto" onchange="window.loadChatScenario()">
                                <option value="update">Scenario 1: Project Update</option>
                                <option value="help">Scenario 2: Asking for Help</option>
                                <option value="blocker">Scenario 3: Reporting a Blocker</option>
                            </select>
                        </div>
                        
                        <div class="bg-slate-50 rounded-xl p-4 sm:p-5 mb-4 border border-slate-200 relative overflow-hidden">
                            <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Scenario Context</h3>
                            <p id="chatScenarioContext" class="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                                You just finished building the Login page. Post a message in the #frontend-team channel to let everyone know.
                            </p>
                        </div>

                        <!-- Editor -->
                        <div class="flex-1 flex flex-col border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-all bg-white shadow-sm">
                            <textarea id="chatDraftBody" class="flex-1 p-3 sm:p-4 outline-none resize-none text-xs sm:text-sm text-slate-700 leading-relaxed font-mono min-h-[140px]" placeholder="Type your message here..."></textarea>
                            
                            <div class="bg-slate-50 border-t border-slate-200 p-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                                <button onclick="window.evaluateChatDraft()" class="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm">
                                    <i data-lucide="send" class="w-4 h-4"></i> Evaluate Message
                                </button>
                                <button onclick="window.clearChatDraft()" class="w-full sm:w-auto text-slate-500 hover:text-slate-800 text-xs sm:text-sm font-medium px-4 py-1.5 text-center">Clear</button>
                            </div>
                        </div>
                    </div>

                    <!-- Right: AI Feedback Pane -->
                    <div class="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-8 flex flex-col shrink-0">
                        <h2 class="text-lg sm:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <i data-lucide="sparkles" class="w-5 h-5 text-amber-500"></i> AI Feedback
                        </h2>
                        
                        <div id="aiChatFeedbackContainer" class="flex-1 flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 min-h-[180px]">
                            <div class="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                <i data-lucide="bot" class="w-8 h-8"></i>
                            </div>
                            <p class="text-slate-500 text-xs sm:text-sm font-medium">Write your chat message and click "Evaluate" to receive professional feedback on your tone and structure.</p>
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

            <!-- Global Tooltip Modal -->
            <div id="commInfoModal" class="fixed inset-0 z-50 hidden bg-slate-900/40 backdrop-blur-sm flex items-center justify-center opacity-0 transition-opacity duration-300">
                <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform scale-95 transition-transform duration-300" id="commInfoContent">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600" id="commModalIcon">
                            <i data-lucide="info"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-slate-800" id="commModalTitle">Title</h3>
                    </div>
                    <p class="text-slate-600 text-lg leading-relaxed mb-6" id="commModalText">Description</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Corporate IT Usage</h4>
                        <p class="text-sm font-medium text-slate-700" id="commModalUsage">Usage detail</p>
                    </div>
                    <button onclick="window.closeCommInfo()" class="w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition-colors">Got it!</button>
                </div>
            </div>

        </div>
    `;

    mainContent.innerHTML = html;
    window.renderTeamsUI();
    window.renderSlackUI();
    window.renderMeetUI();
    window.loadChatScenario();
    if (window.lucide) window.lucide.createIcons();
};

window.switchCommTab = (tab) => {
    // Hide all
    document.querySelectorAll('.comm-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    // Reset buttons
    document.querySelectorAll('#tab-teams, #tab-slack, #tab-meet').forEach(el => {
        el.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-slate-500 hover:bg-slate-50";
    });
    
    // Show active
    document.getElementById(`view-${tab}`).classList.remove('hidden');
    document.getElementById(`view-${tab}`).classList.add('block');
    
    // Style active button
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.className = "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm";
};

// Global features mapping
window.commFeatures = {
    'teams_channels': { title: 'Teams & Channels', icon: 'users', text: 'Workspaces for specific projects or departments.', usage: 'Use Channels for public discussions so everyone on the team has visibility into the work.' },
    'teams_chat': { title: 'Direct Chat', icon: 'message-circle', text: '1-on-1 or group private messages.', usage: 'Use Chat for quick questions or private discussions that don\'t need to clutter the main Channel.' },
    'teams_activity': { title: 'Activity Feed', icon: 'bell', text: 'Notifications for mentions and replies.', usage: 'Check this to see if someone tagged you (@YourName) needing an urgent response.' },
    'teams_mention': { title: '@ Mentions', icon: 'at-sign', text: 'Tagging a specific person.', usage: 'Always @mention someone if you need them to take an action, otherwise they might miss it.' },
    'teams_reply': { title: 'Reply to Thread', icon: 'corner-up-left', text: 'Reply within an existing conversation block.', usage: 'NEVER start a "New Conversation" to reply to a message. Always use the Reply button to keep the channel organized.' },
    'teams_status': { title: 'Presence Status', icon: 'circle', text: 'Shows if you are Available, Busy, or Away.', usage: 'Respect others\' status. If someone is "Do Not Disturb" (Red), only message them if it is an absolute emergency.' },
    'slack_huddle': { title: 'Huddles', icon: 'headphones', text: 'Quick, informal audio calls.', usage: 'Use Huddles when a chat discussion gets too complex and can be solved in a 2-minute voice call.' },
    'slack_thread': { title: 'Threads', icon: 'message-square', text: 'Replies attached directly to a single message.', usage: 'Always reply in threads in Slack. It prevents the main channel from becoming unreadable.' },
    'slack_reaction': { title: 'Emoji Reactions', icon: 'smile', text: 'Adding an emoji to a message.', usage: 'Use a Checkmark (✅) or Eyes (👀) emoji to acknowledge you read a message without sending a notification.' },
    'slack_public': { title: 'Public vs Private Channels', icon: 'hash', text: '# for public, lock icon for private.', usage: 'Public channels are searchable by everyone in the company. Be highly professional in them.' },
    'meet_join': { title: 'Join on Time', icon: 'video', text: 'Entering the meeting.', usage: 'Always join 1-2 minutes early. If you are 5 minutes late, you are delaying the entire team.' },
    'meet_mic': { title: 'Microphone Mute', icon: 'mic-off', text: 'Toggling your microphone.', usage: 'Always stay on MUTE unless you are actively speaking to avoid background noise.' },
    'meet_camera': { title: 'Camera Etiquette', icon: 'video', text: 'Toggling your camera.', usage: 'Turn it on for small team meetings or 1-on-1s. Ensure your background is clean or use a blur effect.' },
    'meet_share': { title: 'Present Screen', icon: 'monitor', text: 'Sharing your screen.', usage: 'Close all personal tabs and mute chat notifications before sharing your screen!' },
    'meet_raise': { title: 'Raise Hand', icon: 'hand', text: 'Signaling you want to speak.', usage: 'Use this in large meetings (10+ people) so you don\'t interrupt the speaker.' }
};

window.showCommInfo = (key) => {
    const data = window.commFeatures[key];
    if (!data) return;
    
    document.getElementById('commModalTitle').innerText = data.title;
    document.getElementById('commModalText').innerText = data.text;
    document.getElementById('commModalUsage').innerText = data.usage;
    document.getElementById('commModalIcon').innerHTML = `<i data-lucide="${data.icon}"></i>`;
    if (window.lucide) window.lucide.createIcons();
    
    const modal = document.getElementById('commInfoModal');
    const content = document.getElementById('commInfoContent');
    modal.classList.remove('hidden');
    
    // Trigger reflow
    void modal.offsetWidth;
    
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');
};

window.closeCommInfo = () => {
    const modal = document.getElementById('commInfoModal');
    const content = document.getElementById('commInfoContent');
    
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
};

window.renderTeamsUI = () => {
    const container = document.getElementById('view-teams');
    container.innerHTML = `
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[700px]">
            <!-- Top Bar -->
            <div class="bg-[#464EB8] h-12 flex items-center justify-between px-4 shrink-0 text-white">
                <div class="font-bold">Microsoft Teams</div>
                <div class="flex-1 max-w-lg px-4 hidden md:block">
                    <div class="bg-white/20 rounded h-8 flex items-center px-3 text-sm">
                        <i data-lucide="search" class="w-4 h-4 mr-2 text-white/70"></i> Search
                    </div>
                </div>
                <div class="flex items-center gap-3 relative">
                    <button onclick="window.showCommInfo('teams_status')" class="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center font-bold text-sm relative group-btn">
                        U
                        <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#464EB8] rounded-full"></span>
                        <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-50">Presence Status</span>
                    </button>
                </div>
            </div>
            
            <div class="flex flex-1 overflow-hidden">
                <!-- Left Nav -->
                <div class="w-16 bg-slate-100 border-r border-slate-200 flex flex-col items-center py-4 gap-6 shrink-0 text-slate-500">
                    <button onclick="window.showCommInfo('teams_activity')" class="flex flex-col items-center gap-1 hover:text-[#464EB8]"><i data-lucide="bell" class="w-6 h-6"></i><span class="text-[10px]">Activity</span></button>
                    <button onclick="window.showCommInfo('teams_chat')" class="flex flex-col items-center gap-1 hover:text-[#464EB8]"><i data-lucide="message-circle" class="w-6 h-6"></i><span class="text-[10px]">Chat</span></button>
                    <button onclick="window.showCommInfo('teams_channels')" class="flex flex-col items-center gap-1 text-[#464EB8] font-bold"><i data-lucide="users" class="w-6 h-6"></i><span class="text-[10px]">Teams</span></button>
                    <button class="flex flex-col items-center gap-1 hover:text-[#464EB8]"><i data-lucide="calendar" class="w-6 h-6"></i><span class="text-[10px]">Calendar</span></button>
                </div>

                <!-- Channels List -->
                <div class="w-48 md:w-64 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 hidden sm:flex">
                    <div class="p-4 border-b border-slate-200 font-bold text-slate-800">Teams</div>
                    <div class="p-2 space-y-1 overflow-y-auto">
                        <div class="font-bold text-sm text-slate-700 px-2 py-1 flex items-center gap-2"><i data-lucide="chevron-down" class="w-4 h-4"></i> Engineering Team</div>
                        <div class="pl-8 py-1 text-sm text-slate-600 hover:bg-slate-200 rounded cursor-pointer">General</div>
                        <div class="pl-8 py-1 text-sm text-slate-600 hover:bg-slate-200 rounded cursor-pointer bg-slate-200 font-bold">Frontend Dev</div>
                        <div class="pl-8 py-1 text-sm text-slate-600 hover:bg-slate-200 rounded cursor-pointer">Backend Dev</div>
                    </div>
                </div>

                <!-- Chat Area -->
                <div class="flex-1 flex flex-col bg-white min-w-0">
                    <div class="h-14 border-b border-slate-200 flex items-center px-6 font-bold text-lg text-slate-800">
                        Frontend Dev
                    </div>
                    
                    <div class="flex-1 overflow-y-auto p-6 space-y-6">
                        <!-- Message block -->
                        <div class="flex gap-4">
                            <div class="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold shrink-0">S</div>
                            <div class="flex-1">
                                <div class="flex items-baseline gap-2 mb-1">
                                    <span class="font-bold text-slate-800">Sarah (Manager)</span>
                                    <span class="text-xs text-slate-500">10:42 AM</span>
                                </div>
                                <div class="text-slate-700 bg-slate-50 p-3 rounded-r-xl rounded-bl-xl border border-slate-100">
                                    Hi team, is the login page ready for testing?
                                </div>
                                <div class="mt-2 text-[#464EB8] text-sm font-bold flex items-center gap-1 cursor-pointer hover:underline" onclick="window.showCommInfo('teams_reply')">
                                    <i data-lucide="corner-up-left" class="w-4 h-4"></i> Reply
                                </div>
                            </div>
                        </div>

                        <!-- Message block with Mention -->
                        <div class="flex gap-4">
                            <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">Y</div>
                            <div class="flex-1">
                                <div class="flex items-baseline gap-2 mb-1">
                                    <span class="font-bold text-slate-800">You</span>
                                    <span class="text-xs text-slate-500">10:45 AM</span>
                                </div>
                                <div class="text-slate-700 bg-blue-50 p-3 rounded-r-xl rounded-bl-xl border border-blue-100">
                                    Almost done! <button onclick="window.showCommInfo('teams_mention')" class="text-[#464EB8] font-bold hover:underline bg-white px-1 rounded">@Sarah</button>, I just need 10 more minutes to fix a CSS bug.
                                </div>
                                <div class="mt-2 text-[#464EB8] text-sm font-bold flex items-center gap-1 cursor-pointer hover:underline" onclick="window.showCommInfo('teams_reply')">
                                    <i data-lucide="corner-up-left" class="w-4 h-4"></i> Reply
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Input Area -->
                    <div class="p-4 border-t border-slate-200">
                        <div class="border border-slate-300 rounded-lg bg-slate-50 flex flex-col relative group">
                            <span class="absolute -top-6 left-2 bg-amber-400 text-white text-[10px] font-bold px-2 py-1 rounded hidden group-hover:block">NEVER START A NEW CONVERSATION TO REPLY</span>
                            <div class="flex-1 p-3 text-slate-400 text-sm">Start a new conversation. Type @ to mention someone.</div>
                            <div class="flex items-center justify-between p-2 border-t border-slate-200">
                                <div class="flex gap-2 text-slate-500">
                                    <i data-lucide="bold" class="w-4 h-4"></i>
                                    <i data-lucide="paperclip" class="w-4 h-4"></i>
                                    <i data-lucide="smile" class="w-4 h-4"></i>
                                </div>
                                <i data-lucide="send" class="w-4 h-4 text-slate-400"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style>.group-btn:hover span { opacity: 1; }</style>
    `;
};

window.renderSlackUI = () => {
    const container = document.getElementById('view-slack');
    container.innerHTML = `
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[700px]">
            <!-- Top Bar -->
            <div class="bg-[#350d36] h-12 flex items-center justify-center px-4 shrink-0 text-white relative">
                <div class="bg-white/20 rounded h-7 w-1/2 flex items-center justify-center px-3 text-sm">
                    <i data-lucide="search" class="w-4 h-4 mr-2 text-white/70"></i> Search AlphaFly Workspace
                </div>
            </div>
            
            <div class="flex flex-1 overflow-hidden">
                <!-- Left Nav -->
                <div class="w-64 bg-[#3F0E40] flex flex-col shrink-0 text-[#cfc3cf]">
                    <div class="p-4 font-bold text-white text-lg border-b border-white/10 flex justify-between items-center">
                        AlphaFly <i data-lucide="edit" class="w-4 h-4 bg-white text-[#3F0E40] rounded-full p-0.5"></i>
                    </div>
                    <div class="p-2 space-y-1 overflow-y-auto flex-1">
                        
                        <div class="mt-4 mb-1 px-2 font-bold text-sm flex justify-between items-center group cursor-pointer">
                            Channels <i data-lucide="plus" class="w-4 h-4 opacity-0 group-hover:opacity-100"></i>
                        </div>
                        <button onclick="window.showCommInfo('slack_public')" class="w-full text-left px-4 py-1 text-sm hover:bg-white/10 rounded flex items-center gap-2"><i data-lucide="hash" class="w-4 h-4"></i> general</button>
                        <button onclick="window.showCommInfo('slack_public')" class="w-full text-left px-4 py-1 text-sm bg-[#1164A3] text-white rounded flex items-center gap-2"><i data-lucide="hash" class="w-4 h-4"></i> proj-frontend</button>
                        <button onclick="window.showCommInfo('slack_public')" class="w-full text-left px-4 py-1 text-sm hover:bg-white/10 rounded flex items-center gap-2"><i data-lucide="lock" class="w-4 h-4"></i> team-leads</button>

                        <div class="mt-6 mb-1 px-2 font-bold text-sm flex justify-between items-center group cursor-pointer">
                            Direct messages <i data-lucide="plus" class="w-4 h-4 opacity-0 group-hover:opacity-100"></i>
                        </div>
                        <div class="px-4 py-1 text-sm hover:bg-white/10 rounded flex items-center gap-2 text-white"><span class="w-2 h-2 bg-emerald-500 rounded-full"></span> Sarah (Manager)</div>
                        <div class="px-4 py-1 text-sm hover:bg-white/10 rounded flex items-center gap-2"><span class="w-2 h-2 border border-[#cfc3cf] rounded-full"></span> HR Team</div>
                    </div>
                </div>

                <!-- Chat Area -->
                <div class="flex-1 flex flex-col bg-white">
                    <div class="h-14 border-b border-slate-200 flex items-center justify-between px-6 font-bold text-lg text-slate-800">
                        <div class="flex items-center gap-2"><i data-lucide="hash" class="w-5 h-5 text-slate-400"></i> proj-frontend</div>
                        <button onclick="window.showCommInfo('slack_huddle')" class="text-sm font-bold flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300">
                            <i data-lucide="headphones" class="w-4 h-4"></i> Huddle
                        </button>
                    </div>
                    
                    <div class="flex-1 overflow-y-auto p-6 space-y-6">
                        <!-- Message block -->
                        <div class="flex gap-4 group">
                            <div class="w-10 h-10 rounded bg-indigo-500 text-white flex items-center justify-center font-bold shrink-0">S</div>
                            <div class="flex-1">
                                <div class="flex items-baseline gap-2 mb-1">
                                    <span class="font-bold text-slate-900">Sarah</span>
                                    <span class="text-xs text-slate-500">11:00 AM</span>
                                </div>
                                <div class="text-slate-800">
                                    Hey @channel, the client just approved the new design. Please start implementation ASAP.
                                </div>
                                
                                <div class="mt-2 flex gap-2">
                                    <button onclick="window.showCommInfo('slack_reaction')" class="bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5 text-xs font-bold flex items-center gap-1 hover:bg-slate-200">
                                        ✅ 4
                                    </button>
                                    <button onclick="window.showCommInfo('slack_reaction')" class="bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5 text-xs font-bold flex items-center gap-1 hover:bg-slate-200">
                                        🚀 2
                                    </button>
                                </div>

                                <button onclick="window.showCommInfo('slack_thread')" class="mt-2 flex items-center gap-2 text-sm text-blue-600 font-bold hover:underline">
                                    <img src="https://via.placeholder.com/20" class="w-5 h-5 rounded" /> 2 replies
                                </button>
                            </div>
                            
                            <!-- Hidden Hover Actions -->
                            <div class="hidden group-hover:flex items-center border border-slate-200 rounded-lg bg-white shadow-sm absolute right-10 -mt-3">
                                <button onclick="window.showCommInfo('slack_reaction')" class="p-1.5 hover:bg-slate-100 text-slate-500"><i data-lucide="smile" class="w-4 h-4"></i></button>
                                <button onclick="window.showCommInfo('slack_thread')" class="p-1.5 hover:bg-slate-100 text-slate-500"><i data-lucide="message-square" class="w-4 h-4"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- Input Area -->
                    <div class="p-4">
                        <div class="border border-slate-400 rounded-lg bg-white flex flex-col focus-within:border-slate-800 focus-within:shadow-[0_0_0_1px_rgba(0,0,0,1)] transition-shadow">
                            <div class="flex-1 p-3 text-slate-400 text-sm">Message #proj-frontend</div>
                            <div class="flex items-center justify-between p-2 bg-slate-50 rounded-b-lg">
                                <div class="flex gap-3 text-slate-500">
                                    <i data-lucide="plus-circle" class="w-4 h-4"></i>
                                    <i data-lucide="smile" class="w-4 h-4"></i>
                                    <i data-lucide="at-sign" class="w-4 h-4"></i>
                                </div>
                                <div class="bg-emerald-700 p-1 rounded text-white"><i data-lucide="send" class="w-4 h-4"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

window.renderMeetUI = () => {
    const container = document.getElementById('view-meet');
    container.innerHTML = `
        <div class="bg-[#202124] rounded-2xl shadow-sm overflow-hidden flex flex-col h-[700px] text-white border border-slate-800 relative group">
            
            <div class="absolute top-4 left-4 font-medium">Daily Standup</div>

            <div class="flex-1 flex flex-col p-4 md:p-12 items-center justify-center gap-4">
                
                <!-- Main Speaker Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full max-h-[500px]">
                    <div class="bg-[#3c4043] rounded-xl flex items-center justify-center relative overflow-hidden min-h-[160px]">
                        <div class="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-sm font-medium">Sarah (Manager)</div>
                        <div class="w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-blue-500 flex items-center justify-center text-3xl sm:text-4xl font-bold">S</div>
                    </div>
                    <div class="bg-[#3c4043] rounded-xl flex items-center justify-center relative overflow-hidden border-2 border-[#8ab4f8] min-h-[160px]">
                        <div class="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-sm font-medium flex items-center gap-2">You <i data-lucide="mic-off" class="w-3 h-3 text-rose-500"></i></div>
                        <div class="w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-indigo-500 flex items-center justify-center text-3xl sm:text-4xl font-bold">Y</div>
                    </div>
                </div>

            </div>

            <!-- Bottom Controls -->
            <div class="h-20 bg-[#202124] flex items-center justify-between px-6 shrink-0 opacity-100 transition-opacity">
                <div class="text-sm font-medium hidden md:block">11:00 AM | xyz-abcd-efg</div>
                
                <div class="flex items-center gap-4">
                    <button onclick="window.showCommInfo('meet_mic')" class="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center hover:bg-rose-600 transition-colors">
                        <i data-lucide="mic-off" class="w-5 h-5"></i>
                    </button>
                    <button onclick="window.showCommInfo('meet_camera')" class="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center hover:bg-rose-600 transition-colors">
                        <i data-lucide="video-off" class="w-5 h-5"></i>
                    </button>
                    <button onclick="window.showCommInfo('meet_raise')" class="w-12 h-12 rounded-full bg-[#3c4043] flex items-center justify-center hover:bg-[#4d5154] transition-colors">
                        <i data-lucide="hand" class="w-5 h-5"></i>
                    </button>
                    <button onclick="window.showCommInfo('meet_share')" class="w-12 h-12 rounded-full bg-[#3c4043] flex items-center justify-center hover:bg-[#4d5154] transition-colors hidden sm:flex">
                        <i data-lucide="monitor-up" class="w-5 h-5"></i>
                    </button>
                    <button class="w-16 h-10 rounded-full bg-rose-500 flex items-center justify-center hover:bg-rose-600 transition-colors ml-4">
                        <i data-lucide="phone-off" class="w-5 h-5"></i>
                    </button>
                </div>
                
                <div class="flex items-center gap-4 hidden sm:flex">
                    <button class="w-10 h-10 rounded-full hover:bg-[#3c4043] flex items-center justify-center text-slate-300">
                        <i data-lucide="info" class="w-5 h-5"></i>
                    </button>
                    <button class="w-10 h-10 rounded-full hover:bg-[#3c4043] flex items-center justify-center text-slate-300">
                        <i data-lucide="users" class="w-5 h-5"></i>
                    </button>
                    <button class="w-10 h-10 rounded-full hover:bg-[#3c4043] flex items-center justify-center text-slate-300">
                        <i data-lucide="message-square" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
};


window.chatScenarios = {
    'update': {
        context: "You just finished building the Login page. Post a message in the #frontend-team channel to let everyone know.",
    },
    'help': {
        context: "You are stuck on a database bug for 2 hours. Ask the backend lead (@John) for help in the Slack channel.",
    },
    'blocker': {
        context: "Your daily standup meeting is about to start, but your internet went down and you have to join from your phone. Inform your manager (@Sarah) in Teams chat."
    }
};

window.loadChatScenario = () => {
    const val = document.getElementById('chatScenarioSelect').value;
    const scenario = window.chatScenarios[val];
    document.getElementById('chatScenarioContext').innerText = scenario.context;
    document.getElementById('chatDraftBody').value = '';
    
    // Reset feedback
    document.getElementById('aiChatFeedbackContainer').innerHTML = `
        <div class="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <i data-lucide="bot" class="w-8 h-8"></i>
        </div>
        <p class="text-slate-500 text-sm font-medium">Write your chat message and click "Evaluate" to receive professional feedback on your tone and structure.</p>
    `;
    if (window.lucide) window.lucide.createIcons();
};

window.clearChatDraft = () => {
    document.getElementById('chatDraftBody').value = '';
};

// Mock AI Evaluation Logic for Chat
window.evaluateChatDraft = () => {
    const body = document.getElementById('chatDraftBody').value.trim();
    const container = document.getElementById('aiChatFeedbackContainer');

    if (!body) {
        container.innerHTML = `<p class="text-rose-500 font-bold">Please write a message first!</p>`;
        return;
    }

    container.innerHTML = `
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
        <p class="text-indigo-600 font-medium">Analyzing chat etiquette...</p>
    `;

    setTimeout(() => {
        let score = 100;
        let feedbackHTML = '';

        // Chat shouldn't be too long
        if (body.length > 200) {
            score -= 15;
            feedbackHTML += `<div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-500 mt-0.5 shrink-0"></i><p class="text-sm text-amber-700"><b>Too Long:</b> Chat messages should be concise. If it's this long, consider an email or a Huddle.</p></div></div>`;
        }

        if (body.length < 10) {
            score -= 30;
            feedbackHTML += `<div class="bg-rose-50 border border-rose-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-500 mt-0.5 shrink-0"></i><p class="text-sm text-rose-700"><b>Too Short:</b> Provide more context.</p></div></div>`;
        }

        // Check for mentions if scenario needs it
        const val = document.getElementById('chatScenarioSelect').value;
        if (val === 'help' && !/@john/i.test(body)) {
            score -= 20;
            feedbackHTML += `<div class="bg-rose-50 border border-rose-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-500 mt-0.5 shrink-0"></i><p class="text-sm text-rose-700"><b>Missing Mention:</b> You need to @mention John so he gets a notification.</p></div></div>`;
        }
        if (val === 'blocker' && !/@sarah/i.test(body)) {
            score -= 20;
            feedbackHTML += `<div class="bg-rose-50 border border-rose-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-500 mt-0.5 shrink-0"></i><p class="text-sm text-rose-700"><b>Missing Mention:</b> You need to @mention Sarah so she sees it immediately.</p></div></div>`;
        }

        // ALL CAPS check
        if (body === body.toUpperCase() && body.length > 10) {
            score -= 30;
            feedbackHTML += `<div class="bg-rose-50 border border-rose-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="x-circle" class="w-4 h-4 text-rose-500 mt-0.5 shrink-0"></i><p class="text-sm text-rose-700"><b>ALL CAPS:</b> Using all caps in chat is considered YELLING. Use normal sentence case.</p></div></div>`;
        }

        // Slang check
        if (/\b(hey|bro|guys|whats up|u|omg|idk)\b/i.test(body)) {
            score -= 15;
            feedbackHTML += `<div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-500 mt-0.5 shrink-0"></i><p class="text-sm text-amber-700"><b>Casual Slang:</b> It's okay to be a bit casual in chat, but avoid 'bro', 'u', or 'idk' in corporate channels.</p></div></div>`;
        }

        if (score === 100) {
            feedbackHTML += `<div class="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-left w-full mb-3 shadow-sm"><div class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"></i><p class="text-sm text-emerald-700"><b>Perfect!</b> Clear, concise, and professional chat etiquette.</p></div></div>`;
        }

        container.innerHTML = `
            <div class="w-full flex flex-col items-center bg-white p-2 rounded-xl shadow-sm mb-4 border border-slate-100">
                <div class="text-3xl font-extrabold text-${score > 70 ? 'emerald' : 'rose'}-600">${score}/100</div>
                <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Communication Score</div>
            </div>
            <div class="w-full space-y-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                ${feedbackHTML}
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();

    }, 1200);
};
