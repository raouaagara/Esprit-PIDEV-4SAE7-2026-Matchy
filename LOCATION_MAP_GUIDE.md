# Location Map Feature Guide

## Overview
A beautiful location map component that shows event locations with support for both physical (offline) and online events.

## Features
- 📍 Location icon in the backoffice header
- 🗺️ Interactive map modal for offline events
- 💻 Special display for online events
- 🎨 Modern purple-themed design
- 🌙 Full dark mode support
- ✨ Smooth animations
- 📱 Fully responsive

## Location

The location icon (📍) is located in the backoffice header, between the notification bell and theme toggle.

## Visual Design

### Location Icon Button
- Purple gradient background
- Badge showing count of offline events
- Bounce animation on hover
- Pulse animation on badge

### Modal Views

#### All Events View (Default)
Shows two sections:
1. **Physical Events** (📍)
   - Grid of event cards
   - Each card shows event title and location
   - "View Map" button to see individual event
   - Hover effects

2. **Online Events** (💻)
   - Grid of event cards
   - Shows "Get it Online" label
   - "Virtual" badge
   - No map interaction

#### Single Event View

**For Offline Events:**
- Event title and address
- "Open in Google Maps" button
- Interactive map (OpenStreetMap embed)
- Map placeholder if coordinates not available
- Back button to return to all events

**For Online Events:**
- Large computer icon (💻)
- Event title
- "Get it Online" label
- Feature cards:
  - 📹 Video Conference
  - 💬 Live Chat
  - 📱 Join from Anywhere
- Floating animation

## Functionality

### Click Location Icon
- Opens modal with all events
- Shows count of offline events in badge
- Loads event data from API

### Event Cards
- **Offline Events**: Click to view map
- **Online Events**: Display only (no interaction)

### Map Features
- Uses OpenStreetMap (no API key needed)
- Shows event location with marker
- "Open in Google Maps" button for navigation
- Responsive iframe embed

### Navigation
- Back button to return to all events list
- Close button or click outside to close modal

## Data Structure

```typescript
interface EventLocation {
  id: number;
  title: string;
  location: string;
  isOnline: boolean;
  latitude?: number;  // Optional coordinates
  longitude?: number; // Optional coordinates
}
```

## Event Detection

Events are classified as:
- **Online**: If location contains "online" (case-insensitive) or location is empty
- **Offline**: All other events

## Styling

### Light Mode
- White/purple gradient background
- Soft shadows
- Purple accents
- Clean borders

### Dark Mode
- Deep purple background (#1a0f2e → #1f1333)
- Enhanced shadows
- Light purple text
- Stronger borders

## Animations

### Icon Button
- Bounce animation on hover
- Badge pulse (continuous)
- Lift effect

### Modal
- Slide up + scale entrance
- Fade in overlay with blur

### Event Cards
- Staggered fade-in (50ms delay each)
- Lift on hover (offline events)
- Scale animation

### Online Event Display
- Float animation on icon
- Scale in animation
- Feature cards hover effects

### Map
- Smooth iframe load
- Fade in animation

## Code Examples

### Using Location Icon
```html
<app-location-icon></app-location-icon>
```

### Component Structure
```typescript
export class LocationIconComponent implements OnInit {
  events: EventLocation[] = [];
  offlineEventsCount = 0;
  onlineEventsCount = 0;

  ngOnInit(): void {
    this.loadEvents();
  }

  openLocationMap(): void {
    if (this.locationMap) {
      this.locationMap.show();
    }
  }
}
```

### Opening Map Programmatically
```typescript
@ViewChild('locationMap') locationMap?: LocationMapComponent;

showMap(event?: EventLocation): void {
  if (this.locationMap) {
    this.locationMap.show(event);
  }
}
```

## Map Integration

### Current Implementation
- Uses OpenStreetMap (free, no API key)
- Embedded iframe
- Marker at event location
- Zoom level: 15

### Google Maps Integration (Optional)
To use Google Maps instead:
1. Get Google Maps API key
2. Update `getMapUrl()` method
3. Replace iframe src with Google Maps embed URL

```typescript
getMapUrl(event: EventLocation): string {
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  if (event.latitude && event.longitude) {
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${event.latitude},${event.longitude}&zoom=15`;
  }
  const query = encodeURIComponent(event.location);
  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&zoom=15`;
}
```

## Adding Coordinates to Events

To enable precise map locations, add latitude and longitude to your event model:

```typescript
// In your event creation/edit form
event = {
  title: 'Spring Boot Workshop',
  location: '123 Main St, City',
  latitude: 40.7128,  // Add this
  longitude: -74.0060 // Add this
};
```

## Responsive Design

### Desktop (> 768px)
- Modal width: 900px
- Grid: Auto-fill columns (min 280px)
- Map height: 450px
- Full features visible

### Mobile (≤ 768px)
- Modal width: 95vw
- Grid: Single column
- Map height: 300px
- Stacked layout
- Touch-optimized

## Accessibility
- Semantic HTML
- Click outside to close
- Keyboard navigation
- Clear visual feedback
- High contrast in dark mode
- Tooltips on buttons

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance
- Lazy loading of map iframe
- Efficient event filtering
- Optimized animations
- Minimal re-renders

## Customization

### Change Map Provider
Edit `getOpenStreetMapUrl()` method to use different map service.

### Modify Colors
Edit `location-map.component.scss`:
- Card backgrounds
- Button colors
- Badge colors
- Dark mode overrides

### Add More Features
1. Search/filter events
2. Distance calculation
3. Directions
4. Multiple markers on one map
5. Clustering for many events

## Tips
- Badge shows count of offline events
- Online events display special card
- Click "Open in Google Maps" for navigation
- Map auto-zooms to event location
- Back button returns to event list

## Future Enhancements
- Real-time location tracking
- Route planning
- Nearby events
- Custom map markers
- Street view integration
- Save favorite locations
- Share location links
- Export to calendar with location
