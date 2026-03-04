# Registration Feature - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐         ┌──────────────────────┐    │
│  │   Events Page        │         │  Admin Dashboard     │    │
│  │  (FrontOffice)       │         │   (BackOffice)       │    │
│  ├──────────────────────┤         ├──────────────────────┤    │
│  │                      │         │                      │    │
│  │  [Event Card]        │         │  Filter Tabs:        │    │
│  │    ├─ Title          │         │   • All (10)         │    │
│  │    ├─ Description    │         │   • Pending (3) 🔔   │    │
│  │    ├─ Date/Time      │         │   • Approved (5)     │    │
│  │    └─ [Join Button]  │         │   • Rejected (2)     │    │
│  │         │             │         │                      │    │
│  │         ▼             │         │  [Registration List] │    │
│  │  ┌──────────────┐    │         │   ├─ User Info      │    │
│  │  │ Registration │    │         │   ├─ Event Title    │    │
│  │  │    Modal     │    │         │   ├─ Status Badge   │    │
│  │  ├──────────────┤    │         │   └─ [✓] [✗] [🗑️]  │    │
│  │  │ First Name   │    │         │                      │    │
│  │  │ Last Name    │    │         └──────────────────────┘    │
│  │  │ Email        │    │                                      │
│  │  │ [Submit]     │    │                                      │
│  │  └──────────────┘    │                                      │
│  └──────────────────────┘                                      │
│           │                                  │                 │
└───────────┼──────────────────────────────────┼─────────────────┘
            │                                  │
            ▼                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ANGULAR SERVICES                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐         ┌──────────────────────┐    │
│  │ RegistrationService  │         │    UserService       │    │
│  ├──────────────────────┤         ├──────────────────────┤    │
│  │ • createRegistration │         │ • getAllUsers        │    │
│  │ • getAllRegistrations│         │ • getUserById        │    │
│  │ • approveRegistration│         │ • createUser         │    │
│  │ • rejectRegistration │         └──────────────────────┘    │
│  │ • deleteRegistration │                                      │
│  └──────────────────────┘                                      │
│           │                                                     │
└───────────┼─────────────────────────────────────────────────────┘
            │
            │ HTTP Requests (REST API)
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SPRING BOOT BACKEND                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    CONTROLLERS                           │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  RegistrationController          UserController         │  │
│  │  ├─ POST   /api/registrations    ├─ GET  /api/users    │  │
│  │  ├─ GET    /api/registrations    ├─ POST /api/users    │  │
│  │  ├─ PUT    /{id}/approve          └─ GET  /api/users/{id}│ │
│  │  ├─ PUT    /{id}/reject                                 │  │
│  │  └─ DELETE /{id}                                        │  │
│  │           │                              │              │  │
│  └───────────┼──────────────────────────────┼──────────────┘  │
│              │                              │                 │
│              ▼                              ▼                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      SERVICES                            │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  RegistrationServiceImpl                                │  │
│  │  ├─ createRegistration()                                │  │
│  │  │   ├─ Check duplicate                                 │  │
│  │  │   ├─ Validate capacity                               │  │
│  │  │   └─ Set status = PENDING                            │  │
│  │  │                                                       │  │
│  │  ├─ approveRegistration()                               │  │
│  │  │   ├─ Check capacity                                  │  │
│  │  │   ├─ Set status = APPROVED                           │  │
│  │  │   └─ Increment currentParticipants                   │  │
│  │  │                                                       │  │
│  │  └─ rejectRegistration()                                │  │
│  │      ├─ Set status = REJECTED                           │  │
│  │      └─ Decrement counter (if was approved)             │  │
│  │           │                                              │  │
│  └───────────┼──────────────────────────────────────────────┘  │
│              │                                                 │
│              ▼                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   REPOSITORIES                           │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  RegistrationRepository    UserRepository               │  │
│  │  ├─ findByEvenementId()    ├─ findByEmail()            │  │
│  │  ├─ findByUserId()         └─ existsByEmail()          │  │
│  │  ├─ findByStatus()                                      │  │
│  │  └─ countApprovedByEvenementId()                        │  │
│  │           │                              │               │  │
│  └───────────┼──────────────────────────────┼───────────────┘  │
│              │                              │                  │
└──────────────┼──────────────────────────────┼──────────────────┘
               │                              │
               ▼                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DATABASE (MySQL)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    │
│  │    users     │    │ registrations│    │  evenements  │    │
│  ├──────────────┤    ├──────────────┤    ├──────────────┤    │
│  │ id (PK)      │◄───┤ user_id (FK) │    │ id (PK)      │    │
│  │ first_name   │    │ evenement_id │───►│ title        │    │
│  │ last_name    │    │ first_name   │    │ description  │    │
│  │ email        │    │ last_name    │    │ date         │    │
│  │ password     │    │ email        │    │ location     │    │
│  │ role         │    │ status       │    │ type         │    │
│  │ created_at   │    │ created_at   │    │ max_part...  │    │
│  │ updated_at   │    │ updated_at   │    │ current_p... │    │
│  └──────────────┘    └──────────────┘    └──────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### 1. User Registration Flow

```
┌──────┐                                                    ┌──────────┐
│ User │                                                    │ Database │
└──┬───┘                                                    └────┬─────┘
   │                                                             │
   │ 1. Click "Join" button                                     │
   ├──────────────────────────────────►                         │
   │         Open Modal                                         │
   │                                                             │
   │ 2. Fill form & Submit                                      │
   ├──────────────────────────────────►                         │
   │    POST /api/registrations                                 │
   │                                                             │
   │                                    3. Validate input        │
   │                                    ├──────────────────────► │
   │                                    │  Check duplicate       │
   │                                    │                        │
   │                                    4. Create registration   │
   │                                    │  (status = PENDING)    │
   │                                    ├──────────────────────► │
   │                                    │                        │
   │                                    5. Return success        │
   │                                    ◄──────────────────────┤ │
   │                                                             │
   │ 6. Show success message                                    │
   │◄──────────────────────────────────                         │
   │    "Waiting for approval"                                  │
   │                                                             │
   │ 7. Close modal                                             │
   │                                                             │
```

### 2. Admin Approval Flow

```
┌───────┐                                                  ┌──────────┐
│ Admin │                                                  │ Database │
└───┬───┘                                                  └────┬─────┘
    │                                                           │
    │ 1. Navigate to /backoffice/registrations                 │
    ├────────────────────────────────────►                     │
    │      GET /api/registrations                              │
    │                                                           │
    │                                      2. Fetch all         │
    │                                      ├──────────────────► │
    │                                      │                    │
    │                                      3. Return list       │
    │                                      ◄──────────────────┤ │
    │                                                           │
    │ 4. Display list with filters                             │
    │◄────────────────────────────────────                     │
    │    Show pending count (🔔 3)                             │
    │                                                           │
    │ 5. Click "Approve" button                                │
    ├────────────────────────────────────►                     │
    │    PUT /api/registrations/1/approve                      │
    │                                                           │
    │                                      6. Check capacity    │
    │                                      ├──────────────────► │
    │                                      │                    │
    │                                      7. Update status     │
    │                                      │  (APPROVED)        │
    │                                      ├──────────────────► │
    │                                      │                    │
    │                                      8. Increment counter │
    │                                      │  currentParticipants++│
    │                                      ├──────────────────► │
    │                                      │                    │
    │                                      9. Return updated    │
    │                                      ◄──────────────────┤ │
    │                                                           │
    │ 10. Refresh list                                         │
    │◄────────────────────────────────────                     │
    │     Show updated status & counter                        │
    │                                                           │
```

## Component Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                    ANGULAR APPLICATION                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FrontOffice Module                BackOffice Module       │
│  ┌─────────────────┐               ┌──────────────────┐   │
│  │ EventsComponent │               │ RegistrationsComp│   │
│  │                 │               │                  │   │
│  │  uses           │               │  uses            │   │
│  │    ▼            │               │    ▼             │   │
│  │ ┌─────────────┐ │               │ ┌──────────────┐│   │
│  │ │Registration │ │               │ │Registration  ││   │
│  │ │   Modal     │ │               │ │   Service    ││   │
│  │ │  Component  │ │               │ └──────────────┘│   │
│  │ └─────────────┘ │               │                  │   │
│  │       │         │               │                  │   │
│  │       uses      │               │                  │   │
│  │       ▼         │               │                  │   │
│  │ ┌─────────────┐ │               │                  │   │
│  │ │Registration │ │               │                  │   │
│  │ │   Service   │ │               │                  │   │
│  │ └─────────────┘ │               │                  │   │
│  └─────────────────┘               └──────────────────┘   │
│           │                                 │              │
│           └─────────────┬───────────────────┘              │
│                         │                                  │
│                    Core Module                             │
│                  ┌──────────────┐                          │
│                  │   Services   │                          │
│                  │   Models     │                          │
│                  └──────────────┘                          │
│                         │                                  │
└─────────────────────────┼──────────────────────────────────┘
                          │
                          │ HTTP
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  SPRING BOOT BACKEND                        │
└─────────────────────────────────────────────────────────────┘
```

## Status State Machine

```
┌─────────────────────────────────────────────────────────┐
│              Registration Status Flow                   │
└─────────────────────────────────────────────────────────┘

                    ┌─────────┐
                    │ PENDING │ ◄── Initial state
                    └────┬────┘
                         │
            ┌────────────┼────────────┐
            │                         │
            ▼                         ▼
      ┌──────────┐              ┌──────────┐
      │ APPROVED │              │ REJECTED │
      └────┬─────┘              └──────────┘
           │
           │ Can transition to
           │
           ▼
      ┌──────────┐
      │ REJECTED │
      └──────────┘

Actions on state change:
• PENDING → APPROVED: currentParticipants++
• APPROVED → REJECTED: currentParticipants--
• Any → DELETED: currentParticipants-- (if was APPROVED)
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                             │
├─────────────────────────────────────────────────────────┤
│ • Angular 18                                            │
│ • TypeScript                                            │
│ • SCSS                                                  │
│ • Reactive Forms                                        │
│ • RxJS                                                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    BACKEND                              │
├─────────────────────────────────────────────────────────┤
│ • Spring Boot 3.2.0                                     │
│ • Java 17                                               │
│ • Spring Data JPA                                       │
│ • Hibernate                                             │
│ • Jakarta Validation                                    │
│ • Lombok                                                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    DATABASE                             │
├─────────────────────────────────────────────────────────┤
│ • MySQL 8.0+                                            │
│ • Port: 3307 (XAMPP)                                    │
└─────────────────────────────────────────────────────────┘
```

This architecture provides a clean separation of concerns, scalability, and maintainability for the registration feature.
