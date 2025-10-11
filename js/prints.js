// Fine Prints Page JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const printCards = document.querySelectorAll('.print-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter print cards
            printCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
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

    // Inquire button functionality
    const inquireBtn = document.querySelector('.inquire-btn');
    if (inquireBtn) {
        inquireBtn.addEventListener('click', function() {
            const printTitle = document.querySelector('.print-title').textContent;
            const printArtist = document.querySelector('.print-artist').textContent;

            // Simulate inquiry process
            const originalText = this.textContent;
            this.textContent = 'Sending Inquiry...';
            this.style.opacity = '0.6';

            setTimeout(() => {
                this.textContent = 'Inquiry Sent!';
                this.style.backgroundColor = '#4CAF50';
                this.style.borderColor = '#4CAF50';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                    this.style.borderColor = '';
                    this.style.opacity = '';
                }, 3000);
            }, 1500);

            // Log inquiry (placeholder for actual functionality)
            console.log(`Inquiry sent for: ${printTitle} ${printArtist}`);
        });
    }

    // Print card hover effects
    printCards.forEach(card => {
        const overlay = card.querySelector('.print-overlay');

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });

        // Click to inquire about specific print
        card.addEventListener('click', function() {
            const printName = this.querySelector('.print-name').textContent;
            const printPhotographer = this.querySelector('.print-photographer').textContent;
            const printPrice = this.querySelector('.print-price').textContent;

            // Simulate opening inquiry modal or redirecting
            console.log(`Interest in: ${printName} by ${printPhotographer} - ${printPrice}`);

            // Add visual feedback
            const originalTransform = this.style.transform;
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = originalTransform;
            }, 150);
        });
    });

    // Certificate viewing functionality
    const certificateLinks = document.querySelectorAll('.view-certificate');
    certificateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Simulate certificate viewing
            const originalText = this.textContent;
            this.textContent = 'Loading Certificate...';

            setTimeout(() => {
                this.textContent = 'Certificate Loaded';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            }, 1000);
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

    // Print size selection (for future implementation)
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all size buttons
            sizeButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Update price display based on size
            const size = this.getAttribute('data-size');
            const price = this.getAttribute('data-price');
            console.log(`Selected size: ${size}, Price: ${price}`);
        });
    });

    // Lightbox functionality (placeholder for future implementation)
    const printImages = document.querySelectorAll('.print-image, .featured-print-image');
    printImages.forEach(image => {
        image.addEventListener('click', function() {
            // Placeholder for lightbox/modal functionality
            console.log('Opening image in lightbox...');

            // Add visual feedback
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Print comparison functionality (placeholder)
    let comparisonList = [];

    function addToComparison(printId) {
        if (!comparisonList.includes(printId)) {
            comparisonList.push(printId);
            console.log('Added to comparison:', printId);
            console.log('Current comparison list:', comparisonList);
        }
    }

    // Price formatter for any dynamic content
    const prices = document.querySelectorAll('.print-price');
    prices.forEach(price => {
        const text = price.textContent;
        if (text.includes('From $')) {
            const value = text.replace('From $', '').replace(',', '');
            if (!isNaN(value)) {
                price.textContent = 'From $' + parseFloat(value).toFixed(0);
            }
        }
    });
});