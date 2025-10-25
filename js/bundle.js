/**
 * Street Photography Bundle Page
 * Handles interactive elements and animations for the bundle landing page
 */

class BundlePage {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
        this.setupGumroadTracking();
        this.setupPreviewModal();
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
                    // Optionally unobserve after animation
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

                // Skip empty anchors
                if (href === '#' || href === '#preview' || href === '#pricing') {
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

    /**
     * Setup tracking for Gumroad button clicks
     */
    setupGumroadTracking() {
        const gumroadButtons = document.querySelectorAll('.gumroad-button');

        gumroadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Track button click
                this.trackEvent('Bundle Purchase Click', {
                    location: this.getButtonLocation(button),
                    price: '$67'
                });

                // Add visual feedback
                button.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
            });
        });

        // Track preview button clicks
        const previewButtons = document.querySelectorAll('.gumroad-preview');

        previewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                this.trackEvent('Free Preview Click', {
                    location: this.getButtonLocation(button)
                });

                // Show preview modal or scroll to preview section
                const previewSection = document.getElementById('preview');
                if (previewSection) {
                    previewSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // You can replace this with actual Gumroad free preview link
                console.log('Preview button clicked - Connect to Gumroad free preview product');
            });
        });
    }

    /**
     * Get button location context for analytics
     */
    getButtonLocation(button) {
        const section = button.closest('section');
        if (!section) return 'unknown';

        if (section.classList.contains('bundle-hero')) return 'hero';
        if (section.classList.contains('bundle-pricing')) return 'pricing';
        if (section.classList.contains('bundle-final-cta')) return 'final-cta';

        return section.className || 'unknown';
    }

    /**
     * Track events (placeholder for analytics integration)
     */
    trackEvent(eventName, eventData = {}) {
        // Console log for debugging
        console.log('Event:', eventName, eventData);

        // Google Analytics 4 tracking (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }

        // Facebook Pixel tracking (if available)
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, eventData);
        }

        // Custom analytics endpoint (if needed)
        // fetch('/api/track', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ event: eventName, data: eventData })
        // });
    }

    /**
     * Setup preview modal functionality
     */
    setupPreviewModal() {
        // Add scroll progress indicator
        this.addScrollProgress();

        // Add sticky CTA on scroll
        this.addStickyCTA();
    }

    /**
     * Add scroll progress indicator
     */
    addScrollProgress() {
        // Create progress bar element
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);

        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;

            const progressBarElement = document.querySelector('.scroll-progress-bar');
            if (progressBarElement) {
                progressBarElement.style.width = `${progress}%`;
            }
        });

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(0, 0, 0, 0.1);
                z-index: 9999;
            }
            .scroll-progress-bar {
                height: 100%;
                background: var(--color-accent);
                width: 0%;
                transition: width 0.1s ease;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Add sticky CTA that appears after scrolling past hero
     */
    addStickyCTA() {
        const hero = document.querySelector('.bundle-hero');
        if (!hero) return;

        // Create sticky CTA
        const stickyCTA = document.createElement('div');
        stickyCTA.className = 'sticky-cta';
        stickyCTA.innerHTML = `
            <div class="sticky-cta-content">
                <div class="sticky-cta-text">
                    <strong>Street Photography Foundation Bundle</strong>
                    <span>$67 • Instant Digital Delivery</span>
                </div>
                <a href="https://gumroad.com/l/vietnam-streets-bundle" class="btn btn-primary gumroad-button" target="_blank">
                    Get Instant Access
                </a>
            </div>
        `;
        document.body.appendChild(stickyCTA);

        // Show/hide based on scroll position
        const heroObserver = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    stickyCTA.classList.add('visible');
                } else {
                    stickyCTA.classList.remove('visible');
                }
            },
            { threshold: 0 }
        );

        heroObserver.observe(hero);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .sticky-cta {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
                padding: 1rem;
                z-index: 9998;
                transform: translateY(100%);
                transition: transform 0.3s ease;
            }
            .sticky-cta.visible {
                transform: translateY(0);
            }
            .sticky-cta-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
                flex-wrap: wrap;
            }
            .sticky-cta-text strong {
                display: block;
                font-size: 1rem;
                font-weight: 600;
                color: var(--color-primary);
            }
            .sticky-cta-text span {
                display: block;
                font-size: 0.875rem;
                color: var(--color-text-light);
            }
            @media (max-width: 640px) {
                .sticky-cta-content {
                    flex-direction: column;
                    text-align: center;
                }
                .sticky-cta-content .btn {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);

        // Re-setup tracking for the new button
        const stickyButton = stickyCTA.querySelector('.gumroad-button');
        if (stickyButton) {
            stickyButton.addEventListener('click', () => {
                this.trackEvent('Bundle Purchase Click', {
                    location: 'sticky-cta',
                    price: '$67'
                });
            });
        }
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
