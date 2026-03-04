# Confirmation Dialog Guide

## Overview
A beautiful, animated confirmation dialog component that replaces the default browser `confirm()` with a modern, customizable modal.

## Features
- 🎨 Modern purple-themed design matching the app's color scheme
- 🌙 Full dark mode support
- ✨ Smooth animations (slide up, bounce, pulse, shake)
- 🎯 Type-specific styling (danger, warning, success, info)
- 📱 Fully responsive
- ♿ Accessible with keyboard support
- 🔧 Easy to use with Promise-based API

## Usage

### Basic Example
```typescript
import { ConfirmationService } from './shared/services/confirmation.service';

constructor(private confirmationService: ConfirmationService) {}

async deleteItem() {
  const confirmed = await this.confirmationService.confirm({
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'danger',
    icon: '🗑️'
  });

  if (confirmed) {
    // User clicked "Delete"
    this.performDelete();
  } else {
    // User clicked "Cancel" or closed the dialog
  }
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | 'Confirm Action' | Dialog title |
| `message` | string | 'Are you sure...' | Dialog message |
| `confirmText` | string | 'OK' | Confirm button text |
| `cancelText` | string | 'Cancel' | Cancel button text |
| `type` | 'danger' \| 'warning' \| 'success' \| 'info' | 'info' | Dialog type (affects colors and animations) |
| `icon` | string | Auto | Custom emoji icon (auto-selected based on type if not provided) |

### Dialog Types

#### Danger (Red)
Used for destructive actions like delete, remove, etc.
```typescript
this.confirmationService.confirm({
  type: 'danger',
  icon: '🗑️' // Auto: 🗑️
});
```

#### Warning (Orange)
Used for actions that need caution like reject, disable, etc.
```typescript
this.confirmationService.confirm({
  type: 'warning',
  icon: '⚠️' // Auto: ⚠️
});
```

#### Success (Green)
Used for positive actions like approve, confirm, etc.
```typescript
this.confirmationService.confirm({
  type: 'success',
  icon: '✅' // Auto: ✅
});
```

#### Info (Purple)
Used for general confirmations.
```typescript
this.confirmationService.confirm({
  type: 'info',
  icon: '❓' // Auto: ❓
});
```

## Animations

### Dialog Entrance
- Overlay: Fade in with blur effect
- Dialog: Slide up + scale animation
- Icon: Bounce in with pulse
- Content: Fade in up (staggered)

### Type-Specific Animations
- **Danger**: Shake animation on icon
- **Warning**: Swing animation on icon
- **All types**: Continuous pulse animation

### Button Interactions
- Hover: Lift effect with shadow
- Click: Ripple effect
- Icon: Scale animation on hover

## Styling

### Light Mode
- Background: Soft purple gradient (#f5f0ff → #faf8ff)
- Text: Purple tones (#6b5b95)
- Buttons: Purple gradient with shadows

### Dark Mode
- Background: Deep purple gradient (#1e143c → #281946)
- Text: Light purple (#b19cd9)
- Buttons: Adjusted colors for dark theme

## Examples in the App

### Delete Registration
```typescript
deleteRegistration(id: number): void {
  this.confirmationService.confirm({
    title: 'Delete Registration',
    message: 'Are you sure you want to delete this registration? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'danger',
    icon: '🗑️'
  }).then((confirmed) => {
    if (confirmed) {
      this.registrationService.deleteRegistration(id).subscribe({
        next: () => this.loadRegistrations(),
        error: (error) => alert('Failed to delete registration')
      });
    }
  });
}
```

### Approve Registration
```typescript
approveRegistration(id: number): void {
  this.confirmationService.confirm({
    title: 'Approve Registration',
    message: 'Are you sure you want to approve this registration? The participant counter will be updated.',
    confirmText: 'Approve',
    cancelText: 'Cancel',
    type: 'success',
    icon: '✅'
  }).then((confirmed) => {
    if (confirmed) {
      this.registrationService.approveRegistration(id).subscribe({
        next: () => this.loadRegistrations()
      });
    }
  });
}
```

### Reject Registration
```typescript
rejectRegistration(id: number): void {
  this.confirmationService.confirm({
    title: 'Reject Registration',
    message: 'Are you sure you want to reject this registration? This action will change the status to rejected.',
    confirmText: 'Reject',
    cancelText: 'Cancel',
    type: 'warning',
    icon: '⚠️'
  }).then((confirmed) => {
    if (confirmed) {
      this.registrationService.rejectRegistration(id).subscribe({
        next: () => this.loadRegistrations()
      });
    }
  });
}
```

## Accessibility
- Keyboard support: ESC to cancel, Enter to confirm
- ARIA labels on buttons
- Focus management
- Screen reader friendly

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Customization

To customize the dialog appearance, edit:
- `src/app/shared/components/confirmation-dialog/confirmation-dialog.component.scss`

To add new dialog types:
1. Add the type to `ConfirmationConfig` interface
2. Add corresponding styles in SCSS
3. Add icon mapping in `getIcon()` method

## Tips
- Use `danger` type for destructive actions
- Use `warning` type for actions that need caution
- Use `success` type for positive confirmations
- Use `info` type for general confirmations
- Keep messages concise and clear
- Use appropriate icons that match the action
