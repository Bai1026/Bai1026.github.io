/**
 * Photo Gallery Carousel JavaScript
 * Handles multiple photo galleries on the same page
 */

class PhotoGallery {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.slides = this.container.querySelectorAll('.photo-slide');
        this.dots = this.container.querySelectorAll('.dot');
        this.prevBtn = this.container.querySelector('.prev-btn');
        this.nextBtn = this.container.querySelector('.next-btn');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        // 綁定事件監聽器
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // 為每個點添加點擊事件
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // 處理照片載入錯誤
        this.slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img) {
                img.addEventListener('error', () => {
                    console.log(`照片載入失敗: ${img.src}`);
                    // 隱藏錯誤的照片但保持幻燈片結構
                    img.style.display = 'none';
                    slide.classList.add('image-error');
                });
                
                img.addEventListener('load', () => {
                    console.log(`照片載入成功: ${img.src}`);
                    slide.classList.add('image-loaded');
                });
            }
        });
        
        // 顯示第一張照片
        this.showSlide(0);
        
        // 關閉自動播放 - 改為手動控制
        // this.startAutoPlay();
        
        // 滑鼠懸停相關事件也不再需要
        // this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        // this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    showSlide(index) {
        // 隱藏所有幻燈片
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // 顯示當前幻燈片
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
            this.dots[index].classList.add('active');
            this.currentSlide = index;
        }
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoPlay() {
        // 如果有多於一張照片才開始自動播放
        if (this.slides.length > 1) {
            this.slideInterval = setInterval(() => {
                this.nextSlide();
            }, 4000); // 每4秒切換一次
        }
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// 初始化所有照片輪播
document.addEventListener('DOMContentLoaded', function() {
    // 找到頁面上所有的照片輪播容器
    const galleryContainers = document.querySelectorAll('.gallery-container[id]');
    
    galleryContainers.forEach(container => {
        new PhotoGallery(container.id);
    });
});

// 處理鍵盤導航（可選功能）
document.addEventListener('keydown', function(e) {
    const activeGallery = document.querySelector('.gallery-container:hover');
    if (activeGallery) {
        const galleryId = activeGallery.id;
        const gallery = galleryInstances[galleryId];
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            gallery.previousSlide();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            gallery.nextSlide();
        }
    }
});

// 存儲所有輪播實例以便外部訪問
const galleryInstances = {};

// 更新初始化函式來存儲實例
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainers = document.querySelectorAll('.gallery-container[id]');
    
    galleryContainers.forEach(container => {
        galleryInstances[container.id] = new PhotoGallery(container.id);
    });
});

// 工具函式：創建照片幻燈片（如果需要動態添加照片）
function createPhotoSlide(imageSrc, altText = '') {
    const slide = document.createElement('div');
    slide.className = 'photo-slide';
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = altText;
    
    slide.appendChild(img);
    return slide;
}

// 工具函式：創建導航點
function createDot() {
    const dot = document.createElement('span');
    dot.className = 'dot';
    return dot;
}