/**
 * Street Photography Foundation Page
 * Minimal interactions focused on content and user experience
 */

class BundlePage {
    constructor() {
        this.modal = document.getElementById('previewModal');
        this.form = document.getElementById('previewForm');
        this.formSuccess = document.getElementById('formSuccess');
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
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

    /**
     * Setup preview download modal
     */
    setupPreviewModal() {
        if (!this.modal || !this.form) return;

        // Open modal on trigger click
        document.querySelectorAll('.preview-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        });

        // Close modal on close button
        const closeBtn = this.modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }

        // Close modal on overlay click
        const overlay = this.modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeModal();
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Handle form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    /**
     * Open modal
     */
    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus on email input
        const emailInput = this.form.querySelector('#email');
        if (emailInput) {
            setTimeout(() => emailInput.focus(), 100);
        }
    }

    /**
     * Close modal
     */
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';

        // Reset form after closing
        setTimeout(() => {
            this.resetForm();
        }, 300);
    }

    /**
     * Handle form submission
     */
    async handleFormSubmit() {
        const formData = new FormData(this.form);
        const email = formData.get('email');
        const instagram = formData.get('instagram');

        // Validate email
        if (!email || !this.validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Disable submit button
        const submitBtn = this.form.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // TODO: Replace with your actual form submission endpoint
            // Options: Mailchimp, ConvertKit, Formspree, Google Sheets, etc.

            // Example using Formspree (you'll need to set up a form at formspree.io)
            // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //         'Accept': 'application/json'
            //     }
            // });

            // For now, simulate success
            await this.simulateSubmission(email, instagram);

            // Show success message
            this.showSuccess();

        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error sending your request. Please try again or email us directly at vietnamstreetscommunity@gmail.com');

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    /**
     * Simulate form submission (replace with real endpoint)
     */
    simulateSubmission(email, instagram) {
        return new Promise((resolve) => {
            // Log the data (for now)
            console.log('Preview request received:');
            console.log('Email:', email);
            console.log('Instagram:', instagram || '(not provided)');

            // Simulate network delay
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    /**
     * Validate email format
     */
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Show success message
     */
    showSuccess() {
        this.form.style.display = 'none';
        this.formSuccess.style.display = 'block';
    }

    /**
     * Reset form to initial state
     */
    resetForm() {
        this.form.reset();
        this.form.style.display = 'block';
        this.formSuccess.style.display = 'none';

        const submitBtn = this.form.querySelector('.form-submit');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Preview';
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
