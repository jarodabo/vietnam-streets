// Learn Page JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all elements with 'observe' class
    document.querySelectorAll('.observe').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Category navigation functionality
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects for cards
    const cards = document.querySelectorAll('.category-card, .article-card, .guide-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add progressive enhancement for guide downloads
    const guideLinks = document.querySelectorAll('.guide-link');
    guideLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Simulate download preparation
            const originalText = this.textContent;
            this.textContent = 'Preparing...';
            this.style.opacity = '0.6';

            setTimeout(() => {
                this.textContent = 'Download Ready';
                this.style.opacity = '1';

                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            }, 1000);
        });
    });

    // Reading progress indicator for featured article
    const featuredArticle = document.querySelector('.featured-article');
    if (featuredArticle) {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #1a1a1a, #666);
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            const featuredRect = featuredArticle.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (featuredRect.top < windowHeight && featuredRect.bottom > 0) {
                const progress = Math.max(0, Math.min(100,
                    ((windowHeight - featuredRect.top) / (windowHeight + featuredRect.height)) * 100
                ));
                progressBar.style.width = progress + '%';
            } else {
                progressBar.style.width = '0%';
            }
        });
    }
});