// Vietnam Streets - Premium Interactive Experience

class VietnamStreetsApp {
    constructor() {
        this.init();
        this.setupIntersectionObserver();
        this.setupPageTransitions();
    }

    init() {
        this.setupNavigation();
        this.setupEvents();
        this.setupInstagramFeed();
        this.setupScrollEffects();
        this.setupImageLazyLoading();
    }

    // ==========================================
    // NAVIGATION & INTERACTIONS
    // ==========================================

    setupNavigation() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const header = document.querySelector('.header');

        // Mobile menu toggle
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        menuToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }

                    // Smooth scroll to target
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        });
    }

    // ==========================================
    // EVENTS MANAGEMENT
    // ==========================================

    async setupEvents() {
        const eventsContainer = document.getElementById('events-container');
        if (!eventsContainer) return;

        try {
            const response = await fetch('data/events.json');
            const events = await response.json();

            // Sort and filter events
            const sortedEvents = this.sortEventsByDate(events);
            const featuredEvents = sortedEvents.filter(event => event.featured);
            const eventsToShow = featuredEvents.length > 0 ? featuredEvents : sortedEvents.slice(0, 4);

            this.renderEvents(eventsToShow, eventsContainer);
        } catch (error) {
            console.error('Error loading events:', error);
            this.renderEventsError(eventsContainer);
        }
    }

    sortEventsByDate(events) {
        return events.sort((a, b) => {
            // Handle recurring events
            if (a.date.includes('Every') && !b.date.includes('Every')) return 1;
            if (!a.date.includes('Every') && b.date.includes('Every')) return -1;
            if (a.date.includes('Every') && b.date.includes('Every')) return 0;

            // Sort by date
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });
    }

    renderEvents(events, container) {
        const eventsHTML = events.map(event => {
            const formattedDate = this.formatEventDate(event.date);
            return `
                <div class="event-item observe" data-event-id="${event.id}">
                    <div class="event-date-info">
                        <div class="event-date-display">${formattedDate}</div>
                        <div class="event-time">${event.time}</div>
                    </div>
                    <div class="event-details">
                        <h3>${event.title}</h3>
                        <div class="event-location">${event.location}</div>
                        <div class="event-description">${event.description}</div>
                        <div class="event-info-tags">
                            <span class="event-price">${event.price}</span>
                            <span class="event-capacity">${event.capacity}</span>
                        </div>
                    </div>
                    <div class="event-action">
                        <a href="${event.registrationUrl}" class="event-register">Register</a>
                    </div>
                </div>
            `;
        }).join('');

        const managementNote = `
            <div class="events-management-note">
                <p><strong>Event Management System</strong></p>
                <ul>
                    <li>✅ 100% Free - No API subscriptions needed</li>
                    <li>📝 Edit events in <code>data/events.json</code></li>
                    <li>🔄 Auto-sorts by date with featured priority</li>
                    <li>📧 Email registration system included</li>
                    <li>📱 Fully responsive design</li>
                </ul>
            </div>
        `;

        container.innerHTML = eventsHTML + managementNote;
    }

    formatEventDate(dateString) {
        if (dateString.includes('Every')) {
            return dateString;
        }

        try {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.toLocaleDateString('en-US', { month: 'short' });
            const year = date.getFullYear();

            return `${day} ${month} ${year}`;
        } catch (error) {
            return dateString;
        }
    }

    renderEventsError(container) {
        container.innerHTML = `
            <div class="loading">
                Events temporarily unavailable. Please check back soon.
            </div>
        `;
    }

    // ==========================================
    // INSTAGRAM FEED
    // ==========================================

    setupInstagramFeed() {
        const instagramContainer = document.getElementById('instagram-feed');
        if (!instagramContainer) {
            console.log('Instagram container not found');
            return;
        }

        // Instagram Widget Configuration
        // Replace these values after setting up your widget service
        const WIDGET_SERVICE = 'snapwidget'; // Options: 'embedsocial', 'behold', 'snapwidget', 'demo'
        const WIDGET_ID = '1109907'; // Get this from your widget service dashboard

        console.log('Loading Instagram feed...', WIDGET_SERVICE, WIDGET_ID);

        // Check if widget is configured
        if (WIDGET_ID === 'YOUR_WIDGET_ID_HERE' || WIDGET_SERVICE === 'demo') {
            console.log('Instagram widget not configured. Showing demo content.');
            this.loadInstagramDemo(instagramContainer);
            return;
        }

        // Load the appropriate widget based on service
        switch(WIDGET_SERVICE) {
            case 'embedsocial':
                console.log('Loading EmbedSocial widget...');
                this.loadEmbedSocial(instagramContainer, WIDGET_ID);
                break;
            case 'behold':
                console.log('Loading Behold widget...');
                this.loadBehold(instagramContainer, WIDGET_ID);
                break;
            case 'snapwidget':
                console.log('Loading SnapWidget...');
                this.loadSnapWidget(instagramContainer, WIDGET_ID);
                break;
            default:
                console.log('Unknown widget service. Showing demo content.');
                this.loadInstagramDemo(instagramContainer);
        }
    }

    // EmbedSocial Integration
    loadEmbedSocial(container, widgetId) {
        container.innerHTML = `
            <div class="embedsocial-hashtag" data-ref="${widgetId}"></div>
        `;

        // Load EmbedSocial script if not already loaded
        if (!document.getElementById('EmbedSocialHashtagScript')) {
            const script = document.createElement('script');
            script.src = 'https://embedsocial.com/cdn/ht.js';
            script.id = 'EmbedSocialHashtagScript';
            document.body.appendChild(script);
        }
    }

    // Behold Integration
    loadBehold(container, widgetId) {
        container.innerHTML = `
            <figure data-behold-id="${widgetId}"></figure>
        `;

        // Load Behold script if not already loaded
        if (!document.getElementById('BeholdWidgetScript')) {
            const script = document.createElement('script');
            script.src = 'https://w.behold.so/widget.js';
            script.type = 'module';
            script.id = 'BeholdWidgetScript';
            document.body.appendChild(script);
        }
    }

    // SnapWidget Integration
    loadSnapWidget(container, widgetId) {
        console.log('SnapWidget: Creating iframe with ID:', widgetId);

        container.innerHTML = `
            <iframe src="https://snapwidget.com/embed/${widgetId}"
                    class="snapwidget-widget"
                    allowtransparency="true"
                    frameborder="0"
                    scrolling="no"
                    style="border:none; overflow:hidden; width:100%;"
                    title="Your daily dose of Vietnam - one street shot at a time. Tag #vietnamstreets">
            </iframe>
        `;

        console.log('SnapWidget: Iframe created');

        // Load SnapWidget script if not already loaded
        if (!document.getElementById('SnapWidgetScript')) {
            console.log('SnapWidget: Loading script...');
            const script = document.createElement('script');
            script.src = 'https://snapwidget.com/js/snapwidget.js';
            script.id = 'SnapWidgetScript';
            document.body.appendChild(script);
            console.log('SnapWidget: Script added to page');
        } else {
            console.log('SnapWidget: Script already loaded');
        }
    }

    // Demo/Placeholder Content
    loadInstagramDemo(container) {
        const demoContent = `
            <div class="gallery-item observe">
                <div class="gallery-image">
                    <div class="image-placeholder" data-caption="Traditional bánh chưng preparation during Tết celebration"></div>
                </div>
                <div class="gallery-content">
                    <p>Three generations preparing for Vietnamese New Year...</p>
                    <span class="gallery-date">2 days ago</span>
                </div>
            </div>
            <div class="gallery-item observe">
                <div class="gallery-image">
                    <div class="image-placeholder" data-caption="Street food vendor in Ho Chi Minh City"></div>
                </div>
                <div class="gallery-content">
                    <p>Authentic flavors from the streets of Saigon...</p>
                    <span class="gallery-date">5 days ago</span>
                </div>
            </div>
            <div class="gallery-item observe">
                <div class="gallery-image">
                    <div class="image-placeholder" data-caption="Ao dai seamstress in Hoi An workshop"></div>
                </div>
                <div class="gallery-content">
                    <p>Preserving traditional craftsmanship...</p>
                    <span class="gallery-date">1 week ago</span>
                </div>
            </div>
            <div class="gallery-item observe">
                <div class="gallery-image">
                    <div class="image-placeholder" data-caption="Vietnamese coffee ceremony in Da Lat"></div>
                </div>
                <div class="gallery-content">
                    <p>The art of Vietnamese coffee culture...</p>
                    <span class="gallery-date">2 weeks ago</span>
                </div>
            </div>
            <div class="gallery-item observe">
                <div class="gallery-image">
                    <div class="image-placeholder" data-caption="Community gathering at cultural festival"></div>
                </div>
                <div class="gallery-content">
                    <p>Celebrating Vietnamese heritage together...</p>
                    <span class="gallery-date">3 weeks ago</span>
                </div>
            </div>
            <div class="gallery-item observe">
                <div class="gallery-image">
                    <div class="image-placeholder" data-caption="Traditional dragon dance performance"></div>
                </div>
                <div class="gallery-content">
                    <p>Cultural performances bringing communities together...</p>
                    <span class="gallery-date">1 month ago</span>
                </div>
            </div>
        `;

        container.innerHTML = demoContent;
    }

    // ==========================================
    // SCROLL EFFECTS & ANIMATIONS
    // ==========================================

    setupScrollEffects() {
        // Parallax effect for hero
        const hero = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-image');

        if (hero && heroImage) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroImage.style.transform = `translateY(${rate}px)`;
            });
        }

        // Story card hover effects
        const storyCards = document.querySelectorAll('.story-card');
        storyCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        const observeElements = document.querySelectorAll('.observe');
        observeElements.forEach(el => observer.observe(el));

        // Re-observe new elements when they're added (for dynamic content)
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.classList.contains('observe')) {
                        observer.observe(node);
                    }
                    if (node.nodeType === 1) {
                        const childObserveElements = node.querySelectorAll('.observe');
                        childObserveElements.forEach(el => observer.observe(el));
                    }
                });
            });
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    setupImageLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('.image-placeholder');
        images.forEach(img => imageObserver.observe(img));
    }

    setupPageTransitions() {
        const pageTransition = document.getElementById('pageTransition');

        // Smooth page loading
        window.addEventListener('beforeunload', () => {
            if (pageTransition) {
                pageTransition.classList.add('active');
            }
        });

        // Remove transition on load
        window.addEventListener('load', () => {
            if (pageTransition) {
                setTimeout(() => {
                    pageTransition.classList.remove('active');
                }, 100);
            }
        });
    }

    // ==========================================
    // UTILITY METHODS
    // ==========================================

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    new VietnamStreetsApp();
});

// ==========================================
// EVENT MANAGEMENT UTILITIES
// ==========================================

// Template for adding new events
const newEventTemplate = {
    "id": "unique-event-id",
    "title": "Event Title",
    "date": "2025-MM-DD",
    "time": "HH:MM PM - HH:MM PM",
    "location": "Location Name",
    "description": "Detailed event description that captures the essence and purpose of the gathering...",
    "image": "assets/event-image.jpg",
    "registrationUrl": "mailto:events@vietnamstreets.com?subject=Event Registration",
    "price": "Free",
    "capacity": "XX people",
    "featured": false
};

// Add event helper (for development)
function addNewEvent(eventData) {
    console.log('To add a new event, edit data/events.json with:', eventData);
    console.log('Template:', newEventTemplate);
}

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================

// Preload critical resources
const preloadCriticalResources = () => {
    const criticalResources = [
        'data/events.json'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'fetch';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
};

// Initialize performance optimizations
preloadCriticalResources();