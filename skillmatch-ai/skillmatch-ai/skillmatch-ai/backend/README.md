# 🤖 SkillMatch AI — Backend

> AI-Powered Recruitment & Skill-Matching Platform | Node.js + Express + MongoDB + OpenAI

An AI-powered recruitment platform that automates resume screening, candidate-job matching, and shortlisting. Recruiters post jobs; job seekers upload resumes; the AI automatically ranks candidates by relevance.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Documentation Folders](#-documentation-folders)
- [Data Models (12 Collections)](#-data-models--12-mongodb-collections)
- [API Endpoints (~55 APIs)](#-api-endpoints--55-apis)
- [Production Middleware](#-production-middleware)
- [Implementation Roadmap](#-implementation-roadmap--7-phases)
- [User Roles & Routes](#-user-roles--site-map)
- [AI Engine Architecture](#-ai-engine-architecture)
- [Environment Variables](#-environment-variables)
- [Project Cost Summary](#-project-cost-summary)

---

## 🛠️ Tech Stack

| Layer              | Technology                                   |
| ------------------ | -------------------------------------------- |
| **Runtime**        | Node.js                                      |
| **Framework**      | Express.js v5                                |
| **Database**       | MongoDB (Mongoose ODM)                       |
| **Authentication** | JWT (jsonwebtoken) + bcrypt                  |
| **AI Engine**      | OpenAI GPT-4o-mini (Node.js SDK)             |
| **Queue System**   | Bull + Redis (async AI jobs)                 |
| **File Storage**   | Cloudinary / AWS S3                          |
| **Email**          | Nodemailer (SMTP)                            |
| **API Docs**       | Swagger (swagger-jsdoc + swagger-ui-express) |
| **File Upload**    | Multer                                       |

---

## 📁 Project Structure

```
skillmatch-ai-backend/
│
├── app.js                          # Entry point — starts server
├── package.json                    # Dependencies & scripts
├── .env                            # Environment variables (gitignored)
├── .env.example                    # Env template with all required variables
├── .gitignore
│
├── src/
│   ├── index.js                    # Express app setup (middleware + routes)
│   ├── config/
│   │   ├── connectDb.js            # MongoDB connection
│   │   ├── envConfig.js            # Env variable loader
│   │   ├── swagger.js              # Swagger/OpenAPI setup
│   │   └── redis.js                # Redis connection (for Bull queue)
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js       # JWT verification
│   │   ├── roleGuard.js            # Role-based access control
│   │   ├── globalErrorHandler.js   # Global error handler
│   │   ├── uploadMiddleware.js     # Multer file upload config
│   │   ├── requestId.js            # Unique request tracking
│   │   └── validators/             # Input validation (express-validator)
│   │       ├── authValidator.js
│   │       ├── profileValidator.js
│   │       └── jobValidator.js
│   │
│   ├── modules/                    # Feature-based modular structure
│   │   ├── auth/
│   │   ├── user/
│   │   ├── profile/
│   │   ├── resume/
│   │   ├── job/
│   │   ├── recruiter/
│   │   ├── application/
│   │   ├── notification/
│   │   ├── skill/
│   │   └── ai/
│   │
│   ├── services/
│   │   ├── aiService.js            # OpenAI API wrapper
│   │   ├── aiPrompts.js            # LLM prompt templates
│   │   ├── emailService.js         # Email sending service
│   │   ├── keywordMatcher.js       # TF-IDF fallback matching
│   │   └── storageService.js       # Cloudinary/S3 upload
│   │
│   ├── queues/
│   │   ├── resumeQueue.js          # Resume parsing queue
│   │   ├── matchQueue.js           # Match scoring queue
│   │   ├── emailQueue.js           # Email sending queue
│   │   ├── resumeProcessor.js      # Resume queue worker
│   │   └── matchProcessor.js       # Match queue worker
│   │
│   └── utils/
│       ├── cloudinary.js           # Cloudinary config
│       ├── jwtUtils.js             # Token generation helpers
│       └── fileParser.js           # PDF/DOCX text extraction
│
├── uploads/                        # Temporary upload directory
│
├── _01_skillmatch_ai_data_model/           # 📊 Data Model Documentation
├── _02_skillmatch_ai_api_list/             # 🔌 API List Documentation
├── _03_skillmatch_ai_backend_middleware/    # 🛡️ Middleware Documentation
└── _04_skillmatch_ai_implementation_steps/ # 🚀 Implementation Guide
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/Ashukr321/Ai-job-web-app.git
cd skillmatch-ai-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your MongoDB URI, JWT secret, Cloudinary keys, etc.

# Run in development mode
npm run dev

# Run in production
npm start
```

**Server runs at:** `http://localhost:5000`
**API Docs at:** `http://localhost:5000/api-docs`

---

## 📂 Documentation Folders

All project documentation lives inside the backend folder in 4 organized directories:

### 📊 `_01_skillmatch_ai_data_model/` — Data Models (13 files)

Complete Mongoose schema documentation for all 12 MongoDB collections with field reference tables, ObjectId relationships, ER diagrams, and code examples.

| File                         | Collection              | Description                             |
| ---------------------------- | ----------------------- | --------------------------------------- |
| `00_data_model_overview.md`  | —                       | ER diagram + relationship summary table |
| `01_user.md`                 | `users`                 | Core auth (name, email, password, role) |
| `02_candidate_profile.md`    | `candidate_profiles`    | Job Seeker extended profile             |
| `03_recruiter_profile.md`    | `recruiter_profiles`    | Company info for recruiters             |
| `04_candidate_skill.md`      | `candidate_skills`      | Skills with proficiency level           |
| `05_candidate_education.md`  | `candidate_educations`  | Education history                       |
| `06_candidate_experience.md` | `candidate_experiences` | Work experience                         |
| `07_resume.md`               | `resumes`               | Uploaded resumes + AI analysis results  |
| `08_job.md`                  | `jobs`                  | Job postings by recruiters              |
| `09_application.md`          | `applications`          | Job applications (User↔Job↔Resume)      |
| `10_notification.md`         | `notifications`         | In-app notification system              |
| `11_skill.md`                | `skills`                | Master skills dictionary with aliases   |
| `12_ai_usage_log.md`         | `ai_usage_logs`         | OpenAI API cost tracking                |

---

### 🔌 `_02_skillmatch_ai_api_list/` — API Endpoints (11 files)

Complete documentation of ~55 API endpoints with purpose, request/response examples, ObjectId references, and how APIs chain together.

| File                             | Module             | Endpoints                                                      |
| -------------------------------- | ------------------ | -------------------------------------------------------------- |
| `00_api_overview.md`             | Overview           | Route mapping + data flow diagram                              |
| `01_auth_apis.md`                | Authentication     | 5 (signup, login, logout, refresh, me)                         |
| `02_user_profile_apis.md`        | User Profile       | 15 (CRUD for profile, skills, education, experience, settings) |
| `03_resume_apis.md`              | Resume             | 5 (upload, list, delete, set-primary, AI analysis)             |
| `04_job_public_apis.md`          | Public Jobs        | 3 (list, detail, recommendations)                              |
| `05_job_application_apis.md`     | Applications       | 3 (apply, list, detail)                                        |
| `06_recruiter_profile_apis.md`   | Recruiter Profile  | 4 (CRUD + logo upload)                                         |
| `07_recruiter_job_apis.md`       | Job Management     | 7 (create, list, update, status, delete, analytics)            |
| `08_recruiter_applicant_apis.md` | Applicant Pipeline | 7 (list, detail, status, bulk, shortlist, notes, export)       |
| `09_notification_apis.md`        | Notifications      | 3 (list, mark read, mark all read)                             |
| `10_ai_admin_apis.md`            | AI & Admin         | 3 (skills search, AI usage, admin stats)                       |

---

### 🛡️ `_03_skillmatch_ai_backend_middleware/` — Middleware (10 files)

Production-level middleware with ready-to-use code, execution order, and install commands.

| File                         | Middleware                                             | Status          |
| ---------------------------- | ------------------------------------------------------ | --------------- |
| `00_middleware_overview.md`  | Complete execution order                               | 📋 Reference    |
| `01_cors.md`                 | CORS hardening                                         | ⚠️ Needs update |
| `02_helmet.md`               | Security headers                                       | ❌ Must add     |
| `03_rate_limiter.md`         | Rate limiting (3 tiers)                                | ❌ Must add     |
| `04_auth_middleware.md`      | JWT auth (improved)                                    | ⚠️ Needs update |
| `05_role_guard.md`           | Role-based access                                      | ❌ Must add     |
| `06_input_validation.md`     | Input sanitization                                     | ❌ Must add     |
| `07_file_upload.md`          | Multer (MIME validation)                               | ⚠️ Needs update |
| `08_error_handler.md`        | Global error handler (improved)                        | ⚠️ Needs update |
| `09_remaining_middleware.md` | Morgan, Compression, RequestID + full `index.js` order | ❌ Must add     |

---

### 🚀 `_04_skillmatch_ai_implementation_steps/` — Implementation Roadmap (8 files)

Phase-wise, step-by-step implementation guide with ~144 actionable tasks across 12 weeks.

| File                                      | Phase                       | Duration   | Tasks                  |
| ----------------------------------------- | --------------------------- | ---------- | ---------------------- |
| `00_implementation_overview.md`           | Overview                    | —          | Gantt chart + timeline |
| `phase_01_project_setup.md`               | Project Setup & Foundation  | Week 1     | 15 tasks               |
| `phase_02_auth_system.md`                 | Authentication System       | Week 2-3   | 13 tasks               |
| `phase_03_user_dashboard_backend.md`      | User Dashboard Backend      | Week 3-4   | 33 tasks               |
| `phase_04_recruiter_dashboard_backend.md` | Recruiter Dashboard Backend | Week 5-6   | 25 tasks               |
| `phase_05_ai_engine.md`                   | AI Resume Screening Engine  | Week 7-8   | 17 tasks               |
| `phase_06_integrations.md`                | Third-Party Integrations    | Week 9     | 11 tasks               |
| `phase_07_testing_deployment.md`          | Testing & Deployment        | Week 10-12 | 30 tasks               |

---

## 📊 Data Models — 12 MongoDB Collections

```mermaid
erDiagram
    USER ||--o| CANDIDATE_PROFILE : "has (role=user)"
    USER ||--o| RECRUITER_PROFILE : "has (role=recruiter)"
    USER ||--o{ RESUME : "uploads"
    USER ||--o{ APPLICATION : "submits"
    USER ||--o{ NOTIFICATION : "receives"
    USER ||--o{ AI_USAGE_LOG : "generates"

    CANDIDATE_PROFILE ||--o{ CANDIDATE_SKILL : "has many"
    CANDIDATE_PROFILE ||--o{ CANDIDATE_EDUCATION : "has many"
    CANDIDATE_PROFILE ||--o{ CANDIDATE_EXPERIENCE : "has many"

    RECRUITER_PROFILE ||--o{ JOB : "posts"
    JOB ||--o{ APPLICATION : "receives"
    RESUME ||--o{ APPLICATION : "used in"
```

### Collection Relationships

| Parent               | Child                   | Type | FK Field                                                          |
| -------------------- | ----------------------- | ---- | ----------------------------------------------------------------- |
| `users`              | `candidate_profiles`    | 1:1  | `candidate_profiles.user → users._id`                             |
| `users`              | `recruiter_profiles`    | 1:1  | `recruiter_profiles.user → users._id`                             |
| `users`              | `resumes`               | 1:N  | `resumes.user → users._id`                                        |
| `users`              | `applications`          | 1:N  | `applications.user → users._id`                                   |
| `users`              | `jobs`                  | 1:N  | `jobs.recruiterId → users._id`                                    |
| `jobs`               | `applications`          | 1:N  | `applications.job → jobs._id`                                     |
| `resumes`            | `applications`          | 1:N  | `applications.resume → resumes._id`                               |
| `candidate_profiles` | `candidate_skills`      | 1:N  | `candidate_skills.candidateProfile → candidate_profiles._id`      |
| `candidate_profiles` | `candidate_educations`  | 1:N  | `candidate_educations.candidateProfile → candidate_profiles._id`  |
| `candidate_profiles` | `candidate_experiences` | 1:N  | `candidate_experiences.candidateProfile → candidate_profiles._id` |

---

## 🔌 API Endpoints (~55 APIs)

### Authentication (`/api/v1/auth`)

| Method | Route           | Auth | Purpose                     |
| ------ | --------------- | ---- | --------------------------- |
| POST   | `/auth/signup`  | ❌   | Register new user/recruiter |
| POST   | `/auth/login`   | ❌   | Login and get JWT tokens    |
| POST   | `/auth/logout`  | ✅   | Invalidate refresh token    |
| POST   | `/auth/refresh` | ❌   | Renew expired access token  |
| GET    | `/auth/me`      | ✅   | Get current user info       |

### User Profile (`/api/v1/user`) — Role: `user`

| Method | Route                          | Purpose                     |
| ------ | ------------------------------ | --------------------------- |
| GET    | `/user/profile`                | Get candidate profile       |
| POST   | `/user/profile`                | Create profile (first-time) |
| PUT    | `/user/profile`                | Update profile              |
| PUT    | `/user/profile/avatar`         | Upload avatar image         |
| POST   | `/user/profile/skills`         | Add skill                   |
| DELETE | `/user/profile/skills/:id`     | Remove skill                |
| POST   | `/user/profile/education`      | Add education               |
| PUT    | `/user/profile/education/:id`  | Update education            |
| DELETE | `/user/profile/education/:id`  | Remove education            |
| POST   | `/user/profile/experience`     | Add experience              |
| PUT    | `/user/profile/experience/:id` | Update experience           |
| DELETE | `/user/profile/experience/:id` | Remove experience           |
| GET    | `/user/settings`               | Get settings                |
| PUT    | `/user/settings`               | Update settings             |
| PUT    | `/user/settings/password`      | Change password             |

### Resume (`/api/v1/user/resumes`) — Role: `user`

| Method | Route                           | Purpose                                        |
| ------ | ------------------------------- | ---------------------------------------------- |
| POST   | `/user/resumes`                 | Upload resume (PDF/DOCX) → triggers AI parsing |
| GET    | `/user/resumes`                 | List all resumes                               |
| DELETE | `/user/resumes/:id`             | Delete resume                                  |
| PUT    | `/user/resumes/:id/set-primary` | Set as primary                                 |
| GET    | `/user/resumes/:id/analysis`    | View AI analysis results                       |

### Jobs — Public (`/api/v1/jobs`)

| Method | Route             | Auth    | Purpose                                   |
| ------ | ----------------- | ------- | ----------------------------------------- |
| GET    | `/jobs`           | ❌      | Browse active jobs (filters + pagination) |
| GET    | `/jobs/:id`       | ❌      | Job detail (increments view count)        |
| POST   | `/jobs/:id/apply` | ✅ user | Apply to a job                            |

### Applications (`/api/v1/user/applications`) — Role: `user`

| Method | Route                    | Purpose                              |
| ------ | ------------------------ | ------------------------------------ |
| GET    | `/user/applications`     | List all applications                |
| GET    | `/user/applications/:id` | Application detail with AI breakdown |
| GET    | `/user/recommended-jobs` | Top 10 AI-recommended jobs           |

### Recruiter Profile (`/api/v1/recruiter`) — Role: `recruiter`

| Method | Route                     | Purpose                |
| ------ | ------------------------- | ---------------------- |
| GET    | `/recruiter/profile`      | Get company profile    |
| POST   | `/recruiter/profile`      | Create company profile |
| PUT    | `/recruiter/profile`      | Update company profile |
| PUT    | `/recruiter/profile/logo` | Upload company logo    |

### Recruiter Jobs (`/api/v1/recruiter/jobs`) — Role: `recruiter`

| Method | Route                           | Purpose                     |
| ------ | ------------------------------- | --------------------------- |
| POST   | `/recruiter/jobs`               | Create job (default: draft) |
| GET    | `/recruiter/jobs`               | List recruiter's jobs       |
| GET    | `/recruiter/jobs/:id`           | Job detail                  |
| PUT    | `/recruiter/jobs/:id`           | Update job                  |
| PATCH  | `/recruiter/jobs/:id/status`    | Activate/pause/close        |
| DELETE | `/recruiter/jobs/:id`           | Delete (draft only)         |
| GET    | `/recruiter/jobs/:id/analytics` | Job stats                   |

### Applicant Pipeline (`/api/v1/recruiter`) — Role: `recruiter`

| Method | Route                                           | Purpose                       |
| ------ | ----------------------------------------------- | ----------------------------- |
| GET    | `/recruiter/jobs/:jobId/applicants`             | List applicants (filter/sort) |
| GET    | `/recruiter/jobs/:jobId/applicants/:id`         | Applicant detail              |
| PATCH  | `/recruiter/jobs/:jobId/applicants/:id/status`  | Update status                 |
| POST   | `/recruiter/jobs/:jobId/applicants/bulk-update` | Bulk shortlist/reject         |
| GET    | `/recruiter/shortlisted`                        | All shortlisted across jobs   |
| POST   | `/recruiter/jobs/:jobId/applicants/:id/notes`   | Add recruiter note            |
| GET    | `/recruiter/jobs/:jobId/applicants/export`      | Export CSV                    |

### Notifications & Admin

| Method | Route                     | Auth     | Purpose             |
| ------ | ------------------------- | -------- | ------------------- |
| GET    | `/notifications`          | ✅       | List notifications  |
| PATCH  | `/notifications/:id/read` | ✅       | Mark as read        |
| PATCH  | `/notifications/read-all` | ✅       | Mark all as read    |
| GET    | `/skills?q=`              | ❌       | Skills autocomplete |
| GET    | `/admin/ai-usage`         | ✅ admin | AI cost report      |
| GET    | `/admin/dashboard`        | ✅ admin | Platform stats      |

---

## 🛡️ Production Middleware

Middleware executes in this order:

```
Request → Helmet → CORS → Compression → Morgan → RequestID
  → Body Parsers → Mongo Sanitize → Rate Limiter
  → Routes (Validation → Auth → RoleGuard → Controller)
  → 404 Handler → Global Error Handler
```

### Required Packages

```bash
npm install helmet express-rate-limit express-validator express-mongo-sanitize compression morgan
```

---

## 🚀 Implementation Roadmap — 7 Phases

```
Phase 1: Project Setup (Week 1)        ████░░░░░░░░░░  15 tasks
Phase 2: Auth System (Week 2-3)        ████░░░░░░░░░░  13 tasks
Phase 3: User Dashboard (Week 3-4)     ████████░░░░░░  33 tasks
Phase 4: Recruiter Dashboard (Week 5-6) ██████░░░░░░░░  25 tasks
Phase 5: AI Engine (Week 7-8)          ████████░░░░░░  17 tasks
Phase 6: Integrations (Week 9)         ████░░░░░░░░░░  11 tasks
Phase 7: Testing & Deploy (Week 10-12) ████████░░░░░░  30 tasks
───────────────────────────────────────────────────────
Total                                                  ~144 tasks
```

---

## 👥 User Roles & Site Map

### Roles

| Role       | Value       | Description                                         |
| ---------- | ----------- | --------------------------------------------------- |
| Job Seeker | `user`      | Signs up, uploads resume, applies to jobs           |
| Recruiter  | `recruiter` | Posts jobs, views applicants, shortlists candidates |

### Site Map

```
Landing Page (public):
├── /              → Home
├── /login         → Login (Job Seeker or Recruiter)
└── /signup        → Signup (Job Seeker or Recruiter)

User Dashboard (role: user):
├── /dashboard/profile   → Profile & Settings
├── /dashboard/resume    → Resume Upload + AI Analysis
├── /dashboard/jobs      → Browse & Apply to Jobs
├── /dashboard/applied   → Track Application Status
└── /dashboard/history   → Saved Jobs & Activity

Recruiter Dashboard (role: recruiter):
├── /recruiter/overview            → Stats Dashboard
├── /recruiter/jobs                → All Job Posts
├── /recruiter/jobs/new            → Create Job Post
├── /recruiter/jobs/:id/applicants → Applicant Pipeline
└── /recruiter/shortlisted         → Shortlisted Candidates
```

---

## 🤖 AI Engine Architecture

```
Resume Upload (PDF/DOCX)
  │
  ├── 1. Multer validates file type + size (≤5MB)
  ├── 2. File uploaded to Cloudinary → URL saved in MongoDB
  ├── 3. Bull queue job created: { resumeId }
  │
  └── Queue Worker (async):
      ├── 4. Download file from Cloudinary
      ├── 5. Extract text (pdf-parse / mammoth)
      ├── 6. Send to OpenAI GPT-4o-mini → extract skills, summary
      ├── 7. Save AI results to resumes collection
      ├── 8. Log cost to ai_usage_logs
      └── 9. Compute match scores for all active jobs
          └── Save scores to applications collection

Scoring Weights:
  ├── Required Skills Match: 50%
  ├── Experience Level: 25%
  ├── Description Semantic Match: 15%
  └── Nice-to-Have Skills: 10%

Fallback: TF-IDF keyword matching when AI budget exceeded
```

---

## 🔐 Environment Variables

```bash
# App
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:4000

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillmatch-ai
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
AI_MONTHLY_BUDGET_INR=2500

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ─── Email (Nodemailer SMTP) ───
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your_email_password
EMAIL_FROM=noreply@yourdomain.com
```

---

## 💰 Project Cost Summary

| Item                                 | Cost         |
| ------------------------------------ | ------------ |
| Domain (.com/.in/.tech)              | ₹1,900/year  |
| Backend Development                  | ₹5,000       |
| Frontend Development                 | ₹4,000       |
| Third-party APIs (OpenAI, S3, Email) | ₹3,500       |
| Documentation (Project Book + PPT)   | ₹1,000       |
| **Total**                            | **~₹15,400** |

### Monthly Running Costs

| Service                        | Cost            |
| ------------------------------ | --------------- |
| MongoDB Atlas (Free M0)        | ₹0              |
| Render.com (Free tier)         | ₹0              |
| Vercel (Free tier)             | ₹0              |
| Upstash Redis (Free tier)      | ₹0              |
| OpenAI AI usage                | ~₹300-600/month |
| Hostinger Email (included with VPS) | ₹0              |

---

## 📄 License

ISC

---
