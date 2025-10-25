// Photography Communities Dashboard Functionality

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const communitySections = document.querySelectorAll('.communities-section');
    const observeElements = document.querySelectorAll('.observe');

    // Platform filtering functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;

            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter sections
            communitySections.forEach(section => {
                const sectionPlatform = section.dataset.platform;

                if (platform === 'all') {
                    section.classList.remove('hidden');
                } else if (sectionPlatform === platform) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with .observe class
    observeElements.forEach(element => {
        observer.observe(element);
    });
});
