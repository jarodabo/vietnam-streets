# Vietnam Streets Landing Page

A static landing page for Vietnam Streets featuring Instagram feed integration and 100% free JSON-based event management.

## Features

- 📱 Responsive design optimized for all devices
- 📸 Instagram feed integration (free widget options)
- 📅 **100% Free event management** (JSON-based, no API costs)
- ⚡ Static hosting ready (Netlify, Vercel, GitHub Pages)
- 🎨 Modern Vietnamese-inspired design
- 🚀 Fast loading and SEO optimized
- 📧 Email registration system included

## Quick Start

1. **Local Development**
   ```bash
   cd "Vietnam Streets"
   npm run dev
   ```
   Open http://localhost:8000

2. **Deploy to Static Hosting**
   - Upload all files to your hosting provider
   - Configure custom domain if needed

## Integration Setup

### Instagram Feed

Replace the demo content with one of these options:

**Option 1: EmbedSocial (Recommended)**
1. Sign up at [embedsocial.com](https://embedsocial.com)
2. Connect your Instagram account
3. Get your widget embed code
4. Replace the demo code in `js/main.js`

**Option 2: Behold**
1. Sign up at [behold.so](https://behold.so)
2. Connect Instagram and create widget
3. Replace the demo code with your Behold embed

### Event Management (100% Free)

**No subscriptions needed! Events are managed through a simple JSON file:**

1. **Add/Edit Events**: Modify `data/events.json`
2. **Event Structure**:
   ```json
   {
     "id": "unique-event-id",
     "title": "Event Title",
     "date": "2025-MM-DD",
     "time": "HH:MM PM - HH:MM PM",
     "location": "Location Name",
     "description": "Event description...",
     "registrationUrl": "mailto:events@email.com",
     "price": "Free",
     "capacity": "XX people",
     "featured": true
   }
   ```
3. **Features**:
   - Auto-sorts by date
   - Featured events priority
   - Email registration links
   - No API costs or limits

## File Structure

```
Vietnam Streets/
├── index.html          # Main landing page
├── css/
│   └── styles.css      # Responsive CSS styles
├── js/
│   └── main.js         # JavaScript functionality
├── data/
│   └── events.json     # Event management (edit to add/update events)
├── assets/             # Images and media files
├── package.json        # Project configuration
└── README.md           # This file
```

## Adding New Events

To add a new event, edit `data/events.json`:

1. Copy the event template
2. Update all fields with your event details
3. Set `"featured": true` to show on main page
4. Use `mailto:` links for free email registration
5. Save the file - changes appear immediately

**Example:**
```json
{
  "id": "cooking-workshop-april",
  "title": "Spring Cooking Workshop",
  "date": "2025-04-15",
  "time": "6:00 PM - 9:00 PM",
  "location": "Vietnam Streets Kitchen",
  "description": "Learn to make traditional spring dishes...",
  "registrationUrl": "mailto:events@vietnamstreets.com?subject=Spring Workshop Registration",
  "price": "Free",
  "capacity": "20 people",
  "featured": true
}
```

## Customization

### Colors
The main brand colors are defined in CSS:
- Primary: `#d73027` (Vietnam red)
- Secondary: `#ff6b35` (Orange accent)

### Content
Update content in `index.html`:
- Hero section text
- About section description
- Contact information
- Social media links

### Styling
Modify `css/styles.css` for design changes:
- Typography (currently using Inter font)
- Layout and spacing
- Colors and gradients
- Responsive breakpoints

## Deployment

### Netlify
1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `/`

### Vercel
1. Import repository
2. Framework preset: Other
3. Build command: `npm run build`

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch

## Performance

- Optimized images and fonts
- Minimal JavaScript bundle
- CSS optimized for fast rendering
- Static hosting for global CDN distribution

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT License - feel free to customize for your needs.