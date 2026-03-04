# Dark Mode Visual Guide 🎨

## Toggle Button Design

```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                    [🌙/☀️]    │
│  Global overview of the Matchy platform         │
└─────────────────────────────────────────────────┘
```

### Toggle Button States

#### Light Mode (Default)
```
┌──────────┐
│    🌙    │  ← Moon icon visible
│          │     Click to enable dark mode
└──────────┘
```

#### Dark Mode (Active)
```
┌──────────┐
│    ☀️    │  ← Sun icon visible
│          │     Click to disable dark mode
└──────────┘
```

#### Hover State
```
┌──────────┐
│    🌙    │  ← Lifts up 2px
│   ↑↑↑    │     Shadow increases
└──────────┘     Border glows purple
```

#### Click Animation
```
Frame 1:        Frame 2:        Frame 3:
┌──────────┐   ┌──────────┐   ┌──────────┐
│    🌙    │   │    🌙    │   │    ☀️    │
│          │ → │  ○○○○○   │ → │          │
└──────────┘   └──────────┘   └──────────┘
  Normal        Ripple         Rotated
                Effect         New Icon
```

## Color Transitions

### Light Mode → Dark Mode

#### Background
```
Light:  #ffffff (White)
        ↓ 400ms smooth transition
Dark:   #0f172a (Deep Slate)
```

#### Cards
```
Light:  #ffffff (White) + subtle shadow
        ↓ 400ms smooth transition
Dark:   #1e293b (Slate 800) + deeper shadow
```

#### Text
```
Light:  #1a1a1a (Almost Black)
        ↓ 400ms smooth transition
Dark:   #f1f5f9 (Almost White)
```

## Component Examples

### Stat Card Transformation

#### Light Mode
```
┌─────────────────────────┐
│  👥                     │
│                         │
│  Total Users            │
│  registered accounts    │
│                         │
│  1,234                  │
└─────────────────────────┘
White background
Dark text
Subtle shadow
```

#### Dark Mode
```
┌─────────────────────────┐
│  👥                     │
│                         │
│  Total Users            │
│  registered accounts    │
│                         │
│  1,234                  │
└─────────────────────────┘
Slate 800 background
Light text
Deeper shadow
```

### Table Transformation

#### Light Mode
```
┌─────────────────────────────────────┐
│ User          Email         Status  │
├─────────────────────────────────────┤
│ John Doe      john@...      Active  │
│ Jane Smith    jane@...      Active  │
└─────────────────────────────────────┘
White background
Light gray header
Dark text
```

#### Dark Mode
```
┌─────────────────────────────────────┐
│ User          Email         Status  │
├─────────────────────────────────────┤
│ John Doe      john@...      Active  │
│ Jane Smith    jane@...      Active  │
└─────────────────────────────────────┘
Slate 800 background
Slate 700 header
Light text
```

## Animation Timeline

### Toggle Click Sequence

```
0ms:    User clicks toggle button
        ↓
50ms:   Ripple effect starts expanding
        ↓
100ms:  Old icon starts rotating out (scale 1 → 0)
        ↓
200ms:  Body gets 'dark-mode-transitioning' class
        Lightening effect begins
        ↓
300ms:  New icon starts rotating in (scale 0 → 1.2)
        All colors begin transitioning
        ↓
400ms:  Colors reach 50% transition
        Lightening effect peaks (brightness 1.2)
        ↓
500ms:  New icon settles (scale 1.2 → 1)
        ↓
600ms:  Colors complete transition
        Lightening effect ends
        ↓
800ms:  'dark-mode-transitioning' class removed
        Animation complete
```

## Icon Animation Details

### Moon → Sun Transition
```
Step 1: Moon visible (scale: 1, rotate: 0deg)
        🌙

Step 2: Moon shrinks and rotates
        🌙 (scale: 0.5, rotate: 90deg)

Step 3: Moon disappears, Sun appears
        ☀️ (scale: 0, rotate: -180deg)

Step 4: Sun grows and rotates
        ☀️ (scale: 1.2, rotate: -90deg)

Step 5: Sun settles
        ☀️ (scale: 1, rotate: 0deg)
```

## Lightening Effect

### Visual Representation
```
Normal Brightness:
████████████████████

Lightening Peak (50%):
████████████████████ ← Brighter
█ ▓ ▒ ░ ░ ▒ ▓ █     ← Glow effect

Back to Normal:
████████████████████
```

## Color Palette Comparison

### Backgrounds
```
Component         Light Mode    Dark Mode
─────────────────────────────────────────
Primary BG        #ffffff       #0f172a
Secondary BG      #f8f9fa       #1e293b
Card BG           #ffffff       #1e293b
Tertiary BG       #f1f3f5       #334155
```

### Text
```
Component         Light Mode    Dark Mode
─────────────────────────────────────────
Primary Text      #1a1a1a       #f1f5f9
Secondary Text    #4a5568       #cbd5e1
Tertiary Text     #718096       #94a3b8
```

### Borders
```
Component         Light Mode    Dark Mode
─────────────────────────────────────────
Border            #e2e8f0       #334155
Light Border      #f1f3f5       #475569
```

### Shadows
```
Component         Light Mode              Dark Mode
──────────────────────────────────────────────────────
Small Shadow      rgba(0,0,0,0.08)       rgba(0,0,0,0.3)
Medium Shadow     rgba(0,0,0,0.12)       rgba(0,0,0,0.4)
Large Shadow      rgba(0,0,0,0.15)       rgba(0,0,0,0.5)
```

## Badge Colors

### Light Mode
```
Primary:   [  Primary  ]  ← Light purple bg, purple text
Success:   [  Success  ]  ← Light green bg, green text
Warning:   [  Warning  ]  ← Light orange bg, orange text
Danger:    [  Danger   ]  ← Light red bg, red text
```

### Dark Mode
```
Primary:   [  Primary  ]  ← Darker purple bg, lighter purple text
Success:   [  Success  ]  ← Darker green bg, lighter green text
Warning:   [  Warning  ]  ← Darker orange bg, lighter orange text
Danger:    [  Danger   ]  ← Darker red bg, lighter red text
```

## Responsive Behavior

### Desktop (>768px)
```
Toggle Button: 56px × 56px
Icon Size: 1.75rem (28px)
Border Radius: 16px
```

### Mobile (≤768px)
```
Toggle Button: 48px × 48px
Icon Size: 1.5rem (24px)
Border Radius: 12px
```

## User Experience Flow

```
1. User opens dashboard
   └─→ Checks localStorage for saved preference
       └─→ Applies saved theme (or default light)

2. User clicks toggle button
   └─→ Ripple animation plays
   └─→ Icon rotates and scales
   └─→ Lightening effect flashes
   └─→ All colors transition smoothly
   └─→ New theme applied
   └─→ Preference saved to localStorage

3. User refreshes page
   └─→ Theme persists from localStorage
   └─→ No flash of wrong theme
```

## Performance Metrics

```
Animation Duration:     600ms total
Color Transition:       400ms
Icon Animation:         500ms
Ripple Effect:          400ms
Lightening Effect:      600ms

FPS Target:            60fps
GPU Acceleration:      ✅ Enabled
Repaints:              Minimal
Layout Shifts:         None
```

## Accessibility Features

```
✅ ARIA label on toggle button
✅ Keyboard accessible (Tab + Enter)
✅ High contrast in both modes
✅ No color-only indicators
✅ Focus visible on toggle
✅ Screen reader friendly
✅ Reduced motion support (optional)
```

## Browser Rendering

### CSS Variables Support
```
Chrome/Edge:  ✅ Full support
Firefox:      ✅ Full support
Safari:       ✅ Full support
Mobile:       ✅ Full support
```

### Animation Support
```
Transitions:  ✅ All browsers
Transforms:   ✅ All browsers
Filters:      ✅ All browsers
Keyframes:    ✅ All browsers
```

---

**Visual Guide Version**: 1.0.0  
**Last Updated**: February 26, 2026
