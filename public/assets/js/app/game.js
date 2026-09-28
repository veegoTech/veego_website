// ────────────────────────────────────────────────────────────
// GAME ENGINE - HANDLES ALL INTERACTIVE ACTIVITIES
// ────────────────────────────────────────────────────────────

window.renderGame = (level, day, container, type) => {
    const lesson = window.getLesson(level, day);
    if (!lesson) {
        container.innerHTML = `<div class="text-center py-20 text-red-500">Lesson data not found!</div>`;
        return;
    }

    const typeTitleMap = {
        'word_match': 'Word Match',
        'rearrange': 'Rearrange Sentence',
        'word_puzzle': 'Word Puzzle',
        'reading': 'Highlight Reading',
        'picture': 'Picture Puzzle'
    };
    
    const gameTitle = typeTitleMap[type] || 'Mini Game';

    // Shared Header
    const renderHeader = () => `
        <div class="max-w-4xl mx-auto pb-10 animate-fade-in">
            <button onclick="showView('lesson', {level: ${level}, day: ${day}})" class="text-gray-500 hover:text-indigo-600 mb-6 flex items-center gap-2 transition-colors">
                <i class="fas fa-arrow-left"></i> Back to Lesson
            </button>
            <div class="bg-white shadow-sm border border-slate-200 rounded-3xl p-6 md:p-8 text-center relative overflow-hidden" id="game-canvas">
                <!-- Injected Game Content -->
            </div>
        </div>
    `;

    container.innerHTML = renderHeader();
    const canvas = document.getElementById('game-canvas');

    // ────────────────────────────────────────────────────────────
    // 1. WORD MATCH
    // ────────────────────────────────────────────────────────────
    if (type === 'word_match') {
        let data = [];
        if (lesson.vocabulary && lesson.vocabulary.length >= 5) {
            data = lesson.vocabulary.slice(0, 5).map(v => ({ english: v.word, tamil: v.tamil || v.meaning }));
        } else {
            const fallbackBank = [
                { english: 'Apple', tamil: 'ஆப்பிள்' },
                { english: 'Book', tamil: 'புத்தகம்' },
                { english: 'Water', tamil: 'தண்ணீர்' },
                { english: 'House', tamil: 'வீடு' },
                { english: 'Friend', tamil: 'நண்பன்' },
                { english: 'School', tamil: 'பள்ளி' },
                { english: 'Happy', tamil: 'மகிழ்ச்சி' },
                { english: 'Read', tamil: 'படி' },
                { english: 'Write', tamil: 'எழுது' },
                { english: 'Play', tamil: 'விளையாடு' },
                { english: 'Eat', tamil: 'சாப்பிடு' },
                { english: 'Sleep', tamil: 'தூங்கு' },
                { english: 'Run', tamil: 'ஓடு' },
                { english: 'Beautiful', tamil: 'அழகான' },
                { english: 'Strong', tamil: 'பலமான' }
            ].sort(() => 0.5 - Math.random());
            
            // Try to add whatever we have in vocabulary first
            if (lesson.vocabulary && lesson.vocabulary.length > 0) {
                data = lesson.vocabulary.map(v => ({ english: v.word, tamil: v.tamil || v.meaning }));
            }
            
            // Fill the rest with fallback words
            while (data.length < 5) {
                const word = fallbackBank.pop();
                if (!data.find(d => d.english === word.english)) {
                    data.push(word);
                }
            }
        }

        const englishWords = [...data].sort(() => 0.5 - Math.random());
        const tamilWords = [...data].sort(() => 0.5 - Math.random());
        
        let selectedEnglish = null;
        let selectedTamil = null;
        let matchedCount = 0;

        window.checkWordMatch = () => {
            if (selectedEnglish && selectedTamil) {
                const engWord = selectedEnglish.dataset.word;
                const tamWord = selectedTamil.dataset.word;
                const isMatch = data.find(d => d.english === engWord && d.tamil === tamWord);
                
                if (isMatch) {
                    selectedEnglish.classList.replace('border-indigo-500', 'border-emerald-500');
                    selectedEnglish.classList.replace('text-indigo-600', 'text-emerald-700');
                    selectedEnglish.classList.add('bg-emerald-50', 'opacity-50', 'cursor-not-allowed');
                    selectedEnglish.disabled = true;
                    
                    selectedTamil.classList.replace('border-purple-500', 'border-emerald-500');
                    selectedTamil.classList.replace('text-purple-600', 'text-emerald-700');
                    selectedTamil.classList.add('bg-emerald-50', 'opacity-50', 'cursor-not-allowed');
                    selectedTamil.disabled = true;
                    
                    selectedEnglish = null;
                    selectedTamil = null;
                    matchedCount++;
                    
                    if (matchedCount === data.length) {
                        setTimeout(() => alert('🎉 Perfect Match! You mastered these words!'), 300);
                    }
                } else {
                    selectedEnglish.classList.add('animate-shake', 'border-red-500', 'bg-red-50');
                    selectedTamil.classList.add('animate-shake', 'border-red-500', 'bg-red-50');
                    setTimeout(() => {
                        selectedEnglish.classList.remove('animate-shake', 'border-red-500', 'bg-red-50');
                        selectedTamil.classList.remove('animate-shake', 'border-red-500', 'bg-red-50');
                        selectedEnglish.classList.remove('ring-4', 'ring-indigo-300');
                        selectedTamil.classList.remove('ring-4', 'ring-purple-300');
                        selectedEnglish = null;
                        selectedTamil = null;
                    }, 600);
                }
            }
        };

        window.selectEngMatch = (el) => {
            if (el.disabled) return;
            if (selectedEnglish) selectedEnglish.classList.remove('ring-4', 'ring-indigo-300');
            selectedEnglish = el;
            selectedEnglish.classList.add('ring-4', 'ring-indigo-300');
            window.checkWordMatch();
        };

        window.selectTamMatch = (el) => {
            if (el.disabled) return;
            if (selectedTamil) selectedTamil.classList.remove('ring-4', 'ring-purple-300');
            selectedTamil = el;
            selectedTamil.classList.add('ring-4', 'ring-purple-300');
            window.checkWordMatch();
        };

        canvas.innerHTML = `
            <h2 class="text-2xl font-bold mb-2 text-indigo-900">${gameTitle}</h2>
            <p class="text-gray-500 mb-8">Match the English word to its Tamil meaning.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div class="flex flex-col gap-4">
                    ${englishWords.map(w => `<button onclick="selectEngMatch(this)" data-word="${w.english}" class="p-4 rounded-xl border-2 border-gray-200 text-lg font-bold text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-all">${w.english}</button>`).join('')}
                </div>
                <div class="flex flex-col gap-4">
                    ${tamilWords.map(w => `<button onclick="selectTamMatch(this)" data-word="${w.tamil}" class="p-4 rounded-xl border-2 border-gray-200 text-lg font-bold text-gray-700 hover:border-purple-500 hover:text-purple-600 transition-all">${w.tamil}</button>`).join('')}
                </div>
            </div>
        `;
    }

    // ────────────────────────────────────────────────────────────
    // 2. REARRANGE SENTENCE
    // ────────────────────────────────────────────────────────────
    else if (type === 'rearrange') {
        let targetSentence = "I am learning English today";
        if (lesson.grammar && lesson.grammar.examples && lesson.grammar.examples.length > 0) {
            targetSentence = lesson.grammar.examples[0].split('(')[0].trim().replace('.', '');
        } else if (lesson.studentExamples && lesson.studentExamples.length > 0) {
            targetSentence = lesson.studentExamples[0].split('(')[0].trim().replace('.', '');
        }

        const words = targetSentence.split(' ');
        let shuffled = [...words].sort(() => 0.5 - Math.random());
        if (shuffled.join(' ') === targetSentence) shuffled.reverse();
        
        window.rearrangeSlots = [];

        window.rearrangeSelect = (idx) => {
            const word = shuffled[idx];
            if (!word) return;
            shuffled[idx] = null;
            window.rearrangeSlots.push(word);
            renderRearrange();
        };

        window.rearrangeRemove = (idx) => {
            const word = window.rearrangeSlots[idx];
            window.rearrangeSlots.splice(idx, 1);
            for (let i = 0; i < shuffled.length; i++) {
                if (shuffled[i] === null) {
                    shuffled[i] = word;
                    break;
                }
            }
            renderRearrange();
        };

        const renderRearrange = () => {
            let isWin = false;
            if (window.rearrangeSlots.join(' ') === targetSentence) {
                isWin = true;
                setTimeout(() => alert('🎉 Correct Sentence! Brilliant!'), 300);
            }

            canvas.innerHTML = `
                <h2 class="text-2xl font-bold mb-2 text-orange-600">${gameTitle}</h2>
                <p class="text-gray-500 mb-8">Click words in the correct order to form the sentence.</p>
                
                <div class="min-h-[80px] p-4 bg-orange-50 border-2 border-dashed border-orange-200 rounded-2xl flex flex-wrap gap-2 justify-center items-center mb-8">
                    ${window.rearrangeSlots.length === 0 ? '<span class="text-gray-400">Your sentence will appear here...</span>' : ''}
                    ${window.rearrangeSlots.map((w, i) => `
                        <button onclick="rearrangeRemove(${i})" class="px-4 py-2 bg-white border-2 border-orange-400 text-orange-700 font-bold rounded-lg shadow-sm hover:bg-orange-100 animate-fade-in">${w}</button>
                    `).join('')}
                </div>

                <div class="flex flex-wrap justify-center gap-3">
                    ${shuffled.map((w, i) => w ? `
                        <button onclick="rearrangeSelect(${i})" class="px-5 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:border-orange-400 hover:text-orange-600 transition-all">${w}</button>
                    ` : `<div class="px-5 py-3 border-2 border-transparent text-transparent">_</div>`).join('')}
                </div>

                ${isWin ? `<div class="mt-8 text-emerald-500 font-bold text-xl animate-fade-in"><i class="fas fa-check-circle"></i> Great Job!</div>` : ''}
            `;
        };
        renderRearrange();
    }

    // ────────────────────────────────────────────────────────────
    // 3. WORD PUZZLE (Missing Letters)
    // ────────────────────────────────────────────────────────────
    else if (type === 'word_puzzle') {
        let wordToGuess = "ENGLISH";
        if (lesson.vocabulary && lesson.vocabulary.length > 0) {
            wordToGuess = lesson.vocabulary[0].word.toUpperCase();
        } else {
            const titleWords = lesson.title.split(' ').filter(w => w.length > 4);
            if (titleWords.length > 0) wordToGuess = titleWords[0].toUpperCase();
        }

        const hiddenIndices = new Set();
        while(hiddenIndices.size < Math.min(2, wordToGuess.length - 1)) {
            hiddenIndices.add(Math.floor(Math.random() * wordToGuess.length));
        }

        let currentGuess = Array(wordToGuess.length).fill('');
        for(let i=0; i<wordToGuess.length; i++) {
            if(!hiddenIndices.has(i)) currentGuess[i] = wordToGuess[i];
        }

        const bank = new Set([...wordToGuess]);
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        while(bank.size < 12) bank.add(alphabet[Math.floor(Math.random() * 26)]);
        const letterBank = [...bank].sort(() => 0.5 - Math.random());

        window.wordPuzzleSelect = (letter) => {
            const firstEmpty = currentGuess.findIndex(c => c === '');
            if (firstEmpty !== -1) {
                currentGuess[firstEmpty] = letter;
                renderPuzzle();
            }
        };

        window.wordPuzzleClear = () => {
            for(let i=0; i<wordToGuess.length; i++) {
                if(hiddenIndices.has(i)) currentGuess[i] = '';
            }
            renderPuzzle();
        };

        const renderPuzzle = () => {
            const guessedWord = currentGuess.join('');
            let isWin = false;
            let isFull = !currentGuess.includes('');

            if (isFull && guessedWord === wordToGuess) {
                isWin = true;
                setTimeout(() => alert('🎉 Correct! You cracked the puzzle!'), 300);
            }

            canvas.innerHTML = `
                <h2 class="text-2xl font-bold mb-2 text-purple-600">${gameTitle}</h2>
                <p class="text-gray-500 mb-8">Fill in the missing letters.</p>
                
                <div class="flex justify-center gap-2 mb-10">
                    ${currentGuess.map((letter, i) => `
                        <div class="w-14 h-16 border-b-4 ${hiddenIndices.has(i) ? 'border-purple-500 bg-purple-50' : 'border-slate-300 bg-slate-100'} rounded-t-lg flex items-center justify-center text-3xl font-extrabold ${isWin ? 'text-emerald-500 border-emerald-500' : 'text-slate-800'} transition-all">
                            ${letter}
                        </div>
                    `).join('')}
                </div>

                <div class="flex flex-wrap justify-center max-w-lg mx-auto gap-2">
                    ${letterBank.map(l => `
                        <button onclick="wordPuzzleSelect('${l}')" ${isWin ? 'disabled' : ''} class="w-12 h-12 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:border-purple-500 hover:text-purple-600 transition-all text-xl">${l}</button>
                    `).join('')}
                </div>
                
                ${!isWin ? `<button onclick="wordPuzzleClear()" class="mt-6 text-sm text-gray-500 hover:text-red-500 underline">Clear</button>` : ''}
            `;
        };
        renderPuzzle();
    }

    // ────────────────────────────────────────────────────────────
    // 4. HIGHLIGHT READING (Speech Recognition)
    // ────────────────────────────────────────────────────────────
    else if (type === 'reading') {
        let topic = lesson.title ? lesson.title.split('(')[0].trim() : 'English Communication';
        let grammar = lesson.grammar && lesson.grammar.topic ? lesson.grammar.topic.split('(')[0].trim() : 'new grammar rules';
        
        let dynamicText = `Today we are focusing on ${topic}. We will practice using ${grammar} correctly in sentences. Reading aloud helps you understand the language much better. Keep practicing every day to improve your English fluency and speak confidently.`;
        
        let textToUse = dynamicText;
        
        if (lesson.theory && lesson.theory.content) {
            // Strip Tamil text (parentheses and non-ASCII characters)
            let stripped = lesson.theory.content.replace(/\([^)]*\)/g, '').replace(/[^\x00-\x7F]/g, '').replace(/\s+/g, ' ').trim();
            // If the lesson's english content has at least 4 sentences, use it
            if (stripped.split('.').filter(s => s.trim().length > 0).length >= 4) {
                textToUse = stripped;
            }
        }
        
        // Strip Tamil from fallback just in case, though it has none
        let text = textToUse.replace(/\([^)]*\)/g, '').replace(/[^\x00-\x7F]/g, '').replace(/\s+/g, ' ').trim();
        const words = text.split(' ').filter(w => w.length > 0);
        
        let currentWord = 0;
        let isReading = false;
        let recognition = null;
        let wordStatuses = Array(words.length).fill('pending'); // 'pending', 'correct', 'wrong'

        window.startReading = () => {
            if (isReading) return;
            
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
                return;
            }

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            isReading = true;
            currentWord = 0;
            wordStatuses = Array(words.length).fill('pending');
            renderReader();

            recognition.onresult = (event) => {
                let latestSpoken = '';
                let isFinal = false;

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    latestSpoken += event.results[i][0].transcript + ' ';
                    if (event.results[i].isFinal) isFinal = true;
                }
                
                const spokenWords = latestSpoken.toLowerCase().trim().split(/\s+/);
                
                spokenWords.forEach(sw => {
                    if (currentWord >= words.length) return;
                    
                    const expected = words[currentWord].toLowerCase().replace(/[^a-z0-9]/g, '');
                    if (!expected) {
                        wordStatuses[currentWord] = 'correct'; // skip punctuation only
                        currentWord++;
                        return;
                    }

                    if (sw === expected || sw.includes(expected) || (expected.length > 3 && expected.includes(sw))) {
                        wordStatuses[currentWord] = 'correct';
                        currentWord++;
                        renderReader();
                    }
                });

                // If final and we are stuck on a word, mark it wrong and move on
                if (isFinal && currentWord < words.length) {
                    wordStatuses[currentWord] = 'wrong';
                    currentWord++;
                    renderReader();
                }

                if (currentWord >= words.length) {
                    recognition.stop();
                    isReading = false;
                    renderReader();
                    setTimeout(() => alert('🎉 Reading complete!'), 500);
                }
            };

            recognition.onerror = (e) => {
                console.error('Speech recognition error', e);
                isReading = false;
                renderReader();
            };

            recognition.onend = () => {
                if (isReading && currentWord < words.length) {
                    recognition.start(); // Auto-restart if it stops mid-sentence
                }
            };

            recognition.start();
        };

        window.stopReading = () => {
            if (recognition) recognition.stop();
            isReading = false;
            renderReader();
        };

        const renderReader = () => {
            canvas.innerHTML = `
                <h2 class="text-2xl font-bold mb-2 text-blue-600">${gameTitle}</h2>
                <p class="text-gray-500 mb-8">Click start, allow microphone access, and read the text aloud!</p>
                
                <div class="bg-blue-50/50 p-8 rounded-2xl border border-blue-100 text-left leading-loose text-2xl max-w-3xl mx-auto min-h-[200px]">
                    ${words.map((w, i) => {
                        let colorClass = 'text-gray-400'; // default unread
                        if (i === currentWord && isReading) colorClass = 'bg-blue-200 text-blue-800 font-bold transform scale-110 shadow-sm border-b-4 border-blue-500'; // active
                        else if (wordStatuses[i] === 'correct') colorClass = 'text-emerald-500 font-bold'; // correct
                        else if (wordStatuses[i] === 'wrong') colorClass = 'text-red-500 line-through'; // wrong
                        else if (i < currentWord) colorClass = 'text-gray-300'; // skipped
                        
                        return `<span class="inline-block px-1 rounded transition-all duration-200 ${colorClass}">${w}</span>`;
                    }).join(' ')}
                </div>

                <div class="mt-8 flex justify-center gap-4">
                    ${!isReading ? `
                        <button onclick="startReading()" class="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all">
                            <i class="fas fa-microphone mr-2"></i> ${currentWord > 0 ? 'Try Again' : 'Start Reading'}
                        </button>
                    ` : `
                        <button onclick="stopReading()" class="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg transition-all animate-pulse">
                            <i class="fas fa-stop-circle mr-2"></i> Stop Reading
                        </button>
                    `}
                </div>
            `;
        };
        renderReader();
    }

    // ────────────────────────────────────────────────────────────
    // 5. PICTURE PUZZLE (Click to Swap Grid)
    // ────────────────────────────────────────────────────────────
    else if (type === 'picture') {
        const imgUrl = `https://picsum.photos/seed/alphafly${day}/600/600`;
        
        const gridSize = 3;
        let tiles = Array.from({length: gridSize * gridSize}, (_, i) => i);
        tiles.sort(() => 0.5 - Math.random());

        let firstSelection = null;

        window.picturePuzzleSelect = (idx) => {
            if (firstSelection === null) {
                firstSelection = idx;
                renderPicPuzzle();
            } else {
                const temp = tiles[firstSelection];
                tiles[firstSelection] = tiles[idx];
                tiles[idx] = temp;
                firstSelection = null;
                renderPicPuzzle();
                
                if (tiles.every((val, i) => val === i)) {
                    setTimeout(() => alert('🎉 Puzzle Solved! What a beautiful picture!'), 300);
                }
            }
        };

        const renderPicPuzzle = () => {
            canvas.innerHTML = `
                <h2 class="text-2xl font-bold mb-2 text-pink-600">${gameTitle}</h2>
                <p class="text-gray-500 mb-8">Click two tiles to swap them and complete the picture.</p>
                
                <div class="relative w-full max-w-[300px] sm:max-w-[400px] aspect-square mx-auto border-4 border-slate-200 rounded-xl overflow-hidden shadow-xl bg-slate-100">
                    <div class="grid grid-cols-3 grid-rows-3 w-full h-full">
                        ${tiles.map((originalIdx, currentIdx) => {
                            const bgX = (originalIdx % 3) * 50;
                            const bgY = Math.floor(originalIdx / 3) * 50;
                            const isSelected = firstSelection === currentIdx;
                            return `
                                <div onclick="picturePuzzleSelect(${currentIdx})" 
                                     class="cursor-pointer border border-white/50 hover:brightness-110 transition-all ${isSelected ? 'ring-4 ring-pink-500 ring-inset brightness-110 z-10 scale-95' : ''}"
                                     style="background-image: url('${imgUrl}'); background-size: 300% 300%; background-position: ${bgX}% ${bgY}%;">
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        };
        renderPicPuzzle();
    }
    
    // ────────────────────────────────────────────────────────────
    // 6. QUIZ ROUTER
    // ────────────────────────────────────────────────────────────
    else if (type === 'quiz') {
        if (typeof window.renderQuiz === 'function') {
            window.renderQuiz(level, day, container);
        } else {
            canvas.innerHTML = `<div class="p-10 text-center text-red-500">Quiz engine not found!</div>`;
        }
    }
    
    else {
        canvas.innerHTML = `<div class="p-10 text-center text-gray-500 text-lg">Activity coming soon!</div>`;
    }
};
