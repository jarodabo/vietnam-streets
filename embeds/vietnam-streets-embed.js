/**
 * Vietnam Streets Embed Widget System
 * Allows external websites to embed Vietnamese cultural content
 */

(function() {
    'use strict';

    // Configuration
    const VIETNAM_STREETS_API = 'http://localhost:8000'; // Update with your domain
    const EMBED_VERSION = '1.0.0';

    // CSS Styles for embeds
    const EMBED_STYLES = `
        .vs-embed {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            background: #ffffff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            max-width: 100%;
        }

        .vs-embed * {
            box-sizing: border-box;
        }

        .vs-embed-header {
            background: #1a1a1a;
            color: #ffffff;
            padding: 12px 16px;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .vs-embed-logo {
            font-size: 16px;
            font-weight: 600;
        }

        .vs-embed-content {
            padding: 16px;
        }

        .vs-embed-story {
            display: flex;
            gap: 16px;
            align-items: flex-start;
        }

        .vs-embed-story-image {
            width: 120px;
            height: 90px;
            background: #f5f5f5;
            border-radius: 4px;
            flex-shrink: 0;
            overflow: hidden;
        }

        .vs-embed-story-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .vs-embed-story-content {
            flex: 1;
        }

        .vs-embed-story-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
            color: #1a1a1a;
            line-height: 1.3;
        }

        .vs-embed-story-meta {
            font-size: 12px;
            color: #666;
            margin-bottom: 8px;
        }

        .vs-embed-story-excerpt {
            font-size: 14px;
            line-height: 1.4;
            color: #333;
            margin-bottom: 12px;
        }

        .vs-embed-story-category {
            display: inline-block;
            background: #f0f0f0;
            color: #666;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .vs-embed-footer {
            background: #f8f8f8;
            padding: 8px 16px;
            border-top: 1px solid #e0e0e0;
            text-align: center;
        }

        .vs-embed-link {
            color: #1a1a1a;
            text-decoration: none;
            font-size: 12px;
            font-weight: 500;
        }

        .vs-embed-link:hover {
            text-decoration: underline;
        }

        .vs-embed-grid {
            display: grid;
            gap: 16px;
        }

        .vs-embed-grid.two-column {
            grid-template-columns: 1fr 1fr;
        }

        .vs-embed-grid.three-column {
            grid-template-columns: repeat(3, 1fr);
        }

        .vs-embed-card {
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            overflow: hidden;
        }

        .vs-embed-card-image {
            width: 100%;
            height: 120px;
            background: #f5f5f5;
            overflow: hidden;
        }

        .vs-embed-card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .vs-embed-card-content {
            padding: 12px;
        }

        .vs-embed-card-title {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 4px;
            color: #1a1a1a;
        }

        .vs-embed-card-meta {
            font-size: 11px;
            color: #666;
            margin-bottom: 8px;
        }

        .vs-embed-card-description {
            font-size: 12px;
            line-height: 1.4;
            color: #555;
        }

        .vs-embed-photographer {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            margin-bottom: 12px;
        }

        .vs-embed-photographer-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #f5f5f5;
            overflow: hidden;
        }

        .vs-embed-photographer-info h4 {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 2px;
            color: #1a1a1a;
        }

        .vs-embed-photographer-info p {
            font-size: 12px;
            color: #666;
            margin: 0;
        }

        .vs-embed-event {
            display: flex;
            gap: 12px;
            padding: 12px;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            margin-bottom: 12px;
        }

        .vs-embed-event-date {
            background: #1a1a1a;
            color: white;
            padding: 8px;
            border-radius: 4px;
            text-align: center;
            min-width: 60px;
        }

        .vs-embed-event-date-month {
            font-size: 10px;
            text-transform: uppercase;
        }

        .vs-embed-event-date-day {
            font-size: 18px;
            font-weight: 600;
            line-height: 1;
        }

        .vs-embed-event-info h4 {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 4px;
            color: #1a1a1a;
        }

        .vs-embed-event-info p {
            font-size: 12px;
            color: #666;
            margin: 0 0 4px 0;
        }

        .vs-embed-loading {
            text-align: center;
            padding: 32px 16px;
            color: #666;
            font-size: 14px;
        }

        .vs-embed-error {
            text-align: center;
            padding: 32px 16px;
            color: #dc3545;
            font-size: 14px;
        }

        @media (max-width: 768px) {
            .vs-embed-story {
                flex-direction: column;
            }

            .vs-embed-story-image {
                width: 100%;
                height: 160px;
            }

            .vs-embed-grid.two-column,
            .vs-embed-grid.three-column {
                grid-template-columns: 1fr;
            }
        }
    `;

    // Inject CSS
    function injectCSS() {
        if (document.getElementById('vs-embed-styles')) return;

        const style = document.createElement('style');
        style.id = 'vs-embed-styles';
        style.textContent = EMBED_STYLES;
        document.head.appendChild(style);
    }

    // Create embed container
    function createEmbedContainer(config) {
        const container = document.createElement('div');
        container.className = 'vs-embed';
        container.style.width = config.width || '100%';
        container.style.height = config.height || 'auto';

        return container;
    }

    // Create embed header
    function createEmbedHeader(title, showLogo = true) {
        const header = document.createElement('div');
        header.className = 'vs-embed-header';

        if (showLogo) {
            header.innerHTML = `
                <span class="vs-embed-logo">Vietnam Streets</span>
                <span>${title}</span>
            `;
        } else {
            header.innerHTML = `<span>${title}</span>`;
        }

        return header;
    }

    // Create embed footer
    function createEmbedFooter(linkText = 'Visit Vietnam Streets') {
        const footer = document.createElement('div');
        footer.className = 'vs-embed-footer';
        footer.innerHTML = `
            <a href="${VIETNAM_STREETS_API}" target="_blank" class="vs-embed-link">
                ${linkText} →
            </a>
        `;
        return footer;
    }

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return {
            month: date.toLocaleDateString('en', { month: 'short' }),
            day: date.getDate()
        };
    }

    // Story Embed Widget
    function createStoryEmbed(config) {
        const container = createEmbedContainer(config);
        const header = createEmbedHeader('Latest Story');
        const content = document.createElement('div');
        content.className = 'vs-embed-content';
        const footer = createEmbedFooter('Read more stories');

        container.appendChild(header);
        container.appendChild(content);
        container.appendChild(footer);

        // Show loading
        content.innerHTML = '<div class="vs-embed-loading">Loading story...</div>';

        // Load story data
        loadStoryData(config.storyId || 'latest')
            .then(story => {
                content.innerHTML = `
                    <div class="vs-embed-story">
                        <div class="vs-embed-story-image">
                            <div style="width: 100%; height: 100%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #999; font-size: 12px;">
                                ${story.imageCaption || 'Story Image'}
                            </div>
                        </div>
                        <div class="vs-embed-story-content">
                            <div class="vs-embed-story-title">${story.title}</div>
                            <div class="vs-embed-story-meta">${story.location} • ${new Date(story.date).toLocaleDateString()}</div>
                            <div class="vs-embed-story-excerpt">${story.excerpt}</div>
                            <span class="vs-embed-story-category">${story.category}</span>
                        </div>
                    </div>
                `;
            })
            .catch(() => {
                content.innerHTML = '<div class="vs-embed-error">Failed to load story</div>';
            });

        return container;
    }

    // Stories Grid Embed Widget
    function createStoriesGridEmbed(config) {
        const container = createEmbedContainer(config);
        const header = createEmbedHeader('Featured Stories');
        const content = document.createElement('div');
        content.className = 'vs-embed-content';
        const footer = createEmbedFooter('View all stories');

        container.appendChild(header);
        container.appendChild(content);
        container.appendChild(footer);

        // Show loading
        content.innerHTML = '<div class="vs-embed-loading">Loading stories...</div>';

        // Load stories data
        loadStoriesData(config.limit || 3)
            .then(stories => {
                const grid = document.createElement('div');
                grid.className = `vs-embed-grid ${config.columns === 2 ? 'two-column' : 'three-column'}`;

                stories.forEach(story => {
                    const card = document.createElement('div');
                    card.className = 'vs-embed-card';
                    card.innerHTML = `
                        <div class="vs-embed-card-image">
                            <div style="width: 100%; height: 100%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #999; font-size: 11px;">
                                ${story.imageCaption || 'Story Image'}
                            </div>
                        </div>
                        <div class="vs-embed-card-content">
                            <div class="vs-embed-card-title">${story.title}</div>
                            <div class="vs-embed-card-meta">${story.location}</div>
                            <div class="vs-embed-card-description">${story.excerpt.substring(0, 80)}...</div>
                        </div>
                    `;
                    grid.appendChild(card);
                });

                content.innerHTML = '';
                content.appendChild(grid);
            })
            .catch(() => {
                content.innerHTML = '<div class="vs-embed-error">Failed to load stories</div>';
            });

        return container;
    }

    // Photographer Showcase Embed
    function createPhotographerEmbed(config) {
        const container = createEmbedContainer(config);
        const header = createEmbedHeader('Featured Photographers');
        const content = document.createElement('div');
        content.className = 'vs-embed-content';
        const footer = createEmbedFooter('Meet all photographers');

        container.appendChild(header);
        container.appendChild(content);
        container.appendChild(footer);

        content.innerHTML = '<div class="vs-embed-loading">Loading photographers...</div>';

        // Load photographer data
        loadPhotographersData(config.limit || 3)
            .then(photographers => {
                content.innerHTML = photographers.map(photographer => `
                    <div class="vs-embed-photographer">
                        <div class="vs-embed-photographer-avatar">
                            <div style="width: 100%; height: 100%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #999; font-size: 10px;">
                                ${photographer.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        </div>
                        <div class="vs-embed-photographer-info">
                            <h4>${photographer.name}</h4>
                            <p>${photographer.location}</p>
                            <p>${photographer.specialty}</p>
                        </div>
                    </div>
                `).join('');
            })
            .catch(() => {
                content.innerHTML = '<div class="vs-embed-error">Failed to load photographers</div>';
            });

        return container;
    }

    // Events Calendar Embed
    function createEventsEmbed(config) {
        const container = createEmbedContainer(config);
        const header = createEmbedHeader('Upcoming Events');
        const content = document.createElement('div');
        content.className = 'vs-embed-content';
        const footer = createEmbedFooter('View all events');

        container.appendChild(header);
        container.appendChild(content);
        container.appendChild(footer);

        content.innerHTML = '<div class="vs-embed-loading">Loading events...</div>';

        // Load events data
        loadEventsData(config.limit || 3)
            .then(events => {
                content.innerHTML = events.map(event => {
                    const eventDate = formatDate(event.date);
                    return `
                        <div class="vs-embed-event">
                            <div class="vs-embed-event-date">
                                <div class="vs-embed-event-date-month">${eventDate.month}</div>
                                <div class="vs-embed-event-date-day">${eventDate.day}</div>
                            </div>
                            <div class="vs-embed-event-info">
                                <h4>${event.title}</h4>
                                <p>${event.location}</p>
                                <p>${event.description?.substring(0, 60)}...</p>
                            </div>
                        </div>
                    `;
                }).join('');
            })
            .catch(() => {
                content.innerHTML = '<div class="vs-embed-error">Failed to load events</div>';
            });

        return container;
    }

    // Data loading functions
    async function loadStoryData(storyId) {
        try {
            // Try to load from local data first, then fallback to API
            const response = await fetch('../data/stories.json').catch(() =>
                fetch(`${VIETNAM_STREETS_API}/api/stories/${storyId === 'latest' ? '' : storyId}`)
            );

            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();
            const stories = Array.isArray(data) ? data : [data];
            const story = storyId === 'latest' ? stories[0] : stories.find(s => s.id === storyId) || stories[0];

            return {
                id: story.id,
                title: story.title,
                category: story.category,
                excerpt: story.excerpt,
                location: story.location,
                date: story.date,
                imageCaption: story.title
            };
        } catch (error) {
            // Fallback to demo data
            return {
                id: '1',
                title: 'The Art of Tết Preparation',
                category: 'heritage',
                excerpt: 'Three generations of women gather in a rural village to prepare traditional foods for Vietnamese New Year.',
                location: 'Mekong Delta, Vietnam',
                date: '2025-01-15',
                imageCaption: 'Elderly woman preparing traditional bánh chưng'
            };
        }
    }

    async function loadStoriesData(limit) {
        try {
            // Try to load from local data first, then fallback to API
            const response = await fetch('../data/stories.json').catch(() =>
                fetch(`${VIETNAM_STREETS_API}/api/stories`)
            );

            if (!response.ok) throw new Error('Failed to fetch');

            const stories = await response.json();
            return stories.slice(0, limit).map(story => ({
                title: story.title,
                category: story.category,
                excerpt: story.excerpt,
                location: story.location,
                imageCaption: story.title
            }));
        } catch (error) {
            // Fallback to demo data
            return [
                {
                    title: 'The Art of Tết Preparation',
                    category: 'heritage',
                    excerpt: 'Three generations of women gather in a rural village to prepare traditional foods for Vietnamese New Year.',
                    location: 'Mekong Delta, Vietnam',
                    imageCaption: 'Tết celebration'
                },
                {
                    title: 'Between Two Worlds',
                    category: 'diaspora',
                    excerpt: 'A Vietnamese-American family navigates cultural identity in suburban California.',
                    location: 'San Jose, California',
                    imageCaption: 'Vietnamese-American family'
                }
            ].slice(0, limit);
        }
    }

    async function loadPhotographersData(limit) {
        try {
            // Try to load from local data first, then fallback to API
            const response = await fetch('../data/photographers.json').catch(() =>
                fetch(`${VIETNAM_STREETS_API}/api/photographers`)
            );

            if (!response.ok) throw new Error('Failed to fetch');

            const photographers = await response.json();
            return photographers
                .filter(photographer => photographer.featured)
                .slice(0, limit)
                .map(photographer => ({
                    name: photographer.name,
                    location: photographer.location,
                    specialty: photographer.specialty,
                    bio: photographer.bio,
                    experience: photographer.experience
                }));
        } catch (error) {
            // Fallback to demo data
            return [
                { name: 'Minh Nguyen', location: 'Ho Chi Minh City, Vietnam', specialty: 'Street Photography' },
                { name: 'Linh Pham', location: 'Hanoi, Vietnam', specialty: 'Heritage & Architecture' },
                { name: 'David Tran', location: 'San Francisco, CA', specialty: 'Community & Identity' }
            ].slice(0, limit);
        }
    }

    async function loadEventsData(limit) {
        try {
            // Try to load from local data first, then fallback to API
            const response = await fetch('../data/events.json').catch(() =>
                fetch(`${VIETNAM_STREETS_API}/api/events`)
            );

            if (!response.ok) throw new Error('Failed to fetch');

            const events = await response.json();
            return events
                .filter(event => event.featured)
                .slice(0, limit)
                .map(event => ({
                    title: event.title,
                    location: event.location,
                    date: event.date,
                    description: event.description,
                    venue: event.venue,
                    price: event.price,
                    type: event.type
                }));
        } catch (error) {
            // Fallback to demo data
            return [
                {
                    title: 'Heritage Photography Workshop',
                    location: 'San Francisco, CA',
                    date: '2025-02-15',
                    description: 'Learn documentary photography techniques while exploring Vietnamese cultural sites.'
                },
                {
                    title: 'Tết Festival 2025',
                    location: 'Westminster, CA',
                    date: '2025-01-29',
                    description: 'Join the largest Vietnamese New Year celebration in North America.'
                },
                {
                    title: 'Literature & Memory Panel',
                    location: 'Virtual Event',
                    date: '2025-02-22',
                    description: 'Vietnamese-American authors discuss literature and cultural memory.'
                }
            ].slice(0, limit);
        }
    }

    // Main VietnamStreets object
    window.VietnamStreets = {
        version: EMBED_VERSION,

        init: function() {
            injectCSS();
            this.processEmbeds();
        },

        processEmbeds: function() {
            const embeds = document.querySelectorAll('[data-vietnam-streets-embed]');

            embeds.forEach(element => {
                const config = {
                    type: element.getAttribute('data-vietnam-streets-embed'),
                    width: element.getAttribute('data-width'),
                    height: element.getAttribute('data-height'),
                    storyId: element.getAttribute('data-story-id'),
                    limit: parseInt(element.getAttribute('data-limit')) || 3,
                    columns: parseInt(element.getAttribute('data-columns')) || 3
                };

                let widget;

                switch(config.type) {
                    case 'story':
                        widget = createStoryEmbed(config);
                        break;
                    case 'stories-grid':
                        widget = createStoriesGridEmbed(config);
                        break;
                    case 'photographer':
                        widget = createPhotographerEmbed(config);
                        break;
                    case 'events':
                        widget = createEventsEmbed(config);
                        break;
                    default:
                        console.warn('Unknown Vietnam Streets embed type:', config.type);
                        return;
                }

                if (widget) {
                    element.innerHTML = '';
                    element.appendChild(widget);
                }
            });
        },

        // Manual embed creation
        createStoryEmbed: createStoryEmbed,
        createStoriesGridEmbed: createStoriesGridEmbed,
        createPhotographerEmbed: createPhotographerEmbed,
        createEventsEmbed: createEventsEmbed
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.VietnamStreets.init();
        });
    } else {
        window.VietnamStreets.init();
    }

})();