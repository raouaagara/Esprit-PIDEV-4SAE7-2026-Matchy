# API Testing Guide - Registration Feature

## Quick Test Sequence

### 1. Create a User
```bash
curl -X POST http://localhost:8081/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@test.com\",\"password\":\"password123\"}"
```

Expected Response:
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@test.com",
  "role": "USER",
  "createdAt": "2026-03-03T...",
  "updatedAt": "2026-03-03T..."
}
```

### 2. Create an Event (if needed)
```bash
curl -X POST http://localhost:8081/api/evenements ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Spring Boot Workshop\",\"description\":\"Learn Spring Boot\",\"date\":\"2026-03-15T14:00:00\",\"location\":\"Online\",\"type\":\"WORKSHOP\",\"maxParticipants\":50}"
```

### 3. Create a Registration
```bash
curl -X POST http://localhost:8081/api/registrations ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@test.com\",\"userId\":1,\"evenementId\":1}"
```

Expected Response:
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@test.com",
  "userId": 1,
  "userFullName": "John Doe",
  "evenementId": 1,
  "evenementTitle": "Spring Boot Workshop",
  "status": "PENDING",
  "createdAt": "2026-03-03T...",
  "updatedAt": "2026-03-03T..."
}
```

### 4. Get All Registrations
```bash
curl http://localhost:8081/api/registrations
```

### 5. Get Pending Registrations
```bash
curl http://localhost:8081/api/registrations/status/PENDING
```

### 6. Approve Registration
```bash
curl -X PUT http://localhost:8081/api/registrations/1/approve
```

Expected Response:
```json
{
  "id": 1,
  "status": "APPROVED",
  ...
}
```

### 7. Verify Event Counter Updated
```bash
curl http://localhost:8081/api/evenements/1
```

Check that `currentParticipants` increased by 1.

### 8. Get Approved Count
```bash
curl http://localhost:8081/api/registrations/evenement/1/approved-count
```

Expected Response: `1`

### 9. Reject Registration
```bash
curl -X PUT http://localhost:8081/api/registrations/1/reject
```

### 10. Delete Registration
```bash
curl -X DELETE http://localhost:8081/api/registrations/1
```

## Test Scenarios

### Scenario 1: Duplicate Registration Prevention
```bash
# Create first registration
curl -X POST http://localhost:8081/api/registrations ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@test.com\",\"userId\":1,\"evenementId\":1}"

# Try to create duplicate (should fail)
curl -X POST http://localhost:8081/api/registrations ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@test.com\",\"userId\":1,\"evenementId\":1}"
```

Expected: Error message "User already registered for this event"

### Scenario 2: Capacity Validation
```bash
# Create event with max 2 participants
curl -X POST http://localhost:8081/api/evenements ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Small Workshop\",\"maxParticipants\":2,...}"

# Create and approve 2 registrations
# Try to approve 3rd registration (should fail)
```

Expected: Error message "Event has reached maximum capacity"

### Scenario 3: Filter by Event
```bash
# Get all registrations for event ID 1
curl http://localhost:8081/api/registrations/evenement/1
```

### Scenario 4: Filter by User
```bash
# Get all registrations for user ID 1
curl http://localhost:8081/api/registrations/user/1
```

## PowerShell Commands (Alternative)

### Create User
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/users" -Method Post -ContentType "application/json" -Body '{"firstName":"John","lastName":"Doe","email":"john@test.com","password":"password123"}'
```

### Create Registration
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/registrations" -Method Post -ContentType "application/json" -Body '{"firstName":"John","lastName":"Doe","email":"john@test.com","userId":1,"evenementId":1}'
```

### Get All Registrations
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/registrations" -Method Get
```

### Approve Registration
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/registrations/1/approve" -Method Put
```

## Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Matchy Registration API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create User",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@test.com\",\"password\":\"password123\"}"
        },
        "url": "http://localhost:8081/api/users"
      }
    },
    {
      "name": "Create Registration",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@test.com\",\"userId\":1,\"evenementId\":1}"
        },
        "url": "http://localhost:8081/api/registrations"
      }
    },
    {
      "name": "Get All Registrations",
      "request": {
        "method": "GET",
        "url": "http://localhost:8081/api/registrations"
      }
    },
    {
      "name": "Approve Registration",
      "request": {
        "method": "PUT",
        "url": "http://localhost:8081/api/registrations/1/approve"
      }
    }
  ]
}
```

## Expected Database State After Tests

### Users Table
| id | first_name | last_name | email | role |
|----|------------|-----------|-------|------|
| 1 | John | Doe | john@test.com | USER |

### Registrations Table
| id | first_name | last_name | email | user_id | evenement_id | status |
|----|------------|-----------|-------|---------|--------------|--------|
| 1 | John | Doe | john@test.com | 1 | 1 | APPROVED |

### Evenements Table
| id | title | current_participants | max_participants |
|----|-------|---------------------|------------------|
| 1 | Spring Boot Workshop | 1 | 50 |

## Troubleshooting

### Error: Connection refused
- Ensure backend is running on port 8081
- Check if MySQL is running (XAMPP)

### Error: User not found
- Create user first using the Create User endpoint
- Verify user ID in database

### Error: Event not found
- Create event first using the Create Event endpoint
- Verify event ID in database

### Error: Already registered
- This is expected behavior for duplicate prevention
- Use different user or event ID

## Browser Testing

Open these URLs in your browser:

- All registrations: http://localhost:8081/api/registrations
- Pending registrations: http://localhost:8081/api/registrations/status/PENDING
- Event 1 registrations: http://localhost:8081/api/registrations/evenement/1
- User 1 registrations: http://localhost:8081/api/registrations/user/1
