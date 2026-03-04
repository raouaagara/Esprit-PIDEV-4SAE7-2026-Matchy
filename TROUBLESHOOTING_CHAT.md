# Chat Troubleshooting Guide

## Issue: Component ID Collision (FIXED ✅)

### Problem:
```
NG0912: Component ID generation collision detected. 
Components '_MessagesComponent' and '_MessagesComponent' with selector 'app-messages'
```

### Solution Applied:
Changed component selectors to be unique:
- Frontoffice: `app-fo-messages` and `app-fo-contracts`
- Backoffice: `app-bo-messages` and `app-bo-contracts`

### Files Modified:
- `matchy-angular/src/app/frontoffice/messages/messages.component.ts`
- `matchy-angular/src/app/backoffice/messages/messages.component.ts`
- `matchy-angular/src/app/frontoffice/contracts/contracts.component.ts`
- `matchy-angular/src/app/backoffice/contracts/contracts.component.ts`
- `matchy-angular/src/app/shared/shared.module.ts` (added FormsModule to exports)

## Issue: No Input to Type

### Possible Causes & Solutions:

#### 1. Angular Not Reloaded
**Solution:** Stop and restart Angular
```bash
# Press Ctrl+C to stop
ng serve
```

#### 2. Browser Cache
**Solution:** Hard refresh the browser
- Chrome/Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or open DevTools (F12) → Right-click refresh → Empty Cache and Hard Reload

#### 3. No Project Selected
**Symptom:** You see "Select a project to start chatting"
**Solution:** 
- Click on a project in the left sidebar
- If no projects appear, you need to create a project first

#### 4. Component Not Rendering
**Check:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any red errors
4. Check Network tab for failed API calls

#### 5. FormsModule Not Loaded
**Verify:** The textarea should be visible in the HTML
**Check:** View Page Source and search for `<textarea`

## Step-by-Step Debugging

### Step 1: Restart Everything
```bash
# Terminal 1 - Stop backend (Ctrl+C) then:
cd PI
./mvnw spring-boot:run -DskipTests

# Terminal 2 - Stop frontend (Ctrl+C) then:
cd matchy-angular
ng serve
```

### Step 2: Clear Browser
1. Open http://localhost:4200
2. Press F12 (DevTools)
3. Right-click refresh button
4. Select "Empty Cache and Hard Reload"

### Step 3: Check Console
1. Look at Console tab in DevTools
2. Any red errors? Share them
3. Any warnings about modules?

### Step 4: Verify Login
1. Make sure you're logged in
2. Check localStorage has token:
   - DevTools → Application → Local Storage
   - Should see `token` and `currentUser`

### Step 5: Check Projects
1. Navigate to Messages page
2. Do you see projects in left sidebar?
3. If not, create a project first:
   - Go to Projects page
   - Create a new project
   - Then go back to Messages

### Step 6: Select Project
1. Click on a project in the sidebar
2. The chat area should appear on the right
3. You should see:
   - Project name at top
   - Empty messages area (or existing messages)
   - Input box at bottom with 📎 and ➤ buttons

### Step 7: Test Input
1. Click in the textarea
2. Type "test"
3. Press Enter or click ➤ button
4. Message should appear

## Common Error Messages

### "Cannot read property 'id' of null"
**Cause:** No user logged in
**Solution:** Login first

### "404 Not Found - /api/messages/..."
**Cause:** Backend not running
**Solution:** Start backend on port 9090

### "CORS Error"
**Cause:** Backend CORS not configured
**Solution:** Check MessageController has `@CrossOrigin(origins = "http://localhost:4200")`

### "Cannot bind to 'ngModel'"
**Cause:** FormsModule not imported
**Solution:** Already fixed in SharedModule

## Verification Checklist

- [ ] Backend running on port 9090
- [ ] Frontend running on port 4200
- [ ] Logged in as user
- [ ] At least one project exists
- [ ] Project selected in sidebar
- [ ] Chat area visible on right
- [ ] Textarea visible at bottom
- [ ] Can click in textarea
- [ ] Can type text
- [ ] Send button (➤) visible
- [ ] Attach button (📎) visible

## Manual Test

### Test 1: Basic Rendering
1. Go to http://localhost:4200/messages (freelancer)
2. Or http://localhost:4200/backoffice/messages (company)
3. You should see:
   - "Messages" header in sidebar
   - List of projects (or "No projects yet")
   - If no project selected: "Select a project to start chatting"

### Test 2: Project Selection
1. Click any project in the list
2. Project should highlight with blue border
3. Right side should show:
   - Project name in header
   - Messages area (empty or with messages)
   - Input area at bottom

### Test 3: Input Interaction
1. Click in the textarea
2. Cursor should appear
3. Type "Hello"
4. Text should appear as you type
5. Press Enter
6. Message should send

### Test 4: File Upload
1. Click 📎 button
2. File picker should open
3. Select an image
4. File name should appear above input
5. Click ➤ to send
6. Image should appear in chat

## If Still Not Working

### Collect Information:
1. Browser console errors (screenshot)
2. Network tab errors (screenshot)
3. Which page you're on (URL)
4. What you see on screen (screenshot)
5. Backend console output

### Check HTML Rendering:
1. Right-click on the page
2. Select "Inspect"
3. Find the textarea element
4. Check if it has:
   - `[(ngModel)]="newMessage"`
   - `placeholder="Type a message..."`
   - No `disabled` attribute

### Check Component State:
1. In DevTools Console, type:
```javascript
ng.probe($0).componentInstance
```
2. This shows the component's state
3. Check if `selectedProject` is set
4. Check if `sending` is false

## Quick Fixes

### Fix 1: Force Reload Modules
```bash
cd matchy-angular
rm -rf .angular
ng serve
```

### Fix 2: Reinstall Dependencies
```bash
cd matchy-angular
rm -rf node_modules package-lock.json
npm install
ng serve
```

### Fix 3: Check TypeScript Version
```bash
cd matchy-angular
npm list typescript
# Should be compatible with Angular version
```

## Contact Points

If issue persists, provide:
1. Screenshot of the page
2. Browser console errors
3. Network tab showing API calls
4. Angular version: `ng version`
5. Node version: `node --version`

## Expected Behavior

When working correctly:
1. Projects list loads on left
2. Click project → chat opens on right
3. Textarea is enabled and focusable
4. Typing shows text immediately
5. Enter key sends message
6. Message appears in chat
7. Auto-scrolls to bottom
8. Polls for new messages every 5 seconds

## Architecture Check

```
User → Frontend (Angular) → Backend (Spring Boot) → Database
      Port 4200              Port 9090
```

All three must be running and connected!
