# Dark Mode Usage Guide

## How to Toggle Dark Mode

### In the Backoffice (Admin Panel)
1. Navigate to any backoffice page (e.g., Registration Management)
2. Look for the theme toggle button in the top-right corner of the header
3. Click the toggle switch (☀️/🌙 icon)
4. The entire interface will smoothly transition to dark mode

### In the Frontoffice (User Side)
1. Navigate to the frontoffice pages
2. Look for the theme toggle button in the navigation bar
3. Click the toggle switch
4. The theme will change with a smooth animation

## Dark Mode Features

### Color Scheme
- **Light Mode**: Soft light purple background (#f5f0ff, #faf8ff, #f0e6ff)
- **Dark Mode**: Deep dark purple/indigo (#1a0f2e, #2d1b4e, #1f1333)

### What Changes in Dark Mode
- Background gradients become darker with purple/indigo tones
- Text colors adjust for better readability
- Cards and tables get semi-transparent dark backgrounds with glassmorphism
- Buttons and interactive elements maintain their functionality with adjusted colors
- All animations and transitions remain smooth

### Persistence
- Your theme preference is automatically saved to localStorage
- When you return to the app, your last selected theme will be restored
- The app also respects your system's dark mode preference on first visit

## Technical Details

### Components with Dark Mode Support
- ✅ Registration Modal (frontoffice)
- ✅ Registration Management Page (backoffice)
- ✅ All backoffice pages (via global styles)
- ✅ Navigation bars and headers
- ✅ Forms and inputs
- ✅ Tables and data displays
- ✅ Buttons and interactive elements

### CSS Implementation
- Uses `body.dark-mode` class for scoping
- Component-specific styles with `!important` for priority
- Global CSS variables for consistent theming
- Smooth transitions with cubic-bezier easing

### Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Troubleshooting

### Dark Mode Not Applying?
1. **Hard refresh the page**: Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Clear browser cache**: Sometimes cached CSS files prevent updates
3. **Check the toggle button**: Make sure you're clicking the theme toggle (not another button)
4. **Inspect the body element**: Open DevTools and check if `<body>` has the `dark-mode` class

### Colors Look Wrong?
1. Make sure you're using the latest version of the app
2. Check if there are any browser extensions interfering with styles
3. Try disabling any custom CSS or themes in your browser

### Toggle Button Not Visible?
- In backoffice: The toggle is in the top-right corner of the header
- In frontoffice: The toggle is in the navigation bar
- If still not visible, check if the component is properly imported in the module

## Development Notes

### Adding Dark Mode to New Components
To add dark mode support to a new component:

```scss
// Light mode styles (default)
.my-component {
  background: #f5f0ff;
  color: #4a4a4a;
}

// Dark mode styles
body.dark-mode .my-component {
  background: #1a0f2e !important;
  color: #e8e0f5 !important;
}
```

### Using the ThemeService
```typescript
import { ThemeService } from './core/services/theme.service';

constructor(private themeService: ThemeService) {}

// Subscribe to theme changes
this.themeService.darkMode$.subscribe(isDark => {
  console.log('Dark mode:', isDark);
});

// Toggle theme programmatically
this.themeService.toggleDarkMode();

// Check current theme
const isDark = this.themeService.isDarkMode();
```

## Support
If you encounter any issues with dark mode, please:
1. Check this guide first
2. Try the troubleshooting steps
3. Clear your browser cache and hard refresh
4. Contact the development team with screenshots and browser details
