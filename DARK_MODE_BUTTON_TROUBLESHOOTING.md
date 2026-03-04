# Dark Mode Button Troubleshooting 🔧

## Button Location
The dark mode toggle button should appear in the **top-right corner** of the Admin Dashboard page header, next to the title.

```
┌─────────────────────────────────────────────────────────┐
│  Admin Dashboard                              [🌙]      │
│  Global overview of the Matchy platform                 │
└─────────────────────────────────────────────────────────┘
```

## Files Modified

### 1. Dashboard Component HTML
**File**: `matchy-angular/src/app/backoffice/dashboard/dashboard.component.html`

The button is in the page-header section (lines 3-14):
```html
<div class="page-header">
  <div>
    <h1 class="page-title">Admin Dashboard</h1>
    <p class="page-sub">Global overview of the Matchy platform</p>
  </div>
  <button class="dark-mode-toggle" 
          (click)="toggleDarkMode()" 
          [class.active]="isDarkMode"
          aria-label="Toggle dark mode">
    <span class="toggle-icon sun-icon" [class.visible]="isDarkMode">☀️</span>
    <span class="toggle-icon moon-icon" [class.visible]="!isDarkMode">🌙</span>
  </button>
</div>
```

### 2. Dashboard Component TypeScript
**File**: `matchy-angular/src/app/backoffice/dashboard/dashboard.component.ts`

Added:
- Import: `DarkModeService`
- Property: `isDarkMode = false`
- Constructor injection: `public darkModeService: DarkModeService`
- Method: `toggleDarkMode()`
- Subscription in `ngOnInit()`

### 3. Dashboard Component SCSS
**File**: `matchy-angular/src/app/backoffice/dashboard/dashboard.component.scss`

Added styles for:
- `.dark-mode-toggle` (button)
- `.toggle-icon` (icons)
- `.sun-icon` and `.moon-icon` (animations)
- Keyframes: `sunRise` and `moonRise`

### 4. Dark Mode Service
**File**: `matchy-angular/src/app/frontoffice/services/dark-mode.service.ts`

New service created with:
- `toggleDarkMode()` method
- `isDarkMode()` method
- `darkMode$` observable
- LocalStorage persistence

### 5. Dark Mode Styles
**File**: `matchy-angular/src/styles/dark-mode.scss`

Complete dark mode theme system.

### 6. Main Styles
**File**: `matchy-angular/src/styles/styles.scss`

Added import: `@import './dark-mode.scss';`

## Troubleshooting Steps

### Step 1: Restart Development Server
```bash
# Stop the Angular dev server (Ctrl+C)
# Then restart it
cd matchy-angular
npm start
# or
ng serve
```

### Step 2: Clear Browser Cache
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Step 3: Check Console for Errors
1. Open DevTools (F12)
2. Go to Console tab
3. Look for any errors related to:
   - DarkModeService
   - dashboard.component
   - Missing imports

### Step 4: Verify Service is Provided
Check that the service is available. In the browser console, type:
```javascript
// This should not show an error
ng.probe(getAllAngularRootElements()[0]).injector.get('DarkModeService')
```

### Step 5: Check if Button is in DOM
1. Open DevTools (F12)
2. Go to Elements tab
3. Search for "dark-mode-toggle" (Ctrl+F)
4. The button should be visible in the HTML

### Step 6: Check CSS is Applied
1. Find the button in Elements tab
2. Check the Styles panel
3. Verify `.dark-mode-toggle` styles are applied
4. Look for:
   - `width: 56px`
   - `height: 56px`
   - `border-radius: 16px`

### Step 7: Force Visibility (Temporary Debug)
Add this to `dashboard.component.scss` temporarily:
```scss
.dark-mode-toggle {
  background: red !important; // Make it obvious
  z-index: 9999 !important;
  position: relative !important;
}
```

## Common Issues

### Issue 1: Button Not Visible
**Cause**: CSS not loaded or overridden
**Solution**: 
- Check browser DevTools > Elements > Styles
- Ensure `.dark-mode-toggle` styles are present
- Check for CSS conflicts

### Issue 2: Button Visible but Not Clickable
**Cause**: Z-index or pointer-events issue
**Solution**:
```scss
.dark-mode-toggle {
  z-index: 10;
  pointer-events: auto;
}
```

### Issue 3: Icons Not Showing
**Cause**: Emoji rendering or visibility class not working
**Solution**:
- Check if `isDarkMode` property is defined
- Verify `[class.visible]` binding works
- Try using text instead: "MOON" / "SUN"

### Issue 4: Service Not Found Error
**Cause**: Service not provided or import missing
**Solution**:
- Verify `dark-mode.service.ts` exists
- Check `@Injectable({ providedIn: 'root' })`
- Verify import in component

### Issue 5: Page Header Layout Broken
**Cause**: Flexbox alignment issue
**Solution**:
```scss
.page-header {
  display: flex;
  align-items: center; // Changed from flex-start
  justify-content: space-between;
  gap: 16px;
}
```

## Manual Verification

### Check 1: HTML Structure
Navigate to dashboard and inspect:
```html
<div class="dashboard">
  <div class="page-header">
    <div>...</div>
    <button class="dark-mode-toggle">  ← Should be here
      <span class="toggle-icon sun-icon">☀️</span>
      <span class="toggle-icon moon-icon visible">🌙</span>
    </button>
  </div>
</div>
```

### Check 2: Component Properties
In browser console:
```javascript
// Get component instance
const component = ng.probe(document.querySelector('.dashboard')).componentInstance;
console.log(component.isDarkMode); // Should be false initially
console.log(component.darkModeService); // Should be defined
```

### Check 3: Toggle Functionality
Click the button and check:
```javascript
// After clicking
console.log(document.body.classList.contains('dark-mode')); // Should toggle
console.log(localStorage.getItem('darkMode')); // Should be 'true' or 'false'
```

## Expected Behavior

### Initial State (Light Mode)
- Button shows moon icon 🌙
- Background is white
- Text is dark
- `isDarkMode = false`

### After Click (Dark Mode)
- Button shows sun icon ☀️
- Background transitions to dark slate
- Text transitions to light
- `isDarkMode = true`
- LocalStorage saves preference

### Animation Sequence
1. Click button
2. Ripple effect expands
3. Icon rotates and scales
4. Colors transition smoothly (400ms)
5. Lightening effect flashes (600ms)
6. New theme applied

## Quick Test

Run this in browser console after page loads:
```javascript
// Should show the button element
document.querySelector('.dark-mode-toggle')

// Should show the service
ng.probe(document.querySelector('.dashboard')).componentInstance.darkModeService

// Manually toggle
ng.probe(document.querySelector('.dashboard')).componentInstance.toggleDarkMode()
```

## Still Not Working?

### Option 1: Check Module Imports
Verify `DashboardComponent` is properly declared in its module.

### Option 2: Rebuild
```bash
# Clean and rebuild
rm -rf node_modules/.cache
npm run build
npm start
```

### Option 3: Check Angular Version
Ensure Angular version supports the syntax used:
```bash
ng version
```

### Option 4: Simplify Button (Debug)
Replace button with simple version:
```html
<button (click)="toggleDarkMode()" style="padding: 10px; background: blue; color: white;">
  Toggle Dark Mode
</button>
```

If this works, the issue is CSS-related.

## Contact Points

If button still doesn't appear:
1. Check browser console for errors
2. Verify all files were saved
3. Restart dev server
4. Clear browser cache completely
5. Try different browser

---

**Last Updated**: February 26, 2026  
**Status**: Button should be visible in dashboard header
