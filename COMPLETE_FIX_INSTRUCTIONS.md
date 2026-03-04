# Complete Fix Instructions - Get Projects Working

## The Issue
- 404 error on `/api/projects/list/open`
- Backend needs to be recompiled with new code
- Freelancers can't see projects or milestones

## The Solution
Changed endpoint to use query parameters instead of path segments:
- **NEW**: `GET /api/projects/all?status=OPEN`
- This avoids ALL routing conflicts

## Step-by-Step Fix

### Step 1: Stop Backend
In the terminal where backend is running:
```bash
Ctrl + C
```

### Step 2: Clean and Rebuild Backend
```bash
cd PI
./mvnw clean install -DskipTests
```

Wait for: `BUILD SUCCESS`

### Step 3: Start Backend
```bash
./mvnw spring-boot:run -DskipTests
```

Wait for: `Started PiApplication in X seconds`

### Step 4: Test Backend Endpoint
Open browser and test:
```
http://localhost:9090/api/projects/all?status=OPEN
```

**Expected Result:**
- `[]` (empty array if no projects)
- `[{...}]` (array of projects if they exist)
- **NOT** 404 error!

### Step 5: Test Frontend
The frontend should auto-reload. If not, refresh:
```
http://localhost:4200/projects
```

**Expected Result:**
- Projects displayed (if any exist)
- "No projects available" (if none exist)
- **NO** 404 errors in console!

## If You Still Get 404

### Check 1: Verify Backend is Running
```bash
# In browser, test:
http://localhost:9090/api/projects/company/1
```

If this works, backend is running.

### Check 2: Verify Endpoint Exists
Look at backend console output. You should see:
```
Mapped "{[/api/projects/all]}" onto ...
```

If you don't see this, the code didn't compile.

### Check 3: Force Rebuild
```bash
cd PI
./mvnw clean
./mvnw compile
./mvnw spring-boot:run -DskipTests
```

## Create Test Data

If you see empty array `[]`, create test projects:

### Option 1: SQL Script
```bash
mysql -u root -p PITASK < create_test_data.sql
```

### Option 2: Backoffice UI
1. Go to `http://localhost:4200/backoffice/login`
2. Login as company (create account if needed)
3. Go to Projects
4. Click "+ New Project"
5. Fill form:
   - Title: "Test Project"
   - Description: "Test description"  
   - Budget: 5000
   - Deadline: 2026-12-31
   - Status: OPEN (default)
6. Click Create
7. Click "View" on project
8. Click "+ Add Milestone"
9. Fill form:
   - Title: "Phase 1"
   - Description: "First phase"
   - Budget: 2000
   - Deadline: 2026-06-30
10. Click Create

### Option 3: Direct SQL
```sql
USE PITASK;

-- Create company user
INSERT INTO users (email, password, first_name, last_name, user_type, company_name, is_active, created_at)
VALUES ('company@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhkO', 
        'Test', 'Company', 'COMPANY', 'Test Corp', true, NOW());

SET @company_id = LAST_INSERT_ID();

-- Create project
INSERT INTO projects (title, description, total_budget, deadline, status, company_id, created_at)
VALUES ('E-commerce Website', 'Build modern e-commerce platform', 5000.00, '2026-06-30', 'OPEN', @company_id, NOW());

SET @project_id = LAST_INSERT_ID();

-- Create milestones
INSERT INTO milestones (project_id, title, description, budget, deadline, status, created_at, updated_at)
VALUES 
(@project_id, 'Frontend Development', 'Build React frontend', 2000.00, '2026-05-15', 'PENDING', NOW(), NOW()),
(@project_id, 'Backend API', 'Develop REST API', 2000.00, '2026-06-01', 'PENDING', NOW(), NOW());

-- Verify
SELECT * FROM projects WHERE id = @project_id;
SELECT * FROM milestones WHERE project_id = @project_id;
```

## Test Complete Flow

### As Freelancer:
1. Login: `http://localhost:4200`
2. Click "Browse Projects" in navbar
3. Should see projects
4. Click "View Details & Apply"
5. Should see milestones
6. Click "Apply to this Milestone"
7. Fill form and submit

### As Company:
1. Login: `http://localhost:4200/backoffice/login`
2. Go to Projects
3. Click "View" on project
4. Click "Applications" on milestone
5. Should see freelancer's application

## New Endpoint Details

### Get All Projects
```
GET /api/projects/all
Returns: All projects
```

### Get Open Projects (for freelancers)
```
GET /api/projects/all?status=OPEN
Returns: Only OPEN projects
```

### Get Projects by Status
```
GET /api/projects/all?status=IN_PROGRESS
GET /api/projects/all?status=COMPLETED
GET /api/projects/all?status=CANCELLED
```

## Verification Checklist

- [ ] Backend starts without errors
- [ ] Can access `http://localhost:9090/api/projects/all?status=OPEN`
- [ ] Returns JSON (not 404)
- [ ] Frontend loads without errors
- [ ] Can see "Browse Projects" in navbar
- [ ] Can click and see projects (or empty state)
- [ ] No 404 errors in browser console
- [ ] Can view project details
- [ ] Can see milestones
- [ ] Can apply to milestones (as freelancer)

## Common Issues

### Issue: "Cannot find symbol: Map"
**Solution**: Already imported, just rebuild

### Issue: Backend won't start
**Solution**: 
```bash
cd PI
./mvnw clean
rm -rf target/
./mvnw install -DskipTests
./mvnw spring-boot:run -DskipTests
```

### Issue: Frontend shows old error
**Solution**: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Still 404
**Solution**: Check backend console for the exact URL it's listening on

## Success Indicators

✅ Backend console shows:
```
=== Getting Projects (status: OPEN) ===
Found X projects
```

✅ Frontend console shows:
```
Loaded projects: [{...}]
```

✅ Browser shows:
- Projects in grid layout
- Can click to view details
- Can apply to milestones

## Why This Fix Works

1. **No Path Conflicts**: Uses `/all` with query parameter instead of `/open` path
2. **More Flexible**: Can filter by any status
3. **RESTful**: Query parameters are standard for filtering
4. **Future-Proof**: Easy to add more filters later

## Alternative: If You Want to Keep /open

If you really want `/open` to work, you need to move `@GetMapping("/{id}")` to the END of the controller, after ALL specific paths. But using `/all?status=OPEN` is cleaner and more flexible.
