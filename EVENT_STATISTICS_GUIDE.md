# Event Statistics Panel Guide

## Overview
A beautiful, animated statistics panel that displays real-time event registration data for admins.

## Features
- 📊 Real-time statistics for each event
- 📈 Visual progress bars and charts
- 🎨 Modern purple-themed design
- 🌙 Full dark mode support
- ✨ Smooth animations
- 🔄 Refresh button for live updates
- 📱 Fully responsive

## Location
The statistics icon (📊) is located in the Actions column of the Events Management table, next to View, Edit, and Delete buttons.

## Statistics Displayed

### 1. Stats Cards (4 Cards)
- **👥 Total Registrations**: All registrations for the event
- **✅ Approved**: Number of approved registrations
- **⏳ Pending**: Number of pending registrations
- **❌ Rejected**: Number of rejected registrations

### 2. Fill Rate Section
Shows how full the event is:
- **Current/Capacity**: e.g., "25 / 100 participants"
- **Percentage**: e.g., "25.0%"
- **Status Badge**: 
  - "Low" (< 50%) - Purple
  - "Good" (50-69%) - Green
  - "Filling Up" (70-89%) - Orange
  - "Almost Full" (90-100%) - Red
- **Progress Bar**: Visual representation with color coding

### 3. Registration Breakdown Chart
Horizontal bar chart showing:
- **Approved** (Green bar)
- **Pending** (Orange bar)
- **Rejected** (Red bar)

Each bar shows the count and percentage relative to total registrations.

## Visual Design

### Panel Structure
- **Header**: 
  - 📊 Icon with event title
  - 🔄 Refresh button
  - ✕ Close button
- **Content**:
  - Stats cards grid (2x2 on desktop, 2x1 on mobile)
  - Fill rate section with progress bar
  - Bar chart visualization
- **Animations**:
  - Slide in from right
  - Staggered card animations
  - Progress bar fill animation
  - Shimmer effects

### Color Coding

#### Fill Rate Colors
- **Purple (#9370db)**: 0-49% (Low)
- **Green (#2ed573)**: 50-69% (Good)
- **Orange (#ffa502)**: 70-89% (Filling Up)
- **Red (#ff4757)**: 90-100% (Almost Full)

#### Status Colors
- **Approved**: Green gradient
- **Pending**: Orange gradient
- **Rejected**: Red gradient
- **Total**: Purple gradient

### Dark Mode
- Deep purple background (#1a0f2e → #1f1333)
- Light purple text (#c8b3e6, #e8e0f5)
- Enhanced shadows
- Adjusted card backgrounds

## Interactions

### Click Statistics Icon (📊)
- Opens the statistics panel
- Loads real-time data from API
- Shows loading spinner while fetching

### Click Refresh Button (🔄)
- Reloads statistics
- Refresh icon spins
- Updates all data

### Click Close Button (✕)
- Closes the panel
- Close icon rotates 90°

### Click Outside Panel
- Automatically closes the panel

## Animations

### Panel Entrance
- Slide in from right
- Fade in overlay with blur

### Stats Cards
- Scale in animation
- Staggered delays (50ms each)
- Hover: Lift up with shadow

### Progress Bar
- Fill animation (1s duration)
- Shimmer effect overlay
- Smooth color transitions

### Bar Chart
- Bars grow from left to right (1s duration)
- Shimmer effect on bars
- Staggered fade-in (100ms delay each)

### Icons
- Header icon: Bounce in
- Refresh icon: Spin on hover
- Close icon: Rotate on hover
- Stat icons: Drop shadow

## Data Flow

### API Integration
1. Click statistics icon
2. Component receives event data (ID, title, capacity)
3. Fetches all registrations from API
4. Filters registrations by event ID
5. Calculates statistics:
   - Total count
   - Approved count
   - Pending count
   - Rejected count
   - Fill rate = (Approved / Capacity) × 100
6. Updates UI with animated transitions

### Real-Time Updates
- Click refresh button to reload data
- Statistics update without closing panel
- Loading state shown during fetch

## Code Example

### Opening Statistics Panel
```typescript
openStatistics(event: any): void {
  this.selectedEventId = event.id;
  this.selectedEventTitle = event.title;
  this.selectedEventCapacity = event.maxAttendees;
  
  if (this.statisticsPanel) {
    this.statisticsPanel.show();
  }
}
```

### Component Usage
```html
<app-event-statistics-panel 
  #statisticsPanel
  [eventId]="selectedEventId"
  [eventTitle]="selectedEventTitle"
  [eventCapacity]="selectedEventCapacity">
</app-event-statistics-panel>
```

### Statistics Button
```html
<button class="btn-action-enhanced stats btn-tooltip" 
        data-tooltip="View Statistics" 
        (click)="openStatistics(event)">
  <span class="action-icon">📊</span>
</button>
```

## Responsive Design

### Desktop (> 600px)
- Panel width: 700px
- Stats grid: 2x2
- Full padding and spacing
- All features visible

### Mobile (≤ 600px)
- Panel width: 95vw
- Stats grid: 2x1 (stacked)
- Reduced padding
- Optimized for touch
- Vertical bar chart labels

## Accessibility
- Semantic HTML structure
- Click outside to close
- Clear visual feedback
- High contrast in dark mode
- Tooltip on statistics button

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance
- Efficient data filtering
- Smooth CSS animations
- Optimized re-renders
- Lazy loading of statistics

## Customization

### Change Fill Rate Thresholds
Edit `getFillRateColor()` and `getFillRateLabel()` in component:
```typescript
if (rate >= 90) return '#ff4757'; // Almost Full
if (rate >= 70) return '#ffa502'; // Filling Up
if (rate >= 50) return '#2ed573'; // Good
return '#9370db'; // Low
```

### Modify Colors
Edit `event-statistics-panel.component.scss`:
- Card backgrounds
- Progress bar colors
- Chart bar colors
- Dark mode overrides

### Add More Statistics
1. Add new stat card in HTML
2. Calculate new metric in TypeScript
3. Style in SCSS
4. Add animation delay

## Tips
- Use refresh button for latest data
- Fill rate helps plan event capacity
- Bar chart shows registration distribution
- Color coding provides quick insights
- Dark mode reduces eye strain

## Future Enhancements
- Export statistics to PDF/Excel
- Historical data trends
- Comparison with other events
- Email notifications for milestones
- Real-time WebSocket updates
- Custom date range filtering
- Participant demographics
- Revenue tracking
