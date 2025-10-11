// Connect page functionality

document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    const connectCards = document.querySelectorAll('.connect-card');

    // Newsletter form submission
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;

        // Here you would implement actual newsletter signup logic
        console.log('Newsletter signup:', email);

        // Show success message (placeholder)
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribed!';
        submitBtn.style.backgroundColor = '#10b981';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            emailInput.value = '';
        }, 3000);
    });

    // Intersection Observer for connect cards animation
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

    // Observe all connect cards
    connectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Load Instagram feed (placeholder)
    const instagramFeed = document.getElementById('instagram-feed-connect');
    if (instagramFeed) {
        setTimeout(() => {
            instagramFeed.innerHTML = `
                <div class="instagram-item">
                    <div class="image-placeholder" data-caption="Instagram post 1"></div>
                </div>
                <div class="instagram-item">
                    <div class="image-placeholder" data-caption="Instagram post 2"></div>
                </div>
                <div class="instagram-item">
                    <div class="image-placeholder" data-caption="Instagram post 3"></div>
                </div>
                <div class="instagram-item">
                    <div class="image-placeholder" data-caption="Instagram post 4"></div>
                </div>
                <div class="instagram-item">
                    <div class="image-placeholder" data-caption="Instagram post 5"></div>
                </div>
                <div class="instagram-item">
                    <div class="image-placeholder" data-caption="Instagram post 6"></div>
                </div>
            `;
        }, 500);
    }
});
