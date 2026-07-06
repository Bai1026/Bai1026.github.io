/**
 * Photo Gallery Carousel JavaScript
 * Handles multiple photo galleries on the same page.
 * Navigation dots are generated automatically from the slide count.
 */

class PhotoGallery {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.slides = this.container.querySelectorAll('.photo-slide');
        this.prevBtn = this.container.querySelector('.prev-btn');
        this.nextBtn = this.container.querySelector('.next-btn');
        this.currentSlide = 0;

        this.buildDots();
        this.init();
    }

    // 依照片數量自動產生導航點
    buildDots() {
        const dotsContainer = this.container.querySelector('.gallery-dots');
        if (!dotsContainer) {
            this.dots = [];
            return;
        }
        dotsContainer.innerHTML = '';
        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        this.dots = dotsContainer.querySelectorAll('.dot');
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // 處理照片載入錯誤：隱藏錯誤的照片但保持幻燈片結構
        this.slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                img.addEventListener('error', () => {
                    img.style.display = 'none';
                    slide.classList.add('image-error');
                });
                img.addEventListener('load', () => {
                    slide.classList.add('image-loaded');
                });
            }
        });

        this.showSlide(0);
    }

    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        if (this.slides[index]) {
            this.slides[index].classList.add('active');
            if (this.dots[index]) this.dots[index].classList.add('active');
            this.currentSlide = index;
        }
    }

    nextSlide() {
        this.showSlide((this.currentSlide + 1) % this.slides.length);
    }

    previousSlide() {
        this.showSlide((this.currentSlide - 1 + this.slides.length) % this.slides.length);
    }

    goToSlide(index) {
        this.showSlide(index);
    }
}

// 存儲所有輪播實例以便鍵盤導航使用
const galleryInstances = {};

// 初始化所有照片輪播（只註冊一次，避免事件重複綁定）
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.gallery-container[id]').forEach(container => {
        galleryInstances[container.id] = new PhotoGallery(container.id);
    });
});

// 鍵盤導航：滑鼠懸停在相簿上時可用左右鍵切換
document.addEventListener('keydown', function(e) {
    const activeGallery = document.querySelector('.gallery-container:hover');
    if (!activeGallery) return;

    const gallery = galleryInstances[activeGallery.id];
    if (!gallery) return;

    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        gallery.previousSlide();
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        gallery.nextSlide();
    }
});
