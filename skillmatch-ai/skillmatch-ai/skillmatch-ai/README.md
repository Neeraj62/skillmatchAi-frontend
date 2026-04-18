<p align="center">
  <img src="https://img.shields.io/badge/🤖_SkillMatch_AI-Recruitment_Platform-blueviolet?style=for-the-badge&labelColor=0a0e1a" alt="SkillMatch AI" />
</p>

<h1 align="center">SkillMatch AI</h1>

<p align="center">
  <strong>AI-Powered Recruitment & Skill-Matching Platform</strong><br />
  Automating resume screening, candidate-job matching, and shortlisting with OpenAI GPT-4o
</p>

<p align="center">
  <a href="#-quick-start"><img src="https://img.shields.io/badge/Quick_Start-→-brightgreen?style=flat-square" alt="Quick Start" /></a>
  <a href="#-api-documentation"><img src="https://img.shields.io/badge/API_Docs-Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black" alt="API Docs" /></a>
  <a href="#-contributing"><img src="https://img.shields.io/badge/Contributing-Guide-blue?style=flat-square" alt="Contributing" /></a>
  <a href="https://github.com/Ashukr321/skillmatch-ai/issues"><img src="https://img.shields.io/badge/Issues-Report-red?style=flat-square" alt="Issues" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-v20+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/express-v5-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/react-v19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/mongodb-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/openai-GPT--4o-412991?style=flat-square&logo=openai&logoColor=white" alt="OpenAI" />
  <img src="https://img.shields.io/badge/docker-Containerized-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/license-ISC-yellow?style=flat-square" alt="License" />
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Data Models](#-data-models--12-mongodb-collections)
- [Backend Middleware](#-backend-middleware)
- [Implementation Roadmap](#-implementation-roadmap--7-phases)
- [Deployment](#-deployment)
- [DFD & User Flow Diagrams](#-dfd--user-flow-diagrams)
- [Frontend Task Breakdown](#-frontend-task-breakdown)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**SkillMatch AI** is a full-stack, AI-powered recruitment platform that connects job seekers and recruiters through intelligent automation. Recruiters post jobs; job seekers upload resumes; the AI engine automatically screens, ranks, and shortlists candidates by relevance — eliminating manual resume filtering.

### How It Works

```
┌────────────────┐      ┌──────────────┐      ┌─────────────────┐
│   Job Seeker   │─────▶│  Upload      │─────▶│  AI Engine       │
│   Signs Up     │      │  Resume      │      │  (GPT-4o)       │
└────────────────┘      └──────────────┘      └────────┬────────┘
                                                       │
┌────────────────┐      ┌──────────────┐               │
│   Recruiter    │─────▶│  Post Job    │◀──────────────┘
│   Signs Up     │      │  Listing     │  Match & Rank Candidates
└────────────────┘      └──────────────┘
```

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🧠 **AI Resume Screening** | GPT-4o extracts skills, experience, and generates relevance scores from uploaded resumes |
| 🎯 **Smart Job Matching** | Weighted scoring engine (skills 50%, experience 25%, semantic 15%, nice-to-have 10%) |
| 📊 **Recruiter Dashboard** | Full applicant pipeline — bulk ops, shortlisting, notes, CSV export, analytics |
| 👤 **Job Seeker Portal** | Profile management, skills, education, experience, resume upload & application tracking |
| 🔔 **Real-time Notifications** | In-app alerts for application updates, shortlisting, and job recommendations |
| 🔐 **Secure Auth & RBAC** | JWT tokens, refresh tokens, role guards (user, recruiter, admin) |
| 📋 **Interactive API Docs** | Live Swagger UI at `/api-docs` for testing every endpoint |
| 🐳 **Docker Ready** | Containerized with Docker Compose for production deployment |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                             │
│  React 19 + Vite + TailwindCSS + React Router v7 + Framer      │
└───────────────────────┬─────────────────────────────────────────┘
                        │ HTTP / REST
┌───────────────────────▼─────────────────────────────────────────┐
│                    API Gateway (Nginx)                           │
│              Reverse Proxy + SSL Termination                    │
└───────────────────────┬─────────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│                   Backend Server                                │
│  Express v5 → Helmet → CORS → Rate Limiter → Auth → Routes     │
├─────────────────────────────────────────────────────────────────┤
│  Modules: Auth │ User │ Profile │ Resume │ Job │ Application    │
│           Recruiter │ Notification │ Skill │ AI                 │
└──────┬───────────────────┬──────────────────┬───────────────────┘
       │                   │                  │
┌──────▼──────┐  ┌─────────▼────────┐  ┌─────▼─────────┐
│  MongoDB    │  │  OpenAI GPT-4o   │  │  Cloudinary   │
│  Atlas      │  │  AI Engine       │  │  File Storage │
└─────────────┘  └──────────────────┘  └───────────────┘
```

---

## 🛠 Tech Stack

### Backend

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js v20+ |
| Framework | Express.js v5 |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (jsonwebtoken) + bcrypt |
| AI Engine | OpenAI GPT-4o-mini |
| File Storage | Cloudinary |
| API Docs | Swagger (swagger-jsdoc + swagger-ui-express) |
| File Upload | Multer |
| Containerization | Docker + Docker Compose |
| Reverse Proxy | Nginx |

### Frontend

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Styling | TailwindCSS 4 + SCSS Modules |
| Routing | React Router DOM v7 |
| Animations | Framer Motion |
| Icons | React Icons |
| Notifications | React Toastify |

---

## 📁 Project Structure

```
skillmatch-ai/
│
├── backend/                              # Node.js + Express API Server
│   ├── app.js                            # Entry point — starts server
│   ├── package.json                      # Dependencies & scripts
│   ├── Dockerfile                        # Docker container config
│   ├── docker-compose.prod.yml           # Production Docker Compose
│   ├── .env.example                      # Environment template
│   │
│   ├── src/
│   │   ├── index.js                      # Express app setup (middleware + routes)
│   │   ├── config/
│   │   │   ├── connectDb.js              # MongoDB connection
│   │   │   ├── envConfig.js              # Env variable loader
│   │   │   └── swagger.js                # Swagger/OpenAPI setup
│   │   │
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js         # JWT verification
│   │   │   └── globalErrorHandler.js     # Global error handler
│   │   │
│   │   ├── modules/                      # Feature-based modular structure
│   │   │   ├── user/                     # User module (model + routes + controller + swagger)
│   │   │   └── profile/                  # Profile module
│   │   │
│   │   ├── utils/
│   │   │   └── cloudinary.js             # Cloudinary config
│   │   │
│   │   └── views/
│   │       └── pages/
│   │           └── landing.ejs           # Server landing page UI
│   │
│   ├── project-requirement/              # 📚 Complete Project Documentation
│   │   ├── _01_skillmatch_ai_data_model/
│   │   ├── _02_skillmatch_ai_api_list/
│   │   ├── _03_skillmatch_ai_backend_middleware/
│   │   ├── _04_skillmatch_ai_implementation_steps/
│   │   ├── _05_hostinger_vps_deployment_steps/
│   │   └── dfd- SKILL MATCH AI/         # DFD & architecture diagrams
│   │
│   ├── nginx/                            # Nginx reverse proxy config
│   └── uploads/                          # Temporary upload directory
│
├── frontend/                             # React 19 + Vite SPA
│   ├── index.html                        # HTML entry point
│   ├── package.json                      # Dependencies & scripts
│   ├── vite.config.js                    # Vite configuration
│   │
│   ├── src/
│   │   ├── App.jsx                       # Root component
│   │   ├── main.jsx                      # React DOM entry
│   │   ├── routes/                       # Router config + protected routes
│   │   ├── context/                      # Auth context provider
│   │   ├── components/                   # Reusable UI components
│   │   ├── Dashboard/                    # Dashboard layouts
│   │   │   ├── jobSeekerDashboard/       # Job seeker dashboard
│   │   │   └── requirterDashboard/       # Recruiter dashboard
│   │   ├── pages/                        # Page components
│   │   │   ├── jobSeekerPages/           # Job seeker pages
│   │   │   └── requirterPage/            # Recruiter pages
│   │   ├── websiteComponents/            # Landing site components
│   │   ├── websitePages/                 # Public website pages
│   │   ├── services/                     # API service layer
│   │   └── assets/                       # Images, icons, styles
│   │
│   ├── frontend requirment/              # DFD & user flow diagrams (.png + .drawio)
│   └── task/                             # Frontend MVP task breakdown
│
├── .gitignore
└── README.md                             # ← You are here
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v20+ ([download](https://nodejs.org/))
- **MongoDB** (local or [Atlas](https://www.mongodb.com/atlas))
- **Git** ([download](https://git-scm.com/))

### 1. Clone the Repository

```bash
git clone https://github.com/Ashukr321/skillmatch-ai.git
cd skillmatch-ai
```

### 2. Backend Setup

```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, etc.

# Start development server
npm run dev
```

> 🟢 **Backend runs at:** `http://localhost:5000`  
> 📋 **API Docs at:** `http://localhost:5000/api-docs`

### 3. Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```

> 🟢 **Frontend runs at:** `http://localhost:5173`

### 4. Docker (Production)

```bash
cd backend
docker-compose -f docker-compose.prod.yml up --build -d
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory using the template:

```bash
# App
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/skillmatch-ai

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Cloudinary (File Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# OpenAI (AI Engine)
OPENAI_API_KEY=your_openai_api_key
```

> 📄 See [`backend/.env.example`](backend/.env.example) for the full template.

---

## 📋 API Documentation

Interactive Swagger UI is available at **`/api-docs`** when the server is running.

### API Modules (~55 Endpoints)

| # | Module | Endpoints | Documentation |
|---|--------|-----------|---------------|
| 📖 | **Overview** | Route map & data flow | [00_api_overview.md](backend/project-requirement/_02_skillmatch_ai_api_list/00_api_overview.md) |
| 🔑 | **Authentication** | 5 — signup, login, logout, refresh, me | [01_auth_apis.md](backend/project-requirement/_02_skillmatch_ai_api_list/01_auth_apis.md) |
| 👤 | **User Profile** | 15 — CRUD for profile, skills, education, experience | [02_user_profile_apis.md](backend/project-requirement/_02_skillmatch_ai_api_list/02_user_profile_apis.md) |
| 📄 | **Resume** | 5 — upload, list, delete, set-primary, AI analysis | [03_resume_apis.md](backend/project-requirement/_02_skillmatch_ai_api_list/03_resume_apis.md) |
| 💼 | **Public Jobs** | 3 — list, detail, recommendations | [04_job_public_apis.md](backend/project-requirement/_02_skillmatch_ai_api_list/04_job_public_apis.md) |
| 📩 | **Applications** | 3 — apply, list, detail | [05_job_application_apis.md](backend/project-requirement/_02_skillmatch_ai_api_list/05_job_application_apis.md) |
| 🏢 | **Recruiter Profile** | 4 — CRUD + logo upload | [06_recruiter_profile_apis.md](backend/project-requirement/_02_skillmatch_ai_api_list/06_recruiter_profile_apis.md) |
| 📝 | **Recruiter Jobs** | 7 — create, list, update, status, delete, analytics | [07_recruiter_job_apis.md](backend/project-requirement/_02_skillmatch_ai_api_list/07_recruiter_job_apis.md) |
| 📊 | **Applicant Pipeline** | 7 — list, detail, status, bulk, shortlist, notes, export | [08_recruiter_applicant_apis.md](backend/project-requirement/_02_skillmatch_ai_api_list/08_recruiter_applicant_apis.md) |
| 🔔 | **Notifications** | 3 — list, mark read, mark all read | [09_notification_apis.md](backend/project-requirement/_02_skillmatch_ai_api_list/09_notification_apis.md) |
| 🤖 | **AI & Admin** | 3 — skills search, AI usage, admin stats | [10_ai_admin_apis.md](backend/project-requirement/_02_skillmatch_ai_api_list/10_ai_admin_apis.md) |

### Key Endpoints at a Glance

```
POST   /api/v1/auth/signup              → Register user/recruiter
POST   /api/v1/auth/login               → Login & get JWT
GET    /api/v1/user/profile              → Get candidate profile
POST   /api/v1/user/resumes             → Upload resume → AI parsing
GET    /api/v1/jobs                      → Browse jobs (filters + pagination)
POST   /api/v1/jobs/:id/apply           → Apply to a job
POST   /api/v1/recruiter/jobs           → Create job posting
GET    /api/v1/recruiter/jobs/:id/applicants → View applicants
GET    /api/v1/user/recommended-jobs    → AI-recommended jobs
GET    /api/v1/admin/dashboard          → Platform analytics
```

---

## 📊 Data Models — 12 MongoDB Collections

| # | Collection | Description | Documentation |
|---|-----------|-------------|---------------|
| 📖 | **Overview** | ER diagram + relationship summary | [00_data_model_overview.md](backend/project-requirement/_01_skillmatch_ai_data_model/00_data_model_overview.md) |
| 👤 | `users` | Core auth (name, email, password, role) | [01_user.md](backend/project-requirement/_01_skillmatch_ai_data_model/01_user.md) |
| 📝 | `candidate_profiles` | Job seeker extended profile | [02_candidate_profile.md](backend/project-requirement/_01_skillmatch_ai_data_model/02_candidate_profile.md) |
| 🏢 | `recruiter_profiles` | Company info for recruiters | [03_recruiter_profile.md](backend/project-requirement/_01_skillmatch_ai_data_model/03_recruiter_profile.md) |
| 🎯 | `candidate_skills` | Skills with proficiency levels | [04_candidate_skill.md](backend/project-requirement/_01_skillmatch_ai_data_model/04_candidate_skill.md) |
| 🎓 | `candidate_educations` | Education history | [05_candidate_education.md](backend/project-requirement/_01_skillmatch_ai_data_model/05_candidate_education.md) |
| 💼 | `candidate_experiences` | Work experience records | [06_candidate_experience.md](backend/project-requirement/_01_skillmatch_ai_data_model/06_candidate_experience.md) |
| 📄 | `resumes` | Uploaded resumes + AI analysis | [07_resume.md](backend/project-requirement/_01_skillmatch_ai_data_model/07_resume.md) |
| 📋 | `jobs` | Job postings by recruiters | [08_job.md](backend/project-requirement/_01_skillmatch_ai_data_model/08_job.md) |
| 📩 | `applications` | User ↔ Job ↔ Resume applications | [09_application.md](backend/project-requirement/_01_skillmatch_ai_data_model/09_application.md) |
| 🔔 | `notifications` | In-app notification system | [10_notification.md](backend/project-requirement/_01_skillmatch_ai_data_model/10_notification.md) |
| 🏷️ | `skills` | Master skills dictionary + aliases | [11_skill.md](backend/project-requirement/_01_skillmatch_ai_data_model/11_skill.md) |
| 📊 | `ai_usage_logs` | OpenAI API cost tracking | [12_ai_usage_log.md](backend/project-requirement/_01_skillmatch_ai_data_model/12_ai_usage_log.md) |

### Entity Relationship Diagram

```
USER ──┬── 1:1 ──▶ CANDIDATE_PROFILE ──┬── 1:N ──▶ CANDIDATE_SKILL
       │                                ├── 1:N ──▶ CANDIDATE_EDUCATION
       │                                └── 1:N ──▶ CANDIDATE_EXPERIENCE
       │
       ├── 1:1 ──▶ RECRUITER_PROFILE ──── 1:N ──▶ JOB ──── 1:N ──▶ APPLICATION
       ├── 1:N ──▶ RESUME ────────────────────────── 1:N ──▶ APPLICATION
       ├── 1:N ──▶ NOTIFICATION
       └── 1:N ──▶ AI_USAGE_LOG
```

---

## 🛡 Backend Middleware

Production-grade middleware stack executing in order:

```
Request → Helmet → CORS → Compression → Morgan → RequestID
  → Body Parsers → Mongo Sanitize → Rate Limiter
  → Routes (Validation → Auth → RoleGuard → Controller)
  → 404 Handler → Global Error Handler
```

| # | Middleware | Status | Documentation |
|---|-----------|--------|---------------|
| 📖 | **Execution Overview** | 📋 Reference | [00_middleware_overview.md](backend/project-requirement/_03_skillmatch_ai_backend_middleware/00_middleware_overview.md) |
| 🌐 | CORS Hardening | ⚠️ Needs update | [01_cors.md](backend/project-requirement/_03_skillmatch_ai_backend_middleware/01_cors.md) |
| 🛡️ | Security Headers (Helmet) | ❌ Must add | [02_helmet.md](backend/project-requirement/_03_skillmatch_ai_backend_middleware/02_helmet.md) |
| 🚦 | Rate Limiting (3 tiers) | ❌ Must add | [03_rate_limiter.md](backend/project-requirement/_03_skillmatch_ai_backend_middleware/03_rate_limiter.md) |
| 🔑 | JWT Auth Middleware | ⚠️ Needs update | [04_auth_middleware.md](backend/project-requirement/_03_skillmatch_ai_backend_middleware/04_auth_middleware.md) |
| 🔒 | Role-based Access Control | ❌ Must add | [05_role_guard.md](backend/project-requirement/_03_skillmatch_ai_backend_middleware/05_role_guard.md) |
| ✅ | Input Validation | ❌ Must add | [06_input_validation.md](backend/project-requirement/_03_skillmatch_ai_backend_middleware/06_input_validation.md) |
| 📁 | File Upload (Multer) | ⚠️ Needs update | [07_file_upload.md](backend/project-requirement/_03_skillmatch_ai_backend_middleware/07_file_upload.md) |
| ❗ | Global Error Handler | ⚠️ Needs update | [08_error_handler.md](backend/project-requirement/_03_skillmatch_ai_backend_middleware/08_error_handler.md) |
| 📦 | Morgan, Compression, RequestID | ❌ Must add | [09_remaining_middleware.md](backend/project-requirement/_03_skillmatch_ai_backend_middleware/09_remaining_middleware.md) |

---

## 🚀 Implementation Roadmap — 7 Phases

~144 actionable tasks across 12 development weeks:

| Phase | Area | Duration | Tasks | Documentation |
|-------|------|----------|-------|---------------|
| 📖 | **Overview & Gantt** | — | Timeline | [00_implementation_overview.md](backend/project-requirement/_04_skillmatch_ai_implementation_steps/00_implementation_overview.md) |
| 1️⃣ | Project Setup & Foundation | Week 1 | 15 | [phase_01_project_setup.md](backend/project-requirement/_04_skillmatch_ai_implementation_steps/phase_01_project_setup.md) |
| 2️⃣ | Authentication System | Week 2–3 | 13 | [phase_02_auth_system.md](backend/project-requirement/_04_skillmatch_ai_implementation_steps/phase_02_auth_system.md) |
| 3️⃣ | User Dashboard Backend | Week 3–4 | 33 | [phase_03_user_dashboard_backend.md](backend/project-requirement/_04_skillmatch_ai_implementation_steps/phase_03_user_dashboard_backend.md) |
| 4️⃣ | Recruiter Dashboard Backend | Week 5–6 | 25 | [phase_04_recruiter_dashboard_backend.md](backend/project-requirement/_04_skillmatch_ai_implementation_steps/phase_04_recruiter_dashboard_backend.md) |
| 5️⃣ | AI Resume Screening Engine | Week 7–8 | 17 | [phase_05_ai_engine.md](backend/project-requirement/_04_skillmatch_ai_implementation_steps/phase_05_ai_engine.md) |
| 6️⃣ | Third-Party Integrations | Week 9 | 11 | [phase_06_integrations.md](backend/project-requirement/_04_skillmatch_ai_implementation_steps/phase_06_integrations.md) |
| 7️⃣ | Testing & Deployment | Week 10–12 | 30 | [phase_07_testing_deployment.md](backend/project-requirement/_04_skillmatch_ai_implementation_steps/phase_07_testing_deployment.md) |

```
Phase 1: ████░░░░░░░░░░  15 tasks   (Week 1)
Phase 2: ████░░░░░░░░░░  13 tasks   (Week 2-3)
Phase 3: ████████░░░░░░  33 tasks   (Week 3-4)
Phase 4: ██████░░░░░░░░  25 tasks   (Week 5-6)
Phase 5: ████████░░░░░░  17 tasks   (Week 7-8)
Phase 6: ████░░░░░░░░░░  11 tasks   (Week 9)
Phase 7: ████████░░░░░░  30 tasks   (Week 10-12)
────────────────────────────────────────────────
Total                    ~144 tasks  (12 weeks)
```

---

## 🚢 Deployment

Full production deployment guide using **Docker + Nginx + SSL on Hostinger VPS**:

📖 **[Complete Deployment Guide →](backend/project-requirement/_05_hostinger_vps_deployment_steps/00_complete_deployment_guide.md)**

### Deployment Architecture

```
┌──────────────────────────────────────────────┐
│              Hostinger VPS                    │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │           Nginx (Port 80/443)          │  │
│  │         SSL + Reverse Proxy            │  │
│  └────────────────┬───────────────────────┘  │
│                   │                          │
│  ┌────────────────▼───────────────────────┐  │
│  │     Docker Container (Port 5000)       │  │
│  │     Node.js + Express Backend          │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │         MongoDB Atlas (Cloud)          │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

---

## 📐 DFD & User Flow Diagrams

Architecture and data flow diagrams for both frontend and backend are available in:

- **Backend diagrams:** [`backend/project-requirement/dfd- SKILL MATCH AI/`](backend/project-requirement/dfd-%20SKILL%20MATCH%20AI/)
- **Frontend diagrams:** [`frontend/frontend requirment/`](frontend/frontend%20requirment/)

| Diagram | Backend | Frontend |
|---------|---------|----------|
| DFD Level 0 (Context) | [View](backend/project-requirement/dfd-%20SKILL%20MATCH%20AI/DFD-Level0-Context.png) | [View](frontend/frontend%20requirment/DFD-Level0-Context.png) |
| DFD Level 1 (Processes) | [View](backend/project-requirement/dfd-%20SKILL%20MATCH%20AI/DFD-Level1-Processes.png) | [View](frontend/frontend%20requirment/DFD-Level1-Processes.png) |
| System Architecture | [View](backend/project-requirement/dfd-%20SKILL%20MATCH%20AI/System-Architecture-Flow.png) | [View](frontend/frontend%20requirment/System-Architecture-Flow.png) |
| User Flow — Job Seeker | [View](backend/project-requirement/dfd-%20SKILL%20MATCH%20AI/UserFlow-JobSeeker-Journey.png) | [View](frontend/frontend%20requirment/UserFlow-JobSeeker-Journey.png) |
| User Flow — Recruiter | [View](backend/project-requirement/dfd-%20SKILL%20MATCH%20AI/UserFlow-Recruiter-Journey.png) | [View](frontend/frontend%20requirment/UserFlow-Recruiter-Journey.png) |

---

## 📋 Frontend Task Breakdown

The frontend development is organized into 7 MVPs with detailed task files:

| MVP | Task Area | File |
|-----|-----------|------|
| 📖 | **Project Overview** | [README-PROJECT-OVERVIEW.todo](frontend/task/README-PROJECT-OVERVIEW.todo) |
| 🔧 | **Tech Stack** | [TECH-STACK.todo](frontend/task/TECH-STACK.todo) |
| 1️⃣ | Foundation & Landing Page | [MVP1-foundation-landing-page.todo](frontend/task/MVP1-foundation-landing-page.todo) |
| 2️⃣ | Authentication System | [MVP2-auth-system.todo](frontend/task/MVP2-auth-system.todo) |
| 3️⃣ | User Dashboard | [MVP3-user-dashboard.todo](frontend/task/MVP3-user-dashboard.todo) |
| 4️⃣ | Recruiter Dashboard | [MVP4-recruiter-dashboard.todo](frontend/task/MVP4-recruiter-dashboard.todo) |
| 5️⃣ | AI Resume Screening | [MVP5-ai-resume-screening.todo](frontend/task/MVP5-ai-resume-screening.todo) |
| 6️⃣ | API Integration & Costs | [MVP6-api-integration-costs.todo](frontend/task/MVP6-api-integration-costs.todo) |
| 7️⃣ | Documentation & Deployment | [MVP7-documentation-deployment.todo](frontend/task/MVP7-documentation-deployment.todo) |

---

## 👥 User Roles

| Role | Value | Capabilities |
|------|-------|-------------|
| **Job Seeker** | `user` | Sign up, build profile, upload resume, browse & apply to jobs, track applications |
| **Recruiter** | `recruiter` | Post jobs, view & filter applicants, shortlist, bulk actions, export CSV, analytics |
| **Admin** | `admin` | Platform stats, AI usage reports, system-wide management |

---

## 🤖 AI Engine

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

Scoring Weights:
  ├── Required Skills Match:         50%
  ├── Experience Level:              25%
  ├── Description Semantic Match:    15%
  └── Nice-to-Have Skills:           10%

Fallback: TF-IDF keyword matching when AI budget exceeded
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 1. Fork & Clone

```bash
git clone https://github.com/<your-username>/skillmatch-ai.git
cd skillmatch-ai
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes & Commit

```bash
git add .
git commit -m "feat(module): your descriptive commit message"
```

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Purpose |
|--------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting (no logic change) |
| `refactor` | Code restructuring |
| `test` | Adding tests |
| `chore` | Build, tooling, deps |

### 4. Push & Open PR

```bash
git push origin feature/your-feature-name
```

Open a Pull Request against `main` with a clear description.

### 📚 Documentation for Contributors

Before contributing, review these docs to understand the codebase:

- **[Data Models](backend/project-requirement/_01_skillmatch_ai_data_model/00_data_model_overview.md)** — Understand the database schema
- **[API Overview](backend/project-requirement/_02_skillmatch_ai_api_list/00_api_overview.md)** — See how all endpoints connect
- **[Middleware Stack](backend/project-requirement/_03_skillmatch_ai_backend_middleware/00_middleware_overview.md)** — Understand request processing
- **[Implementation Roadmap](backend/project-requirement/_04_skillmatch_ai_implementation_steps/00_implementation_overview.md)** — See what's planned
- **[Deployment Guide](backend/project-requirement/_05_hostinger_vps_deployment_steps/00_complete_deployment_guide.md)** — Production deployment

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/) — GPT-4o-mini for AI-powered resume screening
- [MongoDB](https://www.mongodb.com/) — Database infrastructure
- [Cloudinary](https://cloudinary.com/) — File storage and media management
- [Express.js](https://expressjs.com/) — Backend web framework
- [React](https://react.dev/) — Frontend UI library
- [Vite](https://vitejs.dev/) — Frontend build tool

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Ashukr321">Ashutosh Kumar</a>
</p>
