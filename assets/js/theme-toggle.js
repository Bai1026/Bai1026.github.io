// Simple Theme Toggle
let currentTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    updateButtonContent(theme);
}

function updateButtonContent(theme) {
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(button => {
        if (theme === 'light') {
            button.innerHTML = '<i class="fas fa-moon"></i> Dark';
        } else {
            button.innerHTML = '<i class="fas fa-sun"></i> Light';
        }
    });
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
}

function initThemeToggle() {
    // Apply saved theme
    applyTheme(currentTheme);
    
    // Add event listeners
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}