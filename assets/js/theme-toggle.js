// Theme Toggle Functionality
class ThemeToggle {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        
        // Add event listeners to all theme toggle buttons
        document.addEventListener('DOMContentLoaded', () => {
            const toggleButtons = document.querySelectorAll('.theme-toggle');
            toggleButtons.forEach(button => {
                button.addEventListener('click', () => this.toggleTheme());
            });
        });
    }

    applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        
        // Update button content
        this.updateButtonContent(theme);
    }

    updateButtonContent(theme) {
        const toggleButtons = document.querySelectorAll('.theme-toggle');
        toggleButtons.forEach(button => {
            if (theme === 'light') {
                button.innerHTML = '<i class="fas fa-moon"></i> Dark';
            } else {
                button.innerHTML = '<i class="fas fa-sun"></i> Light';
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});