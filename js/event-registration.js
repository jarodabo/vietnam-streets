// Event Registration Form Handler
// Integrates with Formspree for event registrations

class EventRegistration {
    constructor() {
        this.formspreeEndpoint = 'https://formspree.io/f/xwprrraw';
        this.init();
        console.log('EventRegistration initialized');
    }

    init() {
        this.setupRegistrationForms();
    }

    /**
     * Create and handle registration forms for events
     */
    setupRegistrationForms() {
        // Initial setup for existing buttons
        this.attachRegistrationListeners();

        // Watch for dynamically added buttons (for event cards loaded via JS)
        const observer = new MutationObserver(() => {
            this.attachRegistrationListeners();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Attach event listeners to all registration buttons
     */
    attachRegistrationListeners() {
        const registrationButtons = document.querySelectorAll('.register-btn, .event-register');
        console.log(`Found ${registrationButtons.length} registration buttons`);

        registrationButtons.forEach(button => {
            // Skip if already has listener
            if (button.hasAttribute('data-registration-attached')) {
                return;
            }

            button.setAttribute('data-registration-attached', 'true');
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Register button clicked');

                const eventElement = button.closest('[data-event-id]') ||
                                   button.closest('.event-card') ||
                                   button.closest('.event-item') ||
                                   button.closest('.featured-event-details');

                console.log('Event element found:', eventElement);

                if (eventElement) {
                    const eventId = eventElement.getAttribute('data-event-id') || this.extractEventId(eventElement);
                    const eventTitle = this.extractEventTitle(eventElement);
                    console.log('Opening modal for:', eventTitle);
                    this.showRegistrationModal(eventId, eventTitle, eventElement);
                } else {
                    // Fallback: generic registration
                    console.log('No event element found, using fallback');
                    this.showRegistrationModal('unknown', 'Event Registration', null);
                }
            });
        });
    }

    /**
     * Extract event ID from element
     */
    extractEventId(element) {
        const titleElement = element.querySelector('.event-title, .event-name, h2, h3');
        if (titleElement) {
            return titleElement.textContent.toLowerCase().replace(/\s+/g, '-');
        }
        return 'event-' + Date.now();
    }

    /**
     * Extract event title from element
     */
    extractEventTitle(element) {
        const titleElement = element.querySelector('.event-title, .event-name, h2, h3');
        return titleElement ? titleElement.textContent : 'Event';
    }

    /**
     * Show registration modal with form
     */
    showRegistrationModal(eventId, eventTitle, eventElement = null) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('registration-modal');
        if (!modal) {
            modal = this.createModal();
        }

        // Extract additional event details
        let eventDate = '';
        let eventTime = '';
        let eventLocation = '';
        let eventPrice = '';

        if (eventElement) {
            // Try to extract event details from the element
            const dateEl = eventElement.querySelector('.event-date-display') ||
                          eventElement.querySelector('.date-day') ||
                          eventElement.querySelector('.event-date');

            const timeEl = eventElement.querySelector('.event-time') ||
                          eventElement.querySelector('.time');

            const locationEl = eventElement.querySelector('.event-location') ||
                              eventElement.querySelector('.event-venue');

            const priceEl = eventElement.querySelector('.event-price');

            eventDate = dateEl ? dateEl.textContent.trim() : '';
            eventTime = timeEl ? timeEl.textContent.trim() : '';
            eventLocation = locationEl ? locationEl.textContent.trim() : '';
            eventPrice = priceEl ? priceEl.textContent.trim() : '';
        }

        // Update modal content
        const modalTitle = modal.querySelector('.modal-title');
        const form = modal.querySelector('#event-registration-form');
        const eventInput = modal.querySelector('input[name="event"]');
        const eventIdInput = modal.querySelector('input[name="event-id"]');
        const eventDateInput = modal.querySelector('input[name="event-date"]');
        const eventTimeInput = modal.querySelector('input[name="event-time"]');
        const eventLocationInput = modal.querySelector('input[name="event-location"]');
        const eventPriceInput = modal.querySelector('input[name="event-price"]');
        const subjectInput = modal.querySelector('input[name="_subject"]');

        modalTitle.textContent = `Register for ${eventTitle}`;
        eventInput.value = eventTitle;
        eventIdInput.value = eventId;

        // Set additional event details
        if (eventDateInput) eventDateInput.value = eventDate;
        if (eventTimeInput) eventTimeInput.value = eventTime;
        if (eventLocationInput) eventLocationInput.value = eventLocation;
        if (eventPriceInput) eventPriceInput.value = eventPrice;

        // Update email subject to be event-specific
        if (subjectInput) subjectInput.value = `Registration: ${eventTitle}`;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Create modal element
     */
    createModal() {
        const modal = document.createElement('div');
        modal.id = 'registration-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" aria-label="Close">&times;</button>
                <h2 class="modal-title">Event Registration</h2>

                <form id="event-registration-form" action="${this.formspreeEndpoint}" method="POST">
                    <!-- Hidden fields for event details -->
                    <input type="hidden" name="_subject" value="New Event Registration">
                    <input type="hidden" name="event" value="">
                    <input type="hidden" name="event-id" value="">
                    <input type="hidden" name="event-date" value="">
                    <input type="hidden" name="event-time" value="">
                    <input type="hidden" name="event-location" value="">
                    <input type="hidden" name="event-price" value="">

                    <!-- User fields -->
                    <div class="form-group">
                        <label for="name">Full Name *</label>
                        <input type="text" id="name" name="name" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone">
                    </div>

                    <div class="form-group">
                        <label for="attendees">Number of Attendees</label>
                        <select id="attendees" name="attendees">
                            <option value="1">1 person</option>
                            <option value="2">2 people</option>
                            <option value="3">3 people</option>
                            <option value="4">4 people</option>
                            <option value="5+">5+ people</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="message">Questions or Special Requests</label>
                        <textarea id="message" name="message" rows="4"></textarea>
                    </div>

                    <!-- Honeypot for spam protection -->
                    <input type="text" name="_gotcha" style="display:none">

                    <!-- Submit button -->
                    <button type="submit" class="submit-btn">Complete Registration</button>

                    <div class="form-status"></div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Setup event listeners
        this.setupModalListeners(modal);

        return modal;
    }

    /**
     * Setup modal event listeners
     */
    setupModalListeners(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        const form = modal.querySelector('#event-registration-form');

        // Close modal
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            form.reset();
            const status = modal.querySelector('.form-status');
            status.innerHTML = '';
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Handle form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmit(form);
        });
    }

    /**
     * Handle form submission with AJAX
     */
    async handleFormSubmit(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const status = form.querySelector('.form-status');
        const originalBtnText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        status.innerHTML = '';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerHTML = `
                    <div class="success-message">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <p><strong>Registration Successful!</strong></p>
                        <p>You'll receive a confirmation email shortly with event details.</p>
                    </div>
                `;
                form.reset();

                // Close modal after 3 seconds
                setTimeout(() => {
                    const modal = document.getElementById('registration-modal');
                    if (modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                        status.innerHTML = '';
                    }
                }, 3000);
            } else {
                const data = await response.json();
                status.innerHTML = `
                    <div class="error-message">
                        <p><strong>Registration Error</strong></p>
                        <p>${data.errors ? data.errors.map(e => e.message).join(', ') : 'Please try again.'}</p>
                    </div>
                `;
            }
        } catch (error) {
            status.innerHTML = `
                <div class="error-message">
                    <p><strong>Connection Error</strong></p>
                    <p>Please check your internet connection and try again.</p>
                </div>
            `;
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new EventRegistration();
    });
} else {
    new EventRegistration();
}
