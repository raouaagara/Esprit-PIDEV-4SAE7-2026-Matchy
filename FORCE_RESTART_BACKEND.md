# 🔴 FORCE RESTART BACKEND - Step by Step

## Current Situation
- Backend is running with OLD code
- Multiple Java processes are running
- New endpoints not loaded yet
- Getting 404 errors

## Solution: Force Kill and Restart

### Step 1: Kill ALL Java Processes

**Option A: Using Task Manager (Easiest)**
1. Press `Ctrl+Shift+Esc` to open Task Manager
2. Find all "Java(TM) Platform SE binary" processes
3. Right-click each one → End Task
4. Close Task Manager

**Option B: Using PowerShell**
```powershell
# Kill all Java processes
Get-Process -Name "java" -ErrorAction SilentlyContinue | Stop-Process -Force

# Verify they're gone
Get-Process -Name "java" -ErrorAction SilentlyContinue
# Should return nothing
```

### Step 2: Navigate to Backend Directory
```bash
cd C:\Users\abdellah\Desktop\TASKK\PI
```

### Step 3: Clean Build (Important!)
```bash
# Clean old compiled files
./mvnw clean

# This removes old .class files
```

### Step 4: Start Backend Fresh
```bash
./mvnw spring-boot:run -DskipTests
```

### Step 5: Wait for Startup
Look for these messages in console:
```
Tomcat started on port(s): 9090 (http)
Started PiApplication in X.XXX seconds
```

### Step 6: Test Endpoints
Open browser and go to:
```
http://localhost:9090/api/applications/all
```

**Expected Result:** `[]` (empty array)
**Wrong Result:** 404 error page

If you still get 404, the backend didn't restart properly.

## Verification Checklist

### ✅ Backend Started Correctly If You See:
```
[  restartedMain] t.e.pi.PiApplication                 : Started PiApplication
[  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 9090
```

### ❌ Backend Has Issues If You See:
```
Error starting ApplicationContext
Port 9090 is already in use
Compilation error
```

## Common Issues

### Issue 1: Port Already in Use
```
Error: Port 9090 is already in use
```

**Solution:**
```powershell
# Find what's using port 9090
netstat -ano | findstr :9090

# Kill that process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Issue 2: Compilation Errors
```
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin
```

**Solution:**
Check the error message. Usually it's:
- Missing import
- Syntax error
- Wrong Java version

### Issue 3: Multiple Java Processes
```
Multiple java.exe processes running
```

**Solution:**
Kill ALL of them:
```powershell
Get-Process -Name "java" | Stop-Process -Force
```

## Alternative: Use IDE

If you're using IntelliJ IDEA or Eclipse:

### IntelliJ IDEA:
1. Click the red square (Stop) button
2. Wait for it to stop
3. Click the green play button (Run)
4. Wait for "Started PiApplication"

### Eclipse:
1. Click the red square (Terminate) button
2. Right-click project → Run As → Spring Boot App

## After Successful Restart

### Test Each Endpoint:

**1. Applications:**
```
http://localhost:9090/api/applications/all
Expected: []
```

**2. Submissions:**
```
http://localhost:9090/api/submissions/all
Expected: []
```

**3. Reviews:**
```
http://localhost:9090/api/reviews/all
Expected: []
```

**4. Payments:**
```
http://localhost:9090/api/payments/company/1/history
Expected: []
```

All should return empty arrays `[]`, NOT 404 errors.

### Then Test Frontend:

1. **Refresh browser** (Ctrl+Shift+R)
2. **Login as company**
3. **Go to `/backoffice/applications`**
4. **Should see:** "No applications found" (not 404 error)

## Why This Happens

When you modify Java files, Spring Boot needs to:
1. Recompile the .java files to .class files
2. Reload the application context
3. Register new endpoints

If you don't restart properly:
- Old .class files are still in memory
- New endpoints don't exist
- You get 404 errors

## Quick Commands Summary

```bash
# 1. Kill all Java
Get-Process -Name "java" | Stop-Process -Force

# 2. Go to backend
cd C:\Users\abdellah\Desktop\TASKK\PI

# 3. Clean build
./mvnw clean

# 4. Start fresh
./mvnw spring-boot:run -DskipTests

# 5. Wait for "Started PiApplication"

# 6. Test endpoint
curl http://localhost:9090/api/applications/all
```

## If Still Not Working

### Check These Files Exist:
```
PI/src/main/java/tn/esprit/pi/controller/PaymentController.java
```

### Check ApplicationController Has:
```java
@GetMapping("/all")
public ResponseEntity<?> getAllApplications() {
    // ...
}
```

### Check Console Output:
Look for:
```
Mapped "{[/api/applications/all],methods=[GET]}"
Mapped "{[/api/submissions/all],methods=[GET]}"
Mapped "{[/api/reviews/all],methods=[GET]}"
Mapped "{[/api/payments/company/{companyId}/history],methods=[GET]}"
```

If you don't see these mappings, the endpoints weren't loaded.

## Last Resort

If nothing works:

1. **Close ALL terminals**
2. **Restart your computer**
3. **Open fresh terminal**
4. **Start backend:**
   ```bash
   cd C:\Users\abdellah\Desktop\TASKK\PI
   ./mvnw spring-boot:run -DskipTests
   ```

This ensures no old processes are running.

## Summary

🔴 **MUST DO:**
1. Kill all Java processes
2. Clean build (`./mvnw clean`)
3. Start fresh (`./mvnw spring-boot:run -DskipTests`)
4. Wait for "Started PiApplication"
5. Test endpoints return `[]` not 404

✅ **SUCCESS WHEN:**
- No 404 errors
- Endpoints return empty arrays
- Frontend pages load (even if empty)
