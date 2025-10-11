// Search page functionality

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterPills = document.querySelectorAll('.filter-pill');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    // Search functionality
    function performSearch() {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            console.log('Searching for:', query);
            // Here you would implement actual search logic
            // For now, this is a placeholder
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Filter pills
    filterPills.forEach(pill => {
        pill.addEventListener('click', function() {
            filterPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            console.log('Filter changed to:', filter);
            // Implement filter logic here
        });
    });

    // Suggestion tags
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            searchInput.value = this.textContent;
            performSearch();
        });
    });

    // Intersection Observer for recent items
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

    // Observe recent items
    const recentItems = document.querySelectorAll('.recent-item');
    recentItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});
