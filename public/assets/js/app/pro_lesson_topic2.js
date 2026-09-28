
let proTopic2State = {
    currentStep: 0,
    viewMode: 'split', // 'split' | 'form' | 'preview'
    formData: {
        name: 'Ananya Krishnan',
        title: 'Full Stack Developer',
        phone: '+91 98765 43210',
        email: 'ananya.k@gmail.com',
        dob: '2001-05-15',
        city: 'Chennai',
        state: 'Tamil Nadu',
        linkedin: 'linkedin.com/in/ananya',
        github: 'github.com/ananya-dev',
        portfolio: 'ananya.dev',
        summary: 'Passionate Full Stack Developer with experience in building scalable web applications. Adept at leveraging modern frameworks like React and Node.js to deliver high-performance solutions.',
        education: [
            { id: 1, degree: 'B.Tech Computer Science', branch: 'CSE', college: 'PSG College of Technology', university: 'Anna University', cgpa: '8.7', gradYear: '2025' }
        ],
        skills: {
            programming: ['Python', 'JavaScript', 'Java', 'C++'],
            web: ['React', 'HTML', 'CSS', 'Node.js'],
            backend: ['Django'],
            database: ['SQL', 'MongoDB'],
            tools: ['Git', 'GitHub', 'VS Code'],
            uiux: [],
            data: []
        },
        additionalSkills: '',
        projects: [
            { id: 1, title: 'E-Commerce Microservices', tech: 'React, Node.js, MongoDB', duration: 'Jan 2024 - Mar 2024', desc: 'Developed a high-throughput backend using Node.js and MongoDB. Reduced API response latency by 35% across 1,000+ daily active users.', github: 'github.com/ananya-dev/ecommerce', demo: '' }
        ],
        experience: [
            { id: 1, company: 'Zoho Corporation', role: 'Software Developer Intern', duration: 'May 2024 - Jul 2024', responsibilities: 'Automated QA testing scripts using Python, decreasing manual testing cycle duration by 45%.' }
        ],
        certifications: [
            { id: 1, name: 'AWS Cloud Practitioner', org: 'AWS', year: '2024' }
        ],
        achievements: [
            { id: 1, achievement: 'Smart India Hackathon Finalist', competition: 'SIH', award: 'Finalist', rank: 'Top 10', desc: 'Built AI solution for healthcare.' }
        ],
        languages: [
            { id: 1, name: 'English', proficiency: 'Advanced' },
            { id: 2, name: 'Tamil', proficiency: 'Native' }
        ],
        interests: ['Open Source Contributing', 'Tech Blogging']
    },
    isGenerating: false
};

window.proTopic2SetViewMode = (mode) => {
    proTopic2State.viewMode = mode;
    window.renderResumeBuildingModule(2);
};

window.proTopic2UpdateForm = (field, value) => {
    proTopic2State.formData[field] = value;
    window.renderResumeBuildingModule(2, true); // true = soft render (only update preview)
};
window.proTopic2UpdateArrayItem = (arrayName, id, field, value) => {
    const arr = proTopic2State.formData[arrayName];
    const item = arr.find(x => x.id === id);
    if(item) {
        item[field] = value;
        window.renderResumeBuildingModule(2, true);
    }
};
window.proTopic2AddArrayItem = (arrayName, defaultObj) => {
    const arr = proTopic2State.formData[arrayName];
    defaultObj.id = Date.now();
    arr.push(defaultObj);
    window.renderResumeBuildingModule(2);
};
window.proTopic2RemoveArrayItem = (arrayName, id) => {
    proTopic2State.formData[arrayName] = proTopic2State.formData[arrayName].filter(x => x.id !== id);
    window.renderResumeBuildingModule(2);
};
window.proTopic2ToggleSkill = (category, skill) => {
    const catArray = proTopic2State.formData.skills[category] || [];
    if(catArray.includes(skill)) {
        proTopic2State.formData.skills[category] = catArray.filter(s => s !== skill);
    } else {
        catArray.push(skill);
        proTopic2State.formData.skills[category] = catArray;
    }
    window.renderResumeBuildingModule(2);
};
window.proTopic2SetStep = (step) => {
    proTopic2State.currentStep = step;
    window.renderResumeBuildingModule(2);
};

window.proTopic2SimulateAI = (type, id = null) => {
    // Show some loading state or alert
    const btn = event.currentTarget;
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Generating...';
    btn.disabled = true;
    
    setTimeout(() => {
        if(type === 'summary') {
            proTopic2State.formData.summary = "A highly motivated Software Engineer with expertise in full-stack development, cloud architecture, and agile methodologies. Proven track record of delivering scalable web applications and optimizing backend systems to improve performance by 40%. Passionate about continuous learning and contributing to innovative tech solutions.";
        } else if(type === 'projectDesc') {
            const arr = proTopic2State.formData.projects;
            const item = arr.find(x => x.id === id);
            if(item) {
                item.desc = "Spearheaded the design and deployment of a microservices architecture. Engineered RESTful APIs that increased data retrieval speeds by 30%. Implemented automated CI/CD pipelines, reducing deployment times by 50%.";
            }
        } else if(type === 'expResp') {
            const arr = proTopic2State.formData.experience;
            const item = arr.find(x => x.id === id);
            if(item) {
                item.responsibilities = "Collaborated with cross-functional teams to deliver software features 2 weeks ahead of schedule. Resolved 50+ critical bugs, improving overall system stability by 25%. Streamlined database queries, resulting in a 20% reduction in server load.";
            }
        }
        btn.innerHTML = originalHtml;
        btn.disabled = false;
        window.renderResumeBuildingModule(2);
    }, 1500);
};

window.proTopic2PrintResume = () => {
    const resumeDoc = document.getElementById('resume-preview-doc');
    if(!resumeDoc) return;
    
    // Create an iframe to isolate the print styles from the LMS
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write('<html><head><title>ATS Resume</title>');
    
    // Copy stylesheets
    const links = document.querySelectorAll('link[rel="stylesheet"], style');
    links.forEach(l => {
        // Only include tailwind/custom styles, skip the print hack
        if(l.id !== 'resume-print-css') {
            doc.write(l.outerHTML);
        }
    });
    
    doc.write('<style>@media print { body, html { padding: 0 !important; margin: 0 !important; background: white !important; } #resume-preview-doc { box-shadow: none !important; border: none !important; width: 100% !important; max-width: none !important; padding: 2cm !important; margin: 0 !important; transform: none !important; position: static !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; } @page { margin: 0; } }</style>');
    doc.write('</head><body class="bg-white m-0 p-0">');
    doc.write(resumeDoc.outerHTML);
    doc.write('</body></html>');
    doc.close();
    
    iframe.contentWindow.focus();
    setTimeout(() => {
        iframe.contentWindow.print();
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    }, 500);
};

window.completeProLesson = (day) => {
    const progress = window.LocalDB ? window.LocalDB.getProgress(window.viewingStudentUsername) : { completedLessons: [] };
    if (!progress.completedLessons) progress.completedLessons = [];
    if (!progress.completedLessons.includes('pro_' + day)) {
        progress.completedLessons.push('pro_' + day);
        if (window.LocalDB) window.LocalDB.saveProgress(window.viewingStudentUsername, progress);
        if (window.updateSidebarProgress) window.updateSidebarProgress();
    }
    alert('Congratulations! You have completed the ATS Resume Builder and earned +100 XP!');
    if (window.proSyllabus && window.proSyllabus[parseInt(day) + 1]) {
        window.showView('pro_lesson', { day: parseInt(day) + 1 });
    } else {
        window.renderDashboard();
    }
};

function renderWizardForm() {
    const step = proTopic2State.currentStep;
    const f = proTopic2State.formData;
    let html = '';
    
    if(step === 0) {
        html += `
            <div class="text-center space-y-6 py-10">
                <div class="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                    <i data-lucide="file-text" class="w-10 h-10"></i>
                </div>
                <div>
                    <h1 class="text-3xl font-black text-slate-900 mt-3 leading-tight">Welcome to SPOKO ATS Resume Builder</h1>
                    <p class="text-slate-600 text-base mt-3">Let's build your professional ATS-friendly resume step by step.</p>
                </div>
                <div class="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full font-bold text-sm">
                    <i data-lucide="clock" class="w-4 h-4"></i> Estimated Time: 15-20 Minutes
                </div>
                <div class="pt-6">
                    <button onclick="window.proTopic2SetStep(1)" class="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 mx-auto">
                        <i data-lucide="play" class="w-6 h-6"></i> Start Building
                    </button>
                </div>
            </div>
        `;
    } else if(step === 1) {
        html += `
            <h2 class="text-2xl font-black text-slate-900 mb-4">Step 1: Personal Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label class="block text-xs font-bold text-slate-700 mb-1">Full Name</label><input type="text" value="${f.name}" oninput="window.proTopic2UpdateForm('name', this.value)" class="w-full text-sm p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500"></div>
                <div><label class="block text-xs font-bold text-slate-700 mb-1">Professional Title</label><input type="text" value="${f.title}" oninput="window.proTopic2UpdateForm('title', this.value)" class="w-full text-sm p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500"></div>
                <div><label class="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label><input type="text" value="${f.phone}" oninput="window.proTopic2UpdateForm('phone', this.value)" class="w-full text-sm p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500"></div>
                <div><label class="block text-xs font-bold text-slate-700 mb-1">Email Address</label><input type="email" value="${f.email}" oninput="window.proTopic2UpdateForm('email', this.value)" class="w-full text-sm p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500"></div>
                <div><label class="block text-xs font-bold text-slate-700 mb-1">City</label><input type="text" value="${f.city}" oninput="window.proTopic2UpdateForm('city', this.value)" class="w-full text-sm p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500"></div>
                <div><label class="block text-xs font-bold text-slate-700 mb-1">State</label><input type="text" value="${f.state}" oninput="window.proTopic2UpdateForm('state', this.value)" class="w-full text-sm p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500"></div>
                <div><label class="block text-xs font-bold text-slate-700 mb-1">LinkedIn URL</label><input type="text" value="${f.linkedin}" oninput="window.proTopic2UpdateForm('linkedin', this.value)" class="w-full text-sm p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500"></div>
                <div><label class="block text-xs font-bold text-slate-700 mb-1">GitHub URL</label><input type="text" value="${f.github}" oninput="window.proTopic2UpdateForm('github', this.value)" class="w-full text-sm p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500"></div>
                <div class="md:col-span-2"><label class="block text-xs font-bold text-slate-700 mb-1">Portfolio Website (Optional)</label><input type="text" value="${f.portfolio}" oninput="window.proTopic2UpdateForm('portfolio', this.value)" class="w-full text-sm p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500"></div>
            </div>
        `;
    } else if (step === 2) {
        html += `
            <h2 class="text-2xl font-black text-slate-900 mb-4">Step 2: Professional Summary</h2>
            <p class="text-sm text-slate-600 mb-4">Write 3-5 lines about yourself, highlighting your goals and top skills.</p>
            <div class="mb-4">
                <button onclick="window.proTopic2SimulateAI('summary')" class="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold text-sm rounded-xl flex items-center gap-2 transition-all">
                    <i data-lucide="sparkles" class="w-4 h-4"></i> Generate with AI
                </button>
            </div>
            <textarea oninput="window.proTopic2UpdateForm('summary', this.value)" rows="6" class="w-full text-sm p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500">${f.summary}</textarea>
        `;
    } else if (step === 3) {
        html += `
            <h2 class="text-2xl font-black text-slate-900 mb-4">Step 3: Education</h2>
            <div class="space-y-4">
                ${f.education.map((edu, idx) => `
                    <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                        <button onclick="window.proTopic2RemoveArrayItem('education', ${edu.id})" class="absolute top-2 right-2 text-rose-500 hover:text-rose-700"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        <h3 class="font-bold text-slate-700 text-sm mb-2">Education Record ${idx+1}</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div><label class="block text-[10px] font-bold text-slate-500">Degree</label><input type="text" value="${edu.degree}" oninput="window.proTopic2UpdateArrayItem('education', ${edu.id}, 'degree', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            <div><label class="block text-[10px] font-bold text-slate-500">Branch</label><input type="text" value="${edu.branch}" oninput="window.proTopic2UpdateArrayItem('education', ${edu.id}, 'branch', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            <div><label class="block text-[10px] font-bold text-slate-500">College</label><input type="text" value="${edu.college}" oninput="window.proTopic2UpdateArrayItem('education', ${edu.id}, 'college', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            <div><label class="block text-[10px] font-bold text-slate-500">University</label><input type="text" value="${edu.university}" oninput="window.proTopic2UpdateArrayItem('education', ${edu.id}, 'university', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            <div><label class="block text-[10px] font-bold text-slate-500">CGPA / %</label><input type="text" value="${edu.cgpa}" oninput="window.proTopic2UpdateArrayItem('education', ${edu.id}, 'cgpa', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            <div><label class="block text-[10px] font-bold text-slate-500">Graduation Year</label><input type="text" value="${edu.gradYear}" oninput="window.proTopic2UpdateArrayItem('education', ${edu.id}, 'gradYear', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                        </div>
                    </div>
                `).join('')}
                <button onclick="window.proTopic2AddArrayItem('education', {degree:'',branch:'',college:'',university:'',cgpa:'',gradYear:''})" class="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all text-sm flex items-center justify-center gap-2">
                    <i data-lucide="plus" class="w-4 h-4"></i> Add Education
                </button>
            </div>
        `;
    } else if (step === 4) {
        const renderSkillGroup = (title, categoryKey, availableSkills) => {
            return `
                <div class="mb-4">
                    <h3 class="font-bold text-sm text-slate-800 mb-2">${title}</h3>
                    <div class="flex flex-wrap gap-2">
                        ${availableSkills.map(sk => {
                            const isSel = (f.skills[categoryKey] || []).includes(sk);
                            return `<button onclick="window.proTopic2ToggleSkill('${categoryKey}', '${sk}')" class="px-3 py-1.5 border rounded-lg text-xs font-bold ${isSel ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'}">${sk}</button>`;
                        }).join('')}
                    </div>
                </div>
            `;
        };
        html += `
            <h2 class="text-2xl font-black text-slate-900 mb-4">Step 4: Technical Skills</h2>
            ${renderSkillGroup('Programming Languages', 'programming', ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript'])}
            ${renderSkillGroup('Web Technologies', 'web', ['HTML', 'CSS', 'React', 'Angular', 'Vue', 'TailwindCSS'])}
            ${renderSkillGroup('Backend Frameworks', 'backend', ['Django', 'Node.js', 'Express', 'Spring Boot', 'Flask'])}
            ${renderSkillGroup('Databases', 'database', ['SQL', 'MySQL', 'MongoDB', 'PostgreSQL', 'Redis'])}
            ${renderSkillGroup('Tools & Cloud', 'tools', ['Git', 'GitHub', 'Docker', 'AWS', 'Power BI', 'VS Code', 'Kubernetes'])}
            ${renderSkillGroup('UI/UX & Design', 'uiux', ['Figma', 'Adobe XD', 'UI/UX Design', 'Wireframing'])}
            ${renderSkillGroup('Data & Analytics', 'data', ['Data Analytics', 'Pandas', 'Tableau', 'Excel'])}
            
            <div class="mt-4 pt-4 border-t border-slate-200">
                <h3 class="font-bold text-sm text-slate-800 mb-2">Additional Skills</h3>
                <input type="text" placeholder="e.g. Project Management, Agile, Communication (comma separated)" oninput="window.proTopic2UpdateForm('additionalSkills', this.value)" class="w-full text-sm p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500" value="${f.additionalSkills || ''}">
            </div>
        `;
    } else if (step === 5) {
        html += `
            <h2 class="text-2xl font-black text-slate-900 mb-4">Step 5: Projects</h2>
            <div class="space-y-4">
                ${f.projects.map((proj, idx) => `
                    <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                        <button onclick="window.proTopic2RemoveArrayItem('projects', ${proj.id})" class="absolute top-2 right-2 text-rose-500 hover:text-rose-700"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        <h3 class="font-bold text-slate-700 text-sm mb-2">Project ${idx+1}</h3>
                        <div class="grid grid-cols-1 gap-3">
                            <div><label class="block text-[10px] font-bold text-slate-500">Project Title</label><input type="text" value="${proj.title}" oninput="window.proTopic2UpdateArrayItem('projects', ${proj.id}, 'title', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            <div class="grid grid-cols-2 gap-3">
                                <div><label class="block text-[10px] font-bold text-slate-500">Technologies Used</label><input type="text" value="${proj.tech}" oninput="window.proTopic2UpdateArrayItem('projects', ${proj.id}, 'tech', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                                <div><label class="block text-[10px] font-bold text-slate-500">Duration</label><input type="text" value="${proj.duration}" oninput="window.proTopic2UpdateArrayItem('projects', ${proj.id}, 'duration', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 mb-1">Description (Bullet points recommended)</label>
                                <button onclick="window.proTopic2SimulateAI('projectDesc', ${proj.id})" class="mb-2 px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold text-[10px] rounded flex items-center gap-1 transition-all"><i data-lucide="sparkles" class="w-3 h-3"></i> Improve with AI</button>
                                <textarea rows="3" oninput="window.proTopic2UpdateArrayItem('projects', ${proj.id}, 'desc', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500">${proj.desc}</textarea>
                            </div>
                            <div class="grid grid-cols-2 gap-3">
                                <div><label class="block text-[10px] font-bold text-slate-500">GitHub Link</label><input type="text" value="${proj.github}" oninput="window.proTopic2UpdateArrayItem('projects', ${proj.id}, 'github', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                                <div><label class="block text-[10px] font-bold text-slate-500">Live Demo Link</label><input type="text" value="${proj.demo}" oninput="window.proTopic2UpdateArrayItem('projects', ${proj.id}, 'demo', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            </div>
                        </div>
                    </div>
                `).join('')}
                <button onclick="window.proTopic2AddArrayItem('projects', {title:'',tech:'',duration:'',desc:'',github:'',demo:''})" class="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all text-sm flex items-center justify-center gap-2">
                    <i data-lucide="plus" class="w-4 h-4"></i> Add Project
                </button>
            </div>
        `;
    } else if (step === 6) {
        html += `
            <h2 class="text-2xl font-black text-slate-900 mb-4">Step 6: Internship / Experience</h2>
            <div class="space-y-4">
                ${f.experience.map((exp, idx) => `
                    <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                        <button onclick="window.proTopic2RemoveArrayItem('experience', ${exp.id})" class="absolute top-2 right-2 text-rose-500 hover:text-rose-700"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        <h3 class="font-bold text-slate-700 text-sm mb-2">Experience ${idx+1}</h3>
                        <div class="grid grid-cols-1 gap-3">
                            <div><label class="block text-[10px] font-bold text-slate-500">Company Name</label><input type="text" value="${exp.company}" oninput="window.proTopic2UpdateArrayItem('experience', ${exp.id}, 'company', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            <div class="grid grid-cols-2 gap-3">
                                <div><label class="block text-[10px] font-bold text-slate-500">Job Title</label><input type="text" value="${exp.role}" oninput="window.proTopic2UpdateArrayItem('experience', ${exp.id}, 'role', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                                <div><label class="block text-[10px] font-bold text-slate-500">Duration</label><input type="text" value="${exp.duration}" oninput="window.proTopic2UpdateArrayItem('experience', ${exp.id}, 'duration', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 mb-1">Responsibilities & Achievements</label>
                                <button onclick="window.proTopic2SimulateAI('expResp', ${exp.id})" class="mb-2 px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold text-[10px] rounded flex items-center gap-1 transition-all"><i data-lucide="sparkles" class="w-3 h-3"></i> Rewrite Professionally</button>
                                <textarea rows="3" oninput="window.proTopic2UpdateArrayItem('experience', ${exp.id}, 'responsibilities', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500">${exp.responsibilities}</textarea>
                            </div>
                        </div>
                    </div>
                `).join('')}
                <button onclick="window.proTopic2AddArrayItem('experience', {company:'',role:'',duration:'',responsibilities:''})" class="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all text-sm flex items-center justify-center gap-2">
                    <i data-lucide="plus" class="w-4 h-4"></i> Add Experience
                </button>
            </div>
        `;
    } else if (step === 7) {
        html += `
            <h2 class="text-2xl font-black text-slate-900 mb-4">Step 7: Certifications</h2>
            <div class="space-y-4">
                ${f.certifications.map((cert, idx) => `
                    <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                        <button onclick="window.proTopic2RemoveArrayItem('certifications', ${cert.id})" class="absolute top-2 right-2 text-rose-500 hover:text-rose-700"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div><label class="block text-[10px] font-bold text-slate-500">Certificate Name</label><input type="text" value="${cert.name}" oninput="window.proTopic2UpdateArrayItem('certifications', ${cert.id}, 'name', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            <div><label class="block text-[10px] font-bold text-slate-500">Organization</label><input type="text" value="${cert.org}" oninput="window.proTopic2UpdateArrayItem('certifications', ${cert.id}, 'org', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            <div><label class="block text-[10px] font-bold text-slate-500">Year</label><input type="text" value="${cert.year}" oninput="window.proTopic2UpdateArrayItem('certifications', ${cert.id}, 'year', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                        </div>
                    </div>
                `).join('')}
                <button onclick="window.proTopic2AddArrayItem('certifications', {name:'',org:'',year:''})" class="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all text-sm flex items-center justify-center gap-2">
                    <i data-lucide="plus" class="w-4 h-4"></i> Add Certification
                </button>
            </div>
        `;
    } else if (step === 8) {
        html += `
            <h2 class="text-2xl font-black text-slate-900 mb-4">Step 8: Achievements</h2>
            <div class="space-y-4">
                ${f.achievements.map((ach, idx) => `
                    <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                        <button onclick="window.proTopic2RemoveArrayItem('achievements', ${ach.id})" class="absolute top-2 right-2 text-rose-500 hover:text-rose-700"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                            <div><label class="block text-[10px] font-bold text-slate-500">Achievement / Award</label><input type="text" value="${ach.achievement}" oninput="window.proTopic2UpdateArrayItem('achievements', ${ach.id}, 'achievement', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            <div><label class="block text-[10px] font-bold text-slate-500">Competition / Event</label><input type="text" value="${ach.competition}" oninput="window.proTopic2UpdateArrayItem('achievements', ${ach.id}, 'competition', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500">Description</label>
                            <input type="text" value="${ach.desc}" oninput="window.proTopic2UpdateArrayItem('achievements', ${ach.id}, 'desc', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500">
                        </div>
                    </div>
                `).join('')}
                <button onclick="window.proTopic2AddArrayItem('achievements', {achievement:'',competition:'',award:'',rank:'',desc:''})" class="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all text-sm flex items-center justify-center gap-2">
                    <i data-lucide="plus" class="w-4 h-4"></i> Add Achievement
                </button>
            </div>
        `;
    } else if (step === 9) {
        html += `
            <h2 class="text-2xl font-black text-slate-900 mb-4">Step 9: Languages</h2>
            <div class="space-y-4">
                ${f.languages.map((lang, idx) => `
                    <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                        <button onclick="window.proTopic2RemoveArrayItem('languages', ${lang.id})" class="absolute top-2 right-2 text-rose-500 hover:text-rose-700"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label class="block text-[10px] font-bold text-slate-500">Language</label><input type="text" value="${lang.name}" oninput="window.proTopic2UpdateArrayItem('languages', ${lang.id}, 'name', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500"></div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500">Proficiency</label>
                                <select onchange="window.proTopic2UpdateArrayItem('languages', ${lang.id}, 'proficiency', this.value)" class="w-full text-xs p-2 rounded-lg border outline-none focus:border-blue-500 bg-white">
                                    <option value="Beginner" ${lang.proficiency === 'Beginner' ? 'selected' : ''}>Beginner</option>
                                    <option value="Intermediate" ${lang.proficiency === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                                    <option value="Advanced" ${lang.proficiency === 'Advanced' ? 'selected' : ''}>Advanced</option>
                                    <option value="Native" ${lang.proficiency === 'Native' ? 'selected' : ''}>Native</option>
                                </select>
                            </div>
                        </div>
                    </div>
                `).join('')}
                <button onclick="window.proTopic2AddArrayItem('languages', {name:'',proficiency:'Intermediate'})" class="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all text-sm flex items-center justify-center gap-2">
                    <i data-lucide="plus" class="w-4 h-4"></i> Add Language
                </button>
            </div>
        `;
    } else if (step === 10) {
        html += `
            <h2 class="text-2xl font-black text-slate-900 mb-4">Step 10: Interests & Hobbies (Optional)</h2>
            <p class="text-sm text-slate-600 mb-4">Add technical or professional interests.</p>
            <textarea oninput="window.proTopic2UpdateForm('interests', this.value.split(',').map(s => s.trim()))" rows="3" class="w-full text-sm p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500" placeholder="e.g. Open Source, Machine Learning, Tech Blogging">${(f.interests || []).join(', ')}</textarea>
            <p class="text-[10px] text-slate-500 mt-2">Comma separated values.</p>
        `;
    } else if (step === 11) {
        // Validation / Score
        let score = 100;
        let msgs = [];
        if(!f.github && !f.linkedin) { score -= 15; msgs.push('Add LinkedIn & GitHub links'); }
        if(!f.summary || f.summary.length < 50) { score -= 10; msgs.push('Expand professional summary'); }
        if(!f.projects || f.projects.length === 0) { score -= 20; msgs.push('Add at least one project'); }
        if(!f.education || f.education.length === 0) { score -= 10; msgs.push('Add education details'); }
        
        html += `
            <div class="text-center space-y-6 py-4">
                <div class="text-6xl font-black ${score >= 80 ? 'text-emerald-500' : 'text-amber-500'}">${score}/100</div>
                <div class="text-sm font-bold text-slate-700">ATS Resume Score</div>
                
                ${msgs.length > 0 ? `
                    <div class="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-left text-sm space-y-2">
                        <div class="font-bold"><i data-lucide="alert-circle" class="w-4 h-4 inline"></i> Recommendations for you:</div>
                        <ul class="list-disc pl-5 text-xs">
                            ${msgs.map(m => `<li>${m}</li>`).join('')}
                        </ul>
                    </div>
                ` : `
                    <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-bold">
                        <i data-lucide="check-circle" class="w-4 h-4 inline"></i> Your resume is ATS optimized and ready!
                    </div>
                `}
                
                <div class="grid grid-cols-1 gap-3 pt-6">
                    <button onclick="window.proTopic2PrintResume()" class="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                        <i data-lucide="download" class="w-4 h-4"></i> Download PDF
                    </button>
                    <button onclick="window.proTopic2PrintResume()" class="w-full py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2">
                        <i data-lucide="file-text" class="w-4 h-4"></i> Download DOCX (Alternative)
                    </button>
                    <button onclick="window.completeProLesson(2)" class="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all mt-4">
                        Claim +100 XP & Finish
                    </button>
                </div>
            </div>
        `;
    }

    return html;
}

function renderPreview() {
    const f = proTopic2State.formData;
    
    // Formatting helpers
    const Section = (title, content) => content && content.trim().length > 0 ? `
        <div class="mb-4">
            <h3 class="text-[11px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">${title}</h3>
            ${content}
        </div>
    ` : '';

    const eduHtml = (f.education || []).map(edu => `
        <div class="mb-2">
            <div class="flex justify-between items-baseline font-bold text-[11px] text-slate-800">
                <span>${edu.college}${edu.university ? ', ' + edu.university : ''}</span>
                <span>${edu.gradYear}</span>
            </div>
            <div class="flex justify-between items-baseline text-[10.5px] text-slate-700 italic mt-0.5">
                <span>${edu.degree}${edu.branch ? ' in ' + edu.branch : ''}</span>
                <span>${edu.cgpa ? 'CGPA: ' + edu.cgpa : ''}</span>
            </div>
        </div>
    `).join('');

    const expHtml = (f.experience || []).map(exp => `
        <div class="mb-3">
            <div class="flex justify-between items-baseline font-bold text-[11px] text-slate-800">
                <span>${exp.company}</span>
                <span>${exp.duration}</span>
            </div>
            <div class="text-[10.5px] font-semibold text-slate-700 italic mt-0.5 mb-1">${exp.role}</div>
            <ul class="list-disc pl-4 text-[10.5px] text-slate-600 leading-snug space-y-0.5">
                ${exp.responsibilities.split('.').filter(x => x.trim()).map(x => `<li>${x.trim()}</li>`).join('')}
            </ul>
        </div>
    `).join('');

    const projHtml = (f.projects || []).map(proj => `
        <div class="mb-3">
            <div class="flex justify-between items-baseline text-[11px]">
                <span class="font-bold text-slate-800">${proj.title}</span>
                <span class="text-slate-600 italic font-medium">${proj.duration}</span>
            </div>
            <div class="text-[10px] text-slate-500 mb-1 font-mono">${proj.tech} ${proj.github ? ' | ' + proj.github : ''}</div>
            <ul class="list-disc pl-4 text-[10.5px] text-slate-600 leading-snug space-y-0.5">
                ${proj.desc.split('.').filter(x => x.trim()).map(x => `<li>${x.trim()}</li>`).join('')}
            </ul>
        </div>
    `).join('');

    let skillsHtml = Object.entries(f.skills || {}).map(([cat, arr]) => {
        if(arr.length === 0) return '';
        const dict = { 'uiux': 'UI/UX Design', 'data': 'Data Analytics', 'programming': 'Programming', 'web': 'Web', 'backend': 'Backend', 'database': 'Databases', 'tools': 'Tools' };
        const catName = dict[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1));
        return `<div class="text-[10.5px] mb-1"><span class="font-bold text-slate-700">${catName}:</span> <span class="text-slate-600">${arr.join(', ')}</span></div>`;
    }).join('');

    if (f.additionalSkills && f.additionalSkills.trim()) {
        skillsHtml += `<div class="text-[10.5px] mb-1"><span class="font-bold text-slate-700">Additional Skills:</span> <span class="text-slate-600">${f.additionalSkills}</span></div>`;
    }

    const certHtml = (f.certifications || []).map(c => `
        <div class="flex justify-between items-baseline text-[10.5px] mb-1">
            <span class="font-bold text-slate-700">${c.name} - <span class="font-normal italic text-slate-600">${c.org}</span></span>
            <span class="text-slate-600">${c.year}</span>
        </div>
    `).join('');

    const achHtml = (f.achievements || []).map(a => `
        <div class="text-[10.5px] mb-1">
            <span class="font-bold text-slate-700">${a.achievement}</span> (${a.competition}) - ${a.desc}
        </div>
    `).join('');

    return `
        <div id="resume-preview-doc" class="bg-white w-full max-w-[21cm] mx-auto min-h-[29.7cm] shadow-2xl p-8 md:p-12 font-serif text-slate-900 border border-slate-200 printable-resume">
            <!-- Header -->
            <div class="text-center border-b-[1.5px] border-slate-800 pb-4 mb-4">
                <h1 class="text-2xl font-bold uppercase tracking-wide text-slate-900">${f.name || 'Your Name'}</h1>
                <div class="text-[11px] text-slate-600 mt-2 flex flex-wrap justify-center gap-3 items-center">
                    ${f.phone ? `<span>${f.phone}</span>` : ''}
                    ${f.email ? `<span class="text-slate-300">|</span><span>${f.email}</span>` : ''}
                    ${f.city || f.state ? `<span class="text-slate-300">|</span><span>${f.city}, ${f.state}</span>` : ''}
                    ${f.linkedin ? `<span class="text-slate-300">|</span><a href="https://${f.linkedin}" class="text-blue-600">${f.linkedin}</a>` : ''}
                    ${f.github ? `<span class="text-slate-300">|</span><a href="https://${f.github}" class="text-blue-600">${f.github}</a>` : ''}
                </div>
            </div>

            <!-- Content Sections -->
            ${Section('Professional Summary', f.summary ? `<p class="text-[10.5px] text-slate-700 leading-snug">${f.summary}</p>` : '')}
            ${Section('Education', eduHtml)}
            ${Section('Experience', expHtml)}
            ${Section('Projects', projHtml)}
            ${Section('Technical Skills', skillsHtml)}
            ${Section('Certifications', certHtml)}
            ${Section('Achievements', achHtml)}
            
            ${f.interests && f.interests.length > 0 ? `
                <div class="mb-4">
                    <h3 class="text-[11px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">Interests</h3>
                    <p class="text-[10.5px] text-slate-700">${f.interests.join(', ')}</p>
                </div>
            ` : ''}
        </div>
    `;
}

window.renderResumeBuildingModule = (day, isSoftUpdate = false) => {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    // Optional: inject print CSS globally if not present
    if(!document.getElementById('resume-print-css')) {
        const style = document.createElement('style');
        style.id = 'resume-print-css';
        style.innerHTML = `
            @media print {
                body * { visibility: hidden; }
                #resume-preview-doc, #resume-preview-doc * { visibility: visible; }
                #resume-preview-doc {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    max-width: none;
                    margin: 0;
                    padding: 0;
                    box-shadow: none;
                    border: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    if(isSoftUpdate) {
        // Just update preview panel if possible to avoid losing input focus
        const previewPanel = document.getElementById('resume-live-preview-container');
        if(previewPanel) {
            previewPanel.innerHTML = renderPreview();
            return;
        }
    }

    const titleEl = document.getElementById('headerTitle');
    if (titleEl) {
        titleEl.innerHTML = `<div class="p-2 bg-blue-50 rounded-lg text-blue-600 hidden sm:block"><i data-lucide="file-text" class="w-5 h-5"></i></div> <span class="truncate">Professional Track: ATS Resume Builder</span>`;
    }

    const totalSteps = 11;
    const currentStep = proTopic2State.currentStep;
    const viewMode = proTopic2State.viewMode || 'split';

    const html = `
        <div class="max-w-[1600px] mx-auto px-2 sm:px-4 pb-20 animate-fade-in font-sans">
            
            <!-- STEPPER HEADER -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-4 w-full md:w-auto">
                    ${currentStep > 0 ? `<button onclick="window.proTopic2SetStep(${currentStep-1})" class="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-all shrink-0"><i data-lucide="chevron-left" class="w-5 h-5"></i></button>` : ''}
                    <div>
                        <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</div>
                        <div class="font-bold text-slate-800 text-lg">Step ${currentStep} of ${totalSteps}</div>
                    </div>
                </div>

                <!-- View Mode Switcher -->
                <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button onclick="window.proTopic2SetViewMode('split')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'split' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                        <i data-lucide="columns" class="w-3.5 h-3.5 inline mr-1"></i> Split View
                    </button>
                    <button onclick="window.proTopic2SetViewMode('preview')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                        <i data-lucide="eye" class="w-3.5 h-3.5 inline mr-1"></i> Preview Mode
                    </button>
                    <button onclick="window.proTopic2SetViewMode('form')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'form' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                        <i data-lucide="edit-3" class="w-3.5 h-3.5 inline mr-1"></i> Form Mode
                    </button>
                </div>

                <div class="w-full md:w-1/4">
                    <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div class="bg-blue-600 h-full transition-all duration-500" style="width: ${(currentStep / totalSteps) * 100}%"></div>
                    </div>
                </div>

                ${currentStep > 0 && currentStep < totalSteps ? `
                    <button onclick="window.proTopic2SetStep(${currentStep+1})" class="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0">
                        Next Step <i data-lucide="chevron-right" class="w-4 h-4"></i>
                    </button>
                ` : ''}
            </div>

            <!-- MAIN GRID -->
            <div class="grid grid-cols-1 ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-8 items-start">
                
                <!-- LEFT: FORM WIZARD -->
                <div class="${viewMode === 'preview' ? 'hidden' : 'block'} ${viewMode === 'form' ? 'max-w-3xl mx-auto w-full' : 'w-full'} bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 relative">
                    ${renderWizardForm()}
                </div>

                <!-- RIGHT: LIVE PREVIEW (STICKY) -->
                <div class="${viewMode === 'form' ? 'hidden' : 'block'} ${viewMode === 'preview' ? 'max-w-4xl mx-auto w-full' : 'w-full'} lg:sticky lg:top-6">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                        <div class="flex items-center gap-2">
                            <div class="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                                <i data-lucide="file-check" class="w-4 h-4"></i>
                            </div>
                            <span class="font-bold text-slate-800 text-sm">Live ATS Resume Preview</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="window.proTopic2PrintResume()" class="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5">
                                <i data-lucide="printer" class="w-3.5 h-3.5"></i> Print / PDF
                            </button>
                            <span class="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Auto-Syncing
                            </span>
                        </div>
                    </div>
                    <div id="resume-live-preview-container" class="rounded-2xl overflow-y-auto max-h-[85vh] border border-slate-200 shadow-sm bg-slate-50 p-4">
                        ${renderPreview()}
                    </div>
                </div>

            </div>
        </div>
    `;

    mainContent.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
};
