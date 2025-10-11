// Cultural Events Page JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter event cards
            eventCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            if (card.style.opacity === '0') {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                }
            });
        });
    });

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

    // Observe all elements
    document.querySelectorAll('.observe').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Registration functionality
    const registerBtn = document.querySelector('.register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            const eventTitle = document.querySelector('.event-title').textContent;

            // Simulate registration process
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.style.opacity = '0.6';

            setTimeout(() => {
                this.textContent = 'Registration Sent!';
                this.style.backgroundColor = '#4CAF50';
                this.style.borderColor = '#4CAF50';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                    this.style.borderColor = '';
                    this.style.opacity = '';
                }, 3000);
            }, 1500);

            // Log registration (placeholder for actual functionality)
            console.log(`Registration submitted for: ${eventTitle}`);
        });
    }

    // Event card interactions
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });

        // Click to view event details
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.classList.contains('event-link')) {
                return;
            }

            const eventName = this.querySelector('.event-name').textContent;
            const eventVenue = this.querySelector('.event-venue').textContent;

            // Simulate opening event details
            console.log(`Viewing details for: ${eventName} at ${eventVenue}`);

            // Add visual feedback
            const originalTransform = this.style.transform;
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = originalTransform;
            }, 150);
        });
    });

    // Event link interactions
    const eventLinks = document.querySelectorAll('.event-link');
    eventLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const eventName = this.closest('.event-content').querySelector('.event-name').textContent;
            const originalText = this.textContent;

            // Visual feedback
            this.textContent = 'Loading...';
            this.style.opacity = '0.6';

            setTimeout(() => {
                this.textContent = 'View Details';
                this.style.opacity = '1';

                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            }, 1000);

            console.log(`Loading details for: ${eventName}`);
        });
    });

    // Learn more link functionality
    const learnMoreLinks = document.querySelectorAll('.learn-more-link');
    learnMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const originalText = this.textContent;
            this.textContent = 'Loading More Info...';

            setTimeout(() => {
                this.textContent = 'Info Loaded';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            }, 1000);
        });
    });

    // Event calendar integration (placeholder)
    function loadUpcomingEvents() {
        // This would integrate with the existing events.json data
        fetch('../data/events.json')
            .then(response => response.json())
            .then(data => {
                console.log('Events data loaded:', data);
                // Process and display events
            })
            .catch(error => {
                console.log('Events data not available:', error);
            });
    }

    // Date formatting for event dates
    const eventDates = document.querySelectorAll('.event-date, .event-date-badge');
    eventDates.forEach(dateElement => {
        // Add hover effects to date badges
        dateElement.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        dateElement.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
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

    // Initialize events loading
    loadUpcomingEvents();

    // Event search functionality (placeholder for future implementation)
    function setupEventSearch() {
        const searchInput = document.querySelector('.event-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();

                eventCards.forEach(card => {
                    const eventName = card.querySelector('.event-name').textContent.toLowerCase();
                    const eventVenue = card.querySelector('.event-venue').textContent.toLowerCase();
                    const eventExcerpt = card.querySelector('.event-excerpt').textContent.toLowerCase();

                    if (eventName.includes(searchTerm) ||
                        eventVenue.includes(searchTerm) ||
                        eventExcerpt.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    }

    setupEventSearch();

    // Event reminder functionality (placeholder)
    function setupEventReminders() {
        const reminderBtns = document.querySelectorAll('.remind-me-btn');
        reminderBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const eventName = this.closest('.event-card').querySelector('.event-name').textContent;
                console.log(`Reminder set for: ${eventName}`);

                this.textContent = 'Reminder Set!';
                this.style.backgroundColor = '#4CAF50';
                setTimeout(() => {
                    this.textContent = 'Remind Me';
                    this.style.backgroundColor = '';
                }, 2000);
            });
        });
    }

    setupEventReminders();
});