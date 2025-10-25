/**
 * Street Photography Foundation Page
 * Minimal interactions focused on content and user experience
 */

class BundlePage {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
    }

    /**
     * Setup scroll-triggered animations using Intersection Observer
     */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with .observe class
        document.querySelectorAll('.observe').forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                if (href && href.length > 1) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new BundlePage();
    });
} else {
    new BundlePage();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BundlePage;
}
