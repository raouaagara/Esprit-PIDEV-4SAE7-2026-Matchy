# Start Backend - Quick Guide

## Error You're Seeing

```
GET http://localhost:9090/api/messages/thread/1/3 net::ERR_CONNECTION_REFUSED
```

This means the backend is NOT running on port 9090.

## Solution: Start the Backend

### Option 1: Using Maven Wrapper (Recommended)

Open a NEW terminal (keep Angular running in the other one):

```bash
cd PI
./mvnw spring-boot:run -DskipTests
```

**On Windows PowerShell, use:**
```powershell
cd PI
.\mvnw.cmd spring-boot:run -DskipTests
```

### Option 2: Using Maven (if installed)

```bash
cd PI
mvn spring-boot:run -DskipTests
```

## Wait for Backend to Start

You should see output like:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.1.5)

...
Started PiApplication in X.XXX seconds (JVM running for X.XXX)
```

## Verify Backend is Running

Open a browser and go to:
```
http://localhost:9090/api/notifications/user/1/unread-count
```

Should return a number (like `0` or `5`)

## Common Issues

### Issue 1: Port 9090 Already in Use

**Error:**
```
Port 9090 was already in use
```

**Solution:**
```bash
# Windows
netstat -ano | findstr :9090
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:9090 | xargs kill -9
```

### Issue 2: mvnw not found

**Error:**
```
mvnw: command not found
```

**Solution:**
```bash
# Make sure you're in the PI directory
cd PI
pwd  # Should show .../TASKK/PI

# On Windows, use:
.\mvnw.cmd spring-boot:run -DskipTests

# On Linux/Mac, make it executable first:
chmod +x mvnw
./mvnw spring-boot:run -DskipTests
```

### Issue 3: Java Version Error

**Error:**
```
Java version mismatch
```

**Solution:**
Make sure you have Java 17 or higher:
```bash
java -version
```

Should show: `java version "17"` or higher

## After Backend Starts

1. Keep the backend terminal running
2. Go back to your browser with Angular app
3. Refresh the page (Ctrl+R)
4. Go to Messages
5. Select a project
6. Try sending a message

## Full Startup Sequence

### Terminal 1 - Backend:
```bash
cd C:\Users\abdellah\Desktop\TASKK\PI
.\mvnw.cmd spring-boot:run -DskipTests
```
Wait for: `Started PiApplication`

### Terminal 2 - Frontend:
```bash
cd C:\Users\abdellah\Desktop\TASKK\matchy-angular
ng serve
```
Wait for: `✔ Compiled successfully.`

### Browser:
```
http://localhost:4200
```

## Quick Test

Once both are running:

1. **Test Backend:**
   ```
   http://localhost:9090/api/notifications/user/1/unread-count
   ```
   Should return a number

2. **Test Frontend:**
   ```
   http://localhost:4200
   ```
   Should show login page

3. **Test Messages:**
   - Login
   - Go to Messages
   - Select a project
   - Type "Hello"
   - Press Enter
   - Message should send!

## Logs to Watch

### Backend Console:
```
Hibernate: insert into message ...
```
This means messages are being saved

### Browser Console (F12):
```
POST http://localhost:9090/api/messages/send 200 OK
```
This means messages are sending successfully

## Stop Services

### Stop Backend:
Press `Ctrl+C` in the backend terminal

### Stop Frontend:
Press `Ctrl+C` in the frontend terminal

## Restart Everything

If things get stuck:

1. Stop both services (Ctrl+C)
2. Start backend first
3. Wait for it to fully start
4. Start frontend
5. Refresh browser

## Database Note

The backend uses an embedded database (H2 or similar). Data is stored in memory or in the `PI` directory. If you restart the backend, you might lose data unless it's configured to persist.

## Success Indicators

✅ Backend running: See "Started PiApplication" in terminal
✅ Frontend running: See "✔ Compiled successfully." in terminal
✅ Backend accessible: http://localhost:9090/api/... returns data
✅ Frontend accessible: http://localhost:4200 loads
✅ Messages work: Can send and receive messages

## Need Help?

If backend won't start, check:
1. Java version: `java -version` (need 17+)
2. Port availability: `netstat -ano | findstr :9090`
3. Directory: `pwd` (should be in PI folder)
4. Permissions: Run terminal as administrator if needed

The backend MUST be running for the chat to work!
