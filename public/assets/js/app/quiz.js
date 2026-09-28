// Quiz logic
window.renderQuiz = (level, day, container) => {
    const lesson = window.getLesson(level, day);
    if (!lesson) {
        container.innerHTML = `<div class="text-center py-20 text-red-500">Lesson data not found!</div>`;
        return;
    }

    let quizData = lesson.quiz;
    
    // Auto-generate mini-quiz if none exists or has less than 5 questions
    if (!quizData || quizData.length < 5) {
        let generated = [];
        
        // 1. Add Vocabulary Questions
        if (lesson.vocabulary && lesson.vocabulary.length > 0) {
            lesson.vocabulary.forEach(v => {
                if (generated.length < 5) {
                    generated.push({
                        q: `What is the meaning of '${v.word}'?`,
                        options: [
                            v.tamil || v.meaning, 
                            "விளையாட்டு (Play)", 
                            "பள்ளி (School)", 
                            "மகிழ்ச்சி (Happy)"
                        ].sort(() => 0.5 - Math.random()),
                        answer: v.tamil || v.meaning
                    });
                }
            });
        }
        
        // 2. Add Grammar Questions
        if (lesson.grammar && lesson.grammar.topic && generated.length < 5) {
            generated.push({
                q: `Today's grammar focus is:`,
                options: [lesson.grammar.topic.split('(')[0].trim(), "Tenses", "Nouns", "Verbs"].sort(() => 0.5 - Math.random()),
                answer: lesson.grammar.topic.split('(')[0].trim()
            });
        }

        // 3. Add Generic English Questions to reach exactly 5
        const genericQs = [
            { q: "Which of these is a correct greeting?", options: ["Good morning", "Bad morning", "Sleep morning", "Run morning"], answer: "Good morning" },
            { q: "What is the opposite of 'Big'?", options: ["Small", "Tall", "Fast", "Happy"], answer: "Small" },
            { q: "Which word is a noun (name of a thing)?", options: ["Book", "Run", "Quickly", "Blue"], answer: "Book" },
            { q: "Which of these is an action (verb)?", options: ["Jump", "Table", "Green", "Slow"], answer: "Jump" },
            { q: "How do you say 'Thank you' in Tamil?", options: ["நன்றி (Nandri)", "வணக்கம் (Vanakkam)", "எப்படி (Eppadi)", "என்ன (Enna)"], answer: "நன்றி (Nandri)" },
            { q: "Choose the correct sentence:", options: ["I am a student.", "I is a student.", "I are a student.", "I am student."], answer: "I am a student." },
            { q: "What is the past tense of 'Go'?", options: ["Went", "Going", "Gone", "Goes"], answer: "Went" }
        ].sort(() => 0.5 - Math.random());

        while (generated.length < 5 && genericQs.length > 0) {
            generated.push(genericQs.pop());
        }
        
        quizData = generated;
    }
    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;

    const render = () => {
        if (currentQuestion >= quizData.length) {
            // Show results
            container.innerHTML = `
                <div class="max-w-3xl mx-auto pb-10 animate-fade-in">
                    <button onclick="showView('lesson', {level: ${level}, day: ${day}})" class="text-gray-500 hover:text-primary mb-6 flex items-center gap-2">
                        <i class="fas fa-arrow-left"></i> Back to Lesson
                    </button>
                    <div class="glass rounded-2xl p-8 text-center bg-gradient-to-br from-indigo-50 to-purple-50">
                        <div class="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-6 text-4xl shadow-xl">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <h2 class="text-3xl font-extrabold mb-4">Quiz Completed!</h2>
                        <p class="text-xl text-gray-700 mb-8">You scored <span class="font-bold text-primary">${score}</span> out of ${quizData.length}</p>
                        <button onclick="showView('lesson', {level: ${level}, day: ${day}})" class="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg transition-all">
                            Finish
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        const q = quizData[currentQuestion];

        container.innerHTML = `
            <div class="max-w-3xl mx-auto pb-10 animate-fade-in">
                <button onclick="showView('lesson', {level: ${level}, day: ${day}})" class="text-gray-500 hover:text-primary mb-6 flex items-center gap-2">
                    <i class="fas fa-arrow-left"></i> Back to Lesson
                </button>
                
                <div class="glass rounded-2xl p-6 md:p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-bold">Quiz</h2>
                        <span class="px-3 py-1 bg-gray-100 rounded-full text-sm font-bold text-gray-500">Question ${currentQuestion + 1} of ${quizData.length}</span>
                    </div>
                    
                    <h3 class="text-2xl font-bold text-gray-800 mb-8">${q.q}</h3>
                    
                    <div class="flex flex-col gap-4" id="options-container">
                        ${q.options.map((opt, i) => `
                            <button id="opt-${i}" class="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-indigo-50 font-medium text-lg transition-all" onclick="selectOption(${i}, '${opt}')">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                    
                    <div class="mt-8 flex justify-end">
                        <button id="next-btn" onclick="submitAnswer()" class="px-6 py-3 bg-gray-300 text-gray-500 font-bold rounded-xl cursor-not-allowed transition-all" disabled>
                            Submit Answer
                        </button>
                    </div>
                </div>
            </div>
        `;
    };

    window.selectOption = (idx, opt) => {
        selectedOption = opt;
        
        // Reset styles
        const q = quizData[currentQuestion];
        q.options.forEach((_, i) => {
            const btn = document.getElementById(`opt-${i}`);
            if (btn) {
                btn.classList.remove('border-primary', 'bg-indigo-50', 'ring-2', 'ring-primary');
                btn.classList.add('border-gray-200');
            }
        });
        
        // Highlight selected
        const selectedBtn = document.getElementById(`opt-${idx}`);
        if (selectedBtn) {
            selectedBtn.classList.remove('border-gray-200');
            selectedBtn.classList.add('border-primary', 'bg-indigo-50', 'ring-2', 'ring-primary');
        }
        
        // Enable next button
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
            nextBtn.classList.add('bg-primary', 'hover:bg-primary-hover', 'text-white', 'cursor-pointer');
        }
    };

    window.submitAnswer = () => {
        if (!selectedOption) return;
        
        const q = quizData[currentQuestion];
        const isCorrect = selectedOption === q.answer;
        
        if (isCorrect) {
            score++;
        }
        
        // Highlight correct and wrong answers briefly
        q.options.forEach((opt, i) => {
            const btn = document.getElementById(`opt-${i}`);
            if (btn) {
                if (opt === q.answer) {
                    btn.classList.add('bg-green-100', 'border-green-500', 'text-green-800');
                } else if (opt === selectedOption && !isCorrect) {
                    btn.classList.add('bg-red-100', 'border-red-500', 'text-red-800');
                }
            }
        });
        
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) nextBtn.disabled = true;

        setTimeout(() => {
            currentQuestion++;
            selectedOption = null;
            render();
        }, 1200);
    };

    render();
};
