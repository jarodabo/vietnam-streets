// Story page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Story page loaded');

    // Share functionality
    initializeShareButtons();

    // Image lazy loading and error handling
    initializeImageHandling();

    // Smooth scroll for internal links
    initializeSmoothScroll();

    // Reading progress indicator
    initializeReadingProgress();
});

// Share button functionality
function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');

    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const url = window.location.href;
            const title = document.querySelector('.story-hero-title')?.textContent || 'Vietnam Streets Story';

            let shareUrl = '';

            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Check out this story: ' + url)}`;
                    break;
            }

            if (shareUrl) {
                if (platform === 'email') {
                    window.location.href = shareUrl;
                } else {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            }
        });
    });
}

// Image handling with fallbacks
function initializeImageHandling() {
    const images = document.querySelectorAll('.story-image img, .story-hero-image img');

    images.forEach(img => {
        // Add loading animation
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });

        // Handle errors with gradient placeholders
        img.addEventListener('error', function() {
            const placeholder = this.closest('.image-placeholder');
            if (placeholder) {
                placeholder.style.minHeight = '500px';
                placeholder.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Reading progress indicator
function initializeReadingProgress() {
    const progressBar = createProgressBar();
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const article = document.querySelector('.story-content');
        if (!article) return;

        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY;

        const progress = Math.min(
            100,
            Math.max(0, ((scrolled - articleTop + windowHeight) / articleHeight) * 100)
        );

        progressBar.style.width = progress + '%';
    });
}

function createProgressBar() {
    const bar = document.createElement('div');
    bar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        width: 0%;
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    return bar;
}

// Image viewer/lightbox (optional enhancement)
function initializeImageViewer() {
    const storyImages = document.querySelectorAll('.story-image img');

    storyImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
}

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    // Close on backdrop click or close button
    lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
        lightbox.remove();
        document.body.style.overflow = '';
    }
}

// Load related stories dynamically (if using JSON data)
async function loadRelatedStories(currentStoryId) {
    try {
        const response = await fetch('/data/stories/heritage-stories.json');
        const stories = await response.json();

        const currentStory = stories.find(s => s.id === currentStoryId);
        if (!currentStory || !currentStory.relatedStories) return;

        const relatedIds = currentStory.relatedStories;
        const relatedStories = stories.filter(s => relatedIds.includes(s.id));

        renderRelatedStories(relatedStories);
    } catch (error) {
        console.log('Related stories not available:', error);
    }
}

function renderRelatedStories(stories) {
    const container = document.querySelector('.related-stories-grid');
    if (!container) return;

    container.innerHTML = stories.map(story => `
        <article class="story-card">
            <div class="story-image-container">
                <img src="${story.coverImage.url}" alt="${story.coverImage.alt}">
            </div>
            <div class="story-info">
                <span class="story-category-tag">${story.category}</span>
                <h3 class="story-title">${story.title}</h3>
                <p class="story-excerpt">${story.summary}</p>
                <a href="/pages/stories/${story.category}/${story.slug}.html" class="story-link">Read Story →</a>
            </div>
        </article>
    `).join('');
}

// Estimate reading time
function calculateReadingTime() {
    const article = document.querySelector('.story-body');
    if (!article) return;

    const text = article.textContent;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);

    const readTimeElement = document.querySelector('.story-meta-item:has(.icon)');
    if (readTimeElement) {
        readTimeElement.querySelector('span').textContent = `${readingTime} min read`;
    }
}

// Track scroll depth for analytics (optional)
function trackScrollDepth() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const tracked = new Set();

    window.addEventListener('scroll', function() {
        const article = document.querySelector('.story-content');
        if (!article) return;

        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY;
        const scrollPercent = Math.min(
            100,
            ((scrolled / (articleHeight - windowHeight)) * 100)
        );

        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
        }

        milestones.forEach(milestone => {
            if (scrollPercent >= milestone && !tracked.has(milestone)) {
                tracked.add(milestone);
                console.log(`Scroll depth: ${milestone}%`);
                // Send to analytics if integrated
                // analytics.track('Story Scroll', { depth: milestone });
            }
        });
    });
}
