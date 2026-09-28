window.currentAssessmentState = {
    id: null,
    currentIndex: 0,
    scores: {},
    answers: []
};

window.renderAssessmentIntro = (id, container) => {
    const data = window.assessmentsData.find(a => a.id === id);
    if (!data) {
        container.innerHTML = '<div class="p-10 text-red-500">Assessment data not found.</div>';
        return;
    }

    const currentUser = JSON.parse(sessionStorage.getItem('alphafly_currentUser')) || {};
    const isStaff = currentUser.role === 'staff' || currentUser.role === 'admin';
    const showStaffOnly = isStaff && window.isStaffModeOn === true;

    let progress = JSON.parse(localStorage.getItem('alphafly_progress')) || { completedLessons: [] };
    const savedScore = progress.assessmentScores && progress.assessmentScores[id];

    if (showStaffOnly) {
        if (savedScore && savedScore.scores) {
            window.currentAssessmentState = {
                id: id,
                scores: savedScore.scores,
                answers: savedScore.answers || []
            };
            window.renderAssessmentResults();
            return;
        } else {
            container.innerHTML = `
                <div class="max-w-4xl mx-auto pb-10 mt-10">
                    <div class="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                        <div class="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                            <i class="fas fa-clipboard-list"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-slate-800 mb-2">No Report Available</h2>
                        <p class="text-slate-500 mb-8">The student has not completed ${data.title} yet.</p>
                        <button onclick="showView('dashboard')" class="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all">
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            `;
            return;
        }
    }

    let html = `
        <div class="max-w-4xl mx-auto pb-10">
            <!-- Header -->
            <div class="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 text-white shadow-lg mb-8 relative overflow-hidden">
                <div class="absolute right-0 top-0 opacity-20 transform translate-x-4 -translate-y-4">
                    <i class="fas fa-award text-9xl"></i>
                </div>
                <div class="relative z-10">
                    <span class="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Weekly Evaluation</span>
                    <h1 class="text-3xl md:text-4xl font-extrabold mt-3 mb-2">${data.title}</h1>
                    <p class="text-amber-100 font-medium flex items-center gap-4">
                        <span><i class="fas fa-clock mr-1"></i> ${data.duration}</span>
                        <span><i class="fas fa-star mr-1"></i> ${data.totalMarks} Marks</span>
                        <span><i class="fas fa-check-circle mr-1"></i> Pass: ${data.passingMarks}</span>
                    </p>
                </div>
            </div>
    `;

    html += `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                    <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2"><i class="fas fa-list-ul text-indigo-500"></i> Topics Covered</h3>
                    <div class="flex flex-wrap gap-2">
                        ${data.topics.map(t => `<span class="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium border border-indigo-100">${t}</span>`).join('')}
                    </div>
                </div>
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                    <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2"><i class="fas fa-bullseye text-rose-500"></i> Learning Outcomes</h3>
                    <ul class="space-y-2">
                        ${data.learningOutcomes.map(o => `<li class="flex items-start gap-2 text-sm text-slate-600"><i class="fas fa-check text-emerald-500 mt-1"></i> ${o}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="text-center">
                <button onclick="startAssessment('${id}')" class="px-12 py-4 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-2xl text-xl shadow-xl shadow-amber-500/30 transition-all hover:-translate-y-1">
                    <i class="fas fa-play mr-2"></i> ${showStaffOnly ? 'Preview Assessment' : 'Start Assessment'}
                </button>
            </div>
        </div>
    `;

    container.innerHTML = html;
};

window.startAssessment = (id) => {
    window.currentAssessmentState = {
        id: id,
        currentIndex: 0,
        scores: {},
        answers: []
    };
    window.renderAssessmentQuestion();
};

window.renderAssessmentQuestion = () => {
    const state = window.currentAssessmentState;
    const data = window.assessmentsData.find(a => a.id === state.id);
    const container = document.getElementById('mainContent');

    if (!data.questions || data.questions.length === 0) {
        container.innerHTML = '<div class="p-10 text-red-500">No questions available for this assessment.</div>';
        return;
    }

    if (state.currentIndex >= data.questions.length) {
        window.renderAssessmentResults();
        return;
    }

    const q = data.questions[state.currentIndex];
    const progressPct = ((state.currentIndex) / data.questions.length) * 100;

    let html = `
        <div class="max-w-3xl mx-auto pb-10">
            <!-- Progress Bar -->
            <div class="mb-8">
                <div class="flex justify-between text-sm font-bold text-slate-500 mb-2">
                    <span>Question ${state.currentIndex + 1} of ${data.questions.length}</span>
                    <span>${q.category}</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2.5">
                    <div class="bg-amber-500 h-2.5 rounded-full transition-all duration-500" style="width: ${progressPct}%"></div>
                </div>
            </div>

            <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
    `;

    // Render based on type
    if (q.type === 'mcq') {
        html += `
            <h2 class="text-2xl font-bold text-slate-800 mb-6">${q.q}</h2>
            <div class="space-y-3" id="mcqOptions">
                ${q.options.map(opt => `
                    <button onclick="submitAssessmentAnswer('${opt}')" class="w-full text-left px-6 py-4 rounded-xl border-2 border-slate-100 hover:border-amber-400 hover:bg-amber-50 transition-all font-medium text-slate-700 flex items-center justify-between group">
                        <span>${opt}</span>
                        <div class="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-amber-400 flex items-center justify-center"></div>
                    </button>
                `).join('')}
            </div>
        `;
    } else if (q.type === 'fill') {
        html += `
            <h2 class="text-2xl font-bold text-slate-800 mb-6">${q.q.replace('________', '<span class="text-amber-500 border-b-2 border-amber-500 px-4">?</span>')}</h2>
            <div class="flex gap-4">
                <input type="text" id="fillInput" class="flex-1 px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none text-lg font-medium" placeholder="Type your answer here..." onkeypress="if(event.key === 'Enter') submitAssessmentAnswer(this.value)">
                <button onclick="submitAssessmentAnswer(document.getElementById('fillInput').value)" class="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all">Submit</button>
            </div>
        `;
    } else if (q.type === 'listening') {
        html += `
            <div class="text-center mb-8 bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <i class="fas fa-headphones text-4xl text-blue-500 mb-4"></i>
                <h3 class="text-xl font-bold text-blue-900 mb-2">Listen Carefully</h3>
                <p class="text-blue-700 mb-6">Play the audio clip and answer the question below.</p>
                <button onclick="playListeningAudio('${q.script.replace(/'/g, "\\'")}')" class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-md transition-all flex items-center gap-2 mx-auto">
                    <i class="fas fa-play-circle"></i> Play Audio
                </button>
            </div>
            <h2 class="text-xl font-bold text-slate-800 mb-6">${q.q}</h2>
            <div class="space-y-3">
                ${q.options.map(opt => `
                    <button onclick="submitAssessmentAnswer('${opt}')" class="w-full text-left px-6 py-4 rounded-xl border-2 border-slate-100 hover:border-amber-400 hover:bg-amber-50 transition-all font-medium text-slate-700">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        `;
    } else if (q.type === 'speaking' || q.type === 'read_aloud') {
        html += `
            <div class="text-center">
                <div class="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"><i class="fas fa-microphone"></i></div>
                <h2 class="text-2xl font-bold text-slate-800 mb-2">${q.type === 'read_aloud' ? 'Read Aloud Test' : 'Speaking Test'}</h2>
                ${q.type === 'read_aloud' ? `
                    <div class="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 mb-8 mt-4">
                        <h3 class="text-emerald-700 font-bold mb-2 flex items-center justify-center gap-2"><i class="fas fa-book-reader"></i> Read this passage aloud:</h3>
                        <p class="text-xl font-medium text-emerald-900 leading-relaxed">${q.passage}</p>
                    </div>
                ` : `
                    <p class="text-lg text-slate-600 mb-8 font-medium">${q.prompt}</p>
                `}
                
                <div id="recordingArea" class="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-6">
                    <button id="recordBtn" onclick="toggleRecording()" class="w-24 h-24 bg-rose-500 text-white rounded-full flex items-center justify-center text-3xl shadow-xl shadow-rose-500/40 hover:scale-105 transition-all mx-auto">
                        <i class="fas fa-microphone"></i>
                    </button>
                    <p id="recordStatus" class="text-slate-500 font-medium mt-4">Click to start recording</p>
                    <p id="transcriptOutput" class="text-slate-800 italic mt-4 hidden"></p>
                </div>
                
                <button id="submitSpeakingBtn" onclick="submitAssessmentAnswer(window.currentTranscript || 'dummy audio content')" class="px-8 py-3 bg-slate-300 text-slate-500 font-bold rounded-xl transition-all w-full hidden">
                    Submit Recording
                </button>
            </div>
        `;
    } else if (q.type === 'reading') {
        html += `
            <div class="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 mb-8">
                <h3 class="text-emerald-800 font-bold mb-2 flex items-center gap-2"><i class="fas fa-book-reader"></i> Read the Passage:</h3>
                <p class="text-emerald-900 leading-relaxed text-lg">${q.passage}</p>
            </div>
            <h2 class="text-xl font-bold text-slate-800 mb-6">${q.q}</h2>
            <div class="space-y-3">
                ${q.options.map(opt => `
                    <button onclick="submitAssessmentAnswer('${opt}')" class="w-full text-left px-6 py-4 rounded-xl border-2 border-slate-100 hover:border-amber-400 hover:bg-amber-50 transition-all font-medium text-slate-700">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        `;
    }

    html += `
            </div>
        </div>
    `;

    container.innerHTML = html;
};

window.playListeningAudio = (text) => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // stop previous
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85; // Slightly slower for listening tests
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Audio playback is not supported in this browser.");
    }
};

window.toggleRecording = () => {
    const btn = document.getElementById('recordBtn');
    const status = document.getElementById('recordStatus');
    const transcriptOutput = document.getElementById('transcriptOutput');
    const submitBtn = document.getElementById('submitSpeakingBtn');

    if (window.isRecording) {
        window.isRecording = false;
        btn.classList.remove('animate-pulse', 'bg-rose-600');
        btn.classList.add('bg-rose-500');
        status.innerHTML = 'Recording stopped. <a href="#" onclick="toggleRecording()" class="text-rose-500 underline">Try again</a>';
        
        submitBtn.classList.remove('bg-slate-300', 'text-slate-500', 'hidden');
        submitBtn.classList.add('bg-amber-500', 'text-white', 'hover:bg-amber-600');
        return;
    }

    window.isRecording = true;
    window.currentTranscript = "";
    btn.classList.add('animate-pulse', 'bg-rose-600');
    status.innerText = 'Listening... Speak now';
    transcriptOutput.classList.remove('hidden');
    transcriptOutput.innerText = "...";
    submitBtn.classList.add('hidden');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript) {
                window.currentTranscript = finalTranscript;
                transcriptOutput.innerText = '"' + finalTranscript + '"';
                window.toggleRecording(); // auto stop on final result
            }
        };

        recognition.onerror = (event) => {
            console.error(event.error);
            window.toggleRecording();
            status.innerText = "Error accessing microphone. We'll simulate a recording.";
            window.currentTranscript = "I am speaking simulated text.";
        };

        recognition.start();
    } else {
        // Fallback simulation
        setTimeout(() => {
            if(window.isRecording) {
                window.currentTranscript = "I am speaking simulated text because speech recognition is unavailable.";
                transcriptOutput.innerText = '"I am speaking simulated text."';
                window.toggleRecording();
            }
        }, 3000);
    }
};

window.submitAssessmentAnswer = (input) => {
    if (!input || input.trim() === '') return;

    const state = window.currentAssessmentState;
    const data = window.assessmentsData.find(a => a.id === state.id);
    const q = data.questions[state.currentIndex];

    let marksEarned = 0;
    
    // Grading Logic
    if (q.type === 'mcq' || q.type === 'fill' || q.type === 'listening' || q.type === 'reading') {
        if (input.toLowerCase().trim() === q.answer.toLowerCase().trim()) {
            marksEarned = q.marks;
        }
    } else if (q.type === 'speaking' || q.type === 'read_aloud') {
        // Simple NLP grading based on keyword matching
        if (q.expectedKeywords) {
            let matchCount = 0;
            const lowerInput = input.toLowerCase();
            q.expectedKeywords.forEach(kw => {
                if (lowerInput.includes(kw.toLowerCase())) matchCount++;
            });
            const ratio = matchCount / q.expectedKeywords.length;
            if (ratio > 0.6) marksEarned = q.marks;
            else if (ratio > 0.3) marksEarned = Math.floor(q.marks / 2);
            else marksEarned = Math.floor(q.marks / 4); // tried
        } else {
            marksEarned = q.marks; // Fallback
        }
    }

    // Record score
    if (!state.scores[q.category]) {
        state.scores[q.category] = { earned: 0, total: 0 };
    }
    state.scores[q.category].earned += marksEarned;
    state.scores[q.category].total += q.marks;
    
    state.answers.push({ q: q.q || q.prompt, input: input, marksEarned, totalMarks: q.marks });

    // Next question
    state.currentIndex++;
    window.renderAssessmentQuestion();
};

window.renderAssessmentResults = () => {
    const state = window.currentAssessmentState;
    const data = window.assessmentsData.find(a => a.id === state.id);
    const container = document.getElementById('mainContent');

    let totalEarned = 0;
    let totalPossible = 0;
    const categoryRows = [];

    for (const [cat, score] of Object.entries(state.scores)) {
        totalEarned += score.earned;
        totalPossible += score.total;
        const pct = Math.round((score.earned / score.total) * 100);
        categoryRows.push(`
            <div class="flex justify-between items-center p-3 border-b border-slate-100 last:border-0">
                <span class="font-bold text-slate-700">${cat}</span>
                <div class="flex items-center gap-4">
                    <div class="w-32 bg-slate-200 rounded-full h-2 hidden md:block">
                        <div class="bg-indigo-500 h-2 rounded-full" style="width: ${pct}%"></div>
                    </div>
                    <span class="font-medium ${pct >= 70 ? 'text-emerald-500' : 'text-rose-500'} w-12 text-right">${score.earned}/${score.total}</span>
                </div>
            </div>
        `);
    }

    const passed = totalEarned >= data.passingMarks;

    const currentUser = JSON.parse(sessionStorage.getItem('alphafly_currentUser')) || {};
    const isStaff = currentUser.role === 'staff' || currentUser.role === 'admin';

    let html = `
        <div class="max-w-3xl mx-auto pb-10">
            <div class="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-200 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-b ${passed ? 'from-emerald-50 to-transparent' : 'from-rose-50 to-transparent'} opacity-50"></div>
                
                <div class="relative z-10">
                    <div class="w-24 h-24 rounded-full ${passed ? 'bg-emerald-100 text-emerald-500' : 'bg-rose-100 text-rose-500'} flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner">
                        <i class="fas ${passed ? 'fa-trophy' : 'fa-times-circle'}"></i>
                    </div>
                    <h1 class="text-4xl font-extrabold text-slate-800 mb-2">${passed ? 'Assessment Passed!' : 'Needs Practice'}</h1>
                    <p class="text-slate-500 font-medium mb-8">You scored ${totalEarned} out of ${data.totalMarks} marks.</p>

                    <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8 text-left">
                        <h3 class="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Score Breakdown</h3>
                        <div class="space-y-1">
                            ${categoryRows.join('')}
                        </div>
                    </div>

                    ${isStaff ? `
                        <div class="bg-amber-50 rounded-2xl p-6 border border-amber-200 mb-8 text-left">
                            <h3 class="text-lg font-bold text-amber-800 mb-2"><i class="fas fa-chalkboard-teacher"></i> Staff Action Required</h3>
                            <p class="text-amber-700 text-sm">${passed ? 'Student performed well. No immediate remedial action needed.' : data.staffGuide.remedial}</p>
                        </div>
                    ` : ''}

                    <button onclick="showView('dashboard')" class="px-10 py-4 ${passed ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-extrabold rounded-xl shadow-md transition-all">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
    `;

    // Save progress
    let progress = JSON.parse(localStorage.getItem('alphafly_progress')) || { completedLessons: [] };
    if (!progress.completedLessons) progress.completedLessons = [];
    if (!progress.assessmentScores) progress.assessmentScores = {};
    
    // Save the highest score for this assessment
    const existingScore = progress.assessmentScores[data.id]?.earned || 0;
    if (totalEarned >= existingScore) {
        progress.assessmentScores[data.id] = { 
            earned: totalEarned, 
            total: data.totalMarks,
            scores: state.scores,
            answers: state.answers
        };
    }
    
    if (passed && !progress.completedLessons.includes(`a_${data.id}`)) {
        progress.completedLessons.push(`a_${data.id}`);
    }
    localStorage.setItem('alphafly_progress', JSON.stringify(progress));

    container.innerHTML = html;
};
