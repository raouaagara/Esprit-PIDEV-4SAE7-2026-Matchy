# Quick Restart Guide

## Stop Everything First

### Stop Angular (if running)
In the terminal running `ng serve`:
- Press `Ctrl+C`
- Type `Y` if asked to confirm

### Stop Backend (if running)
In the terminal running Maven:
- Press `Ctrl+C`

## Clear Angular Cache

```bash
cd matchy-angular
rm -rf .angular/cache
```

## Start Backend

```bash
cd PI
./mvnw spring-boot:run -DskipTests
```

Wait until you see:
```
Started PiApplication in X.XXX seconds
```

## Start Frontend

```bash
cd matchy-angular
ng serve
```

Wait until you see:
```
✔ Compiled successfully.
```

## Open Browser

1. Go to: http://localhost:4200
2. Press `F12` to open DevTools
3. Go to Console tab
4. Press `Ctrl+Shift+R` to hard refresh

## Test Chat

### As Freelancer:
1. Login as freelancer
2. Click "Messages" in sidebar
3. Click a project
4. You should see the input box at the bottom
5. Click in the textarea and type "test"
6. Press Enter

### As Company:
1. Go to: http://localhost:4200/backoffice
2. Login as company
3. Click "Messages" in sidebar
4. Click a project
5. Type and send a message

## If Input Still Not Visible

### Check 1: Is the project selected?
- Look at the left sidebar
- One project should have a blue border
- If not, click on a project

### Check 2: Is the chat area showing?
You should see:
```
┌─────────────────┬──────────────────────────┐
│  Projects       │  Project Name            │
│  Sidebar        │  ─────────────────────   │
│                 │                          │
│  □ Project 1    │  Messages appear here    │
│  □ Project 2    │                          │
│                 │  ─────────────────────   │
│                 │  [📎] [Type here...] [➤] │
└─────────────────┴──────────────────────────┘
```

### Check 3: Inspect the textarea
1. Right-click on where the input should be
2. Select "Inspect"
3. Look for `<textarea>` in the HTML
4. If you don't see it, the component isn't rendering

### Check 4: Console Errors
Look for these errors:
- ❌ "Cannot bind to 'ngModel'" → FormsModule issue
- ❌ "404 /api/messages" → Backend not running
- ❌ "Component collision" → Selector issue (should be fixed)

## Still Having Issues?

### Take Screenshots:
1. Full page view
2. Browser console (F12 → Console tab)
3. Network tab (F12 → Network tab)

### Check These:
- [ ] Backend running? (http://localhost:9090/api/messages/user/1/unread-count should work)
- [ ] Frontend running? (http://localhost:4200 loads)
- [ ] Logged in? (Check localStorage for 'token')
- [ ] Project exists? (Go to Projects page first)
- [ ] Project selected? (Blue border in sidebar)

### Last Resort:
```bash
# Clean everything
cd matchy-angular
rm -rf node_modules package-lock.json .angular
npm install
ng serve
```

## Expected Result

When working:
1. ✅ Projects list on left
2. ✅ Click project → blue border appears
3. ✅ Chat area appears on right
4. ✅ Input box at bottom with 📎 and ➤
5. ✅ Can click and type in textarea
6. ✅ Press Enter → message sends
7. ✅ Message appears in chat
8. ✅ Auto-scrolls to bottom

## Quick Test Commands

### Test Backend:
```bash
curl http://localhost:9090/api/messages/user/1/unread-count
```
Should return a number (like `0`)

### Test Frontend:
Open: http://localhost:4200
Should see the login page or dashboard

### Test Messages Page:
Open: http://localhost:4200/messages
Should see "Messages" page with sidebar
