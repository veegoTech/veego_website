// Auth script

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    // Database is auto-initialized by db.js
    
    // Always start at the login page when index.html is opened
    sessionStorage.removeItem('alphafly_currentUser');
});

window.handleLogin = (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');
    const btn = document.getElementById('submit-btn');
    
    // Basic validation
    if (!username || !password) return;

    // Loading state
    const originalBtnHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Authenticating...</span>';
    btn.disabled = true;

    // Simulate network delay
    setTimeout(() => {
        const user = window.LocalDB.getUserByUsername(username);
        
        // Validation: User exists and password matches
        if (user && user.password === password) {
            // Login success - Save to session storage
            sessionStorage.setItem('alphafly_currentUser', JSON.stringify(user));
            
            // Redirect unified app
            window.location.href = 'app.html';
        } else {
            // Login failed
            errorMessage.querySelector('span').innerText = 'Invalid username or password';
            errorMessage.classList.remove('hidden');
            btn.innerHTML = originalBtnHTML;
            btn.disabled = false;
        }
    }, 800);
};

window.logout = () => {
    sessionStorage.removeItem('alphafly_currentUser');
    window.location.href = 'index.html';
};
