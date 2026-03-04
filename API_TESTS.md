# Matchy API Testing Guide

## Quick API Tests

Use these curl commands or import into Postman to test the backend API.

### 1. Register a Company User

```bash
curl -X POST http://localhost:9090/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "company@test.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "Company",
    "userType": "COMPANY",
    "companyName": "Test Corporation",
    "phone": "+216 12345678",
    "address": "Tunis, Tunisia"
  }'
```

### 2. Register a Freelancer User

```bash
curl -X POST http://localhost:9090/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "freelancer@test.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "FREELANCER",
    "expertise": "Full Stack Developer",
    "hourlyRate": 50.0,
    "phone": "+216 98765432"
  }'
```

### 3. Login

```bash
curl -X POST http://localhost:9090/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "company@test.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "id": 1,
  "email": "company@test.com",
  "firstName": "Test",
  "lastName": "Company",
  "userType": "COMPANY",
  "companyName": "Test Corporation"
}
```

Save the token for subsequent requests!

### 4. Create a Project

```bash
curl -X POST http://localhost:9090/api/projects/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "E-Commerce Website",
    "description": "Build a modern e-commerce platform with React and Node.js",
    "totalBudget": 5000.0,
    "deadline": "2025-06-30",
    "companyId": 1
  }'
```

### 5. Get Company Projects

```bash
curl -X GET http://localhost:9090/api/projects/company/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 6. Create a Milestone

```bash
curl -X POST http://localhost:9090/api/milestones/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "projectId": 1,
    "title": "Frontend Development",
    "description": "Complete the React frontend with all pages",
    "budget": 2000.0,
    "deadline": "2025-04-30"
  }'
```

### 7. Get Project Milestones

```bash
curl -X GET http://localhost:9090/api/milestones/project/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 8. Update Project Status

```bash
curl -X PUT http://localhost:9090/api/projects/update/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "IN_PROGRESS"
  }'
```

### 9. Update Milestone Status

```bash
curl -X PUT http://localhost:9090/api/milestones/update/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "COMPLETED"
  }'
```

### 10. Delete a Milestone

```bash
curl -X DELETE http://localhost:9090/api/milestones/delete/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 11. Delete a Project

```bash
curl -X DELETE http://localhost:9090/api/projects/delete/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Matchy API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register Company",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"company@test.com\",\n  \"password\": \"password123\",\n  \"firstName\": \"Test\",\n  \"lastName\": \"Company\",\n  \"userType\": \"COMPANY\",\n  \"companyName\": \"Test Corporation\"\n}"
            },
            "url": {"raw": "http://localhost:9090/api/auth/register"}
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"company@test.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {"raw": "http://localhost:9090/api/auth/login"}
          }
        }
      ]
    },
    {
      "name": "Projects",
      "item": [
        {
          "name": "Create Project",
          "request": {
            "method": "POST",
            "header": [
              {"key": "Content-Type", "value": "application/json"},
              {"key": "Authorization", "value": "Bearer {{token}}"}
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"E-Commerce Website\",\n  \"description\": \"Build a modern e-commerce platform\",\n  \"totalBudget\": 5000.0,\n  \"deadline\": \"2025-06-30\",\n  \"companyId\": 1\n}"
            },
            "url": {"raw": "http://localhost:9090/api/projects/create"}
          }
        },
        {
          "name": "Get Company Projects",
          "request": {
            "method": "GET",
            "header": [{"key": "Authorization", "value": "Bearer {{token}}"}],
            "url": {"raw": "http://localhost:9090/api/projects/company/1"}
          }
        }
      ]
    }
  ]
}
```

## Testing Workflow

1. **Register** a company user
2. **Login** and save the token
3. **Create** a project
4. **Create** milestones for the project
5. **View** projects in the Angular app at `http://localhost:4200/backoffice/projects`

## Common Issues

### 401 Unauthorized
- Token expired or invalid
- Login again to get a new token

### 403 Forbidden
- CORS issue
- Check backend CORS configuration

### 404 Not Found
- Backend not running
- Wrong endpoint URL

### 500 Internal Server Error
- Database connection issue
- Check MySQL is running
- Verify database credentials in `application.properties`
