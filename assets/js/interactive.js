/**
 * Interactive Homepage JavaScript
 * Features: Typewriter effect, Particles, Smooth scrolling, Reveal animations
 */

class InteractiveHomepage {
    constructor() {
        this.particles = [];
        this.particleCount = 50;
        this.canvas = null;
        this.ctx = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupParticles();
        this.setupTypewriter();
        this.setupSmoothScroll();
        this.setupScrollReveal();
        this.setupFloatingAnimations();
    }

    // Particle Background System
    setupParticles() {
        const container = document.getElementById('particles-canvas');
        if (!container) return;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        container.appendChild(this.canvas);

        this.resizeCanvas();
        this.initParticles();
        this.animateParticles();

        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    }

    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() * 60 + 200 // Blue-purple range
            });
        }
    }

    animateParticles() {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
            this.ctx.fill();

            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${(1 - distance / 100) * 0.3})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animateParticles());
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        this.particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }
        });
    }

    // Typewriter Effect
    setupTypewriter() {
        const nameElement = document.getElementById('typewriter-name');
        const rolesElement = document.getElementById('typewriter-roles');
        
        if (!nameElement || !rolesElement) return;

        const name = 'Tsung-Min (Vincent) Pai';
        const roles = [
            'AI Engineer & Researcher',
            'Machine Learning Enthusiast',
            'Undergraduate Student at NTU',
            'LLM Developer',
        ];

        this.typeWriter(nameElement, name, 100, () => {
            setTimeout(() => {
                this.typeWriterLoop(rolesElement, roles, 80, 2000);
            }, 500);
        });
    }

    typeWriter(element, text, speed = 100, callback = null) {
        let i = 0;
        element.textContent = '';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                if (callback) callback();
            }
        }, speed);
    }

    typeWriterLoop(element, texts, speed = 100, pauseDuration = 2000) {
        let currentTextIndex = 0;
        
        const cycleText = () => {
            const currentText = texts[currentTextIndex];
            this.typeWriter(element, currentText, speed, () => {
                setTimeout(() => {
                    this.eraseText(element, speed / 2, () => {
                        currentTextIndex = (currentTextIndex + 1) % texts.length;
                        setTimeout(cycleText, 300);
                    });
                }, pauseDuration);
            });
        };

        cycleText();
    }

    eraseText(element, speed = 50, callback = null) {
        const text = element.textContent;
        let i = text.length;
        
        const timer = setInterval(() => {
            if (i > 0) {
                element.textContent = text.substring(0, i - 1);
                i--;
            } else {
                clearInterval(timer);
                if (callback) callback();
            }
        }, speed);
    }

    // Smooth Scrolling
    setupSmoothScroll() {
        document.querySelectorAll('[data-scroll-target]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('data-scroll-target');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Scroll Reveal Animation
    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-section');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Floating Animations
    setupFloatingAnimations() {
        // Add floating animation to profile image
        const profileContainer = document.querySelector('.profile-container');
        if (profileContainer) {
            profileContainer.classList.add('floating');
        }

        // Animate floating icons
        document.querySelectorAll('.floating-icon').forEach((icon, index) => {
            icon.style.setProperty('--random-x', Math.random() * 200 - 100);
            icon.style.setProperty('--random-y', Math.random() * 200 - 100);
            
            // Add emoji content
            const emoji = icon.getAttribute('data-icon');
            icon.textContent = emoji;
        });
    }
}

// Initialize when page loads
new InteractiveHomepage();