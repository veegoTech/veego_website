// User Management Dashboard

window.renderManagement = (container) => {
    const currentUser = JSON.parse(sessionStorage.getItem('alphafly_currentUser'));
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
        container.innerHTML = '<div class="p-10 text-red-500">Access Denied.</div>';
        return;
    }

    const isAdmin = currentUser.role === 'admin';
    const users = isAdmin ? window.LocalDB.getAllStaff() : window.LocalDB.getAllStudents();
    const title = isAdmin ? 'Staff Management' : 'Student Management';
    const subtitle = isAdmin ? 'Manage staff members and their access.' : 'Manage enrolled students and assign levels.';
    const addLabel = isAdmin ? 'Add New Staff' : 'Add New Student';

    let pendingValidationsHtml = '';
    if (!isAdmin) {
        let pendingRows = [];
        const allStudents = window.LocalDB.getAllStudents();
        allStudents.forEach(student => {
            const progress = window.LocalDB.getProgress(student.username);
            if (progress && progress.pendingValidation && progress.pendingValidation.length > 0) {
                progress.pendingValidation.forEach(lessonId => {
                    const [levelStr, dayStr] = lessonId.split('_');
                    const trackName = levelStr === 'pro' ? 'Professional' : `Level ${levelStr}`;
                    pendingRows.push(`
                        <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div>
                                <p class="font-bold text-slate-800">${student.name} <span class="text-xs text-slate-500 font-medium">(@${student.username})</span></p>
                                <p class="text-xs font-bold text-amber-500 uppercase tracking-wider mt-1">${trackName} - Day ${dayStr}</p>
                            </div>
                            <button onclick="window.approveLessonValidation('${student.username}', '${levelStr}', ${dayStr})" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg shadow shadow-emerald-500/20 transition-colors text-sm flex items-center gap-2">
                                <i class="fas fa-check"></i> Approve
                            </button>
                        </div>
                    `);
                });
            }
        });
        
        if (pendingRows.length > 0) {
            pendingValidationsHtml = `
                <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                    <h3 class="font-bold text-slate-800 mb-6 flex items-center gap-3 text-lg">
                        <div class="p-2 bg-amber-50 text-amber-500 rounded-lg"><i class="fas fa-clipboard-check"></i></div> Pending Validations
                    </h3>
                    <div class="space-y-3">
                        ${pendingRows.join('')}
                    </div>
                </div>
            `;
        }
    }
    
    window.approveLessonValidation = (username, level, day) => {
        window.LocalDB.approveLesson(username, level, day);
        alert('Lesson Approved!');
        window.renderManagement(container);
    };

    // Form submission handler
    window.handleUserSubmit = (e) => {
        e.preventDefault();
        
        const name = document.getElementById('new-name').value.trim();
        const username = document.getElementById('new-username').value.trim();
        const password = document.getElementById('new-password').value.trim();
        const level = isAdmin ? null : document.getElementById('new-level').value;

        const role = isAdmin ? 'staff' : 'student';

        try {
            window.LocalDB.addUser(currentUser.role, {
                name,
                username,
                password,
                role,
                level: level === 'pro' ? 'pro' : (level ? parseInt(level) : undefined)
            });
            
            // Re-render
            window.renderManagement(container);
            
            // Show toast or alert (using basic alert for demo simplicity)
            alert(`${role.charAt(0).toUpperCase() + role.slice(1)} added successfully!`);
            
        } catch (err) {
            alert(err.message);
        }
    };

    window.promptEditPassword = (username) => {
        const newPassword = prompt(`Enter a new password for @${username}:`);
        if (newPassword && newPassword.trim()) {
            try {
                window.LocalDB.updateUserPassword(username, newPassword.trim());
                alert(`Password updated successfully for @${username}`);
                window.renderManagement(container);
            } catch(e) {
                alert(e.message);
            }
        }
    };

    window.promptDeleteUser = (username) => {
        if (confirm(`Are you sure you want to permanently delete @${username}? This action cannot be undone.`)) {
            try {
                window.LocalDB.deleteUser(username);
                alert(`User @${username} deleted successfully.`);
                window.renderManagement(container);
            } catch(e) {
                alert(e.message);
            }
        }
    };

    window.openAssignModal = (username, name) => {
        const assignments = window.LocalDB.getAssignments(username);
        
        const modalHtml = `
            <div id="assignModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
                <div class="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
                    <div class="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 class="text-xl font-extrabold text-slate-800">Assign Courses</h3>
                            <p class="text-sm font-medium text-slate-500 mt-1">Student: <span class="font-bold text-indigo-600">${name}</span></p>
                        </div>
                        <button onclick="document.getElementById('assignModal').remove()" class="text-slate-400 hover:text-rose-500 transition-colors">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="p-6 space-y-4">
                        <label class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all hover:bg-slate-50 ${assignments.level1 ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'}">
                            <input type="checkbox" id="chk-level1" class="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" ${assignments.level1 ? 'checked' : ''}>
                            <div class="flex-1">
                                <p class="font-bold text-slate-800">Level 1</p>
                                <p class="text-xs text-slate-500">Foundation English (45 Days)</p>
                            </div>
                        </label>
                        <label class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all hover:bg-slate-50 ${assignments.level2 ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'}">
                            <input type="checkbox" id="chk-level2" class="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" ${assignments.level2 ? 'checked' : ''}>
                            <div class="flex-1">
                                <p class="font-bold text-slate-800">Level 2</p>
                                <p class="text-xs text-slate-500">Intermediate English</p>
                            </div>
                        </label>
                        <label class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all hover:bg-slate-50 ${assignments.level3 ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'}">
                            <input type="checkbox" id="chk-level3" class="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" ${assignments.level3 ? 'checked' : ''}>
                            <div class="flex-1">
                                <p class="font-bold text-slate-800">Level 3</p>
                                <p class="text-xs text-slate-500">Advanced English</p>
                            </div>
                        </label>
                        <label class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all hover:bg-slate-50 ${assignments.pro ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'}">
                            <input type="checkbox" id="chk-pro" class="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" ${assignments.pro ? 'checked' : ''}>
                            <div class="flex-1">
                                <p class="font-bold text-slate-800">Professional Track</p>
                                <p class="text-xs text-slate-500">IT & Workplace Comm (16 Days)</p>
                            </div>
                        </label>
                    </div>
                    <div class="p-6 bg-slate-50 border-t border-slate-100">
                        <button onclick="window.saveAssignments('${username}')" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200">
                            Save Assignments
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Add listeners to style selected cards
        ['level1', 'level2', 'level3', 'pro'].forEach(course => {
            const chk = document.getElementById(`chk-${course}`);
            chk.addEventListener('change', (e) => {
                const label = e.target.closest('label');
                if(e.target.checked) {
                    label.classList.replace('border-slate-200', 'border-indigo-500');
                    label.classList.add('bg-indigo-50');
                } else {
                    label.classList.replace('border-indigo-500', 'border-slate-200');
                    label.classList.remove('bg-indigo-50');
                }
            });
        });
    };

    window.saveAssignments = (username) => {
        const courses = ['level1', 'level2', 'level3', 'pro'];
        courses.forEach(course => {
            const isChecked = document.getElementById(`chk-${course}`).checked;
            if (isChecked) {
                window.LocalDB.assignCourse(username, course, currentUser.username);
            } else {
                window.LocalDB.removeCourse(username, course);
            }
        });
        
        document.getElementById('assignModal').remove();
        window.renderManagement(container); // Reload UI
    };

    container.innerHTML = `
        <div class="animate-fade-in max-w-5xl mx-auto space-y-8">
            
            <!-- Header -->
            <div class="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
                <i class="fas fa-users-cog absolute -right-5 -top-5 w-48 h-48 opacity-10 text-9xl"></i>
                <div class="relative z-10 flex items-center justify-between">
                    <div>
                        <span class="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-md">Administration</span>
                        <h2 class="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight">${title}</h2>
                        <p class="text-indigo-100 text-lg">${subtitle}</p>
                    </div>
                </div>
            </div>

            <div class="flex flex-col gap-8">
                <!-- Add Form -->
                <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                    <h3 class="font-bold text-slate-800 mb-6 flex items-center gap-3 text-lg">
                        <div class="p-2 bg-emerald-50 text-emerald-500 rounded-lg"><i class="fas fa-plus"></i></div> ${addLabel}
                    </h3>

                    <form onsubmit="window.handleUserSubmit(event)" class="grid grid-cols-1 md:grid-cols-2 ${isAdmin ? 'lg:grid-cols-4' : 'lg:grid-cols-5'} gap-4 items-end">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                            <input type="text" id="new-name" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-800" placeholder="e.g. Jane Doe">
                        </div>
                        
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Username</label>
                            <input type="text" id="new-username" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-800" placeholder="janedoe">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                            <input type="text" id="new-password" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-800" placeholder="Generated password">
                        </div>

                        ${!isAdmin ? `
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Assign Level</label>
                            <select id="new-level" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-800">
                                <option value="1">Level 1</option>
                                <option value="2">Level 2</option>
                                <option value="3">Level 3</option>
                                <option value="pro">For professionals</option>
                            </select>
                        </div>
                        ` : ''}

                        <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 h-[48px]">
                            Create Account
                        </button>
                    </form>
                </div>

                ${pendingValidationsHtml}

                <!-- User Table -->
                <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                    <h3 class="font-bold text-slate-800 mb-6 flex items-center gap-3 text-lg">
                        <div class="p-2 bg-blue-50 text-blue-500 rounded-lg"><i class="fas fa-list"></i></div> Directory
                    </h3>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                    <tr class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                        <th class="p-4 rounded-tl-xl font-bold whitespace-nowrap w-[30%] min-w-[220px]">Name</th>
                                        <th class="p-4 font-bold whitespace-nowrap w-[20%]">Username</th>
                                        <th class="p-4 font-bold whitespace-nowrap w-[15%]">Password</th>
                                        ${!isAdmin ? '<th class="p-4 font-bold text-center whitespace-nowrap w-[20%]">Assigned Courses</th>' : ''}
                                        <th class="p-4 rounded-tr-xl font-bold text-right whitespace-nowrap w-[15%] min-w-[120px]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${users.map(u => {
                                        let coursesHtml = '';
                                        if (!isAdmin) {
                                            const assignments = window.LocalDB.getAssignments(u.username);
                                            const activeCourses = Object.keys(assignments);
                                            if(activeCourses.length === 0) {
                                                coursesHtml = `<span class="text-xs text-rose-500 font-bold bg-rose-50 px-2 py-1 rounded">None</span>`;
                                            } else {
                                                coursesHtml = activeCourses.map(c => {
                                                    const names = { level1: 'Lvl 1', level2: 'Lvl 2', level3: 'Lvl 3', pro: 'Pro Track' };
                                                    return `<span class="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-md m-0.5 inline-block">${names[c]}</span>`;
                                                }).join('');
                                            }
                                        }
                                        
                                        return `
                                        <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors group">
                                            <td class="p-4 align-middle whitespace-nowrap min-w-[220px]">
                                                <div class="flex items-center gap-3">
                                                    <img src="${u.avatar}" class="w-10 h-10 rounded-full shadow-sm">
                                                    <span class="font-bold text-slate-800 truncate">${u.name}</span>
                                                </div>
                                            </td>
                                            <td class="p-4 text-slate-600 font-medium align-middle whitespace-nowrap">@${u.username}</td>
                                            <td class="p-4 text-slate-400 font-mono text-sm tracking-widest align-middle whitespace-nowrap">••••••</td>
                                            ${!isAdmin ? `<td class="p-4 align-middle">
                                                <div class="flex flex-wrap items-center justify-center gap-1.5 max-w-[200px] mx-auto">
                                                    ${coursesHtml}
                                                </div>
                                            </td>` : ''}
                                            <td class="p-4 text-right align-middle whitespace-nowrap">
                                                <div class="flex items-center justify-end gap-2">
                                                    ${!isAdmin ? `
                                                    <button onclick="window.openAssignModal('${u.username}', '${u.name}')" class="text-indigo-500 hover:text-white hover:bg-indigo-500 border border-indigo-500 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1" title="Assign Courses">
                                                        <i class="fas fa-book-medical"></i> Assign
                                                    </button>` : ''}
                                                    <button onclick="window.promptEditPassword('${u.username}')" class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" title="Edit Password">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button onclick="window.promptDeleteUser('${u.username}')" class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" title="Delete User">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `}).join('')}
                                ${users.length === 0 ? `<tr><td colspan="5" class="p-8 text-center text-slate-500">No users found.</td></tr>` : ''}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
};
