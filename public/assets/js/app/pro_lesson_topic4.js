window.renderEmailInterfaceModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-blue-50 rounded-lg text-blue-600 hidden sm:block"><i data-lucide="mail" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: Email Etiquette (Interface)</span>`;
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
                            <i data-lucide="mail" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-blue-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">Mastering the Email Interface</h1>
                            <p class="text-blue-50 text-lg max-w-2xl">Learn every single button and feature of a professional email client. Click on elements in the simulated interface below to understand their purpose in the IT industry.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-4" id="email-sim-container">
                <!-- The mock Email UI goes here -->
            </div>

            <!-- Completion Section -->
            <div class="mt-8 text-center space-y-4 flex flex-col items-center pb-20">
                ${isCompleted ? `
                    <div class="text-emerald-600 font-bold flex items-center gap-2 text-lg">
                        <i data-lucide="check-circle" class="w-6 h-6"></i> Lesson Completed!
                    </div>
                    <button onclick="window.showView('pro_lesson', {day: ${parseInt(day) + 1}})" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto flex justify-center items-center gap-2">
                        Next Lesson <i data-lucide="arrow-right" class="w-5 h-5"></i>
                    </button>
                ` : `
                    <button onclick="window.completeProLesson('${day}')" class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto">
                        Complete Lesson & Claim XP
                    </button>
                `}
            </div>
            
            <!-- Global Tooltip Modal -->
            <div id="emailInfoModal" class="fixed inset-0 z-50 hidden bg-slate-900/40 backdrop-blur-sm flex items-center justify-center opacity-0 transition-opacity duration-300">
                <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform scale-95 transition-transform duration-300" id="emailInfoContent">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600" id="infoModalIcon">
                            <i data-lucide="info"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-slate-800" id="infoModalTitle">Title</h3>
                    </div>
                    <p class="text-slate-600 text-lg leading-relaxed mb-6" id="infoModalText">Description</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Corporate IT Usage</h4>
                        <p class="text-sm font-medium text-slate-700" id="infoModalUsage">Usage detail</p>
                    </div>
                    <button onclick="window.closeEmailInfo()" class="w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition-colors">Got it!</button>
                </div>
            </div>

        </div>
    `;

    mainContent.innerHTML = html;
    window.renderMockEmailUI();
    if (window.lucide) window.lucide.createIcons();
};

window.renderMockEmailUI = () => {
    const container = document.getElementById('email-sim-container');
    
    // Feature mapping for interactive tooltips
    const features = {
        'inbox': { title: 'Inbox', icon: 'inbox', text: 'Where new emails arrive.', usage: 'Check this at the start and end of your workday to catch important updates.' },
        'starred': { title: 'Starred', icon: 'star', text: 'Mark specific emails to easily find them later.', usage: 'Star emails containing project requirements or important links.' },
        'snoozed': { title: 'Snoozed', icon: 'clock', text: 'Temporarily hide emails and have them return later.', usage: 'Snooze emails you cannot action right now but must reply to tomorrow.' },
        'important': { title: 'Important', icon: 'bookmark', text: 'Emails marked as high priority.', usage: 'Focus on these emails first, especially if they are from clients or managers.' },
        'sent': { title: 'Sent', icon: 'send', text: 'A history of all emails you have sent.', usage: 'Check this if a client claims they never received your email.' },
        'drafts': { title: 'Drafts', icon: 'file', text: 'Unfinished emails saved automatically.', usage: 'Write important emails in Drafts before sending to avoid accidental clicks.' },
        'spam': { title: 'Spam', icon: 'alert-triangle', text: 'Junk or suspicious emails.', usage: 'Never click links in Spam. Sometimes legitimate client emails end up here, so check weekly.' },
        'trash': { title: 'Trash', icon: 'trash-2', text: 'Deleted emails. Emptied automatically after 30 days.', usage: 'If you accidentally delete an important email, recover it from here quickly.' },
        'compose': { title: 'Compose', icon: 'edit', text: 'Create a new email.', usage: 'Used to initiate a new thread, like asking for leave or sending a new project report.' },
        'to': { title: 'To (Recipient)', icon: 'user', text: 'The main person or group you are writing to.', usage: 'Put the person who MUST take action or reply in this field.' },
        'cc': { title: 'CC (Carbon Copy)', icon: 'users', text: 'Send a copy to someone to keep them informed.', usage: 'CC your manager when sending project updates to a client. They read it but don\'t need to reply.' },
        'bcc': { title: 'BCC (Blind Carbon Copy)', icon: 'eye-off', text: 'Send a copy without other recipients seeing the email address.', usage: 'Use BCC when emailing a large list of external people to protect their privacy.' },
        'subject': { title: 'Subject Line', icon: 'type', text: 'The title of the email.', usage: 'Make it clear and searchable. Example: "Project X - Weekly Status - [Your Name]"' },
        'attachment': { title: 'Attachment', icon: 'paperclip', text: 'Attach a file from your computer.', usage: 'Always attach the file BEFORE writing the email body so you don\'t forget.' },
        'link': { title: 'Insert Link', icon: 'link', text: 'Create a hyperlink on text.', usage: 'Instead of pasting ugly URLs, highlight text like "Click Here" and insert the link.' },
        'schedule': { title: 'Schedule Send', icon: 'clock', text: 'Send an email automatically at a later time.', usage: 'If you work late at night, schedule the email to send at 9 AM the next morning to appear professional.' },
        'reply': { title: 'Reply', icon: 'corner-up-left', text: 'Reply only to the sender.', usage: 'Use when the response is private or irrelevant to the rest of the CC\'d group.' },
        'reply-all': { title: 'Reply All', icon: 'reply-all', text: 'Reply to the sender AND everyone else in the CC.', usage: 'Use carefully. Only use it when everyone on the thread needs to know your answer.' },
        'forward': { title: 'Forward', icon: 'arrow-right', text: 'Send an existing email to a new person.', usage: 'Forward client feedback to the development team so they can read the original thread.' },
        'formatting': { title: 'Formatting', icon: 'bold', text: 'Text formatting tools.', usage: 'Use Bold for emphasis, but avoid colors or crazy fonts in professional communication.' }
    };

    window.showEmailInfo = (key) => {
        const data = features[key];
        if (!data) return;
        
        document.getElementById('infoModalTitle').innerText = data.title;
        document.getElementById('infoModalText').innerText = data.text;
        document.getElementById('infoModalUsage').innerText = data.usage;
        document.getElementById('infoModalIcon').innerHTML = `<i data-lucide="${data.icon}"></i>`;
        if (window.lucide) window.lucide.createIcons();
        
        const modal = document.getElementById('emailInfoModal');
        const content = document.getElementById('emailInfoContent');
        modal.classList.remove('hidden');
        
        // Trigger reflow
        void modal.offsetWidth;
        
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    };

    window.closeEmailInfo = () => {
        const modal = document.getElementById('emailInfoModal');
        const content = document.getElementById('emailInfoContent');
        
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    };

    let html = `
        <div class="bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-slate-200 overflow-hidden flex flex-col h-[800px]">
            
            <!-- Mock Top Bar -->
            <div class="bg-slate-50 border-b border-slate-200 h-16 flex items-center justify-between px-4 shrink-0">
                <div class="flex items-center gap-4">
                    <button class="p-2 text-slate-500 hover:bg-slate-200 rounded-full"><i data-lucide="menu" class="w-5 h-5"></i></button>
                    <div class="flex items-center gap-2 text-slate-700 font-bold text-xl">
                        <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white"><i data-lucide="mail" class="w-5 h-5"></i></div>
                        CorporateMail
                    </div>
                </div>
                <div class="flex-1 max-w-2xl px-8 hidden md:block">
                    <div class="bg-white border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-2">
                        <i data-lucide="search" class="w-5 h-5 text-slate-400"></i>
                        <input type="text" placeholder="Search in mail" class="w-full bg-transparent outline-none text-slate-700" disabled>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <button class="w-8 h-8 bg-purple-600 text-white rounded-full font-bold flex items-center justify-center text-sm shadow-sm">U</button>
                </div>
            </div>

            <!-- Mock Main Body -->
            <div class="flex flex-1 overflow-hidden relative">
                
                <!-- Mock Left Sidebar -->
                <div class="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 overflow-y-auto hidden md:flex pb-4">
                    <div class="p-4">
                        <button onclick="window.showEmailInfo('compose')" class="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-4 px-6 rounded-2xl flex items-center gap-3 transition-colors shadow-sm w-full relative overflow-hidden group">
                            <span class="absolute top-0 right-0 p-1 bg-amber-400 text-[10px] text-white rounded-bl-lg font-bold">CLICK ME</span>
                            <i data-lucide="edit-2" class="w-5 h-5"></i> Compose
                        </button>
                    </div>
                    <div class="px-3 space-y-1 mt-2">
                        <button onclick="window.showEmailInfo('inbox')" class="w-full flex items-center gap-4 px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-r-full hover:bg-blue-100 transition-colors relative"><i data-lucide="inbox" class="w-5 h-5"></i> Inbox <span class="ml-auto text-xs">2</span> <span class="absolute right-8 top-1/2 -translate-y-1/2 bg-amber-400 text-[8px] text-white px-1 rounded animate-pulse">CLICK</span></button>
                        <button onclick="window.showEmailInfo('starred')" class="w-full flex items-center gap-4 px-4 py-2 text-slate-700 hover:bg-slate-100 font-medium rounded-r-full transition-colors"><i data-lucide="star" class="w-5 h-5"></i> Starred</button>
                        <button onclick="window.showEmailInfo('snoozed')" class="w-full flex items-center gap-4 px-4 py-2 text-slate-700 hover:bg-slate-100 font-medium rounded-r-full transition-colors"><i data-lucide="clock" class="w-5 h-5"></i> Snoozed</button>
                        <button onclick="window.showEmailInfo('important')" class="w-full flex items-center gap-4 px-4 py-2 text-slate-700 hover:bg-slate-100 font-medium rounded-r-full transition-colors"><i data-lucide="bookmark" class="w-5 h-5"></i> Important</button>
                        <button onclick="window.showEmailInfo('sent')" class="w-full flex items-center gap-4 px-4 py-2 text-slate-700 hover:bg-slate-100 font-medium rounded-r-full transition-colors"><i data-lucide="send" class="w-5 h-5"></i> Sent</button>
                        <button onclick="window.showEmailInfo('drafts')" class="w-full flex items-center gap-4 px-4 py-2 text-slate-700 hover:bg-slate-100 font-medium rounded-r-full transition-colors"><i data-lucide="file" class="w-5 h-5"></i> Drafts</button>
                        <div class="h-px bg-slate-200 my-2"></div>
                        <button onclick="window.showEmailInfo('spam')" class="w-full flex items-center gap-4 px-4 py-2 text-slate-700 hover:bg-slate-100 font-medium rounded-r-full transition-colors"><i data-lucide="alert-triangle" class="w-5 h-5"></i> Spam</button>
                        <button onclick="window.showEmailInfo('trash')" class="w-full flex items-center gap-4 px-4 py-2 text-slate-700 hover:bg-slate-100 font-medium rounded-r-full transition-colors"><i data-lucide="trash-2" class="w-5 h-5"></i> Trash</button>
                    </div>
                </div>

                <!-- Mock Email List & Reading Pane -->
                <div class="flex-1 flex flex-col bg-white">
                    <!-- Actions Toolbar -->
                    <div class="h-12 border-b border-slate-200 flex items-center px-4 gap-4 text-slate-500 bg-white shrink-0">
                        <i data-lucide="square" class="w-4 h-4"></i>
                        <i data-lucide="rotate-cw" class="w-4 h-4"></i>
                        <i data-lucide="more-vertical" class="w-4 h-4"></i>
                        <div class="ml-auto text-xs font-medium">1-50 of 102</div>
                    </div>

                    <!-- Reading Pane Wrapper -->
                    <div class="flex-1 overflow-y-auto p-6 bg-slate-50 flex items-center justify-center relative">
                        
                        <!-- Open Compose Window Simulation -->
                        <div class="w-full max-w-3xl bg-white rounded-t-xl rounded-b-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-slate-300 flex flex-col overflow-hidden relative animate-fade-in group">
                            
                            <!-- Compose Header -->
                            <div class="bg-slate-800 text-white px-4 py-3 flex justify-between items-center text-sm font-medium">
                                New Message
                                <div class="flex gap-3">
                                    <i data-lucide="minus" class="w-4 h-4 cursor-pointer hover:text-slate-300"></i>
                                    <i data-lucide="maximize-2" class="w-4 h-4 cursor-pointer hover:text-slate-300"></i>
                                    <i data-lucide="x" class="w-4 h-4 cursor-pointer hover:text-slate-300"></i>
                                </div>
                            </div>

                            <!-- Recipients -->
                            <div class="border-b border-slate-200 px-4 py-2 flex items-center text-sm relative">
                                <button onclick="window.showEmailInfo('to')" class="text-slate-500 font-medium w-16 text-left hover:text-blue-600 transition-colors flex items-center gap-1"><i data-lucide="help-circle" class="w-3 h-3 text-blue-500 animate-pulse"></i> To</button>
                                <input type="text" class="flex-1 outline-none text-slate-800" disabled placeholder="recipient@company.com">
                                <div class="flex gap-3 text-slate-500 font-medium">
                                    <button onclick="window.showEmailInfo('cc')" class="hover:text-blue-600 transition-colors flex items-center gap-1"><i data-lucide="help-circle" class="w-3 h-3 text-blue-500 animate-pulse"></i> Cc</button>
                                    <button onclick="window.showEmailInfo('bcc')" class="hover:text-blue-600 transition-colors flex items-center gap-1"><i data-lucide="help-circle" class="w-3 h-3 text-blue-500 animate-pulse"></i> Bcc</button>
                                </div>
                            </div>
                            
                            <!-- Subject -->
                            <div class="border-b border-slate-200 px-4 py-2 flex items-center text-sm">
                                <button onclick="window.showEmailInfo('subject')" class="text-slate-500 font-medium hover:text-blue-600 transition-colors flex items-center gap-1 w-full text-left">
                                    <i data-lucide="help-circle" class="w-3 h-3 text-blue-500 animate-pulse"></i> Subject
                                </button>
                            </div>

                            <!-- Body Area -->
                            <div class="flex-1 min-h-[250px] p-4 text-slate-600 text-sm">
                                <p class="text-slate-400 italic font-medium">Email body content goes here...</p>
                            </div>

                            <!-- Formatting Toolbar -->
                            <div class="border-t border-slate-200 bg-slate-50 p-2 flex items-center gap-4 text-slate-500 text-sm relative">
                                <span class="absolute left-1/2 -translate-x-1/2 -top-6 bg-amber-400 text-white text-[10px] font-bold px-2 py-1 rounded">CLICK ICONS TO LEARN</span>
                                <button onclick="window.showEmailInfo('formatting')" class="hover:text-blue-600"><i data-lucide="bold" class="w-4 h-4"></i></button>
                                <button onclick="window.showEmailInfo('formatting')" class="hover:text-blue-600"><i data-lucide="italic" class="w-4 h-4"></i></button>
                                <button onclick="window.showEmailInfo('formatting')" class="hover:text-blue-600"><i data-lucide="underline" class="w-4 h-4"></i></button>
                                <div class="w-px h-4 bg-slate-300"></div>
                                <button onclick="window.showEmailInfo('formatting')" class="hover:text-blue-600"><i data-lucide="list" class="w-4 h-4"></i></button>
                                <button onclick="window.showEmailInfo('formatting')" class="hover:text-blue-600"><i data-lucide="align-left" class="w-4 h-4"></i></button>
                            </div>

                            <!-- Bottom Toolbar -->
                            <div class="p-3 bg-white flex items-center justify-between border-t border-slate-200">
                                <div class="flex items-center gap-3">
                                    <div class="flex items-stretch rounded overflow-hidden">
                                        <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 text-sm transition-colors cursor-not-allowed">Send</button>
                                        <button onclick="window.showEmailInfo('schedule')" class="bg-blue-700 hover:bg-blue-800 text-white px-2 py-2 border-l border-blue-500 transition-colors relative" title="Schedule Send">
                                            <i data-lucide="chevron-up" class="w-4 h-4"></i>
                                            <span class="absolute -top-3 -right-3 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                                        </button>
                                    </div>
                                    <div class="w-px h-6 bg-slate-200 mx-2"></div>
                                    <button onclick="window.showEmailInfo('attachment')" class="text-slate-500 hover:text-blue-600 p-2 relative group-btn">
                                        <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Attach File</span>
                                        <i data-lucide="paperclip" class="w-5 h-5"></i>
                                    </button>
                                    <button onclick="window.showEmailInfo('link')" class="text-slate-500 hover:text-blue-600 p-2 relative group-btn">
                                        <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Insert Link</span>
                                        <i data-lucide="link" class="w-5 h-5"></i>
                                    </button>
                                </div>
                                <div class="flex items-center gap-3 text-slate-500">
                                    <button class="hover:text-slate-800 p-2"><i data-lucide="more-vertical" class="w-5 h-5"></i></button>
                                    <button class="hover:text-slate-800 p-2"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Integrations Pane -->
                <div class="w-14 border-l border-slate-200 bg-white flex flex-col items-center py-4 gap-6 shrink-0 hidden lg:flex">
                    <button class="w-8 h-8 rounded hover:bg-slate-100 flex items-center justify-center text-blue-500"><i data-lucide="calendar" class="w-5 h-5"></i></button>
                    <button class="w-8 h-8 rounded hover:bg-slate-100 flex items-center justify-center text-amber-500"><i data-lucide="edit-3" class="w-5 h-5"></i></button>
                    <button class="w-8 h-8 rounded hover:bg-slate-100 flex items-center justify-center text-blue-400"><i data-lucide="check-square" class="w-5 h-5"></i></button>
                    <div class="w-6 h-px bg-slate-200"></div>
                    <button class="w-8 h-8 rounded hover:bg-slate-100 flex items-center justify-center text-slate-400"><i data-lucide="plus" class="w-5 h-5"></i></button>
                </div>
            </div>
        </div>
    `;
    
    // Add CSS for group-btn
    html += `
        <style>
            .group-btn:hover span { opacity: 1; }
        </style>
    `;

    container.innerHTML = html;
};
