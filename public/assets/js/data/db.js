/**
 * LocalDB Service for Alpha Fly AI Communication Academy
 * Handles offline storage, gamification stats, and progress tracking using localStorage.
 */

window.LocalDB = {
    KEYS: {
        USERS: 'alphafly_v2_users',
        PROGRESS: 'alphafly_v2_progress',
        SETTINGS: 'alphafly_v2_settings',
        ASSIGNMENTS: 'alphafly_v2_assignments'
    },

    init: function() {
        if (!localStorage.getItem(this.KEYS.USERS) || !JSON.parse(localStorage.getItem(this.KEYS.USERS))[0].username) {
            const defaultUsers = [
                { id: 1, name: "Admin Setup", username: "admin", password: "123", role: "admin", avatar: "https://ui-avatars.com/api/?name=Admin+Setup&background=000&color=fff" },
                { id: 2, name: "Staff Spoko", username: "staff", password: "123", role: "staff", avatar: "https://ui-avatars.com/api/?name=Staff+Spoko&background=10B981&color=fff" }
            ];
            localStorage.setItem(this.KEYS.USERS, JSON.stringify(defaultUsers));
        }

        // Remove old dummy data if it exists from previous versions
        let currentUsers = JSON.parse(localStorage.getItem(this.KEYS.USERS));
        if (currentUsers && currentUsers.some(u => ['student', 'johndoe', 'priya', 'rahul', 'sarah'].includes(u.username))) {
             currentUsers = currentUsers.filter(u => !['student', 'johndoe', 'priya', 'rahul', 'sarah'].includes(u.username));
             localStorage.setItem(this.KEYS.USERS, JSON.stringify(currentUsers));
             
             let currentProgress = JSON.parse(localStorage.getItem(this.KEYS.PROGRESS)) || {};
             ['student', 'johndoe', 'priya', 'rahul', 'sarah'].forEach(u => delete currentProgress[u]);
             localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(currentProgress));
             
             let currentAssignments = JSON.parse(localStorage.getItem(this.KEYS.ASSIGNMENTS)) || {};
             ['student', 'johndoe', 'priya', 'rahul', 'sarah'].forEach(u => delete currentAssignments[u]);
             localStorage.setItem(this.KEYS.ASSIGNMENTS, JSON.stringify(currentAssignments));
        }

        if (!localStorage.getItem(this.KEYS.PROGRESS)) {
            localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify({}));
        }

        if (!localStorage.getItem(this.KEYS.ASSIGNMENTS)) {
            localStorage.setItem(this.KEYS.ASSIGNMENTS, JSON.stringify({}));
        }
    },

    getInitialStudentProgress: function() {
        return {
            completedLessons: [], // e.g. ["1_1", "1_2"]
            pendingValidation: [], // e.g. ["1_3"]
            currentLevel: 1,
            currentDay: 1,
            stats: {
                xp: 0,
                coins: 0,
                diamonds: 0,
                speakingMinutes: 0,
                vocabularyLearned: 0,
                grammarMastery: 0,
                readingScore: 0,
                listeningScore: 0,
                writingScore: 0
            },
            streaks: {
                daily: 0,
                weekly: 0,
                monthly: 0,
                lastLoginDate: null
            },
            achievements: ["Welcome Aboard!"],
            certificates: [],
            missions: {
                today: [],
                completed: 0
            }
        };
    },

    generateStudentId: function() {
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS)) || [];
        const existingIds = new Set(users.map(u => (u.studentId || u.username || '').toUpperCase()));
        let num = 1001;
        while (existingIds.has(`SPK-${num}`)) {
            num++;
        }
        return `SPK-${num}`;
    },

    getUserByUsername: function(identifier) {
        if (!identifier) return null;
        const clean = String(identifier).trim().toLowerCase();
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS)) || [];
        return users.find(u => 
            u.username?.toLowerCase() === clean || 
            u.studentId?.toLowerCase() === clean ||
            String(u.id) === clean
        );
    },

    getAllStudents: function() {
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS)) || [];
        return users.filter(u => u.role === 'student');
    },

    getAllStaff: function() {
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS)) || [];
        return users.filter(u => u.role === 'staff');
    },

    addUser: function(creatorRole, newUserObj) {
        if (creatorRole === 'admin' && newUserObj.role !== 'staff' && newUserObj.role !== 'student') {
            throw new Error("Admins can create staff or student users.");
        }
        if (creatorRole === 'staff' && newUserObj.role !== 'student') {
            throw new Error("Staff can only create student users.");
        }

        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS)) || [];
        let studentId = null;
        let username = '';
        let password = '';

        if (newUserObj.role === 'student') {
            studentId = this.generateStudentId();
            username = studentId.toLowerCase();
            password = '';
        } else {
            if (!newUserObj.username || !newUserObj.username.trim()) {
                throw new Error("Username is required for staff accounts.");
            }
            username = newUserObj.username.trim().toLowerCase();
            password = newUserObj.password || '123';
            if (users.find(u => u.username === username || u.studentId === username)) {
                throw new Error("Username already exists.");
            }
        }

        newUserObj.id = Date.now();
        newUserObj.studentId = studentId;
        newUserObj.username = username;
        newUserObj.password = password;
        newUserObj.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(newUserObj.name)}&background=random&color=fff`;
        users.push(newUserObj);
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));

        // Initialize progress if it's a student
        if (newUserObj.role === 'student') {
            const allProgress = JSON.parse(localStorage.getItem(this.KEYS.PROGRESS)) || {};
            allProgress[newUserObj.username] = this.getInitialStudentProgress();
            allProgress[newUserObj.username].currentLevel = newUserObj.level || 1;
            localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(allProgress));
            
            const assignments = JSON.parse(localStorage.getItem(this.KEYS.ASSIGNMENTS)) || {};
            const initialCourse = (newUserObj.level === 'pro') ? 'pro' : `level${newUserObj.level || 1}`;
            assignments[newUserObj.username] = {
                [initialCourse]: {
                    assignedBy: creatorRole,
                    assignedDate: new Date().toISOString(),
                    progress: {
                        completedLessons: [],
                        xp: 0,
                        badges: []
                    }
                }
            };
            localStorage.setItem(this.KEYS.ASSIGNMENTS, JSON.stringify(assignments));
        }
        
        return newUserObj;
    },

    updateUserPassword: function(username, newPassword) {
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS)) || [];
        const index = users.findIndex(u => u.username === username);
        if (index === -1) throw new Error("User not found.");
        users[index].password = newPassword;
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
        return true;
    },

    deleteUser: function(username) {
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS)) || [];
        const filteredUsers = users.filter(u => u.username !== username);
        if (filteredUsers.length === users.length) throw new Error("User not found.");
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(filteredUsers));
        
        // Also remove progress and assignments to clean up
        const allProgress = JSON.parse(localStorage.getItem(this.KEYS.PROGRESS)) || {};
        if (allProgress[username]) {
            delete allProgress[username];
            localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(allProgress));
        }

        const allAssignments = JSON.parse(localStorage.getItem(this.KEYS.ASSIGNMENTS)) || {};
        if (allAssignments[username]) {
            delete allAssignments[username];
            localStorage.setItem(this.KEYS.ASSIGNMENTS, JSON.stringify(allAssignments));
        }
        
        return true;
    },

    getProgress: function(username) {
        const allProgress = JSON.parse(localStorage.getItem(this.KEYS.PROGRESS)) || {};
        if (!allProgress[username]) {
            allProgress[username] = this.getInitialStudentProgress();
            localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(allProgress));
        }
        return allProgress[username];
    },

    saveProgress: function(username, progressObj) {
        const allProgress = JSON.parse(localStorage.getItem(this.KEYS.PROGRESS)) || {};
        allProgress[username] = progressObj;
        localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(allProgress));
    },

    addXP: function(username, amount) {
        const progress = this.getProgress(username);
        progress.stats.xp += amount;
        this.saveProgress(username, progress);
        return progress;
    },

    addCoins: function(username, amount) {
        const progress = this.getProgress(username);
        progress.stats.coins += amount;
        this.saveProgress(username, progress);
        return progress;
    },

    requestLessonValidation: function(username, level, day) {
        const progress = this.getProgress(username);
        const lessonId = level + '_' + day;
        if (!progress.pendingValidation) progress.pendingValidation = [];
        
        if (!progress.completedLessons.includes(lessonId) && !progress.pendingValidation.includes(lessonId)) {
            progress.pendingValidation.push(lessonId);
            this.saveProgress(username, progress);
        }
        return progress;
    },

    approveLesson: function(username, level, day) {
        const progress = this.getProgress(username);
        const lessonId = level + '_' + day;
        if (!progress.pendingValidation) progress.pendingValidation = [];
        
        // Remove from pending
        progress.pendingValidation = progress.pendingValidation.filter(id => id !== lessonId);
        
        if (!progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
            // Auto advance day if not max (only for level 1 globally)
            if (level !== 'pro' && day === progress.currentDay && progress.currentDay < 45) {
                progress.currentDay++;
            }
            progress.stats.xp += 100; // Base XP for lesson
            progress.stats.coins += 50; // Base Coins
            this.saveProgress(username, progress);
        }

        // Update independent course progress
        const courseId = level === 'pro' ? 'pro' : 'level' + level;
        this.updateCourseProgress(username, courseId, (courseProgress) => {
            if (!courseProgress.completedLessons) courseProgress.completedLessons = [];
            if (!courseProgress.completedLessons.includes(lessonId)) {
                courseProgress.completedLessons.push(lessonId);
                courseProgress.xp = (courseProgress.xp || 0) + 100;
            }
        });

        return progress;
    },

    updateLoginStreak: function(username) {
        const progress = this.getProgress(username);
        const today = new Date().toISOString().split('T')[0];
        
        if (progress.streaks.lastLoginDate !== today) {
            // Check if it's consecutive
            const lastLogin = new Date(progress.streaks.lastLoginDate);
            const currentDate = new Date(today);
            const diffTime = Math.abs(currentDate - lastLogin);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays === 1) {
                progress.streaks.daily += 1;
            } else if (diffDays > 1) {
                progress.streaks.daily = 1; // reset streak
            }
            
            progress.streaks.lastLoginDate = today;
            this.saveProgress(username, progress);
        }
        return progress;
    },

    // ─────────────────── COURSE ASSIGNMENT HELPER METHODS ───────────────────
    
    getAssignments: function(username) {
        const allAssignments = JSON.parse(localStorage.getItem(this.KEYS.ASSIGNMENTS)) || {};
        return allAssignments[username] || {};
    },

    assignCourse: function(username, courseId, assignedBy) {
        const allAssignments = JSON.parse(localStorage.getItem(this.KEYS.ASSIGNMENTS)) || {};
        if (!allAssignments[username]) allAssignments[username] = {};
        
        if (!allAssignments[username][courseId]) {
            allAssignments[username][courseId] = {
                assignedBy: assignedBy,
                assignedDate: new Date().toISOString(),
                progress: {
                    completedLessons: [],
                    xp: 0,
                    badges: []
                }
            };
            localStorage.setItem(this.KEYS.ASSIGNMENTS, JSON.stringify(allAssignments));
        }
        return true;
    },

    removeCourse: function(username, courseId) {
        const allAssignments = JSON.parse(localStorage.getItem(this.KEYS.ASSIGNMENTS)) || {};
        if (allAssignments[username] && allAssignments[username][courseId]) {
            delete allAssignments[username][courseId];
            localStorage.setItem(this.KEYS.ASSIGNMENTS, JSON.stringify(allAssignments));
        }
        return true;
    },

    updateCourseProgress: function(username, courseId, updateFn) {
        const allAssignments = JSON.parse(localStorage.getItem(this.KEYS.ASSIGNMENTS)) || {};
        if (allAssignments[username] && allAssignments[username][courseId]) {
            updateFn(allAssignments[username][courseId].progress);
            localStorage.setItem(this.KEYS.ASSIGNMENTS, JSON.stringify(allAssignments));
            return true;
        }
        return false;
    }
};

// Auto-initialize
window.LocalDB.init();
