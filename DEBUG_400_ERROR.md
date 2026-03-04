# Debugging 400 Error on /api/projects/open

## Issue
Getting 400 Bad Request when calling `GET /api/projects/open`

## Possible Causes

### 1. No OPEN Projects in Database
The endpoint might be working but returning an error because there are no projects with status OPEN.

**Solution**: Create a test project with status OPEN

### 2. Database Connection Issue
The repository query might be failing.

**Solution**: Check backend console logs

### 3. Null Pointer Exception
Some field in the Project or Company entity might be null.

**Solution**: Added null checks in the code

## Steps to Debug

### Step 1: Check Backend Logs
Look at the backend console when the error occurs. You should see:
```
=== Getting All Open Projects ===
Found X open projects
```

If you see an exception stack trace, that's the issue.

### Step 2: Test with Postman
```
GET http://localhost:9090/api/projects/open
```

This will show you the exact error message.

### Step 3: Check Database
Run this SQL query:
```sql
SELECT * FROM projects WHERE status = 'OPEN';
```

If no results, create a test project.

### Step 4: Create Test Project
Use the backoffice to create a project:
1. Login as a COMPANY user
2. Go to Projects
3. Click "+ New Project"
4. Fill in all fields
5. Make sure status is OPEN
6. Save

### Step 5: Check Frontend Console
Open browser console (F12) and look for:
```
Loaded projects: [...]
```

Or error messages.

## Fixed Issues

### ✅ Added Null Safety
- Company name now safely handles null values
- Falls back to "Unknown Company" if all name fields are null
- Added try-catch around each project processing

### ✅ Better Error Handling
- Changed 400 to 500 for server errors
- Return proper error object with message
- Log each project processing error separately

### ✅ Frontend Error Display
- Show actual error message from backend
- Log errors to console for debugging

## Testing the Fix

### 1. Restart Backend
```bash
cd PI
./mvnw spring-boot:run -DskipTests
```

Wait for: "Started PiApplication"

### 2. Check Backend Endpoint Directly
Open browser and go to:
```
http://localhost:9090/api/projects/open
```

You should see either:
- `[]` (empty array if no projects)
- `[{...}]` (array of projects)
- Error message in JSON format

### 3. Test Frontend
```bash
cd matchy-angular
npm start
```

Navigate to: `http://localhost:4200/projects`

### 4. Expected Behavior

**If no projects exist:**
- Should show empty state: "No projects available"
- No errors in console

**If projects exist:**
- Should show project cards
- Each card should have title, company name, budget, etc.

**If error occurs:**
- Should show error message
- Check backend console for stack trace
- Check frontend console for error details

## Common Issues

### Issue: "Company not found"
**Cause**: Project has invalid company_id
**Fix**: 
```sql
-- Check for orphaned projects
SELECT p.* FROM projects p 
LEFT JOIN users u ON p.company_id = u.id 
WHERE u.id IS NULL;

-- Delete orphaned projects
DELETE FROM projects WHERE company_id NOT IN (SELECT id FROM users);
```

### Issue: "Milestone query failed"
**Cause**: Circular reference or lazy loading issue
**Fix**: Already handled with safe milestone count query

### Issue: "Status is null"
**Cause**: Old projects without status
**Fix**:
```sql
UPDATE projects SET status = 'OPEN' WHERE status IS NULL;
```

## Verification Checklist

- [ ] Backend starts without errors
- [ ] Can access `http://localhost:9090/api/projects/open` in browser
- [ ] Backend logs show "Getting All Open Projects"
- [ ] At least one project exists with status OPEN
- [ ] Project has valid company_id
- [ ] Company user exists in database
- [ ] Frontend shows projects or empty state (no errors)
- [ ] Browser console shows no errors

## If Still Not Working

1. **Check the exact error in backend console**
   - Look for the full stack trace
   - Note the line number where it fails

2. **Test each project individually**
   ```sql
   SELECT id, title, status, company_id FROM projects WHERE status = 'OPEN';
   ```
   
   Then for each project ID, test:
   ```
   GET http://localhost:9090/api/projects/{id}
   ```

3. **Verify database schema**
   ```sql
   DESCRIBE projects;
   DESCRIBE users;
   ```

4. **Check for data integrity**
   ```sql
   -- All projects should have valid company
   SELECT COUNT(*) FROM projects p
   LEFT JOIN users u ON p.company_id = u.id
   WHERE u.id IS NULL;
   -- Should return 0
   ```

## Quick Fix Script

If you need to reset and create test data:

```sql
-- Clean up
DELETE FROM milestones;
DELETE FROM projects;

-- Create test company user (if not exists)
INSERT INTO users (email, password, first_name, last_name, user_type, company_name, is_active, created_at)
VALUES ('testcompany@test.com', '$2a$10$...', 'Test', 'Company', 'COMPANY', 'Test Corp', true, NOW())
ON DUPLICATE KEY UPDATE id=id;

-- Get the company ID
SET @company_id = (SELECT id FROM users WHERE email = 'testcompany@test.com');

-- Create test project
INSERT INTO projects (title, description, total_budget, deadline, status, company_id, created_at)
VALUES 
('E-commerce Website', 'Build a modern e-commerce platform', 5000.00, '2026-06-30', 'OPEN', @company_id, NOW()),
('Mobile App Development', 'Create iOS and Android app', 8000.00, '2026-08-15', 'OPEN', @company_id, NOW());
```

## Success Criteria

When everything works:
1. ✅ Backend returns 200 OK
2. ✅ Response is valid JSON array
3. ✅ Frontend displays projects
4. ✅ No console errors
5. ✅ Can click on projects to view details
