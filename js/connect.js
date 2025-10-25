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

    // Load Instagram feed
    const instagramFeed = document.getElementById('instagram-feed-connect');
    if (instagramFeed) {
        // Instagram Widget Configuration (using SnapWidget)
        const WIDGET_ID = '1109907';

        // Create SnapWidget iframe
        const widgetHTML = `
            <iframe
                src="https://snapwidget.com/embed/${WIDGET_ID}"
                class="snapwidget-widget"
                allowtransparency="true"
                frameborder="0"
                scrolling="no"
                style="border:none; overflow:hidden; width:100%; min-height:400px;">
            </iframe>
        `;

        instagramFeed.innerHTML = widgetHTML;

        // Load SnapWidget script if not already loaded
        if (!document.querySelector('script[src*="snapwidget.com"]')) {
            const script = document.createElement('script');
            script.src = 'https://snapwidget.com/js/snapwidget.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }
});
