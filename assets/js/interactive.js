/**
 * Interactive Homepage JavaScript
 * Features: Typewriter effect, Particles, Smooth scrolling, Reveal animations
 */

class InteractiveHomepage {
    constructor() {
        this.particles = [];
        this.particleCount = window.innerWidth < 768 ? 20 : 50;
        this.canvas = null;
        this.ctx = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.spotlightRadius = 200;
        this.isVisible = true;

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reducedMotion) {
            this.setupParticles();
            this.setupSpotlightEffect();
            this.setupFloatingAnimations();
        }
        this.setupTypewriter();
        this.setupSmoothScroll();
        this.setupScrollReveal();
        this.setupProfileFlip();
    }

    setupSpotlightEffect() {
        const spotlightOverlay = document.createElement('div');
        spotlightOverlay.id = 'spotlight-overlay';
        spotlightOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 0;
            background: radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%),
                rgba(88, 166, 255, 0.1) 0%,
                rgba(88, 166, 255, 0.05) 30%,
                rgba(0, 0, 0, 0.1) 70%,
                rgba(0, 0, 0, 0.2) 100%);
            transition: all 0.1s ease;
        `;
        document.body.appendChild(spotlightOverlay);

        document.addEventListener('mousemove', (e) => {
            const mouseXPercent = (e.clientX / window.innerWidth) * 100;
            const mouseYPercent = (e.clientY / window.innerHeight) * 100;
            spotlightOverlay.style.setProperty('--mouse-x', `${mouseXPercent}%`);
            spotlightOverlay.style.setProperty('--mouse-y', `${mouseYPercent}%`);
        });

        document.addEventListener('mouseleave', () => {
            spotlightOverlay.style.opacity = '0.3';
        });

        document.addEventListener('mouseenter', () => {
            spotlightOverlay.style.opacity = '1';
        });
    }

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
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
                hue: Math.random() * 60 + 200
            });
        }
    }

    animateParticles() {
        if (!this.ctx) return;

        if (!this.isVisible) {
            requestAnimationFrame(() => this.animateParticles());
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSpotlight();

        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distanceFromMouse = Math.sqrt(dx * dx + dy * dy);
            const spotlightIntensity = Math.max(0, 1 - distanceFromMouse / this.spotlightRadius);

            const enhancedOpacity = particle.opacity + (spotlightIntensity * 0.6);
            const enhancedSize = particle.size + (spotlightIntensity * 1.5);

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, enhancedSize, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 70%, ${60 + spotlightIntensity * 40}%, ${Math.min(enhancedOpacity, 1)})`;
            this.ctx.fill();

            this.particles.slice(index + 1).forEach(otherParticle => {
                const connectionDx = particle.x - otherParticle.x;
                const connectionDy = particle.y - otherParticle.y;
                const connectionDistance = Math.sqrt(connectionDx * connectionDx + connectionDy * connectionDy);

                if (connectionDistance < 100) {
                    const otherDx = this.mouseX - otherParticle.x;
                    const otherDy = this.mouseY - otherParticle.y;
                    const otherDistanceFromMouse = Math.sqrt(otherDx * otherDx + otherDy * otherDy);
                    const otherSpotlightIntensity = Math.max(0, 1 - otherDistanceFromMouse / this.spotlightRadius);
                    const avgSpotlightIntensity = (spotlightIntensity + otherSpotlightIntensity) / 2;

                    const baseOpacity = (1 - connectionDistance / 100) * 0.3;
                    const enhancedConnectionOpacity = baseOpacity + (avgSpotlightIntensity * 0.4);

                    this.ctx.strokeStyle = `hsla(${particle.hue}, 70%, ${60 + avgSpotlightIntensity * 40}%, ${enhancedConnectionOpacity})`;
                    this.ctx.lineWidth = 1 + avgSpotlightIntensity;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animateParticles());
    }

    drawSpotlight() {
        if (!this.mouseX && !this.mouseY) return;

        const gradient = this.ctx.createRadialGradient(
            this.mouseX, this.mouseY, 0,
            this.mouseX, this.mouseY, this.spotlightRadius
        );

        gradient.addColorStop(0, 'rgba(88, 166, 255, 0.15)');
        gradient.addColorStop(0.3, 'rgba(88, 166, 255, 0.08)');
        gradient.addColorStop(0.6, 'rgba(88, 166, 255, 0.03)');
        gradient.addColorStop(1, 'rgba(88, 166, 255, 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;

        this.particles.forEach(particle => {
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= dx * force * 0.002;
                particle.vy -= dy * force * 0.002;
            }
        });
    }

    setupTypewriter() {
        const nameElement = document.getElementById('typewriter-name');
        const rolesElement = document.getElementById('typewriter-roles');

        if (!nameElement || !rolesElement) return;

        const name = 'Tsung-Min (Vincent) Pai';
        const roles = [
            '# AI Engineer & Researcher',
            '# LLM Developer',
            '# Machine Learning Enthusiast',
            '# Undergraduate Student at NTU',
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
            this.typeWriterWithPrefix(element, currentText, speed, () => {
                setTimeout(() => {
                    this.eraseTextKeepPrefix(element, speed / 2, () => {
                        currentTextIndex = (currentTextIndex + 1) % texts.length;
                        setTimeout(cycleText, 300);
                    });
                }, pauseDuration);
            });
        };

        cycleText();
    }

    typeWriterWithPrefix(element, text, speed = 100, callback = null) {
        const prefix = '# ';
        const mainText = text.replace(/^# /, '');
        let i = 0;
        element.innerHTML = prefix + '<span class="cursor">|</span>';

        const timer = setInterval(() => {
            if (i < mainText.length) {
                element.innerHTML = prefix + mainText.substring(0, i + 1) + '<span class="cursor">|</span>';
                i++;
            } else {
                element.innerHTML = prefix + mainText + '<span class="cursor">|</span>';
                clearInterval(timer);
                if (callback) callback();
            }
        }, speed);
    }

    eraseTextKeepPrefix(element, speed = 50, callback = null) {
        const prefix = '# ';
        const fullText = element.textContent.replace('|', '');
        const mainText = fullText.replace(/^# /, '');
        let i = mainText.length;

        const timer = setInterval(() => {
            if (i > 0) {
                element.innerHTML = prefix + mainText.substring(0, i - 1) + '<span class="cursor">|</span>';
                i--;
            } else {
                element.innerHTML = prefix + '<span class="cursor">|</span>';
                clearInterval(timer);
                if (callback) callback();
            }
        }, speed);
    }

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

    setupFloatingAnimations() {
        const profileContainer = document.querySelector('.profile-container');
        if (profileContainer) {
            profileContainer.classList.add('floating');
        }

        document.querySelectorAll('.floating-icon').forEach((icon) => {
            const emoji = icon.getAttribute('data-icon');
            icon.textContent = emoji;
        });
    }

    setupProfileFlip() {
        const profileContainer = document.getElementById('profile-flip-container');
        if (!profileContainer) return;

        profileContainer.addEventListener('click', () => {
            profileContainer.classList.toggle('flipped');
        });

        profileContainer.addEventListener('mouseenter', () => {
            if (!profileContainer.classList.contains('flipped')) {
                profileContainer.style.transform = 'scale(1.05)';
            }
        });

        profileContainer.addEventListener('mouseleave', () => {
            profileContainer.style.transform = 'scale(1)';
        });
    }
}

// Initialize when page loads
const interactiveHomepage = new InteractiveHomepage();
