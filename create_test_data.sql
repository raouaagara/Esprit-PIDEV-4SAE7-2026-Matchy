-- Create Test Data for Matchy Platform
-- Run this in MySQL Workbench or command line

USE PITASK;

-- 1. Create Test Company User
INSERT INTO users (email, password, first_name, last_name, user_type, company_name, is_active, created_at)
VALUES ('company@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhkO', 'Tech', 'Solutions', 'COMPANY', 'Tech Solutions Inc', true, NOW())
ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);

SET @company_id = LAST_INSERT_ID();

-- 2. Create Test Freelancer User
INSERT INTO users (email, password, first_name, last_name, user_type, expertise, hourly_rate, is_active, created_at)
VALUES ('freelancer@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhkO', 'John', 'Developer', 'FREELANCER', 'Full Stack Development', 50.00, true, NOW())
ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);

SET @freelancer_id = LAST_INSERT_ID();

-- 3. Create Test Projects
INSERT INTO projects (title, description, total_budget, deadline, status, company_id, created_at)
VALUES 
('E-commerce Website', 'Build a modern e-commerce platform with React and Node.js. Need shopping cart, payment integration, and admin panel.', 5000.00, '2026-06-30', 'OPEN', @company_id, NOW()),
('Mobile App Development', 'Create iOS and Android app for food delivery service. Features include real-time tracking, payment gateway, and push notifications.', 8000.00, '2026-08-15', 'OPEN', @company_id, NOW()),
('CRM System', 'Develop a customer relationship management system with dashboard, reporting, and email integration.', 6500.00, '2026-07-20', 'OPEN', @company_id, NOW());

-- Get project IDs
SET @project1_id = (SELECT id FROM projects WHERE title = 'E-commerce Website' ORDER BY id DESC LIMIT 1);
SET @project2_id = (SELECT id FROM projects WHERE title = 'Mobile App Development' ORDER BY id DESC LIMIT 1);
SET @project3_id = (SELECT id FROM projects WHERE title = 'CRM System' ORDER BY id DESC LIMIT 1);

-- 4. Create Milestones for Project 1 (E-commerce)
INSERT INTO milestones (project_id, title, description, budget, deadline, status, created_at, updated_at)
VALUES 
(@project1_id, 'Frontend Development', 'Build React frontend with responsive design, product catalog, and shopping cart functionality.', 2000.00, '2026-05-15', 'PENDING', NOW(), NOW()),
(@project1_id, 'Backend API', 'Develop REST API with Node.js, Express, and MongoDB. Include authentication and payment processing.', 2000.00, '2026-06-01', 'PENDING', NOW(), NOW()),
(@project1_id, 'Admin Panel', 'Create admin dashboard for managing products, orders, and customers.', 1000.00, '2026-06-20', 'PENDING', NOW(), NOW());

-- 5. Create Milestones for Project 2 (Mobile App)
INSERT INTO milestones (project_id, title, description, budget, deadline, status, created_at, updated_at)
VALUES 
(@project2_id, 'UI/UX Design', 'Design app screens, user flows, and create interactive prototypes.', 1500.00, '2026-06-01', 'PENDING', NOW(), NOW()),
(@project2_id, 'iOS Development', 'Build native iOS app with Swift. Include all core features.', 3000.00, '2026-07-15', 'PENDING', NOW(), NOW()),
(@project2_id, 'Android Development', 'Build native Android app with Kotlin. Include all core features.', 3000.00, '2026-07-15', 'PENDING', NOW(), NOW()),
(@project2_id, 'Backend & Integration', 'Develop backend API and integrate with mobile apps.', 500.00, '2026-08-01', 'PENDING', NOW(), NOW());

-- 6. Create Milestones for Project 3 (CRM)
INSERT INTO milestones (project_id, title, description, budget, deadline, status, created_at, updated_at)
VALUES 
(@project3_id, 'Database Design', 'Design database schema and relationships for CRM system.', 800.00, '2026-05-10', 'PENDING', NOW(), NOW()),
(@project3_id, 'Core Features', 'Implement contact management, lead tracking, and activity logging.', 2500.00, '2026-06-15', 'PENDING', NOW(), NOW()),
(@project3_id, 'Dashboard & Reports', 'Create analytics dashboard with charts and exportable reports.', 1700.00, '2026-07-01', 'PENDING', NOW(), NOW()),
(@project3_id, 'Email Integration', 'Integrate with email services for automated campaigns.', 1500.00, '2026-07-15', 'PENDING', NOW(), NOW());

-- 7. Verify Data
SELECT 'Projects Created:' as Info, COUNT(*) as Count FROM projects WHERE company_id = @company_id;
SELECT 'Milestones Created:' as Info, COUNT(*) as Count FROM milestones WHERE project_id IN (@project1_id, @project2_id, @project3_id);

-- 8. Display Summary
SELECT 
    p.id as project_id,
    p.title as project_title,
    p.status as project_status,
    p.total_budget,
    COUNT(m.id) as milestone_count,
    SUM(m.budget) as total_milestone_budget
FROM projects p
LEFT JOIN milestones m ON p.project_id = m.project_id
WHERE p.company_id = @company_id
GROUP BY p.id, p.title, p.status, p.total_budget;

-- Test Credentials:
-- Company: company@test.com / password123
-- Freelancer: freelancer@test.com / password123

SELECT '=== TEST DATA CREATED SUCCESSFULLY ===' as Status;
SELECT 'Company Email: company@test.com' as Info;
SELECT 'Freelancer Email: freelancer@test.com' as Info;
SELECT 'Password for both: password123' as Info;
