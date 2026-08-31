# SkillBridge — System Architecture & Technical Specifications

**Document Version:** 1.0.0  
**Project:** SkillBridge Academic & Industry Collaboration Hub  
**Author:** Ahmad Dhafin Al Farisy  
**Target Environment:** Node.js (Express 5) · React 19 · MySQL/PostgreSQL · Prisma ORM  

---

## 1. System Architecture Overview

SkillBridge facilitates end-to-end collaboration between **Students** (seeking industry experience) and **UMKM / Business Owners** (seeking technical talent). 

```mermaid
graph TD
    Client["React 19 Frontend Client (Vite + Tailwind v4)"]
    Gateway["Express 5 REST API Gateway & Middleware"]
    Auth["JWT Authentication & RBAC Filter"]
    Validation["Zod Schema Validation Layer"]
    
    subgraph Core Services
        UserService["User & Profile Service"]
        ProjectService["Project & Category Service"]
        MatchingEngine["AI Matching & Scoring Engine"]
        WorkspaceService["Workspace & Task Service"]
        MsgService["Messaging & Notification Service"]
    end
    
    subgraph Data Access Layer
        Prisma["Prisma ORM (Typed Queries)"]
        Database[("MySQL / PostgreSQL Database")]
    end

    Client -->|HTTP/REST| Gateway
    Gateway --> Auth
    Auth --> Validation
    Validation --> UserService
    Validation --> ProjectService
    Validation --> MatchingEngine
    Validation --> WorkspaceService
    Validation --> MsgService
    
    UserService --> Prisma
    ProjectService --> Prisma
    MatchingEngine --> Prisma
    WorkspaceService --> Prisma
    MsgService --> Prisma
    
    Prisma --> Database
```

---

## 2. Business Process Model & Notation (BPMN)

The complete lifecycle from Project Creation to Completion and Review:

```mermaid
flowchart TD
    Start([UMKM / Business Owner]) --> CreateProj[1. Create Project Draft with Skill Tags & Deliverables]
    CreateProj --> PublishProj[2. Publish Project to Marketplace]
    
    Student([Student / Learner]) --> Browse[3. Browse Marketplace / AI Recommended Projects]
    Browse --> Apply[4. Submit Application with Profile & Portfolio]
    
    PublishProj --> RecvApp[5. UMKM Receives Application]
    Apply --> RecvApp
    
    RecvApp --> Decision{UMKM Reviews Student?}
    Decision -->|Reject| NotifyReject[Notify Student: Application Rejected]
    NotifyReject --> EndReject([End Application])
    
    Decision -->|Accept| ProvisionWS[6. System Provisions Shared Workspace]
    ProvisionWS --> ActiveWS[7. Workspace Active: Create Milestone Tasks]
    
    ActiveWS --> WorkInProgress[8. Student Works & Marks Tasks Completed]
    WorkInProgress --> SubmitDeliverables[9. Submit Final Project Deliverables]
    
    SubmitDeliverables --> ReviewWork{UMKM Approves Deliverables?}
    ReviewWork -->|Needs Revision| RequestRevision[Request Revisions & Reopen Task]
    RequestRevision --> WorkInProgress
    
    ReviewWork -->|Approved| CompleteProject[10. Mark Workspace & Project Completed]
    CompleteProject --> MutualReview[11. Submit 2-Way Review & Update Portfolio Score]
    MutualReview --> EndSuccess([Project Successfully Finished])
```

---

## 3. Sequence Diagrams

### 3.1 Sequence 1: Project Application & Workspace Provisioning

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant Client as Frontend (React 19)
    participant API as Express API Router
    participant Service as ApplicationService
    participant Repo as ApplicationRepository
    participant DB as MySQL (Prisma)
    actor UMKM

    Student->>Client: Click "Apply to Project"
    Client->>API: POST /api/projects/:id/apply (JWT Bearer)
    API->>Service: applyToProject(studentId, projectId)
    Service->>Repo: checkExistingApplication(studentId, projectId)
    Repo->>DB: SELECT * FROM ProjectApplication WHERE ...
    DB-->>Repo: null (No duplicate)
    Service->>Repo: createApplication(status: "PENDING")
    Repo->>DB: INSERT INTO ProjectApplication ...
    DB-->>Repo: applicationRecord
    Service-->>API: 201 Created
    API-->>Client: Application Submitted Notification

    UMKM->>Client: View Project Applications
    Client->>API: GET /api/projects/:id/applications
    API-->>Client: List of Candidates with Match Score
    UMKM->>Client: Click "Accept Application"
    Client->>API: PATCH /api/applications/:id/accept
    API->>Service: acceptApplication(applicationId)
    Service->>Repo: updateApplicationStatus("ACCEPTED")
    Service->>Repo: createWorkspace(projectId, studentId, umkmId)
    Repo->>DB: INSERT INTO Workspace (status: "ACTIVE", progress: 0)
    Repo->>DB: INSERT INTO Notification (Student, "Application Accepted!")
    DB-->>Service: Workspace Created
    Service-->>API: 200 OK
    API-->>Client: Workspace Initialized & Live
```

---

### 3.2 Sequence 2: Task Milestone Execution & Progress Tracking

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant UI as Workspace UI
    participant API as Workspace Controller
    participant WService as WorkspaceService
    participant DB as Database (Prisma)
    actor UMKM

    Student->>UI: Toggle Task Checklist item [✓]
    UI->>API: PATCH /api/workspaces/:id/tasks/:taskId (completed: true)
    API->>WService: updateTaskStatus(taskId, completed)
    WService->>DB: UPDATE ProjectTask SET completed = true
    WService->>WService: recalculateProgressPercentage(workspaceId)
    WService->>DB: UPDATE Workspace SET progressPercent = newPercentage
    DB-->>WService: Updated Workspace Entity
    WService-->>API: { progressPercent: 75, task: updatedTask }
    API-->>UI: Real-time UI Update
    WService->>DB: INSERT INTO Notification (UMKM, "Task completed by student")
    DB-->>UMKM: Push Notification in Dashboard
```

---

## 4. Entity Relationship Diagram (ERD / RDBMS Schema)

```mermaid
erDiagram
    User ||--o| StudentProfile : "has"
    User ||--o| UmkmProfile : "has"
    User ||--o{ Project : "owns (UMKM)"
    User ||--o{ ProjectApplication : "applies (Student)"
    User ||--o{ Workspace : "participates"
    User ||--o{ Message : "sends/receives"
    User ||--o{ Notification : "receives"
    User ||--o{ Review : "writes/receives"
    User ||--o{ AuditLog : "administers"

    Category ||--o{ Project : "classifies"
    Project ||--o{ ProjectApplication : "receives"
    Project ||--o{ Workspace : "instantiates"
    Project ||--o{ Review : "evaluated_in"

    Workspace ||--o{ ProjectTask : "contains"
    Workspace ||--o{ Message : "channels"

    User {
        string id PK
        string email UK
        string passwordHash
        string name
        string role
        string avatar
        string bio
        boolean isVerified
        int tokenVersion
        datetime createdAt
        datetime updatedAt
    }

    StudentProfile {
        string id PK
        string userId FK, UK
        string institution
        int portfolioScore
        int completedProjectsCount
        text skills
        text certificates
        datetime createdAt
        datetime updatedAt
    }

    UmkmProfile {
        string id PK
        string userId FK, UK
        string companyName
        string companyLogo
        string industry
        string location
        string website
        string businessScale
        datetime createdAt
        datetime updatedAt
    }

    Category {
        string id PK
        string name UK
        string description
        datetime createdAt
        datetime updatedAt
    }

    Project {
        string id PK
        string title
        string categoryId FK
        string level
        string duration
        string stipend
        text description
        text objectives
        text deliverables
        text tags
        string status
        datetime deadline
        string ownerId FK
        datetime createdAt
        datetime updatedAt
    }

    ProjectApplication {
        string id PK
        string projectId FK
        string studentId FK
        string status
        datetime appliedAt
    }

    Workspace {
        string id PK
        string projectId FK
        string studentId FK
        string umkmId FK
        string status
        int progressPercent
        datetime createdAt
        datetime updatedAt
    }

    ProjectTask {
        string id PK
        string workspaceId FK
        string title
        boolean completed
        datetime dueDate
        string assignedTo
        datetime createdAt
        datetime updatedAt
    }

    Message {
        string id PK
        string text
        string senderId FK
        string receiverId FK
        string workspaceId FK
        datetime createdAt
    }

    Review {
        string id PK
        string projectId FK
        string authorId FK
        string targetId FK
        int rating
        string comment
        datetime createdAt
    }

    Notification {
        string id PK
        string userId FK
        string type
        string title
        string message
        boolean isRead
        datetime createdAt
    }

    AuditLog {
        string id PK
        string adminId FK
        string action
        string entityType
        string entityId
        string details
        datetime createdAt
    }
```

---

## 5. Data Dictionary

### Core Tables Summary

| Table | Description | Key Relations |
| :--- | :--- | :--- |
| **`User`** | Central identity table holding credentials and system roles (`STUDENT`, `UMKM`, `ADMIN`). | 1:1 with `StudentProfile` / `UmkmProfile`, 1:N with `Project`, `Workspace`. |
| **`StudentProfile`** | Academic credentials, portfolio scores, and JSON-indexed skill tags. | Belongs to `User` (`userId` ON DELETE CASCADE). |
| **`UmkmProfile`** | Business metadata, industry, company verification, and location. | Belongs to `User` (`userId` ON DELETE CASCADE). |
| **`Project`** | Available academic & business collaboration opportunities. | Belongs to `Category` and `User` (owner). Has many `Applications` and `Workspaces`. |
| **`Workspace`** | The active execution room instantiated once an application is accepted. | Joins `Project`, `Student (User)`, and `UMKM (User)`. |
| **`ProjectTask`** | Granular milestones and progress items inside a Workspace. | Belongs to `Workspace` (`workspaceId`). |
| **`Message`** | Real-time chat messages exchanged within workspaces or direct threads. | Linked to `senderId`, `receiverId`, and optional `workspaceId`. |
| **`Review`** | 2-way evaluation and rating submitted at project completion. | Links `Project`, `authorId`, and `targetId`. |

---

## 6. State Transition Models

### 6.1 Project State Machine
```
[DRAFT] ──(Publish)──▶ [PUBLISHED] ──(Student Match & Workspace Active)──▶ [ACTIVE] ──(Deliverables Approved)──▶ [COMPLETED]
```

### 6.2 Application State Machine
```
[PENDING] ──┬──(UMKM Accept)──▶ [ACCEPTED] ──▶ (Spawns Workspace)
            └──(UMKM Reject)──▶ [REJECTED]
```

---

## 7. Security Architecture

1. **Authentication (JWT)**: Stateless token issuance signed with HMAC-SHA256. Tokens embed `userId` and `role`.
2. **Authorization (RBAC)**: Role-based route guards enforce role capabilities (e.g. only `UMKM` can publish projects; only `STUDENT` can apply).
3. **Input Sanitization**: Zero-trust API perimeter where every request body is validated via strict `zod` schemas before touching services.
4. **Data Privacy**: Cascading deletes on profiles ensure student and UMKM data integrity upon account removal.
