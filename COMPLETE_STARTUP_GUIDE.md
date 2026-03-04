# Complete Startup Guide - Matchy Platform

## 🚨 IMPORTANT: Backend Must Be Running!

The error you're seeing means the backend is NOT running:
```
GET http://localhost:9090/api/messages/thread/1/3 net::ERR_CONNECTION_REFUSED
```

## Quick Start (Easiest Method)

### Step 1: Start Backend
Double-click: `start-backend.bat`

Or manually:
```powershell
cd C:\Users\abdellah\Desktop\TASKK\PI
.\mvnw.cmd spring-boot:run -DskipTests
```

**Wait for this message:**
```
Started PiApplication in X.XXX seconds
```

### Step 2: Start Frontend (in a NEW terminal)
Double-click: `start-frontend.bat`

Or manually:
```powershell
cd C:\Users\abdellah\Desktop\TASKK\matchy-angular
ng serve
```

**Wait for this message:**
```
✔ Compiled successfully.
```

### Step 3: Open Browser
Go to: http://localhost:4200

## Detailed Instructions

### Terminal 1 - Backend (Port 9090)

1. Open PowerShell or Command Prompt
2. Navigate to PI folder:
   ```powershell
   cd C:\Users\abdellah\Desktop\TASKK\PI
   ```
3. Start backend:
   ```powershell
   .\mvnw.cmd spring-boot:run -DskipTests
   ```
4. Wait 30-60 seconds for startup
5. Look for: `Started PiApplication in X.XXX seconds`
6. **Keep this terminal open!**

### Terminal 2 - Frontend (Port 4200)

1. Open a NEW PowerShell or Command Prompt
2. Navigate to Angular folder:
   ```powershell
   cd C:\Users\abdellah\Desktop\TASKK\matchy-angular
   ```
3. Start frontend:
   ```powershell
   ng serve
   ```
4. Wait 30-60 seconds for compilation
5. Look for: `✔ Compiled successfully.`
6. **Keep this terminal open!**

### Browser

1. Open Chrome, Edge, or Firefox
2. Go to: http://localhost:4200
3. You should see the login page

## Verify Everything is Running

### Check Backend (Port 9090)
Open in browser:
```
http://localhost:9090/api/notifications/user/1/unread-count
```
Should return: `0` or a number

### Check Frontend (Port 4200)
Open in browser:
```
http://localhost:4200
```
Should show: Login page

## Test the Chat Feature

### As Freelancer:
1. Login as freelancer
2. Click "Messages" in sidebar
3. Click on a project
4. You should see:
   - Project list on left
   - Chat area on right
   - Input box at bottom: `[📎] [Type a message...] [➤]`
5. Type "Hello" and press Enter
6. Message should appear in chat!

### As Company:
1. Go to: http://localhost:4200/backoffice
2. Login as company
3. Click "Messages" in sidebar
4. Click on a project
5. Type and send messages

## Troubleshooting

### Problem: Backend won't start

**Error: Port 9090 already in use**
```powershell
# Find process using port 9090
netstat -ano | findstr :9090

# Kill the process (replace <PID> with actual number)
taskkill /PID <PID> /F
```

**Error: Java not found**
```powershell
# Check Java version
java -version
```
Need Java 17 or higher. Download from: https://adoptium.net/

**Error: mvnw.cmd not found**
Make sure you're in the PI directory:
```powershell
cd C:\Users\abdellah\Desktop\TASKK\PI
dir mvnw.cmd  # Should show the file
```

### Problem: Frontend won't start

**Error: Port 4200 already in use**
```powershell
# Find process using port 4200
netstat -ano | findstr :4200

# Kill the process
taskkill /PID <PID> /F
```

**Error: ng command not found**
```powershell
# Install Angular CLI globally
npm install -g @angular/cli
```

### Problem: Messages not sending

**Check 1: Is backend running?**
```
http://localhost:9090/api/notifications/user/1/unread-count
```
Should return a number, not an error

**Check 2: Is frontend running?**
```
http://localhost:4200
```
Should load the page

**Check 3: Are you logged in?**
- Press F12 → Application → Local Storage
- Should see `token` and `currentUser`

**Check 4: Is a project selected?**
- Look at left sidebar
- One project should have blue border
- If not, click on a project

**Check 5: Browser console errors?**
- Press F12 → Console
- Look for red errors
- Share them if you see any

### Problem: Input box not visible

**Solution 1: Select a project**
Click on a project in the left sidebar

**Solution 2: Hard refresh**
Press Ctrl+Shift+R

**Solution 3: Clear cache**
- F12 → Application → Clear storage → Clear site data
- Refresh page

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   Browser                       │
│            http://localhost:4200                │
│                                                 │
│  ┌──────────────┐         ┌─────────────────┐  │
│  │  Freelancer  │         │    Company      │  │
│  │  Interface   │         │   Interface     │  │
│  │  (Messages)  │         │   (Messages)    │  │
│  └──────────────┘         └─────────────────┘  │
└─────────────────────────────────────────────────┘
                    │
                    │ HTTP Requests
                    ▼
┌─────────────────────────────────────────────────┐
│              Backend API                        │
│         http://localhost:9090/api               │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  MessageController                       │  │
│  │  - POST /messages/send                   │  │
│  │  - GET /messages/thread/{id}/{userId}    │  │
│  │  - POST /messages/upload                 │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  Database (H2/MySQL)                     │  │
│  │  - Messages                              │  │
│  │  - Projects                              │  │
│  │  - Users                                 │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Ports Used

| Service | Port | URL |
|---------|------|-----|
| Backend | 9090 | http://localhost:9090 |
| Frontend | 4200 | http://localhost:4200 |
| Eureka (optional) | 8761 | http://localhost:8761 |
| Gateway (optional) | 8081 | http://localhost:8081 |

## Files Created

| File | Purpose |
|------|---------|
| `start-backend.bat` | Quick start backend |
| `start-frontend.bat` | Quick start frontend |
| `START_BACKEND.md` | Backend startup guide |
| `COMPLETE_STARTUP_GUIDE.md` | This file |
| `CHAT_IMPLEMENTATION_COMPLETE.md` | Full implementation details |
| `QUICK_START_CHAT.md` | Chat usage guide |

## Success Checklist

- [ ] Backend terminal shows "Started PiApplication"
- [ ] Frontend terminal shows "✔ Compiled successfully."
- [ ] http://localhost:9090/api/notifications/user/1/unread-count returns a number
- [ ] http://localhost:4200 loads the login page
- [ ] Can login successfully
- [ ] Messages page loads
- [ ] Can see projects in sidebar
- [ ] Can select a project
- [ ] Can see input box at bottom
- [ ] Can type in input box
- [ ] Can send messages
- [ ] Messages appear in chat

## Quick Commands Reference

### Start Backend:
```powershell
cd C:\Users\abdellah\Desktop\TASKK\PI
.\mvnw.cmd spring-boot:run -DskipTests
```

### Start Frontend:
```powershell
cd C:\Users\abdellah\Desktop\TASKK\matchy-angular
ng serve
```

### Stop Services:
Press `Ctrl+C` in each terminal

### Check Ports:
```powershell
netstat -ano | findstr :9090
netstat -ano | findstr :4200
```

### Kill Process:
```powershell
taskkill /PID <PID> /F
```

## Next Steps

Once everything is running:

1. ✅ Test text messaging
2. ✅ Test file upload
3. ✅ Test real-time updates (wait 5 seconds)
4. ✅ Test dark mode toggle
5. ✅ Test on mobile (responsive design)
6. ✅ Test contracts feature
7. ✅ Test notifications

## Need More Help?

Check these files:
- `START_BACKEND.md` - Detailed backend startup
- `TROUBLESHOOTING_CHAT.md` - Common issues
- `CHAT_IMPLEMENTATION_COMPLETE.md` - Technical details
- `QUICK_START_CHAT.md` - User guide

## Summary

**To use the chat:**
1. Start backend (port 9090)
2. Start frontend (port 4200)
3. Login
4. Go to Messages
5. Select project
6. Type and send!

Both services MUST be running for the chat to work! 🚀
