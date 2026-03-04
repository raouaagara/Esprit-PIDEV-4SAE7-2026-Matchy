# Notification Bell Guide

## Overview
A beautiful, animated notification bell component that displays pending registrations in the admin dashboard.

## Features
- 🔔 Modern bell icon with shake animation
- 🔴 Red badge showing pending count
- 📋 Dropdown panel with pending registrations
- 🔄 Auto-refresh every 30 seconds
- 🌙 Full dark mode support
- ✨ Smooth animations and transitions
- 📱 Fully responsive

## Location
The notification bell is located in the backoffice header, next to the theme toggle button and "Front Office" link.

## Visual Design

### Bell Button
- **Light Mode**: Soft purple background with gradient
- **Dark Mode**: Deeper purple with enhanced shadows
- **Hover Effect**: Lifts up with bell ring animation
- **Active State**: Bell shake animation when notifications exist

### Notification Badge
- **Color**: Red gradient (#ff4757 → #e74c3c)
- **Animation**: Continuous pulse effect
- **Position**: Top-right corner of bell button
- **Content**: Number of pending registrations

### Dropdown Panel
- **Width**: 380px (responsive on mobile)
- **Max Height**: 500px with scrollable list
- **Background**: Purple-tinted gradient with glassmorphism
- **Arrow**: Pointing to the bell button
- **Animation**: Slide down with scale effect

## Functionality

### Auto-Refresh
- Loads pending registrations on component init
- Refreshes every 30 seconds automatically
- Updates badge count in real-time

### Dropdown Content

#### Header
- Title: "Pending Registrations"
- Count badge showing total pending

#### Notification Items (Max 5 shown)
Each item displays:
- **Avatar**: User initials in purple circle
- **User Name**: First name + Last name
- **Event Name**: Event title (truncated if too long)
- **Status Badge**: "PENDING" in orange
- **Timestamp**: Registration date/time

#### Footer
- "Check All Registrations" button
- Redirects to Registration Management page

### Empty State
When no pending registrations:
- ✅ Checkmark icon with float animation
- Message: "No pending registrations"

## Interactions

### Click Bell Button
- Opens/closes the dropdown panel
- Bell rings on hover
- Badge pulses continuously

### Click Outside
- Automatically closes the dropdown

### Hover Notification Item
- Background highlight
- Slide-in effect
- Avatar scales and rotates

### Click "Check All Registrations"
- Closes dropdown
- Navigates to `/backoffice/registrations`

## Animations

### Bell Animations
- **Hover**: Bell ring (swing left-right)
- **Has Notifications**: Continuous shake every 2 seconds
- **Badge**: Pulse effect (scale + shadow)

### Dropdown Animations
- **Entrance**: Slide down + scale
- **Items**: Staggered fade-in slide (50ms delay each)
- **Empty Icon**: Float up and down

### Hover Effects
- **Button**: Lift with shadow
- **Avatar**: Scale + rotate
- **View All Button**: Lift with icon scale

## Styling

### Light Mode
- Background: White/purple gradient
- Text: Dark purple tones
- Borders: Light purple
- Shadows: Soft purple shadows

### Dark Mode
- Background: Deep purple gradient (#1a0f2e → #1f1333)
- Text: Light purple (#e8e0f5, #c8b3e6)
- Borders: Medium purple
- Shadows: Strong dark shadows

## Code Example

### Using in Template
```html
<app-notification-bell></app-notification-bell>
```

### Component Structure
```typescript
export class NotificationBellComponent implements OnInit {
  isOpen = false;
  pendingRegistrations: Registration[] = [];
  pendingCount = 0;

  ngOnInit(): void {
    this.loadPendingRegistrations();
    // Auto-refresh every 30 seconds
    setInterval(() => {
      this.loadPendingRegistrations();
    }, 30000);
  }
}
```

## API Integration

### Endpoint Used
- `GET /api/registrations` - Fetches all registrations
- Filters for `status === 'PENDING'`
- Shows latest 5 in dropdown
- Badge shows total count

### Data Flow
1. Component loads → Fetch all registrations
2. Filter pending registrations
3. Update badge count
4. Display latest 5 in dropdown
5. Auto-refresh every 30 seconds

## Responsive Design

### Desktop (> 600px)
- Dropdown width: 380px
- Full padding and spacing
- All features visible

### Mobile (≤ 600px)
- Dropdown width: calc(100vw - 32px)
- Adjusted padding
- Optimized for touch

## Accessibility
- Semantic HTML structure
- Click outside to close
- Keyboard navigation support
- Clear visual feedback
- High contrast in dark mode

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Customization

### Change Refresh Interval
Edit the interval in `notification-bell.component.ts`:
```typescript
setInterval(() => {
  this.loadPendingRegistrations();
}, 30000); // Change 30000 to desired milliseconds
```

### Change Max Items Shown
Edit the slice in `loadPendingRegistrations()`:
```typescript
.slice(0, 5); // Change 5 to desired number
```

### Modify Colors
Edit `notification-bell.component.scss`:
- Bell button background
- Badge colors
- Dropdown styling
- Dark mode overrides

## Tips
- Badge pulses to draw attention
- Bell shakes when notifications exist
- Auto-refresh keeps data current
- Click anywhere outside to close
- Smooth animations enhance UX
- Dark mode fully supported

## Future Enhancements
- Mark notifications as read
- Filter by event
- Sound notification option
- Real-time updates with WebSocket
- Notification preferences
- Custom notification types
