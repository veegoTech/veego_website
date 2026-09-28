// Render the Professional Track Lesson
window.renderProLesson = (day) => {
    // Topic 1 Override (Highly Custom Interactive Module)
    if (day == 1 && typeof window.renderProSelfIntroModule === 'function') {
        return window.renderProSelfIntroModule(day);
    }
    
    // Topic 2 Override (Highly Custom ATS Module)
    if (day == 2 && typeof window.renderResumeBuildingModule === 'function') {
        return window.renderResumeBuildingModule(day);
    }
    
    // Topic 3 Override (LinkedIn Optimization)
    if (day == 3 && typeof window.renderLinkedInModule === 'function') {
        return window.renderLinkedInModule(day);
    }
    
    // Topic 4 Override (Custom Email Interface Simulator)
    if (day == 4 && typeof window.renderEmailInterfaceModule === 'function') {
        return window.renderEmailInterfaceModule(day);
    }
    
    // Topic 5 Override (Custom Email Writing & AI Coach Simulator)
    if (day == 5 && typeof window.renderEmailWritingModule === 'function') {
        return window.renderEmailWritingModule(day);
    }
    
    // Topic 6 Override (Custom Teams/Slack/Meet Simulator)
    if (day == 6 && typeof window.renderCommunicationModule === 'function') {
        return window.renderCommunicationModule(day);
    }
    
    // Topic 7 Override (Custom Meeting Etiquette Simulator)
    if (day == 7 && typeof window.renderMeetingEtiquetteModule === 'function') {
        return window.renderMeetingEtiquetteModule(day);
    }
    
    // Topic 8 Override (Custom Presentation Skills Simulator)
    if (day == 8 && typeof window.renderPresentationModule === 'function') {
        return window.renderPresentationModule(day);
    }
    
    // Topic 9 Override (Custom Client Communication Simulator)
    if (day == 9 && typeof window.renderClientCommModule === 'function') {
        return window.renderClientCommModule(day);
    }
    
    // Topic 10 Override (Custom Conflict Resolution Simulator)
    if (day == 10 && typeof window.renderConflictResolutionModule === 'function') {
        return window.renderConflictResolutionModule(day);
    }
    
    // Topic 11 Override (Custom Negotiation Simulator)
    if (day == 11 && typeof window.renderNegotiationModule === 'function') {
        return window.renderNegotiationModule(day);
    }
    
    // Topic 12 Override (Custom Time Management Simulator)
    if (day == 12 && typeof window.renderTimeManagementModule === 'function') {
        return window.renderTimeManagementModule(day);
    }
    
    // Topic 13 Override (Custom Smart Work Simulator)
    if (day == 13 && typeof window.renderSmartWorkModule === 'function') {
        return window.renderSmartWorkModule(day);
    }
    
    // Topic 14 Override (Custom AI Tools Simulator)
    if (day == 14 && typeof window.renderAIToolsModule === 'function') {
        return window.renderAIToolsModule(day);
    }
    
    // Topic 15 Override (Custom Leadership Simulator)
    if (day == 15 && typeof window.renderLeadershipModule === 'function') {
        return window.renderLeadershipModule(day);
    }
    
    // Topic 16 Override (Custom Teamwork Simulator)
    if (day == 16 && typeof window.renderTeamworkModule === 'function') {
        return window.renderTeamworkModule(day);
    }


    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    if (!lessonData) {
        mainContent.innerHTML = `<div class="p-10 text-center text-slate-500"><h2>Content not found for Pro Topic ${day}</h2></div>`;
        return;
    }

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-cyan-50 rounded-lg text-cyan-600 hidden sm:block"><i data-lucide="briefcase" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: ${lessonData.title}</span>`;
    }

    // Colors for the corporate theme
    const themeGradient = 'from-cyan-600 to-blue-700';
    const bgGradient = 'from-slate-50 to-slate-100';

    const progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    const isCompleted = progress.completedLessons && progress.completedLessons.includes(`pro_${day}`);

    let html = `
        <div class="animate-fade-in max-w-5xl mx-auto space-y-8 mt-4 pb-20 bg-gradient-to-b ${bgGradient} min-h-screen">
            
            <!-- Header Banner -->
            <div class="relative bg-gradient-to-r ${themeGradient} rounded-3xl p-10 shadow-xl overflow-hidden text-white">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0 shadow-inner">
                        <i data-lucide="briefcase" class="w-12 h-12 text-white"></i>
                    </div>
                    <div>
                        <div class="text-cyan-200 font-bold tracking-widest text-sm uppercase mb-2">Phase ${lessonData.phase} • Topic ${day}</div>
                        <h1 class="text-3xl md:text-5xl font-extrabold mb-4">${lessonData.title}</h1>
                        <p class="text-cyan-50 text-lg max-w-2xl">${lessonData.introduction.whyImportant}</p>
                    </div>
                </div>
            </div>

            ${lessonData.infographic ? `
            <!-- Infographic -->
            <div class="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 mt-8 mb-8">
                <h2 class="text-3xl font-extrabold text-center text-slate-800 mb-12">${lessonData.infographic.title}</h2>
                <div class="flex flex-col md:flex-row items-start justify-center gap-6 md:gap-10">
                    ${lessonData.infographic.items.map((item, idx) => `
                        <div class="flex-1 flex flex-col items-center text-center group w-full">
                            <div class="w-28 h-28 rounded-full ${item.colorClasses} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:shadow-xl group-hover:text-white transition-all duration-300 border-[6px] border-white">
                                <i data-lucide="${item.icon}" class="w-12 h-12"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-slate-800 mb-3">${item.title}</h3>
                            <p class="text-slate-600 text-lg max-w-[200px] leading-relaxed">${item.desc}</p>
                        </div>
                        ${idx < lessonData.infographic.items.length - 1 ? `
                            <div class="hidden md:flex flex-col justify-center items-center h-28 text-slate-300 px-2 shrink-0">
                                <div class="flex gap-3">
                                    <div class="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                                </div>
                            </div>
                        ` : ''}
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Main Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <!-- Left Column: Content Flow -->
                <div class="lg:col-span-2 space-y-8">
                    
                    <!-- 1 & 2. Intro & Objectives -->
                    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><i data-lucide="target" class="w-5 h-5"></i></div>
                            <h2 class="text-2xl font-bold text-slate-800">Learning Objectives</h2>
                        </div>
                        <ul class="space-y-3 mb-8">
                            ${lessonData.learningObjectives.map(obj => `
                                <li class="flex items-start gap-3 text-slate-600">
                                    <i data-lucide="check-circle-2" class="w-6 h-6 text-emerald-500 shrink-0"></i>
                                    <span class="text-lg leading-relaxed">${obj}</span>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <div class="bg-slate-50 rounded-xl p-6 border border-slate-100">
                            <h3 class="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">Common Mistakes to Avoid</h3>
                            <ul class="list-disc list-inside text-rose-500 space-y-1">
                                ${lessonData.introduction.commonMistakes.map(m => `<li>${m}</li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    <!-- 3. Step-by-Step Guide (Timeline) -->
                    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <div class="flex items-center gap-3 mb-8">
                            <div class="w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center"><i data-lucide="list-ordered" class="w-5 h-5"></i></div>
                            <h2 class="text-2xl font-bold text-slate-800">Step-by-Step Guide</h2>
                        </div>
                        <div class="relative border-l-2 border-slate-200 ml-4 space-y-10 pb-4">
                            ${lessonData.steps.map(step => `
                                <div class="relative pl-8">
                                    <div class="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold shadow-md border-4 border-white">
                                        ${step.step}
                                    </div>
                                    <h3 class="text-xl font-bold text-slate-800 mb-2">${step.title}</h3>
                                    <p class="text-slate-600 mb-4">${step.explain}</p>
                                    
                                    <div class="bg-blue-50/50 rounded-xl p-4 border border-blue-100 mb-3">
                                        <div class="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Example</div>
                                        <div class="text-slate-700 italic">"${step.example}"</div>
                                    </div>
                                    <div class="flex gap-4">
                                        <div class="bg-amber-50 rounded-lg p-3 text-sm border border-amber-100 flex-1">
                                            <span class="font-bold text-amber-700 block mb-1">💡 Pro Tip:</span>
                                            <span class="text-amber-800">${step.tip}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 4. Examples Comparison -->
                    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center"><i data-lucide="split-square-horizontal" class="w-5 h-5"></i></div>
                            <h2 class="text-2xl font-bold text-slate-800">Real-Life Examples</h2>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="bg-rose-50 rounded-xl p-6 border border-rose-100">
                                <div class="flex items-center gap-2 text-rose-600 font-bold mb-3"><i data-lucide="x-circle" class="w-5 h-5"></i> Unprofessional</div>
                                <p class="text-rose-800 italic">"${lessonData.examples.wrong}"</p>
                            </div>
                            <div class="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                                <div class="flex items-center gap-2 text-emerald-600 font-bold mb-3"><i data-lucide="check-circle" class="w-5 h-5"></i> Professional</div>
                                <p class="text-emerald-800 italic">"${lessonData.examples.professional}"</p>
                            </div>
                        </div>
                    </div>

                    <!-- Images (if any) -->
                    ${lessonData.images && lessonData.images.length > 0 ? `
                    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center"><i data-lucide="image" class="w-5 h-5"></i></div>
                            <h2 class="text-2xl font-bold text-slate-800">Visual References</h2>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            ${lessonData.images.map(img => `
                                <div class="rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-zoom-in group relative" onclick="window.openImageModal('${img}')">
                                    <img src="${img}" alt="Reference Image" class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105">
                                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center transition-all">
                                        <div class="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-md">
                                            <i data-lucide="zoom-in" class="w-5 h-5 text-slate-800"></i>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <!-- 5. AI Interactive Role Play -->
                    <div class="bg-slate-900 rounded-2xl p-8 shadow-xl text-white flex flex-col h-[400px] md:h-[500px]">
                        <div class="flex items-center justify-between mb-6 shrink-0">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center"><i data-lucide="bot" class="w-5 h-5"></i></div>
                                <h2 class="text-2xl font-bold text-white">Interactive AI Role Play</h2>
                            </div>
                        </div>
                        <p class="text-slate-400 mb-6 shrink-0">Practice your response to this typical scenario. The AI will strictly guide you on the topic.</p>
                        
                        <div id="pro-chat-container" class="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin scrollbar-thumb-slate-700">
                            ${lessonData.aiConversation.map((msg, i) => `
                                <div class="flex gap-4 ${msg.role === 'Student' ? 'flex-row-reverse' : ''}">
                                    <div class="w-10 h-10 rounded-full ${msg.role === 'Student' ? 'bg-indigo-500' : 'bg-slate-700'} flex items-center justify-center shrink-0 font-bold text-xs uppercase">${msg.role === 'Student' ? 'ST' : 'AI'}</div>
                                    <div class="${msg.role === 'Student' ? 'bg-indigo-600' : 'bg-slate-800'} p-4 rounded-2xl max-w-[90%] md:max-w-[80%] shadow-md border border-white/5">
                                        <p class="text-slate-100">${msg.text}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="flex gap-3 shrink-0">
                            <input type="text" id="pro-chat-input" placeholder="Type your response here or ask for steps/examples..." class="flex-1 bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-fuchsia-500 transition-colors" onkeypress="if(event.key === 'Enter') window.handleProAiChat('${day}')">
                            <button onclick="window.handleProAiChat('${day}')" class="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center shadow-lg">
                                <i data-lucide="send" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- 12. Assessment -->
                    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center"><i data-lucide="clipboard-check" class="w-5 h-5"></i></div>
                            <h2 class="text-2xl font-bold text-slate-800">Knowledge Check</h2>
                        </div>
                        ${lessonData.assessment.mcq.map((q, idx) => {
                            const safeAns = q.answer.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                            return `
                            <div class="mb-6 last:mb-0">
                                <p class="font-bold text-slate-800 mb-4">${idx+1}. ${q.q}</p>
                                <div class="space-y-2">
                                    ${q.options.map(opt => {
                                        const safeOpt = opt.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                                        return `
                                        <button onclick="window.checkProAnswer(this, '${safeOpt}', '${safeAns}')" class="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-violet-400 hover:bg-violet-50 transition-all font-medium text-slate-600">
                                            ${opt}
                                        </button>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                            `;
                        }).join('')}
                        <div class="mt-6 text-center space-y-4 flex flex-col items-center">
                            ${isCompleted ? `
                                <div class="text-emerald-600 font-bold flex items-center gap-2 text-lg">
                                    <i data-lucide="check-circle" class="w-6 h-6"></i> Lesson Completed!
                                </div>
                                ${window.proSyllabus[parseInt(day) + 1] ? `
                                    <button onclick="window.showView('pro_lesson', {day: ${parseInt(day) + 1}})" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto flex justify-center items-center gap-2">
                                        Next Lesson <i data-lucide="arrow-right" class="w-5 h-5"></i>
                                    </button>
                                ` : `
                                    <button onclick="window.showView('dashboard')" class="bg-slate-800 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-lg hover:bg-slate-700 transition-transform hover:-translate-y-1 w-full sm:w-auto">
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

                </div>

                <!-- Right Column: Sidebar info -->
                <div class="space-y-6">
                    
                    <!-- 7. Communication Tips -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2"><i data-lucide="zap" class="w-5 h-5 text-amber-500"></i> Pro Tips</h3>
                        <div class="space-y-4 text-sm">
                            <div><strong class="text-slate-700 block mb-1">Body Language:</strong> <span class="text-slate-600">${lessonData.communicationTips.bodyLanguage}</span></div>
                            <div><strong class="text-slate-700 block mb-1">Eye Contact:</strong> <span class="text-slate-600">${lessonData.communicationTips.eyeContact}</span></div>
                            <div><strong class="text-slate-700 block mb-1">Confidence:</strong> <span class="text-slate-600">${lessonData.communicationTips.confidence}</span></div>
                        </div>
                    </div>

                    <!-- 6. Vocabulary -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2"><i data-lucide="book-a" class="w-5 h-5 text-emerald-500"></i> Corporate Vocabulary</h3>
                        <div class="space-y-4">
                            ${lessonData.vocabulary.map(v => `
                                <div class="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                    <div class="font-bold text-indigo-700">${v.word} <span class="text-xs text-slate-400 font-normal ml-2">${v.pronunciation}</span></div>
                                    <div class="text-xs text-slate-600 mt-1">${v.meaning}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 8. Dos and Donts -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2"><i data-lucide="thumbs-up" class="w-5 h-5 text-blue-500"></i> Do's & Don'ts</h3>
                        <div class="space-y-4">
                            <div>
                                <h4 class="text-xs font-bold text-emerald-600 uppercase mb-2">DO</h4>
                                <ul class="space-y-1 text-sm text-slate-600">
                                    ${lessonData.dosAndDonts.dos.map(d => `<li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-500"></i> ${d}</li>`).join('')}
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-xs font-bold text-rose-600 uppercase mb-2">DON'T</h4>
                                <ul class="space-y-1 text-sm text-slate-600">
                                    ${lessonData.dosAndDonts.donts.map(d => `<li class="flex items-center gap-2"><i data-lucide="x" class="w-4 h-4 text-rose-500"></i> ${d}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    ${window.isStaffModeOn ? `
                    <!-- 14. Staff Notes -->
                    <div class="bg-amber-100 rounded-2xl p-6 shadow-sm border border-amber-200 relative overflow-hidden">
                        <div class="absolute -right-4 -bottom-4 opacity-10 text-amber-900"><i class="fas fa-chalkboard-teacher text-8xl"></i></div>
                        <h3 class="font-bold text-amber-900 mb-4 flex items-center gap-2 relative z-10"><i data-lucide="graduation-cap" class="w-5 h-5"></i> Staff Teaching Notes</h3>
                        <div class="text-sm text-amber-800 relative z-10 space-y-2">
                            <p><strong>Flow:</strong> ${lessonData.staffNotes.teachingFlow}</p>
                            <p><strong>Mistakes:</strong> ${lessonData.staffNotes.commonMistakes}</p>
                        </div>
                    </div>
                    ` : ''}

                </div>
            </div>
        </div>
    `;

    mainContent.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
};

window.checkProAnswer = (btn, selected, correct) => {
    const parent = btn.parentElement;
    const allBtns = parent.querySelectorAll('button');
    allBtns.forEach(b => {
        b.disabled = true;
        b.classList.remove('hover:border-violet-400', 'hover:bg-violet-50', 'border-slate-200');
        if (b.innerText.trim() === correct.trim()) {
            b.classList.add('bg-emerald-100', 'border-emerald-500', 'text-emerald-800');
        } else if (b.innerText.trim() === selected.trim() && selected.trim() !== correct.trim()) {
            b.classList.add('bg-rose-100', 'border-rose-500', 'text-rose-800');
        } else {
            b.classList.add('opacity-50');
        }
    });
};

window.completeProLesson = (day) => {
    let progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    if (!progress.completedLessons) progress.completedLessons = [];
    if (!progress.pendingValidation) progress.pendingValidation = [];
    
    if (window.isStaffModeOn) {
        if (!progress.completedLessons.includes(`pro_${day}`)) {
            window.LocalDB.approveLesson(window.viewingStudentUsername, 'pro', day);
            alert("Lesson marked as completed (Staff Override).");
        } else {
            alert("Lesson already completed!");
        }
    } else {
        if (!progress.completedLessons.includes(`pro_${day}`) && !progress.pendingValidation.includes(`pro_${day}`)) {
            window.LocalDB.requestLessonValidation(window.viewingStudentUsername, 'pro', day);
            alert("Validation Requested! Waiting for Staff Approval.");
        } else if (progress.pendingValidation.includes(`pro_${day}`)) {
            alert("Lesson is already pending validation.");
        } else {
            alert("Lesson already completed!");
        }
    }
    
    window.renderProLesson(day); 
};

window.openImageModal = (src) => {
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out opacity-0 transition-opacity duration-300';
        modal.onclick = () => {
            modal.classList.remove('opacity-100');
            setTimeout(() => modal.style.display = 'none', 300);
        };
        modal.innerHTML = `<img id="imageModalSrc" src="" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl transform scale-95 transition-transform duration-300">`;
        document.body.appendChild(modal);
    }
    const imgEl = document.getElementById('imageModalSrc');
    imgEl.src = src;
    modal.style.display = 'flex';
    // trigger reflow
    void modal.offsetWidth;
    modal.classList.add('opacity-100');
    imgEl.classList.add('scale-100');
};

window.handleProAiChat = (day) => {
    const input = document.getElementById('pro-chat-input');
    if (!input) return;
    const rawMsg = input.value.trim();
    const msg = rawMsg.toLowerCase();
    if (!msg) return;
    
    const chatContainer = document.getElementById('pro-chat-container');
    
    // Add user message
    chatContainer.innerHTML += `
        <div class="flex gap-4 flex-row-reverse mb-4">
            <div class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 font-bold text-xs uppercase text-white">ST</div>
            <div class="bg-indigo-600 p-4 rounded-2xl max-w-[90%] md:max-w-[80%] shadow-md border border-white/5 text-white">
                <p class="text-slate-100">${rawMsg}</p>
            </div>
        </div>
    `;
    input.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Simulate AI thinking delay
    setTimeout(() => {
        const lessonData = window.proSyllabus[day];
        const topic = lessonData ? lessonData.title : 'this topic';
        let reply = '';
        
        if (lessonData) {
            // Intelligent Keyword Matching against Lesson Data
            
            // Feature: Generate custom content based on user details
            if (msg.includes('my name is') || msg.includes('i am') || msg.includes('generate') || msg.includes('create') || msg.includes('help me write')) {
                if (day == 1 || day == '1') {
                    let name = "[Your Name]";
                    let nameMatch = msg.match(/name is ([a-zA-Z\s]+)(?:\.|,|$| and)/i);
                    if (nameMatch) name = nameMatch[1].trim();
                    else {
                        let iAmMatch = msg.match(/i am ([a-zA-Z\s]+)(?:\.|,|$| and)/i);
                        if (iAmMatch && !iAmMatch[1].includes('a ') && !iAmMatch[1].includes('an ')) name = iAmMatch[1].trim();
                    }
                    
                    let experience = "[Your Education/Experience]";
                    if (msg.includes('student') || msg.includes('study') || msg.includes('college')) experience = "a dedicated student eager to bring my academic knowledge into a practical work environment";
                    else if (msg.includes('experience') || msg.includes('work') || msg.includes('years')) experience = "an experienced professional with a solid track record of delivering results";

                    let skills = "[Your Key Skills]";
                    if (msg.includes('developer') || msg.includes('code') || msg.includes('software')) skills = "software development and problem-solving";
                    else if (msg.includes('design')) skills = "creative design and user experience";
                    else if (msg.includes('manage') || msg.includes('lead')) skills = "team leadership and project management";

                    reply = `Here is a custom self-introduction generated just for you:<br><br>
                    <i>"Hello everyone, my name is <b>${name}</b>. I am <b>${experience}</b>, specializing in <b>${skills}</b>. I am thrilled to be joining the team and look forward to contributing to our shared success. Thank you for this opportunity!"</i><br><br>
                    You can practice reading this out loud, or ask me for the general "steps" to build one yourself!`;
                } else {
                    reply = `Based on your details, here is a customized professional statement for **${topic}**:<br><br>
                    <i>"I am highly committed to excellence in this area, leveraging my background to deliver strong results while maintaining clear and professional communication."</i><br><br>
                    Does this sound good to you? You can also ask me for "examples" or "steps".`;
                }
            }
            else if (msg.includes('step') || msg.includes('how to') || msg.includes('process') || msg.includes('guide')) {
                const stepList = lessonData.steps.map((s, i) => `<b>${i+1}. ${s.title}:</b> ${s.explain}`).join('<br><br>');
                reply = `Here is the step-by-step guide for **${topic}**:<br><br>${stepList}`;
            } else if (msg.includes('why') || msg.includes('important') || msg.includes('reason')) {
                reply = `<b>Why it's important:</b><br>${lessonData.introduction.whyImportant}`;
            } else if (msg.includes('mistake') || msg.includes('wrong') || msg.includes("don't") || msg.includes('dont') || msg.includes('avoid')) {
                const mistakes = lessonData.dosAndDonts.donts.map(d => `• ${d}`).join('<br>');
                reply = `Here is what you should avoid in **${topic}**:<br>${mistakes}`;
            } else if (msg.includes('example') || msg.includes('show me') || msg.includes('sample')) {
                reply = `Here is a professional example:<br><br><i>"${lessonData.examples.professional}"</i>`;
            } else if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
                reply = `Hello! I am your AI assistant for **${topic}**. You can give me your details (e.g. "My name is John and I am a student") to generate a custom response, or ask for the steps, professional examples, or common mistakes!`;
            }
        }
        
        // Fallback to conversational steering
        if (!reply) {
            const responses = [
                `That's an interesting approach! But remember, we are focusing on **${topic}**. Try telling me your details like "My name is... and I am a..." to generate a custom answer!`,
                `Good job. Let's dig deeper into **${topic}**. If you want, ask me "what are the common mistakes" to learn what to avoid.`,
                `I see. Let's make sure we stick to the scenario. In a real-world **${topic}** situation, keeping it professional is key. Try asking me "show me an example"!`,
                `Excellent point! Relating this back to **${topic}**, how would you explain this? (Hint: ask me to "generate" one for you with your details)`
            ];
            reply = responses[Math.floor(Math.random() * responses.length)];
        }
        
        chatContainer.innerHTML += `
            <div class="flex gap-4 mb-4">
                <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center shrink-0 font-bold text-xs uppercase text-white">AI</div>
                <div class="bg-slate-800 p-4 rounded-2xl max-w-[90%] md:max-w-[80%] shadow-md border border-white/5 text-white">
                    <p class="text-slate-100 leading-relaxed">${reply}</p>
                </div>
            </div>
        `;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 800);
};
