// ─────────────────── LESSON ENGINE (v3) ───────────────────
// Premium Linear Journey for Students & Digital Notebook for Staff

// Global Audio Recording State
window._mediaRecorder = null;
window._audioChunks = [];
window._recordingUrl = null;
window._audioPlayer = null;

window.startSpeakingRecording = async function(btn) {
    if (btn.dataset.state === 'saved') return;
    
    if (btn.dataset.state === 'recording') {
        // Stop recording
        if (window._mediaRecorder && window._mediaRecorder.state !== 'inactive') {
            window._mediaRecorder.stop();
        }
        btn.dataset.state = 'saved';
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Recording Saved!';
        btn.classList.remove('animate-pulse', 'bg-rose-500', 'border-rose-600');
        btn.classList.add('bg-emerald-500', 'border-emerald-600');
        return;
    }
    
    // Start recording
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        window._mediaRecorder = new MediaRecorder(stream);
        window._audioChunks = [];
        window._recordingUrl = null;
        
        window._mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) window._audioChunks.push(e.data);
        };
        
        window._mediaRecorder.onstop = () => {
            const blob = new Blob(window._audioChunks, { type: 'audio/webm' });
            window._recordingUrl = URL.createObjectURL(blob);
            // Release the microphone
            stream.getTracks().forEach(track => track.stop());
        };
        
        window._mediaRecorder.start();
        
        btn.dataset.state = 'recording';
        btn.innerHTML = '<i class="fas fa-stop-circle"></i> Stop Recording';
        btn.classList.add('animate-pulse', 'bg-rose-500', 'border-rose-600');
    } catch (err) {
        console.error(err);
        alert('Microphone access denied or not available. Please allow microphone permissions or run via a local web server (HTTPS).');
    }
};

window.playSpeakingRecording = function() {
    const recBtn = document.getElementById('start-recording-btn');
    if (recBtn && recBtn.dataset.state !== 'saved') {
        alert('Please complete your recording first!');
        return;
    }
    
    if (window._recordingUrl) {
        if (window._audioPlayer) {
            window._audioPlayer.pause();
        }
        window._audioPlayer = new Audio(window._recordingUrl);
        window._audioPlayer.play();
    } else {
        alert('No recording found or it failed to save.');
    }
};

window.checkAllHomeworkDone = function() {
    const totalTasks = document.querySelectorAll('[id^="hw_task_"]').length;
    const doneTasks = document.querySelectorAll('[id^="hw_task_"] button[data-done="true"]').length;
    if (doneTasks >= totalTasks && totalTasks > 0) {
        const banner = document.getElementById('hw-completion-banner');
        if (banner) {
            banner.classList.remove('hidden');
            banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
};

window.currentLessonStage = 0;
const STUDENT_STAGES = ['theory', 'vocabulary', 'speaking', 'listening', 'readingWriting', 'activities', 'homework'];

window.renderLesson = (level, day, container) => {
    const lesson = window.getLesson(level, day);

    if (!lesson) {
        container.innerHTML = `
            <div class="text-center py-20">
                <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                <h2 class="text-2xl font-bold">Lesson not found</h2>
                <button onclick="showView('dashboard')" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl">Back to Dashboard</button>
            </div>
        `;
        return;
    }

    const currentUser = JSON.parse(sessionStorage.getItem('alphafly_currentUser')) || {};
    const isStaffMode = (currentUser.role === 'staff' || currentUser.role === 'admin') && window.isStaffModeOn;

    if (isStaffMode) {
        renderStaffNotebook(lesson, level, day, container);
    } else {
        window.currentLessonStage = 0;
        window.currentLessonData = lesson;
        window.currentLessonDay = day;
        window.currentLessonLevel = level;
        renderStudentJourney(container);
    }
};

// ==========================================
// 1. STAFF MODULE: DIGITAL TEACHING NOTEBOOK
// ==========================================
function renderStaffNotebook(lesson, level, day, container) {
    const script = lesson.staffGuide ? lesson.staffGuide.script : [];
    
    let html = `
        <div class="max-w-4xl mx-auto pb-20 animate-fade-in">
            <div class="flex items-center justify-between mb-8">
                <button onclick="showView('dashboard')" class="text-slate-500 hover:text-indigo-600 flex items-center gap-2 font-bold transition-colors">
                    <i class="fas fa-arrow-left"></i> Back to Dashboard
                </button>
                <div class="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <i class="fas fa-chalkboard-teacher"></i> Teaching Mode
                </div>
            </div>

            <div class="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
                <div class="absolute -right-5 -top-5 opacity-5 text-indigo-900"><i class="fas fa-book-reader text-[150px]"></i></div>
                <div class="relative z-10">
                    <span class="text-indigo-500 font-bold tracking-widest uppercase text-sm mb-2 block">Day ${day} • ${lesson.topic || 'Lesson'}</span>
                    <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">${lesson.title}</h1>
                    <p class="text-slate-500 text-lg border-l-4 border-indigo-500 pl-4">${lesson.objective}</p>
                </div>
            </div>
            
            <div class="space-y-6">
    `;

    script.forEach((step, idx) => {
        if (step.type === 'teacherSays') {
            html += `
                <div class="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex gap-4 items-start shadow-sm">
                    <div class="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center shrink-0 text-xl shadow-md"><i class="fas fa-bullhorn"></i></div>
                    <div>
                        <h3 class="text-indigo-800 font-bold uppercase tracking-widest text-xs mb-2">Teacher Says</h3>
                        <p class="text-indigo-900 font-medium text-lg">"${step.content}"</p>
                    </div>
                </div>
            `;
        } else if (step.type === 'step') {
            html += `
                <div class="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                        <h3 class="text-slate-800 font-extrabold text-xl">${step.title}</h3>
                        ${step.instruction ? `<span class="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full"><i class="fas fa-lightbulb"></i> ${step.instruction}</span>` : ''}
                    </div>
                    <div class="space-y-4">
                        <div>
                            <p class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">English</p>
                            <p class="text-2xl font-black text-slate-800">${step.english}</p>
                        </div>
                        <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                            <p class="text-emerald-600/70 text-xs font-bold uppercase tracking-wider mb-1">தமிழ்</p>
                            <p class="text-xl font-bold text-emerald-800">${step.tamil}</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (step.type === 'practice') {
            html += `
                <div class="bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl p-8 shadow-lg shadow-orange-200 relative overflow-hidden">
                    <i class="fas fa-users absolute -right-5 -bottom-5 text-8xl opacity-20"></i>
                    <h3 class="font-extrabold text-2xl mb-2 flex items-center gap-3"><i class="fas fa-hand-sparkles"></i> Class Practice</h3>
                    <p class="text-lg font-medium text-amber-50">${step.instruction}</p>
                </div>
            `;
        } else if (step.type === 'homework') {
            html += `
                <div class="bg-slate-800 text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
                    <i class="fas fa-home absolute -right-5 -bottom-5 text-8xl opacity-10"></i>
                    <h3 class="font-extrabold text-2xl mb-2 flex items-center gap-3"><i class="fas fa-pen-alt"></i> Homework</h3>
                    <p class="text-lg font-medium text-slate-300">${step.instruction}</p>
                </div>
            `;
        }
    });

    html += `
            </div>
            
            <div class="mt-12 text-center">
                <button onclick="finishStudentJourney()" class="bg-amber-500 hover:bg-amber-600 text-white font-black py-3 px-6 md:py-4 md:px-10 rounded-2xl shadow-xl transition-transform hover:-translate-y-1 flex items-center gap-3 mx-auto text-lg">
                    <i class="fas fa-paper-plane text-2xl"></i> Request Staff Validation
                </button>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

window.markLessonCompleteStaff = () => {
    alert("Class marked as completed! In a real scenario, this would notify the students.");
    showView('dashboard');
};

// ==========================================
// 2. STUDENT MODULE: LINEAR LEARNING JOURNEY
// ==========================================

window.nextStudentStage = () => {
    window.currentLessonStage++;
    renderStudentJourney(document.getElementById('mainContent'));
};

window.finishStudentJourney = () => {
    const mainContent = document.getElementById('mainContent');
    
    if (window.isStaffModeOn) {
        window.LocalDB.approveLesson(window.viewingStudentUsername, window.currentLessonLevel, window.currentLessonDay);
        mainContent.innerHTML = `
            <div class="min-h-[70vh] flex flex-col items-center justify-center animate-fade-in text-center p-6">
                <div class="w-32 h-32 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-6xl mb-8 shadow-xl border-4 border-white">
                    <i class="fas fa-check"></i>
                </div>
                <h1 class="text-5xl font-black text-slate-800 mb-4">Lesson Complete!</h1>
                <p class="text-xl text-slate-500 font-medium mb-8">Lesson has been instantly marked as completed (Staff Override).</p>
                <div class="flex gap-4 flex-wrap justify-center">
                    <button onclick="showView('dashboard')" class="bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        Back to Dashboard <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        if (typeof confetti === 'function') {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
    } else {
        const currentUser = JSON.parse(sessionStorage.getItem('alphafly_currentUser'));
        window.LocalDB.requestLessonValidation(currentUser.username, window.currentLessonLevel, window.currentLessonDay);
        
        mainContent.innerHTML = `
            <div class="min-h-[70vh] flex flex-col items-center justify-center animate-fade-in text-center p-6">
                <div class="w-32 h-32 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center text-6xl mb-8 shadow-xl border-4 border-white">
                    <i class="fas fa-clock"></i>
                </div>
                <h1 class="text-5xl font-black text-slate-800 mb-4">Validation Requested!</h1>
                <p class="text-xl text-slate-500 font-medium mb-8">Your class has been submitted. You will earn your XP and Coins once a staff member validates it.</p>
                <div class="flex gap-4 flex-wrap justify-center">
                    <button onclick="showView('dashboard')" class="bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        Back to Dashboard <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }
};

function renderStudentJourney(container) {
    const stageName = STUDENT_STAGES[window.currentLessonStage];
    const lesson = window.currentLessonData.studentJourney;
    
    if (stageName === 'completed') {
        window.finishStudentJourney();
        return;
    }

    if (!lesson[stageName] && stageName !== 'homework') {
        window.nextStudentStage();
        return;
    }

    const data = lesson[stageName];
    let contentHtml = '';
    let stageTitle = '';
    let stageIcon = '';
    let stageGradient = '';
    let stageBadgeClass = '';

    switch(stageName) {
        case 'theory':
            stageTitle = 'Theory'; stageIcon = 'book-open'; stageGradient = 'from-pink-500 to-rose-400';
            stageBadgeClass = 'text-pink-600 border-pink-200 bg-pink-50';
            contentHtml = `
                <div class="bg-white rounded-[2rem] border-2 border-pink-300 p-6 sm:p-8 shadow-sm mb-6">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                            <i class="fas fa-paragraph text-pink-500 text-sm"></i>
                        </div>
                        <h3 class="text-xl sm:text-2xl font-bold text-slate-800">📝 ${window.currentLessonData?.title || 'Theory'}</h3>
                    </div>
                    
                    <div class="bg-pink-50 text-pink-900 rounded-xl p-5 text-sm sm:text-base font-medium leading-relaxed mb-6">
                        ${data.english.map((en, i) => `
                            <p class="mb-1">${en}</p>
                            <p class="mb-4 opacity-80">(${data.tamil[i]})</p>
                        `).join('')}
                    </div>

                    <div class="bg-slate-900 text-white text-center py-3 rounded-xl font-bold text-sm tracking-wide mb-4">
                        Examples
                    </div>

                    <div class="space-y-3">
                        ${data.examples.map(ex => `
                            <div class="bg-white rounded-2xl p-4 sm:p-5 flex gap-4 items-center shadow-sm border border-slate-100">
                                <i class="fas fa-check text-emerald-500 text-lg"></i>
                                <div class="text-slate-800 text-lg font-medium">${ex.en}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${data.keyPoints && data.keyPoints.length > 0 ? `
                        <div class="mt-6 pt-6">
                            <div class="bg-slate-900 text-white text-center py-3 rounded-xl font-bold text-sm tracking-wide mb-4">
                                Key Points
                            </div>
                            <div class="space-y-2">
                                ${data.keyPoints.map(kp => `
                                    <div class="bg-amber-50/50 rounded-xl p-3 sm:p-4 flex gap-3 items-start text-slate-700 text-sm sm:text-base font-medium">
                                        <i class="fas fa-star text-amber-500 mt-1"></i>
                                        <p>${kp}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                ${data.grammar ? `
                <div class="bg-white rounded-[2rem] border-2 border-pink-300 p-6 sm:p-8 shadow-sm">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                            <i class="fas fa-paragraph text-pink-500 text-sm"></i>
                        </div>
                        <h3 class="text-xl sm:text-2xl font-bold text-slate-800">📝 Grammar: ${data.grammar.title}</h3>
                    </div>
                    
                    <div class="bg-pink-50 text-pink-900 rounded-xl p-5 text-sm sm:text-base font-medium leading-relaxed mb-6">
                        <p class="mb-1">${data.grammar.explanationEn}</p>
                        <p class="opacity-80">(${data.grammar.explanationTa})</p>
                    </div>

                    <div class="bg-slate-900 text-white text-center py-3 rounded-xl font-bold text-sm tracking-wide mb-4">
                        Examples
                    </div>

                    <div class="space-y-2">
                        ${data.grammar.examples.map(ex => `
                            <div class="bg-emerald-50 rounded-xl p-3 sm:p-4 flex gap-3 items-start text-slate-700 text-sm sm:text-base font-medium border border-emerald-100/50">
                                <i class="fas fa-check text-emerald-500 mt-1"></i>
                                <p>${ex.en} <span class="opacity-70 ml-1">(${ex.ta})</span></p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            `;
            break;

        case 'vocabulary':
            stageTitle = 'Vocabulary'; stageIcon = 'images'; stageGradient = 'from-amber-400 to-orange-500';
            stageBadgeClass = 'text-amber-600 border-amber-200 bg-amber-50';
            contentHtml = `
                <div class="bg-white rounded-[2rem] border-2 border-amber-300 p-6 sm:p-8 shadow-sm">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                            <i class="fas fa-images text-amber-500 text-sm"></i>
                        </div>
                        <h3 class="text-xl sm:text-2xl font-bold text-slate-800">Vocabulary</h3>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                        ${data.map(v => `
                            <div class="bg-amber-50/50 border border-amber-100 rounded-xl p-5 flex flex-col gap-2 relative group hover:bg-amber-50 transition-colors">
                                <div class="flex justify-between items-start">
                                    <h4 class="text-2xl font-black text-slate-800">${v.word}</h4>
                                    <button onclick="
                                        if('speechSynthesis' in window) { 
                                            window.speechSynthesis.cancel();
                                            let msg = new SpeechSynthesisUtterance('${v.word.replace(/'/g, "\\'")}'); 
                                            msg.rate=0.8; 
                                            window.speechSynthesis.speak(msg); 
                                        }
                                    " class="bg-white rounded-full w-8 h-8 flex items-center justify-center border border-amber-200 text-amber-500 hover:bg-amber-200 hover:text-amber-700 transition-colors shadow-sm shrink-0">
                                        <i class="fas fa-volume-up text-xs"></i>
                                    </button>
                                </div>
                                <div class="text-sm font-medium text-slate-600">${v.meaning}</div>
                                <div class="text-sm font-bold text-amber-700">${v.tamil} <span class="text-slate-400 font-mono text-xs ml-1 font-medium">/ ${v.pronunciation} /</span></div>
                                <div class="mt-2 text-sm text-slate-600 italic bg-white p-3 rounded-lg border border-slate-100 flex items-start gap-2">
                                    <i class="fas fa-quote-left text-amber-200 mt-0.5"></i>
                                    <span>${v.example}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;

        case 'speaking':
            stageTitle = 'Speaking Practice'; stageIcon = 'microphone'; stageGradient = 'from-emerald-400 to-teal-500';
            stageBadgeClass = 'text-emerald-600 border-emerald-200 bg-emerald-50';
            contentHtml = `
                <div class="bg-white rounded-[2rem] border-2 border-emerald-300 p-6 sm:p-8 shadow-sm">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <i class="fas fa-microphone text-emerald-500 text-sm"></i>
                        </div>
                        <h3 class="text-xl sm:text-2xl font-bold text-slate-800">Speaking Practice</h3>
                    </div>
                    
                    <div class="bg-slate-900 text-white text-center py-2 px-4 rounded-xl font-bold text-sm tracking-wide mb-6 inline-block">
                        Read Aloud
                    </div>

                    <div class="bg-emerald-50/50 border border-emerald-100 rounded-xl p-8 mb-8 text-center max-w-2xl mx-auto">
                        ${data.story.map(line => `<p class="text-2xl font-bold text-slate-800 mb-5 leading-tight">${line}</p>`).join('')}
                    </div>
                    
                    <div class="flex flex-col sm:flex-row justify-center gap-4">
                        <button onclick="window.startSpeakingRecording(this)" id="start-recording-btn" data-state="idle" class="bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl border border-emerald-600 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 text-lg shadow-sm">
                            <i class="fas fa-microphone"></i> Start Recording
                        </button>
                        <button onclick="
                            if('speechSynthesis' in window) {
                                window.speechSynthesis.cancel();
                                let msg = new SpeechSynthesisUtterance('${data.story.join(' ').replace(/'/g, "\\'")}');
                                msg.rate = 0.9;
                                window.speechSynthesis.speak(msg);
                            } else {
                                alert('Replaying audio...');
                            }
                        " class="bg-white hover:bg-slate-50 text-slate-600 border border-slate-300 font-bold py-3 px-8 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-3 text-lg">
                            <i class="fas fa-volume-up"></i> Listen to Original
                        </button>
                        <button onclick="window.playSpeakingRecording()" class="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 font-bold py-3 px-8 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-3 text-lg">
                            <i class="fas fa-play"></i> Check Recording
                        </button>
                    </div>
                </div>
            `;
            break;

        case 'listening':
            stageTitle = 'Listening Practice'; stageIcon = 'headphones'; stageGradient = 'from-blue-500 to-indigo-500';
            stageBadgeClass = 'text-blue-600 border-blue-200 bg-blue-50';
            contentHtml = `
                <div class="bg-white rounded-[2rem] border-2 border-blue-300 p-6 sm:p-8 shadow-sm">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <i class="fas fa-headphones-alt text-blue-500 text-sm"></i>
                        </div>
                        <h3 class="text-xl sm:text-2xl font-bold text-slate-800">Listening Practice</h3>
                    </div>

                    <div class="bg-blue-50/50 border border-blue-100 rounded-xl p-8 mb-8 text-center">
                        <button onclick="
                            if('speechSynthesis' in window) {
                                window.speechSynthesis.cancel();
                                let msg = new SpeechSynthesisUtterance('${(data.audioText || '').replace(/'/g, "\\'")}');
                                msg.rate = 0.85;
                                window.speechSynthesis.speak(msg);
                            } else {
                                alert('Text to speech not supported in your browser.');
                            }
                        " class="bg-white hover:bg-blue-50 border border-blue-200 text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-3 mx-auto transition-colors shadow-sm text-lg">
                            <i class="fas fa-play-circle text-blue-500 text-2xl"></i> Play Audio Track
                        </button>
                    </div>
                    
                    <div class="bg-slate-900 text-white text-center py-2 px-4 rounded-xl font-bold text-sm tracking-wide mb-6 inline-block">
                        Answer the Questions
                    </div>

                    <div class="space-y-4">
                        ${data.questions.map((q, i) => `
                            <div class="bg-white p-5 rounded-xl border border-slate-200">
                                <p class="font-bold text-lg text-slate-700 mb-4"><span class="text-blue-500 mr-2">${i+1}.</span> ${q.q}</p>
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    ${q.options.map(opt => `
                                        <button onclick="this.classList.add('bg-blue-50', 'border-blue-400', 'text-blue-700'); alert(this.innerText.trim() === '${q.answer.replace(/'/g, "\\'")}'.trim() ? 'Correct!' : 'Wrong! The correct answer is: ${q.answer.replace(/'/g, "\\'")}');" class="py-2.5 px-4 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-lg font-bold text-slate-600 transition-colors text-center text-sm">
                                            ${opt}
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;

        case 'readingWriting':
            stageTitle = 'Reading & Writing'; stageIcon = 'edit-3'; stageGradient = 'from-pink-500 to-rose-500';
            stageBadgeClass = 'text-pink-600 border-pink-200 bg-pink-50';
            contentHtml = `
                <div class="bg-white rounded-[2rem] border-2 border-pink-300 p-6 sm:p-8 shadow-sm">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                            <i class="fas fa-comments text-pink-500 text-sm"></i>
                        </div>
                        <h3 class="text-xl sm:text-2xl font-bold text-slate-800">Conversation</h3>
                    </div>

                    <div class="space-y-4 mb-8 bg-white border border-slate-200 p-6 rounded-xl">
                        ${data.conversation.map((c, i) => `
                            <div class="flex flex-col ${i % 2 === 0 ? 'items-start' : 'items-end'}">
                                <span class="text-[10px] font-bold text-slate-400 mb-1 ml-2 mr-2 uppercase tracking-wider">${c.speaker}</span>
                                <div class="${i % 2 === 0 ? 'bg-slate-100 text-slate-800' : 'bg-pink-500 text-white'} px-5 py-3 rounded-2xl max-w-[90%] md:max-w-[85%] text-base font-medium shadow-sm inline-block">
                                    ${c.text}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="bg-slate-900 text-white text-center py-2 px-4 rounded-xl font-bold text-sm tracking-wide mb-6 inline-block">
                        Comprehension
                    </div>

                    <div class="space-y-3 mb-8">
                        ${data.questions.map((q, i) => `
                            <div class="bg-white p-5 rounded-xl border border-slate-200 flex flex-col gap-3">
                                <p class="font-bold text-base text-slate-700"><span class="text-pink-500 mr-2">${i+1}.</span> ${q.q}</p>
                                <div class="flex flex-col sm:flex-row gap-2 w-full">
                                    <input type="text" id="rw_q_${i}" class="flex-grow px-3 py-2 rounded-lg border border-slate-200 focus:border-pink-400 outline-none text-slate-700 text-sm" placeholder="Type your answer...">
                                    <div class="flex gap-2">
                                        <button onclick="
                                            let val = document.getElementById('rw_q_${i}').value.toLowerCase().trim();
                                            let ans = '${q.answer.replace(/'/g, "\\'")}'.toLowerCase().trim();
                                            if(val === ans) {
                                                alert('Correct! 🎉');
                                            } else {
                                                alert('Incorrect. The correct answer is: ${q.answer.replace(/'/g, "\\'")}');
                                            }
                                        " class="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold rounded-lg shadow-sm transition-colors whitespace-nowrap">
                                            Check
                                        </button>
                                        <button onclick="
                                            document.getElementById('rw_q_${i}').value = '${q.answer.replace(/'/g, "\\'")}';
                                        " class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold rounded-lg border border-slate-200 transition-colors whitespace-nowrap">
                                            Show Answer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="bg-slate-900 text-white text-center py-2 px-4 rounded-xl font-bold text-sm tracking-wide mb-6 inline-block">
                        Writing Task
                    </div>

                    <div class="bg-pink-50/50 p-6 rounded-xl border border-pink-100">
                        <p class="text-base font-bold text-pink-700 mb-4">${data.writingTask}</p>
                        <textarea class="w-full h-24 bg-white border border-slate-200 rounded-lg p-3 text-slate-800 focus:border-pink-400 focus:outline-none resize-none text-sm" placeholder="Type your answer here..."></textarea>
                        <button onclick="alert('Submitted successfully!');" class="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg transition-colors shadow-sm text-sm">Submit Task</button>
                    </div>
                </div>
            `;
            break;

        case 'activities':
            stageTitle = 'Interactive Games'; stageIcon = 'gamepad'; stageGradient = 'from-violet-500 to-purple-500';
            stageBadgeClass = 'text-violet-600 border-violet-200 bg-violet-50';
            contentHtml = `
                <div class="bg-white rounded-[2rem] border-2 border-violet-300 p-6 sm:p-8 shadow-sm">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                            <i class="fas fa-gamepad text-violet-500 text-sm"></i>
                        </div>
                        <h3 class="text-xl sm:text-2xl font-bold text-slate-800">Interactive Activities</h3>
                    </div>

                    <div class="bg-violet-50/50 border border-violet-100 rounded-xl p-8 mb-8 text-center max-w-2xl mx-auto">
                        <h2 class="text-3xl font-black text-slate-800 mb-2">Let's Play!</h2>
                        <p class="text-slate-500 text-sm">Complete the activities below to finish the lesson.</p>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                        ${data.map((act, i) => `
                            <div class="bg-white border border-slate-200 rounded-xl p-6 hover:border-violet-300 transition-colors shadow-sm" id="game_card_${i}">
                                <div class="flex items-start gap-4 h-full">
                                    <div class="w-12 h-12 bg-violet-50 rounded-lg flex items-center justify-center shrink-0 border border-violet-100">
                                        <i class="fas ${i === 0 ? 'fa-puzzle-piece' : 'fa-trophy'} text-xl text-violet-500"></i>
                                    </div>
                                    <div class="flex-grow flex flex-col justify-between h-full">
                                        <div>
                                            <h3 class="text-lg font-bold text-slate-800 mb-1">${act.type}</h3>
                                            <p class="text-slate-500 text-sm mb-3">${act.instruction}</p>
                                        </div>
                                        <button onclick="window.playMiniGame('${act.type}', document.getElementById('game_card_${i}'), ${i})" class="px-4 py-2 w-max bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold rounded border border-violet-600 transition-colors">Play Now</button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;

        case 'homework':
            stageTitle = 'Daily Homework'; stageIcon = 'house-chimney'; stageGradient = 'from-orange-500 to-amber-500';
            stageBadgeClass = 'text-orange-600 border-orange-200 bg-orange-50';
            const hwTopic = window.currentLessonData?.topic || window.currentLessonData?.title || 'today\'s lesson';
            const hwDay = window.currentLessonDay || 1;
            
            // Generate homework tasks relevant to the day's topic
            const homeworkTasks = (data && data.tasks) ? data.tasks : [
                {
                    icon: 'fa-pen-fancy',
                    title: 'Write 5 Sentences',
                    titleTa: '5 வாக்கியங்கள் எழுதுங்கள்',
                    description: `Write 5 sentences about "${hwTopic}" in your notebook using the words and phrases you learned today.`,
                    descriptionTa: `"${hwTopic}" பற்றி இன்று நீங்கள் கற்ற வார்த்தைகள் மற்றும் சொற்றொடர்களைப் பயன்படுத்தி உங்கள் நோட்புக்கில் 5 வாக்கியங்கள் எழுதுங்கள்.`,
                    time: '10 mins',
                    color: 'rose'
                },
                {
                    icon: 'fa-microphone-lines',
                    title: 'Speak & Practice',
                    titleTa: 'பேசி பயிற்சி செய்யுங்கள்',
                    description: `Practice speaking about "${hwTopic}" loudly at home for 10 minutes. Record yourself and listen back. Try to speak without reading.`,
                    descriptionTa: `"${hwTopic}" பற்றி வீட்டில் 10 நிமிடங்கள் சத்தமாக பேசி பயிற்சி செய்யுங்கள். உங்களையே பதிவு செய்து மீண்டும் கேளுங்கள். படிக்காமல் பேச முயற்சியுங்கள்.`,
                    time: '10 mins',
                    color: 'emerald'
                },
                {
                    icon: 'fa-people-arrows',
                    title: 'Teach Someone',
                    titleTa: 'யாரேனும் ஒருவருக்கு கற்றுக் கொடுங்கள்',
                    description: `Teach what you learned about "${hwTopic}" to a family member or friend. Explain in simple English and Tamil.`,
                    descriptionTa: `"${hwTopic}" பற்றி நீங்கள் கற்றதை ஒரு குடும்பத்தினர் அல்லது நண்பருக்கு கற்றுக் கொடுங்கள். எளிய ஆங்கிலம் மற்றும் தமிழில் விளக்குங்கள்.`,
                    time: '10 mins',
                    color: 'blue'
                }
            ];

            contentHtml = `
                <div class="bg-white rounded-[2rem] border-2 border-orange-300 p-6 sm:p-8 shadow-sm">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                            <i class="fas fa-house-chimney text-orange-500 text-sm"></i>
                        </div>
                        <h3 class="text-xl sm:text-2xl font-bold text-slate-800">📝 Daily Homework</h3>
                    </div>
                    
                    <!-- Timer Banner -->
                    <div class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-5 mb-6 text-white relative overflow-hidden">
                        <div class="absolute -right-4 -top-4 opacity-10">
                            <i class="fas fa-clock text-[120px]"></i>
                        </div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-2">
                                <i class="fas fa-hourglass-half text-2xl"></i>
                                <h4 class="text-xl font-bold">Minimum 30 Minutes</h4>
                            </div>
                            <p class="text-orange-100 text-sm font-medium">குறைந்தபட்சம் 30 நிமிடங்கள் வீட்டில் பயிற்சி செய்ய வேண்டும்.</p>
                            <p class="text-orange-100 text-sm font-medium mt-1">Complete all 3 tasks below at home today. (இன்று வீட்டில் கீழே உள்ள 3 பணிகளையும் முடிக்கவும்.)</p>
                        </div>
                    </div>

                    <div class="bg-orange-50/50 border border-orange-100 rounded-xl p-5 mb-6">
                        <p class="text-slate-700 font-bold text-lg mb-1">📚 Today's Topic: ${hwTopic}</p>
                        <p class="text-slate-500 text-sm font-medium">இன்றைய தலைப்பு: ${hwTopic}</p>
                    </div>

                    <!-- Homework Tasks -->
                    <div class="space-y-4">
                        ${homeworkTasks.map((task, i) => `
                            <div class="bg-white border-2 border-${task.color}-200 rounded-2xl p-5 sm:p-6 relative overflow-hidden hover:shadow-md transition-shadow" id="hw_task_${i}">
                                <div class="flex items-start gap-4">
                                    <div class="w-14 h-14 bg-${task.color}-100 rounded-2xl flex items-center justify-center shrink-0 border border-${task.color}-200">
                                        <i class="fas ${task.icon} text-2xl text-${task.color}-500"></i>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3 mb-2 flex-wrap">
                                            <h4 class="text-lg font-bold text-slate-800">Task ${i+1}: ${task.title}</h4>
                                            <span class="bg-${task.color}-100 text-${task.color}-700 text-xs font-bold px-3 py-1 rounded-full border border-${task.color}-200">
                                                <i class="fas fa-clock mr-1"></i>${task.time}
                                            </span>
                                        </div>
                                        <p class="text-xs text-slate-500 font-medium mb-2 italic">(${task.titleTa})</p>
                                        <p class="text-slate-700 text-sm font-medium leading-relaxed mb-1">${task.description}</p>
                                        <p class="text-slate-500 text-xs font-medium leading-relaxed italic">(${task.descriptionTa})</p>
                                        
                                        <div class="mt-4 flex items-center gap-3">
                                            <button onclick="
                                                const card = document.getElementById('hw_task_${i}');
                                                const btn = this;
                                                if(btn.dataset.done === 'true') return;
                                                btn.dataset.done = 'true';
                                                btn.innerHTML = '<i class=\\'fas fa-check-circle\\'></i> Completed!';
                                                btn.classList.remove('bg-${task.color}-500', 'hover:bg-${task.color}-600');
                                                btn.classList.add('bg-green-500');
                                                card.classList.add('opacity-70');
                                                card.style.borderColor = '#10b981';
                                                window.checkAllHomeworkDone();
                                            " class="bg-${task.color}-500 hover:bg-${task.color}-600 text-white font-bold py-2 px-5 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-sm">
                                                <i class="fas fa-check"></i> Mark as Done
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Completion Banner (hidden initially) -->
                    <div id="hw-completion-banner" class="hidden mt-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white text-center">
                        <i class="fas fa-trophy text-5xl mb-3"></i>
                        <h3 class="text-2xl font-bold mb-1">🎉 Homework Completed!</h3>
                        <p class="text-green-100 text-sm font-medium">வீட்டுப்பாடம் முடிந்தது! நன்றாக செய்தீர்கள்!</p>
                        <p class="text-green-100 text-sm font-medium mt-1">Great job! You've finished all your homework for Day ${hwDay}.</p>
                    </div>

                    <!-- Parent Reminder -->
                    <div class="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                        <i class="fas fa-info-circle text-amber-500 mt-0.5"></i>
                        <div>
                            <p class="text-amber-800 text-sm font-bold">📱 Parent Reminder / பெற்றோர் நினைவூட்டல்</p>
                            <p class="text-amber-700 text-xs font-medium mt-1">Please ensure your child spends at least 30 minutes on these homework tasks daily.</p>
                            <p class="text-amber-700 text-xs font-medium mt-0.5">தயவுசெய்து உங்கள் குழந்தை தினமும் இந்த வீட்டுப்பாடத்தில் குறைந்தது 30 நிமிடங்கள் செலவிடுவதை உறுதிசெய்யவும்.</p>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'quiz':
            stageTitle = 'Daily Quiz'; stageIcon = 'clipboard-check'; stageGradient = 'from-fuchsia-500 to-pink-600';
            stageBadgeClass = 'text-fuchsia-600 border-fuchsia-200 bg-fuchsia-50';
            contentHtml = `
                <div class="relative bg-white/80 text-slate-800 backdrop-blur-3xl rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white overflow-hidden">
                    <div class="relative z-10">
                        <div class="text-center mb-12">
                            <i class="fas fa-award text-7xl text-fuchsia-500 mb-6 drop-shadow-lg"></i>
                            <h2 class="text-3xl sm:text-5xl font-black text-slate-800">10-Question Daily Quiz</h2>
                        </div>
                        
                        <div class="space-y-8 max-w-3xl mx-auto">
                            ${data.map((q, i) => `
                                <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-md">
                                    <div class="flex gap-5 mb-8 items-start">
                                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br ${stageGradient} text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg">${i+1}</div>
                                        <p class="font-black text-2xl text-slate-800 pt-1 leading-snug">${q.q}</p>
                                    </div>
                                    <div class="grid md:grid-cols-2 gap-5">
                                        ${q.options.map(opt => `
                                            <label class="flex items-center gap-4 p-5 bg-slate-50 hover:bg-fuchsia-50 border border-slate-200 rounded-2xl cursor-pointer transition-colors shadow-sm" onclick="this.parentElement.querySelectorAll('label').forEach(l=>l.classList.remove('bg-fuchsia-100', 'border-fuchsia-400', 'ring-2', 'ring-fuchsia-200')); this.classList.add('bg-fuchsia-100', 'border-fuchsia-400', 'ring-2', 'ring-fuchsia-200')">
                                                <input type="radio" name="quiz_q${i}" class="hidden">
                                                <span class="font-bold text-lg text-slate-700">${opt}</span>
                                            </label>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="text-center mt-16">
                            <button onclick="alert('Quiz Submitted! Score: 10/10. Great job!')" class="bg-gradient-to-r ${stageGradient} text-white font-black py-5 px-16 rounded-full shadow-[0_15px_40px_rgba(217,70,239,0.3)] hover:scale-105 transition-transform text-2xl border-4 border-white">
                                Submit Quiz
                            </button>
                        </div>
                    </div>
                </div>
            `;
            break;
    }

    const progressPct = ((window.currentLessonStage) / (STUDENT_STAGES.length - 1)) * 100;

    container.innerHTML = `
        <div class="fixed inset-0 bg-white -z-10"></div>
        <div class="max-w-4xl mx-auto pb-40 pt-4 animate-fade-in relative min-h-[80vh] flex flex-col z-0">
            <!-- Progress Header -->
            <div class="mb-10 px-4">
                <div class="flex justify-between items-end mb-4">
                    <button onclick="showView('dashboard')" class="group flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full text-slate-500 hover:text-slate-800 font-bold text-sm transition-all border border-slate-200">
                        <i class="fas fa-times group-hover:rotate-90 transition-transform"></i> Quit Lesson
                    </button>
                    <div class="flex items-center gap-3">
                        <span class="text-xs font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border ${stageBadgeClass}">${stageTitle}</span>
                    </div>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                    <div class="bg-gradient-to-r ${stageGradient} h-full rounded-full transition-all duration-700 ease-out" style="width: ${((window.currentLessonStage + 1) / STUDENT_STAGES.length) * 100}%"></div>
                </div>
            </div>

            <!-- Content -->
            <div class="flex-1 px-4">
                ${contentHtml}
            </div>

            <!-- Footer Navigation -->
            <div class="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-200 z-50 sm:left-80">
                <div class="max-w-4xl mx-auto flex justify-between items-center px-4">
                    <div class="hidden sm:flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center font-black text-slate-600 bg-slate-50">
                            ${window.currentLessonStage + 1}
                        </div>
                        <span class="text-slate-400 font-bold uppercase tracking-widest text-xs">of ${STUDENT_STAGES.length} Stages</span>
                    </div>
                    <button onclick="${window.currentLessonStage === STUDENT_STAGES.length - 1 ? 'finishStudentJourney()' : 'nextStudentStage()'}" class="w-full sm:w-auto bg-${stageGradient.split(' ')[0].replace('from-', '')} text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 flex justify-center items-center gap-3 text-lg group/btn shadow-sm">
                        ${window.currentLessonStage === STUDENT_STAGES.length - 1 
                            ? 'Complete Lesson <i class="fas fa-check-circle group-hover/btn:scale-110 transition-transform"></i>' 
                            : 'Continue <i class="fas fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>'}
                    </button>
                </div>
            </div>
        </div>
    `;

    if (window.lucide) window.lucide.createIcons();
}

// ==========================================
// 3. ACTIVITY ENGINE
// ==========================================

window.startActivity = () => {
    const intro = document.getElementById('activity-intro');
    const game = document.getElementById('activity-game');
    const activityData = window.currentLessonData.studentJourney.activity;
    
    if(!intro || !game || !activityData) return;
    
    intro.classList.add('hidden');
    game.classList.remove('hidden');
    
    if (activityData.type === 'sentenceBuilder') {
        renderSentenceBuilder(activityData.data, game);
    } else if (activityData.type === 'matchWords') {
        renderMatchWords(activityData.data, game);
    } else if (activityData.type === 'wordScramble') {
        renderWordScramble(activityData.data, game);
    } else if (activityData.type === 'fillInTheBlanks') {
        renderFillInTheBlanks(activityData.data, game);
    } else {
        game.innerHTML = `<p class="text-white">Activity type not supported yet.</p>`;
    }
};

function renderSentenceBuilder(data, container) {
    window.sb_selectedWords = [];
    window.sb_availableWords = [...data.words];
    window.sb_targetSentence = data.sentence;
    
    window.sb_updateUI = () => {
        const dropZoneHtml = window.sb_selectedWords.length === 0 
            ? `<div class="text-slate-500 font-bold text-xl italic py-4">Tap words below to build the sentence</div>`
            : window.sb_selectedWords.map((word, i) => `
                <button onclick="sb_removeWord(${i})" class="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all hover:shadow-pink-500/50">
                    ${word} <i class="fas fa-times ml-2 text-pink-200 text-sm"></i>
                </button>
            `).join('');
            
        const availableHtml = window.sb_availableWords.map((word, i) => `
            <button onclick="sb_addWord(${i})" class="bg-violet-100 hover:bg-violet-200 border border-violet-200 text-violet-700 font-bold py-2 px-4 rounded-lg shadow-sm transform hover:-translate-y-1 transition-all">
                ${word}
            </button>
        `).join('');
        
        container.innerHTML = `
            <h3 class="text-2xl font-black text-slate-800 mb-6 drop-shadow-sm">Build the Sentence</h3>
            
            <div class="bg-violet-50 border-2 border-dashed border-violet-300 rounded-2xl p-6 mb-8 min-h-[100px] flex flex-wrap gap-3 items-center justify-center relative z-20">
                ${dropZoneHtml}
            </div>
            
            <div class="flex flex-wrap gap-3 justify-center mb-8 relative z-20">
                ${availableHtml}
            </div>
            
            <div class="text-center relative z-20">
                <button onclick="sb_checkAnswer()" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all text-sm disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed" ${window.sb_availableWords.length > 0 ? 'disabled' : ''}>
                    Check Answer
                </button>
            </div>
        `;
    };
    
    window.sb_addWord = (index) => {
        window.sb_selectedWords.push(window.sb_availableWords[index]);
        window.sb_availableWords.splice(index, 1);
        window.sb_updateUI();
    };
    
    window.sb_removeWord = (index) => {
        window.sb_availableWords.push(window.sb_selectedWords[index]);
        window.sb_selectedWords.splice(index, 1);
        window.sb_updateUI();
    };
    
    window.sb_checkAnswer = () => {
        const userSentence = window.sb_selectedWords.join(' ');
        if (userSentence === window.sb_targetSentence) {
            container.innerHTML = `
                <div class="animate-bounce mb-4 relative z-20">
                    <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-3xl text-white mx-auto shadow-lg border-4 border-emerald-400">
                        <i class="fas fa-trophy text-yellow-100"></i>
                    </div>
                </div>
                <h3 class="text-2xl font-black text-slate-800 mb-2 relative z-20">Awesome!</h3>
                <p class="text-sm text-emerald-600 font-bold bg-emerald-100 px-4 py-1.5 rounded-full inline-block relative z-20">+50 Points</p>
            `;
            if (typeof confetti === 'function') confetti();
        } else {
            alert("Not quite right! Try again.");
            window.sb_availableWords = [...data.words];
            window.sb_selectedWords = [];
            window.sb_updateUI();
        }
    };
    
    window.sb_updateUI();
}

function renderMatchWords(data, container) {
    window.mw_currentIndex = 0;
    window.mw_data = [...data];
    window.mw_types = [...new Set(data.map(d => d.type))];
    
    window.mw_updateUI = () => {
        if (window.mw_currentIndex >= window.mw_data.length) {
            container.innerHTML = `
                <div class="animate-bounce mb-4 relative z-20 mt-4">
                    <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-3xl text-white mx-auto shadow-lg border-4 border-emerald-400">
                        <i class="fas fa-trophy text-yellow-100"></i>
                    </div>
                </div>
                <h3 class="text-2xl font-black text-slate-800 mb-2 relative z-20 text-center">Perfect!</h3>
                <div class="text-center">
                    <p class="text-sm text-emerald-600 font-bold bg-emerald-100 px-4 py-1.5 rounded-full inline-block relative z-20 mb-4">+50 Points</p>
                </div>
            `;
            if (typeof confetti === 'function') confetti();
            return;
        }
        
        const currentItem = window.mw_data[window.mw_currentIndex];
        
        const typesHtml = window.mw_types.map(t => `
            <button onclick="mw_checkAnswer('${t}')" class="bg-violet-100 hover:bg-violet-200 border border-violet-200 text-violet-700 font-bold py-4 px-8 rounded-xl shadow-sm transform hover:-translate-y-1 transition-all text-lg">
                ${t}
            </button>
        `).join('');
        
        container.innerHTML = `
            <div class="text-sm font-bold text-pink-300 tracking-widest uppercase mb-4 relative z-20">Word ${window.mw_currentIndex + 1} of ${window.mw_data.length}</div>
            <h3 class="text-2xl font-medium text-slate-700 mb-8 relative z-20">What type of word is this?</h3>
            
            <div class="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-10 mb-12 inline-block shadow-[0_15px_30px_rgba(236,72,153,0.4)] border border-pink-400 relative z-20 transform transition-transform hover:scale-105">
                <span class="text-5xl font-black text-white drop-shadow-md">${currentItem.en}</span>
            </div>
            
            <div class="flex flex-wrap gap-4 justify-center relative z-20">
                ${typesHtml}
            </div>
        `;
    };
    
    window.mw_checkAnswer = (selectedType) => {
        const correctType = window.mw_data[window.mw_currentIndex].type;
        if (selectedType === correctType) {
            window.mw_currentIndex++;
            window.mw_updateUI();
        } else {
            alert(`Oops! "${window.mw_data[window.mw_currentIndex].en}" is a ${correctType}. Try again!`);
        }
    };
    
    window.mw_updateUI();
}

window.playMiniGame = (title, element, index) => {
    element.onclick = null;
    const actData = window.currentLessonData.studentJourney.activities[index].data;
    
    element.innerHTML = `
        <div class="w-full h-full animate-fade-in flex flex-col justify-center relative" id="game_container_${index}">
        </div>
    `;
    const container = document.getElementById(`game_container_${index}`);
    
    if (title === "Sentence Maker" && actData) {
        renderSentenceBuilder(actData, container);
    } else if (title === "Match the Word" && actData) {
        renderMatchWords(actData, container);
    } else if (title === "Word Scramble" && actData) {
        renderWordScramble(actData, container);
    } else if (title === "Fill in the Blanks" && actData) {
        renderFillInTheBlanks(actData, container);
    } else {
        // Fallback generic star game
        element.innerHTML = `
            <div class="p-4 text-center w-full h-full flex flex-col justify-center animate-fade-in">
                <h3 class="text-xl font-bold text-violet-700 mb-2">${title}</h3>
                <p class="text-sm text-slate-600 mb-6">Tap the 3 floating stars to win!</p>
                <div class="flex justify-center gap-4 mb-2">
                    <button onclick="this.style.visibility='hidden'; window.checkWin(this.parentElement)" class="w-12 h-12 bg-yellow-400 rounded-full shadow-lg hover:scale-110 flex items-center justify-center border-2 border-yellow-200 transition-transform"><i class="fas fa-star text-white text-xl"></i></button>
                    <button onclick="this.style.visibility='hidden'; window.checkWin(this.parentElement)" class="w-12 h-12 bg-yellow-400 rounded-full shadow-lg hover:scale-110 flex items-center justify-center border-2 border-yellow-200 transition-transform -translate-y-4"><i class="fas fa-star text-white text-xl"></i></button>
                    <button onclick="this.style.visibility='hidden'; window.checkWin(this.parentElement)" class="w-12 h-12 bg-yellow-400 rounded-full shadow-lg hover:scale-110 flex items-center justify-center border-2 border-yellow-200 transition-transform"><i class="fas fa-star text-white text-xl"></i></button>
                </div>
            </div>
        `;
    }
};

window.checkWin = (container) => {
    const stars = container.querySelectorAll('button');
    let allHidden = true;
    stars.forEach(s => { if (s.style.visibility !== 'hidden') allHidden = false; });
    
    if (allHidden) {
        container.parentElement.parentElement.innerHTML = `
            <div class="text-center bg-violet-500 text-white rounded-xl p-6 h-full flex flex-col justify-center items-center animate-fade-in">
                <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-violet-400 animate-bounce">
                    <i class="fas fa-trophy text-3xl text-yellow-100"></i>
                </div>
                <h3 class="text-2xl font-black mb-1 text-white shadow-sm">You Won!</h3>
                <p class="text-violet-100 font-bold bg-violet-600 px-4 py-1.5 rounded-full text-sm mt-2 shadow-inner">+50 Points</p>
            </div>
        `;
    }
};

function renderWordScramble(data, container) {
    window.ws_word = data.word.toUpperCase();
    
    // Scramble the word uniquely
    let scrambled = window.ws_word.split('');
    let isSame = true;
    while(isSame && scrambled.length > 1) {
        for (let i = scrambled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
        }
        isSame = scrambled.join('') === window.ws_word;
    }

    window.ws_letters = scrambled;
    window.ws_selected = [];
    
    window.ws_updateUI = () => {
        if (window.ws_selected.join('') === window.ws_word) {
            container.innerHTML = `
                <div class="animate-bounce mb-4 relative z-20 mt-4">
                    <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-3xl text-white mx-auto shadow-lg border-4 border-emerald-400">
                        <i class="fas fa-trophy text-yellow-100"></i>
                    </div>
                </div>
                <h3 class="text-2xl font-black text-slate-800 mb-2 relative z-20 text-center">Perfect!</h3>
                <div class="text-center">
                    <p class="text-sm text-emerald-600 font-bold bg-emerald-100 px-4 py-1.5 rounded-full inline-block relative z-20 mb-4">+50 Points</p>
                </div>
            `;
            if (typeof confetti === 'function') confetti();
            return;
        }

        const selectedHtml = window.ws_selected.map((letter, i) => `
            <button onclick="ws_removeLetter(${i})" class="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold w-12 h-12 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all text-xl flex items-center justify-center">
                ${letter}
            </button>
        `).join('');

        const availableHtml = window.ws_letters.map((letter, i) => `
            <button onclick="ws_addLetter(${i})" class="bg-violet-100 hover:bg-violet-200 border border-violet-200 text-violet-700 font-bold w-12 h-12 rounded-xl shadow-sm transform hover:-translate-y-1 transition-all text-xl flex items-center justify-center">
                ${letter}
            </button>
        `).join('');
        
        container.innerHTML = `
            <h3 class="text-2xl font-black text-slate-800 mb-6 drop-shadow-sm text-center">Unscramble the Word!</h3>
            <div class="bg-violet-50 border-2 border-dashed border-violet-300 rounded-2xl p-6 mb-8 min-h-[100px] flex flex-wrap gap-3 items-center justify-center relative z-20">
                ${window.ws_selected.length === 0 ? '<div class="text-slate-400 font-bold italic">Tap letters below</div>' : selectedHtml}
            </div>
            <div class="flex flex-wrap gap-3 justify-center mb-8 relative z-20">
                ${availableHtml}
            </div>
        `;
    };
    
    window.ws_addLetter = (i) => {
        window.ws_selected.push(window.ws_letters[i]);
        window.ws_letters.splice(i, 1);
        window.ws_updateUI();
    };
    
    window.ws_removeLetter = (i) => {
        window.ws_letters.push(window.ws_selected[i]);
        window.ws_selected.splice(i, 1);
        window.ws_updateUI();
    };
    
    window.ws_updateUI();
}

function renderFillInTheBlanks(data, container) {
    window.fitb_data = data;
    
    window.fitb_checkAnswer = (selected) => {
        if (selected === data.answer) {
            container.innerHTML = `
                <div class="animate-bounce mb-4 relative z-20 mt-4">
                    <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-3xl text-white mx-auto shadow-lg border-4 border-emerald-400">
                        <i class="fas fa-trophy text-yellow-100"></i>
                    </div>
                </div>
                <h3 class="text-2xl font-black text-slate-800 mb-2 relative z-20 text-center">Correct!</h3>
                <div class="text-center">
                    <p class="text-sm text-emerald-600 font-bold bg-emerald-100 px-4 py-1.5 rounded-full inline-block relative z-20 mb-4">+50 Points</p>
                </div>
            `;
            if (typeof confetti === 'function') confetti();
        } else {
            alert("Not quite right! Try again.");
        }
    };
    
    const optionsHtml = data.options.map(opt => `
        <button onclick="fitb_checkAnswer('${opt.replace(/'/g, "\\'")}')" class="bg-violet-100 hover:bg-violet-200 border border-violet-200 text-violet-700 font-bold py-3 px-6 rounded-xl shadow-sm transform hover:-translate-y-1 transition-all text-lg">
            ${opt}
        </button>
    `).join('');
    
    container.innerHTML = `
        <h3 class="text-2xl font-black text-slate-800 mb-6 drop-shadow-sm text-center">Fill in the Blanks</h3>
        <div class="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 mb-10 shadow-lg text-center relative z-20 transform transition-transform hover:scale-105">
            <span class="text-3xl font-black text-white leading-relaxed">
                ${data.sentenceParts[0]}
                <span class="inline-block w-24 border-b-4 border-white mx-2 align-baseline"></span>
                ${data.sentenceParts[1] || ''}
            </span>
        </div>
        <div class="flex flex-wrap gap-4 justify-center relative z-20">
            ${optionsHtml}
        </div>
    `;
}
