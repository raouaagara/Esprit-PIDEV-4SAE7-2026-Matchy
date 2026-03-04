# Troubleshooting Guide - 400 Error Fix

## Quick Fix Steps

### Step 1: Restart Backend
The code has been updated with better error handling. Restart the backend:

```bash
cd PI
# Stop the current process (Ctrl+C)
./mvnw spring-boot:run -DskipTests
```

Wait for: `Started PiApplication in X seconds`

### Step 2: Test the Endpoint Directly
Open your browser and navigate to:
```
http://localhost:9090/api/projects/open
```

**Expected Results:**
- If no projects: `[]` (empty array)
- If projects exist: `[{...}]` (array of project objects)
- If error: JSON with error message

### Step 3: Create Test Data (If Needed)
If you see an empty array `[]`, you need to create test projects.

**Option A: Use SQL Script**
1. Open MySQL Workbench or command line
2. Run the `create_test_data.sql` script
3. This creates 3 projects with milestones

**Option B: Use Backoffice UI**
1. Go to `http://localhost:4200/backoffice/login`
2. Login with company credentials
3. Go to Projects
4. Click "+ New Project"
5. Fill in:
   - Title: "Test Project"
   - Description: "Test description"
   - Budget: 5000
   - Deadline: (future date)
6. Click Create

### Step 4: Verify Frontend
1. Go to `http://localhost:4200/projects`
2. You should see the projects
3. Check browser console (F12) for any errors

## What Was Fixed

### Backend Changes:
1. **Added Null Safety** - Company name now handles null values gracefully
2. **Better Error Handling** - Returns 500 instead of 400 for server errors
3. **Individual Error Catching** - Each project is processed in try-catch
4. **Detailed Logging** - Better console output for debugging

### Frontend Changes:
1. **Better Error Display** - Shows actual error message from backend
2. **Console Logging** - Logs loaded projects for debugging

## Common Issues & Solutions

### Issue 1: "No projects available"
**Cause**: No projects with status OPEN in database
**Solution**: Create test projects using SQL script or backoffice

### Issue 2: Still getting 400 error
**Cause**: Backend not restarted with new code
**Solution**: 
```bash
cd PI
# Stop current process
./mvnw clean install -DskipTests
./mvnw spring-boot:run -DskipTests
```

### Issue 3: "Company not found" error
**Cause**: Project has invalid company_id
**Solution**: Run this SQL to fix:
```sql
-- Find orphaned projects
SELECT p.* FROM projects p 
LEFT JOIN users u ON p.company_id = u.id 
WHERE u.id IS NULL;

-- Delete them
DELETE FROM projects WHERE company_id NOT IN (SELECT id FROM users);
```

### Issue 4: CORS error
**Cause**: Frontend not running on port 4200
**Solution**: Check frontend is on `http://localhost:4200`

### Issue 5: 401 Unauthorized
**Cause**: Not logged in or token expired
**Solution**: Login again at `http://localhost:4200/backoffice/login`

## Verification Steps

Run through this checklist:

1. **Backend Running**
   ```bash
   # Should see this in console:
   Started PiApplication in X seconds
   ```

2. **Database Connected**
   ```bash
   # Should NOT see:
   Unable to connect to database
   ```

3. **Endpoint Accessible**
   ```
   http://localhost:9090/api/projects/open
   # Should return JSON (array or error object)
   ```

4. **Projects Exist**
   ```sql
   SELECT COUNT(*) FROM projects WHERE status = 'OPEN';
   # Should return > 0
   ```

5. **Frontend Running**
   ```
   http://localhost:4200/projects
   # Should show projects or "No projects available"
   ```

6. **No Console Errors**
   - Open browser console (F12)
   - Should not see red errors
   - Should see: "Loaded projects: [...]"

## Testing the Complete Flow

### 1. As Company (Create Project)
```
1. Login: http://localhost:4200/backoffice/login
   Email: company@test.com
   Password: password123

2. Go to Projects

3. Click "+ New Project"

4. Fill form:
   Title: "My Test Project"
   Description: "Testing the platform"
   Budget: 3000
   Deadline: 2026-12-31

5. Click Create

6. Click "View" on the project

7. Click "+ Add Milestone"

8. Fill form:
   Title: "Phase 1"
   Description: "First phase"
   Budget: 1500
   Deadline: 2026-06-30

9. Click Create
```

### 2. As Freelancer (Browse & Apply)
```
1. Logout from company account

2. Login as freelancer:
   Email: freelancer@test.com
   Password: password123

3. Click "Browse Projects" in navbar

4. You should see "My Test Project"

5. Click "View Details & Apply"

6. You should see "Phase 1" milestone

7. Click "Apply to this Milestone"

8. Fill form:
   Cover Letter: "I'm interested in this project..."
   Proposed Budget: 1400

9. Click "Submit Application"

10. Should see success message
```

### 3. As Company (Review Application)
```
1. Login as company again

2. Go to Projects → View "My Test Project"

3. Click "Applications" on "Phase 1" milestone

4. You should see the freelancer's application

5. Review and accept/reject
```

## Backend Console Output

When everything works, you should see:
```
=== Getting All Open Projects ===
Found 3 open projects
```

When there's an error, you'll see:
```
=== Getting All Open Projects ===
Error getting open projects: [error message]
[stack trace]
```

## Frontend Console Output

When everything works:
```
Loaded projects: [{id: 1, title: "...", ...}, ...]
```

When there's an error:
```
Error loading projects: [error message]
```

## Still Not Working?

If you've tried everything above and it still doesn't work:

1. **Check Backend Logs**
   - Look for the FULL error message
   - Copy the stack trace

2. **Check Database**
   ```sql
   -- Verify tables exist
   SHOW TABLES;
   
   -- Check projects
   SELECT * FROM projects;
   
   -- Check users
   SELECT id, email, user_type, company_name FROM users;
   ```

3. **Test with Postman**
   ```
   GET http://localhost:9090/api/projects/open
   Headers: (none needed for this endpoint)
   ```

4. **Check Network Tab**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Reload the page
   - Click on the failed request
   - Check Response tab for error details

## Success Indicators

You know it's working when:
- ✅ Backend starts without errors
- ✅ `http://localhost:9090/api/projects/open` returns JSON
- ✅ Frontend shows projects (or empty state if none exist)
- ✅ No red errors in browser console
- ✅ Can click on projects to view details
- ✅ Can apply to milestones as freelancer

## Contact

If you're still stuck, provide:
1. Backend console output (full error)
2. Frontend console output (F12)
3. Network tab response
4. Database query results
