# Phase 7: Testing, Documentation & Deployment (MVP 7)

> **Duration:** Week 10-12 | **Goal:** Tests, API docs, CI/CD, production deploy

---

## Tasks

### Backend Testing
- [ ] **7.1** Install: `npm install --save-dev jest supertest mongodb-memory-server`
- [ ] **7.2** Create `tests/unit/` folder
  - Auth service tests (signup, login, JWT, bcrypt)
  - Resume parser tests (PDF/DOCX extraction)
  - Match score engine tests (scoring weights, edge cases)
- [ ] **7.3** Create `tests/integration/` folder
  - `POST /api/v1/auth/signup` → 201, 409, 400
  - `POST /api/v1/auth/login` → 200, 401, 404
  - `POST /api/v1/user/resumes` → 201, 400, 413
  - `POST /api/v1/jobs/:id/apply` → 201, 403, 409
- [ ] **7.4** Achieve ≥ 70% code coverage on core logic

### API Documentation
- [ ] **7.5** Complete Swagger docs for all 55+ endpoints
- [ ] **7.6** Export Postman collection (`API-Collection.json`)
- [ ] **7.7** Create `docs/API-Integration-Guide.md`
  - Auth flow, file uploads, AI usage, error reference, rate limits

### Project Documentation
- [ ] **7.8** Create `docs/ARCHITECTURE.md` — system design with Mermaid diagrams
- [ ] **7.9** Create `docs/TECH-STACK.md` — all technologies with justification
- [ ] **7.10** Create `docs/DEPLOYMENT.md` — step-by-step deploy guide
- [ ] **7.11** Update `README.md` with setup instructions

### Security Audit
- [ ] **7.12** Verify all passwords are hashed (never stored plain)
- [ ] **7.13** Verify all inputs are validated and sanitized
- [ ] **7.14** Verify CORS allows only production domain
- [ ] **7.15** Verify rate limiting is active on auth and AI endpoints
- [ ] **7.16** Verify no secrets in code (all in .env)
- [ ] **7.17** Verify JWT tokens expire appropriately
- [ ] **7.18** Verify file upload validates MIME type

### CI/CD
- [ ] **7.19** Create `.github/workflows/ci.yml`
  - Lint → Unit tests → Integration tests on PR
- [ ] **7.20** Connect GitHub repo to Render for auto-deploy

### Production Deployment
- [ ] **7.21** Deploy backend to Render.com
  - Set all env vars, build command, start command
- [ ] **7.22** Deploy Redis on Upstash (for Bull queue)
- [ ] **7.23** Set up MongoDB Atlas production cluster
- [ ] **7.24** Configure DNS for `api.yourdomain.com`
- [ ] **7.25** HTTPS verified on all endpoints
- [ ] **7.26** Smoke test on production:
  - Signup → Upload resume → Apply → AI score ✅
  - Recruiter: Post job → View applicants → Shortlist ✅

### Post-Launch
- [ ] **7.27** Set up UptimeRobot for `/api/health` monitoring
- [ ] **7.28** Monitor error logs for first 48 hours
- [ ] **7.29** Verify AI parsing works on 5 real resumes
- [ ] **7.30** Gather feedback from test users

---

## Acceptance Criteria
- [ ] All tests pass (≥ 70% coverage)
- [ ] Swagger docs accessible at `/api-docs`
- [ ] Production deployment live and accessible
- [ ] HTTPS enforced, CORS restricted
- [ ] CI/CD pipeline runs on GitHub
- [ ] Uptime monitoring configured
