// Calendar Integration for Vietnam Streets Events
// Generates .ics files for "Add to Calendar" functionality

class EventCalendar {
    /**
     * Generate an .ics file for a calendar event
     * @param {Object} event - Event object from events.json
     * @returns {string} - .ics file content
     */
    static generateICS(event) {
        // Parse date and time
        const eventDate = new Date(event.date);
        const [startTime, endTime] = this.parseTime(event.time);

        // Create start and end datetime
        const start = this.combineDateTime(eventDate, startTime);
        const end = this.combineDateTime(eventDate, endTime || startTime);

        // Format dates for ICS (YYYYMMDDTHHMMSS)
        const formatDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        // Generate unique ID
        const uid = `${event.id}@vietnamstreets.com`;

        // Clean description (remove HTML, limit length)
        const description = this.cleanDescription(event.description);

        // Build location string
        const location = event.venue ? `${event.venue}, ${event.location}` : event.location;

        // Generate ICS content
        const ics = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Vietnam Streets//Events Calendar//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `UID:${uid}`,
            `DTSTAMP:${formatDate(new Date())}`,
            `DTSTART:${formatDate(start)}`,
            `DTEND:${formatDate(end)}`,
            `SUMMARY:${this.escapeICS(event.title)}`,
            `DESCRIPTION:${this.escapeICS(description)}`,
            `LOCATION:${this.escapeICS(location)}`,
            `URL:https://vietnamstreets.com/events/${event.id}`,
            `STATUS:CONFIRMED`,
            `SEQUENCE:0`,
            'BEGIN:VALARM',
            'TRIGGER:-PT24H',
            'ACTION:DISPLAY',
            'DESCRIPTION:Reminder: ' + this.escapeICS(event.title) + ' tomorrow',
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        return ics;
    }

    /**
     * Parse time string like "10:00 AM - 4:00 PM" into start and end times
     */
    static parseTime(timeString) {
        const times = timeString.match(/\d{1,2}:\d{2}\s*(?:AM|PM)/gi);
        if (!times || times.length === 0) {
            return ['10:00 AM', '11:00 AM']; // Default
        }
        return times.length === 2 ? times : [times[0], times[0]];
    }

    /**
     * Combine date and time string into Date object
     */
    static combineDateTime(date, timeString) {
        const [time, meridiem] = timeString.split(/\s+/);
        let [hours, minutes] = time.split(':').map(Number);

        if (meridiem.toUpperCase() === 'PM' && hours !== 12) {
            hours += 12;
        } else if (meridiem.toUpperCase() === 'AM' && hours === 12) {
            hours = 0;
        }

        const combined = new Date(date);
        combined.setHours(hours, minutes, 0, 0);
        return combined;
    }

    /**
     * Clean and truncate description for calendar
     */
    static cleanDescription(text) {
        // Remove HTML tags if any
        const clean = text.replace(/<[^>]*>/g, '');
        // Limit to 200 characters
        return clean.length > 200 ? clean.substring(0, 197) + '...' : clean;
    }

    /**
     * Escape special characters for ICS format
     */
    static escapeICS(text) {
        return text
            .replace(/\\/g, '\\\\')
            .replace(/;/g, '\\;')
            .replace(/,/g, '\\,')
            .replace(/\n/g, '\\n');
    }

    /**
     * Trigger download of .ics file
     */
    static downloadICS(event) {
        const icsContent = this.generateICS(event);
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', `${event.id}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Generate Google Calendar URL
     */
    static getGoogleCalendarURL(event) {
        const start = this.combineDateTime(new Date(event.date), this.parseTime(event.time)[0]);
        const end = this.combineDateTime(new Date(event.date), this.parseTime(event.time)[1] || this.parseTime(event.time)[0]);

        // Google Calendar URL format
        const formatGoogleDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: event.title,
            dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
            details: event.description,
            location: event.venue ? `${event.venue}, ${event.location}` : event.location
        });

        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    }

    /**
     * Generate Outlook calendar URL
     */
    static getOutlookURL(event) {
        const start = this.combineDateTime(new Date(event.date), this.parseTime(event.time)[0]);
        const end = this.combineDateTime(new Date(event.date), this.parseTime(event.time)[1] || this.parseTime(event.time)[0]);

        const params = new URLSearchParams({
            subject: event.title,
            startdt: start.toISOString(),
            enddt: end.toISOString(),
            body: event.description,
            location: event.venue ? `${event.venue}, ${event.location}` : event.location,
            path: '/calendar/action/compose',
            rru: 'addevent'
        });

        return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
    }

    /**
     * Create "Add to Calendar" dropdown menu
     * @param {Object} event - Event object
     * @param {HTMLElement} container - DOM element to append calendar buttons to
     */
    static createCalendarButtons(event, container) {
        const calendarDropdown = document.createElement('div');
        calendarDropdown.className = 'calendar-dropdown';
        calendarDropdown.innerHTML = `
            <button class="calendar-btn" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Add to Calendar
            </button>
            <div class="calendar-menu" style="display: none;">
                <a href="${this.getGoogleCalendarURL(event)}" target="_blank" class="calendar-option">
                    Google Calendar
                </a>
                <a href="${this.getOutlookURL(event)}" target="_blank" class="calendar-option">
                    Outlook
                </a>
                <button class="calendar-option download-ics" type="button">
                    Apple Calendar / iCal
                </button>
            </div>
        `;

        // Add to container
        container.appendChild(calendarDropdown);

        // Add event listeners
        const btn = calendarDropdown.querySelector('.calendar-btn');
        const menu = calendarDropdown.querySelector('.calendar-menu');
        const downloadBtn = calendarDropdown.querySelector('.download-ics');

        // Toggle dropdown
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        });

        // Download .ics file
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.downloadICS(event);
            menu.style.display = 'none';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            menu.style.display = 'none';
        });
    }

    /**
     * Initialize calendar buttons for all events on page
     */
    static initializeCalendarButtons() {
        // Load events data
        fetch('../data/events.json')
            .then(response => response.json())
            .then(events => {
                // Find all event cards with calendar containers
                document.querySelectorAll('[data-event-id]').forEach(eventElement => {
                    const eventId = eventElement.getAttribute('data-event-id');
                    const event = events.find(e => e.id === eventId);

                    if (event) {
                        const calendarContainer = eventElement.querySelector('.calendar-container');
                        if (calendarContainer) {
                            this.createCalendarButtons(event, calendarContainer);
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Error loading events for calendar:', error);
            });
    }
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        EventCalendar.initializeCalendarButtons();
    });
} else {
    EventCalendar.initializeCalendarButtons();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventCalendar;
}
