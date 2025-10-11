// Store Page JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter product cards
            productCards.forEach(card => {
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

    // Shopping cart functionality (placeholder)
    let cart = [];

    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productTitle = this.closest('.product-info').querySelector('.product-title').textContent;
            const originalText = this.textContent;

            // Visual feedback
            this.textContent = 'Added to Cart!';
            this.style.backgroundColor = '#4CAF50';
            this.style.borderColor = '#4CAF50';

            // Reset button after delay
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
                this.style.borderColor = '';
            }, 2000);

            // Add to cart array (placeholder)
            cart.push({
                title: productTitle,
                timestamp: new Date()
            });

            console.log('Cart updated:', cart);
        });
    });

    // Quick add buttons
    const quickAddBtns = document.querySelectorAll('.quick-add-btn');
    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.closest('.product-info').querySelector('.product-name').textContent;
            const originalText = this.textContent;

            // Visual feedback
            this.textContent = 'Added!';
            this.style.backgroundColor = '#1a1a1a';
            this.style.color = '#ffffff';

            // Reset button after delay
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 1500);

            // Add to cart array (placeholder)
            cart.push({
                name: productName,
                timestamp: new Date()
            });

            console.log('Cart updated:', cart);
        });
    });

    // Product hover effects
    const productCards = document.querySelectorAll('.product-card, .featured-product');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Price formatting (if needed for dynamic content)
    const prices = document.querySelectorAll('.price, .product-price');
    prices.forEach(price => {
        const value = price.textContent.replace('$', '').replace(',', '');
        if (!isNaN(value)) {
            price.textContent = '$' + parseFloat(value).toFixed(2);
        }
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

    // Cart counter (placeholder for future implementation)
    function updateCartCounter() {
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            cartCounter.textContent = cart.length;
            if (cart.length > 0) {
                cartCounter.style.display = 'block';
            }
        }
    }

    // Wishlist functionality (placeholder)
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const isActive = this.classList.contains('active');
            this.innerHTML = isActive ? '♥' : '♡';
        });
    });
});