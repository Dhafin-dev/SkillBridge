<div align="center">

# 🎓 SkillBridge Academic Hub

**An Intelligent Peer Mentorship & Academic Project Collaboration Platform**

Bridging the gap between university theory and production-grade engineering through dynamic skill matching, peer mentoring, and team discovery.

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## 📌 Overview

**SkillBridge** is a modern fullstack web platform engineered to connect university students seeking specific technical guidance with verified peer mentors, tutors, and capstone project collaborators. 

Built with a **Domain-Driven, Layered Architecture** (Controller-Service-Repository pattern) and modern React 19 micro-interactions, SkillBridge eliminates fragmented group chats and provides structured discovery, calendar coordination, and milestone tracking.

---

## ✨ Key Features

- 🎯 **Dynamic Skill Taxonomy & Profiling**: Comprehensive skill tagging (Languages, Frameworks, Cloud, AI/ML) with proficiency tiers and verified GitHub/portfolio links.
- 🤖 **Intelligent Matchmaking Engine**: Ranks prospective mentors and study partners based on skill overlap, availability, and learning preferences.
- 📅 **Mentorship Booking & Session Management**: Seamless scheduling for 1-on-1 sessions with agenda tracking, meeting links, and feedback loops.
- 🚀 **Project Recruitment Board**: Post capstone, competition, or hackathon project vacancies with exact required skill tags and review applicants in one click.
- 🛡️ **Enterprise-Grade Security**: Strict Zod schema validation, JWT authentication with HTTP-only cookies, password hashing with Bcrypt, and parameterized Prisma queries.

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
│                 PostgreSQL / MySQL (Laragon)                │
└─────────────────────────────────────────────────────────────┘
```

### Stack Breakdown

| Layer | Technologies |
| :--- | :--- |
| **Frontend Client** | React 19, TypeScript, Vite, Tailwind CSS v4, Motion (Framer), TanStack Query, Lucide Icons |
| **Backend Services** | Node.js, Express 5, TypeScript (TSX runtime), Zod, Multer |
| **Data & ORM** | Prisma ORM, PostgreSQL / MySQL |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js password hashing |
| **AI Integration** | Google GenAI SDK (Semantic skill matching & recommendation) |

---

## 📂 Project Structure

```bash
SkillBridge/
├── backend/                   # Express 5 REST API
│   ├── prisma/                # Prisma schema, migrations, and seed scripts
│   └── src/
│       ├── config/            # Environment & database configuration
│       ├── controllers/       # HTTP Request & Response handlers
│       ├── middleware/        # JWT auth, error handlers, upload middleware
│       ├── repositories/      # Database access layer (Prisma queries)
│       ├── routes/            # REST API route definitions
│       ├── schemas/           # Zod validation schemas
│       ├── services/          # Business logic layer
│       └── utils/             # Helper utilities & custom errors
│
├── src/                       # React 19 Frontend Application
│   ├── app/                   # Root application providers & routing
│   ├── modules/               # Feature-based components (Auth, Mentors, Projects)
│   └── shared/                # Reusable UI components, hooks, and design tokens
│
├── DESIGN.md                  # Material 3 inspired Design Token System
└── package.json               # Frontend dependencies & workspace scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm` or `pnpm`
- **Database**: PostgreSQL or MySQL (e.g., via Laragon / Docker)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Dhafin-dev/SkillBridge.git
cd SkillBridge
```

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/skillbridge?schema=public"
JWT_SECRET="your-super-secure-jwt-secret-key"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:5173"
```

**Frontend (`.env`):**
```env
VITE_API_BASE_URL="http://localhost:5000/api"
```

---

### 3. Database Setup & Seeding

```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma db seed
```

---

### 4. Run Development Servers

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Server running at http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
# In the project root
npm install
npm run dev
# Web application live at http://localhost:5173
```

---

## 📡 REST API Reference

### Authentication
- `POST /api/auth/register` — Register a new student/mentor profile.
- `POST /api/auth/login` — Authenticate and receive JWT session.
- `GET  /api/auth/me` — Retrieve currently authenticated user context.

### Mentors & Skills
- `GET  /api/mentors` — List mentors with filter (skill, rating, availability).
- `GET  /api/mentors/:id` — Get detailed mentor profile and available slots.
- `POST /api/skills/user` — Update active user skill competencies.

### Sessions & Bookings
- `POST /api/sessions/book` — Schedule a mentorship session.
- `GET  /api/sessions/my` — Fetch upcoming and completed mentorship bookings.
- `PUT  /api/sessions/:id/status` — Accept, reschedule, or complete a session.

### Project Collaboration Board
- `GET  /api/projects` — Explore open capstone & hackathon projects.
- `POST /api/projects` — Publish a new project team vacancy.
- `POST /api/projects/:id/apply` — Apply for a project role with skill profile.

---

## 🧪 Quality & Engineering Standards

- **Strict Type Safety**: End-to-end TypeScript enforcement across client and server.
- **Fail-Fast Validation**: Incoming payloads are validated at the route boundary with Zod schemas.
- **Separation of Concerns**: Controllers never touch the database directly; all business rules live in isolated services.
- **Design Tokens**: Standardized UI variables documented in `DESIGN.md` for consistent theming and micro-interactions.

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
Crafted with 💡 and engineering precision by <b>Ahmad Dhafin Al Farisy</b>
</div>
