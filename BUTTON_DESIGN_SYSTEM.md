# Modern Button & Icon Design System 🎨

## Overview
A comprehensive, elegant design system for buttons and action icons with smooth animations, modern gradients, and professional styling.

## Features
✨ Modern gradient backgrounds
🎭 Smooth hover animations
💫 Ripple and shine effects
🎯 Consistent design language
📱 Fully responsive
♿ Accessible with tooltips
🎨 Multiple color variants

## Components

### 1. Primary Action Button
**Use for**: Main actions like "New Project", "Create", "Save"

```html
<button class="btn-primary-action" (click)="yourFunction()">
  <span class="icon">✨</span>
  <span>New Project</span>
</button>
```

**Features**:
- Gradient background (purple to pink)
- Shine effect on hover
- Icon rotation animation
- Lift effect (translateY)
- Shadow elevation

**Variants**:
```html
<!-- Success (green) -->
<button class="btn-success">
  <span class="icon">✓</span>
  <span>Approve</span>
</button>

<!-- Warning (orange/pink) -->
<button class="btn-warning">
  <span class="icon">⚠️</span>
  <span>Warning</span>
</button>

<!-- Danger (red/yellow) -->
<button class="btn-danger">
  <span class="icon">✗</span>
  <span>Delete</span>
</button>

<!-- Info (blue) -->
<button class="btn-info">
  <span class="icon">ℹ️</span>
  <span>Information</span>
</button>
```

### 2. Secondary Action Button
**Use for**: Secondary actions, cancel buttons

```html
<button class="btn-secondary-action" (click)="cancel()">
  <span class="icon">✗</span>
  <span>Cancel</span>
</button>
```

**Features**:
- Outlined style
- Fills with color on hover
- Smooth transition

### 3. Icon Button (Text + Icon)
**Use for**: Smaller actions with text labels

```html
<button class="btn-icon" (click)="viewDetails()">
  <span class="icon">📋</span>
  <span>Applications</span>
</button>
```

**Features**:
- Compact size
- Icon scales on hover
- Subtle lift effect

### 4. Action Icons

#### View/Read Icon
```html
<button class="action-icon-view action-icon-tooltip" 
        data-tooltip="View Details" 
        (click)="view()">
  <span class="icon">👁️</span>
</button>
```

**Features**:
- Blue gradient background
- Pulse animation on hover
- Tooltip on hover

#### Edit Icon
```html
<button class="action-icon-edit action-icon-tooltip" 
        data-tooltip="Edit Project" 
        (click)="edit()">
  <span class="icon">✏️</span>
</button>
```

**Features**:
- Orange gradient background
- Wiggle animation on hover
- Tooltip on hover

#### Delete Icon
```html
<button class="action-icon-delete action-icon-tooltip" 
        data-tooltip="Delete Project" 
        (click)="delete()">
  <span class="icon">🗑️</span>
</button>
```

**Features**:
- Red gradient background
- Shake animation on hover
- Tooltip on hover

#### Custom Icon (Goals, etc.)
```html
<button class="action-icon-custom action-icon-tooltip" 
        data-tooltip="View Goals" 
        (click)="viewGoals()">
  <span class="icon">🎯</span>
</button>
```

**Features**:
- Purple gradient background
- Smooth hover effects

#### Success Icon
```html
<button class="action-icon-success action-icon-tooltip" 
        data-tooltip="Approve" 
        (click)="approve()">
  <span class="icon">✓</span>
</button>
```

**Features**:
- Green gradient background
- Smooth hover effects

### 5. Action Icons Container
**Use for**: Grouping multiple action icons

```html
<div class="action-icons">
  <button class="action-icon-view action-icon-tooltip" data-tooltip="View">
    <span class="icon">👁️</span>
  </button>
  <button class="action-icon-edit action-icon-tooltip" data-tooltip="Edit">
    <span class="icon">✏️</span>
  </button>
  <button class="action-icon-delete action-icon-tooltip" data-tooltip="Delete">
    <span class="icon">🗑️</span>
  </button>
</div>
```

### 6. Floating Action Button (FAB)
**Use for**: Primary floating action (optional)

```html
<button class="btn-fab" (click)="createNew()">
  <span>+</span>
</button>
```

**Features**:
- Fixed position (bottom-right)
- Circular shape
- Rotates on hover
- Large shadow

## Complete Examples

### Projects Table Actions
```html
<td class="actions-cell">
  <div class="action-icons">
    <button class="action-icon-view action-icon-tooltip" 
            data-tooltip="View Details" 
            (click)="viewProject(project.id)">
      <span class="icon">👁️</span>
    </button>
    <button class="action-icon-edit action-icon-tooltip" 
            data-tooltip="Edit Project" 
            (click)="editProject(project)">
      <span class="icon">✏️</span>
    </button>
    <button class="action-icon-delete action-icon-tooltip" 
            data-tooltip="Delete Project" 
            (click)="deleteProject(project.id)">
      <span class="icon">🗑️</span>
    </button>
  </div>
</td>
```

### Page Header with Action Button
```html
<div class="page-header">
  <div>
    <h1 class="page-title">Projects Management</h1>
    <p class="page-sub">Overview of all projects</p>
  </div>
  <button class="btn-primary-action" (click)="createNew()">
    <span class="icon">✨</span>
    <span>New Project</span>
  </button>
</div>
```

### Modal Footer Buttons
```html
<div class="modal-footer">
  <button class="btn-secondary-action" (click)="cancel()">
    <span class="icon">✗</span>
    <span>Cancel</span>
  </button>
  <button class="btn-primary-action" (click)="save()">
    <span class="icon">✓</span>
    <span>Save Changes</span>
  </button>
</div>
```

### Milestone Actions
```html
<div class="milestone-actions">
  <button class="btn-icon" (click)="viewApplications()">
    <span class="icon">📋</span>
    <span>Applications</span>
  </button>
  <button class="btn-icon" (click)="viewSubmissions()">
    <span class="icon">📦</span>
    <span>Submissions</span>
  </button>
  <button class="action-icon-edit action-icon-tooltip" 
          data-tooltip="Edit" 
          (click)="edit()">
    <span class="icon">✏️</span>
  </button>
  <button class="action-icon-delete action-icon-tooltip" 
          data-tooltip="Delete" 
          (click)="delete()">
    <span class="icon">🗑️</span>
  </button>
</div>
```

## Icon Options

### Recommended Icons (Emoji)
- ✨ New/Create
- 👁️ View/Read
- ✏️ Edit
- 🗑️ Delete
- ✓ Approve/Success
- ✗ Cancel/Reject
- 📋 Applications/List
- 📦 Submissions/Package
- 🎯 Goals/Target
- ⚙️ Settings
- 📅 Calendar/Schedule
- 💰 Budget/Money
- 📊 Analytics/Stats
- 🔍 Search
- ➕ Add
- ⚠️ Warning
- ℹ️ Information
- 🔔 Notifications
- 👤 User/Profile
- 📄 Document

### Using Font Icons (Optional)
If you prefer Font Awesome or Material Icons:

```html
<!-- Font Awesome -->
<button class="btn-primary-action">
  <i class="fas fa-plus icon"></i>
  <span>New Project</span>
</button>

<!-- Material Icons -->
<button class="action-icon-view">
  <i class="material-icons icon">visibility</i>
</button>
```

## Animations

### Available Animations
1. **Pulse** - Breathing effect (view icon)
2. **Wiggle** - Slight rotation (edit icon)
3. **Shake** - Horizontal shake (delete icon)
4. **Slide In** - Fade and slide up
5. **Shine** - Light sweep effect (primary button)
6. **Ripple** - Expanding circle (all action icons)

### Custom Animation Example
```scss
.my-custom-button {
  &:hover {
    animation: pulse 1.5s infinite;
  }
}
```

## Color Palette

### Gradients
- **Primary**: Purple to Pink (#667eea → #764ba2)
- **Success**: Teal to Green (#11998e → #38ef7d)
- **Warning**: Pink to Red (#f093fb → #f5576c)
- **Danger**: Pink to Yellow (#fa709a → #fee140)
- **Info**: Blue to Cyan (#4facfe → #00f2fe)
- **Dark**: Dark Blue to Gray (#2c3e50 → #34495e)

### Action Icon Colors
- **View**: Light Blue (#e3f2fd → #bbdefb)
- **Edit**: Light Orange (#fff3e0 → #ffe0b2)
- **Delete**: Light Red (#ffebee → #ffcdd2)
- **Custom**: Light Purple (#f3e5f5 → #e1bee7)
- **Success**: Light Green (#e8f5e9 → #c8e6c9)

## Responsive Behavior

### Desktop (> 768px)
- Full size buttons
- All animations enabled
- Tooltips visible

### Mobile (≤ 768px)
- Slightly smaller buttons
- Reduced padding
- Smaller FAB
- Touch-optimized sizes

## Accessibility

### Features
- Tooltips for icon-only buttons
- Proper ARIA labels (add manually)
- Keyboard navigation support
- Focus states
- Sufficient color contrast

### Best Practices
```html
<!-- Add aria-label for screen readers -->
<button class="action-icon-view" 
        aria-label="View project details"
        data-tooltip="View Details">
  <span class="icon">👁️</span>
</button>

<!-- Add disabled state -->
<button class="btn-primary-action" 
        [disabled]="loading"
        aria-busy="true">
  <span class="icon">⏳</span>
  <span>{{ loading ? 'Saving...' : 'Save' }}</span>
</button>
```

## Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Performance
- CSS-only animations (no JavaScript)
- Hardware-accelerated transforms
- Optimized transitions
- Minimal repaints

## Customization

### Changing Colors
Edit `buttons.scss`:
```scss
$primary-gradient: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

### Changing Animation Speed
```scss
.btn-primary-action {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); // Change 0.3s
}
```

### Changing Sizes
```scss
.action-icon {
  width: 40px;  // Change size
  height: 40px; // Change size
}
```

## Migration Guide

### Old Button → New Button
```html
<!-- OLD -->
<button class="btn-add" (click)="create()">+ New Project</button>

<!-- NEW -->
<button class="btn-primary-action" (click)="create()">
  <span class="icon">✨</span>
  <span>New Project</span>
</button>
```

### Old Action Icons → New Action Icons
```html
<!-- OLD -->
<button class="btn-action view" (click)="view()">👁</button>
<button class="btn-action edit" (click)="edit()">✏️</button>
<button class="btn-action delete" (click)="delete()">🗑</button>

<!-- NEW -->
<div class="action-icons">
  <button class="action-icon-view action-icon-tooltip" 
          data-tooltip="View" 
          (click)="view()">
    <span class="icon">👁️</span>
  </button>
  <button class="action-icon-edit action-icon-tooltip" 
          data-tooltip="Edit" 
          (click)="edit()">
    <span class="icon">✏️</span>
  </button>
  <button class="action-icon-delete action-icon-tooltip" 
          data-tooltip="Delete" 
          (click)="delete()">
    <span class="icon">🗑️</span>
  </button>
</div>
```

## Tips & Tricks

1. **Always wrap icons in `<span class="icon">`** for proper animation
2. **Use tooltips for icon-only buttons** for better UX
3. **Group action icons in `.action-icons` container** for consistent spacing
4. **Use semantic button variants** (success, warning, danger) for clarity
5. **Add loading states** for async operations
6. **Test on mobile devices** for touch interactions

## Support
For issues or questions, check the SCSS file comments or create an issue.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Status**: Production Ready ✅
