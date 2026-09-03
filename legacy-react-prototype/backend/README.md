# SkillBridge Backend API

Backend REST API for SkillBridge built with Express, TypeScript, Prisma ORM, and MySQL.

---

## Getting Started

### 1. Requirements
- Node.js >= 18
- MySQL Server (e.g. via Laragon, Docker, or XAMPP)

### 2. Environment Setup
Copy `.env.example` to `.env` and fill in your MySQL credentials:
```bash
cp .env.example .env
```

Ensure `DATABASE_URL` matches your local MySQL instance:
```env
DATABASE_URL="mysql://root:@127.0.0.1:3306/skillbridge"
JWT_SECRET="skillbridge_super_secret_jwt_key_at_least_32_characters_long"
PORT="5000"
CORS_ORIGIN="http://localhost:3000,http://localhost:5173"
```

### 3. Database Migration & Seed
Generate Prisma Client and push the schema to MySQL:
```bash
# Push schema to MySQL database
npx prisma db push

# (Optional) Seed the database with initial development fixture data
npx prisma db seed
```

### 4. Running Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:5000/api`.

---

## Quality & Scripts
- `npm run dev`: Start dev server with file watching via `tsx`
- `npm run start`: Run production server
- `npm run lint`: Type-check codebase with `tsc --noEmit`
