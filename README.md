<div align="center">

# 🎓 SkillBridge Hub

**An Intelligent Academic & UMKM / Industry Project Collaboration Platform**

Bridging the gap between university students seeking production-grade experience and UMKM / MSMEs seeking digital talent through dynamic skill matchmaking, collaborative workspaces, and verified portfolio building.

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## 📌 Overview

**SkillBridge** is a modern fullstack web platform engineered to connect university students seeking real-world industry experience with UMKM (Micro, Small, and Medium Enterprises) and business owners needing technical solutions (web development, mobile apps, UI/UX design, branding, and digital marketing).

Built with a **Domain-Driven, Layered Architecture** (Controller-Service-Repository pattern) on the backend and modern React 19 on the frontend, SkillBridge streamlines the entire lifecycle: project discovery, AI-assisted applicant matchmaking, interactive shared task workspaces, milestone progress tracking, real-time messaging, and mutual two-way reviews.

> 📖 **Deep Dive Documentation**: For full technical specifications, BPMN workflows, sequence diagrams, and entity-relationship models, see [`docs/SYSTEM_ARCHITECTURE.md`](docs/SYSTEM_ARCHITECTURE.md).

---

## ✨ Key Features & User Roles

### 🎓 1. Student / Talent Portal
- **Skill Taxonomy & Verification**: Showcase verified technical skills, certifications, and portfolio score.
- **Project Marketplace**: Browse and filter curated industry projects by category, difficulty level, duration, and stipend.
- **1-Click Application**: Apply with tailored pitch and direct profile link.
- **Interactive Project Workspace**: Real-time task checklist, milestone completion, progress percentage tracking, and submission of final deliverables.

### 🏢 2. UMKM / Business Owner Portal
- **Project Brief Publishing**: Create structured project briefs with objectives, deliverables, required skill tags, duration, and stipends.
- **AI-Powered Matchmaking**: Evaluate candidate suitability with AI-calculated match percentages, skill overlap rationales, and recommended next steps via Google Gemini 2.5.
- **Applicant Management**: One-click review, accept, or reject candidate applications with automatic notification dispatch.
- **Project Workspace Oversight**: Track student milestone progress, request deliverable revisions, and complete projects with 2-way star ratings and reviews.

### 🛡️ 3. Admin Governance & Oversight Center
- **System Analytics**: Real-time KPI monitoring (total users, active projects, workspaces, system match rates).
- **Project & Category Moderation**: Manage categories, publish/unpublish project listings.
- **Verification Center**: Review and verify UMKM business identities and student credentials.
- **Security Audit Logs**: Track administrative actions and system events.

### 💬 4. Real-Time Collaboration & Messaging
- **Contextual In-App Chat**: Direct messaging between students and project owners linked to active workspaces.
- **Instant Notifications**: Automated alerts for application status changes, workspace updates, and invitations.

---

## 🏗️ System Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    SkillBridge Frontend                     │
│    React 19 · Vite · TypeScript · Tailwind v4 · Motion      │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST API / JSON
┌──────────────────────────────▼──────────────────────────────┐
│                    SkillBridge Backend API                  │
│    Express 5 · TypeScript · Zod Validation · JWT Auth       │
├─────────────────────────────────────────────────────────────┤
│  [ Controllers ] ──▶ [ Services ] ──▶ [ Repositories ]      │
└──────────────────────────────┬──────────────────────────────┘
                               │ Prisma ORM
┌──────────────────────────────▼──────────────────────────────┐
│                  Relational Database Engine                 │
│              MySQL (Laragon/Local) / PostgreSQL             │
└─────────────────────────────────────────────────────────────┘
```

### Stack Breakdown

| Layer | Technologies |
| :--- | :--- |
| **Frontend Client** | React 19, TypeScript, Vite, Tailwind CSS v4, Motion (Framer), TanStack Query, Lucide Icons, React Router v7 |
| **Backend API** | Node.js, Express 5, TypeScript (TSX runtime), Zod, Multer, Bcrypt.js, JSON Web Tokens |
| **Data & ORM** | Prisma ORM 5.22, MySQL / PostgreSQL |
| **AI Integration** | Google GenAI SDK (`@google/genai` Gemini 2.5 Flash) |
| **Architecture** | Layered Controller-Service-Repository Pattern, Fail-Fast Zod Schema Boundary Validation |

---

## 📂 Project Structure

```bash
SkillBridge/
├── backend/                   # Express 5 REST API
│   ├── prisma/                # Prisma schema, migrations, and seed scripts
│   └── src/
│       ├── config/            # Environment & database configuration
│       ├── controllers/       # HTTP Request & Response handlers
│       ├── middleware/        # JWT auth, error handlers, rate limiting, upload
│       ├── repositories/      # Database access layer (Prisma queries)
│       ├── routes/            # REST API route definitions
│       ├── schemas/           # Zod validation schemas
│       ├── services/          # Business logic layer
│       └── utils/             # Helper utilities & custom errors
│
├── docs/                      # Architectural & System Documentation
│   └── SYSTEM_ARCHITECTURE.md # BPMN workflows, sequence diagrams, ERD
│
├── src/                       # React 19 Frontend Application
│   ├── app/                   # Root application providers, router & auth guards
│   ├── modules/               # Feature-based domain modules
│   │   ├── admin/             # Admin dashboard, verifications, analytics
│   │   ├── auth/              # Login, register, password recovery
│   │   ├── public/            # Landing page, global search, project market
│   │   ├── student/           # Student dashboard & project workspace
│   │   ├── umkm/              # UMKM dashboard, project creation, talent search
│   │   ├── user/              # Profile, settings, chat channels
│   │   └── workspace/         # Shared project task workspace & milestones
│   └── shared/                # UI components, layout templates, hooks & services
│
├── DESIGN.md                  # Material 3 inspired Design Token System
├── server.ts                  # Integrated Vite + AI Matchmaker Dev Server
└── package.json               # Frontend dependencies & workspace scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm` or `pnpm`
- **Database**: MySQL (e.g. via Laragon, XAMPP, or Docker) or PostgreSQL

---

### 1. Clone the Repository
```bash
git clone https://github.com/Dhafin-dev/SkillBridge.git
cd SkillBridge
```

---

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
DATABASE_URL="mysql://root:@localhost:3306/skillbridge"
JWT_SECRET="skillbridge_super_secret_jwt_key_at_least_32_characters_long"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:3000,http://localhost:5173"
NODE_ENV="development"
```

**Frontend (`.env`):**
```env
VITE_API_BASE_URL="http://localhost:5000/api"
GEMINI_API_KEY="your-gemini-api-key-optional"
```

---

### 3. Database Setup & Seeding

```bash
cd backend
npm install

# Push schema directly to MySQL database
npx prisma db push

# (Optional) Seed fixture users (Students, UMKMs, Admin) and mock projects
npx prisma db seed
```

---

### 4. Run Development Servers

**Terminal 1 — Backend API:**
```bash
cd backend
npm run dev
# Express API live at http://localhost:5000
```

**Terminal 2 — Frontend Application:**
```bash
# In the project root
npm install
npm run dev
# Web application live at http://localhost:3000 (or http://localhost:5173)
```

---

## 📡 REST API Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register student or UMKM account | No |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT token | No |
| `GET` | `/api/auth/me` | Retrieve authenticated user context | Yes |
| `POST` | `/api/auth/forgot-password` | Send password reset token | No |
| `POST` | `/api/auth/reset-password` | Reset password using token | No |

### 🚀 Projects & Applications (`/api/projects`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/projects` | List all published projects with filters | No |
| `POST` | `/api/projects` | Create a new project vacancy | Yes (`UMKM`) |
| `GET` | `/api/projects/:id` | Get project details (and applications if owner) | Optional |
| `PATCH` | `/api/projects/:id` | Update project brief & status | Yes (`UMKM`/`ADMIN`) |
| `POST` | `/api/projects/:id/applications` | Submit application to project | Yes (`STUDENT`) |
| `POST` | `/api/projects/:id/applications/:studentId/accept` | Accept candidate & spawn workspace | Yes (`UMKM`) |
| `POST` | `/api/projects/:id/applications/:studentId/reject` | Reject application | Yes (`UMKM`) |
| `POST` | `/api/projects/:id/complete` | Mark project completed with 2-way review | Yes (`UMKM`) |

### 💼 Shared Workspaces (`/api/workspaces`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/workspaces/project/:projectId` | Fetch workspace tasks & progress | Yes |
| `POST` | `/api/workspaces/:workspaceId/tasks` | Add new milestone task | Yes |
| `PATCH` | `/api/workspaces/:workspaceId/tasks/:taskId` | Toggle task completion status | Yes |
| `DELETE` | `/api/workspaces/:workspaceId/tasks/:taskId` | Delete milestone task | Yes |
| `PATCH` | `/api/workspaces/:workspaceId/progress` | Update workspace progress percentage | Yes |

### 👥 Users & Talent Discovery (`/api/users`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/students/recommended` | Discover student talent & portfolio scores | Optional |
| `GET` | `/api/users/:id` | Retrieve public student / UMKM profile | No |
| `PATCH` | `/api/users/me` | Update active user profile details | Yes |
| `PATCH` | `/api/users/me/password` | Change user password | Yes |
| `POST` | `/api/users/:id/invite` | Invite student talent to a project | Yes (`UMKM`/`ADMIN`) |

### 💬 Chat & Notifications (`/api/chats`, `/api/notifications`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/chats/conversations` | List active conversations | Yes |
| `GET` | `/api/chats/context/:id` | Get message history with a user/workspace | Yes |
| `POST` | `/api/chats/:id/messages` | Send message to target participant | Yes |
| `GET` | `/api/notifications` | Retrieve unread & past notifications | Yes |
| `PATCH` | `/api/notifications/read-all` | Mark all notifications as read | Yes |

### 🛡️ Admin Management (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/stats` | Platform analytics & aggregate KPIs | Yes (`ADMIN`) |
| `GET` | `/api/admin/users` | List and filter all platform users | Yes (`ADMIN`) |
| `GET` | `/api/admin/projects` | Moderate and manage project listings | Yes (`ADMIN`) |
| `GET` | `/api/admin/verifications` | Review pending verification submissions | Yes (`ADMIN`) |
| `POST` | `/api/admin/verifications/:id/approve` | Approve student/UMKM verification | Yes (`ADMIN`) |

---

## 🧪 Quality & Engineering Standards

- **Strict Type Safety**: 100% TypeScript coverage on frontend and backend (`npm run lint`).
- **Fail-Fast Boundary Validation**: All incoming REST payloads validated at route boundaries with Zod schemas.
- **Layered Architecture**: Strict separation of concerns (Routes → Controllers → Services → Repositories → Prisma).
- **Defensive Security**: Rate limiting on authentication routes, password hashing with Bcrypt, role-based access control (RBAC), and parameterized SQL queries via Prisma.
- **Design Tokens**: Standardized CSS tokens and Material 3 design philosophy documented in `DESIGN.md`.

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
Crafted with 💡 and engineering precision by <b>Ahmad Dhafin Al Farisy</b>
</div>
