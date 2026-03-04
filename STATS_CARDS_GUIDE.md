# 📊 Enhanced Stats Cards - Design Guide

## Overview
Modern, animated stat cards with smooth hover effects, progress bars, and interactive animations for SaaS dashboards.

## 🎯 Features

- ✨ Smooth hover animations with elevation
- 🎨 Color-coded variants (primary, success, warning, info)
- 📈 Trend indicators that appear on hover
- 📊 Progress bars at the bottom
- 💫 Shine effect on hover
- 🔢 Number counting animation on load
- 🎭 Staggered fade-in animation
- 📱 Fully responsive
- ♿ Accessible with focus states

---

## 📦 Basic Usage

### HTML Structure
```html
<div class="stats-row-enhanced">
  <div class="mini-stat-enhanced primary">
    <div class="stat-content">
      <div class="ms-val">
        <span class="number">10</span>
        <span class="trend">📈</span>
      </div>
      <div class="ms-label">
        <span class="label-icon">📅</span>
        Total Events
      </div>
    </div>
    <div class="stat-progress">
      <div class="progress-fill" style="width: 100%;"></div>
    </div>
  </div>
</div>
```

### SCSS Import
```scss
@import '../shared/enhanced-stats.scss';
```

---

## 🎨 Color Variants

### Primary (Blue)
```html
<div class="mini-stat-enhanced primary">
  ...
</div>
```
- Color: `#4f6ef7`
- Use for: Main metrics, total counts

### Success (Green)
```html
<div class="mini-stat-enhanced success">
  ...
</div>
```
- Color: `#22c55e`
- Use for: Positive metrics, registrations, completions

### Warning (Orange)
```html
<div class="mini-stat-enhanced warning">
  ...
</div>
```
- Color: `#f59e0b`
- Use for: Pending items, warnings, attention needed

### Info (Cyan)
```html
<div class="mini-stat-enhanced info">
  ...
</div>
```
- Color: `#06b6d4`
- Use for: Information, online status, active items

---

## 🎬 Animations

### 1. Fade In Up (On Load)
- Cards fade in from bottom with stagger effect
- Duration: 0.6s
- Stagger delay: 0.1s per card
- Timing: `cubic-bezier(0.4, 0, 0.2, 1)`

### 2. Hover Effects
- **Elevation**: Translates up 4px
- **Border**: Changes to color variant
- **Shadow**: Increases to 8px with color tint
- **Value**: Scales to 1.05 and changes color
- **Number**: Translates up 2px
- **Trend**: Fades in and translates to position
- **Label Icon**: Fades in and slides right
- **Progress Bar**: Fades in and fills
- **Shine**: Sweeps across card diagonally

### 3. Click/Active State
- Scales down to 0.98
- Translates up 2px
- Shadow reduces slightly

### 4. Number Counting
- Numbers animate in with translateY
- Duration: 0.6s
- Can be triggered on data update

---

## 📊 Progress Bar

### Basic Progress Bar
```html
<div class="stat-progress">
  <div class="progress-fill" style="width: 75%;"></div>
</div>
```

### Dynamic Progress (Angular)
```html
<div class="stat-progress">
  <div class="progress-fill" [style.width.%]="progressValue"></div>
</div>
```

**Features**:
- Hidden by default
- Appears on hover
- Animated fill from left to right
- Color matches card variant

---

## 🎭 Advanced Features

### 1. With Icon Background
```html
<div class="mini-stat-enhanced primary with-icon">
  <div class="stat-icon">📅</div>
  <div class="stat-content">
    ...
  </div>
</div>
```

**Effect**: Large icon in background that scales and rotates on hover

---

### 2. With Badge
```html
<div class="mini-stat-enhanced success with-badge">
  <div class="stat-badge">New</div>
  <div class="stat-content">
    ...
  </div>
</div>
```

**Effect**: Badge appears on hover in top-right corner

---

### 3. Loading State
```html
<div class="mini-stat-enhanced loading">
  ...
</div>
```

**Effect**: Shimmer animation across the value

---

### 4. Pulse Animation (Real-time Updates)
```html
<div class="mini-stat-enhanced pulse">
  ...
</div>
```

**Effect**: Continuous pulse animation for live data

---

### 5. With Tooltip
```html
<div class="mini-stat-enhanced primary" data-tooltip="Click for details">
  ...
</div>
```

**Effect**: Tooltip appears on hover

---

## 🎨 Complete Example

```html
<div class="stats-row-enhanced">
  <!-- Total Events -->
  <div class="mini-stat-enhanced primary">
    <div class="stat-content">
      <div class="ms-val">
        <span class="number">{{ totalEvents }}</span>
        <span class="trend">📈</span>
      </div>
      <div class="ms-label">
        <span class="label-icon">📅</span>
        Total Events
      </div>
    </div>
    <div class="stat-progress">
      <div class="progress-fill" style="width: 100%;"></div>
    </div>
  </div>

  <!-- Total Registered -->
  <div class="mini-stat-enhanced success">
    <div class="stat-content">
      <div class="ms-val">
        <span class="number">{{ totalRegistered }}</span>
        <span class="trend">✨</span>
      </div>
      <div class="ms-label">
        <span class="label-icon">👥</span>
        Total Registered
      </div>
    </div>
    <div class="stat-progress">
      <div class="progress-fill" [style.width.%]="registrationProgress"></div>
    </div>
  </div>

  <!-- Online Events -->
  <div class="mini-stat-enhanced info">
    <div class="stat-content">
      <div class="ms-val">
        <span class="number">{{ onlineEvents }}</span>
        <span class="trend">🌐</span>
      </div>
      <div class="ms-label">
        <span class="label-icon">💻</span>
        Online
      </div>
    </div>
    <div class="stat-progress">
      <div class="progress-fill" style="width: 60%;"></div>
    </div>
  </div>

  <!-- In-Person Events -->
  <div class="mini-stat-enhanced warning">
    <div class="stat-content">
      <div class="ms-val">
        <span class="number">{{ inPersonEvents }}</span>
        <span class="trend">📍</span>
      </div>
      <div class="ms-label">
        <span class="label-icon">🏢</span>
        In-Person
      </div>
    </div>
    <div class="stat-progress">
      <div class="progress-fill" style="width: 40%;"></div>
    </div>
  </div>
</div>
```

---

## 🔧 Customization

### Change Card Size
```scss
.mini-stat-enhanced {
  min-width: 140px; // Change minimum width
  padding: 20px 24px; // Change padding
}
```

### Change Number Size
```scss
.ms-val {
  font-size: 32px; // Change font size
  letter-spacing: -1px; // Adjust spacing
}
```

### Change Animation Speed
```scss
.mini-stat-enhanced {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  //              ^^^^^ Change duration
}
```

### Custom Colors
```scss
.mini-stat-enhanced.custom {
  &:hover {
    border-color: rgba(255, 0, 0, 0.4);
    .ms-val { color: #ff0000; }
    .stat-progress .progress-fill {
      background: linear-gradient(90deg, #ff0000, #ff6666);
    }
  }
}
```

---

## 📱 Responsive Behavior

### Desktop (> 768px)
- Horizontal layout
- Flex-grow for equal width
- 4 cards per row

### Mobile (< 768px)
- Vertical layout
- Full-width cards
- Stacked vertically

---

## ♿ Accessibility

✅ **Focus Visible**: Clear outline for keyboard navigation
✅ **Cursor**: Pointer cursor indicates interactivity
✅ **Color Contrast**: WCAG AA compliant
✅ **Touch Targets**: Adequate size for mobile
✅ **Semantic HTML**: Proper structure

---

## 🎯 Best Practices

1. **Use Appropriate Colors**: Match color to metric meaning
2. **Keep Numbers Simple**: Use abbreviations for large numbers (1.2K, 5M)
3. **Meaningful Icons**: Choose icons that represent the metric
4. **Progress Bars**: Show actual progress, not arbitrary values
5. **Trend Indicators**: Use emojis or icons that indicate direction
6. **Loading States**: Show shimmer during data fetch
7. **Real-time Updates**: Use pulse animation for live data

---

## 🐛 Troubleshooting

### Cards Not Animating
- Check if SCSS is imported
- Verify CSS variables are defined
- Clear browser cache

### Stagger Not Working
- Ensure cards are direct children of `.stats-row-enhanced`
- Check nth-child selectors

### Progress Bar Not Showing
- Verify hover state is working
- Check opacity and transform values

---

## 📊 Performance

- GPU-accelerated transforms
- Optimized transitions
- 60 FPS animations
- No layout thrashing
- Efficient pseudo-elements

---

## ✨ Animation Timeline

**On Load (per card)**:
1. Fade in from bottom (0.6s)
2. Number counting animation (0.6s)
3. Ready for interaction

**On Hover**:
1. Card elevates (0.4s)
2. Border color changes (0.4s)
3. Shine sweeps across (0.6s)
4. Value scales and changes color (0.4s)
5. Trend indicator fades in (0.4s)
6. Label icon slides in (0.4s)
7. Progress bar fills (0.6s)

**On Click**:
1. Scale down (0.2s)
2. Shadow reduces (0.2s)
3. Returns to hover state (0.2s)

---

## 🎉 Result

Modern, animated stat cards with:
- ✨ Smooth, professional animations
- 🎨 Color-coded variants
- 📊 Interactive progress bars
- 💫 Shine and glow effects
- 📱 Responsive design
- ♿ Full accessibility
- 🚀 Production-ready code
