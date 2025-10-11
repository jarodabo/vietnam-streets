// Diaspora Stories Page JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Location filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const storyCards = document.querySelectorAll('.diaspora-story-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter story cards by location
            storyCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    const location = card.getAttribute('data-location');
                    if (location === filter) {
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

            // Update visible count
            updateVisibleStoriesCount();
        });
    });

    // Count and display visible stories
    function updateVisibleStoriesCount() {
        const visibleStories = Array.from(storyCards).filter(card =>
            card.style.display !== 'none' && card.style.opacity !== '0'
        );
        console.log(`Showing ${visibleStories.length} diaspora stories`);
    }

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

    // Stat counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalNumber = stat.textContent;
        const hasPlus = finalNumber.includes('+');
        const hasM = finalNumber.includes('M');
        const numericValue = parseFloat(finalNumber.replace(/[^\d.]/g, ''));

        // Animate counting up
        let currentValue = 0;
        const increment = numericValue / 60; // Animate over ~1 second at 60fps

        function updateCounter() {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                let displayValue = hasM ? currentValue.toFixed(1) + 'M' : Math.round(currentValue).toString();
                if (hasPlus) displayValue += '+';
                stat.textContent = displayValue;
            } else {
                let displayValue = hasM ? currentValue.toFixed(1) + 'M' : Math.round(currentValue).toString();
                if (hasPlus) displayValue += '+';
                stat.textContent = displayValue;
                requestAnimationFrame(updateCounter);
            }
        }

        // Start animation when element comes into view
        const statObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    statObserver.unobserve(entry.target);
                }
            });
        });

        statObserver.observe(stat.closest('.stat-item'));
    });

    // Story card interactions
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Click to view story details
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.classList.contains('story-link')) {
                return;
            }

            const storyTitle = this.querySelector('.story-title').textContent;
            const storyLocation = this.querySelector('.location-tag').textContent;

            // Simulate opening story details
            console.log(`Viewing story: ${storyTitle} - ${storyLocation}`);

            // Add visual feedback
            const originalTransform = this.style.transform;
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = originalTransform;
            }, 150);
        });
    });

    // Story link interactions
    const storyLinks = document.querySelectorAll('.story-link');
    storyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const storyTitle = this.closest('.story-info').querySelector('.story-title').textContent;
            const originalText = this.textContent;

            // Visual feedback
            this.textContent = 'Loading...';
            this.style.opacity = '0.6';

            setTimeout(() => {
                this.textContent = 'Read Story';
                this.style.opacity = '1';

                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            }, 1000);

            console.log(`Loading story: ${storyTitle}`);
        });
    });

    // Featured story interactions
    const readStoryBtn = document.querySelector('.read-story-btn');
    if (readStoryBtn) {
        readStoryBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const storyHeadline = document.querySelector('.story-headline').textContent;
            const originalText = this.textContent;

            // Visual feedback
            this.textContent = 'Loading Story...';
            this.style.opacity = '0.6';

            setTimeout(() => {
                this.textContent = 'Story Loaded';
                this.style.backgroundColor = '#4CAF50';
                this.style.borderColor = '#4CAF50';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                    this.style.borderColor = '';
                    this.style.opacity = '';
                }, 3000);
            }, 1500);

            console.log(`Loading featured story: ${storyHeadline}`);
        });
    }

    const viewPhotosLink = document.querySelector('.view-photos-link');
    if (viewPhotosLink) {
        viewPhotosLink.addEventListener('click', function(e) {
            e.preventDefault();

            const originalText = this.textContent;
            this.textContent = 'Loading Photos...';

            setTimeout(() => {
                this.textContent = 'Gallery Loaded';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            }, 1000);
        });
    }

    // Location badge hover effects
    const locationBadges = document.querySelectorAll('.story-location-badge, .location-tag');
    locationBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        badge.addEventListener('mouseleave', function() {
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

    // Story submission tracking (placeholder)
    let submissionInterest = [];

    function trackSubmissionInterest(action) {
        submissionInterest.push({
            action: action,
            timestamp: new Date(),
            page: 'diaspora'
        });
        console.log('Submission interest tracked:', submissionInterest);
    }

    // CTA button interaction
    const ctaButton = document.querySelector('.submit-story-cta .cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            trackSubmissionInterest('cta_clicked');
        });
    }

    // Feature items hover effects
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Story search functionality (placeholder for future implementation)
    function setupStorySearch() {
        const searchInput = document.querySelector('.story-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();

                storyCards.forEach(card => {
                    const storyTitle = card.querySelector('.story-title').textContent.toLowerCase();
                    const storyExcerpt = card.querySelector('.story-excerpt').textContent.toLowerCase();
                    const storyTheme = card.querySelector('.story-theme').textContent.toLowerCase();

                    if (storyTitle.includes(searchTerm) ||
                        storyExcerpt.includes(searchTerm) ||
                        storyTheme.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });

                updateVisibleStoriesCount();
            });
        }
    }

    setupStorySearch();

    // Initialize with all stories visible
    updateVisibleStoriesCount();

    // Map integration placeholder (for future world map feature)
    function initializeWorldMap() {
        // Placeholder for interactive world map showing story locations
        console.log('World map integration ready for future implementation');
    }

    initializeWorldMap();
});