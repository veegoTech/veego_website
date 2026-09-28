window.renderLinkedInModule = (day) => {
    const mainContent = document.getElementById('mainContent');
    const lessonData = window.proSyllabus[day];

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-blue-50 rounded-lg text-blue-600 hidden sm:block"><i data-lucide="linkedin" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: LinkedIn Optimization</span>`;
    }

    const themeGradient = 'from-blue-600 to-blue-800';
    const bgGradient = 'from-slate-50 to-slate-100';

    let progress = window.LocalDB.getProgress(window.viewingStudentUsername);
    let isCompleted = progress.completedLessons && progress.completedLessons.includes(`pro_${day}`);

    let html = `
        <div class="animate-fade-in max-w-5xl mx-auto space-y-12 mt-4 pb-20 bg-gradient-to-b ${bgGradient} min-h-screen">
            
            <!-- HEADER -->
            <div class="relative bg-gradient-to-r ${themeGradient} rounded-3xl p-10 shadow-xl overflow-hidden text-white">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8">
                        <div class="w-20 sm:w-24 h-20 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0 shadow-inner">
                            <i data-lucide="linkedin" class="w-12 h-12 text-white"></i>
                        </div>
                        <div>
                            <div class="text-blue-200 font-bold tracking-widest text-sm uppercase mb-2">AlphaFly Masterclass</div>
                            <h1 class="text-3xl md:text-5xl font-extrabold mb-4">LinkedIn Profile Creation</h1>
                            <p class="text-blue-50 text-lg max-w-2xl">Build a professional LinkedIn profile that attracts recruiters and helps you grow your career.</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3 shrink-0 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
                        <div class="flex items-center gap-3 text-sm font-bold text-white"><i data-lucide="clock" class="w-5 h-5 text-blue-200"></i> 35-45 mins</div>
                        <div class="flex items-center gap-3 text-sm font-bold text-white"><i data-lucide="bar-chart" class="w-5 h-5 text-blue-200"></i> Beginner</div>
                        <div class="flex items-center gap-3 text-sm font-bold text-amber-300"><i data-lucide="star" class="w-5 h-5 text-amber-300"></i> +200 XP Reward</div>
                    </div>
                </div>
            </div>

            <div id="linkedin-module-content">
                <!-- Injected sequentially -->
            </div>

            <div class="mt-8 text-center space-y-4 flex flex-col items-center">
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
    window.renderLinkedInSections();
    if (window.lucide) window.lucide.createIcons();
};

window.renderLinkedInSections = () => {
    const container = document.getElementById('linkedin-module-content');
    
    let html = `
        <!-- Section 1 -->
        <div class="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 mb-10 relative overflow-hidden group">
            <div class="absolute -right-20 -top-20 bg-blue-50 w-64 h-64 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
            <div class="flex items-center gap-4 mb-8 relative z-10">
                <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-inner"><i data-lucide="globe" class="w-6 h-6"></i></div>
                <h2 class="text-3xl font-extrabold text-slate-800">What is LinkedIn?</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                <div class="space-y-4">
                    <div class="flex items-start gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-emerald-500 shrink-0 mt-1"></i><p class="text-lg text-slate-600">LinkedIn is a professional networking platform.</p></div>
                    <div class="flex items-start gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-emerald-500 shrink-0 mt-1"></i><p class="text-lg text-slate-600">Recruiters search for candidates directly on LinkedIn.</p></div>
                    <div class="flex items-start gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-emerald-500 shrink-0 mt-1"></i><p class="text-lg text-slate-600">Companies post internships, jobs, and news.</p></div>
                    <div class="flex items-start gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-emerald-500 shrink-0 mt-1"></i><p class="text-lg text-slate-600">You can showcase your education, skills, projects, and achievements.</p></div>
                    <div class="flex items-start gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-emerald-500 shrink-0 mt-1"></i><p class="text-lg text-slate-600">A strong profile heavily increases your career opportunities.</p></div>
                </div>
                
                <div class="bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-4">
                    <div class="bg-white px-6 py-3 rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700 w-full text-center flex items-center justify-center gap-2"><i data-lucide="user" class="w-5 h-5 text-slate-400"></i> Student</div>
                    <i data-lucide="arrow-down" class="w-6 h-6 text-blue-400"></i>
                    <div class="bg-blue-50 px-6 py-3 rounded-lg shadow-sm border border-blue-200 font-bold text-blue-700 w-full text-center flex items-center justify-center gap-2"><i data-lucide="linkedin" class="w-5 h-5 text-blue-600"></i> LinkedIn Profile</div>
                    <i data-lucide="arrow-down" class="w-6 h-6 text-indigo-400"></i>
                    <div class="bg-indigo-50 px-6 py-3 rounded-lg shadow-sm border border-indigo-200 font-bold text-indigo-700 w-full text-center flex items-center justify-center gap-2"><i data-lucide="users" class="w-5 h-5 text-indigo-600"></i> Recruiters</div>
                    <i data-lucide="arrow-down" class="w-6 h-6 text-emerald-400"></i>
                    <div class="bg-emerald-50 px-6 py-3 rounded-lg shadow-sm border border-emerald-200 font-bold text-emerald-700 w-full text-center flex items-center justify-center gap-2"><i data-lucide="briefcase" class="w-5 h-5 text-emerald-600"></i> Internships & Jobs</div>
                </div>
            </div>
        </div>
        
        <!-- Section 2: Why LinkedIn Matters -->
        <div class="mb-12">
            <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"><i data-lucide="zap" class="text-amber-500"></i> Why LinkedIn is Important</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group text-center">
                    <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><i data-lucide="user-check" class="w-6 h-6"></i></div>
                    <h3 class="font-bold text-slate-700 text-sm">Professional Identity</h3>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group text-center">
                    <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><i data-lucide="briefcase" class="w-6 h-6"></i></div>
                    <h3 class="font-bold text-slate-700 text-sm">Internships</h3>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group text-center">
                    <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><i data-lucide="users" class="w-6 h-6"></i></div>
                    <h3 class="font-bold text-slate-700 text-sm">Connections</h3>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group text-center">
                    <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><i data-lucide="award" class="w-6 h-6"></i></div>
                    <h3 class="font-bold text-slate-700 text-sm">Showcase Work</h3>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group text-center">
                    <div class="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><i data-lucide="trending-up" class="w-6 h-6"></i></div>
                    <h3 class="font-bold text-slate-700 text-sm">Job Opps</h3>
                </div>
            </div>
        </div>
        <!-- Section 3: Step-by-Step Guide -->
        <div class="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 mb-12">
            <h2 class="text-3xl font-extrabold text-slate-800 mb-10 flex items-center gap-3"><i data-lucide="map" class="text-blue-500"></i> Step-by-Step Profile Setup</h2>
            
            <div class="relative border-l-2 border-blue-100 ml-6 space-y-12 pb-8">
                
                <!-- Step 1 -->
                <div class="relative pl-8">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs shadow-md">1</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-4">Create a LinkedIn Account</h3>
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div class="space-y-2 text-slate-600 font-medium">
                            <div class="flex items-center gap-2"><i data-lucide="check" class="text-emerald-500 w-5 h-5"></i> Visit LinkedIn</div>
                            <div class="flex items-center gap-2"><i data-lucide="check" class="text-emerald-500 w-5 h-5"></i> Sign Up</div>
                            <div class="flex items-center gap-2"><i data-lucide="check" class="text-emerald-500 w-5 h-5"></i> Verify Email</div>
                            <div class="flex items-center gap-2"><i data-lucide="check" class="text-emerald-500 w-5 h-5"></i> Login</div>
                        </div>
                        <div class="flex flex-col items-center gap-4">
                            <a href="https://www.linkedin.com" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all">Open LinkedIn <i data-lucide="external-link" class="w-4 h-4 inline-block ml-1"></i></a>
                            <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700 select-none">
                                <input type="checkbox" class="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"> Completed
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="relative pl-8">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs shadow-md">2</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-4">Add a Professional Profile Photo</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                            <h4 class="font-bold text-emerald-700 flex items-center gap-2 mb-2"><i data-lucide="check-circle-2" class="w-5 h-5"></i> Good Example</h4>
                            <ul class="text-sm text-emerald-800 space-y-1">
                                <li>• Clear face and good lighting</li>
                                <li>• Plain background</li>
                                <li>• Professional dress</li>
                                <li>• Smiling naturally</li>
                            </ul>
                        </div>
                        <div class="bg-rose-50 p-4 rounded-xl border border-rose-200">
                            <h4 class="font-bold text-rose-700 flex items-center gap-2 mb-2"><i data-lucide="x-circle" class="w-5 h-5"></i> Bad Example</h4>
                            <ul class="text-sm text-rose-800 space-y-1">
                                <li>• Group photos or selfies</li>
                                <li>• Dark or messy background</li>
                                <li>• Sunglasses or hats</li>
                                <li>• Casual party wear</li>
                            </ul>
                        </div>
                    </div>
                    <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700 select-none">
                        <input type="checkbox" class="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"> My photo meets all requirements
                    </label>
                </div>
                
                <!-- Step 3 -->
                <div class="relative pl-8">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs shadow-md">3</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2">Add a Professional Headline</h3>
                    <p class="text-slate-600 mb-4">Your headline appears below your name. Make it count.</p>
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200" onclick="document.getElementById('headline-input').value = this.innerText">AI & Data Science Student</span>
                            <span class="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200" onclick="document.getElementById('headline-input').value = this.innerText">Python Full Stack Developer</span>
                            <span class="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200" onclick="document.getElementById('headline-input').value = this.innerText">UI/UX Designer</span>
                            <span class="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200" onclick="document.getElementById('headline-input').value = this.innerText">Computer Science Student</span>
                        </div>
                        <input type="text" id="headline-input" placeholder="Draft your headline here..." class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none font-medium">
                    </div>
                </div>

                <!-- Step 4 -->
                <div class="relative pl-8">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs shadow-md">4</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2">Write an "About" Section</h3>
                    <p class="text-slate-600 mb-4">Include who you are, your education, technical skills, and career goals.</p>
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-4 text-blue-800 text-sm">
                        <strong>Example:</strong> I am an AI & Data Science student passionate about Python, Full Stack Development, Artificial Intelligence, and solving real-world problems through technology. I enjoy learning new skills and working on innovative projects.
                    </div>
                    <textarea placeholder="Write your About section here..." rows="4" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none resize-none"></textarea>
                </div>

                <!-- Step 5 -->
                <div class="relative pl-8">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs shadow-md">5</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-4">Add Education</h3>
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" placeholder="College / University Name" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none sm:col-span-2">
                        <input type="text" placeholder="Degree (e.g. B.Tech)" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none">
                        <input type="text" placeholder="Department" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none">
                        <input type="text" placeholder="Start Year" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none">
                        <input type="text" placeholder="End Year (or Expected)" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none">
                        <input type="text" placeholder="CGPA (Optional)" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none sm:col-span-2">
                    </div>
                </div>

                <!-- Step 6 -->
                <div class="relative pl-8">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs shadow-md">6</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2">Add Skills</h3>
                    <p class="text-slate-500 mb-4 text-sm">Drag and drop the skills you want to add to your profile.</p>
                    <div class="flex flex-col md:flex-row gap-6">
                        <!-- Draggable items -->
                        <div class="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-200 min-h-[150px]">
                            <h4 class="font-bold text-slate-600 mb-3 text-sm uppercase">Available Skills</h4>
                            <div class="flex flex-wrap gap-2" id="available-skills" ondrop="window.dropSkill(event)" ondragover="window.allowDropSkill(event)">
                                <span class="bg-white border border-slate-300 px-3 py-1 rounded cursor-move text-sm font-medium hover:border-blue-400" draggable="true" ondragstart="window.dragSkill(event)" id="skill-1">Python</span>
                                <span class="bg-white border border-slate-300 px-3 py-1 rounded cursor-move text-sm font-medium hover:border-blue-400" draggable="true" ondragstart="window.dragSkill(event)" id="skill-2">Java</span>
                                <span class="bg-white border border-slate-300 px-3 py-1 rounded cursor-move text-sm font-medium hover:border-blue-400" draggable="true" ondragstart="window.dragSkill(event)" id="skill-3">HTML/CSS</span>
                                <span class="bg-white border border-slate-300 px-3 py-1 rounded cursor-move text-sm font-medium hover:border-blue-400" draggable="true" ondragstart="window.dragSkill(event)" id="skill-4">React</span>
                                <span class="bg-white border border-slate-300 px-3 py-1 rounded cursor-move text-sm font-medium hover:border-blue-400" draggable="true" ondragstart="window.dragSkill(event)" id="skill-5">Django</span>
                                <span class="bg-white border border-slate-300 px-3 py-1 rounded cursor-move text-sm font-medium hover:border-blue-400" draggable="true" ondragstart="window.dragSkill(event)" id="skill-6">Machine Learning</span>
                                <span class="bg-white border border-slate-300 px-3 py-1 rounded cursor-move text-sm font-medium hover:border-blue-400" draggable="true" ondragstart="window.dragSkill(event)" id="skill-7">Communication</span>
                            </div>
                        </div>
                        <!-- Drop zone -->
                        <div class="flex-1 bg-blue-50 p-4 rounded-xl border-2 border-dashed border-blue-300 min-h-[150px]" id="selected-skills" ondrop="window.dropSkill(event)" ondragover="window.allowDropSkill(event)">
                            <h4 class="font-bold text-blue-700 mb-3 text-sm uppercase">My Profile Skills</h4>
                            <!-- Dropped items go here -->
                        </div>
                    </div>
                </div>

                <!-- Step 7 -->
                <div class="relative pl-8">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs shadow-md">7</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2">Add Projects</h3>
                    <p class="text-slate-600 mb-4">Recruiters want to see what you have actually built.</p>
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                        <input type="text" placeholder="Project Name" class="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none">
                        <textarea placeholder="Description: What did you build and why?" rows="2" class="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none resize-none"></textarea>
                        <input type="text" placeholder="Technologies Used (e.g. React, Node.js)" class="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="GitHub Link" class="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none">
                            <input type="text" placeholder="Live Portfolio Link (Optional)" class="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none">
                        </div>
                    </div>
                </div>

                <!-- Step 8 -->
                <div class="relative pl-8">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs shadow-md">8</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-4">Add Certifications</h3>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm border border-slate-200"><i data-lucide="award" class="w-4 h-4 inline text-amber-500"></i> Python</span>
                        <span class="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm border border-slate-200"><i data-lucide="award" class="w-4 h-4 inline text-amber-500"></i> Data Analytics</span>
                        <span class="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm border border-slate-200"><i data-lucide="award" class="w-4 h-4 inline text-amber-500"></i> AWS Cloud</span>
                        <span class="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm border border-slate-200"><i data-lucide="award" class="w-4 h-4 inline text-amber-500"></i> Microsoft Certified</span>
                    </div>
                    <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700 select-none">
                        <input type="checkbox" class="w-5 h-5 rounded text-blue-600"> Certifications Added
                    </label>
                </div>

                <!-- Step 10 -->
                <div class="relative pl-8">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs shadow-md">10</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2">Customize Your LinkedIn URL</h3>
                    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-4">
                        <div class="flex items-center gap-4 bg-white p-4 rounded-xl border border-rose-200 text-rose-500 opacity-70">
                            <i data-lucide="x" class="w-6 h-6"></i> linkedin.com/in/john-doe-4a8b9123
                        </div>
                        <div class="flex items-center gap-4 bg-white p-4 rounded-xl border border-emerald-300 text-emerald-600 font-bold shadow-sm">
                            <i data-lucide="check" class="w-6 h-6"></i> linkedin.com/in/johndoe
                        </div>
                        <p class="text-sm text-slate-500 mt-2">Go to your profile -> Edit public profile & URL -> Personalize the URL for your profile.</p>
                    </div>
                </div>

                <!-- Step 11 -->
                <div class="relative pl-8">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs shadow-md">11</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2">Connect with Professionals</h3>
                    <p class="text-slate-600 mb-4">Select who you should connect with first to build your network:</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <label class="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-blue-50"><input type="checkbox" class="w-4 h-4 text-blue-600"> Teachers</label>
                        <label class="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-blue-50"><input type="checkbox" class="w-4 h-4 text-blue-600"> Classmates</label>
                        <label class="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-blue-50"><input type="checkbox" class="w-4 h-4 text-blue-600"> Alumni</label>
                        <label class="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-blue-50"><input type="checkbox" class="w-4 h-4 text-blue-600"> HR Managers</label>
                        <label class="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-blue-50"><input type="checkbox" class="w-4 h-4 text-blue-600"> Industry Experts</label>
                    </div>
                </div>

                <!-- Step 12 -->
                <div class="relative pl-8">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs shadow-md">12</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-4">Follow Companies</h3>
                    <div class="flex flex-wrap gap-3">
                        <span class="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm cursor-pointer hover:bg-blue-600 hover:text-white transition-colors" onclick="this.classList.toggle('bg-blue-600'); this.classList.toggle('text-white');">Microsoft +</span>
                        <span class="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm cursor-pointer hover:bg-blue-600 hover:text-white transition-colors" onclick="this.classList.toggle('bg-blue-600'); this.classList.toggle('text-white');">Google +</span>
                        <span class="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm cursor-pointer hover:bg-blue-600 hover:text-white transition-colors" onclick="this.classList.toggle('bg-blue-600'); this.classList.toggle('text-white');">Amazon +</span>
                        <span class="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm cursor-pointer hover:bg-blue-600 hover:text-white transition-colors" onclick="this.classList.toggle('bg-blue-600'); this.classList.toggle('text-white');">Infosys +</span>
                        <span class="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm cursor-pointer hover:bg-blue-600 hover:text-white transition-colors" onclick="this.classList.toggle('bg-blue-600'); this.classList.toggle('text-white');">TCS +</span>
                        <span class="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm cursor-pointer hover:bg-blue-600 hover:text-white transition-colors" onclick="this.classList.toggle('bg-blue-600'); this.classList.toggle('text-white');">Zoho +</span>
                    </div>
                </div>

                <!-- Step 13 -->
                <div class="relative pl-8">
                    <div class="absolute -left-[17px] top-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs shadow-md">13</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2">Create Your First Post</h3>
                    <p class="text-slate-600 mb-4">Share a learning milestone, project, or certification.</p>
                    <div class="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                        <div class="bg-slate-100 p-3 border-b border-slate-200 flex items-center gap-2">
                            <div class="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">U</div>
                            <span class="font-bold text-slate-700 text-sm">Create a post</span>
                        </div>
                        <textarea placeholder="What do you want to talk about?" rows="3" class="w-full p-4 outline-none resize-none"></textarea>
                        <div class="p-3 border-t border-slate-200 flex justify-end">
                            <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold text-sm transition-colors" onclick="alert('Post draft saved!')">Post</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        
        <!-- Section 4: LinkedIn Profile Checklist -->
        <div class="bg-indigo-50 rounded-3xl p-10 shadow-sm border border-indigo-200 mb-12 relative overflow-hidden">
            <h2 class="text-3xl font-extrabold text-indigo-900 mb-6 flex items-center gap-3"><i data-lucide="list-checks" class="text-indigo-600"></i> Profile Checklist</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10" id="linkedin-checklist">
                <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 cursor-pointer hover:shadow-md transition-shadow"><input type="checkbox" class="w-5 h-5 rounded text-indigo-600" onchange="window.checkLinkedInCompletion()"> <span class="font-medium text-slate-700">Profile Photo</span></label>
                <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 cursor-pointer hover:shadow-md transition-shadow"><input type="checkbox" class="w-5 h-5 rounded text-indigo-600" onchange="window.checkLinkedInCompletion()"> <span class="font-medium text-slate-700">Professional Headline</span></label>
                <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 cursor-pointer hover:shadow-md transition-shadow"><input type="checkbox" class="w-5 h-5 rounded text-indigo-600" onchange="window.checkLinkedInCompletion()"> <span class="font-medium text-slate-700">About Section</span></label>
                <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 cursor-pointer hover:shadow-md transition-shadow"><input type="checkbox" class="w-5 h-5 rounded text-indigo-600" onchange="window.checkLinkedInCompletion()"> <span class="font-medium text-slate-700">Education</span></label>
                <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 cursor-pointer hover:shadow-md transition-shadow"><input type="checkbox" class="w-5 h-5 rounded text-indigo-600" onchange="window.checkLinkedInCompletion()"> <span class="font-medium text-slate-700">Skills</span></label>
                <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 cursor-pointer hover:shadow-md transition-shadow"><input type="checkbox" class="w-5 h-5 rounded text-indigo-600" onchange="window.checkLinkedInCompletion()"> <span class="font-medium text-slate-700">Projects</span></label>
                <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 cursor-pointer hover:shadow-md transition-shadow"><input type="checkbox" class="w-5 h-5 rounded text-indigo-600" onchange="window.checkLinkedInCompletion()"> <span class="font-medium text-slate-700">Certifications</span></label>
                <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 cursor-pointer hover:shadow-md transition-shadow"><input type="checkbox" class="w-5 h-5 rounded text-indigo-600" onchange="window.checkLinkedInCompletion()"> <span class="font-medium text-slate-700">Experience</span></label>
                <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 cursor-pointer hover:shadow-md transition-shadow"><input type="checkbox" class="w-5 h-5 rounded text-indigo-600" onchange="window.checkLinkedInCompletion()"> <span class="font-medium text-slate-700">Custom URL</span></label>
                <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 cursor-pointer hover:shadow-md transition-shadow"><input type="checkbox" class="w-5 h-5 rounded text-indigo-600" onchange="window.checkLinkedInCompletion()"> <span class="font-medium text-slate-700">20+ Connections</span></label>
                <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 cursor-pointer hover:shadow-md transition-shadow"><input type="checkbox" class="w-5 h-5 rounded text-indigo-600" onchange="window.checkLinkedInCompletion()"> <span class="font-medium text-slate-700">First Post</span></label>
                <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 cursor-pointer hover:shadow-md transition-shadow"><input type="checkbox" class="w-5 h-5 rounded text-indigo-600" onchange="window.checkLinkedInCompletion()"> <span class="font-medium text-slate-700">Resume Uploaded</span></label>
            </div>
            <div id="linkedin-completion-msg" class="hidden mt-8 text-center animate-bounce">
                <span class="bg-indigo-600 text-white font-bold text-xl px-8 py-4 rounded-full shadow-lg shadow-indigo-300">🎉 All Checklist Items Complete!</span>
            </div>
        </div>
        <!-- Section 5: LinkedIn Best Practices -->
        <div class="mb-12">
            <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"><i data-lucide="lightbulb" class="text-yellow-500"></i> LinkedIn Best Practices</h2>
            
            <style>
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .group:hover .flip-card-inner { transform: rotateY(180deg); }
            </style>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Flip Card 1 -->
                <div class="group h-48 perspective-1000 cursor-pointer">
                    <div class="relative w-full h-full transition-transform duration-700 transform-style-3d flip-card-inner">
                        <div class="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg p-4">
                            <i data-lucide="activity" class="w-10 h-10 mb-2"></i>
                            <h3 class="font-bold text-xl text-center">Stay Active</h3>
                        </div>
                        <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl flex flex-col items-center justify-center text-slate-700 shadow-lg border border-blue-200 p-6 text-center">
                            <ul class="text-sm space-y-2 text-left font-medium">
                                <li><i data-lucide="check" class="w-3 h-3 inline text-emerald-500"></i> Like & comment on posts</li>
                                <li><i data-lucide="check" class="w-3 h-3 inline text-emerald-500"></i> Keep profile updated</li>
                                <li><i data-lucide="check" class="w-3 h-3 inline text-emerald-500"></i> Share weekly learnings</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Flip Card 2 -->
                <div class="group h-48 perspective-1000 cursor-pointer">
                    <div class="relative w-full h-full transition-transform duration-700 transform-style-3d flip-card-inner">
                        <div class="absolute w-full h-full backface-hidden bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg p-4">
                            <i data-lucide="users" class="w-10 h-10 mb-2"></i>
                            <h3 class="font-bold text-xl text-center">Networking</h3>
                        </div>
                        <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl flex flex-col items-center justify-center text-slate-700 shadow-lg border border-emerald-200 p-6 text-center">
                            <ul class="text-sm space-y-2 text-left font-medium">
                                <li><i data-lucide="check" class="w-3 h-3 inline text-emerald-500"></i> Add a polite connection note</li>
                                <li><i data-lucide="check" class="w-3 h-3 inline text-emerald-500"></i> Connect with alumni</li>
                                <li><i data-lucide="check" class="w-3 h-3 inline text-emerald-500"></i> Follow industry leaders</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Flip Card 3 -->
                <div class="group h-48 perspective-1000 cursor-pointer">
                    <div class="relative w-full h-full transition-transform duration-700 transform-style-3d flip-card-inner">
                        <div class="absolute w-full h-full backface-hidden bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg p-4">
                            <i data-lucide="search" class="w-10 h-10 mb-2"></i>
                            <h3 class="font-bold text-xl text-center">Visibility</h3>
                        </div>
                        <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl flex flex-col items-center justify-center text-slate-700 shadow-lg border border-amber-200 p-6 text-center">
                            <ul class="text-sm space-y-2 text-left font-medium">
                                <li><i data-lucide="check" class="w-3 h-3 inline text-emerald-500"></i> Turn on "Open to Work"</li>
                                <li><i data-lucide="check" class="w-3 h-3 inline text-emerald-500"></i> Use clear keywords in headline</li>
                                <li><i data-lucide="check" class="w-3 h-3 inline text-emerald-500"></i> Complete all profile sections</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Flip Card 4 -->
                <div class="group h-48 perspective-1000 cursor-pointer">
                    <div class="relative w-full h-full transition-transform duration-700 transform-style-3d flip-card-inner">
                        <div class="absolute w-full h-full backface-hidden bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg p-4">
                            <i data-lucide="shield-check" class="w-10 h-10 mb-2"></i>
                            <h3 class="font-bold text-xl text-center">Professionalism</h3>
                        </div>
                        <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl flex flex-col items-center justify-center text-slate-700 shadow-lg border border-rose-200 p-6 text-center">
                            <ul class="text-sm space-y-2 text-left font-medium">
                                <li><i data-lucide="check" class="w-3 h-3 inline text-emerald-500"></i> Keep information honest/accurate</li>
                                <li><i data-lucide="check" class="w-3 h-3 inline text-emerald-500"></i> Check spelling and grammar</li>
                                <li><i data-lucide="check" class="w-3 h-3 inline text-emerald-500"></i> Use high quality profile picture</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 6: Common Mistakes -->
        <div class="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 mb-12">
            <h2 class="text-3xl font-extrabold text-slate-800 mb-8 flex items-center gap-3"><i data-lucide="alert-triangle" class="text-rose-500"></i> Common Mistakes</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- WRONG -->
                <div class="bg-rose-50 p-6 rounded-2xl border border-rose-200 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 bg-rose-500 text-white p-3 rounded-bl-2xl font-bold shadow-md"><i data-lucide="x" class="w-6 h-6"></i></div>
                    <h3 class="text-xl font-bold text-rose-700 mb-6 border-b border-rose-200 pb-2">What to Avoid</h3>
                    <ul class="space-y-4">
                        <li class="flex items-center gap-3 text-rose-800 bg-white/60 p-3 rounded-xl shadow-sm"><i data-lucide="x-circle" class="w-5 h-5 text-rose-500 shrink-0"></i> Casual selfie profile photo</li>
                        <li class="flex items-center gap-3 text-rose-800 bg-white/60 p-3 rounded-xl shadow-sm"><i data-lucide="x-circle" class="w-5 h-5 text-rose-500 shrink-0"></i> Empty headline ("Student at X College")</li>
                        <li class="flex items-center gap-3 text-rose-800 bg-white/60 p-3 rounded-xl shadow-sm"><i data-lucide="x-circle" class="w-5 h-5 text-rose-500 shrink-0"></i> Empty About section</li>
                        <li class="flex items-center gap-3 text-rose-800 bg-white/60 p-3 rounded-xl shadow-sm"><i data-lucide="x-circle" class="w-5 h-5 text-rose-500 shrink-0"></i> Treating LinkedIn like Facebook</li>
                    </ul>
                </div>
                <!-- RIGHT -->
                <div class="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 bg-emerald-500 text-white p-3 rounded-bl-2xl font-bold shadow-md"><i data-lucide="check" class="w-6 h-6"></i></div>
                    <h3 class="text-xl font-bold text-emerald-700 mb-6 border-b border-emerald-200 pb-2">What to Do Instead</h3>
                    <ul class="space-y-4">
                        <li class="flex items-center gap-3 text-emerald-800 bg-white/60 p-3 rounded-xl shadow-sm"><i data-lucide="check-circle" class="w-5 h-5 text-emerald-500 shrink-0"></i> Professional headshot</li>
                        <li class="flex items-center gap-3 text-emerald-800 bg-white/60 p-3 rounded-xl shadow-sm"><i data-lucide="check-circle" class="w-5 h-5 text-emerald-500 shrink-0"></i> Headline with skills/goals</li>
                        <li class="flex items-center gap-3 text-emerald-800 bg-white/60 p-3 rounded-xl shadow-sm"><i data-lucide="check-circle" class="w-5 h-5 text-emerald-500 shrink-0"></i> Detailed About section</li>
                        <li class="flex items-center gap-3 text-emerald-800 bg-white/60 p-3 rounded-xl shadow-sm"><i data-lucide="check-circle" class="w-5 h-5 text-emerald-500 shrink-0"></i> Keep posts professional</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
};
window.checkLinkedInCompletion = () => {
    const checkboxes = document.querySelectorAll('#linkedin-checklist input[type="checkbox"]');
    let allChecked = true;
    checkboxes.forEach(cb => { if(!cb.checked) allChecked = false; });
    const msg = document.getElementById('linkedin-completion-msg');
    if(allChecked) { msg.classList.remove('hidden'); } else { msg.classList.add('hidden'); }
};